/* L30 H04 · límite de una compuesta cuando el límite interno no existe: g salta en a = 1 (laterales 2 y 3), pero f(u) = u² − 5u + 8 vale 2 tanto en u = 2 como en u = 3; los dos laterales de f(g(x)) son 2 y el límite de la compuesta es 2 (por pasos) */
OA.scene('compint-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function g(x){ return x < 1 ? x + 1 : 4 - x; }   /* interna; definida solo para x ≠ 1 */
  function f(z){ return z*z - 5*z + 8; }           /* externa: un polinomio */
  /* lugar, los dos laterales de la interna y el valor común de la externa en ellos */
  var A = 1, GI = 2, GD = 3, K = 2;
  /* marco izquierdo: la interna, u = g(x), con 0 ≤ x ≤ 2,2 y 0 ≤ u ≤ 4,4; marco derecho: la externa, y = f(u), con 0 ≤ u ≤ 5,4 y 0 ≤ y ≤ 5,4 */
  var MG = lmMarco(-0.85, 2.1, 2.6, 2.95, 0, 2.2, 0, 4.4), MF = lmMarco(2.55, 2.1, 2.6, 2.95, 0, 5.4, 0, 5.4);
  var PZ = [['Q', '\\text{¿a qué se acerca }f(g(x))\\text{ cerca de }1\\text{?}', '¿a qué se acerca f(g(x)) cerca de 1?', 'pt'], ['F', '\\Longrightarrow\\ 2', '⟹ 2', 'diff'],
    ['EX', 'x', 'x', ''], ['EU1', 'u', 'u', ''], ['EU2', 'u', 'u', ''], ['EY', 'y', 'y', ''],
    ['CG', 'u=g(x)', 'u = g(x)', ''], ['CF', 'y=f(u)', 'y = f(u)', ''],
    ['VI', 'f(2)=2', 'f(2) = 2', 'c-sec'], ['VD', 'f(3)=2', 'f(3) = 2', 'c-alt'],
    ['LS', '\\lim_{x\\to 1}f(g(x))=2', 'lím f(g(x)) = 2', 'diff'],
    ['CM', 'h(0{,}9)=2{,}11;\\ \\ h(1{,}1)=1{,}91', 'h(0,9) = 2,11; h(1,1) = 1,91', ''],
    ['R1', 'h(x)=f(g(x));\\ \\ a=1', 'h(x) = f(g(x)); a = 1', ''],
    ['R2', '\\lim_{x\\to 1^{-}}g(x)=2', 'lím x→1⁻ g(x) = 2', 'c-sec'],
    ['R3', '\\lim_{x\\to 1^{-}}f(g(x))=f(2)=2', 'lím x→1⁻ f(g(x)) = f(2) = 2', 'c-sec'],
    ['R4', '\\lim_{x\\to 1^{+}}g(x)=3', 'lím x→1⁺ g(x) = 3', 'c-alt'],
    ['R5', '\\lim_{x\\to 1^{+}}f(g(x))=f(3)=2', 'lím x→1⁺ f(g(x)) = f(3) = 2', 'c-alt'],
    ['R6', '\\lim_{x\\to 1}f(g(x))=2', 'lím f(g(x)) = 2', 'diff'],
    ['R7', 'h(0{,}99)=2{,}0101;\\ \\ h(1{,}01)=1{,}9901', 'h(0,99) = 2,0101; h(1,01) = 1,9901', '']];
  var TXT = [['A la izquierda, g recibe x y entrega u.', 'A la derecha, f recibe ese u y entrega y.'],
    ['Por la izquierda del 1 (flecha azul),', 'lo que entrega g va hacia 2.'],
    ['Eso entra en f: cerca de u igual a 2,', 'la altura de f va hacia 2.'],
    ['Por la derecha del 1 (flecha verde),', 'lo que entrega g va hacia 3.'],
    ['Eso entra en f: cerca de u igual a 3,', 'la altura de f también va hacia 2.'],
    ['g no tiene límite en 1 (salta de 2 a 3),', 'pero la compuesta sí: los dos lados dan 2.'],
    ['Comprobación con valores cercanos al 1:', 'la compuesta da 2,11 y 1,91.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.3, y1:7.2}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: aunque la interna salte, la compuesta puede tener límite, y se mira cada lado. Animación en siete pasos con dos gráficas lado a lado. Uno: a la izquierda, la gráfica de la función interna, u igual a g de x, con un salto sobre x igual a 1: por la izquierda llega a un círculo vacío a la altura 2 y por la derecha parte de un círculo vacío a la altura 3; a la derecha, la gráfica de la función externa, y igual a f de u, una parábola que pasa por los puntos 2 coma 2 y 3 coma 2. Dos: una flecha azul recorre el tramo izquierdo de g: lo que entrega va hacia 2. Tres: en la gráfica de f se marca u igual a 2 y una flecha azul recorre la parábola hacia el punto 2 coma 2: la altura va hacia 2. Cuatro: una flecha verde recorre el tramo derecho de g: lo que entrega va hacia 3. Cinco: en la gráfica de f se marca u igual a 3 y una flecha verde va hacia el punto 3 coma 2: la altura también va hacia 2. Seis: g salta de 2 a 3 y no tiene límite en 1, pero los dos lados de la compuesta dan 2: su límite es 2. Siete: comprobación con valores: h de 0,9 igual a 2,11 y h de 1,1 igual a 1,91. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> por la izquierda de \\(1\\)</span><span><i class="sw alt"></i> por la derecha de \\(1\\)</span><span><i class="sw rise"></i> el límite de la compuesta</span><span><i class="sw tan"></i> el salto de \\(g\\)</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, T = dtEtq(S, PZ), a, w, mu = C.muted || '#6b6b6b';
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, M, x, y, dx, dy, col, al){ prFr(S, M, t, x, y, dx, dy, col, al); }
      dtQue(S, 'aunque la interna salte, la compuesta', 'puede tener límite: se mira cada lado.');
      /* los dos marcos: ejes con marcas y números; en el de g, la vertical punteada del lugar a = 1 */
      lmEjes(S, MG); lmEjes(S, MF); lmSeg(S, MG, A, 0, A, 4.4, mu, 1, [2, 4]);
      lmEtq(T, MG, 'EX', 2.2, 0, 0, 8, 0); lmEtq(T, MG, 'EU1', 0, 4.4, -50, 0, -13); lmEtq(T, MF, 'EU2', 5.4, 0, 0, 8, 0); lmEtq(T, MF, 'EY', 0, 5.4, -50, 0, -13);
      /* paso 6 (al fondo): en la gráfica de f, la punteada naranja de la altura común 2 */
      a = ap(6);
      if (a > 0) lmSeg(S, MF, 0, K, 5.4*a, K, C.rise, 1.2, [5, 3]);
      /* paso 1: las dos gráficas: g con su salto sobre x = 1 y la parábola de f */
      a = Math.min(1, ap(1)*2);
      lmCurva(S, MG, g, 0, A*a - 1e-6, C.ink, 2); lmCurva(S, MG, g, A + 1e-6, A + 1.2*a, C.ink, 2);
      lmCurva(S, MF, f, 0.7, 0.7 + 3.6*a, C.ink, 2);
      if (ap(1) > 0.9){ lmEtq(T, MG, 'CG', 2.15, 4, -100); lmEtq(T, MF, 'CF', 2.5, 4.9, -50); }
      /* paso 2: por la izquierda, lo que entrega g va hacia 2 (flecha y punteada azules) */
      a = ap(2);
      if (a > 0) lmFlecha(S, MG, 0.25, 1.25, 0.25 + 0.6*a, 1.25 + 0.6*a, C.sec, 1.6, -5, -6);
      if (a > 0.6){ lmSeg(S, MG, A, GI, 0, GI, C.sec, 1); frase('hacia 2', MG, 0, GI, 5, -9, C.sec); }
      /* paso 3: ese 2 entra en f: se marca u = 2 y la parábola va hacia el punto (2, 2) */
      a = ap(3);
      if (a > 0){ lmSeg(S, MF, GI, 0, GI, K*Math.min(1, a*2), C.sec, 1); lmFlecha(S, MF, 1.2, f(1.2), 1.2 + 0.6*a, f(1.2) + (f(1.8) - f(1.2))*a, C.sec, 1.6, -7, -2); }
      if (a > 0.5){ w = prNota(S, 'por la izquierda:', -1.2, 1.4, C.sec); T.L('VI', -1.2, 1.4, 0, w + 6, 0); }
      /* paso 4: por la derecha, lo que entrega g va hacia 3 (flecha y punteada verdes) */
      a = ap(4);
      if (a > 0) lmFlecha(S, MG, 1.75, 2.25, 1.75 - 0.6*a, 2.25 + 0.6*a, C.alt, 1.6, 5, -6);
      if (a > 0.6){ lmSeg(S, MG, A, GD, 0, GD, C.alt, 1); frase('hacia 3', MG, 0, GD, 5, -9, C.alt); }
      /* paso 5: ese 3 entra en f: se marca u = 3 y la parábola va hacia el punto (3, 2) */
      a = ap(5);
      if (a > 0){ lmSeg(S, MF, GD, 0, GD, K*Math.min(1, a*2), C.alt, 1); lmFlecha(S, MF, 2.2, f(2.2), 2.2 + 0.65*a, f(2.2) + (f(2.85) - f(2.2))*a, C.alt, 1.6, 0, 8); }
      if (a > 0.5){ w = prNota(S, 'por la derecha:', 2.15, 1.4, C.alt); T.L('VD', 2.15, 1.4, 0, w + 6, 0); }
      /* huecos del salto de g y puntos de f (encima de las guías) */
      if (ap(1) > 0.5){ lmPunto(S, MG, A, GI, C.ink, true, 3.2); lmPunto(S, MG, A, GD, C.ink, true, 3.2); }
      if (ap(3) > 0.5) lmPunto(S, MF, GI, K, C.sec, false, 3.2);
      if (ap(5) > 0.5) lmPunto(S, MF, GD, K, C.alt, false, 3.2);
      /* paso 6: g salta (sin límite), pero los dos lados de la compuesta dan lo mismo */
      a = ap(6);
      if (a > 0.3){ lmSeg(S, MG, A, GI, A, GI + (GD - GI)*Math.min(1, a*1.6), C.tan, 2.2, 0); frase('g salta de 2 a 3', MG, 1.1, 0.5, 0, 0, C.tan, 'center'); }
      if (a > 0.6) T.L('LS', 2, 0.85, -50);
      /* paso 7: comprobación con valores cercanos al 1 */
      a = ap(7);
      if (a > 0.4){ w = prNota(S, 'valores:', -0.75, 0.3, C.ink); T.L('CM', -0.75, 0.3, 0, w + 6, 0); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.86, 0); if (k >= 6 && ap(6) > 0.6) T.L('F', 5.2, 5.86, -100);
      prPie(S, k, N, TXT, -0.3, -1.85);
      T.fin();
      oaReg(S, k, N, -1.2, -1.85, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{interna: }g(x)=x+1\\text{ si }x\\lt 1' + Q + '\\text{y }g(x)=4-x\\text{ si }x\\gt 1\\text{ (sin valor en }1\\text{)}' + Q + '\\text{externa: }f(u)=u^{2}-5u+8' + Q + '\\text{compuesta: }h(x)=f(g(x))' + Q + '\\text{primero actúa }g\\text{; su resultado }u\\text{ entra en }f' + Q + '\\text{pregunta: ¿a qué se acerca }h(x)\\text{ cerca de }1\\text{?}',
      '\\text{por la izquierda del }1\\text{ (}x\\lt 1\\text{):}' + Q + 'g(0{,}9)=0{,}9+1=1{,}9' + Q + 'g(0{,}99)=0{,}99+1=1{,}99' + Q + '\\lim_{x\\to 1^{-}}g(x)=2',
      '\\text{lo que entra en }f\\text{ se acerca a }2\\text{;}' + Q + 'f\\text{ es un polinomio: }\\lim_{u\\to 2}f(u)=f(2)' + Q + 'f(2)=2^{2}-5\\cdot 2+8=4-10+8=2' + Q + '\\lim_{x\\to 1^{-}}f(g(x))=2',
      '\\text{por la derecha del }1\\text{ (}x\\gt 1\\text{):}' + Q + 'g(1{,}1)=4-1{,}1=2{,}9' + Q + 'g(1{,}01)=4-1{,}01=2{,}99' + Q + '\\lim_{x\\to 1^{+}}g(x)=3',
      '\\text{lo que entra en }f\\text{ se acerca a }3\\text{;}' + Q + '\\lim_{u\\to 3}f(u)=f(3)' + Q + 'f(3)=3^{2}-5\\cdot 3+8=9-15+8=2' + Q + '\\lim_{x\\to 1^{+}}f(g(x))=2',
      '\\text{laterales de }g:\\ 2\\text{ y }3\\text{, distintos}' + Q + 'g\\text{ no tiene límite en }1' + Q + '\\text{laterales de la compuesta: }2\\text{ y }2\\text{, iguales}' + Q + '\\lim_{x\\to 1}f(g(x))=2',
      '\\text{comprobación con valores:}' + Q + 'h(0{,}9)=f(1{,}9)=1{,}9^{2}-5\\cdot 1{,}9+8' + Q + '=3{,}61-9{,}5+8=2{,}11' + Q + 'h(1{,}1)=f(2{,}9)=2{,}9^{2}-5\\cdot 2{,}9+8' + Q + '=8{,}41-14{,}5+8=1{,}91' + Q + '\\text{más cerca del }1:' + Q + 'h(0{,}99)=f(1{,}99)' + Q + '=3{,}9601-9{,}95+8=2{,}0101' + Q + 'h(1{,}01)=f(2{,}99)' + Q + '=8{,}9401-14{,}95+8=1{,}9901' + Q + '\\text{los valores se acercan a }2']; return dtPasos(R.slice(0, k)); }
  };
})());
