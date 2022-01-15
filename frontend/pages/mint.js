import React, { useState, useEffect } from "react";
import Web3 from "web3";
var Contract = require("web3-eth-contract");
import renft from "../artifacts/ReNFT.json";
import { Form, Input, Button, Radio } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

// type RequiredMark = boolean | 'optional';

export default function Mint() {
  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, []);

  const [form] = Form.useForm();
  const [currentaccount, setCurrentaccount] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
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

  const handleMintNFT = async ({
    nftName,
    img,
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
      //console.log(renft.networks[networkId].address);
      let receipt = await contract.methods
        .mint(nftName, img, expDate, primaryColor, secondaryColor, description)
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
      values[key] = key === "expDate" ? 0 : values[key] ?? "";
    }
    // console.log(values);
    handleMintNFT(values);
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
          <Input placeholder="mm-dd-yy" />
        </Form.Item>
        <Form.Item name="primaryColor" label="Primary Color">
          <Input placeholder="#rgb" />
        </Form.Item>
        <Form.Item name="secondaryColor" label="Secondary Color">
          <Input placeholder="#rgb" />
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
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
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
