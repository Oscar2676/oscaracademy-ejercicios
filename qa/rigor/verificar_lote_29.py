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
ok('<h1>Introducción a los límites</h1>' in ART and '<span class="status">CD-L29-H01 · v002 · Pendiente de APR</span>' in ART, 'H01 título y pie')
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
    ok('<h1>%s</h1>' % titulo in A and '<span class="status">CD-L29-%s · %s · Pendiente de APR</span>' % (h, 'v002' if h in ('H02', 'H03', 'H04') else 'v001') in A and '<li>%s</li>\n      <li><b>%s</b></li>' % (caja, titulo) in A, h + ' título, ruta y pie')
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
n5 = len(err)
A5, E5 = molde('05', 'H05_limites_laterales_a_partir_de_graficas_asintotas.html', 'Límites laterales a partir de gráficas. Asíntotas', 'lim-asint', 'Límites a partir de gráficas', ['asi-idea'], 1)
# H05 está en v002 (revisión general): molde() espera la versión en una línea común, fuera de este bloque; aquí se quita ese aviso (si salió) y se comprueba el pie v002
err[n5:] = [z5 for z5 in err[n5:] if z5 != 'H05 título, ruta y pie']
ok('<h1>Límites laterales a partir de gráficas. Asíntotas</h1>' in A5 and '<span class="status">CD-L29-H05 · v002 · Pendiente de APR</span>' in A5 and A5.count('class="status"') == 1 and '<li>Límites a partir de gráficas</li>\n      <li><b>Límites laterales a partir de gráficas. Asíntotas</b></li>' in A5, 'H05 título, ruta y pie (v002)')
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
# ───── H05 v002 (revisión general, 25-nov): cuentas nuevas de la hoja y de la lectura de la escena
D5 = lambda s: Fr(s)
ok([(D5(x5) - 2, 1/(D5(x5) - 2)) for x5 in ('2.5', '2.1', '2.01', '2.001')] == [(D5('0.5'), 2), (D5('0.1'), 10), (D5('0.01'), 100), (D5('0.001'), 1000)] and 2 - 2 == 0, 'H05 v002 encabezado: cuatro casos por la derecha')
ok([(D5(x5) - 2, 1/(D5(x5) - 2)) for x5 in ('1.5', '1.9', '1.99', '1.999')] == [(D5('-0.5'), -2), (D5('-0.1'), -10), (D5('-0.01'), -100), (D5('-0.001'), -1000)], 'H05 v002 encabezado: cuatro casos por la izquierda')
for s5 in ['x=2{,}5:&\\quad 2{,}5-2=0{,}5;\\quad \\frac{1}{0{,}5}=2', 'x=2{,}001:&\\quad 2{,}001-2=0{,}001;\\quad \\frac{1}{0{,}001}=1000', 'x=1{,}5:&\\quad 1{,}5-2=-0{,}5;\\quad \\frac{1}{-0{,}5}=-2', 'x=1{,}999:&\\quad 1{,}999-2=-0{,}001;\\quad \\frac{1}{-0{,}001}=-1000',
           'De dónde sale, con números', 'La notación', 'se lee «límite»', 'se lee «infinito»', 'por la izquierda es menos infinito', 'por la derecha es más infinito', 'no es un exponente', '<b>límite lateral</b>', '<b>asíntota vertical</b>', '<b>Qué se demuestra.</b>', '<b>Cómo funciona el método.</b>', '<b>Búsqueda del tramo</b>', 'Comprobación con números']:
    ok(s5 in A5, 'H05 v002: la hoja no trae «%s»' % s5)
ok(A5.count('<p class="lede">') == 4 and A5.index('De dónde sale, con números') < A5.index('<b>La notación.</b>') < A5.index('</header>') and A5.index('<b>Qué se demuestra.</b>') < A5.index('<b>Cómo funciona el método.</b>') < A5.index('<b>Búsqueda del tramo</b>') < A5.index('Demostración, a la derecha') < A5.index('Comprobación con números, a la izquierda') < A5.index('card k3'), 'H05 v002: orden del encabezado y de la demostración')
ok(not re.search(r'\\\\[()]', A5), 'H05 v002: salto de línea pegado a un paréntesis en un bloque aligned')
ok(2*4 == 8 < 12 == 3*4 and 2*(-1) == -2 > -3 == 3*(-1) and 2**2 == 4 < 9 == 3**2 and Fr(1, 3) < Fr(1, 2) and D5('0.9') + 1 == D5('1.9') and D5('0.99') + 1 == D5('1.99') and 1 + 1 == 2, 'H05 v002 aviso de rigor: los hechos 1 y 2 con números')
ok(Fr(1, 5) == D5('0.2') and Fr(1, 100) == D5('0.01') and [f5(D5(x5)) for x5 in ('1.9', '1.99', '1.999')] == [-10, -100, -1000], 'H05 v002 k1: anchos d para los topes 5 y 100, y ejemplo por la izquierda')
# k2: búsqueda del tramo (equivalencias) y tramos de x, en rejilla
for M5 in MS5:
    for t5 in [Fr(j5, 8) for j5 in range(1, 25)]:      # también fuera del tramo (t ≥ 1): las tres líneas de la búsqueda son equivalentes
        d5 = t5/M5; x5 = 2 + d5
        ok((1/(x5 - 2) > M5) == (1 > M5*(x5 - 2)) == (1/M5 > x5 - 2) == (t5 < 1) and (0 < x5 - 2 < 1/M5) == (2 < x5 < 2 + 1/M5), 'H05 v002 k2: búsqueda del tramo a la derecha, M=%s' % M5)
        x5 = 2 - d5
        ok(-(2 - x5) == -2 + x5 == x5 - 2 and 1/(x5 - 2) == 1/(-(2 - x5)) == -1/(2 - x5) and (0 < 2 - x5 < 1/M5) == (2 - 1/M5 < x5 < 2) == (t5 < 1) and ((M5 < 1/(2 - x5)) == (-M5 > -1/(2 - x5)) == (f5(x5) < -M5)), 'H05 v002 k2: izquierda, M=%s' % M5)
        ok((3/(3*d5) > M5) == (3 > M5*(3*d5)) == (3/M5 > 3*d5) == (t5 < 1) and (4/(4*d5) > M5) == (4 > M5*4*d5) == (4/M5 > 4*d5) and (T5(60*d5) > M5) == (60 > M5*60*d5) == (60/M5 > 60*d5) == (t5 < 1), 'H05 v002: búsqueda del tramo en ej2, A y C, M=%s' % M5)
    ok(1/M5*M5 == 1 and (1/M5)**2 == 1/M5*(1/M5) == 1/M5**2 and 2*M5 == M5 + M5 > M5 and ((M5 >= 1) <= (M5*M5 >= 1*M5 and 1/M5**2 <= 1/M5)), 'H05 v002: (1/M)² = 1/M², M² ≥ M si M ≥ 1, 2M > M (M=%s)' % M5)
ok(Fr(1, 10) == D5('0.1') and 2 - D5('1.95') == D5('0.05') and 0 < D5('0.05') < D5('0.1') and D5('1.95') - 2 == D5('-0.05') and f5(D5('1.95')) == 1/D5('-0.05') == -20 < -10, 'H05 v002 k2: comprobación por la izquierda (M = 10, x = 1,95)')
for M5, i5, x5, d5, y5 in FK5:
    ok(x5 == 2 + i5/2 and '\\(M=%s\\): \\(\\dfrac{1}{%s}=%s\\); el valor \\(x=%s\\) cumple \\(%s-2=%s\\) y \\(0\\lt %s\\lt %s\\); \\(f(%s)=\\dfrac{1}{%s}=%s\\), y \\(%s\\gt %s\\).' % (M5, M5, tex(i5), tex(x5), tex(x5), tex(d5), tex(d5), tex(i5), tex(x5), tex(d5), tex(y5), tex(y5), M5) in A5, 'H05 v002 k2: cuenta escrita de la fila M=%s (x de prueba a mitad del tramo)' % M5)
ok(D5('0.2')/2 == D5('0.1') and 2 + D5('0.1') == D5('2.1'), 'H05 v002 k2: x de prueba del tope 5')
ok(p5(D5('1.9')) == 1/(D5('1.9') - 2) == 1/D5('-0.1') == -10 == f5(D5('1.9')) and p5(D5('2.1')) == 1/(D5('2.1') - 2) == 1/D5('0.1') == 10 == f5(D5('2.1')), 'H05 v002 k3: p y f con los mismos valores cerca de 2')
# ejemplo 1
ok(D5('2.99') - 3 == D5('-0.01') and D5('3.01') - 3 == D5('0.01') and D5('-0.1')*D5('-0.1') == D5('0.01') and Fr(1, 100) == D5('0.01') and D5('3.005') - 3 == D5('0.005') and D5('0.005')**2 == D5('0.000025') == D5('-0.005')**2 and D5('2.995') - 3 == D5('-0.005') and q5(D5('3.005')) == 1/D5('0.000025') == 40000 == q5(D5('2.995')) and 40000 > 100 and 0 < D5('0.005') < D5('0.01'), 'H05 v002 ej1: restas, cuadrados y comprobación con M = 100')
for x5 in RJ:
    if x5 != 3: ok(3 - x5 == -(x5 - 3) and (3 - x5)**2 == (x5 - 3)**2, 'H05 v002 ej1: 3 − x = −(x − 3)')
    if x5 != 4: ok(-(x5 - 4) == -x5 + 4 == 4 - x5 and 3/(4 - x5) == 3/(-(x5 - 4)) == -3/(x5 - 4), 'H05 v002 ej2: −(x − 4) = 4 − x')
    ok((x5 - 2)*(x5 + 2) == x5*x5 + x5*2 - 2*x5 - 2*2 == x5**2 + 2*x5 - 2*x5 - 4 == x5**2 - 4, 'H05 v002 ej4: diferencia de cuadrados desarrollada')
for M5 in [m5 for m5 in MS5 if m5 >= 1]:
    for t5 in TS5:
        d5 = t5/M5
        ok(d5**2 < (1/M5)**2 <= 1/M5 and M5*d5**2 < 1 and M5 < 1/d5**2 == q5(3 + d5) == q5(3 - d5) and 2/d5**2 == k5(3 + d5) > 2*M5, 'H05 v002 ej1 y B: cadena del tope con M ≥ 1')
# ejemplo 2
ok(Fr(3, 100) == D5('0.03') and 4 - D5('3.98') == D5('0.02') and 0 < D5('0.02') < D5('0.03') and w5(D5('3.98')) == 3/D5('0.02') == 150 > 100 and D5('4.02') - 4 == D5('0.02') and 4 - D5('4.02') == D5('-0.02') and w5(D5('4.02')) == 3/D5('-0.02') == -150 < -100 and 4 - D5('3.9') == D5('0.1') and 4 - D5('4.1') == D5('-0.1'), 'H05 v002 ej2: comprobación con M = 100 y signos del denominador')
# ejemplo 3
ok(Fr(1, 50) == D5('0.02') and D5('1.01') - 1 == D5('0.01') and 0 < D5('0.01') < D5('0.02') and v5(D5('1.01')) == 100 > 50 and v5(Fr(1)) == 1 + 1 == 2, 'H05 v002 ej3: comprobación con M = 50 y v(1)')
for M5 in MS5:
    for t5 in TS5:
        x5 = 1 + t5/M5; ok(0 < x5 - 1 < 1/M5 and M5*(x5 - 1) < 1 and M5 < 1/(x5 - 1) == v5(x5), 'H05 v002 ej3: cadena del tope')
# ejemplo 4: cada fila de g y de f, con sus operaciones
for x5, c5, n5_, d5, y5 in (('1.9', '3.61', '-0.39', '-0.1', '3.9'), ('1.99', '3.9601', '-0.0399', '-0.01', '3.99'), ('2.01', '4.0401', '0.0401', '0.01', '4.01'), ('2.1', '4.41', '0.41', '0.1', '4.1')):
    ok(D5(x5)**2 == D5(c5) and D5(c5) - 4 == D5(n5_) and D5(x5) - 2 == D5(d5) and D5(n5_)/D5(d5) == D5(y5) == g5(D5(x5)) == D5(x5) + 2 and f5(D5(x5)) == 1/D5(d5), 'H05 v002 ej4: fila x = %s' % x5)
    ok('x=%s:&\\quad %s^{2}=%s;\\quad %s-4=%s;\\quad %s-2=%s;\\quad \\frac{%s}{%s}=%s' % tuple(tex(D5(z5)) for z5 in (x5, x5, c5, c5, n5_, x5, d5, n5_, d5, y5)) in A5 and '\\(f(%s)=\\dfrac{1}{%s}=%s\\)' % (tex(D5(x5)), tex(D5(d5)), tex(f5(D5(x5)))) in A5 and '\\(%s+2=%s\\)' % (tex(D5(x5)), tex(D5(y5))) in A5, 'H05 v002 ej4: cuenta escrita de la fila x = %s' % x5)
ok(2 + 2 == 4, 'H05 v002 ej4: llegada de x + 2')
# ejercicios
ok(Fr(4, 100) == D5('0.04') and D5('-0.99') + 1 == D5('0.01') and 0 < D5('0.01') < D5('0.04') and u5(D5('-0.99')) == 400 > 100 and -(D5('-1.01') + 1) == D5('0.01') and u5(D5('-1.01')) == -400 < -100 and 0 - 1 == -1 and D5('0.004') - 1 == D5('-0.996'), 'H05 v002 A: comprobación con M = 100 y extremos del tramo')
for M5 in MS5:
    for t5 in TS5:
        d5 = 4*t5/M5; x5 = -1 - d5
        ok(0 < -(x5 + 1) < 4/M5 and M5*(-(x5 + 1)) < 4 and M5 < 4/(-(x5 + 1)) and u5(x5) == -4/(-(x5 + 1)) < -M5, 'H05 v002 A: cadena por la izquierda')
        x5 = -t5/M5; ok(0 < -x5 < 1/M5 and M5*(-x5) < 1 and M5 < 1/(-x5) and k5(x5) == -1/(-x5) < -M5, 'H05 v002 B: cadena en 0 por la izquierda')
ok(Fr(1, 50) == D5('0.02') and 0 < D5('0.01') < D5('0.02') and k5(D5('-0.01')) == -100 < -50 and k5(Fr(0)) == 0 + 1 == 1 and D5('3.01') - 3 == D5('0.01') and D5('3.005') - 3 == D5('0.005') and 0 < D5('0.005') < D5('0.01') and k5(D5('3.005')) == 2/D5('0.000025') == 80000 > 100, 'H05 v002 B: comprobaciones con M = 50 y M = 100')
ok([T5(Fr(x5)) for x5 in (60, 30, 10, 1)] + [T5(D5('0.1'))] == [1, 2, 6, 60, 600] and 0 < D5('0.05') < D5('0.06') and T5(D5('0.05')) == 1200 > 1000, 'H05 v002 C: lectura de los valores y comprobación')
# la lectura del paso 4 de la escena (dos operaciones y dos pruebas con números)
ok("'\\\\text{por }M\\\\text{, positivo:}\\\\ \\\\ M\\\\,(x-2)\\\\lt 1'" in E5 and "'\\\\text{dividido por }x-2\\\\text{, positivo:}\\\\ \\\\ M\\\\lt \\\\tfrac{1}{x-2}'" in E5 and "'\\\\text{prueba: }f(2{,}1)=10\\\\text{, y }10\\\\gt 5'" in E5 and "'\\\\text{prueba: }f(2{,}005)=\\\\tfrac{1}{0{,}005}=200\\\\text{, y }200\\\\gt 100'" in E5 and "'\\\\tfrac{1}{x-2}=-\\\\tfrac{1}{2-x}\\\\text{; por eso }f(x)\\\\lt -M'" in E5, 'H05 v002 escena: la lectura del paso 4 trae las dos operaciones y las pruebas')
ok(f5(D5('2.1')) == 10 > 5 and 0 < D5('2.1') - 2 < D5('0.2') and D5('2.005') - 2 == D5('0.005') and 0 < D5('0.005') < D5('0.01') and f5(D5('2.005')) == 1/D5('0.005') == 200 > 100, 'H05 v002 escena: pruebas de los topes 5 y 100')
# <<< H05

