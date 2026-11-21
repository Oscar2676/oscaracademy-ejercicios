OA.scene('par-cicloide', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, TP = 2*Math.PI;
  function fx(t){ return t - Math.sin(t); } function fy(t){ return 1 - Math.cos(t); }
  function L(t){ return 4*(1 - Math.cos(t/2)); }
  function ts(s){ return s < 2 ? 0 : s < 20 ? TP*(s - 2)/18 : TP; }
  return {
    world:{x0:-1.4, x1:7.7, y0:-0.9, y1:3.1}, aspect:4/9.1,
    _chk:[{f:L, df:function(t){ return Math.sqrt(Math.pow(1 - Math.cos(t), 2) + Math.pow(Math.sin(t), 2)); }, at:[0.5, 2, 4, 5.5]}, {f:L, df:function(t){ return 2*Math.sin(t/2); }, at:[0.5, 2, 4, 5.5]}],
    aria:'Una rueda de radio 1 rueda sin resbalar sobre el eje x. Un punto naranja marcado en su borde parte tocando el suelo, sube, llega arriba de la rueda a altura 2 y vuelve a tocar el suelo cuando la rueda completa una vuelta, en x igual a 2 pi. El camino azul que deja es un arco de cicloide. Su largo acumulado llega a 8.',
    labels:[['F', 'L=\\displaystyle\\int_{0}^{2\\pi}2\\operatorname{sen}\\dfrac{t}{2}\\,dt=8', 'L = ∫ de 0 a 2π de 2 sen(t/2) dt = 8', 'diff']],
    sliders:[{id:'t', tex:'t', min:0, max:6.2832, step:0.01, value:0}],
    legend:'<span><i class="sw rise"></i> punto del borde</span><span><i class="sw sec"></i> camino recorrido (cicloide)</span><span><i class="sw alt"></i> rueda</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = fx(t), y = fy(t), rp = Math.abs(X(1) - X(0)), k;
      S.axes({gx:[1, 2, 3, 4, 5, 6, 7], gy:[1, 2]});
      oaPar(S, fx, fy, 0, TP, 'rgba(31,93,134,0.22)', 2); if (t > 0.01) oaPar(S, fx, fy, 0, t, C.sec, 3.4);
      c.strokeStyle = C.alt; c.lineWidth = 2.2; c.beginPath(); c.arc(X(t), Y(1), rp, 0, 6.2832); c.stroke();
      for (k = 0; k < 4; k++){ S.line(t, 1, t - Math.sin(t + k*Math.PI/2), 1 - Math.cos(t + k*Math.PI/2), {color:k ? 'rgba(46,107,62,0.45)' : C.alt, width:k ? 1.2 : 2.4}); }
      S.dot(t, 1, C.alt); c.fillStyle = C.rise; c.beginPath(); c.arc(X(x), Y(y), 7, 0, 6.2832); c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke();
      S.line(0, -0.35, t, -0.35, {color:C.tan, width:3}); txt('la rueda avanzó t = ' + dec(t, 2), X(Math.max(t/2, 0.9)), Y(-0.35) + 14, 'center', C.tan);
      txt('largo del camino ≈ ' + dec(L(t), 2), X(-1.3), Y(2.75), 'left', C.sec);
      S.lab('F', X(2.6), Y(2.8), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Una rueda de radio 1 va a rodar sin resbalar. Mira el punto naranja de su borde: su camino no es una recta ni un círculo. Es una cicloide';
      if (t >= 6.28) return 'La rueda dio una vuelta y avanzó 2π, cerca de 6,28. El punto del borde recorrió un camino de largo 8: más que lo que avanzó la rueda';
      return 'La rueda giró t = ' + dec(t, 2) + ' radianes. El punto está en (' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + ') y su rapidez es 2 sen(t/2) = ' + dec(2*Math.sin(t/2), 2) + (t > 2.9 && t < 3.4 ? ': la máxima, arriba de la rueda' : '');
    },
    readout:function(v){ var t = v.t; return [['', 'x\'(t)=1-\\cos t,\\quad y\'(t)=\\operatorname{sen}t\\ \\Longrightarrow\\ \\sqrt{x\'^{2}+y\'^{2}}=\\sqrt{2-2\\cos t}=2\\operatorname{sen}\\dfrac{t}{2}'], ['d', '\\displaystyle\\int_{0}^{t}2\\operatorname{sen}\\dfrac{\\tau}{2}\\,d\\tau=4\\left(1-\\cos\\dfrac{t}{2}\\right)'], ['', 't=' + num(t, 2) + ':\\quad \\text{largo recorrido}\\approx ' + num(L(t), 2) + '\\ \\longrightarrow\\ 8']]; }
  };
})());
