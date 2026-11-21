OA.scene('par-segunda', oaMov((function(){
  var dec = oaDec, num = OA.num, HH = 0.2;
  function fx(t){ return t*t; } function fy(t){ return t*t*t - 3*t; } function m(t){ return (3*t*t - 3)/(2*t); } function dm(t){ return 1.5*(1 + 1/(t*t)); } function d2(t){ return dm(t)/(2*t); }
  return { fx:fx, fy:fy, a:0.4, b:1.8, run:24,
    world:{x0:-0.7, x1:5.1, y0:-6.8, y1:2.7}, aspect:9.5/5.8,
    chk:[{f:m, df:dm, at:[0.5, 1, 1.6]}, {f:fx, df:function(t){ return 2*t; }, at:[0.5, 1, 1.6]}, {f:fy, df:function(t){ return 3*t*t - 3; }, at:[0.5, 1, 1.6]}],
    axes:{x:[-0.5, 4.9], y:[-2.7, 2.5], tx:[1, 2, 3, 4], ty:[-2, -1, 1, 2]},
    aria:'Un punto recorre la curva x igual a t al cuadrado, y igual a t al cubo menos 3t, para t positivo. En el punto se dibuja la recta tangente naranja, de pendiente m. Un poco más adelante se dibuja otra tangente, más delgada, de pendiente m más dm. Sobre el eje x un tramo negro rotulado dx marca cuánto avanzó x entre las dos. La segunda derivada es el cociente dm sobre dx: como la pendiente va creciendo, es positiva y la curva es cóncava hacia arriba.',
    labels:[['F', '\\dfrac{d^{2}y}{dx^{2}}=\\dfrac{\\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)}{\\dfrac{dx}{dt}}', 'd²y/dx² = [d/dt (dy/dx)] / (dx/dt)', 'diff']],
    legend:'<span><i class="sw sec"></i> curva \\(x=t^{2},\\ y=t^{3}-3t\\)</span><span><i class="sw rise"></i> tangente en \\(t\\), pendiente \\(m=\\dfrac{dy}{dx}\\)</span><span><i class="sw tan"></i> tangente un poco después, pendiente \\(m+dm\\)</span>',
    bar:{x0:-0.5, x1:4.9, y:-3.3, la:'0,4', lb:'1,8'}, textAt:[-0.6, -4.1], labAt:[-0.6, -6.05],
    before:function(S, t, H){ var c = S.ctx, C = S.C, X = S.X, Y = S.Y, t1 = t + HH;
      function tang(u, col, w, half){ var x = fx(u), y = fy(u), k = m(u), L = half/Math.sqrt(1 + k*k); c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.moveTo(X(x - L), Y(y - k*L)); c.lineTo(X(x + L), Y(y + k*L)); c.stroke(); return [x + L, y + k*L]; }
      var e1 = tang(t1, C.tan, 1.2, 0.85), e0 = tang(t, C.rise, 2, 0.85);
      H.dot(fx(t1), fy(t1), C.tan, 2.4);
      H.txt('m', X(e0[0]) + 9, Y(e0[1]) + 8, 'left', C.rise); H.txt('m + dm', X(e1[0]) + 6, Y(e1[1]) - 9, 'left', C.tan);
      c.strokeStyle = C.grid; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(fx(t)), Y(fy(t))); c.lineTo(X(fx(t)), Y(0)); c.moveTo(X(fx(t1)), Y(fy(t1))); c.lineTo(X(fx(t1)), Y(0)); c.stroke(); c.setLineDash([]);
      c.strokeStyle = C.ink; c.lineWidth = 3; c.beginPath(); c.moveTo(X(fx(t)), Y(0)); c.lineTo(X(fx(t1)), Y(0)); c.stroke();
      c.lineWidth = 1; c.beginPath(); c.moveTo(X((fx(t) + fx(t1))/2), Y(0) - 3); c.lineTo(X((fx(t) + fx(t1))/2) + 8, Y(0) - 20); c.stroke(); H.txt('dx', X((fx(t) + fx(t1))/2) + 10, Y(0) - 28, 'left', C.ink); },
    lines:function(t){ return [['t = ' + dec(t, 2), 'ink'], ['m = dy/dx = (3t² − 3)/(2t) = ' + dec(m(t), 2), 'rise'], ['dm/dt = (3/2)(1 + 1/t²) = ' + dec(dm(t), 2), 'tan'], ['dx/dt = 2t = ' + dec(2*t, 2), 'ink'], ['d²y/dx² = (' + dec(dm(t), 2) + ') / (' + dec(2*t, 2) + ') = ' + dec(d2(t), 2) + ' > 0', 'sec']]; },
    caption:function(t, ini, fin){ if (ini) return 'La tangente naranja tiene pendiente m = dy/dx. La burdeo es la tangente un poco más adelante: su pendiente es m + dm. Entre una y otra, x avanzó dx (tramo negro sobre el eje)'; if (fin) return 'En todo el recorrido la pendiente fue creciendo al avanzar x: d²y/dx² > 0 y la curva es cóncava hacia arriba. Ojo: se divide por dx/dt, no se usa y″/x″'; return 'En t = ' + dec(t, 2) + ' la pendiente es ' + dec(m(t), 2) + ' y crece a razón de ' + dec(dm(t), 2) + ' por unidad de t, mientras x crece a razón de ' + dec(2*t, 2) + '. Por unidad de x, la pendiente crece ' + dec(d2(t), 2); },
    readout:function(t){ return [['', 'm=\\dfrac{dy}{dx}=\\dfrac{3t^{2}-3}{2t}=\\dfrac{3}{2}\\left(t-\\dfrac{1}{t}\\right)\\qquad\\dfrac{dm}{dt}=\\dfrac{3}{2}\\left(1+\\dfrac{1}{t^{2}}\\right)'], ['d', '\\dfrac{d^{2}y}{dx^{2}}=\\dfrac{dm/dt}{dx/dt}=\\dfrac{\\frac{3}{2}\\left(1+\\frac{1}{t^{2}}\\right)}{2t}=\\dfrac{3\\left(t^{2}+1\\right)}{4t^{3}}'], ['', 't=' + num(t, 2) + ':\\quad\\dfrac{d^{2}y}{dx^{2}}\\approx ' + num(d2(t), 2)]]; }
  };
})()));
