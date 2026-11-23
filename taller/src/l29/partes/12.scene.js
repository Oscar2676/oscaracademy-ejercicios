/* L29 H12 · uso de la definición formal: con f(x) = x² en a = 1 y la tolerancia 0,96, los x cuya altura cae en la franja van de 0,2 a 1,4; las dos distancias a 1 son distintas (0,8 y 0,4) y sirve la menor; una distancia más chica también sirve (0,32), y de ahí la regla mín{1, ε/3} (por pasos) */
OA.scene('uso-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return x*x; }
  /* lugar, valor de llegada y tolerancia; extremos de la zona (0,2² = 0,04 y 1,4² = 1,96); las dos distancias que sirven (la mayor posible y una más chica) y el x de prueba de la distancia mala (0,8) */
  var A = 1, L = 1, EPS = 0.96, X1 = 0.2, X2 = 1.4, DEL = [0.4, 0.32], DM = 0.8, XM = 1.7;
  /* el marco muestra la gráfica para 0 ≤ x ≤ 2 y 0 ≤ y ≤ 3,2 */
  var M = lmMarco(-0.6, 0.55, 5.5, 4.4, 0, 2, 0, 3.2);
  var PZ = [['Q', '\\varepsilon=0{,}96\\text{: ¿qué distancia }\\delta\\text{ sirve?}', 'ε = 0,96: ¿qué distancia δ sirve?', 'pt'], ['F', '\\Longrightarrow\\ \\delta\\le 0{,}4', '⟹ δ ≤ 0,4', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=x^{2}', 'y = x²', 'c-tan'], ['LA', 'a=1', 'a = 1', ''], ['LL', 'L=1', 'L = 1', ''],
    ['E1', '\\varepsilon=0{,}96', 'ε = 0,96', 'c-alt'],
    ['DA', '0{,}8', '0,8', ''], ['DB', '0{,}4', '0,4', ''],
    ['D1', '\\delta=0{,}4', 'δ = 0,4', 'c-sec'], ['D2', '\\delta=0{,}32', 'δ = 0,32', 'c-sec'],
    ['PM', 'f(1{,}7)=2{,}89', 'f(1,7) = 2,89', ''],
    ['GEN', '\\delta=\\text{mín}\\{1,\\tfrac{\\varepsilon}{3}\\}', 'δ = mín{1, ε/3}', 'diff'],
    ['R1', 'f(x)=x^{2};\\ \\ a=1;\\ \\ L=1', 'f(x) = x²; a = 1; L = 1', ''],
    ['R2', '\\varepsilon=0{,}96:\\ \\ 0{,}04\\lt x^{2}\\lt 1{,}96', 'ε = 0,96: 0,04 < x² < 1,96', 'c-alt'],
    ['R3', '\\text{con }x\\gt 0:\\ \\ 0{,}2\\lt x\\lt 1{,}4', 'con x > 0: 0,2 < x < 1,4', 'diff'],
    ['R4', '1-0{,}2=0{,}8;\\ \\ 1{,}4-1=0{,}4', '1 − 0,2 = 0,8; 1,4 − 1 = 0,4', ''],
    ['R5', '\\delta=0{,}4;\\ \\ \\text{con }0{,}8:\\ f(1{,}7)=2{,}89\\gt 1{,}96', 'δ = 0,4; con 0,8: f(1,7) = 2,89 > 1,96', 'c-sec'],
    ['R6', '\\delta=0{,}32:\\ \\ |x^{2}-1|\\lt 0{,}32\\cdot 3=0{,}96', 'δ = 0,32: |x² − 1| < 0,32 · 3 = 0,96', 'c-sec'],
    ['R7', '\\delta=\\text{mín}\\{1,\\tfrac{\\varepsilon}{3}\\}\\ \\Rightarrow\\ |x^{2}-1|\\lt \\varepsilon', 'δ = mín{1, ε/3} ⟹ |x² − 1| < ε', 'diff']];
  var TXT = [['La curva es la gráfica de f. Cuando x se acerca', 'a 1, la altura de la curva se acerca a 1.'],
    ['Tolerancia para la salida: 0,96. La altura debe', 'quedar en la franja verde, entre 0,04 y 1,96.'],
    ['El trozo naranjo de la curva está en la franja.', 'Bajo él, en el eje: los x entre 0,2 y 1,4.'],
    ['De 1 al extremo izquierdo hay 0,8; al derecho,', '0,4. La zona no es simétrica respecto de 1.'],
    ['Sirve la menor distancia: 0,4. Con 0,8 falla:', 'el punto negro, sobre 1,7, sale de la franja.'],
    ['Una distancia menor también sirve: 0,32. Es la', 'franja azul angosta, dentro de la anterior.'],
    ['Regla para toda tolerancia: el menor entre 1 y', 'la tercera parte de la tolerancia.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.35, y1:6.9}, aspect:13.25/6.6,
    aria:'Arriba, una franja dice qué muestra: con una curva, la zona de los x no es simétrica y sirve la menor de las dos distancias. Animación en siete pasos sobre la gráfica de f de x igual a x al cuadrado, para x entre 0 y 2. Uno: la curva, el punto de coordenadas 1 y 1, y las punteadas hacia a igual a 1 en el borde de abajo y L igual a 1 en el borde izquierdo. Dos: una franja verde horizontal entre las alturas 0,04 y 1,96 marca la tolerancia épsilon igual a 0,96. Tres: el trozo de curva que queda dentro de la franja, en naranjo, y debajo, sobre el eje, la zona de los x entre 0,2 y 1,4. Cuatro: dos cotas sobre el eje: de 0,2 a 1 hay 0,8 y de 1 a 1,4 hay 0,4. Cinco: una franja azul vertical entre 0,6 y 1,4 marca la distancia delta igual a 0,4, la menor de las dos; una punteada negra en 1,8 marca hasta dónde llegaría la distancia 0,8, y un punto negro en x igual a 1,7, de altura 2,89, muestra que con la distancia 0,8 la curva sale de la franja verde. Seis: una franja azul más angosta, entre 0,68 y 1,32, para delta igual a 0,32. Siete: la regla general, delta igual al menor entre 1 y épsilon dividido por 3. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(f\\)</span><span><i class="sw alt"></i> tolerancia de la salida, \\(\\varepsilon\\)</span><span><i class="sw rise"></i> trozo de curva dentro de la franja y su zona de \\(x\\)</span><span><i class="sw sec"></i> distancia de la entrada, \\(\\delta\\)</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, b, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.88; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      function rect(xa, ya, xb, yb, col, al){ if (xb <= xa || yb <= ya) return; c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(M.gx(xa)), Y(M.gy(yb)), X(M.gx(xb)) - X(M.gx(xa)), Y(M.gy(ya)) - Y(M.gy(yb))); c.globalAlpha = 1; }
      /* cota: segmento fino con topes en los extremos (marca una tolerancia o una distancia) */
      function cota(xa, ya, xb, yb, col){ var hx = ya === yb ? 0 : 3, hy = ya === yb ? 3 : 0; lmSeg(S, M, xa, ya, xb, yb, col, 1.4, 0); c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(M.gx(xa)) - hx, Y(M.gy(ya)) - hy); c.lineTo(X(M.gx(xa)) + hx, Y(M.gy(ya)) + hy); c.moveTo(X(M.gx(xb)) - hx, Y(M.gy(yb)) - hy); c.lineTo(X(M.gx(xb)) + hx, Y(M.gy(yb)) + hy); c.stroke(); }
      /* franja azul de la distancia d (vertical), que crece de abajo hacia arriba, con sus bordes punteados */
      function azul(d, al){ if (al <= 0) return; var yb = M.y0 + (M.y1 - M.y0)*al; rect(A - d, M.y0, A + d, yb, C.sec, 0.13); lmSeg(S, M, A - d, M.y0, A - d, yb, C.sec, 1, [4, 3]); lmSeg(S, M, A + d, M.y0, A + d, yb, C.sec, 1, [4, 3]); }
      /* marca con su número en el borde de abajo, en el de arriba o en el izquierdo del marco */
      function marca(x, y, t, col){ var px = X(M.gx(x)), py = Y(M.gy(y)); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); if (y === M.y0){ c.moveTo(px, py); c.lineTo(px, py + 4); c.stroke(); lmNum(S, M, t, x, y, 0, 11, col); } else if (y === M.y1){ c.moveTo(px, py); c.lineTo(px, py - 4); c.stroke(); lmNum(S, M, t, x, y, 0, -10, col); } else { c.moveTo(px, py); c.lineTo(px - 4, py); c.stroke(); lmNum(S, M, t, x, y, -7, 0, col, 'right'); } }
      dtQue(S, 'con una curva, la zona de los x no es', 'simétrica: sirve la menor de las dos distancias.');
      /* franjas (al fondo): la verde de la tolerancia (paso 2) y las azules de las distancias (pasos 5 y 6) */
      a = ap(2);
      if (a > 0){ b = M.x0 + (M.x1 - M.x0)*a; rect(M.x0, L - EPS, b, L + EPS, C.alt, 0.15); lmSeg(S, M, M.x0, L - EPS, b, L - EPS, C.alt, 1, [4, 3]); lmSeg(S, M, M.x0, L + EPS, b, L + EPS, C.alt, 1, [4, 3]); }
      azul(DEL[0], Math.min(1, ap(5)*2)); azul(DEL[1], Math.min(1, ap(6)*1.6));
      /* marco, con sus marcas y números */
      c.setLineDash([]); c.strokeStyle = mu; c.lineWidth = 1; c.strokeRect(X(M.gx(M.x0)), Y(M.gy(M.y1)), X(M.gx(M.x1)) - X(M.gx(M.x0)), Y(M.gy(M.y0)) - Y(M.gy(M.y1)));
      marca(2, M.y0, '2', mu); marca(M.x0, 2.5, '2,5', mu); marca(M.x0, 3, '3', mu);
      lmEtq(T, M, 'EX', M.x1, M.y0, 0, 7, 0); lmEtq(T, M, 'EY', M.x0, M.y1, 0, 5, 10);
      /* paso 1: la curva, el punto (1, 1), la punteada vertical por a = 1 y la horizontal hacia L = 1 */
      a = ap(1);
      lmCurva(S, M, f, M.x0, M.x0 + (M.x1 - M.x0)*Math.min(1, a*2), C.tan, 2);
      if (a > 0.5){ b = Math.min(1, a*2 - 1); lmSeg(S, M, A, M.y0, A, M.y0 + (M.y1 - M.y0)*b, mu, 1); lmSeg(S, M, A, L, A - (A - M.x0)*b, L, mu, 1); }
      if (a > 0.9){ lmFondo(S, M, 'CF', 1.43, 1.72, 0); lmEtq(T, M, 'CF', 1.43, 1.72, 0); lmEtq(T, M, 'LA', A, M.y0, -50, 0, 12); lmEtq(T, M, 'LL', M.x0, L, -100, -6, 0); }
      /* paso 2: tolerancia 0,96 (cota de 1 a 1,96) y los bordes de la franja */
      a = ap(2);
      if (a > 0.6){ marca(M.x0, 0.04, '0,04', C.alt); marca(M.x0, 1.96, '1,96', C.alt); cota(0.07, L, 0.07, L + EPS, C.alt); lmEtq(T, M, 'E1', 0.1, 1.5, 0); }
      /* paso 3: el trozo de curva dentro de la franja (naranjo) y, en el eje, la zona de sus x */
      a = ap(3);
      if (a > 0){ lmCurva(S, M, f, A - (A - X1)*a, A + (X2 - A)*a, C.rise, 3.2); lmSeg(S, M, A - (A - X1)*a, M.y0, A + (X2 - A)*a, M.y0, C.rise, 3.2, 0); }
      if (a >= 1){ lmSeg(S, M, X2, M.y0, X2, f(X2), C.rise, 1); lmSeg(S, M, X1, M.y0, X1, f(X1), C.rise, 1); lmPunto(S, M, X1, f(X1), C.rise, true, 2.6); lmPunto(S, M, X2, f(X2), C.rise, true, 2.6); lmPunto(S, M, X1, M.y0, C.rise, true, 2.6); lmPunto(S, M, X2, M.y0, C.rise, true, 2.6); marca(X1, M.y0, '0,2', C.rise); marca(X2, M.y0, '1,4', C.rise); }
      /* paso 5 (antes de las frases): el x de prueba de la distancia 0,8 y su punto, fuera de la franja */
      b = Math.max(0, ap(5)*2 - 1);
      if (b > 0){ lmSeg(S, M, XM, M.y0, XM, f(XM)*b, C.ink, 1); marca(XM, M.y0, '1,7', C.ink); lmSeg(S, M, A + DM, M.y0, A + DM, M.y0 + (M.y1 - M.y0)*b, C.ink, 1, [2, 4]); marca(A + DM, M.y1, '1,8', C.ink); }
      if (ap(3) >= 1) frase('zona de los x', 1.45, 0.15, 0, 0, C.rise);
      /* paso 4: las dos distancias, de 1 a cada extremo de la zona */
      a = ap(4);
      if (a > 0){ cota(A, 0.3, A - (A - X1)*a, 0.3, mu); cota(A, 0.3, A + (X2 - A)*a, 0.3, mu); }
      if (a > 0.7){ lmFondo(S, M, 'DA', 0.36, 0.3, -50, 0, -11); lmEtq(T, M, 'DA', 0.36, 0.3, -50, 0, -11); lmFondo(S, M, 'DB', 1.2, 0.3, -50, 0, -11); lmEtq(T, M, 'DB', 1.2, 0.3, -50, 0, -11); }
      /* paso 5: distancia 0,4 (cota de 0,6 a 1) y el punto que muestra por qué 0,8 no sirve */
      a = ap(5);
      if (a > 0.4){ marca(A - DEL[0], M.y0, '0,6', C.sec); cota(A - DEL[0], 1.3, A, 1.3, C.sec); lmFondo(S, M, 'D1', 0.8, 1.3, -50, 0, -11); lmEtq(T, M, 'D1', 0.8, 1.3, -50, 0, -11); }
      if (b >= 1){ lmPunto(S, M, XM, f(XM), C.ink, false, 3); lmFondo(S, M, 'PM', 1.65, 2.95, -100); lmEtq(T, M, 'PM', 1.65, 2.95, -100); frase('sale de la franja', 1.57, 2.7, 0, 0, C.ink, 'right'); }
      /* paso 6: distancia 0,32 (cota de 0,68 a 1), con sus bordes anotados arriba */
      a = ap(6);
      if (a > 0.6){ marca(A - DEL[1], M.y1, '0,68', C.sec); marca(A + DEL[1], M.y1, '1,32', C.sec); cota(A - DEL[1], 2.12, A, 2.12, C.sec); lmFondo(S, M, 'D2', 0.83, 2.12, -50, 0, -11); lmEtq(T, M, 'D2', 0.83, 2.12, -50, 0, -11); }
      /* el punto (1, 1), sobre todo lo demás */
      if (ap(1) > 0.5) lmPunto(S, M, A, L, C.tan, false, 3);
      /* paso 7: la regla general */
      a = ap(7);
      if (a > 0.3){ frase('regla general:', 0.14, 3.0, 0, 0, C.rise); lmFondo(S, M, 'GEN', 0.14, 2.72, 0); lmEtq(T, M, 'GEN', 0.14, 2.72, 0); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.56, 0); if (k === N && u > 0.5) T.L('F', 5.2, 5.56, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.75) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=x^{2};\\ \\ a=1;\\ \\ L=1' + Q + '\\text{cerca de }1:\\ \\ f(0{,}9)=0{,}9^{2}=0{,}81' + Q + 'f(1{,}1)=1{,}1^{2}=1{,}21' + Q + '\\text{distancias de la salida a }1:' + Q + '|0{,}81-1|=0{,}19;\\ \\ |1{,}21-1|=0{,}21' + Q + '\\text{la misma distancia de entrada }(0{,}1)\\text{ da salidas}' + Q + '\\text{a distinta distancia: la gráfica es curva}',
      '\\text{tolerancia para la salida: }\\varepsilon=0{,}96' + Q + '\\text{se pide }|x^{2}-1|\\lt 0{,}96' + Q + '\\text{es decir: }1-0{,}96\\lt x^{2}\\lt 1+0{,}96' + Q + '1-0{,}96=0{,}04;\\ \\ 1+0{,}96=1{,}96' + Q + '\\text{franja verde: }0{,}04\\lt x^{2}\\lt 1{,}96',
      '\\text{¿qué }x\\text{ tienen su altura en la franja?}' + Q + '\\text{con }x\\gt 0\\text{, sacar raíz cuadrada mantiene el orden:}' + Q + '\\sqrt{0{,}04}\\lt x\\lt \\sqrt{1{,}96}' + Q + '0{,}2^{2}=0{,}04,\\text{ así que }\\sqrt{0{,}04}=0{,}2' + Q + '1{,}4^{2}=1{,}96,\\text{ así que }\\sqrt{1{,}96}=1{,}4' + Q + '\\text{zona de los }x:\\ \\ 0{,}2\\lt x\\lt 1{,}4',
      '\\text{distancia de }1\\text{ a cada extremo de la zona:}' + Q + '\\text{izquierda: }1-0{,}2=0{,}8' + Q + '\\text{derecha: }1{,}4-1=0{,}4' + Q + '0{,}8\\ne 0{,}4\\text{: la zona no es simétrica respecto de }1',
      '\\text{la distancia }\\delta\\text{ no puede pasar de la menor:}' + Q + '\\text{el menor entre }0{,}8\\text{ y }0{,}4\\text{ es }0{,}4;\\ \\ \\delta=0{,}4' + Q + '1-0{,}4=0{,}6;\\ \\ 1+0{,}4=1{,}4' + Q + '0{,}6\\lt x\\lt 1{,}4\\text{ queda dentro de }0{,}2\\lt x\\lt 1{,}4' + Q + '\\text{con la mayor }(0{,}8)\\text{ se revisaría hasta }1+0{,}8=1{,}8' + Q + '\\text{y no sirve; prueba con }x=1{,}7:' + Q + '|1{,}7-1|=0{,}7\\lt 0{,}8' + Q + 'f(1{,}7)=1{,}7^{2}=2{,}89' + Q + '2{,}89\\gt 1{,}96\\text{: sale de la franja}',
      '\\text{una distancia más chica y cómoda: }\\delta=0{,}32' + Q + '1-0{,}32=0{,}68;\\ \\ 1+0{,}32=1{,}32' + Q + '\\text{factorizar: }|x^{2}-1|=|x-1|\\cdot |x+1|' + Q + '\\text{si }|x-1|\\lt 0{,}32:\\ \\ 0{,}68\\lt x\\lt 1{,}32' + Q + '\\text{se suma }1:\\ \\ 1{,}68\\lt x+1\\lt 2{,}32' + Q + '2{,}32\\lt 3\\text{, luego }|x+1|\\lt 3' + Q + '|x^{2}-1|\\lt 0{,}32\\cdot 3=0{,}96' + Q + '\\text{prueba: }f(1{,}3)=1{,}3^{2}=1{,}69' + Q + '|1{,}69-1|=0{,}69\\lt 0{,}96',
      '\\text{¿de dónde sale }0{,}32\\text{? De la regla}' + Q + '\\delta=\\text{mín}\\{1,\\tfrac{\\varepsilon}{3}\\}\\text{ (el menor de los dos)}' + Q + '\\tfrac{0{,}96}{3}=0{,}32' + Q + '\\text{el menor entre }1\\text{ y }0{,}32\\text{ es }0{,}32' + Q + '\\text{para cualquier }\\varepsilon\\gt 0\\text{: si }0\\lt |x-1|\\lt \\delta,' + Q + '|x-1|\\lt 1\\text{, y entonces }|x+1|\\lt 3' + Q + '|x-1|\\lt \\tfrac{\\varepsilon}{3}' + Q + '|x^{2}-1|=|x-1|\\cdot |x+1|\\lt \\tfrac{\\varepsilon}{3}\\cdot 3=\\varepsilon' + Q + '\\text{toda tolerancia tiene respuesta: el límite es }1']; return dtPasos(R.slice(0, k)); }
  };
})());
