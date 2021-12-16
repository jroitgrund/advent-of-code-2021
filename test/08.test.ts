import { guessMappings } from "../src/puzzles/08";

describe("08", () => {
  test("guessMappings", () => {
    expect(
      guessMappings([
        "acedgfb",
        "cdfbe",
        "gcdfa",
        "fbcad",
        "dab",
        "cefabd",
        "cdfgeb",
        "eafb",
        "cagedb",
        "ab",
      ])
    ).toEqual({
      a: "c",
      b: "f",
      c: "g",
      d: "a",
      e: "b",
      f: "d",
      g: "e",
    });
  });
});
