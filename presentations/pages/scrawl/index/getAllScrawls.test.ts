import { getAllScrawls, GetScrawlsAndCursor } from "./getAllScrawls";

const testCase: {
  testName: string;
  input: {
    lastCursor: string;
    getScrawlsAndCursor: GetScrawlsAndCursor;
  };
  output: any[];
}[] = [
  {
    testName: "call 3",
    input: {
      lastCursor: "third-cursor",
      getScrawlsAndCursor: jest
        .fn()
        .mockImplementationOnce(() => ({
          scrawls: [1],
          cursor: "first-cursor",
        }))
        .mockImplementationOnce(() => ({
          scrawls: [2],
          cursor: "second-cursor",
        }))
        .mockImplementationOnce(() => ({
          scrawls: [3],
          cursor: "third-cursor",
        })),
    },
    output: [1, 2, 3],
  },
];

describe.each(testCase)("getAllScrawls", ({ testName, input, output }) => {
  test(testName, () => {
    expect(
      getAllScrawls(input.lastCursor, input.getScrawlsAndCursor)
    ).resolves.toEqual(output);
  });
});
