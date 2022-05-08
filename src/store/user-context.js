import React, {useState} from "react";
import { ethers } from 'ethers';

export const UserContext = React.createContext({
  walletAddress: null,
  balance: null,
  requestAccount: () => {},
  accountChangedHandler: () => {}
});

const UserContextProvider = (props) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  function accountChangedHandler(newAccountAddress) {
    setWalletAddress(newAccountAddress);
    getBalance(newAccountAddress.toString());
  }

  const getBalance = async (address) => {
    const unformattedBalance = await window.ethereum.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    });
    const balance = ethers.utils.formatEther(unformattedBalance);
    setBalance(balance);
  };

  const requestAccount = async () => {
    // check if metamask extension exits
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        accountChangedHandler(accounts[0]);
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Install Metamask.");
    }
  };

  return <UserContext.Provider
    value={{
        walletAddress: walletAddress,
        balance: balance,
        requestAccount: requestAccount,
        accountChangedHandler: accountChangedHandler
    }}
  >
    {props.children}
  </UserContext.Provider>;
};

export default UserContextProvider;
