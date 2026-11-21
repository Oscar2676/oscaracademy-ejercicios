OA.scene('anti-basicas', (function(){
  var RUN = 22, num = OA.num, CS = [-2, -1, 0, 1, 2, 3];
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function F(x, C){ return x*x/2 + C; }
  function est(s){ if (s < 2) return [1.5, 0]; if (s < 9) return [1.5, 3*Math.sin((s - 2)/7*2*Math.PI)*0.83]; if (s < 10) return [1.5, 0]; if (s < 18) return [1.5 - 3.3*OA.smooth((s - 10)/8), 0]; return [-1.8 + 3.3*OA.smooth(cl((s - 18)/3)), 1]; }
  return {
    world:{x0:-3.3, x1:3.3, y0:-3.2, y1:6.2}, aspect:9.4/6.6*0.8,
    _chk:[{f:function(x){ return F(x, 0); }, df:function(x){ return x; }, at:[-2, -1, 0.5, 1.5]}],
    aria:'Una familia de parábolas iguales, desplazadas hacia arriba y hacia abajo: las antiderivadas de f de x igual a x. En un mismo valor de x, las tangentes a todas ellas son paralelas.',
    labels:[['F', '\\displaystyle\\int x\\,dx=\\dfrac{x^{2}}{2}+C', '∫ x dx = x²/2 + C', 'diff']],
    sliders:[{id:'x', tex:'x', min:-2.4, max:2.4, step:0.01, value:1.5}, {id:'C', tex:'C', min:-2.5, max:3.2, step:0.01, value:0}],
    legend:'<span><i class="sw alt"></i> \\(F(x)=\\dfrac{x^{2}}{2}+C\\)</span><span><i class="sw rise"></i> tangentes, pendiente \\(x\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ var e = est(p*RUN); v.q = p; v.x = e[0]; v.C = e[1]; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, Cc = v.C, C = S.C, c = S.ctx, X = S.X, Y = S.Y, d = 0.55;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[-3, -2, -1, 1, 2, 3], gy:[-2, 2, 4, 6]});
      CS.forEach(function(k){ S.curve(function(u){ return F(u, k); }, -3.2, 3.2, {color:C.muted, width:1.3}); S.line(x - d, F(x, k) - d*x, x + d, F(x, k) + d*x, {color:C.rise, width:1.6}); S.dot(x, F(x, k), C.muted); });
      S.curve(function(u){ return F(u, Cc); }, -3.2, 3.2, {color:C.alt, width:2.8});
      S.line(x - d, F(x, Cc) - d*x, x + d, F(x, Cc) + d*x, {color:C.rise, width:3});
      S.line(x, -3.1, x, 6.1, {color:C.muted, width:1, dash:[3, 4]});
      S.dot(x, F(x, Cc), C.alt);
      txt('C = ' + dec(Cc, 2), X(3.15), Y(5.7), 'right', C.alt);
      txt('x = ' + dec(x, 2) + ': pendiente ' + dec(x, 2), X(x) + (x > 0.8 ? -8 : 8), Y(-2.6), x > 0.8 ? 'right' : 'left', C.rise);
      S.lab('F', X(-3.1), Y(5.7), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'Curvas grises y curva verde: antiderivadas de f(x) = x. Trazos naranjas: sus tangentes en un mismo x';
      if (s != null && s < 10) return 'Cambiar C sube o baja la curva verde. Su tangente se desplaza, pero sigue paralela a las demás: la pendiente no depende de C';
      return 'En x = ' + dec(v.x, 2) + ', todas las antiderivadas tienen la misma pendiente, ' + dec(v.x, 2) + ': el valor de f en ese x';
    },
    readout:function(v){ return [['', 'F(x)=\\dfrac{x^{2}}{2}+C'], ['d', 'F\'(x)=x\\quad\\text{para todo }C'], ['', 'x=' + num(v.x, 2) + ':\\quad F\'(x)=' + num(v.x, 2)]]; }
  };
})());
