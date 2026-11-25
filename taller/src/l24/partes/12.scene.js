/* L24 H12 · término central: los 7 términos de (a+b)^6 como barras (altura = coeficiente), su posición y su k; se cuenta a cada lado, sale el 4º (k = 3 = 6/2), se calcula T4 = 20a³b³; y el caso impar (a+b)^5, con dos centrales */
OA.scene('bn-central', (function(){
  var N = 7, X0 = 1.6, DX = 1.25, BW = 0.72, YB = -6.15, HM = 2.55, YP = -6.55, YK = -7.1, YL = -7.6, YB5 = -11.3, HM5 = 1.2, YP5 = -11.7, YK5 = -12.25;
  var C6 = [1, 6, 15, 20, 15, 6, 1], C5 = [1, 5, 10, 10, 5, 1];
  var PZ = [['Q', '\\text{¿cuál es el término central de }(a+b)^{6}\\text{?}', '¿cuál es el término central de (a + b)⁶?', 'pt'], ['F', '\\Longrightarrow\\ 20a^{3}b^{3}', '⟹ 20a³b³', 'c-tan'],
    ['E6', '(a+b)^{6}', '(a + b)⁶', ''], ['E5', '(a+b)^{5}', '(a + b)⁵', ''],
    ['R1', '\\begin{aligned}(a+b)^{6}={}&a^{6}+6a^{5}b+15a^{4}b^{2}+20a^{3}b^{3}\\\\ &+15a^{2}b^{4}+6ab^{5}+b^{6}\\end{aligned}', '(a + b)⁶ = a⁶ + 6a⁵b + 15a⁴b² + 20a³b³ + 15a²b⁴ + 6ab⁵ + b⁶', ''],
    ['R2', '\\text{número de términos: }n+1=6+1=7', 'número de términos: n + 1 = 6 + 1 = 7', ''],
    ['R3', 'k=\\text{exponente de }b;\\quad \\text{posición}=k+1', 'k = exponente de b; posición = k + 1', 'c-sec'],
    ['R4', '7=3+1+3:\\ \\ \\text{el central es el }4^{\\circ}', '7 = 3 + 1 + 3: el central es el 4º', 'c-tan'],
    ['R5', 'k=4-1=3,\\quad\\text{que es }\\tfrac{n}{2}=\\tfrac{6}{2}=3', 'k = 4 − 1 = 3, que es n/2 = 6/2 = 3', 'c-sec'],
    ['R6', 'T_{4}=\\dbinom{6}{3}a^{6-3}b^{3}=20a^{3}b^{3}', 'T₄ = C(6, 3) a⁶⁻³ b³ = 20a³b³', 'c-tan'],
    ['R7', '\\begin{aligned}&n=5\\text{ (impar): }6\\text{ términos}=3+3\\\\ &\\text{dos centrales: }3^{\\circ}\\text{ y }4^{\\circ}\\ (k=2,\\ 3)\\end{aligned}', 'n = 5 (impar): 6 términos = 3 + 3; dos centrales: 3º y 4º (k = 2 y k = 3)', 'diff']];
  var TXT = [['Cada barra es un término del desarrollo.', 'Su altura es el coeficiente, escrito arriba.'],
    ['Se numeran los términos: del 1º al 7º.', 'Son 7 términos: el exponente más 1.'],
    ['Bajo cada posición va el exponente de b.', 'Ese exponente parte en 0: la posición es uno más.'],
    ['Se busca el término que queda al medio.', 'Tiene 3 términos antes y 3 términos después.'],
    ['El término central es el 4º.', 'Su exponente de b es la mitad del exponente 6.'],
    ['Se calcula el término central con su fórmula.', 'Su barra es la más alta: coeficiente mayor.'],
    ['Con exponente impar hay un número par de términos.', 'Al medio quedan dos, con el mismo coeficiente.']];
  (function(){ var j;
    for (j = 0; j <= 6; j++){ PZ.push(['B' + j, '' + C6[j], '' + C6[j], '']); PZ.push(['O' + j, (j + 1) + '^{\\circ}', (j + 1) + 'º', '']); PZ.push(['K' + j, 'k=' + j, 'k = ' + j, 'c-sec']); }
    for (j = 0; j <= 5; j++){ PZ.push(['D' + j, '' + C5[j], '' + C5[j], j === 2 || j === 3 ? 'diff' : '']); PZ.push(['P' + j, (j + 1) + '^{\\circ}', (j + 1) + 'º', '']); PZ.push(['J' + j, 'k=' + j, 'k = ' + j, 'c-sec']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-22.4, y1:0}, aspect:22.4/10,
    aria:'Animación en siete pasos. Uno: los siete términos del desarrollo de a más b elevado a 6 se dibujan como siete barras; la altura de cada barra es su coeficiente: 1, 6, 15, 20, 15, 6, 1. Dos: bajo cada barra se escribe su posición, de primero a séptimo; son 6 más 1, 7 términos. Tres: bajo cada posición se escribe k, el exponente de b, de 0 a 6; la posición es k más 1. Cuatro: se cuentan 3 términos a la izquierda y 3 a la derecha de la barra del medio, que se pinta burdeo: el término central es el cuarto. Cinco: su k es 4 menos 1, 3, la mitad de 6. Seis: el término central es 6 sobre 3 por a al cubo por b al cubo, 20 a cubo b cubo; su barra es la más alta. Siete: abajo, las seis barras de a más b elevado a 5, con coeficientes 1, 5, 10, 10, 5, 1: al medio quedan dos, la tercera y la cuarta, de la misma altura. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> término central de \\((a+b)^{6}\\)</span><span><i class="sw sec"></i> los demás términos; \\(k\\), el exponente de \\(b\\)</span><span><i class="sw rise"></i> los dos centrales de \\((a+b)^{5}\\)</span>',
    anim:{run:40000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var j, pr, h, x, a1 = ap(1), a2 = ap(2), a3 = ap(3), a4 = ap(4), a5 = ap(5), a6 = ap(6), a7 = ap(7), cen;
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); } /* cuánto ha aparecido lo del paso m; después queda */
      function tx(t, x, yy, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(yy)); c.globalAlpha = 1; }
      function col(j){ return X0 + DX*j; }
      function col5(j){ return X0 + DX*(j + 0.5); }
      function barra(xc, yb, hh, fill, alpha){ S.poly([[xc - BW/2, yb], [xc + BW/2, yb], [xc + BW/2, yb + hh], [xc - BW/2, yb + hh]], {fill:fill, alpha:alpha}); }
      function corchete(xa, xb, yy, colr, alpha){ if (alpha <= 0) return; c.globalAlpha = alpha; c.strokeStyle = colr; c.lineWidth = 1.2; c.setLineDash([]); c.beginPath(); c.moveTo(X(xa), Y(yy) - 5); c.lineTo(X(xa), Y(yy)); c.lineTo(X(xa + (xb - xa)*alpha), Y(yy)); if (alpha >= 1) c.lineTo(X(xb), Y(yy) - 5); c.stroke(); c.globalAlpha = 1; }
      /* paso 1: una barra por término de (a+b)^6; arriba, su coeficiente */
      L('E6', 0.12, -2.95, 0);
      tx('coeficientes', 9.85, -2.95, 'right', MU, 10.5, a1, '700');
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); c.moveTo(X(col(0) - 0.6), Y(YB)); c.lineTo(X(col(6) + 0.6), Y(YB)); c.stroke();
      for (j = 0; j <= 6; j++){ pr = cl(a1*8 - j); if (pr <= 0) continue; cen = j === 3 && a4 > 0; h = HM*C6[j]/20*dtSuave(pr); x = col(j);
        barra(x, YB, h, C.sec, 0.38);
        if (cen) barra(x, YB, h, C.tan, 0.85*a4);
        if (pr > 0.6) L('B' + j, x, YB + h + 0.32); }
      /* paso 2: la posición de cada término */
      if (a2 > 0){ tx('posición', 0.12, YP, 'left', C.ink, 10, a2, '700'); for (j = 0; j <= 6; j++){ pr = cl(a2*8 - j); if (pr > 0.4) L('O' + j, col(j), YP); } }
      /* paso 3: k, el exponente de b, bajo cada posición */
      if (a3 > 0){ for (j = 0; j <= 6; j++){ pr = cl(a3*8 - j); if (pr > 0.4) L('K' + j, col(j), YK); } }
      /* paso 4: 3 términos antes, el del medio, 3 términos después */
      if (a4 > 0){ corchete(col(0) - 0.4, col(2) + 0.4, YL, C.sec, cl(a4*2)); corchete(col(4) - 0.4, col(6) + 0.4, YL, C.sec, cl(a4*2 - 0.6));
        tx('3 términos antes', col(1), YL - 0.38, 'center', C.sec, 10.5, cl(a4*2), '700'); tx('3 términos después', col(5), YL - 0.38, 'center', C.sec, 10.5, cl(a4*2 - 0.6), '700');
        tx('al medio', col(3), YL - 0.1, 'center', C.tan, 10.5, cl(a4*2 - 1), '700');
        tx('término central', col(3), YL - 0.92, 'center', C.tan, 10.5, cl(a4*2 - 1), '700'); }
      /* paso 5: el k del central se destaca */
      if (a5 > 0){ c.globalAlpha = a5; c.strokeStyle = C.tan; c.lineWidth = 1.4; c.strokeRect(X(col(3)) - 19, Y(YK) - 10, 38, 20); c.strokeRect(X(col(3)) - 12, Y(YP) - 9, 24, 18); c.globalAlpha = 1; }
      /* paso 6: la barra central es la más alta: línea punteada a su altura */
      if (a6 > 0){ c.globalAlpha = a6; c.strokeStyle = C.tan; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(col(0) - 0.5), Y(YB + HM)); c.lineTo(X(col(0) - 0.5 + (col(6) + 1.0 - col(0))*a6), Y(YB + HM)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        tx('coeficiente mayor', 0.12, YB + HM - 0.36, 'left', C.tan, 10.5, a6, '700'); }
      /* paso 7: (a+b)^5, seis barras; al medio quedan dos */
      if (a7 > 0){ if (a7 > 0.1) L('E5', 0.12, -9.25, 0);
        tx('exponente impar: 6 términos', 9.85, -9.25, 'right', C.rise, 10.5, a7, '700');
        c.globalAlpha = a7; c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(col5(0) - 0.6), Y(YB5)); c.lineTo(X(col5(5) + 0.6), Y(YB5)); c.stroke(); c.globalAlpha = 1;
        for (j = 0; j <= 5; j++){ pr = cl(a7*8 - j); if (pr <= 0) continue; cen = j === 2 || j === 3; h = HM5*C5[j]/10*dtSuave(pr); x = col5(j);
          barra(x, YB5, h, cen ? C.rise : C.sec, cen ? 0.85 : 0.38);
          if (pr > 0.6){ L('D' + j, x, YB5 + h + 0.3); L('P' + j, x, YP5); L('J' + j, x, YK5); } }
        pr = cl(a7*8 - 6);
        corchete(col5(2) - 0.4, col5(3) + 0.4, YK5 - 0.42, C.rise, pr); tx('dos términos centrales', (col5(2) + col5(3))/2, YK5 - 0.8, 'center', C.rise, 10.5, pr, '700'); }
      /* la pregunta queda arriba; la respuesta se escribe a su lado */
      L('Q', 0.12, -1.95, 0); if (a6 > 0.6) L('F', 7.3, -1.95, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 0.12, -13.7, 'left', MU, 11, 1);
      tx(TXT[k - 1][0], 0.12, -14.3, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.12), Y(-14.3) + 19);
      dtQue(S, 'el término central queda al medio:', 'igual cantidad de términos a cada lado.');
      T.fin();
      oaReg(S, k, N, 0.12, -16.25, [6, 40, 64, 88, 112, 144, 184]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{desarrollo de }(a+b)^{6}\\text{ (hoja H07):}\\\\&\\qquad a^{6}+6a^{5}b+15a^{4}b^{2}+20a^{3}b^{3}\\\\&\\qquad {}+15a^{2}b^{4}+6ab^{5}+b^{6}\\\\&\\qquad\\text{una barra por término; altura}=\\text{coeficiente:}\\\\&\\qquad 1,\\ 6,\\ 15,\\ 20,\\ 15,\\ 6,\\ 1',
      '\\text{se numeran los términos: }1^{\\circ},\\ 2^{\\circ},\\ \\dots,\\ 7^{\\circ}\\\\&\\qquad\\text{número de términos}=n+1=6+1=7',
      '\\text{bajo cada posición, }k=\\text{exponente de }b:\\\\&\\qquad k=0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5,\\ 6\\\\&\\qquad\\text{posición}=k+1:\\ \\ 0+1=1,\\ 1+1=2,\\ \\dots,\\ 6+1=7',
      '\\text{se busca el término del medio:}\\\\&\\qquad\\text{se saca uno para el medio: }7-1=6\\\\&\\qquad\\text{a cada lado: }6:2=3\\\\&\\qquad\\text{tiene 3 antes: es el }3+1=4^{\\circ}\\\\&\\qquad\\text{comprobación: }3+1+3=7',
      'k\\text{ del término central }(k=\\text{posición}-1):\\\\&\\qquad k=4-1=3\\\\&\\qquad\\text{es la mitad del exponente: }\\tfrac{n}{2}=\\tfrac{6}{2}=3',
      '\\text{fórmula del término: }T_{k+1}=\\dbinom{n}{k}a^{\\,n-k}b^{\\,k}\\\\&\\qquad\\text{reemplazo: }T_{4}=\\dbinom{6}{3}a^{6-3}b^{3};\\quad 6-3=3\\\\&\\qquad\\dbinom{6}{3}=\\dfrac{6\\cdot 5\\cdot 4}{3\\cdot 2\\cdot 1}\\\\&\\qquad\\text{arriba: }6\\cdot 5=30,\\ \\ 30\\cdot 4=120\\\\&\\qquad\\text{abajo: }3\\cdot 2=6,\\ \\ 6\\cdot 1=6\\\\&\\qquad\\text{división: }120:6=20\\\\&\\qquad T_{4}=20a^{3}b^{3};\\ \\ 20\\text{ es el coeficiente mayor}',
      '\\text{exponente impar, }(a+b)^{5}:\\ \\ 5+1=6\\text{ términos}\\\\&\\qquad\\text{coeficientes: }1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1\\\\&\\qquad\\text{dos mitades: }6:2=3\\text{ y }3\\\\&\\qquad\\text{al medio quedan dos: }3^{\\circ}\\text{ y }3+1=4^{\\circ}\\\\&\\qquad k=3-1=2\\ \\text{ y }\\ k=4-1=3\\\\&\\qquad T_{3}=10a^{3}b^{2},\\quad T_{4}=10a^{2}b^{3}']; return dtPasos(R.slice(0, k)); }
  };
})());
