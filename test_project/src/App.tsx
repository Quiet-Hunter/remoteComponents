import React, { useEffect, useState } from "react";
import "./App.css";

const URL = "";

export const useRemoteComponent = (url: string, componentName: string) => {
  const [Component, setComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      try {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = () => {
          const LoadedComponent = (window as any)[componentName];
          setComponent(() => LoadedComponent);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading remote component:", error);
      }
    };
    loadComponent();
  }, [url, componentName]);

  return Component;
};

function App() {
  const RemoteComponent = useRemoteComponent(
    URL,
    "RemoteComponentLibrary.RemoteComponent"
  );

  return (
    <div>
      <h1>Remote Component Test</h1>
      {RemoteComponent ? (
        <RemoteComponent text="Hello from remote!" />
      ) : (
        <p>Loading remote component...</p>
      )}
    </div>
  );
}

export default App;
