export const part1 = (input: string) =>
  input
    .split("\n")
    .map(Number)
    .reduce(
      (previous, current, index, array) =>
        current > array[index - 1] ? previous + 1 : previous,

      0
    );

export const part2 = (input: string) =>
  input
    .split("\n")
    .map(Number)
    .reduce(
      (previous, current, index, array) =>
        index > 0 &&
        array[index] + array[index + 1] + array[index + 2] >
          array[index - 1] + array[index] + array[index + 1]
          ? previous + 1
          : previous,

      0
    );
