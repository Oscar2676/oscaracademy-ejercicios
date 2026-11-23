/* L25 H22 · término enésimo de una geométrica: desde a₁ se multiplica n − 1 veces por r; aₙ = a₁·rⁿ⁻¹ */
OA.scene('eng-idea', (function(){
  var N = 5, H = 538, A = [3, 6, 12, 24], X0 = 58, SC = 11.5, YR = [118, 164, 210, 256];
  var PZ = [['T1', 'a_{1}', 'a₁', 'c-sec'], ['T2', 'a_{2}', 'a₂', 'c-sec'], ['T3', 'a_{3}', 'a₃', 'c-sec'], ['T4', 'a_{4}', 'a₄', 'c-sec'],
    ['M1', '\\cdot 2', '· 2', 'diff'], ['M2', '\\cdot 2', '· 2', 'diff'], ['M3', '\\cdot 2', '· 2', 'diff'],
    ['E1', 'a_{1}=3', 'a₁ = 3', ''], ['E2', 'a_{2}=3\\cdot 2', 'a₂ = 3 · 2', ''],
    ['E3', 'a_{3}=3\\cdot 2\\cdot 2=3\\cdot 2^{2}', 'a₃ = 3 · 2 · 2 = 3 · 2²', ''],
    ['E4', 'a_{4}=3\\cdot 2\\cdot 2\\cdot 2=3\\cdot 2^{3}', 'a₄ = 3 · 2 · 2 · 2 = 3 · 2³', ''],
    ['B5', '\\text{posición }4:\\quad 4-1=3\\ \\text{multiplicaciones}', 'posición 4:  4 − 1 = 3 multiplicaciones', 'diff'],
    ['Q', '3,\\ 6,\\ 12,\\ 24,\\ \\ldots\\qquad a_{n}=\\ ?', '3, 6, 12, 24, …   aₙ = ?', 'pt'], ['F', '\\Longrightarrow\\ a_{n}=a_{1}\\cdot r^{\\,n-1}', '⟹ aₙ = a₁ · rⁿ⁻¹', 'diff'],
    ['R1', 'a_{1}=3', 'a₁ = 3', ''],
    ['R2', 'a_{2}=a_{1}\\cdot 2=3\\cdot 2=6', 'a₂ = a₁ · 2 = 3 · 2 = 6', ''],
    ['R3', 'a_{3}=a_{2}\\cdot 2=3\\cdot 2^{2}=3\\cdot 4=12', 'a₃ = a₂ · 2 = 3 · 2² = 3 · 4 = 12', ''],
    ['R4', 'a_{4}=a_{3}\\cdot 2=3\\cdot 2^{3}=3\\cdot 8=24', 'a₄ = a₃ · 2 = 3 · 2³ = 3 · 8 = 24', ''],
    ['R5', 'a_{n}=3\\cdot 2^{\\,n-1}', 'aₙ = 3 · 2ⁿ⁻¹', 'diff']];
  var TXT = [['El primer término vale 3.', 'Todavía no se multiplica por la razón.'],
    ['El segundo es el primero por 2.', 'Va una multiplicación por la razón.'],
    ['El tercero es el segundo por 2.', 'Van dos multiplicaciones por la razón.'],
    ['El cuarto es el tercero por 2.', 'Van tres multiplicaciones por la razón.'],
    ['Las multiplicaciones son la posición menos 1.', 'Al término n se llega con n − 1 de ellas.']];
  var VEZ = ['', '1 vez por 2', '2 veces por 2', '3 veces por 2'];
  return {
    world:{x0:0, x1:340, y0:0, y1:H}, aspect:H/340,
    aria:'Animación en cinco pasos con la sucesión 3, 6, 12, 24, dibujada con barras horizontales, una por fila. Arriba, una franja dice qué muestra: al término n se llega desde el primero con n menos 1 multiplicaciones por la razón r. Uno: aparece la barra del primer término, de largo 3. Dos: una flecha naranja rotulada por 2 baja a la segunda fila y aparece una barra de largo 6, partida en dos mitades iguales a la barra anterior; debajo queda escrito a sub 2 igual a 3 por 2, y en naranja, 1 vez por 2. Tres: otra flecha por 2 y una barra de largo 12; debajo, a sub 3 igual a 3 por 2 por 2, igual a 3 por 2 al cuadrado; 2 veces por 2. Cuatro: otra flecha por 2 y una barra de largo 24; debajo, a sub 4 igual a 3 por 2 por 2 por 2, igual a 3 por 2 al cubo; 3 veces por 2. Cinco: para la posición 4 hubo 4 menos 1, igual a 3 multiplicaciones; en general, a sub n es igual a a sub 1 por r elevado a n menos 1; la pregunta de arriba queda y la respuesta se escribe debajo. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos (el largo de la barra es su valor)</span><span><i class="sw rise"></i> las multiplicaciones por la razón, \\(2\\), y cuántas van</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', i, w, m = Math.min(k, 4), len, x1, yb;
      function X(x){ return S.X(x); } function Y(t){ return S.Y(H - t); }
      function txt(t, x, y, col, al){ c.font = '600 12.5px ' + F; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* barras: una por término; ninguna se borra */
      for (i = 1; i <= m; i++){ w = (i === k) ? u : 1; yb = YR[i - 1];
        len = i === 1 ? A[0]*w : A[i - 2]*(1 + w); x1 = X0 + SC*len;
        if (i > 1){ /* flecha «· 2» desde la fila anterior */
          c.globalAlpha = Math.min(1, w*3); dtFlecha(S, 34, H - (YR[i - 2] + 10), 34, H - (yb - 10), C.rise, 1.6); c.globalAlpha = 1;
          if (w > 0.3) L('M' + (i - 1), 39, H - (YR[i - 2] + 23), 0); }
        c.globalAlpha = i === 1 ? 1 : Math.min(1, 0.25 + w*3);
        S.poly([[X0, H - (yb - 7)], [x1, H - (yb - 7)], [x1, H - (yb + 7)], [X0, H - (yb + 7)]], {fill:C.sec, alpha:1});
        c.globalAlpha = 1;
        if (i > 1 && w > 0.15){ x1 = X0 + SC*A[i - 2]; c.strokeStyle = '#fff'; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.moveTo(X(x1), Y(yb - 7)); c.lineTo(X(x1), Y(yb + 7)); c.stroke(); }
        if (w > 0.85){ c.font = '700 11.5px ' + F; c.fillStyle = '#fff'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('' + A[i - 1], X(X0 + SC*A[i - 1]) - 5, Y(yb) + 0.5); }
        L('T' + i, 8, H - yb, 0);
        if (w > 0.6){ L('E' + i, 76, H - (yb + 22), 0); if (i > 1){ c.globalAlpha = Math.min(1, (w - 0.6)/0.3); txt(VEZ[i - 1], 332, yb + 22, C.rise, 'right'); c.globalAlpha = 1; } } }
      if (k === 5 && u > 0.3) L('B5', 8, H - 304, 0);
      L('Q', 8, H - 66, 0); if (k === N && u > 0.5) L('F', 8, H - 90, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], 8, 330); txt(TXT[k - 1][1], 8, 350);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(332), Y(66));
      dtQue(S, 'al término n se llega desde el primero', 'con n − 1 multiplicaciones por la razón r.');
      T.fin();
      oaReg(S, k, N, 8, H - 402, [6, 34, 62, 90, 118]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos: }3,\\ 6,\\ 12,\\ 24,\\ \\ldots\\qquad a_{1}=3' + Q + 'r=\\tfrac{6}{3}=2,\\quad \\tfrac{12}{6}=2,\\quad \\tfrac{24}{12}=2' + Q + '\\text{multiplicaciones hechas: }0',
      '\\text{1 multiplicación: }a_{2}=a_{1}\\cdot r=3\\cdot 2' + Q + '3\\cdot 2=6,\\qquad a_{2}=6',
      '\\text{2 multiplicaciones: }a_{3}=a_{2}\\cdot r=6\\cdot 2=12' + Q + '\\text{con }a_{2}=3\\cdot 2:\\quad a_{3}=3\\cdot 2\\cdot 2=3\\cdot 2^{2}' + Q + '2^{2}=2\\cdot 2=4,\\qquad 3\\cdot 4=12',
      '\\text{3 multiplicaciones: }a_{4}=a_{3}\\cdot r=12\\cdot 2=24' + Q + '\\text{con }a_{3}=3\\cdot 2^{2}:\\quad a_{4}=3\\cdot 2^{2}\\cdot 2=3\\cdot 2^{3}' + Q + '2^{3}=4\\cdot 2=8,\\qquad 3\\cdot 8=24',
      '\\text{multiplicaciones}=\\text{posición}-1:' + Q + '1=2-1,\\quad 2=3-1,\\quad 3=4-1' + Q + 'a_{n}=a_{1}\\cdot r^{\\,n-1}=3\\cdot 2^{\\,n-1}' + Q + '\\text{Al término }n\\text{ se llega con }n-1' + Q + '\\text{multiplicaciones por }r.'];
      return dtPasos(R.slice(0, k)); }
  };
})());

