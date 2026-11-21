/* fábrica de escenas de movimiento en el plano (hojas H09–H14 del lote 23): curva, flechas, barra del parámetro y cuentas. Trazos finos y puntos chicos. */
function oaMov(o){
  var RUN = o.run || 22, dec = oaDec;
  function ts(s){ return s < 2 ? o.a : s < RUN - 4 ? o.a + (o.b - o.a)*(s - 2)/(RUN - 6) : o.b; }
  return {
    world:o.world, aspect:o.aspect, _chk:o.chk, aria:o.aria, labels:o.labels,
    sliders:[{id:'t', tex:'t', min:o.a, max:o.b, step:0.01, value:o.a}], legend:o.legend,
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var t = v.t == null ? o.a : v.t, s = v.q == null ? RUN : v.q*RUN, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), ax = o.axes, A, L, B = o.bar, px, H;
      function num(tx, px, py, al){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      H = {txt:txt, num:num, dot:function(x, y, col, r){ c.fillStyle = col; c.beginPath(); c.arc(X(x), Y(y), r || 2.8, 0, 6.2832); c.fill(); }};
      if (ax){ S.line(ax.x[0], 0, ax.x[1], 0, {color:C.ink, width:1.1}); S.line(0, ax.y[0], 0, ax.y[1], {color:C.ink, width:1.1});
        (ax.tx || []).forEach(function(q){ S.line(q, 0, q, 0, {color:C.ink, width:1}); c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(q), Y(0) - 3); c.lineTo(X(q), Y(0) + 3); c.stroke(); num(('' + q).replace('-', '−'), X(q), Y(0) + 11, 'center'); });
        (ax.ty || []).forEach(function(q){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0) - 3, Y(q)); c.lineTo(X(0) + 3, Y(q)); c.stroke(); num(('' + q).replace('-', '−'), X(0) - 7, Y(q), 'right'); });
        num('x', X(ax.x[1]) - 2, Y(0) - 9, 'right'); num('y', X(0) + 8, Y(ax.y[1]) + 4, 'left'); }
      oaPar(S, o.fx, o.fy, o.a, o.b, 'rgba(31,93,134,0.25)', 1.3); if (t > o.a + 0.005) oaPar(S, o.fx, o.fy, o.a, t, C.sec, 2);
      if (o.before) o.before(S, t, H);
      A = o.arrows ? o.arrows(t) : [];
      A.forEach(function(r){ oaFle(S, r[0], r[1], r[2], r[3], C[r[4]], r[7] || 2); });
      H.dot(o.fx(t), o.fy(t), C.ink, 3);
      A.forEach(function(r){ var d = r[6] || [9, -10], len = Math.abs(X(r[2]) - X(r[0])) + Math.abs(Y(r[3]) - Y(r[1])); if (r[5] && len > 16) txt(r[5], X(r[2]) + d[0], Y(r[3]) + d[1], d[0] >= 0 ? 'left' : 'right', C[r[4]]); });
      if (o.after) o.after(S, t, H);
      if (B){ px = X(B.x0) + (X(B.x1) - X(B.x0))*(t - o.a)/(o.b - o.a);
        c.strokeStyle = C.ink; c.lineWidth = 1.1; c.beginPath(); c.moveTo(X(B.x0), Y(B.y)); c.lineTo(X(B.x1), Y(B.y)); c.moveTo(X(B.x0), Y(B.y) - 4); c.lineTo(X(B.x0), Y(B.y) + 4); c.moveTo(X(B.x1), Y(B.y) - 4); c.lineTo(X(B.x1), Y(B.y) + 4); c.stroke();
        c.strokeStyle = C.rise; c.lineWidth = 2.2; c.beginPath(); c.moveTo(X(B.x0), Y(B.y)); c.lineTo(px, Y(B.y)); c.stroke(); c.fillStyle = C.rise; c.beginPath(); c.arc(px, Y(B.y), 3.2, 0, 6.2832); c.fill();
        num('parámetro t:  ' + B.la, X(B.x0), Y(B.y) + 12, 'left'); num(B.lb, X(B.x1), Y(B.y) + 12, 'right'); }
      L = o.lines(t); L.forEach(function(r, i){ txt(r[0], X(o.textAt[0]), Y(o.textAt[1]) + 21*i, 'left', C[r[1]]); });
      if (o.labAt) S.lab('F', X(o.labAt[0]), Y(o.labAt[1]), 0, 0, v.q != null && s >= RUN - 4);
    },
    caption:function(v){ var t = v.t == null ? o.a : v.t, s = v.q == null ? null : v.q*RUN; return o.caption(t, s != null && s < 2, t >= o.b - 0.006); },
    readout:function(v){ return o.readout(v.t == null ? o.a : v.t); }
  };
}
