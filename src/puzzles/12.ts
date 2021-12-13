import { groupBy, includes, map, mapValues, partition } from "lodash";

function parseInput(input: string): { [key: string]: string[] } {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return mapValues(
    groupBy(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      input
        .match(/[^\n]+/g)!
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((line) => line.match(/[^-\s]+/g)!)
        .flatMap(([pathStart, pathEnd]) => [
          [pathStart, pathEnd],
          [pathEnd, pathStart],
        ]),
      ([pathStart]) => pathStart
    ),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (paths) => map(paths, ([_pathStart, pathEnd]) => pathEnd)
  );
}

export function part1(input: string): number {
  const graph = parseInput(input);
  const paths = [["start"]];
  const finishedPaths = [];

  while (paths.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const path = paths.pop()!;
    const newPaths = graph[path[path.length - 1]]
      .filter(
        (cave) => cave[0].toUpperCase() === cave[0] || !includes(path, cave)
      )
      .map((cave) => [...path, cave]);
    const [complete, incomplete] = partition(
      newPaths,
      (path) => path[path.length - 1] === "end"
    );
    finishedPaths.push(...complete);
    paths.push(...incomplete);
  }

  return finishedPaths.length;
}

export function part2(input: string): number {
  const graph = parseInput(input);
  const paths: Array<[Array<string>, number]> = [[["start"], 1]];
  const finishedPaths = [];

  while (paths.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const pathInfo = paths.pop()!;
    const path = pathInfo[0];
    const newPaths = graph[path[path.length - 1]]
      .map<[Array<string>, number]>((cave) => [[...path, cave], pathInfo[1]])
      .filter((pathInfo) => {
        const newPath = pathInfo[0];
        const newCave = newPath[newPath.length - 1];
        return (
          newCave[0].toUpperCase() === newCave[0] ||
          !includes(path, newCave) ||
          (newCave !== "start" && newCave !== "end" && pathInfo[1]-- > 0)
        );
      });
    const [complete, incomplete] = partition(
      newPaths,
      (path) => path[0][path[0].length - 1] === "end"
    );
    finishedPaths.push(...complete.map(([path]) => path));
    paths.push(...incomplete);
  }

  return finishedPaths.length;
}
