/* L25 H05 · notación de sumatoria: el símbolo parte por parte, el índice recorre sus valores y la suma se arma tramo a tramo (v003: por pasos, con registro acumulado; nada desaparece) */
OA.scene('ss-sigma', (function(){
  var N = 7, T0 = [3, 5, 7, 9, 11], AC = [3, 8, 15, 24, 35], X0 = -5.25, UN = 0.3, i;
  var PZ = [['L5', '5', '5', ''], ['Lk', 'k=1', 'k = 1', ''], ['Lt', '(2k+1)', '(2k + 1)', ''], ['Q', '=\\ ?', '= ?', 'pt'], ['F', '\\Longrightarrow\\ 35', '⟹ 35', 'diff']];
  for (i = 0; i < 5; i++){ PZ.push(['K' + (i + 1), 'k=' + (i + 1), 'k = ' + (i + 1), '']); PZ.push(['V' + (i + 1), '' + T0[i], '' + T0[i], '']); PZ.push(['C' + (i + 1), '' + AC[i], '' + AC[i], 'c-tan']); }
  PZ.push(['R1', '\\displaystyle\\sum_{k=1}^{5}(2k+1):\\quad k=1,\\ 2,\\ 3,\\ 4,\\ 5', 'Σ (2k + 1), con k = 1, 2, 3, 4, 5', '']);
  for (i = 1; i <= 5; i++) PZ.push(['R' + (i + 1), 'k=' + i + ':\\quad 2\\cdot ' + i + '+1=' + (2*i) + '+1=' + (2*i + 1), 'k = ' + i + ':  2 · ' + i + ' + 1 = ' + (2*i) + ' + 1 = ' + (2*i + 1), '']);
  PZ.push(['R7', '\\displaystyle\\sum_{k=1}^{5}(2k+1)=3+5+7+9+11=35', 'Σ (2k + 1) = 3 + 5 + 7 + 9 + 11 = 35', 'diff']);
  var TXT = [['El símbolo, parte por parte: qué se suma,', 'desde qué valor del índice y hasta cuál.'],
    ['Se reemplaza k por 1 en el término general:', 'sale el primer sumando, el primer tramo.'],
    ['El índice sube de 1 en 1: ahora k vale 2.', 'Sale el segundo sumando y se agrega.'],
    ['Ahora k vale 3: tercer sumando.', 'Bajo la barra queda lo sumado hasta ahí.'],
    ['Ahora k vale 4: cuarto sumando.', 'La barra sigue creciendo.'],
    ['Ahora k vale 5, el valor final: último sumando.', 'El índice no pasa de 5.'],
    ['Se suman los cinco sumandos: el total es 35.', 'Eso es lo que abrevia el símbolo.']];
  return {
    world:{x0:-5.5, x1:5.5, y0:-11.9, y1:5.4}, aspect:17.3/11,
    aria:'Animación en siete pasos. Uno: el símbolo de sumatoria, una sigma mayúscula, con sus partes rotuladas: arriba el valor final, 5; abajo el índice k y su valor inicial, 1; a la derecha el término general, 2k más 1. Dos a seis: el índice k toma los valores 1, 2, 3, 4 y 5; en cada paso se reemplaza en el término general y sale un sumando: 3, 5, 7, 9 y 11. Cada sumando es un tramo de una barra que crece; sobre cada tramo está el valor de k, dentro el sumando y debajo lo sumado hasta ahí: 3, 8, 15, 24 y 35. Siete: la suma completa vale 35. Bajo la figura, un registro numerado guarda la cuenta de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> el sumando del valor actual de \\(k\\)</span><span><i class="sw sec"></i> sumandos anteriores</span><span><i class="sw tan"></i> lo sumado hasta ahí</span>',
    anim:{run:35000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', j, g, xa, xe, w, sx = -1.6, sy = 2.2;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); }
      function fr(t, x, y, al, col, sz){ c.font = (sz || '600 12.5px ') + F; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function guia(x0, y0, x1, y1, q){ if (q <= 0) return; q = Math.min(1, q); c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x0 + (x1 - x0)*q), Y(y0 + (y1 - y0)*q)); c.stroke(); }
      /* la sigma, dibujada con trazos: aparece de a poco en el paso 1 */
      var P = [[sx + 0.42, sy + 0.62], [sx - 0.42, sy + 0.62], [sx + 0.06, sy], [sx - 0.42, sy - 0.62], [sx + 0.42, sy - 0.62]], tot = 0, D = [], acum, q;
      for (j = 0; j < 4; j++){ D.push(Math.hypot(P[j + 1][0] - P[j][0], P[j + 1][1] - P[j][1])); tot += D[j]; }
      g = Math.min(1, ap(1)*2.5); acum = g*tot; c.strokeStyle = C.ink; c.lineWidth = 2.4; c.lineJoin = 'round'; c.lineCap = 'round'; c.setLineDash([]); c.beginPath(); c.moveTo(X(P[0][0]), Y(P[0][1]));
      for (j = 0; j < 4 && acum > 0; j++){ q = Math.min(1, acum/D[j]); c.lineTo(X(P[j][0] + (P[j + 1][0] - P[j][0])*q), Y(P[j][1] + (P[j + 1][1] - P[j][1])*q)); acum -= D[j]; } c.stroke(); c.lineCap = 'butt';
      /* las partes del símbolo, cada una con su nombre al lado */
      if (ap(1) > 0.4){ L('Lt', sx + 1.5, sy); L('Q', sx + 2.45, sy, 0); guia(sx + 1.5, sy + 0.32, sx + 1.5, sy + 0.78, (ap(1) - 0.4)*4); if (ap(1) > 0.55) fr('término general: lo que se suma', sx + 1.0, sy + 1.02, 'left', C.ink, '600 11.5px '); }
      if (ap(1) > 0.6){ L('L5', sx, sy + 1.0); guia(sx - 0.22, sy + 1.0, sx - 0.5, sy + 1.0, (ap(1) - 0.6)*5); if (ap(1) > 0.7) fr('valor final', sx - 0.58, sy + 1.0, 'right', C.ink, '600 11.5px '); }
      if (ap(1) > 0.75){ L('Lk', sx, sy - 1.0); guia(sx, sy - 1.25, sx, sy - 1.5, (ap(1) - 0.75)*5); if (ap(1) > 0.85) fr('índice k y su valor inicial', sx, sy - 1.72, 'center', C.ink, '600 11.5px '); }
      /* la barra de la suma: un tramo por sumando; los tramos quedan hasta el final */
      if (k >= 2){ c.strokeStyle = 'rgba(0,0,0,0.3)'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(X0), Y(-2.2)); c.lineTo(X(X0 + UN*35), Y(-2.2)); c.stroke();
        fr('arriba: k · dentro: el sumando · abajo: lo sumado', -5.4, -0.42, 'left', C.muted || '#6b6b6b', '600 11px '); }
      for (j = 0; j < 5; j++){ g = ap(j + 2); if (g <= 0) continue; xa = X0 + UN*(AC[j] - T0[j]); w = UN*T0[j]; xe = xa + w*g;
        S.poly([[xa, -1.5], [xe, -1.5], [xe, -2.2], [xa, -2.2]], {fill:k === j + 2 ? C.rise : C.sec, alpha:0.42});
        c.strokeStyle = k === j + 2 ? C.rise : C.sec; c.lineWidth = 1.1; c.strokeRect(X(xa), Y(-1.5), X(xe) - X(xa), Y(-2.2) - Y(-1.5));
        if (g > 0.6){ L('K' + (j + 1), xa + w/2, -1.12); L('V' + (j + 1), xa + w/2, -1.85); c.strokeStyle = C.tan; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(xa + w), Y(-2.2)); c.lineTo(X(xa + w), Y(-2.42)); c.stroke(); L('C' + (j + 1), xa + w, -2.72); } }
      if (ap(7) > 0){ c.strokeStyle = C.tan; c.lineWidth = 2; c.strokeRect(X(X0), Y(-1.5), (X(X0 + UN*35) - X(X0))*ap(7), Y(-2.2) - Y(-1.5)); if (ap(7) > 0.5) L('F', sx + 3.35, sy, 0); } /* la pregunta queda; la respuesta se escribe a su lado */
      fr(TXT[k - 1][0], -5.4, -3.55); fr(TXT[k - 1][1], -5.4, -3.55 - 21/(X(1) - X(0)));
      fr('paso ' + k + ' de ' + N, 5.4, -0.42, 'right', C.muted || '#6b6b6b', '600 11px ');
      dtQue(S, 'cómo se desarrolla una sumatoria:', 'k recorre 1, 2, 3, 4 y 5; se suma lo que sale.');
      T.fin();
      oaReg(S, k, N, -5.4, -5.75, [4, 40, 67, 94, 121, 148, 181]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['\\displaystyle\\sum_{k=1}^{5}(2k+1)\\qquad\\text{el índice }k\\text{ va de }1\\text{ a }5'], n, s = 0;
      for (n = 1; n <= 5; n++){ R.push('k=' + n + ':\\ \\ 2\\cdot ' + n + '+1=' + (2*n) + '+1=' + (2*n + 1) + '\\qquad\\text{suma: }' + (n === 1 ? '3' : s + '+' + (2*n + 1) + '=' + (s + 2*n + 1))); s += 2*n + 1; }
      R.push('\\displaystyle\\sum_{k=1}^{5}(2k+1)=3+5+7+9+11=35'); return dtPasos(R.slice(0, k)); }
  };
})());
