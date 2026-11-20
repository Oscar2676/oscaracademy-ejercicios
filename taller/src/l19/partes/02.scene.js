OA.scene('maximos-minimos', oaAn({
  mode:'crec', stops:[{x:0, up:true}, {x:2, up:false}], f:function(x){ return x*x*x - 3*x*x + 1; }, df:function(x){ return 3*x*x - 6*x; }, d2f:function(x){ return 6*x - 6; },
  d0:-1, d1:4, cuts:[0, 2], ends:[-1, 4], world:{x0:-3.6, x1:5.3, y0:-15, y1:20}, aspect:0.86, gx:[-3,-2,-1,1,2,3,4,5], gy:[-10,-5,5,10,15,20], full:true,
  fTex:'f(x)=x^{3}-3x^{2}+1\\ \\text{en}\\ [-1,\;4]', fFb:'f(x) = x³ − 3x² + 1 en [−1, 4]', txtUp:function(x){ return true; }, eps:0.12,
  aria:'Gráfica de f(x) = x³ − 3x² + 1 en el intervalo cerrado [−1, 4]. Crece hasta (0, 1), decrece hasta (2, −3) y crece hasta (4, 17). Se marcan los cuatro candidatos: (−1, −3), (0, 1), (2, −3) y (4, 17).',
  marks:[{x:0, tex:"(0,\;1):\\ \\text{máximo local}", fb:'(0, 1): máximo local', pos:[1,1], cap:'Número crítico 0: la tangente es horizontal y f(0) = 1 es un máximo local'},
         {x:2, tex:"(2,\;-3):\\ \\text{mínimo local y absoluto}", fb:'(2, −3): mínimo local y absoluto', pos:[1,-1], cap:'Número crítico 2: la tangente es horizontal y f(2) = −3 es un mínimo local'},
         {x:-1, col:'ink', tex:"(-1,\;-3):\\ \\text{mínimo absoluto}", fb:'(−1, −3): mínimo absoluto', pos:[-1,-1], cap:'Extremo izquierdo del intervalo: f(−1) = −3, igual que f(2). El mínimo absoluto es −3'},
         {x:4, col:'ink', tex:"(4,\;17):\\ \\text{máximo absoluto}", fb:'(4, 17): máximo absoluto', pos:[-1,1], cap:'Extremo derecho del intervalo: f(4) = 17 es el mayor de los cuatro valores. El máximo absoluto es 17'}]
}));
