OA.scene('tfc-acumulacion', oaAcu({
  x0:0, x1:5.4, fr:[-2.4, 2.4], gr:[-2.4, 2.4], fy:[-2, 2], gy:[-2, 2], gx:[1, 2, 3, 4, 5],
  f:function(t){ return 2*Math.cos(t); }, g:function(x){ return 2*Math.sin(x); }, chk:[0.5, 1, 2, 3, 4.5],
  fn:'f(t) = 2 cos t', gn:'g(x) = ∫₀ˣ 2 cos t dt',
  stops:[{x:Math.PI/2, up:true, txt:'f = 0: máximo de g', cap:'En x = π/2, f vale 0: el área deja de sumar. La tangente a g es horizontal y g alcanza su máximo, 2'}, {x:3*Math.PI/2, up:false, txt:'f = 0: mínimo de g', cap:'En x = 3π/2, f vale 0: el área deja de restar. La tangente a g es horizontal y g alcanza su mínimo, −2'}],
  aria:'Dos gráficas, una sobre otra. Arriba, f de t igual a 2 coseno de t, con el área entre la curva y el eje pintada desde 0 hasta x: verde donde f es positiva, burdeo donde es negativa. Abajo, la función de acumulación g de x, que vale esa área con signo. La pendiente de la tangente a g es siempre el valor de f en ese x.',
  Ftex:'g\'(x)=\\dfrac{d}{dx}\\displaystyle\\int_{0}^{x}f(t)\\,dt=f(x)', Ftxt:'g′(x) = f(x)',
  cap0:'Arriba: f, y el área desde 0 hasta x. Abajo: g(x), que vale esa área con signo. El punto de abajo sube mientras el área suma',
  readout:function(x, num){ return [['', 'g(x)=\\displaystyle\\int_{0}^{x}2\\cos t\\,dt'], ['d', 'g\'(x)=f(x)=2\\cos x'], ['', 'x=' + num(x, 2) + ':\\quad g\'(x)=2\\cos(' + num(x, 2) + ')\\approx ' + num(2*Math.cos(x), 2)]]; }
}));