# >>> H06
# ───────── H06: aproximar límites a partir de tablas (la tabla se construye con la fórmula) ─────────
A6, E6 = molde('06', 'H06_aproximar_limites_a_partir_de_tablas.html', 'Aproximar límites a partir de tablas', 'lim-tabla', 'Límites a partir de tablas', ['tab-idea'], 1)
# H06 está en v002 (revisión general); molde(), que es común y queda fuera de este bloque, todavía espera v001 en el pie:
# se quita ese único aviso y el título, la ruta y el pie se comprueban aquí con la versión nueva
err[:] = [e6 for e6 in err if e6 != 'H06 título, ruta y pie']
ok('<h1>Aproximar límites a partir de tablas</h1>' in A6 and '<span class="status">CD-L29-H06 · v002 · Pendiente de APR</span>' in A6 and A6.count('Pendiente de APR') == 1 and '<li>Límites a partir de tablas</li>\n      <li><b>Aproximar límites a partir de tablas</b></li>' in A6, 'H06 v002 título, ruta y pie')
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
            '\\text{se multiplica: }(x-1)(x^{2}+x+1)\\\\&\\qquad =x^{3}+x^{2}+x-x^{2}-x-1=x^{3}-1\\\\&\\qquad x\\ne 1:\\ \\ f(x)=\\tfrac{(x-1)(x^{2}+x+1)}{x-1}=x^{2}+x+1\\\\&\\qquad x\\to 1:\\ \\ 1^{2}+1+1=3\\\\&\\qquad \\lim_{x\\to 1}f(x)=3\\ \\ \\text{(la tabla acertó)}']
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
def comprobar6v2():
    """revisión general (v002): cada cuenta nueva de la hoja, con fracciones; en una función para no pisar nombres globales"""
    d = lambda s: Fr(s)
    t9 = lambda z: tex(z, 9)
    lista = lambda l: '; '.join('\\(%s\\)' % t9(z) for z in l)
    def fila3(s): x = d(s); return (x*x, x*x*x, x**3 - 1, x - 1, (x**3 - 1)/(x - 1))
    # encabezado: cuatro filas (cuadrado, cubo = cuadrado · x, resta, denominador, cociente) y distancias a 3
    ok([fila3(s) for s in ('0.9', '0.99', '1.01', '1.1')] == [(d('0.81'), d('0.729'), d('-0.271'), d('-0.1'), d('2.71')), (d('0.9801'), d('0.970299'), d('-0.029701'), d('-0.01'), d('2.9701')), (d('1.0201'), d('1.030301'), d('0.030301'), d('0.01'), d('3.0301')), (d('1.21'), d('1.331'), d('0.331'), d('0.1'), d('3.31'))], 'H06 v002 encabezado: cuatro filas')
    ok(d('0.81')*d('0.9') == d('0.729') and d('0.9801')*d('0.99') == d('0.970299') and d('1.0201')*d('1.01') == d('1.030301') and d('1.21')*d('1.1') == d('1.331') and d('-0.271')/d('-0.1') == d('2.71') and d('-0.029701')/d('-0.01') == d('2.9701') and d('0.030301')/d('0.01') == d('3.0301') and d('0.331')/d('0.1') == d('3.31'), 'H06 v002 encabezado: productos y cocientes')
    ok((3 - d('2.71'), 3 - d('2.9701'), d('3.0301') - 3, d('3.31') - 3) == (d('0.29'), d('0.0299'), d('0.0301'), d('0.31')) and abs(d('2.71') - 3) == abs(d('-0.29')) == d('0.29') and 9 < d('0.29')/d('0.0299') < 11 and 9 < d('0.31')/d('0.0301') < 11 and 1 - d('0.1') == d('0.9') and 1 + d('0.1') == d('1.1'), 'H06 v002 encabezado: distancias, valor absoluto y a ± 0,1')
    # aviso de rigor: el polinomio cerca de 1
    ok(d('0.99')**2 + d('0.99') + 1 == d('0.9801') + d('0.99') + 1 == d('2.9701') and 1 + 1 + 1 == 3, 'H06 v002 aviso: x² + x + 1 en 0,99')
    # k1: las dos filas que faltaban, las distancias y «unas 10 veces»
    ok([fila3(s) for s in ('0.999', '1.001')] == [(d('0.998001'), d('0.997002999'), d('-0.002997001'), d('-0.001'), d('2.997001')), (d('1.002001'), d('1.003003001'), d('0.003003001'), d('0.001'), d('3.003001'))] and d('0.998001')*d('0.999') == d('0.997002999') and d('1.002001')*d('1.001') == d('1.003003001'), 'H06 v002 k1: filas de 0,999 y 1,001')
    ok(abs(d('2.997001') - 3) == abs(d('-0.002999')) == d('0.002999') and abs(d('3.003001') - 3) == d('0.003001') and d('0.29')/10 == d('0.029') and d('0.0299')/10 == d('0.00299') and [1 - d('0.1'), 1 - d('0.01'), 1 - d('0.001'), 1 + d('0.1'), 1 + d('0.01'), 1 + d('0.001')] == [d('0.9'), d('0.99'), d('0.999'), d('1.1'), d('1.01'), d('1.001')], 'H06 v002 k1: distancias, división por 10 y los x')
    # k2: cada línea de los desarrollos, en rejilla
    for h in RJ:
        ok((1 + h)**2 == (1 + h)*(1 + h) == 1*1 + 1*h + h*1 + h*h == 1 + h + h + h*h == 1 + 2*h + h*h, 'H06 v002 k2 paso 1')
        ok((1 + h)**3 == (1 + h)**2*(1 + h) == (1 + 2*h + h*h)*(1 + h) == 1*1 + 1*h + 2*h*1 + 2*h*h + h*h*1 + h*h*h == 1 + h + 2*h + 2*h*h + h*h + h**3 == 1 + 3*h + 3*h*h + h**3 and h + 2*h == 3*h and 2*h*h + h*h == 3*h*h, 'H06 v002 k2 paso 2')
        ok((1 + h)**3 - 1 == 1 + 3*h + 3*h*h + h**3 - 1 == 3*h + 3*h*h + h**3 == h*3 + h*3*h + h*h*h == h*(3 + 3*h + h*h) and (1 + h) - 1 == 1 - 1 + h == h, 'H06 v002 k2 pasos 3 y 4')
        if h != 0: ok(f6(1 + h) == h*(3 + 3*h + h*h)/h == 3 + 3*h + h*h and f6(1 + h) - 3 == 3 + 3*h + h*h - 3 == 3*h + h*h == h*3 + h*h == h*(3 + h) and abs(h*(3 + h)) == abs(h)*abs(3 + h), 'H06 v002 k2 pasos 5, 6 y 7')
        x = h
        ok((x - 1)*(x*x + x + 1) == x*x*x + x*x + x*1 - 1*x*x - 1*x - 1*1 == x**3 + x*x + x - x*x - x - 1 == x**3 - 1, 'H06 v002 k2: producto sin h, término a término')
        ok(x*x + x + 1 - 3 == x*x + x - 2 == (x - 1)*(x + 2) == x*x + 2*x - x - 2 and ((x*x + x + 1 == 3) == (x in (1, -2))), 'H06 v002 k3: x² + x + 1 = 3 solo en 1 y −2')
        for q in (Fr(-3), Fr(-2), Fr(-1), Fr(1), Fr(2), Fr(1, 2)):
            for p in (Fr(-4), Fr(-2), Fr(-1), Fr(1), Fr(-1, 2)):
                ok((x + p)*(x + q) == x*x + q*x + p*x + p*q == x*x + (p + q)*x + p*q, 'H06 v002 ej1: (x + p)(x + q)')
        ok(2*x - 2 == 2*x - 2*1 == 2*(x - 1) and (x - Fr(1, 2))*(x + Fr(1, 2)) == x*x - Fr(1, 2)**2, 'H06 v002 ej2 y ej3: factor común y resta de cuadrados')
        ok((x - 2)*(x*x + 2*x + 4) == x*x*x + x*2*x + x*4 - 2*x*x - 2*2*x - 2*4 == x**3 + 2*x*x + 4*x - 2*x*x - 4*x - 8 == x**3 - 8, 'H06 v002 B: producto término a término')
        ok(x*2*x == 2*x*x and (x - 2)*(2*x + 7) == 2*x*x + 7*x - 4*x - 14 and 7*x - 4*x == 3*x and (not 0 <= x <= 5 or V6(x) - V6(Fr(2)) == 2*x*x + 3*x - 14), 'H06 v002 C: numerador y producto')
    ok(abs(d('-0.1')*d('2.9')) == abs(d('-0.29')) == d('0.29') == abs(d('-0.1'))*abs(d('2.9')) == d('0.1')*d('2.9') and d('0.9') == 1 + d('-0.1') and d('1.1') == 1 + d('0.1') and 3 - d('0.1') == d('2.9') and 3 + d('0.1') == d('3.1'), 'H06 v002 k2: ejemplos con números (pasos 7 y 8) y x = 1 + h')
    for k in range(1, 1001):
        for h in (Fr(k, 10000), -Fr(k, 10000)):
            ok(3 + h > 0 and abs(3 + h) == 3 + h and abs(f6(1 + h) - 3) <= d('3.1')*abs(h), 'H06 v002 k2 paso 8: 3 + h es positivo y la distancia no pasa de 3,1|h|')
    ok(d('3.1')*d('0.0003') == d('0.00093') < d('0.001') and all(abs(f6(1 + s*Fr(k, 100000)) - 3) < d('0.001') for k in range(1, 31) for s in (1, -1)), 'H06 v002 k2 paso 9: con |h| ≤ 0,0003 la distancia es menor que 0,001')
    for hs, x, c1, c2, v, m1, m2, dist in [('-0.1', '0.9', '-0.3', '0.01', '2.71', '0.1', '2.9', '0.29'), ('0.1', '1.1', '0.3', '0.01', '3.31', '0.1', '3.1', '0.31'), ('-0.01', '0.99', '-0.03', '0.0001', '2.9701', '0.01', '2.99', '0.0299'), ('0.001', '1.001', '0.003', '0.000001', '3.003001', '0.001', '3.001', '0.003001')]:
        h = d(hs)
        ok(1 + h == d(x) and 3*h == d(c1) and h*h == d(c2) and 3 + 3*h + h*h == 3 + d(c1) + d(c2) == d(v) == f6(d(x)) and abs(h) == d(m1) and abs(3 + h) == d(m2) and d(m1)*d(m2) == d(dist) == abs(f6(d(x)) - 3), 'H06 v002 k2 paso 10: comprobación con h = %s' % hs)
    ok(d('0.9')**2 + d('0.9') + 1 == d('0.81') + d('0.9') + 1 == d('2.71') and 1**2 + 1 + 1 == 3, 'H06 v002 k2: comprobación de x² + x + 1 con la fila de 0,9')
    # k3: cifras que deciden el redondeo, la ecuación y la cuenta sin redondear
    cifra = lambda z, n: int(abs(d(z))*10**n) % 10
    ok(cifra('2.997001', 3) == 7 and cifra('3.003001', 3) == 3 and cifra('0.997002999', 4) == 0 and cifra('11.994001', 2) == 9 and cifra('12.006001', 2) == 0 and round(d('11.994001'), 1) == 12 == round(d('12.006001'), 1) and round(d('0.997002999'), 3) == d('0.997'), 'H06 v002 k3 y B: cifras que deciden el redondeo')
    ok(1 - 3 == -2 and (-2)**2 + (-2) + 1 == 4 - 2 + 1 == 3 and abs(-2 - 1) == abs(-3) == 3 and d('0.997002999') - 1 == d('-0.002997001') and d('-0.002997001')/d('-0.001') == d('2.997001') and d('0.997') - 1 == d('-0.003'), 'H06 v002 k3: ecuación y cociente sin redondear')
    # ejemplos y ejercicios: los x, la fila del otro lado, el candidato a la vista, las distancias de la primera y la última fila, y la comprobación con una fila
    CASOS = [('g', g6, Fr(2), Fr(-1)), ('r', r6, Fr(1, 2), Fr(1)), ('w', w6, Fr(1), Fr(3, 2)), ('u', u6, Fr(-1), Fr(-3)), ('p', p6, Fr(4), Fr(5)), ('q', q6, Fr(2), Fr(12)), ('m', m6, Fr(2), Fr(11)), ('f', f6, Fr(1), Fr(3))]
    for nom, F, a, L in CASOS:
        iz = [a - Fr(1, 10), a - Fr(1, 100), a - Fr(1, 1000)]; de = [a + Fr(1, 10), a + Fr(1, 100), a + Fr(1, 1000)]
        ok(lista(F(x) for x in iz) + ' y por la derecha, ' + lista(F(x) for x in de) in A6, 'H06 v002 %s: valores de los dos lados escritos antes del candidato' % nom)
        ok(all(abs(F(x) - L) < abs(F(y) - L) for l in (iz, de) for x, y in ((l[1], l[0]), (l[2], l[1]))), 'H06 v002 %s: los dos lados se acercan al candidato' % nom)
        if nom != 'f':
            di, dd = abs(F(iz[0]) - L), abs(F(de[0]) - L)
            sL = '-(%s)' % t9(L) if L < 0 else '-%s' % t9(L)
            ok('|%s%s|=' % (t9(F(iz[0])), sL) in A6 and '|%s%s|=' % (t9(F(de[0])), sL) in A6 and '=|%s|=%s\\)' % (t9(F(iz[0]) - L), t9(di)) in A6 and '=|%s|=%s\\)' % (t9(F(de[0]) - L), t9(dd)) in A6, 'H06 v002 %s: distancia de la primera y de la última fila, escritas' % nom)
            if nom != 'u': ok('; '.join('\\(%s-%s=%s\\)' % (t9(a), t9(a - x), t9(x)) for x in iz) + ' y ' + '; '.join('\\(%s+%s=%s\\)' % (t9(a), t9(x - a), t9(x)) for x in de) in A6, 'H06 v002 %s: los x escritos con su resta o suma' % nom)
    ok('; '.join('\\(1-%s=%s\\)' % (t9(1 - x), t9(x)) for x in (d('0.9'), d('0.99'), d('0.999'))) + ' por la izquierda y ' + '; '.join('\\(1+%s=%s\\)' % (t9(x - 1), t9(x)) for x in (d('1.1'), d('1.01'), d('1.001'))) + ' por la derecha' in A6, 'H06 v002 k1: los x escritos con su resta o suma')
    ok((d('2.1')**2, 5*d('2.1'), d('4.41') - d('10.5') + 6, d('2.1') - 2, d('-0.09')/d('0.1')) == (d('4.41'), d('10.5'), d('-0.09'), d('0.1'), d('-0.9')) and g6(d('2.1')) == d('-0.9') and -2 + (-3) == -5 and (-2)*(-3) == 6 and d('1.9') - 3 == d('-1.1') == g6(d('1.9')) and abs(d('-1.1') - (-1)) == abs(d('-1.1') + 1) == d('0.1') == abs(d('-0.9') + 1), 'H06 v002 ej1: fila de 2,1, números −2 y −3, distancias y comprobación')
    ok((d('0.51')**2, d('0.2601') - d('0.25'), d('0.51') - d('0.5'), d('0.0101')/d('0.01')) == (d('0.2601'), d('0.0101'), d('0.01'), d('1.01')) and r6(d('0.51')) == d('1.01') and d('0.5')*d('0.5') == d('0.25') and d('0.49') + d('0.5') == d('0.99') == r6(d('0.49')) and abs(d('0.9') - 1) == d('0.1') == abs(d('1.1') - 1), 'H06 v002 ej2: fila de 0,51, 0,5², distancias y comprobación')
    ok((d('1.1')**2, d('1.21') + d('1.1') - 2, 2*d('1.1'), d('2.2') - 2, d('0.31')/d('0.2')) == (d('1.21'), d('0.31'), d('2.2'), d('0.2'), d('1.55')) and w6(d('1.1')) == d('1.55') and -1 + 2 == 1 and (-1)*2 == -2 and (d('0.9') + 2)/2 == d('2.9')/2 == d('1.45') == w6(d('0.9')) and abs(d('1.45') - d('1.5')) == d('0.05') == abs(d('1.55') - d('1.5')) and 1 + 1 - 2 == 0 and 2*1 - 2 == 0, 'H06 v002 ej3: fila de 1,1, números −1 y 2, distancias y comprobación')
    ok((d('-0.9')**2, d('0.81') - d('-0.9') - 2, d('0.81') + d('0.9') - 2, d('-0.9') + 1, d('-0.29')/d('0.1')) == (d('0.81'), d('-0.29'), d('-0.29'), d('0.1'), d('-2.9')) and u6(d('-0.9')) == d('-2.9') and 1 + (-2) == -1 and 1*(-2) == -2 and d('-1.1') - 2 == d('-3.1') == u6(d('-1.1')) and abs(d('-3.1') + 3) == d('0.1') == abs(d('-2.9') + 3), 'H06 v002 ej4: fila de −0,9, números 1 y −2, distancias y comprobación')
    ok((d('4.1')**2, 3*d('4.1'), d('16.81') - d('12.3') - 4, d('4.1') - 4, d('0.51')/d('0.1')) == (d('16.81'), d('12.3'), d('0.51'), d('0.1'), d('5.1')) and p6(d('4.1')) == d('5.1') and -4 + 1 == -3 and (-4)*1 == -4 and d('3.9') + 1 == d('4.9') == p6(d('3.9')) and abs(d('4.9') - 5) == d('0.1') == abs(d('5.1') - 5), 'H06 v002 A: fila de 4,1, números −4 y 1, distancias y comprobación')
    ok((d('2.1')**2, d('4.41')*d('2.1'), d('9.261') - 8, d('1.261')/d('0.1')) == (d('4.41'), d('9.261'), d('1.261'), d('12.61')) and q6(d('2.1')) == d('12.61') and 2**3 == 8 and d('1.9')**2 + 2*d('1.9') + 4 == d('3.61') + d('3.8') + 4 == d('11.41') == q6(d('1.9')) and abs(d('11.41') - 12) == d('0.59') and abs(d('12.61') - 12) == d('0.61'), 'H06 v002 B: fila de 2,1, distancias y comprobación')
    ok((d('2.1')**2, 2*d('4.41'), 3*d('2.1'), d('8.82') + d('6.3'), d('15.12') - 14, d('1.12')/d('0.1')) == (d('4.41'), d('8.82'), d('6.3'), d('15.12'), d('1.12'), d('11.2')) and V6(d('2.1')) == d('15.12') and m6(d('2.1')) == d('11.2') and -2*7 == -14 and 2*d('1.9') + 7 == d('3.8') + 7 == d('10.8') == m6(d('1.9')) and abs(d('10.8') - 11) == d('0.2') == abs(d('11.2') - 11) and all(0 <= 2 + s*Fr(1, 10**k) <= 5 for k in (1, 2, 3) for s in (1, -1)), 'H06 v002 C: fila de 2,1, c = 7, distancias, comprobación y los t dentro del modelo')
    # molde de la revisión: «de dónde sale», «se lee», «qué se demuestra», «cómo funciona el método»; ningún salto de línea pegado a un delimitador
    ok(all(z in A6 for z in ('<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La notación.</b>', '<b>Qué se demuestra:</b>', '<b>Cómo funciona el método:</b>', 'se lee «el límite de', 'se lee «valor absoluto de', 'se lee «más o menos»', 'se lee «\\(x\\) tiende a \\(1\\)»', 'se lee «\\(x\\) distinto de \\(1\\)»')) and A6.count('\\begin{aligned}') == A6.count('\\end{aligned}') >= 10 and not re.search(r'\\\\[()\[\]]', A6), 'H06 v002 molde de la revisión general')
    ok("'\\\\text{se multiplica: }(x-1)(x^{2}+x+1)' + Q + '=x^{3}+x^{2}+x-x^{2}-x-1=x^{3}-1'" in E6, 'H06 v002 escena: la lectura del paso 6 hace el producto')
comprobar6v2()
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
# >>> H08
# ───────── H08: tablas y límites unilaterales (cada lado de la tabla da su lateral; después se comparan) ─────────
A8, E8 = molde('08', 'H08_tablas_y_limites_unilaterales.html', 'Tablas y límites unilaterales', 'lim-unil', 'Límites a partir de tablas', ['uni-idea'], 1)
def f8(x): return x + 1 if x < 3 else 2*x                                        # función ancla: laterales 4 y 6 en a = 3; f(3) = 6
def r8(x): return x + 1                                                          # k2: mismo lado izquierdo que f, otro lado derecho
def s8(x):
    assert x != 0
    return x + 2 if x < 0 else 1/Fr(x)
def g8(x): return 3*x if x < 2 else (Fr(4) if x == 2 else x - 1)
def h8(x):
    assert x != 2
    return 4 - x if x < 2 else 3*x - 4
def k8(x):
    assert x > 4
    return 10 - 2*x
def e8(x):
    assert 1 <= x < 3
    return Fr(1) if x < 2 else Fr(2)
def p8(x): return 2*x - 3 if x <= 4 else 12 - x
def q8(x): return 5*x - 2 if x < 1 else (Fr(7) if x == 1 else 4 - x)
def P8(x):
    assert x > 0
    return 1200*x if x < 5 else 1000*x
FUN8 = {'f': f8, 'r': r8, 's': s8, 'g': g8, 'h': h8, 'k': k8, 'e': e8, 'p': p8, 'q': q8, 'P': P8}
valores('H08 hoja', mates_de(A8), FUN8, 8)
def celda8(z):
    z = z.strip()
    if not z.startswith('\\('): return z                                          # «no definida»
    return D(z[2:-2].replace('\\,', ''))
TB8 = [[[celda8(z) for z in re.findall(r'<td>(.*?)</td>', r)] for r in re.findall(r'<tr>(.*?)</tr>', t, re.S)] for t in re.findall(r'<table class="tbl">(.*?)</table>', A8, re.S)]
ok(len(TB8) == 10, 'H08 n.º de tablas')
def tabla8(et, t, a, funs, en_a, L, nlado=(3, 3)):
    """tabla dada: fila de x y una fila por función; columna x = a (si viene) con lo que dice la hoja;
    L = (lateral izquierdo, lateral derecho) de la primera función; None en un lado = ese lado no se lee con distancias"""
    xs = t[0]; ok(len(t) == 1 + len(funs) and all(len(r) == len(xs) for r in t) and xs == sorted(xs) and len(set(xs)) == len(xs), et + ': forma de la tabla')
    ok((a in xs) == (en_a is not None), et + ': columna x = a')
    ok((len([x for x in xs if x < a]), len([x for x in xs if x > a])) == nlado, et + ': columnas por lado')
    for i, (F, fila) in enumerate(zip(funs, t[1:])):
        for x, v in zip(xs, fila):
            if x == a: ok(v == (en_a[i] if isinstance(en_a, list) else en_a), '%s: la columna x = a dice %s' % (et, v))
            else: ok(v == F(x), '%s: valor en x = %s' % (et, x))
    F = funs[0]
    for lado, Ll in ((-1, L[0]), (1, L[1])):
        if Ll is None: continue
        orden = sorted([x for x in xs if (x - a)*lado > 0], key=lambda x: abs(x - a), reverse=True)   # en el orden en que x se acerca a a
        ds = [abs(F(x) - Ll) for x in orden]
        ok(ds == sorted(ds, reverse=True) and len(set(ds)) == len(ds) and ds[-1] > 0, '%s: las distancias a %s se achican (lado %d)' % (et, Ll, lado))
        ok('; '.join('\\(%s\\)' % tex(F(x)) for x in orden) in A8, '%s: la hoja no trae la lectura del lado %d en orden' % (et, lado))
        for x, d in zip(orden, ds):
            cad = '|%s-%s|=%s' % (tex(F(x)), tex(Ll), tex(d))
            ok(cad in A8 or cad.replace('|', '\\|') in E8 or cad in E8, '%s: falta la distancia «%s»' % (et, cad))
        sg = '-' if lado < 0 else '+'
        ok(re.search(r'\\lim_\{[a-z]\\to %s\^\{%s\}\}[A-Za-z]\([a-z]\)\\approx %s(?!\d|\{,\})' % (tex(a), re.escape(sg), tex(Ll)), A8) is not None, '%s: falta escribir el lateral %s ≈ %s' % (et, sg, Ll))
def acerca8(et, F, a, lado, Ll):
    """con la fórmula: los valores en a ± 10^-k se acercan a Ll (distancias decrecientes, la última menor que 10^-3 por cada unidad de pendiente)"""
    ds = [abs(F(a + lado*Fr(1, 10**k)) - Ll) for k in range(1, 9)]
    ok(ds == sorted(ds, reverse=True) and ds[-1] < Fr(1, 10**4) and all(ds[i + 1] <= ds[i]/10 for i in range(7)), '%s: llegada %s por el lado %d' % (et, Ll, lado))
# animación y tabla ancla
tabla8('H08 tabla de f', TB8[0], 3, [f8], 6, (4, 6)); acerca8('H08 f', f8, Fr(3), -1, 4); acerca8('H08 f', f8, Fr(3), 1, 6)
ok(4 != 6 and 6 - 4 == 2 and f8(Fr(3)) == 6 and 3 + 1 == 4 and 2*3 == 6, 'H08: laterales 4 y 6 distintos; f(3) = 6')
# k2: mismo lado izquierdo, otro lado derecho
tabla8('H08 k2 tabla de f y r', TB8[1], 3, [f8, r8], [Fr(6), Fr(4)], (4, 6))
ok(TB8[1][0] == TB8[0][0] and TB8[1][1] == TB8[0][1], 'H08 k2: misma tabla de f que en la animación')
ok(all(f8(x) == r8(x) for x in TB8[1][0] if x < 3) and all(f8(x) != r8(x) for x in TB8[1][0] if x >= 3), 'H08 k2: f = r a la izquierda de 3 y distintas a la derecha')
for x in RJ:
    ok((f8(x) == r8(x)) == (x < 3), 'H08 k2: f(x) = r(x) exactamente cuando x < 3 (x=%s)' % x)
acerca8('H08 r', r8, Fr(3), -1, 4); acerca8('H08 r', r8, Fr(3), 1, 4)
ok(all('|%s-4|=%s' % (tex(r8(x)), tex(abs(r8(x) - 4))) in A8 for x in (Fr('3.1'), Fr('3.01'), Fr('3.001'))) and '\\(4{,}1\\); \\(4{,}01\\); \\(4{,}001\\)' in A8, 'H08 k2: lectura derecha de r y distancias a 4')
ok(Fr('2.9') + 1 == Fr('3.9') and 2*Fr('3.1') == Fr('6.2') and Fr('3.1') + 1 == Fr('4.1'), 'H08 k2: valores de muestra')
# k3: un lado hacia un número, el otro sin tope
tabla8('H08 k3 tabla de s', TB8[2], 0, [s8], 'no definida', (2, None)); acerca8('H08 s', s8, Fr(0), -1, 2)
ok(TB8[2][1][4:] == [1000, 100, 10] and 10*10 == 100 and 100*10 == 1000 and '\\(10\\); \\(100\\); \\(1000\\)' in A8, 'H08 k3: derecha 10; 100; 1000, cada valor 10 veces el anterior')
ok(Fr(1, 1000) == Fr('0.001') and s8(Fr('0.0005')) == 2000 and 0 + 2 == 2, 'H08 k3: valores de la confirmación')
for M8 in list(range(1, 60)) + [100, 1000, Fr(1, 2), Fr(7, 3)]:
    for j8 in range(1, 30):
        x = Fr(j8, 30)/M8
        ok(0 < x < Fr(1)/M8 and s8(x) > M8, 'H08 k3: con 0 < x < 1/M, s(x) > M (M=%s)' % M8)
ok(all(s8(Fr(1, 10**n)) == 10**n for n in range(1, 9)), 'H08 k3: s(10^-n) = 10^n, sin tope')
# ejemplos
tabla8('H08 ej1', TB8[3], 2, [g8], 4, (6, 1)); acerca8('H08 ej1', g8, Fr(2), -1, 6); acerca8('H08 ej1', g8, Fr(2), 1, 1)
ok(g8(Fr(2)) == 4 and 4 != 6 and 4 != 1 and 6 != 1 and 3*Fr('1.9') == Fr('5.7') and Fr('2.1') - 1 == Fr('1.1') and 3*2 == 6 and 2 - 1 == 1, 'H08 ej1')
tabla8('H08 ej2', TB8[4], 2, [h8], None, (2, 2)); acerca8('H08 ej2', h8, Fr(2), -1, 2); acerca8('H08 ej2', h8, Fr(2), 1, 2)
ok(all(v > 2 for v in TB8[4][1]) and 4 - Fr('1.9') == Fr('2.1') and 3*Fr('2.1') == Fr('6.3') and Fr('6.3') - 4 == Fr('2.3') and 4 - 2 == 2 and 3*2 - 4 == 6 - 4 == 2, 'H08 ej2: los dos lados bajan hacia 2 desde arriba; confirmación')
tabla8('H08 ej3', TB8[5], 4, [k8], None, (None, 2), nlado=(0, 4)); acerca8('H08 ej3', k8, Fr(4), 1, 2)
ok(TB8[5][0] == [Fr(z) for z in ('4.001', '4.01', '4.1', '4.5')] and 2*Fr('4.5') == 9 and 10 - 9 == 1 and 10 - 2*4 == 10 - 8 == 2, 'H08 ej3: solo lado derecho; confirmación')
tabla8('H08 ej4', TB8[6], 2, [e8], 2, (None, None))
ok(TB8[6][1] == [1, 1, 1, 2, 2, 2, 2] and e8(Fr(2)) == 2 and 1 != 2 and 2 - 1 == 1, 'H08 ej4: valores constantes a cada lado')
for j8 in range(1, 400):
    ok(e8(2 - Fr(j8, 400)) == 1 and e8(2 + Fr(j8, 400)) == 2, 'H08 ej4: e = 1 en [1, 2[ y e = 2 en ]2, 3[')
