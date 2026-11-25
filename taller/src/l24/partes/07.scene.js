/* L24 H07 · el desarrollo de (2x+3)⁴ armado en una tabla: un término por cada k; cada término = coeficiente · potencia de a · potencia de b; al final se suman */
OA.scene('bn-desarrollo', (function(){
  var N = 7, CX = [0.55, 2.05, 4.65, 7.0, 9.05], YH = -3.75, Y0 = -4.75, DY = 0.88;
  var CF = [1, 4, 6, 4, 1], PA = [16, 8, 4, 2, 1], PB = [1, 3, 9, 27, 81];
  function xp(e){ return e === 0 ? '' : e === 1 ? 'x' : 'x^{' + e + '}'; }
  function xs(e){ return e === 0 ? '' : e === 1 ? 'x' : 'x' + bnSup(e); }
  function mono(c, e, tex){ return (c === 1 && e > 0 ? '' : '' + c) + (tex ? xp(e) : xs(e)); }
  var PZ = [['Q', '(2x+3)^{4}=\\ ?', '(2x + 3)⁴ = ?', 'pt'],
    ['F', '\\Longrightarrow\\ \\ 16x^{4}+96x^{3}+216x^{2}+216x+81', '⟹ 16x⁴ + 96x³ + 216x² + 216x + 81', 'diff'],
    ['DA', 'a=2x', 'a = 2x', 'c-sec'], ['DB', 'b=3', 'b = 3', 'diff'], ['DN', 'n=4', 'n = 4', 'c-tan'], ['HK', 'k', 'k', ''],
    ['R1', 'a=2x,\\quad b=3,\\quad n=4\\quad\\text{(5 términos)}', 'a = 2x, b = 3, n = 4 (5 términos)', '']];
  (function(){ var k, e, t;
    for (k = 0; k <= 4; k++){ e = 4 - k; t = CF[k]*PA[k]*PB[k];
      PZ.push(['K' + k, '' + k, '' + k, '']);
      PZ.push(['C' + k, '\\tbinom{4}{' + k + '}=' + CF[k], 'C(4,' + k + ') = ' + CF[k], 'c-tan']);
      PZ.push(['A' + k, '(2x)^{' + e + '}=' + mono(PA[k], e, 1), '(2x)' + bnSup(e) + ' = ' + mono(PA[k], e, 0), 'c-sec']);
      PZ.push(['B' + k, '3^{' + k + '}=' + PB[k], '3' + bnSup(k) + ' = ' + PB[k], 'diff']);
      PZ.push(['T' + k, mono(t, e, 1), mono(t, e, 0), '']);
      PZ.push(['R' + (k + 2), 'k=' + k + ':\\quad ' + CF[k] + '\\cdot ' + mono(PA[k], e, 1) + '\\cdot ' + PB[k] + '=' + mono(t, e, 1), 'k = ' + k + ': ' + CF[k] + ' · ' + mono(PA[k], e, 0) + ' · ' + PB[k] + ' = ' + mono(t, e, 0), '']); }
    PZ.push(['R7', '\\begin{aligned}(2x+3)^{4}={}&16x^{4}+96x^{3}+216x^{2}\\\\ {}+{}&216x+81\\end{aligned}', '(2x + 3)⁴ = 16x⁴ + 96x³ + 216x² + 216x + 81', 'diff']); })();
  var TXT = [['Primero se identifican a, b y n.', 'La tabla tendrá una fila por cada valor de k.'],
    ['Fila k = 0: coeficiente por potencia de a', 'por potencia de b. El producto es el término.'],
    ['Fila k = 1: el exponente de a baja en 1', 'y el exponente de b sube en 1.'],
    ['Fila k = 2: la fila del medio.', 'Su coeficiente binomial, 6, es el mayor.'],
    ['Fila k = 3: el exponente de a ya va en 1', 'y el exponente de b va en 3.'],
    ['Fila k = 4: la última. Ya no queda x:', 'es el término sin letra.'],
    ['Se suman los cinco términos de la derecha.', 'Arriba queda escrito el desarrollo.']];
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-17.7, y1:0}, aspect:17.7/10,
    aria:'Animación en siete pasos que arma el desarrollo de 2x más 3, elevado a 4, en una tabla. Uno: se identifican a igual 2x, b igual 3 y n igual 4, y se ponen los títulos de las columnas: k, coeficiente, potencia de a, potencia de b y término. Dos: fila k igual 0: 4 sobre 0 es 1, 2x a la cuarta es 16 x a la cuarta, 3 a la cero es 1; el término es 16 x a la cuarta. Tres: fila k igual 1: 4 por 8 x al cubo por 3, igual 96 x al cubo. Cuatro: fila k igual 2: 6 por 4 x al cuadrado por 9, igual 216 x al cuadrado. Cinco: fila k igual 3: 4 por 2x por 27, igual 216 x. Seis: fila k igual 4: 1 por 1 por 81, igual 81. Siete: se suman los cinco términos: 16 x a la cuarta más 96 x al cubo más 216 x al cuadrado más 216 x más 81. Bajo la tabla, un registro numerado guarda la cuenta de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> coeficiente binomial</span><span><i class="sw sec"></i> potencia de \\(a=2x\\)</span><span><i class="sw rise"></i> potencia de \\(b=3\\)</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var i, a, y, p, HD = ['coeficiente', 'potencia de a', 'potencia de b', 'término'], HC = [C.tan, C.sec, C.rise, C.ink];
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; después queda */
      function tx(t, x, y, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function ry(r){ return Y0 - DY*r; }
      /* paso 7: la columna de los términos, destacada: es lo que se suma */
      a = ap(7);
      if (a > 0){ c.globalAlpha = 0.12*a; c.fillStyle = C.tan; c.fillRect(X(8.2), Y(ry(0) + DY/2), X(9.92) - X(8.2), (Y(ry(4) - DY/2) - Y(ry(0) + DY/2))*cl(a*1.6)); c.globalAlpha = 1; }
      /* paso 1: pregunta, datos a, b, n y títulos de las columnas */
      a = ap(1);
      L('Q', 0.3, -2.05, 0);
      if (cl(a*3) > 0.5) L('DA', 4.9, -2.05); if (cl(a*3 - 0.7) > 0.5) L('DB', 6.7, -2.05); if (cl(a*3 - 1.4) > 0.5) L('DN', 8.4, -2.05);
      p = cl(a*2 - 0.9);
      if (p > 0){ if (p > 0.5) L('HK', CX[0], YH);
        for (i = 0; i < 4; i++) tx(HD[i], CX[i + 1], YH, 'center', HC[i], 11, p, '700');
        c.globalAlpha = p; c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0.1), Y(YH - 0.42)); c.lineTo(X(0.1) + (X(9.92) - X(0.1))*p, Y(YH - 0.42)); c.stroke(); c.globalAlpha = 1; }
      /* pasos 2 a 6: una fila por paso; las celdas entran de izquierda a derecha y quedan */
      for (i = 0; i <= 4; i++){ a = ap(i + 2); if (a <= 0) continue; y = ry(i);
        if (a > 0.05) L('K' + i, CX[0], y);
        if (a > 0.2) L('C' + i, CX[1], y);
        tx('·', 3.1, y, 'center', MU, 14, cl(a*5 - 1.8), '700');
        if (a > 0.42) L('A' + i, CX[2], y);
        tx('·', 6.15, y, 'center', MU, 14, cl(a*5 - 2.8), '700');
        if (a > 0.62) L('B' + i, CX[3], y);
        tx('=', 8.0, y, 'center', MU, 13, cl(a*5 - 3.6), '700');
        if (a > 0.82) L('T' + i, CX[4], y);
        if (i > 0){ tx('+', 8.42, y, 'center', C.tan, 13, ap(7), '700'); }
        c.strokeStyle = 'rgba(0,0,0,0.10)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0.1), Y(y - DY/2)); c.lineTo(X(0.1) + (X(9.92) - X(0.1))*cl(a*1.5), Y(y - DY/2)); c.stroke(); }
      /* al completar la tabla: hacia dónde van los exponentes */
      a = ap(6);
      tx('exponente baja', CX[2] - 0.2, ry(4) - 0.72, 'center', C.sec, 10.5, cl(a*2 - 1), '600');
      tx('exponente sube', CX[3], ry(4) - 0.72, 'center', C.rise, 10.5, cl(a*2 - 1), '600');
      /* paso 7: la suma de los términos; el desarrollo se escribe bajo la pregunta */
      a = ap(7);
      tx('se suman', CX[4] - 0.05, ry(4) - 0.72, 'center', C.tan, 10.5, a, '700');
      if (a > 0.5) L('F', 0.3, -2.9, 0);
      /* frase del paso y número de paso */
      tx(TXT[k - 1][0], 0.3, ry(4) - 1.75, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(ry(4) - 1.75) + 19);
      tx('paso ' + k + ' de ' + N, 0.3, ry(4) - 0.72, 'left', MU, 11, 1);
      dtQue(S, 'un término por cada k, hecho de 3 piezas;', 'la suma de los términos es el desarrollo.');
      T.fin();
      oaReg(S, k, N, 0.3, -12.15, [0, 24, 48, 72, 96, 120, 152]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{datos: }a=2x,\\quad b=3,\\quad n=4\\\\&\\qquad\\text{fórmula: }(a+b)^{n}=\\sum_{k=0}^{n}\\binom{n}{k}a^{\\,n-k}\\,b^{\\,k}\\\\&\\qquad\\text{reemplazo: }(2x+3)^{4}=\\sum_{k=0}^{4}\\binom{4}{k}(2x)^{4-k}\\,3^{k}\\\\&\\qquad k=0,\\ 1,\\ 2,\\ 3,\\ 4:\\ \\text{cinco términos}',
      'k=0:\\quad\\binom{4}{0}=1\\\\&\\qquad (2x)^{4}=2^{4}x^{4}=16x^{4}\\\\&\\qquad 3^{0}=1\\\\&\\qquad 1\\cdot 16x^{4}\\cdot 1=16x^{4}',
      'k=1:\\quad\\binom{4}{1}=\\frac{4}{1}=4\\\\&\\qquad (2x)^{3}=2^{3}x^{3}=8x^{3}\\\\&\\qquad 3^{1}=3\\\\&\\qquad 4\\cdot 8=32,\\quad 32\\cdot 3=96\\\\&\\qquad 4\\cdot 8x^{3}\\cdot 3=96x^{3}',
      'k=2:\\quad\\binom{4}{2}=\\frac{4\\cdot 3}{2\\cdot 1}=\\frac{12}{2}=6\\\\&\\qquad (2x)^{2}=2^{2}x^{2}=4x^{2}\\\\&\\qquad 3^{2}=3\\cdot 3=9\\\\&\\qquad 6\\cdot 4=24,\\quad 24\\cdot 9=216\\\\&\\qquad 6\\cdot 4x^{2}\\cdot 9=216x^{2}',
      'k=3:\\quad\\binom{4}{3}=\\frac{4\\cdot 3\\cdot 2}{3\\cdot 2\\cdot 1}=\\frac{24}{6}=4\\\\&\\qquad (2x)^{1}=2x\\\\&\\qquad 3^{3}=9\\cdot 3=27\\\\&\\qquad 4\\cdot 2=8,\\quad 8\\cdot 27=216\\\\&\\qquad 4\\cdot 2x\\cdot 27=216x',
      'k=4:\\quad\\binom{4}{4}=1\\\\&\\qquad (2x)^{0}=1\\\\&\\qquad 3^{4}=27\\cdot 3=81\\\\&\\qquad 1\\cdot 1\\cdot 81=81',
      '\\text{suma de los cinco términos:}\\\\&\\qquad (2x+3)^{4}=16x^{4}+96x^{3}+216x^{2}+216x+81\\\\&\\qquad\\text{comprobación con }x=1:\\ (2\\cdot 1+3)^{4}=5^{4}=625\\\\&\\qquad 16+96=112,\\quad 112+216=328\\\\&\\qquad 328+216=544,\\quad 544+81=625\\ \\checkmark']; return dtPasos(R.slice(0, k)); }
  };
})());
