/* L25 H07 · sucesiones aritméticas: de un término al siguiente se suma siempre lo mismo; los puntos quedan sobre una recta */
OA.scene('arit-idea', (function(){
  var N = 5, A = [2, 5, 8, 11];
  var PZ = [['P1', 'a_{1}', 'a₁', 'c-sec'], ['P2', 'a_{2}', 'a₂', 'c-sec'], ['P3', 'a_{3}', 'a₃', 'c-sec'], ['P4', 'a_{4}', 'a₄', 'c-sec'],
    ['D2', '+3', '+3', 'diff'], ['D3', '+3', '+3', 'diff'], ['D4', '+3', '+3', 'diff'],
    ['Q', '2,\\ 5,\\ 8,\\ 11,\\ \\ldots\\qquad a_{n}=\\ ?', '2, 5, 8, 11, …   aₙ = ?', 'pt'], ['F', '\\Longrightarrow\\ a_{n}=2+3(n-1)', '⟹ aₙ = 2 + 3(n − 1)', 'diff'], ['RT', 'y=3x-1', 'y = 3x − 1', 'c-tan'],
    ['R1', 'a_{1}=2', 'a₁ = 2', ''],
    ['R2', 'a_{2}=a_{1}+3=2+3=5', 'a₂ = a₁ + 3 = 2 + 3 = 5', ''],
    ['R3', 'a_{3}=a_{2}+3=5+3=8', 'a₃ = a₂ + 3 = 5 + 3 = 8', ''],
    ['R4', 'a_{4}=a_{3}+3=8+3=11', 'a₄ = a₃ + 3 = 8 + 3 = 11', ''],
    ['R5', 'a_{n+1}=a_{n}+3\\quad\\Longrightarrow\\quad a_{n}=2+3(n-1)', 'aₙ₊₁ = aₙ + 3, de donde aₙ = 2 + 3(n − 1)', 'diff']];
  var TXT = [['El primer término vale 2.', 'Su valor queda marcado en el eje vertical.'],
    ['Para pasar al término siguiente se suma 3.', 'El segundo término vale 5.'],
    ['Otra vez se suma 3.', 'El tercer término vale 8.'],
    ['Y otra vez 3. El cuarto término vale 11.', 'El paso es siempre el mismo.'],
    ['Los puntos quedan sobre una misma recta:', 'a pasos iguales, subidas iguales.']];
  function gx(n){ return -0.3 + 0.9*n; } function gy(a){ return 1.25 + 0.19*a; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:6.3}, aspect:10.9/6.6,
    aria:'Animación en cinco pasos con la sucesión 2, 5, 8, 11, dibujada como puntos sueltos: en el eje horizontal la posición n y en el vertical el valor del término. Uno: aparece el primer punto, de valor 2, con una línea punteada hasta el eje vertical. Dos: desde ese punto se avanza una posición y se sube 3, con una flecha naranja rotulada más 3; el segundo término vale 5. Tres y cuatro: lo mismo, y se llega a 8 y a 11. Cada punto queda unido por una punteada con su valor en el eje vertical. Cinco: una recta pasa por los cuatro puntos y, bajo la pregunta, que sigue a la vista, se escribe el término general, a sub n igual a 2 más 3 por n menos 1. Nada de lo que aparece se borra. Arriba, una franja dice qué muestra la animación. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos</span><span><i class="sw rise"></i> la diferencia: lo que se suma cada vez</span><span><i class="sw tan"></i> la recta que pasa por los puntos</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, h1, h2, h3, m = Math.min(k, 4);
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al, col, b){ c.font = (b ? '700 11.5px ' : '500 10.5px ') + F; c.fillStyle = col || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function punt(x0, y0, x1, y1, col, a){ c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      S.line(gx(0), gy(0), gx(5.1), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(14.6), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= 5; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      num('n', X(gx(5.1)) + 6, Y(gy(0)), 'left'); num('aₙ', X(gx(0)) + 6, Y(gy(14.6)) - 2, 'left');
      /* paso 5: la recta por los puntos se traza de izquierda a derecha */
      if (k === 5){ S.line(gx(0.5), gy(0.5), gx(0.5 + 4.1*u), gy(0.5 + 12.3*u), {color:C.tan, width:1.3}); if (u > 0.8) L('RT', gx(4.6), gy(12.2), 0, 4, 8); }
      for (i = 1; i <= m; i++){ w = i < k ? 1 : u; /* avance del término i dentro de su paso */
        if (i === 1){ h1 = 0; h2 = 0; h3 = w; } else { h1 = Math.min(1, w/0.35); h2 = Math.max(0, Math.min(1, (w - 0.35)/0.4)); h3 = Math.max(0, Math.min(1, (w - 0.75)/0.25)); }
        if (i > 1){ punt(gx(i - 1), gy(A[i - 2]), gx(i - 1) + 0.9*h1, gy(A[i - 2]), C.rise, 0.8);
          if (h2 > 0){ dtFlecha(S, gx(i), gy(A[i - 2]), gx(i), gy(A[i - 2] + 3*h2) - (h2 >= 1 ? 4/s : 0), C.rise, 1.6); if (h2 > 0.5) L('D' + i, gx(i), gy(A[i - 2] + 1.3), 0, 6, 0); } }
        if (h3 > 0){ punt(gx(i), gy(A[i - 1]), gx(i) - 0.9*i*h3, gy(A[i - 1]), i === k ? C.rise : C.sec, i === k ? 1 : 0.5);
          c.beginPath(); c.arc(X(gx(i)), Y(gy(A[i - 1])), 3.6*Math.min(1, h3*2), 0, 6.2832); c.fillStyle = C.sec; c.fill();
          if (h3 >= 1){ c.beginPath(); c.arc(X(gx(0)), Y(gy(A[i - 1])), 2.3, 0, 6.2832); c.fillStyle = i === k ? C.rise : C.sec; c.fill(); num('' + A[i - 1], X(gx(0)) - 7, Y(gy(A[i - 1])), 'right', i === k ? C.rise : C.sec, 1); }
          if (h3 > 0.5) L('P' + i, gx(i), gy(A[i - 1]), -100, -6, -10); } }
      L('Q', -1.2, 5.05, 0); if (k === N && u > 0.5) L('F', -1.2, 4.6, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.05));
      dtQue(S, 'de un término al siguiente', 'se suma siempre lo mismo: aquí, 3.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 34, 62, 90, 118]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos: }2,\\ 5,\\ 8,\\ 11,\\ \\ldots' + Q + '\\text{primer término: }a_{1}=2',
      '\\text{resta: }a_{2}-a_{1}=5-2=3' + Q + 'a_{2}=a_{1}+3=2+3=5',
      '\\text{resta: }a_{3}-a_{2}=8-5=3' + Q + 'a_{3}=a_{2}+3=5+3=8',
      '\\text{resta: }a_{4}-a_{3}=11-8=3' + Q + 'a_{4}=a_{3}+3=8+3=11',
      '\\text{Las tres restas dan }3:\\ d=3,\\quad a_{n+1}=a_{n}+3' + Q + 'a_{n}=a_{1}+(n-1)\\,d=2+3(n-1)' + Q + '\\text{con }n=4:\\ 2+3\\cdot(4-1)=2+3\\cdot 3=2+9=11' + Q + '\\text{Se suma siempre }3:\\text{ sucesión aritmética.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
