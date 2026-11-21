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
