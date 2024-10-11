import React from "react";
import "./App.css";
import { useRemoteComponent } from "./useRemoteComponent";

function App() {
  const RemoteComponent1 = useRemoteComponent(
    "RemoteComponent",
    "RemoteComponent"
  );
  return (
    <div>
      <h1>Remote Component Test</h1>
      {RemoteComponent1 ? (
        <RemoteComponent1 textProp="Hello from remote 1!" />
      ) : (
        <p>Loading remote component 1...</p>
      )}
    </div>
  );
}

export default App;
