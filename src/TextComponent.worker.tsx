import React, { ReactNode } from "react";

import { expose } from "react-worker-components";
// import ChildComponent from "./ChildComponent";

self.onmessage = (event) => {
  console.log(
    "Message received (props to serialize): " + JSON.stringify(event.data)
  );
};

const TextComponent = ({
  row,
  text,
  children,
}: {
  row?: { entry: string };
  text?: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <div style={{ color: "red" }}>{row?.entry || ""}</div>
      <div>{text}</div>
      {children}
      {/* <ChildComponent {...{ text }} /> */}
    </div>
  );
};

expose(TextComponent);
