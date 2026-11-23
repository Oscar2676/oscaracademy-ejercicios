/* L25 H19 · criterio del cociente: en Σ n/2ⁿ los cocientes aₙ₊₁/aₙ se acercan a L = 1/2 < 1; con r = 3/4, desde n = 2 los términos quedan bajo una geométrica de razón r, y las sumas parciales quedan acotadas */
function ci19Seg(S, x0, y0, x1, y1, col, wd, dash, al){ var c = S.ctx; c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(S.X(x0), S.Y(y0)); c.lineTo(S.X(x1), S.Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
function ci19Mcd(a, b){ while (b){ var t = a % b; a = b; b = t; } return a; }
function ci19Fr(a, b, t){ var g = ci19Mcd(a, b); a /= g; b /= g; return b === 1 ? '' + a : '\\' + (t ? 't' : 'd') + 'frac{' + a + '}{' + b + '}'; }
function ci19Pl(a, b){ var g = ci19Mcd(a, b); a /= g; b /= g; return b === 1 ? '' + a : a + '/' + b; }
OA.scene('coc-idea', (function(){
  var N = 5, NP = 6, A = [1/2, 1/2, 3/8, 1/4, 5/32, 3/32], CQ = [1, 3/4, 2/3, 5/8, 3/5], VL = [0, 0, 1, 2, 3, 4];
  var PZ = [['V0', '\\tfrac{1}{2}', '1/2', 'c-sec'], ['V1', '\\tfrac{3}{8}', '3/8', 'c-sec'], ['V2', '\\tfrac{1}{4}', '1/4', 'c-sec'], ['V3', '\\tfrac{5}{32}', '5/32', 'c-sec'], ['V4', '\\tfrac{3}{32}', '3/32', 'c-sec'],
    ['C1', '1', '1', 'diff'], ['C2', '\\tfrac{3}{4}', '3/4', 'diff'], ['C3', '\\tfrac{2}{3}', '2/3', 'diff'], ['C4', '\\tfrac{5}{8}', '5/8', 'diff'], ['C5', '\\tfrac{3}{5}', '3/5', 'diff'],
    ['YB', '\\tfrac{a_{n+1}}{a_{n}}', 'aₙ₊₁/aₙ', 'diff'], ['LL', 'L=\\tfrac{1}{2}', 'L = 1/2', 'c-tan'], ['LR', 'r=\\tfrac{3}{4}', 'r = 3/4', 'c-alt'],
    ['G', '\\tfrac{1}{2}\\left(\\tfrac{3}{4}\\right)^{n-2}', '(1/2)·(3/4)ⁿ⁻²', 'c-alt'], ['B5', 'S_{n}\\le\\tfrac{1}{2}+2=\\tfrac{5}{2}', 'Sₙ ≤ 1/2 + 2 = 5/2', 'c-alt'],
    ['Q', '\\tfrac{1}{2}+\\tfrac{2}{4}+\\tfrac{3}{8}+\\tfrac{4}{16}+\\cdots\\quad\\text{¿converge?}', '1/2 + 2/4 + 3/8 + 4/16 + … ¿converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí converge: }L=\\tfrac{1}{2}<1', '⟹ sí converge: L = 1/2 < 1', 'diff'],
    ['R1', 'a_{n}=\\tfrac{n}{2^{n}}:\\quad\\tfrac{1}{2},\\ \\tfrac{1}{2},\\ \\tfrac{3}{8},\\ \\tfrac{1}{4},\\ \\tfrac{5}{32},\\ \\tfrac{3}{32}', 'aₙ = n/2ⁿ: 1/2, 1/2, 3/8, 1/4, 5/32, 3/32', ''],
    ['R2', '\\tfrac{a_{n+1}}{a_{n}}=\\tfrac{n+1}{2n}:\\quad 1,\\ \\tfrac{3}{4},\\ \\tfrac{2}{3},\\ \\tfrac{5}{8},\\ \\tfrac{3}{5}', 'aₙ₊₁/aₙ = (n+1)/(2n): 1, 3/4, 2/3, 5/8, 3/5', ''],
    ['R3', 'L=\\lim\\tfrac{n+1}{2n}=\\tfrac{1}{2}<1;\\quad r=\\tfrac{3}{4}', 'L = lím (n+1)/(2n) = 1/2 < 1; r = 3/4', ''],
    ['R4', 'n\\ge 2:\\ a_{n+1}\\le\\tfrac{3}{4}a_{n}\\ \\Rightarrow\\ a_{2+k}\\le\\tfrac{1}{2}\\left(\\tfrac{3}{4}\\right)^{k}', 'n ≥ 2: aₙ₊₁ ≤ (3/4)aₙ ⟹ a₂₊ₖ ≤ (1/2)(3/4)ᵏ', ''],
    ['R5', 'S_{n}\\le\\tfrac{1}{2}+\\tfrac{1/2}{1-3/4}=\\tfrac{5}{2}\\ \\Longrightarrow\\ \\text{converge}', 'Sₙ ≤ 1/2 + (1/2)/(1 − 3/4) = 5/2 ⟹ converge', 'diff']];
  var TXT = [['Arriba, los términos: cada punto azul, con', 'su punteada hasta su valor en el eje.'],
    ['Abajo, en naranja, los cocientes: cada', 'término dividido por el anterior.'],
    ['Los cocientes se acercan a L (burdeo). Desde', 'el segundo, ninguno pasa de r (verde).'],
    ['Curva verde: una geométrica de razón r.', 'Desde el segundo, tapa a los términos.'],
    ['Esa geométrica suma un número finito y acota', 'las sumas parciales: la serie converge.']];
  function gx(n){ return -0.6 + 0.8*n; } function ya(y){ return 6.9 + 6.2*y; } function yb(y){ return 3.8 + 3.5*(y - 0.4); }
  function cota(n){ return 0.5*Math.pow(0.75, n - 2); }
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.1, y1:12.4}, aspect:13.5/6.6,
    aria:'Arriba, una franja dice qué muestra: si los cocientes se acercan a un número menor que 1, una geométrica acota los términos. Animación en cinco pasos sobre la serie de término n dividido por 2 elevado a n, con dos gráficas, una sobre la otra. Uno: en la gráfica de arriba aparecen seis puntos azules, los términos primero a sexto: un medio, un medio, tres octavos, un cuarto, cinco treintaidosavos y tres treintaidosavos; una línea punteada lleva cada punto hasta su valor, escrito en el eje vertical. Dos: en la gráfica de abajo aparecen cinco puntos naranjas, los cocientes entre cada término y el anterior, con su valor encima: 1, tres cuartos, dos tercios, cinco octavos y tres quintos; el eje vertical de esta gráfica empieza en 0,4. Tres: en la gráfica de abajo se trazan tres líneas horizontales: una gris a la altura 1, una verde a la altura r igual a tres cuartos y una burdeo a la altura L igual a un medio, el límite de los cocientes; desde el segundo punto naranja ninguno queda sobre la línea verde. Cuatro: en la gráfica de arriba se dibuja una curva verde con anillos, la cota geométrica un medio por tres cuartos elevado a n menos 2, desde n igual a 2; cada punto azul desde el segundo queda en la curva o debajo de ella. Cinco: se sombrea la zona bajo la curva verde y se escribe la cota de las sumas parciales: menor o igual que un medio más 2, igual a cinco medios. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, sí converge porque L es un medio, menor que 1, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> términos \\(a_{n}=\\tfrac{n}{2^{n}}\\)</span><span><i class="sw rise"></i> cocientes \\(\\tfrac{a_{n+1}}{a_{n}}\\)</span><span><i class="sw tan"></i> \\(L=\\tfrac{1}{2}\\), límite de los cocientes</span><span><i class="sw alt"></i> \\(r=\\tfrac{3}{4}\\) y la cota geométrica de razón \\(r\\)</span><span>líneas punteadas: llevan cada punto a su valor en el eje</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, e, t, pts, xr = 4.3;
      function txt(tx, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(tx, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      /* paso 5: zona bajo la cota geométrica (su suma es finita) */
      if (k === 5){ pts = [[gx(2), ya(0)]]; for (i = 0; i <= 40; i++){ t = 2 + 4.3*i/40; pts.push([gx(t), ya(cota(t))]); } pts.push([gx(6.3), ya(0)]); S.poly(pts, {fill:C.alt, alpha:0.14*u}); }
      /* gráfica de arriba: ejes */
      S.line(gx(0), ya(0), gx(6.6), ya(0), {color:C.ink, width:1.1}); S.line(gx(0), ya(0), gx(0), ya(0.55), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(ya(0)) - 3); c.lineTo(X(gx(i)), Y(ya(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(ya(0)) + 11, 'center'); }
      num('n', X(gx(6.6)) + 6, Y(ya(0)), 'left'); num('aₙ (términos)', X(gx(0)) + 6, Y(ya(0.55)) - 2, 'left'); num('0', X(gx(0)) - 7, Y(ya(0)), 'right');
      /* gráfica de abajo: ejes (el vertical empieza en 0,4) */
      S.line(gx(0), yb(0.4), gx(5.6), yb(0.4), {color:C.ink, width:1.1}); S.line(gx(0), yb(0.4), gx(0), yb(1.08), {color:C.ink, width:1.1});
      for (i = 1; i <= 5; i++){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(gx(i)), Y(yb(0.4)) - 3); c.lineTo(X(gx(i)), Y(yb(0.4)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(yb(0.4)) + 11, 'center'); }
      [[0.4, '0,4'], [0.5, '0,5'], [0.75, '0,75'], [1, '1']].forEach(function(q){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(yb(q[0]))); c.lineTo(X(gx(0)) + 3, Y(yb(q[0]))); c.stroke(); num(q[1], X(gx(0)) - 7, Y(yb(q[0])), 'right'); });
      num('n', X(gx(5.6)) + 6, Y(yb(0.4)), 'left'); L('YB', gx(0), yb(1.08), 0, 7, -2);
      /* paso 3 en adelante: líneas 1 (gris), r (verde) y L (burdeo) en la gráfica de abajo */
      if (k >= 3){ w = k === 3 ? u : 1; e = gx(0) + (xr - gx(0))*w;
        ci19Seg(S, gx(0), yb(1), e, yb(1), C.muted || '#6b6b6b', 1.1, [5, 4], 0.9); ci19Seg(S, gx(0), yb(0.75), e, yb(0.75), C.alt, 1.5); ci19Seg(S, gx(0), yb(0.5), e, yb(0.5), C.tan, 1.5, [5, 4]);
        if (w > 0.9){ L('LR', xr, yb(0.75), 0, 5, 0); L('LL', xr, yb(0.5), 0, 5, 0); num('1 (se compara con L)', X(xr) - 2, Y(yb(1)) - 9, 'right'); } }
      /* paso 4 en adelante: cota geométrica de razón r, desde n = 2 */
      if (k >= 4){ w = k === 4 ? u : 1; c.strokeStyle = C.alt; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath();
        for (i = 0; i <= 60; i++){ t = 2 + 4.3*w*i/60; if (i) c.lineTo(X(gx(t)), Y(ya(cota(t)))); else c.moveTo(X(gx(t)), Y(ya(cota(t)))); } c.stroke();
        for (i = 2; i <= NP; i++) if (2 + 4.3*w >= i){ c.beginPath(); c.arc(X(gx(i)), Y(ya(cota(i))), 5.2, 0, 6.2832); c.strokeStyle = C.alt; c.lineWidth = 1.5; c.stroke(); }
        if (w > 0.6) L('G', gx(3.45), ya(0.385), 0, 0, 0); }
      /* términos: puntos azules con su punteada hasta el valor en el eje */
      for (i = 1; i <= NP; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*NP - (i - 1))) : 1; if (w <= 0) continue;
        ci19Seg(S, gx(i), ya(A[i - 1]), gx(i) - (gx(i) - gx(0))*w, ya(A[i - 1]), C.sec, 0.9, [3, 3], 0.55);
        ci19Seg(S, gx(i), ya(0), gx(i), ya(A[i - 1]), C.sec, 1, null, 0.3*w);
        c.globalAlpha = w; c.beginPath(); c.arc(X(gx(i)), Y(ya(A[i - 1])), 3.3, 0, 6.2832); c.fillStyle = C.sec; c.fill(); c.globalAlpha = 1;
        if (w >= 1){ c.beginPath(); c.arc(X(gx(0)), Y(ya(A[i - 1])), 2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); L('V' + VL[i - 1], gx(0), ya(A[i - 1]), -100, -6, 0); } }
      /* paso 2 en adelante: cocientes, puntos naranjas con su valor encima */
      if (k >= 2) for (i = 1; i <= 5; i++){ w = k === 2 ? Math.max(0, Math.min(1, u*5 - (i - 1))) : 1; if (w <= 0) continue;
        ci19Seg(S, gx(i), yb(CQ[i - 1]), gx(i) - (gx(i) - gx(0))*w, yb(CQ[i - 1]), C.rise, 0.9, [3, 3], 0.5);
        c.globalAlpha = w; c.beginPath(); c.arc(X(gx(i)), Y(yb(CQ[i - 1])), 3.3, 0, 6.2832); c.fillStyle = C.rise; c.fill(); c.globalAlpha = 1;
        if (w >= 1){ if (i <= 2) L('C' + i, gx(i), yb(CQ[i - 1]), -50, 0, -15); else L('C' + i, gx(i), yb(CQ[i - 1]), 0, 7, 0); } }
      /* paso 5: cota de las sumas parciales */
      if (k === 5 && u > 0.5) L('B5', 5.2, ya(0.5), -100, 0, 0);
      L('Q', -1.2, 11.1, 0); if (k === N && u > 0.5) L('F', -1.2, 10.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 3.0); txt(TXT[k - 1][1], -1.2, 3.0 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(11.1));
      dtQue(S, 'si los cocientes se acercan a un número', 'menor que 1, una geométrica acota los términos.');
      T.fin();
      oaReg(S, k, N, -1.2, 1.7, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, p34 = function(e){ return '\\left(' + f(3, 4) + '\\right)^{' + e + '}'; }, R = [
      '\\text{Serie: }\\displaystyle\\sum_{n=1}^{\\infty}' + f('n', '2^{n}') + '=' + f(1, 2) + '+' + f(2, 4) + '+' + f(3, 8) + '+' + f(4, 16) + '+\\cdots' + Q + '\\text{Término general: }a_{n}=' + f('n', '2^{n}') + '\\text{, positivo.}' + Q + '\\text{Cada término (puntos azules):}'
        + Q + 'a_{1}=' + f(1, '2^{1}') + '=' + f(1, 2) + Q + 'a_{2}=' + f(2, '2^{2}') + '=' + f(2, 4) + '=' + f(1, 2) + Q + 'a_{3}=' + f(3, '2^{3}') + '=' + f(3, 8) + Q + 'a_{4}=' + f(4, '2^{4}') + '=' + f(4, 16) + '=' + f(1, 4) + Q + 'a_{5}=' + f(5, '2^{5}') + '=' + f(5, 32) + Q + 'a_{6}=' + f(6, '2^{6}') + '=' + f(6, 64) + '=' + f(3, 32),
      '\\text{Cociente: el término que sigue, dividido}' + Q + '\\text{por el término. Dividir es multiplicar}' + Q + '\\text{por el inverso:}' + Q + f('a_{n+1}', 'a_{n}') + '=' + f('n+1', '2^{\\,n+1}') + '\\cdot' + f('2^{n}', 'n') + Q + '\\text{Como }2^{\\,n+1}=2\\cdot 2^{n}\\text{, se simplifica }2^{n}\\text{:}' + Q + f('a_{n+1}', 'a_{n}') + '=' + f('n+1', '2n')
        + Q + '\\text{Reemplazo (puntos naranjas):}' + Q + 'n=1:\\ ' + f('1+1', '2\\cdot 1') + '=' + f(2, 2) + '=1' + Q + 'n=2:\\ ' + f('2+1', '2\\cdot 2') + '=' + f(3, 4) + Q + 'n=3:\\ ' + f('3+1', '2\\cdot 3') + '=' + f(4, 6) + '=' + f(2, 3) + Q + 'n=4:\\ ' + f('4+1', '2\\cdot 4') + '=' + f(5, 8) + Q + 'n=5:\\ ' + f('5+1', '2\\cdot 5') + '=' + f(6, 10) + '=' + f(3, 5)
        + Q + '\\text{Comprobación con los términos, }n=2\\text{:}' + Q + f('a_{3}', 'a_{2}') + '=' + f(3, 8) + ':' + f(1, 2) + '=' + f(3, 8) + '\\cdot 2=' + f(6, 8) + '=' + f(3, 4),
      '\\text{Se separa la fracción:}' + Q + f('n+1', '2n') + '=' + f('n', '2n') + '+' + f(1, '2n') + '=' + f(1, 2) + '+' + f(1, 2) + '\\cdot' + f(1, 'n') + Q + '\\text{Al crecer }n\\text{, }' + f(1, 'n') + '\\text{ tiene límite }0\\text{:}' + Q + 'L=\\displaystyle\\lim_{n\\to\\infty}' + f('a_{n+1}', 'a_{n}') + '=' + f(1, 2) + '+' + f(1, 2) + '\\cdot 0=' + f(1, 2)
        + Q + 'L=' + f(1, 2) + '<1\\quad\\text{(línea burdeo).}' + Q + '\\text{Se elige }r\\text{ entre }L\\text{ y }1\\text{ (línea verde):}' + Q + 'r=' + f(3, 4) + ',\\qquad ' + f(1, 2) + '<' + f(3, 4) + '<1' + Q + '\\text{¿Desde qué }n\\text{ el cociente no pasa de }r\\text{?}' + Q + f(1, 2) + '+' + f(1, '2n') + '\\le' + f(3, 4)
        + Q + '\\text{Se resta }' + f(1, 2) + '\\text{ a cada lado:}' + Q + f(1, '2n') + '\\le' + f(3, 4) + '-' + f(2, 4) + '=' + f(1, 4) + Q + '\\text{Se invierte (son positivos):}\\quad 2n\\ge 4' + Q + '\\text{Se divide por }2\\text{:}\\quad n\\ge 2',
      '\\text{Para }n\\ge 2\\text{:}\\quad ' + f('a_{n+1}', 'a_{n}') + '\\le' + f(3, 4) + Q + '\\text{Se multiplica por }a_{n}>0\\text{:}\\quad a_{n+1}\\le' + f(3, 4) + '\\,a_{n}' + Q + '\\text{Se encadena desde }a_{2}=' + f(1, 2) + '\\text{:}' + Q + 'a_{3}\\le' + f(3, 4) + '\\,a_{2}' + Q + 'a_{4}\\le' + f(3, 4) + '\\,a_{3}\\le' + p34(2) + 'a_{2}'
        + Q + '\\text{y así: }a_{2+k}\\le' + f(1, 2) + p34('k') + Q + '\\text{Es la curva verde: }' + f(1, 2) + p34('n-2') + Q + '\\text{Cota (anillo verde) y término (punto azul):}'
        + Q + 'k=1:\\ ' + f(1, 2) + '\\cdot' + f(3, 4) + '=' + f(3, 8) + Q + '\\qquad a_{3}=' + f(3, 8) + '\\le' + f(3, 8) + Q + 'k=2:\\ ' + f(1, 2) + '\\cdot' + f(9, 16) + '=' + f(9, 32) + Q + '\\qquad a_{4}=' + f(1, 4) + '=' + f(8, 32) + '\\le' + f(9, 32)
        + Q + 'k=3:\\ ' + f(1, 2) + '\\cdot' + f(27, 64) + '=' + f(27, 128) + Q + '\\qquad a_{5}=' + f(5, 32) + '=' + f(20, 128) + '\\le' + f(27, 128) + Q + 'k=4:\\ ' + f(1, 2) + '\\cdot' + f(81, 256) + '=' + f(81, 512) + Q + '\\qquad a_{6}=' + f(3, 32) + '=' + f(48, 512) + '\\le' + f(81, 512),
      '\\text{Suma parcial, con }n\\ge 2\\text{:}' + Q + 'S_{n}=\\displaystyle\\sum_{j=1}^{n}a_{j}=a_{1}+(a_{2}+a_{3}+\\cdots+a_{n})' + Q + '\\text{Desde }a_{2}\\text{, cada término no pasa de su cota:}' + Q + 'S_{n}\\le' + f(1, 2) + '+\\displaystyle\\sum_{k=0}^{n-2}' + f(1, 2) + p34('k')
        + Q + '\\text{Esa suma es la suma parcial de una serie}' + Q + '\\text{geométrica: primer término }' + f(1, 2) + '\\text{, razón }' + f(3, 4) + Q + '\\text{y }n-1\\text{ términos (hoja «Series}' + Q + '\\text{geométricas infinitas»):}' + Q + '\\displaystyle\\sum_{k=0}^{n-2}' + f(1, 2) + p34('k') + '=' + f('\\frac{1}{2}\\left(1-\\left(\\frac{3}{4}\\right)^{n-1}\\right)', '1-\\frac{3}{4}')
        + Q + '\\text{Como }1-' + p34('n-1') + '<1\\text{, no pasa de}' + Q + f('\\frac{1}{2}', '1-\\frac{3}{4}') + Q + '\\text{Se resta: }1-' + f(3, 4) + '=' + f(4, 4) + '-' + f(3, 4) + '=' + f(1, 4) + Q + '\\text{Se divide: }' + f(1, 2) + ':' + f(1, 4) + '=' + f(1, 2) + '\\cdot 4=' + f(4, 2) + '=2'
        + Q + 'S_{n}\\le' + f(1, 2) + '+2=' + f(1, 2) + '+' + f(4, 2) + '=' + f(5, 2) + Q + '\\text{(También }S_{1}=' + f(1, 2) + '\\le' + f(5, 2) + '\\text{.)}' + Q + '\\text{Las }S_{n}\\text{ crecen, porque se suman}' + Q + '\\text{positivos, y ninguna pasa de }' + f(5, 2) + '\\text{:}' + Q + '\\text{tienen límite. La serie converge.}'
        + Q + '\\text{Comprobación con }n=6\\text{:}' + Q + 'S_{6}=' + f(1, 2) + '+' + f(1, 2) + '+' + f(3, 8) + '+' + f(1, 4) + '+' + f(5, 32) + '+' + f(3, 32) + Q + '\\phantom{S_{6}}=' + f('16+16+12+8+5+3', 32) + '=' + f(60, 32) + '=' + f(15, 8)
        + Q + f(15, 8) + '=1{,}875\\le 2{,}5=' + f(5, 2)];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: en Σ n·xⁿ el cociente es x(n + 1)/n y su límite es L = x; al mover x, la línea L cruza el 1 y la serie pasa de converger a divergir */
OA.scene('coc-vivo', (function(){
  var NN = 8, j, PZ = [['YC', '\\tfrac{a_{n+1}}{a_{n}}', 'aₙ₊₁/aₙ', 'diff']];
  for (j = 1; j <= 6; j++){ PZ.push(['LJ' + j, 'L=' + ci19Fr(j, 4, 1), 'L = ' + ci19Pl(j, 4), 'c-tan']); PZ.push(['KA' + j, ci19Fr(2*j, 4, 1), ci19Pl(2*j, 4), 'diff']); PZ.push(['KB' + j, ci19Fr(9*j, 32, 1), ci19Pl(9*j, 32), 'diff']); }
  function gx(n){ return -0.75 + 0.6*n; } function y1(y){ return 5.2 + 0.8*y; } function y2(y){ return 2.0 + 0.8*y; }
  function jj(v){ return Math.max(0, Math.min(6, Math.round((v.x == null ? 0.5 : v.x)*4))); }
  function dec(x){ return oaDec(x, 2).replace(/0$/, '').replace(/,0$/, ''); }
  function lin(j){ var x = dec(j/4);
    if (j === 0) return ['todos los términos son 0: no hay cocientes', 'el criterio no se puede aplicar', 'la suma es 0: converge sin usar el criterio'];
    if (j < 4) return ['los cocientes bajan hacia ' + x + ' (línea burdeo)', x + ' es menor que 1: la serie converge', 'los términos terminan bajando hacia 0'];
    if (j === 4) return ['los cocientes bajan hacia 1 (línea burdeo)', 'el límite es 1: el criterio no decide', 'aquí los términos crecen: la serie diverge'];
    return ['los cocientes bajan hacia ' + x + ' (línea burdeo)', x + ' es mayor que 1: la serie diverge', 'los términos crecen y se salen de la gráfica']; }
  return {
    world:{x0:-1.3, x1:5.3, y0:0.15, y1:9.4}, aspect:9.25/6.6,
    aria:'Arriba, una franja dice qué muestra: el límite L de los cocientes, comparado con 1, decide si la serie converge. La serie es la suma de n por x elevado a n. Un deslizador elige x entre 0 y 1,5, de 0,25 en 0,25. Hay dos gráficas, una sobre la otra. En la de arriba, ocho puntos naranjas son los cocientes entre cada término y el anterior, que valen x por n más 1 dividido por n; el primero y el último llevan su valor; bajan hacia una línea horizontal burdeo, rotulada L, que está a la altura x. Una línea gris marca la altura 1 y la zona sobre ella está sombreada: si L cae ahí, la serie diverge. En la gráfica de abajo, ocho puntos azules son los términos n por x elevado a n, cada uno con una punteada hasta el eje vertical; los que pasan de 3 se indican con una flecha azul en el borde superior. Con x menor que 1 la línea burdeo queda bajo la gris y los términos terminan bajando hacia 0; con x igual a 1 las dos líneas coinciden y el criterio no decide; con x mayor que 1 la burdeo queda sobre la gris y los términos crecen. Con x igual a 0, caso límite, todos los términos son 0 y no hay cocientes. Bajo las gráficas, tres frases dicen a qué número se acercan los cocientes, qué se concluye y qué hacen los términos; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'x', tex:'x', min:0, max:1.5, step:0.25, value:0.5}],
    legend:'<span><i class="sw rise"></i> cocientes \\(\\tfrac{a_{n+1}}{a_{n}}=x\\cdot\\tfrac{n+1}{n}\\); zona sombreada: mayores que \\(1\\)</span><span><i class="sw tan"></i> \\(L=x\\), límite de los cocientes</span><span><i class="sw sec"></i> términos \\(a_{n}=n\\,x^{n}\\); flechas: términos mayores que \\(3\\)</span><span>líneas punteadas: llevan cada punto a su valor en el eje</span>',
    anim:{run:28000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = Math.min(6, Math.floor(p*7))/4; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = jj(v), x = j/4, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', n, q, a, xr = 4.4, LN = lin(j), y;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* gráfica de arriba: zona de valores mayores que 1 */
      S.poly([[gx(0), y1(1)], [xr, y1(1)], [xr, y1(3)], [gx(0), y1(3)]], {fill:C.rise, alpha:0.08});
      c.font = '600 11px ' + F; c.fillStyle = C.rise; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('si L cae en esta zona: diverge', X(xr) - 4, Y(y1(2.75)));
      /* ejes de las dos gráficas */
      [y1, y2].forEach(function(yy, m){ S.line(gx(0), yy(0), xr, yy(0), {color:C.ink, width:1.1}); S.line(gx(0), yy(0), gx(0), yy(3.35), {color:C.ink, width:1.1}); c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
        for (n = 1; n <= NN; n++){ c.beginPath(); c.moveTo(X(gx(n)), Y(yy(0)) - 3); c.lineTo(X(gx(n)), Y(yy(0)) + 3); c.stroke(); num('' + n, X(gx(n)), Y(yy(0)) + 11, 'center'); }
        for (n = 0; n <= 3; n++){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(yy(n))); c.lineTo(X(gx(0)) + 3, Y(yy(n))); c.stroke(); num('' + n, X(gx(0)) - 7, Y(yy(n)), 'right'); }
        num('n', X(xr) + 6, Y(yy(0)), 'left'); if (m) num('aₙ (términos)', X(gx(0)) + 6, Y(yy(3.35)) - 1, 'left'); });
      T.L('YC', gx(0), y1(3.35), 0, 7, -3);
      /* línea del 1 */
      ci19Seg(S, gx(0), y1(1), xr, y1(1), C.muted || '#6b6b6b', 1.1, [5, 4], 0.9);
      if (j > 0){
        /* línea L = x y cocientes */
        ci19Seg(S, gx(0), y1(x), xr, y1(x), C.tan, 1.6, [5, 4]); T.L('LJ' + j, xr, y1(x), 0, 4, 0);
        for (n = 1; n <= NN; n++){ q = x*(n + 1)/n; ci19Seg(S, gx(n), y1(q), gx(0), y1(q), C.rise, 0.9, [3, 3], 0.35); c.beginPath(); c.arc(X(gx(n)), Y(y1(q)), 3.2, 0, 6.2832); c.fillStyle = C.rise; c.fill(); }
        T.L('KA' + j, gx(1), y1(2*x), 0, 7, -1); T.L('KB' + j, gx(NN), y1(9*x/8), -50, 0, -14); }
      /* términos: puntos azules; los mayores que 3 se indican con una flecha en el borde */
      for (n = 1; n <= NN; n++){ a = n*Math.pow(x, n);
        if (a > 3 + 1e-9){ dtFlecha(S, gx(n), y2(2.55), gx(n), y2(3.05), C.sec, 1.6); continue; }
        ci19Seg(S, gx(n), y2(a), gx(0), y2(a), C.sec, 0.9, [3, 3], 0.35); ci19Seg(S, gx(n), y2(0), gx(n), y2(a), C.sec, 1, null, 0.3);
        c.beginPath(); c.arc(X(gx(n)), Y(y2(a)), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      y = Y(y2(0)) + 34;
      txt(LN[0], X(-1.2), y, 'left', C.rise); txt(LN[1], X(-1.2), y + 21, 'left', C.tan); txt(LN[2], X(-1.2), y + 42, 'left', C.sec);
      dtQue(S, 'el límite L de los cocientes,', 'comparado con 1, decide si la serie converge.');
      T.fin();
    },
    caption:function(v){ var j = jj(v), LN = lin(j); return 'Con x = ' + dec(j/4) + ': ' + LN[0] + '; ' + LN[1] + '; ' + LN[2] + '.'; },
    readout:function(v){ var j = jj(v), num = OA.num, fr = ci19Fr, Q = '\\\\&\\qquad ', g = ci19Mcd(j, 4), a = j/g, b = 4/g, xs = fr(j, 4), xp = b === 1 ? xs : '\\left(' + xs + '\\right)', xd = num(j/4, 2).replace(/0$/, ''), L = [], s, n0;
      function ap(p, q){ return (1000*p % q === 0 ? '=' : '\\approx ') + num(p/q, 3).replace(/(\{,\}\d*?)0+$/, '$1').replace(/\{,\}$/, ''); }
      function coc(n){ var p = a*(n + 1), q = b*n, U = '\\dfrac{' + p + '}{' + q + '}', V = fr(p, q); return 'n=' + n + ':\\ ' + xs + '\\cdot\\dfrac{' + (n + 1) + '}{' + n + '}=' + U + (U === V ? '' : '=' + V) + (ci19Mcd(p, q) === q ? '' : ap(p, q)); }
      function ter(n){ var p = Math.pow(a, n), q = Math.pow(b, n), U, V = fr(n*p, q); if (b === 1) return 'a_{' + n + '}=' + n + '\\cdot 1^{' + n + '}=' + n; U = '\\dfrac{' + (n*p) + '}{' + q + '}'; return 'a_{' + n + '}=' + n + '\\cdot' + xp + '^{' + n + '}=' + (n === 1 ? '' : n + '\\cdot\\dfrac{' + p + '}{' + q + '}=') + U + (U === V ? '' : '=' + V) + ap(n*p, q); }
      if (j === 0){
        L.push('\\text{Datos: la serie }\\displaystyle\\sum_{n=1}^{\\infty}n\\,x^{n}\\text{ con }x=0\\text{ (caso límite).}' + Q + '\\text{Término: }a_{n}=n\\cdot 0^{n}=n\\cdot 0=0');
        L.push('\\text{Cociente: }\\dfrac{a_{n+1}}{a_{n}}\\text{ sería }\\dfrac{0}{0}\\text{.}' + Q + '\\text{No se puede dividir por }0\\text{: no hay}' + Q + '\\text{cocientes, y por eso no hay puntos naranjas.}');
        L.push('\\text{El criterio pide }a_{n}\\ne 0\\text{: aquí no se}' + Q + '\\text{puede aplicar.}');
        L.push('\\text{Directamente, con las sumas parciales:}' + Q + 'S_{n}=\\displaystyle\\sum_{k=1}^{n}0=0+0+\\cdots+0=0' + Q + '\\displaystyle\\lim_{n\\to\\infty}S_{n}=0');
        L.push('\\text{Qué significa: la serie converge y su suma}' + Q + '\\text{es }0\\text{. Se sabe sin usar el criterio.}');
        return dtPasos(L); }
      L.push('\\text{Datos: la serie }\\displaystyle\\sum_{n=1}^{\\infty}n\\,x^{n}\\text{ con }x=' + xs + (b === 1 ? '' : '=' + xd) + Q + '\\text{Término: }a_{n}=n\\cdot' + xp + '^{n}\\text{, positivo.}');
      L.push('\\text{Fórmula del cociente. Término que sigue}' + Q + '\\text{dividido por el término:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{(n+1)\\,x^{\\,n+1}}{n\\,x^{n}}' + Q + '\\text{Como }x^{\\,n+1}=x\\cdot x^{n}\\text{, se simplifica }x^{n}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=x\\cdot\\dfrac{n+1}{n}');
      L.push('\\text{Reemplazo con }x=' + xs + '\\text{ (puntos naranjas):}' + Q + coc(1) + Q + coc(2) + Q + coc(3) + Q + coc(8));
      L.push('\\text{Límite. Se separa la fracción:}' + Q + '\\dfrac{n+1}{n}=\\dfrac{n}{n}+\\dfrac{1}{n}=1+\\dfrac{1}{n}' + Q + '\\text{Al crecer }n\\text{, }\\dfrac{1}{n}\\text{ tiene límite }0\\text{:}' + Q + 'L=x\\cdot(1+0)=x\\cdot 1=x' + Q + 'L=' + xs + '\\quad\\text{(línea burdeo).}');
      if (j < 4) L.push('\\text{Comparación con }1\\text{:}\\quad L=' + xs + '<1' + Q + '\\text{Por el criterio del cociente, la serie}' + Q + '\\text{converge absolutamente. Sus términos son}' + Q + '\\text{positivos: es lo mismo que converger.}');
      else if (j === 4) L.push('\\text{Comparación con }1\\text{:}\\quad L=1' + Q + '\\text{El criterio del cociente no decide.}' + Q + '\\text{Otro camino: }a_{n}=n\\ge 1\\text{ para todo }n\\text{.}' + Q + '\\text{Los términos no tienen límite }0\\text{: por el}' + Q + '\\text{criterio del enésimo término, la serie}' + Q + '\\text{diverge.}');
      else L.push('\\text{Comparación con }1\\text{:}\\quad L=' + xs + '>1' + Q + '\\text{Por el criterio del cociente, la serie}' + Q + '\\text{diverge.}');
      L.push('\\text{Los tres primeros términos (puntos azules):}' + Q + ter(1) + Q + ter(2) + Q + ter(3));
      if (j < 4){ n0 = [0, 1, 2, 4][j]; s = '\\text{Qué significa: el cociente es menor que }1' + Q + '\\text{cuando }x\\,(n+1)<n\\text{, es decir, cuando}' + Q + (j === 1 ? 'n+1<4n' : j === 2 ? 'n+1<2n' : '3\\,(n+1)<4n') + '\\text{, o sea, }' + (j === 1 ? '1<3n' : j === 2 ? '1<n' : '3<n') + '\\text{:}' + Q + '\\text{desde }n=' + n0 + '\\text{ en adelante.}' + Q + '\\text{Desde ahí cada término es menor que el}' + Q + '\\text{anterior' + (j === 3 ? ', aunque los primeros suban.}' : '.}') + Q + '\\text{Los términos se achican como los de una}' + Q + '\\text{geométrica, y la suma no crece sin tope.}'; }
      else if (j === 4) s = '\\text{Qué significa: con }L=1\\text{ hay que mirar la}' + Q + '\\text{serie con otro criterio. Aquí es}' + Q + '1+2+3+\\cdots\\text{, que diverge.}';
      else s = '\\text{Qué significa: todos los cocientes son}' + Q + '\\text{mayores que }x=' + xs + '\\text{, porque }\\dfrac{n+1}{n}>1\\text{,}' + Q + '\\text{y }' + xs + '>1\\text{. Cada término es mayor que el}' + Q + '\\text{anterior: no tienden a }0\\text{, y la serie}' + Q + '\\text{diverge.}';
      L.push(s);
      return dtPasos(L); }
  };
})());
