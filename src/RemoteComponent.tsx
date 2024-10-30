import React, { useEffect } from "react";
import { register } from "react-worker-components";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();

self.onmessage = (event) => {
  console.log(
    "Worker received message (props from main thread): ",
    event.data.props.o
  );
  eventEmitter.emit("updateProps", event.data.props.o);
  self.postMessage(() => (
    <span style={{ color: "red" }}>{JSON.stringify(event.data.props.o)}</span>
  ));
};

const RemoteComponent: React.FC<any> = (props) => {
  const [componentProps, setComponentProps] = React.useState(props);
  useEffect(() => {
    const handleUpdateProps = (newProps: any) => {
      console.log("RemoteComponent: " + newProps);
      setComponentProps(newProps);
    };

    eventEmitter.on("updateProps", handleUpdateProps);
    return () => {
      eventEmitter.off("updateProps", handleUpdateProps);
    };
  }, []);

  return <>{JSON.stringify(componentProps)}</>;
};

register(RemoteComponent, "RemoteComponent");

export default RemoteComponent;
