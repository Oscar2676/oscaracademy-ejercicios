/* L24 H10 · fórmula del término k + 1: sobre los cinco términos de (a+b)^4 se anotan la posición, el exponente de b (k), el exponente de a (4 − k) y el coeficiente; con eso se arma el 3º término sin mirar los otros y se escribe la fórmula general */
OA.scene('bn-termino', (function(){
  var N = 7, X0 = 0.85, DXC = 1.25, BW = 1.1, BH = 0.62, YP = -3.05, YB = -3.9, YK = -4.8, YA = -5.6, YC = -6.4, YT = -7.3, XR = 6.6;
  var TT = ['a^{4}', '4a^{3}b', '6a^{2}b^{2}', '4ab^{3}', 'b^{4}'], TF = ['a⁴', '4a³b', '6a²b²', '4ab³', 'b⁴'], CO = [1, 4, 6, 4, 1];
  var PZ = [['Q', '\\text{¿el término }k+1\\text{?}', '¿el término k + 1?', 'pt'], ['F', '\\Longrightarrow\\ T_{k+1}=\\tbinom{n}{k}a^{\\,n-k}b^{\\,k}', '⟹ T(k+1) = C(n, k) aⁿ⁻ᵏ bᵏ', 'diff'],
    ['NP', '\\leftarrow\\text{posición}', '← posición', ''],
    ['NK', '\\leftarrow k\\text{: exp. de }b', '← k: exponente de b', 'c-tan'],
    ['NA', '\\leftarrow 4-k\\text{: exp. de }a', '← 4 − k: exponente de a', 'c-sec'],
    ['NC', '\\leftarrow\\tbinom{4}{k}\\text{: coeficiente}', '← C(4, k): coeficiente', 'diff'],
    ['T3', 'T_{3}=\\tbinom{4}{2}a^{4-2}b^{2}=6a^{2}b^{2}', 'T₃ = C(4, 2) a⁴⁻² b² = 6a²b²', 'diff'],
    ['R1', '(a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}', '(a + b)⁴ = a⁴ + 4a³b + 6a²b² + 4ab³ + b⁴', ''],
    ['R2', '\\text{posiciones: }1^{\\circ},\\ 2^{\\circ},\\ 3^{\\circ},\\ 4^{\\circ},\\ 5^{\\circ}', 'posiciones: 1º, 2º, 3º, 4º, 5º', ''],
    ['R3', '\\begin{aligned}&k=\\text{exponente de }b:\\ \\ 0,\\ 1,\\ 2,\\ 3,\\ 4\\\\ &\\text{posición}=k+1\\ \\ (0+1=1,\\ \\dots,\\ 4+1=5)\\end{aligned}', 'k = exponente de b: 0, 1, 2, 3, 4; posición = k + 1 (0 + 1 = 1, …, 4 + 1 = 5)', 'c-tan'],
    ['R4', '\\begin{aligned}&\\text{exponente de }a=4-k:\\\\ &4-0=4,\\,4-1=3,\\,4-2=2,\\,4-3=1,\\,4-4=0\\end{aligned}', 'exponente de a = 4 − k: 4 − 0 = 4, 4 − 1 = 3, 4 − 2 = 2, 4 − 3 = 1, 4 − 4 = 0', 'c-sec'],
    ['R5', '\\begin{aligned}&\\text{coeficiente}=\\tbinom{4}{k}:\\\\ &\\tbinom{4}{0}=1,\\ \\tbinom{4}{1}=4,\\ \\tbinom{4}{2}=6,\\ \\tbinom{4}{3}=4,\\ \\tbinom{4}{4}=1\\end{aligned}', 'coeficiente = C(4, k): C(4, 0) = 1, C(4, 1) = 4, C(4, 2) = 6, C(4, 3) = 4, C(4, 4) = 1', 'diff'],
    ['R6', '\\begin{aligned}&3^{\\circ}\\text{ término}:\\ \\ k=3-1=2\\\\ &T_{3}=\\tbinom{4}{2}a^{4-2}b^{2}=6a^{2}b^{2}\\end{aligned}', '3º término: k = 3 − 1 = 2; T₃ = C(4, 2) a⁴⁻² b² = 6a²b²', ''],
    ['R7', '\\begin{aligned}&\\text{para la posición }k+1,\\text{ con exponente }n:\\\\ &T_{k+1}=\\tbinom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}\\end{aligned}', 'para la posición k + 1, con exponente n: T(k+1) = C(n, k) aⁿ⁻ᵏ bᵏ', 'diff']];
  var TXT = [['Se parte de un desarrollo conocido: exponente 4.', 'Cada término va en un casillero.'],
    ['Sobre cada casillero se anota su posición,', 'contando de izquierda a derecha.'],
    ['Bajo cada casillero, el exponente de la letra b.', 'Va siempre uno atrás de la posición.'],
    ['Después, el exponente de la letra a.', 'Los dos exponentes suman siempre 4.'],
    ['Después, el coeficiente: el número que multiplica.', 'Se calcula con el exponente de la letra b.'],
    ['Se arma el tercer término sin mirar los otros.', 'Resultado igual al de su casillero.'],
    ['La misma receta, escrita con letras:', 'es la fórmula del término de la posición pedida.']];
  (function(){ var j; for (j = 0; j <= 4; j++){ PZ.push(['B' + j, TT[j], TF[j], '']); PZ.push(['O' + j, (j + 1) + '^{\\circ}', (j + 1) + 'º', '']); PZ.push(['K' + j, '' + j, '' + j, 'c-tan']); PZ.push(['A' + j, '' + (4 - j), '' + (4 - j), 'c-sec']); PZ.push(['C' + j, '' + CO[j], '' + CO[j], 'diff']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-17.6, y1:0}, aspect:17.6/10,
    aria:'Animación en siete pasos. Uno: los cinco términos del desarrollo de a más b elevado a 4, cada uno en un casillero: a a la cuarta, 4 a al cubo b, 6 a al cuadrado b al cuadrado, 4 a b al cubo y b a la cuarta. Dos: sobre cada casillero se anota su posición: primero, segundo, tercero, cuarto, quinto. Tres: bajo cada casillero se anota k, el exponente de b: 0, 1, 2, 3, 4; la posición es k más 1. Cuatro: se anota el exponente de a, que es 4 menos k: 4, 3, 2, 1, 0. Cinco: se anota el coeficiente, 4 sobre k: 1, 4, 6, 4, 1. Seis: se destaca la columna del tercer término: k es 3 menos 1, igual a 2, y el término es 4 sobre 2 por a al cuadrado por b al cuadrado, igual a 6 a al cuadrado b al cuadrado. Siete: junto a la pregunta se escribe la fórmula general: el término k más 1 es n sobre k, por a elevado a n menos k, por b elevado a k. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> \\(k\\): el exponente de \\(b\\)</span><span><i class="sw sec"></i> el exponente de \\(a\\): \\(n-k\\)</span><span><i class="sw rise"></i> el coeficiente \\(\\binom{n}{k}\\) y el término elegido</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var j, pr, xc, a6 = ap(6), sel;
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      function col(j){ return X0 + DXC*j; }
      function fila(m, y, pre, nom){ var a = ap(m), i, q; if (a <= 0) return; for (i = 0; i <= 4; i++){ q = cl(a*5 - i*0.8); if (q > 0.3) L(pre + i, col(i), y); } if (a > 0.5) L(nom, XR, y, 0); }
      /* paso 6 (va al fondo): banda naranja sobre la columna del término elegido, el 3º */
      if (a6 > 0){ xc = col(2); c.globalAlpha = 0.13*a6; c.fillStyle = C.rise; c.fillRect(X(xc - BW/2 - 0.04), Y(YP + 0.36), X(xc + BW/2 + 0.04) - X(xc - BW/2 - 0.04), Y(YP + 0.36 + (YC - 0.36 - YP - 0.36)*a6) - Y(YP + 0.36)); c.globalAlpha = 1; }
      /* pasos 3 a 5 (al fondo): punteada que baja de cada casillero por sus tres datos */
      if (ap(3) > 0){ c.strokeStyle = 'rgba(31,93,134,0.25)'; c.lineWidth = 1; c.setLineDash([2, 3]);
        for (j = 0; j <= 4; j++){ pr = (ap(3) + ap(4) + ap(5))/3; c.beginPath(); c.moveTo(X(col(j)), Y(YB - BH/2)); c.lineTo(X(col(j)), Y(YB - BH/2 + (YC + 0.2 - YB + BH/2)*pr)); c.stroke(); } c.setLineDash([]); }
      /* paso 1: un casillero por término, con + entre uno y otro */
      for (j = 0; j <= 4; j++){ pr = cl(ap(1)*6 - j); if (pr <= 0) continue; xc = col(j); sel = j === 2 && a6 > 0.5;
        c.fillStyle = '#fff'; c.fillRect(X(xc - BW/2), Y(YB + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(YB - BH/2) - Y(YB + BH/2));
        c.globalAlpha = pr; c.strokeStyle = sel ? C.rise : 'rgba(31,93,134,0.6)'; c.lineWidth = sel ? 1.9 : 1.1; c.strokeRect(X(xc - BW/2), Y(YB + BH/2), X(xc + BW/2) - X(xc - BW/2), Y(YB - BH/2) - Y(YB + BH/2)); c.globalAlpha = 1;
        if (j > 0) tx('+', xc - DXC/2, YB, 'center', C.ink, 11.5, pr);
        if (pr > 0.5) L('B' + j, xc, YB); }
      tx('← un término', XR, YB + 0.17, 'left', C.ink, 10.5, ap(1), '700'); tx('en cada casillero', XR + 0.42, YB - 0.2, 'left', C.ink, 10.5, ap(1), '700');
      /* pasos 2 a 5: posición, k, exponente de a y coeficiente de cada término */
      fila(2, YP, 'O', 'NP'); fila(3, YK, 'K', 'NK'); fila(4, YA, 'A', 'NA'); fila(5, YC, 'C', 'NC');
      /* paso 6: el término elegido, armado con los datos de su columna */
      if (a6 > 0){ dtFlecha(S, col(2), YC - 0.3, col(2), YC - 0.3 - 0.38*a6, C.rise, 1.4); tx('término elegido: el 3º', 0.3, YT, 'left', C.rise, 10.5, a6, '700'); if (a6 > 0.5) L('T3', 4.15, YT, 0); }
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.3, -1.95, 0); if (ap(7) > 0.5) L('F', 4.2, -1.95, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 0.3, -8.2, 'left', MU, 11, 1);
      tx(TXT[k - 1][0], 0.3, -8.8, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-8.8) + 19);
      dtQue(S, 'cada término se arma con su posición,', 'sin escribir los términos anteriores.');
      T.fin();
      oaReg(S, k, N, 0.3, -10.85, [0, 24, 54, 92, 132, 174, 214]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{desarrollo conocido (hoja H03), }n=4:\\\\&\\qquad (a+b)^{4}=a^{4}+4a^{3}b+6a^{2}b^{2}+4ab^{3}+b^{4}\\\\&\\qquad\\text{tiene }4+1=5\\text{ términos (hoja H09)}',
      '\\text{posición, de izquierda a derecha:}\\\\&\\qquad a^{4}\\text{ es el }1^{\\circ}\\qquad 4a^{3}b\\text{ es el }2^{\\circ}\\\\&\\qquad 6a^{2}b^{2}\\text{ es el }3^{\\circ}\\qquad 4ab^{3}\\text{ es el }4^{\\circ}\\\\&\\qquad b^{4}\\text{ es el }5^{\\circ}',
      'k\\text{ es el exponente de }b\\text{ en cada término:}\\\\&\\qquad 1^{\\circ}:\\ a^{4}=a^{4}b^{0},\\ \\ k=0\\\\&\\qquad 2^{\\circ}:\\ 4a^{3}b=4a^{3}b^{1},\\ \\ k=1\\\\&\\qquad 3^{\\circ}:\\ 6a^{2}b^{2},\\ \\ k=2\\qquad 4^{\\circ}:\\ 4ab^{3},\\ \\ k=3\\\\&\\qquad 5^{\\circ}:\\ b^{4}=a^{0}b^{4},\\ \\ k=4\\\\&\\qquad\\text{posición}=k+1:\\ \\ 0+1=1,\\ \\ 1+1=2,\\\\&\\qquad 2+1=3,\\ \\ 3+1=4,\\ \\ 4+1=5',
      '\\text{exponente de }a=4-k\\text{ (los dos suman 4):}\\\\&\\qquad k=0:\\ 4-0=4\\qquad k=1:\\ 4-1=3\\\\&\\qquad k=2:\\ 4-2=2\\qquad k=3:\\ 4-3=1\\\\&\\qquad k=4:\\ 4-4=0',
      '\\text{coeficiente}=\\tbinom{4}{k}\\text{ («4 sobre }k\\text{», hoja H06):}\\\\&\\qquad\\tbinom{4}{0}=1\\qquad\\tbinom{4}{1}=\\tfrac{4}{1}=4\\\\&\\qquad\\tbinom{4}{2}=\\tfrac{4\\cdot 3}{2\\cdot 1}=\\tfrac{12}{2}=6\\\\&\\qquad\\tbinom{4}{3}=\\tfrac{4\\cdot 3\\cdot 2}{3\\cdot 2\\cdot 1}=\\tfrac{24}{6}=4\\qquad\\tbinom{4}{4}=1',
      '\\text{el }3^{\\circ}\\text{ término, sin mirar los otros:}\\\\&\\qquad k=\\text{posición}-1=3-1=2\\\\&\\qquad\\text{coeficiente: }\\tbinom{4}{2}=\\tfrac{4\\cdot 3}{2\\cdot 1}=\\tfrac{12}{2}=6\\\\&\\qquad\\text{exponente de }a:\\ 4-2=2\\\\&\\qquad\\text{exponente de }b:\\ k=2\\\\&\\qquad T_{3}=6\\,a^{2}\\,b^{2}\\ \\text{ (el del tercer casillero)}',
      '\\text{con letras: exponente }n,\\text{ posición }k+1\\\\&\\qquad\\text{coeficiente: }\\tbinom{n}{k}\\\\&\\qquad\\text{exponente de }a:\\ n-k\\\\&\\qquad\\text{exponente de }b:\\ k\\\\&\\qquad T_{k+1}=\\tbinom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k},\\quad k=0,\\ 1,\\ \\dots,\\ n']; return dtPasos(R.slice(0, k)); }
  };
})());
