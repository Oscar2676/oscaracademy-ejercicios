OA.scene('bn-central', {
  world:{x0:-0.9, x1:8.9, y0:-5.2, y1:4.0}, aspect:9.2/9.8,
  aria:'Una barra por cada término del desarrollo de a más b elevado a n; la altura es el coeficiente. Las barras forman una figura simétrica que sube hasta el medio y luego baja. La barra del medio, en burdeo, es el término central y la más alta. Si n es impar hay dos barras centrales, iguales.',
  labels:[['F', 'n\\text{ par: }T_{\\frac{n}{2}+1}=\\dbinom{n}{n/2}\\,a^{\\,n/2}\\,b^{\\,n/2}', 'n par: término central = C(n, n/2) a^(n/2) b^(n/2)', 'diff']],
  sliders:[{id:'n', tex:'n', min:2, max:8, step:1, value:6}],
  legend:'<span><i class="sw tan"></i> término central (o los dos centrales)</span><span><i class="sw sec"></i> los demás términos</span>',
  anim:{run:18000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.n = [6, 6, 7, 7, 8, 8][Math.min(5, Math.floor(p*6))]; }},
  onInput:function(v){ v.q = null; },
  draw:function(S, v){
    var n = Math.round(v.n || 6), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), mx = bnC(n, Math.floor(n/2)), off = (8 - n)/2, i, h, x, x0, y0, c1 = Math.floor(n/2), c2 = Math.ceil(n/2), cen, par = n % 2 === 0;
    function sm(t, px, py, cc, b){ c.font = (b ? '700 ' : '600 ') + '12px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
    c.strokeStyle = C.ink; c.lineWidth = 1.1; c.beginPath(); c.moveTo(X(off - 0.6), Y(0)); c.lineTo(X(off + n + 0.6), Y(0)); c.stroke();
    for (i = 0; i <= n; i++){ cen = i === c1 || i === c2; h = 3*bnC(n, i)/mx; x = off + i; S.poly([[x - 0.3, 0], [x + 0.3, 0], [x + 0.3, h], [x - 0.3, h]], {fill:cen ? C.tan : C.sec, alpha:cen ? 0.85 : 0.4}); sm('' + bnC(n, i), X(x), Y(h) - 10, cen ? C.tan : C.ink, cen); sm((i + 1) + 'º', X(x), Y(0) + 12, cen ? C.tan : (C.muted || '#6b6b6b'), cen); sm('k = ' + i, X(x), Y(0) + 27, cen ? C.tan : (C.muted || '#6b6b6b'), cen); }
    x0 = X(-0.8); y0 = Y(-1.85);
    txt('n = ' + n + ': ' + (n + 1) + ' términos', x0, y0, 'left', C.ink);
    if (par){ txt('n par: un término central, con k = n/2 = ' + c1 + ' (posición ' + (c1 + 1) + ')', x0, y0 + 21, 'left', C.tan); txt('coeficiente: C(' + n + ', ' + c1 + ') = ' + bnC(n, c1) + ', el mayor de todos', x0, y0 + 42, 'left', C.ink); txt('término central: ' + bnTerm(n, c1), x0, y0 + 63, 'left', C.tan); }
    else { txt('n impar: dos centrales, k = ' + c1 + ' y k = ' + c2 + ' (posiciones ' + (c1 + 1) + ' y ' + (c2 + 1) + ')', x0, y0 + 21, 'left', C.tan); txt('coeficientes: C(' + n + ', ' + c1 + ') = C(' + n + ', ' + c2 + ') = ' + bnC(n, c1), x0, y0 + 42, 'left', C.ink); txt('términos centrales: ' + bnTerm(n, c1) + '  y  ' + bnTerm(n, c2), x0, y0 + 63, 'left', C.tan); }
    S.lab('F', x0, y0 + 92, 0, 0, par);
  },
  caption:function(v){ var n = Math.round(v.n || 6); return n % 2 === 0 ? 'Con n = ' + n + ' hay ' + (n + 1) + ' términos, un número impar: uno queda justo al medio. Es el de coeficiente más grande' : 'Con n = ' + n + ' hay ' + (n + 1) + ' términos, un número par: al medio quedan dos, con el mismo coeficiente'; },
  readout:function(v){ var n = Math.round(v.n || 6), c1 = Math.floor(n/2), c2 = Math.ceil(n/2); return n % 2 === 0 ? [['d', 'T_{' + (c1 + 1) + '}=\\dbinom{' + n + '}{' + c1 + '}a^{' + c1 + '}b^{' + c1 + '}=' + bnC(n, c1) + '\\,a^{' + c1 + '}b^{' + c1 + '}']] : [['d', 'T_{' + (c1 + 1) + '}=' + bnC(n, c1) + '\\,a^{' + (n - c1) + '}b^{' + c1 + '}\\qquad T_{' + (c2 + 1) + '}=' + bnC(n, c2) + '\\,a^{' + (n - c2) + '}b^{' + c2 + '}']]; }
});
