import { fill, includes, partition, reduce } from "lodash";

function getCommonInputInfo(input: string) {
  const report = input.match(/[^\s]+/g);

  if (report == null || report.length === 0) {
    throw new Error();
  }

  const lineLength = report[0].length;
  const onesMinusZeroes: number[] = Array(lineLength);
  fill(onesMinusZeroes, 0);

  for (const reportLine of report) {
    if (reportLine.length !== lineLength) {
      throw new Error();
    }

    for (let i = 0; i < reportLine.length; i++) {
      onesMinusZeroes[i] += reportLine[i] === "1" ? 1 : -1;
    }
  }

  if (includes(onesMinusZeroes, 0)) {
    throw new Error();
  }

  return {
    onesMinusZeroes,
    lineLength,
    report,
  };
}

export function part1(input: string): number {
  const { onesMinusZeroes, lineLength } = getCommonInputInfo(input);

  const gamma = reduce(
    onesMinusZeroes,
    (accumulator, onesMinusZeroesInPos, index) =>
      accumulator +
      ((onesMinusZeroesInPos > 0 ? 1 : 0) << (lineLength - index - 1)),
    0
  );

  const epsilon = gamma ^ ((1 << lineLength) - 1);

  return gamma * epsilon;
}

function filterRatingsAndAdjustOnesMinusZeroesCount(
  ratings: string[],
  onesMinusZeroes: number[],
  condition: (rating: string) => boolean
) {
  const [validRatings, invalidRatings] = partition(ratings, condition);

  const adjustedOnesMinusZeroes = [...onesMinusZeroes];

  for (const invalidRating of invalidRatings) {
    for (let i = 0; i < invalidRating.length; i++) {
      adjustedOnesMinusZeroes[i] -= invalidRating[i] === "1" ? 1 : -1;
    }
  }
  return { validRatings, adjustedOnesMinusZeroes };
}

function findValidRating(
  ratings: string[],
  onesMinusZeroes: number[],
  validityCondition: (
    ratingBit: string,
    onesMinusZeroesInPos: number
  ) => boolean,
  lineLength: number
) {
  let onesMinusZeroesToConsider = [...onesMinusZeroes];
  let possibleRatings = [...ratings];

  for (let i = 0; i < lineLength && possibleRatings.length > 1; i++) {
    const { validRatings, adjustedOnesMinusZeroes } =
      filterRatingsAndAdjustOnesMinusZeroesCount(
        possibleRatings,
        onesMinusZeroesToConsider,
        (rating) => validityCondition(rating[i], onesMinusZeroesToConsider[i])
      );

    possibleRatings = validRatings;
    onesMinusZeroesToConsider = adjustedOnesMinusZeroes;
  }

  if (possibleRatings.length != 1) {
    throw new Error();
  }

  return parseInt(possibleRatings[0], 2);
}

export function part2(input: string): number {
  const { onesMinusZeroes, lineLength, report } = getCommonInputInfo(input);

  const oxygenRating = findValidRating(
    report,
    onesMinusZeroes,
    (ratingBit, onesMinusZeroesInPos) =>
      ratingBit === (onesMinusZeroesInPos >= 0 ? "1" : "0"),
    lineLength
  );

  const co2ScrubberRating = findValidRating(
    report,
    onesMinusZeroes,
    (ratingBit, onesMinusZeroesInPos) =>
      ratingBit === (onesMinusZeroesInPos < 0 ? "1" : "0"),
    lineLength
  );

  return oxygenRating * co2ScrubberRating;
}
