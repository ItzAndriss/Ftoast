# Templates

Use `template(ctx)` when you need full markup control (custom layout, different icon system, extra elements).

## ctx

- `ctx.title`, `ctx.message`, `ctx.type`
- `ctx.typeCfg`, `ctx.classes`
- `ctx.t(key)` for i18n
- `ctx.close()` to close

## Example

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

Add `data-ftbar` inside your template to use the built-in progress animation.
