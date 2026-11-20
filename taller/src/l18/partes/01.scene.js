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
OA.scene('tvm-derivable', (function(){
  var RUN = 40, num = OA.num, A = 0.4, B = 4;
  function f(x){ return x <= 2 ? 1 + x*x/4 : 3 - x/2; }
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  function hh(u){ return 1 - 0.98*OA.smooth(cl(u)); }
  function st(s){
    if (s < 6) return {x0:1, h:0};
    if (s < 13) return {x0:1, h:hh((s - 6)/5.5)};
    if (s < 20) return {x0:1, h:-hh((s - 13)/5.5)};
    if (s < 24) return {x0:1, h:0, fin:1};
    if (s < 27) return {x0:1 + OA.smooth(cl((s - 24)/2.5)), h:0};
    if (s < 32) return {x0:2, h:hh((s - 27)/4)};
    if (s < 37) return {x0:2, h:-hh((s - 32)/4)};
    return {x0:2, h:0, fin:2};
  }
  function q(x0, h){ return (f(x0 + h) - f(x0))/h; }
  return {
    world:{x0:-0.7, x1:4.9, y0:-0.75, y1:3.25}, aspect:4/5.6,
    aria:'Curva suave hasta x = 2 y con una punta en x = 2. En x₀ = 1 las secantes por la derecha y por la izquierda tienden a la misma recta, la tangente, de pendiente 1/2. En x₀ = 2 las secantes por la derecha tienen pendiente −1/2 y las de la izquierda tienden a pendiente 1: no hay tangente.',
    labels:[['P', 'P\\,\\big(x_{0},\;f(x_{0})\\big)', 'P (x₀, f(x₀))', 'pt'], ['R', '\\big(x_{0}+h,\;f(x_{0}+h)\\big)', '(x₀+h, f(x₀+h))', 'pt'],
            ['d1', "f'(1)=\\dfrac{1}{2}:\\ \\text{hay tangente}", "f'(1) = 1/2: hay tangente", 'diff'], ['d2', "1\\neq-\\dfrac{1}{2}:\\ \\text{no existe }f'(2)", "1 ≠ −1/2: no existe f'(2)", 'diff']],
    sliders:[{id:'x0', tex:'x_{0}', min:1, max:2, step:1, value:1}, {id:'h', tex:'h', min:-1, max:1, step:0.02, value:1}],
    legend:'<span><i class="sw sec"></i> secante con \\(h&gt;0\\)</span><span><i class="sw alt"></i> secante con \\(h&lt;0\\)</span><span><i class="sw tan"></i> tangente</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; var e = st(p*RUN); v.x0 = e.x0; v.h = e.h; }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? 99 : v.t*RUN, e = v.t == null ? {x0:Math.round(v.x0), h:Math.abs(v.h) < 0.01 ? 0 : v.h} : st(s), x0 = e.x0, h = e.h, C = S.C, W = S.W, x = S.ctx, y0 = f(x0);
      function txt(t, px, py, al, col){ x.fillStyle = col || C.ink; x.font = '600 12px "Source Sans 3", system-ui, sans-serif'; x.textAlign = al || 'center'; x.textBaseline = 'middle'; x.fillText(t, px, py); }
      S.axes({gx:[1,2,3,4], gy:[1,2,3], full:true});
      S.curve(f, -0.6, 4.7, {color:C.muted, width:1.2});
      S.curve(f, A, A + (B - A)*cl(s/2.5), {color:C.ink, width:3});
      S.line(A, -0.06, A, 0.06, {color:C.ink, width:1.5}); S.line(B, -0.06, B, 0.06, {color:C.ink, width:1.5});
      txt('a', S.X(A), S.Y(0) + 26, 'center', C.muted); txt('b', S.X(B), S.Y(0) + 26, 'center', C.muted);
      if (s >= 3){
        S.line(x0, y0, x0, 0, {color:C.muted, width:1, dash:[3,4]}); txt('x₀', S.X(x0), S.Y(0) + 26, 'center');
        if (h){
          var col = h > 0 ? C.sec : C.alt, m = q(x0, h), x1 = x0 + h, y1 = f(x1);
          S.line(W.x0, y0 + m*(W.x0 - x0), W.x1, y0 + m*(W.x1 - x0), {color:col, width:2.5});
          S.line(x1, y1, x1, 0, {color:col, width:1, dash:[3,4]});
          if (Math.abs(h) > 0.3) txt('x₀+h', S.X(x1), S.Y(0) + 26, 'center', col);
          S.dot(x1, y1, col);
          txt('h = ' + dec(h, 2) + '   pendiente ' + dec(m, 2), S.X(W.x1) - 8, S.Y(W.y1) + 14, 'right', col);
        }
        if (e.fin === 1) S.line(W.x0, y0 + 0.5*(W.x0 - 1), W.x1, y0 + 0.5*(W.x1 - 1), {color:C.tan, width:3});
        if (e.fin === 2){
          S.line(W.x0, 2 + (W.x0 - 2), W.x1, 2 + (W.x1 - 2), {color:C.alt, width:2.5, dash:[7,5]});
          S.line(W.x0, 2 - 0.5*(W.x0 - 2), W.x1, 2 - 0.5*(W.x1 - 2), {color:C.sec, width:2.5, dash:[7,5]});
          txt('pendiente 1', S.X(2.75), S.Y(2.95), 'left', C.alt); txt('pendiente −1/2', S.X(0.1), S.Y(2.72), 'left', C.sec);
        }
        S.dot(x0, y0, C.tan);
      }
      var arriba = x0 > 1.5;
      S.out('P', S.X(x0), S.Y(y0), arriba ? 1 : -1, arriba ? -1 : 1, s >= 3 && !e.fin && (x0 === 1 || x0 === 2));
      if (h) S.out('R', S.X(x0 + h), S.Y(f(x0 + h)), h > 0 ? 1 : -1, h > 0 && x0 < 1.5 ? -1 : 1, Math.abs(h) > 0.45); else S.lab('R', 0, 0, 0, 0, false);
      S.out('d1', S.X(1), S.Y(1.25), -1, 1, e.fin === 1, 10);
      S.out('d2', S.X(2), S.Y(2), 1, -1, e.fin === 2, 14);
    },
    caption:function(v){
      if (v.t == null){ var x0 = Math.round(v.x0), h = Math.abs(v.h) < 0.01 ? 0 : v.h; return h ? ['Pendiente de la secante por P y el punto de abscisa x₀ + h: ', num(q(x0, h), 2), dec(q(x0, h), 2)] : 'Con h = 0 no hay secante: el cociente no está definido. Mueve h'; }
      var s = v.t*RUN, e = st(s);
      if (s < 3) return 'Curva negra gruesa: la función entre a y b';
      if (s < 6) return 'Punto P: un punto de la curva, de abscisa x₀ = 1, donde la curva es suave';
      if (s < 13) return ['Recta azul: la secante por P y un punto a su derecha, con h > 0. Su pendiente es ', num(q(1, e.h), 2), dec(q(1, e.h), 2)];
      if (s < 20) return ['Recta verde: la secante por P y un punto a su izquierda, con h < 0. Su pendiente es ', num(q(1, e.h), 2), dec(q(1, e.h), 2)];
      if (s < 24) return 'Por la derecha y por la izquierda la pendiente tiende a 1/2. Recta roja: la tangente. La función es derivable en x₀ = 1';
      if (s < 27) return 'Ahora P va a la punta de la curva, de abscisa x₀ = 2';
      if (s < 32) return ['Por la derecha, con h > 0, la pendiente de la secante vale siempre ', num(q(2, e.h), 2), dec(q(2, e.h), 2)];
      if (s < 37) return ['Por la izquierda, con h < 0, la pendiente de la secante tiende a 1. Ahora vale ', num(q(2, e.h), 2), dec(q(2, e.h), 2)];
      return 'Los dos límites son distintos, 1 ≠ −1/2: en la punta no hay tangente. La función no es derivable en x₀ = 2';
    },
    readout:function(v){
      var x0 = v.t == null ? Math.round(v.x0) : v.x0, h = v.h;
      if (!h || Math.abs(h) < 0.01 || (x0 !== 1 && x0 !== 2)) return [];
      return [['d', '\\dfrac{f(x_{0}+h)-f(x_{0})}{h}=' + num(q(x0, h), 2)], ['', 'x_{0}=' + x0 + '\\qquad h=' + num(h, 2)]];
    }
  };
})());
