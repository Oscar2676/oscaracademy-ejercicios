/* L25 H09 · término enésimo: desde a₁ se dan n − 1 saltos de d; lo avanzado es (n − 1)·d */
OA.scene('ene-idea', (function(){
  var N = 5, A = [4, 7, 10, 13], YL = 2.45, YBAR = 1.5;
  var PZ = [['T1', 'a_{1}', 'a₁', 'c-sec'], ['T2', 'a_{2}', 'a₂', 'c-sec'], ['T3', 'a_{3}', 'a₃', 'c-sec'], ['T4', 'a_{4}', 'a₄', 'c-sec'],
    ['D1', '+3', '+3', 'diff'], ['D2', '+3', '+3', 'diff'], ['D3', '+3', '+3', 'diff'],
    ['B2', '1\\cdot 3', '1 · 3', 'diff'], ['B3', '2\\cdot 3', '2 · 3', 'diff'], ['B4', '3\\cdot 3', '3 · 3', 'diff'], ['B5', '(4-1)\\cdot 3', '(4 − 1) · 3', 'diff'],
    ['Q', '4,\\ 7,\\ 10,\\ 13,\\ \\ldots\\qquad a_{n}=\\ ?', '4, 7, 10, 13, …   aₙ = ?', 'pt'], ['F', 'a_{n}=a_{1}+(n-1)\\,d', 'aₙ = a₁ + (n − 1) d', 'diff'],
    ['R1', 'a_{1}=4', 'a₁ = 4', ''],
    ['R2', 'a_{2}=4+1\\cdot 3=7', 'a₂ = 4 + 1 · 3 = 7', ''],
    ['R3', 'a_{3}=4+2\\cdot 3=10', 'a₃ = 4 + 2 · 3 = 10', ''],
    ['R4', 'a_{4}=4+3\\cdot 3=13', 'a₄ = 4 + 3 · 3 = 13', ''],
    ['R5', 'a_{n}=4+(n-1)\\cdot 3', 'aₙ = 4 + (n − 1) · 3', 'diff']];
  var TXT = [['El primer término vale 4.', 'Todavía no se da ningún salto.'],
    ['Un salto de 3 lleva al segundo término.', 'Lo avanzado desde el primero: una vez 3.'],
    ['Dos saltos llevan al tercer término.', 'Lo avanzado: dos veces 3.'],
    ['Tres saltos llevan al cuarto término.', 'Lo avanzado: tres veces 3.'],
    ['Los saltos son uno menos que la posición.', 'Al término n se llega con n − 1 saltos.']];
  function gx(a){ return -1.0 + 0.4*a; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con la sucesión 4, 7, 10, 13 sobre una recta numérica. Uno: aparece el primer término, en el 4. Dos: un arco naranja rotulado más 3 salta del 4 al 7, el segundo término; bajo la recta, una barra naranja marca lo avanzado desde el primer término: una vez 3. Tres: otro arco lleva al 10; la barra crece a dos veces 3. Cuatro: otro arco lleva al 13; la barra mide tres veces 3. Cinco: los arcos quedan numerados, salto 1, salto 2 y salto 3: para el cuarto término hubo 4 menos 1 saltos; en general, a sub n es igual a a sub 1 más n menos 1 por d. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos</span><span><i class="sw rise"></i> los saltos (cada uno suma la diferencia) y lo avanzado desde el primer término</span>',
    anim:{run:30000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, j, w, m = Math.min(k, 4), xa, xb, xm, r, ang, fin, sal;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, col, b){ c.font = (b ? '700 11.5px ' : '500 10.5px ') + F; c.fillStyle = col || C.muted || '#6b6b6b'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* recta numérica */
      S.line(gx(-0.4), YL, gx(15.2), YL, {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 0; i <= 15; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(YL) - 2.5); c.lineTo(X(gx(i)), Y(YL) + 2.5); c.stroke(); }
      num('0', X(gx(0)), Y(YL) + 11);
      /* saltos: el arco i va del término i al término i + 1 */
      for (i = 1; i <= 3; i++){ if (m < i + 1) break; w = (i + 1 === k) ? u : 1;
        xa = X(gx(A[i - 1])); xb = X(gx(A[i])); xm = (xa + xb)/2; r = (xb - xa)/2; fin = Math.PI + Math.PI*Math.min(1, w/0.8);
        c.strokeStyle = C.rise; c.lineWidth = 1.6; c.beginPath(); c.ellipse(xm, Y(YL), r, r*0.72, 0, Math.PI, fin); c.stroke();
        if (w >= 0.8){ c.fillStyle = C.rise; c.beginPath(); c.moveTo(xb, Y(YL) - 1); c.lineTo(xb - 1.5, Y(YL) - 10); c.lineTo(xb + 6, Y(YL) - 7); c.closePath(); c.fill(); }
        if (w > 0.4) L('D' + i, (gx(A[i - 1]) + gx(A[i]))/2, YL, -50, 0, -r*0.72 - 11);
        if (k === 5){ c.globalAlpha = u; num('salto ' + i, xm, Y(YL) - r*0.72 + 13, C.rise, 1); c.globalAlpha = 1; } }
      /* términos */
      for (i = 1; i <= m; i++){ w = (i === k) ? (i === 1 ? u : Math.max(0, (u - 0.8)/0.2)) : 1; if (w <= 0) continue;
        c.beginPath(); c.arc(X(gx(A[i - 1])), Y(YL), 3.8*w, 0, 6.2832); c.fillStyle = C.sec; c.fill();
        if (w > 0.5){ num('' + A[i - 1], X(gx(A[i - 1])), Y(YL) + 11, C.sec, 1); L('T' + i, gx(A[i - 1]), YL, -50, 0, 27); } }
      /* barra: lo avanzado desde el primer término */
      if (k >= 2){ j = Math.min(k, 4); sal = k === 5 ? 3 : (j - 2) + u; xa = gx(4); xb = gx(4 + 3*sal);
        S.poly([[xa, YBAR - 0.07], [xb, YBAR - 0.07], [xb, YBAR + 0.07], [xa, YBAR + 0.07]], {fill:C.rise, alpha:0.55});
        c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(X(xa), Y(YL) + 38); c.lineTo(X(xa), Y(YBAR)); c.moveTo(X(xb), Y(YL) + (u >= 1 || k === 5 ? 38 : 4)); c.lineTo(X(xb), Y(YBAR)); c.stroke(); c.setLineDash([]);
        for (i = 1; i < Math.floor(sal + 1e-9); i++){ c.strokeStyle = '#fff'; c.lineWidth = 1.5; c.beginPath(); c.moveTo(X(gx(4 + 3*i)), Y(YBAR + 0.07)); c.lineTo(X(gx(4 + 3*i)), Y(YBAR - 0.07)); c.stroke(); }
        if (k === 5) L(u < 0.5 ? 'B4' : 'B5', (xa + xb)/2, YBAR, -50, 0, 14); else if (u > 0.6) L('B' + k, (xa + xb)/2, YBAR, -50, 0, 14); else if (k > 2) L('B' + (k - 1), (xa + gx(4 + 3*(k - 2)))/2, YBAR, -50, 0, 14); }
      if (k < N || u < 0.5) L('Q', -1.2, 4.45, 0); else L('F', -1.2, 4.45, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.0));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 34, 62, 90, 118]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['a_{1}=4', 'a_{2}=a_{1}+1\\cdot d=4+1\\cdot 3=7', 'a_{3}=a_{1}+2\\cdot d=4+2\\cdot 3=10', 'a_{4}=a_{1}+3\\cdot d=4+3\\cdot 3=13', 'a_{n}=a_{1}+(n-1)\\,d=4+(n-1)\\cdot 3'][k - 1]]]; }
  };
})());
