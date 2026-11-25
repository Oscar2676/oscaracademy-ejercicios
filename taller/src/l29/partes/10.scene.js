/* L29 H10 · ideas para la definición formal: a cada tolerancia de la salida (franja verde) se responde con una distancia de la entrada (franja azul) que la garantiza; con f(x) = 2x + 1 en a = 3 sirve la mitad de la tolerancia (por pasos) */
OA.scene('eps-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  function f(x){ return 2*x + 1; }
  /* lugar, valor de llegada, las tres tolerancias y la distancia con que se responde a cada una (la mitad) */
  var A = 3, L = 7, EPS = [1, 0.5, 0.1], DEL = [0.5, 0.25, 0.05];
  /* el marco muestra solo la zona cercana al punto (3, 7): 1,8 ≤ x ≤ 4,2 y 4,7 ≤ y ≤ 9,3 */
  var M = lmMarco(-0.6, 0.55, 5.5, 4.4, 1.8, 4.2, 4.7, 9.3);
  var PZ = [['Q', '\\text{tolerancia }\\varepsilon\\text{: ¿qué distancia }\\delta\\text{ sirve?}', 'tolerancia ε: ¿qué distancia δ sirve?', 'pt'], ['F', '\\Longrightarrow\\ \\delta=\\tfrac{\\varepsilon}{2}', '⟹ δ = ε/2', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=2x+1', 'y = 2x + 1', 'c-tan'], ['LA', 'a=3', 'a = 3', ''], ['LL', 'L=7', 'L = 7', ''],
    ['E1', '\\varepsilon=1', 'ε = 1', 'c-alt'], ['E2', '\\varepsilon=0{,}5', 'ε = 0,5', 'c-alt'], ['E3', '\\varepsilon=0{,}1', 'ε = 0,1', 'c-alt'],
    ['D1', '\\delta=0{,}5', 'δ = 0,5', 'c-sec'], ['D2', '\\delta=0{,}25', 'δ = 0,25', 'c-sec'], ['D3', '\\delta=0{,}05', 'δ = 0,05', 'c-sec'],
    ['GEN', '\\text{regla: }\\delta=\\tfrac{\\varepsilon}{2}', 'regla: δ = ε/2', 'diff'],
    ['R1', 'f(x)=2x+1;\\ \\ a=3;\\ \\ L=7', 'f(x) = 2x + 1; a = 3; L = 7', ''],
    ['R2', '\\varepsilon=1:\\ \\ 6\\lt f(x)\\lt 8', 'ε = 1: 6 < f(x) < 8', 'c-alt'],
    ['R3', '\\delta=0{,}5:\\ \\ 2{,}5\\lt x\\lt 3{,}5\\ \\Rightarrow\\ 6\\lt f(x)\\lt 8', 'δ = 0,5: 2,5 < x < 3,5 ⟹ 6 < f(x) < 8', 'c-sec'],
    ['R4', '\\varepsilon=0{,}5\\ \\to\\ \\delta=0{,}25', 'ε = 0,5 → δ = 0,25', ''],
    ['R5', '\\varepsilon=0{,}1\\ \\to\\ \\delta=0{,}05', 'ε = 0,1 → δ = 0,05', ''],
    ['R6', '0\\lt |x-3|\\lt \\tfrac{\\varepsilon}{2}\\ \\Rightarrow\\ |f(x)-7|\\lt \\varepsilon', '0 < |x − 3| < ε/2 ⟹ |f(x) − 7| < ε', 'diff']];
  var TXT = [['La recta es la gráfica de f. Cuando x se acerca a', '3, la altura de la recta se acerca a 7.'],
    ['Alguien fija una tolerancia para la salida: 1.', 'La altura debe quedar dentro de la franja verde.'],
    ['Respuesta: distancia 0,5 para la entrada. Sobre', 'la franja azul, la recta no sale de la verde.'],
    ['Tolerancia más exigente: 0,5. La distancia de', 'antes ya no sirve; con 0,25, sí.'],
    ['Tolerancia 0,1: sirve la distancia 0,05. Las', 'franjas se angostan y siempre hay respuesta.'],
    ['Regla: la mitad de la tolerancia. Sirve para', 'toda tolerancia, por chica que sea.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.7, y1:6.9}, aspect:12.6/6.6,
    aria:'Arriba, una franja dice qué muestra: para cada tolerancia de la salida hay una distancia de la entrada que la garantiza. Animación en seis pasos sobre la gráfica de f de x igual a 2x más 1, vista de cerca alrededor del punto de coordenadas 3 y 7. Uno: la recta, el punto, y las punteadas hacia a igual a 3 en el eje horizontal y L igual a 7 en el eje vertical. Dos: una franja verde horizontal entre las alturas 6 y 8 marca la tolerancia épsilon igual a 1. Tres: una franja azul vertical entre 2,5 y 3,5 marca la distancia delta igual a 0,5; el trozo de recta sobre la franja azul, en naranjo, queda dentro de la franja verde. Cuatro: una franja verde más angosta, entre 6,5 y 7,5, para épsilon igual a 0,5, y su franja azul entre 2,75 y 3,25, para delta igual a 0,25. Cinco: franjas todavía más angostas para épsilon igual a 0,1 y delta igual a 0,05. Seis: la regla, delta igual a épsilon dividido por 2, que sirve para toda tolerancia. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(f\\)</span><span><i class="sw alt"></i> tolerancia de la salida, \\(\\varepsilon\\)</span><span><i class="sw sec"></i> distancia de la entrada, \\(\\delta\\)</span><span><i class="sw rise"></i> trozo de recta que queda dentro</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, b, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.88; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      function rect(xa, ya, xb, yb, col, al){ if (xb <= xa || yb <= ya) return; c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(M.gx(xa)), Y(M.gy(yb)), X(M.gx(xb)) - X(M.gx(xa)), Y(M.gy(ya)) - Y(M.gy(yb))); c.globalAlpha = 1; }
      /* cota: segmento fino con topes en los extremos (marca la tolerancia o la distancia, desde 7 o desde 3) */
      function cota(xa, ya, xb, yb, col){ var hx = ya === yb ? 0 : 3, hy = ya === yb ? 3 : 0; lmSeg(S, M, xa, ya, xb, yb, col, 1.4, 0); c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(M.gx(xa)) - hx, Y(M.gy(ya)) - hy); c.lineTo(X(M.gx(xa)) + hx, Y(M.gy(ya)) + hy); c.moveTo(X(M.gx(xb)) - hx, Y(M.gy(yb)) - hy); c.lineTo(X(M.gx(xb)) + hx, Y(M.gy(yb)) + hy); c.stroke(); }
      /* franja verde de la tolerancia e (horizontal), que crece de izquierda a derecha, con sus bordes punteados */
      function verde(e, al){ if (al <= 0) return; var xb = M.x0 + (M.x1 - M.x0)*al; rect(M.x0, L - e, xb, L + e, C.alt, 0.15); lmSeg(S, M, M.x0, L - e, xb, L - e, C.alt, 1, [4, 3]); lmSeg(S, M, M.x0, L + e, xb, L + e, C.alt, 1, [4, 3]); }
      /* franja azul de la distancia d (vertical), que crece de abajo hacia arriba, con sus bordes punteados */
      function azul(d, al){ if (al <= 0) return; var yb = M.y0 + (M.y1 - M.y0)*al; rect(A - d, M.y0, A + d, yb, C.sec, 0.13); lmSeg(S, M, A - d, M.y0, A - d, yb, C.sec, 1, [4, 3]); lmSeg(S, M, A + d, M.y0, A + d, yb, C.sec, 1, [4, 3]); }
      /* trozo de recta sobre la franja azul (naranjo) y sus dos extremos, huecos: son los bordes, que no entran */
      function trozo(d, al){ if (al <= 0) return; lmCurva(S, M, f, A - d*al, A + d*al, C.rise, 3.2); if (al >= 1){ lmPunto(S, M, A - d, f(A - d), C.rise, true, 2.6); lmPunto(S, M, A + d, f(A + d), C.rise, true, 2.6); } }
      function marca(x, y, t, col){ var px = X(M.gx(x)), py = Y(M.gy(y)); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); if (y === M.y0){ c.moveTo(px, py); c.lineTo(px, py + 4); c.stroke(); lmNum(S, M, t, x, y, 0, 11, col); } else { c.moveTo(px, py); c.lineTo(px - 4, py); c.stroke(); lmNum(S, M, t, x, y, -7, 0, col, 'right'); } }
      dtQue(S, 'para cada tolerancia de la salida hay una', 'distancia de la entrada que la garantiza.');
      /* franjas (al fondo): pasos 2 a 5 */
      verde(EPS[0], ap(2)); azul(DEL[0], ap(3));
      a = ap(4); verde(EPS[1], Math.min(1, a*2)); azul(DEL[1], Math.max(0, a*2 - 1));
      a = ap(5); verde(EPS[2], Math.min(1, a*2)); azul(DEL[2], Math.max(0, a*2 - 1));
      /* marco de la vista ampliada, con sus marcas y números */
      c.setLineDash([]); c.strokeStyle = mu; c.lineWidth = 1; c.strokeRect(X(M.gx(M.x0)), Y(M.gy(M.y1)), X(M.gx(M.x1)) - X(M.gx(M.x0)), Y(M.gy(M.y0)) - Y(M.gy(M.y1)));
      [2, 2.5, 3, 3.5, 4].forEach(function(x){ marca(x, M.y0, lmT(x, 2), x === 3 ? C.ink : mu); }); [5, 6, 7, 8, 9].forEach(function(y){ marca(M.x0, y, lmT(y, 2), y === 7 ? C.ink : mu); });
      lmEtq(T, M, 'EX', M.x1, M.y0, 0, 7, 0); lmEtq(T, M, 'EY', M.x0, M.y1, 0, 5, 10);
      /* paso 1: la recta, el punto (3, 7) y las punteadas hacia a = 3 y L = 7 */
      a = ap(1);
      lmCurva(S, M, f, M.x0, M.x0 + (M.x1 - M.x0)*Math.min(1, a*2), C.tan, 2);
      if (a > 0.5){ b = Math.min(1, a*2 - 1); lmSeg(S, M, A, L, A, L - (L - M.y0)*b, mu, 1); lmSeg(S, M, A, L, A - (A - M.x0)*b, L, mu, 1); }
      if (a > 0.9){ lmEtq(T, M, 'CF', 3.9, 8.95, -100); lmFondo(S, M, 'LA', 2.96, 4.92, -100); lmEtq(T, M, 'LA', 2.96, 4.92, -100); lmFondo(S, M, 'LL', M.x0, 7.28, 0, 6, 0); lmEtq(T, M, 'LL', M.x0, 7.28, 0, 6, 0); }
      /* paso 2: tolerancia 1 (cota de 7 a 8) */
      a = ap(2);
      if (a > 0.6){ marca(M.x0, 6, '6', C.alt); marca(M.x0, 8, '8', C.alt); cota(4.12, L, 4.12, L + EPS[0], C.alt); lmEtq(T, M, 'E1', 4.08, 7.76, -100); }
      /* paso 3: distancia 0,5 (cota de 3 a 3,5) y el trozo de recta que queda dentro */
      a = ap(3); trozo(DEL[0], a);
      if (a > 0.6){ marca(2.5, M.y0, '2,5', C.sec); marca(3.5, M.y0, '3,5', C.sec); cota(A, 4.98, A + DEL[0], 4.98, C.sec); lmFondo(S, M, 'D1', 3.54, 4.98, 0); lmEtq(T, M, 'D1', 3.54, 4.98, 0); }
      /* paso 4: tolerancia 0,5 y distancia 0,25 */
      a = ap(4); trozo(DEL[1], Math.max(0, a*2 - 1));
      if (a > 0.3){ marca(M.x0, 6.5, '6,5', C.alt); marca(M.x0, 7.5, '7,5', C.alt); cota(3.62, L, 3.62, L + EPS[1], C.alt); lmEtq(T, M, 'E2', 3.66, 7.29, 0); }
      if (a > 0.8){ marca(2.75, M.y0, '2,75', C.sec); marca(3.25, M.y0, '3,25', C.sec); cota(A, 5.36, A + DEL[1], 5.36, C.sec); lmFondo(S, M, 'D2', 3.29, 5.36, 0); lmEtq(T, M, 'D2', 3.29, 5.36, 0); }
      /* paso 5: tolerancia 0,1 y distancia 0,05 */
      a = ap(5); trozo(DEL[2], Math.max(0, a*2 - 1));
      if (a > 0.3){ lmSeg(S, M, 3.6, 6.9, 3.64, 6.78, C.alt, 1, 0); lmEtq(T, M, 'E3', 3.66, 6.7, 0); }
      if (a > 0.8){ cota(A, 5.74, A + DEL[2], 5.74, C.sec); lmFondo(S, M, 'D3', 3.1, 5.74, 0); lmEtq(T, M, 'D3', 3.1, 5.74, 0); }
      /* el punto (3, 7), sobre todo lo demás */
      if (ap(1) > 0.5) lmPunto(S, M, A, L, C.tan, false, 3);
      /* paso 6: la regla general */
      a = ap(6);
      if (a > 0.3){ lmEtq(T, M, 'GEN', 2.0, 8.98, 0); }
      if (a > 0.6){ frase('la mitad de la tolerancia', 2.0, 8.62, 0, 0, C.rise); frase('sirve siempre', 2.0, 8.33, 0, 0, C.rise); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.56, 0); if (k === N && u > 0.5) T.L('F', 5.2, 5.56, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.75) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136, 170]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=2x+1;\\ \\ a=3;\\ \\ L=7' + Q + '\\text{cerca de }3:\\ \\ f(2{,}9)=2\\cdot 2{,}9+1=5{,}8+1=6{,}8' + Q + 'f(3{,}1)=2\\cdot 3{,}1+1=6{,}2+1=7{,}2' + Q + '\\text{distancia de la entrada a }3:\\ \\ |2{,}9-3|=0{,}1' + Q + '\\text{distancia de la salida a }7:\\ \\ |6{,}8-7|=0{,}2' + Q + '\\text{la salida queda al doble: }0{,}2=2\\cdot 0{,}1',
      '\\text{tolerancia para la salida: }\\varepsilon=1' + Q + '\\text{se pide }|f(x)-7|\\lt 1' + Q + '\\text{es decir: }7-1\\lt f(x)\\lt 7+1' + Q + '7-1=6;\\ \\ 7+1=8' + Q + '\\text{franja verde: }6\\lt f(x)\\lt 8',
      '\\text{distancia de la salida a }7\\text{, con }|x-3|:' + Q + '|f(x)-7|=|2x+1-7|=|2x-6|' + Q + '|2x-6|=|2\\,(x-3)|=2\\,|x-3|' + Q + '\\text{se quiere }2\\,|x-3|\\lt 1' + Q + '\\text{dividido por }2:\\ \\ |x-3|\\lt \\tfrac{1}{2}=0{,}5' + Q + '\\text{respuesta: distancia }\\delta=0{,}5\\text{ para la entrada}' + Q + '3-0{,}5=2{,}5;\\ \\ 3+0{,}5=3{,}5' + Q + '\\text{franja azul: }2{,}5\\lt x\\lt 3{,}5,\\ x\\ne 3' + Q + '\\text{sirve: }2\\,|x-3|\\lt 2\\cdot 0{,}5=1' + Q + '\\text{prueba: }|3{,}4-3|=0{,}4\\lt 0{,}5' + Q + 'f(3{,}4)=2\\cdot 3{,}4+1=6{,}8+1=7{,}8' + Q + '|7{,}8-7|=0{,}8\\lt 1',
      '\\text{tolerancia más exigente: }\\varepsilon=0{,}5' + Q + '7-0{,}5=6{,}5;\\ \\ 7+0{,}5=7{,}5' + Q + '\\text{la distancia }0{,}5\\text{ ya no sirve: }f(3{,}4)=7{,}8\\gt 7{,}5' + Q + '\\text{se quiere }2\\,|x-3|\\lt 0{,}5' + Q + '\\text{dividido por }2:\\ \\ |x-3|\\lt \\tfrac{0{,}5}{2}=0{,}25' + Q + '\\text{nueva respuesta: }\\delta=0{,}25' + Q + '3-0{,}25=2{,}75;\\ \\ 3+0{,}25=3{,}25' + Q + '\\text{sirve: }2\\,|x-3|\\lt 2\\cdot 0{,}25=0{,}5' + Q + '\\text{prueba: }|3{,}2-3|=0{,}2\\lt 0{,}25' + Q + 'f(3{,}2)=2\\cdot 3{,}2+1=6{,}4+1=7{,}4' + Q + '|7{,}4-7|=0{,}4\\lt 0{,}5',
      '\\text{tolerancia }\\varepsilon=0{,}1:\\ \\ 7-0{,}1=6{,}9;\\ \\ 7+0{,}1=7{,}1' + Q + '\\text{se quiere }2\\,|x-3|\\lt 0{,}1' + Q + '\\text{dividido por }2:\\ \\ |x-3|\\lt \\tfrac{0{,}1}{2}=0{,}05' + Q + '\\text{respuesta: }\\delta=0{,}05' + Q + '3-0{,}05=2{,}95;\\ \\ 3+0{,}05=3{,}05' + Q + '\\text{sirve: }2\\,|x-3|\\lt 2\\cdot 0{,}05=0{,}1' + Q + '\\text{prueba: }|3{,}04-3|=0{,}04\\lt 0{,}05' + Q + 'f(3{,}04)=2\\cdot 3{,}04+1=6{,}08+1=7{,}08' + Q + '|7{,}08-7|=0{,}08\\lt 0{,}1',
      '\\text{en los tres casos se respondió con }\\delta=\\tfrac{\\varepsilon}{2}:' + Q + '\\tfrac{1}{2}=0{,}5;\\ \\ \\tfrac{0{,}5}{2}=0{,}25;\\ \\ \\tfrac{0{,}1}{2}=0{,}05' + Q + '\\text{para cualquier }\\varepsilon\\gt 0\\text{: si }0\\lt |x-3|\\lt \\tfrac{\\varepsilon}{2},' + Q + '|f(x)-7|=2\\,|x-3|\\lt 2\\cdot \\tfrac{\\varepsilon}{2}=\\varepsilon' + Q + '\\text{toda tolerancia tiene respuesta: el límite es }7']; return dtPasos(R.slice(0, k)); }
  };
})());
