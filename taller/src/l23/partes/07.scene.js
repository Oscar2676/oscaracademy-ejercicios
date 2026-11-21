OA.scene('vec-intro', (function(){
  var RUN = 22, num = OA.num, dec = oaDec;
  function fx(t){ return t; } function fy(t){ return 4 - t*t; }
  function ts(s){ return s < 2 ? -2 : s < 18 ? -2 + 4*(s - 2)/16 : 2; }
  return {
    world:{x0:-3.4, x1:3.4, y0:-3.7, y1:5.3}, aspect:9/6.8,
    _chk:[{f:fy, df:function(t){ return -2*t; }, at:[-1.5, 0.5, 1.5]}],
    aria:'Una flecha naranja sale del origen y termina en el punto de coordenadas t y 4 menos t al cuadrado: es el vector r de t. Al avanzar t de −2 a 2 la punta de la flecha dibuja una parábola azul. Dos flechas más muestran sus componentes: una burdeo sobre el eje x, de largo t, y una verde paralela al eje y, de largo 4 menos t al cuadrado.',
    labels:[['F', '\\vec r(t)=\\big\\langle t,\;4-t^{2}\\big\\rangle,\\quad -2\\le t\\le 2', 'r(t) = ⟨t, 4 − t²⟩, −2 ≤ t ≤ 2', 'diff']],
    sliders:[{id:'t', tex:'t', min:-2, max:2, step:0.01, value:-2}],
    legend:'<span><i class="sw rise"></i> vector \\(\\vec r(t)\\)</span><span><i class="sw tan"></i> componente \\(x(t)=t\\)</span><span><i class="sw alt"></i> componente \\(y(t)=4-t^{2}\\)</span><span><i class="sw sec"></i> curva que dibuja la punta</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t);
      S.line(-3.2, 0, 3.2, 0, {color:C.ink, width:1.3}); S.line(0, -0.3, 0, 5, {color:C.ink, width:1.3}); [-2, -1, 1, 2].forEach(function(q){ S.line(q, -0.08, q, 0.08, {color:C.ink, width:1}); }); [1, 2, 3, 4].forEach(function(q){ S.line(-0.06, q, 0.06, q, {color:C.ink, width:1}); txt('' + q, X(0) - 8, Y(q), 'right', C.muted); }); txt('−2', X(-2), Y(0) + 12, 'center', C.muted); txt('2', X(2), Y(0) + 12, 'center', C.muted);
      oaPar(S, fx, fy, -2, 2, 'rgba(31,93,134,0.22)', 2); if (t > -1.99) oaPar(S, fx, fy, -2, t, C.sec, 3.2);
      oaFle(S, 0, 0, x, 0, C.tan, 3); oaFle(S, x, 0, x, y, C.alt, 3); oaFle(S, 0, 0, x, y, C.rise, 3.2);
      S.dot(0, 0, C.ink);
      if (Math.abs(x) > 0.45) txt('x(t) = t', X(x/2), Y(0) - 12, 'center', C.tan);
      if (y > 0.5) txt('y(t) = 4 − t²', X(x) + (x >= 0 ? 10 : -10), Y(y/2), x >= 0 ? 'left' : 'right', C.alt);
      txt('punta: (t, 4 − t²)', X(x) + (x >= 0 ? 10 : -10), Y(y) - 12, x >= 0 ? 'left' : 'right', C.rise);
      txt('t = ' + dec(t, 2), X(-3.3), Y(-0.95), 'left', C.ink);
      txt('x(t) = t = ' + dec(x, 2), X(-3.3), Y(-0.95) + 21, 'left', C.tan);
      txt('y(t) = 4 − t² = 4 − (' + dec(t, 2) + ')² = ' + dec(y, 2), X(-3.3), Y(-0.95) + 42, 'left', C.alt);
      txt('r(t) = ⟨' + dec(x, 2) + '; ' + dec(y, 2) + '⟩', X(-3.3), Y(-0.95) + 63, 'left', C.rise);
      S.lab('F', X(-3.3), Y(-3.1), 0, 0, v.q != null && s >= 18);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Para cada valor de t, la función entrega un vector: una flecha que sale del origen. Aquí, con t = −2, la flecha termina en (−2, 0)';
      if (t >= 1.995) return 'Al recorrer t de −2 a 2, la punta de la flecha dibujó un arco de parábola. La curva es el camino de la punta; la función vectorial dice, además, en qué valor de t pasa por cada punto';
      return 'Con t = ' + dec(t, 2) + ' el vector es ⟨' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + '⟩: avanza ' + dec(fx(t), 2) + ' en x (flecha burdeo) y ' + dec(fy(t), 2) + ' en y (flecha verde)';
    },
    readout:function(v){ var t = v.t; return [['', '\\vec r(t)=\\big\\langle x(t),\\,y(t)\\big\\rangle=x(t)\\,\\hat\\imath+y(t)\\,\\hat\\jmath'], ['d', 'x(t)=t\\qquad y(t)=4-t^{2}'], ['', 't=' + num(t, 2) + ':\\quad\\vec r(t)=\\big\\langle ' + num(fx(t), 2) + ';\\ ' + num(fy(t), 2) + '\\big\\rangle']]; }
  };
})());
