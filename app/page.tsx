import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Solution } from "@/components/Solution";
import { HowItWorks } from "@/components/HowItWorks";
import { Vision } from "@/components/Vision";
import { Bloopers } from "@/components/Bloopers";
import { Footer } from "@/components/Footer";
import { BackgroundBubbles } from "@/components/ui/BackgroundBubbles";

export default function Home() {
  return (
    <>
      <Nav />
      <BackgroundBubbles />
      <main className="relative overflow-hidden">
        <Hero />
        <Problem />
        <Solution />
        <HowItWorks />
        <Vision />
        <Bloopers />
        <Footer />
      </main>
    </>
  );
}
