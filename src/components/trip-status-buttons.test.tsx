import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithStore } from "@/test/render-with-store";
import { TripStatusButtons } from "./trip-status-buttons";

function renderButtons(options?: Parameters<typeof renderWithStore>[1]) {
  return renderWithStore(
    <TripStatusButtons code="BRA" countryName="Brasil" />,
    options,
  );
}

const visitedButton = () => screen.getByRole("button", { name: "Já visitei" });
const wishlistButton = () =>
  screen.getByRole("button", { name: "Quero visitar" });

describe("TripStatusButtons", () => {
  it("groups the buttons under an accessible name", () => {
    renderButtons();

    expect(
      screen.getByRole("group", { name: "Marcar Brasil na sua viagem" }),
    ).toBeInTheDocument();
  });

  it("keeps the buttons disabled until the saved data is loaded", () => {
    renderButtons({ hydrated: false });

    expect(visitedButton()).toBeDisabled();
    expect(wishlistButton()).toBeDisabled();
  });

  it("enables the buttons after loading, with nothing selected", () => {
    renderButtons();

    expect(visitedButton()).toBeEnabled();
    expect(visitedButton()).toHaveAttribute("aria-pressed", "false");
    expect(wishlistButton()).toHaveAttribute("aria-pressed", "false");
  });

  it("marks the country as visited when clicked", async () => {
    const user = userEvent.setup();
    const { store } = renderButtons();

    await user.click(visitedButton());

    expect(visitedButton()).toHaveAttribute("aria-pressed", "true");
    expect(store.getState().trips.statuses).toEqual({ BRA: "visited" });
  });

  it("switches from visited to wishlist when the other button is clicked", async () => {
    const user = userEvent.setup();
    renderButtons({ statuses: { BRA: "visited" } });

    await user.click(wishlistButton());

    expect(visitedButton()).toHaveAttribute("aria-pressed", "false");
    expect(wishlistButton()).toHaveAttribute("aria-pressed", "true");
  });

  it("clears the status when the active button is clicked again", async () => {
    const user = userEvent.setup();
    const { store } = renderButtons();

    await user.click(visitedButton());
    await user.click(visitedButton());

    expect(visitedButton()).toHaveAttribute("aria-pressed", "false");
    expect(store.getState().trips.statuses).toEqual({});
  });

  it("shows a status that already exists in the store", () => {
    renderButtons({ statuses: { BRA: "wishlist" } });

    expect(wishlistButton()).toHaveAttribute("aria-pressed", "true");
    expect(visitedButton()).toHaveAttribute("aria-pressed", "false");
  });
});