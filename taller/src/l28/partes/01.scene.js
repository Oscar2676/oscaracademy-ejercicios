/* L28 H01 · de dónde sale ad − bc: rectángulo que encierra al paralelogramo, menos lo que sobra */
OA.scene('det2-idea', (function(){
  var N = 6, a = 3, cc = 1, b = 1, d = 2;
  var PZ = [['Q', '\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=\\ ?', 'det = ?', 'pt'], ['F', '\\Longrightarrow\\quad\\det\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix}=ad-bc', '⟹ det = ad − bc', 'diff'],
    ['LU', '\\vec u=(a,c)', 'u = (a, c)', 'c-sec'], ['LV', '\\vec v=(b,d)', 'v = (b, d)', 'diff'],
    ['La', 'a', 'a', ''], ['Lb', 'b', 'b', ''], ['Lc', 'c', 'c', ''], ['Ld', 'd', 'd', ''],
    ['B1', 'bc', 'bc', 'c-alt'], ['B2', 'bc', 'bc', 'c-alt'],
    ['T1', '\\tfrac{ac}{2}', 'ac/2', 'c-sec'], ['T2', '\\tfrac{ac}{2}', 'ac/2', 'c-sec'], ['T3', '\\tfrac{bd}{2}', 'bd/2', 'diff'], ['T4', '\\tfrac{bd}{2}', 'bd/2', 'diff'],
    ['AR', 'ad-bc', 'ad − bc', 'c-tan'],
    ['R1', 'A=\\begin{pmatrix}a&b\\\\c&d\\end{pmatrix},\\quad \\vec u=(a,c),\\quad \\vec v=(b,d)', 'columnas u y v', ''],
    ['R2', '\\text{Área del paralelogramo}=\\ ?', 'Área = ?', ''],
    ['R3', '\\text{rectángulo: }(a+b)(c+d)', 'rectángulo (a + b)(c + d)', ''],
    ['R4', '\\text{sobran dos rectángulos: }2\\cdot bc', 'menos 2bc', ''],
    ['R5', '\\text{y cuatro triángulos: }2\\cdot\\tfrac{ac}{2}+2\\cdot\\tfrac{bd}{2}=ac+bd', 'menos ac + bd', ''],
    ['R6', '\\text{Área}=(a+b)(c+d)-2bc-ac-bd=ad-bc', 'Área = ad − bc', 'diff']];
  var TXT = [['Las dos columnas de la matriz se dibujan como flechas', 'que salen del mismo punto.'],
    ['Las dos flechas forman un paralelogramo.', '¿Cuánto mide su área?'],
    ['Se encierra en un rectángulo fácil de medir:', 'su ancho y su alto se leen en las cotas.'],
    ['Entre el rectángulo y el paralelogramo sobran piezas.', 'Primero, dos rectángulos iguales.'],
    ['También sobran cuatro triángulos rectángulos,', 'iguales de dos en dos.'],
    ['Al rectángulo se le quita todo lo que sobra.', 'Queda el área: es el determinante.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.45, y1:4.95}, aspect:11.4/6.6,
    aria:'Animación en seis pasos. Uno: las columnas de la matriz, u igual a (a, c) y v igual a (b, d), dibujadas como dos flechas desde el origen. Dos: el paralelogramo que forman. Tres: un rectángulo de ancho a más b y alto c más d que lo encierra. Cuatro: entre el rectángulo y el paralelogramo sobran dos rectángulos de área b por c. Cinco: sobran también cuatro triángulos rectángulos, dos de área a por c sobre 2 y dos de área b por d sobre 2. Seis: al área del rectángulo se le resta lo que sobra y queda a por d menos b por c. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(\\vec u=(a,c)\\), primera columna</span><span><i class="sw rise"></i> \\(\\vec v=(b,d)\\), segunda columna</span><span><i class="sw tan"></i> paralelogramo</span><span><i class="sw alt"></i> rectángulos que sobran</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif';
      var W = a + b, H = cc + d, al;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n */
      function fr(n){ return ap(n); } /* las piezas que sobran no se borran: quedan hasta el final */
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function cota(x0, y0, x1, y1){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); var h = Math.abs(y1 - y0) < 1e-9; if (h){ c.moveTo(X(x0), Y(y0) - 3); c.lineTo(X(x0), Y(y0) + 3); c.moveTo(X(x1), Y(y1) - 3); c.lineTo(X(x1), Y(y1) + 3); } else { c.moveTo(X(x0) - 3, Y(y0)); c.lineTo(X(x0) + 3, Y(y0)); c.moveTo(X(x1) - 3, Y(y1)); c.lineTo(X(x1) + 3, Y(y1)); } c.stroke(); }
      /* ejes finos */
      S.line(-0.5, 0, W + 0.7, 0, {color:'rgba(0,0,0,0.35)', width:1}); S.line(0, -0.4, 0, H + 0.6, {color:'rgba(0,0,0,0.35)', width:1});
      /* rectángulo que encierra (paso 3) */
      al = ap(3);
      if (al > 0){ c.strokeStyle = C.ink; c.lineWidth = 1.4; var per = 2*(W + H), g = al*per, P = [[0, 0], [W, 0], [W, H], [0, H], [0, 0]], i, seg, q; c.beginPath(); c.moveTo(X(0), Y(0));
        for (i = 0; i < 4 && g > 0; i++){ seg = (i % 2 === 0) ? W : H; q = Math.min(1, g/seg); c.lineTo(X(P[i][0] + (P[i + 1][0] - P[i][0])*q), Y(P[i][1] + (P[i + 1][1] - P[i][1])*q)); g -= seg; } c.stroke(); c.globalAlpha = 1; }
      /* piezas que sobran: dos rectángulos bc (paso 4) y cuatro triángulos (paso 5) */
      if (ap(4) > 0){ S.poly([[a, 0], [W, 0], [W, cc], [a, cc]], {fill:C.alt, alpha:0.38*fr(4)}); S.poly([[0, d], [b, d], [b, H], [0, H]], {fill:C.alt, alpha:0.38*fr(4)}); if (ap(4) > 0.5){ L('B1', a + b/2, cc/2); L('B2', b/2, d + cc/2); } }
      if (ap(5) > 0){ S.poly([[0, 0], [a, 0], [a, cc]], {fill:C.sec, alpha:0.3*fr(5)}); S.poly([[b, d], [b, H], [W, H]], {fill:C.sec, alpha:0.3*fr(5)});
        S.poly([[a, cc], [W, cc], [W, H]], {fill:C.rise, alpha:0.3*fr(5)}); S.poly([[0, 0], [0, d], [b, d]], {fill:C.rise, alpha:0.3*fr(5)});
        if (ap(5) > 0.5){ L('T1', a*0.68, cc*0.27); L('T2', b + a*0.32, d + cc*0.73); L('T3', a + b*0.68, cc + d*0.3); L('T4', b*0.3, d*0.68); } }
      /* paralelogramo (paso 2) */
      al = ap(2);
      if (al > 0){ S.poly([[0, 0], [a, cc], [W, H], [b, d]], {fill:C.tan, alpha:(k >= 6 ? 0.3 + 0.3*u : 0.3)*al});
        c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(a), Y(cc)); c.lineTo(X(a + b*al), Y(cc + d*al)); c.moveTo(X(b), Y(d)); c.lineTo(X(b + a*al), Y(d + cc*al)); c.stroke(); c.setLineDash([]); }
      /* cotas a, b, c, d (desde el paso 3) */
      if (ap(3) > 0.6){ cota(0, -0.28, a, -0.28); cota(a, -0.28, W, -0.28); cota(-0.28, 0, -0.28, cc); cota(-0.28, cc, -0.28, H);
        L('La', a/2, -0.28, -50, 0, 12); L('Lb', a + b/2, -0.28, -50, 0, 12); L('Lc', -0.28, cc/2, -100, -7, 0); L('Ld', -0.28, cc + d/2, -100, -7, 0); }
      /* las dos columnas, como flechas */
      dtFlecha(S, 0, 0, a*(k === 1 ? u : 1), cc*(k === 1 ? u : 1), C.sec, 2); dtFlecha(S, 0, 0, b*(k === 1 ? u : 1), d*(k === 1 ? u : 1), C.rise, 2);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      if (k > 1 || u > 0.6){ L('LU', a - 0.3, cc + 0.2, -100); L('LV', b + 0.14, d - 0.06, 0); }
      if (k === 6 && u > 0.5) L('AR', 2.95, 2.0);
      /* pregunta arriba; al final, en el mismo lugar, la respuesta */
      L('Q', -1.2, 3.55, 0); if (k === 6 && u > 0.5) L('F', 1.75, 3.55, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, -1.0); if (TXT[k - 1][1]) txt(TXT[k - 1][1], -1.2, -1.0 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-0.55));
      dtQue(S, 'por qué el determinante es un área:', 'un rectángulo, menos las piezas que sobran.');
      T.fin();
      oaReg(S, k, N, -1.2, -2.45, [0, 40, 70, 100, 132, 166]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['\\vec u=(a,c),\\qquad \\vec v=(b,d)', '\\text{Área del paralelogramo}=\\ ?', '\\text{rectángulo}=(a+b)(c+d)=ac+ad+bc+bd', '\\text{sobran dos rectángulos: }2\\cdot bc', '\\text{sobran cuatro triángulos: }2\\cdot\\dfrac{ac}{2}+2\\cdot\\dfrac{bd}{2}=ac+bd', '\\text{Área}=(a+b)(c+d)-2bc-(ac+bd)\\\\&\\qquad\\ \\,=ac+ad+bc+bd-2bc-ac-bd\\\\&\\qquad\\ \\,=ad-bc\\quad(ac-ac=0,\\ bd-bd=0,\\ bc-2bc=-bc)']; return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: la segunda columna se mueve y el determinante cambia con el área y con el sentido de giro */
OA.scene('det2-vivo', (function(){
  var A0 = 3, C0 = 1;
  var PZ = [['PU', '\\vec u=(3,1)', 'u = (3, 1)', 'c-sec'], ['PV', '\\vec v=(b,d)', 'v = (b, d)', 'diff']];
  return {
    world:{x0:-3.3, x1:5.5, y0:-4.5, y1:5.5}, aspect:10/8.8,
    aria:'El vector azul u igual a (3, 1) está fijo. El vector naranja v igual a (b, d) gira alrededor del origen. Los dos forman un paralelogramo. Cuando v queda a la izquierda de u, el paralelogramo es burdeo y el determinante es positivo. Cuando v queda sobre la misma recta que u, el paralelogramo se aplasta y el determinante vale cero. Cuando v pasa al otro lado, el paralelogramo es verde y el determinante es negativo. Bajo el dibujo se calcula el determinante, 3 por d menos b por 1, y el área, que es su valor absoluto.',
    labels:PZ,
    sliders:[{id:'b', tex:'b', min:-2.5, max:2.5, step:0.1, value:1}, {id:'d', tex:'d', min:-2.5, max:2.5, step:0.1, value:2}],
    legend:'<span><i class="sw sec"></i> \\(\\vec u=(3,1)\\), fijo</span><span><i class="sw rise"></i> \\(\\vec v=(b,d)\\)</span><span><i class="sw tan"></i> determinante positivo</span><span><i class="sw alt"></i> determinante negativo</span>',
    anim:{run:22000, hold:4000, still:1, apply:function(p, v){ var th = 1.1 + 6.2832*p; v.q = p; v.b = 2.3*Math.cos(th); v.d = 2.3*Math.sin(th); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var b = v.b == null ? 1 : +v.b, d = v.d == null ? 2 : +v.d, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), D = A0*d - b*C0, i, F = '"Source Sans 3", system-ui, sans-serif', col = D > 0 ? C.tan : C.alt, t;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-3.1, 0, 5.3, 0, {color:C.ink, width:1}); S.line(0, -2.9, 0, 4.1, {color:C.ink, width:1});
      for (i = -3; i <= 5; i++) if (i){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num('' + i, X(i), Y(0) + 11, 'center'); }
      for (i = -2; i <= 4; i++) if (i){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      /* recta de u: sobre ella el determinante vale 0 */
      c.strokeStyle = 'rgba(31,93,134,0.35)'; c.lineWidth = 1; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(X(-3), Y(-1)); c.lineTo(X(5.1), Y(1.7)); c.stroke(); c.setLineDash([]);
      if (Math.abs(D) > 1e-9){ S.poly([[0, 0], [A0, C0], [A0 + b, C0 + d], [b, d]], {fill:col, alpha:0.32});
        c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(A0), Y(C0)); c.lineTo(X(A0 + b), Y(C0 + d)); c.lineTo(X(b), Y(d)); c.stroke(); c.setLineDash([]); }
      dtFlecha(S, 0, 0, A0, C0, C.sec, 2); dtFlecha(S, 0, 0, b, d, C.rise, 2);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      T.L('PU', A0, C0, 0, 8, 10); T.L('PV', b, d, 0, 8, d >= 0 ? -10 : 12);
      t = Math.abs(D) < 0.05 ? ['Determinante cero: flechas alineadas, sin área', C.ink] : (D > 0 ? ['Determinante positivo: giro antihorario', C.tan] : ['Determinante negativo: giro horario', C.alt]);
      c.font = '600 12.5px ' + F; c.fillStyle = t[1]; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t[0], X(-3.2), Y(-3.6));
      dtQue(S, 'el determinante es el área pintada,', 'con signo. Gira la flecha naranja y míralo cambiar.');
      T.fin();
    },
    caption:function(v){ var b = v.b == null ? 1 : +v.b, d = v.d == null ? 2 : +v.d, D = A0*d - b*C0, n = function(z){ return oaDec(z, 2); }; return 'Con v = (' + n(b) + '; ' + n(d) + ') el determinante vale ' + n(D) + ' y el paralelogramo mide ' + n(Math.abs(D)) + ' unidades cuadradas. Sobre la recta punteada, la de u, el determinante es 0'; },
    readout:function(v){ var b = Math.round((v.b == null ? 1 : +v.b)*100)/100, d = Math.round((v.d == null ? 2 : +v.d)*100)/100, P1 = Math.round(A0*d*100)/100, P2 = Math.round(b*C0*100)/100, D = Math.round((P1 - P2)*100)/100, n = OA.num, p = function(z){ return z < 0 ? '(' + n(z, 2) + ')' : n(z, 2); };
      return dtPasos(['\\vec u=(3,\\,1),\\qquad \\vec v=(b,\\,d)=(' + n(b, 2) + ';\\ ' + n(d, 2) + ')',
        '\\begin{vmatrix}3&b\\\\1&d\\end{vmatrix}=\\begin{vmatrix}3&' + n(b, 2) + '\\\\1&' + n(d, 2) + '\\end{vmatrix}',
        '\\text{diagonal principal: }3\\cdot d=3\\cdot ' + p(d) + '=' + n(P1, 2),
        '\\text{otra diagonal: }b\\cdot 1=' + p(b) + '\\cdot 1=' + n(P2, 2),
        '\\text{determinante}=' + n(P1, 2) + '-' + p(P2) + '=' + n(D, 2),
        '\\text{área}=\\left|' + n(D, 2) + '\\right|=' + n(Math.abs(D), 2),
        '' + (Math.abs(D) < 0.005 ? '\\text{determinante }0:\\ \\vec v\\text{ está sobre la recta de }\\vec u' : (D > 0 ? '\\text{signo }+:\\ \\text{de }\\vec u\\text{ a }\\vec v\\text{, giro antihorario}' : '\\text{signo }-:\\ \\text{de }\\vec u\\text{ a }\\vec v\\text{, giro horario}'))]); }
  };
})());
