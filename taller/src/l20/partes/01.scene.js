OA.scene('rr-intro', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function xs(s){ return s < 3 ? 4 : s < 15 ? 4 + 10*(s - 3)/12 : s < 18 ? 14 : 14 - 4*OA.smooth(cl((s - 18)/2.5)); }
  return {
    world:{x0:-3.5, x1:20.5, y0:-3.5, y1:19.5}, aspect:23/24,
    aria:'Un cuadrado verde de lado x crece. Dos franjas naranjas de largo x y ancho 3 muestran cuánto aumenta el área en un segundo. Cuando x = 10 el área crece a 60 centímetros cuadrados por segundo.',
    labels:[['F', '\\dfrac{dA}{dt}=2\\cdot 10\\cdot 3=60', 'dA/dt = 2 · 10 · 3 = 60', 'diff']],
    sliders:[{id:'x', tex:'x', min:4, max:14, step:0.1, value:4}],
    legend:'<span><i class="sw alt"></i> área \\(A=x^{2}\\)</span><span><i class="sw rise"></i> aumento del área en \\(1\\) segundo</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, C = S.C, c = S.ctx;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.poly([[x, 0], [x + 3, 0], [x + 3, x], [x, x]], {fill:C.rise, alpha:0.3, color:C.rise, width:1.2, dash:[4,3]});
      S.poly([[0, x], [x, x], [x, x + 3], [0, x + 3]], {fill:C.rise, alpha:0.3, color:C.rise, width:1.2, dash:[4,3]});
      S.poly([[0, 0], [x, 0], [x, x], [0, x]], {fill:C.alt, alpha:0.28, color:C.alt, width:2.5});
      txt('x = ' + dec(x, 1) + ' cm', S.X(x/2), S.Y(0) + 14, 'center', C.alt);
      txt('x', S.X(0) - 10, S.Y(x/2), 'right', C.alt);
      txt('A = x² = ' + dec(x*x, 1) + ' cm²', S.X(x/2), S.Y(x/2), 'center', C.alt);
      txt('3', S.X(x + 1.5), S.Y(0) + 14, 'center', C.rise); txt('3', S.X(0) - 10, S.Y(x + 1.5), 'right', C.rise);
      txt('x · 3', S.X(x + 1.5), S.Y(x/2), 'center', C.rise); txt('x · 3', S.X(x/2), S.Y(x + 1.5), 'center', C.rise);
      S.lab('F', S.X(10) + 14, S.Y(13.8), 0, -50, v.t != null && s >= 20.5);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN;
      if (s != null && s < 3) return 'Cuadrado verde: la lámina, de lado x. Franjas naranjas: lo que el área aumenta en un segundo, dos franjas de largo x y ancho 3';
      return ['El lado crece 3 cm por segundo. El área crece a razón de ', '\\dfrac{dA}{dt}=2x\\cdot 3=' + num(6*x, 1), 'dA/dt = 2x · 3 = ' + dec(6*x, 1), ' cm² por segundo'];
    },
    readout:function(v){ var x = v.x; return [['d', 'x=' + num(x, 1) + '\\qquad A=x^{2}=' + num(x*x, 1)], ['', '\\dfrac{dA}{dt}=2x\\cdot\\dfrac{dx}{dt}=' + num(6*x, 1)]]; }
  };
})());
