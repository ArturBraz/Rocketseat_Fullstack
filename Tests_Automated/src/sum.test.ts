import { sum } from "./sum";

describe("sum", () => {
  let sumResult: number;

  beforeAll(() => {
    sumResult = 10;
    console.log(sumResult);
  });
  afterAll(() => {
    sumResult = 0;
    console.log(sumResult);
  });

  test("sum of 3+7 = must be 10", () => {
    const result = sum(3, 7);

    expect(result).toBe(10);
  });

  //'it' ou 'test' chama a função de testes.
  it("sum of 2 + 2 = 4", () => {
    const result = sum(2, 2);

    expect(result).toBe(4);
  });
});
