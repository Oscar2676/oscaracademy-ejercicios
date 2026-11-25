/* L28 H11 · el determinante como factor de escala de áreas: una figura de tres cuadraditos y su imagen */
OA.scene('esc-idea', (function(){
  var N = 6;
  var PZ = [['Q', '\\text{área de la imagen}=\\ ?', 'área de la imagen = ?', 'pt'], ['F', '\\Longrightarrow\\ |\\det A|\\cdot\\text{área de la figura}', '⟹ |det A| · área de la figura', 'diff'],
    ['A1', '\\text{área }3', 'área 3', ''], ['A2', '\\text{área }|\\det A|=2', 'área |det A| = 2', 'c-sec'], ['A3', '\\text{área }6', 'área 6', 'diff'],
    ['R1', '\\text{área de la figura}=3\\cdot 1=3', 'área de la figura = 3·1 = 3', ''],
    ['R2', '(1,0)\\to(1,0),\\qquad (0,1)\\to(1,2)', '(1, 0) → (1, 0), (0, 1) → (1, 2)', ''],
    ['R3', '|\\det A|=|1\\cdot 2-1\\cdot 0|=2', '|det A| = |1·2 − 1·0| = 2', 'c-sec'],
    ['R4', '\\text{cada cuadradito}\\to\\text{paralelogramo de área }2', 'cada cuadradito → paralelogramo de área 2', ''],
    ['R5', '\\text{área de la imagen}=3\\cdot 2=6', 'área de la imagen = 3·2 = 6', ''],
    ['R6', '6=2\\cdot 3=|\\det A|\\cdot\\text{área de la figura}', '6 = 2·3 = |det A| · área de la figura', 'diff']];
  var TXT = [['Una figura de tres cuadraditos: área 3.', 'Se transforma con la matriz: ¿qué área queda?'],
    ['Cada punto se mueve y la figura se deforma.', 'La original queda en gris, en su lugar.'],
    ['Un cuadradito pasa a un paralelogramo.', 'Su área es el valor absoluto del determinante: 2.'],
    ['Los tres cuadraditos cambian igual:', 'tres paralelogramos de área 2.'],
    ['El área de la imagen es la suma', 'de las tres: vale 6.'],
    ['De 3 a 6: el área se multiplicó por 2,', 'el valor absoluto del determinante.']];
  var OX = 1.0, OY = 1.0, E = 0.7, CEL = [[0, 0], [1, 0], [0, 1]];
  var BOR = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2]];   /* contorno de la «L» */
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.5, y1:6.0}, aspect:10.5/6.6,
    aria:'Animación en seis pasos con la matriz A de filas 1, 1 y 0, 2. Uno: una figura en forma de L hecha de tres cuadraditos de lado 1; su área es 3. Dos: la matriz mueve cada punto y la figura se deforma; la original queda en gris, en su lugar, hasta el final. Tres: un cuadradito pasa a un paralelogramo azul de lados (1, 0) y (1, 2), las columnas de la matriz; su área es el valor absoluto del determinante, 1 por 2 menos 1 por 0, que es 2. Cuatro: los tres cuadraditos pasan a tres paralelogramos iguales, de área 2. Cinco: el área de la imagen es 3 por 2, 6. Seis: de 3 a 6, el área se multiplicó por 2, el valor absoluto del determinante. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> imagen de la figura</span><span><i class="sw sec"></i> un cuadradito transformado: área \\(|\\det A|\\)</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, g;
      function tr(x, y, m){ return [OX + E*(x + m*y), OY + E*(y + m*y)]; }   /* de la identidad (m = 0) a la matriz (1 1; 0 2) (m = 1) */
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function celda(q, m){ return [tr(q[0], q[1], m), tr(q[0] + 1, q[1], m), tr(q[0] + 1, q[1] + 1, m), tr(q[0], q[1] + 1, m)]; }
      function traza(P, col, wd, dash){ var j; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); for (j = 0; j < P.length; j++){ if (j) c.lineTo(X(P[j][0]), Y(P[j][1])); else c.moveTo(X(P[j][0]), Y(P[j][1])); } c.closePath(); c.stroke(); c.setLineDash([]); }
      function contorno(m){ return BOR.map(function(q){ return tr(q[0], q[1], m); }); }
      /* ejes finos con sus marcas */
      S.line(OX - 0.35, OY, OX + E*3.6, OY, {color:C.ink, width:1}); S.line(OX, OY - 0.21, OX, OY + E*4.3, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 4; i++){ c.beginPath(); if (i <= 3){ c.moveTo(X(OX + E*i), Y(OY) - 3); c.lineTo(X(OX + E*i), Y(OY) + 3); } c.moveTo(X(OX) - 3, Y(OY + E*i)); c.lineTo(X(OX) + 3, Y(OY + E*i)); c.stroke(); if (i <= 3) num('' + i, X(OX + E*i), Y(OY) + 11, 'center'); num('' + i, X(OX) - 7, Y(OY + E*i), 'right'); }
      /* paso 1: la figura original, con sus tres cuadraditos; nada desaparece: queda igual, en gris, hasta el final */
      g = k === 1 ? Math.max(u, 0.15) : 1; S.poly(contorno(0), {fill:C.muted || '#6b6b6b', alpha:0.22*g}); CEL.forEach(function(q){ traza(celda(q, 0), C.ink, 1.1); });
      /* paso 2 en adelante: la imagen */
      if (k >= 2){ w = k === 2 ? u : 1; S.poly(contorno(w), {fill:C.rise, alpha:0.26}); traza(contorno(w), C.rise, 1.3); }
      /* paso 3: un cuadradito transformado, con sus dos lados como flechas */
      if (k >= 3){ g = k === 3 ? u : 1; S.poly(celda(CEL[0], 1), {fill:C.sec, alpha:0.3*g}); traza(celda(CEL[0], 1), C.sec, 1.2);
        dtFlecha(S, OX, OY, OX + E*g, OY, C.sec, 1.8); dtFlecha(S, OX, OY, OX + E*g, OY + E*2*g, C.sec, 1.8); }
      /* paso 4: los otros dos, iguales */
      if (k >= 4){ c.globalAlpha = k === 4 ? u : 1; traza(celda(CEL[1], 1), C.rise, 1.2); traza(celda(CEL[2], 1), C.rise, 1.2); c.globalAlpha = 1; }
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(OX), Y(OY), 2.4, 0, 6.2832); c.fill();
      L('A1', OX - 0.14, OY + E*1.5, -100);
      if (k > 3 || (k === 3 && u > 0.6)) L('A2', OX + E*3.0, OY + E*0.9, 0);
      if (k > 5 || (k === 5 && u > 0.5)) L('A3', OX + E*3.3, OY + E*3.3, 0);
      L('Q', -1.2, 4.78, 0); if (k === N && u > 0.5) L('F', -1.2, 4.38, 0); /* la pregunta queda; la respuesta se escribe debajo (al lado no cabe) */
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.78));
      dtQue(S, 'una matriz multiplica las áreas', 'por el valor absoluto de su determinante.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.15, [0, 28, 56, 84, 112, 140]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['A=\\begin{pmatrix}1&1\\\\0&2\\end{pmatrix}' + Q + '\\text{área de la figura}=3\\cdot 1=3\\ \\text{(tres cuadraditos de área }1)',
      '(x,y)\\ \\to\\ (1\\cdot x+1\\cdot y,\\ 0\\cdot x+2\\cdot y)=(x+y,\\ 2y)' + Q + '(1,0)\\ \\to\\ (1+0,\\ 2\\cdot 0)=(1,0)' + Q + '(0,1)\\ \\to\\ (0+1,\\ 2\\cdot 1)=(1,2)',
      '\\det A=\\begin{vmatrix}1&1\\\\0&2\\end{vmatrix}=1\\cdot 2-1\\cdot 0' + Q + '\\text{productos: }1\\cdot 2=2;\\qquad 1\\cdot 0=0' + Q + '\\det A=2-0=2,\\qquad |\\det A|=2' + Q + '\\text{área del paralelogramo azul}=|\\det A|=2',
      '\\text{Cada cuadradito pasa a un paralelogramo}' + Q + '\\text{igual al azul: tres paralelogramos de área }2.',
      '\\text{área de la imagen}=2+2+2=3\\cdot 2=6',
      '\\dfrac{\\text{área de la imagen}}{\\text{área de la figura}}=\\dfrac{6}{3}=2=|\\det A|' + Q + '\\text{Conclusión: área de la imagen}' + Q + '=|\\det A|\\cdot\\text{área de la figura}=2\\cdot 3=6.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: A = (2 0; 0 k) lleva el círculo de radio 1 a una elipse de área |2k|·π */
OA.scene('esc-vivo', (function(){
  var PZ = [['CI', '\\text{círculo: área }\\pi', 'círculo: área π', 'c-sec'], ['EL', '\\text{elipse: área }|2k|\\,\\pi', 'elipse: área |2k|·π', 'diff'], ['P', '(0,k)', '(0, k)', 'diff']];
  return {
    world:{x0:-2.9, x1:2.9, y0:-2.9, y1:3.5}, aspect:6.4/5.8,
    aria:'Un círculo de radio 1, punteado en azul, y su imagen por la matriz de filas 2, 0 y 0, k: una elipse naranja de semiejes 2 y el valor absoluto de k. Un punto naranja marca la imagen del punto (0, 1), que es (0, k). Al mover k la elipse cambia de alto. Su área es el valor absoluto de 2k por pi. Con k igual a 0,5 el determinante vale 1 y la elipse tiene la misma área que el círculo. Con k igual a 0 la elipse se aplasta en un segmento sobre el eje horizontal y el área es cero. Con k negativo el punto marcado queda abajo: la figura se dio vuelta.',
    labels:PZ,
    sliders:[{id:'k', tex:'k', min:-1, max:1.5, step:0.05, value:1.5}],
    legend:'<span><i class="sw sec"></i> círculo de radio \\(1\\)</span><span><i class="sw rise"></i> su imagen por \\(A\\)</span>',
    anim:{run:20000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.k = 1.5 - 2.5*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = v.k == null ? 1.5 : +v.k, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, a, pe = [], cero = Math.abs(k) < 0.02, m;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-2.7, 0, 2.7, 0, {color:C.ink, width:1}); S.line(0, -2.2, 0, 2.15, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = -2; i <= 2; i++){ if (!i) continue; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(i) + (i === -2 ? -10 : (i === 2 ? 10 : 7)), Y(0) + 11, 'center'); num(i < 0 ? '−' + (-i) : '' + i, X(0) - 7, Y(i) - 8, 'right'); }
      for (i = 0; i < 72; i++){ a = i*6.2832/72; pe.push([2*Math.cos(a), k*Math.sin(a)]); }
      if (!cero) S.poly(pe, {fill:C.rise, alpha:0.26});
      c.strokeStyle = C.rise; c.lineWidth = cero ? 2.4 : 1.4; c.setLineDash([]); c.beginPath(); for (i = 0; i < 72; i++){ if (i) c.lineTo(X(pe[i][0]), Y(pe[i][1])); else c.moveTo(X(pe[i][0]), Y(pe[i][1])); } c.closePath(); c.stroke();
      c.strokeStyle = C.sec; c.lineWidth = 1.3; c.setLineDash([4, 3]); c.beginPath(); c.arc(X(0), Y(0), X(1) - X(0), 0, 6.2832); c.stroke(); c.setLineDash([]);
      c.fillStyle = C.sec; c.beginPath(); c.arc(X(0), Y(1), 3, 0, 6.2832); c.fill();
      c.fillStyle = C.rise; c.beginPath(); c.arc(X(0), Y(k), 3.6, 0, 6.2832); c.fill();
      T.L('P', 0, k, 0, 10, k < 0 ? 14 : -14); (function(){ function fm(z){ var r = Math.round(z*100)/100; return (r < 0 ? '−' : '') + ('' + Math.abs(r)).replace('.', ','); } c.font = '600 12px ' + F; c.fillStyle = C.rise; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('= (0; ' + fm(k) + ')', X(0) + 48, Y(k) + (k < 0 ? 14 : -14)); })();
      T.L('CI', -2.8, 2.38, 0); T.L('EL', 0.25, 2.38, 0);
      m = cero ? 'Determinante cero: el círculo se aplasta' : (k < 0 ? 'Determinante negativo: la figura se dio vuelta' : 'Determinante positivo: el área se multiplica por él');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-2.8), Y(-2.6));
      dtQue(S, 'al transformar el círculo, su área', 'se multiplica por el determinante, sin signo.');
      T.fin();
    },
    caption:function(v){ var R = function(z){ return Math.round(z*100)/100; }, N = function(z){ return '\\(' + OA.num(R(z), 2) + '\\)'; }, M = function(t){ return '\\(' + t + '\\)'; }, n2 = function(z){ return OA.num(R(z), 2); }, k = R(v.k == null ? 1.5 : +v.k), D = R(2*k), AR = R(Math.abs(D)*3.14); return 'Con ' + M('k=' + n2(k)) + ' el determinante vale ' + N(D) + ' y el área de la elipse es ' + N(Math.abs(D)) + ' veces la del círculo: ' + M(n2(Math.abs(D)) + '\\cdot 3{,}14\\approx ' + n2(AR)) + ' unidades cuadradas. Con ' + M('k=0') + ' se aplasta'; },
    readout:function(v){ var r2 = function(z){ return Math.round(z*100)/100; }, k = r2(v.k == null ? 1.5 : +v.k), K2 = r2(2*k), AB = Math.abs(K2), AR = AB*3.14, ex = Math.abs(AR*100 - Math.round(AR*100)) < 1e-7, n = OA.num, Q = '\\\\&\\qquad ', pk = k < 0 ? '\\left(' + n(k, 2) + '\\right)' : n(k, 2), r;
      r = ['A=\\begin{pmatrix}2&0\\\\0&k\\end{pmatrix},\\qquad k=' + n(k, 2),
        '\\det A=\\begin{vmatrix}2&0\\\\0&' + n(k, 2) + '\\end{vmatrix}=2\\cdot ' + pk + '-0\\cdot 0',
        '\\text{productos: }2\\cdot ' + pk + '=' + n(K2, 2) + ';\\qquad 0\\cdot 0=0',
        '\\det A=' + n(K2, 2) + '-0=' + n(K2, 2) + ',\\qquad |\\det A|=' + n(AB, 2),
        '\\text{área del círculo}=\\pi\\cdot 1^{2}=\\pi\\approx 3{,}14',
        '\\text{área de la elipse}=|\\det A|\\cdot\\pi=' + n(AB, 2) + '\\cdot\\pi' + Q + '\\approx ' + n(AB, 2) + '\\cdot 3{,}14' + (ex ? '=' : '\\approx ') + n(AR, 2),
        K2 > 0 ? '\\text{El área del círculo se multiplicó por }' + n(AB, 2) + '.' : (K2 < 0 ? '\\text{Determinante negativo: la figura se dio vuelta;}' + Q + '\\text{el área se multiplicó por }' + n(AB, 2) + '\\text{, no por }' + n(K2, 2) + '.' : '\\text{Determinante cero: el círculo se aplasta}' + Q + '\\text{en un segmento, de área }0.')];
      return dtPasos(r); }
  };
})());
