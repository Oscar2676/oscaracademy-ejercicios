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

OA.scene('pol-cardioide-puntos', (function(){
  var RUN = 30, N = 24, dec = oaDec, PI = Math.PI;
  function r(q){ return 1 - Math.cos(q); }
  function gcd(a, b){ return b ? gcd(b, a % b) : a; }
  function fr(k){ if (!k) return '0'; var g = gcd(k, 12), n = k/g, d = 12/g; return (n === 1 ? '' : n) + 'π' + (d === 1 ? '' : '/' + d); }
  function frT(k){ if (!k) return '0'; var g = gcd(k, 12), n = k/g, d = 12/g; return d === 1 ? (n === 1 ? '' : n) + '\\pi' : '\\dfrac{' + (n === 1 ? '' : n) + '\\pi}{' + d + '}'; }
  return {
    world:{x0:-3.1, x1:5.0, y0:-4.1, y1:2.25}, aspect:8.1/6.35,
    aria:'Sobre una rejilla polar se construye la cardioide r igual a 1 menos coseno de theta, punto a punto. En cada paso el ángulo theta aumenta en pi doceavos: se traza un rayo delgado con ese ángulo, se calcula r igual a 1 menos coseno de theta, se mide esa distancia sobre el rayo desde el polo y se marca un punto pequeño. A la derecha, una tabla anota cada ángulo con su radio. Con los 25 puntos marcados aparece la forma de la cardioide, y una línea fina los une.',
    labels:[['F', 'r=1-\\cos\\theta', 'r = 1 − cos θ', 'sec']],
    sliders:[{id:'n', tex:'\\text{paso}', min:0, max:24, step:1, value:0}],
    legend:'<span><i class="sw rise"></i> rayo de ángulo \\(\\theta\\)</span><span><i class="sw tan"></i> distancia \\(r=1-\\cos\\theta\\) medida sobre el rayo</span><span><i class="sw sec"></i> puntos \\((r,\\theta)\\) y la curva que forman</span>',
    anim:{run:RUN*1000, hold:7000, still:1, apply:function(p, v){ var u = Math.min(N + 0.999, p*(N + 1.6)); v.q = p; v.n = Math.min(N, Math.floor(u)); v.f = u >= N + 0.999 ? 1 : u - Math.floor(u); v.fin = p*(N + 1.6) > N + 1; }},
    onInput:function(v){ v.q = null; v.f = 1; v.fin = v.n >= N; },
    draw:function(S, v){
      var k = Math.round(v.n || 0), f = v.f == null ? 1 : v.f, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), th = k*PI/12, rk = r(th), g = Math.min(1, f/0.55), i, q, a, x0, y0, row, i0, yy;
      function pt(q, rr, col, rad){ c.fillStyle = col; c.beginPath(); c.arc(X(rr*Math.cos(q)), Y(rr*Math.sin(q)), rad, 0, 2*PI); c.fill(); }
      oaRej(S, 2);
      c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'center'; c.textBaseline = 'top'; c.fillText('1', X(1), Y(0) + 3); c.fillText('2', X(2), Y(0) + 3);
      /* curva fina por los puntos ya marcados */
      if (k > 1 || v.fin){ c.strokeStyle = C.sec; c.lineWidth = v.fin ? 1.5 : 0.9; c.globalAlpha = v.fin ? 1 : 0.45; c.beginPath();
        if (v.fin){ for (i = 0; i <= 240; i++){ q = 2*PI*i/240; if (i) c.lineTo(X(r(q)*Math.cos(q)), Y(r(q)*Math.sin(q))); else c.moveTo(X(0), Y(0)); } }
        else { for (i = 0; i < k; i++){ q = i*PI/12; if (i) c.lineTo(X(r(q)*Math.cos(q)), Y(r(q)*Math.sin(q))); else c.moveTo(X(0), Y(0)); } }
        c.stroke(); c.globalAlpha = 1; }
      /* puntos anteriores */
      for (i = 0; i < k; i++) pt(i*PI/12, r(i*PI/12), C.sec, 2.4);
      /* paso actual: rayo, ángulo, distancia, punto */
      S.line(0, 0, 2.15*Math.cos(th), 2.15*Math.sin(th), {color:C.rise, width:1.1});
      if (k){ c.strokeStyle = C.rise; c.lineWidth = 1.3; c.beginPath(); c.arc(X(0), Y(0), 17, 0, -th, true); c.stroke(); }
      S.line(0, 0, g*rk*Math.cos(th), g*rk*Math.sin(th), {color:C.tan, width:2});
      if (g >= 1) pt(th, rk, C.sec, 3.4);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.2, 0, 2*PI); c.fill();
      a = th; x0 = X(2.15*Math.cos(a)) + 20*Math.cos(a); y0 = Y(2.15*Math.sin(a)) - 11*Math.sin(a);
      if (Math.cos(a) > 0.9){ x0 = X(1.5); y0 = Y(1.5*Math.sin(a)) - 12; } txt('θ = ' + fr(k), Math.max(x0, X(-3.1) + 40), y0, 'center', C.rise);
      /* tabla */
      x0 = X(4.9); yy = Y(2.05); c.font = '600 11.5px "Source Sans 3", system-ui, sans-serif'; c.textBaseline = 'middle';
      c.fillStyle = C.rise; c.textAlign = 'right'; c.fillText('θ', x0 - 78, yy); c.fillStyle = C.sec; c.fillText('r = 1 − cos θ', x0, yy);
      c.strokeStyle = C.grid; c.lineWidth = 1; c.beginPath(); c.moveTo(x0 - 122, yy + 9); c.lineTo(x0, yy + 9); c.stroke();
      i0 = Math.max(0, k - 8);
      for (i = i0; i <= k; i++){ row = yy + 20 + (i - i0 + (i0 > 0 ? 1 : 0))*16; if (i === k && g < 1) continue; c.font = (i === k ? '700' : '500') + ' 11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = i === k ? C.rise : C.ink; c.textAlign = 'right'; c.fillText(fr(i), x0 - 78, row); c.fillStyle = i === k ? C.sec : C.ink; c.fillText(dec(r(i*PI/12), 2), x0, row); }
      if (i0 > 0){ c.fillStyle = C.ink; c.textAlign = 'right'; c.font = '500 11px "Source Sans 3", system-ui, sans-serif'; c.fillText('⋮', x0 - 78, yy + 20); c.fillText('⋮', x0, yy + 20); }
      /* datos del paso */
      x0 = X(-3.0); y0 = Y(-2.35);
      txt('paso ' + k + ' de 24: θ = ' + fr(k) + ' rad = ' + (15*k) + '°', x0, y0, 'left', C.rise);
      txt('cos θ = ' + dec(Math.cos(th), 2), x0, y0 + 21, 'left', C.ink);
      txt('r = 1 − cos θ = 1 − (' + dec(Math.cos(th), 2) + ') = ' + dec(rk, 2), x0, y0 + 42, 'left', C.tan);
      txt('punto polar (r, θ) = (' + dec(rk, 2) + '; ' + fr(k) + ')', x0, y0 + 63, 'left', C.sec);
      S.lab('F', X(-3.0), Y(2.0), 0, 0, true);
    },
    caption:function(v){
      var k = Math.round(v.n || 0), th = k*PI/12;
      if (v.fin) return 'Con los 25 puntos marcados ya se ve la forma: una cardioide. La curva fina pasa por todos ellos. Mientras más ángulos se usen, mejor queda dibujada';
      if (!k) return 'Se parte en θ = 0: cos 0 = 1, así que r = 1 − 1 = 0. El primer punto es el polo. En cada paso el ángulo crece π/12 (15°)';
      return 'Paso ' + k + ': se gira el rayo hasta θ = ' + fr(k) + ', se calcula r = 1 − cos θ = ' + dec(r(th), 2) + ', se mide esa distancia desde el polo y se marca el punto';
    },
    readout:function(v){ var k = Math.round(v.n || 0), th = k*PI/12; return [['', '\\theta_{k}=k\\cdot\\dfrac{\\pi}{12},\\quad k=0,\\,1,\\,2,\\,\\dots,\\,24'], ['d', 'k=' + k + ':\\quad\\theta=' + frT(k) + '\\quad\\Longrightarrow\\quad r=1-\\cos\\theta\\approx ' + OA.num(r(th), 2)], ['', '\\text{punto en cartesianas: }x=r\\cos\\theta\\approx ' + OA.num(r(th)*Math.cos(th), 2) + ',\\quad y=r\\operatorname{sen}\\theta\\approx ' + OA.num(r(th)*Math.sin(th), 2)]]; }
  };
})());
