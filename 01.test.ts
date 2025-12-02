import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import {
  extractDataFromRawText,
  findHowManyTimesZeroIsHit,
  handlePositionIfOutsideRange,
} from "./01.functions.ts";
import { Rotation } from "./01.types.ts";
import { puzzle1 } from "./01-1.puzzle.ts";

it("[Puzzle 1-1] should return 1089", async () => {
  expect(await puzzle1()).toBe(1089);
});

describe("extractDataFromRawText", () => {
  it("should extract three lines", () => {
    const rotations: Rotation[] = extractDataFromRawText("L50\nR50\nL16");
    expect(rotations.length).toBe(3);
  });

  it("should return -50 +18 -20", () => {
    const rotations: Rotation[] = extractDataFromRawText("L50\nR18\nL20");
    const expected: Rotation[] = [
      {
        direction: "L",
        iterations: 50,
      },
      {
        direction: "R",
        iterations: 18,
      },
      {
        direction: "L",
        iterations: 20,
      },
    ];
    expect(rotations).toEqual(expected);
  });
});

describe("findHowManyTimesZeroIsHit", () => {
  it("should return 1 hit for default 50 and 99 numbers: -50", () => {
    const rotations: Rotation[] = [{ direction: "L", iterations: 50 }];
    const numberOfZeroHits = findHowManyTimesZeroIsHit(rotations, 50, 99);
    expect(numberOfZeroHits).toBe(1);
  });

  it("should return 0 hits for default 50 and 99 numbers: -99 +99", () => {
    const rotations: Rotation[] = [
      { direction: "L", iterations: 99 },
      { direction: "R", iterations: 99 },
    ];
    const numberOfZeroHits = findHowManyTimesZeroIsHit(rotations, 50, 99);
    expect(numberOfZeroHits).toBe(0);
  });

  it("should return 3 hits for default 50 and 99 numbers: -50 -100 +100", () => {
    const rotations: Rotation[] = [
      { direction: "L", iterations: 50 },
      { direction: "L", iterations: 100 },
      { direction: "R", iterations: 100 },
    ];
    const numberOfZeroHits = findHowManyTimesZeroIsHit(rotations, 50, 99);
    expect(numberOfZeroHits).toBe(3);
  });
});

describe("handlePositionIfOutsideRange()", () => {
  it("should let position at 0 when given position 0 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(0, 99);
    expect(newPosition).toBe(0);
  });

  it("should return position 82 when given position -18 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(-18, 99);
    expect(newPosition).toBe(82);
  });

  it("should return position 52 when given position 52 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(52, 99);
    expect(newPosition).toBe(52);
  });

  it("should return position 99 when given position -1 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(-1, 99);
    expect(newPosition).toBe(99);
  });

  it("should return position 1 when given position 1 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(1, 99);
    expect(newPosition).toBe(1);
  });

  it("should return position 0 when given position 100 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(100, 99);
    expect(newPosition).toBe(0);
  });

  it("should return position 1 when given position 101 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(101, 99);
    expect(newPosition).toBe(1);
  });

  it("should return position 10 when given position 110 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(110, 99);
    expect(newPosition).toBe(10);
  });

  it("should return position 95 when given position -5 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(110, 99);
    expect(newPosition).toBe(10);
  });

  it("should return position 60 when given position 560 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(560, 99);
    expect(newPosition).toBe(60);
  });

  it("should return position 66 when given position -234 and 99 numbers on dial", () => {
    const newPosition = handlePositionIfOutsideRange(-234, 99);
    expect(newPosition).toBe(66);
  });
});
