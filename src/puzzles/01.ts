export function part1(input: string): number {
  const depths = input.split("\n").map(Number);
  let prev: null | number = null;
  let total = 0;
  for (const depth of depths) {
    if (prev != null && depth > prev) {
      total += 1;
    }
    prev = depth;
  }
  return total;
}

export function part2(input: string): number {
  const depths = input.split("\n").map(Number);

  if (depths.length < 4) {
    return 0;
  }

  let total = 0;
  let window = depths[0] + depths[1] + depths[2];

  for (let i = 3; i < depths.length; i++) {
    const currWindow = window + depths[i] - depths[i - 3];
    if (currWindow > window) {
      total++;
    }
    window = currWindow;
  }

  return total;
}
