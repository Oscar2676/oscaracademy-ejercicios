/* utilidades 3D del lote 27: proyección oblicua, superficie por parches con degradado, curvas y etiquetas TeX */
function cmKit(S){
  var c = S.ctx, X = S.X, Y = S.Y, C = S.C, K = {}, FNT = '"Source Sans 3", system-ui, sans-serif';
  K.P = function(x, y, z){ return [y - 0.45*x, z - 0.35*x]; };
  K.at = function(p){ var q = K.P(p[0], p[1], p[2]); return [X(q[0]), Y(q[1])]; };
  K.line = function(a, b, col, w, dash){ var p = K.at(a), q = K.at(b); c.strokeStyle = col; c.lineWidth = w || 1; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(p[0], p[1]); c.lineTo(q[0], q[1]); c.stroke(); c.setLineDash([]); };
  K.poly = function(pts, col, alpha, stroke){ c.beginPath(); pts.forEach(function(t, i){ var p = K.at(t); if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); }); c.closePath(); c.globalAlpha = alpha; c.fillStyle = col; c.fill(); c.globalAlpha = 1; if (stroke){ c.strokeStyle = stroke; c.lineWidth = 0.6; c.stroke(); } };
  /* curva dada por tramos de puntos 3D; frac = parte dibujada (0…1) */
  K.path = function(pts, col, w, dash, frac){ var n = Math.max(2, Math.round(pts.length*(frac == null ? 1 : frac))), i, p; if (pts.length < 2) return; c.strokeStyle = col; c.lineWidth = w; if (dash) c.setLineDash(dash); c.beginPath(); for (i = 0; i < Math.min(n, pts.length); i++){ p = K.at(pts[i]); if (i) c.lineTo(p[0], p[1]); else c.moveTo(p[0], p[1]); } c.stroke(); c.setLineDash([]); };
  K.dot = function(p, col, r){ var q = K.at(p); c.beginPath(); c.arc(q[0], q[1], r || 3.2, 0, 6.2832); c.fillStyle = col; c.fill(); };
  K.txt = function(t, x, y, col, sz, al){ c.font = '600 ' + (sz || 12.5) + 'px ' + FNT; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); };
  K.ejes = function(zt, zb){ K.line([0, 0, 0], [3.1, 0, 0], C.ink, 1); K.line([0, 0, 0], [0, 2.9, 0], C.ink, 1); K.line([0, 0, zb || 0], [0, 0, zt || 3.7], C.ink, 1); };
  K.suelo = function(){ K.poly([[-2, -2, 0], [2, -2, 0], [2, 2, 0], [-2, 2, 0]], C.ink, 0.035, 'rgba(0,0,0,0.18)'); };
  /* superficie z = f(x, y) sobre [-2,2]²; rows = cuántas filas (de atrás hacia adelante) se muestran, puede ser fraccionario */
  K.sup = function(f, zlo, zhi, alpha, rows){ var n = 8, h = 4/n, i, j, x, y, z, a, R = rows == null ? n : rows;
    for (i = 0; i < n; i++){ a = Math.max(0, Math.min(1, R - i)); if (a <= 0) break; for (j = 0; j < n; j++){ x = -2 + i*h; y = -2 + j*h; z = f(x + h/2, y + h/2);
      K.poly([[x, y, f(x, y)], [x + h, y, f(x + h, y)], [x + h, y + h, f(x + h, y + h)], [x, y + h, f(x, y + h)]], C.sec, Math.max(0.03, a*alpha*(0.1 + 0.22*Math.max(0, Math.min(1, (z - zlo)/(zhi - zlo))))), 'rgba(31,95,138,' + (0.45*a) + ')'); } } };
  return K;
}
function cmEtq(S, PZ){ var on = {}; return { L:function(id, p, ax, dx, dy){ on[id] = 1; S.lab(id, p[0] + (dx || 0), p[1] + (dy || 0), ax == null ? -50 : ax, -50, true); }, fin:function(){ PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); }); } }; }
var cmEJ = [['AX', 'x', 'x', ''], ['AY', 'y', 'y', ''], ['AZ', 'z', 'z', '']];
function cmEjesLab(K, L, zt){ L('AX', K.at([3.3, 0, 0])); L('AY', K.at([0, 3.1, 0])); L('AZ', K.at([0, 0, (zt || 3.7) + 0.2])); }
function cmSuave(w){ w = Math.max(0, Math.min(1, w)); return w*w*(3 - 2*w); }
function cmCirc(r, z){ var p = [], i, t; for (i = 0; i <= 72; i++){ t = 6.2832*i/72; p.push([r*Math.cos(t), r*Math.sin(t), z]); } return p; }

/* registro acumulado: la expresión de cada paso queda escrita, numerada, y se acumula hacia abajo */
function oaReg(S, k, n, xw, yw, FILA){ var c = S.ctx, C = S.C, x0 = S.X(xw), y0 = S.Y(yw), i, act;
  c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Paso a paso, lo que se va obteniendo:', x0, y0 - 24);
  for (i = 0; i < n; i++){ if (i >= k){ S.lab('R' + (i + 1), 0, 0, 0, 0, false); continue; } act = i === k - 1;
    c.beginPath(); c.arc(x0 + 9, y0 + FILA[i], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
    c.font = '700 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (i + 1), x0 + 9, y0 + FILA[i] + 0.5);
    S.lab('R' + (i + 1), x0 + 25, y0 + FILA[i], 0, -50, true); } }
