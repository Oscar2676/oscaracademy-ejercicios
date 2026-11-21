OA.scene('pol-definir', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, K = oaCar, TP = 2*Math.PI;
  return {
    world:{x0:-1.5, x1:2.9, y0:-2.4, y1:1.75}, aspect:4.15/4.4,
    _chk:[{f:K.r, df:K.dr, at:[0.5, 2, 4, 5.5]}, {f:K.x, df:K.dx, at:[0.5, 2, 4, 5.5]}, {f:K.y, df:K.dy, at:[0.5, 2, 4, 5.5]}],
    aria:'Sobre una rejilla polar, un rayo naranja sale del origen formando el ángulo theta con el eje polar. En su extremo, a distancia r igual a 1 más coseno de theta, hay un punto. Al girar el rayo una vuelta completa, el punto dibuja una cardioide azul, con forma de corazón. Mientras theta va de 0 a pi el rayo se acorta hasta cero; de pi a 2 pi se alarga hasta 2.',
    labels:[['F', 'r=1+\\cos\\theta\\qquad\\dfrac{dr}{d\\theta}=-\\operatorname{sen}\\theta', 'r = 1 + cos θ;  dr/dθ = −sen θ', 'diff']],
    sliders:[{id:'th', tex:'\\theta', min:0, max:6.2832, step:0.01, value:0.02}],
    legend:'<span><i class="sw rise"></i> rayo de largo \\(r\\)</span><span><i class="sw tan"></i> ángulo \\(\\theta\\)</span><span><i class="sw sec"></i> curva \\(r=1+\\cos\\theta\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.th = K.ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? RUN : v.q*RUN, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = K.x(th), y = K.y(th);
      oaRej(S, 2); oaPar(S, K.x, K.y, 0, TP, 'rgba(31,93,134,0.22)', 2); oaPar(S, K.x, K.y, 0, th, C.sec, 3.2);
      S.line(0, 0, x, y, {color:C.rise, width:3.4}); oaArco(S, th, 22, C.tan);
      S.line(x, y, x, 0, {color:C.muted, width:1.2, dash:[3, 3]}); c.setLineDash([]);
      S.dot(0, 0, C.ink); c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 6.5, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      txt('θ = ' + dec(th, 2) + ' rad', X(0) + 30, Y(0) + (Math.sin(th) >= 0 ? 15 : -15), 'left', C.tan);
      txt('r = ' + dec(K.r(th), 2), X(x/2) + (y >= 0 ? -8 : -8), Y(y/2) + (y >= 0 ? -13 : 13), 'right', C.rise);
      txt('(x; y) = (' + dec(x, 2) + '; ' + dec(y, 2) + ')', X(-1.45), Y(1.55), 'left', C.ink);
      txt(Math.abs(K.dr(th)) < 0.02 ? 'dr/dθ = 0' : K.dr(th) < 0 ? 'dr/dθ < 0: el rayo se acorta' : 'dr/dθ > 0: el rayo se alarga', X(-1.45), Y(1.55) + 20, 'left', C.rise);
      txt('eje polar', X(2.25), Y(0) + 13, 'center', C.muted); txt('polo', X(0) - 8, Y(0) + 13, 'right', C.muted);
      S.lab('F', X(-1.45), Y(-1.8), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Un punto se ubica con dos datos: el ángulo θ del rayo, medido desde el eje polar, y la distancia r al polo. Aquí r depende de θ: r = 1 + cos θ';
      if (th >= 6.28) return 'El rayo dio una vuelta completa y el punto dibujó la cardioide. El rayo se acortó de 2 a 0 en la primera media vuelta y se alargó de 0 a 2 en la segunda';
      return 'Con θ = ' + dec(th, 2) + ' rad, r = 1 + cos θ = ' + dec(K.r(th), 2) + '. La derivada dr/dθ = −sen θ = ' + dec(K.dr(th), 2) + ' dice cuánto cambia r por cada radián que gira el rayo';
    },
    readout:function(v){ var th = v.th == null ? 0.02 : v.th; return [['', 'r=1+\\cos\\theta\\approx ' + num(K.r(th), 2) + '\\qquad\\dfrac{dr}{d\\theta}=-\\operatorname{sen}\\theta\\approx ' + num(K.dr(th), 2)], ['d', 'x=r\\cos\\theta\\approx ' + num(K.x(th), 2) + '\\qquad y=r\\operatorname{sen}\\theta\\approx ' + num(K.y(th), 2)], ['', 'x^{2}+y^{2}=r^{2}\\approx ' + num(K.r(th)*K.r(th), 2)]]; }
  };
})());
