/* L25 H26 · límite de una sucesión: aₙ = (n + 1)/n tiene límite 1; para cada franja (1 − ε, 1 + ε) hay un N desde el que todos los términos quedan dentro */
function lm26Cl(t){ return Math.max(0, Math.min(1, t)); }
function lm26D(x){ var s = x.toFixed(3).replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', ',').replace('-', '−'); }
function lm26T(x){ return lm26D(x).replace(',', '{,}').replace('−', '-'); }
OA.scene('lim-idea', (function(){
  var N = 6, M = 12, E1 = 0.25, E2 = 0.1;
  function a(n){ return (n + 1)/n; } function gx(n){ return -0.45 + 0.42*n; } function gy(y){ return 0.9 + (y - 0.6)*4.2; }
  var PZ = [['YA', 'a_{n}', 'aₙ', 'c-sec'],
    ['LL', 'L=1', 'L = 1', 'c-tan'], ['DD', '|a_{n}-1|=\\tfrac{1}{n}', '|aₙ − 1| = 1/n', 'c-tan'],
    ['BU', 'L+\\varepsilon=1{,}25', 'L + ε = 1,25', 'diff'], ['BD', 'L-\\varepsilon=0{,}75', 'L − ε = 0,75', 'diff'],
    ['N4', 'N=4', 'N = 4', 'c-alt'], ['N10', 'N=10', 'N = 10', 'c-alt'],
    ['B2', '\\varepsilon=\\tfrac{1}{10}\\text{: de }0{,}9\\text{ a }1{,}1', 'ε = 1/10: de 0,9 a 1,1', 'diff'],
    ['GE', 'n>N\\ \\Longrightarrow\\ |a_{n}-1|<\\varepsilon', 'n > N ⟹ |aₙ − 1| < ε', 'diff'],
    ['Q', 'a_{n}=\\tfrac{n+1}{n}\\text{: ¿tiene límite? ¿cuál es?}', 'aₙ = (n + 1)/n: ¿tiene límite? ¿cuál es?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí: }\\lim\\limits_{n\\to\\infty}\\tfrac{n+1}{n}=1', '⟹ sí: lím (n + 1)/n = 1', 'diff'],
    ['R1', 'a_{n}=\\tfrac{n+1}{n}:\\quad 2,\\ \\tfrac{3}{2},\\ \\tfrac{4}{3},\\ \\tfrac{5}{4},\\ \\ldots', 'aₙ = (n + 1)/n: 2, 3/2, 4/3, 5/4, …', ''],
    ['R2', 'L=1:\\quad |a_{n}-1|=\\tfrac{1}{n}', 'L = 1: |aₙ − 1| = 1/n', ''],
    ['R3', '\\varepsilon=\\tfrac{1}{4}\\text{: franja de }0{,}75\\text{ a }1{,}25', 'ε = 1/4: franja de 0,75 a 1,25', ''],
    ['R4', '\\tfrac{1}{n}<\\tfrac{1}{4}\\iff n>4:\\quad N=4', '1/n < 1/4 ⟺ n > 4: N = 4', ''],
    ['R5', '\\varepsilon=\\tfrac{1}{10}:\\ \\ \\tfrac{1}{n}<\\tfrac{1}{10}\\iff n>10:\\ \\ N=10', 'ε = 1/10: 1/n < 1/10 ⟺ n > 10: N = 10', ''],
    ['R6', '\\text{todo }\\varepsilon>0:\\ N\\ge\\tfrac{1}{\\varepsilon}\\ \\Rightarrow\\ \\lim\\limits_{n\\to\\infty}a_{n}=1', 'todo ε > 0: N ≥ 1/ε ⟹ lím aₙ = 1', 'diff']];
  var TXT = [['Cada punto es un término; la punteada lo', 'lleva a su valor en el eje vertical.'],
    ['Los términos se acercan a 1. Cada trazo', 'burdeo es la distancia de un término a 1.'],
    ['Se elige una tolerancia y se pinta la franja:', 'los valores a menos de esa distancia de 1.'],
    ['Desde el quinto término, todos caen dentro', 'de la franja. Los cuatro primeros, no.'],
    ['Con una franja más angosta también pasa,', 'pero más tarde: desde el término 11.'],
    ['Para cualquier franja hay un N desde el que', 'todos quedan dentro: eso es tener límite 1.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:9.6}, aspect:14.5/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite es 1 si, para cada franja en torno a 1, desde algún término todos caen dentro. Animación en seis pasos con la sucesión de término general n más 1, dividido por n. Uno: una gráfica con doce puntos azules, uno por término: 2, tres medios, cuatro tercios, cinco cuartos, y siguen bajando; de cada punto sale una línea punteada hasta su valor en el eje vertical. Dos: una recta burdeo horizontal a la altura 1, y de cada punto baja un trazo burdeo hasta ella: es la distancia del término a 1, que vale 1 dividido por n. Tres: una franja naranja horizontal entre las alturas 0,75 y 1,25: los valores que están a menos de un cuarto de 1. Cuatro: una línea verde vertical en n igual a 4, rotulada N igual a 4; los puntos del quinto en adelante se pintan verdes, porque están dentro de la franja; el cuarto está justo en el borde y no cuenta. Cinco: dentro de la primera franja se pinta otra más angosta, entre 0,9 y 1,1; una segunda línea verde en n igual a 10, rotulada N igual a 10; los puntos 11 y 12 quedan con un anillo verde. Seis: se escribe la regla general, n mayor que N implica distancia menor que épsilon, y la respuesta, sí, el límite es 1, bajo la pregunta. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{n}\\) (punteadas: llevan cada uno a su valor en el eje)</span><span><i class="sw tan"></i> el candidato a límite, \\(L=1\\), y la distancia de cada término a él</span><span><i class="sw rise"></i> la franja de \\(L-\\varepsilon\\) a \\(L+\\varepsilon\\)</span><span><i class="sw alt"></i> el número \\(N\\) y los términos que ya quedaron dentro</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, w4, w5, col;
      function txt(t, x, y, al, cc){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function franja(e, w, al){ c.globalAlpha = al*Math.min(1, 2*w); c.fillStyle = C.rise; c.fillRect(X(gx(0)), Y(gy(1 + e*w)), X(gx(12.8)) - X(gx(0)), Y(gy(1 - e*w)) - Y(gy(1 + e*w))); c.globalAlpha = Math.min(1, 2*w); c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([]);
        [1 + e*w, 1 - e*w].forEach(function(y){ c.beginPath(); c.moveTo(X(gx(0)), Y(gy(y))); c.lineTo(X(gx(12.8)), Y(gy(y))); c.stroke(); }); c.globalAlpha = 1; }
      function vert(n, w){ c.strokeStyle = C.alt; c.lineWidth = 1.4; c.setLineDash([5, 3]); c.beginPath(); c.moveTo(X(gx(n)), Y(gy(0.6))); c.lineTo(X(gx(n)), Y(gy(0.6 + 1.36*w))); c.stroke(); c.setLineDash([]); }
      /* pasos 3 y 5: las franjas, debajo de todo lo demás */
      if (k >= 3) franja(E1, k === 3 ? u : 1, 0.14);
      if (k >= 5) franja(E2, k === 5 ? lm26Cl(1.6*u) : 1, 0.26);
      /* ejes */
      S.line(gx(0), gy(0.6), gx(12.8), gy(0.6), {color:C.ink, width:1.1}); S.line(gx(0), gy(0.6), gx(0), gy(2.1), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0.6)) - 3); c.lineTo(X(gx(i)), Y(gy(0.6)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0.6)) + 11, 'center'); }
      [[0.75, '0,75'], [1, '1'], [1.25, '1,25'], [1.5, '1,5'], [2, '2']].concat(k >= 5 ? [[0.9, '0,9'], [1.1, '1,1']] : []).forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('n', X(gx(12.8)) + 5, Y(gy(0.6)), 'left'); L('YA', gx(0) - 0.12, gy(2.1) - 0.05, -100);
      /* paso 2: el candidato a límite y la distancia de cada término a él */
      if (k >= 2){ w = k === 2 ? u : 1; c.strokeStyle = C.tan; c.lineWidth = 1.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(1))); c.lineTo(X(gx(0)) + (X(gx(12.8)) - X(gx(0)))*lm26Cl(2*w), Y(gy(1))); c.stroke();
        for (i = 1; i <= M; i++){ c.strokeStyle = C.tan; c.lineWidth = 1.3; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i)), Y(gy(a(i) - (a(i) - 1)*lm26Cl(2*w - 0.6)))); c.stroke(); }
        if (w > 0.5) L('LL', gx(12.8), gy(0.95), -100); if (w > 0.7) L('DD', gx(7.5), gy(1.62), -50); }
      if (k >= 3 && (k > 3 || u > 0.8)){ L('BU', gx(12.8), gy(1.25) + 0.2, -100); L('BD', gx(12.8), gy(0.75) - 0.2, -100); }
      /* pasos 4 y 5: el N de cada franja */
      w4 = k > 4 ? 1 : k === 4 ? u : 0; w5 = k > 5 ? 1 : k === 5 ? u : 0;
      if (k >= 4){ vert(4, lm26Cl(2*w4)); if (w4 > 0.4) L('N4', gx(4), gy(2.0), -50); txt('desde aquí, dentro', gx(4.3), gy(1.84), lm26Cl(2*w4 - 1), C.alt); }
      if (k >= 5){ vert(10, lm26Cl(2*w5 - 0.6)); if (w5 > 0.6) L('N10', gx(10), gy(2.0), -50); if (w5 > 0.5) L('B2', gx(0.25), gy(0.825), 0); }
      /* paso 1: los términos, uno tras otro, cada uno con su punteada hasta el eje vertical */
      for (i = 1; i <= M; i++){ w = k === 1 ? lm26Cl(u*M - (i - 1)) : 1; if (w <= 0) continue;
        col = (i > 4 && w4*9 > i - 4.5) ? C.alt : C.sec;
        c.globalAlpha = 0.45*w; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i)) + (X(gx(0)) - X(gx(i)))*w, Y(gy(a(i)))); c.stroke(); c.setLineDash([]);
        c.globalAlpha = 0.7*w; c.beginPath(); c.arc(X(gx(0)), Y(gy(a(i))), 1.8, 0, 6.2832); c.fillStyle = C.sec; c.fill();
        c.globalAlpha = w; c.beginPath(); c.arc(X(gx(i)), Y(gy(a(i))), 3.2, 0, 6.2832); c.fillStyle = col; c.fill();
        if (i > 10 && w5 > 0.8){ c.strokeStyle = C.alt; c.lineWidth = 1.2; c.beginPath(); c.arc(X(gx(i)), Y(gy(a(i))), 6, 0, 6.2832); c.stroke(); }
        c.globalAlpha = 1; }
      /* paso 6: la regla general y la respuesta */
      if (k === 6 && u > 0.3) L('GE', gx(6.9), gy(1.43), -50);
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.05); txt(TXT[k - 1][1], -1.2, 0.05 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'el límite es 1 si, para cada franja en torno', 'a 1, desde algún término todos caen dentro.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = [
      '\\text{Dato: término general }a_{n}=\\dfrac{n+1}{n},\\ n\\ge 1' + Q + '\\text{Se reemplaza }n\\text{:}' + Q + 'a_{1}=\\dfrac{1+1}{1}=\\dfrac{2}{1}=2' + Q + 'a_{2}=\\dfrac{2+1}{2}=\\dfrac{3}{2}=1{,}5' + Q + 'a_{3}=\\dfrac{3+1}{3}=\\dfrac{4}{3}\\approx 1{,}33' + Q + 'a_{4}=\\dfrac{4+1}{4}=\\dfrac{5}{4}=1{,}25' + Q + 'a_{5}=\\dfrac{5+1}{5}=\\dfrac{6}{5}=1{,}2' + Q + 'a_{10}=\\dfrac{10+1}{10}=\\dfrac{11}{10}=1{,}1' + Q + 'a_{12}=\\dfrac{12+1}{12}=\\dfrac{13}{12}\\approx 1{,}08',
      '\\text{Los términos bajan hacia }1\\text{. Candidato: }L=1.' + Q + '\\text{Resta, con }1=\\dfrac{n}{n}\\text{:}' + Q + 'a_{n}-1=\\dfrac{n+1}{n}-\\dfrac{n}{n}=\\dfrac{n+1-n}{n}=\\dfrac{1}{n}' + Q + '\\text{Distancia: }|a_{n}-1|=\\left|\\dfrac{1}{n}\\right|=\\dfrac{1}{n}\\ \\text{(es positivo)}',
      '\\text{Tolerancia elegida: }\\varepsilon=\\dfrac{1}{4}=0{,}25' + Q + 'L-\\varepsilon=1-0{,}25=0{,}75' + Q + 'L+\\varepsilon=1+0{,}25=1{,}25' + Q + '\\text{Dentro de la franja: }0{,}75<a_{n}<1{,}25\\text{,}' + Q + '\\text{que es lo mismo que }|a_{n}-1|<0{,}25.',
      '\\text{¿Para qué }n\\text{ se cumple }\\dfrac{1}{n}<\\dfrac{1}{4}\\text{?}' + Q + '\\text{Se multiplica cada lado por }4n\\text{, que es positivo:}' + Q + '4<n\\text{. Los }n\\text{ que sirven: }5,\\ 6,\\ 7,\\ \\ldots' + Q + 'N=4\\text{: si }n>4\\text{, entonces }|a_{n}-1|<\\dfrac{1}{4}.' + Q + 'n=4\\text{: }\\dfrac{1}{4}\\text{ no es menor que }\\dfrac{1}{4}\\text{ (justo en el borde).}' + Q + 'n=5\\text{: }\\dfrac{1}{5}=0{,}2<0{,}25\\text{ (dentro).}',
      '\\text{Otra tolerancia, más chica: }\\varepsilon=\\dfrac{1}{10}=0{,}1' + Q + 'L-\\varepsilon=1-0{,}1=0{,}9' + Q + 'L+\\varepsilon=1+0{,}1=1{,}1' + Q + '\\dfrac{1}{n}<\\dfrac{1}{10}\\text{: se multiplica por }10n\\text{, positivo: }10<n.' + Q + 'N=10\\text{: si }n>10\\text{, entonces }|a_{n}-1|<\\dfrac{1}{10}.' + Q + 'n=10\\text{: }\\dfrac{1}{10}\\text{ no es menor que }\\dfrac{1}{10}\\text{ (borde).}' + Q + 'n=11\\text{: }\\dfrac{1}{11}\\approx 0{,}09<0{,}1\\text{ (dentro).}' + Q + '\\text{Franja más angosta: }N\\text{ más grande.}',
      '\\text{Cualquier tolerancia }\\varepsilon>0\\text{:}' + Q + '\\dfrac{1}{n}<\\varepsilon\\text{: se multiplica por }n\\text{ y se divide por }\\varepsilon\\text{,}' + Q + '\\text{los dos positivos: }\\dfrac{1}{\\varepsilon}<n.' + Q + '\\text{Se elige un natural }N\\ge\\dfrac{1}{\\varepsilon}\\text{ (existe: propiedad}' + Q + '\\text{arquimediana, usada sin demostrar).}' + Q + '\\text{Si }n>N\\text{: }n>\\dfrac{1}{\\varepsilon}\\text{, y entonces }|a_{n}-1|=\\dfrac{1}{n}<\\varepsilon.' + Q + '\\text{Vale para todo }\\varepsilon>0\\text{: por definición,}' + Q + '\\displaystyle\\lim_{n\\to\\infty}\\dfrac{n+1}{n}=1'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: aₙ = 1 + (−1)ⁿ/n, L = 1; el deslizador elige ε; la franja se angosta y el N crece; caso límite: ε = 0 no deja ningún término dentro */
OA.scene('lim-vivo', (function(){
  var M = 12, NE = 9, Q = '\\\\&\\qquad ';
  /* ε = p/q, de mayor a menor; el último, ε = 0, es el caso límite que la definición excluye */
  var EPS = [[5, 4], [1, 1], [1, 2], [2, 5], [1, 4], [1, 5], [1, 8], [1, 10], [0, 1]];
  var NOTA = ['caso límite: tan ancha que no hay que esperar', 'el primer término cae justo en el borde', 'franja más angosta: hay que esperar más', 'N no cambia: ningún término nuevo quedó fuera', 'el cuarto término cae justo en el borde', 'franja más angosta: N más grande', 'franja más angosta: N más grande', 'siempre hay un N, por angosta que sea', 'por eso la definición pide tolerancia positiva'];
  function a(n){ return 1 + (n % 2 ? -1 : 1)/n; } function gx(n){ return -0.45 + 0.4*n; } function gy(y){ return 1.55 + (y + 0.4)*1.72; }
  function cual(v){ return Math.max(1, Math.min(NE, Math.round(v.e || 1))) - 1; }
  function dn(n){ var x = 1/n, s = lm26T(x); return Math.abs(x - Math.round(x*1000)/1000) < 1e-12 ? ['=', s] : ['\\approx', x.toFixed(2).replace('.', '{,}')]; }
  var DAT = EPS.map(function(f){ var e = f[0]/f[1], o = {e:e, z:f[0] === 0}; if (!o.z){ o.inv = f[1]/f[0]; o.N = Math.floor(o.inv + 1e-9); o.lo = 1 - e; o.hi = 1 + e; } return o; });
  var PZ = [['YA', 'a_{n}', 'aₙ', 'c-sec'], ['LL', 'L=1', 'L = 1', 'c-tan'], ['SQ', 'a_{n}=1+\\tfrac{(-1)^{n}}{n},\\qquad L=1', 'aₙ = 1 + (−1)ⁿ/n, L = 1', 'pt']];
  DAT.forEach(function(o, j){
    PZ.push(['E' + j, o.z ? '\\varepsilon=0\\text{ (no permitido): no hay }N' : '\\varepsilon=' + lm26T(o.e) + ':\\quad\\text{franja de }' + lm26T(o.lo) + '\\text{ a }' + lm26T(o.hi) + ',\\quad N=' + o.N, o.z ? 'ε = 0 (no permitido): no hay N' : 'ε = ' + lm26D(o.e) + ': franja de ' + lm26D(o.lo) + ' a ' + lm26D(o.hi) + ', N = ' + o.N, 'diff']);
    if (!o.z) PZ.push(['N' + j, 'N=' + o.N, 'N = ' + o.N, 'c-alt']); });
  function lectura(j){ var o = DAT[j], e = lm26T(o.e), N = o.N, d, R;
    R = ['\\text{Datos: }a_{n}=1+\\dfrac{(-1)^{n}}{n},\\quad L=1' + Q + '\\text{Tolerancia elegida: }\\varepsilon=' + e + (o.z ? '' : (EPS[j][1] > 1 && EPS[j][0] === 1 ? '=\\dfrac{1}{' + EPS[j][1] + '}' : EPS[j][1] > 1 ? '=\\dfrac{' + EPS[j][0] + '}{' + EPS[j][1] + '}' : '')),
      '\\text{Distancia de un término a }L\\text{:}' + Q + 'a_{n}-1=1+\\dfrac{(-1)^{n}}{n}-1=\\dfrac{(-1)^{n}}{n}' + Q + '|a_{n}-1|=\\dfrac{|(-1)^{n}|}{n}=\\dfrac{1}{n}\\quad\\text{porque }|(-1)^{n}|=1'];
    if (o.z){ R.push('\\text{Franja: de }1-0=1\\text{ a }1+0=1\\text{: solo la recta }L.');
      R.push('\\text{Dentro sería }|a_{n}-1|<0\\text{, o sea }\\dfrac{1}{n}<0.' + Q + '\\text{Pero }\\dfrac{1}{n}>0\\text{ para todo }n\\text{: ningún término}' + Q + '\\text{cumple. No existe ningún }N.');
      R.push('\\text{Caso límite: con }\\varepsilon=0\\text{ esta sucesión no}' + Q + '\\text{tendría límite, y sí lo tiene. Por eso la}' + Q + '\\text{definición pide }\\varepsilon>0\\text{: tan chico como se}' + Q + '\\text{quiera, pero nunca }0.');
      return R; }
    R.push('\\text{Franja:}' + Q + 'L-\\varepsilon=1-' + e + '=' + lm26T(o.lo) + Q + 'L+\\varepsilon=1+' + e + '=' + lm26T(o.hi));
    R.push('\\text{Dentro de la franja: }|a_{n}-1|<\\varepsilon\\text{,}' + Q + '\\text{o sea, }\\dfrac{1}{n}<' + e + Q + '\\text{Se multiplica por }n\\text{ y se divide por }' + e + '\\text{,}' + Q + '\\text{los dos positivos: }n>\\dfrac{1}{' + e + '}' + Q + '\\text{División: }\\dfrac{1}{' + e + '}=' + lm26T(o.inv) + '\\ \\ (\\text{porque }' + lm26T(o.inv) + '\\cdot ' + e + '=1)');
    R.push('\\text{Naturales mayores que }' + lm26T(o.inv) + '\\text{: }' + (N + 1) + ',\\ ' + (N + 2) + ',\\ ' + (N + 3) + ',\\ \\ldots' + Q + '\\text{El primero es }' + (N + 1) + '\\text{. Entonces }N=' + (N + 1) + '-1=' + N);
    if (N === 0){ d = dn(1); R.push('\\text{Comprobación con el primer término, }n=1\\text{:}' + Q + '|a_{1}-1|=\\dfrac{1}{1}=1<' + e + '\\text{: dentro.}');
      R.push('\\text{Caso límite: la franja es tan ancha que todos}' + Q + '\\text{los términos quedan dentro. Sirve }N=0' + Q + '\\text{(y cualquier }N\\text{ mayor).}'); }
    else { d = dn(N); var d2 = dn(N + 1), borde = Math.abs(1/N - o.e) < 1e-12;
      R.push('\\text{Comprobación:}' + Q + 'n=' + N + '\\text{: }|a_{' + N + '}-1|=\\dfrac{1}{' + N + '}' + (N === 1 ? '=1' : d[0] + d[1]) + (borde ? Q + '\\text{no es menor que }' + e + '\\text{: en el borde, no dentro.}' : '>' + e + '\\text{ (fuera).}') + Q + 'n=' + (N + 1) + '\\text{: }|a_{' + (N + 1) + '}-1|=\\dfrac{1}{' + (N + 1) + '}' + d2[0] + d2[1] + '<' + e + '\\text{ (dentro).}');
      R.push('\\text{Para }\\varepsilon=' + e + '\\text{ sirve }N=' + N + '\\text{ (y cualquier }N\\text{ mayor):}' + Q + '\\text{si }n>' + N + '\\text{, entonces }|a_{n}-1|<' + e + '.'); }
    return R; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.0}, aspect:9.5/6.6,
    aria:'Arriba, una franja dice qué muestra: franja más angosta, N más grande, pero siempre hay un N. Una gráfica de la sucesión 1 más, menos 1 elevado a n, dividido por n: doce puntos que saltan a un lado y otro de la recta burdeo L igual a 1 y se le acercan: 0, 1,5, dos tercios, 1,25, y así. De cada punto sale una punteada hasta su valor en el eje vertical y un trazo burdeo hasta la recta. Un deslizador elige la tolerancia épsilon entre nueve valores, de mayor a menor: 1,25; 1; 0,5; 0,4; 0,25; 0,2; 0,125; 0,1 y 0. Para cada valor se pinta la franja naranja de 1 menos épsilon a 1 más épsilon, y una línea verde vertical marca N: los puntos posteriores a N, verdes, están dentro de la franja; los anteriores, azules, están fuera o en el borde. Los N son, en orden: 0, 1, 2, 2, 4, 5, 8 y 10. Con épsilon igual a 1,25, caso límite, todos los términos están dentro y sirve N igual a 0. Con épsilon igual a 0, el otro caso límite, la franja se reduce a la recta, ningún término queda dentro y no hay N: por eso la definición pide épsilon mayor que cero. Bajo el dibujo, frases dicen cuántos términos quedan dentro y, más abajo, la cuenta completa de N.',
    labels:PZ,
    sliders:[{id:'e', tex:'\\varepsilon', min:1, max:NE, step:1, value:5}],
    legend:'<span><i class="sw rise"></i> la franja de \\(L-\\varepsilon\\) a \\(L+\\varepsilon\\)</span><span><i class="sw alt"></i> el número \\(N\\) y los términos que están dentro</span><span><i class="sw sec"></i> los términos que están fuera o en el borde</span><span><i class="sw tan"></i> el límite \\(L=1\\) y la distancia de cada término a él</span><span>líneas punteadas: llevan cada término a su valor en el eje</span>',
    anim:{run:36000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.e = Math.min(NE, 1 + Math.floor(p*NE)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = cual(v), o = DAT[j], C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, den, tk = [];
      function txt(t, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, cc, b){ c.font = (b ? '700' : '500') + ' 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* la franja */
      if (!o.z){ c.globalAlpha = 0.16; c.fillStyle = C.rise; c.fillRect(X(gx(0)), Y(gy(o.hi)), X(gx(12.6)) - X(gx(0)), Y(gy(o.lo)) - Y(gy(o.hi))); c.globalAlpha = 1; c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([]);
        [o.hi, o.lo].forEach(function(y){ c.beginPath(); c.moveTo(X(gx(0)), Y(gy(y))); c.lineTo(X(gx(12.6)), Y(gy(y))); c.stroke(); num(lm26D(y), X(gx(0)) - 7, Y(gy(y)), 'right', C.rise, 1); tk.push(Y(gy(y))); }); }
      /* ejes */
      S.line(gx(0), gy(-0.4), gx(12.6), gy(-0.4), {color:C.ink, width:1.1}); S.line(gx(0), gy(-0.4), gx(0), gy(2.4), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= M; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(-0.4)) - 3); c.lineTo(X(gx(i)), Y(gy(-0.4)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(-0.4)) + 11, 'center'); }
      [0, 0.5, 1, 1.5, 2].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m))); c.lineTo(X(gx(0)) + 3, Y(gy(m))); c.stroke(); if (!tk.some(function(t){ return Math.abs(t - Y(gy(m))) < 12; })) num(lm26D(m), X(gx(0)) - 7, Y(gy(m)), 'right'); });
      num('n', X(gx(12.6)) + 5, Y(gy(-0.4)), 'left'); T.L('YA', gx(0), gy(2.4) + 0.25, -50);
      /* el límite */
      c.strokeStyle = C.tan; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(gx(0)), Y(gy(1))); c.lineTo(X(gx(12.6)), Y(gy(1))); c.stroke(); T.L('LL', gx(12.6) + 0.05, gy(1), 0);
      /* el número N */
      if (!o.z){ c.strokeStyle = C.alt; c.lineWidth = o.N ? 1.4 : 2.4; c.setLineDash(o.N ? [5, 3] : []); c.beginPath(); c.moveTo(X(gx(o.N)), Y(gy(-0.4))); c.lineTo(X(gx(o.N)), Y(gy(2.4))); c.stroke(); c.setLineDash([]); T.L('N' + j, gx(o.N) + 0.08, gy(2.32), 0); }
      /* los términos: punteada hasta el eje, trazo hasta L, punto */
      for (i = 1; i <= M; i++){ den = !o.z && i > o.N;
        c.globalAlpha = 0.45; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(0)), Y(gy(a(i)))); c.stroke(); c.setLineDash([]);
        c.globalAlpha = 0.7; c.beginPath(); c.arc(X(gx(0)), Y(gy(a(i))), 1.8, 0, 6.2832); c.fillStyle = C.sec; c.fill(); c.globalAlpha = 1;
        c.strokeStyle = C.tan; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(a(i)))); c.lineTo(X(gx(i)), Y(gy(1))); c.stroke();
        c.beginPath(); c.arc(X(gx(i)), Y(gy(a(i))), 3.3, 0, 6.2832); c.fillStyle = den ? C.alt : C.sec; c.fill(); }
      T.L('SQ', -1.2, 7.62, 0); T.L('E' + j, -1.2, 7.08, 0);
      /* conclusión, junto al dibujo */
      if (o.z){ txt('dentro de la franja: ningún término', 0.78, C.rise); txt('con tolerancia cero no existe ningún N', 0.78 - 21/s, C.sec); }
      else { txt('dentro de la franja: todos desde el término ' + (o.N + 1), 0.78, C.alt); txt(o.N === 0 ? 'fuera o en el borde: ninguno' : o.N === 1 ? 'fuera o en el borde: el primero' : 'fuera o en el borde: los ' + o.N + ' primeros', 0.78 - 21/s, C.sec); }
      txt(NOTA[j], 0.78 - 42/s, C.ink);
      dtQue(S, 'franja más angosta, N más grande; pero', 'siempre hay un N. Mueve el deslizador.');
      T.fin();
    },
    caption:function(v){ var j = cual(v), o = DAT[j]; return o.z ? 'Tolerancia 0: la franja se reduce a la recta L = 1 y ningún término queda dentro; no existe N. Por eso la definición pide una tolerancia mayor que cero.' : 'Tolerancia ' + lm26D(o.e) + ': la franja va de ' + lm26D(o.lo) + ' a ' + lm26D(o.hi) + '. Sirve N = ' + o.N + ': todos los términos desde el ' + (o.N + 1) + ' están dentro. ' + NOTA[j].charAt(0).toUpperCase() + NOTA[j].slice(1) + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
