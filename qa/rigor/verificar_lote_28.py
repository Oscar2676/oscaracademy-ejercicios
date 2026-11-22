#!/usr/bin/env python3
"""Lote 28 · Determinantes: comprobación exacta de las cuentas de las hojas."""
from fractions import Fraction as Fr
import itertools, sys
err = []
def ok(c, m):
    if not c: err.append(m)
def det2(a, b, c, d): return a*d - b*c
# H01 · ejemplos y ejercicios
ok(det2(3, 5, 2, 4) == 2, 'H01 ej1'); ok(det2(-2, 3, 4, -1) == -10, 'H01 ej2'); ok(det2(6, 9, 4, 6) == 0, 'H01 ej3')
ok(Fr(3, 2)*6 == 9 and Fr(3, 2)*4 == 6, 'H01 ej3 múltiplo')
for x in (3, -2): ok(det2(x, 2, 3, x - 1) == 0 and x*x - x - 6 == 0, 'H01 ej4 x=%d' % x)
ok(det2(5, -2, 3, 4) == 26, 'H01 A'); ok(det2(1, 2, 3, 4) == -2, 'H01 error frecuente')
for k in (6, -6): ok(det2(k, 4, 9, k) == 0, 'H01 B k=%d' % k)
ok(Fr(3, 2)*4 == 6 and Fr(3, 2)*6 == 9 and Fr(-3, 2)*4 == -6 and Fr(-3, 2)*(-6) == 9, 'H01 B múltiplos')
ok(det2(30, 10, 10, 40) == 1100 and (30 + 10, 10 + 40) == (40, 50), 'H01 C')
# H01 · identidades (se prueban en una rejilla de enteros; son identidades polinómicas de grado <= 4)
R = range(-3, 4)
for a, b, c, d in itertools.product(R, repeat=4):
    ok((a + b)*(c + d) - 2*b*c - a*c - b*d == a*d - b*c, 'H01 rectángulo menos piezas')
    ok((a*a + c*c)*(b*b + d*d) - (a*b + c*d)**2 == (a*d - b*c)**2, 'H01 área al cuadrado')
# figura de la animación: a=3, c=1, b=1, d=2 (área por la fórmula del cordón)
P = [(0, 0), (3, 1), (4, 3), (1, 2)]
sh = sum(P[i][0]*P[(i + 1) % 4][1] - P[(i + 1) % 4][0]*P[i][1] for i in range(4))
ok(Fr(abs(sh), 2) == det2(3, 1, 1, 2) == 5, 'H01 figura')
# H02 · tercer orden
def det3(m):
    (a, b, c), (d, e, f), (g, h, i) = m
    return a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g)
ok(det3([[1, 2, 3], [0, 4, 5], [1, 0, 6]]) == 22 and (24, -5, -4) == (4*6 - 5*0, 0*6 - 5*1, 0*0 - 4*1), 'H02 ej1')
ok(det3([[2, -1, 0], [3, 1, -2], [-1, 4, 5]]) == 39 and 1*5 - (-2)*4 == 13 and 3*5 - (-2)*(-1) == 13, 'H02 ej2')
ok(det3([[2, 5, -1], [0, 3, 4], [0, 0, -2]]) == -12 == 2*3*(-2), 'H02 ej3')
for x in (2, -1): ok(det3([[x, 1, 0], [2, x, 1], [0, 1, 1]]) == 0 == x*x - x - 2, 'H02 ej4 x=%d' % x)
ok(det3([[3, 0, 2], [1, -1, 4], [2, 1, 0]]) == -6, 'H02 A')
ok(det3([[1, 2, 3], [4, 5, 6], [7, 8, 9]]) == 0 and (45 - 48, 36 - 42, 32 - 35) == (-3, -6, -3), 'H02 B')
ok(all(c1 - 2*c2 + c3 == 0 for c1, c2, c3 in zip((1, 4, 7), (2, 5, 8), (3, 6, 9))), 'H02 B combinación')
ok(det3([[40, 10, 5], [0, 30, 5], [0, 0, 20]]) == 24000 and 30*20 == 600, 'H02 C')
for m in itertools.product(range(-2, 3), repeat=9):
    if m[0] % 2 or m[4] % 2: continue  # submuestra de la rejilla (identidad polinómica)
    a, b, c, d, e, f, g, h, i = m
    ok(det3([[a, b, c], [d, e, f], [g, h, i]]) == a*e*i + b*f*g + c*d*h - c*e*g - a*f*h - b*d*i, 'H02 seis productos')
