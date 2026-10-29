import { MAX_COMPARE_ITEMS } from "./constants";
import { buildCompareHref, parseCompareCodes } from "./url";

describe("parseCompareCodes", () => {
  it("trims spaces and uppercases codes", () => {
    expect(parseCompareCodes(" bra, arg ")).toEqual(["BRA", "ARG"]);
  });

  it("discards values that are not 3-letter codes", () => {
    expect(parseCompareCodes("BRA,XX,ARGENTINA,123")).toEqual(["BRA"]);
  });

  it("removes duplicated codes", () => {
    expect(parseCompareCodes("BRA,bra,ARG")).toEqual(["BRA", "ARG"]);
  });

  it(`keeps at most ${MAX_COMPARE_ITEMS} codes`, () => {
    expect(parseCompareCodes("BRA,ARG,CHL,URY")).toEqual(["BRA", "ARG", "CHL"]);
  });

  it("returns an empty list for missing or empty values", () => {
    expect(parseCompareCodes(undefined)).toEqual([]);
    expect(parseCompareCodes("")).toEqual([]);
  });

  it("accepts the param as an array", () => {
    expect(parseCompareCodes(["BRA", "ARG,CHL"])).toEqual([
      "BRA",
      "ARG",
      "CHL",
    ]);
  });
});

describe("buildCompareHref", () => {
  it("builds the compare URL from a list of codes", () => {
    expect(buildCompareHref(["BRA", "ARG"])).toBe("/comparar?paises=BRA,ARG");
  });
});