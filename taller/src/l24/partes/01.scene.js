/* L24 H01 · cuadrado de un binomio: un cuadrado de lado a + b cortado en cuatro piezas, por pasos, con a = 3 y b = 2 */
OA.scene('bn-cuadrado', (function(){
  var N = 7, a = 3, b = 2, W = a + b;
  var PZ = [['Q', '(a+b)^{2}=\\ ?', '(a + b)² = ?', 'pt'], ['F', '\\Longrightarrow\\ (a+b)^{2}=a^{2}+2ab+b^{2}', '⟹ (a + b)² = a² + 2ab + b²', 'diff'],
    ['Ca1', 'a=3', 'a = 3', 'c-sec'], ['Cb1', 'b=2', 'b = 2', 'c-tan'], ['Ca2', 'a=3', 'a = 3', 'c-sec'], ['Cb2', 'b=2', 'b = 2', 'c-tan'],
    ['CT', '\\text{lado}=a+b=3+2=5', 'lado = a + b = 3 + 2 = 5', ''], ['CR', 'a+b', 'a + b', ''],
    ['AT', '\\text{área del cuadrado grande}=(a+b)^{2}', 'área del cuadrado grande = (a + b)²', ''],
    ['A1', 'a\\cdot a=a^{2}', 'a · a = a²', 'c-sec'], ['A2', '3\\cdot 3=9', '3 · 3 = 9', 'c-sec'],
    ['O1', 'a\\cdot b', 'a · b', 'diff'], ['O2', '3\\cdot 2=6', '3 · 2 = 6', 'diff'],
    ['P1', 'a\\cdot b', 'a · b', 'diff'], ['P2', '3\\cdot 2=6', '3 · 2 = 6', 'diff'],
    ['B1', 'b\\cdot b=b^{2}', 'b · b = b²', 'c-tan'], ['B2', '2\\cdot 2=4', '2 · 2 = 4', 'c-tan'],
    ['R1', '\\text{lado}=a+b=3+2=5', 'lado = a + b = 3 + 2 = 5', ''],
    ['R2', '\\text{área}=(a+b)\\cdot(a+b)=(a+b)^{2}', 'área = (a + b)·(a + b) = (a + b)²', ''],
    ['R3', '\\text{dos cortes: quedan cuatro piezas}', 'dos cortes: quedan cuatro piezas', ''],
    ['R4', '\\text{cuadrado azul: }a\\cdot a=a^{2}=3\\cdot 3=9', 'cuadrado azul: a · a = a² = 3 · 3 = 9', 'c-sec'],
    ['R5', '\\text{cada rectángulo: }a\\cdot b=3\\cdot 2=6\\ \\text{(son dos)}', 'cada rectángulo: a · b = 3 · 2 = 6 (son dos)', 'diff'],
    ['R6', '\\text{cuadrado burdeo: }b\\cdot b=b^{2}=2\\cdot 2=4', 'cuadrado burdeo: b · b = b² = 2 · 2 = 4', 'c-tan'],
    ['R7', '(a+b)^{2}=a^{2}+2ab+b^{2}\\quad(25=9+12+4)', '(a + b)² = a² + 2ab + b²  (25 = 9 + 12 + 4)', 'diff']];
  var TXT = [['Dos tramos, uno tras otro: el azul y el burdeo.', 'Juntos forman el lado del cuadrado.'],
    ['Con ese lado se arma un cuadrado grande.', 'Su área es lado por lado.'],
    ['Dos cortes, donde termina el tramo azul.', 'El cuadrado grande queda en cuatro piezas.'],
    ['Pieza 1: el cuadrado azul.', 'Su área es su lado por su lado.'],
    ['Piezas 2 y 3: dos rectángulos naranjas iguales.', 'Área de cada uno: ancho por alto.'],
    ['Pieza 4: el cuadrado burdeo.', 'Su área es su lado por su lado.'],
    ['El área grande es la suma de las cuatro piezas.', 'Los dos rectángulos dan el doble producto.']];
  return {
    world:{x0:-1.2, x1:6.4, y0:-7.3, y1:7.7}, aspect:15/7.6,
    aria:'Animación en siete pasos, con a igual a 3 y b igual a 2. Uno: dos tramos seguidos, uno azul de largo a y uno burdeo de largo b, forman un lado de largo a más b, igual a 5. Dos: con ese lado se arma un cuadrado grande; su área es a más b, al cuadrado. Tres: dos cortes, uno vertical y uno horizontal, donde termina el tramo a, dejan cuatro piezas. Cuatro: el cuadrado azul, de lado a, tiene área a por a, 9. Cinco: los dos rectángulos naranjas, de lados a y b, tienen área a por b, 6 cada uno. Seis: el cuadrado burdeo, de lado b, tiene área b por b, 4. Siete: el área grande es la suma de las cuatro piezas: a al cuadrado, más dos veces a por b, más b al cuadrado; con números, 9 más 12 más 4, igual a 25. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> tramo \\(a\\) y cuadrado de lado \\(a\\)</span><span><i class="sw rise"></i> rectángulos de lados \\(a\\) y \\(b\\)</span><span><i class="sw tan"></i> tramo \\(b\\) y cuadrado de lado \\(b\\)</span>',
    anim:{run:35000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', g, al, px = 1/(X(1) - X(0));
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; lo que apareció no se borra */
      function seg(x0, y0, x1, y1, col, w, dash){ c.strokeStyle = col; c.lineWidth = w; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); c.setLineDash([]); }
      function cota(x0, y0, x1, y1, col){ var h = Math.abs(y1 - y0) < 1e-9; c.strokeStyle = col; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1));
        if (h){ c.moveTo(X(x0), Y(y0) - 3); c.lineTo(X(x0), Y(y0) + 3); c.moveTo(X(x1), Y(y1) - 3); c.lineTo(X(x1), Y(y1) + 3); } else { c.moveTo(X(x0) - 3, Y(y0)); c.lineTo(X(x0) + 3, Y(y0)); c.moveTo(X(x1) - 3, Y(y1)); c.lineTo(X(x1) + 3, Y(y1)); } c.stroke(); }
      function caja(x, y, w, h, col, t){ if (t <= 0) return; S.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], {fill:col, alpha:0.42*t}); c.globalAlpha = t; c.strokeStyle = col; c.lineWidth = 1.2; c.strokeRect(X(x), Y(y + h), X(x + w) - X(x), Y(y) - Y(y + h)); c.globalAlpha = 1; }
      function frase(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function chico(t, x, y, al2){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al2; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* paso 2: el cuadrado grande, con un fondo tenue */
      al = ap(2);
      if (al > 0) S.poly([[0, 0], [W, 0], [W, W], [0, W]], {fill:C.muted || '#6b6b6b', alpha:0.1*al});
      /* pasos 4, 5 y 6: las cuatro piezas */
      caja(0, 0, a, a, C.sec, ap(4)); caja(a, 0, b, a, C.rise, ap(5)); caja(0, a, a, b, C.rise, ap(5)); caja(a, a, b, b, C.tan, ap(6));
      /* paso 2: los otros dos lados del cuadrado grande, trazados de a poco */
      if (al > 0){ g = al*2*W; c.strokeStyle = C.ink; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(0), Y(W)); c.lineTo(X(Math.min(W, g)), Y(W)); if (g > W) c.lineTo(X(W), Y(W - (g - W))); c.stroke(); }
      /* paso 3: los dos cortes */
      al = ap(3);
      if (al > 0){ seg(a, 0, a, W*al, C.ink, 1.3, [5, 4]); seg(0, a, W*al, a, C.ink, 1.3, [5, 4]); if (al > 0.6){ chico('corte', a - 3*px, W - 0.22, 'right'); chico('corte', W - 3*px, a + 0.2, 'right'); } }
      /* paso 1: los dos tramos, abajo y a la izquierda */
      g = W*(k === 1 ? u : 1);
      seg(0, 0, Math.min(a, g), 0, C.sec, 2.6); if (g > a) seg(a, 0, g, 0, C.tan, 2.6);
      seg(0, 0, 0, Math.min(a, g), C.sec, 2.6); if (g > a) seg(0, a, 0, g, C.tan, 2.6);
      c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.2, 0, 6.2832); c.fill();
      if (g > a){ c.beginPath(); c.arc(X(a), Y(0), 2.2, 0, 6.2832); c.fill(); c.beginPath(); c.arc(X(0), Y(a), 2.2, 0, 6.2832); c.fill(); }
      if (k > 1 || u > 0.6){ cota(0, -0.28, a, -0.28, C.sec); cota(a, -0.28, W, -0.28, C.tan); cota(-0.28, 0, -0.28, a, C.sec); cota(-0.28, a, -0.28, W, C.tan);
        L('Ca1', a/2, -0.28, -50, 0, 12); L('Cb1', a + b/2, -0.28, -50, 0, 12); L('Ca2', -0.28, a/2, -100, -7, 0); L('Cb2', -0.28, a + b/2, -100, -7, 0); }
      /* paso 2: cotas del lado completo y rótulo del área */
      if (ap(2) > 0.6){ cota(0, W + 0.28, W, W + 0.28, C.ink); cota(W + 0.28, 0, W + 0.28, W, C.ink); L('CT', W/2, W + 0.28, -50, 0, -12); L('CR', W + 0.28, W/2, 0, 7, 0); L('AT', W/2, -1.15); }
      /* rótulos de las piezas: el producto con letras y, debajo, con números */
      if (ap(4) > 0.5){ L('A1', a/2, a/2 + 0.25); L('A2', a/2, a/2 - 0.25); }
      if (ap(5) > 0.5){ L('O1', a/2, a + b/2 + 0.25); L('O2', a/2, a + b/2 - 0.25); L('P1', a + b/2, a/2 + 0.25); L('P2', a + b/2, a/2 - 0.25); }
      if (ap(6) > 0.5){ L('B1', a + b/2, a + b/2 + 0.25); L('B2', a + b/2, a + b/2 - 0.25); }
      /* paso 7: un marco burdeo rodea las cuatro piezas juntas */
      al = ap(7);
      if (al > 0){ c.globalAlpha = al; c.strokeStyle = C.tan; c.lineWidth = 1.8; c.strokeRect(X(0) - 5, Y(W) - 5, X(W) - X(0) + 10, Y(0) - Y(W) + 10); c.globalAlpha = 1; }
      /* pregunta arriba; al final, a su lado, la respuesta */
      L('Q', -1.1, 6.2, 0); if (k === N && u > 0.5) L('F', 0.95, 6.2, 0);
      frase(TXT[k - 1][0], -1.1, -1.8); frase(TXT[k - 1][1], -1.1, -1.8 - 21*px);
      dtQue(S, 'el cuadrado de un binomio es un área:', 'un cuadrado grande cortado en cuatro piezas.');
      T.fin();
      oaReg(S, k, N, -1.1, -3.45, [0, 25, 50, 75, 100, 125, 150]);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(6.3), Y(-3.45) - 26);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = ['\\text{datos: }a=3,\\quad b=2\\\\&\\qquad \\text{lado del cuadrado grande: }a+b=3+2=5',
      '\\text{fórmula del área de un cuadrado: lado}\\cdot\\text{lado}\\\\&\\qquad \\text{área grande}=(a+b)\\cdot(a+b)=(a+b)^{2}',
      '\\text{dos cortes donde termina }a\\text{: quedan cuatro piezas}',
      '\\text{cuadrado azul: }a\\cdot a=a^{2}=3\\cdot 3=9',
      '\\text{cada rectángulo naranja: }a\\cdot b=3\\cdot 2=6\\\\&\\qquad \\text{son dos: }ab+ab=2ab=2\\cdot 6=12',
      '\\text{cuadrado burdeo: }b\\cdot b=b^{2}=2\\cdot 2=4',
      '\\text{área grande}=\\text{suma de las cuatro piezas}\\\\&\\qquad (a+b)^{2}=a^{2}+ab+ab+b^{2}\\\\&\\qquad (a+b)^{2}=a^{2}+2ab+b^{2}\\\\&\\qquad \\text{con números: }9+12+4\\\\&\\qquad 9+12=21,\\quad 21+4=25\\\\&\\qquad \\text{comprobación: }(3+2)^{2}=5^{2}=5\\cdot 5=25\\ \\checkmark\\\\&\\qquad \\text{no es }a^{2}+b^{2}=9+4=13\\text{: faltarían los dos rectángulos}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
