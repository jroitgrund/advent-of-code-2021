import { flatten, inRange, max, min } from "lodash";

export const part1 = (input: string) => {
  const lines = input.split("\n");
  // only keep straight lines
  const coords = lines
    .map((val) => val.match(/\d+/g)?.map(Number))
    .filter((array) => array![0] === array![2] || array![1] === array![3]);
  // Find largest number to draw a n*n map
  const length = max(flatten(coords))! + 1;
  const map = new Array(length);

  //iterate over x and y
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map.length; x++) {
      if (!map[y]) map[y] = new Array(length);
      // if both x and y are between both the lines' ranges, respectively, increment
      map[y][x] = coords.reduce((prev, curr) => {
        return inRange(
          x,
          min([curr![0], curr![2]])!,
          max([curr![0], curr![2]])! + 1
        ) &&
          inRange(y, min([curr![1], curr![3]])!, max([curr![1], curr![3]])! + 1)
          ? prev + 1
          : prev;
      }, 0);
    }
  }
  return flatten(map).filter((val) => val > 1).length;
};

// Part 2
// Math.abs(array![0] - array![2]) === Math.abs(array![1] - array![3]) // diagonals
