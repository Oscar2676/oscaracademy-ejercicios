OA.scene('criterio-primera-derivada', oaAn({
  mode:'crec', f:function(x){ return x*x*x*x/4 - x*x*x; }, df:function(x){ return x*x*x - 3*x*x; }, d2f:function(x){ return 3*x*x - 6*x; },
  d0:-1.4, d1:4.3, cuts:[0, 3], world:{x0:-2.1, x1:5.1, y0:-13.5, y1:7.5}, aspect:0.86, gx:[-2,-1,1,2,3,4,5], gy:[-10,-8,-6,-4,-2,2,4,6], full:true,
  fTex:'f(x)=\\dfrac{x^{4}}{4}-x^{3}', fFb:'f(x) = x⁴/4 − x³', txtUp:function(x){ return true; }, eps:0.06,
  aria:'Gráfica de f(x) = x⁴/4 − x³. Decrece hasta x = 0, donde la tangente es horizontal, sigue decreciendo hasta x = 3 y después crece. En (0, 0) no hay extremo; en (3, −27/4) hay un mínimo local.',
  marks:[{x:0, tex:"(0,\;0):\\ f'\\text{ no cambia de signo, no hay extremo}", fb:"(0, 0): f' no cambia de signo, no hay extremo", pos:[1,1], cap:'En 0 la derivada vale 0, pero es negativa a los dos lados: no hay extremo local'},
         {x:3, tex:"\\left(3,\;-\\dfrac{27}{4}\\right):\\ f'\\text{ cambia de }-\\text{ a }+,\\ \\text{mínimo local}", fb:"(3, −27/4): f' cambia de − a +, mínimo local", pos:[-1,-1], cap:'En 3 la derivada cambia de negativa a positiva: hay un mínimo local, f(3) = −27/4'}]
}));
