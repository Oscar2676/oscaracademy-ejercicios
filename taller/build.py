#!/usr/bin/env python3
"""Arma las hojas del lote 10 a partir de src/l10/*.html usando una hoja publicada como molde (cabecera, CSS y motor)."""
import re, sys, pathlib, html
ROOT = pathlib.Path(__file__).parent
NUM = sys.argv[1] if len(sys.argv) > 1 else '10'
NOMBRE = sys.argv[2] if len(sys.argv) > 2 else 'Números racionales'
MOLD = (pathlib.Path(__file__).resolve().parent.parent / 'cuerpos-redondos/lote05/H02_volumen_del_cilindro_v002.html').read_text(encoding='utf-8')
head = MOLD[:MOLD.index('<article')]
tail_start = MOLD.index('<script>\nwindow.MathJax')
engine = MOLD[tail_start:MOLD.index("OA.scene('")]
EXTRA_CSS = """
/* Regla de Óscar: animaciones y figuras chicas (mitad del tamaño antiguo). */
.plot{max-width:340px}
.plot.wide{max-width:460px}
.lab{font-size:.72rem}
/* Recuadros de color (Óscar, 13-nov): lista de propiedades y una tarjeta por demostración. */
.props{background:var(--brand-soft);border-left:6px solid var(--brand);border-radius:12px;padding:14px 18px;margin:18px 0;overflow-x:auto}
.props h3{margin:0 0 6px;color:var(--brand)}
.prop{border:1.5px solid var(--brand-soft);border-radius:12px;margin:20px 0;overflow:hidden}
.prop>h3{background:var(--brand-soft);color:var(--brand);margin:0;padding:10px 16px;border-left:6px solid var(--brand)}
.prop>.body{padding:4px 16px 10px}
/* Cada demostración en un recuadro de color distinto (Óscar, 15-nov). */
.prop{--k:var(--brand);border-color:color-mix(in srgb,var(--k) 30%,transparent)}
.prop>h3{background:color-mix(in srgb,var(--k) 15%,transparent);color:color-mix(in srgb,var(--k) 78%,var(--ink));border-left-color:var(--k)}
.prop>.body{background:color-mix(in srgb,var(--k) 5%,transparent)}
.prop.p2{--k:#2e6b3e}.prop.p3{--k:#1f5f8a}.prop.p4{--k:#a85f00}.prop.p5{--k:#5b3a8c}.prop.p6{--k:#1f7a78}.prop.p7{--k:#a8456b}.prop.p8{--k:#6b6b1f}.prop.p9{--k:#3d5a80}
/* Diagramación que invite a leer (Óscar, 13-nov): bloques con fondo de color, uno por idea. */
.card{--k:var(--brand);border-left:6px solid var(--k);background:color-mix(in srgb,var(--k) 9%,transparent);border-radius:12px;padding:14px 18px;margin:22px 0;display:flex;flex-direction:column;gap:10px;min-width:0;overflow-x:auto}
.card>h3{margin:0;color:var(--k)}
.card.k1{--k:var(--alt)} .card.k2{--k:var(--secant)} .card.k3{--k:var(--rise)}
.card .stage{background:var(--bg);border-radius:10px;padding:8px}
.steps>li::marker{color:var(--brand);font-weight:700}
.why{border:0;border-left:6px solid var(--rise);border-radius:12px;background:color-mix(in srgb,var(--rise) 9%,transparent)}
.why>h3{color:var(--rise);margin:0}
.ex{border:1.5px solid var(--brand-soft);border-radius:12px;padding:12px 16px;margin:14px 0}
/* Hojas anteriores, sin tocar su contenido: el paso a paso principal y la lista de claves toman fondo de color. */
.sheet section>.steps{background:color-mix(in srgb,var(--secant) 7%,transparent);border-left:6px solid var(--secant);border-radius:12px;padding:14px 18px 14px 2.6em}
.sheet section>.keys{background:color-mix(in srgb,var(--alt) 8%,transparent);border-left:6px solid var(--alt);border-radius:12px;padding:12px 18px 12px 2.4em}
.def{border-left-width:6px;border-radius:12px}
"""
head = head.replace('</style>', EXTRA_CSS + '</style>', 1)
LOTE = 'l' + NUM
sheets = []
# Crédito al pie de cada hoja y bajo cada animación (pedido de Óscar, 22-nov-2026): misma función que sitio/credito.py
import importlib.util as _iu
_sp = _iu.spec_from_file_location('credito', ROOT.parent/'sitio'/'credito.py'); _cr = _iu.module_from_spec(_sp); _sp.loader.exec_module(_cr)
for f in sorted((ROOT/'src'/LOTE).glob('*.html')):
    txt = f.read_text(encoding='utf-8')
    art, js = txt.split('<!--SCENE-->')
    meta = dict(re.findall(r'<!--(\w+):(.*?)-->', art))
    art = re.sub(r'<!--\w+:.*?-->\n?', '', art).strip()
    art = _cr.poner(art)
    sheets.append((meta, art, js.strip()))
def page(title, body, js, extra=''):
    h = re.sub(r'<title>.*?</title>', '<title>' + html.escape(title) + ' | Oscar Academy</title>', head, count=1)
    return h + body + '\n</div>\n' + engine + js + '\nOA.boot();\n</script>\n' + extra + '</body>\n</html>\n'
out = ROOT/'out'/'hojas'/('lote' + NUM); out.mkdir(parents=True, exist_ok=True)
for meta, art, js in sheets:
    (out/meta['file']).write_text(page(meta['title'], art, js), encoding='utf-8')
nav = '<nav class="lote" aria-label="Hojas del lote"><b>Lote ' + NUM + ' · ' + NOMBRE + '</b>' + ''.join('<a href="#%s">%s</a>' % (m['id'], m['tab']) for m, _, _ in sheets) + '</nav>\n'
rev = (ROOT/'src'/'revision.js').read_text(encoding='utf-8').replace('lote10', 'lote' + NUM).replace('Lote 10', 'Lote ' + NUM)
# Ronda de corrección: si existe src/lNN/ronda.txt, las notas guardadas de rondas anteriores (ya resueltas) no vuelven a aparecer.
_r = ROOT/'src'/LOTE/'ronda.txt'
if _r.exists(): rev = rev.replace('oa-correcciones-lote' + NUM, 'oa-correcciones-lote' + NUM + '-r' + _r.read_text().strip())
card = page('Lote ' + NUM + ' · ' + NOMBRE + ' · tarjeta de revisión', nav + '\n'.join(a for _, a, _ in sheets), '\n'.join(j for _, _, j in sheets), '<script>\n' + rev + '\n</script>\n')
(ROOT/'out'/('lote' + NUM + '.html')).write_text(card, encoding='utf-8')
print('ok', [m['file'] for m, _, _ in sheets], len(card))
