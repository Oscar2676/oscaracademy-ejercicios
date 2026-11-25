/* L29 H06 · aproximar límites a partir de tablas: con f(x) = (x³ − 1)/(x − 1) se construye la tabla alrededor de x = 1, se miden las distancias a 3 y el álgebra confirma (por pasos) */
/* número exacto n/10^d en TeX (coma decimal, sin ceros de relleno); lm06T, el mismo como texto del lienzo */
function lm06N(n, d){ var s = String(Math.abs(n)); while (s.length <= d) s = '0' + s; if (d){ s = s.slice(0, s.length - d) + '{,}' + s.slice(s.length - d); s = s.replace(/0+$/, '').replace(/\{,\}$/, ''); } return (n < 0 ? '-' : '') + s; }
function lm06T(n, d){ return lm06N(n, d).replace('{,}', ',').replace('-', '−'); }
/* una fila de la tabla, con enteros: x = n/10^k; todo sale exacto (n³ no pasa de 1003003001) */
function lm06Fila(e){ var n = e[0], k = e[1], D = Math.pow(10, k), n2 = n*n, n3 = n2*n, v = n2 + n*D + D*D;
  return { x:lm06N(n, k), x2:lm06N(n2, 2*k), x3:lm06N(n3, 3*k), num:lm06N(n3 - D*D*D, 3*k), den:lm06N(n - D, k), f:lm06N(v, 2*k), d:lm06N(Math.abs(v - 3*D*D), 2*k),
    tx:lm06T(n, k), tf:lm06T(v, 2*k), td:lm06T(Math.abs(v - 3*D*D), 2*k), val:v/(D*D) }; }
