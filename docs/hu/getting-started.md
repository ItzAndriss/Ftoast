# Gyors kezdés

Ez a rész olyan, hogy gyorsan “be lehet dobni” egy projektbe.

## Toast típusok

```js
FToast.success("Mentve ✅");
FToast.info("Frissítve");
FToast.warning("Figyelj: közel a limit");
FToast.error("Hálózati hiba");
```

A típusok defaultja a `types` map-ben van. Ha új típust akarsz, lásd: [Types referencia](/hu/reference/types).

## Per-toast beállítás

A `config()` globális defaultot állít. Ha csak egyszer akarod felülírni:

```js
FToast.info("Ez sticky", {
  duration: 0,
  showProgress: false,
  closeOnClick: false
});
```

Tippek:
- `duration: 0` = sticky (amíg le nem zárod)
- `closeOnClick: false` = ne záródjon be véletlen kattintásra

## Action gombok (mini CTA a toastban)

```js
FToast.warning("Lehet, hogy most érdemes ránézni.", {
  duration: 0,
  actions: [
    { text: "Megnyitás", variant: "info", icon: "fa-solid fa-arrow-right", onClick: () => console.log("open") },
    { text: "Mégse", variant: "outline", icon: "fa-solid fa-xmark" }
  ]
});
```

Miért jó az `actions[]`?

- Nem kell külön modal minden kis döntéshez
- UX-ben közel van a kontextushoz (toast = esemény)

## Dialógusok (SweetAlert2-szerű)

```js
await FToast.alert("Kész!", { type: "success", title: "Mentés" });

const ok = await FToast.confirm("Biztos törlöd?", {
  title: "Törlés",
  type: "warning",
  okText: "Törlés",
  okVariant: "danger",
  cancelText: "Mégse",
  cancelVariant: "outline"
});

const value = await FToast.prompt("Adj meg egy nevet:", {
  title: "Beállítás",
  placeholder: "pl. Example",
  initialValue: ""
});
```

A dialógusok Promise-ot adnak vissza, ami nagyon kényelmes `async/await` mellett.

Következő: [Fogalmak →](/hu/concepts)
