/* L28 H10 · símbolo y notación: los paréntesis de la matriz se cambian por barras rectas y nombran un número */
OA.scene('nota-idea', (function(){
  var N = 5;
  var PZ = [['N11', '3', '3', ''], ['N12', '1', '1', ''], ['N21', '2', '2', ''], ['N22', '4', '4', ''],
    ['M11', '3', '3', ''], ['M12', '1', '1', ''], ['M21', '2', '2', ''], ['M22', '4', '4', ''],
    ['LA', 'A=', 'A =', ''], ['LD', '|A|=', '|A| =', ''],
    ['E1', '|A|', '|A|', 'c-tan'], ['E2', '\\det A', 'det A', 'c-tan'], ['E3', '\\det(A)', 'det(A)', 'c-tan'],
    ['C4', '|A|=3\\cdot 4-1\\cdot 2', '|A| = 3·4 − 1·2', ''], ['C5', '=12-2=10', '= 12 − 2 = 10', 'diff'],
    ['Q', '|A|=\\ ?', '|A| = ?', 'pt'], ['F', '\\Longrightarrow\\ |A|=\\det A=10', '⟹ |A| = det A = 10', 'diff'],
    ['R1', 'A=\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix}\\ \\text{(matriz: una tabla)}', 'A = (3 1; 2 4), matriz: una tabla', ''],
    ['R2', '|A|=\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}\\ \\text{(determinante: un número)}', '|A| = |3 1; 2 4|, determinante: un número', ''],
    ['R3', '|A|=\\det A=\\det(A)', '|A| = det A = det(A)', 'c-tan'],
    ['R4', '|A|=3\\cdot 4-1\\cdot 2', '|A| = 3·4 − 1·2', ''],
    ['R5', '|A|=12-2=10', '|A| = 12 − 2 = 10', 'diff']];
  var TXT = [['Una matriz es una tabla de números.', 'Va entre paréntesis. ¿Qué es su determinante?'],
    ['Una copia, con barras rectas en vez de', 'paréntesis, nombra un número: su determinante.'],
    ['Tres maneras de escribir ese mismo número.', 'Las tres se leen «determinante de A».'],
    ['Las barras solo nombran. El valor sale', 'de la regla de segundo orden.'],
    ['La matriz es la tabla completa;', 'su determinante, un solo número. Aquí, 10.']];
  var A1 = -0.1, A2 = 0.6, D1 = 2.85, D2 = 3.55, F1 = 3.25, F2 = 2.45;
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:5.4}, aspect:10.3/6.6,
    aria:'Animación en cinco pasos con la matriz A de filas 3, 1 y 2, 4. Uno: la matriz, escrita entre paréntesis, es una tabla de números. Dos: la matriz queda a la izquierda y una copia suya viaja a la derecha; los paréntesis de la copia se enderezan hasta ser dos barras rectas; con barras se nombra el determinante de A, que es un número. Tres: aparecen las tres escrituras de ese número: A entre barras, det A y det de A entre paréntesis. Cuatro: un trazo naranja une el 3 con el 4 y un trazo azul une el 1 con el 2; el determinante es 3 por 4 menos 1 por 2. Cinco: 12 menos 2, el resultado es 10. Nada de lo que aparece se borra: la matriz, el determinante, las tres escrituras y la cuenta quedan a la vista hasta el final. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> diagonal principal: \\(3\\cdot 4\\), suma</span><span><i class="sw sec"></i> la otra diagonal: \\(1\\cdot 2\\), resta</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), g, w, dx;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* nada desaparece: la matriz A, con sus paréntesis, queda a la izquierda; en el paso 2 una copia viaja a la derecha y sus paréntesis se enderezan hasta ser barras */
      function delim(xl, xr, curva){ var bz = 0.42*curva*s, yt = Y(F1 + 0.48), yb = Y(F2 - 0.48); c.strokeStyle = C.ink; c.lineWidth = 1.6; c.setLineDash([]);
        c.beginPath(); c.moveTo(X(xl), yt); c.quadraticCurveTo(X(xl) - bz, (yt + yb)/2, X(xl), yb); c.stroke();
        c.beginPath(); c.moveTo(X(xr), yt); c.quadraticCurveTo(X(xr) + bz, (yt + yb)/2, X(xr), yb); c.stroke(); }
      delim(A1 - 0.4, A2 + 0.4, 1);
      L('N11', A1, F1); L('N12', A2, F1); L('N21', A1, F2); L('N22', A2, F2); L('LA', A1 - 0.74, (F1 + F2)/2, -100);
      g = k > 2 ? 1 : (k === 2 ? u : 0); dx = (D1 - A1)*g;
      if (k >= 2){
        /* paso 4: las dos diagonales, sobre el determinante */
        w = k > 4 ? 1 : (k === 4 ? u : 0);
        if (w > 0){ c.globalAlpha = 0.55; S.line(D1, F1, D1 + (D2 - D1)*w, F1 + (F2 - F1)*w, {color:C.rise, width:5}); S.line(D2, F1, D2 + (D1 - D2)*w, F1 + (F2 - F1)*w, {color:C.sec, width:5}); c.globalAlpha = 1; }
        delim(A1 + dx - 0.4, A2 + dx + 0.4, 1 - g);
        L('M11', A1 + dx, F1); L('M12', A2 + dx, F1); L('M21', A1 + dx, F2); L('M22', A2 + dx, F2);
        if (g > 0.97) L('LD', D1 - 0.55, (F1 + F2)/2, -100); }
      /* paso 3: las tres escrituras, una tras otra; quedan */
      if (k > 3 || (k === 3 && u > 0.2)) L('E1', 0.4, 1.55);
      if (k > 3 || (k === 3 && u > 0.5)) L('E2', 1.9, 1.55);
      if (k > 3 || (k === 3 && u > 0.8)) L('E3', 3.5, 1.55);
      /* pasos 4 y 5: la cuenta se escribe en una línea y queda */
      if (k > 4 || (k === 4 && u > 0.6)) L('C4', 0.2, 0.95, 0);
      if (k === 5 && u > 0.4) L('C5', 2.45, 0.95, 0);
      L('Q', -1.2, 4.12, 0); if (k === N && u > 0.5) L('F', 0.2, 4.12, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.12));
      dtQue(S, 'las barras rectas nombran un número:', 'el determinante de la matriz.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.3, [6, 52, 90, 120, 150]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['A=\\begin{pmatrix}3&1\\\\2&4\\end{pmatrix}' + Q + '\\text{Con paréntesis: una matriz, una tabla de números.}',
      '|A|=\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}' + Q + '\\text{Con barras: el determinante de }A\\text{, un número.}',
      '|A|=\\det A=\\det(A)' + Q + '\\text{Tres escrituras del mismo número.}',
      '\\text{Regla de segundo orden: }\\begin{vmatrix}a&b\\\\c&d\\end{vmatrix}=ad-bc' + Q + '|A|=\\begin{vmatrix}3&1\\\\2&4\\end{vmatrix}=3\\cdot 4-1\\cdot 2',
      '\\text{productos: }3\\cdot 4=12;\\qquad 1\\cdot 2=2' + Q + '|A|=12-2=10' + Q + '\\text{La matriz es la tabla completa;}' + Q + '\\text{su determinante, el número }10.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: A = (a 1; 2 4); el determinante lleva signo, el área es su valor absoluto */
OA.scene('nota-vivo', (function(){
  var PZ = [['U', '(a,2)', '(a, 2)', 'c-sec'], ['V', '(1,4)', '(1, 4)', 'c-alt']];
  return {
    world:{x0:-3.2, x1:6.2, y0:-2.2, y1:8.4}, aspect:10.6/9.4,
    aria:'Dos flechas que salen del origen: la azul es la primera columna de la matriz, el vector (a, 2), y la verde es la segunda columna, el vector (1, 4), fija. Entre las dos forman un paralelogramo naranja. Al mover a, la flecha azul se desplaza a izquierda o derecha y el paralelogramo cambia. El determinante de la matriz es 4a menos 2. Con a mayor que 0,5 es positivo e igual al área. Con a igual a 0,5 las dos flechas quedan sobre la misma recta, no hay paralelogramo y el determinante es cero. Con a menor que 0,5 el determinante es negativo y el área es su valor absoluto.',
    labels:PZ,
    sliders:[{id:'a', tex:'a', min:-2, max:4, step:0.1, value:3}],
    legend:'<span><i class="sw sec"></i> columna \\((a,2)\\)</span><span><i class="sw alt"></i> columna \\((1,4)\\)</span><span><i class="sw rise"></i> área \\(|\\det A|\\)</span>',
    anim:{run:22000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.a = 4 - 6*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var a = v.a == null ? 3 : +v.a, D = 4*a - 2, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, cero = Math.abs(D) < 0.05, m;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-3, 0, 6, 0, {color:C.ink, width:1}); S.line(0, -0.8, 0, 6.8, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = -2; i <= 5; i++){ if (!i) continue; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(i), Y(0) + 11, 'center'); }
      for (i = 1; i <= 6; i++){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      if (!cero){ S.poly([[0, 0], [a, 2], [a + 1, 6], [1, 4]], {fill:C.rise, alpha:0.26});
        c.strokeStyle = C.rise; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(a), Y(2)); c.lineTo(X(a + 1), Y(6)); c.lineTo(X(1), Y(4)); c.stroke(); c.setLineDash([]); }
      dtFlecha(S, 0, 0, 1, 4, C.alt, 1.8); dtFlecha(S, 0, 0, a, 2, C.sec, 1.8);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      T.L('U', a, 2, a < 0.5 ? -100 : 0, a < 0.5 ? -7 : 7, 10); T.L('V', 1, 4, a < 0.5 ? 0 : -100, a < 0.5 ? 7 : -7, -4);
      m = cero ? 'Determinante cero: no hay paralelogramo' : (D < 0 ? 'Determinante negativo: el área es su opuesto' : 'Determinante positivo: coincide con el área');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-3.0), Y(-1.6));
      dtQue(S, 'el determinante lleva signo;', 'el área es su valor absoluto, nunca negativa.');
      T.fin();
    },
    caption:function(v){ var a = v.a == null ? 3 : +v.a, D = 4*a - 2, n = function(z){ return oaDec(z, 2); }; return 'Con a = ' + n(a) + ' el determinante vale ' + n(D) + ' y el paralelogramo de las columnas mide ' + n(Math.abs(D)) + ' unidades cuadradas. Con a = 0,50 el determinante es 0'; },
    readout:function(v){ var r2 = function(z){ return Math.round(z*100)/100; }, a = r2(v.a == null ? 3 : +v.a), A4 = r2(4*a), D = r2(A4 - 2), n = OA.num, Q = '\\\\&\\qquad ', pa = a < 0 ? '\\left(' + n(a, 2) + '\\right)' : n(a, 2), r;
      r = ['A=\\begin{pmatrix}a&1\\\\2&4\\end{pmatrix},\\qquad a=' + n(a, 2),
        '|A|=\\begin{vmatrix}' + n(a, 2) + '&1\\\\2&4\\end{vmatrix}=' + pa + '\\cdot 4-1\\cdot 2',
        '\\text{productos: }' + pa + '\\cdot 4=' + n(A4, 2) + ';\\qquad 1\\cdot 2=2',
        '|A|=' + n(A4, 2) + '-2=' + n(D, 2),
        '\\text{área}=|\\det A|=\\left|' + n(D, 2) + '\\right|=' + n(Math.abs(D), 2) + Q + (D > 0 ? '\\text{Determinante positivo: es igual al área.}' : (D < 0 ? '\\text{Determinante negativo: el área es su opuesto,}' + Q + '-\\left(' + n(D, 2) + '\\right)=' + n(-D, 2) + '.' : '\\text{Determinante cero: las columnas quedan sobre}' + Q + '\\text{una misma recta y no hay paralelogramo.}'))];
      return dtPasos(r); }
  };
})());
