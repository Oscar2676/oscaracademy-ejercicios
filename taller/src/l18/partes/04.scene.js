OA.scene('tvm-radical', oaTVM({
  f:function(x){ return Math.sqrt(2*x + 1); }, df:function(x){ return 1/Math.sqrt(2*x + 1); }, a:0, b:4, d0:-0.5, d1:5.3,
  world:{x0:-1.2, x1:5.6, y0:-0.9, y1:4.3}, aspect:5.2/6.8, gx:[1,2,3,4,5], gy:[1,2,3,4],
  aria:'Gráfica de f(x) = raíz cuadrada de 2x + 1 en el intervalo [0, 4], con la secante por A(0, 1) y B(4, 3) y un punto C con su tangente que recorre la curva hasta c = 3/2, donde la tangente es paralela a la secante.',
  ATex:'A\\,(0,\;1)', AFb:'A (0, 1)', BTex:'B\\,(4,\;3)', BFb:'B (4, 3)', CTex:'C\\,\\big(c,\;f(c)\\big)', CFb:'C (c, f(c))',
  mTex:'\\text{secante: pendiente }\\tfrac{1}{2}', mFb:'secante: pendiente 1/2',
  intTex:'[0,\;4]', intFb:'[0, 4]',
  mCapTex:'\\dfrac{3-1}{4-0}=\\dfrac{1}{2}', mCapFb:'(3 − 1)/(4 − 0) = 1/2',
  mRoTex:'\\dfrac{f(4)-f(0)}{4-0}=\\dfrac{3-1}{4-0}=\\dfrac{1}{2}',
  pos:{A:[-1,1], B:[1,-1], C:[-1,1], ms:[2.9, 2.45, 1, -1]},
  cs:[{x:1.5, tex:"C\\left(\\dfrac{3}{2},\;2\\right):\\ f'\\!\\left(\\dfrac{3}{2}\\right)=\\dfrac{1}{2}", fb:"C (3/2, 2): f'(3/2) = 1/2", pos:[-1,1],
       capTex:"f'\\!\\left(\\dfrac{3}{2}\\right)=\\dfrac{1}{2}", capFb:"f'(3/2) = 1/2"}]
}));
