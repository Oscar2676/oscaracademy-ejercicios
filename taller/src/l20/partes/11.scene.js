OA.scene('par-derivada', (function(){
  var RUN = 30, num = OA.num, T0 = -2.2, T1 = 2.2;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function fx(t){ return t*t; } function fy(t){ return t*t*t/3 - t; }
  /* tramos: -2,2→-1 · pausa · -1→0 · pausa · 0→1 · pausa · 1→2,2 */
  function ts(s){ var a = 2, P = 1.3;
    if (s < a) return T0; s -= a; if (s < 5) return T0 + 1.2*s/5; s -= 5; if (s < P) return -1; s -= P;
    if (s < 4.5) return -1 + s/4.5; s -= 4.5; if (s < P) return 0; s -= P;
    if (s < 4.5) return s/4.5; s -= 4.5; if (s < P) return 1; s -= P;
    if (s < 5) return 1 + 1.2*s/5; return T1; }
  return {
    world:{x0:-1.1, x1:5.6, y0:-2.6, y1:2.6}, aspect:5.2/6.7,
    _chk:[{f:fx, df:function(t){ return 2*t; }, at:[-2, -1, 0.5, 2]}, {f:fy, df:function(t){ return t*t - 1; }, at:[-2, -1, 0.5, 2]}],
    aria:'Una curva parametrizada con forma de lazo: x igual a t al cuadrado, y igual a t al cubo sobre 3 menos t. Un punto la recorre con su recta tangente. La tangente es horizontal en los puntos (1, dos tercios) y (1, menos dos tercios), y vertical en el origen. La curva se cruza en (3, 0).',
    labels:[['F', '\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{t^{2}-1}{2t}', 'dy/dx = (dy/dt)/(dx/dt) = (t² − 1)/(2t)', 'diff']],
    sliders:[{id:'t', tex:'t', min:T0, max:T1, step:0.01, value:T0}],
    legend:'<span><i class="sw alt"></i> curva</span><span><i class="sw rise"></i> tangente</span><span><i class="sw sec"></i> \\(\\dfrac{dx}{dt}\\)</span><span><i class="sw tan"></i> \\(\\dfrac{dy}{dt}\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, x = fx(t), y = fy(t), dx = 2*t, dy = t*t - 1, n = Math.sqrt(dx*dx + dy*dy), L = 1.5, e = 0.28, pts = [], i, u;
      function txt(tx, qx, qy, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? qx - 4 : al === 'right' ? qx - w + 4 : qx - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, qy - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, qx, qy); }
      S.axes({gx:[1, 2, 3, 4, 5], gy:[-2, -1, 1, 2]});
      /* curva completa, tenue, y tramo ya recorrido, fuerte */
      c.strokeStyle = C.alt; c.globalAlpha = 0.3; c.lineWidth = 2; c.beginPath(); for (i = 0; i <= 200; i++){ u = T0 + (T1 - T0)*i/200; if (i) c.lineTo(X(fx(u)), Y(fy(u))); else c.moveTo(X(fx(u)), Y(fy(u))); } c.stroke(); c.globalAlpha = 1;
      c.lineWidth = 2.8; c.beginPath(); for (i = 0; i <= 200; i++){ u = T0 + (t - T0)*i/200; if (i) c.lineTo(X(fx(u)), Y(fy(u))); else c.moveTo(X(fx(u)), Y(fy(u))); } c.stroke();
      /* tangente */
      S.line(x - L*dx/n, y - L*dy/n, x + L*dx/n, y + L*dy/n, {color:C.rise, width:2.4});
      /* avances dx/dt y dy/dt, a escala reducida */
      S.line(x, y, x + e*dx, y, {color:C.sec, width:4}); S.line(x + e*dx, y, x + e*dx, y + e*dy, {color:C.tan, width:4});
      S.dot(x, y, C.alt);
      S.ring(1, 2/3, C.rise); S.ring(1, -2/3, C.rise); S.ring(0, 0, C.rise); S.ring(3, 0, C.ink);
      txt('(3, 0)', X(3), Y(0) + 16, 'center', C.ink);
      if (Math.abs(dy) < 0.01) txt('dy/dt = 0: tangente horizontal', X(x) + 12, Y(y) + (t < 0 ? -18 : 18), 'left', C.rise);
      else if (Math.abs(dx) < 0.01) txt('dx/dt = 0: tangente vertical', X(x) + 12, Y(y) - 34, 'left', C.rise);
      else txt('t = ' + dec(t, 2), X(x) + 12, Y(y) + (dy > 0 ? 16 : -16), 'left', C.alt);
      S.lab('F', X(0.5), Y(2.3), 0, 0, v.q != null && s >= 27);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, dx = 2*t, dy = t*t - 1;
      if (s != null && s < 2) return 'Curva verde: los puntos (x(t), y(t)). El punto la recorre mientras t crece. Trazo naranja: su tangente';
      if (Math.abs(dy) < 0.01) return 'En t = ' + dec(t, 0) + ' el avance vertical dy/dt es 0 y el horizontal no: la tangente es horizontal';
      if (Math.abs(dx) < 0.01) return 'En t = 0 el avance horizontal dx/dt es 0 y el vertical no: la tangente es vertical. La fórmula no se puede usar ahí';
      return ['En t = ' + dec(t, 2) + ', la pendiente de la tangente es ', '\\dfrac{dy}{dx}=' + num(dy/dx, 2), 'dy/dx = ' + dec(dy/dx, 2), ''];
    },
    readout:function(v){ var t = v.t, dx = 2*t, dy = t*t - 1; return [['', '\\dfrac{dx}{dt}=2t=' + num(dx, 2)], ['d', '\\dfrac{dy}{dt}=t^{2}-1=' + num(dy, 2)], ['', Math.abs(dx) < 0.01 ? '\\dfrac{dx}{dt}=0:\\ \\text{tangente vertical}' : '\\dfrac{dy}{dx}=\\dfrac{t^{2}-1}{2t}=' + num(dy/dx, 2)]]; }
  };
})());
