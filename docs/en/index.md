---
title: FToast
---

# FToast

FToast is a **toastr-like** notification system built with **Tailwind classes**. It is designed to be easy to call,
but deeply customizable (styles, buttons, i18n, templates) and works well in **dark/light** themes.

It also includes **SweetAlert2-like** dialogs:

- `FToast.alert()` – informational modal
- `FToast.confirm()` – approve/cancel modal
- `FToast.prompt()` – input modal

<div class="callout">

**What makes a good toast system?**

- It doesn’t spam (dedupe + stack limit)
- It’s readable (hover pause)
- It’s actionable (buttons)
- It’s integratable (hooks + templates + i18n)

</div>
