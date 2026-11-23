/* L29 H11 · la definición formal, pieza por pieza: sobre f(x) = 5x − 2 con x ≠ 1 (hueco en (1, 3)), cada paso pone en la figura una pieza de la frase «para todo ε > 0 existe δ > 0 tal que, para todo x, 0 < |x − 1| < δ ⟹ |f(x) − 3| < ε» (por pasos) */
OA.scene('formal-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return 5*x - 2; }
  /* lugar (ahí f no está definida), valor de llegada, las dos tolerancias y la distancia con que se responde a cada una (la quinta parte) */
  var A = 1, L = 3, EPS = [1, 0.5], DEL = [0.2, 0.1];
  /* el marco muestra solo la zona cercana al hueco (1, 3): 0,6 ≤ x ≤ 1,4 y 1 ≤ y ≤ 5 */
  var M = lmMarco(-0.6, 0.55, 5.5, 4.4, 0.6, 1.4, 1, 5);
  var PZ = [['Q', '\\text{¿por qué el límite en }1\\text{ es }3\\text{?}', '¿por qué el límite en 1 es 3?', 'pt'], ['F', '\\Longrightarrow\\ \\delta=\\tfrac{\\varepsilon}{5}\\text{ sirve siempre}', '⟹ δ = ε/5 sirve siempre', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=5x-2', 'y = 5x − 2', 'c-tan'], ['LA', 'a=1', 'a = 1', ''], ['LL', 'L=3', 'L = 3', ''],
    ['E1', '\\varepsilon=1', 'ε = 1', 'c-alt'], ['E2', '\\varepsilon=0{,}5', 'ε = 0,5', 'c-alt'],
    ['D1', '\\delta=0{,}2', 'δ = 0,2', 'c-sec'], ['D2', '\\delta=0{,}1', 'δ = 0,1', 'c-sec'],
    ['NX', '\\text{entradas, }x\\ne 1', 'entradas, x ≠ 1', 'c-sec'],
    ['GEN', '\\text{regla: }\\delta=\\tfrac{\\varepsilon}{5}', 'regla: δ = ε/5', 'diff'],
    ['R1', 'f(x)=5x-2,\\ x\\ne 1;\\ \\ a=1;\\ \\ L=3', 'f(x) = 5x − 2, x ≠ 1; a = 1; L = 3', ''],
    ['R2', '\\text{para todo }\\varepsilon\\gt 0\\ \\ (\\text{aquí }\\varepsilon=1)', 'para todo ε > 0 (aquí ε = 1)', 'c-alt'],
    ['R3', '\\text{existe }\\delta\\gt 0\\ \\ (\\text{aquí }\\delta=0{,}2)', 'existe δ > 0 (aquí δ = 0,2)', 'c-sec'],
    ['R4', '\\text{para todo }x\\text{ con }0\\lt |x-1|\\lt 0{,}2', 'para todo x con 0 < |x − 1| < 0,2', 'c-sec'],
    ['R5', '\\text{se cumple }|f(x)-3|\\lt 1', 'se cumple |f(x) − 3| < 1', 'diff'],
    ['R6', '\\varepsilon=0{,}5\\ \\to\\ \\delta=0{,}1', 'ε = 0,5 → δ = 0,1', ''],
    ['R7', '0\\lt |x-1|\\lt \\tfrac{\\varepsilon}{5}\\ \\Rightarrow\\ |f(x)-3|\\lt \\varepsilon', '0 < |x − 1| < ε/5 ⟹ |f(x) − 3| < ε', 'diff']];
  var TXT = [['La gráfica de f es una recta con un hueco: f', 'no está definida en 1. Cerca de 1, llega a 3.'],
    ['Pieza 1, «para toda tolerancia»: se elige', 'una, aquí 1. Franja verde: alturas de 2 a 4.'],
    ['Pieza 2, «existe una distancia»: se responde', 'con 0,2. Franja azul: entradas de 0,8 a 1,2.'],
    ['Pieza 3, «para toda entrada de la franja,', 'salvo 1»: tramo azul del borde, con su hueco.'],
    ['Pieza 4, «entonces la salida cumple»: todas', 'las salidas (naranjo) caen en la franja verde.'],
    ['Otra tolerancia, 0,5: la distancia 0,2 ya no', 'sirve; con 0,1, sí. Las cuatro piezas otra vez.'],
    ['Regla: la quinta parte de la tolerancia. Sirve', 'para toda tolerancia: el límite es 3.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.4, y1:6.9}, aspect:13.3/6.6,
    aria:'Arriba, una franja dice qué muestra: la definición formal de límite, pieza por pieza, sobre una recta con un hueco. Animación en siete pasos sobre la gráfica de f de x igual a 5x menos 2 con x distinto de 1, vista de cerca alrededor del hueco de coordenadas 1 y 3. Uno: la recta, el hueco, y las punteadas hacia a igual a 1 en el borde de abajo y L igual a 3 en el borde izquierdo. Dos: la pieza «para todo épsilon mayor que cero»: una franja verde horizontal entre las alturas 2 y 4 marca la tolerancia épsilon igual a 1. Tres: la pieza «existe delta mayor que cero»: una franja azul vertical entre 0,8 y 1,2 marca la distancia delta igual a 0,2. Cuatro: la pieza «para todo x con cero menor que la distancia de x a 1, menor que delta»: un tramo azul grueso en el borde de abajo, entre 0,8 y 1,2, con un hueco en 1 y los extremos huecos, y sobre él el trozo de recta en naranjo. Cinco: la pieza «entonces la distancia de f de x a 3 es menor que épsilon»: un tramo naranjo grueso en el borde izquierdo, entre 2 y 4, con un hueco en 3, reúne las salidas; todas quedan dentro de la franja verde. Seis: las cuatro piezas otra vez con épsilon igual a 0,5 y delta igual a 0,1. Siete: la regla, delta igual a épsilon dividido por 5, que sirve para toda tolerancia; el límite es 3. Bajo la figura, un registro numerado guarda la pieza de cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(f\\), con hueco en \\((1,3)\\)</span><span><i class="sw alt"></i> tolerancia de la salida, \\(\\varepsilon\\)</span><span><i class="sw sec"></i> distancia de la entrada, \\(\\delta\\), y entradas que se revisan</span><span><i class="sw rise"></i> trozo de recta y salidas que resultan</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, b, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.88; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      function rect(xa, ya, xb, yb, col, al){ if (xb <= xa || yb <= ya) return; c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(M.gx(xa)), Y(M.gy(yb)), X(M.gx(xb)) - X(M.gx(xa)), Y(M.gy(ya)) - Y(M.gy(yb))); c.globalAlpha = 1; }
      /* cota: segmento fino con topes en los extremos (marca la tolerancia o la distancia, desde 3 o desde 1) */
      function cota(xa, ya, xb, yb, col){ var hx = ya === yb ? 0 : 3, hy = ya === yb ? 3 : 0; lmSeg(S, M, xa, ya, xb, yb, col, 1.4, 0); c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(M.gx(xa)) - hx, Y(M.gy(ya)) - hy); c.lineTo(X(M.gx(xa)) + hx, Y(M.gy(ya)) + hy); c.moveTo(X(M.gx(xb)) - hx, Y(M.gy(yb)) - hy); c.lineTo(X(M.gx(xb)) + hx, Y(M.gy(yb)) + hy); c.stroke(); }
      /* franja verde de la tolerancia e (horizontal), que crece de izquierda a derecha, con sus bordes punteados */
      function verde(e, al){ if (al <= 0) return; var xb = M.x0 + (M.x1 - M.x0)*al; rect(M.x0, L - e, xb, L + e, C.alt, 0.15); lmSeg(S, M, M.x0, L - e, xb, L - e, C.alt, 1, [4, 3]); lmSeg(S, M, M.x0, L + e, xb, L + e, C.alt, 1, [4, 3]); }
      /* franja azul de la distancia d (vertical), que crece de abajo hacia arriba, con sus bordes punteados */
      function azul(d, al){ if (al <= 0) return; var yb = M.y0 + (M.y1 - M.y0)*al; rect(A - d, M.y0, A + d, yb, C.sec, 0.13); lmSeg(S, M, A - d, M.y0, A - d, yb, C.sec, 1, [4, 3]); lmSeg(S, M, A + d, M.y0, A + d, yb, C.sec, 1, [4, 3]); }
      /* punto hueco chico, corrido (dx, dy) píxeles: un valor que NO entra (bordes de las franjas, y el lugar a o el valor L) */
      function hueco(x, y, dx, dy, col){ c.setLineDash([]); c.beginPath(); c.arc(X(M.gx(x)) + dx, Y(M.gy(y)) + dy, 2.6, 0, 6.2832); c.fillStyle = C.bg || '#fff'; c.fill(); c.lineWidth = 1.4; c.strokeStyle = col; c.stroke(); }
      /* entradas que se revisan: tramo azul grueso en el borde de abajo, de a − d a a + d, sin a ni los extremos; dy lo corre hacia adentro */
      function entradas(d, al, dy){ if (al <= 0) return; c.strokeStyle = C.sec; c.lineWidth = 3.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(M.gx(A - d*al)), Y(M.gy(M.y0)) + dy); c.lineTo(X(M.gx(A + d*al)), Y(M.gy(M.y0)) + dy); c.stroke(); hueco(A, M.y0, 0, dy, C.sec); if (al >= 1){ hueco(A - d, M.y0, 0, dy, C.sec); hueco(A + d, M.y0, 0, dy, C.sec); } }
      /* trozo de recta sobre esas entradas (naranjo), con los extremos huecos; el hueco de (1, 3) se dibuja al final, encima */
      function trozo(d, al){ if (al <= 0) return; lmCurva(S, M, f, A - d*al, A + d*al, C.rise, 3.2); if (al >= 1){ lmPunto(S, M, A - d, f(A - d), C.rise, true, 2.6); lmPunto(S, M, A + d, f(A + d), C.rise, true, 2.6); } }
      /* salidas que resultan: tramo naranjo grueso en el borde izquierdo, de f(a − d) a f(a + d), sin L ni los extremos; dx lo corre hacia adentro */
      function salidas(d, al, dx){ if (al <= 0) return; var e = f(A + d) - L; c.strokeStyle = C.rise; c.lineWidth = 3.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(M.gx(M.x0)) + dx, Y(M.gy(L - e*al))); c.lineTo(X(M.gx(M.x0)) + dx, Y(M.gy(L + e*al))); c.stroke(); hueco(M.x0, L, dx, 0, C.rise); if (al >= 1){ hueco(M.x0, L - e, dx, 0, C.rise); hueco(M.x0, L + e, dx, 0, C.rise); } }
      /* marca con su número: en el borde de abajo, o en el borde izquierdo si iz vale 1 */
      function marca(x, y, t, col, iz){ var px = X(M.gx(x)), py = Y(M.gy(y)); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); if (!iz){ c.moveTo(px, py); c.lineTo(px, py + 4); c.stroke(); lmNum(S, M, t, x, y, 0, 11, col); } else { c.moveTo(px, py); c.lineTo(px - 4, py); c.stroke(); lmNum(S, M, t, x, y, -7, 0, col, 'right'); } }
      dtQue(S, 'la definición formal, pieza por pieza,', 'sobre una recta con hueco: qué pide cada una.');
      /* franjas (al fondo): pasos 2, 3 y 6 */
      verde(EPS[0], ap(2)); azul(DEL[0], ap(3));
      a = ap(6); verde(EPS[1], Math.min(1, a*3)); azul(DEL[1], Math.max(0, Math.min(1, a*3 - 1)));
      /* marco de la vista ampliada, con sus marcas y números */
      c.setLineDash([]); c.strokeStyle = mu; c.lineWidth = 1; c.strokeRect(X(M.gx(M.x0)), Y(M.gy(M.y1)), X(M.gx(M.x1)) - X(M.gx(M.x0)), Y(M.gy(M.y0)) - Y(M.gy(M.y1)));
      [0.6, 0.8, 1, 1.2, 1.4].forEach(function(x){ marca(x, M.y0, lmT(x, 2), x === 1 ? C.ink : mu); }); [1, 2, 3, 4, 5].forEach(function(y){ marca(M.x0, y, lmT(y, 2), y === 3 ? C.ink : mu, 1); });
      lmEtq(T, M, 'EX', M.x1, M.y0, 0, 7, 0); lmEtq(T, M, 'EY', M.x0, M.y1, -100, -3, -13);
      /* paso 1: la recta y las punteadas desde el hueco hacia a = 1 y L = 3 */
      a = ap(1);
      lmCurva(S, M, f, M.x0, M.x0 + (M.x1 - M.x0)*Math.min(1, a*2), C.tan, 2);
      if (a > 0.5){ b = Math.min(1, a*2 - 1); lmSeg(S, M, A, L, A, L - (L - M.y0)*b, mu, 1); lmSeg(S, M, A, L, A - (A - M.x0)*b, L, mu, 1); }
      if (a > 0.9){ lmEtq(T, M, 'CF', 1.325, 4.8, -100); lmFondo(S, M, 'LA', 0.99, 1.6, -100); lmEtq(T, M, 'LA', 0.99, 1.6, -100); lmFondo(S, M, 'LL', M.x0, 3.2, 0, 13, 0); lmEtq(T, M, 'LL', M.x0, 3.2, 0, 13, 0); frase('hueco: ahí f no', 1.03, 2.76, 0, 0, C.tan); frase('está definida', 1.03, 2.5, 0, 0, C.tan); }
      /* paso 2: «para todo ε > 0», con la tolerancia 1 (cota de 3 a 4) */
      a = ap(2);
      if (a > 0.6){ marca(M.x0, 2, '2', C.alt, 1); marca(M.x0, 4, '4', C.alt, 1); cota(1.385, L, 1.385, L + EPS[0], C.alt); lmEtq(T, M, 'E1', 1.375, 3.84, -100); }
      /* paso 3: «existe δ > 0», con la distancia 0,2 (cota de 1 a 1,2) */
      a = ap(3);
      if (a > 0.6){ marca(0.8, M.y0, '0,8', C.sec); marca(1.2, M.y0, '1,2', C.sec); cota(A, 1.3, A + DEL[0], 1.3, C.sec); lmFondo(S, M, 'D1', 1.21, 1.3, 0); lmEtq(T, M, 'D1', 1.21, 1.3, 0); }
      /* paso 4: «para todo x con 0 < |x − 1| < δ»: las entradas (borde de abajo) y el trozo de recta sobre ellas */
      a = ap(4); entradas(DEL[0], Math.min(1, a*2), -2); trozo(DEL[0], Math.max(0, a*2 - 1));
      if (a > 0.5){ lmFondo(S, M, 'NX', 0.985, 1.3, -100); lmEtq(T, M, 'NX', 0.985, 1.3, -100); }
      /* paso 5: «entonces |f(x) − 3| < ε»: las salidas (borde izquierdo) caen dentro de la franja verde */
      a = ap(5); salidas(DEL[0], a, 2);
      if (a > 0.5){ frase('salidas: dentro', 0.615, 3.86, 6, 0, C.rise); frase('de la franja verde', 0.615, 3.62, 6, 0, C.rise); }
      /* paso 6: las cuatro piezas otra vez, con la tolerancia 0,5 y la distancia 0,1 */
      a = ap(6); entradas(DEL[1], Math.max(0, Math.min(1, a*3 - 1)), -7); trozo(DEL[1], Math.max(0, Math.min(1, a*3 - 2))); salidas(DEL[1], Math.max(0, Math.min(1, a*3 - 2)), 7);
      if (a > 0.3){ marca(M.x0, 2.5, '2,5', C.alt, 1); marca(M.x0, 3.5, '3,5', C.alt, 1); cota(1.25, L, 1.25, L + EPS[1], C.alt); lmEtq(T, M, 'E2', 1.262, 3.25, 0); }
      if (a > 0.6){ marca(0.9, M.y0, '0,9', C.sec); marca(1.1, M.y0, '1,1', C.sec); cota(A, 1.6, A + DEL[1], 1.6, C.sec); lmFondo(S, M, 'D2', 1.11, 1.6, 0); lmEtq(T, M, 'D2', 1.11, 1.6, 0); }
      /* el hueco (1, 3), sobre todo lo demás: la gráfica no tiene punto ahí */
      if (ap(1) > 0.5) lmPunto(S, M, A, L, C.tan, true, 3.2);
      /* paso 7: la regla general */
      a = ap(7);
      if (a > 0.3){ lmEtq(T, M, 'GEN', 0.625, 4.76, 0); }
      if (a > 0.6){ frase('la quinta parte de la tolerancia', 0.625, 4.47, 0, 0, C.rise); frase('sirve siempre: el límite es 3', 0.625, 4.21, 0, 0, C.rise); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.56, 0); if (k === N && u > 0.5) T.L('F', 5.2, 5.56, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.75) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=5x-2\\text{ si }x\\ne 1;\\ \\ a=1;\\ \\ L=3' + Q + 'f(1)\\text{ no está definida: hueco en }(1,3)' + Q + '\\text{cerca de }1:\\ \\ 5\\cdot 0{,}9=4{,}5;\\ \\ f(0{,}9)=4{,}5-2=2{,}5' + Q + '5\\cdot 1{,}1=5{,}5;\\ \\ f(1{,}1)=5{,}5-2=3{,}5' + Q + '\\text{distancias a }3:\\ \\ |2{,}5-3|=0{,}5;\\ \\ |3{,}5-3|=0{,}5' + Q + '\\text{se propone }L=3\\text{; hay que demostrarlo}',
      '\\text{pieza 1: «para todo }\\varepsilon\\gt 0\\text{»}' + Q + '\\text{alguien elige la tolerancia; aquí }\\varepsilon=1' + Q + '\\text{se pedirá }|f(x)-3|\\lt 1' + Q + '\\text{es decir: }3-1\\lt f(x)\\lt 3+1' + Q + '3-1=2;\\ \\ 3+1=4' + Q + '\\text{franja verde: }2\\lt f(x)\\lt 4',
      '\\text{pieza 2: «existe }\\delta\\gt 0\\text{»; borrador para hallarla:}' + Q + 'f(x)-3=5x-2-3=5x-5' + Q + '\\text{factor común: }5x-5=5\\,(x-1)' + Q + '|f(x)-3|=|5|\\cdot|x-1|=5\\,|x-1|' + Q + '\\text{se quiere }5\\,|x-1|\\lt 1' + Q + '\\text{se divide por }5:\\ \\ |x-1|\\lt \\tfrac{1}{5}=0{,}2' + Q + '\\text{respuesta: }\\delta=0{,}2',
      '\\text{pieza 3: «para todo }x\\text{ con }0\\lt |x-1|\\lt 0{,}2\\text{»}' + Q + '|x-1|\\lt 0{,}2:\\ \\ 1-0{,}2\\lt x\\lt 1+0{,}2' + Q + '1-0{,}2=0{,}8;\\ \\ 1+0{,}2=1{,}2' + Q + '0\\lt |x-1|:\\ \\ x\\ne 1' + Q + '\\text{entradas: }0{,}8\\lt x\\lt 1{,}2,\\ x\\ne 1' + Q + '\\text{son todas, no algunas}',
      '\\text{pieza 4: «entonces }|f(x)-3|\\lt 1\\text{»; demostración:}' + Q + '\\text{se parte de }|x-1|\\lt 0{,}2' + Q + '\\text{se multiplica por }5:\\ \\ 5\\,|x-1|\\lt 5\\cdot 0{,}2=1' + Q + '\\text{como }|f(x)-3|=5\\,|x-1|:\\ \\ |f(x)-3|\\lt 1' + Q + '\\text{prueba: }5\\cdot 1{,}15=5{,}75;\\ \\ f(1{,}15)=5{,}75-2=3{,}75' + Q + '|1{,}15-1|=0{,}15\\lt 0{,}2;\\ \\ |3{,}75-3|=0{,}75\\lt 1' + Q + '\\text{salidas: }2\\lt f(x)\\lt 4,\\ f(x)\\ne 3',
      '\\text{otra tolerancia: }\\varepsilon=0{,}5' + Q + '3-0{,}5=2{,}5;\\ \\ 3+0{,}5=3{,}5' + Q + '\\delta=0{,}2\\text{ ya no sirve: }f(1{,}15)=3{,}75\\gt 3{,}5' + Q + '\\text{nueva respuesta: }\\tfrac{0{,}5}{5}=0{,}1;\\ \\ \\delta=0{,}1' + Q + '1-0{,}1=0{,}9;\\ \\ 1+0{,}1=1{,}1' + Q + '5\\,|x-1|\\lt 5\\cdot 0{,}1=0{,}5' + Q + '\\text{prueba: }5\\cdot 0{,}94=4{,}7;\\ \\ f(0{,}94)=4{,}7-2=2{,}7' + Q + '|0{,}94-1|=0{,}06\\lt 0{,}1;\\ \\ |2{,}7-3|=0{,}3\\lt 0{,}5',
      '\\text{las dos respuestas siguen la regla }\\delta=\\tfrac{\\varepsilon}{5}:' + Q + '\\tfrac{1}{5}=0{,}2;\\ \\ \\tfrac{0{,}5}{5}=0{,}1' + Q + '\\text{para cualquier }\\varepsilon\\gt 0\\text{: si }0\\lt |x-1|\\lt \\tfrac{\\varepsilon}{5},' + Q + '|f(x)-3|=5\\,|x-1|\\lt 5\\cdot \\tfrac{\\varepsilon}{5}=\\varepsilon' + Q + '\\text{la frase completa se cumple: el límite es }3' + Q + 'f(1)\\text{ no se usó en ningún paso}']; return dtPasos(R.slice(0, k)); }
  };
})());
