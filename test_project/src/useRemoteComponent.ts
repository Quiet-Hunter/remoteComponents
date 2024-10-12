import React, { lazy } from "react";

const loadRemoteComponent = (componentName: string) =>
  lazy(() => {
    return new Promise<{ default: React.ComponentType<any> }>(
      (resolve, reject) => {
        const scriptId = `remote-component-${componentName}`;

        if (!document.getElementById(scriptId)) {
          const script = document.createElement("script");
          script.id = scriptId;
          script.src = `https://quiet-hunter.github.io/remoteComponents/dist/${componentName}.js`;
          script.async = true;
          script.onload = () => {
            const LoadedComponent = (window as any)?.[componentName];
            if (LoadedComponent) {
              resolve(LoadedComponent);
            } else {
              reject(new Error(`Component ${componentName} not found `));
            }
          };
          script.onerror = () =>
            reject(new Error(`Failed to load ${componentName}`));
          document.body.appendChild(script);
        } else {
          const LoadedComponent = (window as any)?.[componentName];
          if (LoadedComponent) {
            resolve(LoadedComponent);
          } else {
            reject(new Error(`Component ${componentName} not found`));
          }
        }
      }
    );
  });

export const useRemoteComponent = (componentName: string) =>
  loadRemoteComponent(componentName);
