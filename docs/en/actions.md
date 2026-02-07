# Actions (buttons)

Actions are optional buttons inside a toast, used for contextual quick decisions.

```js
FToast.info("Choose:", {
  duration: 0,
  actions: [
    { text: "Open", variant: "info", icon: "fa-solid fa-arrow-right", onClick: () => console.log("open") },
    { text: "Retry", variant: "success", icon: "fa-solid fa-rotate", onClick: () => console.log("retry") },
    { text: "Dismiss", variant: "outline", icon: "fa-solid fa-xmark" }
  ]
});
```

Use `close:false` if an action should not close the toast.
