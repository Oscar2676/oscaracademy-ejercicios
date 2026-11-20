#!/usr/bin/env python3
"""Lote 20 (razones relacionadas, H01–H04): segunda pasada por otro camino.
Cada razón de cambio se recalcula (a) con la fórmula derivada, en fracciones exactas, y (b) derivando numéricamente
la cantidad respecto del tiempo con una trayectoria concreta que cumple los datos (diferencias centrales)."""
from fractions import Fraction as F
from math import pi, sqrt, isclose
err = 0
def ok(n, c):
    global err
    print(('ok     ' if c else 'FALSO  ') + n); err += 0 if c else 1
def dnum(g, t, h=1e-6): return (g(t + h) - g(t - h)) / (2 * h)
def cerca(a, b, tol=1e-6): return isclose(a, b, rel_tol=tol, abs_tol=tol)

# H01
ok('H01 ej.1: dA/dt = 2·10·3 = 60; numérico con x(t)=10+3t', 2 * 10 * 3 == 60 and cerca(dnum(lambda t: (10 + 3 * t) ** 2, 0), 60))
ok('H01 ej.2: dA/dt = 2π·4·(1/2) = 4π ≈ 12,57; numérico con r(t)=4+t/2', cerca(dnum(lambda t: pi * (4 + t / 2) ** 2, 0), 4 * pi) and round(4 * pi, 2) == 12.57)
ok('H01 animación: (x+3)²−x² = 6x+9 (aumento real en 1 s) y dA/dt = 6x', all((F(x) + 3) ** 2 - F(x) ** 2 == 6 * F(x) + 9 for x in range(4, 15)))
ok('H01-A cubo: 3·5²·2 = 150; numérico', 3 * 25 * 2 == 150 and cerca(dnum(lambda t: (5 + 2 * t) ** 3, 0), 150))
ok('H01-B rectángulo: 2·3 + 5·(−1) = 1; numérico', 2 * 3 + 5 * (-1) == 1 and cerca(dnum(lambda t: (5 + 2 * t) * (3 - t), 0), 1))
ok('H01-C mancha: dr/dt = 6/(6π) = 1/π ≈ 0,32; numérico con A(t)=9π+6t', cerca(dnum(lambda t: sqrt((9 * pi + 6 * t) / pi), 0), 1 / pi) and round(1 / pi, 2) == 0.32)

# H02 · globo: V(t) = V0 + 100 t, r(t) = (3V/4π)^(1/3)
r_de = lambda V: (3 * V / (4 * pi)) ** (1 / 3)
V5 = 4 / 3 * pi * 125; V10 = 4 / 3 * pi * 1000
ok('H02: dr/dt = 100/(4π·25) = 1/π ≈ 0,32; numérico', cerca(dnum(lambda t: r_de(V5 + 100 * t), 0), 1 / pi) and cerca(100 / (4 * pi * 25), 1 / pi) and round(1 / pi, 2) == 0.32)
ok('H02: con r=10, 25/(100π) = 1/(4π) ≈ 0,08, la cuarta parte; numérico', cerca(dnum(lambda t: r_de(V10 + 100 * t), 0), 1 / (4 * pi)) and round(1 / (4 * pi), 2) == 0.08 and cerca(1 / (4 * pi), (1 / pi) / 4))
ok('H02: fórmula general 100/(4πr²) = 25/(πr²)', all(cerca(100 / (4 * pi * r * r), 25 / (pi * r * r)) for r in (2, 3.5, 5, 10)))
ok('H02-A: 4π·36·(1/2) = 72π ≈ 226,19; numérico', cerca(dnum(lambda t: 4 / 3 * pi * (6 + t / 2) ** 3, 0), 72 * pi) and round(72 * pi, 2) == 226.19)
ok('H02-B: dS/dt = 8π·5·(1/π) = 40; numérico', cerca(dnum(lambda t: 4 * pi * r_de(V5 + 100 * t) ** 2, 0), 40))
V4 = 4 / 3 * pi * 64
ok('H02-C: dr/dt = −2/(64π) = −1/(32π) ≈ −0,01; numérico', cerca(dnum(lambda t: r_de(V4 - 2 * t), 0), -1 / (32 * pi)) and round(-1 / (32 * pi), 2) == -0.01 and 4 * 16 == 64)

