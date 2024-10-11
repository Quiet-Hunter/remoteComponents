import React from "react";
import "./App.css";
import { useRemoteComponent } from "./useRemoteComponent";

function App() {
  const RemoteComponent1 = useRemoteComponent(
    "RemoteComponentLibrary",
    "RemoteComponent"
  );
  const RemoteComponent2 = useRemoteComponent(
    "RemoteComponentLibrary",
    "RemoteComponent2"
  );
  return (
    <div>
      <h1>Remote Component Test</h1>
      {RemoteComponent1 ? (
        <RemoteComponent1 textProp="Hello from remote 1!" />
      ) : (
        <p>Loading remote component 1...</p>
      )}
      {RemoteComponent2 ? (
        <RemoteComponent2 textProp="Hello from remote 2!" />
      ) : (
        <p>Loading remote component 2...</p>
      )}
    </div>
  );
}

export default App;
