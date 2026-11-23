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
print('Lote 25 H01–H14:', 'sin errores' if not err else f'{err} errores')