for h in (Fr(-2), Fr(0), Fr(5, 2)): ok(det3([[2, 1, Fr(1, 2)], [0, 2, Fr(1, 2)], [0, 0, h]]) == 4*h, 'H02 escena volumen')
# H03 · regla de Sarrus
def sar(m):
    (a, b, c), (d, e, f), (g, h, i) = m
    baj = (a*e*i, b*f*g, c*d*h); sub = (g*e*c, h*f*a, i*d*b)
    return baj, sub, sum(baj) - sum(sub)
def chk(m, baj, sub, D, t):
    B, S_, d = sar(m); ok(B == tuple(baj) and S_ == tuple(sub) and d == D == det3(m), t)
chk([[1, 2, 3], [0, 4, 5], [1, 0, 6]], (24, 10, 0), (12, 0, 0), 22, 'H03 ej1')
chk([[2, -1, 0], [3, 1, -2], [-1, 4, 5]], (10, -2, 0), (0, -16, -15), 39, 'H03 ej2'); ok(10 - 2 + 0 == 8 and 0 - 16 - 15 == -31, 'H03 ej2 sumas')
chk([[Fr(1, 2), 1, 0], [2, 4, 1], [0, 6, 2]], (4, 0, 0), (0, 3, 4), -3, 'H03 ej3')
for x in range(-4, 5):
    B, S_, d = sar([[x, 1, 1], [1, x, 1], [1, 1, 2]])
    ok(B == (2*x*x, 1, 1) and S_ == (x, x, 2) and d == 2*x*x - 2*x == 2*x*(x - 1), 'H03 ej4 polinomio')
for x in (0, 1): ok(det3([[x, 1, 1], [1, x, 1], [1, 1, 2]]) == 0, 'H03 ej4 raíz')
chk([[2, 0, 1], [1, 3, -1], [0, 4, 2]], (12, 0, 4), (0, -8, 0), 24, 'H03 A')
for k in range(-4, 5):
    B, S_, d = sar([[k, 2, 0], [2, k, 0], [1, 1, 3]]); ok(B == (3*k*k, 0, 0) and S_ == (0, 0, 12) and d == 3*k*k - 12, 'H03 B polinomio')
for k in (2, -2): ok(det3([[k, 2, 0], [2, k, 0], [1, 1, 3]]) == 0, 'H03 B raíz')
chk([[30, 0, 10], [0, 20, 10], [10, 5, 40]], (24000, 0, 0), (2000, 1500, 0), 20500, 'H03 C'); ok(Fr(20500, 1000) == Fr(41, 2), 'H03 C litros')
# H03 · identidades: Sarrus = desarrollo por la primera fila; variante con filas repetidas; conteo de cuarto orden
import math
G3 = [m for m in itertools.product(range(-2, 3), repeat=9) if not (m[0] % 2 or m[4] % 2)]  # submuestra (identidades polinómicas de grado 1 en cada entrada)
for m in G3:
    a, b, c, d, e, f, g, h, i = m; M = [[a, b, c], [d, e, f], [g, h, i]]
    ok(sar(M)[2] == det3(M) == a*e*i - a*f*h - b*d*i + b*f*g + c*d*h - c*e*g, 'H03 Sarrus = primera fila')
    ok(a*e*i + d*h*c + g*b*f - g*e*c - a*h*f - d*b*i == det3(M), 'H03 variante con filas')
ok(math.factorial(4) == 24 == 4*6 and 24 - 8 == 16, 'H03 cuarto orden: 24 productos')
# H04 · propiedades. Segundo orden: identidades en rejilla de enteros
for a, b, c, d in itertools.product(R, repeat=4):
    D = det2(a, b, c, d)
    ok(det2(c, d, a, b) == -D and det2(b, a, d, c) == -D, 'H04 intercambio 2x2'); ok(det2(a, b, a, b) == 0, 'H04 filas iguales 2x2')
    ok(det2(a, b, 0, d) == a*d == det2(a, 0, c, d), 'H04 triangular 2x2')
    for k in (-2, 0, 3):
        ok(det2(k*a, k*b, c, d) == k*D == det2(a, b, k*c, k*d), 'H04 factor 2x2'); ok(det2(a, b, k*a, k*b) == 0, 'H04 proporcionales 2x2')
        ok(det2(a + k*c, b + k*d, c, d) == D == det2(a, b, c + k*a, d + k*b), 'H04 sumar múltiplo 2x2'); ok(det2(k*a, k*b, k*c, k*d) == k*k*D, 'H04 kA 2x2')
    for a2, b2 in ((1, -2), (3, 2)): ok(det2(a + a2, b + b2, c, d) == D + det2(a2, b2, c, d), 'H04 suma en una fila 2x2')
