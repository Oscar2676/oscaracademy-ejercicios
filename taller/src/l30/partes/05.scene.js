/* L30 H05 · límite de una compuesta cuando el límite externo no existe: g(x) = 2 + (x − 1)² tiene límite 2 en a = 1 y entrega más que 2 para x ≠ 1; f salta en u = 2 (laterales 1 y 3), pero a f solo le llegan valores mayores que 2: el límite de f(g(x)) es el lateral derecho de f, 3 (por pasos) */
OA.scene('compext-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function g(x){ return 2 + (x - 1)*(x - 1); }     /* interna: un polinomio; límite 2 en 1, y g(x) > 2 si x ≠ 1 */
  function f(z){ return z <= 2 ? z - 1 : 5 - z; }  /* externa: salta en u = 2 */
  /* lugar, límite de la interna, laterales de la externa en ese número (izquierdo y derecho) */
  var A = 1, B = 2, KI = 1, KD = 3;
  /* marco izquierdo: la interna, u = g(x), con 0 ≤ x ≤ 2,2 y 0 ≤ u ≤ 4,4; marco derecho: la externa, y = f(u), con 0 ≤ u ≤ 4,4 y 0 ≤ y ≤ 4,4 */
  var MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 4.4, 0, 4.4);
  var PZ = [['Q', '\\text{¿a qué se acerca }f(g(x))\\text{ cerca de }1\\text{?}', '¿a qué se acerca f(g(x)) cerca de 1?', 'pt'], ['F', '\\Longrightarrow\\ 3', '⟹ 3', 'diff'],
    ['EX', 'x', 'x', ''], ['EU1', 'u', 'u', ''], ['EU2', 'u', 'u', ''], ['EY', 'y', 'y', ''],
    ['CG', 'u=g(x)', 'u = g(x)', ''], ['CF', 'y=f(u)', 'y = f(u)', ''],
    ['GS', 'g(x)\\gt 2\\text{ si }x\\ne 1', 'g(x) > 2 si x ≠ 1', ''],
    ['LS', '\\lim_{x\\to 1}f(g(x))=3', 'lím f(g(x)) = 3', 'diff'],
    ['CM', 'h(0{,}9)=2{,}99;\\ \\ h(1{,}1)=2{,}99', 'h(0,9) = 2,99; h(1,1) = 2,99', ''],
    ['R1', 'h(x)=f(g(x));\\ \\ a=1', 'h(x) = f(g(x)); a = 1', ''],
    ['R2', '\\lim_{u\\to 2^{-}}f(u)=1;\\ \\ \\lim_{u\\to 2^{+}}f(u)=3', 'lím u→2⁻ f(u) = 1; lím u→2⁺ f(u) = 3', 'c-tan'],
    ['R3', '\\lim_{x\\to 1^{-}}g(x)=2;\\ \\ g(x)\\gt 2', 'lím x→1⁻ g(x) = 2; g(x) > 2', 'c-sec'],
    ['R4', '\\lim_{x\\to 1^{+}}g(x)=2;\\ \\ g(x)\\gt 2', 'lím x→1⁺ g(x) = 2; g(x) > 2', 'c-alt'],
    ['R5', '\\text{se usa }\\lim_{u\\to 2^{+}}f(u)=3', 'se usa lím u→2⁺ f(u) = 3', 'diff'],
    ['R6', '\\lim_{x\\to 1}f(g(x))=3', 'lím f(g(x)) = 3', 'diff'],
    ['R7', 'h(0{,}99)=2{,}9999;\\ \\ h(1{,}01)=2{,}9999', 'h(0,99) = 2,9999; h(1,01) = 2,9999', '']];
  var TXT = [['A la izquierda, g recibe x y entrega u.', 'A la derecha, f recibe ese u y entrega y.'],
    ['La externa f salta en u igual a 2: por un lado', 'va hacia 1 y por el otro hacia 3. Sin límite.'],
    ['Por la izquierda del 1 (flecha azul), g baja', 'hacia 2: ahí entrega siempre más que 2.'],
    ['Por la derecha del 1 (flecha verde), lo mismo:', 'g va hacia 2 y entrega más que 2.'],
    ['A f le llegan solo valores mayores que 2:', 'se usa su tramo derecho, que va hacia 3.'],
    ['El límite externo no existe, pero el de la', 'compuesta sí: es el lateral derecho de f, 3.'],
    ['Comprobación con valores cercanos al 1:', 'la compuesta da 2,99 y 2,99.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: aunque la externa salte, la compuesta puede tener límite, y decide por qué lado llega g. Animación en siete pasos con dos gráficas lado a lado. Uno: a la izquierda, la gráfica de la función interna, u igual a g de x, una parábola con su punto más bajo en 1 coma 2; a la derecha, la gráfica de la función externa, y igual a f de u, con un salto sobre u igual a 2: por la izquierda llega a un punto lleno a la altura 1 y por la derecha parte de un círculo vacío a la altura 3. Dos: se marca en burdeo el salto de f, de la altura 1 a la altura 3: f no tiene límite en 2. Tres: una flecha azul recorre la parábola por la izquierda de 1: lo que entrega g va hacia 2 y es mayor que 2. Cuatro: una flecha verde la recorre por la derecha de 1: también va hacia 2 y es mayor que 2. Cinco: en la gráfica de f, una flecha naranja recorre el tramo derecho hacia el círculo vacío de altura 3: a f solo le llegan valores mayores que 2. Seis: el límite de la compuesta es 3, el lateral derecho de f. Siete: comprobación con valores: h de 0,9 igual a 2,99 y h de 1,1 igual a 2,99. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> por la izquierda de \\(1\\)</span><span><i class="sw alt"></i> por la derecha de \\(1\\)</span><span><i class="sw rise"></i> el tramo de \\(f\\) que se usa y el límite</span><span><i class="sw tan"></i> el salto de \\(f\\)</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, M, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'aunque la externa salte, la compuesta', 'puede tener límite: decide por dónde llega g.');
      /* los dos marcos: ejes con marcas y números; en el de g, la vertical del lugar a = 1 y la horizontal de la altura 2 */
      lmEjes(S, MG); lmEjes(S, MF); lmSeg(S, MG, A, 0, A, 4.4, mu, 1, [2, 4]); lmSeg(S, MG, 0, B, 2.2, B, mu, 1, [2, 4]);
      lmEtq(T, MG, 'EX', 2.2, 0, 0, 8, 0); lmEtq(T, MG, 'EU1', 0, 4.4, -50, 0, -13); lmEtq(T, MF, 'EU2', 4.4, 0, 0, 8, 0); lmEtq(T, MF, 'EY', 0, 4.4, -50, 0, -13);
      /* paso 5 (al fondo): en la gráfica de f, la punteada naranja de la altura 3 */
      a = ap(5);
      if (a > 0) lmSeg(S, MF, B, KD, B - B*a, KD, C.rise, 1.2, [5, 3]);
      /* paso 1: las dos gráficas: la parábola de g y los dos tramos de f */
      a = Math.min(1, ap(1)*2);
      lmCurva(S, MG, g, 0, 2.2*a, C.ink, 2);
      lmCurva(S, MF, f, 1, 1 + a, C.ink, 2); lmCurva(S, MF, f, B + 1e-6, B + 2.4*a, C.ink, 2);
      if (ap(1) > 0.9){ lmEtq(T, MG, 'CG', 1.1, 4, -50); lmEtq(T, MF, 'CF', 3.3, 4, -50); }
      /* paso 2: la externa salta en u = 2, de la altura 1 a la altura 3 */
      a = ap(2);
      if (a > 0) lmSeg(S, MF, B, KI, B, KI + (KD - KI)*Math.min(1, a*1.6), C.tan, 2.2, 0);
      if (a > 0.5){ frase('hacia 1', MF, B, KI, 9, 5, C.tan); frase('hacia 3', MF, B, KD, -9, 0, C.tan, 'right'); prNota(S, 'f salta en 2: de 1 a 3', 2.55, 1.4, C.tan); }
      /* paso 3: por la izquierda del 1, lo que entrega g baja hacia 2 (flecha azul) */
      a = ap(3);
      if (a > 0) lmFlecha(S, MG, 0.2, g(0.2), 0.2 + 0.6*a, g(0.2) + (g(0.8) - g(0.2))*a, C.sec, 1.6, 6, -6);
      if (a > 0.6) frase('hacia 2', MG, 0, B, 5, 9, C.sec);
      /* paso 4: por la derecha del 1, lo mismo (flecha verde): g entrega más que 2 por los dos lados */
      a = ap(4);
      if (a > 0) lmFlecha(S, MG, 1.8, g(1.8), 1.8 - 0.6*a, g(1.8) + (g(1.2) - g(1.8))*a, C.alt, 1.6, -6, -6);
      if (a > 0.6) T.L('GS', -1.2, 1.4, 0);
      /* paso 5: a f solo le llegan valores mayores que 2: se recorre su tramo derecho hacia el hueco (2, 3) */
      a = ap(5);
      if (a > 0) lmFlecha(S, MF, 3.5, f(3.5), 3.5 - 1.05*a, f(3.5) + (f(2.45) - f(3.5))*a, C.rise, 1.6, 6, -6);
      if (a > 0.5) prNota(S, 'a f solo le llegan valores mayores que 2', -1.2, 0.9, C.rise);
      /* puntos de las gráficas (encima de las guías): el más bajo de g, el lleno y el hueco de f */
      if (ap(1) > 0.5){ lmPunto(S, MG, A, B, C.ink, false, 3); lmPunto(S, MF, B, KI, C.ink, false, 3.2); lmPunto(S, MF, B, KD, C.ink, true, 3.2); }
      /* paso 6: el límite de la compuesta es el lateral derecho de f */
      a = ap(6);
      if (a > 0.3) prAnillo(S, MF, B, KD, C.rise, 7);
      if (a > 0.6) T.L('LS', -1.2, 0.4, 0);
      /* paso 7: comprobación con valores cercanos al 1 */
      a = ap(7);
      if (a > 0.4) T.L('CM', 5.2, 0.4, -100);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.6) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{interna: }g(x)=2+(x-1)^{2}' + Q + '\\text{externa: }f(u)=u-1\\text{ si }u\\le 2' + Q + '\\text{y }f(u)=5-u\\text{ si }u\\gt 2' + Q + '\\text{compuesta: }h(x)=f(g(x))' + Q + '\\text{primero actúa }g\\text{; su resultado }u\\text{ entra en }f' + Q + '\\text{pregunta: ¿a qué se acerca }h(x)\\text{ cerca de }1\\text{?}',
      '\\text{la externa, a la izquierda de }2\\text{ (}u\\lt 2\\text{):}' + Q + 'f(1{,}9)=1{,}9-1=0{,}9' + Q + 'f(1{,}99)=1{,}99-1=0{,}99' + Q + '\\lim_{u\\to 2^{-}}f(u)=2-1=1' + Q + '\\text{a la derecha de }2\\text{ (}u\\gt 2\\text{):}' + Q + 'f(2{,}1)=5-2{,}1=2{,}9' + Q + 'f(2{,}01)=5-2{,}01=2{,}99' + Q + '\\lim_{u\\to 2^{+}}f(u)=5-2=3' + Q + '1\\ne 3:\\ f\\text{ no tiene límite en }2',
      '\\text{la interna, por la izquierda del }1:' + Q + 'g(0{,}9)=2+(0{,}9-1)^{2}' + Q + '=2+(-0{,}1)^{2}=2+0{,}01=2{,}01' + Q + 'g(0{,}99)=2+(0{,}99-1)^{2}' + Q + '=2+(-0{,}01)^{2}=2+0{,}0001=2{,}0001' + Q + '\\lim_{x\\to 1^{-}}g(x)=2+(1-1)^{2}=2+0=2' + Q + '(x-1)^{2}\\gt 0\\text{ si }x\\ne 1:\\ g(x)\\gt 2',
      '\\text{la interna, por la derecha del }1:' + Q + 'g(1{,}1)=2+(1{,}1-1)^{2}' + Q + '=2+0{,}1^{2}=2+0{,}01=2{,}01' + Q + 'g(1{,}01)=2+(1{,}01-1)^{2}' + Q + '=2+0{,}01^{2}=2+0{,}0001=2{,}0001' + Q + '\\lim_{x\\to 1^{+}}g(x)=2+(1-1)^{2}=2+0=2' + Q + '\\text{también }g(x)\\gt 2',
      '\\lim_{x\\to 1}g(x)=2\\text{, y }g(x)\\gt 2\\text{ si }x\\ne 1' + Q + '\\text{lo que entra en }f\\text{ es mayor que }2' + Q + '\\text{y se acerca a }2\\text{: solo cuenta}' + Q + '\\lim_{u\\to 2^{+}}f(u)=3' + Q + '\\text{el lateral izquierdo, }1\\text{, no participa}',
      '\\text{límite externo: no existe (}1\\ne 3\\text{)}' + Q + '\\text{límite de la compuesta:}' + Q + '\\lim_{x\\to 1}f(g(x))=\\lim_{u\\to 2^{+}}f(u)=3',
      '\\text{comprobación con valores:}' + Q + 'h(0{,}9)=f(2{,}01)=5-2{,}01=2{,}99' + Q + 'h(1{,}1)=f(2{,}01)=5-2{,}01=2{,}99' + Q + '\\text{más cerca del }1:' + Q + 'h(0{,}99)=f(2{,}0001)' + Q + '=5-2{,}0001=2{,}9999' + Q + 'h(1{,}01)=f(2{,}0001)' + Q + '=5-2{,}0001=2{,}9999' + Q + '\\text{los valores se acercan a }3' + Q + '\\text{en el propio }1:\\ h(1)=f(2)=2-1=1' + Q + '\\text{ese valor no participa en el límite}']; return dtPasos(R.slice(0, k)); }
  };
})());
