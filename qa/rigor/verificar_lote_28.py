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
print('Lote 28 H01–H05: sin errores' if not err else 'ERRORES: ' + '; '.join(sorted(set(err)))); sys.exit(1 if err else 0)
