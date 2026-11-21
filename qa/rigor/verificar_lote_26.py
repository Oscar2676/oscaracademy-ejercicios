#!/usr/bin/env python3
"""Verifica las cuentas del lote 26 (ecuación cuadrática)."""
from math import sqrt, isclose
from fractions import Fraction as F
err = 0
def ok(c, m):
    global err
    if not c: err += 1; print('ERROR', m)
def sol(a, b, c):
    D = b*b - 4*a*c
    return D, ((-b + sqrt(D))/(2*a), (-b - sqrt(D))/(2*a)) if D >= 0 else None
D, r = sol(2, -7, 3); ok(D == 25 and r == (3, 0.5) and 2*9 - 21 + 3 == 0, 'e1')
D, r = sol(1, -6, 9); ok(D == 0 and r == (3, 3), 'e2')
D, r = sol(1, -4, 1); ok(D == 12 and isclose(r[0], 2 + sqrt(3)) and abs(r[0] - 3.732) < 5e-4 and abs(r[1] - 0.268) < 5e-4, 'e3')
D, r = sol(1, 2, 5); ok(D == -16 and r is None and all(isclose(x*x + 2*x + 5, (x + 1)**2 + 4) for x in (-3, 0, 2.5)), 'e4')
D, r = sol(3, 5, -2); ok(D == 49 and isclose(r[0], 1/3) and r[1] == -2, 'A')
ok(all(k*k - 36 == 0 for k in (6, -6)) and sol(1, 6, 9)[1] == (-3, -3) and sol(1, -6, 9)[1] == (3, 3), 'B')
D, r = sol(-5, 20, 1); ok(D == 420 and abs(sqrt(420) - 20.494) < 5e-4 and abs(r[0] + 0.049) < 5e-4 and abs(r[1] - 4.049) < 5e-4, 'C')
# identidad de la demostración, con fracciones exactas
for a, b, c, x in [(2, -7, 3, F(5, 3)), (-5, 20, 1, F(-2, 7)), (3, 5, -2, F(9, 4))]:
    a, b, c = F(a), F(b), F(c)
    ok(x*x + b/a*x + b*b/(4*a*a) == (x + b/(2*a))**2 and b*b/(4*a*a) - c/a == (b*b - 4*a*c)/(4*a*a), 'identidad')
# animación del discriminante: x² − 2x + c
for c in (-3, 0, 1, 2.5):
    D = 4 - 4*c
    if D >= 0: ok(all(isclose(z*z - 2*z + c, 0, abs_tol=1e-12) for z in (1 - sqrt(D)/2, 1 + sqrt(D)/2)), 'disc')
print('Lote 26 H01:', 'sin errores' if not err else f'{err} errores')
