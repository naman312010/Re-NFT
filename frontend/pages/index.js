import React, {useState, useEffect} from 'react'
import { Card, Avatar, Row, Col } from "antd"
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  ShoppingOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

export default function Home() {
  const [NFTData, SetNFTData] = useState([])
  function NFTCards() {
    const totalCards = 28;
    const styledCards = [];
    console.log("NFTData", NFTData);
    for (let idx = 0; idx < totalCards; idx += 1) {
      const  {
        id,
        author,
        width,
        height,
        url,
        download_url
    } = NFTData[idx] ?? {}
      styledCards.push(
        <Col sm={12} md={8} lg={6}>
          <Card
            style={{
              width: "200px",
              margin: "0 0 50px",
            }}
            cover={
              <img
                alt="example"
                src={`https://picsum.photos/id/${id}/200/200`}
              />
            }
            actions={[
              <HeartOutlined key="Like" />,
              <ShoppingOutlined key="Buy Now" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={
                <Avatar
                  src={`https://avatars.dicebear.com/api/human/${id}.svg`}
                />
              }
              title={author}
              description="About NFT"
              price="0.05 ETH"
            />
          </Card>
        </Col>
      );
    }
    return styledCards;
  }

  useEffect(async () => {
    const response = await fetch("https://picsum.photos/v2/list");
    const data = await response.json();
    SetNFTData(data)
  }, [])
  
  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <div>Browser Page</div> */}
      <Row
        style={{
          width: "80%",
          justifyContent: 'space-between'
        }}
      >
        {NFTCards()}
      </Row>
    </div>
  );
}
