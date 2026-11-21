OA.scene('int-division', (function(){
  var RUN = 22, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function f(x){ return 1/((x + 2)*(x + 2) + 9); } function F(x){ return Math.atan((x + 2)/3)/3; }
  function xs(s){ return s < 2 ? -2 : s < 17 ? -2 + 14*OA.smooth((s - 2)/15) : s < 19 ? 12 : 12 - 11*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-9.5, x1:12.8, y0:-0.035, y1:0.142}, aspect:0.62,
    _chk:[{f:F, df:f, at:[-5, -2, 0, 1, 6]}],
    aria:'Una curva azul con forma de campana, centrada en x igual a menos 2, donde alcanza su altura máxima, un noveno. El área verde bajo la curva se pinta desde x igual a menos 2 hacia la derecha. Crece cada vez más lento y no pasa de pi sextos.',
    labels:[['F', '\\displaystyle\\int\\dfrac{dx}{x^{2}+4x+13}=\\dfrac{1}{3}\\arctan\\left(\\dfrac{x+2}{3}\\right)+C', '∫ dx/(x²+4x+13) = (1/3) arctan((x+2)/3) + C', 'diff']],
    sliders:[{id:'x', tex:'x', min:-2, max:12, step:0.02, value:-2}],
    legend:'<span><i class="sw sec"></i> \\(y=\\dfrac{1}{(x+2)^{2}+9}\\)</span><span><i class="sw alt"></i> área desde \\(-2\\) hasta \\(x\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, a, pts = [[-2, 0]];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-9.3, 0, 12.6, 0, {color:C.ink, width:1.4}); S.line(0, 0, 0, 0.135, {color:C.ink, width:1.4});
      [-8, -6, -4, -2, 2, 4, 6, 8, 10, 12].forEach(function(q){ S.line(q, -0.002, q, 0.002, {color:C.ink, width:1}); txt(('' + q).replace('-', '−'), X(q), Y(0) + 12, 'center', C.muted); });
      S.line(-0.15, 1/9, 0.15, 1/9, {color:C.ink, width:1}); txt('1/9', X(0) + 8, Y(1/9) - 2, 'left', C.muted);
      for (i = 0; i <= 80; i++){ a = -2 + (x + 2)*i/80; pts.push([a, f(a)]); } pts.push([x, 0]);
      if (x > -1.98) S.poly(pts, {fill:C.alt, alpha:0.45});
      S.line(-2, 0, -2, 0.135, {color:C.muted, width:1.3, dash:[4, 4]});
      S.curve(f, -9.3, 12.6, {color:C.sec, width:2.6});
      S.line(x, 0, x, f(x), {color:C.ink, width:2}); S.dot(x, 0, C.ink); S.dot(-2, 1/9, C.sec);
      txt('centro: x = −2', X(-2) - 8, Y(0.128), 'right', C.muted);
      txt('x = ' + dec(x, 2), X(x), Y(0) + 30, 'center', C.ink);
      if (x > -0.6) txt('área ≈ ' + dec(F(x), 3), X(Math.min(x, 2.5)) - 4, Y(0.03), 'right', C.alt);
      txt('el área nunca alcanza π/6 ≈ 0,524', X(12.6), Y(0.095), 'right', C.alt);
      S.lab('F', X(1.2), Y(0.075), 0, 0, v.q != null && s >= 20.5);
    },
    caption:function(v){
      var x = v.x, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva azul: la campana, centrada en x = −2. Ahí el denominador (x + 2)² + 9 es mínimo y la curva es máxima: 1/9';
      return 'Con x = ' + dec(x, 2) + ', el área desde −2 vale cerca de ' + dec(F(x), 3) + '. Sigue creciendo, cada vez más lento, sin llegar a π/6';
    },
    readout:function(v){ var x = v.x; return [['', 'x^{2}+4x+13=(x+2)^{2}+9'], ['d', '\\displaystyle\\int_{-2}^{x}\\dfrac{dt}{(t+2)^{2}+9}=\\dfrac{1}{3}\\arctan\\left(\\dfrac{x+2}{3}\\right)'], ['', 'x=' + num(x, 2) + ':\\quad\\dfrac{1}{3}\\arctan\\left(' + num((x + 2)/3, 2) + '\\right)\\approx ' + num(F(x), 3)]]; }
  };
})());
