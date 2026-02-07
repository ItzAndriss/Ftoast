# Hibaelhárítás

## Nem jelenik meg a toast

Ellenőrizd:

- betöltött a script? (Network 200)
- nincs JS error? (Console)
- a script a body végén van?
- a CSP nem tiltja?

## Nincs ikon

- FontAwesome CSS be van töltve?
- ha nem akarsz FA-t: állítsd át a `types.*.icon`-t vagy template-et használj

## Túl sok toast

- `maxToasts` csökkentése (pl. 3)
- dedupe bekapcsolás (`preventDuplicates`)
- “milestone” stratégia (lásd receptek)

## Hoverre nem áll meg

- `pauseOnHover: true` globálban
- per-toastban nem írtad felül `false`-ra?
