OA.scene('rr-derivadas', (function(){
  var RUN = 24, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function ys(s){ return s < 3 ? 40 : s < 16 ? 40 + 480*Math.pow((s - 3)/13, 1.6) : s < 18 ? 520 : 520 - 220*OA.smooth(cl((s - 18)/2.5)); }
  return {
    world:{x0:-90, x1:560, y0:-110, y1:590}, aspect:700/650,
    aria:'Una cámara en el suelo, a 400 metros del punto de despegue de un cohete que sube en línea recta. La línea de visión, el suelo y la trayectoria del cohete forman un triángulo rectángulo. El ángulo de elevación crece mientras el cohete sube. Cuando el cohete está a 300 metros, la cámara gira a 0,08 radianes por segundo.',
    labels:[['F', '\\dfrac{d\\theta}{dt}=\\dfrac{1}{8}\\cdot\\dfrac{16}{25}=0{,}08', 'dθ/dt = (1/8)·(16/25) = 0,08', 'diff']],
    sliders:[{id:'y', tex:'y', min:40, max:520, step:2, value:40}],
    legend:'<span><i class="sw alt"></i> \\(400\\) m</span><span><i class="sw sec"></i> altura \\(y\\)</span><span><i class="sw rise"></i> línea de visión</span><span><i class="sw tan"></i> ángulo \\(\\theta\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.y = ys(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, y = v.y, th = Math.atan(y/400), C = S.C, c = S.ctx, X = S.X, Y = S.Y, a, r = 62, ax, ay;
      function txt(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(-70, 0, 540, 0, {color:C.ink, width:2.5});
      S.poly([[0, 0], [400, 0], [400, y]], {fill:C.rise, alpha:0.08});
      S.line(400, 0, 400, 570, {color:C.muted, width:1, dash:[3, 4]});
      S.line(0, 0, 400, 0, {color:C.alt, width:5}); S.line(400, 0, 400, y, {color:C.sec, width:5}); S.line(0, 0, 400, y, {color:C.rise, width:2.6});
      /* ángulo recto y arco del ángulo con flecha en el sentido en que crece */
      c.strokeStyle = C.ink; c.lineWidth = 1.2; c.strokeRect(X(400) - 11, Y(0) - 11, 11, 11);
      a = Math.atan2(Y(0) - Y(y), X(400) - X(0));
      c.strokeStyle = C.tan; c.lineWidth = 2.4; c.beginPath(); c.arc(X(0), Y(0), r, -a, 0); c.stroke();
      ax = X(0) + r*Math.cos(a); ay = Y(0) - r*Math.sin(a);
      c.fillStyle = C.tan; c.beginPath(); c.moveTo(ax - 7*Math.sin(a), ay - 7*Math.cos(a)); c.lineTo(ax + 5*Math.cos(a) + 2*Math.sin(a), ay - 5*Math.sin(a) + 2*Math.cos(a)); c.lineTo(ax - 5*Math.cos(a) + 2*Math.sin(a), ay + 5*Math.sin(a) + 2*Math.cos(a)); c.closePath(); c.fill();
      txt('θ = ' + dec(th, 2) + ' rad', X(0) + r + 44, Y(0) - 16 - 14*Math.sin(a), 'left', C.tan);
      /* cámara y cohete */
      S.dot(0, 0, C.ink); c.fillStyle = C.ink; c.fillRect(X(0) - 9, Y(0) - 7, 18, 12);
      c.fillStyle = C.sec; c.beginPath(); c.moveTo(X(400), Y(y) - 22); c.lineTo(X(400) + 7, Y(y) - 6); c.lineTo(X(400) + 7, Y(y) + 8); c.lineTo(X(400) - 7, Y(y) + 8); c.lineTo(X(400) - 7, Y(y) - 6); c.closePath(); c.fill();
      txt('400', X(200), Y(0) + 15, 'center', C.alt);
      txt('y = ' + dec(y, 0), X(400) + 14, Y(y/2), 'left', C.sec);
      txt('cámara', X(0), Y(0) + 26, 'center', C.ink); txt('cohete', X(400) + 14, Y(y) - 12, 'left', C.sec);
      S.lab('F', X(-75), Y(545), 0, 0, v.t != null && s >= 20.5);
    },
    caption:function(v){
      var y = v.y, s = v.t == null ? null : v.t*RUN;
      if (s != null && s < 3) return 'Trazo verde: 400 m, fijo. Trazo azul: la altura y del cohete. Trazo naranja: la línea de visión. Arco rojo: el ángulo θ de la cámara';
      return ['Con y = ' + dec(y, 0) + ' m: la tangente del ángulo es ', '\\tan\\theta=\\dfrac{y}{400}=' + num(y/400, 2), 'tan θ = y/400 = ' + dec(y/400, 2), '. Abajo, cómo se deriva esa ecuación respecto de t'];
    },
    readout:function(v){ return [['', '\\tan\\theta=\\dfrac{y}{400}'], ['d', '\\sec^{2}\\theta\\cdot\\dfrac{d\\theta}{dt}=\\dfrac{1}{400}\\cdot\\dfrac{dy}{dt}'], ['', '\\dfrac{d\\theta}{dt}=\\dfrac{1}{400\\,\\sec^{2}\\theta}\\cdot\\dfrac{dy}{dt}']]; }
  };
})());
