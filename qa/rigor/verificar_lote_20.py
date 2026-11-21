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
# H05 · tanque cónico: H=6, R=3, r=h/2, V=πh³/12, dV/dt=3
h_de = lambda V: (12 * V / pi) ** (1 / 3)
Vh = lambda h: pi * h ** 3 / 12
ok('H05: r/h = 3/6 = 1/2; V = (1/3)π(h/2)²h = πh³/12', F(3, 6) == F(1, 2) and all(cerca(pi * (h / 2) ** 2 * h / 3, Vh(h)) for h in (1.2, 4, 6)))
ok('H05: dh/dt = 3/(4π) ≈ 0,24 con h=4; numérico con V(t)=V(4)+3t', cerca(dnum(lambda t: h_de(Vh(4) + 3 * t), 0), 3 / (4 * pi)) and round(3 / (4 * pi), 2) == 0.24 and F(1, 4) * 16 == 4)
ok('H05: fórmula general 12/(πh²); con h=2 da 3/π ≈ 0,95, 4 veces 3/(4π); numérico', cerca(dnum(lambda t: h_de(Vh(2) + 3 * t), 0), 3 / pi) and round(3 / pi, 2) == 0.95 and cerca(3 / pi, 4 * 3 / (4 * pi)) and all(cerca(3 / (pi / 4 * h * h), 12 / (pi * h * h)) for h in (1.2, 2, 4, 6)))
N = 200000
ok('H05: ∫₀^h (π/4)y² dy = πh³/12 (suma de Riemann, h=4) y dV/dh = (π/4)h² = πr²', cerca(sum(pi / 4 * ((i + 0.5) * 4 / N) ** 2 * 4 / N for i in range(N)), Vh(4), 1e-8) and cerca(dnum(Vh, 4), pi * 2 ** 2))
ok('H05: (π/12)·4r²·h = (1/3)πr²h', F(4, 12) == F(1, 3))
ok('H05-A: r=h/3, V=πh³/27, dV/dt=(π/9)h²·dh/dt; dh/dt = 5/π ≈ 1,59; numérico', F(3, 27) == F(1, 9) and cerca(dnum(lambda t: (27 * (pi * 27 / 27 + 5 * t) / pi) ** (1 / 3), 0), 5 / pi) and round(5 / pi, 2) == 1.59)
ok('H05-B: dr/dt = (1/2)·3/(4π) = 3/(8π) ≈ 0,12', round(3 / (8 * pi), 2) == 0.12 and cerca(dnum(lambda t: h_de(Vh(4) + 3 * t) / 2, 0), 3 / (8 * pi)))
ok('H05-C filtro: dh/dt = −2/(4π) = −1/(2π) ≈ −0,16; numérico', cerca(dnum(lambda t: h_de(Vh(4) - 2 * t), 0), -1 / (2 * pi)) and round(-1 / (2 * pi), 2) == -0.16)

# H06 · sombra: farol 6, persona 1,5, dx/dt = 1,2
def sombra(H, p, x): return p * x / (H - p)
ok('H06: 6/(x+s) = 1,5/s ⟺ s = x/3 (exacto en varios x)', all(F(6) / (x + sombra(F(6), F(3, 2), x)) == F(3, 2) / sombra(F(6), F(3, 2), x) and sombra(F(6), F(3, 2), x) == x / 3 for x in (F(3, 2), F(33, 10), F(6), F(15, 2))))
ok('H06: 6−1,5 = 4,5; 1,5/4,5 = 1/3; ds/dt = (1/3)·1,2 = 0,4', F(6) - F(3, 2) == F(9, 2) and F(3, 2) / F(9, 2) == F(1, 3) and F(1, 3) * F(6, 5) == F(2, 5))
ok('H06 animación: x=3,30 → s=1,10; x=6 → s=2, x+s=8', F(33, 10) / 3 == F(11, 10) and F(6) / 3 == 2 and 6 + 2 == 8)
ok('H06-A: punta 1,2 + 0,4 = 1,6', F(6, 5) + F(2, 5) == F(8, 5))
ok('H06-B: 4−1,6 = 2,4; 1,6/2,4 = 2/3; ds/dt = −2/3 ≈ −0,67', F(4) - F(8, 5) == F(12, 5) and F(8, 5) / F(12, 5) == F(2, 3) and sombra(F(4), F(8, 5), F(3)) == 2 and round(-2 / 3, 2) == -0.67)
ok('H06-C: 3,6−1,2 = 2,4; 1,2/2,4 = 1/2; ds/dt = 1,5; punta 4,5', F(18, 5) - F(6, 5) == F(12, 5) and F(6, 5) / F(12, 5) == F(1, 2) and F(1, 2) * 3 == F(3, 2) and 3 + F(3, 2) == F(9, 2))

