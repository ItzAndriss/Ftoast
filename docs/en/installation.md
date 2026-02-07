# Installation

FToast is “vanilla JS” - no build step required.

## 1) Place the file

Put it in a static folder, e.g.:

- `/public/assets/js/ftoast.js`

## 2) Include it

```html
<script src="/assets/js/ftoast.js"></script>
```

**Icons:** default types use FontAwesome class names. If you don’t want FA, replace `types.*.icon` or use templates.

## 3) Recommended defaults

```js
FToast.config({
  position: "top-right",
  duration: 4500,
  maxToasts: 4,
  newestOnTop: true,
  pauseOnHover: true,
  showProgress: true
});
```

## 4) Language storage

```js
FToast.config({ storage: { type: "local", key: "site_lang" }, lang: "auto" });
```

Auto order: storage → `<html lang>` → `navigator.language` → `fallbackLang`.
