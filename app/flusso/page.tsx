import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PinballBubbles } from "@/components/ui/PinballBubbles";
import { FlowDetail } from "@/components/FlowDetail";

export const metadata: Metadata = {
  title: "Il flusso — Bloop",
  description:
    "Dall'impulso di uscire alla porta d'ingresso. Bloop ti accompagna passo dopo passo — onboarding, discovery, esperienza — in un flusso unico, senza attriti.",
  openGraph: {
    title: "Il flusso — Bloop",
    description:
      "Dici che serata cerchi, Bloop ti porta nel posto giusto, scegli e vai. Un flusso solo, dall'idea alla porta.",
    type: "article",
    locale: "it_IT",
  },
};

export default function FlussoPage() {
  return (
    <>
      <Nav />
      <PinballBubbles />
      <main className="relative z-10 overflow-hidden">
        <FlowDetail />
        <Footer />
      </main>
    </>
  );
}
