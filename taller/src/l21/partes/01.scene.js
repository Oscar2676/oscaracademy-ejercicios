OA.scene('acu-exploracion', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function r(t){ return 6 - 2*t; } function ac(t){ return 6*t - t*t; }
  function ts(s){ return s < 2 ? 0 : s < 10 ? 3*(s - 2)/8 : s < 11.5 ? 3 : s < 17 ? 3 + 2*(s - 11.5)/5.5 : 5; }
  return {
    world:{x0:-1, x1:9.6, y0:-6, y1:8}, aspect:14/10.6*0.72,
    _chk:[{f:ac, df:r, at:[0.5, 1, 3, 4.5]}],
    aria:'A la izquierda, la gráfica de la razón de cambio r de t igual a 6 menos 2t, una recta que baja y cruza el eje en t igual a 3. El área entre la recta y el eje se pinta de verde mientras es positiva y de burdeo cuando es negativa. A la derecha, un estanque cuyo nivel sube hasta 13 litros en t igual a 3 y luego baja hasta 9 litros en t igual a 5.',
    labels:[['F', '\\displaystyle\\int_{0}^{5}(6-2t)\\,dt=9-4=5', '∫ de 0 a 5 de (6 − 2t) dt = 9 − 4 = 5', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:5, step:0.01, value:0}],
    legend:'<span><i class="sw sec"></i> razón \\(r(t)=6-2t\\)</span><span><i class="sw alt"></i> entra: suma</span><span><i class="sw tan"></i> sale: resta</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, V = 4 + ac(t), tx0 = 6.9, tx1 = 9.2, ty0 = -5, k = 0.8;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      /* ejes de la gráfica de la razón */
      S.line(0, 0, 5.6, 0, {color:C.ink, width:1.5}); S.line(0, -5, 0, 7.4, {color:C.ink, width:1.5});
      [1, 2, 3, 4, 5].forEach(function(u){ S.line(u, -0.15, u, 0.15, {color:C.ink, width:1}); txt('' + u, X(u), Y(0) + 13, 'center', C.muted); });
      [-4, -2, 2, 4, 6].forEach(function(u){ S.line(-0.07, u, 0.07, u, {color:C.ink, width:1}); txt(('' + u).replace('-', '−'), X(0) - 8, Y(u), 'right', C.muted); });
      txt('t (min)', X(5.5), Y(0) - 12, 'center', C.ink); txt('r (litros por minuto)', X(0.15), Y(7.6), 'left', C.ink);
      /* área acumulada */
      if (t > 0) S.poly([[0, 0], [0, 6], [Math.min(t, 3), r(Math.min(t, 3))], [Math.min(t, 3), 0]], {fill:C.alt, alpha:0.45});
      if (t > 3) S.poly([[3, 0], [t, r(t)], [t, 0]], {fill:C.tan, alpha:0.45});
      S.line(0, 6, 5.3, r(5.3), {color:C.sec, width:2.6});
      (function(){ var q1 = t, q0 = Math.max(0, q1 - 0.13), yb_ = 0, yt_ = r(t), sd = yt_ >= yb_ ? 1 : -1; S.poly([[q0, yb_], [q1, yb_], [q1, yt_], [q0, yt_]], {fill:C.ink, alpha:0.8}); if (q1 - q0 > 0.5*(0.13)){ c.strokeStyle = C.ink; c.lineWidth = 1.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(q0), Y(yb_) + 9*sd); c.lineTo(X(q1), Y(yb_) + 9*sd); c.moveTo(X(q0), Y(yb_) + 5*sd); c.lineTo(X(q0), Y(yb_) + 13*sd); c.moveTo(X(q1), Y(yb_) + 5*sd); c.lineTo(X(q1), Y(yb_) + 13*sd); c.stroke(); txt('dt', X((q0 + q1)/2) + -16, Y(yb_) + 23*sd, 'center', C.ink); } })(); S.dot(t, r(t), C.sec);
      if (t >= 1.2) txt(t < 3 ? '+' + dec(ac(t), 2) : '+9', X(Math.min(t, 3)/3), Y(2), 'left', C.alt);
      if (t > 3.6) txt('−' + dec((t - 3)*(t - 3), 2), X(3 + (t - 3)*0.75) + 2, Y(-0.9), 'center', C.tan);
      if (Math.abs(t - 3) < 0.004) txt('r(3) = 0', X(3), Y(0) - 16, 'center', C.sec);
      /* estanque */
      c.fillStyle = C.sec; c.globalAlpha = 0.55; c.fillRect(X(tx0), Y(ty0 + k*V), X(tx1) - X(tx0), Y(ty0) - Y(ty0 + k*V)); c.globalAlpha = 1;
      c.strokeStyle = C.ink; c.lineWidth = 2.4; c.beginPath(); c.moveTo(X(tx0), Y(ty0 + k*14.5)); c.lineTo(X(tx0), Y(ty0)); c.lineTo(X(tx1), Y(ty0)); c.lineTo(X(tx1), Y(ty0 + k*14.5)); c.stroke();
      S.line(tx0, ty0 + k*4, tx1, ty0 + k*4, {color:C.muted, width:1.2, dash:[4, 3]}); txt('4', X(tx0) - 7, Y(ty0 + k*4), 'right', C.muted);
      S.line(tx0, ty0 + k*13, tx1, ty0 + k*13, {color:C.muted, width:1.2, dash:[4, 3]}); txt('13', X(tx0) - 7, Y(ty0 + k*13), 'right', C.muted);
      txt(dec(V, 2) + ' L', X((tx0 + tx1)/2), Y(ty0 + k*V/2), 'center', C.sec);
      txt('estanque', X((tx0 + tx1)/2), Y(ty0) + 14, 'center', C.ink);
      S.lab('F', X(0.25), Y(-5.35), 0, 0, v.q != null && s >= 18.5);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Recta azul: la razón de cambio, en litros por minuto. A la derecha, el estanque, que parte con 4 litros';
      if (Math.abs(t - 3) < 0.004) return 'En t = 3 la razón es 0: dejó de entrar agua. Entraron 9 litros y el estanque tiene 13, su máximo';
      if (t < 3) return 'La razón es positiva: entra agua. El área verde, ' + dec(ac(t), 2) + ' litros, es lo acumulado hasta t = ' + dec(t, 2);
      return 'La razón es negativa: sale agua. El área burdeo resta: 9 − ' + dec((t - 3)*(t - 3), 2) + ' = ' + dec(ac(t), 2) + ' litros acumulados hasta t = ' + dec(t, 2);
    },
    readout:function(v){ var t = v.t; return [['', '\\displaystyle\\int_{0}^{t}(6-2\\tau)\\,d\\tau=6t-t^{2}'], ['d', 't=' + num(t, 2) + ':\\quad 6\\cdot(' + num(t, 2) + ')-(' + num(t, 2) + ')^{2}=' + num(ac(t), 2)], ['', '\\text{estanque}=4+' + num(ac(t), 2) + '=' + num(4 + ac(t), 2)]]; }
  };
})());
