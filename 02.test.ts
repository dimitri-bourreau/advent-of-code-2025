import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { parseRanges, getInvalidIDs } from "./02.functions.ts";
import { puzzle2 } from "./02-1.puzzle.ts";

describe("[Puzzle 2]", () => {
  describe("Good result for Advend of code", () => {
    it("PUZZLE 2-1", async () => {
      const result = await puzzle2();
      expect(result).not.toBe(644);
      expect(result).toBe(40398804950);
    });

    it("PUZZLE 2-2", async () => {
      const resultWithSeveralRepetitions = await puzzle2(true);
      expect(resultWithSeveralRepetitions).not.toBe(25481660352);
      expect(resultWithSeveralRepetitions).not.toBe(65783535574);
      expect(resultWithSeveralRepetitions).toBe(65794984339);
    });
  });

  describe("parseRanges()", () => {
    it("should parse '11-22' to [{start: 11, end: 22}]", () => {
      const parsedRanges = parseRanges("11-22");
      const expectedRanges = [{ start: 11, end: 22 }];
      expect(parsedRanges).toEqual(expectedRanges);
    });

    it("should parse '11-22,1188511880-1188511890' to [{start: 11, end: 22},{start: 1188511880, end: 1188511890}]", () => {
      const parsedRanges = parseRanges("11-22,1188511880-1188511890");
      const expectedRanges = [
        { start: 11, end: 22 },
        { start: 1188511880, end: 1188511890 },
      ];
      expect(parsedRanges).toEqual(expectedRanges);
    });
  });

  describe("getInvalidIDs()", () => {
    it("should count 2 invalid IDs for range 11-22", () => {
      const invalidIDsCount = getInvalidIDs({ start: 11, end: 22 });
      expect(invalidIDsCount.length).toBe(2);
    });

    it("should count 1 invalid IDs for range 95-115", () => {
      const invalidIDsCount = getInvalidIDs({ start: 95, end: 115 });
      expect(invalidIDsCount.length).toBe(1);
    });

    it("should count 1 invalid IDs for range 1188511880-1188511890", () => {
      const invalidIDsCount = getInvalidIDs({
        start: 1188511880,
        end: 1188511890,
      });
      expect(invalidIDsCount.length).toBe(1);
    });

    describe("count IDs with several repetitions", () => {
      it("should count 0 invalid ID for 824824821-824824827 without countIDsWithSeveralRepetitions to true", () => {
        const invalidIDsCount = getInvalidIDs({
          start: 824824821,
          end: 824824827,
        });
        expect(invalidIDsCount.length).toBe(0);
      });

      it("should count 1 invalid ID for 824824821-824824827 with countIDsWithSeveralRepetitions to true", () => {
        const invalidIDsCount = getInvalidIDs(
          {
            start: 824824821,
            end: 824824827,
          },
          true
        );
        expect(invalidIDsCount.length).toBe(1);
      });

      it("should count 1 invalid ID for 565653-565659 with countIDsWithSeveralRepetitions to true", () => {
        const invalidIDsCount = getInvalidIDs(
          {
            start: 565653,
            end: 565659,
          },
          true
        );
        expect(invalidIDsCount.length).toBe(1);
      });

      it("should count 1 invalid ID for 2121212118-2121212124 with countIDsWithSeveralRepetitions to true", () => {
        const invalidIDsCount = getInvalidIDs(
          {
            start: 2121212118,
            end: 2121212124,
          },
          true
        );
        expect(invalidIDsCount.length).toBe(1);
      });
    });
  });
});
