import React from "react";

const RemoteComponent2: React.FC<{ textProp: string }> = ({ textProp }) => (
  <>
    <div>RemoteComponent2.tsx</div>
    <div>Props: {textProp}</div>
  </>
);

export default RemoteComponent2;
