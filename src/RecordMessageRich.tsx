import React, { useEffect, useState } from "react";
import { ansicolor } from "ansicolor";

const hexRe = /[0-9a-f]{2}$/g;
const hexxRe = /(\\x[0-9a-f]{2})/g;

type MentionRepr = [hexRepr: string, alias: string];
type MentionChunk = { text: string; repr?: MentionRepr };

interface ParsedChunk {
  style: Style;
  text: string;
}

interface RecordMessageRichProps {
  value: string;
  mentions?: { [substr: string]: MentionRepr };
  msgExpandedLimit: number;
  mentionMinLength: number;
}

interface RecordMessageRichState {
  chunks: ParsedChunk[];
  prevValue: string;
  expanded: boolean;
}

const jsonStyle = {
  fontWeight: "bold",
  backgroundColor: "#111",
  border: "solid #333 1px",
};

const mentionStyle = {
  fontStyle: "italic",
  color: "#777",
  backgroundColor: "#222",
  border: "solid #777 1px",
};

interface Style {
  [key: string]: string;
}

function convertCSSToStyle(css: string): Style {
  return css.split(/;\s*/).reduce((accumulated: Style, line) => {
    const match = line.match(/([^:\s]+)\s*:\s*(.+)/);
    if (match && match[1] && match[2]) {
      const key = match[1].replace(/-([a-z])/g, (_, character) =>
        character.toUpperCase()
      );
      accumulated[key] = match[2];
    }
    return accumulated;
  }, {});
}

export const RecordMessageRich: React.FunctionComponent<
  RecordMessageRichProps
> = (props: RecordMessageRichProps): JSX.Element => {
  const [state, setState] = useState<RecordMessageRichState>({
    chunks: [],
    prevValue: "",
    expanded: false,
  });

  const { value, mentions, msgExpandedLimit, mentionMinLength } = props;
  if (mentions) {
    delete mentions[""];
  }
  useEffect(() => {
    if (value !== state.prevValue) {
      const parsed = ansicolor.parse(value);
      const chunks: any = parsed.spans.map((span: any) => {
        return span.css
          ? {
              style: convertCSSToStyle(span.css),
              text: span.text,
            }
          : { text: span.text };
      });
      setState({ chunks, prevValue: value, expanded: state.expanded });
    }
  }, [state.expanded, state.prevValue, value]);

  const onExpandClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setState({ ...state, expanded: !state.expanded });
  };

  const mentionsProcessor = (text: string) => {
    if (!mentions || !Object.keys(mentions) || !Object.keys(mentions).pop()) {
      return <>{text}</>;
    }

    return mentionize(text, mentions, mentionMinLength).map((chunk, i) =>
      chunk.repr ? (
        <span
          title={chunk.text}
          style={mentionStyle}
          key={chunk.text + chunk.repr}
        >
          {chunk.repr[1]}
        </span>
      ) : (
        <>{chunk.text}</>
      )
    );
  };

  return (
    <>
      {!state.expanded &&
        value.length < msgExpandedLimit &&
        mentionsProcessor(value)}
      {!state.expanded && value.length >= msgExpandedLimit && (
        <span style={jsonStyle} onClick={onExpandClick}>
          {mentionsProcessor(value.substring(0, msgExpandedLimit))}
          ...
        </span>
      )}
      {state.expanded &&
        state.chunks.map((chunk, index) =>
          chunk.style ? (
            <span
              key={chunk.text + index}
              style={chunk.style}
              data-testid={"log_message_ansi"}
            >
              {mentionsProcessor(chunk.text)}
            </span>
          ) : (
            <React.Fragment key={chunk.text + index}>
              {mentionsProcessor(chunk.text)}
            </React.Fragment>
          )
        )}
      {state.expanded && (
        <span style={jsonStyle} onClick={onExpandClick}>
          &uarr;&uarr;&uarr;
        </span>
      )}
    </>
  );
};

function mentionize(
  s: string,
  mentions: { [substr: string]: MentionRepr },
  mentionMinLength: number
): MentionChunk[] {
  if (typeof s !== "string") {
    return s;
  }
  const chunks = mentions
    ? Object.entries(mentions).reduce(
        (chunks, [substr, repr]) => {
          if (substr.length < mentionMinLength) {
            return chunks;
          }
          return chunks.flatMap((chunk) => {
            if (!chunk.text.includes(substr)) {
              return [chunk];
            }
            if (chunk.text === substr) {
              return [
                {
                  text: substr,
                  repr: repr,
                } as MentionChunk,
              ];
            }

            const chunks = chunk.text.split(substr);

            return chunks.flatMap<MentionChunk>((chunk, idx, chunks) =>
              idx === chunks.length - 1
                ? [{ text: chunk }]
                : [{ text: chunk }].concat({
                    text: substr,
                    repr: repr,
                  } as MentionChunk)
            );
          });
        },
        [{ text: s } as MentionChunk]
      )
    : [{ text: s } as MentionChunk];

  return chunks.map((mentionChunk) => {
    const s = humanify(mentionChunk.text);
    if (s === mentionChunk.text) {
      return mentionChunk;
    }

    return {
      ...mentionChunk,
      text: s,
    };
  });
}

function humanify(s: string): string {
  if (
    Array.from(s.matchAll(hexRe)).filter((m: RegExpMatchArray) => {
      return parseInt(m[0], 16) > 32 && parseInt(m[0], 16) < 127;
    }).length ===
    s.length / 2
  ) {
    return (s.match(/.{2}/g) || [])
      .map((v: string) => String.fromCharCode(parseInt(v, 16)))
      .join("");
  } else if (s.match(hexxRe)) {
    return s.replace(hexxRe, (m: string) =>
      String.fromCharCode(parseInt(m, 16))
    );
  } else {
    return s;
  }
}
