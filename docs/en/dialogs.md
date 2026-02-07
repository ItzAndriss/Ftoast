# Dialogs (alert/confirm/prompt)

Dialogs are Promise-based and work nicely with `async/await`.

## alert

```js
await FToast.alert("Saved!", { type: "success", title: "Save" });
```

## confirm

```js
const ok = await FToast.confirm("Delete?", { type: "warning", title: "Delete" });
if (!ok) return;
```

## prompt

```js
const v = await FToast.prompt("Name:", { title: "Settings", placeholder: "Example" });
if (v == null) return;
```
