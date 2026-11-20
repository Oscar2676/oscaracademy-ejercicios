OA.scene('puntos-inflexion', oaAn({
  mode:'conc', f:function(x){ return x*x*x*x - 6*x*x; }, df:function(x){ return 4*x*x*x - 12*x; }, d2f:function(x){ return 12*x*x - 12; },
  d0:-2.62, d1:2.62, cuts:[-1, 1], world:{x0:-3.3, x1:3.3, y0:-17.5, y1:8}, aspect:0.86, gx:[-3,-2,-1,1,2,3], gy:[-15,-10,-5,5], full:true, sweep:22,
  fTex:'f(x)=x^{4}-6x^{2}', fFb:'f(x) = x⁴ − 6x²', txtUp:function(x){ return Math.abs(x) < 1; }, eps:0.25,
  aria:'Gráfica de f(x) = x⁴ − 6x². Es azul, cóncava hacia arriba, hasta x = −1; naranja, cóncava hacia abajo, entre −1 y 1; y azul desde x = 1. Los puntos (−1, −5) y (1, −5) son los puntos de inflexión.',
  curv:[{seg:0, len:22, xs:[-2.47, -1.12], txt:'hacia arriba', tx:-1.73, ty:-10.7}, {seg:1, len:22, xs:[-0.85, 0.85], txt:'hacia abajo', tx:0.12, ty:1.7, al:'left'}, {seg:2, len:22, xs:[1.12, 2.47], txt:'hacia arriba', tx:1.73, ty:-10.7}],
  marks:[{x:-1, tex:"I_{1}\\,(-1,\;-5)", fb:'I₁ (−1, −5)', pos:[-1,1], cap:'En (−1, −5) la concavidad cambia de hacia arriba a hacia abajo: punto de inflexión'},
         {x:1, tex:"I_{2}\\,(1,\;-5)", fb:'I₂ (1, −5)', pos:[1,1], cap:'En (1, −5) la concavidad cambia de hacia abajo a hacia arriba: punto de inflexión'}]
}));
