#!/usr/bin/env python3
"""Comprobación numérica de todas las igualdades y resultados del lote 24 (Binomio de Newton)."""
from math import comb, factorial, sqrt
from math import isclose as _ic
def isclose(a, b, rel_tol=1e-9, abs_tol=1e-9): return _ic(a, b, rel_tol=rel_tol, abs_tol=abs_tol)
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
# H06
ok('H06 C(5,2)=10=120/(2·6); C(8,3)=56=336/6; C(10,8)=C(10,2)=45; C(6,3)=10+10=20; 6!/3!=120', comb(5, 2) == 10 == 120 // (2 * 6) and comb(8, 3) == 56 == 336 // 6 and comb(10, 8) == comb(10, 2) == 45 and comb(6, 3) == comb(5, 2) + comb(5, 3) == 20 and factorial(6) // factorial(3) == 120 and all(len(list(itertools.combinations(range(5), k))) == comb(5, k) for k in range(6)))
ok('H06 regla de Pascal y forma «con orden»: n(n−1)…(n−k+1)/k!', all(comb(n, k) == comb(n - 1, k - 1) + comb(n - 1, k) for n in range(2, 12) for k in range(1, n)) and all(comb(n, k) * factorial(k) == factorial(n) // factorial(n - k) for n in range(10) for k in range(n + 1)))
ok('H06-A 35 = 210/6; H06-B 66; H06-C 56', comb(7, 3) == 35 == 210 // 6 and comb(12, 10) == 66 and comb(8, 3) == 56)
# H07
ok('H07 ej.1 (2x+3)⁴ = 16x⁴+96x³+216x²+216x+81 (625)', all(isclose((2 * x + 3) ** 4, pol([16, 96, 216, 216, 81], x)) for x in X) and 16 + 96 + 216 + 216 + 81 == 625 == 5 ** 4 and [comb(4, k) * 2 ** (4 - k) * 3 ** k for k in range(5)] == [16, 96, 216, 216, 81])
ok('H07 ej.2 (x²+1)³; ej.3 (a+2b)⁵ (243); ej.4 (x+1/x)⁴', all(isclose((x * x + 1) ** 3, pol([1, 0, 3, 0, 3, 0, 1], x)) for x in X) and all(isclose((a + 2 * b) ** 5, a ** 5 + 10 * a ** 4 * b + 40 * a ** 3 * b * b + 80 * a * a * b ** 3 + 80 * a * b ** 4 + 32 * b ** 5, rel_tol=1e-9, abs_tol=1e-7) for a in X for b in X) and 1 + 10 + 40 + 80 + 80 + 32 == 243 and all(isclose((x + 1 / x) ** 4, x ** 4 + 4 * x * x + 6 + 4 / x ** 2 + 1 / x ** 4) for x in X))
ok('H07-A (x+2)⁵; H07-B (3x+1)⁴ (256); H07-C 1,21550625 → 243 101', all(isclose((x + 2) ** 5, pol([1, 10, 40, 80, 80, 32], x), abs_tol=1e-7) and isclose((3 * x + 1) ** 4, pol([81, 108, 54, 12, 1], x), abs_tol=1e-7) for x in X) and 81 + 108 + 54 + 12 + 1 == 256 and isclose(1.05 ** 4, 1.21550625) and isclose(1 + 0.2 + 0.015 + 0.0005 + 0.00000625, 1.21550625) and round(200000 * 1.21550625) == 243101)
# H08
ok('H08 (a−b)ⁿ = Σ (−1)ᵏ C(n,k) aⁿ⁻ᵏ bᵏ, n = 0…8; suma alternada = 0', all(isclose((a - b) ** n, sum((-1) ** k * comb(n, k) * a ** (n - k) * b ** k for k in range(n + 1)), abs_tol=1e-6) for n in range(9) for a in X for b in X) and all(sum((-1) ** k * comb(n, k) for k in range(n + 1)) == 0 for n in range(1, 10)))
ok('H08 ej.2 (x−2)⁴; ej.3 (2x−y)³; ej.4 (−a+b)³', all(isclose((x - 2) ** 4, pol([1, -8, 24, -32, 16], x), abs_tol=1e-7) for x in X) and 1 - 8 + 24 - 32 + 16 == 1 and all(isclose((2 * x - y) ** 3, 8 * x ** 3 - 12 * x * x * y + 6 * x * y * y - y ** 3) and isclose((-x + y) ** 3, -x ** 3 + 3 * x * x * y - 3 * x * y * y + y ** 3) for x in X for y in X))
ok('H08-A (x−1)⁶; H08-B 27−54x+36x²−8x³; H08-C 0,729 → 36 450; 27,1 %', all(isclose((x - 1) ** 6, pol([1, -6, 15, -20, 15, -6, 1], x), abs_tol=1e-7) and isclose((3 - 2 * x) ** 3, pol([-8, 36, -54, 27], x), abs_tol=1e-7) for x in X) and 27 - 54 + 36 - 8 == 1 and isclose(0.9 ** 3, 0.729) and round(50000 * 0.729) == 36450 and round(50000 * 0.7) == 35000 and isclose(1 - 0.729, 0.271) and (-2) ** 4 == 16 and -2 ** 4 == -16)
# H09
ok('H09 n+1 términos; centrales; ej.4 exponentes 18−3k distintos', comb(7, 3) == comb(7, 4) == 35 and len(set(18 - 3 * k for k in range(10))) == 10 and [18 - 3 * k for k in range(10)][-1] == -9 and all(max(comb(n, k) for k in range(n + 1)) == comb(n, n // 2) for n in range(1, 15)))
# H10
ok('H10 ej.1 20a³b³; ej.2 80x³; ej.3 560x³; ej.4 81x⁴ e y⁴', comb(6, 3) == 20 and comb(5, 2) * 2 ** 3 == 80 and comb(7, 4) * (-2) ** 4 == 560 and 3 ** 4 == 81)
ok('H10-A 24x⁷; H10-B −126a⁴b⁵; H10-C 45·0,0016 = 0,072', comb(8, 1) * 3 == 24 and comb(9, 5) == 126 == 9 * 8 * 7 * 6 // 24 and isclose(comb(10, 2) * 0.04 ** 2, 0.072) and comb(10, 2) == 45)
print('\nERRORES:', err)
