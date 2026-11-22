/* L25 H08 · diferencia constante: se resta a cada término el anterior; si siempre da lo mismo, ese número es d */
OA.scene('dif-idea', (function(){
  var N = 5, A = [3, 7, 11, 15], XC = [-0.6, 0.5, 1.6, 2.7], W = 0.62, YB = 1.3, K = 0.15, XT = 4.25;
  var PZ = [['T1', 'a_{1}=3', 'a₁ = 3', 'c-sec'], ['T2', 'a_{2}=7', 'a₂ = 7', 'c-sec'], ['T3', 'a_{3}=11', 'a₃ = 11', 'c-sec'], ['T4', 'a_{4}=15', 'a₄ = 15', 'c-sec'],
    ['D1', '4', '4', 'diff'], ['D2', '4', '4', 'diff'], ['D3', '4', '4', 'diff'], ['DD', 'd=4', 'd = 4', 'diff'],
    ['Q', '3,\\ 7,\\ 11,\\ 15\\qquad d=\\ ?', '3, 7, 11, 15   d = ?', 'pt'], ['F', 'd=a_{n+1}-a_{n}=4', 'd = aₙ₊₁ − aₙ = 4', 'diff'],
    ['R1', '3,\\ 7,\\ 11,\\ 15', '3, 7, 11, 15', ''],
    ['R2', 'a_{2}-a_{1}=7-3=4', 'a₂ − a₁ = 7 − 3 = 4', ''],
    ['R3', 'a_{3}-a_{2}=11-7=4', 'a₃ − a₂ = 11 − 7 = 4', ''],
    ['R4', 'a_{4}-a_{3}=15-11=4', 'a₄ − a₃ = 15 − 11 = 4', ''],
    ['R5', 'd=a_{n+1}-a_{n}=4', 'd = aₙ₊₁ − aₙ = 4', 'diff']];
  var TXT = [['Cuatro términos, dibujados como columnas.', '¿Suben siempre lo mismo?'],
    ['Al segundo término se le resta el primero.', 'La diferencia es el tramo naranja: 4.'],
    ['Al tercero se le resta el segundo.', 'Da 4 también.'],
    ['Al cuarto se le resta el tercero.', 'Otra vez 4.'],
    ['Los tres tramos coinciden: la sucesión', 'es aritmética y su diferencia es 4.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con los términos 3, 7, 11 y 15, dibujados como cuatro columnas azules de esas alturas. Uno: las columnas crecen hasta su altura. Dos: una línea punteada lleva la altura de la primera columna hasta la segunda; el tramo de la segunda que queda por encima se pinta naranja y vale 4. Tres: lo mismo entre la segunda y la tercera: 4. Cuatro: entre la tercera y la cuarta: 4. Cinco: una copia de cada tramo naranja viaja a la derecha y las tres coinciden en un mismo rectángulo: la diferencia es constante, d igual a 4. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos</span><span><i class="sw rise"></i> la diferencia entre un término y el anterior</span>',
    anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, g, w, x, y;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function caja(xc, y0, y1, col, a, dash){ if (y1 - y0 < 1e-6) return; S.poly([[xc - W/2, y0], [xc + W/2, y0], [xc + W/2, y1], [xc - W/2, y1]], {fill:col, alpha:a});
        c.strokeStyle = col; c.lineWidth = 1; c.setLineDash(dash ? [4, 3] : []); c.strokeRect(X(xc - W/2) + 0.5, Y(y1) + 0.5, W*s - 1, (y1 - y0)*s - 1); c.setLineDash([]); }
      g = k === 1 ? u : 1;
      S.line(-1.15, YB, 4.9, YB, {color:C.ink, width:1.1});
      for (i = 0; i < 4; i++){ caja(XC[i], YB, YB + K*A[i]*g, C.sec, 0.26); if (k > 1 || u > 0.6) L('T' + (i + 1), XC[i], YB, -50, 0, 12); }
      for (i = 1; i <= 3; i++){ if (k < i + 1) break; w = k === i + 1 ? u : 1; /* tramo naranja de la columna i + 1 */
        c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(XC[i - 1] + W/2), Y(YB + K*A[i - 1])); c.lineTo(X(XC[i - 1] + W/2 + (XC[i] - XC[i - 1])*w), Y(YB + K*A[i - 1])); c.stroke(); c.setLineDash([]);
        caja(XC[i], YB + K*A[i - 1], YB + K*A[i], C.rise, 0.5*w);
        if (w > 0.5) L('D' + i, XC[i], YB + K*(A[i - 1] + 2), -50); }
      if (k === 5){ for (i = 1; i <= 3; i++){ x = XC[i] + (XT - XC[i])*u; y = YB + K*A[i - 1]*(1 - u); caja(x, y, y + K*4, C.rise, 0.16, 1); }
        if (u > 0.75) L('DD', XT, YB + K*4, -50, 0, -12); }
      if (k < N || u < 0.5) L('Q', -1.2, 4.5, 0); else L('F', -1.2, 4.5, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.0));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 34, 62, 90, 118]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['3,\\ 7,\\ 11,\\ 15', 'a_{2}-a_{1}=7-3=4', 'a_{3}-a_{2}=11-7=4', 'a_{4}-a_{3}=15-11=4', 'd=a_{2}-a_{1}=a_{3}-a_{2}=a_{4}-a_{3}=4'][k - 1]]]; }
  };
})());
/* número ↔ figura: a₁ = 4 fijo; al mover d, los seis primeros términos suben, quedan iguales o bajan */
OA.scene('dif-vivo', (function(){
  var PZ = [['DL', 'd', 'd', 'diff']], A1 = 4, NN = 6;
  return {
    world:{x0:-1.7, x1:7.5, y0:-10.5, y1:16}, aspect:1.0,
    aria:'Gráfica de puntos sueltos con los seis primeros términos de la sucesión aritmética de primer término 4 y diferencia d. Cada punto está unido por una línea punteada con su valor en el eje vertical. Entre el primer punto y el segundo, un trazo naranja vertical marca la diferencia d. Al mover d, los puntos giran en torno al primero: con d positiva suben, cada uno más que el anterior en la misma cantidad; con d igual a cero quedan todos a la altura 4; con d negativa bajan.',
    labels:PZ,
    sliders:[{id:'d', tex:'d', min:-2, max:2, step:0.25, value:2}],
    legend:'<span><i class="sw sec"></i> los términos \\(a_{n}=4+(n-1)d\\)</span><span><i class="sw rise"></i> la diferencia \\(d\\)</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
    anim:{run:22000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.d = 2 - 4*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var d = v.d == null ? 2 : +v.d, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, a, cero = Math.abs(d) < 0.03, m;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-0.3, 0, 7.0, 0, {color:C.ink, width:1.1}); S.line(0, -7, 0, 15.2, {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NN; i++){ c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num('' + i, X(i), Y(0) + (d < 0 && A1 + (i - 1)*d < 1.2 && A1 + (i - 1)*d > -1.6 ? -11 : 11), 'center'); }
      for (i = -5; i <= 15; i += 5){ if (!i) continue; c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(0) - 8, Y(i), 'right'); }
      num('n', X(7.0) + 6, Y(0), 'left'); num('aₙ', X(0) + 6, Y(15.2) - 2, 'left');
      S.line(0.6, A1 - 0.4*d, 6.4, A1 + 5.4*d, {color:C.tan, width:1});
      for (i = 1; i <= NN; i++){ a = A1 + (i - 1)*d;
        c.globalAlpha = 0.55; c.strokeStyle = C.sec; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(i), Y(a)); c.lineTo(X(0), Y(a)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        c.beginPath(); c.arc(X(0), Y(a), 2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      if (!cero){ c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(1), Y(A1)); c.lineTo(X(2), Y(A1)); c.stroke(); c.setLineDash([]);
        S.line(2, A1, 2, A1 + d, {color:C.rise, width:2.4}); if (Math.abs(d) > 0.45) T.L('DL', 2, A1 + d/2, 0, 7, 0); }
      for (i = 1; i <= NN; i++){ a = A1 + (i - 1)*d; c.beginPath(); c.arc(X(i), Y(a), 3.4, 0, 6.2832); c.fillStyle = C.sec; c.fill(); }
      m = cero ? 'Diferencia cero: todos los términos son iguales' : (d < 0 ? 'Diferencia negativa: la sucesión decrece' : 'Diferencia positiva: la sucesión crece');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-1.5), Y(-9.3));
      T.fin();
    },
    caption:function(v){ var d = v.d == null ? 2 : +v.d, n = function(z){ return oaDec(z, 2); }; return 'Con d = ' + n(d) + ', los términos van de 4 en adelante sumando ' + n(d) + ' cada vez: el segundo vale ' + n(4 + d) + ' y el sexto, ' + n(4 + 5*d) + '. Con d = 0,00 todos valen 4'; },
    readout:function(v){ var d = v.d == null ? 2 : +v.d, n = OA.num;
      return [['', 'a_{n}=a_{1}+(n-1)d=4+(n-1)\\cdot\\left(' + n(d, 2) + '\\right)'], ['d', 'a_{2}=4+1\\cdot\\left(' + n(d, 2) + '\\right)=' + n(4 + d, 2) + '\\qquad a_{6}=4+5\\cdot\\left(' + n(d, 2) + '\\right)=' + n(4 + 5*d, 2)], ['', 'a_{2}-a_{1}=' + n(4 + d, 2) + '-4=' + n(d, 2)]]; }
  };
})());
