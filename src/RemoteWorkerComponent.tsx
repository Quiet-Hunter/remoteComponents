import React, { Suspense, useState } from "react";

import { register, wrap } from "react-worker-components";
import RemoteComponent from "./RemoteComponent";

register(RemoteComponent, "RemoteComponent");

const WorkerComponent = wrap(
  () => new Worker(new URL("./component.worker"))
) as React.FC<any>;

const RemoteWorkerComponent = (props: any) => {
  return (
    <div>
      <Suspense fallback="Loading...">
        <WorkerComponent {...props}>
          <RemoteComponent />
        </WorkerComponent>
      </Suspense>
    </div>
  );
};

export default RemoteWorkerComponent;
