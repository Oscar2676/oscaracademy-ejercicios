OA.scene('rr-escalera', (function(){
  var RUN = 26, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  function xs(s){ return s < 3 ? 1 : s < 17.4 ? 1 + 3.6*(s - 3)/14.4 : s < 19.5 ? 4.6 : 4.6 - 1.6*OA.smooth(cl((s - 19.5)/2.5)); }
  return {
    world:{x0:-1.9, x1:6.3, y0:-1.3, y1:5.9}, aspect:7.2/8.2,
    aria:'Una escalera de 5 metros apoyada en un muro. Su pie se aleja del muro a 0,5 metros por segundo y su extremo superior baja cada vez más rápido. Cuando el pie está a 3 metros, la altura es 4 metros y baja a 0,375 metros por segundo.',
    labels:[['F', '\\dfrac{dy}{dt}=-\\dfrac{3}{4}\\cdot\\dfrac{1}{2}=-\\dfrac{3}{8}', 'dy/dt = −(3/4)·(1/2) = −3/8', 'diff']],
    sliders:[{id:'x', tex:'x', min:1, max:4.6, step:0.02, value:1}],
    legend:'<span><i class="sw rise"></i> escalera, \\(5\\) m</span><span><i class="sw alt"></i> \\(x\\)</span><span><i class="sw sec"></i> \\(y\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, y = Math.sqrt(25 - x*x), C = S.C, c = S.ctx;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.poly([[-0.35, 0], [0, 0], [0, 5.6], [-0.35, 5.6]], {fill:C.muted, alpha:0.35});
      S.line(0, 0, 0, 5.6, {color:C.ink, width:2.5}); S.line(-0.35, 0, 6.2, 0, {color:C.ink, width:2.5});
      txt('muro', S.X(-0.5), S.Y(5.2), 'right', C.muted); txt('piso', S.X(5.9), S.Y(0) + 26, 'right', C.muted);
      S.line(0, 0, x, 0, {color:C.alt, width:5}); S.line(0, 0, 0, y, {color:C.sec, width:5});
      S.line(x, 0, 0, y, {color:C.rise, width:5});
      S.dot(x, 0, C.alt); S.dot(0, y, C.sec);
      txt('x = ' + dec(x, 2), S.X(x/2), S.Y(0) + 14, 'center', C.alt);
      txt('y = ' + dec(y, 2), S.X(0) - 10, S.Y(y/2), 'right', C.sec);
      txt('5', S.X(x/2) + 10, S.Y(y/2) - 10, 'left', C.rise);
      txt('→ 0,5 m/s', S.X(x) + 10, S.Y(0) - 12, 'left', C.alt);
      txt('↓ ' + dec(x/y*0.5, 2) + ' m/s', S.X(0) + 10, S.Y(y) - 4, 'left', C.sec);
      S.lab('F', S.X(2.6), S.Y(4.6), 0, -50, v.t != null && s >= 22);
    },
    caption:function(v){
      var x = v.x, y = Math.sqrt(25 - x*x), s = v.t == null ? null : v.t*RUN, q = -x/y*0.5;
      if (s != null && s < 3) return 'Trazo naranja: la escalera, de 5 m. Trazo verde: x, distancia del pie al muro. Trazo azul: y, altura del extremo superior';
      return ['El pie se aleja a 0,5 m por segundo. La altura cambia a razón de ', '\\dfrac{dy}{dt}=-\\dfrac{x}{y}\\cdot\\dfrac{1}{2}=' + num(q, 2), 'dy/dt = −(x/y)·(1/2) = ' + dec(q, 2), ' m por segundo'];
    },
    readout:function(v){ var x = v.x, y = Math.sqrt(25 - x*x); return [['d', 'x=' + num(x, 2) + '\\qquad y=\\sqrt{25-x^{2}}=' + num(y, 2)], ['', '\\dfrac{dy}{dt}=-\\dfrac{x}{y}\\cdot\\dfrac{dx}{dt}=' + num(-x/y*0.5, 2)]]; }
  };
})());
