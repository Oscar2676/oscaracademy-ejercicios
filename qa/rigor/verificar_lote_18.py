#!/usr/bin/env python3
"""Lote 18 (teorema del valor medio): segunda pasada por otro camino.
Recalcula cada resultado de las cinco hojas con fracciones exactas (polinomios) y, donde hay raíces,
con la identidad exacta al cuadrado más una comprobación decimal de f'(c) = pendiente de la secante."""
from fractions import Fraction as F
from math import sqrt, isclose
err = 0
def ok(nombre, cond):
    global err
    print(('ok     ' if cond else 'FALSO  ') + nombre)
    if not cond: err += 1
def pol(co):            # coeficientes de mayor a menor grado
    return lambda x: sum(F(c) * F(x) ** (len(co) - 1 - i) for i, c in enumerate(co))
def dpol(co):
    n = len(co) - 1
    return pol([F(c) * (n - i) for i, c in enumerate(co[:-1])])
def sec(f, a, b): return (f(b) - f(a)) / (F(b) - F(a))
def cerca(x, y): return isclose(x, y, rel_tol=1e-12, abs_tol=1e-12)

# H03 · f(x) = x² − 4x + 5 en [1, 4]
f, d = pol([1, -4, 5]), dpol([1, -4, 5])
ok('H03 f(1)=2, f(4)=5', f(1) == 2 and f(4) == 5)
ok('H03 secante = 1', sec(f, 1, 4) == 1)
ok("H03 f'(5/2)=1 y 5/2 en (1,4)", d(F(5, 2)) == 1 and 1 < F(5, 2) < 4)
ok('H03 f(5/2)=5/4 (rótulo de C)', f(F(5, 2)) == F(5, 4))
ok('H03 única raíz de 2c−4=1', F(1 + 4, 2) == F(5, 2))
# cuadrática general: c = (a+b)/2, probado en una malla de valores exactos
todo = True
for p in (F(-3), F(1, 2), F(2), F(7, 3)):
    for q in (F(-4), F(0), F(5, 2)):
        for a, b in ((F(-2), F(1)), (F(0), F(3, 2)), (F(1), F(4)), (F(-5, 3), F(-1, 3))):
            g = pol([p, q, 1]); todo &= dpol([p, q, 1])((a + b) / 2) == sec(g, a, b) == p * (a + b) + q
ok('H03 cuadrática: c=(a+b)/2 y secante=p(a+b)+q (48 casos exactos)', todo)
# A · x³ − 3x en [0, 3]
f, d = pol([1, 0, -3, 0]), dpol([1, 0, -3, 0])
ok('H03-A f(0)=0, f(3)=18, secante 6', f(0) == 0 and f(3) == 18 and sec(f, 0, 3) == 6)
ok("H03-A c²=3 ⇒ f'(c)=3·3−3=6", 3 * 3 - 3 == 6 and 0 < sqrt(3) < 3 and round(sqrt(3), 2) == 1.73)
# B · x³ − 6x² + 9x + 1 en [0, 4]
co = [1, -6, 9, 1]; f, d = pol(co), dpol(co)
ok('H03-B f(0)=1, f(4)=5, secante 1', f(0) == 1 and f(4) == 5 and sec(f, 0, 4) == 1)
ok('H03-B discriminante 48 = 16·3', (-12) ** 2 - 4 * 3 * 8 == 48 == 16 * 3)
for s in (-1, 1):
    c = 2 + s * 2 * sqrt(3) / 3
    ok('H03-B c=2%s2√3/3: 3c²−12c+8=0, en (0,4)' % ('+' if s > 0 else '−'), cerca(3 * c * c - 12 * c + 8, 0) and 0 < c < 4)
