import { readFile } from "fs/promises";
import { each, map } from "lodash";
import { allPuzzles } from "../src/common/all-puzzles";

async function getTestInput(puzzleNumber: string) {
  return (await readFile(`puzzles/${puzzleNumber}/test-input.txt`)).toString();
}

async function getTestAnswers(puzzleNumber: string) {
  return map(
    (await readFile(`puzzles/${puzzleNumber}/test-answers.txt`))
      .toString()
      .split("\n"),
    (n) => Number(n)
  );
}

each(allPuzzles, (solver, puzzleNumber) => {
  describe(`Puzzle ${puzzleNumber} (part 1)`, () => {
    const testInput = getTestInput(puzzleNumber);
    const answers = getTestAnswers(puzzleNumber);
    test("Part 1", async () =>
      expect(solver[0](await testInput)).toBe((await answers)[0]));
    test("Part 2", async () =>
      expect(solver[1](await testInput)).toBe((await answers)[1]));
  });
});
