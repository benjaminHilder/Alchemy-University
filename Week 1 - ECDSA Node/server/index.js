const secp = require("ethereum-cryptography/secp256k1");
const { toHex }=require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "04866e97de1cf270e52357100be9284b85c9f828ab745a28ef3130e445fb6bd848ac14746c76134d1dab6a57da5d7f481b663939d7f1e149a4a44bd3f9c47a749b": 100,
  "048d3395377bfc88436bfa6a7275123b52e5ab7b84d39be0b630491b2fa69b8143a47ce3f09cc9a6f4cb173eb23e019800a23bf71ee8c70dbdf62cafc1f9c052cf": 50,
  "045cb0105a44087a3219d0bcb8492678e0573b688ab271f0c82f85463fcc3639b154ec22296b778a8de8a94eda2a1dcee171094976f862c386976312c478b6bc8b": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

let nonces=[
  {
    sender:"04866e97de1cf270e52357100be9284b85c9f828ab745a28ef3130e445fb6bd848ac14746c76134d1dab6a57da5d7f481b663939d7f1e149a4a44bd3f9c47a749b",
    nonce:0
  },
  {
    sender:"048d3395377bfc88436bfa6a7275123b52e5ab7b84d39be0b630491b2fa69b8143a47ce3f09cc9a6f4cb173eb23e019800a23bf71ee8c70dbdf62cafc1f9c052cf",
    nonce:0
  },
  {
    sender:"045cb0105a44087a3219d0bcb8492678e0573b688ab271f0c82f85463fcc3639b154ec22296b778a8de8a94eda2a1dcee171094976f862c386976312c478b6bc8b",
    nonce:0
    
  }
]

app.post("/send", (req, res) => {
  const {sender, recipient, amount, signature, recoveryBit} = req.body;

  let message = createTxMsg(sender, amount, recipient)
  
  //if the transaction was sent from the same account
  //that used their private key to sign the transaction
  //executre trade

  //this works as the sender, amount and recipient all have the be the same
  //for the hash to be the same that we can then confirm
  //was signed from the senders private key without knowning what hte private key actually is
  if(!ValidateSignature(sender, signature, recoveryBit, message, res)) {

  } else {

    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

//create a message from the frontend that we will compare
//with the message we got from the program that signed the message with the private key
function createTxMsg(sender, amount, recipient) {
  let senderNonce = 0;
  nonces.map(nonce => {
    if(nonce.sender == sender) {
      senderNonce=nonce.nonce;
    }
  })

  return JSON.stringify({
    sender: sender,
    amount: amount,
    recipient: recipient,
    nonce: senderNonce
  })
}

//was this transaction send from the same public address
//that sent the transaction with their private key?
function ValidateSignature(sender, signature, recoveryBit, data, res) {
  try {
    //transaction info
    const dataHash = keccak256(utf8ToBytes(data))

    //obtain public key info from transaction
    const publicKey = secp.recoverPublicKey(dataHash, signature, recoveryBit)
    if (sender === toHex(publicKey)) {
      return true;
    }

    return false
  } catch (error) {
    res.status(400).send({ message: "Transaction Validation failed!" });
    console.log("Error Log :",error)
    return false
  }
}
