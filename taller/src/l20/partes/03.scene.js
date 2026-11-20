OA.scene('rr-autos', (function(){
  var RUN = 26, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  /* tiempo en minutos: 0 a 4,5 min; el instante pedido es t = 3 min (x = 3, y = 4) */
  function ts(s){ return s < 3 ? 0.3 : s < 17 ? 0.3 + 4.2*(s - 3)/14 : s < 19 ? 4.5 : 4.5 - 1.5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-1.6, x1:6.6, y0:-1.2, y1:7.0}, aspect:1,
    aria:'Cruce de dos calles perpendiculares. El auto A avanza hacia el este y el auto B hacia el norte. La distancia entre ellos es la hipotenusa. Cuando A está a 3 km y B a 4 km, la distancia es 5 km y aumenta a 100 km por hora.',
    labels:[['F', '\\dfrac{dz}{dt}=\\dfrac{3\\cdot 60+4\\cdot 80}{5}=100', 'dz/dt = (3·60 + 4·80)/5 = 100', 'diff']],
    sliders:[{id:'m', tex:'t\\ \\text{(min)}', min:0.3, max:4.5, step:0.05, value:0.3}],
    legend:'<span><i class="sw alt"></i> \\(x\\), auto \\(A\\)</span><span><i class="sw sec"></i> \\(y\\), auto \\(B\\)</span><span><i class="sw rise"></i> \\(z\\), distancia entre los autos</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.m = ts(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, m = v.m, x = m, y = 80*m/60, z = Math.sqrt(x*x + y*y), C = S.C, c = S.ctx;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(-1.4, 0, 6.5, 0, {color:C.muted, width:9}); S.line(0, -1, 0, 6.9, {color:C.muted, width:9});
      S.line(-1.4, 0, 6.5, 0, {color:C.bg, width:1, dash:[8,7]}); S.line(0, -1, 0, 6.9, {color:C.bg, width:1, dash:[8,7]});
      txt('este →', S.X(6.4), S.Y(0) + 16, 'right', C.muted); txt('norte ↑', S.X(0) - 10, S.Y(6.7), 'right', C.muted);
      S.line(0, 0, x, 0, {color:C.alt, width:4}); S.line(0, 0, 0, y, {color:C.sec, width:4}); S.line(x, 0, 0, y, {color:C.rise, width:3.5});
      S.dot(0, 0, C.ink); S.dot(x, 0, C.alt); S.dot(0, y, C.sec);
      txt('O', S.X(0) - 10, S.Y(0) + 13);
      txt('A', S.X(x), S.Y(0) - 14, 'center', C.alt); txt('B', S.X(0) + 13, S.Y(y), 'left', C.sec);
      if (x > 0.9){ txt('x = ' + dec(x, 2), S.X(x/2), S.Y(0) + 16, 'center', C.alt); txt('y = ' + dec(y, 2), S.X(0) - 10, S.Y(y/2), 'right', C.sec); txt('z = ' + dec(z, 2), S.X(x/2) + 10, S.Y(y/2) - 10, 'left', C.rise); }
      S.lab('F', S.X(1.4), S.Y(6.2), 0, -50, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var m = v.m, x = m, y = 80*m/60, z = Math.sqrt(x*x + y*y), s = v.t == null ? null : v.t*RUN, q = (x*60 + y*80)/z;
      if (s != null && s < 3) return 'El auto A va hacia el este a 60 km/h y el auto B hacia el norte a 80 km/h. Trazo naranja: la distancia z entre ellos';
      return ['La distancia entre los autos aumenta a razón de ', '\\dfrac{dz}{dt}=\\dfrac{x\\cdot 60+y\\cdot 80}{z}=' + num(q, 0), 'dz/dt = (x·60 + y·80)/z = ' + dec(q, 0), ' km por hora'];
    },
    readout:function(v){ var m = v.m, x = m, y = 80*m/60, z = Math.sqrt(x*x + y*y); return [['d', 'x=' + num(x, 2) + '\\qquad y=' + num(y, 2) + '\\qquad z=\\sqrt{x^{2}+y^{2}}=' + num(z, 2)], ['', '\\dfrac{dz}{dt}=\\dfrac{x\\cdot 60+y\\cdot 80}{z}=' + num((x*60 + y*80)/z, 0)]]; }
  };
})());
