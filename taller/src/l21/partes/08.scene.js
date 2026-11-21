OA.scene('int-sustitucion', (function(){
  var RUN = 22, num = OA.num, XM = Math.sqrt(Math.PI/2);
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function f(t){ return 2*t*Math.cos(t*t); }
  function xs(s){ return s < 2 ? 0 : s < 16 ? XM*(s - 2)/14 : s < 18 ? XM : XM - 0.35*OA.smooth(cl((s - 18)/2.5)); }
  var T0 = 11.6, T1 = 19.2, B0 = 1.2, B1 = 8.8;
  function yt(y){ return T0 + y/1.25*(T1 - T0); } function yb(y){ return B0 + y/1.25*(B1 - B0); }
  return {
    world:{x0:-0.22, x1:1.75, y0:-0.9, y1:20.6}, aspect:1.08,
    _chk:[{f:function(x){ return Math.sin(x*x); }, df:f, at:[0.3, 0.7, 1, 1.2]}],
    aria:'Dos gráficas, una sobre otra. Arriba, la curva y igual a 2t por coseno de t al cuadrado, con el área pintada de 0 a x. Abajo, la curva y igual a coseno de u, con el área pintada de 0 a u igual a x al cuadrado. Las dos áreas valen siempre lo mismo, seno de x al cuadrado, y llegan a 1.',
    labels:[['F', '\\displaystyle\\int_{0}^{x}2t\\cos\\left(t^{2}\\right)dt=\\int_{0}^{x^{2}}\\cos u\\,du=\\operatorname{sen}\\left(x^{2}\\right)', 'las dos áreas valen sen(x²)', 'diff']],
    sliders:[{id:'x', tex:'x', min:0, max:1.25, step:0.005, value:0}],
    legend:'<span><i class="sw sec"></i> \\(y=2t\\cos\\left(t^{2}\\right)\\)</span><span><i class="sw rise"></i> \\(y=\\cos u\\)</span><span><i class="sw alt"></i> áreas iguales</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = Math.min(v.x, XM), u = x*x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, a, pa = [[0, yt(0)]], pb = [[0, yb(0)]], ar = Math.sin(u);
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      [[yt, [0.5, 1], [[XM, '√(π/2)']]], [yb, [0.5, 1, 1.5], [[Math.PI/2, 'π/2']]]].forEach(function(e){
        S.line(0, e[0](0), 1.7, e[0](0), {color:C.ink, width:1.4}); S.line(0, e[0](0), 0, e[0](1.22), {color:C.ink, width:1.4});
        e[1].forEach(function(q){ S.line(q, e[0](0) - 0.12, q, e[0](0) + 0.12, {color:C.ink, width:1}); txt(('' + q).replace('.', ','), X(q), Y(e[0](0)) + 12, 'center', C.muted); });
        e[2].forEach(function(q){ S.line(q[0], e[0](0) - 0.2, q[0], e[0](0) + 0.2, {color:C.ink, width:1.6}); txt(q[1], X(q[0]), Y(e[0](0)) + 28, 'center', C.ink); });
        S.line(-0.012, e[0](1), 0.012, e[0](1), {color:C.ink, width:1}); txt('1', X(0) - 7, Y(e[0](1)), 'right', C.muted);
      });
      for (i = 0; i <= 60; i++){ a = x*i/60; pa.push([a, yt(f(a))]); } pa.push([x, yt(0)]);
      for (i = 0; i <= 60; i++){ a = u*i/60; pb.push([a, yb(Math.cos(a))]); } pb.push([u, yb(0)]);
      if (x > 0.005){ S.poly(pa, {fill:C.alt, alpha:0.45}); S.poly(pb, {fill:C.alt, alpha:0.45}); }
      c.strokeStyle = C.sec; c.lineWidth = 2.6; c.setLineDash([]); c.beginPath(); for (i = 0; i <= 120; i++){ a = XM*i/120; if (i) c.lineTo(X(a), Y(yt(f(a)))); else c.moveTo(X(a), Y(yt(f(a)))); } c.stroke();
      c.strokeStyle = C.rise; c.beginPath(); for (i = 0; i <= 120; i++){ a = Math.PI/2*i/120; if (i) c.lineTo(X(a), Y(yb(Math.cos(a)))); else c.moveTo(X(a), Y(yb(Math.cos(a)))); } c.stroke();
      (function(){ var q1 = x, q0 = Math.max(0, q1 - 0.035), yb_ = yt(0), yt_ = yt(f(x)), sd = yt_ >= yb_ ? 1 : -1; S.poly([[q0, yb_], [q1, yb_], [q1, yt_], [q0, yt_]], {fill:C.ink, alpha:0.8}); if (q1 - q0 > 0.5*(0.035)){ c.strokeStyle = C.ink; c.lineWidth = 1.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(q0), Y(yb_) + 9*sd); c.lineTo(X(q1), Y(yb_) + 9*sd); c.moveTo(X(q0), Y(yb_) + 5*sd); c.lineTo(X(q0), Y(yb_) + 13*sd); c.moveTo(X(q1), Y(yb_) + 5*sd); c.lineTo(X(q1), Y(yb_) + 13*sd); c.stroke(); txt('dt', X((q0 + q1)/2) + -16, Y(yb_) + 23*sd, 'center', C.ink); } })(); S.dot(x, yt(0), C.sec);
      (function(){ var q1 = u, q0 = Math.max(0, q1 - 0.035), yb_ = yb(0), yt_ = yb(Math.cos(u)), sd = yt_ >= yb_ ? 1 : -1; S.poly([[q0, yb_], [q1, yb_], [q1, yt_], [q0, yt_]], {fill:C.ink, alpha:0.8}); if (q1 - q0 > 0.5*(0.035)){ c.strokeStyle = C.ink; c.lineWidth = 1.4; c.setLineDash([]); c.beginPath(); c.moveTo(X(q0), Y(yb_) + 9*sd); c.lineTo(X(q1), Y(yb_) + 9*sd); c.moveTo(X(q0), Y(yb_) + 5*sd); c.lineTo(X(q0), Y(yb_) + 13*sd); c.moveTo(X(q1), Y(yb_) + 5*sd); c.lineTo(X(q1), Y(yb_) + 13*sd); c.stroke(); txt('du', X((q0 + q1)/2) + -16, Y(yb_) + 23*sd, 'center', C.ink); } })(); S.dot(u, yb(0), C.rise);
      txt('y = 2t · cos(t²)', X(1.7), Y(T1 + 0.5), 'right', C.sec); txt('y = cos u', X(1.7), Y(B1 + 0.5), 'right', C.rise);
      txt('x = ' + dec(x, 2), X(x) + 10, Y(yt(f(x))) - 12, 'left', C.sec);
      txt('u = x² = ' + dec(u, 2), X(u) + 10, Y(yb(Math.cos(u))) - 12, 'left', C.rise);
      if (x > 0.5){ txt('área ≈ ' + dec(ar, 3), X(Math.min(x, 1)*0.62), Y(yt(0.32)), 'center', C.alt); txt('área ≈ ' + dec(ar, 3), X(Math.max(0.32, u*0.45)), Y(yb(0.32)), 'center', C.alt); }
      S.lab('F', X(0.02), Y(10.3), 0, 0, v.q != null && s >= 20.5);
    },
    caption:function(v){
      var x = Math.min(v.x, XM), s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Arriba: la integral original, en la variable t. Abajo: la misma integral después de sustituir u = t². El área se pinta en las dos a la vez';
      return 'Con x = ' + dec(x, 2) + ' arriba, abajo se llega a u = x² = ' + dec(x*x, 2) + '. Las dos áreas valen lo mismo: cerca de ' + dec(Math.sin(x*x), 3);
    },
    readout:function(v){ var x = Math.min(v.x, XM); return [['', 'u=t^{2}\\qquad du=2t\\,dt'], ['d', '\\displaystyle\\int_{0}^{x}2t\\cos\\left(t^{2}\\right)dt=\\int_{0}^{x^{2}}\\cos u\\,du=\\Big[\\operatorname{sen}u\\Big]_{0}^{x^{2}}=\\operatorname{sen}\\left(x^{2}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad\\operatorname{sen}\\left(' + num(x*x, 2) + '\\right)\\approx ' + num(Math.sin(x*x), 3)]]; }
  };
})());
