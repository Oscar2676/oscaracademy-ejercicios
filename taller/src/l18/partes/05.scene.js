OA.scene('tvm-radical-2', oaTVM({
  f:function(x){ return Math.sqrt(Math.max(0, 25 - x*x)); }, df:function(x){ return -x/Math.sqrt(25 - x*x); }, a:-3, b:4, d0:-5, d1:5,
  world:{x0:-6.4, x1:6.4, y0:-1.6, y1:7}, aspect:8.6/12.8, gx:[-4,-2,2,4], gy:[2,4,6], full:true,
  aria:'Semicircunferencia f(x) = raíz cuadrada de 25 − x² en el intervalo [−3, 4], con la secante por A(−3, 4) y B(4, 3) y un punto C con su tangente que recorre la curva hasta c = raíz de 2 partido por 2, donde la tangente es paralela a la secante.',
  ATex:'A\\,(-3,\;4)', AFb:'A (−3, 4)', BTex:'B\\,(4,\;3)', BFb:'B (4, 3)', CTex:'C\\,\\big(c,\;f(c)\\big)', CFb:'C (c, f(c))',
  mTex:'\\text{secante: pendiente }-\\tfrac{1}{7}', mFb:'secante: pendiente −1/7',
  intTex:'[-3,\;4]', intFb:'[−3, 4]',
  mCapTex:'\\dfrac{3-4}{4-(-3)}=-\\dfrac{1}{7}', mCapFb:'(3 − 4)/(4 − (−3)) = −1/7',
  mRoTex:'\\dfrac{f(4)-f(-3)}{4-(-3)}=\\dfrac{3-4}{4-(-3)}=-\\dfrac{1}{7}',
  pos:{A:[-1,1], B:[1,1], C:[1,1], ms:[-0.5, 3.64, -1, -1]},
  cs:[{x:Math.SQRT1_2, tex:"C\\left(\\dfrac{\\sqrt{2}}{2},\;\\dfrac{7\\sqrt{2}}{2}\\right):\\ f'\\!\\left(\\dfrac{\\sqrt{2}}{2}\\right)=-\\dfrac{1}{7}", fb:"C (√2/2, 7√2/2): f'(√2/2) = −1/7", pos:[1,1],
       capTex:"f'\\!\\left(\\dfrac{\\sqrt{2}}{2}\\right)=-\\dfrac{1}{7}", capFb:"f'(√2/2) = −1/7"}]
}));
