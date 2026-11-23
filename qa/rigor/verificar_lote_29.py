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

# ───────── escenas por pasos de H02–H04, con el código real (node) ─────────
NODO2 = r"""
const fs = require('fs'), p = process.argv[process.argv.length - 1];
global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; }, num:function(v, d){ var s = v.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', '{,}'); } };
(0, eval)(['_txt.js', '_det.js', '_lim.js', '02.scene.js', '03.scene.js', '04.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
var out = {};
Object.keys(OA.scenes).forEach(function(n){ var S = OA.scenes[n], N = S.sliders[0].max, k, L = [], C = [], v;
  for (k = 1; k <= N; k++){ L.push(S.readout({paso: k})[0][1]); C.push(S.caption({paso: k})); }
  v = {}; S.anim.apply(0.999, v);
  out[n] = {n: N, id: S.sliders[0].id, min: S.sliders[0].min, step: S.sliders[0].step, hold: S.anim.hold, lect: L, cap: C, fin: v.paso, lab: S.labels, asp: S.aspect, w: S.world}; });
console.log(JSON.stringify(out));
"""
ESPER = {'vel-idea': (7, FUN2), 'gra-idea': (6, FUN3), 'gra-casos': (5, FUN3), 'grf-idea': (5, FUN4)}
if not SIN_NODO:
    R2 = json.loads(subprocess.run(['node', '-e', NODO2, str(PARTES)], capture_output=True, text=True, check=True).stdout)
    ok(sorted(R2) == sorted(ESPER), 'H02–H04: escenas definidas')
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
print('Lote 29 H01–H04: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
