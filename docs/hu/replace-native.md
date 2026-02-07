# Natív dialogok kiváltása

A natív `alert/confirm/prompt` szinkron és “idegen” a modern UI-ban.

<div class="callout">

**Ajánlott megközelítés:** a saját kódban cseréld le, ne globálisan.

</div>

## Biztonságos csere

- `alert("...")` → `await FToast.alert("...")`
- `confirm("...")` → `const ok = await FToast.confirm("...")`
- `prompt("...")` → `const v = await FToast.prompt("...")`

## Globális hijack (óvatosan)

```js
FToast.enableDialogHijack({ alert:true, confirm:true, prompt:true });
```

Miért óvatos?

- a natív confirm szinkron, ez viszont Promise (async)
- külső libek számíthatnak a natív viselkedésre
