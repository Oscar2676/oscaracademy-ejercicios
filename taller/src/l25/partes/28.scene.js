/* L25 H28 · una función como una serie geométrica: 1/(1 − x) = Σ xⁿ solo si |x| < 1; las sumas parciales se pegan a la curva dentro de (−1, 1) y se separan fuera */
function fg28Cl(t){ return Math.max(0, Math.min(1, t)); }
function fg28Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción [p, q] irreducible, con q > 0 */
function fg28Fr(p, q){ if (q < 0){ p = -p; q = -q; } var g = fg28Mcd(p, q); return [p/g, q/g]; }
function fg28T(f, ch){ var p = f[0], q = f[1], s = p < 0 ? '-' : ''; p = Math.abs(p); return q === 1 ? s + p : s + (ch ? '\\tfrac{' : '\\dfrac{') + p + '}{' + q + '}'; }
/* fracción tal como viene, sin simplificar (para mostrar la amplificación) */
function fg28Raw(p, q){ return (p < 0 ? '-' : '') + '\\dfrac{' + Math.abs(p) + '}{' + q + '}'; }
function fg28Par(f){ return f[0] < 0 ? '\\left(' + fg28T(f) + '\\right)' : fg28T(f); }
function fg28Abs(f){ return [Math.abs(f[0]), f[1]]; }
function fg28P(f){ var p = f[0], q = f[1], s = p < 0 ? '−' : ''; p = Math.abs(p); return q === 1 ? s + p : s + p + '/' + q; }
/* |p/q| redondeado a d decimales (mitad hacia arriba), con aritmética entera; [texto con punto, ¿exacto?] */
function fg28Rd(f, d){ var p = Math.abs(f[0]), q = f[1], m = Math.pow(10, d), n = Math.floor((2*p*m + q)/(2*q)), r = '' + (n % m); while (r.length < d) r = '0' + r; return [Math.floor(n/m) + (d ? '.' + r : ''), (p*m) % q === 0]; }
/* valor decimal para ubicarlo en el eje: exacto si tiene 3 decimales o menos; si no, redondeado a 2 (a 3 si es menor que 0,1). [signo de relación, texto con punto y signo] */
function fg28Ap(f){ var d, o, sg = f[0] < 0 ? '-' : '';
  if (f[1] === 1) return null;
  for (d = 1; d <= 3; d++){ o = fg28Rd(f, d); if (o[1]) return ['=', sg + o[0]]; }
  o = fg28Rd(f, 10*Math.abs(f[0]) < f[1] ? 3 : 2); return ['\\approx ', sg + o[0]]; }
function fg28ApT(f){ var o = fg28Ap(f); return o ? o[0] + o[1].replace('.', '{,}') : ''; }
function fg28ApP(f){ var o = fg28Ap(f); return o ? (o[0] === '=' ? ' = ' : ' ≈ ') + o[1].replace('.', ',').replace('-', '−') : ''; }
/* A + B paso a paso (el denominador de B es múltiplo del de A): [cadena TeX, resultado] */
function fg28Suma(A, B){ var D = B[1], m = D/A[1], R = fg28Fr(A[0]*m + B[0], D), op = B[0] < 0 ? '-' : '+', Bt = fg28T(fg28Abs(B)), s = fg28T(A) + op + Bt;
  if (D > 1 && m > 1) s += '=' + fg28Raw(A[0]*m, D) + op + Bt;
  return [s + '=' + fg28T(R), R]; }
function fg28Curva(S, fn, a, b, col, wd, gx, gy){ var c = S.ctx, n = 150, i, t, y, pen = false; if (b <= a) return; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash([]); c.beginPath();
  for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; y = fn(t); if (!isFinite(y) || y > 60 || y < -60){ pen = false; continue; } if (pen) c.lineTo(S.X(gx(t)), S.Y(gy(y))); else c.moveTo(S.X(gx(t)), S.Y(gy(y))); pen = true; } c.stroke(); }
function fg28F(x){ return 1/(1 - x); }
function fg28S(n){ return function(x){ var s = 0, p = 1, i; for (i = 0; i <= n; i++){ s += p; p *= x; } return s; }; }

