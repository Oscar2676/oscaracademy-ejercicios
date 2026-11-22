/* Fórmula general: demostración geométrica completando el cuadrado, por etapas. Dibujo propio. */
OA.scene('ec-formula', (function(){
  var N = 7, SX = 2.9, H = 0.95, OX = 0.3, OY = -0.25;
  var EQ = [
    ['E1', 'x^{2}+\\dfrac{b}{a}\\,x=-\\dfrac{c}{a}', 'x² + (b/a)x = −c/a'],
    ['E2', 'x^{2}+2\\cdot\\dfrac{b}{2a}\\,x=-\\dfrac{c}{a}', 'x² + 2·(b/2a)·x = −c/a'],
    ['E3', 'x^{2}+2\\cdot\\dfrac{b}{2a}\\,x=-\\dfrac{c}{a}', 'x² + 2·(b/2a)·x = −c/a'],
    ['E4', 'x^{2}+2\\cdot\\dfrac{b}{2a}\\,x+\\dfrac{b^{2}}{4a^{2}}=-\\dfrac{c}{a}+\\dfrac{b^{2}}{4a^{2}}', 'x² + 2·(b/2a)·x + b²/4a² = −c/a + b²/4a²'],
    ['E5', '\\left(x+\\dfrac{b}{2a}\\right)^{2}=\\dfrac{b^{2}-4ac}{4a^{2}}', '(x + b/2a)² = (b² − 4ac)/4a²'],
    ['E6', 'x+\\dfrac{b}{2a}=\\pm\\dfrac{\\sqrt{b^{2}-4ac}}{2a}', 'x + b/2a = ±√(b² − 4ac)/2a'],
    ['E7', 'x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}', 'x = (−b ± √(b² − 4ac))/2a']
  ];
  var TXT = [
    ['Se divide toda la ecuación por el primer coeficiente.', 'Quedan dos áreas: un cuadrado y un rectángulo.'],
    ['El rectángulo se parte en dos mitades iguales.', 'Cada una tiene la mitad del ancho.'],
    ['Una mitad se lleva bajo el cuadrado.', 'El área no cambia: son las mismas piezas.'],
    ['Para completar un cuadrado grande falta la esquina.', 'Ese cuadradito se agrega a los dos lados.'],
    ['Ahora el lado izquierdo es un cuadrado perfecto.', 'A la derecha queda una sola fracción.'],
    ['Se saca raíz cuadrada a los dos lados.', 'Un número y su opuesto dan el mismo cuadrado: de ahí el ±.'],
    ['Se despeja la incógnita.', 'Esta es la fórmula general.']
  ];
  var PZ = [
    ['X2', 'x^{2}', 'x²', 'c-sec'], ['XT', 'x', 'x', ''], ['XL', 'x', 'x', ''],
    ['BA', '\\dfrac{b}{a}', 'b/a', 'diff'], ['RA', '\\dfrac{b}{a}\\,x', '(b/a)x', 'diff'],
    ['H1', '\\dfrac{b}{2a}', 'b/2a', 'diff'], ['H2', '\\dfrac{b}{2a}', 'b/2a', 'diff'], ['HL', '\\dfrac{b}{2a}', 'b/2a', 'diff'],
    ['R1', '\\dfrac{b}{2a}x', '(b/2a)x', 'diff'], ['R2', '\\dfrac{b}{2a}x', '(b/2a)x', 'diff'],
    ['SQ', '\\dfrac{b^{2}}{4a^{2}}', 'b²/4a²', 'c-tan'],
    ['SB', 'x+\\dfrac{b}{2a}', 'x + b/2a', ''], ['SR', 'x+\\dfrac{b}{2a}', 'x + b/2a', ''],
    ['E0', 'ax^{2}+bx+c=0,\\quad a\\neq 0', 'ax² + bx + c = 0, a ≠ 0', '']
  ];
  return {
    world:{x0:-1.1, x1:6.9, y0:-12.6, y1:3.5}, aspect:16.1/8,
    aria:'Demostración geométrica de la fórmula general, en siete etapas. Un cuadrado azul de lado x y área x al cuadrado tiene a su derecha un rectángulo naranja de ancho b sobre a. El rectángulo se parte en dos mitades de ancho b sobre 2a. Una mitad se traslada bajo el cuadrado y queda una figura en forma de L. En la esquina falta un cuadradito de lado b sobre 2a; se agrega, en burdeo, y se completa un cuadrado grande de lado x más b sobre 2a. Bajo la figura, la ecuación cambia en cada etapa hasta llegar a x igual a menos b más menos raíz de b al cuadrado menos 4ac, todo sobre 2a.',
    labels:EQ.map(function(e){ return [e[0], e[1], e[2], e[0] === 'E7' ? 'diff' : '']; }).concat(PZ),
    sliders:[{id:'paso', tex:'\\text{etapa}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> cuadrado de área \\(x^{2}\\)</span><span><i class="sw rise"></i> rectángulos de área \\(\\dfrac{b}{2a}x\\)</span><span><i class="sw tan"></i> el cuadradito que falta, \\(\\dfrac{b^{2}}{4a^{2}}\\)</span>',
    anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = Math.min(1, (t - Math.floor(t))*1.6); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), F = '"Source Sans 3", system-ui, sans-serif', q, a, b;
      function rect(x0, y0, w, h, col, alpha, dash){ c.globalAlpha = alpha; c.fillStyle = col; c.fillRect(X(x0), Y(y0 + h), X(x0 + w) - X(x0), Y(y0) - Y(y0 + h)); c.globalAlpha = 1; c.strokeStyle = col; c.lineWidth = 1.2; if (dash) c.setLineDash([4, 3]); c.strokeRect(X(x0), Y(y0 + h), X(x0 + w) - X(x0), Y(y0) - Y(y0 + h)); c.setLineDash([]); }
      function lab(t, x, y, col, sz, al){ c.font = '600 ' + (sz || 12) + 'px ' + F; c.fillStyle = col; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function labR(t, x, y, col, sz){ c.save(); c.translate(X(x), Y(y)); c.rotate(-Math.PI/2); c.font = '600 ' + sz + 'px ' + F; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, 0, 0); c.restore(); }
      function cota(x0, x1, y, t, col){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x0), Y(y) + 4); c.lineTo(X(x0), Y(y) - 4); c.moveTo(X(x0), Y(y)); c.lineTo(X(x1), Y(y)); c.moveTo(X(x1), Y(y) + 4); c.lineTo(X(x1), Y(y) - 4); c.stroke(); lab(t, (x0 + x1)/2, y + 0.28, col || C.ink, 12); }
      function cotaV(x, y0, y1, t, col){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x) - 4, Y(y0)); c.lineTo(X(x) + 4, Y(y0)); c.moveTo(X(x), Y(y0)); c.lineTo(X(x), Y(y1)); c.moveTo(X(x) - 4, Y(y1)); c.lineTo(X(x) + 4, Y(y1)); c.stroke(); lab(t, x - 0.16, (y0 + y1)/2, col || C.ink, 12, 'right'); }
      var on = {};
      function L(id, x, y, ax){ on[id] = 1; S.lab(id, X(x), Y(y), ax == null ? -50 : ax, -50, true); }
      /* cuadrado x² */
      rect(OX, OY, SX, SX, C.sec, 0.28); L('X2', OX + SX/2, OY + SX/2);
      cota(OX, OX + SX, OY + SX + 0.22, ''); L('XT', OX + SX/2, OY + SX + 0.5); cotaV(OX - 0.22, OY, OY + SX, ''); L('XL', OX - 0.5, OY + SX/2);
      /* rectángulo(s) */
      if (k === 1){ rect(OX + SX, OY, 2*H, SX, C.rise, 0.3); L('RA', OX + SX + H, OY + SX/2); cota(OX + SX, OX + SX + 2*H, OY + SX + 0.22, ''); L('BA', OX + SX + H, OY + SX + 0.62); }
      else {
        rect(OX + SX, OY, H, SX, C.rise, 0.3); L('R1', OX + SX + H/2, OY + SX/2); cota(OX + SX, OX + SX + H, OY + SX + 0.22, ''); L('H1', OX + SX + H/2, OY + SX + 0.62);
        q = k === 2 ? 0 : (k === 3 ? u : 1);
        a = [OX + SX + H, OY, H, SX]; b = [OX, OY - H, SX, H];
        rect(a[0] + (b[0] - a[0])*q, a[1] + (b[1] - a[1])*q, a[2] + (b[2] - a[2])*q, a[3] + (b[3] - a[3])*q, C.rise, 0.3);
        if (q <= 0){ L('R2', OX + SX + 1.5*H, OY + SX/2); cota(OX + SX + H, OX + SX + 2*H, OY + SX + 0.22, ''); L('H2', OX + SX + 1.5*H, OY + SX + 0.62); }
        if (q >= 1){ L('R2', OX + SX/2, OY - H/2); cotaV(OX - 0.22, OY - H, OY, ''); L('HL', OX - 0.62, OY - H/2); }
      }
      /* la esquina */
      if (k === 4 && u < 0.5){ rect(OX + SX, OY - H, H, H, C.tan, 0.04, true); lab('?', OX + SX + H/2, OY - H/2, C.tan, 17); }
      if ((k === 4 && u >= 0.5) || k >= 5){ rect(OX + SX, OY - H, H, H, C.tan, 0.45); L('SQ', OX + SX + H/2, OY - H/2); }
      /* el cuadrado grande */
      if (k >= 5){ c.strokeStyle = C.ink; c.lineWidth = 1.8; c.strokeRect(X(OX), Y(OY + SX), X(OX + SX + H) - X(OX), Y(OY - H) - Y(OY + SX)); cota(OX, OX + SX + H, OY - H - 0.3, ''); L('SB', OX + (SX + H)/2, OY - H - 0.78); cotaV(OX + SX + H + 0.3, OY - H, OY + SX, ''); L('SR', OX + SX + H + 0.45, OY + (SX - H)/2, 0); }
      /* ecuación de la etapa y su explicación */
      PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); });
      /* registro: la ecuación de cada etapa queda escrita y se acumula hacia abajo; no se borra */
      txt(TXT[k - 1][0], X(-1.0), Y(-2.4), 'left', C.ink); txt(TXT[k - 1][1], X(-1.0), Y(-2.4) + 21, 'left', C.ink);
      var FILA = [34, 78, 122, 166, 214, 262, 310], yr = Y(-4.3), fi, act;
      c.font = '600 11.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Etapa por etapa, cómo va cambiando la ecuación:', X(-1.0), yr - 26);
      S.lab('E0', X(-1.0) + 25, yr, 0, -50, true);
      EQ.forEach(function(e, i){ if (i >= k){ S.lab(e[0], 0, 0, 0, 0, false); return; } act = i === k - 1;
        c.beginPath(); c.arc(X(-1.0) + 9, yr + FILA[i], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
        c.font = '700 11px ' + F; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (i + 1), X(-1.0) + 9, yr + FILA[i] + 0.5);
        S.lab(e[0], X(-1.0) + 25, yr + FILA[i], 0, -50, true); });
      lab('etapa ' + k + ' de ' + N, 6.8, 3.25, C.muted || '#6b6b6b', 11, 'right');
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Etapa ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', k === 1 ? 'ax^{2}+bx+c=0\\ \\ \\xrightarrow{\\ :\\,a\\ }\\ \\ ' + EQ[0][1] : EQ[k - 1][1]]]; }
  };
})());
/* el discriminante decide: número ↔ figura */
OA.scene('ec-discriminante', (function(){
  function f(x, cc){ return x*x - 2*x + cc; }
  return {
    world:{x0:-2.6, x1:4.6, y0:-5.6, y1:5.4}, aspect:11/7.2, _chk:[{f:function(x){ return x*x - 2*x + 1; }, df:function(x){ return 2*x - 2; }, at:[-1, 0.5, 2]}],
    aria:'La parábola y igual a x al cuadrado menos 2x más c. Al mover c, la parábola sube o baja sin cambiar de forma. Bajo el dibujo se calcula el discriminante, 4 menos 4c. Si es positivo, la parábola corta al eje x en dos puntos, que son las dos soluciones. Si es cero, lo toca en un solo punto, x igual a 1. Si es negativo, no lo toca: no hay soluciones reales.',
    labels:[['F', '\\Delta=b^{2}-4ac', 'Δ = b² − 4ac', 'diff']],
    sliders:[{id:'cc', tex:'c', min:-3, max:3, step:0.25, value:-3}],
    legend:'<span><i class="sw sec"></i> \\(y=x^{2}-2x+c\\)</span><span><i class="sw rise"></i> soluciones: cortes con el eje \\(x\\)</span>',
    anim:{run:16000, hold:5000, still:1, apply:function(p, v){ v.q = p; v.cc = Math.round((-3 + 6*p)*4)/4; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var cc = v.cc == null ? -3 : +v.cc, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), D = 4 - 4*cc, i, x, r, x0 = X(-2.5), y0 = Y(-3.5), F = '"Source Sans 3", system-ui, sans-serif';
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(-2.4, 0, 4.4, 0, {color:C.ink, width:1.1}); S.line(0, -2.6, 0, 5.2, {color:C.ink, width:1.1});
      for (i = -2; i <= 4; i++) if (i){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num('' + i, X(i), Y(0) + 11, 'center'); }
      for (i = -2; i <= 4; i += 2) if (i){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      c.save(); c.beginPath(); c.rect(X(-2.6), Y(5.3), X(4.6) - X(-2.6), Y(-2.7) - Y(5.3)); c.clip();
      c.strokeStyle = C.sec; c.lineWidth = 1.7; c.beginPath(); for (i = 0; i <= 120; i++){ x = -2.4 + 6.8*i/120; if (i) c.lineTo(X(x), Y(f(x, cc))); else c.moveTo(X(x), Y(f(x, cc))); } c.stroke(); c.restore();
      if (D > 1e-9){ r = Math.sqrt(D)/2; [1 - r, 1 + r].forEach(function(z){ c.beginPath(); c.arc(X(z), Y(0), 4, 0, 6.2832); c.fillStyle = C.rise; c.fill(); }); }
      else if (Math.abs(D) <= 1e-9){ c.beginPath(); c.arc(X(1), Y(0), 4, 0, 6.2832); c.fillStyle = C.rise; c.fill(); }
      if (D > 1e-9) txt('Discriminante positivo: dos soluciones', x0, y0 + 30, 'left', C.rise);
      else if (Math.abs(D) <= 1e-9) txt('Discriminante cero: una sola solución (doble)', x0, y0 + 30, 'left', C.rise);
      else txt('Discriminante negativo: ninguna solución real', x0, y0 + 30, 'left', C.tan);
      S.lab('F', x0, y0 - 6, 0, -50, true);
    },
    caption:function(v){ var cc = v.cc == null ? -3 : +v.cc, D = 4 - 4*cc; return D > 1e-9 ? 'Con c = ' + oaDec(cc, 2) + ' el discriminante es positivo: la parábola corta al eje x en dos puntos, las dos soluciones de la ecuación' : Math.abs(D) <= 1e-9 ? 'Con c = 1 el discriminante vale 0: la parábola apenas toca al eje, en x = 1. Las dos soluciones se juntaron en una' : 'Con c = ' + oaDec(cc, 2) + ' el discriminante es negativo: la parábola queda sobre el eje x y no lo toca. La ecuación no tiene soluciones reales'; },
    readout:function(v){ var cc = v.cc == null ? -3 : +v.cc, D = 4 - 4*cc, r = D > 0 ? Math.sqrt(D)/2 : 0, n = OA.num; return [['', 'x^{2}-2x' + (cc < 0 ? '' : '+') + n(cc, 2) + '=0\\qquad a=1,\\ b=-2,\\ c=' + n(cc, 2)], ['d', '\\Delta=b^{2}-4ac=(-2)^{2}-4\\cdot 1\\cdot(' + n(cc, 2) + ')=' + n(D, 2)], ['', D > 1e-9 ? 'x=\\dfrac{2\\pm\\sqrt{' + n(D, 2) + '}}{2}:\\quad x_{1}\\approx ' + n(1 - r, 3) + ',\\quad x_{2}\\approx ' + n(1 + r, 3) : Math.abs(D) <= 1e-9 ? 'x=\\dfrac{2\\pm 0}{2}=1' : '\\sqrt{' + n(D, 2) + '}\\ \\text{no existe en }\\mathbb{R}']]; }
  };
})());
