#!/bin/bash
# Screenshot all 23 footers
mkdir -p /home/z/my-project/download/footer-screenshots
cd /home/z/my-project

for i in $(seq -w 1 23); do
  url="http://localhost:3000/components/cards/footer0${i}-card"
  out="/home/z/my-project/download/footer-screenshots/footer${i}.png"
  echo "→ Capturing footer0${i}..."
  agent-browser open "$url" 2>&1 | tail -1
  sleep 2
  agent-browser screenshot --full "$out" 2>&1 | tail -1
done

echo ""
echo "=== Screenshots saved ==="
ls -la /home/z/my-project/download/footer-screenshots/
