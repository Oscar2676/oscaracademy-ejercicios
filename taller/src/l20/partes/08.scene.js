OA.scene('lh-aplic', (function(){
  var RUN = 22, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function p(x){ return x*Math.log(x); } function q(x){ return Math.exp(x*Math.log(x)); }
  function xs(s){ return s < 3 ? 1.4 : 1.4*Math.pow(0.02/1.4, OA.smooth(cl((s - 3)/15))); }
  return {
    world:{x0:-0.22, x1:1.62, y0:-0.62, y1:1.78}, aspect:1,
    aria:'Dos curvas para x positivo: la azul, y igual a x por logaritmo natural de x, y la verde, y igual a x elevado a x. Un valor de x se acerca a 0 por la derecha. La curva azul se acerca al punto (0, 0) y la verde al punto (0, 1), marcados con puntos huecos.',
    labels:[['F', '\\displaystyle\\lim_{x\\to 0^{+}}x\\ln x=0\\qquad\\lim_{x\\to 0^{+}}x^{x}=e^{0}=1', 'lím x·ln x = 0; lím xˣ = e⁰ = 1', 'diff']],
    sliders:[{id:'x', tex:'x', min:0.02, max:1.4, step:0.005, value:1.4}],
    legend:'<span><i class="sw sec"></i> \\(y=x\\cdot\\ln x\\)</span><span><i class="sw alt"></i> \\(y=x^{x}\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(pp, v){ v.t = pp; v.x = xs(pp*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y;
      function txt(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[0.5, 1, 1.5], gy:[-0.5, 0.5, 1, 1.5]});
      S.curve(p, 0.0005, 1.6, {color:C.sec, width:2.6}); S.curve(q, 0.0005, 1.52, {color:C.alt, width:2.6});
      S.line(x, p(x), x, q(x), {color:C.muted, width:1, dash:[3, 3]});
      S.dot(x, p(x), C.sec); S.dot(x, q(x), C.alt);
      S.ring(0, 0, C.sec); S.ring(0, 1, C.alt);
      txt('x·ln x = ' + dec(p(x), 2), X(x) + 12, Y(p(x)) + 14, 'left', C.sec);
      txt('xˣ = ' + dec(q(x), 2), X(x) + 12, Y(q(x)) - 14, 'left', C.alt);
      txt('(0, 1)', X(0) - 8, Y(1), 'right', C.alt); txt('(0, 0)', X(0) - 8, Y(0) + 14, 'right', C.sec);
      txt('y = xˣ', X(1.5), Y(1.72), 'right', C.alt); txt('y = x · ln x', X(1.6), Y(0.45), 'right', C.sec);
      S.lab('F', X(0.3), Y(-0.48), 0, 0, v.t != null && s >= 19);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN;
      if (s != null && s < 3) return 'Curva azul: y = x · ln x. Curva verde: y = x elevado a x. El valor de x se acercará a 0 por la derecha';
      return 'Con x = ' + dec(x, 2) + ': x · ln x = ' + dec(p(x), 2) + ' y x elevado a x = ' + dec(q(x), 2) + '. Mientras x se acerca a 0, se acercan a 0 y a 1';
    },
    readout:function(v){ return [['', '\\displaystyle\\lim_{x\\to 0^{+}}x\\ln x=\\lim_{x\\to 0^{+}}\\dfrac{\\ln x}{1/x}=\\lim_{x\\to 0^{+}}\\dfrac{1/x}{-1/x^{2}}=\\lim_{x\\to 0^{+}}(-x)=0'], ['d', '\\displaystyle\\lim_{x\\to 0^{+}}x^{x}=\\lim_{x\\to 0^{+}}e^{\\,x\\ln x}=e^{0}=1']]; }
  };
})());
