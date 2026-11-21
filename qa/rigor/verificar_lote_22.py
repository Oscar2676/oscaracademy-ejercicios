#!/usr/bin/env python3
"""Lote 22 (aplicaciones de la integral): segunda pasada por otro camino.
Cada resultado se recalcula en fracciones exactas con la antiderivada y, aparte, con una suma de Riemann de punto medio."""
from fractions import Fraction as F
from math import isclose, sin, cos, sqrt, exp, pi, e
err = 0
def ok(n, c):
    global err
    print(('ok     ' if c else 'FALSO  ') + n); err += 0 if c else 1
def riemann(f, a, b, n=200000):
    h = (b - a) / n
    return sum(f(a + (i + 0.5) * h) for i in range(n)) * h
def cerca(a, b, tol=1e-6): return isclose(a, b, rel_tol=tol, abs_tol=tol)

# H01 · área en y
ok('H01: cruces y²=y+2 → −1, 2; puntos (1,−1), (4,2)', all(y * y == y + 2 for y in (-1, 2)) and (-1) ** 2 == 1 and 2 + 2 == 4)
P = lambda y: F(y) ** 2 / 2 + 2 * F(y) - F(y) ** 3 / 3
ok('H01 ej.1: 10/3 − (−7/6) = 9/2', P(2) == F(10, 3) and P(-1) == F(-7, 6) and P(2) - P(-1) == F(9, 2) and cerca(riemann(lambda y: y + 2 - y * y, -1, 2), 4.5))
ok('H01 animación: A(y) = y²/2+2y−y³/3+7/6; A(1,19) ≈ 3,69; largo 1,77', all(cerca(riemann(lambda t: t + 2 - t * t, -1, y), y * y / 2 + 2 * y - y ** 3 / 3 + 7 / 6) for y in (-0.5, 0, 1.19, 2)) and round(1.19 + 2 - 1.19 ** 2, 2) == 1.77)
ok('H01 en x: 4/3 + 19/6 = 9/2', cerca(riemann(lambda x: 2 * sqrt(x), 0, 1), 4 / 3, 1e-5) and cerca(riemann(lambda x: sqrt(x) - x + 2, 1, 4), 19 / 6) and F(16, 3) - (F(2, 3) - F(1, 2) + 2) == F(19, 6) and F(4, 3) + F(19, 6) == F(9, 2))
ok('H01-A: 32/3; H01-B: 64/3', cerca(riemann(lambda y: 4 - y * y, -2, 2), 32 / 3) and cerca(riemann(lambda y: 8 - 2 * y * y, -2, 2), 64 / 3) and (8 - F(8, 3)) * 2 == F(32, 3) and (16 - F(16, 3)) * 2 == F(64, 3))
V = lambda y: F(y) ** 2 / 2 + 4 * F(y) - F(y) ** 3 / 6
ok('H01-C: cruces −2 y 4; 40/3 − (−14/3) = 18', all(F(y * y, 2) == y + 4 for y in (-2, 4)) and V(4) == F(40, 3) and V(-2) == F(-14, 3) and V(4) - V(-2) == 18 and cerca(riemann(lambda y: y + 4 - y * y / 2, -2, 4), 18))

