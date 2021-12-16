import { map, max, min, reduce, sum } from "lodash";

const PADS = ["", "0", "00", "000"];

function parseInput(input: string): string {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return input
    .match(/[^\s]/g)!
    .map((hexDigit) => {
      const binaryString = parseInt(hexDigit, 16).toString(2);
      return `${PADS[4 - binaryString.length]}${binaryString}`;
    })
    .join("");
}

type Packet = {
  version: number;
  type: number;
  contents: { literal: number } | { subPackets: Packet[] };
};

function parsePacketHeader(message: string, index: number) {
  const version = parseInt(message.substring(index, index + 3), 2);
  const type = parseInt(message.substring(index + 3, index + 6), 2);
  return {
    version,
    type,
  };
}

function parseLiteral(
  message: string,
  index: number
): {
  literal: number;
  newIndex: number;
} {
  let initialBit: string;
  let parts = "";
  do {
    initialBit = message[index];
    parts += message.substring(index + 1, index + 5);
    index += 5;
  } while (initialBit !== "0");

  const literal = parseInt(parts, 2);
  return {
    literal,
    newIndex: index,
  };
}

function parseOperator(
  message: string,
  index: number
): { subPackets: Packet[]; newIndex: number } {
  const lengthType = message[index++];
  const subPackets: Packet[] = [];
  if (lengthType === "0") {
    let remainingBitLength = parseInt(message.substring(index, index + 15), 2);
    index += 15;
    while (remainingBitLength > 0) {
      const { newIndex, packet } = parseMessage(message, index);
      subPackets.push(packet);
      remainingBitLength -= newIndex - index;
      index = newIndex;
    }
  } else if (lengthType === "1") {
    let remainingPackets = parseInt(message.substring(index, index + 11), 2);
    index += 11;
    while (remainingPackets-- > 0) {
      const { newIndex, packet } = parseMessage(message, index);
      subPackets.push(packet);
      index = newIndex;
    }
  }

  return { subPackets, newIndex: index };
}

function parseMessage(
  message: string,
  index = 0
): { newIndex: number; packet: Packet } {
  const { version, type } = parsePacketHeader(message, index);
  if (type === 4) {
    const { literal, newIndex } = parseLiteral(message, index + 6);
    return {
      newIndex,
      packet: {
        version,
        type,
        contents: { literal },
      },
    };
  } else {
    const { subPackets, newIndex } = parseOperator(message, index + 6);
    return {
      newIndex,
      packet: {
        version,
        type,
        contents: { subPackets },
      },
    };
  }
}

function sumVersions(packet: Packet): number {
  if ("literal" in packet.contents) {
    return packet.version;
  } else {
    return (
      packet.version +
      sum(
        map(packet.contents.subPackets, (subPacket) => sumVersions(subPacket))
      )
    );
  }
}

function evaluatePacket(packet: Packet): number {
  if ("literal" in packet.contents) {
    return packet.contents.literal;
  } else {
    const subPacketNumbers = map(packet.contents.subPackets, evaluatePacket);
    switch (packet.type) {
      case 0:
        return sum(subPacketNumbers);
      case 1:
        return reduce(subPacketNumbers, (a, b) => a * b, 1);
      case 2:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return min(subPacketNumbers)!;
      case 3:
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return max(subPacketNumbers)!;
      case 5:
        return subPacketNumbers[0] > subPacketNumbers[1] ? 1 : 0;
      case 6:
        return subPacketNumbers[0] < subPacketNumbers[1] ? 1 : 0;
      case 7:
        return subPacketNumbers[0] === subPacketNumbers[1] ? 1 : 0;
      default:
        throw new Error();
    }
  }
}

export function part1(input: string): number {
  const message = parseInput(input);
  const { packet } = parseMessage(message);
  return sumVersions(packet);
}

export function part2(input: string): number {
  const message = parseInput(input);
  const { packet } = parseMessage(message);
  return evaluatePacket(packet);
}