# ejercicios
tabla8('H08 A', TB8[7], 4, [p8], 5, (5, 8)); acerca8('H08 A', p8, Fr(4), -1, 5); acerca8('H08 A', p8, Fr(4), 1, 8)
ok(5 != 8 and p8(Fr(4)) == 5 and 2*Fr('3.9') == Fr('7.8') and Fr('7.8') - 3 == Fr('4.8') and 12 - Fr('4.1') == Fr('7.9') and 2*4 - 3 == 8 - 3 == 5 and 12 - 4 == 8, 'H08 A')
tabla8('H08 B', TB8[8], 1, [q8], 7, (3, 3)); acerca8('H08 B', q8, Fr(1), -1, 3); acerca8('H08 B', q8, Fr(1), 1, 3)
ok(q8(Fr(1)) == 7 != 3 and 5*Fr('0.9') == Fr('4.5') and Fr('4.5') - 2 == Fr('2.5') and 4 - Fr('1.1') == Fr('2.9') and 5*1 - 2 == 5 - 2 == 3 and 4 - 1 == 3, 'H08 B')
tabla8('H08 C', TB8[9], 5, [P8], 5000, (6000, 5000)); acerca8('H08 C', P8, Fr(5), -1, 6000); acerca8('H08 C', P8, Fr(5), 1, 5000)
ok(6000 != 5000 and P8(Fr(5)) == 5000 and 1200*Fr('4.9') == 5880 and 1000*Fr('5.1') == 5100 and 1200*5 == 6000 and 1000*5 == 5000 and 6000 - 5000 == 1000 and 5000 < 5880 and all(ndec(x) <= 3 for x in TB8[9][0]), 'H08 C: modelo, laterales 6000 y 5000, salto de 1000')
# la escena: la tabla dibujada es la de la hoja; registro y lectura armados con fracciones
ok('var XV = [2.9, 2.99, 2.999, 3, 3.001, 3.01, 3.1], TV = [3.9, 3.99, 3.999, 6, 6.002, 6.02, 6.2];' in E8 and 'var IZ = [0, 1, 2], DE = [6, 5, 4];' in E8, 'H08 escena: tabla dibujada y orden de lectura')
ok(TB8[0] == [[Fr(z) for z in ('2.9', '2.99', '2.999', '3', '3.001', '3.01', '3.1')], [Fr(z) for z in ('3.9', '3.99', '3.999', '6', '6.002', '6.02', '6.2')]], 'H08 escena: misma tabla que la hoja')
IZ8 = [x for x in TB8[0][0] if x < 3]; DE8 = [x for x in TB8[0][0] if x > 3][::-1]
ok('\\\\approx 4\\\\ \\\\ (' + ';\\\\ '.join(tex(f8(x)) for x in IZ8) + ')' in E8 and '\\\\approx 6\\\\ \\\\ (' + ';\\\\ '.join(tex(f8(x)) for x in DE8) + ')' in E8, 'H08 escena: registro R3 y R4')
for L8, c8 in ((IZ8, 4), (DE8, 6)):
    ok(';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x), tex(f8(x))) for x in L8) in E8, 'H08 escena: lectura de los valores de un lado')
    ok(';\\\\ \\\\ '.join('|%s-%d|=%s' % (tex(f8(x)), c8, tex(abs(f8(x) - c8))) for x in L8) in E8, 'H08 escena: distancias al candidato %d' % c8)
ok([abs(f8(x) - 4) for x in IZ8] == [Fr(1, 10), Fr(1, 100), Fr(1, 1000)] and [abs(f8(x) - 6) for x in DE8] == [Fr(2, 10), Fr(2, 100), Fr(2, 1000)], 'H08 escena: distancias 0,1; 0,01; 0,001 y 0,2; 0,02; 0,002')
ok('f(x)=x+1\\\\ \\\\text{si }x<3;\\\\ \\\\ f(x)=2x\\\\ \\\\text{si }x\\\\ge 3' in E8 and '3+1=4' in E8 and '2\\\\cdot 3=6' in E8 and '6-4=2' in E8 and "['FO', 'f(x)=x+1\\\\ (x<3);\\\\ \\\\ 2x\\\\ (x\\\\ge 3)'" in E8 and 'f(3)=6' in E8, 'H08 escena: fórmula de confirmación')
ok('function lm08E(val){ return -0.9 + (val - 3.85)*5.8/2.4; }' in E8 and all(-1.1 < -0.9 + (float(v) - 3.85)*5.8/2.4 < 5.1 for v in TB8[0][1]), 'H08 escena: los valores caben en la recta numérica')
# <<< H08

# >>> H09
# ───────── H09: usar tablas para aproximar límites (fórmulas con raíz: valores redondeados, margen de error declarado) ─────────
A9, E9 = molde('09', 'H09_usar_tablas_para_aproximar_limites.html', 'Usar tablas para aproximar límites', 'lim-usar', 'Límites a partir de tablas', ['usa-idea'], 1)
import math
def rex9(q):
    """raíz exacta de un racional (o None si no es cuadrado perfecto)"""
    q = Fr(q); n, d = math.isqrt(q.numerator), math.isqrt(q.denominator)
    return Fr(n, d) if q >= 0 and n*n == q.numerator and d*d == q.denominator else None
def enc9(q, r, e):
    """encierro exacto: r aproxima √q con error ≤ e  ⟺  (r − e)² ≤ q ≤ (r + e)², con r − e ≥ 0"""
    return r - e >= 0 and (r - e)**2 <= q <= (r + e)**2
def cota9(q, k=30):
    """dos racionales a distancia 10⁻ᵏ que encierran a √q"""
    lo = Fr(math.isqrt(Fr(q).numerator*10**(2*k)//Fr(q).denominator), 10**k); assert lo*lo <= q < (lo + Fr(1, 10**k))**2
    return lo, lo + Fr(1, 10**k)
# cada función: (lo de adentro de la raíz, número que se resta, denominador, numerador de la forma racionalizada)
F9 = {'f': (lambda x: x, 2, lambda x: x - 4, 1), 'g': (lambda x: x + 1, 1, lambda x: x, 1), 'r': (lambda x: x + 5, 3, lambda x: x - 4, 1),
      'p': (lambda x: x, 5, lambda x: x - 25, 1), 'w': (lambda x: 2*x + 1, 3, lambda x: x - 4, 2), 'm': (lambda x: x, 4, lambda x: x - 16, 1)}
def real9(nom, x):
    """intervalo (de ancho menor que 10⁻²⁵) que contiene al valor real de la función"""
    rad, c, den, _ = F9[nom]; lo, hi = cota9(rad(x)); a, b = (lo - c)/den(x), (hi - c)/den(x)
    return min(a, b), max(a, b)
def exacta9(nom):
    def F(x):
        rad, c, den, _ = F9[nom]; s = rex9(rad(x)); assert s is not None and den(x) != 0, 'H09: %s(%s) no es exacto' % (nom, x)
        return (s - c)/den(x)
    return F
def q9(x):
    assert x != 0
    return abs(x)/x                                                     # √(x²)/x = |x|/x
FUN9 = dict({k: exacta9(k) for k in F9}, q=q9)
valores('H09 hoja', mates_de(A9), FUN9, 6)
def comprobar9():
    """todas las cuentas de H09; va en una función para no pisar nombres globales del verificador"""
    t9 = lambda z: tex(z, 9); cel9 = lambda s: D(s.replace('\\(', '').replace('\\)', ''))
    # 1) las siete tablas, casilla por casilla: (función, a, decimales de la raíz, ¿columna de lo de adentro?)
    TAB9 = [('f', 4, 6, False), ('f', 4, 2, False), ('g', 0, 6, True), ('r', 4, 6, True), ('p', 25, 6, False), ('w', 4, 6, True), ('m', 16, 6, False)]
    TH9 = re.findall(r'<table class="tbl">(.*?)</table>', A9, re.S); ok(len(TH9) == len(TAB9) == 7, 'H09 n.º de tablas')
    PROC9 = {}; VAL9 = []
    for i, (th, (nom, a, nd, crad)) in enumerate(zip(TH9, TAB9)):
        et = 'H09 tabla %d (%s)' % (i + 1, nom); rad, c, den, _ = F9[nom]; e = Fr(5, 10**(nd + 1)); ncol = 6 + crad
        ok(len(re.findall(r'<th>', th)) == ncol, et + ': columnas')
        FL = re.findall(r'<tr>(.*?)</tr>', th, re.S)[1:]; ok(len(FL) == 7, et + ': filas')
        ok(FL[3] == '<td>\\(%s\\)</td><td colspan="%d">no se calcula: el denominador es \\(0\\)</td>' % (tex(a), ncol - 1), et + ': fila de a')
        hs = [Fr(-1, 10), Fr(-1, 100), Fr(-1, 1000), None, Fr(1, 1000), Fr(1, 100), Fr(1, 10)]; vs = []
        for h, fl in zip(hs, FL):
            if h is None: continue
            z = [cel9(s) for s in re.findall(r'<td>(.*?)</td>', fl)]; ok(len(z) == ncol, et + ': casillas')
            if len(z) != ncol: continue
            x = z[0]; R = z[1] if crad else rad(x); r, num, dn, v, mg = z[-5:]
            ok(x == a + h, et + ': x = a ± 0,1; 0,01; 0,001'); ok(R == rad(x) and R >= 0, et + ': lo de adentro de la raíz en x = %s' % x)
            ok(ndec(r) <= nd and enc9(R, r, e), et + ': la raíz de %s no está bien redondeada a %d decimales' % (R, nd))
            ok(num == r - c, et + ': resta en x = %s' % x); ok(dn == den(x) == h, et + ': denominador en x = %s' % x)
            ok(v == num/dn, et + ': división en x = %s' % x); ok(mg == e/abs(dn), et + ': margen en x = %s' % x)
            lo, hi = real9(nom, x); ok(v - mg <= lo and hi <= v + mg, et + ': el valor real en x = %s no queda dentro del margen' % x)
            PROC9.setdefault((nom, x), set()).add(v); vs.append(v)
        VAL9.append(vs)
    f6, f2, g6, r6, p6, w6, m6 = VAL9
    y9 = lambda *v: ' y '.join('\\(%s\\)' % t9(z) for z in v); pc9 = lambda v: '; '.join('\\(%s\\)' % t9(z) for z in v)
    # 2) las frases de la hoja que citan valores de las tablas, armadas con las tablas
    for s in ('dan ' + y9(f6[1], f6[4]) + ', cada una con margen \\(0{,}00005\\)', 'dan ' + y9(g6[1], g6[4]) + ', con margen \\(0{,}00005\\)', 'dan ' + y9(r6[1], r6[4]) + ', con margen \\(0{,}00005\\)',
              'dan ' + y9(w6[1], w6[4]) + ', con margen \\(0{,}00005\\)', 'Los valores son ' + pc9(f2[:3]) + ' y ' + pc9(f2[3:]) + ':', 'Los valores son ' + pc9(p6[:3]) + ' por la izquierda y ' + pc9(p6[:2:-1]) + ' por la derecha',
              'Por la izquierda: ' + pc9(w6[:3]) + '. Por la derecha (de lejos a cerca): ' + pc9(w6[:2:-1]) + '.', 'Los valores son ' + pc9(m6[:3]) + ' por la izquierda y ' + pc9(m6[:2:-1]) + ' por la derecha',
              'Se escribe \\(f(3{,}9)\\approx %s\\)' % t9(f6[0]), 'dan \\(%s\\) con margen \\(0{,}0005\\). Informe: \\(\\displaystyle\\lim_{x\\to 4}r(x)\\approx 0{,}167\\)' % t9(r6[2]), 'dan \\(%s\\) con margen \\(0{,}0005\\). Tres decimales' % t9(w6[2]),
              'muestran \\(%s\\) justo, con margen \\(0{,}0005\\)' % t9(g6[2]), 'La fila \\(x=24{,}99\\) muestra \\(%s\\)' % t9(p6[1]), 'el lado creció \\(%s\\) metros' % t9(m6[5]*Fr(1, 10))):
        ok(s in A9, 'H09 frase con valores de tabla: ' + s)
    ok(f6[2] == f6[3] == Fr(1, 4) and g6[2] == g6[3] == Fr(1, 2) and r6[2] == r6[3] == Fr(167, 1000) and w6[2] == w6[3] == Fr(333, 1000) and m6[2] == m6[3] == Fr(1, 8) and p6[1:5] == [Fr(1, 10)]*4, 'H09: valores de las filas cercanas')
    ok(f2[1:5] == [0, 0, 0, 0] and all(Fr(5, 1000)/h > abs(v) for h, v in zip((Fr(1, 100), Fr(1, 1000)), (f6[1], f6[2]))), 'H09 k3: con 2 decimales las cuatro filas centrales dan 0 y el margen supera al valor')
    # 3) cada raíz escrita con ≈ en la hoja (fuera de las tablas) y cada «función(número) ≈ número»
    n = 0
    for m in re.finditer(r'\\sqrt\{(%s)\}\\approx (%s)' % (NUMTEX, NUMTEX), A9):
        q, r = D(m.group(1)), D(m.group(2)); n += 1; ok(enc9(q, r, Fr(5, 10**9) if ndec(r) == 8 else Fr(5, 10**7)), 'H09 hoja: √%s ≈ %s mal redondeada' % (m.group(1), m.group(2)))
    ok(n == 10, 'H09 hoja: se esperaban 10 raíces con ≈ en el texto y hay %d' % n)
    def aprox9(et, textos, minimo):
        k = 0
        for mt in textos:
            for m in re.finditer(r'(?<![A-Za-z\\])([a-z])\((%s)\)\\approx ?(%s)' % (NUMTEX, NUMTEX), mt):
                nom, x, v = m.group(1), D(m.group(2)), D(m.group(3)); lo, hi = real9(nom, x); k += 1
                ok(v in PROC9.get((nom, x), ()) or (abs(lo - v) <= Fr(5, 10**(ndec(v) + 1)) and abs(hi - v) <= Fr(5, 10**(ndec(v) + 1))), '%s: %s(%s) ≈ %s no sale de la tabla ni es el redondeo del valor real' % (et, nom, m.group(2), m.group(3)))
        ok(k >= minimo, '%s: se esperaban al menos %d valores aproximados y hay %d' % (et, minimo, k))
    aprox9('H09 hoja', mates_de(A9), 1)
    # 4) k3 «acercarse demasiado» y ejemplo 4 (8 decimales): el valor real queda dentro de los márgenes declarados
    for x, v, mg in ((Fr('4.00001'), Fr(1, 5), Fr(1, 20)), (Fr('3.99999'), Fr(3, 10), Fr(1, 20))):
        lo, hi = real9('f', x); ok(v - mg <= lo and hi <= v + mg and abs(v - Fr(1, 4)) == mg, 'H09 k3: x = %s' % x)
    for x, v in ((Fr('0.001'), Fr('0.49988')), (Fr('-0.001'), Fr('0.50013'))):
        lo, hi = real9('g', x); mg = Fr(5, 10**9)/abs(x); ok(mg == Fr(5, 10**6) and v - mg <= lo and hi <= v + mg and not (v - mg <= Fr(1, 2) <= v + mg), 'H09 ejemplo 4: x = %s' % x)
    ok('está entre \\(0{,}49988-0{,}000005=0{,}499875\\) y \\(0{,}49988+0{,}000005=0{,}499885\\)' in A9 and 'está entre \\(0{,}25-0{,}0005=0{,}2495\\) y \\(0{,}25+0{,}0005=0{,}2505\\)' in A9 and 'está entre \\(0{,}1-0{,}00005=0{,}09995\\) y \\(0{,}1+0{,}00005=0{,}10005\\)' in A9, 'H09: intervalos declarados')
    # 5) identidades de la racionalización, en rejilla de raíces exactas s = √(lo de adentro), y los límites
    RJ9 = [Fr(a, b) for a in range(0, 41) for b in (1, 2, 3, 5, 7, 10)]
    INV9 = {'f': lambda s: s*s, 'g': lambda s: s*s - 1, 'r': lambda s: s*s - 5, 'p': lambda s: s*s, 'w': lambda s: (s*s - 1)/2, 'm': lambda s: s*s}
    LIM9 = {'f': (4, Fr(1, 4)), 'g': (0, Fr(1, 2)), 'r': (4, Fr(1, 6)), 'p': (25, Fr(1, 10)), 'w': (4, Fr(1, 3)), 'm': (16, Fr(1, 8))}
    for nom, (rad, c, den, k) in F9.items():
        a, L = LIM9[nom]; ok(rex9(rad(Fr(a))) == c and den(Fr(a)) == 0 and Fr(k, 2*c) == L, 'H09: límite de ' + nom)
        for s in RJ9:
            x = INV9[nom](s); ok(rad(x) == s*s, 'H09 rejilla ' + nom)
            if s != c: ok(exacta9(nom)(x) == Fr(k)/(s + c) and (s - c)*(s + c) == (rad(x) - c*c) and k*den(x) == rad(x) - c*c, 'H09: forma racionalizada de %s en x = %s' % (nom, x))
    ok(all(q9(x) == 1 and q9(-x) == -1 and rex9(x*x) == x for x in RJ9 if x), 'H09 ejemplo 3: √(x²)/x vale 1 o −1')
    ok(Fr(1, 10)*Fr(1, 8) == Fr('0.0125') and Fr('0.0125')*100 == Fr('1.25') and abs(Fr(1, 6) - Fr('0.1667')) <= Fr(5, 10**5) and abs(Fr(1, 3) - Fr('0.3333')) <= Fr(5, 10**5), 'H09: cuentas sueltas del ejercicio C y comparaciones')
    for z, mg in (('0{,}1', '0{,}000005'), ('0{,}01', '0{,}00005'), ('0{,}001', '0{,}0005'), ('0{,}00001', '0{,}05')):
        ok('\\(\\dfrac{0{,}0000005}{%s}=%s\\)' % (z, mg) in A9 and Fr(5, 10**7)/D(z) == D(mg), 'H09 k2: margen a distancia ' + z)
    # 6) la escena: los datos (x y raíz en millonésimas) y todo lo que se escribe a mano con esos números
    TR9 = [(int(a), int(b), int(c)) for a, b, c in re.findall(r'\[(\d+), (\d), (\d{7})\]', E9)]; ok(len(TR9) == 6, 'H09 escena: seis filas de datos')
    XS9 = [Fr(n, 10**k) for n, k, r in TR9]; ok(XS9 == [Fr(4) - Fr(1, 10**k) for k in (1, 2, 3)] + [Fr(4) + Fr(1, 10**k) for k in (1, 2, 3)], 'H09 escena: los x')
    VS9 = []
    for (n, k, r), x in zip(TR9, XS9):
        ok(enc9(x, Fr(r, 10**6), Fr(5, 10**7)), 'H09 escena: raíz de %s' % x); v = (Fr(r, 10**6) - 2)/(x - 4); VS9.append(v)
        ok(PROC9[('f', x)] >= {v}, 'H09 escena: el valor en x = %s no es el de la tabla de la hoja' % x)
    c9 = lambda z: t9(z).replace('{,}', ',').replace('-', '−'); li9 = lambda v: '; '.join(c9(z) for z in v)
    for s in ("'por el denominador: %s.'" % li9(VS9[:3]), "'Resultan %s.'" % li9(VS9[3:]), "'izquierda: f(x) ≈ %s'" % li9(VS9[:3]), "'derecha: f(x) ≈ %s'" % li9(VS9[3:]), "'x: %s y %s'" % (li9(XS9[:3]), li9(XS9[3:])), "'márgenes: 0,000005; 0,00005; 0,0005'",
              'raíces, redondeadas a seis decimales: %s y %s.' % (li9(Fr(r, 10**6) for n, k, r in TR9[:3]), li9(Fr(r, 10**6) for n, k, r in TR9[:2:-1])), 'izquierda: %s, que' % li9(VS9[:3]), 'derecha: %s, puntos' % li9(VS9[3:]),
              'num = r - 2000000, den = n - 4*D, V = num*den*D', 'mg:lm09N(5*D, 7)', 'function GX(w){ return 2 + (w - 0.25)*1400; }', "'± 0,0005'", 'world:{x0:-1.3, x1:5.3, y0:-6.75, y1:6.0}, aspect:12.75/6.6'):
        ok(s in E9, 'H09 escena: ' + s)
    ok(all(-1.3 < 2 + (float(v) - 0.25)*1400 < 5.3 for v in VS9) and all(-1.3 < 2 + (float(v) + s*0.0005 - 0.25)*1400 < 5.3 for v in (VS9[2], VS9[5]) for s in (-1, 1)), 'H09 escena: puntos y márgenes dentro de la recta numérica')
    # 7) la lectura real de la escena (node): cada raíz con ≈ y cada f(x) ≈ del último paso
    if not SIN_NODO:
        nodo = "const fs = require('fs'), p = process.argv[process.argv.length - 1]; global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; } }; (0, eval)(['_txt.js', '_det.js', '_lim.js', '09.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\\n')); var S = OA.scenes['usa-idea']; console.log(JSON.stringify({l: S.readout({paso: 7})[0][1], lab: S.labels}));"
        J = json.loads(subprocess.run(['node', '-e', nodo, str(PARTES)], capture_output=True, text=True, check=True).stdout); L = J['l']
        RA = re.findall(r'\\sqrt\{(%s)\}\\approx (%s)' % (NUMTEX, NUMTEX), L); ok([(D(a), D(b)) for a, b in RA] == [(x, Fr(r, 10**6)) for (n, k, r), x in zip(TR9, XS9)], 'H09 escena: raíces de la lectura')
        aprox9('H09 escena (lectura)', [L], 6)
        ok(all('f(%s)\\approx %s' % (t9(x), t9(v)) in L and '\\tfrac{%s}{%s}=%s' % (t9(v*(x - 4)), t9(x - 4), t9(v)) in L for x, v in zip(XS9, VS9)), 'H09 escena: cuenta de cada fila en la lectura')
        ok(all('\\tfrac{0{,}0000005}{%s}=%s' % (t9(Fr(1, 10**k)), t9(Fr(5, 10**(7 - k)))) in L for k in (1, 2, 3)) and '0{,}25-0{,}0005=0{,}2495' in L and '0{,}25+0{,}0005=0{,}2505' in L, 'H09 escena: márgenes en la lectura')
        lab = {l[0]: l for l in J['lab']}
        ok(lab['R3'][1].endswith(';\\ '.join(t9(v) for v in VS9[:3])) and lab['R4'][1].endswith(';\\ '.join(t9(v) for v in VS9[3:])) and lab['R5'][1].endswith('0{,}000005;\\ 0{,}00005;\\ 0{,}0005'), 'H09 escena: registro R3, R4 y R5')
comprobar9()
# <<< H09

# >>> H10
# ───────── H10: ideas para construir la definición formal de límite (tolerancia ε de la salida, distancia δ de la entrada) ─────────
A10, E10 = molde('10', 'H10_ideas_para_construir_la_definicion_formal_de_limite.html', 'Ideas para construir la definición formal de límite', 'lim-ideas', 'Definición formal de límite (épsilon-delta)', ['eps-idea'], 1)
# funciones exactas de la hoja
def f10(x): return 2*Fr(x) + 1                                  # función ancla: a = 3, L = 7
def g10(x): return 3*Fr(x) - 2                                  # ejemplo 1: a = 2, L = 4
def h10(x): return 5 - 4*Fr(x)                                  # ejemplo 2: a = 1, L = 1
def p10(x): return Fr(10) if x == 3 else 2*Fr(x) + 1            # ejemplo 3: límite 7, p(3) = 10
def s10(x): return Fr(x) + 1 if x < 2 else Fr(x) + 2            # ejemplo 4: salto en 2
def u10(x): return 4*Fr(x) - 3                                  # ejercicio A: a = 2, L = 5
def q10(x): return 6 - Fr(x) if x <= 4 else Fr(x) - 1           # ejercicio B: salto en 4
def P10(m): return 16*Fr(m)                                     # ejercicio C: 16 pesos el gramo
FUN10 = {'f': f10, 'g': g10, 'h': h10, 'p': p10, 's': s10, 'u': u10, 'q': q10, 'P': P10}
valores('H10 hoja', mates_de(A10), FUN10, 22)
ES10 = [Fr(1), Fr(1, 2), Fr(1, 10), Fr(1, 100), Fr(3, 5), Fr(1, 5), Fr(2, 5), Fr(7, 3), Fr(80), Fr(16), Fr(1, 10**6)]   # tolerancias de prueba
TS10 = [Fr(j10, 40) for j10 in range(-39, 40) if j10]                                                                  # fracciones del tramo: 0 < |t| < 1
def implica10(et, F, a, L, d, e, puntos=TS10):
    """en rejilla: todo x con 0 < |x − a| < d cumple |F(x) − L| < e"""
    for t in puntos:
        x = a + t*d; ok(0 < abs(x - a) < d and abs(F(x) - L) < e, '%s: x = %s no cumple' % (et, x))

# 1) la escena: función, lugar, llegada, tolerancias y distancias; franjas, marcas y cadenas armadas con fracciones
ok('function f(x){ return 2*x + 1; }' in E10 and 'var A = 3, L = 7, EPS = [1, 0.5, 0.1], DEL = [0.5, 0.25, 0.05];' in E10 and f10(3) == 7, 'H10 escena: función, a, L, tolerancias y distancias')
EP10 = [Fr(1), Fr(1, 2), Fr(1, 10)]; DE10 = [e10/2 for e10 in EP10]
ok(DE10 == [Fr(1, 2), Fr(1, 4), Fr(1, 20)], 'H10 escena: cada distancia es la mitad de su tolerancia')
ok('lmMarco(-0.6, 0.55, 5.5, 4.4, 1.8, 4.2, 4.7, 9.3)' in E10 and all(Fr('1.8') < 3 - d10 and 3 + d10 < Fr('4.2') and Fr('4.7') < 7 - e10 and 7 + e10 < Fr('9.3') for e10, d10 in zip(EP10, DE10)) and Fr('4.7') < f10(Fr('1.9')) and f10(Fr('4.1')) < Fr('9.3'), 'H10 escena: las franjas caben en el marco')
for e10, d10 in zip(EP10, DE10):
    ok(f10(3 - d10) == 7 - e10 and f10(3 + d10) == 7 + e10, 'H10 escena: la recta pasa por las esquinas del cruce de franjas (ε = %s)' % e10)
    implica10('H10 escena ε = %s' % e10, f10, 3, 7, d10, e10)
    ok("'\\\\varepsilon=%s'" % tex(e10) in E10 and "'\\\\delta=%s'" % tex(d10) in E10, 'H10 escena: rótulos de ε = %s y su δ' % e10)
ok("marca(M.x0, 6, '6', C.alt); marca(M.x0, 8, '8', C.alt)" in E10 and "marca(2.5, M.y0, '2,5', C.sec); marca(3.5, M.y0, '3,5', C.sec)" in E10 and "marca(M.x0, 6.5, '6,5', C.alt); marca(M.x0, 7.5, '7,5', C.alt)" in E10 and "marca(2.75, M.y0, '2,75', C.sec); marca(3.25, M.y0, '3,25', C.sec)" in E10, 'H10 escena: marcas de los bordes de las franjas')
ok((7 - 1, 7 + 1, 3 - Fr(1, 2), 3 + Fr(1, 2), 7 - Fr(1, 2), 7 + Fr(1, 2), 3 - Fr(1, 4), 3 + Fr(1, 4)) == (6, 8, Fr('2.5'), Fr('3.5'), Fr('6.5'), Fr('7.5'), Fr('2.75'), Fr('3.25')), 'H10 escena: bordes de las franjas')
ok("['R2', '\\\\varepsilon=1:\\\\ \\\\ 6\\\\lt f(x)\\\\lt 8'" in E10 and "['R3', '\\\\delta=0{,}5:\\\\ \\\\ 2{,}5\\\\lt x\\\\lt 3{,}5\\\\ \\\\Rightarrow\\\\ 6\\\\lt f(x)\\\\lt 8'" in E10 and "['R4', '\\\\varepsilon=0{,}5\\\\ \\\\to\\\\ \\\\delta=0{,}25'" in E10 and "['R5', '\\\\varepsilon=0{,}1\\\\ \\\\to\\\\ \\\\delta=0{,}05'" in E10 and "['R6', '0\\\\lt |x-3|\\\\lt \\\\tfrac{\\\\varepsilon}{2}\\\\ \\\\Rightarrow\\\\ |f(x)-7|\\\\lt \\\\varepsilon'" in E10 and "['F', '\\\\Longrightarrow\\\\ \\\\delta=\\\\tfrac{\\\\varepsilon}{2}'" in E10, 'H10 escena: registro y respuesta')
for x10 in (Fr('2.9'), Fr('3.1'), Fr('3.4'), Fr('3.2'), Fr('3.04')):
    ok('f(%s)=2\\\\cdot %s+1=%s' % (tex(x10), tex(x10), tex(f10(x10))) in E10, 'H10 lectura f(%s)' % tex(x10))
for x10, e10, d10 in ((Fr('3.4'), Fr(1), Fr(1, 2)), (Fr('3.2'), Fr(1, 2), Fr(1, 4)), (Fr('3.04'), Fr(1, 10), Fr(1, 20))):
    ok(0 < abs(x10 - 3) < d10 and '|%s-7|=%s\\\\lt %s' % (tex(f10(x10)), tex(abs(f10(x10) - 7)), tex(e10)) in E10 and abs(f10(x10) - 7) < e10 and '2\\\\,|x-3|\\\\lt 2\\\\cdot %s=%s' % (tex(d10), tex(e10)) in E10, 'H10 lectura: prueba con x = %s' % tex(x10))
ok('f(3{,}4)=7{,}8\\\\gt 7{,}5' in E10 and f10(Fr('3.4')) > Fr('7.5') and 0 < abs(Fr('3.4') - 3) < Fr(1, 2), 'H10 lectura: la distancia 0,5 no sirve para la tolerancia 0,5')
ok('|2{,}9-3|=0{,}1' in E10 and '|6{,}8-7|=0{,}2' in E10 and '\\\\tfrac{1}{2}=0{,}5;\\\\ \\\\ \\\\tfrac{0{,}5}{2}=0{,}25;\\\\ \\\\ \\\\tfrac{0{,}1}{2}=0{,}05' in E10 and '7-0{,}1=6{,}9;\\\\ \\\\ 7+0{,}1=7{,}1' in E10 and '7-0{,}5=6{,}5;\\\\ \\\\ 7+0{,}5=7{,}5' in E10, 'H10 lectura: distancias, bordes y mitades')
pl10 = lambda z: tex(z).replace('{,}', ',')
ok("'Respuesta: distancia %s para la entrada. Sobre'" % pl10(DE10[0]) in E10 and "['Tolerancia más exigente: %s. La distancia de', 'antes ya no sirve; con %s, sí.']" % (pl10(EP10[1]), pl10(DE10[1])) in E10 and "'Tolerancia %s: sirve la distancia %s. Las'" % (pl10(EP10[2]), pl10(DE10[2])) in E10 and "'Alguien fija una tolerancia para la salida: 1.'" in E10, 'H10 lienzo: frases con las tolerancias y distancias')

# 2) la implicación general, en rejilla: 0 < |x − a| < ε/|m| ⟹ |F(x) − L| < ε, y la identidad |F(x) − L| = |m|·|x − a|
for F10, a10, L10, m10, et10 in ((f10, 3, 7, 2, 'k2 f'), (g10, 2, 4, 3, 'ej1 g'), (h10, 1, 1, 4, 'ej2 h'), (p10, 3, 7, 2, 'ej3 p'), (u10, 2, 5, 4, 'A u'), (P10, 250, 4000, 16, 'C P')):
    for x10 in RJ:
        if not (F10 is p10 and x10 == 3): ok(abs(F10(x10) - L10) == m10*abs(x10 - a10), 'H10 %s: |F(x) − L| = %d·|x − a|' % (et10, m10))
    for e10 in ES10:
        d10 = e10/m10; ok(d10 > 0 and m10*d10 == e10, 'H10 %s: δ = ε/%d' % (et10, m10))
        implica10('H10 %s, ε = %s' % (et10, e10), F10, a10, L10, d10, e10)
        ok(abs(F10(a10 + d10) - L10) == e10 == abs(F10(a10 - d10) - L10), 'H10 %s: en el borde de la franja la distancia es exactamente ε' % et10)
        implica10('H10 %s: una distancia menor también sirve' % et10, F10, a10, L10, d10/2, e10); implica10('H10 %s: una distancia menor también sirve' % et10, F10, a10, L10, d10/10, e10)
for x10 in RJ:
    ok(f10(x10) - 7 == 2*x10 + 1 - 7 == 2*x10 - 6 == 2*(x10 - 3) and g10(x10) - 4 == 3*x10 - 2 - 4 == 3*x10 - 6 == 3*(x10 - 2) and h10(x10) - 1 == 5 - 4*x10 - 1 == 4 - 4*x10 == -4*(x10 - 1) and u10(x10) - 5 == 4*x10 - 3 - 5 == 4*x10 - 8 == 4*(x10 - 2) and P10(x10) - 4000 == 16*x10 - 4000 == 16*(x10 - 250), 'H10: diferencias y factor común')
    for y10 in RJ[::7]:
        ok(abs(x10*y10) == abs(x10)*abs(y10) and abs(-x10) == abs(x10) and all(abs(x10 - y10) <= abs(x10 - w10) + abs(w10 - y10) for w10 in RJ[::11]), 'H10 aviso: propiedades del valor absoluto y desigualdad triangular')
    for c10 in (Fr(1, 2), Fr(1), Fr(3)): ok((abs(x10) < c10) == (-c10 < x10 < c10), 'H10 aviso: |u| < c equivale a −c < u < c')
# 3) tabla del recuadro k2: ε, δ = ε/2, x de prueba, |x − 3|, f(x), |f(x) − 7|
TB10 = re.findall(r'<table class="tbl">(.*?)</table>', A10, re.S); ok(len(TB10) == 1, 'H10 n.º de tablas')
FK10 = [[D(z10.strip('\\() ')) for z10 in r10] for r10 in filas(TB10[0])]
ok([r10[0] for r10 in FK10] == [1, Fr(1, 2), Fr(1, 10), Fr(1, 100)], 'H10 tabla k2: tolerancias')
for e10, d10, x10, dx10, y10, dy10 in FK10:
    ok(d10 == e10/2 and dx10 == abs(x10 - 3) and 0 < dx10 < d10 and y10 == f10(x10) and dy10 == abs(y10 - 7) == 2*dx10 and dy10 < e10, 'H10 tabla k2 fila ε=%s' % e10)
ok(Fr('0.1')/2 == Fr('0.05') and abs(Fr('2.96') - 3) == Fr('0.04') and 0 < Fr('0.04') < Fr('0.05') and 2*Fr('2.96') == Fr('5.92') and f10(Fr('2.96')) == Fr('6.92') and abs(Fr('6.92') - 7) == Fr('0.08') < Fr('0.1'), 'H10 k2 fila de muestra')
ok(abs(Fr('6.8') - 7) == Fr('0.2') == abs(Fr('7.2') - 7), 'H10 k1: distancias de 6,8 y 7,2 a 7')
ok(all(s10_ in A10 for s10_ in ['sirven \\(0{,}5\\), \\(0{,}25\\) y \\(0{,}05\\)']) and all(d10 <= Fr(1, 2) for d10 in (Fr(1, 2), Fr(1, 4), Fr(1, 20))), 'H10 k3: distancias que sirven para la tolerancia 1')
# 4) ejemplos 1 y 2 y ejercicio A: valores, respuesta y prueba
ok([g10(Fr(x)) for x in ('1.9', '2.1', '2.15')] == [Fr('3.7'), Fr('4.3'), Fr('4.45')] and Fr('0.6')/3 == Fr('0.2') and 3*Fr('0.2') == Fr('0.6') and 0 < abs(Fr('2.15') - 2) == Fr('0.15') < Fr('0.2') and abs(Fr('4.45') - 4) == Fr('0.45') < Fr('0.6'), 'H10 ej1')
ok([h10(Fr(x)) for x in ('0.9', '1.1', '0.96')] == [Fr('1.4'), Fr('0.6'), Fr('1.16')] and Fr('0.2')/4 == Fr('0.05') and 4*Fr('0.05') == Fr('0.2') and 0 < abs(Fr('0.96') - 1) == Fr('0.04') < Fr('0.05') and abs(Fr('1.16') - 1) == Fr('0.16') < Fr('0.2'), 'H10 ej2')
ok([u10(Fr(x)) for x in ('1.9', '2.1', '2', '2.05')] == [Fr('4.6'), Fr('5.4'), 5, Fr('5.2')] and Fr('0.4')/4 == Fr('0.1') and 4*Fr('0.1') == Fr('0.4') and 0 < abs(Fr('2.05') - 2) == Fr('0.05') < Fr('0.1') and abs(Fr('5.2') - 5) == Fr('0.2') < Fr('0.4'), 'H10 A')
implica10('H10 ej1 ε = 0,6', g10, 2, 4, Fr('0.2'), Fr('0.6')); implica10('H10 ej2 ε = 0,2', h10, 1, 1, Fr('0.05'), Fr('0.2')); implica10('H10 A ε = 0,4', u10, 2, 5, Fr('0.1'), Fr('0.4'))
# 5) ejemplo 3: el «0 <» deja fuera a x = 3; 10 no es el límite
ok(p10(3) == 10 and abs(p10(3) - 7) == 3 and not 3 < 1 and all(p10(x10) == f10(x10) for x10 in RJ if x10 != 3), 'H10 ej3: p = f fuera de 3 y p(3) = 10')
for d10 in ES10:
    ok(abs(3 - 3) < d10 and not abs(p10(3) - 7) < 1, 'H10 ej3: sin el «0 <», x = 3 entra y falla la tolerancia 1')
    for t10 in TS10:
        if t10 > 0:
            t = min(t10*d10, Fr(1, 2)); x10 = 3 + t
            ok(0 < abs(x10 - 3) <= d10 and p10(x10) == 2*(3 + t) + 1 == 7 + 2*t <= 8 and abs(p10(x10) - 10) == 10 - (7 + 2*t) == 3 - 2*t >= 2 and not abs(p10(x10) - 10) < 1, 'H10 ej3: con L = 10 y ε = 1 ninguna distancia sirve')
ok(7 + 2*Fr(1, 2) == 8 and 3 - 2*Fr(1, 2) == 2, 'H10 ej3: cotas 8 y 2')
# 6) ejemplo 4 y ejercicio B: una tolerancia tiene respuesta, otra no (contraejemplo), y ningún L sirve
ok([s10(Fr(x)) for x in ('1.9', '1.99', '2.1', '2.01')] == [Fr('2.9'), Fr('2.99'), Fr('4.1'), Fr('4.01')] and [q10(Fr(x)) for x in ('3.9', '3.99', '4.1', '4.01', '4')] == [Fr('2.1'), Fr('2.01'), Fr('3.1'), Fr('3.01'), 2], 'H10 ej4 y B: valores')
implica10('H10 ej4: L = 3,5, ε = 1, δ = 0,5', s10, 2, Fr('3.5'), Fr(1, 2), 1); implica10('H10 B b): L = 2,5, ε = 1, δ = 0,5', q10, 4, Fr('2.5'), Fr(1, 2), 1)
for t10 in TS10:
    x10 = 2 + t10*Fr(1, 2)
    if t10 < 0: ok(Fr('2.5') < s10(x10) < 3 and Fr(1, 2) < Fr('3.5') - s10(x10) < 1, 'H10 ej4 izquierda: distancia a 3,5 entre 0,5 y 1')
    else: ok(4 < s10(x10) < Fr('4.5') and Fr(1, 2) < s10(x10) - Fr('3.5') < 1, 'H10 ej4 derecha: distancia a 3,5 entre 0,5 y 1')
    x10 = 4 + t10*Fr(1, 2)
    if t10 < 0: ok(2 < q10(x10) < Fr('2.5') and 0 < Fr('2.5') - q10(x10) < Fr(1, 2), 'H10 B izquierda: distancia a 2,5 entre 0 y 0,5')
    else: ok(3 < q10(x10) < Fr('3.5') and Fr(1, 2) < q10(x10) - Fr('2.5') < 1, 'H10 B derecha: distancia a 2,5 entre 0,5 y 1')
LS10 = [Fr(j10, 8) for j10 in range(0, 49)]   # candidatos a L entre 0 y 6
for d10 in ES10:
    for t10 in TS10:
        if t10 <= 0: continue
        t = t10*d10
        ok(s10(2 + t) == 4 + t and abs(s10(2 + t) - Fr('3.5')) == Fr(1, 2) + t > Fr(1, 2), 'H10 ej4: con L = 3,5 y ε = 0,5 falla x = 2 + t')
        ok(q10(4 + t) == 3 + t and abs(q10(4 + t) - Fr('2.5')) == Fr(1, 2) + t > Fr(1, 2), 'H10 B c): con L = 2,5 y ε = 0,5 falla x = 4 + t')
        ok(s10(2 + t) - s10(2 - t) == (2 + t + 2) - (2 - t + 1) == 1 + 2*t > 1 and q10(4 - t) == 6 - (4 - t) == 2 + t and q10(4 + t) - q10(4 - t) == 1, 'H10 ej4 y B d): diferencia de salidas a los dos lados')
        if t10.numerator % 13 == 0:
            for L10 in LS10:
                ok(not (abs(s10(2 + t) - L10) < Fr(1, 2) and abs(s10(2 - t) - L10) < Fr(1, 2)) and not (abs(q10(4 + t) - L10) < Fr(1, 2) and abs(q10(4 - t) - L10) < Fr(1, 2)), 'H10 contraejemplo: ningún L queda a menos de 0,5 de las dos salidas')
ok(Fr(1, 2) + Fr(1, 2) == 1 and 1 + 1 == 2 and Fr('1.5') + 1 == Fr('2.5') and Fr('2.5') + 2 == Fr('4.5'), 'H10 ej4: sumas')
# 7) ejercicio C: café a 16 pesos el gramo
ok(P10(250) == 4000 and Fr(80, 16) == 5 and 16*5 == 80 and abs(253 - 250) == 3 < 5 and P10(253) == 4048 and abs(4048 - 4000) == 48 < 80 and Fr(16, 16) == 1, 'H10 C')
implica10('H10 C ε = 80', P10, 250, 4000, 5, 80); implica10('H10 C ε = 16', P10, 250, 4000, 1, 16)
# 8) lo que la hoja afirma con palabras o símbolos, escrito tal cual (cuantificadores incluidos)
for z10 in ['0\\lt |x-a|\\lt \\delta\\ \\Longrightarrow\\ |f(x)-L|\\lt \\varepsilon', '\\text{para todo }\\varepsilon\\gt 0\\text{ existe }\\delta\\gt 0\\text{ tal que, para todo }x,', '\\text{si }0\\lt |x-a|\\lt \\delta\\text{, entonces }|f(x)-L|\\lt \\varepsilon.',
            '\\delta=\\dfrac{\\varepsilon}{2}', '\\delta=\\dfrac{\\varepsilon}{3}', '\\delta=\\dfrac{\\varepsilon}{4}', '\\delta=\\dfrac{\\varepsilon}{16}', '\\delta=0{,}2', '\\delta=0{,}05', '\\delta=0{,}1', '\\delta=5',
            'el límite es \\(4\\)', 'el límite es \\(5\\)', 'el límite de \\(p\\) en \\(3\\) es \\(7\\)', '\\(10\\) no es el límite', 'El límite de \\(s\\) en \\(2\\) no existe', 'el límite de \\(q\\) en \\(4\\) no existe',
            'círculo vacío en \\((3,7)\\)', 'punto lleno suelto en \\((3,10)\\)', 'punto lleno \\((4,2)\\)', 'círculo vacío en \\((4,3)\\)', 'toda distancia positiva menor también sirve', 'sin demostrar', 'Desigualdad triangular', 'pero no de \\(x\\)',
            '\\lt \\dfrac{0{,}6}{3}=0{,}2', '\\lt \\dfrac{0{,}2}{4}=0{,}05', '\\lt \\dfrac{0{,}4}{4}=0{,}1', '\\lt \\dfrac{80}{16}=5', '\\lt 3\\cdot 0{,}2=0{,}6', '\\lt 4\\cdot 0{,}05=0{,}2', '\\lt 4\\cdot 0{,}1=0{,}4', '\\lt 16\\cdot 5=80', '\\le 7+2\\cdot 0{,}5=8', '\\ge 3-2\\cdot 0{,}5=2',   # igualdades tras una desigualdad, que verificar_tex no evalúa
            '0\\lt 0{,}04\\lt 0{,}05', '0{,}08\\lt 0{,}1', '0\\lt 0{,}15\\lt 0{,}2', '0{,}45\\lt 0{,}6', '0{,}16\\lt 0{,}2', '0\\lt 0{,}05\\lt 0{,}1', '0{,}2\\lt 0{,}4']:
    ok(z10 in A10, 'H10: la hoja no trae «%s»' % z10)
ok(q10(4) == 2 and 4 - 1 == 3 and p10(3) == 10 and 2*3 + 1 == 7, 'H10: puntos marcados de las gráficas descritas')
# <<< H10

# >>> H11
# ───────── H11: definición formal de los límites (épsilon-delta): la frase, sus piezas, las dos fases, la negación y la unicidad ─────────
A11, E11 = molde('11', 'H11_definicion_formal_de_los_limites_epsilon_delta.html', 'Definición formal de los límites (épsilon-delta)', 'lim-formal', 'Definición formal de límite (épsilon-delta)', ['formal-idea'], 1)
# funciones exactas de la hoja
def f11(x):                                                     # función ancla: recta con hueco, a = 1, L = 3; f(1) no está definida
    assert x != 1, 'f(1) no está definida'
    return 5*Fr(x) - 2
def g11(x): return 6*Fr(x) + 1                                  # ejemplo 1: a = −1, L = −5
def h11(x): return Fr(x)/4 + 2                                  # ejemplo 2: a = 8, L = 4
def r11(x): return 3*Fr(x) + 1                                  # ejemplo 3: a = 2, límite 7 (8 no lo es)
def e11(x): return Fr(2) if x < 3 else Fr(5)                    # ejemplo 4: escalón en 3
def k11(x): return 9 - 2*Fr(x)                                  # ejercicio A: a = 4, L = 1
def j11(x): return Fr(x) - 1 if x < 0 else 2*Fr(x) + 1          # ejercicio B: salto en 0
def F11(c): return Fr(9, 5)*Fr(c) + 32                          # ejercicio C: de grados Celsius a grados Fahrenheit
FUN11 = {'f': f11, 'g': g11, 'h': h11, 'r': r11, 'e': e11, 'k': k11, 'j': j11, 'F': F11}
valores('H11 hoja', mates_de(A11), FUN11, 11)
ES11 = [Fr(1), Fr(1, 2), Fr(1, 10), Fr(1, 100), Fr(3, 5), Fr(3, 10), Fr(7, 3), Fr(9), Fr(9, 5), Fr(4), Fr(1, 10**6)]   # tolerancias (o distancias) de prueba
TS11 = [Fr(i11, 40) for i11 in range(-39, 40) if i11]                                                                  # fracciones del tramo: 0 < |t| < 1
def implica11(et, F, a, L, d, e, lado=0):
    """en rejilla: todo x con 0 < |x − a| < d (lado = 0), a − d < x < a (lado = −1) o a < x < a + d (lado = 1) cumple |F(x) − L| < e"""
    for t in TS11:
        if lado and t*lado < 0: continue
        x = a + t*d; ok(0 < abs(x - a) < d and abs(F(x) - L) < e, '%s: x = %s no cumple' % (et, x))
def falla11(et, F, a, L, e, xde):
    """la negación, en rejilla: para cada distancia d hay un x = xde(d) con 0 < |x − a| < d y |F(x) − L| ≥ e"""
    for d in ES11:
        x = xde(d); ok(0 < abs(x - a) < d and abs(F(x) - L) >= e, '%s: con δ = %s el x propuesto no sirve' % (et, d))

# 1) la escena: función, lugar, llegada, tolerancias y distancias; franjas, marcas, tramos de entradas y salidas
ok('function f(x){ return 5*x - 2; }' in E11 and 'var A = 1, L = 3, EPS = [1, 0.5], DEL = [0.2, 0.1];' in E11, 'H11 escena: función, a, L, tolerancias y distancias')
EP11 = [Fr(1), Fr(1, 2)]; DE11 = [e_/5 for e_ in EP11]
ok(DE11 == [Fr(1, 5), Fr(1, 10)], 'H11 escena: cada distancia es la quinta parte de su tolerancia')
ok('lmMarco(-0.6, 0.55, 5.5, 4.4, 0.6, 1.4, 1, 5)' in E11 and all(Fr('0.6') < 1 - d_ and 1 + d_ < Fr('1.4') and 1 < 3 - e_ and 3 + e_ < 5 for e_, d_ in zip(EP11, DE11)) and f11(Fr('0.6')) == 1 and f11(Fr('1.4')) == 5, 'H11 escena: las franjas caben en el marco y la recta va de esquina a esquina')
for e_, d_ in zip(EP11, DE11):
    ok(f11(1 - d_) == 3 - e_ and f11(1 + d_) == 3 + e_ and f11(1 + d_) - 3 == e_, 'H11 escena: los extremos del trozo dan los bordes de la franja verde (ε = %s)' % e_)
    implica11('H11 escena ε = %s' % e_, f11, 1, 3, d_, e_)
    ok("'\\\\varepsilon=%s'" % tex(e_) in E11 and "'\\\\delta=%s'" % tex(d_) in E11, 'H11 escena: rótulos de ε = %s y su δ' % e_)
pl11 = lambda z: tex(z).replace('{,}', ',')
ok("marca(M.x0, %s, '%s', C.alt, 1); marca(M.x0, %s, '%s', C.alt, 1)" % (3 - EP11[0], pl11(3 - EP11[0]), 3 + EP11[0], pl11(3 + EP11[0])) in E11 and "marca(M.x0, 2.5, '%s', C.alt, 1); marca(M.x0, 3.5, '%s', C.alt, 1)" % (pl11(3 - EP11[1]), pl11(3 + EP11[1])) in E11
   and "marca(0.8, M.y0, '%s', C.sec); marca(1.2, M.y0, '%s', C.sec)" % (pl11(1 - DE11[0]), pl11(1 + DE11[0])) in E11 and "marca(0.9, M.y0, '%s', C.sec); marca(1.1, M.y0, '%s', C.sec)" % (pl11(1 - DE11[1]), pl11(1 + DE11[1])) in E11, 'H11 escena: marcas de los bordes de las franjas')
ok((3 - 1, 3 + 1, 3 - Fr(1, 2), 3 + Fr(1, 2), 1 - Fr(1, 5), 1 + Fr(1, 5), 1 - Fr(1, 10), 1 + Fr(1, 10)) == (2, 4, Fr('2.5'), Fr('3.5'), Fr('0.8'), Fr('1.2'), Fr('0.9'), Fr('1.1')), 'H11 escena: bordes de las franjas')
ok('verde(EPS[0], ap(2)); azul(DEL[0], ap(3));' in E11 and 'entradas(DEL[0], Math.min(1, a*2), -2); trozo(DEL[0], Math.max(0, a*2 - 1));' in E11 and 'a = ap(5); salidas(DEL[0], a, 2);' in E11 and 'cota(1.385, L, 1.385, L + EPS[0], C.alt)' in E11 and 'cota(A, 1.3, A + DEL[0], 1.3, C.sec)' in E11
   and 'cota(1.25, L, 1.25, L + EPS[1], C.alt)' in E11 and 'cota(A, 1.6, A + DEL[1], 1.6, C.sec)' in E11 and 'var e = f(A + d) - L;' in E11 and 'lmPunto(S, M, A, L, C.tan, true, 3.2)' in E11 and 'hueco(A, M.y0, 0, dy, C.sec)' in E11 and 'hueco(M.x0, L, dx, 0, C.rise)' in E11, 'H11 escena: cada pieza en su paso, cotas desde 3 y desde 1, y huecos en (1, 3), en la entrada 1 y en la salida 3')
ok("['Pieza 1, «para toda tolerancia»: se elige', 'una, aquí %s. Franja verde: alturas de %s a %s.']" % (pl11(EP11[0]), pl11(3 - EP11[0]), pl11(3 + EP11[0])) in E11 and "['Pieza 2, «existe una distancia»: se responde', 'con %s. Franja azul: entradas de %s a %s.']" % (pl11(DE11[0]), pl11(1 - DE11[0]), pl11(1 + DE11[0])) in E11
   and "['Otra tolerancia, %s: la distancia %s ya no', 'sirve; con %s, sí. Las cuatro piezas otra vez.']" % (pl11(EP11[1]), pl11(DE11[0]), pl11(DE11[1])) in E11 and "'para toda tolerancia: el límite es 3.'" in E11 and "'no está definida en 1. Cerca de 1, llega a 3.'" in E11, 'H11 lienzo: frases con las tolerancias y distancias')
# la escena real, con node: etiquetas y lectura completas, reconstruidas con fracciones (cada número sale de una cuenta exacta)
NODO11 = r"""
const fs = require('fs'), p = process.argv[process.argv.length - 1];
global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; }, num:function(v, d){ var s = v.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', '{,}'); } };
(0, eval)(['_txt.js', '_det.js', '_lim.js', '11.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
var S = OA.scenes['formal-idea'], N = S.sliders[0].max, k, L = [], ap = [], v;
for (k = 1; k <= N; k++) L.push(S.readout({paso: k})[0][1]);
[0, 0.07, 0.2, 0.36, 0.5, 0.64, 0.8, 0.93, 0.999, 1].forEach(function(q){ v = {}; S.anim.apply(q, v); ap.push([q, v.paso, v.u]); });
console.log(JSON.stringify({n: N, lect: L, lab: S.labels, ap: ap, leg: S.legend, aria: S.aria}));
"""
c11 = lambda x: r'5\cdot %s=%s;\ \ f(%s)=%s-2=%s' % (tex(x), tex(5*x), tex(x), tex(5*x), tex(f11(x)))
Q11 = '\\\\&\\qquad '
XA11, XB11, XP11, XQ11 = Fr('0.9'), Fr('1.1'), Fr('1.15'), Fr('0.94')      # valores cercanos (paso 1) y valores de prueba (pasos 5 y 6)
ok(0 < abs(XP11 - 1) < DE11[0] and abs(f11(XP11) - 3) < EP11[0] and not abs(f11(XP11) - 3) < EP11[1] and f11(XP11) > 3 + EP11[1] and 0 < abs(XQ11 - 1) < DE11[1] and abs(f11(XQ11) - 3) < EP11[1], 'H11 lectura: los valores de prueba están en su franja; 1,15 sirve con ε = 1 y falla con ε = 0,5')
ok(abs(f11(XA11) - 3) == abs(f11(XB11) - 3) == Fr(1, 2) and f11(XA11) < 3 < f11(XB11), 'H11 lectura: valores cercanos a 1, a cada lado')
LE11 = [
    r'f(x)=5x-2\text{ si }x\ne 1;\ \ a=1;\ \ L=3' + Q11 + r'f(1)\text{ no está definida: hueco en }(1,3)' + Q11 + r'\text{cerca de }1:\ \ ' + c11(XA11) + Q11 + c11(XB11) + Q11 + r'\text{distancias a }3:\ \ |%s-3|=%s;\ \ |%s-3|=%s' % (tex(f11(XA11)), tex(abs(f11(XA11) - 3)), tex(f11(XB11)), tex(abs(f11(XB11) - 3))) + Q11 + r'\text{se propone }L=3\text{; hay que demostrarlo}',
    r'\text{pieza 1: «para todo }\varepsilon\gt 0\text{»}' + Q11 + r'\text{alguien elige la tolerancia; aquí }\varepsilon=%s' % tex(EP11[0]) + Q11 + r'\text{se pedirá }|f(x)-3|\lt %s' % tex(EP11[0]) + Q11 + r'\text{es decir: }3-%s\lt f(x)\lt 3+%s' % (tex(EP11[0]), tex(EP11[0])) + Q11 + r'3-%s=%s;\ \ 3+%s=%s' % (tex(EP11[0]), tex(3 - EP11[0]), tex(EP11[0]), tex(3 + EP11[0])) + Q11 + r'\text{franja verde: }%s\lt f(x)\lt %s' % (tex(3 - EP11[0]), tex(3 + EP11[0])),
    r'\text{pieza 2: «existe }\delta\gt 0\text{»; borrador para hallarla:}' + Q11 + r'f(x)-3=5x-2-3=5x-5' + Q11 + r'\text{factor común: }5x-5=5\,(x-1)' + Q11 + r'|f(x)-3|=|5|\cdot|x-1|=5\,|x-1|' + Q11 + r'\text{se quiere }5\,|x-1|\lt %s' % tex(EP11[0]) + Q11 + r'\text{se divide por }5:\ \ |x-1|\lt \tfrac{%s}{5}=%s' % (tex(EP11[0]), tex(EP11[0]/5)) + Q11 + r'\text{respuesta: }\delta=%s' % tex(DE11[0]),
    r'\text{pieza 3: «para todo }x\text{ con }0\lt |x-1|\lt %s\text{»}' % tex(DE11[0]) + Q11 + r'|x-1|\lt %s:\ \ 1-%s\lt x\lt 1+%s' % ((tex(DE11[0]),)*3) + Q11 + r'1-%s=%s;\ \ 1+%s=%s' % (tex(DE11[0]), tex(1 - DE11[0]), tex(DE11[0]), tex(1 + DE11[0])) + Q11 + r'0\lt |x-1|:\ \ x\ne 1' + Q11 + r'\text{entradas: }%s\lt x\lt %s,\ x\ne 1' % (tex(1 - DE11[0]), tex(1 + DE11[0])) + Q11 + r'\text{son todas, no algunas}',
    r'\text{pieza 4: «entonces }|f(x)-3|\lt %s\text{»; demostración:}' % tex(EP11[0]) + Q11 + r'\text{se parte de }|x-1|\lt %s' % tex(DE11[0]) + Q11 + r'\text{se multiplica por }5:\ \ 5\,|x-1|\lt 5\cdot %s=%s' % (tex(DE11[0]), tex(5*DE11[0])) + Q11 + r'\text{como }|f(x)-3|=5\,|x-1|:\ \ |f(x)-3|\lt %s' % tex(EP11[0]) + Q11 + r'\text{prueba: }' + c11(XP11) + Q11 + r'|%s-1|=%s\lt %s;\ \ |%s-3|=%s\lt %s' % (tex(XP11), tex(abs(XP11 - 1)), tex(DE11[0]), tex(f11(XP11)), tex(abs(f11(XP11) - 3)), tex(EP11[0])) + Q11 + r'\text{salidas: }%s\lt f(x)\lt %s,\ f(x)\ne 3' % (tex(f11(1 - DE11[0])), tex(f11(1 + DE11[0]))),
    r'\text{otra tolerancia: }\varepsilon=%s' % tex(EP11[1]) + Q11 + r'3-%s=%s;\ \ 3+%s=%s' % (tex(EP11[1]), tex(3 - EP11[1]), tex(EP11[1]), tex(3 + EP11[1])) + Q11 + r'\delta=%s\text{ ya no sirve: }f(%s)=%s\gt %s' % (tex(DE11[0]), tex(XP11), tex(f11(XP11)), tex(3 + EP11[1])) + Q11 + r'\text{nueva respuesta: }\tfrac{%s}{5}=%s;\ \ \delta=%s' % (tex(EP11[1]), tex(EP11[1]/5), tex(DE11[1])) + Q11 + r'1-%s=%s;\ \ 1+%s=%s' % (tex(DE11[1]), tex(1 - DE11[1]), tex(DE11[1]), tex(1 + DE11[1])) + Q11 + r'5\,|x-1|\lt 5\cdot %s=%s' % (tex(DE11[1]), tex(5*DE11[1])) + Q11 + r'\text{prueba: }' + c11(XQ11) + Q11 + r'|%s-1|=%s\lt %s;\ \ |%s-3|=%s\lt %s' % (tex(XQ11), tex(abs(XQ11 - 1)), tex(DE11[1]), tex(f11(XQ11)), tex(abs(f11(XQ11) - 3)), tex(EP11[1])),
    r'\text{las dos respuestas siguen la regla }\delta=\tfrac{\varepsilon}{5}:' + Q11 + r'\tfrac{%s}{5}=%s;\ \ \tfrac{%s}{5}=%s' % (tex(EP11[0]), tex(EP11[0]/5), tex(EP11[1]), tex(EP11[1]/5)) + Q11 + r'\text{para cualquier }\varepsilon\gt 0\text{: si }0\lt |x-1|\lt \tfrac{\varepsilon}{5},' + Q11 + r'|f(x)-3|=5\,|x-1|\lt 5\cdot \tfrac{\varepsilon}{5}=\varepsilon' + Q11 + r'\text{la frase completa se cumple: el límite es }3' + Q11 + r'f(1)\text{ no se usó en ningún paso}']
LB11 = {'R1': r'f(x)=5x-2,\ x\ne 1;\ \ a=1;\ \ L=3', 'R2': r'\text{para todo }\varepsilon\gt 0\ \ (\text{aquí }\varepsilon=%s)' % tex(EP11[0]), 'R3': r'\text{existe }\delta\gt 0\ \ (\text{aquí }\delta=%s)' % tex(DE11[0]), 'R4': r'\text{para todo }x\text{ con }0\lt |x-1|\lt %s' % tex(DE11[0]),
        'R5': r'\text{se cumple }|f(x)-3|\lt %s' % tex(EP11[0]), 'R6': r'\varepsilon=%s\ \to\ \delta=%s' % (tex(EP11[1]), tex(DE11[1])), 'R7': r'0\lt |x-1|\lt \tfrac{\varepsilon}{5}\ \Rightarrow\ |f(x)-3|\lt \varepsilon',
        'E1': r'\varepsilon=%s' % tex(EP11[0]), 'E2': r'\varepsilon=%s' % tex(EP11[1]), 'D1': r'\delta=%s' % tex(DE11[0]), 'D2': r'\delta=%s' % tex(DE11[1]), 'CF': 'y=5x-2', 'LA': 'a=1', 'LL': 'L=3', 'NX': r'\text{entradas, }x\ne 1',
        'GEN': r'\text{regla: }\delta=\tfrac{\varepsilon}{5}', 'F': r'\Longrightarrow\ \delta=\tfrac{\varepsilon}{5}\text{ sirve siempre}', 'Q': r'\text{¿por qué el límite en }1\text{ es }3\text{?}', 'EX': 'x', 'EY': 'y'}
def plano11(t):
    """TeX de una etiqueta → texto plano sin espacios, para compararlo con su respaldo"""
    t = t.replace('\\tfrac{\\varepsilon}{5}', 'ε/5')
    for a11, b11 in [('\\text{', ''), ('}', ''), ('{,', ','), ('\\varepsilon', 'ε'), ('\\delta', 'δ'), ('\\gt', '>'), ('\\lt', '<'), ('\\ne', '≠'), ('\\Longrightarrow', '⟹'), ('\\Rightarrow', '⟹'), ('\\to', '→'), ('\\ ', ''), ('-', '−'), (' ', '')]: t = t.replace(a11, b11)
    return t
if not SIN_NODO:
    R11 = json.loads(subprocess.run(['node', '-e', NODO11, str(PARTES)], capture_output=True, text=True, check=True).stdout)
    ok(R11['n'] == 7 == len(LE11), 'H11 escena: 7 pasos')
    ok({l[0]: l[1] for l in R11['lab']} == LB11, 'H11 escena: etiquetas distintas de las calculadas: ' + ', '.join(l[0] for l in R11['lab'] if LB11.get(l[0]) != l[1]))
    ok(all(plano11(l[1]) == l[2].replace(' ', '') for l in R11['lab']), 'H11 escena: el respaldo de una etiqueta no dice lo mismo que su TeX: ' + ' | '.join(l[2] for l in R11['lab'] if plano11(l[1]) != l[2].replace(' ', '')))
    for i11 in range(7):
        ok(R11['lect'][i11] == '\\begin{aligned}' + '\\\\[5pt]'.join('&\\textbf{%d.}\\ \\ %s' % (n11 + 1, LE11[n11]) for n11 in range(i11 + 1)) + '\\end{aligned}', 'H11 lectura real del paso %d: no coincide con la calculada con fracciones' % (i11 + 1))
    ok([a11[1] for a11 in R11['ap']] == [1, 1, 2, 3, 4, 5, 6, 7, 7, 7] and all(0 <= a11[2] <= 1 for a11 in R11['ap']) and R11['ap'][0][2] == 0 and R11['ap'][-1][2] > 0.99, 'H11 escena: la animación recorre los 7 pasos, cada uno con transición')
    ok('hueco en \\((1,3)\\)' in R11['leg'] and 'siete pasos' in R11['aria'] and 'épsilon igual a 0,5 y delta igual a 0,1' in R11['aria'] and 'entre 0,8 y 1,2' in R11['aria'] and 'entre las alturas 2 y 4' in R11['aria'], 'H11 escena: leyenda y descripción')

# 2) segundo recuadro: |F(x) − L| = |m|·|x − a| y la regla δ = ε/|m|, en rejilla, para todas las rectas de la hoja (y la identidad)
REC11 = [(f11, 1, 3, 5, -2, 'ancla f'), (g11, -1, -5, 6, 1, 'ej1 g'), (h11, 8, 4, Fr(1, 4), 2, 'ej2 h'), (r11, 2, 7, 3, 1, 'ej3 r'), (k11, 4, 1, -2, 9, 'A k'), (F11, 180, 356, Fr(9, 5), 32, 'C F'), (lambda x: Fr(x), Fr(7, 3), Fr(7, 3), 1, 0, 'identidad')]
for F_, a_, L_, m_, b_, et_ in REC11:
    ok(L_ == m_*a_ + b_ and m_ != 0 and abs(m_) > 0, 'H11 %s: L = ma + b y m ≠ 0' % et_)
    for x_ in RJ:
        if F_ is f11 and x_ == 1: continue
        ok(F_(x_) == m_*x_ + b_ and F_(x_) - L_ == m_*x_ + b_ - (m_*a_ + b_) == m_*x_ + b_ - m_*a_ - b_ == m_*x_ - m_*a_ == m_*(x_ - a_) and abs(F_(x_) - L_) == abs(m_)*abs(x_ - a_), 'H11 %s: borrador, pasos 1 a 4' % et_)
    for e_ in ES11:
        d_ = e_/abs(m_); ok(d_ > 0 and abs(m_)*d_ == e_, 'H11 %s: δ = ε/|m| es positiva y |m|·δ = ε' % et_)
        implica11('H11 %s, ε = %s' % (et_, e_), F_, a_, L_, d_, e_)
        ok(abs(F_(a_ + d_) - L_) == e_ == abs(F_(a_ - d_) - L_), 'H11 %s: en el borde de la franja la distancia es exactamente ε' % et_)
for c_ in (Fr(4), Fr(-3, 2), Fr(0)):                            # función constante: cualquier δ sirve
    for e_ in ES11:
        for d_ in (Fr(1), Fr(1000), Fr(1, 1000)): implica11('H11 constante %s' % c_, lambda x: c_, Fr(2), c_, d_, e_)
    ok(abs(c_ - c_) == 0, 'H11 constante: |c − c| = 0')
TB11 = re.findall(r'<table class="tbl">(.*?)</table>', A11, re.S); ok(len(TB11) == 2, 'H11 n.º de tablas')
fr11 = lambda q: ('\\dfrac{%d}{%d}' % (q.numerator, q.denominator)) if Fr(q).denominator != 1 else '%d' % int(q)
REG11 = [('5x-2', Fr(5)), ('6x+1', Fr(6)), ('9-2x', Fr(-2)), ('\\dfrac{x}{4}+2', Fr(1, 4)), ('x', Fr(1))]; E06 = Fr(3, 5)
ok(filas(TB11[1]) == [['\\(%s\\)' % n_, '\\(%s\\)' % fr11(m_), '\\(%s\\)' % fr11(abs(m_)), '\\(\\delta=%s\\)' % ('\\varepsilon' if abs(m_) == 1 else ('\\dfrac{\\varepsilon}{%d}' % int(abs(m_)) if abs(m_) > 1 else '%d\\,\\varepsilon' % int(1/abs(m_)))),
                              '\\(%s\\)' % (tex(E06) if abs(m_) == 1 else ('\\dfrac{%s}{%d}=%s' % (tex(E06), int(abs(m_)), tex(E06/abs(m_))) if abs(m_) > 1 else '%d\\cdot %s=%s' % (int(1/abs(m_)), tex(E06), tex(E06/abs(m_)))))] for n_, m_ in REG11], 'H11 tabla del segundo recuadro: pendiente, valor absoluto, regla y distancia para ε = 0,6')
ok('\\varepsilon=0{,}6' in A11 and [E06/abs(m_) for n_, m_ in REG11] == [Fr('0.12'), Fr('0.1'), Fr('0.3'), Fr('2.4'), Fr('0.6')] and 1/Fr(1, 4) == 4, 'H11 tabla del segundo recuadro: distancias')
# 3) primer recuadro: traducción a desigualdades e intervalos, y por qué el orden importa
for x_ in RJ:
    for a_ in (Fr(1), Fr(-1), Fr(8)):
        for d_ in (Fr(1, 5), Fr(1, 20), Fr(2)):
            ok((0 < abs(x_ - a_) < d_) == (a_ - d_ < x_ < a_ + d_ and x_ != a_) == ((a_ - d_ < x_ < a_) or (a_ < x_ < a_ + d_)) and (abs(x_ - a_) < d_) == (-d_ < x_ - a_ < d_), 'H11 k1: 0 < |x − a| < δ equivale a a − δ < x < a + δ con x ≠ a, y a la unión de los dos lados')
    for L_ in (Fr(3), Fr(-5)):
        for e_ in (Fr(1), Fr(3, 10)): ok((abs(x_ - L_) < e_) == (L_ - e_ < x_ < L_ + e_), 'H11 k1: |y − L| < ε equivale a L − ε < y < L + ε')
ok(filas(TB11[0]) == [['\\(0\\lt |x-a|\\lt \\delta\\)', '\\(a-\\delta\\lt x\\lt a+\\delta\\) y \\(x\\ne a\\)', '\\(x\\) está en \\((a-\\delta,\\,a)\\cup(a,\\,a+\\delta)\\)', '\\(%s\\lt x\\lt %s\\) y \\(x\\ne 1\\)' % (tex(1 - DE11[0]), tex(1 + DE11[0]))],
                              ['\\(|f(x)-L|\\lt \\varepsilon\\)', '\\(L-\\varepsilon\\lt f(x)\\lt L+\\varepsilon\\)', '\\(f(x)\\) está en \\((L-\\varepsilon,\\,L+\\varepsilon)\\)', '\\(%s\\lt f(x)\\lt %s\\)' % (tex(3 - EP11[0]), tex(3 + EP11[0]))]], 'H11 tabla del primer recuadro')
for d_ in ES11:                                                 # una sola δ para todas las tolerancias: imposible con f(x) = 5x − 2
    x_ = 1 + d_/2; ok(0 < abs(x_ - 1) < d_ and abs(f11(x_) - 3) == 5*(d_/2) == Fr(5, 2)*d_ and not abs(f11(x_) - 3) < Fr(5, 2)*d_, 'H11 k1: con x = 1 + δ/2 la distancia es 2,5·δ, que no es menor que la tolerancia 2,5·δ')
# 4) tercer recuadro: unicidad (ningún número queda a menos de |L₁ − L₂|/2 de los dos) y propiedades avisadas
LS11 = [Fr(i11, 4) for i11 in range(-12, 37)]                   # candidatos a L entre −3 y 9
for L1 in LS11[::5]:
    for L2 in LS11[::7]:
        if L1 == L2: continue
        e_ = abs(L1 - L2)/2; ok(e_ > 0 and e_ + e_ == 2*e_ == abs(L1 - L2), 'H11 unicidad: ε = |L₁ − L₂|/2 es positiva y 2ε = |L₁ − L₂|')
        for y_ in RJ[::3]:
            ok(abs(L1 - L2) <= abs(L1 - y_) + abs(y_ - L2) and abs(L1 - y_) == abs(y_ - L1) and not (abs(y_ - L1) < e_ and abs(y_ - L2) < e_), 'H11 unicidad: desigualdad triangular y contradicción')
for x_ in RJ:
    for y_ in RJ[::7]:
        ok(abs(x_*y_) == abs(x_)*abs(y_) and abs(-x_) == abs(x_) and abs(x_) >= 0 and (abs(x_) == 0) == (x_ == 0) and all(abs(x_ - y_) <= abs(x_ - w_) + abs(w_ - y_) for w_ in RJ[::11]), 'H11 aviso: propiedades del valor absoluto y desigualdad triangular')
    for c_ in (Fr(1, 2), Fr(1), Fr(3)): ok((abs(x_) < c_) == (-c_ < x_ < c_), 'H11 aviso: |u| < c equivale a −c < u < c')
# 5) ejemplos 1 y 2 y ejercicio A: controles con números
ok(g11(-1) == 6*(-1) + 1 == -5 and Fr('0.3')/6 == Fr('0.05') and (-1 - Fr('0.05'), -1 + Fr('0.05')) == (Fr('-1.05'), Fr('-0.95')) and abs(Fr('-1.04') + 1) == Fr('0.04') and 0 < Fr('0.04') < Fr('0.05') and 6*Fr('-1.04') == Fr('-6.24') and g11(Fr('-1.04')) == Fr('-6.24') + 1 == Fr('-5.24') and abs(Fr('-5.24') + 5) == Fr('0.24') < Fr('0.3'), 'H11 ej1')
implica11('H11 ej1 ε = 0,3', g11, -1, -5, Fr('0.05'), Fr('0.3'))
for x_ in RJ: ok(g11(x_) + 5 == 6*x_ + 1 + 5 == 6*x_ + 6 == 6*(x_ + 1) and x_ - (-1) == x_ + 1 and h11(x_) - 4 == x_/4 + 2 - 4 == x_/4 - 2 == Fr(1, 4)*(x_ - 8) and k11(x_) - 1 == 9 - 2*x_ - 1 == 8 - 2*x_ == -2*(x_ - 4) and F11(x_) - 356 == Fr(9, 5)*x_ + 32 - 356 == Fr(9, 5)*x_ - 324 == Fr(9, 5)*(x_ - 180), 'H11: diferencias y factor común de los ejemplos y ejercicios')
ok(h11(8) == 4 and Fr(1, 4)*8 == 2 and 4*Fr('0.5') == 2 and (8 - 2, 8 + 2) == (6, 10) and abs(Fr('9.6') - 8) == Fr('1.6') and 0 < Fr('1.6') < 2 and Fr('9.6')/4 == Fr('2.4') and h11(Fr('9.6')) == Fr('2.4') + 2 == Fr('4.4') and abs(Fr('4.4') - 4) == Fr('0.4') < Fr('0.5') and 2 > Fr('0.5'), 'H11 ej2')
implica11('H11 ej2 ε = 0,5', h11, 8, 4, 2, Fr('0.5'))
for e_ in ES11: ok(Fr(1, 4)*(4*e_) == e_ and 4*e_ > 0, 'H11 ej2: δ = 4ε')
ok((4 - Fr('0.05'), 4 + Fr('0.05'), 1 - Fr('0.1'), 1 + Fr('0.1')) == (Fr('3.95'), Fr('4.05'), Fr('0.9'), Fr('1.1')) and Fr('0.1')/2 == Fr('0.05') and abs(Fr('4.03') - 4) == Fr('0.03') and 0 < Fr('0.03') < Fr('0.05') and 2*Fr('4.03') == Fr('8.06') and k11(Fr('4.03')) == 9 - Fr('8.06') == Fr('0.94') and abs(Fr('0.94') - 1) == Fr('0.06') < Fr('0.1') and abs(-2) == 2, 'H11 A')
implica11('H11 A ε = 0,1', k11, 4, 1, Fr('0.05'), Fr('0.1'))
# 6) ejemplo 3: 8 no es el límite de r en 2 (negación), y una tolerancia grande sí tiene respuesta
falla11('H11 ej3: L = 8, ε = 1', r11, 2, 8, 1, lambda d: 2 - d/2)
for d_ in ES11:
    x_ = 2 - d_/2
    ok(abs(x_ - 2) == d_/2 and 0 < d_/2 < d_ and r11(x_) == 3*(2 - d_/2) + 1 == 6 - 3*d_/2 + 1 == 7 - 3*d_/2 and r11(x_) - 8 == 7 - 3*d_/2 - 8 == -1 - 3*d_/2 < 0 and abs(r11(x_) - 8) == 1 + 3*d_/2 > 1, 'H11 ej3: pasos 4 a 7 con δ = %s' % d_)
ok(3*Fr('1.9') == Fr('5.7') and r11(Fr('1.9')) == Fr('6.7') and 3*Fr('1.99') == Fr('5.97') and r11(Fr('1.99')) == Fr('6.97') and all(r11(2 - t) < 7 and 8 - r11(2 - t) > 1 for t in TS11 if t > 0) and r11(2) == 3*2 + 1 == 7, 'H11 ej3: exploración y límite verdadero')
implica11('H11 ej3: con L = 8, la tolerancia 3 tiene respuesta δ = 0,5', r11, 2, 8, Fr(1, 2), 3)
ok(r11(Fr('1.5')) == Fr('4.5') + 1 == Fr('5.5') and r11(Fr('2.5')) == Fr('7.5') + 1 == Fr('8.5') and 3*Fr('1.5') == Fr('4.5') and 3*Fr('2.5') == Fr('7.5') and 8 - Fr('5.5') == Fr('2.5') and Fr('8.5') - 8 == Fr('0.5') and all(Fr('5.5') < r11(2 + t/2) < Fr('8.5') and abs(r11(2 + t/2) - 8) < Fr('2.5') < 3 for t in TS11), 'H11 ej3: cotas de la tolerancia 3')
implica11('H11 ej3: el límite es 7 con δ = ε/3', r11, 2, 7, Fr(1, 3), 1)
# 7) ejemplo 4: escalón; para todo L la tolerancia 1,5 no tiene respuesta; los laterales son 2 y 5
ok(5 - 2 == 3 and Fr(3, 2) == Fr('1.5') and 2 + Fr('1.5') == Fr('3.5') and Fr('3.5') - 2 == Fr('1.5') == 5 - Fr('3.5') and e11(3) == 5 and e11(Fr('2.999')) == 2, 'H11 ej4: salto, tolerancia y punto medio')
for L_ in LS11:
    for d_ in ES11:
        x1, x2 = 3 - d_/2, 3 + d_/2
        ok(0 < abs(x1 - 3) == d_/2 < d_ and 0 < abs(x2 - 3) == d_/2 < d_ and e11(x1) == 2 and e11(x2) == 5, 'H11 ej4: las dos entradas y sus salidas')
        if L_ >= Fr('3.5'): ok(L_ > 2 and abs(e11(x1) - L_) == L_ - 2 >= Fr('1.5'), 'H11 ej4: caso L ≥ 3,5 (L = %s)' % L_)
        else: ok(L_ < 5 and abs(e11(x2) - L_) == 5 - L_ > Fr('1.5'), 'H11 ej4: caso L < 3,5 (L = %s)' % L_)
for e_ in ES11:
    for d_ in ES11[:4]: implica11('H11 ej4: lateral izquierdo 2', e11, 3, 2, d_, e_, -1); implica11('H11 ej4: lateral derecho 5', e11, 3, 5, d_, e_, 1)
# 8) ejercicio B: salto en 0; ningún L con la tolerancia 1; laterales −1 y 1
ok([j11(Fr(x)) for x in ('-0.1', '-0.01', '0.1', '0.01', '0')] == [Fr('-1.1'), Fr('-1.01'), Fr('1.2'), Fr('1.02'), 1] and 2*Fr('0.1') == Fr('0.2') and 2*Fr('0.01') == Fr('0.02') and Fr('-0.1') - 1 == Fr('-1.1') and Fr('-0.01') - 1 == Fr('-1.01'), 'H11 B: valores')
for L_ in LS11:
    for d_ in ES11:
        if L_ >= 0:
            x_ = -d_/2; ok(0 < abs(x_) == d_/2 < d_ and j11(x_) == -d_/2 - 1 and L_ - j11(x_) == L_ + d_/2 + 1 > 1 and abs(j11(x_) - L_) >= 1, 'H11 B c): caso L ≥ 0 (L = %s)' % L_)
        else:
            x_ = d_/2; ok(0 < abs(x_) == d_/2 < d_ and j11(x_) == 2*(d_/2) + 1 == d_ + 1 and j11(x_) - L_ == d_ + 1 - L_ > 1 and abs(j11(x_) - L_) >= 1, 'H11 B c): caso L < 0 (L = %s)' % L_)
for e_ in ES11:
    implica11('H11 B d): lateral izquierdo −1 con δ = ε', j11, 0, -1, e_, e_, -1); implica11('H11 B d): lateral derecho 1 con δ = ε/2', j11, 0, 1, e_/2, e_, 1)
    for t in TS11:
        if t < 0: x_ = t*e_; ok(j11(x_) - (-1) == x_ - 1 + 1 == x_ and abs(x_) == -x_ < e_, 'H11 B d): izquierda, |j(x) + 1| = −x')
        else: x_ = t*e_/2; ok(j11(x_) - 1 == 2*x_ + 1 - 1 == 2*x_ and abs(2*x_) == 2*x_ < 2*(e_/2) == e_, 'H11 B d): derecha, |j(x) − 1| = 2x')
# 9) ejercicio C: de grados Celsius a Fahrenheit; 356 es el límite en 180 y 360 no
ok(Fr('1.8')*180 == 324 and F11(180) == 324 + 32 == 356 and Fr(9)/Fr('1.8') == 5 and Fr('1.8')*5 == 9 and abs(183 - 180) == 3 < 5 and Fr('1.8')*183 == Fr('329.4') and F11(183) == Fr('329.4') + 32 == Fr('361.4') and abs(Fr('361.4') - 356) == Fr('5.4') < 9 and Fr('1.8')/Fr('1.8') == 1 and 360 - 356 == 4 and Fr('1.8')/2 == Fr('0.9'), 'H11 C: cuentas')
implica11('H11 C ε = 9', F11, 180, 356, 5, 9); implica11('H11 C ε = 1,8', F11, 180, 356, 1, Fr('1.8'))
falla11('H11 C d): L = 360, ε = 4', F11, 180, 360, 4, lambda d: 180 - d/2)
for d_ in ES11:
    c_ = 180 - d_/2; ok(abs(c_ - 180) == d_/2 and F11(c_) == Fr('1.8')*(180 - d_/2) + 32 == 324 - Fr('0.9')*d_ + 32 == 356 - Fr('0.9')*d_ and F11(c_) - 360 == 356 - Fr('0.9')*d_ - 360 == -4 - Fr('0.9')*d_ < 0 and abs(F11(c_) - 360) == 4 + Fr('0.9')*d_ > 4, 'H11 C d): pasos con δ = %s' % d_)
# 10) lo que la hoja afirma con palabras o símbolos, escrito tal cual (cuantificadores, negación, laterales, reglas y desigualdades)
for z11 in ['\\text{para todo }\\varepsilon\\gt 0\\text{ existe }\\delta\\gt 0\\text{ tal que, para todo }x,\\quad\\text{si }0\\lt |x-a|\\lt \\delta\\text{, entonces }|f(x)-L|\\lt \\varepsilon.',
            '\\forall\\,\\varepsilon\\gt 0\\ \\ \\exists\\,\\delta\\gt 0\\ \\ \\forall\\,x:\\ \\ 0\\lt |x-a|\\lt \\delta\\ \\Longrightarrow\\ |f(x)-L|\\lt \\varepsilon', 'definida en un intervalo abierto que contiene a \\(a\\), salvo quizá en \\(a\\), y sea \\(L\\) un número real',
            '\\text{existe }\\varepsilon\\gt 0\\text{ tal que, para todo }\\delta\\gt 0\\text{, hay un }x\\text{ con}\\]', '\\[0\\lt |x-a|\\lt \\delta\\quad\\text{y}\\quad|f(x)-L|\\ge \\varepsilon.\\]',
            'si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|f(x)-L|\\lt \\varepsilon\\)', 'si \\(a\\lt x\\lt a+\\delta\\), entonces \\(|f(x)-L|\\lt \\varepsilon\\)', 'la menor de las dos sirve para el límite',
            '\\displaystyle\\lim_{x\\to a}(mx+b)=ma+b\\), con \\(\\delta=\\dfrac{\\varepsilon}{|m|}', 'Sea \\(f(x)=mx+b\\) con \\(m\\ne 0\\), y \\(L=ma+b\\)', 'f(x)-L=mx+b-(ma+b)', 'mx-ma=m\\,(x-a)', '|f(x)-L|=|m|\\cdot|x-a|', '|m|\\cdot|x-a|\\lt |m|\\cdot\\dfrac{\\varepsilon}{|m|}=\\varepsilon',
            '<b>cualquier</b> \\(\\delta\\gt 0\\) sirve', '\\displaystyle\\lim_{x\\to a}c=c', '\\displaystyle\\lim_{x\\to a}x=a\\), con \\(\\delta=\\varepsilon', '\\dfrac{\\varepsilon}{1/4}=4\\,\\varepsilon',
            '\\varepsilon=\\dfrac{|L_{1}-L_{2}|}{2}', '|L_{1}-L_{2}|\\le |L_{1}-f(x)|+|f(x)-L_{2}|', '\\lt \\varepsilon+\\varepsilon=2\\,\\varepsilon', '2\\,\\varepsilon=2\\cdot\\dfrac{|L_{1}-L_{2}|}{2}=|L_{1}-L_{2}|', '|L_{1}-L_{2}|\\lt |L_{1}-L_{2}|', 'Luego \\(L_{1}=L_{2}\\)',
            '|f(x)-3|=5\\cdot\\dfrac{\\delta}{2}=2{,}5\\,\\delta', 'x=1+\\dfrac{\\delta}{2}', '\\displaystyle\\lim_{x\\to -1}(6x+1)=-5', '\\delta=\\dfrac{\\varepsilon}{6}', '6\\,|x+1|\\lt 6\\cdot\\dfrac{\\varepsilon}{6}=\\varepsilon', '\\delta=\\dfrac{0{,}3}{6}=0{,}05', '-1{,}05\\lt x\\lt -0{,}95', '0\\lt 0{,}04\\lt 0{,}05', '0{,}24\\lt 0{,}3',
            '\\displaystyle\\lim_{x\\to 8}\\left(\\dfrac{x}{4}+2\\right)=4', '\\dfrac{x}{4}-2=\\dfrac{1}{4}\\,(x-8)', '\\delta=4\\,\\varepsilon', '\\dfrac{1}{4}\\,|x-8|\\lt \\dfrac{1}{4}\\cdot 4\\,\\varepsilon=\\varepsilon', '\\delta=4\\cdot 0{,}5=2', '6\\lt x\\lt 10', '0\\lt 1{,}6\\lt 2', '0{,}4\\lt 0{,}5',
            'x=2-\\dfrac{\\delta}{2}', 'r(x)=3\\left(2-\\dfrac{\\delta}{2}\\right)+1=6-\\dfrac{3\\,\\delta}{2}+1=7-\\dfrac{3\\,\\delta}{2}', 'r(x)-8=7-\\dfrac{3\\,\\delta}{2}-8=-1-\\dfrac{3\\,\\delta}{2}', '|r(x)-8|=1+\\dfrac{3\\,\\delta}{2}', '|r(x)-8|\\ge 1=\\varepsilon', '\\(8\\) no es el límite', '1{,}5\\lt x\\lt 2{,}5', '5{,}5\\lt r(x)\\lt 8{,}5', 'sirve \\(\\delta=\\dfrac{\\varepsilon}{3}\\)',
            'e(x)=\\begin{cases}2&\\text{si }x\\lt 3\\\\[2pt] 5&\\text{si }x\\ge 3\\end{cases}', 'círculo vacío en \\((3,2)\\)', 'punto lleno \\((3,5)\\)', '\\varepsilon=\\dfrac{3}{2}=1{,}5', 'x_{1}=3-\\dfrac{\\delta}{2}', 'x_{2}=3+\\dfrac{\\delta}{2}', 'L-2\\ge 3{,}5-2=1{,}5', '5-L\\gt 5-3{,}5=1{,}5', '|e(x)-L|\\ge 1{,}5', 'el límite de \\(e\\) en \\(3\\) no existe', '\\displaystyle\\lim_{x\\to 3^{-}}e(x)=2', '\\displaystyle\\lim_{x\\to 3^{+}}e(x)=5',
            '3{,}95\\lt x\\lt 4{,}05', '0{,}9\\lt k(x)\\lt 1{,}1', '8-2x=-2\\,(x-4)', '|k(x)-1|=|-2|\\cdot|x-4|=2\\,|x-4|', '\\delta=\\dfrac{0{,}1}{2}=0{,}05', '0\\lt 0{,}03\\lt 0{,}05', '0{,}06\\lt 0{,}1', 'el límite es \\(1\\)',
            'j(x)=\\begin{cases}x-1&\\text{si }x\\lt 0\\\\[2pt] 2x+1&\\text{si }x\\ge 0\\end{cases}', 'círculo vacío en \\((0,-1)\\)', 'punto lleno \\((0,1)\\)', 'j(x)=-\\dfrac{\\delta}{2}-1', 'L-j(x)=L+\\dfrac{\\delta}{2}+1', 'j(x)=2\\cdot\\dfrac{\\delta}{2}+1=\\delta+1', 'j(x)-L=\\delta+1-L', 'j(x)-(-1)=x-1+1=x', 'j(x)-1=2x+1-1=2x', '2x\\lt 2\\cdot\\dfrac{\\varepsilon}{2}=\\varepsilon', '\\displaystyle\\lim_{x\\to 0^{-}}j(x)=-1', '\\displaystyle\\lim_{x\\to 0^{+}}j(x)=1',
            'F(c)=1{,}8\\,c+32', '1{,}8\\,c-324=1{,}8\\,(c-180)', '\\lt \\dfrac{9}{1{,}8}=5', '\\lt 1{,}8\\cdot 5=9', '\\delta=\\dfrac{\\varepsilon}{1{,}8}', '1{,}8\\cdot\\dfrac{\\varepsilon}{1{,}8}=\\varepsilon', '\\displaystyle\\lim_{c\\to 180}F(c)=356', 'c=180-\\dfrac{\\delta}{2}', 'F(c)=1{,}8\\left(180-\\dfrac{\\delta}{2}\\right)+32=324-0{,}9\\,\\delta+32=356-0{,}9\\,\\delta', 'F(c)-360=356-0{,}9\\,\\delta-360=-4-0{,}9\\,\\delta', '|F(c)-360|=4+0{,}9\\,\\delta', '\\(360\\) no es el límite',
            'sin demostrar', 'Desigualdad triangular', 'nunca de \\(x\\)', 'no puede depender de \\(x\\)', 'No es parte de la demostración', 'se refiere a los \\(x\\) en que \\(f\\) está definida', 'Uso de la definición formal de límite', 'f(x)=5x-2\\) para \\(x\\ne 1', 'hueco en \\((1,3)\\)', '\\delta=\\dfrac{\\varepsilon}{5}', 'entre \\(0{,}6\\) y \\(1{,}4\\) y alturas entre \\(1\\) y \\(5\\)']:
    ok(z11 in A11, 'H11: la hoja no trae «%s»' % z11)
ok(e11(3) == 5 and j11(0) == 1 and 0 - 1 == -1 and A11.count('<div class="def">') == 1, 'H11: puntos marcados de las gráficas descritas y recuadro de laterales')
# <<< H11
# >>> H12
# ───────── H12: uso de la definición formal de límite (funciones no lineales: zona no simétrica, δ = mín{tope, ε/c}) ─────────
A12, E12 = molde('12', 'H12_uso_de_la_definicion_formal_de_limite.html', 'Uso de la definición formal de límite', 'lim-uso', 'Definición formal de límite (épsilon-delta)', ['uso-idea'], 1)
def comprobar12():
    """todas las cuentas de H12; va en una función para no pisar nombres globales del verificador. Devuelve las funciones exactas de la hoja"""
    import importlib.util, math
    sp = importlib.util.spec_from_file_location('vtex12', VTEX); VT = importlib.util.module_from_spec(sp); bc = sys.dont_write_bytecode; sys.dont_write_bytecode = True; sp.loader.exec_module(VT); sys.dont_write_bytecode = bc   # limpiar() y evaluar() de verificar_tex, sin dejar __pycache__
    def rz(q):
        """raíz exacta de un racional (o None si no es cuadrado perfecto)"""
        q = Fr(q)
        if q < 0: return None
        n, d = math.isqrt(q.numerator), math.isqrt(q.denominator)
        return Fr(n, d) if n*n == q.numerator and d*d == q.denominator else None
    def f(x): return Fr(x)**2                                   # función ancla (a = 1), ejemplo 2 (a = −3) y área del ejercicio C
    def g(x):
        s = rz(x); assert s is not None, 'H12: raíz no exacta de %s' % x
        return s                                                # ejemplos 1 y 4: √x en a = 9
    def r(x):
        assert x != 0
        return 1/Fr(x)                                          # ejemplo 3 (a = 1), ejercicios A (a = 4) y B (a = 2)
    FUN = {'f': f, 'g': g, 'r': r, 'A': f}
    valores('H12 hoja', mates_de(A12), FUN, 6)
    pl = lambda z: tex(z, 9).replace('{,}', ',').replace('-', '−')
    # 0) cadenas: cada «a = b < c», «a > b», «a ≈ b»… puramente numérica (hoja y lectura de la escena) se recalcula eslabón por eslabón
    REL = re.compile(r'(=|\\lt(?![a-zA-Z])|\\gt(?![a-zA-Z])|\\le(?![a-zA-Z])|\\ge(?![a-zA-Z])|\\ne(?![a-zA-Z])|\\approx)')
    SEP = re.compile(r'\\qquad|\\quad|\\Longrightarrow|\\Rightarrow|\\Longleftrightarrow|\\\\(?:\[[^\]]*\])?|&|;|\\text\{[^{}]*\}|\\to(?![a-zA-Z])|\\ \\ |\\displaystyle|:')
    def lado(s):
        s = VT.limpiar(s).strip().rstrip('.,').strip()
        if not s or re.search(r'[A-Za-z]', re.sub(r'\\(?:sqrt|dfrac|frac|tfrac)', '', s)): return None
        try: return VT.evaluar(s).v
        except Exception: return None
    def compara(a, rel, b, texto_b):
        ex = not isinstance(a, float) and not isinstance(b, float); fa, fb = float(a), float(b)
        if rel == '=': return a == b if ex else math.isclose(fa, fb, rel_tol=1e-12, abs_tol=1e-12)
        if rel == '\\ne': return a != b if ex else abs(fa - fb) > 1e-9
        if rel == '\\approx':
            t = VT.limpiar(texto_b).strip().rstrip('.,').strip(); dec = len(t.split('.')[1]) if '.' in t else 0
            return a != b and abs(fa - fb) <= 0.5*10**(-dec) + 1e-12            # redondeo declarado: no es igualdad y el error no pasa de media unidad del último decimal
        if not ex and abs(fa - fb) < 1e-9: return False                        # con raíces no exactas, una desigualdad tan justa no se da por buena
        return {'\\lt': a < b, '\\gt': a > b, '\\le': a <= b, '\\ge': a >= b}[rel]
    def cadenas(et, mates, min_des):
        n = 0
        for mt in mates:
            for parte in SEP.split(mt):
                tr = REL.split(parte)
                if len(tr) < 3: continue
                vs = [lado(x) for x in tr[0::2]]
                for i, rel in enumerate(tr[1::2]):
                    if vs[i] is None or vs[i + 1] is None: continue
                    if rel != '=': n += 1
                    ok(compara(vs[i], rel, vs[i + 1], tr[2*i + 2]), '%s: no se cumple «%s %s %s»' % (et, tr[2*i].strip(), rel, tr[2*i + 2].strip()))
        ok(n >= min_des, '%s: se esperaban al menos %d comparaciones numéricas y se hallaron %d' % (et, min_des, n))
    cadenas('H12 hoja', mates_de(A12), 34)
    # las comparaciones dichas con palabras: «\(… = v\), mayor que \(w\)» y «menor que»
    n = 0
    for m in re.finditer(r'\\\(((?:(?!\\\)).)*)\\\),? (?:que es )?(mayor|menor) que \\\(((?:(?!\\\)).)*)\\\)', A12):
        a, b = lado(m.group(1).split('=')[-1]), lado(m.group(3))
        if a is None or b is None: continue
        n += 1; ok(a > b if m.group(2) == 'mayor' else a < b, 'H12 hoja: «%s» no es %s que «%s»' % (m.group(1), m.group(2), m.group(3)))
    ok(n >= 13, 'H12 hoja: se esperaban al menos 13 comparaciones con palabras y hay %d' % n); n0 = n
    for m in re.finditer(r'[Ee]l menor entre \\\(((?:(?!\\\)).)*)\\\) y \\\(((?:(?!\\\)).)*)\\\)(?:, que)? es \\\(((?:(?!\\\)).)*)\\\)', A12):
        n += 1; ok(min(lado(m.group(1)), lado(m.group(2))) == lado(m.group(3).split('\\approx')[0]), 'H12 hoja: el menor entre %s y %s no es %s' % m.groups())
    ok(n - n0 >= 9, 'H12 hoja: se esperaban al menos 9 frases «el menor entre … y … es …» y hay %d' % (n - n0))

    # 1) la escena: función, lugar, llegada, tolerancia, zona, distancias y x de prueba
    ok('function f(x){ return x*x; }' in E12 and 'var A = 1, L = 1, EPS = 0.96, X1 = 0.2, X2 = 1.4, DEL = [0.4, 0.32], DM = 0.8, XM = 1.7;' in E12, 'H12 escena: función y datos')
    e, x1, x2, d0, d1, dm, xm = Fr('0.96'), Fr('0.2'), Fr('1.4'), Fr('0.4'), Fr('0.32'), Fr('0.8'), Fr('1.7')
    ok(f(1) == 1 and x1**2 == 1 - e == Fr('0.04') and x2**2 == 1 + e == Fr('1.96') and 0 < x1 < 1 < x2, 'H12 escena: los extremos de la zona son las raíces exactas de los bordes de la franja')
    ok(1 - x1 == dm and x2 - 1 == d0 and min(dm, d0) == d0 and dm != d0 and e/3 == d1 and min(Fr(1), e/3) == d1 < d0, 'H12 escena: distancias 0,8 y 0,4; la menor; la regla da 0,32')
    ok(0 < abs(xm - 1) == Fr('0.7') < dm and f(xm) == Fr('2.89') > 1 + e and 1 + dm == Fr('1.8'), 'H12 escena: x = 1,7 está a menos de 0,8 de 1 y su altura sale de la franja')
    ok('lmMarco(-0.6, 0.55, 5.5, 4.4, 0, 2, 0, 3.2)' in E12 and 1 + e < Fr('3.2') and f(xm) < Fr('3.2') and 1 + dm < 2 and 0 < x1, 'H12 escena: todo lo dibujado cabe en el marco')
    for s in ("marca(M.x0, %s, '%s', C.alt); marca(M.x0, %s, '%s', C.alt)" % (float(1 - e), pl(1 - e), float(1 + e), pl(1 + e)), "marca(X1, M.y0, '%s', C.rise); marca(X2, M.y0, '%s', C.rise)" % (pl(x1), pl(x2)), "marca(XM, M.y0, '%s', C.ink)" % pl(xm), "marca(A + DM, M.y1, '%s', C.ink)" % pl(1 + dm),
              "marca(A - DEL[0], M.y0, '%s', C.sec)" % pl(1 - d0), "marca(A - DEL[1], M.y1, '%s', C.sec); marca(A + DEL[1], M.y1, '%s', C.sec)" % (pl(1 - d1), pl(1 + d1)), 'cota(0.07, L, 0.07, L + EPS, C.alt)', 'cota(A - DEL[0], 1.3, A, 1.3, C.sec)', 'cota(A - DEL[1], 2.12, A, 2.12, C.sec)',
              'cota(A, 0.3, A - (A - X1)*a, 0.3, mu); cota(A, 0.3, A + (X2 - A)*a, 0.3, mu)', 'azul(DEL[0], Math.min(1, ap(5)*2)); azul(DEL[1], Math.min(1, ap(6)*1.6));', 'rect(M.x0, L - EPS, b, L + EPS, C.alt, 0.15)', 'lmCurva(S, M, f, A - (A - X1)*a, A + (X2 - A)*a, C.rise, 3.2)', 'lmPunto(S, M, XM, f(XM), C.ink, false, 3)',
              "'Tolerancia para la salida: %s. La altura debe', 'quedar en la franja verde, entre %s y %s.'" % (pl(e), pl(1 - e), pl(1 + e)), "'Bajo él, en el eje: los x entre %s y %s.'" % (pl(x1), pl(x2)), "'De 1 al extremo izquierdo hay %s; al derecho,', '%s. La zona no es simétrica respecto de 1.'" % (pl(dm), pl(d0)),
              "'Sirve la menor distancia: %s. Con %s falla:', 'el punto negro, sobre %s, sale de la franja.'" % (pl(d0), pl(dm), pl(xm)), "'Una distancia menor también sirve: %s. Es la'" % pl(d1), "'Regla para toda tolerancia: el menor entre 1 y', 'la tercera parte de la tolerancia.'", 'world:{x0:-1.3, x1:5.3, y0:-6.35, y1:6.9}, aspect:13.25/6.6'):
        ok(s in E12, 'H12 escena: falta «%s»' % s)
    # 2) rejillas: tolerancias y fracciones del tramo
    ES = [Fr('0.96'), Fr('0.3'), Fr('0.03'), Fr(6), Fr(1, 2), Fr('0.7'), Fr(1, 4), Fr('6.1'), Fr(100), Fr(1, 10**6), Fr(7, 3), Fr('0.05')]
    TS = [Fr(j, 40) for j in range(-39, 40) if j]                                  # 0 < |t| < 1
    def sirve(F, a, L, d, eps, dom=lambda x: True): return all(dom(a + t*d) and abs(F(a + t*d) - L) < eps for t in TS)
    # la tolerancia 0,96: sirven 0,4 y todo lo menor; nada mayor que 0,4 (entra x = 1,4, cuya salida está justo a 0,96)
    for d in (d0, d1, Fr('0.1'), Fr('0.001'), d0/7): ok(sirve(f, 1, 1, d, e), 'H12: con ε = 0,96 debería servir δ = %s' % d)
    for d in (d0 + Fr(1, 1000), Fr(1, 2), dm): ok(0 < abs(x2 - 1) < d and not abs(f(x2) - 1) < e and abs(f(x2) - 1) == e, 'H12 k1: con δ = %s > 0,4 entra x = 1,4 y no cumple' % d)
    ok(not sirve(f, 1, 1, dm, e), 'H12: δ = 0,8 no debería servir para ε = 0,96')
    # 3) reglas δ = mín{tope, ε/c}: la cota del factor en todo el tramo del tope y la implicación para muchas tolerancias
    def regla(et, F, a, L, tope, c, dom=lambda x: True):
        for eps in ES:
            d = min(Fr(tope), eps/Fr(c)); ok(d > 0 and d <= tope and d*c <= eps and sirve(F, a, L, d, eps, dom), '%s: la regla falla con ε = %s' % (et, eps))
            ok(sirve(F, a, L, d/2, eps, dom) and sirve(F, a, L, d/10, eps, dom), '%s: una distancia menor también debería servir (ε = %s)' % (et, eps))
    regla('H12 k2 x² en 1, mín{1, ε/3}', f, 1, 1, 1, 3); regla('H12 k2 x² en 1, mín{1/2, 2ε/5}', f, 1, 1, Fr(1, 2), Fr(5, 2)); regla('H12 ej2 x² en −3, mín{1, ε/7}', f, -3, 9, 1, 7)
    regla('H12 ej3 1/x en 1, mín{1/2, ε/2}', r, 1, 1, Fr(1, 2), 2, lambda x: x != 0); regla('H12 B 1/x en 2, mín{1, 2ε}', r, 2, Fr(1, 2), 1, Fr(1, 2), lambda x: x != 0); regla('H12 C x² en 30, mín{1, ε/61}', f, 30, 900, 1, 61)
    for t in TS:
        x = 1 + t; ok(-1 < x - 1 < 1 and 1 < x + 1 < 3 and abs(x + 1) == x + 1 < 3 and abs(x - 1)*abs(x + 1) < 3*abs(x - 1), 'H12 k2: cota |x + 1| < 3 cuando |x − 1| < 1')
        x = 1 + t/2; ok(Fr(-1, 2) < x - 1 < Fr(1, 2) and Fr(3, 2) < x + 1 < Fr(5, 2) and Fr(1, 2) < x < Fr(3, 2) and abs(x) == x and 1/abs(x) < 2 and abs(x - 1)/abs(x) < 2*abs(x - 1), 'H12 k2 y ej3: cotas con el tope 1/2')
        x = -3 + t; ok(-1 < x + 3 < 1 and -7 < x - 3 < -5 and abs(x - 3) < 7 and abs(x + 3)*abs(x - 3) < 7*abs(x + 3), 'H12 ej2: cota |x − 3| < 7 cuando |x + 3| < 1')
        x = 2 + t; ok(1 < x < 3 and abs(x) == x > 1 and 1/abs(x) < 1 and abs(x - 2)/2/abs(x) < abs(x - 2)/2, 'H12 B: cota 1/|x| < 1 cuando |x − 2| < 1')
        x = 30 + t; ok(59 < x + 30 < 61 and abs(x + 30) < 61 and abs(f(x) - 900) < 61*abs(x - 30), 'H12 C: cota |x + 30| < 61 cuando |x − 30| < 1')
        x = 9 + 9*t; ok(-9 < x - 9 < 9 and 0 < x < 18, 'H12 ej4: con |x − 9| < 9 todos los x son positivos')
        x = 1 + t*Fr('0.32'); ok(Fr('0.68') < x < Fr('1.32') and Fr('1.68') < x + 1 < Fr('2.32') < 3, 'H12 escena, paso 6: 1,68 < x + 1 < 2,32')
    ok(1 - Fr('0.32') == Fr('0.68') and 1 + Fr('0.32') == Fr('1.32') and Fr('0.32')*3 == e and 0 < abs(Fr('1.3') - 1) < d1 and abs(f(Fr('1.3')) - 1) == Fr('0.69') < e, 'H12 escena, paso 6: cuenta y prueba')
    for x in RJ:
        ok(f(x) - 1 == (x - 1)*(x + 1) and f(x) - 9 == (x + 3)*(x - 3) and f(x) - 900 == (x - 30)*(x + 30) and abs(x - (-3)) == abs(x + 3) and abs(1 - x) == abs(x - 1) and abs(2 - x) == abs(x - 2), 'H12: diferencias de cuadrados y valores absolutos')
        if x != 0: ok(r(x) - 1 == (1 - x)/x and abs(r(x) - 1) == abs(x - 1)*(1/abs(x)) and r(x) - Fr(1, 2) == (2 - x)/(2*x) and abs(r(x) - Fr(1, 2)) == abs(x - 2)/2*(1/abs(x)), 'H12 ej3 y B: denominador común')
        for y in RJ[::7]:
            ok(abs(x*y) == abs(x)*abs(y) and abs(-x) == abs(x) and (y == 0 or abs(x/y) == abs(x)/abs(y)), 'H12 aviso: propiedades del valor absoluto')
            if x >= 0 and y >= 0: ok((x < y) == (x*x < y*y), 'H12 aviso: u < v equivale a u² < v² (u, v ≥ 0)')
            if 0 < x < y: ok(1/y < 1/x, 'H12 aviso: inversos')
        for c in (Fr(1, 2), Fr(1), Fr(3)): ok((abs(x) < c) == (-c < x < c), 'H12 aviso: |u| < c equivale a −c < u < c')
    # raíz: rejilla de raíces exactas s = √x ≥ 0
    SS = [Fr(j, 50) for j in range(0, 301)]                                       # 0 ≤ s ≤ 6
    for s in SS:
        x = s*s; ok(g(x) == s and (s - 3)*(s + 3) == x - 9 and s + 3 >= 3 and abs(s - 3) == abs(x - 9)/(s + 3) <= abs(x - 9)/3, 'H12 ej4: conjugado y cota inferior del denominador')
    for eps in ES:
        d = min(Fr(9), 3*eps); k = 0
        for s in SS:
            if 0 < abs(s*s - 9) < d: k += 1; ok(s*s > 0 and abs(s - 3) < eps, 'H12 ej4: la regla mín{9, 3ε} falla con ε = %s en x = %s' % (eps, s*s))
        ok(k > 0 or d < Fr(1, 4), 'H12 ej4: la rejilla no probó nada con ε = %s' % eps)
    # 4) ejemplo 1: zona, distancias, la mayor que sirve y el contraejemplo de la otra
    ok(g(9) == 3 and 3 - Fr(1, 2) == Fr('2.5') and 3 + Fr(1, 2) == Fr('3.5') and Fr('2.5')**2 == Fr('6.25') and Fr('3.5')**2 == Fr('12.25') and 9 - Fr('6.25') == Fr('2.75') and Fr('12.25') - 9 == Fr('3.25') and 9 - Fr('2.75') == Fr('6.25') and 9 + Fr('2.75') == Fr('11.75') < Fr('12.25'), 'H12 ej1: zona y distancias')
    k = 0
    for s in SS:
        if 0 < abs(s*s - 9) < Fr('2.75'): k += 1; ok(abs(s - 3) < Fr(1, 2), 'H12 ej1: δ = 2,75 debería servir (x = %s)' % (s*s))
    ok(k > 20 and abs(g(Fr('6.25')) - 3) == Fr(1, 2) and 0 < abs(6 - 9) == 3 < Fr('3.25') and 6 < Fr('6.25') and Fr('2.449')**2 < 6 < Fr('2.45')**2 and 3 - Fr('2.45') > Fr(1, 2) and 3 - Fr('2.5') == Fr(1, 2), 'H12 ej1: la mayor distancia y el contraejemplo x = 6')
    ok(0 < abs(Fr('7.29') - 9) == Fr('1.71') < Fr('2.75') and g(Fr('7.29')) == Fr('2.7') and abs(Fr('2.7') - 3) == Fr('0.3') < Fr(1, 2) and 3*Fr(1, 2) == Fr('1.5') and min(Fr(9), Fr('1.5')) == Fr('1.5') < Fr('2.75'), 'H12 ej1 y ej4: prueba y comparación')
    # 5) k3: contraejemplos de las elecciones malas y el redondeo hacia abajo
    for et, eps, d, x, y in (('la mayor de las dos distancias', e, dm, Fr('1.7'), Fr('2.89')), ('δ = ε/2', Fr(1, 2), Fr(1, 2)/2, Fr('1.24'), Fr('1.5376')), ('δ = ε/3 sin el mín', Fr(6), Fr(6)/3, Fr('2.9'), Fr('8.41')), ('δ = 0,225 redondeado hacia arriba', Fr(1, 2), Fr('0.225'), Fr('1.2249'), Fr('1.50038001'))):
        ok(0 < abs(x - 1) < d and f(x) == y and not abs(y - 1) < eps and not sirve(f, 1, 1, d, eps) or (et.startswith('δ = 0,225') and 0 < abs(x - 1) < d and f(x) == y and not abs(y - 1) < eps), 'H12 k3: contraejemplo de «%s»' % et)
    ok(abs(Fr('2.89') - 1) == Fr('1.89') and abs(Fr('1.5376') - 1) == Fr('0.5376') and abs(Fr('8.41') - 1) == Fr('7.41') and Fr('0.5')/2 == Fr('0.25') and min(Fr(1), Fr(2)) == 1 and sirve(f, 1, 1, 1, 6), 'H12 k3: distancias de los contraejemplos')
    ok(sirve(f, 1, 1, Fr('0.224'), Fr(1, 2)) and (1 - Fr('0.224'))**2 == Fr('0.602176') > Fr(1, 2) and (1 + Fr('0.224'))**2 == Fr('1.498176') < Fr('1.5') and Fr('1.225')**2 > Fr('1.5') and sirve(f, 1, 1, Fr(1, 6), Fr(1, 2)) and Fr(1, 2)/3 == Fr(1, 6) < Fr('0.224'), 'H12 k3: 0,224 sirve, 0,225 no, y 1/6 sirve')
    n = 0
    for m in re.finditer(r'(?<!-)\\sqrt\{(%s)\}\\approx (%s)' % (NUMTEX, NUMTEX), A12):
        q, v = D(m.group(1)), D(m.group(2)); h = Fr(5, 10**(ndec(v) + 1)); n += 1; ok(ndec(v) == 3 and (v - h)**2 <= q <= (v + h)**2, 'H12 hoja: √%s ≈ %s mal redondeada' % (m.group(1), m.group(2)))
    ok(n == 4, 'H12 hoja: se esperaban 4 raíces con ≈ y hay %d' % n)
    ok((1 - Fr('0.2935'))**2 <= Fr(1, 2) <= (1 - Fr('0.2925'))**2 and (1 + Fr('0.2245'))**2 <= Fr('1.5') <= (1 + Fr('0.2255'))**2 and abs(Fr(2, 3) - Fr('0.667')) <= Fr(5, 10**4) and abs(Fr(1, 6) - Fr('0.167')) <= Fr(5, 10**4) and Fr('0.66') < Fr(2, 3), 'H12: diferencias con raíz y fracciones redondeadas (encierro)')
    ok('\\(1-\\sqrt{0{,}5}\\approx 0{,}293\\)' in A12 and '\\(\\sqrt{1{,}5}-1\\approx 0{,}225\\)' in A12 and '\\(\\dfrac{2}{3}\\approx 0{,}667\\)' in A12 and '\\(\\dfrac{1}{6}\\approx 0{,}167\\)' in A12 and Fr('1.2245')**2 == Fr('1.49940025') and Fr('1.2255')**2 == Fr('1.50185025'), 'H12: aproximaciones declaradas')
    # 6) tabla del recuadro k2: ε, ε/3, δ, x de prueba, |x − 1|, x², |x² − 1|
    TB = re.findall(r'<table class="tbl">(.*?)</table>', A12, re.S); ok(len(TB) == 1, 'H12 n.º de tablas')
    FK = [[D(z.strip('\\() ')) for z in fl] for fl in filas(TB[0])]
    ok([fl[0] for fl in FK] == [Fr('0.96'), Fr('0.3'), Fr('0.03'), 6] and all(len(fl) == 7 for fl in FK), 'H12 tabla k2: tolerancias y columnas')
    for eps, t3, d, x, dx, y, dy in FK:
        ok(t3 == eps/3 and d == min(Fr(1), t3) and dx == abs(x - 1) and 0 < dx < d and y == f(x) and dy == abs(y - 1) and dy < eps, 'H12 tabla k2 fila ε = %s' % eps)
    # 7) ejemplos 2 y 3 y ejercicios: números de las pruebas
    ok(f(-3) == 9 and Fr('0.7')/7 == Fr('0.1') and min(Fr(1), Fr('0.1')) == Fr('0.1') and 0 < abs(Fr('-3.05') + 3) == Fr('0.05') < Fr('0.1') and f(Fr('-3.05')) == Fr('9.3025') and abs(Fr('9.3025') - 9) == Fr('0.3025') < Fr('0.7'), 'H12 ej2: prueba')
    ok(r(Fr('0.01')) == 100 and 0 < abs(Fr('0.01') - 1) < 1 and not abs(r(Fr('0.01')) - 1) < 100 - 1 and Fr('0.5')/2 == Fr('0.25') and min(Fr(1, 2), Fr('0.25')) == Fr('0.25') and 0 < abs(Fr('0.8') - 1) == Fr('0.2') < Fr('0.25') and r(Fr('0.8')) == Fr('1.25') and abs(Fr('1.25') - 1) == Fr('0.25') < Fr('0.5'), 'H12 ej3: el tope 1 no acota y la prueba')
    for eps in ES:                                                               # ej3: con el tope 1 (δ = mín{1, ε/2}) hay tolerancias sin garantía: no existe cota de 1/|x| en 0 < x < 2
        ok(any(abs(r(Fr(1, n)) - 1) >= eps for n in (2, 10, 1000, 10**9)) or eps > 10**8, 'H12 ej3: 1/x no está acotada cerca de 0')
    za, zb = 1/Fr('0.3'), 1/Fr('0.2')
    ok(r(4) == Fr('0.25') and Fr('0.25') - Fr('0.05') == Fr('0.2') and Fr('0.25') + Fr('0.05') == Fr('0.3') and za == Fr(10, 3) and zb == 5 and 4 - za == Fr(2, 3) and zb - 4 == 1 and min(Fr(2, 3), Fr(1)) == Fr(2, 3) and r(za) == Fr('0.3') and r(zb) == Fr('0.2'), 'H12 A: zona y distancias')
    ok(sirve(r, 4, Fr(1, 4), Fr(2, 3), Fr('0.05')) and not sirve(r, 4, Fr(1, 4), 1, Fr('0.05')) and abs(r(za) - Fr(1, 4)) == Fr('0.05') and 0 < abs(Fr('3.5') - 4) == Fr(1, 2) < Fr(2, 3) and r(Fr('3.5')) == Fr(2, 7) and Fr(2, 7) - Fr(1, 4) == Fr(1, 28) < Fr(1, 20) == Fr('0.05'), 'H12 A: la mayor distancia es 2/3 y la prueba')
    ok(0 < abs(Fr('3.2') - 4) == Fr('0.8') < 1 and r(Fr('3.2')) == Fr('0.3125') > Fr('0.3') and abs(Fr('0.3125') - Fr('0.25')) == Fr('0.0625') > Fr('0.05'), 'H12 A d): la distancia 1 no sirve')
    ok(2*Fr('0.25') == Fr('0.5') and min(Fr(1), Fr('0.5')) == Fr('0.5') and 0 < abs(Fr('1.6') - 2) == Fr('0.4') < Fr('0.5') and r(Fr('1.6')) == Fr('0.625') and abs(Fr('0.625') - Fr('0.5')) == Fr('0.125') < Fr('0.25'), 'H12 B d)')
    ok(f(30) == 900 and 61*Fr('0.1') == Fr('6.1') and Fr('6.1')/61 == Fr('0.1') and 0 < abs(Fr('30.09') - 30) == Fr('0.09') < Fr('0.1') and f(Fr('30.09')) == Fr('905.4081') and abs(Fr('905.4081') - 900) == Fr('5.4081') < Fr('6.1') and sirve(f, 30, 900, Fr('0.1'), Fr('6.1')), 'H12 C b) y c)')
    ok(Fr(6, 60) == Fr('0.1') and 0 < abs(Fr('30.0999') - 30) == Fr('0.0999') < Fr('0.1') and f(Fr('30.0999')) == Fr('906.00398001') and abs(Fr('906.00398001') - 900) == Fr('6.00398001') > 6 and 2*30 == 60, 'H12 C d): dividir por 60 no sirve')
    # 8) lo que la hoja afirma con palabras o símbolos, escrito tal cual (definición y reglas)
    for z in ['Sea \\(f\\) definida en un intervalo abierto que contiene a \\(a\\), salvo quizá en \\(a\\).', 'para todo \\(\\varepsilon\\gt 0\\) existe \\(\\delta\\gt 0\\) tal que, para todo \\(x\\),', '\\[0\\lt |x-a|\\lt \\delta\\ \\Longrightarrow\\ |f(x)-L|\\lt \\varepsilon\\]', '\\[\\delta\\le \\text{mín}\\{a-x_{1},\\ x_{2}-a\\}\\]',
              '\\delta=\\text{mín}\\left\\{1,\\ \\dfrac{\\varepsilon}{3}\\right\\}', '\\delta=\\text{mín}\\left\\{\\dfrac{1}{2},\\ \\dfrac{2\\,\\varepsilon}{5}\\right\\}', '\\delta=\\text{mín}\\left\\{1,\\ \\dfrac{\\varepsilon}{7}\\right\\}', '\\delta=\\text{mín}\\left\\{\\dfrac{1}{2},\\ \\dfrac{\\varepsilon}{2}\\right\\}', '\\delta=\\text{mín}\\{9,\\ 3\\,\\varepsilon\\}', '\\delta=\\text{mín}\\{1,\\ 2\\,\\varepsilon\\}', '\\delta=\\text{mín}\\left\\{1,\\ \\dfrac{\\varepsilon}{61}\\right\\}',
              '\\(\\delta\\le 0{,}4\\)', '\\(\\delta=2{,}75\\)', '\\(\\delta=\\dfrac{2}{3}\\)', '\\(\\delta=0{,}5\\)', '\\(0{,}2\\lt x\\lt 1{,}4\\)', '\\(6{,}25\\lt x\\lt 12{,}25\\)', '\\(\\dfrac{10}{3}\\lt x\\lt 5\\)', '\\(1\\lt x+1\\lt 3\\)', '\\(-7\\lt x-3\\lt -5\\)', '\\(\\dfrac{1}{2}\\lt x\\lt \\dfrac{3}{2}\\)', '\\(\\dfrac{3}{2}\\lt x+1\\lt \\dfrac{5}{2}\\)', '\\(59\\lt x+30\\lt 61\\)', '\\(0\\lt x\\lt 18\\)', '\\(1\\lt x\\lt 3\\)',
              '\\lt 3\\cdot\\dfrac{\\varepsilon}{3}=\\varepsilon', '\\lt 7\\cdot\\dfrac{\\varepsilon}{7}=\\varepsilon', '\\lt 2\\cdot\\dfrac{\\varepsilon}{2}=\\varepsilon', '\\lt \\dfrac{3\\,\\varepsilon}{3}=\\varepsilon', '\\lt \\dfrac{2\\,\\varepsilon}{2}=\\varepsilon', '\\lt 61\\cdot 0{,}1=6{,}1',
              'sirven \\(0{,}4\\), \\(0{,}32\\), \\(0{,}1\\) y \\(0{,}001\\)', 'La distancia \\(0{,}224\\) sirve', 'La distancia \\(0{,}225\\) <b>no</b> sirve', 'sin demostrar', 'nunca de \\(x\\)', 'La distancia \\(1\\) no sirve', '\\(\\displaystyle\\lim_{x\\to 1}x^{2}=1\\)', '\\(\\displaystyle\\lim_{x\\to 30}A(x)=900\\)', '\\(\\displaystyle\\lim_{x\\to -3}x^{2}=9\\)', '\\(\\displaystyle\\lim_{x\\to 9}\\sqrt{x}=3\\)', '\\(\\displaystyle\\lim_{x\\to 1}\\dfrac{1}{x}=1\\)', '\\(\\displaystyle\\lim_{x\\to 2}\\dfrac{1}{x}=\\dfrac{1}{2}\\)']:
        ok(z in A12, 'H12: la hoja no trae «%s»' % z)
    ok(Fr(1, 2)/Fr(5, 2) == Fr(1, 5) and Fr(2, 5)*Fr(1, 2) == Fr(1, 5), 'H12 k2: con el tope 1/2 la regla es mín{1/2, 2ε/5}')
    # 9) la escena real (node): registro, rótulos y lectura del último paso
    if not SIN_NODO:
        nodo = "const fs = require('fs'), p = process.argv[process.argv.length - 1]; global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; } }; (0, eval)(['_txt.js', '_det.js', '_lim.js', '12.scene.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\\n')); var S = OA.scenes['uso-idea']; console.log(JSON.stringify({l: S.readout({paso: 7})[0][1], lab: S.labels}));"
        J = json.loads(subprocess.run(['node', '-e', nodo, str(PARTES)], capture_output=True, text=True, check=True).stdout); Lc = J['l']; lab = {l[0]: l for l in J['lab']}
        ES_ = {'Q': '\\varepsilon=%s\\text{: ¿qué distancia }\\delta\\text{ sirve?}' % tex(e), 'F': '\\Longrightarrow\\ \\delta\\le %s' % tex(d0), 'CF': 'y=x^{2}', 'LA': 'a=1', 'LL': 'L=1', 'E1': '\\varepsilon=%s' % tex(e), 'DA': tex(dm), 'DB': tex(d0), 'D1': '\\delta=%s' % tex(d0), 'D2': '\\delta=%s' % tex(d1),
               'PM': 'f(%s)=%s' % (tex(xm), tex(f(xm))), 'GEN': '\\delta=\\text{mín}\\{1,\\tfrac{\\varepsilon}{3}\\}', 'R1': 'f(x)=x^{2};\\ \\ a=1;\\ \\ L=1', 'R2': '\\varepsilon=%s:\\ \\ %s\\lt x^{2}\\lt %s' % (tex(e), tex(1 - e), tex(1 + e)), 'R3': '\\text{con }x\\gt 0:\\ \\ %s\\lt x\\lt %s' % (tex(x1), tex(x2)),
               'R4': '1-%s=%s;\\ \\ %s-1=%s' % (tex(x1), tex(1 - x1), tex(x2), tex(x2 - 1)), 'R5': '\\delta=%s;\\ \\ \\text{con }%s:\\ f(%s)=%s\\gt %s' % (tex(d0), tex(dm), tex(xm), tex(f(xm)), tex(1 + e)), 'R6': '\\delta=%s:\\ \\ |x^{2}-1|\\lt %s\\cdot 3=%s' % (tex(d1), tex(d1), tex(d1*3)),
               'R7': '\\delta=\\text{mín}\\{1,\\tfrac{\\varepsilon}{3}\\}\\ \\Rightarrow\\ |x^{2}-1|\\lt \\varepsilon'}
        for kk, vv in ES_.items(): ok(kk in lab and lab[kk][1] == vv, 'H12 escena: el rótulo %s no es «%s»' % (kk, vv))
        for l in J['lab']:                                                         # el respaldo (lo que se ve sin TeX) trae los mismos números que la etiqueta
            ok([D(z) for z in re.findall(r'\d+(?:\{,\}\d+)?', l[1].replace('^{2}', ''))] == [D(z) for z in re.findall(r'\d+(?:,\d+)?', l[2])], 'H12 escena: el respaldo de %s no trae los mismos números' % l[0])
        LL = [z for z in re.split(r'\\\\\[5pt\]|\\\\&\\qquad ', Lc[len('\\begin{aligned}'):-len('\\end{aligned}')])]
        cadenas('H12 escena (lectura)', LL, 5)
        for s in ('f(0{,}9)=0{,}9^{2}=%s' % tex(f(Fr('0.9'))), 'f(1{,}1)=1{,}1^{2}=%s' % tex(f(Fr('1.1'))), '|0{,}81-1|=0{,}19;\\ \\ |1{,}21-1|=0{,}21', '\\text{tolerancia para la salida: }\\varepsilon=%s' % tex(e), '\\text{se pide }|x^{2}-1|\\lt %s' % tex(e), '1-%s\\lt x^{2}\\lt 1+%s' % (tex(e), tex(e)),
                  '1-%s=%s;\\ \\ 1+%s=%s' % (tex(e), tex(1 - e), tex(e), tex(1 + e)), '\\text{franja verde: }%s\\lt x^{2}\\lt %s' % (tex(1 - e), tex(1 + e)), '\\sqrt{%s}\\lt x\\lt \\sqrt{%s}' % (tex(1 - e), tex(1 + e)), '%s^{2}=%s,\\text{ así que }\\sqrt{%s}=%s' % (tex(x1), tex(1 - e), tex(1 - e), tex(x1)),
                  '%s^{2}=%s,\\text{ así que }\\sqrt{%s}=%s' % (tex(x2), tex(1 + e), tex(1 + e), tex(x2)), '\\text{zona de los }x:\\ \\ %s\\lt x\\lt %s' % (tex(x1), tex(x2)), '\\text{izquierda: }1-%s=%s' % (tex(x1), tex(dm)), '\\text{derecha: }%s-1=%s' % (tex(x2), tex(d0)), '%s\\ne %s\\text{: la zona no es simétrica respecto de }1' % (tex(dm), tex(d0)),
                  '\\text{el menor entre }%s\\text{ y }%s\\text{ es }%s;\\ \\ \\delta=%s' % (tex(dm), tex(d0), tex(min(dm, d0)), tex(d0)), '1-%s=%s;\\ \\ 1+%s=%s' % (tex(d0), tex(1 - d0), tex(d0), tex(1 + d0)), '%s\\lt x\\lt %s\\text{ queda dentro de }%s\\lt x\\lt %s' % (tex(1 - d0), tex(1 + d0), tex(x1), tex(x2)),
                  '\\text{con la mayor }(%s)\\text{ se revisaría hasta }1+%s=%s' % (tex(dm), tex(dm), tex(1 + dm)), '\\text{y no sirve; prueba con }x=%s:' % tex(xm), '|%s-1|=%s\\lt %s' % (tex(xm), tex(abs(xm - 1)), tex(dm)), 'f(%s)=%s^{2}=%s' % (tex(xm), tex(xm), tex(f(xm))), '%s\\gt %s\\text{: sale de la franja}' % (tex(f(xm)), tex(1 + e)),
                  '\\text{una distancia más chica y cómoda: }\\delta=%s' % tex(d1), '1-%s=%s;\\ \\ 1+%s=%s' % (tex(d1), tex(1 - d1), tex(d1), tex(1 + d1)), '|x^{2}-1|=|x-1|\\cdot |x+1|', '\\text{si }|x-1|\\lt %s:\\ \\ %s\\lt x\\lt %s' % (tex(d1), tex(1 - d1), tex(1 + d1)), '\\text{se suma }1:\\ \\ %s\\lt x+1\\lt %s' % (tex(2 - d1), tex(2 + d1)),
                  '%s\\lt 3\\text{, luego }|x+1|\\lt 3' % tex(2 + d1), '|x^{2}-1|\\lt %s\\cdot 3=%s' % (tex(d1), tex(e)), '\\text{prueba: }f(1{,}3)=1{,}3^{2}=%s' % tex(f(Fr('1.3'))), '|%s-1|=%s\\lt %s' % (tex(f(Fr('1.3'))), tex(f(Fr('1.3')) - 1), tex(e)), '\\text{¿de dónde sale }%s\\text{? De la regla}' % tex(d1),
                  '\\tfrac{%s}{3}=%s' % (tex(e), tex(e/3)), '\\text{el menor entre }1\\text{ y }%s\\text{ es }%s' % (tex(e/3), tex(min(Fr(1), e/3))), '|x-1|\\lt 1\\text{, y entonces }|x+1|\\lt 3', '|x^{2}-1|=|x-1|\\cdot |x+1|\\lt \\tfrac{\\varepsilon}{3}\\cdot 3=\\varepsilon', '\\text{toda tolerancia tiene respuesta: el límite es }1'):
            ok(s in LL or any(s in z for z in LL), 'H12 escena (lectura): falta «%s»' % s)
    return FUN
FUN12 = comprobar12()
# <<< H12

ESPER = {'vel-idea': (7, FUN2), 'gra-idea': (6, FUN3), 'gra-casos': (5, FUN3), 'grf-idea': (5, FUN4), 'asi-idea': (6, FUN5), 'tab-idea': (6, FUN6), 'est-idea': (6, FUN7)}
# >>> H08 ESPER
ESPER['uni-idea'] = (6, FUN8)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '08.scene.js'].map(function(a){ return fs.readFileSync")
# <<< H08 ESPER
# >>> H09 ESPER
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '09.scene.js'].map(function(a){ return fs.readFileSync"); ok("'09.scene.js'" in NODO2, 'H09: la escena no quedó en la lista de node')
ESPER['usa-idea'] = (7, FUN9)
# <<< H09 ESPER
# >>> H10 ESPER
ESPER['eps-idea'] = (6, FUN10)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '10.scene.js'].map(function(a){ return fs.readFileSync")   # H10 agrega su escena a la lista que carga node
# <<< H10 ESPER
# >>> H11 ESPER
ESPER['formal-idea'] = (7, FUN11)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '11.scene.js'].map(function(a){ return fs.readFileSync"); ok("'11.scene.js'" in NODO2, 'H11: la escena no quedó en la lista de node')
# <<< H11 ESPER
# >>> H12 ESPER
ESPER['uso-idea'] = (7, FUN12)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '12.scene.js'].map(function(a){ return fs.readFileSync"); ok("'12.scene.js'" in NODO2, 'H12: la escena no quedó en la lista de node')   # H12 agrega su escena a la lista que carga node
# <<< H12 ESPER
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

# Revisión general (24-nov): H01 v002, H02 v002, H03 v002
_D = Fr
def _f1(x): return (x*x - 1)/(x - 1)
ok([(x*x, x*x - 1, x - 1, _f1(x)) for x in (_D('0.9'), _D('0.99'), _D('1.01'), _D('1.1'))] == [(_D('0.81'), _D('-0.19'), _D('-0.1'), _D('1.9')), (_D('0.9801'), _D('-0.0199'), _D('-0.01'), _D('1.99')), (_D('1.0201'), _D('0.0201'), _D('0.01'), _D('2.01')), (_D('1.21'), _D('0.21'), _D('0.1'), _D('2.1'))], 'H01 v002 encabezado')
ok(all((x - c)*(x + c) == x*x + x*c - c*x - c*c == x*x - c*c for x in range(-6, 7) for c in (1, 2, 3)), 'H01 v002 diferencias de cuadrados desarrolladas')
ok(1 - _D('0.1') == _D('0.9') and _D('0.9') + 1 == _D('1.9') and 2 - _D('1.9') == _D('0.1') and 1 + _D('0.1') == _D('1.1') and _D('1.1') + 1 == _D('2.1') and _D('2.1') - 2 == _D('0.1'), 'H01 v002 k2 con d = 0,1')
ok((_D('0.9') + 1, _D('0.99') + 1, 4 - _D('1.1'), 4 - _D('1.01')) == (_D('1.9'), _D('1.99'), _D('2.9'), _D('2.99')), 'H01 v002 k3 salto con números')
ok((_D('2.9')**2, _D('2.9')**2 - 9, _D('2.9') - 3, _D('-0.59')/_D('-0.1')) == (_D('8.41'), _D('-0.59'), _D('-0.1'), _D('5.9')) and (_D('3.1')**2, _D('3.1')**2 - 9, _D('3.1') - 3, _D('0.61')/_D('0.1')) == (_D('9.61'), _D('0.61'), _D('0.1'), _D('6.1')) and abs(_D('-0.1')) == -(_D('-0.1')) == _D('0.1'), 'H01 v002 ej1 filas y ej3')
ok([(b*b - 1, b - 1, (b*b - 1)/(b - 1)) for b in (2, _D('1.5'), _D('1.1'), _D('1.01'))] == [(3, 1, 3), (_D('1.25'), _D('0.5'), _D('2.5')), (_D('0.21'), _D('0.1'), _D('2.1')), (_D('0.0201'), _D('0.01'), _D('2.01'))] and (2**2, _D('1.5')**2, _D('1.1')**2, _D('1.01')**2) == (4, _D('2.25'), _D('1.21'), _D('1.0201')), 'H02 v002 encabezado')
ok(all((a + h)*(a + h) == a*a + a*h + h*a + h*h == a*a + 2*a*h + h*h and (a + h)**2 - a*a == 2*a*h + h*h == h*(2*a + h) and (h == 0 or ((a + h)**2 - a*a)/h == 2*a + h) for a in (1, 2, 3, _D('2.5')) for h in (_D(k, 10) for k in range(-12, 13))), 'H02 v002 «lo mismo, escrito» y demostración')
ok(2 + _D('0.1') == _D('2.1') and 2 - _D('0.5') == _D('1.5') and _D('3.1')**2 == _D('9.61') and _D('9.61') - 9 == _D('0.61') and _D('0.61')/_D('0.1') == _D('6.1') == 2*3 + _D('0.1') and 3 + _D('-0.1') == _D('2.9') and 3**2 == 9 and 2*3 == 6 and 2**2 == 4 and 2*2 == 4, 'H02 v002 comprobaciones, ej1 y B')
ok(all((0 < abs(x) < Fr(1, r)) <= (x*x < Fr(1, r*r) and 1/(x*x) > r*r) for r in (1, 2, 10, 100) for x in (_D(k, 1000) for k in range(-1500, 1501) if k)) and _D('0.01') < _D('0.1') and 1/_D('0.01') == 100 > 10 == 1/_D('0.1'), 'H02 v002 ej4 desigualdad')
def _f3(x): return x*x/2
ok([( x*x, _f3(x)) for x in (1, _D('1.5'), _D('1.9'), 3, _D('2.5'), _D('2.1'))] == [(1, _D('0.5')), (_D('2.25'), _D('1.125')), (_D('3.61'), _D('1.805')), (9, _D('4.5')), (_D('6.25'), _D('3.125')), (_D('4.41'), _D('2.205'))], 'H03 v002 encabezado')
ok(all((x/2 + _D('1.01')) - (x/2 + 1) == _D('0.01') and (x == 2 or ((x - 2)*(x + 2))/(2*(x - 2)) == (x + 2)/2 == x/2 + 1) and 2*x - 4 == 2*(x - 2) for x in (_D(k, 10) for k in range(-40, 61))) and _D('0.01')*3 == _D('0.03') and _D('0.03')*10 == _D('0.3'), 'H03 v002 k3 y ej2')
ok(_D('1.8')/2 + 1 == _D('0.9') + 1 == _D('1.9') and _D('2.2')/2 + 1 == _D('1.1') + 1 == _D('2.1') and _D('2.2')/2 + 2 == _D('1.1') + 2 == _D('3.1') and Fr(2, 2) + 1 == 2 and Fr(2, 2) + 2 == 3, 'H03 v002 ej3 y ej4')
ok([(G4(x), x + 1) for x in (_D(2), _D('2.5'), _D('2.9'))] == [(3, 3), (_D('3.5'), _D('3.5')), (_D('3.9'), _D('3.9'))] and [(G4(x), 7 - x) for x in (_D(4), _D('3.5'), _D('3.1'))] == [(3, 3), (_D('3.5'), _D('3.5')), (_D('3.9'), _D('3.9'))], 'H04 v002 encabezado: seis alturas cerca de a = 3')
ok([(G4(x), 7 - x) for x in (_D(4), _D('4.5'), _D('4.9'))] == [(3, 3), (_D('2.5'), _D('2.5')), (_D('2.1'), _D('2.1'))] and [(G4(x), 10 - x) for x in (_D(6), _D('5.5'), _D('5.1'))] == [(4, 4), (_D('4.5'), _D('4.5')), (_D('4.9'), _D('4.9'))] and 2 != 5, 'H04 v002 encabezado: seis alturas cerca de a = 5')
ok(all(s in A4 for s in ('<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La notación.</b>', 'se lee «el límite de \\(f(x)\\) cuando \\(x\\) tiende a \\(a\\) es \\(L\\)»', 'por la izquierda»', 'por la derecha»', 'se lee «si y solo si»', '<b>límites laterales</b>', '<b>función por trozos</b>', '<b>Qué se confirma ahora:</b>', '<b>Cómo funciona el método:</b>')), 'H04 v002 encabezado y k2: de dónde sale, se lee, qué se confirma y método')
ok((0 + 1, 3 + 1, 7 - 3, 7 - 5, 10 - 5, 10 - 8) == (1, 4, 4, 2, 5, 2) and (G4(_D(0)), G4(_D(3)), G4(_D(5)), G4(_D(8))) == (1, 1, 5, 2) and G4(_D(3)) != 4 and G4(_D(5)) != 2, 'H04 v002 de dónde sale el dibujo: extremos, puntos llenos y huecos')
ok((7 - _D('4.9'), 7 - _D('4.99'), 7 - _D('4.999'), 7 - 5) == (_D('2.1'), _D('2.01'), _D('2.001'), 2) and all(x + 1 == 1*x + 1 and 7 - x == -1*x + 7 and 10 - x == -1*x + 10 and 3 - x == -1*x + 3 and x/2 == Fr(1, 2)*x + 0 and 2*x == 2*x + 0 for x in (_D(k, 10) for k in range(0, 81))), 'H04 v002 aviso de rigor: hecho 1 con números y valores de c y d')
ok((G4(_D('1.9')), G4(_D('2.1')), G4(_D('2.9')), G4(_D('3.1')), G4(_D('4.9')), G4(_D('5.1'))) == (_D('1.9') + 1, _D('2.1') + 1, _D('2.9') + 1, 7 - _D('3.1'), 7 - _D('4.9'), 10 - _D('5.1')) == (_D('2.9'), _D('3.1'), _D('3.9'), _D('3.9'), _D('2.1'), _D('4.9')) and (2 + 1, 3 + 1, 7 - 3, 7 - 5, 10 - 5) == (3, 4, 4, 2, 5) and G4(_D(2)) == 3 and G4(_D(3)) == 1 != 4 and G4(_D(5)) == 5, 'H04 v002 k1 y k2: valores cercanos, llegadas y valores')
ok(Fr(2 + 3, 2) == Fr(5, 2) == _D('2.5') == 7 - _D('4.5') and Fr(4 + 5, 2) == Fr(9, 2) == _D('4.5') and Fr(3 + 4, 2) == Fr(7, 2) == _D('3.5') == _D('2.5') + 1, 'H04 v002 k3, ej2 y A: promedios')
ok((G4(_D('0.99')), G4(_D('1.01')), G4(_D('4.49')), G4(_D('4.51'))) == (_D('0.99') + 1, _D('1.01') + 1, 7 - _D('4.49'), 7 - _D('4.51')) == (_D('1.99'), _D('2.01'), _D('2.51'), _D('2.49')) and G4(_D(1)) == 1 + 1 == 2 and G4(_D(4)) == 7 - 4 == 3, 'H04 v002 ej1 y ej2: segundo valor cercano por cada lado')
ok((1 + 1, 7 - _D('4.5'), 10 - 6, 5 - 2) == (2, _D('2.5'), 4, 3) and G4(_D(3)) == 1 and (G4(_D('0.1')), G4(_D('0.01')), G4(_D('7.9')), G4(_D('7.99')), G4(_D('5.01'))) == (_D('1.1'), _D('1.01'), _D('2.1'), _D('2.01'), _D('4.99')), 'H04 v002 ej3, ej4 y A: casos con número y salto')
ok((3 - 0, 3 - 2, Fr(2, 2), Fr(4, 2), 3 - 2) == (3, 1, 1, 2, 1) and (H4(_D(0)), H4(_D('1.9')), H4(_D('2.1')), H4(_D('3.9')), H4(_D(4)), H4(_D('4.01')), H4(_D('4.1')), H4(_D(6))) == (3, _D('1.1'), _D('1.05'), _D('1.95'), 2, 3, 3, 3), 'H04 v002 B: las fórmulas calzan con los puntos, valores y salto')
ok((2*0, 2*3, 2*3 - 6, 6 - 6, 2*6 - 6, 12 - 6) == (0, 6, 0, 0, 6, 6) and (V4(_D(0)), V4(_D(3)), V4(_D(6))) == (0, 0, 6) and 2*_D('1.5') == 3 and 6 != 0, 'H04 v002 C: las fórmulas calzan con los puntos')
ok("frase('hueco', 5, 2, 9, 0, C.tan)" in E4 and "frase('punto lleno', 5, 5, -7, -10, C.tan, 'right')" in E4 and "frase('llegan a 4, al hueco', 3, 4, 0, -14, C.ink, 'center')" in E4 and G4(_D(5)) == 5 != 2 == 7 - 5 and 3 + 1 == 7 - 3 == 4 != G4(_D(3)) and all(z in A4 for z in ('está escrito «hueco»', '«punto lleno»', '«llegan a 4, al hueco»', 'Anillos naranjas sobre el eje vertical (paso 5)')), 'H04 v002 escena: rótulos «hueco» y «punto lleno» en la figura y en «cómo leerla»')
print('%d comprobaciones%s' % (N[0], '; SIN node: las lecturas con deslizador no se evaluaron con el código de la escena (sí su aritmética exacta)' if SIN_NODO else '; lecturas de los deslizadores evaluadas con el código de la escena'))
print('Lote 29 H01–H12: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
