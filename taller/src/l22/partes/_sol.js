/* Fábrica: sólido de revolución en 3D con degradado, generado al barrer un disco (o un anillo) a lo largo del eje de giro.
   o.orient 'x': eje horizontal y = k, radio medido en y.  o.orient 'y': eje vertical x = k, radio medido en x. */
function oaSol(o){
  var RUN = o.run || 24, E = 0.3, a = o.a, b = o.b, hor = o.orient !== 'y', R = o.R, r = o.r || function(){ return 0; }, Rm = o.Rmax;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function us(s){ return s < 2 ? a + 0.04*(b - a) : s < RUN - 4 ? a + (b - a)*(0.04 + 0.96*OA.smooth((s - 2)/(RUN - 6))) : b; }
  return {
    world:o.world, aspect:o.aspect,
    _chk:[{f:o.V, df:function(u){ return Math.PI*(R(u)*R(u) - r(u)*r(u)); }, at:o.chk}],
    aria:o.aria, labels:[['F', o.Ftex, o.Ftxt, 'diff']],
    sliders:[{id:'u', tex:hor ? 'x' : 'y', min:a, max:b, step:(b - a)/400, value:a + 0.04*(b - a)}],
    legend:o.legend,
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.u = us(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, u = v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, t, g, n = 60, W = o.world, p, q, sg = o.side || 1;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.88)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function P(t, w){ return hor ? [X(t), Y(o.k + w)] : [X(o.k + w), Y(t)]; }
      function rp(w){ return hor ? Math.abs(Y(o.k + w) - Y(o.k)) : Math.abs(X(o.k + w) - X(o.k)); }
      function ell(t, w, a0, a1, acw){ var m = P(t, 0), d = rp(w); if (hor) c.ellipse(m[0], m[1], E*d, d, 0, a0, a1, !!acw); else c.ellipse(m[0], m[1], d, E*d, 0, a0, a1, !!acw); }
      function cuerpo(ua, ub, rad){
        c.beginPath(); for (i = 0; i <= n; i++){ t = ua + (ub - ua)*i/n; p = P(t, rad(t)); if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }
        if (hor) ell(ub, rad(ub), -Math.PI/2, Math.PI/2); else ell(ub, rad(ub), 0, Math.PI, true);
        for (i = n; i >= 0; i--){ t = ua + (ub - ua)*i/n; p = P(t, -rad(t)); c.lineTo(p[0], p[1]); }
        if (hor) ell(ua, rad(ua), Math.PI/2, 3*Math.PI/2); else ell(ua, rad(ua), Math.PI, 0, true);
        c.closePath();
      }
      S.axes({gx:o.gx, gy:o.gy});
      /* eje de giro */
      if (hor) S.line(W.x0, o.k, W.x1, o.k, {color:C.tan, width:1.4, dash:[7, 4]}); else S.line(o.k, W.y0, o.k, W.y1, {color:C.tan, width:1.4, dash:[7, 4]}); c.setLineDash([]);
      /* cuerpo con degradado */
      if (hor){ g = c.createLinearGradient(0, Y(o.k + Rm), 0, Y(o.k - Rm)); } else { g = c.createLinearGradient(X(o.k - Rm), 0, X(o.k + Rm), 0); }
      g.addColorStop(0, '#1f5d86'); g.addColorStop(0.32, '#c4e2f5'); g.addColorStop(0.62, '#5d9cc6'); g.addColorStop(1, '#17486a');
      cuerpo(a, u, R); c.globalAlpha = 0.93; c.fillStyle = g; c.fill(); c.globalAlpha = 1; c.strokeStyle = '#17486a'; c.lineWidth = 1.4; c.stroke();
      /* anillos de la superficie */
      c.strokeStyle = 'rgba(255,255,255,0.4)'; c.lineWidth = 1;
      for (i = 1; i <= 5; i++){ t = a + (u - a)*i/6; c.beginPath(); if (hor) ell(t, R(t), Math.PI/2, 3*Math.PI/2); else ell(t, R(t), 0, Math.PI); c.stroke(); }
      /* rebanada de grosor dx (o dy): un cilindro bajito, y el mini rectángulo que lo genera al girar */
      if (o.dx){ var u0 = Math.max(a, u - o.dx*(b - a)), Ru = R(u), ru = r(u), kR = function(){ return Ru; }, m0, m1, m2, m3;
        cuerpo(u0, u, kR); g = hor ? c.createLinearGradient(0, Y(o.k + Ru), 0, Y(o.k - Ru)) : c.createLinearGradient(X(o.k - Ru), 0, X(o.k + Ru), 0);
        g.addColorStop(0, '#7d1f2d'); g.addColorStop(0.32, '#f0c9cf'); g.addColorStop(0.62, '#b9616d'); g.addColorStop(1, '#6a1826');
        c.fillStyle = g; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 1.6; c.stroke();
        v._rc = [P(u0, sg*ru), P(u, sg*ru), P(u, sg*Ru), P(u0, sg*Ru)];
        v._dx = [P((u0 + u)/2, -sg*Ru), P(u0, -sg*Ru), P(u, -sg*Ru)];
      }
      /* cara del corte en u: el disco (o el anillo) que se agrega */
      q = P(u, 0); g = c.createRadialGradient(q[0] - 0.2*rp(R(u))*(hor ? E : 1), q[1] - 0.25*rp(R(u))*(hor ? 1 : E), 1, q[0], q[1], Math.max(2, rp(R(u))));
      g.addColorStop(0, '#f6dfe2'); g.addColorStop(1, '#c98a93');
      c.beginPath(); ell(u, R(u), 0, 2*Math.PI); c.fillStyle = g; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2.6; c.stroke();
      if (r(u) > 1e-6){ g = c.createLinearGradient(q[0] - rp(r(u)), q[1] - rp(r(u)), q[0] + rp(r(u)), q[1] + rp(r(u))); g.addColorStop(0, '#0f3550'); g.addColorStop(1, '#5d8fb0');
        c.beginPath(); ell(u, r(u), 0, 2*Math.PI); c.fillStyle = g; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2; c.stroke(); }
      /* curvas que encierran la región */
      (o.curves || []).forEach(function(k){ c.strokeStyle = C[k.color]; c.lineWidth = 2.4; c.beginPath(); for (i = 0; i <= 120; i++){ t = k.from + (k.to - k.from)*i/120; p = hor ? [X(t), Y(k.f(t))] : [X(k.f(t)), Y(t)]; if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); } c.stroke(); txt(k.txt, X(k.tx), Y(k.ty), k.al || 'left', C[k.color]); });
      txt(o.axisTxt, X(o.axisAt[0]), Y(o.axisAt[1]), o.axisAl || 'left', C.tan);
      /* radios */
      if (o.dx && v._rc){ c.beginPath(); v._rc.forEach(function(m, j){ if (j) c.lineTo(m[0], m[1]); else c.moveTo(m[0], m[1]); }); c.closePath(); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 2; c.setLineDash([]); c.stroke(); }
      var ani = r(u) > 1e-6, ox = hor ? 5 : 0, oy = hor ? 0 : 5;
      function radio(pp, d, col){ /* radio fino que nace en el centro (eje), con topes en sus dos extremos */
        var ax = q[0] + d*ox, ay = q[1] + d*oy, bx = pp[0] + d*ox, by = pp[1] + d*oy;
        c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 4.2; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.stroke();
        c.strokeStyle = col; c.lineWidth = 1.5; c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by);
        if (hor){ c.moveTo(ax - 3, ay); c.lineTo(ax + 3, ay); c.moveTo(bx - 3, by); c.lineTo(bx + 3, by); } else { c.moveTo(ax, ay - 3); c.lineTo(ax, ay + 3); c.moveTo(bx, by - 3); c.lineTo(bx, by + 3); }
        c.stroke(); }
      p = P(u, sg*R(u));
      if (ani) radio(p, 1, C.rise); else { c.strokeStyle = C.rise; c.lineWidth = 3; c.beginPath(); c.moveTo(q[0], q[1]); c.lineTo(p[0], p[1]); c.stroke(); }
      S.dot(hor ? u : o.k + sg*R(u), hor ? o.k + sg*R(u) : u, C.rise);
      txt('R = ' + dec(R(u), 2), p[0] + (hor ? 10 : 0), p[1] + (hor ? (o.Rdy || -4) : -13), hor ? 'left' : 'center', C.rise);
      if (ani){ p = P(u, sg*r(u)); radio(p, -1, C.alt); c.fillStyle = C.alt; c.beginPath(); c.arc(p[0], p[1], 2.6, 0, 6.2832); c.fill(); txt('r = ' + dec(r(u), 2), p[0] + (hor ? -14 : 0), p[1] + (hor ? -8*sg : 16), hor ? 'right' : 'center', C.alt); }
      c.fillStyle = C.ink; c.beginPath(); c.arc(q[0], q[1], ani ? 2.2 : 3, 0, 6.2832); c.fill();
      if (o.dx && v._dx){ var e0 = v._dx[1], e1 = v._dx[2], of = 9*sg; c.strokeStyle = C.ink; c.lineWidth = 1.4; c.beginPath();
        if (hor){ c.moveTo(e0[0], e0[1] + of - 4); c.lineTo(e0[0], e0[1] + of + 4); c.moveTo(e0[0], e0[1] + of); c.lineTo(e1[0], e1[1] + of); c.moveTo(e1[0], e1[1] + of - 4); c.lineTo(e1[0], e1[1] + of + 4); }
        else { c.moveTo(e0[0] - of - 4, e0[1]); c.lineTo(e0[0] - of + 4, e0[1]); c.moveTo(e0[0] - of, e0[1]); c.lineTo(e1[0] - of, e1[1]); c.moveTo(e1[0] - of - 4, e1[1]); c.lineTo(e1[0] - of + 4, e1[1]); }
        c.stroke(); txt(hor ? 'dx' : 'dy', v._dx[0][0] - (hor ? 0 : of + 14*(of > 0 ? 1 : -1)), v._dx[0][1] + (hor ? of + 13*(of > 0 ? 1 : -1) : 0), 'center', C.ink); }
      S.lab('F', X(o.Fat[0]), Y(o.Fat[1]), 0, 0, v.q != null && s >= RUN - 4);
    },
    caption:function(v){ var u = v.u, s = v.q == null ? null : v.q*RUN; if (s != null && s < 2) return o.cap0; if (u >= b - 1e-6) return o.cap1; return o.cap(u, dec); },
    readout:function(v){ return o.readout(v.u, OA.num); }
  };
}
