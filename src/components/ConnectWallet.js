import React, { useContext } from "react";
import { UserContext } from "../store/user-context";
import Layout from "./Layout";

const ConnectWallet = () => {
  
    const userContext = useContext(UserContext)

    window.ethereum.on("accountsChanged", userContext.accountChangedHandler)
  
  return (
    <Layout>
      <button onClick={userContext.requestAccount}>Connect Wallet</button>
      <h3>Wallet Address: {userContext.walletAddress}</h3>
      <h3>Balance: {userContext.balance} ETH</h3>
    </Layout>
  );
};

export default ConnectWallet;
