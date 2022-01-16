import React, { useState, useEffect } from "react";
import Web3 from "web3";
import renft from "../artifacts/ReNFT.json";
import { Form, Input, Button, DatePicker } from "antd";
import { NFTStorage, File } from 'nft.storage'
import { pack } from 'ipfs-car/pack';


const endpoint = 'https://api.nft.storage'
const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDA4NTE4NTA5ZDM2Y2IyMjg3OTZDOTQ0ZkNBOEY2ZGE2YTNhMUMyZTAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzODQ0NzgwNzUyNSwibmFtZSI6IkNyeXB0b21pbnRyIn0.HxJ9oY_N_aZeOeEi6XYRNWSr_Tk1_QTouUuEvr688QM'
const storage = new NFTStorage({ endpoint, token: apiKey })


// type RequiredMark = boolean | 'optional';

export default function Mint() {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);
  const [buffer, setBuffer] = useState();
  const [form] = Form.useForm();
  const [currentaccount, setCurrentaccount] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    const networkId = await window.web3.eth.net.getId()
    if (networkId != '0x13881') {
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x13881',
                  chainName: 'Mumbai Testnet (Polygon)',
                  rpcUrls: ['https://rpc-mumbai.matic.today',
                    'https://matic-mumbai.chainstacklabs.com',
                    'https://rpc-mumbai.maticvigil.com',
                    'https://matic-testnet-archive-rpc.bwarelabs.com'
                  ] /* ... */,
                },
              ],
            });
          } catch (addError) {
            console.log('chain not added successfuly')
            alert('mumbai testnet chain not added successfully');
          }
        }
        else{
          console.log('chain not switched successfuly')
          alert('mumbai testnet chain not switched successfully');
        }
      }
      //alert("Please switch to mumbai matic network");
    }
  };

  const loadBlockchaindata = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
  };

  if (currentaccount) {
    console.log("Current connected account:" + currentaccount);
  }

  const captureFile = (event) => {
    //event.preventDefault()
    console.log(event.target)
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      setBuffer(Buffer(reader.result));
      //setImagePreview(URL.createObjectURL(event.target.files[0]));
    }
  }

  const handleMintNFT = async ({
    nftName,
    imgFile,
    expDate,
    primaryColor,
    secondaryColor,
    description,
  }) => {
    try {
      const web3 = window.web3;
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      setCurrentaccount(account);
      const networkId = await web3.eth.net.getId();
      const contract = new web3.eth.Contract(
        renft.abi,
        renft.networks[networkId].address
      );
      const data = new File([buffer], 'image')
      const cid = await storage.storeBlob(new Blob([data]))
      const status = await storage.status(cid)
      console.log("Status:", status)
      const imgurl = "https://" + cid + ".ipfs.dweb.link/";
      console.log(nftName, imgurl, expDate, primaryColor, secondaryColor, description);
      let receipt = await contract.methods
        .mint(nftName, imgurl, expDate, primaryColor, secondaryColor, description)
        .send({ from: currentaccount });
      if (receipt) {
        console.log(receipt);
        loadBlockchaindata();
      }
    } catch (err) {
      console.error(err.message);
      alert("An error occured. Please check the console log");
    }
  };

  const onFinish = (values) => {
    for (const key in values) {
      if (!values[key]) {
        values[key] = key === "expDate" ? 0 : values[key] ?? "";
      } else if (key === "expDate") {
        values[key] = Math.floor(values[key] / 1000);
      }
    }
    console.log(values);
    handleMintNFT(values);
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    alert("An error occured. Please check the console log");
    console.error("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="nftName"
          label="NFT Name"
          required
          hasFeedback
          rules={[{ required: true, message: "Please input NFT name!" }]}
        >
          <Input placeholder="Bixby" />
        </Form.Item>
        <Form.Item name="expDate" label="Expiry Date">
          <DatePicker size="default" />
        </Form.Item>
        <Form.Item name="primaryColor" size="sm" label="Primary Color">
          <Input type="color" placeholder="Primary Color" />
        </Form.Item>
        <Form.Item name="secondaryColor" size="sm" label="Secondary Color">
          <Input type="color" placeholder="Secondary Color" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, messge: "Please tell us about the NFT!!" }]}
          hasFeedback
        >
          <Input placeholder="Tell us more!!" />
        </Form.Item>
        <Form.Item
          name="imgFile"
          label="Upload File"
          required
          rules={[{ required: true, message: "Please upload the image!!" }]}
          hasFeedback
        >
          <Input
            type='file' onChange={captureFile} required
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Mint NFT
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
/*arguments to pass to handleMintNFT: token name(string,mandatory),
image_link(string,mandatory, can be changed with blockchain function),
exp_time (integer, epoch timestamp, pass 0 in case user passes nothing), 
primary_color (string,hex-code, important for display purposes only, pass empty string in case user passes nothing), 
secondary_color (same as primary color), description(string,mandatory)*/
