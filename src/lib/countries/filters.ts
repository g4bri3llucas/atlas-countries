import type { Country } from "@/types/country";

const REGION_LABELS: Record<string, string> = {
  Africa: "África",
  Americas: "Américas",
  Asia: "Ásia",
  Europe: "Europa",
  Oceania: "Oceania",
  Antarctic: "Antártida",
};

const SUBREGION_LABELS: Record<string, string> = {
  "Northern Africa": "África Setentrional",
  "Western Africa": "África Ocidental",
  "Middle Africa": "África Central",
  "Eastern Africa": "África Oriental",
  "Southern Africa": "África Austral",
  Caribbean: "Caribe",
  "Central America": "América Central",
  "South America": "América do Sul",
  "North America": "América do Norte",
  "Western Asia": "Ásia Ocidental",
  "Southern Asia": "Ásia Meridional",
  "South-Eastern Asia": "Sudeste Asiático",
  "Southeast Asia": "Sudeste Asiático",
  "Eastern Asia": "Ásia Oriental",
  "Central Asia": "Ásia Central",
  "Northern Europe": "Europa Setentrional",
  "Western Europe": "Europa Ocidental",
  "Eastern Europe": "Europa Oriental",
  "Southern Europe": "Europa Meridional",
  "Central Europe": "Europa Central",
  "Southeast Europe": "Sudeste Europeu",
  "Australia and New Zealand": "Austrália e Nova Zelândia",
  Melanesia: "Melanésia",
  Micronesia: "Micronésia",
  Polynesia: "Polinésia",
};

/** Returns the Portuguese label for a region coming from the API. */
export function getRegionLabel(region: string): string {
  return REGION_LABELS[region] ?? (region || "Sem região");
}

/** Returns the Portuguese label for a subregion, or the original text. */
export function getSubregionLabel(subregion: string): string {
  return SUBREGION_LABELS[subregion] ?? subregion;
}

/** Lowercases and removes accents, so "canada" matches "Canadá". */
function normalize(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/** Unique regions present in the data, sorted by their Portuguese label. */
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

/** Filters countries by name (Portuguese or English) and by region. */
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
