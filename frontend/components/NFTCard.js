import React, { useState, useEffect } from "react";
import { Card, Avatar, Row, Col, Spin, Alert } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function NFTCard(props) {
  const { NFTData } = props;
  const totalCards = NFTData?.tokens?.length;
  const styledCards = [];
  console.log("NFTData", NFTData);
  for (let idx = 0; idx < totalCards; idx += 1) {
    let uri = NFTData?.tokens[idx]?.uri ?? {}
    uri = uri.slice(29, uri.length)
    const data = JSON.parse(atob(uri))
    const { image, name, description, attributes } = data
    console.log({ image, name, description, attributes });
    if (!image && !name) {
      continue
    }
    styledCards.push(
      <Col sm={12} md={8} lg={6}>
        <Card
          style={{
            width: "200px",
            margin: "0 0 50px",
          }}
          cover={<img alt="example" src={image} />}
          actions={[
            <HeartOutlined key="Like" />,
            <ShoppingOutlined key="Buy Now" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={
              <Avatar
                src={`https://avatars.dicebear.com/api/human/${idx}.svg`}
              />
            }
            title={name}
            description={description}
            price="0.05 ETH"
          />
        </Card>
      </Col>
    );
  }
  return styledCards;
}
