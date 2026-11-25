/* L28 H05 · trasponer no cambia el determinante: los seis productos son los mismos */
OA.scene('trasp-idea', (function(){
  var N = 5, LET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
  var PZ = LET.map(function(l, j){ return ['M' + j, l, l, '']; }).concat(LET.map(function(l, j){ return ['T' + j, l, l, '']; })).concat([
    ['Q', '\\det A^{T}=\\ ?', 'det Aᵀ = ?', 'pt'], ['F', '\\Longrightarrow\\ \\det A^{T}=\\det A', '⟹ det Aᵀ = det A', 'diff'],
    ['TA', 'A', 'A', ''], ['TT', 'A^{T}', 'Aᵀ', ''],
    ['R1', '\\text{filas de }A\\text{: }(a,b,c),\\ (d,e,f),\\ (g,h,i)', 'filas de A: (a, b, c), (d, e, f), (g, h, i)', ''],
    ['R2', '\\text{columnas de }A^{T}\\text{: esas mismas filas}', 'columnas de Aᵀ: esas mismas filas', ''],
    ['R3', '+\\,bfg\\ \\text{ en }A,\\qquad +\\,gbf\\ \\text{ en }A^{T}', '+ bfg en A, + gbf en Aᵀ', ''],
    ['R4', '-\\,afh\\ \\text{ en }A,\\qquad -\\,fha\\ \\text{ en }A^{T}', '− afh en A, − fha en Aᵀ', ''],
    ['R5', '\\det A^{T}=\\det A', 'det Aᵀ = det A', 'diff']]);
  var TXT = [['Una matriz de tres filas y tres columnas.', '¿Cambia su determinante si se traspone?'],
    ['Cada fila pasa a ser columna: es la traspuesta.', 'La diagonal principal no se mueve.'],
    ['Un producto que suma: tres casillas azules.', 'En la traspuesta están las mismas tres, y suma.'],
    ['Un producto que resta: tres casillas burdeo.', 'En la traspuesta están las mismas tres, y resta.'],
    ['Pasa igual con los seis productos:', 'los dos determinantes valen lo mismo.']];
  var MAS = [1, 5, 6], MEN = [0, 5, 7];
  function xa(q){ return -0.4 + 0.8*q; } function xt(q){ return 3.0 + 0.8*q; } function cy(r){ return 2.75 - 0.8*r; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.2, y1:5.2}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos. Uno: una matriz A de tres por tres con filas a, b, c; d, e, f; g, h, i. Dos: a su derecha se arma la traspuesta: cada fila de A pasa a ser una columna, así que sus filas son a, d, g; b, e, h; c, f, i; la diagonal a, e, i queda en su lugar. Tres: en A se marcan en azul las entradas b, f, g, cuyo producto suma; en la traspuesta están las mismas tres entradas, también en una diagonal que baja. Cuatro: en A se marcan en burdeo las entradas a, f, h, cuyo producto resta; en la traspuesta están las mismas tres, también en una diagonal que sube. Cinco: pasa lo mismo con los seis productos, y los dos determinantes son iguales. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> diagonal principal: no se mueve</span><span><i class="sw sec"></i> un producto que suma</span><span><i class="sw tan"></i> un producto que resta</span>',
    anim:{run:26000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', j, r, q, s = X(1) - X(0), hw = 0.3, e = k > 2 ? 1 : (k === 2 ? u : 0);
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function barras(x0, x1, al){ c.globalAlpha = al; c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(x0), Y(cy(0) + 0.42)); c.lineTo(X(x0), Y(cy(2) - 0.42)); c.moveTo(X(x1), Y(cy(0) + 0.42)); c.lineTo(X(x1), Y(cy(2) - 0.42)); c.stroke(); c.globalAlpha = 1; }
      function casillas(lista, col, al){ if (al <= 0.004) return; lista.forEach(function(j){ var r = Math.floor(j/3), q = j % 3; c.globalAlpha = al; c.fillStyle = col; c.fillRect(X(xa(q) - hw), Y(cy(r) + hw), 2*hw*s, 2*hw*s); c.fillRect(X(xt(r) - hw), Y(cy(q) + hw), 2*hw*s, 2*hw*s); c.globalAlpha = 1; }); }
      function diag(x0, g){ if (g <= 0) return; c.globalAlpha = 0.7; c.strokeStyle = C.rise; c.lineWidth = 1.4; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(x0 - 0.3), Y(cy(0) + 0.3)); c.lineTo(X(x0 - 0.3 + 2.2*g), Y(cy(0) + 0.3 - 2.2*g)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      barras(-0.85, 1.65, 1); if (e > 0) barras(2.55, 5.05, e);
      /* casillas de un producto que suma (paso 3) y de uno que resta (paso 4) */
      /* no se borran: las azules quedan desde el paso 3 y las burdeo desde el 4, hasta el final */
      if (k >= 3) casillas(MAS, C.sec, k === 3 ? 0.26*u : 0.24);
      if (k >= 4) casillas(MEN, C.tan, k === 4 ? 0.26*u : 0.24);
      diag(xa(0), e); diag(xt(0), k > 2 ? 1 : (k === 2 ? Math.max(0, 2*u - 1) : 0));
      for (j = 0; j < 9; j++){ r = Math.floor(j/3); q = j % 3; L('M' + j, xa(q), cy(r)); }
      /* la traspuesta se arma: cada entrada viaja desde su lugar en A hasta su lugar en la traspuesta */
      if (k >= 2) for (j = 0; j < 9; j++){ r = Math.floor(j/3); q = j % 3; L('T' + j, xa(q) + (xt(r) - xa(q))*e, cy(r) + (cy(q) - cy(r))*e); }
      if (k >= 2) dtFlecha(S, 1.85, 3.42, 1.85 + 0.55*Math.max(e, 0.05), 3.42, C.ink, 1.3);
      L('TA', 0.4, 3.42); if (k > 2 || (k === 2 && u > 0.6)) L('TT', 3.8, 3.42);
      L('Q', -1.2, 3.97, 0); if (k === 5 && u > 0.5) L('F', 0.45, 3.97, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, 0.25); txt(TXT[k - 1][1], -1.2, 0.25 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.97));
      dtQue(S, 'al trasponer, el determinante no', 'cambia: los seis productos son los mismos.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.3, [0, 30, 60, 90, 120]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['A=\\begin{pmatrix}a&b&c\\\\d&e&f\\\\g&h&i\\end{pmatrix}', 'A^{T}=\\begin{pmatrix}a&d&g\\\\b&e&h\\\\c&f&i\\end{pmatrix}', '\\text{suma en }A\\text{: }+\\,b\\cdot f\\cdot g;\\\\&\\qquad\\text{en }A^{T}\\text{: }+\\,g\\cdot b\\cdot f=+\\,bfg', '\\text{resta en }A\\text{: }-\\,a\\cdot f\\cdot h;\\\\&\\qquad\\text{en }A^{T}\\text{: }-\\,f\\cdot h\\cdot a=-\\,afh', '\\det A=aei+bfg+cdh-ceg-afh-bdi\\\\&\\qquad\\det A^{T}=aei+dhc+gbf-ceg-fha-ibd\\\\&\\qquad dhc=cdh,\\ \\ gbf=bfg,\\ \\ fha=afh,\\ \\ ibd=bdi\\\\&\\qquad\\det A^{T}=aei+bfg+cdh-ceg-afh-bdi\\\\&\\qquad\\det A^{T}=\\det A']; return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: el paralelogramo de las columnas de A y el de las columnas de su traspuesta */
OA.scene('trasp-vivo', (function(){
  var PZ = [['PA', '\\text{columnas de }A', 'columnas de A', 'c-sec'], ['PT', '\\text{columnas de }A^{T}', 'columnas de Aᵀ', 'diff']];
  return {
    world:{x0:-1.0, x1:7.6, y0:-2.2, y1:8.75}, aspect:10.95/8.6,
    aria:'Dos paralelogramos que salen del origen. El azul lo forman las columnas de la matriz A, los vectores (2, 1) y (b, 2). El naranja lo forman las columnas de la traspuesta, los vectores (2, b) y (1, 2). Al mover b los dos cambian de forma de manera distinta, pero siempre tienen la misma área, el valor absoluto de 4 menos b. Con b igual a 2 los dos coinciden. Con b igual a 4 los dos se aplastan a la vez y el área es cero. Bajo el dibujo se calculan los dos determinantes.',
    labels:PZ,
    sliders:[{id:'b', tex:'b', min:0, max:5, step:0.1, value:1}],
    legend:'<span><i class="sw sec"></i> columnas de \\(A\\): \\((2,1)\\) y \\((b,2)\\)</span><span><i class="sw rise"></i> columnas de \\(A^{T}\\): \\((2,b)\\) y \\((1,2)\\)</span>',
    anim:{run:20000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.b = 5*dtSuave(p); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var b = v.b == null ? 1 : +v.b, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', D = 4 - b, i, m;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function par(P, Q, col){ if (Math.abs(D) > 1e-9){ S.poly([[0, 0], P, [P[0] + Q[0], P[1] + Q[1]], Q], {fill:col, alpha:0.26});
          c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(P[0]), Y(P[1])); c.lineTo(X(P[0] + Q[0]), Y(P[1] + Q[1])); c.lineTo(X(Q[0]), Y(Q[1])); c.stroke(); c.setLineDash([]); }
        dtFlecha(S, 0, 0, P[0], P[1], col, 1.8); dtFlecha(S, 0, 0, Q[0], Q[1], col, 1.8); }
      S.line(-0.8, 0, 7.4, 0, {color:C.ink, width:1}); S.line(0, -0.8, 0, 7.2, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 7; i++){ c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(i), Y(0) + 11, 'center'); num('' + i, X(0) - 7, Y(i), 'right'); }
      par([2, 1], [b, 2], C.sec); par([2, b], [1, 2], C.rise);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      T.L('PA', 2 + b, 3, -100, 0, -11); T.L('PT', 3, b + 2, 0, 7, 0);
      m = Math.abs(D) < 0.05 ? 'Determinante cero: los dos se aplastan a la vez' : 'Formas distintas, la misma área';
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m, X(-0.9), Y(-1.7));
      dtQue(S, 'A y su traspuesta dan figuras', 'distintas, pero siempre con la misma área.');
      T.fin();
    },
    caption:function(v){ var R = function(z){ return Math.round(z*100)/100; }, N = function(z){ return '\\(' + OA.num(R(z), 2) + '\\)'; }, M = function(t){ return '\\(' + t + '\\)'; }, n2 = function(z){ return OA.num(R(z), 2); }, b = R(v.b == null ? 1 : +v.b); return 'Con ' + M('b=' + n2(b)) + ' los dos determinantes valen ' + N(4 - b) + ' y cada paralelogramo mide ' + N(Math.abs(4 - b)) + ' unidades cuadradas. Con ' + M('b=4') + ' los dos se aplastan a la vez'; },
    readout:function(v){ var b = Math.round((v.b == null ? 1 : +v.b)*100)/100, D = Math.round((4 - b)*100)/100, n = OA.num;
      return dtPasos(['A=\\begin{pmatrix}2&b\\\\1&2\\end{pmatrix},\\qquad A^{T}=\\begin{pmatrix}2&1\\\\b&2\\end{pmatrix},\\\\&\\qquad b=' + n(b, 2),
        '\\det A=\\begin{vmatrix}2&' + n(b, 2) + '\\\\1&2\\end{vmatrix}=2\\cdot 2-' + n(b, 2) + '\\cdot 1',
        '\\text{productos: }2\\cdot 2=4;\\qquad ' + n(b, 2) + '\\cdot 1=' + n(b, 2),
        '\\det A=4-' + n(b, 2) + '=' + n(D, 2),
        '\\det A^{T}=\\begin{vmatrix}2&1\\\\' + n(b, 2) + '&2\\end{vmatrix}=2\\cdot 2-1\\cdot ' + n(b, 2),
        '\\text{productos: }2\\cdot 2=4;\\qquad 1\\cdot ' + n(b, 2) + '=' + n(b, 2),
        '\\det A^{T}=4-' + n(b, 2) + '=' + n(D, 2) + '=\\det A',
        '\\text{área de cada uno}=\\left|' + n(D, 2) + '\\right|=' + n(Math.abs(D), 2),
        '\\text{formas distintas, misma área:}\\\\&\\qquad\\det A^{T}=\\det A\\text{ para este }b' + (D === 0 ? '\\\\&\\qquad\\text{determinante cero: los dos se aplastan}' : '')]); }
  };
})());
