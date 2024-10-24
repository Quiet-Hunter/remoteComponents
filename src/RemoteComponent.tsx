import React from "react";

const RemoteComponent: React.FC<any> = (props) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {JSON.stringify(props)}</div>
  </>
);

export default RemoteComponent;
