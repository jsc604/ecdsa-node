import { useState } from "react";
import server from "./server";

function Wallet({ address, setAddress, balance, setBalance }) {
  const [signature, setSignature] = useState("");
  const [recoveryBit, setRecoveryBit] = useState("");
  const [privateKey, setPrivateKey] = useState("");

  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  async function onPrivateKey(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
  }

  async function getSignature() {
    if (privateKey && address) {
      const {
        data: { signature, recoveryBit },
      } = await server.get(`signature`, {
        params: {
          privateKey,
          address,
        },
      });
      setSignature(signature);
      setRecoveryBit(recoveryBit);
    } else {
      setSignature("");
      setRecoveryBit("");
    }
  }

  return (
    <form className="container transfer" onSubmit={getSignature}>
      <h1>Your Wallet</h1>

      <label>
        Wallet Address
        <input
          placeholder="Type an address, for example: 0x1"
          value={address}
          onChange={onChange}
          required
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <br />

      <label>
        Get Signature
        <input
          placeholder="Enter your pivate key"
          value={privateKey}
          onChange={onPrivateKey}
          required
        ></input>
      </label>

      <div className="balance">Signature: {signature}</div>
      <div className="balance">Recovery Bit: {recoveryBit}</div>

      <input type="submit" className="button" value="Sign" />
    </form>
  );
}

export default Wallet;
