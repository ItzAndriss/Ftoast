# Fogalmak

Ez a fejezet azt tisztázza, hogy “mi miért van”.

## Toast

Toast = **nem blokkoló** értesítés.

Jó használatok:
- művelet visszajelzés: “mentve”, “frissült”
- háttér folyamat eredménye: “kész”, “hiba”
- figyelmeztetés: “limit közelében”

Rossz használat:
- ha a felhasználónak *kötelező* döntést kell hoznia (oda dialógus kell)

## Dialog

Dialog = **blokkoló** modál jelleg.

Jó használatok:
- törlés megerősítés (`confirm`)
- input bekérés (`prompt`)
- fontos info, amit biztosan lásson (`alert`)

## Global config vs per-call override

- `FToast.config({ ... })` → defaultok
- `FToast.info("...", { ... })` → egyszeri felülírás

Praktika: globálban olyan defaultot állíts, ami “a legtöbbször jó”, és csak kivétel esetén írj felül.

## Mi a különbség a `types`, `classes`, `template` között?

- `types`: “szemantika” + akcentus (ikon, ring, progress szín, titleKey)
- `classes`: layout/stílus (Tailwind class stringek)
- `template`: teljes markup kontroll (ha a default layout nem elég)

Általában:
- ha csak színeket/ikonokat akarsz: `types`
- ha a kinézetet akarod formálni: `classes`
- ha teljesen saját komponenst: `template`
