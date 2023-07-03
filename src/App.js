import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = '0xFab02A04471D12b5Ea463347D2CdB2C36fEd1291';
const contractabi =  require("./contractabi.json"); // Insert the ABI of the MyToken contract here

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractabi.abi, signer);

function App() {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkBalance();
  }, []);

  function connectWallet() {
        if (window.ethereum) {
          // res[0] for fetching a first wallet
          window.ethereum
            .request({ method: "eth_requestAccounts" });
            // .then((res) => accountChangeHandler(res[0]));
        } else {
          alert("install metamask extension!!");
        }
      }

  const checkBalance = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const address = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const balance1 = await contract.totalSupply();
      const balance = await ethers.utils.formatEther(balance1.toString());
      setBalance(balance.toString());
    }
  };

  const depositETH = async () => {
    if (amount) {
      setIsLoading(true);
      try {
        const value = ethers.utils.parseEther(amount);
        const overrides = { value };
        await contract.swapXUFforETH(overrides);
        setAmount('');
        checkBalance();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const redeemETH = async () => {
    if (amount) {
      setIsLoading(true);
      try {
        const value = ethers.utils.parseEther(amount);
        await contract.swapETHforXUF(value);
        setAmount('');
        checkBalance();
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="App">
      <h1>XUF Stablecoin</h1>
      <div>
        <h2>Total XUF Supply: {balance}</h2>
        <div>
          <label>Amount:</label>
          <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        <button onClick={connectWallet} disabled={isLoading}>
          Connect wallet
        </button>
        <button onClick={depositETH} disabled={isLoading}>
          Deposit ETH
        </button>
        <button onClick={redeemETH} disabled={isLoading}>
          Redeem ETH
        </button>
      </div>
    </div>
  );
}

export default App;




// import { ethers } from "ethers";
// import styled from "styled-components";
// import React, { useEffect, useState } from "react";

// const theme = {
//   blue: {
//     default: "#3f51b5",
//     hover: "#283593"
//   },
//   pink: {
//     default: "#e91e63",
//     hover: "#ad1457"
//   }
// };

// const Button = styled.button`
//   background-color: ${(props) => theme[props.theme].default};
//   color: white;
//   padding: 5px 15px;
//   border-radius: 5px;
//   outline: 0;
//   text-transform: uppercase;
//   margin: 10px 0px;
//   cursor: pointer;
//   box-shadow: 0px 2px 2px lightgray;
//   transition: ease background-color 250ms;
//   &:hover {
//     background-color: ${(props) => theme[props.theme].hover};
//   }
//   &:disabled {
//     cursor: default;
//     opacity: 0.7;
//   }
// `;

// Button.defaultProps = {
//   theme: "blue"
// };

// function App(){

//   const [amount, setAmount] = useState(0);

//   const ABI = "../../artifacts/contracts/unrealFinance.sol/MyToken.json";

//   const provider = new ethers.providers.Web3Provider(window.ethereum, "any"); 
//   const signer = provider.getSigner();
//   const NIFT_CONTRACT_ADDRESS = "0xe6A1f7731e312A121f2Cdd9ff8148B2c3b29B540";
//   const niftContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

//   function connectWallet() {
//     if (window.ethereum) {
//       // res[0] for fetching a first wallet
//       window.ethereum
//         .request({ method: "eth_requestAccounts" })
//         .then((res) => accountChangeHandler(res[0]));
//     } else {
//       alert("install metamask extension!!");
//     }
//   }

//   async function swapETHforXUF(){

//   }





// }









// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;






