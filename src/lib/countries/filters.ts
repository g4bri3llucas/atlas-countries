import type { Country } from "@/types/country";

const REGION_LABELS: Record<string, string> = {
  Africa: "África",
  Americas: "Américas",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceania",
  Antartic: "Antártida",
};

export function getRegionLabel(region: string): string {
  return REGION_LABELS[region] ?? (region || "Sem região");
}

function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getRegions(countries: Country[]): string[] {
  const regions = new Set(
    countries.map((country) => country.region).filter(Boolean),
  );
  return [...regions].sort((a, b) =>
    getRegionLabel(a).localeCompare(getRegionLabel(b), "pt-BR"),
  );
}

type FilterOptions = {
  query: string;
  region: string;
};

export function filterCountries(
  countries: Country[],
  { query, region }: FilterOptions,
): Country[] {
  const normalizedQuery = normalize(query);

  return countries.filter((country) => {
    if (region && country.region !== region) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    return (
      normalize(country.name).includes(normalizedQuery) ||
      normalize(country.nameEn).includes(normalizedQuery)
    );
  });
}
