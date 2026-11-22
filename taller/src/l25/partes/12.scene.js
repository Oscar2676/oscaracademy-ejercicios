/* L25 H12 · serie geométrica: S₄ y (2/3)·S₄ como barras; al restar se cancelan los tramos iguales y quedan el primero y el último */
OA.scene('geo-idea', (function(){
  var N = 5, U = 2, XB = -1.0, TY0 = 2.9, TY1 = 3.5, BY0 = 1.75, BY1 = 2.35;
  var PZ = [['T1', '1', '1', 'c-sec'], ['T2', '\\tfrac{2}{3}', '2/3', 'c-sec'], ['T3', '\\tfrac{4}{9}', '4/9', 'c-sec'], ['T4', '\\tfrac{8}{27}', '8/27', 'c-sec'],
    ['B1', '\\tfrac{2}{3}', '2/3', 'c-alt'], ['B2', '\\tfrac{4}{9}', '4/9', 'c-alt'], ['B3', '\\tfrac{8}{27}', '8/27', 'c-alt'], ['B4', '\\tfrac{16}{81}', '16/81', 'c-alt'],
    ['ST', 'S_{4}', 'S₄', 'c-sec'], ['SB', '\\tfrac{2}{3}S_{4}', '(2/3)·S₄', 'c-alt'], ['M3', '3', '3', 'c-tan'],
    ['Q', '1+\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}+\\cdots=\\ ?', '1 + 2/3 + 4/9 + 8/27 + … = ?', 'pt'], ['F', '\\sum_{n=1}^{\\infty}\\left(\\tfrac{2}{3}\\right)^{n-1}=\\dfrac{1}{1-\\frac{2}{3}}=3', 'la suma de (2/3)ⁿ⁻¹ desde n = 1 es 1/(1 − 2/3) = 3', 'diff'],
    ['R1', 'S_{4}=1+\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}', 'S₄ = 1 + 2/3 + 4/9 + 8/27', ''],
    ['R2', '\\tfrac{2}{3}S_{4}=\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}+\\tfrac{16}{81}', '(2/3)·S₄ = 2/3 + 4/9 + 8/27 + 16/81', ''],
    ['R3', 'S_{4}-\\tfrac{2}{3}S_{4}=1-\\tfrac{16}{81}', 'S₄ − (2/3)·S₄ = 1 − 16/81', ''],
    ['R4', '\\tfrac{1}{3}S_{4}=\\tfrac{65}{81}\\ \\Longrightarrow\\ S_{4}=\\tfrac{65}{27}', '(1/3)·S₄ = 65/81, de donde S₄ = 65/27', ''],
    ['R5', 'S_{n}=3\\left(1-\\left(\\tfrac{2}{3}\\right)^{n}\\right)\\ \\longrightarrow\\ 3', 'Sₙ = 3·(1 − (2/3)ⁿ), que tiende a 3', 'diff']];
  var TXT = [['Cada término es dos tercios del anterior.', 'La barra azul es la suma de los cuatro primeros.'],
    ['Se multiplica la suma por la razón:', 'cada tramo se achica y queda bajo su igual.'],
    ['Al restar, los tramos iguales se cancelan.', 'Quedan solo los dos tramos naranjas.'],
    ['Un tercio de la suma vale esa resta.', 'Se multiplica por tres y sale la suma parcial.'],
    ['Con más términos, el tramo sobrante tiende a', 'cero: las sumas parciales tienden a 3.']];
  function A(i){ return 3*(1 - Math.pow(2/3, i)); } /* dónde empieza el tramo i (desde 0) */
  function bx(t){ return XB + U*t; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con la serie geométrica 1 más dos tercios más cuatro novenos más ocho veintisieteavos, de razón dos tercios. Uno: una barra azul formada por cuatro tramos, uno por término, es la suma parcial de cuatro términos. Dos: una copia de cada tramo baja y se achica a dos tercios; forman una barra verde, la suma multiplicada por dos tercios, y cada tramo verde queda justo debajo del tramo azul del mismo largo. Tres: al restar, los tramos iguales se aclaran y dejan su hueco punteado; quedan en naranja el primer tramo azul, de largo 1, y el último verde, de largo dieciséis ochenta y unavos. Cuatro: un tercio de la suma vale 1 menos dieciséis ochenta y unavos, que es sesenta y cinco ochenta y unavos; la suma parcial es sesenta y cinco veintisieteavos. Cinco: la barra azul recibe más términos y se acerca a una marca puesta en 3 sin pasarla; la serie converge y su suma es 3. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> la suma parcial \\(S_{4}\\)</span><span><i class="sw alt"></i> la suma por la razón: \\(\\tfrac{2}{3}S_{4}\\)</span><span><i class="sw rise"></i> los dos tramos que no se cancelan</span><span><i class="sw tan"></i> la suma de la serie</span>',
    anim:{run:34000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, e, a0, a1, y0, y1, m, fd, al, w;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* tramo de barra entre t0 y t1 (en unidades de la serie), con opacidad general ga; hueco = solo contorno punteado */
      function tramo(t0, t1, ya, yb, col, ga, hueco, nb){ var px = X(bx(t0)), pw = (t1 - t0)*U*s, py = Y(yb), ph = (yb - ya)*s; if (pw < 0.6) return;
        if (!nb){ c.globalAlpha = 1; c.fillStyle = '#fff'; c.fillRect(px, py, pw, ph); }
        c.globalAlpha = ga; c.fillStyle = col; c.globalAlpha = ga*0.32; c.fillRect(px, py, pw, ph);
        c.globalAlpha = Math.max(ga, hueco ? 0.55 : 0); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash(hueco && ga < 0.5 ? [3, 3] : []); c.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1); c.setLineDash([]); c.globalAlpha = 1; }
      fd = k === 3 ? 1 - 0.85*u : (k === 4 ? 0.15 : 1);          /* opacidad de los tramos que se cancelan */
      /* barra de arriba */
      if (k === 1){ e = u*A(4); for (i = 0; i < 4; i++) if (e > A(i)) tramo(A(i), Math.min(e, A(i + 1)), TY0, TY1, C.sec, 1); }
      else if (k < 5){ tramo(A(0), A(1), TY0, TY1, C.sec, k === 3 ? 1 - u : (k === 4 ? 0 : 1)); for (i = 1; i < 4; i++) tramo(A(i), A(i + 1), TY0, TY1, C.sec, fd, k >= 3);
        if (k >= 3){ al = k === 3 ? u : 1; tramo(A(0), A(1), TY0, TY1, C.rise, al, 0, 1); if (k === 4){ c.strokeStyle = C.rise; c.lineWidth = 1 + 1.4*u; c.strokeRect(X(bx(0)) + 1, Y(TY1) + 1, U*s - 2, (TY1 - TY0)*s - 2); } } }
      else { m = 4 + 10*u; for (i = 0; i < Math.floor(m) && i < 14; i++) tramo(A(i), A(i + 1), TY0, TY1, C.sec, 1); i = Math.floor(m); if (i < 14) tramo(A(i), A(i) + (A(i + 1) - A(i))*(m - i), TY0, TY1, C.sec, 1); }
      /* barra de abajo: cada tramo sale de su tramo azul, baja y se achica a dos tercios */
      if (k >= 2){ w = k === 2 ? u : 1; al = k === 5 ? 1 - u : 1;
        if (al > 0.02) for (i = 0; i < 4; i++){ a0 = A(i) + (A(i + 1) - A(i))*w; a1 = a0 + (A(i + 1) - A(i))*(1 - w/3); y0 = TY0 + (BY0 - TY0)*w; y1 = TY1 + (BY1 - TY1)*w;
          if (i < 3) tramo(a0, a1, y0, y1, C.alt, al*fd, k >= 3 && k < 5); else { tramo(a0, a1, y0, y1, C.alt, al*(k === 3 ? 1 - u : (k === 4 ? 0 : 1)));
            if (k >= 3 && k < 5){ tramo(a0, a1, y0, y1, C.rise, k === 3 ? u : 1, 0, 1); if (k === 4){ c.strokeStyle = C.rise; c.lineWidth = 1 + 1.4*u; c.strokeRect(X(bx(a0)) + 1, Y(y1) + 1, (a1 - a0)*U*s - 2, (y1 - y0)*s - 2); } } } } }
      /* marca de la suma, en 3 */
      if (k === 5){ c.globalAlpha = u; c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(bx(3)), Y(TY0 - 0.25)); c.lineTo(X(bx(3)), Y(TY1 + 0.2)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; if (u > 0.5) L('M3', bx(3) - 0.12, TY0 - 0.42, -50); }
      /* rótulos */
      for (i = 0; i < 4; i++) if (k > 1 || u*A(4) >= A(i + 1) - 1e-9) L('T' + (i + 1), bx((A(i) + A(i + 1))/2), (TY0 + TY1)/2, -50);
      if ((k === 2 && u > 0.97) || k === 3 || k === 4 || (k === 5 && u < 0.3)){ for (i = 0; i < 3; i++) L('B' + (i + 1), bx((A(i + 1) + A(i + 2))/2), (BY0 + BY1)/2, -50); L('B4', bx((A(4) + A(5))/2), BY0 - 0.26, -50); L('SB', bx(A(5)) + 0.12, (BY0 + BY1)/2, 0); }
      if ((k === 1 && u > 0.95) || (k > 1 && k < 5)) L('ST', bx(A(4)) + 0.12, (TY0 + TY1)/2, 0);
      if (k < N || u < 0.5) L('Q', -1.2, 4.42, 0); else L('F', -1.2, 4.38, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.95));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['S_{4}=1+\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}', '\\dfrac{2}{3}S_{4}=\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}+\\dfrac{16}{81}', 'S_{4}-\\dfrac{2}{3}S_{4}=1-\\dfrac{16}{81}', '\\dfrac{1}{3}S_{4}=\\dfrac{65}{81}\\ \\Longrightarrow\\ S_{4}=\\dfrac{65}{27}', '\\sum_{n=1}^{\\infty}\\left(\\dfrac{2}{3}\\right)^{n-1}=\\dfrac{1}{1-\\frac{2}{3}}=3'][k - 1]]]; }
  };
})());
/* número ↔ figura: las ocho primeras sumas parciales de 1 + r + r² + …; al mover r cambia la figura y la cuenta */
OA.scene('geo-vivo', (function(){
  var NP = 8;
  function gx(n){ return -0.5 + 0.64*n; } function gy(y){ return 0.75 + 0.4*y; }
  function sumas(r){ var a = [], t = 1, s = 0, i; for (i = 0; i < NP; i++){ s += t; a.push(s); t *= r; } return a; }
  function caso(r){ return r > 0.999 ? 2 : (r < -0.999 ? 3 : 1); }
  var FR = ['', 'las sumas parciales se acercan a la suma: converge', 'las sumas parciales crecen sin tope: diverge', 'las sumas parciales oscilan: diverge'];
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.75, y1:4.55}, aspect:5.3/6.6,
    aria:'Gráfica de puntos sueltos con las ocho primeras sumas parciales de la serie geométrica 1 más r más r al cuadrado, y así. Un deslizador cambia la razón r entre menos 1 y 1. Cada punto está unido por una línea punteada con su valor en el eje vertical. Cuando el valor absoluto de r es menor que 1, los puntos se acercan a una recta horizontal punteada trazada a la altura 1 dividido por 1 menos r. Con r igual a cero todos los puntos están a la altura 1. Con r igual a 1 los puntos suben de uno en uno, sin tope. Con r igual a menos 1 los puntos alternan entre 1 y 0.',
    sliders:[{id:'r', tex:'r', min:-1, max:1, step:0.25, value:0.5}],
    legend:'<span><i class="sw sec"></i> las sumas parciales</span><span><i class="sw rise"></i> la última dibujada, \\(S_{8}\\)</span><span><i class="sw tan"></i> la suma, \\(\\tfrac{1}{1-r}\\), cuando \\(|r|&lt;1\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:24000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.r = -1 + 2*p; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var r = v.r == null ? 0.5 : v.r, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), F = '"Source Sans 3", system-ui, sans-serif', a = sumas(r), i, y, lim, col;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(gx(0), gy(0), gx(8.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(8.7), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (y = 1; y <= 8; y++){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(y))); c.lineTo(X(gx(0)) + 3, Y(gy(y))); c.stroke(); num('' + y, X(gx(0)) - 7, Y(gy(y)), 'right'); }
      num('n', X(gx(8.6)) + 6, Y(gy(0)), 'left'); num('Sₙ', X(gx(0)) + 6, Y(gy(8.7)) - 2, 'left');
      if (caso(r) === 1){ lim = 1/(1 - r); if (lim <= 8.6){ c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(lim))); c.lineTo(X(gx(8.6)), Y(gy(lim))); c.stroke(); c.setLineDash([]); txt('suma: ' + oaDec(lim, 2), X(gx(8.6)), Y(gy(lim)) - 11, 'right', C.tan); } else txt('suma: ' + oaDec(lim, 2) + ', más arriba del gráfico', X(gx(8.6)), Y(gy(8.7)) + 2, 'right', C.tan); }
      for (i = 1; i <= NP; i++){ y = a[i - 1]; col = i === NP ? C.rise : C.sec;
        c.globalAlpha = i === NP ? 1 : 0.5; c.strokeStyle = col; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(y))); c.lineTo(X(gx(0)), Y(gy(y))); c.stroke(); c.setLineDash([]);
        c.beginPath(); c.arc(X(gx(0)), Y(gy(y)), 2, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1;
        c.strokeStyle = 'rgba(31,93,134,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0))); c.lineTo(X(gx(i)), Y(gy(y))); c.stroke();
        c.beginPath(); c.arc(X(gx(i)), Y(gy(y)), i === NP ? 4 : 3, 0, 6.2832); c.fillStyle = col; c.fill(); }
      txt('razón: ' + oaDec(r, 2), X(-1.2), Y(0.12), 'left', C.ink);
      txt(FR[caso(r)], X(-1.2), Y(0.12) + 21, 'left', caso(r) === 1 ? C.tan : C.rise);
    },
    caption:function(v){ var r = v.r == null ? 0.5 : v.r, k = caso(r); return 'Con razón ' + oaDec(r, 2) + ', ' + FR[k] + (k === 1 ? '. La suma es ' + oaDec(1/(1 - r), 2) : '. No tiene suma') + '.'; },
    readout:function(v){ var r = v.r == null ? 0.5 : v.r, a = sumas(r); return [['', 'r=' + oaDec(r, 2).replace(',', '{,}') + '\\qquad S_{8}=' + oaDec(a[NP - 1], 2).replace(',', '{,}')], ['d', caso(r) === 1 ? '\\dfrac{1}{1-r}=' + oaDec(1/(1 - r), 2).replace(',', '{,}') : '\\text{no tiene suma}']]; }
  };
})());
