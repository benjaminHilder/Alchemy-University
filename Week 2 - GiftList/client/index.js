const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // TODO: how do we prove to the server we're on the nice list? 

  const merkleTree = new MerkleTree(niceList)
  const root = merkleTree.getRoot();


  const name = 'Chris Windler'
  const index = niceList.findIndex(n => n === name)
  const proof = merkleTree.getProof(index)

  // verify proof against the Merkle Root
  console.log({proof, name, root})
  console.log( verifyProof(proof, name, root) );

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    proof,
    name,
    root
  });

  console.log({ gift });
}

main();