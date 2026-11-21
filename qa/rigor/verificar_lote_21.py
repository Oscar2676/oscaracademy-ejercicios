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

# H06–H10 · antiderivadas y técnicas: cada antiderivada se deriva numéricamente y se compara con el integrando
from math import log, atan, e
def anti(Fn, fn, xs, tol=1e-5): return all(cerca(dnum(Fn, x), fn(x), tol) for x in xs)
ok('H06: tabla básica (kx, xⁿ⁺¹/(n+1), ln|x|, eˣ, sen, −cos, tan)', anti(lambda x: 7 * x, lambda x: 7, (0.3, 2)) and anti(lambda x: x ** 4 / 4, lambda x: x ** 3, (0.5, 2)) and anti(lambda x: log(abs(x)), lambda x: 1 / x, (-2, 0.7, 3)) and anti(exp, exp, (0.2, 1.5)) and anti(sin, cos, (0.4, 2)) and anti(lambda x: -cos(x), sin, (0.4, 2)) and anti(lambda x: sin(x) / cos(x), lambda x: 1 / cos(x) ** 2, (0.3, 1.1)))
ok('H06: ∫(6x²−4x+5)dx = 2x³−2x²+5x; F(3)=51, F(1)=5; ∫₁³ = 46', anti(lambda x: 2 * x ** 3 - 2 * x * x + 5 * x, lambda x: 6 * x * x - 4 * x + 5, (-1, 0.5, 2)) and 54 - 18 + 15 == 51 and 2 - 2 + 5 == 5 and cerca(riemann(lambda x: 6 * x * x - 4 * x + 5, 1, 3), 46))
ok('H06-A: x⁴+2ln x−3eˣ; H06-B: ∫₀^π sen = 2; H06-C: 0,3t², 120−30 = 90', anti(lambda x: x ** 4 + 2 * log(x) - 3 * exp(x), lambda x: 4 * x ** 3 + 2 / x - 3 * exp(x), (0.5, 2)) and cerca(riemann(sin, 0, pi), 2) and cerca(riemann(lambda t: 0.6 * t, 10, 20), 90))
ok('H07: xⁿ⁺¹/(n+1) para n = 4, −3, 1/2, −1/2, −2', all(anti(lambda x, n=n: x ** (n + 1) / (n + 1), lambda x, n=n: x ** n, (0.6, 1.7, 3)) for n in (4, -3, 0.5, -0.5, -2)))
ok('H07: ∫x⁻³ = −1/(2x²); ∫√x = (2/3)x^{3/2}; ∫(x+2/x) = x²/2+2ln|x|; ln(−x)′ = 1/x', anti(lambda x: -1 / (2 * x * x), lambda x: x ** -3, (0.7, 2)) and anti(lambda x: 2 / 3 * x ** 1.5, sqrt, (0.7, 2)) and anti(lambda x: x * x / 2 + 2 * log(abs(x)), lambda x: (x ** 3 + 2 * x) / x ** 2, (-2, 0.7, 3)) and anti(lambda x: log(-x), lambda x: 1 / x, (-3, -0.5)))
ok('H07 animación: ∫₀¹ xⁿ dx = 1/(n+1) para n = 0…4 y n = 1,45 → 0,408', all(cerca(riemann(lambda x, n=n: x ** n, 0, 1), 1 / (n + 1), 1e-5) for n in (0, 1, 2, 3, 4)) and round(1 / 2.45, 3) == 0.408)
ok('H07-A: x⁵+6/x; H07-B: 2√4−2√1 = 2; H07-C: −12+48 = 36', anti(lambda x: x ** 5 + 6 / x, lambda x: 5 * x ** 4 - 6 / x ** 2, (0.7, 2)) and cerca(riemann(lambda x: 1 / sqrt(x), 1, 4), 2) and cerca(riemann(lambda t: 48 / t ** 2, 1, 4), 36))
ok('H08: sen(x²); (1/3)(x²+1)^{3/2}; e^{3x}/3', anti(lambda x: sin(x * x), lambda x: 2 * x * cos(x * x), (0.3, 1, 1.6)) and anti(lambda x: (x * x + 1) ** 1.5 / 3, lambda x: x * sqrt(x * x + 1), (0.3, 1, 2)) and anti(lambda x: exp(3 * x) / 3, lambda x: exp(3 * x), (0.1, 0.8)))
ok('H08: ∫₀² x(x²+1)³ dx = (1/2)(625/4 − 1/4) = 78', F(1, 2) * (F(625, 4) - F(1, 4)) == 78 and cerca(riemann(lambda x: x * (x * x + 1) ** 3, 0, 2), 78))
ok('H08 animación: ∫₀ˣ 2t cos(t²)dt = sen(x²); x=0,81 → 0,605 (rótulo según x exacto)', all(cerca(riemann(lambda t: 2 * t * cos(t * t), 0, x), sin(x * x)) for x in (0.4, 0.9, 1.2)) and cerca(sqrt(pi / 2) ** 2, pi / 2))
ok('H08-A: (x³+x)⁶/6; H08-B: ln 2 ≈ 0,69; H08-C: 60(1/e − 1) ≈ −37,9', anti(lambda x: (x ** 3 + x) ** 6 / 6, lambda x: (3 * x * x + 1) * (x ** 3 + x) ** 5, (0.3, 0.9)) and cerca(riemann(lambda x: 2 * x / (x * x + 1), 0, 1), log(2)) and round(log(2), 2) == 0.69 and cerca(riemann(lambda t: -12 * exp(-0.2 * t), 0, 5), 60 * (1 / e - 1)) and round(60 * (1 / e - 1), 1) == -37.9 and round(1 / e - 1, 3) == -0.632)
ok('H09 ej.1: (x+1)(x+2)+3 = x²+3x+5; antiderivada x²/2+2x+3ln|x+1|', all((x + 1) * (x + 2) + 3 == x * x + 3 * x + 5 for x in range(-5, 6)) and anti(lambda x: x * x / 2 + 2 * x + 3 * log(abs(x + 1)), lambda x: (x * x + 3 * x + 5) / (x + 1), (-3, 0.5, 2)))
ok('H09 ej.2: x²+4x+13 = (x+2)²+9; discriminante −36; (1/3)arctan((x+2)/3)', all(x * x + 4 * x + 13 == (x + 2) ** 2 + 9 for x in range(-6, 6)) and 16 - 52 == -36 and anti(lambda x: atan((x + 2) / 3) / 3, lambda x: 1 / (x * x + 4 * x + 13), (-5, -2, 0, 4)))
ok('H09: fórmula (1/a)arctan(u/a) con a = 2, 3, 5; ej.3: x + (1/3)arctan((x+2)/3)', all(anti(lambda u, a=a: atan(u / a) / a, lambda u, a=a: 1 / (u * u + a * a), (-1, 0.5, 3)) for a in (2, 3, 5)) and anti(lambda x: x + atan((x + 2) / 3) / 3, lambda x: (x * x + 4 * x + 14) / (x * x + 4 * x + 13), (-3, 0, 2)))
ok('H09 animación: área de −2 a 1 = π/12 ≈ 0,262; a 7,07 ≈ 0,417; tope π/6 ≈ 0,524; máximo 1/9', round(pi / 12, 3) == 0.262 and round(atan(9.07 / 3) / 3, 3) == 0.417 and round(pi / 6, 3) == 0.524 and cerca(riemann(lambda x: 1 / (x * x + 4 * x + 13), -2, 1), pi / 12))
ok('H09-A: (x−2)(2x+3)+10 = 2x²−x+4; H09-B: (x−3)²+4, (1/2)arctan((x−3)/2); H09-C: π/12 ≈ 0,26', all((x - 2) * (2 * x + 3) + 10 == 2 * x * x - x + 4 for x in range(-5, 6)) and anti(lambda x: x * x + 3 * x + 10 * log(abs(x - 2)), lambda x: (2 * x * x - x + 4) / (x - 2), (-1, 0.5, 4)) and anti(lambda x: atan((x - 3) / 2) / 2, lambda x: 1 / (x * x - 6 * x + 13), (0, 3, 5)) and round(pi / 12, 2) == 0.26)
ok('H10 ej.1: 2/(x−1) − 1/(x+3) = (x+7)/((x−1)(x+3)), exacto; antiderivada', all(F(2, x - 1) - F(1, x + 3) == F(x + 7, (x - 1) * (x + 3)) for x in (-7, -2, 0, 2, 5, 9)) and anti(lambda x: 2 * log(abs(x - 1)) - log(abs(x + 3)), lambda x: (x + 7) / ((x - 1) * (x + 3)), (-5, 0, 2, 6)))
ok('H10 ej.2: 2(x+1)+3(x−2) = 5x−4; ej.3: 3(x+1)+2 = 3x+5; antiderivadas', all(2 * (x + 1) + 3 * (x - 2) == 5 * x - 4 and 3 * (x + 1) + 2 == 3 * x + 5 for x in range(-5, 6)) and anti(lambda x: 2 * log(abs(x - 2)) + 3 * log(abs(x + 1)), lambda x: (5 * x - 4) / (x * x - x - 2), (-3, 0, 4)) and anti(lambda x: 3 * log(abs(x + 1)) - 2 / (x + 1), lambda x: (3 * x + 5) / (x + 1) ** 2, (-3, 0, 2)))
ok('H10 ej.4: ∫₂⁵ = ln 16 − ln 8 + ln 5 = ln 10 ≈ 2,30', cerca(riemann(lambda x: (x + 7) / ((x - 1) * (x + 3)), 2, 5), log(10)) and F(16 * 5, 8) == 10 and round(log(10), 2) == 2.30)
ok('H10: sistema A+B = 1, 3A−B = 7 → A = 2, B = −1', 2 + -1 == 1 and 3 * 2 - -1 == 7)
ok('H10-A: (1/4)ln|(x−2)/(x+2)|; H10-B: ln|x²+x|; H10-C: x+ln|x−1|−ln|x+1|', anti(lambda x: log(abs((x - 2) / (x + 2))) / 4, lambda x: 1 / (x * x - 4), (-4, 0, 3)) and anti(lambda x: log(abs(x * x + x)), lambda x: (2 * x + 1) / (x * x + x), (-3, 0.5, 2)) and anti(lambda x: x + log(abs(x - 1)) - log(abs(x + 1)), lambda x: (x * x + 1) / (x * x - 1), (-3, 0, 2)))

