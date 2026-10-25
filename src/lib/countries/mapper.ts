import type { Country } from "@/types/country";
import type { RawCountry } from "@/types/restcountries";

export function mapCountry(raw: RawCountry): Country | null {
  const code = raw.codes?.alpha_3?.trim().toUpperCase();

  if (!code) {
    return null;
  }

  const portuguese = raw.names.translations?.por;
  const name = portuguese?.common?.trim() || raw.names.common;

  return {
    code,
    name,
    nameEn: raw.names.common,
    officialName: portuguese?.official?.trim() || raw.names.official,
    region: raw.region || "",
    subregion: raw.subregion || "",
    capital: raw.capitals?.[0]?.name ?? null,
    population: raw.population ?? 0,
    areaKm2: raw.area?.kilometers ?? 0,
    flagUrl: raw.flag?.url_svg || null,
    flagAlt: `Bandeira de ${name}`,
    languages: (raw.languages ?? []).map((language) => language.name),
    currencies: (raw.currencies ?? []).map(
      (currency) => `${currency.name} (${currency.code})`,
    ),
  };
}
