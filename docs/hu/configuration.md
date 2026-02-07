# Konfiguráció

A konfiguráció két szinten működik:

1. **Globális defaultok** (`FToast.config`)
2. **Per-toast felülírás** (a hívás 3. paramétere)

## Alap defaultok

```js
FToast.config({
  position: "top-right",
  duration: 4200,
  maxToasts: 5,
  newestOnTop: true,
  closeOnClick: true,
  pauseOnHover: true,
  showProgress: true
});
```

### Mi mit csinál?

- `position`: hol jelenik meg (sarok/közép)
- `duration`: mennyi ideig él (0 = sticky)
- `maxToasts`: hány darab lehet egyszerre (UX + anti-spam)
- `pauseOnHover`: legyen idő elolvasni

## Duplikációk kezelése (dedupe)

Ha van olyan esemény, ami gyorsan többször tüzel (pl. polling), a dedupe sokat segít:

```js
FToast.config({
  preventDuplicates: true,
  duplicateWindowMs: 2000
});
```

**Tipp:** ha vannak “ugyanolyan” üzeneteid, de mégis külön akarod őket, kapcsold ki per-hívás:

```js
FToast.info("Állapot frissült", { preventDuplicates: false });
```

## Stack limit + sorrend

- `maxToasts`: ha betelik, a rendszer “kilövi” a legrégebbit (vagy a legújabbat a beállítástól függően)
- `newestOnTop`: az új toast felülre kerüljön-e

## Hooks bekötése

```js
FToast.config({
  hooks: {
    onShow: (ctx) => console.log("show", ctx.type, ctx.id),
    onClose: ({ reason }) => console.log("close reason:", reason)
  }
});
```

Teljes lista: [Options referencia](/hu/reference/options)
