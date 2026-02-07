# Theming (Tailwind)

Two main tools:

1) `classes` for layout/typography/padding
2) `types` for per-type accent colors/icons

## Compact example

```js
FToast.setClasses({
  body: "p-3",
  title: "font-extrabold text-sm",
  message: "mt-0.5 text-xs text-gray-600 dark:text-gray-300"
});
```

## Solid (no blur)

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

## Per-type progress colors

```js
FToast.setType("success", { progress: "bg-emerald-500" });
FToast.setType("warning", { progress: "bg-yellow-500" });
FToast.setType("error",   { progress: "bg-red-500" });
```
