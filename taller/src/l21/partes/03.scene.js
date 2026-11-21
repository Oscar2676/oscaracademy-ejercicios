OA.scene('rie-notacion', (function(){
  var RUN = 22, num = OA.num, NS = [3, 4, 6, 8, 12, 16, 24, 36, 60];
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function suma(n){ return 9*(n + 1)*(2*n + 1)/(2*n*n); }
  return {
    world:{x0:-0.5, x1:3.5, y0:-1.4, y1:10}, aspect:11.4/4*0.3,
    aria:'Bajo la parábola azul f de x igual a x al cuadrado, entre 0 y 3, rectángulos verdes de extremo derecho. Su número crece de 3 a 60. La parte que sobra sobre la curva, en naranja, se achica y la suma de las áreas se acerca a 9.',
    labels:[['F', '\\displaystyle\\int_{0}^{3}x^{2}\\,dx=\\lim_{n\\to\\infty}\\sum_{i=1}^{n}\\dfrac{27\\,i^{2}}{n^{3}}=9', '∫ de 0 a 3 de x² dx = 9', 'diff']],
    sliders:[{id:'n', tex:'n', min:3, max:60, step:1, value:3}],
    legend:'<span><i class="sw sec"></i> \\(f(x)=x^{2}\\)</span><span><i class="sw alt"></i> rectángulos</span><span><i class="sw rise"></i> lo que sobra</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ var s = p*RUN; v.q = p; v.n = NS[Math.min(NS.length - 1, Math.max(0, Math.floor((s - 2)/2)))]; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, n = Math.round(v.n), dx = 3/n, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, x1, pts;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 3], gy:[2, 4, 6, 8]});
      for (i = 1; i <= n; i++){
        x1 = i*dx;
        S.poly([[x1 - dx, 0], [x1 - dx, x1*x1], [x1, x1*x1], [x1, 0]], {fill:C.rise, alpha:0.55});
      }
      /* área bajo la curva, en verde, encima: lo naranja que queda visible es lo que sobra */
      pts = [[0, 0]]; for (i = 0; i <= 60; i++) pts.push([3*i/60, 9*i*i/3600]); pts.push([3, 0]);
      S.poly(pts, {fill:'#ffffff', alpha:1}); S.poly(pts, {fill:C.alt, alpha:0.5});
      for (i = 1; i <= n; i++){ x1 = i*dx; c.strokeStyle = C.alt; c.lineWidth = n > 30 ? 0.6 : 1.2; c.strokeRect(X(x1 - dx), Y(x1*x1), X(x1) - X(x1 - dx), Y(0) - Y(x1*x1)); }
      S.curve(function(x){ return x*x; }, 0, 3.12, {color:C.sec, width:2.6});
      txt('n = ' + n, X(0.2), Y(8.8), 'left', C.ink);
      txt('Δx = 3/' + n + ' = ' + dec(dx, 2), X(0.2), Y(7.6), 'left', C.alt);
      txt('suma ≈ ' + dec(suma(n), 3), X(0.2), Y(6.4), 'left', C.rise);
      S.lab('F', X(-0.3), Y(-1), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var n = Math.round(v.n), s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva azul: f(x) = x². Tres rectángulos de extremo derecho, de ancho 1 y alturas 1, 4 y 9: su suma es 14';
      return 'Con n = ' + n + ' rectángulos la suma vale cerca de ' + dec(suma(n), 3) + '. Mientras n crece, lo que sobra se achica y la suma se acerca a 9';
    },
    readout:function(v){ var n = Math.round(v.n); return [['', '\\displaystyle\\sum_{i=1}^{n}\\left(\\dfrac{3i}{n}\\right)^{2}\\cdot\\dfrac{3}{n}=\\dfrac{9\\,(n+1)(2n+1)}{2n^{2}}'], ['d', 'n=' + n + ':\\quad\\dfrac{9\\cdot ' + (n + 1) + '\\cdot ' + (2*n + 1) + '}{2\\cdot ' + n + '^{2}}\\approx ' + num(suma(n), 3)]]; }
  };
})());
