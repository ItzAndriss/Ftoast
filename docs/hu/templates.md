# Template rendszer

A `template(ctx)` akkor kell, ha a default HTML nem elég.

<div class="callout">

**Mikor érdemes template-et használni?**

- Egyedi layout (pl. inline progress, több sor, badge-ek)
- Egyedi interakció (extra gombok, saját markup)
- Más ikonrendszer (nem FontAwesome)

</div>

## ctx tartalma

- `ctx.title`, `ctx.message`, `ctx.type`
- `ctx.typeCfg`: ikon/ring/progress stb.
- `ctx.classes`: Tailwind classok gyűjteménye
- `ctx.t(key)`: i18n helper
- `ctx.close()`: bezárás

## Példa template

```js
FToast.setTemplate((ctx) => `
  <div class="p-3">
    <div class="flex items-center gap-3">
      <div class="${ctx.classes.iconBoxBase} ${ctx.typeCfg.iconBox}">
        <i class="${ctx.typeCfg.icon}"></i>
      </div>
      <div class="min-w-0 flex-1">
        <div class="text-sm font-black text-gray-900 dark:text-white truncate">${ctx.title}</div>
        <div class="text-xs text-gray-600 dark:text-gray-300 break-words">${ctx.message}</div>
      </div>
      <button data-ftclose class="${ctx.classes.closeBtn}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  </div>
`);
```

## Progress bar template-ben

Ha használni akarod a beépített progress animációt, tedd bele a `data-ftbar` elemet:

```html
<div class="h-1 bg-gray-200 dark:bg-dark-700">
  <div data-ftbar class="h-full w-full origin-left bg-indigo-500"></div>
</div>
```

A rendszer ezt skálázza `scaleX`-el.

## Actions template-ben

Az action gombokhoz `data-ftaction="0"` stb kell. A logikát a rendszer köti:

```js
FToast.info("...", {
  duration: 0,
  actions: [{ text: "OK" }, { text: "Mégse" }],
  template: (ctx) => `
    <div class="p-4">
      <div class="font-black">${ctx.title}</div>
      <div class="text-sm">${ctx.message}</div>
      <div class="mt-3 flex gap-2">
        <button data-ftaction="0" class="${ctx.classes.btnBase} ${ctx.classes.btn.info}">OK</button>
        <button data-ftaction="1" class="${ctx.classes.btnBase} ${ctx.classes.btn.outline}">Mégse</button>
      </div>
    </div>
  `
});
```
