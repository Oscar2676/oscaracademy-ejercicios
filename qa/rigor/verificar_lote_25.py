#!/usr/bin/env python3
"""Verifica las cuentas de las hojas del lote 25 (series y sucesiones)."""
from fractions import Fraction as F
from math import factorial
err = 0
def ok(c, m):
    global err
    if not c: err += 1; print('ERROR', m)
# H01
ok([2*n+1 for n in range(1,7)] == [3,5,7,9,11,13], 'H01 e1')
ok([(-1)**n*n for n in range(1,6)] == [-1,2,-3,4,-5], 'H01 e2')
a=[2]
for _ in range(4): a.append(a[-1]+3)
ok(a == [2,5,8,11,14], 'H01 e3'); ok(3*19+4 == 61 and 3+4 == 7, 'H01 e4')
ok([n*n-n for n in range(1,6)] == [0,2,6,12,20], 'H01 A'); ok(4*20+1 == 81, 'H01 B'); ok(sum(500*n for n in range(1,8)) == 14000, 'H01 C')
# H02
ok(F(99,100) == F(99,99+1), 'H02 e2'); f=[1,1]
while len(f) < 7: f.append(f[-1]+f[-2])
ok(f == [1,1,2,3,5,8,13], 'H02 e3'); ok(F(1,2*25) == F(1,50), 'H02 e4')
ok([F(2*n-1,n) for n in range(1,6)] == [1,F(3,2),F(5,3),F(7,4),F(9,5)], 'H02 A'); ok(2**7 == 128 and 2**6 < 100 < 2**7, 'H02 B')
ok([2*F(3,4)**n for n in (1,2,3)] == [F(3,2),F(9,8),F(27,32)] and F(27,32) == F(84375,100000), 'H02 C')
# H03
ok([n*n-1 for n in range(1,7)] == [0,3,8,15,24,35] and 20*20-1 == 399, 'H03 anim')
a=[3]
for _ in range(4): a.append(2*a[-1]-1)
ok(a == [3,5,9,17,33], 'H03 rec')
ok([F((-1)**(n+1),2*n-1) for n in range(1,5)] == [1,F(-1,3),F(1,5),F(-1,7)], 'H03 e1')
ok([F(2**n,factorial(n)) for n in range(1,6)] == [2,2,F(4,3),F(2,3),F(4,15)], 'H03 e2')
ok(F(3*10-1,10+2) == F(29,12) and abs(29/12-2.417) < 5e-4, 'H03 e3')
a=[1,3]
for _ in range(3): a.append(a[-1]+2*a[-2])
ok(a == [1,3,5,11,21], 'H03 e4')
ok([F(n,2*n+1) for n in (1,2,3,4,10)] == [F(1,3),F(2,5),F(3,7),F(4,9),F(10,21)] and abs(10/21-0.476) < 5e-4, 'H03 A')
ok(3*2-4 == 2, 'H03 B'); ok([400+150*n for n in (1,2,3,4,25)] == [550,700,850,1000,4150] and 5000//200 == 25, 'H03 C')
# H04
ok([4*n-1 for n in range(1,5)] == [3,7,11,15] and [2*3**(n-1) for n in range(1,5)] == [2,6,18,54], 'H04 k2')
ok([F((-1)**(n+1),2**(n-1)) for n in range(1,5)] == [1,F(-1,2),F(1,4),F(-1,8)], 'H04 e2')
ok(sum(2*k for k in range(1,11)) == 110, 'H04 e4')
ok([2**(n-1) for n in (1,2,3,4)] == [1,2,4,8] and [F(n*n-n+2,2) for n in (1,2,3,4)] == [1,2,4,7], 'H04 why')
ok([3*n+2 for n in (1,2,3,4,20)] == [5,8,11,14,62], 'H04 A'); ok(sum(F(1,3**k) for k in range(1,5)) == F(40,81), 'H04 B')
s=[2*k+18 for k in range(1,16)]
ok(s[0] == 20 and s[-1] == 48 and s[7] == 34 and sum(s) == 510 == 7*68+34, 'H04 C')
ok(all(sum(F(1,2**k) for k in range(1,n+1)) == 1-F(1,2**n) for n in range(1,7)), 'H04 anim')
# H05
ok(sum(2*k+1 for k in range(1,6)) == 35, 'H05 e1'); ok(sum(2**j for j in range(4)) == 15, 'H05 e2')
ok([i*(i-1) for i in range(3,7)] == [6,12,20,30] and sum(i*(i-1) for i in range(3,7)) == 68, 'H05 e3')
ok(sum(3*k-2 for k in range(1,101)) == 14950 == 3*5050-200 and sum(range(1,101)) == 5050, 'H05 e4')
ok(all(sum(k*k for k in range(1,n+1)) == n*(n+1)*(2*n+1)//6 for n in range(1,50)) and 1+4+9+16 == 30 == 4*5*9//6, 'H05 k²')
ok(1*1+2*2 == 5 and (1+2)*(1+2) == 9 and 3+4+5 == 12 and 1+2+3+2 == 8, 'H05 ojo')
ok(sum(k*k-1 for k in range(1,7)) == 85 == 6*7*13//6-6, 'H05 A'); ok(sum(3*k+1 for k in range(1,11)) == 175 and 3*10+1 == 31, 'H05 B')
ok(sum(1000+500*k for k in range(1,13)) == 51000 and 12*13//2 == 78, 'H05 C')
# H06 · sumas parciales
from itertools import accumulate
def parc(f, n): return list(accumulate(f(k) for k in range(1, n+1)))
ok(parc(lambda k: 2*k-1, 4) == [1,4,9,16] and all(sum(2*k-1 for k in range(1,n+1)) == n*n == 2*(n*(n+1)//2)-n for n in range(1,200)), 'H06 anim / impares')
ok([3*n-1 for n in range(1,5)] == [2,5,8,11] and parc(lambda k: 3*k-1, 4) == [2,7,15,26], 'H06 e1')
ok([F(1,n*(n+1)) for n in range(1,5)] == [F(1,2),F(1,6),F(1,12),F(1,20)] and parc(lambda k: F(1,k*(k+1)), 4) == [F(1,2),F(2,3),F(3,4),F(4,5)], 'H06 e2')
ok(all(F(1,k)-F(1,k+1) == F(1,k*(k+1)) for k in range(1,300)) and all(sum(F(1,k*(k+1)) for k in range(1,n+1)) == 1-F(1,n+1) == F(n,n+1) for n in range(1,120)), 'H06 e2 telescópica')
S3 = lambda n: n*n+2*n
ok(S3(1) == 3 and all(S3(n)-S3(n-1) == 2*n+1 and (n-1)**2+2*(n-1) == n*n-1 for n in range(2,300)) and S3(5)-S3(4) == 35-24 == 11 and parc(lambda k: 2*k+1, 50) == [S3(n) for n in range(1,51)], 'H06 e3')
ok(parc(lambda k: (-1)**(k+1), 7) == [1,0,1,0,1,0,1], 'H06 e4')
ok([4*n-3 for n in range(1,6)] == [1,5,9,13,17] and parc(lambda k: 4*k-3, 5) == [1,6,15,28,45], 'H06 A')
SB = lambda n: 3*n*n-n
ok(SB(1) == 2 and SB(2) == 10 and SB(2)-SB(1) == 8 and SB(10) == 290 and SB(9) == 234 and SB(10)-SB(9) == 56, 'H06 B')
ok([2+F(1,2)*n for n in range(1,6)] == [F(5,2),3,F(7,2),4,F(9,2)] and parc(lambda k: 2+F(1,2)*k, 5) == [F(5,2),F(11,2),9,13,F(35,2)], 'H06 C')
# identidades S_n = S_(n-1) + a_n y a_n = S_n − S_(n-1), en sucesiones enteras al azar (semilla fija)
import random
random.seed(25)
for _ in range(500):
    a = [random.randint(-9, 9) for _ in range(12)]; S = list(accumulate(a))
    ok(S[0] == a[0] and all(S[n] == S[n-1]+a[n] and a[n] == S[n]-S[n-1] for n in range(1,12)), 'H06 recurrencia')
# H07 · sucesiones aritméticas
ar = lambda a1, d, n: a1+(n-1)*d
ok([ar(2,3,n) for n in range(1,5)] == [2,5,8,11] and all(ar(2,3,n) == 3*n-1 for n in range(1,100)), 'H07 anim y recta')
ok([ar(10,-3,n) for n in range(1,5)] == [10,7,4,1] and 8 == F(5+11,2), 'H07 k1 k3')
for a1 in range(-6, 7):
    for d in [F(x,2) for x in range(-8, 9)]:
        t = [a1]
        for _ in range(11): t.append(t[-1]+d)
        ok(all(t[n-1] == ar(a1,d,n) == d*n+(a1-d) for n in range(1,13)), 'H07 término general')
        ok(all(t[n] == F(t[n-1]+t[n+1],2) for n in range(1,11)), 'H07 media de los vecinos')
ok(9-4 == 14-9 == 19-14 == 5 and all(ar(4,5,n) == 5*n-1 for n in range(1,50)) and 5*4-1 == 19, 'H07 e1')
ok([ar(7,-2,n) for n in range(1,6)] == [7,5,3,1,-1] and ar(7,-2,20) == 7-38 == -31, 'H07 e2')
ok(4-1 == 3 and 9-4 == 5, 'H07 e3')
ok(all(3*(n+1)+4-(3*n+4) == 3 for n in range(1,100)) and [3*n+4 for n in range(1,5)] == [7,10,13,16], 'H07 e4')
ok([ar(-3,4,n) for n in range(1,6)] == [-3,1,5,9,13] and ar(-3,4,15) == -3+56 == 53, 'H07 A')
ok(ar(4,3,33) == 100 and 96 == 3*32 and 50 not in [ar(4,3,n) for n in range(1,60)] and 46 % 3 != 0 and 3*15 == 45 and 3*16 == 48, 'H07 B')
ok(ar(1350,150,12) == 3000 and all(ar(1350,150,n) == 1200+150*n for n in range(1,40)) and 1800 == 150*12, 'H07 C')
# H08 · diferencia constante
ok(7-3 == 11-7 == 15-11 == 4, 'H08 anim e1'); ok(17-20 == 14-17 == 11-14 == -3, 'H08 e2')
ok(F(5,4)-F(1,2) == 2-F(5,4) == F(11,4)-2 == F(3,4), 'H08 e3')
ok(F(26-10,7-3) == 4 and 10-2*4 == 2 and ar(2,4,7) == 26 and ar(2,4,3) == 10, 'H08 e4')
ok(15-9 == 21-15 == 27-21 == 6 and F(11,2)-8 == 3-F(11,2) == F(1,2)-3 == F(-5,2), 'H08 A')
ok(F(-14-7,12-5) == -3 and 7-4*(-3) == 19 and ar(19,-3,12) == -14 and ar(19,-3,5) == 7, 'H08 B')
ok(F(36-12,9-1) == 3 and ar(12,3,9) == 36 and ar(12,3,15) == 54, 'H08 C')
for a1 in range(-5, 6):
    for d in [F(x,4) for x in range(-8, 9)]:
        ok(all(F(ar(a1,d,m)-ar(a1,d,k), m-k) == d for m in range(1,10) for k in range(1,10) if m != k), 'H08 d con dos términos')
        ok(all((ar(a1,d,n+1) > ar(a1,d,n)) == (d > 0) and (ar(a1,d,n+1) == ar(a1,d,n)) == (d == 0) for n in range(1,10)), 'H08 signo de d')
ok([ar(4,2,n) for n in (2,6)] == [6,14] and [ar(4,-2,n) for n in (2,6)] == [2,-6], 'H08 dif-vivo extremos')
print('Lote 25 H01–H08:', 'sin errores' if not err else f'{err} errores')
