import React from "react";

export interface TestRemoteComponentProps {
  json: { [k: string]: any };
}

const TestRemoteComponent: React.FC<TestRemoteComponentProps> = (props) => {
  console.log(props);
  return <div style={{ color: "red" }}>{JSON.stringify(props)}</div>;
};

export default TestRemoteComponent;
