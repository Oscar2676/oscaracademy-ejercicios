/* L25 H27 · sucesiones monótonas acotadas: aₙ = n/(n + 1) crece y tiene techo 1; el menor techo (supremo) es su límite */
function mo27Cl(t){ return Math.max(0, Math.min(1, t)); }
function mo27D(x){ var s = x.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', ',').replace('-', '−'); }
function mo27T(x){ return mo27D(x).replace(',', '{,}').replace('−', '-'); }
OA.scene('mon-idea', (function(){
  var N = 6, M = 12;
  function a(n){ return n/(n + 1); } function gx(n){ return -0.45 + 0.42*n; } function gy(y){ return 0.9 + (y - 0.4)*8; }
  var PZ = [['YA', 'a_{n}', 'aₙ', 'c-sec'],
    ['S1', '\\tfrac{1}{6}', '1/6', 'diff'], ['S2', '\\tfrac{1}{12}', '1/12', 'diff'],
    ['SA', '\\text{salto: }a_{n+1}-a_{n}=\\tfrac{1}{(n+1)(n+2)}>0', 'salto: aₙ₊₁ − aₙ = 1/((n + 1)(n + 2)) > 0', 'diff'],
    ['TE', '\\text{techo: }a_{n}<1', 'techo: aₙ < 1', 'c-tan'],
    ['DD', '\\text{le falta: }1-a_{n}=\\tfrac{1}{n+1}', 'le falta: 1 − aₙ = 1/(n + 1)', 'c-tan'],
    ['NC', '1-\\tfrac{1}{4}=0{,}75\\text{: no es techo}', '1 − 1/4 = 0,75: no es techo', 'diff'],
    ['A4', 'a_{4}=0{,}8>0{,}75', 'a₄ = 0,8 > 0,75', 'c-alt'],
    ['N3', 'N=3', 'N = 3', 'c-alt'],
    ['B2', '\\varepsilon=\\tfrac{1}{10}\\text{: de }0{,}9\\text{ a }1,\\ \\ N=9', 'ε = 1/10: de 0,9 a 1, N = 9', 'c-alt'],
    ['Q', 'a_{n}=\\tfrac{n}{n+1}\\text{: ¿por qué tiene límite?}', 'aₙ = n/(n + 1): ¿por qué tiene límite?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{crece y tiene techo: }\\lim\\limits_{n\\to\\infty}a_{n}=1', '⟹ crece y tiene techo: lím aₙ = 1', 'diff'],
    ['R1', 'a_{n}=\\tfrac{n}{n+1}:\\quad \\tfrac{1}{2},\\ \\tfrac{2}{3},\\ \\tfrac{3}{4},\\ \\tfrac{4}{5},\\ \\ldots', 'aₙ = n/(n + 1): 1/2, 2/3, 3/4, 4/5, …', ''],
    ['R2', 'a_{n+1}-a_{n}=\\tfrac{1}{(n+1)(n+2)}>0\\text{: creciente}', 'aₙ₊₁ − aₙ = 1/((n + 1)(n + 2)) > 0: creciente', ''],
    ['R3', '1-a_{n}=\\tfrac{1}{n+1}>0\\text{: cota superior }1', '1 − aₙ = 1/(n + 1) > 0: cota superior 1', ''],
    ['R4', 'a_{4}=0{,}8>0{,}75\\text{: }0{,}75\\text{ no es cota superior}', 'a₄ = 0,8 > 0,75: 0,75 no es cota superior', ''],
    ['R5', 'n>3:\\ \\ 0{,}75<a_{4}\\le a_{n}<1\\ \\Rightarrow\\ |a_{n}-1|<\\tfrac{1}{4}', 'n > 3: 0,75 < a₄ ≤ aₙ < 1 ⟹ |aₙ − 1| < 1/4', ''],
    ['R6', '\\text{todo }\\varepsilon>0\\text{: igual}\\ \\Rightarrow\\ \\lim\\limits_{n\\to\\infty}a_{n}=1=\\sup', 'todo ε > 0: igual ⟹ lím aₙ = 1 = sup', 'diff']];
  var TXT = [['Cada punto es un término; la punteada lo', 'lleva a su valor en el eje vertical.'],
    ['Cada salto naranja es positivo: cada término', 'es mayor que el anterior. La sucesión crece.'],
    ['Ningún término llega a 1: es un techo (cota', 'superior). En burdeo, lo que le falta a cada uno.'],
    ['Un techo más bajo, 0,75, no sirve: el cuarto', 'término lo supera. El menor techo es 1.'],
    ['Desde el cuarto, todos quedan entre 0,75 y 1:', 'no bajan (crece) ni pasan de 1 (techo).'],
    ['Con cualquier franja bajo 1 pasa lo mismo:', 'el límite es 1, el menor techo (supremo).']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:9.6}, aspect:14.5/6.6,
    aria:'Arriba, una franja dice qué muestra: si una sucesión crece y tiene techo, sus términos se aprietan contra el menor techo, que es su límite. Animación en seis pasos con la sucesión de término general n dividido por n más 1. Uno: una gráfica con doce puntos azules, uno por término: un medio, dos tercios, tres cuartos, cuatro quintos, y siguen subiendo cada vez menos; de cada punto sale una línea punteada hasta su valor en el eje vertical. Dos: entre cada punto y el siguiente se dibuja un escalón; el tramo vertical, naranja, es el salto, siempre positivo: un sexto, un doceavo, y cada vez menor. Tres: una recta burdeo horizontal a la altura 1, el techo, y de cada punto sube un trazo burdeo hasta ella: es lo que le falta al término para llegar a 1, que vale 1 dividido por n más 1. Cuatro: una recta naranja punteada a la altura 0,75; el cuarto término, 0,8, queda con un anillo verde porque la supera: 0,75 no es techo. Cinco: una franja naranja entre 0,75 y 1 y una línea verde vertical en n igual a 3, rotulada N igual a 3; los puntos del cuarto en adelante se pintan verdes: están todos dentro de la franja. Seis: una franja más angosta, entre 0,9 y 1, con N igual a 9; los puntos 10, 11 y 12 quedan con un anillo verde; la respuesta, crece y tiene techo, el límite es 1, se escribe bajo la pregunta. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{n}\\) (punteadas: llevan cada uno a su valor en el eje)</span><span><i class="sw rise"></i> los saltos \\(a_{n+1}-a_{n}\\), la prueba con \\(0{,}75\\) y la franja</span><span><i class="sw tan"></i> el techo \\(1\\) y lo que le falta a cada término</span><span><i class="sw alt"></i> el número \\(N\\) y los términos que ya quedaron dentro</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, w2, w3, w4, w5, w6, col, xr = gx(12.8);
      function txt(t, x, y, al, cc){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function franja(lo, w, al){ c.globalAlpha = al*Math.min(1, 2*w); c.fillStyle = C.rise; c.fillRect(X(gx(0)), Y(gy(1)), X(xr) - X(gx(0)), (Y(gy(lo)) - Y(gy(1)))*w); c.globalAlpha = 1; }
      function vert(n, w){ c.strokeStyle = C.alt; c.lineWidth = 1.4; c.setLineDash([5, 3]); c.beginPath(); c.moveTo(X(gx(n)), Y(gy(0.4))); c.lineTo(X(gx(n)), Y(gy(0.4 + 0.72*w))); c.stroke(); c.setLineDash([]); }
      w2 = k > 2 ? 1 : k === 2 ? u : 0; w3 = k > 3 ? 1 : k === 3 ? u : 0; w4 = k > 4 ? 1 : k === 4 ? u : 0; w5 = k > 5 ? 1 : k === 5 ? u : 0; w6 = k === 6 ? u : 0;
      /* pasos 5 y 6: las franjas, debajo de todo lo demás */
      if (k >= 5) franja(0.75, w5, 0.14);
      if (k >= 6) franja(0.9, mo27Cl(1.6*w6), 0.24);
      /* ejes */
      S.line(gx(0), gy(0.4), xr, gy(0.4), {color:C.ink, width:1.1}); S.line(gx(0), gy(0.4), gx(0), gy(1.14), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0.4)) - 3); c.lineTo(X(gx(i)), Y(gy(0.4)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0.4)) + 11, 'center'); }
      [[0.5, '0,5'], [0.75, '0,75'], [1, '1']].concat(k >= 6 ? [[0.9, '0,9']] : []).forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('n', X(xr) + 5, Y(gy(0.4)), 'left'); L('YA', gx(0) - 0.12, gy(1.14) - 0.05, -100);
      /* paso 2: los saltos, como escalones: tramo horizontal fino y tramo vertical naranja */
      if (k >= 2){ for (i = 1; i < M; i++){ w = mo27Cl(w2*(M + 2) - i); if (w <= 0) continue;
          c.strokeStyle = C.muted || '#6b6b6b'; c.globalAlpha = 0.6; c.lineWidth = 0.9; c.setLineDash([]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i + 1)), Y(gy(a(i)))); c.stroke(); c.globalAlpha = 1;
          c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(X(gx(i + 1)), Y(gy(a(i)))); c.lineTo(X(gx(i + 1)), Y(gy(a(i) + (a(i + 1) - a(i))*w))); c.stroke(); }
        if (w2 > 0.25) L('S1', gx(2) + 0.07, gy((a(1) + a(2))/2), 0); if (w2 > 0.4) L('S2', gx(3) + 0.07, gy((a(2) + a(3))/2), 0);
        if (w2 > 0.7) L('SA', xr, 2.47, -100); }
      /* paso 3: el techo y lo que le falta a cada término */
      if (k >= 3){ c.strokeStyle = C.tan; c.lineWidth = 1.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(1))); c.lineTo(X(gx(0)) + (X(xr) - X(gx(0)))*mo27Cl(2*w3), Y(gy(1))); c.stroke();
        for (i = 1; i <= M; i++){ c.strokeStyle = C.tan; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i)), Y(gy(a(i) + (1 - a(i))*mo27Cl(2*w3 - 0.6)))); c.stroke(); }
        if (w3 > 0.5) L('TE', xr, gy(1) + 0.3, -100); if (w3 > 0.7) L('DD', xr, 1.95, -100); }
      /* paso 4: un techo más bajo no sirve */
      if (k >= 4){ c.strokeStyle = C.rise; c.lineWidth = 1.3; c.setLineDash([6, 4]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(0.75))); c.lineTo(X(gx(0)) + (X(xr) - X(gx(0)))*mo27Cl(2*w4), Y(gy(0.75))); c.stroke(); c.setLineDash([]);
        if (w4 > 0.5) L('NC', xr, 3.37, -100);
        if (w4 > 0.7){ c.strokeStyle = C.alt; c.lineWidth = 1.5; c.beginPath(); c.arc(X(gx(4)), Y(gy(a(4))), 6.5, 0, 6.2832); c.stroke(); L('A4', xr, 2.93, -100); } }
      /* pasos 5 y 6: el N de cada franja */
      if (k >= 5){ vert(3, mo27Cl(2*w5)); if (w5 > 0.4) L('N3', gx(3), gy(0.4) + 0.72*8 + 0.25, -50); }
      if (k >= 6){ vert(9, mo27Cl(2*w6 - 0.6)); if (w6 > 0.5) L('B2', xr, 1.43, -100); }
      /* paso 1: los términos, uno tras otro, cada uno con su punteada hasta el eje vertical */
      for (i = 1; i <= M; i++){ w = k === 1 ? mo27Cl(u*M - (i - 1)) : 1; if (w <= 0) continue;
        col = (i > 3 && w5*10 > i - 3.5) ? C.alt : C.sec;
        c.globalAlpha = 0.45*w; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i)) + (X(gx(0)) - X(gx(i)))*w, Y(gy(a(i)))); c.stroke(); c.setLineDash([]);
        c.globalAlpha = 0.7*w; c.beginPath(); c.arc(X(gx(0)), Y(gy(a(i))), 1.8, 0, 6.2832); c.fillStyle = C.sec; c.fill();
        c.globalAlpha = w; c.beginPath(); c.arc(X(gx(i)), Y(gy(a(i))), 3.2, 0, 6.2832); c.fillStyle = col; c.fill();
        if (i > 9 && w6 > 0.8){ c.strokeStyle = C.alt; c.lineWidth = 1.2; c.beginPath(); c.arc(X(gx(i)), Y(gy(a(i))), 6, 0, 6.2832); c.stroke(); }
        c.globalAlpha = 1; }
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.05); txt(TXT[k - 1][1], -1.2, 0.05 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'si crece y tiene techo, los términos se', 'aprietan contra el menor techo: su límite.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = [
      '\\text{Dato: término general }a_{n}=\\dfrac{n}{n+1},\\ n\\ge 1' + Q + '\\text{Se reemplaza }n\\text{:}' + Q + 'a_{1}=\\dfrac{1}{1+1}=\\dfrac{1}{2}=0{,}5' + Q + 'a_{2}=\\dfrac{2}{2+1}=\\dfrac{2}{3}\\approx 0{,}67' + Q + 'a_{3}=\\dfrac{3}{3+1}=\\dfrac{3}{4}=0{,}75' + Q + 'a_{4}=\\dfrac{4}{4+1}=\\dfrac{4}{5}=0{,}8' + Q + 'a_{5}=\\dfrac{5}{5+1}=\\dfrac{5}{6}\\approx 0{,}83' + Q + 'a_{12}=\\dfrac{12}{12+1}=\\dfrac{12}{13}\\approx 0{,}92',
      '\\text{¿Crece? Se resta cada término del siguiente:}' + Q + 'a_{n+1}-a_{n}=\\dfrac{n+1}{n+2}-\\dfrac{n}{n+1}' + Q + '\\text{Denominador común, }(n+1)(n+2)\\text{:}' + Q + 'a_{n+1}-a_{n}=\\dfrac{(n+1)(n+1)-n(n+2)}{(n+1)(n+2)}' + Q + '\\text{Productos: }(n+1)(n+1)=n^{2}+2n+1' + Q + 'n(n+2)=n^{2}+2n' + Q + '\\text{Resta: }n^{2}+2n+1-(n^{2}+2n)=1' + Q + 'a_{n+1}-a_{n}=\\dfrac{1}{(n+1)(n+2)}>0' + Q + '\\text{(numerador y denominador positivos).}' + Q + 'a_{n+1}>a_{n}\\text{ para todo }n\\text{: crece.}' + Q + '\\text{Primer salto: }a_{2}-a_{1}=\\dfrac{1}{2\\cdot 3}=\\dfrac{1}{6}\\approx 0{,}17' + Q + '\\text{Segundo salto: }a_{3}-a_{2}=\\dfrac{1}{3\\cdot 4}=\\dfrac{1}{12}\\approx 0{,}08',
      '\\text{¿Tiene techo? Se compara con }1=\\dfrac{n+1}{n+1}\\text{:}' + Q + '1-a_{n}=\\dfrac{n+1}{n+1}-\\dfrac{n}{n+1}' + Q + '\\phantom{1-a_{n}}=\\dfrac{n+1-n}{n+1}=\\dfrac{1}{n+1}' + Q + '\\dfrac{1}{n+1}>0\\text{, así que }a_{n}<1\\text{ para todo }n.' + Q + '1\\text{ es una cota superior (un techo).}' + Q + '\\text{También lo es todo número mayor que }1.',
      '\\text{¿Hay un techo más bajo? Se prueba}' + Q + '1-\\dfrac{1}{4}=\\dfrac{3}{4}=0{,}75.' + Q + '\\text{Del paso 3: }a_{n}=1-\\dfrac{1}{n+1}.' + Q + 'a_{n}>0{,}75\\iff\\dfrac{1}{n+1}<\\dfrac{1}{4}' + Q + '\\iff n+1>4\\iff n>3.' + Q + 'a_{3}=0{,}75\\text{: no lo supera (justo en la línea).}' + Q + 'a_{4}=0{,}8>0{,}75\\text{: lo supera.}' + Q + '0{,}75\\text{ no es cota superior.}',
      '\\text{Desde el cuarto término (}n>3\\text{; es decir, }N=3\\text{):}' + Q + 'a_{n}\\ge a_{4}\\quad\\text{(crece: no vuelve a bajar)}' + Q + 'a_{4}=0{,}8>0{,}75' + Q + 'a_{n}<1\\quad\\text{(techo)}' + Q + '\\text{Junto: }0{,}75<a_{n}<1<1{,}25' + Q + '\\text{o sea, }1-\\dfrac{1}{4}<a_{n}<1+\\dfrac{1}{4}\\text{,}' + Q + '\\text{que es lo mismo que }|a_{n}-1|<\\dfrac{1}{4}.',
      '\\text{Cualquier tolerancia }\\varepsilon>0\\text{:}' + Q + '1-a_{n}=\\dfrac{1}{n+1}<\\varepsilon\\iff n+1>\\dfrac{1}{\\varepsilon}' + Q + '\\text{Hay un natural }N\\ge\\dfrac{1}{\\varepsilon}\\text{ (propiedad}' + Q + '\\text{arquimediana, usada sin demostrar).}' + Q + '\\text{Si }n>N\\text{: }n+1>\\dfrac{1}{\\varepsilon}\\text{, y entonces}' + Q + '1-\\varepsilon<a_{n}<1<1+\\varepsilon.' + Q + '\\text{Ejemplo: }\\varepsilon=\\dfrac{1}{10}\\text{, franja de }0{,}9\\text{ a }1.' + Q + '\\dfrac{1}{n+1}<\\dfrac{1}{10}\\iff n+1>10\\iff n>9' + Q + '\\text{Sirve }N=9\\text{: }a_{10}=\\dfrac{10}{11}\\approx 0{,}91>0{,}9' + Q + '\\text{Ningún número menor que }1\\text{ es techo:}' + Q + '1\\text{ es el menor techo: el supremo.}' + Q + '\\text{Y por definición de límite:}' + Q + '\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n}{n+1}=1'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: aₙ₊₁ = (aₙ + 6)/2; el deslizador elige a₁ de 0 a 12; bajo 6 crece con techo 6, sobre 6 decrece con piso 6; caso límite a₁ = 6: constante */
OA.scene('mon-vivo', (function(){
  var M = 8, Q = '\\\\&\\qquad ', j;
  function a(c, n){ return 6 + (c - 6)/Math.pow(2, n - 1); } function gx(n){ return -0.45 + 0.57*n; } function gy(y){ return 1.55 + y*0.38; }
  function cual(v){ return Math.max(0, Math.min(12, Math.round(v.c == null ? 2 : v.c))); }
  var PZ = [['YA', 'a_{n}', 'aₙ', 'c-sec'], ['LL', 'L=6', 'L = 6', 'c-tan'], ['SQ', 'a_{n+1}=\\tfrac{a_{n}+6}{2}\\quad\\text{(el promedio de }a_{n}\\text{ y }6\\text{)}', 'aₙ₊₁ = (aₙ + 6)/2 (el promedio de aₙ y 6)', 'pt']];
  for (j = 0; j <= 12; j++){
    PZ.push(['E' + j, 'a_{1}=' + j + ':\\quad ' + [1, 2, 3, 4].map(function(n){ return mo27T(a(j, n)); }).join(',\\ ') + ',\\ \\ldots', 'a₁ = ' + j + ': ' + [1, 2, 3, 4].map(function(n){ return mo27D(a(j, n)); }).join('; ') + '; …', 'c-sec']);
    PZ.push(['J' + j, '\\text{salto: }\\tfrac{6-' + j + '}{2}=' + mo27T((6 - j)/2), 'salto: (6 − ' + j + ')/2 = ' + mo27D((6 - j)/2), 'diff']); }
  function lectura(c){ var t = [0, c, a(c, 2), a(c, 3), a(c, 4)], R, i, l;
    R = ['\\text{Datos: }a_{1}=' + c + ',\\qquad a_{n+1}=\\dfrac{a_{n}+6}{2}'];
    l = '\\text{Términos, con }a_{n+1}=\\dfrac{a_{n}+6}{2}\\text{:}';
    for (i = 1; i <= 3; i++) l += Q + 'a_{' + (i + 1) + '}=\\dfrac{' + mo27T(t[i]) + '+6}{2}=\\dfrac{' + mo27T(t[i] + 6) + '}{2}=' + mo27T(t[i + 1]);
    R.push(l);
    R.push('\\text{Salto entre dos términos, con }a_{n}=\\dfrac{2a_{n}}{2}\\text{:}' + Q + 'a_{n+1}-a_{n}=\\dfrac{a_{n}+6}{2}-\\dfrac{2a_{n}}{2}=\\dfrac{6-a_{n}}{2}' + Q + '\\text{Primer salto: }\\dfrac{6-' + c + '}{2}=\\dfrac{' + mo27T(6 - c) + '}{2}=' + mo27T((6 - c)/2) + Q + '\\text{Comprobación: }a_{2}-a_{1}=' + mo27T(t[2]) + '-' + c + '=' + mo27T(t[2] - c));
    l = '\\text{Distancia a }6\\text{, con }6=\\dfrac{12}{2}\\text{:}' + Q + 'a_{n+1}-6=\\dfrac{a_{n}+6}{2}-\\dfrac{12}{2}=\\dfrac{a_{n}-6}{2}';
    if (c === 6){
      R.push(l + Q + 'a_{1}-6=6-6=0.' + Q + '\\text{Si }a_{n}-6=0\\text{: }a_{n+1}-6=\\dfrac{0}{2}=0.' + Q + '\\text{Todos cumplen }a_{n}=6\\text{ (inducción).}');
      R.push('\\text{Todos los saltos: }a_{n+1}-a_{n}=\\dfrac{6-6}{2}=\\dfrac{0}{2}=0.' + Q + '\\text{Vale }a_{n+1}\\ge a_{n}\\text{ y también }a_{n+1}\\le a_{n}\\text{:}' + Q + '\\text{creciente y decreciente a la vez, ninguna}' + Q + '\\text{de las dos estricta.}');
      R.push('\\text{Cotas: }6\\le a_{n}\\le 6\\text{. Acotada.}');
      R.push('\\text{Caso límite: sucesión constante.}' + Q + '\\text{Converge a su constante: }\\displaystyle\\lim_{n\\to\\infty}a_{n}=6.' + Q + '\\text{Aquí el supremo, }6\\text{, sí es un término.}');
      return R; }
    if (c < 6){
      R.push(l + Q + 'a_{1}-6=' + c + '-6=' + mo27T(c - 6) + '<0.' + Q + '\\text{Si }a_{n}-6<0\\text{, su mitad también: }a_{n+1}-6<0.' + Q + '\\text{Todos cumplen }a_{n}<6\\text{ (inducción).}');
      R.push('\\text{Signo de los saltos: como }a_{n}<6\\text{, }6-a_{n}>0\\text{ y}' + Q + 'a_{n+1}-a_{n}=\\dfrac{6-a_{n}}{2}>0.' + Q + '\\text{Estrictamente creciente.}');
      R.push('\\text{Cotas: }a_{n}\\ge a_{1}=' + c + '\\ \\text{(crece)}\\quad\\text{y}\\quad a_{n}<6.' + Q + '\\text{Acotada: todos los términos entre }' + c + '\\text{ y }6.');
      R.push('\\text{Creciente y acotada superiormente: converge}' + Q + '\\text{(teorema de la convergencia monótona).}' + Q + '\\text{Su límite }L\\text{ cumple }L=\\dfrac{L+6}{2}\\text{ (ejemplo 2):}' + Q + '2L=L+6,\\qquad L=6.' + Q + '\\displaystyle\\lim_{n\\to\\infty}a_{n}=6' + Q + '\\text{Es el menor techo; ningún término vale }6.');
      return R; }
    R.push(l + Q + 'a_{1}-6=' + c + '-6=' + mo27T(c - 6) + '>0.' + Q + '\\text{Si }a_{n}-6>0\\text{, su mitad también: }a_{n+1}-6>0.' + Q + '\\text{Todos cumplen }a_{n}>6\\text{ (inducción).}');
    R.push('\\text{Signo de los saltos: como }a_{n}>6\\text{, }6-a_{n}<0\\text{ y}' + Q + 'a_{n+1}-a_{n}=\\dfrac{6-a_{n}}{2}<0.' + Q + '\\text{Estrictamente decreciente.}');
    R.push('\\text{Cotas: }a_{n}\\le a_{1}=' + c + '\\ \\text{(decrece)}\\quad\\text{y}\\quad a_{n}>6.' + Q + '\\text{Acotada: todos los términos entre }6\\text{ y }' + c + '.');
    R.push('\\text{Decreciente y acotada inferiormente: converge}' + Q + '\\text{(teorema, versión decreciente).}' + Q + '\\text{Su límite }L\\text{ cumple }L=\\dfrac{L+6}{2}\\text{ (ejemplo 2):}' + Q + '2L=L+6,\\qquad L=6.' + Q + '\\displaystyle\\lim_{n\\to\\infty}a_{n}=6' + Q + '\\text{Es el mayor piso; ningún término vale }6.');
    return R; }
  function frases(c){ return c < 6 ? ['crece: cada salto es positivo', 'acotada: todos los términos entre ' + c + ' y 6', 'crece y tiene techo: converge a 6'] : c > 6 ? ['decrece: cada salto es negativo', 'acotada: todos los términos entre 6 y ' + c, 'decrece y tiene piso: converge a 6'] : ['caso límite: todos los saltos valen 0', 'constante: todos los términos valen 6', 'crece y decrece a la vez (no estricta); límite 6']; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.0}, aspect:9.5/6.6,
    aria:'Arriba, una franja dice qué muestra: parta bajo 6 o sobre 6, la sucesión es monótona y acotada, y converge a 6. Una gráfica de la sucesión en que cada término es el promedio del anterior y 6. Un deslizador elige el primer término entre los enteros de 0 a 12. Se dibujan ocho términos, cada uno con una punteada hasta su valor en el eje vertical, y entre cada término y el siguiente un escalón cuyo tramo vertical naranja es el salto; el primer salto lleva escrita su cuenta. Una recta burdeo horizontal marca el 6. Una franja naranja pálida cubre desde el primer término hasta 6: todos los términos están dentro. Si el primer término es menor que 6, los puntos suben hacia 6 sin alcanzarlo: la sucesión crece y 6 es su techo. Si es mayor que 6, bajan hacia 6: decrece y 6 es su piso. Con el primer término igual a 6, caso límite, todos los puntos están sobre la recta: la sucesión es constante, todos los saltos valen cero y es creciente y decreciente a la vez. Bajo el dibujo, tres frases dicen si crece o decrece, entre qué valores está acotada y que converge a 6; más abajo va la cuenta completa.',
    labels:PZ,
    sliders:[{id:'c', tex:'a_{1}', min:0, max:12, step:1, value:2}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{n}\\) (punteadas: llevan cada uno a su valor en el eje)</span><span><i class="sw rise"></i> los saltos \\(a_{n+1}-a_{n}\\) y la franja entre las dos cotas</span><span><i class="sw tan"></i> el límite, \\(L=6\\)</span>',
    anim:{run:39000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.c = Math.min(12, Math.floor(p*13)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var cc = cual(v), C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, xr = gx(8.6), fr = frases(cc), py, d;
      function txt(t, y, col){ c.font = '600 12.5px ' + F; c.fillStyle = col || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, col, b){ c.font = (b ? '700' : '500') + ' 10.5px ' + F; c.fillStyle = col || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* la franja entre las dos cotas: el primer término y 6 */
      if (cc !== 6){ c.globalAlpha = 0.14; c.fillStyle = C.rise; c.fillRect(X(gx(0)), Y(gy(Math.max(cc, 6))), X(xr) - X(gx(0)), Y(gy(Math.min(cc, 6))) - Y(gy(Math.max(cc, 6)))); c.globalAlpha = 1; }
      /* ejes */
      S.line(gx(0), gy(0), xr, gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(12.7), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (i = 0; i <= 12; i += 2){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(i))); c.lineTo(X(gx(0)) + 3, Y(gy(i))); c.stroke(); if (i !== cc && i !== 6) num('' + i, X(gx(0)) - 7, Y(gy(i)), 'right'); }
      num('6', X(gx(0)) - 7, Y(gy(6)), 'right', C.tan, 1); if (cc !== 6) num('' + cc, X(gx(0)) - 7, Y(gy(cc)), 'right', C.sec, 1);
      num('n', X(xr) + 5, Y(gy(0)), 'left'); T.L('YA', gx(0), gy(12.7) + 0.22, -50);
      /* el límite */
      c.strokeStyle = C.tan; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(gx(0)), Y(gy(6))); c.lineTo(X(xr), Y(gy(6))); c.stroke(); T.L('LL', xr + 0.05, gy(6), 0);
      /* los saltos, como escalones */
      for (i = 1; i < M; i++){ c.strokeStyle = C.muted || '#6b6b6b'; c.globalAlpha = 0.6; c.lineWidth = 0.9; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(cc, i)))); c.lineTo(X(gx(i + 1)), Y(gy(a(cc, i)))); c.stroke(); c.globalAlpha = 1;
        d = Math.abs(Y(gy(a(cc, i + 1))) - Y(gy(a(cc, i))));
        if (d > 14) dtFlecha(S, gx(i + 1), gy(a(cc, i)), gx(i + 1), gy(a(cc, i + 1)), C.rise, 2);
        else if (d > 0){ c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(X(gx(i + 1)), Y(gy(a(cc, i)))); c.lineTo(X(gx(i + 1)), Y(gy(a(cc, i + 1)))); c.stroke(); } }
      /* la cuenta del primer salto, junto a él: cuelga del nivel del segundo término, hacia el lado libre */
      py = Y(gy(a(cc, 2)));
      if (cc < 6) S.lab('J' + cc, X(gx(2)) + 7, py + 3, 0, 0, true); else if (cc > 6) S.lab('J' + cc, X(gx(2)) + 7, py - 3, 0, -100, true); else S.lab('J6', X(gx(2)) + 7, py - 5, 0, -100, true);
      /* los términos: punteada hasta el eje y punto */
      for (i = 1; i <= M; i++){
        c.globalAlpha = 0.45; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(cc, i)))); c.lineTo(X(gx(0)), Y(gy(a(cc, i)))); c.stroke(); c.setLineDash([]);
        c.globalAlpha = 0.7; c.beginPath(); c.arc(X(gx(0)), Y(gy(a(cc, i))), 1.8, 0, 6.2832); c.fillStyle = C.sec; c.fill(); c.globalAlpha = 1;
        c.beginPath(); c.arc(X(gx(i)), Y(gy(a(cc, i))), 3.3, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      T.L('SQ', -1.2, 7.62, 0); T.L('E' + cc, -1.2, 7.08, 0);
      /* conclusión, junto al dibujo */
      txt(fr[0], 0.78, C.rise); txt(fr[1], 0.78 - 21/s, C.sec); txt(fr[2], 0.78 - 42/s, C.ink);
      dtQue(S, 'parta bajo 6 o sobre 6, es monótona y', 'acotada, y converge a 6. Mueve el deslizador.');
      PZ.forEach(function(e){ var id = e[0], t = id.charAt(0); if ((t === 'E' || t === 'J') && id.length > 1 && id !== 'E' + cc && id !== 'J' + cc) S.lab(id, 0, 0, 0, 0, false); });
    },
    caption:function(v){ var c = cual(v), fr = frases(c); return 'Primer término ' + c + ': ' + [1, 2, 3, 4].map(function(n){ return mo27D(a(c, n)); }).join('; ') + '; … ' + fr[0].charAt(0).toUpperCase() + fr[0].slice(1) + '; ' + fr[1] + '; ' + fr[2] + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
