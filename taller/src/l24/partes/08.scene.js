OA.scene('bn-signos', (function(){
  function expo(n){ var s = '(a − b)' + bnSup(n) + ' = ', k; for (k = 0; k <= n; k++) s += (k === 0 ? '' : k % 2 ? ' − ' : ' + ') + bnTerm(n, k); return s; }
  function two(s){ var t, h; if (s.length <= 48) return [s]; t = s.split(/ (?=[+−] )/); h = Math.ceil(t.length/2); return [t.slice(0, h).join(' '), '      ' + t.slice(h).join(' ')]; }
  return {
    world:{x0:-0.9, x1:7.9, y0:-8.4, y1:3.3}, aspect:11.7/8.8,
    aria:'Una barra por cada término del desarrollo de a menos b elevado a n. Las barras de los términos con k par suben, en azul, y llevan signo más; las de k impar bajan, en burdeo, y llevan signo menos. Los signos se alternan: más, menos, más, menos. Bajo las barras van k y las potencias de a y de b.',
    labels:[['F', '(a-b)^{n}=\\displaystyle\\sum_{k=0}^{n}(-1)^{k}\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}', '(a − b)ⁿ = Σ (−1)ᵏ C(n, k) aⁿ⁻ᵏ bᵏ', 'diff']],
    sliders:[{id:'n', tex:'n', min:1, max:7, step:1, value:5}],
    legend:'<span><i class="sw sec"></i> términos positivos: \\(k\\) par</span><span><i class="sw tan"></i> términos negativos: \\(k\\) impar</span>',
    anim:{run:22000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.n = 5; v.k = Math.min(5, Math.floor(p*7.2)); v.fin = p*7.2 >= 6; }},
    onInput:function(v){ v.q = null; v.k = v.n; v.fin = true; },
    draw:function(S, v){
      var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), mx = bnC(n, Math.floor(n/2)), off = (7 - n)/2, i, h, x, x0, y0, cf, neg, col;
      function sm(t, px, py, cc, b){ c.font = (b ? '700 ' : '600 ') + '12px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      c.strokeStyle = C.ink; c.lineWidth = 1.1; c.beginPath(); c.moveTo(X(off - 0.6), Y(0)); c.lineTo(X(off + n + 0.6), Y(0)); c.stroke();
      for (i = 0; i <= k; i++){ cf = bnC(n, i); neg = i % 2 === 1; h = 2.4*cf/mx*(neg ? -1 : 1); x = off + i; col = neg ? C.tan : C.sec;
        S.poly([[x - 0.3, 0], [x + 0.3, 0], [x + 0.3, h], [x - 0.3, h]], {fill:col, alpha:i === k && !v.fin ? 0.9 : 0.55});
        sm((neg ? '−' : '+') + cf, X(x), Y(h) + (neg ? 11 : -10), col, true);
        sm('k = ' + i, X(x), Y(-2.75) + 12, C.muted || '#6b6b6b'); sm('a' + (n - i === 1 ? '¹' : bnSup(n - i)), X(x), Y(-2.75) + 28, C.ink, true); sm('b' + (i === 1 ? '¹' : bnSup(i)), X(x), Y(-2.75) + 44, C.ink, true); }
      x0 = X(-0.8); y0 = Y(-4.75);
      txt('término k = ' + k + ': (−b)' + bnSup(k) + ' = (−1)' + bnSup(k) + ' b' + bnSup(k) + ' = ' + (k % 2 ? '−' : '+') + 'b' + bnSup(k), x0, y0, 'left', k % 2 ? C.tan : C.sec);
      txt(k % 2 ? 'k impar: el término es negativo' : 'k par: el término es positivo', x0, y0 + 21, 'left', C.ink);
      txt('término: ' + (k % 2 ? '−' : '+') + (bnTerm(n, k) || '1'), x0, y0 + 42, 'left', k % 2 ? C.tan : C.sec);
      if (v.fin) two(expo(n)).forEach(function(l, q){ txt(l, x0, y0 + 63 + 19*q, 'left', C.ink); });
      S.lab('F', x0, y0 + 112, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k); if (v.fin) return 'Los signos se alternan empezando por +. Los coeficientes son los mismos de (a + b)' + bnSup(n) + '. El último término es ' + (n % 2 ? 'negativo, porque n es impar' : 'positivo, porque n es par'); return 'Término k = ' + k + ': la potencia (−b)' + bnSup(k) + ' es ' + (k % 2 ? 'negativa, porque el exponente es impar' : 'positiva, porque el exponente es par'); },
    readout:function(v){ var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k); return [['', '(a-b)^{n}=\\big(a+(-b)\\big)^{n}\\qquad(-b)^{k}=(-1)^{k}\\,b^{k}'], ['d', 'k=' + k + ':\\quad(-1)^{' + k + '}\\dbinom{' + n + '}{' + k + '}a^{' + (n - k) + '}b^{' + k + '}=' + (k % 2 ? '-' : '') + bnC(n, k) + '\\,a^{' + (n - k) + '}b^{' + k + '}']]; }
  };
})());
