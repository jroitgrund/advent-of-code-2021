import { Dictionary } from "lodash";
import Heap from "mnemonist/heap";

function parseInput(input: string): number[][] {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return input.match(/[^\n]+/g)!.map((line) => line.match(/\d/g)!.map(Number));
}

function asString(coord: [number, number]) {
  return `${coord[0]},${coord[1]}`;
}

function leastRiskyCoordinate(
  coordinateRisks: Dictionary<number>,
  coordinateRisksHeap: Heap<[[number, number], number]>,
  visited: Set<string>
): [[number, number], number] {
  let x: number, y: number, risk: number;
  do {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    [[x, y], risk] = coordinateRisksHeap.pop()!;
  } while (
    coordinateRisks[asString([x, y])] !== risk ||
    visited.has(asString([x, y]))
  );

  return [[x, y], risk];
}

function shortestPath(grid: number[][]) {
  const coordinateRisks: Dictionary<number> = {};
  const visited: Set<string> = new Set();
  const coordinateRisksHeap: Heap<[[number, number], number]> = new Heap(
    (a, b) => a[1] - b[1]
  );
  let [[x, y], risk] = [[0, 0], 0];
  while (x !== grid.length - 1 || y !== grid[0].length - 1) {
    visited.add(asString([x, y]));

    (
      [
        ...(x > 0 ? [[x - 1, y]] : []),
        ...(x < grid.length - 1 ? [[x + 1, y]] : []),
        ...(y > 0 ? [[x, y - 1]] : []),
        ...(y < grid[0].length - 1 ? [[x, y + 1]] : []),
      ] as Array<[number, number]>
    )
      .filter((neighbour) => !visited.has(asString(neighbour)))
      .forEach((neighbour) => {
        const [neighbourX, neighbourY] = neighbour;
        const newCost = Math.min(
          risk + grid[neighbourX][neighbourY],
          coordinateRisks[asString(neighbour)] ?? Number.MAX_SAFE_INTEGER
        );
        coordinateRisks[asString(neighbour)] = newCost;
        coordinateRisksHeap.push([[neighbourX, neighbourY], newCost]);
      });

    [[x, y], risk] = leastRiskyCoordinate(
      coordinateRisks,
      coordinateRisksHeap,
      visited
    );
  }

  return risk;
}

export function part1(input: string): number {
  const grid = parseInput(input);
  return shortestPath(grid);
}

export function part2(input: string): number {
  const grid = parseInput(input);
  const newGrid = [];
  for (let i = 0; i < grid.length * 5; i++) {
    newGrid.push(Array(grid[0].length * 5));
  }
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[0].length; y++) {
          let value = grid[x][y] + i + j;
          if (value > 9) {
            value -= 9;
          }
          newGrid[x + grid.length * i][y + grid[0].length * j] = value;
        }
      }
    }
  }
  return shortestPath(newGrid);
}