# H04 · tercer orden (rejilla submuestreada): intercambios, factor, suma, múltiplo, triangular, kA; también por columnas
def tr(M): return [list(r) for r in zip(*M)]
for m in G3:
    a, b, c, d, e, f, g, h, i = m; M = [[a, b, c], [d, e, f], [g, h, i]]; D = det3(M)
    ok(d*b*i + e*c*g + f*a*h - f*b*g - d*c*h - e*a*i == -D == det3([M[1], M[0], M[2]]), 'H04 intercambio filas 1 y 2')
    ok(det3([M[2], M[1], M[0]]) == -D == det3([M[0], M[2], M[1]]), 'H04 intercambio otras filas')
    ok(det3([M[0], M[0], M[2]]) == 0 == det3([M[0], M[1], M[1]]) == det3([M[0], M[1], M[0]]), 'H04 filas iguales')
    ok(det3([[a, b, c], [0, e, f], [0, 0, i]]) == a*e*i == det3([[a, 0, 0], [d, e, 0], [g, h, i]]), 'H04 triangular')
    for k in (-2, 3):
        for r in range(3):
            N_ = [row[:] for row in M]; N_[r] = [k*x for x in N_[r]]; ok(det3(N_) == k*D, 'H04 factor de una fila')
            for r2 in range(3):
                if r2 == r: continue
                N_ = [row[:] for row in M]; N_[r] = [x + k*y for x, y in zip(M[r], M[r2])]; ok(det3(N_) == D, 'H04 sumar múltiplo')
                N_ = [row[:] for row in M]; N_[r] = [k*y for y in M[r2]]; ok(det3(N_) == 0, 'H04 proporcionales')
        ok(det3([[k*x for x in row] for row in M]) == k**3*D, 'H04 kA')
    N_ = [row[:] for row in M]; N_[1] = [x + y for x, y in zip(M[1], (1, -2, 3))]; ok(det3(N_) == D + det3([M[0], [1, -2, 3], M[2]]), 'H04 suma en una fila')
    T_ = tr(M); ok(det3(T_) == D, 'H05 traspuesta 3x3'); ok(det3(tr([T_[1], T_[0], T_[2]])) == -D, 'H04 intercambio de columnas')
    ok(a*e*i + d*h*c + g*b*f - c*e*g - f*h*a - i*b*d == D, 'H05 seis productos de la traspuesta')
# H04 · ejemplos y ejercicios
E1 = [[1, 2, 3], [2, 5, 8], [3, 8, 14]]
ok([x - 2*y for x, y in zip(E1[1], E1[0])] == [0, 1, 2] and [x - 3*y for x, y in zip(E1[2], E1[0])] == [0, 2, 5] and [0 - 0, 2 - 2*1, 5 - 2*2] == [0, 0, 1] and det3(E1) == 1, 'H04 ej1')
E2 = [[6, 9, 12], [1, 2, 3], [2, 1, 5]]
ok(det3(E2) == 15 == 3*det3([[2, 3, 4], [1, 2, 3], [2, 1, 5]]) == -3*det3([[1, 2, 3], [2, 3, 4], [2, 1, 5]]), 'H04 ej2')
ok([2 - 2, 3 - 4, 4 - 6] == [0, -1, -2] and [2 - 2, 1 - 4, 5 - 6] == [0, -3, -1] and [0, -3 + 3, -1 + 6] == [0, 0, 5] and -3*(1*(-1)*5) == 15, 'H04 ej2 pasos')
ok(det3([[2, -1, 3], [4, -2, 6], [7, 0, 1]]) == 0 and det3([[1, 2, 3], [4, 5, 6], [5, 7, 9]]) == 0 and [5 - 1, 7 - 2, 9 - 3] == [4, 5, 6], 'H04 ej3')
ok(2*(-1)*5 == -10 and 2**3*5 == 40, 'H04 ej4')
EA = [[1, 3, 2], [2, 7, 5], [-1, -2, 1]]
ok(det3(EA) == 2 and [2 - 2, 7 - 6, 5 - 4] == [0, 1, 1] and [-1 + 1, -2 + 3, 1 + 2] == [0, 1, 3] and [0, 0, 3 - 1] == [0, 0, 2], 'H04 A')
ok(-1*(-4)*5 == 20 and 3**3*(-4) == -108, 'H04 B')
ok(det2(8, 3, 2, 6) == 42 and det2(40, 15, 10, 30) == 1050 == 25*42 and 1200 - 150 == 1050, 'H04 C')
# H04 · escenas
ok(det2(2, 1, 1, 2) == 3 and det2(1, 2, 2, 1) == -3 and det2(4, 1, 2, 2) == 6 and det2(2, 3, 1, 3) == 3 and det2(2, 1, 1, Fr(1, 2)) == 0, 'H04 escena prop-idea')
for k in (Fr(-1), Fr(0), Fr(3, 2)):
    for t in (Fr(-1), Fr(0), Fr(1, 2), Fr(1)): ok(det2(2*k, 1 + 2*t, k, 2 + t) == 3*k, 'H04 escena prop-vivo')
