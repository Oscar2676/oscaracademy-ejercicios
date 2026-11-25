/* L24 H11 · encontrar un término específico: el 5º término de (2x − 3)^7 sin escribir el desarrollo: datos → posición y k → fórmula con sus tres partes → coeficiente → potencia de a → potencia de b → producto */
OA.scene('bn-buscar', (function(){
  var N = 7, X0 = 0.75, DXC = 1.2, BW = 1.06, BH = 0.66, YB = -4.05, YK = -4.82, YX = -5.5, YF = -6.55, PT = -7.5, PB = -9.5, XP = [1.75, 5, 8.25], PW = 2.9, YZ = -10.15;
  var PZ = [['Q', '\\text{¿}5^{\\circ}\\text{ término de }(2x-3)^{7}\\text{?}', '¿5º término de (2x − 3)⁷?', 'pt'], ['F', '\\Longrightarrow\\ 22\\,680\\,x^{3}', '⟹ 22 680 x³', 'diff'],
    ['A1', 'a=2x', 'a = 2x', 'c-sec'], ['B1', 'b=-3', 'b = −3', 'c-tan'], ['N1', 'n=7', 'n = 7', ''], ['NT', '7+1=8\\text{ términos}', '7 + 1 = 8 términos', ''],
    ['KR', 'k=\\text{posición}-1', 'k = posición − 1', 'c-sec'], ['KX', '5-1=4', '5 − 1 = 4', 'diff'],
    ['FT', 'T_{5}=\\dbinom{7}{4}\\,(2x)^{7-4}\\,(-3)^{4}', 'T₅ = (7 sobre 4) · (2x)⁷⁻⁴ · (−3)⁴', ''],
    ['P1', '\\binom{7}{4}', '7 sobre 4', 'diff'], ['P2', '(2x)^{3}', '(2x)³', 'c-sec'], ['P3', '(-3)^{4}', '(−3)⁴', 'c-tan'],
    ['V1', '=35', '= 35', 'diff'], ['V2', '=8x^{3}', '= 8x³', 'c-sec'], ['V3', '=81', '= 81', 'c-tan'],
    ['Z', 'T_{5}=35\\cdot 8x^{3}\\cdot 81=22\\,680\\,x^{3}', 'T₅ = 35 · 8x³ · 81 = 22 680 x³', 'diff'],
    ['R1', 'a=2x,\\ \\ b=-3,\\ \\ n=7;\\ \\ \\ 7+1=8\\text{ términos}', 'a = 2x, b = −3, n = 7; 7 + 1 = 8 términos', ''],
    ['R2', '\\text{posición }5:\\ \\ k=\\text{posición}-1=5-1=4', 'posición 5: k = posición − 1 = 5 − 1 = 4', 'c-sec'],
    ['R3', 'T_{5}=\\binom{7}{4}\\,(2x)^{7-4}\\,(-3)^{4}=\\binom{7}{4}\\,(2x)^{3}\\,(-3)^{4}', 'T₅ = (7 sobre 4) · (2x)⁷⁻⁴ · (−3)⁴ = (7 sobre 4) · (2x)³ · (−3)⁴', ''],
    ['R4', '\\binom{7}{4}=\\dfrac{7\\cdot 6\\cdot 5\\cdot 4}{4\\cdot 3\\cdot 2\\cdot 1}=\\dfrac{840}{24}=35', '7 sobre 4 = (7 · 6 · 5 · 4)/(4 · 3 · 2 · 1) = 840/24 = 35', 'diff'],
    ['R5', '(2x)^{3}=2^{3}\\cdot x^{3}=8x^{3}', '(2x)³ = 2³ · x³ = 8x³', 'c-sec'],
    ['R6', '(-3)^{4}=(-3)(-3)(-3)(-3)=81', '(−3)⁴ = (−3)(−3)(−3)(−3) = 81', 'c-tan'],
    ['R7', '\\begin{aligned}&35\\cdot 8=280,\\quad 280\\cdot 81=22\\,680\\\\ &T_{5}=35\\cdot 8x^{3}\\cdot 81=22\\,680\\,x^{3}\\end{aligned}', '35 · 8 = 280, 280 · 81 = 22 680; T₅ = 35 · 8x³ · 81 = 22 680 x³', 'diff']];
  var TXT = [['Se identifican a, b y n. El signo va dentro de b.', 'Hay 8 términos; se busca el de la posición 5.'],
    ['Bajo cada posición va su k: el exponente de b.', 'k parte en 0: es la posición menos 1. Aquí, 4.'],
    ['El término se arma con tres partes:', 'coeficiente, potencia de a y potencia de b.'],
    ['Coeficiente: arriba, 4 factores desde el 7', 'hacia abajo; abajo, 4 factorial. Resulta 35.'],
    ['Potencia de a: el paréntesis hace que el 2', 'también se eleve al cubo, igual que la x.'],
    ['Potencia de b: menos 3, cuatro veces.', 'Exponente par: el resultado es positivo.'],
    ['Se multiplican las tres partes, de a una.', 'Ese es el 5º término, sin desarrollar todo.']];
  var TIT = ['coeficiente', 'potencia de a', 'potencia de b'];
  (function(){ var j; for (j = 0; j <= 7; j++){ PZ.push(['O' + j, (j + 1) + '^{\\circ}', (j + 1) + 'º', j === 4 ? 'diff' : '']); PZ.push(['K' + j, 'k=' + j, 'k = ' + j, j === 4 ? 'diff' : 'c-sec']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-20, y1:0}, aspect:20/10,
    aria:'Animación en siete pasos para encontrar el quinto término de 2x menos 3, elevado a 7, sin escribir el desarrollo completo. Uno: se identifican a igual a 2x, b igual a menos 3 y n igual a 7; el desarrollo tiene 7 más 1, 8 términos, dibujados como ocho casilleros numerados; el quinto queda marcado. Dos: bajo cada casillero se escribe su valor de k, de 0 a 7; k es la posición menos 1, y para el quinto es 5 menos 1, 4. Tres: la fórmula del término: T sub 5 es 7 sobre 4, por 2x elevado a 7 menos 4, por menos 3 elevado a 4; sus tres partes van a tres recuadros: coeficiente, potencia de a y potencia de b. Cuatro: el coeficiente, 7 sobre 4, es 840 dividido en 24, 35. Cinco: la potencia de a, 2x al cubo, es 8 x al cubo. Seis: la potencia de b, menos 3 a la cuarta, es 81. Siete: se multiplican las tres partes: 35 por 8 x al cubo por 81 es 22680 x al cubo. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> el término buscado y su coeficiente</span><span><i class="sw sec"></i> \\(k\\) y la potencia de \\(a=2x\\)</span><span><i class="sw tan"></i> la potencia de \\(b=-3\\)</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var j, i, a, pr, xc, COL = [C.rise, C.sec, C.tan], a1 = ap(1), a2 = ap(2), a3 = ap(3), a7 = ap(7);
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      function col(j){ return X0 + DXC*j; }
      function seg(x0, y0, x1, y1, colr, al, w){ if (al <= 0) return; c.globalAlpha = al; c.strokeStyle = colr; c.lineWidth = w || 1.1; c.setLineDash([]); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x0 + (x1 - x0)*al), Y(y0 + (y1 - y0)*al)); c.stroke(); c.globalAlpha = 1; }
      /* paso 1: los datos y los 8 casilleros, uno por término, con su posición; el 5º, marcado */
      if (a1 > 0.25) L('A1', 0.3, -2.8, 0); if (a1 > 0.4) L('B1', 2.3, -2.8, 0); if (a1 > 0.55) L('N1', 4.4, -2.8, 0); if (a1 > 0.7) L('NT', 6.2, -2.8, 0);
      tx('posición de cada término:', 0.22, -3.47, 'left', MU, 10.5, a1, '700');
      for (j = 0; j <= 7; j++){ pr = cl(a1*9.5 - j); if (pr <= 0) continue; xc = col(j);
        if (j === 4){ c.globalAlpha = 0.16*pr; c.fillStyle = C.rise; c.fillRect(X(xc - BW/2), Y(YB + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(YB - BH/2) - Y(YB + BH/2)); c.globalAlpha = 1; }
        c.globalAlpha = pr; c.strokeStyle = j === 4 ? C.rise : 'rgba(31,93,134,0.6)'; c.lineWidth = j === 4 ? 1.9 : 1.1; c.strokeRect(X(xc - BW/2), Y(YB + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(YB - BH/2) - Y(YB + BH/2)); c.globalAlpha = 1;
        if (pr > 0.5) L('O' + j, xc, YB); }
      tx('se busca', col(4), -3.47, 'center', C.rise, 10.5, cl(a1*9.5 - 5), '700');
      /* paso 2: bajo cada posición, su k (el exponente de b); k = posición − 1 */
      for (j = 0; j <= 7; j++){ pr = cl(a2*9 - j*0.8); if (pr > 0.4) L('K' + j, col(j), YK); }
      if (a2 > 0.5) L('KR', 0.22, YX, 0); if (a2 > 0.85) L('KX', col(4), YX);
      /* paso 3: la fórmula con los datos, y sus tres partes en tres recuadros */
      if (a3 > 0.2) L('FT', 5, YF);
      for (i = 0; i < 3; i++){ pr = cl(a3*4 - 1 - i*0.6); if (pr <= 0) continue; xc = XP[i];
        seg(5, -7.2, xc, PT, COL[i], pr, 1);
        c.globalAlpha = 0.07*pr; c.fillStyle = COL[i]; c.fillRect(X(xc - PW/2), Y(PT), X(xc + PW/2) - X(xc - PW/2), Y(PB) - Y(PT)); c.globalAlpha = 1;
        c.globalAlpha = pr; c.strokeStyle = COL[i]; c.lineWidth = 1.3; c.strokeRect(X(xc - PW/2), Y(PT), X(xc + PW/2) - X(xc - PW/2), Y(PB) - Y(PT)); c.globalAlpha = 1;
        tx(TIT[i], xc, PT - 0.3, 'center', COL[i], 11, pr, '700');
        if (pr > 0.6) L('P' + (i + 1), xc, -8.42); }
      /* pasos 4, 5 y 6: el valor de cada parte se escribe dentro de su recuadro */
      for (i = 0; i < 3; i++) if (ap(4 + i) > 0.5) L('V' + (i + 1), XP[i], -9.12);
      /* paso 7: las tres partes se juntan en el producto */
      for (i = 0; i < 3; i++) seg(XP[i], PB, 5 + (XP[i] - 5)*0.55, -9.82, COL[i], a7, 1);
      if (a7 > 0.5) L('Z', 5, YZ);
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.3, -1.95, 0); if (a7 > 0.7) L('F', 6.2, -1.95, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 0.3, -10.95, 'left', MU, 11, 1);
      tx(TXT[k - 1][0], 0.3, -11.5, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-11.5) + 19);
      dtQue(S, 'cómo hallar un solo término del desarrollo,', 'sin escribir los demás: con k y tres partes.');
      T.fin();
      oaReg(S, k, N, 0.3, -13.45, [0, 25, 54, 90, 124, 149, 183]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{datos: }(2x-3)^{7}=\\bigl(2x+(-3)\\bigr)^{7}\\\\&\\qquad a=2x,\\quad b=-3,\\quad n=7\\\\&\\qquad\\text{términos: }n+1=7+1=8\\\\&\\qquad\\text{se busca el }5^{\\circ}\\text{ término}',
      '\\text{de la posición a }k:\\quad k=\\text{posición}-1\\\\&\\qquad k=5-1=4\\quad\\text{(el exponente de }b\\text{)}',
      '\\text{fórmula: }T_{k+1}=\\dbinom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}\\\\&\\qquad\\text{reemplazo: }T_{5}=\\dbinom{7}{4}\\,(2x)^{7-4}\\,(-3)^{4}\\\\&\\qquad 7-4=3:\\quad T_{5}=\\dbinom{7}{4}\\,(2x)^{3}\\,(-3)^{4}',
      '\\text{coeficiente: }\\dbinom{7}{4}=\\dfrac{7\\cdot 6\\cdot 5\\cdot 4}{4\\cdot 3\\cdot 2\\cdot 1}\\\\&\\qquad\\text{arriba: }7\\cdot 6=42,\\quad 42\\cdot 5=210\\\\&\\qquad\\phantom{\\text{arriba: }}210\\cdot 4=840\\\\&\\qquad\\text{abajo: }4\\cdot 3=12,\\quad 12\\cdot 2=24\\\\&\\qquad\\phantom{\\text{abajo: }}24\\cdot 1=24\\\\&\\qquad\\text{división: }\\dfrac{840}{24}=35',
      '\\text{potencia de }a:\\quad (2x)^{3}=2^{3}\\cdot x^{3}\\\\&\\qquad 2\\cdot 2=4,\\quad 4\\cdot 2=8\\quad\\to\\quad (2x)^{3}=8x^{3}',
      '\\text{potencia de }b:\\quad (-3)^{4}=(-3)(-3)(-3)(-3)\\\\&\\qquad (-3)(-3)=9,\\quad 9\\cdot(-3)=-27\\\\&\\qquad (-27)(-3)=81\\quad\\to\\quad (-3)^{4}=81',
      '\\text{producto: }T_{5}=35\\cdot 8x^{3}\\cdot 81\\\\&\\qquad 35\\cdot 8=280,\\quad 280\\cdot 81=22\\,680\\\\&\\qquad T_{5}=22\\,680\\,x^{3}\\quad\\text{(el }5^{\\circ}\\text{ término)}']; return dtPasos(R.slice(0, k)); }
  };
})());
