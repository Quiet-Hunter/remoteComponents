import React from "react";
import { register } from "react-worker-components";

self.onmessage = (event) => {
  console.log(
    "Worker received message (props from main thread): ",
    event.data.props.o
  );
};

const RemoteComponent: React.FC<any> = (props) => {
  return <>{props}</>;
};

register(RemoteComponent, "RemoteComponent");

export default RemoteComponent;
