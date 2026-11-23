#!/usr/bin/env python3
"""Lote 29 · Límites: comprobación exacta de las cuentas de las hojas.
Aritmética con fractions; identidades en rejilla; las lecturas de las escenas con deslizador se evalúan con el
código real de la escena (node, si está instalado) en TODAS las posiciones y se revisa cada número que muestran."""
from fractions import Fraction as Fr
import itertools, json, pathlib, re, shutil, subprocess, sys
err = []; N = [0]
def ok(c, m):
    N[0] += 1
    if not c: err.append(m)
RAIZ = pathlib.Path(__file__).resolve().parents[2]
PARTES = RAIZ/'taller'/'src'/'l29'/'partes'
D = lambda s: Fr(s.replace('{,}', '.').replace(',', '.').replace('−', '-'))
def tex(q, dmax=6):
    """número exacto en TeX con coma decimal, sin ceros de relleno; falla si no es decimal exacto con dmax cifras"""
    q = Fr(q); e = q*10**dmax
    assert e.denominator == 1, 'no es decimal exacto: %s' % q
    s = '%d' % abs(e.numerator); s = s.rjust(dmax + 1, '0'); s = s[:-dmax] + '.' + s[-dmax:]; s = s.rstrip('0').rstrip('.')
    return ('-' if q < 0 else '') + s.replace('.', '{,}')
def ndec(q):
    """cantidad de decimales de un decimal exacto"""
    q = Fr(q); n = 0
    while q.denominator != 1: q *= 10; n += 1; assert n < 20
    return n

# ───────────────────────── H01 · Introducción a los límites ─────────────────────────
ART = (PARTES/'01.art.html').read_text(encoding='utf-8'); ESC = (PARTES/'01.scene.js').read_text(encoding='utf-8')
f = lambda x: (x*x - 1)/(x - 1)            # función ancla, x ≠ 1
g = lambda x: x + 1 if x < 1 else 4 - x    # función con salto (escena lim-salto)

# 1) escena «lim-idea»: registro (R2, R3) y lectura; cada cadena se arma con fracciones y debe estar tal cual en la escena
IZ = [Fr(1, 2), Fr(9, 10), Fr(99, 100)]; DE = [Fr(3, 2), Fr(11, 10), Fr(101, 100)]
for x in IZ + DE:
    q = x*x; n = q - 1; d = x - 1; v = n/d
    ok(v == x + 1 == f(x), 'H01 idea f(%s)' % x)
    cad = '\\\\tfrac{%s-1}{%s-1}=\\\\tfrac{%s}{%s}=%s' % (tex(q), tex(x), tex(n), tex(d), tex(v)) if x in (Fr(99, 100), Fr(101, 100)) else \
          'f(%s)=\\\\tfrac{%s^{2}-1}{%s-1}=\\\\tfrac{%s-1}{%s}=\\\\tfrac{%s}{%s}=%s' % (tex(x), tex(x), tex(x), tex(q), tex(d), tex(n), tex(d), tex(v))
    ok(cad in ESC, 'H01 idea lectura f(%s): falta «%s»' % (x, cad))
ok('x<1:\\\\ \\\\ ' + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x), tex(f(x))) for x in IZ) in ESC, 'H01 idea registro R2')
ok('x>1:\\\\ \\\\ ' + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x), tex(f(x))) for x in DE) in ESC, 'H01 idea registro R3')
ok(abs(f(IZ[2]) - 2) == Fr(1, 100) == abs(f(DE[2]) - 2) and '|1{,}99-2|=0{,}01' in ESC and '|2{,}01-2|=0{,}01' in ESC, 'H01 idea distancias a 2')
ok(1**2 - 1 == 0 and 1 - 1 == 0 and 1 + 1 == 2, 'H01 idea en x = 1')
ok(all(f(x) < 2 for x in IZ) and all(f(x) > 2 for x in DE) and [abs(f(x) - 2) for x in IZ] == sorted([abs(f(x) - 2) for x in IZ], reverse=True) and [abs(f(x) - 2) for x in DE] == sorted([abs(f(x) - 2) for x in DE], reverse=True), 'H01 idea: se acercan a 2 por los dos lados')
# los puntos dibujados son los mismos de la lectura
ok('var IZ = [0.5, 0.9, 0.99], DE = [1.5, 1.1, 1.01];' in ESC, 'H01 idea puntos dibujados')

# 2) escenas con deslizador: TODAS las posiciones (d = 0; 0,01; …; 1), con el código real de la escena
NODO = r"""
const fs = require('fs'), p = process.argv[process.argv.length - 1];
global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; }, num:function(v, d){ var s = v.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', '{,}'); } };
(0, eval)(['_txt.js', '_det.js', '_lim.js', '01.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
var out = {};
['lim-vivo', 'lim-salto'].forEach(function(n){ var S = OA.scenes[n], sl = S.sliders[0], i, v, r = [];
  for (i = 0; i <= Math.round((sl.max - sl.min)/sl.step); i++){ v = {d: parseFloat((sl.min + i*sl.step).toFixed(2))}; r.push([v.d, S.readout(v)[0][1], S.caption(v)]); }
  /* además, valores sin redondear como los que produce la animación */
  [0, 0.137, 0.5, 0.731, 0.9, 1].forEach(function(pp){ v = {}; S.anim.apply(pp, v); r.push([Math.round(v.d*100)/100, S.readout(v)[0][1], S.caption(v)]); });
  out[n] = {min: sl.min, max: sl.max, step: sl.step, hold: S.anim.hold, filas: r}; });
out['lim-idea'] = {hold: OA.scenes['lim-idea'].anim.hold, n: OA.scenes['lim-idea'].sliders[0].max, lect: [1, 2, 3, 4, 5, 6].map(function(k){ return OA.scenes['lim-idea'].readout({paso: k})[0][1]; })};
console.log(JSON.stringify(out));
"""
NUM = re.compile(r'(?:(?<![\w²})|])-)?\d+(?:\{,\}\d+)?')  # el signo solo cuenta si no es una resta
def lineas(t):
    ok(t.startswith('\\begin{aligned}') and t.endswith('\\end{aligned}'), 'H01 lectura: no es un bloque aligned')
    return [l for l in t[len('\\begin{aligned}'):-len('\\end{aligned}')].split('\\\\[5pt]')]
def nums(l):
    l = re.sub(r'&\\textbf\{\d+\.\}', '', l).replace('^{2}', '²')
    return [D(m) for m in NUM.findall(l)]
SIN_NODO = shutil.which('node') is None
if not SIN_NODO:
    R = json.loads(subprocess.run(['node', '-e', NODO, str(PARTES)], capture_output=True, text=True, check=True).stdout)
    ok(R['lim-idea']['hold'] == 3000 and R['lim-idea']['n'] == 6, 'H01 idea: hold 3000 y 6 pasos')
    for k in range(6):
        L = lineas(R['lim-idea']['lect'][k]); ok(len(L) == k + 1, 'H01 idea: la lectura del paso %d no es acumulada' % (k + 1))
        if k: ok(R['lim-idea']['lect'][k][:-len('\\end{aligned}')].startswith(R['lim-idea']['lect'][k - 1][:-len('\\end{aligned}')]), 'H01 idea: el paso %d borra algo del anterior' % (k + 1))
    for esc in ('lim-vivo', 'lim-salto'):
        E = R[esc]; ok((E['min'], E['max'], E['step'], E['hold']) == (0, 1, 0.01, 3000), 'H01 %s deslizador y hold' % esc)
        ok(len(E['filas']) == 101 + 6, 'H01 %s posiciones' % esc)
        for dv, t, cap in E['filas']:
            d = Fr(round(dv*100), 100); L = lineas(t); et = 'H01 %s d=%s' % (esc, tex(d)); xi = 1 - d; xd = 1 + d
            ok(all(len(re.sub(r'\\[a-zA-Z]+|[{}&^_ ]', '', z)) <= 60 for l in L for z in l.split('\\\\&\\qquad ')), et + ' línea larga')
            if esc == 'lim-vivo':
                if d == 0:
                    ok(len(L) == 6 and nums(L[0]) == [1, 0] and nums(L[1]) == [1, 0, 1, 1, 0, 1, 1] and nums(L[2]) == [1, 1, 0, 1, 1, 0] and nums(L[5])[-1] == 2 and 'no está definida' in L[3] and nums(L[4])[-3:] == [1, 1, 2], et + ' caso límite')
                    ok('no está definida' in cap and cap.rstrip('.').endswith('2'), et + ' pie'); continue
                q1, q2 = xi*xi, xd*xd
                ok(len(L) == 9, et + ' n.º de líneas')
                ok(nums(L[0]) == [1, d, 1], et + ' datos')
                ok(nums(L[1]) == [1, 1, d, xi] and 1 - d == xi, et + ' x izquierda')
                ok(ndec(q1) <= 4 and nums(L[2]) == [xi, q1, q1, 1, q1 - 1, xi, 1, xi - 1], et + ' cuadrado, numerador y denominador (izq.)')
                ok(nums(L[3]) == [xi, xi, 1, xi, 1, q1 - 1, xi - 1, (q1 - 1)/(xi - 1)] and (q1 - 1)/(xi - 1) == xi + 1 == f(xi), et + ' cociente (izq.)')
                ok(nums(L[4]) == [1, 1, d, xd] and 1 + d == xd, et + ' x derecha')
                ok(ndec(q2) <= 4 and nums(L[5]) == [xd, q2, q2, 1, q2 - 1, xd, 1, xd - 1], et + ' cuadrado, numerador y denominador (der.)')
                ok(nums(L[6]) == [xd, xd, 1, xd, 1, q2 - 1, xd - 1, (q2 - 1)/(xd - 1)] and (q2 - 1)/(xd - 1) == xd + 1 == f(xd), et + ' cociente (der.)')
                ok(nums(L[7]) == [2, f(xi), 2, abs(f(xi) - 2), f(xd), 2, abs(f(xd) - 2)] and abs(f(xi) - 2) == d == abs(f(xd) - 2), et + ' distancias')
                ok(nums(L[8]) == [d, 1, d, 2], et + ' qué significa')
                ok([D(m) for m in re.findall(r'-?\d+(?:,\d+)?', cap)] == [d, 1, 2 - d, 2 + d, d, 2] and 2 - d == f(xi) and 2 + d == f(xd), et + ' pie')
            else:
                if d == 0:
                    ok(len(L) == 5 and nums(L[0]) == [1, 0] and nums(L[1]) == [1, 1, 1, 4, 1, 3] and g(Fr(1)) == 3 and nums(L[2]) == [1, 1, 1, 2] and nums(L[3]) == [4, 4, 1, 3] and nums(L[4])[:2] == [2, 3] and 'no existe' in L[4], et + ' caso límite')
                    ok('no existe' in cap, et + ' pie'); continue
                ok(len(L) == 7, et + ' n.º de líneas')
                ok(nums(L[0]) == [1, d, 1], et + ' datos')
                ok(nums(L[1]) == [1, 1, d, xi, xi, 1, 1] and xi < 1, et + ' x izquierda y su tramo')
                ok(nums(L[2]) == [xi, xi, 1, xi + 1] and g(xi) == xi + 1, et + ' g izquierda')
                ok(nums(L[3]) == [1, 1, d, xd, xd, 1, 4] and xd >= 1, et + ' x derecha y su tramo')
                ok(nums(L[4]) == [xd, 4, xd, 4 - xd] and g(xd) == 4 - xd, et + ' g derecha')
                ok(nums(L[5]) == [g(xi), 2, abs(g(xi) - 2), g(xd), 3, abs(g(xd) - 3)] and abs(g(xi) - 2) == d == abs(g(xd) - 3), et + ' distancias')
                ok(nums(L[6]) == [2, 3, 2, 3, 1] and 'no existe' in L[6], et + ' conclusión')
                ok([D(m) for m in re.findall(r'-?\d+(?:,\d+)?', cap)] == [d, 1, 2 - d, 3 - d, 2, 3, 1] and 2 - d == g(xi) and 3 - d == g(xd), et + ' pie')
# lo mismo, sin depender de node: la cadena de cuentas que muestran las lecturas es exacta en las 101 posiciones
for k in range(0, 101):
    d = Fr(k, 100); xi = 1 - d; xd = 1 + d
    ok(g(xi) == 2 - d if d > 0 else g(xi) == 3, 'H01 salto g(1−d), d=%s' % d); ok(g(xd) == 3 - d, 'H01 salto g(1+d), d=%s' % d)
    if k:
        ok(f(xi) == 2 - d and f(xd) == 2 + d and ndec(xi*xi) <= 4 and ndec(xd*xd) <= 4 and ndec(f(xi)) <= 2 and ndec(f(xd)) <= 2, 'H01 vivo d=%s' % d)
        ok(f(xi) - 2 == xi - 1 and f(xd) - 2 == xd - 1, 'H01 vivo: f(x) − 2 = x − 1, d=%s' % d)
