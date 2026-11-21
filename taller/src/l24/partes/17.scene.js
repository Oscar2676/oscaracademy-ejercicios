OA.scene('bn-induccion', (function(){
  var CX = [-1.6, 0.2, 2.0, 3.8, 5.6], HD = ['a⁴', 'a³b', 'a²b²', 'ab³', 'b⁴'], R1 = [1, 3, 3, 1, null], R2 = [null, 1, 3, 3, 1];
  return {
    world:{x0:-6.6, x1:6.6, y0:-5.4, y1:3.3}, aspect:8.7/13.2,
    aria:'Una tabla muestra el paso de a más b al cubo a a más b a la cuarta. Las columnas son las potencias a a la cuarta, a al cubo b, a al cuadrado b al cuadrado, a b al cubo y b a la cuarta. La primera fila tiene los coeficientes de a por a más b al cubo: 1, 3, 3, 1. La segunda, los de b por a más b al cubo, que son los mismos corridos un lugar a la derecha. La tercera fila es la suma por columnas: 1, 4, 6, 4, 1.',
    labels:[['F', '\\dbinom{n}{k}+\\dbinom{n}{k-1}=\\dbinom{n+1}{k}', 'C(n, k) + C(n, k−1) = C(n+1, k)', 'diff']],
    sliders:[{id:'s', tex:'\\text{paso}', min:1, max:4, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> al multiplicar por \\(a\\): los coeficientes quedan en su lugar</span><span><i class="sw rise"></i> al multiplicar por \\(b\\): se corren un lugar</span><span><i class="sw tan"></i> la suma: la fila siguiente</span>',
    anim:{run:20000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.s = Math.min(4, 1 + Math.floor(p*4.6)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = Math.round(v.s || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), j, x0, y0;
      function cell(t, x, y, col, b){ c.font = (b ? '700 ' : '600 ') + '13px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function lab(t, y, col){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-6.5), Y(y)); }
      for (j = 0; j < 5; j++) cell(HD[j], CX[j], 2.7, C.ink, true);
      c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(-6.5), Y(2.7) + 12); c.lineTo(X(6.5), Y(2.7) + 12); c.stroke();
      lab('(a + b)³ = a³ + 3a²b + 3ab² + b³', 3.05 - 1.25, C.ink);
      if (s >= 2){ lab('a · (a + b)³', 0.9, C.sec); for (j = 0; j < 5; j++) if (R1[j] != null) cell('' + R1[j], CX[j], 0.9, C.sec, true); }
      if (s >= 3){ lab('b · (a + b)³', 0.1, C.rise); for (j = 0; j < 5; j++) if (R2[j] != null) cell('' + R2[j], CX[j], 0.1, C.rise, true); }
      if (s >= 4){ c.beginPath(); c.moveTo(X(-6.5), Y(-0.45)); c.lineTo(X(6.5), Y(-0.45)); c.stroke(); lab('(a + b)⁴', -0.95, C.tan); for (j = 0; j < 5; j++) cell('' + ((R1[j] || 0) + (R2[j] || 0)), CX[j], -0.95, C.tan, true); }
      x0 = X(-6.5); y0 = Y(-1.9);
      txt(['se multiplica (a + b)³ por (a + b): primero por a, después por b', 'por a: los coeficientes no cambian de columna', 'por b: los coeficientes se corren una columna', 'suma por columnas: 1, 3+1, 3+3, 1+3, 1  →  1, 4, 6, 4, 1'][s - 1], x0, y0, 'left', [C.ink, C.sec, C.rise, C.tan][s - 1]);
      if (s >= 4) txt('en cada columna: C(3, k) + C(3, k − 1) = C(4, k)', x0, y0 + 21, 'left', C.ink);
      S.lab('F', x0, y0 + 50, 0, 0, s >= 4);
    },
    caption:function(v){ var s = Math.round(v.s || 1); return ['El paso inductivo, visto con n = 3. Se quiere llegar de (a + b)³ a (a + b)⁴ = (a + b)(a + b)³', 'Primera mitad del producto: a · (a + b)³ = a⁴ + 3a³b + 3a²b² + ab³', 'Segunda mitad: b · (a + b)³ = a³b + 3a²b² + 3ab³ + b⁴. Son los mismos coeficientes, un lugar más a la derecha', 'Al sumar, en cada columna se juntan dos coeficientes vecinos de la fila anterior. Esa suma es justamente el coeficiente de la fila siguiente: la regla de Pascal'][s - 1]; },
    readout:function(v){ var s = Math.round(v.s || 1); return [['', '(a+b)^{4}=(a+b)(a+b)^{3}=a\\,(a+b)^{3}+b\\,(a+b)^{3}']].concat(s >= 4 ? [['d', '\\dbinom{3}{k}+\\dbinom{3}{k-1}=\\dbinom{4}{k}:\\qquad 3+1=4,\\quad 3+3=6,\\quad 1+3=4']] : []); }
  };
})());
