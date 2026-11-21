OA.scene('vec-movimiento', oaMov((function(){
  var dec = oaDec, num = OA.num, DT = 0.12;
  function fx(t){ return t*t; } function fy(t){ return t*t*t/3 - t; } function dx(t){ return 2*t; } function dy(t){ return t*t - 1; } function sp(t){ return t*t + 1; } function dist(t){ return t*t*t/3 + t; }
  return { fx:fx, fy:fy, a:0, b:2, run:24,
    world:{x0:-0.9, x1:8.5, y0:-9.1, y1:4.1}, aspect:13.2/9.4,
    chk:[{f:fx, df:dx, at:[0.3, 1, 1.7]}, {f:fy, df:dy, at:[0.3, 1, 1.7]}, {f:dist, df:sp, at:[0.3, 1, 1.7]}],
    axes:{x:[-0.6, 8.2], y:[-1.3, 3.9], tx:[2, 4, 6], ty:[-1, 1, 2, 3]},
    aria:'Un punto se mueve por la curva r de t igual a t al cuadrado, t al cubo sobre 3 menos t, desde el origen. Una flecha burdeo, tangente, muestra su velocidad 2t, t al cuadrado menos 1. Un pedacito negro de la curva, rotulado ds igual a rapidez por dt, muestra lo que avanza en un instante. Una flecha naranja une el punto de partida con la posición actual: es el desplazamiento. Bajo el dibujo, una regla azul crece con la distancia recorrida, que es la suma de todos los pedacitos ds.',
    labels:[['F', 'd=\\displaystyle\\int_{0}^{2}\\big|\\vec v(t)\\big|\\,dt=\\int_{0}^{2}\\left(t^{2}+1\\right)dt=\\dfrac{14}{3}', 'd = ∫₀² |v(t)| dt = 14/3', 'diff']],
    legend:'<span><i class="sw sec"></i> trayectoria y distancia recorrida</span><span><i class="sw tan"></i> velocidad \\(\\vec v(t)\\)</span><span><i class="sw rise"></i> desplazamiento \\(\\vec r(t)-\\vec r(0)\\)</span>',
    bar:{x0:-0.5, x1:8.1, y:-3.75, la:'0', lb:'2'}, textAt:[-0.7, -4.9], labAt:[-0.7, -8.3],
    before:function(S, t, H){ var c = S.ctx, C = S.C, X = S.X, Y = S.Y, d = dist(t), k;
      /* regla de la distancia */
      c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0), Y(-2.3)); c.lineTo(X(5), Y(-2.3)); c.stroke(); for (k = 0; k <= 5; k++){ c.beginPath(); c.moveTo(X(k), Y(-2.3) - 3); c.lineTo(X(k), Y(-2.3) + 3); c.stroke(); H.num('' + k, X(k), Y(-2.3) + 11, 'center'); }
      c.strokeStyle = C.sec; c.lineWidth = 3; c.beginPath(); c.moveTo(X(0), Y(-2.3)); c.lineTo(X(d), Y(-2.3)); c.stroke();
      H.txt('distancia recorrida: la curva «estirada»', X(0), Y(-2.3) - 13, 'left', C.sec); },
    arrows:function(t){ var x = fx(t), y = fy(t); return [[0, 0, x, y, 'rise', '', [0, 0], 1.6], [x, y, x + dx(t), y + dy(t), 'tan', 'v(t)', [8, -8]]]; },
    after:function(S, t, H){ var c = S.ctx, C = S.C, X = S.X, Y = S.Y, t1 = Math.min(2, t + DT), xm, ym; if (t1 - t < 0.02) return;
      oaPar(S, fx, fy, t, t1, C.ink, 3.2); xm = X(fx((t + t1)/2)); ym = Y(fy((t + t1)/2)); c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(xm, ym + 3); c.lineTo(xm + 12, ym + 24); c.stroke(); H.txt('ds = |v(t)| dt', xm + 14, ym + 32, 'left', C.ink); },
    lines:function(t){ return [['t = ' + dec(t, 2), 'ink'], ['v(t) = ⟨2t, t² − 1⟩ = ⟨' + dec(dx(t), 2) + '; ' + dec(dy(t), 2) + '⟩', 'tan'], ['rapidez |v(t)| = t² + 1 = ' + dec(sp(t), 2), 'tan'], ['distancia = t³/3 + t = ' + dec(dist(t), 2), 'sec'], ['desplazamiento = ⟨' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + '⟩, de largo ' + dec(Math.sqrt(fx(t)*fx(t) + fy(t)*fy(t)), 2), 'rise']]; },
    caption:function(t, ini, fin){ if (ini) return 'El punto parte del origen. En cada instante avanza un pedacito ds = |v(t)| dt: rapidez por tiempo. La regla azul de abajo va a ir sumando esos pedacitos'; if (fin) return 'En t = 2 la distancia recorrida es 14/3 ≈ 4,67, pero el desplazamiento (flecha naranja) mide solo 4,06: el camino fue curvo, la flecha es recta'; return 'En t = ' + dec(t, 2) + ' la rapidez es ' + dec(sp(t), 2) + ', la distancia recorrida suma ' + dec(dist(t), 2) + ' y el punto está a ' + dec(Math.sqrt(fx(t)*fx(t) + fy(t)*fy(t)), 2) + ' del origen en línea recta'; },
    readout:function(t){ return [['', '\\vec v(t)=\\big\\langle 2t,\;t^{2}-1\\big\\rangle\\qquad\\big|\\vec v(t)\\big|=\\sqrt{4t^{2}+\\left(t^{2}-1\\right)^{2}}=\\sqrt{\\left(t^{2}+1\\right)^{2}}=t^{2}+1'], ['d', 'd(t)=\\displaystyle\\int_{0}^{t}\\left(u^{2}+1\\right)du=\\dfrac{t^{3}}{3}+t'], ['', 't=' + num(t, 2) + ':\\quad d(t)\\approx ' + num(dist(t), 2)]]; }
  };
})()));
