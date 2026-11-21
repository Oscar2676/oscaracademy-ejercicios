OA.scene('lh-regla', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function f(x){ return x*x - 1; } function g(x){ return Math.log(x); }
  function xs(s){ return s < 3 ? 1.8 : 1.8 - 0.75*OA.smooth(cl((s - 3)/15)); }
  return {
    world:{x0:0.35, x1:2.15, y0:-1.15, y1:2.65}, aspect:0.95,
    _chk:[{f:f, df:function(x){ return 2*x; }, at:[1]}, {f:g, df:function(x){ return 1/x; }, at:[1]}],
    aria:'Dos curvas que pasan por el punto (1, 0): la verde, f de x igual a x al cuadrado menos 1, y la azul, g de x igual a logaritmo natural de x. Sus tangentes en ese punto tienen pendientes 2 y 1. Un valor de x se acerca a 1 y el cociente de las alturas f sobre g se acerca a 2, el cociente de las pendientes.',
    labels:[['F', '\\displaystyle\\lim_{x\\to 1}\\dfrac{f(x)}{g(x)}=\\dfrac{f\'(1)}{g\'(1)}=\\dfrac{2}{1}=2', 'lím f/g = f′(1)/g′(1) = 2/1 = 2', 'diff']],
    sliders:[{id:'x', tex:'x', min:1.05, max:1.8, step:0.005, value:1.8}],
    legend:'<span><i class="sw alt"></i> \\(f(x)=x^{2}-1\\)</span><span><i class="sw sec"></i> \\(g(x)=\\ln x\\)</span><span><i class="sw rise"></i> tangentes en \\(x=1\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y;
      function txt(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[0.5, 1, 1.5, 2], gy:[-1, 1, 2]});
      /* tangentes en x = 1 */
      S.line(0.45, 2*(0.45 - 1), 2.1, 2*(2.1 - 1), {color:C.rise, width:1.6, dash:[5, 4]});
      S.line(0.4, 0.4 - 1, 2.12, 2.12 - 1, {color:C.rise, width:1.6, dash:[5, 4]});
      S.curve(f, 0.38, 1.9, {color:C.alt, width:2.6}); S.curve(g, 0.38, 2.12, {color:C.sec, width:2.6});
      /* alturas en x */
      S.line(x - 0.012, 0, x - 0.012, f(x), {color:C.alt, width:4}); S.line(x + 0.012, 0, x + 0.012, g(x), {color:C.sec, width:4});
      S.dot(x - 0.012, f(x), C.alt); S.dot(x + 0.012, g(x), C.sec); S.dot(1, 0, C.ink);
      txt('f(x) = ' + dec(f(x), 2), X(x) - 10, Y(f(x)) - 4, 'right', C.alt);
      txt('g(x) = ' + dec(g(x), 2), X(x) + 12, Y(g(x)) + 14, 'left', C.sec);
      txt('pendiente 2', X(2.02), Y(2*(2.02 - 1)) + 20, 'right', C.rise);
      txt('pendiente 1', X(2.1), Y(1.1) + 18, 'right', C.rise);
      txt('(1, 0)', X(1) - 8, Y(0) + 16, 'right', C.ink);
      txt('f(x) = x² − 1', X(0.45), Y(2.35), 'left', C.alt); txt('g(x) = ln x', X(0.45), Y(1.95), 'left', C.sec);
      S.lab('F', X(0.42), Y(1.45), 0, 0, v.t != null && s >= 19.5);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN, q = f(x)/g(x);
      if (s != null && s < 3) return 'Curva verde: f. Curva azul: g. Las dos valen 0 en x = 1. Punteadas: sus tangentes en ese punto, de pendientes 2 y 1';
      return ['Con x = ' + dec(x, 2) + ', el cociente de las alturas es ', '\\dfrac{f(x)}{g(x)}\\approx ' + num(q, 2), 'f(x)/g(x) ≈ ' + dec(q, 2), '. Mientras x se acerca a 1, se acerca a 2'];
    },
    readout:function(v){ var x = v.x; return [['', '\\dfrac{f(x)}{g(x)}=\\dfrac{x^{2}-1}{\\ln x}'], ['d', 'x=' + num(x, 2) + ':\\quad\\dfrac{' + num(f(x), 3) + '}{' + num(g(x), 3) + '}\\approx ' + num(f(x)/g(x), 2)], ['', '\\displaystyle\\lim_{x\\to 1}\\dfrac{x^{2}-1}{\\ln x}=\\lim_{x\\to 1}\\dfrac{2x}{1/x}=2']]; }
  };
})());
