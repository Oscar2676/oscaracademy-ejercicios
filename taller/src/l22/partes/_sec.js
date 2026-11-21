/* Fábrica: sólido de secciones transversales conocidas, perpendiculares al eje x, en perspectiva y con degradado.
   La base está en el piso (plano xy), entre y1(x) e y2(x). Formas: 'sq' cuadrado, 'rect' rectángulo de alto o.h(x),
   'tri' triángulo equilátero, 'rtri' triángulo rectángulo isósceles con un cateto en la base, 'semi' semicírculo. */
function oaSec(o){
  var RUN = o.run || 24, a = o.a, b = o.b, R3 = Math.sqrt(3);
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function us(s){ return s < 2 ? a + 0.05*(b - a) : s < RUN - 4 ? a + (b - a)*(0.05 + 0.95*OA.smooth((s - 2)/(RUN - 6))) : b; }
  function cara(x){ var p = o.y1(x), q = o.y2(x), w = q - p, k, pts = [];
    if (o.shape === 'sq') return [[p, 0], [q, 0], [q, w], [p, w]];
    if (o.shape === 'rect') return [[p, 0], [q, 0], [q, o.h(x)], [p, o.h(x)]];
    if (o.shape === 'tri') return [[p, 0], [q, 0], [(p + q)/2, w*R3/2]];
    if (o.shape === 'rtri') return [[p, 0], [q, 0], [p, w]];
    for (k = 0; k <= 24; k++) pts.push([(p + q)/2 + w/2*Math.cos(Math.PI*k/24), w/2*Math.sin(Math.PI*k/24)]); return pts; }
  function mez(t){ var A = [31, 93, 134], B = [196, 226, 245], k = 0.5 - 0.5*Math.cos(Math.PI*Math.min(1, Math.max(0, t))*1.15); return 'rgb(' + Math.round(A[0] + (B[0] - A[0])*k) + ',' + Math.round(A[1] + (B[1] - A[1])*k) + ',' + Math.round(A[2] + (B[2] - A[2])*k) + ')'; }
  return {
    world:{x0:0, x1:10, y0:0, y1:7}, aspect:0.7,
    _chk:[{f:o.V, df:o.A, at:o.chk}],
    aria:o.aria, labels:[['F', o.Ftex, o.Ftxt, 'diff']],
    sliders:[{id:'u', tex:'x', min:a, max:b, step:(b - a)/400, value:a + 0.05*(b - a)}],
    legend:o.legend,
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.u = us(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, u = v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, t, N = 90, f, p, m, sc = o.sc;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.88)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function P(x, y, z){ return [X(o.ox + sc*(0.9*x - 0.55*y)), Y(o.oy - sc*(0.30*x + 0.32*y) + sc*z)]; }
      function tramo(p0, p1, col, w, dash){ var q0 = P(p0[0], p0[1], p0[2]), q1 = P(p1[0], p1[1], p1[2]); c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); c.moveTo(q0[0], q0[1]); c.lineTo(q1[0], q1[1]); c.stroke(); c.setLineDash([]); }
      function poli(x, pts){ c.beginPath(); pts.forEach(function(q, j){ var r = P(x, q[0], q[1]); if (j) c.lineTo(r[0], r[1]); else c.moveTo(r[0], r[1]); }); c.closePath(); }
      /* piso: ejes y base */
      tramo([o.ax[0], 0, 0], [o.ax[1], 0, 0], C.ink, 1.4); tramo([0, o.ay[0], 0], [0, o.ay[1], 0], C.ink, 1.4);
      p = P(o.ax[1], 0, 0); txt('x', p[0] + 10, p[1] + 4, 'center', C.ink); p = P(0, o.ay[1], 0); txt('y', p[0] - 8, p[1] + 8, 'center', C.ink);
      c.beginPath(); for (i = 0; i <= N; i++){ t = a + (b - a)*i/N; p = P(t, o.y1(t), 0); if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }
      for (i = N; i >= 0; i--){ t = a + (b - a)*i/N; p = P(t, o.y2(t), 0); c.lineTo(p[0], p[1]); } c.closePath();
      c.fillStyle = 'rgba(176,116,36,0.2)'; c.fill(); c.strokeStyle = C.rise; c.lineWidth = 2; c.stroke();
      /* cuerpo: caras apiladas de atrás hacia adelante, con degradado */
      for (i = 0; i <= N; i++){ t = a + (u - a)*i/N; f = cara(t); poli(t, f); m = mez((t - a)/(b - a)); c.fillStyle = m; c.fill(); c.strokeStyle = m; c.lineWidth = 1.2; c.stroke(); }
      for (i = 1; i <= 5; i++){ t = a + (u - a)*i/6; poli(t, cara(t)); c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 1; c.stroke(); }
      /* cara del corte en u */
      f = cara(u); poli(u, f); c.fillStyle = 'rgba(201,138,147,0.95)'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2.6; c.stroke();
      tramo([u, o.y1(u), 0], [u, o.y2(u), 0], C.rise, 3.4);
      txt(o.sTxt(u, dec), X(o.aAt[0]), Y(o.aAt[1]) + 21, 'left', C.rise);
      (o.notes || []).forEach(function(k){ p = P(k.at[0], k.at[1], 0); txt(k.txt, p[0] + (k.dx || 0), p[1] + (k.dy || 0), k.al || 'left', C[k.color || 'rise']); });
      txt(o.aTxt(u, dec), X(o.aAt[0]), Y(o.aAt[1]), 'left', C.tan);
      S.lab('F', X(o.Fat[0]), Y(o.Fat[1]), 0, 0, v.q != null && s >= RUN - 4);
    },
    caption:function(v){ var u = v.u, s = v.q == null ? null : v.q*RUN; if (s != null && s < 2) return o.cap0; if (u >= b - 1e-6) return o.cap1; return o.cap(u, dec); },
    readout:function(v){ return o.readout(v.u, OA.num); }
  };
}
