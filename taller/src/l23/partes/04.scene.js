OA.scene('pol-tangente', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, K = oaCar, TP = 2*Math.PI, PI = Math.PI;
  var HOR = [PI/3, 5*PI/3], VER = [0, 2*PI/3, 4*PI/3];
  return {
    world:{x0:-1.5, x1:2.9, y0:-2.4, y1:1.75}, aspect:4.15/4.4,
    _chk:[{f:K.x, df:K.dx, at:[0.5, 2, 4, 5.5]}, {f:K.y, df:K.dy, at:[0.5, 2, 4, 5.5]}],
    aria:'La cardioide azul r igual a 1 más coseno de theta sobre una rejilla polar. Un punto naranja la recorre y lleva una recta tangente burdeo que va cambiando de inclinación. Quedan marcados en verde los dos puntos donde la tangente es horizontal, en theta igual a pi tercios y 5 pi tercios, y en negro los tres donde es vertical, en theta igual a 0, 2 pi tercios y 4 pi tercios.',
    labels:[['F', '\\dfrac{dy}{dx}=\\dfrac{dy/d\\theta}{dx/d\\theta}=\\dfrac{(2\\cos\\theta-1)(\\cos\\theta+1)}{-\\operatorname{sen}\\theta\\,(1+2\\cos\\theta)}', 'dy/dx = (2cos θ − 1)(cos θ + 1) / [−sen θ (1 + 2cos θ)]', 'diff']],
    sliders:[{id:'th', tex:'\\theta', min:0, max:6.2832, step:0.01, value:0.02}],
    legend:'<span><i class="sw sec"></i> \\(r=1+\\cos\\theta\\)</span><span><i class="sw tan"></i> recta tangente</span><span><i class="sw alt"></i> tangente horizontal</span><span><i class="sw rise"></i> el punto</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.th = K.ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? RUN : v.q*RUN, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = K.x(th), y = K.y(th), dx = K.dx(th), dy = K.dy(th), n = Math.sqrt(dx*dx + dy*dy), ux, uy;
      oaRej(S, 2); oaPar(S, K.x, K.y, 0, TP, C.sec, 2.8);
      HOR.forEach(function(q){ if (th >= q - 0.01){ S.line(K.x(q) - 0.45, K.y(q), K.x(q) + 0.45, K.y(q), {color:C.alt, width:2.4}); S.dot(K.x(q), K.y(q), C.alt); } });
      VER.forEach(function(q){ if (th >= q - 0.01){ S.line(K.x(q), K.y(q) - 0.4, K.x(q), K.y(q) + 0.4, {color:C.ink, width:2}); S.dot(K.x(q), K.y(q), C.ink); } });
      S.line(0, 0, x, y, {color:C.rise, width:1.6, dash:[4, 3]}); c.setLineDash([]);
      if (n > 0.02){ ux = dx/n; uy = dy/n; S.line(x - 0.85*ux, y - 0.85*uy, x + 0.85*ux, y + 0.85*uy, {color:C.tan, width:3}); }
      c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 6.5, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      txt('θ = ' + dec(th, 2) + ' rad', X(-1.45), Y(1.55), 'left', C.rise);
      txt(n <= 0.02 ? 'punta: dx/dθ = dy/dθ = 0' : Math.abs(dx) < 0.03 ? 'tangente vertical' : 'pendiente = ' + dec(dy/dx, 2), X(-1.45), Y(1.55) + 20, 'left', C.tan);
      S.lab('F', X(-1.45), Y(-1.8), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? null : v.q*RUN, dx = K.dx(th), dy = K.dy(th);
      if (s != null && s < 2) return 'El punto va a recorrer la cardioide llevando su recta tangente. La pendiente de esa recta es dy/dx, y se calcula con las derivadas respecto de θ';
      if (th >= 6.28) return 'Vuelta completa. Tangente horizontal (verde) donde dy/dθ = 0 y dx/dθ ≠ 0: θ = π/3 y 5π/3. Tangente vertical (negro) donde dx/dθ = 0 y dy/dθ ≠ 0: θ = 0, 2π/3 y 4π/3';
      if (Math.abs(th - Math.PI) < 0.03) return 'En θ = π la curva pasa por el polo y hace una punta. Ahí dx/dθ y dy/dθ valen cero a la vez: la fórmula no decide y hay que mirar el límite';
      return 'En θ = ' + dec(th, 2) + ': dy/dθ = ' + dec(dy, 2) + ' y dx/dθ = ' + dec(dx, 2) + '. ' + (Math.abs(dx) < 0.03 ? 'El denominador es casi cero: tangente vertical' : 'Pendiente: ' + dec(dy, 2) + ' / (' + dec(dx, 2) + ') = ' + dec(dy/dx, 2));
    },
    readout:function(v){ var th = v.th == null ? 0.02 : v.th, dx = K.dx(th), dy = K.dy(th); return [['', '\\dfrac{dy}{d\\theta}=(2\\cos\\theta-1)(\\cos\\theta+1)\\approx ' + num(dy, 2)], ['d', '\\dfrac{dx}{d\\theta}=-\\operatorname{sen}\\theta\\,(1+2\\cos\\theta)\\approx ' + num(dx, 2)], ['', Math.abs(dx) < 0.03 ? '\\dfrac{dx}{d\\theta}\\approx 0:\\ \\text{la pendiente no es un número (vertical o punta)}' : '\\dfrac{dy}{dx}=\\dfrac{dy/d\\theta}{dx/d\\theta}\\approx ' + num(dy/dx, 2)]]; }
  };
})());
