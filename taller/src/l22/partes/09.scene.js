OA.scene('apl-sec-cuadrados', oaSec({
  shape:'sq', a:0, b:4, y1:function(){ return 0; }, y2:function(x){ return Math.sqrt(x); },
  A:function(x){ return x; }, V:function(x){ return x*x/2; }, chk:[0.5, 1, 2, 3.5],
  sc:1.55, ox:3.4, oy:4.2, ax:[-0.3, 4.6], ay:[-0.3, 2.6], Fat:[4.6, 6.6], aAt:[0.25, 6.55],
  notes:[{txt:'y = √x', at:[3.8, 1.95], dx:-4, dy:16, al:'right'}],
  sTxt:function(x, dec){ return 'lado = √x = ' + dec(Math.sqrt(x), 2); }, sdy:6, sdx:-34, sal:'right',
  aTxt:function(x, dec){ return 'corte en x = ' + dec(x, 2) + ':  A = lado² = ' + dec(x, 2); },
  Ftex:'V=\\displaystyle\\int_{0}^{4}\\left(\\sqrt{x}\\right)^{2}dx=8', Ftxt:'V = ∫ de 0 a 4 de (√x)² dx = 8',
  legend:'<span><i class="sw rise"></i> base, en el piso</span><span><i class="sw tan"></i> corte cuadrado en \\(x\\)</span><span><i class="sw sec"></i> sólido construido</span>',
  aria:'En el piso, la región entre el eje x y la curva y igual a raíz de x, de 0 a 4. Sobre ella se levanta un sólido en perspectiva, con degradado azul, cuyos cortes perpendiculares al eje x son cuadrados parados sobre la base. El cuadrado burdeo avanza y crece: su lado es raíz de x. El volumen llega a 8.',
  cap0:'La base del sólido está en el piso: la región entre el eje x y la curva y = √x. Cada corte perpendicular al eje x es un cuadrado parado sobre la base',
  cap1:'El corte llegó a x = 4, donde el cuadrado mide 2 de lado. El sólido completo mide 8 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ' la base mide √x = ' + dec(Math.sqrt(x), 2) + ' de ancho. Ese es el lado del cuadrado; su área es ' + dec(x, 2) + '. Volumen construido: cerca de ' + dec(x*x/2, 2); },
  readout:function(x, num){ return [['', 'A(x)=\\text{lado}^{2}=\\left(\\sqrt{x}\\right)^{2}=x\\qquad dV=A(x)\\,dx=x\\,dx'], ['d', '\\displaystyle\\int_{0}^{x}t\\,dt=\\dfrac{x^{2}}{2}'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(x*x/2, 2) + '\\ \\longrightarrow\\ 8']]; }
}));
OA.scene('apl-sec-rectangulos', oaSec({
  shape:'rect', a:-2, b:2, y1:function(x){ return x*x; }, y2:function(){ return 4; }, h:function(x){ return (4 - x*x)/2; },
  A:function(x){ return (4 - x*x)*(4 - x*x)/2; }, V:function(x){ return 8*x - 4*x*x*x/3 + Math.pow(x, 5)/10 + 128/15; }, chk:[-1.5, -0.5, 0.5, 1.5],
  sc:1.25, ox:6.2, oy:3.75, ax:[-2.5, 2.6], ay:[-0.3, 4.6], Fat:[0.2, 0.75], aAt:[0.25, 6.55],
  notes:[{txt:'y = x²', at:[1.75, 3.06], dx:12, dy:-10, al:'left', color:'rise'}, {txt:'y = 4', at:[1.2, 4], dx:0, dy:16, al:'center', color:'rise'}],
  sTxt:function(x, dec){ return 'ancho = 4 − x² = ' + dec(4 - x*x, 2); }, sdy:-2, sdx:-70, sal:'right',
  aTxt:function(x, dec){ return 'corte en x = ' + dec(x, 2) + ':  A = ancho · alto = ' + dec(4 - x*x, 2) + ' · ' + dec((4 - x*x)/2, 2) + ' = ' + dec((4 - x*x)*(4 - x*x)/2, 2); },
  Ftex:'V=\\displaystyle\\int_{-2}^{2}\\dfrac{\\left(4-x^{2}\\right)^{2}}{2}\\,dx=\\dfrac{256}{15}', Ftxt:'V = ∫ de −2 a 2 de (4 − x²)²/2 dx = 256/15',
  legend:'<span><i class="sw rise"></i> base, en el piso</span><span><i class="sw tan"></i> corte rectangular en \\(x\\)</span><span><i class="sw sec"></i> sólido construido</span>',
  aria:'En el piso, la región entre la parábola y igual a x al cuadrado y la recta y igual a 4. Sobre ella se levanta un sólido en perspectiva, con degradado azul, cuyos cortes perpendiculares al eje x son rectángulos de alto igual a la mitad de su ancho. El rectángulo burdeo avanza desde x igual a menos 2 hasta x igual a 2: crece hasta el centro y luego se achica. El volumen llega a 256 quinceavos.',
  cap0:'La base está en el piso, entre la parábola y = x² y la recta y = 4. Cada corte perpendicular al eje x es un rectángulo cuyo alto es la mitad de su ancho',
  cap1:'El corte llegó a x = 2, donde el rectángulo se reduce a un punto. El sólido completo mide 256/15, cerca de 17,07 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ' la base mide 4 − x² = ' + dec(4 - x*x, 2) + ' de ancho. El rectángulo tiene ese ancho y la mitad de alto: ' + dec((4 - x*x)/2, 2) + '. Su área es ' + dec((4 - x*x)*(4 - x*x)/2, 2); },
  readout:function(x, num){ var V = 8*x - 4*x*x*x/3 + Math.pow(x, 5)/10 + 128/15; return [['', 'A(x)=\\left(4-x^{2}\\right)\\cdot\\dfrac{4-x^{2}}{2}=\\dfrac{\\left(4-x^{2}\\right)^{2}}{2}\\qquad dV=A(x)\\,dx'], ['d', '\\displaystyle\\int_{-2}^{x}\\dfrac{16-8t^{2}+t^{4}}{2}\\,dt=8x-\\dfrac{4x^{3}}{3}+\\dfrac{x^{5}}{10}+\\dfrac{128}{15}'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{256}{15}']]; }
}));