ok("fi:function(x){ return x + 1; }, fd:function(x){ return 4 - x; }, li:2, ld:3, fin:[[1, 2, true], [1, 3, false]]" in ESC, 'H01 salto: tramos, laterales y puntos hueco (1,2) / lleno (1,3)')
ok("fi:function(x){ return x + 1; }, fd:function(x){ return x + 1; }, li:2, ld:2, fin:[[1, 2, true]]" in ESC, 'H01 vivo: recta y hueco (1,2)')

# 3) tablas de valores de la hoja: cada fila se recalcula (x, x², x² − c, x − a, cociente)
TAB = re.findall(r'<table class="tbl">(.*?)</table>', ART, re.S); ok(len(TAB) == 2, 'H01 n.º de tablas')
def filas(t): return [re.findall(r'<td>(.*?)</td>', r) for r in re.findall(r'<tr>(.*?)</tr>', t, re.S) if '<td>' in r]
for t, (a, c, lim, xs) in zip(TAB, [(1, 1, 2, ['0.9', '0.99', '0.999', '1', '1.001', '1.01', '1.1']), (3, 9, 6, ['2.9', '2.99', '3.01', '3.1'])]):
    F = filas(t); ok([Fr(x) for x in xs] == [D(r[0].strip('\\() ')) for r in F], 'H01 tabla a=%d: valores de x' % a)
    for r in F:
        x = D(r[0].strip('\\() ')); v = [D(z.strip('\\() ')) for z in r[1:4]]
        ok(v == [x*x, x*x - c, x - a], 'H01 tabla a=%d fila x=%s' % (a, x))
        if x == a: ok(v[1:] == [0, 0] and 'no está definida' in r[4], 'H01 tabla a=%d fila x=a' % a)
        else: ok(D(r[4].strip('\\() ')) == (x*x - c)/(x - a) == x + a, 'H01 tabla a=%d cociente x=%s' % (a, x))
    vals = [D(r[4].strip('\\() ')) for r in F if D(r[0].strip('\\() ')) != a]
    ok(all(abs(v - lim) == abs(D(r[0].strip('\\() ')) - a) for v, r in zip(vals, [r for r in F if D(r[0].strip('\\() ')) != a])), 'H01 tabla a=%d: distancia al límite = distancia de x a a' % a)
ok(Fr(9, 10)**2 == Fr(81, 100) and Fr(81, 100) - 1 == Fr(-19, 100) and Fr(9, 10) - 1 == Fr(-1, 10) and Fr(-19, 100)/Fr(-1, 10) == Fr(19, 10), 'H01 k1 fila de muestra x=0,9')
# 4) recuadro k1: «tan cerca como se quiera» (distancias a 2,5 y a 2)
V = [Fr(3, 2), Fr(19, 10), Fr(199, 100)]
ok([abs(v - Fr(5, 2)) for v in V] == [1, Fr(6, 10), Fr(51, 100)] and all(abs(v - Fr(5, 2)) > Fr(1, 2) for v in V) and all(v < 2 for v in V), 'H01 k1 distancias a 2,5')
ok([abs(v - 2) for v in V] == [Fr(1, 2), Fr(1, 10), Fr(1, 100)], 'H01 k1 distancias a 2')
ok(V == [f(x) for x in IZ], 'H01 k1 valores = los de la animación')

# 5) identidades algebraicas, en rejilla
RJ = [Fr(p, q) for p in range(-12, 13) for q in (1, 2, 3, 4, 5, 10)]
for x in RJ:
    for a in (1, 2, 3):
        ok(x*x - a*a == (x - a)*(x + a), 'H01 diferencia de cuadrados a=%d' % a)
        if x != a: ok((x*x - a*a)/(x - a) == x + a, 'H01 simplificación con x ≠ %d' % a)
    if x != 1: ok(f(x) - 2 == x + 1 - 2 == x - 1, 'H01 k2: f(x) − 2 = x − 1')
    if x != 0: ok(abs(x)/x == (1 if x > 0 else -1) and (abs(x) == x if x > 0 else abs(x) == -x), 'H01 ej3 |x|/x')
    ok((1 - x) + 1 == 2 - x and 4 - (1 + x) == 3 - x, 'H01 k3 claves: g(1−d) = 2−d, g(1+d) = 3−d')
ok(g(Fr(1)) == 4 - 1 == 3, 'H01 k3 g(1)')

# 6) ejemplos
ok(3**2 - 9 == 0 and 3 - 3 == 0 and 3 + 3 == 6, 'H01 ej1 en x=3 y límite')
h = lambda x: 2*x - 1 if x != 2 else Fr(5)
for x, m, v in [('1.9', '3.8', '2.8'), ('1.99', '3.98', '2.98'), ('2.1', '4.2', '3.2'), ('2.01', '4.02', '3.02')]:
    ok(2*Fr(x) == Fr(m) and Fr(m) - 1 == Fr(v) == h(Fr(x)), 'H01 ej2 h(%s)' % x)
ok(2*2 - 1 == 4 - 1 == 3 and h(Fr(2)) == 5 and 3 != 5, 'H01 ej2 límite 3 y h(2) = 5')
ok(all(Fr(n)/Fr(dn) == r for n, dn, r in [('0.1', '0.1', 1), ('0.01', '0.01', 1), ('0.1', '-0.1', -1), ('0.01', '-0.01', -1)]) and abs(Fr('-0.1')) == Fr('0.1') and abs(Fr('-0.01')) == Fr('0.01') and 1 - (-1) == 2, 'H01 ej3')
p = lambda x: x*x if x < 2 else 6 - x
ok([p(Fr(x)) for x in ('1.9', '1.99', '1.999')] == [Fr('3.61'), Fr('3.9601'), Fr('3.996001')] and 2**2 == 4, 'H01 ej4 izquierda')
ok([p(Fr(x)) for x in ('2.1', '2.01', '2.001')] == [Fr('3.9'), Fr('3.99'), Fr('3.999')] and 6 - 2 == 4, 'H01 ej4 derecha')
ok([abs(p(Fr(x)) - 4) for x in ('1.9', '1.99', '1.999')] == sorted([abs(p(Fr(x)) - 4) for x in ('1.9', '1.99', '1.999')], reverse=True), 'H01 ej4 se acercan a 4')
# 7) ejercicios
ok(2**2 - 4 == 0 and 2 - 2 == 0 and Fr('1.9')**2 == Fr('3.61') and Fr('3.61') - 4 == Fr('-0.39') and Fr('1.9') - 2 == Fr('-0.1') and Fr('-0.39')/Fr('-0.1') == Fr('3.9') == Fr('1.9') + 2, 'H01 A x=1,9')
ok(Fr('2.1')**2 == Fr('4.41') and Fr('4.41') - 4 == Fr('0.41') and Fr('2.1') - 2 == Fr('0.1') and Fr('0.41')/Fr('0.1') == Fr('4.1') == Fr('2.1') + 2 and 2 + 2 == 4, 'H01 A x=2,1 y límite')
q = lambda x: 2*x + 1 if x <= 1 else 5 - x
ok(q(Fr(1)) == 2*1 + 1 == 2 + 1 == 3, 'H01 B q(1)')
for x, m, v in [('0.9', '1.8', '2.8'), ('0.99', '1.98', '2.98')]: ok(2*Fr(x) == Fr(m) and Fr(m) + 1 == Fr(v) == q(Fr(x)), 'H01 B q(%s)' % x)
ok(q(Fr('1.1')) == 5 - Fr('1.1') == Fr('3.9') and q(Fr('1.01')) == Fr('3.99') and 2*1 + 1 == 3 and 5 - 1 == 4 and 3 != 4 and 4 - 3 == 1, 'H01 B derecha, laterales y salto')
def P(t):
    assert 0 < t <= 3
    return 1000 if t <= 1 else (2000 if t <= 2 else 3000)
ok([P(Fr(t)) for t in ('0.9', '0.99', '1', '1.01', '1.1')] == [1000, 1000, 1000, 2000, 2000], 'H01 C alrededor de 1')
ok([P(Fr(t)) for t in ('1.4', '1.49', '1.5', '1.51', '1.6')] == [2000]*5 and 2000 - 1000 == 1000, 'H01 C alrededor de 1,5 y salto')
ok(all(P(Fr(k, 1000)) == 1000 for k in range(1, 1001)) and all(P(Fr(k, 1000)) == 2000 for k in range(1001, 2001)), 'H01 C: P constante en cada tramo (rejilla de milésimas)')
# cada número con decimales de los ejemplos y ejercicios citados arriba está escrito así en la hoja
for s in ['2\\cdot 1{,}9-1=3{,}8-1=2{,}8', '2\\cdot 1{,}99-1=3{,}98-1=2{,}98', '2\\cdot 2{,}1-1=4{,}2-1=3{,}2', '2\\cdot 2{,}01-1=4{,}02-1=3{,}02', '1{,}9^{2}=3{,}61', '1{,}99^{2}=3{,}9601', '1{,}999^{2}=3{,}996001',
          '6-2{,}1=3{,}9', '6-2{,}01=3{,}99', '6-2{,}001=3{,}999', '3{,}61-4=-0{,}39', '\\dfrac{-0{,}39}{-0{,}1}=3{,}9', '2{,}1^{2}=4{,}41', '4{,}41-4=0{,}41', '\\dfrac{0{,}41}{0{,}1}=4{,}1',
          '2\\cdot 0{,}9+1=1{,}8+1=2{,}8', '2\\cdot 0{,}99+1=1{,}98+1=2{,}98', '5-1{,}1=3{,}9', '5-1{,}01=3{,}99', '|1{,}5-2{,}5|=1', '|1{,}9-2{,}5|=0{,}6', '|1{,}99-2{,}5|=0{,}51', '|1{,}5-2|=0{,}5', '|1{,}9-2|=0{,}1', '|1{,}99-2|=0{,}01',
          '0{,}9^{2}=0{,}81', '0{,}81-1=-0{,}19', '\\dfrac{-0{,}19}{-0{,}1}=1{,}9', '2000-1000=1000']:
    ok(s in ART, 'H01: la hoja no trae «%s»' % s)

# 8) molde y leyes (lo que se puede revisar por texto)
ok(ART.startswith('<!--file:H01_introduccion_a_los_limites.html-->\n<!--title:Introducción a los límites-->\n<!--id:lim-intro-->\n<!--tab:H01 Introducción a los límites-->\n<article class="sheet" id="lim-intro" data-hoja="L29 H01">'), 'H01 encabezado')
ok('<h1>Introducción a los límites</h1>' in ART and '<span class="status">CD-L29-H01 · v001 · Pendiente de APR</span>' in ART, 'H01 título y pie')
ok(re.findall(r'data-scene="([^"]+)"', ART) == ['lim-idea', 'lim-vivo', 'lim-salto'] and re.findall(r"OA\.scene\('([^']+)'", ESC) == ['lim-idea', 'lim-vivo', 'lim-salto'], 'H01 escenas')
for m in re.finditer(r'<div class="stage"', ART):
    ok(ART[:m.start()].rstrip().endswith('</ol>'), 'H01: falta «cómo leerla» justo antes de una animación')
ok(ESC.count('hold:3000') == 3 and ESC.count('dtQue(S,') == 3 and ESC.count('dtPasos(') == 5 and ESC.count('oaReg(S, k, N') == 1, 'H01 hold, franja, lectura por pasos y registro')
ok(all(ART.count(z) == 1 for z in ('card k1', 'card k2', 'card k3', 'prop p1', 'prop p2', 'prop p3', 'prop p4')) and ART.count('<div class="ex">') == 3 and ART.count('<summary>Pista</summary>') == 3 and ART.count('<summary>Solución paso a paso</summary>') == 3 and 'De la vida cotidiana' in ART and '<b>Modelo:</b>' in ART, 'H01 recuadros, ejemplos y ejercicios')
FR = re.findall(r"lmTxt\(S, '([^']*)'", ESC) + [x for par in re.findall(r"\['([^'\\]*)', '([^'\\]*)'\](?=[,\]])", ESC[ESC.index('var TXT'):ESC.index('return {')]) for x in par]
ok(len(FR) >= 16 and all(len(x.replace("' + lmT(d, 2) + '", '0,00')) <= 50 for x in FR), 'H01 frases del lienzo de 50 caracteres o menos: ' + ', '.join(x for x in FR if len(x) > 50))
QUE = re.findall(r"dtQue\(S, '([^']*)', '([^']*)'\)", ESC)
ok(len(QUE) == 3 and all(len(a) <= 45 and len(b) <= 50 for a, b in QUE), 'H01 franjas «Qué muestra»')
ok(not re.search(r'\d\.\d', re.sub(r'<!--.*?-->', '', ART).replace('$1.000', '')) and '\\sin' not in ART and '\\sin' not in ESC, 'H01 decimales con coma')
ok(not re.search(r'[^\\]\\\(|\\\)', '') and ART.count('\\(') == ART.count('\\)') and ART.count('\\[') - ART.count('\\\\[') == ART.count('\\]'), 'H01 delimitadores TeX balanceados')
ok(not re.search(r'\\\([^)]*?[<>][^)]*?\\\)', ART), 'H01: < o > sueltos dentro de TeX (usar \\lt, \\gt)')


