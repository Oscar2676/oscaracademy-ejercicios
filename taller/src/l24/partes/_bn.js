/* utilidades del lote 24 (binomio de Newton) */
function bnSup(n){ var m = {'0':'⁰','1':'¹','2':'²','3':'³','4':'⁴','5':'⁵','6':'⁶','7':'⁷','8':'⁸','9':'⁹'}; return ('' + n).split('').map(function(d){ return m[d]; }).join(''); }
function bnPow(l, e){ return e === 0 ? '' : e === 1 ? l : l + bnSup(e); }
function bnC(n, k){ var r = 1, i; for (i = 1; i <= k; i++) r = r*(n - k + i)/i; return Math.round(r); }
function bnTerm(n, k){ var c = bnC(n, k), s = bnPow('a', n - k) + bnPow('b', k); return (c === 1 ? '' : c) + s; }
function bnExp(n){ var s = [], k; for (k = 0; k <= n; k++) s.push(bnTerm(n, k)); return '(a + b)' + bnSup(n) + ' = ' + s.join(' + '); }
function bnCota(S, x0, y0, x1, y1, tx, col, dx, dy){ var c = S.ctx, X = S.X, Y = S.Y, nx = dx || 0, ny = dy || 0, L = Math.sqrt(nx*nx + ny*ny) || 1, ux = nx/L*4, uy = ny/L*4;
  c.strokeStyle = col; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(x0) + nx, Y(y0) + ny); c.lineTo(X(x1) + nx, Y(y1) + ny); c.moveTo(X(x0) + nx - ux, Y(y0) + ny - uy); c.lineTo(X(x0) + nx + ux, Y(y0) + ny + uy); c.moveTo(X(x1) + nx - ux, Y(y1) + ny - uy); c.lineTo(X(x1) + nx + ux, Y(y1) + ny + uy); c.stroke();
  oaTxt(S)(tx, (X(x0) + X(x1))/2 + nx*2.1, (Y(y0) + Y(y1))/2 + ny*2.1, 'center', col); }
function bnExp2(n){ var s = bnExp(n), t, i, h; if (s.length <= 48) return [s]; t = s.split(' + '); h = Math.ceil(t.length/2); return [t.slice(0, h).join(' + ') + ' +', '      ' + t.slice(h).join(' + ')]; }
function bnCajas(S, n, y, col, top, bot){ var c = S.ctx, X = S.X, Y = S.Y, off = (7 - n)/2, k, cc, x;
  for (k = 0; k <= n; k++){ x = off + k; cc = col(k); c.strokeStyle = cc || S.C.grid; c.lineWidth = cc ? 1.8 : 1; c.strokeRect(X(x - 0.42), Y(y + 0.36), X(x + 0.42) - X(x - 0.42), Y(y - 0.36) - Y(y + 0.36));
    c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc || S.C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(bnPow('a', n - k) + bnPow('b', k), X(x), Y(y));
    c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc || (S.C.muted || '#6b6b6b'); if (top) c.fillText(top(k), X(x), Y(y + 0.36) - 10); if (bot) c.fillText(bot(k), X(x), Y(y - 0.36) + 11); }
  return off; }
/* exponente de x en cada término: puntos (k, e0 − d·k); se busca el que da el exponente pedido */
function bnExpo(o){
  var n = o.n, e0 = o.e0, d = o.d;
  function ex(k){ return e0 - d*k; }
  return {
    world:{x0:-1.7, x1:n + 1.3, y0:o.ymin - 0.52*(o.ymax - o.ymin) - 1.6, y1:o.ymax + 1.6}, aspect:o.aspect,
    aria:o.aria, labels:o.labels, legend:o.legend,
    sliders:o.target ? [{id:'m', tex:'\\text{exponente buscado}', min:o.ymin, max:o.ymax, step:1, value:o.m0}] : [{id:'k', tex:'k', min:0, max:n, step:1, value:0}],
    anim:{run:20000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.k = Math.min(n, Math.floor(p*(n + 2.6))); v.fin = p*(n + 2.6) >= n + 1; if (o.target) v.m = o.m0; }},
    onInput:function(v){ v.q = null; v.fin = true; if (o.target) v.k = n; },
    draw:function(S, v){
      var k = Math.round(v.k || 0), m = o.target ? Math.round(v.m) : 0, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, hit = -1, x0, y0, L, sc = 1;
      function num(t, px, py, al){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(-0.4, 0, n + 0.6, 0, {color:C.ink, width:1.1}); S.line(0, o.ymin - 0.4, 0, o.ymax + 0.8, {color:C.ink, width:1.1});
      for (i = 0; i <= n; i++) num('' + i, X(i), Y(0) + (ex(i) === 0 ? -11 : 11), 'center');
      for (i = o.ymin; i <= o.ymax; i += o.ystep) if (i) { c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num(('' + i).replace('-', '−'), X(0) - 7, Y(i), 'right'); }
      num('k', X(n + 0.6) + 8, Y(0), 'left'); num('exponente de x', X(0) + 6, Y(o.ymax + 0.8) - 6, 'left');
      c.strokeStyle = C.tan; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(-0.4), Y(m)); c.lineTo(X(n + 0.6), Y(m)); c.stroke(); c.setLineDash([]);
      txt('exponente ' + ('' + m).replace('-', '−') + (m === 0 ? ': no queda x' : ''), X(n + 0.6), Y(m) - 11, 'right', C.tan);
      c.strokeStyle = 'rgba(31,93,134,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0), Y(ex(0))); c.lineTo(X(n), Y(ex(n))); c.stroke();
      for (i = 0; i <= (v.fin ? n : k); i++){ if (ex(i) === m) hit = i; c.beginPath(); c.arc(X(i), Y(ex(i)), ex(i) === m ? 4.2 : 3, 0, 6.2832); c.fillStyle = ex(i) === m ? C.tan : (i === k && !v.fin ? C.rise : C.sec); c.fill(); }
      x0 = X(-1.6); y0 = Y(o.ymin - 1.6);
      L = o.lines(v.fin ? (hit >= 0 ? hit : n) : k, m, hit, !!v.fin);
      L.forEach(function(r, q){ txt(r[0], x0, y0 + 21*q, 'left', C[r[1]]); });
      S.lab('F', x0, y0 + 21*L.length + 8, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ return o.caption(Math.round(v.k || 0), o.target ? Math.round(v.m) : 0, !!v.fin); },
    readout:function(v){ return o.readout(Math.round(v.k || 0), o.target ? Math.round(v.m) : 0, !!v.fin); }
  };
}
