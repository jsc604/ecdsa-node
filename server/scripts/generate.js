const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKey = secp.utils.randomPrivateKey();
console.log('private key:', toHex(privateKey));

const publicKey = secp.getPublicKey(privateKey);
console.log('public key:', toHex(publicKey));


// ***** TEST KEYS *****

// private key 1: af34e99cd227ec8f07070341b98e89ce39543fcd3a5ff53d610a59c9c839e343
// public key 1: 048aab9d1c865d777fae2e57d648d77c2c742c84bee09884f31399459b36cedbda62dcb7198556179f9b472d681313a38215c8c19fee321b87fb1f536edd9028de

// private key 2: ea78d9613030f8acfda056a2a5bfce547d09d0fd81dfe7c6356c8239fdbb286f
// public key 2: 04a21de67c594fba1bb99cb73cd7e489c9e1831275519e9ae77a4044d9b16d07bb2909ac9356c5249cca9c3dfebbcae95506ff468b8d68ba7c0116e77d317fde40

// private key 3: 140b0d745ced66bab9a04976f271c671f877c4eae9c1429fe2190068ff116c23
// public key 3: 04e1c683d0a2ec7a10cc6d0e22369c4704c96b4c24b22a8663c3439a487683a751bf8e454666e64d3d8c1e0af187a78569832b380e783fa1fd47b529229011a324