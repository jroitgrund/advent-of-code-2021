import {
  isUser,
  printAllPuzzleSolutions,
  printPuzzleSolutions,
} from "./run-puzzle";

const user: string = process.argv[2];

if (!isUser(user)) {
  throw Error("User must be 'jonathan', 'lewis', or 'romain'");
}

const puzzleNumber: string | undefined = process.argv[3];

if (puzzleNumber != undefined) {
  printPuzzleSolutions(puzzleNumber, user);
} else {
  printAllPuzzleSolutions(user);
}
