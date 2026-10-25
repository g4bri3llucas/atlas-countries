import Link from "next/link";
import { getRegionLabel } from "@/lib/countries/filters";
import type { Country } from "@/types/country";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <li>
      <Link
        href={`/pais/${country.code}`}
        className="block rounded-lg border border-gray-200 p-4 hover:border-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-gray-800"
      >
        <span className="block text-lg font-semibold">{country.name}</span>
        <span className="mt-1 block text-sm text-gray-600 dark:text-gray-300">
          {country.capital ?? "Capital não informada"} ·{" "}
          {getRegionLabel(country.region)}
        </span>
      </Link>
    </li>
  );
}
