OA.scene('tres-funciones', oaTri({
  d0:-2.3, d1:3.3, x0:-2.7, x1:3.7, gx:[-2,-1,1,2,3], sweep:22,
  panels:[
    {f:function(x){ return 2*x*x*x - 3*x*x - 12*x; }, y0:-27, y1:14, gy:[-20,-10,10], col:'ink', sw:'ink', name:'f(x)', title:'f(x) = 2x³ − 3x² − 12x', sub:'la función', df:function(x){ return 6*x*x - 6*x - 12; }, tex:'f(x)=2x^{3}-3x^{2}-12x', capTex:'f(x)=2x^{3}-3x^{2}-12x', capFb:'f(x) = 2x³ − 3x² − 12x'},
    {f:function(x){ return 6*x*x - 6*x - 12; }, y0:-20, y1:38, gy:[-10,10,20,30], col:'alt', sw:'alt', name:'f′(x)', title:'f′(x) = 6x² − 6x − 12', sub:'pendiente de la tangente de f', df:function(x){ return 12*x - 6; }, tex:"f'(x)=6x^{2}-6x-12", capTex:"f'(x)=6x^{2}-6x-12", capFb:'f′(x) = 6x² − 6x − 12'},
    {f:function(x){ return 12*x - 6; }, y0:-40, y1:40, gy:[-30,-15,15,30], col:'sec', sw:'sec', name:'f″(x)', title:'f″(x) = 12x − 6', sub:'pendiente de la tangente de f′', df:function(x){ return 12; }, tex:"f''(x)=12x-6", capTex:"f''(x)=12x-6", capFb:'f″(x) = 12x − 6'}],
  aria:'Tres paneles con el mismo eje x: f(x) = 2x³ − 3x² − 12x, su derivada f′(x) = 6x² − 6x − 12 y su segunda derivada f″(x) = 12x − 6. Una recta vertical los recorre. En x = −1 hay máximo local de f; en x = 1/2, punto de inflexión; en x = 2, mínimo local.',
  live:function(x, dec){ var a = 6*x*x - 6*x - 12, b = 12*x - 6;
    return 'f′(x) = ' + dec(a, 2) + (Math.abs(a) < 0.3 ? ': tangente horizontal' : a > 0 ? ' > 0: f crece' : ' < 0: f decrece') + '. f″(x) = ' + dec(b, 2) + (Math.abs(b) < 0.3 ? ': cambia la concavidad' : b > 0 ? ' > 0: cóncava hacia arriba' : ' < 0: cóncava hacia abajo'); },
  mk:6.5,
  marks:[{x:-1, col:'rise', cap:'En x = −1: f′(−1) = 0, tangente horizontal en f, y f″(−1) = −18 < 0. La función tiene un máximo local, f(−1) = 7',
            pts:[{panel:0, txt:'(−1, 7) máximo local', al:'left', dy:-13}, {panel:1, txt:'f′(−1) = 0', al:'right', dy:13}, {panel:2, tan:false, txt:'f″(−1) = −18 < 0', al:'left', dy:13}]},
         {x:0.5, col:'tan', cap:'En x = 1/2: f″ vale 0 y cambia de signo. Punto de inflexión de f, donde su tangente es la más inclinada; ahí f′ tiene su mínimo, con tangente horizontal',
            pts:[{panel:0, txt:'(1/2, −13/2) inflexión', al:'left', dy:-11}, {panel:1, txt:'mínimo de f′: −27/2', al:'left', dy:14}, {panel:2, tan:false, txt:'f″(1/2) = 0', al:'left', dy:13}]},
         {x:2, col:'rise', cap:'En x = 2: f′(2) = 0, tangente horizontal en f, y f″(2) = 18 > 0. La función tiene un mínimo local, f(2) = −20',
            pts:[{panel:0, txt:'(2, −20) mínimo local', al:'right', dy:14}, {panel:1, txt:'f′(2) = 0', al:'left', dy:13}, {panel:2, tan:false, txt:'f″(2) = 18 > 0', al:'right', dy:-13}]}]
}));
