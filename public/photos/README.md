# Fotografie

I file qui dentro sono già ritagliati e bilanciati per lo slot che occupano.
La corrispondenza file → slot è in `components/photos.ts`.

## Slot

| File | Dove compare | Formato |
|---|---|---|
| `hero.jpg` | Home, accanto al titolo | orizzontale 3:2 |
| `problema.jpg` | Home, fascia dopo i numeri | panoramico 16:7 |
| `soluzione.jpg` | Home, testata della sezione | verticale 4:5 |
| `bloopers.jpg` | Home, prima della CTA | panoramico 16:7 |
| `problema-detail.jpg` | Apertura di `/problema` | panoramico 16:7 |
| `soluzione-detail.jpg` | Apertura di `/soluzione` | panoramico 16:7 |
| `flusso-detail.jpg` | Apertura di `/flusso` | panoramico 16:7 |
| `visione-detail.jpg` | Apertura di `/visione` | panoramico 16:7 |
| `bloopers-detail.jpg` | Apertura di `/bloopers` | panoramico 16:7 |

## Per cambiare una foto

Il modo più semplice è sovrascrivere il file mantenendo nome e formato.
Il ritaglio a schermo è `object-cover`, quindi un'immagine di forma diversa
non si rompe, ma il soggetto può uscire dall'inquadratura.

Se parti da un originale non ritagliato, usa lo script — che rifà ritaglio,
messa in tono e compressione di tutti gli slot in un colpo:

```bash
pip install Pillow
python3 scripts/prepare-photos.py <cartella-con-gli-originali>
```

I punti focali dei ritagli sono dichiarati lì dentro, uno per slot: se cambi
un originale e il soggetto finisce fuori campo, si sposta quel numero.

## Che foto funzionano

Le immagini vengono virate in duotone (inchiostro → coral, o → lilla) al
momento del render, quindi **non serve che siano coordinate tra loro come
colore**. Conta la gamma tonale: servono scatti con una separazione netta tra
luci e ombre.

Lo script porta ogni immagine alla stessa luminanza media prima di salvarla,
proprio perché il duotone è spietato con le esposizioni estreme — un high-key
diventa una campitura coral piatta, un notturno diventa quasi tutto
inchiostro. Questo corregge molto, ma non fa miracoli su un originale senza
contrasto: le foto piatte e uniformi restano poltiglia.

Funzionano bene: notturni con luci puntiformi, controluce, ombre dure,
silhouette, folla con volti staccati dallo sfondo.

Sopra ogni foto viene disegnato a mano un segno (cerchio, freccia, pin,
raggiera). Lascia respiro attorno al soggetto perché il segno abbia dove
stare — posizione e tipo si regolano slot per slot, dove il componente viene
usato.

## Risoluzione

Gli originali attuali stanno tra 940 e 1536 px di lato lungo. Le fasce a
tutta larghezza vengono disegnate a circa 1340 px in CSS, quindi su schermi
a densità doppia sono un po' morbide. Se hai gli originali a risoluzione
maggiore, rilancia lo script puntandolo lì: il resto è automatico.

## Diritti

Usa solo foto di cui hai i diritti. Se ci sono persone riconoscibili serve la
loro liberatoria, a maggior ragione su una pagina che promuove un prodotto.
