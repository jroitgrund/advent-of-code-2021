import _, {
  fill,
  filter,
  flatMap,
  forEach,
  groupBy,
  isNull,
  map,
  mapValues,
  some,
  sumBy,
  trim,
} from "lodash";

export interface Coord {
  x: number;
  y: number;
}

export interface Board {
  allNumbers: { [number: string]: Array<Coord> };
  drawnCoords: Set<string>;
  rowSize: number;
  colSize: number;
  numDrawnByRow: number[];
  numDrawnByCol: number[];
  score: number | null;
}

export function parseBoard(input: string): Board {
  const rowText = input.match(/[^\n]+/g);

  if (rowText == null) {
    throw new Error();
  }

  const rows = map(rowText, (row) => row.match(/[^\s]+/g));

  if (some(rows, isNull)) {
    throw new Error();
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const rowSize = rows[0]!.length;
  const colSize = rows.length;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  if (some(rows, (row) => row!.length != rowSize)) {
    throw new Error();
  }

  const numberCoordPairs = flatMap(rows, (row, y) =>
    map<string, [string, Coord]>(row, (num, x) => [num, { x, y }])
  );

  const allNumbers = mapValues(
    groupBy(numberCoordPairs, ([num]) => num),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (numCoordPairs) => map(numCoordPairs, ([_num, coord]) => coord)
  );

  const numDrawnByCol = new Array(rowSize);
  const numDrawnByRow = new Array(colSize);
  fill(numDrawnByCol, 0);
  fill(numDrawnByRow, 0);

  return {
    colSize,
    rowSize,
    allNumbers,
    drawnCoords: new Set(),
    numDrawnByCol,
    numDrawnByRow,
    score: null,
  };
}

function coordAsString(coord: Coord): string {
  return `${coord.x}, ${coord.y}`;
}

export function drawNumber(board: Board, number: number) {
  if (board.score != null) {
    return;
  }
  forEach(board.allNumbers[number], (coord) => {
    board.drawnCoords.add(coordAsString(coord));

    if (
      ++board.numDrawnByCol[coord.x] == board.colSize ||
      ++board.numDrawnByRow[coord.y] == board.rowSize
    ) {
      const allNumberCoordPairs = flatMap(board.allNumbers, (coords, n) =>
        map<Coord, [string, Coord]>(coords, (coord) => [n, coord])
      );
      const notDrawn = filter(
        allNumberCoordPairs,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_n, coord]) => !board.drawnCoords.has(coordAsString(coord))
      );

      board.score = sumBy(notDrawn, ([n]) => Number(n));
    }
  });
}

export function part1(input: string): number {
  const parts = map(input.split("\n\n"), trim);
  const numbers = map(parts[0].split(","), (n) => Number(trim(n)));
  const boards = map(parts.slice(1), (board) => parseBoard(board));

  for (const number of numbers) {
    for (const board of boards) {
      drawNumber(board, number);
      if (board.score != null) {
        return board.score * number;
      }
    }
  }

  throw new Error();
}

export function part2(input: string): number {
  const parts = map(input.split("\n\n"), trim);
  const numbers = map(parts[0].split(","), (n) => Number(trim(n)));
  const boards = map(parts.slice(1), (board) => parseBoard(board));

  for (const number of numbers) {
    for (const board of [...boards]) {
      drawNumber(board, number);
      if (board.score != null) {
        if (boards.length == 1) {
          return board.score * number;
        }
        _.pull(boards, board);
      }
    }
  }

  throw new Error();
}
