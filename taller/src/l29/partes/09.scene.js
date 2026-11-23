/* L29 H09 · usar tablas para aproximar límites: con f(x) = (√x − 2)/(x − 4) la tabla alrededor de x = 4 lleva raíces redondeadas a 6 decimales; se declara el margen de error de cada valor y racionalizar confirma (por pasos) */
/* número exacto n/10^d en TeX (coma decimal, sin ceros de relleno); lm09T, el mismo como texto del lienzo */
function lm09N(n, d){ var s = String(Math.abs(n)); while (s.length <= d) s = '0' + s; if (d){ s = s.slice(0, s.length - d) + '{,}' + s.slice(s.length - d); s = s.replace(/0+$/, '').replace(/\{,\}$/, ''); } return (n < 0 ? '-' : '') + s; }
function lm09T(n, d){ return lm09N(n, d).replace('{,}', ',').replace('-', '−'); }
/* una fila de la tabla, con enteros: x = n/10^k; r = raíz de x redondeada a 6 decimales, en millonésimas (dato; lo comprueba el verificador por encierro) */
function lm09Fila(e){ var n = e[0], k = e[1], r = e[2], D = Math.pow(10, k), num = r - 2000000, den = n - 4*D, V = num*den*D;
  return { x:lm09N(n, k), r:lm09N(r, 6), num:lm09N(num, 6), den:lm09N(den, k), f:lm09N(V, 6), mg:lm09N(5*D, 7), lo:lm09N(V*10 - 5*D, 7), hi:lm09N(V*10 + 5*D, 7), d:lm09N(Math.abs(V - 250000), 6),
    tx:lm09T(n, k), tr:lm09T(r, 6), tf:lm09T(V, 6), tm:lm09T(5*D, 7), val:V/1000000, m:5*D/10000000 }; }
