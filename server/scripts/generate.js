const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");


function generateKeys() {
  const privateKey = secp.utils.randomPrivateKey();
  // console.log('private key:', toHex(privateKey));
  
  const publicKey = secp.getPublicKey(privateKey);
  // console.log('public key:', toHex(publicKey));
  
  const address = keccak256(publicKey.slice(-20));
  // console.log('address: ', `0x${toHex(address)}`);

  return {
    privateKey: toHex(privateKey),
    publicKey: toHex(publicKey),
    address: `0x${toHex(address)}`,
  };
};

module.exports = generateKeys;