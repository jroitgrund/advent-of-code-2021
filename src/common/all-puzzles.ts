import { part1, part2 } from "../puzzles/00";
import { puzzle1part1 } from "../puzzles/01";
import { PuzzleSolver } from "./solver";

export const allPuzzles: { [key: string]: PuzzleSolver } = {
  "00": [part1, part2],
  // @ts-ignore
  "01": [puzzle1part1],
};
