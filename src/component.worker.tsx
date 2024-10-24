import React from "react";

import { expose } from "react-worker-components";

import RemoteComponent from "./RemoteComponent";

onmessage = function (e) {
  console.log("Message received from main script: " + JSON.stringify(e.data));
  postMessage("Remote Worker response: " + Math.random());
};

const TextComponent = ({ text, children }: { text: string; children: any }) => {
  return (
    <div>
      <div>Hello from worker: {Math.random()}</div>
      <h1>Main TextBox</h1>
      {children}
      <h1>Worker TextBox</h1>
      <RemoteComponent textProp={text} />
    </div>
  );
};

expose(TextComponent);
