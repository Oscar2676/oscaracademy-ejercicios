/* L29 H05 · límites laterales y asíntotas: junto a la recta x = 2, la gráfica de f(x) = 1/(x − 2) baja sin tope por la izquierda y sube sin tope por la derecha (por pasos) */
OA.scene('asi-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  function f(x){ return 1/(x - 2); }
  /* puntos de cada lado que caben en el marco: [x, altura]; el tercero de cada lado (1,99 y 2,01) queda fuera del marco */
  var IZ = [[1.5, -2], [1.9, -10]], DE = [[2.5, 2], [2.1, 10]], TOPE = 5, ANCHO = 0.2;
  var M = lmMarco(-0.75, 0.35, 5.7, 4.6, -1, 5, -12, 12);
  var PZ = [['Q', '\\text{laterales de }f(x)=\\tfrac{1}{x-2}\\text{ en }2:\\ \\ ?', 'laterales de f(x) = 1/(x − 2) en 2: ?', 'pt'], ['F', '\\Longrightarrow\\ -\\infty;\\ \\ +\\infty', '⟹ −∞; +∞', 'diff'],
    ['EX', 'x', 'x', ''], ['EY', 'y', 'y', ''],
    ['CF', 'y=\\tfrac{1}{x-2}', 'y = 1/(x − 2)', 'c-tan'],
    ['LI', '\\lim_{x\\to 2^{-}}f(x)=-\\infty', 'lím f(x) = −∞ si x → 2⁻', 'c-sec'], ['LD', '\\lim_{x\\to 2^{+}}f(x)=+\\infty', 'lím f(x) = +∞ si x → 2⁺', 'diff'],
    ['AS', '\\text{asíntota vertical: }x=2', 'asíntota vertical: x = 2', ''],
    ['R1', 'f(x)=\\tfrac{1}{x-2};\\ \\ f(2)\\text{ no está definida}', 'f(x) = 1/(x − 2); f(2) no está definida', ''],
    ['R2', 'x\\lt 2:\\ \\ f(1{,}5)=-2;\\ \\ f(1{,}9)=-10;\\ \\ f(1{,}99)=-100', 'x < 2: f(1,5) = −2; f(1,9) = −10; f(1,99) = −100', 'c-sec'],
    ['R3', 'x\\gt 2:\\ \\ f(2{,}5)=2;\\ \\ f(2{,}1)=10;\\ \\ f(2{,}01)=100', 'x > 2: f(2,5) = 2; f(2,1) = 10; f(2,01) = 100', 'diff'],
    ['R4', '0\\lt x-2\\lt \\tfrac{1}{M}\\ \\Rightarrow\\ f(x)\\gt M', '0 < x − 2 < 1/M ⟹ f(x) > M', 'c-alt'],
    ['R5', '\\lim_{x\\to 2^{-}}f(x)=-\\infty;\\ \\ \\lim_{x\\to 2^{+}}f(x)=+\\infty', 'lím por la izquierda: −∞; por la derecha: +∞', ''],
    ['R6', 'x=2\\text{ es asíntota vertical};\\ \\ \\lim_{x\\to 2}f(x)\\text{ no existe}', 'x = 2 es asíntota vertical; lím f(x) no existe', 'diff']];
  var TXT = [['La curva tiene dos ramas. En x = 2 no hay punto:', 'ahí habría que dividir por 0.'],
    ['Por la izquierda de 2 las alturas son −2, −10 y', '−100: la curva baja y se sale del marco.'],
    ['Por la derecha de 2 las alturas son 2, 10 y 100:', 'la curva sube y se sale del marco.'],
    ['Se pone un tope, 5. Entre 2 y 2,2 la curva queda', 'sobre el tope. Con cualquier otro tope pasa igual.'],
    ['Eso se escribe con el símbolo de infinito. No es', 'un número: dice que la curva no tiene tope ahí.'],
    ['La recta punteada es una asíntota vertical. Como', 'ningún lado llega a una altura, no hay límite.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.7, y1:6.9}, aspect:12.6/6.6,
    aria:'Arriba, una franja dice qué muestra: junto a la recta x igual a 2 la curva no llega a una altura, baja o sube sin tope. Animación en seis pasos sobre la gráfica de f de x igual a 1 dividido por x menos 2. Uno: la curva, con dos ramas separadas por la recta punteada vertical x igual a 2, donde la función no está definida. Dos: por la izquierda, los puntos de x igual a 1,5 y 1,9 están a las alturas menos 2 y menos 10, y en 1,99 la altura es menos 100, fuera del marco; una flecha indica que la curva sigue bajando. Tres: por la derecha, los puntos de x igual a 2,5 y 2,1 están a las alturas 2 y 10, y en 2,01 la altura es 100, fuera del marco; la curva sigue subiendo. Cuatro: una recta horizontal verde marca un tope a la altura 5; entre 2 y 2,2 la curva queda sobre ese tope. Cinco: se escribe que el límite por la izquierda es menos infinito y el límite por la derecha es más infinito. Seis: la recta x igual a 2 es una asíntota vertical y el límite en 2 no existe. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> gráfica de \\(f\\)</span><span><i class="sw sec"></i> por la izquierda de 2</span><span><i class="sw rise"></i> por la derecha de 2</span><span><i class="sw alt"></i> tope</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif', xe = 1/11;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, x, y, dx, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = X(M.gx(x)) + dx, py = Y(M.gy(y)) + dy, l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.88; c.fillStyle = C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
      /* un lado: puntos con su punteada hasta el eje vertical, flecha que camina hacia x = 2 y aviso de que la curva sigue */
      function lado(P, al, col, s, t1, t2){ if (al <= 0) return;
        P.forEach(function(q, i){ var b = Math.min(1, Math.max(0, al*2 - i*0.8)); if (b <= 0) return;
          lmSeg(S, M, q[0], 0, q[0], q[1]*Math.min(1, b*2), col, 1); if (b > 0.5) lmSeg(S, M, q[0], q[1], q[0] - q[0]*(b*2 - 1), q[1], col, 1);
          if (b > 0.5) lmPunto(S, M, q[0], q[1], col, false, 2.8); if (b >= 1 && i === 0) lmNum(S, M, lmT(q[1], 0), 0, q[1], -7, 0, col, 'right'); });
        lmFlecha(S, M, P[0][0], P[0][1], P[0][0] + (P[1][0] - P[0][0])*0.8*al, P[0][1] + (P[1][1] - P[0][1])*0.8*al, col, 1.8, s*10, 0);
        if (al > 0.75){ lmFlecha(S, M, 2 + s*xe, s*11, 2 + s*xe, s*12.4, col, 1.8, 0, 0); frase(t1, s > 0 ? 2.6 : 2.25, s > 0 ? 11.3 : -9.9, 0, 0, col); frase(t2, s > 0 ? 2.6 : 2.25, s > 0 ? 9.9 : -11.3, 0, 0, col); } }
      dtQue(S, 'junto a la recta punteada la curva no llega', 'a una altura: baja o sube sin tope.');
      lmEjes(S, M, {dy:5, sx:[2]}); lmNum(S, M, '2', 2, 0, 7, 11); lmEtq(T, M, 'EX', 5, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 12, 0, 8, 5);
      /* paso 1: la recta x = 2 (punteada gris) y las dos ramas de la curva, hasta la altura ±11 */
      a = ap(1);
      lmSeg(S, M, 2, -12*Math.min(1, a*3), 2, 12*Math.min(1, a*3), mu, 1, [4, 4]);
      if (a > 1/3){ lmCurva(S, M, f, -1, -1 + (3 - xe)*Math.min(1, a*3 - 1), C.tan, 2); }
      if (a > 2/3){ lmCurva(S, M, f, 5 - (3 - xe)*Math.min(1, a*3 - 2), 5, C.tan, 2); }
      if (a > 0.9) lmEtq(T, M, 'CF', 0.95, 7.5, -50, 0, 0);
      /* paso 4: el tope (altura 5) y la franja donde la curva lo supera: 2 < x < 2,2 */
      a = ap(4);
      if (a > 0){ c.globalAlpha = 0.25*a; c.fillStyle = C.alt; c.fillRect(X(M.gx(2)), Y(M.gy(12)), X(M.gx(2 + ANCHO)) - X(M.gx(2)), Y(M.gy(TOPE)) - Y(M.gy(12))); c.globalAlpha = 1;
        lmSeg(S, M, -1, TOPE, -1 + 6*a, TOPE, C.alt, 1.4, [5, 3]);
        if (a > 0.5){ lmSeg(S, M, 2 + ANCHO, 0, 2 + ANCHO, TOPE, C.alt, 1); lmPunto(S, M, 2 + ANCHO, TOPE, C.alt, false, 2.8); frase('tope: 5', 0.15, TOPE, 0, -9, C.alt); frase('entre 2 y 2,2 la curva', 2.7, 7.9, 0, 0, C.alt); frase('pasa sobre el tope', 2.7, 6.5, 0, 0, C.alt); } }
      /* pasos 2 y 3: los dos lados */
      lado(IZ, ap(2), C.sec, -1, 'en 1,99 vale −100:', 'sigue bajando');
      lado(DE, ap(3), C.rise, 1, 'en 2,01 vale 100:', 'sigue subiendo');
      /* paso 5: la escritura con el símbolo de infinito, una por lado */
      a = ap(5);
      if (a > 0.3){ lmFondo(S, M, 'LD', 2.8, 3.2, 0); lmEtq(T, M, 'LD', 2.8, 3.2, 0); }
      if (a > 0.6){ lmFondo(S, M, 'LI', 2.25, -7, 0); lmEtq(T, M, 'LI', 2.25, -7, 0); }
      /* paso 6: la recta x = 2, destacada como asíntota vertical */
      a = ap(6);
      if (a > 0){ lmSeg(S, M, 2, -12*a, 2, 12*a, C.ink, 1.8, [6, 4]); if (a > 0.5){ lmFondo(S, M, 'AS', 2.25, -3.7, 0); lmEtq(T, M, 'AS', 2.25, -3.7, 0); } }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 5.56, 0); if (k === N && u > 0.5) T.L('F', 5.2, 5.56, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-1.75) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136, 170]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      'f(x)=\\dfrac{1}{x-2}' + Q + '\\text{en }x=2:\\ \\ 2-2=0;\\ \\ \\text{no se divide por }0' + Q + 'f(2)\\text{ no está definida: se mira qué pasa cerca de }2',
      '\\text{por la izquierda de }2\\text{, con }x\\lt 2:' + Q + 'f(1{,}5)=\\tfrac{1}{1{,}5-2}=\\tfrac{1}{-0{,}5}=-2' + Q + 'f(1{,}9)=\\tfrac{1}{1{,}9-2}=\\tfrac{1}{-0{,}1}=-10' + Q + 'f(1{,}99)=\\tfrac{1}{1{,}99-2}=\\tfrac{1}{-0{,}01}=-100' + Q + '\\text{no se acercan a una altura: bajan sin tope}',
      '\\text{por la derecha de }2\\text{, con }x\\gt 2:' + Q + 'f(2{,}5)=\\tfrac{1}{2{,}5-2}=\\tfrac{1}{0{,}5}=2' + Q + 'f(2{,}1)=\\tfrac{1}{2{,}1-2}=\\tfrac{1}{0{,}1}=10' + Q + 'f(2{,}01)=\\tfrac{1}{2{,}01-2}=\\tfrac{1}{0{,}01}=100' + Q + '\\text{no se acercan a una altura: suben sin tope}',
      '\\text{¿supera }f\\text{ cualquier tope }M\\gt 0\\text{ a la derecha de }2?' + Q + '\\text{si }0\\lt x-2\\lt \\tfrac{1}{M}\\text{, entonces }\\tfrac{1}{x-2}\\gt M' + Q + '\\text{tope }5:\\ \\ \\tfrac{1}{5}=0{,}2;\\ \\ \\text{basta }0\\lt x-2\\lt 0{,}2' + Q + '\\text{tope }100:\\ \\ \\tfrac{1}{100}=0{,}01;\\ \\ \\text{basta }0\\lt x-2\\lt 0{,}01' + Q + '\\text{a la izquierda: si }0\\lt 2-x\\lt \\tfrac{1}{M}\\text{, }f(x)\\lt -M',
      '\\text{a la derecha de }2\\text{, }f\\text{ supera cualquier tope:}' + Q + '\\displaystyle\\lim_{x\\to 2^{+}}f(x)=+\\infty' + Q + '\\text{a la izquierda de }2\\text{, }f\\text{ baja de cualquier tope:}' + Q + '\\displaystyle\\lim_{x\\to 2^{-}}f(x)=-\\infty' + Q + '+\\infty\\text{ y }-\\infty\\text{ no son números: no hay altura de llegada}',
      '\\text{un lateral es }+\\infty\\text{ o }-\\infty\\text{ (aquí, los dos):}' + Q + '\\text{la recta }x=2\\text{ es asíntota vertical de la gráfica}' + Q + '\\text{ningún lateral es un número:}' + Q + '\\displaystyle\\lim_{x\\to 2}f(x)\\text{ no existe}']; return dtPasos(R.slice(0, k)); }
  };
})());
