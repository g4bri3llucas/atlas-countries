import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-3xl font-bold tracking-tight">
        Página não encontrada
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        O endereço que você tentou abrir não existe no Atlas.
      </p>
      <Link
        href="/"
        className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-900 dark:text-blue-300 dark:hover:text-blue-200"
      >
        Voltar para a página inicial
      </Link>
    </main>
  );
}
