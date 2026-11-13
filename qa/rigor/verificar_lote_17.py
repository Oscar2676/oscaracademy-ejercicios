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
