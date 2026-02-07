# Hooks és életciklus

Hooks akkor hasznos, ha:

- logolni akarsz (debug/analytics)
- toast zárás okát figyelnéd
- action gombok használatát mérnéd

## Globális hooks

```js
FToast.config({
  hooks: {
    onShow: (ctx) => console.log("show", ctx.id, ctx.type),
    onClick: (ctx) => console.log("clicked", ctx.id),
    onAction: ({ actionIndex }) => console.log("action", actionIndex),
    onClose: ({ reason }) => console.log("closed because:", reason)
  }
});
```

## onClose reason

A `reason` egy rövid kód:

- `timeout` – lejárt
- `close_btn` – X gomb
- `click` – toast-ra katt
- `action` – action gomb
- `manual` – `ft:kill` event
- `api` – az objektum `close()` metódusa

**Miért jó ez?** Például sticky toastnál logolhatod, hogy a user tényleg bezárta-e.

## Per-toast hooks

```js
FToast.success("Kész", {
  hooks: { onClose: ({ reason }) => console.log("only this toast:", reason) }
});
```
