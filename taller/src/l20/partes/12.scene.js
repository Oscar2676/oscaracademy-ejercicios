OA.scene('par-segunda', (function(){
  var RUN = 24, num = OA.num, PI = Math.PI;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function fx(t){ return t - Math.sin(t); } function fy(t){ return 1 - Math.cos(t); }
  function ts(s){ return s < 2 ? 0.25 : s < 9 ? 0.25 + (PI - 0.25)*(s - 2)/7 : s < 10.3 ? PI : s < 17.3 ? PI + (PI - 0.25)*(s - 10.3)/7 : 2*PI - 0.25; }
  return {
    world:{x0:-0.9, x1:7.2, y0:-1.3, y1:3.5}, aspect:4.8/8.1,
    _chk:[{f:fx, df:function(t){ return 1 - Math.cos(t); }, at:[0.5, 2, 4]}, {f:fy, df:function(t){ return Math.sin(t); }, at:[0.5, 2, 4]}],
    aria:'Una rueda de radio 1 gira sin resbalar sobre una recta. Un punto de su borde dibuja un arco de cicloide, cóncavo hacia abajo. La tangente tiene pendiente positiva al subir, cero en lo más alto y negativa al bajar.',
    labels:[['F', '\\dfrac{d^{2}y}{dx^{2}}=-\\dfrac{1}{(1-\\cos t)^{2}}<0', 'd²y/dx² = −1/(1 − cos t)² < 0', 'diff']],
    sliders:[{id:'t', tex:'t', min:0.25, max:6.03, step:0.01, value:0.25}],
    legend:'<span><i class="sw sec"></i> rueda</span><span><i class="sw alt"></i> cicloide</span><span><i class="sw rise"></i> tangente</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.t = ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, t = v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, x = fx(t), y = fy(t), dx = 1 - Math.cos(t), dy = Math.sin(t), n = Math.sqrt(dx*dx + dy*dy), L = 0.9, k = X(1) - X(0), i, u;
      function txt(tx, qx, qy, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? qx - 4 : al === 'right' ? qx - w + 4 : qx - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, qy - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, qx, qy); }
      S.axes({gx:[1, 2, 3, 4, 5, 6], gy:[1, 2]});
      c.strokeStyle = C.alt; c.globalAlpha = 0.3; c.lineWidth = 2; c.beginPath(); for (i = 0; i <= 200; i++){ u = 2*PI*i/200; if (i) c.lineTo(X(fx(u)), Y(fy(u))); else c.moveTo(X(fx(u)), Y(fy(u))); } c.stroke(); c.globalAlpha = 1;
      c.lineWidth = 2.8; c.beginPath(); for (i = 0; i <= 200; i++){ u = t*i/200; if (i) c.lineTo(X(fx(u)), Y(fy(u))); else c.moveTo(X(fx(u)), Y(fy(u))); } c.stroke();
      /* rueda de radio 1 con centro en (t, 1), su radio hasta el punto y el ángulo girado */
      c.strokeStyle = C.sec; c.lineWidth = 2; c.beginPath(); c.arc(X(t), Y(1), k, 0, 2*PI); c.stroke();
      S.line(t, 1, x, y, {color:C.sec, width:2}); S.line(t, 1, t, 0, {color:C.sec, width:1, dash:[3, 3]}); S.dot(t, 1, C.sec);
      S.line(x - L*dx/n, y - L*dy/n, x + L*dx/n, y + L*dy/n, {color:C.rise, width:2.4});
      S.dot(x, y, C.tan);
      txt('t = ' + dec(t, 2) + ' rad', X(t), Y(1) + 14, 'center', C.sec);
      if (Math.abs(dy) < 0.01) txt('pendiente 0', X(x), Y(y) - 16, 'center', C.rise);
      txt('cóncava hacia abajo', X(PI), Y(2.9), 'center', C.alt);
      S.lab('F', X(1.6), Y(-0.85), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var t = v.t, s = v.q == null ? null : v.q*RUN, m = Math.sin(t)/(1 - Math.cos(t));
      if (s != null && s < 2) return 'Circunferencia azul: una rueda de radio 1 que gira sin resbalar. Punto rojo: un punto de su borde. Curva verde: la cicloide que dibuja';
      if (Math.abs(Math.sin(t)) < 0.01) return 'En t = π el punto está en lo más alto: la pendiente es 0 y la segunda derivada vale −1/4';
      return ['En t = ' + dec(t, 2) + ' la pendiente es ', '\\dfrac{dy}{dx}=' + num(m, 2), 'dy/dx = ' + dec(m, 2), '. Mientras x crece, la pendiente decrece: la curva es cóncava hacia abajo'];
    },
    readout:function(v){ var t = v.t, d = 1 - Math.cos(t); return [['', '\\dfrac{dy}{dx}=\\dfrac{\\operatorname{sen}t}{1-\\cos t}=' + num(Math.sin(t)/d, 2)], ['d', '\\dfrac{d}{dt}\\left(\\dfrac{dy}{dx}\\right)=-\\dfrac{1}{1-\\cos t}=' + num(-1/d, 2)], ['', '\\dfrac{d^{2}y}{dx^{2}}=-\\dfrac{1}{(1-\\cos t)^{2}}=' + num(-1/(d*d), 2)]]; }
  };
})());
