import { getAllCountries } from "@/lib/countries/api";

export default async function Home() {
  const countries = await getAllCountries();
  const sample = countries
    .slice(0, 3)
    .map((country) => country.name)
    .join(", ");

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-4xl font-bold tracking-tight">Atlas</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300">
        Explore países, compare dados e monte sua lista de viagens.
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {countries.length} países carregados da API. Primeiros: {sample}.
      </p>
    </main>
  );
}
