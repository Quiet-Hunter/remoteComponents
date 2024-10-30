import React from "react";
import { register } from "react-worker-components";

export const ChildComponent = (props: any) => {
  return <>{JSON.stringify(props)}</>;
};

register(ChildComponent, "ChildComponent");

export default ChildComponent;
