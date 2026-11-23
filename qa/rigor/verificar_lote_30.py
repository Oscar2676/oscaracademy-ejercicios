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
for x2 in (Fr('2.5'), Fr('3.5')):
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
           '\\(\\dfrac{f(x)-2}{g(x)-1}=\\dfrac{(x-1)-2}{(4-x)-1}=\\dfrac{x-3}{3-x}=-1\\)', '\\(\\dfrac{[f(x)-2]^{2}}{g(x)-1}=\\dfrac{(x-3)^{2}}{3-x}=-(x-3)=3-x\\)', '\\(\\dfrac{f(x)-2}{[g(x)-1]^{2}}=\\dfrac{x-3}{(3-x)^{2}}=\\dfrac{1}{x-3}\\)', 'no tiene límite en \\(3\\)',
           '\\(\\lim_{x\\to 3}[f(x)\\cdot g(x)+4]=2+4=6\\)', '\\(\\lim_{x\\to 3}\\dfrac{f(x)+1}{[g(x)]^{2}}=\\dfrac{3}{1}=3\\)', '\\(\\lim_{x\\to 3}\\dfrac{g(x)}{f(x)}=\\dfrac{1}{2}=0{,}5\\)', '\\(\\lim_{x\\to -2}u(x)=3\\), \\(\\lim_{x\\to -2}v(x)=-1\\) y \\(\\lim_{x\\to -2}w(x)=4\\)', '\\(\\lim_{x\\to -2}\\sqrt{w(x)+5}=\\sqrt{9}=3\\)', '\\(|w(x)+5-9|\\lt 9\\), es decir, \\(0\\lt w(x)+5\\lt 18\\)',
           '\\(\\lim_{x\\to 3}[g(x)-1]=1-1=0\\)', 'el cociente no tiene límite en \\(3\\)', '\\(g(x)-1=(4-x)-1=3-x\\)', '\\(m(x)=2x-1\\) si \\(x\\ne 2\\), y \\(m(2)=5\\)', '\\(\\lim_{x\\to 2}[m(x)+n(x)]=3+4=7\\)', '\\(\\lim_{x\\to 2}[3m(x)-2n(x)]=9-8=1\\)', '\\(\\lim_{x\\to 2}[m(x)\\cdot n(x)]=3\\cdot 4=12\\)', '\\(\\lim_{x\\to 2}\\dfrac{n(x)}{m(x)}=\\dfrac{4}{3}\\)',
           '\\(\\lim_{x\\to 0}p(x)=4\\), \\(\\lim_{x\\to 0}q(x)=0\\) y \\(\\lim_{x\\to 0}r(x)=-2\\)', '\\(\\lim_{x\\to 0}[p(x)\\cdot r(x)+q(x)]=-8+0=-8\\)', '\\(\\lim_{x\\to 0}\\dfrac{q(x)}{p(x)+r(x)}=\\dfrac{0}{2}=0\\)', 'con estos datos no se puede decidir si el límite existe',
           '\\(I(x)=1500\\,x\\)', '\\(K(x)=20000+700\\,x\\)', '\\(G(x)=I(x)-K(x)\\)', '\\(\\lim_{x\\to 50}G(x)=75000-55000=20000\\)', '\\(\\lim_{x\\to 50}\\dfrac{G(x)}{x}=\\dfrac{20000}{50}=400\\)', '\\(\\lim_{x\\to 25}G(x)=37500-37500=0\\)', '\\(G(x)=1500\\,x-20000-700\\,x=800\\,x-20000\\)']:
    ok(z2 in A2, 'H02: la hoja no trae «%s»' % z2)
ok(A2.count('no se puede usar') >= 5 and A2.count('sin demostrar') >= 2, 'H02: avisos «no se puede usar» y «sin demostrar»')
# <<< H02

