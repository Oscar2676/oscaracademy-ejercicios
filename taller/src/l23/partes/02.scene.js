OA.scene('par-cicloide', (function(){
  var RUN = 26, num = OA.num, dec = oaDec, TP = 2*Math.PI, DT = 0.42;
  function fx(t){ return t - Math.sin(t); } function fy(t){ return 1 - Math.cos(t); }
  function dx(t){ return 1 - Math.cos(t); } function dy(t){ return Math.sin(t); }
  function vel(t){ return 2*Math.sin(t/2); }
  function L(t){ return 4*(1 - Math.cos(t/2)); }
  function ts(s){ return s < 2 ? 0.5 : s < 22 ? 0.5 + (TP - 0.5)*(s - 2)/20 : TP; }
  return {
    world:{x0:-0.9, x1:8.7, y0:-2.9, y1:7.4}, aspect:10.3/9.6,
    _chk:[{f:fx, df:dx, at:[0.5, 2, 4, 5.5]}, {f:fy, df:dy, at:[0.5, 2, 4, 5.5]}, {f:L, df:function(t){ return Math.sqrt(dx(t)*dx(t) + dy(t)*dy(t)); }, at:[0.5, 2, 4, 5.5]}, {f:L, df:vel, at:[0.5, 2, 4, 5.5]}],
    aria:'La curva azul x igual a t menos seno de t, y igual a 1 menos coseno de t, un arco de cicloide. Un punto naranja la recorre. Junto al punto se dibuja un triángulo rectángulo pequeño: su cateto horizontal es dx igual a x prima de t por dt, su cateto vertical es dy igual a y prima de t por dt, y su hipotenusa burdeo es ds, el pedacito de curva. Abajo, una regla horizontal muestra la curva estirada: una barra que crece con el largo recorrido y llega a 8 cuando el punto termina el arco.',
    labels:[['F', 'L=\\displaystyle\\int_{0}^{2\\pi}\\sqrt{\\big[x\'(t)\\big]^{2}+\\big[y\'(t)\\big]^{2}}\\,dt=\\int_{0}^{2\\pi}2\\operatorname{sen}\\dfrac{t}{2}\\,dt=8', 'L = ∫ √(x′² + y′²) dt = ∫ 2 sen(t/2) dt = 8', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:6.2832, step:0.01, value:0.5}],
    legend:'<span><i class="sw sec"></i> curva recorrida</span><span><i class="sw rise"></i> \\(dx=x\'(t)\\,dt\\)</span><span><i class="sw alt"></i> \\(dy=y\'(t)\\,dt\\)</span><span><i class="sw tan"></i> \\(ds\\): pedacito de curva y regla</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t), R0 = -1.7, k, on = t < TP - 0.02 && !(v.q != null && s >= 22);
      S.line(-0.3, 0, 8.4, 0, {color:C.ink, width:1.3}); S.line(0, -0.2, 0, 2.3, {color:C.ink, width:1.3}); [2, 4, 6].forEach(function(q){ S.line(q, -0.08, q, 0.08, {color:C.ink, width:1}); txt('' + q, X(q), Y(0) + 12, 'center', C.muted); }); [1, 2].forEach(function(q){ S.line(-0.06, q, 0.06, q, {color:C.ink, width:1}); txt('' + q, X(0) - 8, Y(q), 'right', C.muted); });
      oaPar(S, fx, fy, 0, TP, 'rgba(31,93,134,0.22)', 2); if (t > 0.01) oaPar(S, fx, fy, 0, t, C.sec, 3.4);
      /* el pedacito ds sobre la curva y, arriba, el mismo pedacito visto con lupa: triángulo dx, dy, ds */
      var bx0 = 0.2, bx1 = 8.2, by0 = 2.6, by1 = 5.6, ox = 3.4, oy = 3.95, K = 1.15, px = ox + dx(t)*K, py = oy + dy(t)*K, up = dy(t) >= 0;
      c.fillStyle = 'rgba(138,28,44,0.05)'; c.fillRect(X(bx0), Y(by1), X(bx1) - X(bx0), Y(by0) - Y(by1)); c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([]); c.strokeRect(X(bx0), Y(by1), X(bx1) - X(bx0), Y(by0) - Y(by1));
      txt('el pedacito de curva, visto con lupa', X(bx0) + 8, Y(by1) + 12, 'left', C.tan);
      if (on){
        S.line(x, y, x + dx(t)*0.22, y + dy(t)*0.22, {color:C.tan, width:6});
        S.line(x + dx(t)*0.11, y + dy(t)*0.11, Math.min(bx1 - 0.3, Math.max(bx0 + 0.3, x)), by0, {color:C.tan, width:1.2, dash:[4, 3]}); c.setLineDash([]);
        S.poly([[ox, oy], [px, oy], [px, py]], {fill:C.tan, alpha:0.14});
        S.line(ox, oy, px, oy, {color:C.rise, width:3.2}); S.line(px, oy, px, py, {color:C.alt, width:3.2}); S.line(ox, oy, px, py, {color:C.tan, width:4.2});
        S.dot(ox, oy, C.rise);
        txt('dx = x′(t)·dt', X((ox + px)/2), Y(oy) + (up ? 14 : -14), 'center', C.rise);
        if (Math.abs(dy(t)) > 0.12) txt('dy = y′(t)·dt', X(px) + 10, Y((oy + py)/2), 'left', C.alt);
        txt('ds = √(dx² + dy²)', X(ox) - 10, Y((oy + py)/2) + (up ? -10 : 10), 'right', C.tan);
      }
      c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 6.5, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      /* la curva estirada: regla con el largo recorrido */
      S.line(0, R0, 8, R0, {color:C.muted, width:1.2});
      for (k = 0; k <= 8; k++){ S.line(k, R0 - 0.13, k, R0 + 0.13, {color:C.ink, width:1.1}); txt('' + k, X(k), Y(R0) + 15, 'center', C.muted); }
      S.line(0, R0, L(t), R0, {color:C.sec, width:7});
      if (on) S.line(L(t), R0, Math.min(8, L(t) + vel(t)*DT), R0, {color:C.tan, width:7});
      txt('la curva estirada: largo recorrido s(t) ≈ ' + dec(L(t), 2), X(0), Y(R0) - 17, 'left', C.sec);
      if (on && L(t) < 6.2) txt('+ ds', X(L(t) + vel(t)*DT) + 8, Y(R0) - 1, 'left', C.tan);
      /* datos del instante */
      txt('t = ' + dec(t, 2), X(-0.8), Y(7.05), 'left', C.ink);
      txt('x′(t) = 1 − cos t = ' + dec(dx(t), 2), X(1.1), Y(7.05), 'left', C.rise);
      txt('y′(t) = sen t = ' + dec(dy(t), 2), X(5.2), Y(7.05), 'left', C.alt);
      txt('rapidez = √(x′² + y′²) = ' + dec(vel(t), 2), X(-0.8), Y(7.05) + 21, 'left', C.tan);
      S.lab('F', X(0.5), Y(4.3), 0, 0, v.q != null && s >= 22);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'El punto recorre la curva. En un instante avanza un pedacito, ds. Ese pedacito es la hipotenusa de un triángulo de catetos dx y dy (aquí dibujado agrandado para que se vea). Abajo, la regla junta todos los pedacitos';
      if (t >= 6.28) return 'El punto llegó al final del arco. Todos los pedacitos ds, puestos en fila, miden 8: esa es la longitud de la curva';
      return 'En t = ' + dec(t, 2) + ': dx = ' + dec(dx(t), 2) + '·dt y dy = ' + dec(dy(t), 2) + '·dt. Por Pitágoras, ds = √(' + dec(dx(t), 2) + '² + (' + dec(dy(t), 2) + ')²)·dt = ' + dec(vel(t), 2) + '·dt. La regla ya suma ' + dec(L(t), 2);
    },
    readout:function(v){ var t = v.t; return [['', 'ds=\\sqrt{(dx)^{2}+(dy)^{2}}=\\sqrt{\\big[x\'(t)\\big]^{2}+\\big[y\'(t)\\big]^{2}}\;dt=\\sqrt{(1-\\cos t)^{2}+\\operatorname{sen}^{2}t}\;dt=2\\operatorname{sen}\\dfrac{t}{2}\\,dt'], ['d', 's(t)=\\displaystyle\\int_{0}^{t}2\\operatorname{sen}\\dfrac{\\tau}{2}\\,d\\tau=4\\left(1-\\cos\\dfrac{t}{2}\\right)'], ['', 't=' + num(t, 2) + ':\\quad s(t)\\approx ' + num(L(t), 2) + '\\qquad t=2\\pi:\\quad L=8']]; }
  };
})());
