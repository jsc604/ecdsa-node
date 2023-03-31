const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const { keccak256 } = require("ethereum-cryptography/keccak");
const getSignature = require("./scripts/getSignature");
const getPublicKey = require("./scripts/getPublicKey");
const txMessage = require("./scripts/getTxMessage");
const generateKeys = require("./scripts/generate");

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

app.get("/generate", (req, res) => {
  const keys = generateKeys();
  balances[keys.address] = 100;
  res.send(keys);
});

app.post("/send", async (req, res) => {
  const { privateKey, sender, amount, recipient } = req.body;

  if (!secp.utils.isValidPrivateKey(privateKey)) {
    res.status(400).send({ message: "Invalid private key!" });
    return;
  }

  const message = txMessage(sender, amount, recipient);
  const [signature, recoveryBit] = await getSignature(message, privateKey);
  const publicKey = getPublicKey(message, signature, recoveryBit);
  const recoveredAddress = keccak256(publicKey.slice(-20));

  if (`0x${toHex(recoveredAddress)}` === sender) {
    setInitialBalance(sender);
    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
      return
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Signature not verified. Please enter a valid private key." });
    return;
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
