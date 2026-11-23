/* L29 H03 · el límite y la gráfica: el límite es la altura a la que llega la curva por los dos lados (por pasos); cuatro gráficas, cuatro lecturas (por pasos) */
OA.scene('gra-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  function f(x){ return x*x/2; } /* la gráfica de f para x ≠ 2; además f(2) = 3,5 (punto suelto) */
  var IZ = [1, 1.5, 1.9], DE = [3, 2.5, 2.1];
  var M = lmMarco(-0.75, 0.35, 5.6, 4.0, -0.7, 3.6, -0.4, 5);
  var PZ = [['Q', '\\lim_{x\\to 2}f(x)=\\ ?', 'lím f(x) cuando x → 2 = ?', 'pt'], ['F', '\\Longrightarrow\\ \\lim_{x\\to 2}f(x)=2', '⟹ lím f(x) = 2', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=f(x)', 'y = f(x)', 'c-tan'], ['HU', '\\text{hueco }(2,\\ 2)', 'hueco (2, 2)', 'c-tan'],
    ['FV', 'f(2)=3{,}5', 'f(2) = 3,5', 'c-tan'], ['LM', '\\text{límite: }2', 'límite: 2', 'diff'],
    ['R1', 'a=2:\\ \\ \\text{se mira la curva cerca de }x=2', 'a = 2: se mira la curva cerca de x = 2', ''],
    ['R2', 'x<2:\\ \\ f(1)=0{,}5;\\ \\ f(1{,}5)=1{,}125;\\ \\ f(1{,}9)=1{,}805', 'x < 2: f(1) = 0,5; f(1,5) = 1,125; f(1,9) = 1,805', 'c-sec'],
    ['R3', 'x>2:\\ \\ f(3)=4{,}5;\\ \\ f(2{,}5)=3{,}125;\\ \\ f(2{,}1)=2{,}205', 'x > 2: f(3) = 4,5; f(2,5) = 3,125; f(2,1) = 2,205', 'diff'],
    ['R4', '\\text{las dos alturas llegan a }2\\text{: la altura del hueco}', 'las dos alturas llegan a 2: la altura del hueco', ''],
    ['R5', 'f(2)=3{,}5\\ \\ \\text{(punto lleno): es otra pregunta}', 'f(2) = 3,5 (punto lleno): es otra pregunta', 'c-tan'],
    ['R6', '\\lim_{x\\to 2}f(x)=2', 'lím f(x) cuando x → 2 = 2', 'diff']];
  var TXT = [['Para leer el límite se ubica a en el eje', 'horizontal. Aquí, a = 2. ¿Qué pasa cerca?'],
    ['Por la izquierda: x avanza hacia 2 y la altura', 'de la curva sube hacia 2.'],
    ['Por la derecha: x retrocede hacia 2 y la altura', 'de la curva baja hacia 2.'],
    ['Las dos alturas llegan al mismo número, 2:', 'es la altura del hueco de la curva.'],
    ['El punto lleno dice cuánto vale la función en 2:', '3,5. Es otra pregunta; el límite no lo usa.'],
    ['El límite es 2: la altura a la que llega la curva', 'por los dos lados, no la del punto lleno.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.5, y1:6.3}, aspect:11.8/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite es la altura a la que llega la curva por los dos lados de a. Animación en seis pasos sobre la gráfica de una función que vale x al cuadrado dividido por 2 para x distinto de 2, y 3,5 en x igual a 2. Uno: la curva, con un hueco en el punto (2, 2) y un punto lleno en (2; 3,5). Dos: puntos azules sobre la curva en x igual a 1, 1,5 y 1,9, con alturas 0,5, 1,125 y 1,805. Tres: puntos naranjas en x igual a 3, 2,5 y 2,1, con alturas 4,5, 3,125 y 2,205. Cuatro: una línea punteada a la altura 2 une el hueco con el eje vertical. Cinco: otra línea punteada lleva el punto lleno a la altura 3,5: ese es el valor de la función en 2. Seis: el límite es 2, la altura del hueco. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(f\\): curva, hueco y punto lleno</span><span><i class="sw sec"></i> \\(x\\) menor que 2 (por la izquierda)</span><span><i class="sw rise"></i> \\(x\\) mayor que 2 (por la derecha)</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, xm, hx = X(M.gx(2)), hy = Y(M.gy(2));
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      dtQue(S, 'el límite es la altura a la que llega', 'la curva por los dos lados de a.');
      lmEjes(S, M); lmEtq(T, M, 'EX', 3.6, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 5, 0, 8, 5);
      /* paso 1: la curva y la recta x = 2 */
      a = ap(1);
      lmSeg(S, M, 2, 0, 2, 3.5*a, C.muted || '#6b6b6b', 1);
      lmCurva(S, M, f, -0.7, -0.7 + 3.86*a, C.tan, 2);
      if (a > 0.3){ lmFondo(S, M, 'CF', 2.6, 4.78, -100); lmEtq(T, M, 'CF', 2.6, 4.78, -100); }
      /* paso 4: la altura 2, del hueco al eje vertical */
      a = ap(4);
      if (a > 0) lmSeg(S, M, 2, 2, 2 - 2*a, 2, C.tan, 1.2, [5, 3]);
      /* paso 5: el valor f(2) = 3,5, del punto lleno al eje vertical */
      a = ap(5);
      if (a > 0){ lmSeg(S, M, 2, 3.5, 2 - 2*a, 3.5, C.tan, 1); if (a > 0.5){ lmFondo(S, M, 'FV', 1.85, 3.5, -100); lmEtq(T, M, 'FV', 1.85, 3.5, -100); lmPunto(S, M, 0, 3.5, C.tan, false, 2.6); } }
      /* paso 2: por la izquierda */
      a = ap(2);
      if (a > 0){ xm = k === 2 ? 0.6 + 1.3*u : 1.9;
        lmFlecha(S, M, 0.6, 0, Math.min(xm, 1.88), 0, C.sec, 1.8, 0, -7); lmFlecha(S, M, 0, f(0.6), 0, f(Math.min(xm, 1.84)), C.sec, 1.8, 8, 0);
        IZ.forEach(function(x){ if (xm >= x - 1e-9){ lmGuia(S, M, x, f(x), C.sec); lmPunto(S, M, x, f(x), C.sec, false, 2.8); } });
        if (k === 2 && u < 1){ lmGuia(S, M, xm, f(xm), C.sec); lmPunto(S, M, xm, f(xm), C.sec, false, 4); } }
      /* paso 3: por la derecha */
      a = ap(3);
      if (a > 0){ xm = k === 3 ? 3.1 - 1.0*u : 2.1;
        lmFlecha(S, M, 3.1, 0, Math.max(xm, 2.12), 0, C.rise, 1.8, 0, -7); lmFlecha(S, M, 0, f(3.1), 0, f(Math.max(xm, 2.17)), C.rise, 1.8, 8, 0);
        DE.forEach(function(x){ if (xm <= x + 1e-9){ lmGuia(S, M, x, f(x), C.rise); lmPunto(S, M, x, f(x), C.rise, false, 2.8); } });
        if (k === 3 && u < 1){ lmGuia(S, M, xm, f(xm), C.rise); lmPunto(S, M, xm, f(xm), C.rise, false, 4); } }
      /* el hueco y el punto lleno van encima de todo */
      if (ap(1) > 0.5){ lmPunto(S, M, 2, 2, C.tan, true, 4); lmPunto(S, M, 2, 3.5, C.tan, false, 3.6); lmFondo(S, M, 'HU', 2.22, 1.5, 0); lmEtq(T, M, 'HU', 2.22, 1.5, 0); }
      /* paso 6: el límite es la altura del hueco */
      a = ap(6);
      if (a > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.6; c.globalAlpha = a; c.beginPath(); c.arc(hx, hy, 4 + 5*a, 0, 6.2832); c.stroke(); c.globalAlpha = 1;
        lmPunto(S, M, 0, 2, C.rise, false, 3); if (a > 0.5){ lmEtq(T, M, 'LM', 0, 2, -100, -17, 0); } }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.86, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.86, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(0.36));
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 137, 172]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=\\dfrac{x^{2}}{2}\\ \\ \\text{si }x\\ne 2;\\qquad f(2)=3{,}5' + Q + '\\text{se mira }x\\text{ cerca de }a=2\\text{, con }x\\ne 2',
      '\\text{por la izquierda }(x<2):' + Q + 'f(1)=\\tfrac{1^{2}}{2}=\\tfrac{1}{2}=0{,}5' + Q + 'f(1{,}5)=\\tfrac{1{,}5^{2}}{2}=\\tfrac{2{,}25}{2}=1{,}125' + Q + 'f(1{,}9)=\\tfrac{1{,}9^{2}}{2}=\\tfrac{3{,}61}{2}=1{,}805',
      '\\text{por la derecha }(x>2):' + Q + 'f(3)=\\tfrac{3^{2}}{2}=\\tfrac{9}{2}=4{,}5' + Q + 'f(2{,}5)=\\tfrac{2{,}5^{2}}{2}=\\tfrac{6{,}25}{2}=3{,}125' + Q + 'f(2{,}1)=\\tfrac{2{,}1^{2}}{2}=\\tfrac{4{,}41}{2}=2{,}205',
      '\\text{distancia a }2:\\ |1{,}805-2|=0{,}195\\ \\text{y}\\ |2{,}205-2|=0{,}205' + Q + '\\text{por los dos lados, la altura se acerca a }2',
      'f(2)=3{,}5\\ \\ \\text{(dato: el punto lleno)}' + Q + '\\text{el límite usa }x\\ne 2:\\ \\text{no mira ese punto}',
      '\\text{si }x\\ne 2:\\ f(x)=\\tfrac{x^{2}}{2}\\text{, que se acerca a }\\tfrac{2^{2}}{2}=\\tfrac{4}{2}=2' + Q + '\\displaystyle\\lim_{x\\to 2}f(x)=2\\qquad(\\text{y }f(2)=3{,}5\\ne 2)']; return dtPasos(R.slice(0, k)); }
  };
})());
/* cuatro gráficas que solo se diferencian en x = 2 (y a su derecha, la cuarta); en cada paso se lee una */
OA.scene('gra-casos', (function(){
  var N = 5, Q = '\\\\&\\qquad ';
  function b(x){ return x/2 + 1; } function b4(x){ return x/2 + 2; }
  /* [marco, título, función a la derecha, altura de llegada por la derecha, puntos sobre x = 2: [y, hueco]] */
  var G = [[lmMarco(-0.85, 3.35, 2.6, 2.3, -0.4, 4.4, -0.4, 4.4), 'Gráfica 1: recta completa', b, 2, [[2, false]]],
    [lmMarco(2.5, 3.35, 2.6, 2.3, -0.4, 4.4, -0.4, 4.4), 'Gráfica 2: con un hueco', b, 2, [[2, true]]],
    [lmMarco(-0.85, -0.3, 2.6, 2.3, -0.4, 4.4, -0.4, 4.4), 'Gráfica 3: punto suelto', b, 2, [[2, true], [3.5, false]]],
    [lmMarco(2.5, -0.3, 2.6, 2.3, -0.4, 4.4, -0.4, 4.4), 'Gráfica 4: un salto', b4, 3, [[2, true], [3, false]]]];
  var PZ = [['Q', '\\lim_{x\\to 2}f(x)\\text{ en cada gráfica}=\\ ?', 'lím f(x) cuando x → 2, en cada gráfica = ?', 'pt'], ['F', '\\Longrightarrow\\ 2;\\ 2;\\ 2;\\ \\text{no existe}', '⟹ 2; 2; 2; no existe', 'diff'],
    ['K1', '\\lim_{x\\to 2}f_{1}(x)=2', 'lím f₁(x) = 2', 'diff'], ['J1', 'f_{1}(2)=2', 'f₁(2) = 2', 'c-tan'],
    ['K2', '\\lim_{x\\to 2}f_{2}(x)=2', 'lím f₂(x) = 2', 'diff'], ['J2', 'f_{2}(2)\\text{ no existe}', 'f₂(2) no existe', 'c-tan'],
    ['K3', '\\lim_{x\\to 2}f_{3}(x)=2', 'lím f₃(x) = 2', 'diff'], ['J3', 'f_{3}(2)=3{,}5', 'f₃(2) = 3,5', 'c-tan'],
    ['K4', '\\lim_{x\\to 2}f_{4}(x)\\text{ no existe}', 'lím f₄(x) no existe', 'diff'], ['J4', 'f_{4}(2)=3', 'f₄(2) = 3', 'c-tan'],
    ['R1', '\\text{gráfica 1:}\\ \\ \\lim_{x\\to 2}f_{1}(x)=2\\ \\ \\text{y}\\ \\ f_{1}(2)=2', 'gráfica 1: lím f₁(x) = 2 y f₁(2) = 2', ''],
    ['R2', '\\text{gráfica 2:}\\ \\ \\lim_{x\\to 2}f_{2}(x)=2;\\ \\ f_{2}(2)\\text{ no existe}', 'gráfica 2: lím f₂(x) = 2; f₂(2) no existe', ''],
    ['R3', '\\text{gráfica 3:}\\ \\ \\lim_{x\\to 2}f_{3}(x)=2;\\ \\ f_{3}(2)=3{,}5', 'gráfica 3: lím f₃(x) = 2; f₃(2) = 3,5', ''],
    ['R4', '\\text{gráfica 4:}\\ \\ \\text{por la izquierda }2\\text{, por la derecha }3', 'gráfica 4: por la izquierda 2, por la derecha 3', ''],
    ['R5', '\\text{límite}=\\text{altura a la que llegan los dos lados}', 'límite = altura a la que llegan los dos lados', 'diff']];
  var TXT = [['Gráfica 1: los dos lados llegan a la altura 2,', 'y ahí está el punto de la recta. Límite 2.'],
    ['Gráfica 2: los dos lados llegan a la altura 2,', 'donde hay un hueco. El límite igual es 2.'],
    ['Gráfica 3: los dos lados llegan a la altura 2.', 'El punto lleno está en 3,5; el límite es 2.'],
    ['Gráfica 4: la izquierda llega a 2 y la derecha', 'llega a 3. Alturas distintas: no hay límite.'],
    ['En las cuatro se miró lo mismo: a qué altura', 'llega cada lado. Lo que hay sobre x = 2 no cuenta.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.1, y1:7.6}, aspect:13.7/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite en 2 depende de la altura a la que llegan los dos lados, no del punto que hay sobre 2. Cuatro gráficas chicas. La primera es la recta y igual a x medios más 1, completa, con su punto en (2, 2). La segunda es la misma recta con un hueco en (2, 2). La tercera, la misma recta con un hueco en (2, 2) y un punto lleno en (2; 3,5). La cuarta tiene un salto: a la izquierda de 2 la misma recta, que termina en un hueco en (2, 2), y desde 2 hacia la derecha la recta y igual a x medios más 2, que empieza en un punto lleno en (2, 3). En cada paso, una flecha azul por la izquierda y una naranja por la derecha caminan hacia x igual a 2 sobre una gráfica, y bajo ella se escribe el resultado: límite 2 en las tres primeras; en la cuarta, alturas 2 y 3, y el límite no existe. Bajo la figura, un registro numerado guarda cada lectura.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica: punto lleno o círculo vacío sobre \\(x=2\\)</span><span><i class="sw sec"></i> llegada por la izquierda</span><span><i class="sw rise"></i> llegada por la derecha</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), dy = 21/(X(1) - X(0)), a5;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      dtQue(S, 'el límite en 2 depende de la altura a la que', 'llegan los dos lados, no del punto sobre 2.');
      a5 = ap(5);
      G.forEach(function(g, i){ var M = g[0], fd = g[2], ld = g[3], a = ap(i + 1), xa, xb;
        lmTxt(S, g[1], M.gx(-0.4), M.gy(4.4) + 0.3, C.ink, 'left', '700');
        lmEjes(S, M);
        lmCurva(S, M, b, 0, 2, C.tan, 2); lmCurva(S, M, fd, 2, 4, C.tan, 2);
        if (a > 0){
          /* alturas de llegada, llevadas al eje vertical (si coinciden, los dos colores se alternan en una sola línea) */
          lmSeg(S, M, 2, 2, 2 - 2*a, 2, C.sec, 1.2, [4, 4]);
          c.lineDashOffset = ld === 2 ? 4 : 0; lmSeg(S, M, 2, ld, 2 - 2*a, ld, C.rise, 1.2, [4, 4]); c.lineDashOffset = 0;
          if (a > 0.9){ lmPunto(S, M, 0, 2, C.sec, false, 2.6); if (ld !== 2) lmPunto(S, M, 0, ld, C.rise, false, 2.6); }
          /* las dos flechas caminan sobre la curva hacia x = 2 */
          xa = 0.35 + 1.3*a; xb = 3.65 - 1.3*a;
          lmFlecha(S, M, 0.35, b(0.35), xa, b(xa), C.sec, 1.8, -2, -7); lmFlecha(S, M, 3.65, fd(3.65), xb, fd(xb), C.rise, 1.8, 2, 7);
        }
        g[4].forEach(function(p){ lmPunto(S, M, 2, p[0], C.tan, p[1], 3.4); });
        if (a > 0.6){ T.L('K' + (i + 1), M.gx(-0.4), M.gy(-0.4) - 0.33, 0); T.L('J' + (i + 1), M.gx(-0.4), M.gy(-0.4) - 0.68, 0); }
        /* paso 5: se marca en cada gráfica lo que se miró (las alturas de llegada) */
        if (a5 > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.5; c.globalAlpha = a5; c.beginPath(); c.arc(X(M.gx(0)), Y(M.gy(2)), 6, 0, 6.2832); c.stroke(); if (ld !== 2){ c.beginPath(); c.arc(X(M.gx(0)), Y(M.gy(ld)), 6, 0, 6.2832); c.stroke(); } c.globalAlpha = 1; }
      });
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 6.32, 0); if (k === N && u > 0.5) T.L('F', 5.2, 6.32, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -1.62); lmTxt(S, TXT[k - 1][1], -1.2, -1.62 - dy);
      c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.18));
      T.fin();
      oaReg(S, k, N, -1.2, -3.15, [0, 34, 68, 102, 136]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{gráfica 1: }f_{1}(x)=\\tfrac{x}{2}+1' + Q + '\\text{izquierda: }f_{1}(1{,}8)=\\tfrac{1{,}8}{2}+1=0{,}9+1=1{,}9' + Q + '\\text{derecha: }f_{1}(2{,}2)=\\tfrac{2{,}2}{2}+1=1{,}1+1=2{,}1' + Q + '\\text{los dos lados llegan a }\\tfrac{2}{2}+1=2:\\ \\ \\lim_{x\\to 2}f_{1}(x)=2' + Q + '\\text{y }f_{1}(2)=2\\ \\text{(punto lleno)}',
      '\\text{gráfica 2: la misma recta, sin el punto }(2,\\ 2)' + Q + '\\text{para }x\\ne 2,\\ f_{2}(x)=\\tfrac{x}{2}+1' + Q + '\\text{los dos lados llegan a }2:\\ \\ \\lim_{x\\to 2}f_{2}(x)=2' + Q + 'f_{2}(2)\\text{ no existe (hueco)}',
      '\\text{gráfica 3: la misma recta para }x\\ne 2;\\ \\ f_{3}(2)=3{,}5' + Q + '\\text{los dos lados llegan a }2:\\ \\ \\lim_{x\\to 2}f_{3}(x)=2' + Q + '2\\ne 3{,}5:\\ \\text{el límite no es el valor}',
      '\\text{gráfica 4: }f_{4}(x)=\\tfrac{x}{2}+1\\ (x<2);\\ \\ \\tfrac{x}{2}+2\\ (x\\ge 2)' + Q + '\\text{izquierda: }f_{4}(1{,}8)=0{,}9+1=1{,}9\\ \\to\\ \\tfrac{2}{2}+1=2' + Q + '\\text{derecha: }f_{4}(2{,}2)=1{,}1+2=3{,}1\\ \\to\\ \\tfrac{2}{2}+2=3' + Q + '2\\ne 3:\\ \\ \\lim_{x\\to 2}f_{4}(x)\\text{ no existe;}\\ \\ f_{4}(2)=3',
      '\\text{gráficas 1, 2 y 3: llegadas }2\\text{ y }2\\ \\Rightarrow\\ \\text{límite }2' + Q + '\\text{gráfica 4: llegadas }2\\text{ y }3\\ \\Rightarrow\\ \\text{no hay límite}' + Q + '\\text{lo que hay sobre }x=2\\text{ no cambia el límite}']; return dtPasos(R.slice(0, k)); }
  };
})());
