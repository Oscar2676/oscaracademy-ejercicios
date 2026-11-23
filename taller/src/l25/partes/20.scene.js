/* L25 H20 · series de potencias: la misma serie, Σ xⁿ, es una serie numérica distinta para cada x; converge solo en un intervalo centrado en el centro */
function ci20Seg(S, x0, y0, x1, y1, col, wd, dash, al){ var c = S.ctx; c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(S.X(x0), S.Y(y0)); c.lineTo(S.X(x1), S.Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
function ci20Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q en TeX, ya simplificada por quien llama; el signo va delante */
function ci20Fr(p, q){ var s = p < 0 ? '-' : ''; p = Math.abs(p); return q === 1 ? s + p : s + '\\dfrac{' + p + '}{' + q + '}'; }
/* p/q ≥ 0 con dos decimales, redondeo exacto (mitad hacia arriba), con coma */
function ci20Dec(p, q){ var n = Math.floor((200*p + q)/(2*q)), e = Math.floor(n/100), d = n % 100; return e + ',' + (d < 10 ? '0' : '') + d; }
/* mitades: k/2 escrito con coma; tex = 1 para TeX */
function ci20Med(k, tex){ var a = Math.abs(k), s = (k < 0 ? (tex ? '-' : '−') : '') + Math.floor(a/2); return a % 2 ? s + (tex ? '{,}5' : ',5') : s; }
OA.scene('pot-idea', (function(){
  var N = 5, DR = 0.11;
  var COL = [{x:0, s:[1, 1, 1, 1, 1], c:'ink'}, {x:0.5, s:[1, 3/2, 7/4, 15/8, 31/16], c:'sec', lim:2}, {x:-0.5, s:[1, 1/2, 3/4, 5/8, 11/16], c:'alt', lim:2/3}, {x:1, s:[1, 2, 3, 4, 5], c:'rise'}];
  var PZ = [['C0', 'S_{n}=1', 'Sₙ = 1', 'pt'], ['C1', '\\to 2', '→ 2', 'c-sec'], ['C2', '\\to\\tfrac{2}{3}', '→ 2/3', 'c-alt'],
    ['CV', '\\text{suma: }\\tfrac{1}{1-x}', 'suma: 1/(1 − x)', 'c-tan'], ['IV', '\\text{converge si }-1<x<1', 'converge si −1 < x < 1', 'c-tan'],
    ['Q', '\\textstyle\\sum_{n=0}^{\\infty}x^{n}\\quad\\text{¿para qué }x\\text{ converge?}', 'Σ xⁿ ¿para qué x converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{solo si }-1<x<1\\text{: centro }0\\text{, radio }1', '⟹ solo si −1 < x < 1: centro 0, radio 1', 'diff'],
    ['R1', 'x=0\\text{:}\\quad 1,\\ 1,\\ 1,\\ 1,\\ 1\\ \\to 1', 'x = 0: 1, 1, 1, 1, 1 → 1', ''],
    ['R2', 'x=\\tfrac{1}{2}\\text{:}\\quad 1,\\ \\tfrac{3}{2},\\ \\tfrac{7}{4},\\ \\tfrac{15}{8},\\ \\tfrac{31}{16}\\ \\to 2', 'x = 1/2: 1, 3/2, 7/4, 15/8, 31/16 → 2', ''],
    ['R3', 'x=-\\tfrac{1}{2}\\text{:}\\quad 1,\\ \\tfrac{1}{2},\\ \\tfrac{3}{4},\\ \\tfrac{5}{8},\\ \\tfrac{11}{16}\\ \\to\\tfrac{2}{3}', 'x = −1/2: 1, 1/2, 3/4, 5/8, 11/16 → 2/3', ''],
    ['R4', 'x=1\\text{:}\\quad 1,\\ 2,\\ 3,\\ 4,\\ 5\\quad\\text{sin límite}', 'x = 1: 1, 2, 3, 4, 5 sin límite', ''],
    ['R5', '|x|<1\\ \\Longrightarrow\\ \\textstyle\\sum_{n=0}^{\\infty}x^{n}=\\dfrac{1}{1-x}', '|x| < 1 ⟹ Σ xⁿ = 1/(1 − x)', 'diff']];
  var TXT = [['En el centro, 0, todas las sumas parciales', 'valen 1: ahí la serie converge.'],
    ['Azul, en 0,5: las sumas parciales suben cada', 'vez menos y se juntan bajo 2: converge.'],
    ['Verde, en −0,5: suben y bajan cada vez menos', 'y se juntan cerca de 0,67: converge.'],
    ['Naranja, en 1: cada suma parcial es 1 más que', 'la anterior. No se juntan: diverge.'],
    ['Converge solo en la franja burdeo, centrada', 'en 0. La curva es la suma en cada punto.']];
  function gx(x){ return 2.0 + 2.1*x; } function gy(y){ return 1.0 + y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.1, y1:8.5}, aspect:12.6/6.6,
    aria:'Arriba, una franja dice qué muestra: la misma serie, probada en cuatro valores de x, converge solo cerca del centro. Animación en cinco pasos. En horizontal va x, de menos 1 a 1, con el centro, 0, marcado; en vertical, el valor de las sumas parciales, de 0 a 5. La serie es la suma de las potencias de x: 1 más x más x al cuadrado, y así. Sobre cada valor de x probado se dibujan sus cinco primeras sumas parciales, como cinco puntos unidos por una línea fina, de izquierda a derecha. Uno: en x igual a 0, el centro, los cinco puntos están a la misma altura, 1. Dos: en x igual a un medio, puntos azules a las alturas 1, tres medios, siete cuartos, quince octavos y treinta y un dieciseisavos; suben cada vez menos y se juntan bajo una punteada puesta en 2. Tres: en x igual a menos un medio, puntos verdes a las alturas 1, un medio, tres cuartos, cinco octavos y once dieciseisavos; suben y bajan cada vez menos en torno a una punteada puesta en dos tercios. Cuatro: en x igual a 1, puntos naranjas a las alturas 1, 2, 3, 4 y 5; suben siempre lo mismo y no se juntan. Cinco: se sombrea en burdeo la franja vertical entre x igual a menos 1 y x igual a 1, con los extremos marcados con anillos abiertos, y se traza la curva de la suma, 1 dividido por 1 menos x, que pasa por los valores donde se juntan los puntos. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, solo si x está entre menos 1 y 1, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span>puntos negros: sumas parciales en \\(x=0\\), el centro</span><span><i class="sw sec"></i> sumas parciales en \\(x=\\tfrac{1}{2}\\)</span><span><i class="sw alt"></i> sumas parciales en \\(x=-\\tfrac{1}{2}\\)</span><span><i class="sw rise"></i> sumas parciales en \\(x=1\\)</span><span><i class="sw tan"></i> franja donde la serie converge, \\(-1&lt;x&lt;1\\), y curva de la suma, \\(\\tfrac{1}{1-x}\\)</span><span>en cada grupo, los puntos van de izquierda a derecha: \\(S_{0},\\ S_{1},\\ S_{2},\\ S_{3},\\ S_{4}\\)</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, j, w, wj, o, col, px, py, qx, qy, ex, ey, xa, xb, n, t;
      function txt(tx, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(tx, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function tag(tx, x, y, col, al){ c.font = '600 11.5px ' + F; c.fillStyle = col; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(tx, X(x), Y(y)); }
      function anillo(x, y, col, al){ c.globalAlpha = al; c.beginPath(); c.arc(X(x), Y(y), 3.6, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); c.globalAlpha = 1; }
      /* paso 5: franja vertical donde la serie converge */
      if (k === 5) S.poly([[gx(-1), gy(0)], [gx(1), gy(0)], [gx(1), gy(5.2)], [gx(-1), gy(5.2)]], {fill:C.tan, alpha:0.1*u});
      /* líneas de altura 1…5, para leer el valor de cada punto */
      for (i = 1; i <= 5; i++) ci20Seg(S, gx(-1.25), gy(i), gx(1.45), gy(i), C.ink, 0.7, [2, 4], 0.22);
      /* ejes */
      S.line(gx(-1.25), gy(0), gx(1.45), gy(0), {color:C.ink, width:1.1}); S.line(gx(-1.25), gy(0), gx(-1.25), gy(5.3), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1, '−1'], [-0.5, '−0,5'], [0, '0'], [0.5, '0,5'], [1, '1']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(q[0])), Y(gy(0)) - 3); c.lineTo(X(gx(q[0])), Y(gy(0)) + 3); c.stroke(); num(q[1], X(gx(q[0])), Y(gy(0)) + 11, 'center'); });
      for (i = 0; i <= 5; i++){ c.beginPath(); c.moveTo(X(gx(-1.25)) - 3, Y(gy(i))); c.lineTo(X(gx(-1.25)) + 3, Y(gy(i))); c.stroke(); num('' + i, X(gx(-1.25)) - 7, Y(gy(i)), 'right'); }
      num('x', X(gx(1.45)) + 5, Y(gy(0)), 'left'); num('Sₙ', X(gx(-1.25)) + 6, Y(gy(5.3)) - 2, 'left'); num('centro', X(gx(0)), Y(gy(0)) + 23, 'center');
      /* paso 5: tramo del eje donde converge, extremos abiertos, y curva de la suma */
      if (k === 5){ xa = gx(-1); xb = gx(-1) + (gx(1) - gx(-1))*u; ci20Seg(S, xa, gy(0), xb, gy(0), C.tan, 3, null, 0.85);
        n = 80; c.strokeStyle = C.tan; c.lineWidth = 1.8; c.setLineDash([]); c.beginPath(); for (i = 0; i <= n; i++){ t = -1 + 1.8*u*i/n; if (i) c.lineTo(X(gx(t)), Y(gy(1/(1 - t)))); else c.moveTo(X(gx(t)), Y(gy(1/(1 - t)))); } c.stroke();
        anillo(gx(-1), gy(0), C.tan, 1); if (u > 0.97) anillo(gx(1), gy(0), C.tan, 1); }
      /* un grupo de cinco puntos por cada x probado: sus sumas parciales S₀…S₄, de izquierda a derecha */
      for (j = 0; j < 4; j++){ if (k < j + 1) continue; o = COL[j]; col = C[o.c]; wj = k === j + 1 ? u : 1;
        if (o.lim != null && wj > 0.75) ci20Seg(S, gx(o.x) - 0.1, gy(o.lim), gx(o.x) + 4*DR + 0.14, gy(o.lim), col, 1.1, [4, 3], Math.min(1, (wj - 0.75)*4)*0.85);
        for (i = 0; i < 5; i++){ w = Math.max(0, Math.min(1, wj*5 - i)); if (w <= 0) break; px = gx(o.x) + DR*i; py = gy(o.s[i]);
          if (i){ qx = gx(o.x) + DR*(i - 1); qy = gy(o.s[i - 1]); ex = qx + (px - qx)*w; ey = qy + (py - qy)*w; ci20Seg(S, qx, qy, ex, ey, col, 1, null, 0.55); } else { ex = px; ey = py; }
          c.globalAlpha = i ? 1 : w; c.beginPath(); c.arc(X(ex), Y(ey), 2.7, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1; }
        if (wj > 0.9){ if (j === 0) L('C0', gx(0) + 2*DR, gy(0.52), -50); if (j === 1) L('C1', gx(0.5) + 4*DR + 0.1, gy(1.58), 0); if (j === 2) L('C2', gx(-0.5) + 2*DR, gy(1.36), -50); if (j === 3) tag('no se juntan', gx(1) + 2*DR, gy(5.34), C.rise, 'center'); } }
      /* paso 5: la curva pasa por los valores donde se juntan los puntos */
      if (k === 5){ if (u > 0.56) anillo(gx(0), gy(1), C.tan, 1); if (u > 0.28) anillo(gx(-0.5), gy(2/3), C.tan, 1); if (u > 0.84) anillo(gx(0.5), gy(2), C.tan, 1);
        if (u > 0.6){ L('IV', gx(-0.97), gy(4.72), 0); L('CV', gx(0.68), gy(3.95), -100); } }
      L('Q', -1.2, 7.18, 0); if (k === N && u > 0.5) L('F', -1.2, 6.74, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.2); txt(TXT[k - 1][1], -1.2, 0.2 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(7.18));
      dtQue(S, 'la misma serie, probada en cuatro', 'valores de x, converge solo cerca del centro.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.15, [6, 36, 66, 96, 128]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, H = '\\left(' + f(1, 2) + '\\right)', M = '\\left(-' + f(1, 2) + '\\right)', R = [
      '\\text{Serie: }\\displaystyle\\sum_{n=0}^{\\infty}x^{n}=1+x+x^{2}+x^{3}+\\cdots' + Q + '\\text{Es }\\textstyle\\sum c_{n}(x-a)^{n}\\text{ con centro }a=0\\text{ y }c_{n}=1.' + Q + '\\text{Primer término: }x^{0}=1\\text{ (convención).}' + Q + '\\text{Suma parcial: }S_{n}=1+x+x^{2}+\\cdots+x^{n}' + Q + '\\text{Con sumatoria: }S_{n}=\\displaystyle\\sum_{k=0}^{n}x^{k}'
        + Q + '\\text{Cada una es la anterior más una potencia:}' + Q + 'S_{n}=S_{n-1}+x^{n}' + Q + '\\text{En el centro, }x=0\\text{: }0^{1}=0,\\ 0^{2}=0,\\ 0^{3}=0,\\ 0^{4}=0' + Q + 'S_{0}=1' + Q + 'S_{1}=S_{0}+0^{1}=1+0=1' + Q + 'S_{2}=S_{1}+0^{2}=1+0=1' + Q + 'S_{3}=S_{2}+0^{3}=1+0=1' + Q + 'S_{4}=S_{3}+0^{4}=1+0=1'
        + Q + '\\text{Todas valen }1\\text{: su límite es }1.' + Q + '\\text{En }x=0\\text{ la serie converge y suma }1.',
      '\\text{En }x=' + f(1, 2) + '=0{,}5\\text{. Cada potencia es la anterior}' + Q + '\\text{por }' + f(1, 2) + '\\text{ (se duplica el denominador):}' + Q + H + '^{1}=' + f(1, 2) + ',\\ ' + H + '^{2}=' + f(1, 4) + ',\\ ' + H + '^{3}=' + f(1, 8) + ',\\ ' + H + '^{4}=' + f(1, 16)
        + Q + 'S_{0}=1' + Q + 'S_{1}=S_{0}+' + f(1, 2) + '=' + f(2, 2) + '+' + f(1, 2) + '=' + f(3, 2) + Q + 'S_{2}=S_{1}+' + f(1, 4) + '=' + f(6, 4) + '+' + f(1, 4) + '=' + f(7, 4) + Q + 'S_{3}=S_{2}+' + f(1, 8) + '=' + f(14, 8) + '+' + f(1, 8) + '=' + f(15, 8) + Q + 'S_{4}=S_{3}+' + f(1, 16) + '=' + f(30, 16) + '+' + f(1, 16) + '=' + f(31, 16)
        + Q + '\\text{Lo que le falta a }S_{4}\\text{ para llegar a }2\\text{:}' + Q + '2-S_{4}=' + f(32, 16) + '-' + f(31, 16) + '=' + f(1, 16) + Q + '\\text{Es una serie geométrica de razón }' + f(1, 2) + Q + '\\text{(hoja «Series geométricas infinitas»).}' + Q + '\\text{Como }\\left|' + f(1, 2) + '\\right|<1\\text{, converge y suma}'
        + Q + '\\dfrac{1}{1-\\frac{1}{2}}=\\dfrac{1}{\\frac{1}{2}}=2\\quad\\text{(punteada azul)}',
      '\\text{En }x=-' + f(1, 2) + '=-0{,}5\\text{. Cada potencia es la anterior}' + Q + '\\text{por }-' + f(1, 2) + '\\text{ (cambia el signo):}' + Q + M + '^{1}=-' + f(1, 2) + ',\\quad ' + M + '^{2}=' + f(1, 4) + Q + M + '^{3}=-' + f(1, 8) + ',\\quad ' + M + '^{4}=' + f(1, 16)
        + Q + 'S_{0}=1' + Q + 'S_{1}=S_{0}-' + f(1, 2) + '=' + f(2, 2) + '-' + f(1, 2) + '=' + f(1, 2) + Q + 'S_{2}=S_{1}+' + f(1, 4) + '=' + f(2, 4) + '+' + f(1, 4) + '=' + f(3, 4) + Q + 'S_{3}=S_{2}-' + f(1, 8) + '=' + f(6, 8) + '-' + f(1, 8) + '=' + f(5, 8) + Q + 'S_{4}=S_{3}+' + f(1, 16) + '=' + f(10, 16) + '+' + f(1, 16) + '=' + f(11, 16)
        + Q + '11:16=0{,}6875' + Q + '\\text{Es geométrica de razón }-' + f(1, 2) + '\\text{, y }\\left|-' + f(1, 2) + '\\right|=' + f(1, 2) + '<1\\text{:}' + Q + '\\text{converge y suma}' + Q + '\\dfrac{1}{1-\\left(-\\frac{1}{2}\\right)}=\\dfrac{1}{1+\\frac{1}{2}}=\\dfrac{1}{\\frac{3}{2}}=' + f(2, 3) + '\\approx 0{,}67' + Q + '\\text{(punteada verde).}',
      '\\text{En }x=1\\text{. Toda potencia de }1\\text{ vale }1\\text{: }1^{n}=1' + Q + 'S_{0}=1' + Q + 'S_{1}=S_{0}+1=1+1=2' + Q + 'S_{2}=S_{1}+1=2+1=3' + Q + 'S_{3}=S_{2}+1=3+1=4' + Q + 'S_{4}=S_{3}+1=4+1=5' + Q + '\\text{En general, }S_{n}=n+1\\text{: supera cualquier}' + Q + '\\text{número. No tiene límite real.}'
        + Q + '\\text{En }x=1\\text{ la serie diverge.}' + Q + '\\text{(Es geométrica de razón }1\\text{, y }|1|<1\\text{ es falso.)}',
      '\\text{Para cualquier }x\\text{, es la serie geométrica de}' + Q + '\\text{primer término }1\\text{ y razón }x.' + Q + '\\text{Por la hoja «Series geométricas infinitas»:}' + Q + '\\text{converge exactamente cuando }|x|<1,' + Q + '\\text{es decir, }-1<x<1\\text{ (franja burdeo), y ahí}' + Q + '\\displaystyle\\sum_{n=0}^{\\infty}x^{n}=\\dfrac{1}{1-x}\\quad\\text{(curva burdeo)}'
        + Q + '\\text{Comprobación con los tres valores:}' + Q + 'x=0\\text{: }\\dfrac{1}{1-0}=\\dfrac{1}{1}=1' + Q + 'x=' + f(1, 2) + '\\text{: }\\dfrac{1}{1-\\frac{1}{2}}=2' + Q + 'x=-' + f(1, 2) + '\\text{: }\\dfrac{1}{1+\\frac{1}{2}}=' + f(2, 3) + Q + '\\text{En }x=1\\text{ y en }x=-1\\text{ se tiene }|x|=1\\text{:}' + Q + '\\text{no se cumple }|x|<1\\text{; la serie diverge.}'
        + Q + '\\text{La serie converge en el intervalo }(-1,\\,1)\\text{:}' + Q + '\\text{centro }0\\text{, radio }1.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: en Σ (x − 2)ⁿ/3ⁿ, la distancia de x al centro 2, comparada con el radio 3, decide si la serie converge; las barras son los tamaños de los términos */
OA.scene('pot-vivo', (function(){
  var i, PZ = [['A', 'a=2', 'a = 2', 'pt'], ['RL', 'R=3', 'R = 3', 'c-tan'], ['RR', 'R=3', 'R = 3', 'c-tan']];
  for (i = -8; i <= 8; i++){ PZ.push(['X' + (i + 8), 'x=' + ci20Med(4 + i, 1), 'x = ' + ci20Med(4 + i), 'diff']); PZ.push(['D' + (i + 8), '|x-2|=' + ci20Med(Math.abs(i), 1), '|x − 2| = ' + ci20Med(Math.abs(i)), 'diff']); }
  function nx(x){ return -0.8 + 0.64*(x + 2.5); }
  function kk(v){ return Math.max(-8, Math.min(8, Math.round(((v.x == null ? 3.5 : v.x) - 2)*2))); }
  function est(k){ var a = Math.abs(k); return a === 0 ? 0 : a < 6 ? 1 : a === 6 ? 2 : 3; }
  var EST = ['x es el centro: solo queda el primer término', 'distancia menor que el radio: la serie converge', 'distancia igual al radio: extremo; aquí diverge', 'distancia mayor que el radio: la serie diverge'];
  var YL = 5.5, YB = 0.5, HB = 0.72;
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.3, y1:8.1}, aspect:9.4/6.6,
    aria:'Arriba, una franja dice qué muestra: la distancia de x al centro, comparada con el radio, decide si la serie converge. La serie es la suma de x menos 2 elevado a n, dividido por 3 elevado a n, con centro 2 y radio de convergencia 3. Arriba hay una recta numérica de menos 2 a 6. El centro, 2, está marcado; dos cotas burdeo, una a cada lado, marcan el radio, 3, y llegan hasta menos 1 y hasta 5; el tramo entre menos 1 y 5 está pintado burdeo, con anillos abiertos en los extremos. Un deslizador elige x, de menos 2 a 6, de medio en medio. El punto x es naranja y lleva su valor; bajo la recta, una cota naranja marca su distancia al centro, con su valor. Abajo, seis barras muestran el tamaño, sin el signo, de los términos de n igual a 0 hasta n igual a 5, cada una con su valor con dos decimales; son azules si el término es positivo y naranjas si es negativo, y una punteada marca la altura 1. Si x está a menos de 3 del centro, las barras se achican y la serie converge; si x es menos 1 o 5, todas las barras miden 1 y la serie diverge; si x está a más de 3, las barras crecen y la serie diverge; si x es 2, el centro, solo queda la primera barra. Bajo las barras, tres frases dicen la distancia, el radio y la conclusión; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'x', tex:'x', min:-2, max:6, step:0.5, value:3.5}],
    legend:'<span><i class="sw rise"></i> el punto \\(x\\) elegido y su distancia al centro, \\(|x-2|\\)</span><span><i class="sw tan"></i> radio de convergencia, \\(R=3\\), y tramo \\(-1&lt;x&lt;5\\) donde la serie converge</span><span><i class="sw sec"></i> barra de un término positivo</span><span><i class="sw rise"></i> barra de un término negativo</span><span>cada barra mide el tamaño del término, sin el signo; el número sobre ella está redondeado a dos decimales</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.x = -2 + 0.5*Math.min(16, Math.floor(p*17)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = kk(v), a = Math.abs(k), x = 2 + k/2, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', g = ci20Mcd(k, 6), p = k/g, q = 6/g, P = Math.abs(p), e = est(k), j, n, h, pn, qn, bx, y, neg, col, xm;
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* recta numérica, con el tramo donde la serie converge */
      S.line(nx(-2.5), YL, nx(6.5), YL, {color:C.ink, width:1.1});
      ci20Seg(S, nx(-1), YL, nx(5), YL, C.tan, 3.2, null, 0.8);
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (j = -2; j <= 6; j++){ c.beginPath(); c.moveTo(X(nx(j)), Y(YL) - 3); c.lineTo(X(nx(j)), Y(YL) + 3); c.stroke(); num(j < 0 ? '−' + (-j) : '' + j, X(nx(j)), Y(YL) + 11, 'center'); }
      [-1, 5].forEach(function(t){ c.beginPath(); c.arc(X(nx(t)), Y(YL), 3.8, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 1.6; c.stroke(); });
      /* el radio, a cada lado del centro */
      ci20Seg(S, nx(-1), YL + 0.7, nx(5), YL + 0.7, C.tan, 1.4); [-1, 2, 5].forEach(function(t){ ci20Seg(S, nx(t), YL + 0.62, nx(t), YL + 0.78, C.tan, 1.4); });
      ci20Seg(S, nx(-1), YL, nx(-1), YL + 0.7, C.tan, 0.9, [2, 3], 0.7); ci20Seg(S, nx(5), YL, nx(5), YL + 0.7, C.tan, 0.9, [2, 3], 0.7); ci20Seg(S, nx(2), YL, nx(2), YL + 0.7, C.ink, 0.9, [2, 3], 0.6);
      T.L('RL', nx(0.5), YL + 0.96, -50); T.L('RR', nx(3.5), YL + 0.96, -50); T.L('A', nx(2), YL + 1.0, -50);
      c.beginPath(); c.arc(X(nx(2)), Y(YL), 3, 0, 6.2832); c.fillStyle = C.ink; c.fill();
      /* el punto x y su distancia al centro */
      ci20Seg(S, nx(2), YL, nx(2), YL - 0.62, C.rise, 0.9, [2, 3], 0.7); ci20Seg(S, nx(x), YL, nx(x), YL - 0.62, C.rise, 0.9, [2, 3], 0.7);
      if (a){ ci20Seg(S, nx(2), YL - 0.62, nx(x), YL - 0.62, C.rise, 1.8); ci20Seg(S, nx(2), YL - 0.7, nx(2), YL - 0.54, C.rise, 1.8); ci20Seg(S, nx(x), YL - 0.7, nx(x), YL - 0.54, C.rise, 1.8); }
      c.beginPath(); c.arc(X(nx(x)), Y(YL), 4.2, 0, 6.2832); c.fillStyle = C.rise; c.fill();
      T.L('X' + (k + 8), nx(x), YL + 0.32, -50);
      xm = Math.max(nx(-0.6), Math.min(nx(4.6), (nx(2) + nx(x))/2)); T.L('D' + (k + 8), xm, YL - 0.95, -50);
      /* barras: tamaño de los términos n = 0…5, sin el signo */
      c.font = '600 11.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Tamaño de cada término, sin el signo (n = 0 a 5):', X(-1.2), Y(4.08));
      S.line(-0.25, YB, 4.9, YB, {color:C.ink, width:1.1}); S.line(-0.25, YB, -0.25, YB + 4.4*HB, {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (j = 0; j <= 4; j++){ c.beginPath(); c.moveTo(X(-0.25) - 3, Y(YB + j*HB)); c.lineTo(X(-0.25) + 3, Y(YB + j*HB)); c.stroke(); num('' + j, X(-0.25) - 7, Y(YB + j*HB), 'right'); }
      ci20Seg(S, -0.25, YB + HB, 4.9, YB + HB, C.ink, 0.9, [4, 3], 0.45);
      pn = 1; qn = 1;
      for (n = 0; n <= 5; n++){ bx = 0.1 + 0.8*n; h = pn/qn; neg = p < 0 && n % 2 === 1; col = neg ? C.rise : C.sec;
        if (h > 0){ S.poly([[bx, YB], [bx + 0.5, YB], [bx + 0.5, YB + h*HB], [bx, YB + h*HB]], {fill:col, alpha:0.8}); }
        else ci20Seg(S, bx, YB, bx + 0.5, YB, C.sec, 3, null, 0.8);
        num(ci20Dec(pn, qn), X(bx + 0.25), Y(YB + h*HB) - 8, 'center', C.ink); num('' + n, X(bx + 0.25), Y(YB) + 11, 'center');
        pn *= P; qn *= q; }
      num('n', X(4.9) + 5, Y(YB), 'left');
      y = Y(YB) + 34;
      txt('distancia de x al centro: ' + ci20Med(a), X(-1.2), y, 'left', C.rise);
      txt('radio de convergencia: 3', X(-1.2), y + 21, 'left', C.tan);
      txt(EST[e], X(-1.2), y + 42, 'left', e === 1 || e === 0 ? C.sec : C.rise);
      dtQue(S, 'la distancia de x al centro,', 'comparada con el radio, decide si converge.');
      T.fin();
    },
    caption:function(v){ var k = kk(v), a = Math.abs(k); return 'Con x igual a ' + ci20Med(4 + k) + ', la distancia al centro es ' + ci20Med(a) + ' y el radio es 3. ' + ['Es el centro: la serie converge y suma 1.', 'La distancia es menor que el radio: la serie converge.', 'La distancia es igual al radio: es un extremo, y en este extremo la serie diverge.', 'La distancia es mayor que el radio: la serie diverge.'][est(k)]; },
    readout:function(v){ var k = kk(v), a = Math.abs(k), e = est(k), Q = '\\\\&\\qquad ', fr = ci20Fr, g = ci20Mcd(k, 6), p = k/g, q = 6/g, P = Math.abs(p), xs = ci20Med(4 + k, 1), ds = ci20Med(k, 1), as = ci20Med(a, 1), rs = fr(p, q), L = [], s, n, pn, qn, A, g2, w, g3, l1 = [], l2 = [];
      L.push('\\text{Datos: la serie }\\displaystyle\\sum_{n=0}^{\\infty}\\dfrac{(x-2)^{n}}{3^{n}}' + Q + '\\text{Centro: }a=2.\\quad\\text{Radio: }R=3\\text{ (ejemplo 4).}' + Q + '\\text{Punto elegido: }x=' + xs);
      L.push('\\text{Distancia de }x\\text{ al centro:}' + Q + 'x-2=' + xs + '-2=' + ds + Q + '|x-2|=' + (k < 0 ? '|' + ds + '|=' : '') + as);
      L.push('\\text{Comparación con el radio:}' + Q + ['|x-2|=0\\text{: }x\\text{ es el centro.}', as + '<3\\text{: }x\\text{ está dentro del radio.}', as + '=3\\text{: }x\\text{ es un extremo, }' + (k < 0 ? 'a-R=2-3=-1.' : 'a+R=2+3=5.'), as + '>3\\text{: }x\\text{ está fuera del radio.}'][e]);
      s = '\\text{Cada término es una potencia de un cociente:}' + Q + '\\dfrac{(x-2)^{n}}{3^{n}}=\\left(\\dfrac{x-2}{3}\\right)^{n}=r^{\\,n},\\quad r=\\dfrac{x-2}{3}' + Q + 'r=\\dfrac{' + ds + '}{3}';
      if (k % 2){ s += '=\\dfrac{' + ds + '\\cdot 2}{3\\cdot 2}=\\dfrac{' + k + '}{6}'; if (g > 1) s += '=' + rs; else if (k < 0) s += '=' + rs; }
      else if (g > 2 || k === 0) s += '=' + rs; else if (k < 0) s += '=' + rs;
      L.push(s);
      if (e === 0) L.push('\\text{Términos (barras): con }r=0,' + Q + 'n=0\\text{: }0^{0}=1\\text{ (convención)}' + Q + 'n\\ge 1\\text{: }0^{n}=0' + Q + '\\text{Tamaños: }1,\\ 0,\\ 0,\\ 0,\\ 0,\\ 0');
      else if (P === q) L.push('\\text{Tamaño de los términos (barras):}' + Q + '|r|^{n}=1^{n}=1\\text{ para todo }n' + Q + '\\text{Tamaños: }1,\\ 1,\\ 1,\\ 1,\\ 1,\\ 1' + (p < 0 ? Q + '\\text{Como }r=-1\\text{, los signos se alternan:}' + Q + '1-1+1-1+1-1+\\cdots' : Q + '\\text{Como }r=1\\text{, la serie es }1+1+1+1+\\cdots'));
      else { pn = 1; qn = 1; for (n = 0; n <= 5; n++){ l1.push(n === 0 ? '1' : '\\dfrac{' + pn + '}{' + qn + '}'); l2.push(((100*pn) % qn === 0 ? '' : '\\approx ') + ci20Dec(pn, qn).replace(',', '{,}')); pn *= P; qn *= q; }
        L.push('\\text{Tamaño de los términos (barras):}' + Q + '|r|^{n}=\\left(\\dfrac{' + P + '}{' + q + '}\\right)^{n}=\\dfrac{' + P + '^{n}}{' + q + '^{n}}' + Q + '\\text{Con }n=0,\\ 1,\\ 2,\\ 3,\\ 4,\\ 5\\text{:}' + Q + l1.slice(0, 3).join(',\\quad ') + ',' + Q + l1.slice(3).join(',\\quad ') + Q + '\\text{Con dos decimales:}' + Q + l2.slice(0, 3).join(';\\quad ') + ';' + Q + l2.slice(3).join(';\\quad ')
          + Q + (P < q ? '\\text{Cada barra es más baja que la anterior.}' : '\\text{Cada barra es más alta que la anterior.}') + (p < 0 ? Q + '\\text{Como }r<0\\text{, los términos de }n\\text{ impar son}' + Q + '\\text{negativos (barras naranjas).}' : '')); }
      if (e === 0) L.push('\\text{Sumas parciales: }S_{0}=1,\\ S_{1}=1+0=1,\\ \\ldots' + Q + '\\text{Todas valen }1\\text{: la serie converge y suma }1.' + Q + '\\text{Caso límite: en el centro, toda serie de}' + Q + '\\text{potencias converge y suma }c_{0}\\text{; aquí, }c_{0}=\\dfrac{1}{3^{0}}=1.');
      else if (e === 1){ A = q - p; g2 = ci20Mcd(q, A); s = '\\text{Es geométrica de razón }r=' + rs + '\\text{, y }|r|=' + fr(P, q) + '<1\\text{:}' + Q + '\\text{converge (hoja «Series geométricas}' + Q + '\\text{infinitas») y su suma es }\\dfrac{1}{1-r}.' + Q + '1-r=1' + (p < 0 ? '-\\left(' + rs + '\\right)=1+' + fr(P, q) : '-' + rs) + '=\\dfrac{' + q + '}{' + q + '}' + (p < 0 ? '+' : '-') + fr(P, q) + '=\\dfrac{' + A + '}{' + q + '}'
          + Q + '\\dfrac{1}{1-r}=1:\\dfrac{' + A + '}{' + q + '}=' + (A === 1 ? '\\dfrac{' + q + '}{1}=' + q : '\\dfrac{' + q + '}{' + A + '}' + (g2 > 1 ? '=' + fr(q/g2, A/g2) : ''));
        w = 6 - k; s += Q + '\\text{Comprobación con la suma del ejemplo 4:}' + Q + '\\dfrac{3}{5-x}=\\dfrac{3}{5-' + (4 + k < 0 ? '(' + xs + ')' : xs) + '}=\\dfrac{3}{' + ci20Med(w, 1) + '}';
        if (w % 2){ s += Q + '\\phantom{\\dfrac{3}{5-x}}=\\dfrac{3\\cdot 2}{' + ci20Med(w, 1) + '\\cdot 2}=\\dfrac{6}{' + w + '}'; g3 = ci20Mcd(6, w); if (w === 1) s += '=6'; else if (g3 > 1) s += '=' + fr(6/g3, w/g3); }
        else { g3 = ci20Mcd(3, w/2); if (w === 2) s += '=3'; else if (g3 > 1) s += '=' + fr(3/g3, w/2/g3); }
        L.push(s + '\\ \\checkmark'); }
      else if (e === 2) L.push(p > 0 ? '\\text{Sumas parciales: }S_{0}=1,\\ S_{1}=1+1=2,' + Q + 'S_{2}=2+1=3,\\ \\ldots\\ \\text{ En general, }S_{n}=n+1.' + Q + '\\text{Superan cualquier número: la serie diverge.}' + Q + '\\text{En un extremo el teorema no dice nada: se}' + Q + '\\text{revisa aparte, como aquí. En }x=5\\text{ diverge.}'
        : '\\text{Los términos valen }1\\text{ o }-1\\text{: su tamaño es }1' + Q + '\\text{y no tienden a }0.' + Q + '\\text{Por el criterio del enésimo término (hoja}' + Q + '\\text{«Criterio del enésimo término»), la serie}' + Q + '\\text{diverge.}' + Q + '\\text{En un extremo el teorema no dice nada: se}' + Q + '\\text{revisa aparte, como aquí. En }x=-1\\text{ diverge.}');
      else L.push('\\text{Como }|r|=' + fr(P, q) + '>1\\text{, todos los tamaños son}' + Q + '\\text{mayores o iguales que }1\\text{: los términos no}' + Q + '\\text{tienden a }0.' + Q + '\\text{Por el criterio del enésimo término (hoja}' + Q + '\\text{«Criterio del enésimo término»), la serie}' + Q + '\\text{diverge.}');
      L.push('\\text{Qué significa: la serie converge cuando}' + Q + '|x-2|<3\\text{, es decir, }-1<x<5\\text{ (tramo burdeo).}' + Q + ['\\text{El centro siempre está en ese tramo.}', '\\text{Este }x\\text{ está en ese tramo.}', '\\text{Este }x\\text{ es un extremo y no entra en el tramo.}', '\\text{Este }x\\text{ queda fuera.}'][e] + Q + '\\text{Intervalo de convergencia: }(-1,\\,5).');
      return dtPasos(L); }
  };
})());
