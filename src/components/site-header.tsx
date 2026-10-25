import Link from "next/link";

const linkClassName =
  "rounded px-1 font-medium text-blue-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 dark:text-blue-300";

export function SiteHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <nav
        aria-label="Principal"
        className="mx-auto flex max-w-5xl items-center justify-between px-6 py-3"
      >
        <Link
          href="/"
          className="rounded text-lg font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          Atlas
        </Link>
        <ul className="flex gap-4">
          <li>
            <Link href="/" className={linkClassName}>
              Países
            </Link>
          </li>
          <li>
            <Link href="/minha-viagem" className={linkClassName}>
              Minha viagem
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
