import React, { useEffect, useState } from "react";

const getURL = (compName: string) =>
  `https://quiet-hunter.github.io/remoteComponents/dist/${compName}.js`;

export const useRemoteComponent = (libName: string, compName: string) => {
  const [Component, setComponent] = useState<React.FC<any> | null>(null);

  useEffect(() => {
    const loadComponent = async () => {
      const url = getURL(compName);
      try {
        const script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = () => {
          const LoadedComponent = (window as any)[libName]?.default;
          setComponent(() => LoadedComponent);
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error("Error loading remote component:", error);
      }
    };
    loadComponent();
  }, [compName, libName]);

  return Component;
};