/* número ↔ figura: a₁ = 64, r = 1/2; al mover n se ve la cadena de n − 1 factores y la cuenta completa */
OA.scene('eng-vivo', (function(){
  var NN = 8, H = 362, A = [64, 32, 16, 8, 4, 2, 1, 0.5], VAL = ['64', '32', '16', '8', '4', '2', '1', '0,5'], j, f, PZ = [];
  for (j = 1; j <= NN; j++){ PZ.push(['P' + j, 'a_{' + j + '}', 'a' + ssSub(j), 'diff']);
    if (j < NN) PZ.push(['M' + j, '\\cdot\\tfrac{1}{2}', '· ½', 'diff']);
    f = j === 1 ? ['a_{1}=64\\quad\\text{(ninguna multiplicación)}', 'a₁ = 64  (ninguna multiplicación)'] : ['a_{' + j + '}=64' + new Array(j).join('\\cdot\\tfrac{1}{2}'), 'a' + ssSub(j) + ' = 64' + new Array(j).join(' · ½')];
    PZ.push(['C' + j, f[0], f[1], '']); }
  function gx(n){ return 44 + 32*n; } function gy(a){ return 232 - 2.5*a; }
  function nn(v){ return Math.max(1, Math.min(NN, Math.round(v.n || 1))); }
  function frase(n){ return n === 1 ? 'Posición 1: ninguna multiplicación por la razón.' : 'Posición ' + n + ': ' + (n - 1) + (n === 2 ? ' multiplicación' : ' multiplicaciones') + ' por la razón.'; }
  return {
    world:{x0:0, x1:340, y0:0, y1:H}, aspect:H/340,
    aria:'Arriba, una franja dice qué muestra: el término n es el primero multiplicado n menos 1 veces por la razón. Progresión geométrica de primer término 64 y razón un medio. Un deslizador elige la posición n, de 1 a 8. En la gráfica, en horizontal va n y en vertical el término: aparecen los puntos hasta la posición n, con valores 64, 32, 16, 8, 4, 2, 1 y 0,5; cada uno tiene una línea punteada hasta su valor en el eje vertical, y el de la posición elegida va en naranja, con su nombre y su valor marcado en el eje. Bajo la gráfica hay una fila de casillas con los valores, cada una bajo su posición; entre una casilla y la siguiente, una flecha naranja rotulada por un medio. Hay n menos 1 flechas. Más abajo queda escrito el término como 64 multiplicado por un medio tantas veces como flechas, y una frase dice cuántas multiplicaciones van. Con n igual a 1, caso límite, hay un solo punto, ninguna flecha y el término vale 64. Bajo el dibujo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'n', tex:'n', min:1, max:NN, step:1, value:4}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{n}=64\\cdot\\left(\\tfrac{1}{2}\\right)^{n-1}\\)</span><span><i class="sw rise"></i> el término elegido y las multiplicaciones por \\(\\tfrac{1}{2}\\)</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
    anim:{run:24000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(NN, 1 + Math.floor(p*NN)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = nn(v), C = S.C, c = S.ctx, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, y, act, gw, xa, xb, bw, bh;
      function X(x){ return S.X(x); } function Y(t){ return S.Y(H - t); }
      function num(t, px, py, al, col, b){ c.font = (b ? '700 11.5px ' : '500 10.5px ') + F; c.fillStyle = col || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* ejes */
      S.line(38, H - 232, 318, H - 232, {color:C.ink, width:1.1}); S.line(44, H - 236, 44, H - 64, {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NN; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(232) - 3); c.lineTo(X(gx(i)), Y(232) + 3); c.stroke(); num('' + i, X(gx(i)), Y(232) + 12, 'center', i === n ? C.rise : null, i === n); }
      for (y = 16; y <= 64; y += 16){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(44) - 3, Y(gy(y))); c.lineTo(X(44) + 3, Y(gy(y))); c.stroke(); if (Math.abs(Y(gy(y)) - Y(gy(A[n - 1]))) >= 12 || y === A[n - 1]) { if (y !== A[n - 1]) num('' + y, X(44) - 8, Y(gy(y)), 'right'); } }
      num('n', X(318) + 5, Y(232), 'left'); num('aₙ', X(44), Y(57), 'center');
      /* términos hasta n: tallo tenue, punteada al eje y punto */
      for (i = 1; i <= n; i++){ act = i === n;
        c.strokeStyle = 'rgba(31,93,134,0.25)'; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); c.moveTo(X(gx(i)), Y(232)); c.lineTo(X(gx(i)), Y(gy(A[i - 1]))); c.stroke();
        c.globalAlpha = act ? 1 : 0.5; c.strokeStyle = act ? C.rise : C.sec; c.lineWidth = act ? 1.1 : 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(A[i - 1]))); c.lineTo(X(44), Y(gy(A[i - 1]))); c.stroke(); c.setLineDash([]);
        c.beginPath(); c.arc(X(44), Y(gy(A[i - 1])), act ? 2.6 : 2, 0, 6.2832); c.fillStyle = act ? C.rise : C.sec; c.fill(); c.globalAlpha = 1; }
      for (i = 1; i <= n; i++){ act = i === n; c.beginPath(); c.arc(X(gx(i)), Y(gy(A[i - 1])), act ? 4 : 3.2, 0, 6.2832); c.fillStyle = act ? C.rise : C.sec; c.fill(); }
      /* valor del término elegido, marcado en el eje */
      c.font = '700 11.5px ' + F; gw = c.measureText(VAL[n - 1]).width; c.fillStyle = '#fff'; c.fillRect(X(44) - 10 - gw, Y(gy(A[n - 1])) - 7, gw + 4, 14);
      c.fillStyle = C.rise; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(VAL[n - 1], X(44) - 8, Y(gy(A[n - 1])));
      T.L('P' + n, gx(n) + 7, H - (gy(A[n - 1]) - 11), 0);
      /* fila de casillas con los valores y flechas «· ½» entre ellas */
      bw = (X(26) - X(0))/2; bh = 9;
      for (i = 1; i <= n; i++){ act = i === n; c.fillStyle = act ? C.rise : 'rgba(31,93,134,0.10)'; c.fillRect(X(gx(i)) - bw, Y(297) - bh, 2*bw, 2*bh);
        c.strokeStyle = act ? C.rise : C.sec; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(X(gx(i)) - bw, Y(297) - bh, 2*bw, 2*bh);
        num(VAL[i - 1], X(gx(i)), Y(297) + 0.5, 'center', act ? '#fff' : C.ink, 1);
        if (i < n){ xa = X(gx(i) + 5); xb = X(gx(i + 1) - 5); y = Y(297) - bh - 3;
          c.strokeStyle = C.rise; c.lineWidth = 1.5; c.beginPath(); c.moveTo(xa, y); c.quadraticCurveTo((xa + xb)/2, y - 13, xb, y); c.stroke();
          c.fillStyle = C.rise; c.beginPath(); c.moveTo(xb + 1, y + 1); c.lineTo(xb - 7, y - 3); c.lineTo(xb - 2, y - 9); c.closePath(); c.fill();
          T.L('M' + i, gx(i) + 16, H - 297, -50, 0, -bh - 22); } }
      T.L('C' + n, 8, H - 324, 0);
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(frase(n), X(8), Y(347));
      dtQue(S, 'el término n es el primero multiplicado', 'n − 1 veces por la razón. Mueve n.');
      T.fin();
    },
    caption:function(v){ var n = nn(v); return 'Con n = ' + n + ', el término vale ' + VAL[n - 1] + ': ' + (n === 1 ? 'es el primero, sin ninguna multiplicación' : 'es 64 multiplicado ' + (n - 1) + (n === 2 ? ' vez' : ' veces') + ' por un medio') + '. Con n = 1 no hay multiplicaciones y el término vale 64'; },
    readout:function(v){ var n = nn(v), k = n - 1, p = Math.pow(2, k), Q = '\\\\&\\qquad ', h = '\\tfrac{1}{2}', P = '\\left(' + h + '\\right)', res, L;
      res = k <= 6 ? '' + (64/p) : '\\tfrac{1}{2}=0{,}5';
      L = ['\\text{Datos: }a_{1}=64,\\quad r=' + h + ',\\quad n=' + n,
        '\\text{Fórmula: }a_{n}=a_{1}\\cdot r^{\\,n-1}',
        '\\text{Reemplazo: }a_{' + n + '}=64\\cdot' + P + '^{' + n + '-1}' + Q + '\\text{exponente: }' + n + '-1=' + k + (k === 0 ? '\\ \\text{(ninguna multiplicación)}' : k === 1 ? '\\ \\text{(una multiplicación)}' : '\\ \\text{(multiplicaciones)}')];
      if (k === 0){ L.push('\\text{Potencia: }' + P + '^{0}=1\\ \\ \\text{(exponente cero)}'); L.push('\\text{Producto: }a_{1}=64\\cdot 1=64'); L.push('\\text{Caso límite: sin multiplicar,}' + Q + '\\text{el término es el primero, }64.'); }
      else if (k === 1){ L.push('\\text{Potencia: }' + P + '^{1}=' + h); L.push('\\text{Producto: }a_{2}=64\\cdot' + h + '=\\tfrac{64}{2}=32'); L.push('\\text{Qué significa: desde }64\\text{ se multiplica}' + Q + '1\\text{ vez por }' + h + '\\text{: queda la mitad, }32.'); }
      else { L.push('\\text{Potencia: }' + P + '^{' + k + '}=' + new Array(k + 1).join(h + '\\cdot').slice(0, -5) + Q + '\\text{denominador: }' + new Array(k + 1).join('2\\cdot ').slice(0, -6) + '=' + p + Q + P + '^{' + k + '}=\\tfrac{1}{' + p + '}');
        L.push('\\text{Producto: }a_{' + n + '}=64\\cdot\\tfrac{1}{' + p + '}=\\tfrac{64}{' + p + '}' + Q + (k <= 6 ? '64:' + p + '=' + (64/p) + ',\\qquad a_{' + n + '}=' + (64/p) : '\\text{se simplifica por }64:\\quad 128:64=2' + Q + 'a_{8}=' + res));
        L.push('\\text{Qué significa: desde }64\\text{ se multiplica}' + Q + k + '\\text{ veces por }' + h + '\\text{; cada vez queda la mitad.}'); }
      return dtPasos(L); }
  };
})());
