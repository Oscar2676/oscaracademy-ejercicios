/* L25 H11 · serie convergente: 1/2 + 1/4 + 1/8 + … como pedazos de un cuadrado de área 1; lo que falta, 1/2ⁿ, se achica a la mitad */
OA.scene('ser-idea', (function(){
  var N = 5, X0 = -0.9, Y0 = 1.2, LADO = 2.55, XR = 2.05;
  var PZ = [['P1', '\\tfrac{1}{2}', '1/2', 'c-sec'], ['P2', '\\tfrac{1}{4}', '1/4', 'c-sec'], ['P3', '\\tfrac{1}{8}', '1/8', 'c-sec'], ['P4', '\\tfrac{1}{16}', '1/16', 'c-sec'],
    ['X1', '1-S_{1}=\\tfrac{1}{2}', '1 − S₁ = 1/2', 'diff'], ['X2', '1-S_{2}=\\tfrac{1}{4}', '1 − S₂ = 1/4', 'diff'], ['X3', '1-S_{3}=\\tfrac{1}{8}', '1 − S₃ = 1/8', 'diff'], ['X4', '1-S_{4}=\\tfrac{1}{16}', '1 − S₄ = 1/16', 'diff'], ['X5', '1-S_{n}=\\tfrac{1}{2^{n}}\\to 0', '1 − Sₙ = 1/2ⁿ → 0', 'diff'],
    ['Q', '\\tfrac{1}{2}+\\tfrac{1}{4}+\\tfrac{1}{8}+\\tfrac{1}{16}+\\cdots=\\ ?', '1/2 + 1/4 + 1/8 + 1/16 + … = ?', 'pt'], ['F', '\\sum_{n=1}^{\\infty}\\tfrac{1}{2^{n}}=\\lim_{n\\to\\infty}S_{n}=1', 'la suma de 1/2ⁿ desde n = 1 es el límite de Sₙ, que es 1', 'diff'],
    ['R1', 'S_{1}=\\tfrac{1}{2}', 'S₁ = 1/2', ''],
    ['R2', 'S_{2}=\\tfrac{1}{2}+\\tfrac{1}{4}=\\tfrac{3}{4}', 'S₂ = 1/2 + 1/4 = 3/4', ''],
    ['R3', 'S_{3}=\\tfrac{3}{4}+\\tfrac{1}{8}=\\tfrac{7}{8}', 'S₃ = 3/4 + 1/8 = 7/8', ''],
    ['R4', 'S_{4}=\\tfrac{7}{8}+\\tfrac{1}{16}=\\tfrac{15}{16}', 'S₄ = 7/8 + 1/16 = 15/16', ''],
    ['R5', 'S_{n}=1-\\tfrac{1}{2^{n}}\\ \\longrightarrow\\ 1', 'Sₙ = 1 − 1/2ⁿ, que tiende a 1', 'diff']];
  var TXT = [['El primer término ocupa la mitad del cuadrado.', 'Falta la otra mitad.'],
    ['El segundo ocupa la mitad de lo que faltaba.', 'Ahora falta un cuarto.'],
    ['El tercero, otra vez la mitad de lo que faltaba.', 'Falta un octavo.'],
    ['El cuarto: falta un dieciseisavo.', 'Lo que falta se achica a la mitad cada vez.'],
    ['Lo que falta tiende a cero: las sumas', 'parciales tienden a 1. La serie converge.']];
  /* pedazo i (desde 1) y resto después de i pedazos: mitades alternadas, vertical y horizontal */
  function corte(m){ var r = [X0, Y0, X0 + LADO, Y0 + LADO], P = [], i, p;
    for (i = 1; i <= m; i++){ if (i % 2){ p = [r[0], r[1], (r[0] + r[2])/2, r[3]]; r = [(r[0] + r[2])/2, r[1], r[2], r[3]]; } else { p = [r[0], r[1], r[2], (r[1] + r[3])/2]; r = [r[0], (r[1] + r[3])/2, r[2], r[3]]; } P.push(p); }
    return {P:P, r:r}; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con un cuadrado de área 1. Uno: el primer término, un medio, pinta de azul la mitad izquierda; la otra mitad, naranja, es lo que falta. Dos: el segundo término, un cuarto, pinta la mitad de lo que faltaba; falta un cuarto. Tres: un octavo; falta un octavo. Cuatro: un dieciseisavo; falta un dieciseisavo. Cinco: siguen entrando pedazos cada vez más chicos y el pedazo naranja se achica hasta no verse: lo que falta, uno sobre dos elevado a n, tiende a cero, y las sumas parciales tienden a 1. La serie converge y su suma es 1. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos: juntos son la suma parcial \\(S_{n}\\)</span><span><i class="sw rise"></i> lo que falta para completar el cuadrado: \\(1-S_{n}\\)</span>',
    anim:{run:32000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, p, w, G, m, f, r, cx, cy;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function rect(q, col, al){ S.poly([[q[0], q[1]], [q[2], q[1]], [q[2], q[3]], [q[0], q[3]]], {fill:'#fff', alpha:1}); S.poly([[q[0], q[1]], [q[2], q[1]], [q[2], q[3]], [q[0], q[3]]], {fill:col, alpha:al}); c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(X(q[0]) + 0.5, Y(q[3]) + 0.5, (q[2] - q[0])*s - 1, (q[3] - q[1])*s - 1); }
      /* cantidad de pedazos ya puestos (m) y avance del que está entrando (f) */
      if (k < 5){ m = k - 1; f = u; } else { w = 4 + 8*u; m = Math.min(11, Math.floor(w)); f = w >= 12 ? 1 : w - Math.floor(w); if (w >= 12){ m = 12; f = 0; } }
      G = corte(m + 1);
      /* lo que falta antes de que entre el pedazo nuevo: es el resto de m pedazos */
      r = corte(m).r; if ((r[2] - r[0])*s > 1.5) rect(r, C.rise, 0.3);
      for (i = 0; i < m; i++) rect(G.P[i], C.sec, 0.3);
      if (m < 12 && f > 0){ p = G.P[m]; if ((m + 1) % 2) rect([p[0], p[1], p[0] + (p[2] - p[0])*f, p[3]], C.sec, 0.3); else rect([p[0], p[1], p[2], p[1] + (p[3] - p[1])*f], C.sec, 0.3); }
      c.strokeStyle = C.ink; c.lineWidth = 1.2; c.strokeRect(X(X0), Y(Y0 + LADO), LADO*s, LADO*s);
      for (i = 1; i <= Math.min(4, k); i++) if (i < k || u > 0.6){ p = G.P[i - 1]; L('P' + i, (p[0] + p[2])/2, (p[1] + p[3])/2, -50); }
      /* rótulo de lo que falta, a la derecha, unido con una línea fina al pedazo naranja */
      i = (k < 5) ? (u > 0.6 ? k : k - 1) : (u > 0.5 ? 5 : 4);
      if (i >= 1){ r = corte(Math.min(i, 4)).r; if (k === 5) r = corte(m + (f > 0.5 ? 1 : 0)).r; cx = (r[0] + r[2])/2; cy = (r[1] + r[3])/2;
        c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(X(cx), Y(cy)); c.lineTo(X(XR) - 4, Y(3.3)); c.stroke(); c.setLineDash([]);
        L('X' + i, XR, 3.3, 0); }
      c.font = '600 11.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('cuadrado de área 1', X(XR), Y(1.45));
      if (k < N || u < 0.5) L('Q', -1.2, 4.42, 0); else L('F', -1.2, 4.42, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.95));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['S_{1}=\\dfrac{1}{2}', 'S_{2}=\\dfrac{1}{2}+\\dfrac{1}{4}=\\dfrac{3}{4}', 'S_{3}=\\dfrac{3}{4}+\\dfrac{1}{8}=\\dfrac{7}{8}', 'S_{4}=\\dfrac{7}{8}+\\dfrac{1}{16}=\\dfrac{15}{16}', '\\sum_{n=1}^{\\infty}\\dfrac{1}{2^{n}}=\\lim_{n\\to\\infty}\\left(1-\\dfrac{1}{2^{n}}\\right)=1'][k - 1]]]; }
  };
})());
/* número ↔ figura: las sumas parciales Sₙ = 1 − 1/2ⁿ en una gráfica; se acercan a la recta S = 1 */
OA.scene('ser-vivo', ssPlot({ guia:2, glab:function(n){ return (Math.pow(2, n) - 1) + '/' + Math.pow(2, n); }, N:7, ymin:0, ymax:1, ystep:0.25, ydec:2, textH:0.62, aspect:1.12, endless:true, L:1, Llab:'S = 1', ylab:'Sₙ', run:18,
  a:function(n){ return 1 - 1/Math.pow(2, n); },
  aria:'Gráfica de puntos sueltos con las sumas parciales de la serie de término uno sobre dos elevado a n. En horizontal va n; en vertical, la suma parcial. Los puntos suben: un medio, tres cuartos, siete octavos, quince dieciseisavos, y se acercan cada vez más a una recta horizontal punteada trazada a la altura 1, sin tocarla. Cada punto está unido por una línea punteada con su valor en el eje vertical.',
  legend:'<span><i class="sw rise"></i> la suma parcial que se está agregando</span><span><i class="sw sec"></i> las anteriores</span><span><i class="sw tan"></i> la suma de la serie, \\(S=1\\)</span><span>líneas punteadas: llevan cada suma parcial a su valor en el eje \\(S_{n}\\)</span>',
  lines:function(n, fin){ var d = Math.pow(2, n); return [['S' + ssSub(n) + ' = ' + (d - 1) + '/' + d + ' ≈ ' + oaDec(1 - 1/d, 4), 'rise'], ['falta para llegar a 1:  1/' + d + ' ≈ ' + oaDec(1/d, 4), 'tan']].concat(fin ? [['las sumas parciales tienden a 1: converge', 'ink']] : []); },
  caption:function(n, fin){ var d = Math.pow(2, n); return 'La suma parcial de orden ' + n + ' vale ' + (d - 1) + '/' + d + '; le falta 1/' + d + ' para llegar a 1' + (fin ? '. Lo que falta se achica a la mitad con cada término: las sumas parciales tienden a 1' : ''); },
  readout:function(n){ var d = Math.pow(2, n); return [['', 'S_{' + n + '}=1-\\dfrac{1}{2^{' + n + '}}=\\dfrac{' + (d - 1) + '}{' + d + '}'], ['d', '1-S_{' + n + '}=\\dfrac{1}{' + d + '}']]; }
}));
