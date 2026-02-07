# Anti-spam / dedupe minták

Ha egy esemény gyorsan többször jön (pl. websocket/polling), a toast könnyen spam lesz.

## 1) Dedupe bekapcsolás (globál)

```js
FToast.config({
  preventDuplicates: true,
  duplicateWindowMs: 2500
});
```

## 2) Dedupe kikapcsolás “szándékosan”

Ha tényleg minden eseményt látni akarsz:

```js
FToast.info("Új esemény", { preventDuplicates: false });
```

## 3) “Milestone toast” stratégia

Nem toastolsz minden progress tickre, csak:

- 10%
- 50%
- 100%

Ez UX-ben jobb és nem spam.
