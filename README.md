# Bloop — Landing

Real-time city pulse platform. Landing page ufficiale.

> **La città pulsa. Sentila.**
> Go out, live the city.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Google Fonts: Bricolage Grotesque (display) + Inter (testo) + Roboto Medium (etichette)
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
delle card, tipografia display molto grande e stretta, nessun gradiente o
glow. La pagina è **un campo di carta**: le fasce ci stanno sopra come carta,
come campitura coral piena, o — solo per footer e barra in alto — come
inchiostro. La struttura la danno i filetti e le campiture, non il fondo.

### Geometria

Il nome è una bolla, quindi lo è anche la forma. Tutto ciò che può chiudersi
in un cerchio lo fa — nodi del flusso, marcatori dei livelli, terminali del
ponte, pozzetti delle icone. Tutto il resto prende un raggio abbastanza
generoso da leggersi come morbido e non semplicemente smussato, e **ogni
controllo finisce a pillola**: due semicerchi con una barra in mezzo, che è
poi il wordmark.

La scala sta in `borderRadius` nel config di Tailwind. Le campiture `.mark`
hanno il raggio in `em`, così l'angolo resta proporzionato dai 52px del
mobile ai 144px del titolo desktop.

### Sistema di tonalità

Ogni fascia è un `<Section tone="light | accent | dark">` che pubblica la
propria palette come custom property (`.tone-*` in `globals.css`). I componenti
non sanno mai su quale fondo si trovano: usano solo i colori semantici
`bg / fg / muted / rule / accent`, mappati su quelle variabili in
`tailwind.config.ts`. `dark` è riservato a footer e barra in alto.

Il coral pieno non regge il testo piccolo su carta, quindi il colore
*grafico* (`--accent`, per campiture e filetti) è separato da quello
*tipografico* (`--accent-ink`, scurito quanto basta per l'AA).

**Le fasce chiare sono trasparenti**: è così che il fondo di carta — e con
lui il livello delle bolle — si vede attraverso tutto il corpo del sito. Le
campiture coral e l'inchiostro del footer sono invece opache e lo mascherano.

### Tipografia

| Classe | Uso |
|---|---|
| `display-xl` | titolo dell'hero |
| `display-lg` | h1 delle pagine di dettaglio |
| `display-md` | h2 di sezione, manifesto |
| `display-sm` | titoli di cella |
| `statement` | frasi lunghe in corpo grande |
| `eyebrow`, `eyebrow-sm` | numeri di sezione, tag, meta (Roboto Medium) |

L'interlinea sta sotto 1 su tutta la scala display, ma il riquadro di una
campitura `.mark` è alto ~1,39em — la scatola del font più il padding che
tiene dentro le discendenti. L'interlinea necessaria sta quindi sulla
marcatura stessa: una riga si allarga solo dove c'è davvero una campitura,
così una frase che va a capo non si sovrappone mentre le righe intorno
restano strette. `.mark-line` porta solo i margini che annullano il
mezzo-interlinea che ne risulta.

Le etichette — indici di sezione, tag, meta, bottoni — sono **Roboto
Medium** maiuscolo spaziato, con cifre tabulari perché il carattere è
proporzionale e senza di quelle gli indici incolonnati (01 / 02 / 03)
starebbero su margini frastagliati.

### Fotografia

Le immagini passano tutte da `<EditorialImage>`: virate in **duotone**
(inchiostro → coral, o → lilla) da un filtro SVG, squadrate, con un **segno
disegnato a mano** sopra e una didascalia su filetto, come una tavola in un
articolo stampato.

Il duotone è un `feColorMatrix` di luminanza seguito da un `feComponentTransfer`
che rimappa il grigio sui due colori del brand. Il vantaggio pratico: le foto
**non devono essere coordinate tra loro** come colore — qualsiasi scatto finisce
dentro la palette. Conta solo la gamma tonale.

I segni (`components/ui/Scribble.tsx`) sono tracciati volutamente imperfetti —
i cerchi chiudono oltre il punto di partenza, le frecce hanno la punta storta —
e si disegnano da soli allo scroll. Una geometria perfetta si leggerebbe come
un altro pezzo della griglia invece che come un gesto umano.

Le foto stanno in `public/photos/`, già ritagliate e messe in tono per lo slot
che occupano; la corrispondenza file → slot è in `components/photos.ts`. Uno
slot senza `src` ripiega su una mezzatinta invece di lasciare un buco.

`scripts/prepare-photos.py` rifà ritaglio, messa in tono e compressione di
tutti gli slot partendo dagli originali. Porta ogni immagine alla stessa
luminanza media, perché il duotone è spietato con le esposizioni estreme: un
high-key diventa una campitura coral piatta, un notturno quasi tutto
inchiostro. Dettagli in `public/photos/README.md`.

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
  Hero.tsx          # fascia full-viewport su carta
  Problem.tsx       # tabella di dati su carta
  Solution.tsx      # tre celle divise da filetti
  HowItWorks.tsx    # percorso verticale che si riempie con lo scroll
  Vision.tsx        # manifesto su campitura coral
  Bloopers.tsx      # community + CTA
  Footer.tsx        # wordmark, payoff, navigazione, social
  *Detail.tsx       # contenuto delle pagine di dettaglio
  photos.ts         # slot fotografici: qui si mettono i path
  ui/
    Section.tsx         # fascia, header di sezione, masthead, fascia CTA
    EditorialImage.tsx  # immagine in duotone + filtri SVG + placeholder
    Scribble.tsx        # segni disegnati a mano, si tracciano allo scroll
    ArrowLink.tsx       # link sottolineato con freccia
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
- Su carta il coral pieno regge solo 2,6:1: numerali, cifre del 404 e
  marcatori dei livelli usano le varianti `-ink`. Il contrasto è verificato
  con uno script che percorre ogni nodo di testo di tutte le pagine.
- Struttura semantica con `header`, `section`, `footer`, `nav`, landmark ARIA per il wordmark.
