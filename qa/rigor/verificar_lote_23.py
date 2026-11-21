#!/usr/bin/env python3
"""Lote 23 (paramétricas, polares y vectoriales): segunda pasada por otro camino (numérico y fracciones)."""
from fractions import Fraction as F
from math import isclose, sin, cos, tan, sqrt, pi, atan2
err = 0
def ok(n, c):
    global err
    print(('ok     ' if c else 'FALSO  ') + n); err += 0 if c else 1
def riemann(f, a, b, n=200000):
    h = (b - a) / n
    return sum(f(a + (i + 0.5) * h) for i in range(n)) * h
def cerca(a, b, tol=1e-6): return isclose(a, b, rel_tol=tol, abs_tol=tol)
def d(f, t, h=1e-6): return (f(t + h) - f(t - h)) / (2 * h)
def largo(fx, fy, a, b, n=400000):
    h = (b - a) / n; L = 0.0; x0, y0 = fx(a), fy(a)
    for i in range(1, n + 1):
        x1, y1 = fx(a + i * h), fy(a + i * h); L += sqrt((x1 - x0) ** 2 + (y1 - y0) ** 2); x0, y0 = x1, y1
    return L

# H01
ok('H01 ej.1: tabla y y = x²/4 − 1', [(2 * t, t * t - 1) for t in (-2, -1, 0, 1, 2)] == [(-4, 3), (-2, 0), (0, -1), (2, 0), (4, 3)] and all(F(2 * t) ** 2 / 4 - 1 == t * t - 1 for t in (-2, -1, 0, 1, 2)))
ok('H01 ej.2: elipse x²/9 + y²/4 = 1 y sentido', all(cerca((3 * cos(t)) ** 2 / 9 + (2 * sin(t)) ** 2 / 4, 1) for t in (0.3, 2, 4.4)) and cerca(3 * cos(pi / 2), 0) and cerca(2 * sin(pi / 2), 2) and cerca(3 * cos(pi), -3))
ok('H01 ej.3 y error: sen/cos parte en (0,1) y gira horario; √t → x ≥ 0', cerca(sin(0), 0) and cerca(cos(0), 1) and sin(0.1) > 0 and cos(0.1) < 1 and all(cerca(sqrt(t) ** 2 + 1, t + 1) for t in (0, 1.7, 9)))
ok('H01-A, B, C: (x−1)²; semicírculo; (5t+1)(t−2), 24 m, 2 m', all((t + 1 - 1) ** 2 == t * t for t in (-3, 0, 2)) and all(cerca((4 * cos(t)) ** 2 + (4 * sin(t)) ** 2, 16) and sin(t) >= 0 for t in (0, 1, 2, 3)) and all((5 * t + 1) * (t - 2) == 5 * t * t - 9 * t - 2 for t in range(-3, 5)) and 2 + 9 * 2 - 5 * 4 == 0 and 12 * 2 == 24)

# H02
ok('H02 ej.1: (1−cos t)² + sen² t = 2 − 2cos t = 4 sen²(t/2); L = 8; acumulado 4(1 − cos(t/2))', all(cerca((1 - cos(t)) ** 2 + sin(t) ** 2, 4 * sin(t / 2) ** 2) for t in (0.4, 2, 5)) and cerca(largo(lambda t: t - sin(t), lambda t: 1 - cos(t), 0, 2 * pi), 8, 1e-5) and cerca(largo(lambda t: t - sin(t), lambda t: 1 - cos(t), 0, 3.49), 4 * (1 - cos(3.49 / 2)), 1e-5) and round(4 * (1 - cos(3.49 / 2)), 2) == 4.69)
ok('H02 ej.2: (80√10 − 8)/27 ≈ 9,07; cuerda √80 ≈ 8,94', cerca(largo(lambda t: t * t, lambda t: t ** 3, 0, 2), (80 * sqrt(10) - 8) / 27, 1e-5) and round((80 * sqrt(10) - 8) / 27, 2) == 9.07 and cerca(40 ** 1.5, 80 * sqrt(10)) and round(sqrt(80), 2) == 8.94)
ok('H02 error: dos vueltas dan 4π', cerca(riemann(lambda t: sqrt((2 * sin(2 * t)) ** 2 + (2 * cos(2 * t)) ** 2), 0, 2 * pi), 4 * pi))
ok('H02-A: 10; H02-B: 3/2; H02-C: 2,20 m y 2,80 m', cerca(largo(lambda t: 3 * t, lambda t: 4 * t, 0, 2), 10) and cerca(largo(lambda t: cos(t) ** 3, lambda t: sin(t) ** 3, 0, pi / 2), 1.5, 1e-5) and round(2 * pi * 0.35, 2) == 2.2 and cerca(8 * 0.35, 2.8))

