import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Atlas | Explore países do mundo",
    template: "%s | Atlas",
  },
  description:
    "Explore países, compare dados e monte sua lista de viagens. Projeto de portfólio feito com Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
