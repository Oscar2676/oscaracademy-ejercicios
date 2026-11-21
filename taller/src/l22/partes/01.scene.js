OA.scene('apl-area-y', (function(){
  var RUN = 22, num = OA.num;
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  function A(y){ return y*y/2 + 2*y - y*y*y/3 + 7/6; }
  function ys(s){ return s < 2 ? -1 : s < 19 ? -1 + 3*OA.smooth((s - 2)/17) : 2; }
  return {
    world:{x0:-0.9, x1:5.6, y0:-1.9, y1:2.9}, aspect:4.8/6.5,
    _chk:[{f:A, df:function(y){ return y + 2 - y*y; }, at:[-0.5, 0, 1, 1.5]}],
    aria:'La parábola azul x igual a y al cuadrado, abierta hacia la derecha, y la recta naranja x igual a y más 2 se cruzan en los puntos (1, −1) y (4, 2). Una tira horizontal burdeo, que va de la parábola a la recta, sube desde y igual a −1 hasta y igual a 2 y deja pintada de verde el área recorrida, que al final vale nueve medios.',
    labels:[['F', 'A=\\displaystyle\\int_{-1}^{2}\\Big[(y+2)-y^{2}\\Big]dy=\\dfrac{9}{2}', 'A = ∫ de −1 a 2 de [(y + 2) − y²] dy = 9/2', 'diff']],
    sliders:[{id:'y', tex:'y', min:-1, max:2, step:0.01, value:-1}],
    legend:'<span><i class="sw sec"></i> \\(x=y^{2}\\)</span><span><i class="sw rise"></i> \\(x=y+2\\)</span><span><i class="sw tan"></i> tira</span><span><i class="sw alt"></i> área acumulada</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.y = ys(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, y = v.y, C = S.C, c = S.ctx, X = S.X, Y = S.Y, i, u, pts = [];
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.axes({gx:[1, 2, 3, 4, 5], gy:[-1, 1, 2]});
      /* área acumulada: por la parábola de −1 a y, y de vuelta por la recta */
      if (y > -0.995){ for (i = 0; i <= 60; i++){ u = -1 + (y + 1)*i/60; pts.push([u*u, u]); } pts.push([y + 2, y]); pts.push([1, -1]); S.poly(pts, {fill:C.alt, alpha:0.45}); }
      /* parábola x = y², como curva paramétrica */
      c.strokeStyle = C.sec; c.lineWidth = 2.6; c.setLineDash([]); c.beginPath();
      for (i = 0; i <= 200; i++){ u = -1.75 + 4.2*i/200; if (i) c.lineTo(X(u*u), Y(u)); else c.moveTo(X(u*u), Y(u)); } c.stroke();
      S.line(0.25, -1.75, 4.6, 2.6, {color:C.rise, width:2.6});
      S.line(-0.6, -1, 1, -1, {color:C.muted, width:1, dash:[3, 4]}); S.line(-0.6, 2, 4, 2, {color:C.muted, width:1, dash:[3, 4]}); c.setLineDash([]);
      S.dot(1, -1, C.ink); S.dot(4, 2, C.ink);
      txt('(1, −1)', X(1) + 10, Y(-1) + 14, 'left', C.ink); txt('(4, 2)', X(4) + 10, Y(2) + 2, 'left', C.ink);
      txt('x = y²', X(2.5), Y(-1.22), 'left', C.sec); txt('x = y + 2', X(1.9) + 10, Y(-0.35), 'left', C.rise);
      txt('c = −1', X(-0.6), Y(-1) - 11, 'left', C.muted); txt('d = 2', X(-0.6), Y(2) + 11, 'left', C.muted);
      /* tira a la altura y */
      var DY = 0.13, yb = Math.max(-1, y - DY); S.poly([[y*y, yb], [y + 2, yb], [y + 2, y], [y*y, y]], {fill:C.tan, alpha:0.85}); S.line(y*y, yb, y + 2, yb, {color:C.ink, width:1.2}); S.line(y*y, y, y + 2, y, {color:C.ink, width:1.2}); S.line(y*y, yb, y*y, y, {color:C.ink, width:1.2}); S.line(y + 2, yb, y + 2, y, {color:C.ink, width:1.2});
      S.dot(y*y, y, C.sec); S.dot(y + 2, y, C.rise);
      if (y > -0.86){ c.strokeStyle = C.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(y + 2) + 10, Y(yb)); c.lineTo(X(y + 2) + 10, Y(y)); c.moveTo(X(y + 2) + 6, Y(yb)); c.lineTo(X(y + 2) + 14, Y(yb)); c.moveTo(X(y + 2) + 6, Y(y)); c.lineTo(X(y + 2) + 14, Y(y)); c.stroke(); txt('dy', X(y + 2) + 27, Y((y + yb)/2), 'center', C.ink); }
      if (y > -0.9 && y < 1.9){
        txt('largo = (y + 2) − y² = ' + dec(y + 2 - y*y, 2), X((y*y + y + 2)/2), Y(y) - 14, 'center', C.tan);
        txt('altura y = ' + dec(y, 2), X(y + 2) + 42, Y(y) + 1, 'left', C.ink);
      }
      S.lab('F', X(-0.75), Y(2.72), 0, 0, v.q != null && s >= 19);
    },
    caption:function(v){
      var y = v.y, s = v.q == null ? null : v.q*RUN;
      if (s != null && s < 2) return 'La parábola x = y² es el borde izquierdo; la recta x = y + 2, el derecho. Se cruzan en (1, −1) y (4, 2). La tira horizontal va a subir de un cruce al otro';
      if (y >= 1.995) return 'La tira llegó al cruce de arriba. El área de la región es 9/2, es decir, 4,5 unidades cuadradas';
      return 'A la altura y = ' + dec(y, 2) + ' la tira mide ' + dec(y + 2 - y*y, 2) + ' de largo. El área pintada desde y = −1 es cerca de ' + dec(A(y), 2);
    },
    readout:function(v){ var y = v.y; return [['', '\\text{tira a la altura }t:\\quad dA=\\Big[(t+2)-t^{2}\\Big]\\,dt'], ['d', '\\text{suma de las tiras desde }t=-1\\text{ hasta }t=y:\\quad A(y)=\\displaystyle\\int_{-1}^{y}\\Big[(t+2)-t^{2}\\Big]dt=\\dfrac{y^{2}}{2}+2y-\\dfrac{y^{3}}{3}+\\dfrac{7}{6}'], ['', 'y=' + num(y, 2) + ':\\quad A(y)\\approx ' + num(A(y), 2) + '\\qquad y=2:\\quad A(2)=\\dfrac{9}{2}']]; }
  };
})());