# H03
ok('H03 ej.1: (2, 2π/3) → (−1, √3); (−1, −1) → (√2, 5π/4)', cerca(2 * cos(2 * pi / 3), -1) and cerca(2 * sin(2 * pi / 3), sqrt(3)) and cerca(sqrt(2) * cos(5 * pi / 4), -1) and cerca(sqrt(2) * sin(5 * pi / 4), -1))
ok('H03 ej.2: r = 2cos θ ⇔ (x−1)² + y² = 1', all(cerca((2 * cos(q) * cos(q) - 1) ** 2 + (2 * cos(q) * sin(q)) ** 2, 1) for q in (0.2, 1, 2.5)))
r = lambda q: 1 + cos(q); X = lambda q: r(q) * cos(q); Y = lambda q: r(q) * sin(q)
ok('H03 ej.3 / H04: dx/dθ = −sen θ(1 + 2cos θ); dy/dθ = 2cos²θ + cos θ − 1 = (2cos θ − 1)(cos θ + 1)', all(cerca(d(X, q), -sin(q) * (1 + 2 * cos(q)), 1e-5) and cerca(d(Y, q), 2 * cos(q) ** 2 + cos(q) - 1, 1e-5) and cerca(2 * cos(q) ** 2 + cos(q) - 1, (2 * cos(q) - 1) * (cos(q) + 1)) for q in (0.5, 1.83, 4, 5.5)) and cerca(d(X, pi / 2), -1, 1e-5) and cerca(d(Y, pi / 2), -1, 1e-5))
ok('H03-A: (−2√3, 2); (3, 3π/2). H03-B: x² + (y−2)² = 4. H03-C: 8,66 y 5', cerca(4 * cos(5 * pi / 6), -2 * sqrt(3)) and cerca(4 * sin(5 * pi / 6), 2) and cerca(3 * cos(3 * pi / 2), 0) and cerca(3 * sin(3 * pi / 2), -3) and all(cerca((4 * sin(q) * cos(q)) ** 2 + (4 * sin(q) ** 2 - 2) ** 2, 4) for q in (0.3, 1.2, 2.8)) and round(5 * sqrt(3), 2) == 8.66)

# H04
ok('H04 ej.1: tangente ⟂ radio en r = 2', all(cerca(-cos(q) / sin(q) * (sin(q) / cos(q)), -1) for q in (0.4, 1.1, 2.6)))
ok('H04 ej.2: pendiente 1 en θ = π/2, punto (0, 1); animación θ = 1,83 → 2,38', cerca(d(Y, pi / 2) / d(X, pi / 2), 1, 1e-4) and cerca(X(pi / 2), 0) and cerca(Y(pi / 2), 1) and round(d(Y, 1.83) / d(X, 1.83), 1) == 2.4)
ok('H04 ej.3: horizontales π/3, 5π/3 en (3/4, ±3√3/4); verticales 0, 2π/3, 4π/3 en (2,0), (−1/4, ±√3/4)', all(cerca(d(Y, q), 0, 1e-5) and abs(d(X, q)) > 0.1 for q in (pi / 3, 5 * pi / 3)) and all(cerca(d(X, q), 0, 1e-5) and abs(d(Y, q)) > 0.1 for q in (0, 2 * pi / 3, 4 * pi / 3)) and cerca(X(pi / 3), 0.75) and cerca(Y(pi / 3), 3 * sqrt(3) / 4) and cerca(X(0), 2) and cerca(X(2 * pi / 3), -0.25) and cerca(Y(2 * pi / 3), sqrt(3) / 4))
ok('H04 ej.3: en θ = π ambas derivadas 0 y la pendiente tiende a 0; (1+cos)/sen = sen/(1−cos)', cerca(d(X, pi), 0, 1e-5) and cerca(d(Y, pi), 0, 1e-5) and abs(d(Y, pi - 1e-3) / d(X, pi - 1e-3)) < 5e-3 and abs(d(Y, pi + 1e-3) / d(X, pi + 1e-3)) < 5e-3 and all(cerca((1 + cos(q)) / sin(q), sin(q) / (1 - cos(q))) for q in (1, 2.5, 4)))
f2 = lambda q: 2 * sin(q)
ok('H04-A: tan 2θ, √3 en π/6; H04-B: 1; H04-C: −2/π ≈ −0,64, punto (0, π)', cerca(d(lambda q: f2(q) * sin(q), pi / 6) / d(lambda q: f2(q) * cos(q), pi / 6), sqrt(3), 1e-4) and cerca(d(lambda q: (1 + sin(q)) * sin(q), 0) / d(lambda q: (1 + sin(q)) * cos(q), 0), 1, 1e-4) and cerca(d(lambda q: 2 * q * sin(q), pi / 2) / d(lambda q: 2 * q * cos(q), pi / 2), -2 / pi, 1e-4) and round(-2 / pi, 2) == -0.64 and cerca(2 * (pi / 2) * sin(pi / 2), pi))

