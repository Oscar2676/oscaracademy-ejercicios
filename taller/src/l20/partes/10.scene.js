OA.scene('mov-recta', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function sp(t){ return t*t*t - 9*t*t + 24*t; } function vp(t){ return 3*t*t - 18*t + 24; } function ap(t){ return 6*t - 18; }
  function ts(s){ return s < 2 ? 0 : s < 8 ? 2*(s - 2)/6 : s < 9.3 ? 2 : s < 15.3 ? 2 + 2*(s - 9.3)/6 : s < 16.6 ? 4 : s < 19.6 ? 4 + (s - 16.6)/3 : 5; }
  return {
    world:{x0:-0.75, x1:5.75, y0:-13, y1:27}, aspect:1,
    _chk:[{f:sp, df:vp, at:[0.5, 1, 2, 3, 4, 5]}, {f:vp, df:ap, at:[0.5, 2, 3, 4.5]}],
    aria:'Arriba, la gráfica de la posición s de t igual a t al cubo menos 9 t al cuadrado más 24 t, con su tangente. Abajo, una partícula que se mueve sobre una recta según esa posición. Avanza hasta s igual a 20 en t igual a 2, donde se detiene; retrocede hasta s igual a 16 en t igual a 4, donde se detiene otra vez; y vuelve a avanzar hasta s igual a 20 en t igual a 5.',
    labels:[['F', '\\text{distancia}=20+4+4=28', 'distancia = 20 + 4 + 4 = 28', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:5, step:0.01, value:0}],
    legend:'<span><i class="sw alt"></i> \\(s(t)\\)</span><span><i class="sw rise"></i> tangente, pendiente \\(v(t)\\)</span><span><i class="sw sec"></i> partícula</span><span><i class="sw tan"></i> velocidad</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, k = 5.2/22, yr = -8, px = sp(t)*k, vv = vp(t), d = 0.55, L, dir;
      function txt(tx, qx, qy, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? qx - 4 : al === 'right' ? qx - w + 4 : qx - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, qy - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, qx, qy); }
      /* gráfica de la posición */
      S.line(0, 0, 5.5, 0, {color:C.ink, width:1.5}); S.line(0, 0, 0, 25, {color:C.ink, width:1.5});
      [1, 2, 3, 4, 5].forEach(function(u){ S.line(u, -0.4, u, 0.4, {color:C.ink, width:1}); txt('' + u, X(u), Y(0) + 12, 'center', C.muted); });
      [10, 20].forEach(function(u){ S.line(-0.06, u, 0.06, u, {color:C.ink, width:1}); S.line(0, u, 5.5, u, {color:C.grid, width:1}); txt('' + u, X(0) - 8, Y(u), 'right', C.muted); });
      txt('t', X(5.55), Y(0) - 10, 'center', C.ink); txt('s', X(0) + 10, Y(25.5), 'center', C.ink);
      S.curve(sp, 0, 5, {color:C.alt, width:2.6});
      S.line(t - d, sp(t) - d*vv, t + d, sp(t) + d*vv, {color:C.rise, width:2.6});
      S.line(t, 0, t, sp(t), {color:C.muted, width:1, dash:[3, 3]});
      S.dot(t, sp(t), C.alt);
      if (Math.abs(vv) < 0.02) txt('v(t) = 0', X(t), Y(sp(t)) + (t < 3 ? -16 : 16), 'center', C.rise);
      txt('s(t) = t³ − 9t² + 24t', X(5.6), Y(25.5), 'right', C.alt);
      /* la recta y la partícula */
      S.line(-0.3, yr, 5.6, yr, {color:C.ink, width:2.5});
      [0, 10, 16, 20].forEach(function(u){ S.line(u*k, yr - 0.7, u*k, yr + 0.7, {color:C.ink, width:1.2}); txt('' + u, X(u*k), Y(yr) + 15, 'center', C.muted); });
      S.line(px, yr, px, sp(t) > 0 ? 0 : yr, {color:C.muted, width:1, dash:[2, 4]});
      L = Math.min(1.1, Math.abs(vv)/24*1.3); dir = vv > 0 ? 1 : -1;
      c.setLineDash([]); if (Math.abs(vv) > 0.3){ c.strokeStyle = C.tan; c.fillStyle = C.tan; c.lineWidth = 3; c.beginPath(); c.moveTo(X(px), Y(yr) - 14); c.lineTo(X(px + dir*L) - dir*6, Y(yr) - 14); c.stroke(); c.beginPath(); c.moveTo(X(px + dir*L), Y(yr) - 14); c.lineTo(X(px + dir*L) - dir*9, Y(yr) - 19); c.lineTo(X(px + dir*L) - dir*9, Y(yr) - 9); c.closePath(); c.fill(); }
      else txt('en reposo', X(px), Y(yr) - 16, 'center', C.tan);
      S.dot(px, yr, C.sec);
      txt('posición sobre la recta, en metros', X(-0.3), Y(yr) + 34, 'left', C.muted);
      S.lab('F', X(0.1), Y(-3.4), 0, 0, v.q != null && s >= 20.5);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, vv = vp(t), a = ap(t), est;
      if (s != null && s < 2) return 'Arriba: la gráfica de la posición. Abajo: la partícula sobre la recta. La pendiente de la tangente naranja es la velocidad';
      if (Math.abs(vv) < 0.02) return 'En t = ' + dec(t, 0) + ' la tangente es horizontal: la velocidad es 0. La partícula está en reposo y cambia de sentido';
      est = (vv > 0 ? 'avanza' : 'retrocede') + (Math.abs(a) < 0.05 ? '' : (vv*a > 0 ? ' y acelera' : ' y frena'));
      return 'En t = ' + dec(t, 2) + ': la velocidad es ' + (vv > 0 ? 'positiva' : 'negativa') + ' y la aceleración es ' + (Math.abs(a) < 0.05 ? 'cero' : a > 0 ? 'positiva' : 'negativa') + '. La partícula ' + est;
    },
    readout:function(v){ var t = v.t; return [['', 's(t)=t^{3}-9t^{2}+24t=' + num(sp(t), 2)], ['d', 'v(t)=s\'(t)=3t^{2}-18t+24=' + num(vp(t), 2)], ['', 'a(t)=v\'(t)=6t-18=' + num(ap(t), 2)]]; }
  };
})());
