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
ok('function f(x){ return x/2 + 1; }' in E1 and 'function g(x){ return x + 1; }' in E1 and 'function s(x){ return f(x) + g(x); }' in E1 and 'var A = 2, L = 2, LM = 3, XS = [1.9, 2.1];' in E1, 'H01 escena: funciones, a, L, M y lugares')
XS1 = [Fr('1.9'), Fr('2.1')]; XC1 = [Fr('1.99'), Fr('2.01')]
for x1 in RJ:
    if x1 == 2: continue
    ok(abs(f1(x1) - 2) == abs(x1 - 2)/2 and abs(g1(x1) - 3) == abs(x1 - 2) and s1(x1) == x1/2 + 1 + x1 + 1 == 3*x1/2 + 2 and abs(s1(x1) - 5) == 3*abs(x1 - 2)/2 and p1(x1) - 6 == (x1 - 2)*(x1 + 5)/2, 'H01 escena: distancias a L, M, L + M y L·M en x = %s' % x1)
    ok(abs(s1(x1) - 5) <= abs(f1(x1) - 2) + abs(g1(x1) - 3), 'H01 escena: la distancia de la suma no supera la suma de las distancias')
ok(2 + 3 == 5 and 2*3 == 6, 'H01 escena: L + M y L·M')
llega1('H01 escena f', f1, 2, 2); llega1('H01 escena g', g1, 2, 3); llega1('H01 escena s', s1, 2, 5); llega1('H01 escena p', p1, 2, 6)
# marco: todo lo dibujado cabe en la vista 1,5 ≤ x ≤ 2,5; 0 ≤ y ≤ 6,5
ok('lmMarco(-0.6, 0.85, 5.5, 4.4, 1.5, 2.5, 0, 6.5)' in E1 and all(Fr('1.5') < x1 < Fr('2.5') for x1 in XS1) and all(0 < F1(x1) < Fr('6.5') for F1 in (f1, g1, s1) for x1 in (Fr('1.5'), Fr('2.5'))), 'H01 escena: las rectas y los trazos caben en el marco')
# números junto a los trazos: alturas de f, de g y puntas apiladas, en 1,9 (izquierda) y 2,1 (derecha)
ok(re.findall(r"num\('([\d,]+)', (\d),", E1) == [(pl(F1(x1)), str(i1)) for F1 in (f1, g1, s1) for i1, x1 in enumerate(XS1)], 'H01 escena: números de las alturas junto a los trazos')
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
ok('s(x)=\\\\tfrac{x}{2}+1+x+1=\\\\tfrac{3x}{2}+2' in E1 and 'L+M=2+3=5' in E1 and '=\\\\lim_{x\\\\to 2}f(x)+\\\\lim_{x\\\\to 2}g(x)=2+3=5' in E1 and '\\\\text{se acercan a }L\\\\cdot M=2\\\\cdot 3=6' in E1 and '\\\\lim_{x\\\\to 2}f(x)=L=2' in E1 and '\\\\lim_{x\\\\to 2}g(x)=M=3' in E1, 'H01 lectura: suma, límites y producto')
# frases del lienzo con los mismos números
ok("'Miden %s y %s: se acercan a 2.'" % (pl(f1(XS1[0])), pl(f1(XS1[1]))) in E1 and "'lugares. Miden %s y %s: se acercan a 3.'" % (pl(g1(XS1[0])), pl(g1(XS1[1]))) in E1 and "'azul: las puntas quedan a %s y a %s.'" % (pl(s1(XS1[0])), pl(s1(XS1[1]))) in E1 and "'3. Llegan al hueco naranjo, a la altura 5.'" in E1 and "'de las alturas se acercan a 2 por 3, que es 6.'" in E1, 'H01 lienzo: frases con las alturas')

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
for z1 in ['\\(\\dfrac{0{,}3}{2}=0{,}15\\)', 'sirve \\(\\delta_{1}=0{,}3\\)', 'sirve \\(\\delta_{2}=0{,}15\\)', 'El menor es \\(\\delta=0{,}15\\)', '\\(|2{,}1-2|=0{,}1\\), menor que \\(0{,}15\\)', '\\(|2{,}05-2|=0{,}05\\) y \\(|3{,}1-3|=0{,}1\\), los dos menores que \\(0{,}15\\)', '\\(|5{,}15-5|=0{,}15\\), menor que \\(0{,}3\\)', '\\(0{,}05+0{,}1=0{,}15\\)',
           '|f(x)-2|=\\left|\\dfrac{x}{2}-1\\right|=\\dfrac{|x-2|}{2}', 'menor que \\(0{,}15\\) si \\(|x-2|\\lt 0{,}3\\)', '\\(|g(x)-3|=|x-2|\\)']:
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
           'Caso \\(c=0\\)', 'Caso \\(c\\ne 0\\)', '\\(|f(x)-L|\\lt \\dfrac{\\varepsilon}{|c|}\\)', '\\(|c\\cdot f(x)-c\\cdot L|=|c\\cdot(f(x)-L)|=|c|\\cdot|f(x)-L|\\)', '\\(|c|\\cdot|f(x)-L|\\lt |c|\\cdot\\dfrac{\\varepsilon}{|c|}=\\varepsilon\\)', 'se elige \\(\\delta=\\varepsilon\\)',
           '\\(f(x)-g(x)=f(x)+(-1)\\cdot g(x)\\)', '\\([f(x)]^{n+1}=[f(x)]^{n}\\cdot f(x)\\)', '\\(L^{n}\\cdot L=L^{n+1}\\)', '<b>Se usan sin demostrar:</b> las propiedades del producto, del cociente y de la raíz', 'el principio de inducción', 'la desigualdad triangular',
           'su límite es \\(2\\).', 'El límite no existe.', 'el límite de \\(h\\) en \\(2\\) no existe', 'su límite en \\(2\\) es \\(4\\)', 'Luego \\(f+g\\) no tiene límite en \\(a\\)', '\\(g(x)=[f(x)+g(x)]-f(x)\\)', 'si \\(0\\lt |x-3|\\lt \\dfrac{1}{M}\\), entonces \\(\\dfrac{1}{|x-3|}\\gt M\\)',
           '\\(\\lim_{x\\to 2}(3x^{2}-5x+4)=2+4=6\\)', '\\(\\lim_{x\\to a}P(x)=P(a)\\)', '\\(\\lim_{x\\to 3}\\dfrac{x^{2}+1}{2x-1}=\\dfrac{10}{5}=2\\)', 'el límite del denominador es \\(5\\), y \\(5\\ne 0\\)', '\\(\\lim_{x\\to -1}(3x+1)^{4}=(-2)^{4}=16\\)', '\\(\\lim_{x\\to 4}\\sqrt{2x+1}=\\sqrt{9}=3\\)', '\\(\\lim_{x\\to -3}\\sqrt[3]{x-5}=\\sqrt[3]{-8}=-2\\)',
           '\\(\\lim_{x\\to 5}F(x)=4\\) y \\(\\lim_{x\\to 5}G(x)=-2\\)', '\\(\\lim_{x\\to 5}[2F(x)-3G(x)]=8-(-6)=8+6=14\\)', '\\(\\lim_{x\\to 5}[F(x)\\cdot G(x)]=4\\cdot(-2)=-8\\)', '\\(\\lim_{x\\to 5}\\dfrac{F(x)}{G(x)}=\\dfrac{4}{-2}=-2\\)', '\\(\\lim_{x\\to 5}[G(x)]^{3}=(-2)^{3}=-8\\)', '\\(\\lim_{x\\to 5}\\sqrt{F(x)}=\\sqrt{4}=2\\)', '\\(|F(x)-4|\\lt 4\\), es decir, \\(0\\lt F(x)\\lt 8\\)',
           '\\(\\lim_{x\\to -1}(2x^{3}-x^{2}+5)=-3+5=2\\)', '\\(\\lim_{x\\to 2}\\dfrac{4x-2}{x^{2}+1}=\\dfrac{6}{5}=1{,}2\\)', '\\(\\lim_{x\\to 3}\\sqrt[3]{x^{2}-1}=\\sqrt[3]{8}=2\\)',
           '\\(\\lim_{x\\to 1}u(x)=6\\), \\(\\lim_{x\\to 1}v(x)=-3\\) y \\(\\lim_{x\\to 1}w(x)=0\\)', '\\(\\lim_{x\\to 1}[u(x)+2v(x)]=6+(-6)=0\\)', '\\(\\lim_{x\\to 1}[u(x)\\cdot v(x)]=6\\cdot(-3)=-18\\)', '\\(\\lim_{x\\to 1}\\dfrac{u(x)}{v(x)}=\\dfrac{6}{-3}=-2\\)', '\\(\\lim_{x\\to 1}\\sqrt{u(x)+3}=\\sqrt{9}=3\\)', '\\(\\lim_{x\\to 1}\\dfrac{w(x)}{u(x)}=\\dfrac{0}{6}=0\\)', '\\(|u(x)+3-9|\\lt 9\\), es decir, \\(0\\lt u(x)+3\\lt 18\\)',
           '\\(T(x)=6000+900\\,x\\)', '\\(U(x)=\\dfrac{T(x)}{x}\\)', '\\(\\lim_{x\\to 20}T(x)=6000+18000=24000\\)', '\\(\\lim_{x\\to 20}U(x)=\\dfrac{24000}{20}=1200\\)', '\\(U(x)\\gt \\dfrac{6000}{x}\\), y \\(\\dfrac{6000}{x}\\gt M\\) si \\(0\\lt x\\lt \\dfrac{6000}{M}\\)',
           '\\(f(x)=\\dfrac{x}{2}+1\\) y \\(g(x)=x+1\\), las dos definidas solo para \\(x\\ne 2\\)']:
    ok(z1 in A1, 'H01: la hoja no trae «%s»' % z1)
ok(A1.count('no se puede usar') >= 5 and A1.count('sin demostrar') >= 4, 'H01: avisos «no se puede usar» y «sin demostrar»')
# <<< H01

# >>> H01 ESPER
ESPER['prop-idea'] = (7, FUN1)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '01.scene.js'].map(function(a){ return fs.readFileSync"); ok("'01.scene.js'" in NODO2, 'H01: la escena no quedó en la lista de node')
# <<< H01 ESPER

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
print('Lote 30 H01: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
