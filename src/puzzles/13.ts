import { map, max } from "lodash";

function parseInput(input: string) {
  const [dotsPart, foldsPart] = input.split("\n\n") as [string, string];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const dots = dotsPart
    .match(/[^\n]+/g)!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((line) => line.match(/\d+/g)!.map(Number) as [number, number]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const folds = foldsPart
    .match(/[^\n]+/g)!
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    .map((line) => line.match(/([x|y])=(\d+)/)!.slice(1))
    .map(([direction, at]) => [direction, Number(at)] as [string, number]);

  return { dots, folds };
}

export function part1(input: string): number {
  const { folds, dots } = parseInput(input);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [direction, location] = folds.shift()!;
  const newDots = [];
  const setOfDots: Set<string> = new Set();
  while (dots.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    let [x, y] = dots.pop()!;
    if (x > location && direction === "x") {
      x = location - (x - location);
    } else if (y > location && direction === "y") {
      y = location - (y - location);
    }

    const stringFormattedDot = `${x},${y}`;
    if (!setOfDots.has(stringFormattedDot)) {
      newDots.push([x, y]);
      setOfDots.add(stringFormattedDot);
    }
  }
  return newDots.length;
}

export function part2(input: string): number {
  const { folds, dots } = parseInput(input);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  while (folds.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [direction, location] = folds.shift()!;
    const newDots: Array<[number, number]> = [];
    const setOfDots: Set<string> = new Set();
    while (dots.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      let [x, y] = dots.pop()!;
      if (x > location && direction === "x") {
        x = location - (x - location);
      } else if (y > location && direction === "y") {
        y = location - (y - location);
      }

      const stringFormattedDot = `${x},${y}`;
      if (!setOfDots.has(stringFormattedDot)) {
        newDots.push([x, y]);
        setOfDots.add(stringFormattedDot);
      }
    }
    dots.push(...newDots);
  }
  printDots(dots);
  return 0;
}

function printDots(dots: Array<[number, number]>) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const width = max(map(dots, ([x]) => x))! + 1;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const height = (max(map(dots, ([_x, y]) => y)) ?? 0) + 1;

  const grid = new Array(height).fill("").map(() => new Array(width).fill("."));
  dots.forEach(([x, y]) => (grid[y][x] = "#"));
  //   console.log(grid.map((row) => row.join("")).join("\n"));
}
