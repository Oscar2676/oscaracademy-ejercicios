/* utilidades del lote 29 (límites): gráficas de funciones dentro de un marco del lienzo */
/* marco: el rectángulo del mundo [wx, wx+ww] × [wy, wy+wh] muestra la ventana matemática [x0, x1] × [y0, y1] */
function lmMarco(wx, wy, ww, wh, x0, x1, y0, y1){ return { x0:x0, x1:x1, y0:y0, y1:y1, gx:function(x){ return wx + (x - x0)*ww/(x1 - x0); }, gy:function(y){ return wy + (y - y0)*wh/(y1 - y0); } }; }
/* redondeo a 2 decimales (los datos de una lectura numérica se redondean primero y se calcula con esos) */
function lmR2(z){ return Math.round(z*100)/100; }
/* número en TeX con coma decimal y sin ceros de relleno (hasta d decimales); lmP lo pone entre paréntesis si es negativo */
function lmN(z, d){ var s = (Math.round(z*Math.pow(10, d == null ? 2 : d))/Math.pow(10, d == null ? 2 : d)).toFixed(d == null ? 2 : d); if (s.indexOf('.') >= 0) s = s.replace(/0+$/, '').replace(/\.$/, ''); if (Number(s) === 0) s = '0'; return s.replace('.', '{,}'); }
function lmP(z, d){ var s = lmN(z, d); return s.charAt(0) === '-' ? '(' + s + ')' : s; }
/* el mismo número como texto plano para el lienzo (coma decimal, signo menos tipográfico) */
function lmT(z, d){ return lmN(z, d).replace('{,}', ',').replace('-', '−'); }
/* frase en el lienzo (solo frases y números; las expresiones van como etiquetas TeX) */
function lmTxt(S, t, xw, yw, col, al, peso){ var c = S.ctx; c.font = (peso || '600') + ' 12.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col || S.C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, S.X(xw), S.Y(yw)); }
/* número chico junto a un eje, en coordenadas del marco, corrido (dx, dy) píxeles */
function lmNum(S, M, t, x, y, dx, dy, col, al){ var c = S.ctx; c.font = '600 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col || S.C.muted || '#6b6b6b'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, S.X(M.gx(x)) + (dx || 0), S.Y(M.gy(y)) + (dy || 0)); }
/* ejes finos con marcas y números; o = {dx, dy: paso de las marcas (1 por defecto), sx, sy: listas de valores que NO se numeran} */
function lmEjes(S, M, o){ o = o || {}; var c = S.ctx, C = S.C, dx = o.dx || 1, dy = o.dy || 1, i, sx = o.sx || [], sy = o.sy || [], X0 = S.X(M.gx(M.x0)), X1 = S.X(M.gx(M.x1)), Y0 = S.Y(M.gy(M.y0)), Y1 = S.Y(M.gy(M.y1)), ox = S.X(M.gx(0)), oy = S.Y(M.gy(0));
  c.setLineDash([]); c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X0, oy); c.lineTo(X1, oy); c.moveTo(ox, Y0); c.lineTo(ox, Y1); c.stroke();
  c.fillStyle = C.ink; c.beginPath(); c.moveTo(X1 + 5, oy); c.lineTo(X1 - 2, oy - 3); c.lineTo(X1 - 2, oy + 3); c.closePath(); c.fill(); c.beginPath(); c.moveTo(ox, Y1 - 5); c.lineTo(ox - 3, Y1 + 2); c.lineTo(ox + 3, Y1 + 2); c.closePath(); c.fill();
  for (i = Math.ceil(M.x0/dx - 1e-9); i*dx <= M.x1 - dx*0.2; i++) if (i){ c.beginPath(); c.moveTo(S.X(M.gx(i*dx)), oy - 3); c.lineTo(S.X(M.gx(i*dx)), oy + 3); c.stroke(); if (sx.indexOf(i*dx) < 0) lmNum(S, M, lmT(i*dx, 2), i*dx, 0, 0, 11); }
  for (i = Math.ceil(M.y0/dy - 1e-9); i*dy <= M.y1 - dy*0.2; i++) if (i){ c.beginPath(); c.moveTo(ox - 3, S.Y(M.gy(i*dy))); c.lineTo(ox + 3, S.Y(M.gy(i*dy))); c.stroke(); if (sy.indexOf(i*dy) < 0) lmNum(S, M, lmT(i*dy, 2), 0, i*dy, -7, 0, null, 'right'); } }
/* curva y = f(x) entre a y b, recortada al marco; dash opcional */
function lmCurva(S, M, f, a, b, col, w, dash){ var c = S.ctx, i, n = 200, x, y, pen = false; if (b <= a) return; c.strokeStyle = col; c.lineWidth = w || 2; c.setLineDash(dash || []); c.beginPath();
  for (i = 0; i <= n; i++){ x = a + (b - a)*i/n; y = f(x); if (!isFinite(y) || y < M.y0 - 1e-9 || y > M.y1 + 1e-9){ pen = false; continue; } if (pen) c.lineTo(S.X(M.gx(x)), S.Y(M.gy(y))); else { c.moveTo(S.X(M.gx(x)), S.Y(M.gy(y))); pen = true; } }
  c.stroke(); c.setLineDash([]); }
/* punto de la gráfica: lleno (la función vale eso) o hueco (ahí la gráfica no tiene punto); r en píxeles */
function lmPunto(S, M, x, y, col, hueco, r){ var c = S.ctx; c.setLineDash([]); c.beginPath(); c.arc(S.X(M.gx(x)), S.Y(M.gy(y)), r || 3.2, 0, 6.2832); if (hueco){ c.fillStyle = S.C.bg || '#fff'; c.fill(); c.lineWidth = 1.6; c.strokeStyle = col; c.stroke(); } else { c.fillStyle = col; c.fill(); } }
/* segmento punteado en coordenadas del marco (guías hacia los ejes, rectas x = a, y = L) */
function lmSeg(S, M, xa, ya, xb, yb, col, w, dash){ var c = S.ctx; c.strokeStyle = col; c.lineWidth = w || 1; c.setLineDash(dash === 0 ? [] : (dash || [3, 3])); c.beginPath(); c.moveTo(S.X(M.gx(xa)), S.Y(M.gy(ya))); c.lineTo(S.X(M.gx(xb)), S.Y(M.gy(yb))); c.stroke(); c.setLineDash([]); }
/* guías punteadas de un punto (x, y) a los dos ejes; al = cuánto han aparecido (0 a 1) */
function lmGuia(S, M, x, y, col, al){ al = al == null ? 1 : al; if (al <= 0) return; lmSeg(S, M, x, 0, x, y*al, col, 1); if (al >= 1) lmSeg(S, M, x, y, 0, y, col, 1); }
/* flecha en coordenadas del marco, corrida (dx, dy) píxeles (para «acercarse» a lo largo de un eje) */
function lmFlecha(S, M, xa, ya, xb, yb, col, w, dx, dy){ var kx = (S.W.x1 - S.W.x0)/S.w, ky = (S.W.y1 - S.W.y0)/S.h; dx = (dx || 0)*kx; dy = -(dy || 0)*ky; dtFlecha(S, M.gx(xa) + dx, M.gy(ya) + dy, M.gx(xb) + dx, M.gy(yb) + dy, col, w || 1.6); }
/* etiqueta TeX en coordenadas del marco (T = dtEtq(S, PZ)) */
function lmEtq(T, M, id, x, y, ax, dx, dy){ T.L(id, M.gx(x), M.gy(y), ax, dx, dy); }
/* fondo bajo una etiqueta TeX (tapa las guías que le pasen por detrás); mismos argumentos que lmEtq, se llama antes */
function lmFondo(S, M, id, x, y, ax, dx, dy){ var c = S.ctx, w = S.labW(id), px = S.X(M.gx(x)) + (dx || 0), py = S.Y(M.gy(y)) + (dy || 0), l = px + (ax == null ? -50 : ax)/100*w; if (!w) return; c.globalAlpha = 0.88; c.fillStyle = S.C.bg || '#fff'; c.fillRect(l - 3, py - 9, w + 6, 18); c.globalAlpha = 1; }
