import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { parseRanges } from "./02.functions.ts";

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
});
