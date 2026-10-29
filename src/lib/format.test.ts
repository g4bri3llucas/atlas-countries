import { formatNumber } from "./format";

describe("formatNumber", () => {
  it("uses the pt-BR thousands separator", () => {
    expect(formatNumber(1234567)).toBe("1.234.567");
  });

  it("keeps small numbers unchanged", () => {
    expect(formatNumber(950)).toBe("950");
  });
});