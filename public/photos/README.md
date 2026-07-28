# Fotografie

Metti qui i file, poi apri `components/photos.ts` e compila `src` sullo slot
corrispondente (es. `src: "/photos/hero.jpg"`). Non serve altro: ogni slot è
già collegato alla sua sezione, e uno slot vuoto ripiega su una mezzatinta
invece di lasciare un buco.

## Slot

| Slot | Dove compare | Formato | Larghezza minima |
|---|---|---|---|
| `hero` | Home, accanto al titolo | verticale 4:5 | 1200 px |
| `problema` | Home, fascia dopo i numeri | panoramico 16:7 | 2000 px |
| `soluzione` | Home, testata della sezione | verticale 4:5 | 1200 px |
| `bloopers` | Home, prima della CTA | panoramico 16:7 | 2000 px |
| `problemaDetail` | Apertura di `/problema` | panoramico 16:7 | 2000 px |
| `soluzioneDetail` | Apertura di `/soluzione` | panoramico 16:7 | 2000 px |
| `flussoDetail` | Apertura di `/flusso` | panoramico 16:7 | 2000 px |
| `visioneDetail` | Apertura di `/visione` | panoramico 16:7 | 2000 px |
| `bloopersDetail` | Apertura di `/bloopers` | panoramico 16:7 | 2000 px |

Il ritaglio è `object-cover`, quindi il formato indicato è quello a cui la
foto verrà tagliata: tieni il soggetto lontano dai bordi.

## Che foto funzionano

Le immagini vengono virate in duotone (inchiostro → coral) al momento del
render, quindi **non serve che siano coordinate tra loro come colore**. Conta
solo la gamma tonale: servono scatti con una separazione netta tra luci e
ombre. Le foto piatte, illuminate in modo uniforme, diventano poltiglia
quando vengono ridotte a due colori.

In pratica funzionano bene: notturni con luci puntiformi, controluce, ombre
dure, silhouette. Funzionano male: giornate nuvolose, interni piatti,
inquadrature già molto scure.

Sopra ogni foto viene disegnato a mano un segno (cerchio, freccia, pin).
Lascia un po' di respiro attorno al soggetto perché il segno abbia dove
stare — la posizione si regola slot per slot nel componente.

## Formato dei file

JPG o WebP. Comprimi prima di committare: sotto i 400 KB per immagine.
`next/image` genera le varianti responsive, ma parte dal file che trova qui.

## Diritti

Usa solo foto di cui hai i diritti. Se ci sono persone riconoscibili serve
la loro liberatoria, a maggior ragione trattandosi di una pagina che
promuove un prodotto.
