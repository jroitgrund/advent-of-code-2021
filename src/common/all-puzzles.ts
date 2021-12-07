import * as puzzle00 from "../puzzles/00";
import * as puzzle01 from "../puzzles/01";
import * as puzzle02 from "../puzzles/02";
import * as puzzle03 from "../puzzles/03";
import * as puzzle04 from "../puzzles/04";
import * as puzzle05 from "../puzzles/05";
import * as puzzle06 from "../puzzles/06";
import * as puzzle07 from "../puzzles/07";
import { PuzzleSolver } from "./solver";

export const allPuzzles: { [key: string]: PuzzleSolver } = {
  "00": [puzzle00.part1, puzzle00.part2],
  "01": [puzzle01.part1, puzzle01.part2],
  "02": [puzzle02.part1, puzzle02.part2],
  "03": [puzzle03.part1, puzzle03.part2],
  "04": [puzzle04.part1, puzzle04.part2],
  "05": [puzzle05.part1, puzzle05.part2],
  "06": [puzzle06.part1, puzzle06.part2],
  "07": [puzzle07.part1, puzzle07.part2],
};
