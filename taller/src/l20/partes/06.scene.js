OA.scene('rr-sombra', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function xs(s){ return s < 3 ? 1.5 : s < 17 ? 1.5 + 6*(s - 3)/14 : s < 19 ? 7.5 : 7.5 - 1.5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-1.2, x1:10.8, y0:-2.2, y1:7.4}, aspect:9.6/12,
    aria:'Un poste con un farol a 6 metros de altura. Una persona de 1,5 metros se aleja del poste. Un rayo naranja sale del farol, pasa por la cabeza de la persona y llega al piso en la punta de la sombra. La sombra mide siempre la tercera parte de la distancia de la persona al poste y crece a 0,4 metros por segundo.',
    labels:[['F', '\\dfrac{ds}{dt}=\\dfrac{1}{3}\\cdot 1{,}2=0{,}4', 'ds/dt = (1/3)·1,2 = 0,4', 'diff']],
    sliders:[{id:'x', tex:'x', min:1.5, max:7.5, step:0.02, value:1.5}],
    legend:'<span><i class="sw alt"></i> \\(x\\)</span><span><i class="sw sec"></i> sombra \\(s\\)</span><span><i class="sw rise"></i> rayo de luz</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, sh = x/3, L = x + sh, C = S.C, c = S.ctx, X = S.X, Y = S.Y, g;
      function txt(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* piso */
      S.line(-1, 0, 10.6, 0, {color:C.ink, width:2.5});
      /* triángulo grande (tenue) y triángulo pequeño (sombreado) */
      S.poly([[0, 0], [L, 0], [0, 6]], {fill:C.rise, alpha:0.08});
      S.poly([[x, 0], [L, 0], [x, 1.5]], {fill:C.sec, alpha:0.3});
      /* halo del farol */
      g = c.createRadialGradient(X(0), Y(6), 2, X(0), Y(6), 46); g.addColorStop(0, 'rgba(255,214,102,0.9)'); g.addColorStop(1, 'rgba(255,214,102,0)');
      c.fillStyle = g; c.beginPath(); c.arc(X(0), Y(6), 46, 0, 2*Math.PI); c.fill();
      /* poste y farol */
      S.line(0, 0, 0, 6, {color:C.ink, width:4}); S.dot(0, 6, C.rise);
      /* rayo de luz */
      S.line(0, 6, L, 0, {color:C.rise, width:2.6});
      /* persona */
      S.line(x, 0, x, 1.5, {color:C.tan, width:5}); c.beginPath(); c.arc(X(x), Y(1.5) - 5, 6, 0, 2*Math.PI); c.fillStyle = C.tan; c.fill();
      /* x y la sombra s, sobre el piso */
      S.line(0, -0.5, x, -0.5, {color:C.alt, width:4}); S.line(x, -0.5, L, -0.5, {color:C.sec, width:4});
      S.line(0, -0.7, 0, -0.3, {color:C.alt, width:2}); S.line(x, -0.7, x, -0.3, {color:C.ink, width:2}); S.line(L, -0.7, L, -0.3, {color:C.sec, width:2});
      S.line(x, 0, L, 0, {color:C.sec, width:6}); S.dot(L, 0, C.sec);
      txt('x = ' + dec(x, 2), X(x/2), Y(-0.5) + 15, 'center', C.alt);
      txt('s = ' + dec(sh, 2), X(x + sh/2), Y(-0.5) + 15, 'center', C.sec);
      txt('x + s = ' + dec(L, 2), X(L/2), Y(-0.5) + 36, 'center', C.ink);
      txt('6', X(0) - 10, Y(3), 'right', C.ink); txt('1,5', X(x) - 10, Y(0.8), 'right', C.tan);
      txt('→ 1,2 m/s', X(x) + 6, Y(1.5) - 22, 'left', C.tan);
      txt('farol', X(0) + 12, Y(6) - 14, 'left', C.rise);
      S.lab('F', X(5.2), Y(6.7), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN;
      if (s != null && s < 3) return 'Trazo verde: x, distancia de la persona al poste. Trazo azul: s, su sombra. Trazo naranja: el rayo de luz que pasa por su cabeza';
      return ['Los dos triángulos son semejantes: la sombra mide siempre la tercera parte de x. Crece a ', '\\dfrac{ds}{dt}=0{,}4', 'ds/dt = 0,4', ' m por segundo, en todo instante'];
    },
    readout:function(v){ return [['', '\\dfrac{6}{x+s}=\\dfrac{1{,}5}{s}'], ['d', 's=\\dfrac{x}{3}'], ['', '\\dfrac{ds}{dt}=\\dfrac{1}{3}\\cdot\\dfrac{dx}{dt}=\\dfrac{1}{3}\\cdot 1{,}2=0{,}4']]; }
  };
})());
