import React, { useState, useEffect } from "react";
import { expose } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";

const TextComponent = ({ text, children }: { text: string; children: any }) => {
  const [updatedText, setUpdatedText] = useState(text || "");

  useEffect(() => {
    onmessage = function (e) {
      console.log(
        "Message received from main script: " + JSON.stringify(e.data)
      );

      // Update the component state with the received data
      if (e.data && typeof e.data === "string") {
        setUpdatedText(e.data);
      }
      postMessage("Remote Worker response: " + Math.random());
    };
  }, []);

  return (
    <div>
      <div>Hello from worker: {Math.random()}</div>
      <h1>Main TextBox</h1>
      {children}
      <h1>Worker TextBox</h1>
      <RemoteComponent textProp={updatedText} />
    </div>
  );
};

expose(TextComponent);
