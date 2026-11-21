OA.scene('ss-sigma', (function(){
  var A = 1, B = 5;
  function t(k){ return 2*k + 1; }
  return {
    world:{x0:-5.5, x1:5.5, y0:-6.2, y1:3.6}, aspect:9.8/11,
    aria:'El símbolo de sumatoria, una letra sigma mayúscula grande, con sus cuatro partes rotuladas con líneas guía: abajo, el índice k y su valor inicial 1; arriba, el valor final 5; a la derecha, el término general 2k más 1. Debajo, el índice recorre los valores 1, 2, 3, 4 y 5: en cada paso se reemplaza k, se obtiene un sumando y se agrega a la suma. Los sumandos son 3, 5, 7, 9 y 11, y la suma total es 35.',
    labels:[['F', '\\displaystyle\\sum_{k=1}^{5}(2k+1)=3+5+7+9+11=35', 'Σ (2k + 1), de k = 1 a 5, = 3 + 5 + 7 + 9 + 11 = 35', 'diff']],
    sliders:[{id:'k', tex:'k', min:1, max:5, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> el valor actual del índice y su sumando</span><span><i class="sw sec"></i> sumandos anteriores</span><span><i class="sw tan"></i> la suma acumulada</span>',
    anim:{run:20000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.k = Math.min(B, A + Math.floor(p*(B - A + 1.6))); v.fin = p*(B - A + 1.6) >= B - A + 0.8; }},
    onInput:function(v){ v.q = null; v.fin = v.k >= B; },
    draw:function(S, v){
      var k = Math.round(v.k || A), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, sum = 0, parts = [], x0, y0;
      function tx(s, px, py, sz, col, al){ c.font = sz + ' "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(s, px, py); }
      function guia(xa, ya, xb, yb){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(xa, ya); c.lineTo(xb, yb); c.stroke(); }
      tx('Σ', X(0.4), Y(1.6), '400 58px', C.ink); tx('5', X(0.4), Y(1.6) - 44, '700 15px', C.ink); tx('k = 1', X(0.4), Y(1.6) + 44, '700 15px', C.ink); tx('(2k + 1)', X(2.3), Y(1.6), '700 19px', C.ink);
      guia(X(-0.1), Y(1.6) - 44, X(-0.9), Y(1.6) - 44); txt('valor final del índice', X(-1.0), Y(1.6) - 44, 'right', C.ink);
      guia(X(-0.5), Y(1.6) + 44, X(-0.9), Y(1.6) + 44); txt('índice y valor inicial', X(-1.0), Y(1.6) + 44, 'right', C.ink);
      guia(X(2.6), Y(1.6) - 14, X(3.1), Y(1.6) - 34); txt('término general', X(3.2), Y(1.6) - 42, 'center', C.ink);
      for (i = A; i <= B; i++){ tx('k = ' + i, X(-4 + 2*(i - A)), Y(-0.9), (i === k ? '700' : '500') + ' 12px', i === k ? C.rise : i < k ? C.sec : (C.muted || '#9a9a9a')); if (i <= k){ tx('2 · ' + i + ' + 1', X(-4 + 2*(i - A)), Y(-0.9) + 18, '500 11.5px', i === k ? C.rise : C.sec); tx('' + t(i), X(-4 + 2*(i - A)), Y(-0.9) + 38, '700 15px', i === k ? C.rise : C.sec); sum += t(i); parts.push(t(i)); } if (i < B && i < k) tx('+', X(-3 + 2*(i - A)), Y(-0.9) + 38, '600 14px', C.ink); }
      x0 = X(-5.4); y0 = Y(-2.85);
      txt('el índice vale k = ' + k + ':  sumando 2 · ' + k + ' + 1 = ' + t(k), x0, y0, 'left', C.rise);
      txt('suma acumulada:  ' + parts.join(' + ') + (parts.length > 1 ? ' = ' + sum : ''), x0, y0 + 21, 'left', C.tan);
      if (v.fin) txt('el índice llegó a 5: la suma termina.  Total: 35', x0, y0 + 42, 'left', C.ink);
      S.lab('F', x0, y0 + 70, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var k = Math.round(v.k || A); return v.fin ? 'La sumatoria completa: el índice recorrió 1, 2, 3, 4, 5, y los cinco sumandos dan 35. El símbolo Σ es solo una forma abreviada de escribir esa suma' : 'El índice k toma el valor ' + k + '. Se reemplaza en el término general, 2k + 1, y se obtiene el sumando ' + t(k) + ', que se agrega a la suma'; },
    readout:function(v){ var k = Math.round(v.k || A), i, s = 0, p = []; for (i = A; i <= k; i++){ s += t(i); p.push(t(i)); } return [['', '\\displaystyle\\sum_{k=1}^{5}(2k+1)\\qquad k=' + k + ':\\ \\ 2\\cdot ' + k + '+1=' + t(k)], ['d', '\\text{suma hasta }k=' + k + ':\\quad ' + p.join('+') + '=' + s]]; }
  };
})());
