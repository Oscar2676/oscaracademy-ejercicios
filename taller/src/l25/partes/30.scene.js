/* L25 H30 · determinar la serie de Taylor de una función: cada derivada en el centro da un coeficiente; 1/x con centro 1 (por pasos) y 1/x con el centro que se elija (número ↔ figura) */
function ty30Cl(t){ return Math.max(0, Math.min(1, t)); }
function ty30Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q simplificada, con q > 0 */
function ty30F(p, q){ if (q < 0){ p = -p; q = -q; } var g = ty30Mcd(p, q); return [p/g, q/g]; }
function ty30Mul(a, b){ return ty30F(a[0]*b[0], a[1]*b[1]); }
function ty30Div(a, b){ return ty30F(a[0]*b[1], a[1]*b[0]); }
function ty30Sum(a, b){ return ty30F(a[0]*b[1] + b[0]*a[1], a[1]*b[1]); }
function ty30Abs(a){ return [Math.abs(a[0]), a[1]]; }
/* fracción en TeX, con el signo delante; t = 1 para tamaño chico */
function ty30Tx(f, t){ var s = f[0] < 0 ? '-' : '', p = Math.abs(f[0]); return f[1] === 1 ? s + p : s + '\\' + (t ? 't' : 'd') + 'frac{' + p + '}{' + f[1] + '}'; }
function ty30Pl(f){ return (f[0] < 0 ? '−' : '') + Math.abs(f[0]) + (f[1] === 1 ? '' : '/' + f[1]); }
/* paréntesis si es negativo */
function ty30Pa(s){ return s.charAt(0) === '-' ? '\\left(' + s + '\\right)' : s; }
/* A + B (o A − B si resta = 1) escrito con denominador común: devuelve la cadena TeX desde el denominador común y el resultado */
function ty30Op(A, B, resta){ var D = A[1]*B[1]/ty30Mcd(A[1], B[1]), na = A[0]*(D/A[1]), nb = B[0]*(D/B[1]), n = resta ? na - nb : na + nb, r = ty30F(n, D), s = '';
  function fr(m){ return D === 1 ? '' + m : (m < 0 ? '-' : '') + '\\tfrac{' + Math.abs(m) + '}{' + D + '}'; }
  if ((A[1] !== D || B[1] !== D) && na !== 0 && nb !== 0) s += '=' + fr(na) + (resta ? '-' : '+') + ty30Pa(fr(nb));
  if (n === 0) s += '=0'; else { s += '=' + fr(n); if (r[1] !== D) s += '=' + ty30Tx(r, 1); }
  return {tex:s, r:r}; }
