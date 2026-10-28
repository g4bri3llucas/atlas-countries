import { MAX_COMPARE_ITEMS } from "./constants";

const COUNTRY_CODE_PATTERN = /^[A-Z]{3}$/;


export function parseCompareCodes(
  value: string | string[] | undefined,
): string[] {
  const raw = Array.isArray(value) ? value.join(",") : (value ?? "");

  const codes = raw
    .split(",")
    .map((code) => code.trim().toUpperCase())
    .filter((code) => COUNTRY_CODE_PATTERN.test(code));

  return Array.from(new Set(codes)).slice(0, MAX_COMPARE_ITEMS);
}

export function buildCompareHref(codes: string[]): string {
  return `/comparar?paises=${codes.join(",")}`;
}