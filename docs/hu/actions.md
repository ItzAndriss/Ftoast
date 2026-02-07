# Actions (gombok)

Az `actions[]` a toastban megjelenő gombok listája.

<div class="callout">

**Miért jobb ez, mint egy sima link?**

- a toast “cselekvő” elem: ott és akkor ad lehetőséget
- több opciót is adhatsz (Open / Retry / Dismiss)
- `variant` segítségével vizuálisan is jelzed a kockázatot (danger)

</div>

## Alap példa

```js
FToast.info("Válassz műveletet:", {
  duration: 0,
  actions: [
    { text: "Megnyitás", variant: "info", icon: "fa-solid fa-arrow-right", onClick: () => console.log("open") },
    { text: "Újrapróbál", variant: "success", icon: "fa-solid fa-rotate", onClick: () => console.log("retry") },
    { text: "Bezár", variant: "outline", icon: "fa-solid fa-xmark" }
  ]
});
```

## Mezők

| Mező | Típus | Leírás |
|---|---|---|
| `text` | string | felirat |
| `variant` | string | `neutral/outline/info/success/warning/danger` vagy saját |
| `icon` | string | ikon class (opcionális) |
| `className` | string | teljes class override |
| `onClick` | fn | callback |
| `close` | boolean | ha `false`, nem zárja be a toastot |

## Nem záródó action

```js
FToast.info("Háttér művelet fut...", {
  duration: 0,
  actions: [
    { text: "Log", variant: "outline", close: false, onClick: () => console.log("log") },
    { text: "OK", variant: "info" }
  ]
});
```

## Saját gomb variáns

```js
FToast.setClasses({
  btn: {
    purple: "bg-purple-500 hover:bg-purple-600 border-purple-500/30 text-white"
  }
});

FToast.info("Egyedi", { actions: [{ text: "Purple", variant: "purple" }] });
```
