import React from "react";
import RemoteWorkerComponent from "./RemoteWorkerComponent";

onmessage = function (e) {
  console.log(
    "Worker: Message received from main script: " + JSON.stringify(e.data)
  );
  postMessage(<RemoteWorkerComponent {...{ textProps: e.data }} />);
};
