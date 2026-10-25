import type { Metadata } from "next";
import { TripSummary } from "@/components/trip-summary";
import { getAllCountries } from "@/lib/countries/api";

export const metadata: Metadata = {
  title: "Minha viagem",
  description: "Veja os países que você já visitou e os que quer visitar.",
};

export default async function MyTripPage() {
  const countries = await getAllCountries();
  const options = countries.map(({ code, name }) => ({ code, name }));

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Minha viagem</h1>
      <p className="mt-2 text-gray-600 dark:text-gray-300">
        Os países que você marcou ficam salvos neste navegador.
      </p>
      <TripSummary countries={options} />
    </main>
  );
}
