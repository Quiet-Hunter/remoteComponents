import React, { useState, useEffect } from "react";
import { expose } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";

const RemoteWorkerComponent = ({
  props = {},
  children,
}: {
  props: any;
  children?: any;
}) => {
  const [curProps, setCurProps] = useState(props);

  useEffect(() => {
    self.onmessage = (event) => {
      console.log(
        "Worker received message (props from main thread): ",
        event.data.props
      );
      setCurProps(event.data.props);
    };
  }, []);

  return (
    <div>
      <h1>Remote Worker Component</h1>
      <h3>Main TextBox</h3>
      {children}
      <h3>Worker TextBox</h3>
      <RemoteComponent {...curProps} />
    </div>
  );
};

expose(RemoteWorkerComponent);
