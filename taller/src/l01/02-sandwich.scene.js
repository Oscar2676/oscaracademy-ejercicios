OA.scene('sandwich', (function(){
  var num = OA.num;
  function g(t){ return 2 - Math.abs(t - 2); }
  function h(t){ return 2 + Math.abs(t - 2); }
  function f(t){ return t === 2 ? NaN : 2 + (t - 2)*Math.sin(5/(t - 2)); }
  function fix(x){ return Math.abs(x - 2) < 0.004 ? 2 + (x >= 2 ? 0.004 : -0.004) : x; }
  return {
    world:{x0:-1.8, x1:4.5, y0:-1.9, y1:4.8}, aspect:1,
    aria:'Las curvas g, f y h se van trazando al mismo tiempo desde la izquierda y desde la derecha hacia x=2. En cada lado una recta vertical marca los valores g(x), f(x) y h(x); la separación h(x)−g(x) se reduce a cero cuando ambos lados llegan a 2.',
    labels:[
      ['h','h(x)','h(x)','c-sec'], ['f','f(x)','f(x)','pt'], ['g','g(x)','g(x)','c-alt'],
      ['h2','h(x)','h(x)','c-sec'], ['f2','f(x)','f(x)','pt'], ['g2','g(x)','g(x)','c-alt'],
      ['xl','x\\to 2^-','x→2⁻',''], ['xr','x\\to 2^+','x→2⁺',''], ['a','2','2','c-tan'], ['L','L=2','L = 2','c-tan'],
      ['dl','|x-2|','|x−2|','diff'], ['dr','|x-2|','|x−2|','diff'], ['gap','h(x)-g(x)','h(x)−g(x)','diff']
    ],
    sliders:[{id:'d', tex:'|x-2|', min:0.004, max:1.7, step:0.002, value:1.7}],
    legend:'<span><i class="sw sec"></i> \\(h(x)\\)</span><span><i class="sw"></i> \\(f(x)\\)</span><span><i class="sw alt"></i> \\(g(x)\\)</span><span><i class="sw rise"></i> separación \\(h(x)-g(x)\\)</span>',
    anim:{run:12000, hold:2600, still:0.35, apply:function(p, v){ v.d = 1.7 - (1.7 - 0.004)*OA.ease(p); }},
    draw:function(S, v){
      var d = Math.max(v.d, 0.004), xl = 2 - d, xr = 2 + d, hx = h(xr), gx = g(xr), C = S.C;
      S.axes({gx:[1,2,3,4], gy:[1,2,3,4]});
      S.line(0,2,S.W.x1,2,{color:C.tan, width:1.5, dash:[2,5]});
      [[0.3, xl], [xr, 3.7]].forEach(function(r){
        S.curve(h, r[0], r[1], {color:C.sec, width:2.5, n:8});
        S.curve(g, r[0], r[1], {color:C.alt, width:2.5, n:8});
        S.curve(f, r[0], r[1], {color:C.ink, width:1.6, n:2600});
      });
      var gd = {color:C.muted, width:1, dash:[3,4]};
      [xl, xr].forEach(function(x){ S.line(x,0,x,hx,gd); S.line(x,gx,x,hx,{color:C.rise, width:2}); });
      S.line(xr,hx,0,hx,gd); S.line(xr,gx,0,gx,gd);
      S.line(xl,0,xr,0,{color:C.rise, width:5}); S.line(0,gx,0,hx,{color:C.rise, width:5});
      S.bracketX(xl, 2, 36); S.bracketX(2, xr, 36);
      [xl, xr].forEach(function(x){ S.dot(x, hx, C.sec); S.dot(x, gx, C.alt); S.dot(x, f(x), C.ink); });
      S.ring(2, 2, C.tan);
      var ax0 = S.Y(0), ox = S.X(0), pl = S.X(xl), pr = S.X(xr), wide = pr - pl > 100, gap = Math.abs(S.Y(gx) - S.Y(hx));
      S.lab('a', S.X(2), ax0 + 9, -50, 0, true);
      S.lab('xl', pl, ax0 + 9, -50, 0, pr - pl > 110); S.lab('xr', pr, ax0 + 9, -50, 0, pr - pl > 110);
      S.lab('dl', (pl + S.X(2))/2, ax0 + 41, -50, 0, wide); S.lab('dr', (pr + S.X(2))/2, ax0 + 41, -50, 0, wide);
      S.lab('L', S.w - 4, S.Y(2) - 5, -100, -100, true);
      S.lab('gap', ox - 9, S.Y(2), -100, -50, true);
      S.lab('h', wide ? pr - 8 : pr + 10, S.Y(hx) - (wide ? 4 : 24), wide ? -100 : 0, -100, true);
      S.lab('g', wide ? pr - 8 : pr + 10, S.Y(gx) + (wide ? 4 : 24), wide ? -100 : 0, 0, true);
      S.lab('f', pr - 9, S.Y(f(xr)), -100, -50, wide && gap > 60);
      S.lab('h2', pl + 8, S.Y(hx) - 4, 0, -100, wide); S.lab('g2', pl + 8, S.Y(gx) + 4, 0, 0, wide);
      S.lab('f2', pl + 9, S.Y(f(xl)), 0, -50, wide && gap > 60);
    },
    caption:function(v){
      if (v.d < 0.02) return 'Por la izquierda y por la derecha, las dos cotas se juntan en 2 y obligan a la función a llegar a 2';
      return 'Las curvas avanzan hacia 2 por la izquierda y por la derecha; la función queda atrapada entre las dos cotas';
    },
    readout:function(v){
      var d = Math.max(v.d, 0.004), xl = 2 - d, xr = 2 + d, k = d < 0.1 ? 3 : 2;
      return [
        ['', '\\text{izquierda: }x=' + num(xl,k) + '\\qquad ' + num(g(xl),k) + '\\le ' + num(f(xl),k) + '\\le ' + num(h(xl),k)],
        ['', '\\text{derecha: }x=' + num(xr,k) + '\\qquad ' + num(g(xr),k) + '\\le ' + num(f(xr),k) + '\\le ' + num(h(xr),k)],
        ['d', 'h(x)-g(x)=' + num(h(xr),k) + '-' + num(g(xr),k) + '=' + num(h(xr)-g(xr),k)]
      ];
    }
  };
})());
