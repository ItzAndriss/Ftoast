# Options referencia

Ez az oldal a **teljes konfigurációs felület** rövid, de használható magyarázatával.

## Általános

| Kulcs | Típus | Default | Miért jó / mire való |
|---|---|---:|---|
| `position` | string | `top-right` | Toast helye (jobb UX: ne takarjon fontos UI-t) |
| `duration` | number | `4200` | Időzítés ms-ben, `0` = sticky |
| `maxToasts` | number | `5` | Stack limit, anti-spam |
| `newestOnTop` | boolean | `true` | Új toast felül, jobban észrevehető |
| `closeOnClick` | boolean | `true` | Gyors dismiss |
| `pauseOnHover` | boolean | `true` | Elolvasható |
| `showProgress` | boolean | `true` | Látszik, mikor tűnik el |
| `preventDuplicates` | boolean | `true` | Dupla üzenetek elnyomása |
| `duplicateWindowMs` | number | `1200` | Dedupe időablak |

## Nyelv / i18n

| Kulcs | Default | Leírás |
|---|---|---|
| `lang` | `auto` | `auto` vagy pl. `hu` |
| `fallbackLang` | `en` | Ha nincs fordítás |
| `storage.type` | `local` | `local` \| `session` \| `none` |
| `storage.key` | `site_lang` | Kulcs neve |

`i18n[lang][key] = string`

Tipikus kulcsok:
- `title.success/info/warning/error`
- `dialog.ok/cancel/yes/no`
- `close.aria`

## Positions

`positions[position] = "tailwind classes"`

Példa:

```js
FToast.config({
  positions: { "top-right": "top-6 right-6 items-end" }
});
```

## Classes / Types / Template / Hooks

Ezek külön oldalon:

- [Classes referencia](/hu/reference/classes)
- [Types referencia](/hu/reference/types)
- [Template rendszer](/hu/templates)
- [Hooks](/hu/hooks)
