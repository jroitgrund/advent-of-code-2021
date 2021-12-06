import { filter, isNull, some } from "lodash";

function addCoord(
  linesAtCoord: { [key: string]: number },
  coord: [number, number]
) {
  const [x, y] = coord;
  const coordAsString = `${x},${y}`;
  linesAtCoord[coordAsString] = (linesAtCoord[coordAsString] ?? 0) + 1;
}

type LinePredicate = (line: [number, number, number, number]) => boolean;

const isNotDiagonal: LinePredicate = ([x1, y1, x2, y2]) => x1 == x2 || y1 == y2;

export function part1(
  input: string,
  linePredicate: LinePredicate = isNotDiagonal
): number {
  const lines = input
    .match(/[^\n/]+/g)
    ?.map((line) => line.match(/\d+/g)?.map(Number)) as Array<
    [number, number, number, number]
  >;

  if (lines == null || some(lines, isNull)) {
    throw new Error();
  }

  const onlyHorizontalAndVertical = lines.filter(linePredicate);

  const linesAtCoord: { [key: string]: number } = {};
  for (const [x1, y1, x2, y2] of onlyHorizontalAndVertical) {
    let x = x1;
    let y = y1;
    const xDir = x == x2 ? 0 : x > x2 ? -1 : 1;
    const yDir = y == y2 ? 0 : y > y2 ? -1 : 1;

    while (x != x2 || y != y2) {
      addCoord(linesAtCoord, [x, y]);
      x += xDir;
      y += yDir;
    }

    if (x != x2 || y != y2) {
      throw new Error();
    }

    addCoord(linesAtCoord, [x, y]);
  }

  return Object.values(linesAtCoord).filter((numLines) => numLines >= 2).length;
}

export function part2(input: string): number {
  return part1(input, () => true);
}
