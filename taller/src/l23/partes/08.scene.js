OA.scene('vec-derivada', (function(){
  var RUN = 24, num = OA.num, dec = oaDec, T0 = -1;
  function fx(t){ return t; } function fy(t){ return 4 - t*t; }
  function hs(s){ return s < 2 ? 1.6 : s < 19 ? 1.6 - 1.55*OA.smooth((s - 2)/17) : 0.05; }
  return {
    world:{x0:-3.6, x1:3.4, y0:-3.3, y1:6.4}, aspect:9.7/7,
    _chk:[{f:fy, df:function(t){ return -2*t; }, at:[-1.5, -1, 0.5]}],
    aria:'La parábola azul que dibuja el vector r de t igual a t, 4 menos t al cuadrado. Está fijo el punto r de −1, que es (−1, 3). Un segundo punto, r de −1 más h, se acerca al primero a medida que h se achica. Entre los dos puntos va la flecha verde delta r. Desde el punto fijo sale la flecha naranja delta r dividido por h, que gira hasta coincidir con la flecha burdeo r prima de −1, igual a 1, 2: el vector tangente.',
    labels:[['F', '\\vec r\\,\'(-1)=\\displaystyle\\lim_{h\\to 0}\\dfrac{\\vec r(-1+h)-\\vec r(-1)}{h}=\\lim_{h\\to 0}\\big\\langle 1,\;2-h\\big\\rangle=\\big\\langle 1,\;2\\big\\rangle', 'r′(−1) = lím ⟨1, 2 − h⟩ = ⟨1, 2⟩', 'diff']],
    sliders:[{id:'h', tex:'h', min:0.05, max:1.6, step:0.01, value:1.6}],
    legend:'<span><i class="sw sec"></i> curva de \\(\\vec r(t)\\)</span><span><i class="sw alt"></i> \\(\\Delta\\vec r=\\vec r(t_{0}+h)-\\vec r(t_{0})\\)</span><span><i class="sw rise"></i> \\(\\dfrac{\\Delta\\vec r}{h}\\)</span><span><i class="sw tan"></i> \\(\\vec r\\,\'(t_{0})\\), vector tangente</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.h = hs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, h = v.h, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x0 = fx(T0), y0 = fy(T0), x1 = fx(T0 + h), y1 = fy(T0 + h), qx = 1, qy = 2 - h;
      S.line(-3.4, 0, 3.2, 0, {color:C.ink, width:1.3}); S.line(0, -0.3, 0, 6.2, {color:C.ink, width:1.3}); [-2, -1, 1, 2].forEach(function(q){ S.line(q, -0.08, q, 0.08, {color:C.ink, width:1}); txt(('' + q).replace('-', '−'), X(q), Y(0) + 12, 'center', C.muted); }); [1, 2, 3, 4, 5].forEach(function(q){ S.line(-0.06, q, 0.06, q, {color:C.ink, width:1}); txt('' + q, X(0) + 9, Y(q), 'left', C.muted); });
      oaPar(S, fx, fy, -2.1, 2.1, C.sec, 2.6);
      oaFle(S, 0, 0, x0, y0, 'rgba(90,90,90,0.55)', 1.6); oaFle(S, 0, 0, x1, y1, 'rgba(90,90,90,0.55)', 1.6);
      oaFle(S, x0, y0, x0 + 1, y0 + 2, C.tan, 3.4);
      oaFle(S, x0, y0, x0 + qx, y0 + qy, C.rise, 2.6);
      oaFle(S, x0, y0, x1, y1, C.alt, 3);
      S.dot(x0, y0, C.ink); S.dot(x1, y1, C.alt);
      txt('r(t₀), con t₀ = −1', X(x0) - 10, Y(y0) + 2, 'right', C.ink);
      if (h > 0.3) txt('r(t₀ + h)', X(x1) + 12, Y(y1) + 4, 'left', C.alt);
      txt('r′(t₀) = ⟨1, 2⟩', X(x0 + 1) + 8, Y(y0 + 2) - 12, 'left', C.tan);
      if (h > 0.25) txt('Δr / h', X(x0 + qx/2) + 8, Y(y0 + qy/2) + 20, 'left', C.rise);
      txt('h = ' + dec(h, 2), X(-3.5), Y(-0.95), 'left', C.ink);
      txt('Δr = ⟨h, 2h − h²⟩ = ⟨' + dec(h, 2) + '; ' + dec(2*h - h*h, 2) + '⟩', X(-3.5), Y(-0.95) + 21, 'left', C.alt);
      txt('Δr / h = ⟨1, 2 − h⟩ = ⟨1; ' + dec(2 - h, 2) + '⟩', X(-3.5), Y(-0.95) + 42, 'left', C.rise);
      S.lab('F', X(-3.5), Y(-2.6), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var h = v.h, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'El punto negro es r(−1) = (−1, 3). El punto verde es r(−1 + h). La flecha verde, Δr, es el cambio del vector. Dividida por h da la flecha naranja. Mira qué le pasa a la naranja cuando h se achica';
      if (h <= 0.055) return 'Con h casi cero, la flecha naranja Δr/h quedó sobre la burdeo: ⟨1, 2⟩. Ese límite es la derivada r′(−1), y es tangente a la curva en ese punto';
      return 'Con h = ' + dec(h, 2) + ': Δr = ⟨' + dec(h, 2) + '; ' + dec(2*h - h*h, 2) + '⟩ y Δr/h = ⟨1; ' + dec(2 - h, 2) + '⟩. La segunda componente se acerca a 2';
    },
    readout:function(v){ var h = v.h; return [['', '\\Delta\\vec r=\\vec r(-1+h)-\\vec r(-1)=\\big\\langle -1+h,\;4-(-1+h)^{2}\\big\\rangle-\\big\\langle -1,\;3\\big\\rangle=\\big\\langle h,\;2h-h^{2}\\big\\rangle'], ['d', '\\dfrac{\\Delta\\vec r}{h}=\\left\\langle\\dfrac{h}{h},\;\\dfrac{2h-h^{2}}{h}\\right\\rangle=\\big\\langle 1,\;2-h\\big\\rangle'], ['', 'h=' + num(h, 2) + ':\\quad\\dfrac{\\Delta\\vec r}{h}=\\big\\langle 1;\\ ' + num(2 - h, 2) + '\\big\\rangle\\ \\longrightarrow\\ \\big\\langle 1,\;2\\big\\rangle']]; }
  };
})());
