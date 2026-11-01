import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
} from "@/lib/compare/compare-store";
import { CompareButton } from "./compare-button";

const brazil = { code: "BRA", name: "Brasil" };

function selectOtherCountries(count: number) {
  for (let index = 0; index < count; index++) {
    useCompareStore.getState().toggle({
      code: `C0${index}`,
      name: `País ${index}`,
    });
  }
}

beforeEach(() => {
  useCompareStore.setState({ items: [] });
});

describe("CompareButton", () => {
  it("offers to add the country to the comparison", () => {
    render(<CompareButton item={brazil} />);

    expect(
      screen.getByRole("button", { name: "Adicionar Brasil à comparação" }),
    ).toBeEnabled();
    expect(screen.getByText("Comparar")).toBeInTheDocument();
  });

  it("selects the country when clicked and offers to remove it", async () => {
    const user = userEvent.setup();
    render(<CompareButton item={brazil} />);

    await user.click(
      screen.getByRole("button", { name: "Adicionar Brasil à comparação" }),
    );

    expect(useCompareStore.getState().items).toEqual([brazil]);
    expect(
      screen.getByRole("button", { name: "Remover Brasil da comparação" }),
    ).toBeInTheDocument();
  });

  it("removes the country when clicked again", async () => {
    const user = userEvent.setup();
    render(<CompareButton item={brazil} />);

    await user.click(
      screen.getByRole("button", { name: "Adicionar Brasil à comparação" }),
    );
    await user.click(
      screen.getByRole("button", { name: "Remover Brasil da comparação" }),
    );

    expect(useCompareStore.getState().items).toEqual([]);
  });

  it("is disabled when other countries already filled the limit", () => {
    selectOtherCountries(MAX_COMPARE_ITEMS);
    render(<CompareButton item={brazil} />);

    expect(
      screen.getByRole("button", {
        name: `Limite de ${MAX_COMPARE_ITEMS} países atingido`,
      }),
    ).toBeDisabled();
  });

  it("stays enabled for an already selected country, even at the limit", () => {
    useCompareStore.getState().toggle(brazil);
    selectOtherCountries(MAX_COMPARE_ITEMS - 1);
    render(<CompareButton item={brazil} />);

    expect(
      screen.getByRole("button", { name: "Remover Brasil da comparação" }),
    ).toBeEnabled();
  });
});