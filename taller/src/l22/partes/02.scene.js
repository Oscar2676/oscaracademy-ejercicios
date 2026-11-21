OA.scene('apl-area-cruces', (function(){
  var RUN = 24, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function f(x){ return x*x*x - x; } function g(x){ return 3*x; }
  function Sg(x){ return x*x*x*x/4 - 2*x*x + 4; }            /* ∫ de −2 a x de (f − g), sin separar */
  function Ar(x){ return x <= 0 ? Sg(x) : 4 + 2*x*x - x*x*x*x/4; } /* área por tramos */
  function xs(s){ return s < 2 ? -2 : s < 10 ? -2 + 2*OA.smooth((s - 2)/8) : s < 12 ? 0 : s < 20 ? 2*OA.smooth((s - 12)/8) : 2; }
  return {
    world:{x0:-2.9, x1:2.9, y0:-8.2, y1:8.2}, aspect:0.78,
    _chk:[{f:Sg, df:function(x){ return f(x) - g(x); }, at:[-1.5, -0.5, 0.5, 1.5]}],
    aria:'La curva azul f de x igual a x al cubo menos x y la recta naranja g de x igual a 3x se cruzan en x igual a −2, 0 y 2. Entre −2 y 0 la curva va arriba y la región se pinta verde; entre 0 y 2 la recta va arriba y la región se pinta burdeo. Una tira vertical recorre la región. La integral sin separar sube hasta 4 y vuelve a 0; el área por tramos llega a 8.',
    labels:[['F', 'A=\\displaystyle\\int_{-2}^{2}|f-g|\\,dx=4+4=8', 'A = ∫ |f − g| dx = 4 + 4 = 8', 'diff']],
    sliders:[{id:'x', tex:'x', min:-2, max:2, step:0.01, value:-2}],
    legend:'<span><i class="sw sec"></i> \\(f(x)=x^{3}-x\\)</span><span><i class="sw rise"></i> \\(g(x)=3x\\)</span><span><i class="sw alt"></i> \\(f\\) arriba</span><span><i class="sw tan"></i> \\(g\\) arriba</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, u, pa = [], pb = [], xa = Math.min(x, 0);
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xb = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xb, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[-2, -1, 1, 2], gy:[-6, -3, 3, 6]});
      if (xa > -1.995){ for (i = 0; i <= 50; i++){ u = -2 + (xa + 2)*i/50; pa.push([u, f(u)]); } for (i = 50; i >= 0; i--){ u = -2 + (xa + 2)*i/50; pa.push([u, g(u)]); } S.poly(pa, {fill:C.alt, alpha:0.5}); }
      if (x > 0.005){ for (i = 0; i <= 50; i++){ u = x*i/50; pb.push([u, g(u)]); } for (i = 50; i >= 0; i--){ u = x*i/50; pb.push([u, f(u)]); } S.poly(pb, {fill:C.tan, alpha:0.42}); }
      S.curve(f, -2.25, 2.25, {color:C.sec, width:2.6}); S.line(-2.6, g(-2.6), 2.6, g(2.6), {color:C.rise, width:2.6});
      S.dot(-2, -6, C.ink); S.dot(0, 0, C.ink); S.dot(2, 6, C.ink);
      txt('(−2, −6)', X(-2) + 12, Y(-6) + 10, 'left', C.ink); txt('(2, 6)', X(2) + 10, Y(6) + 4, 'left', C.ink); txt('(0, 0)', X(0) + 10, Y(0) + 14, 'left', C.ink);
      txt('f(x) = x³ − x', X(-2.75), Y(2.9), 'left', C.sec); txt('g(x) = 3x', X(0.25), Y(5), 'left', C.rise);
      S.line(x, f(x), x, g(x), {color:C.ink, width:3.2}); S.dot(x, f(x), C.sec); S.dot(x, g(x), C.rise);
      if (x > -1.9 && x < -0.12) txt('f va arriba: f − g = ' + dec(f(x) - g(x), 2), X(-2.75), Y(4.9), 'left', C.alt);
      if (x > 0.12 && x < 1.9) txt('g va arriba: g − f = ' + dec(g(x) - f(x), 2), X(0.2), Y(-5.6), 'left', C.tan);
      if (Math.abs(x) < 0.005 && v.q != null) txt('cruce: aquí cambia la curva de arriba', X(0.2), Y(-5.6), 'left', C.ink);
      S.lab('F', X(-2.75), Y(7.3), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var x = v.x, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Las curvas se cruzan en x = −2, x = 0 y x = 2. La tira vertical va a recorrer la región de izquierda a derecha';
      if (Math.abs(x) < 0.005) return 'En x = 0 las curvas se cruzan y cambian de lugar. Hasta aquí las dos cuentas coinciden: 4. Desde aquí, la recta va arriba';
      if (x < 0) return 'Tramo de −2 a 0: la curva azul va arriba. La tira mide f − g, positivo, y las dos cuentas crecen juntas: ' + dec(Sg(x), 2);
      if (x >= 1.995) return 'Fin. Sin separar, la integral de f − g volvió a 0. Por tramos, el área es 4 + 4 = 8';
      return 'Tramo de 0 a 2: la recta va arriba, f − g es negativo. Sin separar, la cuenta baja: ' + dec(Sg(x), 2) + '. Por tramos, el área sigue creciendo: ' + dec(Ar(x), 2);
    },
    readout:function(v){ var x = v.x; return [['', '\\text{sin separar:}\\quad\\displaystyle\\int_{-2}^{x}\\big[f(t)-g(t)\\big]dt=\\dfrac{x^{4}}{4}-2x^{2}+4\\approx ' + num(Sg(x), 2)], ['d', '\\text{por tramos:}\\quad\\displaystyle\\int_{-2}^{x}\\big|f(t)-g(t)\\big|\\,dt\\approx ' + num(Ar(x), 2)], ['', 'x=2:\\quad \\text{sin separar}=0,\\qquad \\text{por tramos}=4+4=8']]; }
  };
})());
