import {
  filter,
  fromPairs,
  groupBy,
  includes,
  intersection,
  map,
  some,
  sortBy,
  sum,
  toPairs,
  without,
} from "lodash";

interface Entry {
  signalPatterns: string[];
  outputValue: string[];
}

const UNIQUELY_IDENTIFIABLE_SEGMENT_AMOUNTS = new Set([2, 3, 4, 7]);

const ALL_WIRES = ["a", "b", "c", "d", "e", "f", "g"];

function parseInput(input: string): Entry[] {
  return Array.from(input.matchAll(/^([^|]+)\|(.+)$/gm), (match) => {
    if (match == null || match.length != 3) {
      throw new Error();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, signalPatternsPart, outputValuePart] = match;

    const signalPatterns = Array.from(
      signalPatternsPart.match(/[a-z]+/g) ?? []
    );
    const outputValue = Array.from(outputValuePart.match(/[a-z]+/g) ?? []);

    if (signalPatterns.length != 10 || outputValue.length != 4) {
      throw new Error();
    }

    return { signalPatterns, outputValue };
  });
}

export function part1(input: string): number {
  const entries = parseInput(input);

  return sum(
    map(
      entries,
      (entry) =>
        filter(entry.outputValue, (digit) =>
          UNIQUELY_IDENTIFIABLE_SEGMENT_AMOUNTS.has(digit.length)
        ).length
    )
  );
}

export function guessMappings(signalPatterns: string[]) {
  const signalPatternsByLength = groupBy(
    signalPatterns,
    (pattern) => pattern.length
  );

  const mappings: { [key: string]: string } = {};

  const checkSingleton = (wires: string[]) => {
    if (wires.length != 1) {
      throw new Error();
    }

    return wires[0];
  };

  const wiresInLength2Pattern = Array.from(signalPatternsByLength[2][0]);
  const wiresInLength3Pattern = Array.from(signalPatternsByLength[3][0]);
  const wiresInLength4Pattern = Array.from(signalPatternsByLength[4][0]);
  const wiresInOnlyOneLength5Pattern = filter(
    ALL_WIRES,
    (wire) =>
      filter(signalPatternsByLength[5], (pattern) => pattern.includes(wire))
        .length == 1
  );
  const wiresInAllLength5Patterns = intersection(
    ...map(signalPatternsByLength[5], (pattern) => Array.from(pattern))
  );
  const wiresMissingInOneLength6Pattern = filter(ALL_WIRES, (wire) =>
    some(signalPatternsByLength[6], (pattern) => !includes(pattern, wire))
  );
  const wiresInAllLength6Patterns = without(
    ALL_WIRES,
    ...wiresMissingInOneLength6Pattern
  );

  // a: in the length 3 pattern, not in the length 2 pattern
  mappings.a = checkSingleton(
    without(wiresInLength3Pattern, ...wiresInLength2Pattern)
  );

  // b: in only one length 5 pattern, in all length 6 patterns
  mappings.b = checkSingleton(
    intersection(wiresInOnlyOneLength5Pattern, wiresInAllLength6Patterns)
  );

  // c: in the length 2 pattern, missing in one length 6 pattern
  mappings.c = checkSingleton(
    intersection(wiresInLength2Pattern, wiresMissingInOneLength6Pattern)
  );

  // d: in the length 4 pattern, not in the length 2 pattern, not in any length 6 pattern
  mappings.d = checkSingleton(
    without(
      wiresInLength4Pattern,
      ...wiresInLength2Pattern,
      ...wiresInAllLength6Patterns
    )
  );

  // e: in only one length 5 pattern, missing in one length 6 pattern
  mappings.e = checkSingleton(
    intersection(wiresInOnlyOneLength5Pattern, wiresMissingInOneLength6Pattern)
  );

  // f: in the length 2 pattern and in every length 6 pattern
  mappings.f = checkSingleton(
    intersection(wiresInLength2Pattern, wiresInAllLength6Patterns)
  );

  // g: in every 5 pattern, not in the length 3 or 4 pattern
  mappings.g = checkSingleton(
    without(
      wiresInAllLength5Patterns,
      ...wiresInLength3Pattern,
      ...wiresInLength4Pattern
    )
  );

  return fromPairs(
    map(toPairs(mappings), ([actualWire, wire]) => [wire, actualWire])
  );
}

const WIRES_TO_DIGIT: { [key: string]: number } = {
  abcefg: 0,
  cf: 1,
  acdeg: 2,
  acdfg: 3,
  bcdf: 4,
  abdfg: 5,
  abdefg: 6,
  acf: 7,
  abcdefg: 8,
  abcdfg: 9,
};

function getNumber(
  outputValueDigit: string,
  mappings: { [key: string]: string }
): number {
  return WIRES_TO_DIGIT[
    sortBy(Array.from(outputValueDigit).map((wire) => mappings[wire])).join("")
  ];
}

export function part2(input: string): number {
  const entries = parseInput(input);

  return sum(
    entries.map((entry) => {
      const mappings = guessMappings(entry.signalPatterns);
      return Number(
        map(entry.outputValue, (digit) => getNumber(digit, mappings)).join("")
      );
    })
  );
}
