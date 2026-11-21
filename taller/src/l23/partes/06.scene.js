OA.scene('pol-area-dos', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, PI = Math.PI, A0 = -PI/2, A1 = PI/2, D = 0.2;
  function ri(q){ return 1 - Math.cos(q); }
  function A(q){ return 0.5*(2*Math.sin(q) - q/2 - Math.sin(2*q)/4 + 2 - PI/4); }
  function qs(s){ return s < 2 ? A0 + 0.02 : s < 20 ? A0 + 0.02 + (PI - 0.02)*(s - 2)/18 : A1; }
  return {
    world:{x0:-2.4, x1:3.3, y0:-4.5, y1:1.6}, aspect:6.1/5.7,
    _chk:[{f:A, df:function(q){ return 0.5*(1 - ri(q)*ri(q)); }, at:[-1.2, -0.4, 0.5, 1.3]}],
    aria:'Sobre una rejilla polar, el círculo naranja r igual a 1 y la cardioide azul r igual a 1 menos coseno de theta, que se cruzan en theta igual a menos pi medios y pi medios. Un rayo gira entre esos dos ángulos. Sobre el rayo se marcan el radio interior, hasta la cardioide, y el radio exterior, hasta el círculo. Un trozo de anillo burdeo, de ángulo d theta, queda entre las dos curvas. La región barrida entre ellas se pinta de verde y llega a medir 2 menos pi cuartos.',
    labels:[['F', 'A=\\displaystyle\\int_{-\\pi/2}^{\\pi/2}\\dfrac{1}{2}\\Big[1^{2}-(1-\\cos\\theta)^{2}\\Big]d\\theta=2-\\dfrac{\\pi}{4}', 'A = ∫ ½[1² − (1 − cos θ)²] dθ = 2 − π/4', 'diff']],
    sliders:[{id:'th', tex:'\\theta', min:-1.5708, max:1.5708, step:0.005, value:-1.55}],
    legend:'<span><i class="sw rise"></i> \\(r=1\\), exterior</span><span><i class="sw sec"></i> \\(r=1-\\cos\\theta\\), interior</span><span><i class="sw tan"></i> trozo de anillo de ángulo \\(d\\theta\\)</span><span><i class="sw alt"></i> área barrida</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.th = qs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var th = v.th == null ? A0 + 0.02 : v.th, s = v.q == null ? RUN : v.q*RUN, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, q, pts = [], w = [], on = th < A1 - 0.01 && !(v.q != null && s >= 20), q1 = Math.min(A1, th + D), R1 = Math.abs(X(1) - X(0)), am, ax, ay;
      oaRej(S, 1);
      for (i = 0; i <= 120; i++){ q = A0 + (th - A0)*i/120; pts.push([Math.cos(q), Math.sin(q)]); } for (i = 120; i >= 0; i--){ q = A0 + (th - A0)*i/120; pts.push([ri(q)*Math.cos(q), ri(q)*Math.sin(q)]); }
      if (th > A0 + 0.03) S.poly(pts, {fill:C.alt, alpha:0.45});
      if (on){ for (i = 0; i <= 10; i++){ q = th + (q1 - th)*i/10; w.push([Math.cos(q), Math.sin(q)]); } for (i = 10; i >= 0; i--){ q = th + (q1 - th)*i/10; w.push([ri(th)*Math.cos(q), ri(th)*Math.sin(q)]); } S.poly(w, {fill:C.tan, alpha:0.8}); }
      oaPar(S, function(q){ return Math.cos(q); }, function(q){ return Math.sin(q); }, 0, 2*PI, C.rise, 2.6);
      oaPar(S, function(q){ return ri(q)*Math.cos(q); }, function(q){ return ri(q)*Math.sin(q); }, 0, 2*PI, C.sec, 2.6);
      S.dot(0, 1, C.ink); S.dot(0, -1, C.ink); txt('θ = π/2', X(0) + 10, Y(1) - 12, 'left', C.ink); txt('θ = −π/2', X(0) + 10, Y(-1) + 12, 'left', C.ink);
      /* rayo: tramo interior (hasta la cardioide) y tramo entre las dos curvas */
      S.line(0, 0, ri(th)*Math.cos(th), ri(th)*Math.sin(th), {color:C.sec, width:3.4}); S.line(ri(th)*Math.cos(th), ri(th)*Math.sin(th), Math.cos(th), Math.sin(th), {color:C.rise, width:3.4});
      S.dot(0, 0, C.ink); S.dot(ri(th)*Math.cos(th), ri(th)*Math.sin(th), C.sec); S.dot(Math.cos(th), Math.sin(th), C.rise);
      if (on){ am = th + (q1 - th)/2; ax = X(0) + (R1 + 7)*Math.cos(am); ay = Y(0) - (R1 + 7)*Math.sin(am); c.strokeStyle = C.ink; c.lineWidth = 2.4; c.beginPath(); c.arc(X(0), Y(0), R1 + 7, -th, -q1, true); c.stroke(); c.lineWidth = 1.3; c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax + 20, ay); c.stroke(); txt('ángulo dθ', ax + 24, ay, 'left', C.ink); }
      /* datos */
      txt('θ = ' + dec(th, 2) + ' rad', X(-2.3), Y(-1.75), 'left', C.ink);
      txt('radio exterior: R = 1', X(-2.3), Y(-1.75) + 21, 'left', C.rise);
      txt('radio interior: r = 1 − cos θ = ' + dec(ri(th), 2), X(-2.3), Y(-1.75) + 42, 'left', C.sec);
      txt('trozo: dA = ½ (R² − r²) dθ', X(-2.3), Y(-1.75) + 63, 'left', C.tan);
      txt('área barrida ≈ ' + dec(A(th), 3), X(-2.3), Y(-1.75) + 84, 'left', C.alt);
      S.lab('F', X(-2.3), Y(-3.9), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var th = v.th == null ? A0 + 0.02 : v.th, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'El círculo r = 1 y la cardioide r = 1 − cos θ se cruzan en θ = −π/2 y θ = π/2. Entre esos ángulos la cardioide queda adentro. El rayo va a barrer la región que hay entre las dos';
      if (th >= A1 - 0.006) return 'El rayo llegó a θ = π/2. La región dentro del círculo y fuera de la cardioide mide 2 − π/4, cerca de 1,215 unidades cuadradas';
      return 'En θ = ' + dec(th, 2) + ' el rayo cruza primero la cardioide, en r = ' + dec(ri(th), 2) + ', y después el círculo, en R = 1. El trozo que agrega es un sector grande menos un sector chico: ½(1² − ' + dec(ri(th), 2) + '²) dθ';
    },
    readout:function(v){ var th = v.th == null ? A0 + 0.02 : v.th; return [['', 'dA=\\dfrac{1}{2}R^{2}\\,d\\theta-\\dfrac{1}{2}r^{2}\\,d\\theta=\\dfrac{1}{2}\\Big[1-(1-\\cos\\theta)^{2}\\Big]d\\theta=\\dfrac{1}{2}\\left(2\\cos\\theta-\\cos^{2}\\theta\\right)d\\theta'], ['d', 'A(\\theta)=\\displaystyle\\int_{-\\pi/2}^{\\theta}\\dfrac{1}{2}\\left(2\\cos u-\\cos^{2}u\\right)du=\\dfrac{1}{2}\\left(2\\operatorname{sen}\\theta-\\dfrac{\\theta}{2}-\\dfrac{\\operatorname{sen}2\\theta}{4}+2-\\dfrac{\\pi}{4}\\right)'], ['', '\\theta=' + num(th, 2) + ':\\quad A(\\theta)\\approx ' + num(A(th), 3) + '\\qquad\\theta=\\dfrac{\\pi}{2}:\\quad A=2-\\dfrac{\\pi}{4}']]; }
  };
})());
