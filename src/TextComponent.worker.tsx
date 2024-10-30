import React, { ReactNode } from "react";

import { expose } from "react-worker-components";
import ChildComponent from "./ChildComponent";

self.onmessage = (event) => {
  console.log("Remote Worker got message: " + JSON.stringify(event.data));
};

const TextComponent = ({
  row: { entry },
  children,
}: {
  row: { entry: string };
  children: ReactNode;
}) => {
  return (
    <div>
      <div>{entry}</div>
      {children}
      <ChildComponent {...{ entry }} />
    </div>
  );
};

expose(TextComponent);
