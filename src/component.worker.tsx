import React from "react";
import { expose } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";

const RemoteWorkerComponent = ({
  props = {},
  children,
}: {
  props: any;
  children?: any;
}) => {
  return (
    <div>
      <h1>Remote Worker Component</h1>
      <h3>Main TextBox</h3>
      {children}
      <h3>Worker TextBox</h3>
      <RemoteComponent {...props} />
    </div>
  );
};

expose(RemoteWorkerComponent);

export default RemoteWorkerComponent;
