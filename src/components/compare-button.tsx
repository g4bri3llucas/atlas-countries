"use client";

import {
  MAX_COMPARE_ITEMS,
  useCompareStore,
  type CompareItem,
} from "@/lib/compare/compare-store";

type CompareButtonProps = {
  item: CompareItem;
};

export function CompareButton({ item }: CompareButtonProps) {
  const isSelected = useCompareStore((state) =>
    state.items.some((current) => current.code === item.code),
  );
  const isFull = useCompareStore(
    (state) => state.items.length >= MAX_COMPARE_ITEMS,
  );
  const toggle = useCompareStore((state) => state.toggle);

  const isBlocked = isFull && !isSelected;

  let label = "Comparar";
  let ariaLabel = `Adicionar ${item.name} à comparação`;

  if (isSelected) {
    label = "Remover da comparação";
    ariaLabel = `Remover ${item.name} da comparação`;
  } else if (isBlocked) {
    label = "Limite atingido";
    ariaLabel = `Limite de ${MAX_COMPARE_ITEMS} países atingido`;
  }

  return (
    <button
      type="button"
      disabled={isBlocked}
      aria-label={ariaLabel}
      onClick={() => toggle(item)}
      className={`rounded-md border px-3 py-1.5 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-60 ${
        isSelected
          ? "border-blue-700 bg-blue-700 text-white hover:bg-blue-800"
          : "border-gray-400 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
      }`}
    >
      {label}
    </button>
  );
}
