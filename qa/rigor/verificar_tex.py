#!/usr/bin/env python3
"""Tercera pasada de rigor: saca de cada hoja TODAS las fórmulas, y recalcula con fracciones exactas
cada igualdad puramente numérica (a = b = c). No depende de la memoria de quien escribió la hoja.

  python3 qa/rigor/verificar_tex.py archivo1.html archivo2.html ...

Informa: igualdades correctas, igualdades FALSAS y fórmulas numéricas que no supo evaluar (para revisión a mano).
Las fórmulas con letras (álgebra) no se evalúan aquí: se listan solo con --algebra."""
import sys, re, html, pathlib
from fractions import Fraction as F

def raiz(x, n=2):
    x = F(x)
    if x < 0 and n % 2 == 0: raise ValueError('raíz par de negativo')
    s = -1 if x < 0 else 1; x = abs(x)
    def r(v):
        k = round(v ** (1.0 / n))
        for c in (k - 1, k, k + 1):
            if c >= 0 and c ** n == v: return c
        raise ValueError('raíz no exacta')
    return s * F(r(x.numerator), r(x.denominator))

class Q:
    """Racional exacto con potencia de exponente fraccionario por raíz exacta (si no es exacta, error)."""
    def __init__(self, v): self.v = v.v if isinstance(v, Q) else F(v)
    def _o(self, o): return o.v if isinstance(o, Q) else F(o)
    def __add__(self, o): return Q(self.v + self._o(o))
    def __sub__(self, o): return Q(self.v - self._o(o))
    def __mul__(self, o): return Q(self.v * self._o(o))
    def __truediv__(self, o): return Q(self.v / self._o(o))
    def __neg__(self): return Q(-self.v)
    def __pos__(self): return self
    def __pow__(self, o):
        e = self._o(o)
        if e.denominator == 1: return Q(self.v ** e.numerator)
        return Q(raiz(self.v ** e.numerator, e.denominator))
    def __eq__(self, o): return self.v == self._o(o)
    def __str__(self): return str(self.v)

def llaves(s, i):
    """s[i] == '{' -> (contenido, índice siguiente)"""
    d, j = 0, i
    while True:
        if s[j] == '{': d += 1
        elif s[j] == '}':
            d -= 1
            if d == 0: return s[i + 1:j], j + 1
        j += 1

def conv(t):
    """TeX numérico -> expresión de Python con Fraction."""
    t = t.strip()
    out, i = '', 0
    while i < len(t):
        if t.startswith(('\\dfrac', '\\frac', '\\tfrac'), i):
            i = t.index('{', i); a, i = llaves(t, i); b, i = llaves(t, i)
            pre = '+' if re.search(r'\d\s*$', out) else ''      # número mixto: 1\frac{5}{12}
            out += pre + '((' + conv(a) + ')/(' + conv(b) + '))'
        elif t.startswith('\\sqrt', i):
            i += 5; n = '2'
            if i < len(t) and t[i] == '[': j = t.index(']', i); n = t[i + 1:j]; i = j + 1
            a, i = llaves(t, i); out += 'Q(raiz((' + conv(a) + ').v,' + '@' + n + '@))'
        elif t[i] == '^':
            i += 1
            if t[i] == '{': a, i = llaves(t, i)
            else: a, i = t[i], i + 1
            out += '**(' + conv(a) + ')'
        elif t[i] == '{':
            a, i = llaves(t, i); out += '(' + conv(a) + ')'
        else:
            out += t[i]; i += 1
    return out

def limpiar(t):
    t = html.unescape(t)
    t = re.sub(r'\\underbrace\{', '{', t)
    t = re.sub(r'_\{[^{}]*(\{[^{}]*\}[^{}]*)*\}', '', t)
    t = re.sub(r'\\text\{mcm\}\((\d+),\s*(\d+)\)', lambda m: str(__import__('math').lcm(int(m.group(1)), int(m.group(2)))), t)
    t = re.sub(r'\\(?:text|mathrm)\{[^{}]*\}', ' ', t)
    t = re.sub(r'\\frac\{\s*\}\{\s*\}', ' ', t)             # restos de unidades tipo min/h
    t = t.replace('\\left', '').replace('\\right', '').replace('\\big', '').replace('\\,', '').replace('\\ ', ' ').replace('\\!', '')
    t = re.sub(r'(?<![\d.,}])(\d{1,3})((?:\.\d{3})+)(?![\d{])', lambda m: m.group(1) + m.group(2).replace('.', ''), t)   # 16.000 -> 16000; los decimales usan {,}
    t = t.replace('\\cdot', '*').replace('\\times', '*').replace('\\div', '/').replace('{,}', '.')
    return t

def evaluar(lado):
    e = conv(lado)
    e = re.sub(r'\s+', '', e)
    if not e or re.search(r'[A-Za-z\\]', e.replace('Q(raiz', '').replace('.v,', ',')): raise ValueError('no numérico')
    e = re.sub(r'(?<![\w.@])\d+(?:\.\d+)?(?![\w@])', lambda m: "Q(F('%s'))" % m.group(0), e)
    e = e.replace('@', '').replace(')(', ')*(')
    return eval(e, {'F': F, 'Q': Q, 'raiz': raiz})

