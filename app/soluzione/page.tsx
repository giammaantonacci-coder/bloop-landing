import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PinballBubbles } from "@/components/ui/PinballBubbles";
import { SolutionDetail } from "@/components/SolutionDetail";

export const metadata: Metadata = {
  title: "La soluzione — Bloop",
  description:
    "Bloop aggrega tutto quello che succede in città, impara cosa ti piace e ti accompagna dall'idea di uscire fino alla porta d'ingresso. Il ponte tra te e la tua città.",
  openGraph: {
    title: "La soluzione — Bloop",
    description:
      "Una sola mappa, su misura per te, dall'idea all'ingresso. Bloop è il ponte tra te e la città.",
    type: "article",
    locale: "it_IT",
  },
};

export default function SoluzionePage() {
  return (
    <>
      <Nav />
      <PinballBubbles />
      <main id="main-content" className="relative z-10 overflow-hidden">
        <SolutionDetail />
        <Footer />
      </main>
    </>
  );
}
