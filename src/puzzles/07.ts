import { max, min, range, sum } from "lodash";

export function part1(input: string): number {
  const positions = input.match(/\d+/g)?.map(Number);
  if (positions == null || positions.length == 0) {
    throw new Error();
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return min(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    range(min(positions)!, max(positions)).map((position) =>
      sum(positions.map((pos) => Math.abs(pos - position)))
    )
  )!;
}

export function part2(input: string): number {
  const positions = input.match(/\d+/g)?.map(Number);
  if (positions == null || positions.length == 0) {
    throw new Error();
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return min(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    range(min(positions)!, max(positions)).map((position) =>
      sum(
        positions.map((pos) => {
          const distance = Math.abs(pos - position);
          return (distance * (distance + 1)) / 2;
        })
      )
    )
  )!;
}
