import React from "react";
import { register } from "react-worker-components";

const RemoteComponent: React.FC<{ textProp: string }> = ({ textProp }) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {textProp}</div>
  </>
);

register(RemoteComponent, "RemoteComponent");

export default RemoteComponent;
