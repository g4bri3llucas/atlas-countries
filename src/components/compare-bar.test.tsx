import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  useCompareStore,
  type CompareItem,
} from "@/lib/compare/compare-store";
import {
  MAX_COMPARE_ITEMS,
  MIN_COMPARE_ITEMS,
} from "@/lib/compare/constants";
import { CompareBar } from "./compare-bar";

const brazil = { code: "BRA", name: "Brasil" };
const argentina = { code: "ARG", name: "Argentina" };
const chile = { code: "CHL", name: "Chile" };

function select(...items: CompareItem[]) {
  items.forEach((item) => useCompareStore.getState().toggle(item));
}

beforeEach(() => {
  useCompareStore.setState({ items: [] });
});

describe("CompareBar", () => {
  it("renders nothing when no country is selected", () => {
    const { container } = render(<CompareBar />);

    expect(container).toBeEmptyDOMElement();
  });

  it("asks for more countries when only one is selected", () => {
    select(brazil);
    render(<CompareBar />);

    expect(
      screen.getByText(`Comparando (1/${MAX_COMPARE_ITEMS}):`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `Selecione pelo menos ${MIN_COMPARE_ITEMS} países para comparar.`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "Comparar" }),
    ).not.toBeInTheDocument();
  });

  it("links to the compare page when there are at least two countries", () => {
    select(brazil, argentina);
    render(<CompareBar />);

    expect(screen.getByRole("link", { name: "Comparar" })).toHaveAttribute(
      "href",
      "/comparar?paises=BRA,ARG",
    );
  });

  it("announces when the limit is reached", () => {
    select(brazil, argentina, chile);
    render(<CompareBar />);

    expect(screen.getByRole("status")).toHaveTextContent(
      `Limite de ${MAX_COMPARE_ITEMS} países atingido.`,
    );
  });

  it("removes one country with its remove button", async () => {
    const user = userEvent.setup();
    select(brazil, argentina);
    render(<CompareBar />);

    await user.click(
      screen.getByRole("button", { name: "Remover Brasil da comparação" }),
    );

    expect(useCompareStore.getState().items).toEqual([argentina]);
    expect(screen.queryByText("Brasil")).not.toBeInTheDocument();
  });

  it("clears the whole selection with the Limpar button", async () => {
    const user = userEvent.setup();
    select(brazil, argentina);
    const { container } = render(<CompareBar />);

    await user.click(screen.getByRole("button", { name: "Limpar" }));

    expect(useCompareStore.getState().items).toEqual([]);
    expect(container).toBeEmptyDOMElement();
  });
});