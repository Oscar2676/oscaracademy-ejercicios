#!/usr/bin/env python3
"""Lote 19 (análisis de funciones, H01–H04): segunda pasada por otro camino, con fracciones exactas.
Cada derivada escrita en la hoja se compara con la derivada calculada por coeficientes; cada factorización,
tabla de signos y valor se recalcula. Las funciones racionales se comprueban con el cociente incremental exacto."""
from fractions import Fraction as F
err = 0
def ok(n, c):
    global err
    print(('ok     ' if c else 'FALSO  ') + n); err += 0 if c else 1
def P(co): return lambda x: sum(F(c) * F(x) ** (len(co) - 1 - i) for i, c in enumerate(co))
def D(co): n = len(co) - 1; return [F(c) * (n - i) for i, c in enumerate(co[:-1])]
XS = [F(k, 7) for k in range(-40, 60)]
def igual(g, h, xs=XS): return all(g(x) == h(x) for x in xs)
def sg(v): return (v > 0) - (v < 0)
def signo(g, a, b, n=60):
    """signo constante de g en (a, b), probado en n puntos racionales interiores"""
    pts = [a + (b - a) * F(k, n + 1) for k in range(1, n + 1)]; s = {sg(g(x)) for x in pts}
    return s.pop() if len(s) == 1 else None
INF = F(50)

# H01
f = [1, -6, 9, 1]
ok("H01 f' = 3x²−12x+9 = 3(x−1)(x−3)", D(f) == [3, -12, 9] and igual(P(D(f)), lambda x: 3 * (x - 1) * (x - 3)))
ok('H01 signos + − + en (−∞,1), (1,3), (3,∞)', (signo(P(D(f)), -INF, F(1)), signo(P(D(f)), F(1), F(3)), signo(P(D(f)), F(3), INF)) == (1, -1, 1))
ok("H01 f'(0)=9, f'(2)=−3, f'(4)=9, f(1)=5, f(3)=1", [P(D(f))(x) for x in (0, 2, 4)] == [9, -3, 9] and P(f)(1) == 5 and P(f)(3) == 1)
ok("H01-A f'=2x−4; − en x<2, + en x>2", D([1, -4, 1]) == [2, -4] and signo(P([2, -4]), -INF, F(2)) == -1 and signo(P([2, -4]), F(2), INF) == 1)
q = lambda x: F(x) / (F(x) ** 2 + 1); dq = lambda x: (1 - F(x) ** 2) / (F(x) ** 2 + 1) ** 2
h = F(1, 10 ** 9)
ok("H01-B f'=(1−x²)/(x²+1)²: cociente incremental simétrico coincide (error < 1e-8)", all(abs((q(x + h) - q(x - h)) / (2 * h) - dq(x)) < F(1, 10 ** 8) for x in XS))
ok("H01-B signos − + −; f'(−2)=−3/25, f'(0)=1, f'(2)=−3/25", (signo(dq, -INF, F(-1)), signo(dq, F(-1), F(1)), signo(dq, F(1), INF)) == (-1, 1, -1) and dq(-2) == F(-3, 25) and dq(0) == 1 and dq(2) == F(-3, 25))
G = [-2, 120, -1000]
ok("H01-C G'=−4x+120, cero 30, + en (0,30), − en (30,50), G(30)=800", D(G) == [-4, 120] and P(D(G))(30) == 0 and signo(P(D(G)), F(0), F(30)) == 1 and signo(P(D(G)), F(30), F(50)) == -1 and P(G)(30) == 800)

# H02
f = [1, -3, 0, 1]
ok("H02 f'=3x²−6x=3x(x−2); críticos 0 y 2", D(f) == [3, -6, 0] and igual(P(D(f)), lambda x: 3 * x * (x - 2)))
ok('H02 f(−1)=−3, f(0)=1, f(2)=−3, f(4)=17; máx 17, mín −3', [P(f)(x) for x in (-1, 0, 2, 4)] == [-3, 1, -3, 17])
ok('H02 en todo [−1,4]: −3 ≤ f ≤ 17 (malla exacta de 501 puntos)', all(-3 <= P(f)(F(-1) + F(5 * k, 500)) <= 17 for k in range(501)))
ok('H02 animación: + en (−1,0), − en (0,2), + en (2,4)', (signo(P(D(f)), F(-1), F(0)), signo(P(D(f)), F(0), F(2)), signo(P(D(f)), F(2), F(4))) == (1, -1, 1))
f = [1, -4, 5]
ok("H02-A f'=2x−4; f(2)=1, f(0)=5, f(3)=2", D(f) == [2, -4] and [P(f)(x) for x in (2, 0, 3)] == [1, 5, 2])
r = lambda x: F(x) + 4 / F(x); dr = lambda x: 1 - 4 / F(x) ** 2
ok("H02-B f'=1−4/x²: ceros ±2; f(2)=4, f(1)=5, f(4)=5; 4 ≤ f ≤ 5 en [1,4]", dr(2) == 0 and dr(-2) == 0 and (r(2), r(1), r(4)) == (4, 5, 5) and all(4 <= r(1 + F(3 * k, 300)) <= 5 for k in range(301)) and all(abs((r(x + h) - r(x - h)) / (2 * h) - dr(x)) < F(1, 10 ** 8) for x in [F(k, 4) for k in range(4, 17)]))
A = [-2, 40, 0]
ok("H02-C A=40x−2x²=x(40−2x); A'=40−4x; A(10)=200, A(0)=0, A(20)=0; lado 20", igual(P(A), lambda x: x * (40 - 2 * x)) and D(A) == [-4, 40] and [P(A)(x) for x in (10, 0, 20)] == [200, 0, 0] and 40 - 2 * 10 == 20)

