/* registro acumulado: la expresión de cada paso queda escrita, numerada, y se acumula hacia abajo */
function oaReg(S, k, n, xw, yw, FILA){ var c = S.ctx, C = S.C, x0 = S.X(xw), y0 = S.Y(yw), i, act;
  c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Paso a paso, lo que se va obteniendo:', x0, y0 - 24);
  for (i = 0; i < n; i++){ if (i >= k){ S.lab('R' + (i + 1), 0, 0, 0, 0, false); continue; } act = i === k - 1;
    c.beginPath(); c.arc(x0 + 9, y0 + FILA[i], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
    c.font = '700 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (i + 1), x0 + 9, y0 + FILA[i] + 0.5);
    S.lab('R' + (i + 1), x0 + 25, y0 + FILA[i], 0, -50, true); } }
/* Planos tangentes y linealización local. Dibujo propio; rótulos algebraicos como etiquetas TeX. */
(function(){
  var FNT = '"Source Sans 3", system-ui, sans-serif';
  function f(x, y){ return 3 - x*x/2 - y*y/4; } function fx(x){ return -x; } function fy(x, y){ return -y/2; }
  function kit(S){
    var c = S.ctx, X = S.X, Y = S.Y, C = S.C, K = {};
    K.P = function(x, y, z){ return [y - 0.45*x, z - 0.35*x]; };
    K.line = function(a, b, col, w, dash){ var p = K.P(a[0], a[1], a[2]), q = K.P(b[0], b[1], b[2]); c.strokeStyle = col; c.lineWidth = w || 1; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(X(p[0]), Y(p[1])); c.lineTo(X(q[0]), Y(q[1])); c.stroke(); c.setLineDash([]); };
    K.poly = function(pts, col, alpha, stroke){ c.beginPath(); pts.forEach(function(t, i){ var p = K.P(t[0], t[1], t[2]); if (i) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.closePath(); c.globalAlpha = alpha; c.fillStyle = col; c.fill(); c.globalAlpha = 1; if (stroke){ c.strokeStyle = stroke; c.lineWidth = 0.6; c.stroke(); } };
    K.curve = function(g, t0, t1, col, w){ var i, t, p; c.strokeStyle = col; c.lineWidth = w; c.beginPath(); for (i = 0; i <= 50; i++){ t = t0 + (t1 - t0)*i/50; p = g(t); p = K.P(p[0], p[1], p[2]); if (i) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); } c.stroke(); };
    K.dot = function(p, col, r){ var q = K.P(p[0], p[1], p[2]); c.beginPath(); c.arc(X(q[0]), Y(q[1]), r || 3.2, 0, 6.2832); c.fillStyle = col; c.fill(); };
    K.txt = function(t, x, y, col, sz, al){ c.font = '600 ' + (sz || 12.5) + 'px ' + FNT; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); };
    K.ejes = function(){ K.line([0, 0, 0], [3.1, 0, 0], C.ink, 1); K.line([0, 0, 0], [0, 2.9, 0], C.ink, 1); K.line([0, 0, 0], [0, 0, 3.7], C.ink, 1); };
    K.sup = function(alpha){ /* superficie por parches, de atrás hacia adelante, con degradado por altura */
      var n = 8, h = 4/n, i, j, x, y, z;
      for (i = 0; i < n; i++) for (j = 0; j < n; j++){ x = -2 + i*h; y = -2 + j*h; z = f(x + h/2, y + h/2);
        K.poly([[x, y, f(x, y)], [x + h, y, f(x + h, y)], [x + h, y + h, f(x + h, y + h)], [x, y + h, f(x, y + h)]], C.sec, alpha*(0.12 + 0.2*z/3), 'rgba(31,95,138,0.45)'); }
    };
    K.plano = function(a, b, r, alpha){ var z0 = f(a, b), m = fx(a), n = fy(a, b), q = function(u, v){ return [a + u, b + v, z0 + m*u + n*v]; }; K.poly([q(-r, -r), q(r, -r), q(r, r), q(-r, r)], C.tan, alpha, C.tan); };
    K.at = function(p){ var q = K.P(p[0], p[1], p[2]); return [X(q[0]), Y(q[1])]; };
    return K;
  }
  function etiquetas(S, PZ){ var on = {}; return { L:function(id, p, ax, dx, dy){ on[id] = 1; S.lab(id, p[0] + (dx || 0), p[1] + (dy || 0), ax == null ? -50 : ax, -50, true); }, fin:function(){ PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); }); } }; }
  var EJ = [['AX', 'x', 'x', ''], ['AY', 'y', 'y', ''], ['AZ', 'z', 'z', '']];
  function ejesLab(K, L){ L('AX', K.at([3.3, 0, 0])); L('AY', K.at([0, 3.1, 0])); L('AZ', K.at([0, 0, 3.9])); }

  /* ── la idea, en seis pasos ── */
  OA.scene('cm-plano-idea', (function(){
    var N = 6, A = 0.8, B = 0.6, Z0 = f(A, B), M = fx(A), Nn = fy(A, B);
    var PZ = EJ.concat([
      ['Q', '\\text{¿Qué plano se apoya en }P\\text{?}', '¿Qué plano se apoya en P?', 'pt'],
      ['SF', 'z=f(x,y)', 'z = f(x, y)', 'c-sec'], ['PP', 'P', 'P', 'pt'], ['AB', '(a,\\,b)', '(a, b)', ''],
      ['MX', '\\text{pendiente }f_{x}(a,b)', 'pendiente f_x(a, b)', 'diff'], ['MY', '\\text{pendiente }f_{y}(a,b)', 'pendiente f_y(a, b)', 'c-alt'],
      ['E5', 'z=f(a,b)+f_{x}(a,b)\\,(x-a)+f_{y}(a,b)\\,(y-b)', 'z = f(a,b) + f_x(a,b)(x − a) + f_y(a,b)(y − b)', 'diff'],
      ['E6', 'f(x,y)\\approx L(x,y)\\quad\\text{cerca de }(a,b)', 'f(x, y) ≈ L(x, y) cerca de (a, b)', ''],
      ['FV', 'f(x,y)', 'f(x, y)', 'c-sec'], ['LV', 'L(x,y)', 'L(x, y)', 'c-tan']
    ]);
    PZ = PZ.concat([['R1', 'z=f(x,y),\\qquad P=\\big(a,\\ b,\\ f(a,b)\\big)', 'paso 1', ''], ['R2', 'y=b\\text{ fijo:}\\quad f_{x}(a,b)=\\dfrac{\\partial f}{\\partial x}(a,b)', 'paso 2', ''], ['R3', 'x=a\\text{ fijo:}\\quad f_{y}(a,b)=\\dfrac{\\partial f}{\\partial y}(a,b)', 'paso 3', ''], ['R4', '\\text{dos rectas por }P\\ \\longrightarrow\\ \\text{un plano}', 'paso 4', ''], ['R5', 'z=f(a,b)+f_{x}(a,b)(x-a)+f_{y}(a,b)(y-b)', 'paso 5', ''], ['R6', 'f(x,y)\\approx L(x,y)\\quad\\text{cerca de }(a,b)', 'paso 6', '']]);
    var TXT = [
      ['Una superficie y un punto sobre ella.', 'Se busca el plano que mejor se le pega en ese punto.'],
      ['Corte de frente: la segunda variable queda fija.', 'La curva del corte tiene su recta tangente.'],
      ['Corte de lado: la primera variable queda fija.', 'Otra curva, otra recta tangente.'],
      ['Las dos rectas se cruzan en el punto', 'y determinan un plano: el plano tangente.'],
      ['Su ecuación usa la altura del punto', 'y las dos pendientes, una por cada dirección.'],
      ['Cerca del punto, plano y superficie casi coinciden.', 'El plano sirve para aproximar: es la linealización.']
    ];
    return {
      world:{x0:-3.7, x1:3.9, y0:-7.75, y1:4.4}, aspect:12.15/7.6,
      aria:'Animación en seis pasos. Uno: una superficie con forma de cúpula, z igual a f de x y, dibujada en tres dimensiones con degradado azul, y un punto P sobre ella, encima del punto a, b del plano del suelo. Dos: se corta la superficie con un plano vertical que mantiene y igual a b; aparece una curva naranja y su recta tangente en P, de pendiente f sub x. Tres: se corta con un plano vertical que mantiene x igual a a; aparece una curva verde y su recta tangente, de pendiente f sub y. Cuatro: las dos rectas tangentes determinan un plano burdeo, el plano tangente. Cinco: la ecuación del plano. Seis: un punto cercano muestra que la altura del plano y la de la superficie casi coinciden.',
      labels:PZ,
      sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
      legend:'<span><i class="sw sec"></i> la superficie</span><span><i class="sw rise"></i> corte y tangente en la dirección \\(x\\)</span><span><i class="sw alt"></i> corte y tangente en la dirección \\(y\\)</span><span><i class="sw tan"></i> el plano tangente</span>',
      anim:{run:36000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N), w = Math.min(1, (t - Math.floor(t))*1.35); v.q = p; v.paso = 1 + Math.floor(t); v.u = w*w*(3 - 2*w); }},
      onInput:function(v){ v.q = null; v.u = 1; },
      draw:function(S, v){
        var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, K = kit(S), T = etiquetas(S, PZ), L = T.L, Pt = [A, B, Z0], ua = Math.min(1, u/0.6), ub = Math.max(0, (u - 0.6)/0.4), g = k === 6 ? u : 1, x1 = A + 0.7*g, y1 = B + 0.6*g, zf = f(x1, y1), zl = Z0 + M*0.7*g + Nn*0.6*g, zp = k === 1 ? Z0*u : Z0;
        K.ejes(); ejesLab(K, L);
        K.sup(1);
        K.line([A, B, 0], [A, B, zp], C.ink, 1, [3, 3]); K.dot([A, B, 0], C.ink, 2.2); L('AB', K.at([A, B, 0]), -50, 0, 13);
        if (k >= 4) K.plano(A, B, k === 4 ? 0.05 + 0.95*u : 1.0, k === 4 ? 0.42*u : 0.42);
        if (k === 2 || k >= 4){ var lx = k === 2 ? ub : 1; if (k === 2) K.curve(function(t){ return [t, B, f(t, B)]; }, -2, -2 + 4*ua, C.rise, 2); if (lx > 0) K.line([A - lx, B, Z0 - M*lx], [A + lx, B, Z0 + M*lx], C.rise, 2); }
        if (k === 3 || k >= 4){ var ly = k === 3 ? ub : 1; if (k === 3) K.curve(function(t){ return [A, t, f(A, t)]; }, -2, -2 + 4*ua, C.alt, 2); if (ly > 0) K.line([A, B - ly, Z0 - Nn*ly], [A, B + ly, Z0 + Nn*ly], C.alt, 2); }
        K.dot([A, B, zp], C.ink, 3.4); if (k > 1 || u >= 1) L('PP', K.at(Pt), -50, -4, -13);
        L('SF', [S.X(-3.6), S.Y(2.9)], 0);
        if (k === 2 && u >= 1) L('MX', K.at([A + 1.0, B, Z0 + M]), 0, 8, 10);
        if (k === 3 && u >= 1) L('MY', K.at([A, B + 1.0, Z0 + Nn]), 0, 8, -2);
        if (k === 6){ K.line([x1, y1, zf], [x1, y1, zl], C.ink, 2); K.dot([x1, y1, zf], C.sec, 3); K.dot([x1, y1, zl], C.tan, 3); if (u >= 1){ L('LV', K.at([x1, y1, zl]), 0, 8, -6); L('FV', K.at([x1, y1, zf]), 0, 8, 10); } }
        if (k === 1) L('Q', [S.X(-3.6), S.Y(4.0)], 0);
        K.txt(TXT[k - 1][0], -3.6, -1.95); K.txt(TXT[k - 1][1], -3.6, -1.95 - 21/(S.X(1) - S.X(0)));
        K.txt('paso ' + k + ' de ' + N, 3.8, 4.15, C.muted || '#6b6b6b', 11, 'right');
        T.fin();
        oaReg(S, k, N, -3.6, -3.55, [0, 34, 74, 108, 138, 168]);
      },
      caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
      readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['z=f(x,y),\\qquad P=\\big(a,\\ b,\\ f(a,b)\\big)', '\\text{con }y=b\\text{ fijo:}\\quad \\text{pendiente}=f_{x}(a,b)=\\dfrac{\\partial f}{\\partial x}(a,b)', '\\text{con }x=a\\text{ fijo:}\\quad \\text{pendiente}=f_{y}(a,b)=\\dfrac{\\partial f}{\\partial y}(a,b)', '\\text{dos rectas que se cruzan en }P\\ \\longrightarrow\\ \\text{un plano}', 'z=f(a,b)+f_{x}(a,b)\\,(x-a)+f_{y}(a,b)\\,(y-b)', 'L(x,y)=f(a,b)+f_{x}(a,b)\\,(x-a)+f_{y}(a,b)\\,(y-b)\\approx f(x,y)'][k - 1]]]; }
    };
  })());

  /* ── ejemplo 1: el plano se mueve con el punto ── */
  OA.scene('cm-plano-mueve', (function(){
    var PZ = EJ.concat([['SF', 'z=3-\\dfrac{x^{2}}{2}-\\dfrac{y^{2}}{4}', 'z = 3 − x²/2 − y²/4', 'c-sec'], ['PP', 'P', 'P', 'pt']]);
    return {
      world:{x0:-3.7, x1:3.9, y0:-1.5, y1:4.8}, aspect:6.3/7.6,
      aria:'La cúpula z igual a 3 menos x al cuadrado sobre 2 menos y al cuadrado sobre 4, en tres dimensiones. Un punto P se mueve sobre ella al cambiar a y b. El plano tangente, en burdeo, lo acompaña: es horizontal en la cima, donde a y b valen 0, y se inclina más mientras más lejos de la cima está el punto. Bajo el dibujo se muestran la altura, las dos pendientes y la ecuación del plano con los valores actuales.',
      labels:PZ,
      sliders:[{id:'a', tex:'a', min:-1.5, max:1.5, step:0.1, value:-1.5}, {id:'b', tex:'b', min:-1.5, max:1.5, step:0.1, value:1}],
      legend:'<span><i class="sw sec"></i> la superficie</span><span><i class="sw tan"></i> el plano tangente en \\(P\\)</span><span><i class="sw rise"></i> dirección \\(x\\)</span><span><i class="sw alt"></i> dirección \\(y\\)</span>',
      anim:{run:16000, hold:5000, still:1, apply:function(p, v){ v.q = p; v.a = -1.5 + 3*p; if (v.b == null) v.b = 1; }},
      onInput:function(v){ v.q = null; },
      draw:function(S, v){
        var a = v.a == null ? -1.5 : +v.a, b = v.b == null ? 1 : +v.b, C = S.C, K = kit(S), T = etiquetas(S, PZ), L = T.L, z0 = f(a, b), m = fx(a), n = fy(a, b), Pt = [a, b, z0];
        K.ejes(); ejesLab(K, L); K.sup(1);
        K.line([a, b, 0], Pt, C.ink, 1, [3, 3]); K.dot([a, b, 0], C.ink, 2.2);
        K.plano(a, b, 0.9, 0.45); K.line([a - 0.9, b, z0 - 0.9*m], [a + 0.9, b, z0 + 0.9*m], C.rise, 2); K.line([a, b - 0.9, z0 - 0.9*n], [a, b + 0.9, z0 + 0.9*n], C.alt, 2);
        K.dot(Pt, C.ink, 3.4); L('PP', K.at(Pt), -50, -4, -13); L('SF', [S.X(-3.6), S.Y(4.2)], 0);
        T.fin();
      },
      caption:function(v){ var a = v.a == null ? -1.5 : +v.a, b = v.b == null ? 1 : +v.b, d = function(z){ return z.toFixed(2).replace('.', ',').replace('-', '−'); }; return (Math.abs(a) < 1e-9 && Math.abs(b) < 1e-9) ? 'En la cima las dos pendientes valen 0: el plano tangente es horizontal' : 'El punto está sobre (' + d(a) + '; ' + d(b) + '), a una altura de ' + d(f(a, b)) + '. El plano se inclina según las dos pendientes: ' + d(fx(a)) + ' en la dirección x y ' + d(fy(a, b)) + ' en la dirección y'; },
      readout:function(v){ var a = v.a == null ? -1.5 : +v.a, b = v.b == null ? 1 : +v.b, n = OA.num, p = function(z){ return (z < 0 ? '-' : '+') + n(Math.abs(z), 2); }; return [['', 'f_{x}=-x,\\qquad f_{y}=-\\dfrac{y}{2}'], ['d', 'f(a,b)=' + n(f(a, b), 2) + ',\\quad f_{x}(a,b)=' + n(fx(a), 2) + ',\\quad f_{y}(a,b)=' + n(fy(a, b), 2)], ['', 'z=' + n(f(a, b), 2) + p(fx(a)) + '\\,(x' + p(-a) + ')' + p(fy(a, b)) + '\\,(y' + p(-b) + ')']]; }
    };
  })());
})();
