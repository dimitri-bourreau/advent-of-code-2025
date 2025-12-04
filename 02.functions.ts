import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  const [start, end] = rawRanges.split("-").map((range) => parseInt(range, 10));
  return [
    {
      start,
      end,
    },
  ];
};
