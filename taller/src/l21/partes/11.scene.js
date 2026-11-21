OA.scene('int-impropias', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function bs(s){ return s < 2 ? 1 : s < 20 ? Math.pow(12, OA.smooth((s - 2)/18)) : 12; }
  return {
    world:{x0:-0.8, x1:12.6, y0:-0.2, y1:1.28}, aspect:0.62,
    _chk:[{f:function(x){ return 1 - 1/x; }, df:function(x){ return 1/(x*x); }, at:[1.5, 3, 8]}, {f:Math.log, df:function(x){ return 1/x; }, at:[1.5, 3, 8]}],
    aria:'Dos curvas que bajan hacia el eje desde el punto (1, 1): la verde, y igual a 1 partido por x al cuadrado, y la naranja, y igual a 1 partido por x, que queda por encima. Un tope b avanza hacia la derecha. El área verde, de 1 a b, se acerca a 1 sin pasarlo. El área naranja, logaritmo natural de b, sigue creciendo sin tope.',
    labels:[['F', '\\displaystyle\\int_{1}^{\\infty}\\dfrac{dx}{x^{2}}=1\\qquad\\int_{1}^{\\infty}\\dfrac{dx}{x}\\ \\text{diverge}', '∫ de 1 a ∞ de dx/x² = 1; ∫ de 1 a ∞ de dx/x diverge', 'diff']],
    sliders:[{id:'b', tex:'b', min:1, max:12, step:0.01, value:1}],
    legend:'<span><i class="sw alt"></i> \\(y=\\dfrac{1}{x^{2}}\\) y su área</span><span><i class="sw rise"></i> \\(y=\\dfrac{1}{x}\\) y su área</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.b = bs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, b = v.b, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, a, pa = [[1, 0]], pb = [[1, 0]];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 4, 6, 8, 10, 12], gy:[0.5, 1]});
      for (i = 0; i <= 90; i++){ a = 1 + (b - 1)*i/90; pa.push([a, 1/a]); pb.push([a, 1/(a*a)]); } pa.push([b, 0]); pb.push([b, 0]);
      if (b > 1.01){ S.poly(pa, {fill:C.rise, alpha:0.4}); S.poly(pb, {fill:'#ffffff', alpha:1}); S.poly(pb, {fill:C.alt, alpha:0.55}); }
      S.curve(function(x){ return 1/x; }, 0.8, 12.5, {color:C.rise, width:2.6}); S.curve(function(x){ return 1/(x*x); }, 0.89, 12.5, {color:C.alt, width:2.6});
      S.line(1, 0, 1, 1, {color:C.ink, width:1.5}); S.line(b, 0, b, 1/b, {color:C.ink, width:2.2}); S.dot(b, 0, C.ink);
      txt('b = ' + dec(b, 2), X(b), Y(0) + 28, 'center', C.ink);
      txt('y = 1/x', X(7), Y(0.25), 'left', C.rise); txt('y = 1/x²', X(4.2), Y(0.13), 'left', C.alt);
      txt('área verde = 1 − 1/b ≈ ' + dec(1 - 1/b, 3) + '   (tope: 1)', X(3.2), Y(1.15), 'left', C.alt);
      txt('área naranja = ln b ≈ ' + dec(Math.log(b), 3) + '   (sin tope)', X(3.2), Y(0.98), 'left', C.rise);
      S.lab('F', X(1.8), Y(0.72), 0, 0, v.q != null && s >= 21);
    },
    caption:function(v){
      var b = v.b, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva verde: y = 1/x². Curva naranja: y = 1/x. Las dos parten del punto (1, 1) y bajan hacia el eje. El tope b avanzará hacia la derecha';
      return 'Con b = ' + dec(b, 2) + ': el área verde vale cerca de ' + dec(1 - 1/b, 3) + ' y se acerca a 1. La naranja vale cerca de ' + dec(Math.log(b), 3) + ' y sigue creciendo';
    },
    readout:function(v){ var b = v.b; return [['', '\\displaystyle\\int_{1}^{b}\\dfrac{dx}{x^{2}}=1-\\dfrac{1}{b}\\approx ' + num(1 - 1/b, 3) + '\\ \\longrightarrow\\ 1'], ['d', '\\displaystyle\\int_{1}^{b}\\dfrac{dx}{x}=\\ln b\\approx ' + num(Math.log(b), 3) + '\\ \\longrightarrow\\ +\\infty']]; }
  };
})());
