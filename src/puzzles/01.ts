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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function part2(_input: string): number {
  return 0;
}
