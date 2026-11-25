#!/usr/bin/env python3
"""Lote 30 · Propiedades de límites: comprobación exacta de las cuentas de las hojas.
Aritmética con fractions; identidades y desigualdades en rejilla; todas las igualdades numéricas del texto se recalculan
con verificar_tex.py; las lecturas de las escenas por pasos se obtienen del código real de la escena (node, si está
instalado) y se revisa cada número que muestran.
Cada hoja agrega su bloque entre marcas «# >>> HNN» / «# <<< HNN» y lo de su escena en «# >>> HNN ESPER»."""
from fractions import Fraction as Fr
import json, pathlib, re, shutil, subprocess, sys, tempfile
err = []; N = [0]
def ok(c, m):
    N[0] += 1
    if not c: err.append(m)
RAIZ = pathlib.Path(__file__).resolve().parents[2]
PARTES = RAIZ/'taller'/'src'/'l30'/'partes'
D = lambda s: Fr(s.replace('{,}', '.').replace(',', '.').replace('−', '-'))
def tex(q, dmax=6):
    """número exacto en TeX con coma decimal, sin ceros de relleno; falla si no es decimal exacto con dmax cifras"""
    q = Fr(q); e = q*10**dmax
    assert e.denominator == 1, 'no es decimal exacto: %s' % q
    s = '%d' % abs(e.numerator); s = s.rjust(dmax + 1, '0'); s = s[:-dmax] + '.' + s[-dmax:]; s = s.rstrip('0').rstrip('.')
    return ('-' if q < 0 else '') + s.replace('.', '{,}')
pl = lambda z: tex(z).replace('{,}', ',')   # el mismo número como texto plano del lienzo
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
def molde(nn, archivo, titulo, ident, caja, escenas, nque):
    A = (PARTES/('%s.art.html' % nn)).read_text(encoding='utf-8'); E = (PARTES/('%s.scene.js' % nn)).read_text(encoding='utf-8'); h = 'H' + nn
    ok(A.startswith('<!--file:%s-->\n<!--title:%s-->\n<!--id:%s-->\n<!--tab:%s %s-->\n<article class="sheet" id="%s" data-hoja="L30 %s">' % (archivo, titulo, ident, h, titulo, ident, h)), h + ' encabezado')
    ok('<h1>%s</h1>' % titulo in A and '<span class="status">CD-L30-%s · v001 · Pendiente de APR</span>' % h in A and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>%s</li>\n      <li><b>%s</b></li>' % (caja, titulo) in A, h + ' título, ruta y pie')
    ok(re.findall(r'data-scene="([^"]+)"', A) == escenas and re.findall(r"OA\.scene\('([^']+)'", E) == escenas, h + ' escenas')
    for m in re.finditer(r'<div class="stage"', A): ok(A[:m.start()].rstrip().endswith('</ol>'), h + ': falta «cómo leerla» justo antes de una animación')
    ok(A.count('<p><b>Cómo leerla:</b></p>') >= 1 and A.count('<ul class="keys">') == len(escenas), h + ' cómo leerla y claves')
    ok(E.count('hold:3000') == len(escenas) and E.count('dtQue(S,') == len(escenas) and E.count('dtPasos(R.slice(0, k))') == len(escenas) and E.count('oaReg(S, k, N') == len(escenas), h + ' hold, franja, lectura acumulada y registro')
    ok(all(A.count(z) == 1 for z in ('card k1', 'card k2', 'card k3', 'prop p1', 'prop p2', 'prop p3', 'prop p4')) and A.count('<div class="ex">') == 3 and A.count('<summary>Pista</summary>') == 3 and A.count('<summary>Solución paso a paso</summary>') == 3 and 'De la vida cotidiana' in A and '<b>Modelo:</b>' in A and A.count('class="why"') == 2 and 'Aviso de rigor' in A, h + ' recuadros, ejemplos, ejercicios y avisos')
    ok([z for z in re.findall(r'<span class="n">(\w)</span>', A)] == ['A', 'B', 'C'], h + ' ejercicios A, B y C')
    FR = [x for par in re.findall(r"\['([^'\\]*)', '([^'\\]*)'\](?=[,\]])", ''.join(E[m.start():E.index('return {', m.start())] for m in re.finditer(r'var TXT', E))) for x in par] + re.findall(r"frase\('([^']*)'", E)
    ok(len(FR) >= 10 and all(len(x) <= 50 for x in FR), h + ' frases del lienzo de 50 caracteres o menos: ' + ', '.join(x for x in FR if len(x) > 50))
    QUE = re.findall(r"dtQue\(S, '([^']*)', '([^']*)'\)", E)
    ok(len(QUE) == nque and all(len(a) <= 45 and len(b) <= 50 for a, b in QUE), h + ' franjas «Qué muestra»')
    ok(not re.search(r'\d\.\d', re.sub(r'<!--.*?-->', '', A)) and '\\sin' not in A and '\\sin' not in E, h + ' decimales con coma')
    ok(A.count('\\(') == A.count('\\)') and A.count('\\[') - A.count('\\\\[') == A.count('\\]'), h + ' delimitadores TeX balanceados')
    ok(not re.search(r'\\\([^)]*?[<>][^)]*?\\\)', A), h + ': < o > sueltos dentro de TeX (usar \\lt, \\gt)')
    vtex(h + ' hoja', PARTES/('%s.art.html' % nn))
    return A, E
RJ = [Fr(p, q) for p in range(-12, 13) for q in (1, 2, 3, 4, 5, 10)]   # rejilla de racionales entre −12 y 12
SIN_NODO = shutil.which('node') is None

# ───────── escenas por pasos del lote, con el código real (node); cada hoja agrega su escena en su bloque ESPER ─────────
NODO2 = r"""
const fs = require('fs'), p = process.argv[process.argv.length - 1];
global.OA = { scenes:{}, scene:function(n, d){ OA.scenes[n] = d; }, num:function(v, d){ var s = v.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', '{,}'); } };
(0, eval)(['_txt.js', '_det.js', '_lim.js'].map(function(a){ return fs.readFileSync(p + '/' + a, 'utf8'); }).join('\n'));
var out = {};
Object.keys(OA.scenes).forEach(function(n){ var S = OA.scenes[n], N = S.sliders[0].max, k, L = [], C = [], v;
  for (k = 1; k <= N; k++){ L.push(S.readout({paso: k})[0][1]); C.push(S.caption({paso: k})); }
  v = {}; S.anim.apply(0.999, v);
  out[n] = {n: N, id: S.sliders[0].id, min: S.sliders[0].min, step: S.sliders[0].step, hold: S.anim.hold, lect: L, cap: C, fin: v.paso, lab: S.labels, asp: S.aspect, w: S.world}; });
console.log(JSON.stringify(out));
"""
ESPER = {}

# >>> H01
# ───────── H01: propiedades de límites (suma demostrada con ε–δ; constante, identidad y múltiplo constante; las demás avisadas) ─────────
A1, E1 = molde('01', 'H01_propiedades_de_limites.html', 'Propiedades de límites', 'prop-lim', 'Propiedades de límites', ['prop-idea'], 1)
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e1 for e1 in err if e1 != 'H01 título, ruta y pie']
ok('<h1>Propiedades de límites</h1>' in A1 and '<span class="status">CD-L30-H01 · v002 · Pendiente de APR</span>' in A1 and 'v001' not in A1 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Propiedades de límites</b></li>' in A1, 'H01 v002 título, ruta y pie')
# funciones exactas de la hoja
def f1(x): x = Fr(x); assert x != 2; return x/2 + 1                # animación: f, definida para x ≠ 2; límite 2 en a = 2
def g1(x): x = Fr(x); assert x != 2; return x + 1                  # animación: g, definida para x ≠ 2; límite 3 en a = 2
def s1(x): return f1(x) + g1(x)                                    # la suma; límite 5
def p1(x): return f1(x)*g1(x)                                      # el producto; límite 6
def P1(x): x = Fr(x); return 3*x*x - 5*x + 4                       # ejemplo 1
def r1(x): x = Fr(x); return (x*x + 1)/(2*x - 1)                   # ejemplo 2
def h1(x): return Fr(1) if x < 2 else Fr(3)                        # caso especial: sin límite en 2
def k1(x): return Fr(3) if x < 2 else Fr(1)                        # caso especial: sin límite en 2
def m1(x): x = Fr(x); return 2*x**3 - x*x + 5                      # ejercicio A a)
def q1(x): x = Fr(x); return (4*x - 2)/(x*x + 1)                   # ejercicio A b)
def T1(x): return 6000 + 900*Fr(x)                                 # ejercicio C: costo total
def U1(x): return T1(x)/Fr(x)                                      # ejercicio C: costo por docena
FUN1 = {'f': f1, 'g': g1, 's': s1, 'p': p1, 'P': P1, 'r': r1, 'h': h1, 'k': k1, 'm': m1, 'T': T1, 'U': U1}
valores('H01 hoja', mates_de(A1), FUN1, 11)
ES1 = [Fr(1), Fr(1, 2), Fr(3, 10), Fr(1, 10), Fr(1, 100), Fr(7, 3), Fr(4), Fr(1, 10**6)]   # tolerancias de prueba
TS1 = [Fr(j1, 40) for j1 in range(-39, 40) if j1]                                          # fracciones del tramo: 0 < |t| < 1
def llega1(et, F, a, Lim, tope=Fr(1, 1000)):
    """llegada numérica: las distancias |F(a ± 10^-k) − Lim|, k = 1…6, no crecen y terminan bajo el tope (no demuestra el límite)"""
    d = [max(abs(F(a - Fr(1, 10**k)) - Lim), abs(F(a + Fr(1, 10**k)) - Lim)) for k in range(1, 7)]
    ok(all(d[i + 1] <= d[i] for i in range(5)) and d[5] < tope, '%s: los valores no se acercan a %s' % (et, Lim))

# 1) la escena: funciones, lugar, límites y lugares dibujados
ok('function f(x){ return x/2 + 1; }' in E1 and 'function g(x){ return x + 1; }' in E1 and 'function s(x){ return f(x) + g(x); }' in E1 and 'function p(x){ return f(x)*g(x); }' in E1 and 'var A = 2, L = 2, LM = 3, LP = 6, XS = [1.9, 2.1];' in E1, 'H01 escena: funciones, a, L, M y lugares')
XS1 = [Fr('1.9'), Fr('2.1')]; XC1 = [Fr('1.99'), Fr('2.01')]
for x1 in RJ:
    if x1 == 2: continue
    ok(abs(f1(x1) - 2) == abs(x1 - 2)/2 and abs(g1(x1) - 3) == abs(x1 - 2) and s1(x1) == x1/2 + 1 + x1 + 1 == 3*x1/2 + 2 and abs(s1(x1) - 5) == 3*abs(x1 - 2)/2 and p1(x1) - 6 == (x1 - 2)*(x1 + 5)/2, 'H01 escena: distancias a L, M, L + M y L·M en x = %s' % x1)
    ok(abs(s1(x1) - 5) <= abs(f1(x1) - 2) + abs(g1(x1) - 3), 'H01 escena: la distancia de la suma no supera la suma de las distancias')
ok(2 + 3 == 5 and 2*3 == 6, 'H01 escena: L + M y L·M')
llega1('H01 escena f', f1, 2, 2); llega1('H01 escena g', g1, 2, 3); llega1('H01 escena s', s1, 2, 5); llega1('H01 escena p', p1, 2, 6)
# marco: todo lo dibujado cabe en la vista 1,5 ≤ x ≤ 2,5; 0 ≤ y ≤ 7 (v002: sube de 6,5 a 7 para que quepan los puntos del producto)
ok('lmMarco(-0.6, 0.85, 5.5, 4.4, 1.5, 2.5, 0, 7)' in E1 and all(Fr('1.5') < x1 < Fr('2.5') for x1 in XS1) and all(0 < F1(x1) < 7 for F1 in (f1, g1, s1) for x1 in (Fr('1.5'), Fr('2.5'))) and all(0 < p1(x1) < 7 for x1 in XS1), 'H01 escena: las rectas y los trazos caben en el marco')
# números junto a los trazos: alturas de f, de g y puntas apiladas, en 1,9 (izquierda) y 2,1 (derecha); v002: además el producto en 1,9 (el de 2,1 va sobre su punto)
ok(re.findall(r"num\('([\d,]+)', (\d),", E1) == [(pl(F1(x1)), str(i1)) for F1 in (f1, g1, s1) for i1, x1 in enumerate(XS1)] + [(pl(p1(XS1[0])), '0')], 'H01 escena: números de las alturas junto a los trazos')
# registro y respuesta, armados con fracciones
ok("['R1', 'f(x)=\\\\tfrac{x}{2}+1;\\\\ \\\\ g(x)=x+1;\\\\ \\\\ x\\\\ne 2'" in E1, 'H01 registro R1')
ok("['R2', '" + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x1), tex(f1(x1))) for x1 in XS1) + ";\\\\ \\\\ L=2'" in E1, 'H01 registro R2')
ok("['R3', '" + ';\\\\ \\\\ '.join('g(%s)=%s' % (tex(x1), tex(g1(x1))) for x1 in XS1) + ";\\\\ \\\\ M=3'" in E1, 'H01 registro R3')
ok("['R4', '" + ';\\\\ \\\\ '.join('%s+%s=%s' % (tex(f1(x1)), tex(g1(x1)), tex(s1(x1))) for x1 in XS1) + "'" in E1, 'H01 registro R4')
ok("['R5', 'f(x)+g(x)=\\\\tfrac{3x}{2}+2;\\\\ \\\\ x\\\\ne 2'" in E1 and "['R6', '\\\\lim_{x\\\\to 2}[f(x)+g(x)]=2+3=5'" in E1 and "['R7', '\\\\lim_{x\\\\to 2}[f(x)\\\\cdot g(x)]=2\\\\cdot 3=6'" in E1 and "['F', '\\\\Longrightarrow\\\\ 2+3=5'" in E1, 'H01 registro R5, R6, R7 y respuesta')
ok("['LL', 'L=2'" in E1 and "['LG', 'M=3'" in E1 and "['LS', 'L+M=5'" in E1 and "['PR', 'L\\\\cdot M=2\\\\cdot 3=6'" in E1 and "['LA', 'a=2'" in E1, 'H01 escena: rótulos de los límites')
# lectura: cada altura con su cuenta, cada suma, cada producto y las distancias a 5
for x1 in XS1 + XC1:
    ok('f(%s)=\\\\tfrac{%s}{2}+1=%s+1=%s' % (tex(x1), tex(x1), tex(x1/2), tex(f1(x1))) in E1, 'H01 lectura f(%s)' % tex(x1))
    ok('g(%s)=%s+1=%s' % (tex(x1), tex(x1), tex(g1(x1))) in E1, 'H01 lectura g(%s)' % tex(x1))
    ok('s(%s)=%s+%s=%s' % (tex(x1), tex(f1(x1)), tex(g1(x1)), tex(s1(x1))) in E1, 'H01 lectura s(%s)' % tex(x1))
    ok('p(%s)=%s\\\\cdot %s=%s' % (tex(x1), tex(f1(x1)), tex(g1(x1)), tex(p1(x1))) in E1, 'H01 lectura p(%s)' % tex(x1))
for par1 in (XS1, XC1):
    ok(';\\\\ \\\\ '.join('|%s-5|=%s' % (tex(s1(x1)), tex(abs(s1(x1) - 5))) for x1 in par1) in E1, 'H01 lectura: distancias de las sumas a 5')
ok(abs(s1(XC1[0]) - 5) < abs(s1(XS1[0]) - 5) and abs(s1(XC1[1]) - 5) < abs(s1(XS1[1]) - 5) and abs(p1(XC1[0]) - 6) < abs(p1(XS1[0]) - 6) and abs(p1(XC1[1]) - 6) < abs(p1(XS1[1]) - 6), 'H01 lectura: más cerca de 2, más cerca de 5 y de 6')
ok('L+M=2+3=5' in E1 and '=\\\\lim_{x\\\\to 2}f(x)+\\\\lim_{x\\\\to 2}g(x)=2+3=5' in E1 and '\\\\text{se achican: los productos se acercan a}' + "' + Q + '" + 'L\\\\cdot M=2\\\\cdot 3=6' in E1 and '\\\\lim_{x\\\\to 2}f(x)=L=2' in E1 and '\\\\lim_{x\\\\to 2}g(x)=M=3' in E1, 'H01 lectura: suma, límites y producto')
# frases del lienzo con los mismos números
ok("'Miden %s y %s: se acercan a 2.'" % (pl(f1(XS1[0])), pl(f1(XS1[1]))) in E1 and "'lugares. Miden %s y %s: se acercan a 3.'" % (pl(g1(XS1[0])), pl(g1(XS1[1]))) in E1 and "'azul: las puntas quedan a %s y a %s.'" % (pl(s1(XS1[0])), pl(s1(XS1[1]))) in E1 and "'3. Llegan al hueco naranjo, a la altura 5.'" in E1 and "'Puntos burdeos: los productos de las alturas,', '%s y %s. Se acercan a 2 por 3, que es 6.'" % (pl(p1(XS1[0])), pl(p1(XS1[1]))) in E1, 'H01 lienzo: frases con las alturas')

# 2) demostración de la suma: en rejilla, con δ₁ y δ₂ de las funciones de la animación y δ = mín{δ₁, δ₂}
for e1 in ES1:
    d11, d21 = e1, e1/2; d1 = min(d11, d21)        # f: |f − 2| = |x − 2|/2 < ε/2 si |x − 2| < ε;  g: |g − 3| = |x − 2| < ε/2 si |x − 2| < ε/2
    ok(d1 > 0 and d1 <= d11 and d1 <= d21 and e1/2 + e1/2 == e1, 'H01 k2: δ = mín{δ₁, δ₂} y ε/2 + ε/2 = ε')
    for t1 in TS1:
        ok(abs(f1(2 + t1*d11) - 2) < e1/2 and abs(g1(2 + t1*d21) - 3) < e1/2, 'H01 k2: δ₁ y δ₂ responden a ε/2 (ε = %s)' % e1)
        x1 = 2 + t1*d1
        ok(0 < abs(x1 - 2) < d1 and abs(x1 - 2) < d11 and abs(x1 - 2) < d21 and s1(x1) - (2 + 3) == (f1(x1) - 2) + (g1(x1) - 3) and abs((f1(x1) - 2) + (g1(x1) - 3)) <= abs(f1(x1) - 2) + abs(g1(x1) - 3) < e1/2 + e1/2 and abs(s1(x1) - 5) < e1, 'H01 k2: la cadena de la demostración en x = %s (ε = %s)' % (x1, e1))
for u1 in RJ[::5]:
    for v1 in RJ[::7]: ok(abs(u1 + v1) <= abs(u1) + abs(v1) and abs(u1*v1) == abs(u1)*abs(v1), 'H01 aviso: desigualdad triangular y valor absoluto de un producto')
# los números del párrafo «con los números de la animación» (ε = 0,3)
ok(Fr('0.3')/2 == Fr('0.15') and min(Fr('0.3'), Fr('0.15')) == Fr('0.15') and abs(Fr('2.1') - 2) == Fr('0.1') < Fr('0.15') and abs(f1(Fr('2.1')) - 2) == Fr('0.05') < Fr('0.15') and abs(g1(Fr('2.1')) - 3) == Fr('0.1') < Fr('0.15') and abs(s1(Fr('2.1')) - 5) == Fr('0.15') < Fr('0.3') and Fr('0.05') + Fr('0.1') == Fr('0.15'), 'H01 k2: prueba con ε = 0,3 y x = 2,1')
for z1 in ['\\(\\dfrac{0{,}3}{2}=0{,}15\\)', 'Sirve \\(\\delta_{1}=0{,}3\\)', 'Sirve \\(\\delta_{2}=0{,}15\\)', 'El menor entre \\(0{,}3\\) y \\(0{,}15\\) es \\(\\delta=0{,}15\\)', '\\(|2{,}1-2|=0{,}1\\), menor que \\(0{,}15\\)', '\\(f(2{,}1)=2{,}05\\) y \\(|2{,}05-2|=0{,}05\\); \\(g(2{,}1)=3{,}1\\) y \\(|3{,}1-3|=0{,}1\\). Los dos son menores que \\(0{,}15\\)', '\\(|5{,}15-5|=0{,}15\\), menor que \\(0{,}3\\)', '\\(0{,}05+0{,}1=0{,}15\\)',
           'Se quiere \\(\\dfrac{|x-2|}{2}\\lt 0{,}15\\)', 'Se multiplican los dos lados por \\(2\\): \\(|x-2|\\lt 0{,}3\\)', 'Se quiere \\(|x-2|\\lt 0{,}15\\)']:
    ok(z1 in A1, 'H01 k2: la hoja no trae «%s»' % z1)
for x1 in RJ:
    if x1 != 2: ok(abs(f1(x1) - 2) == abs(x1/2 - 1) == abs(x1 - 2)/2 and (abs(f1(x1) - 2) < Fr('0.15')) == (abs(x1 - 2) < Fr('0.3')), 'H01 k2: |f(x) − 2| = |x − 2|/2')
# constante, identidad y múltiplo constante (c = 0 aparte), en rejilla
for e1 in ES1:
    for t1 in TS1[::3]:
        for c1 in (Fr(-7, 2), Fr(-1), Fr(1, 3), Fr(2), Fr(900)):
            ok(abs(c1 - c1) == 0 < e1, 'H01 k2 constante')
            ec1 = e1/abs(c1); dc1 = 2*ec1; x1 = 2 + t1*dc1    # para f: |f − 2| < ε/|c| si |x − 2| < 2ε/|c|
            ok(ec1 > 0 and abs(f1(x1) - 2) < ec1 and abs(c1*f1(x1) - c1*2) == abs(c1*(f1(x1) - 2)) == abs(c1)*abs(f1(x1) - 2) < abs(c1)*ec1 == e1, 'H01 k2 múltiplo constante, c = %s' % c1)
        x1 = 5 + t1*e1; ok(0 < abs(x1 - 5) < e1, 'H01 k2 identidad: δ = ε')
        ok(0*f1(2 + t1) == 0 == 0*2, 'H01 k2 múltiplo constante, c = 0')
# resta y potencia con las funciones de la animación (llegadas numéricas)
llega1('H01 k2 resta', lambda x: f1(x) - g1(x), 2, 2 - 3); llega1('H01 k2 múltiplo por −1', lambda x: -g1(x), 2, -3)
for n1 in (1, 2, 3, 4): llega1('H01 k2 potencia n = %d' % n1, lambda x: f1(x)**n1, 2, 2**n1)
ok(all(2**n1*2 == 2**(n1 + 1) for n1 in range(1, 9)) and 2 + (-3) == 2 - 3, 'H01 k2: L^n · L = L^(n+1) y L + (−M) = L − M')

# 3) caso especial
for x1 in RJ:
    if x1 != 3: ok((2*x1 - 6)/(x1 - 3) == 2*(x1 - 3)/(x1 - 3) == 2, 'H01 k3: (2x − 6)/(x − 3) = 2 fuera de 3')
    ok(h1(x1) + k1(x1) == 4 and h1(x1)*k1(x1) == 3 and (h1(x1), k1(x1)) == ((1, 3) if x1 < 2 else (3, 1)), 'H01 k3: h + k = 4 en todo x')
ok(3 - 3 == 0 and 1/abs(Fr('3.1') - 3) == 1/Fr('0.1') == 10 and 1/abs(Fr('3.01') - 3) == 1/Fr('0.01') == 100 and 1 + 3 == 4 == 3 + 1, 'H01 k3: valores')
for M1 in (Fr(1, 2), Fr(1), Fr(10), Fr(100), Fr(10**6)):
    for t1 in TS1: ok(0 < abs(t1/M1) < 1/M1 and 1/abs((3 + t1/M1) - 3) > M1, 'H01 k3: 1/|x − 3| supera el tope %s' % M1)
LS1 = [Fr(j1, 8) for j1 in range(-8, 41)]   # candidatos a límite entre −1 y 5
for t1 in TS1:
    if t1 > 0:
        ok(h1(2 - t1) == 1 and h1(2 + t1) == 3 and k1(2 - t1) == 3 and k1(2 + t1) == 1, 'H01 k3: laterales de h y de k')
        if t1.numerator % 13 == 0:
            for L1 in LS1: ok(not (abs(h1(2 - t1) - L1) < 1 and abs(h1(2 + t1) - L1) < 1) and not (abs(k1(2 - t1) - L1) < 1 and abs(k1(2 + t1) - L1) < 1), 'H01 k3: ningún número queda a menos de 1 de los dos lados')

# 4) ejemplos: cada paso con fracciones, y llegada numérica al límite calculado
ok((2**2, 3*4, 5*2, 12 - 10, 2 + 4) == (4, 12, 10, 2, 6) and P1(2) == 3*2**2 - 5*2 + 4 == 12 - 10 + 4 == 6, 'H01 ej1'); llega1('H01 ej1', P1, 2, 6)
for a1 in RJ: ok(P1(a1) == 3*a1**2 - 5*a1 + 4, 'H01 ej1: polinomio evaluado en a')
ok((3**2, 9 + 1, 2*3, 6 - 1, Fr(10, 5)) == (9, 10, 6, 5, 2) and 5 != 0 and r1(3) == Fr(3**2 + 1, 2*3 - 1) == 2 and 2*Fr('0.5') - 1 == 0, 'H01 ej2'); llega1('H01 ej2', r1, 3, 2)
ok(3*(-1) + 1 == -3 + 1 == -2 and (-2)**4 == 16 and 2*4 + 1 == 8 + 1 == 9 and 3*3 == 9 and 2*3 + 1 == 7 and -3 - 5 == -8 and (-2)**3 == -8, 'H01 ej3'); llega1('H01 ej3 potencia', lambda x: (3*Fr(x) + 1)**4, -1, 16)
for k_ in range(1, 7):
    h_ = Fr(1, 10**k_)
    for sg1 in (-1, 1):
        ok((3 - h_)**2 < 2*(4 + sg1*h_) + 1 < (3 + h_)**2, 'H01 ej3: la raíz de 2x + 1 queda a menos de 10^-%d de 3' % k_)
        ok((-2 - h_)**3 < (-3 + sg1*h_) - 5 < (-2 + h_)**3, 'H01 ej3: la raíz cúbica de x − 5 queda a menos de 10^-%d de −2' % k_)
        ok((2 - h_)**3 < (3 + sg1*h_)**2 - 1 < (2 + h_)**3, 'H01 A c): la raíz cúbica de x² − 1 queda a menos de 10^-%d de 2' % k_)
for t1 in TS1:
    ok(2*(4 + t1) + 1 > 7 > 0 and 3 < 4 + t1 < 5, 'H01 ej3: 2x + 1 > 7 en el intervalo abierto de 3 a 5')
    if t1 > 0: ok((4 - t1) - 4 < 0, 'H01 ej3: x − 4 es negativo a la izquierda de 4')
ok((2*4, 3*(-2), 8 - (-6), 8 + 6, 4*(-2), Fr(4, -2), (-2)**3, 4 - 4) == (8, -6, 14, 14, -8, -2, -8, 0) and -2 != 0 and 2*2 == 4, 'H01 ej4')
for y1 in RJ:
    ok((abs(y1 - 4) < 4) == (0 < y1 < 8) and (abs(y1 - 9) < 9) == (0 < y1 < 18), 'H01 ej4 y B d): |y − L| < L equivale a 0 < y < 2L')
    for d1 in ES1: ok((abs(y1 - 4) < 4) == (0 < y1 < 8), 'H01 ej4')
    y9 = y1 + 9; ok((abs(y9 - 9) < 9) == (0 < y9 < 18), 'H01 B d)')

# 5) ejercicios
ok(((-1)**3, (-1)**2, 2*(-1), -2 - 1, -3 + 5) == (-1, 1, -2, -3, 2) and m1(-1) == 2*(-1)**3 - (-1)**2 + 5 == -2 - 1 + 5 == 2, 'H01 A a)'); llega1('H01 A a)', m1, -1, 2)
ok(4*2 - 2 == 8 - 2 == 6 and 2**2 + 1 == 4 + 1 == 5 != 0 and Fr(6, 5) == Fr('1.2') == q1(2) and 3**2 - 1 == 9 - 1 == 8 and 2**3 == 8, 'H01 A b) y c)'); llega1('H01 A b)', q1, 2, Fr(6, 5))
ok((2*(-3), 6 + (-6), 6*(-3), Fr(6, -3), 6 + 3, Fr(0, 6)) == (-6, 0, -18, -2, 9, 0) and 3*3 == 9 and -3 != 0 and 6 != 0, 'H01 B')
ok(900*20 == 18000 and 6000 + 18000 == 24000 == T1(20) and Fr(24000, 20) == 1200 == U1(20) and Fr(6000, 20) == 300 and 300 + 900 == 1200 and 20 != 0, 'H01 C a), b) y c)'); llega1('H01 C T', T1, 20, 24000); llega1('H01 C U', U1, 20, 1200)
ok(900*Fr('0.1') == 90 and T1(Fr('0.1')) == 6090 and U1(Fr('0.1')) == 60900 and 900*Fr('0.01') == 9 and T1(Fr('0.01')) == 6009 and U1(Fr('0.01')) == 600900, 'H01 C d)')
for M1 in (Fr(1), Fr(1200), Fr(60900), Fr(10**7)):
    for t1 in TS1:
        if t1 > 0: x1 = t1*6000/M1; ok(0 < x1 < 6000/M1 and U1(x1) > 6000/x1 > M1, 'H01 C d): el costo por docena supera el tope %s' % M1)

# 6) lo que la hoja afirma con símbolos o palabras, escrito tal cual (hipótesis incluidas)
for z1 in ['\\[\\lim_{x\\to a}[f(x)+g(x)]=\\lim_{x\\to a}f(x)+\\lim_{x\\to a}g(x)\\]',
           'definidas en un intervalo abierto que contiene a \\(a\\), salvo quizá en \\(a\\)', 'Los dos límites <b>existen</b> y son números: \\(\\lim_{x\\to a}f(x)=L\\) y \\(\\lim_{x\\to a}g(x)=M\\)', '\\(n\\) es un entero positivo',
           '<b>Constante.</b> \\(\\lim_{x\\to a}c=c\\)', '<b>Identidad.</b> \\(\\lim_{x\\to a}x=a\\)', '<b>Suma.</b> \\(\\lim_{x\\to a}[f(x)+g(x)]=L+M\\)', '<b>Resta.</b> \\(\\lim_{x\\to a}[f(x)-g(x)]=L-M\\)',
           '<b>Múltiplo constante.</b> \\(\\lim_{x\\to a}[c\\cdot f(x)]=c\\cdot L\\)', '<b>Producto.</b> \\(\\lim_{x\\to a}[f(x)\\cdot g(x)]=L\\cdot M\\)', '<b>Cociente.</b> Si además \\(M\\ne 0\\): \\(\\lim_{x\\to a}\\dfrac{f(x)}{g(x)}=\\dfrac{L}{M}\\)',
           '<b>Potencia.</b> \\(\\lim_{x\\to a}[f(x)]^{n}=L^{n}\\)', '<b>Raíz.</b> \\(\\lim_{x\\to a}\\sqrt[n]{f(x)}=\\sqrt[n]{L}\\)', 'si \\(n\\) es <b>impar</b>, no se pide nada más', 'si \\(n\\) es <b>par</b>, se pide además que \\(f(x)\\ge 0\\) para todo \\(x\\ne a\\) de un intervalo abierto que contiene a \\(a\\)',
           'para todo \\(\\varepsilon\\gt 0\\) existe \\(\\delta\\gt 0\\) tal que, si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|f(x)+g(x)-(L+M)|\\lt \\varepsilon\\)', 'si \\(0\\lt |x-a|\\lt \\delta_{1}\\), entonces \\(|f(x)-L|\\lt \\dfrac{\\varepsilon}{2}\\)', 'si \\(0\\lt |x-a|\\lt \\delta_{2}\\), entonces \\(|g(x)-M|\\lt \\dfrac{\\varepsilon}{2}\\)',
           '\\(\\delta=\\min\\{\\delta_{1},\\delta_{2}\\}\\)', '\\(f(x)+g(x)-(L+M)=(f(x)-L)+(g(x)-M)\\)', '\\(|(f(x)-L)+(g(x)-M)|\\le |f(x)-L|+|g(x)-M|\\)', '\\(|f(x)-L|+|g(x)-M|\\lt \\dfrac{\\varepsilon}{2}+\\dfrac{\\varepsilon}{2}=\\varepsilon\\)',
           'Caso \\(c=0\\)', 'Caso \\(c\\ne 0\\)', '\\(|f(x)-L|\\lt \\dfrac{\\varepsilon}{|c|}\\)', '\\(|c\\cdot f(x)-c\\cdot L|\\lt \\varepsilon\\)', '\\(|c|\\cdot|f(x)-L|\\lt |c|\\cdot\\dfrac{\\varepsilon}{|c|}=\\varepsilon\\)', 'Se elige \\(\\delta=\\varepsilon\\)',
           '\\(f(x)-g(x)=f(x)+(-1)\\cdot g(x)\\)', '\\([f(x)]^{n+1}=[f(x)]^{n}\\cdot f(x)\\)', '\\(L^{n}\\cdot L=L^{n+1}\\)', '<b>Se usan sin demostrar:</b> las propiedades del producto, del cociente y de la raíz', 'el principio de inducción', 'la desigualdad triangular',
           'su límite es \\(2\\).', 'El límite no existe.', 'el límite de \\(h\\) en \\(2\\) no existe', 'su límite en \\(2\\) es \\(4\\)', 'Luego \\(f+g\\) no tiene límite en \\(a\\)', '\\(g(x)=[f(x)+g(x)]-f(x)\\)', 'si \\(0\\lt |x-3|\\lt \\dfrac{1}{K}\\), entonces \\(\\dfrac{1}{|x-3|}\\gt K\\)',
           '\\(\\lim_{x\\to 2}(3x^{2}-5x+4)=2+4=6\\)', '\\(\\lim_{x\\to a}P(x)=P(a)\\)', '\\(\\lim_{x\\to 3}\\dfrac{x^{2}+1}{2x-1}=\\dfrac{10}{5}=2\\)', 'el límite del denominador es \\(5\\), y \\(5\\ne 0\\)', '\\(\\lim_{x\\to -1}(3x+1)^{4}=(-2)^{4}=16\\)', '\\(\\lim_{x\\to 4}\\sqrt{2x+1}=\\sqrt{9}=3\\)', '\\(\\lim_{x\\to -3}\\sqrt[3]{x-5}=\\sqrt[3]{-8}=-2\\)',
           '\\(\\lim_{x\\to 5}F(x)=4\\) y \\(\\lim_{x\\to 5}G(x)=-2\\)', '\\(\\lim_{x\\to 5}[2F(x)-3G(x)]=8-(-6)=8+6=14\\)', '\\(\\lim_{x\\to 5}[F(x)\\cdot G(x)]=4\\cdot(-2)=-8\\)', '\\(\\lim_{x\\to 5}\\dfrac{F(x)}{G(x)}=\\dfrac{4}{-2}=-2\\)', '\\(\\lim_{x\\to 5}[G(x)]^{3}=(-2)^{3}=-8\\)', '\\(\\lim_{x\\to 5}\\sqrt{F(x)}=\\sqrt{4}=2\\)', 'entonces \\(|F(x)-4|\\lt 4\\). De ahí:',
           '\\(\\lim_{x\\to -1}(2x^{3}-x^{2}+5)=-3+5=2\\)', '\\(\\lim_{x\\to 2}\\dfrac{4x-2}{x^{2}+1}=\\dfrac{6}{5}=1{,}2\\)', '\\(\\lim_{x\\to 3}\\sqrt[3]{x^{2}-1}=\\sqrt[3]{8}=2\\)',
           '\\(\\lim_{x\\to 1}u(x)=6\\), \\(\\lim_{x\\to 1}v(x)=-3\\) y \\(\\lim_{x\\to 1}w(x)=0\\)', '\\(\\lim_{x\\to 1}[u(x)+2v(x)]=6+(-6)=0\\)', '\\(\\lim_{x\\to 1}[u(x)\\cdot v(x)]=6\\cdot(-3)=-18\\)', '\\(\\lim_{x\\to 1}\\dfrac{u(x)}{v(x)}=\\dfrac{6}{-3}=-2\\)', '\\(\\lim_{x\\to 1}\\sqrt{u(x)+3}=\\sqrt{9}=3\\)', '\\(\\lim_{x\\to 1}\\dfrac{w(x)}{u(x)}=\\dfrac{0}{6}=0\\)', 'entonces \\(|u(x)+3-9|\\lt 9\\). De ahí:',
           '\\(T(x)=6000+900\\,x\\)', '\\(U(x)=\\dfrac{T(x)}{x}\\)', '\\(\\lim_{x\\to 20}T(x)=6000+18000=24000\\)', '\\(\\lim_{x\\to 20}U(x)=\\dfrac{24000}{20}=1200\\)', '\\(U(x)\\gt \\dfrac{6000}{x}\\), y \\(\\dfrac{6000}{x}\\gt K\\) si \\(0\\lt x\\lt \\dfrac{6000}{K}\\)',
           '\\(f(x)=\\dfrac{x}{2}+1\\) y \\(g(x)=x+1\\), las dos definidas solo para \\(x\\ne 2\\)']:
    ok(z1 in A1, 'H01: la hoja no trae «%s»' % z1)
