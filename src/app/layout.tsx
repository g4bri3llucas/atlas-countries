import type { Metadata } from "next";
import { CompareBar } from "@/components/compare-bar";
import { SiteHeader } from "@/components/site-header";
import { StoreProvider } from "@/components/store-provider";
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
      <body className="flex min-h-screen flex-col antialiased">
        <StoreProvider>
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <CompareBar />
        </StoreProvider>
      </body>
    </html>
  );
}
