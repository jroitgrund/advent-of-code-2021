export const puzzle1part1 = (input: string) =>
  input
    .split("\n")
    .map(Number)
    .reduce(
      (previous, current, index, array) =>
        current > array[index - 1] ? previous + 1 : previous,

      0
    );
