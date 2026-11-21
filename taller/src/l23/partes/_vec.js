/* flecha de vector para las hojas vectoriales del lote 23 */
function oaFle(S, x0, y0, x1, y1, col, w){ var c = S.ctx, ax = S.X(x0), ay = S.Y(y0), bx = S.X(x1), by = S.Y(y1), L = Math.sqrt((bx - ax)*(bx - ax) + (by - ay)*(by - ay)), a = Math.atan2(by - ay, bx - ax), h = Math.min(11, L*0.45);
  if (L < 2) return; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w || 2.6; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx - 0.7*h*Math.cos(a), by - 0.7*h*Math.sin(a)); c.stroke();
  c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - h*Math.cos(a - 0.38), by - h*Math.sin(a - 0.38)); c.lineTo(bx - h*Math.cos(a + 0.38), by - h*Math.sin(a + 0.38)); c.closePath(); c.fill(); }
