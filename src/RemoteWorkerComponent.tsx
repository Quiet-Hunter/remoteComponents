import React, { Suspense } from "react";

import { register, wrap } from "react-worker-components";
const RemoteComponent: React.FC<any> = (props) => (
  <>
    <div>RemoteComponent.tsx</div>
    <div>Props: {JSON.stringify(props)}</div>
  </>
);

register(RemoteComponent, "RemoteComponent");

const WorkerComponent = wrap(
  () => new Worker(new URL("./component.worker"))
) as React.FC<any>;

const RemoteWorkerComponent = (props: any) => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <WorkerComponent {...props}>
          <RemoteComponent {...props} />
        </WorkerComponent>
      </Suspense>
    </div>
  );
};

export default RemoteWorkerComponent;
