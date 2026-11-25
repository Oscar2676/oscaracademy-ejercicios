/* L28 H02 · desarrollo por la primera fila */
OA.scene('det3-idea', (function(){
  var N = 5, LET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  var PZ = LET.map(function(l, j){ return ['M' + j, l, l, '']; }).concat([
    ['Q', '\\det A=\\ ?', 'det A = ?', 'pt'], ['F', '\\small\\Longrightarrow\\ a(ei-fh)-b(di-fg)+c(dh-eg)', '⟹ a(ei − fh) − b(di − fg) + c(dh − eg)', 'diff'],
    ['N2', '+\\,a\\begin{vmatrix}e&f\\\\h&i\\end{vmatrix}', '+ a |e f; h i|', 'diff'], ['N3', '-\\,b\\begin{vmatrix}d&f\\\\g&i\\end{vmatrix}', '− b |d f; g i|', 'diff'], ['N4', '+\\,c\\begin{vmatrix}d&e\\\\g&h\\end{vmatrix}', '+ c |d e; g h|', 'diff'],
    ['R1', '\\text{se recorre la primera fila: }a,\\ b,\\ c', 'primera fila: a, b, c', ''],
    ['R2', '+\\,a\\begin{vmatrix}e&f\\\\h&i\\end{vmatrix}=a\\,(ei-fh)', '+ a(ei − fh)', ''],
    ['R3', '-\\,b\\begin{vmatrix}d&f\\\\g&i\\end{vmatrix}=-\\,b\\,(di-fg)', '− b(di − fg)', ''],
    ['R4', '+\\,c\\begin{vmatrix}d&e\\\\g&h\\end{vmatrix}=c\\,(dh-eg)', '+ c(dh − eg)', ''],
    ['R5', '\\det A=a(ei-fh)-b(di-fg)+c(dh-eg)', 'det A = a(ei − fh) − b(di − fg) + c(dh − eg)', 'diff']]);
  var TXT = [['Una matriz de tres filas y tres columnas.', 'Su determinante se arma con la primera fila.'],
    ['Primera entrada. Se tapan su fila y su columna:', 'quedan cuatro casillas. Signo más.'],
    ['Segunda entrada. Se tapan su fila y su columna:', 'quedan otras cuatro casillas. Signo menos.'],
    ['Tercera entrada. Se tapan su fila y su columna:', 'quedan las cuatro de la izquierda. Signo más.'],
    ['Se suman los tres aportes, con sus signos.', 'La pregunta de arriba ya tiene respuesta.']];
  function cx(j){ return (j % 3)*0.95; } function cy(j){ return 2.75 - Math.floor(j/3)*0.9; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-5.45, y1:4.95}, aspect:10.4/6.6,
    aria:'Animación en cinco pasos. Uno: una matriz de tres por tres con entradas a, b, c en la primera fila, d, e, f en la segunda y g, h, i en la tercera. Dos: se marca la entrada a, se tapan su fila y su columna, y quedan las casillas e, f, h, i; a la derecha se escribe más a por el determinante de esas cuatro. Tres: lo mismo con b; quedan d, f, g, i, con signo menos. Cuatro: lo mismo con c; quedan d, e, g, h, con signo más. Cinco: se suman los tres aportes. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> entrada de la primera fila que se usa</span><span><i class="sw sec"></i> las cuatro casillas que quedan: su menor</span>',
    anim:{run:26000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', j, col = k - 2, s = X(1) - X(0), hw = 0.36;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* barras del determinante */
      c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(-0.55), Y(3.25)); c.lineTo(X(-0.55), Y(0.45)); c.moveTo(X(2.45), Y(3.25)); c.lineTo(X(2.45), Y(0.45)); c.stroke();
      if (k >= 2 && k <= 4){
        /* las cuatro casillas que quedan */
        for (j = 3; j < 9; j++) if (j % 3 !== col){ c.globalAlpha = 0.24*u; c.fillStyle = C.sec; c.fillRect(X(cx(j) - hw), Y(cy(j) + hw), 2*hw*s, 2*hw*s); c.globalAlpha = 1; }
        /* fila y columna tapadas: las franjas crecen */
        c.globalAlpha = 0.16; c.fillStyle = C.ink; c.fillRect(X(-0.45), Y(cy(0) + 0.3), (2.8*u)*s, 0.6*s); c.fillRect(X(cx(col) - 0.3), Y(cy(0) + 0.3), 0.6*s, (2.4*u)*s); c.globalAlpha = 1;
        /* la entrada que se usa */
        c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.arc(X(cx(col)), Y(cy(0)), 13, 0, 6.2832); c.stroke();
      }
      /* las entradas ya usadas quedan marcadas con un círculo fino hasta el final (nada desaparece) */
      for (j = 0; j < Math.min(k - 2, 3); j++) if (k > 4 || j !== col){ c.save(); c.globalAlpha = 0.55; c.strokeStyle = C.rise; c.lineWidth = 1.2; c.beginPath(); c.arc(X(cx(j)), Y(cy(0)), 13, 0, 6.2832); c.stroke(); c.restore(); }
      /* los aportes ya obtenidos no se borran: quedan uno bajo el otro */
      for (j = 2; j <= Math.min(k, 4); j++) if (j < k || u > 0.45){ var yj = 2.75 - (j - 2)*0.9, cj = j - 2, rr, cc, q = 0.15;
        /* mini matriz de ese paso: fila y columna tapadas en gris, las cuatro casillas del menor en azul, la entrada usada en naranja. Queda hasta el final */
        for (rr = 0; rr < 3; rr++) for (cc = 0; cc < 3; cc++){ c.globalAlpha = (rr === 0 || cc === cj) ? 0.16 : 0.4; c.fillStyle = (rr === 0 || cc === cj) ? C.ink : C.sec; c.fillRect(X(2.7 + cc*q) + 0.5, Y(yj + 1.5*q - rr*q) + 0.5, q*s - 1, q*s - 1); }
        c.globalAlpha = 1; c.strokeStyle = C.rise; c.lineWidth = 1.4; c.strokeRect(X(2.7 + cj*q), Y(yj + 1.5*q), q*s, q*s);
        L('N' + j, 3.3, yj, 0); }
      for (j = 0; j < 9; j++) L('M' + j, cx(j), cy(j));
      L('Q', -1.2, 3.72, 0); if (k === 5 && u > 0.5) L('F', 0.12, 3.72, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, -0.15); txt(TXT[k - 1][1], -1.2, -0.15 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(0.3));
      dtQue(S, 'cómo se arma con la primera fila:', 'cada entrada, por el menor que queda al tapar.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.7, [0, 38, 80, 122, 160]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}', '+\\,a\\begin{vmatrix}e&f\\\\h&i\\end{vmatrix}=a\\,(ei-fh)', '-\\,b\\begin{vmatrix}d&f\\\\g&i\\end{vmatrix}=-\\,b\\,(di-fg)', '+\\,c\\begin{vmatrix}d&e\\\\g&h\\end{vmatrix}=c\\,(dh-eg)', '\\det A=a(ei-fh)-b(di-fg)+c(dh-eg)']; return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: el determinante como volumen (base fija, altura h) */
OA.scene('det3-vol', (function(){
  var U = [2, 0, 0], V = [1, 2, 0];
  var PZ = [['PU', '\\vec u', 'u', 'c-sec'], ['PV', '\\vec v', 'v', 'diff'], ['PW', '\\vec w', 'w', 'c-tan'], ['PH', 'h', 'h', 'c-tan']];
  function pr(p){ return [p[0] + 0.55*p[1], p[2] + 0.32*p[1]]; }
  return {
    world:{x0:-0.9, x1:5.5, y0:-3.6, y1:4.6}, aspect:8.2/6.4,
    aria:'Un paralelepípedo dibujado en tres dimensiones. Su base, en el suelo, es el paralelogramo de los vectores u igual a (2, 0, 0) y v igual a (1, 2, 0), de área 4. El tercer vector, w igual a (un medio, un medio, h), sube o baja con h. Con h positivo el cuerpo queda sobre el suelo y es burdeo; con h igual a cero se aplasta y no tiene volumen; con h negativo queda bajo el suelo y es verde. Bajo el dibujo se calcula el determinante, 4 por h, y el volumen, su valor absoluto.',
    labels:PZ,
    sliders:[{id:'h', tex:'h', min:-2, max:2.5, step:0.1, value:2}],
    legend:'<span><i class="sw sec"></i> \\(\\vec u\\)</span><span><i class="sw rise"></i> \\(\\vec v\\)</span><span><i class="sw tan"></i> \\(\\vec w\\) y el cuerpo, con \\(h\\gt 0\\)</span><span><i class="sw alt"></i> el cuerpo, con \\(h\\lt 0\\)</span>',
    anim:{run:18000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.h = 2.5 - 4.5*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var h = v.h == null ? 2 : +v.h, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), W = [0.5, 0.5, h], F = '"Source Sans 3", system-ui, sans-serif', col = h >= 0 ? C.tan : C.alt, t;
      function ad(p, q){ return [p[0] + q[0], p[1] + q[1], p[2] + q[2]]; }
      function Q(p){ var m = pr(p); return [m[0], m[1]]; }
      function cara(ps, a){ S.poly(ps.map(Q), {fill:col, alpha:a}); c.strokeStyle = col; c.lineWidth = 1.1; c.beginPath(); ps.forEach(function(p, i){ var m = Q(p); if (i) c.lineTo(X(m[0]), Y(m[1])); else c.moveTo(X(m[0]), Y(m[1])); }); c.closePath(); c.stroke(); }
      function fl(p, cl){ var m = Q(p); dtFlecha(S, 0, 0, m[0], m[1], cl, 2); }
      var O = [0, 0, 0], UV = ad(U, V), base = [O, U, UV, V], top = base.map(function(p){ return ad(p, W); }), i;
      /* suelo */
      S.poly([[-0.7, -0.25], [3.6, -0.25], [5.2, 1.0], [0.9, 1.0]].map(function(p){ return p; }), {fill:C.ink, alpha:0.05});
      if (h < 0) { cara(top, 0.3); for (i = 0; i < 4; i++) cara([base[i], base[(i + 1) % 4], top[(i + 1) % 4], top[i]], 0.16); }
      S.poly(base.map(Q), {fill:C.ink, alpha:0.12}); c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([4, 3]); c.beginPath(); base.forEach(function(p, j){ var m = Q(p); if (j) c.lineTo(X(m[0]), Y(m[1])); else c.moveTo(X(m[0]), Y(m[1])); }); c.closePath(); c.stroke(); c.setLineDash([]);
      if (h > 0) { for (i = 0; i < 4; i++) cara([base[i], base[(i + 1) % 4], top[(i + 1) % 4], top[i]], 0.16); cara(top, 0.3); }
      fl(U, C.sec); fl(V, C.rise); fl(W, C.tan);
      /* altura h: del extremo de w hasta el suelo */
      var w0 = Q([0.5, 0.5, 0]), w1 = Q(W); c.strokeStyle = C.tan; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(w0[0]), Y(w0[1])); c.lineTo(X(w1[0]), Y(w1[1])); c.stroke(); c.setLineDash([]);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      T.L('PU', Q(U)[0], Q(U)[1], -50, 0, 13); T.L('PV', Q(V)[0], Q(V)[1], 0, 8, -4); T.L('PW', w1[0], w1[1], -100, -8, h >= 0 ? -8 : 10); if (Math.abs(h) > 0.35) T.L('PH', w0[0], (w0[1] + w1[1])/2, 0, 6, 0);
      t = Math.abs(h) < 0.05 ? ['Determinante cero: el cuerpo se aplasta, sin volumen', C.ink] : (h > 0 ? ['Determinante positivo: el cuerpo sobre el suelo', C.tan] : ['Determinante negativo: el cuerpo bajo el suelo', C.alt]);
      c.font = '600 12.5px ' + F; c.fillStyle = t[1]; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t[0], X(-0.8), Y(-3.2));
      dtQue(S, 'el determinante es el volumen del cuerpo,', 'con signo: base (4) por altura (h). Sube y baja h.');
      T.fin();
    },
    caption:function(v){ var R = function(z){ return Math.round(z*100)/100; }, N = function(z){ return '\\(' + OA.num(R(z), 2) + '\\)'; }, M = function(t){ return '\\(' + t + '\\)'; }, n2 = function(z){ return OA.num(R(z), 2); }, h = R(v.h == null ? 2 : +v.h); return 'Con ' + M('h=' + n2(h)) + ' el determinante vale ' + N(4*h) + ' y el cuerpo mide ' + N(Math.abs(4*h)) + ' unidades cúbicas: área de la base, ' + M('4') + ', por altura, ' + N(Math.abs(h)); },
    readout:function(v){ var h = Math.round((v.h == null ? 2 : +v.h)*100)/100, D = Math.round(4*h*100)/100, n = OA.num, p = function(z){ return z < 0 ? '(' + n(z, 2) + ')' : n(z, 2); };
      return dtPasos(['\\text{columnas: }\\vec u=(2,0,0),\\ \\vec v=(1,2,0),\\ \\vec w=\\left(\\tfrac12,\\tfrac12,h\\right)',
        '\\begin{vmatrix}2&1&\\frac12\\\\0&2&\\frac12\\\\0&0&h\\end{vmatrix}\\ \\text{se desarrolla por la primera fila:}',
        '=2\\begin{vmatrix}2&\\frac12\\\\0&h\\end{vmatrix}-1\\begin{vmatrix}0&\\frac12\\\\0&h\\end{vmatrix}+\\tfrac12\\begin{vmatrix}0&2\\\\0&0\\end{vmatrix}',
        '\\begin{vmatrix}2&\\frac12\\\\0&h\\end{vmatrix}=2\\cdot h-\\tfrac12\\cdot 0=2h',
        '\\begin{vmatrix}0&\\frac12\\\\0&h\\end{vmatrix}=0\\cdot h-\\tfrac12\\cdot 0=0',
        '\\begin{vmatrix}0&2\\\\0&0\\end{vmatrix}=0\\cdot 0-2\\cdot 0=0',
        '\\text{determinante}=2\\cdot 2h-1\\cdot 0+\\tfrac12\\cdot 0=4h',
        '4h=4\\cdot ' + p(h) + '=' + n(D, 2),
        '\\text{volumen}=\\left|' + n(D, 2) + '\\right|=' + n(Math.abs(D), 2)]); }
  };
})());
