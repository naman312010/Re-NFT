import React from "react";
import { Spin, Alert } from "antd";
export default function Wrapper(props) {
  const { loading, error, children } = props;
  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          width: "100vh",
          height: "100vh",
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
