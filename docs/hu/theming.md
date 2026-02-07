# Theming (Tailwind)

A theming két fő módon történik:

1. `classes` – Tailwind class stringek felülírása
2. `types` – típusonkénti színek/ikonok

## Mikor melyiket?

- Ha “kicsit más padding/typography/layout”: `classes`
- Ha “más ikon, más ring/progress szín”: `types`

## Példa: compact toast

```js
FToast.setClasses({
  body: "p-3",
  iconBoxBase: "w-9 h-9 rounded-xl border flex items-center justify-center",
  title: "font-extrabold text-sm",
  message: "mt-0.5 text-xs text-gray-600 dark:text-gray-300"
});
```

## Példa: solid (blur nélkül)

```js
FToast.setClasses({
  toastBase: [
    "pointer-events-auto w-[min(420px,calc(100vw-2rem))]",
    "rounded-2xl border shadow-2xl overflow-hidden",
    "bg-white dark:bg-dark-800",
    "border-gray-200 dark:border-dark-700",
    "opacity-0 translate-y-2 transition-all duration-200 ease-out",
    "ring-1"
  ].join(" ")
});
```

## Típusonkénti progress szín

```js
FToast.setType("success", { progress: "bg-emerald-500" });
FToast.setType("warning", { progress: "bg-yellow-500" });
FToast.setType("error",   { progress: "bg-red-500" });
```

## Gomb variánsok (actions + dialógus)

A gombok a `classes.btnBase` + `classes.btn.{variant}` alapján készülnek.

```js
FToast.setClasses({
  btn: {
    info: "bg-indigo-500 hover:bg-indigo-600 border-indigo-500/30 text-white",
    outline: "bg-transparent hover:bg-gray-100 dark:hover:bg-dark-700 border-gray-200 dark:border-dark-700 text-gray-800 dark:text-gray-100"
  }
});
```

Teljes listák: [Classes referencia](/hu/reference/classes), [Types referencia](/hu/reference/types)
