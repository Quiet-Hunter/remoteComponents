import React, { ReactNode } from "react";

import { expose } from "react-worker-components";

self.onmessage = (event) => {
  console.log(
    "Message received (props to serialize): " + JSON.stringify(event.data)
  );
};

const BattleResult = ({
  row,
  children,
}: {
  row: { entry: string };
  children: ReactNode;
}) => {
  return (
    <div>
      <div style={{ color: "red" }}>{row?.entry || ""}</div>
      {children}
    </div>
  );
};

expose(BattleResult);
