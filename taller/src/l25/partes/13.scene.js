/* L25 H13 · criterio del enésimo término: si Sₙ → S, el salto aₙ = Sₙ − Sₙ₋₁ entre sumas parciales seguidas tiende a cero */
OA.scene('net-idea', (function(){
  var N = 5, NP = 6, SV = [], i, t = 1, acc = 0;
  for (i = 0; i < NP; i++){ acc += t; SV.push(acc); t *= 2/3; } /* 1, 5/3, 19/9, 65/27, 211/81, 665/243 */
  var PZ = [['LS', 'S=3', 'S = 3', 'c-tan'], ['J2', 'a_{2}', 'a₂', 'diff'], ['J3', 'a_{3}', 'a₃', 'diff'], ['J4', 'a_{4}', 'a₄', 'diff'],
    ['Q', '\\text{Si la serie converge, ¿qué pasa con }a_{n}\\text{?}', 'Si la serie converge, ¿qué pasa con aₙ?', 'pt'],
    ['F', '\\sum a_{n}\\ \\text{converge}\\ \\Longrightarrow\\ \\lim_{n\\to\\infty}a_{n}=0', 'si la serie converge, el límite de aₙ es 0', 'diff'],
    ['R1', '\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{(la serie converge)}', 'el límite de Sₙ es 3 (la serie converge)', ''],
    ['R2', 'a_{n}=S_{n}-S_{n-1}\\quad(n\\ge 2)', 'aₙ = Sₙ − Sₙ₋₁ (n ≥ 2)', ''],
    ['R3', '\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{y}\\quad\\lim_{n\\to\\infty}S_{n-1}=3', 'el límite de Sₙ es 3 y el de Sₙ₋₁ también es 3', ''],
    ['R4', '\\lim_{n\\to\\infty}a_{n}=3-3=0', 'el límite de aₙ es 3 − 3 = 0', ''],
    ['R5', '\\lim_{n\\to\\infty}a_{n}\\neq 0\\ \\text{o no existe}\\ \\Longrightarrow\\ \\sum a_{n}\\ \\text{diverge}', 'si el límite de aₙ no es 0 o no existe, la serie diverge', 'diff']];
  var TXT = [['Las sumas parciales de una serie que converge', 'se acercan a un número: aquí, a 3.'],
    ['Cada término es un salto: lo que sube la', 'suma parcial de un punto al siguiente.'],
    ['La suma parcial y la anterior se acercan', 'las dos al mismo número.'],
    ['Entonces el salto entre ellas se achica:', 'bajados al eje, los saltos tienden a cero.'],
    ['Si la serie converge, sus términos tienden a', 'cero. Si no tienden a cero, la serie diverge.']];
  function gx(n){ return -0.6 + 0.8*n; } function gy(y){ return 1.05 + 0.82*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con una gráfica de las seis primeras sumas parciales de una serie que converge a 3. Uno: aparecen los puntos, cada uno con una línea punteada hasta el eje vertical, y una recta horizontal punteada a la altura 3; los puntos suben y se acercan a ella. Dos: entre cada punto y el siguiente se marca en naranja el salto vertical; ese salto es un término de la serie, la resta de dos sumas parciales seguidas. Tres: trazos verticales burdeo muestran lo que le falta a cada suma parcial para llegar a 3; se achican. Cuatro: los saltos naranjas bajan hasta el eje horizontal y quedan como barras cada vez más bajas: los términos tienden a cero. Cinco: una curva punteada pasa por los extremos de las barras y se pega al eje; conclusión: si la serie converge, sus términos tienden a cero, y si no tienden a cero, la serie diverge. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> las sumas parciales \\(S_{n}\\)</span><span><i class="sw rise"></i> los saltos: \\(a_{n}=S_{n}-S_{n-1}\\)</span><span><i class="sw tan"></i> la suma \\(S=3\\) y lo que le falta a cada \\(S_{n}\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:34000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, a, b, d, x, e;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function seg(x0, y0, x1, y1, col, wd, dash, al){ c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      /* ejes */
      S.line(gx(0), gy(0), gx(6.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(3.3), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (i = 1; i <= 3; i++){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(i))); c.lineTo(X(gx(0)) + 3, Y(gy(i))); c.stroke(); num('' + i, X(gx(0)) - 7, Y(gy(i)), 'right'); }
      num('n', X(gx(6.6)) + 6, Y(gy(0)), 'left'); num('Sₙ', X(gx(0)) + 6, Y(gy(3.3)) - 3, 'left');
      /* la suma de la serie */
      w = k === 1 ? u : 1; seg(gx(0), gy(3), gx(6.6*w), gy(3), C.tan, 1.2, [5, 4]); if (w > 0.9) L('LS', gx(6.6) + 0.06, gy(3), 0);
      /* puntos: sumas parciales, con su punteada al eje vertical */
      for (i = 1; i <= NP; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*NP - (i - 1))) : 1; if (w <= 0) continue;
        seg(gx(i), gy(0), gx(i), gy(SV[i - 1]*w), 'rgba(31,93,134,0.3)', 1);
        if (w >= 1){ seg(gx(i), gy(SV[i - 1]), gx(0), gy(SV[i - 1]), C.sec, 0.9, [3, 3], 0.45); c.beginPath(); c.arc(X(gx(0)), Y(gy(SV[i - 1])), 2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
        c.beginPath(); c.arc(X(gx(i)), Y(gy(SV[i - 1]*w)), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      /* paso 3 en adelante: lo que le falta a cada suma parcial para llegar a 3 (se desvanece en el paso 5) */
      if (k >= 3){ w = k === 3 ? u : 1; e = k === 5 ? 1 - 0.75*u : 1; for (i = 1; i <= NP; i++) seg(gx(i) + 0.07, gy(3), gx(i) + 0.07, gy(3 - (3 - SV[i - 1])*w), C.tan, 1.6, null, e); }
      /* paso 2 en adelante: saltos entre sumas parciales seguidas; en el paso 4 bajan al eje */
      if (k >= 2) for (i = 2; i <= NP; i++){ w = k === 2 ? u : 1; a = SV[i - 2]; b = SV[i - 1]; d = k === 4 ? u : (k === 5 ? 1 : 0);
        seg(gx(i - 1), gy(a), gx(i - 1) + 0.8*Math.min(1, w*2), gy(a), C.rise, 0.9, [3, 3], 0.8);
        if (w > 0.5){ e = (w - 0.5)*2; seg(gx(i), gy(a), gx(i), gy(a + (b - a)*e), C.rise, 2.4, null, d > 0 ? 0.3 : 1);
          if (d > 0) seg(gx(i) - 0.07, gy(a*(1 - d)), gx(i) - 0.07, gy(a*(1 - d) + (b - a)), C.rise, 3.2); }
        if (i <= 4 && w > 0.8) L('J' + i, gx(i) - (d > 0 ? 0.07 : 0), gy((a + b)/2 - a*d), -100, -5, 0); }
      /* paso 5: curva punteada por los extremos de las barras, que se pega al eje */
      if (k === 5){ c.strokeStyle = C.rise; c.lineWidth = 1.1; c.setLineDash([2, 3]); c.beginPath(); for (i = 0; i <= 60; i++){ x = 2 + (6.6 - 2)*u*i/60; if (i) c.lineTo(X(gx(x) - 0.07), Y(gy(Math.pow(2/3, x - 1)))); else c.moveTo(X(gx(x) - 0.07), Y(gy(Math.pow(2/3, x - 1)))); } c.stroke(); c.setLineDash([]); }
      if (k < N || u < 0.5) L('Q', -1.2, 4.42, 0); else L('F', -1.2, 4.4, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.98));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['\\lim_{n\\to\\infty}S_{n}=3', 'a_{n}=S_{n}-S_{n-1}\\quad(n\\ge 2)', '\\lim_{n\\to\\infty}S_{n}=\\lim_{n\\to\\infty}S_{n-1}=3', '\\lim_{n\\to\\infty}a_{n}=3-3=0', '\\lim_{n\\to\\infty}a_{n}\\neq 0\\ \\text{o no existe}\\ \\Longrightarrow\\ \\sum_{n=1}^{\\infty}a_{n}\\ \\text{diverge}'][k - 1]]]; }
  };
})());
