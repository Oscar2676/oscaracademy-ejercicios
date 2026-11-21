#!/usr/bin/env python3
"""Comprobación numérica de todas las igualdades y resultados del lote 24 (Binomio de Newton)."""
from math import comb, factorial, sqrt, isclose
err = 0
def ok(n, c):
    global err
    print(('ok   ' if c else 'FALSO') + ' ' + n)
    if not c: err += 1
def pol(co, x): return sum(c * x ** i for i, c in enumerate(reversed(co)))
X = (-2.5, -1, 0.3, 1, 2.7)
# H01
ok('H01 (a+b)² y (a−b)²', all(isclose((a + b) ** 2, a * a + 2 * a * b + b * b) and isclose((a - b) ** 2, a * a - 2 * a * b + b * b) for a in X for b in X))
ok('H01 ej.1–4: x²+10x+25; 9x²−12xy+4y²; 3+2√2; 961 y 841', all(isclose((x + 5) ** 2, pol([1, 10, 25], x)) for x in X) and all(isclose((3 * x - 2 * y) ** 2, 9 * x * x - 12 * x * y + 4 * y * y) for x in X for y in X) and isclose((sqrt(2) + 1) ** 2, 3 + 2 * sqrt(2)) and 31 ** 2 == 961 and 29 ** 2 == 841 and (2 + 3) ** 2 - (4 + 9) == 12)
ok('H01-A 4x²+28x+49; H01-B 25m²−5m+¼; H01-C 529 y 129', all(isclose((2 * x + 7) ** 2, pol([4, 28, 49], x)) and isclose((5 * x - 0.5) ** 2, pol([25, -5, 0.25], x)) for x in X) and 23 ** 2 == 400 + 120 + 9 == 529 and 529 - 400 == 129)
ok('H01 animación: 3,4² = 4,84 + 2·2,64 + 1,44 = 11,56', isclose(3.4 ** 2, 4.84 + 2 * 2.64 + 1.44) and isclose(2.2 * 1.2, 2.64))
# H02
ok('H02 (a+b)³ y (a−b)³', all(isclose((a + b) ** 3, a ** 3 + 3 * a * a * b + 3 * a * b * b + b ** 3) and isclose((a - b) ** 3, a ** 3 - 3 * a * a * b + 3 * a * b * b - b ** 3) for a in X for b in X))
ok('H02 ej.1–4: x³+6x²+12x+8; 8x³−36x²+54x−27; 1331; x⁶+3x⁴y+3x²y²+y³', all(isclose((x + 2) ** 3, pol([1, 6, 12, 8], x)) and isclose((2 * x - 3) ** 3, pol([8, -36, 54, -27], x)) for x in X) and 11 ** 3 == 1331 and all(isclose((x * x + y) ** 3, x ** 6 + 3 * x ** 4 * y + 3 * x * x * y * y + y ** 3) for x in X for y in X) and 27 - 9 == 6 + 12)
ok('H02-A y³+12y²+48y+64; H02-B 27a³−27a²b+9ab²−b³; H02-C 1728, 728, 72,8 %', all(isclose((x + 4) ** 3, pol([1, 12, 48, 64], x)) for x in X) and all(isclose((3 * a - b) ** 3, 27 * a ** 3 - 27 * a * a * b + 9 * a * b * b - b ** 3) for a in X for b in X) and 12 ** 3 == 1000 + 600 + 120 + 8 == 1728 and 1728 - 1000 == 728)
ok('H02 capas: a³+2a²b+ab² (abajo) + a²b+2ab²+b³ (arriba) = (a+b)³; 8 bloques', all(isclose(a ** 3 + 2 * a * a * b + a * b * b + a * a * b + 2 * a * b * b + b ** 3, (a + b) ** 3) for a in X for b in X) and 1 + 3 + 3 + 1 == 8)
# H03
ok('H03 filas 0–6 = combinatorios; regla de la suma; suma de fila = 2ⁿ', [comb(4, k) for k in range(5)] == [1, 4, 6, 4, 1] and [comb(5, k) for k in range(6)] == [1, 5, 10, 10, 5, 1] and [comb(6, k) for k in range(7)] == [1, 6, 15, 20, 15, 6, 1] and all(comb(n, k) == comb(n - 1, k - 1) + comb(n - 1, k) for n in range(2, 9) for k in range(1, n)) and all(sum(comb(n, k) for k in range(n + 1)) == 2 ** n for n in range(9)))
ok('H03 ej.2 (x+2)⁴; ej.4 (a−b)⁴; H03-B 8x³−12x²+6x−1; H03-C 6 de 16', all(isclose((x + 2) ** 4, pol([1, 8, 24, 32, 16], x)) and isclose((2 * x - 1) ** 3, pol([8, -12, 6, -1], x)) for x in X) and all(isclose((a - b) ** 4, a ** 4 - 4 * a ** 3 * b + 6 * a * a * b * b - 4 * a * b ** 3 + b ** 4) for a in X for b in X) and 1 + 8 + 24 + 32 + 16 == 81 and comb(4, 2) == 6 and 2 ** 4 == 16)
# H04
ok('H04 C(n,k) = n(n−1)…(n−k+1)/k! = n!/(k!(n−k)!); simetría; 2ⁿ elecciones', all(comb(n, k) == factorial(n) // (factorial(k) * factorial(n - k)) == comb(n, n - k) for n in range(9) for k in range(n + 1)) and comb(4, 2) == 6 and comb(5, 2) == comb(5, 3) == 10 and 2 ** 5 == 32 == sum(comb(5, k) for k in range(6)))
import itertools
ok('H04 conteo directo de productos: (a+b)³ → 1,3,3,1; (a+b)⁴ con dos b → 6; (a+b)⁵ con dos b → 10', [sum(1 for w in itertools.product('ab', repeat=3) if w.count('b') == k) for k in range(4)] == [1, 3, 3, 1] and sum(1 for w in itertools.product('ab', repeat=4) if w.count('b') == 2) == 6 and sum(1 for w in itertools.product('ab', repeat=5) if w.count('b') == 2) == 10)
ok('H04-B C(6,4) = 15 = 720/(24·2)', comb(6, 4) == 15 == 720 // (24 * 2))
# H05
ok('H05 teorema del binomio, n = 0…8', all(isclose((a + b) ** n, sum(comb(n, k) * a ** (n - k) * b ** k for k in range(n + 1)), rel_tol=1e-9, abs_tol=1e-9) for n in range(9) for a in X for b in X))
ok('H05 ej.3 (2x+y)³; H05-A (x+1)⁵; H05-B (x+3)⁴ (256); H05-C 1,331 → 133 100', all(isclose((2 * x + y) ** 3, 8 * x ** 3 + 12 * x * x * y + 6 * x * y * y + y ** 3) for x in X for y in X) and all(isclose((x + 1) ** 5, pol([1, 5, 10, 10, 5, 1], x)) and isclose((x + 3) ** 4, pol([1, 12, 54, 108, 81], x)) for x in X) and 1 + 12 + 54 + 108 + 81 == 256 and isclose(1.1 ** 3, 1.331) and round(100000 * 1.331) == 133100 and factorial(4) == 24 and factorial(5) // (2 * 6) == 10)
print('\nERRORES:', err)
