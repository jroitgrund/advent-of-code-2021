import { fill, flatMap, map, sum, zipWith } from "lodash";

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
  const fish = parseFish(input);
  const fishStatesAfterDays = fishStatesAfterNDays(days);
  return sum(
    flatMap(fish, (numFish, initialState) =>
      map(fishStatesAfterDays[initialState], (n) => n * numFish)
    )
  );
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

function fishStatesAfterNDays(days: number): FishState[] {
  const fishStatesAfter1Day: FishState[] = [
    [0, 0, 0, 0, 0, 0, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
  ];

  let currentDayStates: FishState[] = [
    [1, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 1],
  ];

  for (let day = 0; day < days; day++) {
    const nextDayStates: FishState[] = [];
    for (let initialCounter = 0; initialCounter <= 8; initialCounter++) {
      nextDayStates.push(
        zipWith(
          ...map(currentDayStates[initialCounter], (numFish, counter) =>
            map(fishStatesAfter1Day[counter], (n) => n * numFish)
          ),
          (...n) => sum(n)
        ) as FishState
      );
    }
    currentDayStates = nextDayStates;
  }

  return currentDayStates;
}
