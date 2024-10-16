import React from "react";

const TextComponent: React.FC<{ text: string }> = ({ text }) => (
  <>
    <div>TextComponent.tsx</div>
    <div>Props: {text}</div>
  </>
);

export default TextComponent;
