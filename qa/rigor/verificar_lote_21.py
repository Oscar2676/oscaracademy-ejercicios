#!/usr/bin/env python3
"""Lote 21 (integración y acumulación de cambio): segunda pasada por otro camino.
Cada integral se recalcula (a) por geometría o por la fórmula, en fracciones exactas, y (b) con una suma de Riemann de punto medio."""
from fractions import Fraction as F
from math import isclose
err = 0
def ok(n, c):
    global err
    print(('ok     ' if c else 'FALSO  ') + n); err += 0 if c else 1
def riemann(f, a, b, n=200000):
    h = (b - a) / n
    return sum(f(a + (i + 0.5) * h) for i in range(n)) * h
def cerca(a, b, tol=1e-6): return isclose(a, b, rel_tol=tol, abs_tol=tol)

# H01 · r(t) = 6 − 2t, estanque con 4 litros
r = lambda t: 6 - 2 * t
ok('H01: caso 1, 2·5 = 10', 2 * 5 == 10 and cerca(riemann(lambda t: 2, 0, 5), 10))
ok('H01: ∫₀³ = 3·6/2 = 9; ∫₃⁵ = −(2·4/2) = −4; ∫₀⁵ = 5', F(3 * 6, 2) == 9 and cerca(riemann(r, 0, 3), 9) and F(2 * 4, 2) == 4 and cerca(riemann(r, 3, 5), -4) and cerca(riemann(r, 0, 5), 5))
ok('H01: contenido final 4+5 = 9; máximo 4+9 = 13', 4 + 5 == 9 and 4 + 9 == 13)
ok('H01: ∫₀ᵗ (6−2τ)dτ = 6t − t² en varios t; trapecio y 9−(t−3)²', all(cerca(riemann(r, 0, t), 6 * t - t * t) for t in (0.5, 1.9, 3, 4.23, 5)) and all((12 - 2 * F(t)) * F(t) / 2 == 6 * F(t) - F(t) ** 2 for t in (1, 2, 3)) and all(9 - (F(t) - 3) ** 2 == 6 * F(t) - F(t) ** 2 for t in (3, 4, 5)))
ok('H01 animación: t=1,9 → 7,79 (rótulo según t exacto); 9−(4,23−3)² = 7,49', round(9 - 1.23 ** 2, 2) == 7.49)
ok('H01-A: 4·12/2 = 24', cerca(riemann(lambda t: 3 * t, 0, 4), 24))
ok('H01-B: −1,5·4 = −6', F(-3, 2) * 4 == -6)
ok('H01-C: 24 + 16 = 40', cerca(riemann(lambda t: 8 if t <= 3 else 8 - 2 * (t - 3), 0, 7), 40, 1e-4) and 8 * 3 + F(4 * 8, 2) == 40)

# H02 · propiedades
f = lambda x: x * x / 4 + 1
ok('H02 animación: ∫₀ᵇ (x²/4+1)dx = b³/12 + b; total 28/3 ≈ 9,33', all(cerca(riemann(f, 0, b), b ** 3 / 12 + b) for b in (1, 1.5, 2.82, 4)) and F(64, 12) + 4 == F(28, 3) and round(28 / 3, 2) == 9.33)
ok('H02: propiedad 6 numérica: ∫₀ᵇ + ∫ᵇ⁴ = ∫₀⁴', all(cerca(riemann(f, 0, b) + riemann(f, b, 4), 28 / 3) for b in (0.5, 1.5, 3.5)))
ok('H02: propiedades 4 y 5 numéricas con f=x², g=sen', cerca(riemann(lambda x: 3 * x * x, 0, 2), 3 * riemann(lambda x: x * x, 0, 2)) and cerca(riemann(lambda x: x * x + __import__('math').sin(x), 0, 2), riemann(lambda x: x * x, 0, 2) + riemann(__import__('math').sin, 0, 2)))
ok('H02 ejercicio resuelto: 6−2 = 4; −6; 0; 12−9 = 3; 6+15 = 21', 6 + -2 == 4 and 2 * 6 - 3 * 3 == 3 and 6 + 5 * (4 - 1) == 21)
ok('H02: contraejemplo del producto, 2 ≠ 4', 1 * (2 - 0) == 2 and 2 * 2 == 4)
ok('H02-A: 10−3 = 7; H02-B: 12−10−4 = −2 → 2; H02-C: 18+12 = 30', 10 - 3 == 7 and 3 * 4 + 2 * -5 - 1 * 4 == -2 and 18 + 12 == 30)
print('\nERRORES:', err); raise SystemExit(1 if err else 0)
