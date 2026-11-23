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

print('%d comprobaciones%s' % (N[0], '; SIN node: las lecturas con deslizador no se evaluaron con el código de la escena (sí su aritmética exacta)' if SIN_NODO else '; lecturas de los deslizadores evaluadas con el código de la escena'))
print('Lote 29 H01: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