# H02 · más de dos cruces
d = lambda x: x ** 3 - 4 * x
ok('H02 ej.1: cruces −2, 0, 2; signos; 4 + 4 = 8; sin separar 0', all(d(x) == 0 for x in (-2, 0, 2)) and d(-1) == 3 and d(1) == -3 and cerca(riemann(d, -2, 0), 4) and cerca(riemann(lambda x: -d(x), 0, 2), 4) and cerca(riemann(lambda x: abs(d(x)), -2, 2), 8) and cerca(riemann(d, -2, 2), 0))
ok('H02 animación: ∫₋₂ˣ (f−g) = x⁴/4 − 2x² + 4', all(cerca(riemann(d, -2, x), x ** 4 / 4 - 2 * x * x + 4) for x in (-1.3, 0, 0.8, 2)) and all(cerca(riemann(lambda u: abs(d(u)), -2, x), 4 + 2 * x * x - x ** 4 / 4) for x in (0.5, 1.4, 2)))
ok('H02 ej.2: cruces π/4 y 5π/4; √2−1, 2√2, 1+√2; total 4√2 ≈ 5,66', cerca(sin(pi / 4), cos(pi / 4)) and cerca(sin(5 * pi / 4), cos(5 * pi / 4)) and cerca(riemann(lambda x: cos(x) - sin(x), 0, pi / 4), sqrt(2) - 1) and cerca(riemann(lambda x: sin(x) - cos(x), pi / 4, 5 * pi / 4), 2 * sqrt(2)) and cerca(riemann(lambda x: cos(x) - sin(x), 5 * pi / 4, 2 * pi), 1 + sqrt(2)) and cerca(riemann(lambda x: abs(sin(x) - cos(x)), 0, 2 * pi, 400000), 4 * sqrt(2), 1e-5) and round(4 * sqrt(2), 2) == 5.66)
ok('H02-A: 1/4 + 1/4 = 1/2', cerca(riemann(lambda x: abs(x ** 3 - x), -1, 1), 0.5) and F(1, 4) + F(1, 4) == F(1, 2))
fB = lambda x: x ** 3 - 6 * x * x + 8 * x; gB = lambda x: x * x - 4 * x
D = lambda x: F(x) ** 4 / 4 - 7 * F(x) ** 3 / 3 + 6 * F(x) ** 2
ok('H02-B: f−g = x(x−3)(x−4); D(3) = 45/4, D(4) = 32/3; 45/4 + 7/12 = 71/6', all(fB(x) - gB(x) == x * (x - 3) * (x - 4) for x in range(-3, 8)) and D(3) == F(45, 4) and D(4) == F(32, 3) and -(D(4) - D(3)) == F(7, 12) and F(45, 4) + F(7, 12) == F(71, 6) and cerca(riemann(lambda x: abs(fB(x) - gB(x)), 0, 4), 71 / 6))
T = lambda x: x ** 3 - 5 * x * x + 6 * x
Pp = lambda x: F(x) ** 4 / 4 - 5 * F(x) ** 3 / 3 + 3 * F(x) ** 2
ok('H02-C: T = x(x−2)(x−3); T(1) = 2; corte 8/3 ≈ 2,67; relleno 5/12 ≈ 0,42; saldo 9/4', all(T(x) == x * (x - 2) * (x - 3) for x in range(-3, 8)) and T(1) == 2 and Pp(2) == F(8, 3) and Pp(3) == F(9, 4) and -(Pp(3) - Pp(2)) == F(5, 12) and cerca(riemann(T, 0, 2), 8 / 3) and cerca(riemann(lambda x: -T(x), 2, 3), 5 / 12) and round(8 / 3, 2) == 2.67 and round(5 / 12, 2) == 0.42)

# H03 · valor promedio
ok('H03 ej.1: (1/3)·9 = 3; c = √3 ≈ 1,73', cerca(riemann(lambda x: x * x, 0, 3), 9) and F(27, 3) / 3 == 3 and round(sqrt(3), 2) == 1.73)
ok('H03 animación: falta = (2/3)h^(3/2); sobra = 9 − 3h + (2/3)h^(3/2); iguales en h = 3', all(cerca(riemann(lambda x: h - x * x, 0, sqrt(h)), 2 / 3 * h ** 1.5, 1e-5) and cerca(riemann(lambda x: x * x - h, sqrt(h), 3), 9 - 3 * h + 2 / 3 * h ** 1.5, 1e-5) for h in (1, 3, 5.5)) and cerca(9 - 3 * 3, 0))
ok('H03 ej.2: 2/π ≈ 0,637', cerca(riemann(sin, 0, pi), 2) and round(2 / pi, 3) == 0.637)
ok('H03-A: 32/3 · 1/4 = 8/3 ≈ 2,67; c = ±2/√3 ≈ ±1,15', F(32, 3) / 4 == F(8, 3) and round(8 / 3, 2) == 2.67 and cerca(4 - (2 / sqrt(3)) ** 2, 8 / 3) and round(2 / sqrt(3), 2) == 1.15)
ok('H03-B: (e²−1)/2 ≈ 3,19', cerca(riemann(exp, 0, 2) / 2, (e * e - 1) / 2) and round((e * e - 1) / 2, 2) == 3.19)
ok('H03-C: 24/π; 15 + 16/π ≈ 20,1', cerca(riemann(lambda t: sin(pi * t / 12), 0, 12), 24 / pi) and cerca(riemann(lambda t: 15 + 8 * sin(pi * t / 12), 0, 12) / 12, 15 + 16 / pi) and round(15 + 16 / pi, 1) == 20.1 and 8 * 24 == 192 and F(192, 12) == 16)

