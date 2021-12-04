import * as puzzle00 from "../puzzles/00";
import * as puzzle01 from "../puzzles/01";
import * as puzzle02 from "../puzzles/02";
import * as puzzle03 from "../puzzles/03";
import * as puzzle04 from "../puzzles/04";
import { PuzzleSolver } from "./solver";

export const allPuzzles: { [key: string]: PuzzleSolver } = {
  "00": [puzzle00.part1, puzzle00.part2],
  "01": [puzzle01.part1, puzzle01.part2],
  "02": [puzzle02.part1, puzzle02.part2],
  "03": [puzzle03.part1, puzzle03.part2],
  "04": [puzzle04.part1, puzzle04.part2],
};
