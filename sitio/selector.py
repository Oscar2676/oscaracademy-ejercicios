#!/usr/bin/env python3
"""Selector de producción de Oscar Academy: elegir con un clic qué títulos del sitio se van a producir.

Lee sitio/arbol-sitio.json (estructura Sitio > Página > Menú > Caja > Título), sitio/datos-wix.json (identificadores)
y sitio/enlaces.json (qué títulos ya abren una hoja, leído del sitio en vivo). Escribe sitio/selector.html.
GitHub lo ejecuta junto con enlaces.py y tablero.py.
"""
import re, json, html, pathlib, datetime, collections, unicodedata, urllib.parse
AQUI = pathlib.Path(__file__).resolve().parent
BASE = 'oscar2676.github.io/oscaracademy-ejercicios/'

def norm(s):
    s = unicodedata.normalize('NFD', (s or '').lower()); s = ''.join(c for c in s if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^a-z0-9]+', ' ', s).strip()
def nurl(u): return urllib.parse.unquote(u or '').rstrip('/').lower()
def limpio(s): return re.sub(r'\s+', ' ', html.unescape(s or '')).strip()

def main():
    arbol = json.loads((AQUI / 'arbol-sitio.json').read_text(encoding='utf-8'))
    datos = json.loads((AQUI / 'datos-wix.json').read_text(encoding='utf-8'))
    en = json.loads((AQUI / 'enlaces.json').read_text(encoding='utf-8')) if (AQUI / 'enlaces.json').is_file() else {'hojas': [], 'actualizado': '—'}
    # identificadores de cada título: mismo orden que usa armar.py (por y, x; el primero es el título de la caja)
    ids = {}
    for p in datos['paginas']:
        by = collections.defaultdict(list)
        for t in p['textos']: by[t['c']].append(t)
        for c, ts in by.items():
            ts = sorted(ts, key=lambda t: (t['y'], t['x'])); ids[(p['id'], c)] = [t['id'] for t in ts[1:]]
    vivo = {}; porclave = {}
    for h in en['hojas']:
        rel = re.split(BASE, h['url'], flags=re.I)[-1]
        for t in h.get('titulos', []):
            vivo[(nurl(t.get('url_pagina')), norm(t.get('titulo')))] = rel; porclave.setdefault(norm(t.get('titulo')), rel)
    P = []; tot = collections.Counter()
    for p in arbol['paginas']:
        menu = []
        grupos = [(m['nombre'], m['cajas']) for m in p.get('menu', [])] + ([('(sin entrada de menú)', p['cajasSinEntradaDeMenu'])] if p.get('cajasSinEntradaDeMenu') else [])
        for nombre, cajas in grupos:
            cs = []
            for c in cajas:
                kid = ids.get((p['id'], c['id']), []); ks = []
                for j, t in enumerate(c['titulos']):
                    txt = limpio(t['texto']); k = norm(txt)
                    if not k: continue
                    ext = next((e['url'] for e in t.get('enlaces', []) if e.get('tipo') == 'externo' and BASE in (e.get('url') or '').lower()), None)
                    rel = vivo.get((nurl(p['url']), k)) or (re.split(BASE, ext, flags=re.I)[-1] if ext else None)
                    inter = next((e for e in t.get('enlaces', []) if e.get('tipo') in ('página', 'ancla')), None)
                    otro = next((e for e in t.get('enlaces', []) if e.get('tipo') in ('externo', 'documento')), None)
                    if rel: st, x = 1, rel
                    elif inter: st, x = 2, (inter.get('pagina') or '')
                    elif otro: st, x = 4, (otro.get('url') or otro.get('doc') or '')[:120]
                    elif k in porclave: st, x = 3, porclave[k]
                    else: st, x = 0, ''
                    tot[st] += 1; ks.append([kid[j] if j < len(kid) else '', txt, st, x])
                if ks: cs.append({'i': c['id'], 't': limpio(c['titulo']), 'k': ks})
            if cs: menu.append({'n': limpio(nombre), 'c': cs})
        if menu: P.append({'i': p['id'], 't': limpio(p['titulo']), 'u': p['url'], 'v': 1 if p.get('enMenuDelSitio') else 0, 'm': menu})
    P.sort(key=lambda p: norm(p['t']))
    ahora = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-3))).strftime('%d-%m-%Y %H:%M')
    data = json.dumps({'P': P, 'hecho': ahora, 'arbol': arbol.get('generado', '')[:10], 'enlaces': en.get('actualizado', '—')}, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')
    doc = PAGINA.replace('__DATA__', data)
    (AQUI / 'selector.html').write_text(doc, encoding='utf-8')
    (AQUI / 'Selector_OA_copia_local.html').write_text(doc.replace('href="tablero.html"', 'href="https://' + BASE + 'sitio/tablero.html"'), encoding='utf-8')
    print('selector: %d páginas · pendientes %d · con hoja %d · índice %d · hoja en otro lugar %d · otro enlace %d' % (len(P), tot[0], tot[1], tot[2], tot[3], tot[4]))

PAGINA = r'''<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Selector de producción · Oscar Academy</title>
<style>
:root{--brand:#8a1f2d;--soft:#f3e3e5;--verde:#2e6b3e;--azul:#1f5f8a;--ocre:#a85f00;--ink:#241a1c;--muted:#6d5f62;--bg:#ffffff;--card:#f7f3f4;--line:#e4d9db}
@media (prefers-color-scheme:dark){:root{--brand:#e58a96;--soft:#3a2327;--verde:#8fd3a0;--azul:#7cc0ea;--ocre:#f0b45a;--ink:#f3ecee;--muted:#b9aaae;--bg:#171214;--card:#211a1c;--line:#3a2f32}}
*{box-sizing:border-box} html,body{height:100%} body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.45 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;display:flex;flex-direction:column}
header{padding:12px 16px 8px;border-bottom:1px solid var(--line)} h1{color:var(--brand);font-size:1.3rem;margin:0} .sub{color:var(--muted);font-size:.82rem;margin:2px 0 0}
a{color:var(--brand)} button,input,select{font:inherit} :focus-visible{outline:3px solid var(--azul);outline-offset:2px}
.wrap{flex:1;display:grid;grid-template-columns:290px 1fr;min-height:0}
aside{border-right:1px solid var(--line);display:flex;flex-direction:column;min-height:0} aside input{margin:10px;padding:7px 10px;border:1.5px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)}
#pags{overflow:auto;flex:1;list-style:none;margin:0;padding:0 6px 10px} #pags button{display:flex;justify-content:space-between;gap:8px;width:100%;text-align:left;background:none;border:0;border-radius:8px;padding:6px 9px;color:var(--ink);cursor:pointer}
#pags button:hover{background:var(--card)} #pags button[aria-current=true]{background:var(--soft);font-weight:600} #pags .n{color:var(--muted);font-size:.78rem;white-space:nowrap;font-variant-numeric:tabular-nums}
main{overflow:auto;padding:12px 18px 110px;min-height:0} main h2{margin:4px 0 2px;font-size:1.2rem} .tools{display:flex;gap:14px;flex-wrap:wrap;align-items:center;margin:8px 0 12px;font-size:.88rem}
.leyenda{display:flex;gap:12px;flex-wrap:wrap;color:var(--muted);font-size:.8rem;margin:0 0 10px} .ent{margin:16px 0 6px;font-size:.78rem;letter-spacing:.04em;text-transform:uppercase;color:var(--muted);font-weight:700}
.caja{border:1px solid var(--line);border-left:5px solid var(--brand);border-radius:10px;background:var(--card);padding:9px 12px;margin:8px 0} .caja h3{margin:0 0 4px;font-size:.98rem;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.caja h3 .c{color:var(--muted);font-weight:400;font-size:.8rem} .caja h3 button{margin-left:auto;border:1.5px solid var(--brand);background:var(--bg);color:var(--brand);border-radius:999px;padding:2px 11px;font-size:.8rem;cursor:pointer}
.tit{display:flex;gap:8px;align-items:flex-start;padding:3px 0} .tit input{margin-top:3px;width:16px;height:16px;accent-color:var(--brand)} .tit label{flex:1;cursor:pointer}
.tit .e{font-size:.78rem;color:var(--muted);white-space:nowrap} .s1 .e{color:var(--verde)} .s3 .e{color:var(--ocre)} .s2 label,.s4 label,.s1 label{cursor:default} .s2,.s4{color:var(--muted)} .ico{width:16px;text-align:center;margin-top:1px}
.lug{font-size:.74rem;color:var(--azul);margin-left:6px;white-space:nowrap} .linkb{background:none;border:0;padding:0;color:var(--brand);text-decoration:underline;cursor:pointer;font-size:.78rem}
.barra{position:fixed;left:0;right:0;bottom:0;background:var(--bg);border-top:1.5px solid var(--line);padding:10px 16px;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.barra .est{flex:1 1 240px;font-weight:600} .pri{background:var(--brand);color:var(--bg);border:0;border-radius:999px;padding:8px 18px;font-weight:700;cursor:pointer} .sec{background:var(--bg);color:var(--brand);border:1.5px solid var(--brand);border-radius:999px;padding:7px 16px;cursor:pointer}
dialog{border:1px solid var(--line);border-radius:12px;max-width:760px;width:92vw;background:var(--bg);color:var(--ink)} dialog textarea{width:100%;height:46vh;font:13px/1.45 ui-monospace,Menlo,Consolas,monospace;border:1px solid var(--line);border-radius:8px;padding:8px;background:var(--card);color:var(--ink)}
.vacio{color:var(--muted);padding:20px 0}
@media (max-width:760px){.wrap{grid-template-columns:1fr}aside{max-height:32vh;border-right:0;border-bottom:1px solid var(--line)}}
</style></head><body>
<header><h1>Selector de producción · Oscar Academy</h1>
<p class="sub">Marca lo que quieres producir y pulsa «Copiar pedido». <span id="meta"></span> · <a href="tablero.html">Tablero</a></p></header>
<div class="wrap">
<aside><input id="bp" type="search" placeholder="Buscar página…" aria-label="Buscar página"><ul id="pags"></ul></aside>
<main id="main"></main>
</div>
<div class="barra"><span class="est" id="est" role="status">Nada marcado.</span><button class="sec" id="limpiar">Limpiar</button><button class="sec" id="ver">Ver pedido</button><button class="pri" id="copiar">Copiar pedido</button></div>
<dialog id="dlg"><h2 style="margin:0 0 8px;font-size:1.1rem">Pedido de producción</h2><textarea id="txt" readonly aria-label="Texto del pedido"></textarea><p style="display:flex;gap:10px;justify-content:flex-end;margin:10px 0 0"><button class="sec" id="cerrar">Cerrar</button><button class="pri" id="copiar2">Copiar</button></p></dialog>
<script id="datos" type="application/json">__DATA__</script>
<script>
(function(){
var D = JSON.parse(document.getElementById('datos').textContent), P = D.P, $ = function(id){ return document.getElementById(id); };
function norm(s){ return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim(); }
function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
var BASE = 'https://oscar2676.github.io/oscaracademy-ejercicios/';
// índice por clave: todos los lugares donde aparece un mismo título
var L = {}, porPag = {};
P.forEach(function(p, pi){ porPag[norm(p.t)] = pi; p.pend = 0; p.tot = 0;
  p.m.forEach(function(m){ m.c.forEach(function(c){ c.k.forEach(function(k){ var key = norm(k[1]); k.push(key); p.tot++; if (k[2] === 0 || k[2] === 3) p.pend++;
    (L[key] = L[key] || []).push({p:p, m:m, c:c, k:k}); }); }); }); });
var sel = {}; try { JSON.parse(localStorage.getItem('oa-selector') || '[]').forEach(function(k){ if (L[k]) sel[k] = 1; }); } catch (e) {}
function guardar(){ try { localStorage.setItem('oa-selector', JSON.stringify(Object.keys(sel))); } catch (e) {} }
var actual = 0, soloPend = false, q = '';
try { var h = decodeURIComponent(location.hash.slice(1)); if (h && porPag[norm(h)] != null) actual = porPag[norm(h)]; } catch (e) {}
function elegible(k){ return k[2] === 0 || k[2] === 3; }
function pintarPags(){ var f = norm($('bp').value);
  $('pags').innerHTML = P.map(function(p, i){ if (f && norm(p.t).indexOf(f) < 0) return ''; return '<li><button data-p="' + i + '"' + (i === actual ? ' aria-current="true"' : '') + '><span>' + esc(p.t) + (p.v ? '' : ' ·') + '</span><span class="n">' + p.pend + ' pend.</span></button></li>'; }).join(''); }
function fila(k){ var st = k[2], key = k[4], n = L[key].length, id = 't' + (fila.n = (fila.n || 0) + 1), lug = n > 1 ? '<span class="lug" title="Este título aparece en ' + n + ' lugares del sitio">×' + n + ' lugares</span>' : '';
  if (st === 1) return '<div class="tit s1"><span class="ico" aria-hidden="true">✓</span><label>' + esc(k[1]) + lug + '</label><span class="e"><a href="' + BASE + esc(k[3]) + '" target="_blank" rel="noopener">hoja publicada</a></span></div>';
  if (st === 2) return '<div class="tit s2"><span class="ico" aria-hidden="true">↪</span><label>' + esc(k[1]) + '</label><span class="e">índice → ' + (porPag[norm(k[3])] != null ? '<button class="linkb" data-ir="' + porPag[norm(k[3])] + '">' + esc(k[3]) + '</button>' : esc(k[3])) + '</span></div>';
  if (st === 4) return '<div class="tit s4"><span class="ico" aria-hidden="true">↗</span><label>' + esc(k[1]) + '</label><span class="e">otro enlace</span></div>';
  return '<div class="tit s' + st + '"><input type="checkbox" id="' + id + '" data-k="' + esc(key) + '"' + (sel[key] ? ' checked' : '') + '><label for="' + id + '">' + esc(k[1]) + lug + '</label><span class="e">' + (st === 3 ? 'ya existe la hoja: falta enlazar' : 'pendiente') + '</span></div>'; }
function pintar(){ var p = P[actual], out = '<h2>' + esc(p.t) + '</h2><p class="sub"><a href="' + esc(p.u) + '" target="_blank" rel="noopener">ver en el sitio</a> · ' + p.pend + ' pendientes de ' + p.tot + ' títulos' + (p.v ? '' : ' · no aparece en el menú del sitio') + '</p>';
  out += '<div class="tools"><label><input type="checkbox" id="sp"' + (soloPend ? ' checked' : '') + '> Solo pendientes</label><label>Buscar título <input id="bt" type="search" value="' + esc(q) + '" style="padding:4px 8px;border:1.5px solid var(--line);border-radius:8px;background:var(--bg);color:var(--ink)"></label></div>';
  out += '<p class="leyenda"><span>☐ pendiente</span><span>✓ ya tiene hoja</span><span>↪ índice: lleva a otra página</span><span>×N: el mismo título en N lugares; se marca una vez y vale para todos</span></p>';
  var nq = norm(q), alguno = false;
  p.m.forEach(function(m){ var cajas = '';
    m.c.forEach(function(c){ var ks = c.k.filter(function(k){ return (!soloPend || elegible(k)) && (!nq || k[4].indexOf(nq) >= 0); }); if (!ks.length) return;
      var pe = c.k.filter(elegible).length;
      cajas += '<div class="caja"><h3><span>' + esc(c.t) + '</span><span class="c">' + pe + ' pendientes de ' + c.k.length + '</span>' + (pe ? '<button data-caja="' + esc(c.i) + '">Marcar caja</button>' : '') + '</h3>' + ks.map(fila).join('') + '</div>'; });
    if (cajas){ alguno = true; out += '<div class="ent">' + esc(m.n || 'Sin nombre') + '</div>' + cajas; } });
  if (!alguno) out += '<p class="vacio">No hay títulos que mostrar con este filtro.</p>';
  $('main').innerHTML = out; $('main').scrollTop = 0; }
function estado(){ var keys = Object.keys(sel), prod = 0, enl = 0, lug = 0; keys.forEach(function(k){ var a = L[k].filter(function(x){ return elegible(x.k); }); lug += a.length; if (L[k].some(function(x){ return x.k[2] === 3; })) enl++; else prod++; });
  $('est').textContent = keys.length ? prod + ' hoja' + (prod === 1 ? '' : 's') + ' por producir' + (enl ? ' · ' + enl + ' solo por enlazar' : '') + ' · ' + lug + ' lugares del sitio' : 'Nada marcado.'; }
function pedido(){ var keys = Object.keys(sel).sort(), prod = [], enl = [];
  keys.forEach(function(k){ var a = L[k].filter(function(x){ return elegible(x.k); }); if (!a.length) return; (a.some(function(x){ return x.k[2] === 3; }) ? enl : prod).push({k:k, a:a}); });
  var hoy = new Date(), f = ('0' + hoy.getDate()).slice(-2) + '-' + ('0' + (hoy.getMonth() + 1)).slice(-2) + '-' + hoy.getFullYear();
  var t = 'PEDIDO DE PRODUCCIÓN · Oscar Academy · ' + f + '\n' + prod.length + ' hojas por producir · ' + enl.length + ' solo por enlazar · ' + prod.concat(enl).reduce(function(s, x){ return s + x.a.length; }, 0) + ' lugares\n';
  function bloque(tit, arr){ if (!arr.length) return; t += '\n' + tit + '\n'; arr.forEach(function(x, i){ t += (i + 1) + '. «' + x.a[0].k[1] + '»' + (x.a[0].k[2] === 3 ? '  → hoja: ' + x.a[0].k[3] : '') + '\n'; x.a.forEach(function(y){ t += '   - ' + y.p.t + ' › ' + y.c.t + '  [' + y.p.i + ' · ' + y.k[0] + ']\n'; }); }); }
  bloque('PRODUCIR (hoja nueva):', prod); bloque('SOLO ENLAZAR (la hoja ya existe):', enl); return t; }
function copiar(){ var t = pedido(); $('txt').value = t; function ok(){ $('est').textContent = 'Pedido copiado ✓ Pégalo en el chat de Claude.'; }
  function mano(){ $('dlg').showModal(); $('txt').select(); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(ok, mano); else mano(); }
$('pags').addEventListener('click', function(e){ var b = e.target.closest('button[data-p]'); if (!b) return; actual = +b.dataset.p; q = ''; try { history.replaceState(null, '', '#' + encodeURIComponent(P[actual].t)); } catch (er) {} pintarPags(); pintar(); });
$('bp').addEventListener('input', pintarPags);
$('main').addEventListener('change', function(e){ var t = e.target; if (t.id === 'sp'){ soloPend = t.checked; pintar(); return; }
  if (t.dataset && t.dataset.k){ if (t.checked) sel[t.dataset.k] = 1; else delete sel[t.dataset.k]; guardar(); estado(); [].forEach.call(document.querySelectorAll('input[data-k]'), function(i){ if (i.dataset.k === t.dataset.k) i.checked = t.checked; }); } });
$('main').addEventListener('input', function(e){ if (e.target.id === 'bt'){ q = e.target.value; var pos = e.target.selectionStart; pintar(); var n = $('bt'); n.focus(); try { n.setSelectionRange(pos, pos); } catch (er) {} } });
$('main').addEventListener('click', function(e){ var b = e.target.closest('button[data-caja]'), ir = e.target.closest('button[data-ir]');
  if (ir){ actual = +ir.dataset.ir; q = ''; pintarPags(); pintar(); return; }
  if (!b) return; var c = null; P[actual].m.forEach(function(m){ m.c.forEach(function(x){ if (x.i === b.dataset.caja) c = x; }); }); if (!c) return;
  var ks = c.k.filter(elegible), todas = ks.every(function(k){ return sel[k[4]]; }); ks.forEach(function(k){ if (todas) delete sel[k[4]]; else sel[k[4]] = 1; }); guardar(); estado(); pintar(); });
$('limpiar').onclick = function(){ if (!Object.keys(sel).length) return; sel = {}; guardar(); estado(); pintar(); };
$('ver').onclick = function(){ $('txt').value = pedido(); $('dlg').showModal(); }; $('cerrar').onclick = function(){ $('dlg').close(); };
$('copiar').onclick = copiar; $('copiar2').onclick = function(){ $('txt').select(); try { document.execCommand('copy'); } catch (e) {} copiar(); };
$('meta').textContent = 'Árbol del sitio del ' + D.arbol + ' · enlaces leídos el ' + D.enlaces + ' · armado el ' + D.hecho;
pintarPags(); pintar(); estado();
})();
</script></body></html>'''

if __name__ == '__main__': main()