# >>> H02 ESPER
ESPER['comb-idea'] = (7, FUN2)
NODO2 = NODO2.replace("'_lim.js'", "'_lim.js', '_prop.js'"); ok("'_prop.js'" in NODO2, 'H02: el ayudante _prop.js no quedó en la lista de node')
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '02.scene.js'].map(function(a){ return fs.readFileSync"); ok("'02.scene.js'" in NODO2, 'H02: la escena no quedó en la lista de node')
# <<< H02 ESPER

# >>> H03
# ───────── H03: límites de funciones combinadas (f y g con salto: la combinación se estudia por cada lado; suma por la izquierda demostrada) ─────────
A3, E3 = molde('03', 'H03_limites_de_funciones_combinadas.html', 'Límites de funciones combinadas', 'comb-lat', 'Propiedades de límites', ['comblat-idea'], 1)
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
           '\\(|(f(x)-L)+(g(x)-M)|\\le |f(x)-L|+|g(x)-M|\\)', '\\(\\lim_{x\\to a^{-}}[f(x)+g(x)]=L+M\\)', '\\(|f(x)-1|=|x-2|=2-x\\) y \\(|g(x)-4|=|2-x|=2-x\\)', 'el producto no tiene límite en \\(2\\)', 'los laterales de la suma son \\(L+M_{1}\\) y \\(L+M_{2}\\), también distintos', 'tampoco hay límite en \\(2\\)',
           '\\(\\lim_{x\\to 2^{-}}[f(x)+g(x)]=1+4=5\\)', '\\(\\lim_{x\\to 2^{+}}[f(x)+g(x)]=3+2=5\\)', '\\(\\lim_{x\\to 2}[f(x)+g(x)]=5\\)', '\\(s(x)=(x-1)+(6-x)=5\\)', '\\(s(x)=(x+1)+(4-x)=5\\)', 'la resta \\(f(x)-g(x)\\) no tiene límite en \\(2\\)', '\\(\\lim_{x\\to 2}[f(x)-2]^{2}=1\\)',
           '\\(\\lim_{x\\to 0^{-}}u(x)=-2\\) y \\(\\lim_{x\\to 0^{+}}u(x)=2\\); \\(\\lim_{x\\to 0^{-}}v(x)=3\\) y \\(\\lim_{x\\to 0^{+}}v(x)=-3\\)', '\\(\\lim_{x\\to 0}[u(x)\\cdot v(x)]=-6\\)', '\\(\\lim_{x\\to 0}\\dfrac{u(x)}{v(x)}=-\\dfrac{2}{3}\\)', '\\(\\lim_{x\\to 0}[u(x)]^{2}=4\\)',
           '\\(\\lim_{x\\to 1}P(x)=3\\); \\(\\lim_{x\\to 1^{-}}J(x)=0\\) y \\(\\lim_{x\\to 1^{+}}J(x)=2\\)', '\\(\\lim_{x\\to 1}\\{J(x)\\cdot[J(x)-2]\\}=0\\)', '\\(m(x)=2x\\) si \\(x\\lt 1\\) y \\(m(x)=5-x\\) si \\(x\\ge 1\\); \\(n(x)=3-x\\) si \\(x\\lt 1\\) y \\(n(x)=x-1\\) si \\(x\\ge 1\\)', '\\(\\lim_{x\\to 1}[m(x)+n(x)]=4\\)', '\\(\\lim_{x\\to 1}[m(x)-3]^{2}=1\\)',
           '\\(\\lim_{x\\to 3^{-}}F(x)=5\\), \\(\\lim_{x\\to 3^{+}}F(x)=-5\\), \\(\\lim_{x\\to 3^{-}}G(x)=-1\\) y \\(\\lim_{x\\to 3^{+}}G(x)=1\\)', '\\(k(x)=800\\) si \\(x\\lt 10\\) y \\(k(x)=700\\) si \\(x\\ge 10\\)', '\\(e(x)=0\\) si \\(x\\lt 10\\) y \\(e(x)=1000\\) si \\(x\\ge 10\\)', '\\(T(x)=k(x)\\cdot x+e(x)\\)', '\\(\\lim_{x\\to 10}T(x)=8000\\)']:
    ok(z3 in A3, 'H03: la hoja no trae «%s»' % z3)
ok(A3.count('no se puede usar') >= 1 and A3.count('sin demostrar') >= 2 and A3.count('no tiene límite') >= 8, 'H03: avisos')
# <<< H03

# >>> H03 ESPER
ESPER['comblat-idea'] = (7, FUN3)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '03.scene.js'].map(function(a){ return fs.readFileSync"); ok("'03.scene.js'" in NODO2, 'H03: la escena no quedó en la lista de node')
# <<< H03 ESPER

# >>> H04
# ───────── H04: compuesta cuando el límite interno no existe (interna con salto; regla de la compuesta por un lado, demostrada; se comparan los dos lados) ─────────
A4, E4 = molde('04', 'H04_limites_de_funciones_compuestas_cuando_el_limite_interno_no_existe.html', 'Límites de funciones compuestas cuando el límite interno no existe', 'comp-int', 'Propiedades de límites', ['compint-idea'], 1)
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
    ok('\\(g(%s)=%s\\) y \\(f(%s)=%s-%s+8=%s\\)' % (tex(x4), tex(u4), tex(u4), tex(u4*u4), tex(5*u4), tex(h4(x4))) in A4, 'H04 ej1: valores en %s' % tex(x4))
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
# <<< H04

# >>> H04 ESPER
ESPER['compint-idea'] = (7, FUN4)
NODO2 = NODO2.replace("].map(function(a){ return fs.readFileSync", ", '04.scene.js'].map(function(a){ return fs.readFileSync"); ok("'04.scene.js'" in NODO2, 'H04: la escena no quedó en la lista de node')
# <<< H04 ESPER

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
print('Lote 30 H01–H04: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
