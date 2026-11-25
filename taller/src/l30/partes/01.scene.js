/* L30 H01 · propiedades de límites: el límite de una suma es la suma de los límites. Con f(x) = x/2 + 1 y g(x) = x + 1 (x ≠ 2) en a = 2, las alturas de g se apilan sobre las de f y la punta se acerca a 2 + 3 = 5 (por pasos) */
OA.scene('prop-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return x/2 + 1; }
  function g(x){ return x + 1; }
  function s(x){ return f(x) + g(x); }
  function p(x){ return f(x)*g(x); }
  /* lugar, los dos límites y los dos lugares donde se dibujan las alturas (uno a cada lado de a) */
  var A = 2, L = 2, LM = 3, LP = 6, XS = [1.9, 2.1];
  /* el marco muestra solo la zona cercana a x = 2: 1,5 ≤ x ≤ 2,5 y 0 ≤ y ≤ 7; su borde de abajo es el eje x */
  var M = lmMarco(-0.6, 0.85, 5.5, 4.4, 1.5, 2.5, 0, 7);
  var PZ = [['Q', '\\text{¿a qué altura se acerca }f(x)+g(x)\\text{?}', '¿a qué altura se acerca f(x) + g(x)?', 'pt'], ['F', '\\Longrightarrow\\ 2+3=5', '⟹ 2 + 3 = 5', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=f(x)', 'y = f(x)', 'c-sec'], ['CG', 'y=g(x)', 'y = g(x)', 'c-alt'], ['CS', 'y=f(x)+g(x)', 'y = f(x) + g(x)', 'diff'],
    ['LA', 'a=2', 'a = 2', ''], ['LL', 'L=2', 'L = 2', 'c-sec'], ['LG', 'M=3', 'M = 3', 'c-alt'], ['LS', 'L+M=5', 'L + M = 5', 'diff'],
    ['PR', 'L\\cdot M=2\\cdot 3=6', 'L · M = 2 · 3 = 6', 'c-tan'],
    ['R1', 'f(x)=\\tfrac{x}{2}+1;\\ \\ g(x)=x+1;\\ \\ x\\ne 2', 'f(x) = x/2 + 1; g(x) = x + 1; x ≠ 2', ''],
    ['R2', 'f(1{,}9)=1{,}95;\\ \\ f(2{,}1)=2{,}05;\\ \\ L=2', 'f(1,9) = 1,95; f(2,1) = 2,05; L = 2', 'c-sec'],
    ['R3', 'g(1{,}9)=2{,}9;\\ \\ g(2{,}1)=3{,}1;\\ \\ M=3', 'g(1,9) = 2,9; g(2,1) = 3,1; M = 3', 'c-alt'],
    ['R4', '1{,}95+2{,}9=4{,}85;\\ \\ 2{,}05+3{,}1=5{,}15', '1,95 + 2,9 = 4,85; 2,05 + 3,1 = 5,15', ''],
    ['R5', 'f(x)+g(x)=\\tfrac{3x}{2}+2;\\ \\ x\\ne 2', 'f(x) + g(x) = 3x/2 + 2; x ≠ 2', 'diff'],
    ['R6', '\\lim_{x\\to 2}[f(x)+g(x)]=2+3=5', 'lím [f(x) + g(x)] = 2 + 3 = 5', 'diff'],
    ['R7', '\\lim_{x\\to 2}[f(x)\\cdot g(x)]=2\\cdot 3=6', 'lím [f(x) · g(x)] = 2 · 3 = 6', 'c-tan']];
  var TXT = [['Dos rectas, cada una con un hueco sobre el 2:', 'ahí no están definidas. Importa lo de cerca.'],
    ['Trazos azules: alturas de f a cada lado del 2.', 'Miden 1,95 y 2,05: se acercan a 2.'],
    ['Trazos verdes: alturas de g en los mismos', 'lugares. Miden 2,9 y 3,1: se acercan a 3.'],
    ['Una copia de cada trazo verde va sobre el', 'azul: las puntas quedan a 4,85 y a 5,15.'],
    ['Apilando en cada lugar sale la recta naranja:', 'es la gráfica de la suma, con su hueco.'],
    ['Sobre el 2 se apilan los límites: 2 y, encima,', '3. Llegan al hueco naranjo, a la altura 5.'],
    ['Puntos burdeos: los productos de las alturas,', '5,655 y 6,355. Se acercan a 2 por 3, que es 6.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite de una suma es la suma de los límites. Animación en siete pasos, en una vista ampliada con x entre 1,5 y 2,5. Uno: dos rectas, la azul es la gráfica de f de x igual a x medios más 1 y la verde la de g de x igual a x más 1; cada una tiene un círculo vacío sobre x igual a 2. Dos: trazos verticales azules en x igual a 1,9 y 2,1 marcan las alturas de f, 1,95 y 2,05, y una punteada horizontal marca L igual a 2. Tres: trazos verdes en los mismos lugares marcan las alturas de g, 2,9 y 3,1, y una punteada marca M igual a 3. Cuatro: una copia de cada trazo verde se pone encima del trazo azul; las puntas quedan a 4,85 y 5,15. Cinco: la recta naranja, gráfica de la suma, pasa por esas puntas y tiene un círculo vacío a la altura 5. Seis: sobre x igual a 2 se apilan con trazo segmentado los límites 2 y 3, que llegan al círculo vacío naranjo: el límite de la suma es 2 más 3, igual a 5. Siete: dos puntos burdeos marcan los productos de las alturas, 5,655 y 6,355; entre ellos, sobre x igual a 2, un círculo vacío a la altura 6, con su punteada y un rótulo: con el producto pasa lo mismo, 2 por 3 igual a 6. Bajo el círculo vacío azul, la palabra hueco. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(f\\) y sus alturas</span><span><i class="sw alt"></i> \\(g\\) y sus alturas</span><span><i class="sw rise"></i> la suma \\(f+g\\)</span><span><i class="sw tan"></i> el producto \\(f\\cdot g\\): dos puntos y su hueco</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, b, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.9; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      /* trazo vertical (una altura) en el lugar x, de ya a yb, corrido dx píxeles; seg: segmentado (para los límites, que no son valores) */
      function trazo(x, ya, yb, col, dx, w, seg){ if (yb <= ya) return; c.strokeStyle = col; c.lineWidth = w || 3; c.setLineDash(seg ? [4, 3] : []); c.beginPath(); c.moveTo(X(M.gx(x)) + (dx || 0), Y(M.gy(ya))); c.lineTo(X(M.gx(x)) + (dx || 0), Y(M.gy(yb))); c.stroke(); c.setLineDash([]); }
      function marca(x, y, t, col, abajo){ var px = X(M.gx(x)), py = Y(M.gy(y)); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); if (abajo){ c.moveTo(px, py); c.lineTo(px, py + 4); c.stroke(); if (t) lmNum(S, M, t, x, y, 0, 11, col); } else { c.moveTo(px, py); c.lineTo(px - 4, py); c.stroke(); if (t) lmNum(S, M, t, x, y, -7, 0, col, 'right'); } }
      /* número de una altura, junto a su trazo: a la izquierda del lugar 1,9 y a la derecha del lugar 2,1 */
      function num(t, i, y, col, d){ frase(t, XS[i], y, i ? (d || 9) : -(d || 9), 0, col, i ? 'left' : 'right'); }
      dtQue(S, 'el límite de una suma es la suma de los', 'límites: las alturas se apilan.');
      /* marco de la vista ampliada, con sus marcas y números (el borde de abajo es el eje x) */
      c.setLineDash([]); c.strokeStyle = mu; c.lineWidth = 1; c.strokeRect(X(M.gx(M.x0)), Y(M.gy(M.y1)), X(M.gx(M.x1)) - X(M.gx(M.x0)), Y(M.gy(M.y0)) - Y(M.gy(M.y1)));
      [1.5, 1.6, 1.7, 1.8, 1.9, 2, 2.1, 2.2, 2.3, 2.4, 2.5].forEach(function(x){ marca(x, M.y0, [1.5, 1.9, 2, 2.1, 2.5].indexOf(x) >= 0 ? lmT(x, 2) : '', x === 2 ? C.ink : mu, true); });
      [1, 2, 3, 4, 5, 6].forEach(function(y){ marca(M.x0, y, lmT(y, 2), mu); });
      lmEtq(T, M, 'EX', M.x1, M.y0, 0, 7, 0); lmEtq(T, M, 'EY', M.x0, M.y1, -100, -7, 3);
      /* paso 6 (al fondo): las punteadas de la altura 5 y, sobre x = 2, los dos límites apilados con trazo segmentado */
      a = ap(6);
      if (a > 0){ trazo(A, 0, L*Math.min(1, a*2.5), C.sec, 0, 2.4, true); if (a > 0.4) trazo(A, L, L + LM*Math.min(1, (a - 0.4)*2.5), C.alt, 0, 2.4, true); }
      if (a > 0.8) lmSeg(S, M, A, L + LM, M.x0, L + LM, C.rise, 1);
      /* paso 1: las dos rectas, con su círculo vacío sobre x = 2 */
      a = ap(1);
      lmCurva(S, M, f, M.x0, M.x0 + (M.x1 - M.x0)*Math.min(1, a*2), C.sec, 2);
      lmCurva(S, M, g, M.x0, M.x0 + (M.x1 - M.x0)*Math.min(1, a*2), C.alt, 2);
      if (a > 0.9){ lmEtq(T, M, 'CF', 2.48, 1.72, -100); lmEtq(T, M, 'CG', 2.48, 3.92, -100); lmEtq(T, M, 'LA', A, M.y0, -50, 0, 25); frase('hueco', A, 1.5, 0, 0, C.sec, 'center'); }
      /* paso 2: alturas de f en 1,9 y 2,1 (trazos azules) y la punteada de L = 2 */
      a = ap(2);
      XS.forEach(function(x){ trazo(x, 0, f(x)*a, C.sec, 0, 3); });
      if (a > 0.6){ lmSeg(S, M, A, L, M.x0, L, C.sec, 1); num('1,95', 0, 0.8, C.sec, 13); num('2,05', 1, 0.8, C.sec, 13); lmEtq(T, M, 'LL', M.x0, 2.27, 0, 6, 0); }
      /* paso 3: alturas de g en los mismos lugares (trazos verdes, corridos 8 px hacia afuera para que no tapen a los azules) y la punteada de M = 3 */
      a = ap(3);
      XS.forEach(function(x, i){ trazo(x, 0, g(x)*a, C.alt, i ? 8 : -8, 3); });
      if (a > 0.6){ lmSeg(S, M, A, LM, M.x0, LM, C.alt, 1); num('2,9', 0, 2.52, C.alt, 15); num('3,1', 1, 2.52, C.alt, 15); lmEtq(T, M, 'LG', M.x0, 3.32, 0, 6, 0); }
      /* paso 4: una copia de cada trazo verde sube y queda sobre el trazo azul; el original sigue en su sitio */
      a = ap(4);
      if (a > 0) XS.forEach(function(x, i){ trazo(x, f(x)*a, f(x)*a + g(x), C.alt, (i ? 8 : -8)*(1 - a), 3); });
      if (a > 0.7){ num('4,85', 0, 5.2, C.rise, 7); num('5,15', 1, 4.78, C.rise, 7); }
      /* paso 5: la gráfica de la suma pasa por todas las puntas */
      a = ap(5);
      lmCurva(S, M, s, M.x0, M.x0 + (M.x1 - M.x0)*a, C.rise, 2);
      if (a > 0.9) lmEtq(T, M, 'CS', 2.48, 6.2, -100);
      /* puntos: los de las rectas donde se midió, las puntas apiladas y los círculos vacíos sobre x = 2 */
      if (ap(2) >= 1) XS.forEach(function(x){ lmPunto(S, M, x, f(x), C.sec, false, 2.6); });
      if (ap(3) >= 1) XS.forEach(function(x){ lmPunto(S, M, x, g(x), C.alt, false, 2.6); });
      if (ap(4) >= 1) XS.forEach(function(x){ lmPunto(S, M, x, s(x), C.rise, false, 3); });
      if (ap(1) > 0.5){ lmPunto(S, M, A, L, C.sec, true, 3.4); lmPunto(S, M, A, LM, C.alt, true, 3.4); }
      if (ap(5) > 0.55) lmPunto(S, M, A, L + LM, C.rise, true, 3.4);
      /* paso 6: el rótulo de la altura 5 */
      a = ap(6);
      if (a > 0.8){ lmFondo(S, M, 'LS', M.x0, 5.32, 0, 6, 0); lmEtq(T, M, 'LS', M.x0, 5.32, 0, 6, 0); }
      /* paso 7: el producto. Dos puntos burdeos a la altura de los productos de las alturas, el círculo vacío a la altura 6 y su punteada (las cuentas van en la lectura) */
      a = ap(7);
      if (a > 0.15) frase('con el producto, lo mismo:', M.x0, 6.78, 6, 0, C.tan);
      if (a > 0.3) XS.forEach(function(x){ lmPunto(S, M, x, p(x), C.tan, false, 3); });
      if (a > 0.45){ num('5,655', 0, 5.7, C.tan, 7); frase('6,355', XS[1], p(XS[1]), 0, -11, C.tan, 'center'); }
      if (a > 0.6){ lmSeg(S, M, A, LP, M.x0, LP, C.tan, 1); lmPunto(S, M, A, LP, C.tan, true, 3.4); }
      if (a > 0.75) lmEtq(T, M, 'PR', M.x0, 6.32, 0, 6, 0);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.5) T.L('F', 5.2, 5.86, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.3); lmTxt(S, TXT[k - 1][1], -1.2, -0.3 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.85) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=\\tfrac{x}{2}+1;\\ \\ g(x)=x+1;\\ \\ \\text{las dos con }x\\ne 2' + Q + '\\text{lugar: }a=2\\text{ (ahí ninguna está definida)}' + Q + '\\text{suma: }s(x)=f(x)+g(x)' + Q + '\\text{pregunta: ¿a qué altura se acerca }s(x)\\text{?}',
      '\\text{alturas de }f\\text{ cerca de }2:' + Q + 'f(1{,}9)=\\tfrac{1{,}9}{2}+1=0{,}95+1=1{,}95' + Q + 'f(2{,}1)=\\tfrac{2{,}1}{2}+1=1{,}05+1=2{,}05' + Q + '\\text{más cerca:}' + Q + 'f(1{,}99)=\\tfrac{1{,}99}{2}+1=0{,}995+1=1{,}995' + Q + 'f(2{,}01)=\\tfrac{2{,}01}{2}+1=1{,}005+1=2{,}005' + Q + '\\text{distancias a }2\\text{, cada vez menores:}' + Q + '|1{,}95-2|=0{,}05;\\ \\ |2{,}05-2|=0{,}05' + Q + '|1{,}995-2|=0{,}005;\\ \\ |2{,}005-2|=0{,}005' + Q + '\\text{se acercan a }2:\\ \\ \\lim_{x\\to 2}f(x)=L=2',
      '\\text{alturas de }g\\text{ en los mismos lugares:}' + Q + 'g(1{,}9)=1{,}9+1=2{,}9' + Q + 'g(2{,}1)=2{,}1+1=3{,}1' + Q + 'g(1{,}99)=1{,}99+1=2{,}99' + Q + 'g(2{,}01)=2{,}01+1=3{,}01' + Q + '\\text{distancias a }3\\text{, cada vez menores:}' + Q + '|2{,}9-3|=0{,}1;\\ \\ |3{,}1-3|=0{,}1' + Q + '|2{,}99-3|=0{,}01;\\ \\ |3{,}01-3|=0{,}01' + Q + '\\text{se acercan a }3:\\ \\ \\lim_{x\\to 2}g(x)=M=3',
      '\\text{se apilan: la altura de }g\\text{ sobre la de }f' + Q + 's(1{,}9)=1{,}95+2{,}9=4{,}85' + Q + 's(2{,}1)=2{,}05+3{,}1=5{,}15' + Q + 's(1{,}99)=1{,}995+2{,}99=4{,}985' + Q + 's(2{,}01)=2{,}005+3{,}01=5{,}015',
      '\\text{en cualquier lugar }x\\ne 2:' + Q + 's(x)=\\tfrac{x}{2}+1+x+1' + Q + '\\text{se juntan los términos con }x\\text{ y los números:}' + Q + '\\tfrac{x}{2}+x=\\tfrac{x}{2}+\\tfrac{2x}{2}=\\tfrac{3x}{2};\\ \\ 1+1=2' + Q + 's(x)=\\tfrac{3x}{2}+2' + Q + '\\text{prueba con el lugar }1{,}9:' + Q + 's(1{,}9)=\\tfrac{3\\cdot 1{,}9}{2}+2=\\tfrac{5{,}7}{2}+2=4{,}85' + Q + '\\text{su gráfica: la recta naranja, con un hueco}' + Q + '\\text{sobre el }2',
      '\\text{sobre el }2\\text{ se apilan los límites, no valores:}' + Q + 'L+M=2+3=5' + Q + '\\text{distancias de las sumas a }5:' + Q + '|4{,}85-5|=0{,}15;\\ \\ |5{,}15-5|=0{,}15' + Q + '|4{,}985-5|=0{,}015;\\ \\ |5{,}015-5|=0{,}015' + Q + '\\text{la suma se acerca a }5:' + Q + '\\lim_{x\\to 2}[f(x)+g(x)]' + Q + '=\\lim_{x\\to 2}f(x)+\\lim_{x\\to 2}g(x)=2+3=5',
      '\\text{con el producto }p(x)=f(x)\\cdot g(x)\\text{ pasa lo mismo:}' + Q + 'p(1{,}9)=1{,}95\\cdot 2{,}9=5{,}655' + Q + 'p(2{,}1)=2{,}05\\cdot 3{,}1=6{,}355' + Q + 'p(1{,}99)=1{,}995\\cdot 2{,}99=5{,}96505' + Q + 'p(2{,}01)=2{,}005\\cdot 3{,}01=6{,}03505' + Q + '\\text{distancias de los productos a }6:' + Q + '|5{,}655-6|=0{,}345;\\ \\ |6{,}355-6|=0{,}355' + Q + '|5{,}96505-6|=0{,}03495' + Q + '|6{,}03505-6|=0{,}03505' + Q + '\\text{se achican: los productos se acercan a}' + Q + 'L\\cdot M=2\\cdot 3=6' + Q + '\\text{(propiedad del producto: aquí no se demuestra)}']; return dtPasos(R.slice(0, k)); }
  };
})());
