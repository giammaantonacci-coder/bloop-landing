import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PinballBubbles } from "@/components/ui/PinballBubbles";
import { VisionDetail } from "@/components/VisionDetail";

export const metadata: Metadata = {
  title: "La visione — Bloop",
  description:
    "Crediamo che la città sia un'esperienza da vivere insieme. Bloop nasce per farci vivere la città in modo più umano — dove la tecnologia non distrae, ma avvicina.",
  openGraph: {
    title: "La visione — Bloop",
    description:
      "La città non ha bisogno di un'altra app. Ha bisogno di te, fuori. — Il team Bloop",
    type: "article",
    locale: "it_IT",
  },
};

export default function VisionePage() {
  return (
    <>
      <Nav />
      <PinballBubbles />
      <main className="relative z-10 overflow-hidden">
        <VisionDetail />
        <Footer />
      </main>
    </>
  );
}
