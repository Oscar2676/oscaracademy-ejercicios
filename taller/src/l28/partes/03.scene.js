/* L28 H03 · regla de Sarrus: dos columnas repetidas, tres diagonales que bajan y tres que suben */
OA.scene('sarrus-idea', (function(){
  var N = 5, LET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'], EX = [0, 1, 3, 4, 6, 7];
  var PZ = LET.map(function(l, j){ return ['M' + j, l, l, '']; }).concat(EX.map(function(j, n){ return ['E' + n, LET[j], LET[j], 'c-alt']; })).concat([
    ['Q', '\\det A=\\ ?', 'det A = ?', 'pt'], ['F', '\\Longrightarrow\\ aei+bfg+cdh-ceg-afh-bdi', '⟹ aei + bfg + cdh − ceg − afh − bdi', 'diff'],
    ['P0', '+', '+', 'c-sec'], ['P1', '+', '+', 'c-sec'], ['P2', '+', '+', 'c-sec'], ['N0', '-', '−', 'c-tan'], ['N1', '-', '−', 'c-tan'], ['N2', '-', '−', 'c-tan'],
    ['R1', '\\text{matriz de tres filas y tres columnas}', 'matriz de 3 filas y 3 columnas', ''],
    ['R2', '\\text{a la derecha: columnas 1 y 2, repetidas}', 'se repiten las columnas 1 y 2', ''],
    ['R3', '\\text{bajan: }+\\,aei+bfg+cdh', 'bajan: + aei + bfg + cdh', ''],
    ['R4', '\\text{suben: }-\\,ceg-afh-bdi', 'suben: − ceg − afh − bdi', ''],
    ['R5', '\\det A=aei+bfg+cdh-ceg-afh-bdi', 'det A = aei + bfg + cdh − ceg − afh − bdi', 'diff']]);
  var TXT = [['Una matriz de tres filas y tres columnas.', '¿Cómo se calcula su determinante de una vez?'],
    ['Se repiten a la derecha las columnas 1 y 2.', 'Quedan tres filas y cinco columnas.'],
    ['Tres diagonales bajan hacia la derecha.', 'Los tres productos se suman.'],
    ['Tres diagonales suben hacia la derecha.', 'Los tres productos se restan.'],
    ['Lo que baja, menos lo que sube.', 'La pregunta de arriba ya tiene respuesta.']];
  function cx(q){ return q*0.95; } function cy(r){ return 2.75 - r*0.9; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:3.95}, aspect:8.55/6.6,
    aria:'Animación en cinco pasos. Uno: una matriz de tres por tres con filas a, b, c; d, e, f; g, h, i. Dos: a su derecha se repiten la columna uno, a, d, g, y la columna dos, b, e, h. Tres: tres bandas azules marcan las diagonales que bajan: a, e, i; b, f, g; c, d, h; sus productos llevan signo más. Cuatro: tres bandas burdeo marcan las diagonales que suben: g, e, c; h, f, a; i, d, b; sus productos llevan signo menos. Cinco: el determinante es la suma de los tres primeros productos menos los otros tres. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw alt"></i> columnas 1 y 2, repetidas</span><span><i class="sw sec"></i> diagonales que bajan: suman</span><span><i class="sw tan"></i> diagonales que suben: restan</span>',
    anim:{run:26000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', j, n, q, s = X(1) - X(0), e;
      function ap(m){ return k > m ? 1 : (k === m ? u : 0); }
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function banda(x0, y0, x1, y1, col, g){ if (g <= 0) return; c.save(); c.globalAlpha = 0.26; c.strokeStyle = col; c.lineWidth = 13; c.lineCap = 'round'; c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x0 + (x1 - x0)*g), Y(y0 + (y1 - y0)*g)); c.stroke(); c.restore(); }
      /* barras del determinante */
      c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(-0.5), Y(3.2)); c.lineTo(X(-0.5), Y(0.5)); c.moveTo(X(2.38), Y(3.2)); c.lineTo(X(2.38), Y(0.5)); c.stroke();
      /* diagonales que bajan (paso 3) y que suben (paso 4): cada banda crece, una tras otra */
      for (j = 0; j < 3; j++){ q = Math.max(0, Math.min(1, ap(3)*2.2 - j*0.6)); banda(cx(j), cy(0), cx(j + 2), cy(2), C.sec, q); if (q > 0.95) L('P' + j, cx(j + 2), cy(2) - 0.47); }
      for (j = 0; j < 3; j++){ q = Math.max(0, Math.min(1, ap(4)*2.2 - j*0.6)); banda(cx(j), cy(2), cx(j + 2), cy(0), C.tan, q); if (q > 0.95) L('N' + j, cx(j + 2), cy(0) + 0.45); }
      for (j = 0; j < 9; j++) L('M' + j, cx(j % 3), cy(Math.floor(j/3)));
      /* columnas repetidas (paso 2): salen de su columna y se corren a la derecha */
      if (k >= 2) for (n = 0; n < 6; n++){ j = EX[n]; e = ap(2); L('E' + n, cx(j % 3) + 2.85*e, cy(Math.floor(j/3))); }
      L('Q', -1.2, 3.72, 0); if (k === 5 && u > 0.5) L('F', 0.25, 3.72, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, -0.2); txt(TXT[k - 1][1], -1.2, -0.2 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(0.22));
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 30, 60, 90, 120]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}', '\\text{se repiten las columnas 1 y 2:}\\\\&\\qquad\\begin{array}{ccc|cc}a&b&c&a&b\\\\d&e&f&d&e\\\\g&h&i&g&h\\end{array}', '\\text{bajan, se suman: }a\\cdot e\\cdot i+b\\cdot f\\cdot g+c\\cdot d\\cdot h', '\\text{suben, se restan: }c\\cdot e\\cdot g+a\\cdot f\\cdot h+b\\cdot d\\cdot i', '\\det A=(aei+bfg+cdh)-(ceg+afh+bdi)\\\\&\\qquad\\ \\,=aei+bfg+cdh-ceg-afh-bdi']; return dtPasos(R.slice(0, k)); }
  };
})());
