OA.scene('tvm-aplicacion', oaTVM({
  f:function(t){ return 90*t*t - 30*t*t*t; }, df:function(t){ return 180*t - 90*t*t; }, a:0, b:2, d0:0, d1:2,
  world:{x0:-0.42, x1:2.6, y0:-24, y1:146}, aspect:0.8, gx:[0.5,1,1.5,2,2.5], gy:[20,40,60,80,100,120,140],
  cName:'t', cFb:'t', dName:"s'(t)", dFb:"s'(t)",
  aria:'Gráfica de la posición s(t) = 90t² − 30t³ de un auto entre t = 0 y t = 2 horas, con la secante por A(0, 0) y B(2, 120), de pendiente 60, y un punto C con su tangente que recorre la curva y se detiene en t ≈ 0,42 y t ≈ 1,58, donde la tangente es paralela a la secante.',
  ATex:'A\\,(0,\;0)', AFb:'A (0, 0)', BTex:'B\\,(2,\;120)', BFb:'B (2, 120)', CTex:'C\\,\\big(t,\;s(t)\\big)', CFb:'C (t, s(t))',
  mTex:'\\text{velocidad media: }60', mFb:'velocidad media: 60',
  intTex:'[0,\;2]', intFb:'[0, 2]',
  mCapTex:'\\dfrac{120-0}{2-0}=60', mCapFb:'(120 − 0)/(2 − 0) = 60',
  mRoTex:'\\dfrac{s(2)-s(0)}{2-0}=\\dfrac{120-0}{2-0}=60',
  pos:{A:[1,-1], B:[-1,1], C:[1,-1], ms:[1.3, 78, -1, 1]},
  cs:[{x:1 - Math.sqrt(3)/3, tex:"t_{1}\\approx 0{,}42:\\ s'(t_{1})=60", fb:"t₁ ≈ 0,42: s'(t₁) = 60", pos:[1,-1], capTex:"s'(t_{1})=60", capFb:"s'(t₁) = 60"},
      {x:1 + Math.sqrt(3)/3, tex:"t_{2}\\approx 1{,}58:\\ s'(t_{2})=60", fb:"t₂ ≈ 1,58: s'(t₂) = 60", pos:[-1,1], capTex:"s'(t_{2})=60", capFb:"s'(t₂) = 60"}]
}));