ok(Fr(2 - Fr(8, 5), 1 - Fr(1, 5)) == Fr(1, 2) == Fr(Fr(19, 5) - 2, Fr(23, 5) - 1) and Fr(2 - 0, 1 + 3) == Fr(1, 2) == Fr(4 - 2, 5 - 1), 'H04 rectas paralelas a u por v')
# H05 · traspuesta
for a, b, c, d in itertools.product(R, repeat=4): ok(det2(a, c, b, d) == det2(a, b, c, d), 'H05 traspuesta 2x2')
ok(det2(3, 5, 2, 4) == 2 == det2(3, 2, 5, 4), 'H05 ej1')
chk([[1, 0, 1], [2, 4, 0], [3, 5, 6]], (24, 0, 10), (12, 0, 0), 22, 'H05 ej2'); ok(tr([[1, 2, 3], [0, 4, 5], [1, 0, 6]]) == [[1, 0, 1], [2, 4, 0], [3, 5, 6]], 'H05 ej2 traspuesta')
chk([[1, 2, 2], [3, 1, 6], [2, 5, 4]], (4, 24, 30), (4, 30, 24), 0, 'H05 ej3'); ok(tr([[1, 2, 2], [3, 1, 6], [2, 5, 4]]) == [[1, 3, 2], [2, 1, 5], [2, 6, 4]], 'H05 ej3 traspuesta')
AS = [[0, 2, -1], [-2, 0, 3], [1, -3, 0]]
chk(AS, (0, 6, -6), (0, 0, 0), 0, 'H05 ej4'); ok(tr(AS) == [[-x for x in row] for row in AS], 'H05 ej4 antisimétrica')
for m in itertools.product(range(-2, 3), repeat=3):
    p, q, r_ = m; ok(det3([[0, p, q], [-p, 0, r_], [-q, -r_, 0]]) == 0, 'H05 ej4 general')
EA5 = [[1, 0, 2], [3, 1, 0], [0, 2, 1]]
chk(EA5, (1, 0, 12), (0, 0, 0), 13, 'H05 A'); chk([[1, 3, 0], [0, 1, 2], [2, 0, 1]], (1, 12, 0), (0, 0, 0), 13, 'H05 A traspuesta'); ok(tr(EA5) == [[1, 3, 0], [0, 1, 2], [2, 0, 1]], 'H05 A matriz traspuesta')
ok(2**3*7 == 56, 'H05 B')
ok(det2(30, 20, 10, 25) == 550 == det2(30, 10, 20, 25) and 11*10000 == 110000 and Fr(110000, 550) == 200, 'H05 C')
for b in (Fr(0), Fr(1), Fr(2), Fr(4), Fr(5)): ok(det2(2, b, 1, 2) == 4 - b == det2(2, 1, b, 2), 'H05 escena trasp-vivo')
# H06 · |AB| = |A| |B|
def mul(A, B): return [[sum(A[r][t]*B[t][c_] for t in range(len(B))) for c_ in range(len(B[0]))] for r in range(len(A))]
def d2(M): return det2(M[0][0], M[0][1], M[1][0], M[1][1])
for a, b, c, d in itertools.product(R, repeat=4):
    for e, f, g, h in itertools.product(range(-2, 3), repeat=4):
        ok((a*e + b*g)*(c*f + d*h) == a*c*e*f + a*d*e*h + b*c*f*g + b*d*g*h, 'H06 primer producto')
        ok((a*f + b*h)*(c*e + d*g) == a*c*e*f + a*d*f*g + b*c*e*h + b*d*g*h, 'H06 segundo producto')
        ok(d2(mul([[a, b], [c, d]], [[e, f], [g, h]])) == a*d*e*h + b*c*f*g - a*d*f*g - b*c*e*h == a*d*(e*h - f*g) - b*c*(e*h - f*g) == (a*d - b*c)*(e*h - f*g), 'H06 demostración 2x2')
