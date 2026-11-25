/* L24 H05 · enunciado del binomio de Newton: cómo se arma cada término de (a+b)^5 (valor de k, potencia de a, potencia de b, coeficiente «5 sobre k») y cómo de ahí sale la fórmula con n */
OA.scene('bn-enunciado', (function(){
  var N = 7, X0 = 2.95, DXC = 1.27, HW = 0.58, YK = -3.95, YA = -4.7, YB = -5.4, YC = -6.2, YV = -7.0, YT = [-7.85, -8.45], YG = -9.55, YF = -10.85;
  var CF = [1, 5, 10, 10, 5, 1];
  var TT = ['a^{5}', '5a^{4}b', '10a^{3}b^{2}', '10a^{2}b^{3}', '5ab^{4}', 'b^{5}'], TF = ['a⁵', '5a⁴b', '10a³b²', '10a²b³', '5ab⁴', 'b⁵'];
  var PZ = [['Q', '(a+b)^{5}=\\ ?', '(a + b)⁵ = ?', 'pt'],
    ['F', '=a^{5}+5a^{4}b+10a^{3}b^{2}+10a^{2}b^{3}+5ab^{4}+b^{5}', '= a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵', 'diff'],
    ['G', '(a+b)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}', '(a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ', 'c-tan'],
    ['R1', 'n=5:\\quad k=0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5\\quad(5+1=6\\text{ términos})', 'n = 5: k = 0, 1, 2, 3, 4, 5 (5 + 1 = 6 términos)', ''],
    ['R2', '\\text{exponente de }a=5-k:\\quad 5,\\ 4,\\ 3,\\ 2,\\ 1,\\ 0', 'exponente de a = 5 − k: 5, 4, 3, 2, 1, 0', 'c-sec'],
    ['R3', '\\text{exponente de }b=k:\\quad 0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5', 'exponente de b = k: 0, 1, 2, 3, 4, 5', 'diff'],
    ['R4', '\\dbinom{5}{2}=\\dfrac{5!}{2!\\cdot 3!}=\\dfrac{120}{2\\cdot 6}=\\dfrac{120}{12}=10', 'C(5, 2) = 5!/(2!·3!) = 120/(2·6) = 120/12 = 10', 'c-tan'],
    ['R5', '\\text{coeficientes: }1,\\ 5,\\ 10,\\ 10,\\ 5,\\ 1', 'coeficientes: 1, 5, 10, 10, 5, 1', 'c-tan'],
    ['R6', '\\begin{aligned}(a+b)^{5}={}&a^{5}+5a^{4}b+10a^{3}b^{2}\\\\ {}+{}&10a^{2}b^{3}+5ab^{4}+b^{5}\\end{aligned}', '(a + b)⁵ = a⁵ + 5a⁴b + 10a³b² + 10a²b³ + 5ab⁴ + b⁵', ''],
    ['R7', '(a+b)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}', '(a + b)ⁿ = Σ C(n, k) aⁿ⁻ᵏ bᵏ', 'c-tan']];
  var TXT = [['Un término por cada valor de k, de 0 a 5.', 'Son 6 columnas: 6 términos.'],
    ['Potencia de a: su exponente es 5 menos k.', 'Baja de 5 a 0, de uno en uno.'],
    ['Potencia de b: su exponente es k.', 'Sube de 0 a 5. Los dos exponentes suman 5.'],
    ['Coeficiente de la columna 2: es «5 sobre 2».', 'Se calcula con factoriales y vale 10.'],
    ['Los demás coeficientes, con la misma cuenta.', 'Se leen igual en los dos sentidos.'],
    ['Término: coeficiente por las dos potencias.', 'La suma de los 6 términos es el desarrollo.'],
    ['Con n en lugar de 5 queda el enunciado:', 'el binomio de Newton.']];
  (function(){ var i, s = ['⁰', '¹', '²', '³', '⁴', '⁵'];
    for (i = 0; i < 6; i++){ PZ.push(['K' + i, '' + i, '' + i, '']); PZ.push(['A' + i, 'a^{' + (5 - i) + '}', 'a' + s[5 - i], 'c-sec']); PZ.push(['B' + i, 'b^{' + i + '}', 'b' + s[i], 'diff']);
      PZ.push(['C' + i, '\\tbinom{5}{' + i + '}', 'C(5,' + i + ')', 'c-tan']); PZ.push(['V' + i, '' + CF[i], '' + CF[i], 'c-tan']); PZ.push(['T' + i, TT[i], TF[i], '']); } })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-19.7, y1:0}, aspect:19.7/10,
    aria:'Animación en siete pasos sobre el desarrollo de a más b elevado a 5. Uno: una tabla con seis columnas, una por cada valor de k, de 0 a 5; cada columna es un término. Dos: en cada columna, la potencia de a, con exponente 5 menos k: a a la 5, a la 4, a la 3, a la 2, a la 1 y a la 0. Tres: la potencia de b, con exponente k: b a la 0, a la 1, a la 2, a la 3, a la 4 y a la 5. Cuatro: el coeficiente de la columna k igual a 2 es 5 sobre 2, que vale 120 dividido por 12, es decir, 10. Cinco: los demás coeficientes: 1, 5, 10, 10, 5 y 1. Seis: cada término es su coeficiente por sus dos potencias, y la suma de los seis términos es el desarrollo: a a la 5, más 5 a a la 4 b, más 10 a al cubo b al cuadrado, más 10 a al cuadrado b al cubo, más 5 a b a la 4, más b a la 5. Siete: con n en lugar de 5 queda el enunciado del binomio de Newton, escrito con sumatoria. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> potencia de \\(a\\): exponente \\(5-k\\)</span><span><i class="sw rise"></i> potencia de \\(b\\): exponente \\(k\\)</span><span><i class="sw tan"></i> coeficiente \\(\\binom{5}{k}\\) de cada término</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var i, a, pr, x, yb;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; después queda */
      function cx(j){ return X0 + DXC*j; }
      function tx(t, x, y, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function seq(n, j, m){ return cl(ap(n)*(m || 6) - j*0.85); } /* las columnas aparecen una tras otra */
      /* paso 1: seis columnas, una por cada valor de k */
      tx('valor de k', 0.3, YK, 'left', MU, 10.5, ap(1), '700');
      for (i = 0; i < 6; i++){ pr = seq(1, i); if (pr <= 0) continue; yb = YK + 0.36 + (YV - 0.36 - YK - 0.36)*pr;
        c.globalAlpha = pr; c.fillStyle = 'rgba(31,93,134,0.06)'; c.fillRect(X(cx(i) - HW), Y(YK + 0.36), X(cx(i) + HW) - X(cx(i) - HW), Y(yb) - Y(YK + 0.36));
        c.strokeStyle = 'rgba(31,93,134,0.4)'; c.lineWidth = 1; c.strokeRect(X(cx(i) - HW), Y(YK + 0.36), X(cx(i) + HW) - X(cx(i) - HW), Y(yb) - Y(YK + 0.36)); c.globalAlpha = 1;
        if (pr > 0.4) L('K' + i, cx(i), YK); }
      if (ap(1) > 0){ c.strokeStyle = 'rgba(0,0,0,0.14)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(0.3), Y(YK - 0.36)); c.lineTo(X(0.3 + (cx(5) + HW - 0.3)*ap(1)), Y(YK - 0.36)); c.stroke(); }
      /* paso 4: la columna k = 2 queda destacada: ahí se calcula el primer coeficiente */
      a = ap(4);
      if (a > 0){ c.globalAlpha = 0.12*a; c.fillStyle = C.tan; c.fillRect(X(cx(2) - HW), Y(YK + 0.36), X(cx(2) + HW) - X(cx(2) - HW), Y(YV - 0.36) - Y(YK + 0.36)); c.globalAlpha = a; c.strokeStyle = C.tan; c.lineWidth = 1.5; c.strokeRect(X(cx(2) - HW), Y(YK + 0.36), X(cx(2) + HW) - X(cx(2) - HW), Y(YV - 0.36) - Y(YK + 0.36)); c.globalAlpha = 1; }
      /* paso 2: potencia de a en cada columna */
      tx('potencia de a', 0.3, YA, 'left', C.sec, 10.5, ap(2), '700');
      for (i = 0; i < 6; i++) if (seq(2, i) > 0.5) L('A' + i, cx(i), YA);
      /* paso 3: potencia de b en cada columna */
      tx('potencia de b', 0.3, YB, 'left', C.rise, 10.5, ap(3), '700');
      for (i = 0; i < 6; i++) if (seq(3, i) > 0.5) L('B' + i, cx(i), YB);
      /* pasos 4 y 5: «5 sobre k» y su valor, el coeficiente */
      tx('«5 sobre k»', 0.3, YC, 'left', C.tan, 10.5, ap(4), '700'); tx('coeficiente', 0.3, YV, 'left', C.tan, 10.5, ap(4), '700');
      if (ap(4) > 0.3) L('C2', cx(2), YC); if (ap(4) > 0.7) L('V2', cx(2), YV);
      for (i = 0, x = 0; i < 6; i++){ if (i === 2) continue; pr = cl(ap(5)*5 - x*0.85); x++; if (pr > 0.3) L('C' + i, cx(i), YC); if (pr > 0.7) L('V' + i, cx(i), YV); }
      /* paso 6: bajo cada columna, su término (coeficiente por las dos potencias); arriba, el desarrollo */
      a = ap(6);
      tx('término', 0.3, YT[0], 'left', MU, 10.5, a, '700');
      for (i = 0; i < 6; i++){ pr = seq(6, i); if (pr <= 0) continue;
        c.strokeStyle = 'rgba(0,0,0,0.35)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(cx(i)), Y(YV - 0.36)); c.lineTo(X(cx(i)), Y(YV - 0.36 + (YT[i % 2] + 0.3 - YV + 0.36)*pr)); c.stroke();
        if (pr > 0.7) L('T' + i, cx(i), YT[i % 2]); }
      L('Q', 0.3, -2.1, 0); if (a > 0.6) L('F', 0.3, -2.9, 0);
      /* paso 7: el enunciado, con n en lugar de 5 */
      a = ap(7);
      if (a > 0){ c.globalAlpha = 0.1*a; c.fillStyle = C.tan; c.fillRect(X(0.3), Y(YG + 0.72), X(9.7) - X(0.3), Y(YG - 0.72) - Y(YG + 0.72)); c.globalAlpha = 1; tx('enunciado', 0.45, YG, 'left', C.tan, 10.5, a, '700'); if (a > 0.5) L('G', 5.6, YG); }
      /* frase del paso y número de paso */
      tx(TXT[k - 1][0], 0.3, YF, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(YF) + 19);
      tx('paso ' + k + ' de ' + N, 9.9, -2.1, 'right', MU, 11, 1);
      dtQue(S, 'cómo se arma cada término de la', 'fórmula: potencias de a y de b, y coeficiente.');
      T.fin();
      oaReg(S, k, N, 0.3, -13.0, [0, 24, 48, 82, 116, 148, 190]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{dato: }n=5.\\ \\text{Valores de }k:\\ 0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5\\\\&\\qquad\\text{un término por cada valor: }5+1=6\\text{ términos}',
      '\\text{exponente de }a\\text{ en el término }k:\\quad n-k=5-k\\\\&\\qquad 5-0=5,\\quad 5-1=4,\\quad 5-2=3\\\\&\\qquad 5-3=2,\\quad 5-4=1,\\quad 5-5=0',
      '\\text{exponente de }b\\text{ en el término }k:\\quad k\\\\&\\qquad\\text{suma de los dos exponentes: }(5-k)+k=5\\\\&\\qquad 5+0=5,\\quad 4+1=5,\\quad 3+2=5\\\\&\\qquad 2+3=5,\\quad 1+4=5,\\quad 0+5=5',
      '\\text{coeficiente del término }k=2\\text{: «5 sobre 2»}\\\\&\\qquad\\dbinom{5}{2}=\\dfrac{5!}{2!\\,(5-2)!}=\\dfrac{5!}{2!\\cdot 3!}\\\\&\\qquad 5!=5\\cdot 4\\cdot 3\\cdot 2\\cdot 1=120\\\\&\\qquad 2!=2\\cdot 1=2,\\qquad 3!=3\\cdot 2\\cdot 1=6\\\\&\\qquad 2\\cdot 6=12,\\qquad\\dfrac{120}{12}=10',
      '\\text{los demás, con }0!=1,\\ 1!=1,\\ 4!=24:\\\\&\\qquad\\dbinom{5}{0}=\\dfrac{5!}{0!\\cdot 5!}=\\dfrac{120}{1\\cdot 120}=\\dfrac{120}{120}=1\\\\&\\qquad\\dbinom{5}{1}=\\dfrac{5!}{1!\\cdot 4!}=\\dfrac{120}{1\\cdot 24}=\\dfrac{120}{24}=5\\\\&\\qquad\\dbinom{5}{3}=\\dfrac{5!}{3!\\cdot 2!}=\\dfrac{120}{6\\cdot 2}=\\dfrac{120}{12}=10\\\\&\\qquad\\dbinom{5}{4}=\\dfrac{5!}{4!\\cdot 1!}=\\dfrac{120}{24\\cdot 1}=\\dfrac{120}{24}=5\\\\&\\qquad\\dbinom{5}{5}=\\dfrac{5!}{5!\\cdot 0!}=\\dfrac{120}{120\\cdot 1}=\\dfrac{120}{120}=1',
      '\\text{término}=\\text{coeficiente}\\cdot\\text{potencia de }a\\cdot\\text{potencia de }b\\\\&\\qquad 1\\,a^{5}b^{0}=a^{5},\\qquad 5\\,a^{4}b^{1}=5a^{4}b\\\\&\\qquad 10\\,a^{3}b^{2},\\qquad 10\\,a^{2}b^{3}\\\\&\\qquad 5\\,a^{1}b^{4}=5ab^{4},\\qquad 1\\,a^{0}b^{5}=b^{5}\\\\&\\qquad(a+b)^{5}=a^{5}+5a^{4}b+10a^{3}b^{2}\\\\&\\qquad\\qquad\\qquad\\ +10a^{2}b^{3}+5ab^{4}+b^{5}',
      '\\text{con }n\\text{ en lugar de }5\\text{, el enunciado:}\\\\&\\qquad(a+b)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}\\\\&\\qquad\\text{comprobación con }a=1,\\ b=1:\\quad(1+1)^{5}=2^{5}=32\\\\&\\qquad 1+5+10+10+5+1=32\\ \\checkmark']; return dtPasos(R.slice(0, k)); }
  };
})());