# H03
f = [F(1, 4), -1, 0, 0, 0]
ok("H03 f'=x³−3x²=x²(x−3)", D(f) == [1, -3, 0, 0] and igual(P(D(f)), lambda x: x * x * (x - 3)))
ok("H03 signos − − +; f'(−1)=−4, f'(1)=−2, f'(4)=16; f(3)=−27/4", (signo(P(D(f)), -INF, F(0)), signo(P(D(f)), F(0), F(3)), signo(P(D(f)), F(3), INF)) == (-1, -1, 1) and [P(D(f))(x) for x in (-1, 1, 4)] == [-4, -2, 16] and P(f)(3) == F(-27, 4) and F(81, 4) - F(108, 4) == F(-27, 4))
ok('H03-A máx local f(1)=5, mín local f(3)=1 (misma función de H01)', P([1, -6, 9, 1])(1) == 5 and P([1, -6, 9, 1])(3) == 1)
# B: ∛(x²): f'(x)=2/(3∛x). Se comprueba en cubos perfectos x = t³: f(t³)=t², y d/dt[t²] = f'(t³)·3t²  ⇒ f'(t³) = 2t/(3t²) = 2/(3t)
ok("H03-B f'(x)=2/(3∛x) en x=t³: 2t = [2/(3t)]·3t² (regla de la cadena, exacto)", all(2 * t == (F(2) / (3 * t)) * 3 * t * t for t in [F(k, 5) for k in range(-20, 21) if k]))
C = lambda t: 8 * F(t) / (F(t) ** 2 + 4); dC = lambda t: 8 * (2 - F(t)) * (2 + F(t)) / (F(t) ** 2 + 4) ** 2
ts = [F(k, 5) for k in range(0, 60)]
ok("H03-C C'=8(2−t)(2+t)/(t²+4)²: coincide con cociente incremental; 32−8t²=8(4−t²)", all(abs((C(t + h) - C(t - h)) / (2 * h) - dC(t)) < F(1, 10 ** 8) for t in ts) and igual(lambda x: 8 * (x * x + 4) - 8 * x * 2 * x, lambda x: 8 * (2 - x) * (2 + x)))
ok('H03-C signos + en (0,2), − en (2,∞); C(2)=2; C(t) ≤ 2 para t ≥ 0', signo(dC, F(0), F(2)) == 1 and signo(dC, F(2), INF) == -1 and C(2) == 2 and all(C(F(k, 10)) <= 2 for k in range(0, 500)))

# H04
f = [1, -3, 0, 2]
ok("H04 f'=3x²−6x, f''=6x−6=6(x−1)", D(f) == [3, -6, 0] and D(D(f)) == [6, -6] and igual(P(D(D(f))), lambda x: 6 * (x - 1)))
ok("H04 f''(0)=−6, f''(2)=6, signos − +, f(1)=0", P(D(D(f)))(0) == -6 and P(D(D(f)))(2) == 6 and signo(P(D(D(f))), -INF, F(1)) == -1 and signo(P(D(D(f))), F(1), INF) == 1 and P(f)(1) == 0)
g = [1, 0, 0, 0, 0]
ok("H04 x⁴: g'=4x³, g''=12x², g''>0 a ambos lados de 0", D(g) == [4, 0, 0, 0] and D(D(g)) == [12, 0, 0] and signo(P(D(D(g))), -INF, F(0)) == 1 and signo(P(D(D(g))), F(0), INF) == 1)
f = [1, -4, 0, 0, 0]
ok("H04-A f'=4x³−12x², f''=12x²−24x=12x(x−2); signos + − +", D(f) == [4, -12, 0, 0] and D(D(f)) == [12, -24, 0] and igual(P(D(D(f))), lambda x: 12 * x * (x - 2)) and (signo(P(D(D(f))), -INF, F(0)), signo(P(D(D(f))), F(0), F(2)), signo(P(D(D(f))), F(2), INF)) == (1, -1, 1))
ok("H04-A f''(−1)=36, f''(1)=−12, f''(3)=36; f(0)=0, f(2)=−16", [P(D(D(f)))(x) for x in (-1, 1, 3)] == [36, -12, 36] and P(f)(0) == 0 and P(f)(2) == -16)
d1 = lambda x: 1 - 1 / F(x) ** 2; d2 = lambda x: 2 / F(x) ** 3
xs = [F(k, 6) for k in range(-30, 31) if k]
ok("H04-B (x+1/x)'' = 2/x³: cociente incremental de 1−1/x²; f''(−1)=−2, f''(1)=2", all(abs((d1(x + h) - d1(x - h)) / (2 * h) - d2(x)) < F(1, 10 ** 6) for x in xs) and d2(-1) == -2 and d2(1) == 2)
V = [-1, 9, 0, 0]
ok("H04-C V'=−3t²+18t=3t(6−t), V''=−6t+18; + en (0,3), − en (3,6); V(3)=54, V'(3)=27", D(V) == [-3, 18, 0] and igual(P(D(V)), lambda x: 3 * x * (6 - x)) and D(D(V)) == [-6, 18] and signo(P(D(D(V))), F(0), F(3)) == 1 and signo(P(D(D(V))), F(3), F(6)) == -1 and P(V)(3) == 54 and P(D(V))(3) == 27 and signo(P(D(V)), F(0), F(6)) == 1)
print('\nERRORES:', err); raise SystemExit(1 if err else 0)
