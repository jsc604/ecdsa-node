const secp = require("ethereum-cryptography/secp256k1");
const { utf8ToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");
const txMessage = require("./getTxMessage");


function getPublicKey(signature, recoveryBit, sender, amount, recipient) {

  const message = txMessage(sender, amount, recipient);
  const msgHash = keccak256(utf8ToBytes(message));

  return secp.recoverPublicKey(msgHash, signature, recoveryBit);
};

module.exports = getPublicKey;