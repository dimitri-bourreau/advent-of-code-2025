import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.split(",").map(parseRange);
};

export const countInvalidIDs = (ranges: Range[]): number => {
  const counts = ranges.map(countInvalidIDsForRange);
  return counts.reduce((a, b) => (a += b), 0);
};

function parseRange(range: string): Range {
  const [start, end] = range.split("-").map((range) => parseInt(range, 10));
  return {
    start,
    end,
  };
}

function countInvalidIDsForRange({ start, end }: Range): number {
  let count = 0;
  for (let i = start; i <= end; i++) {
    const rangeAsString = i.toString();
    const idIsEven = rangeAsString.length % 2 === 0;
    if (idIsEven) {
      const halfIndex = rangeAsString.length / 2;
      const firstHalf = rangeAsString.slice(0, halfIndex);
      const lastHalf = rangeAsString.slice(halfIndex);
      if (firstHalf === lastHalf) count++;
    }
  }
  return count;
}
