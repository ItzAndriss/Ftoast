# Quick Start

## Toasts

```js
FToast.success("Saved ✅");
FToast.info("Updated");
FToast.warning("Near the limit");
FToast.error("Network error");
```

## One-off overrides

```js
FToast.info("Sticky", { duration: 0, showProgress: false, closeOnClick: false });
```

## Actions (CTA buttons)

```js
FToast.warning("You may want to check this.", {
  duration: 0,
  actions: [
    { text: "Open", variant: "info", icon: "fa-solid fa-arrow-right", onClick: () => console.log("open") },
    { text: "Dismiss", variant: "outline", icon: "fa-solid fa-xmark" }
  ]
});
```

## Dialogs

```js
await FToast.alert("Done!", { type: "success", title: "Save" });

const ok = await FToast.confirm("Delete it?", {
  title: "Delete",
  type: "warning",
  okText: "Delete",
  okVariant: "danger",
  cancelText: "Cancel",
  cancelVariant: "outline"
});

const value = await FToast.prompt("Enter a name:", {
  title: "Settings",
  placeholder: "e.g. Example",
  initialValue: ""
});
```
