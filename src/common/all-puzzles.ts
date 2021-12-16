import * as puzzle00 from "../puzzles/00";
import * as puzzle01 from "../puzzles/01";
import * as puzzle02 from "../puzzles/02";
import * as puzzle03 from "../puzzles/03";
import * as puzzle04 from "../puzzles/04";
import * as puzzle05 from "../puzzles/05";
import * as puzzle06 from "../puzzles/06";
import * as puzzle07 from "../puzzles/07";
import * as puzzle08 from "../puzzles/08";
import * as puzzle09 from "../puzzles/09";
import * as puzzle10 from "../puzzles/10";
import * as puzzle11 from "../puzzles/11";
import * as puzzle12 from "../puzzles/12";
import * as puzzle13 from "../puzzles/13";
import * as puzzle14 from "../puzzles/14";
import * as puzzle15 from "../puzzles/15";
import * as puzzle16 from "../puzzles/16";
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
  "08": [puzzle08.part1, puzzle08.part2],
  "09": [puzzle09.part1, puzzle09.part2],
  "10": [puzzle10.part1, puzzle10.part2],
  "11": [puzzle11.part1, puzzle11.part2],
  "12": [puzzle12.part1, puzzle12.part2],
  "13": [puzzle13.part1, puzzle13.part2],
  "14": [puzzle14.part1, puzzle14.part2],
  "15": [puzzle15.part1, puzzle15.part2],
  "16": [puzzle16.part1, puzzle16.part2],
};
