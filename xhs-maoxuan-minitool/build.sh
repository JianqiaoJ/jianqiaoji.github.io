#!/bin/bash
# 按 minitool-zip-builder 1.4.x 规范打包（index.html 必须在 zip 根目录）
set -e
cd "$(dirname "$0")"
OUT="maoxuan-xhs-tool.zip"
rm -f "$OUT"
zip -r "$OUT" index.html assets/ fonts/ \
  -x '*.DS_Store' \
  -x '*/__MACOSX/*' \
  -x '*.map'
echo "✅ 已生成: $(pwd)/$OUT"
ls -lh "$OUT"
unzip -l "$OUT"
