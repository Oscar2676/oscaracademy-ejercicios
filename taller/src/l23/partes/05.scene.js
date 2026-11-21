OA.scene('pol-area', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, K = oaCar, TP = 2*Math.PI;
  function A(q){ return 0.5*(1.5*q + 2*Math.sin(q) + Math.sin(2*q)/4); }
  return {
    world:{x0:-1.5, x1:2.9, y0:-2.4, y1:1.75}, aspect:4.15/4.4,
    _chk:[{f:A, df:function(q){ return 0.5*K.r(q)*K.r(q); }, at:[0.5, 2, 4, 5.5]}],
    aria:'La cardioide r igual a 1 más coseno de theta sobre una rejilla polar. Un rayo naranja gira desde theta igual a 0 y va barriendo la región: lo barrido queda pintado de verde. Junto al rayo se destaca en burdeo un sector delgado, con forma de cuña, de ángulo d theta. Al completar la vuelta, el área pintada vale 3 pi medios.',
    labels:[['F', 'A=\\displaystyle\\int_{0}^{2\\pi}\\dfrac{1}{2}\\,(1+\\cos\\theta)^{2}\\,d\\theta=\\dfrac{3\\pi}{2}', 'A = ∫ de 0 a 2π de ½(1 + cos θ)² dθ = 3π/2', 'diff']],
    sliders:[{id:'th', tex:'\\theta', min:0, max:6.2832, step:0.01, value:0.02}],
    legend:'<span><i class="sw sec"></i> \\(r=1+\\cos\\theta\\)</span><span><i class="sw rise"></i> rayo de largo \\(r\\)</span><span><i class="sw tan"></i> cuña de ángulo \\(d\\theta\\)</span><span><i class="sw alt"></i> área barrida</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.th = K.ts(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? RUN : v.q*RUN, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x = K.x(th), y = K.y(th), i, q, pts = [[0, 0]], d = 0.16, w = [[0, 0]];
      oaRej(S, 2);
      for (i = 0; i <= 160; i++){ q = th*i/160; pts.push([K.x(q), K.y(q)]); } S.poly(pts, {fill:C.alt, alpha:0.45});
      for (i = 0; i <= 12; i++){ q = th + d*i/12; w.push([K.r(th)*Math.cos(q), K.r(th)*Math.sin(q)]); } if (th < TP - 0.01) S.poly(w, {fill:C.tan, alpha:0.75});
      oaPar(S, K.x, K.y, 0, TP, C.sec, 2.8);
      S.line(0, 0, x, y, {color:C.rise, width:3.2}); S.dot(0, 0, C.ink); S.dot(x, y, C.rise);
      if (th < TP - 0.01 && K.r(th) > 0.45){ c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.arc(X(0), Y(0), Math.abs(X(K.r(th)) - X(0)) + 8, -th, -(th + d), true); c.stroke(); txt('dθ', X((K.r(th))*Math.cos(th + d/2)) + 22*Math.cos(th + d/2), Y((K.r(th))*Math.sin(th + d/2)) - 22*Math.sin(th + d/2), 'center', C.ink); }
      txt('θ = ' + dec(th, 2) + ' rad,  r = ' + dec(K.r(th), 2), X(-1.45), Y(1.55), 'left', C.rise);
      txt('cuña: dA = ½ r² dθ', X(-1.45), Y(1.55) + 20, 'left', C.tan);
      txt('área barrida ≈ ' + dec(A(th), 2), X(-1.45), Y(1.55) + 40, 'left', C.alt);
      S.lab('F', X(-1.45), Y(-1.8), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var th = v.th == null ? 0.02 : v.th, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'El rayo va a girar y a barrer la región encerrada por la cardioide. En cada instante agrega una cuña delgada: un sector de círculo de radio r y ángulo dθ';
      if (th >= 6.28) return 'El rayo completó la vuelta. El área encerrada por la cardioide es 3π/2, cerca de 4,71 unidades cuadradas';
      return 'En θ = ' + dec(th, 2) + ' el rayo mide r = ' + dec(K.r(th), 2) + '. La cuña que agrega mide ½ r² dθ: con rayo largo aporta mucho; con rayo corto, casi nada. Área barrida: cerca de ' + dec(A(th), 2);
    },
    readout:function(v){ var th = v.th == null ? 0.02 : v.th; return [['', 'dA=\\dfrac{1}{2}\\,r^{2}\\,d\\theta=\\dfrac{1}{2}\\,(1+\\cos\\theta)^{2}\\,d\\theta'], ['d', '\\displaystyle\\int_{0}^{\\theta}\\dfrac{1}{2}(1+\\cos u)^{2}\\,du=\\dfrac{1}{2}\\left(\\dfrac{3\\theta}{2}+2\\operatorname{sen}\\theta+\\dfrac{\\operatorname{sen}2\\theta}{4}\\right)'], ['', '\\theta=' + num(th, 2) + ':\\quad \\text{área barrida}\\approx ' + num(A(th), 2) + '\\ \\longrightarrow\\ \\dfrac{3\\pi}{2}']]; }
  };
})());
