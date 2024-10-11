import React, { lazy } from "react";

const loadRemoteComponent = (globalVar: string, componentName: string) =>
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
            const LoadedComponent = (window as any)[globalVar]?.[componentName];
            if (LoadedComponent) {
              resolve({ default: LoadedComponent });
            } else {
              reject(
                new Error(
                  `Component ${componentName} not found on ${globalVar}`
                )
              );
            }
          };
          script.onerror = () =>
            reject(new Error(`Failed to load ${componentName}`));
          document.body.appendChild(script);
        } else {
          const LoadedComponent = (window as any)[globalVar]?.[componentName];
          if (LoadedComponent) {
            resolve({ default: LoadedComponent });
          } else {
            reject(
              new Error(`Component ${componentName} not found on ${globalVar}`)
            );
          }
        }
      }
    );
  });

export const useRemoteComponent = (globalVar: string, componentName: string) =>
  loadRemoteComponent(globalVar, componentName);
