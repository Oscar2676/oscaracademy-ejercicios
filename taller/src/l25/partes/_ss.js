/* utilidades del lote 25 (series y sucesiones) */
function ssSub(n){ return ('' + n).split('').map(function(d){ return String.fromCharCode(8320 + (+d)); }).join(''); }
/* gráfica de una sucesión: puntos (n, a(n)), n = 1…N; trazos finos y puntos chicos */
function ssPlot(o){
  var N = o.N, RUN = o.run || 20;
  return {
    world:{x0:-1.6, x1:N + 1.6, y0:o.ymin - o.textH, y1:o.ymax + (o.ymax - o.ymin)*0.14}, aspect:o.aspect, _chk:o.chk,
    aria:o.aria, labels:o.labels, legend:o.legend,
    sliders:[{id:'n', tex:'n', min:1, max:N, step:1, value:1}],
    anim:{run:RUN*1000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(N, 1 + Math.floor(p*(N + 1.5))); v.fin = p*(N + 1.5) >= N + 0.5; }},
    onInput:function(v){ v.q = null; v.fin = v.n >= N; },
    draw:function(S, v){
      var n = Math.round(v.n || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, y, x0, y0, L;
      function num(t, px, py, al){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(-0.3, 0, N + 1.2, 0, {color:C.ink, width:1.1}); S.line(0, Math.min(0, o.ymin), 0, o.ymax + (o.ymax - o.ymin)*0.08, {color:C.ink, width:1.1});
      for (i = 1; i <= N; i++){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); if (N <= 12 || i % 2 === 0) num('' + i, X(i), Y(0) + 11, 'center'); }
      for (y = o.ymin; y <= o.ymax + 1e-9; y += o.ystep) if (Math.abs(y) > 1e-9){ c.beginPath(); c.moveTo(X(0) - 3, Y(y)); c.lineTo(X(0) + 3, Y(y)); c.stroke(); num(oaDec(y, o.ydec || 0), X(0) - 7, Y(y), 'right'); }
      num('n', X(N + 1.2) + 7, Y(0), 'left'); num(o.ylab || 'aₙ', X(0) + 6, Y(o.ymax + (o.ymax - o.ymin)*0.08) - 4, 'left');
      if (o.L != null){ c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(0), Y(o.L)); c.lineTo(X(N + 1.2), Y(o.L)); c.stroke(); c.setLineDash([]); txt(o.Llab, X(N + 1.2), Y(o.L) - 11, 'right', C.tan); }
      for (i = 1; i <= n; i++){ c.strokeStyle = 'rgba(31,93,134,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(i), Y(0)); c.lineTo(X(i), Y(o.a(i))); c.stroke(); c.beginPath(); c.arc(X(i), Y(o.a(i)), i === n ? 4 : 3, 0, 6.2832); c.fillStyle = i === n ? C.rise : C.sec; c.fill(); }
      if (o.endless && v.fin) txt('…', X(N + 0.8), Y(o.a(N)), 'center', C.sec);
      if (o.extra) o.extra(S, n, !!v.fin, txt);
      x0 = X(-1.5); y0 = Y(o.ymin) + 34; L = o.lines(n, !!v.fin);
      L.forEach(function(r, q){ txt(r[0], x0, y0 + 21*q, 'left', C[r[1]]); });
      if (o.labels) S.lab('F', x0, y0 + 21*L.length + 8, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ return o.caption(Math.round(v.n || 1), !!v.fin); },
    readout:function(v){ return o.readout(Math.round(v.n || 1), !!v.fin); }
  };
}
