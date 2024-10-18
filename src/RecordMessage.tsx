import React from "react";

export const RecordMessage: React.FunctionComponent<RecordMessageProps> = (
  props: RecordMessageProps
): JSX.Element => {
  const { row } = props;

  return (
    <>
      {JSON.stringify(props)}
      Message: {row.entry}
    </>
  );
};

interface Labels {
  [key: string]: string;
}

interface LogRowModel {
  entryFieldIndex: number;
  rowIndex: number;
  rowId?: string;
  dataFrame: any;
  duplicates?: number;
  entry: string;
  hasAnsi: boolean;
  hasUnescapedContent: boolean;
  labels: Labels;
  logLevel: any;
  raw: string;
  searchWords?: string[];
  timeFromNow: string;
  timeEpochMs: number;
  timeEpochNs: string;
  timeLocal: string;
  timeUtc: string;
  uid: string;
  uniqueLabels?: Labels;
  datasourceType?: string;
}

type RecordModel = LogRowModel & {
  aliases?: { [key: string]: { [key: string]: string } };
  stringFieldName: string;
  json: Object | undefined;
};

interface RecordMessageProps {
  row: RecordModel;
  contextIsOpen: boolean;
  prettifyLogMessage: boolean;
  getRows?: () => RecordModel[];
  onToggleContext: () => void;
  showExpand: boolean;
  selected?: boolean;
  hover?: boolean;
}