# H05
ok('H05 sector: (Δθ/2π)·πr² = ½r²Δθ; ej.1 πa²', cerca(0.7 / (2 * pi) * pi * 1.3 ** 2, 0.5 * 1.3 ** 2 * 0.7) and cerca(riemann(lambda q: 0.5 * 1.3 ** 2, 0, 2 * pi), pi * 1.3 ** 2))
ok('H05 ej.2: 3π/2 ≈ 4,71; acumulado; ej.3: π/8 ≈ 0,39 y rosa π/2', cerca(riemann(lambda q: 0.5 * r(q) ** 2, 0, 2 * pi), 1.5 * pi) and round(1.5 * pi, 2) == 4.71 and all(cerca(riemann(lambda u: 0.5 * r(u) ** 2, 0, q), 0.5 * (1.5 * q + 2 * sin(q) + sin(2 * q) / 4)) for q in (1, 2.66, 5)) and cerca(riemann(lambda q: 0.5 * cos(2 * q) ** 2, -pi / 4, pi / 4), pi / 8) and round(pi / 8, 2) == 0.39 and cerca(riemann(lambda q: 0.5 * cos(2 * q) ** 2, 0, 2 * pi), pi / 2))
ok('H05 error: r = 2cos θ de 0 a 2π da el doble (2π en vez de π)', cerca(riemann(lambda q: 0.5 * (2 * cos(q)) ** 2, 0, pi), pi) and cerca(riemann(lambda q: 0.5 * (2 * cos(q)) ** 2, 0, 2 * pi), 2 * pi))
ok('H05-A: π; H05-B: π/12 ≈ 0,26; H05-C: 18π ≈ 56,5', cerca(riemann(lambda q: 0.5 * (2 * sin(q)) ** 2, 0, pi), pi) and cerca(riemann(lambda q: 0.5 * sin(3 * q) ** 2, 0, pi / 3), pi / 12) and round(pi / 12, 2) == 0.26 and cerca(riemann(lambda q: 0.5 * (4 + 2 * cos(q)) ** 2, 0, 2 * pi), 18 * pi) and round(18 * pi, 1) == 56.5)

