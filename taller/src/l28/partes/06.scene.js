/* L28 H06 · |AB| = |A| |B|: el cuadrado de área 1 pasa por B y después por A; las áreas se multiplican */
OA.scene('prod-idea', (function(){
  var N = 6;
  var PZ = [['Q', '|AB|=\\ ?', '|AB| = ?', 'pt'], ['F', '|AB|=|A|\\,|B|', '|AB| = |A| |B|', 'diff'],
    ['A1', '\\text{área }1', 'área 1', ''], ['A2', '\\text{área }|B|=2', 'área |B| = 2', 'c-sec'], ['A3', '\\text{área }|AB|=4', 'área |AB| = 4', 'diff'],
    ['R1', '\\text{cuadrado de lados }(1,0)\\text{ y }(0,1)\\text{: área }1', 'cuadrado de lados (1, 0) y (0, 1): área 1', ''],
    ['R2', '|B|=2\\cdot 1-1\\cdot 0=2', '|B| = 2·1 − 1·0 = 2', 'c-sec'],
    ['R3', '\\text{columnas de }AB\\text{: }(2,2)\\text{ y }(0,2)', 'columnas de AB: (2, 2) y (0, 2)', ''],
    ['R4', '|AB|=2\\cdot 2-0\\cdot 2=4', '|AB| = 2·2 − 0·2 = 4', ''],
    ['R5', '|A|=1\\cdot 1-(-1)\\cdot 1=2', '|A| = 1·1 − (−1)·1 = 2', ''],
    ['R6', '|AB|=4=2\\cdot 2=|A|\\,|B|', '|AB| = 4 = 2·2 = |A| |B|', 'diff']];
  var TXT = [['Un cuadrado de lado 1: su área es 1.', 'Se le aplica B y después A: ¿qué área queda?'],
    ['B lo lleva al paralelogramo de sus columnas.', 'El área pasa de 1 a 2: se multiplicó por 2.'],
    ['A lleva ese paralelogramo a otro, el naranja.', 'Sus lados son las columnas del producto.'],
    ['El área del naranja es el determinante', 'del producto: vale 4.'],
    ['El determinante de A vale 2: es el factor', 'del segundo cambio, de 2 a 4.'],
    ['De 1 a 2 con B y de 2 a 4 con A:', 'los determinantes se multiplican.']];
  var OX = 1.0, OY = 1.0, E = 0.7;
  var SQ = [[1, 0], [0, 1]], PB = [[2, 0], [1, 1]], PAB = [[2, 2], [0, 2]];
  function mez(P, Q, u){ return [[P[0][0] + (Q[0][0] - P[0][0])*u, P[0][1] + (Q[0][1] - P[0][1])*u], [P[1][0] + (Q[1][0] - P[1][0])*u, P[1][1] + (Q[1][1] - P[1][1])*u]]; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.5, y1:4.6}, aspect:9.1/6.6,
    aria:'Animación en seis pasos con las matrices A, de filas 1, menos 1 y 1, 1, y B, de filas 2, 1 y 0, 1. Uno: un cuadrado de lado 1, de área 1. Dos: la matriz B lo lleva al paralelogramo azul de sus columnas, (2, 0) y (1, 1), de área 2, que es el determinante de B. Tres: la matriz A lleva ese paralelogramo a otro, naranja, cuyos lados son las columnas del producto AB, (2, 2) y (0, 2). Cuatro: el área del naranja es el determinante de AB, 2 por 2 menos 0 por 2, que es 4. Cinco: el determinante de A es 2. Seis: 4 es 2 por 2, el determinante del producto es el producto de los determinantes. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> columnas de \\(B\\): área \\(|B|\\)</span><span><i class="sw rise"></i> columnas de \\(AB\\): área \\(|AB|\\)</span>',
    anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, M;
      function wx(x){ return OX + E*x; } function wy(y){ return OY + E*y; }
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function pts(P){ return [[wx(0), wy(0)], [wx(P[0][0]), wy(P[0][1])], [wx(P[0][0] + P[1][0]), wy(P[0][1] + P[1][1])], [wx(P[1][0]), wy(P[1][1])]]; }
      function borde(P, col, w, dash){ var q = pts(P), j; c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); for (j = 0; j < 4; j++){ if (j) c.lineTo(X(q[j][0]), Y(q[j][1])); else c.moveTo(X(q[j][0]), Y(q[j][1])); } c.closePath(); c.stroke(); c.setLineDash([]); }
      function cuerpo(P, col, al){ S.poly(pts(P), {fill:col, alpha:al}); }
      function lados(P, col){ dtFlecha(S, wx(0), wy(0), wx(P[0][0]), wy(P[0][1]), col, 1.8); dtFlecha(S, wx(0), wy(0), wx(P[1][0]), wy(P[1][1]), col, 1.8); }
      /* ejes finos con sus marcas */
      S.line(wx(-0.5), wy(0), wx(3.6), wy(0), {color:C.ink, width:1}); S.line(wx(0), wy(-0.3), wx(0), wy(4.3), {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 4; i++){ c.beginPath(); if (i <= 3){ c.moveTo(X(wx(i)), Y(wy(0)) - 3); c.lineTo(X(wx(i)), Y(wy(0)) + 3); } c.moveTo(X(wx(0)) - 3, Y(wy(i))); c.lineTo(X(wx(0)) + 3, Y(wy(i))); c.stroke(); if (i <= 3) num('' + i, X(wx(i)), Y(wy(0)) + 11, 'center'); num('' + i, X(wx(0)) - 7, Y(wy(i)), 'right'); }
      /* paso 1: el cuadrado; queda su contorno punteado cuando la figura cambia */
      if (k === 1){ cuerpo(SQ, C.muted || '#6b6b6b', 0.22*Math.max(u, 0.15)); borde(SQ, C.ink, 1.3); }
      else borde(SQ, C.muted || '#6b6b6b', 1.1, [4, 3]);
      /* paso 2: el cuadrado se deforma hasta el paralelogramo de las columnas de B */
      if (k === 2){ M = mez(SQ, PB, u); cuerpo(M, C.sec, 0.26); borde(M, C.sec, 1.3); lados(M, C.sec); }
      if (k >= 3){ cuerpo(PB, C.sec, 0.14); borde(PB, C.sec, 1.1, [4, 3]); }
      /* paso 3: el paralelogramo de B se deforma hasta el de las columnas de AB */
      if (k >= 3){ M = k === 3 ? mez(PB, PAB, u) : PAB; cuerpo(M, C.rise, 0.28); borde(M, C.rise, 1.3); lados(M, C.rise); }
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(wx(0)), Y(wy(0)), 2.4, 0, 6.2832); c.fill();
      L('A1', wx(-0.2), wy(0.55), -100);
      if (k > 2 || (k === 2 && u > 0.7)) L('A2', wx(3.15), wy(0.55), 0);
      if (k > 4 || (k === 4 && u > 0.5)) L('A3', wx(2.2), wy(3.4), 0);
      if (k < N || u < 0.5) L('Q', -1.2, 4.3, 0); else L('F', -1.2, 4.3, 0);
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.3));
      T.fin();
      oaReg(S, k, N, -1.2, -1.15, [0, 28, 56, 84, 112, 140]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['A=\\begin{pmatrix}1&-1\\\\1&1\\end{pmatrix},\\quad B=\\begin{pmatrix}2&1\\\\0&1\\end{pmatrix}', '|B|=\\begin{vmatrix}2&1\\\\0&1\\end{vmatrix}=2\\cdot 1-1\\cdot 0=2', 'AB=\\begin{pmatrix}1\\cdot 2+(-1)\\cdot 0&1\\cdot 1+(-1)\\cdot 1\\\\1\\cdot 2+1\\cdot 0&1\\cdot 1+1\\cdot 1\\end{pmatrix}=\\begin{pmatrix}2&0\\\\2&2\\end{pmatrix}', '|AB|=\\begin{vmatrix}2&0\\\\2&2\\end{vmatrix}=2\\cdot 2-0\\cdot 2=4', '|A|=\\begin{vmatrix}1&-1\\\\1&1\\end{vmatrix}=1\\cdot 1-(-1)\\cdot 1=2', '|AB|=4=2\\cdot 2=|A|\\,|B|'][k - 1]]]; }
  };
})());
/* número ↔ figura: B fija, A = (1 1; 0 k); el área del paralelogramo de AB es |k| veces la del de B */
OA.scene('prod-vivo', (function(){
  var PZ = [['PB', '\\text{columnas de }B', 'columnas de B', 'c-sec'], ['PA', '\\text{columnas de }AB', 'columnas de AB', 'diff']];
  return {
    world:{x0:-1.0, x1:5.6, y0:-2.6, y1:3.0}, aspect:5.6/6.6,
    aria:'Dos paralelogramos que salen del origen. El azul, fijo, lo forman las columnas de la matriz B, los vectores (2, 0) y (1, 1); su área es 2. El naranja lo forman las columnas del producto AB, los vectores (2, 0) y (2, k), donde A tiene filas 1, 1 y 0, k. Al mover k el naranja cambia de alto: su área es el valor absoluto de 2 por k. Con k igual a 1 tiene la misma área que el azul. Con k igual a 0 se aplasta sobre el eje y el área es cero. Con k negativo queda bajo el eje. Bajo el dibujo se calculan los tres determinantes.',
    labels:PZ,
    sliders:[{id:'k', tex:'k', min:-1, max:2, step:0.05, value:1.5}],
    legend:'<span><i class="sw sec"></i> columnas de \\(B\\): \\((2,0)\\) y \\((1,1)\\)</span><span><i class="sw rise"></i> columnas de \\(AB\\): \\((2,0)\\) y \\((2,k)\\)</span>',
    anim:{run:20000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.k = 2 - 3*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = v.k == null ? 1.5 : +v.k, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, m, cero = Math.abs(k) < 0.02;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function par(P, Q, col, lleno){ if (lleno){ S.poly([[0, 0], P, [P[0] + Q[0], P[1] + Q[1]], Q], {fill:col, alpha:0.26});
          c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(P[0]), Y(P[1])); c.lineTo(X(P[0] + Q[0]), Y(P[1] + Q[1])); c.lineTo(X(Q[0]), Y(Q[1])); c.stroke(); c.setLineDash([]); }
        dtFlecha(S, 0, 0, Q[0], Q[1], col, 1.8); dtFlecha(S, 0, 0, P[0], P[1], col, 1.8); }
      S.line(-0.8, 0, 5.4, 0, {color:C.ink, width:1}); S.line(0, -1.3, 0, 2.6, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 5; i++){ c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num('' + i, X(i), Y(0) + 11, 'center'); }
      for (i = -1; i <= 2; i++){ if (!i) continue; c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(0) - 7, Y(i), 'right'); }
      par([2, 0], [2, k], C.rise, !cero); par([2, 0], [1, 1], C.sec, true);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      T.L('PB', 0.9, 1, -100, -6, -9); T.L('PA', 4, k, -100, 0, k < 0 ? 11 : -11);
      m = cero ? 'Determinante cero: el naranja se aplasta' : (k < 0 ? 'Determinante negativo: el naranja se da vuelta' : 'El área naranja es la azul por el factor k');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-0.9), Y(-2.1));
      T.fin();
    },
    caption:function(v){ var k = v.k == null ? 1.5 : +v.k, n = function(z){ return oaDec(z, 2); }; return 'Con k = ' + n(k) + ', el determinante de A vale ' + n(k) + ', el de B vale 2 y el de AB vale ' + n(2*k) + '. El paralelogramo naranja mide ' + n(Math.abs(2*k)) + ' unidades cuadradas. Con k = 0 se aplasta'; },
    readout:function(v){ var k = v.k == null ? 1.5 : +v.k, n = OA.num;
      return [['', '|A|=\\begin{vmatrix}1&1\\\\0&k\\end{vmatrix}=1\\cdot k-1\\cdot 0=k,\\qquad |B|=\\begin{vmatrix}2&1\\\\0&1\\end{vmatrix}=2'], ['', 'AB=\\begin{pmatrix}1\\cdot 2+1\\cdot 0&1\\cdot 1+1\\cdot 1\\\\0\\cdot 2+k\\cdot 0&0\\cdot 1+k\\cdot 1\\end{pmatrix}=\\begin{pmatrix}2&2\\\\0&k\\end{pmatrix}'], ['', '|AB|=2\\cdot k-2\\cdot 0=2k=|A|\\,|B|'], ['d', '|AB|=2\\cdot\\left(' + n(k, 2) + '\\right)=' + n(2*k, 2)]]; }
  };
})());