OA.scene('fge-idea', (function(){
  var N = 7, XA = -1.6, XB = 1.6, YA = -2.5, YB = 4, SN = [fg28S(0), fg28S(1), fg28S(2), fg28S(3)];
  var PZ = [['LF', 'f', 'f', 'c-tan'], ['LS0', 's_{0}', 's₀', 'c-sec'], ['LS1', 's_{1}', 's₁', 'c-sec'], ['LS2', 's_{2}', 's₂', 'c-sec'], ['LS3', 's_{3}', 's₃', 'c-sec'],
    ['CV', 'f(x)=\\tfrac{1}{1-x}', 'f(x) = 1/(1 − x)', 'c-tan'], ['A5', 'f\\!\\left(\\tfrac{1}{2}\\right)=2', 'f(1/2) = 2', 'c-tan'], ['IV', '-1<x<1', '−1 < x < 1', 'c-alt'],
    ['Q', '\\tfrac{1}{1-x}\\ \\text{¿es una suma de potencias de }x\\text{?}', '1/(1 − x) ¿es una suma de potencias de x?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí, pero solo si }-1<x<1\\text{: }\\tfrac{1}{1-x}=\\textstyle\\sum_{n=0}^{\\infty}x^{n}', '⟹ sí, pero solo si −1 < x < 1: 1/(1 − x) = Σ xⁿ', 'diff'],
    ['R1', 'f(x)=\\tfrac{1}{1-x},\\qquad x\\neq 1', 'f(x) = 1/(1 − x), x ≠ 1', ''],
    ['R2', 's_{0}(x)=1,\\qquad s_{1}(x)=1+x', 's₀(x) = 1, s₁(x) = 1 + x', ''],
    ['R3', 's_{2}(x)=1+x+x^{2}', 's₂(x) = 1 + x + x²', ''],
    ['R4', 's_{3}(x)=1+x+x^{2}+x^{3}', 's₃(x) = 1 + x + x² + x³', ''],
    ['R5', 'x=\\tfrac{1}{2}\\text{:}\\quad 1,\\ \\tfrac{3}{2},\\ \\tfrac{7}{4},\\ \\tfrac{15}{8}\\ \\to 2=f\\!\\left(\\tfrac{1}{2}\\right)', 'x = 1/2: 1, 3/2, 7/4, 15/8 → 2 = f(1/2)', ''],
    ['R6', 'x=-\\tfrac{3}{2}\\text{:}\\quad 1,\\ -\\tfrac{1}{2},\\ \\tfrac{7}{4},\\ -\\tfrac{13}{8}\\text{; lejos de }f=\\tfrac{2}{5}', 'x = −3/2: 1, −1/2, 7/4, −13/8; lejos de f = 2/5', ''],
    ['R7', '|x|<1\\ \\Longrightarrow\\ \\tfrac{1}{1-x}=\\textstyle\\sum_{n=0}^{\\infty}x^{n}', '|x| < 1 ⟹ 1/(1 − x) = Σ xⁿ (n ≥ 0)', 'diff']];
  var TXT = [['Burdeo: la curva de la función. En 1 no existe', '(punteada gris): se dividiría por cero.'],
    ['Azul: las dos sumas de potencias más cortas.', 'Pasan por el mismo punto que la curva, en 0.'],
    ['Se suma el término siguiente: la parábola', 'acompaña a la curva en un tramo más largo.'],
    ['Otro término más: cerca de 0 casi no se', 'distingue de la curva. Lejos de 0, sí.'],
    ['Verde, en 0,5: las cuatro sumas suben hacia', 'la curva; cada vez les falta la mitad.'],
    ['Naranja, en −1,5: las sumas saltan arriba y', 'abajo, cada vez más lejos de la curva.'],
    ['Solo dentro de la franja verde, entre −1 y 1,', 'la serie completa suma lo que vale la curva.']];
  function gx(x){ return 2.45 + 1.75*x; } function gy(y){ return 3.9 + 0.72*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-3.8, y1:9.0}, aspect:12.8/6.6,
    aria:'Arriba, una franja dice qué muestra: las sumas parciales se pegan a la curva solo entre menos 1 y 1; fuera, se separan. Animación en siete pasos. Es una gráfica: en horizontal va x, de menos 1,6 a 1,6; en vertical, los valores, de menos 2,5 a 4. Uno: se traza en burdeo la curva de la función 1 dividido por 1 menos x; tiene dos ramas, separadas por una punteada gris vertical en x igual a 1, donde la función no existe. Dos: se trazan en azul la recta horizontal de altura 1, que es la suma parcial s sub cero, y la recta inclinada 1 más x, que es s sub uno; las dos pasan por el punto de la curva en x igual a 0. Tres: se traza en azul la parábola 1 más x más x al cuadrado, s sub dos. Cuatro: se traza en azul la curva 1 más x más x al cuadrado más x al cubo, s sub tres; cerca de 0 casi coincide con la curva burdeo. Cinco: una punteada verde vertical en x igual a 0,5 marca con puntos azules los valores de las cuatro sumas parciales, 1, tres medios, siete cuartos y quince octavos, que suben hacia el punto de la curva, de altura 2. Seis: una punteada naranja vertical en x igual a menos 1,5 marca los valores 1, menos un medio, siete cuartos y menos trece octavos, que saltan arriba y abajo y se alejan del punto de la curva, de altura dos quintos. Siete: se sombrea en verde la franja entre x igual a menos 1 y x igual a 1, con anillos abiertos en los extremos; dentro, las curvas azules van pegadas a la burdeo; fuera, se separan. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella: sí, pero solo si x está entre menos 1 y 1. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función \\(f(x)=\\tfrac{1}{1-x}\\)</span><span><i class="sw sec"></i> las sumas parciales \\(s_{0},\\ s_{1},\\ s_{2},\\ s_{3}\\) y sus valores</span><span><i class="sw alt"></i> prueba en \\(x=0{,}5\\) y franja \\(-1&lt;x&lt;1\\), donde la serie tiene suma</span><span><i class="sw rise"></i> prueba en \\(x=-1{,}5\\), fuera de la franja</span><span>punteada gris: \\(x=1\\), donde la función no existe</span>',
    anim:{run:49000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, otx = oaTxt(S), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, xe, bx = X(gx(XA)), by = Y(gy(YB)), bw = X(gx(XB)) - bx, bh = Y(gy(YA)) - by;
      function txt(tx, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(tx, X(x), Y(y)); }
      function num(tx, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function seg(x0, y0, x1, y1, col, wd, dash, al){ c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(gx(x0)), Y(gy(y0))); c.lineTo(X(gx(x1)), Y(gy(y1))); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      function punto(x, y, col, al){ if (al <= 0) return; c.globalAlpha = al; c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 2.6, 0, 6.2832); c.fillStyle = col; c.fill(); c.globalAlpha = 1; }
      function anillo(x, y, col, al){ if (al <= 0) return; c.globalAlpha = al; c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 3.6, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); c.globalAlpha = 1; }
      /* paso 7: franja donde la serie tiene suma */
      if (k === 7) S.poly([[gx(-1), gy(YA)], [gx(1), gy(YA)], [gx(1), gy(YB)], [gx(-1), gy(YB)]], {fill:C.alt, alpha:0.12*u});
      /* marco: escala vertical a la izquierda y escala horizontal abajo; adentro, las rectas x = 0 e y = 0 */
      seg(XA, 0, XB, 0, C.ink, 0.8, null, 0.45); seg(0, YA, 0, YB, C.ink, 0.8, null, 0.45);
      S.line(gx(XA), gy(YA), gx(XB), gy(YA), {color:C.ink, width:1.1}); S.line(gx(XA), gy(YA), gx(XA), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1.5, '−1,5'], [-1, '−1'], [-0.5, '−0,5'], [0, '0'], [0.5, '0,5'], [1, '1'], [1.5, '1,5']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(q[0])), by + bh - 3); c.lineTo(X(gx(q[0])), by + bh + 3); c.stroke(); num(q[1], X(gx(q[0])), by + bh + 11, 'center'); });
      for (i = -2; i <= 4; i++){ c.beginPath(); c.moveTo(bx - 3, Y(gy(i))); c.lineTo(bx + 3, Y(gy(i))); c.stroke(); num(('' + i).replace('-', '−'), bx - 5, Y(gy(i)), 'right'); }
      /* curvas, recortadas al marco */
      c.save(); c.beginPath(); c.rect(bx, by, bw, bh); c.clip();
      seg(1, YA, 1, YB, C.muted || '#6b6b6b', 1, [4, 4], k === 1 ? u : 1);
      if (k >= 2){ w = k === 2 ? fg28Cl(u*2) : 1; fg28Curva(S, SN[0], XA, XA + (XB - XA)*w, C.sec, 1.3, gx, gy); w = k === 2 ? fg28Cl(u*2 - 1) : 1; fg28Curva(S, SN[1], XA, XA + (XB - XA)*w, C.sec, 1.3, gx, gy); }
      if (k >= 3) fg28Curva(S, SN[2], XA, XA + (XB - XA)*(k === 3 ? u : 1), C.sec, 1.3, gx, gy);
      if (k >= 4) fg28Curva(S, SN[3], XA, XA + (XB - XA)*(k === 4 ? u : 1), C.sec, 1.7, gx, gy);
      xe = XA + (XB - XA)*(k === 1 ? u : 1); fg28Curva(S, fg28F, XA, Math.min(xe, 0.983), C.tan, 2.1, gx, gy); if (xe > 1.017) fg28Curva(S, fg28F, 1.017, xe, C.tan, 2.1, gx, gy);
      /* paso 5: prueba dentro, en x = 1/2 */
      if (k >= 5){ w = k === 5 ? u : 1; seg(0.5, YA, 0.5, 2, C.alt, 1.2, [4, 3], Math.min(1, w*3));
        for (i = 0; i < 4; i++) punto(0.5, SN[i](0.5), C.sec, fg28Cl(w*5 - i - 0.6)); anillo(0.5, 2, C.tan, fg28Cl(w*5 - 4)); }
      /* paso 6: prueba fuera, en x = −3/2 */
      if (k >= 6){ w = k === 6 ? u : 1; seg(-1.5, YA, -1.5, 1.75, C.rise, 1.2, [4, 3], Math.min(1, w*3));
        for (i = 0; i < 4; i++) punto(-1.5, SN[i](-1.5), C.sec, fg28Cl(w*5 - i - 0.6)); anillo(-1.5, 0.4, C.tan, fg28Cl(w*5 - 4)); }
      c.restore();
      /* rótulos de las curvas, junto a su extremo izquierdo */
      if (k > 1 || u > 0.3) L('LF', gx(XA), gy(fg28F(XA)), -100, -15); if (k > 1 || u > 0.8) L('CV', gx(0.52), gy(3.5), -100);
      if (k > 2 || (k === 2 && u > 0.2)) L('LS0', gx(XA), gy(1), -100, -15); if (k > 2 || (k === 2 && u > 0.7)) L('LS1', gx(XA), gy(SN[1](XA)), -100, -15);
      if (k > 3 || (k === 3 && u > 0.3)) L('LS2', gx(XA), gy(SN[2](XA)), -100, -15); if (k > 4 || (k === 4 && u > 0.3)) L('LS3', gx(XA), gy(SN[3](XA)), -100, -15);
      if (k > 5 || (k === 5 && u > 0.9)) L('A5', gx(0.5), gy(2), -100, -6, -12);
      /* paso 7: extremos abiertos y nombres de las zonas */
      if (k === 7){ c.globalAlpha = u; c.strokeStyle = C.alt; c.lineWidth = 3; c.beginPath(); c.moveTo(X(gx(-1)), by + bh); c.lineTo(X(gx(1)), by + bh); c.stroke(); c.globalAlpha = 1; anillo(-1, YA, C.alt, u); anillo(1, YA, C.alt, u);
        if (u > 0.5){ L('IV', gx(0), gy(-2.05), -50); otx('dentro: se pegan', X(gx(0)), Y(gy(-1.45)), 'center', C.alt); otx('fuera', X(gx(-1.3)), Y(gy(3.6)), 'center', C.rise); otx('fuera', X(gx(1.3)), Y(gy(-0.9)), 'center', C.rise); } }
      L('Q', -1.2, 7.65, 0); if (k === N && u > 0.5) L('F', -1.2, 7.2, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 1.6); txt(TXT[k - 1][1], -1.2, 1.6 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(7.65));
      dtQue(S, 'las sumas parciales se pegan a la', 'curva solo entre −1 y 1; fuera, se separan.');
      T.fin();
      oaReg(S, k, N, -1.2, 0.35, [6, 36, 66, 96, 126, 156, 186]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, H = '\\left(' + f(1, 2) + '\\right)', M = '\\left(-' + f(3, 2) + '\\right)', R = [
      '\\text{Dato: la función }f(x)=\\dfrac{1}{1-x}' + Q + '\\text{En }x=1\\text{ no existe: el denominador es }1-1=0.' + Q + '\\text{Tres valores, para ubicar la curva:}' + Q + 'f(0)=\\dfrac{1}{1-0}=\\dfrac{1}{1}=1' + Q + 'f(-1)=\\dfrac{1}{1-(-1)}=\\dfrac{1}{1+1}=' + f(1, 2) + Q + 'f\\left(' + f(3, 2) + '\\right)=\\dfrac{1}{1-\\frac{3}{2}}=\\dfrac{1}{-\\frac{1}{2}}=-2' + Q + '\\text{Pregunta: ¿se puede escribir }f(x)\\text{ como una}' + Q + '\\text{suma de potencias de }x\\text{?}',
      '\\text{Se prueba con sumas de potencias de }x.' + Q + '\\text{La más corta: }s_{0}(x)=x^{0}=1' + Q + '\\text{Es constante: una recta horizontal.}' + Q + '\\text{Con un término más: }s_{1}(x)=1+x' + Q + '\\text{Es una recta inclinada.}' + Q + '\\text{En }x=0\\text{: }s_{0}(0)=1,\\qquad s_{1}(0)=1+0=1' + Q + '\\text{Lo mismo que }f(0)=1\\text{: las tres pasan por}' + Q + '\\text{el mismo punto.}',
      '\\text{Se suma el término siguiente, }x^{2}\\text{:}' + Q + 's_{2}(x)=s_{1}(x)+x^{2}=1+x+x^{2}' + Q + '\\text{Es una parábola. Cerca de }0\\text{ acompaña a la}' + Q + '\\text{curva en un tramo más largo que la recta.}',
      '\\text{Se suma el término siguiente, }x^{3}\\text{:}' + Q + 's_{3}(x)=s_{2}(x)+x^{3}=1+x+x^{2}+x^{3}' + Q + '\\text{En general, con sumatoria:}' + Q + 's_{N}(x)=\\displaystyle\\sum_{n=0}^{N}x^{n}=1+x+x^{2}+\\cdots+x^{N}' + Q + '\\text{Tiene }N+1\\text{ términos.}',
      '\\text{Prueba dentro: }x=' + f(1, 2) + '=0{,}5' + Q + '\\text{Potencias: }' + H + '^{2}=' + f(1, 4) + ',\\qquad ' + H + '^{3}=' + f(1, 8) + Q + 's_{0}=1' + Q + 's_{1}=1+' + f(1, 2) + '=' + f(2, 2) + '+' + f(1, 2) + '=' + f(3, 2) + Q + 's_{2}=' + f(3, 2) + '+' + f(1, 4) + '=' + f(6, 4) + '+' + f(1, 4) + '=' + f(7, 4) + Q + 's_{3}=' + f(7, 4) + '+' + f(1, 8) + '=' + f(14, 8) + '+' + f(1, 8) + '=' + f(15, 8)
        + Q + '\\text{Función: }f\\left(' + f(1, 2) + '\\right)=\\dfrac{1}{1-\\frac{1}{2}}=\\dfrac{1}{\\frac{1}{2}}=2' + Q + '\\text{Lo que le falta a cada suma para llegar a }2\\text{:}' + Q + '2-1=1,\\qquad 2-' + f(3, 2) + '=' + f(4, 2) + '-' + f(3, 2) + '=' + f(1, 2) + Q + '2-' + f(7, 4) + '=' + f(8, 4) + '-' + f(7, 4) + '=' + f(1, 4) + Q + '2-' + f(15, 8) + '=' + f(16, 8) + '-' + f(15, 8) + '=' + f(1, 8) + Q + '\\text{Cada vez falta la mitad: se acercan a }2.',
      '\\text{Prueba fuera: }x=-' + f(3, 2) + '=-1{,}5' + Q + '\\text{Potencias: }' + M + '^{2}=' + f(9, 4) + ',\\qquad ' + M + '^{3}=-' + f(27, 8) + Q + 's_{0}=1' + Q + 's_{1}=1-' + f(3, 2) + '=' + f(2, 2) + '-' + f(3, 2) + '=-' + f(1, 2) + Q + 's_{2}=-' + f(1, 2) + '+' + f(9, 4) + '=-' + f(2, 4) + '+' + f(9, 4) + '=' + f(7, 4) + Q + 's_{3}=' + f(7, 4) + '-' + f(27, 8) + '=' + f(14, 8) + '-' + f(27, 8) + '=-' + f(13, 8)
        + Q + '\\text{Función: }f\\left(-' + f(3, 2) + '\\right)=\\dfrac{1}{1+\\frac{3}{2}}=\\dfrac{1}{\\frac{5}{2}}=' + f(2, 5) + Q + '\\text{Distancia de cada suma a }' + f(2, 5) + '\\text{:}' + Q + '1-' + f(2, 5) + '=' + f(5, 5) + '-' + f(2, 5) + '=' + f(3, 5) + Q + f(2, 5) + '+' + f(1, 2) + '=' + f(4, 10) + '+' + f(5, 10) + '=' + f(9, 10) + Q + f(7, 4) + '-' + f(2, 5) + '=' + f(35, 20) + '-' + f(8, 20) + '=' + f(27, 20) + Q + f(2, 5) + '+' + f(13, 8) + '=' + f(16, 40) + '+' + f(65, 40) + '=' + f(81, 40)
        + Q + '\\text{En decimales: }0{,}6;\\ \\ 0{,}9;\\ \\ 1{,}35;\\ \\ 2{,}025.' + Q + '\\text{Las distancias crecen: se alejan.}',
      '\\text{Lo que falta, para todo }x\\neq 1\\text{ (recuadro):}' + Q + 'f(x)-s_{N}(x)=\\dfrac{x^{N+1}}{1-x}' + Q + '\\text{Si }|x|<1\\text{, }x^{N+1}\\text{ tiene límite }0' + Q + '\\text{(se usa sin demostrar: aviso de rigor),}' + Q + '\\text{y lo que falta también tiene límite }0.' + Q + '\\text{Respuesta: sí, pero solo si }-1<x<1\\text{:}' + Q + '\\dfrac{1}{1-x}=\\displaystyle\\sum_{n=0}^{\\infty}x^{n}=1+x+x^{2}+x^{3}+\\cdots' + Q + '\\text{Si }|x|\\ge 1\\text{, la serie no tiene suma, aunque}' + Q + '\\text{la función exista (para todo }x\\neq 1\\text{).}' + Q + '\\text{Qué significa: función y serie son iguales}' + Q + '\\text{solo dentro de la franja verde.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());

/* número ↔ figura: se elige x (de −1,5 a 1,5, de cuarto en cuarto); se comparan f(x) = 1/(1 − x) y la suma parcial s₃(x) = 1 + x + x² + x³; la diferencia es x⁴/(1 − x) */
OA.scene('fge-vivo', (function(){
  var XA = -1.6, XB = 1.6, YA = -4.5, YB = 8.5, Q = '\\\\&\\qquad ', S3 = fg28S(3), DAT = [], k,
    PZ = [['MF', 'f(x)', 'f(x)', 'c-tan'], ['MS', 's_{3}(x)', 's₃(x)', 'c-sec']];
  function gx(x){ return 2.45 + 1.75*x; } function gy(y){ return 4.69 + 0.36*y; }
  function cual(v){ return Math.max(0, Math.min(12, Math.round(((v.x == null ? 0.5 : v.x) + 1.5)*4))); }
  for (k = 0; k <= 12; k++) (function(k){
    var x = fg28Fr(k - 6, 4), e = {k:k, x:(k - 6)/4, X:x}, xt = fg28T(x), xc = fg28T(x, 1), xd = fg28Rd(x, x[1] === 1 ? 0 : x[1] === 2 ? 1 : 2)[0], xdt = (x[0] < 0 ? '-' : '') + xd.replace('.', '{,}'), xdp = (x[0] < 0 ? '−' : '') + xd.replace('.', ','),
      xs = x[1] === 1 ? 'x=' + xt : 'x=' + xc + '=' + xdt, xsp = x[1] === 1 ? 'x = ' + fg28P(x) : 'x = ' + fg28P(x) + ' = ' + xdp,
      p2 = fg28Fr(x[0]*x[0], x[1]*x[1]), p3 = fg28Fr(p2[0]*x[0], p2[1]*x[1]), p4 = fg28Fr(p3[0]*x[0], p3[1]*x[1]), a1, a2, a3, s, w, fv, D, d, d2, n1, n2, g, ax = fg28Abs(x), den, inv, R,
      R0 = '\\text{Dato: }' + (x[1] === 1 ? 'x=' + xt : 'x=' + xt + '=' + xdt) + Q + '\\text{Función: }f(x)=\\dfrac{1}{1-x}' + Q + '\\text{Suma parcial de cuatro términos:}' + Q + 's_{3}(x)=\\displaystyle\\sum_{n=0}^{3}x^{n}=1+x+x^{2}+x^{3}';
    e.xp = x[1] === 1 ? fg28P(x) : xdp;
    if (k === 6){ /* x = 0: caso límite */
      e.s = [1, 1]; e.f = [1, 1]; e.d = [0, 1];
      PZ.push(['H6', 'x=0\\text{: el centro del intervalo}', 'x = 0: el centro del intervalo', 'pt']);
      R = [R0, '\\text{Potencias, cada una es la anterior por }x\\text{:}' + Q + 'x^{2}=0\\cdot 0=0' + Q + 'x^{3}=0\\cdot 0=0',
        '\\text{Suma parcial: }s_{3}(0)=1+0+0+0=1',
        '\\text{Función. Resta del denominador: }1-0=1' + Q + 'f(0)=\\dfrac{1}{1}=1',
        '\\text{Diferencia: función menos suma parcial.}' + Q + 'f(0)-s_{3}(0)=1-1=0',
        '\\text{Comprobación con la fórmula del recuadro:}' + Q + 'f(x)-s_{3}(x)=\\dfrac{x^{4}}{1-x}=x^{4}\\cdot f(x)' + Q + 'x^{4}=0\\cdot 0=0' + Q + '0\\cdot 1=0\\ \\checkmark',
        '\\text{Se compara }|x|\\text{ con }1\\text{: }|0|=0<1\\text{: dentro.}' + Q + '\\text{Qué significa: caso límite. En }x=0\\text{ todas}' + Q + '\\text{las sumas parciales valen }1\\text{, lo mismo que}' + Q + '\\text{la función: las curvas se tocan y la}' + Q + '\\text{diferencia es }0.'];
    } else if (k === 10){ /* x = 1: ni función ni suma */
      e.s = [4, 1]; e.f = null; e.d = null;
      PZ.push(['H10', 'x=1\\text{: borde del intervalo, }|x|=1', 'x = 1: borde del intervalo, |x| = 1', 'pt']);
      R = [R0, '\\text{Potencias, cada una es la anterior por }x\\text{:}' + Q + 'x^{2}=1\\cdot 1=1' + Q + 'x^{3}=1\\cdot 1=1',
        '\\text{Suma parcial, de a un término:}' + Q + '1+x=1+1=2' + Q + '\\text{más }x^{2}\\text{: }2+1=3' + Q + '\\text{más }x^{3}\\text{: }3+1=4' + Q + 's_{3}(1)=4',
        '\\text{Función. Resta del denominador: }1-1=0' + Q + '\\text{No se puede dividir por }0\\text{: }f(1)\\text{ no existe.}' + Q + '\\text{El }1\\text{ no está en el dominio de }f.',
        '\\text{Diferencia: no hay, porque no hay }f(1).' + Q + '\\text{La fórmula del recuadro pide }x\\neq 1.',
        '\\text{La serie en }x=1\\text{ es }1+1+1+1+\\cdots' + Q + '\\text{Sumas parciales: }1,\\ 2,\\ 3,\\ 4,\\ \\ldots' + Q + '\\text{En general }s_{N}(1)=N+1\\text{: crecen sin tope.}' + Q + '\\text{La serie no tiene suma.}',
        '\\text{Se compara }|x|\\text{ con }1\\text{: }|1|=1\\ge 1\\text{: fuera.}' + Q + '\\text{Qué significa: caso límite, el borde derecho.}' + Q + '\\text{Aquí no hay función ni suma de la serie.}'];
    } else if (k === 2){ /* x = −1: hay función, no hay suma */
      e.s = [0, 1]; e.f = [1, 2]; e.d = [1, 2];
      PZ.push(['H2', 'x=-1\\text{: borde del intervalo, }|x|=1', 'x = −1: borde del intervalo, |x| = 1', 'pt']);
      R = [R0, '\\text{Potencias, cada una es la anterior por }x\\text{:}' + Q + 'x^{2}=(-1)\\cdot(-1)=1' + Q + 'x^{3}=1\\cdot(-1)=-1',
        '\\text{Suma parcial, de a un término:}' + Q + '1+x=1-1=0' + Q + '\\text{más }x^{2}\\text{: }0+1=1' + Q + '\\text{más }x^{3}\\text{: }1-1=0' + Q + 's_{3}(-1)=0',
        '\\text{Función. Resta del denominador:}' + Q + '1-x=1-(-1)=1+1=2' + Q + 'f(-1)=\\dfrac{1}{2}=0{,}5',
        '\\text{Diferencia: función menos suma parcial.}' + Q + 'f(-1)-s_{3}(-1)=\\dfrac{1}{2}-0=\\dfrac{1}{2}',
        '\\text{Comprobación con la fórmula del recuadro:}' + Q + 'f(x)-s_{3}(x)=\\dfrac{x^{4}}{1-x}=x^{4}\\cdot f(x)' + Q + 'x^{4}=(-1)\\cdot(-1)=1' + Q + '1\\cdot\\dfrac{1}{2}=\\dfrac{1}{2}\\ \\checkmark',
        '\\text{Se compara }|x|\\text{ con }1\\text{: }|-1|=1\\ge 1\\text{: fuera.}' + Q + '\\text{La serie es }1-1+1-1+\\cdots' + Q + '\\text{Sumas parciales: }1,\\ 0,\\ 1,\\ 0,\\ \\ldots\\text{ No se}' + Q + '\\text{acercan a un solo número: no tiene suma.}' + Q + '\\text{Con un término más, la diferencia se}' + Q + '\\text{multiplica por }x\\text{: }\\dfrac{1}{2}\\cdot(-1)=-\\dfrac{1}{2}' + Q + '\\text{Qué significa: caso límite. La función}' + Q + '\\text{vale }\\dfrac{1}{2}\\text{, pero la serie no lo entrega:}' + Q + '\\text{la diferencia nunca se achica.}'];
    } else {
      a1 = fg28Suma([1, 1], x); a2 = fg28Suma(a1[1], p2); a3 = fg28Suma(a2[1], p3); s = a3[1];
      w = fg28Fr(x[1] - x[0], x[1]); inv = fg28Fr(w[1], w[0]); fv = inv;
      D = fv[1]*s[1]/fg28Mcd(fv[1], s[1]); n1 = fv[0]*D/fv[1]; n2 = s[0]*D/s[1]; d = fg28Fr(n1 - n2, D);
      g = fg28Mcd(p4[0]*fv[0], p4[1]*fv[1]); d2 = fg28Fr(d[0]*x[0], d[1]*x[1]); den = Math.abs(x[0]) < x[1];
      e.s = s; e.f = fv; e.d = d;
      PZ.push(['H' + k, xs + (den ? '\\text{: dentro del intervalo, }|x|<1' : '\\text{: fuera del intervalo, }|x|>1'), xsp + (den ? ': dentro del intervalo, |x| < 1' : ': fuera del intervalo, |x| > 1'), 'pt']);
      R = [R0,
        '\\text{Potencias, cada una es la anterior por }x\\text{:}' + Q + 'x^{2}=' + fg28Par(x) + '\\cdot' + fg28Par(x) + '=' + fg28T(p2) + Q + 'x^{3}=' + fg28T(p2) + '\\cdot' + fg28Par(x) + '=' + fg28T(p3),
        '\\text{Suma parcial, de a un término:}' + Q + '1+x=' + a1[0] + Q + '\\text{más }x^{2}\\text{: }' + a2[0] + Q + '\\text{más }x^{3}\\text{: }' + a3[0] + Q + 's_{3}(x)=' + fg28T(s) + fg28ApT(s),
        '\\text{Función. Resta del denominador:}' + Q + '1-x=' + (x[0] < 0 ? '1-' + fg28Par(x) + '=1+' + fg28T(ax) + '=' + fg28Raw(x[1], x[1]) + '+' + fg28T(ax) : '1-' + xt + '=' + fg28Raw(x[1], x[1]) + '-' + xt) + '=' + fg28T(w) + Q + '\\text{Dividir por una fracción es multiplicar}' + Q + '\\text{por su inverso:}' + Q + 'f(x)=\\dfrac{1}{' + fg28T(w, 1) + '}=1\\cdot' + fg28Par(inv) + '=' + fg28T(fv) + fg28ApT(fv),
        '\\text{Diferencia: función menos suma parcial.}' + Q + 'f(x)-s_{3}(x)=' + fg28T(fv) + '-' + fg28Par(s) + (s[0] < 0 ? '=' + fg28T(fv) + '+' + fg28T(fg28Abs(s)) : '') + Q + '\\text{Denominador común }' + D + '\\text{:}' + Q + fg28Raw(n1, D) + (n2 < 0 ? '+' : '-') + fg28Raw(Math.abs(n2), D) + '=' + fg28T(d) + fg28ApT(d),
        '\\text{Comprobación con la fórmula del recuadro:}' + Q + 'f(x)-s_{3}(x)=\\dfrac{x^{4}}{1-x}=x^{4}\\cdot f(x)' + Q + 'x^{4}=' + fg28Par(p3) + '\\cdot' + fg28Par(x) + '=' + fg28T(p4) + Q + fg28T(p4) + '\\cdot' + fg28Par(fv) + '=' + fg28Raw(p4[0]*fv[0], p4[1]*fv[1]) + (g > 1 ? '=' + fg28T(d) : '') + '\\ \\checkmark' + (g > 1 ? Q + '\\text{(se simplifica por }' + g + '\\text{). Coincide.}' : Q + '\\text{Coincide.}'),
        '\\text{Se compara }|x|\\text{ con }1\\text{: }\\left|' + xt + '\\right|=' + fg28T(ax) + (den ? '<1' : '>1') + '.' + Q + (den ? '\\text{Dentro del intervalo: la serie completa}' + Q + '\\text{suma lo que vale la función, }' + fg28T(fv) + '.' : '\\text{Fuera del intervalo: la serie no tiene suma}' + Q + '\\text{(hoja «Series geométricas infinitas»).}' + Q + '\\text{La función sí existe: vale }' + fg28T(fv) + '.') + Q + '\\text{Con un término más, la diferencia se}' + Q + '\\text{multiplica por }x\\text{ (recuadro, con }N=4\\text{):}' + Q + fg28T(d) + '\\cdot' + fg28Par(x) + '=' + fg28T(d2) + fg28ApT(d2) + Q + (den ? '\\text{Qué significa: queda más cerca de }0\\text{. Con}' + Q + '\\text{más términos, la suma parcial se pega a la}' + Q + '\\text{función.}' : '\\text{Qué significa: queda más lejos de }0\\text{. Con}' + Q + '\\text{más términos, la suma parcial se separa}' + Q + '\\text{más de la función.}')];
    }
    PZ.push(['VS' + k, 's_{3}(x)=1+x+x^{2}+x^{3}=' + fg28T(e.s, 1) + fg28ApT(e.s), 's₃(x) = 1 + x + x² + x³ = ' + fg28P(e.s) + fg28ApP(e.s), 'c-sec']);
    PZ.push(['VF' + k, e.f ? 'f(x)=\\tfrac{1}{1-x}=' + fg28T(e.f, 1) + fg28ApT(e.f) : 'f(1)\\text{ no existe: el denominador es }1-1=0', e.f ? 'f(x) = 1/(1 − x) = ' + fg28P(e.f) + fg28ApP(e.f) : 'f(1) no existe: el denominador es 1 − 1 = 0', 'c-tan']);
    PZ.push(['VD' + k, e.d ? 'f(x)-s_{3}(x)=' + fg28T(e.d, 1) + fg28ApT(e.d) : '\\text{sin }f(1)\\text{ no hay diferencia que calcular}', e.d ? 'f(x) − s₃(x) = ' + fg28P(e.d) + fg28ApP(e.d) : 'sin f(1) no hay diferencia que calcular', 'diff']);
    e.R = R; DAT.push(e);
  })(k);
  var FR = [['dentro del intervalo: la suma parcial queda', 'cerca, y con más términos se acerca más.'], ['en 0 las dos curvas se tocan: diferencia cero.', 'Caso límite: la suma parcial ya es la función.'],
    ['fuera del intervalo: la función existe, pero', 'la serie no tiene suma. Las curvas se separan.'], ['en −1 la función vale un medio, pero la serie', 'no tiene suma: sus sumas saltan entre 1 y 0.'],
    ['en 1 la función no existe (punteada gris) y la', 'serie no tiene suma: sus sumas crecen sin tope.']];
  function frase(k){ return k === 6 ? FR[1] : k === 2 ? FR[3] : k === 10 ? FR[4] : (k > 2 && k < 10) ? FR[0] : FR[2]; }
  return {
    world:{x0:-1.3, x1:5.3, y0:0, y1:9.4}, aspect:9.4/6.6,
    aria:'Arriba, una franja dice qué muestra: en el x elegido, cuánto vale la función, cuánto la suma parcial de cuatro términos y cuánto se diferencian. Un deslizador elige x, de menos 1,5 a 1,5, de 0,25 en 0,25. Es una gráfica: en horizontal x, de menos 1,6 a 1,6; en vertical, los valores, de menos 4,5 a 8,5. En burdeo, la curva de la función 1 dividido por 1 menos x, con dos ramas separadas por una punteada gris vertical en x igual a 1. En azul, la curva de la suma parcial 1 más x más x al cuadrado más x al cubo. Una franja verde clara marca el intervalo entre menos 1 y 1. Una punteada vertical pasa por el x elegido: un anillo burdeo marca el valor de la función, un punto azul el valor de la suma parcial y un trazo naranja entre los dos mide la diferencia. Bajo la gráfica se escriben los tres valores. Con x igual a 0 los dos puntos coinciden y la diferencia es cero. Con x igual a 0,5 la función vale 2, la suma parcial quince octavos y la diferencia un octavo. Con x igual a 0,75 la diferencia es ochenta y uno sesenta y cuatroavos. Con x igual a menos 1 la función vale un medio, la suma parcial 0 y la serie no tiene suma. Con x igual a 1 la función no existe y la serie no tiene suma. Con x igual a 1,5 la función vale menos 2, la suma parcial sesenta y cinco octavos y la serie no tiene suma. Bajo el dibujo, frases dicen la conclusión y, más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'x', tex:'x', min:-1.5, max:1.5, step:0.25, value:0.5}],
    legend:'<span><i class="sw tan"></i> la función \\(f(x)=\\tfrac{1}{1-x}\\) y su valor en el \\(x\\) elegido</span><span><i class="sw sec"></i> la suma parcial \\(s_{3}(x)=1+x+x^{2}+x^{3}\\) y su valor</span><span><i class="sw rise"></i> la diferencia \\(f(x)-s_{3}(x)\\)</span><span><i class="sw alt"></i> franja \\(-1&lt;x&lt;1\\): donde la serie tiene suma</span><span>punteada gris en \\(x=1\\): la función no existe</span>',
    anim:{run:52000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.x = -1.5 + 0.25*Math.min(12, Math.floor(p*13)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = cual(v), e = DAT[k], x = e.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', i, bx = X(gx(XA)), by = Y(gy(YB)), bw = X(gx(XB)) - bx, bh = Y(gy(YA)) - by, px = X(gx(x)), ys = S3(x), yf = e.f ? e.f[0]/e.f[1] : null, lado = k <= 8 ? 1 : -1, gap, ym, fr;
      function num(t, ax, ay, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, ax, ay); }
      function seg(x0, y0, x1, y1, col, wd, dash, al){ c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(X(gx(x0)), Y(gy(y0))); c.lineTo(X(gx(x1)), Y(gy(y1))); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      L('H' + k, -1.2, 8.12, 0);
      /* franja −1 < x < 1 */
      S.poly([[gx(-1), gy(YA)], [gx(1), gy(YA)], [gx(1), gy(YB)], [gx(-1), gy(YB)]], {fill:C.alt, alpha:0.1});
      c.font = '600 11px ' + F; c.fillStyle = C.alt; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('dentro del intervalo', X(gx(-0.1)), by + 10);
      /* marco y escalas */
      seg(XA, 0, XB, 0, C.ink, 0.8, null, 0.45); seg(0, YA, 0, YB, C.ink, 0.8, null, 0.45);
      S.line(gx(XA), gy(YA), gx(XB), gy(YA), {color:C.ink, width:1.1}); S.line(gx(XA), gy(YA), gx(XA), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1.5, '−1,5'], [-1, '−1'], [-0.5, '−0,5'], [0, '0'], [0.5, '0,5'], [1, '1'], [1.5, '1,5']].forEach(function(q){ c.beginPath(); c.moveTo(X(gx(q[0])), by + bh - 3); c.lineTo(X(gx(q[0])), by + bh + 3); c.stroke(); num(q[1], X(gx(q[0])), by + bh + 11, 'center'); });
      for (i = -4; i <= 8; i += 2){ c.beginPath(); c.moveTo(bx - 3, Y(gy(i))); c.lineTo(bx + 3, Y(gy(i))); c.stroke(); num(('' + i).replace('-', '−'), bx - 5, Y(gy(i)), 'right'); }
      /* curvas, recortadas al marco */
      c.save(); c.beginPath(); c.rect(bx, by, bw, bh); c.clip();
      seg(1, YA, 1, YB, C.muted || '#6b6b6b', 1, [4, 4]);
      fg28Curva(S, S3, XA, XB, C.sec, 1.6, gx, gy); fg28Curva(S, fg28F, XA, 0.99, C.tan, 2, gx, gy); fg28Curva(S, fg28F, 1.01, XB, C.tan, 2, gx, gy);
      c.restore();
      /* el x elegido: punteada vertical y marca en la escala */
      if (k !== 10) seg(x, YA, x, YB, C.ink, 0.9, [3, 3], 0.6);
      c.fillStyle = C.ink; c.beginPath(); c.moveTo(px, by + bh - 1); c.lineTo(px - 4, by + bh - 8); c.lineTo(px + 4, by + bh - 8); c.closePath(); c.fill();
      /* diferencia: trazo naranja entre los dos valores */
      if (yf != null){ gap = Math.abs(Y(gy(yf)) - Y(gy(ys))); ym = (Y(gy(yf)) + Y(gy(ys)))/2;
        if (gap > 0.5){ c.strokeStyle = C.rise; c.lineWidth = 2.6; c.setLineDash([]); c.beginPath(); c.moveTo(px, Y(gy(yf))); c.lineTo(px, Y(gy(ys))); c.stroke(); }
        if (k === 6) txt('diferencia cero', px - 8, ym, 'right', C.rise);
        else if (gap >= 14) txt('diferencia', px + lado*8, ym, lado > 0 ? 'left' : 'right', C.rise);
        else if (k === 2) txt('diferencia', px + 50, ym, 'left', C.rise);
        else txt('diferencia', px - lado*8, ym, lado > 0 ? 'right' : 'left', C.rise); }
      else txt('la función no existe', px - 7, Y(gy(-2.6)), 'right', C.muted || '#6b6b6b');
      /* valores: punto azul (suma parcial) y anillo burdeo (función) */
      c.beginPath(); c.arc(px, Y(gy(ys)), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill();
      if (yf != null){ c.beginPath(); c.arc(px, Y(gy(yf)), 4, 0, 6.2832); c.fillStyle = k === 6 ? 'rgba(255,255,255,0)' : '#fff'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 1.7; c.stroke(); L('MF', gx(x), gy(yf), lado > 0 ? 0 : -100, lado*7, -12); }
      L('MS', gx(x), gy(ys), lado > 0 ? 0 : -100, lado*7, 12);
      /* los tres valores, escritos bajo la gráfica */
      L('VF' + k, -1.2, 2.3, 0); L('VS' + k, -1.2, 1.82, 0); L('VD' + k, -1.2, 1.34, 0);
      fr = frase(k); txt(fr[0], X(-1.2), Y(0.78), 'left', k === 6 || (k > 2 && k < 10) ? C.ink : C.tan); txt(fr[1], X(-1.2), Y(0.78) + 21, 'left', k === 6 || (k > 2 && k < 10) ? C.ink : C.tan);
      dtQue(S, 'función, suma parcial de 4 términos', 'y su diferencia, en el x elegido. Mueve x.');
      T.fin();
    },
    caption:function(v){ var k = cual(v), e = DAT[k], fr = frase(k); return 'Con x = ' + e.xp + ': ' + fr[0] + ' ' + fr[1]; },
    readout:function(v){ return dtPasos(DAT[cual(v)].R); }
  };
})());