# H04 · posición, velocidad, aceleración
v = lambda t: t * t - 4 * t + 3
Fv = lambda t: F(t) ** 3 / 3 - 2 * F(t) ** 2 + 3 * F(t)
ok('H04 ej.1: F(1) = 4/3, F(3) = 0, F(4) = 4/3; desplazamiento 4/3; distancia 4; s(4) = 10/3', Fv(1) == F(4, 3) and Fv(3) == 0 and Fv(4) == F(4, 3) and F(64, 3) - 32 + 12 == F(4, 3) and cerca(riemann(v, 0, 4), 4 / 3) and cerca(riemann(lambda t: abs(v(t)), 0, 4), 4) and 2 + F(4, 3) == F(10, 3) and v(0) == 3 and v(2) == -1 and v(4) == 3)
ok('H04 animación: distancia por tramos D(t)', all(cerca(riemann(lambda u: abs(v(u)), 0, t), (float(Fv(t)) if t <= 1 else 8 / 3 - float(Fv(t)) if t <= 3 else 8 / 3 + float(Fv(t)))) for t in (F(1, 2), F(2), F(7, 2), F(4))))
ok('H04 ej.2: s = 20t − 5t²; s(2) = 20; s(4) = 0; distancia 40', 20 * 2 - 5 * 4 == 20 and 20 * 4 - 5 * 16 == 0 and cerca(riemann(lambda t: abs(20 - 10 * t), 0, 4), 40) and cerca(riemann(lambda t: 20 - 10 * t, 0, 2), 20))
ok('H04-A: −9 y 23', cerca(riemann(lambda t: 3 * t * t - 12, 0, 3), -9) and cerca(riemann(lambda t: abs(3 * t * t - 12), 0, 3), 23) and 8 - 24 == -16 and 27 - 36 == -9)
ok('H04-B: v = 3t² − 3; s = t³ − 3t + 1; s(2) = 3; distancia 6', cerca(-3 + riemann(lambda t: 6 * t, 0, 1.7), 3 * 1.7 ** 2 - 3) and cerca(1 + riemann(lambda t: 3 * t * t - 3, 0, 2), 3) and cerca(riemann(lambda t: abs(3 * t * t - 3), 0, 2), 6) and 1 + 1 - 3 == -1)
ok('H04-C: 4 s y 40 m; 20 m/s = 72 km/h', cerca(riemann(lambda t: 20 - 5 * t, 0, 4), 40) and 20 * 3600 / 1000 == 72)

# H05 · acumulación en contextos
ok('H05 ej.1: entra 72, sale 48, final 74, máximo 82; +32 y −8', cerca(riemann(lambda t: 12 - t, 0, 12), 72) and 4 * 12 == 48 and 50 + 72 - 48 == 74 and 50 + 96 - 72 == 74 and 50 + 64 - 32 == 82 and cerca(riemann(lambda t: 8 - t, 0, 8), 32) and cerca(riemann(lambda t: 8 - t, 8, 12), -8))
ok('H05 ej.2: 24 kWh; mañana 12 kWh; P(6) = 3', cerca(riemann(lambda t: t * (12 - t) / 12, 0, 12), 24) and cerca(riemann(lambda t: t * (12 - t) / 12, 0, 6), 12) and F(6 * 6, 12) == 3 and 6 * 144 == 864 and 12 ** 3 // 3 == 576)
ok('H05-A: 21 L', cerca(riemann(lambda t: 2 + 0.5 * t, 0, 6), 21))
ok('H05-B: 2000(e−1) ≈ 3437; total ≈ 4937', cerca(riemann(lambda t: 200 * exp(0.1 * t), 0, 10), 2000 * (e - 1)) and round(2000 * (e - 1)) == 3437 and round(1500 + 2000 * (e - 1)) == 4937)
ok('H05-C: 72 − 18 = 54; 74 %; c(60) = 0,6', cerca(riemann(lambda t: 1.2 - 0.01 * t, 0, 60), 54) and 20 + 54 == 74 and cerca(1.2 - 0.6, 0.6))

print('\nERRORES:', err)
