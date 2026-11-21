OA.scene('vec-derivada', (function(){
  var RUN = 30, num = OA.num, PI = Math.PI, TA = PI/3;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function rx(t){ return 3*Math.cos(t); } function ry(t){ return 2*Math.sin(t); }
  /* fase 1 (hasta s = 13): t fijo, h → 0. fase 2: t recorre la elipse */
  function est(s){ if (s < 2) return [TA, 1.1]; if (s < 11) return [TA, 1.1*Math.pow(0.03/1.1, OA.smooth((s - 2)/9))]; if (s < 13) return [TA, 0]; return [TA + 2*PI*OA.smooth(cl((s - 13)/13)), 0]; }
  return {
    world:{x0:-5.3, x1:5.3, y0:-4.2, y1:4.6}, aspect:8.8/10.6,
    _chk:[{f:rx, df:function(t){ return -3*Math.sin(t); }, at:[0.5, 1, 2, 4]}, {f:ry, df:function(t){ return 2*Math.cos(t); }, at:[0.5, 1, 2, 4]}],
    aria:'Una elipse verde. Desde el origen, la flecha azul del vector posición r de t. Primero, con t fijo, una flecha naranja muestra el cociente incremental, que se acerca a la flecha roja del vector derivada mientras h se acerca a 0. Después el vector posición recorre la elipse y el vector derivada lo acompaña, siempre tangente.',
    labels:[['F', '\\vec{r}\\,\'(t)=\\langle -3\\operatorname{sen}t,\;2\\cos t\\rangle', 'r′(t) = ⟨−3 sen t, 2 cos t⟩', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:6.28, step:0.01, value:1.05}],
    legend:'<span><i class="sw alt"></i> curva</span><span><i class="sw sec"></i> \\(\\vec{r}(t)\\)</span><span><i class="sw rise"></i> cociente incremental</span><span><i class="sw tan"></i> \\(\\vec{r}\\,\'(t)\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ var e = est(p*RUN); v.q = p; v.t = e[0] % (2*PI); v.h = e[1]; }},
    onInput:function(v){ v.q = null; v.h = 0; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, h = v.h || 0, C = S.C, c = S.ctx, X = S.X, Y = S.Y, x = rx(t), y = ry(t), dx = -3*Math.sin(t), dy = 2*Math.cos(t), i, u, qx, qy;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function flecha(x0, y0, x1, y1, col, w, alfa){ var ax = X(x0), ay = Y(y0), bx = X(x1), by = Y(y1), a = Math.atan2(by - ay, bx - ax), L = Math.hypot(bx - ax, by - ay); if (L < 4) return; c.save(); c.globalAlpha = alfa || 1; c.strokeStyle = col; c.fillStyle = col; c.lineWidth = w; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx - 8*Math.cos(a), by - 8*Math.sin(a)); c.stroke(); c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - 11*Math.cos(a) + 5*Math.sin(a), by - 11*Math.sin(a) - 5*Math.cos(a)); c.lineTo(bx - 11*Math.cos(a) - 5*Math.sin(a), by - 11*Math.sin(a) + 5*Math.cos(a)); c.closePath(); c.fill(); c.restore(); }
      S.axes({gx:[-4, -2, 2, 4], gy:[-2, 2, 4]});
      c.strokeStyle = C.alt; c.lineWidth = 2.6; c.beginPath(); for (i = 0; i <= 160; i++){ u = 2*PI*i/160; if (i) c.lineTo(X(rx(u)), Y(ry(u))); else c.moveTo(X(rx(u)), Y(ry(u))); } c.stroke();
      if (h > 0){
        flecha(0, 0, rx(t + h), ry(t + h), C.sec, 2.2, 0.4);
        S.line(x, y, rx(t + h), ry(t + h), {color:C.muted, width:1.4, dash:[3, 3]});
        qx = (rx(t + h) - x)/h; qy = (ry(t + h) - y)/h;
        flecha(x, y, x + qx, y + qy, C.rise, 3);
        S.dot(rx(t + h), ry(t + h), C.sec);
        txt('h = ' + dec(h, 2), X(-5.1), Y(4.2), 'left', C.rise);
      }
      flecha(x, y, x + dx, y + dy, C.tan, 3, h > 0 ? 0.45 : 1);
      flecha(0, 0, x, y, C.sec, 3);
      S.dot(x, y, C.alt); S.dot(0, 0, C.ink);
      txt('r(t)', X(x/2) + 12, Y(y/2) + 12, 'left', C.sec);
      txt('r′(t)', X(x + dx) + (dx < 0 ? -10 : 10), Y(y + dy) - 12, dx < 0 ? 'right' : 'left', C.tan);
      S.lab('F', X(-5.1), Y(-3.7), 0, 0, v.q != null && s >= 11);
    },
    caption:function(v){
      var t = v.t, h = v.h || 0, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva verde: la elipse. Flecha azul: el vector posición r(t), en t = π/3. Flecha naranja: el cociente incremental, con h = 1,10';
      if (h > 0) return 'Con h = ' + dec(h, 2) + ': mientras h se acerca a 0, la flecha naranja del cociente incremental se acerca a la flecha roja, el vector derivada';
      if (s != null && s < 13) return 'En el límite, el cociente incremental es el vector derivada r′(t): tangente a la curva en la punta de r(t)';
      return 'Con t = ' + dec(t, 2) + ': el vector derivada acompaña a la punta de r(t) y es tangente a la curva en todo instante';
    },
    readout:function(v){ var t = v.t; return [['', '\\vec{r}(t)=\\langle 3\\cos t,\;2\\operatorname{sen}t\\rangle=\\langle ' + num(rx(t), 2) + ';\;' + num(ry(t), 2) + '\\rangle'], ['d', '\\vec{r}\\,\'(t)=\\langle -3\\operatorname{sen}t,\;2\\cos t\\rangle=\\langle ' + num(-3*Math.sin(t), 2) + ';\;' + num(2*Math.cos(t), 2) + '\\rangle']]; }
  };
})());
