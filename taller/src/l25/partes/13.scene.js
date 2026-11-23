/* L25 H13 · criterio del enésimo término: si Sₙ → S, el salto aₙ = Sₙ − Sₙ₋₁ entre sumas parciales seguidas tiende a cero */
OA.scene('net-idea', (function(){
  var N = 5, NP = 6, SV = [], i, t = 1, acc = 0;
  for (i = 0; i < NP; i++){ acc += t; SV.push(acc); t *= 2/3; } /* 1, 5/3, 19/9, 65/27, 211/81, 665/243 */
  var PZ = [['LS', 'S=3', 'S = 3', 'c-tan'], ['J2', 'a_{2}', 'a₂', 'diff'], ['J3', 'a_{3}', 'a₃', 'diff'], ['J4', 'a_{4}', 'a₄', 'diff'],
    ['P1', 'S_{1}', 'S₁', 'c-sec'], ['P2', 'S_{2}', 'S₂', 'c-sec'], ['P3', 'S_{3}', 'S₃', 'c-sec'], ['P4', 'S_{4}', 'S₄', 'c-sec'], ['P5', 'S_{5}', 'S₅', 'c-sec'], ['P6', 'S_{6}', 'S₆', 'c-sec'],
    ['B2', 'a_{2}', 'a₂', 'diff'], ['B3', 'a_{3}', 'a₃', 'diff'], ['B4', 'a_{4}', 'a₄', 'diff'], ['B5', 'a_{5}', 'a₅', 'diff'], ['B6', 'a_{6}', 'a₆', 'diff'],
    ['Q', '\\text{Si la serie converge, ¿qué pasa con }a_{n}\\text{?}', 'Si la serie converge, ¿qué pasa con aₙ?', 'pt'],
    ['F', '\\Longrightarrow\\ \\lim_{n\\to\\infty}a_{n}=0\\quad\\text{(los términos tienden a cero)}', '⟹ el límite de aₙ es 0 (los términos tienden a cero)', 'diff'],
    ['R1', '\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{(la serie converge)}', 'el límite de Sₙ es 3 (la serie converge)', ''],
    ['R2', 'a_{n}=S_{n}-S_{n-1}\\quad(n\\ge 2)', 'aₙ = Sₙ − Sₙ₋₁ (n ≥ 2)', ''],
    ['R3', '\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{y}\\quad\\lim_{n\\to\\infty}S_{n-1}=3', 'el límite de Sₙ es 3 y el de Sₙ₋₁ también es 3', ''],
    ['R4', '\\lim_{n\\to\\infty}a_{n}=3-3=0', 'el límite de aₙ es 3 − 3 = 0', ''],
    ['R5', '\\lim_{n\\to\\infty}a_{n}\\neq 0\\ \\text{o no existe}\\ \\Longrightarrow\\ \\sum a_{n}\\ \\text{diverge}', 'si el límite de aₙ no es 0 o no existe, la serie diverge', 'diff']];
  var TXT = [['Las sumas parciales de una serie que converge', 'se acercan a un número: aquí, a 3.'],
    ['Cada término es un salto: lo que sube la', 'suma parcial de un punto al siguiente.'],
    ['A cada suma parcial le falta menos para llegar', 'a 3: ella y la anterior se acercan a 3.'],
    ['Una copia de cada salto baja al eje n:', 'las barras se achican; los saltos van a cero.'],
    ['La punteada naranja une las puntas de las barras', 'y se pega al eje: los términos tienden a cero.']];
  function gx(n){ return -0.6 + 0.8*n; } function gy(y){ return 1.05 + 0.82*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:6.2}, aspect:10.8/6.6,
    aria:'Arriba, una franja dice qué muestra: si las sumas parciales van a 3, los saltos, que son los términos, van a cero. Animación en cinco pasos con una gráfica de las seis primeras sumas parciales de la serie 1 más dos tercios más cuatro novenos y así sucesivamente, que converge a 3. Uno: aparecen los puntos, cada uno con su nombre y con una línea punteada hasta el eje vertical, y una recta horizontal punteada a la altura 3; los puntos suben y se acercan a ella. Dos: entre cada punto y el siguiente se marca en naranja el salto vertical; ese salto es un término de la serie, la resta de dos sumas parciales seguidas. Tres: trazos verticales burdeo muestran lo que le falta a cada suma parcial para llegar a 3; se achican. Cuatro: una copia de cada salto naranja baja hasta el eje horizontal y queda como barra, con su nombre; las barras son cada vez más bajas: los términos tienden a cero. Los saltos originales no se mueven. Cinco: una curva punteada pasa por los extremos de las barras y se pega al eje; conclusión: si la serie converge, sus términos tienden a cero, y si no tienden a cero, la serie diverge. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> las sumas parciales \\(S_{n}\\)</span><span><i class="sw rise"></i> los saltos: \\(a_{n}=S_{n}-S_{n-1}\\)</span><span><i class="sw tan"></i> la suma \\(S=3\\) y lo que le falta a cada \\(S_{n}\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
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
        c.beginPath(); c.arc(X(gx(i)), Y(gy(SV[i - 1]*w)), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill();
        if (w >= 1) L('P' + i, gx(i), gy(SV[i - 1]), 0, 5, 9); }
      /* paso 3 en adelante: lo que le falta a cada suma parcial para llegar a 3 (queda hasta el final) */
      if (k >= 3){ w = k === 3 ? u : 1; for (i = 1; i <= NP; i++) seg(gx(i) + 0.07, gy(3), gx(i) + 0.07, gy(3 - (3 - SV[i - 1])*w), C.tan, 1.6);
        if (w > 0.5){ c.font = '600 11px ' + F; c.fillStyle = C.tan; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('burdeo: lo que falta para llegar a 3', X(gx(0)) + 26, Y(gy(3)) - 9); } }
      /* paso 2 en adelante: saltos entre sumas parciales seguidas (no se mueven de su lugar) */
      if (k >= 2) for (i = 2; i <= NP; i++){ w = k === 2 ? u : 1; a = SV[i - 2]; b = SV[i - 1];
        seg(gx(i - 1), gy(a), gx(i - 1) + 0.8*Math.min(1, w*2), gy(a), C.rise, 0.9, [3, 3], 0.8);
        if (w > 0.5){ e = (w - 0.5)*2; seg(gx(i), gy(a), gx(i), gy(a + (b - a)*e), C.rise, 2.4); }
        if (i <= 4 && w > 0.8) L('J' + i, gx(i), gy((a + b)/2), -100, -5, 0); }
      /* paso 4 en adelante: una copia de cada salto baja al eje n y queda como barra, con su nombre */
      if (k >= 4) for (i = 2; i <= NP; i++){ d = k === 4 ? u : 1; a = SV[i - 2]; b = SV[i - 1]; w = a*(1 - d);
        seg(gx(i) - 0.07, gy(w), gx(i) - 0.07, gy(w + (b - a)), C.rise, 3.2);
        if (d > 0.85) L('B' + i, gx(i), gy(b - a), 0, 3, -9); }
      /* paso 5: curva punteada por los extremos de las barras, que se pega al eje */
      if (k === 5){ c.strokeStyle = C.rise; c.lineWidth = 1.1; c.setLineDash([2, 3]); c.beginPath(); for (i = 0; i <= 60; i++){ x = 2 + (6.6 - 2)*u*i/60; if (i) c.lineTo(X(gx(x) - 0.07), Y(gy(Math.pow(2/3, x - 1)))); else c.moveTo(X(gx(x) - 0.07), Y(gy(Math.pow(2/3, x - 1)))); } c.stroke(); c.setLineDash([]); }
      L('Q', -1.2, 4.95, 0); if (k === N && u > 0.5) L('F', -1.2, 4.42, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.98));
      dtQue(S, 'si las sumas parciales van a 3,', 'los saltos, que son los términos, van a cero.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, R = [
      '\\text{Serie: }1+' + f(2, 3) + '+' + f(4, 9) + '+\\cdots' + Q + '\\text{Cada término es el anterior por }' + f(2, 3) + '\\text{:}' + Q + 'a_{1}=1,\\qquad a_{2}=1\\cdot' + f(2, 3) + '=' + f(2, 3) + Q + 'a_{3}=' + f(2, 3) + '\\cdot' + f(2, 3) + '=' + f(4, 9) + ',\\qquad a_{4}=' + f(4, 9) + '\\cdot' + f(2, 3) + '=' + f(8, 27) + Q + 'a_{5}=' + f(8, 27) + '\\cdot' + f(2, 3) + '=' + f(16, 81) + Q + 'a_{6}=' + f(16, 81) + '\\cdot' + f(2, 3) + '=' + f(32, 243)
        + Q + '\\text{Sumas parciales (puntos azules):}' + Q + 'S_{1}=a_{1}=1' + Q + 'S_{2}=S_{1}+a_{2}=1+' + f(2, 3) + '=' + f(3, 3) + '+' + f(2, 3) + '=' + f(5, 3) + Q + 'S_{3}=S_{2}+a_{3}=' + f(5, 3) + '+' + f(4, 9) + '=' + f(15, 9) + '+' + f(4, 9) + '=' + f(19, 9) + Q + 'S_{4}=S_{3}+a_{4}=' + f(19, 9) + '+' + f(8, 27) + Q + '\\phantom{S_{4}}=' + f(57, 27) + '+' + f(8, 27) + '=' + f(65, 27) + Q + 'S_{5}=S_{4}+a_{5}=' + f(65, 27) + '+' + f(16, 81) + Q + '\\phantom{S_{5}}=' + f(195, 81) + '+' + f(16, 81) + '=' + f(211, 81) + Q + 'S_{6}=S_{5}+a_{6}=' + f(211, 81) + '+' + f(32, 243) + Q + '\\phantom{S_{6}}=' + f(633, 243) + '+' + f(32, 243) + '=' + f(665, 243)
        + Q + '\\displaystyle\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{(la serie converge a }3\\text{;}' + Q + '\\text{hoja «Series geométricas infinitas»)}',
      '\\text{Como }S_{n}=S_{n-1}+a_{n}\\text{, al restar }S_{n-1}\\text{:}' + Q + 'a_{n}=S_{n}-S_{n-1}\\quad(n\\ge 2)' + Q + '\\text{Saltos (trazos naranjas):}' + Q + 'a_{2}=S_{2}-S_{1}=' + f(5, 3) + '-1=' + f(5, 3) + '-' + f(3, 3) + '=' + f(2, 3) + Q + 'a_{3}=S_{3}-S_{2}=' + f(19, 9) + '-' + f(5, 3) + '=' + f(19, 9) + '-' + f(15, 9) + '=' + f(4, 9) + Q + 'a_{4}=S_{4}-S_{3}=' + f(65, 27) + '-' + f(19, 9) + Q + '\\phantom{a_{4}}=' + f(65, 27) + '-' + f(57, 27) + '=' + f(8, 27) + Q + 'a_{5}=S_{5}-S_{4}=' + f(211, 81) + '-' + f(65, 27) + Q + '\\phantom{a_{5}}=' + f(211, 81) + '-' + f(195, 81) + '=' + f(16, 81) + Q + 'a_{6}=S_{6}-S_{5}=' + f(665, 243) + '-' + f(211, 81) + Q + '\\phantom{a_{6}}=' + f(665, 243) + '-' + f(633, 243) + '=' + f(32, 243),
      '\\text{Lo que le falta a }S_{n}\\text{ para llegar a }3\\text{: }3-S_{n}' + Q + '\\text{(trazos burdeo)}' + Q + '3-S_{1}=3-1=2' + Q + '3-S_{2}=3-' + f(5, 3) + '=' + f(9, 3) + '-' + f(5, 3) + '=' + f(4, 3) + Q + '3-S_{3}=3-' + f(19, 9) + '=' + f(27, 9) + '-' + f(19, 9) + '=' + f(8, 9) + Q + '3-S_{4}=3-' + f(65, 27) + '=' + f(81, 27) + '-' + f(65, 27) + '=' + f(16, 27) + Q + '3-S_{5}=3-' + f(211, 81) + '=' + f(243, 81) + '-' + f(211, 81) + '=' + f(32, 81) + Q + '3-S_{6}=3-' + f(665, 243) + Q + '\\phantom{3-S_{6}}=' + f(729, 243) + '-' + f(665, 243) + '=' + f(64, 243)
        + Q + '\\displaystyle\\lim_{n\\to\\infty}S_{n}=3\\quad\\text{(paso 1)}' + Q + '\\displaystyle\\lim_{n\\to\\infty}S_{n-1}=3\\quad\\text{(las mismas sumas,}' + Q + '\\text{un lugar atrás; se usa sin demostrar)}',
      '\\text{Barras naranjas en el eje }n\\text{: los saltos del paso 2}' + Q + 'a_{2}=' + f(2, 3) + ',\\ \\ a_{3}=' + f(4, 9) + ',\\ \\ a_{4}=' + f(8, 27) + ',\\ \\ a_{5}=' + f(16, 81) + ',\\ \\ a_{6}=' + f(32, 243) + Q + '\\text{El límite de una resta es la resta de los}' + Q + '\\text{límites (se usa sin demostrar):}' + Q + '\\displaystyle\\lim_{n\\to\\infty}a_{n}=\\lim_{n\\to\\infty}S_{n}-\\lim_{n\\to\\infty}S_{n-1}' + Q + '\\displaystyle\\lim_{n\\to\\infty}a_{n}=3-3=0',
      '\\text{Teorema: si }\\displaystyle\\sum_{n=1}^{\\infty}a_{n}\\text{ converge, }\\lim_{n\\to\\infty}a_{n}=0.' + Q + '\\text{Leído al revés (criterio):}' + Q + '\\displaystyle\\lim_{n\\to\\infty}a_{n}\\neq 0\\ \\text{o no existe}\\ \\Longrightarrow\\ \\sum_{n=1}^{\\infty}a_{n}\\ \\text{diverge}' + Q + '\\text{Ojo: que }a_{n}\\text{ tienda a }0\\text{ no prueba}' + Q + '\\text{que la serie converja (recuadro del recíproco).}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
