const secp = require("ethereum-cryptography/secp256k1");
const{ toHex }=require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes } = require("ethereum-cryptography/utils");

const sender = "04866e97de1cf270e52357100be9284b85c9f828ab745a28ef3130e445fb6bd848ac14746c76134d1dab6a57da5d7f481b663939d7f1e149a4a44bd3f9c47a749b"
const recipient = "048d3395377bfc88436bfa6a7275123b52e5ab7b84d39be0b630491b2fa69b8143a47ce3f09cc9a6f4cb173eb23e019800a23bf71ee8c70dbdf62cafc1f9c052cf"
const amount = 20

const PRIVATE_KEY = "015ac7d689903756cfa84d6f26ef777bd3409a4f14d6a10f9ac9ddcdbc94172c"

const balances = {
    "04866e97de1cf270e52357100be9284b85c9f828ab745a28ef3130e445fb6bd848ac14746c76134d1dab6a57da5d7f481b663939d7f1e149a4a44bd3f9c47a749b": 100,
    "048d3395377bfc88436bfa6a7275123b52e5ab7b84d39be0b630491b2fa69b8143a47ce3f09cc9a6f4cb173eb23e019800a23bf71ee8c70dbdf62cafc1f9c052cf": 50,
    "045cb0105a44087a3219d0bcb8492678e0573b688ab271f0c82f85463fcc3639b154ec22296b778a8de8a94eda2a1dcee171094976f862c386976312c478b6bc8b": 75,
};

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

  function TxMsg(sender, recipient, amount) {
    let actualNonce = 0

    nonces.map(nonce => {
        if(nonce.sender == sender) {
            actualNonce = nonce.nonce;
        }
    })

    return JSON.stringify({
        sender: sender,
        amount: amount,
        recipient: recipient,
        nonce: actualNonce
    });
}

function TxSign(sender, recipient, amount) {
    const msgHash = keccak256(utf8ToBytes(TxMsg(sender, recipient, amount)))

    return secp.sign(msgHash, PRIVATE_KEY, {recovered: true})
}

async function main() {
    const signature = await TxSign(sender, recipient, amount)
    console.log("SIGN: ",signature)
    console.log("Signature is:",toHex(signature[0]))
    console.log("Recovery bit: ",signature[1])
}
    main().catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
