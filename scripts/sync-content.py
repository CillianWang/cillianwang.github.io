"""Keep the direct-file/offline content fallback in sync with content.json."""
import json
from pathlib import Path
root = Path(__file__).resolve().parents[1]
content = json.loads((root / 'content.json').read_text())
(root / 'content-data.js').write_text('// Generated from content.json by scripts/sync-content.py\nwindow.siteContent = ' + json.dumps(content, ensure_ascii=False, indent=2) + ';\n')
print('Updated offline content fallback.')

# Keep professional content readable without JavaScript and available to crawlers.
import html
import re
escape = html.escape
def experience(entry):
    lines = ''.join('<li>' + escape(line) + '</li>' for line in entry['lines'])
    return '<article class="entry"><p class="entry-date">' + escape(entry['date']) + '</p><div class="entry-body"><h3>' + escape(entry['company']) + '</h3><p class="entry-role">' + escape(entry['role']) + '</p><ul class="entry-points">' + lines + '</ul></div></article>'
def education(entry):
    return '<article class="entry"><p class="entry-date">' + escape(entry['date']) + '</p><div class="entry-body"><h3>' + escape(entry['school']) + '</h3><p class="entry-role">' + escape(entry['degree']) + '</p><p class="entry-description">' + escape(entry['text']) + '</p></div></article>'
page = root / 'index.html'
source = page.read_text()
for key, renderer in [('experience', experience), ('education', education)]:
    rendered = ''.join(renderer(entry) for entry in content[key])
    pattern = r'(<!-- ' + key + r':start -->).*?(<!-- ' + key + r':end -->)'
    source = re.sub(pattern, lambda m: m[1] + rendered + m[2], source, flags=re.S)
page.write_text(source)
