/* L30 H02 · límites de combinaciones de funciones: el límite de 2f(x) − 3g(x) en a = 3 se arma con los límites de f y de g, leídos en sus gráficas (2 y 1): 2·2 − 3·1 = 1. El valor f(3) = 4 no participa (por pasos) */
OA.scene('comb-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return x === 3 ? 4 : x - 1; }   /* f(3) = 4: punto lleno fuera de la recta */
  function g(x){ return 4 - x; }                 /* definida solo para x ≠ 3 */
  /* lugar, los dos límites y los dos lugares donde se miden alturas para la comprobación */
  var A = 3, L = 2, LM = 1, XS = [2.5, 3.5];
  /* dos marcos lado a lado, con la misma ventana: 0 ≤ x ≤ 6 y 0 ≤ y ≤ 5 */
  var MF = lmMarco(-0.85, 1.75, 2.6, 3.3, 0, 6, 0, 5), MG = lmMarco(2.55, 1.75, 2.6, 3.3, 0, 6, 0, 5);
  var PZ = [['Q', '\\text{¿a qué se acerca }2f(x)-3g(x)\\text{ cerca de }3\\text{?}', '¿a qué se acerca 2f(x) − 3g(x) cerca de 3?', 'pt'], ['F', '\\Longrightarrow\\ 1', '⟹ 1', 'diff'],
    ['EX1', 'x', 'x', ''], ['EY1', 'y', 'y', ''], ['EX2', 'x', 'x', ''], ['EY2', 'y', 'y', ''],
    ['CF', 'y=f(x)', 'y = f(x)', 'c-sec'], ['CG', 'y=g(x)', 'y = g(x)', 'c-alt'],
    ['LL', 'L=2', 'L = 2', 'c-sec'], ['LG', 'M=1', 'M = 1', 'c-alt'],
    ['ML', '2\\cdot L=2\\cdot 2=4', '2 · L = 2 · 2 = 4', 'c-sec'], ['MG', '3\\cdot M=3\\cdot 1=3', '3 · M = 3 · 1 = 3', 'c-alt'],
    ['DF', '\\lim_{x\\to 3}[2f(x)-3g(x)]=4-3=1', 'lím [2f(x) − 3g(x)] = 4 − 3 = 1', 'diff'],
    ['F3', 'f(3)=4', 'f(3) = 4', 'c-tan'],
    ['R1', 'h(x)=2f(x)-3g(x);\\ \\ a=3', 'h(x) = 2f(x) − 3g(x); a = 3', ''],
    ['R2', '\\lim_{x\\to 3}f(x)=2', 'lím f(x) = 2', 'c-sec'],
    ['R3', '\\lim_{x\\to 3}g(x)=1', 'lím g(x) = 1', 'c-alt'],
    ['R4', '2\\cdot 2=4;\\ \\ 3\\cdot 1=3', '2 · 2 = 4; 3 · 1 = 3', ''],
    ['R5', '\\lim_{x\\to 3}h(x)=4-3=1', 'lím h(x) = 4 − 3 = 1', 'diff'],
    ['R6', 'h(2{,}9)=0{,}5;\\ \\ h(3{,}1)=1{,}5', 'h(2,9) = 0,5; h(3,1) = 1,5', ''],
    ['R7', 'f(3)=4\\text{ no se usa}', 'f(3) = 4 no se usa', 'c-tan']];
  var TXT = [['Dos gráficas: la azul es f y la verde, g.', 'Las dos tienen un hueco sobre el 3.'],
    ['Por los dos lados del 3, la gráfica de f', 'se acerca a la altura 2: es su límite.'],
    ['Por los dos lados del 3, la gráfica de g', 'se acerca a la altura 1: es su límite.'],
    ['Cada límite se multiplica por su número:', '2 por 2 es 4, y 3 por 1 es 3.'],
    ['Se restan los dos resultados: 4 menos 3.', 'El límite de la combinación es 1.'],
    ['Comprobación: en 2,5 y en 3,5 se miden las', 'alturas. La cuenta de abajo sigue más cerca.'],
    ['El punto lleno de f, a la altura 4, no', 'participa: el límite mira solo lo de cerca.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite de una combinación sale de combinar los límites de sus piezas. Animación en siete pasos con dos gráficas lado a lado. Uno: a la izquierda, la gráfica azul de f, una recta con un círculo vacío en el punto 3 coma 2 y un punto lleno en 3 coma 4; a la derecha, la gráfica verde de g, una recta con un círculo vacío en 3 coma 1. Dos: dos flechas recorren la gráfica de f hacia el hueco, una por cada lado, y una punteada marca la altura 2: el límite de f en 3 es 2. Tres: lo mismo en la gráfica de g, con la altura 1: el límite de g en 3 es 1. Cuatro: bajo cada gráfica aparece su múltiplo: 2 por 2 igual a 4 y 3 por 1 igual a 3. Cinco: la resta, 4 menos 3 igual a 1: el límite de 2 f de x menos 3 g de x en 3 es 1. Seis: puntos en x igual a 2,5 y 3,5 de las dos gráficas, con sus alturas, para la comprobación con valores. Siete: un anillo destaca el punto lleno de f, f de 3 igual a 4, que no participa. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(f\\) y su límite</span><span><i class="sw alt"></i> \\(g\\) y su límite</span><span><i class="sw rise"></i> la combinación</span><span><i class="sw tan"></i> el valor \\(f(3)\\), que no participa</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, M, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'el límite de una combinación sale de', 'combinar los límites de sus piezas.');
      /* los dos marcos: ejes con marcas y números, y la vertical punteada del lugar a = 3 */
      [MF, MG].forEach(function(M){ lmEjes(S, M); lmSeg(S, M, A, 0, A, 5, mu, 1, [2, 4]); });
      lmEtq(T, MF, 'EX1', 6, 0, 0, 8, 0); lmEtq(T, MF, 'EY1', 0, 5, -50, 0, -13); lmEtq(T, MG, 'EX2', 6, 0, 0, 8, 0); lmEtq(T, MG, 'EY2', 0, 5, -50, 0, -13);
      /* paso 1: las dos rectas, con su hueco sobre x = 3; f tiene además un punto lleno en (3, 4) */
      a = ap(1);
      lmCurva(S, MF, function(x){ return x - 1; }, 1, 1 + 5*Math.min(1, a*2), C.sec, 2);
      lmCurva(S, MG, g, 0, 4*Math.min(1, a*2), C.alt, 2);
      if (a > 0.9){ lmEtq(T, MF, 'CF', 0.3, 4.6, 0); lmEtq(T, MG, 'CG', 5.9, 4.6, -100); }
      /* paso 2: por los dos lados, la gráfica de f va hacia el hueco (3, 2); punteada de la altura L = 2 */
      a = ap(2);
      if (a > 0){ lmFlecha(S, MF, 1.6, 0.6, 1.6 + 1.1*a, 0.6 + 1.1*a, C.sec, 1.6, -5, -7); lmFlecha(S, MF, 4.4, 3.4, 4.4 - 1.1*a, 3.4 - 1.1*a, C.sec, 1.6, 5, 7); }
      if (a > 0.6){ lmSeg(S, MF, A, L, 0, L, C.sec, 1); lmEtq(T, MF, 'LL', 0, L, 0, 5, -10); }
      /* paso 3: lo mismo con g, hacia el hueco (3, 1); punteada de la altura M = 1 */
      a = ap(3);
      if (a > 0){ lmFlecha(S, MG, 1.6, 2.4, 1.6 + 1.1*a, 2.4 - 1.1*a, C.alt, 1.6, 5, -7); lmFlecha(S, MG, 4, 0, 4 - 0.7*a, 0.7*a, C.alt, 1.6, 5, -7); }
      if (a > 0.6){ lmSeg(S, MG, A, LM, 0, LM, C.alt, 1); lmEtq(T, MG, 'LG', 0, LM, 0, 5, 10); }
      /* paso 4: bajo cada gráfica, su límite multiplicado por su número */
      a = ap(4);
      if (a > 0.3) T.L('ML', -0.85, 0.95, 0);
      if (a > 0.6) T.L('MG', 2.55, 0.95, 0);
      /* paso 5: la resta de los dos resultados */
      a = ap(5);
      if (a > 0.5) T.L('DF', 2, 0.38, -50);
      /* paso 6: alturas en 2,5 y 3,5 de las dos gráficas (comprobación con valores) */
      a = ap(6);
      if (a > 0.2) XS.forEach(function(x){ lmPunto(S, MF, x, f(x), C.sec, false, 2.6); lmPunto(S, MG, x, g(x), C.alt, false, 2.6); });
      if (a > 0.6){ frase('1,5', MF, 2.5, 1.5, 5, 14, C.sec, 'left'); frase('2,5', MF, 3.5, 2.5, -5, -14, C.sec, 'right'); frase('1,5', MG, 2.5, 1.5, -5, 14, C.alt, 'right'); frase('0,5', MG, 3.5, 0.5, -6, 8, C.alt, 'right'); }
      /* huecos y punto lleno (encima de las guías) */
      if (ap(1) > 0.5){ lmPunto(S, MF, A, L, C.sec, true, 3.4); lmPunto(S, MF, A, 4, C.sec, false, 3.2); lmPunto(S, MG, A, LM, C.alt, true, 3.4); }
      /* paso 7: el punto lleno de f, f(3) = 4, no participa */
      a = ap(7);
      if (a > 0.2) prAnillo(S, MF, A, 4, C.tan, 3 + 4*Math.min(1, a*1.5));
      if (a > 0.6){ lmEtq(T, MF, 'F3', A, 4, -100, -10, 0); frase('no participa', MF, A, 4, -10, 15, C.tan, 'right'); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 5 && ap(5) > 0.5) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=x-1\\text{ si }x\\ne 3;\\ \\ f(3)=4' + Q + 'g(x)=4-x\\text{ si }x\\ne 3\\text{ (sin valor en }3\\text{)}' + Q + '\\text{combinación: }h(x)=2f(x)-3g(x)' + Q + '\\text{lugar: }a=3' + Q + '\\text{pregunta: ¿a qué número se acerca }h(x)\\text{?}' + Q + '\\text{plan: leer dos límites y combinarlos}',
      '\\text{la gráfica de }f\\text{ va hacia su hueco,}' + Q + '\\text{que está a la altura }2\\text{, por los dos lados:}' + Q + '\\lim_{x\\to 3}f(x)=L=2',
      '\\text{la gráfica de }g\\text{ va hacia su hueco,}' + Q + '\\text{que está a la altura }1\\text{, por los dos lados:}' + Q + '\\lim_{x\\to 3}g(x)=M=1',
      '\\text{múltiplo constante, dos veces:}' + Q + '\\lim_{x\\to 3}2f(x)=2\\cdot 2=4' + Q + '\\lim_{x\\to 3}3g(x)=3\\cdot 1=3',
      '\\text{resta de los dos resultados:}' + Q + '\\lim_{x\\to 3}[2f(x)-3g(x)]=4-3=1',
      '\\text{comprobación con valores:}' + Q + 'f(2{,}5)=2{,}5-1=1{,}5;\\ \\ g(2{,}5)=4-2{,}5=1{,}5' + Q + 'h(2{,}5)=2\\cdot 1{,}5-3\\cdot 1{,}5' + Q + '=3-4{,}5=-1{,}5' + Q + 'f(3{,}5)=3{,}5-1=2{,}5;\\ \\ g(3{,}5)=4-3{,}5=0{,}5' + Q + 'h(3{,}5)=2\\cdot 2{,}5-3\\cdot 0{,}5' + Q + '=5-1{,}5=3{,}5' + Q + '\\text{más cerca del }3:' + Q + 'h(2{,}9)=2\\cdot 1{,}9-3\\cdot 1{,}1' + Q + '=3{,}8-3{,}3=0{,}5' + Q + 'h(3{,}1)=2\\cdot 2{,}1-3\\cdot 0{,}9' + Q + '=4{,}2-2{,}7=1{,}5' + Q + 'h(2{,}99)=2\\cdot 1{,}99-3\\cdot 1{,}01' + Q + '=3{,}98-3{,}03=0{,}95' + Q + 'h(3{,}01)=2\\cdot 2{,}01-3\\cdot 0{,}99' + Q + '=4{,}02-2{,}97=1{,}05' + Q + '\\text{los valores se acercan a }1',
      '\\text{el punto lleno: }f(3)=4' + Q + '\\text{no participa: el límite mira lo de cerca}' + Q + '\\text{además, }g\\text{ no tiene valor en }3:' + Q + '\\text{con valores en }3\\text{ no hay cuenta posible}' + Q + '\\text{con límites sí: }\\lim_{x\\to 3}h(x)=1']; return dtPasos(R.slice(0, k)); }
  };
})());