# ═════════════════════════ H02, H03 y H04 (agregadas el 23-nov) ═════════════════════════
import tempfile
VTEX = RAIZ/'qa'/'rigor'/'verificar_tex.py'
def vtex(et, ruta):
    """recalcula con fracciones TODAS las igualdades numéricas de un archivo (verificar_tex.py): ninguna falsa ni sin evaluar"""
    r = subprocess.run([sys.executable, str(VTEX), str(ruta)], capture_output=True, text=True).stdout
    m = re.search(r'encontradas: (\d+) · correctas: (\d+) · FALSAS: (\d+) · sin evaluar: (\d+)', r)
    ok(bool(m) and int(m.group(3)) == 0 and int(m.group(4)) == 0 and int(m.group(1)) == int(m.group(2)) > 0, et + ': igualdades numéricas falsas o sin evaluar (verificar_tex)')
    return int(m.group(1)) if m else 0
NUMTEX = r'-?\d+(?:\{,\}\d+)?'
def valores(et, mates, FUN, minimo):
    """cada «nombre(número) = … = número» escrito en las fórmulas se compara con la función exacta"""
    n = 0
    for mt in mates:
        for m in re.finditer(r'(?<![A-Za-z\\])([A-Za-z](?:_\{\d\})?)\((' + NUMTEX + r')\)=', mt):
            nom, arg = m.group(1), D(m.group(2))
            if nom not in FUN: continue
            resto = re.split(r';|\\quad|\\qquad|\\ \\ |\\text|\\to|\\ne|\\\\', mt[m.end():])[0]
            ult = resto.split('=')[-1].strip().rstrip('.,').strip()
            if not re.fullmatch(NUMTEX, ult): continue
            n += 1; ok(FUN[nom](arg) == D(ult), '%s: %s(%s) no es %s' % (et, nom, m.group(2), ult))
    ok(n >= minimo, '%s: se esperaban al menos %d valores de función y se hallaron %d' % (et, minimo, n))
def mates_de(html): return re.findall(r'\\\((.*?)\\\)', html, re.S) + re.findall(r'\\\[(.*?)\\\]', html, re.S)
def molde(nn, archivo, titulo, ident, caja, escenas, nque, modelo=True):
    A = (PARTES/('%s.art.html' % nn)).read_text(encoding='utf-8'); E = (PARTES/('%s.scene.js' % nn)).read_text(encoding='utf-8'); h = 'H' + nn
    ok(A.startswith('<!--file:%s-->\n<!--title:%s-->\n<!--id:%s-->\n<!--tab:%s %s-->\n<article class="sheet" id="%s" data-hoja="L29 %s">' % (archivo, titulo, ident, h, titulo, ident, h)), h + ' encabezado')
    ok('<h1>%s</h1>' % titulo in A and '<span class="status">CD-L29-%s · v001 · Pendiente de APR</span>' % h in A and '<li>%s</li>\n      <li><b>%s</b></li>' % (caja, titulo) in A, h + ' título, ruta y pie')
    ok(re.findall(r'data-scene="([^"]+)"', A) == escenas and re.findall(r"OA\.scene\('([^']+)'", E) == escenas, h + ' escenas')
    for m in re.finditer(r'<div class="stage"', A): ok(A[:m.start()].rstrip().endswith('</ol>'), h + ': falta «cómo leerla» justo antes de una animación')
    ok(A.count('<p><b>Cómo leerla:</b></p>') >= 1 and A.count('<ul class="keys">') == len(escenas), h + ' cómo leerla y claves')
    ok(E.count('hold:3000') == len(escenas) and E.count('dtQue(S,') == len(escenas) and E.count('dtPasos(R.slice(0, k))') == len(escenas) and E.count('oaReg(S, k, N') == len(escenas), h + ' hold, franja, lectura acumulada y registro')
    ok(all(A.count(z) == 1 for z in ('card k1', 'card k2', 'card k3', 'prop p1', 'prop p2', 'prop p3', 'prop p4')) and A.count('<div class="ex">') == 3 and A.count('<summary>Pista</summary>') == 3 and A.count('<summary>Solución paso a paso</summary>') == 3 and 'De la vida cotidiana' in A and '<b>Modelo:</b>' in A and A.count('class="why"') == 2 and 'Aviso de rigor' in A, h + ' recuadros, ejemplos, ejercicios y avisos')
    FR = [x for par in re.findall(r"\['([^'\\]*)', '([^'\\]*)'\](?=[,\]])", ''.join(E[m.start():E.index('return {', m.start())] for m in re.finditer(r'var TXT', E))) for x in par] + re.findall(r"frase\('([^']*)'", E)
    ok(len(FR) >= 10 and all(len(x) <= 50 for x in FR), h + ' frases del lienzo de 50 caracteres o menos: ' + ', '.join(x for x in FR if len(x) > 50))
    QUE = re.findall(r"dtQue\(S, '([^']*)', '([^']*)'\)", E)
    ok(len(QUE) == nque and all(len(a) <= 45 and len(b) <= 50 for a, b in QUE), h + ' franjas «Qué muestra»')
    ok(not re.search(r'\d\.\d', re.sub(r'<!--.*?-->', '', A)) and '\\sin' not in A and '\\sin' not in E, h + ' decimales con coma')
    ok(A.count('\\(') == A.count('\\)') and A.count('\\[') - A.count('\\\\[') == A.count('\\]'), h + ' delimitadores TeX balanceados')
    ok(not re.search(r'\\\([^)]*?[<>][^)]*?\\\)', A), h + ': < o > sueltos dentro de TeX (usar \\lt, \\gt)')
    vtex(h + ' hoja', PARTES/('%s.art.html' % nn))
    return A, E
A2, E2 = molde('02', 'H02_introduccion_al_limite.html', 'Introducción al límite', 'lim-vel', 'Límites y continuidad', ['vel-idea'], 1)
A3, E3 = molde('03', 'H03_el_limite_y_la_relacion_con_la_grafica.html', 'El límite y la relación con la gráfica', 'lim-graf', 'Límites a partir de gráficas', ['gra-idea', 'gra-casos'], 2)
A4, E4 = molde('04', 'H04_limites_a_partir_de_graficas.html', 'Límites a partir de gráficas', 'lim-grafs', 'Límites a partir de gráficas', ['grf-idea'], 1)

# funciones exactas de cada hoja
def G4(x):
    assert 0 <= x <= 8
    return x + 1 if x < 3 else (Fr(1) if x == 3 else (7 - x if x < 5 else 10 - x))
def H4(x):
    assert 0 <= x <= 6
    return 3 - x if x < 2 else (Fr(3) if x == 2 else (x/2 if x <= 4 else Fr(3)))
def V4(t):
    assert 0 <= t <= 6
    return 2*t if t < 3 else 2*t - 6
def f3(x): return x*x/2 if x != 2 else Fr(7, 2)
def f32(x):
    assert x != 2
    return (x*x - 4)/(2*x - 4)
FUN2 = {'s': lambda t: t*t, 'd': lambda t: t*t}
FUN3 = {'f': f3, 'f_{1}': lambda x: x/2 + 1, 'f_{2}': f32, 'f_{3}': lambda x: x/2 + 1 if x != 2 else Fr(7, 2), 'f_{4}': lambda x: x/2 + 1 if x < 2 else x/2 + 2,
        'p': lambda x: 3 - x if x != 1 else Fr(4), 'q': lambda x: x - 1 if x < 3 else 7 - x, 'C': lambda t: 20 + 2*t}
FUN4 = {'G': G4, 'H': H4, 'V': V4}
valores('H02 hoja', mates_de(A2), FUN2, 3); valores('H03 hoja', mates_de(A3), FUN3, 30); valores('H04 hoja', mates_de(A4), FUN4, 30)

# ───────── H02: velocidad media del carrito, s(t) = t² ─────────
T2 = re.findall(r'<table class="tbl">(.*?)</table>', A2, re.S); ok(len(T2) == 2, 'H02 n.º de tablas')
for t, (a, hs) in zip(T2, [(1, ['-0.5', '-0.1', '-0.01', '0', '0.01', '0.1', '0.5']), (3, ['-0.1', '-0.01', '0.01', '0.1'])]):
    F = filas(t); ok([Fr(x) for x in hs] == [D(r[0].strip('\\() ')) for r in F], 'H02 tabla a=%d: valores de h' % a)
    for r in F:
        h = D(r[0].strip('\\() ')); v = [D(z.strip('\\() ')) for z in r[1:4]]
        ok(v == [a + h, (a + h)**2, (a + h)**2 - a*a], 'H02 tabla a=%d fila h=%s' % (a, h))
        if h == 0: ok(v[2] == 0 and 'no está definido' in r[4], 'H02 tabla fila h=0')
        else: ok(D(r[4].strip('\\() ')) == ((a + h)**2 - a*a)/h == 2*a + h and abs(D(r[4].strip('\\() ')) - 2*a) == abs(h), 'H02 tabla a=%d cociente h=%s' % (a, h))
for a in RJ:
    for h in RJ:
        ok((a + h)**2 == a*a + 2*a*h + h*h and (a + h)**2 - a*a == 2*a*h + h*h == h*(2*a + h), 'H02 k2 binomio y factor común')
        if h != 0: ok(((a + h)**2 - a*a)/h == 2*a + h, 'H02 k2 cociente = 2a + h')
for x in RJ:
    ok(x*x + 2*x == x*(x + 2) and x*x - 3*x == x*(x - 3) and (3 + x)**2 == 9 + 6*x + x*x and 6*x + x*x == x*(6 + x) and (2 + x)**2 == 4 + 4*x + x*x and 4*x + x*x == x*(4 + x), 'H02 identidades de ejemplos y ejercicios')
    ok((Fr(5, 2) + x)**2 == Fr(25, 4) + 5*x + x*x and 5*x + x*x == x*(5 + x) and (1 + x)**2 - 1 == 2*x + x*x == x*(2 + x), 'H02 identidades de C y de la animación')
    if x != 0: ok((x*x + 2*x)/x == x + 2 and (x*x - 3*x)/x == x - 3 and ((Fr(5, 2) + x)**2 - Fr(25, 4))/x == 5 + x, 'H02 simplificaciones con x ≠ 0')
# ejemplo 4: 1/x² supera cualquier tope M cerca de 0 (0 < |x| < 1/√M ⟹ 1/x² > M), en rejilla con M cuadrado perfecto
for r in (1, 2, 5, 10, 100, 1000):
    Mt = r*r
    for k in range(1, 60):
        for x in (Fr(k, 60*r), -Fr(k, 60*r)):
            ok(0 < abs(x) < Fr(1, r) and x*x < Fr(1, Mt) and 1/(x*x) > Mt, 'H02 ej4 tope M=%d' % Mt)
ok(1/Fr('0.1')**2 == 100 and 1/Fr('0.01')**2 == 10000 and Fr(1, 100) == Fr('0.01'), 'H02 ej4 valores')
ok(5*Fr(3600, 1000) == 18 and Fr(3600, 1000) == Fr('3.6') and (Fr('6.76') - Fr('6.25'))/Fr('0.1') == Fr('5.1') == 5 + Fr('0.1'), 'H02 C: 18 km/h y velocidad media')
# la escena: rectas dibujadas (h y su paso) y cadenas del registro y de la lectura, armadas con fracciones
ok('var SEC = [[1, 2, 0], [0.5, 3, 0], [0.1, 4, -10], [-0.5, 5, 0], [-0.1, 5, 10]];' in E2 and 'm = 2 + h' in E2 and 'function s(t){ return t*t; }' in E2, 'H02 escena: rectas de pendiente 2 + h')
for h in (Fr(1), Fr(1, 2), Fr(1, 10), Fr(-1, 2), Fr(-1, 10)):
    s1 = (1 + h)**2; ok((s1 - 1)/h == 2 + h, 'H02 escena v_m con h=%s' % h)
    if h > 0 and h != 1:
        ok('h=%s:\\\\ \\\\ \\\\tfrac{%s-1}{%s}=\\\\tfrac{%s}{%s}=%s\\\\ \\\\text{m/s}' % (tex(h), tex(s1), tex(h), tex(s1 - 1), tex(h), tex(2 + h)) in E2, 'H02 registro h=%s' % h)
        ok('s(%s)=%s^{2}=%s;\\\\quad %s-1=%s\\\\ \\\\text{m}' % (tex(1 + h), tex(1 + h), tex(s1), tex(s1), tex(s1 - 1)) in E2 and 'v_{m}=\\\\tfrac{%s}{%s}=%s\\\\ \\\\text{m/s}' % (tex(s1 - 1), tex(h), tex(2 + h)) in E2, 'H02 lectura h=%s' % h)
    if h < 0:
        ok('s(%s)=%s^{2}=%s;\\\\quad v_{m}=\\\\tfrac{%s-1}{%s}=\\\\tfrac{%s}{%s}=%s' % (tex(1 + h), tex(1 + h), tex(s1), tex(s1), tex(h), tex(s1 - 1), tex(h), tex(2 + h)) in E2, 'H02 lectura h=%s' % h)
