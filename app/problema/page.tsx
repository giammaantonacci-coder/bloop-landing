import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PinballBubbles } from "@/components/ui/PinballBubbles";
import { ProblemDetail } from "@/components/ProblemDetail";

export const metadata: Metadata = {
  title: "Il problema — Bloop",
  description:
    "Quanto ti perdi della tua città? Eventi frammentati, passaparola che non scala, organizzatori che non arrivano. Gli eventi ci sono, la voglia c'è — manca il ponte.",
  openGraph: {
    title: "Il problema — Bloop",
    description:
      "Gli eventi ci sono. La voglia c'è. Manca il ponte. Scopri perché ci stiamo perdendo la città.",
    type: "article",
    locale: "it_IT",
  },
};

export default function ProblemaPage() {
  return (
    <>
      <Nav />
      <PinballBubbles />
      <main className="relative z-10 overflow-hidden">
        <ProblemDetail />
        <Footer />
      </main>
    </>
  );
}
