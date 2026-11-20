OA.scene('crecimiento', oaAn({
  mode:'crec', f:function(x){ return x*x*x - 6*x*x + 9*x + 1; }, df:function(x){ return 3*x*x - 12*x + 9; }, d2f:function(x){ return 6*x - 12; },
  d0:-0.25, d1:4.25, cuts:[1, 3], world:{x0:-0.9, x1:4.9, y0:-2.6, y1:7.4}, aspect:0.86, gx:[1,2,3,4], gy:[1,2,3,4,5,6,7],
  fTex:'f(x)=x^{3}-6x^{2}+9x+1', fFb:'f(x) = x³ − 6x² + 9x + 1', txtUp:function(x){ return x < 2; },
  aria:'Gráfica de f(x) = x³ − 6x² + 9x + 1. Un punto P la recorre con su tangente. La curva es verde, creciente, hasta x = 1; naranja, decreciente, entre x = 1 y x = 3; y verde, creciente, desde x = 3.',
  marks:[{x:1, tex:"(1,\;5):\\ f'(1)=0", fb:"(1, 5): f'(1) = 0", pos:[1,1], cap:'En (1, 5) la tangente es horizontal: la función deja de crecer y empieza a decrecer'},
         {x:3, tex:"(3,\;1):\\ f'(3)=0", fb:"(3, 1): f'(3) = 0", pos:[1,-1], cap:'En (3, 1) la tangente es horizontal: la función deja de decrecer y vuelve a crecer'}]
}));
