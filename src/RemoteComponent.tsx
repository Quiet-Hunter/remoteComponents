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
};

const RemoteComponent: React.FC<any> = (props) => {
  useEffect(() => {
    const handleUpdateProps = (newProps: any) => {
      console.log("RemoteComponent: " + newProps);
    };

    eventEmitter.on("updateProps", handleUpdateProps);
    return () => {
      eventEmitter.off("updateProps", handleUpdateProps);
    };
  }, []);

  return (
    <>
      <div>Remote RemoteComponent.tsx</div>
      <div>Props: {JSON.stringify(props)}</div>
    </>
  );
};

register(RemoteComponent, "RemoteComponent");

export default RemoteComponent;
