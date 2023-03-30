const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "048aab9d1c865d777fae2e57d648d77c2c742c84bee09884f31399459b36cedbda62dcb7198556179f9b472d681313a38215c8c19fee321b87fb1f536edd9028de": 100,
  "04a21de67c594fba1bb99cb73cd7e489c9e1831275519e9ae77a4044d9b16d07bb2909ac9356c5249cca9c3dfebbcae95506ff468b8d68ba7c0116e77d317fde40": 50,
  "04e1c683d0a2ec7a10cc6d0e22369c4704c96b4c24b22a8663c3439a487683a751bf8e454666e64d3d8c1e0af187a78569832b380e783fa1fd47b529229011a324": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
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
