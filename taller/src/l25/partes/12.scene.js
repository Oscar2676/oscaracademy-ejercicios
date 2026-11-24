/* L25 H12 · serie geométrica: S₄ y (2/3)·S₄ como barras; al restar se cancelan los tramos iguales y quedan el primero y el último */
OA.scene('geo-idea', (function(){
  var N = 5, U = 2, XB = -1.0, TY0 = 3.7, TY1 = 4.3, BY0 = 2.55, BY1 = 3.15, CY0 = 1.1, CY1 = 1.7;
  var PZ = [['T1', '1', '1', 'c-sec'], ['T2', '\\tfrac{2}{3}', '2/3', 'c-sec'], ['T3', '\\tfrac{4}{9}', '4/9', 'c-sec'], ['T4', '\\tfrac{8}{27}', '8/27', 'c-sec'],
    ['B1', '\\tfrac{2}{3}', '2/3', 'c-alt'], ['B2', '\\tfrac{4}{9}', '4/9', 'c-alt'], ['B3', '\\tfrac{8}{27}', '8/27', 'c-alt'], ['B4', '\\tfrac{16}{81}', '16/81', 'c-alt'],
    ['ST', 'S_{4}', 'S₄', 'c-sec'], ['SB', '\\tfrac{2}{3}S_{4}', '(2/3)·S₄', 'c-alt'], ['M3', '3', '3', 'c-tan'],
    ['Q', '1+\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}+\\cdots=\\ ?', '1 + 2/3 + 4/9 + 8/27 + … = ?', 'pt'], ['F', '\\Longrightarrow\\ \\sum_{n=1}^{\\infty}\\left(\\tfrac{2}{3}\\right)^{n-1}=\\dfrac{1}{1-\\frac{2}{3}}=3', '⟹ la suma de (2/3)ⁿ⁻¹ desde n = 1 es 1/(1 − 2/3) = 3', 'diff'],
    ['R1', 'S_{4}=1+\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}', 'S₄ = 1 + 2/3 + 4/9 + 8/27', ''],
    ['R2', '\\tfrac{2}{3}S_{4}=\\tfrac{2}{3}+\\tfrac{4}{9}+\\tfrac{8}{27}+\\tfrac{16}{81}', '(2/3)·S₄ = 2/3 + 4/9 + 8/27 + 16/81', ''],
    ['R3', 'S_{4}-\\tfrac{2}{3}S_{4}=1-\\tfrac{16}{81}', 'S₄ − (2/3)·S₄ = 1 − 16/81', ''],
    ['R4', '\\tfrac{1}{3}S_{4}=\\tfrac{65}{81};\\ \\ S_{4}=3\\cdot\\tfrac{65}{81}=\\tfrac{65}{27}', '(1/3)·S₄ = 65/81;  S₄ = 3 · 65/81 = 65/27', ''],
    ['R5', '\\tfrac{1}{3}S_{n}=1-\\left(\\tfrac{2}{3}\\right)^{n};\\ \\ S_{n}=3\\left(1-\\left(\\tfrac{2}{3}\\right)^{n}\\right)\\to 3', '(1/3)·Sₙ = 1 − (2/3)ⁿ;  Sₙ = 3·(1 − (2/3)ⁿ) → 3', 'diff']];
  var TXT = [['Cada término es dos tercios del anterior.', 'La barra azul es la suma de los cuatro primeros.'],
    ['Se multiplica la suma por la razón:', 'cada tramo se achica y queda bajo su igual.'],
    ['Al restar, los tramos iguales se cancelan.', 'Quedan solo los dos tramos naranjas.'],
    ['Un tercio de la suma vale esa resta (naranja).', 'Se multiplica por tres y sale la suma parcial.'],
    ['Lo que falta para llegar a 3 tiende a cero:', 'las sumas parciales tienden a 3. Converge.']];
  function A(i){ return 3*(1 - Math.pow(2/3, i)); } /* dónde empieza el tramo i (desde 0) */
  function bx(t){ return XB + U*t; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.8, y1:7.0}, aspect:11.8/6.6,
    aria:'Arriba, una franja dice qué muestra: al restar la suma por la razón, casi todo se cancela, y así se calcula la suma. Animación en cinco pasos con la serie geométrica 1 más dos tercios más cuatro novenos más ocho veintisieteavos, de razón dos tercios. Uno: una barra azul formada por cuatro tramos, uno por término, es la suma parcial de cuatro términos. Dos: una copia de cada tramo baja y se achica a dos tercios; forman una barra verde, la suma multiplicada por dos tercios, y cada tramo verde queda justo debajo del tramo azul del mismo largo. Tres: al restar, los tramos iguales se aclaran y quedan con borde punteado, con su valor a la vista; quedan en naranja el primer tramo azul, de largo 1, y el último verde, de largo dieciséis ochenta y unavos. Cuatro: se remarcan los dos tramos naranjas: un tercio de la suma vale 1 menos dieciséis ochenta y unavos, que es sesenta y cinco ochenta y unavos; la suma parcial es sesenta y cinco veintisieteavos. Cinco: más abajo, una tercera barra azul vuelve a sumar desde el primer término y sigue con más términos; se acerca a una marca puesta en 3 sin pasarla; la serie converge y su suma es 3. Las dos primeras barras, sus valores y los tramos naranjas quedan a la vista hasta el final; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> la suma parcial \\(S_{4}\\)</span><span><i class="sw alt"></i> la suma por la razón: \\(\\tfrac{2}{3}S_{4}\\)</span><span><i class="sw rise"></i> los dos tramos que no se cancelan</span><span><i class="sw tan"></i> la suma de la serie</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, e, a0, a1, y0, y1, m, fd, g, w;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* tramo de barra entre t0 y t1 (en unidades de la serie), con opacidad general ga; hueco = solo contorno punteado */
      function tramo(t0, t1, ya, yb, col, ga, hueco, nb){ var px = X(bx(t0)), pw = (t1 - t0)*U*s, py = Y(yb), ph = (yb - ya)*s; if (pw < 0.6) return;
        if (!nb){ c.globalAlpha = 1; c.fillStyle = '#fff'; c.fillRect(px, py, pw, ph); }
        c.globalAlpha = ga; c.fillStyle = col; c.globalAlpha = ga*0.32; c.fillRect(px, py, pw, ph);
        c.globalAlpha = Math.max(ga, hueco ? 0.55 : 0); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash(hueco && ga < 0.5 ? [3, 3] : []); c.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1); c.setLineDash([]); c.globalAlpha = 1; }
      fd = k === 3 ? 1 - 0.65*u : (k >= 4 ? 0.35 : 1);          /* los tramos que se cancelan se aclaran, pero no se van */
      g = k === 4 ? u : 1;                                       /* remarcado de los dos tramos naranjas */
      /* barra de arriba: la suma parcial S₄ (queda hasta el final) */
      if (k === 1){ e = u*A(4); for (i = 0; i < 4; i++) if (e > A(i)) tramo(A(i), Math.min(e, A(i + 1)), TY0, TY1, C.sec, 1); }
      else { tramo(A(0), A(1), TY0, TY1, C.sec, k === 3 ? 1 - u : (k >= 4 ? 0 : 1)); for (i = 1; i < 4; i++) tramo(A(i), A(i + 1), TY0, TY1, C.sec, fd, k >= 3);
        if (k >= 3){ tramo(A(0), A(1), TY0, TY1, C.rise, k === 3 ? u : 1, 0, 1); if (k >= 4){ c.strokeStyle = C.rise; c.lineWidth = 1 + 1.4*g; c.strokeRect(X(bx(0)) + 1, Y(TY1) + 1, U*s - 2, (TY1 - TY0)*s - 2); } } }
      /* barra de abajo: cada tramo sale de su tramo azul, baja y se achica a dos tercios (queda hasta el final) */
      if (k >= 2){ w = k === 2 ? u : 1;
        for (i = 0; i < 4; i++){ a0 = A(i) + (A(i + 1) - A(i))*w; a1 = a0 + (A(i + 1) - A(i))*(1 - w/3); y0 = TY0 + (BY0 - TY0)*w; y1 = TY1 + (BY1 - TY1)*w;
          if (i < 3) tramo(a0, a1, y0, y1, C.alt, fd, k >= 3); else { tramo(a0, a1, y0, y1, C.alt, k === 3 ? 1 - u : (k >= 4 ? 0 : 1));
            if (k >= 3){ tramo(a0, a1, y0, y1, C.rise, k === 3 ? u : 1, 0, 1); if (k >= 4){ c.strokeStyle = C.rise; c.lineWidth = 1 + 1.4*g; c.strokeRect(X(bx(a0)) + 1, Y(y1) + 1, (a1 - a0)*U*s - 2, (y1 - y0)*s - 2); } } } } }
      /* paso 5: tercera barra, aparte; vuelve a sumar desde el primer término y sigue con más; marca de la suma, en 3 */
      if (k === 5){ m = 14*u; for (i = 0; i < Math.floor(m) && i < 14; i++) tramo(A(i), A(i + 1), CY0, CY1, C.sec, 1); i = Math.floor(m); if (i < 14) tramo(A(i), A(i) + (A(i + 1) - A(i))*(m - i), CY0, CY1, C.sec, 1);
        c.globalAlpha = Math.min(1, 3*u); txt('Con más términos, la suma parcial se acerca a 3:', -1.2, CY1 + 0.27);
        c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(bx(3)), Y(CY0 - 0.2)); c.lineTo(X(bx(3)), Y(CY1 + 0.14)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; if (u > 0.3) L('M3', bx(3), CY0 - 0.36, -50); }
      /* rótulos: una vez puestos, no se quitan */
      for (i = 0; i < 4; i++) if (k > 1 || u*A(4) >= A(i + 1) - 1e-9) L('T' + (i + 1), bx((A(i) + A(i + 1))/2), (TY0 + TY1)/2, -50);
      if ((k === 2 && u > 0.97) || k >= 3){ for (i = 0; i < 3; i++) L('B' + (i + 1), bx((A(i + 1) + A(i + 2))/2), (BY0 + BY1)/2, -50); L('B4', bx((A(4) + A(5))/2), BY0 - 0.26, -50); L('SB', bx(A(5)) + 0.12, (BY0 + BY1)/2, 0); }
      if ((k === 1 && u > 0.95) || k > 1) L('ST', bx(A(4)) + 0.12, (TY0 + TY1)/2, 0);
      L('Q', -1.2, 5.65, 0); if (k === N && u > 0.5) L('F', -1.2, 5.05, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.65));
      dtQue(S, 'al restar la suma por la razón,', 'casi todo se cancela: así se calcula la suma.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.2, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos: primer término }a=1,\\ \\text{razón }r=\\dfrac{2}{3}' + Q + '\\text{Cada término es el anterior por }\\dfrac{2}{3}\\text{:}' + Q + '1\\cdot\\dfrac{2}{3}=\\dfrac{2}{3},\\qquad\\dfrac{2}{3}\\cdot\\dfrac{2}{3}=\\dfrac{4}{9}' + Q + '\\dfrac{4}{9}\\cdot\\dfrac{2}{3}=\\dfrac{8}{27}' + Q + '\\text{Suma parcial: }S_{4}=1+\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}',
      '\\text{Se multiplica cada término por }\\dfrac{2}{3}\\text{:}' + Q + '\\dfrac{2}{3}\\cdot 1=\\dfrac{2}{3},\\qquad\\dfrac{2}{3}\\cdot\\dfrac{2}{3}=\\dfrac{4}{9}' + Q + '\\dfrac{2}{3}\\cdot\\dfrac{4}{9}=\\dfrac{8}{27},\\qquad\\dfrac{2}{3}\\cdot\\dfrac{8}{27}=\\dfrac{16}{81}' + Q + '\\dfrac{2}{3}S_{4}=\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}+\\dfrac{16}{81}',
      '\\text{Resta: }S_{4}-\\dfrac{2}{3}S_{4}' + Q + '=\\left(1+\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}\\right)' + Q + '\\quad-\\left(\\dfrac{2}{3}+\\dfrac{4}{9}+\\dfrac{8}{27}+\\dfrac{16}{81}\\right)' + Q + '\\text{Están en las dos y se cancelan: }\\dfrac{2}{3},\\ \\dfrac{4}{9},\\ \\dfrac{8}{27}' + Q + '\\text{Queda: }S_{4}-\\dfrac{2}{3}S_{4}=1-\\dfrac{16}{81}',
      '\\text{Lado izquierdo, factor común }S_{4}\\text{:}' + Q + '\\left(1-\\dfrac{2}{3}\\right)S_{4}=\\left(\\dfrac{3}{3}-\\dfrac{2}{3}\\right)S_{4}=\\dfrac{1}{3}S_{4}' + Q + '\\text{Lado derecho: }1-\\dfrac{16}{81}=\\dfrac{81}{81}-\\dfrac{16}{81}=\\dfrac{65}{81}' + Q + '\\text{Queda: }\\dfrac{1}{3}S_{4}=\\dfrac{65}{81}' + Q + '\\text{Se multiplica por }3\\text{: }S_{4}=3\\cdot\\dfrac{65}{81}=\\dfrac{195}{81}' + Q + '\\text{Se simplifica por }3\\text{: }S_{4}=\\dfrac{65}{27}',
      '\\text{Con 4 términos quedó: }\\dfrac{1}{3}S_{4}=1-\\dfrac{16}{81},\\ \\text{y }\\dfrac{16}{81}=\\left(\\dfrac{2}{3}\\right)^{4}' + Q + '\\text{Con }n\\text{ términos, la barra verde termina en }\\left(\\dfrac{2}{3}\\right)^{n}\\text{:}' + Q + 'S_{n}=1+\\dfrac{2}{3}+\\cdots+\\left(\\dfrac{2}{3}\\right)^{n-1}' + Q + '\\dfrac{2}{3}S_{n}=\\dfrac{2}{3}+\\cdots+\\left(\\dfrac{2}{3}\\right)^{n-1}+\\left(\\dfrac{2}{3}\\right)^{n}' + Q + '\\text{Se restan; lo repetido se cancela:}' + Q + '\\dfrac{1}{3}S_{n}=1-\\left(\\dfrac{2}{3}\\right)^{n}' + Q + '\\text{Se multiplica por }3\\text{: }S_{n}=3\\left(1-\\left(\\dfrac{2}{3}\\right)^{n}\\right)' + Q + '\\text{Al crecer }n\\text{, }\\left(\\dfrac{2}{3}\\right)^{n}\\text{ tiende a }0\\text{:}' + Q + '\\displaystyle\\lim_{n\\to\\infty}S_{n}=3\\,(1-0)=3\\cdot 1=3' + Q + '\\text{Con la fórmula: }\\dfrac{a}{1-r}=\\dfrac{1}{1-\\frac{2}{3}}' + Q + '1-\\dfrac{2}{3}=\\dfrac{3}{3}-\\dfrac{2}{3}=\\dfrac{1}{3},\\qquad\\dfrac{1}{\\frac{1}{3}}=1\\cdot 3=3' + Q + '\\text{La serie converge y su suma es }3.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: las ocho primeras sumas parciales de 1 + r + r² + …; al mover r cambia la figura y la cuenta */
OA.scene('geo-vivo', (function(){
  var NP = 8, PZ = [['P1', 'S_{1}', 'S₁', 'c-sec'], ['P8', 'S_{8}', 'S₈', 'diff']];
  function gx(n){ return -0.5 + 0.64*n; } function gy(y){ return 0.75 + 0.4*y; }
  /* todo se calcula con r redondeada a centésimas: R = 100·r es un entero y las cuentas son exactas */
  function dat(v){ var R = Math.round((v.r == null ? 0.5 : +v.r)*100), D = 100 - R, i, t = 1, N8 = 0, a = [], s = 0, o;
    for (i = 0; i < NP; i++){ N8 += t*Math.pow(100, NP - 1 - i); s += t/Math.pow(100, i); a.push(s); t *= R; }
    o = {R:R, r:R/100, D:D, a:a, caso:R >= 100 ? 2 : (R <= -100 ? 3 : 1), S2:(100 + R)/100, q:R*R/10000, S3:(10000 + 100*R + R*R)/10000, S8:Math.round(N8/1e12)/100, e8:Math.abs(N8) % 1e12 === 0};
    if (o.caso === 1){ o.lim = 100/D; o.Sr = Math.round(10000/D)/100; o.eS = 10000 % D === 0; o.falta = Math.round((o.Sr - o.S8)*100)/100; }
    o.fr = R === 0 ? 'todas las sumas parciales valen 1: converge' : FR[o.caso];
    return o; }
  var FR = ['', 'las sumas parciales se acercan a la suma: converge', 'las sumas parciales crecen sin tope: diverge', 'las sumas parciales oscilan: diverge'];
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.15, y1:5.6}, aspect:6.75/6.6,
    aria:'Arriba, una franja dice qué muestra: la razón r decide si las sumas parciales se acercan a un número. Gráfica de puntos sueltos con las ocho primeras sumas parciales de la serie geométrica 1 más r más r al cuadrado, y así. Un deslizador cambia la razón r entre menos 1 y 1. Cada punto está unido por una línea punteada con su valor en el eje vertical. El primer punto, que siempre vale 1, lleva su nombre; el último, naranja, lleva su nombre. Cuando el valor absoluto de r es menor que 1, los puntos se acercan a una recta horizontal punteada, burdeo, trazada a la altura 1 dividido por 1 menos r, rotulada con el valor de la suma. Con r igual a cero todos los puntos están a la altura 1. Con r igual a 1 los puntos suben de uno en uno, sin tope, y no hay recta. Con r igual a menos 1 los puntos alternan entre 1 y 0, y no hay recta. Bajo el dibujo, tres frases dicen la razón, si la serie converge o diverge y por qué hay o no hay recta burdeo; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'r', tex:'r', min:-1, max:1, step:0.25, value:0.5}],
    legend:'<span><i class="sw sec"></i> las sumas parciales</span><span><i class="sw rise"></i> la última dibujada, \\(S_{8}\\)</span><span><i class="sw tan"></i> la suma, \\(\\tfrac{1}{1-r}\\), cuando \\(|r|&lt;1\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:24000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.r = -1 + 2*p; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var d = dat(v), r = d.r, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', a = d.a, i, y, col, st;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(gx(0), gy(0), gx(8.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(8.7), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (y = 1; y <= 8; y++){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(y))); c.lineTo(X(gx(0)) + 3, Y(gy(y))); c.stroke(); num('' + y, X(gx(0)) - 7, Y(gy(y)), 'right'); }
      num('n', X(gx(8.6)), Y(gy(0)) + 11, 'center'); num('Sₙ', X(gx(0)) + 6, Y(gy(8.7)) - 2, 'left');
      if (d.caso === 1){ st = 'suma: ' + oaDec(d.Sr, 2) + (d.eS ? '' : ' (aprox.)');
        if (d.lim <= 8.6){ c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(d.lim))); c.lineTo(X(gx(8.6)), Y(gy(d.lim))); c.stroke(); c.setLineDash([]); txt(st, X(gx(8.6)), Y(gy(d.lim)) - 13, 'right', C.tan); } else txt(st + ', más arriba del gráfico', X(gx(8.6)), Y(gy(8.7)) + 2, 'right', C.tan); }
      for (i = 1; i <= NP; i++){ y = a[i - 1]; col = i === NP ? C.rise : C.sec;
        c.globalAlpha = i === NP ? 1 : 0.5; c.strokeStyle = col; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i)), Y(gy(y))); c.lineTo(X(gx(0)), Y(gy(y))); c.stroke(); c.setLineDash([]);
        c.beginPath(); c.arc(X(gx(0)), Y(gy(y)), 2, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1;
        c.strokeStyle = 'rgba(31,93,134,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0))); c.lineTo(X(gx(i)), Y(gy(y))); c.stroke();
        c.beginPath(); c.arc(X(gx(i)), Y(gy(y)), i === NP ? 4 : 3, 0, 6.2832); c.fillStyle = col; c.fill(); }
      /* rótulos junto a los puntos: el primero (siempre vale 1) y el último, naranja */
      T.L('P1', gx(1), gy(1), -100, -7, 0);
      T.L('P8', gx(NP), gy(a[NP - 1]), 0, 8, d.caso === 1 ? 4 : (r < 0 ? -11 : 0));
      txt('razón: ' + oaDec(r, 2), X(-1.2), Y(0.12), 'left', C.ink);
      txt(d.fr, X(-1.2), Y(0.12) + 21, 'left', d.caso === 1 ? C.tan : C.rise);
      txt(d.caso === 1 ? (d.lim <= 8.6 ? (d.R === 0 ? 'recta burdeo: la suma; los puntos están en ella' : 'recta burdeo: la suma, a la que se acercan') : 'la recta burdeo queda más arriba del gráfico') : 'no hay recta burdeo: la serie no tiene suma', X(-1.2), Y(0.12) + 42, 'left', d.caso === 1 ? C.tan : C.rise);
      dtQue(S, 'la razón r decide si las sumas', 'parciales se acercan a un número. Mueve r.');
      T.fin();
    },
    caption:function(v){ var d = dat(v); return 'Con razón ' + oaDec(d.r, 2) + ', ' + d.fr + (d.caso === 1 ? '. La suma es ' + (d.eS ? '' : 'aproximadamente ') + oaDec(d.Sr, 2) : '. No tiene suma') + '.'; },
    readout:function(v){ var d = dat(v), r = d.r, n = OA.num, p = function(z, k){ return z < 0 ? '(' + n(z, k) + ')' : n(z, k); }, Q = '\\\\&\\qquad ', ap = '\\approx ', L;
      L = ['\\text{Datos: }a=1,\\qquad r=' + n(r, 2) + Q + '\\text{Serie: }1+r+r^{2}+r^{3}+\\cdots',
        '\\text{Sumas parciales (los puntos):}' + Q + 'S_{1}=1' + Q + 'S_{2}=S_{1}+r=1+' + p(r, 2) + '=' + n(d.S2, 2) + Q + 'r^{2}=' + p(r, 2) + '\\cdot ' + p(r, 2) + '=' + n(d.q, 4) + Q + 'S_{3}=S_{2}+r^{2}=' + n(d.S2, 2) + '+' + n(d.q, 4) + '=' + n(d.S3, 4),
        '\\text{Así, sumando cada vez el término que sigue,}' + Q + '\\text{hasta }S_{8}=S_{7}+r^{7}\\text{ (punto naranja):}' + Q + 'S_{8}' + (d.e8 ? '=' : ap) + n(d.S8, 2),
        '\\text{Se compara }|r|\\text{ con }1\\text{:}' + Q + '|r|=' + n(Math.abs(r), 2) + (d.caso === 1 ? '<1' : '\\ge 1') + Q + (d.caso === 1 ? '\\text{La serie converge.}' : '\\text{La serie diverge.}')];
      if (d.caso === 1){ L.push('\\text{Suma: }\\dfrac{a}{1-r}=\\dfrac{1}{1-' + p(r, 2) + '}' + Q + '\\text{Resta: }1-' + p(r, 2) + '=' + n(d.D/100, 2) + Q + '\\text{División: }1:' + n(d.D/100, 2) + (d.eS ? '=' : ap) + n(d.Sr, 2));
        L.push('\\text{Lo que le falta a }S_{8}\\text{ para llegar a la suma:}' + Q + n(d.Sr, 2) + '-' + n(d.S8, 2) + '=' + n(d.falta, 2) + (d.eS && d.e8 ? '' : Q + '\\text{(con los valores redondeados)}'));
        L.push((d.R === 0 ? '\\text{Con }r=0\\text{, los términos que siguen al primero}' + Q + '\\text{valen }0\\text{: todas las sumas parciales valen }1.' + Q + '\\text{Los puntos están sobre la recta burdeo:}' : '\\text{Los puntos se acercan a la recta burdeo:}') + Q + '\\text{su altura es la suma de la serie.}'); }
      else if (d.caso === 2){ L.push('\\text{Con }r=1\\text{ todos los términos valen }1\\text{:}' + Q + 'S_{n}=n\\text{, que crece sin tope.}');
        L.push('\\text{La fórmula }\\dfrac{a}{1-r}\\text{ no se puede usar:}' + Q + '1-r=1-' + n(r, 2) + '=' + n(d.D/100, 2) + Q + '\\text{y no se divide por cero.}');
        L.push('\\text{Los puntos no se acercan a ningún número:}' + Q + '\\text{la serie no tiene suma.}'); }
      else { L.push('\\text{Con }r=-1\\text{ los términos son }1,\\ -1,\\ 1,\\ -1,\\ \\ldots' + Q + '\\text{Sumas parciales: }1,\\ 0,\\ 1,\\ 0,\\ \\ldots');
        L.push('\\text{La fórmula }\\dfrac{a}{1-r}\\text{ no vale aquí:}' + Q + '\\text{exige }|r|<1.');
        L.push('\\text{Los puntos oscilan entre }1\\text{ y }0\\text{: no se acercan}' + Q + '\\text{a un solo número. La serie no tiene suma.}'); }
      return dtPasos(L); }
  };
})());
