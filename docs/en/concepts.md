# Concepts

## Toast

A toast is non-blocking feedback. Use it for status updates, background results, warnings.

## Dialog

A dialog is blocking. Use it when the user must decide (delete confirmation, input).

## Global defaults vs per-call overrides

- `FToast.config(...)` sets defaults
- `FToast.info(..., { ... })` overrides once

## Types vs Classes vs Templates

- `types`: semantic presets (icon/accent/progress/title key)
- `classes`: Tailwind class map controlling layout and style
- `templates`: full markup control when defaults aren’t enough
