import reducer, { hydrate, toggleStatus } from "./tripsSlice";

const initialState = reducer(undefined, { type: "unknown" });

describe("tripsSlice", () => {
  it("starts empty and not hydrated", () => {
    expect(initialState).toEqual({ statuses: {}, hydrated: false });
  });

  it("loads saved statuses and marks the state as hydrated", () => {
    const state = reducer(initialState, hydrate({ BRA: "visited" }));

    expect(state).toEqual({ statuses: { BRA: "visited" }, hydrated: true });
  });

  it("marks a country with a status", () => {
    const state = reducer(
      initialState,
      toggleStatus({ code: "BRA", status: "wishlist" }),
    );

    expect(state.statuses).toEqual({ BRA: "wishlist" });
  });

  it("replaces the previous status of the same country", () => {
    const visited = reducer(
      initialState,
      toggleStatus({ code: "BRA", status: "visited" }),
    );
    const state = reducer(
      visited,
      toggleStatus({ code: "BRA", status: "wishlist" }),
    );

    expect(state.statuses).toEqual({ BRA: "wishlist" });
  });

  it("removes the status when the same one is toggled again", () => {
    const visited = reducer(
      initialState,
      toggleStatus({ code: "BRA", status: "visited" }),
    );
    const state = reducer(
      visited,
      toggleStatus({ code: "BRA", status: "visited" }),
    );

    expect(state.statuses).toEqual({});
  });

  it("does not touch other countries", () => {
    const loaded = reducer(initialState, hydrate({ ARG: "visited" }));
    const state = reducer(
      loaded,
      toggleStatus({ code: "BRA", status: "wishlist" }),
    );

    expect(state.statuses).toEqual({ ARG: "visited", BRA: "wishlist" });
  });
});