# Types reference

Fields:

- `icon`, `ring`, `iconBox`, `progress`, `titleKey`

Add a new type:

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
