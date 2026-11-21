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
# H03 · sumas de Riemann y notación
from math import sin, cos, sqrt, exp, pi
ok('H03: Σ (3i/n)²(3/n) = 9(n+1)(2n+1)/(2n²), exacto para n = 1…60; n=3 → 14', all(sum(F(3 * i, n) ** 2 * F(3, n) for i in range(1, n + 1)) == F(9 * (n + 1) * (2 * n + 1), 2 * n * n) for n in range(1, 61)) and F(9 * 4 * 7, 18) == 14 and 1 + 4 + 9 == 14)
ok('H03: (n+1)(2n+1) = 2n²+3n+1; límite 9; ∫₀³ x² dx = 9', all((n + 1) * (2 * n + 1) == 2 * n * n + 3 * n + 1 for n in range(1, 30)) and abs(float(F(9 * 10001 * 20001, 2 * 10 ** 8)) - 9) < 2e-3 and cerca(riemann(lambda x: x * x, 0, 3), 9))
ok('H03 animación: n=8 → 10,758; n=60 → 9,226', round(9 * 9 * 17 / (2 * 64), 3) == 10.758 and round(9 * 61 * 121 / (2 * 3600), 3) == 9.226)
ok('H03: lím Σ (2+4i/n)³(4/n) = ∫₂⁶ x³ dx = ∫₀⁴ (2+x)³ dx = 320', abs(sum((2 + 4 * i / 20000) ** 3 * 4 / 20000 for i in range(1, 20001)) - 320) < 0.1 and cerca(riemann(lambda x: x ** 3, 2, 6), 320) and cerca(riemann(lambda x: (2 + x) ** 3, 0, 4), 320))
ok('H03-A: 2(1+4i/n)+1 = 3+8i/n; H03-B: ∫₁⁴ √x; H03-C: 12/n²·n(n+1)/2 = 6+6/n → 6', all(2 * (1 + F(4 * i, 7)) + 1 == 3 + F(8 * i, 7) for i in range(1, 8)) and abs(sum(sqrt(1 + 3 * i / 20000) * 3 / 20000 for i in range(1, 20001)) - riemann(sqrt, 1, 4)) < 1e-3 and all(F(12, n * n) * F(n * (n + 1), 2) == 6 + F(6, n) for n in range(1, 30)) and cerca(riemann(lambda x: 3 * x, 0, 2), 6))

# H04 · TFC y funciones de acumulación
def dnum(g, t, h=1e-5): return (g(t + h) - g(t - h)) / (2 * h)
G = lambda fn, a: (lambda x: riemann(fn, a, x, 20000))
ok('H04: g(x) = ∫₀ˣ 2cos t dt = 2 sen x y g′ = 2 cos x', all(cerca(riemann(lambda t: 2 * cos(t), 0, x), 2 * sin(x)) and cerca(dnum(G(lambda t: 2 * cos(t), 0), x), 2 * cos(x), 1e-4) for x in (0.5, 1.2, 3, 4.5)))
ok('H04 casos: d/dx ∫₁ˣ (t²+1) = x²+1; ∫₀^{x²} cos t → cos(x²)·2x; ∫ₓ³ √(1+t²) → −√(1+x²); ∫ₓ^{x²} e^t → −e^x + e^{x²}·2x', cerca(dnum(G(lambda t: t * t + 1, 1), 1.7), 1.7 ** 2 + 1, 1e-4) and cerca(dnum(lambda x: riemann(cos, 0, x * x, 20000), 1.1), cos(1.21) * 2.2, 1e-4) and cerca(dnum(lambda x: riemann(lambda t: sqrt(1 + t * t), x, 3, 20000), 1.3), -sqrt(1 + 1.69), 1e-4) and cerca(dnum(lambda x: riemann(exp, x, x * x, 20000), 1.2), -exp(1.2) + exp(1.44) * 2.4, 1e-4))
ok('H04-A: √(2³+1) = 3; H04-B: (1/(3x))·3 = 1/x; H04-C: 40+5·4 = 60', 8 + 1 == 9 and cerca(dnum(lambda x: riemann(lambda t: 1 / t, 1, 3 * x, 20000), 2), 0.5, 1e-4) and 40 + 5 * 4 == 60)

# H05 · interpretar funciones de acumulación (f por tramos)
P = [(0, 2), (2, 2), (4, -2), (6, -2), (8, 2)]
def fP(x):
    for (xa, ya), (xb, yb) in zip(P, P[1:]):
        if x <= xb: return ya + (yb - ya) * (x - xa) / (xb - xa)
    return 2
gP = lambda x: riemann(fP, 0, x, 40000)
ok('H05: f(3) = 0 y f(7) = 0', fP(3) == 0 and fP(7) == 0)
ok('H05: g(2)=4, g(3)=5, g(4)=4, g(6)=0, g(7)=−1, g(8)=0, g(5)=2', all(cerca(gP(x), v, 1e-4) for x, v in ((2, 4), (3, 5), (4, 4), (6, 0), (7, -1), (8, 0), (5, 2))))
ok('H05-A: h(6) = −4, h(8) = −4, h = g − 4', cerca(riemann(fP, 4, 6, 40000), -4, 1e-4) and cerca(riemann(fP, 4, 8, 40000), -4, 1e-4))
ok('H05-B: f(t) = t − 3; g(3) = −9/2; g(6) = 0', cerca(riemann(lambda t: t - 3, 0, 3), -4.5) and cerca(riemann(lambda t: t - 3, 0, 6), 0))

print('\nERRORES:', err); raise SystemExit(1 if err else 0)
