OA.scene('apl-discos-x', oaSol({
  orient:'x', k:0, a:0, b:4, Rmax:2, R:function(x){ return Math.sqrt(x); },
  V:function(x){ return Math.PI*x*x/2; }, chk:[0.5, 1, 2, 3.5],
  world:{x0:-1.1, x1:5.6, y0:-2.9, y1:3.1}, aspect:6/6.7, gx:[1, 2, 3, 4], gy:[-2, -1, 1, 2],
  curves:[{f:function(x){ return Math.sqrt(x); }, from:0, to:4.6, color:'sec', txt:'y = √x', tx:3.1, ty:2.35}],
  axisTxt:'eje de giro: eje x', axisAt:[2.9, -0.32], Fat:[-0.95, 2.8],
  Ftex:'V=\\displaystyle\\int_{0}^{4}\\pi\\left(\\sqrt{x}\\right)^{2}dx=8\\pi', Ftxt:'V = ∫ de 0 a 4 de π(√x)² dx = 8π',
  legend:'<span><i class="sw sec"></i> \\(y=\\sqrt{x}\\) y el sólido</span><span><i class="sw tan"></i> disco en \\(x\\)</span><span><i class="sw rise"></i> radio \\(R=\\sqrt{x}\\)</span>',
  aria:'La curva y igual a raíz de x, entre x igual a 0 y x igual a 4, gira alrededor del eje x y forma un sólido con forma de bala, dibujado en tres dimensiones con degradado azul. Un disco burdeo, perpendicular al eje, avanza de izquierda a derecha y va construyendo el sólido. Su radio es raíz de x. El volumen acumulado llega a 8 pi.',
  cap0:'La región bajo y = √x gira alrededor del eje x. Cada corte perpendicular al eje es un disco. El disco burdeo va a avanzar y a dejar construido el sólido',
  cap1:'El disco llegó a x = 4. El sólido completo mide 8π, cerca de 25,13 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ' el disco tiene radio R = √x = ' + dec(Math.sqrt(x), 2) + ' y área πR² = πx, cerca de ' + dec(Math.PI*x, 2) + '. El volumen construido hasta aquí es cerca de ' + dec(Math.PI*x*x/2, 2); },
  readout:function(x, num){ return [['', 'dV=\\pi R^{2}\\,dx=\\pi\\left(\\sqrt{x}\\right)^{2}dx=\\pi x\\,dx'], ['d', '\\displaystyle\\int_{0}^{x}\\pi t\\,dt=\\dfrac{\\pi x^{2}}{2}'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(Math.PI*x*x/2, 2) + '\\ \\longrightarrow\\ 8\\pi']]; }
}));
OA.scene('apl-discos-y', oaSol({
  orient:'y', k:0, a:0, b:2, Rmax:2, R:function(y){ return Math.sqrt(2*y); },
  V:function(y){ return Math.PI*y*y; }, chk:[0.3, 0.8, 1.2, 1.9],
  world:{x0:-3.1, x1:3.6, y0:-0.9, y1:3.3}, aspect:4.2/6.7, gx:[-2, -1, 1, 2], gy:[1, 2, 3],
  curves:[{f:function(y){ return Math.sqrt(2*y); }, from:0, to:2.6, color:'sec', txt:'x = √(2y)', tx:2.2, ty:1.3}],
  axisTxt:'eje de giro: eje y', axisAt:[0.12, 3.05], Fat:[-3, 3.0],
  Ftex:'V=\\displaystyle\\int_{0}^{2}\\pi\\left(\\sqrt{2y}\\right)^{2}dy=4\\pi', Ftxt:'V = ∫ de 0 a 2 de π(√(2y))² dy = 4π',
  legend:'<span><i class="sw sec"></i> \\(x=\\sqrt{2y}\\) y el sólido</span><span><i class="sw tan"></i> disco en \\(y\\)</span><span><i class="sw rise"></i> radio \\(R=\\sqrt{2y}\\)</span>',
  aria:'La curva y igual a x al cuadrado sobre 2, entre y igual a 0 e y igual a 2, gira alrededor del eje y y forma un sólido con forma de cuenco macizo, en tres dimensiones con degradado azul. Un disco burdeo horizontal sube desde el fondo. Su radio es raíz de 2y. El volumen acumulado llega a 4 pi.',
  cap0:'Ahora el eje de giro es el eje y. Los discos son horizontales y se apilan hacia arriba: se integra en y, y el radio se escribe con y',
  cap1:'El disco llegó a y = 2. El sólido completo mide 4π, cerca de 12,57 unidades cúbicas',
  cap:function(y, dec){ return 'A la altura y = ' + dec(y, 2) + ' el disco tiene radio R = √(2y) = ' + dec(Math.sqrt(2*y), 2) + ' y área πR² = 2πy. El volumen construido hasta aquí es cerca de ' + dec(Math.PI*y*y, 2); },
  readout:function(y, num){ return [['', 'dV=\\pi R^{2}\\,dy=\\pi\\left(\\sqrt{2y}\\right)^{2}dy=2\\pi y\\,dy'], ['d', '\\displaystyle\\int_{0}^{y}2\\pi t\\,dt=\\pi y^{2}'], ['', 'y=' + num(y, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(Math.PI*y*y, 2) + '\\ \\longrightarrow\\ 4\\pi']]; }
}));
