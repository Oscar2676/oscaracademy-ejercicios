OA.scene('rr-globo', (function(){
  var RUN = 26, num = OA.num, PI = Math.PI, V0 = 4/3*PI*8, V1 = 4/3*PI*1000;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function rDeV(V){ return Math.cbrt(3*V/(4*PI)); }
  function rs(s){ return s < 3 ? 2 : s < 17 ? rDeV(V0 + (V1 - V0)*(s - 3)/14) : s < 19 ? 10 : 10 - 5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Un globo circular verde crece. Su volumen aumenta 100 centímetros cúbicos por segundo y su radio crece cada vez más lento. Cuando el radio mide 5 centímetros crece a 1/π, aproximadamente 0,32 centímetros por segundo.',
    labels:[['F', '\\dfrac{dr}{dt}=\\dfrac{1}{\\pi}\\approx 0{,}32', 'dr/dt = 1/π ≈ 0,32', 'diff']],
    sliders:[{id:'r', tex:'r', min:2, max:10, step:0.05, value:2}],
    legend:'<span><i class="sw alt"></i> globo</span><span><i class="sw tan"></i> radio \\(r\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.r = rs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, r = v.r, C = S.C, c = S.ctx, pts = [], i;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[-10,-5,5,10], gy:[-10,-5,5,10], full:true});
      for (i = 0; i <= 120; i++) pts.push([r*Math.cos(2*PI*i/120), r*Math.sin(2*PI*i/120)]);
      S.poly(pts, {fill:C.alt, alpha:0.25, color:C.alt, width:2.5});
      S.line(0, 0, r*Math.cos(0.5), r*Math.sin(0.5), {color:C.tan, width:3}); S.dot(0, 0, C.tan);
      txt('r = ' + dec(r, 2) + ' cm', S.X(r*Math.cos(0.5)/2) - 4, S.Y(r*Math.sin(0.5)/2) - 12, r < 4.5 ? 'left' : 'center', C.tan);
      txt('V = ' + dec(4/3*PI*r*r*r, 0) + ' cm³', S.X(0), S.Y(-11.4), 'center', C.alt);
      S.lab('F', S.X(1.2), S.Y(11.6), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var r = v.r, s = v.t == null ? null : v.t*RUN, q = 25/(PI*r*r);
      if (s != null && s < 3) return 'Círculo verde: el globo. Trazo rojo: su radio r. Entran 100 cm³ de aire cada segundo';
      return ['El radio crece a razón de ', '\\dfrac{dr}{dt}=\\dfrac{25}{\\pi r^{2}}\\approx ' + num(q, 2), 'dr/dt = 25/(π r²) ≈ ' + dec(q, 2), ' cm por segundo'];
    },
    readout:function(v){ var r = v.r; return [['d', 'r=' + num(r, 2) + '\\qquad V=\\tfrac{4}{3}\\pi r^{3}\\approx ' + num(4/3*PI*r*r*r, 0)], ['', '\\dfrac{dr}{dt}=\\dfrac{100}{4\\pi r^{2}}\\approx ' + num(25/(PI*r*r), 2)]]; }
  };
})());
