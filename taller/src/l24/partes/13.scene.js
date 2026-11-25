/* L24 H13 · término independiente de (x² + 1/x)⁶: se calcula el exponente de x para k = 0, 1, 2 (un punto por término), sale la regularidad 12 − 3k, se iguala a 0 (k = 4), se reemplaza (T₅ = 15) y se comprueba con el desarrollo completo */
OA.scene('bn-independiente', (function(){
  var N = 7, XA = 1.25, X0 = 1.9, DX = 1.15, YT = -3.3, SC = 0.33, YK = -9.95, YD = -10.8;
  var EX = [12, 9, 6, 3, 0, -3, -6];
  var DT = ['x^{12}', '6x^{9}', '15x^{6}', '20x^{3}', '15', '6x^{-3}', 'x^{-6}'], DF = ['x¹²', '6x⁹', '15x⁶', '20x³', '15', '6x⁻³', 'x⁻⁶'];
  var PZ = [['Q', '\\text{¿qué término de }\\left(x^{2}+\\tfrac{1}{x}\\right)^{6}\\text{ no tiene }x\\text{?}', '¿qué término de (x² + 1/x)⁶ no tiene x?', 'pt'], ['F', '\\Longrightarrow\\ 15', '⟹ 15', 'c-tan'],
    ['T5', 'T_{5}=\\dbinom{6}{4}x^{0}=15', 'T₅ = C(6, 4) · x⁰ = 15', 'c-tan'],
    ['R1', '\\text{para }k=0:\\ \\ \\left(x^{2}\\right)^{6}\\left(\\tfrac{1}{x}\\right)^{0}=x^{12}\\ \\to\\ \\text{exponente }12', 'para k = 0: (x²)⁶ · (1/x)⁰ = x¹² → exponente 12', ''],
    ['R2', '\\text{para }k=1:\\ \\ \\left(x^{2}\\right)^{5}\\left(\\tfrac{1}{x}\\right)^{1}=x^{9}\\ \\to\\ \\text{exponente }9', 'para k = 1: (x²)⁵ · (1/x)¹ = x⁹ → exponente 9', ''],
    ['R3', '\\text{para }k=2:\\ \\ \\left(x^{2}\\right)^{4}\\left(\\tfrac{1}{x}\\right)^{2}=x^{6}\\ \\to\\ \\text{exponente }6', 'para k = 2: (x²)⁴ · (1/x)² = x⁶ → exponente 6', ''],
    ['R4', '\\begin{aligned}&12=12-3\\cdot 0,\\quad 9=12-3\\cdot 1,\\quad 6=12-3\\cdot 2\\\\ &\\text{para }k=k:\\ \\ \\text{exponente de }x=12-3k\\end{aligned}', '12 = 12 − 3·0, 9 = 12 − 3·1, 6 = 12 − 3·2; para k = k: exponente de x = 12 − 3k', 'diff'],
    ['R5', '\\text{sin }x:\\ \\ 12-3k=0\\ \\Longrightarrow\\ 3k=12\\ \\Longrightarrow\\ k=4', 'sin x: 12 − 3k = 0 ⟹ 3k = 12 ⟹ k = 4', 'c-tan'],
    ['R6', '\\text{con }k=4:\\ \\ T_{5}=\\dbinom{6}{4}\\,x^{0}=15\\cdot 1=15', 'con k = 4: T₅ = C(6, 4) · x⁰ = 15 · 1 = 15', 'c-tan'],
    ['R7', '\\begin{aligned}&\\text{término independiente: }15\\ \\ (5^{\\circ}\\text{ término},\\ k=4)\\\\ &\\text{los otros 6 términos llevan }x\\end{aligned}', 'término independiente: 15 (5º término, k = 4); los otros 6 términos llevan x', 'c-tan']];
  var TXT = [['Con k = 0: el primer término. Se juntan las', 'potencias de x: queda x elevado a 12.'],
    ['Con k = 1: el segundo término.', 'Queda x elevado a 9: el exponente bajó 3.'],
    ['Con k = 2: el tercer término.', 'Queda x elevado a 6: otra vez bajó 3.'],
    ['Regularidad: el exponente es 12 menos 3 por k.', 'Con ella salen los otros: 3, 0, −3 y −6.'],
    ['Sin x quiere decir exponente 0 (línea burdeo).', 'Se resuelve la ecuación: da k = 4.'],
    ['Se reemplaza k = 4 en el término general:', 'es el 5º término, y vale 15.'],
    ['Abajo, el desarrollo completo: un término por', 'cada k. El único sin x es el 15.']];
  (function(){ var k; for (k = 0; k <= 6; k++){ PZ.push(['P' + k, 'x^{' + EX[k] + '}', 'x' + ('' + EX[k]).replace('-', '−'), k === 4 ? 'c-tan' : 'c-sec']); PZ.push(['K' + k, 'k=' + k, 'k = ' + k, '']); PZ.push(['D' + k, DT[k], DF[k], k === 4 ? 'c-tan' : '']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  function xk(k){ return X0 + DX*k; }
  function ye(e){ return YT - (12 - e)*SC; }
  return {
    world:{x0:0, x1:10, y0:-20.3, y1:0}, aspect:20.3/10,
    aria:'Animación en siete pasos sobre el desarrollo de x al cuadrado más 1 sobre x, elevado a 6. En horizontal va k, de 0 a 6, un punto por cada término; en vertical, el exponente de x que queda en ese término. Uno: con k igual a 0 queda x elevado a 12. Dos: con k igual a 1 queda x elevado a 9; el exponente bajó 3. Tres: con k igual a 2 queda x elevado a 6; bajó 3 otra vez. Cuatro: la regularidad: el exponente es 12 menos 3 k; con ella salen los demás: 3, 0, menos 3 y menos 6. Cinco: una línea burdeo marca el exponente 0, donde no queda x; la ecuación 12 menos 3 k igual a 0 da k igual a 4. Seis: se reemplaza k igual a 4: el quinto término es 6 sobre 4 por x elevado a 0, que vale 15. Siete: abajo se escribe el desarrollo completo, x a la 12, más 6 x a la 9, más 15 x a la 6, más 20 x al cubo, más 15, más 6 x a la menos 3, más x a la menos 6; el único término sin x es 15. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> exponente de \\(x\\) en cada término</span><span><i class="sw rise"></i> la regularidad: baja \\(3\\) cada vez que \\(k\\) sube \\(1\\)</span><span><i class="sw tan"></i> exponente \\(0\\): el término independiente</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var i, pr, a5 = ap(5), a6 = ap(6), a7 = ap(7), e, ym, w;
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function sale(j){ return j <= 2 ? ap(j + 1) : cl(ap(4)*4.6 - (j - 3)); } /* cuánto ha aparecido el punto del término k = j */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      /* ejes: horizontal k (a la altura del exponente 0), vertical el exponente de x */
      S.line(XA - 0.25, ye(0), 9.6, ye(0), {color:C.ink, width:1}); S.line(XA, ye(-6) - 0.25, XA, ye(12) + 0.35, {color:C.ink, width:1});
      for (e = -6; e <= 12; e += 3){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(XA) - 3, Y(ye(e))); c.lineTo(X(XA) + 3, Y(ye(e))); c.stroke(); tx(('' + e).replace('-', '−'), XA - 0.22, ye(e), 'right', MU, 10.5, 1, '500'); }
      tx('exponente de x', XA - 0.95, ye(12) + 0.62, 'left', MU, 10.5, 1, '700');
      /* guías punteadas: cada punto con su valor de k, abajo */
      c.strokeStyle = 'rgba(31,93,134,0.25)'; c.lineWidth = 1; c.setLineDash([2, 3]);
      for (i = 0; i <= 6; i++){ pr = sale(i); if (pr <= 0) continue; c.globalAlpha = pr; c.beginPath(); c.moveTo(X(xk(i)), Y(YK + 0.3)); c.lineTo(X(xk(i)), Y(ye(EX[i]))); c.stroke(); } c.globalAlpha = 1; c.setLineDash([]);
      /* paso 5: la línea del exponente 0, donde no queda x */
      if (a5 > 0){ c.strokeStyle = C.tan; c.lineWidth = 1.6; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(XA - 0.25), Y(ye(0))); c.lineTo(X(XA - 0.25 + (9.85 - XA)*a5), Y(ye(0))); c.stroke(); c.setLineDash([]);
        tx('exponente 0: no queda x', XA + 0.15, ye(0) - 0.33, 'left', C.tan, 10.5, a5, '700'); }
      /* escalones naranjos: de un término al siguiente, el exponente baja 3 */
      for (i = 1; i <= 6; i++){ pr = sale(i); if (pr <= 0) continue; ym = ye(EX[i - 1]) + (ye(EX[i]) - ye(EX[i - 1]))*cl(pr*2);
        c.strokeStyle = C.rise; c.lineWidth = 1.3; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(xk(i - 1)), Y(ye(EX[i - 1]))); c.lineTo(X(xk(i - 1)), Y(ym)); if (pr > 0.5) c.lineTo(X(xk(i - 1) + DX*cl(pr*2 - 1)), Y(ye(EX[i]))); c.stroke(); c.setLineDash([]);
        tx('−3', xk(i - 1) - 0.12, (ye(EX[i - 1]) + ye(EX[i]))/2, 'right', C.rise, 10.5, cl(pr*2), '700'); }
      /* los puntos: un término por cada k; a su lado, la potencia de x que queda */
      for (i = 0; i <= 6; i++){ pr = sale(i); if (pr <= 0) continue; w = i === 4 ? a5 : 0;
        c.globalAlpha = cl(pr*1.5); c.beginPath(); c.arc(X(xk(i)), Y(ye(EX[i])), 3 + 1.4*w, 0, 6.2832); c.fillStyle = w > 0.5 ? C.tan : C.sec; c.fill(); c.globalAlpha = 1;
        if (pr > 0.3) L('K' + i, xk(i), YK); if (pr > 0.7){ if (i === 4) L('P4', xk(4) - 0.17, ye(0) + 0.38, -100); else L('P' + i, xk(i) + 0.2, ye(EX[i]) + 0.04, 0); } }
      /* paso 6: el término independiente, señalado */
      if (a6 > 0){ tx('término independiente', 9.8, -3.75, 'right', C.tan, 11, a6, '700'); if (a6 > 0.4) L('T5', 9.8, -4.5, -100);
        c.globalAlpha = a6; dtFlecha(S, 8.1, -5.1, 8.1 + (xk(4) + 0.14 - 8.1)*a6, -5.1 + (ye(0) + 0.2 + 5.1)*a6, C.tan, 1.4); c.globalAlpha = 1; }
      /* paso 7: el desarrollo completo, un término bajo cada k */
      if (a7 > 0){ for (i = 0; i <= 6; i++){ pr = cl(a7*7.5 - i); if (pr <= 0) continue; if (i > 0) tx('+', xk(i) - DX/2, YD, 'center', C.ink, 11.5, pr); if (pr > 0.5) L('D' + i, xk(i), YD); }
        pr = cl(a7*7.5 - 6.5); if (pr > 0){ c.globalAlpha = pr; c.strokeStyle = C.tan; c.lineWidth = 1.6; c.strokeRect(X(xk(4) - 0.36), Y(YD + 0.36), X(xk(4) + 0.36) - X(xk(4) - 0.36), Y(YD - 0.36) - Y(YD + 0.36)); c.globalAlpha = 1; } }
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.3, -1.95, 0); if (a7 > 0.85) L('F', 8.0, -1.95, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 0.3, -11.6, 'left', MU, 11, 1);
      tx(TXT[k - 1][0], 0.3, -12.2, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-12.2) + 19);
      dtQue(S, 'qué exponente de x queda en cada término;', 'el de exponente 0 es el término independiente.');
      T.fin();
      oaReg(S, k, N, 0.3, -14.2, [0, 26, 52, 84, 118, 146, 182]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{término de }k=0:\\quad\\left(x^{2}\\right)^{6}\\cdot\\left(\\tfrac{1}{x}\\right)^{0}\\\\&\\qquad\\left(x^{2}\\right)^{6}=x^{2\\cdot 6}=x^{12};\\qquad\\left(\\tfrac{1}{x}\\right)^{0}=1\\\\&\\qquad x^{12}\\cdot 1=x^{12}\\quad\\to\\quad\\text{exponente }12',
      '\\text{término de }k=1:\\quad\\left(x^{2}\\right)^{5}\\cdot\\left(\\tfrac{1}{x}\\right)^{1}\\\\&\\qquad\\left(x^{2}\\right)^{5}=x^{2\\cdot 5}=x^{10};\\qquad\\left(\\tfrac{1}{x}\\right)^{1}=x^{-1}\\\\&\\qquad x^{10}\\cdot x^{-1}=x^{10-1}=x^{9}\\quad\\to\\quad\\text{exponente }9',
      '\\text{término de }k=2:\\quad\\left(x^{2}\\right)^{4}\\cdot\\left(\\tfrac{1}{x}\\right)^{2}\\\\&\\qquad\\left(x^{2}\\right)^{4}=x^{2\\cdot 4}=x^{8};\\qquad\\left(\\tfrac{1}{x}\\right)^{2}=x^{-2}\\\\&\\qquad x^{8}\\cdot x^{-2}=x^{8-2}=x^{6}\\quad\\to\\quad\\text{exponente }6',
      '\\text{regularidad: si }k\\text{ sube }1\\text{, el exponente baja }3\\\\&\\qquad 12=12-3\\cdot 0\\qquad 9=12-3\\cdot 1\\qquad 6=12-3\\cdot 2\\\\&\\qquad\\text{para }k=k:\\quad\\text{exponente de }x=12-3k\\\\&\\qquad k=3:\\ 12-3\\cdot 3=12-9=3\\\\&\\qquad k=4:\\ 12-3\\cdot 4=12-12=0\\\\&\\qquad k=5:\\ 12-3\\cdot 5=12-15=-3\\\\&\\qquad k=6:\\ 12-3\\cdot 6=12-18=-6',
      '\\text{sin }x\\text{: el exponente tiene que ser }0\\\\&\\qquad 12-3k=0\\\\&\\qquad 12=3k\\qquad\\text{(se suma }3k\\text{ en los dos lados)}\\\\&\\qquad k=\\tfrac{12}{3}=4\\qquad\\text{(se divide por }3\\text{)}',
      '\\text{se reemplaza }k=4\\text{: es el término }4+1=5\\\\&\\qquad T_{5}=\\dbinom{6}{4}\\left(x^{2}\\right)^{2}\\left(\\tfrac{1}{x}\\right)^{4}=\\dbinom{6}{4}\\,x^{4}\\cdot x^{-4}\\\\&\\qquad x^{4}\\cdot x^{-4}=x^{4-4}=x^{0}=1\\\\&\\qquad\\dbinom{6}{4}=\\dfrac{6\\cdot 5\\cdot 4\\cdot 3}{4\\cdot 3\\cdot 2\\cdot 1}=\\dfrac{360}{24}=15\\\\&\\qquad T_{5}=15\\cdot 1=15',
      '\\text{comprobación, con el desarrollo completo:}\\\\&\\qquad\\text{coeficientes }\\tbinom{6}{k}:\\ 1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1\\\\&\\qquad x^{12}+6x^{9}+15x^{6}+20x^{3}+15+6x^{-3}+x^{-6}\\\\&\\qquad\\text{único término sin }x\\text{: }15\\ \\text{(el término independiente)}']; return dtPasos(R.slice(0, k)); }
  };
})());
