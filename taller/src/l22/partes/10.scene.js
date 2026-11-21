OA.scene('apl-sec-triangulos', oaSec({
  shape:'tri', a:-1, b:1, y1:function(x){ return -Math.sqrt(Math.max(0, 1 - x*x)); }, y2:function(x){ return Math.sqrt(Math.max(0, 1 - x*x)); },
  A:function(x){ return Math.sqrt(3)*(1 - x*x); }, V:function(x){ return Math.sqrt(3)*(x - x*x*x/3 + 2/3); }, chk:[-0.7, -0.2, 0.3, 0.8],
  sc:2.15, ox:5, oy:2.3, ax:[-1.35, 1.45], ay:[-1.3, 1.4], Fat:[0.2, 0.7], aAt:[0.25, 6.55],
  notes:[{txt:'x² + y² = 1', at:[-0.7, 0.72], dx:-10, dy:14, al:'right', color:'rise'}],
  sTxt:function(x, dec){ return 'lado = 2√(1 − x²) = ' + dec(2*Math.sqrt(Math.max(0, 1 - x*x)), 2); }, sdy:20, sdx:12, sal:'left',
  aTxt:function(x, dec){ return 'corte en x = ' + dec(x, 2) + ':  A = (√3/4)·lado² = ' + dec(Math.sqrt(3)*(1 - x*x), 2); },
  Ftex:'V=\\displaystyle\\int_{-1}^{1}\\sqrt{3}\\left(1-x^{2}\\right)dx=\\dfrac{4\\sqrt{3}}{3}', Ftxt:'V = ∫ de −1 a 1 de √3(1 − x²) dx = 4√3/3',
  legend:'<span><i class="sw rise"></i> base circular, en el piso</span><span><i class="sw tan"></i> corte triangular en \\(x\\)</span><span><i class="sw sec"></i> sólido construido</span>',
  aria:'En el piso, un círculo de radio 1. Sobre él se levanta un sólido en perspectiva, con degradado azul, cuyos cortes perpendiculares al eje x son triángulos equiláteros parados sobre una cuerda del círculo. El triángulo burdeo avanza de x igual a menos 1 a x igual a 1: crece hasta el centro, donde su lado es 2, y luego se achica. El volumen llega a 4 raíz de 3 tercios.',
  cap0:'La base es un círculo de radio 1, en el piso. Cada corte perpendicular al eje x es un triángulo equilátero parado sobre una cuerda del círculo',
  cap1:'El corte llegó a x = 1, donde el triángulo se reduce a un punto. El sólido completo mide 4√3/3, cerca de 2,31 unidades cúbicas',
  cap:function(x, dec){ var l = 2*Math.sqrt(Math.max(0, 1 - x*x)); return 'En x = ' + dec(x, 2) + ' la cuerda del círculo mide ' + dec(l, 2) + '. Ese es el lado del triángulo equilátero; su área es (√3/4)·lado², cerca de ' + dec(Math.sqrt(3)*(1 - x*x), 2); },
  readout:function(x, num){ var V = Math.sqrt(3)*(x - x*x*x/3 + 2/3); return [['', 'A(x)=\\dfrac{\\sqrt{3}}{4}\\left(2\\sqrt{1-x^{2}}\\right)^{2}=\\sqrt{3}\\left(1-x^{2}\\right)\\qquad dV=A(x)\\,dx'], ['d', '\\displaystyle\\int_{-1}^{x}\\sqrt{3}\\left(1-t^{2}\\right)dt=\\sqrt{3}\\left(x-\\dfrac{x^{3}}{3}+\\dfrac{2}{3}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{4\\sqrt{3}}{3}']]; }
}));
OA.scene('apl-sec-semicirculos', oaSec({
  shape:'semi', a:-2, b:2, y1:function(){ return 0; }, y2:function(x){ return 4 - x*x; },
  A:function(x){ return Math.PI/8*(4 - x*x)*(4 - x*x); }, V:function(x){ return Math.PI/8*(16*x - 8*x*x*x/3 + Math.pow(x, 5)/5 + 256/15); }, chk:[-1.5, -0.5, 0.5, 1.5],
  sc:1.25, ox:6.2, oy:3.75, ax:[-2.5, 2.6], ay:[-0.3, 4.6], Fat:[0.2, 0.75], aAt:[0.25, 6.55],
  notes:[{txt:'y = 4 − x²', at:[-1.2, 2.56], dx:-10, dy:10, al:'right', color:'rise'}],
  sTxt:function(x, dec){ return 'diámetro = 4 − x² = ' + dec(4 - x*x, 2); }, sdy:18, sdx:10, sal:'left',
  aTxt:function(x, dec){ return 'corte en x = ' + dec(x, 2) + ':  A = (π/8)·diámetro² = ' + dec(Math.PI/8*(4 - x*x)*(4 - x*x), 2); },
  Ftex:'V=\\displaystyle\\int_{-2}^{2}\\dfrac{\\pi}{8}\\left(4-x^{2}\\right)^{2}dx=\\dfrac{64\\pi}{15}', Ftxt:'V = ∫ de −2 a 2 de (π/8)(4 − x²)² dx = 64π/15',
  legend:'<span><i class="sw rise"></i> base, en el piso</span><span><i class="sw tan"></i> corte semicircular en \\(x\\)</span><span><i class="sw sec"></i> sólido construido</span>',
  aria:'En el piso, la región entre el eje x y la parábola y igual a 4 menos x al cuadrado. Sobre ella se levanta un sólido en perspectiva, con degradado azul, cuyos cortes perpendiculares al eje x son semicírculos parados sobre su diámetro. El semicírculo burdeo avanza de x igual a menos 2 a x igual a 2. El volumen llega a 64 pi quinceavos.',
  cap0:'La base está en el piso, entre el eje x y la parábola y = 4 − x². Cada corte perpendicular al eje x es un semicírculo parado sobre su diámetro',
  cap1:'El corte llegó a x = 2, donde el semicírculo se reduce a un punto. El sólido completo mide 64π/15, cerca de 13,40 unidades cúbicas',
  cap:function(x, dec){ return 'En x = ' + dec(x, 2) + ' la base mide 4 − x² = ' + dec(4 - x*x, 2) + '. Ese es el diámetro del semicírculo; su radio es la mitad, ' + dec((4 - x*x)/2, 2) + ', y su área es cerca de ' + dec(Math.PI/8*(4 - x*x)*(4 - x*x), 2); },
  readout:function(x, num){ var V = Math.PI/8*(16*x - 8*x*x*x/3 + Math.pow(x, 5)/5 + 256/15); return [['', 'A(x)=\\dfrac{1}{2}\\,\\pi\\left(\\dfrac{4-x^{2}}{2}\\right)^{2}=\\dfrac{\\pi}{8}\\left(4-x^{2}\\right)^{2}\\qquad dV=A(x)\\,dx'], ['d', '\\displaystyle\\int_{-2}^{x}\\dfrac{\\pi}{8}\\left(16-8t^{2}+t^{4}\\right)dt=\\dfrac{\\pi}{8}\\left(16x-\\dfrac{8x^{3}}{3}+\\dfrac{x^{5}}{5}+\\dfrac{256}{15}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad \\text{volumen acumulado}\\approx ' + num(V, 2) + '\\ \\longrightarrow\\ \\dfrac{64\\pi}{15}']]; }
}));
