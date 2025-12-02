import { Rotation } from "./01.types.ts";

export function extractDataFromRawText(rawText: string): Rotation[] {
  return rawText
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => ({
      direction: line.slice(0, 1) as Rotation["direction"],
      iterations: parseInt(line.slice(1), 10),
    }));
}

export function findHowManyTimesZeroIsHit(
  rotations: Rotation[],
  startPosition: number,
  numbersOnDial: number
): number {
  let position = startPosition;
  let numberOfZeroSelections = 0;

  for (const { direction, iterations } of rotations) {
    if (direction === "L") {
      position -= iterations;
    } else {
      position += iterations;
    }
    position = handlePositionIfOutsideRange(position, numbersOnDial);
    if (position === 0) numberOfZeroSelections++;
  }

  return numberOfZeroSelections;
}

export function handlePositionIfOutsideRange(
  position: number,
  numbersOnDial: number
): number {
  const moduloPosition = position % (numbersOnDial + 1);
  if (moduloPosition < 0) return moduloPosition + numbersOnDial + 1;
  if (numbersOnDial < moduloPosition) return moduloPosition - numbersOnDial + 1;
  return moduloPosition;
}
