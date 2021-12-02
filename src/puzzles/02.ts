export function part1(input: string): number {
  const instructions = input.match(/[^\n]+/g);

  if (instructions == null) {
    throw new Error();
  }

  let depth = 0;
  let horizontalPosition = 0;

  for (const instruction of instructions) {
    const parts = instruction.match(/[^\s]+/g);
    if (parts == null || parts.length != 2) {
      throw new Error();
    }

    const amount = Number(parts[1]);

    if (parts[0].startsWith("f")) {
      horizontalPosition += amount;
    } else if (parts[0].startsWith("u")) {
      depth -= amount;
    } else if (parts[0].startsWith("d")) {
      depth += amount;
    } else {
      throw new Error(parts[0]);
    }
  }

  return depth * horizontalPosition;
}

export function part2(input: string): number {
  const instructions = input.match(/[^\n]+/g);

  if (instructions == null) {
    throw new Error();
  }

  let depth = 0;
  let horizontalPosition = 0;
  let aim = 0;

  for (const instruction of instructions) {
    const parts = instruction.match(/[^\s]+/g);
    if (parts == null || parts.length != 2) {
      throw new Error();
    }

    const amount = Number(parts[1]);

    if (parts[0].startsWith("f")) {
      horizontalPosition += amount;
      depth += aim * amount;
    } else if (parts[0].startsWith("u")) {
      aim -= amount;
    } else if (parts[0].startsWith("d")) {
      aim += amount;
    } else {
      throw new Error(parts[0]);
    }
  }

  return depth * horizontalPosition;
}
