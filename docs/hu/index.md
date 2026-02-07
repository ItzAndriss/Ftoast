---
title: FToast
---

# FToast

A FToast egy **toastr-szerű** értesítési rendszer **Tailwind classokra** építve. A cél: legyen egyszerű az API, mégis
**nagyon testreszabható** (színek, layout, gombok, i18n), és működjön **dark/light** témában is.

Emellett kapsz **SweetAlert2-szerű** dialógusokat is:

- `FToast.alert()` – információs modál (1 gomb)
- `FToast.confirm()` – jóváhagyás / visszavonás (2 gomb)
- `FToast.prompt()` – inputos modál (értéket kér)

<div class="callout">

**Mitől “pro” egy toast rendszer?**

- Ne spammeljen: dedupe + stack limit
- Ne villogjon: animáció + hover pause
- Legyen UX: action gombok, észszerű defaultok
- Legyen integrálható: i18n + storage + hooks + template

</div>

## Gyors útvonalak

- [Telepítés](/hu/installation)
- [Gyors kezdés](/hu/getting-started)
- [Konfiguráció](/hu/configuration)
- [Options referencia](/hu/reference/options)
