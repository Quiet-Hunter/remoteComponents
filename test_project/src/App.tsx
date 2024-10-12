import React, { Suspense } from "react";
import "./App.css";
import { useRemoteComponent } from "./useRemoteComponent";

function App() {
  const RemoteComponent1 = useRemoteComponent("RemoteComponent");
  const RemoteComponent2 = useRemoteComponent("RemoteComponent2");

  return (
    <div>
      <h1>Remote Component Test</h1>
      <Suspense fallback={<p>Loading remote component 1...</p>}>
        {RemoteComponent1 ? (
          <RemoteComponent1 textProp="Hello from remote 1!" />
        ) : (
          <p>Loading remote component 1...</p>
        )}
      </Suspense>
      <Suspense fallback={<p>Loading remote component 2...</p>}>
        {RemoteComponent2 ? (
          <RemoteComponent2 textProp="Hello from remote 2!" />
        ) : (
          <p>Loading remote component 2...</p>
        )}
      </Suspense>
    </div>
  );
}

export default App;
