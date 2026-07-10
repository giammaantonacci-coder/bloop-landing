import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy — Bloop",
  description:
    "Come Bloop tratta i tuoi dati personali su questo sito. Informativa ai sensi del GDPR (Reg. UE 2016/679).",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Nav />
      <LegalDoc
        eyebrow="Legale"
        title="Privacy Policy"
        updated="9 luglio 2026"
      >
        <p>
          Questa informativa spiega come trattiamo i dati personali di chi
          visita questo sito ({" "}
          <a href="https://bloopsite.com">bloopsite.com</a>), il sito di
          presentazione di Bloop. Bloop è un progetto in fase di sviluppo:
          l&apos;app non è ancora disponibile e questo sito serve a raccontare
          cosa stiamo costruendo. La trattiamo con la stessa cura con cui
          vorremmo fosse trattata la nostra.
        </p>

        <section>
          <h2>Chi è il titolare</h2>
          <p>
            Il titolare del trattamento è il team di Bloop. Per qualsiasi
            richiesta relativa ai tuoi dati puoi scriverci a{" "}
            <a href="mailto:bloopappevents@gmail.com">
              bloopappevents@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Quali dati raccogliamo</h2>
          <p>
            Questo sito è volutamente minimale e non ti chiede di registrarti né
            di compilare moduli. In concreto:
          </p>
          <ul>
            <li>
              <strong>Se ci scrivi</strong> (via email o nei messaggi su
              Instagram) trattiamo i dati che ci fornisci tu — nome, contatto e
              il contenuto del messaggio — solo per risponderti.
            </li>
            <li>
              <strong>Dati tecnici di navigazione</strong>: come ogni sito, il
              nostro hosting (Vercel) può registrare dati tecnici come indirizzo
              IP, tipo di browser e pagine visitate, per garantire sicurezza e
              funzionamento del servizio.
            </li>
          </ul>
          <p>
            Non vendiamo i tuoi dati, non li usiamo per profilazione
            pubblicitaria e non li cediamo a terzi per finalità di marketing.
          </p>
        </section>

        <section>
          <h2>Perché li trattiamo</h2>
          <ul>
            <li>Per rispondere alle tue richieste e segnalazioni.</li>
            <li>
              Per far funzionare il sito in modo sicuro e affidabile (interesse
              legittimo).
            </li>
          </ul>
        </section>

        <section>
          <h2>Con chi li condividiamo</h2>
          <p>
            Ci appoggiamo a fornitori che ci aiutano a erogare il servizio e che
            trattano i dati per nostro conto, tra cui:
          </p>
          <ul>
            <li>
              <strong>Vercel Inc.</strong> — hosting e distribuzione del sito.
            </li>
            <li>
              <strong>Google</strong> — casella email con cui gestiamo i
              contatti.
            </li>
            <li>
              <strong>Meta / Instagram</strong> — se scegli di scriverci o
              seguirci lì, valgono anche le loro informative.
            </li>
          </ul>
        </section>

        <section>
          <h2>Per quanto tempo</h2>
          <p>
            Conserviamo i messaggi che ci invii per il tempo necessario a
            gestire la conversazione e le eventuali richieste successive. I dati
            tecnici di navigazione sono conservati per i tempi tecnici del
            fornitore di hosting.
          </p>
        </section>

        <section>
          <h2>I tuoi diritti</h2>
          <p>
            In qualsiasi momento puoi chiederci di accedere, correggere,
            cancellare o limitare i tuoi dati, di opporti al trattamento o di
            riceverli in forma portabile. Ti basta scrivere a{" "}
            <a href="mailto:bloopappevents@gmail.com">
              bloopappevents@gmail.com
            </a>
            . Hai anche il diritto di rivolgerti al Garante per la protezione
            dei dati personali.
          </p>
        </section>

        <section>
          <h2>Cookie</h2>
          <p>
            Per il dettaglio sui cookie usati da questo sito consulta la nostra{" "}
            <a href="/cookie-policy">Cookie Policy</a>.
          </p>
        </section>

        <section>
          <h2>Aggiornamenti</h2>
          <p>
            Man mano che Bloop cresce e l&apos;app prende forma, questa
            informativa verrà aggiornata. La data in cima indica sempre
            l&apos;ultima versione.
          </p>
        </section>
      </LegalDoc>
    </>
  );
}
