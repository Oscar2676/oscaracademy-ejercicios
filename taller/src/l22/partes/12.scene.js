OA.scene('apl-area-x', (function(){
  var RUN = 22, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function f(x){ return x + 4; } function g(x){ return x*x - 2*x; }
  function A(x){ return 4*x + 1.5*x*x - x*x*x/3 + 13/6; }
  function xs(s){ return s < 2 ? -1 : s < 19 ? -1 + 5*OA.smooth((s - 2)/17) : 4; }
  return {
    world:{x0:-2.3, x1:5.6, y0:-2.6, y1:9.6}, aspect:0.86,
    _chk:[{f:A, df:function(x){ return f(x) - g(x); }, at:[-0.5, 1, 2.5, 3.5]}],
    aria:'La recta naranja f de x igual a x más 4 y la parábola azul g de x igual a x al cuadrado menos 2x se cruzan en los puntos (−1, 3) y (4, 8). Entre 0 y 2 la parábola queda bajo el eje x. Una tira vertical burdeo, que va de la parábola a la recta, avanza de x igual a −1 a x igual a 4 y deja pintada de verde el área recorrida, que al final vale 125 sextos.',
    labels:[['F', 'A=\\displaystyle\\int_{-1}^{4}\\Big[(x+4)-\\left(x^{2}-2x\\right)\\Big]dx=\\dfrac{125}{6}', 'A = ∫ de −1 a 4 de [(x + 4) − (x² − 2x)] dx = 125/6', 'diff']],
    sliders:[{id:'x', tex:'x', min:-1, max:4, step:0.01, value:-1}],
    legend:'<span><i class="sw rise"></i> \\(f(x)=x+4\\), arriba</span><span><i class="sw sec"></i> \\(g(x)=x^{2}-2x\\), abajo</span><span><i class="sw tan"></i> tira</span><span><i class="sw alt"></i> área acumulada</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, u, pts = [];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.88)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[-1, 1, 2, 3, 4], gy:[2, 4, 6, 8]});
      if (x > -0.995){ for (i = 0; i <= 60; i++){ u = -1 + (x + 1)*i/60; pts.push([u, g(u)]); } pts.push([x, f(x)]); pts.push([-1, 3]); S.poly(pts, {fill:C.alt, alpha:0.45}); }
      S.curve(g, -1.75, 4.35, {color:C.sec, width:2.6}); S.line(-2.1, f(-2.1), 4.6, f(4.6), {color:C.rise, width:2.6});
      S.dot(-1, 3, C.ink); S.dot(4, 8, C.ink);
      txt('(−1, 3)', X(-1) - 8, Y(3) - 12, 'right', C.ink); txt('(4, 8)', X(4) + 10, Y(8) + 8, 'left', C.ink);
      txt('f(x) = x + 4', X(0.3), Y(6.1), 'right', C.rise); txt('g(x) = x² − 2x', X(3.25), Y(1.6), 'left', C.sec);
      var DX = 0.16, xa = Math.max(-1, x - DX); S.poly([[xa, g(x)], [x, g(x)], [x, f(x)], [xa, f(x)]], {fill:C.tan, alpha:0.85}); S.line(xa, g(x), xa, f(x), {color:C.ink, width:1.2}); S.line(x, g(x), x, f(x), {color:C.ink, width:1.2}); S.line(xa, g(x), x, g(x), {color:C.ink, width:1.2}); S.line(xa, f(x), x, f(x), {color:C.ink, width:1.2});
      S.dot(x, g(x), C.sec); S.dot(x, f(x), C.rise);
      if (x > -0.83){ c.strokeStyle = C.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(xa), Y(g(x)) + 10); c.lineTo(X(x), Y(g(x)) + 10); c.moveTo(X(xa), Y(g(x)) + 6); c.lineTo(X(xa), Y(g(x)) + 14); c.moveTo(X(x), Y(g(x)) + 6); c.lineTo(X(x), Y(g(x)) + 14); c.stroke(); txt('dx', X((xa + x)/2), Y(g(x)) + 25, 'center', C.ink); }
      if (x > -0.8 && x < 3.8) txt('alto = f − g = ' + dec(f(x) - g(x), 2), X(x) + 10, Y((f(x) + g(x))/2), 'left', C.tan);
      if (x > 0.05 && x < 1.95) txt('aquí g(x) < 0: la tira cruza el eje x y la cuenta no cambia', X(-2.2), Y(-1.9), 'left', C.muted);
      S.lab('F', X(-2.2), Y(-1.5), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var x = v.x, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'La recta va arriba y la parábola abajo. Se cruzan en (−1, 3) y (4, 8). La tira vertical va a avanzar de un cruce al otro';
      if (x >= 3.995) return 'La tira llegó al segundo cruce. El área de la región es 125/6, cerca de 20,83 unidades cuadradas';
      return 'En x = ' + dec(x, 2) + ' la tira va de g = ' + dec(g(x), 2) + ' a f = ' + dec(f(x), 2) + '. Su alto es ' + dec(f(x), 2) + ' − (' + dec(g(x), 2) + ') = ' + dec(f(x) - g(x), 2) + '. Área pintada: cerca de ' + dec(A(x), 2);
    },
    readout:function(v){ var x = v.x; return [['', '\\text{tira en la posición }t:\\quad dA=\\big[f(t)-g(t)\\big]\\,dt=\\left(4+3t-t^{2}\\right)dt'], ['d', '\\text{suma de las tiras desde }t=-1\\text{ hasta }t=x:\\quad A(x)=\\displaystyle\\int_{-1}^{x}\\left(4+3t-t^{2}\\right)dt=4x+\\dfrac{3x^{2}}{2}-\\dfrac{x^{3}}{3}+\\dfrac{13}{6}'], ['', 'x=' + num(x, 2) + ':\\quad A(x)\\approx ' + num(A(x), 2) + '\\qquad x=4:\\quad A(4)=\\dfrac{125}{6}']]; }
  };
})());
