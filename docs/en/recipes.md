# Recipes / patterns

## Fetch wrapper with toasts

```js
async function apiJson(url, opts = {}) {
  try {
    const r = await fetch(url, opts);
    const j = await r.json().catch(() => ({}));
    if (!r.ok) { FToast.error(j?.error || "Error", { title: "API" }); return { ok:false, data:j }; }
    return { ok:true, data:j };
  } catch {
    FToast.error("Network error", { title: "API" });
    return { ok:false, data:null };
  }
}
```

## Operation toast (start → result)

```js
const t = FToast.info("Working...", { duration: 0, showProgress: false });
const { ok } = await apiJson("/do", { method: "POST" });
t?.close();
ok ? FToast.success("Done") : FToast.error("Failed");
```
