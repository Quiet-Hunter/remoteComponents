import React from "react";

import BattleResults from "./BattleResults";
import { parse } from "../utils/parser";

export interface TypeWrapperProps {
  json: { [k: string]: any };
}

export const TypeWrapper: React.FC<TypeWrapperProps> = ({ json }) => {
  if (json.hasOwnProperty("extra")) {
    json = { ...json, ...JSON.parse(json.extra) };
  }

  if (
    json.hasOwnProperty("_message") &&
    (json.message as string).endsWith("messages.accounts.arena.request.Results")
  ) {
    return <BattleResults data={parse(json._message)} />;
  }

  throw new Error("Wrong format");
};
