OA.scene('bn-desarrollo', (function(){
  var CX = [0.4, 1.9, 3.9, 5.7, 7.7], HD = ['k', 'coeficiente', '(2x)⁴⁻ᵏ', '3ᵏ', 'término'];
  function row(k){ var cf = bnC(4, k), pa = Math.pow(2, 4 - k), pb = Math.pow(3, k), xs = bnPow('x', 4 - k); return ['' + k, 'C(4, ' + k + ') = ' + cf, (4 - k === 0 ? '(2x)⁰ = 1' : '(2x)' + (4 - k === 1 ? '¹' : bnSup(4 - k)) + ' = ' + (pa === 1 ? '' : pa) + xs), '3' + bnSup(k) + ' = ' + pb, (cf*pa*pb) + xs, cf, pa, pb]; }
  return {
    world:{x0:-0.3, x1:8.9, y0:-4.2, y1:4.0}, aspect:8.2/9.2,
    aria:'Una tabla arma el desarrollo de 2x más 3 elevado a 4, fila por fila. Cada fila corresponde a un valor de k, de 0 a 4, y tiene el coeficiente binomial, la potencia de 2x, la potencia de 3 y el término que resulta de multiplicar los tres. Al final se suman los cinco términos: 16 x a la cuarta, más 96 x al cubo, más 216 x al cuadrado, más 216 x, más 81.',
    labels:[['F', '(2x+3)^{4}=16x^{4}+96x^{3}+216x^{2}+216x+81', '(2x + 3)⁴ = 16x⁴ + 96x³ + 216x² + 216x + 81', 'diff']],
    sliders:[{id:'m', tex:'\\text{fila}', min:1, max:5, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> la fila que se está calculando</span><span><i class="sw tan"></i> el término que resulta</span>',
    anim:{run:24000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.m = Math.min(5, 1 + Math.floor(p*6.6)); v.fin = p*6.6 >= 5.6; }},
    onInput:function(v){ v.q = null; v.fin = v.m >= 5; },
    draw:function(S, v){
      var m = Math.round(v.m || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, j, r, x0, y0, col;
      function cell(t, x, y, cc, b){ c.font = (b ? '700 ' : '500 ') + '11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      for (j = 0; j < 5; j++) cell(HD[j], CX[j], 3.5, C.ink, true);
      c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(-0.1), Y(3.5) + 11); c.lineTo(X(8.7), Y(3.5) + 11); c.stroke();
      for (i = 0; i < m; i++){ r = row(i); col = i === m - 1 && !v.fin ? C.rise : C.ink; for (j = 0; j < 4; j++) cell(r[j], CX[j], 2.75 - 0.68*i, col, i === m - 1 && !v.fin); cell(r[4], CX[4], 2.75 - 0.68*i, C.tan, true); }
      r = row(m - 1); x0 = X(-0.2); y0 = Y(-1.0);
      txt('término k = ' + (m - 1) + ': ' + r[5] + ' · ' + r[6] + bnPow('x', 5 - m) + ' · ' + r[7] + ' = ' + r[4], x0, y0, 'left', C.rise);
      if (v.fin){ txt('(2x + 3)⁴ = 16x⁴ + 96x³ + 216x² + 216x + 81', x0, y0 + 21, 'left', C.tan); txt('con x = 1: 5⁴ = 625 y 16 + 96 + 216 + 216 + 81 = 625', x0, y0 + 42, 'left', C.ink); }
      S.lab('F', x0, y0 + 70, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var m = Math.round(v.m || 1), r = row(m - 1); if (v.fin) return 'Los cinco términos, sumados, son el desarrollo. La comprobación con x = 1 da 625 a los dos lados'; return 'Fila k = ' + (m - 1) + ': el coeficiente binomial, por la potencia de 2x (con paréntesis: el 2 también se eleva), por la potencia de 3. Resultado: ' + r[4]; },
    readout:function(v){ var m = Math.round(v.m || 1), k = m - 1, r = row(k); return [['', 'T_{' + m + '}=\\dbinom{4}{' + k + '}(2x)^{' + (4 - k) + '}\\,3^{' + k + '}=' + r[5] + '\\cdot ' + r[6] + (4 - k ? 'x^{' + (4 - k) + '}' : '') + '\\cdot ' + r[7] + '=' + (r[5]*r[6]*r[7]) + (4 - k ? 'x^{' + (4 - k) + '}' : '')]]; }
  };
})());
