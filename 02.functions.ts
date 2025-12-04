import { Range } from "./02.types.ts";

export const parseRanges = (rawRanges: string): Range[] => {
  return rawRanges.trim().replaceAll("\n", "").split(",").map(parseRange);
};

export const sumInvalidIDs = (
  ranges: Range[],
  countIDsWithSeveralRepetitions?: boolean
): number => {
  const invalidIDs: number[][] = ranges.map((range) =>
    getInvalidIDs(range, countIDsWithSeveralRepetitions)
  );
  return sumAllNumbers(invalidIDs.flat());
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
    if (countIDsWithSeveralRepetitions) {
      if (idIsMadeOfRepetitions(id)) invalidIds.push(i);
    } else {
      if (idIsMadeOfOneRepetition(id)) invalidIds.push(i);
    }
  }
  return invalidIds;
}

function sumAllNumbers(numbers: number[]): number {
  return numbers.reduce((a, b) => (a += b), 0);
}

function idIsMadeOfOneRepetition(id: string): boolean {
  const idLengthIsEven = id.length % 2 === 0;
  if (!idLengthIsEven) return false;
  const halfIndex = id.length / 2;
  const firstHalf = id.slice(0, halfIndex);
  const lastHalf = id.slice(halfIndex);
  return firstHalf === lastHalf;
}

function idIsMadeOfRepetitions(id: string): boolean {
  let foundRepetition = false;
  for (
    let lengthForPartToTest = 2;
    lengthForPartToTest <= Math.floor(id.length / 2);
    lengthForPartToTest++
  ) {
    if ((id.length / lengthForPartToTest) % 1 === 0) {
      const partOfId = id.slice(0, lengthForPartToTest);
      const repeatedPart = partOfId.repeat(id.length / lengthForPartToTest);
      if (repeatedPart === id) foundRepetition = true;
    }
  }
  return foundRepetition;
}