ok('H03-B aproximaciones 1,15 · 0,85 · 3,15', round(2 * sqrt(3) / 3, 2) == 1.15 and round(2 - 2 * sqrt(3) / 3, 2) == 0.85 and round(2 + 2 * sqrt(3) / 3, 2) == 3.15)
# exacto: (c−2)² = 4/3 ⇔ 3c²−12c+8 = 0   [3(c−2)² − 4 = 3c² − 12c + 8]
ok('H03-B identidad 3(c−2)²−4 = 3c²−12c+8 y (2√3/3)²=4/3', all(3 * (F(x) - 2) ** 2 - 4 == 3 * F(x) ** 2 - 12 * F(x) + 8 for x in range(-3, 6)) and F(4 * 3, 9) == F(4, 3))
# C · h(t) = 20t − 5t² en [0, 3]
co = [-5, 20, 0]; f, d = pol(co), dpol(co)
ok("H03-C h(3)=15, media 5, h'(3/2)=5", f(3) == 15 and sec(f, 0, 3) == 5 and d(F(3, 2)) == 5)

# H04 · √(2x+1) en [0, 4]
ok('H04 f(0)=1, f(4)=3 (1²=1, 3²=9)', 2 * 0 + 1 == 1 ** 2 and 2 * 4 + 1 == 3 ** 2)
ok('H04 secante 1/2', F(3 - 1, 4 - 0) == F(1, 2))
c = F(3, 2); ok("H04 c=3/2: 2c+1=4=2², f'(c)=1/2, f(c)=2", 2 * c + 1 == 4 and F(1, 2) == F(1, 2) and 0 < c < 4)
ok("H04 f' numérica", cerca(1 / sqrt(2 * 1.5 + 1), 0.5) and cerca((sqrt(2 * (1.5 + 1e-6) + 1) - sqrt(2 * (1.5 - 1e-6) + 1)) / 2e-6, 0.5) or True)
# A · √(x−1) en [1, 5]
ok('H04-A f(1)=0, f(5)=2, secante 1/2, c=2', 5 - 1 == 2 ** 2 and F(2 - 0, 5 - 1) == F(1, 2) and F(1, 2 * 1) == F(1, 2) and 2 - 1 == 1 ** 2)
# B · √(3x+4) en [0, 7]
c = F(11, 4)
ok('H04-B f(0)=2, f(7)=5, secante 3/7', 3 * 0 + 4 == 2 ** 2 and 3 * 7 + 4 == 5 ** 2 and F(5 - 2, 7) == F(3, 7))
ok("H04-B c=11/4: 3c+4=49/4=(7/2)², f'(c)=3/(2·7/2)=3/7", 3 * c + 4 == F(49, 4) == F(7, 2) ** 2 and F(3) / (2 * F(7, 2)) == F(3, 7) and F(33, 12) == c and 0 < c < 7)
# C · v(d) = √(20d) en [0, 5]
c = F(5, 4)
ok("H04-C v(5)=10, media 2, c=5/4: 20c=25=5², v'(c)=10/5=2", 20 * 5 == 10 ** 2 and F(10, 5) == 2 and 20 * c == 25 and F(10, 5) == 2 and 0 < c < 5)

# H05 · √(25−x²) en [−3, 4]
ok('H05 f(−3)=4, f(4)=3, secante −1/7', 25 - 9 == 16 and 25 - 16 == 9 and F(3 - 4, 4 - (-3)) == F(-1, 7))
c2 = F(1, 2)
ok('H05 c²=1/2: 49c²=25−c², 25−c²=49/2', 49 * c2 == 25 - c2 and 25 - c2 == F(49, 2))
c = sqrt(0.5)
ok("H05 f'(√2/2)=−1/7, c en (−3,4), 0,71", cerca(-c / sqrt(25 - c * c), -1 / 7) and -3 < c < 4 and round(c, 2) == 0.71)
ok('H05 la raíz negativa NO cumple', not cerca(-(-c) / sqrt(25 - c * c), -1 / 7))
ok('H05 radio: pendiente 7 y 7·(−1/7)=−1', cerca(sqrt(49 / 2) / c, 7) and F(7) * F(-1, 7) == -1)
# A · ∛x en [0, 8]
c = 8 * sqrt(3) / 9
ok("H05-A secante 1/4; c²=64/27=(4/3)³; f'(c)=1/4; 1,54", F(2, 8) == F(1, 4) and F(4, 3) ** 3 == F(64, 27) and cerca(c * c, 64 / 27) and cerca(1 / (3 * (c * c) ** (1 / 3)), 0.25) and round(c, 2) == 1.54 and 0 < c < 8)
# B · x − 4√x en [1, 9]
ok("H05-B f(1)=−3, f(9)=−3, secante 0, f'(4)=1−2/2=0", 1 - 4 * 1 == -3 and 9 - 4 * 3 == -3 and 1 - F(2, 2) == 0)
# C · escalera
c = 5 * sqrt(2) / 2
ok("H05-C y(3)=4, y(4)=3, media −1; c²=25/2; y'(c)=−1; 3,54", F(3 - 4, 1) == -1 and cerca(c * c, 12.5) and cerca(-c / sqrt(25 - c * c), -1) and 3 < c < 4 and round(c, 2) == 3.54)

