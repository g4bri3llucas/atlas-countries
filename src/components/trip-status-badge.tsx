"use client";

import { useAppSelector } from "@/lib/store/hooks";
import { selectStatus } from "@/lib/store/selectors";

type TripStatusBadgeProps = {
  code: string;
};

const BADGES = {
  visited: {
    label: "Visitado",
    className:
      "bg-green-100 text-green-900 dark:bg-green-900 dark:text-green-100",
  },
  wishlist: {
    label: "Quero visitar",
    className:
      "bg-amber-100 text-amber-900 dark:bg-amber-900 dark:text-amber-100",
  },
} as const;

export function TripStatusBadge({ code }: TripStatusBadgeProps) {
  const status = useAppSelector((state) => selectStatus(state, code));

  if (!status) {
    return null;
  }

  const badge = BADGES[status];

  return (
    <span
      className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
    >
      {badge.label}
    </span>
  );
}
