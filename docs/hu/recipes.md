# Receptek / minták

Itt “copy-paste” jellegű minták vannak.

## 1) Fetch wrapper (toastol)

```js
async function apiJson(url, opts = {}) {
  try {
    const r = await fetch(url, opts);
    const j = await r.json().catch(() => ({}));

    if (!r.ok) {
      FToast.error(j?.error || "Hiba", { title: "API" });
      return { ok: false, data: j };
    }

    return { ok: true, data: j };
  } catch (e) {
    FToast.error("Hálózati hiba", { title: "API" });
    return { ok: false, data: null };
  }
}
```

## 2) Folyamat toast (start → success/error)

```js
const t = FToast.info("Folyamatban...", { duration: 0, showProgress: false });

const { ok } = await apiJson("/do", { method: "POST" });

t?.close();
ok ? FToast.success("Kész ✅") : FToast.error("Nem sikerült");
```

## 3) “Inline döntés” toastban (actions)

```js
FToast.warning("Újrapróbálod?", {
  duration: 0,
  actions: [
    { text: "Retry", variant: "success", onClick: () => console.log("retry") },
    { text: "Mégse", variant: "outline" }
  ]
});
```