ok('h=-0{,}5:\\\\ 1{,}5\\\\ \\\\text{m/s};\\\\quad h=-0{,}1:\\\\ 1{,}9\\\\ \\\\text{m/s}' in E2 and 'h=1:\\\\ \\\\ \\\\tfrac{4-1}{1}=\\\\tfrac{3}{1}=3\\\\ \\\\text{m/s}' in E2, 'H02 registro R2 y R5')

# ───────── H03: el límite y la gráfica ─────────
ok('function f(x){ return x*x/2; }' in E3 and 'var IZ = [1, 1.5, 1.9], DE = [3, 2.5, 2.1];' in E3 and "lmPunto(S, M, 2, 2, C.tan, true, 4); lmPunto(S, M, 2, 3.5, C.tan, false, 3.6);" in E3, 'H03 idea: curva, puntos, hueco (2,2) y punto lleno (2; 3,5)')
IZ3 = [Fr(1), Fr(3, 2), Fr(19, 10)]; DE3 = [Fr(3), Fr(5, 2), Fr(21, 10)]
for nom, L in (('x<2', IZ3), ('x>2', DE3)):
    ok(nom + ':\\\\ \\\\ ' + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x), tex(f3(x))) for x in L) in E3, 'H03 idea registro ' + nom)
    for x in L: ok('f(%s)=\\\\tfrac{%s^{2}}{2}=\\\\tfrac{%s}{2}=%s' % (tex(x), tex(x), tex(x*x), tex(f3(x))) in E3, 'H03 idea lectura f(%s)' % x)
ok(all(f3(x) < 2 for x in IZ3) and all(f3(x) > 2 for x in DE3) and abs(f3(IZ3[2]) - 2) == Fr('0.195') and abs(f3(DE3[2]) - 2) == Fr('0.205') and '|1{,}805-2|=0{,}195' in E3 and '|2{,}205-2|=0{,}205' in E3 and Fr(2*2, 2) == 2, 'H03 idea: se acercan a 2 por los dos lados; distancias')
ok([abs(f3(x) - 2) for x in IZ3] == sorted([abs(f3(x) - 2) for x in IZ3], reverse=True) and [abs(f3(x) - 2) for x in DE3] == sorted([abs(f3(x) - 2) for x in DE3], reverse=True), 'H03 idea: las alturas se acercan a 2')
ok("function b(x){ return x/2 + 1; } function b4(x){ return x/2 + 2; }" in E3 and "b, 2, [[2, false]]]" in E3 and "b, 2, [[2, true]]]" in E3 and "b, 2, [[2, true], [3.5, false]]]" in E3 and "b4, 3, [[2, true], [3, false]]]" in E3, 'H03 casos: las cuatro gráficas (función derecha, llegada derecha, puntos sobre x = 2)')
for x in RJ:
    ok(x*x - 4 == (x - 2)*(x + 2) and 2*x - 4 == 2*(x - 2) and (x/2 + Fr('1.01')) - (x/2 + 1) == Fr('0.01'), 'H03 identidades (ej. 2 y caso especial)')
    if x != 2: ok(f32(x) == (x + 2)/2 == x/2 + 1, 'H03 ej2: f₂(x) = x/2 + 1 si x ≠ 2')
ok(Fr('0.01')*3 == Fr('0.03') and Fr('0.03')*10 == Fr('0.3') and Fr(2, 2) + Fr('1.01') == Fr('2.01'), 'H03 k3: 0,03 cm = 0,3 mm; límite 2,01')
ok(Fr(2, 2) + 1 == 2 and Fr(2, 2) + 2 == 3 and Fr(7, 2) - 2 == Fr(3, 2) and 3 - 1 == 2 and 7 - 3 == 4 and 3 - 2 == 1 and 7 - 5 == 2 and 20 + 2*10 == 40, 'H03 límites de ejemplos y ejercicios')

# ───────── H04: límites a partir de gráficas ─────────
ok('function g1(x){ return x + 1; } function g2(x){ return 7 - x; } function g3(x){ return 10 - x; }' in E4 and 'var LEC = [[2, 2, g1, g1, 3, 3, 7], [3, 3, g1, g2, 4, 4, -7], [5, 4, g2, g3, 2, 5, 7]];' in E4, 'H04 escena: trozos y lecturas (a, llegadas)')
ok("lmPunto(S, M, 0, 1, C.tan, false, 3.2); lmPunto(S, M, 3, 4, C.tan, true, 3.6); lmPunto(S, M, 3, 1, C.tan, false, 3.2); lmPunto(S, M, 5, 2, C.tan, true, 3.6); lmPunto(S, M, 5, 5, C.tan, false, 3.2); lmPunto(S, M, 8, 2, C.tan, false, 3.2);" in E4, 'H04 escena: puntos llenos y huecos')
ok(G4(Fr(0)) == 1 and G4(Fr(3)) == 1 and G4(Fr(5)) == 5 and G4(Fr(8)) == 2 and G4(Fr(2)) == 3, 'H04 valores de G en los puntos marcados')
def llegada(F, a, lado, n=6):
    """valores de F en a ± 10^-k: la sucesión de distancias a la llegada supuesta es 10^-k por el coeficiente del trozo"""
    return [F(a + lado*Fr(1, 10**k)) for k in range(1, n)]
for a, li, ld in [(2, 3, 3), (3, 4, 4), (5, 2, 5), (1, 2, 2), (Fr(9, 2), Fr(5, 2), Fr(5, 2)), (6, 4, 4), (Fr(5, 2), Fr(7, 2), Fr(7, 2))]:
    ok(all(abs(v - li) == Fr(1, 10**k) for k, v in enumerate(llegada(G4, Fr(a), -1), 1)) and all(abs(v - ld) == Fr(1, 10**k) for k, v in enumerate(llegada(G4, Fr(a), 1), 1)), 'H04 llegadas de G en a=%s' % a)
ok(all(abs(v - 1) == Fr(1, 10**k) for k, v in enumerate(llegada(G4, Fr(0), 1), 1)) and all(abs(v - 2) == Fr(1, 10**k) for k, v in enumerate(llegada(G4, Fr(8), -1), 1)), 'H04 ej3: laterales en los extremos')
TB = filas(re.findall(r'<table class="tbl">(.*?)</table>', A4, re.S)[0])
ok([[z.strip('\\() ') for z in r] for r in TB] == [['2', '3', '3', '3', '3'], ['3', '4', '4', '4', '1'], ['5', '2', '5', 'no existe', '5']], 'H04 tabla de lecturas')
# ejemplo 4: en una rejilla fina de ]0, 8[, las dos llegadas coinciden en todo a salvo a = 5
for k in range(1, 160):
    a = Fr(k, 20); iz = a + 1 if a <= 3 else (7 - a if a <= 5 else 10 - a); de = a + 1 if a < 3 else (7 - a if a < 5 else 10 - a)
    ok(all(abs(G4(a - Fr(1, 10**j)) - iz) == Fr(1, 10**j) for j in (3, 4, 5)) and all(abs(G4(a + Fr(1, 10**j)) - de) == Fr(1, 10**j) for j in (3, 4, 5)), 'H04 ej4 llegadas en a=%s' % a)
    ok((iz == de) == (a != 5), 'H04 ej4: solo en a = 5 las llegadas difieren (a=%s)' % a)
ok(5 - 2 == 3, 'H04 ej4 salto')
for a, li, ld, c1, c2 in [(2, 1, 1, 1, Fr(1, 2)), (4, 2, 3, Fr(1, 2), 0), (5, 3, 3, 0, 0)]:
    ok(all(abs(v - li) == c1*Fr(1, 10**k) for k, v in enumerate(llegada(H4, Fr(a), -1), 1)) and all(abs(v - ld) == c2*Fr(1, 10**k) for k, v in enumerate(llegada(H4, Fr(a), 1), 1)), 'H04 B llegadas de H en a=%s' % a)
ok(H4(Fr(0)) == 3 and H4(Fr(2)) == 3 and H4(Fr(4)) == 2 and H4(Fr(6)) == 3 and 3 - 2 == 1 and Fr(2, 2) == 1 and Fr(4, 2) == 2, 'H04 B puntos marcados de H')
ok(all(abs(v - 6) == 2*Fr(1, 10**k) for k, v in enumerate(llegada(V4, Fr(3), -1), 1)) and all(abs(v - 0) == 2*Fr(1, 10**k) for k, v in enumerate(llegada(V4, Fr(3), 1), 1)) and V4(Fr(3)) == 0 and V4(Fr(0)) == 0 and V4(Fr(6)) == 6 and 2*Fr(3, 2) == 3, 'H04 C estanque: laterales 6 y 0, V(3) = 0')

# >>> H05
# ───────── H05: límites laterales a partir de gráficas. Asíntotas ─────────
A5, E5 = molde('05', 'H05_limites_laterales_a_partir_de_graficas_asintotas.html', 'Límites laterales a partir de gráficas. Asíntotas', 'lim-asint', 'Límites a partir de gráficas', ['asi-idea'], 1)
# funciones exactas de la hoja (cada una falla si se la evalúa fuera de su dominio)
def f5(x):
    assert x != 2
    return 1/(Fr(x) - 2)
def p5(x): return Fr(1) if x == 2 else f5(x)
def g5(x):
    assert x != 2
    return (Fr(x)*x - 4)/(Fr(x) - 2)
def q5(x):
    assert x != 3
    return 1/(Fr(x) - 3)**2
def w5(x):
    assert x != 4
    return 3/(4 - Fr(x))
def v5(x): return Fr(x) + 1 if x <= 1 else 1/(Fr(x) - 1)
def u5(x):
    assert x != -1
    return 4/(Fr(x) + 1)
def k5(x):
    assert x != 3
    return 1/Fr(x) if x < 0 else (Fr(x) + 1 if x < 3 else 2/(Fr(x) - 3)**2)
def T5(x):
    assert x > 0
    return 60/Fr(x)
FUN5 = {'f': f5, 'p': p5, 'g': g5, 'q': q5, 'w': w5, 'v': v5, 'u': u5, 'k': k5, 'T': T5}
valores('H05 hoja', mates_de(A5), FUN5, 37)
for z5 in (f5, g5, q5, w5, u5, k5, T5):   # los valores excluidos de cada dominio
    try: z5({f5: 2, g5: 2, q5: 3, w5: 4, u5: -1, k5: 3, T5: 0}[z5]); ok(False, 'H05: dominio de %s' % z5.__name__)
    except AssertionError: ok(True, '')
MS5 = [Fr(1, 2), Fr(1), Fr(2), Fr(5), Fr(10), Fr(37), Fr(100), Fr(1000), Fr(10**6)]   # topes de prueba
TS5 = [Fr(j5, 40) for j5 in range(1, 40)]                                             # fracciones de cada tramo (0 < t < 1)

# 1) la escena: función, puntos dibujados, tope y franja; cadenas del registro, de la lectura y del lienzo armadas con fracciones
ok('function f(x){ return 1/(x - 2); }' in E5 and 'var IZ = [[1.5, -2], [1.9, -10]], DE = [[2.5, 2], [2.1, 10]], TOPE = 5, ANCHO = 0.2;' in E5, 'H05 escena: función, puntos, tope y ancho de la franja')
ok("lmMarco(-0.75, 0.35, 5.7, 4.6, -1, 5, -12, 12)" in E5 and 'xe = 1/11' in E5 and f5(2 + Fr(1, 11)) == 11 and f5(2 - Fr(1, 11)) == -11 and '2 + s*xe, s*11, 2 + s*xe, s*12.4' in E5, 'H05 escena: la curva se dibuja hasta las alturas ±11 y la flecha sale del marco (±12)')
IZ5 = [Fr(3, 2), Fr(19, 10), Fr(199, 100)]; DE5 = [Fr(5, 2), Fr(21, 10), Fr(201, 100)]
ok([f5(x5) for x5 in IZ5] == [-2, -10, -100] and [f5(x5) for x5 in DE5] == [2, 10, 100], 'H05 escena: alturas por cada lado')
ok(all(abs(f5(x5)) <= 11 for x5 in IZ5[:2] + DE5[:2]) and all(abs(f5(x5)) > 12 for x5 in (IZ5[2], DE5[2])), 'H05 escena: dos puntos por lado caben en el marco y el tercero no')
for nom5, L5, cl5 in (('x\\\\lt 2', IZ5, 'c-sec'), ('x\\\\gt 2', DE5, 'diff')):
    ok(nom5 + ':\\\\ \\\\ ' + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x5), tex(f5(x5))) for x5 in L5) + "'" in E5, 'H05 registro ' + nom5)
    for x5 in L5:
        ok('f(%s)=\\\\tfrac{1}{%s-2}=\\\\tfrac{1}{%s}=%s' % (tex(x5), tex(x5), tex(x5 - 2), tex(f5(x5))) in E5, 'H05 lectura f(%s)' % tex(x5))
