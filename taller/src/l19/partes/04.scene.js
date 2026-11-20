OA.scene('concavidad', oaAn({
  mode:'conc', f:function(x){ return x*x*x - 3*x*x + 2; }, df:function(x){ return 3*x*x - 6*x; }, d2f:function(x){ return 6*x - 6; },
  d0:-1.15, d1:3.15, cuts:[1], world:{x0:-1.9, x1:3.9, y0:-4.6, y1:4.4}, aspect:0.86, gx:[-1,1,2,3], gy:[-4,-3,-2,-1,1,2,3,4], full:true, sweep:20,
  fTex:'f(x)=x^{3}-3x^{2}+2', fFb:'f(x) = x³ − 3x² + 2', txtUp:function(x){ return x < 1; }, eps:0.12,
  aria:'Gráfica de f(x) = x³ − 3x² + 2. Un punto P la recorre con su tangente. Hasta x = 1 la curva es naranja, cóncava hacia abajo, y queda bajo la tangente. Desde x = 1 es azul, cóncava hacia arriba, y queda sobre la tangente. El punto (1, 0) es el punto de inflexión.',
  marks:[{x:1, tex:"(1,\;0):\\ f''(1)=0,\\ \\text{punto de inflexión}", fb:"(1, 0): f''(1) = 0, punto de inflexión", pos:[1,1], cap:'En (1, 0) la concavidad cambia de hacia abajo a hacia arriba: es el punto de inflexión'}]
}));