import random
random.seed(28)
for _ in range(4000):
    A_ = [[random.randint(-4, 4) for _ in range(3)] for _ in range(3)]; B_ = [[random.randint(-4, 4) for _ in range(3)] for _ in range(3)]
    ok(det3(mul(A_, B_)) == det3(A_)*det3(B_) == det3(mul(B_, A_)), 'H06 tercer orden (muestra aleatoria de enteros)')
A6 = [[1, 2], [3, 4]]; B6 = [[2, 0], [1, 3]]
ok(mul(A6, B6) == [[4, 6], [10, 12]] and d2(mul(A6, B6)) == -12 == 48 - 60 and d2(A6) == -2 and d2(B6) == 6, 'H06 ej1')
ok(mul(B6, A6) == [[2, 4], [10, 14]] and d2(mul(B6, A6)) == -12 == 28 - 40, 'H06 ej2')
A63 = [[1, 2, 3], [0, 4, 5], [1, 0, 6]]; B63 = [[2, 5, -1], [0, 3, 4], [0, 0, -2]]
ok(mul(A63, B63) == [[2, 11, 1], [0, 12, 6], [2, 5, -13]] and det3(A63) == 22 and det3(B63) == -12 and 22*(-12) == -264, 'H06 ej3')
chk([[2, 11, 1], [0, 12, 6], [2, 5, -13]], (-312, 132, 0), (24, 60, 0), -264, 'H06 ej3 Sarrus'); ok(-312 + 132 == -180 and 24 + 60 == 84, 'H06 ej3 sumas')
A64 = [[3, 5], [2, 4]]; C64 = [[2, Fr(-5, 2)], [-1, Fr(3, 2)]]
ok(d2(A64) == 2 and mul(A64, C64) == [[1, 0], [0, 1]] and d2(C64) == Fr(1, 2) == 3 - Fr(5, 2) and d2(mul(mul(A64, A64), A64)) == 8, 'H06 ej4')
ok(d2([[2, 0], [0, 2]]) == 4 and 1 + 1 == 2, 'H06 error frecuente')
ok(mul([[2, 1], [1, 3]], [[1, -1], [2, 4]]) == [[4, 2], [7, 11]] and 44 - 14 == 30 and d2([[2, 1], [1, 3]]) == 5 and d2([[1, -1], [2, 4]]) == 6, 'H06 A')
ok(3*(-2) == -6 and 9*(-2) == -18 and 8*(-6) == -48, 'H06 B')
B6c = [[4, 0], [0, 3]]; A6c = [[1, Fr(1, 2)], [0, 1]]; M6c = [[2, 0], [0, 2]]
ok(d2(B6c) == 12 and d2(A6c) == 1 and d2(M6c) == 4 and mul(A6c, B6c) == [[4, Fr(3, 2)], [0, 3]] and mul(M6c, mul(A6c, B6c)) == [[8, 3], [0, 6]] and 8*6 - 3*0 == 48 and 50*48 == 2400 and Fr(2400, 10000) == Fr(24, 100), 'H06 C')
Ai = [[1, -1], [1, 1]]; Bi = [[2, 1], [0, 1]]
ok(mul(Ai, Bi) == [[2, 0], [2, 2]] and d2(Ai) == 2 and d2(Bi) == 2 and d2(mul(Ai, Bi)) == 4, 'H06 escena prod-idea')
for k in (Fr(-1), Fr(0), Fr(1), Fr(3, 2), Fr(2)): ok(mul([[1, 1], [0, k]], Bi) == [[2, 2], [0, k]] and d2([[2, 2], [0, k]]) == 2*k == d2([[1, 1], [0, k]])*d2(Bi), 'H06 escena prod-vivo')
# H07 · filas i y columnas j
def arma(f, n): return [[f(i, j) for j in range(1, n + 1)] for i in range(1, n + 1)]
M7 = [[2, -1, 0], [3, 1, -2], [-1, 4, 5]]
ok(M7[0][1] == -1 and M7[1][0] == 3 and M7[1][2] == -2 and M7[2][1] == 4 and M7[2] == [-1, 4, 5] and [r[1] for r in M7] == [-1, 1, 4] and M7[2][0] == -1, 'H07 ej1')
ok([(-1)**(1 + j) for j in (1, 2, 3)] == [1, -1, 1] and (-1)**(1 + 2) == -1 and (-1)**(2 + 3) == -1 and (-1)**(3 + 1) == 1, 'H07 signos de posición')
ok(arma(lambda i, j: i + 2*j, 2) == [[3, 5], [4, 6]] and 18 - 20 == -2 == d2([[3, 5], [4, 6]]), 'H07 ej2')
M73 = arma(lambda i, j: i*j, 3)
ok(M73 == [[1, 2, 3], [2, 4, 6], [3, 6, 9]] and [M73[t][t] for t in range(3)] == [1, 4, 9] and [M73[0][2], M73[1][1], M73[2][0]] == [3, 4, 3] and det3(M73) == 0, 'H07 ej3')
M74 = arma(lambda i, j: i + j if i <= j else 0, 3)
ok(M74 == [[2, 3, 4], [0, 4, 5], [0, 0, 6]] and det3(M74) == 48 == 2*4*6, 'H07 ej4')
for m in G3:
    a, b, c, d, e, f, g, h, i = m
    ok(det3([[a, b, c], [d, e, f], [g, h, i]]) == a*(e*i - f*h) - b*(d*i - f*g) + c*(d*h - e*g), 'H07 desarrollo con subíndices')
