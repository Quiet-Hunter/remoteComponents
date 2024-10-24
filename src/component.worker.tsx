import React from "react";

import { expose } from "react-worker-components";

import RemoteComponent from "./RemoteComponent";

const TextComponent = ({ text }: { text: string }) => {
  return (
    <div>
      <div>Hello from worker: {Math.random()}</div>
      <h1>Main TextBox</h1>
      <h1>Worker TextBox</h1>
      <RemoteComponent textProp={text} />
    </div>
  );
};

expose(TextComponent);
