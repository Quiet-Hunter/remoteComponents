import React from "react";
import { register } from "react-worker-components";

const RemoteComponent: React.FC<any> = (props) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {JSON.stringify(props)}</div>
  </>
);

register(RemoteComponent, "RemoteComponent");

export default RemoteComponent;