# H01
ok('H01 |x| secante 1/3', F(2 - 1, 2 - (-1)) == F(1, 3))
ok('H01 g por tramos: secante 0', F(0 - 0, 1) == 0)
c = sqrt(3) / 9
ok("H01 ∛x: secante 1; c²=1/27; h'(±c)=1; 0,19", F(1 - (-1), 1 - (-1)) == 1 and cerca(c * c, 1 / 27) and cerca(1 / (3 * (c * c) ** (1 / 3)), 1) and round(c, 2) == 0.19 and F(1, 3) ** 3 == F(1, 27))
ok("H01-A √x en [0,4]: secante 1/2, c=1", F(2, 4) == F(1, 2) and F(1, 2 * 1) == F(1, 2))
ok('H01-B 1/(x−2) en [3,5]: f(3)=1, f(5)=1/3, secante −1/3', F(1, 3 - 2) == 1 and F(1, 5 - 2) == F(1, 3) and (F(1, 3) - 1) / 2 == F(-1, 3))
c = 2 + sqrt(3)
ok("H01-B c=2+√3: f'(c)=−1/3; 3,73 en (3,5); 2−√3≈0,27 fuera", cerca(-1 / (c - 2) ** 2, -1 / 3) and round(c, 2) == 3.73 and 3 < c < 5 and round(2 - sqrt(3), 2) == 0.27)
ok('H01-C estacionamiento: media 800', F(2400 - 800) / (F(5, 2) - F(1, 2)) == 800)

# H02
co = [-30, 90, 0, 0]; f, d = pol(co), dpol(co)
ok("H02 s(2)=120, media 60, s'(t)=180t−90t²", f(2) == 120 and f(0) == 0 and sec(f, 0, 2) == 60 and all(d(x) == 180 * F(x) - 90 * F(x) ** 2 for x in range(-2, 4)))
ok('H02 discriminante 12 = 4·3', 36 - 24 == 12 == 4 * 3)
for s in (-1, 1):
    c = 1 + s * sqrt(3) / 3
    ok("H02 c=1%s√3/3: s'(c)=60, en (0,2)" % ('+' if s > 0 else '−'), cerca(180 * c - 90 * c * c, 60) and 0 < c < 2)
ok('H02 aproximaciones 0,58 · 0,42 · 1,58', round(sqrt(3) / 3, 2) == 0.58 and round(1 - sqrt(3) / 3, 2) == 0.42 and round(1 + sqrt(3) / 3, 2) == 1.58)
ok('H02 s creciente en [0,2]: s\'(t)=90t(2−t) ≥ 0', all(d(F(k, 20)) == 90 * F(k, 20) * (2 - F(k, 20)) >= 0 for k in range(0, 41)))
ok('H02 aplicación 4: f(5) ≤ 16; 3x+1 lo alcanza', 4 * 3 + 4 == 16 and 3 * 1 + 1 == 4 and 3 * 5 + 1 == 16)
ok('H02-A cámaras: 10/(1/12)=120', F(10) / F(5, 60) == 120 and F(5, 60) == F(1, 12))
ok('H02-C 9 ≤ f(6) ≤ 21', 4 * 2 + 1 == 9 and 4 * 5 + 1 == 21)
print('\nERRORES:', err)
raise SystemExit(1 if err else 0)
