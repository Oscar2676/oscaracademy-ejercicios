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
# H03
g1 = lambda x, y: 3 - (x*x + y*y)/2
ok(all(isclose(g1(sqrt(2*(3 - c))*cos(t), sqrt(2*(3 - c))*sin(t)), c) for c in (2, 1, 2.5, 2.875) for t in (0.3, 2, 4.4)) and abs(sqrt(2) - 1.41) < 0.005 and sqrt(2*(3 - 1)) == 2, 'H03 e1')
g2 = lambda x, y: sqrt(9 - x*x - y*y)
ok(g2(0, 0) == 3 and g2(3, 0) == 0 and all(isclose(g2(sqrt(9 - c*c)*cos(t), sqrt(9 - c*c)*sin(t)), c, abs_tol=1e-9) for c in (1, 2, 2.5) for t in (0.5, 3)), 'H03 e2')
ok(all((x*x - x*x) == 0 for x in (1, -2.5)) and all(isclose(x*x - y*y, c) for c, x, y in ((1, sqrt(1 + 4), 2), (-1, 1.5, sqrt(1 + 2.25)))), 'H03 e3')
ok(all(2*x + (-2*x + c) == c for x in (0, 1.5) for c in (0, 1, 2)), 'H03 e4')
ok(all(isclose((2*cos(t))**2 + 4*(sin(t))**2, 4) for t in (0, 1, 2.5)), 'H03 A'); ok(isclose(sqrt(7 - 3), 2) and 7 - 4 == 3, 'H03 B')
h = lambda x, y: 500 - 20*(x*x + y*y)
ok(h(2, 0) == 420 and h(0, 3) == 320 and 500 - 420 == 80 and 420 - 320 == 100, 'H03 C')
# galería: las curvas de nivel dibujadas están a la altura c
ok(all(isclose((2*c*cos(t)**2 + 2*c*sin(t)**2)/2, c) for c in (0.5, 2) for t in (1, 4)) and all(isclose(((2*c + t*t) - t*t)/2, c) for c in (0.5, 1.5) for t in (-1, 0.7)) and all(isclose(1 + (2*(c - 1) - y/2)/2 + y/4, c, abs_tol=1e-12) for c in (0, 1.3) for y in (-2, 0.4)), 'H03 galería')
print('Lote 27 H01 y H03:', 'sin errores' if not err else f'{err} errores')
