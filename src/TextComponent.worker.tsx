import React, { ReactNode } from "react";

import { expose } from "react-worker-components";
import ChildComponent from "./ChildComponent";

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
      Children:
      {children}
      <ChildComponent />
    </div>
  );
};

expose(TextComponent);
