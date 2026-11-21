OA.scene('par-derivada', oaMov((function(){
  var dec = oaDec, num = OA.num, PI = Math.PI;
  function fx(t){ return 2*Math.cos(t); } function fy(t){ return Math.sin(2*t); } function dx(t){ return -2*Math.sin(t); } function dy(t){ return 2*Math.cos(2*t); }
  return { fx:fx, fy:fy, a:0, b:2*PI, run:28,
    world:{x0:-3.3, x1:3.3, y0:-6.4, y1:2.7}, aspect:9.1/6.6,
    chk:[{f:fx, df:dx, at:[0.4, 1.9, 4.1]}, {f:fy, df:dy, at:[0.4, 1.9, 4.1]}],
    axes:{x:[-3.1, 3.1], y:[-2.5, 2.5], tx:[-2, -1, 1, 2], ty:[-2, -1, 1, 2]},
    aria:'Un punto recorre la curva con forma de ocho x igual a 2 coseno de t, y igual a seno de 2t. Desde el punto sale una flecha burdeo horizontal de largo dx dt y, a continuación, una flecha verde vertical de largo dy dt. La recta naranja punteada es la tangente: su pendiente es el cociente de la flecha verde por la burdeo. Cuando la flecha burdeo se anula la tangente queda vertical; cuando se anula la verde, horizontal.',
    labels:[['F', '\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{2\\cos 2t}{-2\\operatorname{sen}t}', 'dy/dx = (dy/dt)/(dx/dt) = 2 cos 2t / (−2 sen t)', 'diff']],
    legend:'<span><i class="sw sec"></i> curva \\(x=2\\cos t,\\ y=\\operatorname{sen}2t\\)</span><span><i class="sw tan"></i> \\(\\dfrac{dx}{dt}\\): cuánto cambia \\(x\\)</span><span><i class="sw alt"></i> \\(\\dfrac{dy}{dt}\\): cuánto cambia \\(y\\)</span><span><i class="sw rise"></i> recta tangente, de pendiente \\(\\dfrac{dy}{dx}\\)</span>',
    bar:{x0:-3.0, x1:3.0, y:-3.1, la:'0', lb:'2π'}, textAt:[-3.15, -4.0], labAt:[-3.15, -5.75],
    before:function(S, t, H){ var c = S.ctx, x = fx(t), y = fy(t), a = dx(t), b = dy(t), L = Math.sqrt(a*a + b*b) || 1, k = 1.5/L; c.strokeStyle = S.C.rise; c.lineWidth = 1.3; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(S.X(x - k*a), S.Y(y - k*b)); c.lineTo(S.X(x + k*a), S.Y(y + k*b)); c.stroke(); c.setLineDash([]); },
    arrows:function(t){ var x = fx(t), y = fy(t), a = dx(t), b = dy(t); return [[x, y, x + a, y, 'tan', 'dx/dt', [a >= 0 ? -30 : 30, b >= 0 ? 12 : -12]], [x + a, y, x + a, y + b, 'alt', 'dy/dt', [a >= 0 ? 8 : -8, b >= 0 ? 14 : -14]]]; },
    lines:function(t){ var a = dx(t), b = dy(t); return [['t = ' + dec(t, 2), 'ink'], ['dx/dt = −2 sen t = ' + dec(a, 2), 'tan'], ['dy/dt = 2 cos 2t = ' + dec(b, 2), 'alt'], [Math.abs(a) < 0.03 ? 'dx/dt = 0: la tangente es vertical' : 'dy/dx = (' + dec(b, 2) + ') / (' + dec(a, 2) + ') = ' + dec(b/a, 2), 'rise']]; },
    caption:function(t, ini, fin){ var a = dx(t), b = dy(t); if (ini) return 'En t = 0 el punto está en (2, 0). Ahí dx/dt = 0 y dy/dt = 2: el punto solo sube, y la tangente es vertical'; if (fin) return 'El punto recorrió el ocho completo. Pasó dos veces por el origen, en t = π/2 con pendiente 1 y en t = 3π/2 con pendiente −1: una curva paramétrica puede tener dos tangentes en un mismo punto'; if (Math.abs(a) < 0.03) return 'Aquí dx/dt = 0: x no cambia en este instante y la tangente es vertical. La pendiente no existe'; return 'En t = ' + dec(t, 2) + ': x cambia a razón de ' + dec(a, 2) + ' y y a razón de ' + dec(b, 2) + '. La pendiente de la tangente es el cociente: ' + dec(b/a, 2); },
    readout:function(t){ var a = dx(t), b = dy(t); return [['', '\\dfrac{dx}{dt}=-2\\operatorname{sen}t\\qquad\\dfrac{dy}{dt}=2\\cos 2t'], ['d', '\\dfrac{dy}{dx}=\\dfrac{dy/dt}{dx/dt}=\\dfrac{2\\cos 2t}{-2\\operatorname{sen}t}=-\\dfrac{\\cos 2t}{\\operatorname{sen}t}'], ['', Math.abs(a) < 0.03 ? 't=' + num(t, 2) + ':\\quad\\dfrac{dx}{dt}=0\\ \\text{(tangente vertical)}' : 't=' + num(t, 2) + ':\\quad\\dfrac{dy}{dx}\\approx ' + num(b/a, 2)]]; }
  };
})()));
