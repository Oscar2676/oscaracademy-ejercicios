#!/usr/bin/env python3
"""Lote 16: segunda pasada por otro camino. Aproximaciones con decimales de alta precisión e identidades con letras en valores al azar."""
from decimal import Decimal as D, getcontext
import random, math
getcontext().prec = 40
def r(x, n): return D(x) ** (D(1) / D(n))
def red(x, k): return str(x.quantize(D(1).scaleb(-k)))
ok = True
def chk(nombre, val, texto, k):
    global ok
    b = red(val, k) == texto; ok &= b; print('OK ' if b else 'MAL', nombre, red(val, k), texto)
chk('6√2', r(2, 6), '1.122', 3)
chk('6√32', r(32, 6), '1.782', 3)
chk('4√2', r(2, 4), '1.189', 3)
chk('2·3√9', 2 * r(9, 3), '4.160', 3)
chk('3√2/2', 3 * r(2, 2) / 2, '2.121', 3)
chk('2(√5−√2)', 2 * (r(5, 2) - r(2, 2)), '1.644', 3)
chk('6/√3', 6 / r(3, 2), '3.4641', 4)
chk('2√3', 2 * r(3, 2), '3.4641', 4)
chk('√2/2', r(2, 2) / 2, '0.7071', 4)
chk('1/√2', 1 / r(2, 2), '0.7071', 4)
def cerca(x, y): return abs(x - y) <= D(10) ** -25 * max(1, abs(x), abs(y))
pares = [
 ('√2·3√4 = 2·6√2', r(2,2)*r(4,3), 2*r(2,6)), ('√2·3√4 = 6√128', r(2,2)*r(4,3), r(128,6)),
 ('√8/4√4 = 2', r(8,2)/r(4,4), D(2)), ('√2/3√2 = 6√2', r(2,2)/r(2,3), r(2,6)),
 ('√2·3√2 = 6√32', r(2,2)*r(2,3), r(32,6)), ('√2/4√2 = 4√2', r(2,2)/r(2,4), r(2,4)),
 ('6/√3 = 2√3', 6/r(3,2), 2*r(3,2)), ('10/3√5 = 2·3√25', 10/r(5,3), 2*r(25,3)),
 ('4/(√7−√3) = √7+√3', 4/(r(7,2)-r(3,2)), r(7,2)+r(3,2)), ('3/√2 = 3√2/2', 3/r(2,2), 3*r(2,2)/2),
 ('6/3√3 = 2·3√9', 6/r(3,3), 2*r(9,3)), ('6/(√5+√2) = 2(√5−√2)', 6/(r(5,2)+r(2,2)), 2*(r(5,2)-r(2,2))),
 ('(3√2)^4 = 4√2^... 3 teclas: (12√2)^3 = 4√2', r(2,12)**3, r(2,4)), ('(12√2)^6 = √2', r(2,12)**6, r(2,2)),
]
for n, x, y in pares:
    b = cerca(x, y); ok &= b; print('OK ' if b else 'MAL', n)
random.seed(16)
for _ in range(2000):
    a = D(random.randint(1, 9000)) / 100; b = D(random.randint(1, 9000)) / 100; k = D(random.randint(-50, 50))
    n = random.randint(2, 7); m = random.randint(2, 7); kk = random.randint(1, 6)
    t = [cerca(r(a, n), r(a ** kk, n * kk)),
         cerca(r(a, n) * r(b, m), r(a ** m * b ** n, n * m)),
         cerca(r(a, n) / r(b, m), r(a ** m / b ** n, n * m)),
         cerca(k / r(a, 2), k * r(a, 2) / a)]
    mm = random.randint(1, n - 1)
    t.append(cerca(k / r(a ** mm, n), k * r(a ** (n - mm), n) / a))
    if a != b:
        t.append(cerca(k / (r(a, 2) + r(b, 2)), k * (r(a, 2) - r(b, 2)) / (a - b)))
        t.append(cerca(k / (r(a, 2) - r(b, 2)), k * (r(a, 2) + r(b, 2)) / (a - b)))
    if not all(t): ok = False; print('MAL identidad', a, b, k, n, m, kk, t)
print('identidades con letras: 2000 casos al azar por fórmula')
assert (-8) ** 2 == 64 and 2 ** 6 == 64 and (-8) ** 3 == -512 and (-2) ** 9 == -512 and 8 ** 4 == 4096 and 4096 // 16 == 256 and 2 ** 8 == 256 and 64 ** 5 == 1073741824 and 729 ** 5 == 205891132094649
print('TODO OK' if ok else 'HAY ERRORES')
