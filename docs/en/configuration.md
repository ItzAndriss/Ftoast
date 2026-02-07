# Configuration

Configuration works on two layers:

1) global defaults (`FToast.config`)
2) per-call override (third argument)

## Base defaults

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

## Dedupe

```js
FToast.config({ preventDuplicates: true, duplicateWindowMs: 2000 });
```

Disable for a specific toast:

```js
FToast.info("Event", { preventDuplicates: false });
```

## Hooks

```js
FToast.config({
  hooks: {
    onShow: (ctx) => console.log("show", ctx.id),
    onClose: ({ reason }) => console.log("closed:", reason)
  }
});
```
