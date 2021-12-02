import * as puzzle00 from "../puzzles/00";
import * as puzzle01 from "../puzzles/01";
import * as puzzle02 from "../puzzles/02";
import { PuzzleSolver } from "./solver";

export const allPuzzles: { [key: string]: PuzzleSolver } = {
  "00": [puzzle00.part1, puzzle00.part2],
  "01": [puzzle01.part1, puzzle01.part2],
  "02": [puzzle02.part1, puzzle02.part2],
};
