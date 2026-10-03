with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove Netlify HUD script
hud_pos = html.find('/.netlify/scripts/hud')
if hud_pos != -1:
    tag_start = html.rfind('<script', 0, hud_pos)
    tag_end = html.find('</script>', hud_pos) + 9
    html = html[:tag_start] + html[tag_end:]

# 2. Add Preload hints in <head>
preload_tags = '''<link rel="preload" href="secret-pathways-assets/fonts.css" as="style">
<link rel="preload" href="identity.css" as="style">
<link rel="preload" href="secret-pathways-assets/three.min.js" as="script">
<link rel="preload" href="secret-pathways-assets/foreground/png/temple-wall.webp" as="image" type="image/webp">
<link rel="preload" href="secret-pathways-assets/foreground/png/pine-tree.webp" as="image" type="image/webp">
<link rel="preload" href="secret-pathways-assets/foreground/png/tall-grass.webp" as="image" type="image/webp">
'''

if 'rel="preload" href="secret-pathways-assets/fonts.css"' not in html:
    html = html.replace('<link rel="stylesheet" href="secret-pathways-assets/fonts.css">',
                        preload_tags + '<link rel="stylesheet" href="secret-pathways-assets/fonts.css">')

# 3. Add CSS performance containment & GPU rules
css_optimizations = '''
/* Performance optimizations */
.sec:not(#hero), .foot {
  content-visibility: auto;
  contain-intrinsic-size: 1px 900px;
}
#gl {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
.project-preview img {
  will-change: transform;
}
'''
if 'content-visibility: auto' not in html:
    html = html.replace('/* ============================================================= tokens */',
                        '/* ============================================================= tokens */' + css_optimizations)

# 4. Optimize DPR_CAP
html = html.replace("const DPR_CAP      = qn('dpr', LOW ? 1.4 : 1.8);",
                    "const DPR_CAP      = qn('dpr', COARSE ? 1.35 : 1.6);")

# 5. Optimize cardAlpha(el) to eliminate layout thrashing
old_card_alpha = '''function cardAlpha(el) {
  let a = 1;
  for (let n = el; n && n !== document.body; n = n.parentElement) {
    const s = getComputedStyle(n);
    if (s.display === 'none' || s.visibility === 'hidden') return 0;
    a *= +s.opacity;
    if (a < .001) return 0;
  }
  return a;
}'''

new_card_alpha = '''function cardAlpha(el) {
  if (!el || el.offsetParent === null) return 0;
  if (el.style.opacity !== '') {
    const a = +el.style.opacity;
    if (isNaN(a) || a < .995) return 0;
  }
  return 1;
}'''

if old_card_alpha in html:
    html = html.replace(old_card_alpha, new_card_alpha)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Optimized index.html in milliseconds!')
