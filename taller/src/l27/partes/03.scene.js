/* Visualizar funciones con valores escalares. Dibujo propio; rótulos algebraicos como etiquetas TeX. */
(function(){
  /* ── la idea, en cinco pasos ── */
  OA.scene('cm-escalar-idea', (function(){
    var N = 5, A = 1.2, B = 0.9, CS = [2.875, 2.5, 2, 1];
    function f(x, y){ return 3 - (x*x + y*y)/2; } function rad(c){ return Math.sqrt(2*(3 - c)); }
    var PZ = cmEJ.concat([
      ['Q', '(x,\\,y)\\ \\longmapsto\\ f(x,y)', '(x, y) ↦ f(x, y)', 'pt'], ['XY', '(x,\\,y)', '(x, y)', ''], ['HF', '\\text{altura }f(x,y)', 'altura f(x, y)', 'diff'],
      ['SF', 'z=f(x,y)', 'z = f(x, y)', 'c-sec'], ['ZC', 'z=c', 'z = c', 'c-tan'], ['NC', 'f(x,y)=c', 'f(x, y) = c', 'c-tan'],
      ['E3', '\\text{corte horizontal: }z=c', 'corte horizontal: z = c', ''], ['E4', '\\text{curva de nivel: }f(x,y)=c', 'curva de nivel: f(x, y) = c', ''],
      ['E5', 'f(x,y)=c_{1},\\quad f(x,y)=c_{2},\\quad f(x,y)=c_{3},\\ \\dots', 'f(x, y) = c₁, f(x, y) = c₂, f(x, y) = c₃, …', '']
    ]);
    PZ = PZ.concat([['R1', '(x,y)\\ \\longmapsto\\ f(x,y)\\in\\mathbb{R}', 'paso 1', ''], ['R2', '\\text{gráfica: }\\big\\{(x,\\,y,\\,z):\\ z=f(x,y)\\big\\}', 'paso 2', ''], ['R3', '\\text{corte horizontal: }z=c', 'paso 3', ''], ['R4', '\\text{curva de nivel: }f(x,y)=c', 'paso 4', ''], ['R5', '\\text{mapa: }f(x,y)=c_{1},\\ c_{2},\\ c_{3},\\ \\dots', 'paso 5', '']]);
    var TXT = [
      ['A cada punto del suelo, la función le da un número.', 'Ese número se dibuja como una altura sobre el punto.'],
      ['Con todos los puntos, las alturas forman', 'una superficie: la gráfica de la función.'],
      ['Se corta la superficie con un plano horizontal.', 'En el corte, todos los puntos tienen la misma altura.'],
      ['El corte se baja al suelo.', 'Queda una curva de nivel: ahí la función vale lo mismo.'],
      ['Con varias alturas se obtiene un mapa', 'de curvas de nivel: la superficie vista desde arriba.']
    ];
    return {
      world:{x0:-3.7, x1:3.9, y0:-7.2, y1:4.4}, aspect:11.6/7.6,
      aria:'Animación en cinco pasos. Uno: sobre un punto del suelo se levanta una barra naranja cuya altura es el valor de la función en ese punto. Dos: al hacerlo con todos los puntos aparece una superficie azul con forma de cúpula, la gráfica de la función. Tres: un plano horizontal burdeo baja y corta la cúpula en un círculo. Cuatro: ese círculo baja al suelo y queda dibujado como curva de nivel. Cinco: se repite con cuatro alturas y en el suelo queda un mapa de círculos concéntricos, más juntos hacia afuera, donde la cúpula es más empinada.',
      labels:PZ,
      sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
      legend:'<span><i class="sw rise"></i> la altura \\(f(x,y)\\)</span><span><i class="sw sec"></i> la superficie \\(z=f(x,y)\\)</span><span><i class="sw tan"></i> corte horizontal y curva de nivel</span>',
      anim:{run:32000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = cmSuave((t - Math.floor(t))*1.3); }},
      onInput:function(v){ v.q = null; v.u = 1; },
      draw:function(S, v){
        var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, K = cmKit(S), T = cmEtq(S, PZ), L = T.L, z0 = f(A, B), c0 = 2, i, zc, cc;
        K.suelo(); K.ejes(); cmEjesLab(K, L);
        /* curvas de nivel ya bajadas al suelo */
        if (k === 4) K.path(cmCirc(rad(c0), c0*(1 - u)), C.tan, 2);
        if (k === 5){ CS.forEach(function(q, j){ var w = cmSuave(u*CS.length - j); if (w > 0) K.path(cmCirc(rad(q), q*(1 - w)), C.tan, 1.8); }); }
        if (k >= 2) K.sup(f, -1, 3, k >= 4 ? 0.7 : 1, k === 2 ? 8.5*u : 8);
        /* el punto y su altura */
        if (k <= 2){ var zz = k === 1 ? z0*u : z0; K.dot([A, B, 0], C.ink, 2.4); K.line([A, B, 0], [A, B, zz], C.rise, 2.4); K.dot([A, B, zz], C.rise, 3.4); L('XY', K.at([A, B, 0]), -50, 0, 13); if (u >= 1 || k === 2) L('HF', K.at([A, B, z0/2]), 0, 9, 0); }
        /* corte horizontal */
        if (k === 3){ zc = 3.4 - (3.4 - c0)*u; K.poly([[-2, -2, zc], [2, -2, zc], [2, 2, zc], [-2, 2, zc]], C.tan, 0.16, C.tan); if (zc < 3) K.path(cmCirc(rad(zc), zc), C.tan, 2.2); L('ZC', K.at([-2, 2, zc]), 0, 8, 0); }
        if (k === 4 && u < 1) K.path(cmCirc(rad(c0), c0), C.tan, 1, [3, 3]);
        if (k === 4 && u >= 1) L('NC', K.at([rad(c0)*0.7, rad(c0)*0.72, 0]), 0, 8, 8);
        if (k >= 2) L('SF', [S.X(-3.6), S.Y(2.9)], 0);
        if (k === 1) L('Q', [S.X(-3.6), S.Y(4.0)], 0);
        K.txt(TXT[k - 1][0], -3.6, -2.05); K.txt(TXT[k - 1][1], -3.6, -2.05 - 21/(S.X(1) - S.X(0)));
        K.txt('paso ' + k + ' de ' + N, 3.8, 4.15, C.muted || '#6b6b6b', 11, 'right');
        T.fin();
        oaReg(S, k, N, -3.6, -3.65, [0, 30, 60, 90, 120]);
      },
      caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
      readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['(x,y)\\ \\longmapsto\\ f(x,y)\\in\\mathbb{R}', '\\text{gráfica: }\\big\\{(x,\\,y,\\,z):\\ z=f(x,y)\\big\\}', '\\text{corte con el plano }z=c', '\\text{curva de nivel: }\\big\\{(x,y):\\ f(x,y)=c\\big\\}', '\\text{mapa de curvas de nivel: }f(x,y)=c\\ \\text{ para varios }c'][k - 1]]]; }
    };
  })());

  /* ── galería: cuatro superficies y su corte horizontal ── */
  OA.scene('cm-escalar-galeria', (function(){
    function hip(c, s){ /* x² − y² = 2c, rama s = ±1, recortada a [-2,2]² */ var p = [], i, t, w; for (i = 0; i <= 60; i++){ t = -2 + 4*i/60; if (c >= 0){ w = Math.sqrt(2*c + t*t); if (w <= 2) p.push([s*w, t, c]); } else { w = Math.sqrt(t*t - 2*c); if (w <= 2) p.push([t, s*w, c]); } } return p; }
    function seg(c){ /* 1 + x/2 + y/4 = c dentro de [-2,2]² */ var p = [], i, y, x; for (i = 0; i <= 40; i++){ y = -2 + 4*i/40; x = 2*(c - 1) - y/2; if (Math.abs(x) <= 2) p.push([x, y, c]); } return p; }
    var G = [
      {n:'cuenco (paraboloide)', tex:'z=\\dfrac{x^{2}+y^{2}}{2}', txt:'z = (x² + y²)/2', f:function(x, y){ return (x*x + y*y)/2; }, lo:0, hi:4, c0:0.2, c1:2, cur:function(c){ return [cmCirc(Math.sqrt(2*c), c)]; }, niv:'x^{2}+y^{2}=2c', que:'círculos'},
      {n:'cono', tex:'z=\\sqrt{x^{2}+y^{2}}', txt:'z = √(x² + y²)', f:function(x, y){ return Math.sqrt(x*x + y*y); }, lo:0, hi:2.83, c0:0.2, c1:2, cur:function(c){ return [cmCirc(c, c)]; }, niv:'x^{2}+y^{2}=c^{2}', que:'círculos igualmente espaciados'},
      {n:'silla de montar', tex:'z=\\dfrac{x^{2}-y^{2}}{2}', txt:'z = (x² − y²)/2', f:function(x, y){ return (x*x - y*y)/2; }, lo:-2, hi:2, c0:-1.5, c1:1.5, cur:function(c){ return [hip(c, 1), hip(c, -1)]; }, niv:'x^{2}-y^{2}=2c', que:'hipérbolas'},
      {n:'plano inclinado', tex:'z=1+\\dfrac{x}{2}+\\dfrac{y}{4}', txt:'z = 1 + x/2 + y/4', f:function(x, y){ return 1 + x/2 + y/4; }, lo:-0.5, hi:2.5, c0:0, c1:2, cur:function(c){ return [seg(c)]; }, niv:'\\dfrac{x}{2}+\\dfrac{y}{4}=c-1', que:'rectas paralelas'}
    ];
    var PZ = cmEJ.concat(G.map(function(g, i){ return ['G' + i, g.tex, g.txt, 'c-sec']; })).concat([['ZC', 'z=c', 'z = c', 'c-tan']]);
    return {
      world:{x0:-3.7, x1:3.9, y0:-3.4, y1:5.0}, aspect:8.4/7.6,
      aria:'Galería de cuatro superficies, que se eligen con el deslizador: un cuenco o paraboloide, un cono, una silla de montar y un plano inclinado. Cada una lleva su ecuación. Un plano horizontal burdeo sube y baja y corta la superficie; la curva del corte se dibuja sobre la superficie y, punteada, en el suelo, como curva de nivel. En el cuenco y el cono las curvas de nivel son círculos, en la silla son hipérbolas y en el plano son rectas paralelas.',
      labels:PZ,
      sliders:[{id:'tipo', tex:'\\text{superficie}', min:1, max:4, step:1, value:1}, {id:'c', tex:'\\text{altura del corte}', min:0, max:1, step:0.02, value:0.6}],
      legend:'<span><i class="sw sec"></i> la superficie</span><span><i class="sw tan"></i> el corte \\(z=c\\) y, punteada en el suelo, la curva de nivel</span>',
      anim:{run:28000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(4 - 1e-6, p*4), w = t - Math.floor(t); v.q = p; v.tipo = 1 + Math.floor(t); v.c = 0.5 - 0.5*Math.cos(6.2832*w); }},
      onInput:function(v){ v.q = null; },
      draw:function(S, v){
        var i = Math.max(0, Math.min(3, Math.round(v.tipo || 1) - 1)), g = G[i], w = v.c == null ? 0.6 : +v.c, c = g.c0 + (g.c1 - g.c0)*w, C = S.C, K = cmKit(S), T = cmEtq(S, PZ), L = T.L, cur = g.cur(c);
        K.suelo(); K.ejes(4.0, Math.min(0, g.lo)); cmEjesLab(K, L, 4.0);
        cur.forEach(function(p){ K.path(p.map(function(q){ return [q[0], q[1], 0]; }), C.tan, 1.4, [4, 3]); });
        K.sup(g.f, g.lo, g.hi, 1);
        K.poly([[-2, -2, c], [2, -2, c], [2, 2, c], [-2, 2, c]], C.tan, 0.13, C.tan);
        cur.forEach(function(p){ K.path(p, C.tan, 2.2); });
        L('ZC', K.at([-2, 2, c]), 0, 8, 0); L('G' + i, [S.X(-3.6), S.Y(4.25)], 0);
        K.txt((i + 1) + ' de 4 · ' + g.n, 3.8, 4.75, C.muted || '#6b6b6b', 11.5, 'right');
        T.fin();
      },
      caption:function(v){ var i = Math.max(0, Math.min(3, Math.round(v.tipo || 1) - 1)), g = G[i]; return 'Superficie ' + (i + 1) + ' de 4: ' + g.n + '. El plano horizontal la corta a una altura c; la curva del corte, bajada al suelo, es la curva de nivel. Aquí las curvas de nivel son ' + g.que; },
      readout:function(v){ var i = Math.max(0, Math.min(3, Math.round(v.tipo || 1) - 1)), g = G[i], w = v.c == null ? 0.6 : +v.c, c = g.c0 + (g.c1 - g.c0)*w; return [['', g.tex], ['d', '\\text{curva de nivel }c:\\quad ' + g.niv + ',\\qquad c=' + OA.num(c, 2)]]; }
    };
  })());
})();
