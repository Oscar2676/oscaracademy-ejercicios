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
print('Lote 25 H01–H23:', 'sin errores' if not err else f'{err} errores')
