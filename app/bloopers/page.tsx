import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PinballBubbles } from "@/components/ui/PinballBubbles";
import { BloopersDetail } from "@/components/BloopersDetail";

export const metadata: Metadata = {
  title: "Diventa un Blooper — Bloop",
  description:
    "Segnala gli eventi che mancano, falli scoprire a tutti e guadagna punti. Sali di livello, sblocca accessi VIP, serate esclusive e ticket scontati. Diventa un Blooper.",
  openGraph: {
    title: "Diventa un Blooper — Bloop",
    description:
      "Più segnali, più sali. Accessi VIP, eventi esclusivi, ticket scontati. Fai pulsare la città con noi.",
    type: "article",
    locale: "it_IT",
  },
};

export default function BloopersPage() {
  return (
    <>
      <Nav />
      <PinballBubbles />
      <main id="main-content" className="relative z-10 overflow-hidden">
        <BloopersDetail />
        <Footer />
      </main>
    </>
  );
}
