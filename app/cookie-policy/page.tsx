import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Cookie Policy — Bloop",
  description:
    "Quali cookie e tecnologie simili usa il sito di Bloop, e come gestirli.",
  robots: { index: true, follow: true },
};

export default function CookiePolicyPage() {
  return (
    <>
      <Nav />
      <LegalDoc eyebrow="Legale" title="Cookie Policy" updated="9 luglio 2026">
        <p>
          I cookie sono piccoli file di testo che i siti salvano sul tuo
          dispositivo. Servono a far funzionare le pagine, a ricordare le tue
          preferenze e, in alcuni casi, a misurare il traffico. Qui trovi come
          li usiamo su <a href="https://bloopsite.com">bloopsite.com</a>.
        </p>

        <section>
          <h2>Cookie tecnici (sempre attivi)</h2>
          <p>
            Sono necessari a far funzionare il sito e non richiedono il tuo
            consenso. Su questo sito riguardano essenzialmente:
          </p>
          <ul>
            <li>
              <strong>Preferenze locali</strong>: salviamo nel tuo browser
              alcune scelte, come l&apos;attivazione o disattivazione delle
              bolle animate, così restano come le hai lasciate. Restano sul tuo
              dispositivo e non ci vengono inviate.
            </li>
            <li>
              <strong>Sicurezza e distribuzione</strong>: il nostro hosting
              (Vercel) può usare cookie tecnici per erogare il sito in modo
              sicuro e affidabile.
            </li>
          </ul>
        </section>

        <section>
          <h2>Cookie di profilazione e pubblicità</h2>
          <p>
            Non ne usiamo. Questo sito non installa cookie pubblicitari né di
            profilazione, e non traccia la tua navigazione per finalità di
            marketing.
          </p>
        </section>

        <section>
          <h2>Cookie di terze parti</h2>
          <p>
            Non incorporiamo contenuti di terze parti che installano cookie di
            tracciamento. I link che portano fuori dal sito — ad esempio a{" "}
            <a
              href="https://www.instagram.com/thebloopapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>{" "}
            — ti portano su piattaforme esterne che hanno cookie e informative
            proprie.
          </p>
        </section>

        <section>
          <h2>Come gestire i cookie</h2>
          <p>
            Puoi cancellare o bloccare i cookie dalle impostazioni del tuo
            browser. Trattandosi qui di soli cookie tecnici e preferenze locali,
            bloccarli potrebbe far dimenticare al sito alcune tue scelte, ma non
            impedisce la consultazione delle pagine.
          </p>
        </section>

        <section>
          <h2>Aggiornamenti</h2>
          <p>
            Se in futuro introdurremo strumenti di misurazione o altri cookie,
            aggiorneremo questa pagina e, dove richiesto, ti chiederemo il
            consenso. Per domande scrivici a{" "}
            <a href="mailto:bloopappevents@gmail.com">
              bloopappevents@gmail.com
            </a>
            . Vedi anche la nostra{" "}
            <a href="/privacy-policy">Privacy Policy</a>.
          </p>
        </section>
      </LegalDoc>
    </>
  );
}
