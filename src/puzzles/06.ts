import { fill, sum } from "lodash";

function parseFish(input: string): FishState {
  const fish = input.match(/\d+/g)?.map(Number);
  if (fish == null) {
    throw new Error();
  }

  const fishState = fill(Array(9), 0) as FishState;
  for (const f of fish) {
    fishState[f]++;
  }

  return fishState;
}

function solution(input: string, days: number) {
  let state = parseFish(input);
  for (let day = 0; day < days; day++) {
    const newState = Array(9) as FishState;
    for (let i = 0; i < 8; i++) {
      newState[i] = state[i + 1];
    }
    newState[8] = state[0];
    newState[6] += state[0];
    state = newState;
  }

  return sum(state);
}

export function part1(input: string): number {
  return solution(input, 80);
}

export function part2(input: string): number {
  return solution(input, 256);
}

type FishState = [
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number,
  number
];