def formulas(src):
    art = src.split('<!--SCENE-->')[0] if '<!--SCENE-->' in src else re.split(r'<script>\s*window\.MathJax', src)[0]
    for m in re.finditer(r'\\\[(.+?)\\\]|\\\((.+?)\\\)', art, re.S):
        yield (m.group(1) or m.group(2)).strip()

mixtas = 0

def main():
    ver_alg = '--algebra' in sys.argv
    global mixtas
    tot = ok = 0; malas = []; dudosas = []; algebra = []
    for f in [a for a in sys.argv[1:] if not a.startswith('--')]:
        src = pathlib.Path(f).read_text(encoding='utf-8')
        nombre = pathlib.Path(f).name
        for tex in formulas(src):
            for parte in re.split(r'\\qquad|\\quad|\\Longrightarrow|\\Rightarrow|\\\\(?:\[[^\]]*\])?|&(?!lt;|gt;|amp;)|,\s+(?=\d)|\\to\b', tex):
                p = limpiar(parte).strip().rstrip('.,;')
                if '\\approx' in p and not re.search(r'[A-Za-z]', re.sub(r'\\(?:sqrt|dfrac|frac|tfrac|approx)', '', p)) and p.count('\\approx') == 1 and '=' not in p:
                    iz, de = p.split('\\approx'); tot += 1
                    try:
                        import math
                        x = eval(re.sub(r'\s+', '', conv(iz)).replace('Q(raiz((', 'math.pow((').replace(').v,@2@))', '),0.5)'), {'math': math}); dec = len(de.strip().split('.')[1]) if '.' in de else 0
                        if round(x, dec) == float(de): ok += 1
                        else: malas.append((nombre, parte.strip(), [repr(x)]))
                    except Exception as e: dudosas.append((nombre, parte.strip(), 'aproximación no evaluada: %s' % e))
                    continue
                if '\\approx' in p and '=' in p and p.count('\\approx') == 1 and '=' not in p.split('\\approx')[1]:
                    iz, de = p.split('\\approx'); tot += 1
                    try:
                        letras = lambda x: re.search(r'[A-Za-z]', re.sub(r'\\(?:sqrt|dfrac|frac|tfrac)', '', x))
                        vals = [evaluar(x) for x in iz.split('=') if x.strip() and not letras(x)]
                        dec = len(de.strip().split('.')[1]) if '.' in de else 0
                        if vals and all(v == vals[0] for v in vals) and round(float(vals[0].v), dec) == float(de) and vals[0].v != F(de.strip()): ok += 1
                        else: malas.append((nombre, parte.strip(), [str(v) for v in vals] + ['aprox ' + de.strip()]))
                    except Exception as e: dudosas.append((nombre, parte.strip(), 'no evaluada: %s' % e))
                    continue
                if '=' not in p or '\\approx' in p or '\\neq' in p or '<' in p or '>' in p or '\\in' in p or '\\le' in p or '\\ge' in p: 
                    if re.search(r'\d', p) and re.search(r'\\approx|\\neq|<|>', p) and not re.search(r'[a-zA-Z]', re.sub(r'\\[a-zA-Z]+', '', p)): dudosas.append((nombre, parte.strip(), 'comparación o aproximación: revisar a mano'))
                    continue
                lados = [x for x in p.split('=')]
                if re.search(r'[A-Za-z]', re.sub(r'\\(?:sqrt|dfrac|frac|tfrac)', '', p)):
                    letras = lambda x: re.search(r'[A-Za-z]', re.sub(r'\\(?:sqrt|dfrac|frac|tfrac)', '', x))
                    nums = [x for x in lados if x.strip() and not letras(x)]
                    if len(nums) < 2: algebra.append((nombre, parte.strip())); continue
                    lados = nums; mixtas += 1
                tot += 1
                try:
                    vals = [evaluar(x) for x in lados if x.strip()]
                    if len(vals) < 2: raise ValueError('un solo lado')
                    if all(v == vals[0] for v in vals): ok += 1
                    else: malas.append((nombre, parte.strip(), [str(v) for v in vals]))
                except Exception as e:
                    dudosas.append((nombre, parte.strip(), 'no evaluada: %s' % e))
    print('Igualdades numéricas encontradas: %d · correctas: %d · FALSAS: %d · sin evaluar: %d · fórmulas con letras cuyos lados numéricos sí se evaluaron: %d · fórmulas solo con letras (no evaluadas aquí): %d' % (tot, ok, len(malas), len(dudosas), mixtas, len(algebra)))
    for n, p, v in malas: print('FALSA   ', n, '|', p, '|', v)
    for n, p, v in dudosas: print('REVISAR ', n, '|', p[:110], '|', v)
    if ver_alg:
        for n, p in algebra: print('ALGEBRA ', n, '|', p[:120])
    sys.exit(1 if malas else 0)

if __name__ == '__main__':
    main()
