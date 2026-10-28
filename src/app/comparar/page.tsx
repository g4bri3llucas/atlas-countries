import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MIN_COMPARE_ITEMS } from "@/lib/compare/constants";
import { parseCompareCodes } from "@/lib/compare/url";
import { getAllCountries } from "@/lib/countries/api";
import { getRegionLabel, getSubregionLabel } from "@/lib/countries/filters";
import { formatNumber } from "@/lib/format";
import type { Country } from "@/types/country";

type ComparePageProps = {
  searchParams: Promise<{ paises?: string | string[] }>;
};

export const metadata: Metadata = {
  title: "Comparar países",
  description:
    "Compare capital, população, área, idiomas e moedas de países lado a lado.",
};

type ComparisonRow = {
  label: string;
  getValue: (country: Country) => string;
};

function getRegionText(country: Country): string {
  return [
    country.region ? getRegionLabel(country.region) : "",
    country.subregion ? getSubregionLabel(country.subregion) : "",
  ]
    .filter(Boolean)
    .join(" · ");
}

const rows: ComparisonRow[] = [
  { label: "Nome oficial", getValue: (country) => country.officialName },
  {
    label: "Capital",
    getValue: (country) => country.capital ?? "Não informada",
  },
  {
    label: "Região",
    getValue: (country) => getRegionText(country) || "Não informada",
  },
  {
    label: "População",
    getValue: (country) =>
      country.population > 0
        ? formatNumber(country.population)
        : "Não informada",
  },
  {
    label: "Área",
    getValue: (country) =>
      country.areaKm2 > 0
        ? `${formatNumber(country.areaKm2)} km²`
        : "Não informada",
  },
  {
    label: "Idiomas",
    getValue: (country) => country.languages.join(", ") || "Não informados",
  },
  {
    label: "Moedas",
    getValue: (country) => country.currencies.join(", ") || "Não informadas",
  },
];

function EmptyState() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="text-3xl font-bold tracking-tight">Comparar países</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {`Escolha pelo menos ${MIN_COMPARE_ITEMS} países para comparar. Use o botão de comparação nos cartões da lista ou na página de cada país.`}
      </p>
      <Link
        href="/"
        className="mt-6 inline-block text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
      >
        ← Voltar para todos os países
      </Link>
    </main>
  );
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const { paises } = await searchParams;
  const codes = parseCompareCodes(paises);

  if (codes.length < MIN_COMPARE_ITEMS) {
    return <EmptyState />;
  }

  const allCountries = await getAllCountries();

  // Keeps the same order as the URL and ignores codes that do not exist.
  const countries = codes
    .map((code) => allCountries.find((country) => country.code === code))
    .filter((country): country is Country => country !== undefined);

  if (countries.length < MIN_COMPARE_ITEMS) {
    return <EmptyState />;
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
      >
        ← Voltar para todos os países
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight">Comparar países</h1>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-xl border-collapse text-left">
          <caption className="sr-only">
            {`Comparação entre ${countries.map((country) => country.name).join(", ")}`}
          </caption>

          <thead>
            <tr>
              <th
                scope="col"
                className="w-36 border-b border-gray-300 p-3 text-sm font-medium text-gray-600 dark:border-gray-700 dark:text-gray-300"
              >
                Característica
              </th>
              {countries.map((country) => (
                <th
                  key={country.code}
                  scope="col"
                  className="border-b border-gray-300 p-3 align-bottom dark:border-gray-700"
                >
                  {country.flagUrl ? (
                    <Image
                      src={country.flagUrl}
                      alt={country.flagAlt}
                      width={80}
                      height={53}
                      unoptimized
                      className="mb-2 h-auto w-20 rounded border border-gray-300 dark:border-gray-700"
                    />
                  ) : null}
                  <Link
                    href={`/pais/${country.code}`}
                    className="text-lg font-bold text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
                  >
                    {country.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th
                  scope="row"
                  className="border-b border-gray-200 p-3 align-top text-sm font-medium text-gray-600 dark:border-gray-800 dark:text-gray-300"
                >
                  {row.label}
                </th>
                {countries.map((country) => (
                  <td
                    key={country.code}
                    className="border-b border-gray-200 p-3 align-top dark:border-gray-800"
                  >
                    {row.getValue(country)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}