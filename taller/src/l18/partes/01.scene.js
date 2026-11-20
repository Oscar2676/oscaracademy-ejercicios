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
OA.scene('tvm-discontinua', (function(){
  var RUN = 36, num = OA.num, M = 9/4;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function g(x){ return x < 1 ? x*x : x*x/2 + 2.5; }
  function dg(x){ return x < 1 ? 2*x : x; }
  function xs(s){ return s < 3 ? 0.1 : s < 10 ? 0.1 + 0.89*OA.smooth(cl((s - 3)/6.5)) : s < 13 ? 0.99 : s < 16 ? 1 : s < 21 ? 1 + OA.smooth(cl((s - 16)/4.5)) : s < 24 ? 2 : 0.1 + 1.88*cl((s - 24.5)/10.5); }
  return {
    world:{x0:-0.88, x1:2.75, y0:-0.75, y1:5.35}, aspect:6.1/3.63*0.5,
    aria:'Gráfica de g: la curva y = x² desde (0, 0) hasta el círculo abierto (1, 1), y otra curva más arriba, desde el punto lleno (1, 3) hasta (2, 9/2). En x = 1 hay un salto de la altura 1 a la altura 3. La secante por A(0, 0) y B(2, 9/2) tiene pendiente 9/4; la tangente nunca alcanza esa pendiente.',
    labels:[['A', 'A\\,(0,\;0)', 'A (0, 0)', 'pt'], ['B', 'B\\left(2,\;\\dfrac{9}{2}\\right)', 'B (2, 9/2)', 'pt'],
            ['L', '\\displaystyle\\lim_{x\\to 1^{-}}g(x)=1', 'lím g(x) = 1 por la izquierda', 'pt c-tan'], ['V', 'g(1)=3', 'g(1) = 3', 'pt'], ['J', '\\text{salto}', 'salto', 'diff'],
            ['S', '\\text{secante: pendiente }\\tfrac{9}{4}=2{,}25', 'secante: pendiente 9/4 = 2,25', 'c-sec']],
    sliders:[{id:'x', tex:'x', min:0, max:2, step:0.01, value:0.1}],
    legend:'<span><i class="sw sec"></i> secante \\(AB\\)</span><span><i class="sw tan"></i> tangente en \\(P\\)</span><span><i class="sw rise"></i> salto</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, y = g(x), C = S.C, W = S.W, c = S.ctx, k = cl(s/2.5);
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[1, 2], gy:[1, 2, 3, 4, 5], full:true});
      if (s >= 21) S.line(W.x0, M*W.x0, W.x1, M*W.x1, {color:C.sec, width:2.5});
      S.curve(function(u){ return u*u; }, 0, k, {color:C.ink, width:3.5});
      S.curve(function(u){ return u*u/2 + 2.5; }, 1, 1 + k, {color:C.ink, width:3.5});
      if (s >= 13) S.line(1, 1.12, 1, 2.88, {color:C.rise, width:4});
      if (s >= 2.5){ S.ring(1, 1, C.ink); S.dot(1, 3, C.ink); S.dot(0, 0, C.sec); S.dot(2, 4.5, C.sec); }
      if (s >= 3){
        var tan = (v.t == null || s >= 24) && Math.abs(x - 1) > 0.004 && x > 0.001 && x < 1.999;
        if (tan){ var m = dg(x), sx = S.w/(W.x1 - W.x0), sy = S.h/(W.y1 - W.y0), ux = sx, uy = -m*sy, n = Math.sqrt(ux*ux + uy*uy), L = 0.17*S.w; ux /= n; uy /= n;
          S.pline(S.X(x) - L*ux, S.Y(y) - L*uy, S.X(x) + L*ux, S.Y(y) + L*uy, {color:C.tan, width:3});
          txt('pendiente ' + dec(m, 2), S.X(x) + 12, S.Y(y) + 18, 'left', C.tan); }
        S.line(x, y, x, 0, {color:C.muted, width:1, dash:[3,4]}); S.line(x, y, 0, y, {color:C.muted, width:1, dash:[3,4]});
        S.dot(x, y, C.tan);
        txt('x = ' + dec(x, 2), S.X(x), S.Y(0) + 26, 'center', C.tan); if (!tan) txt('g(x) = ' + dec(y, 2), S.X(0) - 6, S.Y(y), 'right', C.tan);
      }
      S.out('A', S.X(0), S.Y(0), -1, -1, s >= 21);
      S.out('B', S.X(2), S.Y(4.5), 1, -1, s >= 21);
      S.out('L', S.X(1), S.Y(1), 1, -1, s >= 10);
      S.out('V', S.X(1), S.Y(3), -1, 1, s >= 13);
      S.lab('J', S.X(1) + 10, S.Y(2), 0, -50, s >= 13);
      S.out('S', S.X(1.45), S.Y(M*1.45), -1, 1, s >= 22);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN;
      if (s == null || s >= 24) return Math.abs(x - 1) <= 0.004 ? 'En x = 1 la gráfica salta de la altura 1 a la altura 3: ahí no hay tangente' : ['Recta roja: la tangente en P. Su pendiente es menor que 2 y la de la secante es 2,25. Nunca son paralelas: ', "g'(" + num(x, 2) + ')=' + num(dg(x), 2), "g'(" + dec(x, 2) + ') = ' + dec(dg(x), 2)];
      if (s < 3) return 'Dos curvas: g(x) = x² hasta el círculo blanco (1, 1), y g(x) = x²/2 + 5/2 desde el punto lleno (1, 3)';
      if (s < 10) return ['El punto P se acerca a x = 1 por la izquierda y su altura se acerca a 1: ', 'g(' + num(x, 2) + ')=' + num(g(x), 2), 'g(' + dec(x, 2) + ') = ' + dec(g(x), 2)];
      if (s < 13) return 'Cuando x tiende a 1 por la izquierda, g(x) tiende a 1';
      if (s < 16) return 'Pero en x = 1 la función vale g(1) = 3: la gráfica salta de la altura 1 a la altura 3. No es continua en 1';
      if (s < 21) return ['La gráfica sigue por la segunda curva, más arriba: ', 'g(' + num(x, 2) + ')=' + num(g(x), 2), 'g(' + dec(x, 2) + ') = ' + dec(g(x), 2)];
      return 'Recta azul: la secante por A (0, 0) y B (2, 9/2). Su pendiente es 9/4 = 2,25';
    },
    readout:function(v){ var x = v.x; if (Math.abs(x - 1) <= 0.004) return [['d', 'x=1{,}00\\qquad g(1)=3']]; var r = 'x=' + num(x, 2) + '\\qquad g(x)=' + num(g(x), 2); if (x > 0.001 && x < 1.999) r += "\\qquad g'(x)=" + num(dg(x), 2); return [['d', r]]; }
  };
})());
