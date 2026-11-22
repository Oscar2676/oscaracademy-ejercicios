/* L28 H07 · filas i y columnas j: cada elemento se nombra con su fila y su columna */
OA.scene('filcol-idea', (function(){
  var N = 5, j0, PZ = [];
  for (j0 = 0; j0 < 9; j0++) PZ.push(['M' + j0, 'a_{' + (Math.floor(j0/3) + 1) + (j0 % 3 + 1) + '}', 'a' + (Math.floor(j0/3) + 1) + (j0 % 3 + 1), '']);
  for (j0 = 1; j0 <= 3; j0++){ PZ.push(['I' + j0, 'i=' + j0, 'i = ' + j0, 'c-sec']); PZ.push(['J' + j0, 'j=' + j0, 'j = ' + j0, 'c-alt']); }
  PZ = PZ.concat([['Q', 'a_{ij}\\text{: ¿qué indican }i\\text{ y }j\\text{?}', 'a_ij: ¿qué indican i y j?', 'pt'], ['F', 'a_{ij}\\text{: fila }i,\\ \\text{columna }j', 'a_ij: fila i, columna j', 'diff'],
    ['R1', '3\\text{ filas}\\times 3\\text{ columnas}=9\\text{ elementos}', '3 filas × 3 columnas = 9 elementos', ''],
    ['R2', '\\text{fila }i=2\\text{: }\\ a_{21},\\ a_{22},\\ a_{23}', 'fila i = 2: a21, a22, a23', 'c-sec'],
    ['R3', '\\text{columna }j=3\\text{: }\\ a_{13},\\ a_{23},\\ a_{33}', 'columna j = 3: a13, a23, a33', 'c-alt'],
    ['R4', 'a_{23}\\text{: fila }2,\\ \\text{columna }3', 'a23: fila 2, columna 3', 'diff'],
    ['R5', '\\text{diagonal principal }(i=j)\\text{: }\\ a_{11},\\ a_{22},\\ a_{33}', 'diagonal principal (i = j): a11, a22, a33', 'c-tan']]);
  var TXT = [['Un determinante de tercer orden:', 'nueve elementos. ¿Cómo se nombra cada uno?'],
    ['Las filas son horizontales y se cuentan desde', 'arriba. En la fila 2, el primer subíndice es 2.'],
    ['Las columnas son verticales y se cuentan desde', 'la izquierda. En la 3, el segundo subíndice es 3.'],
    ['Donde se cruzan la fila 2 y la columna 3', 'hay un solo elemento.'],
    ['Si fila y columna tienen el mismo número,', 'el elemento está en la diagonal principal.']];
  function cx(q){ return 1.2 + q; } function cy(r){ return 3.0 - 0.85*r; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.2, y1:4.5}, aspect:8.7/6.6,
    aria:'Animación en cinco pasos sobre un determinante de tercer orden con elementos a11, a12, a13 en la primera fila; a21, a22, a23 en la segunda; a31, a32, a33 en la tercera. Uno: tiene tres filas y tres columnas, nueve elementos. Dos: se marca en azul la fila 2, la segunda línea horizontal contando desde arriba; sus elementos son a21, a22, a23, todos con primer subíndice 2. Tres: se marca en verde la columna 3, la tercera línea vertical contando desde la izquierda; sus elementos son a13, a23, a33, todos con segundo subíndice 3. Cuatro: en el cruce queda en naranja el elemento a23. Cinco: una línea burdeo recorre la diagonal principal, a11, a22, a33, donde el número de fila y el de columna coinciden. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> fila \\(i=2\\)</span><span><i class="sw alt"></i> columna \\(j=3\\)</span><span><i class="sw rise"></i> elemento \\(a_{23}\\)</span><span><i class="sw tan"></i> diagonal principal</span>',
    anim:{run:26000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', j, s = X(1) - X(0), hw = 0.46, hh = 0.36, g;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function rect(x0, y1, w, h, col, al){ if (al <= 0.004 || w <= 0 || h <= 0) return; c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(x0), Y(y1), w*s, h*s); c.globalAlpha = 1; }
      /* banda de la fila 2: crece de izquierda a derecha */
      g = k > 2 ? 1 : (k === 2 ? u : 0); rect(cx(0) - hw, cy(1) + hh, (2 + 2*hw)*g, 2*hh, C.sec, k === 5 ? 0.13 : 0.22);
      /* banda de la columna 3: crece de arriba hacia abajo */
      g = k > 3 ? 1 : (k === 3 ? u : 0); rect(cx(2) - hw, cy(0) + hh, 2*hw, (1.7 + 2*hh)*g, C.alt, k === 5 ? 0.13 : 0.22);
      /* casilla del cruce */
      g = k > 4 ? 1 : (k === 4 ? u : 0);
      if (g > 0){ rect(cx(2) - hw, cy(1) + hh, 2*hw, 2*hh, C.rise, 0.36*g); c.globalAlpha = g; c.strokeStyle = C.rise; c.lineWidth = 1.6; c.strokeRect(X(cx(2) - hw), Y(cy(1) + hh), 2*hw*s, 2*hh*s); c.globalAlpha = 1; }
      /* diagonal principal */
      if (k === 5){ c.strokeStyle = C.tan; c.lineWidth = 1.5; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(cx(0) - 0.42), Y(cy(0) + 0.36)); c.lineTo(X(cx(0) - 0.42 + 2.84*u), Y(cy(0) + 0.36 - 2.42*u)); c.stroke(); c.setLineDash([]); }
      /* barras del determinante */
      c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(cx(0) - 0.6), Y(cy(0) + 0.45)); c.lineTo(X(cx(0) - 0.6), Y(cy(2) - 0.45)); c.moveTo(X(cx(2) + 0.6), Y(cy(0) + 0.45)); c.lineTo(X(cx(2) + 0.6), Y(cy(2) - 0.45)); c.stroke();
      for (j = 0; j < 9; j++) L('M' + j, cx(j % 3), cy(Math.floor(j/3)));
      if (k > 2 || (k === 2 && u > 0.3)) for (j = 1; j <= 3; j++) L('I' + j, cx(0) - 0.78, cy(j - 1), -100);
      if (k > 3 || (k === 3 && u > 0.3)) for (j = 1; j <= 3; j++) L('J' + j, cx(j - 1), cy(0) + 0.68);
      if (k < N || u < 0.5) L('Q', -1.2, 4.2, 0); else L('F', -1.2, 4.2, 0);
      txt(TXT[k - 1][0], -1.2, 0.25); txt(TXT[k - 1][1], -1.2, 0.25 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.2));
      T.fin();
      oaReg(S, k, N, -1.2, -1.3, [0, 30, 60, 90, 120]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['\\begin{vmatrix}a_{11}&a_{12}&a_{13}\\\\a_{21}&a_{22}&a_{23}\\\\a_{31}&a_{32}&a_{33}\\end{vmatrix}', '\\text{fila }2\\text{: }\\ a_{21},\\ a_{22},\\ a_{23}\\qquad(i=2)', '\\text{columna }3\\text{: }\\ a_{13},\\ a_{23},\\ a_{33}\\qquad(j=3)', 'a_{23}\\text{: }\\ i=2,\\ j=3', 'i=j\\text{: }\\ a_{11},\\ a_{22},\\ a_{33}'][k - 1]]]; }
  };
})());
/* número ↔ figura: se eligen i y j; se marcan la fila, la columna, el elemento y el signo de su posición */
OA.scene('filcol-vivo', (function(){
  var NUM = [2, -1, 0, 3, 1, -2, -1, 4, 5], j0, PZ = [];
  for (j0 = 0; j0 < 9; j0++) PZ.push(['V' + j0, '' + NUM[j0], ('' + NUM[j0]).replace('-', '−'), '']);
  for (j0 = 1; j0 <= 3; j0++){ PZ.push(['I' + j0, 'i=' + j0, 'i = ' + j0, 'c-sec']); PZ.push(['J' + j0, 'j=' + j0, 'j = ' + j0, 'c-alt']); }
  function cx(q){ return 1.3 + q; } function cy(r){ return 2.6 - 0.85*r; }
  return {
    world:{x0:-1.0, x1:5.6, y0:-0.9, y1:3.8}, aspect:4.7/6.6,
    aria:'Un determinante de tercer orden con filas 2, menos 1, 0; 3, 1, menos 2; menos 1, 4, 5. Dos deslizadores eligen el número de fila i y el número de columna j, de 1 a 3. Una banda azul marca la fila elegida, una banda verde marca la columna elegida y una casilla naranja marca el elemento del cruce. En la esquina de cada casilla hay un signo gris, más o menos, que es el signo de la posición: más si i más j es par, menos si es impar. Bajo el dibujo se escribe el elemento elegido con su valor y el signo de su posición.',
    labels:PZ,
    sliders:[{id:'i', tex:'i', min:1, max:3, step:1, value:2}, {id:'j', tex:'j', min:1, max:3, step:1, value:3}],
    legend:'<span><i class="sw sec"></i> fila \\(i\\)</span><span><i class="sw alt"></i> columna \\(j\\)</span><span><i class="sw rise"></i> elemento \\(a_{ij}\\)</span>',
    anim:{run:27000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(9 - 1e-6, p*9), n = Math.floor(t), m = n ? n - 1 : 0, w = dtSuave((t - n)*2.5);
      v.q = p; v.i = Math.floor(n/3) + 1; v.j = n % 3 + 1; v.fi = Math.floor(m/3) + (Math.floor(n/3) - Math.floor(m/3))*w; v.fj = m % 3 + (n % 3 - m % 3)*w; }},
    onInput:function(v){ v.q = null; v.fi = null; v.fj = null; },
    draw:function(S, v){
      var i = Math.round(v.i || 2), j = Math.round(v.j || 3), fi = v.fi == null ? i - 1 : v.fi, fj = v.fj == null ? j - 1 : v.fj, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), hw = 0.46, hh = 0.36, n, r, q, m;
      function rect(x0, y1, w, h, col, al){ c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(x0), Y(y1), w*s, h*s); c.globalAlpha = 1; }
      rect(cx(0) - hw, cy(fi) + hh, 2 + 2*hw, 2*hh, C.sec, 0.22);
      rect(cx(fj) - hw, cy(0) + hh, 2*hw, 1.7 + 2*hh, C.alt, 0.22);
      rect(cx(fj) - hw, cy(fi) + hh, 2*hw, 2*hh, C.rise, 0.36); c.strokeStyle = C.rise; c.lineWidth = 1.6; c.strokeRect(X(cx(fj) - hw), Y(cy(fi) + hh), 2*hw*s, 2*hh*s);
      c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(cx(0) - 0.6), Y(cy(0) + 0.45)); c.lineTo(X(cx(0) - 0.6), Y(cy(2) - 0.45)); c.moveTo(X(cx(2) + 0.6), Y(cy(0) + 0.45)); c.lineTo(X(cx(2) + 0.6), Y(cy(2) - 0.45)); c.stroke();
      for (n = 0; n < 9; n++){ r = Math.floor(n/3); q = n % 3; T.L('V' + n, cx(q), cy(r));
        c.font = '600 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText((r + q) % 2 ? '−' : '+', X(cx(q) - hw) + 3, Y(cy(r) + hh) + 7); }
      for (n = 1; n <= 3; n++){ T.L('I' + n, cx(0) - 0.78, cy(n - 1), -100); T.L('J' + n, cx(n - 1), cy(0) + 0.68); }
      m = 'Fila ' + i + ', columna ' + j + ': posición de signo ' + ((i + j) % 2 ? 'menos' : 'más');
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-0.9), Y(-0.45));
      T.fin();
    },
    caption:function(v){ var i = Math.round(v.i || 2), j = Math.round(v.j || 3), a = NUM[3*(i - 1) + j - 1]; return 'El elemento de la fila ' + i + ' y la columna ' + j + ' vale ' + ('' + a).replace('-', '−') + '. El signo de su posición es ' + ((i + j) % 2 ? 'menos' : 'más') + ', porque ' + i + ' + ' + j + ' = ' + (i + j) + ' es ' + ((i + j) % 2 ? 'impar' : 'par'); },
    readout:function(v){ var i = Math.round(v.i || 2), j = Math.round(v.j || 3), a = NUM[3*(i - 1) + j - 1], f = [['d', 'a_{' + i + j + '}=' + a + '\\qquad(\\text{fila }' + i + ',\\ \\text{columna }' + j + ')'], ['', '(-1)^{i+j}=(-1)^{' + i + '+' + j + '}=(-1)^{' + (i + j) + '}=' + ((i + j) % 2 ? '-1' : '+1')]];
      if (i === j) f.push(['', 'i=j\\text{: está en la diagonal principal}']);
      if (i + j === 4) f.push(['', 'i+j=4\\text{: está en la diagonal secundaria}']);
      return f; }
  };
})());
