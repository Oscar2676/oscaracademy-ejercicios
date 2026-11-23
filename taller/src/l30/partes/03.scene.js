/* L30 H03 · límites de funciones combinadas: f y g saltan en a = 2 (ninguna tiene límite ahí), pero la suma se estudia lado por lado: por la izquierda 1 + 4 = 5 y por la derecha 3 + 2 = 5; los laterales coinciden y el límite de la suma es 5. Con el producto, 4 y 6: no hay límite (por pasos) */
OA.scene('comblat-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return x < 2 ? x - 1 : x + 1; }   /* f(2) = 3 */
  function g(x){ return x <= 2 ? 6 - x : 4 - x; }  /* g(2) = 4 */
  /* lugar y los cuatro límites laterales: f por la izquierda y por la derecha, g por la izquierda y por la derecha */
  var A = 2, FI = 1, FD = 3, GI = 4, GD = 2;
  /* dos marcos lado a lado, con la misma ventana: 0 ≤ x ≤ 4,4 y 0 ≤ y ≤ 5,5 */
  var MF = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.5), MG = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.5);
  var PZ = [['Q', '\\text{¿existe el límite de }f(x)+g(x)\\text{ en }2\\text{?}', '¿existe el límite de f(x) + g(x) en 2?', 'pt'], ['F', '\\Longrightarrow\\ \\text{sí: }5', '⟹ sí: 5', 'diff'],
    ['EX1', 'x', 'x', ''], ['EY1', 'y', 'y', ''], ['EX2', 'x', 'x', ''], ['EY2', 'y', 'y', ''],
    ['CF', 'y=f(x)', 'y = f(x)', ''], ['CG', 'y=g(x)', 'y = g(x)', ''],
    ['SI', '1+4=5', '1 + 4 = 5', 'c-sec'], ['SD', '3+2=5', '3 + 2 = 5', 'c-alt'],
    ['LS', '\\lim_{x\\to 2}[f(x)+g(x)]=5', 'lím [f(x) + g(x)] = 5', 'diff'],
    ['PR', '1\\cdot 4=4\\ne 3\\cdot 2=6', '1 · 4 = 4 ≠ 3 · 2 = 6', 'c-tan'],
    ['R1', 's(x)=f(x)+g(x);\\ \\ a=2', 's(x) = f(x) + g(x); a = 2', ''],
    ['R2', '\\lim_{x\\to 2^{-}}f(x)=1;\\ \\ \\lim_{x\\to 2^{-}}g(x)=4', 'lím x→2⁻: f(x) → 1; g(x) → 4', 'c-sec'],
    ['R3', '\\lim_{x\\to 2^{-}}s(x)=1+4=5', 'lím x→2⁻ s(x) = 1 + 4 = 5', 'c-sec'],
    ['R4', '\\lim_{x\\to 2^{+}}f(x)=3;\\ \\ \\lim_{x\\to 2^{+}}g(x)=2', 'lím x→2⁺: f(x) → 3; g(x) → 2', 'c-alt'],
    ['R5', '\\lim_{x\\to 2^{+}}s(x)=3+2=5', 'lím x→2⁺ s(x) = 3 + 2 = 5', 'c-alt'],
    ['R6', '\\lim_{x\\to 2}[f(x)+g(x)]=5', 'lím [f(x) + g(x)] = 5', 'diff'],
    ['R7', '1\\cdot 4=4\\ne 3\\cdot 2=6\\text{: sin límite}', '1 · 4 = 4 ≠ 3 · 2 = 6: sin límite', 'c-tan']];
  var TXT = [['Dos gráficas con un salto sobre el 2:', 'ninguna de las dos tiene límite ahí.'],
    ['Por la izquierda del 2 (flechas azules):', 'f va hacia 1 y g va hacia 4.'],
    ['Se suman los dos límites por la izquierda:', '1 más 4 es 5.'],
    ['Por la derecha del 2 (flechas verdes):', 'f va hacia 3 y g va hacia 2.'],
    ['Se suman los dos límites por la derecha:', '3 más 2 es 5.'],
    ['Los dos lados de la suma dan 5: la suma', 'sí tiene límite en 2, y vale 5.'],
    ['Con el producto, los lados no coinciden:', '4 por la izquierda y 6 por la derecha.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: si f y g saltan, la suma se estudia lado por lado. Animación en siete pasos con dos gráficas lado a lado. Uno: a la izquierda, la gráfica de f, con un salto sobre x igual a 2: llega por la izquierda a un círculo vacío a la altura 1 y parte por la derecha de un punto lleno a la altura 3; a la derecha, la gráfica de g, que llega por la izquierda a un punto lleno a la altura 4 y parte por la derecha de un círculo vacío a la altura 2. Dos: flechas azules recorren los tramos de la izquierda: f va hacia 1 y g hacia 4. Tres: bajo las gráficas, la suma por la izquierda, 1 más 4 igual a 5. Cuatro: flechas verdes recorren los tramos de la derecha: f va hacia 3 y g hacia 2. Cinco: la suma por la derecha, 3 más 2 igual a 5. Seis: los dos laterales de la suma coinciden: el límite de f más g en 2 es 5, aunque ni f ni g tienen límite ahí. Siete: con el producto, 1 por 4 igual a 4 por la izquierda y 3 por 2 igual a 6 por la derecha: no hay límite. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> por la izquierda de \\(2\\)</span><span><i class="sw alt"></i> por la derecha de \\(2\\)</span><span><i class="sw rise"></i> el límite de la suma</span><span><i class="sw tan"></i> el producto</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, w, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, M, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'si f y g saltan, la suma se estudia', 'lado por lado: izquierda y derecha.');
      /* los dos marcos: ejes con marcas y números, y la vertical punteada del lugar a = 2 */
      [MF, MG].forEach(function(M){ lmEjes(S, M); lmSeg(S, M, A, 0, A, 5.5, mu, 1, [2, 4]); });
      lmEtq(T, MF, 'EX1', 4.4, 0, 0, 8, 0); lmEtq(T, MF, 'EY1', 0, 5.5, -50, 0, -13); lmEtq(T, MG, 'EX2', 4.4, 0, 0, 8, 0); lmEtq(T, MG, 'EY2', 0, 5.5, -50, 0, -13);
      /* paso 1: las dos gráficas, cada una con su salto sobre x = 2 */
      a = Math.min(1, ap(1)*2);
      lmCurva(S, MF, f, 1, 1 + (A - 1)*a - 1e-6, C.ink, 2); lmCurva(S, MF, f, A, A + 2*a, C.ink, 2);
      lmCurva(S, MG, g, 1, 1 + (A - 1)*a, C.ink, 2); lmCurva(S, MG, g, A + 1e-6, A + 2*a, C.ink, 2);
      if (ap(1) > 0.9){ lmEtq(T, MF, 'CF', 0.25, 5, 0); lmEtq(T, MG, 'CG', 4.3, 5, -100); }
      /* paso 2: por la izquierda, f va hacia 1 y g hacia 4 (flechas y punteadas azules) */
      a = ap(2);
      if (a > 0){ lmFlecha(S, MF, 1.1, 0.1, 1.1 + 0.72*a, 0.1 + 0.72*a, C.sec, 1.6, -5, -6); lmFlecha(S, MG, 1.1, 4.9, 1.1 + 0.72*a, 4.9 - 0.72*a, C.sec, 1.6, -5, 6); }
      if (a > 0.6){ lmSeg(S, MF, A, FI, 0, FI, C.sec, 1); frase('hacia 1', MF, 0, FI, 5, -9, C.sec); lmSeg(S, MG, A, GI, 0, GI, C.sec, 1); frase('hacia 4', MG, 0, GI, 5, 9, C.sec); }
      /* paso 3: la suma de los dos límites por la izquierda */
      a = ap(3);
      if (a > 0.4){ w = prNota(S, 'por la izquierda:', -1.2, 1.4, C.sec); T.L('SI', -1.2, 1.4, 0, w + 6, 0); }
      /* paso 4: por la derecha, f va hacia 3 y g hacia 2 (flechas y punteadas verdes) */
      a = ap(4);
      if (a > 0){ lmFlecha(S, MF, 2.95, 3.95, 2.95 - 0.72*a, 3.95 - 0.72*a, C.alt, 1.6, 5, 6); lmFlecha(S, MG, 2.95, 1.05, 2.95 - 0.72*a, 1.05 + 0.72*a, C.alt, 1.6, 5, -6); }
      if (a > 0.6){ lmSeg(S, MF, A, FD, 0, FD, C.alt, 1); frase('hacia 3', MF, 0, FD, 5, -9, C.alt); lmSeg(S, MG, A, GD, 0, GD, C.alt, 1); frase('hacia 2', MG, 0, GD, 5, -9, C.alt); }
      /* paso 5: la suma de los dos límites por la derecha */
      a = ap(5);
      if (a > 0.4){ w = prNota(S, 'por la derecha:', 2.15, 1.4, C.alt); T.L('SD', 2.15, 1.4, 0, w + 6, 0); }
      /* huecos y puntos llenos de los saltos (encima de las guías) */
      if (ap(1) > 0.5){ lmPunto(S, MF, A, FI, C.ink, true, 3.2); lmPunto(S, MF, A, FD, C.ink, false, 3); lmPunto(S, MG, A, GI, C.ink, false, 3); lmPunto(S, MG, A, GD, C.ink, true, 3.2); }
      /* paso 6: los laterales de la suma coinciden: ese es el límite */
      a = ap(6);
      if (a > 0.5) T.L('LS', 2, 0.85, -50);
      /* paso 7: con el producto, los lados no coinciden */
      a = ap(7);
      if (a > 0.4){ w = prNota(S, 'con el producto:', -0.4, 0.3, C.tan); T.L('PR', -0.4, 0.3, 0, w + 6, 0); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.5) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=x-1\\text{ si }x\\lt 2' + Q + 'f(x)=x+1\\text{ si }x\\ge 2' + Q + 'g(x)=6-x\\text{ si }x\\le 2' + Q + 'g(x)=4-x\\text{ si }x\\gt 2' + Q + '\\text{lugar: }a=2\\text{; las dos gráficas saltan ahí}' + Q + '\\text{suma: }s(x)=f(x)+g(x)' + Q + '\\text{pregunta: ¿tiene límite }s\\text{ en }2\\text{?}',
      '\\text{por la izquierda del }2\\text{ (}x\\lt 2\\text{):}' + Q + 'f(1{,}9)=1{,}9-1=0{,}9' + Q + 'f(1{,}99)=1{,}99-1=0{,}99' + Q + '\\lim_{x\\to 2^{-}}f(x)=1' + Q + 'g(1{,}9)=6-1{,}9=4{,}1' + Q + 'g(1{,}99)=6-1{,}99=4{,}01' + Q + '\\lim_{x\\to 2^{-}}g(x)=4',
      '\\text{suma por la izquierda:}' + Q + 's(1{,}9)=0{,}9+4{,}1=5' + Q + 's(1{,}99)=0{,}99+4{,}01=5' + Q + '\\lim_{x\\to 2^{-}}s(x)=1+4=5',
      '\\text{por la derecha del }2\\text{ (}x\\gt 2\\text{):}' + Q + 'f(2{,}1)=2{,}1+1=3{,}1' + Q + 'f(2{,}01)=2{,}01+1=3{,}01' + Q + '\\lim_{x\\to 2^{+}}f(x)=3' + Q + 'g(2{,}1)=4-2{,}1=1{,}9' + Q + 'g(2{,}01)=4-2{,}01=1{,}99' + Q + '\\lim_{x\\to 2^{+}}g(x)=2',
      '\\text{suma por la derecha:}' + Q + 's(2{,}1)=3{,}1+1{,}9=5' + Q + 's(2{,}01)=3{,}01+1{,}99=5' + Q + '\\lim_{x\\to 2^{+}}s(x)=3+2=5',
      '\\text{laterales de }f:\\ 1\\text{ y }3\\text{, distintos}' + Q + '\\text{laterales de }g:\\ 4\\text{ y }2\\text{, distintos}' + Q + '\\text{ni }f\\text{ ni }g\\text{ tienen límite en }2' + Q + '\\text{laterales de la suma: }5\\text{ y }5\\text{, iguales}' + Q + '\\lim_{x\\to 2}[f(x)+g(x)]=5' + Q + '\\text{en el lugar: }s(2)=3+4=7' + Q + '\\text{ese valor no participa en el límite}',
      '\\text{producto: }p(x)=f(x)\\cdot g(x)' + Q + '\\text{por la izquierda: }1\\cdot 4=4' + Q + 'p(1{,}9)=0{,}9\\cdot 4{,}1=3{,}69' + Q + 'p(1{,}99)=0{,}99\\cdot 4{,}01=3{,}9699' + Q + '\\text{por la derecha: }3\\cdot 2=6' + Q + 'p(2{,}1)=3{,}1\\cdot 1{,}9=5{,}89' + Q + 'p(2{,}01)=3{,}01\\cdot 1{,}99=5{,}9899' + Q + '4\\ne 6\\text{: el producto no tiene límite en }2']; return dtPasos(R.slice(0, k)); }
  };
})());
