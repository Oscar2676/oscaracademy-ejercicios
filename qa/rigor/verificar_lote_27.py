#!/usr/bin/env python3
"""Verifica las cuentas del lote 27 (cálculo multivariable)."""
from math import sqrt, exp, cos, sin, pi, isclose, e
from fractions import Fraction as F
err = 0
def ok(c, m):
    global err
    if not c: err += 1; print('ERROR', m)
def par(f, a, b, h=1e-6): return (f(a + h, b) - f(a - h, b))/(2*h), (f(a, b + h) - f(a, b - h))/(2*h)
f1 = lambda x, y: 3 - x*x/2 - y*y/4
ok(f1(1, 1) == 2.25 and all(isclose(u, w, abs_tol=1e-6) for u, w in zip(par(f1, 1, 1), (-1, -0.5))) and F(9, 4) + 1 + F(1, 2) == F(15, 4) and F(15, 4) - 1 - F(1, 2) == F(9, 4), 'e1')
f2 = lambda x, y: x*x*y + y**3
ok(f2(1, 2) == 10 and all(isclose(u, w, abs_tol=1e-5) for u, w in zip(par(f2, 1, 2), (4, 13))) and 10 - 4 - 26 == -20, 'e2')
f3 = lambda x, y: sqrt(x*x + y*y)
L3 = 5 + 0.6*0.02 + 0.8*(-0.03); ok(isclose(L3, 4.988) and all(isclose(u, w, abs_tol=1e-6) for u, w in zip(par(f3, 3, 4), (0.6, 0.8))) and abs(f3(3.02, 3.97) - 4.98812) < 1e-5 and abs(f3(3.02, 3.97) - L3) < 2e-4, 'e3')
f4 = lambda x, y: exp(x)*cos(y)
ok(all(isclose(u, w, abs_tol=1e-6) for u, w in zip(par(f4, 0, 0), (1, 0))) and abs(f4(0.1, 0.1) - 1.0996) < 6e-5 and abs(1.1 - f4(0.1, 0.1) - 0.0004) < 6e-5 and abs(f4(1, 1) - 1.469) < 5e-4, 'e4')
fA = lambda x, y: x*x + y*y
ok(fA(1, 2) == 5 and 5 - 2 - 8 == -5 and all(isclose(u, w, abs_tol=1e-5) for u, w in zip(par(fA, 1, 2), (2, 4))), 'A')
fB = lambda x, y: x**3*y**2
ok(fB(2, 3) == 72 and all(isclose(u, w, abs_tol=1e-4) for u, w in zip(par(fB, 2, 3), (108, 48))) and isclose(72 - 2.16 + 0.48, 70.32) and abs(fB(1.98, 3.01) - 70.328) < 5e-4, 'B')
dV = 80*pi*0.1 + 16*pi*0.2
ok(isclose(dV, 11.2*pi) and abs(dV - 35.19) < 0.005 and abs(160*pi - 502.65) < 0.005 and abs(dV/(160*pi) - 0.07) < 0.001 and isclose(4.1**2*10.2 - 160, 11.462) and abs(11.462*pi - 36.01) < 0.005, 'C')
# el plano de la animación contiene a las dos rectas tangentes y toca a la superficie en P
a, b = 0.8, 0.6; z0 = f1(a, b); m, n = -a, -b/2
ok(isclose(z0, 2.59) and all(isclose(u, w, abs_tol=1e-6) for u, w in zip(par(f1, a, b), (m, n))), 'anim')
print('Lote 27 H01:', 'sin errores' if not err else f'{err} errores')
