import "server-only";

import type { Country } from "@/types/country";
import type {
  RawCountry,
  RawListData,
  RawListResponse,
} from "@/types/restcountries";
import { mapCountry } from "./mapper";

const BASE_URL = "https://api.restcountries.com/countries/v5";
const PAGE_SIZE = 100; // maximum allowed on the free plan
const MAX_PAGES = 5; // safety net against infinite loops
const REVALIDATE_SECONDS = 60 * 60 * 24; // 24 hours

const RESPONSE_FIELDS = [
  "names.common",
  "names.official",
  "names.translations.por",
  "codes.alpha_3",
  "flag.url_svg",
  "region",
  "subregion",
  "capitals",
  "population",
  "area.kilometers",
  "languages",
  "currencies",
].join(",");

function getApiKey(): string {
  const apiKey = process.env.RESTCOUNTRIES_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Missing RESTCOUNTRIES_API_KEY. Create a .env.local file based on .env.example.",
    );
  }

  return apiKey;
}

async function fetchPage(offset: number): Promise<RawListData> {
  const url = `${BASE_URL}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${RESPONSE_FIELDS}`;

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${getApiKey()}` },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(
      `REST Countries request failed with status ${response.status} (offset ${offset}).`,
    );
  }

  const body = (await response.json()) as RawListResponse;

  return body.data;
}

/**
 * Loads every country using as few requests as possible (3 pages of up to
 * 100 items), because the free plan has a monthly request quota.
 */
export async function getAllCountries(): Promise<Country[]> {
  const rawCountries: RawCountry[] = [];
  let offset = 0;

  for (let page = 0; page < MAX_PAGES; page++) {
    const { objects, meta } = await fetchPage(offset);

    rawCountries.push(...objects);
    offset += objects.length;

    if (objects.length === 0 || offset >= meta.total) {
      break;
    }
  }

  return rawCountries
    .map(mapCountry)
    .filter((country): country is Country => country !== null)
    .sort((a, b) => a.name.localeCompare(b.name, "pt-BR"));
}

/**
 * Finds one country by its alpha-3 code. It reuses the cached full list
 * instead of making another request, to save quota.
 */
export async function getCountryByCode(code: string): Promise<Country | null> {
  const countries = await getAllCountries();
  const normalizedCode = code.toUpperCase();

  return countries.find((country) => country.code === normalizedCode) ?? null;
}
