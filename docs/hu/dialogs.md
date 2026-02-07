# Dialógusok (alert/confirm/prompt)

A dialógusok modálként jelennek meg és Promise-al térnek vissza, így szépen integrálhatóak `async/await` kódba.

## alert(message, opts)

- 1 gomb (OK)
- akkor jó, ha csak tájékoztatás kell

```js
await FToast.alert("Sikeresen mentve!", {
  type: "success",
  title: "Mentés",
  okText: "Szuper",
  okVariant: "success"
});
```

## confirm(message, opts)

- 2 gomb (Cancel/OK)
- `true` vagy `false`

```js
const ok = await FToast.confirm("Biztos törlöd?", {
  title: "Törlés",
  type: "warning",
  okText: "Törlés",
  okVariant: "danger",
  cancelText: "Mégse",
  cancelVariant: "outline"
});

if (!ok) return;
```

## prompt(message, opts)

- input mező + gombok
- `string` vagy `null`

```js
const name = await FToast.prompt("Adj meg egy nevet:", {
  title: "Név",
  placeholder: "pl. Example",
  initialValue: ""
});

if (name == null) return;
console.log("value:", name);
```

## Miért jó, hogy Promise?

- Nem kell callback hell
- Könnyű komponálni (pl. confirm után fetch)

## Theming a dialógusokra

A dialógus classai külön vannak:

- `classes.modalCard`
- `classes.modalHeader`
- `classes.modalFooter`

Lásd: [Classes referencia](/hu/reference/classes)