function ty30Curva(S, gx, gy, f, a, b, col, wd, dash){ var c = S.ctx, i, n = 180, t; if (b <= a) return; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); } c.stroke(); c.setLineDash([]); }
/* polinomio de Taylor de grado N de 1/x con centro a: suma de (1/a)·(−(x − a)/a)^n, n = 0…N */
function ty30T(N, a, x){ var r = -(x - a)/a, s = 0, p = 1, n; for (n = 0; n <= N; n++){ s += p/a; p *= r; } return s; }
OA.scene('tay-idea', (function(){
  var N = 6, XA = -0.15, XB = 2.65, YA = -0.5, YB = 3, Q = '\\\\&\\qquad ';
  function gx(x){ return -0.72 + 2.2*x; } function gy(y){ return 1.875 + 1.75*y; }
  var PZ = [['IV', '0<x<2', '0 < x < 2', ''], ['CF', 'y=\\tfrac{1}{x}', 'y = 1/x', 'c-tan'], ['CN', '\\text{centro }(1,\\ 1)', 'centro (1, 1)', 'c-tan'],
    ['L0', 'T_{0}', 'T₀', ''], ['L1', 'T_{1}', 'T₁', 'c-sec'], ['L2', 'T_{2}', 'T₂', 'c-alt'], ['L3', 'T_{3}', 'T₃', 'diff'], ['L8', 'T_{8}', 'T₈', 'pt'],
    ['Q', '\\text{¿Cuál es la serie de Taylor de }\\tfrac{1}{x}\\text{ centrada en }1\\text{?}', '¿Cuál es la serie de Taylor de 1/x centrada en 1?', 'pt'],
    ['F', '\\Longrightarrow\\ \\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}(x-1)^{n}\\text{; suma }\\tfrac{1}{x}\\text{ si }0<x<2', '⟹ Σ (−1)ⁿ (x − 1)ⁿ; suma 1/x si 0 < x < 2', 'diff'],
    ['R1', 'f(1)=1\\ \\Longrightarrow\\ c_{0}=\\tfrac{1}{0!}=1', 'f(1) = 1 ⟹ c₀ = 1/0! = 1', ''],
    ['R2', 'f\'(1)=-1\\ \\Longrightarrow\\ c_{1}=\\tfrac{-1}{1!}=-1', 'f′(1) = −1 ⟹ c₁ = −1/1! = −1', ''],
    ['R3', 'f\'\'(1)=2\\ \\Longrightarrow\\ c_{2}=\\tfrac{2}{2!}=1', 'f″(1) = 2 ⟹ c₂ = 2/2! = 1', ''],
    ['R4', 'f\'\'\'(1)=-6\\ \\Longrightarrow\\ c_{3}=\\tfrac{-6}{3!}=-1', 'f‴(1) = −6 ⟹ c₃ = −6/3! = −1', ''],
    ['R5', 'f^{(n)}(1)=(-1)^{n}\\,n!\\ \\Longrightarrow\\ c_{n}=(-1)^{n}', 'f⁽ⁿ⁾(1) = (−1)ⁿ n! ⟹ cₙ = (−1)ⁿ', ''],
    ['R6', '\\tfrac{1}{x}=\\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}(x-1)^{n}\\quad(0<x<2)', '1/x = Σ (−1)ⁿ (x − 1)ⁿ (0 < x < 2)', 'diff']];
  var TXT = [['Curva burdeo: la función. Punto: el centro.', 'La recta gris copia ahí solo la altura, 1.'],
    ['La derivada en el centro da la pendiente, −1:', 'la recta azul es la tangente en el centro.'],
    ['La segunda derivada en el centro vale 2: la', 'curva verde copia también cómo se dobla.'],
    ['La tercera derivada en el centro vale −6: la', 'naranja sigue a la curva un tramo más largo.'],
    ['Las derivadas siguen un patrón: sale la serie', 'completa. La negra fina llega hasta n = 8.'],
    ['La serie converge solo en la franja gris. Ahí,', 'más términos se pegan a la curva; fuera, no.']];
  function f0(x){ return 1/x; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:9.6}, aspect:14.5/6.6,
    aria:'Arriba, una franja dice qué muestra: cada derivada en el centro da un coeficiente de la serie de Taylor. Animación en seis pasos sobre una gráfica con x en horizontal, de menos 0,15 a 2,65, y los valores en vertical, de menos 0,5 a 3. Uno: se traza en burdeo la curva de 1 dividido por x, que baja de izquierda a derecha; se marca el centro, el punto de coordenadas 1 y 1, y una recta gris horizontal de altura 1, que copia solo el valor de la función en el centro. Dos: la recta azul, 1 menos x menos 1, es la tangente en el centro; su pendiente, menos 1, es la primera derivada en el centro. Tres: la curva verde agrega x menos 1 al cuadrado; el coeficiente 1 sale de la segunda derivada en el centro, 2, dividida por 2 factorial. Cuatro: la curva naranja agrega menos x menos 1 al cubo; el coeficiente menos 1 sale de la tercera derivada en el centro, menos 6, dividida por 3 factorial. Cinco: las derivadas en el centro siguen el patrón menos 1 elevado a n por n factorial, y cada coeficiente es menos 1 elevado a n; una línea negra fina dibuja el polinomio que llega hasta n igual a 8. Seis: se sombrea en gris la franja entre x igual a 0 y x igual a 2, con los extremos marcados con anillos abiertos; dentro de ella la línea negra va pegada a la curva burdeo y, a la derecha de x igual a 2, se separa bruscamente hacia arriba. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, la serie de menos 1 elevado a n por x menos 1 elevado a n, que suma 1 dividido por x solo si x está entre 0 y 2, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\tfrac{1}{x}\\), y el centro \\((1,\\ 1)\\)</span><span>recta gris: \\(T_{0}=1\\)</span><span><i class="sw sec"></i> \\(T_{1}=1-(x-1)\\)</span><span><i class="sw alt"></i> \\(T_{2}=T_{1}+(x-1)^{2}\\)</span><span><i class="sw rise"></i> \\(T_{3}=T_{2}-(x-1)^{3}\\)</span><span>línea negra fina: \\(T_{8}\\), hasta \\(n=8\\)</span><span>franja gris: el intervalo \\(0&lt;x&lt;2\\), sin los extremos</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), G = C.muted || '#6b6b6b', w, bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA));
      function txt(t, x, y, al, cc, an){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = an || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || G; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function caja(){ c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip(); }
      function anillo(x, y, col, lleno){ c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 4, 0, 6.2832); c.fillStyle = lleno ? col : '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); }
      function pol(n, col, wd, w){ caja(); ty30Curva(S, gx, gy, function(t){ return ty30T(n, 1, t); }, XA, XA + (XB - XA)*w, col, wd); c.restore(); }
      /* paso 6: la franja donde la serie converge, debajo de todo */
      if (k >= 6){ w = u; c.globalAlpha = 0.08*w; c.fillStyle = C.ink; c.fillRect(X(gx(0)), by0, (X(gx(2)) - X(gx(0)))*w, by1 - by0); c.globalAlpha = 0.55*w; c.strokeStyle = G; c.lineWidth = 1; c.setLineDash([4, 3]);
        if (w >= 0.98){ c.beginPath(); c.moveTo(X(gx(2)), by0); c.lineTo(X(gx(2)), by1); c.stroke(); } c.setLineDash([]); c.globalAlpha = 1;
        if (w > 0.6) L('IV', gx(1.05), gy(2.82), -50); }
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[0.5, '0,5'], [1, '1'], [1.5, '1,5'], [2, '2'], [2.5, '2,5']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[1, '1'], [2, '2']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* paso 5: el polinomio que llega hasta n = 8, fino */
      if (k >= 5){ w = k === 5 ? u : 1; pol(8, C.ink, 1.1, w); if (w > 0.92) L('L8', gx(2.36), gy(2.82), -50); }
      /* pasos 2, 3 y 4: tangente, grado 2 y grado 3 */
      if (k >= 4){ w = k === 4 ? u : 1; pol(3, C.rise, 1.5, w); if (w > 0.85) L('L3', gx(1.8), gy(-0.33), -50); }
      if (k >= 3){ w = k === 3 ? u : 1; pol(2, C.alt, 1.5, w); if (w > 0.97) L('L2', gx(2.52), gy(1.52), -50); }
      if (k >= 2){ w = k === 2 ? u : 1; pol(1, C.sec, 1.5, w); if (w > 0.2) L('L1', gx(0.1), gy(1.64), -50); }
      /* paso 1: la curva de la función, el centro y la recta de altura 1 */
      w = k === 1 ? ty30Cl(u/0.55) : 1; caja(); ty30Curva(S, gx, gy, f0, 0.3, 0.3 + (XB - 0.3)*w, C.tan, 2.2); c.restore(); if (w > 0.97) L('CF', gx(2.42), gy(0.63), -50);
      w = k === 1 ? ty30Cl((u - 0.5)/0.5) : 1;
      if (w > 0){ c.globalAlpha = w; ty30Curva(S, gx, gy, function(){ return 1; }, XA, XA + (XB - XA)*w, G, 1.3, [5, 3]); c.globalAlpha = w;
        c.strokeStyle = C.tan; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(1)), Y(gy(0))); c.lineTo(X(gx(1)), Y(gy(1))); c.stroke(); c.setLineDash([]);
        anillo(1, 1, C.tan, 1); c.globalAlpha = 1; if (w > 0.6){ L('CN', gx(1.1), gy(1.27), 0); L('L0', gx(2.56), gy(1.13), -50); } }
      /* paso 6: extremos abiertos y lo que pasa dentro y fuera */
      if (k >= 6){ anillo(0, 0, G, 0); if (u > 0.98) anillo(2, 0, G, 0);
        if (u > 0.9){ txt('dentro: se pega', gx(0.08), gy(0.3), 1, C.ink, 'left'); txt('Fuera de la franja, la línea negra se despega.', -1.2, 0.62); } }
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.05); txt(TXT[k - 1][1], -1.2, 0.05 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = G; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'cada derivada en el centro da un', 'coeficiente de la serie de Taylor.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Función: }f(x)=\\dfrac{1}{x}\\ \\ (x\\neq 0).\\quad\\text{Centro: }a=1.' + Q + '\\text{Coeficiente de lugar }n\\text{: }c_{n}=\\dfrac{f^{(n)}(a)}{n!}' + Q + 'n=0\\text{: }f(1)=\\dfrac{1}{1}=1,\\qquad 0!=1' + Q + 'c_{0}=\\dfrac{f(1)}{0!}=\\dfrac{1}{1}=1' + Q + 'T_{0}(x)=c_{0}=1\\quad\\text{(recta gris, horizontal)}',
      '\\text{Se escribe }f(x)=x^{-1}\\text{. Regla de la potencia:}' + Q + 'f\'(x)=(-1)\\cdot x^{-2}=-\\dfrac{1}{x^{2}}' + Q + 'f\'(1)=-\\dfrac{1}{1^{2}}=-\\dfrac{1}{1}=-1,\\qquad 1!=1' + Q + 'c_{1}=\\dfrac{f\'(1)}{1!}=\\dfrac{-1}{1}=-1' + Q + 'T_{1}(x)=T_{0}(x)+c_{1}(x-1)=1-(x-1)',
      '\\text{Se deriva }f\'(x)=-x^{-2}\\text{:}' + Q + 'f\'\'(x)=-(-2)\\cdot x^{-3}=\\dfrac{2}{x^{3}}' + Q + 'f\'\'(1)=\\dfrac{2}{1^{3}}=\\dfrac{2}{1}=2,\\qquad 2!=2\\cdot 1=2' + Q + 'c_{2}=\\dfrac{f\'\'(1)}{2!}=\\dfrac{2}{2}=1' + Q + 'T_{2}(x)=T_{1}(x)+c_{2}(x-1)^{2}' + Q + '\\phantom{T_{2}(x)}=1-(x-1)+(x-1)^{2}',
      '\\text{Se deriva }f\'\'(x)=2x^{-3}\\text{:}' + Q + 'f\'\'\'(x)=2\\cdot(-3)\\cdot x^{-4}=-\\dfrac{6}{x^{4}}' + Q + 'f\'\'\'(1)=-\\dfrac{6}{1^{4}}=-\\dfrac{6}{1}=-6' + Q + '3!=3\\cdot 2\\cdot 1=6' + Q + 'c_{3}=\\dfrac{f\'\'\'(1)}{3!}=\\dfrac{-6}{6}=-1' + Q + 'T_{3}(x)=T_{2}(x)+c_{3}(x-1)^{3}' + Q + '=1-(x-1)+(x-1)^{2}-(x-1)^{3}',
      '\\text{Valores en el centro: }1,\\ \\ -1,\\ \\ 2,\\ \\ -6.' + Q + '\\text{Sin el signo: }1=0!,\\ \\ 1=1!,\\ \\ 2=2!,\\ \\ 6=3!' + Q + '\\text{Signos: }+,\\ -,\\ +,\\ -\\text{; es decir, }(-1)^{n}.' + Q + '\\text{Patrón (se demuestra en el ejemplo 1):}' + Q + 'f^{(n)}(1)=(-1)^{n}\\,n!' + Q + 'c_{n}=\\dfrac{f^{(n)}(1)}{n!}=\\dfrac{(-1)^{n}\\,n!}{n!}=(-1)^{n}' + Q + '\\text{Serie de Taylor: }\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}(x-1)^{n}' + Q + '=1-(x-1)+(x-1)^{2}-(x-1)^{3}+\\cdots' + Q + '\\text{La línea negra fina es }T_{8}\\text{: llega a }n=8.',
      '\\text{¿Dónde converge? Criterio del cociente,}' + Q + '\\text{con }x\\neq 1\\text{. Tamaño del término: }|x-1|^{n}.' + Q + '\\dfrac{|x-1|^{n+1}}{|x-1|^{n}}=|x-1|\\text{, así que }L=|x-1|.' + Q + 'L<1\\text{: }|x-1|<1\\text{, o sea }0<x<2\\text{: converge.}' + Q + 'L>1\\text{: }|x-1|>1\\text{: diverge.}' + Q + 'x=0\\text{ y }x=2\\text{: cada término tiene tamaño }1\\text{,}' + Q + '\\text{que no tiende a }0\\text{: diverge.}' + Q + '\\text{¿Suma }\\tfrac{1}{x}\\text{? Es una serie geométrica de}' + Q + '\\text{primer término }1\\text{ y razón }r=-(x-1)\\text{:}' + Q + '\\dfrac{1}{1-r}=\\dfrac{1}{1+(x-1)}=\\dfrac{1}{x}\\quad\\text{si }|r|<1.' + Q + '\\text{Prueba con }x=\\dfrac{3}{2}\\text{: }\\ x-1=\\dfrac{1}{2}' + Q + 'T_{0}=1,\\qquad T_{1}=1-\\dfrac{1}{2}=\\dfrac{1}{2}' + Q + 'T_{2}=\\dfrac{1}{2}+\\dfrac{1}{4}=\\dfrac{3}{4},\\qquad T_{3}=\\dfrac{3}{4}-\\dfrac{1}{8}=\\dfrac{5}{8}' + Q + '\\text{Función: }1:\\dfrac{3}{2}=\\dfrac{2}{3}' + Q + '\\text{Distancias: }\\left|\\dfrac{2}{3}-1\\right|=\\dfrac{1}{3},\\quad\\left|\\dfrac{2}{3}-\\dfrac{1}{2}\\right|=\\dfrac{1}{6}' + Q + '\\left|\\dfrac{2}{3}-\\dfrac{3}{4}\\right|=\\dfrac{1}{12},\\quad\\left|\\dfrac{2}{3}-\\dfrac{5}{8}\\right|=\\dfrac{1}{24}' + Q + '\\text{Cada distancia es la mitad de la anterior.}' + Q + '\\dfrac{1}{x}=\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}(x-1)^{n}\\quad\\text{si }0<x<2'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: se elige el centro a; cambian los coeficientes, el polinomio y el intervalo; se prueba siempre en x = 2. Casos límite: a = 2 (el punto de prueba es el centro: distancia 0), a = 1 (x = 2 es extremo) y a = 1/2 (x = 2 queda fuera) */
OA.scene('tay-vivo', (function(){
  var Q = '\\\\&\\qquad ', AS = [[1, 2], [1, 1], [3, 2], [2, 1], [5, 2], [3, 1]], NP = AS.length, XA = -0.2, XB = 6.3, YA = -0.5, YB = 2.6, FAC = [1, 1, 2, 6], NUM = [1, -1, 2, -6], PR = ['', '\'', '\'\'', '\'\'\''];
  function gx(x){ return -0.84 + 0.93*x; } function gy(y){ return 2.45 + 1.55*y; }
  function cual(v){ return Math.max(1, Math.min(NP, Math.round(v.pos || 1))) - 1; }
  var NOTA = {d:'dentro de la franja: más términos, más cerca', c:'caso límite: x = 2 es el centro; coinciden', e:'extremo de la franja: ahí la serie no converge', f:'fuera de la franja: más términos, más lejos'};
  var DAT = AS.map(function(f){ var a = ty30F(f[0], f[1]), o = {a:a, av:f[0]/f[1], pa:[[1, 1], a], fd:[], c:[], dp:[[1, 1]], tm:[], T:[], ds:[]}, n, half = [1, 2];
    for (n = 2; n <= 4; n++) o.pa[n] = ty30Mul(o.pa[n - 1], a); /* potencias del centro */
    for (n = 0; n <= 3; n++){ o.fd[n] = ty30Div([NUM[n], 1], o.pa[n + 1]); o.c[n] = ty30Div(o.fd[n], [FAC[n], 1]); } /* derivadas en el centro y coeficientes */
    o.d = ty30Sum([2, 1], [-a[0], a[1]]); for (n = 1; n <= 3; n++) o.dp[n] = ty30Mul(o.dp[n - 1], o.d); /* x − a con x = 2, y sus potencias */
    for (n = 0; n <= 3; n++){ o.tm[n] = ty30Mul(o.c[n], o.dp[n]); o.T[n] = n ? ty30Sum(o.T[n - 1], o.tm[n]) : o.tm[0]; o.ds[n] = ty30Abs(ty30Sum(half, [-o.T[n][0], o.T[n][1]])); }
    o.b = ty30Mul([2, 1], a); o.r = ty30Div([-o.d[0], o.d[1]], a); /* extremo derecho 2a y razón */
    o.tipo = o.d[0] === 0 ? 'c' : Math.abs(o.d[0])*a[1] < a[0]*o.d[1] ? 'd' : Math.abs(o.d[0])*a[1] === a[0]*o.d[1] ? 'e' : 'f';
    return o; });
  var PZ = [['CF', 'y=\\tfrac{1}{x}', 'y = 1/x', 'c-tan'], ['C3', 'T_{3}', 'T₃', 'c-sec']];
  DAT.forEach(function(o, j){ var at = ty30Tx(o.a, 1), ap = ty30Pl(o.a), iv = '(0,\\ ' + ty30Tx(o.b, 1) + ')', ip = '(0, ' + ty30Pl(o.b) + ')', ds = o.ds.map(function(d){ return ty30Tx(d, 1); }).join(',\\ '), dp = o.ds.map(ty30Pl).join(', ');
    PZ.push(['A' + j, 'a=' + at + (o.tipo === 'c' ? '\\text{: }x=2\\text{ es el centro de }' : o.tipo === 'd' ? '\\text{: }x=2\\text{ está dentro de }' : o.tipo === 'e' ? '\\text{: }x=2\\text{ es extremo de }' : '\\text{: }x=2\\text{ está fuera de }') + iv, 'a = ' + ap + (o.tipo === 'c' ? ': x = 2 es el centro de ' : o.tipo === 'd' ? ': x = 2 está dentro de ' : o.tipo === 'e' ? ': x = 2 es extremo de ' : ': x = 2 está fuera de ') + ip, 'pt']);
    PZ.push(['B' + j, '\\text{función: }f(2)=\\tfrac{1}{2}', 'función: f(2) = 1/2', 'c-tan']);
    PZ.push(['D' + j, '\\text{polinomio de grado 3: }T_{3}(2)=' + ty30Tx(o.T[3], 1), 'polinomio de grado 3: T₃(2) = ' + ty30Pl(o.T[3]), 'c-sec']);
    PZ.push(['E' + j, '\\text{distancia }\\left|f(2)-T_{3}(2)\\right|=' + ty30Tx(o.ds[3], 1), 'distancia |f(2) − T₃(2)| = ' + ty30Pl(o.ds[3]), 'diff']);
    PZ.push(['G' + j, '\\text{distancias, de }T_{0}\\text{ a }T_{3}\\text{: }' + ds, 'distancias, de T₀ a T₃: ' + dp, 'pt']);
    PZ.push(['I' + j, '\\text{converge: }0<x<' + ty30Tx(o.b, 1), 'converge: 0 < x < ' + ty30Pl(o.b), '']);
    PZ.push(['N' + j, '\\text{centro }\\left(' + at + ',\\ ' + ty30Tx(o.fd[0], 1) + '\\right)', 'centro (' + ap + ', ' + ty30Pl(o.fd[0]) + ')', 'c-tan']); });
  function lectura(j){ var o = DAT[j], at = ty30Tx(o.a), R = [], n, l, op;
    R.push('\\text{Datos: }f(x)=\\dfrac{1}{x},\\quad\\text{centro }a=' + at + ',\\quad x=2' + Q + '\\text{Derivadas (ejemplo 1):}' + Q + 'f\'(x)=-\\dfrac{1}{x^{2}},\\quad f\'\'(x)=\\dfrac{2}{x^{3}},\\quad f\'\'\'(x)=-\\dfrac{6}{x^{4}}');
    l = '\\text{Potencias del centro:}';
    for (n = 2; n <= 4; n++) l += Q + 'a^{' + n + '}=' + (n === 2 ? 'a' : 'a^{' + (n - 1) + '}') + '\\cdot a=' + ty30Tx(o.pa[n - 1]) + '\\cdot ' + at + '=' + ty30Tx(o.pa[n]);
    R.push(l);
    l = '\\text{Derivadas en el centro (dividir por una}' + Q + '\\text{fracción es multiplicar por su inversa):}';
    for (n = 0; n <= 3; n++){ l += Q + 'f' + PR[n] + '(a)=' + (n === 0 ? '\\dfrac{1}{a}' : (NUM[n] < 0 ? '-' : '') + '\\dfrac{' + Math.abs(NUM[n]) + '}{a^{' + (n + 1) + '}}') + '=' + NUM[n] + ':' + ty30Tx(o.pa[n + 1]) + '=' + ty30Tx(o.fd[n]); }
    R.push(l);
    l = '\\text{Coeficientes, }c_{n}=\\dfrac{f^{(n)}(a)}{n!}\\text{, con}' + Q + '0!=1,\\quad 1!=1,\\quad 2!=2,\\quad 3!=6\\text{:}';
    for (n = 0; n <= 3; n++) l += Q + 'c_{' + n + '}=' + ty30Pa(ty30Tx(o.fd[n])) + ':' + FAC[n] + '=' + ty30Tx(o.c[n]);
    R.push(l);
    R.push('\\text{Polinomio de Taylor de grado 3:}' + Q + 'T_{3}(x)=c_{0}+c_{1}(x-a)+c_{2}(x-a)^{2}+c_{3}(x-a)^{3}' + Q + '\\text{Intervalo (recuadro): la serie completa}' + Q + '\\text{suma }\\tfrac{1}{x}\\text{ si }|x-a|<a\\text{, o sea }0<x<2a.' + Q + '2a=2\\cdot ' + at + '=' + ty30Tx(o.b) + '\\text{: intervalo }\\left(0,\\ ' + ty30Tx(o.b) + '\\right)');
    l = '\\text{En }x=2\\text{:}' + Q + 'x-a=2-' + at + '=' + ty30Tx(o.d);
    for (n = 2; n <= 3; n++) l += Q + '(x-a)^{' + n + '}=' + ty30Pa(ty30Tx(o.dp[n - 1])) + '\\cdot ' + ty30Pa(ty30Tx(o.d)) + '=' + ty30Tx(o.dp[n]);
    R.push(l);
    l = '\\text{Cada término en }x=2\\text{:}' + Q + 'c_{0}=' + ty30Tx(o.tm[0]);
    for (n = 1; n <= 3; n++) l += Q + 'c_{' + n + '}(x-a)' + (n > 1 ? '^{' + n + '}' : '') + '=' + ty30Pa(ty30Tx(o.c[n])) + '\\cdot ' + ty30Pa(ty30Tx(o.dp[n])) + '=' + ty30Tx(o.tm[n]);
    R.push(l);
    l = '\\text{Se suma de a un término:}' + Q + 'T_{0}(2)=' + ty30Tx(o.T[0]);
    for (n = 1; n <= 3; n++){ op = ty30Op(o.T[n - 1], o.tm[n], 0); l += Q + 'T_{' + n + '}(2)=' + ty30Tx(o.T[n - 1], 1) + '+' + ty30Pa(ty30Tx(o.tm[n], 1)) + op.tex; }
    R.push(l);
    l = '\\text{Función: }f(2)=\\dfrac{1}{2}\\text{. Distancias:}';
    for (n = 0; n <= 3; n++){ op = ty30Op([1, 2], o.T[n], 1); l += Q + '\\left|\\tfrac{1}{2}-' + ty30Pa(ty30Tx(o.T[n], 1)) + '\\right|=\\left|' + op.tex.slice(1).split('=').join('\\right|=\\left|') + '\\right|=' + ty30Tx(o.ds[n], 1); }
    R.push(l);
    if (o.tipo === 'd') R.push('|x-a|=' + ty30Tx(ty30Abs(o.d)) + '<' + at + '=a\\text{: }x=2\\text{ está en }\\left(0,\\ ' + ty30Tx(o.b) + '\\right).' + Q + '\\text{Razón: }r=-\\dfrac{x-a}{a}=' + ty30Tx(o.r) + '\\text{. Cada distancia}' + Q + '\\text{es la anterior por }|r|=' + ty30Tx(ty30Abs(o.r)) + '\\text{: se achican}' + Q + '\\text{sin parar. En }x=2\\text{ la serie de Taylor con}' + Q + '\\text{este centro suma }f(2)=\\tfrac{1}{2}.');
    else if (o.tipo === 'c') R.push('x=2\\text{ es el centro: }x-a=0.' + Q + '\\text{Todos los términos con }(x-a)\\text{ valen }0\\text{ y}' + Q + 'T_{N}(2)=c_{0}=f(2)\\text{ con cualquier }N\\text{:}' + Q + '\\text{la distancia es }0\\text{. Caso límite: en su}' + Q + '\\text{centro, toda serie de Taylor suma }f(a).');
    else if (o.tipo === 'e') R.push('|x-a|=1=a\\text{: }x=2\\text{ es un extremo de }(0,\\ 2)\\text{;}' + Q + '\\text{no está dentro. Las sumas van }1,\\ 0,\\ 1,\\ 0\\text{:}' + Q + '\\text{no se acercan a ningún número, y la}' + Q + '\\text{distancia es siempre }\\tfrac{1}{2}\\text{. En }x=2\\text{ la serie}' + Q + '\\text{con centro }1\\text{ diverge, aunque }f(2)\\text{ existe.}');
    else R.push('|x-a|=' + ty30Tx(ty30Abs(o.d)) + '>' + at + '=a\\text{: }x=2\\text{ está fuera de }\\left(0,\\ ' + ty30Tx(o.b) + '\\right).' + Q + '\\text{Razón: }r=-\\dfrac{x-a}{a}=' + ty30Tx(o.r) + '\\text{. Cada distancia}' + Q + '\\text{es la anterior por }|r|=' + ty30Tx(ty30Abs(o.r)) + '\\text{: crecen sin}' + Q + '\\text{parar. La serie con este centro diverge en}' + Q + 'x=2\\text{: no representa ahí a la función. Con}' + Q + '\\text{otro centro (por ejemplo }a=\\tfrac{3}{2}\\text{), sí.}');
    return R; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.4, y1:9.35}, aspect:9.75/6.6, _dat:DAT,
    aria:'Arriba, una franja dice qué muestra: al cambiar el centro cambian la serie y el intervalo donde suma 1 dividido por x. Una gráfica con x en horizontal, de menos 0,2 a 6,3, y los valores en vertical, de menos 0,5 a 2,6. En burdeo, la curva de 1 dividido por x. Un deslizador elige el centro a entre seis valores: un medio, 1, tres medios, 2, cinco medios y 3. El centro se marca con un punto burdeo sobre la curva. En azul, el polinomio de Taylor de grado 3 con ese centro. Una franja gris marca el intervalo de 0 a 2 a, sin los extremos, donde la serie completa converge. Una línea vertical punteada marca el punto de prueba, x igual a 2, con un punto sobre la curva y otro sobre el polinomio, unidos por un trazo naranja. Con a igual a tres medios, cinco medios o 3, x igual a 2 queda dentro de la franja y las distancias entre la función y los polinomios de grado 0 a 3 se achican: con a igual a tres medios son un sexto, un dieciochoavo, 1 sobre 54 y 1 sobre 162. Con a igual a 2, el punto de prueba es el centro y la distancia es 0. Con a igual a 1, x igual a 2 es un extremo: las sumas van 1, 0, 1, 0 y la distancia es siempre un medio. Con a igual a un medio, x igual a 2 queda fuera de la franja: el polinomio vale menos 40, se sale del dibujo, y las distancias crecen: tres medios, nueve medios, 27 medios y 81 medios. Bajo el dibujo se leen las distancias y, más abajo, la cuenta completa.',
    labels:PZ,
    sliders:[{id:'pos', tex:'\\text{centro}', min:1, max:NP, step:1, value:3}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\tfrac{1}{x}\\), y el centro elegido</span><span><i class="sw sec"></i> \\(T_{3}\\), polinomio de Taylor de grado 3 con ese centro</span><span><i class="sw rise"></i> distancia entre la función y \\(T_{3}\\) en \\(x=2\\)</span><span>franja gris: el intervalo \\(0&lt;x&lt;2a\\), sin los extremos</span><span>posiciones del deslizador: \\(a=\\tfrac{1}{2},\\ 1,\\ \\tfrac{3}{2},\\ 2,\\ \\tfrac{5}{2},\\ 3\\)</span>',
    anim:{run:30000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.pos = Math.min(NP, 1 + Math.floor(p*NP)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = cual(v), o = DAT[j], a = o.av, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), G = C.muted || '#6b6b6b', bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), px = X(gx(2)), yf = Y(gy(0.5)), t3 = o.T[3][0]/o.T[3][1], y3 = Y(gy(t3)), fuera = t3 < YA || t3 > YB, xl, yl;
      function txt(t, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || G; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function punto(qx, py, col, r){ c.beginPath(); c.arc(qx, py, r || 3.4, 0, 6.2832); c.fillStyle = col; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1; c.setLineDash([]); c.stroke(); }
      function anillo(x){ c.beginPath(); c.arc(X(gx(x)), Y(gy(0)), 4, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = G; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); }
      /* la franja del intervalo (0, 2a) */
      c.globalAlpha = 0.08; c.fillStyle = C.ink; c.fillRect(X(gx(0)), by0, X(gx(2*a)) - X(gx(0)), by1 - by0); c.globalAlpha = 0.55; c.strokeStyle = G; c.lineWidth = 1; c.setLineDash([4, 3]);
      c.beginPath(); c.moveTo(X(gx(2*a)), by0); c.lineTo(X(gx(2*a)), by1); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [1, 2, 3, 4, 5, 6].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m)), Y(gy(0)) - 3); c.lineTo(X(gx(m)), Y(gy(0)) + 3); c.stroke(); if (m !== 2){ c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(X(gx(m)) - 5, Y(gy(0)) + 5, 10, 12); num('' + m, X(gx(m)), Y(gy(0)) + 11, 'center'); } });
      [1, 2].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m))); c.lineTo(X(gx(0)) + 3, Y(gy(m))); c.stroke(); num('' + m, X(gx(0)) - 7, Y(gy(m)), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* curvas, recortadas al cuadro */
      c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip();
      ty30Curva(S, gx, gy, function(t){ return ty30T(3, a, t); }, XA, XB, C.sec, 1.6);
      ty30Curva(S, gx, gy, function(t){ return 1/t; }, 0.3, XB, C.tan, 2.2); c.restore();
      T.L('CF', gx(5.75), gy(0.47), -50);
      xl = a <= 1 ? 1.6*a : 0.4*a; yl = ty30T(3, a, xl); T.L('C3', gx(xl), gy(yl), -100, -7, 11);
      anillo(0); anillo(2*a);
      T.L('I' + j, Math.max(gx(a), -0.2), gy(-0.37), -50);
      /* el punto de prueba x = 2: línea vertical, distancia y puntos */
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, by0); c.lineTo(px, by1); c.stroke(); c.setLineDash([]);
      c.strokeStyle = C.rise; c.lineWidth = 3; c.beginPath(); c.moveTo(px, yf);
      if (fuera){ c.lineTo(px, by1 - 7); c.stroke(); c.fillStyle = C.rise; c.beginPath(); c.moveTo(px, by1); c.lineTo(px - 5, by1 - 9); c.lineTo(px + 5, by1 - 9); c.closePath(); c.fill();
        c.font = '600 11.5px ' + F; c.fillStyle = C.rise; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('el polinomio se sale', px + 9, Y(gy(1.42))); c.fillText('del dibujo, hacia abajo', px + 9, Y(gy(1.22))); }
      else { c.lineTo(px, y3); c.stroke(); punto(px, y3, C.sec); }
      punto(px, yf, C.tan);
      c.font = '700 11px ' + F; c.fillStyle = '#fff'; c.fillRect(px - 16, Y(gy(0)) + 5, 32, 13); c.fillStyle = C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('x = 2', px, Y(gy(0)) + 11.5);
      /* el centro */
      c.strokeStyle = C.tan; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(a)), Y(gy(0))); c.lineTo(X(gx(a)), Y(gy(1/a))); c.stroke(); c.setLineDash([]);
      c.beginPath(); c.arc(X(gx(a)), Y(gy(1/a)), 5.2, 0, 6.2832); c.strokeStyle = C.tan; c.lineWidth = 1.8; c.stroke(); punto(X(gx(a)), Y(gy(1/a)), C.tan, 2.6);
      T.L('N' + j, gx(a), gy(1/a), 0, 9, -13);
      T.L('A' + j, -1.2, 8.0, 0); T.L('B' + j, -1.2, 7.5, 0); T.L('D' + j, -1.2, 7.0, 0);
      T.L('E' + j, -1.2, 1.12, 0); T.L('G' + j, -1.2, 0.6, 0); txt(NOTA[o.tipo], 0.1, C.ink);
      dtQue(S, 'al cambiar el centro cambian la serie', 'y el intervalo donde suma 1/x.');
      T.fin();
    },
    caption:function(v){ var o = DAT[cual(v)]; return 'Centro a = ' + ty30Pl(o.a) + '. Intervalo: de 0 a ' + ty30Pl(o.b) + '. En x = 2 la función vale 1/2 y el polinomio de grado 3 vale ' + ty30Pl(o.T[3]) + '; distancia ' + ty30Pl(o.ds[3]) + '. Distancias con los grados 0 a 3: ' + o.ds.map(ty30Pl).join(', ') + '. ' + NOTA[o.tipo].charAt(0).toUpperCase() + NOTA[o.tipo].slice(1) + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