M7a = [[4, 0, -3], [1, 7, 2], [5, -6, 8]]
ok(M7a[0][2] == -3 and M7a[2][0] == 5 and M7a[1][1] == 7 and [r[2] for r in M7a] == [-3, 2, 8] and 4 + 7 + 8 == 19 and (-3)*7*5 == -105, 'H07 A')
chk(arma(lambda i, j: 2*i - j, 3), (6, 0, -12), (-10, 4, 0), 0, 'H07 B'); ok(arma(lambda i, j: 2*i - j, 3) == [[1, 0, -1], [3, 2, 1], [5, 4, 3]], 'H07 B matriz')
M7c = arma(lambda i, j: 3*(i - 1) + j, 3)
ok(M7c == [[1, 2, 3], [4, 5, 6], [7, 8, 9]] and M7c[1][2] == 6 and M7c[2][1] == 8 and sum(M7c[2]) == 24 and sum(r[0] for r in M7c) == 12 and 1 + 5 + 9 == 15, 'H07 C')
chk(M7c, (45, 84, 96), (105, 48, 72), 0, 'H07 C Sarrus'); ok(45 + 84 + 96 == 225 == 105 + 48 + 72, 'H07 C sumas')
# H08 · regla de Cramer
def cr2(a, b, c, d, e, f):
    D = det2(a, b, c, d); Dx = det2(e, b, f, d); Dy = det2(a, e, c, f); return D, Dx, Dy
for a, b, c, d in itertools.product(R, repeat=4):
    for e, f in itertools.product(range(-2, 3), repeat=2):
        D, Dx, Dy = cr2(a, b, c, d, e, f)
        ok(Dx == e*d - b*f and Dy == a*f - e*c, 'H08 fórmulas')
        ok(a*Dx + b*Dy == e*D and c*Dx + d*Dy == f*D, 'H08 la solución cumple las dos ecuaciones')
        ok(a*e*d - a*b*f + a*b*f - b*e*c == e*(a*d - b*c) and c*e*d - b*c*f + a*d*f - c*e*d == f*(a*d - b*c), 'H08 desarrollo de la comprobación')
        if D != 0:
            for x in range(-2, 3):
                for y in range(-2, 3):
                    if a*x + b*y == e and c*x + d*y == f: ok(Fr(Dx, D) == x and Fr(Dy, D) == y, 'H08 unicidad')
