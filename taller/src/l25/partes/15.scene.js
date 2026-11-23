/* L25 H15 · criterio de la integral: columnas de ancho 1 (los términos) comparadas con el área bajo la curva */
function ci15Caja(S, xa, xb, ya, yb, col, fa, ga){ var c = S.ctx, px = S.X(xa), py = S.Y(yb), pw = S.X(xb) - S.X(xa), ph = S.Y(ya) - S.Y(yb); if (ph < 0.4 || ga <= 0) return;
  c.globalAlpha = ga; c.fillStyle = '#fff'; c.fillRect(px, py, pw, ph); c.globalAlpha = ga*fa; c.fillStyle = col; c.fillRect(px, py, pw, ph);
  c.globalAlpha = ga; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, pw - 1, Math.max(0.5, ph - 1)); c.globalAlpha = 1; }
/* curva y = f(x) entre a y b */
function ci15Curva(S, gx, gy, f, a, b, col){ var c = S.ctx, i, n = 120, t; if (b <= a) return; c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath();
  for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); } c.stroke(); }
/* región entre la curva y = f(x) y la altura g(x), de a a b (g = 0: área bajo la curva) */
function ci15Area(S, gx, gy, f, g, a, b, col, al){ var c = S.ctx, i, n = 80, t; if (b <= a || al <= 0) return; c.beginPath();
  for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); }
  for (i = n; i >= 0; i--){ t = a + (b - a)*i/n; c.lineTo(S.X(gx(t)), S.Y(gy(g(t)))); }
  c.closePath(); c.globalAlpha = al; c.fillStyle = col; c.fill(); c.globalAlpha = 1; }
/* ejes: x de 0 a xm, con marcas en los enteros; y hasta 1,1, con marca en 1 */
function ci15Ejes(S, gx, gy, xm){ var c = S.ctx, C = S.C, X = S.X, Y = S.Y, i;
  function num(t, px, py, al){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
  S.line(gx(0), gy(0), gx(xm), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(1.1), {color:C.ink, width:1.1});
  c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
  for (i = 0; i <= Math.floor(xm); i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(0)) - 3); c.lineTo(X(gx(i)), Y(gy(0)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(0)) + 11, 'center'); }
  c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(1))); c.lineTo(X(gx(0)) + 3, Y(gy(1))); c.stroke(); num('1', X(gx(0)) - 7, Y(gy(1)), 'right');
  num('x', X(gx(xm)) + 2, Y(gy(0)) + 11, 'center'); }
function ci15Punto(S, x, y, col){ var c = S.ctx; c.beginPath(); c.arc(S.X(x), S.Y(y), 2.6, 0, 6.2832); c.fillStyle = col; c.fill(); }

