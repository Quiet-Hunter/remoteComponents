import React from "react";

const RemoteComponent: React.FC<{ textProp: string }> = ({ textProp }) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {textProp}</div>
  </>
);

export default RemoteComponent;