OA.scene('usa-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  /* x = 4 − 0,1; 4 − 0,01; 4 − 0,001 (izquierda) y x = 4 + 0,1; 4 + 0,01; 4 + 0,001 (derecha), como [numerador de x, decimales de x, raíz en millonésimas] */
  var IZ = [[39, 1, 1974842], [399, 2, 1997498], [3999, 3, 1999750]].map(lm09Fila), DE = [[41, 1, 2024846], [401, 2, 2002498], [4001, 3, 2000250]].map(lm09Fila);
  function lista(L, c){ return L.map(function(r){ return r[c]; }).join(';\\ '); }
  var PZ = [['Q', '\\lim_{x\\to 4}\\tfrac{\\sqrt{x}-2}{x-4}:\\ \\ ?', 'lím (√x − 2)/(x − 4) cuando x → 4: ?', 'pt'], ['F', '\\approx 0{,}25\\ \\ (\\text{álgebra: }=0{,}25)', '≈ 0,25 (álgebra: = 0,25)', 'diff'],
    ['HX', 'x', 'x', ''], ['HR', '\\sqrt{x}\\approx', '√x ≈', ''], ['HF', 'f(x)\\approx', 'f(x) ≈', ''],
    ['AL', 'x\\ne 4:\\ \\ f(x)=\\tfrac{1}{\\sqrt{x}+2}\\ \\to\\ \\tfrac{1}{2+2}=0{,}25', 'x ≠ 4: f(x) = 1/(√x + 2) → 1/(2 + 2) = 0,25', 'c-alt'],
    ['R1', 'x:\\ \\ ' + lista(IZ, 'x') + '\\ \\ \\text{y}\\ \\ ' + lista(DE, 'x'), 'x: 3,9; 3,99; 3,999 y 4,1; 4,01; 4,001', ''],
    ['R2', '\\text{raíces a 6 decimales; error}\\le 0{,}0000005', 'raíces a 6 decimales; error ≤ 0,0000005', ''],
    ['R3', '\\text{izquierda: }f(x)\\approx ' + lista(IZ, 'f'), 'izquierda: f(x) ≈ 0,25158; 0,2502; 0,25', 'c-sec'],
    ['R4', '\\text{derecha: }f(x)\\approx ' + lista(DE, 'f'), 'derecha: f(x) ≈ 0,24846; 0,2498; 0,25', 'diff'],
    ['R5', '\\text{márgenes: }' + lista(IZ, 'mg'), 'márgenes: 0,000005; 0,00005; 0,0005', ''],
    ['R6', '\\text{la tabla sugiere: }\\lim_{x\\to 4}f(x)\\approx 0{,}25', 'la tabla sugiere: lím f(x) ≈ 0,25', 'c-alt'],
    ['R7', 'x\\ne 4:\\ f(x)=\\tfrac{1}{\\sqrt{x}+2};\\ \\ \\lim_{x\\to 4}f(x)=\\tfrac{1}{4}=0{,}25', 'x ≠ 4: f(x) = 1/(√x + 2); lím f(x) = 1/4 = 0,25', 'diff']];
  /* geometría de la tabla (unidades del mundo): filas de arriba abajo = 3,9; 3,99; 3,999; 4; 4,001; 4,01; 4,1 */
  var YH = 4.12, YR = [3.72, 3.36, 3.0, 2.64, 2.28, 1.92, 1.56], CX = [0.41, 1.7, 3.02, 4.41], BX = [-0.13, 0.95, 2.45, 3.6, 5.22];
  /* recta numérica de los valores de f(x): el valor w se dibuja en GX(w) */
  var YA = 0.2; function GX(w){ return 2 + (w - 0.25)*1400; }
  var TXT = [['Se eligen x cerca de 4 por los dos lados, cada', 'vez 10 veces más cerca. Nunca se usa x = 4.'],
    ['Cada raíz se redondea a 6 decimales. Es un valor', 'aproximado: su error no pasa de 0,0000005.'],
    ['Izquierda: a cada raíz se le resta 2 y se divide', 'por el denominador: 0,25158; 0,2502; 0,25.'],
    ['Derecha: la misma cuenta, fila por fila.', 'Resultan 0,24846; 0,2498; 0,25.'],
    ['Dividir por un número chico agranda el error de', 'la raíz: el margen crece 10 veces en cada fila.'],
    ['Los dos lados apuntan a 0,25. La tabla sugiere', 'ese candidato: es una estimación.'],
    ['Racionalizar confirma: fuera de 4 la función', 'tiene una forma simple que se acerca a 0,25.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.75, y1:6.0}, aspect:12.75/6.6,
    aria:'Arriba, una franja dice qué muestra: con raíces redondeadas, una tabla aproxima el límite si se declara el margen de error. Animación en siete pasos con la función f de x igual a raíz de x menos 2, dividido por x menos 4, cerca de x igual a 4. Uno: se arma la columna de x con 3,9; 3,99; 3,999 por la izquierda y 4,1; 4,01; 4,001 por la derecha; la fila de x igual a 4 no se calcula. Dos: la columna de las raíces, redondeadas a seis decimales: 1,974842; 1,997498; 1,99975 y 2,00025; 2,002498; 2,024846. Tres: los valores aproximados de la izquierda: 0,25158; 0,2502; 0,25, que aparecen como puntos azules en una recta numérica. Cuatro: los de la derecha: 0,24846; 0,2498; 0,25, puntos naranjas. Cinco: el margen de error de cada valor: 0,000005; 0,00005; 0,0005; en la recta, un trazo muestra dónde puede estar el valor real de las filas más cercanas a 4. Seis: el candidato es 0,25; la tabla sugiere que el límite es aproximadamente 0,25. Siete: racionalizar confirma: para x distinto de 4 la función vale 1 dividido por raíz de x más 2, que se acerca a un cuarto, 0,25. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> valores con \\(x\\lt 4\\) (izquierda)</span><span><i class="sw rise"></i> valores con \\(x\\gt 4\\) (derecha)</span><span><i class="sw alt"></i> candidato \\(0{,}25\\) y confirmación</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif', p = 1/(X(1) - X(0)), j, a, yy;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function sq(a, i, n){ return Math.max(0, Math.min(1, a*n - i)); } /* dentro de un paso, las filas aparecen una tras otra */
      function frase(t, xw, yw, col, al, a, tam){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.font = '600 ' + (tam || 11.5) + 'px ' + F; c.fillStyle = col; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, X(xw), Y(yw)); c.globalAlpha = 1; }
      function num(t, xw, yw, col, a, al, tam){ frase(t, xw, yw, col, al, a, tam || 12.5); }
      function raya(xa, ya, xb, yb, col, w, dash, a){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(xa), Y(ya)); c.lineTo(X(xb), Y(yb)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      function punto(w, yw, col, a){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.beginPath(); c.arc(X(GX(w)), Y(yw), 3, 0, 6.2832); c.fill(); c.globalAlpha = 1; }
      /* margen de un valor: trazo de w − m a w + m con topes, a la altura yw */
      function barra(r, yw, col, a){ if (a <= 0) return; raya(GX(r.val - r.m), yw, GX(r.val + r.m), yw, col, 1.4, null, a); if (r.m*1400 < 6*p) return; /* trazo muy corto: sin topes */ raya(GX(r.val - r.m), yw + 4*p, GX(r.val - r.m), yw - 4*p, col, 1.4, null, a); raya(GX(r.val + r.m), yw + 4*p, GX(r.val + r.m), yw - 4*p, col, 1.4, null, a); }
      var YI = YA + 9*p, YD = YA + 21*p; /* alturas de los puntos: izquierda (azul) y derecha (naranja) */
      dtQue(S, 'con raíces redondeadas, una tabla aproxima', 'el límite si se declara el margen de error.');
      /* paso 1: la tabla (encabezado de x) y la columna de x; la fila de x = 4 no se calcula; la recta numérica vacía */
      a = ap(1);
      c.globalAlpha = 0.07*Math.min(1, a*3); c.fillStyle = C.ink; c.fillRect(X(-1.25), Y(YR[3] + 0.18), X(BX[4]) - X(-1.25), Y(YR[3] - 0.18) - Y(YR[3] + 0.18)); c.globalAlpha = 1;
      raya(-1.25, YH - 0.22, BX[4], YH - 0.22, C.ink, 1, null, a*3); raya(-1.25, YR[6] - 0.2, BX[4], YR[6] - 0.2, C.ink, 1, null, a*3);
      for (j = 0; j < 4; j++) raya(BX[j], YH + 0.2, BX[j], YR[6] - 0.2, C.grid || 'rgba(0,0,0,0.15)', 1, null, a*3);
      if (a > 0.05) T.L('HX', CX[0], YH, -50);
      raya(-1.22, YR[0] + 0.15, -1.22, YR[2] - 0.15, C.sec, 3, null, a*3); raya(-1.22, YR[4] + 0.15, -1.22, YR[6] - 0.15, C.rise, 3, null, a*3);
      frase('izquierda', -1.13, YR[1], C.sec, 'left', a*3); frase('derecha', -1.13, YR[5], C.rise, 'left', a*3);
      for (j = 0; j < 3; j++){ num(IZ[j].tx, CX[0], YR[j], C.sec, sq(a, j, 3.4)); num(DE[j].tx, CX[0], YR[6 - j], C.rise, sq(a, j, 3.4)); }
      num('4', CX[0], YR[3], mu, sq(a, 2.4, 3.4)); frase('no se calcula', CX[1], YR[3], mu, 'center', sq(a, 2.4, 3.4));
      raya(GX(0.2476), YA, GX(0.2524), YA, C.ink, 1, null, a*3);
      if (a > 0) for (j = 248; j <= 252; j++){ raya(GX(j/1000), YA + 3*p, GX(j/1000), YA - 3*p, C.ink, 1, null, a*3); num(lm09T(j, 3), GX(j/1000), YA - 11*p, mu, a*3, 'center', 10.5); }
      /* paso 2: la columna de las raíces, redondeadas a 6 decimales */
      a = ap(2);
      if (a > 0.05) T.L('HR', CX[1], YH, -50);
      for (j = 0; j < 3; j++){ num(IZ[j].tr, CX[1], YR[j], C.sec, sq(a, j, 3.2)); num(DE[j].tr, CX[1], YR[6 - j], C.rise, sq(a, j, 3.2)); }
      /* pasos 3 y 4: la columna de f(x), por la izquierda y por la derecha; cada valor es también un punto de la recta numérica */
      a = ap(3);
      if (a > 0.05) T.L('HF', CX[2], YH, -50);
      for (j = 0; j < 3; j++){ num(IZ[j].tf, CX[2], YR[j], C.sec, sq(a, j, 3.2)); punto(IZ[j].val, YI, C.sec, sq(a, j, 3.2)); }
      num(IZ[0].tf, GX(IZ[0].val), YD, C.sec, sq(a, 0, 3.2), 'center', 10.5);
      a = ap(4);
      for (j = 0; j < 3; j++){ num(DE[j].tf, CX[2], YR[6 - j], C.rise, sq(a, j, 3.2)); punto(DE[j].val, YD, C.rise, sq(a, j, 3.2)); }
      num(DE[0].tf, GX(DE[0].val), YA + 33*p, C.rise, sq(a, 0, 3.2), 'center', 10.5);
      /* paso 5: el margen de error de cada valor (columna) y, en la recta, el trazo donde puede estar el valor real */
      a = ap(5);
      frase('margen', CX[3], YH, C.ink, 'center', a*3, 12);
      for (j = 0; j < 3; j++){ num(IZ[j].tm, CX[3], YR[j], C.ink, sq(a, j, 3.2)); num(DE[j].tm, CX[3], YR[6 - j], C.ink, sq(a, j, 3.2)); barra(IZ[j], YI, C.sec, sq(a, j, 3.2)); barra(DE[j], YD, C.rise, sq(a, j, 3.2)); }
      frase('± 0,0005', GX(0.2505) + 0.12, (YI + YD)/2, mu, 'left', sq(a, 2, 3.2), 10.5);
      /* paso 6: el candidato y lo que la tabla permite informar */
      a = ap(6);
      raya(GX(0.25), YA - 3*p, GX(0.25), YA + 36*p, C.alt, 1.4, [3, 3], a*3); frase('candidato: 0,25', GX(0.25), YA + 44*p, C.alt, 'center', a*3);
      frase('la tabla sugiere: el límite es cerca de 0,25', 2, YA - 31*p, C.alt, 'center', a, 12);
      /* paso 7: la confirmación con álgebra (racionalizar) */
      yy = YA - 53*p; if (ap(7) > 0.3) T.L('AL', 2, yy, -50);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.66, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.66, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, YA - 78*p); lmTxt(S, TXT[k - 1][1], -1.2, YA - 99*p);
      yy = YA - 148*p;
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(yy) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, yy, [0, 31, 62, 93, 124, 155, 186]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1);
      function raices(L){ return '\\sqrt{' + L[0].x + '}\\approx ' + L[0].r + ';\\ \\ \\sqrt{' + L[1].x + '}\\approx ' + L[1].r + Q + '\\sqrt{' + L[2].x + '}\\approx ' + L[2].r; }
      function cuenta(r){ return 'x=' + r.x + ':\\ \\ ' + r.r + '-2=' + r.num + ';\\ \\ ' + r.x + '-4=' + r.den + Q + '\\tfrac{' + r.num + '}{' + r.den + '}=' + r.f + ';\\ \\ f(' + r.x + ')\\approx ' + r.f; }
      function margen(r){ return '\\tfrac{0{,}0000005}{' + r.den.replace('-', '') + '}=' + r.mg; }
      var R = [
        'f(x)=\\tfrac{\\sqrt{x}-2}{x-4};\\quad a=4' + Q + '\\text{en }x=4:\\ \\ \\sqrt{4}-2=0\\ \\text{ y }\\ 4-4=0\\ \\text{ (no se calcula)}' + Q + '\\text{lejos de 4, con raíz exacta, sí se calcula:}' + Q + 'f(0)=\\tfrac{\\sqrt{0}-2}{0-4}=\\tfrac{0-2}{-4}=\\tfrac{-2}{-4}=0{,}5' + Q + 'f(9)=\\tfrac{\\sqrt{9}-2}{9-4}=\\tfrac{3-2}{5}=\\tfrac{1}{5}=0{,}2' + Q + 'x<4:\\ \\ 4-0{,}1=3{,}9;\\ \\ 4-0{,}01=3{,}99;\\ \\ 4-0{,}001=3{,}999' + Q + 'x>4:\\ \\ 4+0{,}1=4{,}1;\\ \\ 4+0{,}01=4{,}01;\\ \\ 4+0{,}001=4{,}001',
        '\\text{raíces redondeadas a 6 decimales (aproximadas):}' + Q + raices(IZ) + Q + raices(DE) + Q + '\\text{error de cada raíz: a lo más }0{,}0000005',
        '\\text{izquierda, fila por fila (raíz − 2, dividido por }x-4\\text{):}' + Q + IZ.map(cuenta).join(Q),
        '\\text{derecha, fila por fila:}' + Q + DE.map(cuenta).join(Q),
        '\\text{margen de cada valor: error de la raíz}\\div|x-4|' + Q + margen(IZ[0]) + ';\\ \\ ' + margen(IZ[1]) + Q + margen(IZ[2]) + Q + '\\text{el valor real de }f(' + IZ[2].x + ')\\text{ está entre}' + Q + IZ[2].f + '-' + IZ[2].mg + '=' + IZ[2].lo + '\\ \\text{ y }\\ ' + IZ[2].f + '+' + IZ[2].mg + '=' + IZ[2].hi,
        '\\text{filas a }0{,}01\\text{ de }4:\\ \\ ' + IZ[1].f + '\\ \\text{ y }\\ ' + DE[1].f + Q + IZ[1].f + '-0{,}25=' + IZ[1].d + ';\\ \\ 0{,}25-' + DE[1].f + '=' + DE[1].d + Q + '\\text{la tabla sugiere: }\\lim_{x\\to 4}f(x)\\approx 0{,}25' + Q + '\\text{es una estimación: seis valores no demuestran}',
        '(\\sqrt{x}-2)(\\sqrt{x}+2)=(\\sqrt{x})^{2}-2^{2}=x-4' + Q + 'x\\ne 4:\\ \\ f(x)=\\tfrac{\\sqrt{x}-2}{(\\sqrt{x}-2)(\\sqrt{x}+2)}=\\tfrac{1}{\\sqrt{x}+2}' + Q + 'x\\to 4:\\ \\ \\sqrt{x}\\to 2;\\ \\ \\tfrac{1}{2+2}=\\tfrac{1}{4}=0{,}25' + Q + '\\lim_{x\\to 4}f(x)=0{,}25\\ \\ \\text{(la tabla acertó)}' + Q + '\\text{comprobación con la raíz exacta del paso 1:}' + Q + 'f(9)=\\tfrac{1}{\\sqrt{9}+2}=\\tfrac{1}{3+2}=\\tfrac{1}{5}=0{,}2']; return dtPasos(R.slice(0, k)); }
  };
})());
