OA.scene('bn-suma', (function(){
  function px(n, k){ return (k - n/2)*1.0; }
  return {
    world:{x0:-4.4, x1:4.4, y0:-4.6, y1:2.7}, aspect:7.3/8.8,
    aria:'Dos filas del triángulo de coeficientes: la fila n y, debajo, la fila n más 1. De cada número de la fila de arriba bajan dos líneas finas, una a cada uno de los dos números que tiene debajo: cada número se usa dos veces para formar la fila siguiente. Por eso la suma de la fila de abajo es el doble de la de arriba. Las sumas son 1, 2, 4, 8, 16: las potencias de 2.',
    labels:[['F', '\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}=\\binom{n}{0}+\\binom{n}{1}+\\cdots+\\binom{n}{n}=2^{n}', 'C(n,0) + C(n,1) + … + C(n,n) = 2ⁿ', 'diff']],
    sliders:[{id:'n', tex:'n', min:0, max:6, step:1, value:0}],
    legend:'<span><i class="sw sec"></i> fila \\(n\\) y su suma</span><span><i class="sw tan"></i> fila \\(n+1\\) y su suma, que es el doble</span>',
    anim:{run:21000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(6, Math.floor(p*7.3)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = Math.round(v.n || 0), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), k, x0, y0, a = [], b = [];
      function nm(t, x, y, col){ c.font = '700 13px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      c.strokeStyle = 'rgba(31,93,134,0.45)'; c.lineWidth = 1;
      for (k = 0; k <= n; k++){ c.beginPath(); c.moveTo(X(px(n, k)), Y(1.6) + 10); c.lineTo(X(px(n + 1, k)), Y(0.2) - 10); c.moveTo(X(px(n, k)), Y(1.6) + 10); c.lineTo(X(px(n + 1, k + 1)), Y(0.2) - 10); c.stroke(); }
      for (k = 0; k <= n; k++){ nm('' + bnC(n, k), px(n, k), 1.6, C.sec); a.push(bnC(n, k)); }
      for (k = 0; k <= n + 1; k++){ nm('' + bnC(n + 1, k), px(n + 1, k), 0.2, C.tan); b.push(bnC(n + 1, k)); }
      txt('fila n = ' + n, X(-4.3), Y(2.35), 'left', C.sec); txt('fila n + 1 = ' + (n + 1), X(-4.3), Y(-0.5), 'left', C.tan);
      x0 = X(-4.3); y0 = Y(-1.35);
      txt('suma de la fila ' + n + ': ' + (a.length > 1 ? a.join(' + ') + ' = ' : '') + Math.pow(2, n) + ' = 2' + bnSup(n), x0, y0, 'left', C.sec);
      txt('cada número baja dos veces: la suma se duplica', x0, y0 + 21, 'left', C.ink);
      txt('suma de la fila ' + (n + 1) + ': ' + (b.length <= 7 ? b.join(' + ') + ' = ' : '') + Math.pow(2, n + 1) + ' = 2' + bnSup(n + 1), x0, y0 + 42, 'left', C.tan);
      S.lab('F', x0, y0 + 72, 0, 0, true);
    },
    caption:function(v){ var n = Math.round(v.n || 0); return 'La fila ' + n + ' suma ' + Math.pow(2, n) + '. Cada uno de sus números aporta a dos números de la fila ' + (n + 1) + ', así que esa fila suma el doble: ' + Math.pow(2, n + 1) + '. Partiendo de 1 y duplicando cada vez, la fila n suma 2ⁿ'; },
    readout:function(v){ var n = Math.round(v.n || 0); return [['', '(1+1)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}1^{\\,n-k}\\,1^{\\,k}=\\sum_{k=0}^{n}\\binom{n}{k}'], ['d', 'n=' + n + ':\\quad 2^{' + n + '}=' + Math.pow(2, n)]]; }
  };
})());
