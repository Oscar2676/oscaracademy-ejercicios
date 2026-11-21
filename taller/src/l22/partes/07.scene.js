OA.scene('apl-discos-yk', oaSol({
  orient:'x', k:2, a:0, b:4, Rmax:2, dx:0.045, side:-1, Rdy:8, R:function(x){ return 2 - Math.sqrt(x); }, Rdy:-4,
  V:function(x){ return Math.PI*(4*x - 8/3*Math.pow(x, 1.5) + x*x/2); }, chk:[0.5, 1, 2, 3.5],
  world:{x0:-1.1, x1:5.6, y0:-0.9, y1:4.7}, aspect:5.6/6.7, gx:[1, 2, 3, 4], gy:[1, 2, 3, 4],
  curves:[{f:function(x){ return Math.sqrt(x); }, from:0, to:4.9, color:'sec', txt:'y = √x', tx:4.35, ty:1.75}],
  axisTxt:'eje de giro: y = 2', axisAt:[2.9, 2.6], Fat:[1.3, -0.1],
  Ftex:'V=\\displaystyle\\int_{0}^{4}\\pi\\left(2-\\sqrt{x}\\right)^{2}dx=\\dfrac{8\\pi}{3}', Ftxt:'V = ∫ de 0 a 4 de π(2 − √x)² dx = 8π/3',
  legend:'<span><i class="sw sec"></i> \\(y=\\sqrt{x}\\) y el sólido</span><span><i class="sw tan"></i> eje \\(y=2\\) y disco en \\(x\\)</span><span><i class="sw rise"></i> radio \\(R=2-\\sqrt{x}\\)</span>',
  aria:'La región entre la curva y igual a raíz de x, la recta y igual a 2 y el eje y gira alrededor de la recta y igual a 2. Se forma un sólido con punta en x igual a 4, dibujado en tres dimensiones con degradado azul. El disco burdeo avanza hacia la derecha y su radio, 2 menos raíz de x, se achica hasta cero. El volumen llega a 8 pi tercios.',
  cap0:'El eje de giro ya no es el eje x: es la recta y = 2. El radio del disco se mide desde esa recta hasta la curva: R = 2 − √x',
  cap1:'En x = 4 la curva toca al eje de giro y el radio vale 0. El sólido completo mide 8π/3, cerca de 8,38 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ' la curva está a la altura √x = ' + dec(Math.sqrt(x), 2) + '. Del eje y = 2 a la curva hay R = 2 − ' + dec(Math.sqrt(x), 2) + ' = ' + dec(2 - Math.sqrt(x), 2); },
  readout:function(x, num){ var V = Math.PI*(4*x - 8/3*Math.pow(x, 1.5) + x*x/2); return [['', 'dV=\\pi R^{2}\\,dx=\\pi\\left(2-\\sqrt{x}\\right)^{2}dx=\\pi\\left(4-4\\sqrt{x}+x\\right)dx'], ['d', '\\displaystyle\\int_{0}^{x}\\pi\\left(4-4\\sqrt{t}+t\\right)dt=\\pi\\left(4x-\\dfrac{8}{3}x^{3/2}+\\dfrac{x^{2}}{2}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{8\\pi}{3}']]; }
}));
OA.scene('apl-discos-xk', oaSol({
  orient:'y', k:1, a:-1, b:1, Rmax:1, dx:0.05, side:-1, R:function(y){ return 1 - y*y; },
  V:function(y){ return Math.PI*(y - 2*y*y*y/3 + Math.pow(y, 5)/5 + 8/15); }, chk:[-0.6, -0.2, 0.3, 0.8],
  world:{x0:-1.5, x1:3.5, y0:-1.5, y1:1.7}, aspect:3.2/5, gx:[1, 2, 3], gy:[-1, 1],
  curves:[{f:function(y){ return y*y; }, from:-1.25, to:1.25, color:'sec', txt:'x = y²', tx:0.55, ty:-1.22, al:'right'}],
  axisTxt:'eje de giro: x = 1', axisAt:[1.1, 1.52], Fat:[-1.4, 1.45],
  Ftex:'V=\\displaystyle\\int_{-1}^{1}\\pi\\left(1-y^{2}\\right)^{2}dy=\\dfrac{16\\pi}{15}', Ftxt:'V = ∫ de −1 a 1 de π(1 − y²)² dy = 16π/15',
  legend:'<span><i class="sw sec"></i> \\(x=y^{2}\\) y el sólido</span><span><i class="sw tan"></i> eje \\(x=1\\) y disco en \\(y\\)</span><span><i class="sw rise"></i> radio \\(R=1-y^{2}\\)</span>',
  aria:'La región entre la parábola x igual a y al cuadrado y la recta vertical x igual a 1 gira alrededor de esa recta. Se forma un sólido con forma de limón, con puntas arriba y abajo, en tres dimensiones con degradado azul. El disco burdeo horizontal sube desde y igual a menos 1 hasta y igual a 1; su radio es 1 menos y al cuadrado. El volumen llega a 16 pi quinceavos.',
  cap0:'Ahora el eje de giro es la recta vertical x = 1. Los discos son horizontales. El radio se mide desde la recta hasta la parábola: R = 1 − y²',
  cap1:'El disco llegó a y = 1, donde el radio vuelve a ser 0. El sólido completo mide 16π/15, cerca de 3,35 unidades cúbicas',
  cap:function(y, dec){ return 'A la altura y = ' + dec(y, 2) + ' la parábola está en x = y² = ' + dec(y*y, 2) + '. Del eje x = 1 a la parábola hay R = 1 − ' + dec(y*y, 2) + ' = ' + dec(1 - y*y, 2); },
  readout:function(y, num){ var V = Math.PI*(y - 2*y*y*y/3 + Math.pow(y, 5)/5 + 8/15); return [['', 'dV=\\pi R^{2}\\,dy=\\pi\\left(1-y^{2}\\right)^{2}dy=\\pi\\left(1-2y^{2}+y^{4}\\right)dy'], ['d', '\\displaystyle\\int_{-1}^{y}\\pi\\left(1-2t^{2}+t^{4}\\right)dt=\\pi\\left(y-\\dfrac{2y^{3}}{3}+\\dfrac{y^{5}}{5}+\\dfrac{8}{15}\\right)'], ['', 'y=' + num(y, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{16\\pi}{15}']]; }
}));
