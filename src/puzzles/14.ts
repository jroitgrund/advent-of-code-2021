import {
  countBy,
  Dictionary,
  forEach,
  fromPairs,
  max,
  min,
  reduce,
} from "lodash";

function parseInput(input: string) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const [polymerPart, rulesPart] = input.split("\n\n")!;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const polymer = polymerPart.match(/[^\s]+/)![0];
  const rules = fromPairs(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    rulesPart.match(/[^\n]+/g)!.map(
      (line) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        line.match(/([A-Z][A-Z]) -> ([A-Z])/)!.slice(1) as [string, string]
    )
  );

  return { polymer, rules };
}

export function part1(input: string): number {
  const parsedInput = parseInput(input);
  const rules = parsedInput.rules;
  let polymer = parsedInput.polymer;

  for (let step = 0; step < 10; step++) {
    let newPolymer = "";
    for (
      let pairStartIndex = 0;
      pairStartIndex < polymer.length - 1;
      pairStartIndex++
    ) {
      newPolymer += `${polymer[pairStartIndex]}${
        rules[polymer.substring(pairStartIndex, pairStartIndex + 2)]
      }`;
    }
    newPolymer += polymer[polymer.length - 1];
    polymer = newPolymer;
  }

  const elementCounts = Object.values(countBy(Array.from(polymer)));
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return max(elementCounts)! - min(elementCounts)!;
}

export function part2(input: string): number {
  const parsedInput = parseInput(input);
  const rules = parsedInput.rules;
  const polymer = parsedInput.polymer;

  const pairs = [];
  for (
    let pairStartIndex = 0;
    pairStartIndex < polymer.length - 1;
    pairStartIndex++
  ) {
    pairs.push(polymer.substring(pairStartIndex, pairStartIndex + 2));
  }

  let pairsCount = countBy(pairs);

  for (let step = 0; step < 40; step++) {
    const newPairsCount: Dictionary<number> = {};
    forEach(pairsCount, (count, pair) => {
      const [newPair1, newPair2] = [
        `${pair[0]}${rules[pair]}`,
        `${rules[pair]}${pair[1]}`,
      ];
      newPairsCount[newPair1] = (newPairsCount[newPair1] ?? 0) + count;
      newPairsCount[newPair2] = (newPairsCount[newPair2] ?? 0) + count;
    });
    pairsCount = newPairsCount;
  }

  const lettersByCount = reduce(
    pairsCount,
    (lettersCount, count, pair) => {
      const newLettersCount = { ...lettersCount };
      newLettersCount[pair[0]] = (newLettersCount[pair[0]] ?? 0) + count;
      return newLettersCount;
    },
    {} as Dictionary<number>
  );

  lettersByCount[polymer[polymer.length - 1]]++;

  const letterCounts = Object.values(lettersByCount);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return max(letterCounts)! - min(letterCounts)!;
}
