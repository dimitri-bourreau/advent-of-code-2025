import { sumInvalidIDs, parseRanges } from "./02.functions.ts";

(() => {
  void puzzle2();
})();

export async function puzzle2() {
  const textData = await Deno.readTextFile("./02.data.txt");
  const ranges = parseRanges(textData);
  const invalidIDsCount = sumInvalidIDs(ranges);
  console.log(`Invalid IDs' sum: ${invalidIDsCount}`);
  return invalidIDsCount;
}
