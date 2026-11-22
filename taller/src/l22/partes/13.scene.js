/* registro acumulado: la expresión de cada paso queda escrita, numerada, y se acumula hacia abajo */
function oaReg(S, k, n, xw, yw, FILA){ var c = S.ctx, C = S.C, x0 = S.X(xw), y0 = S.Y(yw), i, act;
  c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Paso a paso, lo que se va obteniendo:', x0, y0 - 24);
  for (i = 0; i < n; i++){ if (i >= k){ S.lab('R' + (i + 1), 0, 0, 0, 0, false); continue; } act = i === k - 1;
    c.beginPath(); c.arc(x0 + 9, y0 + FILA[i], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
    c.font = '700 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (i + 1), x0 + 9, y0 + FILA[i] + 0.5);
    S.lab('R' + (i + 1), x0 + 25, y0 + FILA[i], 0, -50, true); } }
/* Capas cilíndricas. Dibujo propio; rótulos algebraicos como etiquetas TeX. */
(function(){
  var E = 0.25, FNT = '"Source Sans 3", system-ui, sans-serif';
  function kit(S){
    var c = S.ctx, X = S.X, Y = S.Y, C = S.C, s = X(1) - X(0), K = {};
    K.txt = function(t, x, y, col, sz, al, b){ c.font = (b ? '700 ' : '600 ') + (sz || 12.5) + 'px ' + FNT; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); };
    K.capa = function(r, h, col, alpha, dash){
      c.beginPath(); c.moveTo(X(-r), Y(h)); c.lineTo(X(-r), Y(0)); c.ellipse(X(0), Y(0), r*s, E*r*s, 0, Math.PI, 0, true); c.lineTo(X(r), Y(h)); c.ellipse(X(0), Y(h), r*s, E*r*s, 0, 0, Math.PI, true); c.closePath();
      if (alpha){ var g = c.createLinearGradient(X(-r), 0, X(r), 0); g.addColorStop(0, col); g.addColorStop(0.35, '#ffffff'); g.addColorStop(1, col); c.globalAlpha = alpha*0.5; c.fillStyle = g; c.fill(); c.globalAlpha = alpha*0.45; c.fillStyle = col; c.fill(); c.globalAlpha = 1; }
      c.strokeStyle = col; c.lineWidth = 1; if (dash) c.setLineDash([3, 3]); c.stroke();
      c.beginPath(); c.ellipse(X(0), Y(h), r*s, E*r*s, 0, 0, 6.2832); if (alpha){ c.globalAlpha = alpha*0.25; c.fillStyle = col; c.fill(); c.globalAlpha = 1; } c.stroke(); c.setLineDash([]);
    };
    K.eje = function(y0, y1){ c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([6, 4]); c.beginPath(); c.moveTo(X(0), Y(y0)); c.lineTo(X(0), Y(y1)); c.stroke(); c.setLineDash([]); };
    K.curva = function(f, a, b, col, w, sgn){ var i, x; c.strokeStyle = col; c.lineWidth = w; c.beginPath(); for (i = 0; i <= 60; i++){ x = a + (b - a)*i/60; if (i) c.lineTo(X(sgn*x), Y(f(x))); else c.moveTo(X(sgn*x), Y(f(x))); } c.stroke(); };
    K.region = function(f, a, b, col, alpha){ var p = [[a, 0]], i, x; for (i = 0; i <= 60; i++){ x = a + (b - a)*i/60; p.push([x, f(x)]); } p.push([b, 0]); S.poly(p, {fill:col, alpha:alpha}); };
    K.seg = function(x0, y0, x1, y1, col, w){ c.strokeStyle = col; c.lineWidth = w || 2; c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); };
    K.tira = function(x, w, h){ c.fillStyle = C.ink; c.globalAlpha = 0.85; c.fillRect(X(x - w/2), Y(h), w*s, Y(0) - Y(h)); c.globalAlpha = 1; };
    return K;
  }
  function etiquetas(S, PZ){ var on = {}; return { L:function(id, x, y, ax, ay){ on[id] = 1; S.lab(id, S.X(x), S.Y(y), ax == null ? -50 : ax, ay == null ? -50 : ay, true); }, fin:function(){ PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); }); } }; }

  /* ── la idea, en siete pasos, con una curva cualquiera ── */
  OA.scene('apl-capas-idea', (function(){
    var N = 7, A = 0.5, B = 2.6, XC = 1.7, DX = 0.22;
    function f(x){ return 2.2 - 0.22*x*x + 0.15*x; }
    var PZ = [
      ['Q', 'V=\\ ?', 'V = ?', 'pt'], ['E7', 'V=\\displaystyle\\int_{a}^{b}2\\pi\\,x\\,f(x)\\,dx', 'V = ∫ de a a b de 2π x f(x) dx', 'diff'],
      ['YF', 'y=f(x)', 'y = f(x)', 'c-sec'], ['LA', 'a', 'a', ''], ['LB', 'b', 'b', ''], ['LX', 'x', 'x', ''],
      ['LR', 'r=x', 'r = x', 'diff'], ['LH', 'h=f(x)', 'h = f(x)', 'c-sec'], ['LD', '\\text{espesor }dx', 'espesor dx', 'c-alt'],
      ['R2', '2\\pi r', '2πr', 'diff'], ['RH', 'h', 'h', 'c-sec'], ['RD', 'dx', 'dx', 'c-alt'],
      ['E2', 'r=x,\\qquad h=f(x)', 'r = x, h = f(x)', ''], ['E4', '\\text{área}=2\\pi r\\cdot h', 'área = 2πr · h', ''],
      ['E5', 'dV=2\\pi r\\cdot h\\cdot dx=2\\pi\\,x\\,f(x)\\,dx', 'dV = 2πr · h · dx = 2π x f(x) dx', ''],
      ['E6', 'V\\approx\\displaystyle\\sum 2\\pi\\,x\\,f(x)\\,\\Delta x', 'V ≈ suma de 2π x f(x) Δx', '']
    ];
    PZ = PZ.concat([['R1', 'V=\\ ?', 'paso 1', ''], ['R2', 'r=x,\\qquad h=f(x)', 'paso 2', ''], ['R3', '\\text{la tira gira}\\ \\longrightarrow\\ \\text{capa cilíndrica}', 'paso 3', ''], ['R4', '\\text{área de la capa}=2\\pi r\\cdot h', 'paso 4', ''], ['R5', 'dV=2\\pi r\\cdot h\\cdot dx=2\\pi\\,x\\,f(x)\\,dx', 'paso 5', ''], ['R6', 'V\\approx\\displaystyle\\sum 2\\pi\\,x\\,f(x)\\,\\Delta x', 'paso 6', ''], ['R7', 'V=\\displaystyle\\int_{a}^{b}2\\pi\\,x\\,f(x)\\,dx', 'paso 7', '']]);
    var TXT = [
      ['Una región gira alrededor de un eje vertical', 'y forma un sólido. ¿Cuánto mide su volumen?'],
      ['Se toma una tira vertical, paralela al eje.', 'Importan su distancia al eje y su altura.'],
      ['Al girar, la tira barre una capa cilíndrica:', 'un tubo de pared delgada.'],
      ['La capa se corta de arriba abajo y se estira.', 'Largo: la vuelta completa. Alto: el de la tira.'],
      ['El rectángulo tiene el espesor de la tira.', 'Su volumen es largo por alto por espesor.'],
      ['El sólido es la suma de todas las capas,', 'una dentro de otra, desde la primera hasta la última.'],
      ['Sumar infinitas capas delgadas es integrar.', 'La pregunta de arriba ya tiene respuesta.']
    ];
    return {
      world:{x0:-3.0, x1:7.4, y0:-10.9, y1:3.7}, aspect:14.6/10.4,
      aria:'Animación en siete pasos, con una curva cualquiera y igual a f de x. Uno: la región bajo la curva, entre x igual a a y x igual a b, y el eje de giro vertical; arriba, la pregunta V igual a signo de interrogación. Dos: una tira vertical en la posición x, de altura h igual a f de x, a distancia r igual a x del eje y de espesor dx. Tres: al girar, la tira barre una capa cilíndrica, un tubo de pared delgada. Cuatro: la capa se corta y se estira en un rectángulo de largo 2 pi r y alto h. Cinco: con su espesor dx, el volumen de la capa es 2 pi r por h por dx. Seis: el sólido se arma con todas las capas, una dentro de otra, en colores. Siete: la suma se escribe como la integral de a a b de 2 pi x f de x dx, que reemplaza a la pregunta.',
      labels:PZ,
      sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
      legend:'<span><i class="sw sec"></i> la curva y la altura \\(h\\)</span><span><i class="sw rise"></i> radio \\(r\\) y largo \\(2\\pi r\\)</span><span><i class="sw tan"></i> la capa</span><span><i class="sw alt"></i> espesor \\(dx\\)</span>',
      anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = Math.min(1, (t - Math.floor(t))*1.5); }},
      onInput:function(v){ v.q = null; v.u = 1; },
      draw:function(S, v){
        var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, K = kit(S), T = etiquetas(S, PZ), L = T.L, h0 = f(XC), i, r, M, cols = [C.sec, C.tan, C.rise, C.alt];
        if (k < N) L('Q', -2.9, 3.3, 0); else L('E7', -2.9, 3.2, 0);
        /* suelo y eje */
        K.seg(-2.9, 0, 3.1, 0, C.ink, 1); K.eje(-0.9, 3.0); K.txt('eje de giro', -0.12, 2.9, C.ink, 10.5, 'right');
        if (k >= 3 && k <= 5){ K.capa(B, f(B), 'rgba(31,95,138,0.4)', 0); K.capa(A, f(A), 'rgba(31,95,138,0.4)', 0, true); K.curva(f, A, B, 'rgba(31,95,138,0.4)', 1, -1); }
        if (k <= 5){ K.region(f, A, B, C.sec, k >= 3 ? 0.1 : 0.22); K.curva(f, A, B, C.sec, 1.6, 1); L('YF', B + 0.12, f(B) + 0.35, 0); L('LA', A, -0.3); L('LB', B, -0.3); }
        if (k === 2 || k === 3){ K.tira(XC, DX, h0); K.seg(0, 0, XC, 0, C.rise, 3); L('LR', XC/2 + 0.25, -0.75); K.seg(XC + DX/2 + 0.06, 0, XC + DX/2 + 0.06, h0, C.sec, 2);
          if (k === 2){ L('LH', XC + 0.35, h0*0.25, 0); K.seg(XC, h0 + 0.03, XC + 0.55, h0 + 0.75, C.ink, 1); L('LD', XC + 0.6, h0 + 0.9, 0); } }
        if (k === 3){ c.globalAlpha = u; K.capa(XC, h0, C.tan, 0.8); c.globalAlpha = 1; }
        if (k === 4 || k === 5){
          K.capa(XC, h0, C.tan, 0.35);
          /* la capa, cortada y estirada */
          var x0 = 4.2, w = 2.75*u + 0.2*(1 - u), y0 = 0.35, hh = h0*0.9, d = k === 5 ? 0.22 : 0;
          if (d){ S.poly([[x0, y0 + hh], [x0 + d, y0 + hh + d*0.7], [x0 + w + d, y0 + hh + d*0.7], [x0 + w + d, y0 + d*0.7], [x0 + w, y0], [x0, y0]], {fill:C.tan, alpha:0.75}); }
          S.poly([[x0, y0], [x0 + w, y0], [x0 + w, y0 + hh], [x0, y0 + hh]], {fill:C.tan, alpha:0.45}); c.strokeStyle = C.tan; c.lineWidth = 1.2; c.strokeRect(X(x0), Y(y0 + hh), X(x0 + w) - X(x0), Y(y0) - Y(y0 + hh));
          if (u >= 1){ K.seg(x0, y0 - 0.14, x0 + w, y0 - 0.14, C.rise, 2.5); L('R2', x0 + w/2, y0 - 0.55); K.seg(x0 - 0.14, y0, x0 - 0.14, y0 + hh, C.sec, 2.5); L('RH', x0 - 0.4, y0 + hh/2);
            if (d){ K.seg(x0 + w + 0.05, y0 - 0.06, x0 + w + d + 0.05, y0 + d*0.7 - 0.06, C.alt, 2.5); L('RD', x0 + w + d + 0.2, y0 - 0.2, 0); }
            K.txt(k === 4 ? 'la capa, cortada y estirada' : 'con su espesor', x0 + w/2, y0 + hh + (d ? 0.55 : 0.35), C.tan, 11.5, 'center'); }
        }
        if (k >= 6){ M = k === 6 ? 7 : 14; var m = k === 6 ? Math.max(1, Math.round(u*M)) : M; for (i = Math.min(m, M) - 1; i >= 0; i--){ r = A + (B - A)*(i + 0.5)/M; K.capa(r + (B - A)/(2*M), f(r), k === 6 ? cols[i % 4] : C.sec, k === 6 ? 0.85 : 0.6); } K.eje(-0.9, 3.0); L('LA', A, -0.95); L('LB', B, -0.95); }
        /* ecuación del paso y frases */
        K.txt(TXT[k - 1][0], -2.9, -1.95); K.txt(TXT[k - 1][1], -2.9, -1.95 - 21/(X(1) - X(0)));
        K.txt('paso ' + k + ' de ' + N, 7.3, 3.45, C.muted || '#6b6b6b', 11, 'right');
        T.fin();
        oaReg(S, k, N, -2.9, -3.95, [0, 28, 56, 84, 112, 148, 194]);
      },
      caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
      readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['V=\\ ?', 'r=x,\\qquad h=f(x)', '\\text{la tira gira}\\ \\longrightarrow\\ \\text{capa cilíndrica}', '\\text{área de la capa}=2\\pi r\\cdot h=2\\pi\\,x\\,f(x)', 'dV=2\\pi\\,x\\,f(x)\\,dx', '\\displaystyle V\\approx\\sum 2\\pi\\,x\\,f(x)\\,\\Delta x', '\\displaystyle V=\\int_{a}^{b}2\\pi\\,x\\,f(x)\\,dx'][k - 1]]]; }
    };
  })());

  /* ── ejemplo 1: y = 4 − x² gira alrededor del eje y ── */
  OA.scene('apl-capas-x', (function(){
    function f(x){ return 4 - x*x; }
    function V(x){ return 2*Math.PI*(2*x*x - x*x*x*x/4); }
    var PZ = [['PF', 'y=4-x^{2}', 'y = 4 − x²', 'c-sec'], ['PR', 'r=x', 'r = x', 'diff'], ['PH', 'h=4-x^{2}', 'h = 4 − x²', 'c-sec'], ['PD', '\\text{espesor }dx', 'espesor dx', 'c-alt'], ['F', 'V=\\displaystyle\\int_{0}^{2}2\\pi\\,x\\left(4-x^{2}\\right)dx=8\\pi', 'V = ∫ de 0 a 2 de 2π x(4 − x²) dx = 8π', 'diff']];
    return {
      world:{x0:-2.8, x1:4.4, y0:-2.5, y1:5.0}, aspect:7.5/7.2, _chk:[{f:V, df:function(x){ return 2*Math.PI*x*f(x); }, at:[0.4, 1, 1.5, 1.9]}],
      aria:'La región bajo la parábola y igual a 4 menos x al cuadrado, entre x igual a 0 y x igual a 2, gira alrededor del eje y. Una tira vertical negra, de espesor dx, está en la posición x: su distancia al eje es r igual a x y su altura es h igual a 4 menos x al cuadrado. Al girar forma una capa cilíndrica burdeo. Al avanzar x de 0 a 2, las capas se van sumando desde el eje hacia afuera y el volumen acumulado llega a 8 pi.',
      labels:PZ,
      sliders:[{id:'x', tex:'x', min:0.1, max:2, step:0.05, value:0.1}],
      legend:'<span><i class="sw sec"></i> \\(y=4-x^{2}\\) y la altura \\(h\\)</span><span><i class="sw rise"></i> radio \\(r=x\\)</span><span><i class="sw tan"></i> la capa en \\(x\\)</span>',
      anim:{run:16000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = 0.1 + 1.9*p; }},
      onInput:function(v){ v.q = null; },
      draw:function(S, v){
        var x = v.x == null ? 0.1 : +v.x, C = S.C, K = kit(S), T = etiquetas(S, PZ), L = T.L, h = f(x), i, r, n = Math.floor(x/0.2);
        K.seg(-2.7, 0, 3.0, 0, C.ink, 1);
        for (i = n - 1; i >= 0; i--){ r = 0.2*(i + 1); if (r < x - 0.05) K.capa(r, f(r - 0.1), C.sec, 0.35); }
        K.capa(x, h, C.tan, 0.75);
        K.curva(f, 0, 2, C.sec, 1.6, 1); K.curva(f, 0, 2, 'rgba(31,95,138,0.4)', 1, -1); K.region(f, 0, 2, C.sec, 0.1);
        K.eje(-0.7, 4.7); K.txt('eje de giro', 0.1, 4.6, C.ink, 10.5);
        K.tira(x, 0.1, h); K.seg(0, 0, x, 0, C.rise, 3); K.seg(x + 0.09, 0, x + 0.09, h, C.sec, 2);
        L('PF', 2.15, 1.3, 0); L('PR', Math.max(0.45, x/2), -0.45); L('PH', 3.0, 3.6, 0); K.seg(2.95, 3.6, x + 0.12, Math.max(0.2, h*0.6), C.sec, 0.8);
        L('PD', 3.0, 4.4, 0); K.seg(2.95, 4.4, x, h + 0.04, C.ink, 0.8);
        L('F', -2.7, -1.55, 0, -50);
        T.fin();
      },
      caption:function(v){ var x = v.x == null ? 0.1 : +v.x, d = function(z, n){ return z.toFixed(n).replace('.', ','); }; return x >= 2 ? 'La última capa está en el borde, donde la altura es 0. El volumen total es 8π, cerca de 25,13 unidades cúbicas' : 'La tira está a distancia ' + d(x, 2) + ' del eje y mide ' + d(f(x), 2) + ' de alto. Al girar forma la capa burdeo. El volumen sumado desde el eje hasta aquí es cerca de ' + d(V(x), 2); },
      readout:function(v){ var x = v.x == null ? 0.1 : +v.x, n = OA.num; return [['', 'dV=2\\pi\\,r\\,h\\,dx=2\\pi\\,x\\left(4-x^{2}\\right)dx'], ['d', '\\displaystyle\\int_{0}^{x}2\\pi\\,t\\left(4-t^{2}\\right)dt=2\\pi\\left(2x^{2}-\\dfrac{x^{4}}{4}\\right)'], ['', 'x=' + n(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + n(V(x), 2) + '\\ \\longrightarrow\\ 8\\pi']]; }
    };
  })());
})();
