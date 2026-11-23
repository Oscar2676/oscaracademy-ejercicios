#!/usr/bin/env python3
"""Tablero de Oscar Academy: de dónde vengo, dónde estoy y adónde voy.

Lee el repositorio (hojas publicadas y su estado), sitio/enlaces.json (qué títulos del sitio abren cada hoja),
sitio/arbol-sitio.json (cuántos títulos tiene cada página) y sitio/plan.json (lo que se anota a mano).
Escribe sitio/tablero.html. No necesita a Claude: GitHub lo ejecuta junto con enlaces.py.
"""
import re, json, html, pathlib, datetime, collections, urllib.parse
AQUI = pathlib.Path(__file__).resolve().parent; REPO = AQUI.parent
BASE = 'https://oscar2676.github.io/oscaracademy-ejercicios/'
MES = {'ene':1,'feb':2,'mar':3,'abr':4,'may':5,'jun':6,'jul':7,'ago':8,'sep':9,'oct':10,'nov':11,'dic':12}
TEMA = {'calculo-diferencial':'Cálculo diferencial','calculo-integral':'Cálculo integral','trigonometria':'Trigonometría','geometria-analitica':'Geometría analítica',
        'cuerpos-redondos':'Cuerpos redondos','geometria':'Geometría','demostraciones':'Demostraciones','numeros-racionales':'Números racionales','potencias':'Potencias',
        'crecimiento-y-decrecimiento':'Crecimiento y decrecimiento','potencias-y-raices':'Potencias y raíces','funcion-exponencial':'Función exponencial','funcion-logaritmica':'Función logarítmica'}
e = lambda s: html.escape(str(s), quote=True)

def leer_hojas():
    hojas = []
    for f in sorted(REPO.glob('*/lote*/*.html')):
        if f.name == 'index.html' or '_anterior' in f.name: continue
        s = f.read_text(encoding='utf-8', errors='replace')
        if len(s) < 2000: continue                      # redirecciones
        m = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S); nombre = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else ''
        if not nombre:
            m = re.search(r'<title>(.*?)</title>', s, re.S); nombre = html.unescape(m.group(1)).split('|')[0].split('·')[0].strip() if m else f.stem
        m = re.search(r'class=["\']status["\'][^>]*>(.*?)<', s, re.S); estado = html.unescape(m.group(1)).strip() if m else ''
        m = re.search(r'APR de Óscar,\s*(\d{1,2})-([a-z]{3})-(\d{4})', s); apr = datetime.date(int(m.group(3)), MES[m.group(2)], int(m.group(1))) if m else None
        rel = f.relative_to(REPO).as_posix(); carpeta, lote = rel.split('/')[0], rel.split('/')[1]
        hn = re.match(r'(H\d+|demostracion_T\d+)', f.name); ver = re.search(r'_v(\d+)\.html$', f.name)
        hojas.append({'archivo': rel, 'nombre': re.sub(r'\s+', ' ', nombre), 'estado': estado, 'apr': apr, 'tema': TEMA.get(carpeta, carpeta), 'lote': int(re.sub(r'\D', '', lote)),
                      'h': hn.group(1) if hn else f.stem, 'ver': int(ver.group(1)) if ver else 999})
    mayor = collections.defaultdict(int)
    for h in hojas: mayor[(h['archivo'].rsplit('/', 1)[0], h['h'])] = max(mayor[(h['archivo'].rsplit('/', 1)[0], h['h'])], h['ver'])
    return [h for h in hojas if h['ver'] == mayor[(h['archivo'].rsplit('/', 1)[0], h['h'])]]   # solo la versión vigente

def norm(u): return urllib.parse.unquote(u or '').rstrip('/').lower().replace('http://', 'https://')

