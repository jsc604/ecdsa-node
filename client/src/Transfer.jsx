import { useState } from "react";
import server from "./server";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);

  async function transfer(evt) {
    evt.preventDefault();
    if (sendAmount && recipient && privateKey && address) {
      try {
        const {
          data: { balance },
        } = await server.post(`send`, {
          sender: address,
          amount: parseInt(sendAmount),
          recipient,
          privateKey,
        });
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message);
      }
    } else {
      alert("Please sign your transaction before transferring funds.");
    }
  }

  async function onPrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  return (
    <>
      <form className="container transfer" onSubmit={transfer}>
        <h1>Send Transaction</h1>

        <label>
          Send Amount
          <input
            placeholder="1, 2, 3..."
            value={sendAmount}
            onChange={setValue(setSendAmount)}
            required
          ></input>
        </label>

        <label>
          Recipient
          <input
            placeholder="Enter an address, for example: 0x2"
            value={recipient}
            onChange={setValue(setRecipient)}
            required
          ></input>
        </label>

        <label>
          Private Key
          <input
            placeholder="Enter your pivate key"
            value={privateKey}
            onChange={onPrivateKey}
            type="password"
            required
          ></input>
        </label>

        <input type='submit' className="button" value="transfer"/>
      </form>
    </>
  );
}

export default Transfer;