ok(A1.count('no se puede usar') >= 5 and A1.count('sin demostrar') >= 4, 'H01: avisos «no se puede usar» y «sin demostrar»')

# ───────── H01 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja y de la escena ─────────
def en1(*cads): return all(c in A1 for c in cads)
def r41(q):
    """redondeo exacto a 4 decimales de un racional positivo (sin empates), como TeX con coma y 4 cifras"""
    q = Fr(q)*10**4 + Fr(1, 2); n = q.numerator//q.denominator; assert q != n
    return '%d{,}%04d' % divmod(n, 10**4)
def raiz41(q):
    """raíz cuadrada redondeada a 4 decimales, hallada con enteros: el único n con (n − ½)² < q·10⁸ < (n + ½)²"""
    q = Fr(q)*10**8; n = int(float(q)**0.5)
    while Fr(2*n + 1, 2)**2 <= q: n += 1
    while Fr(2*n - 1, 2)**2 >= q: n -= 1
    assert Fr(2*n - 1, 2)**2 < q < Fr(2*n + 1, 2)**2
    return '%d{,}%04d' % divmod(n, 10**4)
X41 = [Fr('1.9'), Fr('1.99'), Fr('2.01'), Fr('2.1')]
# encabezado: «de dónde sale, con números»
ok(en1(*[r'f(%s)&=\frac{%s}{2}+1=%s+1=%s&&' % (tex(x), tex(x), tex(x/2), tex(f1(x))) for x in X41]) and en1(*[r'g(%s)&=%s+1=%s&&' % (tex(x), tex(x), tex(g1(x))) for x in X41]), 'H01 v002 encabezado: los valores de f y de g, uno por línea, con su cuenta')
ok(en1(*[r'f(%s)+g(%s)&=%s+%s=%s&&\text{distancia a cinco: }%s=%s' % (tex(x), tex(x), tex(f1(x)), tex(g1(x)), tex(s1(x)), ('5-%s' % tex(s1(x))) if s1(x) < 5 else ('%s-5' % tex(s1(x))), tex(abs(s1(x) - 5))) for x in X41]), 'H01 v002 encabezado: las cuatro sumas con su distancia a 5')
ok(all(abs(f1(x) - 2) + abs(g1(x) - 3) == abs(s1(x) - 5) for x in X41 + [z for z in RJ if z != 2]) and (abs(f1(X41[0]) - 2), abs(g1(X41[0]) - 3), abs(f1(X41[1]) - 2), abs(g1(X41[1]) - 3)) == (Fr('0.05'), Fr('0.1'), Fr('0.005'), Fr('0.01')) and en1(r'\(0{,}05+0{,}1=0{,}15\)', r'\(0{,}005+0{,}01=0{,}015\)', r'\(5=2+3\)'), 'H01 v002 encabezado: lo que le falta a la suma es lo que le falta a f más lo que le falta a g')
ok(all(abs(f1(X41[i]) - 2) > abs(f1(X41[j]) - 2) and abs(g1(X41[i]) - 3) > abs(g1(X41[j]) - 3) and abs(s1(X41[i]) - 5) > abs(s1(X41[j]) - 5) for i, j in ((0, 1), (3, 2))), 'H01 v002 encabezado: más cerca de 2, más cerca de 2, de 3 y de 5')
ok(en1('se lee «\\(f\\) de \\(x\\)»', 'se lee «el límite de \\(f\\) de \\(x\\), cuando \\(x\\) tiende a \\(a\\), es \\(L\\)»', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\), de \\(f\\) de \\(x\\) más \\(g\\) de \\(x\\), es igual al límite de \\(f\\) de \\(x\\) más el límite de \\(g\\) de \\(x\\)»', '<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La fórmula.</b>') and A1.count('<p class="lede">') == 3, 'H01 v002 encabezado: de dónde sale, regularidad, fórmula y cómo se lee')
# k1: cada propiedad con números (las nueve líneas)
ok(en1('; '.join(r'\(%s-%s=%s\)' % (tex(f1(x)), tex(g1(x)), tex(f1(x) - g1(x))) for x in X41), r'\(2-3=-1\)') and 2 - 3 == -1, 'H01 v002 k1: restas')
ok(en1('; '.join(r'\(4\cdot %s=%s\)' % (tex(f1(x)), tex(4*f1(x))) for x in X41), r'\(4\cdot 2=8\)') and 4*2 == 8, 'H01 v002 k1: múltiplos'); llega1('H01 v002 k1 múltiplo', lambda x: 4*f1(x), 2, 8)
ok(en1('; '.join(r'\(%s\cdot %s=%s\)' % (tex(f1(x)), tex(g1(x)), tex(p1(x))) for x in X41), r'\(2\cdot 3=6\)'), 'H01 v002 k1: productos')
ok(en1('; '.join(r'\(\dfrac{%s}{%s}\approx %s\)' % (tex(f1(x)), tex(g1(x)), r41(f1(x)/g1(x))) for x in X41), r'\(\dfrac{2}{3}\approx %s\)' % r41(Fr(2, 3))) and r41(Fr(2, 3)) == '0{,}6667' and 3 != 0, 'H01 v002 k1: cocientes redondeados a 4 decimales'); llega1('H01 v002 k1 cociente', lambda x: f1(x)/g1(x), 2, Fr(2, 3))
ok(en1('; '.join(r'\(%s^{2}=%s\)' % (tex(f1(x)), tex(f1(x)**2)) for x in X41), r'\(2^{2}=4\)') and 2**2 == 4, 'H01 v002 k1: cuadrados')
ok(en1('; '.join(r'\(\sqrt{%s}\approx %s\)' % (tex(f1(x)), raiz41(f1(x))) for x in X41), r'\(\sqrt{2}\approx %s\)' % raiz41(2)) and raiz41(2) == '1{,}4142' and all(f1(x) > 0 for x in X41), 'H01 v002 k1: raíces redondeadas a 4 decimales')
for k_ in range(1, 7):
    for sg1 in (-1, 1):
        x = 2 + sg1*Fr(1, 10**k_); h_ = Fr(3, 10**k_)    # la raíz de f(x) queda a menos de 3·10^-k de √2:  (√2 − h)² < f(x) < (√2 + h)²  ⇔  |f(x) − 2 − h²| < 2·h·√2, y basta 2·h·1,4
        ok(abs(f1(x) - 2 - h_*h_) < 2*h_*Fr(14, 10), 'H01 v002 k1: la raíz de f(x) se acerca a la raíz de 2 (10^-%d)' % k_)
ok(en1('En \\(1{,}9\\) vale \\(7\\) y en \\(2{,}1\\) vale \\(7\\)', 'Sumas (encabezado): \\(4{,}85\\); \\(4{,}985\\); \\(5{,}015\\); \\(5{,}15\\)', '<b>Palabras que se usan.</b>', '<b>Cómo se lee cada una.</b>', '<b>De dónde salen, con números.</b>', 'todos los \\(x\\) con \\(1{,}5\\lt x\\lt 2{,}5\\)') and [tex(s1(x)) for x in X41] == ['4{,}85', '4{,}985', '5{,}015', '5{,}15'], 'H01 v002 k1: palabras, lectura y cuentas de la constante, la identidad y la suma')
# «qué se demuestra» y «cómo funciona el método» antes de cada demostración o justificación (suma, constante e identidad, múltiplo, resta, potencia, k3 punto 4, polinomio)
ok(A1.count('<b>Qué se demuestra') == 7 and A1.count('<b>Cómo funciona el método') == 7 and en1('<b>Cómo se leen los símbolos de la definición.</b>', 'se lee «épsilon»', 'se lee «delta»', 'se lee «valor absoluto de \\(u\\)»', '<b>Comprobación con los números de la animación.</b>'), 'H01 v002: «qué se demuestra» y «cómo funciona el método» (7 veces) y lectura de los símbolos')
# k2: la diferencia reordenada línea por línea, la cadena final y el ejemplo de la desigualdad triangular
for a_ in RJ[::11]:
    for b_ in RJ[::13]:
        for L_, M_ in ((Fr(2), Fr(3)), (Fr(-5, 2), Fr(7, 3)), (Fr(0), Fr(-4))):
            ok(a_ + b_ - (L_ + M_) == a_ + b_ - L_ - M_ == a_ - L_ + b_ - M_ == (a_ - L_) + (b_ - M_), 'H01 v002 k2: la diferencia reordenada, línea por línea')
ok(en1(r'f(x)+g(x)-(L+M)&=f(x)+g(x)-L-M&&', r'&=f(x)-L+g(x)-M&&', r'&=(f(x)-L)+(g(x)-M)&&', r'|f(x)+g(x)-(L+M)|&=|(f(x)-L)+(g(x)-M)|&&\text{paso 6}', r'&\le |f(x)-L|+|g(x)-M|&&\text{paso 7}', r'&\lt \frac{\varepsilon}{2}+\frac{\varepsilon}{2}&&\text{paso 8}', r'&=\varepsilon&&'), 'H01 v002 k2: las líneas de la reordenación y de la cadena final')
ok(abs(3 + (-5)) == abs(-2) == 2 and abs(3) + abs(-5) == 3 + 5 == 8 and 2 < 8 and abs(-3) == 3 == abs(3), 'H01 v002 k2: ejemplos del valor absoluto y de la desigualdad triangular')
# k2: comprobación con ε = 0,3, línea por línea, y con cualquier ε
for x in RJ:
    ok(abs(x/2 + 1 - 2) == abs(x/2 - 1) == abs((x - 2)/2) == abs(x - 2)/2 and abs(x + 1 - 3) == abs(x - 2), 'H01 v002 k2: |f(x) − 2| y |g(x) − 3|, línea por línea')
ok(1 - 2 == -1 and Fr(2, 2) == 1 and Fr('0.15')*2 == Fr('0.3') and 1 - 3 == -2 and min(Fr('0.3'), Fr('0.15')) == Fr('0.15') and f1(Fr('2.1')) == Fr('2.05') and g1(Fr('2.1')) == Fr('3.1') and Fr('2.05') + Fr('3.1') == Fr('5.15'), 'H01 v002 k2: cuentas de la comprobación con ε = 0,3')
ok(en1(r'|f(x)-2|&=\left|\frac{x}{2}+1-2\right|&&', r'&=\left|\frac{x}{2}-1\right|&&\text{porque }1-2=-1', r'&=\left|\frac{x-2}{2}\right|&&\text{porque }1=\tfrac{2}{2}', r'&=\frac{|x-2|}{2}&&', r'porque \(0{,}15\cdot 2=0{,}3\)', r'\(|g(x)-3|=|x+1-3|=|x-2|\), porque \(1-3=-2\)', r'\(2{,}05+3{,}1=5{,}15\)', r'sirve \(\delta=2\,\varepsilon\)', r'sirve \(\delta=\varepsilon\)'), 'H01 v002 k2: la comprobación escrita línea por línea')
for e1 in ES1:
    for t1 in TS1:
        ok(abs(f1(2 + t1*2*e1) - 2) < e1 and abs(g1(2 + t1*e1) - 3) < e1, 'H01 v002 k2: δ = 2ε responde por f y δ = ε por g (los límites 2 y 3 son exactos)')
# k2: constante, identidad, múltiplo constante, resta y potencia, con números
ok(abs(7 - 7) == 0 < Fr('0.01') and abs(Fr('2.04') - 2) == Fr('0.04') < Fr('0.1') and en1(r'\(|7-7|=0\), menor que \(0{,}01\)', r'\(|2{,}04-2|=0{,}04\), menor que \(0{,}1\)'), 'H01 v002 k2: constante e identidad con números')
ok(Fr('0.2')/4 == Fr('0.05') and Fr('0.05')*2 == Fr('0.1') and abs(Fr('2.06') - 2) == Fr('0.06') < Fr('0.1') and Fr('2.06')/2 == Fr('1.03') and f1(Fr('2.06')) == Fr('2.03') and abs(Fr('2.03') - 2) == Fr('0.03') < Fr('0.05') and 4*Fr('2.03') == Fr('8.12') and abs(Fr('8.12') - 8) == Fr('0.12') < Fr('0.2') and 4*Fr('0.03') == Fr('0.12'), 'H01 v002 k2: múltiplo constante con c = 4 y ε = 0,2')
for t1 in TS1:
    x = 2 + t1*Fr('0.1'); ok(abs(f1(x) - 2) < Fr('0.05') and abs(4*f1(x) - 4*2) == 4*abs(f1(x) - 2) < Fr('0.2'), 'H01 v002 k2: δ = 0,1 responde por 4·f con ε = 0,2')
ok(en1(r'|c\cdot f(x)-c\cdot L|&=|c\cdot(f(x)-L)|&&\text{factor común }c', r'&=|c|\cdot|f(x)-L|&&\text{valor absoluto de un producto}', r'\(\dfrac{0{,}2}{4}=0{,}05\)', r'\(f(2{,}06)=\dfrac{2{,}06}{2}+1=1{,}03+1=2{,}03\)', r'\(4\cdot 2{,}03=8{,}12\)', r'\(4\cdot 0{,}03=0{,}12\)'), 'H01 v002 k2: múltiplo constante, líneas escritas')
ok((-1)*3 == -3 and 2 + (-3) == 2 - 3 == -1 and en1(r'\((-1)\cdot 3=-3\)', r'\(2+(-3)=2-3=-1\)', '; '.join(r'\(%s\)' % tex(f1(x) - g1(x)) for x in X41)), 'H01 v002 k2: resta con números')
ok(2*2 == 4 and 4*2 == 8 and all(L_*L_ == L_**2 and L_**2*L_ == L_**3 and L_**1 == L_ for L_ in RJ) and en1(r'\([f(x)]^{2}=[f(x)]^{1}\cdot f(x)\)', r'\(L\cdot L=L^{2}\)', r'\([f(x)]^{3}=[f(x)]^{2}\cdot f(x)\)', r'\(L^{2}\cdot L=L^{3}\)', '; '.join(r'\(%s\)' % tex(f1(x)**2) for x in X41)), 'H01 v002 k2: potencia, casos n = 2 y n = 3')
# k3: factor común y simplificación; tope K; el punto 4 con números
for x in RJ:
    if x != 3: ok(2*x - 6 == 2*x - 2*3 == 2*(x - 3) and (2*x - 2*3)/(x - 3) == 2*((x - 3)/(x - 3)) == 2*1 == 2, 'H01 v002 k3: (2x − 6)/(x − 3), línea por línea')
ok(2*Fr('2.9') == Fr('5.8') and Fr('5.8') - 6 == Fr('-0.2') and Fr('2.9') - 3 == Fr('-0.1') and Fr('-0.2')/Fr('-0.1') == 2 and 2*Fr('3.1') == Fr('6.2') and Fr('6.2') - 6 == Fr('0.2') and Fr('3.1') - 3 == Fr('0.1') and Fr('0.2')/Fr('0.1') == 2 and 6 == 2*3, 'H01 v002 k3: el cociente en 2,9 y en 3,1')
for K1 in (Fr(1), Fr(7, 2), Fr(1000), Fr(10**6)):
    for t1 in TS1:
        x = 3 + t1/K1; ok(0 < abs(x - 3) < 1/K1 and K1*abs(x - 3) < 1 and K1 < 1/abs(x - 3), 'H01 v002 k3: la cadena del tope K, línea por línea (K = %s)' % K1)
ok(Fr(1, 1000) == Fr('0.001') and abs(Fr('3.0005') - 3) == Fr('0.0005') < Fr('0.001') and 1/Fr('0.0005') == 2000 > 1000 and en1(r'K\cdot|x-3|&\lt 1&&', r'K&\lt \frac{1}{|x-3|}&&', r'\(\dfrac{1}{0{,}0005}=2000\)'), 'H01 v002 k3: el tope K = 1000 con números')
ok(all(x + h1(x) == (x + 1 if x < 2 else x + 3) for x in RJ) and Fr('1.9') + h1(Fr('1.9')) == Fr('2.9') and Fr('1.99') + h1(Fr('1.99')) == Fr('2.99') and Fr('2.1') + h1(Fr('2.1')) == Fr('5.1') and Fr('2.01') + h1(Fr('2.01')) == Fr('5.01') and 3 != 5 and en1(r'\(1{,}9+1=2{,}9\)', r'\(1{,}99+1=2{,}99\)', r'\(2{,}1+3=5{,}1\)', r'\(2{,}01+3=5{,}01\)'), 'H01 v002 k3: el punto 4 con números (x + h(x))')
for k_ in range(1, 7):
    t1 = Fr(1, 10**k_); ok(abs((2 - t1) + h1(2 - t1) - 3) == t1 and abs((2 + t1) + h1(2 + t1) - 5) == t1, 'H01 v002 k3: x + h(x) se acerca a 3 por la izquierda y a 5 por la derecha')
# ejemplos
ok(3*4 - 10 + 4 == 6 and Fr('1.99')**2 == Fr('3.9601') and 3*Fr('3.9601') == Fr('11.8803') and 5*Fr('1.99') == Fr('9.95') and Fr('11.8803') - Fr('9.95') + 4 == Fr('5.9303') == P1(Fr('1.99')) and Fr('2.01')**2 == Fr('4.0401') and 3*Fr('4.0401') == Fr('12.1203') and 5*Fr('2.01') == Fr('10.05') and Fr('12.1203') - Fr('10.05') + 4 == Fr('6.0703') == P1(Fr('2.01')) and 6 - Fr('5.9303') == Fr('0.0697') and Fr('6.0703') - 6 == Fr('0.0703'), 'H01 v002 ej1: valores cercanos, cuenta por cuenta')
for a_ in RJ[::3]:
    for c_, k_ in ((Fr(3), 2), (Fr(-5), 1), (Fr(7, 2), 3)):
        llega1('H01 v002 ej1: c·x^k', lambda x: c_*Fr(x)**k_, a_, c_*a_**k_, tope=Fr(1, 10))
ok(Fr('2.9')**2 == Fr('8.41') and 2*Fr('2.9') == Fr('5.8') and r1(Fr('2.9')) == Fr('9.41')/Fr('4.8') and Fr('3.1')**2 == Fr('9.61') and 2*Fr('3.1') == Fr('6.2') and r1(Fr('3.1')) == Fr('10.61')/Fr('5.2') and en1(r'\dfrac{9{,}41}{4{,}8}\approx %s\)' % r41(r1(Fr('2.9'))), r'\dfrac{10{,}61}{5{,}2}\approx %s\)' % r41(r1(Fr('3.1')))) and (r41(r1(Fr('2.9'))), r41(r1(Fr('3.1')))) == ('1{,}9604', '2{,}0404') and Fr(9 + 1, 6 - 1) == 2, 'H01 v002 ej2: valores cercanos redondeados a 4 decimales')
ok((-2)**4 == (-2)*(-2)*(-2)*(-2) == 4*4 == 16 and (-2)**3 == (-2)*(-2)*(-2) == 4*(-2) == -8 and 2*Fr('3.9') + 1 == Fr('8.8') and 2*Fr('4.1') + 1 == Fr('9.2') and en1(r'\sqrt{8{,}8}\approx %s\)' % raiz41(Fr('8.8')), r'\sqrt{9{,}2}\approx %s\)' % raiz41(Fr('9.2'))) and (raiz41(Fr('8.8')), raiz41(Fr('9.2'))) == ('2{,}9665', '3{,}0332') and Fr('3.9') - 4 == Fr('-0.1') and 3*3 == 9, 'H01 v002 ej3: potencias desarrolladas y raíces cercanas')
for t1 in TS1:
    x = 4 + t1; ok(3 < x < 5 and x > 3 and 2*x > 6 and 2*x + 1 > 7 > 0, 'H01 v002 ej3: x > 3, 2x > 6, 2x + 1 > 7, línea por línea')
for y1 in RJ + [Fr(8), Fr(0), Fr(18), Fr(-9)]:
    ok((abs(y1 - 4) < 4) == (-4 < y1 - 4 < 4) == (0 < y1 < 8) and (abs(y1 + 3 - 9) < 9) == (-9 < y1 + 3 - 9 < 9) == (0 < y1 + 3 < 18), 'H01 v002 ej4 y B d): las tres líneas de la desigualdad')
ok(-4 + 4 == 0 and 4 + 4 == 8 and -9 + 9 == 0 and 9 + 9 == 18 and 2*2 == 4 and 3*3 == 9 and en1(r'|F(x)-4|&\lt 4&&', r'-4\lt F(x)-4&\lt 4&&', r'0\lt F(x)&\lt 8&&', r'|u(x)+3-9|&\lt 9&&', r'-9\lt u(x)+3-9&\lt 9&&', r'0\lt u(x)+3&\lt 18&&'), 'H01 v002 ej4 y B d): líneas escritas')
# ejercicios
ok((-1)**3 == (-1)*(-1)*(-1) == 1*(-1) == -1 and (-1)**2 == (-1)*(-1) == 1 and 2*(-1)**3 - (-1)**2 + 5 == 2*(-1) - 1 + 5 == -2 - 1 + 5 == 2 and Fr(6, 5) == Fr(12, 10) == Fr('1.2') and 2**3 == 2*2*2 == 8 and 4*2 == 8 and 8 - 2 == 6 and 4 + 1 == 5 and 9 - 1 == 8, 'H01 v002 A: potencias desarrolladas y división')
for x in RJ:
    if x > 0: ok(U1(x) == (6000 + 900*x)/x == 6000/x + 900*x/x == 6000/x + 900 > 6000/x, 'H01 v002 C d): la división repartida, línea por línea')
for K1 in (Fr(1), Fr(1200), Fr(60900), Fr(10**6), Fr(10**7)):
    for t1 in TS1:
        if t1 > 0: x = t1*6000/K1; ok(0 < x < 6000/K1 and K1*x < 6000 and K1 < 6000/x < U1(x), 'H01 v002 C d): la cadena del tope K, línea por línea (K = %s)' % K1)
ok(Fr(6000, 10**6) == Fr('0.006') and Fr('0.005') < Fr('0.006') and 6000/Fr('0.005') == 1200000 > 10**6 and U1(Fr('0.005')) == 1200000 + 900 == 1200900 and en1(r'\(\dfrac{6000}{1\,000\,000}=0{,}006\)', r'\(\dfrac{6000}{0{,}005}=1\,200\,000\)', r'\(U(0{,}005)=1\,200\,000+900=1\,200\,900\)', r'&=\frac{6000}{x}+\frac{900\,x}{x}&&', r'&=\frac{6000}{x}+900&&', r'K\cdot x&\lt 6000&&', r'K&\lt \frac{6000}{x}&&'), 'H01 v002 C d): el tope K = 1 000 000 con números')
# forma: ningún salto de línea «\\» pegado a un paréntesis; los límites de constantes van con \rightarrow (verificar_tex corta en \to)
ok('\\\\(' not in A1 and '\\\\)' not in A1 and A1.count('\\\\[') == 2 and len(re.findall(r'\\lim_\{x\\rightarrow -?\d+\}\d+=\d+\\\)', A1)) == 10, 'H01 v002 forma: saltos de línea de aligned y límites de constantes')
# escena (quinta ley): el producto queda dibujado (dos puntos, su hueco a la altura 6 y la punteada), el hueco lleva su rótulo, y la lectura no tiene saltos
ok("function p(x){ return f(x)*g(x); }" in E1 and "XS.forEach(function(x){ lmPunto(S, M, x, p(x), C.tan, false, 3); });" in E1 and "num('%s', 0, 5.7, C.tan, 7); frase('%s', XS[1], p(XS[1]), 0, -11, C.tan, 'center');" % (pl(p1(XS1[0])), pl(p1(XS1[1]))) in E1 and "lmSeg(S, M, A, LP, M.x0, LP, C.tan, 1); lmPunto(S, M, A, LP, C.tan, true, 3.4);" in E1 and "lmEtq(T, M, 'PR', M.x0, 6.32, 0, 6, 0);" in E1 and 2*3 == 6 and all(0 < p1(x) < 7 for x in XS1), 'H01 v002 escena: puntos del producto, su hueco a la altura 6 y la punteada')
ok("frase('hueco', A, 1.5, 0, 0, C.sec, 'center');" in E1 and "frase('con el producto, lo mismo:', M.x0, 6.78, 6, 0, C.tan);" in E1 and 'dos puntos y su hueco' in E1, 'H01 v002 escena: rótulo «hueco», frase del producto y leyenda')
for par1 in (XS1, XC1):
    ok(';\\\\ \\\\ '.join('|%s-2|=%s' % (tex(f1(x)), tex(abs(f1(x) - 2))) for x in par1) in E1 and ';\\\\ \\\\ '.join('|%s-3|=%s' % (tex(g1(x)), tex(abs(g1(x) - 3))) for x in par1) in E1, 'H01 v002 lectura: distancias de las alturas de f a 2 y de las de g a 3')
ok(';\\\\ \\\\ '.join('|%s-6|=%s' % (tex(p1(x)), tex(abs(p1(x) - 6))) for x in XS1) in E1 and all('|%s-6|=%s' % (tex(p1(x)), tex(abs(p1(x) - 6))) in E1 for x in XC1), 'H01 v002 lectura: distancias de los productos a 6')
ok("'s(x)=\\\\tfrac{x}{2}+1+x+1'" in E1 and "'\\\\tfrac{x}{2}+x=\\\\tfrac{x}{2}+\\\\tfrac{2x}{2}=\\\\tfrac{3x}{2};\\\\ \\\\ 1+1=2'" in E1 and "'s(x)=\\\\tfrac{3x}{2}+2'" in E1 and "'s(1{,}9)=\\\\tfrac{3\\\\cdot 1{,}9}{2}+2=\\\\tfrac{5{,}7}{2}+2=4{,}85'" in E1 and 3*Fr('1.9') == Fr('5.7') and Fr('5.7')/2 + 2 == Fr('4.85') == s1(Fr('1.9')) and all(x/2 + x == x/2 + 2*x/2 == 3*x/2 for x in RJ) and 1 + 1 == 2, 'H01 v002 lectura: la suma de las fórmulas, término por término, y su prueba en 1,9')
ok(en1(r'\(1{,}95\cdot 2{,}9=5{,}655\) y \(2{,}05\cdot 3{,}1=6{,}355\)', r'a la altura \(2\cdot 3=6\)', '<b>Burdeo:</b>', r'\(1{,}95+2{,}9=4{,}85\) y \(2{,}05+3{,}1=5{,}15\)', 'un círculo vacío (un «hueco»)'), 'H01 v002 «cómo leerla» y claves: el producto, las puntas y el hueco, con sus cuentas')
# <<< H01

# >>> H01 ESPER
ESPER['prop-idea'] = (7, FUN1)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '01.scene.js'].map(function(a){ return fs.readFileSync"); ok("'01.scene.js'" in NODO2, 'H01: la escena no quedó en la lista de node')
# <<< H01 ESPER

def lat1(et, F, a, lado, Lim, tope=Fr(1, 1000)):
    """llegada numérica por un lado (lado = -1 izquierda, +1 derecha): las distancias |F(a + lado·10^-k) − Lim|, k = 1…6, no crecen y terminan bajo el tope (no demuestra el límite)"""
    d = [abs(F(a + lado*Fr(1, 10**k)) - Lim) for k in range(1, 7)]
    ok(all(d[i + 1] <= d[i] for i in range(5)) and d[5] < tope, '%s: los valores no se acercan a %s por ese lado' % (et, Lim))
JQ = "' + Q + '"   # así se unen dos líneas de una lectura en el código de la escena

# >>> H02
# ───────── H02: límites de combinaciones de funciones (2f − 3g con límites leídos en dos gráficas; cociente sin límite; 0/0 no decide) ─────────
A2, E2 = molde('02', 'H02_limites_de_combinaciones_de_funciones.html', 'Límites de combinaciones de funciones', 'comb-lim', 'Propiedades de límites', ['comb-idea'], 1)
def f2(x): x = Fr(x); return Fr(4) if x == 3 else x - 1            # animación: f; hueco en (3, 2) y punto lleno en (3, 4)
def g2(x): x = Fr(x); assert x != 3; return 4 - x                  # animación: g, sin valor en 3
def h2(x): return 2*f2(x) - 3*g2(x)                                # la combinación; límite 1
def m2(x): x = Fr(x); return Fr(5) if x == 2 else 2*x - 1          # ejercicio A
def n2(x): return 6 - Fr(x)                                        # ejercicio A
def I2(x): return 1500*Fr(x)                                       # ejercicio C: ingreso
def K2(x): return 20000 + 700*Fr(x)                                # ejercicio C: costo
def G2(x): return I2(x) - K2(x)                                    # ejercicio C: ganancia
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e2 for e2 in err if e2 != 'H02 título, ruta y pie']
ok('<h1>Límites de combinaciones de funciones</h1>' in A2 and '<span class="status">CD-L30-H02 · v002 · Pendiente de APR</span>' in A2 and 'v001' not in A2 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Límites de combinaciones de funciones</b></li>' in A2, 'H02 v002 título, ruta y pie')
FUN2 = {'f': f2, 'g': g2, 'h': h2, 'm': m2, 'n': n2, 'I': I2, 'K': K2, 'G': G2}
valores('H02 hoja', mates_de(A2), FUN2, 12)
ok("function f(x){ return x === 3 ? 4 : x - 1; }" in E2 and "function g(x){ return 4 - x; }" in E2 and 'var A = 3, L = 2, LM = 1, XS = [2.5, 3.5];' in E2 and 'lmMarco(-0.85, 1.75, 2.6, 3.3, 0, 6, 0, 5), MG = lmMarco(2.55, 1.75, 2.6, 3.3, 0, 6, 0, 5)' in E2, 'H02 escena: funciones, lugar, límites y marcos')
llega1('H02 escena f', f2, 3, 2); llega1('H02 escena g', g2, 3, 1); llega1('H02 escena h', h2, 3, 1)
ok(f2(3) == 4 != 2 and 2*2 == 4 and 3*1 == 3 and 4 - 3 == 1 and 2*2 + (-3)*1 == 1 and 3 - 1 == 2 and 4 - 3 == 1, 'H02 escena: límites, múltiplos y resta')
for x2 in RJ:
    if x2 != 3:
        ok(h2(x2) == 5*x2 - 14 and abs(h2(x2) - 1) == 5*abs(x2 - 3) and f2(x2) - 2 == x2 - 3 and g2(x2) - 1 == 3 - x2, 'H02: la combinación fuera de 3')
        ok((f2(x2) - 2)/(g2(x2) - 1) == -1 and (f2(x2) - 2)**2/(g2(x2) - 1) == -(x2 - 3) == 3 - x2 and (f2(x2) - 2)/(g2(x2) - 1)**2 == 1/(x2 - 3), 'H02 k3: tres cocientes con límites 0 y 0')
        ok(all(0 <= F2(x2) <= 5 for F2 in (f2, g2)) or not (1 <= x2 <= 4), 'H02 escena: las gráficas caben en la ventana')
# lectura y registro, armados con Fraction
for x2 in (Fr('2.5'), Fr('3.5'), Fr('2.9'), Fr('3.1'), Fr('2.99'), Fr('3.01')):   # v002: también 2,9; 3,1; 2,99 y 3,01
    ok('f(%s)=%s-1=%s;\\\\ \\\\ g(%s)=4-%s=%s' % (tex(x2), tex(x2), tex(f2(x2)), tex(x2), tex(x2), tex(g2(x2))) in E2, 'H02 lectura: alturas en %s' % tex(x2))
for x2 in (Fr('2.5'), Fr('3.5'), Fr('2.9'), Fr('3.1'), Fr('2.99'), Fr('3.01')):
    ok('h(%s)=2\\\\cdot %s-3\\\\cdot %s%s=%s-%s=%s' % (tex(x2), tex(f2(x2)), tex(g2(x2)), JQ, tex(2*f2(x2)), tex(3*g2(x2)), tex(h2(x2))) in E2, 'H02 lectura: h(%s)' % tex(x2))
ok(abs(h2(Fr('2.99')) - 1) < abs(h2(Fr('2.9')) - 1) < abs(h2(Fr('2.5')) - 1) and abs(h2(Fr('3.01')) - 1) < abs(h2(Fr('3.1')) - 1) < abs(h2(Fr('3.5')) - 1), 'H02 lectura: más cerca de 3, más cerca de 1')
ok("['R6', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('2.9')), tex(h2(Fr('2.9'))), tex(Fr('3.1')), tex(h2(Fr('3.1')))) in E2 and "['R4', '2\\\\cdot 2=4;\\\\ \\\\ 3\\\\cdot 1=3'" in E2 and "['R5', '\\\\lim_{x\\\\to 3}h(x)=4-3=1'" in E2 and "['R2', '\\\\lim_{x\\\\to 3}f(x)=2'" in E2 and "['R3', '\\\\lim_{x\\\\to 3}g(x)=1'" in E2 and "['R7', 'f(3)=4\\\\text{ no se usa}'" in E2 and "['F', '\\\\Longrightarrow\\\\ 1'" in E2, 'H02 registro')
ok("frase('%s', MF, 2.5, 1.5," % pl(f2(Fr('2.5'))) in E2 and "frase('%s', MF, 3.5, 2.5," % pl(f2(Fr('3.5'))) in E2 and "frase('%s', MG, 2.5, 1.5," % pl(g2(Fr('2.5'))) in E2 and "frase('%s', MG, 3.5, 0.5," % pl(g2(Fr('3.5'))) in E2, 'H02 escena: números junto a los puntos')
ok("lmPunto(S, MF, A, L, C.sec, true, 3.4); lmPunto(S, MF, A, 4, C.sec, false, 3.2); lmPunto(S, MG, A, LM, C.alt, true, 3.4);" in E2, 'H02 escena: huecos a la altura de los límites y punto lleno en f(3)')
# k2: la combinación lineal y el cociente sin límite
for c2 in RJ[::11]:
    for d2 in RJ[::13]:
        llega1('H02 k2: c·f + d·g', lambda x: c2*f2(x) + d2*g2(x), 3, c2*2 + d2*1, tope=Fr(1, 100))
for M2 in (10, 1000, 10**6):
    for t2 in TS1:
        x2 = 3 + t2/M2; ok(0 < abs(x2 - 3) < Fr(1, M2) and abs(f2(x2)/(g2(x2) - 1)) > M2 and f2(x2)/(g2(x2) - 1)*(g2(x2) - 1) == f2(x2), 'H02 ej4: el cociente supera el tope %s' % M2)
        ok(abs(1/(x2 - 3)) > M2, 'H02 k3: 1/(x − 3) supera el tope %s' % M2)
ok(all(K_*0 == 0 for K_ in RJ) and 2 != 0, 'H02 k2: K · 0 = 0 y L ≠ 0')
# ejemplos
ok((2*1, 2 + 4) == (2, 6) and f2(Fr('2.9'))*g2(Fr('2.9')) == Fr('2.09') and Fr('2.09') + 4 == Fr('6.09') and f2(Fr('3.1'))*g2(Fr('3.1')) == Fr('1.89') and Fr('1.89') + 4 == Fr('5.89') and f2(Fr('2.99'))*g2(Fr('2.99')) == Fr('2.0099') and f2(Fr('3.01'))*g2(Fr('3.01')) == Fr('1.9899') and 2*(1 + 4) == 10, 'H02 ej1'); llega1('H02 ej1', lambda x: f2(x)*g2(x) + 4, 3, 6)
ok((2 + 1, 1**2, Fr(3, 1), Fr(1, 2)) == (3, 1, 3, Fr('0.5')) and 1 != 0 and 2 != 0, 'H02 ej2'); llega1('H02 ej2', lambda x: (f2(x) + 1)/g2(x)**2, 3, 3); llega1('H02 ej2 b', lambda x: g2(x)/f2(x), 3, Fr(1, 2))
ok((3*(-1), Fr(4, -1), -3 - (-4), -3 + 4, 3**2, 9*(-1), 4 + 5) == (-3, -4, 1, 1, 9, -9, 9) and 3*3 == 9 and -1 != 0, 'H02 ej3')
for y2 in RJ: ok((abs(y2 - 9) < 9) == (0 < y2 < 18), 'H02 ej3: |y − 9| < 9 equivale a 0 < y < 18')
ok(1 - 1 == 0 and f2(Fr('2.9'))/(g2(Fr('2.9')) - 1) == Fr('1.9')/Fr('0.1') == 19 and f2(Fr('3.1'))/(g2(Fr('3.1')) - 1) == Fr('2.1')/Fr('-0.1') == -21 and f2(Fr('2.99'))/(g2(Fr('2.99')) - 1) == 199 and f2(Fr('3.01'))/(g2(Fr('3.01')) - 1) == -201, 'H02 ej4')
ok(1/Fr('0.1') == 10 and 1/Fr('-0.1') == -10 and 1/Fr('0.01') == 100 and 2 - 2 == 0 and 3 - 3 == 0, 'H02 k3: valores')
# ejercicios
llega1('H02 A m', m2, 2, 3); llega1('H02 A n', n2, 2, 4); llega1('H02 A b)', lambda x: m2(x) + n2(x), 2, 7); llega1('H02 A c)', lambda x: 3*m2(x) - 2*n2(x), 2, 1); llega1('H02 A d)', lambda x: m2(x)*n2(x), 2, 12); llega1('H02 A e)', lambda x: n2(x)/m2(x), 2, Fr(4, 3))
ok((2*2 - 1, 6 - 2, 3 + 4, 3*3, 2*4, 9 - 8, 3*4) == (3, 4, 7, 9, 8, 1, 12) and m2(2) + n2(2) == 5 + 4 == 9 != 7 and 3 != 0, 'H02 A')
ok((4*(-2), -8 + 0, 4 + (-2), Fr(0, 2), 4 - (-2), 4 + 2*(-2), 4 - 4) == (-8, -8, 2, 0, 6, 0, 0) and 6 != 0, 'H02 B')
ok(I2(50) == 75000 and 700*50 == 35000 and K2(50) == 55000 and G2(50) == 75000 - 55000 == 20000 and Fr(20000, 50) == 400 and I2(25) == 37500 and 700*25 == 17500 and K2(25) == 37500 and G2(25) == 0, 'H02 C a) a d)')
for x2 in RJ: ok(G2(x2) == 1500*x2 - 20000 - 700*x2 == 800*x2 - 20000 and (G2(x2) == 0) == (x2 == 25), 'H02 C: G(x) = 800x − 20000')
ok(I2(Fr('25.1')) == 37650 and 700*Fr('25.1') == 17570 and K2(Fr('25.1')) == 37570 and G2(Fr('25.1')) == 80 and K2(Fr('25.1'))/G2(Fr('25.1')) == Fr('469.625') and I2(Fr('24.9')) == 37350 and 700*Fr('24.9') == 17430 and K2(Fr('24.9')) == 37430 and G2(Fr('24.9')) == -80 and K2(Fr('24.9'))/G2(Fr('24.9')) == Fr('-467.875'), 'H02 C d): valores')
llega1('H02 C G', G2, 50, 20000); llega1('H02 C G/x', lambda x: G2(x)/Fr(x), 50, 400); llega1('H02 C G en 25', G2, 25, 0)
for z2 in ['\\[\\lim_{x\\to a}[c\\cdot f(x)+d\\cdot g(x)]=c\\cdot L+d\\cdot M\\]', '\\(f(x)=x-1\\) si \\(x\\ne 3\\), con \\(f(3)=4\\); y \\(g(x)=4-x\\) si \\(x\\ne 3\\), sin valor en \\(3\\)', '\\(h(x)=2f(x)-3g(x)\\)', 'sus límites <b>existen</b>: \\(\\lim_{x\\to a}f(x)=L\\) y \\(\\lim_{x\\to a}g(x)=M\\)',
           '\\(\\lim_{x\\to a}[f(x)\\cdot g(x)+c]=L\\cdot M+c\\)', 'Si \\(M\\ne 0\\): \\(\\lim_{x\\to a}\\dfrac{c\\cdot f(x)}{g(x)}=\\dfrac{c\\cdot L}{M}\\)', '\\(\\lim_{x\\to a}[c\\cdot f(x)]=c\\cdot L\\)', '\\(\\lim_{x\\to a}[d\\cdot g(x)]=d\\cdot M\\)',
           '\\(\\lim_{x\\to a}f(x)=L\\) con \\(L\\ne 0\\), \\(\\lim_{x\\to a}g(x)=0\\), y \\(g(x)\\ne 0\\) para todo \\(x\\ne a\\) de un intervalo abierto que contiene a \\(a\\)', '\\(f(x)=\\dfrac{f(x)}{g(x)}\\cdot g(x)\\)', '\\(\\lim_{x\\to a}f(x)=K\\cdot 0=0\\)', 'Luego el cociente no tiene límite en \\(a\\)',
           '\\frac{f(x)-2}{g(x)-1}&=\\frac{(x-1)-2}{(4-x)-1}&&', '&=\\frac{x-3}{3-x}&&\\text{se juntan los números, arriba y abajo}', 'arriba, \\(-1-2=-3\\); abajo, \\(4-1=3\\)', '&=\\frac{x-3}{-(x-3)}&&\\text{porque }3-x=-(x-3)', '&=\\frac{1}{-1}=-1&&\\text{se simplifica }x-3', '\\frac{[f(x)-2]^{2}}{g(x)-1}&=\\frac{(x-3)^{2}}{3-x}&&', '&=\\frac{(x-3)\\cdot(x-3)}{-(x-3)}&&', '&=\\frac{x-3}{-1}&&', '&=-(x-3)&&', '&=3-x&&', '\\frac{f(x)-2}{[g(x)-1]^{2}}&=\\frac{x-3}{(3-x)^{2}}&&', '&=\\frac{x-3}{(x-3)^{2}}&&\\text{porque }(3-x)^{2}=[-(x-3)]^{2}=(x-3)^{2}', '&=\\frac{x-3}{(x-3)\\cdot(x-3)}&&', '&=\\frac{1}{x-3}&&', 'no tiene límite en \\(3\\)',
           '\\(\\lim_{x\\to 3}[f(x)\\cdot g(x)+4]=2+4=6\\)', '\\(\\lim_{x\\to 3}\\dfrac{f(x)+1}{[g(x)]^{2}}=\\dfrac{3}{1}=3\\)', '\\(\\lim_{x\\to 3}\\dfrac{g(x)}{f(x)}=\\dfrac{1}{2}=0{,}5\\)', '\\(\\lim_{x\\to -2}u(x)=3\\), \\(\\lim_{x\\to -2}v(x)=-1\\) y \\(\\lim_{x\\to -2}w(x)=4\\)', '\\(\\lim_{x\\to -2}\\sqrt{w(x)+5}=\\sqrt{9}=3\\)', '|w(x)+5-9|&\\lt 9&&', '-9\\lt w(x)+5-9&\\lt 9&&', '0\\lt w(x)+5&\\lt 18&&\\text{se suma }9\\text{ a los tres lados}',
           '\\(\\lim_{x\\to 3}[g(x)-1]=1-1=0\\)', 'el cociente no tiene límite en \\(3\\)', '\\(g(x)-1=(4-x)-1=3-x\\)', '\\(m(x)=2x-1\\) si \\(x\\ne 2\\), y \\(m(2)=5\\)', '\\(\\lim_{x\\to 2}[m(x)+n(x)]=3+4=7\\)', '\\(\\lim_{x\\to 2}[3m(x)-2n(x)]=9-8=1\\)', '\\(\\lim_{x\\to 2}[m(x)\\cdot n(x)]=3\\cdot 4=12\\)', '\\(\\lim_{x\\to 2}\\dfrac{n(x)}{m(x)}=\\dfrac{4}{3}\\)',
           '\\(\\lim_{x\\to 0}p(x)=4\\), \\(\\lim_{x\\to 0}q(x)=0\\) y \\(\\lim_{x\\to 0}r(x)=-2\\)', '\\(\\lim_{x\\to 0}[p(x)\\cdot r(x)+q(x)]=-8+0=-8\\)', '\\(\\lim_{x\\to 0}\\dfrac{q(x)}{p(x)+r(x)}=\\dfrac{0}{2}=0\\)', 'con estos datos no se puede decidir si el límite existe',
           '\\(I(x)=1500\\,x\\)', '\\(K(x)=20000+700\\,x\\)', '\\(G(x)=I(x)-K(x)\\)', '\\(\\lim_{x\\to 50}G(x)=75000-55000=20000\\)', '\\(\\lim_{x\\to 50}\\dfrac{G(x)}{x}=\\dfrac{20000}{50}=400\\)', '\\(\\lim_{x\\to 25}G(x)=37500-37500=0\\)', 'G(x)&=I(x)-K(x)&&\\text{modelo}', '&=1500\\,x-(20000+700\\,x)&&', '&=1500\\,x-20000-700\\,x&&', '&=800\\,x-20000&&\\text{porque }1500-700=800']:
    ok(z2 in A2, 'H02: la hoja no trae «%s»' % z2)
ok(A2.count('no se puede usar') >= 5 and A2.count('sin demostrar') >= 2, 'H02: avisos «no se puede usar» y «sin demostrar»')
# ───────── H02 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja y de la lectura ─────────
def en2(*cads): return all(c in A2 for c in cads)
X42 = [Fr('2.9'), Fr('2.99'), Fr('3.01'), Fr('3.1')]
ok(en2(*[r'f(%s)&=%s-1=%s&&' % (tex(x), tex(x), tex(f2(x))) for x in X42]) and en2(*[r'g(%s)&=4-%s=%s&&' % (tex(x), tex(x), tex(g2(x))) for x in X42]), 'H02 v002 encabezado: los valores de f y de g, uno bajo otro')
ok(en2(*[r'2f(%s)-3g(%s)&=2\cdot %s-3\cdot %s=%s-%s=%s&&\text{distancia a uno: }%s=%s' % (tex(x), tex(x), tex(f2(x)), tex(g2(x)), tex(2*f2(x)), tex(3*g2(x)), tex(h2(x)), ('1-%s' % tex(h2(x))) if h2(x) < 1 else ('%s-1' % tex(h2(x))), tex(abs(h2(x) - 1))) for x in X42]), 'H02 v002 encabezado: las cuatro combinaciones y su distancia a 1')
ok(all(abs(h2(x) - 1) <= 2*abs(f2(x) - 2) + 3*abs(g2(x) - 1) for x in RJ if x != 3) and all(abs(h2(x) - 1) == 2*abs(f2(x) - 2) + 3*abs(g2(x) - 1) for x in X42) and 2 - f2(X42[0]) == Fr('0.1') == g2(X42[0]) - 1 and 2*Fr('0.1') + 3*Fr('0.1') == Fr('0.2') + Fr('0.3') == Fr('0.5') == abs(h2(X42[0]) - 1) and 2*Fr('0.01') + 3*Fr('0.01') == Fr('0.02') + Fr('0.03') == Fr('0.05') == abs(h2(X42[1]) - 1), 'H02 v002 encabezado: la distancia de la combinación es 2 veces la de f más 3 veces la de g')
ok(all(abs(F2(X42[i]) - l2) > abs(F2(X42[j]) - l2) for F2, l2 in ((f2, 2), (g2, 1), (h2, 1)) for i, j in ((0, 1), (3, 2))) and 2*2 - 3*1 == 4 - 3 == 1, 'H02 v002 encabezado: más cerca de 3, más cerca de 2, de 1 y de 1')
ok(en2(r'\(2\cdot 0{,}1+3\cdot 0{,}1=0{,}2+0{,}3=0{,}5\)', r'\(2\cdot 0{,}01+3\cdot 0{,}01=0{,}02+0{,}03=0{,}05\)', r'\(1=2\cdot 2-3\cdot 1\)', '<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La fórmula.</b>', 'se lee «\\(f\\) de \\(x\\)»', 'se lee «dos por \\(f\\) de \\(x\\), menos tres por \\(g\\) de \\(x\\)»', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\), de \\(c\\) por \\(f\\) de \\(x\\) más \\(d\\) por \\(g\\) de \\(x\\), es \\(c\\) por \\(L\\) más \\(d\\) por \\(M\\)»', 'restar \\(3g(x)\\) es sumar \\((-3)\\cdot g(x)\\)') and A2.count('<p class="lede">') == 3, 'H02 v002 encabezado: frases')
for x2 in RJ:
    if x2 != 3: ok(2*f2(x2) - 3*g2(x2) == 2*f2(x2) + (-3)*g2(x2), 'H02 v002: restar 3g es sumar (−3)·g')
ok(en2('; '.join(r'\(%s\)' % tex(f2(x)) for x in X42) + ' se acercan a \\(2\\)', '; '.join(r'\(%s\)' % tex(g2(x)) for x in X42) + ' se acercan a \\(1\\)', '(\\(1{,}5\\) y \\(2{,}5\\) en \\(f\\); \\(1{,}5\\) y \\(0{,}5\\) en \\(g\\))') and (f2(Fr('2.5')), f2(Fr('3.5')), g2(Fr('2.5')), g2(Fr('3.5'))) == (Fr('1.5'), Fr('2.5'), Fr('1.5'), Fr('0.5')), 'H02 v002 cómo leerla: los números del encabezado y las alturas de los puntos')
ok(en2('<b>Palabras que se usan.</b>', '<b>El procedimiento</b>', '<b>De dónde sale cada una.</b>', '<b>Cómo se lee.</b>', r'\lim_{x\to a}[f(x)\cdot g(x)+c]&=L\cdot M+c&&\text{suma de las dos líneas anteriores}', r'\lim_{x\to a}\frac{c\cdot f(x)}{g(x)}&=\frac{c\cdot L}{M}&&\text{cociente; se puede usar porque }M\ne 0', r'\(2\cdot 1+4=2+4=6\)', r'primero \(5\cdot 2=10\), después \(\dfrac{10}{1}=10\)') and 2*1 + 4 == 6 and Fr(5*2, 1) == 10, 'H02 v002 k1: de dónde sale cada cuenta frecuente')
llega1('H02 v002 k1: f·g + 4', lambda x: f2(x)*g2(x) + 4, 3, 6); llega1('H02 v002 k1: 5f/g', lambda x: 5*f2(x)/g2(x), 3, 10)
ok(A2.count('<b>Qué se demuestra') == 2 and A2.count('<b>Cómo funciona el método') == 2 and en2('por contradicción', 'un límite, si existe, es único'), 'H02 v002 k2: qué se demuestra y cómo funciona el método, dos veces')
ok(en2(r'\lim_{x\to 3}[2f(x)]&=2\cdot 2=4&&\text{paso 1, con }c=2', r'\lim_{x\to 3}[(-3)\cdot g(x)]&=(-3)\cdot 1=-3&&\text{paso 2, con }d=-3', r'\lim_{x\to 3}[2f(x)+(-3)\cdot g(x)]&=4+(-3)=4-3=1&&\text{paso 3: se suman los dos límites}', r'sumar \(-3\) es restar \(3\): \(4+(-3)=4-3\), y \(4-3=1\)', r'\(2\cdot 2+(-3)\cdot 1=4-3=1\)', '; '.join(r'\(%s\)' % tex(h2(x)) for x in X42)) and 2*2 == 4 and (-3)*1 == -3 and 4 + (-3) == 4 - 3 == 1, 'H02 v002 k2: los pasos con los números de la animación')
llega1('H02 v002 k2: 2f', lambda x: 2*f2(x), 3, 4); llega1('H02 v002 k2: (−3)g', lambda x: -3*g2(x), 3, -3)
ok(Fr(6, 2)*2 == 3*2 == 6 and en2(r'\(\dfrac{6}{2}\cdot 2=3\cdot 2=6\)', r'\(\dfrac{1{,}9}{0{,}1}=19\)', r'\(\dfrac{1{,}99}{0{,}01}=199\)', r'\(\dfrac{2{,}01}{-0{,}01}=-201\)', r'\(19\cdot 0{,}1=1{,}9\), que es \(f(2{,}9)\)') and 19*Fr('0.1') == Fr('1.9') == f2(Fr('2.9')) and 1 - 1 == 0, 'H02 v002 k2: el cociente sin límite, con números')
for x2 in RJ:
    if x2 != 3:
        ok(-1 - 2 == -3 and 4 - 1 == 3 and (x2 - 1) - 2 == x2 - 3 and (4 - x2) - 1 == 3 - x2 == -(x2 - 3) and (x2 - 3)/(-(x2 - 3)) == Fr(1, -1) == -1, 'H02 v002 k3: primer cociente, línea por línea')
        ok((x2 - 3)**2 == (x2 - 3)*(x2 - 3) and (x2 - 3)*(x2 - 3)/(-(x2 - 3)) == (x2 - 3)/(-1) == -(x2 - 3) == -x2 + 3 == 3 - x2, 'H02 v002 k3: segundo cociente, línea por línea')
        ok((3 - x2)**2 == (-(x2 - 3))**2 == (x2 - 3)**2 and (x2 - 3)/((x2 - 3)*(x2 - 3)) == 1/(x2 - 3), 'H02 v002 k3: tercer cociente, línea por línea')
ok((Fr('1.9') - 2)/(Fr('1.1') - 1) == Fr('-0.1')/Fr('0.1') == -1 and (Fr('2.1') - 2)/(Fr('0.9') - 1) == Fr('0.1')/Fr('-0.1') == -1 and Fr('-0.1')**2/Fr('0.1') == Fr('0.01')/Fr('0.1') == Fr('0.1') == 3 - Fr('2.9') and 0**2 == 0 and 1/Fr('0.001') == 1000
   and en2(r'\(\dfrac{1{,}9-2}{1{,}1-1}=\dfrac{-0{,}1}{0{,}1}=-1\)', r'\(\dfrac{2{,}1-2}{0{,}9-1}=\dfrac{0{,}1}{-0{,}1}=-1\)', r'\(\dfrac{(-0{,}1)^{2}}{0{,}1}=\dfrac{0{,}01}{0{,}1}=0{,}1\), y \(3-2{,}9=0{,}1\)', r'\(\dfrac{1}{0{,}001}=1000\)', r'basta un \(x\) entre \(3\) y \(3+\dfrac{1}{K}\)'), 'H02 v002 k3: los tres cocientes con números')
for K2_ in (Fr(1, 2), 1, 7, 1000):
    for t2 in TS1:
        if t2 > 0: x2 = 3 + t2/K2_; ok(3 < x2 < 3 + Fr(1)/K2_ and 1/(x2 - 3) > K2_, 'H02 v002 k3: entre 3 y 3 + 1/K, 1/(x − 3) pasa el tope K')
# ejemplos
ok(en2(*[r'\(f(%s)=%s-1=%s\) y \(g(%s)=4-%s=%s\)' % (tex(x), tex(x), tex(f2(x)), tex(x), tex(x), tex(g2(x))) for x in X42]) and en2('; '.join(r'\(%s\)' % tex(f2(x)*g2(x) + 4) for x in (X42[0], X42[1], X42[2], X42[3]))), 'H02 v002 ej1: valores de f y de g con su cuenta, y los cuatro valores ordenados')
ok(Fr('1.99') + 1 == Fr('2.99') and Fr('1.01')**2 == Fr('1.01')*Fr('1.01') == Fr('1.0201') and Fr('2.01') + 1 == Fr('3.01') and Fr('0.99')**2 == Fr('0.99')*Fr('0.99') == Fr('0.9801') and 1**2 == 1*1 == 1
   and en2(r'\(1{,}99+1=2{,}99\)', r'\(1{,}01^{2}=1{,}01\cdot 1{,}01=1{,}0201\)', r'\(\dfrac{2{,}99}{1{,}0201}\approx %s\)' % r41(Fr('2.99')/Fr('1.0201')), r'\(0{,}99^{2}=0{,}99\cdot 0{,}99=0{,}9801\)', r'\(\dfrac{3{,}01}{0{,}9801}\approx %s\)' % r41(Fr('3.01')/Fr('0.9801')), r'\(\dfrac{1{,}01}{1{,}99}\approx %s\)' % r41(Fr('1.01')/Fr('1.99')), r'\(\dfrac{0{,}99}{2{,}01}\approx %s\)' % r41(Fr('0.99')/Fr('2.01')), r'\(\lim_{x\rightarrow 3}1=1\)', r'\(1^{2}=1\cdot 1=1\)')
   and (f2(Fr('2.99')) + 1)/g2(Fr('2.99'))**2 == Fr('2.99')/Fr('1.0201') and (f2(Fr('3.01')) + 1)/g2(Fr('3.01'))**2 == Fr('3.01')/Fr('0.9801') and g2(Fr('2.99'))/f2(Fr('2.99')) == Fr('1.01')/Fr('1.99') and g2(Fr('3.01'))/f2(Fr('3.01')) == Fr('0.99')/Fr('2.01'), 'H02 v002 ej2: comprobación con valores (redondeo a cuatro decimales)')
ok(3**2 == 3*3 == 9 and 9*(-1) == -9 and 4 + 5 == 9 and -9 + 9 == 0 and 9 + 9 == 18 and en2(r'\(3^{2}=3\cdot 3=9\)', r'\(9\cdot(-1)=-9\)', r'\(\lim_{x\rightarrow -2}5=5\)', r'porque \(-9+9=0\) y \(9+9=18\)', r'porque \(3\cdot 3=9\) y \(3\) es positivo', 'no hay comprobación con valores'), 'H02 v002 ej3')
for y2 in RJ: ok((abs(y2 - 9) < 9) == (-9 < y2 - 9 < 9) == (0 < y2 < 18), 'H02 v002 ej3: las tres líneas de la desigualdad')
ok(Fr('1.1') - 1 == Fr('0.1') and Fr('0.9') - 1 == Fr('-0.1') and Fr('1.01') - 1 == Fr('0.01') and Fr('0.99') - 1 == Fr('-0.01') and 4 - 1 == 3 and en2(r'\(1{,}1-1=0{,}1\)', r'\(0{,}9-1=-0{,}1\)', r'\(1{,}01-1=0{,}01\)', r'\(0{,}99-1=-0{,}01\)', r'\(19\); \(199\); \(-201\); \(-21\)', r'\(3-x\) solo vale \(0\) cuando \(x=3\)') and all((3 - x == 0) == (x == 3) for x in RJ), 'H02 v002 ej4: denominadores y valores')
# ejercicios
ok(m2(Fr('1.9')) == 2*Fr('1.9') - 1 == Fr('3.8') - 1 == Fr('2.8') and n2(Fr('1.9')) == Fr('4.1') and Fr('2.8') + Fr('4.1') == Fr('6.9') and m2(Fr('2.1')) == Fr('4.2') - 1 == Fr('3.2') and n2(Fr('2.1')) == Fr('3.9') and Fr('3.2') + Fr('3.9') == Fr('7.1')
   and en2(r'\(m(1{,}9)=2\cdot 1{,}9-1=3{,}8-1=2{,}8\)', r'\(n(1{,}9)=6-1{,}9=4{,}1\)', r'\(2{,}8+4{,}1=6{,}9\)', r'\(m(2{,}1)=2\cdot 2{,}1-1=4{,}2-1=3{,}2\)', r'\(n(2{,}1)=6-2{,}1=3{,}9\)', r'\(3{,}2+3{,}9=7{,}1\)'), 'H02 v002 A: comprobación de b) con valores')
ok(2*(-2) == -4 and 4 + (-4) == 4 - 4 == 0 and en2(r'\(2\cdot(-2)=-4\)', r'\(4+(-4)=4-4=0\)', r'(\(-1\), \(0\) y sin límite)'), 'H02 v002 B c) y d)')
ok(1500 - 700 == 800 and Fr(20000, 800) == 25 and 700*Fr('25.1') == 17570 and 700*Fr('24.9') == 17430 and 1500*50 == 75000 and en2(r'\(\lim_{x\to 50}x=50\)', r'\(\lim_{x\rightarrow 50}20000=20000\)', r'\(x=\dfrac{20000}{800}=25\)', r'\(700\cdot 25{,}1=17570\)', r'\(700\cdot 24{,}9=17430\)', r'\(800\,x=20000\)'), 'H02 v002 C: la ganancia línea por línea y los productos')
for x2 in RJ: ok(I2(x2) - K2(x2) == 1500*x2 - (20000 + 700*x2) == 1500*x2 - 20000 - 700*x2 == 800*x2 - 20000, 'H02 v002 C: G(x), una operación por línea')
# lectura del paso 6 (v002): cada h(x) lleva antes sus f(x) y g(x) con su cuenta
ok(all(E2.index("'f(%s)=%s-1=%s;" % (tex(x), tex(x), tex(f2(x)))) < E2.index("'h(%s)=2" % tex(x)) for x in X42), 'H02 v002 lectura: f y g antes de cada h')
# <<< H02

# >>> H02 ESPER
ESPER['comb-idea'] = (7, FUN2)
NODO2 = NODO2.replace("'_lim.js'", "'_lim.js', '_prop.js'"); ok("'_prop.js'" in NODO2, 'H02: el ayudante _prop.js no quedó en la lista de node')
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '02.scene.js'].map(function(a){ return fs.readFileSync"); ok("'02.scene.js'" in NODO2, 'H02: la escena no quedó en la lista de node')
# <<< H02 ESPER

# >>> H03
# ───────── H03: límites de funciones combinadas (f y g con salto: la combinación se estudia por cada lado; suma por la izquierda demostrada) ─────────
A3, E3 = molde('03', 'H03_limites_de_funciones_combinadas.html', 'Límites de funciones combinadas', 'comb-lat', 'Propiedades de límites', ['comblat-idea'], 1)
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e3 for e3 in err if e3 != 'H03 título, ruta y pie']
ok('<h1>Límites de funciones combinadas</h1>' in A3 and '<span class="status">CD-L30-H03 · v002 · Pendiente de APR</span>' in A3 and 'v001' not in A3 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Límites de funciones combinadas</b></li>' in A3, 'H03 v002 título, ruta y pie')
def f3(x): x = Fr(x); return x - 1 if x < 2 else x + 1             # animación: laterales 1 y 3 en 2; f(2) = 3
def g3(x): x = Fr(x); return 6 - x if x <= 2 else 4 - x            # animación: laterales 4 y 2 en 2; g(2) = 4
def s3(x): return f3(x) + g3(x)                                    # suma: 5 fuera de 2; s(2) = 7
def p3(x): return f3(x)*g3(x)                                      # producto: laterales 4 y 6
def m3(x): x = Fr(x); return 2*x if x < 1 else 5 - x               # ejercicio A
def n3(x): x = Fr(x); return 3 - x if x < 1 else x - 1             # ejercicio A
def k3(x): x = Fr(x); assert x > 0; return Fr(800) if x < 10 else Fr(700)    # ejercicio C: precio por kilo
def e3(x): x = Fr(x); assert x > 0; return Fr(0) if x < 10 else Fr(1000)     # ejercicio C: envase
def T3(x): return k3(x)*Fr(x) + e3(x)                              # ejercicio C: total
FUN3 = {'f': f3, 'g': g3, 's': s3, 'p': p3, 'm': m3, 'n': n3, 'k': k3, 'e': e3, 'T': T3}
valores('H03 hoja', mates_de(A3), FUN3, 10)
ok("function f(x){ return x < 2 ? x - 1 : x + 1; }" in E3 and "function g(x){ return x <= 2 ? 6 - x : 4 - x; }" in E3 and 'var A = 2, FI = 1, FD = 3, GI = 4, GD = 2;' in E3 and 'lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.5), MG = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.5)' in E3, 'H03 escena: funciones, lugar, laterales y marcos')
lat1('H03 f izq', f3, 2, -1, 1); lat1('H03 f der', f3, 2, 1, 3); lat1('H03 g izq', g3, 2, -1, 4); lat1('H03 g der', g3, 2, 1, 2)
lat1('H03 s izq', s3, 2, -1, 5); lat1('H03 s der', s3, 2, 1, 5); lat1('H03 p izq', p3, 2, -1, 4); lat1('H03 p der', p3, 2, 1, 6)
ok((1 + 4, 3 + 2, 1*4, 3*2) == (5, 5, 4, 6) and 4 != 6 and 1 != 3 and 4 != 2 and f3(2) == 3 and g3(2) == 4 and s3(2) == 3 + 4 == 7 != 5, 'H03 escena: laterales, suma, producto y valores en 2')
for x3 in RJ:
    if x3 != 2: ok(s3(x3) == 5 and (s3(x3) == (x3 - 1) + (6 - x3) if x3 < 2 else s3(x3) == (x3 + 1) + (4 - x3)), 'H03: la suma vale 5 fuera de 2')
    if 1 <= x3 <= 4: ok(0 <= f3(x3) <= Fr('5.5') and 0 <= g3(x3) <= Fr('5.5'), 'H03 escena: las gráficas caben en la ventana')
    if x3 < 2: ok(abs(f3(x3) - 1) == abs(x3 - 2) == 2 - x3 and abs(g3(x3) - 4) == abs(2 - x3) == 2 - x3 and (2 - x3 < Fr('0.1')) == (2 - Fr('0.1') < x3), 'H03 k2: distancias por la izquierda')
    if x3 > 2: ok(g3(x3) - 2 == (4 - x3) - 2 == 2 - x3, 'H03 k3: g(x) − 2 por la derecha')
for nom3, F3, sg3, fm3 in (('f', f3, -1, '%s-1'), ('g', g3, -1, '6-%s'), ('f', f3, 1, '%s+1'), ('g', g3, 1, '4-%s')):
    for h3 in (Fr('0.1'), Fr('0.01')):
        x3 = 2 + sg3*h3; ok('%s(%s)=%s=%s' % (nom3, tex(x3), fm3 % tex(x3), tex(F3(x3))) in E3, 'H03 lectura: %s(%s)' % (nom3, tex(x3)))
for sg3 in (-1, 1):
    for h3 in (Fr('0.1'), Fr('0.01')):
        x3 = 2 + sg3*h3
        ok('s(%s)=%s+%s=%s' % (tex(x3), tex(f3(x3)), tex(g3(x3)), tex(s3(x3))) in E3 and 'p(%s)=%s\\\\cdot %s=%s' % (tex(x3), tex(f3(x3)), tex(g3(x3)), tex(p3(x3))) in E3, 'H03 lectura: s y p en %s' % tex(x3))
ok("['R2', '\\\\lim_{x\\\\to 2^{-}}f(x)=1;\\\\ \\\\ \\\\lim_{x\\\\to 2^{-}}g(x)=4'" in E3 and "['R3', '\\\\lim_{x\\\\to 2^{-}}s(x)=1+4=5'" in E3 and "['R4', '\\\\lim_{x\\\\to 2^{+}}f(x)=3;\\\\ \\\\ \\\\lim_{x\\\\to 2^{+}}g(x)=2'" in E3 and "['R5', '\\\\lim_{x\\\\to 2^{+}}s(x)=3+2=5'" in E3 and "['R6', '\\\\lim_{x\\\\to 2}[f(x)+g(x)]=5'" in E3 and "['R7', '1\\\\cdot 4=4\\\\ne 3\\\\cdot 2=6\\\\text{: sin límite}'" in E3 and "['SI', '1+4=5'" in E3 and "['SD', '3+2=5'" in E3 and '\\\\text{en el lugar: }s(2)=3+4=7' in E3, 'H03 registro y rótulos')
ok("frase('hacia 1', MF, 0, FI," in E3 and "frase('hacia 4', MG, 0, GI," in E3 and "frase('hacia 3', MF, 0, FD," in E3 and "frase('hacia 2', MG, 0, GD," in E3 and "'f va hacia 1 y g va hacia 4.'" in E3 and "'f va hacia 3 y g va hacia 2.'" in E3 and "'4 por la izquierda y 6 por la derecha.'" in E3, 'H03 escena: frases con los laterales')
# k2: la cadena de la demostración (suma por la izquierda) en rejilla, con δ₁ = δ₂ = ε/2 para estas f y g
for e3_ in ES1:
    d3 = min(e3_/2, e3_/2); ok(d3 > 0 and e3_/2 + e3_/2 == e3_, 'H03 k2: δ = mín{δ₁, δ₂}')
    for t3 in TS1:
        if t3 > 0:
            x3 = 2 - t3*d3; ok(2 - d3 < x3 < 2 and abs(f3(x3) - 1) < e3_/2 and abs(g3(x3) - 4) < e3_/2 and s3(x3) - (1 + 4) == (f3(x3) - 1) + (g3(x3) - 4) and abs((f3(x3) - 1) + (g3(x3) - 4)) <= abs(f3(x3) - 1) + abs(g3(x3) - 4) < e3_, 'H03 k2: cadena de la demostración (ε = %s)' % e3_)
ok(Fr('0.2')/2 == Fr('0.1') and f3(Fr('1.95')) == Fr('0.95') and abs(Fr('0.95') - 1) == Fr('0.05') < Fr('0.1') and g3(Fr('1.95')) == Fr('4.05') and abs(Fr('4.05') - 4) == Fr('0.05') and Fr('0.95') + Fr('4.05') == 5 and 0 < Fr('0.2') and 2 - Fr('0.1') < Fr('1.95') < 2, 'H03 k2: con los números de la animación')
# k3
ok(4 - 2 == 2 != 0 and Fr(1, 2) == Fr('0.5') and 2 - 2 == 0 and f3(Fr('2.1'))/(g3(Fr('2.1')) - 2) == Fr('3.1')/Fr('-0.1') == -31 and f3(Fr('2.01'))/(g3(Fr('2.01')) - 2) == Fr('3.01')/Fr('-0.01') == -301, 'H03 k3: cociente por cada lado')
lat1('H03 k3: cociente por la izquierda', lambda x: f3(x)/(g3(x) - 2), 2, -1, Fr(1, 2))
for M3 in (10, 1000, 10**6):
    for t3 in TS1:
        if t3 > 0: x3 = 2 + t3/M3; ok(abs(f3(x3)/(g3(x3) - 2)) > M3, 'H03 k3: por la derecha el cociente supera el tope %s' % M3)
for L3 in RJ[::9]:
    for a3 in RJ[::17]:
        for b3 in RJ[::19]: ok((L3 + a3 == L3 + b3) == (a3 == b3), 'H03 k3: L + M₁ ≠ L + M₂ si M₁ ≠ M₂')
# ejemplos
ok((2 - 1, 6 - 2, 2 + 1, 4 - 2) == (1, 4, 3, 2), 'H03 ej1')
ok((1 - 4, 3 - 2, 1 - 2, (-1)**2, 1**2) == (-3, 1, -1, 1, 1) and -3 != 1 and (f3(Fr('1.9')) - 2)**2 == Fr('-1.1')**2 == Fr('1.21') == (f3(Fr('2.1')) - 2)**2 == Fr('1.1')**2 and (f3(Fr('1.99')) - 2)**2 == Fr('1.0201') == (f3(Fr('2.01')) - 2)**2, 'H03 ej2')
lat1('H03 ej2 izq', lambda x: (f3(x) - 2)**2, 2, -1, 1); lat1('H03 ej2 der', lambda x: (f3(x) - 2)**2, 2, 1, 1)
ok(((-2)*3, 2*(-3), Fr(-2, 3), Fr(2, -3), -2 + 3, 2 + (-3), (-2)**2, 2**2) == (-6, -6, -Fr(2, 3), -Fr(2, 3), 1, -1, 4, 4) and 1 != -1 and 3 != 0 != -3, 'H03 ej3')
ok((3 + 0, 3 + 2, 3*0, 3*2, 0 - 2, 0*(-2), 2 - 2, 2*0) == (3, 5, 0, 6, -2, 0, 0, 0) and 3 != 5 and 0 != 6, 'H03 ej4')
# ejercicios
lat1('H03 A m izq', m3, 1, -1, 2); lat1('H03 A m der', m3, 1, 1, 4); lat1('H03 A n izq', n3, 1, -1, 2); lat1('H03 A n der', n3, 1, 1, 0)
lat1('H03 A b) izq', lambda x: m3(x) + n3(x), 1, -1, 4); lat1('H03 A b) der', lambda x: m3(x) + n3(x), 1, 1, 4); lat1('H03 A c) izq', lambda x: m3(x)*n3(x), 1, -1, 4); lat1('H03 A c) der', lambda x: m3(x)*n3(x), 1, 1, 0); lat1('H03 A d) izq', lambda x: (m3(x) - 3)**2, 1, -1, 1); lat1('H03 A d) der', lambda x: (m3(x) - 3)**2, 1, 1, 1)
ok((2*1, 3 - 1, 5 - 1, 1 - 1, 2 + 2, 4 + 0, 2*2, 4*0, 2 - 3, 4 - 3) == (2, 2, 4, 0, 4, 4, 4, 0, -1, 1) and 4 != 0 and 2 != 4 and 2 != 0, 'H03 A')
ok((5*(-1), (-5)*1, 5 + (-1), -5 + 1, Fr(5, -1), Fr(-5, 1), 5**2, 25 + (-1), (-5)**2, 25 + 1) == (-5, -5, 4, -4, -5, -5, 25, 24, 25, 26) and 4 != -4 and 24 != 26, 'H03 B')
lat1('H03 C izq', T3, 10, -1, 8000, tope=Fr(1, 100)); lat1('H03 C der', T3, 10, 1, 8000, tope=Fr(1, 100))
ok((800*10, 8000 + 0, 700*10, 7000 + 1000, 7000 + 500) == (8000, 8000, 7000, 8000, 7500) and T3(Fr('9.9')) == 800*Fr('9.9') + 0 == 7920 and T3(Fr('10.1')) == 7070 + 1000 == 8070 and 700*Fr('10.1') == 7070 and 8000 != 7500 and T3(10) == 8000 and 800 != 700 and 0 != 1000, 'H03 C')
for z3 in ['\\[\\lim_{x\\to a^{-}}[f(x)+g(x)]=\\lim_{x\\to a^{-}}f(x)+\\lim_{x\\to a^{-}}g(x)\\]', '\\(f(x)=x-1\\) si \\(x\\lt 2\\) y \\(f(x)=x+1\\) si \\(x\\ge 2\\); \\(g(x)=6-x\\) si \\(x\\le 2\\) y \\(g(x)=4-x\\) si \\(x\\gt 2\\)',
           'para todo \\(\\varepsilon\\gt 0\\) existe \\(\\delta\\gt 0\\) tal que, si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|f(x)-L|\\lt \\varepsilon\\)', 'la condición es \\(a\\lt x\\lt a+\\delta\\)', '\\(\\lim_{x\\to a}F(x)=L\\) si y solo si los dos límites laterales de \\(F\\) en \\(a\\) existen y los dos valen \\(L\\)',
           '\\(\\lim_{x\\to a^{-}}[f(x)\\pm g(x)]=L\\pm M\\)', '\\(\\lim_{x\\to a^{-}}[c\\cdot f(x)]=c\\cdot L\\)', '\\(\\lim_{x\\to a^{-}}[f(x)\\cdot g(x)]=L\\cdot M\\)', 'Si además \\(M\\ne 0\\): \\(\\lim_{x\\to a^{-}}\\dfrac{f(x)}{g(x)}=\\dfrac{L}{M}\\)', '\\(\\lim_{x\\to a^{-}}[f(x)]^{n}=L^{n}\\)', '<b>No se mezclan los lados:</b>',
           'si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|f(x)+g(x)-(L+M)|\\lt \\varepsilon\\)', 'si \\(a-\\delta_{1}\\lt x\\lt a\\), entonces \\(|f(x)-L|\\lt \\dfrac{\\varepsilon}{2}\\)', 'si \\(a-\\delta_{2}\\lt x\\lt a\\), entonces \\(|g(x)-M|\\lt \\dfrac{\\varepsilon}{2}\\)', '\\(\\delta=\\min\\{\\delta_{1},\\delta_{2}\\}\\)', '\\(a-\\delta_{1}\\le a-\\delta\\) y \\(a-\\delta_{2}\\le a-\\delta\\)',
           '\\(|(f(x)-L)+(g(x)-M)|\\le |f(x)-L|+|g(x)-M|\\)', '\\(\\lim_{x\\to a^{-}}[f(x)+g(x)]=L+M\\)', '|f(x)-1|&=|x-1-1|&&\\text{porque }f(x)=x-1\\\\ &=|x-2|&&\\text{porque }-1-1=-2\\\\ &=2-x&&', '|g(x)-4|&=|6-x-4|&&\\text{porque }g(x)=6-x\\\\ &=|2-x|&&\\text{porque }6-4=2\\\\ &=2-x&&', 'el producto no tiene límite en \\(2\\)', 'los laterales de la suma son \\(L+M_{1}\\) y \\(L+M_{2}\\), también distintos', 'tampoco hay límite en \\(2\\)',
           '\\(\\lim_{x\\to 2^{-}}[f(x)+g(x)]=1+4=5\\)', '\\(\\lim_{x\\to 2^{+}}[f(x)+g(x)]=3+2=5\\)', '\\(\\lim_{x\\to 2}[f(x)+g(x)]=5\\)', 's(x)&=(x-1)+(6-x)&&\\text{fórmulas de la izquierda}\\\\ &=x-x-1+6&&\\text{se cambia el orden}\\\\ &=0+5=5&&', 's(x)&=(x+1)+(4-x)&&\\text{fórmulas de la derecha}\\\\ &=x-x+1+4&&\\text{se cambia el orden}\\\\ &=0+5=5&&', 'la resta \\(f(x)-g(x)\\) no tiene límite en \\(2\\)', '\\(\\lim_{x\\to 2}[f(x)-2]^{2}=1\\)',
           '\\(\\lim_{x\\to 0^{-}}u(x)=-2\\) y \\(\\lim_{x\\to 0^{+}}u(x)=2\\); \\(\\lim_{x\\to 0^{-}}v(x)=3\\) y \\(\\lim_{x\\to 0^{+}}v(x)=-3\\)', '\\(\\lim_{x\\to 0}[u(x)\\cdot v(x)]=-6\\)', '\\(\\lim_{x\\to 0}\\dfrac{u(x)}{v(x)}=-\\dfrac{2}{3}\\)', '\\(\\lim_{x\\to 0}[u(x)]^{2}=4\\)',
           '\\(\\lim_{x\\to 1}P(x)=3\\); \\(\\lim_{x\\to 1^{-}}J(x)=0\\) y \\(\\lim_{x\\to 1^{+}}J(x)=2\\)', '\\(\\lim_{x\\to 1}\\{J(x)\\cdot[J(x)-2]\\}=0\\)', '\\(m(x)=2x\\) si \\(x\\lt 1\\) y \\(m(x)=5-x\\) si \\(x\\ge 1\\); \\(n(x)=3-x\\) si \\(x\\lt 1\\) y \\(n(x)=x-1\\) si \\(x\\ge 1\\)', '\\(\\lim_{x\\to 1}[m(x)+n(x)]=4\\)', '\\(\\lim_{x\\to 1}[m(x)-3]^{2}=1\\)',
           '\\(\\lim_{x\\to 3^{-}}F(x)=5\\), \\(\\lim_{x\\to 3^{+}}F(x)=-5\\), \\(\\lim_{x\\to 3^{-}}G(x)=-1\\) y \\(\\lim_{x\\to 3^{+}}G(x)=1\\)', '\\(k(x)=800\\) si \\(x\\lt 10\\) y \\(k(x)=700\\) si \\(x\\ge 10\\)', '\\(e(x)=0\\) si \\(x\\lt 10\\) y \\(e(x)=1000\\) si \\(x\\ge 10\\)', '\\(T(x)=k(x)\\cdot x+e(x)\\)', '\\(\\lim_{x\\to 10}T(x)=8000\\)']:
    ok(z3 in A3, 'H03: la hoja no trae «%s»' % z3)
ok(A3.count('no se puede usar') >= 1 and A3.count('sin demostrar') >= 2 and A3.count('no tiene límite') >= 8, 'H03: avisos')
# ───────── H03 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja y de la escena ─────────
def en3(*cads): return all(c in A3 for c in cads)
def r43(q):
    """redondeo a cuatro decimales (mitad hacia arriba; ningún caso de la hoja cae justo en la mitad), con coma"""
    q = Fr(q); e = q*10**4; assert (e*2).denominator != 1 or e.denominator == 1; n = int(e + Fr(1, 2)); return tex(Fr(n, 10**4))
X43 = [Fr('1.9'), Fr('1.99'), Fr('2.01'), Fr('2.1')]; XI3 = X43[:2]
fm3_ = lambda x, F: {('f', -1): '%s-1', ('f', 1): '%s+1', ('g', -1): '6-%s', ('g', 1): '4-%s'}[(F, -1 if x < 2 else 1)] % tex(x)
ok(en3(*[r'f(%s)&=%s=%s&&g(%s)=%s=%s' % (tex(x), fm3_(x, 'f'), tex(f3(x)), tex(x), fm3_(x, 'g'), tex(g3(x))) for x in X43]), 'H03 v002 encabezado: los valores de f y de g, uno bajo otro')
ok(en3(*[r'f(%s)+g(%s)&=%s+%s=%s&&\text{a la %s de dos}' % (tex(x), tex(x), tex(f3(x)), tex(g3(x)), tex(s3(x)), 'izquierda' if x < 2 else 'derecha') for x in X43]) and all(s3(x) == 5 for x in X43) and 1 + 4 == 5 == 3 + 2, 'H03 v002 encabezado: las cuatro sumas')
ok(en3(r'se acercan a \(1\) (\(0{,}9\); \(0{,}99\)); por la derecha, a \(3\) (\(3{,}01\); \(3{,}1\))', '<b>De dónde sale, con números.</b>', '<b>La regularidad.</b>', '<b>La fórmula.</b>', '<b>límite lateral por la izquierda</b>', '<b>límite lateral por la derecha</b>', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\) por la izquierda, de \\(f\\) de \\(x\\) más \\(g\\) de \\(x\\), es igual al límite por la izquierda de \\(f\\) de \\(x\\) más el límite por la izquierda de \\(g\\) de \\(x\\)»', 'Una <b>combinación</b> de \\(f\\) y \\(g\\) es', 'Un <b>tramo</b> es', 'Un <b>salto</b> es', 'La <b>altura</b> de una gráfica') and abs(f3(XI3[0]) - 1) > abs(f3(XI3[1]) - 1) and abs(f3(X43[3]) - 3) > abs(f3(X43[2]) - 3) and abs(g3(XI3[0]) - 4) > abs(g3(XI3[1]) - 4) and abs(g3(X43[3]) - 2) > abs(g3(X43[2]) - 2), 'H03 v002 encabezado: frases, términos explicados y acercamiento')
# k1: cómo se lee, la definición con números y las propiedades vistas en cuentas
ok(en3('<b>Palabras que se usan.</b>', '<b>Cómo se lee.</b>', 'se lee «\\(x\\) tiende a \\(a\\) por la izquierda»', 'se lee «el límite de \\(f\\) de \\(x\\), cuando \\(x\\) tiende a \\(a\\) por la izquierda, es \\(L\\)»', 'se lee «épsilon»', '«delta»', '<b>La definición con números.</b>', r'\(2-0{,}1\lt x\lt 2\), o sea, \(1{,}9\lt x\lt 2\)', '<b>De dónde salen las propiedades por un lado: las cuentas.</b>', 'se lee «\\(M\\) distinto de cero»') and 2 - Fr('0.1') == Fr('1.9') < Fr('1.95') < 2 and abs(f3(Fr('1.95')) - 1) == Fr('0.05') < Fr('0.1'), 'H03 v002 k1: lecturas y definición con números')
for t3 in TS1:
    if t3 > 0: ok(abs(f3(2 - t3*Fr('0.1')) - 1) < Fr('0.1'), 'H03 v002 k1: δ = 0,1 responde a ε = 0,1 por la izquierda (rejilla)')
ok(en3('; '.join(r'\(%s-%s=%s\)' % (tex(f3(x)), tex(g3(x)), tex(f3(x) - g3(x))) for x in XI3), r'\(1-4=-3\)') and 1 - 4 == -3, 'H03 v002 k1: restas')
ok(en3('; '.join(r'\(3\cdot %s=%s\)' % (tex(f3(x)), tex(3*f3(x))) for x in XI3), r'\(3\cdot 1=3\)'), 'H03 v002 k1: múltiplos')
ok(en3('; '.join(r'\(%s\cdot %s=%s\)' % (tex(f3(x)), tex(g3(x)), tex(p3(x))) for x in XI3), r'\(1\cdot 4=4\)'), 'H03 v002 k1: productos')
ok(en3('; '.join(r'\(\dfrac{%s}{%s}\approx %s\)' % (tex(f3(x)), tex(g3(x)), r43(f3(x)/g3(x))) for x in XI3), r'\(\dfrac{1}{4}=0{,}25\)') and Fr(1, 4) == Fr('0.25') and 4 != 0, 'H03 v002 k1: cocientes redondeados')
ok(en3('; '.join(r'\(%s^{2}=%s\)' % (tex(f3(x)), tex(f3(x)**2)) for x in XI3), r'\(1^{2}=1\)'), 'H03 v002 k1: cuadrados')
lat1('H03 v002 k1 resta', lambda x: f3(x) - g3(x), 2, -1, -3); lat1('H03 v002 k1 múltiplo', lambda x: 3*f3(x), 2, -1, 3); lat1('H03 v002 k1 cociente', lambda x: f3(x)/g3(x), 2, -1, Fr(1, 4)); lat1('H03 v002 k1 cuadrado', lambda x: f3(x)**2, 2, -1, 1)
ok(en3(r'\(1+2=3\) (el límite de \(f\) por la izquierda más el de \(g\) por la derecha) no es límite lateral de nada') and 1 + 2 == 3 != 5, 'H03 v002 k1: mezclar lados')
# k2
ok(A3.count('<b>Qué se demuestra.</b>') == 1 and A3.count('<b>Cómo funciona el método.</b>') == 1 and en3(r'\(\delta_{1}=0{,}3\) y \(\delta_{2}=0{,}1\), entonces \(\delta=0{,}1\); \(2-0{,}3=1{,}7\) y \(2-0{,}1=1{,}9\), y \(1{,}7\le 1{,}9\)', r'\(a-\delta_{1}\le a-\delta\lt x\) y \(a-\delta_{2}\le a-\delta\lt x\)') and min(Fr('0.3'), Fr('0.1')) == Fr('0.1') and 2 - Fr('0.3') == Fr('1.7') <= 2 - Fr('0.1') == Fr('1.9'), 'H03 v002 k2: qué se demuestra, método y el mínimo con números')
for a3 in RJ[::7]:
    for d13 in ES1:
        for d23 in ES1:
            d3 = min(d13, d23); ok(d3 > 0 and a3 - d13 <= a3 - d3 and a3 - d23 <= a3 - d3, 'H03 v002 k2: a − δ₁ ≤ a − δ y a − δ₂ ≤ a − δ')
for a_ in RJ[::11]:
    for b_ in RJ[::13]:
        for L_ in RJ[::17]:
            M_ = L_ - 3; ok(a_ + b_ - (L_ + M_) == a_ + b_ - L_ - M_ == a_ - L_ + b_ - M_ == (a_ - L_) + (b_ - M_), 'H03 v002 k2: la diferencia reordenada, línea por línea')
ok(en3(r'f(x)+g(x)-(L+M)&=f(x)+g(x)-L-M&&\text{se quita el paréntesis}', r'&=f(x)-L+g(x)-M&&\text{se cambia el orden}', r'&=(f(x)-L)+(g(x)-M)&&\text{se agrupa}', r'|f(x)+g(x)-(L+M)|&=|(f(x)-L)+(g(x)-M)|&&\text{paso 6}', r'&\le |f(x)-L|+|g(x)-M|&&\text{paso 7}', r'&\lt \frac{\varepsilon}{2}+\frac{\varepsilon}{2}&&\text{paso 8}', r'&=\varepsilon&&\text{dos mitades}'), 'H03 v002 k2: cadenas escritas línea por línea')
for x3 in RJ:
    if x3 < 2: ok(abs(f3(x3) - 1) == abs(x3 - 1 - 1) == abs(x3 - 2) == 2 - x3 and x3 - 2 < 0 and abs(g3(x3) - 4) == abs(6 - x3 - 4) == abs(2 - x3) == 2 - x3 and 2 - x3 > 0, 'H03 v002 k2: distancias por la izquierda, línea por línea')
    if x3 > 2: ok(abs(f3(x3) - 3) == abs(x3 + 1 - 3) == abs(x3 - 2) == x3 - 2 > 0 and abs(g3(x3) - 2) == abs(4 - x3 - 2) == abs(2 - x3) == x3 - 2 and 2 - x3 < 0 and (x3 - 2 < Fr('0.1')) == (x3 < 2 + Fr('0.1')), 'H03 v002 k2: distancias por la derecha, línea por línea')
    ok((2 - x3 < Fr('0.1')) == (2 < Fr('0.1') + x3) == (Fr('1.9') < x3), 'H03 v002 k2: el despeje 2 − x < 0,1, línea por línea')
ok(-1 - 1 == -2 and 6 - 4 == 2 and 1 - 3 == -2 and 4 - 2 == 2 and 2 - Fr('0.1') == Fr('1.9') and en3(r'2-x&\lt 0{,}1&&\text{lo que se pide}', r'2&\lt 0{,}1+x&&', r'1{,}9&\lt x&&', r'|f(x)-3|&=|x+1-3|&&\text{porque }f(x)=x+1\\ &=|x-2|&&\text{porque }1-3=-2\\ &=x-2&&', r'|g(x)-2|&=|4-x-2|&&\text{porque }g(x)=4-x\\ &=|2-x|&&\text{porque }4-2=2\\ &=x-2&&'), 'H03 v002 k2: despeje y distancias por la derecha escritos')
ok(f3(Fr('2.05')) == Fr('3.05') and abs(Fr('3.05') - 3) == Fr('0.05') < Fr('0.1') and g3(Fr('2.05')) == Fr('1.95') and abs(Fr('1.95') - 2) == Fr('0.05') and Fr('3.05') + Fr('1.95') == 5 and 2 < Fr('2.05') < 2 + Fr('0.1') and en3(r'\(f(2{,}05)=2{,}05+1=3{,}05\) y \(|3{,}05-3|=0{,}05\); \(g(2{,}05)=4-2{,}05=1{,}95\) y \(|1{,}95-2|=0{,}05\)', r'\(3{,}05+1{,}95=5\)'), 'H03 v002 k2: prueba por la derecha con x = 2,05')
for e3_ in ES1:
    for t3 in TS1:
        if t3 > 0: x3 = 2 + t3*e3_/2; ok(2 < x3 < 2 + e3_/2 and abs(f3(x3) - 3) < e3_/2 and abs(g3(x3) - 2) < e3_/2 and abs(s3(x3) - (3 + 2)) <= abs(f3(x3) - 3) + abs(g3(x3) - 2) < e3_, 'H03 v002 k2: cadena por la derecha (ε = %s)' % e3_)
# k3
ok(en3(r'\(p(1{,}99)=0{,}99\cdot 4{,}01=3{,}9699\), cerca de \(4\); \(p(2{,}01)=3{,}01\cdot 1{,}99=5{,}9899\), cerca de \(6\)', r'\(L=3\), \(M_{1}=0\) y \(M_{2}=2\) dan \(3+0=3\) y \(3+2=5\)', 'al restar \\(L\\) a los dos lados quedaría \\(M_{1}=M_{2}\\)') and p3(Fr('1.99')) == Fr('3.9699') and p3(Fr('2.01')) == Fr('5.9899'), 'H03 v002 k3: producto con valores y caso L, M₁, M₂ con números')
ok(en3(*[r'\(\dfrac{%s}{%s-2}=\dfrac{%s}{%s}\approx %s\)' % (tex(f3(x)), tex(g3(x)), tex(f3(x)), tex(g3(x) - 2), r43(f3(x)/(g3(x) - 2))) for x in XI3]) and r43(Fr('0.9')/Fr('2.1')) == '0{,}4286' and r43(Fr('0.99')/Fr('2.01')) == '0{,}4925', 'H03 v002 k3: cociente por la izquierda con valores')
for x3 in RJ:
    if x3 > 2: ok(g3(x3) - 2 == (4 - x3) - 2 == 4 - 2 - x3 == 2 - x3, 'H03 v002 k3: g(x) − 2 por la derecha, línea por línea')
ok(en3(r'g(x)-2&=(4-x)-2&&\text{porque }g(x)=4-x\\ &=4-2-x&&\text{se cambia el orden}\\ &=2-x&&\text{porque }4-2=2', *[r'numerador \(%s+1=%s\), denominador \(2-%s=%s\), cociente \(\dfrac{%s}{%s}=%s\)' % (tex(x), tex(f3(x)), tex(x), tex(2 - x), tex(f3(x)), tex(2 - x), tex(f3(x)/(g3(x) - 2))) for x in (Fr('2.1'), Fr('2.01'))], r'numerador \(3{,}001\), denominador \(-0{,}001\), cociente \(\dfrac{3{,}001}{-0{,}001}=-3001\)') and f3(Fr('2.001')) == Fr('3.001') and g3(Fr('2.001')) - 2 == Fr('-0.001') and Fr('3.001')/Fr('-0.001') == -3001, 'H03 v002 k3: cociente por la derecha, cada número con su cuenta')
# ejemplos y ejercicios
for x3 in RJ:
    ok((x3 - 1) + (6 - x3) == x3 - x3 - 1 + 6 == 0 + 5 == 5 and (x3 + 1) + (4 - x3) == x3 - x3 + 1 + 4 == 0 + 5 == 5, 'H03 v002 ej1: la suma de las fórmulas, línea por línea')
ok(en3('Identidad: el límite de \\(x\\) es \\(2\\). Constante: el límite de \\(1\\) es \\(1\\). Resta: \\(\\lim_{x\\to 2^{-}}f(x)=2-1=1\\)', 'Resta: \\(\\lim_{x\\to 2^{-}}g(x)=6-2=4\\)', 'Suma: \\(\\lim_{x\\to 2^{+}}f(x)=2+1=3\\)', 'Resta: \\(\\lim_{x\\to 2^{+}}g(x)=4-2=2\\)', 'por eso las cuatro sumas del encabezado dieron \\(5\\)'), 'H03 v002 ej1: una propiedad nombrada por cuenta')
ok(en3(r'\((-1)^{2}=(-1)\cdot(-1)=1\)', r'\(1^{2}=1\cdot 1=1\)', *[r'\(f(%s)=%s=%s\); resta: \(%s-2=%s\); cuadrado: \(%s^{2}=%s\)' % (tex(x), fm3_(x, 'f'), tex(f3(x)), tex(f3(x)), tex(f3(x) - 2), ('(%s)' if f3(x) < 2 else '%s') % tex(f3(x) - 2), tex((f3(x) - 2)**2)) for x in X43]) and (-1)*(-1) == 1 == 1*1, 'H03 v002 ej2: cada valor con su cuenta')
ok(en3(r'\((-2)^{2}=(-2)\cdot(-2)=4\)', r'\(2^{2}=2\cdot 2=4\)', r'\(5^{2}=5\cdot 5=25\)', r'\((-5)^{2}=(-5)\cdot(-5)=25\)') and (-2)*(-2) == 4 == 2*2 and 5*5 == 25 == (-5)*(-5), 'H03 v002 ej3 y B: potencias como productos')
ok(en3(r'\(800\cdot 9{,}9=7920\)', r'\(700\cdot 10{,}1=7070\)', r'\(8000-7920=80\) y \(8070-8000=70\)', r'\(700\cdot 10+500=7500\)', r'Como \(800\ne 700\) y \(0\ne 1000\)') and 800*Fr('9.9') == 7920 and 8000 - 7920 == 80 and 8070 - 8000 == 70 and 700*10 + 500 == 7500 < 8000 and Fr('9.9') < 10 <= Fr('10.1'), 'H03 v002 C: productos, distancias e interpretación')
for t3 in TS1:
    if t3 > 0: ok(700*10 + 500 < 800*(10 - t3/100) < 8000 and 8000 - 800*(10 - t3/100) < 10, 'H03 v002 C d): con saco de 500, 10 kilos cuestan menos que un poco menos de 10 kilos')
# escena: el salto queda rotulado en las dos gráficas (quinta ley)
ok("frase('salto', MF, A, 2, 6, 0, mu); frase('salto', MG, A, 3, 6, 0, mu);" in E3 and 1 < 2 < 3 and 2 < 3 < 4 and en3('la palabra «salto» lo señala en cada gráfica', '<b>Vertical punteada y la palabra «salto»:</b>'), 'H03 v002 escena: rótulo «salto» entre las dos alturas de cada gráfica')
# <<< H03

# >>> H03 ESPER
ESPER['comblat-idea'] = (7, FUN3)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '03.scene.js'].map(function(a){ return fs.readFileSync"); ok("'03.scene.js'" in NODO2, 'H03: la escena no quedó en la lista de node')
# <<< H03 ESPER

# >>> H04
# ───────── H04: compuesta cuando el límite interno no existe (interna con salto; regla de la compuesta por un lado, demostrada; se comparan los dos lados) ─────────
A4, E4 = molde('04', 'H04_limites_de_funciones_compuestas_cuando_el_limite_interno_no_existe.html', 'Límites de funciones compuestas cuando el límite interno no existe', 'comp-int', 'Propiedades de límites', ['compint-idea'], 1)
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e4 for e4 in err if e4 != 'H04 título, ruta y pie']
ok('<h1>Límites de funciones compuestas cuando el límite interno no existe</h1>' in A4 and '<span class="status">CD-L30-H04 · v002 · Pendiente de APR</span>' in A4 and 'v001' not in A4 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Límites de funciones compuestas cuando el límite interno no existe</b></li>' in A4, 'H04 v002 título, ruta y pie')
def g4(x): x = Fr(x); assert x != 1; return x + 1 if x < 1 else 4 - x    # animación: interna, laterales 2 y 3 en 1
def f4(u): u = Fr(u); return u*u - 5*u + 8                               # animación: externa; f(2) = f(3) = 2
def h4(x): return f4(g4(x))                                              # la compuesta; límite 2
def F4(u): return 2*Fr(u) - 1                                            # k3: externa con laterales distintos
def S4(u): return Fr(1) if Fr(u) < 2 else Fr(5)                          # k3: externa con salto en 2
def P4(u): u = Fr(u); return u*u + 1                                     # ejemplo 4
def Q4(u): u = Fr(u); return u**3 - 4*u                                  # ejemplo 4
def m4(x): x = Fr(x); assert x != 1; return 2*x if x < 1 else x + 3      # ejercicio A: interna
def n4(u): u = Fr(u); return u*u - 6*u + 10                              # ejercicio A: externa
def c4(x): return n4(m4(x))                                              # ejercicio A: compuesta
def T4(t): t = Fr(t); assert 0 <= t <= 6 and t != 2; return 34 + t if t < 2 else 42 - t   # ejercicio C: temperatura
def I4(T): return (Fr(T) - 38)**2                                        # ejercicio C: incomodidad
FUN4 = {'g': g4, 'f': f4, 'h': h4, 'F': F4, 'E': S4, 'P': P4, 'Q': Q4, 'm': m4, 'n': n4, 'c': c4, 'T': T4, 'I': I4}
valores('H04 hoja', mates_de(A4), FUN4, 20)
ok("function g(x){ return x < 1 ? x + 1 : 4 - x; }" in E4 and "function f(z){ return z*z - 5*z + 8; }" in E4 and 'var A = 1, GI = 2, GD = 3, K = 2;' in E4 and 'MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 5.4, 0, 5.4)' in E4, 'H04 escena: funciones, lugar, laterales y marcos')
lat1('H04 g izq', g4, 1, -1, 2); lat1('H04 g der', g4, 1, 1, 3); lat1('H04 h izq', h4, 1, -1, 2); lat1('H04 h der', h4, 1, 1, 2); llega1('H04 f en 2', f4, 2, 2); llega1('H04 f en 3', f4, 3, 2)
ok(f4(2) == 2**2 - 5*2 + 8 == 4 - 10 + 8 == 2 and f4(3) == 3**2 - 5*3 + 8 == 9 - 15 + 8 == 2 and 2 != 3 and 1 + 1 == 2 and 4 - 1 == 3, 'H04 escena: f(2) = f(3) = 2 y laterales de g')
for u4 in RJ:
    ok(f4(u4) - 2 == u4*u4 - 5*u4 + 6 == (u4 - 2)*(u4 - 3) and abs(f4(u4) - 2) == abs(u4 - 2)*abs(u4 - 3), 'H04 k2: f(u) − 2 = (u − 2)(u − 3)')
    if Fr('0.7') <= u4 <= Fr('4.3'): ok(0 <= f4(u4) <= Fr('5.4'), 'H04 escena: la parábola cabe en la ventana')
    if u4 < 1: ok(g4(u4) == u4 + 1 < 2 and S4(g4(u4)) == 1 and abs(g4(u4) - 2) == abs(u4 + 1 - 2) == 1 - u4, 'H04 k3: por la izquierda, g(x) < 2 y E(g(x)) = 1')
    if 1 < u4 < 2: ok(2 < g4(u4) < 3 and S4(g4(u4)) == 5, 'H04 k3: por la derecha, 2 < g(x) < 3 y E(g(x)) = 5')
    if u4 not in (0, 1) and 0 <= u4 <= Fr('2.2'): ok(0 <= g4(u4) <= Fr('4.4'), 'H04 escena: la interna cabe en la ventana')
for t4 in TS1:   # k2, con los números de la animación: η = 0,25 y δ = 0,25 responden a ε = 0,5
    u4 = 2 + t4*Fr(1, 4); ok(abs(u4 - 2) < Fr('0.25') and Fr('1.75') < u4 < Fr('2.25') and abs(u4 - 3) < 3 - Fr('1.75') == Fr('1.25') and abs(f4(u4) - 2) < Fr('0.25')*Fr('1.25') == Fr('0.3125') < Fr('0.5'), 'H04 k2: η = 0,25')
    if t4 > 0: x4 = 1 - t4*Fr(1, 4); ok(1 - Fr('0.25') < x4 < 1 and abs(g4(x4) - 2) < Fr('0.25') and abs(h4(x4) - 2) < Fr('0.5'), 'H04 k2: δ = 0,25')
ok(g4(Fr('0.9')) == Fr('1.9') and abs(Fr('1.9') - 2) == Fr('0.1') < Fr('0.25') and h4(Fr('0.9')) == f4(Fr('1.9')) == Fr('2.11') and abs(Fr('2.11') - 2) == Fr('0.11') < Fr('0.5'), 'H04 k2: prueba con x = 0,9')
# lectura y registro, armados con Fraction
for x4, fm4 in ((Fr('0.9'), '%s+1'), (Fr('0.99'), '%s+1'), (Fr('1.1'), '4-%s'), (Fr('1.01'), '4-%s')):
    ok('g(%s)=%s=%s' % (tex(x4), fm4 % tex(x4), tex(g4(x4))) in E4, 'H04 lectura: g(%s)' % tex(x4))
    u4 = g4(x4); ok('=%s-%s+8=%s' % (tex(u4*u4), tex(5*u4), tex(h4(x4))) in E4 and 'h(%s)=f(%s)' % (tex(x4), tex(u4)) in E4, 'H04 lectura: h(%s)' % tex(x4))
    ok('Interna: \\(g(%s)=%s=%s\\). Productos: \\(%s^{2}=%s\\) y \\(5\\cdot %s=%s\\). Externa: \\(f(%s)=%s-%s+8=%s\\).' % (tex(x4), fm4 % tex(x4), tex(u4), tex(u4), tex(u4*u4), tex(u4), tex(5*u4), tex(u4), tex(u4*u4), tex(5*u4), tex(h4(x4))) in A4, 'H04 ej1: valores en %s' % tex(x4))   # v002: interna con su cuenta y productos por separado
for u4 in (Fr('1.9'), Fr('2.9')): ok('h(%s)=f(%s)=%s^{2}-5\\\\cdot %s+8' % (tex(u4 - 1 if u4 < 2 else 4 - u4), tex(u4), tex(u4), tex(u4)) in E4, 'H04 lectura: reemplazo en f(%s)' % tex(u4))
ok('f(2)=2^{2}-5\\\\cdot 2+8=4-10+8=2' in E4 and 'f(3)=3^{2}-5\\\\cdot 3+8=9-15+8=2' in E4, 'H04 lectura: f(2) y f(3)')
ok("['R2', '\\\\lim_{x\\\\to 1^{-}}g(x)=2'" in E4 and "['R3', '\\\\lim_{x\\\\to 1^{-}}f(g(x))=f(2)=2'" in E4 and "['R4', '\\\\lim_{x\\\\to 1^{+}}g(x)=3'" in E4 and "['R5', '\\\\lim_{x\\\\to 1^{+}}f(g(x))=f(3)=2'" in E4 and "['R6', '\\\\lim_{x\\\\to 1}f(g(x))=2'" in E4 and "['F', '\\\\Longrightarrow\\\\ 2'" in E4, 'H04 registro')
ok("['R7', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.99')), tex(h4(Fr('0.99'))), tex(Fr('1.01')), tex(h4(Fr('1.01')))) in E4 and "['CM', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.9')), tex(h4(Fr('0.9'))), tex(Fr('1.1')), tex(h4(Fr('1.1')))) in E4 and "'la compuesta da %s y %s.'" % (pl(h4(Fr('0.9'))), pl(h4(Fr('1.1')))) in E4, 'H04 registro R7, rótulo de valores y frase')
ok("frase('hacia 2', MG, 0, GI," in E4 and "frase('hacia 3', MG, 0, GD," in E4 and "frase('g salta de 2 a 3'," in E4 and "lmPunto(S, MF, GI, K, C.sec, false, 3.2)" in E4 and "lmPunto(S, MF, GD, K, C.alt, false, 3.2)" in E4, 'H04 escena: frases y puntos')
# k3 y ejemplos
ok(F4(2) == 2*2 - 1 == 3 and F4(3) == 2*3 - 1 == 5 and 3 != 5 and S4(2) == 5 and 1 != 5, 'H04 k3'); lat1('H04 k3 F izq', lambda x: F4(g4(x)), 1, -1, 3); lat1('H04 k3 F der', lambda x: F4(g4(x)), 1, 1, 5)
ok((2**2, 3**2, (2 - 2)*(2 - 3), 0*(-1), (3 - 2)*(3 - 3), 1*0) == (4, 9, 0, 0, 0, 0) and 4 != 9, 'H04 ej2'); lat1('H04 ej2 izq', lambda x: (g4(x) - 2)*(g4(x) - 3), 1, -1, 0); lat1('H04 ej2 der', lambda x: (g4(x) - 2)*(g4(x) - 3), 1, 1, 0)
for u4 in RJ: ok((u4 - 2)*(u4 - 3) == u4*u4 - 5*u4 + 6 and (u4 - 38)**2 == u4*u4 - 76*u4 + 1444, 'H04: (u − 2)(u − 3) y (T − 38)² son polinomios')
ok(((-1)**2, 1**2, (-1)**3, 1**3, (-1)**2 + 3*(-1), 1 - 3, 1**2 + 3*1, 1 + 3) == (1, 1, -1, 1, -2, -2, 4, 4) and -1 != 1 and -2 != 4, 'H04 ej3')
ok(P4(-2) == (-2)**2 + 1 == 4 + 1 == 5 == P4(2) == 2**2 + 1 and Q4(-2) == (-2)**3 - 4*(-2) == -8 + 8 == 0 == Q4(2) == 2**3 - 4*2 == 8 - 8 and (-2 + 1, 2 + 1) == (-1, 3) and -1 != 3, 'H04 ej4')
# ejercicios
lat1('H04 A m izq', m4, 1, -1, 2); lat1('H04 A m der', m4, 1, 1, 4); lat1('H04 A c izq', c4, 1, -1, 2); lat1('H04 A c der', c4, 1, 1, 2)
ok(2*1 == 2 and 1 + 3 == 4 and 2 != 4 and n4(2) == 2**2 - 6*2 + 10 == 4 - 12 + 10 == 2 and n4(4) == 4**2 - 6*4 + 10 == 16 - 24 + 10 == 2 and m4(Fr('0.9')) == 2*Fr('0.9') == Fr('1.8') and n4(Fr('1.8')) == Fr('3.24') - Fr('10.8') + 10 == Fr('2.44') == c4(Fr('0.9')) and m4(Fr('1.1')) == Fr('1.1') + 3 == Fr('4.1') and n4(Fr('4.1')) == Fr('16.81') - Fr('24.6') + 10 == Fr('2.21') == c4(Fr('1.1')) and (2 + 1, 4 + 1) == (3, 5), 'H04 A')
ok(((-3)**2 - 4, 3**2 - 4, (-3)**3, 3**3, 2*(-3)**2 + (-3), 18 - 3, 2*3**2 + 3, 18 + 3, (-3)**3 - 9*(-3), -27 + 27, 3**3 - 9*3, 27 - 27) == (5, 5, -27, 27, 15, 15, 21, 21, 0, 0, 0, 0) and -27 != 27 and 15 != 21, 'H04 B')
lat1('H04 C T izq', T4, 2, -1, 36); lat1('H04 C T der', T4, 2, 1, 40); lat1('H04 C I izq', lambda t: I4(T4(t)), 2, -1, 4); lat1('H04 C I der', lambda t: I4(T4(t)), 2, 1, 4)
ok((34 + 2, 42 - 2, 40 - 36) == (36, 40, 4) and 36 != 40 and I4(36) == (36 - 38)**2 == (-2)**2 == 4 == I4(40) == (40 - 38)**2 == 2**2 and T4(Fr('1.9')) == Fr('35.9') and I4(Fr('35.9')) == Fr('-2.1')**2 == Fr('4.41') and T4(Fr('2.1')) == Fr('39.9') and I4(Fr('39.9')) == Fr('1.9')**2 == Fr('3.61') and (36 - 38, 40 - 38) == (-2, 2) and -2 != 2, 'H04 C')
for z4 in ['\\[\\lim_{x\\to a^{-}}f(g(x))=f(b)\\]', '\\(g(x)=x+1\\) si \\(x\\lt 1\\) y \\(g(x)=4-x\\) si \\(x\\gt 1\\) (sin valor en \\(1\\))', '\\(f(u)=u^{2}-5u+8\\)', '\\(h(x)=f(g(x))\\)', 'La regla pide \\(\\lim_{u\\to b}f(u)=f(b)\\)',
           '<li>\\(\\lim_{x\\to a^{-}}g(x)=b\\) (la interna tiene límite \\(b\\) por la izquierda de \\(a\\)),</li>', '<li>\\(f\\) está definida en un intervalo abierto que contiene a \\(b\\), y</li>', '<li>\\(\\lim_{u\\to b}f(u)=f(b)\\),</li>', 'entonces \\(\\lim_{x\\to a^{-}}f(g(x))=f(b)\\)',
           'si \\(f(b_{1})=f(b_{2})\\), ese número es \\(\\lim_{x\\to a}f(g(x))\\)', 'si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|f(g(x))-f(b)|\\lt \\varepsilon\\)', 'si \\(0\\lt |u-b|\\lt \\eta\\), entonces \\(|f(u)-f(b)|\\lt \\varepsilon\\)', '\\(|f(b)-f(b)|=0\\)', 'si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|g(x)-b|\\lt \\eta\\)', '\\(\\lim_{x\\to a^{-}}f(g(x))=f(b)\\).',
           '\\(f(u)-2=u^{2}-5u+6=(u-2)(u-3)\\)', '\\(|f(u)-2|=|u-2|\\cdot|u-3|\\)', '\\(|g(x)-2|=|x+1-2|=1-x\\)', '\\(F(g(x))\\) no tiene límite en \\(1\\)', '\\(E(u)=1\\) si \\(u\\lt 2\\) y \\(E(u)=5\\) si \\(u\\ge 2\\)', '\\(E(g(x))\\) no tiene límite en \\(1\\)', 'No coincide con el valor \\(E(2)=5\\)',
           '\\(\\lim_{x\\to 1^{-}}g(x)=1+1=2\\)', '\\(\\lim_{x\\to 1^{+}}g(x)=4-1=3\\)', 'el límite interno \\(\\lim_{x\\to 1}g(x)\\) no existe', '\\(\\lim_{x\\to 1^{-}}f(g(x))=2\\)', '\\(\\lim_{x\\to 1^{+}}f(g(x))=2\\)', '\\(\\lim_{x\\to 1}f(g(x))=2\\)', '\\([g(x)]^{2}\\) no tiene límite en \\(1\\)', '\\(\\lim_{x\\to 1}\\{[g(x)-2]\\cdot[g(x)-3]\\}=0\\)',
           '\\(j(x)=-1\\) si \\(x\\lt 0\\) y \\(j(x)=1\\) si \\(x\\gt 0\\)', '\\(\\lim_{x\\to 0}[j(x)]^{2}=1\\)', '\\(\\lim_{x\\to 3^{-}}G(x)=-2\\) y \\(\\lim_{x\\to 3^{+}}G(x)=2\\)', '\\(P(u)=u^{2}+1\\)', '\\(\\lim_{x\\to 3}P(G(x))=5\\)', '\\(Q(u)=u^{3}-4u\\)', '\\(\\lim_{x\\to 3}Q(G(x))=0\\)',
           '\\(m(x)=2x\\) si \\(x\\lt 1\\) y \\(m(x)=x+3\\) si \\(x\\gt 1\\)', '\\(n(u)=u^{2}-6u+10\\)', '\\(c(x)=n(m(x))\\)', '\\(\\lim_{x\\to 1}n(m(x))=2\\)', '\\(\\lim_{x\\to 0^{-}}w(x)=-3\\) y \\(\\lim_{x\\to 0^{+}}w(x)=3\\)',
           '\\(T(t)=34+t\\) si \\(0\\le t\\lt 2\\) y \\(T(t)=42-t\\) si \\(2\\lt t\\le 6\\)', '\\(I(T)=(T-38)^{2}\\)', 'el límite de la incomodidad en \\(t=2\\) es \\(4\\)', 'la temperatura no tiene límite en \\(t=2\\)']:
    ok(z4 in A4, 'H04: la hoja no trae «%s»' % z4)
ok(A4.count('no se puede usar') >= 1 and A4.count('sin demostrar') >= 2 and A4.count('no tiene límite') >= 8 and A4.count('criterio de los laterales') >= 3, 'H04: avisos')
# ───────── H04 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja ─────────
def en4(*cads): return all(c in A4 for c in cads)
X44 = [Fr('0.9'), Fr('0.99'), Fr('1.01'), Fr('1.1')]
ok(en4(*[r'g(%s)&=%s=%s&&' % (tex(x), ('%s+1' if x < 1 else '4-%s') % tex(x), tex(g4(x))) for x in X44]), 'H04 v002 encabezado: los cuatro valores de la interna')
ok(en4(*[r'f(%s)&=%s^{2}-5\cdot %s+8=%s-%s+8=%s&&\text{distancia a dos: }%s=%s' % (tex(g4(x)), tex(g4(x)), tex(g4(x)), tex(g4(x)**2), tex(5*g4(x)), tex(h4(x)), ('%s-2' % tex(h4(x))) if h4(x) > 2 else ('2-%s' % tex(h4(x))), tex(abs(h4(x) - 2))) for x in X44]), 'H04 v002 encabezado: los cuatro valores de la compuesta y su distancia a 2')
ok(all(g4(x)**2 - 5*g4(x) + 8 == h4(x) for x in X44) and [abs(h4(x) - 2) for x in X44] == [Fr('0.11'), Fr('0.0101'), Fr('0.0099'), Fr('0.09')] and abs(h4(X44[1]) - 2) < abs(h4(X44[0]) - 2) and abs(h4(X44[2]) - 2) < abs(h4(X44[3]) - 2) and abs(g4(X44[1]) - 2) < abs(g4(X44[0]) - 2) and abs(g4(X44[2]) - 3) < abs(g4(X44[3]) - 3), 'H04 v002 encabezado: más cerca de 1, más cerca de 2 (y la interna, de 2 y de 3)')
ok(en4('<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La fórmula.</b>', 'se lee «\\(f\\) de \\(g\\) de \\(x\\)»', 'se lee «el límite de \\(g\\) de \\(x\\), cuando \\(x\\) tiende a \\(a\\)»', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\) por la izquierda, de \\(f\\) de \\(g\\) de \\(x\\), es \\(f\\) de \\(b\\)»', 'quiere decir «por la izquierda»', 'es «por la derecha»', 'función <b>interna</b>', 'función <b>externa</b>', '<b>límite interno</b>', '<b>salta</b>', r'\(f(2)=2^{2}-5\cdot 2+8=4-10+8=2\)', r'\(f(3)=3^{2}-5\cdot 3+8=9-15+8=2\)', 'cuatro valores cercanos no prueban un límite'), 'H04 v002 encabezado: origen, regularidad, fórmula y lecturas')
ok(en4('La <b>altura</b> de una gráfica', 'Un <b>círculo vacío</b> (un «hueco»)', 'Los <b>límites laterales</b> de \\(g\\) en \\(1\\)', 'rótulo «hacia 2»', 'rótulo «hacia 3»', 'rótulo «g salta de 2 a 3»', 'rotulada \\(u=g(x)\\)', 'rotulada \\(y=f(u)\\)', r'\(h(0{,}9)=2{,}11\) y \(h(1{,}1)=1{,}91\)') and "['CG', 'u=g(x)'" in E4 and "['CF', 'y=f(u)'" in E4, 'H04 v002 cómo leerla: cada cosa nombrada tiene su rótulo en la escena')
ok(en4('<b>Reglas de cálculo usadas sin demostrar:</b>', r'\(|p\cdot q|=|p|\cdot|q|\)', r'\(|p|\lt c\) dice lo mismo que \(-c\lt p\lt c\)', r'si \(0\le p\lt c\) y \(0\le q\lt d\), entonces \(p\cdot q\lt c\cdot d\)'), 'H04 v002 aviso: reglas de cálculo declaradas')
for p_ in RJ:
    for q_ in RJ[::7]:
        ok(abs(p_*q_) == abs(p_)*abs(q_), 'H04 v002 aviso: |p·q| = |p|·|q|')
        for c_ in (Fr(1, 2), Fr(3)):
            ok((abs(p_) < c_) == (-c_ < p_ < c_), 'H04 v002 aviso: |p| < c ⟺ −c < p < c')
            if 0 <= p_ < c_ and 0 <= q_ < 2: ok(p_*q_ < c_*2, 'H04 v002 aviso: producto de desigualdades entre no negativos')
# k1: palabras, un valor de la compuesta y el otro orden
ok(en4('<b>Palabras que se usan.</b>', 'El <b>dominio</b>', 'Un <b>polinomio</b>', 'Un <b>intervalo abierto</b>', 'Un <b>límite lateral</b>', '<b>Un valor de la compuesta, paso a paso.</b>', r'\(g(0{,}5)=0{,}5+1=1{,}5\)', r'\(1{,}5^{2}=2{,}25\) y \(5\cdot 1{,}5=7{,}5\)', r'\(f(1{,}5)=2{,}25-7{,}5+8=2{,}75\)', r'\(h(0{,}5)=f(1{,}5)=2{,}75\)', r'\(0{,}5^{2}=0{,}25\) y \(5\cdot 0{,}5=2{,}5\)', r'\(f(0{,}5)=0{,}25-2{,}5+8=5{,}75\)', r'\(4-5{,}75=-1{,}75\)', r'\(2{,}75\ne -1{,}75\)', '<b>La regla, vista con los números del encabezado.</b>', r'En el encabezado: \(b_{1}=2\) y \(b_{2}=3\)', r'En el encabezado: \(f(2)=2\) y \(f(3)=2\), iguales'), 'H04 v002 k1: frases')
ok(Fr('0.5') < 1 and g4(Fr('0.5')) == Fr('0.5') + 1 == Fr('1.5') and Fr('1.5')**2 == Fr('2.25') and 5*Fr('1.5') == Fr('7.5') and f4(Fr('1.5')) == Fr('2.25') - Fr('7.5') + 8 == Fr('2.75') == h4(Fr('0.5')) and Fr('0.5')**2 == Fr('0.25') and 5*Fr('0.5') == Fr('2.5') and f4(Fr('0.5')) == Fr('0.25') - Fr('2.5') + 8 == Fr('5.75') > 1 and g4(f4(Fr('0.5'))) == 4 - Fr('5.75') == Fr('-1.75') != Fr('2.75'), 'H04 v002 k1: h(0,5) = 2,75 y, en el otro orden, −1,75')
# k2: qué se demuestra, método, símbolos y los pasos con números, línea por línea
ok(A4.count('<b>Qué se demuestra.</b>') == 1 and A4.count('<b>Cómo funciona el método.</b>') == 1 and en4('<b>Cómo se leen los símbolos.</b>', 'se lee «épsilon»', 'se lee «eta»', 'se lee «delta»', r'\(|1{,}9-2|=0{,}1\)', '<b>Los mismos pasos con los números de la animación</b>', r'f(u)-2&=u^{2}-5u+8-2&&\text{se reemplaza }f(u)', r'&=u^{2}-5u+6&&\text{porque }8-2=6', r'&=(u-2)(u-3)&&\text{se factoriza}', r'\((u-2)(u-3)=u^{2}-3u-2u+6=u^{2}-5u+6\)', r'|u-2|&\lt 0{,}25&&', r'-0{,}25\lt u-2&\lt 0{,}25&&', r'1{,}75\lt u&\lt 2{,}25&&\text{se suma }2', r'-1{,}25\lt u-3&\lt -0{,}75&&\text{se resta }3', r'\(-0{,}25+2=1{,}75\); \(0{,}25+2=2{,}25\); \(1{,}75-3=-1{,}25\); \(2{,}25-3=-0{,}75\)', r'|g(x)-2|&=|x+1-2|&&\text{se reemplaza }g(x)', r'&=|x-1|&&\text{porque }1-2=-1', r'&=1-x&&\text{porque }x-1\text{ es negativo}', r'\(1-0{,}25=0{,}75\)', r'\(0{,}75\lt 0{,}9\lt 1\)'), 'H04 v002 k2: frases y cadenas')
ok(8 - 2 == 6 and 1 - 2 == -1 and Fr('-0.25') + 2 == Fr('1.75') and Fr('0.25') + 2 == Fr('2.25') and Fr('1.75') - 3 == Fr('-1.25') and Fr('2.25') - 3 == Fr('-0.75') and 1 - Fr('0.25') == Fr('0.75') < Fr('0.9') < 1 and abs(Fr('1.9') - 2) == Fr('0.1'), 'H04 v002 k2: cuentas sueltas')
for u4 in RJ:
    ok(f4(u4) - 2 == u4*u4 - 5*u4 + 8 - 2 == u4*u4 - 5*u4 + 6 == (u4 - 2)*(u4 - 3) == u4*u4 - 3*u4 - 2*u4 + 6, 'H04 v002 k2: f(u) − 2, línea por línea, y la factorización multiplicada')
    ok((abs(u4 - 2) < Fr('0.25')) == (Fr('-0.25') < u4 - 2 < Fr('0.25')) == (Fr('1.75') < u4 < Fr('2.25')) == (Fr('-1.25') < u4 - 3 < Fr('-0.75')), 'H04 v002 k2: las cuatro líneas de la desigualdad dicen lo mismo')
    if Fr('-1.25') < u4 - 3 < Fr('-0.75'): ok(abs(u4 - 3) < Fr('1.25'), 'H04 v002 k2: |u − 3| < 1,25')
    if u4 < 1: ok(abs(g4(u4) - 2) == abs(u4 + 1 - 2) == abs(u4 - 1) == 1 - u4 and u4 - 1 < 0 and ((1 - u4 < Fr('0.25')) == (u4 > 1 - Fr('0.25'))), 'H04 v002 k2: |g(x) − 2|, línea por línea, y el despeje de x')
# k3: valores de F y de E a cada lado, y las desigualdades hechas
ok(en4(r'\(F(2)=2\cdot 2-1=4-1=3\)', r'\(F(3)=2\cdot 3-1=6-1=5\)', r'\(F(1{,}9)=2\cdot 1{,}9-1=3{,}8-1=2{,}8\)', r'\(F(2{,}9)=2\cdot 2{,}9-1=5{,}8-1=4{,}8\)', r'\(x+1\lt 2\)', r'\(g(0{,}9)=1{,}9\) y \(E(1{,}9)=1\); \(g(0{,}99)=1{,}99\) y \(E(1{,}99)=1\)', r'1\lt x&\lt 2&&', r'-2\lt -x&\lt -1&&\text{se multiplica por }-1', r'2\lt 4-x&\lt 3&&\text{se suma }4', r'\(-2+4=2\) y \(-1+4=3\)', r'\(g(1{,}1)=2{,}9\) y \(E(2{,}9)=5\); \(g(1{,}01)=2{,}99\) y \(E(2{,}99)=5\)', r'sus laterales en \(2\) son \(1\) y \(5\), distintos'), 'H04 v002 k3: frases')
ok(2*2 == 4 and 4 - 1 == 3 and 2*3 == 6 and 6 - 1 == 5 and 2*Fr('1.9') == Fr('3.8') and Fr('3.8') - 1 == Fr('2.8') == F4(g4(Fr('0.9'))) and 2*Fr('2.9') == Fr('5.8') and Fr('5.8') - 1 == Fr('4.8') == F4(g4(Fr('1.1'))) and -2 + 4 == 2 and -1 + 4 == 3 and all(S4(g4(x)) == (1 if x < 1 else 5) for x in X44) and abs(Fr('2.8') - 3) < 1 and abs(Fr('4.8') - 5) < 1, 'H04 v002 k3: cuentas')
for x4 in RJ:
    ok((1 < x4 < 2) == (-2 < -x4 < -1) == (2 < 4 - x4 < 3) and ((x4 < 1) == (x4 + 1 < 2)), 'H04 v002 k3: las desigualdades, línea por línea')
    if x4 < 2: ok(S4(x4) == 1, 'H04 v002 k3: E vale 1 a la izquierda de 2')
    else: ok(S4(x4) == 5, 'H04 v002 k3: E vale 5 desde 2 a la derecha')
# ejemplos
ok(en4(r'Productos: \(2^{2}=4\) y \(5\cdot 2=10\). Entonces \(f(2)=2^{2}-5\cdot 2+8=4-10+8=-6+8=2\)', r'Productos: \(3^{2}=9\) y \(5\cdot 3=15\). Entonces \(f(3)=3^{2}-5\cdot 3+8=9-15+8=-6+8=2\)', r'\(2{,}11\); \(2{,}0101\); \(1{,}9901\) y \(1{,}91\)') and 4 - 10 == -6 == 9 - 15 and -6 + 8 == 2 and [h4(x) for x in (X44[0], X44[1], X44[2], X44[3])] == [Fr('2.11'), Fr('2.0101'), Fr('1.9901'), Fr('1.91')], 'H04 v002 ej1')
ok(en4(r'\([g(0{,}9)]^{2}=1{,}9^{2}=3{,}61\), cerca de \(4\); \([g(1{,}1)]^{2}=2{,}9^{2}=8{,}41\), cerca de \(9\)', r'\((u-2)(u-3)=u^{2}-3u-2u+6=u^{2}-5u+6\): es un polinomio', r'da \(4\) y \(9\), distintos', r'da \(0\) y \(0\), iguales') and g4(Fr('0.9'))**2 == Fr('3.61') and g4(Fr('1.1'))**2 == Fr('8.41') and abs(Fr('3.61') - 4) < 1 and abs(Fr('8.41') - 9) < 1, 'H04 v002 ej2')
ok(en4(r'\((-1)^{2}=(-1)\cdot(-1)=1\)', r'\(1^{2}=1\cdot 1=1\)', r'\((-1)^{3}=(-1)\cdot(-1)\cdot(-1)=1\cdot(-1)=-1\)', r'\(1^{3}=1\cdot 1\cdot 1=1\)', r'como \(-1\ne 1\), el límite interno en \(0\) no existe') and (-1)*(-1) == 1 and (-1)*(-1)*(-1) == 1*(-1) == -1 and 1*1*1 == 1, 'H04 v002 ej3')
ok(en4(r'\((-2)^{2}=(-2)\cdot(-2)=4\)', r'\((-2)^{3}=(-2)\cdot(-2)\cdot(-2)=4\cdot(-2)=-8\)', r'\(4\cdot(-2)=-8\)', r'\(Q(-2)=(-2)^{3}-4\cdot(-2)=-8-(-8)=-8+8=0\)', r'\(2^{3}=2\cdot 2\cdot 2=8\)', r'\(b_{1}=-2\) y \(b_{2}=2\)') and (-2)*(-2) == 4 and (-2)*(-2)*(-2) == 4*(-2) == -8 and -8 - (-8) == -8 + 8 == 0 and 2*2*2 == 8 == 4*2, 'H04 v002 ej4')
# ejercicios
ok(en4(r'Productos: \(2^{2}=4\) y \(6\cdot 2=12\). Entonces \(n(2)=2^{2}-6\cdot 2+10=4-12+10=-8+10=2\)', r'Productos: \(4^{2}=16\) y \(6\cdot 4=24\). Entonces \(n(4)=4^{2}-6\cdot 4+10=16-24+10=-8+10=2\)', r'Productos: \(1{,}8^{2}=3{,}24\) y \(6\cdot 1{,}8=10{,}8\)', r'Productos: \(4{,}1^{2}=16{,}81\) y \(6\cdot 4{,}1=24{,}6\)') and 4 - 12 == -8 == 16 - 24 and -8 + 10 == 2 and Fr('1.8')**2 == Fr('3.24') and 6*Fr('1.8') == Fr('10.8') and Fr('4.1')**2 == Fr('16.81') and 6*Fr('4.1') == Fr('24.6'), 'H04 v002 A')
ok(en4(r'\((-3)^{2}=(-3)\cdot(-3)=9\)', r'\((-3)^{3}=(-3)\cdot(-3)\cdot(-3)=9\cdot(-3)=-27\)', r'\(3^{3}=3\cdot 3\cdot 3=9\cdot 3=27\)', r'\(2\cdot(-3)^{2}+(-3)=2\cdot 9-3=18-3=15\)', r'\(2\cdot 3^{2}+3=2\cdot 9+3=18+3=21\)', r'\((-3)^{3}-9\cdot(-3)=-27-(-27)=-27+27=0\)', r'\(9\cdot(-3)=-27\)', r'\(9\cdot 3=27\)') and (-3)*(-3) == 9 and 9*(-3) == -27 and 3*3*3 == 9*3 == 27 and 2*9 == 18 and -27 - (-27) == 0, 'H04 v002 B')
ok(en4(r'\((T-38)^{2}=T^{2}-76T+1444\)', r'\(4{,}41-4=0{,}41\) y \(4-3{,}61=0{,}39\)') and Fr('4.41') - 4 == Fr('0.41') and 4 - Fr('3.61') == Fr('0.39') and 2*38 == 76 and 38*38 == 1444, 'H04 v002 C')
ok(A4.count('criterio de los laterales') >= 7 and A4.count('\\begin{aligned}') == A4.count('\\end{aligned}') == 6, 'H04 v002: bloques aligned y criterio de los laterales nombrado')
ok(not re.search(r'\\\\\(', A4), 'H04 v002: salto de línea pegado a un paréntesis')
# <<< H04

# >>> H04 ESPER
ESPER['compint-idea'] = (7, FUN4)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '04.scene.js'].map(function(a){ return fs.readFileSync"); ok("'04.scene.js'" in NODO2, 'H04: la escena no quedó en la lista de node')
# <<< H04 ESPER

# >>> H05
# ───────── H05: compuesta cuando el límite externo no existe (externa con salto en b; la interna llega a b por arriba; regla demostrada con ε–η–δ; decide el lado por el que llega la interna) ─────────
A5, E5 = molde('05', 'H05_limites_de_funciones_compuestas_cuando_el_limite_externo_no_existe.html', 'Límites de funciones compuestas cuando el límite externo no existe', 'comp-ext', 'Propiedades de límites', ['compext-idea'], 1)
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e5_ for e5_ in err if e5_ != 'H05 título, ruta y pie']
ok('<h1>Límites de funciones compuestas cuando el límite externo no existe</h1>' in A5 and '<span class="status">CD-L30-H05 · v002 · Pendiente de APR</span>' in A5 and 'v001' not in A5 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Límites de funciones compuestas cuando el límite externo no existe</b></li>' in A5, 'H05 v002 título, ruta y pie')
def g5(x): x = Fr(x); return 2 + (x - 1)**2                              # animación: interna; límite 2 en 1 y g(x) > 2 si x ≠ 1
def f5(u): u = Fr(u); return u - 1 if u <= 2 else 5 - u                  # animación: externa; laterales 1 y 3 en 2; f(2) = 1
def h5(x): return f5(g5(x))                                              # la compuesta; límite 3; h(1) = 1
def S5(u): u = Fr(u); return Fr(5) if u == 2 else (Fr(1) if u < 2 else Fr(3))   # k3: externa E, con E(2) = 5
def r5(x): return 2 - Fr(x)**2                                           # ejemplo 2: interna que llega por abajo (a = 0)
def s5(x): return Fr(x) + 1                                              # ejemplo 3 y k3: interna que cruza 2 en a = 1
def m5(x): return 3 + (Fr(x) - 2)**2                                     # ejercicio A: interna
def n5(u): u = Fr(u); return 2*u if u < 3 else u + 1                     # ejercicio A: externa; laterales 6 y 4 en 3
def c5(x): return n5(m5(x))                                              # ejercicio A: compuesta
def T5(t): t = Fr(t); assert 2 <= t <= 4; return 24 + (t - 3)**2         # ejercicio C: temperatura
def P5(T): T = Fr(T); return Fr(0) if T <= 24 else 800 + 100*(T - 24)    # ejercicio C: potencia; laterales 0 y 800 en 24
FUN5 = {'g': g5, 'f': f5, 'h': h5, 'E': S5, 'r': r5, 's': s5, 'm': m5, 'n': n5, 'c': c5, 'T': T5, 'P': P5, 'V': lambda u: {Fr(5): Fr(7)}[Fr(u)]}
valores('H05 hoja', mates_de(A5), FUN5, 24)
ok("function g(x){ return 2 + (x - 1)*(x - 1); }" in E5 and "function f(z){ return z <= 2 ? z - 1 : 5 - z; }" in E5 and 'var A = 1, B = 2, KI = 1, KD = 3;' in E5 and 'MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 4.4)' in E5, 'H05 escena: funciones, lugar, límite interno, laterales de la externa y marcos')
# la interna: límite 2 en 1, siempre por arriba; la externa: laterales 1 y 3 en 2; la compuesta: límite 3 por los dos lados y h(1) = 1
llega1('H05 g', g5, 1, 2); lat1('H05 f izq', f5, 2, -1, 1); lat1('H05 f der', f5, 2, 1, 3); lat1('H05 h izq', h5, 1, -1, 3); lat1('H05 h der', h5, 1, 1, 3); llega1('H05 h', h5, 1, 3)
ok(g5(1) == 2 + (1 - 1)**2 == 2 + 0 == 2 and (2 - 1, 5 - 2) == (1, 3) and 1 != 3 and f5(2) == 1 and h5(1) == f5(g5(1)) == f5(2) == 2 - 1 == 1 != 3, 'H05 escena: límite de g, laterales de f y valor en 1')
for x5 in RJ:
    ok(g5(x5) - 2 == (x5 - 1)**2 and abs(g5(x5) - 2) == (x5 - 1)**2 and ((x5 - 1)**2 > 0) == (x5 != 1) and (g5(x5) > 2) == (x5 != 1), 'H05: g(x) − 2 = (x − 1)², positivo si x ≠ 1')
    if x5 != 1: ok(h5(x5) == 5 - g5(x5) == 5 - 2 - (x5 - 1)**2 == 3 - (x5 - 1)**2, 'H05 ej1: h(x) = 3 − (x − 1)² fuera de 1')
    if x5 > 2: ok(f5(x5) == 5 - x5 and abs(f5(x5) - 3) == abs(5 - x5 - 3) == abs(2 - x5) == x5 - 2, 'H05 k2: |f(u) − 3| = u − 2 si u > 2')
    if x5 < 2: ok(f5(x5) == x5 - 1 and abs(f5(x5) - 1) == 2 - x5, 'H05: |f(u) − 1| = 2 − u si u < 2')
    if 0 <= x5 <= Fr('2.2'): ok(0 <= g5(x5) <= Fr('4.4'), 'H05 escena: la parábola de g cabe en la ventana')
    if 1 <= x5 <= Fr('4.4'): ok(0 <= f5(x5) <= Fr('4.4'), 'H05 escena: los tramos de f caben en la ventana')
    # k3 y ejemplos 2 y 3: lado por el que llega cada interna
    ok(s5(x5) - 2 == x5 - 1 and (s5(x5) < 2) == (x5 < 1) and (s5(x5) > 2) == (x5 > 1) and r5(x5) - 2 == -x5**2 and (r5(x5) < 2) == (x5 != 0), 'H05: signos de s(x) − 2 y de r(x) − 2')
    ok((2 - (x5 - 1)**2 < 2) == (x5 != 1) and S5(Fr(2)) == 5 and (S5(x5) == 1) == (x5 < 2) and (S5(x5) == 3) == (x5 > 2), 'H05 k3: interna por abajo y externa E')
    ok(m5(x5) - 3 == (x5 - 2)**2 and (m5(x5) > 3) == (x5 != 2) and ((x5 + 1 < 3) == (x5 < 2)) and ((x5 + 1 > 3) == (x5 > 2)) and ((27 - x5 > 24) == (x5 < 3)) and ((27 - x5 < 24) == (x5 > 3)), 'H05 A y C: lados por los que llegan las internas')
    if 2 <= x5 <= 4: ok(T5(x5) - 24 == (x5 - 3)**2 and (T5(x5) > 24) == (x5 != 3), 'H05 C: T(t) − 24 = (t − 3)²')
# k2: la cadena de la demostración en rejilla, con las funciones de la animación: η = ε responde para f por la derecha; δ₁ = mín{1, η} responde para g; r cualquiera
for e5 in ES1:
    n5_ = e5                                                                   # η = ε: si 2 < u < 2 + η, |f(u) − 3| = u − 2 < ε
    d15 = min(Fr(1), n5_)                                                      # δ₁ = mín{1, η}: si |x − 1| < δ₁, (x − 1)² ≤ |x − 1| < η
    ok(d15 > 0 and d15 <= 1 and d15 <= n5_, 'H05 k2: δ₁ para η = %s' % n5_)
    for r5_ in (Fr(1, 2), Fr(1), Fr(5)):
        d5 = min(d15, r5_); ok(0 < d5 <= d15 and d5 <= r5_, 'H05 k2: δ = mín{δ₁, r}')
        for t5 in TS1:
            x5 = 1 + t5*d5; u5 = g5(x5)
            ok(0 < abs(x5 - 1) < d5 and abs(u5 - 2) < n5_ and u5 < 2 + n5_ and u5 > 2 and 2 < u5 < 2 + n5_ and abs(f5(u5) - 3) < e5 and abs(h5(x5) - 3) < e5, 'H05 k2: la cadena de la demostración en x = %s (ε = %s)' % (x5, e5))
            u5 = 2 + abs(t5)*n5_; ok(2 < u5 < 2 + n5_ and abs(f5(u5) - 3) < e5, 'H05 k2: η responde a ε = %s' % e5)
for t5 in TS1:   # con los números de la hoja: ε = 0,5, η = 0,5, δ₁ = 0,7, r = 1, δ = 0,7
    u5 = 2 + abs(t5)*Fr('0.5'); ok(2 < u5 < Fr('2.5') and abs(f5(u5) - 3) == u5 - 2 < Fr('0.5'), 'H05 k2: η = 0,5')
    x5 = 1 + t5*Fr('0.7'); ok(abs(x5 - 1) < Fr('0.7') and (x5 - 1)**2 < Fr('0.7')**2 == Fr('0.49') < Fr('0.5') and abs(g5(x5) - 2) < Fr('0.5') and g5(x5) > 2 and abs(h5(x5) - 3) < Fr('0.5'), 'H05 k2: δ₁ = 0,7')
ok(min(Fr('0.7'), Fr(1)) == Fr('0.7') and abs(Fr('0.5') - 1) == Fr('0.5') < Fr('0.7') and g5(Fr('0.5')) == 2 + Fr('-0.5')**2 == 2 + Fr('0.25') == Fr('2.25') and 2 < Fr('2.25') < Fr('2.5') and h5(Fr('0.5')) == f5(Fr('2.25')) == 5 - Fr('2.25') == Fr('2.75') and abs(Fr('2.75') - 3) == Fr('0.25') < Fr('0.5'), 'H05 k2: prueba con x = 0,5')
for s5_ in RJ[::7]:
    for t5 in RJ[::5]:
        if 0 <= s5_ < t5: ok(s5_**2 < t5**2, 'H05 aviso: si 0 ≤ s < t, entonces s² < t²')
    ok((s5_**2 > 0) == (s5_ != 0), 'H05 aviso: el cuadrado de un número distinto de 0 es positivo')
# lectura y registro, armados con Fraction
for u5, fm5 in ((Fr('1.9'), '%s-1'), (Fr('1.99'), '%s-1'), (Fr('2.1'), '5-%s'), (Fr('2.01'), '5-%s')):
    ok('f(%s)=%s=%s' % (tex(u5), fm5 % tex(u5), tex(f5(u5))) in E5, 'H05 lectura: f(%s)' % tex(u5))
for x5 in (Fr('0.9'), Fr('0.99'), Fr('1.1'), Fr('1.01')):
    d5 = x5 - 1; b5 = ('(%s)' if d5 < 0 else '%s') % tex(d5)
    ok('g(%s)=2+(%s-1)^{2}' % (tex(x5), tex(x5)) in E5 and '=2+%s^{2}=2+%s=%s' % (b5, tex(d5*d5), tex(g5(x5))) in E5, 'H05 lectura: g(%s)' % tex(x5))
    u5 = g5(x5); ok('h(%s)=f(%s)' % (tex(x5), tex(u5)) in E5 and '=5-%s=%s' % (tex(u5), tex(h5(x5))) in E5, 'H05 lectura: h(%s)' % tex(x5))
ok('h(0{,}9)=f(2{,}01)=5-2{,}01=2{,}99' in E5 and 'h(1{,}1)=f(2{,}01)=5-2{,}01=2{,}99' in E5 and 'h(1)=f(2)=2-1=1' in E5 and '\\\\lim_{u\\\\to 2^{-}}f(u)=2-1=1' in E5 and '\\\\lim_{u\\\\to 2^{+}}f(u)=5-2=3' in E5 and E5.count('g(x)=2+(1-1)^{2}=2+0=2') == 2 and '\\\\lim_{x\\\\to 1}f(g(x))=\\\\lim_{u\\\\to 2^{+}}f(u)=3' in E5, 'H05 lectura: laterales, límite de g, valor en 1 y conclusión')
ok("['R2', '\\\\lim_{u\\\\to 2^{-}}f(u)=1;\\\\ \\\\ \\\\lim_{u\\\\to 2^{+}}f(u)=3'" in E5 and "['R3', '\\\\lim_{x\\\\to 1^{-}}g(x)=2;\\\\ \\\\ g(x)\\\\gt 2'" in E5 and "['R4', '\\\\lim_{x\\\\to 1^{+}}g(x)=2;\\\\ \\\\ g(x)\\\\gt 2'" in E5 and "['R5', '\\\\text{se usa }\\\\lim_{u\\\\to 2^{+}}f(u)=3'" in E5 and "['R6', '\\\\lim_{x\\\\to 1}f(g(x))=3'" in E5 and "['F', '\\\\Longrightarrow\\\\ 3'" in E5 and "['LS', '\\\\lim_{x\\\\to 1}f(g(x))=3'" in E5 and "['GS', 'g(x)\\\\gt 2\\\\text{ si }x\\\\ne 1'" in E5, 'H05 registro')
ok("['R7', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.99')), tex(h5(Fr('0.99'))), tex(Fr('1.01')), tex(h5(Fr('1.01')))) in E5 and "['CM', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.9')), tex(h5(Fr('0.9'))), tex(Fr('1.1')), tex(h5(Fr('1.1')))) in E5 and "'la compuesta da %s y %s.'" % (pl(h5(Fr('0.9'))), pl(h5(Fr('1.1')))) in E5, 'H05 registro R7, rótulo de valores y frase')
ok("frase('hacia 1', MF, B, KI," in E5 and "frase('hacia 3', MF, B, KD," in E5 and "frase('hacia 2', MG, 0, B," in E5 and "prNota(S, 'f salta en 2: de 1 a 3'," in E5 and "prNota(S, 'a f solo le llegan valores mayores que 2'," in E5 and "lmPunto(S, MF, B, KI, C.ink, false, 3.2)" in E5 and "lmPunto(S, MF, B, KD, C.ink, true, 3.2)" in E5 and "lmPunto(S, MG, A, B, C.ink, false, 3)" in E5 and "prAnillo(S, MF, B, KD, C.rise, 7)" in E5, 'H05 escena: frases, notas y puntos (lleno en (2, 1), hueco en (2, 3))')
ok(all(len(z5) <= 50 for z5 in re.findall(r"prNota\(S, '([^']*)'", E5)), 'H05 escena: notas de 50 caracteres o menos')
# k3 y ejemplos
lat1('H05 k3 cruza izq', lambda x: f5(s5(x)), 1, -1, 1); lat1('H05 k3 cruza der', lambda x: f5(s5(x)), 1, 1, 3); llega1('H05 k3 por abajo', lambda x: f5(2 - (Fr(x) - 1)**2), 1, 1)
ok(S5(Fr(2)) == 5 and 5 not in (1, 3), 'H05 k3: la compuesta con la interna constante vale E(2) = 5, ninguno de los laterales')
ok(r5(0) == 2 - 0**2 == 2 - 0 == 2 and r5(Fr('0.1')) == 2 - Fr('0.1')**2 == 2 - Fr('0.01') == Fr('1.99') == r5(Fr('-0.1')) and f5(Fr('1.99')) == Fr('1.99') - 1 == Fr('0.99'), 'H05 ej2'); llega1('H05 ej2', lambda x: f5(r5(x)), 0, 1)
ok(s5(1) == 1 + 1 == 2 and s5(Fr('0.9')) == Fr('0.9') + 1 == Fr('1.9') and f5(Fr('1.9')) == Fr('1.9') - 1 == Fr('0.9') and s5(Fr('1.1')) == Fr('1.1') + 1 == Fr('2.1') and f5(Fr('2.1')) == 5 - Fr('2.1') == Fr('2.9') and 1 != 3, 'H05 ej3')
ok(g5(Fr('0.9')) == 2 + Fr('-0.1')**2 == 2 + Fr('0.01') == Fr('2.01') == g5(Fr('1.1')) == 2 + Fr('0.1')**2 and f5(Fr('2.01')) == 5 - Fr('2.01') == Fr('2.99') and 3 - (1 - 1)**2 == 3 - 0 == 3, 'H05 ej1')
ok(-2 != 6 and (-1)*0 == 0 and 0**2 == 0, 'H05 ej4')
for y5 in RJ:
    if y5 > 0: ok(-y5 < 0 and y5**2 > 0, 'H05 ej4: si G(x) > 0, entonces −G(x) < 0 y [G(x)]² > 0')
# ejercicios
llega1('H05 A m', m5, 2, 3); lat1('H05 A n izq', n5, 3, -1, 6); lat1('H05 A n der', n5, 3, 1, 4); llega1('H05 A c', c5, 2, 4); lat1('H05 A e) izq', lambda x: n5(Fr(x) + 1), 2, -1, 6); lat1('H05 A e) der', lambda x: n5(Fr(x) + 1), 2, 1, 4)
ok(m5(2) == 3 + (2 - 2)**2 == 3 + 0 == 3 and (2*3, 3 + 1, 2 + 1) == (6, 4, 3) and 6 != 4 and m5(Fr('1.9')) == 3 + Fr('-0.1')**2 == 3 + Fr('0.01') == Fr('3.01') == m5(Fr('2.1')) == 3 + Fr('0.1')**2 and n5(Fr('3.01')) == Fr('3.01') + 1 == Fr('4.01') == c5(Fr('1.9')) == c5(Fr('2.1')), 'H05 A')
ok(-1 != 2 and 7 not in (-1, 2), 'H05 B')
llega1('H05 C T', T5, 3, 24); lat1('H05 C P izq', P5, 24, -1, 0); lat1('H05 C P der', P5, 24, 1, 800); llega1('H05 C P(T)', lambda t: P5(T5(t)), 3, 800)
lat1('H05 C f) izq', lambda t: P5(27 - Fr(t)), 3, -1, 800); lat1('H05 C f) der', lambda t: P5(27 - Fr(t)), 3, 1, 0)
ok(T5(3) == 24 + (3 - 3)**2 == 24 + 0 == 24 and 800 + 100*(24 - 24) == 800 + 100*0 == 800 and 0 != 800 and T5(Fr('2.9')) == 24 + Fr('-0.1')**2 == 24 + Fr('0.01') == Fr('24.01') == T5(Fr('3.1')) == 24 + Fr('0.1')**2 and P5(Fr('24.01')) == 800 + 100*Fr('0.01') == 800 + 1 == 801 and P5(24) == 0 and 27 - 3 == 24, 'H05 C')
for z5 in ['\\[\\lim_{x\\to a}f(g(x))=\\lim_{u\\to b^{+}}f(u)\\]', '\\(g(x)=2+(x-1)^{2}\\)', '\\(f(u)=u-1\\) si \\(u\\le 2\\) y \\(f(u)=5-u\\) si \\(u\\gt 2\\)', '\\(h(x)=f(g(x))\\)',
           'si \\(b\\lt u\\lt b+\\eta\\), entonces \\(|f(u)-K|\\lt \\varepsilon\\)', '<li>\\(\\lim_{x\\to a}g(x)=b\\) (la interna tiene límite \\(b\\) en \\(a\\)),</li>', '<li>\\(g(x)\\gt b\\) para todo \\(x\\ne a\\) de un intervalo abierto que contiene a \\(a\\), y</li>', '<li>\\(\\lim_{u\\to b^{+}}f(u)=K\\),</li>', '<p>entonces \\(\\lim_{x\\to a}f(g(x))=K\\).</p>',
           'se tiene \\(g(x)\\lt b\\) y en la condición 3 se tiene \\(\\lim_{u\\to b^{-}}f(u)=K\\)', '\\(\\lim_{x\\to a^{-}}f(g(x))=K\\)', 'donde \\(g(x)\\gt b\\), el lateral de la compuesta es \\(K_{2}\\); donde \\(g(x)\\lt b\\), es \\(K_{1}\\)',
           'si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|f(g(x))-K|\\lt \\varepsilon\\)', 'si \\(0\\lt |x-a|\\lt \\delta_{1}\\), entonces \\(|g(x)-b|\\lt \\eta\\)', 'si \\(0\\lt |x-a|\\lt r\\), se tiene \\(g(x)\\gt b\\)', '\\(\\delta=\\min\\{\\delta_{1},r\\}\\)', '\\(g(x)\\lt b+\\eta\\)', 'cumple \\(b\\lt u\\lt b+\\eta\\)', '\\(\\lim_{x\\to a}f(g(x))=K\\).</li>',
           '|f(u)-3|&=|5-u-3|&&\\text{se reemplaza }f(u)\\text{ por }5-u\\\\ &=|2-u|&&\\text{porque }5-3=2\\\\ &=u-2&&', '|g(x)-2|&=|2+(x-1)^{2}-2|&&\\text{se reemplaza }g(x)\\\\ &=|(x-1)^{2}|&&\\text{porque }2-2=0\\\\ &=(x-1)^{2}&&', '\\(0{,}7^{2}=0{,}49\\)', 'sirve \\(\\eta=0{,}5\\)', 'sirve \\(\\delta_{1}=0{,}7\\)', 'El menor es \\(\\delta=0{,}7\\)',
           '\\(f(x+1)\\) no tiene límite en \\(1\\)', '\\(E(u)=1\\) si \\(u\\lt 2\\), \\(E(2)=5\\) y \\(E(u)=3\\) si \\(u\\gt 2\\)', 'su límite en \\(1\\) es \\(5\\)', 'la regla no se puede usar', 'el límite de la compuesta en \\(1\\) es el lateral izquierdo de \\(f\\): \\(1\\)',
           '\\(\\lim_{x\\to 1}g(x)=2+(1-1)^{2}=2+0=2\\)', '\\(\\lim_{u\\to 2^{-}}f(u)=2-1=1\\)', '\\(\\lim_{u\\to 2^{+}}f(u)=5-2=3\\)', 'el límite externo \\(\\lim_{u\\to 2}f(u)\\) no existe', '\\(\\lim_{x\\to 1}f(g(x))=3\\)', 'h(x)&=5-g(x)&&', '&=5-2-(x-1)^{2}&&', '&=3-(x-1)^{2}&&\\text{porque }5-2=3', '\\(h(1)=f(g(1))=f(2)=2-1=1\\)',
           '\\(r(x)=2-x^{2}\\)', '\\(\\lim_{x\\to 0}f(r(x))=1\\)', '\\(s(x)=x+1\\)', '\\(\\lim_{x\\to 1^{-}}f(s(x))=1\\)', '\\(\\lim_{x\\to 1^{+}}f(s(x))=3\\)', '\\(f(s(x))\\) no tiene límite en \\(1\\)',
           '\\(\\lim_{u\\to 0^{-}}F(u)=-2\\) y \\(\\lim_{u\\to 0^{+}}F(u)=6\\)', '\\(\\lim_{x\\to 4}F(G(x))=6\\)', '\\(\\lim_{x\\to 4}F(-G(x))=-2\\)', '\\(\\lim_{x\\to 4}F([G(x)]^{2})=6\\)', 'no se puede decidir si \\(F(H(x))\\) tiene límite en \\(4\\)',
           '\\(m(x)=3+(x-2)^{2}\\)', '\\(n(u)=2u\\) si \\(u\\lt 3\\) y \\(n(u)=u+1\\) si \\(u\\ge 3\\)', '\\(c(x)=n(m(x))\\)', '\\(\\lim_{x\\to 2}n(m(x))=4\\)', '\\(n(x+1)\\) no tiene límite en \\(2\\)',
           '\\(\\lim_{u\\to 5^{-}}V(u)=-1\\), \\(\\lim_{u\\to 5^{+}}V(u)=2\\) y \\(V(5)=7\\)', 'a) La interna llega por arriba: se usa el lateral derecho. El límite es \\(2\\).', 'b) La interna llega por abajo: se usa el lateral izquierdo. El límite es \\(-1\\).', 'd) No se puede decidir', 'su límite es \\(7\\)',
           '\\(T(t)=24+(t-3)^{2}\\), para \\(2\\le t\\le 4\\)', '\\(P(T)=0\\) si \\(T\\le 24\\) y \\(P(T)=800+100\\cdot(T-24)\\) si \\(T\\gt 24\\)', 'el límite de \\(P(T(t))\\) en \\(t=3\\) es \\(800\\) watts', 'la potencia no tiene límite en \\(t=3\\)']:
    ok(z5 in A5, 'H05: la hoja no trae «%s»' % z5)
ok(A5.count('no se puede usar') >= 3 and A5.count('sin demostrar') >= 3 and A5.count('no tiene límite') >= 5 and A5.count('criterio de los laterales') >= 3 and A5.count('no se puede decidir') + A5.count('No se puede decidir') >= 2, 'H05: avisos')
# ───────── H05 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja (la escena no se tocó) ─────────
def en5(*cads): return all(c in A5 for c in cads)
X45 = [Fr('0.9'), Fr('0.99'), Fr('1.01'), Fr('1.1')]; LADO5 = ['izquierda de }1', 'izquierda, más cerca', 'derecha, más cerca', 'derecha de }1']
pb5 = lambda d: ('(%s)' if d < 0 else '%s') % tex(d)
# encabezado: los cuatro valores de g, los cuatro de f, los cuatro de la compuesta con su distancia a 3
ok(en5(*[r'g(%s)&=2+(%s-1)^{2}=2+%s^{2}=2+%s=%s&&\text{%s' % (tex(x), tex(x), pb5(x - 1), tex((x - 1)**2), tex(g5(x)), l) for x, l in zip(X45, LADO5)]) and all(g5(x) == 2 + (x - 1)**2 and g5(x) > 2 for x in X45), 'H05 v002 encabezado: los valores de g, uno bajo otro, todos mayores que 2')
ok(en5(r'f(1{,}9)&=1{,}9-1=0{,}9&&', r'f(1{,}99)&=1{,}99-1=0{,}99&&', r'f(2{,}01)&=5-2{,}01=2{,}99&&', r'f(2{,}1)&=5-2{,}1=2{,}9&&') and f5(Fr('1.9')) == Fr('1.9') - 1 == Fr('0.9') and f5(Fr('1.99')) == Fr('1.99') - 1 == Fr('0.99') and f5(Fr('2.01')) == 5 - Fr('2.01') == Fr('2.99') and f5(Fr('2.1')) == 5 - Fr('2.1') == Fr('2.9'), 'H05 v002 encabezado: los valores de f a cada lado de 2')
ok(en5(*[r'f(g(%s))&=f(%s)=5-%s=%s&&\text{distancia a tres: }3-%s=%s' % (tex(x), tex(g5(x)), tex(g5(x)), tex(h5(x)), tex(h5(x)), tex(3 - h5(x))) for x in X45]) and all(h5(x) == f5(g5(x)) == 5 - g5(x) and 0 < 3 - h5(x) for x in X45), 'H05 v002 encabezado: los valores de la compuesta y su distancia a 3')
ok(all(3 - h5(x) == g5(x) - 2 == (x - 1)**2 for x in X45 + [z for z in RJ if z != 1]) and en5(r'en \(x=0{,}9\), \(2{,}01-2=0{,}01\); en \(x=0{,}99\), \(2{,}0001-2=0{,}0001\)') and g5(Fr('0.9')) - 2 == Fr('0.01') == 3 - h5(Fr('0.9')) and g5(Fr('0.99')) - 2 == Fr('0.0001') == 3 - h5(Fr('0.99')), 'H05 v002 encabezado: lo que le falta a la compuesta es lo que le sobra a g')
ok(all(abs(g5(X45[i]) - 2) > abs(g5(X45[j]) - 2) and abs(h5(X45[i]) - 3) > abs(h5(X45[j]) - 3) for i, j in ((0, 1), (3, 2))) and all(g5(x) > 2 and f5(g5(x)) == 5 - g5(x) != g5(x) - 1 for x in X45), 'H05 v002 encabezado: más cerca de 1, más cerca de 2 y de 3; solo se usa la fórmula de la derecha')
ok(en5('<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La fórmula.</b>', 'se lee «\\(g\\) de \\(x\\)»', 'se lee «\\(f\\) de \\(g\\) de \\(x\\)»', 'se lee «el límite de \\(f\\) de \\(u\\), cuando \\(u\\) tiende a \\(b\\) por la derecha»', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\), de \\(f\\) de \\(g\\) de \\(x\\), es igual al límite de \\(f\\) de \\(u\\) cuando \\(u\\) tiende a \\(b\\) por la derecha»', 'Si \\(g\\) tiene límite \\(b\\) en \\(a\\) y \\(g(x)\\) es mayor que \\(b\\) para todo \\(x\\ne a\\) cercano a \\(a\\)', 'Vale siempre que ese límite lateral de \\(f\\) <b>exista</b>', 'La externa <b>salta</b> en \\(b\\) cuando sus dos límites laterales en \\(b\\) son números distintos') and A5.count('<p class="lede">') == 3, 'H05 v002 encabezado: tres párrafos, hipótesis de la fórmula y cómo se lee')
# k1: palabras, lectura de símbolos y el lateral derecho con números (ε = 0,1, η = 0,1, u = 2,04)
ok(en5('<b>Palabras que se usan.</b>', '<b>Cómo se leen los símbolos.</b>', 'se lee «épsilon»', 'se lee «eta»', 'se lee «delta»', '<b>Con números.</b>', '<b>La regla, vista en la animación.</b>', 'los números entre \\(0\\) y \\(2\\) forman un intervalo abierto que contiene a \\(1\\)') and 0 < 1 < 2, 'H05 v002 k1: palabras, símbolos y regla vista en la animación')
ok(en5(r'\(f(2{,}04)=5-2{,}04=2{,}96\)', r'\(|2{,}96-3|=0{,}04\), menor que \(0{,}1\)') and 2 < Fr('2.04') < Fr('2.1') and f5(Fr('2.04')) == 5 - Fr('2.04') == Fr('2.96') and abs(Fr('2.96') - 3) == Fr('0.04') < Fr('0.1'), 'H05 v002 k1: prueba con u = 2,04')
for t5 in TS1:
    u5 = 2 + abs(t5)*Fr('0.1'); ok(2 < u5 < Fr('2.1') and abs(f5(u5) - 3) == u5 - 2 < Fr('0.1'), 'H05 v002 k1: η = 0,1 responde a ε = 0,1')
# k2: qué se demuestra, método, y las cadenas línea por línea
ok(A5.count('<b>Qué se demuestra.</b>') == 1 and A5.count('<b>Cómo funciona el método.</b>') == 1 and en5(r'g(x)-b&\lt \eta&&\text{un número es menor o igual que su valor absoluto}', r'g(x)&\lt b+\eta&&\text{se suma }b\text{ a los dos lados}', 'ese \\(x\\) cumple a la vez \\(0\\lt |x-a|\\lt \\delta_{1}\\) y \\(0\\lt |x-a|\\lt r\\)', 'en el paso 8 no se sabría', '<b>Los mismos pasos, con los números de la animación</b>', 'Entre \\(0{,}7\\) y \\(1\\), el menor es \\(0{,}7\\)'), 'H05 v002 k2: qué se demuestra, método y pasos 6 a 8')
ok(A5[A5.index('card k2'):A5.index('card k3')].count('<li>') == 10 + 5, 'H05 v002 k2: diez pasos de la demostración y cinco con números')
for y5 in RJ:
    for b5 in RJ[::9]:
        ok(y5 - b5 <= abs(y5 - b5), 'H05 v002 k2: un número es menor o igual que su valor absoluto')
        for n5_ in (Fr(1, 10), Fr(1), Fr(7, 2)):
            if abs(y5 - b5) < n5_: ok(y5 - b5 < n5_ and y5 < b5 + n5_, 'H05 v002 k2: de |g(x) − b| < η sale g(x) < b + η')
    if y5 > 2: ok(5 - y5 - 3 == 2 - y5 < 0 and abs(2 - y5) == -(2 - y5) == y5 - 2, 'H05 v002 k2: |5 − u − 3| = |2 − u| = u − 2, línea por línea')
    ok(2 + (y5 - 1)**2 - 2 == (y5 - 1)**2 >= 0 and abs((y5 - 1)**2) == (y5 - 1)**2, 'H05 v002 k2: |g(x) − 2|, línea por línea')
    if y5 < 0: ok(abs(y5) == -y5 > 0, 'H05 v002 aviso: valor absoluto de un negativo')
    if y5 > 0: ok(-y5 < 0, 'H05 v002 aviso: el opuesto de un positivo es negativo')
ok(5 - 3 == 2 and 2 - 2 == 0 and min(Fr('0.7'), 1) == Fr('0.7'), 'H05 v002 k2: 5 − 3, 2 − 2 y el menor')
# k3: valores nuevos
ok(en5(r'\(2-(-0{,}1)^{2}=2-0{,}01=1{,}99\)', r'\(f(1{,}99)=1{,}99-1=0{,}99\)', r'\(2-0{,}1^{2}=2-0{,}01=1{,}99\)', 'en \\(x=0{,}9\\) vale \\(5\\) y en \\(x=1{,}1\\) vale \\(5\\)') and all(2 - (x - 1)**2 == Fr('1.99') and f5(2 - (x - 1)**2) == Fr('0.99') and S5(Fr(2)) == 5 for x in (Fr('0.9'), Fr('1.1'))) and Fr('-0.1')**2 == Fr('0.1')**2 == Fr('0.01'), 'H05 v002 k3: la interna por abajo y la constante, con números')
# ejemplos y ejercicios: los signos, línea por línea
ok(en5(r'g(x)-2&=2+(x-1)^{2}-2&&\text{se reemplaza }g(x)', r'&=(x-1)^{2}&&\text{porque }2-2=0', 'Se suma \\(2\\) a los dos lados: \\(g(x)\\gt 2\\) para todo \\(x\\ne 1\\)', r'\(r(x)-2=2-x^{2}-2=-x^{2}\)', r'\(s(x)-2=x+1-2=x-1\)', r'\(m(x)-3=3+(x-2)^{2}-3=(x-2)^{2}\)', r'\(T(t)-24=24+(t-3)^{2}-24=(t-3)^{2}\)', r'\(27-t-24=3-t\)', 'Aquí \\(a=4\\) y \\(b=0\\)', 'Datos comunes: \\(a=0\\), \\(b=5\\)', 'el opuesto de un número positivo es negativo'), 'H05 v002 ejemplos y ejercicios: frases de los signos')
for x5 in RJ:
    ok(g5(x5) - 2 == 2 + (x5 - 1)**2 - 2 == (x5 - 1)**2 and ((x5 - 1 != 0) == (x5 != 1)) and r5(x5) - 2 == 2 - x5**2 - 2 == -x5**2 and ((-x5**2 < 0) == (x5 != 0)) and s5(x5) - 2 == x5 + 1 - 2 == x5 - 1 and m5(x5) - 3 == 3 + (x5 - 2)**2 - 3 == (x5 - 2)**2, 'H05 v002: g − 2, r − 2, s − 2 y m − 3, línea por línea')
    ok(27 - x5 - 24 == 3 - x5 and ((3 - x5 > 0) == (x5 < 3) == (27 - x5 > 24)) and ((3 - x5 < 0) == (x5 > 3) == (27 - x5 < 24)), 'H05 v002 C f): el signo de 27 − t − 24 = 3 − t')
    if 2 <= x5 <= 4: ok(T5(x5) - 24 == 24 + (x5 - 3)**2 - 24 == (x5 - 3)**2, 'H05 v002 C: T(t) − 24, línea por línea')
    if x5 != 1: ok(h5(x5) == 5 - g5(x5) == 5 - 2 - (x5 - 1)**2 == 3 - (x5 - 1)**2, 'H05 v002 ej1: h(x), línea por línea')
ok(1 - 2 == -1 and 3 - 3 == 0 and 24 - 24 == 0 and 27 - 24 == 3 and 5 - 2 == 3, 'H05 v002: restas nombradas en los «porque»')
ok(en5('que un número es menor o igual que su valor absoluto', 'que el valor absoluto de un número negativo es su opuesto', 'que el opuesto de un número positivo es negativo', 'que sumar un mismo número a los dos lados de una desigualdad la mantiene'), 'H05 v002: avisos de rigor nuevos declarados')
ok(not re.search(r'\\\\[()]', A5), 'H05 v002: un salto de línea de aligned pegado a un paréntesis')
# <<< H05

# >>> H05 ESPER
ESPER['compext-idea'] = (7, FUN5)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '05.scene.js'].map(function(a){ return fs.readFileSync"); ok("'05.scene.js'" in NODO2, 'H05: la escena no quedó en la lista de node')
# <<< H05 ESPER

# >>> H06
# ───────── H06: teorema de la compuesta cuando sus condiciones no se cumplen (externa con límite en b distinto de f(b); regla del hueco, demostrada; la interna toca o no toca b) ─────────
A6, E6 = molde('06', 'H06_teorema_para_los_limites_de_funciones_compuestas_cuando_las_condiciones_no_se_cumplen.html', 'Teorema para los límites de funciones compuestas: cuando las condiciones no se cumplen', 'comp-teo', 'Propiedades de límites', ['compteo-idea'], 1)
# pie v002 (revisión general, 25-nov): molde(), que está fuera de este bloque, todavía espera v001; aquí se cambia esa comprobación por la misma con v002
err[:] = [e6 for e6 in err if e6 != 'H06 título, ruta y pie']
ok('<h1>Teorema para los límites de funciones compuestas: cuando las condiciones no se cumplen</h1>' in A6 and '<span class="status">CD-L30-H06 · v002 · Pendiente de APR</span>' in A6 and 'v001' not in A6 and '<li>Cursos</li>\n      <li>Cálculo diferencial 1ª parte</li>\n      <li>Propiedades de límites</li>\n      <li><b>Teorema para los límites de funciones compuestas: cuando las condiciones no se cumplen</b></li>' in A6, 'H06 v002 título, ruta y pie')
def g6(x): return Fr(x) + 1                                              # animación: interna; límite 2 en 1; vale 2 solo en x = 1
def f6(u): u = Fr(u); return Fr(5) if u == 2 else u + 1                  # animación: externa; límite 3 en 2 y valor f(2) = 5
def h6(x): return f6(g6(x))                                              # la compuesta; límite 3; h(1) = 5
def c6(x): return Fr(2)                                                  # k3: interna constante
def s6(x): x = Fr(x); return Fr(2) if x < 1 else x + 1                   # k3: interna que toca el 2 solo por la izquierda
def P6(u): u = Fr(u); return u*u - 3*u + 1                               # ejemplo 2: externa polinómica
def q6(x): return 3*Fr(x) - 1                                            # ejemplo 3: interna
def F6(u): u = Fr(u); assert u != 2; return (u*u - 4)/(u - 2)            # ejemplo 3: externa sin valor en 2
def r6(u): assert Fr(u) == 1; return Fr(2)                               # ejemplo 4: de r solo se conoce r(1) = 2
def m6(x): return Fr(x) + 2                                              # ejercicio A: interna
def n6(u): u = Fr(u); return Fr(1) if u == 3 else 2*u - 1                # ejercicio A: externa
def k6(x): return n6(m6(x))                                              # ejercicio A: compuesta
def E6_(u): assert Fr(u) == 2; return Fr(7)                              # ejercicio B: de E solo se conoce E(2) = 7
def D6(u): assert Fr(u) == 2; return Fr(9)                               # ejercicio B: de D solo se conoce D(2) = 9
def w6(x): return 50*Fr(x)                                               # ejercicio C: gramos
def p6(u): u = Fr(u); return Fr(2000) if u == 200 else 12*u              # ejercicio C: precio
FUN6 = {'g': g6, 'f': f6, 'h': h6, 'c': c6, 's': s6, 'P': P6, 'q': q6, 'F': F6, 'r': r6, 'm': m6, 'n': n6, 'k': k6, 'E': E6_, 'D': D6, 'w': w6, 'p': p6}
valores('H06 hoja', mates_de(A6), FUN6, 30)
ok("function g(x){ return x + 1; }" in E6 and "function fl(z){ return z + 1; }" in E6 and "function f(z){ return z === 2 ? 5 : z + 1; }" in E6 and 'var A = 1, B = 2, K = 3, FB = 5;' in E6 and 'MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.8)' in E6, 'H06 escena: funciones, lugar, límites, valor y marcos')
# 1) la animación: límite interno 2, límite de la externa 3, valor 5, compuesta con límite 3; interna constante con límite 5
llega1('H06 g en 1', g6, 1, 2); llega1('H06 f en 2', f6, 2, 3); llega1('H06 h en 1', h6, 1, 3); llega1('H06 f(c(x))', lambda x: f6(c6(x)), 1, 5)
ok(g6(1) == 1 + 1 == 2 and 2 + 1 == 3 and f6(2) == 5 != 3 and h6(1) == f6(2) == 5 and 1 + 2 == 3, 'H06 escena: b = 2, K = 3, f(2) = 5 y h(1) = 5')
for x6 in RJ:
    ok((g6(x6) == 2) == (x6 == 1), 'H06: g(x) = 2 solo si x = 1')
    if x6 != 1: ok(h6(x6) == (x6 + 1) + 1 == x6 + 2 and abs(h6(x6) - 3) == abs(x6 - 1) and abs(g6(x6) - 2) == abs(x6 + 1 - 2) == abs(x6 - 1), 'H06: h(x) = x + 2 fuera de 1')
    if x6 != 2: ok(abs(f6(x6) - 3) == abs(x6 + 1 - 3) == abs(x6 - 2), 'H06 k2: |f(u) − 3| = |u − 2| fuera de 2')
    ok(f6(c6(x6)) == f6(2) == 5, 'H06 k3: f(c(x)) = 5 en todo x')
    if 0 <= x6 <= Fr('2.2'): ok(0 <= g6(x6) <= Fr('4.4'), 'H06 escena: la interna cabe en la ventana')
    if Fr('0.3') <= x6 <= Fr('3.9'): ok(0 <= x6 + 1 <= Fr('5.8'), 'H06 escena: la recta de la externa cabe en la ventana')
ok(0 < 2 < Fr('4.4') and 0 < 3 < 5 < Fr('5.8') and 0 < 1 < Fr('2.2'), 'H06 escena: el hueco, el punto lleno y el lugar caben en los marcos')
# 2) k2: las dos demostraciones en rejilla, con las funciones de la animación
for e6 in ES1:
    eta6 = e6; d16 = eta6; d26 = Fr(1); d6 = min(d16, d26)     # η = ε (|f(u) − 3| = |u − 2|); δ₁ = η (|g(x) − 2| = |x − 1|); g(x) ≠ 2 para todo x ≠ 1: sirve cualquier δ₂
    ok(eta6 > 0 and 0 < d6 <= d16 and d6 <= d26, 'H06 k2: η, δ₁, δ₂ y δ = mín{δ₁, δ₂}')
    for t6 in TS1:
        u6 = 2 + t6*eta6; ok(0 < abs(u6 - 2) < eta6 and abs(f6(u6) - 3) < e6, 'H06 k2 regla del hueco, paso 2 (ε = %s)' % e6)
        x6 = 1 + t6*d6; ok(0 < abs(x6 - 1) < d6 and abs(g6(x6) - 2) < eta6 and g6(x6) != 2 and 0 < abs(g6(x6) - 2) < eta6 and abs(h6(x6) - 3) < e6, 'H06 k2 regla del hueco, pasos 3 a 6 (ε = %s)' % e6)
        # teorema, con la externa polinómica del ejemplo 2 en b = 2: |P(u) − P(2)| = |u − 2|·|u − 1| < η·2 ≤ ε si η = mín{1, ε/2}
        etaP = min(Fr(1), e6/2); u6 = 2 + t6*etaP; x6 = 1 + t6*etaP
        ok(abs(P6(u6) - P6(2)) == abs(u6 - 2)*abs(u6 - 1) < e6 and abs(g6(x6) - 2) < etaP and abs(P6(g6(x6)) - P6(2)) < e6, 'H06 k2 teorema, pasos 2 a 5 (ε = %s)' % e6)
    ok(abs(P6(2) - P6(2)) == 0 < e6, 'H06 k2 teorema, paso 3: u = b')
    if e6 <= 2: ok(not abs(f6(2) - 3) < e6, 'H06 k2: en u = 2 la externa de la animación no queda cerca de 3')
ok(abs(Fr('1.1') - 1) == Fr('0.1') < Fr('0.5') and g6(Fr('1.1')) == Fr('1.1') + 1 == Fr('2.1') and 0 < abs(Fr('2.1') - 2) == Fr('0.1') < Fr('0.5') and h6(Fr('1.1')) == f6(Fr('2.1')) == Fr('3.1') and abs(Fr('3.1') - 3) == Fr('0.1') < Fr('0.5') and abs(f6(2) - 3) == abs(5 - 3) == 2 and not 2 < Fr('0.5'), 'H06 k2: prueba con ε = 0,5 y x = 1,1')
# 3) lectura y registro, armados con Fraction
for x6 in (Fr('0.9'), Fr('1.1')):
    ok('g(%s)=%s+1=%s' % (tex(x6), tex(x6), tex(g6(x6))) in E6, 'H06 lectura: g(%s)' % tex(x6))
    u6 = g6(x6); ok("'f(%s)=%s+1=%s'" % (tex(u6), tex(u6), tex(f6(u6))) in E6, 'H06 lectura: f(%s)' % tex(u6))
for x6 in (Fr('0.9'), Fr('1.1'), Fr('0.99'), Fr('1.01')):
    u6 = g6(x6); ok('h(%s)=f(%s)=%s+1=%s' % (tex(x6), tex(u6), tex(u6), tex(h6(x6))) in E6, 'H06 lectura: h(%s)' % tex(x6))
    ok(g6(x6) == x6 + 1 == u6 and '\\(g(%s)=%s+1=%s\\) y \\(f(%s)=%s+1=%s\\)' % (tex(x6), tex(x6), tex(u6), tex(u6), tex(u6), tex(h6(x6))) in A6, 'H06 ej1: valores en %s' % tex(x6))   # v002: g con su cuenta
ok('\\\\lim_{x\\\\to 1}g(x)=1+1=2' in E6 and '\\\\lim_{u\\\\to 2}f(u)=2+1=3' in E6 and '\\\\text{límite: }3\\\\text{; valor: }f(2)=5' in E6 and '3\\\\ne 5\\\\text{: no se cumple}' in E6 and 'h(x)=(x+1)+1=x+2' in E6 and '\\\\lim_{x\\\\to 1}f(g(x))=1+2=3' in E6 and 'f(c(x))=f(2)=5\\\\text{ para todo }x' in E6 and '\\\\lim_{x\\\\to 1}f(c(x))=5' in E6 and '\\\\text{externa: }f(u)=u+1\\\\text{ si }u\\\\ne 2\\\\text{, y }f(2)=5' in E6, 'H06 lectura: límites, condición 2, fórmula de la compuesta e interna constante')
ok("['R1', 'h(x)=f(g(x));\\\\ \\\\ a=1'" in E6 and "['R2', '\\\\lim_{x\\\\to 1}g(x)=2'" in E6 and "['R3', '\\\\lim_{u\\\\to 2}f(u)=3'" in E6 and "['R4', 'f(2)=5\\\\ne 3'" in E6 and "['R6', '\\\\lim_{x\\\\to 1}f(g(x))=3'" in E6 and "['R7', 'c(x)=2:\\\\ \\\\ \\\\lim_{x\\\\to 1}f(c(x))=5'" in E6 and "['F', '\\\\Longrightarrow\\\\ 3'" in E6, 'H06 registro')
ok("['R5', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.99')), tex(h6(Fr('0.99'))), tex(Fr('1.01')), tex(h6(Fr('1.01')))) in E6 and "['CM', 'h(%s)=%s;\\\\ \\\\ h(%s)=%s'" % (tex(Fr('0.9')), tex(h6(Fr('0.9'))), tex(Fr('1.1')), tex(h6(Fr('1.1')))) in E6, 'H06 registro R5 y rótulo de valores')
ok("['LG', '\\\\lim_{x\\\\to 1}g(x)=2'" in E6 and "['LF', '\\\\lim_{u\\\\to 2}f(u)=3'" in E6 and "['VF', 'f(2)=5'" in E6 and "['LS', '\\\\lim_{x\\\\to 1}f(g(x))=3'" in E6 and "['CC', '\\\\lim_{x\\\\to 1}f(c(x))=5'" in E6, 'H06 escena: rótulos de límites y valor')
ok("frase('hacia 2', MG, 0, B," in E6 and "frase('hacia 3', MF, 0, K," in E6 and "frase('solo aquí g vale 2'," in E6 and "lmPunto(S, MF, B, K, C.ink, true, 3.2); lmPunto(S, MF, B, FB, C.ink, false, 3.2)" in E6 and "prAnillo(S, MF, B, K, C.rise, 7)" in E6 and "lmSeg(S, MG, 0, B, 2.2*a, B, C.tan, 1.8, 0)" in E6, 'H06 escena: frases, hueco, punto lleno, anillo y recta constante')
ok("'Condición 2: el valor de f en 2 es 5, no 3.'" in E6 and "'su límite es 3, y no el valor 5.'" in E6 and "'siempre entra 2 en f, y el límite es 5.'" in E6 and "'lo que entrega g va hacia 2. Se cumple.'" in E6 and "'van hacia 3: ese es su límite (el hueco).'" in E6, 'H06 lienzo: frases con los números')
# 4) k3: la interna que toca el 2 por un solo lado
lat1('H06 k3 s izq', s6, 1, -1, 2); lat1('H06 k3 s der', s6, 1, 1, 2); lat1('H06 k3 f(s) izq', lambda x: f6(s6(x)), 1, -1, 5); lat1('H06 k3 f(s) der', lambda x: f6(s6(x)), 1, 1, 3)
for x6 in RJ:
    if x6 < 1: ok(s6(x6) == 2 and f6(s6(x6)) == f6(2) == 5, 'H06 k3: por la izquierda, f(s(x)) = 5')
    if x6 > 1: ok(s6(x6) == x6 + 1 > 2 and f6(s6(x6)) == (x6 + 1) + 1 == x6 + 2, 'H06 k3: por la derecha, s(x) > 2 y f(s(x)) = x + 2')
ok(1 + 1 == 2 and 1 + 2 == 3 and 5 != 3, 'H06 k3: laterales 5 y 3')
# 5) ejemplos
ok(P6(2) == 2**2 - 3*2 + 1 == 4 - 6 + 1 == -1 and P6(Fr('1.9')) == Fr('3.61') - Fr('5.7') + 1 == Fr('-1.09') and P6(Fr('2.1')) == Fr('4.41') - Fr('6.3') + 1 == Fr('-0.89') and Fr('1.9')**2 == Fr('3.61') and 3*Fr('1.9') == Fr('5.7') and Fr('2.1')**2 == Fr('4.41') and 3*Fr('2.1') == Fr('6.3'), 'H06 ej2'); llega1('H06 ej2', lambda x: P6(g6(x)), 1, -1); llega1('H06 ej2 P en 2', P6, 2, -1)
for u6 in RJ:
    ok(u6*u6 - 4 == (u6 - 2)*(u6 + 2) and P6(u6) - P6(2) == (u6 - 2)*(u6 - 1), 'H06: u² − 4 = (u − 2)(u + 2) y P(u) − P(2) = (u − 2)(u − 1)')
    if u6 != 2: ok(F6(u6) == u6 + 2, 'H06 ej3: F(u) = u + 2 fuera de 2')
    ok((q6(u6) == 2) == (u6 == 1) == (3*u6 == 3), 'H06 ej3: q(x) = 2 solo si x = 1')
    ok((m6(u6) == 3) == (u6 == 1) and (w6(u6) == 200) == (u6 == 4), 'H06 A y C: la interna toca b solo en a')
ok(q6(1) == 3*1 - 1 == 3 - 1 == 2 and 2 - 2 == 0 and 2 + 2 == 4 and q6(Fr('0.9')) == Fr('2.7') - 1 == Fr('1.7') and 3*Fr('0.9') == Fr('2.7') and F6(Fr('1.7')) == Fr('1.7') + 2 == Fr('3.7') and q6(Fr('1.1')) == Fr('3.3') - 1 == Fr('2.3') and 3*Fr('1.1') == Fr('3.3') and F6(Fr('2.3')) == Fr('2.3') + 2 == Fr('4.3'), 'H06 ej3'); llega1('H06 ej3 q', q6, 1, 2); llega1('H06 ej3 F', F6, 2, 4); llega1('H06 ej3 compuesta', lambda x: F6(q6(x)), 1, 4)
ok(6 != 2 and r6(1) == 2, 'H06 ej4')
# 6) ejercicios
llega1('H06 A m', m6, 1, 3); llega1('H06 A n', n6, 3, 5); llega1('H06 A k', k6, 1, 5)
ok(1 + 2 == 3 and 2*3 - 1 == 6 - 1 == 5 and n6(3) == 1 != 5 and m6(Fr('0.9')) == Fr('0.9') + 2 == Fr('2.9') and n6(Fr('2.9')) == 2*Fr('2.9') - 1 == Fr('5.8') - 1 == Fr('4.8') == k6(Fr('0.9')) and m6(Fr('1.1')) == Fr('1.1') + 2 == Fr('3.1') and n6(Fr('3.1')) == 2*Fr('3.1') - 1 == Fr('6.2') - 1 == Fr('5.2') == k6(Fr('1.1')) and n6(m6(1)) == 1, 'H06 A')
ok(E6_(2) == 7 and D6(2) == 9 and 4 != 9 and 9 != 4, 'H06 B')
llega1('H06 C w', w6, 4, 200); llega1('H06 C p', p6, 200, 2400, Fr(1, 100)); llega1('H06 C compuesta', lambda x: p6(w6(x)), 4, 2400, Fr(1, 100))
ok(50*4 == 200 and 12*200 == 2400 and p6(200) == 2000 != 2400 and w6(Fr('3.9')) == 50*Fr('3.9') == 195 and p6(195) == 12*195 == 2340 and w6(Fr('4.1')) == 50*Fr('4.1') == 205 and p6(205) == 12*205 == 2460 and p6(w6(4)) == 2000, 'H06 C')
# 7) lo que la hoja afirma con símbolos o palabras, escrito tal cual (hipótesis incluidas)
for z6 in ['\\[\\lim_{x\\to a}f(g(x))=f(b)\\]', '\\(g(x)=x+1\\)', '\\(f(u)=u+1\\) si \\(u\\ne 2\\), con \\(f(2)=5\\)', '\\(h(x)=f(g(x))\\)', 'Sea \\(g\\) definida en un intervalo abierto que contiene a \\(a\\), salvo quizá en \\(a\\)',
           '<li>\\(\\lim_{x\\to a}g(x)=b\\) (condición 1: el límite interno existe y es el número \\(b\\)),</li>', '<li>\\(f\\) está definida en un intervalo abierto que contiene a \\(b\\), y</li>', '<li>\\(\\lim_{u\\to b}f(u)=f(b)\\) (condición 2: el límite de la externa en \\(b\\) existe y es igual a su valor en \\(b\\)),</li>', 'entonces \\(\\lim_{x\\to a}f(g(x))=f(b)\\)',
           '<li>\\(\\lim_{x\\to a}g(x)=b\\),</li>', '<li>existe un intervalo abierto que contiene a \\(a\\) tal que \\(g(x)\\ne b\\) para todo \\(x\\ne a\\) de ese intervalo, y</li>', '<li>\\(f\\) está definida en un intervalo abierto que contiene a \\(b\\), salvo quizá en \\(b\\), y \\(\\lim_{u\\to b}f(u)=K\\),</li>', 'entonces \\(\\lim_{x\\to a}f(g(x))=K\\)',
           'el teorema no se puede usar: no dice que el límite exista ni que no exista', 'si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|f(g(x))-f(b)|\\lt \\varepsilon\\)', 'si \\(0\\lt |u-b|\\lt \\eta\\), entonces \\(|f(u)-f(b)|\\lt \\varepsilon\\)', '\\(|f(b)-f(b)|=0\\)', 'si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|g(x)-b|\\lt \\eta\\)', '\\(\\lim_{x\\to a}f(g(x))=f(b)\\).',
           'si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|f(g(x))-K|\\lt \\varepsilon\\)', 'si \\(0\\lt |u-b|\\lt \\eta\\), entonces \\(|f(u)-K|\\lt \\varepsilon\\). De \\(u=b\\) no se sabe nada.', 'si \\(0\\lt |x-a|\\lt \\delta_{1}\\), entonces \\(|g(x)-b|\\lt \\eta\\)', 'si \\(0\\lt |x-a|\\lt \\delta_{2}\\), entonces \\(g(x)\\ne b\\)', '\\(\\delta=\\min\\{\\delta_{1},\\delta_{2}\\}\\)', 'cumple \\(0\\lt |u-b|\\lt \\eta\\)', '\\(\\lim_{x\\to a}f(g(x))=K\\).',
           '\\(|f(u)-3|=|u+1-3|=|u-2|\\)', '\\(|g(x)-2|=|x+1-2|=|x-1|\\)', '\\(|f(2)-3|=|5-3|=2\\)', '\\(c(x)=2\\) para todo \\(x\\)', '\\(\\lim_{x\\to 1}f(c(x))=5\\)', '\\(s(x)=2\\) si \\(x\\lt 1\\) y \\(s(x)=x+1\\) si \\(x\\ge 1\\)', '\\(f(s(x))=(x+1)+1=x+2\\)', '\\(f(s(x))\\) no tiene límite en \\(1\\)',
           '\\(\\lim_{x\\to 1}g(x)=1+1=2\\)', '\\(\\lim_{u\\to 2}f(u)=2+1=3\\)', '\\(g(x)\\ne 2\\) para todo \\(x\\ne 1\\)', '\\(\\lim_{x\\to 1}f(g(x))=3\\)', '\\(h(x)=f(x+1)=(x+1)+1=x+2\\)', '\\(h(1)=f(2)=5\\)', '\\(P(u)=u^{2}-3u+1\\)', '\\(\\lim_{x\\to 1}P(g(x))=P(2)\\)', '\\(P(2)=2^{2}-3\\cdot 2+1=4-6+1=-1\\)',
           '\\(q(x)=3x-1\\)', '\\(F(u)=\\dfrac{u^{2}-4}{u-2}\\)', '\\(u^{2}-4=(u-2)(u+2)\\)', 'para todo \\(u\\ne 2\\) se tiene \\(F(u)=u+2\\)', '\\(\\lim_{u\\to 2}F(u)=2+2=4\\)', '\\(q(x)\\ne 2\\) para todo \\(x\\ne 1\\)', '\\(\\lim_{x\\to 1}F(q(x))=4\\)',
           '\\(\\lim_{x\\to 4}G(x)=1\\)', '\\(\\lim_{u\\to 1}r(u)=6\\) y \\(r(1)=2\\)', '\\(\\lim_{x\\to 4}r(G(x))=6\\)', '\\(\\lim_{x\\to 4}r(G(x))=2\\)', 'no se puede decidir. Falta saber si \\(G\\) toma el valor \\(1\\) cerca de \\(4\\)',
           '\\(m(x)=x+2\\)', '\\(n(u)=2u-1\\) si \\(u\\ne 3\\), con \\(n(3)=1\\)', '\\(k(x)=n(m(x))\\)', '\\(\\lim_{u\\to 3}n(u)=2\\cdot 3-1=6-1=5\\)', '\\(m(x)\\ne 3\\) para todo \\(x\\ne 1\\)', '\\(\\lim_{x\\to 1}n(m(x))=5\\)',
           '\\(\\lim_{x\\to 0}v(x)=2\\)', '\\(\\lim_{u\\to 2}E(u)=7\\) y \\(E(2)=7\\)', '\\(\\lim_{u\\to 2}D(u)=4\\) y \\(D(2)=9\\)', '\\(\\lim_{x\\to 0}E(v(x))=7\\)', 'Solo con esos datos no se puede decidir', 'Como \\(9\\ne 4\\), no tiene límite en \\(0\\)',
           '\\(w(x)=50\\,x\\)', '\\(p(u)=12\\,u\\) si \\(u\\ne 200\\), y \\(p(200)=2000\\)', '\\(\\lim_{x\\to 4}w(x)=50\\cdot 4=200\\)', '\\(\\lim_{u\\to 200}p(u)=12\\cdot 200=2400\\)', '\\(w(x)\\ne 200\\) para todo \\(x\\ne 4\\)', '\\(\\lim_{x\\to 4}p(w(x))=2400\\)',
           'Hoja «Límites de funciones compuestas cuando el límite interno no existe»', 'Hoja «Límites de funciones compuestas cuando el límite externo no existe»']:
    ok(z6 in A6, 'H06: la hoja no trae «%s»' % z6)
ok(A6.count('no se puede usar') >= 8 and A6.count('sin demostrar') >= 2 and A6.count('regla del hueco') + A6.count('Regla del hueco') >= 12 and A6.count('criterio de los laterales') >= 2 and A6.count('estudio directo') + A6.count('Estudio directo') >= 3, 'H06: avisos')
# ───────── H06 v002 (revisión general, cuarta y quinta ley, 25-nov): cuentas nuevas de la hoja y rótulos nuevos de la escena ─────────
def en6(*cads): return all(c in A6 for c in cads)
X46 = [Fr('0.9'), Fr('0.99'), Fr('1.01'), Fr('1.1')]; LD6 = [r'\text{izquierda de }1', r'\text{izquierda, más cerca}', r'\text{derecha, más cerca}', r'\text{derecha de }1']
ok(en6(*[r'g(%s)&=%s+1=%s&&%s' % (tex(x), tex(x), tex(g6(x)), l) for x, l in zip(X46, LD6)]), 'H06 v002 encabezado: los cuatro valores de g, uno bajo otro')
ok(en6(*[r'f(g(%s))&=f(%s)=%s+1=%s&&%s' % (tex(x), tex(g6(x)), tex(g6(x)), tex(h6(x)), l) for x, l in zip(X46, LD6)]) and all(g6(x) != 2 and h6(x) == g6(x) + 1 for x in X46), 'H06 v002 encabezado: los cuatro valores de la compuesta, uno bajo otro')
ok(all(abs(g6(X46[i]) - 2) > abs(g6(X46[j]) - 2) and abs(h6(X46[i]) - 3) > abs(h6(X46[j]) - 3) for i, j in ((0, 1), (3, 2))) and all(abs(h6(x) - 3) < abs(h6(x) - 5) for x in X46), 'H06 v002 encabezado: más cerca de 1, más cerca de 2 y de 3 (y lejos de 5)')
ok(en6(r'f(c(0{,}9))&=f(2)=5&&\text{izquierda de }1', r'f(c(1{,}1))&=f(2)=5&&\text{derecha de }1', 'El mismo límite interno dio dos resultados distintos, \\(3\\) y \\(5\\)') and f6(c6(Fr('0.9'))) == f6(c6(Fr('1.1'))) == f6(2) == 5 and 3 != 5, 'H06 v002 encabezado: la interna constante')
ok(en6('<b>De dónde sale, con números.</b>', '<b>La regularidad:</b>', '<b>La fórmula, y cuándo vale.</b>', 'se lee «\\(f\\) de \\(g\\) de \\(x\\)»', 'se lee «el límite de \\(g\\) de \\(x\\), cuando \\(x\\) tiende a \\(a\\), es \\(b\\)»', 'Se lee: «el límite, cuando \\(x\\) tiende a \\(a\\), de \\(f\\) de \\(g\\) de \\(x\\), es \\(f\\) de \\(b\\)»', '\\(g(x)\\) vale \\(2\\) solo cuando \\(x=1\\), y el límite no mira lo que pasa en \\(x=1\\)') and A6.count('<p class="lede">') == 3, 'H06 v002 encabezado: tres párrafos, regularidad, fórmula y lecturas')
ok(en6('<b>Palabras que se usan.</b>', '<b>Cómo se lee cada una.</b>', '<b>Interna y externa.</b>', '<b>Límite interno.</b>', '<b>Hueco y punto lleno.</b>', '<b>«Cerca de \\(a\\)».</b>', '<b>«La interna toca \\(b\\)».</b>', '<b>El teorema, visto en una cuenta</b>', '<b>La regla del hueco, vista en una cuenta</b>', '<b>De dónde sale la regla.</b>', 'los valores \\(2{,}9\\); \\(2{,}99\\); \\(3{,}01\\) y \\(3{,}1\\) del encabezado') and [h6(x) for x in X46] == [Fr('2.9'), Fr('2.99'), Fr('3.01'), Fr('3.1')], 'H06 v002 k1: palabras, lecturas y las dos reglas vistas en cuentas')
ok(A6.count('<b>Qué se demuestra:</b>') == 2 and A6.count('<b>Cómo funciona el método:</b>') == 2 and en6('<b>Cómo se leen los símbolos de la definición.</b>', 'se lee «épsilon»', 'se lee «delta»', 'se lee «eta»', '<b>La definición que se usa</b>', 'si \\(0\\lt |x-a|\\lt \\delta\\), entonces \\(|F(x)-L|\\lt \\varepsilon\\)', '<b>Qué se muestra:</b>', '<b>Palabra nueva: límite lateral.</b>'), 'H06 v002 k2 y k3: qué se demuestra, cómo funciona el método y lectura de los símbolos')
# k2, el teorema con números: P(u) − P(2) = (u − 2)(u − 1), η = 0,25, δ = 0,25, prueba con x = 1,2
for u6 in RJ:
    ok(P6(u6) - P6(2) == u6*u6 - 3*u6 + 1 - (-1) == u6*u6 - 3*u6 + 1 + 1 == u6*u6 - 3*u6 + 2 == (u6 - 2)*(u6 - 1) == u6*u6 - u6 - 2*u6 + 2, 'H06 v002 k2: P(u) − P(2), línea por línea, y la factorización desarrollada')
    ok((u6 - 2)*(u6 + 2) == u6*u6 + 2*u6 - 2*u6 - 4 == u6*u6 - 4, 'H06 v002 ej3: (u − 2)(u + 2) desarrollado')
    ok((u6 + 1 == 2) == (u6 == 2 - 1) == (u6 == 1) and (3*u6 - 1 == 2) == (3*u6 == 3) == (u6 == 1) and (u6 + 2 == 3) == (u6 == 3 - 2) == (u6 == 1) and (50*u6 == 200) == (u6 == Fr(200, 50)) == (u6 == 4), 'H06 v002: los despejes de «¿la interna toca b?»')
for t6 in TS1:
    u6 = 2 + t6*Fr('0.25'); x6 = 1 + t6*Fr('0.25')
    ok(abs(u6 - 2) < Fr('0.25') and Fr('-0.25') < u6 - 2 < Fr('0.25') and Fr('0.75') < u6 - 1 < Fr('1.25') and abs(u6 - 1) < Fr('1.25') and abs(P6(u6) - P6(2)) == abs(u6 - 2)*abs(u6 - 1) < Fr('0.25')*Fr('1.25') < Fr('0.5'), 'H06 v002 k2: η = 0,25 responde por P con ε = 0,5')
    ok(abs(g6(x6) - 2) == abs(x6 + 1 - 2) == abs(x6 - 1) < Fr('0.25') and abs(P6(g6(x6)) - P6(2)) < Fr('0.5'), 'H06 v002 k2: δ = 0,25 responde por la compuesta P(g(x)) con ε = 0,5')
ok(Fr('-0.25') + 1 == Fr('0.75') and Fr('0.25') + 1 == Fr('1.25') and -2 + 1 == -1 and Fr('0.25')*Fr('1.25') == Fr('0.3125') < Fr('0.5') and abs(Fr('1.2') - 1) == Fr('0.2') < Fr('0.25') and g6(Fr('1.2')) == Fr('1.2') + 1 == Fr('2.2') and abs(Fr('2.2') - 2) == Fr('0.2') and Fr('2.2')**2 == Fr('4.84') and 3*Fr('2.2') == Fr('6.6') and P6(Fr('2.2')) == Fr('4.84') - Fr('6.6') + 1 == Fr('-0.76') and abs(Fr('-0.76') - (-1)) == abs(Fr('-0.76') + 1) == Fr('0.24') < Fr('0.5'), 'H06 v002 k2: el teorema con números (x = 1,2)')
ok(en6(r'P(u)-P(2)&=u^{2}-3u+1-(-1)&&', r'&=u^{2}-3u+1+1&&', r'&=u^{2}-3u+2&&\text{porque }1+1=2', r'&=(u-2)(u-1)&&\text{se factoriza}', r'\((u-2)(u-1)=u^{2}-u-2u+2=u^{2}-3u+2\)', r'-0{,}25\lt u-2&\lt 0{,}25&&', r'0{,}75\lt u-1&\lt 1{,}25&&\text{se suma }1\text{ en los tres lados}', r'|u-1|&\lt 1{,}25&&', r'\(|P(u)-P(2)|=|u-2|\cdot|u-1|\), menor que \(0{,}25\cdot 1{,}25=0{,}3125\)', r'\(P(2{,}2)=2{,}2^{2}-3\cdot 2{,}2+1=4{,}84-6{,}6+1=-0{,}76\)', r'\(|-0{,}76-(-1)|=|-0{,}76+1|=0{,}24\), menor que \(0{,}5\)', r'\(g(1{,}2)=1{,}2+1=2{,}2\)'), 'H06 v002 k2: el teorema con números, escrito tal cual')
ok(en6(r'porque \(1-3=-2\)', r'porque \(1-2=-1\)', r'\(\delta=\min\{0{,}5;\ 1\}=0{,}5\)', r'\(h(1{,}1)=f(2{,}1)=2{,}1+1=3{,}1\), y \(|3{,}1-3|=0{,}1\), menor que \(0{,}5\)') and 1 - 3 == -2 and 1 - 2 == -1 and min(Fr('0.5'), 1) == Fr('0.5'), 'H06 v002 k2: la regla del hueco con números, paso por paso')
# k3 con números; ejemplos y ejercicios
ok(s6(Fr('0.9')) == 2 and f6(2) == 5 and s6(Fr('1.1')) == Fr('1.1') + 1 == Fr('2.1') and f6(Fr('2.1')) == Fr('2.1') + 1 == Fr('3.1') and en6(r'\(s(0{,}9)=2\) y \(f(2)=5\)', r'\(s(1{,}1)=1{,}1+1=2{,}1\) y \(f(2{,}1)=2{,}1+1=3{,}1\)', r'\(h(0{,}9)=f(1{,}9)=1{,}9+1=2{,}9\) y \(h(1{,}1)=f(2{,}1)=2{,}1+1=3{,}1\)'), 'H06 v002 k3: las tres internas con números')
ok(en6(r'x+1=2&&\text{la interna igualada a }2', r'x=2-1&&\text{se resta }1\text{ a los dos lados}', r'x=1&&\text{porque }2-1=1', r'\(g(1)=1+1=2\), así que \(h(1)=f(2)=5\)', r'3x-1=2&&\text{la interna igualada a }2', r'3x=3&&\text{se suma }1\text{ a los dos lados}', r'x=1&&\text{se divide por }3\text{ a los dos lados}', r'\((u-2)(u+2)=u^{2}+2u-2u-4=u^{2}-4\)', r'&=\frac{(u-2)(u+2)}{u-2}&&\text{numerador factorizado}', r'&=u+2&&\text{porque }\frac{u-2}{u-2}=1\text{ si }u\ne 2') and 2 - 1 == 1 and 2 + 1 == 3 and Fr(3, 3) == 1, 'H06 v002 ej1 y ej3: despejes y simplificación, línea por línea')
ok(2**2 == 4 and 3*2 == 6 and 4 - 6 == -2 and -2 + 1 == -1 and g6(Fr('0.9')) == Fr('1.9') and g6(Fr('1.1')) == Fr('2.1') and P6(g6(Fr('0.9'))) == Fr('-1.09') and P6(g6(Fr('1.1'))) == Fr('-0.89') and en6(r'porque \(2^{2}=4\), \(3\cdot 2=6\), \(4-6=-2\) y \(-2+1=-1\)', r'\(1{,}9^{2}=3{,}61\) y \(3\cdot 1{,}9=5{,}7\), así que \(P(1{,}9)=3{,}61-5{,}7+1=-1{,}09\)', r'\(2{,}1^{2}=4{,}41\) y \(3\cdot 2{,}1=6{,}3\), así que \(P(2{,}1)=4{,}41-6{,}3+1=-0{,}89\)'), 'H06 v002 ej2: cada producto por separado')
ok(Fr('1.7')**2 == Fr('2.89') and Fr('2.89') - 4 == Fr('-1.11') and Fr('1.7') - 2 == Fr('-0.3') and Fr('-1.11')/Fr('-0.3') == Fr('3.7') == F6(Fr('1.7')) and q6(Fr('0.9')) == 3*Fr('0.9') - 1 == Fr('1.7') and q6(Fr('1.1')) == 3*Fr('1.1') - 1 == Fr('2.3') and en6(r'\(q(0{,}9)=3\cdot 0{,}9-1=2{,}7-1=1{,}7\)', r'\(1{,}7^{2}=2{,}89\); \(2{,}89-4=-1{,}11\); \(1{,}7-2=-0{,}3\); y \(\dfrac{-1{,}11}{-0{,}3}=3{,}7\)', r'\(q(1{,}1)=3\cdot 1{,}1-1=3{,}3-1=2{,}3\)'), 'H06 v002 ej3: valores con la fórmula simplificada y con la original')
ok(en6(r'\(r(G(x))=r(1)=2\) para esos \(x\)', r'queda \(x=3-2=1\)', r'queda \(x=\dfrac{200}{50}=4\)', r'\(D(v(x))=D(2)=9\) para esos \(x\)', r'\(2400-2340=60\) y \(2460-2400=60\) pesos') and 3 - 2 == 1 and Fr(200, 50) == 4 and 2400 - 2340 == 60 == 2460 - 2400 and w6(Fr('3.9')) != 200 != w6(Fr('4.1')), 'H06 v002 ej4 y ejercicios: despejes y distancias')
ok(en6('para \\(c\\) positivo, \\(|t|\\lt c\\) dice lo mismo que \\(-c\\lt t\\lt c\\)', 'si \\(0\\le p\\lt A\\) y \\(0\\le q\\lt B\\), entonces \\(p\\cdot q\\lt A\\cdot B\\)', 'el valor absoluto de un producto es el producto de los valores absolutos'), 'H06 v002: avisos de rigor nuevos')
for p_ in RJ:
    for q_ in (Fr(1, 4), Fr(1), Fr(5, 4), Fr(3)):
        ok((abs(p_) < q_) == (-q_ < p_ < q_) and abs(p_*q_) == abs(p_)*abs(q_), 'H06 v002 avisos: |t| < c ⟺ −c < t < c y |p·q| = |p|·|q| (rejilla)')
# quinta ley: cada cosa que «Cómo leerla» nombra tiene su rótulo en la figura
ok("if (ap(1) > 0.9){ frase('hueco', MF, B, K, 9, 13, mu); frase('punto lleno', MF, B, FB, 8, -10, mu); }" in E6 and en6('(rótulo «hueco»)', '(rótulo «punto lleno»)', 'rótulo «hacia 2»', 'rótulo «hacia 3»', 'rótulo «solo aquí g vale 2»', 'anillo burdeo sobre el punto lleno', 'anillo naranjo sobre el hueco', '\\(h(0{,}9)=2{,}9\\) y \\(h(1{,}1)=3{,}1\\)'), 'H06 v002 escena: rótulos «hueco» y «punto lleno», y lo que «Cómo leerla» nombra')
# <<< H06

# >>> H06 ESPER
ESPER['compteo-idea'] = (7, FUN6)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '06.scene.js'].map(function(a){ return fs.readFileSync"); ok("'06.scene.js'" in NODO2, 'H06: la escena no quedó en la lista de node')
# <<< H06 ESPER

# >>> H07
# ───────── H07: límites de funciones definidas por partes (en el punto de cambio, cada lado con la fórmula de su tramo; principio local demostrado por la izquierda) ─────────
A7, E7 = molde('07', 'H07_limites_de_funciones_definidas_por_partes.html', 'Límites de funciones definidas por partes', 'lim-partes', 'Propiedades de límites', ['partes-idea'], 1)
def f7(x): x = Fr(x); return x + 1 if x < 2 else (5 - x if x > 2 else Fr(1))            # animación: laterales 3 y 3 en 2; f(2) = 1
def h7(x): x = Fr(x); return 2*x + 1 if x < 1 else (4 - x if x < 3 else x - 1)          # k2 y k3: tres tramos, cambios en 1 y en 3
def P7(x): return 4 - Fr(x)                                                             # k2: la fórmula del tramo del medio de h
def q7(x): x = Fr(x); return Fr(10) if x == 3 else 2*x                                  # k3: punto suelto
def p7(x, k=3): x = Fr(x); return k*x + 1 if x < 2 else x*x + 3                         # k3: parámetro k (por defecto, el que da límite)
def r7(x): x = Fr(x); return x*x if x <= 1 else 2*x + 1                                 # ejemplo 2: salto en 1
def u7(x): x = Fr(x); return x if x < 1 else x + 2                                      # ejemplo 3
def v7(x): x = Fr(x); return x if x <= 1 else x + 2                                     # ejemplo 3: el «≤» en el otro tramo
def w7(x): x = Fr(x); return x if x < 1 else (2 - x if x > 1 else Fr(7))                # ejemplo 3: punto suelto
def t7(x, c=Fr(3, 2)): x = Fr(x); return x*x - c if x < 3 else 2*x + c                  # ejemplo 4: parámetro c
def m7(x): x = Fr(x); return 3*x - 1 if x < 2 else x*x + 1                              # ejercicio A
def n7(x, k=2): x = Fr(x); return x + 4 if x < -1 else (x*x if x <= 2 else k*x)         # ejercicio B
def C7(x): x = Fr(x); assert x >= 0; return 150*x if x <= 200 else 30000 + 200*(x - 200)   # ejercicio C: cuenta por tramos
def D7(x): x = Fr(x); assert x >= 0; return 150*x if x <= 200 else 200*x                   # ejercicio C: la otra tarifa
FUN7 = {'f': f7, 'h': h7, 'P': P7, 'q': q7, 'r': r7, 'u': u7, 'v': v7, 'w': w7, 'm': m7, 'C': C7, 'D': D7}
valores('H07 hoja', mates_de(A7), FUN7, 22)
# 1) la escena: función, lugar, laterales, valor en el lugar y marco
ok("function f(x){ return x < 2 ? x + 1 : (x > 2 ? 5 - x : 1); }" in E7 and 'var A = 2, LI = 3, LD = 3, VA = 1;' in E7 and 'var M = lmMarco(-0.6, 2.1, 5.2, 2.95, 0, 4.4, 0, 4.5);' in E7, 'H07 escena: función, lugar, laterales, valor y marco')
lat1('H07 f izq', f7, 2, -1, 3); lat1('H07 f der', f7, 2, 1, 3); llega1('H07 f', f7, 2, 3)
ok((2 + 1, 5 - 2) == (3, 3) and f7(2) == 1 != 3, 'H07 escena: laterales y valor en 2')
for x7 in RJ:
    if x7 < 2: ok(f7(x7) == x7 + 1 and abs(f7(x7) - 3) == 2 - x7, 'H07 escena: tramo izquierdo')
    if x7 > 2: ok(f7(x7) == 5 - x7 and abs(f7(x7) - 3) == x7 - 2, 'H07 escena: tramo derecho')
    if 0 <= x7 <= Fr('4.4'): ok(0 <= f7(x7) <= Fr('4.5'), 'H07 escena: la gráfica cabe en la ventana')
ok('lmCurva(S, M, f, 0, A*a - 1e-6, C.ink, 2); lmCurva(S, M, f, A + 1e-6, A + 2.4*a, C.ink, 2);' in E7 and 2 + Fr('2.4') == Fr('4.4') and 'lmPunto(S, M, A, LI, C.ink, true, 3.2); lmPunto(S, M, A, VA, C.ink, false, 3);' in E7 and 'prAnillo(S, M, A, VA, C.tan, 7)' in E7, 'H07 escena: tramos, círculo vacío en (2, 3), punto lleno en (2, 1) y anillo')
# flechas: empiezan y terminan sobre su tramo, y avanzan hacia el 2
ok('lmFlecha(S, M, 0.95, 1.95, 0.95 + 0.8*a, 1.95 + 0.8*a, C.sec' in E7 and f7(Fr('0.95')) == Fr('1.95') and f7(Fr('0.95') + Fr('0.8')) == Fr('1.95') + Fr('0.8') and Fr('0.95') + Fr('0.8') < 2, 'H07 escena: flecha azul sobre el tramo izquierdo')
ok('lmFlecha(S, M, 3.05, 1.95, 3.05 - 0.8*a, 1.95 + 0.8*a, C.alt' in E7 and f7(Fr('3.05')) == Fr('1.95') and f7(Fr('3.05') - Fr('0.8')) == Fr('1.95') + Fr('0.8') and Fr('3.05') - Fr('0.8') > 2, 'H07 escena: flecha verde sobre el tramo derecho')
ok("lmSeg(S, M, A, LI, 0, LI, C.sec, 1); frase('hacia 3', 0, LI," in E7 and "lmSeg(S, M, A, LD, 4.4, LD, C.alt, 1); frase('hacia 3', 4.4, LD," in E7, 'H07 escena: punteadas y frases de los laterales')
# registro, rótulos y lectura, armados con fracciones
XI7 = [Fr('1.9'), Fr('1.99'), Fr('1.999')]; XD7 = [Fr('2.1'), Fr('2.01'), Fr('2.001')]
ok("['R1', 'x\\\\lt 2:\\\\ x+1;\\\\ \\\\ x\\\\gt 2:\\\\ 5-x;\\\\ \\\\ f(2)=%s'" % tex(f7(2)) in E7, 'H07 registro R1')
ok("['R2', '" + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x7), tex(f7(x7))) for x7 in XI7[:2]) + "'" in E7, 'H07 registro R2')
ok("['R4', '" + ';\\\\ \\\\ '.join('f(%s)=%s' % (tex(x7), tex(f7(x7))) for x7 in XD7[:2]) + "'" in E7, 'H07 registro R4')
ok("['R3', '\\\\lim_{x\\\\to 2^{-}}f(x)=2+1=3'" in E7 and "['R5', '\\\\lim_{x\\\\to 2^{+}}f(x)=5-2=3'" in E7 and "['R6', '\\\\lim_{x\\\\to 2}f(x)=3'" in E7 and "['R7', 'f(2)=1\\\\ne 3\\\\text{: no participa}'" in E7, 'H07 registro R3, R5, R6 y R7')
ok("['SI', '2+1=3'" in E7 and "['SD', '5-2=3'" in E7 and "['LS', '\\\\lim_{x\\\\to 2}f(x)=3'" in E7 and "['NP', 'f(2)=1\\\\ne 3'" in E7 and "['PV', 'f(2)=1'" in E7 and "['CI', 'y=x+1'" in E7 and "['CD', 'y=5-x'" in E7 and "['F', '\\\\Longrightarrow\\\\ \\\\text{sí: }3'" in E7, 'H07 rótulos')
ok(JQ.join('f(%s)=%s+1=%s' % (tex(x7), tex(x7), tex(f7(x7))) for x7 in XI7) in E7, 'H07 lectura: tabla por la izquierda')
ok(JQ.join('f(%s)=5-%s=%s' % (tex(x7), tex(x7), tex(f7(x7))) for x7 in XD7) in E7, 'H07 lectura: tabla por la derecha')
ok(all(abs(f7(XI7[i + 1]) - 3) < abs(f7(XI7[i]) - 3) and abs(f7(XD7[i + 1]) - 3) < abs(f7(XD7[i]) - 3) for i in range(2)), 'H07 lectura: más cerca de 2, más cerca de 3')
ok('\\\\lim_{x\\\\to 2^{-}}(x+1)=2+1=3' in E7 and '\\\\lim_{x\\\\to 2^{+}}(5-x)=5-2=3' in E7 and '\\\\text{laterales: }3\\\\text{ y }3\\\\text{, iguales}' in E7 and '\\\\text{valor en el lugar: }f(2)=1' in E7 and '1\\\\ne 3\\\\text{: el valor y el límite son distintos}' in E7, 'H07 lectura: laterales, comparación y valor')
ok("'izquierda es 2 más 1, que es 3.'" in E7 and "'derecha es 5 menos 2, que es 3.'" in E7 and "'tiene límite en 2, y vale 3.'" in E7 and "'El punto suelto está a la altura 1:'" in E7, 'H07 lienzo: frases con los números')
# 2) k2: el principio local por la izquierda, en rejilla, con h por la izquierda de 3 (P(x) = 4 − x, r = 2, L = 1, δ_P = ε)
for x7 in RJ:
    if 1 <= x7 < 3: ok(h7(x7) == P7(x7), 'H07 k2: h coincide con 4 − x en el tramo del medio')
    if x7 < 3: ok(abs(P7(x7) - 1) == abs(3 - x7) == 3 - x7, 'H07 k2: |P(x) − 1| = 3 − x')
for e7 in ES1:
    dP7 = e7; r_7 = Fr(2); d7 = min(dP7, r_7)
    ok(d7 > 0 and 3 - dP7 <= 3 - d7 and 3 - r_7 <= 3 - d7, 'H07 k2: δ = mín{δ_P, r}')
    for t7_ in TS1:
        if t7_ > 0:
            x7 = 3 - t7_*d7
            ok(3 - d7 < x7 < 3 and 3 - r_7 < x7 < 3 and h7(x7) == P7(x7) and 3 - dP7 < x7 < 3 and abs(P7(x7) - 1) < e7 and abs(h7(x7) - 1) == abs(P7(x7) - 1) < e7, 'H07 k2: cadena de la demostración en x = %s (ε = %s)' % (x7, e7))
            ok(abs(P7(3 - t7_*dP7) - 1) < e7, 'H07 k2: δ_P = ε responde a ε')
ok(3 - 2 == 1 and P7(3) == 4 - 3 == 1 and 3 - Fr('0.5') == Fr('2.5') < Fr('2.8') < 3 and min(Fr('0.5'), 2) == Fr('0.5') and h7(Fr('2.8')) == 4 - Fr('2.8') == Fr('1.2') and abs(Fr('1.2') - 1) == Fr('0.2') < Fr('0.5'), 'H07 k2: con ε = 0,5 y x = 2,8')
ok(min(5, 2) == 2 and abs(0 - 3) == 3 < 5 and h7(0) == 2*0 + 1 == 1 and P7(0) == 4 - 0 == 4 and h7(0) != P7(0), 'H07 k2: con ε = 5 el número r hace falta')
lat1('H07 k2: h por la izquierda de 3', h7, 3, -1, 1)
# 3) k3
lat1('H07 k3 h izq de 1', h7, 1, -1, 3); lat1('H07 k3 h der de 1', h7, 1, 1, 3); lat1('H07 k3 h der de 3', h7, 3, 1, 2); llega1('H07 k3 h en 2', h7, 2, 2); llega1('H07 k3 q', q7, 3, 6)
ok((2*1 + 1, 4 - 1, 4 - 3, 3 - 1, 4 - 2) == (3, 3, 1, 2, 2) and 1 != 2 and 1 < 2 < 3 and q7(3) == 10 != 6 == 2*3, 'H07 k3: laterales de h, dentro de un tramo y punto suelto')
for x7 in RJ:
    if 1 < x7 < 3: ok(h7(x7) == 4 - x7, 'H07 k3: en el intervalo abierto de 1 a 3 vale 4 − x')
    if x7 != 3: ok(q7(x7) == 2*x7, 'H07 k3: q fuera de 3')
for k7 in RJ:
    ok(k7*2 + 1 == 2*k7 + 1 and ((2*k7 + 1 == 7) == (2*k7 == 6) == (k7 == 3)), 'H07 k3: 2k + 1 = 7 equivale a k = 3')
ok(2**2 + 3 == 4 + 3 == 7 and 3*2 + 1 == 7, 'H07 k3: lateral derecho de p y comprobación')
lat1('H07 k3 p izq (k = 3)', p7, 2, -1, 7); lat1('H07 k3 p der', p7, 2, 1, 7); lat1('H07 k3 p izq (k = 1)', lambda x: p7(x, 1), 2, -1, 3)
# 4) ejemplos
ok((2 + 1, 5 - 2) == (3, 3) and f7(Fr('1.9')) == Fr('2.9') and f7(Fr('1.99')) == Fr('2.99') and f7(Fr('2.1')) == Fr('2.9') and f7(Fr('2.01')) == Fr('2.99'), 'H07 ej1')
lat1('H07 ej2 izq', r7, 1, -1, 1); lat1('H07 ej2 der', r7, 1, 1, 3); llega1('H07 ej2 en −2', r7, -2, 4); llega1('H07 ej2 en 4', r7, 4, 9)
ok((1**2, 2*1 + 1, (-2)**2, 2*4 + 1) == (1, 3, 4, 9) and 1 != 3 and r7(1) == 1 and r7(Fr('0.9')) == Fr('0.9')**2 == Fr('0.81') and r7(Fr('1.1')) == 2*Fr('1.1') + 1 == Fr('3.2') and -3 < -2 < -1 and 3 < 4 < 5, 'H07 ej2')
for x7 in RJ:
    if -3 < x7 < -1: ok(r7(x7) == x7*x7, 'H07 ej2: entre −3 y −1 vale x²')
    if 3 < x7 < 5: ok(r7(x7) == 2*x7 + 1, 'H07 ej2: entre 3 y 5 vale 2x + 1')
    if x7 != 1: ok(u7(x7) == v7(x7), 'H07 ej3: u y v coinciden fuera de 1')
    if -1 < x7 < 1: ok(m7(x7) == 3*x7 - 1 and n7(x7) == x7*x7, 'H07 A b) y B b): fórmula entre −1 y 1')
    if 2 < x7 < 4: ok(m7(x7) == x7*x7 + 1, 'H07 A c): entre 2 y 4 vale x² + 1')
ok(u7(1) == 1 + 2 == 3 and v7(1) == 1 and u7(1) != v7(1) and w7(1) == 7 and 2 - 1 == 1, 'H07 ej3: valores en 1')
for F7 in (u7, v7): lat1('H07 ej3 izq', F7, 1, -1, 1); lat1('H07 ej3 der', F7, 1, 1, 3)
lat1('H07 ej3 w izq', w7, 1, -1, 1); lat1('H07 ej3 w der', w7, 1, 1, 1)
for c7 in RJ:
    ok(3**2 - c7 == 9 - c7 and 2*3 + c7 == 6 + c7 and ((9 - c7 == 6 + c7) == (9 == 6 + 2*c7) == (3 == 2*c7) == (c7 == Fr(3, 2))), 'H07 ej4: 9 − c = 6 + c equivale a c = 3/2')
ok(Fr(3, 2) == Fr('1.5') and 9 - Fr('1.5') == Fr('7.5') == 6 + Fr('1.5') and 9 - 0 == 9 != 6 == 6 + 0, 'H07 ej4: comprobación')
lat1('H07 ej4 izq', t7, 3, -1, Fr('7.5')); lat1('H07 ej4 der', t7, 3, 1, Fr('7.5')); lat1('H07 ej4 izq (c = 0)', lambda x: t7(x, 0), 3, -1, 9); lat1('H07 ej4 der (c = 0)', lambda x: t7(x, 0), 3, 1, 6)
# 5) ejercicios
lat1('H07 A izq', m7, 2, -1, 5); lat1('H07 A der', m7, 2, 1, 5); llega1('H07 A b)', m7, 0, -1); llega1('H07 A c)', m7, 3, 10)
ok((3*2 - 1, 2**2 + 1, 3*0 - 1, 3**2 + 1) == (5, 5, -1, 10) and 3*Fr('1.9') == Fr('5.7') and Fr('5.7') - 1 == Fr('4.7') == m7(Fr('1.9')) and Fr('2.1')**2 == Fr('4.41') and Fr('4.41') + 1 == Fr('5.41') == m7(Fr('2.1')), 'H07 A')
lat1('H07 B a) izq', n7, -1, -1, 3); lat1('H07 B a) der', n7, -1, 1, 1); llega1('H07 B b)', n7, 0, 0); lat1('H07 B c) izq', n7, 2, -1, 4); lat1('H07 B c) der', n7, 2, 1, 4); lat1('H07 B d) der', lambda x: n7(x, 3), 2, 1, 6)
ok((-1 + 4, (-1)**2, 0**2, 2**2, 3*2) == (3, 1, 0, 4, 6) and 3 != 1 and 4 != 6, 'H07 B')
for k7 in RJ: ok(k7*2 == 2*k7 and ((2*k7 == 4) == (k7 == 2)), 'H07 B c): 2k = 4 equivale a k = 2')
lat1('H07 C a) izq', C7, 200, -1, 30000, tope=Fr(1, 100)); lat1('H07 C a) der', C7, 200, 1, 30000, tope=Fr(1, 100)); lat1('H07 C c) izq', D7, 200, -1, 30000, tope=Fr(1, 100)); lat1('H07 C c) der', D7, 200, 1, 40000, tope=Fr(1, 100)); llega1('H07 C d)', C7, 100, 15000, tope=Fr(1, 100))
ok((150*200, 200 - 200, 200*0, 30000 + 0, 150*199, 201 - 200, 200*1, 30000 + 200, 200*200, 40000 - 30000, 200*201, 150*100) == (30000, 0, 0, 30000, 29850, 1, 200, 30200, 40000, 10000, 40200, 15000) and C7(199) == 29850 and C7(201) == 30200 and D7(201) == 40200 and C7(200) == 30000 == D7(200) and 30000 != 40000, 'H07 C')
for x7 in RJ:
    if x7 >= 0: ok(C7(x7 + 200) == 30000 + 200*x7 and C7(x7*200/12) == 150*(x7*200/12) and (0 < x7*200/12 < 200) == (0 < x7 < 12), 'H07 C: fórmulas de los tramos')
# 6) lo que la hoja afirma con símbolos o palabras, escrito tal cual (hipótesis incluidas)
for z7 in ['\\[\\lim_{x\\to a^{-}}f(x)=\\lim_{x\\to a^{-}}P(x)\\qquad\\text{y}\\qquad\\lim_{x\\to a^{+}}f(x)=\\lim_{x\\to a^{+}}Q(x)\\]', '\\(f(x)=x+1\\) si \\(x\\lt 2\\), \\(f(2)=1\\) y \\(f(x)=5-x\\) si \\(x\\gt 2\\)', 'El valor \\(f(a)\\) no participa.',
           'Existe \\(r\\gt 0\\) tal que para todo \\(x\\ne a\\) con \\(a-r\\lt x\\lt a+r\\) vale una sola fórmula, \\(f(x)=P(x)\\)', 'Existe \\(r\\gt 0\\) tal que \\(f(x)=P(x)\\) para todo \\(x\\) con \\(a-r\\lt x\\lt a\\), y \\(f(x)=Q(x)\\) para todo \\(x\\) con \\(a\\lt x\\lt a+r\\)',
           'Si \\(P\\) y \\(Q\\) son polinomios, esos laterales son \\(P(a)\\) y \\(Q(a)\\)', 'si son distintos, \\(f\\) no tiene límite en \\(a\\)', 'las condiciones hablan de \\(x\\ne a\\)',
           'hay un número \\(r\\gt 0\\) tal que \\(F(x)=P(x)\\) para todo \\(x\\) con \\(a-r\\lt x\\lt a\\); y \\(\\lim_{x\\to a^{-}}P(x)=L\\)', 'para todo \\(\\varepsilon\\gt 0\\) existe \\(\\delta\\gt 0\\) tal que, si \\(a-\\delta\\lt x\\lt a\\), entonces \\(|F(x)-L|\\lt \\varepsilon\\)',
           'existe \\(\\delta_{P}\\gt 0\\) tal que, si \\(a-\\delta_{P}\\lt x\\lt a\\), entonces \\(|P(x)-L|\\lt \\varepsilon\\)', '\\(\\delta=\\min\\{\\delta_{P},r\\}\\)', '\\(a-\\delta_{P}\\le a-\\delta\\) y \\(a-r\\le a-\\delta\\)', '\\(|F(x)-L|=|P(x)-L|\\lt \\varepsilon\\)', '\\(\\lim_{x\\to a^{-}}F(x)=L\\)',
           '\\(h(x)=2x+1\\) si \\(x\\lt 1\\); \\(h(x)=4-x\\) si \\(1\\le x\\lt 3\\); \\(h(x)=x-1\\) si \\(x\\ge 3\\)', 'sirve \\(r=2\\), porque \\(3-2=1\\)', '\\(|P(x)-1|=|3-x|=3-x\\)', '\\(\\delta=\\min\\{0{,}5;\\ 2\\}=0{,}5\\)', '\\(\\delta=\\min\\{5;\\ 2\\}=2\\)', 'con \\(0\\lt |x-a|\\lt \\delta\\) y \\(0\\lt |x-a|\\lt r\\)',
           '\\(\\lim_{x\\to 1}h(x)=3\\)', '\\(h\\) no tiene límite en \\(3\\)', '\\(\\lim_{x\\to 2}h(x)=4-2=2\\)', '\\(q(x)=2x\\) si \\(x\\ne 3\\) y \\(q(3)=10\\)', '\\(\\lim_{x\\to 3}q(x)=2\\cdot 3=6\\)', '\\(p(x)=kx+1\\) si \\(x\\lt 2\\) y \\(p(x)=x^{2}+3\\) si \\(x\\ge 2\\)', '\\(2k+1=7\\)', 'Se resta \\(1\\): \\(2k=6\\). Se divide por \\(2\\): \\(k=3\\)', 'solo si \\(2k=4\\). Se divide por \\(2\\): \\(k=2\\)', 'Se divide por \\(2\\): \\(c=\\dfrac{3}{2}\\), y \\(\\dfrac{3}{2}=1{,}5\\)', 'Con \\(k=3\\), \\(\\lim_{x\\to 2}p(x)=7\\)',
           '\\(\\lim_{x\\to 2^{-}}f(x)=2+1=3\\)', '\\(\\lim_{x\\to 2^{+}}f(x)=5-2=3\\)', '\\(\\lim_{x\\to 2}f(x)=3\\)', '\\(r(x)=x^{2}\\) si \\(x\\le 1\\) y \\(r(x)=2x+1\\) si \\(x\\gt 1\\)', '\\(r\\) no tiene límite en \\(1\\)', '\\(\\lim_{x\\to -2}r(x)=(-2)^{2}=4\\)', '\\(\\lim_{x\\to 4}r(x)=2\\cdot 4+1=9\\)',
           '\\(u(x)=x\\) si \\(x\\lt 1\\) y \\(u(x)=x+2\\) si \\(x\\ge 1\\); \\(v(x)=x\\) si \\(x\\le 1\\) y \\(v(x)=x+2\\) si \\(x\\gt 1\\); y \\(w(x)=x\\) si \\(x\\lt 1\\), \\(w(1)=7\\) y \\(w(x)=2-x\\) si \\(x\\gt 1\\)', 'ni \\(u\\) ni \\(v\\) tienen límite en \\(1\\)', '\\(\\lim_{x\\to 1}w(x)=1\\), aunque \\(w(1)=7\\)',
           '\\(t(x)=x^{2}-c\\) si \\(x\\lt 3\\) y \\(t(x)=2x+c\\) si \\(x\\ge 3\\)', '\\(9-c=6+c\\)', '\\(9=6+2c\\)', '\\(3=2c\\)', '\\(c=\\dfrac{3}{2}\\)', 'Con \\(c=1{,}5\\), \\(\\lim_{x\\to 3}t(x)=7{,}5\\)',
           '\\(m(x)=3x-1\\) si \\(x\\lt 2\\) y \\(m(x)=x^{2}+1\\) si \\(x\\ge 2\\)', '\\(\\lim_{x\\to 2}m(x)=5\\)', '\\(\\lim_{x\\to 0}m(x)=3\\cdot 0-1=-1\\)', '\\(\\lim_{x\\to 3}m(x)=3^{2}+1=10\\)',
           '\\(n(x)=x+4\\) si \\(x\\lt -1\\); \\(n(x)=x^{2}\\) si \\(-1\\le x\\le 2\\); \\(n(x)=kx\\) si \\(x\\gt 2\\)', '\\(n\\) no tiene límite en \\(-1\\)', '\\(\\lim_{x\\to 0}n(x)=0^{2}=0\\)', 'Con \\(k=2\\), \\(\\lim_{x\\to 2}n(x)=4\\)',
           '\\(C(x)=150x\\) si \\(0\\le x\\le 200\\) y \\(C(x)=30000+200(x-200)\\) si \\(x\\gt 200\\)', '\\(D(x)=150x\\) si \\(0\\le x\\le 200\\) y \\(D(x)=200x\\) si \\(x\\gt 200\\)', '\\(\\lim_{x\\to 200}C(x)=30000\\)', '\\(D\\) no tiene límite en \\(200\\)', '\\(\\lim_{x\\to 100}C(x)=150\\cdot 100=15000\\)',
           '\\(\\lim_{x\\to a}F(x)=L\\) si y solo si los dos límites laterales de \\(F\\) en \\(a\\) existen y los dos valen \\(L\\)', 'si \\(P\\) es un polinomio, \\(\\lim_{x\\to a}P(x)=P(a)\\)', '(precios inventados para el ejercicio)']:
    ok(z7 in A7, 'H07: la hoja no trae «%s»' % z7)
ok(A7.count('sin demostrar') >= 2 and A7.count('no tiene límite') >= 6 and A7.count('criterio de los laterales') >= 4 and A7.count('no participa') >= 5, 'H07: avisos')
# <<< H07

# >>> H07 ESPER
ESPER['partes-idea'] = (7, FUN7)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '07.scene.js'].map(function(a){ return fs.readFileSync"); ok("'07.scene.js'" in NODO2, 'H07: la escena no quedó en la lista de node')
# <<< H07 ESPER

if not SIN_NODO:
    R2 = json.loads(subprocess.run(['node', '-e', NODO2, str(PARTES)], capture_output=True, text=True, check=True).stdout)
    ok(sorted(R2) == sorted(ESPER), 'escenas definidas: %s' % sorted(R2))
    for esc, (n, FUN) in ESPER.items():
        E = R2[esc]; et = 'escena ' + esc
        ok((E['n'], E['id'], E['min'], E['step'], E['hold'], E['fin']) == (n, 'paso', 1, 1, 3000, n), et + ': deslizador «paso», hold 3000 y último paso')
        ok(abs(E['asp'] - (E['w']['y1'] - E['w']['y0'])/(E['w']['x1'] - E['w']['x0'])) < 1e-9, et + ': aspect = alto/ancho del mundo')
        ids = [l[0] for l in E['lab']]; ok(all('R%d' % (i + 1) in ids for i in range(n)) and 'R%d' % (n + 1) not in ids and 'Q' in ids and 'F' in ids and len(ids) == len(set(ids)), et + ': registro R1…RN, pregunta y respuesta')
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

print('%d comprobaciones%s' % (N[0], '; SIN node: las lecturas de las escenas no se evaluaron con su código (sí su aritmética exacta)' if SIN_NODO else '; lecturas de las escenas evaluadas con su código real'))
print('Lote 30 H01–H07: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
