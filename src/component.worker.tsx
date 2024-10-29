import React, { useState } from "react";

import { expose } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";

self.onmessage = (event) => {
  console.log("Worker received message (props from main thread): ", event.data);
};

const RemoteWorkerComponent = ({
  props,
  children,
}: {
  props: any;
  children?: any;
}) => {
  const [propsFromMain, _setPropsFromMain] = useState(props || {});
  return (
    <div>
      <h1>Remote Worker Component</h1>
      <h3>Main TextBox</h3>
      {children}
      <h3>Worker TextBox</h3>
      <RemoteComponent {...propsFromMain} />
    </div>
  );
};

expose(RemoteWorkerComponent);
