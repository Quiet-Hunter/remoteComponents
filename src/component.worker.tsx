import React, { useState, useEffect } from "react";
import { expose } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

self.onmessage = (event) => {
  console.log(
    "Worker received message (props from main thread): ",
    event.data.props.o
  );
  eventEmitter.emit("updateProps", event.data.props.o);
};

const RemoteWorkerComponent = ({
  props = {},
  children,
}: {
  props: any;
  children?: any;
}) => {
  const [componentProps, setComponentProps] = useState(props);

  useEffect(() => {
    const handleUpdateProps = (newProps: any) => {
      setComponentProps(newProps);
      expose(RemoteWorkerComponent);
    };

    eventEmitter.on("updateProps", handleUpdateProps);
    return () => {
      eventEmitter.off("updateProps", handleUpdateProps);
    };
  }, []);

  return (
    <div>
      <h1>Remote Worker Component</h1>
      <h3>Main TextBox</h3>
      {children}
      <h3>Worker TextBox</h3>
      <RemoteComponent {...componentProps} />
    </div>
  );
};

export default RemoteWorkerComponent;

expose(RemoteWorkerComponent);
