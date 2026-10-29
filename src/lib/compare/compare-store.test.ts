import { MAX_COMPARE_ITEMS, useCompareStore } from "./compare-store";

const brazil = { code: "BRA", name: "Brasil" };
const argentina = { code: "ARG", name: "Argentina" };

beforeEach(() => {

  useCompareStore.setState({ items: [] });
});

describe("useCompareStore", () => {
  it("adds a country when toggled for the first time", () => {
    useCompareStore.getState().toggle(brazil);

    expect(useCompareStore.getState().items).toEqual([brazil]);
  });

  it("removes a country when toggled again", () => {
    useCompareStore.getState().toggle(brazil);
    useCompareStore.getState().toggle(brazil);

    expect(useCompareStore.getState().items).toEqual([]);
  });

  it("ignores new countries after reaching the limit", () => {
    const fullList = Array.from({ length: MAX_COMPARE_ITEMS }, (_, index) => ({
      code: `C0${index}`,
      name: `Country ${index}`,
    }));

    fullList.forEach((item) => useCompareStore.getState().toggle(item));
    useCompareStore.getState().toggle(argentina);

    const { items } = useCompareStore.getState();

    expect(items).toHaveLength(MAX_COMPARE_ITEMS);
    expect(items).not.toContainEqual(argentina);
  });

  it("removes a specific country", () => {
    useCompareStore.getState().toggle(brazil);
    useCompareStore.getState().toggle(argentina);
    useCompareStore.getState().remove("BRA");

    expect(useCompareStore.getState().items).toEqual([argentina]);
  });

  it("clears the whole selection", () => {
    useCompareStore.getState().toggle(brazil);
    useCompareStore.getState().toggle(argentina);
    useCompareStore.getState().clear();

    expect(useCompareStore.getState().items).toEqual([]);
  });
});