# H06 · área entre dos curvas polares
from math import log, exp
ok('H06 ej.1: cruces ±π/2; 2 − π/4 ≈ 1,215; acumulado', cerca(1 - cos(pi / 2), 1) and cerca(riemann(lambda q: 0.5 * (1 - (1 - cos(q)) ** 2), -pi / 2, pi / 2), 2 - pi / 4) and round(2 - pi / 4, 3) == 1.215 and all(cerca(riemann(lambda u: 0.5 * (1 - (1 - cos(u)) ** 2), -pi / 2, q), 0.5 * (2 * sin(q) - q / 2 - sin(2 * q) / 4 + 2 - pi / 4)) for q in (-1, -0.02, 0.9, pi / 2)))
ok('H06 ej.2: cruces ±π/3; 4cos² − 1 = 1 + 2cos 2θ; π/3 + √3/2 ≈ 1,913', cerca(2 * cos(pi / 3), 1) and all(cerca(4 * cos(q) ** 2 - 1, 1 + 2 * cos(2 * q)) for q in (0.2, 0.9)) and cerca(riemann(lambda q: 0.5 * (4 * cos(q) ** 2 - 1), -pi / 3, pi / 3), pi / 3 + sqrt(3) / 2) and round(pi / 3 + sqrt(3) / 2, 3) == 1.913)
ok('H06 error: ½(3²−1²) = 4 ≠ ½(3−1)² = 2', 0.5 * (9 - 1) == 4 and 0.5 * (3 - 1) ** 2 == 2)
ok('H06-A: 3π; H06-B: cruces π/6, 5π/6 y área π; H06-C: 14π ≈ 44,0', cerca(riemann(lambda q: 0.5 * 3, 0, 2 * pi), 3 * pi) and cerca(3 * sin(pi / 6), 1 + sin(pi / 6)) and all(cerca(9 * sin(q) ** 2 - (1 + sin(q)) ** 2, 3 - 4 * cos(2 * q) - 2 * sin(q)) for q in (0.7, 1.9)) and cerca(riemann(lambda q: 0.5 * (9 * sin(q) ** 2 - (1 + sin(q)) ** 2), pi / 6, 5 * pi / 6), pi) and cerca(riemann(lambda q: 0.5 * ((4 + 2 * cos(q)) ** 2 - 4), 0, 2 * pi), 14 * pi) and round(14 * pi, 1) == 44.0)

# H07 · funciones vectoriales
ok('H07 ej.1: valores y y = 4 − x²', [(t, 4 - t * t) for t in (-2, 0, 1, 2)] == [(-2, 0), (0, 4), (1, 3), (2, 0)])
ok('H07 ej.3: lím (sen t)/t = 1; ej.4: recta ⟨1+3t, 2−t⟩ ⇔ y = (7−x)/3', cerca(sin(1e-6) / 1e-6, 1) and all(cerca(2 - t, (7 - (1 + 3 * t)) / 3) for t in (-2, 0, 1.5)))
ok('H07-B: ⟨1,−1⟩, ⟨4,8⟩, y² = x³; H07-C: (15, 20), 25 m', (1, -1) == ((-1) ** 2, (-1) ** 3) and (4, 8) == (2 ** 2, 2 ** 3) and all((t ** 3) ** 2 == (t ** 2) ** 3 for t in (-3, 2, 5)) and sqrt(15 ** 2 + 20 ** 2) == 25)

# H08 · derivada vectorial
ok('H08 ej.1: Δr = ⟨h, 2h − h²⟩; Δr/h = ⟨1, 2 − h⟩ → ⟨1, 2⟩; tangente y = 2x + 5', all(cerca((4 - (-1 + h) ** 2) - 3, 2 * h - h * h) for h in (1.25, 0.3, 0.05)) and cerca(d(lambda t: 4 - t * t, -1), 2, 1e-5) and all(cerca(3 + 2 * s_, 2 * (-1 + s_) + 5) for s_ in (-1, 0, 2)) and round(2 * 1.25 - 1.25 ** 2, 2) == 0.94)
ok('H08 ej.2: ⟨2t, 2e^{2t}⟩; en 0: ⟨0, 2⟩', cerca(d(lambda t: exp(2 * t), 0.7), 2 * exp(1.4), 1e-5) and cerca(d(lambda t: exp(2 * t), 0), 2, 1e-5))
ok('H08 regla del producto punto (numérica)', cerca(d(lambda t: (t * t) * sin(t) + exp(t) * (3 * t), 0.8), (2 * 0.8) * sin(0.8) + exp(0.8) * (3 * 0.8) + (0.8 ** 2) * cos(0.8) + exp(0.8) * 3, 1e-5))
ok('H08-A: ⟨2, 1⟩; H08-B: (1, 2) y (1, −2); H08-C: √104 ≈ 10,2; t = 5; 25 m', cerca(d(lambda t: t ** 3 - t, 1), 2, 1e-5) and cerca(d(log, 1), 1, 1e-5) and 3 * 1 - 3 == 0 and ((-1) ** 2, (-1) ** 3 + 3) == (1, 2) and (1, 1 - 3) == (1, -2) and round(sqrt(104), 1) == 10.2 and 10 - 2 * 5 == 0 and 10 * 5 - 25 == 25)

print('\nERRORES:', err)
