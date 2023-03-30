const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));

const address = keccak256(publicKey.slice(-20));
console.log('address: ', `0x${toHex(address)}`);

// ***** TEST KEYS *****

// private key 1: d68520310792350e3f494e631732728adf3d9fe0aa5b14826b7e645a947fcb46
// public key 1: 04b9cdc5968c664fe02e38d222f7947d7c36db4e8d53e673e422d4c3e07bba8b325f2f7f7cfd3ae82bcb49fd8c95e67cb81d5c977a1c528193556a3b4ba8ad8be1
// address 1:  0xa8936b9408efc27fd1f1b6b5edd770d24646698d323bdfe2b19e8211b546e764

// private key 2: ce9be145c596e52cdc40bcafa8f584d958eeaf03e44c7768083a1bbfca25aef7
// public key 2: 043783584ea323f0bcd110047a1f2d414c034d358ad2627dacab112e307b59207080061a2935288e156dae3905b8acf5cc13faaae4db1c1b2a55e4f3b0679198f9
// address 2:  0xa9251c9751d848408c5f5f6f4366c181225ceee5c5e3cca9f36323a0547833ca

// private key 3: a3fbb1e6640fb89be9eb38c4b894d0ddae34c8c0a29bba6f8d04969732fd206b
// public key 3: 041eae7c5bcaadb7038767e79d8bb882d5fdb14f8995d66474785ded018f854c75244c9c63744bbf45d8069526c1fbecfde1995d7061c2d6984585f2dbceaab5fb
// address 3:  0x2e7bcb94f2aea84aeaac4b0b78809dc8432da019e027a43bf7ded621214041e4