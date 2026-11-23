/* L29 H01 · introducción a los límites: a qué valor se acerca (x² − 1)/(x − 1) cuando x se acerca a 1 (por pasos); acercarse por los dos lados (número ↔ figura); un salto (número ↔ figura) */
OA.scene('lim-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  function f(x){ return x + 1; } /* la gráfica de (x² − 1)/(x − 1) es la recta y = x + 1 sin el punto (1, 2) */
  var IZ = [0.5, 0.9, 0.99], DE = [1.5, 1.1, 1.01];
  var M = lmMarco(-0.75, 0.35, 5.6, 4.0, -0.4, 2.4, -0.4, 3.4);
  var PZ = [['Q', '\\lim_{x\\to 1}\\tfrac{x^{2}-1}{x-1}=\\ ?', 'lím (x² − 1)/(x − 1) = ?', 'pt'], ['F', '\\Longrightarrow\\ \\lim_{x\\to 1}\\tfrac{x^{2}-1}{x-1}=2', '⟹ lím (x² − 1)/(x − 1) = 2', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=\\tfrac{x^{2}-1}{x-1}', 'y = (x² − 1)/(x − 1)', 'c-tan'], ['HU', '\\text{hueco en }(1,\\ 2)', 'hueco en (1, 2)', 'c-tan'],
    ['LR', 'y=x+1\\ \\ (x\\ne 1)', 'y = x + 1 (x ≠ 1)', 'c-alt'], ['LM', '\\text{límite: }2', 'límite: 2', 'diff'],
    ['R1', 'f(x)=\\tfrac{x^{2}-1}{x-1};\\ \\ f(1)\\text{ no está definida}', 'f(x) = (x² − 1)/(x − 1); f(1) no está definida', ''],
    ['R2', 'x<1:\\ \\ f(0{,}5)=1{,}5;\\ \\ f(0{,}9)=1{,}9;\\ \\ f(0{,}99)=1{,}99', 'x < 1: f(0,5) = 1,5; f(0,9) = 1,9; f(0,99) = 1,99', 'c-sec'],
    ['R3', 'x>1:\\ \\ f(1{,}5)=2{,}5;\\ \\ f(1{,}1)=2{,}1;\\ \\ f(1{,}01)=2{,}01', 'x > 1: f(1,5) = 2,5; f(1,1) = 2,1; f(1,01) = 2,01', 'diff'],
    ['R4', '\\text{por los dos lados, }f(x)\\text{ se acerca a }2', 'por los dos lados, f(x) se acerca a 2', ''],
    ['R5', 'x\\ne 1:\\ \\ \\tfrac{x^{2}-1}{x-1}=\\tfrac{(x-1)(x+1)}{x-1}=x+1', 'x ≠ 1: (x² − 1)/(x − 1) = x + 1', 'c-alt'],
    ['R6', '\\lim_{x\\to 1}\\tfrac{x^{2}-1}{x-1}=2', 'lím (x² − 1)/(x − 1) = 2', 'diff']];
  var TXT = [['La gráfica es una recta con un hueco: en x = 1', 'la función no está definida. ¿Qué pasa cerca?'],
    ['Se toman valores de x menores que 1, cada vez', 'más cerca de 1, y se calcula la función en ellos.'],
    ['Ahora, valores de x mayores que 1, cada vez', 'más cerca de 1, y se calcula la función otra vez.'],
    ['Por la izquierda y por la derecha, los valores', 'de la función se acercan al mismo número: 2.'],
    ['La razón: si x no es 1, la fracción se puede', 'simplificar, y queda la recta de la gráfica.'],
    ['El límite es 2: la altura del hueco. No importa', 'que la función no esté definida en x = 1.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.5, y1:6.3}, aspect:11.8/6.6,
    aria:'Arriba, una franja dice qué muestra: a qué número se acerca la función cuando x se acerca a 1, sin llegar a 1. Animación en seis pasos sobre la gráfica de y igual a x al cuadrado menos 1, dividido por x menos 1. Uno: la gráfica es una recta con un hueco en el punto (1, 2), porque la función no está definida en x igual a 1. Dos: puntos azules sobre la gráfica en x igual a 0,5, 0,9 y 0,99, con valores 1,5, 1,9 y 1,99. Tres: puntos naranjas en x igual a 1,5, 1,1 y 1,01, con valores 2,5, 2,1 y 2,01. Cuatro: sobre el eje vertical, dos flechas, una desde abajo y otra desde arriba, apuntan a la altura 2. Cinco: para x distinto de 1 la fracción se simplifica a x más 1. Seis: el límite es 2, la altura del hueco. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de la función, con su hueco</span><span><i class="sw sec"></i> \\(x\\) menor que 1 (por la izquierda)</span><span><i class="sw rise"></i> \\(x\\) mayor que 1 (por la derecha)</span><span><i class="sw alt"></i> la misma función ya simplificada</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), i, a, xm, hx = X(M.gx(1)), hy = Y(M.gy(2));
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      dtQue(S, 'a qué número se acerca la función', 'cuando x se acerca a 1, sin llegar a 1.');
      lmEjes(S, M); lmEtq(T, M, 'EX', 2.4, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 3.4, 0, 8, 5);
      /* paso 1: la gráfica (recta con hueco) y la recta x = 1 */
      a = ap(1);
      lmSeg(S, M, 1, 0, 1, 2*a, C.muted || '#6b6b6b', 1);
      lmCurva(S, M, f, -0.4, -0.4 + 2.8*a, C.tan, 2);
      if (a > 0.3){ lmFondo(S, M, 'CF', 1.62, 0.62, 0); lmEtq(T, M, 'CF', 1.62, 0.62, 0); }
      /* paso 4: los valores se acercan a 2 (recta y = 2 y flechas sobre el eje vertical) */
      a = ap(4);
      if (a > 0){ lmSeg(S, M, 0.5, 1.5, 0.5*(1 - a), 1.5, C.sec, 1); lmSeg(S, M, 1.5, 2.5, 1.5*(1 - a), 2.5, C.rise, 1); lmSeg(S, M, 1, 2, 1 - a, 2, C.tan, 1.2, [5, 3]);
        lmFlecha(S, M, 0, 1.5, 0, 1.5 + 0.44*a, C.sec, 1.8, 8, 0); lmFlecha(S, M, 0, 2.5, 0, 2.5 - 0.44*a, C.rise, 1.8, 8, 0); }
      /* paso 2: por la izquierda */
      a = ap(2);
      if (a > 0){ xm = k === 2 ? 0.2 + 0.79*u : 0.99;
        lmFlecha(S, M, 0.2, 0, Math.min(xm, 0.94), 0, C.sec, 1.8, 0, -7);
        IZ.forEach(function(x){ if (xm >= x - 1e-9){ lmSeg(S, M, x, 0, x, f(x), C.sec, 1); lmPunto(S, M, x, f(x), C.sec, false, 2.8); } });
        if (k === 2 && u < 1) lmPunto(S, M, xm, f(xm), C.sec, false, 4); }
      /* paso 3: por la derecha */
      a = ap(3);
      if (a > 0){ xm = k === 3 ? 1.8 - 0.79*u : 1.01;
        lmFlecha(S, M, 1.8, 0, Math.max(xm, 1.06), 0, C.rise, 1.8, 0, -7);
        DE.forEach(function(x){ if (xm <= x + 1e-9){ lmSeg(S, M, x, 0, x, f(x), C.rise, 1); lmPunto(S, M, x, f(x), C.rise, false, 2.8); } });
        if (k === 3 && u < 1) lmPunto(S, M, xm, f(xm), C.rise, false, 4); }
      /* paso 5: la recta y = x + 1 */
      a = ap(5);
      if (a > 0){ c.globalAlpha = 0.55*a; lmCurva(S, M, f, -0.4, 2.4, C.alt, 4.5); c.globalAlpha = 1; lmCurva(S, M, f, -0.4, 2.4, C.tan, 2); if (a > 0.5) lmEtq(T, M, 'LR', 1.95, 3.2, -100); }
      /* el hueco va encima de todo: ahí la gráfica no tiene punto */
      if (ap(1) > 0.5){ lmPunto(S, M, 1, 2, C.tan, true, 4); lmFondo(S, M, 'HU', 0.9, 2.84, -100); lmEtq(T, M, 'HU', 0.9, 2.84, -100); }
      /* paso 6: el límite es la altura del hueco */
      a = ap(6);
      if (a > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.6; c.globalAlpha = a; c.beginPath(); c.arc(hx, hy, 4 + 5*a, 0, 6.2832); c.stroke(); c.globalAlpha = 1;
        lmPunto(S, M, 0, 2, C.rise, false, 3); if (a > 0.5){ lmEtq(T, M, 'LM', 0, 2, -100, -17, 0); } }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.86, 0); if (k === 6 && u > 0.5) T.L('F', 1.75, 4.86, 0);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(0.36));
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 137, 172]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=\\dfrac{x^{2}-1}{x-1}' + Q + '\\text{en }x=1:\\ \\ 1^{2}-1=0\\ \\ \\text{y}\\ \\ 1-1=0' + Q + '\\text{no se divide por }0:\\ f(1)\\text{ no está definida}',
      '\\text{por la izquierda }(x<1):' + Q + 'f(0{,}5)=\\tfrac{0{,}5^{2}-1}{0{,}5-1}=\\tfrac{0{,}25-1}{-0{,}5}=\\tfrac{-0{,}75}{-0{,}5}=1{,}5' + Q + 'f(0{,}9)=\\tfrac{0{,}9^{2}-1}{0{,}9-1}=\\tfrac{0{,}81-1}{-0{,}1}=\\tfrac{-0{,}19}{-0{,}1}=1{,}9' + Q + 'f(0{,}99)=\\tfrac{0{,}9801-1}{0{,}99-1}=\\tfrac{-0{,}0199}{-0{,}01}=1{,}99',
      '\\text{por la derecha }(x>1):' + Q + 'f(1{,}5)=\\tfrac{1{,}5^{2}-1}{1{,}5-1}=\\tfrac{2{,}25-1}{0{,}5}=\\tfrac{1{,}25}{0{,}5}=2{,}5' + Q + 'f(1{,}1)=\\tfrac{1{,}1^{2}-1}{1{,}1-1}=\\tfrac{1{,}21-1}{0{,}1}=\\tfrac{0{,}21}{0{,}1}=2{,}1' + Q + 'f(1{,}01)=\\tfrac{1{,}0201-1}{1{,}01-1}=\\tfrac{0{,}0201}{0{,}01}=2{,}01',
      '\\text{distancia a }2:\\ |1{,}99-2|=0{,}01\\ \\text{y}\\ |2{,}01-2|=0{,}01' + Q + '\\text{por los dos lados, }f(x)\\text{ se acerca a }2',
      '\\text{si }x\\ne 1:\\ \\dfrac{x^{2}-1}{x-1}=\\dfrac{(x-1)(x+1)}{x-1}=x+1' + Q + '\\text{y }x+1\\text{ se acerca a }1+1=2\\text{ cuando }x\\text{ se acerca a }1',
      '\\displaystyle\\lim_{x\\to 1}\\dfrac{x^{2}-1}{x-1}=2\\quad\\text{(aunque }f(1)\\text{ no existe)}']; return dtPasos(R.slice(0, k)); }
  };
})());
/* dibujo común de las dos escenas número ↔ figura: x se acerca a 1 por los dos lados, a distancia d */
function lm01Dib(S, v, M, T, G){
  var d = lmR2(v.d == null ? 0.5 : +v.d), C = S.C, c = S.ctx, xi = 1 - d, xd = 1 + d, yi = G.fi(xi), yd = G.fd(xd), mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif';
  lmEjes(S, M); lmEtq(T, M, 'EX', 2.4, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 3.6, -100, -8, 5);
  lmSeg(S, M, 1, 0, 1, Math.max(G.li, G.ld), mu, 1);
  lmSeg(S, M, 0, G.li, G.li === G.ld ? 2.4 : 1, G.li, mu, 1, [5, 3]); if (G.li !== G.ld) lmSeg(S, M, 0, G.ld, 1, G.ld, mu, 1, [5, 3]);
  lmCurva(S, M, G.fi, -0.4, 1, C.tan, 2); lmCurva(S, M, G.fd, 1, 2.4, C.tan, 2);
  if (d > 0){ lmGuia(S, M, xi, yi, C.sec); lmGuia(S, M, xd, yd, C.rise); lmPunto(S, M, xi, yi, C.sec, false, 3.6); lmPunto(S, M, xd, yd, C.rise, false, 3.6);
    lmNum(S, M, lmT(xi, 2), xi, 0, -3, 24, C.sec, 'right'); lmNum(S, M, lmT(xd, 2), xd, 0, 3, 24, C.rise, 'left');
    lmNum(S, M, lmT(yi, 2), 0, yi, -22, 7, C.sec, 'right'); lmNum(S, M, lmT(yd, 2), 0, yd, -22, -7, C.rise, 'right');
    c.font = '600 11.5px ' + F; c.textBaseline = 'middle';
    c.fillStyle = C.sec; c.textAlign = 'right'; c.fillText('izquierda', S.X(M.gx(xi)) - 3, S.Y(M.gy(0)) + 37);
    c.fillStyle = C.rise; c.textAlign = 'left'; c.fillText('derecha', S.X(M.gx(xd)) + 3, S.Y(M.gy(0)) + 37); }
  G.fin.forEach(function(p){ lmPunto(S, M, p[0], p[1], C.tan, p[2], 4); });
  if (d === 0){ c.strokeStyle = C.rise; c.lineWidth = 1.6; G.fin.forEach(function(p){ c.beginPath(); c.arc(S.X(M.gx(p[0])), S.Y(M.gy(p[1])), 9, 0, 6.2832); c.stroke(); }); }
  return d;
}
/* número ↔ figura: los dos puntos se acercan al hueco; caso límite d = 0 */
OA.scene('lim-vivo', (function(){
  var M = lmMarco(-0.75, 0, 5.6, 4.7, -0.4, 2.4, -0.4, 3.6);
  var PZ = [['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''], ['VF', 'y=\\tfrac{x^{2}-1}{x-1}', 'y = (x² − 1)/(x − 1)', 'c-tan'], ['VH', '\\text{hueco }(1,\\ 2)', 'hueco (1, 2)', 'c-tan'], ['VL', 'L=2', 'L = 2', '']];
  var G = {fi:function(x){ return x + 1; }, fd:function(x){ return x + 1; }, li:2, ld:2, fin:[[1, 2, true]]};
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.5, y1:6.0}, aspect:7.5/6.6,
    aria:'Arriba, una franja dice qué muestra: al acercar x a 1 por los dos lados, la función se acerca a 2, y ese es el límite. Gráfica de y igual a x al cuadrado menos 1, dividido por x menos 1: una recta con un hueco en el punto (1, 2). Un punto azul sobre la gráfica, a la izquierda de 1, y uno naranja, a la derecha, están a la misma distancia d de x igual a 1. Al achicar d, los dos puntos se acercan al hueco y sus alturas se acercan a 2. Con d igual a 0 no hay punto: la función no está definida en 1, pero el límite es 2. Bajo el dibujo se calcula el valor de la función en cada punto, paso a paso.',
    labels:PZ,
    sliders:[{id:'d', tex:'d', min:0, max:1, step:0.01, value:0.5}],
    legend:'<span><i class="sw tan"></i> gráfica, con su hueco</span><span><i class="sw sec"></i> \\(x=1-d\\), por la izquierda</span><span><i class="sw rise"></i> \\(x=1+d\\), por la derecha</span>',
    anim:{run:16000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.d = Math.max(0, 1 - dtSuave(p/0.9)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var T = dtEtq(S, PZ), d;
      dtQue(S, 'al acercar x a 1 por los dos lados,', 'la función se acerca a 2: ese es el límite.');
      d = lm01Dib(S, v, M, T, G);
      lmFondo(S, M, 'VF', 1.62, 0.62, 0); lmEtq(T, M, 'VF', 1.62, 0.62, 0); lmFondo(S, M, 'VH', 1, 2.6, -50); lmEtq(T, M, 'VH', 1, 2.6, -50); lmEtq(T, M, 'VL', 2.4, 2, -100, 0, -10);
      if (d > 0){ lmTxt(S, 'x está a ' + lmT(d, 2) + ' de 1; la función, a ' + lmT(d, 2) + ' de 2.', -1.2, -0.8); lmTxt(S, 'Acerca x a 1: los dos puntos van hacia el hueco.', -1.2, -0.8 - 21/(S.X(1) - S.X(0))); }
      else { lmTxt(S, 'Caso límite: en x = 1 no hay punto (hueco).', -1.2, -0.8, S.C.rise); lmTxt(S, 'Igual, el límite es 2: se mira cerca, no en 1.', -1.2, -0.8 - 21/(S.X(1) - S.X(0)), S.C.rise); }
      T.fin();
    },
    caption:function(v){ var d = lmR2(v.d == null ? 0.5 : +v.d); return d > 0 ? 'Con x a ' + lmT(d, 2) + ' de 1, la función vale ' + lmT(2 - d, 2) + ' por la izquierda y ' + lmT(2 + d, 2) + ' por la derecha: los dos valores están a ' + lmT(d, 2) + ' de 2.' : 'Caso límite: en x = 1 la función no está definida, pero el límite es 2.'; },
    readout:function(v){ var d = lmR2(v.d == null ? 0.5 : +v.d), n = lmN, Q = '\\\\&\\qquad ', xi = lmR2(1 - d), xd = lmR2(1 + d), qi = xi*xi, qd = xd*xd, ni = qi - 1, nd = qd - 1, di = lmR2(xi - 1), dd = lmR2(xd - 1), fi, fd;
      if (d === 0) return dtPasos(['a=1,\\qquad d=0',
        'x=1-0=1\\quad\\text{y}\\quad x=1+0=1' + Q + '\\text{los dos puntos llegan a }x=1',
        '\\text{numerador: }1^{2}-1=0;\\qquad\\text{denominador: }1-1=0',
        '\\text{no se divide por }0:\\ f(1)\\text{ no está definida (hueco)}',
        '\\text{el límite no usa }f(1):\\ \\text{si }x\\ne 1,\\ f(x)=x+1' + Q + '\\text{y }x+1\\text{ se acerca a }1+1=2',
        '\\displaystyle\\lim_{x\\to 1}\\dfrac{x^{2}-1}{x-1}=2']);
      fi = lmR2(ni/di); fd = lmR2(nd/dd);
      return dtPasos(['a=1,\\qquad d=' + n(d, 2) + '\\ \\ \\text{(distancia de }x\\text{ a }1)',
        '\\text{izquierda: }x=1-d=1-' + n(d, 2) + '=' + n(xi, 2),
        n(xi, 2) + '^{2}=' + n(qi, 4) + ';\\quad ' + n(qi, 4) + '-1=' + n(ni, 4) + Q + n(xi, 2) + '-1=' + n(di, 2),
        'f(' + n(xi, 2) + ')=\\dfrac{' + n(xi, 2) + '^{2}-1}{' + n(xi, 2) + '-1}=\\dfrac{' + n(ni, 4) + '}{' + n(di, 2) + '}=' + n(fi, 2),
        '\\text{derecha: }x=1+d=1+' + n(d, 2) + '=' + n(xd, 2),
        n(xd, 2) + '^{2}=' + n(qd, 4) + ';\\quad ' + n(qd, 4) + '-1=' + n(nd, 4) + Q + n(xd, 2) + '-1=' + n(dd, 2),
        'f(' + n(xd, 2) + ')=\\dfrac{' + n(xd, 2) + '^{2}-1}{' + n(xd, 2) + '-1}=\\dfrac{' + n(nd, 4) + '}{' + n(dd, 2) + '}=' + n(fd, 2),
        '\\text{distancia a }2:\\ |' + n(fi, 2) + '-2|=' + n(Math.abs(fi - 2), 2) + ';\\quad |' + n(fd, 2) + '-2|=' + n(Math.abs(fd - 2), 2),
        '\\text{con }x\\text{ a }' + n(d, 2) + '\\text{ de }1,\\ f(x)\\text{ queda a }' + n(d, 2) + '\\text{ de }2']); }
  };
})());
/* número ↔ figura: un salto; por la izquierda se va hacia 2 y por la derecha hacia 3 */
OA.scene('lim-salto', (function(){
  var M = lmMarco(-0.75, 0, 5.6, 4.7, -0.4, 2.4, -0.4, 3.6);
  var PZ = [['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''], ['SA', 'y=x+1', 'y = x + 1', 'c-tan'], ['SB', 'y=4-x', 'y = 4 − x', 'c-tan'], ['SI', '\\lim_{x\\to 1^{-}}g(x)=2', 'lím x→1⁻ g(x) = 2', 'c-sec'], ['SD', '\\lim_{x\\to 1^{+}}g(x)=3', 'lím x→1⁺ g(x) = 3', 'diff']];
  var G = {fi:function(x){ return x + 1; }, fd:function(x){ return 4 - x; }, li:2, ld:3, fin:[[1, 2, true], [1, 3, false]]};
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.5, y1:6.0}, aspect:7.5/6.6,
    aria:'Arriba, una franja dice qué muestra: un salto; por la izquierda la función se va hacia 2 y por la derecha hacia 3, así que no hay límite en 1. Gráfica de una función por tramos: para x menor que 1 es la recta y igual a x más 1, que termina en un punto hueco en (1, 2); para x mayor o igual que 1 es la recta y igual a 4 menos x, que empieza en un punto lleno en (1, 3). Un punto azul, a la izquierda de 1, y uno naranja, a la derecha, están a la misma distancia d de x igual a 1. Al achicar d, el azul se acerca a la altura 2 y el naranja a la altura 3. Bajo el dibujo se calcula el valor de la función en cada punto, paso a paso.',
    labels:PZ,
    sliders:[{id:'d', tex:'d', min:0, max:1, step:0.01, value:0.5}],
    legend:'<span><i class="sw tan"></i> gráfica: punto hueco en \\((1,2)\\), punto lleno en \\((1,3)\\)</span><span><i class="sw sec"></i> \\(x=1-d\\), por la izquierda</span><span><i class="sw rise"></i> \\(x=1+d\\), por la derecha</span>',
    anim:{run:16000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.d = Math.max(0, 1 - dtSuave(p/0.9)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var T = dtEtq(S, PZ), d, dy = 21/(S.X(1) - S.X(0));
      dtQue(S, 'un salto: por la izquierda se va', 'hacia 2 y por la derecha hacia 3. No hay límite.');
      d = lm01Dib(S, v, M, T, G);
      lmFondo(S, M, 'SA', 0.12, 0.62, 0, 8, 0); lmEtq(T, M, 'SA', 0.12, 0.62, 0, 8, 0); lmEtq(T, M, 'SB', 1.62, 2.74, 0);
      lmFondo(S, M, 'SI', 0.92, 2.52, -100); lmEtq(T, M, 'SI', 0.92, 2.52, -100); lmFondo(S, M, 'SD', 0.92, 3.3, -100); lmEtq(T, M, 'SD', 0.92, 3.3, -100);
      if (d > 0){ lmTxt(S, 'Azul: a ' + lmT(d, 2) + ' de 2. Naranja: a ' + lmT(d, 2) + ' de 3.', -1.2, -0.8); lmTxt(S, 'Los lados van a alturas distintas: no hay límite.', -1.2, -0.8 - dy); }
      else { lmTxt(S, 'Caso límite: en x = 1 la función vale 3,', -1.2, -0.8, S.C.rise); lmTxt(S, 'pero por la izquierda iba hacia 2: no hay límite.', -1.2, -0.8 - dy, S.C.rise); }
      T.fin();
    },
    caption:function(v){ var d = lmR2(v.d == null ? 0.5 : +v.d); return d > 0 ? 'Con x a ' + lmT(d, 2) + ' de 1, la función vale ' + lmT(2 - d, 2) + ' por la izquierda y ' + lmT(3 - d, 2) + ' por la derecha. Un lado va hacia 2 y el otro hacia 3: no hay límite en 1.' : 'Caso límite: en x = 1 la función vale 3, pero los límites laterales son 2 y 3: el límite no existe.'; },
    readout:function(v){ var d = lmR2(v.d == null ? 0.5 : +v.d), n = lmN, Q = '\\\\&\\qquad ', xi = lmR2(1 - d), xd = lmR2(1 + d), gi = lmR2(xi + 1), gd = lmR2(4 - xd);
      if (d === 0) return dtPasos(['a=1,\\qquad d=0',
        'x=1\\ \\text{está en el tramo }x\\ge 1:' + Q + 'g(1)=4-1=3\\ \\ \\text{(punto lleno)}',
        '\\text{por la izquierda, }g(x)=x+1\\text{ se acerca a }1+1=2',
        '\\text{por la derecha, }g(x)=4-x\\text{ se acerca a }4-1=3',
        '2\\ne 3:\\ \\displaystyle\\lim_{x\\to 1}g(x)\\ \\text{no existe,}' + Q + '\\text{aunque }g(1)=3\\text{ sí existe}']);
      return dtPasos(['a=1,\\qquad d=' + n(d, 2) + '\\ \\ \\text{(distancia de }x\\text{ a }1)',
        '\\text{izquierda: }x=1-d=1-' + n(d, 2) + '=' + n(xi, 2) + Q + n(xi, 2) + '<1\\ \\Rightarrow\\ \\text{toca }g(x)=x+1',
        'g(' + n(xi, 2) + ')=' + n(xi, 2) + '+1=' + n(gi, 2),
        '\\text{derecha: }x=1+d=1+' + n(d, 2) + '=' + n(xd, 2) + Q + n(xd, 2) + '\\ge 1\\ \\Rightarrow\\ \\text{toca }g(x)=4-x',
        'g(' + n(xd, 2) + ')=4-' + n(xd, 2) + '=' + n(gd, 2),
        '\\text{distancias: }|' + n(gi, 2) + '-2|=' + n(Math.abs(gi - 2), 2) + ';\\quad |' + n(gd, 2) + '-3|=' + n(Math.abs(gd - 3), 2),
        '\\text{por la izquierda hacia }2\\text{; por la derecha hacia }3' + Q + '2\\ne 3:\\ \\text{no existe }\\displaystyle\\lim_{x\\to 1}g(x)']); }
  };
})());
