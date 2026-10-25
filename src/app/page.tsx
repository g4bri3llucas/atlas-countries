import Link from "next/link";
import { CountryCard } from "@/components/country-card";
import { SearchForm } from "@/components/search-form";
import { getAllCountries } from "@/lib/countries/api";
import { filterCountries, getRegions } from "@/lib/countries/filters";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function firstValue(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const query = firstValue(params.q).trim();
  const requestedRegion = firstValue(params.regiao);

  const countries = await getAllCountries();
  const regions = getRegions(countries);
  const region = regions.includes(requestedRegion) ? requestedRegion : "";
  const results = filterCountries(countries, { query, region });

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Atlas</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Explore países, compare dados e monte sua lista de viagens.
        </p>
      </header>

      <SearchForm query={query} region={region} regions={regions} />

      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300">
        {results.length === 1
          ? "1 país encontrado"
          : `${results.length} países encontrados`}
      </p>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </ul>
      ) : (
        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Nenhum país encontrado para essa busca.
          </p>
          <Link
            href="/"
            className="mt-2 inline-block font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
          >
            Limpar busca
          </Link>
        </div>
      )}
    </main>
  );
}
