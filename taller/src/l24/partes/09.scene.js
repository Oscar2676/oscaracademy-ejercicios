/* L24 H09 · número de términos de (a+b)^n: se cuentan los términos para n = 1, 2, 3, 4 (un casillero por término), sale la regularidad n + 1, el porqué (k va de 0 a n) y el término central */
OA.scene('bn-terminos', (function(){
  var N = 7, X0 = 1.55, DXC = 1.4, BW = 1.18, BH = 0.62, YR = [-3.85, -4.9, -5.95, -7.0], YP = -3.05, YK = -7.95, XN = 8.2, XE = 8.55;
  var TT = [['a', 'b'], ['a^{2}', '2ab', 'b^{2}'], ['a^{3}', '3a^{2}b', '3ab^{2}', 'b^{3}'], ['a^{4}', '4a^{3}b', '6a^{2}b^{2}', '4ab^{3}', 'b^{4}']];
  var TF = [['a', 'b'], ['a²', '2ab', 'b²'], ['a³', '3a²b', '3ab²', 'b³'], ['a⁴', '4a³b', '6a²b²', '4ab³', 'b⁴']];
  var PZ = [['Q', '\\text{¿cuántos términos tiene }(a+b)^{n}\\text{?}', '¿cuántos términos tiene (a + b)ⁿ?', 'pt'], ['F', '\\Longrightarrow\\ n+1', '⟹ n + 1', 'diff'],
    ['R1', '\\text{para }n=1:\\ \\ a+b\\ \\ \\to\\ \\ 2\\text{ términos}', 'para n = 1: a + b → 2 términos', ''],
    ['R2', '\\text{para }n=2:\\ \\ a^{2}+2ab+b^{2}\\ \\ \\to\\ \\ 3\\text{ términos}', 'para n = 2: a² + 2ab + b² → 3 términos', ''],
    ['R3', '\\text{para }n=3:\\ \\ a^{3}+3a^{2}b+3ab^{2}+b^{3}\\ \\ \\to\\ \\ 4\\text{ términos}', 'para n = 3: a³ + 3a²b + 3ab² + b³ → 4 términos', ''],
    ['R4', '\\begin{aligned}&\\text{para }n=4:\\ \\ a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}\\\\ &\\qquad\\to\\ \\ 5\\text{ términos}\\end{aligned}', 'para n = 4: a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴ → 5 términos', ''],
    ['R5', '\\begin{aligned}&2=1+1,\\quad 3=2+1,\\quad 4=3+1,\\quad 5=4+1\\\\ &\\text{para }n=n:\\ \\ \\text{número de términos}=n+1\\end{aligned}', '2 = 1 + 1, 3 = 2 + 1, 4 = 3 + 1, 5 = 4 + 1; para n = n: número de términos = n + 1', 'diff'],
    ['R6', '\\begin{aligned}&\\text{un término por cada }k=0,\\ 1,\\ 2,\\ \\dots,\\ n\\\\ &\\text{posición}=k+1;\\ \\ \\text{la última: }n+1\\end{aligned}', 'un término por cada k = 0, 1, 2, …, n; posición = k + 1; la última: n + 1', 'c-sec'],
    ['R7', '\\begin{aligned}&n=4\\text{ (par): un central, el }3^{\\circ},\\ k=2\\\\ &n=3\\text{ (impar): dos, }2^{\\circ}\\text{ y }3^{\\circ}\\ (k=1,\\ 2)\\end{aligned}', 'n = 4 (par): un central, el 3º, k = 2; n = 3 (impar): dos centrales, 2º y 3º, k = 1 y k = 2', 'c-tan']];
  var TXT = [['Con exponente 1 no hay nada que multiplicar.', 'Se cuentan los términos, uno por casillero: 2.'],
    ['Con exponente 2 sale el cuadrado del binomio.', 'Se cuentan sus términos: 3.'],
    ['Con exponente 3 sale el cubo del binomio.', 'Se cuentan sus términos: 4.'],
    ['Con exponente 4 se cuentan 5 términos.', 'Cada fila tiene un casillero más que la anterior.'],
    ['Regularidad: en cada fila, el número de', 'términos es el exponente más 1.'],
    ['Por qué: hay un término por cada exponente de b.', 'Ese exponente parte en 0: por eso hay uno más.'],
    ['Exponente par: queda un término justo al medio.', 'Exponente impar: quedan dos términos al medio.']];
  (function(){ var n, k;
    for (n = 1; n <= 4; n++){ PZ.push(['E' + n, 'n=' + n, 'n = ' + n, '']); PZ.push(['C' + n, '' + (n + 1), '' + (n + 1), 'c-tan']); PZ.push(['S' + n, '=' + n + '+1', '= ' + n + ' + 1', 'diff']);
      for (k = 0; k <= n; k++) PZ.push(['T' + n + k, TT[n - 1][k], TF[n - 1][k], '']); }
    for (k = 0; k <= 4; k++){ PZ.push(['K' + k, 'k=' + k, 'k = ' + k, 'c-sec']); PZ.push(['O' + k, (k + 1) + '^{\\circ}', (k + 1) + 'º', '']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-17.7, y1:0}, aspect:17.7/10,
    aria:'Animación en siete pasos. Uno: a más b elevado a 1 es a más b; cada término va en un casillero y se cuentan 2. Dos: a más b al cuadrado es a al cuadrado más 2 a b más b al cuadrado; se cuentan 3 términos. Tres: a más b al cubo tiene 4 términos. Cuatro: a más b a la cuarta tiene 5 términos. Cinco: la regularidad: 2 es 1 más 1, 3 es 2 más 1, 4 es 3 más 1, 5 es 4 más 1; el número de términos es el exponente más 1. Seis: el porqué: bajo las columnas se escribe el exponente de b, k igual a 0, 1, 2, 3, 4, y sobre ellas la posición, primero, segundo, tercero, cuarto, quinto; la posición es k más 1. Siete: el término central: con n igual a 4 hay uno, el tercero; con n igual a 3 hay dos, el segundo y el tercero. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(k\\): el exponente de \\(b\\) en cada columna</span><span><i class="sw rise"></i> la regularidad: exponente más 1</span><span><i class="sw tan"></i> cuántos términos tiene la fila; término central</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var n, j, a, pr, y, xc, cen, a7 = ap(7), a6 = ap(6);
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      function col(j){ return X0 + DXC*j; }
      /* paso 6 (va al fondo): columnas punteadas que unen la posición (arriba) con el valor de k (abajo) */
      if (a6 > 0){ c.strokeStyle = 'rgba(31,93,134,0.28)'; c.lineWidth = 1; c.setLineDash([2, 3]);
        for (j = 0; j <= 4; j++){ pr = cl(a6*5 - j*0.8); if (pr <= 0) continue; c.beginPath(); c.moveTo(X(col(j)), Y(YK + 0.22)); c.lineTo(X(col(j)), Y(YK + 0.22 + (YP - 0.22 - YK - 0.22)*pr)); c.stroke(); } c.setLineDash([]); }
      /* pasos 1 a 4: una fila por exponente; un casillero por término; a la derecha, cuántos son */
      tx('cuántos términos', 9.75, -2.5, 'right', C.tan, 10.5, ap(1), '700');
      for (n = 1; n <= 4; n++){ a = ap(n); if (a <= 0) continue; y = YR[n - 1];
        if (a > 0.15) L('E' + n, 0.47, y);
        for (j = 0; j <= n; j++){ pr = cl(a*(n + 2.2) - j); if (pr <= 0) continue; xc = col(j);
          cen = (n === 4 && j === 2) || (n === 3 && (j === 1 || j === 2));
          c.fillStyle = '#fff'; c.fillRect(X(xc - BW/2), Y(y + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(y - BH/2) - Y(y + BH/2));
          if (cen && a7 > 0){ c.globalAlpha = 0.2*a7; c.fillStyle = C.tan; c.fillRect(X(xc - BW/2), Y(y + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(y - BH/2) - Y(y + BH/2)); c.globalAlpha = 1; }
          c.globalAlpha = pr; c.strokeStyle = cen && a7 > 0.5 ? C.tan : 'rgba(31,93,134,0.6)'; c.lineWidth = cen && a7 > 0.5 ? 1.8 : 1.1; c.strokeRect(X(xc - BW/2), Y(y + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(y - BH/2) - Y(y + BH/2)); c.globalAlpha = 1;
          if (j > 0) tx('+', xc - DXC/2, y, 'center', C.ink, 11.5, pr);
          if (pr > 0.5) L('T' + n + j, xc, y);
          if (cen && a7 > 0) tx('al medio', xc, y - 0.5, 'center', C.tan, 9.5, a7, '700'); }
        pr = cl(a*(n + 2.2) - (n + 1));
        if (pr > 0){ c.strokeStyle = C.tan; c.lineWidth = 1.2; c.beginPath(); c.arc(X(XN), Y(y), 9.5, -1.5708, -1.5708 + 6.2832*pr); c.stroke(); if (pr > 0.5) L('C' + n, XN, y); } }
      /* paso 5: la regularidad, fila por fila: cuántos = exponente + 1 */
      a = ap(5);
      for (n = 1; n <= 4; n++){ pr = cl(a*4 - (n - 1)*0.8); if (pr > 0.4) L('S' + n, XE, YR[n - 1], 0); }
      /* paso 6: arriba la posición de cada columna; abajo el exponente de b (k), que parte en 0 */
      if (a6 > 0){ tx('← posición', 8.0, YP, 'left', C.ink, 10.5, a6, '700'); tx('← exponente de b', 9.75, YK - 0.5, 'right', C.sec, 10.5, a6, '700');
        for (j = 0; j <= 4; j++){ pr = cl(a6*5 - j*0.8); if (pr > 0.3) L('K' + j, col(j), YK); if (pr > 0.75) L('O' + j, col(j), YP); } }
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.3, -1.95, 0); if (ap(5) > 0.6) L('F', 7.0, -1.95, 0);
      /* frase del paso y número de paso */
      tx(TXT[k - 1][0], 0.3, -9.45, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-9.45) + 19);
      tx('paso ' + k + ' de ' + N, 0.3, -8.85, 'left', MU, 11, 1);
      dtQue(S, 'se cuentan los términos de (a + b)ⁿ:', 'siempre hay uno más que el exponente n.');
      T.fin();
      oaReg(S, k, N, 0.3, -11.4, [0, 24, 48, 78, 112, 148, 186]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{exponente }n=1:\\quad (a+b)^{1}=a+b\\\\&\\qquad\\text{términos: }a,\\ b\\quad\\to\\quad 2\\text{ términos}',
      '\\text{exponente }n=2:\\quad (a+b)^{2}=a^{2}+2ab+b^{2}\\\\&\\qquad\\text{términos: }a^{2},\\ 2ab,\\ b^{2}\\quad\\to\\quad 3\\text{ términos}',
      '\\text{exponente }n=3:\\quad (a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}\\\\&\\qquad\\text{términos: }a^{3},\\ 3a^{2}b,\\ 3ab^{2},\\ b^{3}\\quad\\to\\quad 4\\text{ términos}',
      '\\text{exponente }n=4:\\\\&\\qquad (a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}\\\\&\\qquad\\text{términos: }a^{4},\\ 4a^{3}b,\\ 6a^{2}b^{2},\\ 4ab^{3},\\ b^{4}\\quad\\to\\quad 5\\text{ términos}',
      '\\text{regularidad (términos = exponente + 1):}\\\\&\\qquad n=1:\\ 2=1+1\\qquad n=2:\\ 3=2+1\\\\&\\qquad n=3:\\ 4=3+1\\qquad n=4:\\ 5=4+1\\\\&\\qquad\\text{para }n=n:\\quad\\text{número de términos}=n+1',
      '\\text{por qué: en cada término, }k\\text{ es el exponente de }b\\\\&\\qquad\\text{fila }n=4:\\ k=0,\\ 1,\\ 2,\\ 3,\\ 4\\ \\text{(de 1 a 4 hay 4; con el 0, 5)}\\\\&\\qquad\\text{posición}=k+1:\\ \\ 0+1=1,\\ 1+1=2,\\ \\dots,\\ 4+1=5\\\\&\\qquad\\text{en general: }k=0,\\ 1,\\ \\dots,\\ n\\ \\to\\ n+1\\text{ términos}',
      '\\text{término central:}\\\\&\\qquad n=4\\text{ (par): }5\\text{ términos}=2+1+2\\\\&\\qquad\\quad\\text{uno al medio: el }3^{\\circ},\\ \\ k=3-1=2=\\tfrac{4}{2}\\\\&\\qquad n=3\\text{ (impar): }4\\text{ términos}=2+2\\\\&\\qquad\\quad\\text{dos al medio: }2^{\\circ}\\text{ y }3^{\\circ},\\ \\ k=1\\text{ y }k=2']; return dtPasos(R.slice(0, k)); }
  };
})());
