OA.scene('acu-presentacion', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function vf(t){ return 4*t - t*t; } function sf(t){ return 2*t*t - t*t*t/3; }
  function ts(s){ return s < 2 ? 0 : s < 10 ? 2*(s - 2)/8 : s < 11.4 ? 2 : s < 19.4 ? 2 + 2*(s - 11.4)/8 : 4; }
  return {
    world:{x0:-0.55, x1:4.6, y0:-1.6, y1:8.2}, aspect:9.8/5.15*0.52,
    _chk:[{f:sf, df:vf, at:[0.5, 1, 2, 3, 3.8]}],
    aria:'Abajo, la gráfica de la velocidad de un auto, v de t igual a 4t menos t al cuadrado: una parábola que sube desde 0, llega a 4 en t igual a 2 y vuelve a 0 en t igual a 4. El área bajo la curva se pinta de verde hasta el instante t. Arriba, un auto avanza por un camino recto una distancia igual a esa área, hasta 32 tercios, cerca de 10,67.',
    labels:[['F', 's(t)=\\displaystyle\\int_{0}^{t}v(\\tau)\\,d\\tau\\qquad s\'(t)=v(t)', 's(t) = ∫ v; s′(t) = v(t)', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:4, step:0.01, value:0}],
    legend:'<span><i class="sw sec"></i> velocidad \\(v(t)\\)</span><span><i class="sw alt"></i> distancia recorrida</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, a, pts = [[0, 0]], k = 4/sf(4), yr = 6.3, px = sf(t)*k, cx, cy;
      function txt(tx, qx, qy, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? qx - 4 : al === 'right' ? qx - w + 4 : qx - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, qy - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, qx, qy); }
      /* gráfica de la velocidad */
      S.line(0, 0, 4.4, 0, {color:C.ink, width:1.4}); S.line(0, 0, 0, 4.7, {color:C.ink, width:1.4});
      [1, 2, 3, 4].forEach(function(q){ S.line(q, -0.08, q, 0.08, {color:C.ink, width:1}); txt('' + q, X(q), Y(0) + 12, 'center', C.muted); });
      [2, 4].forEach(function(q){ S.line(-0.03, q, 0.03, q, {color:C.ink, width:1}); txt('' + q, X(0) - 7, Y(q), 'right', C.muted); });
      txt('t', X(4.45), Y(0) - 10, 'center', C.ink); txt('v', X(0) + 10, Y(4.75), 'center', C.ink);
      for (i = 0; i <= 80; i++){ a = t*i/80; pts.push([a, vf(a)]); } pts.push([t, 0]);
      if (t > 0.01) S.poly(pts, {fill:C.alt, alpha:0.45});
      S.curve(vf, 0, 4, {color:C.sec, width:2.6});
      (function(){ var q1 = t, q0 = Math.max(0, q1 - 0.1), yb_ = 0, yt_ = vf(t), sd = yt_ >= yb_ ? 1 : -1; S.poly([[q0, yb_], [q1, yb_], [q1, yt_], [q0, yt_]], {fill:C.ink, alpha:0.8}); if (q1 - q0 > 0.5*(0.1) && Math.abs(Y(yt_) - Y(yb_)) > 16){ var ym_ = (yb_ + yt_)/2, lf_ = q1 > 3, xe_ = X(lf_ ? q0 : q1); c.strokeStyle = C.ink; c.lineWidth = 1.3; c.setLineDash([]); c.beginPath(); c.moveTo(xe_, Y(ym_)); c.lineTo(xe_ + (lf_ ? -12 : 12), Y(ym_)); c.stroke(); txt('ancho de la tira = dt', xe_ + (lf_ ? -14 : 14), Y(ym_), lf_ ? 'right' : 'left', C.ink); } })(); S.dot(t, vf(t), C.sec);
      if (Math.abs(t - 2) >= 0.004) txt('v(t) = ' + dec(vf(t), 2), X(t) + (t > 2.9 ? -10 : 10), Y(vf(t)) - 12, t > 2.9 ? 'right' : 'left', C.sec);
      if (t > 1) txt('área = ' + dec(sf(t), 2), X(Math.min(t, 3)*0.55), Y(1), 'center', C.alt);
      if (Math.abs(t - 2) < 0.004) txt('velocidad máxima: v(2) = 4', X(2), Y(4.5), 'center', C.sec);
      /* camino y auto */
      S.line(0, yr, 4.3, yr, {color:C.ink, width:3});
      [0, 2, 4, 6, 8, 10].forEach(function(q){ S.line(q*k, yr - 0.12, q*k, yr + 0.12, {color:C.ink, width:1.2}); txt('' + q, X(q*k), Y(yr) + 14, 'center', C.muted); });
      S.line(0, yr, px, yr, {color:C.alt, width:6});
      cx = X(px); cy = Y(yr);
      c.fillStyle = C.tan; c.beginPath(); c.moveTo(cx - 16, cy - 6); c.lineTo(cx - 16, cy - 15); c.lineTo(cx - 8, cy - 15); c.lineTo(cx - 4, cy - 23); c.lineTo(cx + 8, cy - 23); c.lineTo(cx + 12, cy - 15); c.lineTo(cx + 17, cy - 15); c.lineTo(cx + 17, cy - 6); c.closePath(); c.fill();
      c.fillStyle = C.ink; c.beginPath(); c.arc(cx - 8, cy - 5, 4.5, 0, 2*Math.PI); c.fill(); c.beginPath(); c.arc(cx + 9, cy - 5, 4.5, 0, 2*Math.PI); c.fill();
      txt('distancia = ' + dec(sf(t), 2), X(px) + (px > 2.6 ? -24 : 24), Y(yr) - 34, px > 2.6 ? 'right' : 'left', C.alt);
      txt('camino', X(4.3), Y(yr) + 30, 'right', C.muted);
      S.lab('F', X(0.6), Y(-1.05), 0, 0, v.q != null && s >= 20.5);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Abajo: la velocidad del auto en cada instante. Arriba: el auto en el camino. El área bajo la velocidad será la distancia recorrida';
      if (Math.abs(t - 2) < 0.004) return 'En t = 2 la velocidad es máxima: 4. Es el instante en que el área, y la distancia, crecen más rápido';
      return 'En t = ' + dec(t, 2) + ': la velocidad es ' + dec(vf(t), 2) + ' y el área pintada, ' + dec(sf(t), 2) + ', es la distancia que lleva recorrida el auto';
    },
    readout:function(v){ var t = v.t; return [['', 's(t)=\\displaystyle\\int_{0}^{t}\\left(4\\tau-\\tau^{2}\\right)d\\tau=2t^{2}-\\dfrac{t^{3}}{3}'], ['d', 't=' + num(t, 2) + ':\\quad s(t)\\approx ' + num(sf(t), 2)], ['', 's\'(t)=4t-t^{2}=v(t)\\approx ' + num(vf(t), 2)]]; }
  };
})());
