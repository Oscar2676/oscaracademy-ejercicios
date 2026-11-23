/* L29 H04 · límites a partir de gráficas: en una misma gráfica se leen tres límites (a = 2, 3 y 5) mirando la altura de llegada de cada lado (por pasos) */
OA.scene('grf-idea', (function(){
  var N = 5, Q = '\\\\&\\qquad ';
  /* los tres trozos de G: y = x + 1 (0 ≤ x < 3), y = 7 − x (3 < x < 5), y = 10 − x (5 ≤ x ≤ 8); además G(3) = 1 */
  function g1(x){ return x + 1; } function g2(x){ return 7 - x; } function g3(x){ return 10 - x; }
  /* lecturas: [a, paso, trozo izquierdo, trozo derecho, llegada izquierda, llegada derecha, corrimiento vertical (px) de la flecha derecha] */
  var LEC = [[2, 2, g1, g1, 3, 3, 7], [3, 3, g1, g2, 4, 4, -7], [5, 4, g2, g3, 2, 5, 7]];
  var M = lmMarco(-0.75, 0.35, 5.7, 3.9, -0.6, 8.6, -0.5, 5.8);
  var PZ = [['Q', '\\lim_{x\\to a}G(x)\\ \\text{en }a=2,\\ 3,\\ 5:\\ \\ ?', 'lím G(x) cuando x → a, en a = 2, 3, 5: ?', 'pt'], ['F', '\\Longrightarrow\\ 3;\\ \\ 4;\\ \\ \\text{no existe}', '⟹ 3; 4; no existe', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=G(x)', 'y = G(x)', 'c-tan'], ['V3', 'G(3)=1', 'G(3) = 1', 'c-tan'],
    ['R1', '\\text{gráfica de }G:\\ \\text{tres trozos de recta, de }x=0\\text{ a }x=8', 'gráfica de G: tres trozos de recta, de x = 0 a x = 8', ''],
    ['R2', 'a=2:\\ \\text{llegadas }3\\text{ y }3;\\ \\ \\lim_{x\\to 2}G(x)=3', 'a = 2: llegadas 3 y 3; lím G(x) = 3', ''],
    ['R3', 'a=3:\\ \\text{llegadas }4\\text{ y }4;\\ \\ \\lim_{x\\to 3}G(x)=4;\\ \\ G(3)=1', 'a = 3: llegadas 4 y 4; lím G(x) = 4; G(3) = 1', ''],
    ['R4', 'a=5:\\ \\text{llegadas }2\\text{ y }5;\\ \\ \\lim_{x\\to 5}G(x)\\text{ no existe}', 'a = 5: llegadas 2 y 5; lím G(x) no existe', ''],
    ['R5', '\\text{hay límite}\\iff\\text{las dos llegadas son iguales}', 'hay límite ⟺ las dos llegadas son iguales', 'diff']];
  var TXT = [['La gráfica tiene tres trozos de recta. Se leerá', 'el límite en tres lugares: a = 2, a = 3 y a = 5.'],
    ['En a = 2 los dos lados llegan a la altura 3,', 'donde está el punto de la curva. Límite: 3.'],
    ['En a = 3 los dos lados llegan a la altura 4,', 'la del hueco. El punto lleno, en 1, no cuenta.'],
    ['En a = 5 la izquierda llega a la altura 2 y la', 'derecha, a la altura 5. Distintas: no hay límite.'],
    ['En los tres lugares se miró lo mismo: la altura', 'de llegada de cada lado. Iguales: hay límite.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.1, y1:6.0}, aspect:11.1/6.6,
    aria:'Arriba, una franja dice qué muestra: en una gráfica, el límite en a se lee comparando la altura de llegada de cada lado. Animación en cinco pasos sobre la gráfica de una función G hecha con tres trozos de recta: de (0, 1) sube hasta un hueco en (3, 4); desde ese hueco baja hasta otro hueco en (5, 2); y desde un punto lleno en (5, 5) baja hasta (8, 2). Además hay un punto lleno en (3, 1). Uno: la gráfica completa. Dos: en a igual a 2, una flecha azul por la izquierda y una naranja por la derecha llegan a la altura 3; el límite es 3. Tres: en a igual a 3, las dos flechas llegan a la altura 4, la del hueco; el límite es 4 aunque la función vale 1 en 3. Cuatro: en a igual a 5, la flecha azul llega a la altura 2 y la naranja a la altura 5; el límite no existe. Cinco: resumen, hay límite cuando las dos alturas de llegada son iguales. Bajo la figura, un registro numerado guarda cada lectura, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(G\\), con huecos y puntos llenos</span><span><i class="sw sec"></i> llegada por la izquierda</span><span><i class="sw rise"></i> llegada por la derecha</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, a5, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.88; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      dtQue(S, 'en una gráfica, el límite en a se lee', 'comparando la altura de llegada de cada lado.');
      lmEjes(S, M); lmEtq(T, M, 'EX', 8.6, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 5.8, 0, 8, 5);
      /* paso 1: la gráfica, trozo por trozo */
      a = ap(1);
      lmCurva(S, M, g1, 0, 3*Math.min(1, a*3), C.tan, 2); if (a > 1/3) lmCurva(S, M, g2, 3, 3 + 2*Math.min(1, a*3 - 1), C.tan, 2); if (a > 2/3) lmCurva(S, M, g3, 5, 5 + 3*Math.min(1, a*3 - 2), C.tan, 2);
      if (a > 0.9) lmEtq(T, M, 'CF', 6.3, 4.2, 0, 0, 0);
      /* pasos 2, 3 y 4: una lectura por paso */
      LEC.forEach(function(L){ var x0 = L[0], al = ap(L[1]), fi = L[2], fd = L[3], li = L[4], ld = L[5], xa, xb;
        if (al <= 0) return;
        lmSeg(S, M, x0, 0, x0, Math.max(li, ld)*Math.min(1, al*2), mu, 1);
        /* alturas de llegada, llevadas al eje vertical (si coinciden, los dos colores se alternan en una sola línea) */
        lmSeg(S, M, x0, li, x0 - x0*al, li, C.sec, 1.2, [4, 4]);
        c.lineDashOffset = ld === li ? 4 : 0; lmSeg(S, M, x0, ld, x0 - x0*al, ld, C.rise, 1.2, [4, 4]); c.lineDashOffset = 0;
        if (al > 0.9){ lmPunto(S, M, 0, li, C.sec, false, 2.6); if (ld !== li) lmPunto(S, M, 0, ld, C.rise, false, 2.6); }
        /* las dos flechas caminan sobre la curva hacia x = a */
        xa = x0 - 0.9 + 0.72*al; xb = x0 + 0.9 - 0.72*al;
        lmFlecha(S, M, x0 - 0.9, fi(x0 - 0.9), xa, fi(xa), C.sec, 1.8, 0, -7); lmFlecha(S, M, x0 + 0.9, fd(x0 + 0.9), xb, fd(xb), C.rise, 1.8, 0, L[6]);
      });
      /* los puntos marcados de la gráfica van encima de las líneas */
      if (ap(1) > 0.9){ lmPunto(S, M, 0, 1, C.tan, false, 3.2); lmPunto(S, M, 3, 4, C.tan, true, 3.6); lmPunto(S, M, 3, 1, C.tan, false, 3.2); lmPunto(S, M, 5, 2, C.tan, true, 3.6); lmPunto(S, M, 5, 5, C.tan, false, 3.2); lmPunto(S, M, 8, 2, C.tan, false, 3.2); }
      /* frases junto a cada llegada */
      if (ap(2) > 0.6) frase('llegan a 3', 2, 3, 10, 17, C.ink);
      if (ap(3) > 0.6){ frase('llegan a 4', 3, 4, 0, -14, C.ink, 'center'); lmEtq(T, M, 'V3', 3, 1, -50, 0, 13); }
      if (ap(4) > 0.6){ frase('izquierda: llega a 2', 5, 2, -9, 15, C.sec, 'right'); frase('derecha: llega a 5', 5, 5, 10, -9, C.rise); }
      /* paso 5: se marca en el eje vertical lo que se comparó en cada lectura */
      a5 = ap(5);
      if (a5 > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.5; c.globalAlpha = a5; [3, 4, 2, 5].forEach(function(y){ c.beginPath(); c.arc(X(M.gx(0)), Y(M.gy(y)), 6, 0, 6.2832); c.stroke(); }); c.globalAlpha = 1; }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.66, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.66, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.75) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'G(x)=x+1\\ \\ (0\\le x<3);\\qquad G(3)=1' + Q + 'G(x)=7-x\\ \\ (3<x<5)' + Q + 'G(x)=10-x\\ \\ (5\\le x\\le 8)',
      'a=2:\\ \\text{a los dos lados, }y=x+1' + Q + '\\text{izquierda: }G(1{,}9)=1{,}9+1=2{,}9\\ \\to\\ 2+1=3' + Q + '\\text{derecha: }G(2{,}1)=2{,}1+1=3{,}1\\ \\to\\ 2+1=3' + Q + '\\text{llegadas iguales: }\\lim_{x\\to 2}G(x)=3\\ \\ (\\text{y }G(2)=3)',
      'a=3:\\ \\text{izquierda, }y=x+1;\\ \\text{derecha, }y=7-x' + Q + '\\text{izquierda: }G(2{,}9)=2{,}9+1=3{,}9\\ \\to\\ 3+1=4' + Q + '\\text{derecha: }G(3{,}1)=7-3{,}1=3{,}9\\ \\to\\ 7-3=4' + Q + '\\text{llegadas iguales: }\\lim_{x\\to 3}G(x)=4\\ \\ (\\text{y }G(3)=1\\ne 4)',
      'a=5:\\ \\text{izquierda, }y=7-x;\\ \\text{derecha, }y=10-x' + Q + '\\text{izquierda: }G(4{,}9)=7-4{,}9=2{,}1\\ \\to\\ 7-5=2' + Q + '\\text{derecha: }G(5{,}1)=10-5{,}1=4{,}9\\ \\to\\ 10-5=5' + Q + '2\\ne 5:\\ \\lim_{x\\to 5}G(x)\\text{ no existe}\\ \\ (G(5)=5)',
      'a=2:\\ \\text{llegadas }3\\text{ y }3\\ \\Rightarrow\\ \\text{límite }3' + Q + 'a=3:\\ \\text{llegadas }4\\text{ y }4\\ \\Rightarrow\\ \\text{límite }4' + Q + 'a=5:\\ \\text{llegadas }2\\text{ y }5\\ \\Rightarrow\\ \\text{no hay límite}' + Q + '\\text{el valor }G(a)\\text{ no participó en ninguna lectura}']; return dtPasos(R.slice(0, k)); }
  };
})());
