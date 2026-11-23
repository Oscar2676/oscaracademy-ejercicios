/* L25 H24 · suma de una serie geométrica infinita: un cuadrado de área 1 se llena con 1/2, 1/4, 1/8, …; lo que falta tras n trozos es (1/2)ⁿ; la suma es 1 = a/(1 − r) */
function sg24Cl(t){ return Math.max(0, Math.min(1, t)); }
function sg24Mcd(a, b){ while (b){ var t = a % b; a = b; b = t; } return a; }
/* entero n dividido por 10^d, como decimal sin ceros de sobra; con punto (después se cambia por coma) */
function sg24Dec(n, d){ var s = (n/Math.pow(10, d)).toFixed(d); if (d) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s; }
function sg24T(n, d){ return sg24Dec(n, d).replace('.', '{,}'); }
function sg24P(n, d){ return sg24Dec(n, d).replace('.', ','); }
OA.scene('sgi-idea', (function(){
  var N = 6, X0 = -1.2, Y0 = 3.45, LD = 3.6, CX = 2.72, TR = [], RM = [[0, 0, 1, 1]], q = [0, 0, 1, 1], i;
  /* trozos en el cuadrado de lado 1: [x, y, ancho, alto]; cada trozo es la mitad de lo que faltaba; RM[j] es lo que falta tras j trozos */
  for (i = 0; i < 10; i++){
    if (i % 2 === 0){ TR.push([q[0], q[1], q[2]/2, q[3]]); q = [q[0] + q[2]/2, q[1], q[2]/2, q[3]]; }
    else { TR.push([q[0], q[1] + q[3]/2, q[2], q[3]/2]); q = [q[0], q[1], q[2], q[3]/2]; }
    RM.push(q); }
  var PZ = [['P1', '\\tfrac{1}{2}', '1/2', 'c-sec'], ['P2', '\\tfrac{1}{4}', '1/4', 'c-sec'], ['P3', '\\tfrac{1}{8}', '1/8', 'c-sec'], ['P4', '\\tfrac{1}{16}', '1/16', 'c-sec'],
    ['F1', '\\text{1 trozo: falta }\\tfrac{1}{2}', '1 trozo: falta 1/2', 'diff'], ['F2', '\\text{2 trozos: falta }\\tfrac{1}{4}', '2 trozos: falta 1/4', 'diff'], ['F3', '\\text{3 trozos: falta }\\tfrac{1}{8}', '3 trozos: falta 1/8', 'diff'], ['F4', '\\text{4 trozos: falta }\\tfrac{1}{16}', '4 trozos: falta 1/16', 'diff'],
    ['FN', 'n\\text{ trozos: falta }\\left(\\tfrac{1}{2}\\right)^{n}', 'n trozos: falta (1/2)ⁿ', 'diff'],
    ['Q', '\\tfrac{1}{2}+\\tfrac{1}{4}+\\tfrac{1}{8}+\\tfrac{1}{16}+\\cdots\\text{ ¿cuánto suma?}', '1/2 + 1/4 + 1/8 + 1/16 + ⋯ ¿cuánto suma?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{suma}=\\tfrac{1}{2}:\\left(1-\\tfrac{1}{2}\\right)=1', '⟹ suma = 1/2 : (1 − 1/2) = 1', 'c-tan'],
    ['R1', 'S_{1}=\\tfrac{1}{2},\\qquad 1-S_{1}=\\tfrac{1}{2}', 'S₁ = 1/2, 1 − S₁ = 1/2', ''],
    ['R2', 'S_{2}=\\tfrac{1}{2}+\\tfrac{1}{4}=\\tfrac{3}{4},\\qquad 1-S_{2}=\\tfrac{1}{4}', 'S₂ = 1/2 + 1/4 = 3/4, 1 − S₂ = 1/4', ''],
    ['R3', 'S_{3}=\\tfrac{3}{4}+\\tfrac{1}{8}=\\tfrac{7}{8},\\qquad 1-S_{3}=\\tfrac{1}{8}', 'S₃ = 3/4 + 1/8 = 7/8, 1 − S₃ = 1/8', ''],
    ['R4', 'S_{4}=\\tfrac{7}{8}+\\tfrac{1}{16}=\\tfrac{15}{16},\\qquad 1-S_{4}=\\tfrac{1}{16}', 'S₄ = 7/8 + 1/16 = 15/16, 1 − S₄ = 1/16', ''],
    ['R5', '1-S_{n}=\\left(\\tfrac{1}{2}\\right)^{n},\\qquad S_{n}=1-\\left(\\tfrac{1}{2}\\right)^{n}', '1 − Sₙ = (1/2)ⁿ, Sₙ = 1 − (1/2)ⁿ', ''],
    ['R6', '\\sum\\nolimits_{n=1}^{\\infty}\\tfrac{1}{2^{n}}=\\lim S_{n}=1-0=1', 'Σ 1/2ⁿ (n ≥ 1) = lím Sₙ = 1 − 0 = 1', 'diff']];
  var TXT = [['Se pinta la mitad del cuadrado: primer trozo.', 'Queda sin pintar la otra mitad.'],
    ['Segundo trozo: la mitad de lo que faltaba.', 'Ahora falta un cuarto del cuadrado.'],
    ['Tercer trozo: otra vez la mitad de lo que', 'faltaba. Ahora falta un octavo.'],
    ['Cuarto trozo: la mitad de lo que faltaba.', 'Lo que falta es igual al último trozo.'],
    ['Siguen más trozos, cada uno la mitad del', 'anterior. Lo que falta se acerca a cero.'],
    ['La suma de todos los trozos es el área', 'del cuadrado completo: uno.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-2.3, y1:9.6}, aspect:11.9/6.6,
    aria:'Arriba, una franja dice qué muestra: sumar la serie es llenar el cuadrado; lo que falta se acerca a cero. Animación en seis pasos con la serie un medio más un cuarto más un octavo más un dieciseisavo, y así sin fin. La figura es un cuadrado de lado 1 y área 1, al principio rayado en naranja entero: todo falta. Uno: se pinta de azul la mitad izquierda, rotulada un medio; la mitad derecha queda rayada en naranja con la palabra falta, y a la derecha se anota: 1 trozo, falta un medio. Dos: se pinta la mitad de arriba de lo que faltaba, rotulada un cuarto; se anota: 2 trozos, falta un cuarto. Tres: se pinta la mitad izquierda de lo que faltaba, rotulada un octavo; se anota: 3 trozos, falta un octavo. Cuatro: se pinta la mitad de arriba de lo que faltaba, rotulada un dieciseisavo; se anota: 4 trozos, falta un dieciseisavo; lo que falta es igual al último trozo. Cinco: se pintan seis trozos más, cada uno la mitad del anterior, y lo rayado se reduce a un cuadradito casi invisible en la esquina de abajo a la derecha; se anota: n trozos, falta un medio elevado a n. Seis: el cuadrado completo se remarca en burdeo y bajo la pregunta se escribe la respuesta: la suma es un medio dividido por 1 menos un medio, igual a 1. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los trozos pintados: los términos de la serie</span><span><i class="sw rise"></i> lo que falta para llenar el cuadrado</span><span><i class="sw tan"></i> el cuadrado completo: la suma de la serie</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, otx = oaTxt(S), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, r, fq;
      function txt(t, x, y, col, al){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = col || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function caja(q){ return [X(X0 + q[0]*LD), Y(Y0 + (q[1] + q[3])*LD), q[2]*LD*s, q[3]*LD*s]; }
      /* lo que falta: rayado naranja */
      function raya(q){ var b = caja(q), d; c.save(); c.beginPath(); c.rect(b[0], b[1], b[2], b[3]); c.clip(); c.globalAlpha = 0.55; c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([]);
        for (d = -b[3]; d < b[2]; d += 6){ c.beginPath(); c.moveTo(b[0] + d, b[1] + b[3]); c.lineTo(b[0] + d + b[3], b[1]); c.stroke(); } c.restore(); c.globalAlpha = 1; }
      function borde(q, al){ var b = caja(q); if (al <= 0.02 || b[2] < 2) return; c.globalAlpha = al; c.strokeStyle = C.rise; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.strokeRect(b[0] + 1, b[1] + 1, b[2] - 2, b[3] - 2); c.setLineDash([]); c.globalAlpha = 1; }
      /* un trozo pintado: tapa el rayado y queda azul */
      function trozo(q, al){ var b = caja(q); if (al <= 0) return; c.globalAlpha = al; c.fillStyle = '#fff'; c.fillRect(b[0], b[1], b[2], b[3]); c.globalAlpha = 0.3*al; c.fillStyle = C.sec; c.fillRect(b[0], b[1], b[2], b[3]);
        c.globalAlpha = al; c.strokeStyle = C.sec; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(b[0] + 0.5, b[1] + 0.5, Math.max(1, b[2] - 1), Math.max(1, b[3] - 1)); c.globalAlpha = 1; }
      /* el cuadrado: fondo blanco y lo que faltaba al empezar este paso, rayado */
      c.fillStyle = '#fff'; r = caja([0, 0, 1, 1]); c.fillRect(r[0], r[1], r[2], r[3]);
      raya(RM[Math.min(k, 5) - 1]);
      /* pasos 1 a 4: un trozo por paso, con su rótulo */
      for (i = 0; i < 4 && i < k; i++){ w = k === i + 1 ? u : 1; trozo(TR[i], w); if (w > 0.5) L('P' + (i + 1), X0 + (TR[i][0] + TR[i][2]/2)*LD, Y0 + (TR[i][1] + TR[i][3]/2)*LD, -50); }
      /* paso 5: seis trozos más, uno tras otro */
      if (k >= 5) for (i = 4; i < 10; i++){ w = k === 5 ? sg24Cl(u*6 - (i - 4)) : 1; trozo(TR[i], w); }
      borde(k <= 4 ? RM[k] : RM[10], k <= 5 ? u : 1);
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(r[0] + 0.5, r[1] + 0.5, r[2] - 1, r[3] - 1);
      /* la palabra «falta» va con lo rayado; cuando ya casi no se ve, queda al lado de la esquina */
      fq = k <= 4 ? (u > 0.5 ? RM[k] : RM[k - 1]) : (k === 5 && u <= 0.5 ? RM[4] : null);
      if (fq) otx('falta', X(X0 + (fq[0] + fq[2]/2)*LD), Y(Y0 + (fq[1] + fq[3]/2)*LD), 'center', C.rise);
      else txt('← falta', X0 + LD + 0.08, Y0 + 0.08, C.rise);
      /* paso 6: el cuadrado completo, en burdeo */
      if (k === 6){ c.globalAlpha = u; c.strokeStyle = C.tan; c.lineWidth = 1 + 1.4*u; c.strokeRect(r[0] - 2, r[1] - 2, r[2] + 4, r[3] + 4); c.globalAlpha = 1; }
      c.font = '500 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('cuadrado de lado 1: su área es 1', X(X0), Y(Y0) + 12);
      /* columna de la derecha: lo que falta tras cada trozo; se acumula */
      txt('lo que falta:', CX, 6.85, C.rise);
      for (i = 0; i < 4 && i < k; i++){ w = k === i + 1 ? u : 1; if (w > 0.6) L('F' + (i + 1), CX, 6.3 - 0.55*i, 0); }
      if (k >= 5 && (k > 5 || u > 0.7)) L('FN', CX, 4.1, 0);
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.58, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 2.6); txt(TXT[k - 1][1], -1.2, 2.6 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'sumar la serie es llenar el', 'cuadrado: lo que falta se acerca a cero.');
      T.fin();
      oaReg(S, k, N, -1.2, 1.2, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', H = '\\left(\\dfrac{1}{2}\\right)', R = [
      '\\text{Dato: la serie }\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{1}{2^{n}}=\\dfrac{1}{2}+\\dfrac{1}{4}+\\dfrac{1}{8}+\\cdots' + Q + '\\text{Primer término (}n=1\\text{): }a=\\dfrac{1}{2^{1}}=\\dfrac{1}{2}' + Q + '\\text{Razón: }\\dfrac{1}{2^{n+1}}\\cdot\\dfrac{2^{n}}{1}=\\dfrac{2^{n}}{2^{n}\\cdot 2}=\\dfrac{1}{2}' + Q + '\\text{No depende de }n\\text{: }r=\\dfrac{1}{2}' + Q + '\\text{Figura: cuadrado de lado }1\\text{; área }1\\cdot 1=1.' + Q + '\\text{Primer trozo: la mitad del cuadrado.}' + Q + 'S_{1}=\\dfrac{1}{2}' + Q + '\\text{Falta: }1-\\dfrac{1}{2}=\\dfrac{2}{2}-\\dfrac{1}{2}=\\dfrac{1}{2}',
      '\\text{Segundo trozo: la mitad de lo que faltaba.}' + Q + '\\dfrac{1}{2}\\cdot\\dfrac{1}{2}=\\dfrac{1}{4}' + Q + 'S_{2}=\\dfrac{1}{2}+\\dfrac{1}{4}=\\dfrac{2}{4}+\\dfrac{1}{4}=\\dfrac{3}{4}' + Q + '\\text{Falta: }1-\\dfrac{3}{4}=\\dfrac{4}{4}-\\dfrac{3}{4}=\\dfrac{1}{4}',
      '\\text{Tercer trozo: la mitad de lo que faltaba.}' + Q + '\\dfrac{1}{2}\\cdot\\dfrac{1}{4}=\\dfrac{1}{8}' + Q + 'S_{3}=\\dfrac{3}{4}+\\dfrac{1}{8}=\\dfrac{6}{8}+\\dfrac{1}{8}=\\dfrac{7}{8}' + Q + '\\text{Falta: }1-\\dfrac{7}{8}=\\dfrac{8}{8}-\\dfrac{7}{8}=\\dfrac{1}{8}',
      '\\text{Cuarto trozo: la mitad de lo que faltaba.}' + Q + '\\dfrac{1}{2}\\cdot\\dfrac{1}{8}=\\dfrac{1}{16}' + Q + 'S_{4}=\\dfrac{7}{8}+\\dfrac{1}{16}=\\dfrac{14}{16}+\\dfrac{1}{16}=\\dfrac{15}{16}' + Q + '\\text{Falta: }1-\\dfrac{15}{16}=\\dfrac{16}{16}-\\dfrac{15}{16}=\\dfrac{1}{16}' + Q + '\\text{Lo que falta es igual al último trozo.}',
      '\\text{Lo que falta tras cada trozo: }\\dfrac{1}{2},\\ \\dfrac{1}{4},\\ \\dfrac{1}{8},\\ \\dfrac{1}{16}.' + Q + '\\text{Son }\\dfrac{1}{2}\\text{ elevado a }1,\\ 2,\\ 3\\text{ y }4.' + Q + '\\text{Si tras }n\\text{ trozos falta }' + H + '^{n}\\text{, el trozo}' + Q + '\\text{siguiente es su mitad: }\\dfrac{1}{2}\\cdot' + H + '^{n}=' + H + '^{n+1}' + Q + '\\text{Como }' + H + '^{n}=2\\cdot' + H + '^{n+1}\\text{, queda sin pintar}' + Q + '2\\cdot' + H + '^{n+1}-' + H + '^{n+1}=' + H + '^{n+1}' + Q + '\\text{Entonces, para todo }n\\text{: }1-S_{n}=' + H + '^{n}' + Q + '\\text{Se despeja: }S_{n}=1-' + H + '^{n}' + Q + '\\text{Lo mismo, con la fórmula de la suma parcial:}' + Q + 'S_{n}=\\dfrac{a\\,(1-r^{\\,n})}{1-r}=\\dfrac{\\frac{1}{2}\\left(1-\\left(\\frac{1}{2}\\right)^{n}\\right)}{1-\\frac{1}{2}}' + Q + '\\text{Abajo: }1-\\dfrac{1}{2}=\\dfrac{1}{2}\\text{. Se simplifica por }\\dfrac{1}{2}\\text{:}' + Q + 'S_{n}=1-' + H + '^{n}',
      '\\text{Al crecer }n\\text{, }' + H + '^{n}\\text{ tiene límite }0' + Q + '\\text{(se usa sin demostrar: ver el aviso de rigor).}' + Q + '\\text{Suma: }S=\\displaystyle\\lim_{n\\to\\infty}S_{n}=1-0=1' + Q + '\\text{Con la fórmula: }\\dfrac{a}{1-r}=\\dfrac{\\frac{1}{2}}{1-\\frac{1}{2}}=\\dfrac{\\frac{1}{2}}{\\frac{1}{2}}=1' + Q + '\\text{Qué significa: las áreas de todos los trozos}' + Q + '\\text{suman el área del cuadrado, }1\\text{. Ninguna suma}' + Q + '\\text{parcial llega a }1\\text{: siempre falta }' + H + '^{n}.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: a = 1 y razón r entre 0 y 1; cuadrados de lados 1, r, r², … uno tras otro; la recta por sus esquinas toca el eje en 1/(1 − r) */
OA.scene('sgi-vivo', (function(){
  var OX = -0.95, U = 1.2, XE = 5.2, Q = '\\\\&\\qquad ', PZ = [['A', 'a=1', 'a = 1', 'c-sec']], DAT = [], k;
  function cual(v){ return Math.max(0, Math.min(10, Math.round((v.r == null ? 0.5 : v.r)*10))); }
  for (k = 0; k <= 10; k++) (function(k){
    var r = sg24T(k, 1), rp = sg24P(k, 1), r2 = sg24T(k*k, 2), r3 = sg24T(k*k*k, 3), d = sg24T(10 - k, 1), dp = sg24P(10 - k, 1), e = {k:k}, g, sn, sd, st, sp, R;
    if (k < 10){ g = sg24Mcd(10, 10 - k); sn = 10/g; sd = (10 - k)/g; e.ex = 1000 % (10 - k) === 0; e.S = 10/(10 - k);
      st = (e.ex ? '=' : '\\approx ') + sg24T(Math.round(1000/(10 - k)), 2); sp = (e.ex ? '= ' : '≈ ') + sg24P(Math.round(1000/(10 - k)), 2);
      /* cadena de la división: 1 : (1 − r) = 10/(10 − k) = fracción irreducible = decimal */
      e.div = '\\dfrac{10}{' + (10 - k) + '}' + (g > 1 && sd > 1 ? '=\\dfrac{' + sn + '}{' + sd + '}' : '') + (sd === 1 ? '=' + sn : st);
      e.st = sd === 1 ? '=' + sn : st; e.sp = sd === 1 ? '= ' + sn : sp; }
    PZ.push(['D' + k, '1-r=' + d, '1 − r = ' + dp, 'diff']);
    PZ.push(['B' + k, 'ar=' + r, 'ar = ' + rp, 'c-sec']);
    if (k === 0){
      PZ.push(['H0', 'a=1,\\ \\ r=0:\\quad 1+0+0+0+\\cdots', 'a = 1, r = 0: 1 + 0 + 0 + 0 + ⋯', 'pt']);
      PZ.push(['V0', '1+0+0+\\cdots=\\dfrac{1}{1-0}=1', '1 + 0 + 0 + ⋯ = 1/(1 − 0) = 1', 'c-tan']);
      PZ.push(['M0', 'S=1', 'S = 1', 'c-tan']);
      R = ['\\text{Datos: }a=1,\\quad r=0' + Q + '\\text{Serie: }1+0+0+0+\\cdots',
        '\\text{Lado de cada cuadrado: un término.}' + Q + '\\text{Cada uno es el anterior por }r\\text{:}' + Q + '1\\cdot 0=0,\\qquad 0\\cdot 0=0' + Q + '\\text{Hay un solo cuadrado, de lado }1.',
        '\\text{La recta parte a la altura }a=1\\text{, sobre el }0.' + Q + '\\text{Por cada unidad que avanza, baja}' + Q + '1-r=1-0=1.' + Q + '\\text{Avanza }1\\text{ y baja }1\\text{: llega al eje en }1.',
        '\\text{Se compara }|r|\\text{ con }1\\text{: }|0|=0<1.' + Q + '\\text{Hay suma, y se calcula con }S=\\dfrac{a}{1-r}.',
        '\\text{Reemplazo: }S=\\dfrac{1}{1-0}' + Q + '\\text{Resta: }1-0=1' + Q + '\\text{División: }\\dfrac{1}{1}=1',
        '\\text{Qué significa: caso límite. Todas las sumas}' + Q + '\\text{parciales valen }1\\text{: }1,\\ \\ 1+0=1,\\ \\ 1+0+0=1.' + Q + '\\text{La suma es el primer término.}'];
    } else if (k === 10){
      PZ.push(['H10', 'a=1,\\ \\ r=1:\\quad 1+1+1+1+\\cdots', 'a = 1, r = 1: 1 + 1 + 1 + 1 + ⋯', 'pt']);
      PZ.push(['V10', '\\sum\\nolimits_{n=1}^{\\infty}1\\cdot 1^{\\,n-1}\\text{ no tiene suma: }|r|=1\\ge 1', 'Σ 1·1ⁿ⁻¹ no tiene suma: |r| = 1 ≥ 1', 'c-tan']);
      R = ['\\text{Datos: }a=1,\\quad r=1' + Q + '\\text{Serie: }\\displaystyle\\sum_{n=1}^{\\infty}1\\cdot 1^{\\,n-1}=1+1+1+\\cdots',
        '\\text{Lado de cada cuadrado: un término.}' + Q + '\\text{Cada uno es el anterior por }r\\text{: }1\\cdot 1=1.' + Q + '\\text{Todos los cuadrados son iguales, de lado }1.',
        '\\text{La recta parte a la altura }a=1\\text{, sobre el }0.' + Q + '\\text{Por cada unidad que avanza, baja}' + Q + '1-r=1-1=0.' + Q + '\\text{No baja: es horizontal y nunca toca el eje.}',
        '\\text{Se compara }|r|\\text{ con }1\\text{: }|1|=1\\ge 1.' + Q + '\\text{No hay suma.}',
        '\\text{La fórmula }\\dfrac{a}{1-r}\\text{ no se puede usar:}' + Q + '\\text{su denominador sería }1-1=0.' + Q + '\\text{Sumas parciales: }S_{1}=1,\\quad S_{2}=1+1=2,' + Q + 'S_{3}=2+1=3\\text{; en general }S_{n}=n.' + Q + '\\text{Crecen sin tope: no tienen límite.}',
        '\\text{Qué significa: caso límite. En }r=1\\text{ deja de}' + Q + '\\text{haber suma. Cerca de }1\\text{ la suma ya es grande:}' + Q + '\\text{con }r=0{,}9\\text{ vale }10\\text{; con }r=0{,}8\\text{ vale }5.'];
    } else {
      PZ.push(['H' + k, 'a=1,\\ \\ r=' + r + ':\\quad 1+' + r + '+' + r2 + '+' + r3 + '+\\cdots', 'a = 1, r = ' + rp + ': 1 + ' + rp + ' + ' + sg24P(k*k, 2) + ' + ' + sg24P(k*k*k, 3) + ' + ⋯', 'pt']);
      PZ.push(['V' + k, '\\sum\\nolimits_{n=1}^{\\infty}' + r + '^{\\,n-1}=\\dfrac{1}{1-' + r + '}' + e.st, 'Σ ' + rp + 'ⁿ⁻¹ (n ≥ 1) = 1/(1 − ' + rp + ') ' + e.sp, 'c-tan']);
      if (k <= 8) PZ.push(['M' + k, 'S' + e.st, 'S ' + e.sp, 'c-tan']);
      R = ['\\text{Datos: }a=1,\\quad r=' + r + Q + '\\text{Serie: }\\displaystyle\\sum_{n=1}^{\\infty}1\\cdot ' + r + '^{\\,n-1}=1+' + r + '+' + r2 + '+\\cdots',
        '\\text{Lado de cada cuadrado: un término.}' + Q + '\\text{Cada uno es el anterior por }r\\text{:}' + Q + '1\\cdot ' + r + '=' + r + ',\\qquad ' + r + '\\cdot ' + r + '=' + r2 + Q + r2 + '\\cdot ' + r + '=' + r3 + Q + '\\text{Los lados van uno tras otro sobre el eje:}' + Q + '\\text{el largo total es la suma de la serie.}',
        '\\text{La recta parte a la altura }a=1\\text{, sobre el }0.' + Q + '\\text{Por cada unidad que avanza, baja}' + Q + '1-r=1-' + r + '=' + d + Q + '\\text{Segunda esquina: avanza }1\\text{, baja }' + d + '\\text{;}' + Q + '\\text{altura }1-' + d + '=' + r + '\\text{, el lado del }2.^{\\circ}.' + Q + '\\text{Tercera esquina: avanza }1+' + r + '=' + sg24T(10 + k, 1) + '\\text{,}' + Q + '\\text{baja }' + d + '\\cdot ' + sg24T(10 + k, 1) + '=' + sg24T(100 - k*k, 2) + '\\text{;}' + Q + '\\text{altura }1-' + sg24T(100 - k*k, 2) + '=' + r2 + '\\text{, el lado del }3.^{\\circ}.' + Q + '\\text{(Todas las esquinas: en el recuadro.)}',
        '\\text{Se compara }|r|\\text{ con }1\\text{: }|' + r + '|=' + r + '<1.' + Q + '\\text{Hay suma, y se calcula con }S=\\dfrac{a}{1-r}.',
        '\\text{Reemplazo: }S=\\dfrac{1}{1-' + r + '}' + Q + '\\text{Resta: }1-' + r + '=' + d + Q + '\\text{División (se amplifica por }10\\text{):}' + Q + '\\dfrac{1}{' + d + '}=' + e.div,
        '\\text{Qué significa: la recta toca el eje en }S.' + Q + '\\text{Baja }' + d + '\\text{ por unidad y tiene que bajar }1\\text{:}' + Q + '\\text{avanza }1:' + d + e.st + '.' + Q + '\\text{Los lados, uno tras otro, se acercan a ese}' + Q + '\\text{punto sin pasarlo.}' + (k === 9 ? Q + '\\text{(El }10\\text{ queda fuera del dibujo.)}' : '')];
    }
    e.R = R; e.rp = rp; DAT.push(e);
  })(k);
  return {
    world:{x0:-1.3, x1:5.3, y0:-2.7, y1:3.5}, aspect:6.2/6.6,
    aria:'Arriba, una franja dice qué muestra: los lados de los cuadrados son los términos, y la recta marca la suma. Un deslizador elige la razón r, de 0 a 1 de décima en décima; el primer término es siempre 1. Sobre un eje horizontal numerado de 0 a 5 se apoyan cuadrados azules, uno tras otro: el primero de lado 1, el segundo de lado r, el tercero de lado r al cuadrado, y así. Un punto naranja marca la esquina de arriba a la izquierda de cada cuadrado. Una cota naranja, junto al primer cuadrado, mide lo que baja el segundo respecto del primero: 1 menos r. Una recta burdeo parte de la esquina del primer cuadrado, pasa por todas las esquinas y toca el eje en un punto burdeo, rotulado con la suma S, igual a 1 dividido por 1 menos r. Con r igual a 0 hay un solo cuadrado y la suma es 1. Con r igual a 0,5 la suma es 2. Con r igual a 0,8 la suma es 5. Con r igual a 0,9 la suma es 10 y queda fuera del dibujo: la recta sale por la derecha con una flecha. Con r igual a 1 todos los cuadrados son iguales, la recta es horizontal, nunca toca el eje y no hay suma. Bajo el dibujo, frases dicen la conclusión y, más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'r', tex:'r', min:0, max:1, step:0.1, value:0.5}],
    legend:'<span><i class="sw sec"></i> cuadrados: el lado de cada uno es un término</span><span><i class="sw rise"></i> esquinas y lo que baja de un cuadrado al siguiente, \\(1-r\\)</span><span><i class="sw tan"></i> la recta por las esquinas y la suma \\(S\\), donde toca el eje</span>',
    anim:{run:44000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.r = Math.min(10, Math.floor(p*11))/10; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = cual(v), e = DAT[k], r = k/10, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), j, x = 0, lado = 1, pts = [], corta = false, px, py, pw, xe;
      function gx(t){ return OX + t*U; } function gy(t){ return t*U; }
      function num(t, ax, ay, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, ax, ay); }
      T.L('H' + k, -1.2, 2.15, 0);
      /* cuadrados de lados 1, r, r², …, uno tras otro sobre el eje */
      for (j = 0; j < 80; j++){ pw = lado*U*s; if (pw < 0.7) break; if (gx(x + lado) > XE + 1e-9){ corta = true; break; }
        px = X(gx(x)); py = Y(gy(lado)); c.globalAlpha = 0.26; c.fillStyle = C.sec; c.fillRect(px, py, pw, pw); c.globalAlpha = 1; c.strokeStyle = C.sec; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, Math.max(1, pw - 1), Math.max(1, pw - 1));
        pts.push([x, lado]); x += lado; lado *= r; }
      if (corta) num('…', X(XE) - 6, Y(gy(0.3)), 'center');
      /* eje con sus marcas */
      S.line(OX, 0, XE, 0, {color:C.ink, width:1.1}); c.strokeStyle = C.ink; c.lineWidth = 1;
      for (j = 0; j <= 5; j++){ c.beginPath(); c.moveTo(X(gx(j)), Y(0) - 3); c.lineTo(X(gx(j)), Y(0) + 3); c.stroke(); num('' + j, X(gx(j)), Y(0) + 11, 'center'); }
      /* la recta por las esquinas: parte en (0, 1) y baja 1 − r por unidad */
      xe = (XE - OX)/U;
      if (k < 10 && gx(e.S) <= XE){ S.line(gx(0), gy(1), gx(e.S), 0, {color:C.tan, width:1.6}); c.beginPath(); c.arc(X(gx(e.S)), Y(0), 4, 0, 6.2832); c.fillStyle = C.tan; c.fill();
        if (gx(e.S) > 4.6) T.L('M' + k, gx(e.S) + 0.22, -0.55, -100); else T.L('M' + k, gx(e.S), -0.55, -50); }
      else dtFlecha(S, gx(0), gy(1), XE, gy(1 - (1 - r)*xe), C.tan, 1.6);
      /* esquinas */
      pts.forEach(function(p){ c.beginPath(); c.arc(X(gx(p[0])), Y(gy(p[1])), 2.8, 0, 6.2832); c.fillStyle = C.rise; c.fill(); });
      /* cota: lo que baja del primer cuadrado al segundo, 1 − r */
      px = X(gx(1)) + 4; c.strokeStyle = C.rise; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.moveTo(px, Y(gy(1))); c.lineTo(px, Y(gy(r))); c.stroke();
      c.lineWidth = 1.2; c.beginPath(); c.moveTo(px - 3, Y(gy(1))); c.lineTo(px + 3, Y(gy(1))); c.moveTo(px - 3, Y(gy(r))); c.lineTo(px + 3, Y(gy(r))); c.stroke();
      T.L('D' + k, gx(1) - 0.02, 1.58, -100);
      T.L('A', gx(0.5), 0.25, -50);
      if (k >= 7) T.L('B' + k, gx(1 + r/2), 0.25, -50); else T.L('B' + k, gx(1) + 0.2, gy(r) + 0.26, 0);
      /* conclusión, junto al dibujo */
      if (k === 0){ txt('razón 0: un solo cuadrado.', X(-1.2), Y(-1.1), 'left', C.ink); txt('La suma es su lado, el primer término.', X(-1.2), Y(-1.1) + 21, 'left', C.ink); }
      else if (k === 10){ txt('razón 1: la recta no baja y nunca toca el eje.', X(-1.2), Y(-1.1), 'left', C.tan); txt('Cuadrados iguales, sin fin: no hay suma.', X(-1.2), Y(-1.1) + 21, 'left', C.tan); }
      else if (k === 9){ txt('la recta baja poco: toca el eje en 10,', X(-1.2), Y(-1.1), 'left', C.ink); txt('fuera del dibujo. Esa es la suma.', X(-1.2), Y(-1.1) + 21, 'left', C.ink); }
      else { txt('la recta pasa por las esquinas y toca el eje', X(-1.2), Y(-1.1), 'left', C.ink); txt('justo donde terminan los lados: en la suma.', X(-1.2), Y(-1.1) + 21, 'left', C.ink); }
      T.L('V' + k, -1.2, -2.15, 0);
      dtQue(S, 'los lados de los cuadrados son los', 'términos; la recta marca la suma. Mueve r.');
      T.fin();
    },
    caption:function(v){ var k = cual(v), e = DAT[k]; return 'Primer término 1 y razón ' + e.rp + ': ' + (k === 10 ? 'la recta es horizontal y no toca el eje; la serie no tiene suma.' : 'la recta toca el eje en la suma, S ' + e.sp + (k === 9 ? ', fuera del dibujo.' : '.')); },
    readout:function(v){ return dtPasos(DAT[cual(v)].R); }
  };
})());
