"use client";

import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
} from "@/lib/compare/compare-store";

export function CompareBar() {
  const items = useCompareStore((state) => state.items);
  const remove = useCompareStore((state) => state.remove);
  const clear = useCompareStore((state) => state.clear);

  if (items.length === 0) {
    return null;
  }

  return (
    <aside
      aria-label="Comparação de países"
      className="sticky bottom-0 border-t border-gray-300 bg-white px-6 py-3 dark:border-gray-700 dark:bg-neutral-950"
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3">
        <p className="text-sm font-medium">
          {`Comparando (${items.length}/${MAX_COMPARE_ITEMS}):`}
        </p>

        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <li
              key={item.code}
              className="flex items-center gap-1 rounded-full border border-gray-400 py-1 pr-1 pl-3 text-sm dark:border-gray-600"
            >
              <span>{item.name}</span>
              <button
                type="button"
                onClick={() => remove(item.code)}
                aria-label={`Remover ${item.name} da comparação`}
                className="rounded-full px-2 text-base leading-none hover:bg-gray-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:hover:bg-gray-800"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {items.length === MAX_COMPARE_ITEMS ? (
          <p role="status" className="text-sm text-gray-600 dark:text-gray-300">
            {`Limite de ${MAX_COMPARE_ITEMS} países atingido.`}
          </p>
        ) : null}

        <button
          type="button"
          onClick={clear}
          className="ml-auto rounded text-sm font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-blue-300 dark:hover:text-blue-200"
        >
          Limpar
        </button>
      </div>
    </aside>
  );
}
