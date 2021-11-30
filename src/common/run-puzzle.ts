import { readFile } from "fs/promises";
import { each, includes } from "lodash";
import { allPuzzles } from "./all-puzzles";
import { PuzzleSolver } from "./solver";

export type User = "jonathan" | "lewis" | "romain";

export function isUser(user: string): user is User {
  return includes(["jonathan", "lewis", "romain"], user);
}

export const getPuzzleSolutions = async (
  puzzleNumber: string,
  user: User,
  solver: PuzzleSolver
) => {
  const puzzleInput = (
    await readFile(`puzzles/${puzzleNumber}/input-${user}.txt`)
  ).toString();

  return [solver[0](puzzleInput), solver[1](puzzleInput)];
};

export const printPuzzleSolutions = async (
  puzzleNumber: string,
  user: User
) => {
  const solutions = await getPuzzleSolutions(
    puzzleNumber,
    user,
    allPuzzles[puzzleNumber]
  );
  console.log(
    `Puzzle ${puzzleNumber} (${user})\nPart 1: ${solutions[0]}\nPart 2: ${solutions[1]}\n\n`
  );
};

export const printAllPuzzleSolutions = async (user: User) => {
  each(allPuzzles, (_, puzzleNumber) => {
    printPuzzleSolutions(puzzleNumber, user);
  });
};
