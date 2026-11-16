#!/usr/bin/env python3
"""Aplica la diagramación con bloques de color a hojas publicadas de moldes anteriores (lotes 01-09)
SIN tocar su contenido: solo agrega un bloque marcado al final de <style>. Es idempotente.
Uso: python3 taller/diagramar.py            (aplica a los lotes 01-09)
     python3 taller/diagramar.py --check    (solo informa)"""
import re, sys, pathlib
ROOT = pathlib.Path(__file__).resolve().parent.parent
MARK = '/* DIAGRAMACION-BLOQUES v1 (Óscar, 13-nov-2026): solo estilos, contenido intacto. */'
# Molde del taller (lotes 01-08): mismas reglas que EXTRA_CSS de build.py para hojas anteriores.
CSS_MOLDE = MARK + """
.steps>li::marker{color:var(--brand);font-weight:700}
.why{border:0;border-left:6px solid var(--rise);border-radius:12px;background:color-mix(in srgb,var(--rise) 9%,transparent)}
.why>h3{color:var(--rise);margin:0}
.ex{border:1.5px solid var(--brand-soft);border-radius:12px;padding:12px 16px;margin:14px 0}
.sheet section>.steps{background:color-mix(in srgb,var(--secant) 7%,transparent);border-left:6px solid var(--secant);border-radius:12px;padding:14px 18px 14px 2.6em}
.sheet section>.keys{background:color-mix(in srgb,var(--alt) 8%,transparent);border-left:6px solid var(--alt);border-radius:12px;padding:12px 18px 12px 2.4em}
.def{border-left:6px solid var(--brand);border-radius:12px}
"""
# Molde propio del lote 09 (Riemann): cada sección numerada es un bloque de color.
CSS_L09 = MARK + """
.page>section:not(:first-of-type){--k:var(--brand);border-left:6px solid var(--k);background:color-mix(in srgb,var(--k) 7%,transparent);border-radius:12px;padding:16px 18px}
.page>section:nth-of-type(4n+3){--k:var(--alt)}
.page>section:nth-of-type(4n+4){--k:var(--secant)}
.page>section:nth-of-type(4n+5){--k:var(--rise)}
.page>section:not(:first-of-type)>h2{border-top:0;padding-top:0;color:color-mix(in srgb,var(--k) 85%,var(--ink))}
.page>section:not(:first-of-type) h3{color:color-mix(in srgb,var(--k) 85%,var(--ink));border-top:1px solid color-mix(in srgb,var(--k) 25%,transparent);padding-top:12px;margin-top:10px}
.page>section:not(:first-of-type) .eq{background:var(--bg);border-radius:8px;padding:6px 10px}
.page>section:not(:first-of-type) figure img{background:var(--bg);border-radius:8px;padding:6px}
.def{border-left:6px solid var(--brand);border-radius:12px;background:var(--bg);box-shadow:inset 0 0 0 1.5px var(--brand-soft)}
.def .eq{background:var(--brand-soft)!important}
.ex{border:1.5px solid color-mix(in srgb,var(--k) 30%,transparent);border-radius:12px;padding:12px 16px;background:var(--bg)}
details{background:var(--bg)}
"""
def hojas():
    for d in sorted(ROOT.glob('*/lote0[1-9]')):
        for f in sorted(d.glob('*.html')):
            if f.name == 'index.html' or '_anterior' in f.name: continue
            yield f
def main():
    check = '--check' in sys.argv; n = 0
    for f in hojas():
        s = f.read_text(encoding='utf-8')
        if MARK in s: print('ya', f.relative_to(ROOT)); continue
        css = CSS_L09 if 'lote09' in str(f) else CSS_MOLDE
        if 'lote09' not in str(f) and 'class="sheet"' not in s: print('MOLDE DISTINTO', f.relative_to(ROOT)); continue
        i = s.find('</style>')
        if i < 0: print('SIN STYLE', f.relative_to(ROOT)); continue
        if not check: f.write_text(s[:i] + css + s[i:], encoding='utf-8')
        n += 1; print('ok', f.relative_to(ROOT))
    print(n, 'hojas')
main()
