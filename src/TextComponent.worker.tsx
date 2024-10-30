import React, { ReactNode } from "react";

import { expose } from "react-worker-components";

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
    </div>
  );
};

expose(TextComponent);