# H07 y H08 · regla de L'Hôpital: cada límite se compara con el valor de la función muy cerca del punto
from math import log, exp, sin, cos, e
def lim0(fn, a, L, hs=(1e-3, 1e-4, 1e-5), lado=0, tol=5e-3):
    pts = [a + h for h in hs] + ([] if lado > 0 else [a - h for h in hs])
    return all(abs(fn(x) - L) < tol for x in pts) and abs(fn(a + hs[-1]) - L) <= abs(fn(a + hs[0]) - L) + 1e-9
ok('H07 ej.1: lím (x²−1)/ln x = 2 en x→1; f′(1)=2, g′(1)=1; 2x/(1/x)=2x²', lim0(lambda x: (x * x - 1) / log(x), 1, 2) and cerca(dnum(lambda x: x * x - 1, 1), 2) and cerca(dnum(log, 1), 1) and all(cerca(2 * x / (1 / x), 2 * x * x) for x in (0.5, 1, 3)))
ok('H07 ej.2: lím ln x / x = 0 en +∞', all(log(x) / x < t for x, t in ((1e3, 1e-2), (1e6, 1e-4), (1e9, 1e-7))))
ok('H07 ej.3: lím (1−cos x)/x² = 1/2 en 0; sen x/(2x) → 1/2', lim0(lambda x: (1 - cos(x)) / x ** 2, 0, 0.5, hs=(1e-1, 1e-2, 1e-3)) and lim0(lambda x: sin(x) / (2 * x), 0, 0.5))
ok('H07 cuidado: (x+1)/(x+2) → 1/2 en 0 (no 1)', lim0(lambda x: (x + 1) / (x + 2), 0, 0.5))
ok('H07: (x+sen x)/x → 1 en +∞ y 1+cos x oscila entre 0 y 2', all(abs((x + sin(x)) / x - 1) < 1e-3 for x in (1e4, 1e5, 1e6)) and cerca(1 + cos(pi), 0) and cerca(1 + cos(2 * pi), 2))
ok('H07 animación: x=1,66 → 3,46; x=1,05 → 2,10', round((1.66 ** 2 - 1) / log(1.66), 2) == 3.46 and round((1.05 ** 2 - 1) / log(1.05), 2) == 2.10)
ok('H07-A: (x³−8)/(x²−4) → 3 en 2', lim0(lambda x: (x ** 3 - 8) / (x * x - 4), 2, 3) and F(3 * 4, 2 * 2) == 3)
ok('H07-B: (e^{2x}−1)/sen x → 2 en 0', lim0(lambda x: (exp(2 * x) - 1) / sin(x), 0, 2))
ok('H07-C: x²/e^x → 0 en +∞', all(x * x / exp(x) < t for x, t in ((20, 1e-5), (50, 1e-15))))
ok('H08 ej.1: x·ln x → 0 en 0⁺; (1/x)/(−1/x²) = −x', all(abs(x * log(x)) < t for x, t in ((1e-3, 1e-2), (1e-6, 2e-5), (1e-9, 3e-8))) and all(cerca((1 / x) / (-1 / x ** 2), -x) for x in (0.1, 0.5, 2)))
ok('H08 ej.2: x^x → 1 en 0⁺', all(abs(x ** x - 1) < t for x, t in ((1e-3, 1e-2), (1e-6, 2e-5))))
ok('H08 ej.3: (1+2/x)^x → e² ≈ 7,39; exponente → 2', all(abs((1 + 2 / x) ** x - e ** 2) < t for x, t in ((1e4, 1e-2), (1e6, 1e-4))) and round(e ** 2, 2) == 7.39 and cerca(dnum(lambda x: log(1 + 2 / x), 5), (1 / (1 + 2 / 5)) * (-2 / 25)))
ok('H08 ej.4: 1/x − 1/sen x → 0 en 0⁺; derivadas del denominador', lim0(lambda x: 1 / x - 1 / sin(x), 0, 0, lado=1) and cerca(dnum(lambda x: x * sin(x), 0.7), sin(0.7) + 0.7 * cos(0.7)) and cerca(dnum(lambda x: sin(x) + x * cos(x), 0.7), 2 * cos(0.7) - 0.7 * sin(0.7)))
ok('H08: (1+k/x)^x → e^k para k = 1, 2, 3; e ≈ 2,72', all(abs((1 + k / 1e7) ** 1e7 - e ** k) < 1e-4 for k in (1, 2, 3)) and round(e, 2) == 2.72)
ok('H08-A: x·e^{−x} → 0; H08-B: x^{1/x} → 1 en +∞', 50 * exp(-50) < 1e-15 and all(abs(x ** (1 / x) - 1) < t for x, t in ((1e6, 2e-5), (1e9, 3e-8))))
ok('H08 animación: mínimos en x = 1/e: x·ln x = −1/e ≈ −0,37 y x^x ≈ 0,69', round(-1 / e, 2) == -0.37 and round(exp(-1 / e), 2) == 0.69)

print('\nERRORES:', err); raise SystemExit(1 if err else 0)
