/* L28 H08 · regla de Cramer: la columna de términos libres entra al lugar de la columna de cada incógnita */
OA.scene('cramer-idea', (function(){
  var N = 5;
  var PZ = [['X1', '2', '2', 'c-sec'], ['X2', '1', '1', 'c-sec'], ['Y1', '1', '1', 'c-alt'], ['Y2', '3', '3', 'c-alt'], ['E1', '5', '5', 'diff'], ['E2', '5', '5', 'diff'],
    ['HX', 'x', 'x', 'c-sec'], ['HY', 'y', 'y', 'c-alt'],
    ['LA', '2x+y=5', '2x + y = 5', 'c-sec'], ['LB', 'x+3y=5', 'x + 3y = 5', 'c-alt'], ['P', '(2,1)', '(2, 1)', 'diff'],
    ['D0', '\\Delta=5', 'Δ = 5', ''], ['DX', '\\Delta_x=10', 'Δx = 10', ''], ['DY', '\\Delta_y=5', 'Δy = 5', ''],
    ['Q', 'x=\\ ?\\qquad y=\\ ?', 'x = ?   y = ?', 'pt'], ['F', '\\Longrightarrow\\ x=2,\\quad y=1', '⟹ x = 2, y = 1', 'diff'],
    ['R1', '2x+y=5,\\qquad x+3y=5', '2x + y = 5, x + 3y = 5', ''],
    ['R2', '\\Delta=2\\cdot 3-1\\cdot 1=5', 'Δ = 2·3 − 1·1 = 5', ''],
    ['R3', '\\Delta_x=5\\cdot 3-1\\cdot 5=10', 'Δx = 5·3 − 1·5 = 10', ''],
    ['R4', '\\Delta_y=2\\cdot 5-5\\cdot 1=5', 'Δy = 2·5 − 5·1 = 5', ''],
    ['R5', 'x=\\tfrac{10}{5}=2,\\qquad y=\\tfrac{5}{5}=1', 'x = 10/5 = 2, y = 5/5 = 1', 'diff']];
  var TXT = [['Dos ecuaciones, dos rectas.', '¿En qué punto se cortan?'],
    ['Los coeficientes forman el determinante', 'del sistema. Vale 5: no es cero.'],
    ['Los términos libres entran al lugar', 'de la columna de la x.'],
    ['La columna de la x vuelve. Los términos libres', 'entran al lugar de la columna de la y.'],
    ['Cada incógnita es su determinante dividido', 'por el del sistema. Las rectas se cortan ahí.']];
  var GX = -0.75, GY = 1.05, E = 0.5, S1 = 3.15, S2 = 3.85, S3 = 4.8, F1 = 3.0, F2 = 2.3;
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.2, y1:5.4}, aspect:9.6/6.6,
    aria:'Animación en cinco pasos para el sistema 2x más y igual a 5, x más 3y igual a 5. A la izquierda, un plano con las dos rectas. A la derecha, tres columnas de números: la de los coeficientes de x, 2 y 1, en azul; la de los coeficientes de y, 1 y 3, en verde; y la de los términos libres, 5 y 5, en naranja. Uno: se dibujan las dos rectas. Dos: las columnas azul y verde forman el determinante del sistema, delta, que vale 2 por 3 menos 1 por 1, 5. Tres: la columna naranja entra al lugar de la azul y se forma delta x, 5 por 3 menos 1 por 5, 10. Cuatro: la columna azul vuelve y la naranja entra al lugar de la verde: delta y, 2 por 5 menos 5 por 1, 5. Cinco: todo vuelve a su lugar; x es 10 dividido en 5, 2; y es 5 dividido en 5, 1; en el plano se marca el punto (2, 1), donde se cortan las rectas. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> coeficientes de \\(x\\)</span><span><i class="sw alt"></i> coeficientes de \\(y\\)</span><span><i class="sw rise"></i> términos libres y solución</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, wx_, wy_, g, a, b;
      function mx(x){ return GX + E*x; } function my(y){ return GY + E*y; }
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function col(id, de, a_, w, sg){ var x = de + (a_ - de)*w, dy = sg*0.62*Math.sin(Math.PI*w); L(id + '1', x, F1 + dy); L(id + '2', x, F2 + dy); }
      /* plano con las dos rectas */
      S.line(mx(-0.4), my(0), mx(5.7), my(0), {color:C.ink, width:1}); S.line(mx(0), my(-0.4), mx(0), my(5.6), {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 5; i++){ c.beginPath(); c.moveTo(X(mx(i)), Y(my(0)) - 3); c.lineTo(X(mx(i)), Y(my(0)) + 3); c.moveTo(X(mx(0)) - 3, Y(my(i))); c.lineTo(X(mx(0)) + 3, Y(my(i))); c.stroke(); num('' + i, X(mx(i)), Y(my(0)) + 11, 'center'); num('' + i, X(mx(0)) - 7, Y(my(i)), 'right'); }
      a = k > 1 ? 1 : Math.min(1, 2*u); b = k > 1 ? 1 : Math.max(0, 2*u - 1);
      if (a > 0) S.line(mx(0), my(5), mx(2.5*a), my(5 - 5*a), {color:C.sec, width:1.8});
      if (b > 0) S.line(mx(0), my(5/3), mx(5*b), my(5/3 - 5/3*b), {color:C.alt, width:1.8});
      if (a > 0.6) L('LA', mx(0.55), my(4.5), 0); if (b > 0.6) L('LB', mx(2.6), my(1.45), 0);
      /* paso 5: el punto de corte, con sus punteadas a los ejes */
      if (k === 5){ c.strokeStyle = C.rise; c.lineWidth = 1.1; c.setLineDash([3, 3]); /* último paso: nada que quitar después */ c.beginPath(); c.moveTo(X(mx(2)), Y(my(1))); c.lineTo(X(mx(2)), Y(my(1 - u))); c.moveTo(X(mx(2)), Y(my(1))); c.lineTo(X(mx(2 - 2*u)), Y(my(1))); c.stroke(); c.setLineDash([]);
        c.globalAlpha = Math.max(u, 0.2); c.fillStyle = C.rise; c.beginPath(); c.arc(X(mx(2)), Y(my(1)), 3.4, 0, 6.2832); c.fill(); c.globalAlpha = 1; if (u > 0.5) L('P', mx(2.35), my(2.45), 0); }
      /* columnas: en su lugar, o cambiadas con la de términos libres */
      wx_ = k === 3 ? u : (k === 4 ? Math.max(0, 1 - 2*u) : 0);      /* naranja en el lugar de la azul */
      wy_ = k === 4 ? Math.max(0, 2*u - 1) : (k === 5 ? 1 - u : 0);  /* naranja en el lugar de la verde */
      col('X', S1, S3, wx_, -1); col('Y', S2, S3, wy_, -1);
      if (wx_ > 0) col('E', S3, S1, wx_, 1); else col('E', S3, S2, wy_, 1);
      L('HX', S1, 3.62); L('HY', S2, 3.62);
      c.font = '500 10.5px ' + F; c.fillStyle = C.rise; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('términos', X(S3), Y(3.62) - 6); c.fillText('libres', X(S3), Y(3.62) + 6);
      /* barras del determinante: aparecen en el paso 2 y quedan */
      g = k > 2 ? 1 : (k === 2 ? u : 0);
      if (g > 0){ c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(S1 - 0.35), Y(F1 + 0.38)); c.lineTo(X(S1 - 0.35), Y(F1 + 0.38 - 1.46*g)); c.moveTo(X(S2 + 0.35), Y(F1 + 0.38)); c.lineTo(X(S2 + 0.35), Y(F1 + 0.38 - 1.46*g)); c.stroke(); }
      /* nada desaparece: cada determinante queda escrito bajo las columnas desde que se obtiene, uno bajo el otro */
      if (k > 2 || (k === 2 && u > 0.6)) L('D0', 2.9, 1.6, 0);
      if (k > 3 || (k === 3 && u > 0.75)) L('DX', 2.9, 1.24, 0);
      if (k > 4 || (k === 4 && u > 0.85)) L('DY', 2.9, 0.88, 0);
      L('Q', -1.2, 4.12, 0); if (k === N && u > 0.5) L('F', 1.2, 4.12, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.12));
      dtQue(S, 'cada incógnita es un determinante', 'dividido por el determinante del sistema.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.25, [0, 30, 60, 90, 122]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['2x+y=5,\\qquad x+3y=5',
      '\\Delta=\\begin{vmatrix}2&1\\\\1&3\\end{vmatrix}=2\\cdot 3-1\\cdot 1' + Q + '\\text{productos: }2\\cdot 3=6;\\qquad 1\\cdot 1=1' + Q + '\\Delta=6-1=5\\neq 0',
      '\\Delta_x=\\begin{vmatrix}5&1\\\\5&3\\end{vmatrix}=5\\cdot 3-1\\cdot 5' + Q + '\\text{productos: }5\\cdot 3=15;\\qquad 1\\cdot 5=5' + Q + '\\Delta_x=15-5=10',
      '\\Delta_y=\\begin{vmatrix}2&5\\\\1&5\\end{vmatrix}=2\\cdot 5-5\\cdot 1' + Q + '\\text{productos: }2\\cdot 5=10;\\qquad 5\\cdot 1=5' + Q + '\\Delta_y=10-5=5',
      'x=\\dfrac{\\Delta_x}{\\Delta}=\\dfrac{10}{5}=2,\\qquad y=\\dfrac{\\Delta_y}{\\Delta}=\\dfrac{5}{5}=1' + Q + '\\text{comprobación: }2\\cdot 2+1=4+1=5;' + Q + '2+3\\cdot 1=2+3=5' + Q + '\\text{Solución: }(2,1)\\text{, el punto donde}' + Q + '\\text{se cortan las dos rectas.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: 2x + y = 5, x + my = 5; al acercarse el determinante a cero, el corte se aleja */
OA.scene('cramer-vivo', (function(){
  var PZ = [['LA', '2x+y=5', '2x + y = 5', 'c-sec'], ['LB', 'x+my=5', 'x + my = 5', 'c-alt'], ['P', '\\left(\\tfrac{\\Delta_x}{\\Delta},\\tfrac{\\Delta_y}{\\Delta}\\right)', '(Δx/Δ, Δy/Δ)', 'diff']];
  return {
    world:{x0:-3.4, x1:7.2, y0:-2.4, y1:9.0}, aspect:11.4/10.6,
    aria:'Un plano con dos rectas. La azul, fija, es 2x más y igual a 5. La verde es x más m por y igual a 5; pasa siempre por el punto (5, 0) y gira al mover m. Un punto naranja marca donde se cortan, que es la solución del sistema. Con m igual a 3 el corte está en (2, 1). Al bajar m, el determinante 2m menos 1 se acerca a cero, las rectas se parecen cada vez más a dos paralelas y el punto de corte se aleja hasta salir del dibujo. Con m igual a 0,5 el determinante es cero, las rectas son paralelas y no hay punto de corte: la regla de Cramer no se aplica.',
    labels:PZ,
    sliders:[{id:'m', tex:'m', min:0.5, max:3, step:0.05, value:3}],
    legend:'<span><i class="sw sec"></i> \\(2x+y=5\\)</span><span><i class="sw alt"></i> \\(x+my=5\\)</span><span><i class="sw rise"></i> punto de corte</span>',
    anim:{run:22000, hold:5000, still:1, apply:function(p, v){ v.q = p; v.m = 3 - 2.5*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var m = v.m == null ? 3 : +v.m, D = 2*m - 1, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, px, py, cero = Math.abs(D) < 0.02, dentro = false, msg;
      function num(tx, px_, py_, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px_, py_); }
      S.line(-3.2, 0, 7, 0, {color:C.ink, width:1}); S.line(0, -1, 0, 7.2, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = -3; i <= 6; i++){ if (!i) continue; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(i), Y(0) + 11, 'center'); }
      for (i = 1; i <= 7; i++){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      /* las rectas se recortan al marco del plano */
      c.save(); c.beginPath(); c.rect(X(-3.2), Y(7.2), X(7) - X(-3.2), Y(-1) - Y(7.2)); c.clip();
      S.line(-1.5, 8, 3.5, -2, {color:C.sec, width:1.8});
      S.line(5 + 2*m, -2, 5 - 8*m, 8, {color:C.alt, width:1.8});
      c.restore();
      if (!cero){ px = (5*m - 5)/D; py = 5/D; dentro = px > -3.1 && px < 6.9 && py > -0.9 && py < 7.1;
        if (dentro){ c.strokeStyle = C.rise; c.lineWidth = 1.1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(px), Y(py)); c.lineTo(X(px), Y(0)); c.moveTo(X(px), Y(py)); c.lineTo(X(0), Y(py)); c.stroke(); c.setLineDash([]);
          c.fillStyle = C.rise; c.beginPath(); c.arc(X(px), Y(py), 3.6, 0, 6.2832); c.fill(); T.L('P', px, py, 0, 9, -12); } }
      T.L('LA', 2.9, -0.75, 0, 6, 0); T.L('LB', 5.05, 0.75, 0, 0, 0);
      msg = cero ? 'Determinante cero: rectas paralelas, sin corte' : (dentro ? 'Las rectas se cortan en un solo punto' : 'El punto de corte ya salió del dibujo');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(msg, X(-3.2), Y(-1.8));
      dtQue(S, 'si el determinante se acerca a cero,', 'el corte se aleja; en cero, no hay corte.');
      T.fin();
    },
    caption:function(v){ var m = v.m == null ? 3 : +v.m, D = 2*m - 1, n = function(z){ return oaDec(z, 2); }; return Math.abs(D) < 0.02 ? 'Con m = 0,50 el determinante del sistema vale 0: las rectas son paralelas, no hay punto de corte y la regla de Cramer no se aplica' : 'Con m = ' + n(m) + ' el determinante del sistema vale ' + n(D) + ' y las rectas se cortan en (' + n((5*m - 5)/D) + '; ' + n(5/D) + ')'; },
    readout:function(v){ var m = Math.round((v.m == null ? 3 : +v.m)*100)/100, r2 = function(z){ return Math.round(z*100)/100; }, M2 = r2(2*m), D = r2(M2 - 1), M5 = r2(5*m), DX = r2(M5 - 5), n = OA.num, Q = '\\\\&\\qquad ', f,
        coc = function(a, b, ta){ var q = a/b, ex = Math.abs(q*100 - Math.round(q*100)) < 1e-7; return '\\dfrac{' + (ta || n(a, 2)) + '}{' + n(b, 2) + '}' + (ex ? '=' : '\\approx ') + n(q, 2); };
      f = ['2x+y=5,\\qquad x+my=5,\\qquad m=' + n(m, 2),
        '\\Delta=\\begin{vmatrix}2&1\\\\1&' + n(m, 2) + '\\end{vmatrix}=2\\cdot ' + n(m, 2) + '-1\\cdot 1' + Q + '\\text{productos: }2\\cdot ' + n(m, 2) + '=' + n(M2, 2) + ';\\qquad 1\\cdot 1=1' + Q + '\\Delta=' + n(M2, 2) + '-1=' + n(D, 2),
        '\\Delta_x=\\begin{vmatrix}5&1\\\\5&' + n(m, 2) + '\\end{vmatrix}=5\\cdot ' + n(m, 2) + '-1\\cdot 5' + Q + '\\text{productos: }5\\cdot ' + n(m, 2) + '=' + n(M5, 2) + ';\\qquad 1\\cdot 5=5' + Q + '\\Delta_x=' + n(M5, 2) + '-5=' + n(DX, 2),
        '\\Delta_y=\\begin{vmatrix}2&5\\\\1&5\\end{vmatrix}=2\\cdot 5-5\\cdot 1' + Q + '\\text{productos: }2\\cdot 5=10;\\qquad 5\\cdot 1=5' + Q + '\\Delta_y=10-5=5'];
      if (D === 0) f.push('\\Delta=0\\text{: no se puede dividir por }0.' + Q + '\\text{La regla no se aplica (rectas paralelas).}');
      else { f.push('x=\\dfrac{\\Delta_x}{\\Delta}=' + coc(DX, D) + Q + 'y=\\dfrac{\\Delta_y}{\\Delta}=' + coc(5, D, '5'));
        f.push('\\text{Las rectas se cortan en }\\left(' + n(DX/D, 2) + ';\\ ' + n(5/D, 2) + '\\right).' + Q + (Math.abs(D) < 1 ? '\\text{Se divide por un número cercano a }0\\text{:}' + Q + '\\text{el punto de corte queda lejos.}' : '\\text{Ese punto es la única solución.}')); }
      return dtPasos(f); }
  };
})());
