/* L25 H18 · convergencia absoluta y condicional: si la serie sin signos converge, la serie con signos también; la demostración, hecha con 1 − 1/2 + 1/4 − 1/8 + … */
function ci18Seg(S, x0, y0, x1, y1, col, wd, dash, al){ var c = S.ctx; c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(S.X(x0), S.Y(y0)); c.lineTo(S.X(x1), S.Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
function ci18Fr(a, b){ return b === 1 ? '' + a : '\\dfrac{' + a + '}{' + b + '}'; }
OA.scene('abs-idea', (function(){
  var N = 5, NP = 6, SV = [1, 1/2, 3/4, 5/8, 11/16, 21/32], TV = [1, 3/2, 7/4, 15/8, 31/16, 63/32], CV = [2, 2, 5/2, 5/2, 21/8, 21/8];
  var PZ = [['S1', 'S_{1}=1', 'S₁ = 1', 'diff'], ['S2', '\\tfrac{1}{2}', '1/2', 'diff'], ['S3', '\\tfrac{3}{4}', '3/4', 'diff'], ['S4', '\\tfrac{5}{8}', '5/8', 'diff'], ['S5', '\\tfrac{11}{16}', '11/16', 'diff'], ['S6', '\\tfrac{21}{32}', '21/32', 'diff'],
    ['T1', 'T_{1}=1', 'T₁ = 1', 'c-sec'], ['T2', '\\tfrac{3}{2}', '3/2', 'c-sec'], ['T3', '\\tfrac{7}{4}', '7/4', 'c-sec'], ['T4', '\\tfrac{15}{8}', '15/8', 'c-sec'], ['T5', '\\tfrac{31}{16}', '31/16', 'c-sec'], ['T6', '\\tfrac{63}{32}', '63/32', 'c-sec'],
    ['C1', 'C_{1}=2', 'C₁ = 2', 'c-alt'], ['C2', '2', '2', 'c-alt'], ['C3', '\\tfrac{5}{2}', '5/2', 'c-alt'], ['C4', '\\tfrac{5}{2}', '5/2', 'c-alt'], ['C5', '\\tfrac{21}{8}', '21/8', 'c-alt'], ['C6', '\\tfrac{21}{8}', '21/8', 'c-alt'],
    ['W1', 'C_{6}-T_{6}=\\tfrac{21}{32}', 'C₆ − T₆ = 21/32', 'diff'], ['W2', 'S_{6}=\\tfrac{21}{32}', 'S₆ = 21/32', 'diff'],
    ['Q', '1-\\tfrac{1}{2}+\\tfrac{1}{4}-\\tfrac{1}{8}+\\cdots\\quad\\text{¿converge?}', '1 − 1/2 + 1/4 − 1/8 + … ¿converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí: converge absolutamente}', '⟹ sí: converge absolutamente', 'diff'],
    ['R1', 'S_{6}=1-\\tfrac{1}{2}+\\tfrac{1}{4}-\\tfrac{1}{8}+\\tfrac{1}{16}-\\tfrac{1}{32}=\\tfrac{21}{32}', 'S₆ = 1 − 1/2 + 1/4 − 1/8 + 1/16 − 1/32 = 21/32', ''],
    ['R2', 'T_{6}=1+\\tfrac{1}{2}+\\tfrac{1}{4}+\\tfrac{1}{8}+\\tfrac{1}{16}+\\tfrac{1}{32}=\\tfrac{63}{32}\\le 2', 'T₆ = 1 + 1/2 + 1/4 + 1/8 + 1/16 + 1/32 = 63/32 ≤ 2', ''],
    ['R3', 'C_{6}=2+0+\\tfrac{1}{2}+0+\\tfrac{1}{8}+0=\\tfrac{21}{8}', 'C₆ = 2 + 0 + 1/2 + 0 + 1/8 + 0 = 21/8', ''],
    ['R4', '0\\le a_{n}+|a_{n}|\\le 2|a_{n}|\\ \\Longrightarrow\\ C_{n}\\le 2\\,T_{n}\\le 4', '0 ≤ aₙ + |aₙ| ≤ 2|aₙ|, de donde Cₙ ≤ 2Tₙ ≤ 4', ''],
    ['R5', 'S_{6}=C_{6}-T_{6}=\\tfrac{84}{32}-\\tfrac{63}{32}=\\tfrac{21}{32}\\ \\Longrightarrow\\ \\text{converge}', 'S₆ = C₆ − T₆ = 84/32 − 63/32 = 21/32, de donde converge', 'diff']];
  var TXT = [['Naranja: las sumas parciales con los signos.', 'Suben y bajan: ¿tienen límite?'],
    ['Azul: las mismas sumas, sin los signos.', 'Solo suben, y no pasan de 2.'],
    ['Verde: se suma cada término más su tamaño.', 'Eso da el doble o cero: nunca bajan.'],
    ['Las verdes no pasan del doble de las azules:', 'su tope es 4. Suben con tope: tienen límite.'],
    ['De azul a verde hay lo mismo que en naranja.', 'Verde y azul tienen límite: naranja también.']];
  function gx(n){ return -0.7 + 0.72*n; } function gy(y){ return 1.0 + 1.1*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:7.9}, aspect:12.5/6.6,
    aria:'Arriba, una franja dice qué muestra: si la serie sin signos converge, la serie con signos también converge. Animación en cinco pasos con una gráfica de sumas parciales de la serie 1 menos un medio más un cuarto menos un octavo más un dieciseisavo menos un treintaidosavo. En horizontal va n, de 1 a 6; en vertical, el valor de la suma parcial, de 0 a 4. Uno: aparecen en naranja las seis sumas parciales con los signos: 1, un medio, tres cuartos, cinco octavos, once dieciseisavos y veintiún treintaidosavos; suben y bajan. Dos: aparecen en azul las sumas parciales sin los signos: 1, tres medios, siete cuartos, quince octavos, treinta y un dieciseisavos y sesenta y tres treintaidosavos; solo suben, bajo una línea punteada azul a la altura 2, rotulada tope 2. Tres: aparecen en verde las sumas parciales de la serie que se obtiene al sumar a cada término su tamaño: 2, 2, cinco medios, cinco medios, veintiún octavos y veintiún octavos; nunca bajan. Cuatro: una línea punteada burdeo a la altura 4 marca el tope de las verdes, el doble del tope de las azules. Cinco: junto al último punto, una cota naranja mide la distancia entre el punto azul y el verde, veintiún treintaidosavos, y otra cota naranja mide la altura del punto naranja, también veintiún treintaidosavos: la suma con signos es la verde menos la azul. Cada punto lleva su valor y una punteada hasta el eje vertical. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, sí, converge absolutamente, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> \\(S_{n}\\): sumas parciales con los signos</span><span><i class="sw sec"></i> \\(T_{n}\\): sumas parciales sin los signos, y su tope, \\(2\\)</span><span><i class="sw alt"></i> \\(C_{n}\\): sumas parciales de \\(a_{n}+|a_{n}|\\)</span><span><i class="sw tan"></i> tope de las verdes: \\(4\\)</span><span>líneas punteadas finas: llevan cada suma parcial a su valor en el eje vertical</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, a, b, e, xb = gx(6) + 0.36, xr = gx(6.5);
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function tag(t, px, py, col, al){ c.font = '600 11.5px ' + F; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* una serie de puntos: aparecen de a uno, con su punteada al eje, una línea fina que los une y su valor */
      function serie(V, col, id, kk, dy){ var j, ww, m;
        if (k < kk) return;
        c.strokeStyle = col; c.globalAlpha = 0.45; c.lineWidth = 1; c.setLineDash([]); c.beginPath();
        for (j = 1; j <= NP; j++){ ww = k === kk ? Math.max(0, Math.min(1, u*NP - (j - 1))) : 1; if (ww <= 0) break; if (j === 1) c.moveTo(X(gx(1)), Y(gy(V[0]))); else c.lineTo(X(gx(j - 1) + 0.72*ww), Y(gy(V[j - 2] + (V[j - 1] - V[j - 2])*ww))); } c.stroke(); c.globalAlpha = 1;
        for (j = 1; j <= NP; j++){ ww = k === kk ? Math.max(0, Math.min(1, u*NP - (j - 1))) : 1; if (ww <= 0) continue;
          ci18Seg(S, gx(j), gy(V[j - 1]), gx(j) - (gx(j) - gx(0))*ww, gy(V[j - 1]), col, 0.8, [3, 3], 0.3);
          if (ww >= 1){ c.globalAlpha = 0.6; c.beginPath(); c.arc(X(gx(0)), Y(gy(V[j - 1])), 1.8, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1; }
          c.globalAlpha = ww; c.beginPath(); c.arc(X(gx(j)), Y(gy(V[j - 1])), 3.2, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1;
          if (ww >= 1){ m = typeof dy === 'function' ? dy(j) : dy; if (id === 'T' && j === 2) L('T2', gx(2), gy(V[1]), 0, 7, 9); else L(id + j, gx(j), gy(V[j - 1]), -50, j === 1 ? 4 : 0, m); } } }
      /* ejes */
      S.line(gx(0), gy(0), xr, gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(4.25), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      [0, 1, 2, 3, 4].forEach(function(q){ c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(q))); c.lineTo(X(gx(0)) + 3, Y(gy(q))); c.stroke(); num('' + q, X(gx(0)) - 7, Y(gy(q)), 'right'); });
      num('n', X(xr) + 6, Y(gy(0)), 'left'); num('suma parcial', X(gx(0)) + 6, Y(gy(4.25)) - 2, 'left');
      /* paso 2 en adelante: tope de las azules */
      if (k >= 2){ w = k === 2 ? u : 1; ci18Seg(S, gx(0), gy(2), gx(0) + (xr - gx(0))*w, gy(2), C.sec, 1.1, [5, 4], 0.85); if (w > 0.6) tag('tope: 2', X(xr) + 5, Y(gy(2)) + 11, C.sec); }
      /* paso 4 en adelante: tope de las verdes */
      if (k >= 4){ w = k === 4 ? u : 1; ci18Seg(S, gx(0), gy(4), gx(0) + (xr - gx(0))*w, gy(4), C.tan, 1.1, [5, 4], 0.85); if (w > 0.6) tag('tope de las verdes: 4, el doble de 2', X(gx(1.9)), Y(gy(4)) - 10, C.tan); }
      /* paso 3: sumas parciales de aₙ + |aₙ| */
      serie(CV, C.alt, 'C', 3, -15); if (k > 3 || (k === 3 && u > 0.6)) tag('cada término más su tamaño', X(gx(0.25)), Y(gy(3.28)), C.alt);
      /* paso 2: sumas parciales sin los signos */
      serie(TV, C.sec, 'T', 2, function(j){ return j === 1 ? -15 : 15; }); if (k > 2 || (k === 2 && u > 0.6)) tag('sin los signos', X(gx(3.7)), Y(gy(1.33)), C.sec);
      /* paso 1: sumas parciales con los signos */
      serie(SV, C.rise, 'S', 1, 15); if (k > 1 || u > 0.6) tag('con los signos', X(gx(3.7)), Y(gy(0.95)), C.rise);
      /* paso 5: dos cotas del mismo largo: de la azul a la verde, y del eje a la naranja */
      if (k === 5){ a = gy(TV[5]); b = gy(CV[5]); e = a + (b - a)*u;
        ci18Seg(S, gx(6), a, xb, a, C.rise, 0.9, [2, 3], 0.8*u); ci18Seg(S, gx(6), b, xb, b, C.rise, 0.9, [2, 3], 0.8*u);
        ci18Seg(S, xb, a, xb, e, C.rise, 1.7); ci18Seg(S, xb - 0.07, a, xb + 0.07, a, C.rise, 1.7); if (u > 0.95) ci18Seg(S, xb - 0.07, b, xb + 0.07, b, C.rise, 1.7);
        a = gy(0); b = gy(SV[5]); e = a + (b - a)*u;
        ci18Seg(S, gx(6), b, xb, b, C.rise, 0.9, [2, 3], 0.8*u);
        ci18Seg(S, xb, a, xb, e, C.rise, 1.7); ci18Seg(S, xb - 0.07, a, xb + 0.07, a, C.rise, 1.7); if (u > 0.95) ci18Seg(S, xb - 0.07, b, xb + 0.07, b, C.rise, 1.7);
        if (u > 0.6){ L('W1', 5.27, gy(3.3), -100); L('W2', xb, gy(SV[5]/2), 0, 7, 0); ci18Seg(S, xb + 0.25, gy(3.12), xb + 0.03, gy(2.5), C.rise, 0.9, [2, 2], 0.8); } }
      L('Q', -1.2, 6.62, 0); if (k === N && u > 0.5) L('F', -1.2, 6.14, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.36); txt(TXT[k - 1][1], -1.2, 0.36 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(6.62));
      dtQue(S, 'si la serie sin signos converge,', 'la serie con signos también converge.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, R = [
      '\\text{Serie: }1-' + f(1, 2) + '+' + f(1, 4) + '-' + f(1, 8) + '+' + f(1, 16) + '-' + f(1, 32) + '+\\cdots' + Q + '\\text{Con sumatoria: }\\displaystyle\\sum_{n=1}^{\\infty}a_{n},\\quad a_{n}=\\left(-' + f(1, 2) + '\\right)^{n-1}'
        + Q + '\\text{Sumas parciales con los signos (naranja):}' + Q + 'S_{1}=1' + Q + 'S_{2}=S_{1}-' + f(1, 2) + '=' + f(2, 2) + '-' + f(1, 2) + '=' + f(1, 2) + Q + 'S_{3}=S_{2}+' + f(1, 4) + '=' + f(2, 4) + '+' + f(1, 4) + '=' + f(3, 4)
        + Q + 'S_{4}=S_{3}-' + f(1, 8) + '=' + f(6, 8) + '-' + f(1, 8) + '=' + f(5, 8) + Q + 'S_{5}=S_{4}+' + f(1, 16) + '=' + f(10, 16) + '+' + f(1, 16) + '=' + f(11, 16) + Q + 'S_{6}=S_{5}-' + f(1, 32) + '=' + f(22, 32) + '-' + f(1, 32) + '=' + f(21, 32)
        + Q + '\\text{Suben y bajan. ¿Tienen límite?}',
      '\\text{Tamaño de cada término, sin el signo:}' + Q + '|a_{n}|=' + f(1, '2^{\\,n-1}') + '\\text{: }\\ 1,\\ ' + f(1, 2) + ',\\ ' + f(1, 4) + ',\\ ' + f(1, 8) + ',\\ ' + f(1, 16) + ',\\ ' + f(1, 32) + Q + '\\text{Sumas parciales sin los signos (azul):}' + Q + 'T_{1}=1'
        + Q + 'T_{2}=T_{1}+' + f(1, 2) + '=' + f(2, 2) + '+' + f(1, 2) + '=' + f(3, 2) + Q + 'T_{3}=T_{2}+' + f(1, 4) + '=' + f(6, 4) + '+' + f(1, 4) + '=' + f(7, 4) + Q + 'T_{4}=T_{3}+' + f(1, 8) + '=' + f(14, 8) + '+' + f(1, 8) + '=' + f(15, 8)
        + Q + 'T_{5}=T_{4}+' + f(1, 16) + '=' + f(30, 16) + '+' + f(1, 16) + '=' + f(31, 16) + Q + 'T_{6}=T_{5}+' + f(1, 32) + '=' + f(62, 32) + '+' + f(1, 32) + '=' + f(63, 32)
        + Q + '\\text{Es una serie geométrica: }a=1,\\ r=' + f(1, 2) + Q + '\\text{Como }|r|<1\\text{, converge, y su suma es}' + Q + f('a', '1-r') + '=' + f(1, '1-\\frac{1}{2}') + '=' + f(1, '\\frac{1}{2}') + '=2' + Q + '\\text{(hoja «Series geométricas infinitas»).}'
        + Q + '\\text{Las azules suben y su límite es }2\\text{: }T_{n}\\le 2.',
      '\\text{Serie nueva: a cada término se le suma}' + Q + '\\text{su tamaño: }c_{n}=a_{n}+|a_{n}|' + Q + '\\text{Si }a_{n}>0\\text{: }|a_{n}|=a_{n},\\ \\ c_{n}=a_{n}+a_{n}=2\\,a_{n}' + Q + '\\text{Si }a_{n}<0\\text{: }|a_{n}|=-a_{n},\\ \\ c_{n}=a_{n}-a_{n}=0'
        + Q + 'c_{1}=2\\cdot 1=2,\\qquad c_{2}=0' + Q + 'c_{3}=2\\cdot' + f(1, 4) + '=' + f(2, 4) + '=' + f(1, 2) + ',\\qquad c_{4}=0' + Q + 'c_{5}=2\\cdot' + f(1, 16) + '=' + f(2, 16) + '=' + f(1, 8) + ',\\qquad c_{6}=0'
        + Q + '\\text{Sus sumas parciales (verde):}' + Q + 'C_{1}=2,\\qquad C_{2}=2+0=2' + Q + 'C_{3}=2+' + f(1, 2) + '=' + f(4, 2) + '+' + f(1, 2) + '=' + f(5, 2) + Q + 'C_{4}=' + f(5, 2) + '+0=' + f(5, 2) + Q + 'C_{5}=' + f(5, 2) + '+' + f(1, 8) + '=' + f(20, 8) + '+' + f(1, 8) + '=' + f(21, 8)
        + Q + 'C_{6}=' + f(21, 8) + '+0=' + f(21, 8) + Q + '\\text{Ningún }c_{n}\\text{ es negativo: las verdes no bajan.}',
      '\\text{Cada }c_{n}\\text{ vale }2\\,|a_{n}|\\text{ o }0\\text{: }\\ 0\\le c_{n}\\le 2\\,|a_{n}|' + Q + '\\text{Se suma desde }1\\text{ hasta }n\\text{: }\\ C_{n}\\le 2\\,T_{n}' + Q + '\\text{Comprobación con }n=6\\text{:}' + Q + '2\\,T_{6}=2\\cdot' + f(63, 32) + '=' + f(126, 32) + Q + 'C_{6}=' + f(21, 8) + '=' + f('21\\cdot 4', '8\\cdot 4') + '=' + f(84, 32)
        + Q + '84\\le 126\\ \\checkmark' + Q + '\\text{Como }T_{n}\\le 2\\text{: }\\ C_{n}\\le 2\\cdot 2=4' + Q + '\\text{Las verdes suben y no pasan de }4\\text{: una}' + Q + '\\text{sucesión creciente y acotada por arriba}' + Q + '\\text{tiene límite. Se llama }C.',
      '\\text{De }c_{n}=a_{n}+|a_{n}|\\text{ se despeja }a_{n}\\text{:}' + Q + 'a_{n}=c_{n}-|a_{n}|' + Q + '\\text{Se suma desde }1\\text{ hasta }n\\text{: }\\ S_{n}=C_{n}-T_{n}' + Q + '\\text{Comprobación con }n=6\\text{:}' + Q + 'C_{6}-T_{6}=' + f(21, 8) + '-' + f(63, 32) + '=' + f(84, 32) + '-' + f(63, 32) + Q + '\\phantom{C_{6}-T_{6}}=' + f(21, 32) + '=S_{6}\\ \\checkmark'
        + Q + '\\text{Las verdes tienen límite }C\\text{; las azules, }2.' + Q + '\\text{Límite de una resta: }S_{n}\\text{ tiene límite }C-2.' + Q + '\\text{La serie con signos converge.}' + Q + '\\text{Converge también sin los signos:}' + Q + '\\text{converge absolutamente.}'
        + Q + '\\text{Aquí la suma se puede calcular: es}' + Q + '\\text{geométrica con }a=1,\\ r=-' + f(1, 2) + '\\text{:}' + Q + 'S=' + f(1, '1-\\left(-\\frac{1}{2}\\right)') + '=' + f(1, '1+\\frac{1}{2}') + '=' + f(1, '\\frac{3}{2}') + '=' + f(2, 3)];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: la armónica alternada con signos (atrapada entre 1/2 y 1) y sin signos (la armónica: pasa de 2, de 3, de cualquier número): convergencia condicional */
OA.scene('abs-cond', (function(){
  var NM = 12, i, PZ = [];
  /* tablas exactas: [n, numerador y denominador de la suma parcial anterior, denominador común, numerador de la anterior y de 1/n con ese denominador, numerador del resultado, numerador y denominador de la suma parcial ya simplificada] */
  var TS = [[1, 0, 1, 1, 0, 1, 1, 1, 1], [2, 1, 1, 2, 2, 1, 1, 1, 2], [3, 1, 2, 6, 3, 2, 5, 5, 6], [4, 5, 6, 12, 10, 3, 7, 7, 12], [5, 7, 12, 60, 35, 12, 47, 47, 60], [6, 47, 60, 60, 47, 10, 37, 37, 60], [7, 37, 60, 420, 259, 60, 319, 319, 420], [8, 319, 420, 840, 638, 105, 533, 533, 840], [9, 533, 840, 2520, 1599, 280, 1879, 1879, 2520], [10, 1879, 2520, 2520, 1879, 252, 1627, 1627, 2520], [11, 1627, 2520, 27720, 17897, 2520, 20417, 20417, 27720], [12, 20417, 27720, 27720, 20417, 2310, 18107, 18107, 27720]];
  var TT = [[1, 0, 1, 1, 0, 1, 1, 1, 1], [2, 1, 1, 2, 2, 1, 3, 3, 2], [3, 3, 2, 6, 9, 2, 11, 11, 6], [4, 11, 6, 12, 22, 3, 25, 25, 12], [5, 25, 12, 60, 125, 12, 137, 137, 60], [6, 137, 60, 60, 137, 10, 147, 49, 20], [7, 49, 20, 140, 343, 20, 363, 363, 140], [8, 363, 140, 280, 726, 35, 761, 761, 280], [9, 761, 280, 2520, 6849, 280, 7129, 7129, 2520], [10, 7129, 2520, 2520, 7129, 252, 7381, 7381, 2520], [11, 7381, 2520, 27720, 81191, 2520, 83711, 83711, 27720], [12, 83711, 27720, 27720, 83711, 2310, 86021, 86021, 27720]];
  for (i = 1; i <= NM; i++) PZ.push(['A' + i, 'S_{' + i + '}', 'S' + ssSub(i), 'diff']);
  for (i = 1; i <= NM; i++) PZ.push(['B' + i, 'T_{' + i + '}', 'T' + ssSub(i), 'c-sec']);
  function gx(n){ return -0.9 + 0.385*n; } function gy(y){ return 0.9 + 1.25*y; }
  function sv(n){ return TS[n - 1][7]/TS[n - 1][8]; } function tv(n){ return TT[n - 1][7]/TT[n - 1][8]; }
  function nn(v){ return Math.max(1, Math.min(NM, Math.round(v.n || 1))); }
  function donde(n){ return n < 4 ? 'todavía no pasa de 2' : n < 11 ? 'ya pasó de 2' : 'ya pasó de 3'; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.35, y1:6.6}, aspect:7.95/6.6,
    aria:'Arriba, una franja dice qué muestra: los mismos tamaños, con signos alternados la suma queda atrapada; sin signos, crece sin tope. Gráfica de puntos con dos sucesiones de sumas parciales. Un deslizador elige n, la cantidad de términos sumados, de 1 a 12. En naranja, las sumas parciales de la serie armónica alternada, 1 menos un medio más un tercio menos un cuarto, y así: van en zigzag dentro de una franja burdeo que va de un medio a 1. En azul, las sumas parciales de la serie armónica, 1 más un medio más un tercio más un cuarto, y así: solo suben. Dos líneas punteadas verdes marcan las alturas 2 y 3: la azul pasa de 2 con cuatro términos y de 3 con once términos. Los dos puntos del valor de n elegido van más grandes y con su nombre; cada punto tiene una línea punteada hasta su valor en el eje vertical. Con n igual a 1 los dos puntos coinciden a la altura 1. Bajo el dibujo, cuatro frases dicen cuántos términos se sumaron, que la naranja no sale de la franja, por dónde va la azul, y que la naranja tiene límite y la azul no tiene tope; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'n', tex:'n', min:1, max:NM, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> \\(S_{n}\\): sumas parciales con los signos, \\(1-\\tfrac{1}{2}+\\tfrac{1}{3}-\\cdots\\)</span><span><i class="sw sec"></i> \\(T_{n}\\): sumas parciales sin los signos, \\(1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\cdots\\)</span><span><i class="sw tan"></i> franja de \\(\\tfrac{1}{2}\\) a \\(1\\): de ahí no salen las naranjas</span><span><i class="sw alt"></i> alturas \\(2\\) y \\(3\\): las azules las pasan</span><span>líneas punteadas finas: llevan cada suma parcial a su valor en el eje vertical</span>',
    anim:{run:30000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(NM, 1 + Math.floor(p*NM)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = nn(v), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', xr = gx(12.7), j, y, col;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function tag(t, px, py, col, al){ c.font = '600 11.5px ' + F; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* franja de 1/2 a 1: ahí quedan las sumas parciales con signos */
      S.poly([[gx(0), gy(0.5)], [xr, gy(0.5)], [xr, gy(1)], [gx(0), gy(1)]], {fill:C.tan, alpha:0.14});
      ci18Seg(S, gx(0), gy(0.5), xr, gy(0.5), C.tan, 0.9, [4, 3], 0.7); ci18Seg(S, gx(0), gy(1), xr, gy(1), C.tan, 0.9, [4, 3], 0.7);
      
      /* alturas 2 y 3 */
      ci18Seg(S, gx(0), gy(2), xr, gy(2), C.alt, 1, [5, 4], 0.8); ci18Seg(S, gx(0), gy(3), xr, gy(3), C.alt, 1, [5, 4], 0.8);
      
      
      /* ejes */
      S.line(gx(0), gy(0), xr, gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(3.55), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (j = 1; j <= NM; j++){ c.beginPath(); c.moveTo(X(gx(j)), Y(gy(0)) - 3); c.lineTo(X(gx(j)), Y(gy(0)) + 3); c.stroke(); num('' + j, X(gx(j)), Y(gy(0)) + 11, 'center'); }
      [[0, '0'], [0.5, '0,5'], [1, '1'], [2, '2'], [3, '3']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(q[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(q[0]))); c.stroke(); num(q[1], X(gx(0)) - 7, Y(gy(q[0])), 'right'); });
      num('n', X(xr) + 5, Y(gy(0)) + 11, 'center'); num('suma parcial', X(gx(0)) + 6, Y(gy(3.55)) - 4, 'left');
      /* líneas finas que unen cada sucesión de sumas parciales */
      [[sv, C.rise], [tv, C.sec]].forEach(function(q){ c.strokeStyle = q[1]; c.globalAlpha = 0.4; c.lineWidth = 1; c.beginPath(); for (j = 1; j <= n; j++){ if (j === 1) c.moveTo(X(gx(j)), Y(gy(q[0](j)))); else c.lineTo(X(gx(j)), Y(gy(q[0](j)))); } c.stroke(); c.globalAlpha = 1; });
      /* puntos con su punteada al eje; los del n elegido, más grandes */
      [[tv, C.sec], [sv, C.rise]].forEach(function(q){ for (j = 1; j <= n; j++){ y = q[0](j); col = q[1];
        ci18Seg(S, gx(j), gy(y), gx(0), gy(y), col, 0.9, [3, 3], j === n ? 0.95 : 0.3); c.globalAlpha = j === n ? 1 : 0.5; c.beginPath(); c.arc(X(gx(0)), Y(gy(y)), 2, 0, 6.2832); c.fillStyle = col; c.fill();
        c.globalAlpha = j === n ? 1 : 0.55; c.beginPath(); c.arc(X(gx(j)), Y(gy(y)), j === n ? 4 : 2.8, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1; } });
      txt('franja: de 0,5 a 1', X(xr), Y(gy(1)) - 11, 'right', C.tan); txt('altura 2: la azul la pasa con 4 términos', X(xr), Y(gy(2)) + 12, 'right', C.alt); txt('altura 3: la azul la pasa con 11 términos', X(gx(0)) + 9, Y(gy(3)) - 22, 'left', C.alt);
      /* nombres de los dos puntos del n elegido */
      T.L('A' + n, gx(n), gy(sv(n)), -50, n === 1 ? 4 : 0, n % 2 && n > 1 ? -15 : 15);
      T.L('B' + n, gx(n), gy(tv(n)), -50, n === 1 ? 4 : 0, -15);
      y = Y(gy(0)) + 34;
      txt(n === 1 ? 'se sumó 1 término de cada serie' : 'se sumaron ' + n + ' términos de cada serie', X(-1.2), y, 'left', C.ink);
      txt('naranja, con signos: no sale de la franja', X(-1.2), y + 21, 'left', C.rise);
      txt('azul, sin signos: ' + donde(n), X(-1.2), y + 42, 'left', C.sec);
      txt('la naranja tiene límite; la azul no tiene tope', X(-1.2), y + 63, 'left', C.tan);
      dtQue(S, 'mismos tamaños; con signos la suma', 'queda atrapada; sin signos crece sin tope.');
      T.fin();
    },
    caption:function(v){ var n = nn(v); return 'Con ' + n + (n === 1 ? ' término' : ' términos') + ': la suma parcial con signos queda entre 0,5 y 1; la suma parcial sin signos ' + donde(n) + '. La serie con signos converge y la serie sin signos diverge: convergencia condicional.'; },
    readout:function(v){ var n = nn(v), t = TS[n - 1], h = TT[n - 1], num = OA.num, fr = ci18Fr, Q = '\\\\&\\qquad ', sg = n % 2 ? '+' : '-', L = [], s, g;
      function ap(a, b){ return (1000*a % b === 0 ? '=' : '\\approx ') + num(a/b, 3); }
      L.push('\\text{Datos. Con signos: }\\displaystyle\\sum_{k=1}^{\\infty}\\dfrac{(-1)^{k+1}}{k}=1-\\dfrac{1}{2}+\\dfrac{1}{3}-\\cdots' + Q + '\\text{Sin signos: }\\displaystyle\\sum_{k=1}^{\\infty}\\dfrac{1}{k}=1+\\dfrac{1}{2}+\\dfrac{1}{3}+\\cdots' + Q + '\\text{(la serie armónica). De cada una se}' + Q + (n === 1 ? '\\text{suma }n=1\\text{ término.}' : '\\text{suman }n=' + n + '\\text{ términos.}'));
      if (n === 1){ L.push('\\text{Con signos (punto naranja): }S_{1}=\\dfrac{1}{1}=1'); L.push('\\text{Sin signos (punto azul): }T_{1}=\\dfrac{1}{1}=1'); }
      else { s = '\\text{Con signos (punto naranja): a la anterior,}' + Q + 'S_{' + (n - 1) + '}=' + fr(t[1], t[2]) + '\\text{, se le ' + (n % 2 ? 'suma' : 'resta') + ' }\\dfrac{1}{' + n + '}\\text{ (}n\\text{ ' + (n % 2 ? 'impar' : 'par') + ').}' + Q + 'S_{' + n + '}=' + fr(t[1], t[2]) + sg + '\\dfrac{1}{' + n + '}';
        if (!(t[3] === t[2] && t[5] === 1)) s += Q + '\\text{Denominador común }' + t[3] + '\\text{:}' + Q + '\\phantom{S_{' + n + '}}=' + fr(t[4], t[3]) + sg + fr(t[5], t[3]);
        s += Q + '\\phantom{S_{' + n + '}}=' + fr(t[6], t[3]) + ap(t[7], t[8]) + Q + '\\text{(}S_{' + (n - 1) + '}\\text{ se calcula igual: pon }n=' + (n - 1) + '\\text{.)}'; L.push(s);
        s = '\\text{Sin signos (punto azul): a la anterior,}' + Q + 'T_{' + (n - 1) + '}=' + fr(h[1], h[2]) + '\\text{, se le suma }\\dfrac{1}{' + n + '}\\text{.}' + Q + 'T_{' + n + '}=' + fr(h[1], h[2]) + '+\\dfrac{1}{' + n + '}';
        if (!(h[3] === h[2] && h[5] === 1)) s += Q + '\\text{Denominador común }' + h[3] + '\\text{:}' + Q + '\\phantom{T_{' + n + '}}=' + fr(h[4], h[3]) + '+' + fr(h[5], h[3]);
        s += Q + '\\phantom{T_{' + n + '}}=' + fr(h[6], h[3]);
        if (h[6] !== h[7]){ g = h[6]/h[7]; s += Q + '\\text{Se simplifica por }' + g + '\\text{:}' + Q + '\\phantom{T_{' + n + '}}=' + fr(h[7], h[8]); }
        s += ap(h[7], h[8]) + Q + '\\text{(}T_{' + (n - 1) + '}\\text{ se calcula igual: pon }n=' + (n - 1) + '\\text{.)}'; L.push(s); }
      L.push('\\text{Con signos: las sumas parciales de índice}' + Q + '\\text{par suben desde }S_{2}=\\tfrac{1}{2}\\text{; las de índice}' + Q + '\\text{impar bajan desde }S_{1}=1\\text{; y cada par}' + Q + '\\text{queda bajo cada impar (hoja «Criterio}' + Q + '\\text{de Leibniz»). Por eso, para todo }n\\text{:}' + Q + '\\dfrac{1}{2}\\le S_{n}\\le 1' + Q + '\\text{Aquí: }0{,}5\\le ' + num(t[7]/t[8], 3) + '\\le 1\\ \\checkmark'
        + Q + '\\text{La serie con signos converge (criterio}' + Q + '\\text{de Leibniz).}');
      L.push('\\text{Sin signos: las sumas parciales solo suben.}' + Q + 'T_{4}=\\dfrac{25}{12}\\approx 2{,}083>2' + Q + 'T_{11}=\\dfrac{83711}{27720}\\approx 3{,}020>3' + Q + '\\text{Aquí: }T_{' + n + '}' + ap(h[7], h[8]) + '\\text{: ' + donde(n) + '.}' + Q + '\\text{Y no hay tope: }T_{2^{m}}\\ge 1+\\dfrac{m}{2}\\text{ para todo}' + Q + 'm\\ge 1\\text{ (hoja «Series harmónicas y}' + Q + '\\text{series-p»). Superan cualquier número:}' + Q + '\\text{la serie sin signos diverge.}');
      L.push('\\text{Qué significa: }\\displaystyle\\sum a_{k}\\text{ converge y }\\sum|a_{k}|' + Q + '\\text{diverge. La serie armónica alternada}' + Q + '\\text{converge condicionalmente: converge}' + Q + '\\text{gracias a los signos.}'
        + (n === 1 ? Q + '\\text{Caso límite: con }n=1\\text{ los dos puntos}' + Q + '\\text{coinciden, }S_{1}=T_{1}=1\\text{; la diferencia}' + Q + '\\text{aparece desde el segundo término.}' : Q + '\\text{Distancia entre los dos puntos:}' + Q + 'T_{' + n + '}-S_{' + n + '}\\approx ' + num(h[7]/h[8], 3) + '-' + num(t[7]/t[8], 3) + '=' + num(Math.round(h[7]/h[8]*1000)/1000 - Math.round(t[7]/t[8]*1000)/1000, 3)));
      return dtPasos(L); }
  };
})());
