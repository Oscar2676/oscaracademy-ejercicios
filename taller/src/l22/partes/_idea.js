/* «La idea, en una animación»: el volumen se arma pieza por pieza (discos o anillos), con curvas genéricas.
   Cada símbolo de la fórmula lleva el color de su pieza en el dibujo. */
function oaIdeaRev(o){
  var hole = !!o.hole, N = 7, XC = 2.5, DX = 0.34, E = 0.24, CX = 6.15, CY = 0.55;
  function f(x){ return 1.15 + 0.13*x + 0.2*Math.sin(1.15*x); }
  function g(x){ return hole ? 0.5 + 0.05*x + 0.06*Math.cos(1.3*x) : 0; }
  var pieza = hole ? 'anillo' : 'disco', piezas = hole ? 'anillos' : 'discos';
  return {
    world:{x0:-1.9, x1:7.9, y0:-4.75, y1:3.05}, aspect:7.8/9.8,
    aria:o.aria, labels:[['F', o.Ftex, o.Ftxt, 'diff']],
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:o.legend,
    anim:{run:28000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = Math.min(1, (t - Math.floor(t))*1.5); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, s = X(1) - X(0), i, x, pts, top = [], bot = [], in1 = [], in2 = [];
      var F = '"Source Sans 3", system-ui, sans-serif', R0 = f(XC), r0 = g(XC);
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
      if (k < N) seg([['V = ', 'ink'], ['?', 'rise']], X(-1.8), Y(2.7), 19, true); S.lab('F', X(-1.8), Y(2.72), 0, 0, k === N);
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
      lab(hole ? 'y = f(x)' : 'y = f(x)', X(3.65), Y(f(3.65)) - 11, 'sec', 'center', 11.5);
      if (hole){ c.strokeStyle = C.alt; c.beginPath(); in1.forEach(function(p, j){ if (j) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); }); c.stroke(); lab('y = g(x)', X(0.75), Y(g(0.75)) - 9, 'alt', 'center', 11.5); }
      /* todas las piezas (paso 6) o sólido lleno (paso 7) */
      if (k >= 6){ var M = k === 6 ? 10 : 25, w = 4/M, cols = [C.sec, C.tan, C.rise, C.alt], m = k === 6 ? Math.max(1, Math.round(u*M)) : M; for (i = 0; i < m; i++) tajada(i*w, w, k === 6 ? cols[i % 4] : C.sec, k === 6 ? 0.85 : 0.7); }
      eje();
      lab('a', X(0), Y(0) + 12, 'ink', 'center', 11); lab('b', X(4), Y(0) + 12, 'ink', 'center', 11);
      /* corte y radios (pasos 2 a 5) */
      if (k >= 2 && k <= 5){
        if (k === 3) { elip(XC, R0, C.tan, 0.5, 6.2832*u); if (hole && u >= 1){ c.beginPath(); c.ellipse(X(XC), Y(0), E*r0*s, r0*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); eje(); } elip(XC, R0, C.tan, 1, 6.2832*u, true); }
        if (k === 4) { elip(XC, R0, C.tan, 0.3); if (hole){ c.beginPath(); c.ellipse(X(XC), Y(0), E*r0*s, r0*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); eje(); } elip(XC, R0, C.tan, 1, null, true); }
        if (k === 5) { tajada(XC - DX/2, DX, C.tan, 0.9); eje();
          /* mini rectángulo generador, de espesor dx */
          c.fillStyle = C.ink; c.globalAlpha = 0.85; c.fillRect(X(XC - DX/2), Y(R0), DX*s, (R0 - r0)*s); c.globalAlpha = 1;
          c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(XC), Y(R0) - 2); c.lineTo(X(XC - 0.75), Y(R0) - 22); c.stroke(); lab('espesor dx', X(XC - 0.8), Y(R0) - 29, 'alt', 'right', 11.5); }
        if (k <= 4){ c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(X(XC), Y(0)); c.lineTo(X(XC), Y(R0)); c.stroke(); lab(hole ? 'R' : 'R = f(x)', X(XC) + 6, Y(hole ? R0*0.82 : R0*0.55), 'rise', 'left', 12);
          if (hole){ c.strokeStyle = C.alt; c.lineWidth = 3.4; c.beginPath(); c.moveTo(X(XC), Y(0)); c.lineTo(X(XC), Y(r0)); c.stroke(); lab('r', X(XC) - 7, Y(r0*0.5), 'alt', 'right', 12); }
          c.fillStyle = C.ink; c.beginPath(); c.arc(X(XC), Y(0), 2.2, 0, 6.2832); c.fill(); }
        lab('x', X(XC), Y(0) + 12, 'ink', 'center', 11);
      }
      /* la pieza, sacada y vista de frente (pasos 4 y 5) */
      if (k === 4 || k === 5){
        var q = k === 4 ? u : 1, cx = X(XC) + (X(CX) - X(XC))*q, cy = Y(0) + (Y(CY) - Y(0))*q, ex = (E + (1 - E)*q)*R0*s*0.82, ey = R0*s*0.82, rr = r0*0.82;
        if (k === 5){ c.beginPath(); c.ellipse(cx + 9, cy, ex*0.5, ey, 0, 0, 6.2832); c.fillStyle = C.tan; c.globalAlpha = 0.9; c.fill(); c.globalAlpha = 1; c.fillStyle = C.tan; c.globalAlpha = 0.9; c.fillRect(cx, cy - ey, 9, 2*ey); c.globalAlpha = 1; ex = ex*0.5; }
        c.beginPath(); c.ellipse(cx, cy, ex, ey, 0, 0, 6.2832); c.fillStyle = C.tan; c.globalAlpha = k === 5 ? 0.6 : 0.45; c.fill(); c.globalAlpha = 1; c.strokeStyle = C.tan; c.lineWidth = 1.2; c.stroke();
        if (k === 5){ c.fillStyle = '#fff'; c.globalAlpha = 0.35; c.beginPath(); c.ellipse(cx, cy, ex, ey, 0, 0, 6.2832); c.fill(); c.globalAlpha = 1; }
        if (hole){ c.beginPath(); c.ellipse(cx, cy, ex*rr/(R0*0.82), rr*s, 0, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.tan; c.stroke(); }
        if (q >= 1){
          if (k === 4){ c.strokeStyle = C.rise; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx, cy - ey); c.stroke(); lab('R', cx + 6, cy - ey*0.72, 'rise', 'left', 13);
            if (hole){ c.strokeStyle = C.alt; c.lineWidth = 2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(cx - rr*s, cy); c.stroke(); lab('r', cx - rr*s*0.5, cy + 10, 'alt', 'center', 13); }
            c.fillStyle = C.ink; c.beginPath(); c.arc(cx, cy, 2.2, 0, 6.2832); c.fill(); lab('visto de frente', X(CX), Y(CY) - ey - 12, 'tan', 'center', 11.5); }
          else { c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(cx, cy + ey + 5); c.lineTo(cx, cy + ey + 9); c.lineTo(cx + 9, cy + ey + 9); c.lineTo(cx + 9, cy + ey + 5); c.stroke(); lab('dx', cx + 4.5, cy + ey + 19, 'alt', 'center', 12.5); lab('con su espesor', X(CX), Y(CY) - ey - 12, 'tan', 'center', 11.5); }
        }
      }
      /* texto: la fórmula se arma pieza por pieza */
      var x0 = X(-1.8), y0 = Y(-2.45), A = hole ? [['π', 'tan'], ['(', 'ink'], ['R²', 'rise'], [' − ', 'ink'], ['r²', 'alt'], [')', 'ink']] : [['π', 'tan'], [' R²', 'rise']];
      if (k === 1){ seg([['Una región gira alrededor de un eje y forma un sólido' + (hole ? ' hueco.' : '.'), 'ink']], x0, y0); seg([['¿Cuánto mide su volumen ', 'ink'], ['V', 'ink'], ['?', 'rise']], x0, y0 + 21); }
      if (k === 2){ seg([['Se corta en un x cualquiera, perpendicular al eje.', 'ink']], x0, y0); if (hole){ seg([['R', 'rise'], [' = f(x): del eje a la curva lejana.  ', 'ink'], ['r', 'alt'], [' = g(x): a la cercana.', 'ink']], x0, y0 + 21); } else seg([['El corte mide ', 'ink'], ['R = f(x)', 'rise'], [': del eje a la curva. Es el radio.', 'ink']], x0, y0 + 21); }
      if (k === 3){ seg([['Al girar, el corte barre un ', 'ink'], [pieza, 'tan'], [hole ? ': un disco con un hueco.' : '.', 'ink']], x0, y0); }
      if (k === 4){ seg([['Visto de frente, el ' + pieza + (hole ? ' es un círculo menos otro:' : ' es un círculo:'), 'ink']], x0, y0); seg([['área = ', 'ink']].concat(A), x0, y0 + 25, 15, true); }
      if (k === 5){ seg([['Con un espesor ', 'ink'], ['dx', 'alt'], [', su volumen es área × espesor:', 'ink']], x0, y0); seg([['dV = ', 'ink']].concat(A).concat([[' dx', 'alt']]), x0, y0 + 25, 15, true); }
      if (k === 6){ seg([['El sólido es la suma de todos los ' + piezas + ',', 'ink']], x0, y0); seg([['desde x = a hasta x = b:   ', 'ink'], ['suma de los  ', 'ink']].concat(A).concat([[' dx', 'alt']]), x0, y0 + 23, 13, true); }
      if (k === 7){ seg([['Sumar infinitos ' + piezas + ' de espesor ', 'ink'], ['dx', 'alt'], [' es integrar:', 'ink']], x0, y0); seg([['V = ∫ de a a b de  ', 'ink']].concat(A).concat([[' dx', 'alt']]), x0, y0 + 25, 15, true); seg(hole ? [['con ', 'ink'], ['R = f(x)', 'rise'], [' y ', 'ink'], ['r = g(x)', 'alt']] : [['con ', 'ink'], ['R = f(x)', 'rise']], x0, y0 + 50); }
      lab('paso ' + k + ' de ' + N, X(7.8), Y(2.75), C.muted || '#6b6b6b', 'right', 11);
    },
    caption:function(v){ return o.caps[Math.round(v.paso || 1) - 1]; },
    readout:function(v){ return [['', o.tex[Math.round(v.paso || 1) - 1]]]; }
  };
}
