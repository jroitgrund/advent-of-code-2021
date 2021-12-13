function parseInput(input: string): number[][] {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return input.match(/[^\n]+/g)!.map((line) => line.match(/\d/g)!.map(Number));
}

function getNeighbours(i: number, j: number, grid: number[][]) {
  return [
    [i - 1, j - 1],
    [i - 1, j],
    [i - 1, j + 1],
    [i, j - 1],
    [i, j + 1],
    [i + 1, j - 1],
    [i + 1, j],
    [i + 1, j + 1],
  ].filter(
    ([i, j]) => i >= 0 && j >= 0 && i < grid.length && j < grid[0].length
  ) as Array<[number, number]>;
}

export function part1(input: string): number {
  const grid = parseInput(input);
  let totalFlashed = 0;

  for (let step = 0; step < 100; step++) {
    const neighbourFlashed = [];
    const flashed = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (++grid[i][j] === 10) {
          flashed.push([i, j]);
          neighbourFlashed.push(...getNeighbours(i, j, grid));
        }
      }
    }

    while (neighbourFlashed.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [i, j]: [number, number] = neighbourFlashed.pop()!;
      if (++grid[i][j] === 10) {
        flashed.push([i, j]);
        neighbourFlashed.push(...getNeighbours(i, j, grid));
      }
    }

    flashed.forEach(([i, j]) => (grid[i][j] = 0));
    totalFlashed += flashed.length;
  }

  return totalFlashed;
}

export function part2(input: string): number {
  const grid = parseInput(input);

  // eslint-disable-next-line no-constant-condition
  for (let step = 1; true; step++) {
    const neighbourFlashed = [];
    const flashed = [];

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
        if (++grid[i][j] === 10) {
          flashed.push([i, j]);
          neighbourFlashed.push(...getNeighbours(i, j, grid));
        }
      }
    }

    while (neighbourFlashed.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const [i, j]: [number, number] = neighbourFlashed.pop()!;
      if (++grid[i][j] === 10) {
        flashed.push([i, j]);
        neighbourFlashed.push(...getNeighbours(i, j, grid));
      }
    }

    flashed.forEach(([i, j]) => (grid[i][j] = 0));
    if (flashed.length === grid.length * grid[0].length) {
      return step;
    }
  }
}
