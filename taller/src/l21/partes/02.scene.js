OA.scene('int-propiedades', (function(){
  var RUN = 22, num = OA.num;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function f(x){ return x*x/4 + 1; } function F(x){ return x*x*x/12 + x; }
  function bs(s){ return s < 2 ? 1 : s < 9 ? 1 + 2.5*OA.smooth((s - 2)/7) : s < 16 ? 3.5 - 3*OA.smooth((s - 9)/7) : s < 19 ? 0.5 + OA.smooth((s - 16)/3) : 1.5; }
  return {
    world:{x0:-0.8, x1:4.9, y0:-1.3, y1:6.2}, aspect:7.5/5.7*0.78,
    _chk:[{f:F, df:f, at:[0.5, 1, 2, 3.5]}],
    aria:'Bajo la curva azul f de x igual a x al cuadrado sobre 4 más 1, entre 0 y 4, el área se corta en dos partes en un punto b que se mueve: verde a la izquierda de b y naranja a la derecha. Las dos partes cambian de tamaño, pero su suma es siempre el área completa, 28 tercios.',
    labels:[['F', '\\displaystyle\\int_{0}^{b}f+\\int_{b}^{4}f=\\int_{0}^{4}f=\\dfrac{28}{3}', '∫ de 0 a b + ∫ de b a 4 = ∫ de 0 a 4 = 28/3', 'diff']],
    sliders:[{id:'b', tex:'b', min:0, max:4, step:0.01, value:1}],
    legend:'<span><i class="sw sec"></i> \\(f(x)=\\dfrac{x^{2}}{4}+1\\)</span><span><i class="sw alt"></i> de \\(0\\) a \\(b\\)</span><span><i class="sw rise"></i> de \\(b\\) a \\(4\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.b = bs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, b = v.b, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, pa = [[0, 0]], pb = [[b, 0]];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 3, 4], gy:[1, 2, 3, 4, 5]});
      for (i = 0; i <= 40; i++) pa.push([b*i/40, f(b*i/40)]); pa.push([b, 0]);
      for (i = 0; i <= 40; i++) pb.push([b + (4 - b)*i/40, f(b + (4 - b)*i/40)]); pb.push([4, 0]);
      if (b > 0.01) S.poly(pa, {fill:C.alt, alpha:0.45}); if (b < 3.99) S.poly(pb, {fill:C.rise, alpha:0.45});
      S.curve(f, -0.5, 4.5, {color:C.sec, width:2.6});
      S.line(0, 0, 0, f(0), {color:C.ink, width:1.5}); S.line(4, 0, 4, f(4), {color:C.ink, width:1.5}); S.line(b, 0, b, f(b), {color:C.ink, width:2.4});
      S.dot(b, 0, C.ink);
      txt('a = 0', X(0), Y(0) + 26, 'center', C.ink); txt('c = 4', X(4), Y(0) + 26, 'center', C.ink); txt('b = ' + dec(b, 2), X(b), Y(0) + 42, 'center', C.ink);
      if (b > 0.7) txt(dec(F(b), 2), X(b/2), Y(0.55), 'center', C.alt);
      if (b < 3.4) txt(dec(F(4) - F(b), 2), X((b + 4)/2), Y(0.55), 'center', C.rise);
      S.lab('F', X(-0.6), Y(5.75), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var b = v.b, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curva azul: f. El punto b corta el área entre 0 y 4 en dos partes: verde, de 0 a b; naranja, de b a 4';
      return 'Con b = ' + dec(b, 2) + ': la parte verde mide cerca de ' + dec(F(b), 2) + ' y la naranja cerca de ' + dec(F(4) - F(b), 2) + ', con dos decimales. La suma no cambia: 28/3, cerca de ' + dec(F(4), 2);
    },
    readout:function(v){ var b = v.b; return [['', '\\displaystyle\\int_{0}^{b}f(x)\\,dx=\\dfrac{b^{3}}{12}+b\\approx ' + num(F(b), 2)], ['d', '\\displaystyle\\int_{b}^{4}f(x)\\,dx=\\dfrac{28}{3}-\\dfrac{b^{3}}{12}-b\\approx ' + num(F(4) - F(b), 2)], ['', '\\displaystyle\\int_{0}^{b}f(x)\\,dx+\\int_{b}^{4}f(x)\\,dx=\\dfrac{28}{3}']]; }
  };
})());
