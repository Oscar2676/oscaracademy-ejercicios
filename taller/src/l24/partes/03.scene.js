OA.scene('bn-pascal', (function(){
  var NMAX = 6, cells = [], n, k;
  for (n = 0; n <= NMAX; n++) for (k = 0; k <= n; k++) cells.push([n, k]);
  function px(n, k){ return (k - n/2)*1.05; } function py(n){ return -n*0.8; }
  return {
    world:{x0:-4.6, x1:3.8, y0:-8.9, y1:0.7}, aspect:9.6/8.4,
    aria:'El triángulo de coeficientes se construye fila por fila. La fila 0 tiene un 1. Cada fila empieza y termina en 1, y cada número interior es la suma de los dos que tiene arriba: dos líneas finas lo unen con ellos. La fila n contiene los coeficientes del desarrollo de a más b elevado a n, que se escribe bajo el triángulo.',
    labels:[['F', '\\binom{n}{k}=\\binom{n-1}{k-1}+\\binom{n-1}{k}', 'cada número = suma de los dos de arriba', 'diff']],
    sliders:[{id:'m', tex:'\\text{paso}', min:0, max:cells.length - 1, step:1, value:0}],
    legend:'<span><i class="sw rise"></i> el número que se está calculando</span><span><i class="sw sec"></i> los dos de arriba, que se suman</span>',
    anim:{run:30000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.m = Math.min(cells.length - 1, Math.floor(p*(cells.length + 3))); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var m = Math.round(v.m || 0), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, cl, n = cells[m][0], k = cells[m][1], val, x0, y0, inner = k > 0 && k < n;
      for (i = 0; i <= NMAX; i++){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = i === n ? C.ink : (C.muted || '#6b6b6b'); c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('n = ' + i, X(-4.5), Y(py(i))); }
      if (inner){ c.strokeStyle = C.sec; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(px(n - 1, k - 1)), Y(py(n - 1)) + 9); c.lineTo(X(px(n, k)), Y(py(n)) - 9); c.moveTo(X(px(n - 1, k)), Y(py(n - 1)) + 9); c.lineTo(X(px(n, k)), Y(py(n)) - 9); c.stroke(); }
      for (i = 0; i <= m; i++){ cl = cells[i]; val = bnC(cl[0], cl[1]); c.font = (i === m ? '700 15px' : '600 13px') + ' "Source Sans 3", system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle';
        c.fillStyle = i === m ? C.rise : (inner && cl[0] === n - 1 && (cl[1] === k - 1 || cl[1] === k)) ? C.sec : C.ink; c.fillText('' + val, X(px(cl[0], cl[1])), Y(py(cl[0]))); }
      x0 = X(-4.5); y0 = Y(-5.75);
      txt('fila n = ' + n + ', lugar k = ' + k, x0, y0, 'left', C.ink);
      txt(inner ? bnC(n, k) + ' = ' + bnC(n - 1, k - 1) + ' + ' + bnC(n - 1, k) + '   (los dos de arriba)' : 'los extremos de cada fila valen 1', x0, y0 + 21, 'left', C.rise);
      txt(k === n ? 'fila ' + n + ' completa: coeficientes de (a + b)' + bnSup(n) : 'la fila ' + n + ' dará los coeficientes de (a + b)' + bnSup(n), x0, y0 + 42, 'left', C.ink);
      if (k === n && n >= 1) bnExp2(n).forEach(function(l, q){ txt(l, x0, y0 + 63 + 19*q, 'left', C.tan); });
      S.lab('F', x0, y0 + 110, 0, 0, m >= cells.length - 1 && v.q != null);
    },
    caption:function(v){ var m = Math.round(v.m || 0), n = cells[m][0], k = cells[m][1]; if (m === 0) return 'La fila 0 tiene un solo número: 1. Es el coeficiente de (a + b)⁰ = 1'; if (k === 0 || k === n) return 'Fila ' + n + ': cada fila empieza y termina en 1' + (k === n ? '. La fila ' + n + ' quedó completa: son los coeficientes de (a + b)' + bnSup(n) : ''); return 'Fila ' + n + ': el ' + bnC(n, k) + ' es la suma de los dos números que tiene arriba, ' + bnC(n - 1, k - 1) + ' + ' + bnC(n - 1, k); },
    readout:function(v){ var m = Math.round(v.m || 0), n = cells[m][0], k = cells[m][1]; return [['', '\\text{fila }n=' + n + ',\\ \\text{lugar }k=' + k + ':\\quad\\dbinom{' + n + '}{' + k + '}=' + bnC(n, k)]].concat(k > 0 && k < n ? [['d', '\\dbinom{' + n + '}{' + k + '}=\\dbinom{' + (n - 1) + '}{' + (k - 1) + '}+\\dbinom{' + (n - 1) + '}{' + k + '}=' + bnC(n - 1, k - 1) + '+' + bnC(n - 1, k) + '=' + bnC(n, k)]] : []); }
  };
})());
