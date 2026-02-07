# Types referencia

A `types` határozza meg a “jelentést + kinézetet” egy toast típushoz.

| Mező | Leírás |
|---|---|
| `icon` | ikon class (pl. FontAwesome) |
| `ring` | akcentus ring class |
| `iconBox` | ikon doboz class |
| `progress` | progress sáv class |
| `titleKey` | i18n kulcs a default title-hoz |

## Új type hozzáadása

```js
FToast.config({
  types: {
    neutral: {
      icon: "fa-solid fa-bell",
      ring: "ring-gray-500/20",
      iconBox: "bg-gray-500/10 border-gray-500/20 text-gray-500",
      progress: "bg-gray-500",
      titleKey: "title.info"
    }
  }
});

FToast.show("neutral", "Hello");
```
