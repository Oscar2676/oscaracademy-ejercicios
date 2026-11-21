OA.scene('bn-caminos', (function(){
  var FX = [-2.2, 0, 2.2], BX = [-3, -1, 1, 3], HD = ['a³', 'a²b', 'ab²', 'b³'];
  function sel(i){ return [(i >> 2) & 1, (i >> 1) & 1, i & 1]; }
  function nb(i){ var s = sel(i); return s[0] + s[1] + s[2]; }
  function word(i){ return sel(i).map(function(x){ return x ? 'b' : 'a'; }); }
  return {
    world:{x0:-4.1, x1:4.1, y0:-6.0, y1:3.2}, aspect:9.2/8.2,
    aria:'Arriba, los tres factores de a más b al cubo: tres paréntesis a más b. En cada paso se elige una letra de cada paréntesis, marcada con un anillo, y se multiplican. Hay ocho maneras de elegir. Cada producto cae en una de cuatro columnas: a al cubo, a al cuadrado b, a b al cuadrado o b al cubo. Al terminar, las columnas tienen 1, 3, 3 y 1 productos: los coeficientes del desarrollo.',
    labels:[['F', '(a+b)^{3}=1\\,a^{3}+3\\,a^{2}b+3\\,ab^{2}+1\\,b^{3}', '(a + b)³ = a³ + 3a²b + 3ab² + b³', 'diff']],
    sliders:[{id:'m', tex:'\\text{elección}', min:1, max:8, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> la letra elegida en cada factor</span><span><i class="sw sec"></i> productos ya formados, agrupados</span><span><i class="sw tan"></i> cuántos hay de cada tipo: el coeficiente</span>',
    anim:{run:26000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.m = Math.min(8, 1 + Math.floor(p*9.4)); v.fin = p*9.4 >= 8.4; }},
    onInput:function(v){ v.q = null; v.fin = v.m >= 8; },
    draw:function(S, v){
      var m = Math.round(v.m || 1), cur = m - 1, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), s = sel(cur), w = word(cur), f, i, cnt = [0, 0, 0, 0], x0, y0, lx;
      function big(t, x, y, col, b){ c.font = (b ? '700 ' : '500 ') + '17px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x, y); }
      for (f = 0; f < 3; f++){ big('(', X(FX[f] - 0.85), Y(2.5), C.ink); big(')', X(FX[f] + 0.85), Y(2.5), C.ink); big('+', X(FX[f]), Y(2.5), C.ink);
        big('a', X(FX[f] - 0.45), Y(2.5), s[f] ? C.ink : C.rise, !s[f]); big('b', X(FX[f] + 0.45), Y(2.5), s[f] ? C.rise : C.ink, !!s[f]);
        lx = X(FX[f] + (s[f] ? 0.45 : -0.45)); c.strokeStyle = C.rise; c.lineWidth = 1.4; c.beginPath(); c.arc(lx, Y(2.5), 11, 0, 6.2832); c.stroke();
        c.lineWidth = 1; c.beginPath(); c.moveTo(lx, Y(2.5) + 12); c.lineTo(X(FX[f]*0.35), Y(1.62) - 10); c.stroke(); }
      txt(w.join(' · ') + ' = ' + HD[nb(cur)], X(0), Y(1.62), 'center', C.rise);
      for (i = 0; i < 4; i++){ txt(HD[i], X(BX[i]), Y(0.75), 'center', C.ink); c.strokeStyle = C.grid; c.lineWidth = 1; c.beginPath(); c.moveTo(X(BX[i] - 0.8), Y(0.75) + 12); c.lineTo(X(BX[i] + 0.8), Y(0.75) + 12); c.stroke(); }
      for (i = 0; i <= cur; i++){ f = nb(i); c.font = (i === cur ? '700' : '500') + ' 12.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = i === cur ? C.rise : C.sec; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(word(i).join(''), X(BX[f]), Y(0.75) + 28 + 17*cnt[f]); cnt[f]++; }
      for (i = 0; i < 4; i++) txt(cnt[i] + (cnt[i] === 1 ? ' producto' : ' productos'), X(BX[i]), Y(0.75) + 92, 'center', C.tan);
      x0 = X(-4.0); y0 = Y(-2.75);
      txt('elección ' + m + ' de 8: se toma ' + w.join(', ') + ' (una letra de cada factor)', x0, y0, 'left', C.ink);
      txt('producto: ' + w.join(' · ') + ' = ' + HD[nb(cur)] + ', porque la b se eligió ' + nb(cur) + (nb(cur) === 1 ? ' vez' : ' veces'), x0, y0 + 21, 'left', C.rise);
      if (v.fin){ txt('2 · 2 · 2 = 8 productos, en grupos de 1, 3, 3 y 1', x0, y0 + 42, 'left', C.ink); txt('(a + b)³ = a³ + 3a²b + 3ab² + b³', x0, y0 + 63, 'left', C.tan); }
      S.lab('F', x0, y0 + 90, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var m = Math.round(v.m || 1), cur = m - 1; if (v.fin) return 'Las 8 elecciones están hechas. Hay 3 productos a²b porque hay 3 maneras de elegir en cuál de los tres factores se toma la b. Eso es lo que cuenta cada coeficiente'; return 'Para multiplicar (a + b)(a + b)(a + b) se elige una letra de cada paréntesis y se multiplican. Elección ' + m + ': ' + word(cur).join(' · ') + ' = ' + HD[nb(cur)]; },
    readout:function(v){ var m = Math.round(v.m || 1); return [['', '(a+b)^{3}=(a+b)(a+b)(a+b)\\quad\\text{tiene }2\\cdot 2\\cdot 2=8\\text{ productos}'], ['d', '\\text{productos con }k\\text{ letras }b:\\quad\\dbinom{3}{k}\\qquad\\dbinom{3}{0}=1,\\ \\dbinom{3}{1}=3,\\ \\dbinom{3}{2}=3,\\ \\dbinom{3}{3}=1']]; }
  };
})());
