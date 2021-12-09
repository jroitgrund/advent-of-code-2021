import { every, reduce, sortBy, sum } from "lodash";

function parseInput(input: string): number[][] {
  return (
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    input
      .match(/[^\s]+/g)!
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      .map((line) => line.match(/\d/g)!.map(Number))
  );
}

function findNeighbours(grid: number[][], location: [number, number]) {
  const [i, j] = location;
  return [
    ...(i > 0 ? [[i - 1, j]] : []),
    ...(i < grid.length - 1 ? [[i + 1, j]] : []),
    ...(j > 0 ? [[i, j - 1]] : []),
    ...(j < grid[0].length - 1 ? [[i, j + 1]] : []),
  ] as Array<[number, number]>;
}

function findLowPoints(grid: number[][]) {
  const lowPoints: Array<[number, number]> = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const neighbours = findNeighbours(grid, [i, j]).map(
        ([ii, jj]) => grid[ii][jj]
      );

      if (every(neighbours, (neighbour) => neighbour > grid[i][j])) {
        lowPoints.push([i, j]);
      }
    }
  }

  return lowPoints;
}

export function part1(input: string) {
  const grid = parseInput(input);

  return sum(findLowPoints(grid).map(([i, j]) => grid[i][j] + 1));
}

function findBasin(grid: number[][], lowPoint: [number, number]) {
  const unexploredLocations = [lowPoint];
  const exploredAlready = new Set();
  let numLocations = 0;

  while (unexploredLocations.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [i, j] = unexploredLocations.pop()!;
    if (!exploredAlready.has(`${i},${j}`)) {
      exploredAlready.add(`${i},${j}`);
      numLocations++;
      findNeighbours(grid, [i, j])
        .filter(([ii, jj]) => {
          return grid[ii][jj] > grid[i][j] && grid[ii][jj] != 9;
        })
        .forEach((neighbour) => unexploredLocations.push(neighbour));
    }
  }

  return numLocations;
}

export function part2(input: string) {
  const grid = parseInput(input);
  return reduce(
    sortBy(
      findLowPoints(grid).map((lowPoint) => findBasin(grid, lowPoint)),
      (size) => -size
    ).slice(0, 3),
    (a, b) => a * b,
    1
  );
}
