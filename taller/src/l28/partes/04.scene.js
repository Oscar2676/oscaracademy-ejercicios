/* L28 H04 · las propiedades, vistas en el paralelogramo de las columnas */
OA.scene('prop-idea', (function(){
  var N = 6, U0 = [2, 1], V0 = [1, 2];
  var PZ = [['Q', '\\text{si cambia la matriz, ¿cómo cambia }\\det A\\text{?}', 'si cambia la matriz, ¿cómo cambia det A?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{signo contrario, por }k\\text{, igual o cero}', '⟹ signo contrario, por k, igual o cero', 'diff'],
    ['LU', '\\vec u', 'u', 'c-sec'], ['LV', '\\vec v', 'v', 'diff'], ['C1', '\\text{1.ª}', '1.ª', ''], ['C2', '\\text{2.ª}', '2.ª', ''],
    ['D1', '\\det=3', 'det = 3', 'c-tan'], ['D2', '\\det=-3', 'det = −3', 'c-alt'], ['D3', '\\det=6', 'det = 6', 'c-tan'], ['D4', '\\det=3', 'det = 3', 'c-tan'], ['D5', '\\det=0', 'det = 0', ''],
    ['R1', '\\begin{vmatrix}2&1\\\\1&2\\end{vmatrix}=2\\cdot 2-1\\cdot 1=3', '|2 1; 1 2| = 3', ''],
    ['R2', '\\text{intercambio: }\\begin{vmatrix}1&2\\\\2&1\\end{vmatrix}=1\\cdot 1-2\\cdot 2=-3', 'intercambio: |1 2; 2 1| = −3', ''],
    ['R3', '\\text{por }2\\text{: }\\begin{vmatrix}4&1\\\\2&2\\end{vmatrix}=4\\cdot 2-1\\cdot 2=6=2\\cdot 3', 'por 2: |4 1; 2 2| = 6 = 2 · 3', ''],
    ['R4', '\\text{suma: }\\begin{vmatrix}2&3\\\\1&3\\end{vmatrix}=2\\cdot 3-3\\cdot 1=3', 'suma: |2 3; 1 3| = 3', ''],
    ['R5', '\\text{proporcionales: }\\begin{vmatrix}2&1\\\\1&\\frac12\\end{vmatrix}=2\\cdot\\tfrac12-1\\cdot 1=0', 'proporcionales: |2 1; 1 ½| = 0', ''],
    ['R6', '\\times(-1),\\qquad \\times k,\\qquad \\text{igual},\\qquad 0', '×(−1), ×k, igual, 0', 'diff']];
  var TXT = [['Las columnas de la matriz forman un paralelogramo.', 'Su área, con signo, es el determinante.'],
    ['Se intercambian las columnas: cambia el giro.', 'El área es la misma; el signo, el contrario.'],
    ['La primera columna se multiplica por 2.', 'El área y el determinante se duplican.'],
    ['A la segunda columna se le suma la primera.', 'Misma base y misma altura: el área no cambia.'],
    ['La segunda columna es la mitad de la primera.', 'Las flechas se alinean y no queda área.'],
    ['Intercambiar, multiplicar, sumar un múltiplo', 'o repetir: cada cambio tiene su regla.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-8.6, y1:6.05}, aspect:14.65/6.6,
    aria:'Animación en seis pasos sobre el paralelogramo que forman las columnas u igual a (2, 1) y v igual a (1, 2), de determinante 3. Uno: el paralelogramo. Dos: se intercambian las columnas; el paralelogramo es el mismo, cambia el sentido de giro de la primera a la segunda y el determinante pasa a menos 3. Tres: la primera columna se multiplica por 2; el paralelogramo dobla su área y el determinante vale 6. Cuatro: a la segunda columna se le suma la primera; el paralelogramo se inclina con la misma base y la misma altura, y el determinante sigue en 3. Cinco: la segunda columna pasa a ser la mitad de la primera; el paralelogramo se aplasta y el determinante vale 0. Seis: resumen de las cuatro reglas. El resultado de cada paso queda guardado en una fila de cinco figuras chicas, cada una con su determinante: 3, menos 3, 6, 3 y 0. Bajo ellas, un registro numerado guarda la cuenta de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(\\vec u\\), primera columna</span><span><i class="sw rise"></i> \\(\\vec v\\), segunda columna</span><span><i class="sw tan"></i> determinante positivo</span><span><i class="sw alt"></i> determinante negativo</span>',
    anim:{run:32000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0);
      var U = U0.slice(), V = V0.slice(), g = k === 1 ? u : 1, i, a0, a1, th, r = 0.95, pts, m, d, n, w, al, ox, YB = -2.0, SC = 0.24;
      /* lo que dejó cada paso: columnas finales, color, y dónde iba su rótulo en la figura grande */
      var FIN = [[[2, 1], [1, 2], C.tan, 1.5, 1.5, 0, 0], [[2, 1], [1, 2], C.alt, 1.5, 1.5, 0, 0], [[4, 2], [1, 2], C.tan, 2.5, 2, 0, 0], [[2, 1], [3, 3], C.tan, 2.5, 2, 0, 0], [[2, 1], [1, 0.5], C.tan, 1.5, 0.75, 34, 18]];
      if (k === 3) U = [U0[0]*(1 + u), U0[1]*(1 + u)];
      if (k === 4) V = [V0[0] + u*U0[0], V0[1] + u*U0[1]];
      if (k === 5) V = [1, 2 - 1.5*u];
      if (k === 6) V = [1, 0.5]; /* la figura del paso 5 queda en su lugar */
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function par(col, al){ if (al > 0.004) S.poly([[0, 0], U, [U[0] + V[0], U[1] + V[1]], V], {fill:col, alpha:al}); }
      function seg(x0, y0, x1, y1, col, wd){ c.strokeStyle = col; c.lineWidth = wd; c.setLineDash([]); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); }
      S.line(-0.5, 0, 5.1, 0, {color:'rgba(0,0,0,0.35)', width:1}); S.line(0, -0.3, 0, 4.3, {color:'rgba(0,0,0,0.35)', width:1});
      /* el paralelogramo del comienzo, punteado, para comparar: desde el paso 3 no se quita */
      if (k >= 3){ c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(0), Y(0)); c.lineTo(X(2), Y(1)); c.lineTo(X(3), Y(3)); c.lineTo(X(1), Y(2)); c.closePath(); c.stroke(); c.setLineDash([]); }
      /* paso 4: la recta, paralela a u, por la que se corre la punta de v; queda hasta el final */
      if (k >= 4){ c.strokeStyle = C.rise; c.globalAlpha = 0.6*(k === 4 ? Math.min(1, u*3) : 1); c.lineWidth = 1; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(0.2), Y(1.6)); c.lineTo(X(4.6), Y(3.8)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      /* paralelogramo: burdeo si el determinante es positivo, verde si es negativo */
      if (k === 2){ par(C.tan, 0.3*(1 - u)); par(C.alt, 0.3*u); } else par(C.tan, 0.3*g);
      c.strokeStyle = k === 2 && u > 0.5 ? C.alt : C.tan; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(U[0]*g), Y(U[1]*g)); c.lineTo(X((U[0] + V[0])*g), Y((U[1] + V[1])*g)); c.lineTo(X(V[0]*g), Y(V[1]*g)); c.stroke(); c.setLineDash([]);
      dtFlecha(S, 0, 0, U[0]*g, U[1]*g, C.sec, 2); dtFlecha(S, 0, 0, V[0]*g, V[1]*g, C.rise, 2);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      /* paso 2: cuál es la primera y cuál la segunda, y el giro de una a otra */
      m = [U0[0]*0.72, U0[1]*0.72]; d = [V0[0]*0.72, V0[1]*0.72];
      if (k === 2){ a0 = Math.atan2(U0[1], U0[0]); a1 = Math.atan2(V0[1], V0[0]); if (u > 0.5){ th = a0; a0 = a1; a1 = th; }
        pts = []; for (i = 0; i <= 8; i++){ th = a0 + (a1 - a0)*i/8; pts.push([r*Math.cos(th), r*Math.sin(th)]); }
        c.strokeStyle = C.ink; c.lineWidth = 1.5; c.beginPath(); for (i = 0; i <= 5; i++){ if (i) c.lineTo(X(pts[i][0]), Y(pts[i][1])); else c.moveTo(X(pts[i][0]), Y(pts[i][1])); } c.stroke();
        dtFlecha(S, pts[5][0], pts[5][1], pts[8][0], pts[8][1], C.ink, 1.5);
        L('C1', m[0] + (d[0] - m[0])*u, m[1] + (d[1] - m[1])*u, -50, 14*(1 - u) - 14*u, 13*(1 - u) - 11*u);
        L('C2', d[0] + (m[0] - d[0])*u, d[1] + (m[1] - d[1])*u, -50, -14*(1 - u) + 14*u, -11*(1 - u) + 13*u); }
      if (k > 1 || u > 0.6){ L('LU', U[0], U[1], 0, 8, 8); L('LV', V[0], V[1], 0, 6, -12); }
      /* el valor del determinante del paso en curso, dentro de la figura */
      m = [(U[0] + V[0])/2, (U[1] + V[1])/2];
      if (k <= 5 && u > 0.6) L('D' + k, m[0], m[1], -50, k === 5 ? 34 : 0, k === 5 ? 18 : 0);
      /* fila de figuras chicas: lo que dejó cada paso no se borra; su rótulo baja desde la figura grande */
      if (k >= 2){ c.font = '600 11.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.globalAlpha = k === 2 ? Math.min(1, u*2.5) : 1; c.fillText('Lo que dejó cada paso:', X(-1.2), Y(-0.68)); c.globalAlpha = 1; }
      for (n = 1; n <= 5 && n < k; n++){ d = FIN[n - 1]; ox = -1.15 + (n - 1)*1.3; al = k === n + 1 ? Math.min(1, u*2.5) : 1; w = k === n + 1 ? dtSuave(u/0.4) : 1;
        c.globalAlpha = al;
        if (n < 5) S.poly([[ox, YB], [ox + d[0][0]*SC, YB + d[0][1]*SC], [ox + (d[0][0] + d[1][0])*SC, YB + (d[0][1] + d[1][1])*SC], [ox + d[1][0]*SC, YB + d[1][1]*SC]], {fill:d[2], alpha:0.3*al});
        c.globalAlpha = al; seg(ox, YB, ox + d[0][0]*SC, YB + d[0][1]*SC, C.sec, 1.6); seg(ox, YB, ox + d[1][0]*SC, YB + d[1][1]*SC, C.rise, 1.6);
        c.fillStyle = C.ink; c.beginPath(); c.arc(X(ox), Y(YB), 1.6, 0, 6.2832); c.fill();
        c.beginPath(); c.arc(X(ox - 0.04), Y(YB - 0.36), 7, 0, 6.2832); c.fillStyle = 'rgba(0,0,0,0.08)'; c.fill();
        c.font = '700 10px ' + F; c.fillStyle = C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + n, X(ox - 0.04), Y(YB - 0.36) + 0.5);
        c.globalAlpha = 1;
        L('D' + n, d[3] + (ox + 0.66 - d[3])*w, d[4] + (YB - 0.36 - d[4])*w, -50, d[5]*(1 - w), d[6]*(1 - w));
        if (n === 2){ /* «1.ª» y «2.ª» bajan con su figura */
          L('C1', V0[0]*0.72 + (ox + V0[0]*SC - V0[0]*0.72)*w, V0[1]*0.72 + (YB + V0[1]*SC - V0[1]*0.72)*w, -50, -14 + 12*w, -11 + 1*w);
          L('C2', U0[0]*0.72 + (ox + U0[0]*SC - U0[0]*0.72)*w, U0[1]*0.72 + (YB + U0[1]*SC - U0[1]*0.72)*w, -50, 14 - 1*w, 13 - 11*w); } }
      /* la pregunta queda; la respuesta se escribe bajo ella (no cabe al lado) */
      L('Q', -1.2, 4.75, 0); if (k === 6 && u > 0.5) L('F', -1.2, 4.28, 0);
      txt(TXT[k - 1][0], -1.2, -2.95); txt(TXT[k - 1][1], -1.2, -2.95 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(-0.68));
      dtQue(S, 'cómo cambia el determinante al', 'cambiar las columnas. Cada paso muestra una regla.');
      T.fin();
      oaReg(S, k, N, -1.2, -4.35, [0, 40, 80, 120, 160, 196]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['\\begin{vmatrix}2&1\\\\1&2\\end{vmatrix}=2\\cdot 2-1\\cdot 1=4-1=3', '\\text{intercambio: }\\begin{vmatrix}1&2\\\\2&1\\end{vmatrix}=1\\cdot 1-2\\cdot 2\\\\&\\qquad=1-4=-3=(-1)\\cdot 3', '\\text{la primera columna, por }2\\text{:}\\\\&\\qquad\\begin{vmatrix}2\\cdot 2&1\\\\2\\cdot 1&2\\end{vmatrix}=\\begin{vmatrix}4&1\\\\2&2\\end{vmatrix}\\\\&\\qquad=4\\cdot 2-1\\cdot 2=8-2=6=2\\cdot 3', '\\text{a la segunda columna se le suma la primera:}\\\\&\\qquad\\begin{vmatrix}2&1+2\\\\1&2+1\\end{vmatrix}=\\begin{vmatrix}2&3\\\\1&3\\end{vmatrix}\\\\&\\qquad=2\\cdot 3-3\\cdot 1=6-3=3', '\\text{la segunda columna, la mitad de la primera:}\\\\&\\qquad\\begin{vmatrix}2&\\frac12\\cdot 2\\\\1&\\frac12\\cdot 1\\end{vmatrix}=\\begin{vmatrix}2&1\\\\1&\\frac12\\end{vmatrix}\\\\&\\qquad=2\\cdot\\tfrac12-1\\cdot 1=1-1=0', '\\text{intercambio: }\\times(-1);\\qquad \\text{factor }k\\text{: }\\times k;\\\\&\\qquad\\text{sumar un múltiplo: igual};\\qquad \\text{proporcionales: }0']; return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: la primera columna por k, y a la segunda se le suma t veces la primera */
OA.scene('prop-vivo', (function(){
  var PZ = [['PU', 'k\\,\\vec u', 'k u', 'c-sec'], ['PV', '\\vec v+t\\,\\vec u', 'v + t u', 'diff']];
  return {
    world:{x0:-3.4, x1:6.2, y0:-2.9, y1:6.8}, aspect:9.7/9.6,
    aria:'Un paralelogramo formado por dos flechas que salen del origen. La azul es k veces u, con u igual a (2, 1). La naranja es v más t veces u, con v igual a (1, 2). Al mover t, la punta de la flecha naranja se corre por una recta paralela a u y el área no cambia. Al mover k, la flecha azul se alarga, se acorta o se invierte, y el área cambia en la misma proporción. Con k igual a cero el paralelogramo se aplasta; con k negativo es verde. Bajo el dibujo se calcula el determinante, que vale 3 por k para cualquier t.',
    labels:PZ,
    sliders:[{id:'k', tex:'k', min:-1, max:1.5, step:0.1, value:1}, {id:'t', tex:'t', min:-1, max:1, step:0.1, value:0}],
    legend:'<span><i class="sw sec"></i> \\(k\\,\\vec u\\)</span><span><i class="sw rise"></i> \\(\\vec v+t\\,\\vec u\\)</span><span><i class="sw tan"></i> determinante positivo</span><span><i class="sw alt"></i> determinante negativo</span>',
    anim:{run:22000, hold:4000, still:1, apply:function(p, v){ v.q = p; if (p < 0.5){ v.k = 1; v.t = -1 + 2*dtSuave(2*p); } else { v.t = 1; v.k = 1.5 - 2.5*dtSuave(2*p - 1); } }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = v.k == null ? 1 : +v.k, t = v.t == null ? 0 : +v.t, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', U = [2*k, k], V = [1 + 2*t, 2 + t], D = 3*k, col = D > 0 ? C.tan : C.alt, i, m;
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-3.2, 0, 6.0, 0, {color:C.ink, width:1}); S.line(0, -1.9, 0, 5.1, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = -3; i <= 5; i++) if (i){ c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num('' + i, X(i), Y(0) + 11, 'center'); }
      for (i = -1; i <= 4; i++) if (i){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      /* recta por la que se mueve la punta de v + t u: paralela a u */
      c.strokeStyle = C.rise; c.globalAlpha = 0.6; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(-3), Y(0)); c.lineTo(X(5), Y(4)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
      if (Math.abs(D) > 1e-9){ S.poly([[0, 0], U, [U[0] + V[0], U[1] + V[1]], V], {fill:col, alpha:0.32});
        c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(U[0]), Y(U[1])); c.lineTo(X(U[0] + V[0]), Y(U[1] + V[1])); c.lineTo(X(V[0]), Y(V[1])); c.stroke(); c.setLineDash([]); }
      dtFlecha(S, 0, 0, U[0], U[1], C.sec, 2); dtFlecha(S, 0, 0, V[0], V[1], C.rise, 2);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.4, 0, 6.2832); c.fill();
      if (Math.abs(k) > 0.15) T.L('PU', U[0], U[1], k > 0 ? 0 : -100, k > 0 ? 8 : -8, 12); T.L('PV', V[0], V[1], -50, 0, -13);
      m = Math.abs(D) < 0.05 ? ['Determinante cero: el paralelogramo se aplasta', C.ink] : (D > 0 ? ['Determinante positivo: giro antihorario', C.tan] : ['Determinante negativo: giro horario', C.alt]);
      c.font = '600 12.5px ' + F; c.fillStyle = m[1]; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(m[0], X(-3.3), Y(-2.5));
      c.font = '600 11px ' + F; c.fillStyle = C.rise; c.textAlign = 'right'; c.fillText('por esta recta se mueve la punta naranja', X(6.1), Y(4.75));
      dtQue(S, 'el área solo responde a k.', 'Mover t inclina la figura, pero no cambia su área.');
      T.fin();
    },
    caption:function(v){ var R = function(z){ return Math.round(z*100)/100; }, N = function(z){ return '\\(' + OA.num(R(z), 2) + '\\)'; }, M = function(t){ return '\\(' + t + '\\)'; }, n2 = function(z){ return OA.num(R(z), 2); }, k = R(v.k == null ? 1 : +v.k), t = R(v.t == null ? 0 : +v.t); return 'Con ' + M('k=' + n2(k)) + ' y ' + M('t=' + n2(t)) + ' el determinante vale ' + N(3*k) + ' y el paralelogramo mide ' + N(Math.abs(3*k)) + ' unidades cuadradas. Mover ' + M('t') + ' no cambia el área; mover ' + M('k') + ', sí'; },
    readout:function(v){ var k = Math.round((v.k == null ? 1 : +v.k)*100)/100, t = Math.round((v.t == null ? 0 : +v.t)*100)/100, D = Math.round(3*k*100)/100, n = OA.num, p = function(z){ return z < 0 ? '(' + n(z, 2) + ')' : n(z, 2); };
      return dtPasos(['k=' + n(k, 2) + ',\\qquad t=' + n(t, 2),
        '\\text{columnas: }k\\,\\vec u=(2k,\\ k),\\\\&\\qquad\\vec v+t\\,\\vec u=(1+2t,\\ 2+t)',
        '\\begin{vmatrix}2k&1+2t\\\\k&2+t\\end{vmatrix}=2k\\,(2+t)-(1+2t)\\,k',
        '\\text{primer producto: }2k\\,(2+t)=4k+2kt',
        '\\text{segundo producto: }(1+2t)\\,k=k+2kt',
        '\\text{resta: }4k+2kt-(k+2kt)=4k+2kt-k-2kt=3k',
        '\\text{determinante}=3k=3\\cdot ' + p(k) + '=' + n(D, 2) + '\\\\&\\qquad\\text{(no depende de }t\\text{)}',
        '\\text{área}=\\left|' + n(D, 2) + '\\right|=' + n(Math.abs(D), 2),
        '' + (Math.abs(D) < 0.005 ? '\\text{determinante }0:\\ \\text{el paralelogramo se aplasta}' : (D > 0 ? '\\text{signo }+:\\ \\text{giro antihorario}' : '\\text{signo }-:\\ \\text{giro horario}'))]); }
  };
})());
