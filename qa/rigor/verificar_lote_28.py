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
print('Lote 28 H01: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
