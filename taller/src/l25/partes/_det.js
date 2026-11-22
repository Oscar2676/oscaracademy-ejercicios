/* utilidades del lote 28 (determinantes) */
function dtSuave(t){ t = Math.max(0, Math.min(1, t)); return t*t*(3 - 2*t); }
function dtFlecha(S, x0, y0, x1, y1, col, w){ var c = S.ctx, ax = S.X(x0), ay = S.Y(y0), bx = S.X(x1), by = S.Y(y1), d = Math.hypot(bx - ax, by - ay), ux, uy; if (d < 2) return; ux = (bx - ax)/d; uy = (by - ay)/d;
  c.strokeStyle = col; c.lineWidth = w || 2; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx - ux*6, by - uy*6); c.stroke();
  c.fillStyle = col; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux*9 - uy*4, by - uy*9 + ux*4); c.lineTo(bx - ux*9 + uy*4, by - uy*9 - ux*4); c.closePath(); c.fill(); }
function dtEtq(S, PZ){ var on = {}; return { L:function(id, x, y, ax, dx, dy){ on[id] = 1; S.lab(id, S.X(x) + (dx || 0), S.Y(y) + (dy || 0), ax == null ? -50 : ax, -50, true); }, fin:function(){ PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); }); } }; }
/* registro acumulado: la expresión de cada paso queda escrita, numerada, y se acumula hacia abajo */
function oaReg(S, k, n, xw, yw, FILA){ var c = S.ctx, C = S.C, x0 = S.X(xw), y0 = S.Y(yw), i, act;
  c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Paso a paso, lo que se va obteniendo:', x0, y0 - 26);
  for (i = 0; i < n; i++){ if (i >= k){ S.lab('R' + (i + 1), 0, 0, 0, 0, false); continue; } act = i === k - 1;
    c.beginPath(); c.arc(x0 + 9, y0 + FILA[i], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
    c.font = '700 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (i + 1), x0 + 9, y0 + FILA[i] + 0.5);
    S.lab('R' + (i + 1), x0 + 25, y0 + FILA[i], 0, -50, true); } }
