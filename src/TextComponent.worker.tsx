import React, { ReactNode } from "react";

import { expose } from "react-worker-components";
import ChildComponent from "./ChildComponent";

self.onmessage = (event) => {
  console.log("Remote Worker got message: " + JSON.stringify(event.data));
};

const TextComponent = ({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <div>{text}</div>
      {children}
      <ChildComponent {...{ text }} />
    </div>
  );
};

expose(TextComponent);
