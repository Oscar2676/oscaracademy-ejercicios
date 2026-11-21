OA.scene('apl-anillos-yk', oaSol({
  orient:'x', k:2, a:0, b:1, Rmax:2, dx:0.05, side:-1, R:function(x){ return 2 - x*x; }, r:function(x){ return 2 - x; }, Rdy:8,
  V:function(x){ return Math.PI*(Math.pow(x, 5)/5 - 5*x*x*x/3 + 2*x*x); }, chk:[0.2, 0.5, 0.7, 0.9],
  world:{x0:-0.45, x1:1.75, y0:-0.6, y1:4.6}, aspect:0.86, gx:[0.5, 1, 1.5], gy:[1, 2, 3, 4],
  curves:[{f:function(x){ return x*x; }, from:0, to:1.25, color:'sec', txt:'y = x²', tx:1.28, ty:1.75}, {f:function(x){ return x; }, from:0, to:1.25, color:'alt', txt:'y = x', tx:1.28, ty:1.2}],
  axisTxt:'eje de giro: y = 2', axisAt:[1.72, 2.32], axisAl:'right', Fat:[-0.4, -0.25],
  Ftex:'V=\\displaystyle\\int_{0}^{1}\\pi\\Big[\\left(2-x^{2}\\right)^{2}-(2-x)^{2}\\Big]dx=\\dfrac{8\\pi}{15}', Ftxt:'V = ∫ de 0 a 1 de π[(2 − x²)² − (2 − x)²] dx = 8π/15',
  legend:'<span><i class="sw sec"></i> \\(y=x^{2}\\), borde lejano</span><span><i class="sw alt"></i> \\(y=x\\), borde cercano</span><span><i class="sw rise"></i> radio mayor \\(R\\)</span><span><i class="sw tan"></i> eje y anillo</span>',
  aria:'La región delgada entre la recta y igual a x y la parábola y igual a x al cuadrado, de x igual a 0 a x igual a 1, gira alrededor de la recta y igual a 2. Como la región no toca al eje de giro, el sólido queda hueco. El corte es un anillo burdeo con un agujero al centro: radio mayor 2 menos x al cuadrado, hasta la parábola, y radio menor 2 menos x, hasta la recta. El volumen llega a 8 pi quinceavos.',
  cap0:'La región entre y = x e y = x² no toca al eje de giro y = 2. Al girar deja un hueco: el corte ya no es un disco, es un anillo con agujero',
  cap1:'En x = 1 las dos curvas se juntan y el anillo se cierra. El sólido hueco mide 8π/15, cerca de 1,68 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ': radio mayor, hasta la parábola (la más lejana), R = 2 − x² = ' + dec(2 - x*x, 2) + '. Radio menor, hasta la recta (la más cercana), r = 2 − x = ' + dec(2 - x, 2); },
  readout:function(x, num){ var V = Math.PI*(Math.pow(x, 5)/5 - 5*x*x*x/3 + 2*x*x); return [['', 'dV=\\pi\\left(R^{2}-r^{2}\\right)dx=\\pi\\Big[\\left(2-x^{2}\\right)^{2}-(2-x)^{2}\\Big]dx=\\pi\\left(x^{4}-5x^{2}+4x\\right)dx'], ['d', '\\displaystyle\\int_{0}^{x}\\pi\\left(t^{4}-5t^{2}+4t\\right)dt=\\pi\\left(\\dfrac{x^{5}}{5}-\\dfrac{5x^{3}}{3}+2x^{2}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{8\\pi}{15}']]; }
}));
OA.scene('apl-anillos-xk', oaSol({
  orient:'y', k:-1, a:0, b:1, Rmax:2, dx:0.06, R:function(y){ return Math.sqrt(y) + 1; }, r:function(y){ return y + 1; },
  V:function(y){ return Math.PI*(4/3*Math.pow(y, 1.5) - y*y/2 - y*y*y/3); }, chk:[0.2, 0.5, 0.7, 0.9],
  world:{x0:-4, x1:2.2, y0:-0.75, y1:1.75}, aspect:0.52, gx:[-3, -2, 1, 2], gy:[0.5, 1, 1.5],
  curves:[{f:function(y){ return Math.sqrt(y); }, from:0, to:1.3, color:'sec', txt:'x = √y', tx:1.05, ty:0.62}, {f:function(y){ return y; }, from:0, to:1.3, color:'alt', txt:'x = y', tx:1.38, ty:1.52}],
  axisTxt:'eje de giro: x = −1', axisAt:[-0.92, 1.6], Fat:[-3.9, -0.42],
  Ftex:'V=\\displaystyle\\int_{0}^{1}\\pi\\Big[\\left(\\sqrt{y}+1\\right)^{2}-(y+1)^{2}\\Big]dy=\\dfrac{\\pi}{2}', Ftxt:'V = ∫ de 0 a 1 de π[(√y + 1)² − (y + 1)²] dy = π/2',
  legend:'<span><i class="sw sec"></i> \\(x=\\sqrt{y}\\), borde lejano</span><span><i class="sw alt"></i> \\(x=y\\), borde cercano</span><span><i class="sw rise"></i> radio mayor \\(R\\)</span><span><i class="sw tan"></i> eje y anillo</span>',
  aria:'La misma región, entre y igual a x e y igual a x al cuadrado, gira ahora alrededor de la recta vertical x igual a menos 1. Se forma un sólido hueco con forma de cuenco, en tres dimensiones. El corte horizontal es un anillo burdeo: radio mayor raíz de y más 1, hasta la parábola, y radio menor y más 1, hasta la recta. El volumen llega a pi medios.',
  cap0:'La misma región gira ahora alrededor de la recta vertical x = −1. Los anillos son horizontales y los radios se escriben con y. A cada distancia se le suma 1, lo que hay entre el eje y la recta x = −1',
  cap1:'En y = 1 el anillo se cierra. El sólido hueco mide π/2, cerca de 1,57 unidades cúbicas',
  cap:function(y, dec){ return 'A la altura y = ' + dec(y, 2) + ': radio mayor, hasta la parábola, R = √y + 1 = ' + dec(Math.sqrt(y) + 1, 2) + '. Radio menor, hasta la recta, r = y + 1 = ' + dec(y + 1, 2); },
  readout:function(y, num){ var V = Math.PI*(4/3*Math.pow(y, 1.5) - y*y/2 - y*y*y/3); return [['', 'dV=\\pi\\left(R^{2}-r^{2}\\right)dy=\\pi\\Big[\\left(\\sqrt{y}+1\\right)^{2}-(y+1)^{2}\\Big]dy=\\pi\\left(2\\sqrt{y}-y-y^{2}\\right)dy'], ['d', '\\displaystyle\\int_{0}^{y}\\pi\\left(2\\sqrt{t}-t-t^{2}\\right)dt=\\pi\\left(\\dfrac{4}{3}y^{3/2}-\\dfrac{y^{2}}{2}-\\dfrac{y^{3}}{3}\\right)'], ['', 'y=' + num(y, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{\\pi}{2}']]; }
}));
