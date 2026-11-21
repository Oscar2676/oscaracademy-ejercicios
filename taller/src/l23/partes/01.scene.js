OA.scene('par-intro', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, TP = 2*Math.PI;
  function fx(t){ return 3*Math.cos(t); } function fy(t){ return 2*Math.sin(t); }
  function ts(s){ return s < 2 ? 0 : s < 20 ? TP*(s - 2)/18 : TP; }
  return {
    world:{x0:-6.3, x1:6.3, y0:-5.9, y1:5.9}, aspect:11.8/12.6,
    _chk:[{f:fx, df:function(t){ return -3*Math.sin(t); }, at:[0.5, 2, 4, 5.5]}, {f:fy, df:function(t){ return 2*Math.cos(t); }, at:[0.5, 2, 4, 5.5]}],
    aria:'Un rayo negro gira desde el origen formando el ángulo t con el eje x. Corta a un círculo punteado de radio 3 y a otro de radio 2. El punto naranja toma su x del corte con el círculo grande, 3 coseno de t, y su y del corte con el círculo chico, 2 seno de t. Un punto naranja recorre una elipse en sentido contrario a las agujas del reloj, partiendo de (3, 0). Su posición la dan dos ecuaciones: x igual a 3 coseno de t, y igual a 2 seno de t. Una línea punteada baja desde el punto al eje x y marca el valor de x; otra va al eje y y marca el valor de y. La parte ya recorrida de la curva queda en azul grueso.',
    labels:[['F', '\\left(\\dfrac{x}{3}\\right)^{2}+\\left(\\dfrac{y}{2}\\right)^{2}=\\cos^{2}t+\\operatorname{sen}^{2}t=1', '(x/3)² + (y/2)² = cos² t + sen² t = 1', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:6.28, step:0.01, value:0}],
    legend:'<span><i class="sw rise"></i> el punto \\(\\big(x(t),\\,y(t)\\big)\\)</span><span><i class="sw sec"></i> curva recorrida</span><span><i class="sw tan"></i> \\(x=3\\cos t\\)</span><span><i class="sw alt"></i> \\(y=2\\operatorname{sen}t\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t), a;
      S.axes({gx:[-3, -2, -1, 1, 2, 3], gy:[-2, -1, 1, 2]});
      /* construcción: círculos de radio 3 y 2, y el rayo de ángulo t */
      c.strokeStyle = 'rgba(138,28,44,0.35)'; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.arc(X(0), Y(0), Math.abs(X(3) - X(0)), 0, 6.2832); c.stroke();
      c.strokeStyle = 'rgba(46,107,62,0.45)'; c.beginPath(); c.arc(X(0), Y(0), Math.abs(X(2) - X(0)), 0, 6.2832); c.stroke(); c.setLineDash([]);
      S.line(0, 0, 3*Math.cos(t), 3*Math.sin(t), {color:C.ink, width:1.8});
      c.strokeStyle = C.ink; c.lineWidth = 2; c.beginPath(); c.arc(X(0), Y(0), 20, 0, -t, true); c.stroke();
      txt('t', X(0) + 30*Math.cos(t/2), Y(0) - 30*Math.sin(t/2), 'center', C.ink);
      S.line(3*Math.cos(t), 3*Math.sin(t), x, y, {color:C.tan, width:1.4, dash:[3, 3]}); S.line(2*Math.cos(t), 2*Math.sin(t), x, y, {color:C.alt, width:1.4, dash:[3, 3]}); c.setLineDash([]);
      S.dot(3*Math.cos(t), 3*Math.sin(t), C.tan); S.dot(2*Math.cos(t), 2*Math.sin(t), C.alt);
      oaPar(S, fx, fy, 0, TP, 'rgba(31,93,134,0.25)', 2); if (t > 0.01) oaPar(S, fx, fy, 0, t, C.sec, 3.2);
      S.line(x, y, x, 0, {color:C.tan, width:1.6, dash:[4, 3]}); S.line(x, y, 0, y, {color:C.alt, width:1.6, dash:[4, 3]}); c.setLineDash([]);
      S.line(0, 0, x, 0, {color:C.tan, width:4}); S.line(0, 0, 0, y, {color:C.alt, width:4});
      /* flecha de sentido */
      a = Math.atan2(-(2*Math.cos(t)), -3*Math.sin(t)); c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 7, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      c.strokeStyle = C.rise; c.lineWidth = 2.4; c.beginPath(); c.moveTo(X(x), Y(y)); c.lineTo(X(x) + 26*Math.cos(a), Y(y) + 26*Math.sin(a)); c.stroke();
      c.fillStyle = C.rise; c.beginPath(); c.moveTo(X(x) + 34*Math.cos(a), Y(y) + 34*Math.sin(a)); c.lineTo(X(x) + 24*Math.cos(a - 0.35), Y(y) + 24*Math.sin(a - 0.35)); c.lineTo(X(x) + 24*Math.cos(a + 0.35), Y(y) + 24*Math.sin(a + 0.35)); c.closePath(); c.fill();
      txt('t = ' + dec(t, 2) + ' rad', X(-6.2), Y(5.55), 'left', C.ink); txt('x = 3 cos t = ' + dec(x, 2), X(-0.7), Y(5.55), 'center', C.tan); txt('y = 2 sen t = ' + dec(y, 2), X(6.2), Y(5.55), 'right', C.alt);
      /* coordenadas, por fuera de la elipse */
      var ex = Math.cos(t), ey = -Math.sin(t), sv = Math.sin(t) >= 0 ? -1 : 1, lx = Math.max(X(-6.3) + 62, Math.min(X(6.3) - 62, X(3*Math.cos(t)) + ex*40)), ly = Y(3*Math.sin(t)) + sv*26;
      txt('(3 cos t, 3 sen t)', lx, ly, 'center', C.tan); txt('(3 cos t, 2 sen t)', lx, ly + 20*sv, 'center', C.rise);
      c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(X(x), Y(y)); c.lineTo(lx, ly + 20*sv); c.stroke(); c.setLineDash([]);
      txt('3 cos t', X(x/2), Y(0) + (y >= 0 ? 13 : -13), 'center', C.tan); txt('2 sen t', X(0) + (x >= 0 ? -8 : 8), Y(y/2), x >= 0 ? 'right' : 'left', C.alt);
      S.lab('F', X(-6.2), Y(-5.2), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'En t = 0 el punto está en (3, 0). Cada valor de t entrega dos números: la x y la y del punto. Al avanzar t, el punto se mueve y dibuja la curva';
      if (t >= 6.27) return 'En t = 2π el punto volvió a (3, 0): dio una vuelta completa, en sentido contrario a las agujas del reloj. La curva es una elipse';
      return 'En t = ' + dec(t, 2) + ' el punto está en (' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + '). La flecha muestra hacia dónde avanza: ese es el sentido de recorrido';
    },
    readout:function(v){ var t = v.t; return [['', 'x(t)=3\\cos t\\approx ' + num(fx(t), 2) + '\\qquad y(t)=2\\operatorname{sen}t\\approx ' + num(fy(t), 2)], ['d', '\\cos t=\\dfrac{x}{3},\\qquad \\operatorname{sen}t=\\dfrac{y}{2}'], ['', '\\cos^{2}t+\\operatorname{sen}^{2}t=1\\ \\Longrightarrow\\ \\dfrac{x^{2}}{9}+\\dfrac{y^{2}}{4}=1']]; }
  };
})());
OA.scene('par-tabla', (function(){
  var RUN = 22, num = OA.num, dec = oaDec, TS = [-2, -1, 0, 1, 2];
  function fx(t){ return 2*t; } function fy(t){ return t*t - 1; }
  function ts(s){ var k = Math.floor(s/4), u = s - 4*k; if (k >= 5) return 2; return k === 0 ? -2 : (u < 2.4 ? TS[k - 1] + OA.smooth(u/2.4) : TS[k]); }
  return {
    world:{x0:-5.6, x1:5.6, y0:-3.1, y1:6.3}, aspect:9.4/11.2,
    _chk:[{f:fx, df:function(){ return 2; }, at:[-1.5, 0, 1.5]}, {f:fy, df:function(t){ return 2*t; }, at:[-1.5, 0.5, 1.5]}],
    aria:'Un arco de parábola azul que va del punto (−4, 3) al punto (4, 3) pasando por (−2, 0), (0, −1) y (2, 0). Cada uno de esos cinco puntos lleva una etiqueta con su valor de t, de −2 a 2. Un punto naranja recorre el arco de izquierda a derecha y se detiene en cada punto de la tabla. Sobre los ejes se marcan x igual a 2t e y igual a t al cuadrado menos 1.',
    labels:[['F', 't=\\dfrac{x}{2}\\ \\Longrightarrow\\ y=\\dfrac{x^{2}}{4}-1,\\quad -4\\le x\\le 4', 't = x/2  ⟹  y = x²/4 − 1,  −4 ≤ x ≤ 4', 'diff']],
    sliders:[{id:'t', tex:'t', min:-2, max:2, step:0.01, value:-2}],
    legend:'<span><i class="sw rise"></i> el punto para el valor de \\(t\\)</span><span><i class="sw tan"></i> \\(x=2t\\)</span><span><i class="sw alt"></i> \\(y=t^{2}-1\\)</span><span><i class="sw sec"></i> curva recorrida</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t);
      S.axes({gx:[-4, -2, 2, 4], gy:[-1, 1, 2, 3, 4]});
      oaPar(S, fx, fy, -2, 2, 'rgba(31,93,134,0.25)', 2); if (t > -1.99) oaPar(S, fx, fy, -2, t, C.sec, 3.2);
      TS.forEach(function(k){ var on = t >= k - 0.005; S.dot(fx(k), fy(k), on ? C.ink : C.muted); if (on) txt('t = ' + ('' + k).replace('-', '−') + ':  (' + ('' + fx(k)).replace('-', '−') + ', ' + ('' + fy(k)).replace('-', '−') + ')', X(fx(k)) + (k < 0 ? -10 : k > 0 ? 10 : 0), Y(fy(k)) + (k === 0 ? 16 : Math.abs(k) === 1 ? 16 : -14), k < 0 ? (k === -2 ? 'left' : 'right') : k > 0 ? (k === 2 ? 'right' : 'left') : 'center', C.ink); });
      S.line(x, y, x, 0, {color:C.tan, width:1.5, dash:[4, 3]}); S.line(x, y, 0, y, {color:C.alt, width:1.5, dash:[4, 3]}); c.setLineDash([]);
      S.line(0, 0, x, 0, {color:C.tan, width:4}); S.line(0, 0, 0, y, {color:C.alt, width:4});
      c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 7, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      txt('t = ' + dec(t, 2), X(-2.7), Y(5.95), 'left', C.ink);
      txt('x = 2t = 2 · (' + dec(t, 2) + ') = ' + dec(x, 2), X(-2.7), Y(5.95) + 20, 'left', C.tan);
      txt('y = t² − 1 = (' + dec(t, 2) + ')² − 1 = ' + dec(y, 2), X(-2.7), Y(5.95) + 40, 'left', C.alt);
      S.lab('F', X(-5.4), Y(-2.1), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, k = Math.round(t);
      if (s != null && s >= 20) return 'Los cinco puntos de la tabla quedan sobre un arco de parábola, recorrido de izquierda a derecha. Eliminando t se obtiene su ecuación: y = x²/4 − 1';
      if (Math.abs(t - k) < 0.005) return 'Fila de la tabla: t = ' + ('' + k).replace('-', '−') + '. Entonces x = 2 · (' + ('' + k).replace('-', '−') + ') = ' + ('' + fx(k)).replace('-', '−') + ' e y = (' + ('' + k).replace('-', '−') + ')² − 1 = ' + ('' + fy(k)).replace('-', '−') + '. El punto es (' + ('' + fx(k)).replace('-', '−') + ', ' + ('' + fy(k)).replace('-', '−') + ')';
      return 'Entre un valor de la tabla y el siguiente, t pasa por todos los valores intermedios y el punto recorre el tramo de curva que los une';
    },
    readout:function(v){ var t = v.t; return [['', 't=' + num(t, 2)], ['d', 'x=2t=' + num(fx(t), 2) + '\\qquad y=t^{2}-1=' + num(fy(t), 2)], ['', 't=\\dfrac{x}{2}\\ \\Longrightarrow\\ y=\\left(\\dfrac{x}{2}\\right)^{2}-1=\\dfrac{x^{2}}{4}-1']]; }
  };
})());
