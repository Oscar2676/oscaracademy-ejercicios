/* L24 H14 · coeficiente de una potencia dada: en (x² + 2/x)⁶ cada término (k = 0…6) lleva x elevado a 12 − 3k; se busca x³ (recta burdeo): k = 3, coeficiente C(6,3)·2³ = 160; se busca x⁵ (recta verde): ningún término, coeficiente 0 */
OA.scene('bn-potencia', (function(){
  var N = 7, GX0 = 2.3, GDX = 0.95, GY0 = -7.1, GS = 0.325, AXX = 1.8, YT = -9.62;
  var EX = [12, 9, 6, 3, 0, -3, -6];
  var PZ = [['Q', '\\text{¿coeficiente de }x^{3}\\text{ en }\\left(x^{2}+\\tfrac{2}{x}\\right)^{6}\\text{?}', '¿coeficiente de x³ en (x² + 2/x)⁶?', 'pt'], ['F', '\\Longrightarrow\\ 160', '⟹ 160', 'diff'],
    ['E', '\\text{exponente de }x=12-3k', 'exponente de x = 12 − 3k', 'c-sec'],
    ['B', '\\text{se busca }x^{3}', 'se busca x³', 'c-tan'],
    ['K3', 'k=3', 'k = 3', 'c-tan'],
    ['C6', '\\text{coeficiente: }160', 'coeficiente: 160', 'diff'],
    ['G', 'x^{5}:\\ k=\\tfrac{7}{3}\\text{, ningún punto}', 'x⁵: k = 7/3, ningún punto', 'c-alt'],
    ['R1', 'T_{k+1}=\\dbinom{6}{k}\\left(x^{2}\\right)^{6-k}\\left(\\dfrac{2}{x}\\right)^{k}', 'T(k+1) = C(6, k) · (x²)^(6−k) · (2/x)^k', ''],
    ['R2', 'T_{k+1}=\\dbinom{6}{k}\\,2^{k}\\,x^{12-3k}', 'T(k+1) = C(6, k) · 2^k · x^(12−3k)', 'c-sec'],
    ['R3', '\\text{exponentes }(k=0,\\dots,6)\\text{: }12,\\ 9,\\ 6,\\ 3,\\ 0,\\ -3,\\ -6', 'exponentes (k = 0, …, 6): 12, 9, 6, 3, 0, −3, −6', 'c-sec'],
    ['R4', '\\text{se busca }x^{3}:\\quad 12-3k=3', 'se busca x³: 12 − 3k = 3', 'c-tan'],
    ['R5', '3k=9\\ \\Longrightarrow\\ k=3\\quad\\text{(es el }4^{\\circ}\\text{ término)}', '3k = 9 ⟹ k = 3 (es el 4º término)', 'c-tan'],
    ['R6', '\\text{coeficiente de }x^{3}:\\ \\dbinom{6}{3}\\cdot 2^{3}=20\\cdot 8=160', 'coeficiente de x³: C(6, 3) · 2³ = 20 · 8 = 160', 'diff'],
    ['R7', 'x^{5}:\\ 12-3k=5\\ \\Rightarrow\\ k=\\tfrac{7}{3}\\text{, no entero: coeficiente }0', 'x⁵: 12 − 3k = 5 ⟹ k = 7/3, no entero: coeficiente 0', 'c-alt']];
  var TXT = [['El desarrollo tiene 7 términos, del 1º al 7º.', 'A cada uno le toca un valor de k, desde 0.'],
    ['Se juntan las potencias de x de cada término.', 'El exponente de x queda escrito con k.'],
    ['Un punto por término: su altura es el exponente.', 'De un término al siguiente, el exponente baja 3.'],
    ['Se busca la potencia de exponente 3:', 'la recta burdeo marca esa altura.'],
    ['Se despeja k y da 3. El punto de ese término', 'cae justo en la recta: es el 4º término.'],
    ['El coeficiente es todo el número de ese término:', 'el coeficiente binomial por la potencia de 2.'],
    ['Con exponente 5 (recta verde) no cae ningún punto:', 'esa potencia no aparece. Su coeficiente es 0.']];
  (function(){ var j; for (j = 0; j <= 6; j++) PZ.push(['P' + j, 'x^{' + EX[j] + '}', 'x^' + ('' + EX[j]).replace('-', '−'), j === 3 ? 'c-tan' : 'c-sec']); })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  function gx(k){ return GX0 + GDX*k; }
  function gy(e){ return GY0 + GS*e; }
  return {
    world:{x0:0, x1:10, y0:-18.9, y1:0}, aspect:18.9/10,
    aria:'Animación en siete pasos sobre el desarrollo de x al cuadrado más 2 sobre x, elevado a 6. Uno: el desarrollo tiene siete términos, uno por cada valor de k, de 0 a 6. Dos: al juntar las potencias de x, el exponente de x en cada término es 12 menos 3 k. Tres: se dibuja un punto por término; su altura es el exponente: 12, 9, 6, 3, 0, menos 3 y menos 6. Cuatro: se busca x al cubo; una recta burdeo marca la altura 3 y se escribe la ecuación 12 menos 3 k igual a 3. Cinco: al despejar, k es 3; el punto de k igual a 3 cae sobre la recta: es el cuarto término. Seis: el coeficiente es 6 sobre 3 por 2 al cubo, que es 20 por 8, igual a 160. Siete: se busca x a la quinta; una recta verde marca la altura 5 y ningún punto cae sobre ella, porque k tendría que ser 7 tercios; el coeficiente de x a la quinta es 0. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> el exponente de \\(x\\) en cada término</span><span><i class="sw tan"></i> la potencia que se busca y el término que la tiene</span><span><i class="sw alt"></i> una potencia que no aparece</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var j, pr, e, a1 = ap(1), a2 = ap(2), a3 = ap(3), a4 = ap(4), a5 = ap(5), a6 = ap(6), a7 = ap(7), XR = gx(6) + 0.6, kq = 7/3;
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      function seg(x0, y0, x1, y1, col, w, dash, alpha){ if (alpha <= 0) return; c.globalAlpha = alpha; c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      /* paso 1: el eje de k; un término por cada k, con su posición (1º … 7º) */
      seg(AXX - 0.25, GY0, AXX - 0.25 + (XR - AXX + 0.25)*a1, GY0, C.ink, 1.1, null, 1);
      tx('k', XR + 0.12, GY0, 'left', C.ink, 11.5, a1, '700');
      tx('término', 0.15, YT, 'left', MU, 10.5, a1, '700');
      for (j = 0; j <= 6; j++){ pr = cl(a1*8 - j);
        tx('' + j, gx(j), GY0 + (j <= 3 ? -0.33 : 0.33), 'center', MU, 10.5, pr, '600');
        seg(gx(j), GY0 - 0.08, gx(j), GY0 + 0.08, C.ink, 1, null, pr);
        if (j === 3 && a5 > 0){ tx((j + 1) + 'º', gx(j), YT, 'center', MU, 11, pr*(1 - a5), '700'); tx((j + 1) + 'º', gx(j), YT, 'center', C.tan, 12, a5, '700'); }
        else tx((j + 1) + 'º', gx(j), YT, 'center', MU, 11, pr, '700'); }
      /* paso 2: el eje del exponente de x, y la recta de la regla 12 − 3k (tenue) */
      if (a2 > 0){ seg(AXX, gy(-6.8), AXX, gy(-6.8) + (gy(13) - gy(-6.8))*a2, C.ink, 1.1, null, 1);
        tx('exponente de x', 0.15, gy(13) + 0.42, 'left', C.sec, 10.5, a2, '700');
        for (e = -6; e <= 12; e += 3){ if (!e) continue; seg(AXX - 0.08, gy(e), AXX + 0.08, gy(e), C.ink, 1, null, a2); tx(('' + e).replace('-', '−'), AXX - 0.2, gy(e), 'right', MU, 10.5, a2, '600'); }
        seg(gx(0), gy(12), gx(0) + (gx(6) - gx(0))*a2, gy(12) + (gy(-6) - gy(12))*a2, 'rgba(31,93,134,0.3)', 1, null, 1);
        if (a2 > 0.5) L('E', 9.85, gy(12) + 0.1, -100); }
      /* paso 3: un punto por término, con punteadas hasta su k y hasta su exponente, y su potencia rotulada */
      for (j = 0; j <= 6; j++){ pr = cl(a3*8 - j); if (pr <= 0) continue;
        seg(gx(j), GY0, gx(j), GY0 + (gy(EX[j]) - GY0)*pr, 'rgba(31,93,134,0.45)', 1, [2, 3], 1);
        seg(gx(j), gy(EX[j]), gx(j) + (AXX - gx(j))*pr, gy(EX[j]), 'rgba(31,93,134,0.45)', 1, [2, 3], 1);
        c.globalAlpha = pr; c.beginPath(); c.arc(X(gx(j)), Y(gy(EX[j])), 3.2, 0, 6.2832); c.fillStyle = j === 3 && a5 > 0.5 ? C.tan : C.sec; c.fill(); c.globalAlpha = 1;
        if (pr > 0.5) L('P' + j, gx(j), gy(EX[j]), 0, 6, -10); }
      /* paso 4: la potencia que se busca: recta punteada burdeo a la altura 3 */
      if (a4 > 0){ seg(AXX, gy(3), AXX + (9.85 - AXX)*a4, gy(3), C.tan, 1.3, [5, 4], 1); if (a4 > 0.5) L('B', AXX + 0.15, gy(4), 0); }
      /* paso 5: el término que la tiene: el punto de k = 3, y su k marcado en el eje */
      if (a5 > 0){ c.globalAlpha = a5; c.strokeStyle = C.tan; c.lineWidth = 1.6; c.beginPath(); c.arc(X(gx(3)), Y(gy(3)), 7.5, -1.5708, -1.5708 + 6.2832*a5); c.stroke(); c.globalAlpha = 1;
        seg(gx(3), gy(3), gx(3), gy(3) + (GY0 - 0.2 - gy(3))*a5, C.tan, 1.3, [4, 3], 1); if (a5 > 0.6) L('K3', gx(3) + 0.15, GY0 - 0.85, 0); }
      /* paso 6: el coeficiente de ese término */
      if (a6 > 0.4) L('C6', gx(3) - 0.35, gy(3) - 0.45, -100);
      /* paso 7: otra potencia, x⁵: recta verde a la altura 5; el lugar donde tendría que estar el punto queda vacío */
      if (a7 > 0){ seg(AXX, gy(5), AXX + (9.85 - AXX)*a7, gy(5), C.alt, 1.3, [5, 4], 1);
        if (a7 > 0.5){ c.globalAlpha = cl(a7*2 - 1); c.fillStyle = '#fff'; c.strokeStyle = C.alt; c.lineWidth = 1.5; c.beginPath(); c.arc(X(gx(kq)), Y(gy(5)), 4, 0, 6.2832); c.fill(); c.stroke(); c.globalAlpha = 1; L('G', 9.85, gy(5) + 0.38, -100); } }
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.3, -1.95, 0); if (a6 > 0.6) L('F', 7.55, -1.95, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 0.3, -10.3, 'left', MU, 11, 1);
      tx(TXT[k - 1][0], 0.3, -10.85, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-10.85) + 19);
      dtQue(S, 'el exponente de x en cada término, para', 'hallar el coeficiente de una potencia.');
      T.fin();
      oaReg(S, k, N, 0.3, -12.85, [0, 38, 70, 94, 118, 150, 184]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{término general (hoja H10):}\\\\&\\qquad T_{k+1}=\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k},\\qquad k=0,\\ 1,\\ \\dots,\\ n\\\\&\\qquad\\text{aquí }a=x^{2},\\quad b=\\frac{2}{x},\\quad n=6:\\\\&\\qquad T_{k+1}=\\binom{6}{k}\\left(x^{2}\\right)^{6-k}\\left(\\frac{2}{x}\\right)^{k},\\quad k=0,\\ \\dots,\\ 6',
      '\\text{se juntan las potencias de }x:\\\\&\\qquad\\left(x^{2}\\right)^{6-k}=x^{2\\cdot(6-k)}=x^{12-2k}\\\\&\\qquad\\left(\\frac{2}{x}\\right)^{k}=\\frac{2^{k}}{x^{k}}=2^{k}\\cdot x^{-k}\\\\&\\qquad x^{12-2k}\\cdot x^{-k}=x^{12-2k-k}=x^{12-3k}\\\\&\\qquad T_{k+1}=\\binom{6}{k}\\,2^{k}\\,x^{12-3k}',
      '\\text{exponente de }x\\text{, término por término }(12-3k):\\\\&\\qquad k=0:\\ 12-3\\cdot 0=12-0=12\\\\&\\qquad k=1:\\ 12-3\\cdot 1=12-3=9\\\\&\\qquad k=2:\\ 12-3\\cdot 2=12-6=6\\\\&\\qquad k=3:\\ 12-3\\cdot 3=12-9=3\\\\&\\qquad k=4:\\ 12-3\\cdot 4=12-12=0\\\\&\\qquad k=5:\\ 12-3\\cdot 5=12-15=-3\\\\&\\qquad k=6:\\ 12-3\\cdot 6=12-18=-6',
      '\\text{se busca }x^{3}\\text{: el exponente tiene que ser }3\\\\&\\qquad 12-3k=3',
      '\\text{se despeja }k:\\\\&\\qquad 12-3k=3\\\\&\\qquad 12=3+3k\\qquad\\text{(se suma }3k\\text{ a los dos lados)}\\\\&\\qquad 12-3=3k\\qquad\\text{(se resta }3\\text{ a los dos lados)}\\\\&\\qquad 9=3k\\\\&\\qquad k=\\frac{9}{3}=3\\qquad\\text{(se divide por }3\\text{)}\\\\&\\qquad 3\\text{ es entero y está entre }0\\text{ y }6:\\\\&\\qquad\\text{es el término de posición }3+1=4',
      '\\text{coeficiente: todo lo que no es }x\\text{ en }T_{4}\\\\&\\qquad T_{4}=\\binom{6}{3}\\cdot 2^{3}\\cdot x^{3}\\\\&\\qquad\\binom{6}{3}=\\frac{6\\cdot 5\\cdot 4}{3\\cdot 2\\cdot 1}=\\frac{120}{6}=20\\\\&\\qquad 2^{3}=2\\cdot 2\\cdot 2=8\\\\&\\qquad 20\\cdot 8=160\\\\&\\qquad T_{4}=160\\,x^{3}:\\ \\text{el coeficiente de }x^{3}\\text{ es }160',
      '\\text{otra potencia, }x^{5}:\\\\&\\qquad 12-3k=5\\\\&\\qquad 12-5=3k\\\\&\\qquad 7=3k\\\\&\\qquad k=\\frac{7}{3}\\qquad\\text{(no es entero: está entre }2\\text{ y }3\\text{)}\\\\&\\qquad\\text{ningún término tiene }x^{5}:\\\\&\\qquad\\text{el coeficiente de }x^{5}\\text{ es }0']; return dtPasos(R.slice(0, k)); }
  };
})());
