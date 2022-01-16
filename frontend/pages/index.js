import React from "react";
import { Row } from "antd";
import { useQuery, gql } from "@apollo/client";
import { decode as atob } from "base-64";
import NFTCards from "../components/NFTCard";
import Wrapper from "../components/Wrapper";

const All_NFTS = gql`
  query AllTokens {
    tokens(orderBy: mintedTime, orderDirection: desc) {
      id
      creator
      owner
      uri
    }
  }
`;

export default function Home() {
  function b64_to_utf8(str) {
    return decodeURIComponent(escape(window.atob(str)));
  }
  const { loading, error, data } = useQuery(All_NFTS);
  console.log("all nft", data);
  if (data) {
    let uri = data.tokens[0].uri;
    // uri.replace("data:application/json;base64,", "");
    uri = uri.slice(29, uri.length);
    console.log("original data", JSON.parse(atob(uri)));
    // console.log("utf 8", b64_to_utf8(uri));
  }

  return (
    <Wrapper loading={loading} error={error}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* <div>Browser Page</div> */}
        <Row
          style={{
            width: "80%",
            justifyContent: "space-between",
          }}
        >
          <NFTCards NFTData={data} />
        </Row>
      </div>
    </Wrapper>
  );
}
