import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

// type RequiredMark = boolean | 'optional';

function mint() {
  const [form] = Form.useForm();
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
          <Button type="primary" htmlType="submit">
            Mint NFT
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default mint;