pl5 = lambda z: tex(z).replace('{,}', ',').replace('-', '−')   # número como texto del lienzo
ok("'en %s vale %s:', 'sigue bajando'" % (pl5(IZ5[2]), pl5(f5(IZ5[2]))) in E5 and "'en %s vale %s:', 'sigue subiendo'" % (pl5(DE5[2]), pl5(f5(DE5[2]))) in E5, 'H05 lienzo: valor fuera del marco de cada lado')
ok("las alturas son %s, %s y', '%s: la curva baja" % tuple(pl5(f5(x5)) for x5 in IZ5) in E5 and 'las alturas son %s, %s y %s:' % tuple(pl5(f5(x5)) for x5 in DE5) in E5, 'H05 lienzo: frases de los pasos 2 y 3')
ok(Fr(1, 5) == Fr('0.2') and 2 + Fr('0.2') == Fr('2.2') and f5(Fr('2.2')) == 5 and "'Se pone un tope, 5. Entre 2 y 2,2 la curva queda'" in E5 and "frase('entre 2 y 2,2 la curva'" in E5 and "frase('pasa sobre el tope'" in E5 and "frase('tope: 5'" in E5, 'H05 lienzo: tope 5 y franja 2 < x < 2,2')
ok('\\\\tfrac{1}{5}=0{,}2;\\\\ \\\\ \\\\text{basta }0\\\\lt x-2\\\\lt 0{,}2' in E5 and '\\\\tfrac{1}{100}=0{,}01;\\\\ \\\\ \\\\text{basta }0\\\\lt x-2\\\\lt 0{,}01' in E5 and Fr(1, 100) == Fr('0.01') and 2 - 2 == 0, 'H05 lectura: topes 5 y 100')
ok(all(f5(2 + t5*Fr('0.2')) > 5 for t5 in TS5) and all(f5(2 + t5*Fr('0.01')) > 100 for t5 in TS5) and all(f5(2 + Fr('0.2') + t5) < 5 for t5 in TS5), 'H05 escena: en la franja la curva está sobre el tope 5, y fuera de ella no')
ok("'R5', '\\\\lim_{x\\\\to 2^{-}}f(x)=-\\\\infty;\\\\ \\\\ \\\\lim_{x\\\\to 2^{+}}f(x)=+\\\\infty'" in E5 and "['F', '\\\\Longrightarrow\\\\ -\\\\infty;\\\\ \\\\ +\\\\infty'" in E5, 'H05 escena: signos de los laterales (izquierda −∞, derecha +∞)')

# 2) la desigualdad del tope, en rejilla: 0 < x − 2 < 1/M ⟹ f(x) > M; 0 < 2 − x < 1/M ⟹ f(x) < −M; 1/M es el borde exacto
for M5 in MS5:
    ok(f5(2 + 1/M5) == M5 and f5(2 - 1/M5) == -M5, 'H05 k2: borde del tramo, M=%s' % M5)
    for t5 in TS5:
        d5 = t5/M5; x5 = 2 + d5
        ok(0 < x5 - 2 < 1/M5 and M5*(x5 - 2) < 1 and M5 < 1/(x5 - 2) == f5(x5), 'H05 k2 derecha, M=%s' % M5)
        x5 = 2 - d5
        ok(0 < 2 - x5 < 1/M5 and M5 < 1/(2 - x5) and f5(x5) == -1/(2 - x5) < -M5, 'H05 k2 izquierda, M=%s' % M5)
        # los demás topes de la hoja, con el mismo razonamiento
        ok(M5 < 1/((1 + d5) - 1) == v5(1 + d5), 'H05 ej3 tope'); ok(k5(-d5) == -1/d5 < -M5, 'H05 B tope en 0')
        ok(w5(4 - 3*d5) == 3/(3*d5) > M5 and w5(4 + 3*d5) == -3/(3*d5) < -M5 and M5*(3*d5) < 3, 'H05 ej2 tope 3/M')
        ok(u5(-1 + 4*d5) > M5 and u5(-1 - 4*d5) < -M5 and M5*(4*d5) < 4, 'H05 A tope 4/M')
        ok(T5(60*d5) > M5 and M5*(60*d5) < 60, 'H05 C tope 60/M')
        if M5 >= 1:
            for s5 in (1, -1):
                ok(d5*d5 < 1/M5**2 <= 1/M5 and q5(3 + s5*d5) > M5, 'H05 ej1 tope con M ≥ 1')
            ok(k5(3 + d5) == 2*q5(3 + d5) > 2*M5 > M5, 'H05 B tope en 3')
        else:
            ok(all(q5(3 + s5*t5) > 1 > M5 for s5 in (1, -1)), 'H05 ej1: un tope menor que 1 se supera con los x del tope 1')
# 3) tabla del recuadro k2: tope, 1/M, x de prueba, x − 2, f(x)
TB5 = re.findall(r'<table class="tbl">(.*?)</table>', A5, re.S); ok(len(TB5) == 2, 'H05 n.º de tablas')
FK5 = [[D(z5.strip('\\() ')) for z5 in r5] for r5 in filas(TB5[0])]
ok([r5[0] for r5 in FK5] == [5, 10, 100, 1000], 'H05 tabla k2: topes')
for M5, i5, x5, d5, y5 in FK5:
    ok(i5 == 1/M5 and d5 == x5 - 2 and 0 < d5 < i5 and y5 == f5(x5) == 1/d5 and y5 > M5, 'H05 tabla k2 fila M=%s' % M5)
ok(Fr('2.05') - 2 == Fr('0.05') and 0 < Fr('0.05') < Fr('0.1') and f5(Fr('2.05')) == 20 > 10, 'H05 k2 fila de muestra')
# 4) recuadro k3: p coincide con f fuera de 2 y p(2) = 1
ok(p5(2) == 1 and all(p5(x5) == f5(x5) for x5 in RJ if x5 != 2), 'H05 k3: p = f si x ≠ 2, p(2) = 1')
# 5) ejemplos
ok([q5(Fr(x5)) for x5 in ('2.9', '2.99', '3.1', '3.01')] == [100, 10000, 100, 10000] and Fr('-0.1')**2 == Fr('0.01') == Fr('0.1')**2 and Fr('0.01')**2 == Fr('0.0001') == Fr('-0.01')**2, 'H05 ej1 valores')
ok([w5(Fr(x5)) for x5 in ('3.9', '3.99', '4.1', '4.01')] == [30, 300, -30, -300], 'H05 ej2 valores')
ok([v5(Fr(x5)) for x5 in ('0.9', '0.99', '1', '1.1', '1.01')] == [Fr('1.9'), Fr('1.99'), 2, 10, 100], 'H05 ej3 valores y v(1) = 2')
ok(all(abs(y5 - 2) == Fr(1, 10**j5) for j5, y5 in enumerate(llegada(v5, Fr(1), -1), 1)), 'H05 ej3: por la izquierda llega a 2')
FG5 = [[D(z5.strip('\\() ')) for z5 in r5] for r5 in filas(TB5[1])]
ok([r5[0] for r5 in FG5] == [Fr('1.9'), Fr('1.99'), Fr('2.01'), Fr('2.1')], 'H05 tabla ej4: valores de x')
for x5, y5, z5 in FG5: ok(y5 == g5(x5) == x5 + 2 and z5 == f5(x5), 'H05 tabla ej4 fila x=%s' % x5)
ok(Fr('1.99')**2 == Fr('3.9601') and Fr('3.9601') - 4 == Fr('-0.0399') and Fr('1.99') - 2 == Fr('-0.01') and Fr('-0.0399')/Fr('-0.01') == Fr('3.99') and 2**2 - 4 == 0, 'H05 ej4 fila de muestra')
ok(all(abs(y5 - 4) == Fr(1, 10**j5) for s5 in (1, -1) for j5, y5 in enumerate(llegada(g5, Fr(2), s5), 1)), 'H05 ej4: g llega a 4 por los dos lados (hueco en (2, 4))')
for x5 in RJ:
    ok(x5*x5 - 4 == (x5 - 2)*(x5 + 2), 'H05 ej4 factorización')
    if x5 != 2: ok(g5(x5) == x5 + 2 and f5(x5) == -1/(2 - x5), 'H05: g(x) = x + 2 y 1/(x − 2) = −1/(2 − x)')
    if x5 != 4: ok(w5(x5) == -3/(x5 - 4), 'H05 ej2: 3/(4 − x) = −3/(x − 4)')
    if x5 != -1: ok(u5(x5) == -4/(-(x5 + 1)), 'H05 A: 4/(x + 1) = −4/(−(x + 1))')
    if x5 != 0: ok(1/x5 == -1/(-x5), 'H05 B: 1/x = −1/(−x)')
    if x5 != 3: ok((x5 - 3)**2 == (3 - x5)**2 > 0, 'H05 ej1: (x − 3)² = (3 − x)² > 0')
# 6) ejercicios
ok([u5(Fr(x5)) for x5 in ('-1.1', '-1.01', '-0.9', '-0.99')] == [-40, -400, 40, 400] and Fr(4, 1000) == Fr('0.004') and -1 + Fr('0.004') == Fr('-0.996') and Fr('-0.998') + 1 == Fr('0.002') and u5(Fr('-0.998')) == 2000 > 1000 and -1 < Fr('-0.998') < Fr('-0.996'), 'H05 A')
ok(all(u5(-1 + t5*Fr('0.004')) > 1000 for t5 in TS5) and u5(Fr('-0.996')) == 1000, 'H05 A c): el tramo 0 < x + 1 < 0,004 y su borde')
ok([k5(Fr(x5)) for x5 in ('-0.1', '-0.01', '0', '0.1', '0.01', '2.9', '2.99', '3.1', '3.01')] == [-10, -100, 1, Fr('1.1'), Fr('1.01'), Fr('3.9'), Fr('3.99'), 200, 20000], 'H05 B valores')
ok(all(abs(y5 - 1) == Fr(1, 10**j5) for j5, y5 in enumerate(llegada(k5, Fr(0), 1), 1)) and all(abs(y5 - 4) == Fr(1, 10**j5) for j5, y5 in enumerate(llegada(k5, Fr(3), -1), 1)), 'H05 B: laterales finitos 1 (en 0⁺) y 4 (en 3⁻)')
ok([T5(Fr(x5)) for x5 in ('60', '30', '10', '1', '0.1', '0.05')] == [1, 2, 6, 60, 600, 1200] and Fr(60, 1000) == Fr('0.06') and 0 < Fr('0.05') < Fr('0.06') and T5(Fr('0.06')) == 1000, 'H05 C valores y borde 0,06')
ok(all(T5(t5*Fr('0.06')) > 1000 for t5 in TS5), 'H05 C: con 0 < v < 0,06 el viaje demora más de 1000 horas')
# 7) lo que la hoja afirma con palabras o símbolos, escrito tal cual
for s5 in ['\\lim_{x\\to 2^{+}}f(x)=+\\infty', '\\lim_{x\\to 2^{-}}f(x)=-\\infty', '\\lim_{x\\to 3^{-}}q(x)=+\\infty', '\\lim_{x\\to 3^{+}}q(x)=+\\infty', '\\lim_{x\\to 4^{-}}w(x)=+\\infty', '\\lim_{x\\to 4^{+}}w(x)=-\\infty',
           '\\lim_{x\\to 1^{-}}v(x)=2', '\\lim_{x\\to 1^{+}}v(x)=+\\infty', '\\lim_{x\\to 2^{-}}g(x)=4', '\\lim_{x\\to 2^{+}}g(x)=4', '\\lim_{x\\to -1^{+}}u(x)=+\\infty', '\\lim_{x\\to -1^{-}}u(x)=-\\infty',
           '\\lim_{x\\to 0^{-}}k(x)=-\\infty', '\\lim_{x\\to 0^{+}}k(x)=1', '\\lim_{x\\to 3^{-}}k(x)=4', '\\lim_{x\\to 3^{+}}k(x)=+\\infty', '\\lim_{v\\to 0^{+}}T(v)=+\\infty',
           '20\\gt 10', '0\\lt 0{,}05\\lt 0{,}1', '-1\\lt x\\lt -0{,}996', 'hueco en \\((2,4)\\)', 'punto lleno \\((1,2)\\)', 'punto lleno \\((0,1)\\)', 'círculo vacío en \\((3,4)\\)', 'no existe', 'al menos uno', 'no son números', 'es una estimación', 'sin demostrar']:
    ok(s5 in A5, 'H05: la hoja no trae «%s»' % s5)
ok(k5(Fr(0)) == 1 and v5(Fr(1)) == 2 and 3 + 1 == 4, 'H05: puntos marcados de las gráficas descritas')
# <<< H05

# >>> H06
# ───────── H06: aproximar límites a partir de tablas (la tabla se construye con la fórmula) ─────────
A6, E6 = molde('06', 'H06_aproximar_limites_a_partir_de_tablas.html', 'Aproximar límites a partir de tablas', 'lim-tabla', 'Límites a partir de tablas', ['tab-idea'], 1)
def f6(x):
    assert x != 1
    return (x**3 - 1)/(x - 1)
def g6(x):
    assert x != 2
    return (x*x - 5*x + 6)/(x - 2)
