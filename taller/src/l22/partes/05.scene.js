OA.scene('apl-acumulacion-contexto', (function(){
  var RUN = 26, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function r(t){ return 8 - t; }
  function N(t){ return 8*t - t*t/2; }          /* cambio neto desde t = 0 */
  function ts(s){ return s < 2 ? 0 : s < 12 ? 8*(s - 2)/10 : s < 14 ? 8 : s < 19 ? 8 + 4*(s - 14)/5 : 12; }
  var TX0 = 19.6, TX1 = 23.4, TY0 = -5.2, TH = 14.2;   /* estanque: 100 litros = TH */
  function lev(q){ return TY0 + q/100*TH; }
  return {
    world:{x0:-2, x1:24.3, y0:-9.4, y1:11.6}, aspect:0.64,
    _chk:[{f:N, df:r, at:[2, 5, 8, 11]}],
    aria:'A la izquierda, la gráfica de la razón neta r de t igual a 8 menos t, en litros por minuto, con el área pintada hasta el instante t: verde mientras la razón es positiva, hasta el minuto 8, y burdeo después. A la derecha, un estanque cuyo nivel sube de 50 a 82 litros en el minuto 8 y luego baja a 74 litros en el minuto 12.',
    labels:[['F', 'Q(12)=Q(0)+\\displaystyle\\int_{0}^{12}r(t)\\,dt=50+32-8=74\\ \\text{L}', 'Q(12) = Q(0) + ∫ de 0 a 12 de r(t) dt = 50 + 32 − 8 = 74 L', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:12, step:0.02, value:0}],
    legend:'<span><i class="sw rise"></i> \\(r(t)=8-t\\), razón neta</span><span><i class="sw alt"></i> entra más de lo que sale</span><span><i class="sw tan"></i> sale más de lo que entra</span><span><i class="sw sec"></i> agua del estanque</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, Q = 50 + N(t), m = r(t), ta = Math.min(t, 8), g, xa = X(TX0), xb = X(TX1), yb = Y(TY0), yt = Y(lev(100)), yq = Y(lev(Q));
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xc = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xc, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      /* gráfica de r(t) */
      S.line(0, 0, 12.9, 0, {color:C.ink, width:1.4}); S.line(0, -5, 0, 9.4, {color:C.ink, width:1.4});
      [2, 4, 6, 8, 10, 12].forEach(function(q){ S.line(q, -0.15, q, 0.15, {color:C.ink, width:1}); txt('' + q, X(q), Y(0) + (q > 8 ? -13 : 13), 'center', C.muted); });
      [-4, 4, 8].forEach(function(q){ S.line(-0.1, q, 0.1, q, {color:C.ink, width:1}); txt(('' + q).replace('-', '−'), X(0) - 7, Y(q), 'right', C.muted); });
      txt('t (min)', X(13.1), Y(0), 'left', C.muted); txt('litros por minuto', X(0.3), Y(9.6), 'left', C.muted);
      if (t > 0.01) S.poly([[0, 0], [0, 8], [ta, r(ta)], [ta, 0]], {fill:C.alt, alpha:0.5});
      if (t > 8.01) S.poly([[8, 0], [t, r(t)], [t, 0]], {fill:C.tan, alpha:0.45});
      S.line(0, 8, 12.4, r(12.4), {color:C.rise, width:2.6});
      var DT = 0.28, t0 = Math.max(0, t - DT), sd = m >= 0 ? 1 : -1; S.poly([[t0, 0], [t, 0], [t, m], [t0, m]], {fill:C.ink, alpha:0.8}); S.line(t0, 0, t0, m, {color:C.ink, width:1.2}); S.line(t, 0, t, m, {color:C.ink, width:1.2}); S.dot(t, m, C.rise);
      if (t > 0.4 && t < 11.9 && Math.abs(m) > 0.8){ var lf_ = t > 8; c.strokeStyle = C.ink; c.lineWidth = 1.3; c.setLineDash([]); c.beginPath(); c.moveTo(X(lf_ ? t0 : t), Y(m/2)); c.lineTo(X(lf_ ? t0 : t) + (lf_ ? -12 : 12), Y(m/2)); c.stroke(); txt('ancho de la tira = dt', X(lf_ ? t0 : t) + (lf_ ? -14 : 14), Y(m/2), lf_ ? 'right' : 'left', C.ink); }
      txt('r(t) = 8 − t', X(2.6), Y(7.2), 'left', C.rise);
      txt('r = ' + dec(m, 1) + ' L/min', X(t) + 10, Y(m) + (m >= 0 ? -12 : 13), 'left', C.ink);
      if (t >= 8) txt('+32 L', X(2.6), Y(2.6), 'center', C.alt); if (t >= 11.99) txt('−8 L', X(11.1), Y(-3.5), 'center', C.tan);
      /* estanque */
      g = c.createLinearGradient(xa, 0, xb, 0); g.addColorStop(0, '#2f6f9f'); g.addColorStop(0.45, '#8fc4e6'); g.addColorStop(1, '#245d88');
      c.fillStyle = g; c.fillRect(xa, yq, xb - xa, yb - yq);
      c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(xa, yq, xb - xa, 3);
      c.strokeStyle = C.ink; c.lineWidth = 2.2; c.setLineDash([]); c.beginPath(); c.moveTo(xa, yt); c.lineTo(xa, yb); c.lineTo(xb, yb); c.lineTo(xb, yt); c.stroke();
      [[50, 'parte: 50 L'], [82, 'máximo: 82 L']].forEach(function(q){ S.line(TX0 - 0.35, lev(q[0]), TX0, lev(q[0]), {color:C.ink, width:1.2}); if (q[0] === 50 || t >= 8) txt(q[1], X(TX0) - 12, Y(lev(q[0])), 'right', C.muted); });
      txt('Q(t) = ' + dec(Q, 1) + ' L', (xa + xb)/2, yq + 18, 'center', C.sec);
      txt('estanque', (xa + xb)/2, yb + 14, 'center', C.muted);
      S.lab('F', X(0.4), Y(-7.9), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, m = r(t);
      if (s != null && s < 2) return 'El estanque parte con 50 litros. La recta naranja es la razón neta: lo que entra menos lo que sale, por minuto. El área bajo ella dice cuántos litros cambia el contenido';
      if (Math.abs(t - 8) < 0.011) return 'En t = 8 la razón neta vale cero: entra lo mismo que sale. El contenido deja de subir. Es el máximo: 50 + 32 = 82 litros';
      if (t >= 11.99) return 'En t = 12: subió 32 litros y bajó 8. Contenido final: 50 + 32 − 8 = 74 litros';
      return 'En t = ' + dec(t, 1) + ' min la razón neta es ' + dec(m, 1) + ' L/min: ' + (m > 0 ? 'entra más de lo que sale, el área suma y el nivel sube' : 'sale más de lo que entra, el área resta y el nivel baja');
    },
    readout:function(v){ var t = v.t; return [['', '\\displaystyle\\int_{0}^{t}r(\\tau)\\,d\\tau=\\int_{0}^{t}(8-\\tau)\\,d\\tau=8t-\\dfrac{t^{2}}{2}\\approx ' + num(N(t), 1) + '\\ \\text{L}'], ['d', 'Q(t)=Q(0)+\\displaystyle\\int_{0}^{t}r(\\tau)\\,d\\tau=50+8t-\\dfrac{t^{2}}{2}\\approx ' + num(50 + N(t), 1) + '\\ \\text{L}'], ['', '\\dfrac{\\text{L}}{\\text{min}}\\cdot\\text{min}=\\text{L}']]; }
  };
})());