MESES = {'ene':1,'feb':2,'mar':3,'abr':4,'may':5,'jun':6,'jul':7,'ago':8,'sep':9,'oct':10,'nov':11,'dic':12}
def produccion():
    """Lee el registro de corridas de la tarea programada (líneas «- Corrida …» del estado del pedido)."""
    f = REPO / 'taller' / 'pedidos' / 'ESTADO-pedido-20-nov.md'
    if not f.is_file(): return None
    R = []
    for l in f.read_text(encoding='utf-8').splitlines():
        if not l.startswith('- Corrida '): continue
        m = re.match(r'- Corrida (\d{1,2})-(\w{3})-(\d{4})', l)
        if not m or m.group(2) not in MESES: continue
        dia = datetime.datetime(int(m.group(3)), MESES[m.group(2)], int(m.group(1)))
        t = re.search(r'(\d{1,2}):(\d{2})[–-](\d{1,2}):(\d{2}) UTC', l); h = re.search(r'hasta las (\d{1,2}):(\d{2}) UTC', l)
        ini = fin = None
        if t:
            ini = dia + datetime.timedelta(hours=int(t.group(1)), minutes=int(t.group(2))); fin = dia + datetime.timedelta(hours=int(t.group(3)), minutes=int(t.group(4)))
            if fin < ini: fin += datetime.timedelta(days=1)
        elif h: fin = dia + datetime.timedelta(hours=int(h.group(1)), minutes=int(h.group(2)))
        k = re.search(r'(\d+) hojas nuevas', l) or re.search(r'\. (\d+) hojas[;.]', l)
        nuevas = int(k.group(1)) if k else 0
        corr = l.split('0 hojas nuevas')[0].count('«') if nuevas == 0 else 0
        R.append({'ini': ini, 'fin': fin, 'nuevas': nuevas, 'corr': corr})
    if not R: return None
    N = [r for r in R if r['nuevas']]; C = [r for r in R if r['corr']]
    mins = lambda r: (r['fin'] - r['ini']).total_seconds() / 60
    Nd = [r for r in N if r['ini']]; Cd = [r for r in C if r['ini']]
    fines = sorted(r['fin'] for r in R if r['fin']); inis = sorted(r['ini'] for r in R if r['ini'])
    cl = lambda d: (d - datetime.timedelta(hours=3)).strftime('%d-%m %H:%M')
    # ritmo actual: separación entre los finales de las últimas corridas
    ult = fines[-4:]; sep = [(b - a).total_seconds() / 3600 for a, b in zip(ult, ult[1:])]
    return {
        'corridas': len(N), 'hojas': sum(r['nuevas'] for r in N),
        'min_corrida': (sum(map(mins, Nd)) / len(Nd)) if Nd else 0, 'min_min': min(map(mins, Nd)) if Nd else 0, 'min_max': max(map(mins, Nd)) if Nd else 0,
        'min_hoja': (sum(map(mins, Nd)) / sum(r['nuevas'] for r in Nd)) if Nd else 0,
        'corr_corridas': len(C), 'corr_hojas': sum(r['corr'] for r in C), 'min_corr': (sum(map(mins, Cd)) / sum(r['corr'] for r in Cd)) if Cd else 0,
        'horas_reloj': ((fines[-1] - inis[0]).total_seconds() / 3600) if fines and inis else 0,
        'desde': cl(inis[0]) if inis else '—', 'hasta': cl(fines[-1]) if fines else '—',
        'sep_h': (sum(sep) / len(sep)) if sep else 0, 'hojas_corrida': (sum(r['nuevas'] for r in N) / len(N)) if N else 0,
    }

