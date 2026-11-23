/* L25 H21 · razón de una progresión geométrica: se divide cada término por el anterior; si siempre da lo mismo, ese número es r */
function ci21Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a; }
function ci21Red(n, d){ var g = ci21Mcd(n, d) || 1; if (d < 0) g = -g; return [n/g, d/g]; }
/* fracción ya escrita con su signo delante; t = 1: tamaño chico */
function ci21Cru(n, d, t){ return d === 1 ? '' + n : (n < 0 ? '-' : '') + '\\' + (t ? 't' : 'd') + 'frac{' + Math.abs(n) + '}{' + d + '}'; }
function ci21Tex(f, t){ var r = ci21Red(f[0], f[1]); return ci21Cru(r[0], r[1], t); }
function ci21Par(f, t){ var s = ci21Tex(f, t); return f[0]*f[1] < 0 ? '\\left(' + s + '\\right)' : s; }
function ci21Pl(f){ var r = ci21Red(f[0], f[1]); return (r[0] < 0 ? '−' : '') + Math.abs(r[0]) + (r[1] === 1 ? '' : '/' + r[1]); }
OA.scene('raz-idea', (function(){
  var N = 5, A = [2, 6, 18, 54], XC = [-0.6, 0.8, 2.2, 3.6], W = 0.62, YB = 1.6, K = 0.075;
  var PZ = [['T1', 'a_{1}=2', 'a₁ = 2', 'c-sec'], ['T2', 'a_{2}=6', 'a₂ = 6', 'c-sec'], ['T3', 'a_{3}=18', 'a₃ = 18', 'c-sec'], ['T4', 'a_{4}=54', 'a₄ = 54', 'c-sec'],
    ['D1', '\\tfrac{6}{2}=3', '6/2 = 3', 'diff'], ['D2', '\\tfrac{18}{6}=3', '18/6 = 3', 'diff'], ['D3', '\\tfrac{54}{18}=3', '54/18 = 3', 'diff'],
    ['M1', '\\cdot\\,3', '· 3', 'diff'], ['M2', '\\cdot\\,3', '· 3', 'diff'], ['M3', '\\cdot\\,3', '· 3', 'diff'],
    ['Q', '2,\\ 6,\\ 18,\\ 54\\qquad r=\\ ?', '2, 6, 18, 54   r = ?', 'pt'], ['F', '\\Longrightarrow\\ r=\\tfrac{a_{n+1}}{a_{n}}=3', '⟹ r = aₙ₊₁/aₙ = 3', 'diff'],
    ['R1', '2,\\ 6,\\ 18,\\ 54', '2, 6, 18, 54', ''],
    ['R2', '\\tfrac{a_{2}}{a_{1}}=\\tfrac{6}{2}=3', 'a₂/a₁ = 6/2 = 3', ''],
    ['R3', '\\tfrac{a_{3}}{a_{2}}=\\tfrac{18}{6}=3', 'a₃/a₂ = 18/6 = 3', ''],
    ['R4', '\\tfrac{a_{4}}{a_{3}}=\\tfrac{54}{18}=3', 'a₄/a₃ = 54/18 = 3', ''],
    ['R5', 'r=\\tfrac{a_{n+1}}{a_{n}}=3,\\qquad a_{n+1}=a_{n}\\cdot 3', 'r = aₙ₊₁/aₙ = 3,  aₙ₊₁ = aₙ · 3', 'diff']];
  var TXT = [['Cuatro términos, dibujados como columnas.', '¿Cuántas veces cabe cada uno en el siguiente?'],
    ['El segundo término, dividido por el primero:', 'la primera columna cabe 3 veces en la segunda.'],
    ['El tercero, dividido por el segundo:', 'la segunda columna cabe 3 veces en la tercera.'],
    ['El cuarto, dividido por el tercero:', 'otra vez 3 bloques justos.'],
    ['Los tres cocientes coinciden: la razón es 3.', 'Cada término es el anterior multiplicado por 3.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.3, y1:7.9}, aspect:12.2/6.6,
    aria:'Arriba, una franja dice qué muestra: dividir cada término por el anterior da siempre lo mismo, la razón r. Animación en cinco pasos con los términos 2, 6, 18 y 54, dibujados como cuatro columnas azules de esas alturas. Uno: las columnas crecen hasta su altura. Dos: una línea punteada lleva la altura de la primera columna hasta la segunda; la segunda columna se llena con bloques naranjas de esa altura y caben 3; sobre ella se escribe 6 dividido por 2 igual a 3. Tres: lo mismo entre la segunda y la tercera: 18 dividido por 6 igual a 3. Cuatro: entre la tercera y la cuarta: 54 dividido por 18 igual a 3; los bloques van numerados 1, 2 y 3. Cinco: bajo las columnas aparece una flecha naranja de cada término al siguiente, rotulada por 3: la razón es 3. Los bloques naranjas, los cocientes y las punteadas quedan en las columnas hasta el final; la pregunta queda arriba y la respuesta se escribe a su lado. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos</span><span><i class="sw rise"></i> bloques del alto de la columna anterior: los que caben son el cociente; flechas: multiplicar por la razón</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, b, g, w, wb, h, ya = YB - 0.95, xa, xb;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function caja(xc, y0, y1, col, a, al){ if (y1 - y0 < 1e-6 || al <= 0) return; S.poly([[xc - W/2, y0], [xc + W/2, y0], [xc + W/2, y1], [xc - W/2, y1]], {fill:col, alpha:a*al});
        c.globalAlpha = al; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(X(xc - W/2) + 0.5, Y(y1) + 0.5, W*s - 1, (y1 - y0)*s - 1); c.globalAlpha = 1; }
      g = k === 1 ? u : 1;
      S.line(-1.15, YB, 4.9, YB, {color:C.ink, width:1.1});
      for (i = 0; i < 4; i++){ caja(XC[i], YB, YB + K*A[i]*g, C.sec, 0.26, 1); if (k > 1 || u > 0.6) L('T' + (i + 1), XC[i], YB, -50, 0, 12); }
      for (i = 1; i <= 3; i++){ if (k < i + 1) break; w = k === i + 1 ? u : 1; h = K*A[i - 1]; /* bloques naranjas de la columna i + 1: cada uno mide lo que la columna anterior */
        c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(XC[i - 1] + W/2), Y(YB + h)); c.lineTo(X(XC[i - 1] + W/2 + (XC[i] + W/2 - XC[i - 1] - W/2)*Math.min(1, w*3)), Y(YB + h)); c.stroke(); c.setLineDash([]);
        for (b = 0; b < 3; b++){ wb = Math.max(0, Math.min(1, w*3 - b)); caja(XC[i], YB + h*b, YB + h*(b + 1), C.rise, b % 2 ? 0.3 : 0.52, wb);
          if (wb > 0.5 && h*s >= 14){ c.font = '700 10.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (b + 1), X(XC[i]), Y(YB + h*(b + 0.5))); } }
        if (w > 0.6) L('D' + i, XC[i], YB + K*A[i], -50, 0, -13); }
      if (k === 5) for (i = 0; i < 3; i++){ xa = XC[i] + 0.22; xb = XC[i + 1] - 0.22; dtFlecha(S, xa, ya, xa + (xb - xa)*u, ya, C.rise, 1.6); if (u > 0.6) L('M' + (i + 1), (xa + xb)/2, ya, -50, 0, -11); }
      L('Q', -1.2, 6.55, 0); if (k === N && u > 0.5) L('F', 1.55, 6.55, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, YB - 1.6); txt(TXT[k - 1][1], -1.2, YB - 1.6 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.2));
      dtQue(S, 'dividir cada término por el', 'anterior da siempre lo mismo: la razón r.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, R = [
      'a_{1}=2,\\quad a_{2}=6,\\quad a_{3}=18,\\quad a_{4}=54' + Q + '\\text{Ninguno es }0\\text{: se puede dividir.}' + Q + '\\text{Cociente entre vecinos: }' + f('a_{n+1}', 'a_{n}'),
      f('a_{2}', 'a_{1}') + '=' + f(6, 2) + '=3' + Q + '\\text{porque }2\\cdot 3=6',
      f('a_{3}', 'a_{2}') + '=' + f(18, 6) + '=3' + Q + '\\text{porque }6\\cdot 3=18',
      f('a_{4}', 'a_{3}') + '=' + f(54, 18) + '=3' + Q + '\\text{porque }18\\cdot 3=54',
      '\\text{Los tres cocientes dan }3\\text{:}' + Q + 'r=' + f('a_{n+1}', 'a_{n}') + '=3' + Q + '\\text{Cada término es el anterior por }3\\text{:}' + Q + 'a_{n+1}=a_{n}\\cdot 3' + Q + '2\\cdot 3=6,\\quad 6\\cdot 3=18,\\quad 18\\cdot 3=54' + Q + '\\text{Los cuatro términos están en progresión}' + Q + '\\text{geométrica de razón }3\\text{.}' + Q + '\\text{Las restas no coinciden:}' + Q + '6-2=4,\\quad 18-6=12,\\quad 54-18=36' + Q + '\\text{No es aritmética.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: a₁ = 4 fijo; al mover r, los seis primeros términos crecen, quedan iguales, decrecen o alternan de signo */
OA.scene('raz-vivo', (function(){
  var A1 = 4, NN = 6, KY = 0.14, j, PZ = [['P1', 'a_{1}=4', 'a₁ = 4', 'c-sec'], ['E6', '\\text{con }r=0\\text{:}\\quad 4,\\ 0,\\ 0,\\ 0,\\ 0,\\ 0', 'con r = 0: 4, 0, 0, 0, 0, 0', 'diff']];
  function raz(j){ return ci21Red(j - 6, 4); }
  function ter(j){ var r = raz(j), a = [[A1, 1]], n; for (n = 1; n < NN; n++) a.push(ci21Red(a[n - 1][0]*r[0], a[n - 1][1]*r[1])); return a; }
  for (j = 0; j <= 12; j++) if (j !== 6){
    PZ.push(['E' + j, '\\text{cada flecha naranja: }a_{n+1}=a_{n}\\cdot' + ci21Par(raz(j), 1), 'cada flecha naranja: aₙ₊₁ = aₙ · ' + (j < 6 ? '(' + ci21Pl(raz(j)) + ')' : ci21Pl(raz(j))), 'diff']);
    PZ.push(['S' + j, 'a_{6}=' + ci21Tex(ter(j)[5], 1), 'a₆ = ' + ci21Pl(ter(j)[5]), 'c-sec']); }
  function jj(v){ return Math.max(0, Math.min(12, Math.round(((v.r == null ? 1.5 : +v.r) + 1.5)*4))); }
  function dec(x){ return oaDec(x, 2).replace(/0$/, '').replace(/,0$/, ''); }
  function lin(j){
    if (j > 10) return ['Razón mayor que 1: cada término es mayor', 'que el anterior. La progresión crece.'];
    if (j === 10) return ['Razón 1: cada término es igual al anterior.', 'Todos valen 4: la progresión es constante.'];
    if (j > 6) return ['Razón entre 0 y 1: cada término es menor', 'que el anterior, y sigue positivo. Decrece.'];
    if (j === 6) return ['Ya no es progresión geométrica:', 'no se puede dividir por 0 (no hay cocientes).'];
    if (j > 2) return ['Razón negativa: los signos se alternan.', 'Sin el signo, los tamaños se achican.'];
    if (j === 2) return ['Razón −1: los signos se alternan.', 'Sin el signo, todos los tamaños valen 4.'];
    return ['Razón negativa: los signos se alternan.', 'Sin el signo, los tamaños crecen.']; }
  return {
    world:{x0:-1.5, x1:7.9, y0:-7.4, y1:6.8}, aspect:14.2/9.4,
    aria:'Arriba, una franja dice qué muestra: la razón r decide cómo se comporta la progresión. Gráfica de puntos sueltos con los seis primeros términos de la progresión geométrica de primer término 4 y razón r. Un deslizador elige r entre menos 1,5 y 1,5, de 0,25 en 0,25. En horizontal va n y en vertical el valor del término, de menos 30 a 30. Cada punto azul está unido por una línea punteada con su valor en el eje vertical, y una flecha naranja va de cada punto al siguiente: es la multiplicación por r. El primer punto lleva el rótulo a sub 1 igual a 4 y el sexto lleva su valor. Con r mayor que 1 los puntos suben; con r igual a 1 quedan todos a la altura 4; con r entre 0 y 1 bajan y siguen sobre el eje; con r negativa quedan alternadamente sobre el eje y bajo él. Con r igual a 0, caso límite, solo queda el punto de altura 4 y cinco anillos grises sobre el eje, sin flechas: ya no es progresión geométrica, porque no se puede dividir por 0. Bajo la gráfica, una línea naranja escribe la multiplicación con el valor de r y dos frases dicen cuál es el caso; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'r', tex:'r', min:-1.5, max:1.5, step:0.25, value:1.5}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{1}=4,\\ a_{2},\\ \\ldots,\\ a_{6}\\)</span><span><i class="sw rise"></i> flechas: multiplicar por \\(r\\)</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
    anim:{run:39000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.r = 1.5 - Math.min(12, Math.floor(p*13))/4; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = jj(v), a = ter(j).map(function(f){ return f[0]/f[1]; }), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', gris = C.muted || '#6b6b6b', s = X(1) - X(0), i, LN = lin(j), y, ax, ay, bx, by, d;
      function gy(z){ return KY*z; }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = gris; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-0.3, 0, 7.0, 0, {color:C.ink, width:1.1}); S.line(0, gy(-33), 0, gy(33), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NN; i++){ c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); }
      for (i = -30; i <= 30; i += 10){ if (!i) continue; c.beginPath(); c.moveTo(X(0) - 3, Y(gy(i))); c.lineTo(X(0) + 3, Y(gy(i))); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(0) - 8, Y(gy(i)), 'right'); }
      num('n', X(7.0) + 6, Y(0), 'left'); num('aₙ', X(0) + 6, Y(gy(33)) + 2, 'left');
      /* punteadas: cada término hasta su valor en el eje */
      for (i = 1; i <= NN; i++){ if (j === 6 && i > 1) break; c.globalAlpha = 0.55; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(i), Y(gy(a[i - 1]))); c.lineTo(X(0), Y(gy(a[i - 1]))); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        c.beginPath(); c.arc(X(0), Y(gy(a[i - 1])), 2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      /* números de n: del lado contrario al punto, sobre fondo blanco para que las punteadas no los crucen */
      for (i = 1; i <= NN; i++){ y = Y(0) + (a[i - 1] < 0 ? -11 : 11); c.fillStyle = 'rgba(255,255,255,0.92)'; c.fillRect(X(i) - 5, y - 6, 10, 12); num('' + i, X(i), y, 'center'); }
      /* flechas naranjas: de cada término al siguiente, multiplicando por r */
      if (j !== 6) for (i = 1; i < NN; i++){ ax = X(i); ay = Y(gy(a[i - 1])); bx = X(i + 1); by = Y(gy(a[i])); d = Math.hypot(bx - ax, by - ay); if (d < 16) continue;
        dtFlecha(S, i + 6*(bx - ax)/d/s, gy(a[i - 1]) - 6*(by - ay)/d/s, i + 1 - 6*(bx - ax)/d/s, gy(a[i]) + 6*(by - ay)/d/s, C.rise, 1.3); }
      for (i = 1; i <= NN; i++){ c.beginPath(); c.arc(X(i), Y(gy(a[i - 1])), 3.3, 0, 6.2832);
        if (j === 6 && i > 1){ c.strokeStyle = gris; c.lineWidth = 1.5; c.stroke(); } else { c.fillStyle = C.sec; c.fill(); } }
      T.L('P1', 0, gy(A1), -100, -7, 0); /* el valor de a₁, escrito en el eje, donde llega su punteada */
      if (j !== 6) T.L('S' + j, 6, gy(a[5]), -50, 0, a[5] < 0 ? 16 : -16);
      y = Y(gy(-33)) + 40;
      T.L('E' + j, -1.3, gy(-33), 0, 0, 40); txt(LN[0], X(-1.3), y + 23, 'left', C.ink); txt(LN[1], X(-1.3), y + 44, 'left', C.ink);
      dtQue(S, 'la razón r decide cómo se', 'comporta la progresión. Mueve r.');
      T.fin();
    },
    caption:function(v){ var j = jj(v), a = ter(j), LN = lin(j); return 'Con r = ' + dec((j - 6)/4) + (j === 6 ? ', los términos serían 4, 0, 0, 0, 0, 0. ' : ', el segundo término vale ' + ci21Pl(a[1]) + ' y el sexto, ' + ci21Pl(a[5]) + '. ') + LN[0] + ' ' + LN[1]; },
    readout:function(v){ var j = jj(v), r = raz(j), a = ter(j), num = OA.num, Q = '\\\\&\\qquad ', rs = ci21Tex(r), rp = ci21Par(r), L = [], n, s, U, V, inv, x, z;
      function coc(n){ x = a[n]; z = a[n - 1]; inv = z[0] < 0 ? [-z[1], -z[0]] : [z[1], z[0]]; U = ci21Cru(x[0]*inv[0], x[1]*inv[1]); V = ci21Tex([x[0]*inv[0], x[1]*inv[1]]);
        return '\\dfrac{a_{' + (n + 1) + '}}{a_{' + n + '}}=' + ci21Tex(x) + ':' + ci21Par(z) + '=' + ci21Tex(x) + '\\cdot' + (inv[0] < 0 ? '\\left(' + ci21Cru(inv[0], inv[1]) + '\\right)' : ci21Cru(inv[0], inv[1])) + Q + '\\qquad =' + U + (U === V ? '' : '=' + V) + '=r'; }
      if (j === 6){
        L.push('\\text{Datos: }a_{1}=4,\\qquad r=0\\quad\\text{(caso límite).}');
        L.push('\\text{Regla: cada término es el anterior por }r\\text{:}' + Q + 'a_{n+1}=a_{n}\\cdot r');
        L.push('\\text{Reemplazo:}' + Q + 'a_{2}=4\\cdot 0=0' + Q + 'a_{3}=0\\cdot 0=0' + Q + '\\text{y así: todos los que siguen valen }0\\text{.}');
        L.push('\\text{Cociente entre vecinos: }\\dfrac{a_{3}}{a_{2}}\\text{ sería }\\dfrac{0}{0}\\text{.}' + Q + '\\text{No se puede dividir por }0\\text{: no hay}' + Q + '\\text{cocientes, y por eso no hay flechas.}');
        L.push('\\text{Qué significa: la definición pide }r\\ne 0\\text{.}' + Q + '4,\\ 0,\\ 0,\\ 0,\\ \\ldots\\text{ no es una progresión}' + Q + '\\text{geométrica: no tiene razón.}');
        return dtPasos(L); }
      L.push('\\text{Datos: }a_{1}=4,\\qquad r=' + rs + (r[1] === 1 ? '' : '=' + num(r[0]/r[1], 2).replace(/0$/, '')));
      L.push('\\text{Regla: cada término es el anterior por }r\\text{:}' + Q + 'a_{n+1}=a_{n}\\cdot r');
      s = '\\text{Reemplazo, un producto cada vez:}';
      for (n = 1; n < NN; n++){ U = ci21Cru(a[n - 1][0]*r[0], a[n - 1][1]*r[1]); V = ci21Tex(a[n]);
        s += Q + 'a_{' + (n + 1) + '}=' + ci21Tex(a[n - 1]) + '\\cdot' + rp + '=' + U + (U === V ? '' : '=' + V); }
      if (a[5][1] !== 1) s += Q + 'a_{6}=' + ci21Tex(a[5]) + (10000*a[5][0] % a[5][1] === 0 ? '=' + num(a[5][0]/a[5][1], 4).replace(/0+$/, '') : '\\approx ' + num(a[5][0]/a[5][1], Math.abs(a[5][0]) < a[5][1] ? 4 : 2));
      L.push(s);
      L.push('\\text{Cociente entre vecinos (dividir es multiplicar}' + Q + '\\text{por el inverso):}' + Q + coc(1) + Q + coc(2));
      if (j > 10) s = 'r=' + rs + '>1\\text{, y los términos son positivos:}' + Q + 'a_{n+1}-a_{n}=a_{n}\\,(r-1)>0' + Q + '\\text{Qué significa: cada término es mayor que}' + Q + '\\text{el anterior. La progresión crece.}';
      else if (j === 10) s = 'r=1:\\quad a_{n+1}=a_{n}\\cdot 1=a_{n}' + Q + '\\text{Qué significa: todos los términos valen }4\\text{.}' + Q + '\\text{La progresión es constante.}';
      else if (j > 6) s = '0<r=' + rs + '<1\\text{, y los términos son positivos:}' + Q + 'a_{n+1}-a_{n}=a_{n}\\,(r-1)<0' + Q + '\\text{Qué significa: cada término es menor que}' + Q + '\\text{el anterior y sigue positivo. Decrece.}';
      else s = 'r=' + rs + '<0\\text{: multiplicar por }r\\text{ cambia el signo.}' + Q + '\\text{Qué significa: los signos se alternan; la}' + Q + '\\text{progresión ni crece ni decrece.}' + Q + '\\text{Sin el signo: }|a_{n+1}|=|a_{n}|\\cdot' + ci21Tex([-r[0], r[1]]) + Q + (j > 2 ? '\\text{Como }' + ci21Tex([-r[0], r[1]]) + '<1\\text{, los tamaños decrecen.}' : j === 2 ? '\\text{Los tamaños valen todos }4\\text{.}' : '\\text{Como }' + ci21Tex([-r[0], r[1]]) + '>1\\text{, los tamaños crecen.}');
      L.push(s);
      return dtPasos(L); }
  };
})());
