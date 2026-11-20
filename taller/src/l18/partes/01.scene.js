OA.scene('tvm-condiciones', oaTVM({
  f:function(x){ return Math.abs(x); }, df:function(x){ return x > 0 ? 1 : -1; }, a:-1, b:2, d0:-2.2, d1:3,
  noTan:function(c){ return Math.abs(c) < 0.02; }, noTanCap:'En c = 0 la curva tiene una punta: ahí no hay recta tangente',
  world:{x0:-2.6, x1:3.4, y0:-0.9, y1:3.4}, aspect:4.3/6, gx:[-2,-1,1,2,3], gy:[1,2,3], full:true,
  aria:'Gráfica de f(x) = valor absoluto de x en el intervalo [−1, 2], con la secante por A(−1, 1) y B(2, 2), de pendiente 1/3, y un punto C con su tangente, de pendiente −1 a la izquierda de 0 y 1 a la derecha de 0. Ninguna tangente es paralela a la secante.',
  ATex:'A\\,(-1,\;1)', AFb:'A (−1, 1)', BTex:'B\\,(2,\;2)', BFb:'B (2, 2)', CTex:'C\\,\\big(c,\;f(c)\\big)', CFb:'C (c, f(c))',
  mTex:'\\text{secante: pendiente }\\tfrac{1}{3}', mFb:'secante: pendiente 1/3',
  intTex:'[-1,\;2]', intFb:'[−1, 2]',
  mCapTex:'\\dfrac{2-1}{2-(-1)}=\\dfrac{1}{3}', mCapFb:'(2 − 1)/(2 − (−1)) = 1/3',
  mRoTex:'\\dfrac{f(2)-f(-1)}{2-(-1)}=\\dfrac{2-1}{2-(-1)}=\\dfrac{1}{3}',
  pos:{A:[-1,1], B:[1,-1], C:function(c){ return c < 0 ? [1,1] : [-1,1]; }, ms:[0.5, 1.5, -1, 1]},
  endCap:'La pendiente de la tangente solo vale −1 o 1. Nunca vale 1/3: ninguna tangente es paralela a la secante'
}));
