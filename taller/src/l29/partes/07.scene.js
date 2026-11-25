/* L29 H07 · estimar límites a partir de tablas: la tabla viene dada; se aparta la columna x = a, se lee cada lado hacia a y se estima (por pasos) */
OA.scene('est-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ';
  /* la tabla dada: columnas x y T(x); la columna 3 (x = 2) trae T(2) = 1 y no participa */
  var XV = [1.9, 1.99, 1.999, 2, 2.001, 2.01, 2.1], TV = [4.9, 4.99, 4.999, 1, 5.001, 5.01, 5.1];
  var IZ = [0, 1, 2], DE = [6, 5, 4]; /* columnas de cada lado, en el orden en que x se acerca a 2 */
  var YA = 4.08, YM = 3.62, YB = 3.16, YE = 1.8; /* bordes de las dos filas de la tabla y altura de la recta numérica */
  function lm07L(i){ return -0.45 + 0.8*i; } /* borde izquierdo de la columna i */
  function lm07E(val){ return -0.9 + (val - 4.85)*5.8/0.3; } /* un valor de T, puesto en la recta numérica */
  var PZ = [['Q', '\\lim_{x\\to 2}T(x)\\approx\\ ?', 'lím T(x) cuando x → 2 ≈ ?', 'pt'], ['F', '\\Longrightarrow\\ \\text{estimación: }5', '⟹ estimación: 5', 'diff'],
    ['TX', 'x', 'x', ''], ['TT', 'T(x)', 'T(x)', ''],
    ['FO', 'T(x)=x+3\\ \\ (x\\ne 2)', 'T(x) = x + 3 (x ≠ 2)', 'c-tan'],
    ['R1', '\\text{tabla dada; se pide estimar el límite en }a=2', 'tabla dada; se pide estimar el límite en a = 2', ''],
    ['R2', 'T(2)=1\\text{ no participa: el límite mira }x\\ne 2', 'T(2) = 1 no participa: el límite mira x ≠ 2', ''],
    ['R3', 'x<2:\\ \\ 4{,}9;\\ 4{,}99;\\ 4{,}999\\ \\to\\ 5', 'x < 2: 4,9; 4,99; 4,999 → 5', 'c-sec'],
    ['R4', 'x>2:\\ \\ 5{,}1;\\ 5{,}01;\\ 5{,}001\\ \\to\\ 5', 'x > 2: 5,1; 5,01; 5,001 → 5', 'diff'],
    ['R5', '\\text{mismo número: }\\lim_{x\\to 2}T(x)\\approx 5\\ \\ (\\text{no }1)', 'mismo número: lím T(x) ≈ 5 (no 1)', ''],
    ['R6', '\\text{con la fórmula: }\\lim_{x\\to 2}T(x)=5', 'con la fórmula: lím T(x) = 5', 'diff']];
  var TXT = [['La tabla viene dada: no se conoce la fórmula.', 'Se pide estimar el límite cuando x tiende a 2.'],
    ['Se ubica a = 2 y se separan los dos lados. La', 'columna de x = 2 no participa: se mira cerca.'],
    ['Izquierda, en el orden en que x se acerca a 2:', '4,9; 4,99; 4,999. Los valores se acercan a 5.'],
    ['Derecha, en el orden en que x se acerca a 2:', '5,1; 5,01; 5,001. Los valores se acercan a 5.'],
    ['Los dos lados se acercan al mismo número, 5.', 'Estimación: 5. No es el 1 de la columna rayada.'],
    ['Confirmación: se revela la fórmula de la tabla.', 'Con ella, el límite es exactamente 5.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:6.0}, aspect:10.6/6.6,
    aria:'Arriba, una franja dice qué muestra: con una tabla dada, el límite se estima leyendo los dos lados de a, sin la columna de a. Animación en seis pasos. Uno: la tabla dada, con los x 1,9; 1,99; 1,999; 2; 2,001; 2,01 y 2,1, y los valores 4,9; 4,99; 4,999; 1; 5,001; 5,01 y 5,1. Dos: la columna de x igual a 2, que trae el valor 1, queda rayada con el rótulo «no participa»; a su izquierda y a su derecha quedan los dos lados. Tres: una flecha azul recorre el lado izquierdo hacia 2; los valores 4,9; 4,99 y 4,999 se acercan a 5 y aparecen como puntos azules en una recta numérica. Cuatro: una flecha naranja recorre el lado derecho hacia 2; los valores 5,1; 5,01 y 5,001 se acercan a 5 y aparecen como puntos naranjas. Cinco: en la recta, los dos grupos de puntos se aprietan contra el 5, que queda encerrado en un círculo: la estimación es 5, no 1. Seis: se revela la fórmula, T de x igual a x más 3 para x distinto de 2, que confirma el límite 5. Bajo la figura, un registro numerado guarda lo obtenido en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> lado izquierdo, \\(x\\) menor que 2</span><span><i class="sw rise"></i> lado derecho, \\(x\\) mayor que 2</span><span><i class="sw tan"></i> el número al que se acercan, y la fórmula</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, a1, a2, a3, a4, i, j, mu = C.muted || '#6b6b6b', F = '"Source Sans 3", system-ui, sans-serif', xa, xb, x0, x1;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      function frase(t, xw, yw, dy, col, al){ c.font = '600 11px ' + F; c.textBaseline = 'middle'; c.textAlign = al || 'center'; c.fillStyle = col; c.fillText(t, X(xw), Y(yw) + (dy || 0)); }
      function celda(t, i, yw, col, peso, al){ c.globalAlpha = al; c.font = peso + ' 11px ' + F; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillStyle = col; c.fillText(t, X(lm07L(i) + 0.4), Y(yw)); c.globalAlpha = 1; }
      function raya(xw0, yw0, xw1, yw1, col, w, al){ c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = w; c.setLineDash([]); c.beginPath(); c.moveTo(X(xw0), Y(yw0)); c.lineTo(X(xw1), Y(yw1)); c.stroke(); c.globalAlpha = 1; }
      dtQue(S, 'con una tabla dada, el límite se estima', 'leyendo los dos lados de a, sin la columna de a.');
      a1 = ap(1); a2 = ap(2); a3 = ap(3); a4 = ap(4);
      /* paso 2 (va debajo de los números): la columna x = 2 queda rayada, a la vista */
      if (a2 > 0){ x0 = X(lm07L(3)); x1 = X(lm07L(4));
        c.save(); c.beginPath(); c.rect(x0, Y(YA), x1 - x0, Y(YB) - Y(YA)); c.clip(); c.globalAlpha = 0.16*a2; c.fillStyle = C.ink; c.fillRect(x0, Y(YA), x1 - x0, Y(YB) - Y(YA));
        c.globalAlpha = 0.3*a2; c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); for (j = -6; j < 12; j++){ c.moveTo(x0 + j*7, Y(YB)); c.lineTo(x0 + j*7 + (Y(YB) - Y(YA)), Y(YA)); } c.stroke(); c.restore(); c.globalAlpha = 1; }
      /* paso 1: la tabla dada, columna por columna */
      raya(-1.2, YA, lm07L(7), YA, C.ink, 1, a1); raya(-1.2, YM, lm07L(7), YM, C.ink, 0.6, a1); raya(-1.2, YB, lm07L(7), YB, C.ink, 1, a1);
      raya(-1.2, YA, -1.2, YB, C.ink, 1, a1); for (i = 0; i <= 7; i++) raya(lm07L(i), YA, lm07L(i), YB, C.ink, i === 0 || i === 7 ? 1 : 0.5, a1);
      if (a1 > 0.1){ T.L('TX', -0.825, (YA + YM)/2); T.L('TT', -0.825, (YM + YB)/2); }
      for (i = 0; i < 7; i++){ a = Math.max(0, Math.min(1, a1*8 - i));
        j = IZ.indexOf(i) >= 0 ? (a3*3 > IZ.indexOf(i) + 0.5 ? C.sec : C.ink) : (DE.indexOf(i) >= 0 ? (a4*3 > DE.indexOf(i) + 0.5 ? C.rise : C.ink) : (a2 > 0.5 ? mu : C.ink));
        celda(lmT(XV[i], 3), i, (YA + YM)/2, i === 3 && a2 > 0.5 ? mu : C.ink, '600', a); celda(lmT(TV[i], 3), i, (YM + YB)/2, j, j === C.ink || j === mu ? '600' : '700', a); }
      /* paso 2: los dos lados y el rótulo de la columna apartada */
      if (a2 > 0){ c.globalAlpha = a2; raya(lm07L(0), YA, lm07L(3), YA, C.sec, 3, a2); raya(lm07L(4), YA, lm07L(7), YA, C.rise, 3, a2); c.globalAlpha = a2;
        frase('izquierda de 2', lm07L(0) + 1.2, YA, -11, C.sec); frase('derecha de 2', lm07L(4) + 1.2, YA, -11, C.rise); c.globalAlpha = 1; }
      if (a2 > 0.5){ c.globalAlpha = (a2 - 0.5)*2; frase('no participa', lm07L(3) + 0.4, YA, -11, C.ink); c.globalAlpha = 1; }
      /* pasos 3 y 4: cada lado se recorre hacia x = 2 */
      if (a3 > 0){ xa = lm07L(0) + 0.1; xb = lm07L(3) - 0.08; dtFlecha(S, xa, YB - 0.2, xa + (xb - xa)*a3, YB - 0.2, C.sec, 1.8); if (a3 > 0.7) frase('se acercan a 5', lm07L(0) + 1.0, YB - 0.2, 14, C.sec); }
      if (a4 > 0){ xa = lm07L(7) - 0.1; xb = lm07L(4) + 0.08; dtFlecha(S, xa, YB - 0.2, xa + (xb - xa)*a4, YB - 0.2, C.rise, 1.8); if (a4 > 0.7) frase('se acercan a 5', lm07L(7) - 1.0, YB - 0.2, 14, C.rise); }
      /* la recta numérica: cada valor leído es un punto (azules arriba de la recta, naranjas abajo) */
      if (a3 > 0){ c.globalAlpha = Math.min(1, a3*3); frase('los valores, en una recta:', -1.2, YE, -24, mu, 'left'); c.globalAlpha = 1;
        raya(-1.1, YE, 5.1, YE, C.ink, 1, Math.min(1, a3*3));
        [4.9, 5, 5.1].forEach(function(z){ raya(lm07E(z), YE + 0.07, lm07E(z), YE - 0.07, C.ink, 1, Math.min(1, a3*3)); c.globalAlpha = Math.min(1, a3*3); frase(lmT(z, 1), lm07E(z), YE, 17, z === 5 && ap(5) > 0.5 ? C.tan : mu); c.globalAlpha = 1; });
        IZ.forEach(function(ci, n){ if (a3*3 > n + 0.5){ c.fillStyle = C.sec; c.beginPath(); c.arc(X(lm07E(TV[ci])), Y(YE) - 5, 3, 0, 6.2832); c.fill(); } }); }
      if (a4 > 0) DE.forEach(function(ci, n){ if (a4*3 > n + 0.5){ c.fillStyle = C.rise; c.beginPath(); c.arc(X(lm07E(TV[ci])), Y(YE) + 5, 3, 0, 6.2832); c.fill(); } });
      /* paso 5: los dos lados se aprietan contra el mismo número */
      a = ap(5);
      if (a > 0){ c.globalAlpha = a; c.strokeStyle = C.tan; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.arc(X(lm07E(5)), Y(YE), 11, 0, 6.2832); c.stroke();
        frase('los dos lados se aprietan contra 5', lm07E(5), YE, 33, C.tan); c.globalAlpha = 1; }
      /* paso 6: la fórmula con que se hizo la tabla */
      if (ap(6) > 0.3) T.L('FO', 5.2, YE, -100, 0, -25);
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.66, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.66, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, 0.8); lmTxt(S, TXT[k - 1][1], -1.2, 0.8 - 21/(X(1) - X(0)));
      c.font = '600 11px ' + F; c.fillStyle = mu; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-0.9) - 26);
      T.fin();
      oaReg(S, k, N, -1.2, -0.9, [0, 34, 68, 102, 136, 170]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{tabla dada (no se conoce la fórmula de }T\\text{)}' + Q + 'x:\\ \\ 1{,}9;\\ 1{,}99;\\ 1{,}999;\\ 2;\\ 2{,}001;\\ 2{,}01;\\ 2{,}1' + Q + 'T(x):\\ \\ 4{,}9;\\ 4{,}99;\\ 4{,}999;\\ 1;\\ 5{,}001;\\ 5{,}01;\\ 5{,}1',
      'a=2:\\ \\text{izquierda, }x<2;\\ \\ \\text{derecha, }x>2' + Q + '\\text{la columna }x=2\\text{ dice }T(2)=1' + Q + '\\text{no participa: el límite mira solo }x\\ne 2',
      '\\text{izquierda, en el orden en que }x\\text{ se acerca a }2:' + Q + 'T(1{,}9)=4{,}9;\\ \\ T(1{,}99)=4{,}99;\\ \\ T(1{,}999)=4{,}999' + Q + '\\text{candidato: }5.\\ \\text{Distancias a }5:' + Q + '|4{,}9-5|=0{,}1;\\ \\ |4{,}99-5|=0{,}01;\\ \\ |4{,}999-5|=0{,}001' + Q + '\\text{se achican: la izquierda se acerca a }5',
      '\\text{derecha, en el orden en que }x\\text{ se acerca a }2:' + Q + 'T(2{,}1)=5{,}1;\\ \\ T(2{,}01)=5{,}01;\\ \\ T(2{,}001)=5{,}001' + Q + '\\text{distancias a }5:' + Q + '|5{,}1-5|=0{,}1;\\ \\ |5{,}01-5|=0{,}01;\\ \\ |5{,}001-5|=0{,}001' + Q + '\\text{se achican: la derecha se acerca a }5',
      '\\text{izquierda}\\to 5;\\ \\ \\text{derecha}\\to 5:\\ \\text{el mismo número}' + Q + '\\text{estimación: }\\lim_{x\\to 2}T(x)\\approx 5' + Q + '\\text{no es el valor de la columna apartada: }T(2)=1;\\ \\ 1\\ne 5',
      '\\text{confirmación, con la fórmula de la tabla (}x\\ne 2\\text{):}' + Q + 'T(x)=\\tfrac{x^{2}+x-6}{x-2}=\\tfrac{(x-2)(x+3)}{x-2}=x+3' + Q + '\\text{porque } (x-2)(x+3)=x^{2}+3x-2x-6=x^{2}+x-6' + Q + '\\text{comprobación: }1{,}9+3=4{,}9;\\ \\ 2{,}1+3=5{,}1\\ \\text{ (tabla)}' + Q + 'x\\to 2:\\ \\ x+3\\ \\to\\ 2+3=5' + Q + '\\lim_{x\\to 2}T(x)=5:\\ \\text{la estimación era correcta}']; return dtPasos(R.slice(0, k)); }
  };
})());
