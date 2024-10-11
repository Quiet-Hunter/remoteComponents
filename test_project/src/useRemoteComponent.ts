import React, { useEffect, useState } from "react";

const getURL = (fileName: string) =>
  `https://quiet-hunter.github.io/remoteComponents/dist/${fileName}.js`;

export const useRemoteComponent = (fileName: string, componentName: string) => {
  const [Component, setComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      const url = getURL(fileName);
      try {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = () => {
          const LoadedComponent = (window as any)[componentName].default;
          setComponent(() => LoadedComponent);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading remote component:", error);
      }
    };
    loadComponent();
  }, [fileName, componentName]);

  return Component;
};
