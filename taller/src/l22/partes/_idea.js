/* «La idea, en una animación»: el volumen se arma pieza por pieza (discos o anillos), con curvas genéricas.
   Cada símbolo de la fórmula lleva el color de su pieza en el dibujo. */
function oaIdeaRev(o){
  var hole = !!o.hole, N = 7, XC = 2.5, DX = 0.34, E = 0.24, CX = 6.15, CY = 0.55;
  function f(x){ return 1.15 + 0.13*x + 0.2*Math.sin(1.15*x); }
  function g(x){ return hole ? 0.5 + 0.05*x + 0.06*Math.cos(1.3*x) : 0; }
  var pieza = hole ? 'anillo' : 'disco', piezas = hole ? 'anillos' : 'discos';
  var AR = hole ? '\\pi\\left(R^{2}-r^{2}\\right)' : '\\pi R^{2}', ARt = hole ? 'π(R² − r²)' : 'πR²';
  var PZ = [['F', o.Ftex, o.Ftxt, 'diff'], ['Q', 'V=\\ ?', 'V = ?', 'pt'], ['YF', 'y=f(x)', 'y = f(x)', 'c-sec'], ['YG', 'y=g(x)', 'y = g(x)', 'c-alt'],
    ['LA', 'a', 'a', ''], ['LB', 'b', 'b', ''], ['LX', 'x', 'x', ''], ['LR', hole ? 'R' : 'R=f(x)', hole ? 'R' : 'R = f(x)', 'diff'], ['Lr', 'r', 'r', 'c-alt'],
    ['LD', '\\text{espesor }dx', 'espesor dx', 'c-alt'], ['DR', 'R', 'R', 'diff'], ['Dr', 'r', 'r', 'c-alt'], ['DD', 'dx', 'dx', 'c-alt'],
    ['R1', o.tex[0], 'V = ?', ''], ['R2', o.tex[1], 'radios', ''], ['R3', o.tex[2], 'el corte gira', ''], ['R4', o.tex[3], 'área', ''], ['R5', o.tex[4], 'dV', ''], ['R6', o.tex[5], 'suma', ''], ['R7', o.tex[6], 'integral', '']];
  var FILA = [0, 28, 56, 86, 116, 152, 198];
  return {
    world:{x0:-1.9, x1:7.9, y0:-10.5, y1:3.05}, aspect:13.55/9.8,
    aria:o.aria, labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:o.legend,
    anim:{run:28000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = Math.min(1, (t - Math.floor(t))*1.5); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, s = X(1) - X(0), i, x, pts, top = [], bot = [], in1 = [], in2 = [];
      var F = '"Source Sans 3", system-ui, sans-serif', R0 = f(XC), r0 = g(XC), on = {};
      function L(id, x, y, ax, px, py){ on[id] = 1; S.lab(id, X(x) + (px || 0), Y(y) + (py || 0), ax == null ? -50 : ax, -50, true); }
      function Lp(id, px, py, ax){ on[id] = 1; S.lab(id, px, py, ax == null ? -50 : ax, -50, true); }
      function seg(parts, px, py, sz, bold){ c.font = (bold ? '700 ' : '600 ') + (sz || 12.5) + 'px ' + F; c.textAlign = 'left'; c.textBaseline = 'middle'; parts.forEach(function(p){ c.fillStyle = C[p[1]] || p[1]; c.fillText(p[0], px, py); px += c.measureText(p[0]).width; }); }
      function lab(t, px, py, col, al, sz){ c.font = '600 ' + (sz || 12) + 'px ' + F; c.fillStyle = C[col] || col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function elip(cx, R, col, alpha, a1, stroke){ c.beginPath(); c.ellipse(X(cx), Y(0), E*R*s, R*s, 0, -Math.PI/2, -Math.PI/2 + (a1 == null ? 6.2832 : a1)); if (stroke){ c.strokeStyle = col; c.lineWidth = 1.2; c.stroke(); } else { c.globalAlpha = alpha; c.fillStyle = col; c.fill(); c.globalAlpha = 1; } }
      function eje(){ c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([6, 4]); c.beginPath(); c.moveTo(X(-1.8), Y(0)); c.lineTo(X(4.75), Y(0)); c.stroke(); c.setLineDash([]); lab('eje de giro', X(-1.8), Y(0) - 9, 'ink', 'left', 10.5); }
      function tajada(xa, w, col, alpha){ /* pieza con espesor w, entre xa y xa + w */
        var Ra = f(xa + w/2), ra = g(xa + w/2), grd;
        c.beginPath(); c.ellipse(X(xa), Y(0), E*Ra*s, Ra*s, 0, Math.PI/2, 3*Math.PI/2); c.lineTo(X(xa + w), Y(Ra)); c.ellipse(X(xa + w), Y(0), E*Ra*s, Ra*s, 0, -Math.PI/2, Math.PI/2); c.closePath();
        grd = c.createLinearGradient(0, Y(Ra), 0, Y(-Ra)); grd.addColorStop(0, col); grd.addColorStop(0.45, '#ffffff'); grd.addColorStop(1, col);
        c.globalAlpha = alpha*0.55; c.fillStyle = grd; c.fill(); c.globalAlpha = alpha; c.fillStyle = col; c.globalAlpha = alpha*0.5; c.fill(); c.globalAlpha = 1;
        c.strokeStyle = col; c.lineWidth = 1; c.stroke();
        c.beginPath(); c.ellipse(X(xa + w), Y(0), E*Ra*s, Ra*s, 0, 0, 6.2832); c.globalAlpha = alpha*0.75; c.fillStyle = col; c.fill(); c.globalAlpha = 1; c.stroke();
        if (hole){ c.beginPath(); c.ellipse(X(xa + w), Y(0), E*ra*s, ra*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = col; c.stroke(); }
      }
      for (i = 0; i <= 80; i++){ x = 4*i/80; top.push([x, f(x)]); bot.push([x, -f(x)]); in1.push([x, g(x)]); in2.push([x, -g(x)]); }
      /* pregunta arriba; al final, en el mismo lugar, la respuesta */
      if (k < N) L('Q', -1.8, 2.7, 0); else L('F', -1.8, 2.4, 0);
      /* región que gira */
      pts = top.concat(hole ? in1.slice().reverse() : [[4, 0], [0, 0]]);
      S.poly(pts, {fill:C.sec, alpha:k >= 3 ? 0.1 : 0.22});
      /* sólido (desde el paso 3) */
      if (k >= 3){
        c.strokeStyle = 'rgba(31,93,134,0.45)'; c.lineWidth = 1; c.beginPath(); bot.forEach(function(p, j){ if (j) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.stroke();
        elip(0, f(0), 'rgba(31,93,134,0.45)', 1, null, true); elip(4, f(4), 'rgba(31,93,134,0.45)', 1, null, true);
        if (hole){ c.setLineDash([3, 3]); c.beginPath(); in2.forEach(function(p, j){ if (j) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.stroke(); c.setLineDash([]); elip(4, g(4), 'rgba(31,93,134,0.45)', 1, null, true); }
      }
      /* curvas */
      c.strokeStyle = C.sec; c.lineWidth = 1.6; c.beginPath(); top.forEach(function(p, j){ if (j) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.stroke();
      L('YF', 3.65, f(3.65), -50, 0, -13);
      if (hole){ c.strokeStyle = C.alt; c.beginPath(); in1.forEach(function(p, j){ if (j) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.stroke(); L('YG', 0.75, g(0.75), -50, 0, -11); }
      /* todas las piezas (paso 6) o sólido lleno (paso 7) */
      if (k >= 6){ var M = k === 6 ? 10 : 25, w = 4/M, cols = [C.sec, C.tan, C.rise, C.alt], m = k === 6 ? Math.max(1, Math.round(u*M)) : M; for (i = 0; i < m; i++) tajada(i*w, w, k === 6 ? cols[i % 4] : C.sec, k === 6 ? 0.85 : 0.7); }
      eje();
      L('LA', 0, 0, -50, 0, 13); L('LB', 4, 0, -50, 0, 13);
      /* corte y radios (pasos 2 a 5) */
      if (k >= 2 && k <= 5){
        if (k === 3) { elip(XC, R0, C.tan, 0.5, 6.2832*u); if (hole && u >= 1){ c.beginPath(); c.ellipse(X(XC), Y(0), E*r0*s, r0*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); eje(); } elip(XC, R0, C.tan, 1, 6.2832*u, true); }
        if (k === 4) { elip(XC, R0, C.tan, 0.3); if (hole){ c.beginPath(); c.ellipse(X(XC), Y(0), E*r0*s, r0*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); eje(); } elip(XC, R0, C.tan, 1, null, true); }
        if (k === 5) { tajada(XC - DX/2, DX, C.tan, 0.9); eje();
          /* mini rectángulo generador, de espesor dx */
          c.fillStyle = C.ink; c.globalAlpha = 0.85; c.fillRect(X(XC - DX/2), Y(R0), DX*s, (R0 - r0)*s); c.globalAlpha = 1;
          c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(XC), Y(R0) - 2); c.lineTo(X(XC - 0.75), Y(R0) - 22); c.stroke(); Lp('LD', X(XC - 0.8), Y(R0) - 29, -100); }
        if (k <= 4){ c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(X(XC), Y(0)); c.lineTo(X(XC), Y(R0)); c.stroke(); Lp('LR', X(XC) + 6, Y(hole ? R0*0.82 : R0*0.55), 0);
          if (hole){ c.strokeStyle = C.alt; c.lineWidth = 3.4; c.beginPath(); c.moveTo(X(XC), Y(0)); c.lineTo(X(XC), Y(r0)); c.stroke(); Lp('Lr', X(XC) - 7, Y(r0*0.5), -100); }
          c.fillStyle = C.ink; c.beginPath(); c.arc(X(XC), Y(0), 2.2, 0, 6.2832); c.fill(); }
        L('LX', XC, 0, -50, 0, 13);
      }
      /* la pieza, sacada y vista de frente (pasos 4 y 5) */
      if (k === 4 || k === 5){
        var q = k === 4 ? u : 1, cx = X(XC) + (X(CX) - X(XC))*q, cy = Y(0) + (Y(CY) - Y(0))*q, ex = (E + (1 - E)*q)*R0*s*0.82, ey = R0*s*0.82, rr = r0*0.82;
        if (k === 5){ c.beginPath(); c.ellipse(cx + 9, cy, ex*0.5, ey, 0, 0, 6.2832); c.fillStyle = C.tan; c.globalAlpha = 0.9; c.fill(); c.globalAlpha = 1; c.fillStyle = C.tan; c.globalAlpha = 0.9; c.fillRect(cx, cy - ey, 9, 2*ey); c.globalAlpha = 1; ex = ex*0.5; }
        c.beginPath(); c.ellipse(cx, cy, ex, ey, 0, 0, 6.2832); c.fillStyle = C.tan; c.globalAlpha = k === 5 ? 0.6 : 0.45; c.fill(); c.globalAlpha = 1; c.strokeStyle = C.tan; c.lineWidth = 1.2; c.stroke();
        if (k === 5){ c.fillStyle = '#fff'; c.globalAlpha = 0.35; c.beginPath(); c.ellipse(cx, cy, ex, ey, 0, 0, 6.2832); c.fill(); c.globalAlpha = 1; }
        if (hole){ c.beginPath(); c.ellipse(cx, cy, ex*rr/(R0*0.82), rr*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.tan; c.stroke(); }
        if (q >= 1){
          if (k === 4){ c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy - ey); c.stroke(); Lp('DR', cx + 6, cy - ey*0.72, 0);
            if (hole){ c.strokeStyle = C.alt; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx - rr*s, cy); c.stroke(); Lp('Dr', cx - rr*s*0.5, cy + 11); }
            c.fillStyle = C.ink; c.beginPath(); c.arc(cx, cy, 2.2, 0, 6.2832); c.fill(); lab('visto de frente', X(CX), Y(CY) - ey - 12, 'tan', 'center', 11.5); }
          else { c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(cx, cy + ey + 5); c.lineTo(cx, cy + ey + 9); c.lineTo(cx + 9, cy + ey + 9); c.lineTo(cx + 9, cy + ey + 5); c.stroke(); Lp('DD', cx + 4.5, cy + ey + 20); lab('con su espesor', X(CX), Y(CY) - ey - 12, 'tan', 'center', 11.5); }
        }
      }
      /* texto: la fórmula se arma pieza por pieza */
      var x0 = X(-1.8), y0 = Y(-2.45), y0r = Y(-4.2), fi;
      var TX = [['Una región gira alrededor de un eje y forma un sólido' + (hole ? ' hueco.' : '.'), '¿Cuánto mide su volumen?'],
        ['Un corte perpendicular al eje, en cualquier posición.', hole ? 'Hay dos radios: a la curva lejana y a la cercana.' : 'El corte va del eje a la curva: es el radio.'],
        ['Al girar, el corte barre un ' + pieza + (hole ? ': un disco con un hueco.' : '.'), ''],
        ['Visto de frente, el ' + pieza + (hole ? ' es un círculo menos otro.' : ' es un círculo.'), 'Esta es su área.'],
        ['Con su espesor, el ' + pieza + ' tiene volumen:', 'área de la cara por espesor.'],
        ['El sólido es la suma de todos los ' + piezas + ',', 'desde el primero hasta el último.'],
        ['Sumar infinitos ' + piezas + ' delgados es integrar.', 'La pregunta de arriba ya tiene respuesta.']];
      /* registro: la expresión de cada paso queda escrita y se acumula hacia abajo; no se borra */
      lab('Paso a paso, lo que se va obteniendo:', x0, Y(-3.65), C.muted || '#6b6b6b', 'left', 11.5);
      for (fi = 0; fi < k; fi++){ var act = fi === k - 1; c.beginPath(); c.arc(X(-1.62), y0r + FILA[fi], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.globalAlpha = act ? Math.max(0.25, u) : 1; c.fill(); c.globalAlpha = 1;
        c.font = '700 11px ' + F; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (fi + 1), X(-1.62), y0r + FILA[fi] + 0.5);
        Lp('R' + (fi + 1), X(-1.3), y0r + FILA[fi], 0); }
      seg([[TX[k - 1][0], 'ink']], x0, y0); seg([[TX[k - 1][1], 'ink']], x0, y0 + 21);
      PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); });
      lab('paso ' + k + ' de ' + N, X(7.8), Y(2.75), C.muted || '#6b6b6b', 'right', 11);
    },
    caption:function(v){ return o.caps[Math.round(v.paso || 1) - 1]; },
    readout:function(v){ return [['', o.tex[Math.round(v.paso || 1) - 1]]]; }
  };
}
