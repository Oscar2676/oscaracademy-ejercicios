OA.scene('apl-valor-promedio', (function(){
  var RUN = 24, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function f(x){ return x*x; }
  function falta(h){ return 2/3*Math.pow(h, 1.5); }            /* bajo la recta y sobre la curva, de 0 a √h */
  function sobra(h){ return 9 - 3*h + 2/3*Math.pow(h, 1.5); }   /* sobre la recta y bajo la curva, de √h a 3 */
  function hs(s){ return s < 2 ? 0.4 : s < 9 ? 0.4 + 5.1*OA.smooth((s - 2)/7) : s < 11 ? 5.5 : s < 18 ? 5.5 - 2.5*OA.smooth((s - 11)/7) : 3; }
  return {
    world:{x0:-0.7, x1:4.1, y0:-1.3, y1:10}, aspect:0.8,
    _chk:[{f:function(h){ return sobra(h) - falta(h); }, df:function(h){ return -3; }, at:[1, 2, 3, 5]}, {f:falta, df:function(h){ return Math.sqrt(h); }, at:[1, 2, 3, 5]}],
    aria:'Bajo la parábola azul f de x igual a x al cuadrado, entre 0 y 3, el área vale 9. Una recta horizontal naranja a la altura h forma un rectángulo de base 3. La parte de la curva que queda sobre la recta se pinta burdeo, es lo que sobra; el hueco bajo la recta y sobre la curva se pinta verde, es lo que falta. Cuando h vale 3, lo que sobra y lo que falta son iguales: el rectángulo tiene la misma área que la región bajo la curva.',
    labels:[['F', 'f_{\\text{prom}}=\\dfrac{1}{3-0}\\displaystyle\\int_{0}^{3}x^{2}\\,dx=\\dfrac{9}{3}=3', 'f prom = (1/3)·∫ de 0 a 3 de x² dx = 9/3 = 3', 'diff']],
    sliders:[{id:'h', tex:'h', min:0, max:9, step:0.01, value:0.4}],
    legend:'<span><i class="sw sec"></i> \\(f(x)=x^{2}\\)</span><span><i class="sw rise"></i> altura \\(h\\) del rectángulo</span><span><i class="sw tan"></i> sobra</span><span><i class="sw alt"></i> falta</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.h = hs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, h = v.h, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, u, r = Math.sqrt(h), pa = [[0, h]], pb = [], pc = [[0, 0]];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 3], gy:[3, 6, 9]});
      /* área común (bajo la curva y bajo la recta), tenue */
      for (i = 0; i <= 40; i++){ u = r*i/40; pc.push([u, f(u)]); } pc.push([3, h]); pc.push([3, 0]); S.poly(pc, {fill:C.sec, alpha:0.14});
      /* falta: entre la curva y la recta, de 0 a √h */
      for (i = 0; i <= 40; i++){ u = r*(1 - i/40); pa.push([u, f(u)]); } if (h > 0.02) S.poly(pa, {fill:C.alt, alpha:0.5});
      /* sobra: entre la recta y la curva, de √h a 3 */
      if (h < 8.98){ pb.push([r, h]); for (i = 0; i <= 40; i++){ u = r + (3 - r)*i/40; pb.push([u, f(u)]); } pb.push([3, h]); S.poly(pb, {fill:C.tan, alpha:0.45}); }
      S.curve(f, 0, 3.12, {color:C.sec, width:2.6});
      S.line(3, 0, 3, 9, {color:C.ink, width:1.5}); S.line(0, h, 3, h, {color:C.rise, width:3});
      S.line(r, 0, r, h, {color:C.muted, width:1, dash:[3, 4]}); c.setLineDash([]); S.dot(r, h, C.ink);
      txt('f(x) = x²', X(2.45), Y(7.6), 'right', C.sec); txt('h = ' + dec(h, 2), X(3) + 10, Y(h), 'left', C.rise);
      txt('c = √h ≈ ' + dec(r, 2), X(r) + 8, Y(0) - 13, 'left', C.ink);
      if (h > 1.2) txt('falta ≈ ' + dec(falta(h), 2), X(0.08), Y(h) + 13, 'left', C.alt);
      if (h < 7.6) txt('sobra ≈ ' + dec(sobra(h), 2), X(3) - 8, Y(h) - 13, 'right', C.tan);
      S.lab('F', X(0.12), Y(8.6), 0, 0, Math.abs(h - 3) < 0.006);
    },
    caption:function(v){
      var h = v.h, s = v.q == null ? null : v.q*RUN, d = sobra(h) - falta(h);
      if (s != null && s < 2) return 'Bajo la parábola, entre 0 y 3, el área vale 9. La recta naranja es el techo de un rectángulo de base 3. ¿A qué altura h el rectángulo tiene esa misma área?';
      if (Math.abs(h - 3) < 0.006) return 'Con h = 3, lo que sobra y lo que falta son iguales. El rectángulo mide 3 · 3 = 9, lo mismo que el área bajo la curva. El valor promedio de f es 3, y f lo toma en c = √3';
      return 'Con h = ' + dec(h, 2) + ' el rectángulo mide ' + dec(3*h, 2) + '. ' + (d > 0 ? 'Sobra más de lo que falta: la recta está baja' : 'Falta más de lo que sobra: la recta está alta');
    },
    readout:function(v){ var h = v.h; return [['', '\\text{rectángulo}=3\\,h\\approx ' + num(3*h, 2) + ',\\qquad\\displaystyle\\int_{0}^{3}x^{2}\\,dx=9'], ['d', '\\text{sobra}-\\text{falta}=\\displaystyle\\int_{0}^{3}\\left(x^{2}-h\\right)dx=9-3h\\approx ' + num(9 - 3*h, 2)], ['', '9-3h=0\\ \\Longleftrightarrow\\ h=\\dfrac{9}{3}=3']]; }
  };
})());
