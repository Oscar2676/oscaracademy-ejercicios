/* L28 H09 · sistemas por determinantes: con determinante cero, paralelas (sin solución) o la misma recta (infinitas) */
OA.scene('sis-idea', (function(){
  var N = 5;
  var PZ = [['LA', 'x+2y=4', 'x + 2y = 4', 'c-sec'], ['LB', '2x+4y=6', '2x + 4y = 6', 'c-alt'], ['LC', '2x+4y=8', '2x + 4y = 8', 'c-alt'],
    ['D0', '\\Delta=0', 'Δ = 0', ''], ['DX', '\\Delta_x=4\\neq 0', 'Δx = 4 ≠ 0', ''], ['DZ', '\\Delta_x=0,\\ \\Delta_y=0', 'Δx = 0, Δy = 0', ''],
    ['V1', '\\text{sin solución}', 'sin solución', 'diff'], ['V2', '\\text{infinitas soluciones}', 'infinitas soluciones', 'diff'],
    ['Q', '\\text{¿cuántas soluciones?}', '¿cuántas soluciones?', 'pt'], ['F', '\\Delta=0\\text{: ninguna o infinitas}', 'Δ = 0: ninguna o infinitas', 'diff'],
    ['R1', 'x+2y=4,\\qquad 2x+4y=6', 'x + 2y = 4, 2x + 4y = 6', ''],
    ['R2', '\\Delta=1\\cdot 4-2\\cdot 2=0', 'Δ = 1·4 − 2·2 = 0', ''],
    ['R3', '\\Delta_x=4\\cdot 4-2\\cdot 6=4\\neq 0\\text{: sin solución}', 'Δx = 4·4 − 2·6 = 4 ≠ 0: sin solución', ''],
    ['R4', '\\text{con }8\\text{: }\\Delta_x=4\\cdot 4-2\\cdot 8=0,\\ \\ \\Delta_y=0', 'con 8: Δx = 4·4 − 2·8 = 0, Δy = 0', ''],
    ['R5', '\\Delta=\\Delta_x=\\Delta_y=0\\text{: infinitas soluciones}', 'Δ = Δx = Δy = 0: infinitas soluciones', 'diff']];
  var TXT = [['Dos ecuaciones, dos rectas.', '¿Cuántas soluciones tiene el sistema?'],
    ['El determinante del sistema vale 0:', 'las rectas son paralelas o son la misma.'],
    ['El determinante de la x no es 0:', 'paralelas, y el sistema no tiene solución.'],
    ['Se cambia el 6 por 8: la recta verde sube.', 'Ahora los tres determinantes valen 0.'],
    ['La recta verde quedó sobre la azul:', 'todos sus puntos son solución. Son infinitas.']];
  var GX = -0.75, GY = 1.05, E = 0.5;
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.2, y1:4.4}, aspect:8.6/6.6,
    aria:'Animación en cinco pasos para el sistema x más 2y igual a 4, 2x más 4y igual a 6. Uno: se dibujan las dos rectas, la azul y la verde. Dos: el determinante del sistema, 1 por 4 menos 2 por 2, vale cero; las rectas son paralelas o son la misma. Tres: el determinante de x, 4 por 4 menos 2 por 6, vale 4, que no es cero: las rectas son paralelas y el sistema no tiene solución. Cuatro: el 6 de la segunda ecuación se cambia por 8; la recta verde sube hasta quedar sobre la azul, y ahora el determinante de x y el de y valen cero. Cinco: las dos ecuaciones describen la misma recta y hay infinitas soluciones. Conclusión: con determinante cero el sistema no tiene solución o tiene infinitas. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(x+2y=4\\)</span><span><i class="sw alt"></i> segunda ecuación</span><span><i class="sw rise"></i> conclusión</span>',
    anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, a, b, f;
      function mx(x){ return GX + E*x; } function my(y){ return GY + E*y; }
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      /* plano */
      S.line(mx(-0.4), my(0), mx(5.4), my(0), {color:C.ink, width:1}); S.line(mx(0), my(-0.4), mx(0), my(4.4), {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 5; i++){ c.beginPath(); c.moveTo(X(mx(i)), Y(my(0)) - 3); c.lineTo(X(mx(i)), Y(my(0)) + 3); if (i <= 4){ c.moveTo(X(mx(0)) - 3, Y(my(i))); c.lineTo(X(mx(0)) + 3, Y(my(i))); } c.stroke(); num('' + i, X(mx(i)), Y(my(0)) + 11, 'center'); if (i <= 4) num('' + i, X(mx(0)) - 7, Y(my(i)), 'right'); }
      /* las dos rectas se trazan en el paso 1; en el paso 4 la verde sube de 2x + 4y = 6 a 2x + 4y = 8 */
      a = k > 1 ? 1 : Math.min(1, 2*u); b = k > 1 ? 1 : Math.max(0, 2*u - 1);
      f = k < 4 ? 6 : (k === 4 ? 6 + 2*u : 8);
      if (a > 0) S.line(mx(0), my(2), mx(4*a), my(2 - 2*a), {color:C.sec, width:1.8});
      if (b > 0) S.line(mx(0), my(f/4), mx(f/2*b), my(f/4 - f/4*b), {color:C.alt, width:1.8, dash:f > 7.98 ? [5, 4] : null});
      if (a > 0.6) L('LA', mx(1.3), my(3.7), 0);
      if (b > 0.6){ if (k < 4 || (k === 4 && u < 0.5)) L('LB', mx(1.3), my(2.9), 0); else L('LC', mx(1.3), my(2.9), 0); }
      /* determinantes y conclusión, a la derecha */
      if (k > 2 || (k === 2 && u > 0.5)) L('D0', 2.75, 3.3, 0);
      if ((k === 3 && u > 0.4) || (k === 4 && u < 0.6)) L('DX', 2.75, 2.65, 0);
      if ((k === 4 && u >= 0.6) || k === 5) L('DZ', 2.75, 2.65, 0);
      if ((k === 3 && u > 0.7) || (k === 4 && u < 0.3)) L('V1', 2.75, 1.95, 0);
      if (k === 5 && u > 0.5) L('V2', 2.75, 1.95, 0);
      if (k < N || u < 0.5) L('Q', -1.2, 4.12, 0); else L('F', -1.2, 4.12, 0);
      txt(TXT[k - 1][0], -1.2, 0.3); txt(TXT[k - 1][1], -1.2, 0.3 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.12));
      T.fin();
      oaReg(S, k, N, -1.2, -1.25, [0, 30, 60, 90, 120]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['\\begin{cases}x+2y=4\\\\2x+4y=6\\end{cases}', '\\Delta=\\begin{vmatrix}1&2\\\\2&4\\end{vmatrix}=1\\cdot 4-2\\cdot 2=0', '\\Delta_x=\\begin{vmatrix}4&2\\\\6&4\\end{vmatrix}=4\\cdot 4-2\\cdot 6=4\\neq 0', '\\Delta_x=\\begin{vmatrix}4&2\\\\8&4\\end{vmatrix}=4\\cdot 4-2\\cdot 8=0,\\qquad \\Delta_y=\\begin{vmatrix}1&4\\\\2&8\\end{vmatrix}=1\\cdot 8-4\\cdot 2=0', '\\Delta=0,\\ \\Delta_x=0,\\ \\Delta_y=0\\text{: la misma recta, infinitas soluciones}'][k - 1]]]; }
  };
})());
/* número ↔ figura: x + 2y = 4, 2x + my = f; un punto, paralelas o la misma recta */
OA.scene('sis-vivo', (function(){
  var PZ = [['LA', 'x+2y=4', 'x + 2y = 4', 'c-sec'], ['LB', '2x+my=f', '2x + my = f', 'c-alt'], ['P', '\\left(\\tfrac{\\Delta_x}{\\Delta},\\tfrac{\\Delta_y}{\\Delta}\\right)', '(Δx/Δ, Δy/Δ)', 'diff']];
  function caso(m, f){ return Math.abs(m - 4) >= 0.02 ? 1 : (Math.abs(f - 8) >= 0.02 ? 2 : 3); }
  return {
    world:{x0:-3.4, x1:7.2, y0:-2.4, y1:7.4}, aspect:9.8/10.6,
    aria:'Un plano con dos rectas. La azul, fija, es x más 2y igual a 4. La verde es 2x más m por y igual a f: m cambia su inclinación y f la desplaza. Con m igual a 6 y f igual a 10 se cortan en el punto (2, 1), marcado en naranja. Al acercarse m a 4, el determinante m menos 4 se acerca a cero y el punto de corte se aleja hasta salir del dibujo. Con m igual a 4 las rectas son paralelas y el sistema no tiene solución, salvo cuando f es 8: entonces la verde queda sobre la azul y hay infinitas soluciones.',
    labels:PZ,
    sliders:[{id:'m', tex:'m', min:4, max:6, step:0.1, value:6}, {id:'f', tex:'f', min:6, max:10, step:0.5, value:10}],
    legend:'<span><i class="sw sec"></i> \\(x+2y=4\\)</span><span><i class="sw alt"></i> \\(2x+my=f\\)</span><span><i class="sw rise"></i> punto de corte</span>',
    anim:{run:24000, hold:5000, still:1, apply:function(p, v){ v.q = p; if (p < 0.5){ v.m = 6 - 2*dtSuave(2*p); v.f = 10; } else { v.m = 4; v.f = 10 - 2*dtSuave(2*p - 1); } }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var m = v.m == null ? 6 : +v.m, f = v.f == null ? 10 : +v.f, D = m - 4, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, px, py, cs = caso(m, f), dentro = false, msg;
      function num(tx, px_, py_, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px_, py_); }
      S.line(-3.2, 0, 7, 0, {color:C.ink, width:1}); S.line(0, -1, 0, 7.2, {color:C.ink, width:1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = -3; i <= 6; i++){ if (!i) continue; c.beginPath(); c.moveTo(X(i), Y(0) - 3); c.lineTo(X(i), Y(0) + 3); c.stroke(); num(i < 0 ? '−' + (-i) : '' + i, X(i), Y(0) + 11, 'center'); }
      for (i = 1; i <= 7; i++){ c.beginPath(); c.moveTo(X(0) - 3, Y(i)); c.lineTo(X(0) + 3, Y(i)); c.stroke(); num('' + i, X(0) - 7, Y(i), 'right'); }
      c.save(); c.beginPath(); c.rect(X(-3.2), Y(7.2), X(7) - X(-3.2), Y(-1) - Y(7.2)); c.clip();
      S.line(-4, 4, 8, -2, {color:C.sec, width:1.8});
      S.line(-4, (f + 8)/m, 8, (f - 16)/m, {color:C.alt, width:1.8, dash:cs === 3 ? [5, 4] : null});
      c.restore();
      if (cs === 1){ px = (4*m - 2*f)/D; py = (f - 8)/D; dentro = px > -3.1 && px < 6.9 && py > -0.9 && py < 7.1;
        if (dentro){ c.fillStyle = C.rise; c.beginPath(); c.arc(X(px), Y(py), 3.6, 0, 6.2832); c.fill(); T.L('P', px, py, 0, 9, -14); } }
      T.L('LA', 3.3, 6.7, 0); T.L('LB', 3.3, 5.9, 0);
      msg = cs === 3 ? 'La misma recta: infinitas soluciones' : (cs === 2 ? 'Rectas paralelas: el sistema no tiene solución' : (dentro ? 'Un solo punto de corte: solución única' : 'El punto de corte ya salió del dibujo'));
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(msg, X(-3.2), Y(-1.8));
      T.fin();
    },
    caption:function(v){ var m = v.m == null ? 6 : +v.m, f = v.f == null ? 10 : +v.f, D = m - 4, cs = caso(m, f), n = function(z){ return oaDec(z, 2); };
      return cs === 3 ? 'Con m = 4 y f = 8 los tres determinantes valen 0: las dos ecuaciones describen la misma recta y hay infinitas soluciones' : (cs === 2 ? 'Con m = 4 el determinante del sistema vale 0 y el de la y vale ' + n(f - 8) + ': rectas paralelas, sin solución' : 'Con m = ' + n(m) + ' y f = ' + n(f) + ' el determinante del sistema vale ' + n(D) + ' y las rectas se cortan en (' + n((4*m - 2*f)/D) + '; ' + n((f - 8)/D) + ')'); },
    readout:function(v){ var m = v.m == null ? 6 : +v.m, f = v.f == null ? 10 : +v.f, D = m - 4, cs = caso(m, f), n = OA.num, r;
      r = [['', '\\Delta=\\begin{vmatrix}1&2\\\\2&m\\end{vmatrix}=m-4,\\qquad \\Delta_x=\\begin{vmatrix}4&2\\\\f&m\\end{vmatrix}=4m-2f'], ['', '\\Delta_y=\\begin{vmatrix}1&4\\\\2&f\\end{vmatrix}=1\\cdot f-4\\cdot 2=f-8'],
        ['d', '\\Delta=' + n(D, 2) + ',\\qquad \\Delta_x=' + n(4*m - 2*f, 2) + ',\\qquad \\Delta_y=' + n(f - 8, 2)]];
      if (cs === 1) r.push(['', 'x=\\dfrac{4m-2f}{m-4}=' + n((4*m - 2*f)/D, 2) + ',\\qquad y=\\dfrac{f-8}{m-4}=' + n((f - 8)/D, 2)]);
      else if (cs === 2) r.push(['', '\\Delta=0,\\ \\Delta_y\\neq 0\\text{: sin solución (rectas paralelas)}']);
      else r.push(['', '\\Delta=\\Delta_x=\\Delta_y=0\\text{: infinitas soluciones (la misma recta)}']);
      return r; }
  };
})());
