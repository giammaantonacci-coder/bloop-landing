import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Bloop — La città pulsa. Vivila.",
  description:
    "Bloop è il sistema operativo per vivere la città. Eventi, zone vive, esperienze — tutto quello che succede intorno a te, in tempo reale.",
  keywords: [
    "Bloop",
    "eventi",
    "città",
    "real-time",
    "city pulse",
    "vivere la città",
    "AI",
  ],
  openGraph: {
    title: "Bloop — La città pulsa. Vivila.",
    description:
      "Il sistema operativo per vivere la città. Go out, live the city.",
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
      className={`${bricolage.variable} ${inter.variable} ${mono.variable}`}
    >
      <body className="bg-deep text-white font-sans antialiased selection:bg-coral selection:text-deep">
        {children}
      </body>
    </html>
  );
}
