/* L25 H16 · serie alternante: 1 − 1/2 + 1/4 − 1/8 + 1/16; cada término es un salto (azul si se suma, naranja si se resta) y las sumas parciales van en zigzag alrededor de 2/3 */
function ci16Flecha(S, x0, y0, x1, y1, col, w){ var c = S.ctx, ax = S.X(x0), ay = S.Y(y0), bx = S.X(x1), by = S.Y(y1), d = Math.hypot(bx - ax, by - ay), h, ux, uy; if (d < 1.5) return; ux = (bx - ax)/d; uy = (by - ay)/d; h = Math.min(8, d*0.7);
  c.strokeStyle = col; c.lineWidth = w || 2; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx - ux*h*0.7, by - uy*h*0.7); c.stroke();
  c.fillStyle = col; c.beginPath(); c.moveTo(bx, by); c.lineTo(bx - ux*h - uy*h*0.45, by - uy*h + ux*h*0.45); c.lineTo(bx - ux*h + uy*h*0.45, by - uy*h - ux*h*0.45); c.closePath(); c.fill(); }
function ci16Seg(S, x0, y0, x1, y1, col, wd, dash, al){ var c = S.ctx; c.globalAlpha = al == null ? 1 : al; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); c.moveTo(S.X(x0), S.Y(y0)); c.lineTo(S.X(x1), S.Y(y1)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
/* número exacto con los decimales justos (mínimo 2, máximo d), con coma, para TeX */
function ci16Num(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); while (s.length - s.indexOf('.') - 1 > 2 && s.charAt(s.length - 1) === '0') s = s.slice(0, -1); return s.replace('.', '{,}'); }
OA.scene('alt-idea', (function(){
  var N = 5, SV = [1, 1/2, 3/4, 5/8, 11/16], PV = [0, 1, 1/2, 3/4, 5/8], LIM = 2/3;
  var JP = [[0.25, -100, -6], [0.875, -100, -6], [0.5625, -100, -6], [0.815, -100, -6], [0.585, 0, 7]];
  var PZ = [['J1', '+1', '+1', 'c-sec'], ['J2', '-\\tfrac{1}{2}', '−1/2', 'diff'], ['J3', '+\\tfrac{1}{4}', '+1/4', 'c-sec'], ['J4', '-\\tfrac{1}{8}', '−1/8', 'diff'], ['J5', '+\\tfrac{1}{16}', '+1/16', 'c-sec'],
    ['P1', '1', '1', 'pt'], ['P2', '\\tfrac{1}{2}', '1/2', 'pt'], ['P3', '\\tfrac{3}{4}', '3/4', 'pt'], ['P4', '\\tfrac{5}{8}', '5/8', 'pt'], ['P5', '\\tfrac{11}{16}', '11/16', 'pt'],
    ['LS', '\\tfrac{2}{3}', '2/3', 'c-tan'], ['YM', '\\tfrac{1}{2}', '1/2', ''],
    ['Q', '1-\\tfrac{1}{2}+\\tfrac{1}{4}-\\tfrac{1}{8}+\\tfrac{1}{16}-\\cdots=\\ ?', '1 − 1/2 + 1/4 − 1/8 + 1/16 − … = ?', 'pt'],
    ['F', '\\Longrightarrow\\ \\sum_{n=1}^{\\infty}\\left(-\\tfrac{1}{2}\\right)^{n-1}=\\dfrac{1}{1+\\frac{1}{2}}=\\tfrac{2}{3}', '⟹ la suma de (−1/2)ⁿ⁻¹ desde n = 1 es 1/(1 + 1/2) = 2/3', 'diff'],
    ['R1', 'S_{1}=1', 'S₁ = 1', ''],
    ['R2', 'S_{2}=1-\\tfrac{1}{2}=\\tfrac{1}{2}', 'S₂ = 1 − 1/2 = 1/2', ''],
    ['R3', 'S_{3}=\\tfrac{1}{2}+\\tfrac{1}{4}=\\tfrac{3}{4}', 'S₃ = 1/2 + 1/4 = 3/4', ''],
    ['R4', 'S_{4}=\\tfrac{3}{4}-\\tfrac{1}{8}=\\tfrac{5}{8}', 'S₄ = 3/4 − 1/8 = 5/8', ''],
    ['R5', 'S_{5}=\\tfrac{5}{8}+\\tfrac{1}{16}=\\tfrac{11}{16};\\quad\\text{suma de la serie: }\\tfrac{2}{3}', 'S₅ = 5/8 + 1/16 = 11/16; suma de la serie: 2/3', 'diff']];
  var TXT = [['Se parte de cero. El primer término se suma:', 'flecha azul hacia arriba, hasta 1.'],
    ['El segundo término se resta: flecha naranja', 'hacia abajo. La suma parcial baja a un medio.'],
    ['El tercero se suma: sube, pero solo un cuarto.', 'No alcanza a volver a 1.'],
    ['El cuarto se resta: baja, pero solo un octavo.', 'No alcanza a volver a un medio.'],
    ['Sube un dieciseisavo. Recta burdeo: la suma.', 'Los puntos quedan arriba y abajo, más cerca.']];
  function gx(n){ return -0.6 + 0.9*n; } function gy(y){ return 1.15 + 3.8*y; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:7.6}, aspect:12.2/6.6,
    aria:'Arriba, una franja dice qué muestra: una serie alternante suma y resta por turnos, y sus sumas parciales van en zigzag. Animación en cinco pasos con la serie 1 menos un medio más un cuarto menos un octavo más un dieciseisavo, en una gráfica: en horizontal el número de términos sumados, de 1 a 5; en vertical, la suma parcial, de 0 a 1. Uno: una flecha azul sube desde 0 hasta 1, rotulada más 1; queda un punto a la altura 1, con su valor y una línea punteada hasta el eje vertical. Dos: desde la altura 1, una flecha naranja baja un medio, rotulada menos un medio; el punto queda a la altura un medio. Tres: una flecha azul sube un cuarto; el punto queda en tres cuartos. Cuatro: una flecha naranja baja un octavo; el punto queda en cinco octavos. Cinco: una flecha azul sube un dieciseisavo; el punto queda en once dieciseisavos; después aparece una recta horizontal burdeo a la altura dos tercios, la suma de la serie, y un trazo burdeo une cada punto con la recta: los puntos primero, tercero y quinto quedan arriba de la recta, el segundo y el cuarto abajo, y cada trazo mide la mitad del anterior. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la suma parcial de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> término que se suma: la suma parcial sube</span><span><i class="sw rise"></i> término que se resta: la suma parcial baja</span><span><i class="sw tan"></i> la suma de la serie, \\(\\tfrac{2}{3}\\), y lo que separa de ella a cada suma parcial</span><span>puntos: las sumas parciales; líneas punteadas grises: llevan cada una a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, e, a, b, col, g;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* ejes: n en horizontal, la suma parcial en vertical */
      S.line(gx(0), gy(0), gx(5.5), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.1), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= N; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(1))); c.lineTo(X(gx(0)) + 3, Y(gy(1))); c.stroke();
      c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(0.5))); c.lineTo(X(gx(0)) + 3, Y(gy(0.5))); c.stroke(); num('1', X(gx(0)) - 7, Y(gy(1)), 'right'); L('YM', gx(0), gy(0.5), -100, -6, 0);
      num('0', X(gx(0)) - 7, Y(gy(0)), 'right'); num('n', X(gx(5.5)) + 6, Y(gy(0)), 'left'); num('Sₙ', X(gx(0)) + 6, Y(gy(1.1)) - 1, 'left');
      /* paso 5, segunda mitad: la suma de la serie (recta burdeo) y lo que separa de ella a cada suma parcial */
      g = k === N ? Math.max(0, Math.min(1, (u - 0.5)*2)) : 0;
      if (g > 0){ ci16Seg(S, gx(0), gy(LIM), gx(0) + (gx(5.5) - gx(0))*g, gy(LIM), C.tan, 1.2, [5, 4]);
        for (i = 1; i <= N; i++) ci16Seg(S, gx(i) + 0.09, gy(SV[i - 1]), gx(i) + 0.09, gy(SV[i - 1] + (LIM - SV[i - 1])*g), C.tan, 1.8);
        if (g > 0.9){ L('LS', gx(5.5), gy(LIM), 0, 4, -1); c.font = '600 11px ' + F; c.fillStyle = C.tan; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('trazos burdeo: distancia a la recta', X(5.2), Y(gy(0.96))); } }
      /* un salto por término: guía punteada desde el punto anterior, flecha, punto y punteada al eje; lo de cada paso queda */
      for (i = 1; i <= k; i++){ w = i < k ? 1 : (i === N ? Math.min(1, u*2) : u); a = PV[i - 1]; b = SV[i - 1]; col = b > a ? C.sec : C.rise;
        if (i > 1) ci16Seg(S, gx(i - 1), gy(a), gx(i - 1) + 0.9*Math.min(1, w*2), gy(a), col, 0.9, [3, 3], 0.8);
        e = i === 1 ? w : Math.max(0, (w - 0.5)*2);
        if (e > 0) ci16Flecha(S, gx(i), gy(a), gx(i), gy(a + (b - a)*e), col, 2);
        if (w >= 1){ ci16Seg(S, gx(i), gy(b), gx(0), gy(b), C.ink, 0.9, [2, 3], 0.35); c.beginPath(); c.arc(X(gx(0)), Y(gy(b)), 2, 0, 6.2832); c.fillStyle = C.ink; c.fill();
          c.beginPath(); c.arc(X(gx(i)), Y(gy(b)), 2.8, 0, 6.2832); c.fillStyle = C.ink; c.fill();
          L('J' + i, gx(i), gy(JP[i - 1][0]), JP[i - 1][1], JP[i - 1][2], 0);
          if (i === 3) L('P3', gx(3), gy(b), -100, -4, -12); else L('P' + i, gx(i), gy(b), -50, 0, b > a ? -13 : 13); } }
      L('Q', -1.2, 6.28, 0); if (k === N && u > 0.75) L('F', -1.2, 5.72, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(6.28));
      dtQue(S, 'una serie alternante suma y resta', 'por turnos: sus sumas parciales van en zigzag.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', f = function(a, b){ return '\\dfrac{' + a + '}{' + b + '}'; }, R = [
      '\\text{Serie: }1-' + f(1, 2) + '+' + f(1, 4) + '-' + f(1, 8) + '+' + f(1, 16) + '-\\cdots' + Q + '\\text{En notación: }\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n+1}\\,b_{n},\\quad b_{n}=\\dfrac{1}{2^{\\,n-1}}' + Q + '\\text{Signo: }(-1)^{n+1}\\text{ vale }1\\text{ si }n\\text{ es impar}' + Q + '\\text{(se suma) y }-1\\text{ si }n\\text{ es par (se resta).}' + Q + 'b_{1}=1,\\ \\ b_{2}=' + f(1, 2) + ',\\ \\ b_{3}=' + f(1, 4) + ',\\ \\ b_{4}=' + f(1, 8) + ',\\ \\ b_{5}=' + f(1, 16) + Q + '\\text{Primer término: se suma. Flecha azul de }0\\text{ a }1\\text{:}' + Q + 'S_{1}=b_{1}=1',
      '\\text{Segundo término: se resta (flecha naranja).}' + Q + 'S_{2}=S_{1}-b_{2}=1-' + f(1, 2) + Q + '\\text{Denominador común }2\\text{: }1=' + f(2, 2) + Q + f(2, 2) + '-' + f(1, 2) + '=\\dfrac{2-1}{2}=' + f(1, 2) + Q + 'S_{2}=' + f(1, 2),
      '\\text{Tercer término: se suma (flecha azul).}' + Q + 'S_{3}=S_{2}+b_{3}=' + f(1, 2) + '+' + f(1, 4) + Q + '\\text{Denominador común }4\\text{: }' + f(1, 2) + '=' + f(2, 4) + Q + f(2, 4) + '+' + f(1, 4) + '=\\dfrac{2+1}{4}=' + f(3, 4) + Q + 'S_{3}=' + f(3, 4),
      '\\text{Cuarto término: se resta (flecha naranja).}' + Q + 'S_{4}=S_{3}-b_{4}=' + f(3, 4) + '-' + f(1, 8) + Q + '\\text{Denominador común }8\\text{: }' + f(3, 4) + '=' + f(6, 8) + Q + f(6, 8) + '-' + f(1, 8) + '=\\dfrac{6-1}{8}=' + f(5, 8) + Q + 'S_{4}=' + f(5, 8),
      '\\text{Quinto término: se suma (flecha azul).}' + Q + 'S_{5}=S_{4}+b_{5}=' + f(5, 8) + '+' + f(1, 16) + Q + '\\text{Denominador común }16\\text{: }' + f(5, 8) + '=' + f(10, 16) + Q + f(10, 16) + '+' + f(1, 16) + '=\\dfrac{10+1}{16}=' + f(11, 16) + Q + 'S_{5}=' + f(11, 16)
        + Q + '\\text{La suma de la serie (recta burdeo):}' + Q + '\\text{cada término es el anterior por }-' + f(1, 2) + '\\text{:}' + Q + '1\\cdot\\left(-' + f(1, 2) + '\\right)=-' + f(1, 2) + ',\\quad\\left(-' + f(1, 2) + '\\right)\\left(-' + f(1, 2) + '\\right)=' + f(1, 4) + Q + f(1, 4) + '\\cdot\\left(-' + f(1, 2) + '\\right)=-' + f(1, 8) + ',\\quad\\left(-' + f(1, 8) + '\\right)\\left(-' + f(1, 2) + '\\right)=' + f(1, 16)
        + Q + '\\text{Es geométrica, con }a=1\\text{ y }r=-' + f(1, 2) + '.' + Q + '|r|=' + f(1, 2) + '<1\\text{: converge (hoja}' + Q + '\\text{«Series geométricas infinitas») y su suma es}' + Q + '\\dfrac{a}{1-r}=\\dfrac{1}{1-\\left(-\\frac{1}{2}\\right)}=\\dfrac{1}{1+\\frac{1}{2}}' + Q + '1+' + f(1, 2) + '=' + f(2, 2) + '+' + f(1, 2) + '=' + f(3, 2) + Q + '1:' + f(3, 2) + '=1\\cdot' + f(2, 3) + '=' + f(2, 3)
        + Q + '\\text{Lo que separa cada suma parcial de }' + f(2, 3) + Q + '\\text{(trazos burdeo):}' + Q + 'S_{1}-' + f(2, 3) + '=' + f(3, 3) + '-' + f(2, 3) + '=' + f(1, 3) + Q + f(2, 3) + '-S_{2}=' + f(4, 6) + '-' + f(3, 6) + '=' + f(1, 6) + Q + 'S_{3}-' + f(2, 3) + '=' + f(9, 12) + '-' + f(8, 12) + '=' + f(1, 12) + Q + f(2, 3) + '-S_{4}=' + f(16, 24) + '-' + f(15, 24) + '=' + f(1, 24) + Q + 'S_{5}-' + f(2, 3) + '=' + f(33, 48) + '-' + f(32, 48) + '=' + f(1, 48)
        + Q + 'S_{1},\\ S_{3},\\ S_{5}\\text{ quedan arriba de }' + f(2, 3) + '\\text{;}' + Q + 'S_{2},\\ S_{4}\\text{ quedan abajo. Cada distancia}' + Q + '\\text{es la mitad de la anterior: zigzag que}' + Q + '\\text{se cierra sobre }' + f(2, 3) + '.'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: las ocho primeras sumas parciales de 1 + r + r² + … con r entre −1 y 0; el foco es el signo alternado */
OA.scene('alt-vivo', (function(){
  var NP = 8, PZ = [['P1', 'S_{1}', 'S₁', 'pt'], ['P2', 'S_{2}', 'S₂', 'pt'], ['P3', 'S_{3}', 'S₃', 'pt'], ['P4', 'S_{4}', 'S₄', 'pt'], ['A2', 'a_{2}', 'a₂', 'diff'], ['A3', 'a_{3}', 'a₃', 'c-sec'], ['A4', 'a_{4}', 'a₄', 'diff']];
  function gx(n){ return -0.55 + 0.6*n; } function gy(y){ return 0.75 + 3.4*y; }
  /* todo se calcula con r redondeada a centésimas: R = 100·r es un entero y las cuentas son exactas */
  function dat(v){ var R = Math.round(Math.max(-1, Math.min(0, v.r == null ? -0.5 : +v.r))*100), D = 100 - R, i, t = 1, s = 0, a = [], o;
    for (i = 0; i < NP; i++){ s += t; a.push(s); t *= R/100; }
    o = {R:R, r:R/100, D:D, a:a, caso:R === 0 ? 0 : (R <= -100 ? 3 : 1), a2:R/100, a3:R*R/1e4, a4:R*R*R/1e6, S2:(100 + R)/100, S3:(1e4 + 100*R + R*R)/1e4, S4:(1e6 + 1e4*R + 100*R*R + R*R*R)/1e6};
    if (o.caso !== 3){ o.lim = 100/D; o.Sr = Math.round(10000/D)/100; o.eS = 10000 % D === 0; }
    return o; }
  function fr(d){ return d.caso === 0 ? ['razón: 0,00. Los términos que siguen valen cero', 'sin flechas: no se suma ni se resta nada', 'no hay zigzag: todos los puntos valen 1', 'recta burdeo: la suma; los puntos están en ella']
    : ['razón: ' + oaDec(d.r, 2) + ' (negativa): los signos se alternan', 'flecha azul: término positivo, la suma sube', 'flecha naranja: término negativo, la suma baja', d.caso === 1 ? 'recta burdeo: la suma; puntos a ambos lados' : 'sin recta burdeo: salta entre 1 y 0, no hay suma']; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.5, y1:5.6}, aspect:7.1/6.6,
    aria:'Arriba, una franja dice qué muestra: con razón negativa los signos se alternan y las sumas parciales van en zigzag. Gráfica de puntos con las ocho primeras sumas parciales de la serie geométrica 1 más r más r al cuadrado, y así. Un deslizador cambia la razón r entre menos 1 y 0. Cada punto está unido por una línea punteada con su valor en el eje vertical. Entre cada punto y el siguiente hay una flecha vertical, que es el término que se agrega: azul hacia arriba si el término es positivo, naranja hacia abajo si es negativo. Los cuatro primeros puntos llevan su nombre y las tres primeras flechas, el nombre de su término. Con r igual a 0 no hay flechas y todos los puntos están a la altura 1, sobre una recta burdeo punteada. Con r negativo y mayor que menos 1, las flechas alternan azul y naranja, cada una más corta que la anterior, y los puntos quedan a un lado y al otro de la recta burdeo, trazada a la altura 1 dividido por 1 menos r, cada vez más cerca de ella. Con r igual a menos 1 todas las flechas miden 1, los puntos saltan entre 1 y 0, y no hay recta. Bajo el dibujo, cuatro frases dicen la razón, qué significa cada color de flecha y por qué hay o no hay recta burdeo; más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'r', tex:'r', min:-1, max:0, step:0.25, value:-0.5}],
    legend:'<span><i class="sw sec"></i> término positivo: la suma parcial sube</span><span><i class="sw rise"></i> término negativo: la suma parcial baja</span><span><i class="sw tan"></i> la suma, \\(\\tfrac{1}{1-r}\\), cuando \\(|r|&lt;1\\)</span><span>puntos: las sumas parciales; líneas punteadas grises: llevan cada una a su valor en el eje \\(S_{n}\\)</span>',
    anim:{run:20000, hold:5000, still:1, apply:function(p, v){ v.q = p; v.r = -p; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var d = dat(v), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', a = d.a, s = X(1) - X(0), i, y, p, col, up, jp, fs = fr(d);
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.line(gx(0), gy(0), gx(8.6), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.1), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (i = 1; i <= NP; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
      for (i = 1; i <= 2; i++){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(i/2))); c.lineTo(X(gx(0)) + 3, Y(gy(i/2))); c.stroke(); num(i === 1 ? '0,5' : '1', X(gx(0)) - 7, Y(gy(i/2)), 'right'); }
      num('0', X(gx(0)) - 7, Y(gy(0)), 'right'); num('n', X(gx(8.6)), Y(gy(0)) + 11, 'center'); num('Sₙ', X(gx(0)) + 6, Y(gy(1.1)) - 1, 'left');
      /* la suma, cuando existe */
      if (d.caso !== 3){ ci16Seg(S, gx(0), gy(d.lim), gx(8.6), gy(d.lim), C.tan, 1.2, [5, 4]); c.font = '700 11.5px ' + F; c.fillStyle = C.tan; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(oaDec(d.Sr, 2), X(gx(8.6)) + 4, Y(gy(d.lim))); }
      /* punteadas al eje, saltos (flechas) y puntos */
      for (i = 1; i <= NP; i++){ y = a[i - 1]; ci16Seg(S, gx(i), gy(y), gx(0), gy(y), C.ink, 0.9, [2, 3], 0.3); c.beginPath(); c.arc(X(gx(0)), Y(gy(y)), 2, 0, 6.2832); c.fillStyle = C.ink; c.fill(); }
      for (i = 2; i <= NP; i++){ y = a[i - 1]; p = a[i - 2]; jp = Math.abs(y - p)*3.4*s; if (jp < 1.5) continue; col = y > p ? C.sec : C.rise;
        ci16Seg(S, gx(i - 1), gy(p), gx(i), gy(p), col, 0.9, [3, 3], 0.8); ci16Flecha(S, gx(i), gy(p), gx(i), gy(y), col, 2);
        if (i <= 4 && jp >= 16) T.L('A' + i, gx(i), gy((y + p)/2), -100, -4, 0); }
      for (i = 1; i <= NP; i++){ y = a[i - 1]; c.beginPath(); c.arc(X(gx(i)), Y(gy(y)), 2.8, 0, 6.2832); c.fillStyle = C.ink; c.fill();
        if (i <= 4){ up = i % 2 === 1 || d.caso === 0; if (up) T.L('P' + i, gx(i), gy(y), -50, 0, -12); else if (y < 0.08) T.L('P' + i, gx(i), gy(y), 0, 5, -10); else T.L('P' + i, gx(i), gy(y), -50, 0, 12); } }
      txt(fs[0], X(-1.2), Y(0.12), 'left', C.ink); txt(fs[1], X(-1.2), Y(0.12) + 21, 'left', d.caso === 0 ? C.ink : C.sec); txt(fs[2], X(-1.2), Y(0.12) + 42, 'left', d.caso === 0 ? C.ink : C.rise); txt(fs[3], X(-1.2), Y(0.12) + 63, 'left', d.caso === 3 ? C.rise : C.tan);
      dtQue(S, 'con razón negativa los signos se', 'alternan: las sumas parciales van en zigzag.');
      T.fin();
    },
    caption:function(v){ var d = dat(v); return d.caso === 0 ? 'Con razón 0,00 no hay signos alternados: todas las sumas parciales valen 1 y la suma es 1.' : d.caso === 1 ? 'Con razón ' + oaDec(d.r, 2) + ' los términos alternan de signo y las sumas parciales van en zigzag, cada vez más cerca de la suma, ' + (d.eS ? '' : 'aproximadamente ') + oaDec(d.Sr, 2) + '.' : 'Con razón −1,00 las sumas parciales saltan entre 1 y 0: la serie es alternante y no tiene suma.'; },
    readout:function(v){ var d = dat(v), n = ci16Num, p = function(z, k){ return z < 0 ? '(' + n(z, k) + ')' : n(z, k); }, Q = '\\\\&\\qquad ', r = d.r, L;
      L = ['\\text{Datos: }a=1,\\qquad r=' + n(r, 2) + Q + '\\text{Serie: }1+r+r^{2}+r^{3}+\\cdots=\\displaystyle\\sum_{n=1}^{\\infty}r^{\\,n-1}',
        '\\text{Términos: cada uno es el anterior por }r\\text{:}' + Q + 'a_{1}=1' + Q + 'a_{2}=a_{1}\\cdot r=1\\cdot ' + p(r, 2) + '=' + n(d.a2, 2) + Q + 'a_{3}=a_{2}\\cdot r=' + p(d.a2, 2) + '\\cdot ' + p(r, 2) + '=' + n(d.a3, 4) + Q + 'a_{4}=a_{3}\\cdot r=' + n(d.a3, 4) + '\\cdot ' + p(r, 2) + '=' + n(d.a4, 6)
          + (d.caso === 0 ? Q + '\\text{Desde el segundo, los términos valen }0\\text{:}' + Q + '\\text{no hay signos que alternar. No es una}' + Q + '\\text{serie alternante (se pide }b_{n}>0\\text{).}' : Q + '\\text{Signos: }+,\\ -,\\ +,\\ -\\text{. Se alternan, porque}' + Q + '\\text{multiplicar por un negativo cambia el signo.}' + Q + '\\text{Es alternante, con }b_{n}=|a_{n}|=' + n(-r, 2) + '^{\\,n-1}.'),
        '\\text{Sumas parciales (los puntos):}' + Q + 'S_{1}=a_{1}=1' + Q + 'S_{2}=S_{1}+a_{2}=1+' + p(d.a2, 2) + '=' + n(d.S2, 2) + (d.caso === 0 ? '' : '\\quad\\text{(baja)}') + Q + 'S_{3}=S_{2}+a_{3}=' + n(d.S2, 2) + '+' + n(d.a3, 4) + '=' + n(d.S3, 4) + (d.caso === 0 ? '' : '\\quad\\text{(sube)}') + Q + 'S_{4}=S_{3}+a_{4}=' + n(d.S3, 4) + '+' + p(d.a4, 6) + Q + '\\phantom{S_{4}}=' + n(d.S4, 6) + (d.caso === 0 ? '' : '\\quad\\text{(baja)}') + Q + (d.caso === 0 ? '\\text{Así siguen hasta }S_{8}\\text{: todas valen }1.' : '\\text{Así siguen hasta }S_{8}\\text{: una sube, la otra baja.}'),
        '\\text{Se compara }|r|\\text{ con }1\\text{:}' + Q + '|r|=' + n(Math.abs(r), 2) + (d.caso === 3 ? '\\text{, que no es menor que }1.' : '<1') + (d.caso === 3 ? '' : Q + '\\text{La serie converge (hoja}' + Q + '\\text{«Series geométricas infinitas»).}')];
      if (d.caso !== 3){ L.push('\\text{Suma: }\\dfrac{a}{1-r}=\\dfrac{1}{1-' + p(r, 2) + '}' + Q + '\\text{Resta: }1-' + p(r, 2) + (d.caso === 0 ? '' : '=1+' + n(-r, 2)) + '=' + n(d.D/100, 2) + Q + '\\text{División: }1:' + n(d.D/100, 2) + (d.eS ? '=' : '\\approx ') + n(d.Sr, 2) + Q + '\\text{Es la altura de la recta burdeo.}');
        if (d.caso === 0) L.push('\\text{Con }r=0\\text{ no hay zigzag: los puntos}' + Q + '\\text{están todos sobre la recta burdeo, en }1.');
        else L.push('\\text{Qué significa: los puntos quedan a un lado}' + Q + '\\text{y al otro de la recta burdeo.}' + (d.S2 < d.Sr && d.Sr < 1 ? Q + 'S_{2}=' + n(d.S2, 2) + '<' + n(d.Sr, 2) + '<1=S_{1}' : Q + '\\text{(Con dos decimales, }S_{2}\\text{ y la suma}' + Q + '\\text{no se distinguen.)}') + Q + '\\text{Cada salto es más corto que el anterior}' + Q + '\\text{(se multiplica por }' + n(-r, 2) + '\\text{): el zigzag se cierra}' + Q + '\\text{sobre la suma.}'); }
      else { L.push('\\text{La fórmula }\\dfrac{a}{1-r}\\text{ no da la suma aquí:}' + Q + '\\text{vale solo si }|r|<1.' + Q + '\\text{Por eso no hay recta burdeo.}');
        L.push('\\text{Todos los términos cumplen }|a_{n}|=1\\text{:}' + Q + '\\text{no tienen límite }0.' + Q + '\\text{Por el criterio del enésimo término,}' + Q + '\\text{la serie diverge.}');
        L.push('\\text{Qué significa: los puntos saltan entre }1\\text{ y }0' + Q + '\\text{y no se acercan a un solo número. Es}' + Q + '\\text{alternante y no tiene suma: alternar}' + Q + '\\text{no basta para converger.}'); }
      return dtPasos(L); }
  };
})());
