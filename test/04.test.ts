import { parseBoard, drawNumber, Board } from "../src/puzzles/04";

describe("04", () => {
  test("simplest board", () => {
    const board: Board = parseBoard("1 2 3\n4 5 6\n7 8 9");
    expect(board.score).toBeNull();

    drawNumber(board, 1);
    expect(board.score).toBeNull();

    drawNumber(board, 2);
    expect(board.score).toBeNull();

    drawNumber(board, 3);
    expect(board.score).toBe(4 + 5 + 6 + 7 + 8 + 9);
  });

  test("by column", () => {
    const board: Board = parseBoard("1 2 3\n4 5 6\n7 8 9");
    expect(board.score).toBeNull();

    drawNumber(board, 1);
    expect(board.score).toBeNull();

    drawNumber(board, 4);
    expect(board.score).toBeNull();

    drawNumber(board, 7);
    expect(board.score).toBe(2 + 3 + 5 + 6 + 8 + 9);
  });
});
