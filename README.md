# FToast

[![](https://data.jsdelivr.com/v1/package/npm/ftoast/badge)](https://www.jsdelivr.com/package/npm/ftoast)

Lightweight toast + dialog system with **i18n**, **light/dark/auto theme**, and **SweetAlert-like dialogs**.

No dependencies. Tailwind-first. FontAwesome not required.

## Features
- Toasts (success / info / warning / error + custom)
- Multiple action buttons inside toasts
- Dialogs: alert, confirm, prompt (Promise-based)
- i18n with auto detection and persistence
- Theme support: light / dark / auto
- Fully customizable via classes and templates

## Install

```bash
npm install ftoast
```

## Usage

```js
import "ftoast/dist/ftoast.js";

FToast.success("Saved!");
FToast.error("Something went wrong");
```

## Dialogs

```js
await FToast.alert("Maintenance mode");
const ok = await FToast.confirm("Delete item?");
const name = await FToast.prompt("Project name");
```

## i18n

```js
FToast.setLang("hu");
FToast.addTranslations("hu", {
  "title.success": "Siker"
});
```

## Theme

```js
FToast.setTheme("dark"); // dark | light | auto
```

## License
MIT
