OA.scene('tvm-polinomial', oaTVM({
  f:function(x){ return x*x - 4*x + 5; }, df:function(x){ return 2*x - 4; }, a:1, b:4, d0:0.2, d1:4.6,
  world:{x0:-0.9, x1:5.6, y0:-1.2, y1:7.2}, aspect:8.4/6.5, gx:[1,2,3,4,5], gy:[1,2,3,4,5,6,7],
  aria:'Gráfica de f(x) = x² − 4x + 5 en el intervalo [1, 4], con la secante por A(1, 2) y B(4, 5) y un punto C con su tangente que recorre la curva hasta c = 5/2, donde la tangente es paralela a la secante.',
  ATex:'A\\,(1,\;2)', AFb:'A (1, 2)', BTex:'B\\,(4,\;5)', BFb:'B (4, 5)', CTex:'C\\,\\big(c,\;f(c)\\big)', CFb:'C (c, f(c))',
  mTex:'\\text{secante: pendiente }1', mFb:'secante: pendiente 1',
  intTex:'[1,\;4]', intFb:'[1, 4]',
  mCapTex:'\\dfrac{5-2}{4-1}=1', mCapFb:'(5 − 2)/(4 − 1) = 1',
  mRoTex:'\\dfrac{f(4)-f(1)}{4-1}=\\dfrac{5-2}{4-1}=1',
  pos:{A:[-1,1], B:[-1,1], C:[1,-1], ms:[3.3, 4.3, -1, 1]},
  cs:[{x:2.5, tex:"C\\left(\\dfrac{5}{2},\;\\dfrac{5}{4}\\right):\\ f'\\!\\left(\\dfrac{5}{2}\\right)=1", fb:"C (5/2, 5/4): f'(5/2) = 1", pos:[1,-1],
       capTex:"f'\\!\\left(\\dfrac{5}{2}\\right)=1", capFb:"f'(5/2) = 1"}]
}));
