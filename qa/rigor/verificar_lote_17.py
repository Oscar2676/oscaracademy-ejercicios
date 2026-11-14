#!/usr/bin/env python3
"""Lote 17: segunda pasada por otro camino (logaritmos y ejercicio especial)."""
from fractions import Fraction as F
from decimal import Decimal as D, getcontext
import math
getcontext().prec = 40
assert 2**3 == 8 and 10**3 == 1000 and F(3)**-2 == F(1, 9) and 2**10 == 1024 and F(10)**-2 == F(1, 100) and 10**6 == 1000000 and 5**4 == 625 and 8*2 == 16 and 10**2 == 100
r2, r8 = D(2).sqrt(), D(8).sqrt()
p = (D(5).ln() * r2).exp()
assert str(p.quantize(D('0.0001'))) == '9.7385', p
assert str(r8.quantize(D('0.0001'))) == '2.8284', r8
q = (p.ln() * r8).exp(); assert abs(q - 625) < D('1e-30'), q
assert abs(r8 * r2 - 4) < D('1e-35')
assert str(D(1).exp().quantize(D('0.00001'))) == '2.71828'
# rótulos de la animación: bases 1/2, 2, 3 y exponentes -2..2
for A in (F(1, 2), F(2), F(3)):
    for u in range(-2, 3):
        val = A**u; assert abs(math.log(val, A) - u) < 1e-12
        print(f'a={A}  a^{u}={val}  log_a({val})={u}')
print('TODO OK')

# ---- H02 Propiedades de los logaritmos ----
import random
def lg(b, x): return math.log(x) / math.log(b)
assert 4*8 == 32 == 2**5 and 81//3 == 27 == 3**3 and 3**4 == 81 and 4**3 == 64 == 2**6 and round(64 ** (1/3)) == 4 and 2**2 == 4
assert abs(8 ** (5/3) - 32) < 1e-9 and abs(lg(8, 32) - 5/3) < 1e-12
assert lg(2, 8) == 3 and abs(lg(2, 16) - 4) < 1e-12 and 12*3 == 36 and 4**6 == 4096 == 2**12
assert abs(lg(2, (4 ** math.sqrt(3)) ** math.sqrt(12)) - 12) < 1e-9
assert f'{math.log10(2):.5f}' == '0.30103' and f'{math.log10(1.02):.5f}' == '0.00860'
t = math.log10(2) / math.log10(1.02); assert f'{t:.1f}' == '35.0', t
random.seed(17)
for _ in range(5000):
    a = random.choice([random.uniform(0.05, 0.95), random.uniform(1.05, 30)]); b = random.choice([random.uniform(0.05, 0.95), random.uniform(1.05, 30)])
    x = random.uniform(0.01, 500); y = random.uniform(0.01, 500); r = random.uniform(-6, 6); n = random.randint(2, 9)
    ok = lambda u, w: abs(u - w) <= 1e-8 * max(1, abs(u), abs(w))
    assert ok(lg(a, 1), 0) and ok(lg(a, a), 1) and ok(lg(a, a ** r), r) and ok(a ** lg(a, x), x)
    assert ok(lg(a, x*y), lg(a, x) + lg(a, y)) and ok(lg(a, x/y), lg(a, x) - lg(a, y)) and ok(lg(a, x ** r), r * lg(a, x))
    assert ok(lg(a, x ** (1/n)), lg(a, x) / n) and ok(lg(a, x), lg(b, x) / lg(b, a))
for p in (1, 2, 3):
    for q in (1, 2, 3): assert lg(2, 2**p * 2**q) == p + q or abs(lg(2, 2**p * 2**q) - (p + q)) < 1e-12
print('H02 TODO OK: 9 propiedades en 5000 valores al azar')
