OA.scene('int-parciales', (function(){
  var RUN = 22, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function p1(x){ return 2/(x - 1); } function p2(x){ return -1/(x + 3); } function f(x){ return (x + 7)/((x - 1)*(x + 3)); }
  function xs(s){ return s < 2 ? 1.6 : s < 15 ? 1.6 + 5.4*OA.smooth((s - 2)/13) : s < 17 ? 7 : 7 - 4*OA.smooth(cl((s - 17)/3)); }
  return {
    world:{x0:-0.6, x1:7.6, y0:-0.9, y1:3.9}, aspect:4.8/8.2,
    aria:'Para x mayor que 1, tres curvas: la verde, 2 partido por x menos 1, positiva; la burdeo, menos 1 partido por x más 3, negativa; y la azul, la fracción completa, que es la suma de las otras dos. En cada x, la altura azul es la altura verde más la altura burdeo.',
    labels:[['F', '\\dfrac{x+7}{(x-1)(x+3)}=\\dfrac{2}{x-1}-\\dfrac{1}{x+3}', '(x+7)/((x−1)(x+3)) = 2/(x−1) − 1/(x+3)', 'diff']],
    sliders:[{id:'x', tex:'x', min:1.6, max:7, step:0.01, value:1.6}],
    legend:'<span><i class="sw sec"></i> fracción completa</span><span><i class="sw alt"></i> \\(\\dfrac{2}{x-1}\\)</span><span><i class="sw tan"></i> \\(-\\dfrac{1}{x+3}\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 3, 4, 5, 6, 7], gy:[1, 2, 3]});
      S.line(1, -0.85, 1, 3.85, {color:C.muted, width:1.2, dash:[4, 4]}); txt('x = 1', X(1), Y(3.6), 'center', C.muted);
      S.curve(p1, 1.52, 7.5, {color:C.alt, width:2}); S.curve(p2, 1.02, 7.5, {color:C.tan, width:2}); S.curve(f, 1.46, 7.5, {color:C.sec, width:2.8});
      /* alturas: verde desde el eje; burdeo desde el eje y también trasladada sobre la punta de la verde */
      S.line(x - 0.05, 0, x - 0.05, p1(x), {color:C.alt, width:4}); S.line(x + 0.05, 0, x + 0.05, p2(x), {color:C.tan, width:4});
      S.line(x + 0.05, p1(x), x + 0.05, p1(x) + p2(x), {color:C.tan, width:4});
      S.line(x - 0.05, p1(x), x + 0.05, p1(x), {color:C.muted, width:1});
      S.dot(x - 0.05, p1(x), C.alt); S.dot(x + 0.05, p2(x), C.tan); S.dot(x + 0.05, f(x), C.sec);
      txt(dec(p1(x), 2), X(x) - 12, Y(p1(x)) - 2, 'right', C.alt);
      txt(dec(p2(x), 2), X(x) + 14, Y(p2(x)) + 12, 'left', C.tan);
      txt('suma: ' + dec(f(x), 2), X(x) + 14, Y(f(x)) + 2, 'left', C.sec);
      S.lab('F', X(1.7), Y(3.3), 0, 0, v.q != null && s >= 20);
    },
    caption:function(v){
      var x = v.x, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva verde: 2/(x − 1). Curva burdeo: −1/(x + 3). Curva azul: la fracción completa, que es la suma de las dos';
      return 'En x = ' + dec(x, 2) + ': la altura verde, ' + dec(p1(x), 2) + ', más la burdeo, ' + dec(p2(x), 2) + ', da la azul, cerca de ' + dec(f(x), 2);
    },
    readout:function(v){ var x = v.x; return [['', '\\dfrac{2}{x-1}-\\dfrac{1}{x+3}=\\dfrac{x+7}{(x-1)(x+3)}'], ['d', 'x=' + num(x, 2) + ':\\quad\\dfrac{2}{' + num(x - 1, 2) + '}-\\dfrac{1}{' + num(x + 3, 2) + '}\\approx ' + num(p1(x), 2) + num(p2(x), 2) + '\\approx ' + num(f(x), 2)]]; }
  };
})());
