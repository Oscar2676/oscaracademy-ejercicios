/* L24 H08 · (a − b)⁴ = (a + (−b))⁴: los coeficientes son los de la suma; el signo de cada término lo pone la potencia (−b)ᵏ: + si k es par, − si k es impar */
OA.scene('bn-signos', (function(){
  var N = 7, CX = [1.5, 3.3, 5.1, 6.9, 8.7], CF = [1, 4, 6, 4, 1];
  var YK = -4.15, YC = -5.3, YA = -6.45, YB = -7.6, YV = -8.15, YM = -8.68, YS = -9.9, Y0 = -12.2, HB = 0.8, YCH = -14.05, YT = -14.85;
  var VT = ['=1', '=-b', '=+b^{2}', '=-b^{3}', '=+b^{4}'], VF = ['= 1', '= −b', '= +b²', '= −b³', '= +b⁴'];
  var TT = ['+a^{4}', '-4a^{3}b', '+6a^{2}b^{2}', '-4ab^{3}', '+b^{4}'], TF = ['+a⁴', '−4a³b', '+6a²b²', '−4ab³', '+b⁴'];
  var PZ = [['Q', '(a-b)^{4}=\\ ?', '(a − b)⁴ = ?', 'pt'], ['S1', '=\\big(a+(-b)\\big)^{4}', '= (a + (−b))⁴', ''],
    ['F', '\\Longrightarrow\\ \\ a^{4}-4a^{3}b+6a^{2}b^{2}-4ab^{3}+b^{4}', '⟹ a⁴ − 4a³b + 6a²b² − 4ab³ + b⁴', 'diff'],
    ['CH', '\\text{con }a=1,\\ b=1:\\quad 1-4+6-4+1=0', 'con a = 1, b = 1: 1 − 4 + 6 − 4 + 1 = 0', ''],
    ['R1', '(a-b)^{4}=\\big(a+(-b)\\big)^{4}', '(a − b)⁴ = (a + (−b))⁴', ''],
    ['R2', '\\text{término }k:\\ \\ \\tbinom{4}{k}\\,a^{4-k}\\,(-b)^{k},\\quad k=0,\\ 1,\\ 2,\\ 3,\\ 4', 'término k: C(4, k) a⁴⁻ᵏ (−b)ᵏ, k = 0, 1, 2, 3, 4', ''],
    ['R3', '(-b)^{k}:\\quad 1,\\ \\ -b,\\ \\ +b^{2},\\ \\ -b^{3},\\ \\ +b^{4}', '(−b)ᵏ: 1, −b, +b², −b³, +b⁴', ''],
    ['R4', 'k\\text{ par: signo }+\\qquad k\\text{ impar: signo }-', 'k par: signo +; k impar: signo −', 'c-tan'],
    ['R5', '+a^{4},\\ \\ -4a^{3}b,\\ \\ +6a^{2}b^{2},\\ \\ -4ab^{3},\\ \\ +b^{4}', '+a⁴, −4a³b, +6a²b², −4ab³, +b⁴', ''],
    ['R6', '(a-b)^{4}=a^{4}-4a^{3}b+6a^{2}b^{2}-4ab^{3}+b^{4}', '(a − b)⁴ = a⁴ − 4a³b + 6a²b² − 4ab³ + b⁴', 'diff'],
    ['R7', '(1-1)^{4}=0\\quad\\text{y}\\quad 1-4+6-4+1=0\\ \\ \\checkmark', '(1 − 1)⁴ = 0 y 1 − 4 + 6 − 4 + 1 = 0 ✓', '']];
  var TXT = [['Restar b es lo mismo que sumar su opuesto, −b.', 'La resta se escribe como una suma.'],
    ['Se usa el binomio de Newton de la suma:', 'un término por cada k, con el mismo coeficiente.'],
    ['Se calcula cada potencia del término que se resta.', 'Cada par de signos menos da un signo más.'],
    ['El signo depende de si k es par o impar:', 'par, signo más; impar, signo menos.'],
    ['Cada término: coeficiente por las dos potencias.', 'Barra arriba: positivo. Barra abajo: negativo.'],
    ['Se escriben los términos seguidos, con su signo.', 'Arriba queda el desarrollo: signos alternados.'],
    ['Comprobación: se reemplazan las letras por 1.', 'Los dos lados dan cero.']];
  (function(){ var i;
    for (i = 0; i < 5; i++){ PZ.push(['K' + i, 'k=' + i, 'k = ' + i, '']); PZ.push(['C' + i, '' + CF[i], '' + CF[i], '']);
      PZ.push(['A' + i, 'a^{' + (4 - i) + '}', 'a' + bnSup(4 - i), '']); PZ.push(['B' + i, '(-b)^{' + i + '}', '(−b)' + bnSup(i), '']);
      PZ.push(['V' + i, VT[i], VF[i], i % 2 ? 'c-tan' : 'c-sec']); PZ.push(['G' + i, i % 2 ? '-' : '+', i % 2 ? '−' : '+', i % 2 ? 'c-tan' : 'c-sec']);
      PZ.push(['T' + i, TT[i], TF[i], i % 2 ? 'c-tan' : 'c-sec']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-21.8, y1:0}, aspect:21.8/10,
    aria:'Animación en siete pasos sobre el desarrollo de a menos b elevado a cuatro. Uno: a menos b elevado a cuatro se escribe como a más menos b, elevado a cuatro. Dos: aparecen cinco columnas, una por cada k desde cero hasta cuatro, con el coeficiente 1, 4, 6, 4, 1, la potencia de a y la potencia de menos b. Tres: se calcula cada potencia de menos b: uno, menos b, más b al cuadrado, menos b al cubo, más b a la cuarta; bajo cada una se ven los signos menos que se multiplican, agrupados en pares. Cuatro: el signo de cada columna: más si k es par, menos si k es impar. Cinco: una barra por término; las de los términos positivos suben, en azul, y las de los negativos bajan, en burdeo; cada barra lleva su término. Seis: junto a la pregunta se escribe el desarrollo: a a la cuarta, menos 4 a al cubo b, más 6 a al cuadrado b al cuadrado, menos 4 a b al cubo, más b a la cuarta. Siete: comprobación con a igual a 1 y b igual a 1: uno menos cuatro más seis menos cuatro más uno es cero. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> término positivo: \\(k\\) par</span><span><i class="sw tan"></i> término negativo: \\(k\\) impar</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var i, j, a, pr, col, h, x, w, m, x0;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; después queda */
      function tx(t, x, y, al, cc, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = cc; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      /* paso 1: la pregunta y, a su lado, la resta escrita como suma del opuesto */
      L('Q', 0.3, -2.1, 0); a = ap(1);
      if (a > 0.45) L('S1', 3.05, -2.1, 0);
      /* paso 2: una columna por cada k: su coeficiente, la potencia de a y la potencia de −b */
      a = ap(2);
      if (a > 0){
        tx('un término por cada valor de k', 0.3, YK + 0.52, 'left', MU, 10.5, a, '700');
        tx('coeficiente: el mismo de la suma', 0.3, YC + 0.52, 'left', MU, 10.5, cl(a*2 - 0.3), '700');
        tx('potencia del primer término', 0.3, YA + 0.52, 'left', MU, 10.5, cl(a*2 - 0.6), '700');
        tx('potencia del término que se resta, con su signo', 0.3, YB + 0.52, 'left', MU, 10.5, cl(a*2 - 0.9), '700');
        for (i = 0; i < 5; i++){ pr = cl(a*5 - i*0.8); if (pr <= 0) continue;
          c.globalAlpha = 0.07*pr; c.fillStyle = i % 2 ? C.tan : C.sec; c.fillRect(X(CX[i] - 0.8), Y(YK + 0.3), X(CX[i] + 0.8) - X(CX[i] - 0.8), Y(YM - 0.25) - Y(YK + 0.3)); c.globalAlpha = 1;
          if (pr > 0.25) L('K' + i, CX[i], YK); if (pr > 0.5) L('C' + i, CX[i], YC); if (pr > 0.7) L('A' + i, CX[i], YA); if (pr > 0.9) L('B' + i, CX[i], YB); } }
      /* paso 3: cuánto vale cada potencia de −b; debajo, los signos menos que se multiplican, de a pares */
      a = ap(3);
      for (i = 0; i < 5; i++){ pr = cl(a*5 - i*0.85); if (pr <= 0) continue; if (pr > 0.5) L('V' + i, CX[i], YV);
        w = 9; x0 = X(CX[i]) - (i - 1)*w/2;
        for (j = 0; j < i; j++){ m = cl(pr*i - j); if (m <= 0) continue; x = x0 + j*w; c.globalAlpha = m; c.strokeStyle = C.tan; c.lineWidth = 1.8; c.beginPath(); c.moveTo(x - 3, Y(YM)); c.lineTo(x + 3, Y(YM)); c.stroke();
          if (j % 2 === 1){ c.strokeStyle = C.sec; c.lineWidth = 1.1; c.beginPath(); c.moveTo(x - w - 3.5, Y(YM) + 4); c.lineTo(x - w - 3.5, Y(YM) + 7); c.lineTo(x + 3.5, Y(YM) + 7); c.lineTo(x + 3.5, Y(YM) + 4); c.stroke(); }
          c.globalAlpha = 1; }
        if (i === 0) tx('ninguno', CX[i], YM, 'center', MU, 10, pr); }
      /* paso 4: el signo del término */
      a = ap(4);
      if (a > 0){ tx('signo: más si k es par, menos si k es impar', 0.3, YS + 0.6, 'left', MU, 10.5, a, '700');
        for (i = 0; i < 5; i++){ pr = cl(a*5 - i*0.85); if (pr <= 0) continue; col = i % 2 ? C.tan : C.sec;
          c.globalAlpha = 0.14; c.fillStyle = col; c.beginPath(); c.arc(X(CX[i]), Y(YS), 10*pr, 0, 6.2832); c.fill(); c.globalAlpha = 1;
          c.strokeStyle = col; c.lineWidth = 1.3; c.beginPath(); c.arc(X(CX[i]), Y(YS), 10, -1.5708, -1.5708 + 6.2832*pr); c.stroke();
          if (pr > 0.5) L('G' + i, CX[i], YS);
          tx(i % 2 ? 'impar' : 'par', CX[i] + 0.42, YS, 'left', col, 10, cl(pr*2 - 1)); } }
      /* paso 5: una barra por término: sube si es positivo, baja si es negativo; su largo es el coeficiente */
      a = ap(5);
      if (a > 0){ tx('términos con su signo; largo de barra: coeficiente', 0.3, Y0 + 1.55, 'left', MU, 10.5, a, '700');
        c.globalAlpha = a; c.strokeStyle = C.ink; c.lineWidth = 1.1; c.beginPath(); c.moveTo(X(0.5), Y(Y0)); c.lineTo(X(0.5 + 9.1*cl(a*3)), Y(Y0)); c.stroke(); c.globalAlpha = 1;
        for (i = 0; i < 5; i++){ pr = cl(a*5 - i*0.85); if (pr <= 0) continue; col = i % 2 ? C.tan : C.sec; h = HB*CF[i]/6*(i % 2 ? -1 : 1)*pr;
          S.poly([[CX[i] - 0.3, Y0], [CX[i] + 0.3, Y0], [CX[i] + 0.3, Y0 + h], [CX[i] - 0.3, Y0 + h]], {fill:col, alpha:0.6});
          if (pr > 0.6) L('T' + i, CX[i], Y0 + HB*CF[i]/6*(i % 2 ? -1 : 1) + (i % 2 ? -0.33 : 0.33)); } }
      /* paso 6: el desarrollo, escrito bajo la pregunta (la pregunta no se borra) */
      if (ap(6) > 0.4) L('F', 0.3, -2.95, 0);
      /* paso 7: comprobación con a = 1 y b = 1 */
      if (ap(7) > 0.4) L('CH', 0.3, YCH, 0);
      /* frase del paso y número de paso */
      tx(TXT[k - 1][0], 0.3, YT, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(YT) + 19);
      tx('paso ' + k + ' de ' + N, 9.9, -2.1, 'right', MU, 11, 1);
      dtQue(S, 'la resta se desarrolla como la suma,', 'pero con los signos alternados: +, −, +, −, +');
      T.fin();
      oaReg(S, k, N, 0.3, -16.75, [0, 28, 56, 80, 104, 128, 152]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '(a-b)^{4}=\\big(a+(-b)\\big)^{4}\\quad\\text{(restar }b\\text{ es sumar }-b\\text{)}',
      '\\text{binomio de Newton, con }-b\\text{ en el lugar de }b:\\\\&\\qquad\\text{término }k=\\tbinom{4}{k}\\,a^{4-k}\\,(-b)^{k},\\quad k=0,\\ 1,\\ 2,\\ 3,\\ 4\\\\&\\qquad\\text{coeficientes }\\tbinom{4}{k}\\text{ (fila 4): }1,\\ 4,\\ 6,\\ 4,\\ 1',
      '\\text{potencias de }-b\\text{, una por una:}\\\\&\\qquad (-b)^{0}=1\\\\&\\qquad (-b)^{1}=-b\\\\&\\qquad (-b)^{2}=(-b)(-b)=+b^{2}\\\\&\\qquad (-b)^{3}=(-b)^{2}(-b)=b^{2}\\,(-b)=-b^{3}\\\\&\\qquad (-b)^{4}=(-b)^{3}(-b)=(-b^{3})(-b)=+b^{4}',
      '\\text{signo }+\\text{ si }k\\text{ es par: }k=0,\\ 2,\\ 4\\\\&\\qquad\\text{signo }-\\text{ si }k\\text{ es impar: }k=1,\\ 3\\\\&\\qquad\\text{en una fórmula: }(-b)^{k}=(-1)^{k}\\,b^{k}',
      '\\text{cada término: coeficiente}\\cdot\\text{potencia}\\cdot\\text{potencia}\\\\&\\qquad k=0:\\ \\ 1\\cdot a^{4}\\cdot 1=+a^{4}\\\\&\\qquad k=1:\\ \\ 4\\cdot a^{3}\\cdot(-b)=-4a^{3}b\\\\&\\qquad k=2:\\ \\ 6\\cdot a^{2}\\cdot b^{2}=+6a^{2}b^{2}\\\\&\\qquad k=3:\\ \\ 4\\cdot a^{1}\\cdot(-b^{3})=-4ab^{3}\\\\&\\qquad k=4:\\ \\ 1\\cdot a^{0}\\cdot b^{4}=+b^{4}\\quad(a^{0}=1)',
      '(a-b)^{4}=a^{4}-4a^{3}b+6a^{2}b^{2}-4ab^{3}+b^{4}\\\\&\\qquad\\text{signos alternados: }+,\\ -,\\ +,\\ -,\\ +',
      '\\text{comprobación con }a=1,\\ b=1:\\\\&\\qquad\\text{lado izquierdo: }(1-1)^{4}=0^{4}=0\\\\&\\qquad\\text{lado derecho: }1-4+6-4+1\\\\&\\qquad 1-4=-3,\\ \\ -3+6=3,\\ \\ 3-4=-1,\\ \\ -1+1=0\\ \\ \\checkmark']; return dtPasos(R.slice(0, k)); }
  };
})());
