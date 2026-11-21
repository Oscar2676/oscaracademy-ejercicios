OA.scene('anti-potencia', (function(){
  var RUN = 22, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function ns(s){ var k; if (s < 2) return 0; s -= 2; for (k = 0; k < 4; k++){ if (s < 3) return k + OA.smooth(s/3); s -= 3; if (s < 1.3) return k + 1; s -= 1.3; } return 4; }
  return {
    world:{x0:-0.22, x1:1.3, y0:-0.3, y1:1.32}, aspect:1.62/1.52,
    aria:'En el cuadrado de lado 1, la curva azul y igual a x elevado a n, desde el punto (0, 0) hasta el punto (1, 1). El área verde bajo la curva vale 1 partido por n más 1. Con n igual a 0 llena el cuadrado; con n igual a 1, la mitad; con n igual a 2, un tercio; con n igual a 3, un cuarto; con n igual a 4, un quinto.',
    labels:[['F', '\\displaystyle\\int x^{n}\\,dx=\\dfrac{x^{n+1}}{n+1}+C', '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', 'diff']],
    sliders:[{id:'n', tex:'n', min:0, max:4, step:0.01, value:0}],
    legend:'<span><i class="sw sec"></i> \\(y=x^{n}\\)</span><span><i class="sw alt"></i> área entre \\(0\\) y \\(1\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.n = ns(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, n = v.n, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, pts = [[0, 0]], ent = Math.abs(n - Math.round(n)) < 0.004;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[0.5, 1], gy:[0.5, 1]});
      for (i = 0; i <= 80; i++) pts.push([i/80, Math.pow(i/80, n)]); pts.push([1, 0]);
      S.poly(pts, {fill:C.alt, alpha:0.45});
      S.line(0, 1, 1, 1, {color:C.muted, width:1.3, dash:[4, 4]}); S.line(1, 0, 1, 1, {color:C.muted, width:1.3, dash:[4, 4]});
      c.strokeStyle = C.sec; c.lineWidth = 2.8; c.setLineDash([]); c.beginPath(); for (i = 0; i <= 100; i++){ var u = 1.12*i/100, y = Math.pow(u, n); if (y > 1.3) break; if (i) c.lineTo(X(u), Y(y)); else c.moveTo(X(u), Y(y)); } c.stroke();
      S.dot(1, 1, C.sec);
      txt('n = ' + (ent ? Math.round(n) : dec(n, 2)), X(0.06), Y(1.2), 'left', C.sec);
      txt('área = 1/(n + 1) = ' + (ent ? '1/' + (Math.round(n) + 1) : dec(1/(n + 1), 3)), X(0.06), Y(1.08), 'left', C.alt);
      S.lab('F', X(0.05), Y(-0.2), 0, 0, v.q != null && s >= 19.5);
    },
    caption:function(v){
      var n = v.n, s = v.q == null ? null : v.q*RUN, ent = Math.abs(n - Math.round(n)) < 0.004, k = Math.round(n);
      if (s != null && s < 2) return 'Con n = 0 la curva es y = 1: el área bajo ella, entre 0 y 1, es todo el cuadrado. Vale 1';
      if (ent) return 'Con n = ' + k + ': el área bajo y = x' + ['⁰', '', '²', '³', '⁴'][k] + ', entre 0 y 1, es 1/' + (k + 1) + ' del cuadrado';
      return 'Con n = ' + dec(n, 2) + ' el área vale cerca de ' + dec(1/(n + 1), 3) + '. Mientras n crece, la curva se pega al eje y el área se achica';
    },
    readout:function(v){ var n = v.n; return [['', '\\displaystyle\\int_{0}^{1}x^{n}\\,dx=\\left[\\dfrac{x^{n+1}}{n+1}\\right]_{0}^{1}=\\dfrac{1^{n+1}}{n+1}-\\dfrac{0^{n+1}}{n+1}=\\dfrac{1}{n+1}'], ['d', 'n=' + num(n, 2) + ':\\quad\\dfrac{1}{' + num(n, 2) + '+1}\\approx ' + num(1/(n + 1), 3)]]; }
  };
})());
