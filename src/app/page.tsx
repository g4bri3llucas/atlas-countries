import Link from "next/link";
import { getAllCountries } from "@/lib/countries/api";

export default async function Home() {
  const countries = await getAllCountries();

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Atlas</h1>
        <p className="mt-3 text-lg text-gray-600 dark:text-gray-300">
          Explore países, compare dados e monte sua lista de viagens.
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {countries.length} países disponíveis
        </p>
      </header>

      <ul className="mt-10 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
        {countries.map((country) => (
          <li key={country.code}>
            <Link
              href={`/pais/${country.code}`}
              className="text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
