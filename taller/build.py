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
/* Diagramación que invite a leer (Óscar, 13-nov): bloques con fondo de color, uno por idea. */
.card{--k:var(--brand);border-left:6px solid var(--k);background:color-mix(in srgb,var(--k) 9%,transparent);border-radius:12px;padding:14px 18px;margin:22px 0;display:flex;flex-direction:column;gap:10px;min-width:0;overflow-x:auto}
.card>h3{margin:0;color:var(--k)}
.card.k1{--k:var(--alt)} .card.k2{--k:var(--secant)} .card.k3{--k:var(--rise)}
.card .stage{background:var(--bg);border-radius:10px;padding:8px}
.steps>li::marker{color:var(--brand);font-weight:700}
.why{border:0;border-left:6px solid var(--rise);border-radius:12px;background:color-mix(in srgb,var(--rise) 9%,transparent)}
.why>h3{color:var(--rise);margin:0}
.ex{border:1.5px solid var(--brand-soft);border-radius:12px;padding:12px 16px;margin:14px 0}
"""
head = head.replace('</style>', EXTRA_CSS + '</style>', 1)
LOTE = 'l' + NUM
sheets = []
for f in sorted((ROOT/'src'/LOTE).glob('*.html')):
    txt = f.read_text(encoding='utf-8')
    art, js = txt.split('<!--SCENE-->')
    meta = dict(re.findall(r'<!--(\w+):(.*?)-->', art))
    art = re.sub(r'<!--\w+:.*?-->\n?', '', art).strip()
    sheets.append((meta, art, js.strip()))
def page(title, body, js, extra=''):
    h = re.sub(r'<title>.*?</title>', '<title>' + html.escape(title) + ' | Oscar Academy</title>', head, count=1)
    return h + body + '\n</div>\n' + engine + js + '\nOA.boot();\n</script>\n' + extra + '</body>\n</html>\n'
out = ROOT/'out'/'hojas'/('lote' + NUM); out.mkdir(parents=True, exist_ok=True)
for meta, art, js in sheets:
    (out/meta['file']).write_text(page(meta['title'], art, js), encoding='utf-8')
nav = '<nav class="lote" aria-label="Hojas del lote"><b>Lote ' + NUM + ' · ' + NOMBRE + '</b>' + ''.join('<a href="#%s">%s</a>' % (m['id'], m['tab']) for m, _, _ in sheets) + '</nav>\n'
rev = (ROOT/'src'/'revision.js').read_text(encoding='utf-8').replace('lote10', 'lote' + NUM).replace('Lote 10', 'Lote ' + NUM)
card = page('Lote ' + NUM + ' · ' + NOMBRE + ' · tarjeta de revisión', nav + '\n'.join(a for _, a, _ in sheets), '\n'.join(j for _, _, j in sheets), '<script>\n' + rev + '\n</script>\n')
(ROOT/'out'/('lote' + NUM + '.html')).write_text(card, encoding='utf-8')
print('ok', [m['file'] for m, _, _ in sheets], len(card))
