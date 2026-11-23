/* L29 H02 · introducción al límite: la velocidad media del carrito (s = t²) en intervalos cada vez más cortos alrededor de t = 1 se acerca a 2 (por pasos) */
OA.scene('vel-idea', (function(){
  var N = 7, Q = '\\\\&\\qquad ';
  function s(t){ return t*t; }
  /* cada recta une (1, 1) con (1 + h, (1 + h)²); su pendiente es 2 + h: [h, paso en que aparece, corrimiento vertical del rótulo en píxeles] */
  var SEC = [[1, 2, 0], [0.5, 3, 0], [0.1, 4, -10], [-0.5, 5, 0], [-0.1, 5, 10]];
  var M = lmMarco(-0.75, 0.35, 4.9, 4.0, -0.3, 2.3, -0.5, 4.5);
  var PZ = [['Q', 'v(1)=\\lim_{h\\to 0}\\tfrac{(1+h)^{2}-1}{h}=\\ ?', 'v(1) = lím ((1 + h)² − 1)/h = ?', 'pt'], ['F', '\\Longrightarrow\\ 2\\ \\text{m/s}', '⟹ 2 m/s', 'diff'],
    ['EX', 't', 't', ''], ['EY', 's', 's', ''],
    ['CF', 's=t^{2}', 's = t²', 'c-tan'], ['AL', 'v_{m}=2+h\\ \\ (h\\ne 0)', 'v_m = 2 + h (h ≠ 0)', 'c-alt'],
    ['R1', 's(t)=t^{2}\\ \\text{m};\\quad s(1)=1\\ \\text{m}', 's(t) = t² m; s(1) = 1 m', ''],
    ['R2', 'h=1:\\ \\ \\tfrac{4-1}{1}=\\tfrac{3}{1}=3\\ \\text{m/s}', 'h = 1: (4 − 1)/1 = 3 m/s', 'diff'],
    ['R3', 'h=0{,}5:\\ \\ \\tfrac{2{,}25-1}{0{,}5}=\\tfrac{1{,}25}{0{,}5}=2{,}5\\ \\text{m/s}', 'h = 0,5: (2,25 − 1)/0,5 = 2,5 m/s', 'diff'],
    ['R4', 'h=0{,}1:\\ \\ \\tfrac{1{,}21-1}{0{,}1}=\\tfrac{0{,}21}{0{,}1}=2{,}1\\ \\text{m/s}', 'h = 0,1: (1,21 − 1)/0,1 = 2,1 m/s', 'diff'],
    ['R5', 'h=-0{,}5:\\ 1{,}5\\ \\text{m/s};\\quad h=-0{,}1:\\ 1{,}9\\ \\text{m/s}', 'h = −0,5: 1,5 m/s; h = −0,1: 1,9 m/s', 'c-sec'],
    ['R6', 'h\\ne 0:\\ \\ \\tfrac{(1+h)^{2}-1}{h}=\\tfrac{h(2+h)}{h}=2+h', 'h ≠ 0: ((1 + h)² − 1)/h = 2 + h', 'c-alt'],
    ['R7', '\\lim_{h\\to 0}\\tfrac{(1+h)^{2}-1}{h}=2\\ \\text{m/s}', 'lím ((1 + h)² − 1)/h = 2 m/s', 'diff']];
  var TXT = [['El carrito lleva t² metros a los t segundos.', '¿Qué velocidad lleva justo en t = 1?'],
    ['Entre t = 1 y t = 2 recorre 3 metros en 1 segundo:', 'velocidad media, 3 metros por segundo.'],
    ['Intervalo más corto, de t = 1 a t = 1,5:', 'la velocidad media baja a 2,5 metros por segundo.'],
    ['Más corto todavía, de t = 1 a t = 1,1:', 'la velocidad media es 2,1 metros por segundo.'],
    ['Intervalos que terminan en t = 1 (h negativo):', 'dan 1,5 y 1,9 metros por segundo. Suben hacia 2.'],
    ['Con h = 0 no hay intervalo: no se divide por 0.', 'Pero si h no es 0, la velocidad media es 2 + h.'],
    ['El límite es 2 metros por segundo: la inclinación', 'de la recta verde, a la que se pegan las demás.']];
  /* recta por (1, 1) de pendiente m, recortada al marco; devuelve el extremo derecho [t, s] */
  function recta(S, m, a, col, w){ var te = Math.min(2.3, 1 + 3.5/m), t0 = Math.max(-0.3, 1 - 1.5/m); lmCurva(S, M, function(t){ return 1 + m*(t - 1); }, 1 - (1 - t0)*a, 1 + (te - 1)*a, col, w); return [te, 1 + m*(te - 1)]; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-6.2, y1:6.3}, aspect:12.5/6.6,
    aria:'Arriba, una franja dice qué muestra: la velocidad media en intervalos cada vez más cortos se acerca a un número, el límite. Animación en siete pasos sobre la gráfica de la distancia s igual a t al cuadrado. Uno: la curva y el punto del instante t igual a 1. Dos: la recta que une ese punto con el de t igual a 2; velocidad media 3 metros por segundo. Tres: con t igual a 1,5, velocidad media 2,5. Cuatro: con t igual a 1,1, velocidad media 2,1. Cinco: con intervalos anteriores a 1, desde t igual a 0,5 y desde t igual a 0,9, velocidades medias 1,5 y 1,9. Seis: si h no es 0, la velocidad media vale 2 más h. Siete: el límite es 2 metros por segundo, la inclinación de la recta verde. Bajo la figura, un registro numerado guarda la cuenta de cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> distancia \\(s=t^{2}\\)</span><span><i class="sw rise"></i> velocidad media con \\(h\\gt 0\\)</span><span><i class="sw sec"></i> velocidad media con \\(h\\lt 0\\)</span><span><i class="sw alt"></i> recta de inclinación 2 (el límite)</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), a, e;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; nada se borra después */
      dtQue(S, 'la velocidad media en intervalos cada vez', 'más cortos se acerca a un número: el límite.');
      lmEjes(S, M); lmEtq(T, M, 'EX', 2.3, 0, -50, -2, -11); lmEtq(T, M, 'EY', 0, 4.5, 0, 8, 5);
      /* paso 1: la curva y el instante t = 1 */
      a = ap(1);
      lmCurva(S, M, s, 0, 2.1*a, C.tan, 2);
      if (a > 0.3){ lmFondo(S, M, 'CF', 1.72, 3.3, -100, -6, 0); lmEtq(T, M, 'CF', 1.72, 3.3, -100, -6, 0); }
      if (a > 0.5) lmGuia(S, M, 1, 1, C.tan);
      /* pasos 2 a 5: las rectas de las velocidades medias; cada una con su valor a la derecha */
      SEC.forEach(function(q){ var h = q[0], m = 2 + h, col = h > 0 ? C.rise : C.sec, al = ap(q[1]);
        if (al <= 0) return;
        e = recta(S, m, al, col, 1.2);
        lmPunto(S, M, 1 + h, s(1 + h), col, false, 2.8);
        if (al > 0.6) lmNum(S, M, lmT(m, 1) + (h === 1 ? ' m/s' : ''), e[0], e[1], e[1] > 4.49 ? 0 : 5, (e[1] > 4.49 ? -8 : 0) + q[2], col, e[1] > 4.49 ? 'center' : 'left'); });
      /* paso 2: tiempo transcurrido (1 s) y distancia recorrida (3 m) */
      a = ap(2);
      if (a > 0){ lmSeg(S, M, 1, 1, 1 + a, 1, C.rise, 1); lmSeg(S, M, 2, 1, 2, 1 + 3*a, C.rise, 1);
        if (a > 0.6){ lmNum(S, M, '1 s', 1.5, 1, 0, 9, C.rise); lmNum(S, M, '3 m', 2, 1.7, 5, 0, C.rise, 'left'); } }
      /* paso 6: la forma simplificada */
      a = ap(6);
      if (a > 0.3){ lmFondo(S, M, 'AL', 0.1, 3.45, 0); lmEtq(T, M, 'AL', 0.1, 3.45, 0); }
      /* paso 7: la recta de inclinación 2 */
      a = ap(7);
      if (a > 0){ c.globalAlpha = 0.9; e = recta(S, 2, a, C.alt, 2.6); c.globalAlpha = 1;
        if (a > 0.6) lmNum(S, M, '2 m/s', e[0], e[1], 5, 0, C.alt, 'left'); }
      /* el punto del instante t = 1 va encima de todo */
      if (ap(1) > 0.5) lmPunto(S, M, 1, 1, C.tan, false, 3.6);
      if (k === 6 || (k === 7 && u < 1)){ c.strokeStyle = C.alt; c.lineWidth = 1.4; c.beginPath(); c.arc(X(M.gx(1)), Y(M.gy(1)), 8, 0, 6.2832); c.stroke(); }
      /* pregunta arriba; al final, a su lado, la respuesta */
      T.L('Q', -1.2, 4.86, 0); if (k === N && u > 0.5) T.L('F', 5.2, 4.86, -100);
      lmTxt(S, TXT[k - 1][0], -1.2, -0.2); lmTxt(S, TXT[k - 1][1], -1.2, -0.2 - 21/(X(1) - X(0)));
      c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(0.36));
      T.fin();
      oaReg(S, k, N, -1.2, -1.75, [0, 34, 68, 102, 136, 170, 204]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      's(t)=t^{2}\\ \\ \\text{(metros a los }t\\text{ segundos)}' + Q + 's(1)=1^{2}=1\\ \\text{m}' + Q + 'v_{m}=\\dfrac{\\text{distancia}}{\\text{tiempo}}=\\dfrac{s(1+h)-s(1)}{h}',
      'h=1:\\ \\text{de }t=1\\text{ a }t=2' + Q + 's(2)=2^{2}=4;\\quad 4-1=3\\ \\text{m en }1\\ \\text{s}' + Q + 'v_{m}=\\tfrac{3}{1}=3\\ \\text{m/s}',
      'h=0{,}5:\\ \\text{de }t=1\\text{ a }t=1{,}5' + Q + 's(1{,}5)=1{,}5^{2}=2{,}25;\\quad 2{,}25-1=1{,}25\\ \\text{m}' + Q + 'v_{m}=\\tfrac{1{,}25}{0{,}5}=2{,}5\\ \\text{m/s}',
      'h=0{,}1:\\ \\text{de }t=1\\text{ a }t=1{,}1' + Q + 's(1{,}1)=1{,}1^{2}=1{,}21;\\quad 1{,}21-1=0{,}21\\ \\text{m}' + Q + 'v_{m}=\\tfrac{0{,}21}{0{,}1}=2{,}1\\ \\text{m/s}',
      'h=-0{,}5:\\ \\text{de }t=0{,}5\\text{ a }t=1' + Q + 's(0{,}5)=0{,}5^{2}=0{,}25;\\quad v_{m}=\\tfrac{0{,}25-1}{-0{,}5}=\\tfrac{-0{,}75}{-0{,}5}=1{,}5' + Q + 'h=-0{,}1:\\ \\text{de }t=0{,}9\\text{ a }t=1' + Q + 's(0{,}9)=0{,}9^{2}=0{,}81;\\quad v_{m}=\\tfrac{0{,}81-1}{-0{,}1}=\\tfrac{-0{,}19}{-0{,}1}=1{,}9',
      '\\text{con }h=0\\text{ no hay cociente: no se divide por }0' + Q + '(1+h)^{2}=1+2h+h^{2}' + Q + '(1+h)^{2}-1=2h+h^{2}=h\\,(2+h)' + Q + '\\text{si }h\\ne 0:\\ \\ \\dfrac{h\\,(2+h)}{h}=2+h',
      '2+h\\text{ se acerca a }2+0=2\\text{ cuando }h\\text{ se acerca a }0' + Q + '\\displaystyle\\lim_{h\\to 0}\\dfrac{(1+h)^{2}-1}{h}=2' + Q + '\\text{la velocidad en }t=1\\text{ es }2\\ \\text{m/s}']; return dtPasos(R.slice(0, k)); }
  };
})());
