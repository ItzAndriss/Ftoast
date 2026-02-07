# Options reference

## General

| Key | Type | Default | Why it matters |
|---|---|---:|---|
| `position` | string | `top-right` | Where toasts appear |
| `duration` | number | `4200` | Lifetime, `0` = sticky |
| `maxToasts` | number | `5` | Stack limit (anti-spam) |
| `newestOnTop` | boolean | `true` | New toast on top |
| `closeOnClick` | boolean | `true` | Quick dismiss |
| `pauseOnHover` | boolean | `true` | Readability |
| `showProgress` | boolean | `true` | Feedback |
| `preventDuplicates` | boolean | `true` | Dedupe |
| `duplicateWindowMs` | number | `1200` | Dedupe window |

## Language

- `lang`: `auto` or explicit (`en`, `hu`)
- `storage.type`: `local|session|none`
- `storage.key`: string
- `fallbackLang`: default `en`

## See also

- Classes reference
- Types reference
- Templates
- Hooks
