/* L25 H17 · criterio de Leibniz: las sumas parciales de 1 − 1/2 + 1/3 − 1/4 + … van en zigzag; las de índice par suben, las de índice impar bajan y la franja entre ellas se angosta */
function ci17Seg(S, x0, y0, x1, y1, col, wd, dash, al){ var c = S.ctx; c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(S.X(x0), S.Y(y0)); c.lineTo(S.X(x1), S.Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
function ci17Fr(a, b){ return b === 1 ? '' + a : '\\dfrac{' + a + '}{' + b + '}'; }
OA.scene('lei-idea', (function(){
  var N = 5, NP = 6, SV = [1, 1/2, 5/6, 7/12, 47/60, 37/60];
  var PZ = [['P1', 'S_{1}=1', 'S₁ = 1', 'pt'], ['P2', 'S_{2}=\\tfrac{1}{2}', 'S₂ = 1/2', 'pt'], ['P3', 'S_{3}=\\tfrac{5}{6}', 'S₃ = 5/6', 'pt'], ['P4', 'S_{4}=\\tfrac{7}{12}', 'S₄ = 7/12', 'pt'], ['P5', 'S_{5}=\\tfrac{47}{60}', 'S₅ = 47/60', 'pt'], ['P6', 'S_{6}=\\tfrac{37}{60}', 'S₆ = 37/60', 'pt'],
    ['J2', '-\\tfrac{1}{2}', '−1/2', 'diff'], ['J3', '+\\tfrac{1}{3}', '+1/3', 'c-sec'], ['J4', '-\\tfrac{1}{4}', '−1/4', 'diff'], ['J5', '+\\tfrac{1}{5}', '+1/5', 'c-sec'], ['J6', '-\\tfrac{1}{6}', '−1/6', 'diff'],
    ['W', 'S_{5}-S_{6}=\\tfrac{1}{6}', 'S₅ − S₆ = 1/6', 'c-tan'], ['LS', 'S', 'S', 'c-tan'],
    ['Q', '1-\\tfrac{1}{2}+\\tfrac{1}{3}-\\tfrac{1}{4}+\\cdots\\quad\\text{¿converge?}', '1 − 1/2 + 1/3 − 1/4 + … ¿converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí converge, y }\\tfrac{37}{60}\\le S\\le\\tfrac{47}{60}', '⟹ sí converge, y 37/60 ≤ S ≤ 47/60', 'diff'],
    ['R1', 'S_{6}=1-\\tfrac{1}{2}+\\tfrac{1}{3}-\\tfrac{1}{4}+\\tfrac{1}{5}-\\tfrac{1}{6}=\\tfrac{37}{60}', 'S₆ = 1 − 1/2 + 1/3 − 1/4 + 1/5 − 1/6 = 37/60', ''],
    ['R2', '\\text{saltos: }\\tfrac{1}{2}>\\tfrac{1}{3}>\\tfrac{1}{4}>\\tfrac{1}{5}>\\tfrac{1}{6}', 'saltos: 1/2 > 1/3 > 1/4 > 1/5 > 1/6', ''],
    ['R3', '\\text{pares: }S_{2}<S_{4}<S_{6},\\quad\\tfrac{1}{2}<\\tfrac{7}{12}<\\tfrac{37}{60}', 'pares: S₂ < S₄ < S₆, 1/2 < 7/12 < 37/60', ''],
    ['R4', '\\text{impares: }S_{1}>S_{3}>S_{5},\\quad 1>\\tfrac{5}{6}>\\tfrac{47}{60}', 'impares: S₁ > S₃ > S₅, 1 > 5/6 > 47/60', ''],
    ['R5', 'S_{5}-S_{6}=\\tfrac{1}{6}\\ \\Longrightarrow\\ \\tfrac{37}{60}\\le S\\le\\tfrac{47}{60}', 'S₅ − S₆ = 1/6, de donde 37/60 ≤ S ≤ 47/60', 'diff']];
  var TXT = [['Cada punto es una suma parcial. Su punteada', 'la lleva a su valor en el eje vertical.'],
    ['Azul: se suma y el punto sube. Naranja: se', 'resta y baja. Cada salto es más corto.'],
    ['Verde: las sumas parciales de índice par.', 'Cada una es mayor que la anterior: suben.'],
    ['Burdeo: las de índice impar. Cada una es', 'menor que la anterior: bajan.'],
    ['La franja entre las dos líneas se angosta.', 'La suma queda adentro: la serie converge.']];
  function gx(n){ return -0.6 + 0.8*n; } function gy(y){ return 1.0 + 3.4*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:7.0}, aspect:11.6/6.6,
    aria:'Arriba, una franja dice qué muestra: sumas parciales en zigzag, con saltos cada vez más cortos, que quedan atrapadas. Animación en cinco pasos con una gráfica de las seis primeras sumas parciales de la serie armónica alternada, 1 menos un medio más un tercio menos un cuarto más un quinto menos un sexto. En horizontal va n, de 1 a 6; en vertical, la suma parcial. Uno: aparecen los seis puntos, cada uno con su nombre y su valor: 1, un medio, cinco sextos, siete doceavos, cuarenta y siete sesentavos y treinta y siete sesentavos; una línea punteada lleva cada punto hasta su valor en el eje vertical. Dos: entre cada punto y el siguiente se dibuja el salto: una flecha naranja hacia abajo cuando se resta, rotulada menos un medio, menos un cuarto y menos un sexto, y una flecha azul hacia arriba cuando se suma, rotulada más un tercio y más un quinto; cada flecha es más corta que la anterior. Tres: una línea verde, rotulada pares: suben, une las sumas parciales segunda, cuarta y sexta. Cuatro: una línea burdeo, rotulada impares: bajan, une las sumas parciales primera, tercera y quinta. Cinco: se sombrea la franja entre las dos líneas, que se angosta hacia la derecha; una cota vertical a la derecha marca su ancho al final, la quinta suma parcial menos la sexta, un sexto, y dentro de la cota va la letra S: la suma de la serie queda atrapada entre treinta y siete sesentavos y cuarenta y siete sesentavos. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, sí converge, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> salto hacia arriba: se suma \\(\\tfrac{1}{n}\\) (\\(n\\) impar)</span><span><i class="sw rise"></i> salto hacia abajo: se resta \\(\\tfrac{1}{n}\\) (\\(n\\) par)</span><span><i class="sw alt"></i> sumas parciales de índice par: suben</span><span><i class="sw tan"></i> sumas parciales de índice impar: bajan; franja y cota donde queda \\(S\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, a, b, e, d, xb = gx(6) + 0.62;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function tag(t, x, y, col){ c.font = '600 11.5px ' + F; c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* línea quebrada por tres puntos, dibujada hasta la fracción w de su recorrido */
      function quebrada(I, col, w){ var t = 2*w, j; c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.moveTo(X(gx(I[0])), Y(gy(SV[I[0] - 1])));
        for (j = 0; j < 2; j++){ e = Math.max(0, Math.min(1, t - j)); if (e <= 0) break; c.lineTo(X(gx(I[j] + (I[j + 1] - I[j])*e)), Y(gy(SV[I[j] - 1] + (SV[I[j + 1] - 1] - SV[I[j] - 1])*e))); } c.stroke(); }
      /* paso 5: franja entre la línea de las impares y la de las pares */
      if (k === 5){ S.poly([[gx(1), gy(SV[0])], [gx(3), gy(SV[2])], [gx(5), gy(SV[4])], [gx(6), gy(SV[5])], [gx(4), gy(SV[3])], [gx(2), gy(SV[1])]], {fill:C.tan, alpha:0.13*u}); }
      /* ejes */
      S.line(gx(0), gy(0), gx(6.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.12), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      [[0, '0'], [0.5, '0,5'], [1, '1']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(q[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(q[0]))); c.stroke(); num(q[1], X(gx(0)) - 7, Y(gy(q[0])), 'right'); });
      num('n', X(gx(6.6)) + 6, Y(gy(0)), 'left'); num('Sₙ', X(gx(0)) + 6, Y(gy(1.12)) - 3, 'left');
      /* punteada de cada suma parcial hasta su valor en el eje vertical */
      for (i = 1; i <= NP; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*NP - (i - 1))) : 1; if (w <= 0) continue;
        ci17Seg(S, gx(i), gy(SV[i - 1]), gx(i) - (gx(i) - gx(0))*w, gy(SV[i - 1]), C.ink, 0.9, [3, 3], 0.4);
        if (w >= 1){ c.beginPath(); c.arc(X(gx(0)), Y(gy(SV[i - 1])), 2, 0, 6.2832); c.fillStyle = C.ink; c.fill(); } }
      /* paso 3 en adelante: línea de las sumas parciales de índice par */
      if (k >= 3){ w = k === 3 ? u : 1; quebrada([2, 4, 6], C.alt, w); if (w > 0.5) tag('pares: suben', gx(2) + 0.62, 2.2, C.alt); }
      /* paso 4 en adelante: línea de las sumas parciales de índice impar */
      if (k >= 4){ w = k === 4 ? u : 1; quebrada([1, 3, 5], C.tan, w); if (w > 0.5) tag('impares: bajan', gx(3) + 0.35, 4.58, C.tan); }
      /* paso 2 en adelante: saltos; azul hacia arriba si se suma, naranja hacia abajo si se resta */
      if (k >= 2) for (i = 2; i <= NP; i++){ w = k === 2 ? Math.max(0, Math.min(1, u*5 - (i - 2))) : 1; if (w <= 0) continue; a = SV[i - 2]; b = SV[i - 1]; d = b > a ? 1 : -1;
        ci17Seg(S, gx(i - 1), gy(a), gx(i - 1) + 0.8*Math.min(1, w*2), gy(a), d > 0 ? C.sec : C.rise, 0.9, [3, 3], 0.8);
        if (w > 0.5){ e = (w - 0.5)*2; dtFlecha(S, gx(i), gy(a), gx(i), gy(a) + (gy(b) - gy(a) - d*5/s)*e, d > 0 ? C.sec : C.rise, 2); }
        if (w > 0.9) L('J' + i, gx(i), gy(0.7), 0, 5, 0); }
      /* puntos: sumas parciales, cada una con su nombre y su valor */
      for (i = 1; i <= NP; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*NP - (i - 1))) : 1; if (w <= 0) continue;
        c.globalAlpha = w; c.beginPath(); c.arc(X(gx(i)), Y(gy(SV[i - 1])), 3.3, 0, 6.2832); c.fillStyle = C.ink; c.fill(); c.globalAlpha = 1;
        if (w >= 1){ if (i % 2) L('P' + i, gx(i), gy(SV[i - 1]), 0, 3, -15); else L('P' + i, gx(i), gy(SV[i - 1]), -50, 0, 16); } }
      /* paso 5: cota del ancho de la franja al final, y la suma S adentro */
      if (k === 5){ a = gy(SV[5]); b = gy(SV[4]); e = a + (b - a)*u;
        ci17Seg(S, xb, a, xb, e, C.tan, 1.6); ci17Seg(S, xb - 0.07, a, xb + 0.07, a, C.tan, 1.6); if (u > 0.95){ ci17Seg(S, xb - 0.07, b, xb + 0.07, b, C.tan, 1.6); ci17Seg(S, xb, b, xb, 4.3, C.tan, 0.9, [2, 3], 0.8); }
        ci17Seg(S, gx(6), a, xb, a, C.tan, 0.9, [2, 3], 0.8*u); ci17Seg(S, gx(5), b, xb, b, C.tan, 0.9, [2, 3], 0.8*u);
        if (u > 0.6){ L('W', 5.25, 4.5, -100); L('LS', xb, (a + b)/2, 0, 6, 0); } }
      L('Q', -1.2, 5.72, 0); if (k === N && u > 0.5) L('F', -1.2, 5.24, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.36); txt(TXT[k - 1][1], -1.2, 0.36 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.72));
      dtQue(S, 'sumas parciales en zigzag, con', 'saltos cada vez más cortos: quedan atrapadas.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, R = [
      '\\text{Serie: }1-' + f(1, 2) + '+' + f(1, 3) + '-' + f(1, 4) + '+' + f(1, 5) + '-' + f(1, 6) + '+\\cdots' + Q + '\\text{Con sumatoria: }\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^{n+1}}{n}' + Q + '\\text{Tamaño del término }n\\text{, sin el signo: }b_{n}=' + f(1, 'n')
        + Q + '\\text{Sumas parciales (los puntos):}' + Q + 'S_{1}=1' + Q + 'S_{2}=S_{1}-' + f(1, 2) + '=1-' + f(1, 2) + '=' + f(2, 2) + '-' + f(1, 2) + '=' + f(1, 2) + Q + 'S_{3}=S_{2}+' + f(1, 3) + '=' + f(1, 2) + '+' + f(1, 3) + '=' + f(3, 6) + '+' + f(2, 6) + '=' + f(5, 6)
        + Q + 'S_{4}=S_{3}-' + f(1, 4) + '=' + f(5, 6) + '-' + f(1, 4) + Q + '\\phantom{S_{4}}=' + f(10, 12) + '-' + f(3, 12) + '=' + f(7, 12) + Q + 'S_{5}=S_{4}+' + f(1, 5) + '=' + f(7, 12) + '+' + f(1, 5) + Q + '\\phantom{S_{5}}=' + f(35, 60) + '+' + f(12, 60) + '=' + f(47, 60)
        + Q + 'S_{6}=S_{5}-' + f(1, 6) + '=' + f(47, 60) + '-' + f(1, 6) + Q + '\\phantom{S_{6}}=' + f(47, 60) + '-' + f(10, 60) + '=' + f(37, 60),
      '\\text{De }S_{n-1}\\text{ a }S_{n}\\text{ se salta }b_{n}=' + f(1, 'n') + '\\text{:}' + Q + '\\text{hacia abajo si }n\\text{ es par (se resta),}' + Q + '\\text{hacia arriba si }n\\text{ es impar (se suma).}' + Q + '\\text{Tamaño de los saltos: }' + f(1, 2) + ',\\ ' + f(1, 3) + ',\\ ' + f(1, 4) + ',\\ ' + f(1, 5) + ',\\ ' + f(1, 6)
        + Q + '\\text{Como }2<3<4<5<6\\text{, al invertir:}' + Q + f(1, 2) + '>' + f(1, 3) + '>' + f(1, 4) + '>' + f(1, 5) + '>' + f(1, 6) + Q + '\\text{Cada salto es más corto que el anterior.}',
      '\\text{Índice par (línea verde): }S_{2},\\ S_{4},\\ S_{6}' + Q + 'S_{4}-S_{2}=' + f(7, 12) + '-' + f(1, 2) + '=' + f(7, 12) + '-' + f(6, 12) + '=' + f(1, 12) + '>0' + Q + 'S_{6}-S_{4}=' + f(37, 60) + '-' + f(7, 12) + Q + '\\phantom{S_{6}-S_{4}}=' + f(37, 60) + '-' + f(35, 60) + '=' + f(2, 60) + '=' + f(1, 30) + '>0'
        + Q + '\\text{Por qué: de }S_{2}\\text{ a }S_{4}\\text{ se sube }' + f(1, 3) + Q + '\\text{y después se baja menos, }' + f(1, 4) + '.' + Q + 'S_{2}<S_{4}<S_{6}\\text{: las de índice par suben.}',
      '\\text{Índice impar (línea burdeo): }S_{1},\\ S_{3},\\ S_{5}' + Q + 'S_{3}-S_{1}=' + f(5, 6) + '-1=' + f(5, 6) + '-' + f(6, 6) + '=-' + f(1, 6) + '<0' + Q + 'S_{5}-S_{3}=' + f(47, 60) + '-' + f(5, 6) + Q + '\\phantom{S_{5}-S_{3}}=' + f(47, 60) + '-' + f(50, 60) + '=-' + f(3, 60) + '=-' + f(1, 20) + '<0'
        + Q + '\\text{Por qué: de }S_{1}\\text{ a }S_{3}\\text{ se baja }' + f(1, 2) + Q + '\\text{y después se sube menos, }' + f(1, 3) + '.' + Q + 'S_{1}>S_{3}>S_{5}\\text{: las de índice impar bajan.}',
      '\\text{Ancho de la franja: una suma de índice}' + Q + '\\text{impar menos la de índice par que le sigue.}' + Q + 'S_{1}-S_{2}=1-' + f(1, 2) + '=' + f(2, 2) + '-' + f(1, 2) + '=' + f(1, 2) + Q + 'S_{3}-S_{4}=' + f(5, 6) + '-' + f(7, 12) + '=' + f(10, 12) + '-' + f(7, 12) + '=' + f(3, 12) + '=' + f(1, 4)
        + Q + 'S_{5}-S_{6}=' + f(47, 60) + '-' + f(37, 60) + '=' + f(10, 60) + '=' + f(1, 6) + Q + '\\text{Son los saltos }b_{2},\\ b_{4},\\ b_{6}\\text{: tienden a }0.' + Q + '\\text{Las pares suben, las impares bajan y la}' + Q + '\\text{distancia entre ellas tiende a }0\\text{: tienen}'
        + Q + '\\text{el mismo límite, la suma }S\\text{ (criterio de}' + Q + '\\text{Leibniz; la demostración está más abajo).}' + Q + '\\text{La suma queda entre }S_{6}\\text{ y }S_{5}\\text{:}' + Q + f(37, 60) + '\\le S\\le' + f(47, 60) + Q + '37:60\\approx 0{,}617,\\qquad 47:60\\approx 0{,}783'
        + Q + '\\text{La serie converge, y su suma está}' + Q + '\\text{entre esos dos valores.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: al cortar la armónica alternada en n términos, la suma S queda entre Sₙ y Sₙ₊₁; el ancho de esa franja es la cota del error, 1/(n + 1) */
OA.scene('lei-vivo', (function(){
  var NM = 12, i, PZ = [];
  /* tabla exacta: [n, numerador y denominador de Sₙ₋₁, denominador común, numerador de Sₙ₋₁ y de 1/n con ese denominador, numerador del resultado, numerador y denominador de Sₙ] */
  var TB = [[1, 0, 1, 1, 0, 1, 1, 1, 1], [2, 1, 1, 2, 2, 1, 1, 1, 2], [3, 1, 2, 6, 3, 2, 5, 5, 6], [4, 5, 6, 12, 10, 3, 7, 7, 12], [5, 7, 12, 60, 35, 12, 47, 47, 60], [6, 47, 60, 60, 47, 10, 37, 37, 60], [7, 37, 60, 420, 259, 60, 319, 319, 420],
    [8, 319, 420, 840, 638, 105, 533, 533, 840], [9, 533, 840, 2520, 1599, 280, 1879, 1879, 2520], [10, 1879, 2520, 2520, 1879, 252, 1627, 1627, 2520], [11, 1627, 2520, 27720, 17897, 2520, 20417, 20417, 27720], [12, 20417, 27720, 27720, 20417, 2310, 18107, 18107, 27720], [13, 18107, 27720, 360360, 235391, 27720, 263111, 263111, 360360]];
  for (i = 1; i <= NM; i++) PZ.push(['A' + i, 'S_{' + i + '}', 'S' + ssSub(i), 'diff']);
  for (i = 2; i <= NM + 1; i++) PZ.push(['B' + i, 'S_{' + i + '}', 'S' + ssSub(i), 'c-alt']);
  for (i = 1; i <= NM; i++) PZ.push(['W' + i, '\\tfrac{1}{' + (i + 1) + '}', '1/' + (i + 1), 'c-tan']);
  function gx(n){ return -0.9 + 0.385*n; } function gy(y){ return 0.9 + 3.4*y; }
  function val(n){ return TB[n - 1][7]/TB[n - 1][8]; }
  function nn(v){ return Math.max(1, Math.min(NM, Math.round(v.n || 1))); }
  function cota(n){ return oaDec(1/(n + 1), 3).replace(/0+$/, '').replace(/,$/, '') + (1000 % (n + 1) === 0 ? '' : ' (aprox.)'); }
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.35, y1:5.9}, aspect:7.25/6.6,
    aria:'Arriba, una franja dice qué muestra: cortar la suma en n términos deja un error que no pasa del término que sigue. Gráfica de puntos con las sumas parciales de la serie armónica alternada, 1 menos un medio más un tercio menos un cuarto, y así. Un deslizador elige n, la cantidad de términos sumados, de 1 a 12. Se ven los puntos desde la primera suma parcial hasta la número n, unidos por una línea fina en zigzag, cada uno con una línea punteada hasta su valor en el eje vertical. El punto número n, naranja, lleva su nombre. La suma parcial que sigue, la número n más 1, se dibuja como un anillo verde con su nombre. Una franja horizontal burdeo cubre desde la altura del punto naranja hasta la del anillo verde: ahí está la suma de la serie. A la derecha, una cota vertical marca el ancho de la franja, rotulado 1 dividido por n más 1: es la cota del error. Con n igual a 1 la franja va de un medio a 1 y su ancho es un medio; al aumentar n la franja se angosta. Bajo el dibujo, cuatro frases dicen cuántos términos se sumaron, qué es el anillo verde, qué es la franja y cuánto vale su ancho; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'n', tex:'n', min:1, max:NM, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> sumas parciales anteriores</span><span><i class="sw rise"></i> la suma parcial elegida, \\(S_{n}\\)</span><span><i class="sw alt"></i> anillo: la suma parcial que sigue, \\(S_{n+1}\\)</span><span><i class="sw tan"></i> franja donde está la suma \\(S\\); su ancho, \\(\\tfrac{1}{n+1}\\), es la cota del error</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:30000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(NM, 1 + Math.floor(p*NM)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = nn(v), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', a = val(n), b = val(n + 1), lo = Math.min(a, b), hi = Math.max(a, b), xb = gx(13.5) + 0.14, j, y, col, up = n % 2 === 1;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* franja entre Sₙ y Sₙ₊₁: ahí está la suma */
      S.poly([[gx(0), gy(lo)], [gx(13.5), gy(lo)], [gx(13.5), gy(hi)], [gx(0), gy(hi)]], {fill:C.tan, alpha:0.16});
      ci17Seg(S, gx(0), gy(lo), gx(13.5), gy(lo), C.tan, 0.9, [4, 3], 0.7); ci17Seg(S, gx(0), gy(hi), gx(13.5), gy(hi), C.tan, 0.9, [4, 3], 0.7);
      /* ejes */
      S.line(gx(0), gy(0), gx(13.5), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.1), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (j = 1; j <= NM + 1; j++){ c.beginPath(); c.moveTo(X(gx(j)), Y(gy(0)) - 3); c.lineTo(X(gx(j)), Y(gy(0)) + 3); c.stroke(); num('' + j, X(gx(j)), Y(gy(0)) + 11, 'center'); }
      [[0, '0'], [0.5, '0,5'], [1, '1']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(q[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(q[0]))); c.stroke(); num(q[1], X(gx(0)) - 7, Y(gy(q[0])), 'right'); });
      num('n', X(gx(13.5)) + 5, Y(gy(0)) + 11, 'center'); num('Sₙ', X(gx(0)) - 7, Y(gy(1.1)) - 3, 'right');
      /* zigzag fino que une las sumas parciales en orden, hasta la que sigue */
      c.strokeStyle = C.sec; c.globalAlpha = 0.35; c.lineWidth = 1; c.beginPath(); for (j = 1; j <= n + 1; j++){ if (j === 1) c.moveTo(X(gx(j)), Y(gy(val(j)))); else c.lineTo(X(gx(j)), Y(gy(val(j)))); } c.stroke(); c.globalAlpha = 1;
      /* puntos S₁…Sₙ con su punteada al eje; el último, naranja */
      for (j = 1; j <= n; j++){ y = val(j); col = j === n ? C.rise : C.sec;
        ci17Seg(S, gx(j), gy(y), gx(0), gy(y), col, 0.9, [3, 3], j === n ? 1 : 0.4); c.globalAlpha = j === n ? 1 : 0.5; c.beginPath(); c.arc(X(gx(0)), Y(gy(y)), 2, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1;
        c.beginPath(); c.arc(X(gx(j)), Y(gy(y)), j === n ? 4 : 3, 0, 6.2832); c.fillStyle = col; c.fill(); }
      /* la suma parcial que sigue: anillo verde */
      ci17Seg(S, gx(n + 1), gy(b), gx(0), gy(b), C.alt, 0.9, [3, 3], 1); c.beginPath(); c.arc(X(gx(0)), Y(gy(b)), 2, 0, 6.2832); c.fillStyle = C.alt; c.fill();
      c.beginPath(); c.arc(X(gx(n + 1)), Y(gy(b)), 4, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.alt; c.lineWidth = 1.8; c.stroke();
      /* cota del ancho de la franja */
      ci17Seg(S, xb, gy(lo), xb, gy(hi), C.tan, 1.6); ci17Seg(S, xb - 0.07, gy(lo), xb + 0.07, gy(lo), C.tan, 1.6); ci17Seg(S, xb - 0.07, gy(hi), xb + 0.07, gy(hi), C.tan, 1.6);
      T.L('W' + n, xb, gy((lo + hi)/2), 0, 7, 0);
      /* nombres: el de la impar va arriba de su punto; el de la par, abajo */
      T.L('A' + n, gx(n), gy(a), -50, 0, up ? -15 : 15);
      T.L('B' + (n + 1), gx(n + 1), gy(b), -50, 0, up ? 15 : -15);
      y = Y(gy(0)) + 34;
      txt(n === 1 ? 'se sumó 1 término: es el punto naranja' : 'se sumaron ' + n + ' términos: es el punto naranja', X(-1.2), y, 'left', C.rise);
      txt('anillo verde: la suma parcial que sigue', X(-1.2), y + 21, 'left', C.alt);
      txt('franja burdeo: ahí está la suma de la serie', X(-1.2), y + 42, 'left', C.tan);
      txt('ancho de la franja, cota del error: ' + cota(n), X(-1.2), y + 63, 'left', C.tan);
      dtQue(S, 'cortar la suma en n términos deja', 'un error que no pasa del término que sigue.');
      T.fin();
    },
    caption:function(v){ var n = nn(v); return 'Con ' + n + (n === 1 ? ' término' : ' términos') + ', la suma de la serie queda entre la suma parcial ' + n + ' y la ' + (n + 1) + '. El error de cortar ahí no pasa de 1/' + (n + 1) + ', que es ' + cota(n) + '.'; },
    readout:function(v){ var n = nn(v), t = TB[n - 1], t2 = TB[n], num = OA.num, fr = ci17Fr, Q = '\\\\&\\qquad ', sg = n % 2 ? '+' : '-', sg2 = n % 2 ? '-' : '+', Sn = fr(t[7], t[8]), Sm = fr(t2[7], t2[8]), bn = '\\dfrac{1}{' + (n + 1) + '}', ex = 1000 % (n + 1) === 0, L = [], s;
      L.push('\\text{Datos: la serie }\\displaystyle\\sum_{k=1}^{\\infty}\\dfrac{(-1)^{k+1}}{k}=1-\\dfrac{1}{2}+\\dfrac{1}{3}-\\cdots' + Q + '\\text{Tamaño del término }k\\text{, sin el signo: }b_{k}=\\dfrac{1}{k}' + Q + '\\text{Se corta en }n=' + n + (n === 1 ? '\\text{ término.}' : '\\text{ términos.}'));
      if (n === 1) L.push('\\text{Suma parcial (punto naranja):}' + Q + 'S_{1}=b_{1}=\\dfrac{1}{1}=1');
      else { s = '\\text{Suma parcial (punto naranja): a la anterior,}' + Q + 'S_{' + (n - 1) + '}=' + fr(t[1], t[2]) + '\\text{, se le ' + (n % 2 ? 'suma' : 'resta') + ' }\\dfrac{1}{' + n + '}\\text{ (}n\\text{ ' + (n % 2 ? 'impar' : 'par') + ').}' + Q + 'S_{' + n + '}=S_{' + (n - 1) + '}' + sg + '\\dfrac{1}{' + n + '}=' + fr(t[1], t[2]) + sg + '\\dfrac{1}{' + n + '}';
        if (!(t[3] === t[2] && t[5] === 1)) s += Q + '\\text{Denominador común }' + t[3] + '\\text{:}' + Q + '\\phantom{S_{' + n + '}}=' + fr(t[4], t[3]) + sg + fr(t[5], t[3]);
        s += Q + '\\phantom{S_{' + n + '}}=' + fr(t[6], t[3]) + (t[8] === 1 ? '' : (1000*t[7] % t[8] === 0 ? '=' : '\\approx ') + num(t[7]/t[8], 3)) + Q + '\\text{(}S_{' + (n - 1) + '}\\text{ se calcula igual: pon }n=' + (n - 1) + '\\text{.)}'; L.push(s); }
      L.push('\\text{Cota del error: el primer término que no}' + Q + '\\text{se sumó, sin el signo.}' + Q + 'b_{n+1}=b_{' + (n + 1) + '}=' + bn + (ex ? '=' : '\\approx ') + num(1/(n + 1), 3));
      s = '\\text{Suma parcial que sigue (anillo verde):}' + Q + 'S_{' + (n + 1) + '}=S_{' + n + '}' + sg2 + bn + '=' + Sn + sg2 + bn;
      if (!(t2[3] === t2[2] && t2[5] === 1)) s += Q + '\\text{Denominador común }' + t2[3] + '\\text{:}' + Q + '\\phantom{S_{' + (n + 1) + '}}=' + fr(t2[4], t2[3]) + sg2 + fr(t2[5], t2[3]);
      s += Q + '\\phantom{S_{' + (n + 1) + '}}=' + fr(t2[6], t2[3]) + (1000*t2[7] % t2[8] === 0 ? '=' : '\\approx ') + num(t2[7]/t2[8], 3); L.push(s);
      L.push((n % 2 ? '\\text{Como }n=' + n + '\\text{ es impar, }S_{' + n + '}\\text{ queda sobre }S' + Q + '\\text{y la que sigue, }S_{' + (n + 1) + '}\\text{, queda bajo }S\\text{:}' + Q + 'S_{' + (n + 1) + '}\\le S\\le S_{' + n + '}' + Q + Sm + '\\le S\\le ' + Sn
        : '\\text{Como }n=' + n + '\\text{ es par, }S_{' + n + '}\\text{ queda bajo }S' + Q + '\\text{y la que sigue, }S_{' + (n + 1) + '}\\text{, queda sobre }S\\text{:}' + Q + 'S_{' + n + '}\\le S\\le S_{' + (n + 1) + '}' + Q + Sn + '\\le S\\le ' + Sm) + Q + '\\text{(franja burdeo; se demuestra más arriba,}' + Q + '\\text{en la demostración del criterio).}');
      L.push('\\text{Ancho de la franja: la distancia entre las}' + Q + '\\text{dos sumas parciales, que es el término }b_{' + (n + 1) + '}\\text{:}' + Q + (n % 2 ? 'S_{' + n + '}-S_{' + (n + 1) + '}' : 'S_{' + (n + 1) + '}-S_{' + n + '}') + '=' + bn);
      L.push('\\text{Qué significa: }S\\text{ está en la franja, así que}' + Q + '\\text{su distancia a }S_{' + n + '}\\text{ no pasa del ancho:}' + Q + '|S-S_{' + n + '}|\\le ' + bn + (ex ? '=' : '\\approx ') + num(1/(n + 1), 3)
        + (n === 1 ? Q + '\\text{Caso límite: con un solo término la cota es}' + Q + '\\text{la más grande, }\\tfrac{1}{2}\\text{: solo se sabe que }\\tfrac{1}{2}\\le S\\le 1.' : Q + '\\text{Con más términos la cota baja, pero lento:}' + Q + '\\text{para una cota de }0{,}01\\text{ hacen falta }99\\text{ términos.}'));
      return dtPasos(L); }
  };
})());
