# Telepítés

FToast “vanilla JS” – nincs build lépés, csak egy script.

## 1) Fájl elhelyezése

Tedd statikusan kiszolgált helyre, például:

- `/public/assets/js/ftoast.js`

## 2) Betöltés

```html
<script src="/assets/js/ftoast.js"></script>
```

**Ikonok:** a default type-ok FontAwesome classokat használnak. Ha nem akarsz FA-t, átírhatod a `types.*.icon`-t
(vagy teljesen egyedi template-et adhatsz).

## 3) Ajánlott inicializálás

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

Miért jó ez így?

- `maxToasts`: nem önti el a UI-t
- `pauseOnHover`: elolvasható marad
- `showProgress`: visszajelzés, mikor tűnik el

## 4) Nyelv tárolás

Ha többnyelvű az app, érdemes ugyanazt a storage kulcsot használni, mint a site többi részén.

```js
FToast.config({
  storage: { type: "local", key: "site_lang" },
  lang: "auto"
});
```

A `lang: "auto"` a következő sorrendben próbálkozik:

1. storage (local/session)
2. `<html lang="...">`
3. `navigator.language`
4. `fallbackLang`

Következő: [Gyors kezdés →](/hu/getting-started)
