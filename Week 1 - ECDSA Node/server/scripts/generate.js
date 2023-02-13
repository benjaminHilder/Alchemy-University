const secp = require("ethereum-cryptography/secp256k1")
const {toHex} = require("ethereum-cryptography/utils")

const privateKey = secp.utils.randomPrivateKey()

console.log(`private key raw: ${(privateKey)}`)
console.log(`private key hex: ${toHex(privateKey)}`)

const publicKey = secp.getPublicKey(privateKey)

console.log(`public key raw: ${(publicKey)}`)
console.log(`public key hex: ${toHex(publicKey)}`)