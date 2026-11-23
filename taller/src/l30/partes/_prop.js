/* utilidades del lote 30 (propiedades de límites): dos marcos lado a lado, frases con fondo y notas bajo los marcos */
/* frase corta con fondo, en coordenadas del marco M, corrida (dx, dy) píxeles */
function prFr(S, M, t, x, y, dx, dy, col, al){ var c = S.ctx; c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.textBaseline = 'middle'; c.textAlign = al || 'left'; var w = c.measureText(t).width, px = S.X(M.gx(x)) + (dx || 0), py = S.Y(M.gy(y)) + (dy || 0), l = al === 'right' ? px - w : (al === 'center' ? px - w/2 : px); c.globalAlpha = 0.9; c.fillStyle = S.C.bg || '#fff'; c.fillRect(l - 2, py - 7, w + 4, 14); c.globalAlpha = 1; c.fillStyle = col; c.fillText(t, px, py); }
/* nota bajo los marcos, en coordenadas del mundo; devuelve su ancho en píxeles (para poner una etiqueta TeX a continuación) */
function prNota(S, t, xw, yw, col){ var c = S.ctx; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textBaseline = 'middle'; c.textAlign = 'left'; c.fillStyle = col; c.fillText(t, S.X(xw), S.Y(yw)); return c.measureText(t).width; }
/* anillo alrededor de un punto del marco (para destacar un punto sin taparlo) */
function prAnillo(S, M, x, y, col, r){ var c = S.ctx; c.setLineDash([]); c.strokeStyle = col; c.lineWidth = 1.4; c.beginPath(); c.arc(S.X(M.gx(x)), S.Y(M.gy(y)), r || 7, 0, 6.2832); c.stroke(); }
/* las dos líneas de texto del paso y el contador «paso k de N», sobre el registro */
function prPie(S, k, N, TXT, yT, yR){ var c = S.ctx; lmTxt(S, TXT[k - 1][0], -1.2, yT); lmTxt(S, TXT[k - 1][1], -1.2, yT - 21/(S.X(1) - S.X(0))); c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = S.C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, S.X(5.2), S.Y(yR) - 26); }
