"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/store/hooks";
import { selectHydrated, selectStatuses } from "@/lib/store/selectors";
import type { TripStatus } from "@/lib/store/tripsSlice";

type CountryOption = {
  code: string;
  name: string;
};

type TripSummaryProps = {
  countries: CountryOption[];
};

const linkClassName =
  "font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-blue-300 dark:hover:text-blue-200";

type CountryListProps = {
  id: string;
  title: string;
  countries: CountryOption[];
  emptyText: string;
};

function CountryList({ id, title, countries, emptyText }: CountryListProps) {
  const headingId = `${id}-title`;

  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xl font-semibold">
        {`${title} (${countries.length})`}
      </h2>

      {countries.length > 0 ? (
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {countries.map((country) => (
            <li key={country.code}>
              <Link href={`/pais/${country.code}`} className={linkClassName}>
                {country.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          {emptyText}{" "}
          <Link href="/" className={linkClassName}>
            Explorar países
          </Link>
        </p>
      )}
    </section>
  );
}

export function TripSummary({ countries }: TripSummaryProps) {
  const hydrated = useAppSelector(selectHydrated);
  const statuses = useAppSelector(selectStatuses);

  if (!hydrated) {
    return (
      <p role="status" className="mt-8 text-gray-600 dark:text-gray-300">
        Carregando sua viagem...
      </p>
    );
  }

  const byStatus = (status: TripStatus) =>
    countries.filter((country) => statuses[country.code] === status);

  const visited = byStatus("visited");
  const wishlist = byStatus("wishlist");
  const percentage =
    countries.length > 0
      ? Math.round((visited.length / countries.length) * 100)
      : 0;

  return (
    <div className="mt-8 flex flex-col gap-10">
      <section aria-labelledby="progress-title">
        <h2 id="progress-title" className="text-xl font-semibold">
          Seu progresso
        </h2>
        <p className="mt-2">
          {`${visited.length} de ${countries.length} países visitados (${percentage}%)`}
        </p>
        <progress
          max={countries.length}
          value={visited.length}
          aria-label="Países visitados"
          className="mt-3 h-3 w-full accent-blue-700"
        />
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {`${wishlist.length} na lista de países que quer visitar`}
        </p>
      </section>

      <CountryList
        id="visited"
        title="Já visitei"
        countries={visited}
        emptyText="Você ainda não marcou nenhum país como visitado."
      />

      <CountryList
        id="wishlist"
        title="Quero visitar"
        countries={wishlist}
        emptyText="Você ainda não marcou nenhum país que quer visitar."
      />
    </div>
  );
}
