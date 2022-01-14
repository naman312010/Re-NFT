import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import renft from "../artifacts/renft.json"
import { Form, Input, Button, Radio } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

// type RequiredMark = boolean | 'optional';



function mint() {

  useEffect(() => {
    loadWeb3();
    loadBlockchaindata();
  }, [])

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
  }

  if (currentaccount)
    console.log("Current connected account:" + currentaccount);



  const handleMintNFT = async (name, image_link, exp_time, primary_color, secondary_color, description) => {
    try {
      //console.log("Minting using values:" + values.toString());
      var receipt = await renft.methods.mint(name,
        image_link,
        exp_time,
        primary_color,
        secondary_color,
        description).send({ from: currentaccount });
      if (receipt) {
        console.log(receipt);
        loadBlockchaindata();
      }
    }
    catch (err) {
      console.log(err.message);
      alert("An error occured. Please check the console log")
    }
  }

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          label="NFT Name"
          rules={[{ required: true, message: "Please input NFT name!" }]}
        >
          <Input placeholder="Bixby" />
        </Form.Item>
        <Form.Item
          label="Expiry Date"
          rules={[{ required: true, message: "Please input expiry date!" }]}
        >
          <Input placeholder="mm-dd-yy" />
        </Form.Item>
        <Form.Item
          label="Color"
          rules={[{ required: true, message: "Please input color!" }]}
        >
          <Input placeholder="#rgb" />
        </Form.Item>
        <Form.Item label="Description">
          <Input placeholder="tell us more" />
        </Form.Item>
        <Form.Item
          label="Upload File"
          rules={[{ required: true, message: "Please upload file!" }]}
        >
          <Input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
          />
        </Form.Item>
        <Form.Item>
          <Button /*onclick=handleMintNFT(args list below)*/ type="primary" htmlType="submit">
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
export default mint;
