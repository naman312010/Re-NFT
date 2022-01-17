import { useQuery } from "@apollo/client";
import { Row } from "antd";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import { gql } from "@apollo/client";
import Wrapper from "../components/Wrapper";
import NFTCard from "../components/NFTCard";


const UserPage = () => {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [account, setAccount] = useState("");
  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    const networkId = await window.web3.eth.net.getId();
    if (networkId != "0x13881") {
      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x13881" }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x13881",
                  chainName: "Mumbai Testnet (Polygon)",
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: [
                    "https://rpc-mumbai.matic.today",
                    "https://matic-mumbai.chainstacklabs.com",
                    "https://rpc-mumbai.maticvigil.com",
                    "https://matic-testnet-archive-rpc.bwarelabs.com",
                  ] /* ... */,
                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                },
              ],
            });
          } catch (addError) {
            console.log(addError);
          }
        }
      }
      //alert("Please switch to mumbai matic network");
    }
  };
  const loadBlockchaindata = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setAccount(account);
  };
  const { err, loading, data } = useQuery(
    gql`
      query AllTokens {
        tokens(orderBy: mintedTime, orderDirection: desc, creator: $account) {
          id
          creator
          owner
          uri
        }
      }
    `,
    { account }
  );

  return (
    <Wrapper loading={loading} error={err}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Row
          style={{
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <NFTCard NFTData={data} />
        </Row>
      </div>
    </Wrapper>
  );
};

export default UserPage;
