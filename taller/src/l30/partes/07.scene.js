/* L30 H07 · límites de funciones definidas por partes: f(x) = x + 1 si x < 2, f(2) = 1, f(x) = 5 − x si x > 2. En el punto de cambio a = 2 cada lado se calcula con la fórmula de su tramo: por la izquierda 2 + 1 = 3 y por la derecha 5 − 2 = 3; los laterales coinciden y el límite es 3, aunque f(2) = 1 (por pasos) */
OA.scene('partes-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function f(x){ return x < 2 ? x + 1 : (x > 2 ? 5 - x : 1); }   /* f(2) = 1 */
  /* punto de cambio, límite por la izquierda, límite por la derecha y valor en el lugar */
  var A = 2, LI = 3, LD = 3, VA = 1;
  /* un solo marco: ventana 0 ≤ x ≤ 4,4 y 0 ≤ y ≤ 4,5 */
  var M = lmMarco(-0.6, 2.1, 5.2, 2.95, 0, 4.4, 0, 4.5);
  var PZ = [['Q', '\\text{¿tiene límite }f\\text{ en }2\\text{?}', '¿tiene límite f en 2?', 'pt'], ['F', '\\Longrightarrow\\ \\text{sí: }3', '⟹ sí: 3', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CI', 'y=x+1', 'y = x + 1', ''], ['CD', 'y=5-x', 'y = 5 − x', ''], ['PV', 'f(2)=1', 'f(2) = 1', ''],
    ['SI', '2+1=3', '2 + 1 = 3', 'c-sec'], ['SD', '5-2=3', '5 − 2 = 3', 'c-alt'],
    ['LS', '\\lim_{x\\to 2}f(x)=3', 'lím f(x) = 3', 'diff'],
    ['NP', 'f(2)=1\\ne 3', 'f(2) = 1 ≠ 3', 'c-tan'],
    ['R1', 'x\\lt 2:\\ x+1;\\ \\ x\\gt 2:\\ 5-x;\\ \\ f(2)=1', 'x < 2: x + 1; x > 2: 5 − x; f(2) = 1', ''],
    ['R2', 'f(1{,}9)=2{,}9;\\ \\ f(1{,}99)=2{,}99', 'f(1,9) = 2,9; f(1,99) = 2,99', 'c-sec'],
    ['R3', '\\lim_{x\\to 2^{-}}f(x)=2+1=3', 'lím x→2⁻ f(x) = 2 + 1 = 3', 'c-sec'],
    ['R4', 'f(2{,}1)=2{,}9;\\ \\ f(2{,}01)=2{,}99', 'f(2,1) = 2,9; f(2,01) = 2,99', 'c-alt'],
    ['R5', '\\lim_{x\\to 2^{+}}f(x)=5-2=3', 'lím x→2⁺ f(x) = 5 − 2 = 3', 'c-alt'],
    ['R6', '\\lim_{x\\to 2}f(x)=3', 'lím f(x) = 3', 'diff'],
    ['R7', 'f(2)=1\\ne 3\\text{: no participa}', 'f(2) = 1 ≠ 3: no participa', 'c-tan']];
  var TXT = [['Dos tramos rectos y un punto suelto:', 'sobre el 2 cambia la fórmula.'],
    ['Por la izquierda del 2 vale la fórmula', 'del tramo izquierdo (flecha azul).'],
    ['Con esa fórmula, el límite por la', 'izquierda es 2 más 1, que es 3.'],
    ['Por la derecha del 2 vale la fórmula', 'del tramo derecho (flecha verde).'],
    ['Con esa fórmula, el límite por la', 'derecha es 5 menos 2, que es 3.'],
    ['Los dos lados llegan a 3: la función', 'tiene límite en 2, y vale 3.'],
    ['El punto suelto está a la altura 1:', 'el valor en 2 no participa en el límite.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: en el cambio de fórmula, cada lado se calcula con la fórmula de su tramo. Animación en siete pasos con una gráfica. Uno: la gráfica de f tiene dos tramos rectos: uno sube, y igual a x más 1, a la izquierda de x igual a 2; el otro baja, y igual a 5 menos x, a la derecha. Los dos llegan a un círculo vacío a la altura 3 sobre x igual a 2, y hay un punto lleno suelto a la altura 1: f de 2 es 1. Dos: una flecha azul recorre el tramo izquierdo hacia el 2. Tres: una punteada azul marca la altura 3 y, bajo la gráfica, la cuenta 2 más 1 igual a 3. Cuatro: una flecha verde recorre el tramo derecho hacia el 2. Cinco: una punteada verde marca la altura 3 y la cuenta 5 menos 2 igual a 3. Seis: los dos laterales coinciden: el límite de f en 2 es 3. Siete: un anillo burdeo rodea el punto suelto: f de 2 es 1, distinto de 3, y no participa en el límite. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> por la izquierda de \\(2\\)</span><span><i class="sw alt"></i> por la derecha de \\(2\\)</span><span><i class="sw rise"></i> el límite</span><span><i class="sw tan"></i> el valor en \\(2\\)</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, w, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'en el cambio de fórmula, cada lado', 'se calcula con la fórmula de su tramo.');
      /* marco: ejes con marcas y números, y la vertical punteada del punto de cambio a = 2 */
      lmEjes(S, M); lmSeg(S, M, A, 0, A, 4.5, mu, 1, [2, 4]);
      lmEtq(T, M, 'EX', 4.4, 0, 0, 8, 0); lmEtq(T, M, 'EY', 0, 4.5, -50, 0, -13);
      /* paso 1: los dos tramos, cada uno con su fórmula, y el punto suelto */
      a = Math.min(1, ap(1)*2);
      lmCurva(S, M, f, 0, A*a - 1e-6, C.ink, 2); lmCurva(S, M, f, A + 1e-6, A + 2.4*a, C.ink, 2);
      if (ap(1) > 0.9){ lmEtq(T, M, 'CI', 0.55, 0.75, 0); lmEtq(T, M, 'CD', 3.35, 2.25, 0); lmEtq(T, M, 'PV', A, VA, 0, 11, 0); }
      /* paso 2: por la izquierda vale el tramo izquierdo (flecha azul) */
      a = ap(2);
      if (a > 0) lmFlecha(S, M, 0.95, 1.95, 0.95 + 0.8*a, 1.95 + 0.8*a, C.sec, 1.6, -5, -6);
      /* paso 3: el límite por la izquierda, con la fórmula del tramo izquierdo */
      a = ap(3);
      if (a > 0.3){ lmSeg(S, M, A, LI, 0, LI, C.sec, 1); frase('hacia 3', 0, LI, 5, -9, C.sec); }
      if (a > 0.5){ w = prNota(S, 'por la izquierda:', -1.2, 1.4, C.sec); T.L('SI', -1.2, 1.4, 0, w + 6, 0); }
      /* paso 4: por la derecha vale el tramo derecho (flecha verde) */
      a = ap(4);
      if (a > 0) lmFlecha(S, M, 3.05, 1.95, 3.05 - 0.8*a, 1.95 + 0.8*a, C.alt, 1.6, 5, -6);
      /* paso 5: el límite por la derecha, con la fórmula del tramo derecho */
      a = ap(5);
      if (a > 0.3){ lmSeg(S, M, A, LD, 4.4, LD, C.alt, 1); frase('hacia 3', 4.4, LD, -3, -9, C.alt, 'right'); }
      if (a > 0.5){ w = prNota(S, 'por la derecha:', 2.15, 1.4, C.alt); T.L('SD', 2.15, 1.4, 0, w + 6, 0); }
      /* círculo vacío donde se juntan los tramos y punto lleno del valor en 2 (encima de las guías) */
      if (ap(1) > 0.5){ lmPunto(S, M, A, LI, C.ink, true, 3.2); lmPunto(S, M, A, VA, C.ink, false, 3); }
      /* paso 6: los laterales coinciden: ese es el límite */
      a = ap(6);
      if (a > 0.5) T.L('LS', 2, 0.85, -50);
      /* paso 7: el valor en el lugar no participa */
      a = ap(7);
      if (a > 0.2) prAnillo(S, M, A, VA, C.tan, 7);
      if (a > 0.4){ w = prNota(S, 'el valor en el lugar no participa:', -1.2, 0.3, C.tan); T.L('NP', -1.2, 0.3, 0, w + 6, 0); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.5) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=x+1\\text{ si }x\\lt 2' + Q + 'f(x)=5-x\\text{ si }x\\gt 2' + Q + '\\text{valor en el lugar: }f(2)=1' + Q + '\\text{punto de cambio de fórmula: }a=2' + Q + '\\text{pregunta: ¿tiene límite }f\\text{ en }2\\text{?}',
      '\\text{por la izquierda (}x\\lt 2\\text{) vale }x+1:' + Q + 'f(1{,}9)=1{,}9+1=2{,}9' + Q + 'f(1{,}99)=1{,}99+1=2{,}99' + Q + 'f(1{,}999)=1{,}999+1=2{,}999',
      '\\text{límite por la izquierda, con }x+1:' + Q + '\\lim_{x\\to 2^{-}}f(x)=\\lim_{x\\to 2^{-}}(x+1)' + Q + '\\lim_{x\\to 2^{-}}(x+1)=2+1=3',
      '\\text{por la derecha (}x\\gt 2\\text{) vale }5-x:' + Q + 'f(2{,}1)=5-2{,}1=2{,}9' + Q + 'f(2{,}01)=5-2{,}01=2{,}99' + Q + 'f(2{,}001)=5-2{,}001=2{,}999',
      '\\text{límite por la derecha, con }5-x:' + Q + '\\lim_{x\\to 2^{+}}f(x)=\\lim_{x\\to 2^{+}}(5-x)' + Q + '\\lim_{x\\to 2^{+}}(5-x)=5-2=3',
      '\\text{laterales: }3\\text{ y }3\\text{, iguales}' + Q + '\\text{criterio de los laterales:}' + Q + '\\lim_{x\\to 2}f(x)=3',
      '\\text{valor en el lugar: }f(2)=1' + Q + '\\text{no se usó en ninguna cuenta}' + Q + '1\\ne 3\\text{: el valor y el límite son distintos}' + Q + '\\text{el límite sigue siendo }3']; return dtPasos(R.slice(0, k)); }
  };
})());