/* idea: 1/n² · las columnas de a₂…a₅ quedan BAJO la curva y = 1/x²; la suma parcial no pasa de 1 + área */
OA.scene('int-idea', (function(){
  var N = 5, XB = -0.75, UX = 1.1, YB = 1.8, H = 2.9, XM = 5.4;
  function gx(x){ return XB + UX*x; } function gy(y){ return YB + H*y; } function f(x){ return 1/(x*x); } function cero(){ return 0; }
  var PZ = [['C1', 'a_{1}=1', 'a₁ = 1', 'c-sec'], ['C2', 'a_{2}=\\tfrac{1}{4}', 'a₂ = 1/4', 'c-sec'], ['C3', 'a_{3}=\\tfrac{1}{9}', 'a₃ = 1/9', 'c-sec'], ['C4', 'a_{4}=\\tfrac{1}{16}', 'a₄ = 1/16', 'c-sec'], ['C5', 'a_{5}=\\tfrac{1}{25}', 'a₅ = 1/25', 'c-sec'],
    ['CV', 'y=\\tfrac{1}{x^{2}}', 'y = 1/x²', 'c-tan'],
    ['AR', '\\text{área verde}=\\displaystyle\\int_{1}^{5}\\tfrac{dx}{x^{2}}=\\tfrac{4}{5}', 'área verde = ∫ de 1 a 5 de dx/x² = 4/5', 'c-alt'],
    ['S5', 'S_{5}\\le 1+\\tfrac{4}{5}=\\tfrac{9}{5}', 'S₅ ≤ 1 + 4/5 = 9/5', 'diff'],
    ['G', 'S_{n}\\le 1+\\left(1-\\tfrac{1}{n}\\right)<2', 'Sₙ ≤ 1 + (1 − 1/n) < 2', 'diff'],
    ['Q', '1+\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\cdots\\ \\ \\text{¿converge?}', '1 + 1/4 + 1/9 + 1/16 + … ¿converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí: }S_{n}<2\\text{ siempre; la serie converge}', '⟹ sí: Sₙ < 2 siempre; la serie converge', 'diff'],
    ['R1', 'S_{5}=1+\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\tfrac{1}{25}', 'S₅ = 1 + 1/4 + 1/9 + 1/16 + 1/25', ''],
    ['R2', '\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\tfrac{1}{25}\\le\\int_{1}^{5}\\tfrac{dx}{x^{2}}', '1/4 + 1/9 + 1/16 + 1/25 ≤ ∫ de 1 a 5 de dx/x²', ''],
    ['R3', '\\int_{1}^{5}\\tfrac{dx}{x^{2}}=1-\\tfrac{1}{5}=\\tfrac{4}{5}', '∫ de 1 a 5 de dx/x² = 1 − 1/5 = 4/5', ''],
    ['R4', 'S_{5}\\le 1+\\tfrac{4}{5}=\\tfrac{9}{5}', 'S₅ ≤ 1 + 4/5 = 9/5', ''],
    ['R5', 'S_{n}\\le 1+\\left(1-\\tfrac{1}{n}\\right)<2\\ \\Longrightarrow\\ \\text{converge}', 'Sₙ ≤ 1 + (1 − 1/n) < 2 ⟹ converge', 'diff']];
  var TXT = [['Cada columna tiene ancho 1 y de alto un término:', 'su área es ese término de la serie.'],
    ['La curva pasa por la esquina de cada columna:', 'desde la segunda, las columnas quedan bajo ella.'],
    ['Área verde: bajo la curva, entre 1 y 5.', 'Las columnas 2 a 5 caben dentro: suman menos.'],
    ['La primera columna (naranja) queda fuera de', 'la curva: su 1 se suma aparte a la cota.'],
    ['Con más columnas pasa lo mismo: el área verde', 'nunca llega a 1. Las sumas no pasan de 2.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.0, y1:7.2}, aspect:11.2/6.6,
    aria:'Arriba, una franja dice qué muestra: los términos son columnas; el área bajo la curva les pone tope. Animación en cinco pasos con la serie de término uno dividido por n al cuadrado. Uno: sobre un eje horizontal aparecen cinco columnas azules de ancho 1; la columna del término k va de k menos 1 a k y su alto es el término: 1, un cuarto, un noveno, un dieciseisavo y un veinticincoavo; cada valor queda escrito bajo su columna. Arriba queda la pregunta: ¿converge la serie? Dos: se traza la curva burdeo y igual a uno dividido por x al cuadrado, desde x igual a 1; pasa por la esquina superior derecha de cada columna, de modo que las columnas segunda a quinta quedan bajo la curva. Tres: se pinta de verde el área bajo la curva entre 1 y 5; vale la integral de 1 a 5, que es 1 menos un quinto, cuatro quintos; las columnas segunda a quinta caben dentro. Cuatro: la primera columna se pinta naranja, porque queda fuera de la curva y se suma aparte: la suma de cinco términos no pasa de 1 más cuatro quintos, nueve quintos. Cinco: el área verde sigue hacia la derecha; con n columnas, la suma parcial no pasa de 1 más 1 menos uno dividido por n, que es menor que 2; las sumas parciales crecen y están acotadas: la serie converge. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(\\tfrac{1}{n^{2}}\\), como columnas de ancho 1</span><span><i class="sw tan"></i> la curva \\(y=\\tfrac{1}{x^{2}}\\)</span><span><i class="sw alt"></i> el área bajo la curva</span><span><i class="sw rise"></i> la primera columna, que se suma aparte</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, b;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      ci15Ejes(S, gx, gy, XM);
      /* columnas: la de a_k va de k − 1 a k, con alto 1/k² */
      for (i = 1; i <= 5; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*5 - (i - 1))) : 1; if (w <= 0) continue; ci15Caja(S, gx(i - 1), gx(i), gy(0), gy(w*f(i)), C.sec, 0.3, 1); }
      /* paso 4: la primera columna, fuera de la curva, se pinta naranja */
      if (k >= 4){ w = k === 4 ? u : 1; c.globalAlpha = 0.5*w; c.fillStyle = C.rise; c.fillRect(X(gx(0)), Y(gy(1)), X(gx(1)) - X(gx(0)), Y(gy(0)) - Y(gy(1))); c.globalAlpha = w; c.strokeStyle = C.rise; c.lineWidth = 1.4; c.strokeRect(X(gx(0)) + 0.5, Y(gy(1)) + 0.5, X(gx(1)) - X(gx(0)) - 1, Y(gy(0)) - Y(gy(1)) - 1); c.globalAlpha = 1; }
      /* paso 3: área bajo la curva entre 1 y 5; paso 5: sigue hacia la derecha */
      if (k >= 3) ci15Area(S, gx, gy, f, cero, 1, k === 3 ? 1 + 4*u : 5, C.alt, 0.32);
      if (k === 5){ ci15Area(S, gx, gy, f, cero, 5, 5 + (XM - 5)*u, C.alt, 0.32); c.font = '700 13px ' + F; c.fillStyle = C.alt; c.textAlign = 'left'; c.textBaseline = 'middle'; c.globalAlpha = u; c.fillText('…', X(gx(XM)) + 2, Y(gy(0.06))); c.globalAlpha = 1; }
      /* paso 2: la curva, desde x = 1; pasa por la esquina superior derecha de cada columna */
      if (k >= 2){ b = k === 2 ? 1 + (XM - 1)*u : XM; ci15Curva(S, gx, gy, f, 1, b, C.tan); for (i = 1; i <= 5; i++) if (b >= i) ci15Punto(S, gx(i), gy(f(i)), C.tan); }
      /* rótulos: una vez puestos, no se quitan */
      for (i = 1; i <= 5; i++) if (k > 1 || u*5 >= i) L('C' + i, gx(i - 0.5), YB, -50, 0, 31);
      if (k > 2 || (k === 2 && u > 0.4)) L('CV', gx(1.22), gy(1.0), 0);
      if (k > 3 || (k === 3 && u > 0.6)) L('AR', gx(1.72), gy(0.76), 0);
      if (k > 4 || (k === 4 && u > 0.6)) L('S5', gx(1.72), gy(0.52), 0);
      if (k === 5 && u > 0.6) L('G', gx(2.3), gy(0.3), 0);
      L('Q', -1.2, 5.85, 0); if (k === N && u > 0.5) L('F', -1.2, 5.38, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.6); txt(TXT[k - 1][1], -1.2, 0.6 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.85));
      dtQue(S, 'los términos son columnas;', 'el área bajo la curva les pone tope.');
      T.fin();
      oaReg(S, k, N, -1.2, -0.8, [6, 40, 74, 108, 142]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos: }f(x)=\\dfrac{1}{x^{2}},\\qquad a_{n}=f(n)=\\dfrac{1}{n^{2}}' + Q + '\\dfrac{1}{1^{2}}=1,\\quad\\dfrac{1}{2^{2}}=\\dfrac{1}{4},\\quad\\dfrac{1}{3^{2}}=\\dfrac{1}{9}' + Q + '\\dfrac{1}{4^{2}}=\\dfrac{1}{16},\\quad\\dfrac{1}{5^{2}}=\\dfrac{1}{25}' + Q + '\\text{Cada columna: ancho }1\\text{, alto }a_{n}\\text{;}' + Q + '\\text{área}=1\\cdot a_{n}=a_{n}' + Q + 'S_{5}=\\displaystyle\\sum_{n=1}^{5}\\dfrac{1}{n^{2}}=1+\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\tfrac{1}{25}',
      '\\text{La columna de }a_{k}\\text{ va de }x=k-1\\text{ a }x=k.' + Q + '\\text{Ahí }x\\le k\\text{; con }x>0\\text{: }x^{2}\\le k^{2}' + Q + '\\text{Se invierte (son positivos): }\\dfrac{1}{x^{2}}\\ge\\dfrac{1}{k^{2}}' + Q + '\\text{La curva va sobre el techo de la columna.}' + Q + '\\text{La curva se usa desde }x=1\\text{: vale para }k\\ge 2.' + Q + '\\text{Área de la columna}\\le\\text{área bajo la curva:}' + Q + 'a_{k}\\le\\displaystyle\\int_{k-1}^{k}\\dfrac{dx}{x^{2}}' + Q + '\\text{Se suma con }k=2,\\ 3,\\ 4,\\ 5\\text{:}' + Q + '\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\tfrac{1}{25}\\le\\displaystyle\\int_{1}^{5}\\dfrac{dx}{x^{2}}',
      '\\text{Una primitiva de }\\dfrac{1}{x^{2}}\\text{ es }-\\dfrac{1}{x}\\text{,}' + Q + '\\text{porque }\\left(-\\dfrac{1}{x}\\right)^{\\prime}=\\dfrac{1}{x^{2}}' + Q + '\\displaystyle\\int_{1}^{5}\\dfrac{dx}{x^{2}}=\\left(-\\dfrac{1}{5}\\right)-\\left(-\\dfrac{1}{1}\\right)' + Q + '=-\\dfrac{1}{5}+1=1-\\dfrac{1}{5}' + Q + '=\\dfrac{5}{5}-\\dfrac{1}{5}=\\dfrac{4}{5}=0{,}8',
      'S_{5}=1+\\left(\\tfrac{1}{4}+\\tfrac{1}{9}+\\tfrac{1}{16}+\\tfrac{1}{25}\\right)' + Q + '\\text{El paréntesis no pasa de }\\tfrac{4}{5}\\text{ (pasos 2 y 3):}' + Q + 'S_{5}\\le 1+\\dfrac{4}{5}=\\dfrac{5}{5}+\\dfrac{4}{5}=\\dfrac{9}{5}=1{,}8' + Q + '\\text{Comprobación, denominador común }3600\\text{:}' + Q + '1=\\tfrac{3600}{3600},\\quad\\tfrac{1}{4}=\\tfrac{900}{3600},\\quad\\tfrac{1}{9}=\\tfrac{400}{3600}' + Q + '\\tfrac{1}{16}=\\tfrac{225}{3600},\\quad\\tfrac{1}{25}=\\tfrac{144}{3600}' + Q + '3600+900=4500,\\quad 4500+400=4900' + Q + '4900+225=5125,\\quad 5125+144=5269' + Q + 'S_{5}=\\dfrac{5269}{3600}\\approx 1{,}464\\le 1{,}8\\ \\checkmark',
      '\\text{Con }n\\text{ columnas, lo mismo:}' + Q + '\\tfrac{1}{4}+\\tfrac{1}{9}+\\cdots+\\tfrac{1}{n^{2}}\\le\\displaystyle\\int_{1}^{n}\\dfrac{dx}{x^{2}}' + Q + '\\displaystyle\\int_{1}^{n}\\dfrac{dx}{x^{2}}=\\left(-\\dfrac{1}{n}\\right)-\\left(-\\dfrac{1}{1}\\right)' + Q + '=-\\dfrac{1}{n}+1=1-\\dfrac{1}{n}' + Q + 'S_{n}\\le 1+\\left(1-\\dfrac{1}{n}\\right)=2-\\dfrac{1}{n}<2' + Q + 'S_{n}\\text{ crece (se suman positivos)}' + Q + '\\text{y no pasa de }2\\text{: tiene límite.}' + Q + '\\text{La serie converge.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());

/* la armónica: las columnas de a₁…a₄ quedan SOBRE la curva y = 1/x; la suma parcial supera al área, que no tiene tope */
OA.scene('int-arm', (function(){
  var N = 5, XB = -0.75, UX = 1.1, YB = 1.8, H = 2.9, XM = 5.4;
  function gx(x){ return XB + UX*x; } function gy(y){ return YB + H*y; } function f(x){ return 1/x; } function cero(){ return 0; } function techo(x){ return 1/Math.min(4, Math.floor(x + 1e-9)); }
  var PZ = [['C1', 'a_{1}=1', 'a₁ = 1', 'c-sec'], ['C2', 'a_{2}=\\tfrac{1}{2}', 'a₂ = 1/2', 'c-sec'], ['C3', 'a_{3}=\\tfrac{1}{3}', 'a₃ = 1/3', 'c-sec'], ['C4', 'a_{4}=\\tfrac{1}{4}', 'a₄ = 1/4', 'c-sec'],
    ['CV', 'y=\\tfrac{1}{x}', 'y = 1/x', 'c-tan'],
    ['AR', '\\text{área verde}=\\displaystyle\\int_{1}^{5}\\tfrac{dx}{x}=\\ln 5', 'área verde = ∫ de 1 a 5 de dx/x = ln 5', 'c-alt'],
    ['S4', 'S_{4}\\approx 2{,}08\\ \\ge\\ \\ln 5\\approx 1{,}61', 'S₄ ≈ 2,08 ≥ ln 5 ≈ 1,61', 'diff'],
    ['G', 'S_{n}\\ge\\ln(n+1)\\text{: sin tope}', 'Sₙ ≥ ln(n + 1): sin tope', 'diff'],
    ['Q', '1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\cdots\\ \\ \\text{¿converge?}', '1 + 1/2 + 1/3 + 1/4 + … ¿converge?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{no: }S_{n}\\ge\\ln(n+1)\\text{, sin tope; diverge}', '⟹ no: Sₙ ≥ ln(n + 1), sin tope; diverge', 'diff'],
    ['R1', 'S_{4}=1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}=\\tfrac{25}{12}', 'S₄ = 1 + 1/2 + 1/3 + 1/4 = 25/12', ''],
    ['R2', '1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}\\ge\\int_{1}^{5}\\tfrac{dx}{x}', '1 + 1/2 + 1/3 + 1/4 ≥ ∫ de 1 a 5 de dx/x', ''],
    ['R3', '\\int_{1}^{5}\\tfrac{dx}{x}=\\ln 5-\\ln 1=\\ln 5\\approx 1{,}61', '∫ de 1 a 5 de dx/x = ln 5 − ln 1 = ln 5 ≈ 1,61', ''],
    ['R4', 'S_{4}\\approx 2{,}08\\ \\ge\\ \\ln 5\\approx 1{,}61', 'S₄ ≈ 2,08 ≥ ln 5 ≈ 1,61', ''],
    ['R5', 'S_{n}\\ge\\ln(n+1)\\ \\Longrightarrow\\ \\text{diverge}', 'Sₙ ≥ ln(n + 1) ⟹ diverge', 'diff']];
  var TXT = [['Cuatro columnas de ancho 1; el alto de cada una', 'es un término. Cada una parte en su número.'],
    ['La curva pasa por la esquina izquierda de cada', 'techo y después baja: queda bajo las columnas.'],
    ['Área verde: bajo la curva, entre 1 y 5.', 'Queda dentro de las columnas: vale menos.'],
    ['Naranja: lo que las columnas tienen de más.', 'La suma de las cuatro supera al área verde.'],
    ['Con más columnas, el área verde crece sin tope', 'y la suma es mayor aún: la serie diverge.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.0, y1:7.2}, aspect:11.2/6.6,
    aria:'Arriba, una franja dice qué muestra: ahora las columnas quedan sobre la curva; su suma supera al área, que no tiene tope. Animación en cinco pasos con la serie armónica. Uno: sobre un eje horizontal aparecen cuatro columnas azules de ancho 1; la columna del término k va de k a k más 1 y su alto es el término: 1, un medio, un tercio y un cuarto; cada valor queda escrito bajo su columna. Arriba queda la pregunta: ¿converge la serie? Dos: se traza la curva burdeo y igual a uno dividido por x, desde x igual a 1; pasa por la esquina superior izquierda de cada columna y después baja, de modo que queda bajo los techos de las columnas. Tres: se pinta de verde el área bajo la curva entre 1 y 5; vale la integral de 1 a 5, que es logaritmo natural de 5, aproximadamente 1,61; queda dentro de las columnas. Cuatro: se pinta naranja la parte de cada columna que queda sobre la curva: la suma de los cuatro términos, veinticinco doceavos, aproximadamente 2,08, es mayor que el área verde. Cinco: el área verde sigue hacia la derecha; con n columnas, la suma parcial es mayor o igual que el logaritmo natural de n más 1, que supera cualquier número: las sumas parciales no tienen tope y la serie diverge. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(\\tfrac{1}{n}\\), como columnas de ancho 1</span><span><i class="sw tan"></i> la curva \\(y=\\tfrac{1}{x}\\)</span><span><i class="sw alt"></i> el área bajo la curva</span><span><i class="sw rise"></i> lo que las columnas tienen de más</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, b;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      ci15Ejes(S, gx, gy, XM);
      /* columnas: la de a_k va de k a k + 1, con alto 1/k */
      for (i = 1; i <= 4; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*4 - (i - 1))) : 1; if (w <= 0) continue; ci15Caja(S, gx(i), gx(i + 1), gy(0), gy(w*f(i)), C.sec, 0.3, 1); }
      /* paso 4: lo que cada columna tiene sobre la curva, en naranja */
      if (k >= 4){ w = k === 4 ? u : 1; for (i = 1; i <= 4; i++) ci15Area(S, gx, gy, f, function(){ return 1/i; }, i, i + 1, C.rise, 0.55*w); }
      /* paso 3: área bajo la curva entre 1 y 5; paso 5: sigue hacia la derecha */
      if (k >= 3) ci15Area(S, gx, gy, f, cero, 1, k === 3 ? 1 + 4*u : 5, C.alt, 0.34);
      if (k === 5){ ci15Area(S, gx, gy, f, cero, 5, 5 + (XM - 5)*u, C.alt, 0.34); c.font = '700 13px ' + F; c.fillStyle = C.alt; c.textAlign = 'left'; c.textBaseline = 'middle'; c.globalAlpha = u; c.fillText('…', X(gx(XM)) + 2, Y(gy(0.08))); c.globalAlpha = 1; }
      /* paso 2: la curva, desde x = 1; pasa por la esquina superior izquierda de cada columna */
      if (k >= 2){ b = k === 2 ? 1 + (XM - 1)*u : XM; ci15Curva(S, gx, gy, f, 1, b, C.tan); for (i = 1; i <= 4; i++) if (b >= i) ci15Punto(S, gx(i), gy(f(i)), C.tan); }
      /* rótulos: una vez puestos, no se quitan */
      for (i = 1; i <= 4; i++) if (k > 1 || u*4 >= i) L('C' + i, gx(i + 0.5), YB, -50, 0, 31);
      if (k > 2 || (k === 2 && u > 0.97)) L('CV', gx(5.02), gy(0.4), -50);
      if (k > 3 || (k === 3 && u > 0.6)) L('AR', gx(2.12), gy(1.02), 0);
      if (k > 4 || (k === 4 && u > 0.6)) L('S4', gx(2.12), gy(0.8), 0);
      if (k === 5 && u > 0.6) L('G', gx(2.12), gy(0.61), 0);
      L('Q', -1.2, 5.85, 0); if (k === N && u > 0.5) L('F', -1.2, 5.38, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.6); txt(TXT[k - 1][1], -1.2, 0.6 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(5.85));
      dtQue(S, 'las columnas quedan sobre la curva:', 'su suma supera al área, que no tiene tope.');
      T.fin();
      oaReg(S, k, N, -1.2, -0.8, [6, 40, 74, 108, 142]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos: }f(x)=\\dfrac{1}{x},\\qquad a_{n}=f(n)=\\dfrac{1}{n}' + Q + '\\text{Cada columna: ancho }1\\text{, alto }a_{n}\\text{;}' + Q + '\\text{área}=1\\cdot a_{n}=a_{n}' + Q + 'S_{4}=\\displaystyle\\sum_{n=1}^{4}\\dfrac{1}{n}=1+\\dfrac{1}{2}+\\dfrac{1}{3}+\\dfrac{1}{4}' + Q + '\\text{Denominador común }12\\text{:}' + Q + '1=\\tfrac{12}{12},\\quad\\tfrac{1}{2}=\\tfrac{6}{12},\\quad\\tfrac{1}{3}=\\tfrac{4}{12},\\quad\\tfrac{1}{4}=\\tfrac{3}{12}' + Q + '12+6=18,\\quad 18+4=22,\\quad 22+3=25' + Q + 'S_{4}=\\dfrac{25}{12}\\approx 2{,}08',
      '\\text{La columna de }a_{k}\\text{ va de }x=k\\text{ a }x=k+1.' + Q + '\\text{Ahí }x\\ge k>0\\text{; se invierte: }\\dfrac{1}{x}\\le\\dfrac{1}{k}' + Q + '\\text{La curva va bajo el techo de la columna.}' + Q + '\\text{Área de la columna}\\ge\\text{área bajo la curva:}' + Q + 'a_{k}\\ge\\displaystyle\\int_{k}^{k+1}\\dfrac{dx}{x}' + Q + '\\text{Se suma con }k=1,\\ 2,\\ 3,\\ 4\\text{:}' + Q + '1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}\\ge\\displaystyle\\int_{1}^{5}\\dfrac{dx}{x}',
      '\\text{Una primitiva de }\\dfrac{1}{x}\\text{ (con }x>0\\text{) es }\\ln x' + Q + '\\displaystyle\\int_{1}^{5}\\dfrac{dx}{x}=\\ln 5-\\ln 1' + Q + '\\ln 1=0\\text{:}\\quad\\ln 5-0=\\ln 5' + Q + '\\ln 5\\approx 1{,}61',
      '\\text{Por los pasos 2 y 3: }S_{4}\\ge\\ln 5' + Q + '\\text{Con los valores: }2{,}08\\ge 1{,}61\\ \\checkmark' + Q + '\\text{Lo naranja es la diferencia:}' + Q + 'S_{4}-\\ln 5\\approx 2{,}08-1{,}61=0{,}47',
      '\\text{Con }n\\text{ columnas, la última llega a }x=n+1\\text{:}' + Q + 'S_{n}\\ge\\displaystyle\\int_{1}^{n+1}\\dfrac{dx}{x}' + Q + '\\displaystyle\\int_{1}^{n+1}\\dfrac{dx}{x}=\\ln(n+1)-\\ln 1' + Q + '=\\ln(n+1)-0=\\ln(n+1)' + Q + '\\ln(n+1)\\text{ supera cualquier número}' + Q + '\\text{al crecer }n\\text{ (ver el aviso de rigor).}' + Q + 'S_{n}\\text{ es mayor aún: no tiene tope.}' + Q + '\\text{La serie armónica diverge: no tiene suma.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
