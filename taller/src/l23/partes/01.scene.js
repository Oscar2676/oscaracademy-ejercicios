OA.scene('par-intro', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, TP = 2*Math.PI;
  function fx(t){ return 3*Math.cos(t); } function fy(t){ return 2*Math.sin(t); }
  function ts(s){ return s < 2 ? 0 : s < 20 ? TP*(s - 2)/18 : TP; }
  return {
    world:{x0:-4.3, x1:4.3, y0:-3.1, y1:3.1}, aspect:6.2/8.6,
    _chk:[{f:fx, df:function(t){ return -3*Math.sin(t); }, at:[0.5, 2, 4, 5.5]}, {f:fy, df:function(t){ return 2*Math.cos(t); }, at:[0.5, 2, 4, 5.5]}],
    aria:'Un punto naranja recorre una elipse en sentido contrario a las agujas del reloj, partiendo de (3, 0). Su posición la dan dos ecuaciones: x igual a 3 coseno de t, y igual a 2 seno de t. Una línea punteada baja desde el punto al eje x y marca el valor de x; otra va al eje y y marca el valor de y. La parte ya recorrida de la curva queda en azul grueso.',
    labels:[['F', '\\left(\\dfrac{x}{3}\\right)^{2}+\\left(\\dfrac{y}{2}\\right)^{2}=\\cos^{2}t+\\operatorname{sen}^{2}t=1', '(x/3)² + (y/2)² = cos² t + sen² t = 1', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:6.28, step:0.01, value:0}],
    legend:'<span><i class="sw rise"></i> el punto \\(\\big(x(t),\\,y(t)\\big)\\)</span><span><i class="sw sec"></i> curva recorrida</span><span><i class="sw tan"></i> \\(x(t)\\)</span><span><i class="sw alt"></i> \\(y(t)\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t), a;
      S.axes({gx:[-3, -2, -1, 1, 2, 3], gy:[-2, -1, 1, 2]});
      oaPar(S, fx, fy, 0, TP, 'rgba(31,93,134,0.25)', 2); if (t > 0.01) oaPar(S, fx, fy, 0, t, C.sec, 3.2);
      S.line(x, y, x, 0, {color:C.tan, width:1.6, dash:[4, 3]}); S.line(x, y, 0, y, {color:C.alt, width:1.6, dash:[4, 3]}); c.setLineDash([]);
      S.line(0, 0, x, 0, {color:C.tan, width:4}); S.line(0, 0, 0, y, {color:C.alt, width:4});
      /* flecha de sentido */
      a = Math.atan2(-(2*Math.cos(t)), -3*Math.sin(t)); c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 7, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      c.strokeStyle = C.rise; c.lineWidth = 2.4; c.beginPath(); c.moveTo(X(x), Y(y)); c.lineTo(X(x) + 26*Math.cos(a), Y(y) + 26*Math.sin(a)); c.stroke();
      c.fillStyle = C.rise; c.beginPath(); c.moveTo(X(x) + 34*Math.cos(a), Y(y) + 34*Math.sin(a)); c.lineTo(X(x) + 24*Math.cos(a - 0.35), Y(y) + 24*Math.sin(a - 0.35)); c.lineTo(X(x) + 24*Math.cos(a + 0.35), Y(y) + 24*Math.sin(a + 0.35)); c.closePath(); c.fill();
      txt('t = ' + dec(t, 2), X(x) + (x >= 0 ? 14 : -14), Y(y) + (y >= 0 ? -16 : 16), x >= 0 ? 'left' : 'right', C.rise);
      txt('x = ' + dec(x, 2), X(x), Y(0) + (y >= 0 ? 14 : -14), 'center', C.tan); txt('y = ' + dec(y, 2), X(0) + (x >= 0 ? -8 : 8), Y(y), x >= 0 ? 'right' : 'left', C.alt);
      S.lab('F', X(-4.2), Y(2.75), 0, 0, v.q != null && s >= 20);
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
