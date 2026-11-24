#!/usr/bin/env python3
"""Verifica las cuentas de las hojas del lote 25 (series y sucesiones)."""
from fractions import Fraction as F
from math import factorial
import math
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
# H09 · término enésimo
ok([ar(4,3,n) for n in range(1,5)] == [4,7,10,13] and [4+j*3 for j in range(4)] == [4,7,10,13], 'H09 anim')
ok(ar(4,3,50) == 4+147 == 151 and 49*3 == 147 and 4+50*3 == 154 == ar(4,3,51), 'H09 e1 y error frecuente')
ok(11-7 == 15-11 == 4 and 203-7 == 196 and F(196,4) == 49 and ar(7,4,50) == 203, 'H09 e2')
ok(5-9*(-2) == 23 and ar(23,-2,10) == 5, 'H09 e3')
ok(F(29-11,10-4) == 3 and all(11+(n-4)*3 == 3*n-1 for n in range(1,60)) and 3*4-1 == 11 and 3*10-1 == 29 and 3*1-1 == 2, 'H09 e4')
ok(ar(6,4,30) == 6+116 == 122 and ar(50,-5,21) == 50-100 == -50, 'H09 A')
ok(500-8 == 492 and 7*70 == 490 and 7*71 == 497 and 492 % 7 != 0 and ar(8,7,71) == 498 and ar(8,7,72) == 505 and 500 not in [ar(8,7,n) for n in range(1,200)], 'H09 B')
ok(ar(800,200,20) == 800+3800 == 4600 and 5000-800 == 4200 and F(4200,200) == 21 and ar(800,200,22) == 5000, 'H09 C')
for a1 in range(-5, 6):
    for d in [F(x,3) for x in range(-7, 8)]:
        t = [a1]
        for _ in range(14): t.append(t[-1]+d)
        ok(all(sum(t[k+1]-t[k] for k in range(n-1)) == t[n-1]-t[0] == (n-1)*d for n in range(1,16)), 'H09 suma de saltos')
        ok(all(ar(a1,d,n) == ar(a1,d,k)+(n-k)*d for n in range(1,12) for k in range(1,12)), 'H09 desde otro término')
        ok(all(ar(a1,d,n) == d*n+(a1-d) for n in range(1,12)), 'H09 forma dn + (a1 − d)')
# H10 · suma de una sucesión aritmética
sa = lambda a1, d, n: sum(ar(a1,d,k) for k in range(1,n+1))
ok(sa(2,3,4) == 2+5+8+11 == 26 and [2+11,5+8,8+5,11+2] == [13]*4 and 4*13 == 52 and F(52,2) == 26 and 2+5 == 7 and 7+8 == 15 and 15+11 == 26, 'H10 anim e1')
ok(ar(3,4,20) == 3+76 == 79 and 20*82 == 1640 and sa(3,4,20) == 820, 'H10 e2')
ok(100*101 == 10100 and sum(range(1,101)) == 5050, 'H10 e3')
ok(62-5 == 57 and F(57,3) == 19 and ar(5,3,20) == 62 and 20*67 == 1340 and sa(5,3,20) == 670, 'H10 e4')
ok(F(4*(1+8),2) == 18 and 1+2+4+8 == 15, 'H10 error frecuente')
ok(ar(4,5,15) == 74 and 15*78 == 1170 and sa(4,5,15) == 585, 'H10 A')
ok(1-40 == -39 and F(-39,-3) == 13 and ar(40,-3,14) == 1 and 14*41 == 574 and sa(40,-3,14) == 287, 'H10 B')
ok(ar(18,-2,8) == 4 and 8*22 == 176 and sa(18,-2,8) == 88, 'H10 C')
ok(all(sum(range(1,n+1)) == F(n*(n+1),2) for n in range(1,300)), 'H10 k3 y sar-vivo')
for a1 in range(-5, 6):
    for d in [F(x,3) for x in range(-7, 8)]:
        for n in range(1, 25):
            ok(all(ar(a1,d,k)+ar(a1,d,n+1-k) == 2*a1+(n-1)*d == a1+ar(a1,d,n) for k in range(1,n+1)), 'H10 parejas')
            ok(sa(a1,d,n) == F(n*(a1+ar(a1,d,n)),2) == F(n*(2*a1+(n-1)*d),2), 'H10 fórmulas de la suma')
# H11 · series convergentes y divergentes
ok(parc(lambda k: F(1,2**k), 4) == [F(1,2),F(3,4),F(7,8),F(15,16)], 'H11 anim')
ok(all(F(1,2**(k-1))-F(1,2**k) == F(1,2**k) for k in range(1,80)) and all(sum(F(1,2**k) for k in range(1,n+1)) == 1-F(1,2**n) for n in range(1,80)), 'H11 k2')
ok(all(sum(F(1,k*(k+1)) for k in range(1,n+1)) == F(n,n+1) == 1-F(1,n+1) for n in range(1,120)), 'H11 e1')
ok(all(F(n*(n+1),2) >= n for n in range(1,300)), 'H11 e2'); ok(parc(lambda k: (-1)**(k+1), 4) == [1,0,1,0], 'H11 e3')
ok(all(F(1,10**(k-1))-F(1,10**k) == F(9,10**k) and F(3,10**k) == F(1,3)*(F(1,10**(k-1))-F(1,10**k)) for k in range(1,60)) and all(sum(F(3,10**k) for k in range(1,n+1)) == F(1,3)*(1-F(1,10**n)) for n in range(1,60)) and F(1,3)*F(99,100) == F(33,100), 'H11 e4')
ok(parc(lambda k: F(2,3**k), 3) == [F(2,3),F(8,9),F(26,27)] and all(F(1,3**(k-1))-F(1,3**k) == F(2,3**k) for k in range(1,60)) and all(sum(F(2,3**k) for k in range(1,n+1)) == 1-F(1,3**n) and 0 < F(1,3**n) < F(1,2**n) for n in range(1,60)), 'H11 A')
SBn = lambda n: F(3*n+1,n+2)
ok(all(SBn(n) == 3-F(5,n+2) for n in range(1,300)) and SBn(1) == F(4,3) and SBn(2) == F(7,4) and SBn(2)-SBn(1) == F(21,12)-F(16,12) == F(5,12), 'H11 B')
ok(all(sum(F(2,2**k) for k in range(1,n+1)) == 2*(1-F(1,2**n)) for n in range(1,60)) and [F(2,2**k) for k in (1,2,3)] == [1,F(1,2),F(1,4)] and 2*F(31,32) == F(31,16) == F(19375,10000) and 2-F(31,16) == F(1,16) and F(1,16)*100 == F(625,100), 'H11 C')
ok([(2**n-1, 2**n) for n in (1,7)] == [(1,2),(127,128)], 'H11 ser-vivo')
# H12 · series geométricas infinitas
geo = lambda a, r, n: sum(a*r**(k-1) for k in range(1, n+1))
ok(parc(lambda k: F(2,3)**(k-1), 4) == [1,F(5,3),F(19,9),F(65,27)] and F(2,3)*F(65,27) == F(2,3)+F(4,9)+F(8,27)+F(16,81) == F(130,81) and F(65,27)-F(130,81) == 1-F(16,81) == F(65,81) and 3*F(65,81) == F(65,27), 'H12 anim')
ok(all(geo(1,F(2,3),n) == 3*(1-F(2,3)**n) for n in range(1,60)) and 1/(1-F(2,3)) == 3, 'H12 anim R5')
for a in [F(x,2) for x in range(-6, 7) if x]:
    for r in [F(x,4) for x in range(-9, 10) if x != 4]:
        ok(all(geo(a,r,n) == a*(1-r**n)/(1-r) and geo(a,r,n)-r*geo(a,r,n) == a-a*r**n for n in range(1,20)), 'H12 k2 suma parcial')
        if abs(r) >= 1: ok(all(abs(a*r**(n-1)) >= abs(a) for n in range(1,20)), 'H12 k2 |r| >= 1')
ok(all(geo(F(5,2),1,n) == n*F(5,2) for n in range(1,30)) and parc(lambda k: (-1)**(k-1), 4) == [1,0,1,0] and all(geo(1,0,n) == 1 for n in range(1,9)), 'H12 r = 1, r = −1, r = 0')
ok(3/(1-F(1,2)) == 6 and [3*F(1,2)**k for k in range(3)] == [3,F(3,2),F(3,4)], 'H12 e1')
ok(1+F(2,3) == F(5,3) and 5/F(5,3) == 3 and [5*F(-2,3)**k for k in range(3)] == [5,F(-10,3),F(20,9)], 'H12 e2')
ok([F(4,3**n) for n in (1,2,3)] == [F(4,3),F(4,9),F(4,27)] and all(F(4,3**(n+1))/F(4,3**n) == F(1,3) for n in range(1,30)) and F(4,3)/(1-F(1,3)) == 2, 'H12 e3')
ok([2*F(3,2)**k for k in range(3)] == [2,3,F(9,2)] and all(geo(2,F(3,2),n) == 4*(F(3,2)**n-1) for n in range(1,40)) and 4*(F(9,4)-1) == 5, 'H12 e4')
ok(1/F(1-2) == -1 and 7/(1-F(1,8)) == 8 and 9/(1+F(1,2)) == 6, 'H12 error frecuente y A')
ok(F(27,100)/(1-F(1,100)) == F(27,99) == F(3,11) and all(sum(F(27,100**k) for k in range(1,n+1)) == F(3,11)*(1-F(1,100**n)) for n in range(1,30)) and str(3/11)[:8] == '0.272727', 'H12 B')
ok(F(2,3)*6 == 4 and 4/(1-F(2,3)) == 12 and 6+2*12 == 30 and [4*F(2,3)**k for k in range(3)] == [4,F(8,3),F(16,9)], 'H12 C')
ok([1/(1-F(x,4)) for x in (-3,-2,-1,0,1,2,3)] == [F(4,7),F(2,3),F(4,5),1,F(4,3),2,4], 'H12 geo-vivo')
# H13 · criterio del enésimo término
SG = parc(lambda k: F(2,3)**(k-1), 6)
ok(SG == [1,F(5,3),F(19,9),F(65,27),F(211,81),F(665,243)] and all(SG[i]-SG[i-1] == F(2,3)**i for i in range(1,6)), 'H13 anim')
bl = [F(1,m) for m in range(1,40) for _ in range(m)]
ok(all(sum(bl[:m*(m+1)//2]) == m for m in range(1,40)), 'H13 k3 bloques')
ok(all(F(n,n+1) == 1-F(1,n+1) for n in range(1,300)), 'H13 e1')
ok(all(F(2*n+1,5*n-3) == (2+F(1,n))/(5-F(3,n)) and 5*n-3 != 0 for n in range(1,300)) and abs(F(2*10**6+1,5*10**6-3)-F(2,5)) < F(1,10**6), 'H13 e3')
ok(all(F(3*n-1,n+4) == (3-F(1,n))/(1+F(4,n)) for n in range(1,300)) and abs(F(3*10**6-1,10**6+4)-3) < F(1,10**4), 'H13 A a')
ok(F(2**7,100) == F(128,100) and 2**6 < 100 < 2**7 and all(F(2**n,100) > 1 for n in range(7,60)), 'H13 A c')
SB13 = lambda n: F(4*n,2*n+1)
ok(all(SB13(n) == 2-F(2,2*n+1) and 0 < F(2,2*n+1) < F(1,n) for n in range(1,300)) and all(SB13(n)-SB13(n-1) == F(4,4*n*n-1) and 4*n*(2*n-1)-(4*n-4)*(2*n+1) == 4 and (2*n+1)*(2*n-1) == 4*n*n-1 for n in range(2,300)) and all(4*n*n-1 >= 3*n and 0 < F(4,4*n*n-1) <= F(4,3*n) for n in range(1,300)), 'H13 B')
aC = lambda n: 20000+F(30000,n)
ok([aC(1),aC(2),aC(3)] == [50000,35000,30000] and all(aC(n) > 20000 for n in range(1,500)) and 20000*50 == 1000000 and sum(aC(n) for n in range(1,51)) > 1000000, 'H13 C')
# H14 · serie armónica y series p
Hn = lambda n: sum(F(1,k) for k in range(1,n+1))
ok(F(1,3)+F(1,4) > 2*F(1,4) == F(1,2) and F(1,5)+F(1,6)+F(1,7)+F(1,8) > 4*F(1,8) == F(1,2) and Hn(8) > 1+3*F(1,2) == F(5,2) and Hn(16) > 3, 'H14 anim')
for j in range(1, 11):
    blq = [F(1,n) for n in range(2**(j-1)+1, 2**j+1)]
    ok(len(blq) == 2**(j-1) and min(blq) == F(1,2**j) and sum(blq) >= F(1,2), 'H14 k2 bloque')
ok(all(Hn(2**m) >= 1+F(m,2) for m in range(0,11)), 'H14 k2 cota')
for p in (2, 3, 4):
    q = F(1,2**(p-1)); Sp = lambda n: sum(F(1,k**p) for k in range(1,n+1))
    for j in range(0, 9):
        blq = [F(1,n**p) for n in range(2**j, 2**(j+1))]
        ok(len(blq) == 2**j and max(blq) == F(1,2**(j*p)) and sum(blq) <= q**j, 'H14 k3 bloque')
    ok(all(Sp(2**m-1) <= sum(q**j for j in range(m)) == (1-q**m)/(1-q) < 1/(1-q) for m in range(1,10)), 'H14 k3 cota')
ok(all(n <= 2**n-1 for n in range(1,200)), 'H14 k3 n <= 2^n − 1')
from math import pi
ok(1/(1-F(1,2)) == 2 and abs(pi*pi/6-1.645) < 5e-4 and sum(1/k**2 for k in range(1,200000)) < pi*pi/6 < 2 and 1/(1-F(1,4)) == F(4,3) and sum(1/k**3 for k in range(1,20000)) < 4/3, 'H14 p = 2 y e1 (π²/6 solo numérico)')
ok(all(k**0.5 <= k and 1/k**0.5 >= 1/k for k in range(1,2000)), 'H14 e2 (numérico)')
ok(2**8 == 256 and 1+F(8,2) == 5 and Hn(82) < 5 < Hn(83) and abs(float(Hn(83))-5.002) < 5e-4 and Hn(256) >= 5, 'H14 e4')
ok(Hn(4) == F(25,12) and abs(25/12-2.083) < 5e-4 and 1+F(6,2) == 4 and Hn(64) >= 4 and 1+F(1,4)+F(1,9) == F(49,36) and abs(49/36-1.361) < 5e-4 and F(49,36) <= F(3,2) == F(54,36), 'H14 B')
ok(10*Hn(30) < 40 < 10*Hn(31) and 10*(1+F(6,2)) == 40 and 10*(1+F(18,2)) == 100 and 2**18 == 262144 and 262144/365.25 > 700, 'H14 C')
# H06 v002 · lectura acumulada de parc-idea y pasos agregados en ejemplos y ejercicios
ok([2*n-1 for n in (1,2,3,4)] == [2-1, 4-1, 6-1, 8-1] == [1,3,5,7] and (1, 1+3, 4+5, 9+7) == (1,4,9,16), 'H06 v002 parc-idea')
ok([3*n-1 for n in (1,2,3,4)] == [3-1, 6-1, 9-1, 12-1] == [2,5,8,11], 'H06 v002 ej1')
ok([F(1,n*(n+1)) for n in (1,2,3,4)] == [F(1,2),F(1,6),F(1,12),F(1,20)] and F(4,6) == F(2,3) and F(9,12) == F(3,4) and F(16,20) == F(4,5) and 4//2 == 2 and 6//2 == 3 and 9//3 == 3 and 12//3 == 4 and 16//4 == 4 and 20//4 == 5, 'H06 v002 ej2')
ok(1+2 == 3 and 2*5+1 == 10+1 == 11 and 5**2+2*5 == 25+10 == 35 and 4**2+2*4 == 16+8 == 24 and 35-24 == 11 and all(n*n+2*n-(n*n-1) == n*n+2*n-n*n+1 == 2*n+1 for n in range(1,60)), 'H06 v002 ej3')
ok([(-1)**(n+1) for n in (1,2,3,4)] == [(-1)**2, (-1)**3, (-1)**4, (-1)**5] == [1,-1,1,-1], 'H06 v002 ej4')
ok([4*n-3 for n in (1,2,3,4,5)] == [4-3, 8-3, 12-3, 16-3, 20-3] == [1,5,9,13,17] and (1+5, 6+9, 15+13, 28+17) == (6,15,28,45), 'H06 v002 A')
ok(3*1**2-1 == 3-1 == 2 and 3*2**2-2 == 12-2 == 10 and 3*10**2-10 == 300-10 == 290 and 3*9**2-9 == 243-9 == 234 and 3*81 == 243 and 290-234 == 56, 'H06 v002 B')
ok([2+F(1,2)*n for n in (1,2,3,4,5)] == [F(5,2), 3, F(7,2), 4, F(9,2)] and (F(1,2)*2, F(1,2)*3, F(1,2)*4, F(1,2)*5) == (1, F(3,2), 2, F(5,2)) and F(5,2)+3 == F(11,2) and F(11,2)+F(7,2) == 9 and 9+4 == 13 and 13+F(9,2) == F(35,2), 'H06 v002 C')
# H07–H11 v002 (23-nov) · tres leyes: lecturas acumuladas y pasos agregados en ejemplos y ejercicios
# H07 v002 · lectura acumulada de arit-idea y pasos agregados en ejemplos y ejercicios
ok((5-2, 8-5, 11-8) == (3,3,3) and (2+3, 5+3, 8+3) == (5,8,11) and 2+3*(4-1) == 2+3*3 == 2+9 == 11 and all(2+3*(n-1) == 2+3*n-3 == 3*n-1 for n in range(1,60)) and all(3*x-1 == y for x, y in zip((1,2,3,4),(2,5,8,11))), 'H07 v002 arit-idea y recta y = 3x − 1')
ok(F(5+11,2) == F(16,2) == 8, 'H07 v002 k3')
ok(5*4-1 == 20-1 == 19 and all(4+5*(n-1) == 4+5*n-5 == 5*n-1 for n in range(1,60)), 'H07 v002 ej1')
ok((7+(-2), 5+(-2), 3+(-2), 1+(-2)) == (5,3,1,-1) and 7+(20-1)*(-2) == 7+19*(-2) == 7+(-38) == 7-38 == -31, 'H07 v002 ej2')
ok(all(3*(n+1)+4 == 3*n+3+4 == 3*n+7 and 3*n+7-(3*n+4) == 3*n+7-3*n-4 == 3 for n in range(1,60)) and 3*1+4 == 3+4 == 7 and (7+3, 10+3, 13+3) == (10,13,16), 'H07 v002 ej4')
ok((-3+4, 1+4, 5+4, 9+4) == (1,5,9,13) and -3+(15-1)*4 == -3+14*4 and 14*4 == 56 and -3+56 == 53, 'H07 v002 A')
ok(100-4 == 96 and 96//3 == 32 and 96 % 3 == 0 and 32+1 == 33 and 4+3*(33-1) == 4+3*32 == 4+96 == 100 and 50-4 == 46 and 46 % 3 != 0 and 3*15 == 45 and 3*16 == 48, 'H07 v002 B')
ok(1200+150 == 1350 and 1350-150 == 1200 and 3000-1200 == 1800 and 1800//150 == 12 and 1800 % 150 == 0 and 1200+150*12 == 1200+1800 == 3000 and all(1350+150*(n-1) == 1200+150*n for n in range(1,60)), 'H07 v002 C')
# H08 v002 · tres leyes: lecturas de dif-idea y dif-vivo, y pasos agregados en ejemplos y ejercicios
ok((7-3, 11-7, 15-11) == (4,4,4), 'H08 v002 dif-idea')
for _d in [F(k,4) for k in range(-8,9)]:
    _P = 5*_d; _A2 = 4+(2-1)*_d; _A6 = 4+(6-1)*_d
    ok(_A2 == 4+1*_d == 4+_d and _A6 == 4+_P and _A2-4 == _d and (_d > 0) == (_A2 > 4) and (_d == 0) == (_A2 == 4 == _A6), 'H08 v002 dif-vivo')
ok(4+5*F(-2) == -6 and 4+5*F(2) == 14, 'H08 v002 dif-vivo extremos')
ok((17-20, 14-17, 11-14) == (-3,-3,-3), 'H08 v002 ej2')
ok(F(1*2,2*2) == F(1,2) == F(2,4) and F(2*4,4) == 2 and F(5-2,4) == F(5,4)-F(1,2) == F(3,4) and F(8-5,4) == 2-F(5,4) == F(3,4) and F(11-8,4) == F(11,4)-2 == F(3,4), 'H08 v002 ej3')
ok(26-10 == 16 and 7-3 == 4 and F(16,4) == 4 and 10-2*4 == 10-8 == 2 and 2+6*4 == 2+24 == 26 and 3-1 == 2 and 7-1 == 6, 'H08 v002 ej4')
ok((15-9, 21-15, 27-21) == (6,6,6) and (F(11,2)-8, 3-F(11,2), F(1,2)-3) == (F(-5,2),)*3, 'H08 v002 A')
ok(-14-7 == -21 and 12-5 == 7 and F(-21,7) == -3 and 4*(-3) == -12 and 7-(-12) == 7+12 == 19 and 19+11*(-3) == 19+(-33) == 19-33 == -14 and 5-1 == 4 and 12-1 == 11, 'H08 v002 B')
ok(36-12 == 24 and 9-1 == 8 and F(24,8) == 3 and 15-1 == 14 and 14*3 == 42 and 12+42 == 54, 'H08 v002 C')
# H09 v002 · lectura acumulada de ene-idea y pasos agregados en ejemplos y ejercicios
ok(7-4 == 10-7 == 13-10 == 3 and (1*3, 2*3, 3*3) == (3, 6, 9) and (4+3, 4+6, 4+9) == (7, 10, 13) and (2-1, 3-1, 4-1) == (1, 2, 3) and [4+(n-1)*3 for n in (1,2,3,4)] == [4,7,10,13], 'H09 v002 ene-idea')
ok(50-1 == 49 and 49*3 == 147 and 4+147 == 151, 'H09 v002 ej1')
ok(11-7 == 15-11 == 4 and 203-7 == 196 and F(196,4) == 49 and 49+1 == 50 and 7+(50-1)*4 == 7+49*4 == 7+196 == 203, 'H09 v002 ej2')
ok(10-1 == 9 and 9*(-2) == -18 and 5+18 == 23 and 23+9*(-2) == 23-18 == 5, 'H09 v002 ej3')
ok(F(29-11,10-4) == F(18,6) == 3 and all(11+(n-4)*3 == 11+3*n-12 == 3*n-1 for n in range(-50,60)) and 11-12 == -1 and 3*4-1 == 12-1 == 11 and 3*10-1 == 30-1 == 29 and 3*1-1 == 3-1 == 2, 'H09 v002 ej4')
ok(4+50*3 == 4+150 == 154 == 4+(51-1)*3, 'H09 v002 errores frecuentes')
ok(10-6 == 14-10 == 4 and 30-1 == 29 and 29*4 == 116 and 6+116 == 122 and 45-50 == 40-45 == -5 and 21-1 == 20 and 20*(-5) == -100 and 50+(-100) == 50-100 == -50, 'H09 v002 A')
ok(15-8 == 22-15 == 7 and 500-8 == 492 and 7*70 == 490 and 7*71 == 497 and 490 < 492 < 497 and 492-490 == 2 and 492 % 7 == 2 and 8+70*7 == 8+490 == 498 < 500 and 8+71*7 == 8+497 == 505 > 500 and 8+(71-1)*7 == 498 and 8+(72-1)*7 == 505, 'H09 v002 B')
ok(20-1 == 19 and 19*200 == 3800 and 800+3800 == 4600 and 5000-800 == 4200 and F(4200,200) == 21 and 21+1 == 22 and 800+(22-1)*200 == 800+21*200 == 800+4200 == 5000, 'H09 v002 C')
# H10 v002 · tres leyes: lecturas de sar-idea y sar-vivo, y pasos agregados en ejemplos y ejercicios
ok(2+11 == 5+8 == 8+5 == 11+2 == 13 and 13+13+13+13 == 4*13 == 52 and F(52,2) == 26 == 2+5+8+11 == 11+8+5+2 and F(4*(2+11),2) == 26, 'H10 v002 sar-idea')
ok(all(1+n == n+1 and F(n*(n+1),2) == sum(range(1,n+1)) and (n*(n+1)) % 2 == 0 for n in range(1,11)) and F(1*(1+1),2) == F(2,2) == 1, 'H10 v002 sar-vivo')
ok(2+11 == 13 and 4*13 == 52 and F(52,2) == 26 and 2+5 == 7 and 7+8 == 15 and 15+11 == 26, 'H10 v002 ej1')
ok(7-3 == 4 and 20-1 == 19 and 19*4 == 76 and 3+76 == 79 and 3+79 == 82 and 20*82 == 1640 and F(1640,2) == 820 == sum(3+4*k for k in range(20)), 'H10 v002 ej2')
ok(1+100 == 101 and 100*101 == 10100 and F(10100,2) == 5050 == sum(range(1,101)), 'H10 v002 ej3')
ok(8-5 == 3 and 62-5 == 57 and F(57,3) == 19 and 19+1 == 20 and 5+(20-1)*3 == 62 and 5+62 == 67 and 20*67 == 1340 and F(1340,2) == 670 == sum(range(5,63,3)), 'H10 v002 ej4')
ok(F(4*(1+8),2) == F(4*9,2) == F(36,2) == 18 and 1+2+4+8 == 15, 'H10 v002 errores')
ok(9-4 == 5 and 15-1 == 14 and 14*5 == 70 and 4+70 == 74 and 4+74 == 78 and 15*78 == 1170 and F(1170,2) == 585 == sum(4+5*k for k in range(15)), 'H10 v002 A')
ok(37-40 == -3 and 1-40 == -39 and F(-39,-3) == 13 and 13+1 == 14 and 40+(14-1)*(-3) == 1 and 40+1 == 41 and 14*41 == 574 and F(574,2) == 287 == sum(range(40,0,-3)), 'H10 v002 B')
ok(8-1 == 7 and 7*(-2) == -14 and 18+(-14) == 18-14 == 4 and 18+4 == 22 and 8*22 == 176 and F(176,2) == 88 == sum(18-2*k for k in range(8)), 'H10 v002 C')
# H11 v002 · lecturas acumuladas de ser-idea y ser-vivo, y pasos agregados en ejemplos y ejercicios
ok([F(1,2**n) for n in (1,2,3,4)] == [F(1,2),F(1,4),F(1,8),F(1,16)] and F(1,2)+F(1,4) == F(2,4)+F(1,4) == F(3,4) and F(3,4)+F(1,8) == F(6,8)+F(1,8) == F(7,8) and F(7,8)+F(1,16) == F(14,16)+F(1,16) == F(15,16) and [1-s for s in (F(1,2),F(3,4),F(7,8),F(15,16))] == [F(1,2),F(1,4),F(1,8),F(1,16)], 'H11 v002 ser-idea')
ok(all(1-F(1,2**n) == F(2**n-1,2**n) and 1-F(2**n-1,2**n) == F(1,2**n) and F(1,2**n) == F(1,2**(n-1))/2 and round((2**n-1)/2**n*10**n) == (2**n-1)*5**n for n in range(1,8)) and 2**7 == 128 and F(127,128) == F(9921875,10**7) and F(31,32) == F(96875,10**5), 'H11 v002 ser-vivo')
ok(all(F(n,n+1) == F(n+1,n+1)-F(1,n+1) == 1-F(1,n+1) for n in range(1,200)) and F(3,3+1) == F(3,4) == F(4,4)-F(1,4), 'H11 v002 ej1')
ok([F(n*(n+1),2) for n in (1,2,3,4)] == [F(2,2),F(6,2),F(12,2),F(20,2)] == [1,3,6,10] and all(F(n+1,2) >= 1 and n*F(n+1,2) >= n for n in range(1,300)), 'H11 v002 ej2')
ok([(-1)**(n+1) for n in (1,2,3,4)] == [1,-1,1,-1] and (1, 1+(-1), 0+1, 1+(-1)) == (1,0,1,0), 'H11 v002 ej3')
ok(all(sum(F(3,10**k) for k in range(1,n+1)) == F(1,3)*(1-F(1,10**n)) for n in range(1,30)) and 1-F(1,100) == F(100,100)-F(1,100) == F(99,100) and F(1,3)*F(99,100) == F(99,300) == F(33,100) and F(3,10)+F(3,100) == F(30,100)+F(3,100) == F(33,100) and F(1,3)*(1-0) == F(1,3), 'H11 v002 ej4')
ok([F(2,3**n) for n in (1,2,3)] == [F(2,3),F(2,9),F(2,27)] and F(2,3)+F(2,9) == F(6,9)+F(2,9) == F(8,9) and F(8,9)+F(2,27) == F(24,27)+F(2,27) == F(26,27) and (1-F(1,3), 1-F(1,9), 1-F(1,27)) == (F(2,3),F(8,9),F(26,27)) and all(F(2,3**k) == F(1,3**(k-1))-F(1,3**k) for k in range(1,40)), 'H11 v002 A')
ok(all(3*(n+2)-5 == 3*n+6-5 == 3*n+1 and F(3*n+1,n+2) == 3-F(5,n+2) for n in range(1,200)) and F(3*1+1,1+2) == F(4,3) and F(3*2+1,2+2) == F(7,4) and F(7,4)-F(4,3) == F(21,12)-F(16,12) == F(5,12) and 3-5*0 == 3, 'H11 v002 B')
ok([F(2,2**k) for k in (1,2,3)] == [1,F(1,2),F(1,4)] and 2**5 == 32 and 1-F(1,32) == F(31,32) and 2*F(31,32) == F(62,32) == F(31,16) == F(19375,10000) and 2-F(31,16) == F(32,16)-F(31,16) == F(1,16) == F(625,10000) and F(625,10000)*100 == F(625,100) and all(sum(F(2,2**k) for k in range(1,n+1)) == 2*(1-F(1,2**n)) for n in range(1,40)) and 2*(1-0) == 2, 'H11 v002 C')
# H12 v002 · tres leyes: lecturas de geo-idea y geo-vivo, y pasos agregados en ejemplos y ejercicios
ok(1*F(2,3) == F(2,3) and F(2,3)*F(2,3) == F(4,9) and F(4,9)*F(2,3) == F(8,27) and F(2,3)*F(8,27) == F(16,81) and (1+F(2,3)+F(4,9)+F(8,27)) - (F(2,3)+F(4,9)+F(8,27)+F(16,81)) == 1-F(16,81) and 1-F(2,3) == F(3,3)-F(2,3) == F(1,3) and 1-F(16,81) == F(81,81)-F(16,81) == F(65,81) and 3*F(65,81) == F(195,81) == F(65,27) == 1+F(2,3)+F(4,9)+F(8,27), 'H12 v002 geo-idea pasos 1 a 4')
ok(all(F(1,3)*sum(F(2,3)**k for k in range(n)) == 1-F(2,3)**n and sum(F(2,3)**k for k in range(n)) == 3*(1-F(2,3)**n) < 3 for n in range(1,60)) and 3*(1-0) == 3*1 == 3 and F(1, 1-F(2,3)) == F(1, F(1,3)) == 1*3 == 3 and 3*(1-F(2,3)**14) > F(298,100), 'H12 v002 geo-idea paso 5')
ok(all((lambda r, S: S[0] == 1 and S[1] == S[0]+r == 1+r == F(100+R,100) and r*r == F(R*R,10000) and S[2] == S[1]+r*r == F(10000+100*R+R*R,10000) and S[7] == S[6]+r**7 == F(sum(R**i*100**(7-i) for i in range(8)),10**14) and (abs(R) >= 100 or (1-r == F(100-R,100) and F(1,1-r) == F(100,100-R) and 0 < S[7] <= F(1,1-r) and (1-r)*S[7] == 1-r**8)))(F(R,100), [sum(F(R,100)**i for i in range(n)) for n in range(1,9)]) for R in range(-100,101)), 'H12 v002 geo-vivo, toda r en centésimas')
ok([sum(F(1)**i for i in range(n)) for n in range(1,9)] == list(range(1,9)) and 1-F(100,100) == 0 and [sum(F(-1)**i for i in range(n)) for n in range(1,9)] == [1,0,1,0,1,0,1,0] and [sum(F(0)**i for i in range(n)) for n in range(1,9)] == [1]*8 and F(1,1-F(50,100)) == 2 and F(1,1-F(95,100)) == 20 and F(1,1-F(0,100)) == 1 and abs(sum(F(1,2)**i for i in range(8))-F(199,100)) <= F(1,200) and abs(sum(F(95,100)**i for i in range(8))-F(673,100)) <= F(1,200) and F(200,100)-F(199,100) == F(1,100) and 20-F(673,100) == F(1327,100), 'H12 v002 geo-vivo casos r = 1, -1, 0, 0,5 y 0,95')
ok(F(3,2)/3 == F(3,2)*F(1,3) == F(3,6) == F(1,2) and 1-F(1,2) == F(2,2)-F(1,2) == F(1,2) and F(3, F(1,2)) == 3*2 == 6, 'H12 v002 ej1')
ok(F(-10,3)/5 == F(-10,3)*F(1,5) == F(-10,15) == F(-2,3) and abs(F(-2,3)) == F(2,3) < 1 and 1-F(-2,3) == 1+F(2,3) == F(3,3)+F(2,3) == F(5,3) and F(5, F(5,3)) == 5*F(3,5) == F(15,5) == 3, 'H12 v002 ej2')
ok([F(4,3**n) for n in (1,2,3)] == [F(4,3),F(4,9),F(4,27)] and all(F(4,3**(n+1))/F(4,3**n) == F(4,3**(n+1))*F(3**n,4) == F(4*3**n,4*3**(n+1)) == F(3**n,3**(n+1)) == F(3**n,3**n*3) == F(1,3) and 3**(n+1) == 3**n*3 for n in range(1,40)) and 1-F(1,3) == F(3,3)-F(1,3) == F(2,3) and F(4,3)/F(2,3) == F(4,3)*F(3,2) == F(12,6) == 2, 'H12 v002 ej3')
ok(F(3,2) >= 1 and 1-F(3,2) == F(2,2)-F(3,2) == F(-1,2) and 1/F(-1,2) == -2 and 2*(-2) == -4 and all(sum(2*F(3,2)**k for k in range(n)) == 2*(1-F(3,2)**n)/(1-F(3,2)) == -4*(1-F(3,2)**n) == 4*F(3,2)**n-4 == 4*(F(3,2)**n-1) for n in range(1,40)) and F(3,2)**2 == F(9,4) and F(9,4)-1 == F(9,4)-F(4,4) == F(5,4) and 4*F(5,4) == F(20,4) == 5 == 2+3, 'H12 v002 ej4')
ok(1-F(1,8) == F(8,8)-F(1,8) == F(7,8) and F(7, F(7,8)) == 7*F(8,7) == F(56,7) == 8 and 1-F(-1,2) == 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and F(9, F(3,2)) == 9*F(2,3) == F(18,3) == 6 and F(5,4) >= 1, 'H12 v002 A')
ok(F(27,100) == F(27,10**2) and F(27,10000) == F(27,100**2) and F(27,1000000) == F(27,100**3) and all(F(27,100**(n+1))/F(27,100**n) == F(27*100**n,27*100**(n+1)) == F(1,100) and 100**(n+1) == 100**n*100 for n in range(1,30)) and 1-F(1,100) == F(100,100)-F(1,100) == F(99,100) and F(27,100)/F(99,100) == F(27,100)*F(100,99) == F(2700,9900) == F(27,99) == F(3,11) and 27 == 9*3 and 99 == 9*11 and 30 == 2*11+8 and 80 == 7*11+3 and F(27,99).numerator == 3 and F(27,99).denominator == 11 and all(sum(F(27,100**k) for k in range(1,n+1)) == F(3,11)*(1-F(1,100**n)) for n in range(1,20)), 'H12 v002 B')
ok(F(2,3)*6 == F(12,3) == 4 and F(2,3)*4 == F(8,3) and F(2,3)*F(8,3) == F(16,9) and 1-F(2,3) == F(3,3)-F(2,3) == F(1,3) and F(4, F(1,3)) == 4*3 == 12 and 2*12 == 24 and 6+24 == 30, 'H12 v002 C')
# H13 v002 · tres leyes: lectura acumulada de net-idea (términos, sumas parciales, saltos, lo que falta para 3) y pasos agregados en ejemplos y ejercicios
ok([1*F(2,3), F(2,3)*F(2,3), F(4,9)*F(2,3), F(8,27)*F(2,3), F(16,81)*F(2,3)] == [F(2,3),F(4,9),F(8,27),F(16,81),F(32,243)] == [F(2,3)**(n-1) for n in range(2,7)], 'H13 v002 net-idea términos')
ok(1+F(2,3) == F(3,3)+F(2,3) == F(5,3) and F(5,3)+F(4,9) == F(15,9)+F(4,9) == F(19,9) and F(5,3) == F(15,9) and F(19,9)+F(8,27) == F(57,27)+F(8,27) == F(65,27) and F(19,9) == F(57,27) and F(65,27)+F(16,81) == F(195,81)+F(16,81) == F(211,81) and F(65,27) == F(195,81) and F(211,81)+F(32,243) == F(633,243)+F(32,243) == F(665,243) and F(211,81) == F(633,243) and [sum(F(2,3)**k for k in range(n)) for n in range(1,7)] == [1,F(5,3),F(19,9),F(65,27),F(211,81),F(665,243)], 'H13 v002 net-idea sumas parciales')
ok(F(5,3)-1 == F(5,3)-F(3,3) == F(2,3) and F(19,9)-F(5,3) == F(19,9)-F(15,9) == F(4,9) and F(65,27)-F(19,9) == F(65,27)-F(57,27) == F(8,27) and F(211,81)-F(65,27) == F(211,81)-F(195,81) == F(16,81) and F(665,243)-F(211,81) == F(665,243)-F(633,243) == F(32,243), 'H13 v002 net-idea saltos')
ok(3-1 == 2 and 3-F(5,3) == F(9,3)-F(5,3) == F(4,3) and 3-F(19,9) == F(27,9)-F(19,9) == F(8,9) and 3-F(65,27) == F(81,27)-F(65,27) == F(16,27) and 3-F(211,81) == F(243,81)-F(211,81) == F(32,81) and 3-F(665,243) == F(729,243)-F(665,243) == F(64,243) and F(9,3) == F(27,9) == F(81,27) == F(243,81) == F(729,243) == 3 and 2 > F(4,3) > F(8,9) > F(16,27) > F(32,81) > F(64,243) > 0, 'H13 v002 net-idea lo que falta para 3')
ok(all(3-sum(F(2,3)**k for k in range(n)) == 2*F(2,3)**(n-1) for n in range(1,60)) and F(1,1-F(2,3)) == 3 and F(2,3) > F(4,9) > F(8,27) > F(16,81) > F(32,243) > 0 and 3-3 == 0, 'H13 v002 net-idea suma 3 y límite')
ok(all(n == (n+1)-1 and F(n,n+1) == F(n+1,n+1)-F(1,n+1) == 1-F(1,n+1) for n in range(1,300)) and 1-0 == 1, 'H13 v002 ej1')
ok([(-1)**n for n in (1,2,3,4)] == [-1,1,-1,1] and (-1)*(-1) == 1 and 1*(-1) == -1 and abs(-1) == 1 == abs(1), 'H13 v002 ej2')
ok(all(F(2*n+1,n) == F(2*n,n)+F(1,n) == 2+F(1,n) and F(5*n-3,n) == F(5*n,n)-F(3,n) == 5-F(3,n) and F(3,n) == 3*F(1,n) and F(2*n+1,5*n-3) == (2+F(1,n))/(5-F(3,n)) for n in range(1,300)) and 3*0 == 0 and 2+0 == 2 and 5-0 == 5, 'H13 v002 ej3')
ok(all(F(3*n-1,n) == F(3*n,n)-F(1,n) == 3-F(1,n) and F(n+4,n) == F(n,n)+F(4,n) == 1+F(4,n) and F(4,n) == 4*F(1,n) and F(3*n-1,n+4) == (3-F(1,n))/(1+F(4,n)) and F(5,n) == 5*F(1,n) for n in range(1,300)) and 4*0 == 0 and 3-0 == 3 and 1+0 == 1 and F(3,1) == 3 and 5*0 == 0, 'H13 v002 A (a) y (b)')
ok(2*2*2*2*2*2*2 == 128 == 2**7 and F(128,100) == F('1.28') and all(F(2**(n+1),100) == F(2*2**n,100) == 2*F(2**n,100) for n in range(1,60)) and 2*F('1.28') == F('2.56') == F(2**8,100) and all(F(2**n,100) > 1 for n in range(7,200)) and F(2**6,100) < 1, 'H13 v002 A (c)')
ok(all(2*(2*n+1) == 4*n+2 and 4*n == 2*(2*n+1)-2 and F(4*n,2*n+1) == F(2*(2*n+1),2*n+1)-F(2,2*n+1) == 2-F(2,2*n+1) and 2*n+1 > 2*n and 0 < F(2,2*n+1) < F(2,2*n) == F(1,n) for n in range(1,300)) and 2-0 == 2, 'H13 v002 B suma parcial y límite')
ok(all(4*(n-1) == 4*n-4 and 2*(n-1)+1 == 2*n-2+1 == 2*n-1 and 4*n*(2*n-1) == 4*n*2*n-4*n*1 == 8*n**2-4*n and (4*n-4)*(2*n+1) == 4*n*2*n+4*n*1-4*2*n-4*1 == 8*n**2+4*n-8*n-4 == 8*n**2-4*n-4 and (8*n**2-4*n)-(8*n**2-4*n-4) == 8*n**2-4*n-8*n**2+4*n+4 == 4 and (2*n+1)*(2*n-1) == 2*n*2*n-2*n*1+1*2*n-1*1 == 4*n**2-2*n+2*n-1 == 4*n**2-1 for n in range(-50,300)), 'H13 v002 B productos')
ok(all(F(4*n,2*n+1)-F(4*n-4,2*n-1) == F(4*n*(2*n-1)-(4*n-4)*(2*n+1),(2*n+1)*(2*n-1)) == F(4,4*n**2-1) for n in range(2,300)) and all((4*n**2-1)-3*n == 4*n**2-3*n-1 == (4*n+1)*(n-1) == 4*n**2-4*n+n-1 for n in range(-50,300)) and all(4*n+1 > 0 and n-1 >= 0 and 4*n**2-1 >= 3*n and 0 < F(4,4*n**2-1) <= F(4,3*n) == F(4,3)*F(1,n) for n in range(1,300)) and F(4,3)*0 == 0, 'H13 v002 B término y cota')
ok(all(F(30000,n) == 30000*F(1,n) and F(30000,n) > 0 and 20000+F(30000,n) > 20000 for n in range(1,300)) and 30000*0 == 0 and 20000+0 == 20000 and F(1000000,20000) == 50 and 20000*50 == 1000000 and sum(20000+F(30000,n) for n in range(1,51)) > 1000000, 'H13 v002 C')
# H14 v002 · tres leyes: lectura acumulada de arm-idea, pasos agregados en ejemplos y ejercicios, y n ≤ 2ⁿ − 1 (usado sin demostrar; aquí se comprueba para n = 1…200)
ok(F(1,3) > F(1,4) and F(1,3)+F(1,4) > F(1,4)+F(1,4) and F(1,4)+F(1,4) == F(2,4) == F(1,2) and F(1,3)+F(1,4) > F(1,2), 'H14 v002 arm-idea grupo 3-4')
ok(F(1,5) > F(1,8) and F(1,6) > F(1,8) and F(1,7) > F(1,8) and F(1,5)+F(1,6)+F(1,7)+F(1,8) > 4*F(1,8) and 4*F(1,8) == F(4,8) == F(1,2), 'H14 v002 arm-idea grupo 5-8')
ok(sum(F(1,n) for n in range(1,9)) == 1+F(1,2)+(F(1,3)+F(1,4))+(F(1,5)+F(1,6)+F(1,7)+F(1,8)) == F(761,280) and 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and F(3,2)+F(1,2) == F(4,2) and F(4,2)+F(1,2) == F(5,2) and 1+F(1,2)+F(1,2)+F(1,2) == F(5,2) == F(25,10) and F(761,280) > F(5,2), 'H14 v002 arm-idea cota de S8')
ok(all(F(1,n) >= F(1,16) for n in range(9,17)) and len(range(9,17)) == 8 and sum(F(1,n) for n in range(9,17)) > 8*F(1,16) and 8*F(1,16) == F(8,16) == F(1,2) and F(5,2)+F(1,2) == F(6,2) == 3 and sum(F(1,n) for n in range(1,17)) == sum(F(1,n) for n in range(1,9))+sum(F(1,n) for n in range(9,17)) and sum(F(1,n) for n in range(1,17)) > 3, 'H14 v002 arm-idea grupo 9-16 y S16')
ok(all(sum(F(1,n) for n in range(1,2**m+1)) >= 1+F(m,2) for m in range(0,11)) and 1+F(3,2) == F(5,2) and 1+F(4,2) == 3 and all(sum(F(1,n) for n in range(2**(j-1)+1,2**j+1)) >= F(1,2) and 2**j-2**(j-1) == 2**(j-1) for j in range(1,11)), 'H14 v002 arm-idea cota general con m grupos')
ok(all(n <= 2**n-1 for n in range(1,201)), 'H14 v002 n ≤ 2ⁿ − 1 (aviso de rigor, comprobado hasta 200)')
ok(F(1,2**(2-1)) == F(1,2**1) == F(1,2) and 1-F(1,2) == F(2,2)-F(1,2) == F(1,2) and 1/F(1,2) == 1*F(2,1) == 2, 'H14 v002 caso p = 2')
ok(3 > 1 and 3-1 == 2 and 2**2 == 4 and 1-F(1,4) == F(4,4)-F(1,4) == F(3,4) and 1/F(3,4) == 1*F(4,3) == F(4,3) and round(F(4,3)*1000) == 1333 and all(sum(F(1,n**3) for n in range(1,N+1)) < F(4,3) for N in (1,2,3,10,100,500)), 'H14 v002 ej1')
ok(F(1,2) <= 1, 'H14 v002 ej2')
ok(all(sum(F(5,k) for k in range(1,n+1)) == 5*sum(F(1,k) for k in range(1,n+1)) for n in range(1,60)) and all(F(5,k) == 5*F(1,k) for k in range(1,60)), 'H14 v002 ej3')
ok(5-1 == 4 and 4*2 == 8 and 1+F(8,2) == 1+4 == 5 and 1+F(7,2) < 5 and 2**8 == 256 and sum(F(1,n) for n in range(1,257)) >= 5 and round(sum(F(1,n) for n in range(1,83))*1000) == 4990 and round(sum(F(1,n) for n in range(1,84))*1000) == 5002 and sum(F(1,n) for n in range(1,83)) < 5 < sum(F(1,n) for n in range(1,84)), 'H14 v002 ej4')
ok(1+F(1,2) == F(2,2)+F(1,2) == F(3,2) == F(15,10) and F(3,2) > 1 and F(1,3) <= 1 and all(F(3,n**4) == 3*F(1,n**4) for n in range(1,60)) and 4 > 1, 'H14 v002 A')
ok((F(12,12),F(6,12),F(4,12),F(3,12)) == (1,F(1,2),F(1,3),F(1,4)) and 12+6 == 18 and 18+4 == 22 and 22+3 == 25 and 1+F(1,2)+F(1,3)+F(1,4) == F(25,12) and round(F(25,12)*1000) == 2083 and 4 == 2**2 and 1+F(2,2) == 1+1 == 2 == F(24,12) and F(25,12) >= F(24,12), 'H14 v002 B(a)')
ok(4-1 == 3 and 3*2 == 6 and 1+F(6,2) == 1+3 == 4 and 1+F(5,2) < 4 and 2**6 == 64 and sum(F(1,n) for n in range(1,65)) >= 4, 'H14 v002 B(b)')
ok((F(1,1**2),F(1,2**2),F(1,3**2)) == (1,F(1,4),F(1,9)) == (F(36,36),F(9,36),F(4,36)) and 36+9 == 45 and 45+4 == 49 and 1+F(1,4)+F(1,9) == F(49,36) and round(F(49,36)*1000) == 1361 and 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) == F(3*18,2*18) and 3*18 == 54 and 2*18 == 36 and 49 <= 54 and F(49,36) <= F(54,36) and 2**2-1 == 3, 'H14 v002 B(c)')
ok(all(F(10,k) == 10*F(1,k) for k in range(1,60)) and F(40,10) == 4 and 4-1 == 3 and 3*2 == 6 and 2**6 == 64 and 10*(1+F(6,2)) == 10*(1+3) == 10*4 == 40 and 10*sum(F(1,k) for k in range(1,31)) < 40 <= 10*sum(F(1,k) for k in range(1,32)) and F(100,10) == 10 and 10-1 == 9 and 9*2 == 18 and 10*(1+F(18,2)) == 100 and 2**18 == 262144 and 700*365 == 255500 and 255500 < 262144, 'H14 v002 C')
# H15 · criterio de la integral: lecturas de int-idea e int-arm, desigualdad de los rectángulos (por sumas de Riemann exactas y por primitivas), series p, ejemplos 1–4 y ejercicios A, B, C
ok([F(1,n**2) for n in (1,2,3,4,5)] == [1,F(1,4),F(1,9),F(1,16),F(1,25)] and (F(3600,3600),F(900,3600),F(400,3600),F(225,3600),F(144,3600)) == (1,F(1,4),F(1,9),F(1,16),F(1,25)) and 3600+900 == 4500 and 4500+400 == 4900 and 4900+225 == 5125 and 5125+144 == 5269 and sum(F(1,n**2) for n in range(1,6)) == F(5269,3600) and round(F(5269,3600)*1000) == 1464, 'H15 int-idea S5')
ok(all(F(1,k**2) <= (F(-1,k))-(F(-1,k-1)) == F(1,k-1)-F(1,k) for k in range(2,300)) and all(x**2 <= k**2 and F(1,x**2) >= F(1,k**2) for k in range(2,30) for x in (F(k-1)+F(j,7) for j in range(0,8))), 'H15 int-idea columna bajo la curva')
ok((F(-1,5))-(F(-1,1)) == F(-1,5)+1 == 1-F(1,5) == F(5,5)-F(1,5) == F(4,5) == F(8,10) and F(1,4)+F(1,9)+F(1,16)+F(1,25) <= F(4,5), 'H15 int-idea integral de 1 a 5')
ok(1+F(4,5) == F(5,5)+F(4,5) == F(9,5) == F(18,10) and F(5269,3600) == 1+(F(1,4)+F(1,9)+F(1,16)+F(1,25)) and F(5269,3600) <= F(9,5) == F(6480,3600), 'H15 int-idea cota de S5')
ok(all((F(-1,n))-(F(-1,1)) == F(-1,n)+1 == 1-F(1,n) and sum(F(1,k**2) for k in range(2,n+1)) <= 1-F(1,n) and sum(F(1,k**2) for k in range(1,n+1)) <= 1+(1-F(1,n)) == 2-F(1,n) < 2 for n in range(2,200)), 'H15 int-idea cota general')
ok((F(12,12),F(6,12),F(4,12),F(3,12)) == (1,F(1,2),F(1,3),F(1,4)) and 12+6 == 18 and 18+4 == 22 and 22+3 == 25 and 1+F(1,2)+F(1,3)+F(1,4) == F(25,12) and round(F(25,12)*100) == 208, 'H15 int-arm S4')
ok(math.log(1) == 0 and round(math.log(5)*100) == 161 and round(math.log(5)*1000) == 1609 and F(25,12) >= math.log(5) and F(208,100) >= F(161,100) and F(208,100)-F(161,100) == F(47,100), 'H15 int-arm integral y diferencia')
ok(all(F(1,k) >= math.log(k+1)-math.log(k) >= F(1,k+1) for k in range(1,2000)) and all(sum(F(1,k) for k in range(1,n+1)) >= math.log(n+1) for n in range(1,300)) and all(F(1,x) <= F(1,k) for k in range(1,30) for x in (F(k)+F(j,7) for j in range(0,8))), 'H15 int-arm columna sobre la curva y cota general')
# desigualdad de los rectángulos con integrales exactas: f = 1/x², 1/x³ (primitivas −1/x, −1/(2x²)); S_n − a_1 ≤ I(n) ≤ S_{n−1}
ok(all(sum(F(1,k**2) for k in range(1,n+1))-1 <= 1-F(1,n) <= sum(F(1,k**2) for k in range(1,n)) for n in range(2,200)) and all(sum(F(1,k**3) for k in range(1,n+1))-1 <= F(1,2)-F(1,2*n**2) <= sum(F(1,k**3) for k in range(1,n)) for n in range(2,200)), 'H15 demostración: S_n − a_1 ≤ I(n) ≤ S_(n−1)')
ok(all(F(1,(k+1)**2) <= F(1,k)-F(1,k+1) <= F(1,k**2) for k in range(1,300)), 'H15 demostración: a_(k+1) ≤ integral en [k, k+1] ≤ a_k')
# series p: (t^(1−p) − 1)/(1 − p) con p = 2, 3, 3/2 (exacto en t cuadrado perfecto) y p = 1/2
ok(all((F(t)**(1-p)-1)/(1-p) == F(1,p-1)-F(1,(p-1)*t**(p-1)) for p in (2,3,4) for t in range(1,60)) and F(0-1,1-2) == F(-1,1-2) == F(1,2-1) == 1 and 1+1 == 2 and 1 < math.pi**2/6 < 2 and round(math.pi**2/6*1000) == 1645, 'H15 series p: p > 1 y caso p = 2')
ok(all((F(m)-1)/F(1,2) == 2*m-2 for m in range(1,60)) and all(1/F(n)**p == F(n)**(-p) >= 1 for n in range(1,30) for p in (0,-1,-2)), 'H15 series p: p = 1/2 (t = m²) y p ≤ 0')
ok(-3+1 == -2 and all((F(-1,2*t**2))-(F(-1,2*1**2)) == F(-1,2*t**2)+F(1,2) == F(1,2)-F(1,2*t**2) and F(1,2*t**2) == F(1,2)*F(1,t**2) for t in range(1,200)) and F(1,2)*0 == 0 and F(1,2)-0 == F(1,2) and 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and F(1,2) == F(5,10) and F(3,2) == F(15,10), 'H15 ej1 integral y cota')
ok(all(F(1,2) <= sum(F(1,n**3) for n in range(1,N+1)) + F(1,2*N**2) and sum(F(1,n**3) for n in range(1,N+1)) <= F(3,2) for N in (1,2,3,10,100,400)) and F(1,2) <= 1.2020569 <= F(3,2) and all(F(1,x**3) > F(1,y**3) for x in range(1,40) for y in range(x+1,41)), 'H15 ej1 cota contra sumas parciales y decreciente')
ok(abs(math.atan(1)-math.pi/4) < 1e-12 and abs((math.pi/2-math.pi/4)-math.pi/4) < 1e-12 and F(2,4)-F(1,4) == F(1,4) and round(math.pi/4*1000) == 785 and F(1,1**2+1) == F(1,2) and F(5,10)+F(785,1000) == F(1285,1000) and abs(math.atan(1e9)-math.pi/2) < 1e-8, 'H15 ej2 integral')
ok(math.pi/4 <= sum(1/(n*n+1) for n in range(1,200001)) + 1e-5 and sum(1/(n*n+1) for n in range(1,200001)) <= 0.5+math.pi/4 and all(F(1,1+x**2) > F(1,1+y**2) for x in range(1,40) for y in range(x+1,41)) and all(math.atan(n)-math.atan(1) <= sum(1/(k*k+1) for k in range(1,n)) and sum(1/(k*k+1) for k in range(2,n+1)) <= math.atan(n)-math.atan(1) for n in range(2,200)), 'H15 ej2 cota y rectángulos')
ok(math.log(2) > 0 and all(1/(x*math.log(x)) > 1/((x+1)*math.log(x+1)) for x in range(2,2000)) and all(abs((math.log(math.log(x+1e-6))-math.log(math.log(x-1e-6)))/2e-6 - 1/(x*math.log(x))) < 1e-6 for x in (2,3,5,10,50)) and all(sum(1/(k*math.log(k)) for k in range(2,n)) >= math.log(math.log(n))-math.log(math.log(2)) for n in range(3,400)), 'H15 ej3 hipótesis, primitiva y cota inferior')
ok(all(1/(n*math.log(n)) < 1/n for n in range(3,2000)) and 1/(2*math.log(2)) > F(1,2) and math.log(3) > 1 > math.log(2), 'H15 ej3 comparación con la armónica desde n = 3')
ok(all(abs(math.sin(math.pi*n)**2) < 1e-20 for n in range(1,50)) and all(abs(math.sin(2*math.pi*k)) < 1e-9 for k in range(0,50)) and all(F(k+1,2)-F(k,2) == F(1,2) for k in range(1,300)) and all((n-1)*F(1,2) == F(n-1,2) for n in range(1,300)) and abs(math.sin(3*math.pi/2)**2-1) < 1e-12 and (-1)**2 == 1, 'H15 ej4 términos, integral por tramo y contraejemplo')
ok(all(abs(math.sin(math.pi*x)**2-(1-math.cos(2*math.pi*x))/2) < 1e-12 for x in (0.1,0.37,1.5,2.25,7.8)) and all(abs(((x+1e-6)/2-math.sin(2*math.pi*(x+1e-6))/(4*math.pi)-((x-1e-6)/2-math.sin(2*math.pi*(x-1e-6))/(4*math.pi)))/2e-6-math.sin(math.pi*x)**2) < 1e-6 for x in (0.1,0.37,1.5,2.25,7.8)) and abs(sum(math.sin(math.pi*(3+(j+0.5)/1000))**2 for j in range(1000))/1000-0.5) < 1e-9, 'H15 ej4 identidad, primitiva y valor 1/2')
ok(1+F(1,2) == F(3,2) and F(-3,2)+F(2,2) == F(-1,2) and 1/F(-1,2) == -2 and all((F(-2,m))-(F(-2,1)) == F(-2,m)+2 == 2-F(2,m) for m in range(1,200)) and 2*0 == 0 and 2-0 == 2 and 1+2 == 3 and 2 <= 2.6123753 <= 3 and all(sum(n**-1.5 for n in range(1,N+1)) <= 3 for N in (1,10,1000,50000)), 'H15 A(a)')
ok(F(-1,2)+F(2,2) == F(1,2) and 1/F(1,2) == 2 and all(2*m-2*1 == 2*m-2 for m in range(1,200)) and all(abs((2*math.sqrt(x+1e-6)-2*math.sqrt(x-1e-6))/2e-6-1/math.sqrt(x)) < 1e-6 and abs((-2/math.sqrt(x+1e-6)+2/math.sqrt(x-1e-6))/2e-6-x**-1.5) < 1e-6 for x in (1,2,5,10)) and F(3,2) > 1 and F(1,2) <= 1, 'H15 A(b) y primitivas')
ok(all(abs(math.exp(-x*x)*(1-2*x*x)-(math.exp(-x*x)-2*x*x*math.exp(-x*x))) < 1e-12 and abs(((x+1e-6)*math.exp(-(x+1e-6)**2)-(x-1e-6)*math.exp(-(x-1e-6)**2))/2e-6-math.exp(-x*x)*(1-2*x*x)) < 1e-6 and 1-2*x*x <= 1-2 == -1 for x in (1,1.5,2,3,5)) and all(abs((-0.5*math.exp(-(x+1e-6)**2)+0.5*math.exp(-(x-1e-6)**2))/2e-6-x*math.exp(-x*x)) < 1e-6 for x in (1,1.5,2,3)), 'H15 B derivada y primitiva')
ok(abs((0.5*math.exp(-1)-0.5*0)-1/(2*math.e)) < 1e-15 and abs(1/math.e+1/(2*math.e)-3/(2*math.e)) < 1e-15 and F(2,2)+F(1,2) == F(3,2) and 2*F(2718,1000) == F(5436,1000) and round(1/5.436*1000) == 184 and round(3/5.436*1000) == 552 and round(1/(2*math.e)*1000) == 184 and round(3/(2*math.e)*1000) == 552 and 1/(2*math.e) <= sum(n*math.exp(-n*n) for n in range(1,40)) <= 3/(2*math.e) and round(math.e*1000) == 2718, 'H15 B integral y cota')
ok([F(3600,n**2) for n in (1,2,3,4,5)] == [3600,900,400,225,144] and (F(3600,4),F(3600,9),F(3600,16),F(3600,25)) == (900,400,225,144) and 3600+900 == 4500 and 4500+400 == 4900 and 4900+225 == 5125 and 5125+144 == 5269 and 3600*F(5269,3600) == 5269, 'H15 C(a)')
ok(all(sum(F(3600,k**2) for k in range(1,n+1)) == 3600*sum(F(1,k**2) for k in range(1,n+1)) < 3600*2 == 7200 for n in range(1,300)) and 7200 < 8000, 'H15 C(b)')
ok(F(8000,3600) == F(20,9) and round(F(20,9)*1000) == 2222 and round(math.log(9)*1000) == 2197 and round(math.log(10)*1000) == 2303 and math.log(9) < F(20,9) <= math.log(10) and 10-1 == 9 and 3600*math.log(10) >= 8000 and 3600*sum(F(1,k) for k in range(1,10)) >= 8000, 'H15 C(c) cota')
ok(3600*F(25,12) == F(90000,12) == 7500 and F(3600,5) == 720 and 7500+720 == 8220 and 3600*sum(F(1,k) for k in range(1,5)) == 7500 < 8000 <= 3600*sum(F(1,k) for k in range(1,6)) == 8220, 'H15 C(c) día a día')
# H16 v001 · serie alternante: signos, zigzag de las sumas parciales (identidades en rejilla), lectura de alt-idea y alt-vivo, ejemplos y ejercicios
ok((-1)*(-1) == 1 and all((-1)**(2*m) == ((-1)**2)**m == 1**m == 1 and (-1)**(2*m+1) == (-1)**(2*m)*(-1)**1 == 1*(-1) == -1 for m in range(0,200)), 'H16 k1 signo de (−1)ⁿ: par 1, impar −1')
ok(all((-1)**(n+1) == (-1)**n*(-1) == -((-1)**n) and (-1)**(n+1) == (-1)**(n-1)*(-1)**2 == (-1)**(n-1)*1 == (-1)**(n-1) and (-1)**(n+1) == (1 if n % 2 == 1 else -1) for n in range(1,200)), 'H16 k1 (−1)ⁿ⁺¹ y (−1)ⁿ⁻¹ dan el mismo signo')
ok(0 < 1 < 2 < 3 < F(314159,100000) < 4 < 2*F(314159,100000) and __import__('math').sin(1) > 0 and __import__('math').sin(2) > 0 and __import__('math').sin(3) > 0 and __import__('math').sin(4) < 0 and all(round(__import__('math').cos(n*__import__('math').pi)) == (-1)**n for n in range(-50,51)), 'H16 k1 signos de sen 1, sen 2, sen 3, sen 4 y cos(nπ) (numérico)')
ok(all((2*m+1)+1 == 2*m+2 == 2*(m+1) and (2*m+2)+1 == 2*m+3 == 2*(m+1)+1 and (-1)**(2*m+2) == 1 and (-1)**(2*m+3) == -1 for m in range(0,200)), 'H16 k2 exponentes y signos de los lugares 2m+1 y 2m+2')
ok(all((lambda S: all(S[2*m+1] == S[2*m]+b[2*m+1] and S[2*m+1] > S[2*m] and S[2*m+2] == S[2*m+1]-b[2*m+2] and S[2*m+2] < S[2*m+1] and S[2*m+2] == S[2*m]+b[2*m+1]-b[2*m+2] and S[2*m+2]-S[2*m] == b[2*m+1]-b[2*m+2] for m in range(0,9)) and all(S[2*m] == S[2*m-1]-b[2*m] and S[2*m+1] == S[2*m-1]-b[2*m]+b[2*m+1] and S[2*m+1]-S[2*m-1] == -b[2*m]+b[2*m+1] for m in range(1,9)))([sum((-1)**(k+1)*b[k] for k in range(1,n+1)) for n in range(0,21)]) for b in ([None]+[F(1,n) for n in range(1,21)], [None]+[F(1,2**(n-1)) for n in range(1,21)], [None]+[F(n,n+1) for n in range(1,21)], [None]+[F(7*n % 11+1, 3) for n in range(1,21)], [None]+[F(1) for n in range(1,21)])), 'H16 k2 zigzag: identidades de las sumas parciales (cinco sucesiones bₙ > 0)')
ok(all((lambda S: all(S[2*m+2] >= S[2*m] for m in range(0,9)) and all(S[2*m+1] <= S[2*m-1] for m in range(1,9)))([sum((-1)**(k+1)*b[k] for k in range(1,n+1)) for n in range(0,21)]) for b in ([None]+[F(1,n) for n in range(1,21)], [None]+[F(1,2**(n-1)) for n in range(1,21)], [None]+[F(21-n,5) for n in range(1,21)], [None]+[F(1) for n in range(1,21)])), 'H16 k2 con bₙ decreciente: pares no bajan, impares no suben')
ok(F(1,2) == F(4,8) <= F(5,8) and 1 == F(16,16) >= F(3,4) == F(12,16) >= F(11,16), 'H16 k2 comprobación con la serie de la animación')
ok(all(F(-1,2)**(n-1) == (-1)**(n-1)*F(1,2)**(n-1) and F(1,2)**(n-1) > 0 for n in range(1,60)) and abs(F(-1,2)) == F(1,2) < 1 and 1-F(-1,2) == 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and 1/F(3,2) == 1*F(2,3) == F(2,3) and all(sum(F(-1,2)**(k-1) for k in range(1,n+1)) == (1-F(-1,2)**n)/(1-F(-1,2)) for n in range(1,60)), 'H16 k3 geométrica alternante: suma 2/3')
ok([sum((-1)**(k+1) for k in range(1,n+1)) for n in range(1,9)] == [1,0,1,0,1,0,1,0] and 1-1 == 0 and 0+1 == 1 and all(abs((-1)**(n+1)) == 1 for n in range(1,60)), 'H16 k3 1 − 1 + 1 − 1: sumas parciales 1, 0, 1, 0')
ok([F(1,2**(n-1)) for n in range(1,6)] == [1,F(1,2),F(1,4),F(1,8),F(1,16)] and [sum((-1)**(k+1)*F(1,2**(k-1)) for k in range(1,n+1)) for n in range(1,6)] == [1,F(1,2),F(3,4),F(5,8),F(11,16)], 'H16 alt-idea términos y sumas parciales')
ok(1 == F(2,2) and F(2,2)-F(1,2) == F(2-1,2) == F(1,2) and F(1,2) == F(2,4) and F(2,4)+F(1,4) == F(2+1,4) == F(3,4) and F(3,4) == F(6,8) and F(6,8)-F(1,8) == F(6-1,8) == F(5,8) and F(5,8) == F(10,16) and F(10,16)+F(1,16) == F(10+1,16) == F(11,16), 'H16 alt-idea cada suma o resta de fracciones')
ok(1*F(-1,2) == F(-1,2) and F(-1,2)*F(-1,2) == F(1,4) and F(1,4)*F(-1,2) == F(-1,8) and F(-1,8)*F(-1,2) == F(1,16), 'H16 alt-idea cada término es el anterior por −1/2')
ok(1-F(2,3) == F(3,3)-F(2,3) == F(1,3) and F(2,3)-F(1,2) == F(4,6)-F(3,6) == F(1,6) and F(3,4)-F(2,3) == F(9,12)-F(8,12) == F(1,12) and F(2,3)-F(5,8) == F(16,24)-F(15,24) == F(1,24) and F(11,16)-F(2,3) == F(33,48)-F(32,48) == F(1,48) and F(2,3) == F(4,6) == F(8,12) == F(16,24) == F(32,48) and F(1,2) == F(3,6) and F(3,4) == F(9,12) and F(5,8) == F(15,24) and F(11,16) == F(33,48) and F(1,6) == F(1,3)/2 and F(1,12) == F(1,6)/2 and F(1,24) == F(1,12)/2 and F(1,48) == F(1,24)/2, 'H16 alt-idea distancias a 2/3')
ok(all(abs(sum(F(-1,2)**(k-1) for k in range(1,n+1))-F(2,3)) == F(1,3*2**(n-1)) and (sum(F(-1,2)**(k-1) for k in range(1,n+1)) > F(2,3)) == (n % 2 == 1) for n in range(1,60)), 'H16 alt-idea impares arriba de 2/3, pares abajo, distancia a la mitad')
ok(all((lambda r: 1*r == r and r*r == F(R*R,10**4) and F(R*R,10**4)*r == F(R**3,10**6) and 1+r == F(100+R,100) and F(100+R,100)+F(R*R,10**4) == F(10**4+100*R+R*R,10**4) and F(10**4+100*R+R*R,10**4)+F(R**3,10**6) == F(10**6+10**4*R+100*R*R+R**3,10**6) and 1-r == 1+(-r) == F(100-R,100) and (r*r > 0 and r**3 < 0 and 1+r < 1 and 1+r+r*r > 1+r and 1+r+r*r+r**3 < 1+r+r*r if R < 0 else True))(F(R,100)) for R in range(-100,1)), 'H16 alt-vivo términos y sumas parciales exactos para cada centésima de r')
ok(all((lambda r, S: abs(r) < 1 and S == F(100,100-R) and 1+r < S < 1 and all((sum(r**(k-1) for k in range(1,n+1)) > S) == (n % 2 == 1) and abs(sum(r**(k-1) for k in range(1,n+1))-S) == abs(r)**n/(1-r) for n in range(1,9)))(F(R,100), 1/(1-F(R,100))) for R in range(-99,0)), 'H16 alt-vivo −1 < r < 0: suma 1/(1 − r), puntos a ambos lados')
ok(F(-1,2)*F(-1,2) == F(25,100) and F(25,100)*F(-1,2) == F(-125,1000) and 1+F(-1,2) == F(50,100) and F(50,100)+F(25,100) == F(75,100) and F(75,100)+F(-125,1000) == F(625,1000) and 1-F(-1,2) == 1+F(50,100) == F(150,100) and round(1/F(150,100)*100) == 67 and F(50,100) < F(67,100) < 1, 'H16 alt-vivo r = −0,50')
ok(F(-75,100)**2 == F(5625,10**4) and F(5625,10**4)*F(-75,100) == F(-421875,10**6) and 1+F(-75,100) == F(25,100) and F(25,100)+F(5625,10**4) == F(8125,10**4) and F(8125,10**4)+F(-421875,10**6) == F(390625,10**6) and 1+F(75,100) == F(175,100) and round(1/F(175,100)*100) == 57 and F(-25,100)**2 == F(625,10**4) and F(625,10**4)*F(-25,100) == F(-15625,10**6) and 1+F(-25,100) == F(75,100) and F(75,100)+F(625,10**4) == F(8125,10**4) and F(8125,10**4)+F(-15625,10**6) == F(796875,10**6) and 1/F(125,100) == F(80,100), 'H16 alt-vivo r = −0,75 y r = −0,25')
ok(1*0 == 0 and 0*0 == 0 and 1+0 == 1 and 1-0 == 1 and F(1,1) == 1 and 1*(-1) == -1 and (-1)*(-1) == 1 and 1+(-1) == 0 and 0+1 == 1 and abs(-1) == 1 and not abs(-1) < 1, 'H16 alt-vivo casos r = 0 y r = −1')
ok([(-1)**(n+1)*F(1,n) for n in range(1,6)] == [1,F(-1,2),F(1,3),F(-1,4),F(1,5)] and [n+1 for n in range(1,6)] == [2,3,4,5,6] and 1-F(1,2) == F(2,2)-F(1,2) == F(2-1,2) == F(1,2) and F(1,2)+F(1,3) == F(3,6)+F(2,6) == F(3+2,6) == F(5,6) and F(5,6)-F(1,4) == F(10,12)-F(3,12) == F(10-3,12) == F(7,12) and F(1,2) == F(6,12) <= F(7,12) and 1 == F(6,6) >= F(5,6) and all(F(1,n+1) < F(1,n) for n in range(1,300)), 'H16 ej1')
ok([F(2**n,3**n) for n in range(1,5)] == [F(2,3),F(4,9),F(8,27),F(16,81)] and [2**n for n in range(1,5)] == [2,4,8,16] and [3**n for n in range(1,5)] == [3,9,27,81] and all((-1)**(n+1)*F(2,3)**n == F(2,3)*F(-2,3)**(n-1) for n in range(1,60)) and F(-4,9)/F(2,3) == F(-4,9)*F(3,2) == F(-12,18) == F(-2,3) and F(8,27)/F(-4,9) == F(8,27)*F(-9,4) == F(-72,108) == F(-2,3) and F(-16,81)/F(8,27) == F(-16,81)*F(27,8) == F(-432,648) == F(-2,3) and 4*3 == 12 and 9*2 == 18 and 8*9 == 72 and 27*4 == 108 and 16*27 == 432 and 81*8 == 648 and abs(F(-2,3)) == F(2,3) < 1 and 1-F(-2,3) == 1+F(2,3) == F(3,3)+F(2,3) == F(5,3) and F(2,3)/F(5,3) == F(2,3)*F(3,5) == F(6,15) == F(2,5) == F(4,10), 'H16 ej2')
ok(all((-1)**n*(-1)**n == (-1)**(n+n) == (-1)**(2*n) == ((-1)**2)**n == 1**n == 1 for n in range(1,200)) and [(-1)**n*F(1,n) for n in (1,2,3)] == [-1,F(1,2),F(-1,3)] and [(-1)**(n+1)*(n-3) for n in range(1,6)] == [-2,1,0,-1,2] and (-1)**2*(1-3) == 1*(-2) == -2 and (-1)**3*(2-3) == (-1)*(-1) == 1 and (-1)**4*(3-3) == 1*0 == 0 and (-1)**5*(4-3) == (-1)*1 == -1 and (-1)**6*(5-3) == 1*2 == 2 and all(n-3 > 0 for n in range(4,300)), 'H16 ej3')
ok([(-1)**(n+1)*F(n,n+1) for n in range(1,5)] == [F(1,2),F(-2,3),F(3,4),F(-4,5)] and all(abs((-1)**(n+1)*F(n,n+1)) == 1*F(n,n+1) == F(n,n+1) and n == (n+1)-1 and F(n,n+1) == F(n+1,n+1)-F(1,n+1) == 1-F(1,n+1) and F(n,n+1) > 0 for n in range(1,300)) and 1-0 == 1 and 1 != 0, 'H16 ej4')
ok(all(-1**n == -(1**n) == -1 for n in range(1,60)) and (-1)**(1+1) == 1 and (-1)**1 == -1, 'H16 errores frecuentes: −1ⁿ = −1 siempre')
ok([(-1)**(n-1)*F(3,n**2) for n in range(1,5)] == [3,F(-3,4),F(3,9),F(-3,16)] and all(F(3,n**2) > 0 and (-1)**(2*n) == ((-1)**2)**n == 1 for n in range(1,200)) and [F(1,2*n) for n in range(1,5)] == [F(1,2),F(1,4),F(1,6),F(1,8)] and [2*1,2*2,2*3,2*4] == [2,4,6,8] and [(-1)**n*F(1,2*n) for n in range(1,5)] == [F(-1,2),F(1,4),F(-1,6),F(1,8)], 'H16 A')
ok(3-F(3,4) == F(12,4)-F(3,4) == F(12-3,4) == F(9,4) and F(9,4)+F(3,16) == F(36,16)+F(3,16) == F(36+3,16) == F(39,16) and F(39,16)-F(3,64) == F(156,64)-F(3,64) == F(156-3,64) == F(153,64) and F(9,4) == F(36,16) and F(39,16) == F(156,64) and [sum(3*F(-1,4)**(k-1) for k in range(1,n+1)) for n in range(1,5)] == [3,F(9,4),F(39,16),F(153,64)], 'H16 B(a)')
ok(F(-3,4)/3 == F(-3,4)*F(1,3) == F(-3,12) == F(-1,4) and F(3,16)/F(-3,4) == F(3,16)*F(-4,3) == F(-12,48) == F(-1,4) and F(-3,64)/F(3,16) == F(-3,64)*F(16,3) == F(-48,192) == F(-1,4) and 16*3 == 48 and 64*3 == 192 and all(3*F(-1,4)**(n-1) == (-1)**(n-1)*F(3,4**(n-1)) and F(3,4**(n-1)) > 0 for n in range(1,60)) and abs(F(-1,4)) == F(1,4) < 1 and 1-F(-1,4) == 1+F(1,4) == F(4,4)+F(1,4) == F(5,4) and 3/F(5,4) == 3*F(4,5) == F(12,5) == F(24,10), 'H16 B(b)')
ok(3 == F(15,5) > F(12,5) and F(9,4) == F(45,20) and F(12,5) == F(48,20) and 45 < 48 and F(39,16) == F(195,80) and F(12,5) == F(192,80) and 195 > 192 and F(153,64) == F(765,320) and F(12,5) == F(768,320) and 765 < 768 and [abs(x-F(12,5)) for x in (3,F(9,4),F(39,16),F(153,64))] == [F(3,5),F(3,20),F(3,80),F(3,320)], 'H16 B(c)')
ok(F(15,2) == F(75,10) and 60-30 == 30 and 30+15 == 45 and 45-F(75,10) == F(375,10) and 60*F(-1,2) == -30 and (-30)*F(-1,2) == 15 and 15*F(-1,2) == F(-75,10) and [sum(60*F(-1,2)**(k-1) for k in range(1,n+1)) for n in range(1,5)] == [60,30,45,F(375,10)] and abs(F(-1,2)) < 1 and 1-F(-1,2) == 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and 60/F(3,2) == 60*F(2,3) == F(120,3) == 40 and 40-F(375,10) == F(25,10) and [abs(x-40) for x in (60,30,45,F(375,10))] == [20,10,5,F(25,10)], 'H16 C')
# H17 · Criterio de Leibniz: lectura de lei-idea y lei-vivo, demostración (identidades en rejilla), contraejemplo sin la condición (2), ejemplos 1-4 y ejercicios A, B, C; la cota |S − Sₙ| ≤ bₙ₊₁ se comprueba numéricamente con ln 2 y π²/12 (valores enunciados sin demostrar en la hoja)
ok(1-F(1,2) == F(2,2)-F(1,2) == F(1,2) and F(1,2)+F(1,3) == F(3,6)+F(2,6) == F(5,6) and F(5,6)-F(1,4) == F(10,12)-F(3,12) == F(7,12) and F(7,12)+F(1,5) == F(35,60)+F(12,60) == F(47,60) and F(47,60)-F(1,6) == F(47,60)-F(10,60) == F(37,60), 'H17 lei-idea sumas parciales S1…S6')
ok([sum(F((-1)**(k+1),k) for k in range(1,n+1)) for n in range(1,7)] == [1,F(1,2),F(5,6),F(7,12),F(47,60),F(37,60)] and F(1,2) > F(1,3) > F(1,4) > F(1,5) > F(1,6) > 0 and 2 < 3 < 4 < 5 < 6, 'H17 lei-idea puntos y saltos')
ok(F(7,12)-F(1,2) == F(7,12)-F(6,12) == F(1,12) > 0 and F(37,60)-F(7,12) == F(37,60)-F(35,60) == F(2,60) == F(1,30) > 0 and F(1,3) > F(1,4) and F(1,2) < F(7,12) < F(37,60) and F(1,12) == F(1,3)-F(1,4) and F(1,30) == F(1,5)-F(1,6), 'H17 lei-idea pares suben')
ok(F(5,6)-1 == F(5,6)-F(6,6) == -F(1,6) < 0 and F(47,60)-F(5,6) == F(47,60)-F(50,60) == -F(3,60) == -F(1,20) < 0 and F(1,2) > F(1,3) and 1 > F(5,6) > F(47,60) and -F(1,6) == -F(1,2)+F(1,3) and -F(1,20) == -F(1,4)+F(1,5), 'H17 lei-idea impares bajan')
ok(1-F(1,2) == F(2,2)-F(1,2) == F(1,2) and F(5,6)-F(7,12) == F(10,12)-F(7,12) == F(3,12) == F(1,4) and F(47,60)-F(37,60) == F(10,60) == F(1,6) and round(F(37,60)*1000) == 617 and round(F(47,60)*1000) == 783 and F(37,60) <= math.log(2) <= F(47,60), 'H17 lei-idea ancho de la franja e intervalo')
TB17 = [[1,0,1,1,0,1,1,1,1],[2,1,1,2,2,1,1,1,2],[3,1,2,6,3,2,5,5,6],[4,5,6,12,10,3,7,7,12],[5,7,12,60,35,12,47,47,60],[6,47,60,60,47,10,37,37,60],[7,37,60,420,259,60,319,319,420],[8,319,420,840,638,105,533,533,840],[9,533,840,2520,1599,280,1879,1879,2520],[10,1879,2520,2520,1879,252,1627,1627,2520],[11,1627,2520,27720,17897,2520,20417,20417,27720],[12,20417,27720,27720,20417,2310,18107,18107,27720],[13,18107,27720,360360,235391,27720,263111,263111,360360]]
ok(all(t[0] == i+1 and F(t[7],t[8]) == sum(F((-1)**(k+1),k) for k in range(1,t[0]+1)) and F(t[7],t[8]).numerator == t[7] and F(t[7],t[8]).denominator == t[8] for i, t in enumerate(TB17)), 'H17 lei-vivo tabla: Sₙ exacta e irreducible, n = 1…13')
ok(all(F(t[1],t[2]) == (F(TB17[i-1][7],TB17[i-1][8]) if i else 0) and F(t[4],t[3]) == F(t[1],t[2]) and F(t[5],t[3]) == F(1,t[0]) and t[6] == t[4]+(1 if t[0] % 2 else -1)*t[5] and (t[6],t[3]) == (t[7],t[8]) and t[3] % t[2] == 0 and t[3] % t[0] == 0 for i, t in enumerate(TB17)), 'H17 lei-vivo tabla: denominador común y cada suma o resta')
ok(all(abs(F(TB17[n-1][7],TB17[n-1][8])-F(TB17[n][7],TB17[n][8])) == F(1,n+1) and min(F(TB17[n-1][7],TB17[n-1][8]),F(TB17[n][7],TB17[n][8])) <= math.log(2) <= max(F(TB17[n-1][7],TB17[n-1][8]),F(TB17[n][7],TB17[n][8])) and abs(math.log(2)-TB17[n-1][7]/TB17[n-1][8]) <= 1/(n+1) for n in range(1,13)), 'H17 lei-vivo ancho 1/(n+1), intervalo y cota con ln 2')
ok(all((F(TB17[n-1][7],TB17[n-1][8]) > F(TB17[n][7],TB17[n][8])) == (n % 2 == 1) for n in range(1,13)) and [n for n in range(1,13) if 1000 % (n+1) == 0] == [1,3,4,7,9] and F(1,2) == F('0.5') and F(1,4) == F('0.25') and F(1,5) == F('0.2') and F(1,8) == F('0.125') and F(1,10) == F('0.1'), 'H17 lei-vivo impar arriba, par abajo; cotas exactas')
ok([round(F(t[7],t[8])*1000) for t in TB17] == [1000,500,833,583,783,617,760,635,746,646,737,653,730] and [round(F(1000,n+1)) for n in range(1,13)] == [500,333,250,200,167,143,125,111,100,91,83,77] and all(abs(F(t[7],t[8])*1000 % 1 - F(1,2)) > F(1,100) for t in TB17[1:]) and F(1,100) == F(1,99+1), 'H17 lei-vivo decimales y cota 0,01 con 99 términos')
ok(all(sum((-1)**(k+1)*b[k] for k in range(1,2*m+3)) - sum((-1)**(k+1)*b[k] for k in range(1,2*m+1)) == b[2*m+1]-b[2*m+2] >= 0 and sum((-1)**(k+1)*b[k] for k in range(1,2*m+1)) == b[1]-sum(b[2*j]-b[2*j+1] for j in range(1,m))-b[2*m] <= b[1] for b in ({k:F(1,k) for k in range(1,40)}, {k:F(1,k*k) for k in range(1,40)}, {k:F(7,2*k+3) for k in range(1,40)}) for m in range(1,17)), 'H17 demostración: pares crecen y S₂ₘ ≤ b₁ (rejilla)')
ok(all(sum((-1)**(k+1)*b[k] for k in range(1,2*m+2)) - sum((-1)**(k+1)*b[k] for k in range(1,2*m)) == -b[2*m]+b[2*m+1] <= 0 and sum((-1)**(k+1)*b[k] for k in range(1,2*m+2)) - sum((-1)**(k+1)*b[k] for k in range(1,2*m+1)) == b[2*m+1] and sum((-1)**(k+1)*b[k] for k in range(1,2*m)) - sum((-1)**(k+1)*b[k] for k in range(1,2*m+1)) == b[2*m] for b in ({k:F(1,k) for k in range(1,40)}, {k:F(1,k*k) for k in range(1,40)}, {k:F(7,2*k+3) for k in range(1,40)}) for m in range(1,17)), 'H17 demostración: impares decrecen y restas de sumas seguidas (rejilla)')
ok(all(abs(math.log(2)-sum((-1)**(k+1)/k for k in range(1,n+1))) <= 1/(n+1) for n in range(1,400)) and all(abs(math.pi**2/12-sum((-1)**(k+1)/k**2 for k in range(1,n+1))) <= 1/(n+1)**2 for n in range(1,400)) and all(sum((-1)**(k+1)/k for k in range(1,2*m+1)) <= math.log(2) <= sum((-1)**(k+1)/k for k in range(1,2*m+2)) for m in range(1,200)), 'H17 cota del error |S − Sₙ| ≤ bₙ₊₁ con ln 2 y π²/12 (numérico)')
ok(all(4*k*k >= 4*k == 2*k+2*k >= 2*k+2 > 2*k+1 and F(1,4*k*k) < F(1,2*k+1) and F(1,(2*k)**2) == F(1,4*k*k) == F(1,4)*F(1,k*k) and F(1,2*k-1) > F(1,2*k) == F(1,2)*F(1,k) and 0 < F(1,(2*k)**2) <= F(1,2*k) for k in range(1,300)) and F(1,4) < F(1,3) and F(1,4)*2 == F(1,2), 'H17 contraejemplo: no decrece y cotas de cada parte')
ok(all(sum(F(1,2*k-1) for k in range(1,m+1)) - sum(F(1,(2*k)**2) for k in range(1,m+1)) == sum((-1)**(n+1)*(F(1,n) if n % 2 else F(1,n*n)) for n in range(1,2*m+1)) > F(1,2)*sum(F(1,k) for k in range(1,m+1))-F(1,2) and sum(F(1,k*k) for k in range(1,m+1)) < 2 and sum(F(1,2*k-1) for k in range(1,m+1)) > F(1,2)*sum(F(1,k) for k in range(1,m+1)) and sum(F(1,(2*k)**2) for k in range(1,m+1)) < F(1,2) for m in range(1,120)) and all(F(2*M+1,2)-F(1,2) == F(2*M,2) == M for M in range(-20,200)) and [1,-F(1,4),F(1,3),-F(1,16),F(1,5),-F(1,36)] == [(-1)**(n+1)*(F(1,n) if n % 2 else F(1,n*n)) for n in range(1,7)], 'H17 contraejemplo: S₂ₘ > H_m/2 − 1/2')
ok(all(n < n+1 and F(1,n+1) < F(1,n) and F(1,n) > 0 for n in range(1,300)) and F(37,60) <= math.log(2) <= F(47,60) and round(math.log(2)*1000) == 693 and round(F(37,60)*1000) == 617 and round(F(47,60)*1000) == 783, 'H17 ej1')
ok(all(math.sqrt(n) < math.sqrt(n+1) and 1/math.sqrt(n+1) < 1/math.sqrt(n) and math.sqrt(n) >= 1 for n in range(1,300)) and math.isqrt(100) == 10 and 10*10 == 100 and F(1,10) == F('0.1') and 99+1 == 100, 'H17 ej2')
ok(all(n*n < (n+1)**2 and F(1,(n+1)**2) < F(1,n*n) and n*n >= n and 0 < F(1,n*n) <= F(1,n) for n in range(1,300)) and F('0.01') == F(1,100) and 100 == 10**2 and all((F(1,(n+1)**2) <= F(1,100)) == ((n+1)**2 >= 100) == (n+1 >= 10) == (n >= 9) for n in range(1,300)) and 10-1 == 9 and F(1,10**2) == F(1,100) == F('0.01') and F(1,9**2) == F(1,81) > F(1,100), 'H17 ej3 cantidad de términos')
ok((F(1,1**2),F(1,2**2),F(1,3**2),F(1,4**2)) == (1,F(1,4),F(1,9),F(1,16)) and (F(36,36),F(9,36),F(4,36)) == (1,F(1,4),F(1,9)) and 36-9 == 27 and 27+4 == 31 and 1-F(1,4)+F(1,9) == F(31,36) and round(F(31,36)*1000) == 861 and 31*4 == 124 and 36*4 == 144 and 16*9 == 144 and F(124,144) == F(31,36) and F(9,144) == F(1,16) and 124-9 == 115 and F(31,36)-F(1,16) == F(115,144) and round(F(115,144)*1000) == 799 and F(31,36)-F(115,144) == F(1,16) == F('0.0625') and F(115,144) <= math.pi**2/12 <= F(31,36) and round(math.pi**2/12*1000) == 822, 'H17 ej3 intervalo con S₃ y S₄')
ok(all(F(n,2*n+1) == 1/(2+F(1,n)) and F(n,2*n+1) > 0 and 3*n >= 2*n+1 and n+2*n == 3*n and 1+2*n == 2*n+1 and F(3*n,3*(2*n+1)) == F(n,2*n+1) >= F(2*n+1,3*(2*n+1)) == F(1,3) and abs((-1)**(n+1)*F(n,2*n+1)) == F(n,2*n+1) for n in range(1,300)) and F(1,2+0) == F(1,2) != 0 and F(1,3) == F(5,15) and F(2,5) == F(6,15) and F(1,2*1+1) == F(1,3) and F(2,2*2+1) == F(2,5) and F(2,5) > F(1,3), 'H17 ej4')
ok(all(2*n-1 >= 2*1-1 == 1 > 0 and 2*(n+1)-1 == 2*n+2-1 == 2*n+1 and 0 < 2*n-1 < 2*n+1 and F(1,2*n+1) < F(1,2*n-1) and n+(n-1) == 2*n-1 and 1+(n-1) == n and 2*n-1 >= n and 0 < F(1,2*n-1) <= F(1,n) for n in range(1,300)) and [(-1)**(n+1)*F(1,2*n-1) for n in (1,2,3,4)] == [1,-F(1,3),F(1,5),-F(1,7)], 'H17 A (a)')
ok(all(F(n+1,n) == F(n,n)+F(1,n) == 1+F(1,n) > 1 and abs((-1)**(n+1)*F(n+1,n)) == F(n+1,n) for n in range(1,300)) and 1+0 == 1 != 0, 'H17 A (b)')
ok([F((-1)**n,n**3) for n in (1,2,3)] == [-1,F(1,8),-F(1,27)] and all(n**3 < (n+1)**3 and F(1,(n+1)**3) < F(1,n**3) and n**3 >= n and n**3 >= 1 and 0 < F(1,n**3) <= F(1,n) and F((-1)**n,n**3) == -F((-1)**(n+1),n**3) for n in range(1,300)), 'H17 A (c)')
ok((F(12,12),F(6,12),F(4,12),F(3,12)) == (1,F(1,2),F(1,3),F(1,4)) and 12-6 == 6 and 6+4 == 10 and 10-3 == 7 and 1-F(1,2)+F(1,3)-F(1,4) == F(7,12) and round(F(7,12)*1000) == 583 and 7*5 == 35 and 12*5 == 60 and 1*12 == 12 and 5*12 == 60 and 35+12 == 47 and F(7,12)+F(1,5) == F(35,60)+F(12,60) == F(47,60) and round(F(47,60)*1000) == 783 and F(47,60)-F(35,60) == F(12,60) == F(1,5) and F(7,12) <= math.log(2) <= F(47,60), 'H17 B (a)')
ok(F('0.001') == F(1,1000) and all((F(1,n+1) <= F(1,1000)) == (n+1 >= 1000) == (n >= 999) for n in range(1,3000)) and 1000-1 == 999 and 1000 == 10**3 and all((F(1,(n+1)**3) <= F(1,1000)) == ((n+1)**3 >= 1000) == (n+1 >= 10) == (n >= 9) for n in range(1,300)) and F(1,10**3) == F(1,1000) == F('0.001'), 'H17 B (b) y (c)')
ok(all(20+sum((-1)**(k+1)*F(4,k) for k in range(1,n+1)) == 20+4*sum(F((-1)**(k+1),k) for k in range(1,n+1)) for n in range(1,60)) and F(4,2) == 2 and F(4,4) == 1 and 4*F(7,12) == F(28,12) == F(7,3) and 28 == 4*7 and 12 == 4*3 and 20 == F(60,3) and F(60,3)+F(7,3) == F(67,3) and round(F(67,3)*100) == 2233 and 20+4-2+F(4,3)-1 == F(67,3), 'H17 C (a)')
ok(4*F(47,60) == F(188,60) == F(47,15) and 188 == 4*47 and 60 == 4*15 and 20 == F(300,15) and F(300,15)+F(47,15) == F(347,15) and round(F(347,15)*100) == 2313 and 20+4*F(7,12) == F(67,3) and 20+4*F(47,60) == F(347,15) and F(67,3) <= 20+4*math.log(2) <= F(347,15) and round((20+4*math.log(2))*100) == 2277, 'H17 C (b)')
ok(F('0.1') == F(1,10) and all((F(4,n+1) <= F(1,10)) == (4*10 <= n+1) == (n >= 39) for n in range(1,300)) and 4*10 == 40 and 40-1 == 39 and F(4,39+1) == F(4,40) == F(1,10) and all(abs((20+4*math.log(2))-(20+4*sum((-1)**(k+1)/k for k in range(1,n+1)))) <= 4/(n+1) for n in range(1,200)) and abs((20+4*math.log(2))-(20+4*sum((-1)**(k+1)/k for k in range(1,40)))) <= 0.1, 'H17 C (c)')
# H18
# H18 · Convergencia absoluta y condicional: lecturas de abs-idea y abs-cond, demostración del teorema (identidades en rejilla), recíproco falso, ejemplos 1-4 y ejercicios A, B, C; ln 2 y las divergencias se comprueban solo numéricamente (en la hoja se citan de H12, H14 y H17)
A18 = [F(-1,2)**(n-1) for n in range(1,7)]; S18 = [sum(A18[:n]) for n in range(1,7)]; T18 = [sum(abs(x) for x in A18[:n]) for n in range(1,7)]; K18 = [x+abs(x) for x in A18]; C18 = [sum(K18[:n]) for n in range(1,7)]
ok(A18 == [1,-F(1,2),F(1,4),-F(1,8),F(1,16),-F(1,32)] and S18 == [1,F(1,2),F(3,4),F(5,8),F(11,16),F(21,32)] and F(2,2)-F(1,2) == F(1,2) and F(2,4)+F(1,4) == F(3,4) and F(2,4) == F(1,2) and F(6,8)-F(1,8) == F(5,8) and F(6,8) == F(3,4) and F(10,16)+F(1,16) == F(11,16) and F(10,16) == F(5,8) and F(22,32)-F(1,32) == F(21,32) and F(22,32) == F(11,16), 'H18 abs-idea paso 1: sumas parciales con signos')
ok([abs(x) for x in A18] == [F(1,2**(n-1)) for n in range(1,7)] and T18 == [1,F(3,2),F(7,4),F(15,8),F(31,16),F(63,32)] and F(2,2)+F(1,2) == F(3,2) and F(6,4)+F(1,4) == F(7,4) and F(6,4) == F(3,2) and F(14,8)+F(1,8) == F(15,8) and F(14,8) == F(7,4) and F(30,16)+F(1,16) == F(31,16) and F(30,16) == F(15,8) and F(62,32)+F(1,32) == F(63,32) and F(62,32) == F(31,16) and 1/(1-F(1,2)) == 1/F(1,2) == 2 and all(t <= 2 for t in T18) and all(sum(F(1,2**(k-1)) for k in range(1,n+1)) == 2-F(1,2**(n-1)) < 2 for n in range(1,60)), 'H18 abs-idea paso 2: sin signos, geométrica con suma 2')
ok(K18 == [2,0,F(1,2),0,F(1,8),0] and 2*1 == 2 and 2*F(1,4) == F(2,4) == F(1,2) and 2*F(1,16) == F(2,16) == F(1,8) and C18 == [2,2,F(5,2),F(5,2),F(21,8),F(21,8)] and 2+0 == 2 and 2+F(1,2) == F(4,2)+F(1,2) == F(5,2) and F(5,2)+F(1,8) == F(20,8)+F(1,8) == F(21,8) and F(20,8) == F(5,2) and all(x >= 0 for x in K18) and all((x > 0 and x+abs(x) == 2*x) or (x < 0 and x+abs(x) == 0) for x in A18), 'H18 abs-idea paso 3: serie auxiliar y sus sumas parciales')
ok(all(0 <= K18[i] <= 2*abs(A18[i]) for i in range(6)) and all(C18[i] <= 2*T18[i] <= 4 for i in range(6)) and 2*F(63,32) == F(126,32) and F(21,8) == F(21*4,8*4) == F(84,32) and 21*4 == 84 and 8*4 == 32 and 84 <= 126 and 2*2 == 4, 'H18 abs-idea paso 4: Cₙ ≤ 2Tₙ ≤ 4')
ok(all(S18[i] == C18[i]-T18[i] for i in range(6)) and F(21,8)-F(63,32) == F(84,32)-F(63,32) == F(21,32) == S18[5] and 84-63 == 21 and 1/(1-(-F(1,2))) == 1/(1+F(1,2)) == 1/F(3,2) == F(2,3) and F(8,3)-2 == F(2,3) and 2*sum(F(1,4)**j for j in range(40)) < F(8,3) and abs(float(sum(F(-1,2)**(n-1) for n in range(1,80)))-2/3) < 1e-12, 'H18 abs-idea paso 5: Sₙ = Cₙ − Tₙ y suma 2/3')
TS18 = [[1,0,1,1,0,1,1,1,1],[2,1,1,2,2,1,1,1,2],[3,1,2,6,3,2,5,5,6],[4,5,6,12,10,3,7,7,12],[5,7,12,60,35,12,47,47,60],[6,47,60,60,47,10,37,37,60],[7,37,60,420,259,60,319,319,420],[8,319,420,840,638,105,533,533,840],[9,533,840,2520,1599,280,1879,1879,2520],[10,1879,2520,2520,1879,252,1627,1627,2520],[11,1627,2520,27720,17897,2520,20417,20417,27720],[12,20417,27720,27720,20417,2310,18107,18107,27720]]
TT18 = [[1,0,1,1,0,1,1,1,1],[2,1,1,2,2,1,3,3,2],[3,3,2,6,9,2,11,11,6],[4,11,6,12,22,3,25,25,12],[5,25,12,60,125,12,137,137,60],[6,137,60,60,137,10,147,49,20],[7,49,20,140,343,20,363,363,140],[8,363,140,280,726,35,761,761,280],[9,761,280,2520,6849,280,7129,7129,2520],[10,7129,2520,2520,7129,252,7381,7381,2520],[11,7381,2520,27720,81191,2520,83711,83711,27720],[12,83711,27720,27720,83711,2310,86021,86021,27720]]
ok(all(t[0] == i+1 and F(t[7],t[8]) == sum(F((-1)**(k+1),k) for k in range(1,t[0]+1)) and (F(t[7],t[8]).numerator,F(t[7],t[8]).denominator) == (t[7],t[8]) and F(t[1],t[2]) == (F(TS18[i-1][7],TS18[i-1][8]) if i else 0) and (t[1],t[2]) == ((TS18[i-1][7],TS18[i-1][8]) if i else (0,1)) and F(t[4],t[3]) == F(t[1],t[2]) and F(t[5],t[3]) == F(1,t[0]) and t[6] == t[4]+(1 if t[0] % 2 else -1)*t[5] and (t[6],t[3]) == (t[7],t[8]) for i, t in enumerate(TS18)), 'H18 abs-cond tabla con signos: Sₙ exacta, denominador común y cada suma o resta')
ok(all(t[0] == i+1 and F(t[7],t[8]) == sum(F(1,k) for k in range(1,t[0]+1)) and (F(t[7],t[8]).numerator,F(t[7],t[8]).denominator) == (t[7],t[8]) and (t[1],t[2]) == ((TT18[i-1][7],TT18[i-1][8]) if i else (0,1)) and F(t[4],t[3]) == F(t[1],t[2]) and F(t[5],t[3]) == F(1,t[0]) and t[6] == t[4]+t[5] and F(t[6],t[3]) == F(t[7],t[8]) and t[6] % t[7] == 0 and t[3] == t[8]*(t[6]//t[7]) for i, t in enumerate(TT18)) and [t[0] for t in TT18 if t[6] != t[7]] == [6] and 147 == 3*49 and 60 == 3*20, 'H18 abs-cond tabla sin signos: Tₙ exacta, denominador común, suma y simplificación')
ok([round(F(t[7],t[8])*1000) for t in TS18] == [1000,500,833,583,783,617,760,635,746,646,737,653] and [round(F(t[7],t[8])*1000) for t in TT18] == [1000,1500,1833,2083,2283,2450,2593,2718,2829,2929,3020,3103] and all(abs(F(t[7],t[8])*1000 % 1 - F(1,2)) > F(1,100) for t in TS18[1:]+TT18[1:] if F(t[7],t[8])*1000 % 1) and [t[0] for t in TS18 if 1000*t[7] % t[8] == 0] == [1,2] and [t[0] for t in TT18 if 1000*t[7] % t[8] == 0] == [1,2,6], 'H18 abs-cond decimales (3) y cuáles son exactos')
ok(all(F(1,2) <= F(t[7],t[8]) <= 1 for t in TS18) and all(F(1,2) <= sum(F((-1)**(k+1),k) for k in range(1,n+1)) <= 1 for n in range(1,200)) and F(25,12) > 2 and F(83711,27720) > 3 and [n for n in range(1,13) if F(TT18[n-1][7],TT18[n-1][8]) > 2][0] == 4 and [n for n in range(1,13) if F(TT18[n-1][7],TT18[n-1][8]) > 3][0] == 11 and all(sum(F(1,k) for k in range(1,2**m+1)) >= 1+F(m,2) for m in range(1,11)) and TS18[0][7:] == TT18[0][7:] == [1,1] and all(round((round(TT18[n-1][7]/TT18[n-1][8],3)-round(TS18[n-1][7]/TS18[n-1][8],3))*1000) == round(F(TT18[n-1][7],TT18[n-1][8])*1000)-round(F(TS18[n-1][7],TS18[n-1][8])*1000) > 0 for n in range(2,13)), 'H18 abs-cond franja 1/2…1, alturas 2 (n = 4) y 3 (n = 11), cota 1 + m/2')
G18 = ([F((-1)**(k+1),k) for k in range(1,41)], [F(-2,3)**k for k in range(1,41)], [F((-1)**(k*(k+1)//2)*(k % 5 - 2),k*k+1) for k in range(1,41)], [F(-1 if k % 3 == 0 else 1,2**k) for k in range(1,41)], [F(k-7,3) for k in range(1,41)])
ok(all((x >= 0 and abs(x) == x and x+abs(x) == 2*x == 2*abs(x) >= 0) or (x < 0 and abs(x) == -x and x+abs(x) == x+(-x) == 0 and 2*abs(x) > 0) for g in G18 for x in g) and all(0 <= x+abs(x) <= 2*abs(x) for g in G18 for x in g), 'H18 demostración: 0 ≤ aₙ + |aₙ| ≤ 2|aₙ| (rejilla)')
ok(all(sum(abs(x) for x in g[:n+1])-sum(abs(x) for x in g[:n]) == abs(g[n]) >= 0 and sum(x+abs(x) for x in g[:n+1])-sum(x+abs(x) for x in g[:n]) == g[n]+abs(g[n]) >= 0 and sum(x+abs(x) for x in g[:n]) <= sum(2*abs(x) for x in g[:n]) == 2*sum(abs(x) for x in g[:n]) and sum(g[:n]) == sum(x+abs(x) for x in g[:n])-sum(abs(x) for x in g[:n]) and all((x+abs(x))-abs(x) == x for x in g) for g in G18 for n in range(1,40)), 'H18 demostración: Tₙ y Cₙ crecen, Cₙ ≤ 2Tₙ, Sₙ = Cₙ − Tₙ (rejilla)')
ok(all(abs(F((-1)**(n+1),n)) == abs(F((-1)**(n+1)))*F(1,n) == 1*F(1,n) == F(1,n) and F(1,n+1) < F(1,n) for n in range(1,300)) and abs(sum((-1)**(k+1)/k for k in range(1,200001))-math.log(2)) < 1e-5 and sum(1/k for k in range(1,200001)) > 12, 'H18 recíproco falso: armónica alternada y armónica')
ok(all(abs(F((-1)**(n+1),n*n)) == F(1,n*n) for n in range(1,300)) and [F((-1)**(n+1),n*n) for n in (1,2,3,4)] == [1,-F(1,4),F(1,9),-F(1,16)] and 2 > 1 and sum(1/(k*k) for k in range(1,100000)) < 2, 'H18 ej1')
ok(all(abs((-1)**(n+1)/math.sqrt(n)) == 1/math.sqrt(n) and abs(math.sqrt(n)-n**0.5) < 1e-12 and math.sqrt(n) >= 1 and math.sqrt(n) < math.sqrt(n+1) and 1/math.sqrt(n+1) < 1/math.sqrt(n) for n in range(1,300)) and F(1,2) <= 1 and sum(1/math.sqrt(k) for k in range(1,10001)) > 190, 'H18 ej2')
E3 = [F(-1 if n % 3 == 0 else 1,2**n) for n in range(1,7)]
ok(E3 == [F(1,2),F(1,4),-F(1,8),F(1,16),F(1,32),-F(1,64)] and all(abs(F(-1 if n % 3 == 0 else 1,2**n)) == F(1,2**n) == F(1,2)*F(1,2**(n-1)) == F(1,2)*F(1,2)**(n-1) for n in range(1,60)) and 1-F(1,2) == F(1,2) and F(1,2)/F(1,2) == 1 and [x*64 for x in map(abs,E3)] == [32,16,8,4,2,1] and 32+16 == 48 and 48-8 == 40 and 40+4 == 44 and 44+2 == 46 and 46-1 == 45 and sum(E3) == F(45,64) and round(F(45,64)*1000) == 703 and 48+8 == 56 and 56+4 == 60 and 60+2 == 62 and 62+1 == 63 and sum(map(abs,E3)) == F(63,64) < 1 and round(F(63,64)*1000) == 984, 'H18 ej3')
ok(all(abs((-1)**(n+1)*F(n,n+1)) == F(n,n+1) and n+n == 2*n >= n+1 and F(2*n,2*(n+1)) == F(n,n+1) >= F(n+1,2*(n+1)) == F(1,2) for n in range(1,300)) and [(-1)**(n+1)*F(n,n+1) for n in (1,2,3)] == [F(1,2),-F(2,3),F(3,4)], 'H18 ej4')
ok(all(abs(F((-1)**(n+1),n**3)) == F(1,n**3) for n in range(1,300)) and 3 > 1 and sum(1/k**3 for k in range(1,100000)) < 2, 'H18 A (a)')
ok(all(abs(F((-1)**(n+1),2*n-1)) == F(1,2*n-1) and 0 < 2*n-1 < 2*n and F(1,2*n-1) > F(1,2*n) == F(1,2)*F(1,n) and 2*n-1 >= 2*1-1 == 1 > 0 and 2*(n+1)-1 == 2*n+1 and F(1,2*n+1) < F(1,2*n-1) and n+(n-1) == 2*n-1 >= n and 0 < F(1,2*n-1) <= F(1,n) for n in range(1,300)) and all(sum(F(1,2*k-1) for k in range(1,n+1)) > F(1,2)*sum(F(1,k) for k in range(1,n+1)) for n in range(1,120)) and all(F(2*M,2) == M for M in range(-20,200)) and [F(1,2*n-1) for n in (1,2,3)] == [1,F(1,3),F(1,5)], 'H18 A (b)')
ok(all(abs((-1)**(n+1)*F(2*n+1,n)) == F(2*n+1,n) == F(2*n,n)+F(1,n) == 2+F(1,n) > 2 for n in range(1,300)), 'H18 A (c)')
B18 = [(-1)**(n+1)*F(2,3)**n for n in range(1,5)]
ok(all(abs((-1)**(n+1)*F(2,3)**n) == F(2,3)**n == F(2,3)*F(2,3)**(n-1) and (-1)**(n+1) == (-1)**(n-1)*(-1)**2 == (-1)**(n-1) and (-1)**(n+1)*F(2,3)**n == F(2,3)*F(-2,3)**(n-1) for n in range(1,60)) and 1-F(2,3) == F(3,3)-F(2,3) == F(1,3) and F(2,3)/F(1,3) == F(2,3)*F(3,1) == F(6,3) == 2 and 1-(-F(2,3)) == 1+F(2,3) == F(3,3)+F(2,3) == F(5,3) and F(2,3)/F(5,3) == F(2,3)*F(3,5) == F(6,15) == F(2,5) != 2 and abs(float(sum((-1)**(n+1)*F(2,3)**n for n in range(1,120)))-0.4) < 1e-12 and abs(float(sum(F(2,3)**n for n in range(1,120)))-2) < 1e-12, 'H18 B (a) y (b)')
ok(B18 == [F(2,3),-F(4,9),F(8,27),-F(16,81)] and [F(2,3)**n for n in (1,2,3,4)] == [F(2,3),F(4,9),F(8,27),F(16,81)] and (2*27,3*27,4*9,9*9,8*3,27*3) == (54,81,36,81,24,81) and 54-36 == 18 and 18+24 == 42 and 42-16 == 26 and sum(B18) == F(26,81) and 54+36 == 90 and 90+24 == 114 and 114+16 == 130 and sum(map(abs,B18)) == F(130,81) and [x+abs(x) for x in B18] == [F(4,3),0,F(16,27),0] and F(2,3)+F(2,3) == F(4,3) and F(8,27)+F(8,27) == F(16,27) and (4*9,3*9) == (36,27) and F(36,27)+F(16,27) == F(52,27) == F(4,3)+F(16,27) and (52*3,27*3) == (156,81) and F(156,81)-F(130,81) == F(26,81) and 156-130 == 26 and 2*F(130,81) == F(260,81) and 156 <= 260 and round(F(130,81)*1000) == 1605 and F(130,81) < 2, 'H18 B (c)')
ok([60*F(-1,2)**(n-1) for n in range(1,5)] == [60,-30,15,-F(15,2)] and F(15,2) == F('7.5') and 60-30 == 30 and 30+15 == 45 and 45-F('7.5') == F('37.5') and 60+30 == 90 and 90+15 == 105 and 105+F('7.5') == F('112.5') and [F(60,n) for n in (1,2,3,4,5)] == [60,30,20,15,12] and 30+20 == 50 and 50-15 == 35 and 90+20 == 110 and 110+15 == 125 and 60-30+20-15 == 35 and 60+30+20+15 == 125, 'H18 C (a)')
ok(1-F(1,2) == F(1,2) and 60/F(1,2) == 60*2 == 120 and 1-(-F(1,2)) == 1+F(1,2) == F(3,2) and 60/F(3,2) == 60*F(2,3) == F(120,3) == 40 and all(sum(60*F(1,2)**(k-1) for k in range(1,n+1)) < 120 for n in range(1,60)) and abs(float(sum(60*F(-1,2)**(k-1) for k in range(1,80)))-40) < 1e-9, 'H18 C (b)')
ok(all(sum(F(60,k) for k in range(1,n+1)) == 60*sum(F(1,k) for k in range(1,n+1)) and sum((-1)**(k+1)*F(60,k) for k in range(1,n+1)) == 60*sum(F((-1)**(k+1),k) for k in range(1,n+1)) for n in range(1,60)) and sum(F((-1)**(k+1),k) for k in range(1,5)) == F(7,12) and sum(F((-1)**(k+1),k) for k in range(1,6)) == F(47,60) and 60*F(7,12) == F(420,12) == 35 and 60*F(47,60) == 47 and 35 <= 60*math.log(2) <= 47 and round(60*math.log(2)*100) == 4159 and 60*sum(1/k for k in range(1,100001)) > 700, 'H18 C (c) y (d)')
# H19
# H19 · Criterio del cociente: lecturas de coc-idea y coc-vivo, demostración (cotas en rejilla), L = 1 con Σ1/n y Σ1/n², ejemplos 1-4 y ejercicios A, B, C
A19 = [F(n,2**n) for n in range(1,7)]; C19 = [F(n+1,2*n) for n in range(1,6)]
ok(A19 == [F(1,2),F(1,2),F(3,8),F(1,4),F(5,32),F(3,32)] and F(2,4) == F(1,2) and F(4,16) == F(1,4) and F(6,64) == F(3,32) and [2**n for n in range(1,7)] == [2,4,8,16,32,64], 'H19 coc-idea términos a1…a6')
ok(C19 == [1,F(3,4),F(2,3),F(5,8),F(3,5)] and [A19[n]/A19[n-1] for n in range(1,6)] == C19 and F(2,2) == 1 and F(4,6) == F(2,3) and F(6,10) == F(3,5) and F(3,8)/F(1,2) == F(3,8)*2 == F(6,8) == F(3,4) and all(F(n+1,2**(n+1))*F(2**n,n) == F(n+1,2*n) and 2**(n+1) == 2*2**n for n in range(1,200)), 'H19 coc-idea cocientes (n+1)/(2n)')
ok(all(F(n+1,2*n) == F(n,2*n)+F(1,2*n) == F(1,2)+F(1,2)*F(1,n) and (F(1,2)+F(1,2*n) <= F(3,4)) == (F(1,2*n) <= F(1,4)) == (2*n >= 4) == (n >= 2) for n in range(1,300)) and F(1,2)+F(1,2)*0 == F(1,2) < F(3,4) < 1 and F(3,4)-F(2,4) == F(1,4) and abs(F(10**6+1,2*10**6)-F(1,2)) < F(1,10**6), 'H19 coc-idea L = 1/2, r = 3/4, desde n = 2')
ok(all(F(n+1,2**(n+1)) <= F(3,4)*F(n,2**n) for n in range(2,300)) and all(F(2+k,2**(2+k)) <= F(1,2)*F(3,4)**k for k in range(0,300)) and F(1,2)*F(3,4) == F(3,8) and F(3,4)**2 == F(9,16) and F(1,2)*F(9,16) == F(9,32) and F(1,4) == F(8,32) <= F(9,32) and F(3,4)**3 == F(27,64) and F(1,2)*F(27,64) == F(27,128) and F(5,32) == F(20,128) <= F(27,128) and F(3,4)**4 == F(81,256) and F(1,2)*F(81,256) == F(81,512) and F(3,32) == F(48,512) <= F(81,512) and F(3,8) <= F(3,8), 'H19 coc-idea cota geométrica y comparación término a término')
ok(all(sum(F(1,2)*F(3,4)**k for k in range(0,n-1)) == F(1,2)*(1-F(3,4)**(n-1))/(1-F(3,4)) < F(1,2)/(1-F(3,4)) and sum(F(j,2**j) for j in range(1,n+1)) <= F(1,2)+sum(F(1,2)*F(3,4)**k for k in range(0,n-1)) <= F(5,2) for n in range(2,120)) and 1-F(3,4) == F(4,4)-F(3,4) == F(1,4) and F(1,2)/F(1,4) == F(1,2)*4 == F(4,2) == 2 and F(1,2)+2 == F(1,2)+F(4,2) == F(5,2) and F(1,2) <= F(5,2), 'H19 coc-idea Sₙ ≤ 5/2')
ok(sum(A19) == F(16+16+12+8+5+3,32) == F(60,32) == F(15,8) == F('1.875') <= F('2.5') == F(5,2) and [a*32 for a in A19] == [16,16,12,8,5,3] and abs(F(1,2)*F(3,4)**(3.45-2) - 0.33) < 0.01, 'H19 coc-idea S6 = 15/8')
# coc-vivo: x = j/4, j = 0…6
ok(all(F(n+1)*x**(n+1)/(n*x**n) == x*F(n+1,n) for x in (F(j,4) for j in range(1,7)) for n in range(1,40)) and all(F(n+1,n) == F(n,n)+F(1,n) == 1+F(1,n) > 1 for n in range(1,300)) and all(n*F(0)**n == 0 for n in range(1,20)), 'H19 coc-vivo fórmula del cociente x(n+1)/n y caso x = 0')
ok([[F(j,4)*F(n+1,n) for n in (1,2,3,8)] for j in range(1,7)] == [[F(1,2),F(3,8),F(1,3),F(9,32)],[1,F(3,4),F(2,3),F(9,16)],[F(3,2),F(9,8),1,F(27,32)],[2,F(3,2),F(4,3),F(9,8)],[F(5,2),F(15,8),F(5,3),F(45,32)],[3,F(9,4),2,F(27,16)]] and [F(2*j,4) for j in range(1,7)] == [F(1,2),1,F(3,2),2,F(5,2),3] and [F(9*j,32) for j in range(1,7)] == [F(9,32),F(9,16),F(27,32),F(9,8),F(45,32),F(27,16)] and round(F(27,32)*1000) == 844 and F(3,4)*F(2,1) == F(6,4) and F(3,4)*F(3,2) == F(9,8) == F('1.125') and F(3,4)*F(4,3) == F(12,12) and F(3,4)*F(9,8) == F(27,32), 'H19 coc-vivo cocientes n = 1, 2, 3, 8 y rótulos')
ok([[n*F(j,4)**n for n in (1,2,3)] for j in range(1,7)] == [[F(1,4),F(1,8),F(3,64)],[F(1,2),F(1,2),F(3,8)],[F(3,4),F(9,8),F(81,64)],[1,2,3],[F(5,4),F(25,8),F(375,64)],[F(3,2),F(9,2),F(81,8)]] and 2*F(9,16) == F(18,16) == F(9,8) and 3*F(27,64) == F(81,64) and round(F(81,64)*1000) == 1266 and F(3,4) == F('0.75'), 'H19 coc-vivo tres primeros términos')
ok(all((F(1,4)*(n+1) < n) == (n+1 < 4*n) == (1 < 3*n) == (n >= 1) and (F(1,2)*(n+1) < n) == (n+1 < 2*n) == (1 < n) == (n >= 2) and (F(3,4)*(n+1) < n) == (3*(n+1) < 4*n) == (3 < n) == (n >= 4) for n in range(1,300)) and all(x*F(n+1,n) > x > 1 for x in (F(5,4),F(3,2)) for n in range(1,300)) and all(n*F(j,4)**n > 3 for j in (5,6) for n in range(2,9)) and all(n > 3 for n in range(4,9)) and all(n*F(j,4)**n <= 3 for j in range(0,4) for n in range(1,9)) and [n for n in range(1,9) if n <= 3] == [1,2,3], 'H19 coc-vivo desde qué n el cociente baja de 1; términos fuera de la gráfica')
# demostración: con cocientes ≤ r desde N, cota |a_{N+k}| ≤ |a_N| rᵏ y sumas parciales acotadas (rejilla de series y de r)
S19 = [(lambda n: F(n,2**n), F(3,4), 2), (lambda n: F(n,3**n), F(2,3), 1), (lambda n: F(2**n,factorial(n)), F(1,2), 3), (lambda n: F(n*n,3**n), F(2,3), 3), (lambda n: F(3**n,factorial(n)), F(3,4), 3)]
ok(all(all(f(n+1)/f(n) <= r and f(n+1) <= r*f(n) for n in range(N,60)) and all(f(N+k) <= f(N)*r**k for k in range(0,50)) and all(sum(f(N+k) for k in range(0,m+1)) <= sum(f(N)*r**k for k in range(0,m+1)) == f(N)*(1-r**(m+1))/(1-r) < f(N)/(1-r) and sum(f(j) for j in range(1,N+m+1)) <= sum(f(j) for j in range(1,N)) + f(N)/(1-r) for m in range(0,40)) for f, r, N in S19) and all(L < F(L+1,2) < 1 for L in (F(0),F(1,3),F(1,2),F(9,10),F(999,1000))), 'H19 demostración L < 1: cota geométrica y sumas parciales acotadas (rejilla)')
ok(all(F(factorial(n+1),10**(n+1)) > F(factorial(n),10**n) >= F(factorial(10),10**10) > 0 for n in range(10,80)) and all(F(2**(n+1),(n+1)**2) > F(2**n,n*n) for n in range(3,80)) and all(r**(m+1) > 0 and 1-r**(m+1) < 1 and 1-r > 0 for r in (F(1,2),F(3,4),F(2,3)) for m in range(0,40)), 'H19 demostración L > 1: los términos crecen desde N (rejilla)')
ok(all(F(1,n+1)/F(1,n) == F(1,n+1)*n == F(n,n+1) == F(n+1,n+1)-F(1,n+1) == 1-F(1,n+1) < 1 and F(1,(n+1)**2)/F(1,n*n) == F(n*n,(n+1)**2) == F(n,n+1)**2 for n in range(1,300)) and 1-0 == 1 and 1*1 == 1 and abs(F(10**6,10**6+1)-1) < F(1,10**5), 'H19 L = 1 con Σ1/n y Σ1/n²')
ok(all(F(2**(n+1),factorial(n+1))/F(2**n,factorial(n)) == F(2**(n+1),2**n)*F(factorial(n),factorial(n+1)) == 2*F(1,n+1) == F(2,n+1) and factorial(n+1) == (n+1)*factorial(n) for n in range(1,80)) and 2*0 == 0 < 1 and [F(2**n,factorial(n)) for n in (1,2,3)] == [2,2,F(4,3)] and F(4,2) == 2 and F(8,6) == F(4,3) and F(2,2) == 1 == F(2,1+1) and F(4,3)/2 == F(4,6) == F(2,3) == F(2,2+1), 'H19 ej1')
ok(all(F(factorial(n+1),10**(n+1))/F(factorial(n),10**n) == F(factorial(n+1),factorial(n))*F(10**n,10**(n+1)) == (n+1)*F(1,10) == F(n+1,10) and 10**(n+1) == 10*10**n for n in range(1,80)) and all((F(n+1,10) > M) == (n+1 > 10*M) == (n > 10*M-1) for M in range(0,30) for n in range(1,400)) and [F(factorial(n),10**n) for n in (1,2,3)] == [F('0.1'),F('0.02'),F('0.006')] and F(9+1,10) == 1 and F(factorial(10),10**10) == F(factorial(9),10**9) and all((F(n+1,10) < 1) == (n+1 < 10) and (F(n+1,10) > 1) == (n >= 10) for n in range(1,100)) and round(F(factorial(30),10**30)*100) == 26525, 'H19 ej2')
ok(all(abs(F((-1)**n*n*n,3**n)) == F(n*n,3**n) != 0 and F((n+1)**2,3**(n+1))/F(n*n,3**n) == F(3**n,3**(n+1))*F((n+1)**2,n*n) == F(1,3)*F(n+1,n)**2 == F(1,3)*(1+F(1,n))**2 and F(n+1,n) == F(n,n)+F(1,n) for n in range(1,200)) and F(1,3)*1 == F(1,3) < 1 and F(1,3) == F(1*1,3) and F(4,9) == F(2*2,3**2) and F(4,9)/F(1,3) == F(4,9)*3 == F(12,9) == F(4,3) == F(1,3)*(1+1)**2 == F(1,3)*4 > 1, 'H19 ej3')
ok(all(abs(F((-1)**(n+1),n)) == F(1,n) and F(1,n+1)*F(n,1) == F(n,n+1) == 1-F(1,n+1) for n in range(1,300)), 'H19 ej4')
ok(all(F(3**(n+1),factorial(n+1))/F(3**n,factorial(n)) == 3*F(1,n+1) == F(3,n+1) for n in range(1,80)) and 3*0 == 0 < 1 and all(F(2**(n+1),(n+1)**2)/F(2**n,n*n) == 2*F(n,n+1)**2 and F(1,(n+1)**3)/F(1,n**3) == F(n**3,(n+1)**3) == F(n,n+1)**3 for n in range(1,200)) and 2*1 == 2 > 1 and 1*1*1 == 1 and 3 > 1, 'H19 A')
ok(all(F(factorial(2*n+2),factorial(n+1)**2)/F(factorial(2*n),factorial(n)**2) == F((2*n+2)*(2*n+1),(n+1)**2) == F(2*(n+1)*(2*n+1),(n+1)**2) == F(2*(2*n+1),n+1) == F(4*n+2,n+1) == (4+F(2,n))/(1+F(1,n)) and factorial(2*n+2) == (2*n+2)*(2*n+1)*factorial(2*n) and factorial(n+1)**2 == (n+1)**2*factorial(n)**2 and 2*(n+1) == 2*n+2 for n in range(1,60)) and F(4+2*0,1+0) == 4 > 1 and F(factorial(2),factorial(1)**2) == 2 and F(factorial(4),factorial(2)**2) == F(24,4) == 6 and F(6,2) == 3 == F(4*1+2,1+1), 'H19 B (a)')
ok(all(F(n+1,3**(n+1))*F(3**n,n) == F(n+1,3*n) == F(n,3*n)+F(1,3*n) == F(1,3)+F(1,3)*F(1,n) <= F(2,3) == F(2*n,3*n) and 2*n >= n+1 and n+n == 2*n and F(n+1,3**(n+1)) <= F(2,3)*F(n,3**n) and F(n,3**n) <= F(1,3)*F(2,3)**(n-1) and sum(F(k,3**k) for k in range(1,n+1)) <= sum(F(1,3)*F(2,3)**k for k in range(0,n)) == F(1,3)*(1-F(2,3)**n)/(1-F(2,3)) < F(1,3)/(1-F(2,3)) == 1 for n in range(1,150)) and F(1,3)+F(1,3)*0 == F(1,3) < 1 and 1-F(2,3) == F(1,3) and F(1,3)/F(1,3) == 1 and F(1,3)+F(2,9)+F(3,27) == F(3,9)+F(2,9)+F(1,9) == F(6,9) == F(2,3) <= 1, 'H19 B (b)')
ok([12000*F(n,2**n) for n in (1,2,3,4)] == [6000,6000,4500,3000] and 12000*F(3,8) == F(36000,8) == 4500 and 12000*F(1,4) == 3000 and 6000+6000 == 12000 and 12000+4500 == 16500 and 16500+3000 == 19500 and all(sum(12000*F(k,2**k) for k in range(1,n+1)) == 12000*sum(F(k,2**k) for k in range(1,n+1)) <= 12000*F(5,2) == F(60000,2) == 30000 for n in range(1,150)) and F(1,2)/F(1,4) == 2 and F(1,2)+2 == F(5,2), 'H19 C')
ok([math.floor(F(p,q)*1000+F(1,2)) for p, q in ((1,3),(9,32),(3,64),(2,3),(9,16),(27,32),(81,64),(4,3),(5,3),(45,32),(375,64),(27,16))] == [333,281,47,667,563,844,1266,1333,1667,1406,5859,1688] and [F(1,4),F(1,2),F(3,8),F(3,4),F(9,8),F(3,2),F(5,4),F(15,8),F(5,2),F(25,8),F(9,4),F(9,2),F(81,8),F(1,8)] == [F(s) for s in ('0.25','0.5','0.375','0.75','1.125','1.5','1.25','1.875','2.5','3.125','2.25','4.5','10.125','0.125')], 'H19 coc-vivo decimales de la lectura (3 decimales, mitad hacia arriba)')
# H20
# H20 · Series de potencias: lectura de pot-idea y pot-vivo (17 posiciones de x), método del cociente (identidades en rejilla), ejemplos 1-4 y ejercicios A, B, C; el teorema de los tres casos se enuncia sin demostrar en la hoja y aquí solo se comprueba en las series de la hoja; e se usa numérico (valor anunciado en la hoja)
from math import gcd
XS20 = [F(k,7) for k in range(-20,21) if k] + [F(5,2), F(-9,4), F(1,10)]
ok([sum(F(0)**k for k in range(n+1)) for n in range(5)] == [1,1,1,1,1] and F(0)**0 == 1 and 0**1 == 0**2 == 0**3 == 0**4 == 0 and 1+0 == 1 and F(1,1-0) == 1, 'H20 pot-idea x = 0')
ok([F(1,2)**n for n in (1,2,3,4)] == [F(1,2),F(1,4),F(1,8),F(1,16)] and 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and F(3,2)+F(1,4) == F(6,4)+F(1,4) == F(7,4) and F(7,4)+F(1,8) == F(14,8)+F(1,8) == F(15,8) and F(15,8)+F(1,16) == F(30,16)+F(1,16) == F(31,16) and 2-F(31,16) == F(32,16)-F(31,16) == F(1,16) and 1/(1-F(1,2)) == 1/F(1,2) == 2 and [sum(F(1,2)**k for k in range(n+1)) for n in range(5)] == [1,F(3,2),F(7,4),F(15,8),F(31,16)], 'H20 pot-idea x = 1/2')
ok([F(-1,2)**n for n in (1,2,3,4)] == [-F(1,2),F(1,4),-F(1,8),F(1,16)] and 1-F(1,2) == F(2,2)-F(1,2) == F(1,2) and F(1,2)+F(1,4) == F(2,4)+F(1,4) == F(3,4) and F(3,4)-F(1,8) == F(6,8)-F(1,8) == F(5,8) and F(5,8)+F(1,16) == F(10,16)+F(1,16) == F(11,16) == F('0.6875') and abs(F(-1,2)) == F(1,2) < 1 and 1/(1-F(-1,2)) == 1/(1+F(1,2)) == 1/F(3,2) == F(2,3) and round(F(2,3)*100) == 67 and [sum(F(-1,2)**k for k in range(n+1)) for n in range(5)] == [1,F(1,2),F(3,4),F(5,8),F(11,16)], 'H20 pot-idea x = −1/2')
ok([sum(1**k for k in range(n+1)) for n in range(5)] == [1,2,3,4,5] and 1+1 == 2 and 2+1 == 3 and 3+1 == 4 and 4+1 == 5 and all(sum(1**k for k in range(n+1)) == n+1 for n in range(200)) and not abs(1) < 1, 'H20 pot-idea x = 1')
ok(all(abs(sum(x**k for k in range(400)) - 1/(1-x)) < 1e-9 for x in (0.0,0.5,-0.5,0.3,-0.8,0.9)) and F(1,1-0) == 1 and 1/(1-F(1,2)) == 2 and 1/(1+F(1,2)) == F(2,3) and all((1-x)*sum(x**k for k in range(n+1)) == 1-x**(n+1) for x in XS20 for n in range(12)) and abs(1) == abs(-1) == 1, 'H20 pot-idea suma 1/(1 − x) en |x| < 1 (identidad de la suma parcial y numérico)')
def dec20(p, q): return (200*p+q)//(2*q)
def vivo20(k):
    x = 2+F(k,2); r = (x-2)/3; g = gcd(abs(k),6) or 6; p, q = k//g, 6//g
    c = F(p,q) == r == F(k,6) and (x-2) == F(k,2) and abs(x-2) == F(abs(k),2) and F((x-2)*2,3*2) == r
    c = c and [abs(r)**n for n in range(6)] == [F(abs(p)**n,q**n) for n in range(6)] and all(abs(F(dec20(abs(p)**n,q**n),100)-abs(r)**n) <= F(1,200) for n in range(6))
    c = c and ((abs(k) < 6) == (abs(x-2) < 3) == (abs(r) < 1) == (-1 < x < 5)) and ((abs(k) == 6) == (abs(x-2) == 3) == (x in (-1,5))) and ((abs(k) > 6) == (abs(r) > 1))
    if abs(k) < 6:
        A = q-p; w = 6-k
        c = c and 1-r == F(q,q)-F(p,q) == F(A,q) and 1/(1-r) == F(q,A) == 3/(5-x) == F(6,w) and 5-x == F(w,2) and abs(sum(float(r)**n for n in range(600)) - 3/(5-float(x))) < 1e-9
    if abs(k) > 6: c = c and all(abs(r)**n >= 1 for n in range(40)) and abs(r)**5 > abs(r)**4 > abs(r) > 1
    if 0 < abs(k) < 6: c = c and all(abs(r)**(n+1) < abs(r)**n for n in range(40))
    if k == 0: c = c and [r**n for n in range(6)] == [1,0,0,0,0,0] and F(1,3**0) == 1
    if k == 6: c = c and all(sum(r**j for j in range(n+1)) == n+1 for n in range(50)) and 2+3 == 5
    if k == -6: c = c and all(r**n == (-1)**n and abs(r**n) == 1 for n in range(50)) and 2-3 == -1
    return c
ok(all(vivo20(k) for k in range(-8,9)) and [2+F(k,2) for k in (-8,8)] == [-2,6], 'H20 pot-vivo: las 17 posiciones (distancia, razón, tamaños, decimales, suma y comprobación 3/(5 − x))')
ok([F(dec20(F(7,6).numerator**n,F(7,6).denominator**n),100) for n in range(6)] == [1,F('1.17'),F('1.36'),F('1.59'),F('1.85'),F('2.16')] and [F(4,3)**n for n in range(6)] == [1,F(4,3),F(16,9),F(64,27),F(256,81),F(1024,243)] and [dec20(4**n,3**n) for n in range(6)] == [100,133,178,237,316,421] and [F(7,6)**n for n in (2,3,4,5)] == [F(49,36),F(343,216),F(2401,1296),F(16807,7776)] and F(-7,2)/3 == F(-7,6) and F('3.5')-2 == F('1.5') and 3/(5-F('3.5')) == 3/F('1.5') == 2, 'H20 pot-vivo: valores vistos en las capturas (x = −1,5; x = 6; x = 3,5)')
ok(all((c1*(x-a)**(n+1))/(c0*(x-a)**n) == (c1/c0)*(x-a) and abs((c1/c0)*(x-a)) == abs(c1/c0)*abs(x-a) for c0 in (F(1,3),F(-5,2),F(7)) for c1 in (F(2,9),F(-4),F(1,11)) for a in (0,2,F(-3,2)) for x in XS20 if x != a for n in range(5)) and all((l*d < 1) == (d < 1/l) and (l*d > 1) == (d > 1/l) and l*(1/l) == 1 for l in (F(1,3),2,F(5,4)) for d in [abs(x) for x in XS20]) and all(0*abs(x) == 0 < 1 for x in XS20) and all((M/abs(x))*abs(x) == M for x in XS20 for M in (1,10,F(7,3))), 'H20 método del cociente: |uₙ₊₁/uₙ| = |cₙ₊₁/cₙ|·|x − a| y los casos ℓ > 0, ℓ = 0, sin tope (rejilla)')
ok(all((a-a)**n == 0 for a in (0,2,F(-3,2)) for n in range(1,9)) and all(sum(c*(a-a)**n for n, c in enumerate(cs)) == cs[0] for a in (0,2,F(-3,2)) for cs in ([5,3,-2,7],[F(1,3),9,9,9,9])), 'H20 en el centro la suma es c₀')
ok(all((x**(n+1)/F(n+1))/(x**n/F(n)) == (x**(n+1)/F(n+1))*(F(n)/x**n) == x*F(n,n+1) and abs(x*F(n,n+1)) == abs(x)*F(n,n+1) and F(n,n+1) == 1/(1+F(1,n)) > 0 for x in XS20 for n in range(1,30)) and abs(F(10**6,10**6+1)-1) < F(1,10**5) and F(1,1+0) == 1 and all(F(1**n,n) == F(1,n) and F((-1)**n,n) == -F((-1)**(n+1),n) and abs(F((-1)**n,n)) == F(1,n) and F(1,n+1) < F(1,n) for n in range(1,200)) and [F((-1)**n,n) for n in (1,2,3)] == [-1,F(1,2),-F(1,3)] and sum(1/n for n in range(1,20000)) > 10 and abs(sum((-1)**n/n for n in range(1,200001)) + math.log(2)) < 1e-5 and all(abs(sum(x**n/n for n in range(1,4000)) + math.log(1-x)) < 1e-9 for x in (0.5,-0.5,-0.9,0.9)), 'H20 ej1 (cociente, extremos; numérico con −ln(1 − x))')
ok(all((x**(n+1)/F(factorial(n+1)))/(x**n/F(factorial(n))) == x/(n+1) and factorial(n+1) == (n+1)*factorial(n) and F(factorial(n),factorial(n+1)) == F(1,n+1) and abs(x/(n+1)) == abs(x)/(n+1) == abs(x)*F(1,n+1) for x in XS20 for n in range(0,25)) and all(abs(x)*0 == 0 < 1 for x in XS20) and factorial(0) == 1 and [F(1,factorial(n)) for n in range(5)] == [1,1,F(1,2),F(1,6),F(1,24)] and 1+1 == 2 and 2+F(1,2) == F(4,2)+F(1,2) == F(5,2) and F(5,2)+F(1,6) == F(15,6)+F(1,6) == F(16,6) == F(8,3) and F(8,3)+F(1,24) == F(64,24)+F(1,24) == F(65,24) and round(F(65,24)*1000) == 2708 and round(math.e*1000) == 2718 and all(abs(sum(x**n/factorial(n) for n in range(80)) - math.exp(x)) < 1e-9 for x in (1,-3,5.5,0)), 'H20 ej2 (cociente, sumas parciales en x = 1; numérico con e^x)')
ok(all((factorial(n+1)*x**(n+1))/(factorial(n)*x**n) == (n+1)*x and F(factorial(n+1),factorial(n)) == n+1 and abs((n+1)*x) == (n+1)*abs(x) for x in XS20 for n in range(0,25)) and all(((n+1) > M/abs(x)) == ((n+1)*abs(x) > M) for x in XS20 for M in (1,50,F(999,7)) for n in range(0,400,7)) and factorial(0) == 1 and 10*F('0.1') == 1 and 20*F('0.1') == 2 and 100*F('0.1') == 10 and all((n+1)*F(1,10) > 1 for n in range(10,300)) and all(factorial(n+1)*F(1,10)**(n+1) > factorial(n)*F(1,10)**n for n in range(10,60)) and (9+1, 19+1, 99+1) == (10, 20, 100), 'H20 ej3')
ok(all(((x-2)**(n+1)/F(3**(n+1)))/((x-2)**n/F(3**n)) == ((x-2)**(n+1)/F(3**(n+1)))*(F(3**n)/(x-2)**n) == (x-2)/3 and F(3**n,3**(n+1)) == F(1,3) and abs((x-2)/3) == abs(x-2)/3 and ((abs(x-2)/3 < 1) == (abs(x-2) < 3) == (-3 < x-2 < 3) == (-1 < x < 5)) and ((abs(x-2)/3 > 1) == (abs(x-2) > 3)) and (x-2)**n/F(3**n) == ((x-2)/3)**n and 1-(x-2)/3 == F(3,3)-(x-2)/3 == (3-(x-2))/3 == (5-x)/3 and 3-x+2 == 5-x for x in XS20 + [F(9,2),F(-1),F(5),F(6),F(-3,2)] if x != 2 for n in range(8)) and all(1/((5-x)/3) == 3/(5-x) for x in XS20) and -3+2 == -1 and 3+2 == 5 and 2-3 == -1 and F(1,3**0) == 1 and all(F((5-2)**n,3**n) == 1 and F((-1-2)**n,3**n) == F((-3)**n,3**n) == F(-3,3)**n == (-1)**n and abs((-1)**n) == 1 for n in range(40)) and 3/(5-F('3.5')) == 3/F('1.5') == 2, 'H20 ej4')
ok(all((x**(n+1)/F((n+1)**2))/(x**n/F(n*n)) == x*F(n*n,(n+1)**2) and abs(x*F(n*n,(n+1)**2)) == abs(x)*F(n,n+1)**2 and F(n*n,(n+1)**2) == F(n,n+1)**2 for x in XS20 for n in range(1,30)) and 1*1 == 1 and all(abs(F((-1)**n,n*n)) == F(1,n*n) for n in range(1,200)) and sum(F(1,n*n) for n in range(1,300)) < 2 and 2 > 1, 'H20 A (a)')
ok(all((2**(n+1)*x**(n+1))/(2**n*x**n) == 2*x and abs(2*x) == 2*abs(x) and ((2*abs(x) < 1) == (abs(x) < F(1,2))) and ((2*abs(x) > 1) == (abs(x) > F(1,2))) for x in XS20 + [F(1,2),F(-1,2),F(1,3)] for n in range(8)) and all(2**n*F(1,2)**n == (2*F(1,2))**n == 1**n == 1 and 2**n*F(-1,2)**n == (2*F(-1,2))**n == (-1)**n and 2**(n+1) == 2*2**n for n in range(40)), 'H20 A (b)')
ok(all((factorial(n+2)*x**(n+1))/(factorial(n+1)*x**n) == (n+2)*x and factorial(n+2) == (n+2)*factorial(n+1) and abs((n+2)*x) == (n+2)*abs(x) for x in XS20 for n in range(0,25)) and all(((n+2) > M/abs(x)) == ((n+2)*abs(x) > M) for x in XS20 for M in (1,50,F(999,7)) for n in range(0,400,7)) and factorial(0+1) == factorial(1) == 1, 'H20 A (c)')
ok(all(((x-1)**(n+1)/F((n+1)*2**(n+1)))/((x-1)**n/F(n*2**n)) == ((x-1)/2)*F(n,n+1) and abs(((x-1)/2)*F(n,n+1)) == (abs(x-1)/2)*F(n,n+1) and F(2**n,2**(n+1)) == F(1,2) and ((abs(x-1)/2 < 1) == (abs(x-1) < 2) == (-2 < x-1 < 2) == (-1 < x < 3)) and ((abs(x-1)/2 > 1) == (abs(x-1) > 2)) for x in XS20 + [F(0),F(5,2),F(4),F(-1),F(3)] if x != 1 for n in range(1,12)) and 1-2 == -1 and 1+2 == 3 and -2+1 == -1 and 2+1 == 3 and all(F((3-1)**n,n*2**n) == F(2**n,n*2**n) == F(1,n) and F((-1-1)**n,n*2**n) == F((-2)**n,n*2**n) == F((-1)**n*2**n,n*2**n) == F((-1)**n,n) for n in range(1,60)), 'H20 B (a)')
ok(abs(0-1) == abs(-1) == 1 < 2 and abs(F('2.5')-1) == F('1.5') < 2 and abs(4-1) == 3 > 2 and all(abs(sum(((x-1)/2)**n/n for n in range(1,3000)) + math.log(1-(x-1)/2)) < 1e-9 for x in (0,2.5,-0.9,2.9)), 'H20 B (b) (numérico con −ln(1 − (x − 1)/2))')
ok(all((100*x**(n+1))/(100*x**n) == x for x in XS20 for n in range(8)) and all(100*1**n == 100 and abs(100*(-1)**n) == 100 for n in range(40)) and 100*F('0.6') == 60 and 60*F('0.6') == 36 and 100+60 == 160 and 160+36 == 196 and sum(100*F('0.6')**n for n in range(3)) == 196 and 1-F('0.6') == F('0.4') and 100/F('0.4') == F(1000,4) == 250 and abs(sum(100*0.6**n for n in range(400)) - 250) < 1e-9, 'H20 C (a) y (b)')
ok(all((F(100)/(1-x) == 500) == (100 == 500*(1-x)) == (1-x == F(100,500)) == (x == F('0.8')) for x in [F(k,20) for k in range(0,20)]) and F(100,500) == F(1,5) == F('0.2') and 1-F('0.2') == F('0.8') and F('0.8') == F(80,100) and 100/(1-F('0.8')) == 100/F('0.2') == F(1000,2) == 500 and all(sum(100*1**n for n in range(N+1)) == 100*(N+1) for N in range(100)) and all(F(100)/(1-x) > 0 and 1-x > 0 for x in [F(k,20) for k in range(0,20)]), 'H20 C (c) y (d)')
# H21
# H21 · determinar la razón r de una progresión geométrica
A21 = [2, 6, 18, 54]
ok(F(6,2) == F(18,6) == F(54,18) == 3 and 2*3 == 6 and 6*3 == 18 and 18*3 == 54, 'H21 raz-idea registro R2–R5 y lectura')
ok([A21[i+1]-A21[i] for i in range(3)] == [4,12,36] and len({4,12,36}) == 3, 'H21 raz-idea restas distintas (no aritmética)')
ok(all(A21[i+1] == 3*A21[i] for i in range(3)) and all(F(A21[i+1],A21[i]) == 3 for i in range(3)), 'H21 raz-idea bloques: la columna anterior cabe 3 veces')
def ter21(r, a1=F(4), n=6):
    a = [a1]
    for _ in range(n-1): a.append(a[-1]*r)
    return a
RS21 = [F(j-6,4) for j in range(13)]
ok(RS21[0] == F(-3,2) and RS21[12] == F(3,2) and RS21[6] == 0 and all(RS21[j+1]-RS21[j] == F(1,4) for j in range(12)) and [F('1.5')-F(min(12,int(p*13)),4) for p in (0,F(1,10),F(1,2),1)] == [F(3,2),F(5,4),0,F(-3,2)], 'H21 raz-vivo posiciones del deslizador')
S6_21 = {F(3,2):F(243,8), F(5,4):F(3125,256), F(1):F(4), F(3,4):F(243,256), F(1,2):F(1,8), F(1,4):F(1,256)}
for r21 in RS21:
    a21 = ter21(r21)
    if r21 == 0:
        ok(a21 == [4,0,0,0,0,0] and 4*0 == 0 and 0*0 == 0, 'H21 raz-vivo r = 0: 4, 0, 0, 0, 0, 0 (sin cocientes)')
        continue
    ok(all(a21[n+1] == F(a21[n].numerator*r21.numerator, a21[n].denominator*r21.denominator) for n in range(5)), f'H21 raz-vivo r={r21} cada producto')
    ok(all(a21[n] == 4*r21**n for n in range(6)) and all(x != 0 for x in a21), f'H21 raz-vivo r={r21} términos')
    ok(all(a21[n+1]/a21[n] == a21[n+1]*(1/a21[n]) == r21 for n in range(5)), f'H21 raz-vivo r={r21} cocientes entre vecinos = r')
    ok(a21[5] == (1 if r21 > 0 else -1)*S6_21[abs(r21)] and max(abs(x) for x in a21) <= F(243,8) < 33, f'H21 raz-vivo r={r21} rótulo de a6 y todo cabe en ±33')
    ok(all(a21[n+1]-a21[n] == a21[n]*(r21-1) for n in range(5)), f'H21 raz-vivo r={r21} resta = a_n(r − 1)')
    if r21 > 1: ok(all(a21[n+1] > a21[n] > 0 for n in range(5)), f'H21 raz-vivo r={r21} crece')
    elif r21 == 1: ok(a21 == [4]*6, 'H21 raz-vivo r=1 constante')
    elif r21 > 0: ok(all(0 < a21[n+1] < a21[n] for n in range(5)), f'H21 raz-vivo r={r21} decrece y sigue positivo')
    else:
        ok(all((a21[n] > 0) == (n % 2 == 0) for n in range(6)) and all(abs(a21[n+1]) == abs(a21[n])*(-r21) for n in range(5)), f'H21 raz-vivo r={r21} alterna; tamaños por |r|')
        ok((r21 > -1 and all(abs(a21[n+1]) < abs(a21[n]) for n in range(5))) or (r21 == -1 and all(abs(x) == 4 for x in a21)) or (r21 < -1 and all(abs(a21[n+1]) > abs(a21[n]) for n in range(5))), f'H21 raz-vivo r={r21} tamaños')
ok(F(243,8) == F('30.375') and F(1,8) == F('0.125') and F(-243,8) == F('-30.375') and abs(3125/256 - 12.21) < 0.005 and abs(243/256 - 0.9492) < 0.00005 and abs(1/256 - 0.0039) < 0.00005 and all((10000*x.numerator % x.denominator == 0) == (x in (F(243,8), F(1,8))) for x in S6_21.values() if x.denominator != 1), 'H21 raz-vivo decimales de a6')
ok(F(5,4) == F('1.25') and F(3,4) == F('0.75') and F(1,2) == F('0.5') and F(1,4) == F('0.25') and F(3,2) == F('1.5'), 'H21 raz-vivo r en decimal')
ok(ter21(F(5,4)) == [4,5,F(25,4),F(125,16),F(625,64),F(3125,256)] and F(20,4) == 5 and F(25,4)/5 == F(25,4)*F(1,5) == F(25,20) == F(5,4) and F(5)/4 == 5*F(1,4), 'H21 raz-vivo lectura con r = 5/4')
ok(ter21(F(-3,2)) == [4,-6,9,F(-27,2),F(81,4),F(-243,8)] and F(-12,2) == -6 and F(18,2) == 9 and F(-6)/4 == -6*F(1,4) == F(-6,4) == F(-3,2) and F(9)/(-6) == 9*F(-1,6) == F(-9,6) == F(-3,2), 'H21 raz-vivo lectura con r = −3/2')
ok(ter21(F(1,4)) == [4,1,F(1,4),F(1,16),F(1,64),F(1,256)] and ter21(F(-1)) == [4,-4,4,-4,4,-4] and F(-4)/4 == F(-4,4) == -1 and F(4)/(-4) == 4*F(-1,4) == -1, 'H21 raz-vivo lectura con r = 1/4 y r = −1')
# ejemplos
ok(F(6,2) == F(18,6) == F(54,18) == 3 and (6-2, 18-6, 54-18) == (4,12,36), 'H21 e1')
ok(F(-12,24) == F(6,-12) == F(-3,6) == F(-1,2) and 12//12 == 1 and 24//12 == 2 and 6//6 == 1 and 12//6 == 2 and 3//3 == 1 and 6//3 == 2 and 24*F(-1,2) == F(-24,2) == -12 and -12*F(-1,2) == F(12,2) == 6 and 6*F(-1,2) == F(-6,2) == -3 and -1 < F(-1,2) < 0 and 24 > 12 > 6 > 3, 'H21 e2')
ok(1/F(2,3) == 1*F(3,2) == F(3,2) and F(3,2)/1 == F(3,2) and F(9,4)/F(3,2) == F(9,4)*F(2,3) == F(18,12) == F(3,2) and 18//6 == 3 and 12//6 == 2, 'H21 e3 (a)')
ok(F(6,3) == 2 and F(12,6) == 2 and F(21,12) == F(7,4) and 21//3 == 7 and 12//3 == 4 and F(7,4) != 2 and 2 == F(8,4) and 6-3 == 3 and 12-6 == 6, 'H21 e3 (b)')
ok(5-2 == 3 and F(48,6) == 8 and 2*2 == 4 and 4*2 == 8 and 2**3 == 8 and F(6,2) == 3 and ter21(F(2),F(3),5) == [3,6,12,24,48], 'H21 e4 (a)')
ok(5-3 == 2 and F(20,5) == 4 and 2*2 == 4 and (-2)*(-2) == 4 and 5*2 == 10 and 10*2 == 20 and 5*(-2) == -10 and -10*(-2) == 20, 'H21 e4 (b)')
ok(F(2,6) == F(1,3), 'H21 errores frecuentes')
# ejercicios
ok(F(15,5) == F(45,15) == F(135,45) == 3 and 45*3 == 135, 'H21 A (a)')
ok(F(54,81) == F(36,54) == F(24,36) == F(2,3) and (54//27, 81//27) == (2,3) and (36//18, 54//18) == (2,3) and (24//12, 36//12) == (2,3) and 54 % 27 == 81 % 27 == 36 % 18 == 54 % 18 == 24 % 12 == 36 % 12 == 0, 'H21 A (b)')
ok(F(4,2) == 2 and F(6,4) == F(3,2) != 2 and 2 == F(4,2) and 4-2 == 6-4 == 8-6 == 2, 'H21 A (c)')
ok(6-3 == 3 and F(-96,12) == -8 and (-2)*(-2) == 4 and 4*(-2) == -8 and 3-1 == 2 and F(12,4) == 3 and ter21(F(-2),F(3),6) == [3,-6,12,-24,48,-96], 'H21 B (a)')
ok(6-2 == 4 and F(48,3) == 16 and 2*2 == 4 and 4*2 == 8 and 8*2 == 16 and 4*(-2) == -8 and -8*(-2) == 16 and ter21(F(2),F(3,2),6) == [F(3,2),3,6,12,24,48] and F(3,-2) == F(-3,2) and ter21(F(-2),F(-3,2),6) == [F(-3,2),3,-6,12,-24,48], 'H21 B (b)')
ok(3-1 == 2 and F(-36,4) == -9 and all(x*x >= 0 for x in [F(a,b) for a in range(-12,13) for b in range(1,7)]), 'H21 B (c)')
ok(F(90,120) == F(3,4) and (90//30, 120//30) == (3,4) and F('67.5')/90 == F(675,900) == F(3,4) and (675//225, 900//225) == (3,4) and 675 % 225 == 900 % 225 == 0 and F(3,4) == F('0.75'), 'H21 C (a)')
ok(F('67.5')*3 == F('202.5') and F('202.5')/4 == F('50.625') and F('67.5')*F(3,4) == F('50.625') and abs(F('50.625')-F('50.6')) < F(5,100), 'H21 C (b)')
ok(120/F(3,4) == 120*F(4,3) == F(480,3) == 160 and 160*F(3,4) == F(480,4) == 120, 'H21 C (c)')
# identidades generales, en rejilla de fracciones
G21 = [F(a,b) for a in range(-6,7) for b in range(1,5) if a != 0]
ok(all(ter21(r,a1,8)[k+j] == ter21(r,a1,8)[k]*r**j for a1 in (F(4),F(-3),F(2,3)) for r in G21 for k in range(8) for j in range(8-k)), 'H21 a(k+j) = a(k)·r^j')
ok(all(ter21(r,a1,8)[m]/ter21(r,a1,8)[k] == r**(m-k) for a1 in (F(4),F(-3),F(2,3)) for r in G21 for k in range(8) for m in range(k+1,8)), 'H21 r^(m−k) = a_m/a_k')
ok(all(x != 0 for a1 in (F(4),F(-3),F(2,3)) for r in G21 for x in ter21(r,a1,8)) and all(a*r - a == a*(r-1) for a in G21 for r in G21), 'H21 ningún término es 0; resta = a(r − 1)')
ok(all((a/r)*r == a for a in G21 for r in G21) and all(abs(a*r) == abs(a)*abs(r) for a in G21 for r in G21), 'H21 retroceder; |a·r| = |a|·|r|')
ok(all((r**p > 0) for r in G21 for p in (2,4,6)) and all(r**(2*q) == (r**q)**2 for r in G21 for q in (1,2,3)), 'H21 potencia par no negativa')
ok(all(len({x for x in G21 if x**p == c}) == 1 for p in (1,3,5) for c in {r**p for r in G21}) and all({x for x in G21 if x**p == c} == {r,-r} for p in (2,4) for r in G21 for c in [r**p]) and all((r**p > 0) == (r > 0) for r in G21 for p in (1,3,5)), 'H21 cuántas razones (en la rejilla): impar una, par dos opuestas')
ok(all((r > 1 and a*(r-1) > 0) or (r == 1 and a*r == a) or (0 < r < 1 and a*(r-1) < 0 and a*r > 0) or (r < 0 and a*r < 0) for a in G21 if a > 0 for r in G21) and all((r > 1 and a*(r-1) < 0) or (0 < r < 1 and a*(r-1) > 0) or r == 1 or r < 0 for a in G21 if a < 0 for r in G21), 'H21 comportamiento según r')
# H22
# H22 · Término enésimo de una sucesión geométrica
def geo22(a1, r, n):
    a = F(a1)
    for _ in range(n-1): a = a*r
    return a
RS22 = [F(p,q) for p in range(-5,6) for q in (1,2,3,4) if p != 0]
AS22 = [F(p,q) for p in (-7,-3,-1,1,2,5,64,256) for q in (1,3)]
ok(all(geo22(a,r,n) == a*r**(n-1) for a in AS22 for r in RS22 for n in range(1,13)), 'H22 término enésimo: n − 1 multiplicaciones por r dan a₁·rⁿ⁻¹ (rejilla)')
ok(all(a*r**(1-1) == a and r**0 == 1 and r**(m+1) == r**m*r and r**(-(m+1)) == 1/r**(m+1) for a in AS22 for r in RS22 for m in range(0,9)), 'H22 k1: r⁰ = 1, r^(m+1) = r^m·r, exponente negativo; n = 1 da a₁')
ok(all(a*r**(n-1)*r == a*r**n == a*r**((n+1)-1) for a in AS22 for r in RS22 for n in range(1,11)), 'H22 k2: paso inductivo')
ok(all(a*r == geo22(a,r,2) and a*r*r == a*r**2 == geo22(a,r,3) and a*r**2*r == a*r**3 == geo22(a,r,4) for a in AS22 for r in RS22), 'H22 k2: primeros casos')
ok(all(geo22(a,r,k) != 0 and geo22(a,r,n)/geo22(a,r,k) == r**(n-1)/r**(k-1) == r**((n-1)-(k-1)) == r**(n-k) and (n-1)-(k-1) == n-1-k+1 == n-k and geo22(a,r,n) == geo22(a,r,k)*r**(n-k) for a in AS22 for r in RS22 for n in range(1,10) for k in range(1,n+1)), 'H22 k3: aₙ = a_k·rⁿ⁻ᵏ con n ≥ k (rejilla)')
ok(all(geo22(a,r,k) == geo22(a,r,n)*r**(k-n) and geo22(a,r,n) == geo22(a,r,k)/r**(k-n) == geo22(a,r,k)*(1/r**(k-n)) == geo22(a,r,k)*r**(n-k) and F(1)/r**(k-n) == r**(-(k-n)) for a in AS22 for r in RS22 for k in range(2,10) for n in range(1,k)), 'H22 k3: aₙ = a_k·rⁿ⁻ᵏ con n < k (rejilla)')
# escena eng-idea: 3, 6, 12, 24 con r = 2
ok([geo22(3,2,n) for n in (1,2,3,4)] == [3,6,12,24] and F(6,3) == F(12,6) == F(24,12) == 2, 'H22 eng-idea: datos y razón')
ok(3*2 == 6 and 6*2 == 12 and 3*2*2 == 3*2**2 and 2**2 == 2*2 == 4 and 3*4 == 12 and 12*2 == 24 and 3*2**2*2 == 3*2**3 == 3*2*2*2 and 2**3 == 4*2 == 8 and 3*8 == 24, 'H22 eng-idea: registro y lectura, pasos 2 a 4')
ok([n-1 for n in (2,3,4)] == [1,2,3] and 4-1 == 3 and all(3*2**(n-1) == geo22(3,2,n) for n in range(1,12)) and [A*2 for A in (3,6,12)] == [6,12,24], 'H22 eng-idea: paso 5 y barras (cada una, el doble de la anterior)')
# escena eng-vivo: a₁ = 64, r = 1/2, n = 1…8 (todas las posiciones del deslizador)
V22 = [64,32,16,8,4,2,1,F(1,2)]
ok([geo22(64,F(1,2),n) for n in range(1,9)] == V22 and [64*F(1,2)**(n-1) for n in range(1,9)] == V22 and F(1,2) == F('0.5'), 'H22 eng-vivo: los ocho términos')
ok(all(F(1,2)**k == F(1,2**k) and 2**k == math.prod([2]*k) and 64*F(1,2**k) == F(64,2**k) == V22[k] and (k > 6 or (64 % 2**k == 0 and 64//2**k == V22[k])) for k in range(0,8)), 'H22 eng-vivo: potencia, denominador y producto para cada n')
ok(F(1,2)**0 == 1 and 64*1 == 64 and F(1,2)**1 == F(1,2) and F(64,2) == 32 and [2**k for k in range(2,8)] == [4,8,16,32,64,128] and [64//2**k for k in range(2,7)] == [16,8,4,2,1] and 128//64 == 2 and F(64,128) == F(1,2) and all(V22[i+1] == V22[i]*F(1,2) == V22[i]/2 for i in range(7)), 'H22 eng-vivo: casos n = 1, n = 2, n = 8 y casillas (cada una, la mitad)')
# ejemplos
ok(10-1 == 9 and [2**k for k in range(1,10)] == [2,4,8,16,32,64,128,256,512] and 3*512 == 1536 == geo22(3,2,10), 'H22 e1')
ok(F(15,5) == F(45,15) == 3 and 3645 % 5 == 0 and 3645//5 == 729 and [3**k for k in range(1,7)] == [3,9,27,81,243,729] and [k for k in range(0,40) if 3**k == 729] == [6] and all(3**(k+1) == 3*3**k > 3**k for k in range(40)) and 6+1 == 7 and 7-1 == 6 and 5*729 == 3645 == geo22(5,3,7), 'H22 e2')
ok(6-1 == 5 and [(-2)**k for k in range(1,6)] == [-2,4,-8,16,-32] and F(-96,-32) == 3 and [geo22(3,-2,n) for n in range(1,7)] == [3,-6,12,-24,48,-96] and 3*(-2) == -6 and -6*(-2) == 12 and 12*(-2) == -24 and -24*(-2) == 48 and 48*(-2) == -96, 'H22 e3')
ok(5-3 == 2 and 108 % 12 == 0 and 108//12 == 9 and all((r*r-9 == (r-3)*(r+3)) and ((r*r == 9) == (r in (3,-3))) for r in [F(p,q) for p in range(-40,41) for q in (1,2,3,5)]) and 3*3 == 9 and (-3)*(-3) == 9 and 3-1 == 2 and F(12,9) == F(4,3), 'H22 e4: r² = 9 y a₁')
ok(all(F(4,3)*r**2 == 12 and r**2 == 9 and r**4 == 81 and F(4,3)*9 == 12 and F(4,3)*81 == 108 and geo22(F(4,3),r,3) == 12 and geo22(F(4,3),r,5) == 108 for r in (3,-3)) and [geo22(F(4,3),3,n) for n in range(1,6)] == [F(4,3),4,12,36,108] and [geo22(F(4,3),-3,n) for n in range(1,6)] == [F(4,3),-4,12,-36,108], 'H22 e4: las dos progresiones')
ok(F(-108,12) == -9 and all(r*r >= 0 for r in RS22), 'H22 e4: cuadrado negativo, sin razón real')
ok(3*2**10 == 3*1024 == 3072 == geo22(3,2,11) and 3*2 == 6 and 6**9 != 3*2**9 and (-2)**5 == -32 and (-2)**4 == 16, 'H22 errores frecuentes')
# ejercicios
ok(F(6,2) == F(18,6) == 3 and 8-1 == 7 and [3**k for k in range(1,8)] == [3,9,27,81,243,729,2187] and 2*2187 == 4374 == geo22(2,3,8), 'H22 A (a)')
ok(F(54,81) == F(36,54) == F(2,3) and 54//27 == 2 and 81//27 == 3 and 36//18 == 2 and 54//18 == 3 and 6-1 == 5 and 2**5 == 32 and 3**5 == 243 and F(2,3)**5 == F(32,243) and 243 == 81*3 and 81*F(32,243) == F(81*32,243) == F(32,3) and [geo22(81,F(2,3),n) for n in range(1,7)] == [81,54,36,24,16,F(32,3)], 'H22 A (b)')
ok(5-2 == 3 and 162 % 6 == 0 and 162//6 == 27 and 3*3 == 9 and 9*3 == 27 and [r for r in [F(p,q) for p in range(-60,61) for q in (1,2,3,4,5)] if r**3 == 27] == [3]*5 and 6//3 == 2 and 2*3**1 == 6 and 3**4 == 81 and 2*81 == 162 and geo22(2,3,2) == 6 and geo22(2,3,5) == 162, 'H22 B (a) (unicidad de r³ = 27 solo en rejilla de fracciones)')
ok(1000//2 == 500 and 1000 % 2 == 0 and [3**k for k in range(0,7)] == [1,3,9,27,81,243,729] and 243 < 500 < 729 and all(3**k != 500 for k in range(0,60)) and all(geo22(2,3,n) != 1000 for n in range(1,60)) and 2*243 == 486 == geo22(2,3,6) and 2*729 == 1458 == geo22(2,3,7) and 486 < 1000 < 1458, 'H22 B (b)')
ok(5-1 == 4 and 3**4 == 81 and 4**4 == 256 and F(3,4)**4 == F(81,256) and 256*F(81,256) == F(256*81,256) == 81 == geo22(256,F(3,4),5), 'H22 C (a)')
ok(256//4 == 64 and 64*3 == 192 and 192//4 == 48 and 48*3 == 144 and 144//4 == 36 and 36*3 == 108 and 108//4 == 27 and 27*3 == 81 and [geo22(256,F(3,4),n) for n in range(1,6)] == [256,192,144,108,81] and min(192,144,108) > 100 > 81 and all(geo22(256,F(3,4),n+1) < geo22(256,F(3,4),n) for n in range(1,40)) and all(geo22(256,F(3,4),n) < 100 for n in range(5,40)), 'H22 C (b)')
# H23
# H23 · Identificar una serie geométrica infinita
G23 = [F(p,q) for p in range(-6,7) for q in range(1,6) if p != 0]
ok(all(a*r**n/(a*r**(n-1)) == r and r**n == r**(n-1)*r and a*r**(n-1) != 0 for a in G23 for r in G23 for n in range(1,9)) and all(a*r**0 == a*1 == a for a in G23 for r in G23), 'H23 teorema, primera parte (G ⇒ C) en rejilla de fracciones')
def rec23(a, r, N):
    t = [a]
    for _ in range(N-1): t.append(r*t[-1])
    return t
ok(all(rec23(a,r,9)[n-1] == a*r**(n-1) and r*(a*r**(n-1)) == a*r**n == a*r**((n+1)-1) for a in G23[::3] for r in G23 for n in range(1,10)) and all(0*a == 0 for a in G23), 'H23 teorema, segunda parte (C ⇒ G, inducción) en rejilla de fracciones')
ok(all(c*q**(n+1)/(c*q**n) == q and (c*q**m)*q**(n-1) == c*q**(m+n-1) for c in G23[::4] for q in G23[::3] for m in range(0,5) for n in range(1,7)) and all([(c*q**m)*q**(n-1) for n in (1,2,3)] == [c*q**m, c*q**(m+1), c*q**(m+2)] for c in G23[::5] for q in G23[::5] for m in range(0,4)), 'H23 otro índice: Σ_{n=m} c·qⁿ = Σ_{n=1} (c·qᵐ)·qⁿ⁻¹')
ok([2**(n-1) for n in (1,2,3,4)] == [1,2,4,8] and [F(n*n-n+2,2) for n in (1,2,3,4)] == [1,2,4,7], 'H23 k2: 1 + 2 + 4 sigue con 8 o con 7')
# escena idg-idea
t23 = [F(18,3**n) for n in range(1,5)]
ok(t23 == [6,2,F(2,3),F(2,9)] and F(18,3) == 6 and F(18,9) == 2 and F(18,27) == F(2,3) and 18 == 9*2 and 27 == 9*3 and F(18,81) == F(2,9) and 81 == 9*9 and 3**3 == 27 and 3**4 == 81, 'H23 idg-idea paso 1 (términos)')
ok(F(2,6) == F(1,3) and F(2,3)/2 == F(2,3)*F(1,2) == F(2,6) == F(1,3) and F(2,9)/F(2,3) == F(2,9)*F(3,2) == F(6,18) == F(1,3) and all(t23[i+1]/t23[i] == F(1,3) and t23[i]/3 == t23[i+1] for i in range(3)), 'H23 idg-idea paso 2 (tres cocientes y tercios de barra)')
ok(all(F(18,3**(n+1))*F(3**n,18) == F(18*3**n,18*3**(n+1)) == F(3**n,3**(n+1)) == F(1,3) and 3**(n+1) == 3**n*3 for n in range(1,40)), 'H23 idg-idea paso 3 (cociente general)')
ok(all(F(18,3**n) == 6*F(1,3)**(n-1) for n in range(1,40)) and [6*F(1,3)**k for k in range(4)] == t23 and F(1,3)**3 == F(1,27) and 6*F(1,27) == F(6,27) == F(2,9) == t23[3] and abs(F(1,3)) < 1 and t23[0] == 6 != 18, 'H23 idg-idea pasos 4 y 5 (a = 6, r = 1/3, forma y comprobación)')
# escena idg-vivo: las siete posiciones del deslizador
S23 = [lambda n: F(5,2**n), lambda n: F(1,n), lambda n: F((-1)**n*2,3**n), lambda n: F(n,2**n), lambda n: F(3**n,2**(n+1)), lambda n: F(2*n+1), lambda n: F(2)]
T23 = [[f(n) for n in range(1,6)] for f in S23]; C23 = [[t[i+1]/t[i] for i in range(4)] for t in T23]
ok(T23 == [[F(5,2),F(5,4),F(5,8),F(5,16),F(5,32)], [1,F(1,2),F(1,3),F(1,4),F(1,5)], [F(-2,3),F(2,9),F(-2,27),F(2,81),F(-2,243)], [F(1,2),F(1,2),F(3,8),F(1,4),F(5,32)], [F(3,4),F(9,8),F(27,16),F(81,32),F(243,64)], [3,5,7,9,11], [2,2,2,2,2]], 'H23 idg-vivo: cinco términos de cada serie')
ok(C23 == [[F(1,2)]*4, [F(1,2),F(2,3),F(3,4),F(4,5)], [F(-1,3)]*4, [1,F(3,4),F(2,3),F(5,8)], [F(3,2)]*4, [F(5,3),F(7,5),F(9,7),F(11,9)], [1]*4] and all(-1 < c < 2 for l in C23 for c in l), 'H23 idg-vivo: cuatro cocientes de cada serie (y caben en el eje de −1 a 2)')
ok([len(set(c)) == 1 for c in C23] == [True,False,True,False,True,False,True], 'H23 idg-vivo: geométricas las series 1, 3, 5 y 7')
ok(F(5,4)*F(2,5) == F(10,20) == F(1,2) and F(5,8)*F(4,5) == F(20,40) == F(1,2) and all(F(5,2**(n+1))*F(2**n,5) == F(5*2**n,5*2**(n+1)) == F(1,2) and F(5,2**n) == F(5,2)*F(1,2)**(n-1) for n in range(1,40)) and F(1,2)**2 == F(1,4) and F(5,2)*F(1,4) == F(5,8) == T23[0][2], 'H23 idg-vivo serie 1')
ok(F(1,2)/1 == F(1,2) and F(1,3)*F(2,1) == F(2,3) and all(F(1,n+1)*F(n,1) == F(n,n+1) == S23[1](n+1)/S23[1](n) for n in range(1,60)) and F(1,1+1) == F(1,2) and F(2,2+1) == F(2,3) and 1*3 == 3 and 2*2 == 4 and 3 != 4, 'H23 idg-vivo serie 2')
ok(F(-2,3) == -F(2,3) and F((-1)**2*2,3**2) == F(2,9) and F((-1)**3*2,3**3) == -F(2,27) and F(2,9)*(-F(3,2)) == -F(6,18) == -F(1,3) and -F(2,27)*F(9,2) == -F(18,54) == -F(1,3) and 1/F(-2,3) == -F(3,2) and all(F((-1)**(n+1)*2*3**n,(-1)**n*2*3**(n+1)) == F(-1,3) == S23[2](n+1)/S23[2](n) and (-1)**(n+1) == (-1)**n*(-1) and S23[2](n) == F(-2,3)*F(-1,3)**(n-1) for n in range(1,40)) and F(-1,3)**2 == F(1,9) and -F(2,3)*F(1,9) == -F(2,27) == T23[2][2], 'H23 idg-vivo serie 3')
ok(F(2,4) == F(1,2) and F(1,2)*F(2,1) == F(2,2) == 1 and F(3,8)*F(2,1) == F(6,8) == F(3,4) and all(F(n+1,2**(n+1))*F(2**n,n) == F((n+1)*2**n,n*2**(n+1)) == F(n+1,2*n) == S23[3](n+1)/S23[3](n) for n in range(1,60)) and F(1+1,2*1) == F(2,2) == 1 and F(2+1,2*2) == F(3,4) and 1 != F(3,4), 'H23 idg-vivo serie 4')
ok(F(3,2**2) == F(3,4) and F(3**2,2**3) == F(9,8) and F(3**3,2**4) == F(27,16) and F(9,8)*F(4,3) == F(36,24) == F(3,2) and F(27,16)*F(8,9) == F(216,144) == F(3,2) and all(F(3**(n+1),2**(n+2))*F(2**(n+1),3**n) == F(3**(n+1)*2**(n+1),3**n*2**(n+2)) == F(3,2) and 2**(n+2) == 2**(n+1)*2 and S23[4](n) == F(3,4)*F(3,2)**(n-1) for n in range(1,40)) and F(3,2)**2 == F(9,4) and F(3,4)*F(9,4) == F(27,16) == T23[4][2] and abs(F(3,2)) >= 1, 'H23 idg-vivo serie 5')
ok([2*1+1, 2*2+1, 2*3+1] == [3,5,7] and all(2*(n+1)+1 == 2*n+2+1 == 2*n+3 and S23[5](n+1)/S23[5](n) == F(2*n+3,2*n+1) for n in range(1,60)) and F(2*1+3,2*1+1) == F(5,3) and F(2*2+3,2*2+1) == F(7,5) and 5*5 == 25 and 3*7 == 21 and 25 != 21 and 5-3 == 2 and 7-5 == 2 and all(S23[5](n+1)-S23[5](n) == 2 for n in range(1,60)), 'H23 idg-vivo serie 6')
ok(F(2,2) == 1 and all(2*1**(n-1) == 2 and S23[6](n+1)/S23[6](n) == 1 and S23[6](n+1)-S23[6](n) == 0 for n in range(1,60)) and abs(1) >= 1, 'H23 idg-vivo serie 7 (caso límite, r = 1)')
# ejemplos
e23 = lambda n: F(3*2**n,5**(n+1))
ok([e23(1),e23(2),e23(3)] == [F(6,25),F(12,125),F(24,625)] and 3*2 == 6 and 5**2 == 25 and 3*4 == 12 and 5**3 == 125 and 3*8 == 24 and 5**4 == 625 and all(e23(n+1)/e23(n) == F(3*2**(n+1)*5**(n+1),3*2**n*5**(n+2)) == F(2**(n+1)*5**(n+1),2**n*5**(n+2)) == F(2*5**(n+1),5**(n+2)) == F(2,5) and 5**(n+2) == 5**(n+1)*5 and (n+1)+1 == n+2 and e23(n) == F(6,25)*F(2,5)**(n-1) for n in range(1,40)) and F(2,5)**2 == F(4,25) and F(6,25)*F(4,25) == F(24,625), 'H23 e1')
f23 = lambda n: F((-1)**n,2**n)
ok([f23(0),f23(1),f23(2)] == [1,-F(1,2),F(1,4)] and (-1)**0 == 1 and 2**0 == 1 and all(f23(n+1)/f23(n) == F((-1)**(n+1)*2**n,(-1)**n*2**(n+1)) == F((-1)*2**n,2**(n+1)) == F(-1,2) and f23(n) == 1*F(-1,2)**((n+1)-1) for n in range(0,40)) and F(-1,2)**2 == F(1,4) and 1*F(1,4) == f23(2), 'H23 e2 (empieza en n = 0)')
ok(F('0.7') == F(7,10) and F('0.07') == F(7,100) and F('0.007') == F(7,1000) and 10**2 == 100 and 10**3 == 1000 and all(F(7,10**(n+1))*F(10**n,7) == F(7*10**n,7*10**(n+1)) == F(10**n,10**(n+1)) == F(1,10) and F(7,10**n) == F(7,10)*F(1,10)**(n-1) for n in range(1,40)) and F(1,10)**2 == F(1,100) and F(7,10)*F(1,100) == F(7,1000) == F('0.007') and abs(F(1,10)) < 1 and abs(sum(7/10**n for n in range(1,40)) - 7/9) < 1e-12 and abs(sum(F(7,10**n) for n in range(1,13)) - F('0.777777777777')) == 0, 'H23 e3 (0,777…)')
ok([F(1,n*n) for n in (1,2,3)] == [1,F(1,4),F(1,9)] and F(1,4)/1 == F(1,4) and F(1,9)*F(4,1) == F(4,9) and 1*9 == 9 and 4*4 == 16 and F(1,4) != F(4,9) and all(F(1,(n+1)**2)*F(n*n,1) == F(n*n,(n+1)**2) for n in range(1,60)), 'H23 e4 (a)')
ok(F(1,2)*F(2,1) == 1 and F(3,8)*F(2,1) == F(6,8) == F(3,4) and 1 != F(3,4) and F(2,2**2) == F(2,4) == F(1,2) and F(3,2**3) == F(3,8), 'H23 e4 (b)')
g23 = lambda n: F(n*n-n+2,2)
ok(1-1+2 == 2 and 4-2+2 == 4 and 9-3+2 == 8 and 16-4+2 == 14 and [g23(n) for n in (1,2,3,4)] == [1,2,4,7] and g23(2)/g23(1) == 2 and g23(3)/g23(2) == 2 and g23(4)/g23(3) == F(7,4) != 2 == F(8,4) and [2**(n-1) for n in (1,2,3,4)] == [1,2,4,8], 'H23 e4 (c) tres términos que engañan')
ok(F(3**1,2**2) == F(3,4) and all(F(3**(n+1),2**(n+2))/F(3**n,2**(n+1)) == F(3,2) for n in range(1,30)) and F(3,2) >= 1, 'H23 errores frecuentes')
# ejercicios
ok(F(5,4**1) == F(5,4) and all(F(5,4**(n+1))*F(4**n,5) == F(5*4**n,5*4**(n+1)) == F(1,4) and F(5,4**n) == F(5,4)*F(1,4)**(n-1) for n in range(1,40)) and F(5,4)*F(1,4) == F(5,16) == F(5,4**2), 'H23 A (a)')
ok(F(1,2)/1 == F(1,2) and F(1,3)*F(2,1) == F(2,3) and 1*3 == 3 and 2*2 == 4 and F(1,2) != F(2,3), 'H23 A (b)')
h23 = lambda n: F(2*3**n,7**n)
ok(h23(0) == F(2*1,1) == 2 and all(h23(n+1)/h23(n) == F(2*3**(n+1)*7**n,2*3**n*7**(n+1)) == F(3,7) and h23(n) == 2*F(3,7)**((n+1)-1) for n in range(0,40)) and 2*F(3,7) == F(6,7) == h23(1) == F(2*3,7), 'H23 A (c)')
ok([2*1+1,2*2+1,2*3+1] == [3,5,7] and 5*5 == 25 and 3*7 == 21 and F(5,3) != F(7,5) and 5-3 == 2 and 7-5 == 2, 'H23 A (d)')
b23 = lambda n: 4*n*n-8*n+6
ok([2*3**(n-1) for n in (1,2,3)] == [2,6,18] and 2*9 == 18 and 4-8+6 == 2 and 16-16+6 == 6 and 36-24+6 == 18 and [b23(n) for n in (1,2,3)] == [2,6,18] and 4*4 == 16 and 8*2 == 16 and 4*9 == 36 and 8*3 == 24, 'H23 B (a)')
ok(all(F(2*3**n,2*3**(n-1)) == 3 and 3**n == 3**(n-1)*3 and (n+1)-1 == n for n in range(1,40)) and 2*3**0 == 2 and abs(3) >= 1, 'H23 B (b)')
ok(4*16 == 64 and 8*4 == 32 and 64-32+6 == 38 == b23(4) and F(6,2) == 3 and F(38,18) == F(19,9) and 3 == F(27,9) != F(19,9) and 2*3**3 == 2*27 == 54, 'H23 B (c)')
d23 = lambda n: 10*F(3,5)**(n-1); c23 = lambda k: 20*F(3,5)**k
ok(F(3,5)*10 == F(30,5) == 6 and F(3,5)*6 == F(18,5) and [d23(1),d23(2),d23(3)] == [10,6,F(18,5)] and all(d23(n+1) == F(3,5)*d23(n) and d23(n+1)/d23(n) == F(3,5) for n in range(1,40)), 'H23 C (a) bajadas: a = 10, r = 3/5')
ok(all(c23(k) == 2*d23(k+1) == 2*10*F(3,5)**k and c23(k+1)/c23(k) == F(3,5) and c23(k) == 12*F(3,5)**(k-1) and F(3,5)**(k+1) == F(3,5)**k*F(3,5) for k in range(1,40)) and 20*F(3,5) == F(60,5) == 12 and 20*F(9,25) == F(180,25) == F(36,5) and F(3,5)**2 == F(9,25), 'H23 C (b) rebotes completos: a = 12, r = 3/5')
ok(F(12,10) == F(6,5) and F(36,5)/12 == F(36,5)*F(1,12) == F(36,60) == F(3,5) and F(6,5) != F(3,5) and [10, c23(1), c23(2)] == [10,12,F(36,5)] and abs(F(3,5)) < 1, 'H23 C (c) la serie completa no es geométrica')
# ---- H24 ----
# Suma de una serie geométrica infinita: S = a/(1 − r) si |r| < 1
G24 = lambda a, r, n: sum(a*r**(k-1) for k in range(1, n+1))          # suma parcial, sumando término a término
RJ24 = [F(p,q) for p in range(-9,10) for q in range(1,8) if F(p,q) != 1]  # rejilla de razones distintas de 1
AJ24 = [F(p,q) for p in (-7,-3,-1,1,2,5,12) for q in (1,2,3,4)]           # rejilla de primeros términos (≠ 0)
S24 = lambda a, r: a/(1-r)
# recuadro k2, primera parte: truco Sn − r·Sn
ok(all(r*G24(a,r,n) == sum(a*r**k for k in range(1,n+1)) and G24(a,r,n) - r*G24(a,r,n) == a - a*r**n and (1-r)*G24(a,r,n) == a*(1-r**n) and G24(a,r,n) == a*(1-r**n)/(1-r) for a in AJ24 for r in RJ24 for n in range(1,9)), 'H24 k2: Sn − r·Sn = a − a·rⁿ y Sn = a(1 − rⁿ)/(1 − r), en rejilla')
ok(all(G24(a,F(1),n) == n*a for a in AJ24 for n in range(1,12)), 'H24 k2: con r = 1, Sn = n·a')
# segunda parte: separación en dos fracciones, lo que falta y el límite (numérico)
ok(all(G24(a,r,n) == (a - a*r**n)/(1-r) == a/(1-r) - a*r**n/(1-r) and S24(a,r) - G24(a,r,n) == a*r**n/(1-r) for a in AJ24 for r in RJ24 if abs(r) < 1 for n in range(1,9)), 'H24 k2: Sn = a/(1−r) − a·rⁿ/(1−r); S − Sn = a·rⁿ/(1−r)')
ok(all(abs(S24(a,r) - G24(a,r,400)) < F(1,10**9) for a in (F(1),F(-3),F(5,2)) for r in (F(1,2),F(-1,2),F(2,3),F(-3,4),F(9,10))), 'H24 k2: con |r| < 1 las sumas parciales se acercan a a/(1−r) (n = 400)')
ok(all(abs(a*r**(n-1)) == abs(a)*abs(r)**(n-1) >= abs(a) > 0 for a in AJ24 for r in RJ24 + [F(1)] if abs(r) >= 1 for n in range(1,9)), 'H24 k2 tercera parte: con |r| ≥ 1, |a·rⁿ⁻¹| ≥ |a| > 0')
ok(F(3,1-2) == F(3,-1) == -3 and [G24(3,2,n) for n in (1,2,3)] == [3,9,21] and [3*2**k for k in range(3)] == [3,6,12], 'H24 k2: a = 3, r = 2 (la expresión da −3 y no hay suma)')
# recuadro k1: otro índice y despejes
ok(all(sum(c*q**n for n in range(m, m+N)) == G24(c*q**m, q, N) and c*q**m*q**(n-1) == c*q**(m+n-1) for c in (F(3),F(-2),F(1,2)) for q in (F(1,2),F(-2,3),F(3,5)) for m in range(0,5) for N in range(1,8) for n in range(1,6)), 'H24 k1: Σ desde n = m de c·qⁿ es la geométrica con a = c·q^m y r = q')
ok(all(S24(a,r)*(1-r) == a and 1 - r == a/S24(a,r) and r == 1 - a/S24(a,r) and S24(a,r) != 0 for a in AJ24 for r in RJ24 if abs(r) < 1), 'H24 k1: despejes a = S(1 − r), 1 − r = a/S, r = 1 − a/S')
# escena sgi-idea: registro y lectura, pasos 1 a 6
T24 = [F(1,2**n) for n in range(1,11)]; P24 = [sum(T24[:n]) for n in range(1,11)]
ok(T24[:4] == [F(1,2),F(1,4),F(1,8),F(1,16)] and all(F(1,2**(n+1))*F(2**n,1) == F(2**n,2**n*2) == F(1,2) for n in range(1,40)) and F(1,2**1) == F(1,2) and 1*1 == 1, 'H24 sgi-idea: datos (a = 1/2, r = 1/2, área 1)')
ok(P24[0] == F(1,2) and 1 - F(1,2) == F(2,2) - F(1,2) == F(1,2), 'H24 sgi-idea paso 1')
ok(F(1,2)*F(1,2) == F(1,4) and P24[1] == F(1,2)+F(1,4) == F(2,4)+F(1,4) == F(3,4) and 1 - F(3,4) == F(4,4) - F(3,4) == F(1,4), 'H24 sgi-idea paso 2')
ok(F(1,2)*F(1,4) == F(1,8) and P24[2] == F(3,4)+F(1,8) == F(6,8)+F(1,8) == F(7,8) and 1 - F(7,8) == F(8,8) - F(7,8) == F(1,8), 'H24 sgi-idea paso 3')
ok(F(1,2)*F(1,8) == F(1,16) and P24[3] == F(7,8)+F(1,16) == F(14,16)+F(1,16) == F(15,16) and 1 - F(15,16) == F(16,16) - F(15,16) == F(1,16) == T24[3], 'H24 sgi-idea paso 4 (lo que falta = último trozo)')
ok([1 - P24[n] for n in range(4)] == [F(1,2)**e for e in (1,2,3,4)] and all(F(1,2)*F(1,2)**n == F(1,2)**(n+1) and F(1,2)**n == 2*F(1,2)**(n+1) and 2*F(1,2)**(n+1) - F(1,2)**(n+1) == F(1,2)**(n+1) and 1 - G24(F(1,2),F(1,2),n) == F(1,2)**n and G24(F(1,2),F(1,2),n) == 1 - F(1,2)**n == F(1,2)*(1 - F(1,2)**n)/(1 - F(1,2)) for n in range(1,60)) and 1 - F(1,2) == F(1,2), 'H24 sgi-idea paso 5 (1 − Sn = (1/2)ⁿ, por los dos caminos)')
ok(S24(F(1,2),F(1,2)) == F(1,2)/F(1,2) == 1 == 1 - 0 and F(1,2)/(1 - F(1,2)) == 1 and all(P24[n] < 1 and 1 - P24[n] == F(1,2)**(n+1) for n in range(10)) and F(1,2)**60 < F(1,10**18), 'H24 sgi-idea paso 6 (suma 1; ninguna suma parcial llega a 1)')
# figura: los diez trozos son mitades sucesivas de lo que falta y no se enciman (áreas)
def _tr24():
    q = [F(0),F(0),F(1),F(1)]; tr = []; rm = [q]
    for i in range(10):
        if i % 2 == 0: tr.append([q[0],q[1],q[2]/2,q[3]]); q = [q[0]+q[2]/2,q[1],q[2]/2,q[3]]
        else: tr.append([q[0],q[1]+q[3]/2,q[2],q[3]/2]); q = [q[0],q[1],q[2],q[3]/2]
        rm.append(q)
    return tr, rm
TR24, RM24 = _tr24()
ok([t[2]*t[3] for t in TR24] == T24 and [m[2]*m[3] for m in RM24] == [F(1,2**n) for n in range(0,11)] and all(0 <= t[0] and t[0]+t[2] <= 1 and 0 <= t[1] and t[1]+t[3] <= 1 for t in TR24) and TR24[:4] == [[0,0,F(1,2),1],[F(1,2),F(1,2),F(1,2),F(1,2)],[F(1,2),0,F(1,4),F(1,2)],[F(3,4),F(1,4),F(1,4),F(1,4)]], 'H24 sgi-idea: áreas de los trozos y de lo que falta en la figura')
# escena sgi-vivo: las once posiciones del deslizador r = k/10, con a = 1
def _viv24(k):
    r = F(k,10); d = 1 - r
    c = (d == F(10-k,10)) and [1*r, r*r, r*r*r] == [F(k,10), F(k*k,100), F(k**3,1000)]
    c = c and 1 - d == r and 1 + r == F(10+k,10) and d*(1+r) == F(100-k*k,100) and 1 - F(100-k*k,100) == r*r   # segunda y tercera esquina
    c = c and all(1 - d*G24(1,r,n) == r**n for n in range(1,12))                                                   # la recta pasa por todas las esquinas
    if k < 10:
        c = c and abs(r) < 1 and S24(1,r) == 1/d == F(10,10-k) and 1 - d*S24(1,r) == 0 and all(G24(1,r,n) < S24(1,r) for n in range(1,30)) if k > 0 else c and S24(1,r) == 1
    else:
        c = c and abs(r) >= 1 and d == 0 and [G24(1,r,n) for n in (1,2,3)] == [1,2,3] and all(G24(1,r,n) == n for n in range(1,30))
    return c
ok(all(_viv24(k) for k in range(11)), 'H24 sgi-vivo: lados, esquinas y suma en las once posiciones de r')
ok([S24(1,F(k,10)) for k in range(10)] == [1, F(10,9), F(5,4), F(10,7), F(5,3), 2, F(5,2), F(10,3), 5, 10] and [F(10,10-k) for k in (4,6)] == [F(10,6), F(10,4)] and [F(10,8)] == [F(5,4)], 'H24 sgi-vivo: sumas exactas 1, 10/9, 5/4, 10/7, 5/3, 2, 5/2, 10/3, 5, 10')
ok([(1000 % (10-k) == 0, round(1000/(10-k))) for k in range(10)] == [(True,100),(False,111),(True,125),(False,143),(False,167),(True,200),(True,250),(False,333),(True,500),(True,1000)] and all(abs(F(round(1000/(10-k)),100) - F(10,10-k)) <= F(1,200) for k in range(10)) and F(125,100) == F(5,4) and F(250,100) == F(5,2), 'H24 sgi-vivo: decimales 1; 1,11; 1,25; 1,43; 1,67; 2; 2,5; 3,33; 5; 10 (exactos o redondeados a 2 decimales)')
ok(all(-0.95 + 1.2*float(S24(1,F(k,10))) <= 5.2 for k in range(9)) and -0.95 + 1.2*10 > 5.2 and S24(1,F(9,10)) == 10 and S24(1,F(8,10)) == 5, 'H24 sgi-vivo: la suma cabe en el dibujo hasta r = 0,8; con r = 0,9 (suma 10) queda fuera')
ok(all(1 - (1-r)*G24(1,r,n) == 1 - (1 - r**n) == 1 - 1 + r**n == r**n and (1-r)*S24(1,r) == 1 for r in RJ24 if 0 < r < 1 for n in range(1,10)), 'H24 k3: la recta de altura 1 − (1 − r)x pasa por (Sn, rⁿ) y toca el eje en 1/(1 − r)')
# ejemplo 1: Σ desde n = 2 de 3(1/2)ⁿ
e24 = lambda n: 3*F(1,2)**n
ok(F(1,2)**2 == F(1,4) and e24(2) == 3*F(1,4) == F(3,4) and e24(3) == 3*F(1,8) == F(3,8) and e24(4) == 3*F(1,16) == F(3,16) and all(e24(n+1)/e24(n) == F(1,2) and F(1,2)**(n+1) == F(1,2)**n*F(1,2) for n in range(2,40)) and 1 - F(1,2) == F(2,2) - F(1,2) == F(1,2) and F(3,4)*2 == F(6,4) == F(3,2) == S24(F(3,4),F(1,2)) == F('1.5'), 'H24 e1: a = 3/4, r = 1/2, suma 3/2')
ok(e24(2)+e24(3)+e24(4) == F(12,16)+F(6,16)+F(3,16) == F(21,16) and F(1,2)**3 == F(1,8) and F(3,4)*F(1,8) == F(3,32) and F(3,32)*2 == F(6,32) == F(3,16) and F(3,2) - F(21,16) == F(24,16) - F(21,16) == F(3,16) and abs(sum(e24(n) for n in range(2,300)) - F(3,2)) < F(1,10**9) and S24(3,F(1,2)) == 6, 'H24 e1: comprobación con S₃ y lo que falta')
# ejemplo 2: 12 − 6 + 3 − 3/2 + ⋯
f24 = lambda n: 12*F(-1,2)**(n-1)
ok([f24(n) for n in (1,2,3,4)] == [12,-6,3,F(-3,2)] and F(-6,12) == F(-1,2) and all(f24(n+1)/f24(n) == F(-1,2) for n in range(1,40)) and abs(F(-1,2)) == F(1,2) < 1 and 1 - F(-1,2) == 1 + F(1,2) == F(2,2) + F(1,2) == F(3,2) and 12*F(2,3) == F(24,3) == 8 == S24(12,F(-1,2)) and 8 < 12, 'H24 e2: a = 12, r = −1/2, suma 8')
ok([G24(12,F(-1,2),n) for n in (1,2,3,4)] == [12, 12-6, 6+3, 9-F(3,2)] == [12,6,9,F(15,2)] and F(18,2) - F(3,2) == F(15,2) == F('7.5') and [12-8, 8-6, 9-8, 8-F('7.5')] == [4,2,1,F('0.5')] and all(abs(8 - G24(12,F(-1,2),n)) == 4*F(1,2)**(n-1) and (G24(12,F(-1,2),n) > 8) == (n % 2 == 1) for n in range(1,30)), 'H24 e2: sumas parciales a uno y otro lado de 8, a la mitad de distancia cada vez')
# ejemplo 3: decimales periódicos
ok(all(F(7,10**n) == F(7,10)*F(1,10)**(n-1) for n in range(1,30)) and 1 - F(1,10) == F(10,10) - F(1,10) == F(9,10) and F(7,10)*F(10,9) == F(70,90) == F(7,9) == S24(F(7,10),F(1,10)) and 70 == 7*9 + 7 and sum(F(7,10**n) for n in range(1,13)) == F('0.777777777777') and abs(F(7,9) - F('0.777777777777')) < F(1,10**12), 'H24 e3 (a): 0,777… = 7/9')
ok(F('0.1') == F(1,10) and [F('0.06'),F('0.006'),F('0.0006')] == [F(6,100),F(6,1000),F(6,10000)] == [F(6,10**n) for n in (2,3,4)] and all(F(6,10**(n+1))*F(10**n,6) == F(6*10**n,6*10**n*10) == F(1,10) for n in range(2,30)) and F(6,100)*F(10,9) == F(60,900) == F(1,15) == S24(F(6,100),F(1,10)) and 900 == 60*15 and F(1,10) + F(1,15) == F(3,30) + F(2,30) == F(5,30) == F(1,6) and 10 == 1*6 + 4 and 40 == 6*6 + 4 and F(1,10) + sum(F(6,10**n) for n in range(2,13)) == F('0.166666666666') and abs(F(1,6) - F('0.166666666666')) < F(1,10**12), 'H24 e3 (b): 0,1666… = 1/6')
# ejemplo 4: despejes
ok(1 - F(3,5) == F(5,5) - F(3,5) == F(2,5) and 10*F(2,5) == F(20,5) == 4 and 4/F(2,5) == 4*F(5,2) == F(20,2) == 10 == S24(4,F(3,5)) and [4*F(3,5)**k for k in range(3)] == [4,F(12,5),F(36,25)], 'H24 e4 (a): a = 4')
ok(F(6,4) == F(3,2) and 1 - F(3,2) == F(2,2) - F(3,2) == F(-1,2) and abs(F(-1,2)) < 1 and 1 - F(-1,2) == F(3,2) and 6*F(2,3) == F(12,3) == 4 == S24(6,F(-1,2)) and [6*F(-1,2)**k for k in range(3)] == [6,-3,F(3,2)], 'H24 e4 (b): r = −1/2')
ok(F(6,2) == 3 and 1 - 3 == -2 and abs(-2) >= 1 and [6*(-2)**k for k in range(3)] == [6,-12,24] and all(S24(6,r) != 2 for r in RJ24 if abs(r) < 1) and all(F(6)/(1-r) > 3 for r in RJ24 if abs(r) < 1), 'H24 e4 (c): no hay serie con a = 6 y suma 2 (con |r| < 1 la suma supera 3)')
# errores frecuentes
ok(e24(2) == F(3,4) != 3 and 1 - F(-1,2) == F(3,2) != F(1,2) and all(a/(r-1) == -S24(a,r) for a in AJ24 for r in RJ24), 'H24 errores frecuentes')
# ejercicio A
ok(1 - F(2,3) == F(3,3) - F(2,3) == F(1,3) and 6*3 == 18 == S24(6,F(2,3)) and abs(F(2,3)) < 1, 'H24 A (a): 18')
ok(F(-3,4)**0 == 1 and all(F(-3,4)**(n+1)/F(-3,4)**n == F(-3,4) for n in range(0,30)) and abs(F(-3,4)) == F(3,4) < 1 and 1 - F(-3,4) == 1 + F(3,4) == F(4,4) + F(3,4) == F(7,4) and 1*F(4,7) == F(4,7) == S24(1,F(-3,4)) and abs(sum(F(-3,4)**n for n in range(0,300)) - F(4,7)) < F(1,10**9), 'H24 A (b): 4/7')
ok(F(2,5)**3 == F(2**3,5**3) == F(8,125) and all(F(2,5)**(n+1) == F(2,5)**n*F(2,5) for n in range(3,30)) and 1 - F(2,5) == F(5,5) - F(2,5) == F(3,5) and F(8,125)*F(5,3) == F(40,375) == F(8,75) == S24(F(8,125),F(2,5)) and 40 == 8*5 and 375 == 75*5 and abs(sum(F(2,5)**n for n in range(3,300)) - F(8,75)) < F(1,10**9), 'H24 A (c): 8/75')
ok([5*(-1)**(n-1) for n in (1,2,3,4)] == [5,-5,5,-5] and abs(-1) == 1 >= 1 and [G24(5,-1,n) for n in (1,2,3,4)] == [5,0,5,0] and F(5,1-(-1)) == F(5,2), 'H24 A (d): no tiene suma')
# ejercicio B
ok([F('0.45'),F('0.0045'),F('0.000045')] == [F(45,100**n) for n in (1,2,3)] and all(F(45,100**(n+1))*F(100**n,45) == F(45*100**n,45*100**n*100) == F(1,100) for n in range(1,20)) and 1 - F(1,100) == F(100,100) - F(1,100) == F(99,100) and F(45,100)*F(100,99) == F(4500,9900) == F(45,99) == F(5,11) == S24(F(45,100),F(1,100)) and 45 == 9*5 and 99 == 9*11 and math.gcd(5,11) == 1 and 50 == 4*11 + 6 and 60 == 5*11 + 5 and sum(F(45,100**n) for n in range(1,7)) == F('0.454545454545'), 'H24 B (a): 0,4545… = 5/11')
ok(1 - F(1,4) == F(4,4) - F(1,4) == F(3,4) and 12*F(3,4) == F(36,4) == 9 and 9*F(4,3) == F(36,3) == 12 == S24(9,F(1,4)), 'H24 B (b): a = 9')
ok(1 - F(8,5) == F(5,5) - F(8,5) == F(-3,5) and abs(F(-3,5)) == F(3,5) < 1 and 1 - F(-3,5) == 1 + F(3,5) == F(8,5) and 8*F(5,8) == F(40,8) == 5 == S24(8,F(-3,5)), 'H24 B (c): r = −3/5')
# ejercicio C: la pelota de H23 (10 m, razón 3/5)
d24 = lambda n: 10*F(3,5)**(n-1); u24 = lambda k: 10*F(3,5)**k; c24 = lambda k: 20*F(3,5)**k
ok([d24(n) for n in (1,2,3)] == [10,6,F(18,5)] and [u24(k) for k in (1,2,3)] == [6,F(18,5),F(54,25)] and [c24(k) for k in (1,2,3)] == [12,F(36,5),F(108,25)] and 10*F(3,5) == F(30,5) == 6 and all(u24(k) == d24(k+1) and u24(k+1)/u24(k) == F(3,5) and c24(k) == u24(k) + d24(k+1) for k in range(1,40)), 'H24 C: bajadas, subidas y rebotes completos')
ok(1 - F(3,5) == F(5,5) - F(3,5) == F(2,5) and 1/F(2,5) == F(5,2) and 10*F(5,2) == F(50,2) == 25 == S24(10,F(3,5)) and 6*F(5,2) == F(30,2) == 15 == S24(6,F(3,5)) and 25 + 15 == 40 and 12*F(5,2) == F(60,2) == 30 == S24(12,F(3,5)) and 10 + 30 == 40, 'H24 C (a), (b), (c): 25 m, 15 m, 40 m por las dos maneras')
ok(F(3,5)**3 == F(27,125) and 1 - F(27,125) == F(125,125) - F(27,125) == F(98,125) and 12*F(98,125) == F(1176,125) and F(1176,125)*F(5,2) == F(5880,250) == F(588,25) == F('23.52') == G24(12,F(3,5),3) and 12 + F(36,5) + F(108,25) == 12 + F('7.2') + F('4.32') == F('23.52') and 10 + F('23.52') == F('33.52') and 40 - F('33.52') == F('6.48') and 12*F(27,125) == F(324,125) and F(324,125)*F(5,2) == F(1620,250) == F(162,25) == F('6.48') and 10 + G24(12,F(3,5),3) == d24(1) + sum(u24(k) + d24(k+1) for k in (1,2,3)), 'H24 C (d): 33,52 m al cuarto toque; faltan 6,48 m')
# ---- H25 ---- Aplicaciones de series geométricas
Sn25 = lambda a, r, n: a*(1-r**n)/(1-r)          # suma parcial, r != 1
Si25 = lambda a, r: a/(1-r)                      # suma infinita, |r| < 1
ok(all(sum(a*r**(k-1) for k in range(1,n+1)) == Sn25(a,r,n) for a in (F(1),F(8),F(3,100),F(-5,2)) for r in (F(1,2),F(1,4),F(-2,3),F(11,10),F(3),F(-1)) for n in range(1,12)), 'H25 fórmula citada de la suma parcial (rejilla, r ≠ 1)')
ok(all(abs(Si25(a,r)-Sn25(a,r,n)) == abs(a*r**n/(1-r)) and abs(a*r**200/(1-r)) < F(1,10**6) for a in (F(8),F(45,100),F(200)) for r in (F(1,2),F(1,4),F(1,100),F(4,5),F(-1,3)) for n in range(1,20)), 'H25 la suma infinita citada es el valor al que se acercan las parciales (|r| < 1)')
# escena apg-idea: pelota desde 8 m, sube 1/2
h25 = lambda k: 8*F(1,2)**k                      # altura después del rebote k
c25 = lambda k: 2*h25(k)                         # rebote completo k
ok(F(1,2)*8 == F(8,2) == 4 and 4+4 == 8 == c25(1), 'H25 idea paso 2: primer rebote 4 + 4 = 8')
ok(F(1,2)*4 == F(4,2) == 2 == h25(2) and 2+2 == 4 == c25(2) and F(1,2)*2 == F(2,2) == 1 == h25(3) and 1+1 == 2 == c25(3) and F(4,8) == F(1,2) and F(2,4) == F(1,2), 'H25 idea paso 3: rebotes 4 y 2, cocientes 1/2')
ok(all(c25(k+1) == c25(k)*F(1,2) and c25(k) == 8*F(1,2)**(k-1) for k in range(1,50)), 'H25 idea paso 3: los rebotes son Σ 8·(1/2)^(k−1), a = 8, r = 1/2')
ok(abs(F(1,2)) < 1 and 1-F(1,2) == F(1,2) and 8/F(1,2) == 8*2 == 16 == Si25(8,F(1,2)), 'H25 idea paso 4: suma de los rebotes 16')
ok(8+16 == 24 and 8 + Si25(8,F(1,2)) == 24, 'H25 idea paso 5: total 24 m')
ok(8+8+4+2+2 == 24 and [0,8,16,20,22] == [0,8,8+8,8+8+4,8+8+4+2] and 24 - 22 == 2 == Si25(c25(4),F(1,2)) and [12,18,21,23] == [F(8+16,2),F(16+20,2),F(20+22,2),F(22+24,2)], 'H25 idea: trozos de la barra (8, 8, 4, 2 y el resto 2 = todos los rebotes no dibujados)')
# recuadro k2: D = h + 2hr/(1 − r) = h(1 + r)/(1 − r), 0 < r < 1
G25 = [(F(h), F(p,q)) for h in (1,3,8,9,12,F(5,2)) for q in range(2,12) for p in range(1,q)]
ok(all(2*h*r**(k+1) == 2*h*r**k*r and 2*h*r**k == 2*h*r*r**(k-1) for h,r in G25 for k in range(1,8)), 'H25 k2 pasos 3–4: c(k+1) = c(k)·r y c(k) = 2hr·r^(k−1)')
ok(all(h + Si25(2*h*r,r) == (h*(1-r)+2*h*r)/(1-r) == (h-h*r+2*h*r)/(1-r) == (h+h*r)/(1-r) == h*(1+r)/(1-r) for h,r in G25), 'H25 k2 pasos 7–11: D = h(1 + r)/(1 − r) (rejilla)')
ok(all(abs(h + sum(2*h*r**k for k in range(1,400)) - h*(1+r)/(1-r)) == 2*h*r**400/(1-r) for h,r in G25[:40]), 'H25 k2: la distancia acumulada se acerca a D')
ok(all(F(2*h*r,h) == 2*r != r == F(2*h*r*r,2*h*r) for h,r in G25), 'H25 k2: la serie completa no es geométrica (cocientes 2r y r)')
ok(1+F(1,2) == F(3,2) and 1-F(1,2) == F(1,2) and F(3,2)/F(1,2) == F(3,2)*2 == 3 and 8*3 == 24, 'H25 k2 comprobación con h = 8, r = 1/2')
# escena apg-vivo: h = 8, razón k/10, k = 0…9
V25 = {0:(0,8), 1:(F(16,9),F(88,9)), 2:(4,12), 3:(F(48,7),F(104,7)), 4:(F(32,3),F(56,3)), 5:(16,24), 6:(24,32), 7:(F(112,3),F(136,3)), 8:(64,72), 9:(144,152)}
ok(8*0 == 0 and 8+0 == 8 and F(8*(1+0),1-0) == 8, 'H25 vivo razón 0: no rebota, D = 8')
for k25 in range(1,10):
    r25 = F(k25,10); p25, q25 = r25.numerator, r25.denominator
    x25 = 8*r25; a25 = 2*x25; u25 = 1 - r25; s25 = a25/u25; d25 = 8 + s25
    ok(x25 == F(8*p25,q25) == F(8*k25,10) and a25 == F(2*x25.numerator, x25.denominator) and u25 == F(q25,q25)-r25 == F(q25-p25,q25) and u25.numerator == q25-p25 and u25.denominator == q25, f'H25 vivo razón 0,{k25}: primer rebote y denominador')
    ok(abs(r25) < 1 and s25 == a25*F(q25,q25-p25) == F(a25.numerator*q25, a25.denominator*(q25-p25)) == V25[k25][0] == Si25(a25,r25) and all(a25*r25**j == 2*8*r25**(j+1) for j in range(0,30)), f'H25 vivo razón 0,{k25}: suma de los rebotes')
    ok(d25 == F(8*s25.denominator,s25.denominator)+s25 == F(8*s25.denominator+s25.numerator, s25.denominator) == V25[k25][1] and math.gcd(8*s25.denominator+s25.numerator, s25.denominator) == 1, f'H25 vivo razón 0,{k25}: total D')
    ok(1+r25 == F(q25+p25,q25) and F(q25+p25,q25)/u25 == F(q25+p25,q25)*F(q25,q25-p25) == F((q25+p25)*q25, q25*(q25-p25)) == F(q25+p25,q25-p25) and 8*F(q25+p25,q25-p25) == F(8*F(q25+p25,q25-p25).numerator, F(q25+p25,q25-p25).denominator) == d25, f'H25 vivo razón 0,{k25}: comprobación con h(1 + r)/(1 − r)')
ok([F(8*k,10) for k in range(1,10)] == [F(x) for x in ('0.8','1.6','2.4','3.2','4','4.8','5.6','6.4','7.2')], 'H25 vivo: alturas del primer rebote (rótulos)')
ok(all(abs(V25[k][1] - F(x)) <= F(1,200) for k,x in ((1,'9.78'),(3,'14.86'),(4,'18.67'),(7,'45.33'))) and [F(k,10) for k in (2,4,5,6,8)] == [F(1,5),F(2,5),F(1,2),F(3,5),F(4,5)] and max(v[1] for v in V25.values()) == 152, 'H25 vivo: aproximaciones a 2 decimales, razones simplificadas y tope de la regla')
ok(all(V25[k][1] < V25[k+1][1] for k in range(0,9)), 'H25 vivo: a mayor razón, mayor total')
# ejemplo 1: 0,454545… = 5/11
ok(F('0.45') == F(45,100) and F('0.0045') == F(45,10000) and F('0.000045') == F(45,1000000) and F(45,10000)/F(45,100) == F(1,100) == F(45,1000000)/F(45,10000) and all(F(45,100)*F(1,100)**(k-1) == F(45,100**k) for k in range(1,30)), 'H25 e1 reconocer: a = 45/100, r = 1/100')
ok(abs(F(1,100)) < 1 and 1-F(1,100) == F(100,100)-F(1,100) == F(99,100) and F(45,100)/F(99,100) == F(45,100)*F(100,99) == F(4500,9900) == F(45,99) == F(5,11) and 4500//100 == 45 and 9900//100 == 99 and 45//9 == 5 and 99//9 == 11 and math.gcd(5,11) == 1, 'H25 e1 suma: 5/11')
ok(50 == 4*11+6 and 60 == 5*11+5 and abs(F(5,11) - F('0.4545454545')) < F(1,10**10) and abs(sum(F(45,100**k) for k in range(1,30)) - F(5,11)) < F(1,10**50), 'H25 e1 comprobación por división')
# ejemplo 2: dosis de 200 mg, queda 1/4
q25 = [F(200)]
for _ in range(40): q25.append(200 + F(1,4)*q25[-1])
ok(F(1,4)*200 == 50 and 200+50 == 250 == q25[1] and F(1,4)*(200+50) == 50+F('12.5') == F('62.5') and q25[2] == 200+50+F('12.5') == F('262.5') and 200*F(1,4) == 50 and 50*F(1,4) == F('12.5'), 'H25 e2 pasos 1–4')
ok(all(q25[n-1] == sum(200*F(1,4)**(k-1) for k in range(1,n+1)) == Sn25(200,F(1,4),n) for n in range(1,41)), 'H25 e2 paso 5: Q_n es la suma parcial con a = 200, r = 1/4')
ok(F(1,4) != 1 and F(1,4)**3 == F(1,64) and 1-F(1,64) == F(63,64) and 1-F(1,4) == F(3,4) and F(63,64)/F(3,4) == F(63,64)*F(4,3) == F(252,192) == F(21,16) and 252//12 == 21 and 192//12 == 16 and 252 % 12 == 0 == 192 % 12 and 200*F(21,16) == F(4200,16) == F('262.5') == 200+50+F('12.5'), 'H25 e2 (a) Q_3 = 262,5')
ok(abs(F(1,4)) < 1 and 200/F(3,4) == 200*F(4,3) == F(800,3) == Si25(200,F(1,4)) and abs(F(800,3)-F('266.67')) <= F(1,200), 'H25 e2 (b) 800/3 ≈ 266,67')
ok(all(q25[n-1] == F(800,3)*(1-F(1,4)**n) < F(800,3) and q25[n-1] < q25[n] for n in range(1,40)), 'H25 e2 interpretación: Q_n crece y queda bajo 800/3')
# ejemplo 3: cuadrados inscritos, lado 4
ok(4**2 == 16 and F(4,2) == 2 and 2**2+2**2 == 4+4 == 8, 'H25 e3 pasos 1–2')
ok(all((L/2)**2+(L/2)**2 == L**2/4+L**2/4 == 2*L**2/4 == L**2/2 for L in [F(n,d) for n in range(1,30) for d in (1,2,3,7)]), 'H25 e3 paso 3: el área siguiente es la mitad (rejilla)')
ok([16*F(1,2)**(n-1) for n in range(1,5)] == [16,8,4,2] and abs(F(1,2)) < 1 and 1-F(1,2) == F(1,2) and 16/F(1,2) == 16*2 == 32 == Si25(16,F(1,2)) and 32 == 2*16, 'H25 e3 suma: 32 cm²')
ok(16+8+4+2+1 == 31 and F(1,2)**5 == F(1,32) and 1-F(1,32) == F(31,32) and 16*F(31,32) == F(31,2) and F(31,2)/F(1,2) == F(31,2)*2 == 31 == Sn25(16,F(1,2),5) and 32-31 == 1, 'H25 e3 comprobación con S_5')
# ejemplo 4: cuatro depósitos de 100 000 al 10 %
ok(1+F('0.1') == F('1.1') and all(x+F('0.1')*x == x*(1+F('0.1')) for x in (F(100000),F(121000),F(7,3))) and 100000*F('1.1') == 110000 and 110000*F('1.1') == 121000 and 121000*F('1.1') == 133100, 'H25 e4 pasos 1–4')
ok([100000*F('1.1')**(k-1) for k in range(1,5)] == [100000,110000,121000,133100] and F('1.1') != 1 and F('1.1')**2 == F('1.21') and F('1.1')**4 == F('1.21')**2 == F('1.4641') and 1-F('1.4641') == -F('0.4641') and 1-F('1.1') == -F('0.1') and (-F('0.4641'))/(-F('0.1')) == F('4.641') and 100000*F('4.641') == 464100 == Sn25(100000,F('1.1'),4), 'H25 e4 suma parcial S_4 = 464 100')
ok(100000+110000 == 210000 and 210000+121000 == 331000 and 331000+133100 == 464100 and 4*100000 == 400000 and 464100-400000 == 64100 and abs(F('1.1')) >= 1 and F(100000)/(-F('0.1')) == -1000000, 'H25 e4 suma directa, intereses y aviso |r| ≥ 1')
# errores frecuentes
ok(1-F(3,4) == F(1,4), 'H25 errores frecuentes: si se elimina 3/4, queda 1/4')
# ejercicio A
ok(F('0.8') == F(8,10) and F('0.03') == F(3,100) and F('0.003') == F(3,1000) and F('0.0003') == F(3,10000) and F(3,1000)/F(3,100) == F(1,10) == F(3,10000)/F(3,1000) and F(3,100)/F(8,10) != F(1,10) and abs(F(1,10)) < 1, 'H25 A (a) reconocer: 8/10 aparte; a = 3/100, r = 1/10')
ok(1-F(1,10) == F(9,10) and F(3,100)/F(9,10) == F(3,100)*F(10,9) == F(30,900) == F(1,30) == Si25(F(3,100),F(1,10)) and 900//30 == 30 and F(8,10)+F(1,30) == F(24,30)+F(1,30) == F(25,30) == F(5,6) and F(8,10) == F(24,30) and 25//5 == 5 and 30//5 == 6, 'H25 A (a) 0,8333… = 5/6')
ok(50 == 8*6+2 and 20 == 3*6+2 and abs(F(8,10)+sum(F(3,10**k) for k in range(2,40)) - F(5,6)) < F(1,10**38), 'H25 A (a) comprobación por división')
ok(F(1,3)*9 == 3 and 3+3 == 6 and [6*F(1,3)**(k-1) for k in (1,2,3)] == [6,2,F(2,3)] and all(2*9*F(1,3)**k == 6*F(1,3)**(k-1) for k in range(1,40)) and abs(F(1,3)) < 1 and 1-F(1,3) == F(2,3) and 6/F(2,3) == 6*F(3,2) == F(18,2) == 9 == Si25(6,F(1,3)) and 9+9 == 18, 'H25 A (b) pelota desde 9 m, razón 1/3: 18 m')
ok(1+F(1,3) == F(4,3) and F(4,3)/F(2,3) == F(4,3)*F(3,2) == F(12,6) == 2 and 9*2 == 18 == 9*(1+F(1,3))/(1-F(1,3)), 'H25 A (b) comprobación con la fórmula')
# ejercicio B
ok([48*F(1,4)**(n-1) for n in range(1,5)] == [48,12,3,F(3,4)] and abs(F(1,4)) < 1 and 1-F(1,4) == F(3,4) and 48/F(3,4) == 48*F(4,3) == F(192,3) == 64 == Si25(48,F(1,4)), 'H25 B (a) 64 cm²')
ok(48+12 == 60 and 60+3 == 63 and 63+F(3,4) == F('63.75') and not (63 > 63) and F('63.75') > 63 and [Sn25(48,F(1,4),n) for n in (1,2,3,4)] == [48,60,63,F('63.75')], 'H25 B (b) sumas parciales: se necesitan 4')
ok(F(1,4)**4 == F(1,256) and 1-F(1,256) == F(255,256) and F(255,256)/F(3,4) == F(255,256)*F(4,3) == F(1020,768) == F(85,64) and 1020//12 == 85 and 768//12 == 64 and 1020 % 12 == 0 == 768 % 12 and 48*F(85,64) == F(4080,64) == F('63.75'), 'H25 B (b) comprobación de S_4')
ok(all(Sn25(48,F(1,4),n) == 64*(1-F(1,4)**n) < 64 for n in range(1,60)), 'H25 B (c) S_n = 64(1 − (1/4)^n) < 64')
# ejercicio C
ok(F(4,5)*1000000 == F(4000000,5) == 800000 and F(4,5)*800000 == F(3200000,5) == 640000, 'H25 C (a) rondas 2 y 3')
ok(F(4,5) != 1 and F(4,5)**3 == F(64,125) and 1-F(64,125) == F(61,125) and 1-F(4,5) == F(1,5) and F(61,125)/F(1,5) == F(61,125)*5 == F(305,125) == F(61,25) and 305//5 == 61 and 125//5 == 25 and 1000000*F(61,25) == F(61000000,25) == 2440000 == Sn25(1000000,F(4,5),3) == 1000000+800000+640000, 'H25 C (b) S_3 = 2 440 000')
ok(abs(F(4,5)) < 1 and 1000000/F(1,5) == 1000000*5 == 5000000 == Si25(1000000,F(4,5)) and 1/(1-F(4,5)) == 5 and 1000000/F(1,2) == 2000000 == Si25(1000000,F(1,2)), 'H25 C (c) y (d): total 5 000 000, multiplicador 5; con 1/2, 2 000 000')
# ---- H26 ---- Límite de una sucesión
rd26 = lambda x, d: F(math.floor(x*10**d + F(1,2)), 10**d)   # redondeo a d decimales
ce26 = lambda x: -((-x.numerator)//x.denominator)            # menor entero >= x
G26 = [F(p,q) for p in range(1,13) for q in range(1,60)]     # rejilla de tolerancias positivas
a26 = lambda n: F(n+1,n)
# escena lim-idea: registro y lectura, paso por paso
ok([a26(n) for n in (1,2,3,4,5,10,12)] == [F(1+1,1),F(2+1,2),F(3+1,3),F(4+1,4),F(5+1,5),F(10+1,10),F(12+1,12)] == [2,F(3,2),F(4,3),F(5,4),F(6,5),F(11,10),F(13,12)] and F(2,1) == 2 and F(3,2) == F('1.5') and rd26(F(4,3),2) == F('1.33') and F(5,4) == F('1.25') and F(6,5) == F('1.2') and F(11,10) == F('1.1') and rd26(F(13,12),2) == F('1.08') and all(a26(n+1) < a26(n) for n in range(1,300)), 'H26 lim-idea paso 1: términos')
ok(all(a26(n)-1 == F(n+1,n)-F(n,n) == F(n+1-n,n) == F(1,n) and abs(a26(n)-1) == F(1,n) > 0 for n in range(1,400)), 'H26 lim-idea paso 2: |a_n − 1| = 1/n')
ok(F(1,4) == F('0.25') and 1-F('0.25') == F('0.75') and 1+F('0.25') == F('1.25') and all((F('0.75') < a26(n) < F('1.25')) == (abs(a26(n)-1) < F('0.25')) for n in range(1,400)), 'H26 lim-idea paso 3: franja de 0,75 a 1,25')
ok(all((F(1,n) < F(1,4)) == (4 < n) == (F(1,n)*4*n < F(1,4)*4*n) for n in range(1,400)) and not (F(1,4) < F(1,4)) and F(1,5) == F('0.2') < F('0.25') and all(abs(a26(n)-1) < F(1,4) for n in range(5,400)) and not abs(a26(4)-1) < F(1,4), 'H26 lim-idea paso 4: N = 4')
ok(F(1,10) == F('0.1') and 1-F('0.1') == F('0.9') and 1+F('0.1') == F('1.1') and all((F(1,n) < F(1,10)) == (10 < n) for n in range(1,400)) and not (F(1,10) < F(1,10)) and rd26(F(1,11),2) == F('0.09') and F(1,11) < F('0.1') and all(abs(a26(n)-1) < F(1,10) for n in range(11,400)) and a26(10) == F('1.1') and 10 > 4, 'H26 lim-idea paso 5: N = 10')
ok(all((F(1,n) < e) == (1/e < n) for e in G26 for n in range(1,80)) and all(ce26(1/e) >= 1/e and all(abs(a26(n)-1) < e for n in range(ce26(1/e)+1, ce26(1/e)+60)) for e in G26) and ce26(1/F(1,4)) == 4 and ce26(1/F(1,10)) == 10, 'H26 lim-idea paso 6: N >= 1/ε sirve para todo ε de la rejilla')
# escena lim-vivo: cada posición del deslizador
b26 = lambda n: 1 + F((-1)**n, n)
E26 = [(F(5,4),'1.25','-0.25','2.25','0.8',0), (F(1),'1','0','2','1',1), (F(1,2),'0.5','0.5','1.5','2',2), (F(2,5),'0.4','0.6','1.4','2.5',2), (F(1,4),'0.25','0.75','1.25','4',4), (F(1,5),'0.2','0.8','1.2','5',5), (F(1,8),'0.125','0.875','1.125','8',8), (F(1,10),'0.1','0.9','1.1','10',10)]
ok([b26(n) for n in (1,2,3,4)] == [0,F(3,2),F(2,3),F(5,4)] and all(b26(n)-1 == F((-1)**n,n) and abs(b26(n)-1) == F(abs((-1)**n),n) == F(1,n) and abs((-1)**n) == 1 for n in range(1,400)), 'H26 lim-vivo: distancia 1/n')
for e, de, lo, hi, inv, N in E26:
    ok(e == F(de) and 1-e == F(lo) and 1+e == F(hi) and 1/e == F(inv) and F(inv)*e == 1 and N == math.floor(F(inv)) and N+1 > F(inv) >= N and all((F(1,n) < e) == (n > F(inv)) == (n >= N+1) == (F(lo) < b26(n) < F(hi)) for n in range(1,400)) and (N+1)-1 == N and F(1,N+1) < e and (N == 0 or F(1,N) >= e), f'H26 lim-vivo ε = {de}: franja, división y N = {N}')
ok([x[5] for x in E26] == [0,1,2,2,4,5,8,10] and F(1,1) == 1 < F('1.25') and F(1,1) == 1 and not 1 < 1 and F(1,2) == F('0.5') < 1 and not F('0.5') < F('0.5') and rd26(F(1,3),2) == F('0.33') and F(1,3) < F('0.5') and F('0.5') > F('0.4') and F(1,3) < F('0.4') and F(1,4) == F('0.25') and F(1,5) == F('0.2') < F('0.25') and rd26(F(1,6),2) == F('0.17') and F(1,6) < F('0.2') and F(1,8) == F('0.125') and rd26(F(1,9),2) == F('0.11') and F(1,9) < F('0.125') and F(1,10) == F('0.1') and rd26(F(1,11),2) == F('0.09') and F(1,11) < F('0.1'), 'H26 lim-vivo: comprobaciones con el término N y el siguiente')
ok(1-0 == 1 and 1+0 == 1 and all(F(1,n) > 0 and not abs(b26(n)-1) < 0 for n in range(1,400)), 'H26 lim-vivo ε = 0 (caso límite): ningún término dentro')
# teoremas
R26 = [F(p,q) for p in range(-6,7) for q in (1,2,3)]
ok(all((L-a)+(a-M) == L-M and abs(L-M) <= abs(L-a)+abs(a-M) and abs(L-a) == abs(a-L) and 2*(abs(L-M)/2) == abs(L-M) for L in R26 for M in R26 for a in R26) and all((x+y)-(A+B) == (x-A)+(y-B) and abs((x+y)-(A+B)) <= abs(x-A)+abs(y-B) for x in R26[::3] for y in R26[::4] for A in R26[::5] for B in R26[::2]) and all(e/2+e/2 == e and e/2 > 0 and e+e == 2*e for e in G26) and all((n > N+1) == (n-1 > N) for n in range(1,40) for N in range(0,40)) and all(N1+N2+1 > N1 and N1+N2+1 > N2 for N1 in range(30) for N2 in range(30)), 'H26 teoremas 1, 2 y 3: identidades y desigualdades en rejilla')
# ejemplos
ok(abs(5-5) == 0 and all(0 < e for e in G26) and all(abs(c-c) == 0 for c in R26), 'H26 e1 (a) constante')
ok(all(abs(F(1,n)-0) == F(1,n) for n in range(1,300)) and all(all(n > 1/e and n*e > 1 and e > F(1,n) for n in range(ce26(1/e)+1, ce26(1/e)+50)) for e in G26) and 1/F('0.01') == 100 and 100*F('0.01') == 1 and rd26(F(1,101),4) == F('0.0099') < F('0.01') and F(1,101) < F(1,100) and 101 > 100 and F(1,100) == F('0.01') and not F(1,100) < F('0.01') and all(F(1,n) > 0 for n in range(1,300)), 'H26 e1 (b) 1/n → 0, ε = 0,01, N = 100')
c26 = lambda n: F(2*n+3, n+1)
ok([c26(1),c26(2),c26(3)] == [F(2*1+3,1+1),F(2*2+3,2+1),F(2*3+3,3+1)] == [F(5,2),F(7,3),F(9,4)] and F(5,2) == F('2.5') and rd26(F(7,3),2) == F('2.33') and F(9,4) == F('2.25') and all(c26(n)-2 == F(2*n+3,n+1)-F(2*(n+1),n+1) == F(2*n+3-2*(n+1),n+1) == F(1,n+1) and 2*(n+1) == 2*n+2 and 2*n+3-2*n-2 == 1 and abs(c26(n)-2) == F(1,n+1) for n in range(1,400)) and all(all(n+1 > n > 1/e - 1 and n+1 > 1/e and F(1,n+1) < e for n in range(ce26(1/e)+1, ce26(1/e)+50)) for e in G26), 'H26 e2 (2n+3)/(n+1) → 2')
ok(c26(101) == F(2*101+3,101+1) == F(205,102) and abs(c26(101)-2) == F(1,102) and rd26(F(1,102),4) == F('0.0098') < F('0.01') and all(F(1,n+1) <= F(1,101) < F(1,100) and n+1 >= 101 for n in range(100,500)) and F(1,99+1) == F(1,100) == F('0.01') and not abs(c26(99)-2) < F('0.01') and all(abs(c26(n)-2) < F('0.01') for n in range(100,600)), 'H26 e2 ε = 0,01: N = 100 y N = 99 sirven, N = 98 no')
ok([(-1)**n for n in (1,2,3,4)] == [-1,1,-1,1] and all((-1)**(2*N+2) == 1 and (-1)**(2*N+1) == -1 and 2*N+2 > N and 2*N+1 > N for N in range(0,200)) and all(-1-L == -(1+L) and abs(-1-L) == abs(1+L) and (1-L)+(1+L) == 2 and 2 <= abs(1-L)+abs(1+L) and not (abs(1-L) < 1 and abs(1+L) < 1) for L in [F(p,7) for p in range(-40,41)]) and 1+1 == 2 and not 2 < 2 and all(-1 <= (-1)**n <= 1 for n in range(1,50)), 'H26 e3 (−1)^n no tiene límite')
ok([2*1+1,2*2+1,2*3+1] == [3,5,7] and all(all(n > M/2 and 2*n > M and 2*n+1 > 2*n and 2*n+1 > M for n in range(ce26(M/2)+1, ce26(M/2)+40)) for M in G26 + [F(1000), F(37,2)]) and F(1000,2) == 500 and 2*501+1 == 1002+1 == 1003 > 1000 and all(abs(L)+1 > 0 and abs(L) >= L and abs(L)+1 >= L+1 for L in R26), 'H26 e4 2n+1 diverge a +∞, M = 1000, N = 500')
ok(all(abs(F(1,n+1)-(-1)) < abs(F(1,n)-(-1)) and abs(F(1,n)+1) > 1 for n in range(1,200)) and all(F(1,n) != 0 for n in range(1,200)), 'H26 errores frecuentes: 1/n se acerca a −1 sin tener límite −1')
# ejercicios
ok(all(abs(F(3,n)-0) == F(3,n) for n in range(1,100)) and all(all(n > 3/e and n*e > 3 and e > F(3,n) for n in range(ce26(3/e)+1, ce26(3/e)+40)) for e in G26) and 3/F('0.01') == 300 and 300*F('0.01') == 3 and rd26(F(3,301),5) == F('0.00997') < F('0.01') and F(3,301) < F('0.01'), 'H26 A (a) 3/n → 0, N = 300')
ok(all(F(4*n-1,n)-F(4*n,n) == F(4*n-1-4*n,n) == F(-1,n) and abs(F(-1,n)) == F(1,n) and abs(F(4*n-1,n)-4) == F(1,n) for n in range(1,300)) and 1/F('0.05') == 20 and 20*F('0.05') == 1 and rd26(F(1,21),3) == F('0.048') < F('0.05') and F(1,21) < F('0.05') and all(abs(F(4*n-1,n)-4) < F('0.05') for n in range(21,400)), 'H26 A (b) (4n−1)/n → 4, N = 20')
ok(all(abs(F((-1)**n,n)-0) == F(abs((-1)**n),n) == F(1,n) for n in range(1,300)) and all((F((-1)**n,n) > 0) != (F((-1)**(n+1),n+1) > 0) for n in range(1,100)), 'H26 A (c) (−1)^n/n → 0')
ok(2**1 == 2 > 1 and all(2**(n+1) == 2*2**n and (2**n <= n or 2*2**n > 2*n) and 2*n == n+n and n+n >= n+1 and 2**n > n and F(1,2**n) < F(1,n) and abs(F(1,2**n)-0) == F(1,2**n) for n in range(1,200)) and all(all(F(1,2**n) < F(1,n) < e for n in range(ce26(1/e)+1, ce26(1/e)+30)) for e in G26), 'H26 B (a)(b)(c) 2^n > n y 1/2^n → 0')
ok(F('0.01') == F(1,100) and all((F(1,2**n) < F(1,100)) == (2**n > 100) == (n > 6) for n in range(1,200)) and 2**6 == 64 and not 64 > 100 and 2**7 == 2*64 == 128 > 100 and rd26(F(1,128),4) == F('0.0078') < F('0.01') and rd26(F(1,64),4) == F('0.0156') and F(1,64) > F('0.01') and ce26(1/F('0.01')) == 100, 'H26 B (d) ε = 0,01: sirven N = 100 y N = 6; N = 5 no')
p26 = lambda n: F(4 + 7*(n-1), n)
ok(all(4 + sum(7 for k in range(2,n+1)) == 4+7*(n-1) == 4+7*n-7 == 7*n-3 and p26(n) == F(7*n-3,n) for n in range(1,200)) and p26(1) == F(7-3,1) == 4 and p26(2) == F(14-3,2) == F(11,2) == F('5.5') == F(4+7,2), 'H26 C (a) promedio (7n − 3)/n')
ok(all(p26(n)-7 == F(7*n-3,n)-F(7*n,n) == F(7*n-3-7*n,n) == F(-3,n) and abs(p26(n)-7) == F(3,n) and 7-p26(n) == F(3,n) > 0 and p26(n) < 7 for n in range(1,400)) and all(all(F(3,n) < e for n in range(ce26(3/e)+1, ce26(3/e)+30)) for e in G26), 'H26 C (b)(d) límite 7 y nunca llega')
ok(3/F('0.1') == 30 and 30*F('0.1') == 3 and all((F(3,n) < F('0.1')) == (n > 30) == (p26(n) > F('6.9')) for n in range(1,400)) and p26(31) == F(7*31-3,31) == F(217-3,31) == F(214,31) and 7*31 == 217 and rd26(F(214,31),3) == F('6.903') and p26(31) > F('6.9') and p26(30) == F(7*30-3,30) == F(207,30) == F('6.9') and 7-p26(30) == F('0.1') and not F('0.1') < F('0.1'), 'H26 C (c) desde la prueba 31')
# H27 ---- Sucesiones monótonas acotadas
def rd27(x, d):
    q = F(x)*10**d; n = q.numerator//q.denominator
    if q - n >= F(1,2): n += 1
    return F(n, 10**d)
def ce27(x): return -((-F(x).numerator)//F(x).denominator)
def a27(n): return F(n, n+1)
G27 = [F(p, q) for q in range(1, 41) for p in range(1, 2*q+1)]
RG27 = range(1, 400)
# mon-idea, paso 1 (lectura y registro R1)
ok([a27(n) for n in (1,2,3,4,5,12)] == [F(1,1+1),F(2,2+1),F(3,3+1),F(4,4+1),F(5,5+1),F(12,12+1)] == [F(1,2),F(2,3),F(3,4),F(4,5),F(5,6),F(12,13)], 'H27 mon-idea paso 1: términos')
ok(F(1,2) == F('0.5') and rd27(F(2,3),2) == F('0.67') and F(3,4) == F('0.75') and F(4,5) == F('0.8') and rd27(F(5,6),2) == F('0.83') and rd27(F(12,13),2) == F('0.92'), 'H27 mon-idea paso 1: decimales')
# paso 2: el salto
ok(all(a27(n+1)-a27(n) == F(n+1,n+2)-F(n,n+1) == F((n+1)*(n+1)-n*(n+2), (n+1)*(n+2)) == F(1,(n+1)*(n+2)) > 0 for n in RG27), 'H27 mon-idea paso 2: salto = 1/((n+1)(n+2)) > 0')
ok(all((n+1)*(n+1) == n**2+2*n+1 and n*(n+2) == n**2+2*n and n**2+2*n+1-(n**2+2*n) == 1 for n in range(-50, 400)), 'H27 mon-idea paso 2: productos y resta')
ok(a27(2)-a27(1) == F(1,2*3) == F(1,6) and rd27(F(1,6),2) == F('0.17') and a27(3)-a27(2) == F(1,3*4) == F(1,12) and rd27(F(1,12),2) == F('0.08'), 'H27 mon-idea paso 2: saltos 1/6 y 1/12')
ok(all(a27(n+1) > a27(n) for n in RG27) and all(a27(m) <= a27(n) for m in range(1,40) for n in range(m,80)), 'H27 mon-idea paso 2: creciente (y a_m <= a_n si m <= n)')
# paso 3: el techo
ok(all(1-a27(n) == F(n+1,n+1)-F(n,n+1) == F(n+1-n,n+1) == F(1,n+1) > 0 and a27(n) < 1 and a27(n) == 1-F(1,n+1) and a27(n) >= a27(1) == F(1,2) for n in RG27), 'H27 mon-idea paso 3: 1 − a_n = 1/(n+1), cota superior 1, cota inferior 1/2')
# paso 4: 0,75 no es techo
ok(1-F(1,4) == F(3,4) == F('0.75') and all((a27(n) > F('0.75')) == (F(1,n+1) < F(1,4)) == (n+1 > 4) == (n > 3) for n in RG27) and a27(3) == F('0.75') and not a27(3) > F('0.75') and a27(4) == F('0.8') > F('0.75'), 'H27 mon-idea paso 4: 0,75 no es cota superior; a_3 justo en la línea')
# paso 5: N = 3
ok(all(a27(n) >= a27(4) and F('0.75') < a27(n) < 1 < F('1.25') and 1-F(1,4) < a27(n) < 1+F(1,4) and abs(a27(n)-1) < F(1,4) for n in range(4,400)) and not abs(a27(3)-1) < F(1,4) and 1+F(1,4) == F('1.25'), 'H27 mon-idea paso 5: n > 3 ⟹ |a_n − 1| < 1/4')
# paso 6: cualquier ε; ε = 1/10 con N = 9
ok(all((F(1,n+1) < e) == (n+1 > 1/e) for e in G27 for n in range(1,90)) and all(ce27(1/e) >= 1/e and all(1-e < a27(n) < 1 < 1+e and abs(a27(n)-1) < e for n in range(ce27(1/e)+1, ce27(1/e)+50)) for e in G27), 'H27 mon-idea paso 6: N >= 1/ε sirve para todo ε de la rejilla')
ok(all((F(1,n+1) < F(1,10)) == (n+1 > 10) == (n > 9) == (a27(n) > F('0.9')) for n in RG27) and a27(10) == F(10,11) and rd27(F(10,11),2) == F('0.91') and F(10,11) > F('0.9') and 1-F(1,10) == F('0.9') and not a27(9) > F('0.9') and all(F('0.9') < a27(n) < 1 for n in range(10,400)), 'H27 mon-idea paso 6: ε = 1/10, N = 9')
ok(all(any(a27(n) > 1-e for n in range(1, ce27(1/e)+2)) for e in G27) and all(a27(n) <= 1 for n in RG27), 'H27 mon-idea paso 6: ningún 1 − ε es cota superior; 1 es el supremo')
ok([n for n in range(1,13) if n > 3] == list(range(4,13)) and [n for n in range(1,13) if n > 9] == [10,11,12], 'H27 mon-idea: puntos verdes (4 a 12) y anillos (10 a 12)')
# mon-vivo: a_{n+1} = (a_n + 6)/2, a_1 = c, c = 0..12 (todas las posiciones del deslizador)
def t27(c, n):
    x = F(c)
    for _ in range(n-1): x = (x+6)/2
    return x
for c27 in range(0, 13):
    T27 = [t27(c27, n) for n in range(1, 41)]
    ok(all(T27[n-1] == 6 + F(c27-6, 2**(n-1)) for n in range(1,41)), f'H27 mon-vivo c={c27}: fórmula cerrada del dibujo')
    ok(all(T27[i+1] == (T27[i]+6)/2 and (T27[i]*1000).denominator == 1 and ((T27[i]+6)*1000).denominator == 1 for i in range(0,3)) and (T27[3]*1000).denominator == 1, f'H27 mon-vivo c={c27}: a_2, a_3, a_4 exactos con a lo más 3 decimales')
    ok(F(6-c27,2) == T27[1]-c27 == (F(c27)+6)/2 - F(2*c27,2) and all(T27[i+1]-T27[i] == (T27[i]+6)/2-F(2*T27[i],2) == (6-T27[i])/2 for i in range(39)), f'H27 mon-vivo c={c27}: salto = (6 − a_n)/2 y primer salto')
    ok(all(T27[i+1]-6 == (T27[i]+6)/2-F(12,2) == (T27[i]-6)/2 for i in range(39)) and F(12,2) == 6 and T27[0]-6 == c27-6, f'H27 mon-vivo c={c27}: a_(n+1) − 6 = (a_n − 6)/2')
    ok(all(T27[i+2]-T27[i+1] == (T27[i+1]-T27[i])/2 for i in range(38)), f'H27 mon-vivo c={c27}: cada salto es la mitad del anterior')
    if c27 < 6: ok(c27-6 < 0 and all(c27 <= x < 6 for x in T27) and all(T27[i+1] > T27[i] for i in range(39)), f'H27 mon-vivo c={c27}: creciente, entre c y 6')
    elif c27 > 6: ok(c27-6 > 0 and all(6 < x <= c27 for x in T27) and all(T27[i+1] < T27[i] for i in range(39)), f'H27 mon-vivo c={c27}: decreciente, entre 6 y c')
    else: ok(all(x == 6 for x in T27) and F(6-6,2) == 0 == F(0,2), 'H27 mon-vivo c=6: constante')
    ok(abs(T27[39]-6) == F(abs(c27-6), 2**39) < F(1,10**9), f'H27 mon-vivo c={c27}: se acerca a 6')
ok([t27(2,n) for n in (1,2,3,4)] == [2,4,5,F('5.5')] and [t27(0,n) for n in (1,2,3,4)] == [0,3,F('4.5'),F('5.25')] and [t27(12,n) for n in (1,2,3,4)] == [12,9,F('7.5'),F('6.75')] and [t27(5,n) for n in (2,3,4)] == [F('5.5'),F('5.75'),F('5.875')] and [t27(7,n) for n in (2,3,4)] == [F('6.5'),F('6.25'),F('6.125')], 'H27 mon-vivo: rótulos de términos vistos en las capturas')
ok(all((2*L == L+6) == (L == 6) == (L == (L+6)/2) for L in [F(p,4) for p in range(-80,81)]), 'H27 L = (L+6)/2 ⟺ 2L = L+6 ⟺ L = 6')
# ejemplo 1
ok(all(a27(n+1)/a27(n) == F(n+1,n+2)*F(n+1,n) == F((n+1)*(n+1), n*(n+2)) == F(n**2+2*n+1, n**2+2*n) == F(n**2+2*n,n**2+2*n)+F(1,n**2+2*n) == 1+F(1,n**2+2*n) > 1 for n in RG27), 'H27 e1: cociente = 1 + 1/(n²+2n) > 1')
ok(all(abs(a27(n)-1) == abs(-F(1,n+1)) == F(1,n+1) for n in RG27) and all(n+1 > n > ce27(1/e) >= 1/e and e > F(1,n+1) for e in G27 for n in range(ce27(1/e)+1, ce27(1/e)+40)), 'H27 e1: límite 1 con ε–N')
# ejemplo 2
E27 = [t27(2,n) for n in range(1,61)]
ok(E27[:6] == [2, F(2+6,2), F(4+6,2), F(5+6,2), (F('5.5')+6)/2, (F('5.75')+6)/2] == [2, F(8,2), F(10,2), F(11,2), F('11.5')/2, F('11.75')/2] == [2,4,5,F('5.5'),F('5.75'),F('5.875')], 'H27 e2: términos')
ok(all(x < 6 and x+6 < 12 and (x+6)/2 < 6 for x in E27) and all(E27[i+1]-E27[i] == F(E27[i]+6-2*E27[i],2) == (6-E27[i])/2 > 0 for i in range(59)) and F(6+6,2) == F(12,2) == 6, 'H27 e2: cota 6, creciente, comprobación del límite')
ok(all((x+6)/2-(L+6)/2 == (x-L)/2 and abs((x-L)/2) == abs(x-L)/2 <= abs(x-L) for x in [F(p,3) for p in range(-30,31)] for L in [F(q,2) for q in range(-20,21)]), 'H27 e2: comprobación directa del límite de (a_n + 6)/2')
ok(all(2**(n-1) >= 1 and 2*2**(n-1) == 2**n >= 2 for n in range(1,200)) and [2**(n-1) for n in (1,2,3,4)] == [1,2,4,8] and all((L == 2*L) == (L == 0) for L in range(-20,21)), 'H27 e2: b_n = 2·b_(n−1) ≥ 1; L = 2L ⟺ L = 0')
# ejemplo 3
def d27(n): return F(n, 2**n)
ok([d27(n) for n in (1,2,3,4,5)] == [F(1,2),F(2,4),F(3,8),F(4,16),F(5,32)] and F(2,4) == F(1,2) and F(4,16) == F(1,4) and all(d27(n) > 0 for n in RG27), 'H27 e3: términos')
ok(all(d27(n+1)/d27(n) == F(n+1,2**(n+1))*F(2**n,n) == F(n+1,2*n) and 2**(n+1) == 2*2**n and (F(n+1,2*n) <= 1) == (n+1 <= 2*n) == (1 <= n) and d27(n+1) <= d27(n) and d27(n+1) == F(n+1,2*n)*d27(n) for n in RG27) and F(1+1,2*1) == F(2,2) == 1 and d27(2) == d27(1) and all(F(n+1,2*n) < 1 and d27(n+1) < d27(n) for n in range(2,400)), 'H27 e3: cociente (n+1)/(2n) ≤ 1; decreciente, no estricta en n = 1')
ok(all(F(n+1,2*n) == F(n,2*n)+F(1,2*n) == F(1,2)+F(1,2)*F(1,n) for n in RG27) and F(1,2)*0 == 0 and F(1,2)+0 == F(1,2) and all((L == L/2) == (L-L/2 == 0) == (L/2 == 0) == (L == 0) for L in [F(p,4) for p in range(-40,41)]) and all(0 < d27(n) <= d27(1) == F(1,2) for n in RG27), 'H27 e3: (n+1)/(2n) = 1/2 + (1/2)(1/n); L = L/2 ⟺ L = 0; cotas')
ok(d27(10) == F(10,2**10) == F(10,1024) and 2**10 == 1024 and rd27(F(10,1024),4) == F('0.0098') and d27(200) < F(1,10**50), 'H27 e3: a_10 ≈ 0,0098')
# ejemplo 4
ok([(-1)**n for n in (1,2,3,4)] == [-1,1,-1,1] and all(-1 <= (-1)**n <= 1 for n in RG27) and (-1)**3 < (-1)**2 and (-1)**2 > (-1)**1, 'H27 e4 (a)')
ok(all((n+1)-n == 1 > 0 and n >= 1 for n in RG27) and all(ce27(M+1) >= M+1 > M for M in [F(p,7) for p in range(-50,500)]), 'H27 e4 (b): n no tiene cota superior')
ok([F((-1)**n,n) for n in (1,2,3,4)] == [-1,F(1,2),-F(1,3),F(1,4)] and F(1,2) > -1 and -F(1,3) < F(1,2) and all(abs(F((-1)**n,n)) == F(1,n) <= 1 and -1 <= F((-1)**n,n) <= 1 for n in RG27), 'H27 e4 (c)')
ok(all(a27(n) <= 2 for n in RG27) and all(-n <= -1 for n in RG27) and all(any(-n < -K for n in range(1, K+3)) for K in range(1,60)), 'H27 errores frecuentes: 2 es cota de n/(n+1); −n tiene cota superior −1 y no inferior')
# ejercicio A
ok(all((2-F(1,n+1))-(2-F(1,n)) == F(1,n)-F(1,n+1) == F(n+1-n,n*(n+1)) == F(1,n*(n+1)) > 0 and 1 <= 2-F(1,n) < 2 and abs(2-F(1,n)-2) == abs(-F(1,n)) == F(1,n) for n in RG27) and 2-1 == 1 and all(F(1,n) < e for e in G27 for n in range(ce27(1/e)+1, ce27(1/e)+40)), 'H27 A (a)')
ok(all(F(5,n+1)/F(5,n) == F(5,n+1)*F(n,5) == F(n,n+1) < 1 and F(5,n+1) < F(5,n) and 0 < F(5,n) <= 5 and abs(F(5,n)-0) == F(5,n) for n in RG27) and all(ce27(5/e) >= 5/e and all(n > 5/e and n*e > 5 and F(5,n) < e for n in range(ce27(5/e)+1, ce27(5/e)+40)) for e in G27), 'H27 A (b)')
ok(all((n+1)**2-n**2 == n**2+2*n+1-n**2 == 2*n+1 > 0 and n**2 >= n for n in RG27) and all(ce27(M+1)**2 >= ce27(M+1) >= M+1 > M for M in [F(p,7) for p in range(0,500)]), 'H27 A (c)')
# ejercicio B
def b27(n):
    x = F(10)
    for _ in range(n-1): x = x/2+1
    return x
ok([b27(n) for n in (2,3,4,5)] == [F(10,2)+1, F(6,2)+1, F(4,2)+1, F(3,2)+1] == [5+1, 3+1, 2+1, F('1.5')+1] == [6,4,3,F('2.5')] and F(3,2) == F('1.5'), 'H27 B (a)')
ok(all(b27(n) > 2 and b27(n)/2 > 1 and b27(n)/2+1 > 2 and b27(n+1)-b27(n) == b27(n)/2+1-b27(n) == 1-b27(n)/2 < 0 and b27(n)/2-b27(n) == -b27(n)/2 for n in range(1,80)), 'H27 B (b)(c)')
ok(all((L == L/2+1) == (L/2 == 1) == (L == 2) for L in [F(p,4) for p in range(-40,41)]) and F(2,2)+1 == 1+1 == 2 and all((x/2+1)-(L/2+1) == (x-L)/2 and abs(x-L)/2 <= abs(x-L) for x in [F(p,3) for p in range(-30,31)] for L in [F(q,2) for q in range(-20,21)]), 'H27 B (d)')
ok(10-2 == 8 and F(8,2**(1-1)) == F(8,2**0) == F(8,1) == 8 and all(b27(n)-2 == F(8,2**(n-1)) > 0 and b27(n+1)-2 == b27(n)/2+1-2 == b27(n)/2-1 == (b27(n)-2)/2 == F(8,2*2**(n-1)) == F(8,2**n) for n in range(1,80)), 'H27 B (e): a_n − 2 = 8/2^(n−1)')
ok(all((F(8,2**(n-1)) < F(1,100)) == (800 < 2**(n-1)) == (n-1 >= 10) == (n >= 11) for n in range(1,80)) and 2**9 == 512 and not 512 > 800 and 2**10 == 1024 > 800 and F('0.01') == F(1,100) and b27(11)-2 == F(8,1024) == F(1,128) and rd27(F(1,128),4) == F('0.0078') and F(1,128) < F('0.01') and b27(10)-2 == F(8,512) == F(1,64) and rd27(F(1,64),4) == F('0.0156') and F(1,64) > F('0.01'), 'H27 B (e): desde el término 11')
# ejercicio C
def c27f(n):
    x = F(40)
    for _ in range(n-1): x = F(3,4)*x+30
    return x
ok(all(x-F(1,4)*x == F(3,4)*x for x in range(0,200)) and [c27f(2), c27f(3), c27f(4)] == [F(3,4)*40+30, F(3,4)*60+30, F(3,4)*75+30] == [30+30, 45+30, F('56.25')+30] == [60, 75, F('86.25')] and F(3,4)*40 == 30 and F(3,4)*60 == 45 and F(3,4)*75 == F('56.25'), 'H27 C (a)')
ok(40 < 120 and F(3,4)*120 == 90 and 90+30 == 120 and 120 < 150 and all(c27f(n) < 120 and F(3,4)*c27f(n) < 90 and c27f(n+1)-c27f(n) == F(3,4)*c27f(n)+30-c27f(n) == 30-F(1,4)*c27f(n) > 0 and c27f(n)/4 < 30 and F(3,4)*c27f(n)-c27f(n) == -F(1,4)*c27f(n) for n in range(1,120)), 'H27 C (b)(c)')
ok(all((L == F(3,4)*L+30) == (F(1,4)*L == 30) == (L == 120) for L in [F(p,2) for p in range(0,600)]) and F(3,4)*120+30 == 90+30 == 120 and all((F(3,4)*x+30)-(F(3,4)*L+30) == F(3,4)*(x-L) and F(3,4)*abs(x-L) <= abs(x-L) for x in [F(p,3) for p in range(-30,31)] for L in [F(q,2) for q in range(-20,21)]) and 120-c27f(200) < F(1,10**20), 'H27 C (d): L = 120')
ok(c27f(5) == F(3,4)*F('86.25')+30 == F('64.6875')+30 == F('94.6875') and not c27f(5) > 100 and c27f(6) == F(3,4)*F('94.6875')+30 == F('71.015625')+30 == F('101.015625') > 100 and rd27(c27f(6),2) == F('101.02') and min(n for n in range(1,50) if c27f(n) > 100) == 6 and all(c27f(n) > 100 for n in range(6,120)) and F(1,4)*120 == 30, 'H27 C (e)(f)')
# H28 · Una función como una serie geométrica: registros y lecturas de fge-idea (7 pasos) y fge-vivo (13 posiciones de x), recuadros, ejemplos 1-4 y ejercicios A, B, C
def s28(x, N): return sum(x**n for n in range(N+1))
def g28(a, r, N): return sum(a*r**n for n in range(N+1))
def f28(x): return 1/(1-x)
def rd28(v, d): return (1 if v >= 0 else -1)*F(math.floor(abs(v)*10**d + F(1,2)), 10**d)
def ap28(v): return ('=', v) if 1000 % v.denominator == 0 else ('~', rd28(v, 3 if abs(v) < F(1,10) else 2))
RJ28 = [F(p,q) for q in (1,2,3,4,5,7) for p in range(-3*q, 3*q+1)]
AJ28 = [F(1), F(-2), F(3,4), F(1000), F(1,2)]
# recuadro k2: (1 − x)·sN = 1 − x^(N+1) para todo x; sN = (1 − x^(N+1))/(1 − x) y f − sN = x^(N+1)/(1 − x) si x ≠ 1
ok(all(x*s28(x,N) == sum(x**n for n in range(1,N+2)) and s28(x,N) - x*s28(x,N) == 1 - x**(N+1) == (1-x)*s28(x,N) for x in RJ28 for N in range(0,9)), 'H28 k2: (1 − x)(1 + x + … + x^N) = 1 − x^(N+1), en rejilla (incluye x = 1)')
ok(all(s28(x,N) == (1-x**(N+1))/(1-x) == f28(x) - x**(N+1)/(1-x) and f28(x) - s28(x,N) == x**(N+1)/(1-x) == x**(N+1)*f28(x) for x in RJ28 if x != 1 for N in range(0,9)), 'H28 k2: sN = (1 − x^(N+1))/(1 − x) y f − sN = x^(N+1)/(1 − x), x ≠ 1')
ok(all(abs(f28(x) - s28(x,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(3,4)) and all(abs(f28(x) - s28(x,N+1)) >= abs(f28(x) - s28(x,N)) for x in RJ28 if abs(x) >= 1 and x != 1 for N in range(0,9)), 'H28 k2: con |x| < 1 las sumas parciales se acercan a 1/(1 − x); con |x| ≥ 1 la diferencia no se achica')
ok(all(abs(x**n) == abs(x)**n and (abs(x)**n >= 1) == (abs(x) >= 1 or n == 0) for x in RJ28 for n in range(0,8)), 'H28 k2 cuarta parte: |xⁿ| = |x|ⁿ ≥ 1 si |x| ≥ 1')
ok([s28(F(1),N) for N in range(5)] == [1,2,3,4,5] and all(s28(F(1),N) == N+1 for N in range(40)) and 1-1 == 0, 'H28 k2: x = 1, sN = N + 1 y denominador 0')
ok(f28(F(-1)) == F(1,1-(-1)) == F(1,1+1) == F(1,2) and [s28(F(-1),N) for N in range(6)] == [1,0,1,0,1,0], 'H28 k2: x = −1, f = 1/2 y sumas 1, 0, 1, 0')
ok(f28(F(2)) == F(1,1-2) == F(1,-1) == -1 and [s28(F(2),N) for N in range(4)] == [1,3,7,15] and [F(2)**n for n in range(4)] == [1,2,4,8], 'H28 k2: x = 2, f = −1 y sumas 1, 3, 7, 15')
ok(all(a/(1-r) - g28(a,r,N) == a*r**(N+1)/(1-r) == r**(N+1)*(a/(1-r)) and g28(a,r,N) == sum(a*r**(n-1) for n in range(1,N+2)) for a in AJ28 for r in RJ28 if r != 1 for N in range(0,8)), 'H28 k2 quinta parte: a/(1 − r) − Σ a·rⁿ (n ≤ N) = r^(N+1)·a/(1 − r); mismos N + 1 términos que H24')
ok(all(F(0)/(1-r) == 0 == g28(F(0),r,N) for r in RJ28 if r != 1 for N in range(6)), 'H28 k1: si a = 0, serie y fracción valen 0')
# fge-idea: lectura y registro, paso por paso
ok(f28(F(0)) == F(1,1-0) == F(1,1) == 1 and f28(F(-1)) == F(1,2) and 1-F(3,2) == -F(1,2) and f28(F(3,2)) == 1/(-F(1,2)) == -2 and 1-1 == 0, 'H28 idea paso 1: f(0) = 1, f(−1) = 1/2, f(3/2) = −2')
ok(all(s28(x,0) == x**0 == 1 and s28(x,1) == 1+x for x in RJ28) and s28(F(0),0) == 1 and s28(F(0),1) == 1+0 == 1 == f28(F(0)), 'H28 idea paso 2: s0 = 1, s1 = 1 + x; en 0 valen 1')
ok(all(s28(x,2) == s28(x,1)+x**2 == 1+x+x**2 and s28(x,3) == s28(x,2)+x**3 == 1+x+x**2+x**3 for x in RJ28), 'H28 idea pasos 3 y 4: s2 y s3')
ok(F(1,2)**2 == F(1,4) and F(1,2)**3 == F(1,8) and 1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and F(3,2)+F(1,4) == F(6,4)+F(1,4) == F(7,4) and F(7,4)+F(1,8) == F(14,8)+F(1,8) == F(15,8) and [s28(F(1,2),N) for N in range(4)] == [1,F(3,2),F(7,4),F(15,8)] and f28(F(1,2)) == 1/(1-F(1,2)) == 1/F(1,2) == 2, 'H28 idea paso 5 (R5): en 1/2 las sumas 1, 3/2, 7/4, 15/8 y f = 2')
ok(2-1 == 1 and 2-F(3,2) == F(4,2)-F(3,2) == F(1,2) and 2-F(7,4) == F(8,4)-F(7,4) == F(1,4) and 2-F(15,8) == F(16,8)-F(15,8) == F(1,8) and all(2-s28(F(1,2),N+1) == (2-s28(F(1,2),N))/2 == F(1,2)**(N+2)*2 for N in range(8)), 'H28 idea paso 5: falta 1, 1/2, 1/4, 1/8; cada vez la mitad')
ok(F(-3,2)**2 == F(9,4) and F(-3,2)**3 == -F(27,8) and 1-F(3,2) == F(2,2)-F(3,2) == -F(1,2) and -F(1,2)+F(9,4) == -F(2,4)+F(9,4) == F(7,4) and F(7,4)-F(27,8) == F(14,8)-F(27,8) == -F(13,8) and [s28(F(-3,2),N) for N in range(4)] == [1,-F(1,2),F(7,4),-F(13,8)] and f28(F(-3,2)) == 1/(1+F(3,2)) == 1/F(5,2) == F(2,5) == F('0.4'), 'H28 idea paso 6 (R6): en −3/2 las sumas 1, −1/2, 7/4, −13/8 y f = 2/5')
ok(1-F(2,5) == F(5,5)-F(2,5) == F(3,5) == F('0.6') and F(2,5)+F(1,2) == F(4,10)+F(5,10) == F(9,10) == F('0.9') and F(7,4)-F(2,5) == F(35,20)-F(8,20) == F(27,20) == F('1.35') and F(2,5)+F(13,8) == F(16,40)+F(65,40) == F(81,40) == F('2.025') and [abs(s28(F(-3,2),N)-F(2,5)) for N in range(4)] == [F(3,5),F(9,10),F(27,20),F(81,40)] and F(3,5) < F(9,10) < F(27,20) < F(81,40), 'H28 idea paso 6: distancias 3/5, 9/10, 27/20, 81/40, crecientes')
ok(all((abs(x) < 1) == (-1 < x < 1) for x in RJ28) and abs(F(-3,2)) > 1 and abs(F(1,2)) < 1, 'H28 idea paso 7 (R7): |x| < 1 equivale a −1 < x < 1; 1/2 dentro y −3/2 fuera')
ok(-1.6 <= -1.5 and all(-2.5 <= float(v) <= 4 for v in [s28(F(-3,2),N) for N in range(4)]+[s28(F(1,2),N) for N in range(4)]+[F(2,5),F(2)]) and abs(sum((-1.6)**n for n in range(4)) - (-2.136)) < 1e-9, 'H28 idea: los valores marcados caben en la gráfica (de −2,5 a 4)')
# fge-vivo: las 13 posiciones de x (de −3/2 a 3/2, de 1/4 en 1/4), con los valores que escribe la escena
XS28 = [F(k-6,4) for k in range(13)]
SV28 = [F(-13,8),F(-41,64),F(0),F(25,64),F(5,8),F(51,64),F(1),F(85,64),F(15,8),F(175,64),F(4),F(369,64),F(65,8)]
FV28 = [F(2,5),F(4,9),F(1,2),F(4,7),F(2,3),F(4,5),F(1),F(4,3),F(2),F(4),None,F(-4),F(-2)]
DV28 = [F(81,40),F(625,576),F(1,2),F(81,448),F(1,24),F(1,320),F(0),F(1,192),F(1,8),F(81,64),None,F(-625,64),F(-81,8)]
ok(XS28[0] == F(-3,2) and XS28[6] == 0 and XS28[10] == 1 and XS28[2] == -1 and XS28[12] == F(3,2) and [s28(x,3) for x in XS28] == SV28, 'H28 vivo: s3(x) en las 13 posiciones')
ok([None if x == 1 else f28(x) for x in XS28] == FV28 and [None if x == 1 else f28(x)-s28(x,3) for x in XS28] == DV28, 'H28 vivo: f(x) y f(x) − s3(x) en las 13 posiciones')
ok(all(d == x**4/(1-x) == x**4*fv for x, fv, d in zip(XS28, FV28, DV28) if x != 1), 'H28 vivo: la diferencia es x⁴/(1 − x) = x⁴·f(x)')
def pasos28(x):
    q = x.denominator; p2 = x*x; p3 = p2*x; p4 = p3*x; a1 = 1+x; a2 = a1+p2; a3 = a2+p3; w = 1-x; fv = 1/w; d = fv-a3
    D = fv.denominator*a3.denominator//math.gcd(fv.denominator, a3.denominator)
    return (p2 == F(x.numerator**2, q**2) and p3 == F(x.numerator**3, q**3) and p4 == F(x.numerator**4, q**4)
        and a1 == F(q + x.numerator, q) and a1.denominator == q and a2 == F(a1.numerator*q + p2.numerator, q*q) and a2.denominator == q*q and a3 == F(a2.numerator*q + p3.numerator, q**3) and a3.denominator == q**3
        and w == F(q - x.numerator, q) and fv == F(w.denominator, w.numerator) and d == F(fv.numerator*(D//fv.denominator) - a3.numerator*(D//a3.denominator), D) and d.denominator == D
        and F(p4.numerator*fv.numerator, p4.denominator*fv.denominator) == d and math.gcd(p4.numerator*fv.numerator, p4.denominator*fv.denominator) == q
        and d*x == x**5/(1-x) == fv - s28(x,4) and (d*x).denominator == d.denominator*q and ((abs(d*x) < abs(d)) == (abs(x) < 1)))
ok(all(pasos28(x) for x in XS28 if x.denominator > 1) and len([x for x in XS28 if x.denominator > 1]) == 10, 'H28 vivo: cada línea de la cuenta en las 10 posiciones no enteras (amplificaciones, denominador común, simplificación por q, un término más)')
ok(F(-5,4)**2 == F(25,16) and F(25,16)*F(-5,4) == -F(125,64) and 1-F(5,4) == -F(1,4) and -F(1,4)+F(25,16) == -F(4,16)+F(25,16) == F(21,16) and F(21,16)-F(125,64) == F(84,64)-F(125,64) == -F(41,64) and 1+F(5,4) == F(9,4) and F(4,9)+F(41,64) == F(256,576)+F(369,576) == F(625,576) and F(625,256)*F(4,9) == F(2500,2304) == F(625,576) and F(625,576)*F(-5,4) == -F(3125,2304), 'H28 vivo x = −5/4, línea por línea')
ok(F(3,4)**2 == F(9,16) and F(9,16)*F(3,4) == F(27,64) and 1+F(3,4) == F(7,4) and F(7,4)+F(9,16) == F(28,16)+F(9,16) == F(37,16) and F(37,16)+F(27,64) == F(148,64)+F(27,64) == F(175,64) and 1-F(3,4) == F(1,4) and 1/F(1,4) == 4 and 4-F(175,64) == F(256,64)-F(175,64) == F(81,64) and F(27,64)*F(3,4) == F(81,256) and F(81,256)*4 == F(324,256) == F(81,64) and F(81,64)*F(3,4) == F(243,256), 'H28 vivo x = 3/4, línea por línea')
ok(F(3,2)**2 == F(9,4) and F(9,4)*F(3,2) == F(27,8) and 1+F(3,2) == F(5,2) and F(5,2)+F(9,4) == F(10,4)+F(9,4) == F(19,4) and F(19,4)+F(27,8) == F(38,8)+F(27,8) == F(65,8) and 1-F(3,2) == -F(1,2) and 1/(-F(1,2)) == -2 and -2-F(65,8) == -F(16,8)-F(65,8) == -F(81,8) and F(27,8)*F(3,2) == F(81,16) and F(81,16)*(-2) == -F(162,16) == -F(81,8) and -F(81,8)*F(3,2) == -F(243,16), 'H28 vivo x = 3/2, línea por línea')
ok([ap28(v) for v in SV28 if v.denominator > 1] == [('=',F('-1.625')),('~',F('-0.64')),('~',F('0.39')),('=',F('0.625')),('~',F('0.80')),('~',F('1.33')),('=',F('1.875')),('~',F('2.73')),('~',F('5.77')),('=',F('8.125'))], 'H28 vivo: decimales de s3 (exactos o redondeados a 2)')
ok([ap28(v) for v in FV28 if v is not None and v.denominator > 1] == [('=',F('0.4')),('~',F('0.44')),('=',F('0.5')),('~',F('0.57')),('~',F('0.67')),('=',F('0.8')),('~',F('1.33'))], 'H28 vivo: decimales de f')
ok([ap28(v) for v in DV28 if v is not None and v.denominator > 1] == [('=',F('2.025')),('~',F('1.09')),('=',F('0.5')),('~',F('0.18')),('~',F('0.042')),('~',F('0.003')),('~',F('0.005')),('=',F('0.125')),('~',F('1.27')),('~',F('-9.77')),('=',F('-10.125'))], 'H28 vivo: decimales de la diferencia')
ok([ap28(d*x) for x, d in zip(XS28, DV28) if x.denominator > 1] == [('~',F('-3.04')),('~',F('-1.36')),('~',F('-0.14')),('~',F('-0.021')),('~',F('-0.001')),('~',F('0.001')),('~',F('0.063')),('~',F('0.95')),('~',F('-12.21')),('~',F('-15.19'))] and [d*x for x, d in zip(XS28, DV28) if x.denominator > 1] == [F(-243,80),F(-3125,2304),F(-243,1792),F(-1,48),F(-1,1280),F(1,768),F(1,16),F(243,256),F(-3125,256),F(-243,16)], 'H28 vivo: la diferencia con un término más y su decimal')
ok(s28(F(0),3) == 1+0+0+0 == 1 and f28(F(0)) == 1 and 1-1 == 0 and F(0)**4*1 == 0 and abs(F(0)) < 1, 'H28 vivo x = 0: caso límite, diferencia 0')
ok(1+1 == 2 and 2+1 == 3 and 3+1 == 4 and s28(F(1),3) == 4 and 1-1 == 0 and not abs(F(1)) < 1, 'H28 vivo x = 1: s3 = 4, sin función ni suma')
ok((-1)*(-1) == 1 and 1*(-1) == -1 and 1-1 == 0 and 0+1 == 1 and s28(F(-1),3) == 0 and 1-(-1) == 1+1 == 2 and f28(F(-1)) == F(1,2) == F('0.5') and F(1,2)-0 == F(1,2) and (-1)**4*F(1,2) == F(1,2) and F(1,2)*(-1) == -F(1,2) and not abs(F(-1)) < 1, 'H28 vivo x = −1: f = 1/2, s3 = 0, la diferencia no se achica')
ok(all(-4.5 <= float(v) <= 8.5 for v in SV28+[v for v in FV28 if v is not None]) and all(-1.6 <= float(x) <= 1.6 for x in XS28) and [1 if k <= 8 else -1 for k in range(13)].count(1) == 9, 'H28 vivo: todos los valores caben en la gráfica (de −4,5 a 8,5)')
ok(F(65,8) == F('8.125') and f28(F(3,2)) == -2 and DV28[8] == F(1,8), 'H28 «cómo leer» de fge-vivo: 1/8 en 0,5; −2 y 65/8 en 1,5')
# ejemplo 1: 1/(1 + x)
ok(all(F(1)/(1+x) == 1/(1-(-x)) and (-x)**n == (-1)**n*x**n and (abs(-x) < 1) == (abs(x) < 1) == (-1 < x < 1) for x in RJ28 if x != -1 for n in range(7)) and [(-1)**n for n in range(4)] == [1,-1,1,-1], 'H28 e1: forma, (−x)ⁿ = (−1)ⁿxⁿ e intervalo')
ok(all(abs(F(1)/(1+x) - g28(F(1),-x,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(3,4)), 'H28 e1: la serie se acerca a 1/(1 + x) dentro del intervalo')
ok(1+F(1,2) == F(2,2)+F(1,2) == F(3,2) and 1/F(3,2) == F(2,3) and g28(F(1),F(-1,2),3) == 1-F(1,2)+F(1,4)-F(1,8) == F(8,8)-F(4,8)+F(2,8)-F(1,8) == F(5,8) and F(-1,2)**4 == F(1,16) and F(1,16)*F(2,3) == F(2,48) == F(1,24) and F(2,3)-F(5,8) == F(16,24)-F(15,24) == F(1,24), 'H28 e1: en 1/2, f = 2/3, s3 = 5/8, diferencia 1/24')
ok(F(1,1+1) == F(1,2) and [g28(F(1),F(-1),N) for N in range(4)] == [1,0,1,0] and 1+(-1) == 0 and [g28(F(1),F(1),N) for N in range(3)] == [1,2,3], 'H28 e1: extremos')
# ejemplo 2
ok(all((2*x)**n == 2**n*x**n and abs(2*x) == 2*abs(x) and (2*abs(x) < 1) == (abs(x) < F(1,2)) == (-F(1,2) < x < F(1,2)) for x in RJ28 for n in range(6)) and [2**n for n in range(4)] == [1,2,4,8] and all(abs(1/(1-2*x) - g28(F(1),2*x,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(1,3)), 'H28 e2a: Σ 2ⁿxⁿ e intervalo |x| < 1/2')
ok(2*F(1,4) == F(2,4) == F(1,2) and 1-F(1,2) == F(1,2) and 1/F(1,2) == 2 == 1/(1-2*F(1,4)) and g28(F(1),F(1,2),2) == F(4,4)+F(2,4)+F(1,4) == F(7,4) and F(1,2)**3*2 == F(1,8)*2 == F(2,8) == F(1,4) and 2-F(7,4) == F(8,4)-F(7,4) == F(1,4), 'H28 e2a: en 1/4, f = 2, s2 = 7/4, diferencia 1/4')
ok(all(4+x == 4*(1+x/4) and F(3)/(4+x) == F(3,4)/(1+x/4) == F(3,4)/(1-(-x/4)) and all(F(3,4)*(-x/4)**n == 3*(-1)**n*x**n/4**(n+1) for n in range(7)) and abs(-x/4) == abs(x)/4 and (abs(x)/4 < 1) == (abs(x) < 4) == (-4 < x < 4) for x in RJ28 if x != -4) and [F(3,4**(n+1)) for n in range(4)] == [F(3,4),F(3,16),F(3,64),F(3,256)] and 4*4**3 == 4**4, 'H28 e2b: factor 4, a = 3/4, r = −x/4, términos e intervalo |x| < 4')
ok(all(abs(F(3)/(4+x) - g28(F(3,4),-x/4,400)) < F(1,10**9) for x in RJ28 if abs(x) <= 3), 'H28 e2b: la serie se acerca a 3/(4 + x) dentro del intervalo')
ok(-F(2,4) == -F(1,2) and F(3,4+2) == F(3,6) == F(1,2) and F(3*2,16) == F(6,16) == F(3,8) and F(3*4,64) == F(12,64) == F(3,16) and g28(F(3,4),F(-1,2),2) == F(3,4)-F(6,16)+F(12,64) == F(12,16)-F(6,16)+F(3,16) == F(9,16) and F(-1,2)**3*F(1,2) == -F(1,8)*F(1,2) == -F(1,16) and F(1,2)-F(9,16) == F(8,16)-F(9,16) == -F(1,16), 'H28 e2b: en 2, f = 1/2, s2 = 9/16, diferencia −1/16')
# ejemplo 3: x/(1 + x²)
ok(all(x/(1+x**2) == x/(1-(-x**2)) and all(x*(-x**2)**n == (-1)**n*x**(2*n+1) and (x**2)**n == x**(2*n) and x*x**(2*n) == x**(2*n+1) for n in range(6)) and abs(-x**2) == abs(x)**2 and (abs(x)**2 < 1) == (abs(x) < 1) and 1+x**2 >= 1 for x in RJ28) and [2*n+1 for n in range(4)] == [1,3,5,7], 'H28 e3: a = x, r = −x², Σ (−1)ⁿx^(2n+1), intervalo |x| < 1')
ok(all(abs(x/(1+x**2) - g28(x,-x**2,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(3,4)) and F(0)/(1+0) == 0 == g28(F(0),F(0),5), 'H28 e3: la serie se acerca a x/(1 + x²); en x = 0 vale 0')
ok(-F(1,2)**2 == -F(1,4) and 1+F(1,4) == F(5,4) and F(1,2)/F(5,4) == F(1,2)*F(4,5) == F(4,10) == F(2,5) and g28(F(1,2),F(-1,4),1) == F(1,2)-F(1,2)**3 == F(1,2)-F(1,8) == F(4,8)-F(1,8) == F(3,8) and F(-1,4)**2*F(2,5) == F(1,16)*F(2,5) == F(2,80) == F(1,40) and F(2,5)-F(3,8) == F(16,40)-F(15,40) == F(1,40), 'H28 e3: en 1/2, f = 2/5, s1 = 3/8, diferencia 1/40')
# ejemplo 4: 1/x alrededor de 1
ok(all(x == 1+(x-1) and 1/x == 1/(1-(-(x-1))) and all((-(x-1))**n == (-1)**n*(x-1)**n for n in range(6)) and (abs(-(x-1)) < 1) == (abs(x-1) < 1) == (-1 < x-1 < 1) == (0 < x < 2) for x in RJ28 if x != 0) and all(abs(1/x - g28(F(1),-(x-1),300)) < F(1,10**9) for x in RJ28 if F(1,4) <= x <= F(7,4)), 'H28 e4: Σ (−1)ⁿ(x − 1)ⁿ, intervalo 0 < x < 2')
ok(F(6,5) == F('1.2') and F(6,5)-F(5,5) == F(1,5) and 1/F(6,5) == F(5,6) and g28(F(1),F(-1,5),2) == 1-F(1,5)+F(1,25) == F(25,25)-F(5,25)+F(1,25) == F(21,25) and F(-1,5)**3*F(5,6) == -F(1,125)*F(5,6) == -F(5,750) == -F(1,150) and F(5,6)-F(21,25) == F(125,150)-F(126,150) == -F(1,150), 'H28 e4: en 6/5, f = 5/6, s2 = 21/25, diferencia −1/150')
ok(-(3-1) == -2 and [(-2)**n for n in range(4)] == [1,-2,4,-8] and -(2-1) == -1 and F(1,3) > 0 and F(1,2) > 0, 'H28 e4: fuera del intervalo, x = 3 y x = 2')
# recuadro de errores
ok(all((2*x)**3 == 8*x**3 for x in RJ28) and any((2*x)**3 != 2*x**3 for x in RJ28) and all(f28(x) - s28(x,3) == x**4/(1-x) for x in RJ28 if x != 1) and F(3)/(4+1) != F(3)/(1+1), 'H28 errores frecuentes')
# ejercicio A
ok(all(F(1)/(1+3*x) == 1/(1-(-3*x)) and all((-3*x)**n == (-1)**n*3**n*x**n for n in range(6)) and abs(-3*x) == 3*abs(x) and (3*abs(x) < 1) == (abs(x) < F(1,3)) == (-F(1,3) < x < F(1,3)) for x in RJ28 if x != -F(1,3)) and [(-1)**n*3**n for n in range(4)] == [1,-3,9,-27] and all(abs(1/(1+3*x) - g28(F(1),-3*x,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(1,4)), 'H28 A (a): Σ (−1)ⁿ3ⁿxⁿ, |x| < 1/3')
ok(all(2-x == 2*(1-x/2) and 1/(2-x) == F(1,2)/(1-x/2) and all(F(1,2)*(x/2)**n == x**n/2**(n+1) for n in range(6)) and abs(x/2) == abs(x)/2 and (abs(x)/2 < 1) == (abs(x) < 2) == (-2 < x < 2) for x in RJ28 if x != 2) and [2**(n+1) for n in range(4)] == [2,4,8,16] and all(abs(1/(2-x) - g28(F(1,2),x/2,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(3,2)), 'H28 A (b): Σ xⁿ/2^(n+1), |x| < 2')
ok(all(all(x**2*x**n == x**(n+2) for n in range(6)) for x in RJ28) and [n+2 for n in range(4)] == [2,3,4,5] and all(abs(x**2/(1-x) - g28(x**2,x,300)) < F(1,10**9) for x in RJ28 if abs(x) <= F(3,4)) and F(0,1) == 0, 'H28 A (c): Σ x^(n+2), |x| < 1')
# ejercicio B
ok(all(3-x == 3-1-(x-1) == 2-(x-1) == 2*(1-(x-1)/2) and 1/(3-x) == F(1,2)/(1-(x-1)/2) and all(F(1,2)*((x-1)/2)**n == (x-1)**n/2**(n+1) for n in range(6)) and abs((x-1)/2) == abs(x-1)/2 and (abs(x-1)/2 < 1) == (abs(x-1) < 2) == (-2 < x-1 < 2) == (-1 < x < 3) for x in RJ28 if x != 3) and all(abs(1/(3-x) - g28(F(1,2),(x-1)/2,300)) < F(1,10**9) for x in RJ28 if -F(1,2) <= x <= F(5,2)), 'H28 B (a): Σ (x − 1)ⁿ/2^(n+1), −1 < x < 3')
ok(1-F(1,3) == F(3,3)-F(1,3) == F(2,3) and 1/F(2,3) == F(3,2) and F(1,3)**2 == F(1,9) and s28(F(1,3),2) == F(9,9)+F(3,9)+F(1,9) == F(13,9) and F(3,2)-F(13,9) == F(27,18)-F(26,18) == F(1,18) and F(1,3)**3 == F(1,27) and F(1,27)*F(3,2) == F(3,54) == F(1,18), 'H28 B (b): en 1/3, f = 3/2, s2 = 13/9, diferencia 1/18')
ok(F(1,1-2) == -1 and s28(F(2),2) == 1+2+4 == 7 and -1-7 == -8 and F(2**3,1-2) == F(8,-1) == -8 and F(2**4,1-2) == -16 == f28(F(2))-s28(F(2),3) and [s28(F(2),N) for N in range(4)] == [1,3,7,15], 'H28 B (c): en 2, f = −1, s2 = 7, diferencia −8 y después −16')
# ejercicio C
ok(all(g28(F(1000),x,N) == 1000*s28(x,N) for x in RJ28 for N in range(5)) and all(abs(1000/(1-x) - g28(F(1000),x,400)) < F(1,10**6) for x in (F(0),F(3,5),F(4,5))), 'H28 C (a): T(x) = Σ 1000xⁿ = 1000/(1 − x)')
ok(1-F('0.6') == F('0.4') and F(1000)/F('0.4') == F(10000,4) == 2500 and F('0.6')*F('0.6') == F('0.36') and F('0.36')*F('0.6') == F('0.216') and [1000*F('0.6')**n for n in range(4)] == [1000,600,360,216] and 1000+600 == 1600 and 1600+360 == 1960 and 1960+216 == 2176 == g28(F(1000),F(3,5),3) and 2500-2176 == 324, 'H28 C (b)(c): total 2500, fabricado 2176, falta 324')
ok(F('0.216')*F('0.6') == F('0.1296') == F('0.6')**4 and F('0.1296')*2500 == 324 == F(3,5)**4*(F(1000)/(1-F(3,5))), 'H28 C (c): lo que falta con la fórmula, 324')
ok(1-F('0.8') == F('0.2') and F(1000)/F('0.2') == F(10000,2) == 5000 == 2*2500 and [g28(F(1000),F(1),N) for N in range(3)] == [1000,2000,3000] and F(1000)/(1-0) == 1000, 'H28 C (d)(e): total 5000 con 0,8; x = 1 sin suma; x = 0 da 1000')
# H29
# H29 · Representación de funciones como series de potencias: registros y lecturas de rep-idea (6 pasos) y rep-vivo (6 posiciones de x), reglas 1-3 en rejilla, ejemplos 1-4 y ejercicios A, B, C. El teorema de derivación e integración término a término solo se enuncia en la hoja: aquí se comprueba la derivada/integral formal de los coeficientes, identidades finitas exactas y la cercanía numérica en rejilla; ln y arctan, con tolerancia contra math.
def rd29(x, d=4):
    """x (Fraction) redondeado a d decimales, en unidades enteras de 10^-d; mitad hacia arriba en el tamaño"""
    x = F(x); n = (2*abs(x.numerator)*10**d + x.denominator)//(2*x.denominator); return -n if x < 0 else n
def sl29(n, x): return sum(F((-1)**(k+1))*F(x)**k/k for k in range(1, n+1))
def sa29(n, x): return sum(F((-1)**k)*F(x)**(2*k+1)/(2*k+1) for k in range(n))
G29 = [F(p, 8) for p in range(-7, 8)]
T29 = 5e-5
# definición y punto de partida
ok(F(1, 1-2) == -1 and [2**n for n in range(4)] == [1, 2, 4, 8] and all(2**n >= 1 for n in range(60)), 'H29 k1 en x = 2 la función vale −1 y los términos 2ⁿ no tienden a 0')
ok(all((1-x)*sum(x**n for n in range(N+1)) == 1 - x**(N+1) for x in G29 for N in range(12)) and all(abs(float(sum(x**n for n in range(400))) - 1/(1-float(x))) < 1e-9 for x in G29), 'H29 k1 geométrica: (1 − x)·Σxⁿ = 1 − x^(N+1)')
ok(all((-x)**n == (-1)**n*x**n and (-x*x)**n == (-1)**n*x**(2*n) and F(1, 1)/(1-(-x)) == 1/(1+x) and 1/(1-(-x*x)) == 1/(1+x*x) and abs(-x) == abs(x) and abs(-x*x) == x*x and ((x*x < 1) == (abs(x) < 1)) for x in G29 + [F(1), F(-1), F(3, 2), F(-2)] for n in range(9) if x != -1), 'H29 k1 sustituciones r = −x y r = −x²')
ok(all((1+x)*sum((-1)**n*x**n for n in range(N+1)) == 1 - (-x)**(N+1) and (1+x*x)*sum((-1)**n*x**(2*n) for n in range(N+1)) == 1 - (-x*x)**(N+1) for x in G29 for N in range(12)), 'H29 k1 identidades finitas de 1/(1 + x) y 1/(1 + x²)')
# reglas 1, 2 y 3 (sumas parciales, rejilla)
a29 = [F(n+1, n+2) for n in range(9)]; b29 = [F((-1)**n, 2*n+1) for n in range(9)]
ok(all(sum((a29[n]+b29[n])*x**n for n in range(N)) == sum(a29[n]*x**n for n in range(N)) + sum(b29[n]*x**n for n in range(N)) and sum(c*a29[n]*x**n for n in range(N)) == c*sum(a29[n]*x**n for n in range(N)) and sum(a29[n]*x**(n+m) for n in range(N)) == x**m*sum(a29[n]*x**n for n in range(N)) and sum((a29[n]-b29[n])*x**n for n in range(N)) == sum(a29[n]*x**n for n in range(N)) + (-1)*sum(b29[n]*x**n for n in range(N)) for x in G29 for N in range(1, 10) for c in (F(-1), F(2), F(3, 5)) for m in (1, 2, 3)), 'H29 k2 reglas 1, 2, 3 y resta en sumas parciales')
ok([(-1)**n for n in range(4)] == [1, -1, 1, -1] and [F((-1)**n, n+1) for n in range(4)] == [1, F(-1, 2), F(1, 3), F(-1, 4)] and all(F(0)**(n+1) == 0 for n in range(9)), 'H29 k2 extremo x = 1 antes y después de integrar; la constante en el centro')
# rep-idea: registros R1…R6 y lectura acumulada
ok(all(abs((math.log(1+x+1e-6) - math.log(1+x-1e-6))/2e-6 - 1/(1+x)) < 1e-6 for x in (-0.9, -0.5, 0, 0.5, 1, 2, 5)), 'H29 rep-idea paso 1 (ln(1 + x))′ = 1/(1 + x), derivada numérica')
ok(all(F((-1)**n, n+1) == F((-1)**(m+1), m) for n in range(60) for m in [n+1]) and [F((-1)**n, n+1) for n in range(4)] == [1, F(-1, 2), F(1, 3), F(-1, 4)] and all((n+1)*F((-1)**n, n+1) == (-1)**n for n in range(60)), 'H29 rep-idea paso 3 integral formal de los coeficientes (y su derivada los devuelve)')
ok(math.log(1) == 0 and sl29(8, 0) == 0 and F(0)**2/2 == 0 == F(0)**3/3, 'H29 rep-idea paso 4 C = 0')
ok(F(1, 2)**2 == F(1, 4) and F(1, 2)**3 == F(1, 8) and F(1, 4)/2 == F(1, 8) and F(1, 8)/3 == F(1, 24) and sl29(1, F(1, 2)) == F(1, 2) == F('0.5') and sl29(2, F(1, 2)) == F(1, 2)-F(1, 8) == F(4, 8)-F(1, 8) == F(3, 8) == F('0.375') and sl29(3, F(1, 2)) == F(3, 8)+F(1, 24) == F(9, 24)+F(1, 24) == F(10, 24) == F(5, 12) and rd29(F(5, 12)) == 4167, 'H29 rep-idea paso 5 S₁, S₂, S₃ en x = 1/2')
ok(round(math.log(1.5)*10**4) == 4055 and abs(math.log(1.5) - 0.4055) < T29 and abs(4055-5000) == 945 and abs(4055-3750) == 305 and abs(4055-4167) == 112 and 945 > 305 > 112, 'H29 rep-idea paso 5 distancias 0,0945; 0,0305; 0,0112')
ok(all(F((-1)**(n+1), n) == [None, 1, F(-1, 2), F(1, 3), F(-1, 4)][n] for n in (1, 2, 3, 4)) and (-1)**2 == 1 and (-1)**3 == -1, 'H29 rep-idea paso 6 término de lugar n')
ok(all(abs(float(sl29(n, x)) - math.log(1+float(x))) > abs(float(sl29(n+1, x)) - math.log(1+float(x))) for x in (F(1, 2), F(-1, 2), F(3, 4), F(1, 4)) for n in range(1, 8)) and all(abs(float(sl29(300, x)) - math.log(1+float(x))) < 1e-9 for x in G29 if abs(x) <= F(3, 4)) and abs(float(sl29(8, F(3, 2))) - math.log(2.5)) > 1.8, 'H29 rep-idea dentro se pegan (rejilla, numérico) y fuera S₈ se despega')
ok(float(sl29(8, F(31, 20))) < -1.4 and all(float(sl29(n, F(-5, 4))) < 0 for n in (1, 2, 3, 8)) and sl29(3, F(3, 2)) == F(3, 2) == sl29(1, F(3, 2)) and math.exp(-2)-1 < -0.86 and 0.9 < math.log(2.55) < 1.5, 'H29 rep-idea posiciones de las curvas en el cuadro')
# rep-vivo: las 6 posiciones del deslizador, con la cuenta completa
E29 = {F(-1, 2): (192, [-96, 24, -8, 3], -131, F(-131, 192), -6823, [-63, 26, -11, 5], -6928, -6931, 108, 3, '0.5'),
       F(1, 2): (192, [96, 24, 8, 3], 77, F(77, 192), 4010, [63, 26, 11, 5], 4053, 4055, 45, 2, '1.5'),
       F(3, 4): (1024, [768, 288, 144, 81], 543, F(543, 1024), 5303, [475, 297, 191, 125], 5547, 5596, 293, 49, '1.75'),
       F(1): (12, [12, 6, 4, 3], 7, F(7, 12), 5833, [2000, 1667, 1429, 1250], 6345, 6931, 1098, 586, '2'),
       F(3, 2): (64, [96, 72, 72, 81], 15, F(15, 64), 2344, [15188, 18984, 24408, 32036], -9080, 9163, 6819, 18243, '2.5')}
for x29, e29 in E29.items():
    pw29 = [None] + [x29**k for k in range(1, 9)]; tm29 = [None] + [x29**k/k for k in range(1, 9)]; t29 = 'H29 rep-vivo x = %s ' % x29
    ok(all(pw29[k] == pw29[k-1]*x29 for k in range(2, 9)) and all(tm29[k] == pw29[k]/k == F(pw29[k].numerator, k*pw29[k].denominator) for k in range(1, 9)), t29 + 'potencias y términos')
    ok(math.lcm(*[tm29[k].denominator for k in (1, 2, 3, 4)]) == e29[0] and [tm29[k]*e29[0] for k in (1, 2, 3, 4)] == e29[1] and e29[1][0]-e29[1][1]+e29[1][2]-e29[1][3] == e29[2] and F(e29[2], e29[0]) == e29[3] == sl29(4, x29) == x29-tm29[2]+tm29[3]-tm29[4], t29 + 'S₄ con denominador común')
    ok(rd29(e29[3]) == e29[4] and [rd29(tm29[k]) for k in (5, 6, 7, 8)] == e29[5] and e29[4]+e29[5][0]-e29[5][1]+e29[5][2]-e29[5][3] == e29[6] and abs(F(e29[6], 10**4) - sl29(8, x29)) <= F(5, 2*10**4), t29 + 'redondeos a 4 decimales y S₈ con los valores redondeados')
    ok(1+x29 == F(e29[10]) and round(math.log(1+x29)*10**4) == e29[7] and abs(math.log(1+x29) - e29[7]/10**4) < T29 and abs(e29[7]-e29[4]) == e29[8] and abs(e29[7]-e29[6]) == e29[9], t29 + 'función (≈, tolerancia 0,00005) y distancias')
    ok((e29[9] < e29[8]) == (abs(x29) <= 1) and (abs(x29) < 1 or x29 == 1 or e29[9] > e29[8]), t29 + 'la distancia baja dentro y en el extremo, y sube fuera')
ok([F(10**4*abs(F(1, k)).numerator, F(1, k).denominator).denominator == 1 for k in (5, 6, 7, 8)] == [True, False, False, True] and all(F(10**4)*F(3, 2)**k/k % 1 != 0 for k in (5, 6, 7, 8)), 'H29 rep-vivo signos = y ≈ de los términos 5 a 8 (x = 1 y x = 3/2)')
ok(all(F(0)**k == 0 for k in range(1, 9)) and sl29(4, 0) == 0 == sl29(8, 0) and math.log(1+0) == 0 and math.exp(0) == 1 and abs(0-0) == 0, 'H29 rep-vivo x = 0, caso límite: todo vale 0')
ok(all(F(3, 2)**(n+1)/(n+1) >= F(3, 2)**n/n for n in range(2, 80)) and [15188, 18984, 24408, 32036] == sorted([15188, 18984, 24408, 32036]) and all(abs(x)**(n+1)/(n+1)/(abs(x)**n/n) == abs(x)*F(n, n+1) for x in (F(3, 2), F(-2), F(5, 4)) for n in range(1, 30)) and abs(float(F(10**6, 10**6+1)) - 1) < 1e-5, 'H29 rep-vivo y ej. 2 paso 10: fuera, los tamaños crecen; cociente |x|·n/(n + 1)')
ok(sl29(4, 1) == 1-F(1, 2)+F(1, 3)-F(1, 4) == F(7, 12) and abs(float(sl29(4000, 1)) - math.log(2)) < 2e-4 and abs(math.log(2.5) - 0.9163) < T29, 'H29 rep-vivo x = 1: armónica alternada (ln 2 solo numérico; Abel no se usa)')
# ejemplo 1
ok(all((1-x)**2*sum(n*x**(n-1) for n in range(1, N+1)) == 1 - (N+1)*x**N + N*x**(N+1) for x in G29 for N in range(1, 14)) and all(abs(float(sum(n*x**(n-1) for n in range(1, 500))) - 1/(1-float(x))**2) < 1e-9 for x in G29), 'H29 e1 identidad finita exacta de Σ n·xⁿ⁻¹ y cercanía a 1/(1 − x)² en rejilla')
ok(all(abs(((1-x-1e-6)**-1 - (1-x+1e-6)**-1)/2e-6 - (1-x)**-2) < 1e-4 for x in (-0.9, -0.5, 0, 0.5, 0.8)) and (-1)*(-1) == 1, 'H29 e1 derivada de (1 − x)⁻¹, numérica')
ok(all(sum(n*x**(n-1) for n in range(1, N+1)) == sum((m+1)*x**m for m in range(0, N)) for x in G29 for N in range(1, 12)), 'H29 e1 cambio de índice m = n − 1')
ok(1-F(1, 2) == F(1, 2) and F(1, 2)**2 == F(1, 4) and 1/F(1, 4) == 4 and [n*F(1, 2)**(n-1) for n in range(1, 7)] == [1, 1, F('0.75'), F('0.5'), F('0.3125'), F('0.1875')] and [sum(n*F(1, 2)**(n-1) for n in range(1, N+1)) for N in range(1, 7)] == [1, 2, F('2.75'), F('3.25'), F('3.5625'), F('3.75')], 'H29 e1 comprobación con x = 1/2')
ok(all(abs(n*(-1)**(n-1)) == n == n*1**(n-1) for n in range(1, 50)) and [n*(-1)**(n-1) for n in (1, 2, 3, 4)] == [1, -2, 3, -4], 'H29 e1 extremos: tamaño n, no tiende a 0')
# ejemplo 2
ok(all(sum(F((-1)**n)*x**(n+1)/(n+1) for n in range(0, N)) == sum(F((-1)**(m+1))*x**m/m for m in range(1, N+1)) for x in G29 for N in range(1, 12)) and all((-1)**(m-1) == (-1)**(m+1) == (-1)**(m-1)*(-1)**2 for m in range(1, 40)), 'H29 e2 cambio de índice m = n + 1 y signo')
ok(sl29(4, -1) == -1-F(1, 2)-F(1, 3)-F(1, 4) and all(F((-1)**(n+1))*F(-1)**n/n == F(-1, n) for n in range(1, 40)) and F(1, 2)-F(1, 8)+F(1, 24)-F(1, 64) == F(96-24+8-3, 192) == F(77, 192) and rd29(F(77, 192)) == 4010 and math.lcm(2, 8, 24, 64) == 192, 'H29 e2 extremo x = −1 (opuesto de la armónica) y comprobación 77/192')
# ejemplo 3
ok(all(F((-1)**n, 2*n+1)*(2*n+1) == (-1)**n for n in range(60)) and sa29(4, F(1, 3)) == F(1, 3)-F(1, 3)**3/3+F(1, 3)**5/5-F(1, 3)**7/7 and math.atan(0) == 0, 'H29 e3 integral formal de los coeficientes y C = 0')
ok(all(abs(float(sa29(400, x)) - math.atan(float(x))) < 1e-9 for x in G29) and all(abs((math.atan(x+1e-6) - math.atan(x-1e-6))/2e-6 - 1/(1+x*x)) < 1e-6 for x in (-3, -0.5, 0, 0.5, 2)), 'H29 e3 la serie se acerca a arctan en rejilla; derivada numérica')
ok(all(F(1, 2*n+3) < F(1, 2*n+1) and F(1, 2*n+1) > 0 for n in range(200)) and all(abs(x)**(2*n+3)/(2*n+3)/(abs(x)**(2*n+1)/(2*n+1)) == x*x*F(2*n+1, 2*n+3) for x in (F(3, 2), F(-2)) for n in range(30)) and abs(float(F(2*10**6+1, 2*10**6+3)) - 1) < 1e-5 and abs(float(sa29(4000, 1)) - math.pi/4) < 2e-4, 'H29 e3 extremos (Leibniz) y cociente fuera; π/4 solo numérico')
ok(F(1, 2)**3 == F(1, 8) and F(1, 8)/3 == F(1, 24) and F(1, 2)**5 == F(1, 32) and F(1, 32)/5 == F(1, 160) and math.lcm(2, 24, 160) == 480 and F(1, 2) == F(240, 480) and F(1, 24) == F(20, 480) and F(1, 160) == F(3, 480) and sa29(3, F(1, 2)) == F(240-20+3, 480) == F(223, 480) and rd29(F(223, 480)) == 4646 and round(math.atan(0.5)*10**4) == 4636, 'H29 e3 comprobación 223/480 ≈ 0,4646; arctan 0,5 ≈ 0,4636')
# ejemplo 4
ok(all(x*sum(n*x**(n-1) for n in range(1, N+1)) == sum(n*x**n for n in range(1, N+1)) for x in G29 for N in range(1, 12)) and (1-F(1, 2))**2 == F(1, 4) and F(1, 2)/F(1, 4) == F(1, 2)*4 == 2 and abs(float(sum(F(n, 2**n) for n in range(1, 200))) - 2) < 1e-12, 'H29 e4 (a) x/(1 − x)² y Σ n/2ⁿ = 2')
ok(all((-1)**(n+1)*(-1)**n == (-1)**(2*n+1) == -1 and F((-1)**(n+1))*(-x)**n/n == -x**n/n for x in G29 for n in range(1, 20)) and all(F((-1)**(n+1), n)+F(1, n) == F((-1)**(n+1)+1, n) == (0 if n % 2 == 0 else F(2, n)) for n in range(1, 60)), 'H29 e4 (b) serie de ln(1 − x) y coeficientes 0 o 2/n')
ok(all(sum(F((-1)**(n+1)+1, n)*x**n for n in range(1, 2*K+2)) == sum(2*x**(2*k+1)/(2*k+1) for k in range(0, K+1)) for x in G29 for K in range(8)) and all(abs(float(sum(2*x**(2*k+1)/(2*k+1) for k in range(300))) - math.log((1+float(x))/(1-float(x)))) < 1e-9 for x in G29 if abs(x) <= F(3, 4)), 'H29 e4 (b) solo quedan los impares; cercanía a ln((1 + x)/(1 − x))')
ok(1+F(1, 3) == F(4, 3) and 1-F(1, 3) == F(2, 3) and F(4, 3)/F(2, 3) == F(4, 3)*F(3, 2) == 2 and F(1, 3)**3 == F(1, 27) and F(1, 27)/3 == F(1, 81) and F(1, 3)**5 == F(1, 243) and F(1, 243)/5 == F(1, 1215) and F(1, 3) == F(405, 1215) and F(1, 81) == F(15, 1215) and F(1, 3)+F(1, 81)+F(1, 1215) == F(421, 1215) and 2*F(421, 1215) == F(842, 1215) and rd29(F(842, 1215)) == 6930 and round(math.log(2)*10**4) == 6931, 'H29 e4 (b) ln 2 con x = 1/3: 842/1215 ≈ 0,6930')
# ejercicio A
ok(all((1+x)**2*sum((-1)**(n+1)*n*x**(n-1) for n in range(1, N+1)) == 1 - (N+1)*(-x)**N + N*(-x)**(N+1) for x in G29 for N in range(1, 14)) and all((-1)*(-1)**n == (-1)**(n+1) for n in range(40)) and [(-1)**(n+1)*n for n in (1, 2, 3, 4)] == [1, -2, 3, -4] and all(sum((-1)**(n+1)*n*x**(n-1) for n in range(1, 9)) == sum(n*(-x)**(n-1) for n in range(1, 9)) for x in G29), 'H29 A (a) serie de 1/(1 + x)², identidad finita exacta')
ok((1+F(1, 2))**2 == F(3, 2)**2 == F(9, 4) and 1/F(9, 4) == F(4, 9) and rd29(F(4, 9)) == 4444 and 1-2*F(1, 2)+3*F(1, 4)-4*F(1, 8) == 1-1+F('0.75')-F('0.5') == F('0.25') and F('0.25')+5*F(1, 16)-6*F(1, 32) == F('0.25')+F('0.3125')-F('0.1875') == F('0.375'), 'H29 A (a) comprobación con x = 1/2')
ok(all(n*F(1, 3)**(n-1) == F(n, 3**(n-1)) for n in range(1, 30)) and 1-F(1, 3) == F(2, 3) and F(2, 3)**2 == F(4, 9) and 1/F(4, 9) == F(9, 4) == F('2.25') and 1+F(2, 3)+F(3, 9)+F(4, 27) == F(27+18+9+4, 27) == F(58, 27) and rd29(F(58, 27), 3) == 2148 and abs(float(sum(F(n, 3**(n-1)) for n in range(1, 200))) - 2.25) < 1e-12, 'H29 A (b) Σ n/3ⁿ⁻¹ = 9/4')
ok([n*2**(n-1) for n in (1, 2, 3, 4)] == [1, 4, 12, 32] and F(1, (1-2)**2) == 1 and abs(2) > 1 and all(n*2**(n-1) >= 1 for n in range(1, 60)), 'H29 A (c) x = 2 queda fuera')
# ejercicio B
ok(all(x*sum((-1)**n*x**(2*n) for n in range(N)) == sum((-1)**n*x**(2*n+1) for n in range(N)) for x in G29 for N in range(1, 10)) and all(abs((0.5*math.log(1+(x+1e-6)**2) - 0.5*math.log(1+(x-1e-6)**2))/2e-6 - x/(1+x*x)) < 1e-6 for x in (-2, -0.5, 0, 0.5, 3)), 'H29 B (a)(b) x/(1 + x²) y su primitiva, numérico')
ok(all(2*F(1, 2*n+2) == F(2, 2*(n+1)) == F(1, n+1) and F((-1)**n, 2*n+2)*(2*n+2) == (-1)**n for n in range(60)) and F(1, 2)*math.log(1) == 0 and all(abs(float(sum(F((-1)**n)*x**(2*n+2)/(n+1) for n in range(300))) - math.log(1+float(x)**2)) < 1e-9 for x in G29), 'H29 B (b) serie de ln(1 + x²)')
ok(all(sum(F((-1)**(n+1))*x**(2*n)/n for n in range(1, N+1)) == sum(F((-1)**m)*x**(2*m+2)/(m+1) for m in range(0, N)) for x in G29 for N in range(1, 10)) and all((-1)**(m+2) == (-1)**m and 2*(m+1) == 2*m+2 for m in range(40)), 'H29 B (c) los dos caminos dan la misma serie')
ok(1+F(1, 2)**2 == F('1.25') and F(1, 2)**4 == F(1, 16) and F(1, 2)**6 == F(1, 64) and F(1, 16)/2 == F(1, 32) and F(1, 64)/3 == F(1, 192) and F(1, 4)-F(1, 32)+F(1, 192) == F(48-6+1, 192) == F(43, 192) and F(1, 4) == F(48, 192) and F(1, 32) == F(6, 192) and rd29(F(43, 192)) == 2240 and round(math.log(1.25)*10**4) == 2231 and abs(2231-2240) == 9, 'H29 B (d) ln 1,25 con tres términos')
# ejercicio C
b29 = lambda k: F(1, 5)**(2*k-1)/(2*k-1)
ok(F(1, 5)**3 == F(1, 125) and F(1, 5)**5 == F(1, 3125) and F(1, 125)/3 == F(1, 375) and F(1, 3125)/5 == F(1, 15625) and [b29(1), b29(2), b29(3)] == [F(1, 5), F(1, 375), F(1, 15625)] and sa29(2, F(1, 5)) == F(1, 5)-F(1, 375) == F(75, 375)-F(1, 375) == F(74, 375) and rd29(F(74, 375), 5) == 19733, 'H29 C (a) dos términos: 74/375 ≈ 0,19733')
ok(all(b29(k) > 0 and b29(k+1)/b29(k) == F(1, 5)**2*F(2*k-1, 2*k+1) == F(1, 25)*F(2*k-1, 2*k+1) < 1 and b29(k+1) < b29(k) and F(1, 5)**(2*k-1) <= 1 and 2*k-1 >= k and b29(k) <= F(1, k) for k in range(1, 80)), 'H29 C (b) condiciones de Leibniz en rejilla de k')
ok(F(1, 15625) == F('0.000064') and abs(math.atan(0.2) - 74/375) <= 1/15625 and 375*125 == 46875 == 15625*3 and 74*125 == 9250 and sa29(3, F(1, 5)) == F(9250, 46875)+F(3, 46875) == F(9253, 46875) and rd29(F(9253, 46875), 5) == 19740 and 74/375 <= math.atan(0.2) <= 9253/46875 and abs(math.atan(0.2) - 0.1973) < 1e-4, 'H29 C (b)(c) cota 1/15625 y S₂ ≤ θ ≤ S₃')
ok(F('0.1973')*180 == F('35.514') and rd29(F('35.514')/F('3.1416'), 2) == 1130 and abs(math.degrees(math.atan(0.2)) - 11.3) < 0.02 and abs(math.atan(2) - 1.107) < 5e-4 and abs(F(2)) > 1 and all(F(2)**(2*n+3)/(2*n+3) > F(2)**(2*n+1)/(2*n+1) for n in range(40)), 'H29 C (c)(d) grados ≈ 11,30 y la rampa de pendiente 2')
# H30
# H30 · Determinar serie de Taylor de una función: registro y lectura de tay-idea (6 pasos) y de tay-vivo (6 posiciones del centro), el teorema de los coeficientes sobre polinomios, el recuadro «El centro se elige» en rejilla, ejemplos 1-4 y ejercicios A, B, C. No se puede comprobar por código: el teorema de derivación término a término (solo enunciado en H29), la cota de Lagrange como teorema (aquí solo se comprueba numéricamente que se cumple en rejilla), los límites y la convergencia (solo sumas largas con tolerancia).
def rd30(x, d=4):
    """x (Fraction) redondeado a d decimales, en unidades enteras de 10^-d; mitad hacia arriba en el tamaño"""
    x = F(x); n = (2*abs(x.numerator)*10**d + x.denominator)//(2*x.denominator); return -n if x < 0 else n
def dv30(t):
    """derivada de c·x^m, guardada como (c, m), con la regla de la potencia"""
    return (t[0]*t[1], t[1]-1)
def pd30(p):
    """derivada de un polinomio dado por su lista de coeficientes [c0, c1, …]"""
    return [k*p[k] for k in range(1, len(p))] or [F(0)]
def pe30(p, x): return sum(F(c)*F(x)**k for k, c in enumerate(p))
def tx30(N, a, x):
    """polinomio de Taylor de grado N de 1/x con centro a, evaluado en x"""
    return sum(F((-1)**n, 1)/F(a)**(n+1)*(F(x)-F(a))**n for n in range(N+1))
def tl30(N, a, x):
    """polinomio de Taylor de grado N de ln x con centro a, sin el término constante"""
    return sum(F((-1)**(n-1), n)/F(a)**n*(F(x)-F(a))**n for n in range(1, N+1))
G30 = [F(p, 8) for p in range(1, 24) if p != 8]
T30 = 5e-5
# derivadas de 1/x = x^(-1): lista y patrón (-1)^n n! x^(-(n+1)), exacto con la regla de la potencia
D30 = [(F(1), -1)]
for _ in range(12): D30.append(dv30(D30[-1]))
ok(D30[1] == (-1, -2) and D30[2] == (2, -3) and D30[3] == (-6, -4) and D30[4] == (24, -5) and all(D30[n] == ((-1)**n*factorial(n), -(n+1)) for n in range(13)) and all((-1)**n*factorial(n)*(-(n+1)) == (-1)**(n+1)*factorial(n+1) for n in range(40)), 'H30 derivadas de 1/x: lista, patrón y paso de n a n+1')
# tay-idea: registro R1…R6 y lectura
ok([D30[n][0]*F(1)**D30[n][1] for n in range(4)] == [1, -1, 2, -6] and [factorial(n) for n in range(4)] == [1, 1, 2, 6] and [F(D30[n][0], factorial(n)) for n in range(4)] == [1, -1, 1, -1] and F(1, factorial(0)) == 1 and F(-1, factorial(1)) == -1 and F(2, factorial(2)) == 1 and F(-6, factorial(3)) == -1, 'H30 tay-idea R1–R4: derivadas en el centro 1, −1, 2, −6 y coeficientes 1, −1, 1, −1')
ok(all(F((-1)**n*factorial(n), factorial(n)) == (-1)**n for n in range(40)) and [abs((-1)**n*factorial(n)) for n in range(4)] == [1, 1, 2, 6] and all(tx30(k, 1, x) == tx30(k-1, 1, x) + (-1)**k*(x-1)**k for x in G30 for k in range(1, 9)) and all(tx30(0, 1, x) == 1 and tx30(1, 1, x) == 1-(x-1) == 2-x and tx30(2, 1, x) == 1-(x-1)+(x-1)**2 and tx30(3, 1, x) == 1-(x-1)+(x-1)**2-(x-1)**3 for x in G30), 'H30 tay-idea R5 y lecturas 1–5: patrón, cₙ = (−1)ⁿ y T₀…T₃')
ok(all(abs(x-1)**(n+1)/abs(x-1)**n == abs(x-1) for x in G30 for n in range(6)) and all((abs(x-1) < 1) == (0 < x < 2) for x in G30 + [F(0), F(2), F(-1, 2), F(5, 2), F(3)]) and all(abs((-1)**n*(F(0)-1)**n) == 1 == abs((-1)**n*(F(2)-1)**n) for n in range(30)) and all(F(1)/(1+(x-1)) == 1/x and (-1)**n*(x-1)**n == (-(x-1))**n for x in G30 for n in range(8)), 'H30 tay-idea lectura 6: cociente |x − 1|, intervalo (0, 2), extremos y suma geométrica 1/x')
ok([tx30(k, 1, F(3, 2)) for k in range(4)] == [1, F(1, 2), F(3, 4), F(5, 8)] and 1-F(1, 2) == F(1, 2) and F(1, 2)+F(1, 4) == F(3, 4) and F(3, 4)-F(1, 8) == F(5, 8) and 1/F(3, 2) == F(2, 3) and [abs(F(2, 3)-tx30(k, 1, F(3, 2))) for k in range(4)] == [F(1, 3), F(1, 6), F(1, 12), F(1, 24)] and all(abs(F(2, 3)-tx30(k+1, 1, F(3, 2))) == abs(F(2, 3)-tx30(k, 1, F(3, 2)))/2 for k in range(10)), 'H30 tay-idea lectura 6: prueba en x = 3/2, distancias 1/3, 1/6, 1/12, 1/24')
ok(all(abs(float(tx30(60, 1, x)) - float(1/x)) < 1e-9 for x in G30 if F(1, 2) <= x <= F(3, 2)) and all(abs(1/x - tx30(8, 1, x)) < abs(1/x - tx30(3, 1, x)) for x in G30 if 0 < x < 2 and x != 1) and all(abs(1/x - tx30(8, 1, x)) > abs(1/x - tx30(3, 1, x)) for x in G30 if x > 2) and tx30(8, 1, F(2)) == 1, 'H30 tay-idea figura: T₈ más cerca que T₃ dentro de (0, 2) y más lejos a la derecha de 2')
# tay-vivo: las seis posiciones del centro, con x = 2
V30 = {}
for a in (F(1, 2), F(1), F(3, 2), F(2), F(5, 2), F(3)):
    pa = [a**n for n in range(5)]; fd = [F(D30[n][0])/pa[n+1] for n in range(4)]; c = [fd[n]/factorial(n) for n in range(4)]; d = 2 - a; dp = [d**n for n in range(4)]
    tm = [c[n]*dp[n] for n in range(4)]; T = [sum(tm[:n+1]) for n in range(4)]; ds = [abs(F(1, 2)-t) for t in T]; r = -d/a
    V30[a] = (T, ds, r)
    ok(all(pa[n] == pa[n-1]*a for n in range(1, 5)) and fd == [1/a, -1/a**2, 2/a**3, -6/a**4] and fd == [D30[n][0]*a**D30[n][1] for n in range(4)] and c == [F((-1)**n)/a**(n+1) for n in range(4)] and c == [fd[0]/1, fd[1]/1, fd[2]/2, fd[3]/6], f'H30 tay-vivo a = {a}: potencias del centro, derivadas en el centro y coeficientes')
    ok(dp == [1, d, d*d, d*d*d] and tm == [1/a*r**n for n in range(4)] and all(T[n] == T[n-1]+tm[n] for n in range(1, 4)) and T == [tx30(n, a, 2) for n in range(4)] and all(F(1, 2)-T[n] == r**(n+1)/2 for n in range(4)) and ds == [abs(r)**(n+1)/2 for n in range(4)] and 2*a == a+a and ((abs(d) < a) == (0 < 2 < 2*a)), f'H30 tay-vivo a = {a}: términos, sumas T₀…T₃, distancias e intervalo (0, 2a)')
ok(V30[F(1, 2)][0] == [2, -4, 14, -40] and V30[F(1, 2)][1] == [F(3, 2), F(9, 2), F(27, 2), F(81, 2)] and V30[F(1, 2)][2] == -3 and abs(2-F(1, 2)) == F(3, 2) > F(1, 2) and [F(1)/F(1, 2)**(n+1)*(-1)**n for n in range(4)] == [2, -4, 8, -16] and [2/F(1, 8), -6/F(1, 16)] == [16, -96] and [F(3, 2)**2, F(3, 2)**3] == [F(9, 4), F(27, 8)] and [-4*F(3, 2), 8*F(9, 4), -16*F(27, 8)] == [-6, 18, -54], 'H30 tay-vivo a = 1/2: fuera; T = 2, −4, 14, −40; distancias 3/2, 9/2, 27/2, 81/2')
ok(V30[F(1)][0] == [1, 0, 1, 0] and V30[F(1)][1] == [F(1, 2)]*4 and V30[F(1)][2] == -1 and abs(2-1) == 1 and all(tx30(n, 1, 2) == (1 if n % 2 == 0 else 0) for n in range(30)), 'H30 tay-vivo a = 1: extremo; sumas 1, 0, 1, 0; distancia siempre 1/2')
ok(V30[F(3, 2)][0] == [F(2, 3), F(4, 9), F(14, 27), F(40, 81)] and V30[F(3, 2)][1] == [F(1, 6), F(1, 18), F(1, 54), F(1, 162)] and V30[F(3, 2)][2] == F(-1, 3) and [F(3, 2)**n for n in (2, 3, 4)] == [F(9, 4), F(27, 8), F(81, 16)] and [-1/F(9, 4), 2/F(27, 8), -6/F(81, 16)] == [F(-4, 9), F(16, 27), F(-32, 27)] and [F(16, 27)/2, F(-32, 27)/6] == [F(8, 27), F(-16, 81)] and [F(-4, 9)*F(1, 2), F(8, 27)*F(1, 4), F(-16, 81)*F(1, 8)] == [F(-2, 9), F(2, 27), F(-2, 81)] and F(6, 9)-F(2, 9) == F(4, 9) and F(12, 27)+F(2, 27) == F(14, 27) and F(42, 81)-F(2, 81) == F(40, 81) and F(81, 162)-F(80, 162) == F(1, 162), 'H30 tay-vivo a = 3/2: dentro; T₃(2) = 40/81; distancias 1/6, 1/18, 1/54, 1/162')
ok(V30[F(2)][0] == [F(1, 2)]*4 and V30[F(2)][1] == [0]*4 and V30[F(2)][2] == 0 and [F((-1)**n, 2**(n+1)) for n in range(4)] == [F(1, 2), F(-1, 4), F(1, 8), F(-1, 16)] and all(tx30(n, 2, 2) == F(1, 2) for n in range(20)), 'H30 tay-vivo a = 2: caso límite, el punto de prueba es el centro; distancia 0')
ok(V30[F(5, 2)][0] == [F(2, 5), F(12, 25), F(62, 125), F(312, 625)] and V30[F(5, 2)][1] == [F(1, 10), F(1, 50), F(1, 250), F(1, 1250)] and V30[F(5, 2)][2] == F(1, 5) and [F(5, 2)**n for n in (2, 3, 4)] == [F(25, 4), F(125, 8), F(625, 16)] and [F(2, 5), F(-4, 25)*F(-1, 2), F(8, 125)*F(1, 4), F(-16, 625)*F(-1, 8)] == [F(2, 5), F(2, 25), F(2, 125), F(2, 625)] and F(625, 1250)-F(624, 1250) == F(1, 1250), 'H30 tay-vivo a = 5/2: dentro; T₃(2) = 312/625; distancias 1/10, 1/50, 1/250, 1/1250')
ok(V30[F(3)][0] == [F(1, 3), F(4, 9), F(13, 27), F(40, 81)] and V30[F(3)][1] == [F(1, 6), F(1, 18), F(1, 54), F(1, 162)] and V30[F(3)][2] == F(1, 3) and [F(1, 3), F(-1, 9)*-1, F(1, 27)*1, F(-1, 81)*-1] == [F(1, 3), F(1, 9), F(1, 27), F(1, 81)] and F(39, 81)+F(1, 81) == F(40, 81) and [F(-6, 81), F(2, 27)/2, F(-2, 27)/6] == [F(-2, 27), F(1, 27), F(-1, 81)], 'H30 tay-vivo a = 3: dentro; T₃(2) = 40/81; distancias 1/6, 1/18, 1/54, 1/162')
ok(all((V30[a][1][3] < V30[a][1][0]) == (0 < 2 < 2*a and a != 2) for a in V30 if a != 2) and all(V30[a][1][n+1] == V30[a][1][n]*abs(V30[a][2]) for a in V30 for n in range(3)), 'H30 tay-vivo: dentro las distancias bajan, fuera suben; cada una es la anterior por |r|')
# k1: factoriales y el centro
ok([factorial(n) for n in range(5)] == [1, 1, 2, 6, 24] and all(factorial(n) == n*factorial(n-1) for n in range(1, 30)) and all(F(0)**n == 0 for n in range(1, 30)) and F(0)**0 == 1, 'H30 k1 factoriales, 0ⁿ = 0 para n ≥ 1 y (x − a)⁰ = 1')
# k2: el teorema de los coeficientes, comprobado sobre polinomios (series finitas) con coeficientes y centros en rejilla
P30 = [[F(3), F(-2), F(1, 2), F(5), F(-1, 3), F(7, 4), F(2)], [F(1), F(1), F(1), F(1), F(1)], [F(0), F(-4), F(0), F(9, 2), F(1, 7)]]
def cd30(p, n):
    """coeficientes (en potencias de x − a) de la derivada de orden n de Σ c_k (x − a)^k"""
    for _ in range(n): p = pd30(p)
    return p
ok(all(cd30(p, n)[0] == factorial(n)*p[n] and F(cd30(p, n)[0], factorial(n)) == p[n] for p in P30 for n in range(len(p))) and all(cd30(p, len(p))[0] == 0 for p in P30) and all(pd30(p)[:3] == [p[1], 2*p[2], 3*p[3]] and cd30(p, 2)[:3] == [2*p[2], 3*2*p[3], 4*3*p[4]] and cd30(p, 3)[:2] == [3*2*1*p[3], 4*3*2*p[4]] for p in P30), 'H30 k2 al derivar n veces y evaluar en el centro queda n!·cₙ (sobre polinomios)')
# k3: 1/x con centro a > 0 cualquiera
A30 = [F(1, 2), F(1), F(3, 2), F(2), F(5, 2), F(3), F(4), F(7, 3)]
ok(all(F((-1)**n*factorial(n))/a**(n+1)/factorial(n) == F((-1)**n)/a**(n+1) and a**(n+1) == a*a**n for a in A30 for n in range(12)) and all(F((-1)**n)*(x-a)**n/a**(n+1) == 1/a*(-(x-a)/a)**n for a in A30 for x in G30 for n in range(7)) and all(1+(x-a)/a == (a+x-a)/a == x/a and (1/a)/(x/a) == 1/a*(a/x) == 1/x for a in A30 for x in G30), 'H30 k3 coeficientes (−1)ⁿ/aⁿ⁺¹, forma geométrica y suma 1/x')
ok(all((abs(-(x-a)/a) < 1) == (abs(x-a) < a) == (-a < x-a < a) == (0 < x < 2*a) for a in A30 for x in G30 + [F(0), F(-1), F(6), F(8), F(9)]) and all(1/x - tx30(N, a, x) == (-(x-a)/a)**(N+1)/x == (1/a)*(-(x-a)/a)**(N+1)/(x/a) for a in A30 for x in G30 for N in range(8)) and all(abs(float(tx30(200, a, x)) - float(1/x)) < 1e-9 for a in A30 for x in G30 if abs(x-a) <= a*F(3, 4)), 'H30 k3 intervalo 0 < x < 2a y lo que falta: f − T_N = r^(N+1)/x')
ok(all((abs(x-a) < abs(a)) == (2*a < x < 0) for a in (F(-1), F(-3, 2)) for x in [F(p, 4) for p in range(-16, 8)]) and all(1/x - sum(F((-1)**n)/a**(n+1)*(x-a)**n for n in range(N+1)) == (-(x-a)/a)**(N+1)/x for a in (F(-1), F(-3, 2)) for x in (F(-1, 2), F(-2), F(-5, 4)) for N in range(6)), 'H30 k3 con a < 0 el intervalo es 2a < x < 0')
# ejemplo 1
ok(all(D30[n][0]*F(1)**D30[n][1] == (-1)**n*factorial(n) for n in range(13)) and [D30[n][0] for n in range(5)] == [1, -1, 2, -6, 24] and (-1)*(-2) == 2 and 2*(-3) == -6 and (-6)*(-4) == 24 and all(((-1)**n*(F(0)-1)**n, (-1)**n*(F(2)-1)**n) == (1, (-1)**n) and (-1)**(2*n) == 1 for n in range(30)), 'H30 e1 derivadas, valores en el centro y extremos x = 0 y x = 2')
ok(F(6, 5)-1 == F(1, 5) and tx30(2, 1, F(6, 5)) == 1-F(1, 5)+F(1, 25) == F(25, 25)-F(5, 25)+F(1, 25) == F(21, 25) and 1/F(6, 5) == F(5, 6) and F(5, 6)-F(21, 25) == F(125, 150)-F(126, 150) == F(-1, 150) and F(-1, 5)**3/F(6, 5) == F(-1, 125)*F(5, 6) == F(-5, 750) == F(-1, 150) and all(abs((-1)**n*(F(3)-1)**n) == 2**n for n in range(20)), 'H30 e1 comprobación en x = 6/5 (cotejo con H28 e4): −1/150; en x = 3 los términos crecen')
# ejemplo 2
p2_30 = [F(5), F(0), F(-3), F(1)]
ok(pd30(p2_30) == [0, -6, 3] and pd30(pd30(p2_30)) == [-6, 6] and cd30(p2_30, 3) == [6] and cd30(p2_30, 4) == [0] and [pe30(cd30(p2_30, n), 2) for n in range(5)] == [1, 0, 6, 6, 0] and 2**3-3*2**2+5 == 8-12+5 == 1 and 3*2**2-6*2 == 12-12 == 0 and 6*2-6 == 6 and [F(1, 1), F(0, 1), F(6, 2), F(6, 6)] == [1, 0, 3, 1], 'H30 e2 derivadas en a = 2 (1, 0, 6, 6, 0) y coeficientes 1, 0, 3, 1')
ok(all((x-2)**2 == x*x-4*x+4 and (x-2)**3 == x**3-4*x*x+4*x-2*x*x+8*x-8 == x**3-6*x*x+12*x-8 and 1+3*(x-2)**2+(x-2)**3 == 1+3*x*x-12*x+12+x**3-6*x*x+12*x-8 == x**3-3*x*x+5 == pe30(p2_30, x) for x in [F(p, 4) for p in range(-20, 21)]) and (3-6, -12+12, 1+12-8) == (-3, 0, 5) and 27-27+5 == 5 == 1+3*1**2+1**3, 'H30 e2 identidad x³ − 3x² + 5 = 1 + 3(x − 2)² + (x − 2)³ y comprobación en x = 3')
# ejemplo 3
L30 = [(F(1), -1)]
for _ in range(10): L30.append(dv30(L30[-1]))
ok(all(L30[n-1] == ((-1)**(n-1)*factorial(n-1), -n) == D30[n-1] for n in range(1, 11)) and [L30[n-1][0] for n in (1, 2, 3, 4)] == [1, -1, 2, -6] and all(F((-1)**(n-1)*factorial(n-1), factorial(n)) == F((-1)**(n-1), n) and factorial(n) == n*factorial(n-1) for n in range(1, 40)) and math.log(1) == 0, 'H30 e3 derivadas de ln x (las de 1/x corridas un lugar) y cₙ = (−1)ⁿ⁻¹/n')
ok(all(abs(x-1)**(n+1)/(n+1)*n/abs(x-1)**n == abs(x-1)*F(n, n+1) for x in G30 for n in range(1, 8)) and abs(1 - 10**6/(10**6+1)) < 1e-5 and all(F((-1)**(n-1))*(F(0)-1)**n/n == F((-1)**(2*n-1), n) == F(-1, n) and F((-1)**(n-1))*(F(2)-1)**n/n == F((-1)**(n-1), n) and (2*n-1) % 2 == 1 for n in range(1, 40)) and all((-1)**(n+1) == (-1)**(n-1)*(-1)**2 == (-1)**(n-1) for n in range(1, 40)), 'H30 e3 cociente, extremos x = 0 (−1/n) y x = 2 (alternada), y signos (−1)ⁿ⁺¹ = (−1)ⁿ⁻¹')
ok(all(abs(float(tl30(400, 1, x)) - math.log(float(x))) < 1e-9 for x in G30 if F(1, 4) <= x <= F(7, 4)) and all(tl30(N, 1, x) == sum(F((-1)**(n+1), n)*(x-1)**n for n in range(1, N+1)) for x in G30 for N in range(1, 9)), 'H30 e3 primer camino: es la serie de ln(1 + u) con u = x − 1; cercanía numérica a ln x')
ok(all(F(factorial(N), factorial(N+1)) == F(1, N+1) for N in range(40)) and all(abs(math.log(float(x)) - float(tl30(N, 1, x))) <= float((x-1)**(N+1)/(N+1)) + 1e-12 and (x-1)**(N+1) <= 1 for x in [F(p, 8) for p in range(8, 17)] for N in range(0, 40)) and all(factorial(N)/t**(N+1) <= factorial(N) for t in [F(p, 8) for p in range(8, 17)] for N in range(12)) and abs(float(tl30(4000, 1, 2)) - math.log(2)) < 1/4001, 'H30 e3 segundo camino: |R_N(x)| ≤ (x − 1)^(N+1)/(N + 1) ≤ 1/(N + 1) en [1, 2], numérico; ln 2')
ok(tl30(4, 1, F(3, 2)) == F(1, 2)-F(1, 8)+F(1, 24)-F(1, 64) == F(96, 192)-F(24, 192)+F(8, 192)-F(3, 192) == F(77, 192) and rd30(F(77, 192)) == 4010 and round(math.log(1.5)*10**4) == 4055 and 4055-4010 == 45 and F(1, 5)*F(1, 2)**5 == F(1, 5)*F(1, 32) == F(1, 160) == F('0.00625') and abs(math.log(1.5) - 77/192) <= 1/160 and F('0.0045') < F('0.00625'), 'H30 e3 comprobación en x = 3/2: 77/192 ≈ 0,4010; distancia 0,0045 bajo la cota 1/160')
# ejemplo 4
ok(all(abs(x-1)**(n+1)/factorial(n+1)*factorial(n)/abs(x-1)**n == abs(x-1)*F(1, n+1) for x in G30 for n in range(8)) and all(F(factorial(n), factorial(n+1)) == F(1, n+1) for n in range(40)) and all(abs(math.e*float(sum((x-1)**n/factorial(n) for n in range(60))) - math.exp(float(x))) < 1e-9 for x in G30 + [F(-2), F(-1, 2), F(4), F(5)]) and abs(math.e - 2.7183) < T30, 'H30 e4 cociente |x − 1|/(n + 1) y cercanía numérica de Σ e(x − 1)ⁿ/n! a eˣ')
ok(all(abs(math.exp(float(x)) - math.e*float(sum((x-1)**n/factorial(n) for n in range(N+1)))) <= max(math.e, math.exp(float(x)))*float(abs(x-1)**(N+1)/factorial(N+1))*(1+1e-9) + 1e-12 for x in G30 + [F(-2), F(-1, 2), F(4)] for N in range(0, 25)) and all(float(F(4)**n/factorial(n)) < 1e-6 for n in range(40, 60)), 'H30 e4 la cota de Lagrange con M = mayor de e y eˣ se cumple en rejilla (numérico) y |x − 1|ⁿ/n! se achica')
ok(F(1, 2)**2 == F(1, 4) and F(1, 4)/2 == F(1, 8) and F(1, 2)**3 == F(1, 8) and F(1, 8)/6 == F(1, 48) and 1+F(1, 2)+F(1, 8)+F(1, 48) == F(48+24+6+1, 48) == F(79, 48) == sum(F(1, 2)**n/factorial(n) for n in range(4)) and F('2.7183')*79 == F('214.7457') and rd30(F('214.7457')/48) == 44739 and round(math.exp(1.5)*10**4) == 44817 and 44817-44739 == 78, 'H30 e4 comprobación en x = 3/2: e·79/48 ≈ 4,4739 contra 4,4817; distancia 0,0078')
# ejercicio A
pA_30 = [F(0), F(1), F(0), F(1)]
ok(pd30(pA_30) == [1, 0, 3] and cd30(pA_30, 2) == [0, 6] and cd30(pA_30, 3) == [6] and [pe30(cd30(pA_30, n), -1) for n in range(5)] == [-2, 4, -6, 6, 0] and (-1)**3+(-1) == -2 and 3*(-1)**2+1 == 4 and 6*(-1) == -6 and [F(-2, 1), F(4, 1), F(-6, 2), F(6, 6)] == [-2, 4, -3, 1], 'H30 A (a) derivadas en a = −1 y coeficientes −2, 4, −3, 1')
ok(all((x+1)**2 == x*x+2*x+1 and (x+1)**3 == x**3+2*x*x+x+x*x+2*x+1 == x**3+3*x*x+3*x+1 and -2+4*(x+1)-3*(x+1)**2+(x+1)**3 == -2+(4*x+4)+(-3*x*x-6*x-3)+(x**3+3*x*x+3*x+1) == x**3+x for x in [F(p, 4) for p in range(-20, 21)]) and (-3+3, 4-6+3, -2+4-3+1) == (0, 1, 0), 'H30 A (a) identidad x³ + x = −2 + 4(x + 1) − 3(x + 1)² + (x + 1)³')
ok([D30[n][0]*F(2)**D30[n][1] for n in range(4)] == [F(1, 2), F(-1, 4), F(2, 8), F(-6, 16)] == [F(1, 2), F(-1, 4), F(1, 4), F(-3, 8)] and all(F((-1)**n*factorial(n), 2**(n+1)*factorial(n)) == F((-1)**n, 2**(n+1)) for n in range(30)) and all(abs(x-2)**(n+1)/2**(n+2)*2**(n+1)/abs(x-2)**n == abs(x-2)/2 for x in G30 if x != 2 for n in range(6)) and all((abs(x-2)/2 < 1) == (abs(x-2) < 2) == (0 < x < 4) for x in [F(p, 4) for p in range(-8, 28)]) and all(F(2**n, 2**(n+1)) == F(1, 2) for n in range(30)), 'H30 A (b) coeficientes (−1)ⁿ/2ⁿ⁺¹, cociente |x − 2|/2, intervalo (0, 4) y extremos')
ok(all(1+(x-2)/2 == (2+x-2)/2 == x/2 and F(1, 2)/(x/2) == F(1, 2)*(2/x) == 1/x for x in G30) and tx30(2, 2, 3) == F(1, 2)-F(1, 4)+F(1, 8) == F(4, 8)-F(2, 8)+F(1, 8) == F(3, 8) and F(1, 3)-F(3, 8) == F(8, 24)-F(9, 24) == F(-1, 24) and F(-1, 2)**3/3 == F(-1, 8)/3 == F(-1, 24), 'H30 A (b) suma geométrica 1/x y comprobación en x = 3: −1/24')
ok(abs(5-2) == 3 > 2 and -F(5-2, 2) == F(-3, 2) and [F(1, 2)*F(-3, 2)**n for n in range(4)] == [F(1, 2), F(-3, 4), F(9, 8), F(-27, 16)] and all(abs(F(1, 2)*F(-3, 2)**(n+1)) > abs(F(1, 2)*F(-3, 2)**n) for n in range(30)) and 0 < 5 < 2*4 and abs(float(tx30(300, 4, 5)) - 0.2) < 1e-12, 'H30 A (c) x = 5 queda fuera de (0, 4); con centro 4 sí sirve')
# ejercicio B
ok([L30[n-1][0]*F(2)**L30[n-1][1] for n in (1, 2, 3, 4)] == [F(1, 2), F(-1, 4), F(2, 8), F(-6, 16)] == [F(1, 2), F(-1, 4), F(1, 4), F(-3, 8)] and all(F((-1)**(n-1)*factorial(n-1), 2**n*n*factorial(n-1)) == F((-1)**(n-1), n*2**n) == L30[n-1][0]*F(2)**L30[n-1][1]/factorial(n) for n in range(1, 11)) and [F((-1)**(n-1), n*2**n) for n in (1, 2, 3, 4)] == [F(1, 2), F(-1, 8), F(1, 24), F(-1, 64)], 'H30 B (a) derivadas de ln x en a = 2 y coeficientes (−1)ⁿ⁻¹/(n·2ⁿ)')
ok(all(abs(x-2)**(n+1)/((n+1)*2**(n+1))*(n*2**n)/abs(x-2)**n == abs(x-2)/2*F(n, n+1) for x in G30 if x != 2 for n in range(1, 8)) and all(F((-1)**(n-1))*F(-2)**n/(n*2**n) == F((-1)**(2*n-1), n) == F(-1, n) and F(-2)**n == (-1)**n*2**n and F((-1)**(n-1))*F(2)**n/(n*2**n) == F((-1)**(n-1), n) for n in range(1, 40)), 'H30 B (b) cociente (|x − 2|/2)·n/(n + 1); extremos x = 0 (−1/n) y x = 4 (alternada)')
ok(all(x == 2*(x/2) and x/2 == (2+(x-2))/2 == 1+(x-2)/2 and (abs((x-2)/2) < 1) == (0 < x < 4) and ((x-2)/2)**n == (x-2)**n/2**n for x in G30 + [F(7, 2), F(4), F(5)] for n in range(6)) and all(abs(math.log(2) + float(tl30(400, 2, x)) - math.log(float(x))) < 1e-9 for x in G30 + [F(3), F(7, 2)] if F(1, 2) <= x <= F(7, 2)) and all(abs(math.log(2*t) - math.log(2) - math.log(t)) < 1e-12 for t in (0.3, 1.0, 1.5, 7.0)), 'H30 B (c) ln x = ln 2 + ln(1 + (x − 2)/2); cercanía numérica a ln x')
ok(tl30(4, 2, 3) == F(1, 2)-F(1, 8)+F(1, 24)-F(1, 64) == F(77, 192) and rd30(F(77, 192)) == 4010 and round(math.log(2)*10**4) == 6931 and 6931+4010 == 10941 and round(math.log(3)*10**4) == 10986 and 10986-10941 == 45, 'H30 B (d) ln 3 ≈ 0,6931 + 0,4010 = 1,0941 contra 1,0986; distancia 0,0045')
# ejercicio C
ok(F(1, 2)*F(-1, 2) == F(-1, 4) and F(-1, 4)*F(-3, 2) == F(3, 8) and 5**2 == 25 and 5**3 == 125 and 5**5 == 3125 and F(1, 2)*F(1, 5) == F(1, 10) and F(-1, 4)*F(1, 125) == F(-1, 500) and F(-1, 500)/2 == F(-1, 1000) and 5+F(1, 10)-F(1, 1000) == 5+F('0.1')-F('0.001') == F('5.099') and abs(0.5*25**-0.5 - 0.1) < 1e-12 and abs(-0.25*25**-1.5 + 1/500) < 1e-12 and abs(0.375*25**-2.5 - 3/25000) < 1e-12, 'H30 C (a)(b) derivadas de √x en 25, coeficientes 5, 1/10, −1/1000 y T₂(26) = 5,099')
ok(F(3, 8*3125) == F(3, 25000) and F(3, 25000)/6*1 == F(3, 150000) == F(1, 50000) == F('0.00002') and F('5.099')-F('0.00002') == F('5.09898') and F('5.099')+F('0.00002') == F('5.09902') and F('5.09898')**2 < 26 < F('5.09902')**2 and abs(math.sqrt(26) - 5.099) <= 1/50000 and F('5.099')**2 == F('25.999801') and all(0.375*t**-2.5 <= 3/25000 + 1e-15 for t in (25, 25.25, 25.5, 25.75, 26)), 'H30 C (c) cota de Lagrange 1/50000 y 5,09898 ≤ √26 ≤ 5,09902 (comprobado al cuadrado)')
ok(4*F('5.099') == F('20.396') and 4*F('0.00002') == F('0.00008') < F('0.0001') and rd30(F('20.396'), 2) == 2040, 'H30 C (d) perímetro 20,396 m, error máximo 0,00008 m')
# H31 · Determinar serie de Maclaurin de una función (fragmento: va antes de la línea final print del verificador del lote 25)
G31 = [F(p, 8) for p in range(-7, 8)]                       # rejilla de x en (−1, 1)
d31 = lambda t: (t[0]*t[3]*t[2], t[1], t[2], t[3]-1)        # derivada de c·(a + b·x)^e, como (c, a, b, e): potencia y cadena
ev31 = lambda t, x: 0 if t[0] == 0 else t[0]*F(t[1]+t[2]*x)**t[3]
def ch31(t, n):                                             # derivada de orden n
    for _ in range(n): t = d31(t)
    return t
dp31 = lambda a: [j*a[j] for j in range(1, len(a))] or [0]  # derivada de un polinomio dado por sus coeficientes
def dpn31(a, n):
    for _ in range(n): a = dp31(a)
    return a
pv31 = lambda a, x: sum(c*x**j for j, c in enumerate(a))
cm31 = lambda n: (-1)**n*(n+1)                              # coeficientes de 1/(1 + x)²
P31 = lambda N, x: sum(cm31(n)*x**n for n in range(N+1))
f31 = (1, 1, 1, -2)
# mac-idea: registro R1–R6 y lectura
ok([ev31(ch31(f31, n), 0) for n in range(4)] == [1, -2, 6, -24] and ch31(f31, 1) == (-2, 1, 1, -3) and ch31(f31, 2) == (6, 1, 1, -4) and ch31(f31, 3) == (-24, 1, 1, -5) and (-2)*(-3) == 6 and 6*(-4) == -24, 'H31 idea R1–R4 derivadas de (1 + x)⁻² y sus valores en 0')
ok([factorial(n) for n in range(5)] == [1, 1, 2, 6, 24] and [F(ev31(ch31(f31, n), 0), factorial(n)) for n in range(4)] == [1, -2, 3, -4] == [cm31(n) for n in range(4)] and F(-24, 6) == -4 and F(6, 2) == 3, 'H31 idea R1–R4 coeficientes 1, −2, 3, −4')
ok(all(ev31(ch31(f31, n), x) == (-1)**n*factorial(n+1)*F(1+x)**(-(n+2)) for n in range(14) for x in G31) and all((-1)**n*factorial(n+1)*(-(n+2)) == (-1)**(n+1)*factorial(n+2) and factorial(n+1) == (n+1)*factorial(n) and F((-1)**n*factorial(n+1), factorial(n)) == cm31(n) for n in range(30)), 'H31 idea R5 patrón f⁽ⁿ⁾(x) y cₙ = (−1)ⁿ(n + 1)')
ok(cm31(8) == 9 == (-1)**8*9 and [P31(N, F(1, 4)) for N in range(4)] == [1, F(1, 2), F(11, 16), F(5, 8)] and F(1, 4)**2 == F(1, 16) and F(1, 4)**3 == F(1, 64) and 2*F(1, 4) == F(2, 4) == F(1, 2) and 3*F(1, 16) == F(3, 16) and 4*F(1, 64) == F(4, 64) == F(1, 16) and F(1, 2)+F(3, 16) == F(8, 16)+F(3, 16) == F(11, 16) == F('0.6875') and F(11, 16)-F(1, 16) == F(10, 16) == F(5, 8) == F('0.625'), 'H31 idea paso 4: prueba con x = 1/4, sumas 1; 0,5; 0,6875; 0,625')
ok(1+F(1, 4) == F(5, 4) and F(5, 4)**2 == F(25, 16) and 1/F(25, 16) == F(16, 25) == F('0.64') == ev31(f31, F(1, 4)) and [abs(F('0.64')-v) for v in (1, F('0.5'), F('0.6875'), F('0.625'))] == [F('0.36'), F('0.14'), F('0.0475'), F('0.015')] and F('0.36') > F('0.14') > F('0.0475') > F('0.015'), 'H31 idea paso 4: f(1/4) = 0,64 y distancias decrecientes')
ok(all(F((n+2)*abs(x)**(n+1), (n+1)*abs(x)**n) == abs(x)*F(n+2, n+1) == abs(x)*(1+F(1, n+1)) for n in range(40) for x in G31 + [F(3, 2), F(-2)] if x != 0) and abs(float(F(10**6+2, 10**6+1)) - 1) < 1e-5 and all(abs(cm31(n)*s**n) == n+1 >= 1 for n in range(60) for s in (1, -1)), 'H31 idea R6 cociente |x|(n + 2)/(n + 1) y extremos de tamaño n + 1')
ok(all((1+x)**2*P31(N, x) == 1 + (-1)**N*(N+2)*x**(N+1) + (-1)**N*(N+1)*x**(N+2) for N in range(14) for x in G31 + [F(3, 2)]) and all(abs(float(P31(400, x)) - float(ev31(f31, x))) < 1e-9 for x in G31 if abs(x) <= F(3, 4)) and abs(P31(8, F(3, 2))) > 100 and abs(float(P31(8, F(1, 4))) - 0.64) < 1e-3, 'H31 idea: identidad finita exacta y cercanía de las sumas a 1/(1 + x)² dentro; lejos en x = 3/2')
ok(all(sum((-1)**(n+1)*n*x**(n-1) for n in range(1, N+1)) == P31(N-1, x) for N in range(1, 12) for x in G31) and all((-1)**(m+2) == (-1)**m*(-1)**2 == (-1)**m for m in range(40)), 'H31 k2: la serie del camino 2 (H29, ejercicio A), con m = n − 1, es la misma')
# k1: derivar n veces una suma de potencias y evaluar en 0 da n!·cₙ (se comprueba con sumas finitas); pares e impares
A31 = [3, -5, 0, 2, 7, -1, 4, 0, 9]
ok(all(dpn31(A31, n)[0] == factorial(n)*A31[n] for n in range(len(A31))) and all(pv31(dpn31(A31, n), 0) == 0 for n in range(len(A31), len(A31)+3)) and dp31([0, 2]) == [2] and dp31([0, 0, 3]) == [0, 3*2] and dp31([0, 0, 0, 4]) == [0, 0, 4*3] and dpn31([0, 0, 0, 1], 3) == [3*2*1] and dpn31([0, 0, 0, 0, 1], 3) == [0, 4*3*2] and 3*2*1 == 6, 'H31 k1: f⁽ⁿ⁾(0) = n!·cₙ en una suma finita; derivadas de 2c₂x, 3c₃x², 4c₄x³')
ok(all(pv31(dpn31([5, 0, -3, 0, 2, 0, 1], n), 0) == 0 for n in (1, 3, 5)) and all(pv31(dpn31([0, 4, 0, -1, 0, 6], n), 0) == 0 for n in (0, 2, 4)) and all(pv31([5, 0, -3, 0, 2], -x) == pv31([5, 0, -3, 0, 2], x) and pv31(dp31([5, 0, -3, 0, 2]), -x) == -pv31(dp31([5, 0, -3, 0, 2]), x) and pv31([0, 4, 0, -1], -x) == -pv31([0, 4, 0, -1], x) and pv31(dp31([0, 4, 0, -1]), -x) == pv31(dp31([0, 4, 0, -1]), x) for x in G31), 'H31 k2: par ⟹ derivadas impares nulas en 0; impar ⟹ pares nulas; la derivada cambia la paridad (rejilla)')
# mac-vivo: las 25 posiciones (k de 0 a 4, N de 0 a 4)
def viv31(k, N):
    d = [ev31(ch31((1, 1, 1, k), n), 0) for n in range(5)]; c = [F(d[n], factorial(n)) for n in range(5)]; m = min(N, k)
    qP = 2**m; pP = sum(c[n]*2**(m-n) for n in range(m+1)); qF = 2**k; pF = 3**k; pD = pF - pP*2**(k-m)
    return d, c, m, pP, qP, pF, qF, pD
for k31 in range(5):
    for N31 in range(5):
        d, c, m, pP, qP, pF, qF, pD = viv31(k31, N31)
        fall = [math.prod(range(k31-n+1, k31+1)) for n in range(5)]
        ok(d == fall and c == [math.comb(k31, n) for n in range(5)] and all(ev31(ch31((1, 1, 1, k31), n), 0) == 0 for n in range(k31+1, k31+4)) and all(ev31(ch31((1, 1, 1, k31), n), x) == fall[n]*F(1+x)**(k31-n) for n in range(k31+1) for x in G31), f'H31 vivo k={k31} N={N31}: derivadas, valores en 0 y coeficientes')
        ok(sum(c[n]*F(1, 2)**n for n in range(m+1)) == F(pP, qP) and all(c[n]*F(1, 2**n) == F(c[n]*qP//2**n, qP) for n in range(m+1)) and F(3, 2)**k31 == F(pF, qF) and F(pF, qF)-F(pP, qP) == F(pF, qF)-F(pP*qF//qP, qF) == F(pD, qF) == sum(c[n]*F(1, 2**n) for n in range(N31+1, 5)) == sum(F(c[n]*qF//2**n, qF) for n in range(N31+1, k31+1)) and (pD == 0) == (N31 >= k31) and pD >= 0, f'H31 vivo k={k31} N={N31}: suma, función y diferencia en x = 1/2')
        ok(all(sum(c[n]*x**n for n in range(5)) == (1+x)**k31 for x in G31 + [F(3), F(-5, 2)]) and (float(F(pD, qF))*10**4).is_integer() and (float(F(pP, qP))*10**4).is_integer(), f'H31 vivo k={k31} N={N31}: la serie completa es (1 + x)^k; decimales exactos')
ok(viv31(3, 1)[3:] == (5, 2, 27, 8, 7) and F(27, 8) == F('3.375') and F(5, 2) == F('2.5') and F(7, 8) == F('0.875') == F(6, 8)+F(1, 8) and viv31(4, 4)[3:] == (81, 16, 81, 16, 0) and F(81, 16) == F('5.0625') and viv31(4, 0)[7] == 65 and F(65, 16) == F('4.0625') and viv31(4, 3)[3:5] == (40, 8) and viv31(4, 2)[3:5] == (18, 4) and F(18, 4) == F(9, 2) and viv31(0, 2)[1] == [1, 0, 0, 0, 0] and viv31(0, 2)[7] == 0 and [factorial(n) for n in (2, 3, 4)] == [2, 6, 24] == [2*1, 3*2*1, 4*6], 'H31 vivo: valores citados (k = 3, N = 1: 3,375; 2,5; 0,875) y casos límite')
# ejemplo 1
e31 = (1, 1, -1, -1)
ok([ch31(e31, n) for n in (1, 2, 3)] == [(1, 1, -1, -2), (2, 1, -1, -3), (6, 1, -1, -4)] and (-1)*(-1) == 1 and (-2)*(-1) == 2 and 2*(-3)*(-1) == 6 and all(ev31(ch31(e31, n), x) == factorial(n)*F(1-x)**(-(n+1)) for n in range(14) for x in G31) and all(factorial(n)*(-(n+1))*(-1) == factorial(n+1) and F(factorial(n), factorial(n)) == 1 for n in range(30)), 'H31 e1 derivadas de (1 − x)⁻¹, patrón n!(1 − x)^−(n+1) y cₙ = 1')
ok(all((1-x)*sum(x**n for n in range(N+1)) == 1-x**(N+1) for N in range(12) for x in G31) and all(F(abs(x)**(n+1), abs(x)**n) == abs(x) for n in range(20) for x in G31 if x != 0) and all(abs(s**n) == 1 for n in range(40) for s in (1, -1)), 'H31 e1 cociente |x|, extremos e identidad de la geométrica')
# ejemplo 2
l31 = (1, 1, 1, -1)   # f′ de ln(1 + x)
ok(math.log(1) == 0 and [ch31(l31, n) for n in (1, 2, 3)] == [(-1, 1, 1, -2), (2, 1, 1, -3), (-6, 1, 1, -4)] and [ev31(ch31(l31, n-1), 0) for n in (1, 2, 3, 4)] == [1, -1, 2, -6] and all(ev31(ch31(l31, n-1), x) == (-1)**(n-1)*factorial(n-1)*F(1+x)**(-n) for n in range(1, 14) for x in G31) and all((-1)**(n-1)*factorial(n-1)*(-n) == (-1)**n*factorial(n) and factorial(n) == n*factorial(n-1) and F((-1)**(n-1)*factorial(n-1), factorial(n)) == F((-1)**(n-1), n) and (-1)**(n+1) == (-1)**(n-1)*(-1)**2 == (-1)**(n-1) for n in range(1, 30)), 'H31 e2 derivadas de ln(1 + x), patrón y cₙ = (−1)ⁿ⁻¹/n; mismo signo que (−1)ⁿ⁺¹')
ok(all(abs((math.log(1+x+1e-6) - math.log(1+x-1e-6))/2e-6 - 1/(1+x)) < 1e-6 for x in (-0.5, 0, 0.5, 2)) and all(F(abs(x)**(n+1), n+1)*F(n, abs(x)**n) == abs(x)*F(n, n+1) for n in range(1, 30) for x in G31 if x != 0) and all(abs(float(sum(F((-1)**(n-1), n)*x**n for n in range(1, 400))) - math.log(1+float(x))) < 1e-9 for x in G31 if abs(x) <= F(3, 4)), 'H31 e2 derivada numérica, cociente y cercanía a ln(1 + x)')
ok(F(1, 5)**2 == F(1, 25) and F(1, 25)/2 == F(1, 50) and F(1, 5)**3 == F(1, 125) and F(1, 125)/3 == F(1, 375) and math.lcm(5, 50, 375) == 750 and F(1, 5) == F(150, 750) and F(1, 50) == F(15, 750) and F(1, 375) == F(2, 750) and F(1, 5)-F(1, 50)+F(1, 375) == F(150-15+2, 750) == F(137, 750) and round(137/750*10**4) == 1827 and round(math.log(1.2)*10**4) == 1823, 'H31 e2 comprobación 137/750 ≈ 0,1827; ln 1,2 ≈ 0,1823')
# ejemplo 3
p31 = [3, -5, 0, 2]
ok(dp31(p31) == [-5, 0, 6] and dpn31(p31, 2) == [0, 12] and dpn31(p31, 3) == [12] and dpn31(p31, 4) == [0] and [pv31(dpn31(p31, n), 0) for n in range(6)] == [3, -5, 0, 12, 0, 0] and [F(pv31(dpn31(p31, n), 0), factorial(n)) for n in range(6)] == [3, -5, 0, 2, 0, 0] and F(12, 6) == 2, 'H31 e3 (a) derivadas y coeficientes de 3 − 5x + 2x³')
q31 = (1, -1, 1, 2)
ok(ch31(q31, 1) == (2, -1, 1, 1) and ch31(q31, 2) == (2, -1, 1, 0) and ev31(ch31(q31, 3), 0) == 0 and [ev31(ch31(q31, n), 0) for n in range(3)] == [1, -2, 2] and [F(ev31(ch31(q31, n), 0), factorial(n)) for n in range(3)] == [1, -2, 1] and all((x-1)**2 == 1-2*x+x**2 for x in G31 + [F(5), F(-7, 3)]), 'H31 e3 (b) (x − 1)² = 1 − 2x + x²')
ok(all(dpn31([0]*j + [1], n) == ([0]*(j-n) + [math.prod(range(j-n+1, j+1))] if n <= j else [0]) for j in range(7) for n in range(9)) and all([F(dpn31(A31, n)[0], factorial(n)) if n < len(A31) else 0 for n in range(12)] == A31 + [0, 0, 0] for _ in (0,)), 'H31 e3 (c) derivar n veces x^j: 0 si j < n, n! si j = n, múltiplo de x^(j−n) si j > n; cₙ = aₙ')
# ejemplo 4
g31 = (1, 1, 1, -1)
ok(all(1/(1-x**2) == F(1, 2)/(1-x) + F(1, 2)/(1+x) == F(1, 2)*F((1+x)+(1-x), (1-x)*(1+x)) and 1/(1-(-x)**2) == 1/(1-x**2) and (1-x)*(1+x) == 1-x**2 for x in G31 + [F(3), F(-5, 2)]) and [ch31(g31, n) for n in (1, 2, 3)] == [(-1, 1, 1, -2), (2, 1, 1, -3), (-6, 1, 1, -4)] and all(ev31(ch31(g31, n), x) == (-1)**n*factorial(n)*F(1+x)**(-(n+1)) for n in range(14) for x in G31) and all((-1)**n*factorial(n)*(-(n+1)) == (-1)**(n+1)*factorial(n+1) for n in range(30)), 'H31 e4 función par, separación en dos fracciones y derivadas de (1 + x)⁻¹')
ok(all(F(1, 2)*ev31(ch31(e31, n), 0) + F(1, 2)*ev31(ch31(g31, n), 0) == F(factorial(n), 2)*(1+(-1)**n) == (factorial(n) if n % 2 == 0 else 0) for n in range(16)) and all(F(F(factorial(n), 2)*(1+(-1)**n), factorial(n)) == (1 if n % 2 == 0 else 0) for n in range(16)) and all((1-x**2)*sum(x**(2*k) for k in range(K+1)) == 1-x**(2*K+2) and sum((x**2)**n for n in range(K+1)) == sum(x**(2*n) for n in range(K+1)) for K in range(10) for x in G31) and all((x*x < 1) == (abs(x) < 1) for x in G31 + [F(1), F(-1), F(3, 2), F(-2)]), 'H31 e4 f⁽ⁿ⁾(0) = n! o 0; coeficientes 1 o 0; mismo resultado que la geométrica de razón x²')
ok(1-F(1, 4) == F(3, 4) and 1/F(3, 4) == F(4, 3) and round(4/3*10**4) == 13333 and 1+F(1, 4)+F(1, 16) == F(16+4+1, 16) == F(21, 16) == F('1.3125') and all(abs(s**(2*n)) == 1 for n in range(30) for s in (1, -1)), 'H31 e4 comprobación con x = 1/2: 4/3 y 21/16; extremos')
# ejercicio A
a31 = (1, 2, -1, -1)
ok([ch31(a31, n) for n in (1, 2, 3)] == [(1, 2, -1, -2), (2, 2, -1, -3), (6, 2, -1, -4)] and [ev31(ch31(a31, n), 0) for n in range(4)] == [F(1, 2), F(1, 4), F(2, 8), F(6, 16)] == [F(1, 2), F(1, 4), F(1, 4), F(3, 8)] and all(ev31(ch31(a31, n), x) == factorial(n)*F(2-x)**(-(n+1)) for n in range(14) for x in G31) and all(F(ev31(ch31(a31, n), 0), factorial(n)) == F(1, 2**(n+1)) for n in range(20)) and F(1, 4)/2 == F(1, 8) and F(3, 8)/6 == F(3, 48) == F(1, 16), 'H31 A (a) derivadas de (2 − x)⁻¹, valores 1/2, 1/4, 1/4, 3/8 y cₙ = 1/2ⁿ⁺¹')
ok(all(F(abs(x)**(n+1), 2**(n+2))*F(2**(n+1), abs(x)**n) == abs(x)/2 for n in range(20) for x in G31 + [F(3), F(-5, 2)] if x != 0) and all(F(2**n, 2**(n+1)) == F(1, 2) and F((-2)**n, 2**(n+1)) == F((-1)**n, 2) for n in range(30)) and all((2-x)*sum(F(x**n, 2**(n+1)) for n in range(N+1)) == 1-(x/2)**(N+1) for N in range(12) for x in [F(p, 4) for p in range(-7, 8)]) and [sum(F(1, 2**(n+1)) for n in range(N+1)) for N in range(4)] == [F(1, 2), F(3, 4), F(7, 8), F(15, 16)] and F(1, 2-1) == 1, 'H31 A (b)(c) cociente |x|/2, extremos, identidad de la geométrica y sumas parciales en x = 1')
h31 = (1, 1, -1, 3)
ok([ch31(h31, n) for n in (1, 2, 3)] == [(-3, 1, -1, 2), (6, 1, -1, 1), (-6, 1, -1, 0)] and ev31(ch31(h31, 4), 0) == 0 and [ev31(ch31(h31, n), 0) for n in range(4)] == [1, -3, 6, -6] and [F(ev31(ch31(h31, n), 0), factorial(n)) for n in range(4)] == [1, -3, 3, -1] and all((1-x)**3 == 1-3*x+3*x**2-x**3 for x in G31 + [F(2), F(-3)]) and (1-2)**3 == -1 == 1-3*2+3*4-8 == 1-6+12-8, 'H31 A (d) (1 − x)³ = 1 − 3x + 3x² − x³')
# ejercicio B
ok(all(-x/(1-(-x)**2) == -(x/(1-x**2)) and F(1, 2)/(1-x) - F(1, 2)/(1+x) == F(1, 2)*F((1+x)-(1-x), (1-x)*(1+x)) == F(1, 2)*2*x/(1-x**2) == x/(1-x**2) for x in G31 + [F(3), F(-5, 2)]) and all(x*sum(x**(2*n) for n in range(K+1)) == sum(x**(2*n+1) for n in range(K+1)) and (1-x**2)*sum(x**(2*n+1) for n in range(K+1)) == x-x**(2*K+3) for K in range(10) for x in G31), 'H31 B (a)(b)(c) impar, serie x + x³ + x⁵ + ⋯ y separación')
ok(all(F(1, 2)*ev31(ch31(e31, n), 0) - F(1, 2)*ev31(ch31(g31, n), 0) == F(factorial(n), 2)*(1-(-1)**n) == (factorial(n) if n % 2 else 0) for n in range(16)) and factorial(5) == 5*4*3*2*1 == 120 and factorial(6) == 6*120 == 720 and 120*1 == 120 and 720*0 == 0, 'H31 B (c)(d) f⁽ⁿ⁾(0) = n! (impar) o 0 (par); f⁽⁵⁾(0) = 120, f⁽⁶⁾(0) = 0')
ok(all((1*(1-x**2) - x*(-2*x))/(1-x**2)**2 == (1-x**2+2*x**2)/(1-x**2)**2 == (1+x**2)/(1-x**2)**2 for x in G31) and all(abs(((x+1e-6)/(1-(x+1e-6)**2) - (x-1e-6)/(1-(x-1e-6)**2))/2e-6 - (1+x*x)/(1-x*x)**2) < 1e-5 for x in (-0.5, 0, 0.3, 0.6)) and F(1+0, (1-0)**2) == 1 and F(1, 2)/F(3, 4) == F(1, 2)*F(4, 3) == F(2, 3) and round(2/3*10**4) == 6667 and F(1, 2)+F(1, 8)+F(1, 32) == F(16+4+1, 32) == F(21, 32) == F('0.65625'), 'H31 B (e) regla del cociente, f′(0) = 1 y comprobación con x = 1/2')
# ejercicio C
x31 = F(1, 20); b31 = lambda n: n*x31**(n-1)
ok(x31 == F('0.05') and x31**2 == F(1, 400) == F('0.0025') and x31**3 == F(1, 8000) == F('0.000125') and 2*x31 == F('0.1') and 3*F('0.0025') == F('0.0075') and 4*F('0.000125') == F('0.0005') and [b31(n) for n in (1, 2, 3, 4)] == [1, F('0.1'), F('0.0075'), F('0.0005')] and 1-F('0.1')+F('0.0075') == F('0.9')+F('0.0075') == F('0.9075') == P31(2, x31) and F('0.9075')-F('0.0005') == F('0.907') == P31(3, x31), 'H31 C (a) términos y S₃ = 0,9075, S₄ = 0,907')
ok(all(b31(n) > 0 and b31(n+1)/b31(n) == F(n+1, n)*F(1, 20) and F(n+1, n) == 1+F(1, n) <= 2 and b31(n+1)/b31(n) <= F(2, 20) == F(1, 10) < 1 and b31(n+1) < b31(n) and b31(n) <= F(1, 10)**(n-1) for n in range(1, 80)) and all(cm31(n-1)*x31**(n-1) == (-1)**(n+1)*b31(n) for n in range(1, 30)), 'H31 C (b) condiciones de Leibniz en rejilla de n; bₙ ≤ (1/10)ⁿ⁻¹')
v31 = F(400, 441)
ok(1+x31 == F(21, 20) and F(21, 20)**2 == F(441, 400) and 1/F(441, 400) == v31 == ev31(f31, x31) and round(float(v31)*10**6) == 907029 and abs(v31-F('0.9075')) <= b31(4) and F('0.907') <= v31 <= F('0.9075') and P31(1, x31) == F('0.9') <= v31 and 10**6*F('0.9075') == 907500 and 10**6*F('0.0005') == 500 and 907500-500 == 907000 and 907500+500 == 908000 and 10**6*F('0.907') == 907000 and round(float(10**6*v31)) == 907029 and round(float(907500-10**6*v31)) == 471 and 10**6*F('0.9') == 900000 and 2*x31 == F(10, 100), 'H31 C (b)(c) cota 0,0005, S₄ ≤ f ≤ S₃, pesos y valor exacto 400/441')
ok(abs(F('1.5')) > 1 and [n*F('1.5')**(n-1) for n in (1, 2, 3, 4)] == [1, 3, F('6.75'), F('13.5')] and F('1.5')**2 == F('2.25') and F('1.5')**3 == F('3.375') and F('2.5')**2 == F('6.25') and 1/F('6.25') == F('0.16') == ev31(f31, F('1.5')) and 10**6*F('0.16') == 160000 and all((n+1)*F('1.5')**n > n*F('1.5')**(n-1) for n in range(1, 60)), 'H31 C (d) x = 1,5 queda fuera: términos 1; 3; 6,75; 13,5 y f = 0,16')
# H32
# H32 · Series de Maclaurin de eˣ, sen x y cos x: registro y lectura de esc3-idea (6 pasos) y esc3-vivo (6 posiciones de x), recuadro del resto, ejemplos 1-4 y ejercicios A, B, C. Las derivadas de eˣ, sen y cos, la cota de Lagrange y el teorema de derivación término a término se citan en la hoja: aquí se comprueban los coeficientes, las identidades exactas de los cocientes, las cotas en rejilla y la cercanía numérica; e, sen y cos, con tolerancia contra math.
G32 = [F(p, q) for p in range(-8, 9) for q in (1, 2, 3)]
fa32 = factorial
rd32 = lambda x, d=4: (1 if x >= 0 else -1)*((2*10**d*abs(F(x)).numerator + abs(F(x)).denominator)//(2*abs(F(x)).denominator))
ex32 = lambda N, x: sum(F(x)**n/fa32(n) for n in range(N+1))                      # hasta xᴺ/N!
se32 = lambda N, x: sum(F((-1)**n)*F(x)**(2*n+1)/fa32(2*n+1) for n in range(N))    # N términos
co32 = lambda N, x: sum(F((-1)**n)*F(x)**(2*n)/fa32(2*n) for n in range(N))        # N términos
T32 = 5e-5
# derivadas en 0: ciclo de 4 (valores citados sen 0 = 0, cos 0 = 1)
ds32 = [0, 1, 0, -1]; dc32 = [1, 0, -1, 0]
ok(all(ds32[(2*n+1) % 4] == (-1)**n and ds32[(2*n) % 4] == 0 and dc32[(2*n) % 4] == (-1)**n and dc32[(2*n+1) % 4] == 0 for n in range(60)), 'H32 patrón: sen⁽²ⁿ⁺¹⁾(0) = (−1)ⁿ, cos⁽²ⁿ⁾(0) = (−1)ⁿ, los demás 0')
ok(all(abs((math.sin(x+1e-6) - math.sin(x-1e-6))/2e-6 - math.cos(x)) < 1e-6 and abs((math.cos(x+1e-6) - math.cos(x-1e-6))/2e-6 + math.sin(x)) < 1e-6 and abs((math.exp(x+1e-6) - math.exp(x-1e-6))/2e-6 - math.exp(x)) < 1e-5 for x in (-3, -1, 0, 0.5, 2)) and math.sin(0) == 0 and math.cos(0) == 1 and math.exp(0) == 1, 'H32 derivadas citadas, numérico, y valores en 0')
# esc3-idea: registro y lectura
ok([F(ds32[k % 4], fa32(k)) for k in range(6)] == [0, 1, 0, F(-1, 6), 0, F(1, 120)] and fa32(0) == 1 == fa32(1) and fa32(3) == 6 and fa32(5) == 120, 'H32 idea R2, R3 coeficientes c₀…c₅')
ok(se32(1, 1) == 1 and se32(2, 1) == 1-F(1, 6) == F(6, 6)-F(1, 6) == F(5, 6) and rd32(F(5, 6)) == 8333 and se32(3, 1) == F(5, 6)+F(1, 120) == F(100, 120)+F(1, 120) == F(101, 120) and rd32(F(101, 120)) == 8417 and round(math.sin(1)*10**4) == 8415, 'H32 idea paso 4: P₁, P₃, P₅ en x = 1')
ok(abs(8415-10000) == 1585 and abs(8415-8333) == 82 and abs(8415-8417) == 2 and 1585 > 82 > 2, 'H32 idea paso 4: distancias')
b32 = [F(3)]
c32 = [(F(27, 6), F('4.5')), (F('40.5')/20, F('2.025')), (F('18.225')/42, F('0.4339')), (F('3.9051')/72, F('0.0542')), (F('0.4878')/110, F('0.0044')), (F('0.0396')/156, F('0.0003')), (F('0.0027')/210, F(0))]
for n32 in range(1, 8):
    ok(F(9, (2*n32)*(2*n32+1)) == F(3)**(2*n32+1)/fa32(2*n32+1)/(F(3)**(2*n32-1)/fa32(2*n32-1)) and b32[-1]*9 == c32[n32-1][0]*(2*n32)*(2*n32+1) and F(rd32(c32[n32-1][0]), 10**4) == c32[n32-1][1] and rd32(F(3)**(2*n32+1)/fa32(2*n32+1)) == rd32(c32[n32-1][0]), 'H32 idea paso 5: b%d en x = 3, con valores redondeados (y coincide con el exacto redondeado)' % n32)
    b32.append(c32[n32-1][1])
ok([2*3, 4*5, 6*7, 8*9, 10*11, 12*13, 14*15] == [6, 20, 42, 72, 110, 156, 210] and rd32(F(3)**17/fa32(17)) == 0, 'H32 idea paso 5: denominadores y b₈ ≈ 0,0000')
ok(3-F('4.5') == F('-1.5') and F('-1.5')+F('2.025') == F('0.525') and F('0.525')-F('0.4339') == F('0.0911') and F('0.0911')+F('0.0542') == F('0.1453') and F('0.1453')-F('0.0044') == F('0.1409') and F('0.1409')+F('0.0003') == F('0.1412') and round(math.sin(3)*10**4) == 1411 and abs(1411-1412) == 1 and abs(float(se32(9, 3)) - math.sin(3)) < 1e-4 and rd32(se32(9, 3)) == 1411, 'H32 idea paso 5: suma paso a paso ≈ 0,1412 y sen 3 ≈ 0,1411 (el valor exacto de P₁₇(3) redondea a 0,1411; la lectura suma redondeados y lo dice)')
ok(all(abs(float(se32(9, x)) - math.sin(x)) < 0.03 for x in [F(k, 4) for k in range(-26, 27)]) and all(abs(float(se32(3, x)) - math.sin(x)) <= abs(float(se32(2, x)) - math.sin(x)) + 1e-12 for x in [F(k, 4) for k in range(-8, 9)]), 'H32 idea: P₁₇ pegada a la curva en todo el cuadro [−6,5; 6,5] (menos de 0,03)')
ok(all(F((-1)**n, fa32(2*n+1)) == [1, F(-1, 6), F(1, 120)][n] for n in range(3)), 'H32 idea paso 6: términos n = 0, 1, 2')
# esc3-vivo: tabla (D, numeradores, n4, P4·10⁴, t3·10⁴, t4·10⁴, P8·10⁴, cos·10⁴, d4, d8, cota, decimales de la cota)
V32 = {-2: (3, [3, 6, 2], -1, -3333, 889, 63, -4159, -4161, 828, 2, 3, 4), 1: (24, [24, 12, 1], 13, 5417, 14, 0, 5403, 5403, 14, 0, 3, 7), 2: (3, [3, 6, 2], -1, -3333, 889, 63, -4159, -4161, 828, 2, 3, 4), 3: (8, [8, 36, 27], -1, -1250, 10125, 1627, -9748, -9900, 8650, 152, 163, 4), 4: (3, [3, 24, 32], 11, 36667, 56889, 16254, -3968, -6536, 43203, 2568, 2890, 4)}
ok([fa32(2), fa32(4), fa32(6), fa32(8), fa32(10)] == [2, 24, 720, 40320, 3628800], 'H32 vivo factoriales')
for x32, e32 in V32.items():
    t32 = 'H32 vivo x = %s: ' % x32; pw32 = [F(x32)**(2*k) for k in range(6)]; tm32 = [pw32[k]/fa32(2*k) for k in range(6)]
    ok(pw32[1] == x32*x32 and all(pw32[k] == pw32[k-1]*pw32[1] for k in range(2, 6)), t32 + 'potencias pares')
    ok(math.lcm(tm32[1].denominator, tm32[2].denominator) == e32[0] and [1*e32[0], tm32[1]*e32[0], tm32[2]*e32[0]] == e32[1] and e32[1][0]-e32[1][1]+e32[1][2] == e32[2] and F(e32[2], e32[0]) == co32(3, x32) == 1-tm32[1]+tm32[2] and rd32(co32(3, x32)) == e32[3], t32 + 'P₄ con denominador común')
    ok(rd32(tm32[3]) == e32[4] and rd32(tm32[4]) == e32[5] and e32[3]-e32[4]+e32[5] == e32[6] and abs(F(e32[6], 10**4) - co32(5, x32)) <= F(3, 2*10**4), t32 + 'términos 4 y 5 redondeados y P₈')
    ok(round(math.cos(x32)*10**4) == e32[7] and abs(e32[7]-e32[3]) == e32[8] and abs(e32[7]-e32[6]) == e32[9] and e32[9] <= e32[8], t32 + 'función (≈) y distancias; la distancia baja')
    ok(rd32(tm32[5], e32[11]) == e32[10] and (rd32(tm32[5]) == 0) == (e32[11] == 7) and abs(math.cos(x32) - float(co32(5, x32))) <= float(tm32[5]) and F(e32[9], 10**4) <= F(e32[10], 10**e32[11]) + F(1, 10**4), t32 + 'cota de Lagrange |x|¹⁰/10! y la distancia no la supera')
ok(V32[-2] == V32[2] and all(co32(N, -x) == co32(N, x) for x in G32 for N in range(1, 7)) and (-2)**2 == 4 == 2**2, 'H32 vivo x = −2: mismas cuentas que x = 2 (paridad)')
ok(co32(3, 0) == 1 == co32(5, 0) and math.cos(0) == 1 and F(0)**10/fa32(10) == 0 and F(1, fa32(0)) == 1, 'H32 vivo x = 0, caso límite: todo vale 1, distancia 0')
ok(F(10**4*1, 40320).denominator != 1 and F(10**4*81, 80).denominator == 1 and F(10**4*(-1), 8).denominator == 1 and F(10**4*13, 24).denominator != 1 and abs(F(36667, 10**4)) > 1 and abs(F(-1250, 10**4)) < 1 and F(1024, 3628800) == F(4, 14175) and F(59049, 3628800) == F(729, 44800) and F(1048576, 3628800) == F(4096, 14175) and F(4096, 720) == F(256, 45) and F(65536, 40320) == F(512, 315) and F(6561, 40320) == F(729, 4480) and F(729, 720) == F(81, 80) and F(64, 720) == F(4, 45) and F(256, 40320) == F(2, 315), 'H32 vivo signos = y ≈, fracciones simplificadas y frase de P₄')
ok(-3333-889 == -4222 and -1250-10125 == -11375 and 36667-56889 == -20222 and 5417-14 == 5403, 'H32 vivo sumas intermedias de P₈')
# recuadro del resto: cotas en rejilla
ok(all(abs(math.sin(float(x)) - float(sum(F((-1)**n)*x**(2*n+1)/fa32(2*n+1) for n in range(0, (N+1)//2)))) <= float(abs(x)**(N+1)/fa32(N+1)) + 1e-12 and abs(math.cos(float(x)) - float(sum(F((-1)**n)*x**(2*n)/fa32(2*n) for n in range(0, N//2+1)))) <= float(abs(x)**(N+1)/fa32(N+1)) + 1e-12 for x in G32 for N in range(0, 14)), 'H32 k2 sen y cos: |R_N(x)| ≤ |x|^(N+1)/(N+1)! en rejilla (x de −8 a 8)')
ok(all(abs(math.exp(float(x)) - float(ex32(N, x))) <= (math.exp(float(x)) if x > 0 else 1)*float(abs(x)**(N+1)/fa32(N+1))*(1+1e-9) + 1e-12 for x in G32 for N in range(0, 16)), 'H32 k2 eˣ: cota con M = eˣ (x > 0) y M = 1 (x < 0) en rejilla')
ok(all(abs(x)**60/fa32(60) < F(1, 10**6) for x in G32) and all(abs(x)**(k+1)/fa32(k+1) == abs(x)**k/fa32(k)*abs(x)/(k+1) for x in G32 for k in range(20)), 'H32 k2 hecho clave: |x|ᵏ/k! se hace chico (rejilla) y cada término es el anterior por |x|/(k + 1)')
ok(all(se32(N, -x) == -se32(N, x) and co32(N, -x) == co32(N, x) and sum(F((-1)**k)*(-x)**k/fa32(k) for k in range(N+1)) == ex32(N, x) and (-1)**N*(-x)**N == x**N for x in G32 for N in range(0, 9)), 'H32 k2 paridad de los polinomios y polinomio de g(t) = e^(−t) con t = −x')
ok(all(se32(m+1, x) == sum(F(ds32[k % 4], fa32(k))*x**k for k in range(2*m+2)) == sum(F(ds32[k % 4], fa32(k))*x**k for k in range(2*m+3)) and co32(m+1, x) == sum(F(dc32[k % 4], fa32(k))*x**k for k in range(2*m+1)) == sum(F(dc32[k % 4], fa32(k))*x**k for k in range(2*m+2)) for x in G32 for m in range(6)), 'H32 k2 suma de n = 0 a m: P₂ₘ₊₁ = P₂ₘ₊₂ (sen) y P₂ₘ = P₂ₘ₊₁ (cos)')
ok(all(0 <= F(1, n+3) <= F(1, n) for n in range(1, 200)), 'H32 k1 lema de comparación, caso de muestra')
# ejemplo 1
ok([F(1, fa32(n)) for n in range(5)] == [1, 1, F(1, 2), F(1, 6), F(1, 24)], 'H32 e1 coeficientes')
ok(all(x**(n+1)/fa32(n+1)/(x**n/fa32(n)) == x/(n+1) and F(fa32(n), fa32(n+1)) == F(1, n+1) for x in G32 if x != 0 for n in range(25)) and float(F(1, 10**6+1)) < 1e-5, 'H32 e1 cociente x/(n + 1) y límite 0')
ok([ex32(N, 1) for N in range(7)] == [1, 2, F(5, 2), F(8, 3), F(65, 24), F(163, 60), F(1957, 720)] and F(5, 2)+F(1, 6) == F(15, 6)+F(1, 6) == F(16, 6) and F(8, 3)+F(1, 24) == F(64, 24)+F(1, 24) and F(65, 24)+F(1, 120) == F(325, 120)+F(1, 120) == F(326, 120) and F(163, 60)+F(1, 720) == F(1956, 720)+F(1, 720) and rd32(F(1957, 720), 5) == 271806, 'H32 e1 sumas parciales de e hasta 1957/720 ≈ 2,71806')
ok(all(fa32(n) >= 2**(n-1) for n in range(1, 60)) and all(sum(F(1, 2**k) for k in range(N)) == (1-F(1, 2)**N)/(1-F(1, 2)) == 2-F(1, 2**(N-1)) < 2 and ex32(N, 1) <= 1 + sum(F(1, 2**k) for k in range(N)) < 3 for N in range(1, 40)) and math.e <= 3, 'H32 e1 tope: n! ≥ 2ⁿ⁻¹, S_N < 3, e ≤ 3')
ok(fa32(7) == 5040 and F(3, 5040) == F(1, 1680) and rd32(F(1, 1680)) == 6 and 0 < math.e - 1957/720 <= 1/1680 and ex32(7, 1) == F(1957, 720)+F(1, 5040) and F('2.7180') < F(1957, 720) and F(1957, 720)+F(1, 1680) < F('2.71806')+F('0.0006') == F('2.71866') and abs(math.e - 2.718) < 0.001 and round(math.e*10**5) == 271828, 'H32 e1 cota de Lagrange 1/1680 y 2,7180 < e < 2,71866')
ok(all(abs(float(ex32(60, x)) - math.exp(float(x))) < 1e-9*max(1, math.exp(float(x))) for x in G32), 'H32 e1 la serie se acerca a eˣ en rejilla')
# ejemplo 2
ok([F(ds32[k % 4], fa32(k)) for k in (1, 3, 5, 7)] == [1, F(-1, 6), F(1, 120), F(-1, 5040)] and all(2*(n+1)+1 == 2*n+3 and fa32(2*n+3) == (2*n+3)*(2*n+2)*fa32(2*n+1) for n in range(40)), 'H32 e2 coeficientes y factorial (2n + 3)!')
ok(all(abs(x)**(2*n+3)/fa32(2*n+3)/(abs(x)**(2*n+1)/fa32(2*n+1)) == x*x/((2*n+2)*(2*n+3)) for x in G32 if x != 0 for n in range(20)) and all((2*n+2)*(2*n+3) >= n and 2*n+2 >= n and 2*n+3 >= 1 for n in range(1, 300)), 'H32 e2 cociente x²/((2n + 2)(2n + 3)) ≤ x²/n')
ok(all(abs(float(se32(60, x)) - math.sin(float(x))) < 1e-9 for x in G32) and all(se32(N, 0) == 0 for N in range(1, 9)), 'H32 e2 la serie se acerca a sen x en rejilla; en 0 suma 0')
bs32 = lambda k, x=F(1, 2): x**(2*k-1)/fa32(2*k-1)
ok([bs32(1), bs32(2), bs32(3)] == [F(1, 2), F(1, 48), F(1, 3840)] and F(1, 2)**3 == F(1, 8) and F(1, 8)/6 == F(1, 48) and F(1, 2)**5 == F(1, 32) and F(1, 32)/120 == F(1, 3840) and all(bs32(k) > 0 and bs32(k+1)/bs32(k) == F(1, 4)/((2*k)*(2*k+1)) == F(1, 4*2*k*(2*k+1)) < 1 and F(1, 2)**(2*k-1) <= 1 and fa32(2*k-1) >= 2*k-1 >= k and bs32(k) <= F(1, k) for k in range(1, 60)), 'H32 e2 sen(1/2): tamaños y condiciones de Leibniz')
ok(se32(2, F(1, 2)) == F(24, 48)-F(1, 48) == F(23, 48) and rd32(F(23, 48), 5) == 47917 and rd32(F(1, 3840), 5) == 26 and se32(3, F(1, 2)) == F(1840, 3840)+F(1, 3840) == F(1841, 3840) and F(23, 48) == F(1840, 3840) and rd32(F(1841, 3840), 5) == 47943 and 23/48 <= math.sin(0.5) <= 1841/3840 and abs(math.sin(0.5) - 23/48) <= 1/3840 and round(math.sin(0.5)*10**5) == 47943, 'H32 e2 sen(1/2): 23/48, cota 1/3840, S₂ ≤ sen ≤ S₃')
# ejemplo 3
ok([F(dc32[k % 4], fa32(k)) for k in (0, 2, 4, 6)] == [1, F(-1, 2), F(1, 24), F(-1, 720)] and all(fa32(2*n+2) == (2*n+2)*(2*n+1)*fa32(2*n) for n in range(40)) and all(abs(x)**(2*n+2)/fa32(2*n+2)/(abs(x)**(2*n)/fa32(2*n)) == x*x/((2*n+1)*(2*n+2)) for x in G32 if x != 0 for n in range(20)) and all((2*n+1)*(2*n+2) >= n for n in range(1, 300)), 'H32 e3 coeficientes y cociente x²/((2n + 1)(2n + 2)) ≤ x²/n')
ok(all(abs(float(co32(60, x)) - math.cos(float(x))) < 1e-9 for x in G32) and all(co32(N, 0) == 1 for N in range(1, 9)), 'H32 e3 la serie se acerca a cos x en rejilla; en 0 suma 1')
bc32 = lambda k, x=F(1): x**(2*k-2)/fa32(2*k-2)
ok([bc32(k) for k in (1, 2, 3, 4)] == [1, F(1, 2), F(1, 24), F(1, 720)] and all(bc32(k+1)/bc32(k) == F(fa32(2*k-2), fa32(2*k)) == F(1, (2*k-1)*(2*k)) <= F(1, 2) and bc32(k) <= F(1, k) for k in range(1, 60)) and all(fa32(2*k-2) >= 2*k-2 >= k for k in range(2, 60)), 'H32 e3 cos 1: tamaños y condiciones de Leibniz')
ok(co32(3, 1) == F(24, 24)-F(12, 24)+F(1, 24) == F(13, 24) and rd32(F(13, 24), 5) == 54167 and rd32(F(1, 720), 5) == 139 and co32(4, 1) == F(390, 720)-F(1, 720) == F(389, 720) and F(13, 24) == F(390, 720) and rd32(F(389, 720), 5) == 54028 and 389/720 <= math.cos(1) <= 13/24 and abs(math.cos(1) - 13/24) <= 1/720 and round(math.cos(1)*10**5) == 54030, 'H32 e3 cos 1: 13/24, cota 1/720, S₄ ≤ cos 1 ≤ S₃')
# ejemplo 4
ok(all(F((-1)**n*(2*n+1), fa32(2*n+1)) == F((-1)**n, fa32(2*n)) and fa32(2*n+1) == (2*n+1)*fa32(2*n) for n in range(40)), 'H32 e4 (a) derivada término a término de sen: coeficientes de cos')
ok(all(F(n, fa32(n)) == F(1, fa32(n-1)) and fa32(n) == n*fa32(n-1) for n in range(1, 40)) and all(sum(n*x**(n-1)/fa32(n) for n in range(1, N+1)) == sum(x**m/fa32(m) for m in range(0, N)) for x in G32 for N in range(1, 9)), 'H32 e4 (b) derivada término a término de eˣ: la misma serie, con m = n − 1')
ok(all((-x)**(2*n+1) == -x**(2*n+1) and (-x)**(2*n) == x**(2*n) for x in G32 for n in range(8)) and abs(math.e - 2.718) < 5e-4 and abs(1/math.e - 0.368) < 5e-4 and 2.718 != 0.368 and 2.718 != -0.368, 'H32 e4 (c) paridad; e y 1/e')
# ejercicio A
ok(F(1, fa32(5)) == F(1, 120) and 7 == 2*3+1 and F((-1)**3, fa32(7)) == F(-1, 5040) and 6 == 2*3 and F((-1)**3, fa32(6)) == F(-1, 720) and dc32[3 % 4] == 0, 'H32 A (a) coeficientes')
bA32 = lambda k: bc32(k, F(1, 2))
ok(F(1, 4)*F(1, 4) == F(1, 16) and F(1, 16)*F(1, 4) == F(1, 64) and [bA32(k) for k in (1, 2, 3, 4)] == [1, F(1, 8), F(1, 384), F(1, 46080)] and F(1, 4)/2 == F(1, 8) and F(1, 16)/24 == F(1, 384) and F(1, 64)/720 == F(1, 46080) and all(bA32(k) > 0 and bA32(k+1)/bA32(k) == F(1, 4)/((2*k-1)*(2*k)) == F(1, 4*(2*k-1)*(2*k)) < 1 and bA32(k) <= F(1, fa32(2*k-2)) <= F(1, k) for k in range(1, 60)), 'H32 A (b) cos(1/2): tamaños y Leibniz')
ok(co32(3, F(1, 2)) == F(384, 384)-F(48, 384)+F(1, 384) == F(337, 384) and F(1, 8) == F(48, 384) and rd32(F(337, 384), 5) == 87760 and rd32(F(1, 46080), 5) == 2 and abs(math.cos(0.5) - 337/384) <= 1/46080 and round(math.cos(0.5)*10**5) == 87758, 'H32 A (b) 337/384 ≈ 0,87760, cota 1/46080')
ok(F(1, 4)/2 == F(1, 8) and F(1, 8)/6 == F(1, 48) and ex32(3, F(1, 2)) == F(48+24+6+1, 48) == F(79, 48) and rd32(F(79, 48)) == 16458 and math.exp(0.5) < 2 and 3 < 4 and F(2, 24)*F(1, 2)**4 == F(2, 24)*F(1, 16) == F(2, 384) == F(1, 192) and rd32(F(1, 192)) == 52 and round(math.exp(0.5)*10**4) == 16487 and abs(16487-16458) == 29 and 29 <= 52 and abs(math.exp(0.5) - 79/48) <= 1/192, 'H32 A (c) e^(1/2): 79/48 ≈ 1,6458, cota 1/192')
# ejercicio B
ok(all(F((-1)**n*2*n, fa32(2*n)) == F((-1)**n, fa32(2*n-1)) and fa32(2*n) == 2*n*fa32(2*n-1) for n in range(1, 40)) and all((-1)**(m+1) == -(-1)**m and 2*(m+1)-1 == 2*m+1 for m in range(40)) and all(sum(F((-1)**n)*x**(2*n-1)/fa32(2*n-1) for n in range(1, N+1)) == -se32(N, x) for x in G32 for N in range(1, 8)), 'H32 B (a) derivada término a término de cos: la serie de −sen')
ok(all(sum((-x)**n/fa32(n) for n in range(N+1)) == sum(F((-1)**n)*x**n/fa32(n) for n in range(N+1)) for x in G32 for N in range(9)) and all(abs(float(sum((-x)**n/fa32(n) for n in range(70))) - math.exp(-float(x))) < 1e-9 for x in G32), 'H32 B (b) serie de e^(−x)')
ok(all(1+(-1)**n == (2 if n % 2 == 0 else 0) for n in range(60)) and all(F(1, 2)*sum(F(1+(-1)**n, fa32(n))*x**n for n in range(2*K+2)) == sum(x**(2*k)/fa32(2*k) for k in range(K+1)) for x in G32 for K in range(7)) and all(abs(float(sum(x**(2*k)/fa32(2*k) for k in range(40))) - math.cosh(float(x))) < 1e-9*math.cosh(float(x)) for x in G32), 'H32 B (c) serie de (eˣ + e^(−x))/2')
ok(1+F(1, 2)+F(1, 24)+F(1, 720) == F(720+360+30+1, 720) == F(1111, 720) and rd32(F(1111, 720)) == 15431 and round(math.e*10**4) == 27183 and round(10**4/math.e) == 3679 and F('2.7183')+F('0.3679') == F('3.0862') and F('3.0862')/2 == F('1.5431'), 'H32 B (c) comprobación 1111/720 ≈ 1,5431')
# ejercicio C
bC32 = lambda k: bs32(k, F(1, 5))
ok(F('0.2') == F(1, 5) and F(1, 5)**3 == F(1, 125) and F(1, 125)/6 == F(1, 750) and F(1, 5)**5 == F(1, 3125) and F(1, 3125)/120 == F(1, 375000) and [bC32(1), bC32(2), bC32(3)] == [F(1, 5), F(1, 750), F(1, 375000)] and all(bC32(k) > 0 and bC32(k+1)/bC32(k) == F(1, 25)/((2*k)*(2*k+1)) == F(1, 25*2*k*(2*k+1)) < 1 and bC32(k) <= F(1, k) for k in range(1, 60)), 'H32 C (a) tamaños y Leibniz con θ = 1/5')
ok(rd32(F(1, 750), 5) == 133 and F(1, 750) < F('0.0014') and abs(math.sin(0.2) - 0.2) <= 1/750 and se32(2, F(1, 5)) == F(150, 750)-F(1, 750) == F(149, 750) and rd32(F(149, 750), 6) == 198667 and rd32(F(1, 375000), 7) == 27 and abs(math.sin(0.2) - 149/750) <= 1/375000 and round(math.sin(0.2)*10**6) == 198669 and F('0.2')**5/120 == F(1, 375000), 'H32 C (a)(b) cotas 1/750 y 1/375000; 149/750 ≈ 0,198667')
ok(all(t*t/((2*k)*(2*k+1)) <= F(1, 6) and bs32(k, t) <= F(1, k) and abs(math.sin(float(t)) - float(t)) <= float(t**3/6) + 1e-15 for t in [F(j, 20) for j in range(1, 21)] for k in range(1, 30)), 'H32 C (c) para 0 < θ ≤ 1: |sen θ − θ| ≤ θ³/6')
ok(F('0.01')*6 == F('0.06') and F('0.39')**2 == F('0.1521') and F('0.1521')*F('0.39') == F('0.059319') < F('0.06') and F('0.40')**2 == F('0.16') and F('0.16')*F('0.40') == F('0.064') > F('0.06'), 'H32 C (c) θ³ ≤ 0,06: sirve 0,39 y no 0,40')
ok(F('0.2')*180 == 36 and rd32(36/F('3.1416'), 2) == 1146 and abs(math.degrees(0.2) - 11.46) < 0.01 and F('0.2')/100 == F('0.002') and F('0.0014') < F('0.002'), 'H32 C (d) 11,46° y el 1 % de 0,2')
# H33
# H33 · Demostraciones (sucesiones y series geométricas): registro y lectura de dem33-idea (6 pasos) y de dem33-vivo (6 razones), teoremas 1, 2 y 3 y lemas 1, 2 y 3 en rejilla de fracciones, ejemplos 1-4 y ejercicios A, B, C. Las demostraciones (inducción, ε–N, contradicción) no son comprobables por código: aquí se comprueban sus identidades y desigualdades en rejilla, y todas las cuentas con números.
G33 = [F(p, q) for p in range(-9, 10) for q in (1, 2, 3, 4, 5, 7) if p != 0]      # razones (≠ 0)
A33 = [F(-7, 2), F(-2), F(-1, 3), F(1, 5), F(1), F(2), F(8), F(15, 4)]              # primeros términos (≠ 0)
def pg33(a, r, n):      # los n primeros términos, por la recurrencia a_{k+1} = a_k · r
    t = [F(a)]
    while len(t) < n: t.append(t[-1]*r)
    return t
def sp33(a, r, n): return sum(pg33(a, r, n))      # suma parcial, sumando uno por uno
def rd33(x, d=4): return (abs(F(x))*10**d*2 + 1)//2 * (1 if x >= 0 else -1)      # redondeo a d decimales (mitad hacia arriba en el tamaño), como entero
# teoremas 1 y 2, en rejilla
ok(all(pg33(a, r, 12)[n-1] == a*r**(n-1) for a in A33 for r in G33 for n in range(1, 13)), 'H33 teorema 1: aₙ = a₁·rⁿ⁻¹ contra la recurrencia')
ok(all(a*r**(n-1)*r == a*r**n and n == (n+1)-1 for a in A33 for r in G33 for n in range(1, 13)) and all(a*r**0 == a for a in A33 for r in G33), 'H33 teorema 1: caso base y paso inductivo')
ok(all(sp33(a, r, n) == a*(1-r**n)/(1-r) for a in A33 for r in G33 if r != 1 for n in range(1, 13)), 'H33 teorema 2: Sₙ = a₁(1 − rⁿ)/(1 − r), r ≠ 1')
ok(all(r*sp33(a, r, n) == sum(a*r**k for k in range(1, n+1)) and sp33(a, r, n) - r*sp33(a, r, n) == a - a*r**n and (1-r)*sp33(a, r, n) == a*(1-r**n) for a in A33 for r in G33 + [F(0)] for n in range(1, 13)), 'H33 teorema 2, 1.ª demostración: r·Sₙ, la resta y (1 − r)·Sₙ = a₁(1 − rⁿ) (también con r = 1)')
ok(all(a*(1-r)/(1-r) == a and a*(1-r**n)/(1-r) + a*r**n == (a*(1-r**n) + a*r**n*(1-r))/(1-r) and a*(1-r**n) + a*r**n*(1-r) == a - a*r**n + a*r**n - a*r**n*r == a*(1-r**(n+1)) for a in A33 for r in G33 if r != 1 for n in range(1, 13)), 'H33 teorema 2, 2.ª demostración: caso base y paso inductivo')
ok(all(pg33(a, 1, n) == [a]*n and sp33(a, 1, n) == n*a and n*a + a == (n+1)*a for a in A33 for n in range(1, 30)) and F(1)**0 == 1, 'H33 teorema 2, caso r = 1: Sₙ = n·a₁')
ok(all(pg33(a, 0, n) == [a] + [0]*(n-1) and sp33(a, 0, n) == a == a*(1-0)/(1-0) == a/(1-0) for a in A33 for n in range(1, 12)), 'H33 k1 caso r = 0: sumas parciales a₁ y fórmulas')
# lemas 1, 2 y 3
H33 = [F(p, q) for p in range(1, 12) for q in (1, 2, 3, 5, 9, 20)]
ok(all((1+h)**n >= 1+n*h and (1+h)**1 == 1+1*h and (1+n*h)*(1+h) == 1+h+n*h+n*h*h == 1+(n+1)*h+n*h*h >= 1+(n+1)*h for h in H33 for n in range(1, 40)), 'H33 lema 1 (Bernoulli) y su paso inductivo')
R33 = [r for r in G33 if abs(r) < 1]
def N33(r, e): x = 1/((1/abs(r)-1)*e); return -(-x.numerator//x.denominator)      # menor natural N ≥ 1/(h·ε)
ok(all(1/abs(r) > 1 and (1/abs(r)-1) > 0 and abs(r) == 1/(1+(1/abs(r)-1)) and abs(r**n) == abs(r)**n == 1/(1+(1/abs(r)-1))**n < 1/(n*(1/abs(r)-1)) for r in R33 for n in range(1, 60)), 'H33 lema 2: h > 0, |r| = 1/(1 + h) y |rⁿ| < 1/(n·h)')
ok(all(N33(r, e) >= 1/((1/abs(r)-1)*e) and all(n*(1/abs(r)-1)*e > 1 and 1/(n*(1/abs(r)-1)) < e and abs(r**n - 0) < e for n in range(N33(r, e)+1, N33(r, e)+40)) for r in R33 for e in (F(1, 2), F(1, 10), F(1, 100), F(3, 1000))), 'H33 lema 2: con N ≥ 1/(h·ε), n > N ⟹ |rⁿ − 0| < ε')
ok(1/F(1, 2) - 1 == 2 - 1 == 1 and all(F(1, 2)**n < F(1, n) for n in range(1, 80)) and all(F(0)**n == 0 for n in range(1, 9)), 'H33 lema 2: caso r = 1/2 (h = 1) y caso r = 0')
ok(all(abs(r)**0 == 1 and abs(r)**m >= 1 and abs(r)**m*abs(r) >= abs(r) >= 1 for r in G33 if abs(r) >= 1 for m in range(0, 30)), 'H33 lema 3: |r|ᵐ ≥ 1 si |r| ≥ 1')
# teorema 3
ok(all(a*(1-r**n)/(1-r) - a/(1-r) == (a*(1-r**n) - a)/(1-r) == -a*r**n/(1-r) and abs(sp33(a, r, n) - a/(1-r)) == abs(a)/abs(1-r)*abs(r**n) and abs(a)/abs(1-r) > 0 and a/(1-r) - sp33(a, r, n) == a*r**n/(1-r) for a in A33 for r in R33 for n in range(1, 13)), 'H33 teorema 3, 1.ª parte: Sₙ − S = −a₁rⁿ/(1 − r), |Sₙ − S| = c·|rⁿ|')
ok(all(all(abs(a*(1-r**n)/(1-r) - a/(1-r)) < e for n in range(N33(r, e/(abs(a)/abs(1-r)))+1, N33(r, e/(abs(a)/abs(1-r)))+25)) for a in A33 for r in R33 for e in (F(1, 10), F(1, 250))), 'H33 teorema 3, 1.ª parte: con el N del lema 2 para ε/c, |Sₙ − S| < ε')
ok(all(abs(float(sp33(a, r, 400)) - float(a/(1-r))) < 1e-9*max(1, abs(float(a/(1-r)))) for a in A33 for r in R33 if abs(r) <= F(4, 5)), 'H33 teorema 3: las sumas parciales se acercan a a₁/(1 − r), numérico')
ok(all(abs(a*r**(n-1)) == abs(a)*abs(r)**(n-1) >= abs(a) > 0 and sp33(a, r, n) - sp33(a, r, n-1) == a*r**(n-1) and abs(a)/2 + abs(a)/2 == abs(a) for a in A33 for r in G33 if abs(r) >= 1 for n in range(2, 13)), 'H33 teorema 3, 2.ª parte: |aₙ| ≥ |a₁| y aₙ = Sₙ − Sₙ₋₁')
# dem33-idea: figura, registro R1…R6 y lectura
t33 = pg33(8, F(1, 2), 4)
ok(t33 == [8, 4, 2, 1] and [8*F(1, 2), 4*F(1, 2), 2*F(1, 2)] == [4, 2, 1] and sum(t33) == sp33(8, F(1, 2), 4) == 15 == sum(8*F(1, 2)**(k-1) for k in range(1, 5)), 'H33 idea paso 1 (R1): S₄ = 8 + 4 + 2 + 1')
ok([F(1, 2)*x for x in t33] == [4, 2, 1, F(1, 2)] and F(1, 2)*15 == 4+2+1+F(1, 2), 'H33 idea paso 2 (R2): ½·S₄ = 4 + 2 + 1 + ½')
ok(4-4 == 0 == 2-2 == 1-1 and sum(t33) - sum(F(1, 2)*x for x in t33) == 8 - F(1, 2) == F(16, 2) - F(1, 2) == F(15, 2), 'H33 idea paso 3 (R3): S₄ − ½·S₄ = 8 − ½ = 15/2')
ok(15 - F(1, 2)*15 == (1-F(1, 2))*15 and F(1, 2)**4 == F(1, 2)*F(1, 2)*F(1, 2)*F(1, 2) == F(1, 16) and 8*F(1, 16) == F(8, 16) == F(1, 2) and 8 - F(1, 2) == 8 - 8*F(1, 2)**4 == 8*(1-F(1, 2)**4) == 8*(1-F(1, 16)) and (1-F(1, 2))*15 == 8*(1-F(1, 2)**4), 'H33 idea paso 4 (R4, T4): (1 − ½)·S₄ = 8·(1 − (½)⁴)')
ok(1-F(1, 2) == F(2, 2)-F(1, 2) == F(1, 2) != 0 and 1-F(1, 16) == F(16, 16)-F(1, 16) == F(15, 16) and 8*F(15, 16) == F(120, 16) == F(15, 2) and F(15, 2)/F(1, 2) == F(15, 2)*2 == F(30, 2) == 15 and 8+4 == 12 and 12+2 == 14 and 14+1 == 15, 'H33 idea paso 5 (R5): S₄ = 15/2 : 1/2 = 15 y comprobación')
ok(8*(1-F(1, 2)**4)/(1-F(1, 2)) == 15, 'H33 idea paso 6 (R6): la fórmula general da 15')
b1_33 = [(0, 8), (8, 4), (12, 2), (14, 1)]; b2_33 = [(8, 4), (12, 2), (14, 1), (15, F(1, 2))]
ok(all(b1_33[i][0] == sum(t33[:i]) and b1_33[i][1] == t33[i] and b2_33[i][0] == 8 + sum(F(1, 2)*x for x in t33[:i]) and b2_33[i][1] == F(1, 2)*t33[i] for i in range(4)) and [b for b in b1_33[1:]] == [b for b in b2_33[:3]] and F(15, 2) == 15*F(1, 2) and 8/F(1, 2) == 16 and F(15, 2)/F(1, 2) == 15 and F(15, 2) + F(1, 2) == 8, 'H33 idea figura: posiciones de los bloques, los tres que coinciden, barra de 7,5 = mitad de 15 = 15 de 16 partes')
# dem33-vivo: las seis razones (a₁ = 2)
V33 = [F(-1), F(-1, 2), F(1, 2), F(2, 3), F(1), F(3, 2)]
S33 = {r: [sp33(2, r, n) for n in range(1, 7)] for r in V33}
ok(S33[F(-1)] == [2, 0, 2, 0, 2, 0] and S33[F(-1, 2)] == [2, 1, F(3, 2), F(5, 4), F(11, 8), F(21, 16)] and S33[F(1, 2)] == [2, 3, F(7, 2), F(15, 4), F(31, 8), F(63, 16)] and S33[F(2, 3)] == [2, F(10, 3), F(38, 9), F(130, 27), F(422, 81), F(1330, 243)] and S33[F(1)] == [2, 4, 6, 8, 10, 12] and S33[F(3, 2)] == [2, 5, F(19, 2), F(65, 4), F(211, 8), F(665, 16)], 'H33 vivo: S₁…S₆ de las seis razones')
ok(all(S33[r][n-1] == 2*(1-r**n)/(1-r) for r in V33 if r != 1 for n in range(1, 7)) and all(max(S33[r]) <= ym and min(S33[r]) >= 0 for r, ym in zip(V33, (3, F(5, 2), F(23, 5), 7, 13, 46))), 'H33 vivo: fórmula del teorema 2 y puntos dentro del eje')
ok([1-r for r in V33] == [2, F(3, 2), F(1, 2), F(1, 3), 0, F(-1, 2)] and 1-F(-1, 2) == 1+F(1, 2) == F(2, 2)+F(1, 2) and 1-F(1, 2) == F(2, 2)-F(1, 2) and 1-F(2, 3) == F(3, 3)-F(2, 3) and 1-F(3, 2) == F(2, 2)-F(3, 2), 'H33 vivo paso 2: denominadores 1 − r')
ok([[r*r, r*r*r, (r*r*r)*(r*r*r)] for r in V33] == [[1, -1, 1], [F(1, 4), F(-1, 8), F(1, 64)], [F(1, 4), F(1, 8), F(1, 64)], [F(4, 9), F(8, 27), F(64, 729)], [1, 1, 1], [F(9, 4), F(27, 8), F(729, 64)]] and all((r**3)**2 == r**6 for r in V33), 'H33 vivo paso 3: r², r³, r⁶')
ok([1-r**3 for r in V33] == [2, F(9, 8), F(7, 8), F(19, 27), 0, F(-19, 8)] and [2*(1-r**3) for r in V33] == [4, F(18, 8), F(14, 8), F(38, 27), 0, F(-38, 8)] and [F(18, 8), F(14, 8), F(-38, 8)] == [F(9, 4), F(7, 4), F(-19, 4)] and F(9, 4)*F(2, 3) == F(18, 12) == F(3, 2) and F(7, 4)*2 == F(14, 4) == F(7, 2) and F(38, 27)*3 == F(114, 27) == F(38, 9) and F(-19, 4)*(-2) == F(38, 4) == F(19, 2) and 4/F(2) == 2 and [1/(1-r) for r in V33 if r != 1] == [F(1, 2), F(2, 3), 2, 3, -2], 'H33 vivo paso 4: S₃ por la fórmula, con sus productos')
ok([[2*r, 2*r*r, 2+2*r, 2+2*r+2*r*r] for r in V33] == [[-2, 2, 0, 2], [-1, F(1, 2), 1, F(3, 2)], [1, F(1, 2), 3, F(7, 2)], [F(4, 3), F(8, 9), F(10, 3), F(38, 9)], [2, 2, 4, 6], [3, F(9, 2), 5, F(19, 2)]] and 2*F(-1, 2) == F(-2, 2) and 2*F(1, 2) == F(2, 2) and 2*F(3, 2) == F(6, 2) and 1+F(1, 2) == F(2, 2)+F(1, 2) and 3+F(1, 2) == F(6, 2)+F(1, 2) and 2+F(4, 3) == F(6, 3)+F(4, 3) and F(10, 3)+F(8, 9) == F(30, 9)+F(8, 9) and 5+F(9, 2) == F(10, 2)+F(9, 2), 'H33 vivo paso 4: comprobación de S₃ sumando uno por uno')
ok([1-r**6 for r in V33] == [0, F(63, 64), F(63, 64), F(665, 729), 0, F(-665, 64)] and 1-F(729, 64) == F(64, 64)-F(729, 64) and [2*(1-r**6) for r in V33] == [0, F(126, 64), F(126, 64), F(1330, 729), 0, F(-1330, 64)] and F(126, 64) == F(63, 32) and F(-1330, 64) == F(-665, 32) and F(63, 32)*F(2, 3) == F(126, 96) == F(21, 16) and F(63, 32)*2 == F(126, 32) == F(63, 16) and F(1330, 729)*3 == F(3990, 729) == F(1330, 243) and F(-665, 32)*(-2) == F(1330, 32) == F(665, 16) and F(21, 16) == F('1.3125') and F(63, 16) == F('3.9375') and rd33(F(1330, 243)) == 54733 and F(665, 16) == F('41.5625'), 'H33 vivo paso 5: S₆ por la fórmula y sus decimales')
L33 = {r: 2/(1-r) for r in V33 if abs(r) < 1}
ok(L33 == {F(-1, 2): F(4, 3), F(1, 2): 4, F(2, 3): 6} and 2*F(2, 3) == F(4, 3) and 2*2 == 4 and 2*3 == 6, 'H33 vivo paso 6: sumas 4/3, 4 y 6')
ok([[L33[r]-S33[r][2], L33[r]-S33[r][5]] for r in L33] == [[F(-1, 6), F(1, 48)], [F(1, 2), F(1, 16)], [F(16, 9), F(128, 243)]] and F(4, 3)-F(3, 2) == F(8, 6)-F(9, 6) and F(4, 3)-F(21, 16) == F(64, 48)-F(63, 48) and 4-F(7, 2) == F(8, 2)-F(7, 2) and 4-F(63, 16) == F(64, 16)-F(63, 16) and 6-F(38, 9) == F(54, 9)-F(38, 9) and 6-F(1330, 243) == F(1458, 243)-F(1330, 243), 'H33 vivo paso 7: lo que falta, S − S₃ y S − S₆')
ok(all(2*r**3/(1-r) == L33[r]-S33[r][2] and (L33[r]-S33[r][2])*r**3 == L33[r]-S33[r][5] and all(L33[r]-S33[r][n-1] == 2*r**n/(1-r) for n in range(1, 7)) for r in L33) and [2*r**3 for r in L33] == [F(-2, 8), F(2, 8), F(16, 27)] and F(-1, 4)*F(2, 3) == F(-2, 12) == F(-1, 6) and F(1, 4)*2 == F(2, 4) == F(1, 2) and F(16, 27)*3 == F(48, 27) == F(16, 9), 'H33 vivo pasos 7 y 8: S − Sₙ = a₁rⁿ/(1 − r), y de n = 3 a n = 6 se multiplica por r³')
ok([rd33(x) for x in (F(1, 6), F(1, 48), F(1, 2), F(1, 16), F(16, 9), F(128, 243))] == [1667, 208, 5000, 625, 17778, 5267] and F(1, 2) == F('0.5') and F(1, 16) == F('0.0625'), 'H33 vivo: decimales de las frases «falta / sobra»')
ok(1-F(1) == 0 and all(2*F(1)**(n-1) == 2 and S33[F(1)][n-1] == n*2 for n in range(1, 7)) and 2+2 == 4 and 4+2 == 6 and all(2*n > M for M in (1, 7, 100, 1001) for n in range(M//2+1, M//2+20)), 'H33 vivo r = 1: Sₙ = 2n, sin tope')
ok(1-(-1) == 2 and (-1)*(-1) == 1 and 1*(-1) == -1 and 2*2 == 4 and 4/2 == 2 and 2*(-1) == -2 and (-2)*(-1) == 2 and 2+(-2) == 0 and 2*0 == 0 and all(abs(s-1) == 1 for s in S33[F(-1)]) and F(2, 2) == 1 and abs(2-0) == 2 and all(abs(2*F(-1)**(n-1)) == 2 for n in range(1, 9)), 'H33 vivo r = −1: sumas 2, 0, 2, 0…; |Sₙ − 1| = 1')
ok(all(abs(2*F(3, 2)**(n-1)) >= 2*1 for n in range(1, 30)) and 2/(1-F(3, 2)) == 2*(-2) == -4 and all(s > 0 for s in S33[F(3, 2)]) and all(S33[F(3, 2)][i] < S33[F(3, 2)][i+1] for i in range(5)), 'H33 vivo r = 3/2: |aₙ| ≥ 2, y a₁/(1 − r) = −4 no es la suma')
# ejemplo 1
X33 = [F(p, q) for p in range(-8, 9) for q in (1, 2, 3, 5)]
ok(all((1-x)*sum(x**k for k in range(n)) == 1-x**n for x in X33 for n in range(1, 12)) and all(sum(x**(k-1) for k in range(1, n+1)) == (1-x**n)/(1-x) for x in X33 if x not in (0, 1) for n in range(1, 12)), 'H33 e1 1 − xⁿ = (1 − x)(1 + x + ⋯ + xⁿ⁻¹), todo x de la rejilla (también 0 y 1)')
ok(all((1-x)*(1+x) == 1-x*x and (1-x)*(1+x+x*x) == 1+x+x*x-x-x*x-x**3 == 1-x**3 for x in X33) and 1+3 == 4 and 4+9 == 13 and 13+27 == 40 and (1-3)*40 == (-2)*40 == -80 and 3**4 == 81 and 1-81 == -80, 'H33 e1 n = 2, n = 3 y el caso x = 3, n = 4')
# ejemplo 2
ok(all(sum(a*r**(k-1) for k in range(m, n+1)) == sp33(a, r, n) - sp33(a, r, m-1) == (a*(1-r**n) - a*(1-r**(m-1)))/(1-r) == (a*r**(m-1) - a*r**n)/(1-r) == a*r**(m-1)*(1-r**(n-m+1))/(1-r) and r**n == r**(m-1)*r**(n-m+1) and n == (m-1)+(n-m+1) for a in A33 for r in G33 if r != 1 for m in range(2, 8) for n in range(m, 11)), 'H33 e2 suma de k = m a n: Sₙ − Sₘ₋₁ = aₘ(1 − rⁿ⁻ᵐ⁺¹)/(1 − r)')
ok(3*2**3 == 3*8 == 24 and 7-4+1 == 4 and 2**4 == 16 and 1-16 == -15 and 1-2 == -1 and F(24*(-15), -1) == F(-360, -1) == 360 and [3*2**(k-1) for k in range(4, 8)] == [24, 48, 96, 192] and 24+48 == 72 and 72+96 == 168 and 168+192 == 360 and 2**7 == 128 and F(3*(1-128), 1-2) == F(3*(-127), -1) == F(-381, -1) == 381 == sp33(3, 2, 7) and 2**3 == 8 and F(3*(1-8), 1-2) == F(3*(-7), -1) == F(-21, -1) == 21 == sp33(3, 2, 3) and 381-21 == 360, 'H33 e2 con números: 360')
# ejemplo 3
ok(1/F(9, 10) == F(10, 9) and F(10, 9)-F(9, 9) == F(1, 9) and 1+F(1, 9) == F(10, 9) and 1/F(10, 9) == F(9, 10) and all(F(10, 9)**n >= 1+F(n, 9) > F(n, 9) and F(9, 10)**n < F(9, n) and 1/(n*F(1, 9)) == F(9, n) for n in range(1, 1200)) and F('0.01') == F(1, 100) and F(1, 9)*F(1, 100) == F(1, 900) and 1/F(1, 900) == 900 == N33(F(9, 10), F(1, 100)) and F(9, 900) == F(1, 100) and all(F(9, n) < F(1, 100) and F(9, 10)**n < F(1, 100) for n in range(901, 1000)), 'H33 e3 h = 1/9, (9/10)ⁿ < 9/n, N = 900')
ok(rd33(F(9, 10)**43) == 108 and F(9, 10)**43 > F(1, 100) and rd33(F(9, 10)**44) == 97 and F(9, 10)**44 < F(1, 100) and all(F(9, 10)**n < F(1, 100) for n in range(44, 901)) and 0 < F(9, 10) < 1 and F(10, 9)**2 == F(100, 81) and 1+F(2, 9) == F(11, 9) == F(99, 81) and F(100, 81) >= F(99, 81) and F(100, 81)-F(99, 81) == F(1, 81) == 1*F(1, 9)**2, 'H33 e3 también sirve N = 43; lema 1 con n = 2')
# ejemplo 4
p33 = pg33(5, -1, 8)
ok(p33 == [5, -5, 5, -5, 5, -5, 5, -5] == [5*F(-1)**(n-1) for n in range(1, 9)] and all(abs(x) == 5 == 5*abs(F(-1))**n == 5*1**n for n, x in enumerate(p33)) and [sp33(5, -1, n) for n in range(1, 5)] == [5, 0, 5, 0] and 5+(-5) == 0 and 0+5 == 5 and 1-(-1) == 2 and all(sp33(5, -1, n) == F(5*(1-(-1)**n), 2) == (5 if n % 2 else 0) for n in range(1, 30)) and F(5*2, 2) == 5 and F(5*0, 2) == 0, 'H33 e4 términos y sumas parciales de 5 − 5 + 5 − ⋯')
ok(F(5, 2)+F(5, 2) == 5 and all(abs(sp33(5, -1, n) - sp33(5, -1, n-1)) == 5 for n in range(2, 30)) and not any(all(abs(sp33(5, -1, n) - S) < F(5, 2) for n in (7, 8)) for S in [F(k, 8) for k in range(-80, 121)]) and (5-5)+(5-5) == 0 and 5+(-5+5)+(-5+5) == 5 and F(5, 1-(-1)) == F(5, 2), 'H33 e4 ningún S queda a menos de 5/2 de dos sumas seguidas; los tres «resultados» 0, 5 y 5/2')
# errores frecuentes
ok(F(1, 1-2) == -1 and all(sp33(1, 2, n) >= 1 for n in range(1, 20)) and all(F(1)**n == 1 for n in range(9)) and [F(-1)**n for n in range(1, 5)] == [-1, 1, -1, 1], 'H33 errores frecuentes: 1 + 2 + 4 + ⋯ «= −1» es absurdo; rⁿ con r = 1 y r = −1')
# ejercicio A
ok(2**0 == 1 and 2**1-1 == 1 and all(sum(2**(k-1) for k in range(1, n+1)) == 2**n-1 and 2**((n+1)-1) == 2**n and 2**n-1+2**n == 2*2**n-1 == 2**(n+1)-1 and F(1*(1-2**n), 1-2) == F(1-2**n, -1) == 2**n-1 for n in range(1, 40)) and 1+2+4+8 == 15 == 2**4-1 == 16-1, 'H33 A (a) 1 + 2 + ⋯ + 2ⁿ⁻¹ = 2ⁿ − 1')
ok(all(sp33(5, 3, n) == sum(5*3**(k-1) for k in range(1, n+1)) and 3*sp33(5, 3, n) == sum(5*3**k for k in range(1, n+1)) and sp33(5, 3, n)-3*sp33(5, 3, n) == 5-5*3**n and (1-3)*sp33(5, 3, n) == -2*sp33(5, 3, n) == 5*(1-3**n) and sp33(5, 3, n) == F(5*(1-3**n), -2) == F(5*(3**n-1), 2) for n in range(1, 20)) and 3**4 == 81 and 81-1 == 80 and 5*80 == 400 and 400//2 == 200 and pg33(5, 3, 4) == [5, 15, 45, 135] and 5+15 == 20 and 20+45 == 65 and 65+135 == 200, 'H33 A (b) Sₙ = 5(3ⁿ − 1)/2 y S₄ = 200')
ok(1-1 == 0 and sp33(7, 1, 20) == 20*7 == 140, 'H33 A (c) r = 1: S₂₀ = 140')
# ejercicio B
ok(1/F(2, 3) == F(3, 2) and F(3, 2)-F(2, 2) == F(1, 2) and all(F(3, 2)**n >= 1+F(n, 2) > F(n, 2) and F(2, 3)**n < F(2, n) for n in range(1, 2300)) and F('0.001') == F(1, 1000) and F(1, 2)*F(1, 1000) == F(1, 2000) and 1/F(1, 2000) == 2000 == N33(F(2, 3), F(1, 1000)) and F(2, 2000) == F(1, 1000) and all(F(2, n) < F(1, 1000) for n in range(2001, 2100)), 'H33 B (a) h = 1/2, (2/3)ⁿ < 2/n, N = 2000')
ok(rd33(F(2, 3)**17, 5) == 101 and F(2, 3)**17 > F(1, 1000) and rd33(F(2, 3)**18, 5) == 68 and all(F(2, 3)**n < F(1, 1000) for n in range(18, 2001)), 'H33 B (a) también sirve N = 17')
ok(F(9, 100)/F(9, 10) == F(9, 100)*F(10, 9) == F(90, 900) == F(1, 10) and pg33(F(9, 10), F(1, 10), 3) == [F(9, 10), F(9, 100), F(9, 1000)] and 1-F(1, 10) == F(10, 10)-F(1, 10) == F(9, 10) and F(9, 10)/F(9, 10) == 1 and all(sp33(F(9, 10), F(1, 10), n) == F(9, 10)*(1-F(1, 10)**n)/F(9, 10) == 1-F(1, 10)**n == F(10**n-1, 10**n) and abs(sp33(F(9, 10), F(1, 10), n)-1) == F(1, 10**n) for n in range(1, 15)) and [sp33(F(9, 10), F(1, 10), n) for n in (1, 2, 3, 4)] == [F('0.9'), F('0.99'), F('0.999'), F('0.9999')], 'H33 B (b) 0,999… = 1: a₁ = 9/10, r = 1/10, Sₙ = 1 − (1/10)ⁿ')
ok(1000 == 10**3 and not 10**3 > 1000 and 10**4 == 10000 > 1000 and all(F(1, 10**n) < F(1, 1000) for n in range(4, 30)) and not F(1, 10**3) < F(1, 1000) and 1-F('0.9999') == F('0.0001'), 'H33 B (c) desde n = 4 (N = 3)')
# ejercicio C
c33 = pg33(1, 3, 10)
ok(c33 == [1, 3, 9, 27, 81, 243, 729, 2187, 6561, 19683] and c33[9] == 1*3**9 == 19683 and 3**10 == 19683*3 == 59049 and 1-59049 == -59048 and 1-3 == -2 and F(-59048, -2) == 29524 == sum(c33), 'H33 C (a)(b) ronda 10: 19 683; total: 29 524')
ok(all(sp33(1, 3, n) == F(1-3**n, 1-3) == F(1-3**n, -2) == F(3**n-1, 2) == F(3*pg33(1, 3, n)[-1]-1, 2) and 3**n == 3**(n-1)*3 for n in range(1, 30)) and 3*19683 == 59049 and 59049-1 == 59048 and 59048//2 == 29524 and rd33(F(29524, 19683), 5) == 149997 and abs(F(19683, 29524) - F(2, 3)) < F(1, 10000), 'H33 C (c) Sₙ = (3aₙ − 1)/2; 29 524/19 683 ≈ 1,49997')
ok(abs(3) >= 1 and F(1, 1-3) == F(-1, 2) and 3**22 == 31381059609 and F(31381059609-1, 2) == 15690529804 == sp33(1, 3, 22) and 15690529804 > 15*10**9 > 8*10**9 and all(sp33(1, 3, n) < sp33(1, 3, n+1) for n in range(1, 25)), 'H33 C (d) diverge; a₁/(1 − r) = −1/2; S₂₂ = 15 690 529 804')
# H34
rd34 = lambda x, d=4: math.floor(F(x)*10**d + F(1, 2))
G34 = range(1, 80)
a34 = lambda n: F(1, 2**n + n)
S34 = lambda n: sum(a34(k) for k in range(1, n+1))
T34 = lambda n: sum(F(1, 2**k) for k in range(1, n+1))
# escena cmp34-idea: registro y lectura, pasos 1 a 6
ok([a34(n) for n in range(1, 7)] == [F(1, 2+1), F(1, 4+2), F(1, 8+3), F(1, 16+4), F(1, 32+5), F(1, 64+6)] == [F(1, 3), F(1, 6), F(1, 11), F(1, 20), F(1, 37), F(1, 70)], 'H34 idea paso 1: términos a₁…a₆')
ok(S34(1) == F(1, 3) and S34(2) == F(2, 6)+F(1, 6) == F(3, 6) == F(1, 2) and S34(3) == F(11, 22)+F(2, 22) == F(13, 22) and S34(4) == F(130, 220)+F(11, 220) == F(141, 220) and F(13, 22) == F(130, 220) and F(1, 20) == F(11, 220), 'H34 idea paso 1: S₁…S₄')
ok(S34(5) == F(5217, 8140)+F(220, 8140) == F(5437, 8140) and F(141, 220) == F(5217, 8140) and F(1, 37) == F(220, 8140) and S34(6) == F(38059, 56980)+F(814, 56980) == F(38873, 56980) and F(5437, 8140) == F(38059, 56980) and F(1, 70) == F(814, 56980), 'H34 idea paso 1: S₅ y S₆')
ok([rd34(S34(n)) for n in range(1, 7)] == [3333, 5000, 5909, 6409, 6679, 6822] and all(S34(n+1) > S34(n) for n in G34), 'H34 idea paso 1: decimales y sumas crecientes')
ok(all(2**n + n > 2**n > 0 and 0 < a34(n) < F(1, 2**n) for n in G34) and F(1, 3) < F(1, 2) and F(1, 6) < F(1, 4) and F(1, 11) < F(1, 8) and F(1, 20) < F(1, 16), 'H34 idea paso 2: 1/(2ⁿ+n) < 1/2ⁿ')
ok([T34(n) for n in range(1, 7)] == [F(1, 2), F(3, 4), F(7, 8), F(15, 16), F(31, 32), F(63, 64)] and F(1, 2)+F(1, 4) == F(3, 4) and F(3, 4)+F(1, 8) == F(7, 8) and F(7, 8)+F(1, 16) == F(15, 16) and F(15, 16)+F(1, 32) == F(31, 32) and F(31, 32)+F(1, 64) == F(63, 64), 'H34 idea paso 2: T₁…T₆')
ok(all(S34(n) <= T34(n) for n in G34) and [rd34(T34(n)) for n in range(1, 7)] == [5000, 7500, 8750, 9375, 9688, 9844] and all(rd34(S34(n)) <= rd34(T34(n)) for n in range(1, 7)) and T34(3) == F('0.875') and T34(4) == F('0.9375') and T34(2) == F('0.75'), 'H34 idea paso 3: Sₙ ≤ Tₙ y sus decimales')
ok(all(T34(n) == F(1, 2)*(1-F(1, 2)**n)/(1-F(1, 2)) == 1-F(1, 2**n) < 1 for n in G34) and 1-F(1, 64) == F(63, 64) and F(1, 2)/(1-F(1, 2)) == F(1, 2)/F(1, 2) == 1, 'H34 idea paso 4: Tₙ = 1 − 1/2ⁿ < 1 y suma 1')
ok(all(S34(n) <= T34(n) < 1 for n in G34) and F('0.6822') <= S34(6) <= 1 and abs(sum(1/(2**n+n) for n in range(1, 200)) - 0.697) < 5e-4, 'H34 idea pasos 5 y 6: techo 1; 0,6822 ≤ S₆; S ≈ 0,697 (numérico)')
# escena cmp34-vivo: las cuatro posiciones del deslizador c
r34 = lambda c, n: c + F(3, n)
for c in (0, 1, 2, 3):
    ok(all(F(c*n+3, n**3)/F(1, n*n) == F(c*n+3, n**3)*n*n == F((c*n+3)*n*n, n**3) == F(c*n+3, n) == F(c*n, n)+F(3, n) == r34(c, n) for n in G34) and all(F(c*n+3, n**3) > 0 for n in G34), 'H34 vivo c=%d: cociente c + 3/n' % c)
    ok([r34(c, n) for n in (1, 2, 3, 8)] == [c+3, c+F('1.5'), c+1, c+F('0.375')], 'H34 vivo c=%d: valores en n = 1, 2, 3, 8' % c)
    ok(all(r34(c, n) > r34(c, n+1) > c for n in G34) and all(abs(r34(c, n) - c) < F(1, 100) for n in range(301, 400)), 'H34 vivo c=%d: el cociente baja hacia L = c' % c)
for c, N, h, ts, den, dec in ((1, 6, F(1, 2), F(3, 2), 143, False), (2, 3, 1, 3, 275, True), (3, 2, F(3, 2), F(9, 2), 400, True)):
    ok(F(c, 2) == h and F(3*c, 2) == ts and ts - c == h and F(3)/h == N == F(6, c) and r34(c, N) == c + F(3, N) == ts and rd34(r34(c, N+1), 2) == den and ((300 % (N+1) == 0) == dec) and r34(c, N+1) < ts, 'H34 vivo c=%d: franja, N y comprobaciones' % c)
    ok(all((h < r34(c, n) < ts) == (n > N) for n in range(1, 200)) and all(r34(c, n) > c > h for n in G34) and all(h*F(1, n*n) < F(c*n+3, n**3) < ts*F(1, n*n) for n in range(N+1, 200)), 'H34 vivo c=%d: dentro de la franja exactamente si n > N' % c)
ok([6//c + 1 for c in (1, 2, 3)] == [7, 4, 3] and all((F(3, n) < 1) == (n > 3) for n in range(1, 200)) and F(3, 3) == 1 and F(3, 4) == F('0.75') < 1 and all(0 < F(3, n**3) < F(1, n*n) for n in range(4, 200)) and F(3, 2) == F('1.5') and F(3, 8) == F('0.375'), 'H34 vivo c=0: caso límite, cociente < 1 si n > 3; verdes desde el 7.º, 4.º, 3.º y 4.º')
# lemas y demostraciones (identidades en rejilla)
ok(all(sum(F(1, k*k) for k in range(1, n+1)) == sum(F(1, k*k) for k in range(1, N)) + sum(F(1, k*k) for k in range(N, N+(n-N+1))) and N+(n-N+1)-1 == n for N in range(2, 7) for n in range(N, 30)) and all(N+m-1 >= m+1 for N in range(2, 9) for m in range(1, 30)), 'H34 lema 3: Sₙ = c + U_m con m = n − N + 1')
ok(all(-F(L, 2) + L == F(L, 2) and F(L, 2) + L == F(3*L, 2) for L in (F(1, 3), 1, 2, F(7, 2))) and all(sum(c*F(1, k*k) for k in range(1, n+1)) == c*sum(F(1, k*k) for k in range(1, n+1)) for c in (F(3, 2), 4, F(1, 5)) for n in range(1, 20)), 'H34 demostración: franja L/2 … 3L/2 y lema 2 (distributiva)')
ok(all(F(1, n*n)/F(1, n) == F(1, n) and F(1, n)/1 == F(1, n) and F(1, n)/F(1, n*n) == n and F(1, n*n)/F(1, n**3) == n for n in G34), 'H34 los cuatro ejemplos de «no se puede concluir»: cocientes 1/n, 1/n, n, n')
# ejemplo 1
ok(a34(1) == F(1, 3) and a34(2) == F(1, 6) and a34(3) == F(1, 11) and rd34(F(13, 22), 3) == 591 and F(13, 22) <= S34(60) <= 1, 'H34 e1: términos, 13/22 ≈ 0,591 ≤ S ≤ 1')
# ejemplo 2
ok([F(1, 2*n-1) for n in (1, 2, 3)] == [1, F(1, 3), F(1, 5)] and all(2*n-1 == n+(n-1) >= n and F(1, 2*n-1) <= F(1, n) and F(1, 2*n-1) > F(1, 2*n) > 0 and F(1, 2*n) == F(1, 2)*F(1, n) for n in G34), 'H34 e2: desigualdades')
ok(1+F(1, 3)+F(1, 5)+F(1, 7) == F(105+35+21+15, 105) == F(176, 105) and rd34(F(176, 105), 3) == 1676 and F(1, 2)+F(1, 4)+F(1, 6)+F(1, 8) == F(12+6+4+3, 24) == F(25, 24) and rd34(F(25, 24), 3) == 1042 and F(176, 105) >= F(25, 24), 'H34 e2: 176/105 y 25/24')
# ejemplo 3
q34 = lambda n: F(3*n+1, n**3+2)/F(1, n*n)
ok([F(3*n+1, n**3+2) for n in (1, 2, 3)] == [F(4, 3), F(7, 10), F(10, 29)] and all(q34(n) == F(3*n**3+n*n, n**3+2) == (3+F(1, n))/(1+F(2, n**3)) and F(2, n**3) == 2*F(1, n)**3 for n in G34) and abs(q34(10**6) - 3) < 1e-5, 'H34 e3: cociente y límite 3')
ok(q34(1) == F(3+1, 1+2) == F(4, 3) and rd34(F(4, 3), 2) == 133 and q34(2) == F(24+4, 8+2) == F(28, 10) == F('2.8') and q34(3) == F(81+9, 27+2) == F(90, 29) and rd34(F(90, 29), 2) == 310 and q34(10) == F(3000+100, 1000+2) == F(3100, 1002) and rd34(F(3100, 1002), 2) == 309, 'H34 e3: cocientes en n = 1, 2, 3, 10')
ok(all(3*n+1 <= 3*n+n == 4*n and F(3*n+1, n**3+2) < F(4*n, n**3) == F(4, n*n) for n in G34), 'H34 e3: comprobación directa aₙ < 4/n²')
# ejemplo 4
p34 = lambda n: F(n, n*n+4)/F(1, n)
ok([F(n, n*n+4) for n in (1, 2, 3)] == [F(1, 5), F(1, 4), F(3, 13)] and F(2, 8) == F(1, 4) and all(F(n, n*n+4) < F(n, n*n) == F(1, n) and p34(n) == F(n*n, n*n+4) == 1/(1+F(4, n*n)) and F(4, n*n) == 4*F(1, n)**2 for n in G34) and abs(p34(10**6) - 1) < 1e-9, 'H34 e4 (a): cociente y límite 1')
ok(p34(1) == F(1, 5) == F('0.2') and p34(2) == F(4, 8) == F('0.5') and p34(3) == F(9, 13) and rd34(F(9, 13), 2) == 69 and p34(10) == F(100, 104) and rd34(F(100, 104), 2) == 96 and all(p34(n) < p34(n+1) < 1 for n in G34), 'H34 e4 (a): cocientes en n = 1, 2, 3, 10')
ok(all(4 <= 4*n*n and n*n+4 <= n*n+4*n*n == 5*n*n and F(n, n*n+4) >= F(n, 5*n*n) == F(1, 5*n) == F(1, 5)*F(1, n) for n in G34), 'H34 e4 (a): comprobación directa aₙ ≥ 1/(5n)')
ok(all(F(1, n*2**n)/F(1, 2**n) == F(1, n) and F(1, n*2**n) <= F(1, 2**n) for n in G34), 'H34 e4 (b): cociente 1/n')
# errores frecuentes
ok(all(F(1, n*n) <= F(1, n) and -n <= F(1, n*n) for n in G34), 'H34 errores frecuentes: 1/n² ≤ 1/n; −n ≤ 1/n²')
# ejercicio A
ok(all(0 < F(1, n**3+5) < F(1, n**3) for n in G34) and all(F(n+2, n*n) > F(n, n*n) == F(1, n) > 0 for n in G34), 'H34 A (a) y (b): desigualdades')
ok([F(1, 3**n-2) for n in (1, 2, 3)] == [1, F(1, 7), F(1, 25)] and all(3**n >= 3 > 2 and F(1, 3**n-2)/F(1, 3**n) == F(3**n, 3**n-2) == 1/(1-F(2, 3**n)) and F(2, 3**n) == 2*F(1, 3)**n and F(1, 3**n-2) > F(1, 3**n) for n in G34) and abs(F(3**40, 3**40-2) - 1) < 1e-15 and F(1, 3)/(1-F(1, 3)) == F(1, 2), 'H34 A (c): cociente y límite 1')
ok(all(3**n - 3**(n-1) == 3*3**(n-1) - 3**(n-1) == 2*3**(n-1) >= 2 and 3**n - 2 >= 3**(n-1) > 0 and 0 < F(1, 3**n-2) <= F(1, 3**(n-1)) for n in G34) and 1/(1-F(1, 3)) == 1/F(2, 3) == F(3, 2) and 1+F(1, 7)+F(1, 25) == F(175+25+7, 175) == F(207, 175) and rd34(F(207, 175), 3) == 1183 and F(207, 175) <= F(3, 2) and sum(F(1, 3**n-2) for n in range(1, 60)) <= F(3, 2), 'H34 A (c): cota 3/2 y S₃ = 207/175')
# ejercicio B
ok([F(1, n*n-2) for n in (1, 2, 3)] == [-1, F(1, 2), F(1, 7)] and all(n*n >= 4 and n*n-2 >= 2 > 0 and 2*n*n-4 >= n*n and 2*(n*n-2) >= n*n and 0 < F(1, n*n-2) <= F(2, n*n) for n in range(2, 200)) and F(1, 2) == F(2, 4) and F(1, 7) <= F(2, 9) and 1*9 == 9 <= 14 == 2*7, 'H34 B (a) y (b): términos y 0 < 1/(n²−2) ≤ 2/n² si n ≥ 2')
ok(all(F(1, n*n-2)/F(1, n*n) == F(n*n, n*n-2) == 1/(1-F(2, n*n)) and F(2, n*n) == 2*F(1, n)**2 and F(1, n*n-2) > F(1, n*n) for n in range(2, 200)) and abs(F(10**12, 10**12-2) - 1) < 1e-11, 'H34 B (c) y (d): cociente, límite 1 y comparación al revés')
# ejercicio C
ok(F(600, 1+5) == F(600, 6) == 100 and F(600, 4+5) == F(600, 9) and rd34(F(600, 9), 2) == 6667 and F(600, 9+5) == F(600, 14) and rd34(F(600, 14), 2) == 4286 and F(600, 2+5) == F(600, 7) and rd34(F(600, 7), 2) == 8571 and F(600, 3+5) == F(600, 8) == 75 and all(F(600, (n+1)**2+5) < F(600, n*n+5) and F(600, n+6) < F(600, n+5) for n in G34), 'H34 C (a): entregas de los días 1, 2 y 3')
ok(all(0 < F(600, n*n+5) < F(600, n*n) for n in G34) and all(sum(F(600, k*k+5) for k in range(1, n+1)) <= 600*sum(F(1, k*k) for k in range(1, n+1)) < 600*2 == 1200 < 1500 for n in range(1, 300)), 'H34 C (b): modelo A, acumulado < 1200 < 1500')
ok(all(5 <= 5*n and n+5 <= n+5*n == 6*n and F(600, n+5) >= F(600, 6*n) == F(100, n) > 0 for n in G34) and all(sum(F(600, k+5) for k in range(1, n+1)) >= 100*sum(F(1, k) for k in range(1, n+1)) for n in range(1, 200)) and all(sum(F(1, k) for k in range(1, 2**m+1)) >= 1+F(m, 2) for m in range(0, 11)), 'H34 C (c): modelo B, 600/(n+5) ≥ 100/n; armónica S(2^m) ≥ 1 + m/2 (m ≤ 10)')
ac34 = lambda n: sum(F(600, k+5) for k in range(1, n+1))
ok(100*(1+F(28, 2)) == 1500 and 100*(1+F(27, 2)) < 1500 and 15-1 == 14 and 14*2 == 28 and 2**28 == 268435456 and ac34(61) < 1500 <= ac34(62) and rd34(ac34(61), 1) == 14947 and rd34(ac34(62), 1) == 15036, 'H34 C (d): m ≥ 28, 2²⁸ = 268 435 456; se llena el día 62')
# Revisión general (cuarta ley), 24-nov: cuentas nuevas de H10–H14 v003
ok([sa(2,3,n) for n in (1,2,3,4)] == [2,7,15,26] and ar(2,3,10) == 2+9*3 == 2+27 == 29 and F(29-2,3)+1 == 9+1 == 10 and (2+3)+(11-3) == 2+11 == 13 and F(4*(2*2+(4-1)*3),2) == F(4*(4+9),2) == F(4*13,2) == 26 and F(4*5,2) == 10 == 1+2+3+4, 'H10 v003 encabezado, k1, k2, k3')
for a1 in range(-4, 5):
    for dn in range(-6, 7):
        if dn == 0: continue
        d = F(dn, 2)
        for n in range(1, 25):
            ok(F(ar(a1,d,n)-a1, d)+1 == n and all(ar(a1,d,n+1-k) == a1+(n-k)*d for k in range(1,n+1)), 'H10 v003 despeje de n y término n+1−k')
ok([float(x) for x in parc(lambda k: F(1,2**k), 4)] == [0.5,0.75,0.875,0.9375] and all(1-F(2**n-1,2**n) == F(1,2**n) and F(2**(n-1)-1,2**(n-1))+F(1,2**n) == F(2**n-2,2**n)+F(1,2**n) == F(2**n-1,2**n) for n in range(1,8)) and (1-F(1,2))+(F(1,2)-F(1,4))+(F(1,4)-F(1,8)) == F(7,8) and parc(lambda k: 1, 4) == [1,2,3,4], 'H11 v003 encabezado, k2, k3 y ser-vivo')
ok(F(4,9)/F(2,3) == F(4,9)*F(3,2) == F(12,18) == F(2,3) and F(8,27)/F(4,9) == F(8,27)*F(9,4) == F(72,108) == F(2,3) and 3*(1-F(16,81)) == F(65,27) and F(2,3)**4 == F(16,81) and F(65,81)/F(1,3) == F(195,81) == F(65,27) and F(27+18+12+8,27) == F(65,27) and [round(float(F(2,3)**k),2) for k in (1,2,3,4)] == [0.67,0.44,0.3,0.2] and 1/(1-F(2,3)) == 3, 'H12 v003 encabezado, k1 y k2')
ok(all(F(1,3)*geo(1,F(2,3),n) == 1-F(2,3)**n for n in range(1,40)), 'H12 v003 lectura del paso 5')
ok([round(float(x),2) for x in SG[:4]] == [1.0,1.67,2.11,2.41] and [round(float(F(2,3)**k),2) for k in (1,2,3)] == [0.67,0.44,0.3] and F(19,9)-F(15,9) == F(4,9) and F(65,27)-F(57,27) == F(8,27) and [sum(bl[:k]) for k in (1,3,6,10)] == [1,2,3,4] and [F(n,n+1) for n in (1,9,99)] == [F(1,2),F(9,10),F(99,100)], 'H13 v003 encabezado, k2, k3 y e1')
ok(sum(F(1,n) for n in range(9,17)) > 8*F(1,16) == F(1,2) and Hn(2) == 1+F(1,2) and Hn(4) > 2 and Hn(8) > F(5,2) and Hn(16) > F(5,2)+F(1,2) == 3 and 1+F(199,2) > 100 >= 1+F(198,2) and len(str(2**199)) == 60 and F(1,4)+F(1,9) <= 2*F(1,4) == F(1,2) and sum(F(1,n*n) for n in range(4,8)) <= 4*F(1,16) == F(1,4) and sum(F(1,n*n) for n in range(1,8)) <= 1+F(1,2)+F(1,4) == F(7,4) < 2 and (2**3,3**3,4**3) == (8,27,64), 'H14 v003 encabezado, k1, k2 y k3')
ok(all((2**(j+1)-1)-2**j+1 == 2**j for j in range(0,20)) and all(F(2**j, 2**(j*p)) == F(1, 2**(j*(p-1))) == F(1, 2**(p-1))**j for p in (2,3,4) for j in range(0,12)), 'H14 v003 k3 exponentes')
# Revisión general (cuarta ley), 24-nov 03:10 UTC: cuentas nuevas de H15–H19 v002
ok([1-F(1,2), F(1,2)-F(1,3), F(1,3)-F(1,4), F(1,4)-F(1,5)] == [F(1,2),F(1,6),F(1,12),F(1,20)] and all(F(1,(k+1)**2) <= F(1,k)-F(1,k+1) <= F(1,k*k) for k in range(1,400)) and F(1,2)+F(1,6)+F(1,12)+F(1,20) == F(30+10+5+3,60) == F(48,60) == F(4,5), 'H15 v002 encabezado: columnas y tramos')
ok(F(1,9) <= F(1,6) <= F(1,4) and [round(float(x),2) for x in (F(1,9),F(1,6),F(1,4))] == [0.11,0.17,0.25] and F(1,4)+F(1,9)+F(1,16)+F(1,25) == F(900+400+225+144,3600) == F(1669,3600) and round(float(F(1669,3600)),2) == 0.46 and 1+F(1,4)+F(1,9)+F(1,16) == F(144+36+16+9,144) == F(205,144) and round(float(F(205,144)),2) == 1.42 and F(1669,3600) <= F(4,5) <= F(205,144), 'H15 v002 demostración con números')
ok([(-1)**(n+1) for n in (1,2,3,4)] == [1,-1,1,-1] and all((-1)**(n+1) == (-1)**n*(-1) for n in range(1,30)), 'H16 v002 encabezado: signos')
_b16 = [F(1,2**(n-1)) for n in range(1,6)]; _s16 = [sum((-1)**k*_b16[k] for k in range(n)) for n in range(0,6)]
ok(_s16[:5] == [0,1,F(1,2),F(3,4),F(5,8)] and F(1,2)+F(1,4) == F(2,4)+F(1,4) and F(3,4)-F(1,8) == F(6,8)-F(1,8) == F(5,8) and _s16[4]-_s16[2] == _b16[2]-_b16[3] == F(2,8)-F(1,8) == F(1,8) == F(5,8)-F(4,8) and _s16[3]-_s16[1] == -_b16[1]+_b16[2] == -F(2,4)+F(1,4) == -F(1,4) == F(3,4)-F(4,4), 'H16 v002 sumas parciales y demostración con números')
_s17 = [sum(F((-1)**(k+1),k) for k in range(1,n+1)) for n in range(0,7)]
ok(_s17[1:] == [1,F(1,2),F(5,6),F(7,12),F(47,60),F(37,60)] and [x*60 for x in _s17[1:]] == [60,30,50,35,47,37] and F(3,6)+F(2,6) == F(5,6) and F(10,12)-F(3,12) == F(7,12) and F(35,60)+F(12,60) == F(47,60) and F(47,60)-F(10,60) == F(37,60) and 30 <= 35 <= 37 and 60 >= 50 >= 47 and F(47,60)-F(37,60) == F(10,60) == F(1,6), 'H17 v002 encabezado')
ok(F(1,2)+F(1,3)-F(1,4) == F(6,12)+F(4,12)-F(3,12) == F(7,12) and 1-(F(1,2)-F(1,3))-F(1,4) == 1-F(1,6)-F(1,4) == F(12,12)-F(2,12)-F(3,12) == F(7,12) < 1, 'H17 v002 demostración con números')
_a18 = [F((-1)**(n-1), 2**(n-1)) for n in range(1,5)]; _S18 = [sum(_a18[:n]) for n in range(1,5)]; _T18 = [sum(abs(x) for x in _a18[:n]) for n in range(1,5)]; _C18 = [sum(x+abs(x) for x in _a18[:n]) for n in range(1,5)]
ok(_S18 == [1,F(1,2),F(3,4),F(5,8)] and _T18 == [1,F(3,2),F(7,4),F(15,8)] and _C18 == [2,2,F(5,2),F(5,2)] and all(_C18[i] == _S18[i]+_T18[i] and _T18[i] < 2 and _C18[i] <= 4 for i in range(4)) and F(5,2)-F(15,8) == F(20,8)-F(15,8) == F(5,8) and F(5,2)-F(7,4) == F(10,4)-F(7,4) == F(3,4) and 1+abs(1) == 2 and -F(1,2)+abs(-F(1,2)) == 0, 'H18 v002 encabezado y demostración con números')
_a19 = lambda n: F(n, 2**n)
ok([_a19(n+1)/_a19(n) for n in (1,2,3,4)] == [1,F(3,4),F(2,3),F(5,8)] and F(2,4)*2 == F(4,4) and F(3,8)*F(4,2) == F(12,16) and F(4,16)*F(8,3) == F(32,48) and F(5,32)*F(16,4) == F(80,128) and all(_a19(n+1)/_a19(n) == F(n+1,2*n) == F(1,2)+F(1,2*n) for n in range(1,300)) and all(_a19(n+1)/_a19(n) <= F(3,4) for n in range(2,300)) and [F(1,2)/1, F(1,4)/F(1,2), F(1,8)/F(1,4)] == [F(1,2)]*3 and round(float(F(2,3)),2) == 0.67, 'H19 v002 encabezado: cocientes')
ok((F(1,2)+1)/2 == F(3,2)/2 == F(3,4) and F(3,4)*F(1,2) == F(3,8) == _a19(3) and _a19(4) == F(1,4) == F(8,32) <= F(9,16)*F(1,2) == F(9,32) and F(1,2)+F(1,2)/F(1,4) == F(1,2)+2 == F(5,2) and all(sum(_a19(k) for k in range(1,n+1)) <= F(5,2) for n in range(1,200)) and [F(2**n,n) for n in (1,2,3,4,5)] == [2,2,F(8,3),4,F(32,5)] and F(8,3)/2 == F(8,6) == F(4,3) > 1, 'H19 v002 demostración con números')
# Revisión general (cuarta ley), 24-nov 06:10 UTC: cuentas nuevas de H20–H24 v002
_p20 = lambda x, n: sum(F(x)**k for k in range(0, n+1))
ok([_p20(F(1,2), n) for n in range(5)] == [1, F(3,2), F(7,4), F(15,8), F(31,16)] and [float(_p20(F(1,2), n)) for n in range(5)] == [1.0, 1.5, 1.75, 1.875, 1.9375] and F(2,2)+F(1,2) == F(3,2) and F(6,4)+F(1,4) == F(7,4) and F(14,8)+F(1,8) == F(15,8) and F(30,16)+F(1,16) == F(31,16) and [2-_p20(F(1,2), n) for n in range(5)] == [1, F(1,2), F(1,4), F(1,8), F(1,16)] and [_p20(2, n) for n in range(5)] == [1, 3, 7, 15, 31] and all(_p20(2, n+1) > 2*_p20(2, n) for n in range(0, 60)) and all(2-_p20(F(1,2), n) == F(1, 2**n) for n in range(0, 60)), 'H20 v002 encabezado: sumas parciales con x = 1/2 y x = 2')
ok(all(F(1,3**(n+1))/F(1,3**n) == F(3**n, 3**n*3) == F(1,3) for n in range(0, 40)) and abs(F(7,2)-2) == F(3,2) and F(1,3)*F(3,2) == F(1,2) < 1 and [F(3,2)**n/3**n for n in (0,1,2)] == [1, F(1,2), F(1,4)] and F(3,2)**2 == F(9,4) and F(9,4)/9 == F(1,4) and abs(8-2) == 6 and F(1,3)*6 == 2 > 1 and [F(6**n, 3**n) for n in (0,1,2)] == [1, 2, 4] and F(36,9) == 4 and F(1,3)*3 == 1 and 1/F(1,3) == 3, 'H20 v002 k3: radio con números (ℓ = 1/3, x = 3,5 y x = 8)')
ok(all((l*d > 1) == (d > 1/l) and (l*d < 1) == (d < 1/l) for l in (F(1,3), F(1,2), 1, 2, F(7,3)) for d in [F(k,12) for k in range(1, 80)]) and all((F(abs(x-2),3) > 1) == (abs(x-2) > 3) for x in [F(k,4) for k in range(-40, 60)]), 'H20 v002 k3 paso 6 y ejemplo 4 paso 6: L > 1 despejado')
ok((2*3, 6*3, 18*3) == (6, 18, 54) and (F(6,2), F(18,6), F(54,18)) == (3, 3, 3), 'H21 v002 encabezado: productos y cocientes')
ok(6*3 == 18 and 6*3*3 == 54 and 6*3*3*3 == 162 == 54*3 and 5-2 == 3 and F(162,6) == 27 == 3**3 and [4*2**k for k in range(3)] == [4,8,16] and (8-4, 16-8) == (4, 8) and [4*F(1,2)**k for k in range(3)] == [4,2,1] and (2-4, 1-2) == (-2, -1) and [4*(-2)**k for k in range(3)] == [4,-8,16] and (-8-4, 16-(-8)) == (-12, 24), 'H21 v002 k2 y k3 con números')
ok([3*2**(n-1) for n in (1,2,3,4,5)] == [3,6,12,24,48] and 3*2 == 6 and 3*2*2 == 12 and 3*2*2*2 == 24 and 3*2**3 == 3*8 == 24 and 3*2**3*2 == 3*2**4 == 3*16 == 48 and 6*2**(5-2) == 6*8 == 48 and F(2)**(2-5) == F(1,2**3) == F(1,8) and 48*F(1,8) == F(48,8) == 6, 'H22 v002 encabezado, k2 y k3 con números')
_a23 = [F(18, 3**n) for n in range(1, 5)]
ok(_a23 == [6, 2, F(2,3), F(2,9)] and F(2,6) == F(1,3) and F(2,3)/2 == F(2,3)*F(1,2) == F(2,6) == F(1,3) and F(2,9)/F(2,3) == F(2,9)*F(3,2) == F(6,18) == F(1,3) and [6*F(1,3)**k for k in range(4)] == _a23 and F(6,9) == F(2,3) and F(6,27) == F(2,9) and F(1,2)/1 == F(1,2) and F(1,3)/F(1,2) == F(1,3)*2 == F(2,3) and F(1,4)/F(1,3) == F(1,4)*3 == F(3,4) and len({F(1,2), F(2,3), F(3,4)}) == 3 and (6*F(1,3)**2)/(6*F(1,3)) == F(1,3) and F(1,3)*6 == 2 and F(1,3)*2 == F(2,3) == 6*F(1,3)**2, 'H23 v002 encabezado y k2 con números')
_s24 = [sum(F(1,2**k) for k in range(1, n+1)) for n in range(1, 5)]
ok(_s24 == [F(1,2), F(3,4), F(7,8), F(15,16)] and [1-x for x in _s24] == [F(1,2), F(1,4), F(1,8), F(1,16)] and F(2,4)+F(1,4) == F(3,4) and F(6,8)+F(1,8) == F(7,8) and F(14,16)+F(1,16) == F(15,16) and F(1,2)/(1-F(1,2)) == F(1,2)/F(1,2) == 1 and F(1,2)*_s24[2] == F(1,4)+F(1,8)+F(1,16) and _s24[2]-F(1,2)*_s24[2] == F(1,2)-F(1,16) == F(8,16)-F(1,16) == F(7,16) and F(7,16)/F(1,2) == F(7,16)*2 == F(14,16) == F(7,8) == _s24[2] and all(1-sum(F(1,2**k) for k in range(1, n+1)) == F(1,2**n) for n in range(1, 60)), 'H24 v002 encabezado y k2 con números')
# Revisión general (cuarta ley), 24-nov 09:10 UTC: cuentas nuevas de H25–H29 v002
_r25 = [8*F(1,2)**k for k in range(4)]; _s25 = [sum(_r25[:n]) for n in range(1,5)]
ok(_r25 == [8,4,2,1] == [4+4, 2+2, 1+1, F(1,2)+F(1,2)] and (8*F(1,2), 4*F(1,2), 2*F(1,2)) == (4,2,1) and _s25 == [8,12,14,15] and [16-x for x in _s25] == [8,4,2,1] and 1-F(1,2)**4 == F(15,16) and 8*F(15,16) == F(15,2) and F(15,2)/F(1,2) == F(15,2)*2 == 15 == 8*(1-F(1,2)**4)/(1-F(1,2)) and 8/(1-F(1,2)) == 8/F(1,2) == 8*2 == 16 and 8+16 == 24 and all(16-sum(8*F(1,2)**k for k in range(n)) == 16*F(1,2)**n for n in range(1,60)), 'H25 v002 encabezado: rebotes, sumas parciales y las dos fórmulas')
ok((9*F(1,3), 3*F(1,3), 1*F(1,3)) == (3,1,F(1,3)) and (3+3, 1+1, F(1,3)+F(1,3)) == (6,2,F(2,3)) and F(2,6) == F(1,3) and F(2,3)/2 == F(2,6) == F(1,3) and 6/(1-F(1,3)) == 6/F(2,3) == 6*F(3,2) == F(18,2) == 9 and 9+9 == 18 and 9*(1+F(1,3))/(1-F(1,3)) == 18 and 9*F(4,3) == 12 and 12/F(2,3) == 12*F(3,2) == 18 and all(h+2*h*r/(1-r) == h*(1+r)/(1-r) for h in (1,8,9,F(5,2)) for r in [F(k,12) for k in range(1,12)]), 'H25 v002 k2 con números (h = 9, r = 1/3)')
_a26 = lambda n: F(n+1, n)
ok([_a26(n) for n in (1,2,3,4,10,100)] == [2,F(3,2),F(4,3),F(5,4),F(11,10),F(101,100)] and [float(_a26(n)) for n in (2,4,10,100)] == [1.5,1.25,1.1,1.01] and round(float(F(4,3)),2) == 1.33 and all(_a26(n)-1 == F(n+1,n)-F(n,n) == F(1,n) for n in range(1,500)) and all(F(1,n) < F(1,10) for n in range(11,500)) and all(F(1,n) < F(1,100) for n in range(101,500)) and not F(1,10) < F(1,10), 'H26 v002 encabezado: términos y distancias')
ok(2-1 == 1 and F(1,1)/2 == F(1,2) and (1-F(1,2), 1+F(1,2), 2-F(1,2), 2+F(1,2)) == (F(1,2),F(3,2),F(3,2),F(5,2)) and not any(abs(x-1) < F(1,2) and abs(x-2) < F(1,2) for x in [F(k,40) for k in range(-80,200)]) and F(1,10)/2 == F(1,20) and all(F(1,n)+F(n+1,n) == F(n+2,n) and F(n+2,n)-1 == F(2,n) == F(1,n)+F(1,n) and F(1,n) < F(1,20) and F(2,n) < F(1,20)+F(1,20) == F(2,20) == F(1,10) for n in range(21,400)) and [F(1,n-1) for n in (2,3,4)] == [1,F(1,2),F(1,3)] and all(n-1 > 10 and F(1,n-1) < F(1,10) for n in range(12,400)), 'H26 v002 k2: teoremas 1, 2 y 3 con números')
_a27 = lambda n: F(n, n+1)
ok([_a27(n) for n in (1,2,3,4)] == [F(1,2),F(2,3),F(3,4),F(4,5)] and [round(float(_a27(n)),2) for n in (1,2,3,4)] == [0.5,0.67,0.75,0.8] and F(4,6)-F(3,6) == F(1,6) == _a27(2)-_a27(1) and F(9,12)-F(8,12) == F(1,12) == _a27(3)-_a27(2) and F(16,20)-F(15,20) == F(1,20) == _a27(4)-_a27(3) and all(1-_a27(n) == F(1,n+1) > 0 and _a27(n+1) > _a27(n) for n in range(1,500)) and _a27(10) == F(10,11) > F(9,10) and round(float(F(10,11)),2) == 0.91, 'H27 v002 encabezado: términos, subidas y lo que falta')
ok(all(abs(_a26(n)-1) < 1 for n in range(2,300)) and all(abs(_a26(n)) < 1+abs(1) == 2 for n in range(2,300)) and _a26(1) == 2 and max(abs(_a26(1)), 2) == 2 and all(abs(_a26(n)) <= 2 for n in range(1,300)) and 1-F(1,10) == F(9,10) and F(10,11) == F(100,110) > F(99,110) == F(9,10) and all(F(9,10) < _a27(10) <= _a27(n) <= 1 and abs(_a27(n)-1) < F(1,10) for n in range(10,400)) and not _a27(9) > F(9,10) and all(-F(1,n+1) > -F(1,n) and -F(1,n) < 0 for n in range(1,300)) and all(n+1 > 10 and F(1,n+1) < F(1,10) for n in range(11,300)), 'H27 v002 k2: teoremas 1 a 4 con números')
_s28 = [sum(F(1,3)**k for k in range(n+1)) for n in range(4)]
ok(1/(1-F(1,3)) == 1/F(2,3) == F(3,2) and _s28 == [1,F(4,3),F(13,9),F(40,27)] and F(3,3)+F(1,3) == F(4,3) and F(12,9)+F(1,9) == F(13,9) and F(39,27)+F(1,27) == F(40,27) and [F(3,2)-x for x in _s28] == [F(1,2),F(1,6),F(1,18),F(1,54)] and (F(9,6)-F(8,6), F(27,18)-F(26,18), F(81,54)-F(80,54)) == (F(1,6),F(1,18),F(1,54)) and all(F(3,2)-sum(F(1,3)**k for k in range(n+1)) == F(1,2)*F(1,3)**n for n in range(0,60)) and 1/F(1-2) == -1 and [sum(2**k for k in range(n+1)) for n in range(4)] == [1,3,7,15], 'H28 v002 encabezado: x = 1/3 y x = 2')
ok(F(1,3)*_s28[2] == F(1,3)+F(1,9)+F(1,27) and _s28[2]-F(1,3)*_s28[2] == 1-F(1,27) == F(27,27)-F(1,27) == F(26,27) and 1-F(1,3) == F(2,3) and F(26,27)/F(2,3) == F(26,27)*F(3,2) == F(78,54) == F(13,9) == F(9,9)+F(3,9)+F(1,9) and F(27,18)-F(26,18) == F(1,18) == F(1,3)**3/(1-F(1,3)) == F(1,27)*F(3,2) == F(3,54) and all(1/(1-x)-sum(x**k for k in range(N+1)) == x**(N+1)/(1-x) for x in (F(1,3),F(-1,2),F(3,4),2,-3) for N in range(0,12)), 'H28 v002 k2 con números (x = 1/3, N = 2)')
_h = F(1,2)
ok(1/(1-_h) == 2 and [sum(_h**k for k in range(n+1)) for n in range(4)] == [1,F(3,2),F(7,4),F(15,8)] and [2-sum(_h**k for k in range(n+1)) for n in range(4)] == [1,F(1,2),F(1,4),F(1,8)] and _h/(1-_h) == 1 and [sum(_h**k for k in range(1,n+1)) for n in range(1,5)] == [F(1,2),F(3,4),F(7,8),F(15,16)], 'H29 v002 encabezado: representar y multiplicar por x')
_sg = [sum((1+(-1)**k)*_h**k for k in range(0,n+1)) for n in (0,2,4,6)]
ok(1/(1-_h) == 2 and 1/(1+_h) == 1/F(3,2) == F(2,3) and [1+(-1)**k for k in range(5)] == [2,0,2,0,2] and _sg == [2,F(5,2),F(21,8),F(85,32)] and 2+F(2,4) == F(5,2) and F(5,2)+F(2,16) == F(21,8) and F(21,8)+F(2,64) == F(85,32) and 2+F(2,3) == F(6,3)+F(2,3) == F(8,3) and round(float(F(8,3)),2) == 2.67 and round(float(F(85,32)),2) == 2.66 and all(F(8,3)-sum((1+(-1)**k)*_h**k for k in range(0,n+1)) == F(8,3)*F(1,4)**(n//2+1) for n in range(0,40)) and all(1/(1-x)+1/(1+x) == 2/(1-x*x) for x in [F(k,7) for k in range(-6,7)]), 'H29 v002 k2: suma con números')
_s3 = [sum(3*_h**k for k in range(n+1)) for n in range(4)]; _sx = [sum(_h**(k+2) for k in range(n+1)) for n in range(4)]
ok(_s3 == [3,F(9,2),F(21,4),F(45,8)] and 3+F(3,2) == F(9,2) and F(9,2)+F(3,4) == F(21,4) and F(21,4)+F(3,8) == F(45,8) and 3*2 == 6 and [6-x for x in _s3] == [3,F(3,2),F(3,4),F(3,8)] and _sx == [F(1,4),F(3,8),F(7,16),F(15,32)] and F(1,4)+F(1,8) == F(3,8) and F(3,8)+F(1,16) == F(7,16) and F(7,16)+F(1,32) == F(15,32) and F(1,4)*2 == F(1,2) and [F(1,2)-x for x in _sx] == [F(1,4),F(1,8),F(1,16),F(1,32)], 'H29 v002 k2: constante y potencia con números')
# Revisión general (cuarta ley), 24-nov 12:10 UTC: cuentas nuevas de H30–H34 v002
def _der(c): return [k*c[k] for k in range(1, len(c))] or [0]            # derivada de un polinomio en potencias de u
def _val(c, u): return sum(F(ck)*F(u)**k for k, ck in enumerate(c))
_G = [F(k,3) for k in range(-12,13)]
# H30 encabezado: x^3 = 1 + 3(x-1) + 3(x-1)^2 + (x-1)^3
_c30 = [1,3,3,1]
ok(all(x**3 == _val(_c30, x-1) for x in _G) and all((1+u)**3 == 1+3*u+3*u*u+u**3 for u in _G) and 2**3 == 8 == 1+3*1+3*1**2+1**3 == 1+3+3+1 and all(3*x*x == 3+2*3*(x-1)+3*1*(x-1)**2 and 6*x == 2*3+3*2*1*(x-1) for x in _G) and 3*1**2 == 3 and 6*1 == 6 == 2*3 and F(6,2) == 3 and 6 == 3*2*1*1 and F(6,6) == 1 and [F(1,1),F(3,1),F(6,2),F(6,6)] == _c30 and [factorial(k) for k in range(4)] == [1,1,2,6] and [_val(d,0) for d in (_c30, _der(_c30), _der(_der(_c30)), _der(_der(_der(_c30))))] == [1,3,6,6], 'H30 v002 encabezado: x³ en potencias de (x − 1)')
# H30 k2: f = 5 + 4u + 3u^2 + 2u^3 con u = x - 2
_c = [5,4,3,2]; _d1 = _der(_c); _d2 = _der(_d1); _d3 = _der(_d2)
ok(_d1 == [4,6,6] and _d2 == [6,12] and _d3 == [12] and 3*2 == 6 and 2*3 == 6 and 6*2 == 12 and [_val(d,0) for d in (_c,_d1,_d2,_d3)] == [5,4,6,12] and F(6,factorial(2)) == F(6,2) == 3 and F(12,factorial(3)) == F(12,6) == 2 and [F(_val(d,0), factorial(k)) for k, d in enumerate((_c,_d1,_d2,_d3))] == _c, 'H30 v002 k2 con números (centro 2)')
# H31 encabezado: (1+x)^3
_m = [1,3,3,1]; _m1 = _der(_m); _m2 = _der(_m1); _m3 = _der(_m2); _m4 = _der(_m3)
ok(all((1+x)**3 == _val(_m, x) and _val(_m1, x) == 3*(1+x)**2 and _val(_m2, x) == 3*2*(1+x) == 6*(1+x) and _val(_m3, x) == 6 and _val(_m4, x) == 0 for x in _G) and [_val(d,0) for d in (_m,_m1,_m2,_m3,_m4)] == [1,3,6,6,0] and [F(1,1),F(3,1),F(6,2),F(6,6),F(0,24)] == [1,3,3,1,0] and [factorial(k) for k in range(5)] == [1,1,2,6,24] and (1+1)**3 == 2**3 == 8 == 1+3+3+1 and _der([0,0,0,1]) == [0,0,3] and _der([0,0,3]) == [0,6] and _der([0,6]) == [6] and 3*2*1 == 6 == factorial(3), 'H31 v002 encabezado: (1 + x)³')
ok((-3)**2 == 9 == 3**2 and 2*(-3) == -6 == -(2*3) and 2*0 == 0 and (-2)**3 == -8 == -(2**3) and 0**3 == 0 and 3*(-2)**2 == 12 == 3*2**2 and all((-x)**2 == x**2 and 2*(-x) == -(2*x) and (-x)**3 == -(x**3) and 3*(-x)**2 == 3*x**2 for x in _G), 'H31 v002 k2: par e impar con números')
# H32 encabezado
_ce = [F(1, factorial(k)) for k in range(4)]; _cs = [F(v, factorial(k)) for k, v in enumerate([0,1,0,-1,0,1])]; _cc = [F(v, factorial(k)) for k, v in enumerate([1,0,-1,0,1])]
_se = [sum(F(1, factorial(k)) for k in range(n+1)) for n in range(5)]
ok(_ce == [1,1,F(1,2),F(1,6)] and _cs == [0,1,0,F(-1,6),0,F(1,120)] and _cc == [1,0,F(-1,2),0,F(1,24)] and [factorial(k) for k in range(6)] == [1,1,2,6,24,120] and [round(math.sin(k*math.pi/2)) for k in range(6)] == [0,1,0,-1,0,1] and [round(math.cos(k*math.pi/2)) for k in range(5)] == [1,0,-1,0,1] and [2*n+1 for n in range(3)] == [1,3,5] and [2*n for n in range(3)] == [0,2,4] and [(-1)**n for n in range(3)] == [1,-1,1] and _se == [1,2,F(5,2),F(8,3),F(65,24)] and 2+F(1,2) == F(5,2) and F(5,2)+F(1,6) == F(16,6) == F(8,3) and F(8,3)+F(1,24) == F(65,24) and round(float(F(8,3)),2) == 2.67 and round(float(F(65,24)),2) == 2.71 and round(math.e,3) == 2.718 and abs(math.e-float(F(65,24))) < 0.011, 'H32 v002 encabezado: tablas de derivadas, coeficientes y sumas parciales de e')
_p1, _p3, _p5 = F(1), 1-F(1,6), 1-F(1,6)+F(1,120); _s1 = math.sin(1)
ok(round(_s1,4) == 0.8415 and _p3 == F(5,6) and round(float(_p3),4) == 0.8333 and _p5 == F(5,6)+F(1,120) == F(101,120) and round(float(_p5),4) == 0.8417 and round(abs(0.8415-1),4) == 0.1585 and round(0.8415-0.8333,4) == 0.0082 and round(0.8417-0.8415,4) == 0.0002 and (F(1,factorial(2)), F(1,factorial(4)), F(1,factorial(6))) == (F(1,2),F(1,24),F(1,720)) and round(1/24,4) == 0.0417 and round(1/720,4) == 0.0014 and abs(_s1-1) <= 1/2 and abs(_s1-float(_p3)) <= 1/24 and abs(_s1-float(_p5)) <= 1/720 and 0.1585 <= 0.5 and 0.0082 <= 0.0417 and 0.0002 <= 0.0014, 'H32 v002 k2: sen 1, sumas parciales y cotas')
_t2 = [F(2**k, factorial(k)) for k in range(7)]
ok(_t2 == [1,2,F(4,2),F(8,6),F(16,24),F(32,120),F(64,720)] == [1,2,2,F(4,3),F(2,3),F(4,15),F(4,45)] and all(_t2[k] == _t2[k-1]*F(2,k) for k in range(1,7)) and all(F(2,k) < 1 for k in range(3,400)) and all(_t2[k] < _t2[k-1] for k in range(3,7)), 'H32 v002 k2: 2^k/k! para k = 0…6')
# H33: progresión 4, 2, 1, 1/2
_h = F(1,2); _a33 = [4*_h**k for k in range(4)]; _s33 = [sum(_a33[:n]) for n in range(1,5)]
ok(_a33 == [4,2,1,F(1,2)] and 4*_h == 2 and 4*_h*_h == 1 and 4*_h*_h*_h == F(4,8) == F(1,2) and _s33 == [4,6,7,F(15,2)] and 7+_h == F(15,2) and 1-F(1,16) == F(15,16) and 4*F(15,16) == F(15,4) and F(15,4)/_h == F(15,4)*2 == F(15,2) == 4*(1-_h**4)/(1-_h) and 4/(1-_h) == 4/_h == 4*2 == 8 and [8-x for x in _s33] == [4,2,1,F(1,2)] and all(8-sum(4*_h**k for k in range(n)) == 8*_h**n for n in range(1,60)), 'H33 v002 encabezado: términos, sumas y las tres fórmulas')
ok(4*_h**0 == 4*1 == 4 and 4*_h**0*_h == 4*_h**1 == 2 and 4*_h**1*_h == 4*_h**2 == 1 and _h*_s33[3] == 2+1+_h+F(1,4) and _s33[3]-_h*_s33[3] == 4-F(1,4) == F(16,4)-F(1,4) == F(15,4) and (1-_h)*_s33[3] == F(15,4) and F(15,4)*2 == F(30,4) == F(15,2) and 4*(1-F(1,8))/_h == 4*F(7,8)*2 == 7 == _s33[2] and 7+_h == F(15,2), 'H33 v002 k2: teoremas 1 y 2 con números')
ok(F(3,2)**1 == F(3,2) == 1+1*_h and F(3,2)**2 == F(9,4) and 1+2*_h == 2 == F(8,4) and F(9,4) >= F(8,4) and F(3,2)**3 == F(27,8) and 1+3*_h == F(5,2) == F(20,8) and F(27,8) >= F(20,8) and all((1+h)**n >= 1+n*h for h in (F(1,2),F(1,7),3,F(9,4)) for n in range(1,40)) and 1/_h-1 == 1 and all(_h**n < F(1,n) for n in range(1,400)) and [_h**n for n in range(1,5)] == [F(1,2),F(1,4),F(1,8),F(1,16)] and 1/(1*F(1,100)) == 100 and all(_h**n < F(1,n) < F(1,100) for n in range(101,500)) and _h**7 == F(1,128) < F(1,100) and [2**m for m in range(4)] == [1,2,4,8] and abs(-2) == 2 and abs(-1) == 1 and all(1**m == 1 for m in range(30)), 'H33 v002 k3: lemas 1, 2 y 3 con números')
ok(4/_h == 8 and (8-4, 8-6, 8-7, 8-F(15,2)) == (4,2,1,F(1,2)) and abs(F(4))/abs(1-_h) == 8 and [8*_h**n for n in range(1,5)] == [4,2,1,F(1,2)] and 2**10 == 1024 and 8*F(1,1024) == F(1,128) < F(1,100) and all(8*_h**n < F(1,100) for n in range(10,300)) and all(8*_h**(n+1) < 8*_h**n for n in range(1,300)) and [sum(5*(-1)**k for k in range(n)) for n in range(1,5)] == [5,0,5,0], 'H33 v002 k3: teorema 3 con números')
# H34: a_n = 1/(2^n+1), b_n = 1/2^n
_a34 = lambda n: F(1, 2**n+1); _b34 = lambda n: F(1, 2**n)
_S34 = [sum(_a34(k) for k in range(1,n+1)) for n in range(1,4)]; _T34 = [sum(_b34(k) for k in range(1,n+1)) for n in range(1,6)]
ok([_a34(n) for n in (1,2,3)] == [F(1,3),F(1,5),F(1,9)] and [_b34(n) for n in (1,2,3)] == [F(1,2),F(1,4),F(1,8)] and all(0 < _a34(n) <= _b34(n) for n in range(1,300)) and _T34 == [F(1,2),F(3,4),F(7,8),F(15,16),F(31,32)] and all(sum(_b34(k) for k in range(1,n+1)) == 1-_b34(n) < 1 for n in range(1,200)) and _S34 == [F(1,3),F(8,15),F(29,45)] and F(1,3)+F(1,5) == F(8,15) and F(8,15)+F(1,9) == F(29,45) and all(_S34[k] <= _T34[k] <= 1 for k in range(3)) and all(sum(_a34(k) for k in range(1,n+1)) <= sum(_b34(k) for k in range(1,n+1)) for n in range(1,200)), 'H34 v002 encabezado: comparación directa con números')
ok(all(F(n+1,n*n) == F(n,n*n)+F(1,n*n) == F(1,n)+F(1,n*n) >= F(1,n) for n in range(1,400)) and all(_a34(n)/_b34(n) == F(2**n, 2**n+1) == 1-_a34(n) for n in range(1,200)) and [F(2**n, 2**n+1) for n in range(1,5)] == [F(2,3),F(4,5),F(8,9),F(16,17)] and all(1-F(2**n,2**n+1) < F(1,2**n) for n in range(1,200)), 'H34 v002 encabezado: la serie mayor que la armónica y el cociente')
ok(_T34[0] <= _T34[1] <= _T34[2] <= _T34[3] <= 1 and [3*t for t in _T34[:3]] == [F(3,2),F(9,4),F(21,8)] and F(3,2)+F(3,4) == F(9,4) and F(9,4)+F(3,8) == F(21,8) and 3*1 == 3 and [_T34[m+1]-F(3,4) for m in range(1,4)] == [F(1,8),F(3,16),F(7,32)] and F(1,8)+F(1,16) == F(3,16) and F(3,16)+F(1,32) == F(7,32) and F(1,2)+F(1,4) == F(3,4) and 1-F(3,4) == F(1,4) and all(sum(_b34(k) for k in range(3,m+3)) == F(1,4)-_b34(m+2) for m in range(1,100)) and (F(1,2)*_b34(1), F(3,2)*_b34(1), F(1,2)*_b34(2), F(3,2)*_b34(2)) == (F(1,4),F(3,4),F(1,8),F(3,8)) and F(1,4) <= F(1,3) <= F(3,4) and F(1,8) <= F(1,5) <= F(3,8) and all(F(1,2)*_b34(n) <= _a34(n) <= F(3,2)*_b34(n) for n in range(1,300)), 'H34 v002 k2: lemas y criterios con números')
ok(8+4+2+1 == 15 == 2*F(15,2) and 8 == 2*4, 'H33 v002 k2: la animación, con el primer término al doble')
print('Lote 25 H01–H34:', 'sin errores' if not err else f'{err} errores')
