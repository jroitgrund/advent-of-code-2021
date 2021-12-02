export const part1 = (input: string) => {
  const position = input.split("\n").reduce(
    (previous, current) => {
      const [command, value] = current.split(" ");
      switch (command) {
        case "forward":
          return { ...previous, x: previous.x + Number(value) };
        case "up":
          return { ...previous, y: previous.y - Number(value) };
        case "down":
          return { ...previous, y: previous.y + Number(value) };
        default:
          return previous;
      }
    },
    { x: 0, y: 0 }
  );
  return position.x * position.y;
};

export const part2 = (input: string) => {
  const position = input.split("\n").reduce(
    (previous, current) => {
      const [command, value] = current.split(" ");
      const numberValue = Number(value);
      switch (command) {
        case "forward":
          return {
            ...previous,
            x: previous.x + numberValue,
            y: previous.y + previous.aim * numberValue,
          };
        case "up":
          return { ...previous, aim: previous.aim - numberValue };
        case "down":
          return { ...previous, aim: previous.aim + numberValue };
        default:
          return previous;
      }
    },
    { x: 0, y: 0, aim: 0 }
  );
  return position.x * position.y;
};
