OA.scene('implicitas', (function(){
  var RUN = 30, num = OA.num, R = 5, AF = Math.atan2(4, 3);
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  /* ángulo en grados: recorre de 150° a −150° pasando por 0°... y termina en el punto (3, 4) */
  function ang(s){ var a0 = 160, a1 = 20; if (s < 4) return a0; if (s < 18) return a0 + (a1 - a0)*(s - 4)/14; return a1 + (AF*180/Math.PI - a1)*OA.smooth(cl((s - 18)/4)); }
  return {
    world:{x0:-7.4, x1:7.4, y0:-6.4, y1:7.0}, aspect:13.4/14.8,
    aria:'Circunferencia x² + y² = 25. Un punto P la recorre por su mitad superior con su tangente, de pendiente −x/y, perpendicular al radio OP. Al final se detiene en (3, 4), donde la pendiente es −3/4.',
    labels:[['P', 'P\\,(x,\;y)', 'P (x, y)', 'pt c-tan'], ['F', "P\\,(3,\;4):\\ y'=-\\dfrac{3}{4}", "P (3, 4): y' = −3/4", 'diff'], ['E', 'x^{2}+y^{2}=25', 'x² + y² = 25', 'pt']],
    sliders:[{id:'a', tex:'\\text{ángulo de }OP', min:10, max:170, step:1, value:160}],
    legend:'<span><i class="sw tan"></i> tangente en \\(P\\)</span><span><i class="sw sec"></i> radio \\(OP\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.a = ang(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, a = v.a*Math.PI/180, x = R*Math.cos(a), y = R*Math.sin(a), C = S.C, c = S.ctx, i, pts = [], k = cl(s/3.5);
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[-6,-4,-2,2,4,6], gy:[-6,-4,-2,2,4,6], full:true});
      for (i = 0; i <= 200*k; i++) pts.push([R*Math.cos(2*Math.PI*i/200), R*Math.sin(2*Math.PI*i/200)]);
      if (pts.length > 1) S.poly(pts, {color:C.ink, width:2.6, open:true});
      S.dot(0, 0, C.ink); txt('O', S.X(0) - 10, S.Y(0) + 12);
      if (s >= 4){
        S.line(0, 0, x, y, {color:C.sec, width:2.5});
        var m = -x/y, L = 3.6, n = Math.sqrt(1 + m*m);
        S.line(x - L/n, y - L*m/n, x + L/n, y + L*m/n, {color:C.tan, width:3});
        S.line(x, y, x, 0, {color:C.muted, width:1, dash:[3,4]}); S.line(x, y, 0, y, {color:C.muted, width:1, dash:[3,4]});
        S.dot(x, y, C.tan);
        var fin = v.t != null && s >= 22;
        if (!fin) txt('y′ = −x/y = ' + dec(m, 2), S.X(x) + (x >= 0 ? 14 : -14), S.Y(y) - 22, x >= 0 ? 'left' : 'right', C.tan);
        if (Math.abs(x) > 1.3) txt('x = ' + dec(x, 2), S.X(x), S.Y(0) + 14, 'center', C.muted); if (Math.abs(x) > 2.2) txt('y = ' + dec(y, 2), S.X(0) + (x >= 0 ? -8 : 8), S.Y(y), x >= 0 ? 'right' : 'left', C.muted);
      }
      S.lab('E', S.X(-3.7), S.Y(-4.4), -100, 0, s >= 3.5);
      S.lab('P', 0, 0, 0, 0, false);
      S.out('F', S.X(3), S.Y(4), 1, 1, v.t != null && s >= 22, 12);
    },
    caption:function(v){
      var a = v.a*Math.PI/180, x = R*Math.cos(a), y = R*Math.sin(a), m = -x/y, s = v.t == null ? null : v.t*RUN;
      if (s != null && s < 4) return ['Circunferencia negra: los puntos que cumplen ', 'x^{2}+y^{2}=25', 'x² + y² = 25'];
      if (s != null && s >= 22) return ['En el punto (3, 4) la pendiente de la tangente es ', "y'=-\\dfrac{3}{4}", "y' = −3/4"];
      return ['Recta roja: la tangente en P, perpendicular al radio azul. Su pendiente es ', "y'=-\\dfrac{x}{y}=" + num(m, 2), "y' = −x/y = " + dec(m, 2)];
    },
    readout:function(v){ var a = v.a*Math.PI/180, x = R*Math.cos(a), y = R*Math.sin(a); return [['d', 'x=' + num(x, 2) + '\\qquad y=' + num(y, 2)], ['', "y'=-\\dfrac{x}{y}=" + num(-x/y, 2)]]; }
  };
})());
