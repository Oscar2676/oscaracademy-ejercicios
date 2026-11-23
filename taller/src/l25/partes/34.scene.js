/* L25 H34 · criterios de comparación: la serie Σ 1/(2ⁿ + n) queda bajo la geométrica Σ 1/2ⁿ, sus sumas parciales crecen y tienen techo; y la franja (L/2, 3L/2) de la demostración del criterio en el límite, con el caso L = 0 */
function cmp34Cl(t){ return Math.max(0, Math.min(1, t)); }
function cmp34A(n){ return 1/(Math.pow(2, n) + n); }
function cmp34S(n){ var s = 0, k; for (k = 1; k <= n; k++) s += cmp34A(k); return s; }
function cmp34T(n){ return 1 - 1/Math.pow(2, n); }
/* decimal con coma, para TeX */
function cmp34D(x, d){ return x.toFixed(d).replace('.', '{,}'); }
/* número con a lo más 3 decimales, sin ceros de sobra, para TeX */
function cmp34N(x){ var s = x.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', '{,}'); }
OA.scene('cmp34-idea', (function(){
  var N = 6, M = 6, Q = '\\\\&\\qquad ';
  function gx(n){ return -0.5 + 0.82*n; } function gy(y){ return 2.6 + 4*y; }
  var PZ = [['LS', 'S_{n}', 'Sₙ', 'c-sec'], ['LT', 'T_{n}', 'Tₙ', 'c-alt'],
    ['LU', '\\textstyle\\sum_{n=1}^{\\infty}\\tfrac{1}{2^{n}}=1', 'Σ 1/2ⁿ = 1', 'c-tan'], ['LX', 'S', 'S', 'diff'],
    ['Q', '\\text{¿Converge }\\textstyle\\sum_{n=1}^{\\infty}\\tfrac{1}{2^{n}+n}\\text{?}', '¿Converge Σ 1/(2ⁿ + n)?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí: converge, y su suma }S\\text{ no pasa de }1', '⟹ sí: converge, y su suma S no pasa de 1', 'diff'],
    ['R1', 'a_{n}=\\tfrac{1}{2^{n}+n}>0\\text{: }\\ S_{1}=\\tfrac{1}{3},\\ S_{2}=\\tfrac{1}{2},\\ S_{3}=\\tfrac{13}{22},\\ \\ldots\\text{ crecen}', 'aₙ = 1/(2ⁿ + n) > 0: S₁ = 1/3, S₂ = 1/2, S₃ = 13/22, … crecen', ''],
    ['R2', '2^{n}+n>2^{n}\\ \\Longrightarrow\\ \\tfrac{1}{2^{n}+n}<\\tfrac{1}{2^{n}}\\ \\ \\text{(serie mayor)}', '2ⁿ + n > 2ⁿ ⟹ 1/(2ⁿ + n) < 1/2ⁿ (serie mayor)', ''],
    ['R3', 'S_{n}=a_{1}+\\cdots+a_{n}\\ \\le\\ \\tfrac{1}{2}+\\cdots+\\tfrac{1}{2^{n}}=T_{n}', 'Sₙ = a₁ + ⋯ + aₙ ≤ 1/2 + ⋯ + 1/2ⁿ = Tₙ', ''],
    ['R4', 'T_{n}=1-\\tfrac{1}{2^{n}}<1,\\qquad\\textstyle\\sum_{n=1}^{\\infty}\\tfrac{1}{2^{n}}=1', 'Tₙ = 1 − 1/2ⁿ < 1, Σ 1/2ⁿ = 1', ''],
    ['R5', 'S_{n}\\le T_{n}<1\\text{: las }S_{n}\\text{ crecen y tienen techo }1', 'Sₙ ≤ Tₙ < 1: las Sₙ crecen y tienen techo 1', ''],
    ['R6', '\\textstyle\\sum_{n=1}^{\\infty}\\tfrac{1}{2^{n}+n}\\text{ converge},\\quad S_{6}\\le S\\le 1', 'Σ 1/(2ⁿ + n) converge, S₆ ≤ S ≤ 1', 'diff']];
  var TXT = [['Puntos azules: sumas parciales de la serie dada.', 'Suben, porque cada término es positivo.'],
    ['Cada término es menor que el de una geométrica.', 'Puntos verdes: sumas parciales de esa serie mayor.'],
    ['Trazos naranjas: cada punto azul queda bajo el', 'verde del mismo n. Se suman las desigualdades.'],
    ['La serie mayor converge: sus sumas parciales', 'se acercan a 1 y ninguna lo pasa.'],
    ['Las sumas azules crecen y tampoco pasan de 1:', 'tienen techo. Creciente y con techo: converge.'],
    ['La serie dada converge. Su suma S está en el', 'corchete naranja: entre la última azul y 1.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-3.1, y1:10}, aspect:13.1/6.6,
    aria:'Arriba, una franja dice qué muestra: una serie que queda bajo otra que converge también converge. Animación en seis pasos sobre una gráfica con n en horizontal, de 1 a 6, y las sumas parciales en vertical, de 0 a 1,2. Uno: aparecen en azul las seis primeras sumas parciales de la serie de término 1 dividido por 2 elevado a n más n: un tercio, un medio, 13 veintidosavos y así, cada una más alta que la anterior, cada una con una línea punteada hasta su valor en el eje vertical. Dos: aparecen en verde las sumas parciales de la serie geométrica de término 1 dividido por 2 elevado a n: un medio, tres cuartos, siete octavos, hasta 63 sesentaicuatroavos, también con sus punteadas. Tres: un trazo naranja une cada punto azul con el verde del mismo n; el azul siempre está abajo. Cuatro: una línea burdeo punteada a la altura 1, la suma de la serie geométrica. Cinco: una franja burdeo clara sobre esa línea, con el rótulo techo: ninguna suma lo pasa. Seis: a la derecha, un corchete naranja entre la altura de la sexta suma azul y la altura 1, con la letra S: ahí está la suma de la serie. Nada de lo que aparece se borra; la pregunta, converge la serie, queda arriba y la respuesta, sí, converge y su suma no pasa de 1, se escribe debajo. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(S_{n}\\), sumas parciales de \\(\\sum\\tfrac{1}{2^{n}+n}\\)</span><span><i class="sw alt"></i> \\(T_{n}\\), sumas parciales de la serie mayor, \\(\\sum\\tfrac{1}{2^{n}}\\)</span><span><i class="sw rise"></i> \\(T_{n}-S_{n}\\), y el tramo donde está la suma \\(S\\)</span><span><i class="sw tan"></i> la suma de la serie mayor, \\(1\\): techo de las sumas azules</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), w, i, al, xa = X(gx(0)), xb = X(gx(6.6)), xc, ya, yb;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* una sucesión de puntos, cada uno con su punteada hasta su valor en el eje vertical; aparecen de a uno */
      function serie(f, col, w){ var i, a, px, py; for (i = 1; i <= M; i++){ a = cmp34Cl(w*M - (i - 1)); if (a <= 0) continue; px = X(gx(i)); py = Y(gy(f(i)));
        c.globalAlpha = 0.5*a; c.strokeStyle = col; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, py); c.lineTo(xa, py); c.stroke(); c.setLineDash([]);
        c.globalAlpha = a; c.fillStyle = col; c.beginPath(); c.arc(xa, py, 2, 0, 6.2832); c.fill(); c.beginPath(); c.arc(px, py, 3, 0, 6.2832); c.fill(); c.globalAlpha = 1; } }
      /* paso 5: la zona a la que ninguna suma llega */
      if (k >= 5){ w = k === 5 ? u : 1; c.globalAlpha = 0.12*w; c.fillStyle = C.tan; c.fillRect(xa, Y(gy(1.2)), xb - xa, Y(gy(1)) - Y(gy(1.2))); c.globalAlpha = w; c.font = '600 11px ' + F; c.fillStyle = C.tan; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('techo: ninguna suma lo pasa', xb, Y(gy(1)) - 13); c.globalAlpha = 1; }
      /* ejes */
      S.line(gx(0), gy(0), gx(6.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.2), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      [[0.5, '0,5'], [1, '1']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(xa - 3, Y(gy(m[0]))); c.lineTo(xa + 3, Y(gy(m[0]))); c.stroke(); num(m[1], xa - 7, Y(gy(m[0])), 'right'); });
      num('n', xb + 4, Y(gy(0)), 'left'); num('suma parcial', xa + 6, Y(gy(1.2)) - 5, 'left');
      /* paso 4: la suma de la serie mayor */
      if (k >= 4){ w = k === 4 ? u : 1; c.strokeStyle = C.tan; c.lineWidth = 1.3; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(xa, Y(gy(1))); c.lineTo(xa + (xb - xa)*w, Y(gy(1))); c.stroke(); c.setLineDash([]); if (w > 0.5) L('LU', gx(0.3), gy(1), 0, 0, -14); }
      /* paso 3: cada suma azul queda bajo la verde */
      if (k >= 3){ w = k === 3 ? u : 1; for (i = 1; i <= M; i++){ al = cmp34Cl(w*M - (i - 1)); if (al <= 0) continue; c.strokeStyle = C.rise; c.lineWidth = 1.6; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(cmp34S(i)))); c.lineTo(X(gx(i)), Y(gy(cmp34S(i) + (cmp34T(i) - cmp34S(i))*al))); c.stroke(); } }
      /* paso 2: sumas parciales de la serie mayor */
      if (k >= 2){ w = k === 2 ? u : 1; serie(cmp34T, C.alt, w); if (w > 0.8) L('LT', gx(4.5), gy(0.85), -50); }
      /* paso 1: sumas parciales de la serie dada */
      w = k === 1 ? u : 1; serie(cmp34S, C.sec, w); if (w > 0.8) L('LS', gx(4.5), gy(0.57), -50);
      /* paso 6: dónde está la suma */
      if (k >= 6){ xc = X(gx(6.45)); ya = Y(gy(cmp34S(6))); yb = ya + (Y(gy(1)) - ya)*u; c.strokeStyle = C.rise; c.lineWidth = 2; c.setLineDash([]); c.beginPath(); c.moveTo(xc - 4, ya); c.lineTo(xc, ya); c.lineTo(xc, yb); c.lineTo(xc - 4, yb); c.stroke(); if (u > 0.5) L('LX', gx(6.45), (gy(cmp34S(6)) + gy(1))/2, 0, 6, 0); }
      L('Q', -1.2, 8.62, 0); if (k === N && u > 0.5) L('F', -1.2, 8.04, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 1.85); txt(TXT[k - 1][1], -1.2, 1.85 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.62));
      dtQue(S, 'una serie que queda bajo otra que', 'converge también converge.');
      T.fin();
      oaReg(S, k, N, -1.2, 0.45, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Serie dada: }\\displaystyle\\sum_{n=1}^{\\infty}a_{n},\\quad a_{n}=\\dfrac{1}{2^{n}+n}' + Q + 'a_{1}=\\dfrac{1}{2+1}=\\dfrac{1}{3},\\qquad a_{2}=\\dfrac{1}{4+2}=\\dfrac{1}{6}' + Q + 'a_{3}=\\dfrac{1}{8+3}=\\dfrac{1}{11},\\qquad a_{4}=\\dfrac{1}{16+4}=\\dfrac{1}{20}' + Q + 'a_{5}=\\dfrac{1}{32+5}=\\dfrac{1}{37},\\qquad a_{6}=\\dfrac{1}{64+6}=\\dfrac{1}{70}' + Q + '\\text{Sumas parciales, }S_{n}=a_{1}+\\cdots+a_{n}\\text{:}' + Q + 'S_{1}=\\dfrac{1}{3}\\approx 0{,}3333' + Q + 'S_{2}=\\dfrac{1}{3}+\\dfrac{1}{6}=\\dfrac{2}{6}+\\dfrac{1}{6}=\\dfrac{3}{6}=\\dfrac{1}{2}=0{,}5' + Q + 'S_{3}=\\dfrac{1}{2}+\\dfrac{1}{11}=\\dfrac{11}{22}+\\dfrac{2}{22}=\\dfrac{13}{22}\\approx 0{,}5909' + Q + 'S_{4}=\\dfrac{13}{22}+\\dfrac{1}{20}=\\dfrac{130}{220}+\\dfrac{11}{220}' + Q + '\\phantom{S_{4}}=\\dfrac{141}{220}\\approx 0{,}6409' + Q + 'S_{5}=\\dfrac{141}{220}+\\dfrac{1}{37}=\\dfrac{5217}{8140}+\\dfrac{220}{8140}' + Q + '\\phantom{S_{5}}=\\dfrac{5437}{8140}\\approx 0{,}6679' + Q + 'S_{6}=\\dfrac{5437}{8140}+\\dfrac{1}{70}=\\dfrac{38059}{56980}+\\dfrac{814}{56980}' + Q + '\\phantom{S_{6}}=\\dfrac{38873}{56980}\\approx 0{,}6822' + Q + '\\text{Cada término es positivo: cada suma parcial}' + Q + '\\text{es mayor que la anterior.}',
      '\\text{Se compara cada término con }b_{n}=\\dfrac{1}{2^{n}}\\text{:}' + Q + 'n>0\\ \\Longrightarrow\\ 2^{n}+n>2^{n}>0' + Q + '\\text{Al tomar inversos, el orden se invierte:}' + Q + '0<\\dfrac{1}{2^{n}+n}<\\dfrac{1}{2^{n}}\\quad\\text{para todo }n\\ge 1' + Q + '\\dfrac{1}{3}<\\dfrac{1}{2},\\quad\\dfrac{1}{6}<\\dfrac{1}{4},\\quad\\dfrac{1}{11}<\\dfrac{1}{8},\\quad\\dfrac{1}{20}<\\dfrac{1}{16}' + Q + '\\text{Sumas parciales de la serie mayor, }T_{n}\\text{:}' + Q + 'T_{1}=\\dfrac{1}{2},\\qquad T_{2}=\\dfrac{1}{2}+\\dfrac{1}{4}=\\dfrac{3}{4}' + Q + 'T_{3}=\\dfrac{3}{4}+\\dfrac{1}{8}=\\dfrac{7}{8},\\qquad T_{4}=\\dfrac{7}{8}+\\dfrac{1}{16}=\\dfrac{15}{16}' + Q + 'T_{5}=\\dfrac{15}{16}+\\dfrac{1}{32}=\\dfrac{31}{32}' + Q + 'T_{6}=\\dfrac{31}{32}+\\dfrac{1}{64}=\\dfrac{63}{64}',
      '\\text{Se suman las desigualdades, de }1\\text{ a }n\\text{:}' + Q + 'S_{n}=a_{1}+\\cdots+a_{n}\\le b_{1}+\\cdots+b_{n}=T_{n}' + Q + '\\text{Con cuatro decimales:}' + Q + 'S_{1}\\le T_{1}\\text{: }\\ 0{,}3333\\le 0{,}5' + Q + 'S_{2}\\le T_{2}\\text{: }\\ 0{,}5\\le 0{,}75' + Q + 'S_{3}\\le T_{3}\\text{: }\\ 0{,}5909\\le 0{,}875' + Q + 'S_{4}\\le T_{4}\\text{: }\\ 0{,}6409\\le 0{,}9375' + Q + 'S_{5}\\le T_{5}\\text{: }\\ 0{,}6679\\le 0{,}9688' + Q + 'S_{6}\\le T_{6}\\text{: }\\ 0{,}6822\\le 0{,}9844' + Q + '\\text{En cada }n\\text{, el punto azul está bajo el verde.}',
      '\\text{La serie mayor es geométrica: }a=\\dfrac{1}{2},\\ \\ r=\\dfrac{1}{2}' + Q + 'T_{n}=\\dfrac{a\\,(1-r^{\\,n})}{1-r}=\\dfrac{\\frac{1}{2}\\left(1-\\frac{1}{2^{n}}\\right)}{\\frac{1}{2}}=1-\\dfrac{1}{2^{n}}' + Q + '\\text{Comprobación: }T_{6}=1-\\dfrac{1}{64}=\\dfrac{63}{64}' + Q + '|r|=\\dfrac{1}{2}<1\\text{: converge, y su suma es}' + Q + '\\dfrac{a}{1-r}=\\dfrac{1}{2}:\\left(1-\\dfrac{1}{2}\\right)=\\dfrac{1}{2}:\\dfrac{1}{2}=1' + Q + '\\text{Como }\\dfrac{1}{2^{n}}>0\\text{: }\\ T_{n}=1-\\dfrac{1}{2^{n}}<1\\text{ para todo }n.',
      '\\text{Se encadenan los pasos 3 y 4:}' + Q + 'S_{n}\\le T_{n}<1\\quad\\text{para todo }n' + Q + '\\text{Las sumas }S_{n}\\text{ son crecientes (paso 1) y}' + Q + '\\text{tienen cota superior }1\\text{. Una sucesión}' + Q + '\\text{creciente y acotada superiormente converge}' + Q + '\\text{(hoja «Sucesiones monótonas acotadas»).}',
      '\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{1}{2^{n}+n}\\text{ converge. Sea }S\\text{ su suma.}' + Q + '\\text{El límite de una creciente es su menor cota}' + Q + '\\text{superior, y }1\\text{ es una cota: }\\ S\\le 1' + Q + '\\text{Ninguna suma parcial supera al límite: }\\ S_{6}\\le S' + Q + '0{,}6822\\le S\\le 1' + Q + '\\text{Qué significa: el criterio asegura que la}' + Q + '\\text{serie converge y da una cota; no calcula }S.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: se elige c; a_n = (c·n + 3)/n³ contra b_n = 1/n²; el cociente c + 3/n, su límite L = c y la franja (L/2, 3L/2) de la demostración; caso límite c = 0: L = 0, la franja se cierra y queda solo «cociente < 1» */
OA.scene('cmp34-vivo', (function(){
  var Q = '\\\\&\\qquad ', M = 8, YT = 6.3;
  function gx(n){ return -0.5 + 0.6*n; } function gy(y){ return 1.9 + 0.7*y; }
  function cual(v){ return Math.max(0, Math.min(3, Math.round(v.c == null ? 1 : v.c))); }
  function r(c, n){ return c + 3/n; }
  function NC(c){ return c ? 6/c : 3; } /* desde n > NC(c) el cociente está dentro de la franja (o, con c = 0, bajo 1) */
  function nm(c){ return c === 0 ? '3' : c === 1 ? 'n+3' : c + 'n+3'; }
  var ORD = ['', '1.º', '2.º', '3.º', '4.º', '5.º', '6.º', '7.º', '8.º'];
  var PZ = [['LL', 'L', 'L', 'c-tan'], ['LA', '\\tfrac{3L}{2}', '3L/2', 'c-tan'], ['LB', '\\tfrac{L}{2}', 'L/2', 'c-tan'], ['L0', 'L=0', 'L = 0', 'c-tan'], ['E1', '\\tfrac{a_{n}}{b_{n}}=1', 'aₙ/bₙ = 1', 'pt']];
  [0, 1, 2, 3].forEach(function(c){ var n = NC(c);
    PZ.push(['A' + c, 'a_{n}=\\tfrac{' + nm(c) + '}{n^{3}},\\qquad b_{n}=\\tfrac{1}{n^{2}}\\ \\ \\text{(su serie converge)}', 'aₙ = ' + (c ? '(' + nm(c) + ')' : '3') + '/n³, bₙ = 1/n² (su serie converge)', 'pt']);
    PZ.push(['B' + c, c ? '\\tfrac{a_{n}}{b_{n}}=' + c + '+\\tfrac{3}{n}\\ \\longrightarrow\\ L=' + c : '\\tfrac{a_{n}}{b_{n}}=\\tfrac{3}{n}\\ \\longrightarrow\\ L=0', c ? 'aₙ/bₙ = ' + c + ' + 3/n → L = ' + c : 'aₙ/bₙ = 3/n → L = 0', 'c-tan']);
    PZ.push(['D' + c, c ? '\\text{franja: de }\\tfrac{L}{2}=' + cmp34N(c/2) + '\\text{ a }\\tfrac{3L}{2}=' + cmp34N(3*c/2) + '\\text{; dentro si }n>' + n : '\\text{caso límite: no hay franja; bajo }1\\text{ si }n>3', c ? 'franja: de L/2 = ' + cmp34N(c/2).replace('{,}', ',') + ' a 3L/2 = ' + cmp34N(3*c/2).replace('{,}', ',') + '; dentro si n > ' + n : 'caso límite: no hay franja; bajo 1 si n > 3', 'pt']);
    PZ.push(['V' + c, 'n>' + n, 'n > ' + n, 'pt']); });
  function frases(c){ var n = NC(c); return c ? ['Verdes: dentro de la franja (del ' + ORD[n + 1] + ' en adelante).', 'Ahí la serie queda entre dos múltiplos de la otra.', 'Conclusión: converge, igual que la de referencia.']
    : ['Caso límite: el cociente baja a 0 y no hay franja.', 'Verdes: cociente menor que 1 (del 4.º en adelante).', 'Conclusión: converge, por comparación directa.']; }
  function lectura(c){ var n = NC(c), h = c/2, ts = 3*c/2, R = [];
    R.push('\\text{Datos: }c=' + c + ',\\quad a_{n}=\\dfrac{' + nm(c) + '}{n^{3}}>0,\\quad b_{n}=\\dfrac{1}{n^{2}}>0' + Q + '\\text{Referencia: }\\textstyle\\sum\\tfrac{1}{n^{2}}\\text{, serie }p\\text{ con }p=2>1\\text{:}' + Q + '\\text{converge (hoja «Series harmónicas y series-p»).}');
    R.push('\\text{Cociente (dividir por }\\tfrac{1}{n^{2}}\\text{ es multiplicar por }n^{2})\\text{:}' + Q + '\\dfrac{a_{n}}{b_{n}}=\\dfrac{' + nm(c) + '}{n^{3}}\\cdot n^{2}=\\dfrac{' + (c ? '(' + nm(c) + ')' : '3') + '\\,n^{2}}{n^{3}}=\\dfrac{' + nm(c) + '}{n}' + (c ? Q + '\\phantom{\\dfrac{a_{n}}{b_{n}}}=\\dfrac{' + (c === 1 ? '' : c) + 'n}{n}+\\dfrac{3}{n}=' + c + '+\\dfrac{3}{n}' : ''));
    R.push('\\text{Valores del cociente:}' + (c ? Q + 'n=1\\text{: }\\ ' + c + '+\\dfrac{3}{1}=' + c + '+3=' + (c + 3) + Q + 'n=2\\text{: }\\ ' + c + '+\\dfrac{3}{2}=' + c + '+1{,}5=' + cmp34N(c + 1.5) + Q + 'n=3\\text{: }\\ ' + c + '+\\dfrac{3}{3}=' + c + '+1=' + (c + 1) + Q + 'n=8\\text{: }\\ ' + c + '+\\dfrac{3}{8}=' + c + '+0{,}375=' + cmp34N(c + 0.375)
      : Q + 'n=1\\text{: }\\ \\dfrac{3}{1}=3' + Q + 'n=2\\text{: }\\ \\dfrac{3}{2}=1{,}5' + Q + 'n=3\\text{: }\\ \\dfrac{3}{3}=1' + Q + 'n=8\\text{: }\\ \\dfrac{3}{8}=0{,}375'));
    R.push('\\text{Límite: }\\dfrac{3}{n}=3\\cdot\\dfrac{1}{n}\\ \\longrightarrow\\ 3\\cdot 0=0' + Q + '\\text{(constante por sucesión, con }\\tfrac{1}{n}\\to 0)' + (c ? Q + 'L=' + c + '+0=' + c + '\\quad\\text{(límite de una suma)}' : Q + 'L=0'));
    if (c){
      R.push('0<L<\\infty\\text{: vale la parte (a). Franja:}' + Q + '\\dfrac{L}{2}=\\dfrac{' + c + '}{2}=' + cmp34N(h) + Q + '\\dfrac{3L}{2}=\\dfrac{3\\cdot ' + c + '}{2}=\\dfrac{' + 3*c + '}{2}=' + cmp34N(ts));
      R.push('\\text{¿Desde qué }n\\text{ el cociente está dentro?}' + Q + '\\text{Piso: }' + c + '+\\dfrac{3}{n}>' + c + '>' + cmp34N(h) + '\\text{, para todo }n.' + Q + '\\text{Techo: }' + c + '+\\dfrac{3}{n}<' + cmp34N(ts) + Q + '\\text{Se resta }' + c + '\\text{: }\\ \\dfrac{3}{n}<' + cmp34N(ts) + '-' + c + '=' + cmp34N(h) + Q + '\\text{Se multiplica por }n\\text{ y se divide por }' + cmp34N(h) + '\\text{:}' + Q + 'n>\\dfrac{3}{' + cmp34N(h) + '}=' + n + Q + '\\text{Borde, }n=' + n + '\\text{: }\\ ' + c + '+\\dfrac{3}{' + n + '}=' + c + '+' + cmp34N(3/n) + '=' + cmp34N(ts) + '\\ \\text{(no cuenta)}' + Q + '\\text{Dentro, }n=' + (n + 1) + '\\text{: }\\ ' + c + '+\\dfrac{3}{' + (n + 1) + '}' + ((300/(n + 1)) % 1 === 0 ? '=' : '\\approx ') + cmp34D(r(c, n + 1), 2) + '<' + cmp34N(ts));
      R.push('\\text{Para }n>' + n + '\\text{, multiplicando por }b_{n}>0\\text{:}' + Q + cmp34N(h) + '\\cdot b_{n}<a_{n}<' + cmp34N(ts) + '\\cdot b_{n}' + Q + '\\textstyle\\sum b_{n}\\text{ converge}\\ \\Longrightarrow\\ \\sum ' + cmp34N(ts) + '\\cdot b_{n}\\text{ converge}' + Q + '\\text{(lema 2)}\\ \\Longrightarrow\\ \\textstyle\\sum a_{n}\\text{ converge}' + Q + '\\text{(comparación directa, parte (a)).}' + Q + '\\text{Qué significa: desde }n=' + (n + 1) + '\\text{ la serie queda}' + Q + '\\text{entre dos múltiplos de la de referencia;}' + Q + '\\text{por eso las dos hacen lo mismo.}');
    } else {
      R.push('L=0\\text{: caso límite. La franja iría de}' + Q + '\\dfrac{L}{2}=0\\text{ a }\\dfrac{3L}{2}=0\\text{: no existe.}' + Q + '\\text{La parte (a) no se aplica.}');
      R.push('\\text{Parte (b), con tolerancia }1\\text{: }\\ \\dfrac{3}{n}<1' + Q + '\\text{Se multiplica por }n\\text{: }\\ 3<n\\text{, es decir, }n>3' + Q + '\\text{Borde, }n=3\\text{: }\\ \\dfrac{3}{3}=1\\ \\text{(no cuenta)}' + Q + '\\text{Dentro, }n=4\\text{: }\\ \\dfrac{3}{4}=0{,}75<1');
      R.push('\\text{Para }n>3\\text{, multiplicando por }b_{n}>0\\text{:}' + Q + '0<a_{n}<b_{n}' + Q + '\\textstyle\\sum b_{n}\\text{ converge}\\ \\Longrightarrow\\ \\sum a_{n}\\text{ converge}' + Q + '\\text{(comparación directa, parte (a)).}' + Q + '\\text{Qué significa: con }L=0\\text{ no hay piso. Si la}' + Q + '\\text{serie de referencia divergiera, no se podría}' + Q + '\\text{concluir nada.}');
    }
    return R; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.5}, aspect:10/6.6, _lec:lectura, _fr:frases,
    aria:'Arriba, una franja dice qué muestra: si el cociente de los términos tiene límite L mayor que 0, las dos series hacen lo mismo. Una gráfica con n en horizontal, de 1 a 8, y el cociente entre el término de la serie y el de la serie de referencia en vertical, de 0 a 6. La serie tiene término c por n más 3, dividido por n al cubo; la de referencia, 1 dividido por n al cuadrado, que converge. Un deslizador elige c entre 0, 1, 2 y 3. Los ocho puntos son los cocientes, c más 3 dividido por n, cada uno con una línea punteada hasta su valor en el eje vertical; bajan hacia la línea burdeo punteada de altura L igual a c. Una franja burdeo clara va de la mitad de L a una vez y media L. Los puntos dentro de la franja son verdes y los demás, azules; una línea vertical gris los separa. Con c igual a 1 están dentro desde n igual a 7; con c igual a 2, desde n igual a 4; con c igual a 3, desde n igual a 3. Con c igual a 0, el caso límite, L es 0, no hay franja, y una línea a la altura 1 separa los cocientes menores que 1, que son verdes, desde n igual a 4. Arriba se leen las dos series, el cociente y su límite; bajo el dibujo, frases con la conclusión: la serie converge. Más abajo, la cuenta completa.',
    labels:PZ,
    sliders:[{id:'c', tex:'c', min:0, max:3, step:1, value:1}],
    legend:'<span><i class="sw alt"></i> cocientes \\(\\tfrac{a_{n}}{b_{n}}\\) dentro de la franja</span><span><i class="sw sec"></i> cocientes fuera de la franja, o en su borde</span><span><i class="sw tan"></i> el límite \\(L\\) y la franja de \\(\\tfrac{L}{2}\\) a \\(\\tfrac{3L}{2}\\)</span>',
    anim:{run:24000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.c = Math.min(3, Math.floor(p*4)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var cc = cual(v), n0 = NC(cc), C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), xa = X(gx(0)), xb = X(gx(8.5)), i, px, py, col, fr = frases(cc), xv;
      function num(t, px, py, al, col){ c.font = '500 10.5px ' + F; c.fillStyle = col || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function hl(y, dash, col, wd){ c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash); c.beginPath(); c.moveTo(xa, Y(gy(y))); c.lineTo(xb, Y(gy(y))); c.stroke(); c.setLineDash([]); }
      /* la franja de la demostración: de L/2 a 3L/2 */
      if (cc){ c.globalAlpha = 0.12; c.fillStyle = C.tan; c.fillRect(xa, Y(gy(1.5*cc)), xb - xa, Y(gy(0.5*cc)) - Y(gy(1.5*cc))); c.globalAlpha = 1; hl(1.5*cc, [], C.tan, 0.8); hl(0.5*cc, [], C.tan, 0.8); hl(cc, [5, 4], C.tan, 1.3); }
      else hl(1, [5, 4], C.ink, 1);
      /* ejes */
      S.line(gx(0), gy(0), gx(8.5), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(YT), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (i = 1; i <= 6; i++){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(xa - 3, Y(gy(i))); c.lineTo(xa + 3, Y(gy(i))); c.stroke(); num('' + i, xa - 7, Y(gy(i)), 'right'); }
      num('n', xb + 2, Y(gy(0)) + 11, 'left'); num('cociente', xa + 6, Y(gy(YT)) - 5, 'left');
      /* desde aquí, dentro */
      xv = X(gx(n0 + 0.5)); c.strokeStyle = C.muted || '#6b6b6b'; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(xv, Y(gy(0))); c.lineTo(xv, Y(gy(YT))); c.stroke(); c.setLineDash([]);
      T.L('V' + cc, gx(n0 + 0.5), gy(YT), 0, 5, 8);
      /* los cocientes, cada uno con su punteada hasta su valor en el eje vertical */
      for (i = 1; i <= M; i++){ px = X(gx(i)); py = Y(gy(r(cc, i))); col = i > n0 ? C.alt : C.sec;
        c.globalAlpha = 0.5; c.strokeStyle = col; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, py); c.lineTo(xa, py); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        c.fillStyle = col; c.beginPath(); c.arc(xa, py, 2, 0, 6.2832); c.fill(); c.beginPath(); c.arc(px, py, 3.2, 0, 6.2832); c.fill(); }
      if (cc){ T.L('LL', gx(8.5), gy(cc), 0, 4, 0); T.L('LA', gx(8.5), gy(1.5*cc), 0, 4, -8); T.L('LB', gx(8.5), gy(0.5*cc), 0, 4, 8); }
      else { T.L('L0', gx(8.5), gy(0), 0, 4, -5); T.L('E1', gx(8.5), gy(1), -100, 0, -13); }
      T.L('A' + cc, -1.2, 8.14, 0); T.L('B' + cc, -1.2, 7.62, 0); T.L('D' + cc, -1.2, 7.1, 0);
      c.font = '600 12.5px ' + F; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillStyle = cc ? C.alt : C.ink; c.fillText(fr[0], X(-1.2), Y(1)); c.fillStyle = cc ? C.ink : C.alt; c.fillText(fr[1], X(-1.2), Y(1) + 21); c.fillStyle = C.ink; c.fillText(fr[2], X(-1.2), Y(1) + 42);
      dtQue(S, 'si el cociente tiene límite positivo,', 'las dos series hacen lo mismo.');
      T.fin();
    },
    caption:function(v){ var c = cual(v), fr = frases(c); return 'c = ' + c + '. Cociente: ' + (c ? c + ' + 3/n' : '3/n') + ', con límite L = ' + c + '. ' + fr.join(' '); },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
