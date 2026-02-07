# API referencia

## Toastok

```js
FToast.show(type, message, opts?)
FToast.success(message, opts?)
FToast.info(message, opts?)
FToast.warning(message, opts?)
FToast.error(message, opts?)
```

Visszatérési érték:

```js
const t = FToast.success("...");
t.id
t.el
t.close()
```

## Konfig

```js
FToast.config(partial)
FToast.setClasses(partial)
FToast.setType(type, partial)
FToast.setTemplate(fn)
```

## i18n

```js
FToast.setLang("hu")
FToast.getLang()
FToast.addTranslations("hu", map)
```

## Dialógusok

```js
await FToast.alert(message, opts?)
const ok = await FToast.confirm(message, opts?)
const val = await FToast.prompt(message, opts?)
```

## Utility

```js
FToast.clear()
FToast.clear("top-right")
FToast.enableDialogHijack({ alert:true, confirm:true, prompt:true })
```
