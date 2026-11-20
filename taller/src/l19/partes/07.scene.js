OA.scene('graficas-derivadas', oaTri({
  d0:-2.2, d1:2.2, x0:-2.6, x1:2.6, gx:[-2,-1,1,2], sweep:20, mk:6.5,
  panels:[
    {f:function(x){ return x*x*x/3 - x; }, df:function(x){ return x*x - 1; }, y0:-1.9, y1:1.9, gy:[-1,1], col:'ink', sw:'ink', name:'f(x)', title:'f(x) = x³/3 − x', sub:'la función', tex:'f(x)=\\dfrac{x^{3}}{3}-x', capTex:'f(x)=\\dfrac{x^{3}}{3}-x', capFb:'f(x) = x³/3 − x'},
    {f:function(x){ return x*x - 1; }, df:function(x){ return 2*x; }, y0:-2.5, y1:4.4, gy:[-1,1,2,3,4], col:'alt', sw:'alt', name:'f′(x)', title:'f′(x) = x² − 1', sub:'pendiente de la tangente de f', tex:"f'(x)=x^{2}-1", capTex:"f'(x)=x^{2}-1", capFb:'f′(x) = x² − 1'}],
  aria:'Dos paneles con el mismo eje x: arriba f(x) = x³/3 − x y abajo su derivada f′(x) = x² − 1. Donde f crece, f′ está sobre el eje x; donde f decrece, bajo él. En x = −1 y x = 1, f tiene tangente horizontal y f′ corta al eje. En x = 0, f tiene un punto de inflexión y f′ su mínimo.',
  live:function(x, dec){ var a = x*x - 1; return 'Pendiente de la tangente a f: f′(x) = ' + dec(a, 2) + (Math.abs(a) < 0.06 ? ': tangente horizontal' : a > 0 ? ' > 0. La curva verde está sobre el eje x y f crece' : ' < 0. La curva verde está bajo el eje x y f decrece'); },
  marks:[{x:-1, col:'rise', cap:'En x = −1: tangente horizontal en f, máximo local f(−1) = 2/3. La curva verde corta al eje x pasando de + a −',
            pts:[{panel:0, txt:'(−1, 2/3) máximo local', al:'left', dy:-13}, {panel:1, txt:'f′(−1) = 0', al:'right', dy:14}]},
         {x:0, col:'tan', cap:'En x = 0: f baja con su mayor inclinación y cambia de concavidad, punto de inflexión. La curva verde tiene ahí su mínimo, f′(0) = −1',
            pts:[{panel:0, txt:'(0, 0) inflexión', al:'left', dy:-12}, {panel:1, txt:'mínimo de f′: −1', al:'left', dy:14}]},
         {x:1, col:'rise', cap:'En x = 1: tangente horizontal en f, mínimo local f(1) = −2/3. La curva verde corta al eje x pasando de − a +',
            pts:[{panel:0, txt:'(1, −2/3) mínimo local', al:'right', dy:14}, {panel:1, txt:'f′(1) = 0', al:'left', dy:14}]}]
}));
OA.scene('desde-la-derivada', oaTri({
  d0:-0.4, d1:4.4, x0:-0.8, x1:4.8, gx:[1,2,3,4], sweep:20, mk:6.5,
  panels:[
    {f:function(x){ return x*x*x/3 - 2*x*x + 3*x + 1; }, df:function(x){ return x*x - 4*x + 3; }, y0:-1.2, y1:4.2, gy:[1,2,3,4], col:'ink', sw:'ink', name:'f(x)', title:'f(x) = x³/3 − 2x² + 3x + 1', sub:'la función que cumple f(0) = 1', tex:'f(x)=\\dfrac{x^{3}}{3}-2x^{2}+3x+1', capTex:'f(x)=\\dfrac{x^{3}}{3}-2x^{2}+3x+1', capFb:'f(x) = x³/3 − 2x² + 3x + 1'},
    {f:function(x){ return x*x - 4*x + 3; }, df:function(x){ return 2*x - 4; }, y0:-2.6, y1:5.6, gy:[-1,1,2,3,4,5], col:'alt', sw:'alt', name:'f′(x)', title:'f′(x) = x² − 4x + 3', sub:'el dato: la derivada', tex:"f'(x)=x^{2}-4x+3", capTex:"f'(x)=x^{2}-4x+3", capFb:'f′(x) = x² − 4x + 3'}],
  aria:'Dos paneles con el mismo eje x: abajo el dato, f′(x) = x² − 4x + 3, y arriba la función f que cumple f(0) = 1. Donde f′ es positiva, f crece. En x = 1 f tiene un máximo local, en x = 3 un mínimo local y en x = 2 un punto de inflexión.',
  live:function(x, dec){ var a = x*x - 4*x + 3; return 'f′(x) = ' + dec(a, 2) + (Math.abs(a) < 0.06 ? ': la parábola corta al eje x y f tiene tangente horizontal' : a > 0 ? ' > 0: la parábola está sobre el eje x y f crece' : ' < 0: la parábola está bajo el eje x y f decrece'); },
  marks:[{x:1, col:'rise', cap:'En x = 1: f′ corta al eje x pasando de + a −. La función tiene un máximo local, f(1) = 7/3',
            pts:[{panel:0, txt:'(1, 7/3) máximo local', al:'left', dy:-13}, {panel:1, txt:'f′(1) = 0', al:'right', dy:14}]},
         {x:2, col:'tan', cap:'En x = 2: f′ tiene su mínimo, f′(2) = −1. La función tiene un punto de inflexión, (2, 5/3)',
            pts:[{panel:0, txt:'(2, 5/3) inflexión', al:'left', dy:-12}, {panel:1, txt:'mínimo de f′: −1', al:'left', dy:14}]},
         {x:3, col:'rise', cap:'En x = 3: f′ corta al eje x pasando de − a +. La función tiene un mínimo local, f(3) = 1',
            pts:[{panel:0, txt:'(3, 1) mínimo local', al:'right', dy:14}, {panel:1, txt:'f′(3) = 0', al:'left', dy:14}]}]
}));
