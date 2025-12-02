/*
https://adventofcode.com/2025/day/1
 */

interface Rotation {
  direction: "L" | "R";
  iterations: number;
}

(async () => {
  const textData = await Deno.readTextFile("./01.data.txt");
  const rotations: Rotation[] = textData
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => ({
      direction: line.slice(0, 1) as Rotation["direction"],
      iterations: parseInt(line.slice(1), 10),
    }));

  console.log(rotations);
})();
