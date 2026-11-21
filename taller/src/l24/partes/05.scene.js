OA.scene('bn-enunciado', (function(){
  function f(n){ var r = 1, i; for (i = 2; i <= n; i++) r *= i; return r; }
  return {
    world:{x0:-0.9, x1:7.9, y0:-6.7, y1:4.0}, aspect:10.7/8.8,
    aria:'Para el desarrollo de a más b elevado a n se dibuja una barra por cada término. La altura de la barra es el coeficiente, n sobre k. Bajo cada barra van el número k, la potencia de a, que baja de n hasta 0, y la potencia de b, que sube de 0 hasta n. Los términos aparecen uno por uno, y los coeficientes son simétricos.',
    labels:[['F', '(a+b)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}', '(a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ', 'diff']],
    sliders:[{id:'n', tex:'n', min:1, max:7, step:1, value:5}],
    legend:'<span><i class="sw rise"></i> coeficiente \\(\\binom{n}{k}\\) del término que se está formando</span><span><i class="sw sec"></i> potencia de \\(a\\): baja de \\(n\\) a \\(0\\)</span><span><i class="sw tan"></i> potencia de \\(b\\): sube de \\(0\\) a \\(n\\)</span>',
    anim:{run:24000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.n = 5; v.k = Math.min(5, Math.floor(p*7.2)); v.fin = p*7.2 >= 6; }},
    onInput:function(v){ v.q = null; v.k = v.n; v.fin = true; },
    draw:function(S, v){
      var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), mx = bnC(n, Math.floor(n/2)), off = (7 - n)/2, i, h, x, x0, y0, cf;
      function sm(t, px, py, col, b){ c.font = (b ? '700 ' : '600 ') + '12.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      c.strokeStyle = C.ink; c.lineWidth = 1.1; c.beginPath(); c.moveTo(X(off - 0.6), Y(0)); c.lineTo(X(off + n + 0.6), Y(0)); c.stroke();
      for (i = 0; i <= k; i++){ cf = bnC(n, i); h = 3*cf/mx; x = off + i;
        S.poly([[x - 0.3, 0], [x + 0.3, 0], [x + 0.3, h], [x - 0.3, h]], {fill:i === k && !v.fin ? C.rise : C.grid, alpha:i === k && !v.fin ? 0.75 : 0.9});
        sm('' + cf, X(x), Y(h) - 10, i === k && !v.fin ? C.rise : C.ink, true);
        sm('k = ' + i, X(x), Y(0) + 12, C.muted || '#6b6b6b'); sm(n - i === 0 ? 'a⁰' : 'a' + (n - i === 1 ? '¹' : bnSup(n - i)), X(x), Y(0) + 29, C.sec, true); sm(i === 0 ? 'b⁰' : 'b' + (i === 1 ? '¹' : bnSup(i)), X(x), Y(0) + 45, C.tan, true); }
      x0 = X(-0.8); y0 = Y(-1.85);
      txt('n = ' + n + ': el desarrollo tiene ' + (n + 1) + ' términos (k = 0, 1, …, ' + n + ')', x0, y0, 'left', C.ink);
      txt('término k = ' + k + ': coeficiente ' + n + '! / (' + k + '! · ' + (n - k) + '!) = ' + f(n) + ' / (' + f(k) + ' · ' + f(n - k) + ') = ' + bnC(n, k), x0, y0 + 21, 'left', C.rise);
      txt('exponentes: ' + (n - k) + ' para a y ' + k + ' para b; suman ' + n, x0, y0 + 42, 'left', C.ink);
      txt('término: ' + (bnTerm(n, k) || '1'), x0, y0 + 63, 'left', C.tan);
      if (v.fin) bnExp2(n).forEach(function(l, q){ txt(l, x0, y0 + 84 + 19*q, 'left', C.tan); });
      S.lab('F', x0, y0 + 132, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k); if (v.fin) return 'Desarrollo completo de (a + b)' + bnSup(n) + ': ' + (n + 1) + ' términos. Los coeficientes son simétricos, los exponentes de a bajan de ' + n + ' a 0 y los de b suben de 0 a ' + n + '. Cambia n con el deslizador'; return 'Término k = ' + k + ' de (a + b)' + bnSup(n) + ': el coeficiente es el número combinatorio de ' + n + ' sobre ' + k + ', que vale ' + bnC(n, k) + '; a va elevada a ' + (n - k) + ' y b a ' + k; },
    readout:function(v){ var n = Math.round(v.n || 5), k = v.k == null ? n : Math.min(n, v.k); return [['', '\\dbinom{n}{k}=\\dfrac{n!}{k!\\,(n-k)!}\\qquad\\dbinom{' + n + '}{' + k + '}=\\dfrac{' + n + '!}{' + k + '!\\,' + (n - k) + '!}=' + bnC(n, k)], ['d', '\\text{término }k=' + k + ':\\quad\\dbinom{' + n + '}{' + k + '}a^{' + (n - k) + '}b^{' + k + '}=' + bnC(n, k) + '\\,a^{' + (n - k) + '}b^{' + k + '}']]; }
  };
})());
