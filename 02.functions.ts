import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.trim().replace("\n", "").split(",").map(parseRange);
};

export const sumInvalidIDs = (
  ranges: Range[],
  countIDsWithSeveralRepetitions?: boolean
): number => {
  const invalidIDs: number[][] = ranges.map((range) =>
    getInvalidIDs(range, countIDsWithSeveralRepetitions)
  );
  return sumAllNumbers(invalidIDs.map(sumAllNumbers));
};

function parseRange(range: string): Range {
  const [start, end] = range.split("-").map((range) => parseInt(range, 10));
  return {
    start,
    end,
  };
}

export function getInvalidIDs(
  { start, end }: Range,
  countIDsWithSeveralRepetitions?: boolean
): number[] {
  const invalidIds: number[] = [];
  for (let i = start; i <= end; i++) {
    const id = i.toString();
    const idLengthIsEven = id.length % 2 === 0;
    if (idLengthIsEven && id[0] !== "0") {
      if (countIDsWithSeveralRepetitions) {
        if (idIsMadeOfRepetitions(id)) invalidIds.push(i);
      } else {
        if (idIsMadeOfOneRepetition(id)) invalidIds.push(i);
      }
    }
  }
  return invalidIds;
}

function sumAllNumbers(numbers: number[]): number {
  return numbers.reduce((a, b) => (a += b), 0);
}

function idIsMadeOfOneRepetition(id: string): boolean {
  const halfIndex = id.length / 2;
  const firstHalf = id.slice(0, halfIndex);
  const lastHalf = id.slice(halfIndex);
  return firstHalf === lastHalf;
}

function idIsMadeOfRepetitions(id: string): boolean {
  return true;
}