def r6(x):
    assert x != Fr(1, 2)
    return (x*x - Fr(1, 4))/(x - Fr(1, 2))
def w6(x):
    assert x != 1
    return (x*x + x - 2)/(2*x - 2)
def u6(x):
    assert x != -1
    return (x*x - x - 2)/(x + 1)
def p6(x):
    assert x != 4
    return (x*x - 3*x - 4)/(x - 4)
def q6(x):
    assert x != 2
    return (x**3 - 8)/(x - 2)
def V6(t):
    assert 0 <= t <= 5
    return 2*t*t + 3*t
def m6(t):
    assert t != 2 and 0 <= t <= 5
    return (V6(t) - V6(Fr(2)))/(t - 2)
FUN6 = {'f': f6, 'g': g6, 'r': r6, 'w': w6, 'u': u6, 'p': p6, 'q': q6, 'V': V6, 'm': m6}
valores('H06 hoja', mates_de(A6), FUN6, 9)
def comprobar6():
    """todas las cuentas de H06; va en una función para no pisar nombres globales del verificador (h, x, a, L, r…)"""
    t6 = lambda z: tex(z, 9)                                             # hasta 9 decimales exactos (0,999³ = 0,997002999)
    s6 = lambda z: t6(z).replace('{,}', ',').replace('-', '−')           # el mismo número como texto del lienzo
    I6 = lambda x: x
    # 1) las ocho tablas de la hoja, casilla por casilla: [nombre, a, candidato L, una función exacta por columna]
    TAB6 = [('f', Fr(1), Fr(3), [I6, lambda x: x**3, lambda x: x**3 - 1, lambda x: x - 1, f6]),
            ('g', Fr(2), Fr(-1), [I6, lambda x: x*x, lambda x: 5*x, lambda x: x*x - 5*x + 6, lambda x: x - 2, g6]),
            ('r', Fr(1, 2), Fr(1), [I6, lambda x: x*x, lambda x: x*x - Fr(1, 4), lambda x: x - Fr(1, 2), r6]),
            ('w', Fr(1), Fr(3, 2), [I6, lambda x: x*x, lambda x: x*x + x - 2, lambda x: 2*x - 2, w6]),
            ('u', Fr(-1), Fr(-3), [I6, lambda x: x*x, lambda x: x*x - x - 2, lambda x: x + 1, u6]),
            ('p', Fr(4), Fr(5), [I6, lambda x: x*x, lambda x: 3*x, lambda x: x*x - 3*x - 4, lambda x: x - 4, p6]),
            ('q', Fr(2), Fr(12), [I6, lambda x: x*x, lambda x: x**3, lambda x: x**3 - 8, lambda x: x - 2, q6]),
            ('m', Fr(2), Fr(11), [I6, lambda t: t*t, lambda t: 2*t*t, lambda t: 3*t, V6, lambda t: V6(t) - 14, lambda t: t - 2, m6])]
    TH6 = re.findall(r'<table class="tbl">(.*?)</table>', A6, re.S); ok(len(TH6) == len(TAB6) == 8, 'H06 n.º de tablas')
    DIST6 = {}
    for th, (nom, a, L, cols) in zip(TH6, TAB6):
        FL = [re.findall(r'<td[^>]*>(.*?)</td>', r) for r in re.findall(r'<tr>(.*?)</tr>', th, re.S) if '<td' in r]
        xs = [a - Fr(1, 10), a - Fr(1, 100), a - Fr(1, 1000), a, a + Fr(1, 1000), a + Fr(1, 100), a + Fr(1, 10)]
        ok(len(FL) == 7 and [D(r[0].strip('\\() ')) for r in FL] == xs, 'H06 tabla %s: valores de x (a ± 0,1; a ± 0,01; a ± 0,001 y a)' % nom)
        ok(len(re.findall(r'<th>', th)) == len(cols) + 1, 'H06 tabla %s: n.º de columnas' % nom)
        for r in FL:
            x = D(r[0].strip('\\() '))
            if x == a: ok(len(r) == 2 and 'no se calcula' in r[1], 'H06 tabla %s: la fila x = a no se calcula' % nom); continue
            v = [D(z.strip('\\() ')) for z in r]
            ok(v[:-1] == [c(x) for c in cols], 'H06 tabla %s fila x=%s: %s' % (nom, x, v))
            ok(v[-1] == abs(FUN6[nom](x) - L), 'H06 tabla %s fila x=%s: distancia al candidato' % (nom, x))
        iz = [abs(FUN6[nom](x) - L) for x in xs[:3]]; de = [abs(FUN6[nom](x) - L) for x in xs[:3:-1]]; DIST6[nom] = (iz, de)
        ok(all(0 < d for d in iz + de) and all(Fr(96, 10) < l[i]/l[i + 1] < Fr(104, 10) for l in (iz, de) for i in (0, 1)), 'H06 tabla %s: la distancia se achica unas 10 veces por fila' % nom)
        ok(all(FUN6[nom](x) != L for x in xs if x != a), 'H06 tabla %s: ningún valor es igual al candidato' % nom)
    ok(DIST6['f'] == ([Fr('0.29'), Fr('0.0299'), Fr('0.002999')], [Fr('0.31'), Fr('0.0301'), Fr('0.003001')]), 'H06 distancias a 3 de la función ancla')
    # las listas de distancias que la hoja escribe en palabras
    lista6 = lambda l: '; '.join('\\(%s\\)' % t6(z) for z in l)
    for nom in ('g', 'r', 'w', 'u', 'p', 'm'):
        ok(DIST6[nom][0] == DIST6[nom][1] and lista6(DIST6[nom][0]) + ' por cada lado' in A6, 'H06: distancias de %s escritas en la hoja' % nom)
    ok(lista6(DIST6['q'][0]) + ' por la izquierda y ' + lista6(DIST6['q'][1]) + ' por la derecha' in A6, 'H06 B: distancias a 12')
    ok('pasan de \\(%s\\) a \\(%s\\) y de \\(%s\\) a \\(%s\\)' % (t6(DIST6['f'][0][0]), t6(DIST6['f'][0][2]), t6(DIST6['f'][1][0]), t6(DIST6['f'][1][2])) in A6, 'H06 k1: lectura de la tabla ancla')
    # 2) k2 (la cuenta con x = 1 + h) y las identidades de la hoja, en rejilla
    for h in RJ:
        ok((1 + h)**2 == 1 + 2*h + h*h and (1 + 2*h + h*h)*(1 + h) == 1 + h + 2*h + 2*h*h + h*h + h**3 == 1 + 3*h + 3*h*h + h**3 == (1 + h)**3, 'H06 k2: cubo del binomio')
        ok((1 + h)**3 - 1 == 3*h + 3*h*h + h**3 == h*(3 + 3*h + h*h) and (1 + h) - 1 == h, 'H06 k2: numerador y denominador')
        if h != 0: ok(f6(1 + h) == 3 + 3*h + h*h and abs(f6(1 + h) - 3) == abs(3*h + h*h) == abs(h)*abs(3 + h), 'H06 k2: f(1 + h) = 3 + 3h + h² y distancia')
        x = h
        ok((x - 1)*(x*x + x + 1) == x**3 + x*x + x - x*x - x - 1 == x**3 - 1, 'H06 k2: (x − 1)(x² + x + 1) = x³ − 1')
        ok((x - 2)*(x - 3) == x*x - 3*x - 2*x + 6 == x*x - 5*x + 6 and (x - Fr(1, 2))*(x + Fr(1, 2)) == x*x + x/2 - x/2 - Fr(1, 4) == x*x - Fr(1, 4), 'H06 ej1 y ej2: factorizaciones')
        ok((x - 1)*(x + 2) == x*x + 2*x - x - 2 == x*x + x - 2 and 2*x - 2 == 2*(x - 1) and (x + 1)*(x - 2) == x*x - 2*x + x - 2 == x*x - x - 2, 'H06 ej3 y ej4: factorizaciones')
        ok((x - 4)*(x + 1) == x*x + x - 4*x - 4 == x*x - 3*x - 4 and (x - 2)*(x*x + 2*x + 4) == x**3 + 2*x*x + 4*x - 2*x*x - 4*x - 8 == x**3 - 8 and (x - 2)*(2*x + 7) == 2*x*x + 7*x - 4*x - 14 == 2*x*x + 3*x - 14, 'H06 A, B y C: factorizaciones')
        if x != 1: ok(f6(x) == x*x + x + 1 and w6(x) == (x + 2)/2 and ((f6(x) == 3) == (x == -2)), 'H06: f = x² + x + 1, w = (x + 2)/2 y f(x) = 3 solo en x = −2')
        if x != 2: ok(g6(x) == x - 3 and q6(x) == x*x + 2*x + 4 and (not 0 <= x <= 5 or m6(x) == 2*x + 7), 'H06: g = x − 3, q = x² + 2x + 4, m = 2t + 7')
        if x != Fr(1, 2): ok(r6(x) == x + Fr(1, 2), 'H06: r = x + 0,5')
        if x != -1: ok(u6(x) == x - 2, 'H06: u = x − 2')
        if x != 4: ok(p6(x) == x + 1, 'H06: p = x + 1')
    for k in range(1, 1001):                                              # 0 < |h| ≤ 0,1, en rejilla de diezmilésimas
        for h in (Fr(k, 10000), -Fr(k, 10000)):
            ok(Fr('2.9') <= 3 + h <= Fr('3.1') and Fr('2.9')*abs(h) <= abs(f6(1 + h) - 3) <= Fr('3.1')*abs(h), 'H06 k2: distancia entre 2,9|h| y 3,1|h| (h=%s)' % h)
    ok(f6(Fr(-2)) == Fr(-8 - 1, -2 - 1) == 3 and (-2)**2 + (-2) - 2 == 0 and 1 + 1 - 2 == 0, 'H06 k3: f(−2) = 3 y raíces de x² + x − 2')
    # 3) k3 y ejercicio B: lo que hace el redondeo
    ok(round(Fr('2.997001'), 2) == 3 == round(Fr('3.003001'), 2) and f6(Fr('0.999')) == Fr('2.997001') and f6(Fr('1.001')) == Fr('3.003001'), 'H06 k3: 2,997001 y 3,003001 a dos decimales son 3,00')
    ok(Fr('0.999')**3 == Fr('0.997002999') and round(Fr('0.997002999'), 3) == Fr('0.997') and Fr('0.997') - 1 == Fr('-0.003') and Fr('-0.003')/Fr('-0.001') == 3, 'H06 k3: redondeo a mitad de la cuenta')
    ok(q6(Fr('1.999')) == Fr('11.994001') and q6(Fr('2.001')) == Fr('12.006001') and round(Fr('11.994001'), 1) == 12 == round(Fr('12.006001'), 1), 'H06 B: redondeo a un decimal')
    # 4) ejemplo 3 (otro candidato) y límites por reemplazo
    ok([abs(w6(Fr(x)) - Fr('1.4')) for x in ('0.9', '0.99', '0.999')] == [Fr('0.05'), Fr('0.095'), Fr('0.0995')] and Fr('0.05') < Fr('0.095') < Fr('0.0995'), 'H06 ej3: con el candidato 1,4 las distancias crecen')
    ok(1 + 1 + 1 == 3 and 2 - 3 == -1 and Fr(1, 2) + Fr(1, 2) == 1 and Fr(1 + 2, 2) == Fr('1.5') and -1 - 2 == -3 and 4 + 1 == 5 and 2**2 + 2*2 + 4 == 12 and 2*2 + 7 == 11 and V6(Fr(2)) == 14, 'H06: límites por reemplazo y V(2)')
    # 5) la escena «tab-idea»: datos, textos de respaldo y frases (literales del código), armados con fracciones
    IZ6 = [Fr('0.9'), Fr('0.99'), Fr('0.999')]; DE6 = [Fr('1.1'), Fr('1.01'), Fr('1.001')]
    ok('var IZ = [[9, 1], [99, 2], [999, 3]].map(lm06Fila), DE = [[11, 1], [101, 2], [1001, 3]].map(lm06Fila);' in E6 and 'v = n2 + n*D + D*D' in E6 and 'function GX(w){ return 2 + (w - 3)*7.6; }' in E6, 'H06 escena: valores de x y fórmula exacta de la fila')
    for n, k in [(9, 1), (99, 2), (999, 3), (11, 1), (101, 2), (1001, 3)]:
        ok(Fr(n*n + n*10**k + 10**(2*k), 10**(2*k)) == f6(Fr(n, 10**k)), 'H06 escena: (n² + nD + D²)/D² = f(n/D), n=%d' % n)
    ok("'x: %s y %s'" % ('; '.join(map(s6, IZ6)), '; '.join(map(s6, DE6))) in E6, 'H06 escena: respaldo de R1')
    ok("'izquierda: f(x) vale %s'" % '; '.join(s6(f6(x)) for x in IZ6) in E6 and "'derecha: f(x) vale %s'" % '; '.join(s6(f6(x)) for x in DE6) in E6, 'H06 escena: respaldos de R2 y R3')
    ok("'|f(x) − 3| baja a %s y a %s'" % (s6(abs(f6(IZ6[2]) - 3)), s6(abs(f6(DE6[2]) - 3))) in E6, 'H06 escena: respaldo de R4')
    ok('suben: %s.' % '; '.join(s6(f6(x)) for x in IZ6) in E6 and 'bajan: %s.' % '; '.join(s6(f6(x)) for x in DE6) in E6, 'H06 escena: frases de los pasos 2 y 3')
    ok([f6(x) for x in IZ6] == sorted(f6(x) for x in IZ6) and all(f6(x) < 3 for x in IZ6) and [f6(x) for x in DE6] == sorted((f6(x) for x in DE6), reverse=True) and all(f6(x) > 3 for x in DE6), 'H06 escena: por la izquierda suben hacia 3 y por la derecha bajan hacia 3')
    # 6) la escena, con el código real (node): etiquetas del registro y lectura completa, comparadas con lo armado aquí con fracciones
    def cuenta6(x): return 'x=%s:\\ \\ %s^{2}=%s\\\\&\\qquad %s^{3}=%s\\cdot %s=%s\\\\&\\qquad f(%s)=\\tfrac{%s-1}{%s-1}=\\tfrac{%s}{%s}=%s' % (t6(x), t6(x), t6(x*x), t6(x), t6(x*x), t6(x), t6(x**3), t6(x), t6(x**3), t6(x), t6(x**3 - 1), t6(x - 1), t6(f6(x)))
    def dist6(L): return '|%s-3|=%s;\\ \\ |%s-3|=%s\\\\&\\qquad |%s-3|=%s' % tuple(z for x in L for z in (t6(f6(x)), t6(abs(f6(x) - 3))))
    LEC6 = ['f(x)=\\tfrac{x^{3}-1}{x-1};\\quad a=1\\\\&\\qquad \\text{en }x=1:\\ \\ 1^{3}-1=0\\ \\text{ y }\\ 1-1=0\\ \\text{ (no se calcula)}\\\\&\\qquad x<1:\\ \\ ' + ';\\ \\ '.join('1-%s=%s' % (t6(1 - x), t6(x)) for x in IZ6) + '\\\\&\\qquad x>1:\\ \\ ' + ';\\ \\ '.join('1+%s=%s' % (t6(x - 1), t6(x)) for x in DE6),
            '\\text{izquierda, fila por fila:}\\\\&\\qquad ' + '\\\\&\\qquad '.join(cuenta6(x) for x in IZ6),
            '\\text{derecha, fila por fila:}\\\\&\\qquad ' + '\\\\&\\qquad '.join(cuenta6(x) for x in DE6),
            '\\text{candidato: }3;\\ \\text{distancia de cada valor a }3\\\\&\\qquad x<1:\\ \\ ' + dist6(IZ6) + '\\\\&\\qquad x>1:\\ \\ ' + dist6(DE6) + '\\\\&\\qquad \\text{cada distancia: unas 10 veces menor que la anterior}',
            '\\text{la tabla sugiere: }\\lim_{x\\to 1}f(x)\\approx 3\\\\&\\qquad \\text{es una estimación: seis valores no demuestran}',
            'x^{3}-1=(x-1)(x^{2}+x+1)\\\\&\\qquad x\\ne 1:\\ \\ f(x)=\\tfrac{(x-1)(x^{2}+x+1)}{x-1}=x^{2}+x+1\\\\&\\qquad x\\to 1:\\ \\ 1^{2}+1+1=3\\\\&\\qquad \\lim_{x\\to 1}f(x)=3\\ \\ \\text{(la tabla acertó)}']
    NODO6 = r"""
    const fs = require('fs'), p = process.argv[process.argv.length - 1];
    global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; } };
    (0, eval)(['_txt.js', '_det.js', '_lim.js', '06.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
    var S = OA.scenes['tab-idea'], lab = {}; S.labels.forEach(function(l){ lab[l[0]] = l; });
    console.log(JSON.stringify({lab: lab, lect: [1, 2, 3, 4, 5, 6].map(function(k){ return S.readout({paso: k})[0][1]; }), filas: [[9, 1], [99, 2], [999, 3], [11, 1], [101, 2], [1001, 3]].map(lm06Fila)}));
    """
    if not SIN_NODO:
        N6 = json.loads(subprocess.run(['node', '-e', NODO6, str(PARTES)], capture_output=True, text=True, check=True).stdout)
        for k in range(6):
            ok(N6['lect'][k] == '\\begin{aligned}' + '\\\\[5pt]'.join('&\\textbf{%d.}\\ \\ %s' % (i + 1, LEC6[i]) for i in range(k + 1)) + '\\end{aligned}', 'H06 escena: la lectura del paso %d no calza con la cuenta exacta' % (k + 1))
        ok(N6['lab']['R1'][1] == 'x:\\ \\ ' + ';\\ '.join(map(t6, IZ6)) + '\\ \\ \\text{y}\\ \\ ' + ';\\ '.join(map(t6, DE6)), 'H06 escena: registro R1')
        ok(N6['lab']['R2'][1] == '\\text{izquierda: }f(x)\\text{ vale }' + ';\\ '.join(t6(f6(x)) for x in IZ6) and N6['lab']['R3'][1] == '\\text{derecha: }f(x)\\text{ vale }' + ';\\ '.join(t6(f6(x)) for x in DE6), 'H06 escena: registros R2 y R3')
        ok(N6['lab']['R4'][1] == '|f(x)-3|\\ \\text{baja a }%s\\ \\text{ y a }\\ %s' % (t6(abs(f6(IZ6[2]) - 3)), t6(abs(f6(DE6[2]) - 3))), 'H06 escena: registro R4')
        ok(all(l[2].replace('−', '-').replace(' ', '') == re.sub(r'\\text\{([^}]*)\}', r'\1', l[1]).replace('{,}', ',').replace('\\ ', '').replace(' ', '') for i, l in N6['lab'].items() if i in ('R1', 'R2', 'R3', 'R4')), 'H06 escena: el texto de respaldo de R1–R4 dice lo mismo que el TeX')
        for x, F6 in zip(IZ6 + DE6, N6['filas']):
            ok((F6['tx'], F6['tf'], F6['td']) == (s6(x), s6(f6(x)), s6(abs(f6(x) - 3))) and abs(F6['val'] - float(f6(x))) < 1e-12, 'H06 escena: números dibujados en la fila x=%s' % x)
