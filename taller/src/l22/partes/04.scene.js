OA.scene('apl-movimiento', (function(){
  var RUN = 26, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function vel(t){ return t*t - 4*t + 3; }
  function F(t){ return t*t*t/3 - 2*t*t + 3*t; }                 /* desplazamiento desde t = 0 */
  function D(t){ return t <= 1 ? F(t) : t <= 3 ? 8/3 - F(t) : 8/3 + F(t); } /* distancia recorrida */
  function ts(s){ return s < 2 ? 0 : s < 22 ? 4*(s - 2)/20 : 4; }
  function yv(q){ return 2.6 + (q + 1.5)/5*9; }                  /* panel de abajo: gráfica de v */
  function xs(p){ return (p - 1.6)/2*4; }                        /* panel de arriba: la recta donde se mueve */
  return {
    world:{x0:-0.75, x1:4.75, y0:0, y1:22.2}, aspect:1.04,
    _chk:[{f:F, df:vel, at:[0.5, 1.5, 2.5, 3.5]}],
    aria:'Arriba, un punto se mueve sobre una recta: avanza de la posición 2 a la posición 10 tercios, se devuelve a la posición 2 y vuelve a avanzar a 10 tercios. Tres flechas muestran los tres tramos, de 4 tercios cada uno. Abajo, la gráfica de su velocidad v de t igual a t al cuadrado menos 4t más 3, con el área pintada hasta el instante t: verde cuando la velocidad es positiva y burdeo cuando es negativa.',
    labels:[['F', '\\displaystyle\\int_{0}^{4}v\\,dt=\\dfrac{4}{3}\\qquad\\int_{0}^{4}|v|\\,dt=4', '∫ v dt = 4/3;   ∫ |v| dt = 4', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:4, step:0.01, value:0}],
    legend:'<span><i class="sw sec"></i> \\(v(t)=t^{2}-4t+3\\)</span><span><i class="sw alt"></i> avanza: el área suma</span><span><i class="sw tan"></i> retrocede: el área resta</span><span><i class="sw rise"></i> el móvil</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, N = 200, i, ua, ub, fa, fb, u, p = 2 + F(t), m = vel(t), g;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function flecha(pa, pb, yw, col){ if (Math.abs(pb - pa) < 0.02) return; var xa = X(xs(pa)), xb = X(xs(pb)), yy = Y(yw), d = xb > xa ? 1 : -1; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = 3; c.setLineDash([]); c.beginPath(); c.moveTo(xa, yy); c.lineTo(xb - 6*d, yy); c.stroke(); c.beginPath(); c.moveTo(xb, yy); c.lineTo(xb - 9*d, yy - 5); c.lineTo(xb - 9*d, yy + 5); c.closePath(); c.fill(); }
      /* panel de arriba: la recta */
      S.line(-0.3, 16.6, 4.4, 16.6, {color:C.ink, width:1.6});
      [[2, '2'], [3, '3'], [10/3, '10/3']].forEach(function(q){ S.line(xs(q[0]), 16.35, xs(q[0]), 16.85, {color:C.ink, width:1.2}); txt(q[1], X(xs(q[0])), Y(16.6) + 16, 'center', C.muted); });
      txt('posición s, en metros', X(4.4), Y(16.6) + 16, 'right', C.muted);
      flecha(2, 2 + F(Math.min(t, 1)), 18.7, C.alt); if (t > 1) flecha(10/3, 2 + F(Math.min(t, 3)), 19.8, C.tan); if (t > 3) flecha(2, 2 + F(t), 20.9, C.alt);
      if (t >= 1) txt('avanza 4/3', X(xs(8/3)), Y(18.7), 'center', C.alt); if (t >= 3) txt('retrocede 4/3', X(xs(8/3)), Y(19.8), 'center', C.tan); if (t >= 3.995) txt('avanza 4/3', X(xs(8/3)), Y(20.9), 'center', C.alt);
      g = c.createRadialGradient(X(xs(p)) - 3, Y(16.6) - 4, 1, X(xs(p)), Y(16.6), 10); g.addColorStop(0, '#ffe2b0'); g.addColorStop(1, C.rise);
      c.fillStyle = g; c.beginPath(); c.arc(X(xs(p)), Y(16.6), 9, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      txt('s(t) = ' + dec(p, 2), X(xs(p)), Y(16.6) - 20, 'center', C.rise);
      /* panel de abajo: v(t) y su área */
      S.line(0, yv(0), 4.45, yv(0), {color:C.ink, width:1.4}); S.line(0, yv(-1.5), 0, yv(3.5), {color:C.ink, width:1.4});
      [1, 2, 3, 4].forEach(function(q){ S.line(q, yv(0) - 0.14, q, yv(0) + 0.14, {color:C.ink, width:1}); txt('' + q, X(q) + (q === 1 || q === 3 ? 9 : 0), Y(yv(0)) + 13, 'center', C.muted); });
      [-1, 1, 2, 3].forEach(function(q){ S.line(-0.04, yv(q), 0.04, yv(q), {color:C.ink, width:1}); txt(('' + q).replace('-', '−'), X(0) - 7, Y(yv(q)), 'right', C.muted); });
      txt('t, en segundos', X(4.45), Y(yv(-1.25)), 'right', C.muted);
      for (i = 0; i < N; i++){ ua = t*i/N; ub = t*(i + 1)/N; if (ub <= ua) break; fa = vel(ua); fb = vel(ub); S.poly([[ua, yv(0)], [ua, yv(fa)], [ub, yv(fb)], [ub, yv(0)]], {fill:(fa + fb) >= 0 ? C.alt : C.tan, alpha:0.5}); }
      c.strokeStyle = C.sec; c.lineWidth = 2.6; c.setLineDash([]); c.beginPath(); for (i = 0; i <= 200; i++){ u = 4.12*i/200; if (i) c.lineTo(X(u), Y(yv(vel(u)))); else c.moveTo(X(u), Y(yv(vel(u)))); } c.stroke();
      S.line(t, yv(0), t, yv(m), {color:C.sec, width:3.4}); S.dot(t, yv(m), C.sec);
      txt('v(t) = t² − 4t + 3', X(0.42), Y(yv(3.2)), 'left', C.sec);
      txt('v = ' + dec(m, 2) + ' m/s', X(t) + (t > 3 ? -10 : 10), Y(yv(m)) + (m >= 0 ? -12 : 13), t > 3 ? 'right' : 'left', C.sec);
      if (t >= 1) txt('+4/3', X(0.42), Y(yv(0.75)), 'center', C.alt); if (t >= 3) txt('−4/3', X(2), Y(yv(-0.45)), 'center', C.tan); if (t >= 3.995) txt('+4/3', X(3.72), Y(yv(0.5)), 'center', C.alt);
      S.lab('F', X(1.1), Y(13.9), 0, 0, v.q != null && s >= 22);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, m = vel(t);
      if (s != null && s < 2) return 'Arriba: el móvil sobre su recta, en la posición 2. Abajo: la gráfica de su velocidad. El área bajo esa gráfica dirá cuánto se mueve';
      if (t >= 3.995) return 'En 4 segundos avanzó 4/3, retrocedió 4/3 y avanzó 4/3. Recorrió 4 metros, pero quedó solo 4/3 de metro más adelante que al partir';
      return 'En t = ' + dec(t, 2) + ' s la velocidad es ' + (Math.abs(m) < 0.005 ? 'cero: el móvil se detiene un instante y cambia de sentido' : m > 0 ? 'positiva: el móvil avanza y el área suma' : 'negativa: el móvil retrocede y el área resta');
    },
    readout:function(v){ var t = v.t; return [['', 's(t)=s(0)+\\displaystyle\\int_{0}^{t}v(\\tau)\\,d\\tau=2+\\dfrac{t^{3}}{3}-2t^{2}+3t\\approx ' + num(2 + F(t), 2) + '\\ \\text{m}'], ['d', '\\text{desplazamiento}=\\displaystyle\\int_{0}^{t}v(\\tau)\\,d\\tau\\approx ' + num(F(t), 2) + '\\ \\text{m}'], ['', '\\text{distancia recorrida}=\\displaystyle\\int_{0}^{t}|v(\\tau)|\\,d\\tau\\approx ' + num(D(t), 2) + '\\ \\text{m}']]; }
  };
})());
