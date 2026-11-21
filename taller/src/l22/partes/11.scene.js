OA.scene('apl-longitud-arco', (function(){
  var RUN = 24, num = OA.num, NS = [1, 2, 3, 4, 6, 8, 12, 20, 40];
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function ch(x){ return (Math.exp(x) + Math.exp(-x))/2; } function sh(x){ return (Math.exp(x) - Math.exp(-x))/2; }
  function Ln(n){ var i, L = 0, xa, xb; for (i = 0; i < n; i++){ xa = -2 + 4*i/n; xb = -2 + 4*(i + 1)/n; L += Math.sqrt((xb - xa)*(xb - xa) + (ch(xb) - ch(xa))*(ch(xb) - ch(xa))); } return L; }
  var EX = 2*sh(2);
  return {
    world:{x0:-2.9, x1:2.9, y0:-1.7, y1:4.5}, aspect:0.98,
    _chk:[{f:sh, df:function(x){ return Math.sqrt(1 + sh(x)*sh(x)); }, at:[-1.5, -0.5, 0.5, 1.5]}, {f:ch, df:sh, at:[-1.5, -0.5, 0.5, 1.5]}],
    aria:'La curva azul y igual a coseno hiperbólico de x, con forma de cable colgante, entre x igual a menos 2 y x igual a 2. Sobre ella se dibuja una línea quebrada naranja de n tramos rectos, con los vértices en la curva. Al aumentar n de 1 a 40, la quebrada se pega a la curva y su largo crece desde 4 hacia el largo exacto de la curva, 2 seno hiperbólico de 2, cerca de 7,254.',
    labels:[['F', 'L=\\displaystyle\\int_{-2}^{2}\\cosh x\\,dx=2\\operatorname{senh}2', 'L = ∫ cosh x dx = 2 senh 2', 'diff']],
    sliders:[{id:'n', tex:'n', min:1, max:40, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(y=\\cosh x\\)</span><span><i class="sw rise"></i> quebrada de \\(n\\) tramos</span><span><i class="sw tan"></i> un tramo: \\(\\Delta x\\), \\(\\Delta y\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; var s = p*RUN; v.n = s < 2 ? 1 : NS[Math.min(NS.length - 1, Math.floor((s - 2)/2))]; }},
    onInput:function(v){ v.q = null; v.n = Math.round(v.n); },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, n = Math.round(v.n), C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, xa, xb, k = Math.floor((n - 1)*0.72);
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xc = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.88)'; c.fillRect(xc, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[-2, -1, 1, 2], gy:[1, 2, 3, 4]});
      S.curve(ch, -2, 2, {color:C.sec, width:3});
      for (i = 0; i < n; i++){ xa = -2 + 4*i/n; xb = -2 + 4*(i + 1)/n; S.line(xa, ch(xa), xb, ch(xb), {color:C.rise, width:2.2}); }
      if (n <= 12) for (i = 0; i <= n; i++){ xa = -2 + 4*i/n; S.dot(xa, ch(xa), C.rise); }
      /* un tramo con su triángulo Δx, Δy */
      xa = -2 + 4*k/n; xb = -2 + 4*(k + 1)/n;
      if (n <= 8){ S.line(xa, ch(xa), xb, ch(xa), {color:C.tan, width:2, dash:[4, 3]}); S.line(xb, ch(xa), xb, ch(xb), {color:C.tan, width:2, dash:[4, 3]}); c.setLineDash([]);
        S.line(xa, ch(xa), xb, ch(xb), {color:C.tan, width:3.2});
        txt('Δx', X((xa + xb)/2), Y(ch(xa)) + 12, 'center', C.tan); txt('Δy', X(xb) + 14, Y((ch(xa) + ch(xb))/2), 'center', C.tan); }
      txt('y = cosh x', X(-1.75), Y(2.2), 'right', C.sec);
      txt('n = ' + n + ':  largo de la quebrada ≈ ' + dec(Ln(n), 3), X(-2.1), Y(-0.55), 'left', C.rise);
      txt('largo de la curva = 2 senh 2 ≈ ' + dec(EX, 3), X(-2.1), Y(-1.05), 'left', C.sec);
      S.lab('F', X(-1.3), Y(2.9), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var n = Math.round(v.n), s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'La curva azul es un cable colgante. Un solo tramo recto de punta a punta mide 4: es más corto que el cable. Con más tramos, la quebrada se irá pegando a la curva';
      return 'Con n = ' + n + (n === 1 ? ' tramo' : ' tramos') + ', la quebrada mide cerca de ' + dec(Ln(n), 3) + '. Le faltan ' + dec(EX - Ln(n), 3) + ' para el largo de la curva, ' + dec(EX, 3) + '. La quebrada siempre es más corta';
    },
    readout:function(v){ var n = Math.round(v.n); return [['', '\\text{un tramo:}\\quad\\sqrt{(\\Delta x)^{2}+(\\Delta y)^{2}}=\\sqrt{1+\\left(\\dfrac{\\Delta y}{\\Delta x}\\right)^{2}}\\,\\Delta x'], ['d', 'n=' + n + ':\\quad\\displaystyle\\sum_{i=1}^{n}\\sqrt{(\\Delta x)^{2}+(\\Delta y_{i})^{2}}\\approx ' + num(Ln(n), 3)], ['', 'n\\to\\infty:\\quad\\displaystyle\\int_{-2}^{2}\\sqrt{1+\\big[f\'(x)\\big]^{2}}\\,dx=2\\operatorname{senh}2\\approx ' + num(EX, 3)]]; }
  };
})());
