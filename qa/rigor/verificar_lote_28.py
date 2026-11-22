#!/usr/bin/env python3
"""Lote 28 · Determinantes: comprobación exacta de las cuentas de las hojas."""
from fractions import Fraction as Fr
import itertools, sys
err = []
def ok(c, m):
    if not c: err.append(m)
def det2(a, b, c, d): return a*d - b*c
# H01 · ejemplos y ejercicios
ok(det2(3, 5, 2, 4) == 2, 'H01 ej1'); ok(det2(-2, 3, 4, -1) == -10, 'H01 ej2'); ok(det2(6, 9, 4, 6) == 0, 'H01 ej3')
ok(Fr(3, 2)*6 == 9 and Fr(3, 2)*4 == 6, 'H01 ej3 múltiplo')
for x in (3, -2): ok(det2(x, 2, 3, x - 1) == 0 and x*x - x - 6 == 0, 'H01 ej4 x=%d' % x)
ok(det2(5, -2, 3, 4) == 26, 'H01 A'); ok(det2(1, 2, 3, 4) == -2, 'H01 error frecuente')
for k in (6, -6): ok(det2(k, 4, 9, k) == 0, 'H01 B k=%d' % k)
ok(Fr(3, 2)*4 == 6 and Fr(3, 2)*6 == 9 and Fr(-3, 2)*4 == -6 and Fr(-3, 2)*(-6) == 9, 'H01 B múltiplos')
ok(det2(30, 10, 10, 40) == 1100 and (30 + 10, 10 + 40) == (40, 50), 'H01 C')
# H01 · identidades (se prueban en una rejilla de enteros; son identidades polinómicas de grado <= 4)
R = range(-3, 4)
for a, b, c, d in itertools.product(R, repeat=4):
    ok((a + b)*(c + d) - 2*b*c - a*c - b*d == a*d - b*c, 'H01 rectángulo menos piezas')
    ok((a*a + c*c)*(b*b + d*d) - (a*b + c*d)**2 == (a*d - b*c)**2, 'H01 área al cuadrado')
# figura de la animación: a=3, c=1, b=1, d=2 (área por la fórmula del cordón)
P = [(0, 0), (3, 1), (4, 3), (1, 2)]
sh = sum(P[i][0]*P[(i + 1) % 4][1] - P[(i + 1) % 4][0]*P[i][1] for i in range(4))
ok(Fr(abs(sh), 2) == det2(3, 1, 1, 2) == 5, 'H01 figura')
# H02 · tercer orden
def det3(m):
    (a, b, c), (d, e, f), (g, h, i) = m
    return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
ok(det3([[1, 2, 3], [0, 4, 5], [1, 0, 6]]) == 22 and (24, -5, -4) == (4*6 - 5*0, 0*6 - 5*1, 0*0 - 4*1), 'H02 ej1')
ok(det3([[2, -1, 0], [3, 1, -2], [-1, 4, 5]]) == 39 and 1*5 - (-2)*4 == 13 and 3*5 - (-2)*(-1) == 13, 'H02 ej2')
ok(det3([[2, 5, -1], [0, 3, 4], [0, 0, -2]]) == -12 == 2*3*(-2), 'H02 ej3')
for x in (2, -1): ok(det3([[x, 1, 0], [2, x, 1], [0, 1, 1]]) == 0 == x*x - x - 2, 'H02 ej4 x=%d' % x)
ok(det3([[3, 0, 2], [1, -1, 4], [2, 1, 0]]) == -6, 'H02 A')
ok(det3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == 0 and (45 - 48, 36 - 42, 32 - 35) == (-3, -6, -3), 'H02 B')
ok(all(c1 - 2*c2 + c3 == 0 for c1, c2, c3 in zip((1, 4, 7), (2, 5, 8), (3, 6, 9))), 'H02 B combinación')
ok(det3([[40, 10, 5], [0, 30, 5], [0, 0, 20]]) == 24000 and 30*20 == 600, 'H02 C')
for m in itertools.product(range(-2, 3), repeat=9):
    if m[0] % 2 or m[4] % 2: continue  # submuestra de la rejilla (identidad polinómica)
    a, b, c, d, e, f, g, h, i = m
    ok(det3([[a, b, c], [d, e, f], [g, h, i]]) == a*e*i + b*f*g + c*d*h - c*e*g - a*f*h - b*d*i, 'H02 seis productos')
for h in (Fr(-2), Fr(0), Fr(5, 2)): ok(det3([[2, 1, Fr(1, 2)], [0, 2, Fr(1, 2)], [0, 0, h]]) == 4*h, 'H02 escena volumen')
print('Lote 28 H01–H02: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
