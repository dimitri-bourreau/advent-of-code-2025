import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { countInvalidIDs, parseRanges } from "./02.functions.ts";

describe("[Puzzle 2]", () => {
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

  describe("countInvalidIDs()", () => {
    it("should count 2 invalid IDs for range 11-22", () => {
      const invalidIDsCount = countInvalidIDs([{ start: 11, end: 22 }]);
      expect(invalidIDsCount).toBe(2);
    });

    it("should count 1 invalid IDs for range 95-115", () => {
      const invalidIDsCount = countInvalidIDs([{ start: 95, end: 115 }]);
      expect(invalidIDsCount).toBe(1);
    });

    it("should count 1 invalid IDs for range 1188511880-1188511890", () => {
      const invalidIDsCount = countInvalidIDs([
        { start: 1188511880, end: 1188511890 },
      ]);
      expect(invalidIDsCount).toBe(1);
    });
  });
});
