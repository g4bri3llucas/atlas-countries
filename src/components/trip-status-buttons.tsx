"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { selectHydrated, selectStatus } from "@/lib/store/selectors";
import { toggleStatus, type TripStatus } from "@/lib/store/tripsSlice";

type TripStatusButtonsProps = {
  code: string;
  countryName: string;
};

const OPTIONS: { status: TripStatus; label: string }[] = [
  { status: "visited", label: "Já visitei" },
  { status: "wishlist", label: "Quero visitar" },
];

export function TripStatusButtons({
  code,
  countryName,
}: TripStatusButtonsProps) {
  const dispatch = useAppDispatch();
  const hydrated = useAppSelector(selectHydrated);
  const current = useAppSelector((state) => selectStatus(state, code));

  return (
    <div
      role="group"
      aria-label={`Marcar ${countryName} na sua viagem`}
      className="mt-6 flex flex-wrap gap-3"
    >
      {OPTIONS.map(({ status, label }) => {
        const isActive = current === status;

        return (
          <button
            key={status}
            type="button"
            disabled={!hydrated}
            aria-pressed={isActive}
            onClick={() => dispatch(toggleStatus({ code, status }))}
            className={`rounded-md border px-4 py-2 text-base font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:opacity-60 ${
              isActive
                ? "border-blue-700 bg-blue-700 text-white"
                : "border-gray-400 bg-white hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
