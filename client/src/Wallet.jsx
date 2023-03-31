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

  async function getSignature(evt) {
    evt.preventDefault();
    
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
      console.log('signature: ', signature);
      console.log('recovery: ', recoveryBit);
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
          placeholder="Enter your address, for example: 0x1"
          value={address}
          onChange={onChange}
          required
        ></input>
      </label>

      <div className="balance">Balance: {balance}</div>

      <br />

      <label>
        <h2>Get Signature</h2>
        Private Key
        <input
          placeholder="Enter your pivate key"
          value={privateKey}
          onChange={onPrivateKey}
          type='password'
          required
        ></input>
      </label>

      <div className="balance"><p style={{wordBreak: 'break-all'}}>Signature: <br/>{signature}</p></div>
      <div className="balance">Recovery Bit: {recoveryBit}</div>

      <input type="submit" className="button" value="Sign" />
    </form>
  );
}

export default Wallet;
