import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.split(",").map(parseRange);
};

function parseRange(range: string): Range {
  const [start, end] = range.split("-").map((range) => parseInt(range, 10));
  return {
    start,
    end,
  };
}
