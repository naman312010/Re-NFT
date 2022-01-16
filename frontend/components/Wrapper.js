import React from "react";
import { Spin, Alert } from "antd";
export default function Wrapper(props) {
  const { loading, error, children } = props;
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }
  if (error) return <Alert message={error} type="error" showIcon />;
  return <>
    {children}
  </>;
}
