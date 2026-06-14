# Platform Specs

## Fixed boards

| Format | Class | Size | Use |
|---|---:|---:|---|
| xhs | `.poster.xhs` | 1080×1440 | Xiaohongshu / Rednote 3:4 carousel |
| wide | `.poster.wide` | 2100×900 | WeChat official account 21:9 cover |
| square | `.poster.square` | 1080×1080 | WeChat share card / square social card |
| xcover | `.poster.xcover` | 1500×600 | X 5:2 article cover |

## Naming

Use stable exported names:

```text
01-cover.png
02-flow.png
03-evidence.png
```

Avoid spaces and Chinese filenames in output PNG paths, because shell tools and publishing pipelines often break on them.
