import Link from "next/link";
import { CompareButton } from "@/components/compare-button";
import { TripStatusBadge } from "@/components/trip-status-badge";
import { getRegionLabel } from "@/lib/countries/filters";
import type { Country } from "@/types/country";

type CountryCardProps = {
  country: Country;
};

export function CountryCard({ country }: CountryCardProps) {
  return (
    <li className="flex flex-col justify-between rounded-lg border border-gray-200 hover:border-blue-700 dark:border-gray-800">
      <Link
        href={`/pais/${country.code}`}
        className="block rounded-t-lg p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        <span className="block text-lg font-semibold">{country.name}</span>
        <span className="mt-1 block text-sm text-gray-600 dark:text-gray-300">
          {country.capital ?? "Capital não informada"} ·{" "}
          {getRegionLabel(country.region)}
        </span>
        <TripStatusBadge code={country.code} />
      </Link>

      <div className="px-4 pb-4">
        <CompareButton item={{ code: country.code, name: country.name }} />
      </div>
    </li>
  );
}
