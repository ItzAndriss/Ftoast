# Hooks & lifecycle

Hooks help with logging, analytics, and debugging.

```js
FToast.config({
  hooks: {
    onShow: (ctx) => console.log("show", ctx.id),
    onAction: ({ actionIndex }) => console.log("action", actionIndex),
    onClose: ({ reason }) => console.log("close reason:", reason)
  }
});
```

Common close reasons: `timeout`, `close_btn`, `click`, `action`, `manual`, `api`.