ok(cr2(2, 1, 1, 3, 5, 5) == (5, 10, 5) and 2*2 + 1 == 5 and 2 + 3*1 == 5, 'H08 ej1 y escena cramer-idea')
ok(cr2(3, -2, 5, 4, 4, 3) == (22, 22, -11) and Fr(-11, 22) == Fr(-1, 2) and 3*1 - 2*Fr(-1, 2) == 4 and 5*1 + 4*Fr(-1, 2) == 3, 'H08 ej2')
K = [[1, 1, 1], [2, -1, 1], [1, 2, -1]]; kb = [6, 3, 2]
def cam(M, col, v): return [[v[r] if q == col else M[r][q] for q in range(3)] for r in range(3)]
chk(K, (1, 1, 4), (-1, 2, -2), 7, 'H08 ej3 delta'); chk(cam(K, 0, kb), (6, 2, 6), (-2, 12, -3), 7, 'H08 ej3 delta x')
chk(cam(K, 1, kb), (-3, 6, 4), (3, 2, -12), 14, 'H08 ej3 delta y'); chk(cam(K, 2, kb), (-2, 3, 24), (-6, 6, 4), 21, 'H08 ej3 delta z')
ok(cam(K, 0, kb) == [[6, 1, 1], [3, -1, 1], [2, 2, -1]] and cam(K, 1, kb) == [[1, 6, 1], [2, 3, 1], [1, 2, -1]] and cam(K, 2, kb) == [[1, 1, 6], [2, -1, 3], [1, 2, 2]], 'H08 ej3 matrices')
ok(all(sum(K[r][q]*(1, 2, 3)[q] for q in range(3)) == kb[r] for r in range(3)), 'H08 ej3 comprobación')
for _ in range(3000):  # regla de tercer orden: muestra aleatoria de sistemas con solución entera conocida
    M_ = [[random.randint(-4, 4) for _ in range(3)] for _ in range(3)]; s_ = [random.randint(-5, 5) for _ in range(3)]
    t_ = [sum(M_[r][q]*s_[q] for q in range(3)) for r in range(3)]; D = det3(M_)
    for q in range(3): ok(det3(cam(M_, q, t_)) == D*s_[q], 'H08 Cramer de tercer orden')
ok(cr2(2, 1, 4, 2, 5, 7)[0] == 0 and 2*5 == 10 != 7, 'H08 ej4')
ok(cr2(4, 3, 2, -1, 10, 0) == (-10, -10, -20) and 4*1 + 3*2 == 10 and 2*1 - 2 == 0, 'H08 A')
for k in (Fr(-3), Fr(0), Fr(1, 2), Fr(2), Fr(5)):
    D, Dx, Dy = cr2(k, 1, 1, k, 1, 1); ok(D == k*k - 1 == (k - 1)*(k + 1) and Dx == k - 1 == Dy and Dx/D == 1/(k + 1) and k/(k + 1) + 1/(k + 1) == 1, 'H08 B')
ok(cr2(1, 1, 1, 1, 1, 1)[0] == 0 and cr2(-1, 1, 1, -1, 1, 1)[0] == 0, 'H08 B raíces')
ok(cr2(3, 2, 2, 5, 5400, 6900) == (11, 13200, 9900) and 27000 - 13800 == 13200 and 20700 - 10800 == 9900 and Fr(13200, 11) == 1200 and Fr(9900, 11) == 900 and 3*1200 + 2*900 == 5400 and 2*1200 + 5*900 == 6900, 'H08 C')
for m in (Fr(3), Fr(2), Fr(1), Fr(3, 4), Fr(11, 20)):
    D, Dx, Dy = cr2(2, 1, 1, m, 5, 5); ok(D == 2*m - 1 and Dx == 5*m - 5 and Dy == 5 and 2*Dx/D + Dy/D == 5 and Dx/D + m*Dy/D == 5, 'H08 escena cramer-vivo')
ok(cr2(2, 1, 1, Fr(1, 2), 5, 5)[0] == 0 and cr2(2, 1, 1, 3, 5, 5) == (5, 10, 5), 'H08 escena cramer-vivo extremos')
print('Lote 28 H01–H08: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
