# Bloop — Landing

Real-time city pulse platform. Landing page ufficiale.

> **La città pulsa. Sentila.**
> Go out, live the city.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Google Fonts: Bricolage Grotesque + Inter
- Deploy-ready per Vercel

## Setup locale

```bash
npm install
npm run dev
```

Poi apri [http://localhost:3000](http://localhost:3000) nel browser.

## Build

```bash
npm run build
npm run start
```

## Deploy

Push il repo su GitHub e importa il progetto su [Vercel](https://vercel.com/new). Nessuna variabile d'ambiente richiesta.

## Design

Modern editorial / Swiss style: griglia a 12 colonne, filetti da 1px al posto
delle card, tipografia display molto grande e stretta, nessun raggio di bordo,
nessun gradiente o glow. Le pagine sono impilate come **fasce a tonalità
alternata** — inchiostro, carta, coral pieno — e il ritmo dell'alternanza è la
struttura della pagina.

### Sistema di tonalità

Ogni fascia è un `<Section tone="dark | light | accent">` che pubblica la
propria palette come custom property (`.tone-*` in `globals.css`). I componenti
non sanno mai su quale fondo si trovano: usano solo i colori semantici
`bg / fg / muted / rule / accent`, mappati su quelle variabili in
`tailwind.config.ts`.

Il coral pieno non regge il testo piccolo su carta, quindi il colore
*grafico* (`--accent`, per campiture e filetti) è separato da quello
*tipografico* (`--accent-ink`, scurito quanto basta per l'AA).

Le fasce scure sono trasparenti: è così che le bolle di sfondo si vedono
attraverso l'inchiostro e vengono mascherate dalle fasce chiare e coral.

### Tipografia

| Classe | Uso |
|---|---|
| `display-xl` | titolo dell'hero |
| `display-lg` | h1 delle pagine di dettaglio |
| `display-md` | h2 di sezione, manifesto |
| `display-sm` | titoli di cella |
| `statement` | frasi lunghe in corpo grande |
| `eyebrow`, `eyebrow-sm` | numeri di sezione, tag, meta (mono) |

L'interlinea sta sotto 1 su tutta la scala display. Le righe con una
campitura `.mark` vanno impostate come blocco a sé con `.mark-line`, che
recupera in `em` lo spazio che il riquadro di sfondo ruberebbe alle
discendenti della riga precedente.

## Struttura

```
app/
  layout.tsx        # font, metadata, tonalità di base
  page.tsx          # composizione delle fasce della home
  globals.css       # tonalità, scala tipografica, primitive Swiss
  problema|soluzione|flusso|visione|bloopers/  # pagine di dettaglio
components/
  Nav.tsx           # barra fissa, opaca appena esce dall'hero
  Logo.tsx          # wordmark bloop con le due "oo" che pulsano
  Hero.tsx          # fascia scura full-viewport
  Problem.tsx       # tabella di dati su carta
  Solution.tsx      # tre celle divise da filetti
  HowItWorks.tsx    # percorso verticale che si riempie con lo scroll
  Vision.tsx        # manifesto su campitura coral
  Bloopers.tsx      # community + CTA
  Footer.tsx        # wordmark, payoff, navigazione, social
  *Detail.tsx       # contenuto delle pagine di dettaglio
  ui/
    Section.tsx         # fascia, header di sezione, masthead, fascia CTA
    ArrowLink.tsx       # link mono sottolineato con freccia
    AnimatedCounter.tsx # counter con easing
    BackgroundBubbles.tsx / PinballBubbles.tsx  # dischi piatti di sfondo
    BridgeConnector.tsx / FlowLine.tsx / MissedEvents.tsx / BlooperLevels.tsx
    Marquee.tsx         # ticker orizzontale
```

## Palette

| Nome | HEX |
|---|---|
| Bloop Coral | `#F76B3A` |
| Coral su carta (testo) | `#B23C13` |
| Electric Lilac | `#A269FF` |
| Lilac su carta (testo) | `#6B2FD6` |
| Deep / Ink (base scura) | `#0B0920` |
| Paper (base chiara) | `#F2EFE7` |
| Urban Smoke | `#A7A5BE` |
| Muted su carta | `#5F5B6B` |

## Accessibilità

- `prefers-reduced-motion` disabilita animazioni continue e movimento delle bolle.
- Le varianti `-ink` degli accenti tengono l'AA sul fondo carta, dove il coral
  pieno si fermerebbe a 2,6:1.
- I dischi di sfondo scendono al 45% sotto `md`, dove finiscono dietro al
  paragrafo dell'hero.
- Struttura semantica con `header`, `section`, `footer`, `nav`, landmark ARIA per il wordmark.
