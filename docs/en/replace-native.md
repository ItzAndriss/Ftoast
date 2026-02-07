# Replacing native dialogs

Recommended: replace calls in your code (safer than global hijack).

```js
await FToast.alert("...");
const ok = await FToast.confirm("...");
const v = await FToast.prompt("...");
```

Optional global hijack (be careful with 3rd-party code):

```js
FToast.enableDialogHijack({ alert:true, confirm:true, prompt:true });
```