# H11 · integrales impropias
ok('H11 ej.1: ∫₁ᵇ x⁻² = 1 − 1/b → 1; ej.2: ∫₁ᵇ 1/x = ln b → ∞', all(cerca(riemann(lambda x: x ** -2, 1, b), 1 - 1 / b, 1e-5) and cerca(riemann(lambda x: 1 / x, 1, b), log(b), 1e-5) for b in (2.6, 12)) and 1 - 1 / 1e9 > 0.999999 and log(1e9) > 20)
ok('H11 regla p: ∫₁ᵇ x⁻ᵖ = (b^{1−p} − 1)/(1−p); p>1 → 1/(p−1)', all(cerca(riemann(lambda x, p=p: x ** -p, 1, 5), (5 ** (1 - p) - 1) / (1 - p), 1e-5) for p in (0.5, 2, 3)) and all(abs((1e8 ** (1 - p) - 1) / (1 - p) - 1 / (p - 1)) < 1e-3 for p in (1.5, 2, 3)))
ok('H11 ej.3: ∫_c¹ x^{−1/2} = 2 − 2√c → 2; ej.4: −ln c → ∞', all(cerca(riemann(lambda x: x ** -0.5, c, 1), 2 - 2 * sqrt(c), 1e-4) for c in (0.25, 0.04)) and 2 - 2 * sqrt(1e-12) > 1.99999 and -log(1e-9) > 20)
ok('H11: [−1/x] de −1 a 1 da −2 (resultado absurdo); ∫_c¹ x⁻² = −1 + 1/c → ∞', -1 / 1 - (-1 / -1) == -2 and cerca(riemann(lambda x: x ** -2, 0.1, 1), -1 + 10, 1e-4))
ok('H11 animación: b=2,60 → 0,615 y 0,955 (rótulos según b exacto); b=12 → 0,917 y 2,485', round(1 - 1 / 12, 3) == 0.917 and round(log(12), 3) == 2.485)
ok('H11-A: 1 − e^{−b} → 1; H11-B: 4 − 2√(4−c) → 4; H11-C: 100 − 100e^{−0,5b} → 100', cerca(riemann(lambda x: exp(-x), 0, 30), 1, 1e-6) and cerca(riemann(lambda x: 1 / sqrt(4 - x), 0, 3.99), 4 - 2 * sqrt(0.01), 1e-4) and anti(lambda x: -2 * sqrt(4 - x), lambda x: 1 / sqrt(4 - x), (0.5, 2, 3.5)) and cerca(riemann(lambda t: 50 * exp(-0.5 * t), 0, 60), 100, 1e-6))

# H12 · presentación: el auto, v = 4t − t²
vA = lambda t: 4 * t - t * t
sA = lambda t: 2 * t * t - t ** 3 / 3
ok('H12: s(t) = 2t² − t³/3 es ∫₀ᵗ v y s′ = v; s(4) = 32/3 ≈ 10,67', all(cerca(riemann(vA, 0, t), sA(t)) and cerca(dnum(sA, t), vA(t), 1e-5) for t in (0.5, 1.3, 2, 3, 4)) and 2 * 16 - F(64, 3) == F(32, 3) and round(32 / 3, 2) == 10.67)
ok('H12 animación: t=2 → área 16/3 ≈ 5,33', 8 - F(8, 3) == F(16, 3) and round(16 / 3, 2) == 5.33)
ok('H12-A: 9 − 5/3 = 22/3 ≈ 7,33; H12-B: v(2) = 4', 18 - 9 == 9 and 2 - F(1, 3) == F(5, 3) and 9 - F(5, 3) == F(22, 3) and round(22 / 3, 2) == 7.33 and vA(2) == 4 and cerca(riemann(vA, 1, 3), 22 / 3))

print('\nERRORES:', err); raise SystemExit(1 if err else 0)
