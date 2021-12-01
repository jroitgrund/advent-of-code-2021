import { reduce } from "lodash";

export function part1(input: string): number {
  const depths = input.split("\n").map((n) => Number(n));
  const initialValues: { total: number; prev: number | undefined } = {
    total: 0,
    prev: undefined,
  };
  return reduce(
    depths,
    ({ total, prev }, nextValue) => ({
      total: prev != null && nextValue > prev ? total + 1 : total,
      prev: nextValue,
    }),
    initialValues
  ).total;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(_input: string): number {
  return 0;
}
