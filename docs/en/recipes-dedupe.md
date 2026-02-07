# Anti-spam / dedupe recipes

## Enable dedupe globally

```js
FToast.config({ preventDuplicates: true, duplicateWindowMs: 2500 });
```

## Disable per toast

```js
FToast.info("Event", { preventDuplicates: false });
```

## Milestone strategy

Show toasts only at meaningful milestones (10/50/100) instead of every tick.