OA.scene('tab-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  /* x = 1 − 0,1; 1 − 0,01; 1 − 0,001 (izquierda) y x = 1 + 0,1; 1 + 0,01; 1 + 0,001 (derecha), como [numerador, cantidad de decimales] */
  var IZ = [[9, 1], [99, 2], [999, 3]].map(lm06Fila), DE = [[11, 1], [101, 2], [1001, 3]].map(lm06Fila);
  var PZ = [['Q', '\\lim_{x\\to 1}\\tfrac{x^{3}-1}{x-1}:\\ \\ ?', 'lím (x³ − 1)/(x − 1) cuando x → 1: ?', 'pt'], ['F', '\\approx 3\\ \\ (\\text{álgebra: }=3)', '≈ 3 (álgebra: = 3)', 'diff'],
    ['HX', 'x', 'x', ''], ['HF', 'f(x)=\\tfrac{x^{3}-1}{x-1}', 'f(x) = (x³ − 1)/(x − 1)', ''], ['HD', '|f(x)-3|', '|f(x) − 3|', 'c-alt'],
    ['AL', 'x\\ne 1:\\ \\ f(x)=x^{2}+x+1\\ \\to\\ 1^{2}+1+1=3', 'x ≠ 1: f(x) = x² + x + 1 → 1² + 1 + 1 = 3', 'c-alt'],
    ['R1', 'x:\\ \\ ' + IZ.map(function(r){ return r.x; }).join(';\\ ') + '\\ \\ \\text{y}\\ \\ ' + DE.map(function(r){ return r.x; }).join(';\\ '), 'x: 0,9; 0,99; 0,999 y 1,1; 1,01; 1,001', ''],
    ['R2', '\\text{izquierda: }f(x)\\text{ vale }' + IZ.map(function(r){ return r.f; }).join(';\\ '), 'izquierda: f(x) vale 2,71; 2,9701; 2,997001', 'c-sec'],
    ['R3', '\\text{derecha: }f(x)\\text{ vale }' + DE.map(function(r){ return r.f; }).join(';\\ '), 'derecha: f(x) vale 3,31; 3,0301; 3,003001', 'diff'],
    ['R4', '|f(x)-3|\\ \\text{baja a }' + IZ[2].d + '\\ \\text{ y a }\\ ' + DE[2].d, '|f(x) − 3| baja a 0,002999 y a 0,003001', 'c-alt'],
    ['R5', '\\text{la tabla sugiere: }\\lim_{x\\to 1}f(x)\\approx 3', 'la tabla sugiere: lím f(x) ≈ 3', ''],
    ['R6', 'x\\ne 1:\\ f(x)=x^{2}+x+1;\\ \\ \\lim_{x\\to 1}f(x)=1+1+1=3', 'x ≠ 1: f(x) = x² + x + 1; lím f(x) = 1 + 1 + 1 = 3', 'diff']];
  /* geometría de la tabla (unidades del mundo): filas de arriba abajo = 0,9; 0,99; 0,999; 1; 1,001; 1,01; 1,1 */
  var YH = 4.12, YR = [3.72, 3.36, 3.0, 2.64, 2.28, 1.92, 1.56], CX = [0.42, 1.97, 4.12], BX = [-0.13, 0.95, 3.0, 5.22];
  /* recta numérica de los valores de f(x): el valor w se dibuja en GX(w) */
  var YA = 0.2; function GX(w){ return 2 + (w - 3)*7.6; }
  var TXT = [['Se eligen x cerca de 1 por los dos lados, cada', 'vez 10 veces más cerca. Nunca se usa x = 1.'],
    ['Por la izquierda se calcula la función en cada', 'fila. Los valores suben: 2,71; 2,9701; 2,997001.'],
    ['Por la derecha se calcula igual. Los resultados', 'bajan: 3,31; 3,0301; 3,003001.'],
    ['Candidato: 3. La distancia a 3 se achica unas', '10 veces en cada fila, por los dos lados.'],
    ['La tabla sugiere que el límite es cerca de 3.', 'Es una estimación: la tabla no demuestra.'],
    ['El álgebra confirma: fuera de 1 la función es', 'un polinomio que se acerca a 3. El límite es 3.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.9, y1:6.0}, aspect:11.9/6.6,
    aria:'Arriba, una franja dice qué muestra: una tabla construida con la fórmula aproxima el límite y el álgebra lo confirma. Animación en seis pasos con la función f de x igual a x al cubo menos 1, dividido por x menos 1, cerca de x igual a 1. Uno: se arma la columna de x con 0,9; 0,99; 0,999 por la izquierda y 1,1; 1,01; 1,001 por la derecha; la fila de x igual a 1 no se calcula. Dos: se llenan los valores de la izquierda: 2,71; 2,9701; 2,997001, y aparecen como puntos azules en una recta numérica. Tres: los de la derecha: 3,31; 3,0301; 3,003001, puntos naranjas. Cuatro: el candidato es 3; se llena la columna de distancias a 3: 0,29; 0,0299; 0,002999 y 0,31; 0,0301; 0,003001. Cinco: la tabla sugiere que el límite es aproximadamente 3; es una estimación. Seis: el álgebra confirma: para x distinto de 1 la función vale x al cuadrado más x más 1, que se acerca a 3. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> valores con \\(x\\lt 1\\) (izquierda)</span><span><i class="sw rise"></i> valores con \\(x\\gt 1\\) (derecha)</span><span><i class="sw alt"></i> candidato \\(3\\) y distancias a \\(3\\)</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif', p = 1/(X(1) - X(0)), j, a, yy;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function sq(a, i, n){ return Math.max(0, Math.min(1, a*n - i)); } /* dentro de un paso, las filas aparecen una tras otra */
      function frase(t, xw, yw, col, al, a, tam){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.font = '600 ' + (tam || 11.5) + 'px ' + F; c.fillStyle = col; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, X(xw), Y(yw)); c.globalAlpha = 1; }
      function num(t, xw, yw, col, a, al, tam){ frase(t, xw, yw, col, al, a, tam || 12.5); }
      function raya(xa, ya, xb, yb, col, w, dash, a){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(xa), Y(ya)); c.lineTo(X(xb), Y(yb)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      function punto(w, col, a){ if (a <= 0) return; c.globalAlpha = Math.min(1, a); c.fillStyle = col; c.beginPath(); c.arc(X(GX(w)), Y(YA), 3, 0, 6.2832); c.fill(); c.globalAlpha = 1; }
      dtQue(S, 'una tabla construida con la fórmula', 'aproxima el límite; el álgebra lo confirma.');
      /* paso 1: la tabla (encabezados de x y de f(x)) y la columna de x; la fila de x = 1 no se calcula */
      a = ap(1);
      c.globalAlpha = 0.07*Math.min(1, a*3); c.fillStyle = C.ink; c.fillRect(X(-1.25), Y(YR[3] + 0.18), X(BX[3]) - X(-1.25), Y(YR[3] - 0.18) - Y(YR[3] + 0.18)); c.globalAlpha = 1;
      raya(-1.25, YH - 0.22, BX[3], YH - 0.22, C.ink, 1, null, a*3); raya(-1.25, YR[6] - 0.2, BX[3], YR[6] - 0.2, C.ink, 1, null, a*3);
      for (j = 0; j < 3; j++) raya(BX[j], YH + 0.2, BX[j], YR[6] - 0.2, C.grid || 'rgba(0,0,0,0.15)', 1, null, a*3);
      if (a > 0.05){ T.L('HX', CX[0], YH, -50); T.L('HF', CX[1], YH, -50); }
      raya(-1.22, YR[0] + 0.15, -1.22, YR[2] - 0.15, C.sec, 3, null, a*3); raya(-1.22, YR[4] + 0.15, -1.22, YR[6] - 0.15, C.rise, 3, null, a*3);
      frase('izquierda', -1.13, YR[1], C.sec, 'left', a*3); frase('derecha', -1.13, YR[5], C.rise, 'left', a*3);
      for (j = 0; j < 3; j++){ num(IZ[j].tx, CX[0], YR[j], C.sec, sq(a, j, 3.4)); num(DE[j].tx, CX[0], YR[6 - j], C.rise, sq(a, j, 3.4)); }
      num('1', CX[0], YR[3], mu, sq(a, 2.4, 3.4)); frase('no se calcula', CX[1], YR[3], mu, 'center', sq(a, 2.4, 3.4));
      /* pasos 2 y 3: la columna de f(x), por la izquierda y por la derecha; cada valor es también un punto de la recta numérica */
      a = ap(2);
      raya(GX(2.62), YA, GX(3.38), YA, C.ink, 1, null, a*3);
      if (a > 0) for (j = 27; j <= 33; j++){ raya(GX(j/10), YA + 3*p, GX(j/10), YA - 3*p, C.ink, 1, null, a*3); num(lm06T(j, 1), GX(j/10), YA - 11*p, mu, a*3, 'center', 10.5); }
      for (j = 0; j < 3; j++){ num(IZ[j].tf, CX[1], YR[j], C.sec, sq(a, j, 3.2)); punto(IZ[j].val, C.sec, sq(a, j, 3.2)); }
      num(IZ[0].tf, GX(IZ[0].val), YA + 12*p, C.sec, sq(a, 0, 3.2), 'center', 10.5); num(IZ[1].tf, GX(IZ[1].val) + 0.06, YA + 12*p, C.sec, sq(a, 1, 3.2), 'right', 10.5);
      a = ap(3);
      for (j = 0; j < 3; j++){ num(DE[j].tf, CX[1], YR[6 - j], C.rise, sq(a, j, 3.2)); punto(DE[j].val, C.rise, sq(a, j, 3.2)); }
      num(DE[0].tf, GX(DE[0].val), YA + 12*p, C.rise, sq(a, 0, 3.2), 'center', 10.5); num(DE[1].tf, GX(DE[1].val) - 0.06, YA + 12*p, C.rise, sq(a, 1, 3.2), 'left', 10.5);
      /* paso 4: el candidato 3 y la columna de distancias a 3; en la recta, las dos primeras distancias */
      a = ap(4);
      if (a > 0.05) T.L('HD', CX[2], YH, -50);
      raya(GX(3), YA - 3*p, GX(3), YA + 36*p, C.alt, 1.4, [3, 3], a*3); frase('candidato: 3', GX(3), YA + 44*p, C.alt, 'center', a*3);
      raya(GX(IZ[0].val), YA + 27*p, GX(3) - 2*p, YA + 27*p, C.sec, 1.6, null, sq(a, 0, 3.2)); num(IZ[0].td, (GX(IZ[0].val) + GX(3))/2, YA + 36*p, C.sec, sq(a, 0, 3.2), 'center', 10.5);
      raya(GX(3) + 2*p, YA + 27*p, GX(DE[0].val), YA + 27*p, C.rise, 1.6, null, sq(a, 0, 3.2)); num(DE[0].td, (GX(DE[0].val) + GX(3))/2, YA + 36*p, C.rise, sq(a, 0, 3.2), 'center', 10.5);
      for (j = 0; j < 3; j++){ num(IZ[j].td, CX[2], YR[j], C.alt, sq(a, j, 3.2)); num(DE[j].td, CX[2], YR[6 - j], C.alt, sq(a, j, 3.2)); }
      /* paso 5: lo que la tabla permite informar */
      frase('la tabla sugiere: el límite es cerca de 3', 2, YA - 31*p, C.alt, 'center', ap(5), 12);
      /* paso 6: la confirmación con álgebra */
      yy = YA - 53*p; if (ap(6) > 0.3) T.L('AL', 2, yy, -50);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.66, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.66, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, YA - 78*p); lmTxt(S, TXT[k - 1][1], -1.2, YA - 99*p);
      yy = YA - 148*p;
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(yy) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, yy, [0, 31, 62, 93, 124, 155]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1);
      function cuenta(r){ return 'x=' + r.x + ':\\ \\ ' + r.x + '^{2}=' + r.x2 + Q + r.x + '^{3}=' + r.x2 + '\\cdot ' + r.x + '=' + r.x3 + Q + 'f(' + r.x + ')=\\tfrac{' + r.x3 + '-1}{' + r.x + '-1}=\\tfrac{' + r.num + '}{' + r.den + '}=' + r.f; }
      function dist(L){ return '|' + L[0].f + '-3|=' + L[0].d + ';\\ \\ |' + L[1].f + '-3|=' + L[1].d + Q + '|' + L[2].f + '-3|=' + L[2].d; }
      var R = [
        'f(x)=\\tfrac{x^{3}-1}{x-1};\\quad a=1' + Q + '\\text{en }x=1:\\ \\ 1^{3}-1=0\\ \\text{ y }\\ 1-1=0\\ \\text{ (no se calcula)}' + Q + 'x<1:\\ \\ 1-0{,}1=0{,}9;\\ \\ 1-0{,}01=0{,}99;\\ \\ 1-0{,}001=0{,}999' + Q + 'x>1:\\ \\ 1+0{,}1=1{,}1;\\ \\ 1+0{,}01=1{,}01;\\ \\ 1+0{,}001=1{,}001',
        '\\text{izquierda, fila por fila:}' + Q + IZ.map(cuenta).join(Q),
        '\\text{derecha, fila por fila:}' + Q + DE.map(cuenta).join(Q),
        '\\text{candidato: }3;\\ \\text{distancia de cada valor a }3' + Q + 'x<1:\\ \\ ' + dist(IZ) + Q + 'x>1:\\ \\ ' + dist(DE) + Q + '\\text{cada distancia: unas 10 veces menor que la anterior}',
        '\\text{la tabla sugiere: }\\lim_{x\\to 1}f(x)\\approx 3' + Q + '\\text{es una estimación: seis valores no demuestran}',
        '\\text{se multiplica: }(x-1)(x^{2}+x+1)' + Q + '=x^{3}+x^{2}+x-x^{2}-x-1=x^{3}-1' + Q + 'x\\ne 1:\\ \\ f(x)=\\tfrac{(x-1)(x^{2}+x+1)}{x-1}=x^{2}+x+1' + Q + 'x\\to 1:\\ \\ 1^{2}+1+1=3' + Q + '\\lim_{x\\to 1}f(x)=3\\ \\ \\text{(la tabla acertó)}']; return dtPasos(R.slice(0, k)); }
  };
})());
