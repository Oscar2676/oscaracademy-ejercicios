/* L24 H04 · (a+b)(a+b)(a+b): cada producto sale de un camino (una letra elegida en cada factor); el coeficiente cuenta los caminos que dan el mismo producto */
OA.scene('bn-caminos', (function(){
  var N = 7, FX = [1.4, 3.2, 5.0], DX = 0.38, YF = -3.6, Y0 = -4.5, DY = 0.53, XP = 6.75;
  var W = ['aaa', 'aab', 'aba', 'baa', 'abb', 'bab', 'bba', 'bbb'];
  var G = [[0, 0], [1, 3], [4, 6], [7, 7]], GT = ['a^{3}', 'a^{2}b', 'ab^{2}', 'b^{3}'], GF = ['a³', 'a²b', 'ab²', 'b³'], CN = [1, 3, 3, 1];
  var PZ = [['Q', '(a+b)^{3}=\\ ?', '(a + b)³ = ?', 'pt'], ['F', '\\Longrightarrow\\ \\ a^{3}+3a^{2}b+3ab^{2}+b^{3}', '⟹ a³ + 3a²b + 3ab² + b³', 'diff'],
    ['R1', '(a+b)^{3}=(a+b)(a+b)(a+b)', '(a + b)³ = (a + b)(a + b)(a + b)', ''],
    ['R2', '\\text{una letra de cada factor: }a\\cdot a\\cdot a=aaa', 'una letra de cada factor: a·a·a = aaa', ''],
    ['R3', '\\begin{aligned}(a+b)^{3}={}&aaa+aab+aba+baa\\\\ {}+{}&abb+bab+bba+bbb\\end{aligned}', 'aaa + aab + aba + baa + abb + bab + bba + bbb', ''],
    ['R4', '\\begin{aligned}&aaa=a^{3},\\quad aab=aba=baa=a^{2}b\\\\ &abb=bab=bba=ab^{2},\\quad bbb=b^{3}\\end{aligned}', 'aab = aba = baa = a²b; abb = bab = bba = ab²', ''],
    ['R5', '\\text{se cuentan: }1,\\ 3,\\ 3,\\ 1\\qquad 1+3+3+1=8', 'se cuentan: 1, 3, 3, 1; 1 + 3 + 3 + 1 = 8', ''],
    ['R6', '(a+b)^{3}=1a^{3}+3a^{2}b+3ab^{2}+1b^{3}', '(a + b)³ = 1a³ + 3a²b + 3ab² + 1b³', 'diff'],
    ['R7', '\\text{coeficiente}=\\text{número de caminos iguales}', 'coeficiente = número de caminos iguales', 'c-tan']];
  var TXT = [['El cubo son tres factores iguales, multiplicados.', 'Cada factor ofrece dos letras.'],
    ['Elección: una letra de cada factor (3 puntos).', 'La línea que une los puntos es un camino.'],
    ['Se cambia la elección de todas las maneras:', 'hay 8 caminos y cada uno da un producto.'],
    ['Productos con las mismas letras son iguales:', 'son términos semejantes. Se agrupan.'],
    ['Se cuenta cuántos productos tiene cada grupo.', 'Entre todos son los 8.'],
    ['Cada cuenta es el coeficiente de su término.', 'Arriba queda escrito el desarrollo.'],
    ['La b puede salir del factor 3, del 2 o del 1:', 'son 3 caminos; por eso el coeficiente es 3.']];
  (function(){ var f, i;
    for (f = 0; f < 3; f++){ PZ.push(['PL' + f, '(', '(', '']); PZ.push(['A' + f, 'a', 'a', 'c-sec']); PZ.push(['PM' + f, '+', '+', '']); PZ.push(['B' + f, 'b', 'b', 'diff']); PZ.push(['PR' + f, ')', ')', '']); }
    for (i = 0; i < 8; i++) PZ.push(['P' + i, W[i], W[i], '']);
    for (i = 0; i < 4; i++){ PZ.push(['G' + i, '=' + GT[i], '= ' + GF[i], '']); PZ.push(['N' + i, '' + CN[i], '' + CN[i], 'c-tan']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-17.7, y1:0}, aspect:17.7/10,
    aria:'Animación en siete pasos. Uno: a más b al cubo escrito como tres factores, a más b por a más b por a más b. Dos: se elige una letra de cada factor; los tres puntos marcan las letras elegidas y la línea que los une es un camino; el primer camino toma a, a, a y da el producto a a a. Tres: los ocho caminos posibles, uno por fila, cada uno con su producto: a a a, a a b, a b a, b a a, a b b, b a b, b b a, b b b. Cuatro: los productos con las mismas letras se agrupan como términos semejantes: a al cubo, a al cuadrado b, a b al cuadrado y b al cubo. Cinco: se cuenta cada grupo: 1, 3, 3 y 1. Seis: esas cuentas son los coeficientes: a al cubo más 3 a al cuadrado b más 3 a b al cuadrado más b al cubo. Siete: el coeficiente 3 cuenta los tres caminos en que la b sale de un solo factor. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> punto azul: se eligió \\(a\\)</span><span><i class="sw rise"></i> punto naranja: se eligió \\(b\\)</span><span><i class="sw tan"></i> cuántos caminos dan el mismo producto: el coeficiente</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var f, i, g, a, pr, y, yb, ya;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; después queda */
      function ry(r){ return Y0 - DY*r; }
      function gx(ff, ch){ return FX[ff] + (ch === 'b' ? DX : -DX); }
      function tx(t, x, y, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      /* un camino: los tres puntos (una letra por factor), la línea que los une y la flecha hasta su producto */
      function fila(r, p){ var P = [], j, len = [], tot = 0, d, rest, x0, y0, x1, y1, q; if (p <= 0){ return false; }
        for (j = 0; j < 3; j++) P.push([X(gx(j, W[r].charAt(j))), Y(ry(r))]); P.push([X(XP - 0.75), Y(ry(r))]);
        for (j = 0; j < 3; j++){ d = Math.hypot(P[j + 1][0] - P[j][0], P[j + 1][1] - P[j][1]); len.push(d); tot += d; }
        tx('' + (r + 1), 0.3, ry(r), 'center', MU, 10.5, cl(p*3));
        rest = p*tot; c.strokeStyle = C.ink; c.globalAlpha = 0.55; c.lineWidth = 1.1; c.setLineDash([]); c.beginPath(); c.moveTo(P[0][0], P[0][1]);
        for (j = 0; j < 3 && rest > 0; j++){ q = Math.min(1, rest/len[j]); c.lineTo(P[j][0] + (P[j + 1][0] - P[j][0])*q, P[j][1] + (P[j + 1][1] - P[j][1])*q); rest -= len[j]; } c.stroke(); c.globalAlpha = 1;
        if (p >= 1){ x1 = P[3][0]; y1 = P[3][1]; c.fillStyle = C.ink; c.globalAlpha = 0.55; c.beginPath(); c.moveTo(x1 + 5, y1); c.lineTo(x1 - 2, y1 - 3.2); c.lineTo(x1 - 2, y1 + 3.2); c.closePath(); c.fill(); c.globalAlpha = 1; }
        d = 0; for (j = 0; j < 3; j++){ if (p*tot >= d - 0.01){ c.beginPath(); c.arc(P[j][0], P[j][1], 3.6, 0, 6.2832); c.fillStyle = W[r].charAt(j) === 'b' ? C.rise : C.sec; c.fill(); } d += len[j]; }
        if (p > 0.85) L('P' + r, XP, ry(r)); return true; }
      /* paso 1: los tres factores, cada uno en su recuadro */
      for (f = 0; f < 3; f++){ a = k > 1 ? 1 : cl(u*2.6 - f*0.7); if (a <= 0) continue;
        c.globalAlpha = a; c.fillStyle = 'rgba(31,93,134,0.07)'; c.strokeStyle = 'rgba(31,93,134,0.45)'; c.lineWidth = 1; c.fillRect(X(FX[f] - 0.8), Y(YF + 0.34), X(FX[f] + 0.8) - X(FX[f] - 0.8), Y(YF - 0.34) - Y(YF + 0.34)); c.strokeRect(X(FX[f] - 0.8), Y(YF + 0.34), X(FX[f] + 0.8) - X(FX[f] - 0.8), Y(YF - 0.34) - Y(YF + 0.34)); c.globalAlpha = 1;
        tx('factor ' + (f + 1), FX[f], YF + 0.62, 'center', C.sec, 10.5, a, '700');
        if (a > 0.5){ L('PL' + f, FX[f] - 0.66, YF); L('A' + f, FX[f] - DX, YF); L('PM' + f, FX[f], YF); L('B' + f, FX[f] + DX, YF); L('PR' + f, FX[f] + 0.66, YF); } }
      /* paso 7: los tres caminos que dan el mismo producto (la b sale de un solo factor), destacados */
      a = ap(7);
      if (a > 0){ c.globalAlpha = 0.13*a; c.fillStyle = C.tan; c.fillRect(X(0.08), Y(ry(1) + DY/2), X(9.92) - X(0.08), Y(ry(3) - DY/2) - Y(ry(1) + DY/2)); c.globalAlpha = 1; }
      /* paso 2: bajo cada letra, su columna; el punto en una columna dice «se eligió esta letra» */
      a = ap(2);
      if (a > 0){ c.strokeStyle = 'rgba(0,0,0,0.16)'; c.lineWidth = 1; c.setLineDash([2, 3]); yb = YF - 0.36; ya = ry(7) - 0.28;
        for (f = 0; f < 3; f++){ c.beginPath(); c.moveTo(X(gx(f, 'a')), Y(yb)); c.lineTo(X(gx(f, 'a')), Y(yb + (ya - yb)*cl(a*2))); c.moveTo(X(gx(f, 'b')), Y(yb)); c.lineTo(X(gx(f, 'b')), Y(yb + (ya - yb)*cl(a*2))); c.stroke(); } c.setLineDash([]);
        tx('producto', XP, YF - 0.1, 'center', MU, 10.5, a, '700');
        tx('punto: elección de una letra · línea: camino', 0.3, ry(7) - 0.75, 'left', MU, 11, a);
        fila(0, cl(a*2 - 0.7)); }
      /* paso 3: los otros siete caminos, uno por uno */
      a = ap(3);
      for (i = 1; i < 8; i++){ pr = cl(a*7 - (i - 1)); if (!fila(i, pr)) continue; }
      /* paso 4: llaves que agrupan los términos semejantes */
      a = ap(4);
      if (a > 0){ tx('términos semejantes', 9.9, YF + 0.85, 'right', MU, 10.5, a, '700');
        for (g = 0; g < 4; g++){ pr = cl(a*4 - g*0.8); if (pr <= 0) continue; y = (ry(G[g][0]) + ry(G[g][1]))/2; yb = ry(G[g][0]) + 0.2; ya = ry(G[g][1]) - 0.2;
          c.strokeStyle = C.ink; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(7.42), Y(yb)); c.lineTo(X(7.56), Y(yb)); c.lineTo(X(7.56), Y(yb + (ya - yb)*pr)); if (pr >= 1) c.lineTo(X(7.42), Y(ya)); c.stroke();
          if (pr > 0.6) L('G' + g, 7.72, y, 0); } }
      /* paso 5: cuántos productos tiene cada grupo */
      a = ap(5);
      if (a > 0){ tx('cuántos', 9.9, YF + 0.42, 'right', C.tan, 10.5, a, '700');
        for (g = 0; g < 4; g++){ pr = cl(a*4 - g*0.8); if (pr <= 0) continue; y = (ry(G[g][0]) + ry(G[g][1]))/2;
          if (ap(6) > 0){ c.globalAlpha = 0.16*ap(6); c.fillStyle = C.tan; c.beginPath(); c.arc(X(9.4), Y(y), 9.5, 0, 6.2832); c.fill(); c.globalAlpha = 1; }
          c.strokeStyle = C.tan; c.lineWidth = 1.2; c.beginPath(); c.arc(X(9.4), Y(y), 9.5, -1.5708, -1.5708 + 6.2832*pr); c.stroke();
          if (pr > 0.5) L('N' + g, 9.4, y); } }
      /* paso 6: cada cuenta es un coeficiente; el desarrollo se escribe arriba, junto a la pregunta */
      tx('= coeficiente', 9.9, YF - 0.1, 'right', C.tan, 10.5, ap(6), '700');
      L('Q', 0.3, -2.0, 0); if (ap(6) > 0.5) L('F', 3.0, -2.0, 0);
      /* paso 7: anillo en la b de cada uno de los tres caminos */
      a = ap(7);
      if (a > 0){ c.strokeStyle = C.tan; c.lineWidth = 1.5; for (i = 1; i <= 3; i++){ pr = cl(a*3 - (i - 1)*0.7); if (pr <= 0) continue; f = W[i].indexOf('b'); c.beginPath(); c.arc(X(gx(f, 'b')), Y(ry(i)), 7, -1.5708, -1.5708 + 6.2832*pr); c.stroke(); } }
      /* frase del paso y número de paso */
      tx(TXT[k - 1][0], 0.3, ry(7) - 1.45, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(ry(7) - 1.45) + 19);
      tx('paso ' + k + ' de ' + N, 9.9, ry(7) - 0.75, 'right', MU, 11, 1);
      dtQue(S, 'cada producto sale de un camino;', 'el coeficiente cuenta los caminos iguales.');
      T.fin();
      oaReg(S, k, N, 0.3, -11.9, [0, 24, 56, 96, 128, 152, 176]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '(a+b)^{3}=(a+b)(a+b)(a+b)\\quad\\text{(tres factores)}',
      '\\text{elección: una letra de cada factor. Primera: }a,\\ a,\\ a\\\\&\\qquad\\text{su producto: }a\\cdot a\\cdot a\\text{, que se escribe }aaa',
      '\\text{caminos: }2\\cdot 2\\cdot 2=4\\cdot 2=8\\text{, uno por cada elección}\\\\&\\qquad\\text{productos: }aaa,\\ aab,\\ aba,\\ baa,\\ abb,\\ bab,\\ bba,\\ bbb',
      '\\text{términos semejantes (el orden no cambia el producto):}\\\\&\\qquad aaa=a^{3}\\\\&\\qquad aab=aba=baa=a^{2}b\\\\&\\qquad abb=bab=bba=ab^{2}\\\\&\\qquad bbb=b^{3}',
      '\\text{se cuentan: }1\\text{ de }a^{3},\\ 3\\text{ de }a^{2}b,\\ 3\\text{ de }ab^{2},\\ 1\\text{ de }b^{3}\\\\&\\qquad 1+3=4,\\quad 4+3=7,\\quad 7+1=8\\ \\text{(están los 8)}',
      '(a+b)^{3}=1\\,a^{3}+3\\,a^{2}b+3\\,ab^{2}+1\\,b^{3}\\\\&\\qquad\\qquad\\ =a^{3}+3a^{2}b+3ab^{2}+b^{3}',
      '\\text{coeficiente de }a^{2}b\\text{: la }b\\text{ sale del factor 3, del 2 o del 1}\\\\&\\qquad\\text{son 3 caminos, y el coeficiente es }3\\\\&\\qquad\\text{coeficiente}=\\text{número de caminos que dan ese producto}']; return dtPasos(R.slice(0, k)); }
  };
})());
