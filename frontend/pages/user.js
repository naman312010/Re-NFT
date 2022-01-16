import { useQuery } from "@apollo/client";
import { Row } from "antd";
import React from "react";
import { account } from "./mint";
import { gql } from "@apollo/client";
import Wrapper from "../components/Wrapper";
import NFTCard from "../components/NFTCard";

const UserPage = () => {
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
