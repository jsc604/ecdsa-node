const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes, hexToBytes } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");
const getSignature = require("./scripts/getSignature");
const getPublicKey = require("./scripts/getPublicKey");

const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "0xa8936b9408efc27fd1f1b6b5edd770d24646698d323bdfe2b19e8211b546e764": 100,
  "0xa9251c9751d848408c5f5f6f4366c181225ceee5c5e3cca9f36323a0547833ca": 50,
  "0x2e7bcb94f2aea84aeaac4b0b78809dc8432da019e027a43bf7ded621214041e4": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.get("/signature", async (req, res) => {
  const { privateKey, address } = req.query;

  const message = `Requesting signature for ${address}`;
  const signature = await getSignature(message, privateKey);

  res.send({
    signature: toHex(signature[0]),
    recoveryBit: signature[1],
  });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  const publicKey = getPublicKey(signature, recoveryBit, sender, amount, recipient);
  console.log('publicKey: ', toHex(publicKey));
  
  // setInitialBalance(sender);
  // setInitialBalance(recipient);

  // if (balances[sender] < amount) {
  //   res.status(400).send({ message: "Not enough funds!" });
  // } else {
  //   balances[sender] -= amount;
  //   balances[recipient] += amount;
  //   res.send({ balance: balances[sender] });
  // }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