def main():
    hojas = leer_hojas()
    en = json.loads((AQUI / 'enlaces.json').read_text(encoding='utf-8')) if (AQUI / 'enlaces.json').is_file() else {'hojas': [], 'actualizado': '—'}
    enl = {h['archivo']: h for h in en['hojas']}
    plan = json.loads((AQUI / 'plan.json').read_text(encoding='utf-8')) if (AQUI / 'plan.json').is_file() else {'en_curso': [], 'proximo': []}
    arbol = json.loads((AQUI / 'arbol-sitio.json').read_text(encoding='utf-8')) if (AQUI / 'arbol-sitio.json').is_file() else None
    # redirecciones: una dirección antigua que lleva a la hoja vigente cuenta como enlace de esa hoja
    redir = collections.defaultdict(list)
    for arch, d in enl.items():
        f = REPO / arch
        if f.is_file() and f.stat().st_size < 2000:
            m = re.search(r'http-equiv=["\']refresh["\'][^>]*url=([^"\'>]+)', f.read_text(encoding='utf-8', errors='replace'))
            if m: redir[(f.parent / m.group(1)).resolve().relative_to(REPO).as_posix()] += d.get('titulos', [])
    man = plan.get('apr_manual', {})
    for h in hojas:
        h['tit'] = enl.get(h['archivo'], {}).get('titulos', []) + redir.get(h['archivo'], [])
        if not h['apr']:
            for pref, f in man.items():
                if h['archivo'].startswith(pref): d, m_, y = f.split('-'); h['apr'] = datetime.date(int(y), int(m_), int(d))
    n = len(hojas); con_apr = sum(1 for h in hojas if h['apr']); enlaz = sum(1 for h in hojas if h['tit']); sin = [h for h in hojas if not h['tit']]
    # cobertura del sitio
    por_pag = collections.defaultdict(set)
    for h in en['hojas']:
        for t in h.get('titulos', []): por_pag[norm(t.get('url_pagina'))].add(t.get('titulo'))
    cob = []; tot_tit = 0
    if arbol:
        for p in arbol['paginas']:
            tt = sum(len(c['titulos']) for m in p.get('menu', []) for c in m['cajas']) + sum(len(c['titulos']) for c in p.get('cajasSinEntradaDeMenu', []) if isinstance(c, dict) and 'titulos' in c)
            tot_tit += tt; k = len(por_pag.get(norm(p.get('url')), ()))
            if tt: cob.append((p['titulo'].strip(), k, tt, p.get('url', '')))
    tit_con = sum(len(v) for v in por_pag.values())
    # por día
    dias = collections.Counter(h['apr'] for h in hojas if h['apr']); dmax = max(dias.values()) if dias else 1
    # por tema
    temas = collections.OrderedDict()
    for h in sorted(hojas, key=lambda x: (x['lote'], x['archivo'])):
        t = temas.setdefault(h['tema'], {'n': 0, 'e': 0, 'lotes': set(), 'ult': None}); t['n'] += 1; t['e'] += bool(h['tit']); t['lotes'].add(h['lote'])
        if h['apr'] and (t['ult'] is None or h['apr'] > t['ult']): t['ult'] = h['apr']
    fch = lambda d: d.strftime('%d-%m-%Y') if d else '—'
    ult = sorted([h for h in hojas if h['apr']], key=lambda x: (x['apr'], x['lote'], x['archivo']), reverse=True)[:7]
    ahora = (datetime.datetime.now(datetime.timezone.utc) - datetime.timedelta(hours=3)).strftime('%d-%m-%Y %H:%M')
    pct = lambda a, b: (100 * a / b) if b else 0
    def tile(v, lab, sub=''): return f'<div class="tile"><div class="v">{e(v)}</div><div class="l">{e(lab)}</div>' + (f'<div class="s">{e(sub)}</div>' if sub else '') + '</div>'
    def item(t, d='', url=''): return '<li><b>' + (f'<a href="{e(url)}" target="_blank" rel="noopener">{e(t)}</a>' if url else e(t)) + '</b>' + (f'<span>{e(d)}</span>' if d else '') + '</li>'
    def meter(a, b): return f'<div class="meter" role="img" aria-label="{a} de {b}"><i style="width:{pct(a, b):.1f}%"></i></div>'
    col1 = ''.join(item(h['nombre'], f"Lote {h['lote']:02d} · {h['tema']} · APR {fch(h['apr'])}", BASE + h['archivo']) for h in ult)
    col2 = ''.join(item(x['t'], x.get('d', '')) for x in plan.get('en_curso', []))
    col2 += ''.join(item('Sin enlazar: ' + h['nombre'], f"Lote {h['lote']:02d} · {h['tema']}", BASE + h['archivo']) for h in sin)
    col3 = ''.join(item(x['t'], x.get('d', '')) for x in plan.get('proximo', []))
    barras = ''.join(f'<div class="bar" tabindex="0" data-tip="{fch(d)}: {c} hoja{"s" if c != 1 else ""} aprobada{"s" if c != 1 else ""}"><b>{c}</b><i style="height:{max(4, 150 * c / dmax):.0f}px"></i><span>{d.day:02d}-{d.month:02d}</span></div>' for d, c in sorted(dias.items()))
    filas_t = ''.join(f"<tr><td>{e(k)}</td><td class='num'>{', '.join(f'{x:02d}' for x in sorted(v['lotes']))}</td><td class='num'>{v['n']}</td><td class='num'>{v['e']}</td><td>{meter(v['e'], v['n'])}</td><td class='num'>{fch(v['ult'])}</td></tr>" for k, v in temas.items())
    cob_top = sorted([c for c in cob if c[1]], key=lambda c: (-c[1], c[0]))
    filas_c = ''.join(f"<tr><td><a href='{e(u)}' target='_blank' rel='noopener'>{e(t)}</a></td><td class='num'>{k}</td><td class='num'>{tt}</td><td>{meter(k, tt)}</td><td class='num'>{pct(k, tt):.1f} %</td></tr>" for t, k, tt, u in cob_top)
    filas_h = ''.join(f"<tr><td class='num'>{h['lote']:02d}</td><td><a href='{BASE}{e(h['archivo'])}' target='_blank' rel='noopener'>{e(h['nombre'])}</a></td><td>{e(h['tema'])}</td><td class='num'>{fch(h['apr'])}</td><td>{'✓ ' + str(len(h['tit'])) + (' título' if len(h['tit']) == 1 else ' títulos') if h['tit'] else '✗ sin enlazar'}</td></tr>" for h in sorted(hojas, key=lambda x: (x['lote'], x['archivo'])))
    sin_pag = len([c for c in cob if not c[1]])
    # producción programada
    pr = produccion(); prod = ''
    if pr and pr['hojas']:
        nm = lambda x, d=1: f'{x:.{d}f}'.replace('.', ',')
        tph = (tit_con / enlaz) if enlaz else 0
        ocup_h = 60 / pr['min_hoja'] if pr['min_hoja'] else 0
        cada = plan.get('corridas_cada_horas') or pr['sep_h']; cor_dia = 24 / cada if cada else 0; hoj_dia = cor_dia * pr['hojas_corrida']
        techo = plan.get('techo_hojas_semana', 150); pend = n - con_apr
        falta = tot_tit - tit_con; dias_sitio = falta / (hoj_dia * tph) if hoj_dia and tph else 0
        fp = lambda a, b: f"<tr><td>{e(a)}</td><td class='num'><b>{e(b)}</b></td></tr>"
        prod = '<h2>Producción programada</h2>\n<div class="tiles">' + tile(pr['hojas'], 'Hojas nuevas por tarea programada', f"{pr['corridas']} corridas · {pr['desde']} a {pr['hasta']}") + tile(nm(pr['min_hoja'], 0) + ' min', 'Tiempo ocupado por hoja', f"corrida de {nm(pr['hojas_corrida'], 0)} hojas: {nm(pr['min_corrida'], 0)} min (de {nm(pr['min_min'], 0)} a {nm(pr['min_max'], 0)})") + tile(nm(hoj_dia, 0), 'Hojas por día al ritmo actual', f"una corrida cada {nm(cada, 0) if cada == int(cada) else nm(cada)} h, {nm(pr['hojas_corrida'], 0)} hojas por corrida") + tile(nm(hoj_dia * tph, 0), 'Títulos por día (estimado)', f"{nm(tph, 2)} títulos por hoja enlazada, histórico") + tile(pend, 'Hojas esperando APR', 'la revisión de Óscar marca el ritmo real') + '</div>\n'
        prod += '<div class="scroll"><table><thead><tr><th>Indicador</th><th>Valor</th></tr></thead><tbody>' + fp('Hojas por hora de trabajo del modelo (tiempo ocupado)', nm(ocup_h)) + fp('Títulos por hora de trabajo del modelo (estimado)', nm(ocup_h * tph)) + fp('Hojas por hora de reloj al ritmo actual (tiempo continuo)', nm(hoj_dia / 24, 2)) + fp('Títulos por hora de reloj al ritmo actual (estimado)', nm(hoj_dia * tph / 24, 2)) + fp('Hojas por semana al ritmo actual', nm(hoj_dia * 7, 0)) + fp('Techo semanal por cuota del plan (medido: cerca de 1 % semanal por 3 hojas)', f'{techo} hojas') + fp('Correcciones tras rechazo: hojas corregidas · minutos por hoja', f"{pr['corr_hojas']} · {nm(pr['min_corr'])}") + fp('Horas de reloj desde la primera corrida registrada', nm(pr['horas_reloj'])) + fp('Días para cubrir los ' + f'{falta:,}'.replace(',', '.') + ' títulos que faltan, a este ritmo (estimado)', nm(dias_sitio, 0)) + '</tbody></table></div>\n<p class="sub">Tiempo ocupado: lo que el modelo trabaja. Tiempo continuo: lo que pasa en el reloj, con las esperas entre corridas. Los títulos son una estimación: se confirman cuando la hoja se enlaza después del APR. Fuente: registro de corridas en <code>taller/pedidos/ESTADO-pedido-20-nov.md</code>.</p>\n'
    doc = f'''<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Tablero · Oscar Academy</title>
<style>
:root{{--brand:#8a1f2d;--soft:#f3e3e5;--verde:#2e6b3e;--azul:#1f5f8a;--ocre:#a85f00;--ink:#241a1c;--muted:#6d5f62;--bg:#ffffff;--card:#f7f3f4;--line:#e4d9db}}
@media (prefers-color-scheme:dark){{:root{{--brand:#e58a96;--soft:#3a2327;--verde:#8fd3a0;--azul:#7cc0ea;--ocre:#f0b45a;--ink:#f3ecee;--muted:#b9aaae;--bg:#171214;--card:#211a1c;--line:#3a2f32}}}}
*{{box-sizing:border-box}} body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 system-ui,-apple-system,"Segoe UI",Arial,sans-serif}}
main{{max-width:1180px;margin:0 auto;padding:22px 18px 60px}} h1{{color:var(--brand);font-size:1.7rem;margin:0}} .sub{{color:var(--muted);margin:2px 0 18px;font-size:.92rem}}
h2{{font-size:1.1rem;margin:30px 0 10px}} a{{color:var(--brand)}} a:focus-visible,.bar:focus-visible{{outline:3px solid var(--azul);outline-offset:2px}}
.tiles{{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px}}
.tile{{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px 16px}} .tile .v{{font-size:2rem;font-weight:700;line-height:1.1;font-variant-numeric:tabular-nums}} .tile .l{{font-weight:600;font-size:.92rem}} .tile .s{{color:var(--muted);font-size:.8rem}}
.cols{{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin-top:18px}}
.col{{border-radius:12px;padding:14px 16px;border-left:6px solid var(--k);background:color-mix(in srgb,var(--k) 8%,transparent)}} .col h2{{margin:0 0 8px;font-size:1.05rem}} .col .tag{{color:var(--muted);font-weight:400;font-size:.85rem}}
.col ul{{list-style:none;margin:0;padding:0}} .col li{{padding:7px 0;border-top:1px solid var(--line)}} .col li:first-child{{border-top:0}} .col li span{{display:block;color:var(--muted);font-size:.84rem}}
.c1{{--k:var(--verde)}} .c2{{--k:var(--ocre)}} .c3{{--k:var(--azul)}}
.chart{{display:flex;align-items:flex-end;gap:10px;height:215px;padding:10px 12px 0;border-bottom:1px solid var(--line);position:relative}}
.bar{{display:flex;flex-direction:column;align-items:center;justify-content:flex-end;width:44px;position:relative}} .bar i{{display:block;width:22px;background:var(--brand);border-radius:4px 4px 0 0}} .bar b{{font-size:.8rem;font-variant-numeric:tabular-nums}} .bar span{{font-size:.72rem;color:var(--muted);margin-top:4px;position:absolute;bottom:-22px}}
.bar:hover i,.bar:focus i{{opacity:.75}} .bar:hover::after,.bar:focus::after{{content:attr(data-tip);position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:var(--ink);color:var(--bg);font-size:.78rem;padding:4px 8px;border-radius:6px;white-space:nowrap;z-index:2}}
.chartwrap{{padding-bottom:28px;overflow-x:auto}}
table{{border-collapse:collapse;width:100%;font-size:.9rem}} th,td{{text-align:left;padding:7px 9px;border-bottom:1px solid var(--line);vertical-align:middle}} th{{color:var(--muted);font-weight:600;font-size:.8rem}} .num{{font-variant-numeric:tabular-nums;white-space:nowrap}}
.meter{{height:8px;background:var(--line);border-radius:4px;min-width:90px;overflow:hidden}} .meter i{{display:block;height:100%;background:var(--brand);border-radius:4px}}
details{{margin-top:8px}} summary{{cursor:pointer;font-weight:600;padding:6px 0}} .scroll{{overflow-x:auto}} .pie{{color:var(--muted);font-size:.82rem;margin-top:26px}}
</style></head><body><main>
<h1>Tablero de Oscar Academy</h1>
<p class="sub"><a href="selector.html"><b>Elegir qué producir →</b></a></p>
<p class="sub">De dónde vengo · dónde estoy · adónde voy. Actualizado el {ahora} (hora de Chile). Enlaces del sitio leídos el {e(en.get('actualizado', '—'))}.</p>
<div class="tiles">
{tile(n, 'Hojas publicadas', 'versión vigente de cada una')}
{tile(con_apr, 'Con APR de Óscar', f'{pct(con_apr, n):.0f} % de las publicadas')}
{tile(enlaz, 'Enlazadas en el sitio', 'al menos un título las abre')}
{tile(len(sin), 'Sin enlazar', 'publicadas, pero ningún título las abre')}
{tile(f'{tit_con} de {tot_tit:,}'.replace(',', '.'), 'Títulos del sitio con hoja', f'{pct(tit_con, tot_tit):.1f} % del sitio · árbol del 13-nov') if arbol else ''}
</div>
<div class="cols">
<section class="col c1"><h2>✓ De dónde vengo <span class="tag">· últimas aprobadas</span></h2><ul>{col1}</ul></section>
<section class="col c2"><h2>◐ Dónde estoy <span class="tag">· en curso y pendiente</span></h2><ul>{col2}</ul></section>
<section class="col c3"><h2>→ Adónde voy <span class="tag">· lo que sigue</span></h2><ul>{col3}</ul></section>
</div>
{prod}<h2>Hojas aprobadas por día</h2>
<div class="chartwrap"><div class="chart" role="img" aria-label="Hojas aprobadas por día; el detalle está en la tabla de todas las hojas">{barras}</div></div>
<h2>Avance por tema</h2>
<div class="scroll"><table><thead><tr><th>Tema</th><th>Lotes</th><th>Hojas</th><th>Enlazadas</th><th>Enlazadas / publicadas</th><th>Última APR</th></tr></thead><tbody>{filas_t}</tbody></table></div>
<h2>Páginas del sitio con hojas enlazadas</h2>
<div class="scroll"><table><thead><tr><th>Página</th><th>Títulos con hoja</th><th>Títulos en la página</th><th>Avance</th><th>%</th></tr></thead><tbody>{filas_c}</tbody></table></div>
<p class="sub">{sin_pag} páginas con títulos todavía no tienen ninguna hoja enlazada. Los totales por página vienen de la copia del árbol del 13-nov; un mismo título puede repetirse en varias páginas.</p>
<details><summary>Todas las hojas ({n})</summary><div class="scroll"><table><thead><tr><th>Lote</th><th>Hoja</th><th>Tema</th><th>APR</th><th>En el sitio</th></tr></thead><tbody>{filas_h}</tbody></table></div></details>
<p class="pie">Se arma solo con <code>sitio/tablero.py</code> a partir del repositorio, de la <a href="enlaces.html">vista de enlaces</a>, del <a href="index.html">árbol del sitio</a> y de <code>sitio/plan.json</code> (lo anotado a mano: «en curso» y «lo que sigue»).</p>
</main></body></html>'''
    (AQUI / 'tablero.html').write_text(doc, encoding='utf-8')
    # copia para guardar en el computador: enlaces completos y aviso de dónde está la versión al día
    W = BASE + 'sitio/'
    local = doc.replace('href="enlaces.html"', f'href="{W}enlaces.html"').replace('href="selector.html"', f'href="{W}selector.html"').replace('href="index.html"', f'href="{W}index.html"')
    local = local.replace('<p class="sub">De dónde vengo', f'<p class="sub"><b>Copia guardada el {ahora}.</b> La versión al día está en <a href="{W}tablero.html">{W}tablero.html</a>.</p>\n<p class="sub">De dónde vengo', 1)
    (AQUI / 'Tablero_OA_copia_local.html').write_text(local, encoding='utf-8')
    print(f'tablero: {n} hojas, {con_apr} con APR, {enlaz} enlazadas, {len(sin)} sin enlazar, {tit_con}/{tot_tit} títulos')

if __name__ == '__main__': main()
