import React from "react";

const CbComponent: React.FC<{ cb: () => void }> = ({ cb }) => (
  <>
    <div>CbComponent.tsx</div>
    <div onClick={cb}>Click me!</div>
  </>
);

export default CbComponent;
