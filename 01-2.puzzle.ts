import {
  extractDataFromRawText,
  findHowManyTimesZeroIsHit,
} from "./01.functions.ts";
import { Rotation } from "./01.types.ts";

const START_POSITION = 50;
const NUMBERS_ON_DIAL = 99;

(() => {
  void puzzle1Part2();
})();

export async function puzzle1Part2() {
  const textData = await Deno.readTextFile("./01.data.txt");
  const rotations: Rotation[] = extractDataFromRawText(textData);
  const numberOfZeroSelections = findHowManyTimesZeroIsHit(
    rotations,
    START_POSITION,
    NUMBERS_ON_DIAL,
    true
  );
  console.log(`Zero has been hit and passed ${numberOfZeroSelections} times.`);
  return numberOfZeroSelections;
}
