import React from "react";

import BattleResults from "./BattleResults";
import { parse } from "../utils/parser";

export interface TypeWrapperProps {
  json: { [k: string]: any };
}

const TypeWrapper: React.FC<TypeWrapperProps> = (props) => {
  console.log(props);
  let json = props.json;
  if (json.hasOwnProperty("extra")) {
    json = { ...json, ...JSON.parse(json.extra) };
  }

  if (
    json.hasOwnProperty("_message") &&
    (json.message as string).endsWith("messages.accounts.arena.request.Results")
  ) {
    return <BattleResults data={parse(json._message)} />;
  }
  return <span color="red">Wrong format: {JSON.stringify(json)}</span>;
};

export default TypeWrapper;
