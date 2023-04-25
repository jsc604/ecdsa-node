function Intro() {
  return (
    <div className="intro">
      <h1>eCDSA Node project demo</h1>
      <p>
        The ECDSA Node Project Demo is a comprehensive example showcasing the
        implementation of Elliptic Curve Digital Signature Algorithm (ECDSA)
        using Node.js and the Ethereum cryptography library. This project
        demonstrates how to create, manage, and verify digital signatures in a
        simple, secure, and efficient manner. Forked and completed from{" "}
        <a
          href="https://github.com/alchemyplatform/ecdsa-node"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alchemy's ECDSA-Node Repository
        </a>
        , the completed project repo can be found here:{" "}
        <a
          href="https://github.com/jsc604/ecdsa-node"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jsc604's ECDSA-Node Repository
        </a>
        . Feedback is greatly appreciated.
      </p>
      <li>
        To start, generate some keys and enter the info in the input fields
      </li>
      <li>Each new wallet generated will start with a balance of 100</li>
      <li>
        The private key has to match its wallet address otherwise the signature
        will not be valid and the transfer will fail
      </li>
    </div>
  );
}

export default Intro;
