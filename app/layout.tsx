import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, Roboto } from "next/font/google";
import "./globals.css";
import { BubblesProvider } from "@/components/BubblesProvider";
import { DuotoneDefs } from "@/components/ui/EditorialImage";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Carries every label, section index and tag on the site — the sign-posting
// layer. Medium only: it is the one weight these are set in.
const label = Roboto({
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
  weight: ["500"],
});

export const metadata: Metadata = {
  title: "Bloop — La tua città è più viva di quanto pensi",
  description:
    "Il radar degli eventi della tua città. Tutti gli eventi in un solo posto — anche le chicche che vivono nei social e nelle chat. A scegliere sei tu.",
  keywords: [
    "Bloop",
    "eventi",
    "eventi Bologna",
    "cosa fare in città",
    "scoprire eventi",
    "segnalare eventi",
    "radar eventi",
  ],
  openGraph: {
    title: "Bloop — La tua città è più viva di quanto pensi",
    description:
      "Tutti gli eventi della tua città in un solo posto. La scopri tu, non l'algoritmo.",
    type: "website",
    locale: "it_IT",
  },
};

export const viewport: Viewport = {
  themeColor: "#16132E",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="it"
      className={`${bricolage.variable} ${inter.variable} ${label.variable}`}
    >
      <body className="tone-dark bg-deep font-sans antialiased selection:bg-coral selection:text-deep">
        <a href="#main-content" className="skip-link">
          Vai al contenuto
        </a>
        <DuotoneDefs />
        <BubblesProvider>{children}</BubblesProvider>
      </body>
    </html>
  );
}
