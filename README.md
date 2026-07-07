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

## Struttura

```
app/
  layout.tsx        # font, metadata, dark theme
  page.tsx          # composizione delle sezioni
  globals.css       # Tailwind + utility custom
components/
  Logo.tsx          # wordmark bloop con le due "oo" che pulsano
  Hero.tsx          # sezione full-viewport con blob animati
  Problem.tsx       # 3 stat card con counter animati
  Solution.tsx      # 4 feature card
  HowItWorks.tsx    # timeline verticale animata sullo scroll
  Vision.tsx        # sezione manifesto con reveal riga per riga
  Footer.tsx        # wordmark, payoff, social
  ui/
    PulseBlobs.tsx      # blob di sfondo (CSS animation)
    AnimatedCounter.tsx # counter con easing
```

## Palette

| Nome | HEX |
|---|---|
| Bloop Coral | `#FF5C68` |
| Midnight Indigo | `#282475` |
| Night (base) | `#16132E` |
| Deep | `#0B0920` |
| Electric Lilac | `#A269FF` |
| Urban Smoke | `#A7A5BE` |

## Accessibilità

- `prefers-reduced-motion` disabilita animazioni continue e blob in movimento.
- Contrasti verificati su testi principali sopra il fondo `night`.
- Struttura semantica con `header`, `section`, `footer`, `nav`, landmark ARIA per il wordmark.
