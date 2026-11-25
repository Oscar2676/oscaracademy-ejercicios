/* L30 H06 · teorema de la compuesta cuando la condición sobre la externa no se cumple: g(x) = x + 1 tiene límite 2 en a = 1; f(u) = u + 1 si u ≠ 2 y f(2) = 5 tiene límite 3 en 2, distinto de su valor; como g(x) ≠ 2 para x ≠ 1, la compuesta tiene límite 3 (el hueco), no 5; con la interna constante c(x) = 2 el límite es 5 (por pasos) */
OA.scene('compteo-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function g(x){ return x + 1; }                    /* interna */
  function fl(z){ return z + 1; }                   /* la recta de la externa (vale para u ≠ 2) */
  function f(z){ return z === 2 ? 5 : z + 1; }      /* externa: hueco en (2, 3) y punto lleno en (2, 5) */
  /* lugar, límite interno, límite de la externa en b y valor de la externa en b */
  var A = 1, B = 2, K = 3, FB = 5;
  /* marco izquierdo: la interna, u = g(x), con 0 ≤ x ≤ 2,2 y 0 ≤ u ≤ 4,4; marco derecho: la externa, y = f(u), con 0 ≤ u ≤ 4,4 y 0 ≤ y ≤ 5,8 */
  var MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 5.8);
  var PZ = [['Q', '\\text{¿a qué se acerca }f(g(x))\\text{ cerca de }1\\text{?}', '¿a qué se acerca f(g(x)) cerca de 1?', 'pt'], ['F', '\\Longrightarrow\\ 3', '⟹ 3', 'diff'],
    ['EX', 'x', 'x', ''], ['EU1', 'u', 'u', ''], ['EU2', 'u', 'u', ''], ['EY', 'y', 'y', ''],
    ['CG', 'u=g(x)', 'u = g(x)', ''], ['CF', 'y=f(u)', 'y = f(u)', ''],
    ['LG', '\\lim_{x\\to 1}g(x)=2', 'lím g(x) = 2', 'c-sec'], ['LF', '\\lim_{u\\to 2}f(u)=3', 'lím f(u) = 3', 'c-alt'],
    ['VF', 'f(2)=5', 'f(2) = 5', 'c-tan'],
    ['CM', 'h(0{,}9)=2{,}9;\\ \\ h(1{,}1)=3{,}1', 'h(0,9) = 2,9; h(1,1) = 3,1', ''],
    ['LS', '\\lim_{x\\to 1}f(g(x))=3', 'lím f(g(x)) = 3', 'diff'],
    ['KC', 'u=c(x)', 'u = c(x)', 'c-tan'], ['CC', '\\lim_{x\\to 1}f(c(x))=5', 'lím f(c(x)) = 5', 'c-tan'],
    ['R1', 'h(x)=f(g(x));\\ \\ a=1', 'h(x) = f(g(x)); a = 1', ''],
    ['R2', '\\lim_{x\\to 1}g(x)=2', 'lím x→1 g(x) = 2', 'c-sec'],
    ['R3', '\\lim_{u\\to 2}f(u)=3', 'lím u→2 f(u) = 3', 'c-alt'],
    ['R4', 'f(2)=5\\ne 3', 'f(2) = 5 ≠ 3', 'c-tan'],
    ['R5', 'h(0{,}99)=2{,}99;\\ \\ h(1{,}01)=3{,}01', 'h(0,99) = 2,99; h(1,01) = 3,01', ''],
    ['R6', '\\lim_{x\\to 1}f(g(x))=3', 'lím f(g(x)) = 3', 'diff'],
    ['R7', 'c(x)=2:\\ \\ \\lim_{x\\to 1}f(c(x))=5', 'c(x) = 2: lím f(c(x)) = 5', 'c-tan']];
  var TXT = [['A la izquierda, g recibe x y entrega u.', 'A la derecha, f recibe ese u y entrega y.'],
    ['Condición 1: por los dos lados del 1,', 'lo que entrega g va hacia 2. Se cumple.'],
    ['Cerca de u igual a 2, las alturas de f', 'van hacia 3: ese es su límite (el hueco).'],
    ['Condición 2: el valor de f en 2 es 5, no 3.', 'No se cumple: el teorema no se puede usar.'],
    ['Estudio directo: si x no es 1, g no vale 2.', 'Entonces f nunca usa su punto lleno.'],
    ['La compuesta va hacia el hueco:', 'su límite es 3, y no el valor 5.'],
    ['Otra interna, la constante 2 (burdeo):', 'siempre entra 2 en f, y el límite es 5.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: si el valor de la externa no es su límite, el teorema no se puede usar y se estudia directo. Animación en siete pasos con dos gráficas lado a lado. Uno: a la izquierda, la gráfica de la función interna, u igual a g de x, una recta que pasa por el punto 1 coma 2; a la derecha, la gráfica de la función externa, y igual a f de u, una recta con un círculo vacío en 2 coma 3 y un punto lleno aparte en 2 coma 5. Dos: dos flechas azules recorren la recta de g hacia el punto 1 coma 2: lo que entrega g va hacia 2; la primera condición se cumple. Tres: dos flechas verdes recorren la gráfica de f hacia el círculo vacío: las alturas van hacia 3, que es el límite de f en 2. Cuatro: un anillo burdeo marca el punto lleno: el valor de f en 2 es 5, distinto de 3; la segunda condición no se cumple y el teorema no se puede usar. Cinco: en la gráfica de g se marca el único punto donde g vale 2; para x distinto de 1, f nunca usa su punto lleno; valores: h de 0,9 igual a 2,9 y h de 1,1 igual a 3,1. Seis: un anillo naranjo marca el círculo vacío: el límite de la compuesta es 3, no 5. Siete: otra interna, la constante 2, dibujada como recta horizontal burdeo: siempre entra 2 en f y el límite de esa compuesta es 5. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> la interna \\(g\\)</span><span><i class="sw alt"></i> el límite de \\(f\\) en \\(2\\)</span><span><i class="sw tan"></i> el valor \\(f(2)\\) y la interna constante</span><span><i class="sw rise"></i> el límite de la compuesta</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, w, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, M, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'si el valor de f no es su límite,', 'el teorema no se puede usar: se estudia directo.');
      /* los dos marcos: ejes con marcas y números; en el de g, la vertical punteada del lugar a = 1 */
      lmEjes(S, MG); lmEjes(S, MF); lmSeg(S, MG, A, 0, A, 4.4, mu, 1, [2, 4]);
      lmEtq(T, MG, 'EX', 2.2, 0, 0, 8, 0); lmEtq(T, MG, 'EU1', 0, 4.4, -50, 0, -13); lmEtq(T, MF, 'EU2', 4.4, 0, 0, 8, 0); lmEtq(T, MF, 'EY', 0, 5.8, -50, 0, -13);
      /* paso 7 (al fondo): la interna constante c(x) = 2, recta horizontal burdeo; en f, la punteada sube del hueco al punto lleno */
      a = ap(7);
      if (a > 0){ lmSeg(S, MG, 0, B, 2.2*a, B, C.tan, 1.8, 0); lmSeg(S, MF, B, K, B, K + (FB - K)*a, C.tan, 1.2); }
      if (a > 0.6) lmEtq(T, MG, 'KC', 2.2, B, -100, 0, 11);
      /* paso 1: las dos gráficas: la recta de g y la recta de f con su hueco y su punto lleno */
      a = Math.min(1, ap(1)*2);
      lmCurva(S, MG, g, 0, 2.2*a, C.ink, 2);
      lmCurva(S, MF, fl, 0.3, 0.3 + 3.6*a, C.ink, 2);
      if (ap(1) > 0.9){ lmEtq(T, MG, 'CG', 2.15, 4, -100); lmEtq(T, MF, 'CF', 4.35, 2.6, -100); }
      /* paso 2: por los dos lados del 1, lo que entrega g va hacia 2 (flechas y punteada azules) */
      a = ap(2);
      if (a > 0){ lmFlecha(S, MG, 0.25, 1.25, 0.25 + 0.6*a, 1.25 + 0.6*a, C.sec, 1.6, -5, -6); lmFlecha(S, MG, 1.75, 2.75, 1.75 - 0.6*a, 2.75 - 0.6*a, C.sec, 1.6, 5, 6); }
      if (a > 0.6){ lmSeg(S, MG, A, B, 0, B, C.sec, 1); frase('hacia 2', MG, 0, B, 5, -9, C.sec); w = prNota(S, 'interna:', -1.2, 1.4, C.sec); T.L('LG', -1.2, 1.4, 0, w + 6, 0); }
      /* paso 3: cerca de u = 2 las alturas de f van hacia 3 (flechas y punteadas verdes) */
      a = ap(3);
      if (a > 0){ lmSeg(S, MF, B, 0, B, K*Math.min(1, a*2), C.alt, 1); lmFlecha(S, MF, 0.8, 1.8, 0.8 + 0.9*a, 1.8 + 0.9*a, C.alt, 1.6, -5, -6); lmFlecha(S, MF, 3.2, 4.2, 3.2 - 0.9*a, 4.2 - 0.9*a, C.alt, 1.6, 5, 6); }
      if (a > 0.6){ lmSeg(S, MF, B, K, 0, K, C.alt, 1); frase('hacia 3', MF, 0, K, 5, -9, C.alt); w = prNota(S, 'externa:', 2.15, 1.4, C.alt); T.L('LF', 2.15, 1.4, 0, w + 6, 0); }
      /* hueco y punto lleno de f (encima de las guías) */
      if (ap(1) > 0.5){ lmPunto(S, MF, B, K, C.ink, true, 3.2); lmPunto(S, MF, B, FB, C.ink, false, 3.2); }
      if (ap(1) > 0.9){ frase('hueco', MF, B, K, 8, 30, mu); frase('punto lleno', MF, B, FB, 8, -10, mu); }
      /* paso 4: el valor f(2) = 5 no es el límite 3 (anillo y rótulo burdeo) */
      a = ap(4);
      if (a > 0.3){ prAnillo(S, MF, B, FB, C.tan, 7); lmPunto(S, MF, B, FB, C.tan, false, 3.2); }
      if (a > 0.6) lmEtq(T, MF, 'VF', B, FB, -100, -11, 0);
      /* paso 5: g vale 2 solo en x = 1 (punto y anillo azules); valores de la compuesta */
      a = ap(5);
      if (a > 0.3){ lmPunto(S, MG, A, B, C.sec, false, 3.2); prAnillo(S, MG, A, B, C.sec, 7); frase('solo aquí g vale 2', MG, 1.1, 0.5, 0, 0, C.sec, 'center'); }
      if (a > 0.6){ w = prNota(S, 'valores:', -1.2, 0.85, C.ink); T.L('CM', -1.2, 0.85, 0, w + 6, 0); }
      /* paso 6: la compuesta va hacia el hueco (anillo naranjo) y su límite es 3 */
      a = ap(6);
      if (a > 0.3) prAnillo(S, MF, B, K, C.rise, 7);
      if (a > 0.6) T.L('LS', -1.2, 0.3, 0);
      /* paso 7: con la interna constante, el límite es el valor 5 */
      a = ap(7);
      if (a > 0.6){ w = prNota(S, 'con c:', 2.15, 0.3, C.tan); T.L('CC', 2.15, 0.3, 0, w + 6, 0); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.6) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{interna: }g(x)=x+1' + Q + '\\text{externa: }f(u)=u+1\\text{ si }u\\ne 2\\text{, y }f(2)=5' + Q + '\\text{compuesta: }h(x)=f(g(x))\\text{; lugar: }a=1' + Q + '\\text{primero actúa }g\\text{; su resultado }u\\text{ entra en }f' + Q + '\\text{pregunta: ¿a qué se acerca }h(x)\\text{ cerca de }1\\text{?}',
      '\\text{condición 1: ¿existe el límite interno?}' + Q + 'g(0{,}9)=0{,}9+1=1{,}9' + Q + 'g(1{,}1)=1{,}1+1=2{,}1' + Q + '\\lim_{x\\to 1}g(x)=1+1=2' + Q + '\\text{se cumple, con }b=2',
      '\\text{la externa cerca de }2\\text{ (con }u\\ne 2\\text{):}' + Q + 'f(1{,}9)=1{,}9+1=2{,}9' + Q + 'f(2{,}1)=2{,}1+1=3{,}1' + Q + '\\lim_{u\\to 2}f(u)=2+1=3',
      '\\text{condición 2: ¿ese límite es el valor de }f\\text{ en }2\\text{?}' + Q + '\\text{límite: }3\\text{; valor: }f(2)=5' + Q + '3\\ne 5\\text{: no se cumple}' + Q + '\\text{el teorema no se puede usar}',
      '\\text{estudio directo: }g(x)=2\\text{ solo si }x=1' + Q + '\\text{para }x\\ne 1\\text{: }g(x)\\ne 2\\text{ y }f(g(x))=g(x)+1' + Q + 'h(0{,}9)=f(1{,}9)=1{,}9+1=2{,}9' + Q + 'h(1{,}1)=f(2{,}1)=2{,}1+1=3{,}1' + Q + 'h(0{,}99)=f(1{,}99)=1{,}99+1=2{,}99' + Q + 'h(1{,}01)=f(2{,}01)=2{,}01+1=3{,}01',
      '\\text{para }x\\ne 1:\\ h(x)=(x+1)+1=x+2' + Q + '\\lim_{x\\to 1}f(g(x))=1+2=3' + Q + '\\text{es el límite de }f\\text{ en }2\\text{ (el hueco),}' + Q + '\\text{no el valor }f(2)=5',
      '\\text{otra interna: }c(x)=2\\text{ para todo }x' + Q + '\\lim_{x\\to 1}c(x)=2\\text{ (el mismo límite interno)}' + Q + 'f(c(x))=f(2)=5\\text{ para todo }x' + Q + '\\lim_{x\\to 1}f(c(x))=5' + Q + '\\text{mismo límite interno, otro resultado:}' + Q + '\\text{importa si la interna toca el }2']; return dtPasos(R.slice(0, k)); }
  };
})());
