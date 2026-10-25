import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CompareButton } from "@/components/compare-button";
import { TripStatusButtons } from "@/components/trip-status-buttons";
import { getAllCountries, getCountryByCode } from "@/lib/countries/api";
import { getRegionLabel, getSubregionLabel } from "@/lib/countries/filters";
import { formatNumber } from "@/lib/format";

type CountryPageProps = {
  params: Promise<{ code: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const countries = await getAllCountries();

  return countries.map((country) => ({ code: country.code }));
}

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    return { title: "País não encontrado" };
  }

  return {
    title: country.name,
    description: `Conheça ${country.name}: capital, população, área, idiomas e moedas.`,
  };
}

export default async function CountryPage({ params }: CountryPageProps) {
  const { code } = await params;
  const country = await getCountryByCode(code);

  if (!country) {
    notFound();
  }

  const regionText = [
    country.region ? getRegionLabel(country.region) : "",
    country.subregion ? getSubregionLabel(country.subregion) : "",
  ]
    .filter(Boolean)
    .join(" · ");

  const details = [
    { label: "Capital", value: country.capital ?? "Não informada" },
    { label: "Região", value: regionText || "Não informada" },
    {
      label: "População",
      value:
        country.population > 0
          ? formatNumber(country.population)
          : "Não informada",
    },
    {
      label: "Área",
      value:
        country.areaKm2 > 0
          ? `${formatNumber(country.areaKm2)} km²`
          : "Não informada",
    },
    {
      label: "Idiomas",
      value: country.languages.join(", ") || "Não informados",
    },
    {
      label: "Moedas",
      value: country.currencies.join(", ") || "Não informadas",
    },
  ];

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <Link
        href="/"
        className="text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
      >
        ← Voltar para todos os países
      </Link>

      <header className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
        {country.flagUrl ? (
          <Image
            src={country.flagUrl}
            alt={country.flagAlt}
            width={160}
            height={107}
            unoptimized
            className="h-auto w-40 rounded border border-gray-300 dark:border-gray-700"
          />
        ) : null}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{country.name}</h1>
          <p className="mt-1 text-gray-600 dark:text-gray-300">
            {country.officialName}
          </p>
        </div>
      </header>

      <TripStatusButtons code={country.code} countryName={country.name} />

      <div className="mt-3">
        <CompareButton item={{ code: country.code, name: country.name }} />
      </div>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="rounded-lg border border-gray-200 p-4 dark:border-gray-800"
          >
            <dt className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {detail.label}
            </dt>
            <dd className="mt-1 text-lg">{detail.value}</dd>
          </div>
        ))}
      </dl>
    </main>
  );
}
