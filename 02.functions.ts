import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.trim().replace("\n", "").split(",").map(parseRange);
};

export const sumInvalidIDs = (ranges: Range[]): number => {
  const invalidIDs: number[][] = ranges.map(getInvalidIDs);
  return sumAllNumbers(invalidIDs.map(sumAllNumbers));
};

function parseRange(range: string): Range {
  const [start, end] = range.split("-").map((range) => parseInt(range, 10));
  return {
    start,
    end,
  };
}

export function getInvalidIDs({ start, end }: Range): number[] {
  const invalidIds: number[] = [];
  for (let i = start; i <= end; i++) {
    const rangeAsString = i.toString();
    const idLengthIsEven = rangeAsString.length % 2 === 0;
    if (rangeAsString[0] === "0") invalidIds.push(i);
    if (idLengthIsEven) {
      const halfIndex = rangeAsString.length / 2;
      const firstHalf = rangeAsString.slice(0, halfIndex);
      const lastHalf = rangeAsString.slice(halfIndex);
      if (firstHalf === lastHalf) invalidIds.push(i);
    }
  }
  return invalidIds;
}

function sumAllNumbers(numbers: number[]): number {
  return numbers.reduce((a, b) => (a += b), 0);
}