comprobar6()
# <<< H06

# >>> H07
# ───────── H07: estimar límites a partir de tablas (la tabla viene dada) ─────────
A7, E7 = molde('07', 'H07_estimar_limites_a_partir_de_tablas.html', 'Estimar límites a partir de tablas', 'lim-estima', 'Límites a partir de tablas', ['est-idea'], 1)
def T7(x): return x + 3 if x != 2 else Fr(1)                                     # función ancla: (x² + x − 6)/(x − 2) si x ≠ 2; T(2) = 1
def S7(x): return Fr(1) if x == 2 else (Fr(7) if Fr('1.999') < x < Fr('2.001') else x + 3)   # misma tabla que T, otro límite
def w7(x):
    assert x != 4
    return 2/(x - 4)**2
def f7(x): return 3*x if x != 1 else Fr(6)
def g7(x):
    assert x != 4
    return 2*x - 1 if x < 4 else 7 + (x - 4)**2
def h7(x): return 3 - x if x <= 1 else 4 + x
M7 = {Fr('9.7'): Fr('41.4'), Fr('9.9'): Fr('41.8'), Fr('9.95'): Fr('41.9'), Fr('10.05'): Fr('42.1'), Fr('10.1'): Fr('42.2'), Fr('10.3'): Fr('42.6')}   # datos medidos (sin fórmula)
def p7(x): return (x - 1)/2 if x != 3 else Fr(4)
def q7(x):
    assert x != 2
    return x - 5 if x < 2 else 5 - x
def R7(t): return 18 + Fr(2, 5)*t                                                # modelo del ejercicio C
FUN7 = {'T': T7, 'S': S7, 'w': w7, 'f': f7, 'g': g7, 'h': h7, 'M': lambda t: M7[t], 'p': p7, 'q': q7, 'R': R7}
valores('H07 hoja', mates_de(A7), FUN7, 16)
def celda7(z):
    z = z.strip()
    if not z.startswith('\\('): return z                                          # «no definida», «sin lectura»
    return D(z[2:-2].replace('\\,', ''))
TB7 = [[[celda7(z) for z in re.findall(r'<td>(.*?)</td>', r)] for r in re.findall(r'<tr>(.*?)</tr>', t, re.S)] for t in re.findall(r'<table class="tbl">(.*?)</table>', A7, re.S)]
ok(len(TB7) == 10, 'H07 n.º de tablas')
def tabla7(et, t, a, funs, en_a, L):
    """tabla dada: fila de x, luego una fila por función; columna x = a (si viene) con lo que dice la hoja; L = (número del lado izquierdo, del derecho) o None"""
    xs = t[0]; ok(len(t) == 1 + len(funs) and all(len(r) == len(xs) for r in t) and xs == sorted(xs) and len(set(xs)) == len(xs), et + ': forma de la tabla')
    ok((a in xs) == (en_a is not None), et + ': columna x = a')
    ok(len([x for x in xs if x < a]) == 3 and len([x for x in xs if x > a]) == 3, et + ': tres columnas por lado')
    for F, fila in zip(funs, t[1:]):
        for x, v in zip(xs, fila):
            if x == a: ok(v == en_a, '%s: la columna x = a dice %s' % (et, v))
            else: ok(v == F(x), '%s: valor en x = %s' % (et, x))
    if L is None: return
    F = funs[0]
    for lado, Ll in ((-1, L[0]), (1, L[1])):
        orden = sorted([x for x in xs if (x - a)*lado > 0], key=lambda x: abs(x - a), reverse=True)   # en el orden en que x se acerca a a
        ds = [abs(F(x) - Ll) for x in orden]
        ok(ds == sorted(ds, reverse=True) and len(set(ds)) == 3 and ds[-1] > 0, '%s: las distancias a %s se achican (lado %d)' % (et, Ll, lado))
        ok('; '.join('\\(%s\\)' % tex(F(x)) for x in orden) in A7, '%s: la hoja no trae la lectura del lado %d en orden' % (et, lado))
        for x, d in zip(orden, ds):
            cad = '|%s-%s|=%s' % (tex(F(x)), tex(Ll) if Ll >= 0 else '(%s)' % tex(Ll), tex(d))
            ok(cad in A7 or cad.replace('|', '\\|') in E7 or cad in E7, '%s: falta la distancia «%s»' % (et, cad))
def acerca7(et, F, a, lado, Ll):
    """con la fórmula: los valores en a ± 10^-k se acercan a Ll (distancias decrecientes, la última menor que 10^-5)"""
    ds = [abs(F(a + lado*Fr(1, 10**k)) - Ll) for k in range(1, 8)]
    ok(ds == sorted(ds, reverse=True) and ds[-1] < Fr(1, 10**5) and all(ds[i + 1] <= ds[i]/10 for i in range(6)), '%s: llegada %s por el lado %d' % (et, Ll, lado))
tabla7('H07 tabla de T', TB7[0], 2, [T7], 1, (5, 5)); acerca7('H07 T', T7, Fr(2), -1, 5); acerca7('H07 T', T7, Fr(2), 1, 5)
# k2: dos funciones con la misma tabla y límites distintos
X7 = TB7[1][0]; ok(X7 == [Fr(z) for z in ('1.9', '1.99', '1.999', '1.9995', '2.0005', '2.001', '2.01', '2.1')] and TB7[1][1] == [T7(x) for x in X7] and TB7[1][2] == [S7(x) for x in X7] and len(TB7[1]) == 3, 'H07 k2 tabla de T y S')
ok(all(S7(x) == T7(x) == x + 3 and (x <= Fr('1.999') or x >= Fr('2.001')) for x in TB7[0][0] if x != 2) and S7(Fr(2)) == T7(Fr(2)) == 1, 'H07 k2: S y T coinciden en los x de la tabla')
ok(all('\\(%s+3=%s\\)' % (tex(x), tex(x + 3)) in A7 for x in TB7[0][0] if x != 2), 'H07 k2: las seis sumas están escritas')
ok(T7(Fr('1.9995')) == Fr('4.9995') and T7(Fr('2.0005')) == Fr('5.0005') and S7(Fr('1.9995')) == 7 == S7(Fr('2.0005')) and 7 != 5, 'H07 k2: más cerca de 2 se separan')
for k7 in range(1, 400):
    for x in (2 - Fr(k7, 400000), 2 + Fr(k7, 400000)):
        ok(0 < abs(x - 2) < Fr('0.001') and S7(x) == 7 and abs(T7(x) - 5) == abs(x - 2), 'H07 k2: cerca de 2, S = 7 y |T − 5| = |x − 2| (x=%s)' % x)
for x in RJ:
    ok(x*x + x - 6 == (x - 2)*(x + 3), 'H07 factorización de x² + x − 6')
    if x != 2: ok((x*x + x - 6)/(x - 2) == x + 3 == T7(x), 'H07: T(x) = x + 3 si x ≠ 2')
