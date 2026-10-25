import { getRegionLabel } from "@/lib/countries/filters";

type SearchFormProps = {
  query: string;
  region: string;
  regions: string[];
};

export function SearchForm({ query, region, regions }: SearchFormProps) {
  return (
    <form
      action="/"
      method="get"
      role="search"
      className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end"
    >
      <div className="flex flex-1 flex-col gap-1">
        <label htmlFor="q" className="text-sm font-medium">
          Buscar país
        </label>
        <input
          id="q"
          name="q"
          type="search"
          defaultValue={query}
          placeholder="Ex.: Brasil, Japão..."
          className="rounded-md border border-gray-400 bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-gray-600 dark:bg-gray-900"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="regiao" className="text-sm font-medium">
          Região
        </label>
        <select
          id="regiao"
          name="regiao"
          defaultValue={region}
          className="rounded-md border border-gray-400 bg-white px-3 py-2 text-base focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:border-gray-600 dark:bg-gray-900"
        >
          <option value="">Todas</option>
          {regions.map((item) => (
            <option key={item} value={item}>
              {getRegionLabel(item)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className="rounded-md bg-blue-700 px-5 py-2 text-base font-medium text-white hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
      >
        Buscar
      </button>
    </form>
  );
}