# H03 · autos
ok('H03: z=5; dz/dt = (3·60+4·80)/5 = 100; numérico con x=3+60t, y=4+80t', 9 + 16 == 25 and F(3 * 60 + 4 * 80, 5) == 100 and cerca(dnum(lambda t: sqrt((3 + 60 * t) ** 2 + (4 + 80 * t) ** 2), 0), 100))
ok('H03: z = 100t para todo t; √(60²+80²) = 100; 60+80 = 140', 3600 + 6400 == 10000 and all(cerca(sqrt((60 * t) ** 2 + (80 * t) ** 2), 100 * t) for t in (0.01, 0.05, 0.3)) and 60 + 80 == 140)
ok('H03 animación: en t = 3 min, x = 3 e y = 4', F(60) * F(3, 60) == 3 and F(80) * F(3, 60) == 4)
ok('H03-A: z=1; dz/dt = 0,8·(−70)+0,6·(−40) = −80; numérico', F(8, 10) ** 2 + F(6, 10) ** 2 == 1 and F(8, 10) * -70 + F(6, 10) * -40 == -80 and cerca(dnum(lambda t: sqrt((0.8 - 70 * t) ** 2 + (0.6 - 40 * t) ** 2), 0), -80))
ok('H03-B: z=13; dz/dt = (300−360)/13 = −60/13 ≈ −4,62; numérico', 25 + 144 == 169 and F(5 * 60 + 12 * -30, 13) == F(-60, 13) and round(-60 / 13, 2) == -4.62 and cerca(dnum(lambda t: sqrt((5 + 60 * t) ** 2 + (12 - 30 * t) ** 2), 0), -60 / 13))
ok('H03-C dron: z=50; dz/dt = (30/50)·6 = 18/5 = 3,6; numérico', 1600 + 900 == 2500 and F(30, 50) * 6 == F(18, 5) and cerca(dnum(lambda t: sqrt(1600 + (30 + 6 * t) ** 2), 0), 3.6))

# H04 · escalera
ok('H04: y=4; dy/dt = −(3/4)(1/2) = −3/8; numérico con x=3+t/2', 25 - 9 == 16 and -F(3, 4) * F(1, 2) == F(-3, 8) and cerca(dnum(lambda t: sqrt(25 - (3 + t / 2) ** 2), 0), -0.375))
ok('H04: con x=4, y=3, dy/dt = −(4/3)(1/2) = −2/3 ≈ −0,67', 25 - 16 == 9 and -F(4, 3) * F(1, 2) == F(-2, 3) and round(-2 / 3, 2) == -0.67 and cerca(dnum(lambda t: sqrt(25 - (4 + t / 2) ** 2), 0), -2 / 3))
ok('H04-A: y=12; dy/dt = −(5/12)·2 = −5/6 ≈ −0,83; numérico', 169 - 25 == 144 and -F(5, 12) * 2 == F(-5, 6) and round(-5 / 6, 2) == -0.83 and cerca(dnum(lambda t: sqrt(169 - (5 + 2 * t) ** 2), 0), -5 / 6))
ok('H04-B: dA/dt = (1/2)(2 − 9/8) = 7/16 ≈ 0,44; numérico', F(1, 2) * (F(1, 2) * 4 + 3 * F(-3, 8)) == F(7, 16) and round(7 / 16, 2) == 0.44 and cerca(dnum(lambda t: (3 + t / 2) * sqrt(25 - (3 + t / 2) ** 2) / 2, 0), 7 / 16))
ok('H04-C: x=4; dx/dt = (3/5)/4 = 3/20 = 0,15; numérico con y=3−t/5', 25 - 9 == 16 and F(3, 5) / 4 == F(3, 20) and cerca(dnum(lambda t: sqrt(25 - (3 - t / 5) ** 2), 0), 0.15))
print('\nERRORES:', err); raise SystemExit(1 if err else 0)
