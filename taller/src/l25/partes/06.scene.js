/* L25 H06 · sumas parciales: cada término se agrega a la suma anterior; con los impares, cada término es una escuadra y la suma, un cuadrado */
OA.scene('parc-idea', (function(){
  var N = 5, A = [1, 3, 5, 7], SUM = [1, 4, 9, 16];
  var PZ = [['A1', 'a_{1}=1', 'a₁ = 1', 'diff'], ['A2', 'a_{2}=3', 'a₂ = 3', 'diff'], ['A3', 'a_{3}=5', 'a₃ = 5', 'diff'], ['A4', 'a_{4}=7', 'a₄ = 7', 'diff'],
    ['S1', 'S_{1}=1', 'S₁ = 1', 'c-sec'], ['S2', 'S_{2}=4', 'S₂ = 4', 'c-sec'], ['S3', 'S_{3}=9', 'S₃ = 9', 'c-sec'], ['S4', 'S_{4}=16', 'S₄ = 16', 'c-sec'],
    ['N2', '1,\\ 4,\\ 9,\\ 16', '1, 4, 9, 16', 'c-tan'],
    ['Q', 'S_{4}=a_{1}+a_{2}+a_{3}+a_{4}=\\ ?', 'S₄ = a₁ + a₂ + a₃ + a₄ = ?', 'pt'], ['F', '\\Longrightarrow\\ S_{4}=1+3+5+7=16', '⟹ S₄ = 1 + 3 + 5 + 7 = 16', 'diff'],
    ['R1', 'S_{1}=a_{1}=1', 'S₁ = a₁ = 1', ''],
    ['R2', 'S_{2}=S_{1}+a_{2}=1+3=4', 'S₂ = S₁ + a₂ = 1 + 3 = 4', ''],
    ['R3', 'S_{3}=S_{2}+a_{3}=4+5=9', 'S₃ = S₂ + a₃ = 4 + 5 = 9', ''],
    ['R4', 'S_{4}=S_{3}+a_{4}=9+7=16', 'S₄ = S₃ + a₄ = 9 + 7 = 16', ''],
    ['R5', 'S_{4}=\\sum_{k=1}^{4}(2k-1)=1+3+5+7=16', 'S₄ = Σ (2k − 1), de k = 1 a 4, = 1 + 3 + 5 + 7 = 16', 'diff']];
  var TXT = [['El primer término vale 1: un cuadradito.', 'La primera suma parcial es ese término.'],
    ['Entra el 3, una escuadra naranja. El 1,', 'ya sumado, queda en azul.'],
    ['Se agrega el tercer término, 5.', 'La suma anterior no se calcula de nuevo.'],
    ['Se agrega el cuarto término, 7. Cada suma', 'parcial es la anterior más un término.'],
    ['Las sumas parciales 1, 4, 9, 16 forman', 'otra sucesión: la de las sumas parciales.']];
  var GX = -1.0, GY = 1.0, CS = 0.6;
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:6.1}, aspect:11/6.6,
    aria:'Animación en cinco pasos con la sucesión de los impares 1, 3, 5, 7. Uno: el primer término es un cuadradito; la primera suma parcial vale 1. Dos: el segundo término, 3, llega como una escuadra de tres cuadraditos que se apoya en el primero; la suma parcial vale 4. Tres: llega una escuadra de cinco cuadraditos; la suma vale 9. Cuatro: llega una escuadra de siete; la suma vale 16. Cinco: un borde recorre el cuadrado completo, de cuatro por cuatro; las sumas parciales 1, 4, 9 y 16 forman una nueva sucesión. A la derecha queda escrito, fila por fila, cada término con su suma parcial; nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> el término que se agrega, \\(a_{n}\\)</span><span><i class="sw sec"></i> lo ya sumado, \\(S_{n-1}\\)</span><span><i class="sw tan"></i> la sucesión de sumas parciales</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), n, i, j, act, off, al, m = Math.min(k, 4), P, tot, d, q, seg;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function celda(i, j, col, a, off){ var x = GX + i*CS + off, y = GY + j*CS + off; S.poly([[x, y], [x + CS, y], [x + CS, y + CS], [x, y + CS]], {fill:col, alpha:a});
        c.globalAlpha = Math.min(1, a*2.2); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(X(x) + 0.5, Y(y + CS) + 0.5, CS*s - 1, CS*s - 1); c.globalAlpha = 1; }
      for (n = 1; n <= m; n++){ act = n === k && k <= 4; off = act ? (1 - u)*0.55 : 0; al = act ? u : 1;
        for (i = 0; i < n; i++) for (j = 0; j < n; j++) if (Math.max(i, j) === n - 1) celda(i, j, act ? C.rise : C.sec, (act ? 0.45 : 0.26)*al, off); }
      for (n = 1; n <= m; n++) if (n < k || u > 0.6){ c.font = '700 12px ' + F; c.fillStyle = n === k && k <= 4 ? C.rise : C.sec; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + A[n - 1], X(GX + (n - 0.5)*CS), Y(GY + (n - 0.5)*CS)); } /* cada escuadra conserva escrito cuántos cuadraditos trae */
      if (k === 5){ /* el borde recorre el cuadrado de 4 por 4 */
        P = [[GX, GY], [GX + 4*CS, GY], [GX + 4*CS, GY + 4*CS], [GX, GY + 4*CS], [GX, GY]]; tot = 4*u;
        c.strokeStyle = C.tan; c.lineWidth = 2; c.setLineDash([]); c.beginPath(); c.moveTo(X(P[0][0]), Y(P[0][1]));
        for (q = 0; q < 4; q++){ seg = Math.max(0, Math.min(1, tot - q)); if (seg <= 0) break; c.lineTo(X(P[q][0] + (P[q + 1][0] - P[q][0])*seg), Y(P[q][1] + (P[q + 1][1] - P[q][1])*seg)); }
        c.stroke(); }
      /* nada desaparece: cada término y su suma parcial quedan escritos a la derecha, una fila por paso */
      for (n = 1; n <= m; n++){ if (n < k || u > 0.25) L('A' + n, 2.1, 3.75 - 0.45*n, 0); if (n < k || u > 0.7) L('S' + n, 3.6, 3.75 - 0.45*n, 0); }
      if (k === 5 && u > 0.5) L('N2', 3.6, 1.4, 0);
      L('Q', -1.2, 4.95, 0); if (k === N && u > 0.5) L('F', -1.2, 4.55, 0); /* la pregunta queda; la respuesta se escribe debajo (al lado no cabe) */
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.95));
      dtQue(S, 'cada suma parcial es la anterior', 'más el término que se agrega.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.3, [6, 34, 62, 90, 122]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['a_{n}=2n-1,\\qquad a_{1}=2\\cdot 1-1=2-1=1' + Q + 'S_{1}=a_{1}=1',
      'a_{2}=2\\cdot 2-1=4-1=3' + Q + 'S_{2}=S_{1}+a_{2}=1+3=4',
      'a_{3}=2\\cdot 3-1=6-1=5' + Q + 'S_{3}=S_{2}+a_{3}=4+5=9',
      'a_{4}=2\\cdot 4-1=8-1=7' + Q + 'S_{4}=S_{3}+a_{4}=9+7=16',
      'S_{4}=\\displaystyle\\sum_{k=1}^{4}(2k-1)=1+3+5+7=16' + Q + '\\text{Sumas parciales: }S_{1}=1,\\ S_{2}=4,\\ S_{3}=9,\\ S_{4}=16.' + Q + '\\text{Cada una es la anterior más un término:}' + Q + 'S_{2}=S_{1}+a_{2},\\quad S_{3}=S_{2}+a_{3},\\quad S_{4}=S_{3}+a_{4}.' + Q + '\\text{En general: }S_{n}=S_{n-1}+a_{n}.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
