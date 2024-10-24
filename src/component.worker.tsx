import React from "react";

import { expose, register } from "react-worker-components";

const RemoteComponent: React.FC<any> = (props) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {JSON.stringify(props)}</div>
  </>
);

register(RemoteComponent, "RemoteComponent");

const RemoteWorkerComponent = ({
  props,
  children,
}: {
  props: any;
  children?: any;
}) => {
  console.log("Props from main thread: ", JSON.stringify(props));
  return (
    <div>
      <div>Hello from worker: {Math.random()}</div>
      <h1>Main TextBox</h1>
      {children}
      <h1>Worker TextBox</h1>
      <RemoteComponent {...props} />
    </div>
  );
};

expose(RemoteWorkerComponent);
