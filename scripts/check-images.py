#!/usr/bin/env python3
"""Check all Unsplash URLs return HTTP 200."""
import urllib.request
import concurrent.futures
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

with open("/tmp/unsplash_urls.txt") as f:
    urls = [l.strip() for l in f if l.strip()]

print(f"Checking {len(urls)} URLs...")

def check(url):
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        resp = urllib.request.urlopen(req, timeout=20, context=ctx)
        return (resp.status, url)
    except Exception as e:
        return (str(e)[:60], url)

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as ex:
    results = list(ex.map(check, urls))

# Count by status
from collections import Counter
counts = Counter(r[0] for r in results)
print("\nStatus counts:")
for status, count in counts.most_common():
    print(f"  {status}: {count}")

# Show any non-200
bad = [r for r in results if r[0] != 200]
if bad:
    print(f"\n❌ {len(bad)} broken URLs:")
    for status, url in bad:
        print(f"  {status} {url}")
else:
    print("\n✅ All URLs return 200")
