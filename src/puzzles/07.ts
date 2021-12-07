import { max } from "lodash";

export const part1 = (input: string) => {
  const positions = input.split(",");

  return positions.reduce((acc, mainCrab) => {
    const totalDistance = positions.reduce((prev, curr) => {
      return (prev += Math.abs(Number(curr) - Number(mainCrab)));
    }, 0);
    return totalDistance < acc ? totalDistance : acc;
  }, Infinity);
};

export const part2 = (input: string) => {
  const positions = input.split(",");
  const numberPositions = positions.map(Number);
  const maxPos = max(numberPositions);
  const map = Array.from({ length: maxPos || 0 }, (v, i) => i);

  return map.reduce((acc, mainCrab) => {
    const totalDistance = numberPositions.reduce((prev, curr) => {
      const distance = Math.abs(curr - mainCrab);
      const fuel = (distance * (distance + 1)) / 2;
      return (prev += fuel);
    }, 0);

    return totalDistance < acc ? totalDistance : acc;
  }, Infinity);
};
