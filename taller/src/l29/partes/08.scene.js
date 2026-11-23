/* L29 H08 · tablas y límites unilaterales: cada lado de la tabla se lee por separado y da su propio límite lateral; después se comparan (por pasos) */
OA.scene('uni-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  /* la tabla dada: columnas x y f(x); la columna 3 (x = 3) trae f(3) = 6 y no participa en ningún lateral */
  var XV = [2.9, 2.99, 2.999, 3, 3.001, 3.01, 3.1], TV = [3.9, 3.99, 3.999, 6, 6.002, 6.02, 6.2];
  var IZ = [0, 1, 2], DE = [6, 5, 4]; /* columnas de cada lado, en el orden en que x se acerca a 3 */
  var YA = 4.08, YM = 3.62, YB = 3.16, YE = 1.8; /* bordes de las dos filas de la tabla y altura de la recta numérica */
  function lm08L(i){ return -0.45 + 0.8*i; } /* borde izquierdo de la columna i */
  function lm08E(val){ return -0.9 + (val - 3.85)*5.8/2.4; } /* un valor de f, puesto en la recta numérica */
  var PZ = [['Q', '\\lim_{x\\to 3^{-}}f(x)\\ \\text{y}\\ \\lim_{x\\to 3^{+}}f(x)\\approx\\ ?', 'lím por la izquierda y lím por la derecha de 3 ≈ ?', 'pt'], ['F', '\\Longrightarrow\\ 4\\ \\text{y}\\ 6', '⟹ 4 y 6', 'diff'],
    ['TX', 'x', 'x', ''], ['TT', 'f(x)', 'f(x)', ''],
    ['LI', '\\lim_{x\\to 3^{-}}f(x)\\approx 4', 'lím x→3⁻ f(x) ≈ 4', 'c-sec'], ['LD', '\\lim_{x\\to 3^{+}}f(x)\\approx 6', 'lím x→3⁺ f(x) ≈ 6', 'diff'],
    ['FO', 'f(x)=x+1\\ (x<3);\\ \\ 2x\\ (x\\ge 3)', 'f(x) = x + 1 (x < 3); 2x (x ≥ 3)', 'c-tan'],
    ['R1', '\\text{tabla dada; se lee cada lado de }a=3', 'tabla dada; se lee cada lado de a = 3', ''],
    ['R2', 'f(3)=6\\text{ no participa en ningún lateral}', 'f(3) = 6 no participa en ningún lateral', ''],
    ['R3', '\\lim_{x\\to 3^{-}}f(x)\\approx 4\\ \\ (3{,}9;\\ 3{,}99;\\ 3{,}999)', 'lím x→3⁻ f(x) ≈ 4 (3,9; 3,99; 3,999)', 'c-sec'],
    ['R4', '\\lim_{x\\to 3^{+}}f(x)\\approx 6\\ \\ (6{,}2;\\ 6{,}02;\\ 6{,}002)', 'lím x→3⁺ f(x) ≈ 6 (6,2; 6,02; 6,002)', 'diff'],
    ['R5', '4\\ne 6:\\ \\lim_{x\\to 3}f(x)\\text{ no existe (estimación)}', '4 ≠ 6: lím x→3 f(x) no existe (estimación)', 'c-tan'],
    ['R6', '\\text{con la fórmula: laterales }4\\text{ y }6\\text{, exactos}', 'con la fórmula: laterales 4 y 6, exactos', 'c-tan']];
  var TXT = [['La tabla viene dada. Se pide estimar, por', 'separado, el límite a cada lado de x = 3.'],
    ['Izquierda: columnas con x menor que 3. Derecha:', 'con x mayor que 3. La columna x = 3 no participa.'],
    ['Solo la izquierda, hacia 3: 3,9; 3,99; 3,999.', 'Se acercan a 4: ese es el límite por la izquierda.'],
    ['Solo la derecha, hacia 3: 6,2; 6,02; 6,002.', 'Se acercan a 6: ese es el límite por la derecha.'],
    ['Se comparan los dos laterales: 4 y 6 no coinciden.', 'El límite por los dos lados no existe.'],
    ['Confirmación: se revela la fórmula de la tabla.', 'Con ella, los laterales son exactamente 4 y 6.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:6.0}, aspect:10.6/6.6,
    aria:'Arriba, una franja dice qué muestra: cada lado de la tabla da su propio límite lateral, y después se comparan. Animación en seis pasos. Uno: la tabla dada, con los x 2,9; 2,99; 2,999; 3; 3,001; 3,01 y 3,1, y los valores 3,9; 3,99; 3,999; 6; 6,002; 6,02 y 6,2. Dos: la columna de x igual a 3, que trae el valor 6, queda rayada con el rótulo «no participa»; a su izquierda quedan las columnas con x menor que 3 y a su derecha, las de x mayor que 3. Tres: una flecha azul recorre el lado izquierdo hacia 3; los valores 3,9; 3,99 y 3,999 se acercan a 4 y aparecen como puntos azules en una recta numérica; el 4 queda encerrado en un círculo azul, con el rótulo: límite por la izquierda, aproximadamente 4. Cuatro: una flecha naranja recorre el lado derecho hacia 3; los valores 6,2; 6,02 y 6,002 se acercan a 6 y aparecen como puntos naranjas; el 6 queda encerrado en un círculo naranja, con el rótulo: límite por la derecha, aproximadamente 6. Cinco: un trazo burdeo une el 4 con el 6 en la recta: no coinciden, y el límite por los dos lados no existe. Seis: se revela la fórmula, x más 1 para x menor que 3 y 2x para x mayor o igual que 3, que confirma los laterales 4 y 6. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> lado izquierdo, \\(x\\) menor que 3</span><span><i class="sw rise"></i> lado derecho, \\(x\\) mayor que 3</span><span><i class="sw tan"></i> la comparación de los dos laterales, y la fórmula</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, a1, a2, a3, a4, a5, i, j, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif', xa, xb, x0, x1;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, xw, yw, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'center'; c.fillStyle = col; c.fillText(t, X(xw), Y(yw) + (dy || 0)); }
      function celda(t, i, yw, col, peso, al){ c.globalAlpha = al; c.font = peso + ' 11px ' + F; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(t, X(lm08L(i) + 0.4), Y(yw)); c.globalAlpha = 1; }
      function raya(xw0, yw0, xw1, yw1, col, w, al){ c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = w; c.setLineDash([]); c.beginPath(); c.moveTo(X(xw0), Y(yw0)); c.lineTo(X(xw1), Y(yw1)); c.stroke(); c.globalAlpha = 1; }
      function aro(val, col, al){ c.globalAlpha = al; c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.arc(X(lm08E(val)), Y(YE), 11, 0, 6.2832); c.stroke(); c.globalAlpha = 1; }
      dtQue(S, 'cada lado de la tabla da su propio', 'límite lateral; después se comparan los dos.');
      a1 = ap(1); a2 = ap(2); a3 = ap(3); a4 = ap(4); a5 = ap(5);
      /* paso 2 (va debajo de los números): la columna x = 3 queda rayada, a la vista */
      if (a2 > 0){ x0 = X(lm08L(3)); x1 = X(lm08L(4));
        c.save(); c.beginPath(); c.rect(x0, Y(YA), x1 - x0, Y(YB) - Y(YA)); c.clip(); c.globalAlpha = 0.16*a2; c.fillStyle = C.ink; c.fillRect(x0, Y(YA), x1 - x0, Y(YB) - Y(YA));
        c.globalAlpha = 0.3*a2; c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); for (j = -6; j < 12; j++){ c.moveTo(x0 + j*7, Y(YB)); c.lineTo(x0 + j*7 + (Y(YB) - Y(YA)), Y(YA)); } c.stroke(); c.restore(); c.globalAlpha = 1; }
      /* paso 1: la tabla dada, columna por columna */
      raya(-1.2, YA, lm08L(7), YA, C.ink, 1, a1); raya(-1.2, YM, lm08L(7), YM, C.ink, 0.6, a1); raya(-1.2, YB, lm08L(7), YB, C.ink, 1, a1);
      raya(-1.2, YA, -1.2, YB, C.ink, 1, a1); for (i = 0; i <= 7; i++) raya(lm08L(i), YA, lm08L(i), YB, C.ink, i === 0 || i === 7 ? 1 : 0.5, a1);
      if (a1 > 0.1){ T.L('TX', -0.825, (YA + YM)/2); T.L('TT', -0.825, (YM + YB)/2); }
      for (i = 0; i < 7; i++){ a = Math.max(0, Math.min(1, a1*8 - i));
        j = IZ.indexOf(i) >= 0 ? (a3*3 > IZ.indexOf(i) + 0.5 ? C.sec : C.ink) : (DE.indexOf(i) >= 0 ? (a4*3 > DE.indexOf(i) + 0.5 ? C.rise : C.ink) : (a2 > 0.5 ? mu : C.ink));
        celda(lmT(XV[i], 3), i, (YA + YM)/2, i === 3 && a2 > 0.5 ? mu : C.ink, '600', a); celda(lmT(TV[i], 3), i, (YM + YB)/2, j, j === C.ink || j === mu ? '600' : '700', a); }
      /* paso 2: los dos lados y el rótulo de la columna apartada */
      if (a2 > 0){ raya(lm08L(0), YA, lm08L(3), YA, C.sec, 3, a2); raya(lm08L(4), YA, lm08L(7), YA, C.rise, 3, a2); c.globalAlpha = a2;
        frase('izquierda de 3', lm08L(0) + 1.2, YA, -11, C.sec); frase('derecha de 3', lm08L(4) + 1.2, YA, -11, C.rise); c.globalAlpha = 1; }
      if (a2 > 0.5){ c.globalAlpha = (a2 - 0.5)*2; frase('no participa', lm08L(3) + 0.4, YA, -11, C.ink); c.globalAlpha = 1; }
      /* pasos 3 y 4: cada lado se recorre, solo, hacia x = 3 */
      if (a3 > 0){ xa = lm08L(0) + 0.1; xb = lm08L(3) - 0.08; dtFlecha(S, xa, YB - 0.2, xa + (xb - xa)*a3, YB - 0.2, C.sec, 1.8); if (a3 > 0.7) frase('se acercan a 4', lm08L(0) + 1.0, YB - 0.2, 14, C.sec); }
      if (a4 > 0){ xa = lm08L(7) - 0.1; xb = lm08L(4) + 0.08; dtFlecha(S, xa, YB - 0.2, xa + (xb - xa)*a4, YB - 0.2, C.rise, 1.8); if (a4 > 0.7) frase('se acercan a 6', lm08L(7) - 1.0, YB - 0.2, 14, C.rise); }
      /* la recta numérica: cada valor leído es un punto (azules arriba de la recta, naranjas abajo) */
      if (a3 > 0){ a = Math.min(1, a3*3); c.globalAlpha = a; frase('valores en una recta:', -1.2, YE, -25, mu, 'left'); c.globalAlpha = 1;
        raya(-1.1, YE, 5.1, YE, C.ink, 1, a);
        [4, 5, 6].forEach(function(z){ raya(lm08E(z), YE + 0.07, lm08E(z), YE - 0.07, C.ink, 1, a); c.globalAlpha = a; frase(lmT(z, 0), lm08E(z), YE, 19, z === 4 && a3 > 0.8 ? C.sec : (z === 6 && a4 > 0.8 ? C.rise : mu)); c.globalAlpha = 1; });
        IZ.forEach(function(ci, n){ if (a3*3 > n + 0.5){ c.fillStyle = C.sec; c.beginPath(); c.arc(X(lm08E(TV[ci])), Y(YE) - 5, 3, 0, 6.2832); c.fill(); } });
        if (a3 > 0.8){ aro(4, C.sec, (a3 - 0.8)*5); T.L('LI', -1.2, YE, 0, 0, 40); } }
      if (a4 > 0){ DE.forEach(function(ci, n){ if (a4*3 > n + 0.5){ c.fillStyle = C.rise; c.beginPath(); c.arc(X(lm08E(TV[ci])), Y(YE) + 5, 3, 0, 6.2832); c.fill(); } });
        if (a4 > 0.8){ aro(6, C.rise, (a4 - 0.8)*5); T.L('LD', 5.2, YE, -100, 0, 40); } }
      /* paso 5: se comparan los dos laterales; un trazo une el 4 con el 6 */
      if (a5 > 0){ xa = lm08E(4) + 0.25; xb = lm08E(6) - 0.25; c.globalAlpha = a5; c.strokeStyle = C.tan; c.lineWidth = 1.6; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(xa), Y(YE) - 9); c.lineTo(X(xa + (xb - xa)*a5), Y(YE) - 9); c.stroke(); c.setLineDash([]);
        if (a5 > 0.6) frase('no coinciden', lm08E(5), YE, 40, C.tan); c.globalAlpha = 1; }
      /* paso 6: la fórmula con que se hizo la tabla */
      if (ap(6) > 0.3) T.L('FO', 5.2, YE, -100, 0, -26);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.66, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.66, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, 0.55); lmTxt(S, TXT[k - 1][1], -1.2, 0.55 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-0.9) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -0.9, [0, 34, 68, 102, 136, 170]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{tabla dada de }f\\text{; se estudia }a=3' + Q + 'x:\\ \\ 2{,}9;\\ 2{,}99;\\ 2{,}999;\\ 3;\\ 3{,}001;\\ 3{,}01;\\ 3{,}1' + Q + 'f(x):\\ \\ 3{,}9;\\ 3{,}99;\\ 3{,}999;\\ 6;\\ 6{,}002;\\ 6{,}02;\\ 6{,}2',
      'x\\to 3^{-}:\\ x\\text{ se acerca a }3\\text{ con }x<3\\ \\text{(izquierda)}' + Q + 'x\\to 3^{+}:\\ x\\text{ se acerca a }3\\text{ con }x>3\\ \\text{(derecha)}' + Q + '\\text{la columna }x=3\\text{ dice }f(3)=6' + Q + '\\text{no participa en ningún límite lateral}',
      '\\text{izquierda, en el orden en que }x\\text{ se acerca a }3:' + Q + 'f(2{,}9)=3{,}9;\\ \\ f(2{,}99)=3{,}99;\\ \\ f(2{,}999)=3{,}999' + Q + '\\text{candidato: }4.\\ \\text{Distancias a }4:' + Q + '|3{,}9-4|=0{,}1;\\ \\ |3{,}99-4|=0{,}01;\\ \\ |3{,}999-4|=0{,}001' + Q + '\\text{se achican: }\\lim_{x\\to 3^{-}}f(x)\\approx 4',
      '\\text{derecha, en el orden en que }x\\text{ se acerca a }3:' + Q + 'f(3{,}1)=6{,}2;\\ \\ f(3{,}01)=6{,}02;\\ \\ f(3{,}001)=6{,}002' + Q + '\\text{candidato: }6.\\ \\text{Distancias a }6:' + Q + '|6{,}2-6|=0{,}2;\\ \\ |6{,}02-6|=0{,}02;\\ \\ |6{,}002-6|=0{,}002' + Q + '\\text{se achican: }\\lim_{x\\to 3^{+}}f(x)\\approx 6',
      '\\text{criterio de los laterales: el límite en }3\\text{ existe}' + Q + '\\text{solo si los dos laterales existen y coinciden}' + Q + '\\text{aquí: izquierda}\\approx 4;\\ \\ \\text{derecha}\\approx 6;\\ \\ 4\\ne 6' + Q + '\\text{distancia entre los dos números: }6-4=2' + Q + '\\text{estimación: }\\lim_{x\\to 3}f(x)\\text{ no existe}',
      '\\text{confirmación, con la fórmula de la tabla:}' + Q + 'f(x)=x+1\\ \\text{si }x<3;\\ \\ f(x)=2x\\ \\text{si }x\\ge 3' + Q + 'x\\to 3^{-}:\\ \\ x+1\\ \\to\\ 3+1=4' + Q + 'x\\to 3^{+}:\\ \\ 2x\\ \\to\\ 2\\cdot 3=6' + Q + '\\lim_{x\\to 3^{-}}f(x)=4;\\ \\ \\lim_{x\\to 3^{+}}f(x)=6;\\ \\ 4\\ne 6' + Q + '\\lim_{x\\to 3}f(x)\\text{ no existe: la estimación era correcta}']; return dtPasos(R.slice(0, k)); }
  };
})());
