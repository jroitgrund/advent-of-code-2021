import { reverse, sortBy, sum } from "lodash";

const OPENING = new Set(["(", "<", "[", "{"]);
const MATCH: { [key: string]: string } = {
  ["("]: ")",
  ["["]: "]",
  ["{"]: "}",
  ["<"]: ">",
};
const POINTS: { [key: string]: number } = {
  [")"]: 3,
  ["]"]: 57,
  ["}"]: 1197,
  [">"]: 25137,
};

const POINTS_PART_TWO: { [key: string]: number } = {
  ["("]: 1,
  ["["]: 2,
  ["{"]: 3,
  ["<"]: 4,
};

export function part1(input: string): number {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const chunks = input.match(/[^\n]+/g)!;
  return sum(
    chunks.map((chunk) => {
      const charStack: string[] = [];
      for (const character of Array.from(chunk)) {
        if (OPENING.has(character)) {
          charStack.push(character);
        } else if (charStack.length == 0) {
          throw new Error();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } else if (MATCH[charStack.pop()!] !== character) {
          return POINTS[character];
        }
      }
      return 0;
    })
  );
}

export function part2(input: string): number {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const chunks = input.match(/[^\n]+/g)!;
  const scores = sortBy(
    chunks.flatMap((chunk) => {
      const charStack: string[] = [];
      for (const character of Array.from(chunk)) {
        if (OPENING.has(character)) {
          charStack.push(character);
        } else if (charStack.length == 0) {
          throw new Error();
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        } else if (MATCH[charStack.pop()!] !== character) {
          return [];
        }
      }

      reverse(charStack);
      let score = 0;
      for (const character of charStack) {
        score *= 5;
        score += POINTS_PART_TWO[character];
      }
      return [score];
    })
  );

  return scores[Math.floor(scores.length / 2)];
}