ok(all((x*x + x - 6)/(x - 2) == T7(x) for x in TB7[0][0] if x != 2), 'H07: la tabla de T sale de la fórmula racional')
# k3: valores que crecen sin tope
tabla7('H07 k3 tabla de w', TB7[2], 4, [w7], 'no definida', None)
ok(TB7[2][1][:3] == [200, 20000, 2000000] and TB7[2][1][4:] == [2000000, 20000, 200] and 200*100 == 20000 and 20000*100 == 2000000, 'H07 k3: cada valor es 100 veces el anterior')
ok(Fr('3.9') - 4 == Fr('-0.1') and Fr('-0.1')**2 == Fr('0.01') and 2/Fr('0.01') == 200, 'H07 k3 valor de muestra')
for n7 in range(1, 41):
    for k7 in range(1, 30):
        for x in (4 - Fr(k7, 30*n7), 4 + Fr(k7, 30*n7)):
            ok(0 < abs(x - 4) < Fr(1, n7) and (x - 4)**2 < Fr(1, n7*n7) and w7(x) > 2*n7*n7, 'H07 k3: w supera el tope 2n² (n=%d)' % n7)
# ejemplos
tabla7('H07 ej1', TB7[3], 1, [f7], 6, (3, 3)); acerca7('H07 ej1', f7, Fr(1), -1, 3); acerca7('H07 ej1', f7, Fr(1), 1, 3)
ok(f7(Fr(1)) == 6 != 3 and 3*Fr('0.9') == Fr('2.7') and 3*Fr('1.1') == Fr('3.3') and 3*1 == 3, 'H07 ej1: f(1) = 6 y confirmación')
tabla7('H07 ej2', TB7[4], 4, [g7], None, (7, 7)); acerca7('H07 ej2', g7, Fr(4), -1, 7); acerca7('H07 ej2', g7, Fr(4), 1, 7)
ok(7 not in TB7[4][1] and 2*Fr('3.9') - 1 == Fr('6.8') and Fr('4.2') - 4 == Fr('0.2') and Fr('0.2')**2 == Fr('0.04') and 7 + Fr('0.04') == Fr('7.04') and 2*4 - 1 == 7 and 7 + 0 == 7, 'H07 ej2: el 7 no está en la tabla; confirmación')
ok([abs(v - 7) for v in TB7[4][1]] == [1, Fr('0.2'), Fr('0.02'), Fr('0.0001'), Fr('0.04'), Fr('0.25')] and Fr('0.0001') < Fr('0.02'), 'H07 ej2: la derecha se acerca más rápido')
ok(sorted(abs(x - 4) for x in TB7[4][0][:3]) == [Fr('0.01'), Fr('0.1'), Fr('0.5')] != sorted(abs(x - 4) for x in TB7[4][0][3:]) == [Fr('0.01'), Fr('0.2'), Fr('0.5')], 'H07 ej2: los x de un lado no están a las mismas distancias que los del otro')
tabla7('H07 ej3', TB7[5], 1, [h7], 2, (2, 5)); acerca7('H07 ej3', h7, Fr(1), -1, 2); acerca7('H07 ej3', h7, Fr(1), 1, 5)
ok(h7(Fr(1)) == 3 - 1 == 2 and 4 + 1 == 5 and 2 != 5, 'H07 ej3: laterales 2 y 5, h(1) = 2')
tabla7('H07 ej4', TB7[6], 10, [lambda t: M7[t]], 'sin lectura', (42, 42))
ok(max(v for v in M7.values() if v < 42) == Fr('41.9') and min(v for v in M7.values() if v > 42) == Fr('42.1') and all(ndec(v) <= 1 for v in M7.values()), 'H07 ej4: valores más cercanos a 42 y décimas')
# ejercicios
tabla7('H07 A', TB7[7], 3, [p7], 4, (1, 1)); acerca7('H07 A', p7, Fr(3), -1, 1); acerca7('H07 A', p7, Fr(3), 1, 1)
ok(1 not in TB7[7][1] and p7(Fr(3)) == 4 != 1 and Fr('2.9') - 1 == Fr('1.9') and Fr('1.9')/2 == Fr('0.95') and Fr(3 - 1, 2) == 1, 'H07 A')
tabla7('H07 B', TB7[8], 2, [q7], None, (-3, 3)); acerca7('H07 B', q7, Fr(2), -1, -3); acerca7('H07 B', q7, Fr(2), 1, 3)
ok(2 - 5 == -3 and 5 - 2 == 3 and -3 != 3 and Fr('1.9') - 5 == Fr('-3.1') and 5 - Fr('2.1') == Fr('2.9'), 'H07 B')
tabla7('H07 C', TB7[9], 5, [R7], 0, (20, 20)); acerca7('H07 C', R7, Fr(5), -1, 20); acerca7('H07 C', R7, Fr(5), 1, 20)
ok(R7(Fr(5)) == 18 + Fr('0.4')*5 == 18 + 2 == 20 != 0 and Fr('0.4')*Fr('4.5') == Fr('1.8') and Fr('0.4')*Fr('5.5') == Fr('2.2') and R7(Fr(1)) - R7(Fr(0)) == Fr('0.4'), 'H07 C: modelo, límite 20 y falla del registro')
# la escena: la tabla dibujada es la de la hoja; registro y lectura armados con fracciones
ok('var XV = [1.9, 1.99, 1.999, 2, 2.001, 2.01, 2.1], TV = [4.9, 4.99, 4.999, 1, 5.001, 5.01, 5.1];' in E7 and 'var IZ = [0, 1, 2], DE = [6, 5, 4];' in E7, 'H07 escena: tabla dibujada y orden de lectura')
ok(TB7[0] == [[Fr(z) for z in ('1.9', '1.99', '1.999', '2', '2.001', '2.01', '2.1')], [Fr(z) for z in ('4.9', '4.99', '4.999', '1', '5.001', '5.01', '5.1')]], 'H07 escena: misma tabla que la hoja')
IZ7 = [x for x in TB7[0][0] if x < 2]; DE7 = [x for x in TB7[0][0] if x > 2][::-1]
ok('x<2:\\\\ \\\\ ' + ';\\\\ '.join(tex(T7(x)) for x in IZ7) + '\\\\ \\\\to\\\\ 5' in E7 and 'x>2:\\\\ \\\\ ' + ';\\\\ '.join(tex(T7(x)) for x in DE7) + '\\\\ \\\\to\\\\ 5' in E7, 'H07 escena: registro R3 y R4')
for L7 in (IZ7, DE7):
    ok(';\\\\ \\\\ '.join('T(%s)=%s' % (tex(x), tex(T7(x))) for x in L7) in E7, 'H07 escena: lectura de los valores de un lado')
    ok(';\\\\ \\\\ '.join('|%s-5|=%s' % (tex(T7(x)), tex(abs(T7(x) - 5))) for x in L7) in E7, 'H07 escena: distancias a 5')
    ok([abs(T7(x) - 5) for x in L7] == [Fr(1, 10), Fr(1, 100), Fr(1, 1000)], 'H07 escena: distancias 0,1; 0,01; 0,001')
ok('T(x)=\\\\tfrac{x^{2}+x-6}{x-2}=\\\\tfrac{(x-2)(x+3)}{x-2}=x+3' in E7 and '2+3=5' in E7 and "['FO', 'T(x)=x+3\\\\ \\\\ (x\\\\ne 2)'" in E7 and 'T(2)=1' in E7, 'H07 escena: fórmula de confirmación')
ok('function lm07E(val){ return -0.9 + (val - 4.85)*5.8/0.3; }' in E7 and all(-1.1 < -0.9 + (float(v) - 4.85)*5.8/0.3 < 5.1 for v in TB7[0][1] if v != 1), 'H07 escena: los seis valores caben en la recta numérica')
# <<< H07

# ───────── escenas por pasos de H02–H07, con el código real (node) ─────────
NODO2 = r"""
const fs = require('fs'), p = process.argv[process.argv.length - 1];
global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; }, num:function(v, d){ var s = v.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', '{,}'); } };
(0, eval)(['_txt.js', '_det.js', '_lim.js', '02.scene.js', '03.scene.js', '04.scene.js', '05.scene.js', '06.scene.js', '07.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
var out = {};
Object.keys(OA.scenes).forEach(function(n){ var S = OA.scenes[n], N = S.sliders[0].max, k, L = [], C = [], v;
  for (k = 1; k <= N; k++){ L.push(S.readout({paso: k})[0][1]); C.push(S.caption({paso: k})); }
  v = {}; S.anim.apply(0.999, v);
  out[n] = {n: N, id: S.sliders[0].id, min: S.sliders[0].min, step: S.sliders[0].step, hold: S.anim.hold, lect: L, cap: C, fin: v.paso, lab: S.labels, asp: S.aspect, w: S.world}; });
console.log(JSON.stringify(out));
"""
ESPER = {'vel-idea': (7, FUN2), 'gra-idea': (6, FUN3), 'gra-casos': (5, FUN3), 'grf-idea': (5, FUN4), 'asi-idea': (6, FUN5), 'tab-idea': (6, FUN6), 'est-idea': (6, FUN7)}
if not SIN_NODO:
    R2 = json.loads(subprocess.run(['node', '-e', NODO2, str(PARTES)], capture_output=True, text=True, check=True).stdout)
    ok(sorted(R2) == sorted(ESPER), 'H02–H07: escenas definidas')
    for esc, (n, FUN) in ESPER.items():
        E = R2[esc]; et = 'escena ' + esc
        ok((E['n'], E['id'], E['min'], E['step'], E['hold'], E['fin']) == (n, 'paso', 1, 1, 3000, n), et + ': deslizador «paso», hold 3000 y último paso')
        ok(abs(E['asp'] - (E['w']['y1'] - E['w']['y0'])/(E['w']['x1'] - E['w']['x0'])) < 1e-9, et + ': aspect = alto/ancho del mundo')
        ids = [l[0] for l in E['lab']]; ok(all('R%d' % (i + 1) in ids for i in range(n)) and 'R%d' % (n + 1) not in ids and 'Q' in ids and 'F' in ids, et + ': registro R1…RN, pregunta y respuesta')
        ok(all(len(l) == 4 and l[1] and l[2] for l in E['lab']), et + ': etiquetas con TeX y respaldo')
        todas = []
        for k in range(n):
            t = E['lect'][k]; ok(t.startswith('\\begin{aligned}') and t.endswith('\\end{aligned}'), et + ' lectura: bloque aligned')
            L = t[len('\\begin{aligned}'):-len('\\end{aligned}')].split('\\\\[5pt]'); ok(len(L) == k + 1, et + ': la lectura del paso %d no es acumulada' % (k + 1))
            if k: ok(t[:-len('\\end{aligned}')].startswith(E['lect'][k - 1][:-len('\\end{aligned}')]), et + ': el paso %d borra algo del anterior' % (k + 1))
            ok(E['cap'][k].startswith('Paso %d. ' % (k + 1)), et + ' pie del paso %d' % (k + 1))
            todas = [z for l in L for z in l.split('\\\\&\\qquad ')]
        largo = lambda z: len(re.sub(r'\\[a-zA-Z]+|[{}&^_ ]', '', re.sub(r'&\\textbf\{\d+\.\}', '', z)))
        ok(all(largo(z) <= 60 for z in todas), et + ' línea larga: ' + ' | '.join(z for z in todas if largo(z) > 60))
        lim = [re.sub(r'&\\textbf\{\d+\.\}\\ \\ ', '', z) for z in todas] + [l[1] for l in E['lab']]
        valores(et, lim, FUN, 3)
        with tempfile.TemporaryDirectory() as td:
            # de cada línea se sacan los trozos puramente numéricos (sin texto ni letras) y se recalculan todos
            trozos = [w.strip().rstrip(',.').strip() for z in lim for w in re.split(r'\\text\{[^}]*\}|;|:|\\quad|\\qquad|\\ \\ |\\to|\\Rightarrow|\\ne|\\displaystyle|\\ ', z)]
            sinletras = lambda w: bool(w.strip()) and not re.search(r'[A-Za-z]', re.sub(r'\\(tfrac|dfrac|cdot)', '', w))
            trozos = ['='.join(l for l in w.split('=') if sinletras(l)) for w in trozos if '=' in w]   # los lados con letras (nombres de función) se revisan en valores()
            trozos = [w for w in trozos if '=' in w]
            tp = pathlib.Path(td)/'lectura.html'; tp.write_text('\n'.join('<p>\\(%s\\)</p>' % w for w in trozos), encoding='utf-8')
            ok(vtex(et, tp) >= 5, et + ': pocas igualdades numéricas evaluadas')

print('%d comprobaciones%s' % (N[0], '; SIN node: las lecturas con deslizador no se evaluaron con el código de la escena (sí su aritmética exacta)' if SIN_NODO else '; lecturas de los deslizadores evaluadas con el código de la escena'))
print('Lote 29 H01–H07: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
