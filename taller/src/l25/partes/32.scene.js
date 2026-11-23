/* L25 H32 · series de Maclaurin de eˣ, sen x y cos x: la del seno, armada con sus derivadas en 0 (ciclo de 4), y sus sumas parciales pegándose a la curva en una zona cada vez más ancha; la del coseno, probada cerca y lejos del centro */
function mc32Cl(t){ return Math.max(0, Math.min(1, t)); }
function mc32Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q (q > 0) simplificada */
function mc32F(p, q){ var g = mc32Mcd(p, q); return [p/g, q/g]; }
/* fracción en TeX, con el signo delante; t = 1 para tamaño chico */
function mc32Tx(f, t){ var s = f[0] < 0 ? '-' : '', p = Math.abs(f[0]); return f[1] === 1 ? s + p : s + '\\' + (t ? 't' : 'd') + 'frac{' + p + '}{' + f[1] + '}'; }
function mc32Pl(f){ return (f[0] < 0 ? '−' : '') + Math.abs(f[0]) + (f[1] === 1 ? '' : '/' + f[1]); }
/* paréntesis si es negativo */
function mc32Pa(s){ return s.charAt(0) === '-' ? '\\left(' + s + '\\right)' : s; }
/* p/q redondeado a d decimales (4 si no se dice), como entero de esa unidad (mitad hacia arriba en el tamaño) */
function mc32R(p, q, d){ var m = Math.pow(10, d || 4), n = Math.floor((2*m*Math.abs(p) + q)/(2*q)); return p < 0 ? -n : n; }
/* entero de diezmilésimos (o de 10^-d) escrito con coma */
function mc32D(n, tex, d){ d = d || 4; var m = Math.pow(10, d), a = Math.abs(n), s = ('0000000' + (a % m)).slice(-d); return (n < 0 ? (tex ? '-' : '−') : '') + Math.floor(a/m) + (tex ? '{,}' : ',') + s; }
/* «=» si p/q tiene a lo más 4 decimales; «≈» si hubo que redondear */
function mc32Ig(f){ return (10000*Math.abs(f[0])) % f[1] === 0 ? '=' : '\\approx '; }
/* sumas parciales: N términos de x − x³/3! + x⁵/5! − … y de 1 − x²/2! + x⁴/4! − … (cada término sale del anterior) */
function mc32Sen(N, x){ var s = 0, t = x, n; for (n = 0; n < N; n++){ s += t; t = -t*x*x/((2*n + 2)*(2*n + 3)); } return s; }
function mc32Cos(N, x){ var s = 0, t = 1, n; for (n = 0; n < N; n++){ s += t; t = -t*x*x/((2*n + 1)*(2*n + 2)); } return s; }
function mc32Curva(S, gx, gy, f, a, b, col, wd, dash){ var c = S.ctx, i, n = 200, t; if (b <= a) return; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); } c.stroke(); c.setLineDash([]); }
OA.scene('esc3-idea', (function(){
  var N = 6, XA = -6.5, XB = 6.5, YA = -2.2, YB = 2.2, Q = '\\\\&\\qquad ';
  function gx(x){ return 2 + 0.47*x; } function gy(y){ return 5.2 + 1.05*y; }
  var PZ = [['CF', 'y=\\operatorname{sen}x', 'y = sen x', 'c-tan'],
    ['L1', 'P_{1}', 'P₁', 'c-sec'], ['L3', 'P_{3}', 'P₃', 'c-alt'], ['L5', 'P_{5}', 'P₅', 'diff'], ['L17', 'P_{17}', 'P₁₇', 'pt'],
    ['IV', '\\text{vale para todo }x\\text{ real}', 'vale para todo x real', 'pt'],
    ['Q', '\\text{¿Qué serie de potencias suma }\\operatorname{sen}x\\text{?}', '¿Qué serie de potencias suma sen x?', 'pt'],
    ['F', '\\Longrightarrow\\ \\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}\\tfrac{x^{2n+1}}{(2n+1)!}\\text{, para todo }x\\text{ real}', '⟹ Σ (−1)ⁿ x²ⁿ⁺¹/(2n + 1)!, para todo x real', 'diff'],
    ['R1', 'f=\\operatorname{sen}\\text{:}\\ \\ f\'=\\cos,\\ f\'\'=-\\operatorname{sen},\\ f\'\'\'=-\\cos,\\ f^{(4)}=\\operatorname{sen}', 'f = sen: f′ = cos, f″ = −sen, f‴ = −cos, f⁽⁴⁾ = sen', ''],
    ['R2', 'f(0)=0,\\ \\ f\'(0)=1,\\ \\ f\'\'(0)=0,\\ \\ f\'\'\'(0)=-1', 'f(0) = 0, f′(0) = 1, f″(0) = 0, f‴(0) = −1', ''],
    ['R3', 'c_{1}=\\tfrac{1}{1!}=1,\\ \\ c_{3}=\\tfrac{-1}{3!}=-\\tfrac{1}{6},\\ \\ c_{5}=\\tfrac{1}{5!}=\\tfrac{1}{120}', 'c₁ = 1/1! = 1, c₃ = −1/3! = −1/6, c₅ = 1/5! = 1/120', ''],
    ['R4', 'P_{3}=x-\\tfrac{x^{3}}{6},\\quad P_{5}=x-\\tfrac{x^{3}}{6}+\\tfrac{x^{5}}{120}', 'P₃ = x − x³/6, P₅ = x − x³/6 + x⁵/120', ''],
    ['R5', 'P_{17}=x-\\tfrac{x^{3}}{3!}+\\tfrac{x^{5}}{5!}-\\cdots+\\tfrac{x^{17}}{17!}\\ \\ \\text{(9 términos)}', 'P₁₇ = x − x³/3! + x⁵/5! − ⋯ + x¹⁷/17! (9 términos)', ''],
    ['R6', '\\operatorname{sen}x=\\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}\\tfrac{x^{2n+1}}{(2n+1)!}\\quad(\\text{todo }x\\text{ real})', 'sen x = Σ (−1)ⁿ x²ⁿ⁺¹/(2n + 1)! (todo x real)', 'diff']];
  var TXT = [['La curva burdeo es la función. Se deriva cuatro', 'veces: la cuarta derivada es ella misma.'],
    ['Se evalúa cada derivada en el centro: salen', 'los valores 0, 1, 0, −1, y se repiten.'],
    ['Cada valor, dividido por su factorial, es un', 'coeficiente. Primer término: la recta azul.'],
    ['Con dos y con tres términos, la suma parcial', 'sigue a la curva en una zona más ancha.'],
    ['Con nueve términos (línea negra fina) va', 'pegada a la curva en todo el cuadro.'],
    ['Aquí no hay franja: la serie converge y suma', 'la función en toda la recta.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-3.1, y1:10}, aspect:13.1/6.6,
    aria:'Arriba, una franja dice qué muestra: la serie de Maclaurin del seno se arma con sus derivadas en 0 y se pega a la curva. Animación en seis pasos sobre una gráfica con x en horizontal, de menos 6,5 a 6,5, y los valores en vertical, de menos 2,2 a 2,2. Uno: se traza en burdeo la curva del seno de x, una onda que pasa por el origen. Dos: se marca el centro, x igual a 0, con un anillo en el origen. Tres: el anillo se rellena y aparece la recta azul y igual a x, la suma parcial de un término, tangente a la curva en el origen. Cuatro: aparecen la cúbica verde, x menos x al cubo sobre 6, y la curva naranja de grado cinco, que agrega x a la quinta sobre 120; cada una sigue a la onda en una zona más ancha que la anterior y después se escapa hacia arriba o hacia abajo. Cinco: una línea negra fina, la suma parcial de nueve términos, de grado diecisiete, va pegada a la onda en todo el cuadro. Seis: bajo la gráfica, una flecha doble con el rótulo vale para todo x real. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, la serie de menos 1 elevado a n por x elevado a 2n más 1 dividido por el factorial de 2n más 1, para todo x real, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\operatorname{sen}x\\)</span><span><i class="sw sec"></i> \\(P_{1}=x\\), un término</span><span><i class="sw alt"></i> \\(P_{3}=x-\\tfrac{x^{3}}{6}\\), dos términos</span><span><i class="sw rise"></i> \\(P_{5}=x-\\tfrac{x^{3}}{6}+\\tfrac{x^{5}}{120}\\), tres términos</span><span>línea negra fina: \\(P_{17}\\), la suma parcial de nueve términos</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), w, w2, w3, bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), ya;
      function txt(t, x, y, al, cc, an){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = an || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function caja(){ c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip(); }
      function anillo(x, y, col, lleno){ c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 4, 0, 6.2832); c.fillStyle = lleno ? col : '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); }
      /* marco tenue del cuadro y ejes */
      c.strokeStyle = C.grid || 'rgba(0,0,0,0.12)'; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(bx0, by0, bx1 - bx0, by1 - by0);
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-6, '−6'], [-4, '−4'], [-2, '−2'], [2, '2'], [4, '4'], [6, '6']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[-2, '−2'], [-1, '−1'], [1, '1'], [2, '2']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 - 7, 'left');
      /* paso 5: la suma parcial de nueve términos, fina */
      if (k >= 5){ w = k === 5 ? u : 1; caja(); mc32Curva(S, gx, gy, function(t){ return mc32Sen(9, t); }, XA, XA + (XB - XA)*w, C.ink, 1.1); c.restore(); if (w > 0.9) L('L17', gx(5.45), gy(-1.55), -50); }
      /* paso 4: sumas parciales de dos y de tres términos, una tras otra */
      if (k >= 4){ w = k === 4 ? u : 1; w2 = mc32Cl(2*w); w3 = mc32Cl(2*w - 1); caja();
        mc32Curva(S, gx, gy, function(t){ return mc32Sen(2, t); }, XA, XA + (XB - XA)*w2, C.alt, 1.5);
        mc32Curva(S, gx, gy, function(t){ return mc32Sen(3, t); }, XA, XA + (XB - XA)*w3, C.rise, 1.5); c.restore();
        if (w2 > 0.95) L('L3', gx(3.75), gy(-1.75), -50); if (w3 > 0.97) L('L5', gx(4.75), gy(1.8), -50); }
      /* paso 3: la suma parcial de un término, la recta */
      if (k >= 3){ w = k === 3 ? u : 1; caja(); mc32Curva(S, gx, gy, function(t){ return t; }, -2.2*w, 2.2*w, C.sec, 1.5); c.restore(); if (w > 0.9) L('L1', gx(1.15), gy(1.85), -50); }
      /* paso 1: la curva de la función */
      w = k === 1 ? u : 1; caja(); mc32Curva(S, gx, gy, Math.sin, XA, XA + (XB - XA)*w, C.tan, 2.2); c.restore(); if (w > 0.5) L('CF', gx(-4.9), gy(1.72), -50);
      /* pasos 2 y 3: el centro; ahí se evalúan las derivadas */
      if (k >= 2){ w = k === 2 ? u : 1; c.globalAlpha = w; anillo(0, 0, C.tan, k > 3 || (k === 3 && u > 0.4)); num('centro', X(gx(0)) + 7, Y(gy(0)) + 11, 'left', C.tan); c.globalAlpha = 1; }
      /* paso 6: vale en toda la recta */
      if (k >= 6){ ya = gy(YA) - 0.3; c.globalAlpha = u; dtFlecha(S, gx(-2.9), ya, gx(XA), ya, C.ink, 1.3); dtFlecha(S, gx(2.9), ya, gx(XB), ya, C.ink, 1.3); c.globalAlpha = 1; if (u > 0.3) L('IV', gx(0), ya, -50); }
      L('Q', -1.2, 8.62, 0); if (k === N && u > 0.5) L('F', -1.2, 8.04, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 1.85); txt(TXT[k - 1][1], -1.2, 1.85 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.62));
      dtQue(S, 'la serie de Maclaurin del seno se arma', 'con sus derivadas en 0 y se pega a la curva.');
      T.fin();
      oaReg(S, k, N, -1.2, 0.45, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Función: }f(x)=\\operatorname{sen}x.\\text{ Derivadas citadas:}' + Q + '(\\operatorname{sen}x)\'=\\cos x,\\qquad(\\cos x)\'=-\\operatorname{sen}x' + Q + 'f\'(x)=\\cos x' + Q + 'f\'\'(x)=(\\cos x)\'=-\\operatorname{sen}x' + Q + 'f\'\'\'(x)=(-\\operatorname{sen}x)\'=-\\cos x' + Q + 'f^{(4)}(x)=(-\\cos x)\'=-(-\\operatorname{sen}x)=\\operatorname{sen}x' + Q + '\\text{La cuarta derivada es }f\\text{: desde ahí las}' + Q + '\\text{derivadas se repiten de cuatro en cuatro.}',
      '\\text{Centro: }x=0.\\text{ Se usa }\\operatorname{sen}0=0,\\ \\cos 0=1.' + Q + 'f(0)=\\operatorname{sen}0=0' + Q + 'f\'(0)=\\cos 0=1' + Q + 'f\'\'(0)=-\\operatorname{sen}0=-0=0' + Q + 'f\'\'\'(0)=-\\cos 0=-1' + Q + 'f^{(4)}(0)=\\operatorname{sen}0=0,\\quad f^{(5)}(0)=\\cos 0=1' + Q + '\\text{Los valores }0,\\ 1,\\ 0,\\ -1\\text{ se repiten.}',
      '\\text{Coeficiente de }x^{k}\\text{: }c_{k}=\\dfrac{f^{(k)}(0)}{k!}' + Q + 'c_{0}=\\dfrac{0}{0!}=\\dfrac{0}{1}=0,\\qquad c_{1}=\\dfrac{1}{1!}=\\dfrac{1}{1}=1' + Q + 'c_{2}=\\dfrac{0}{2!}=0,\\qquad c_{3}=\\dfrac{-1}{3!}=-\\dfrac{1}{6}' + Q + 'c_{4}=\\dfrac{0}{4!}=0,\\qquad c_{5}=\\dfrac{1}{5!}=\\dfrac{1}{120}' + Q + '\\text{Hasta grado 1: }P_{1}(x)=c_{0}+c_{1}x=0+1\\cdot x=x' + Q + '\\text{Es la recta azul: pasa por el origen con}' + Q + '\\text{pendiente }f\'(0)=1\\text{, la de la curva ahí.}',
      '\\text{Hasta grado 3 y hasta grado 5:}' + Q + 'P_{3}(x)=x-\\dfrac{x^{3}}{6}' + Q + 'P_{5}(x)=x-\\dfrac{x^{3}}{6}+\\dfrac{x^{5}}{120}' + Q + '\\text{Prueba con }x=1\\text{: }\\ 1^{3}=1,\\ \\ 1^{5}=1' + Q + 'P_{1}=1' + Q + 'P_{3}=1-\\dfrac{1}{6}=\\dfrac{6}{6}-\\dfrac{1}{6}=\\dfrac{5}{6}\\approx 0{,}8333' + Q + 'P_{5}=\\dfrac{5}{6}+\\dfrac{1}{120}=\\dfrac{100}{120}+\\dfrac{1}{120}=\\dfrac{101}{120}' + Q + '\\phantom{P_{5}}\\approx 0{,}8417' + Q + '\\text{Con calculadora (radianes): }\\operatorname{sen}1\\approx 0{,}8415' + Q + '\\text{Distancias: }|0{,}8415-1|=0{,}1585' + Q + '|0{,}8415-0{,}8333|=0{,}0082' + Q + '|0{,}8415-0{,}8417|=0{,}0002' + Q + '\\text{Cada distancia es menor que la anterior.}',
      '\\text{Lejos del centro, }x=3\\text{. Cada término sale}' + Q + '\\text{del anterior: tamaño por }\\dfrac{x^{2}}{(2n)(2n+1)}=\\dfrac{9}{(2n)(2n+1)}' + Q + 'b_{0}=3' + Q + 'b_{1}=3\\cdot\\dfrac{9}{2\\cdot 3}=\\dfrac{27}{6}=4{,}5' + Q + 'b_{2}=4{,}5\\cdot\\dfrac{9}{4\\cdot 5}=\\dfrac{40{,}5}{20}=2{,}025' + Q + 'b_{3}=2{,}025\\cdot\\dfrac{9}{6\\cdot 7}=\\dfrac{18{,}225}{42}\\approx 0{,}4339' + Q + 'b_{4}\\approx 0{,}4339\\cdot\\dfrac{9}{8\\cdot 9}=\\dfrac{3{,}9051}{72}\\approx 0{,}0542' + Q + 'b_{5}\\approx 0{,}0542\\cdot\\dfrac{9}{10\\cdot 11}=\\dfrac{0{,}4878}{110}\\approx 0{,}0044' + Q + 'b_{6}\\approx 0{,}0044\\cdot\\dfrac{9}{12\\cdot 13}=\\dfrac{0{,}0396}{156}\\approx 0{,}0003' + Q + 'b_{7}\\approx 0{,}0003\\cdot\\dfrac{9}{14\\cdot 15}=\\dfrac{0{,}0027}{210}\\approx 0{,}0000' + Q + 'b_{8}\\text{ es menor todavía: }\\approx 0{,}0000' + Q + '\\text{Suma con signos alternados, paso a paso:}' + Q + '3-4{,}5=-1{,}5' + Q + '-1{,}5+2{,}025=0{,}525' + Q + '0{,}525-0{,}4339=0{,}0911' + Q + '0{,}0911+0{,}0542=0{,}1453' + Q + '0{,}1453-0{,}0044=0{,}1409' + Q + '0{,}1409+0{,}0003=0{,}1412' + Q + '0{,}1412-0{,}0000+0{,}0000=0{,}1412' + Q + 'P_{17}(3)\\approx 0{,}1412' + Q + '\\text{(suma de valores redondeados a 4 decimales)}' + Q + '\\text{Con calculadora: }\\operatorname{sen}3\\approx 0{,}1411' + Q + '\\text{Distancia: }|0{,}1411-0{,}1412|=0{,}0001' + Q + '\\text{Los tamaños primero crecen }(3;\\ 4{,}5)\\text{ y después}' + Q + '\\text{bajan rápido: el factorial le gana a la potencia.}',
      '\\text{Solo quedan potencias impares, }k=2n+1\\text{:}' + Q + 'c_{2n+1}=\\dfrac{(-1)^{n}}{(2n+1)!}' + Q + 'n=0\\text{: }(-1)^{0}\\dfrac{x^{1}}{1!}=x' + Q + 'n=1\\text{: }(-1)^{1}\\dfrac{x^{3}}{3!}=-\\dfrac{x^{3}}{6}' + Q + 'n=2\\text{: }(-1)^{2}\\dfrac{x^{5}}{5!}=\\dfrac{x^{5}}{120}' + Q + '\\operatorname{sen}x=\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}\\dfrac{x^{2n+1}}{(2n+1)!}\\quad\\text{para todo }x' + Q + '\\text{Que la serie converge para todo }x\\text{ lo da el}' + Q + '\\text{criterio del cociente (ejemplo 2). Que su suma}' + Q + '\\text{es }\\operatorname{sen}x\\text{ lo da la cota de Lagrange}' + Q + '\\text{(recuadro «¿La suma es la función?»).}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: se elige x; cos x, P₄ (tres términos) y P₈ (cinco términos), distancias y cota de Lagrange, con toda la cuenta; casos límite: el centro (distancia 0) y x lejos del centro (P₄ falla por mucho y P₈ ya se acerca) */
OA.scene('esc3-vivo', (function(){
  var Q = '\\\\&\\qquad ', XS = [[-2, 1], [0, 1], [1, 1], [2, 1], [3, 1], [4, 1]], NP = XS.length, XA = -4.5, XB = 4.5, YA = -1.55, YB = 4.25, FA = [1, 2, 24, 720, 40320, 3628800];
  function gx(x){ return 2 + 0.68*x; } function gy(y){ return 2.9 + 0.87*y; }
  function cual(v){ return Math.max(1, Math.min(NP, Math.round(v.pos || 1))) - 1; }
  var NOTA = {k:'cerca del centro: bastan pocos términos', c:'caso límite: en el centro coinciden exactamente', l:'lejos del centro: hacen falta más términos', n:'x negativo: mismas cuentas que con su opuesto'};
  var DAT = XS.map(function(f){ var p = f[0], q = f[1], o = {p:p, q:q, x:p/q, pw:[[1, 1]], tm:[[1, 1]]}, k, D, x2 = mc32F(p*p, q*q);
    for (k = 1; k <= 5; k++){ o.pw[k] = mc32F(o.pw[k - 1][0]*x2[0], o.pw[k - 1][1]*x2[1]); o.tm[k] = mc32F(o.pw[k][0], FA[k]*o.pw[k][1]); } /* x^(2k) y x^(2k)/(2k)!, exactos */
    D = o.tm[1][1]*o.tm[2][1]/mc32Mcd(o.tm[1][1], o.tm[2][1]);
    o.D = D; o.nu = [D, o.tm[1][0]*(D/o.tm[1][1]), o.tm[2][0]*(D/o.tm[2][1])]; o.n4 = o.nu[0] - o.nu[1] + o.nu[2]; o.P4 = mc32F(o.n4, D); o.s4 = mc32R(o.n4, D);
    o.e3 = mc32R(o.tm[3][0], o.tm[3][1]); o.e4 = mc32R(o.tm[4][0], o.tm[4][1]); o.s8 = o.s4 - o.e3 + o.e4;
    o.cs = Math.round(Math.cos(o.x)*10000); o.d4 = Math.abs(o.cs - o.s4); o.d8 = Math.abs(o.cs - o.s8);
    o.cd = mc32R(o.tm[5][0], o.tm[5][1]) === 0 ? 7 : 4; o.ct = mc32R(o.tm[5][0], o.tm[5][1], o.cd); /* cota de Lagrange |x|^10/10!; si con 4 decimales da 0, se escribe con 7 */
    o.tipo = p === 0 ? 'c' : p < 0 ? 'n' : Math.abs(p) <= 2*q ? 'k' : 'l';
    return o; });
  var PZ = [['CF', 'y=\\cos x', 'y = cos x', 'c-tan'], ['C4', 'P_{4}', 'P₄', 'c-sec'], ['C8', 'P_{8}', 'P₈', 'c-alt']];
  DAT.forEach(function(o, j){ var xt = mc32Tx([o.p, o.q], 1), xp = mc32Pl([o.p, o.q]), ig = o.tipo === 'c', fr = {c:'el centro', k:'cerca del centro', l:'lejos del centro', n:'a la izquierda del centro'}[o.tipo];
    PZ.push(['A' + j, 'x=' + xt + '\\text{: ' + fr + '}', 'x = ' + xp + ': ' + fr, 'pt']);
    PZ.push(['B' + j, ig ? '\\text{función: }\\cos 0=1' : '\\text{función: }\\cos x\\approx ' + mc32D(o.cs, 1), ig ? 'función: cos 0 = 1' : 'función: cos x ≈ ' + mc32D(o.cs), 'c-tan']);
    PZ.push(['D' + j, ig ? '\\text{sumas parciales: }P_{4}=1,\\quad P_{8}=1' : '\\text{sumas parciales: }P_{4}' + mc32Ig(o.P4) + mc32D(o.s4, 1) + ',\\quad P_{8}\\approx ' + mc32D(o.s8, 1), ig ? 'sumas parciales: P₄ = 1, P₈ = 1' : 'sumas parciales: P₄ ' + (mc32Ig(o.P4) === '=' ? '= ' : '≈ ') + mc32D(o.s4) + ', P₈ ≈ ' + mc32D(o.s8), 'pt']); });
  function dist(a, b){ var i = a - b; return '|' + mc32D(a, 1) + '-' + mc32Pa(mc32D(b, 1)) + '|' + (i < 0 ? Q + '=|' + mc32D(i, 1) + '|' : '') + '=' + mc32D(Math.abs(i), 1); }
  function lectura(j){ var o = DAT[j], xt = mc32Tx([o.p, o.q]), xa = mc32Tx([Math.abs(o.p), o.q]), R = [], l, k, ex;
    if (o.tipo === 'c') return [
      '\\text{Datos: }x=0\\text{ (el centro)},\\quad f(x)=\\cos x' + Q + 'P_{4}(x)=1-\\dfrac{x^{2}}{2!}+\\dfrac{x^{4}}{4!}=1-\\dfrac{x^{2}}{2}+\\dfrac{x^{4}}{24}',
      '\\text{Potencias: }0^{2}=0,\\quad 0^{4}=0,\\quad 0^{6}=0,\\quad 0^{8}=0',
      'P_{4}=1-\\dfrac{0}{2}+\\dfrac{0}{24}=1-0+0=1' + Q + 'P_{8}=P_{4}-\\dfrac{0}{720}+\\dfrac{0}{40320}=1-0+0=1',
      '\\text{Función: }\\cos 0=1\\quad\\text{(exacto)}',
      '\\text{Distancia con 3 términos: }|1-1|=0' + Q + '\\text{Distancia con 5 términos: }|1-1|=0',
      '\\text{Cota de Lagrange: }\\dfrac{|x|^{10}}{10!}=\\dfrac{0}{3628800}=0' + Q + '\\text{La distancia, }0\\text{, no la supera.}',
      '\\text{Caso límite: en el centro solo queda el primer}' + Q + '\\text{término, }\\dfrac{f(0)}{0!}=\\dfrac{1}{1}=1\\text{; todos los demás}' + Q + '\\text{valen }0\\text{. La suma coincide con la función}' + Q + '\\text{con cualquier número de términos.}'];
    R.push('\\text{Datos: }x=' + xt + ',\\quad f(x)=\\cos x' + Q + 'P_{4}(x)=\\displaystyle\\sum_{n=0}^{2}(-1)^{n}\\dfrac{x^{2n}}{(2n)!}' + Q + '\\phantom{P_{4}(x)}=1-\\dfrac{x^{2}}{2!}+\\dfrac{x^{4}}{4!}=1-\\dfrac{x^{2}}{2}+\\dfrac{x^{4}}{24}' + Q + '\\text{(tres términos; }2!=2,\\ \\ 4!=24)');
    R.push('\\text{Potencias de }x\\text{:}' + Q + 'x^{2}=x\\cdot x=' + mc32Pa(xt) + '\\cdot ' + mc32Pa(xt) + '=' + mc32Tx(o.pw[1]) + Q + 'x^{4}=x^{2}\\cdot x^{2}=' + mc32Tx(o.pw[1]) + '\\cdot ' + mc32Tx(o.pw[1]) + '=' + mc32Tx(o.pw[2]));
    l = '\\text{Cada potencia, dividida por su factorial:}';
    for (k = 1; k <= 2; k++){ ex = [o.pw[k][0], FA[k]*o.pw[k][1]]; l += Q + '\\dfrac{x^{' + 2*k + '}}{' + FA[k] + '}=' + mc32Tx(ex) + (ex[0] !== o.tm[k][0] || ex[1] !== o.tm[k][1] ? '=' + mc32Tx(o.tm[k]) : ''); }
    R.push(l);
    l = '\\text{Se reemplaza en }P_{4}\\text{:}' + Q + 'P_{4}=1-' + mc32Tx(o.tm[1]) + '+' + mc32Tx(o.tm[2]);
    if (o.D === 1) l += '=' + o.n4;
    else l += Q + '\\text{Denominador común, }' + o.D + '\\text{:}' + Q + '1=\\tfrac{' + o.nu[0] + '}{' + o.D + '}' + [1, 2].map(function(i){ return o.tm[i][1] === o.D ? '' : ',\\qquad ' + mc32Tx(o.tm[i], 1) + '=\\tfrac{' + o.nu[i] + '}{' + o.D + '}'; }).join('') + Q + 'P_{4}=\\dfrac{' + o.nu[0] + '-' + o.nu[1] + '+' + o.nu[2] + '}{' + o.D + '}=\\dfrac{' + o.n4 + '}{' + o.D + '}' + (o.n4 < 0 || o.P4[1] !== o.D ? '=' + mc32Tx(o.P4) : '') + Q + '\\text{División' + (mc32Ig(o.P4) === '=' ? ': }P_{4}=' : ', con 4 decimales: }P_{4}\\approx ') + mc32D(o.s4, 1);
    R.push(l);
    R.push('\\text{Función, con calculadora (en radianes):}' + Q + '\\cos' + (o.p < 0 ? '(' + xt + ')' : '\\,' + xt) + '\\approx ' + mc32D(o.cs, 1));
    R.push('\\text{Distancia entre la función y }P_{4}\\text{:}' + Q + dist(o.cs, o.s4));
    l = '\\text{Dos términos más }(6!=720,\\ \\ 8!=40320)\\text{:}';
    for (k = 3; k <= 4; k++){ ex = [o.pw[k][0], FA[k]*o.pw[k][1]]; l += Q + 'x^{' + 2*k + '}=x^{' + (2*k - 2) + '}\\cdot x^{2}=' + mc32Tx(o.pw[k - 1]) + '\\cdot ' + mc32Tx(o.pw[1]) + '=' + mc32Tx(o.pw[k]) + Q + '\\dfrac{x^{' + 2*k + '}}{' + FA[k] + '}=' + mc32Tx(ex) + (ex[0] !== o.tm[k][0] || ex[1] !== o.tm[k][1] ? '=' + mc32Tx(o.tm[k]) : '') + mc32Ig(o.tm[k]) + mc32D(k === 3 ? o.e3 : o.e4, 1); }
    R.push(l);
    R.push('P_{8}=P_{4}-\\dfrac{x^{6}}{720}+\\dfrac{x^{8}}{40320}\\quad\\text{(cinco términos)}' + Q + '\\approx ' + mc32D(o.s4, 1) + '-' + mc32D(o.e3, 1) + '+' + mc32D(o.e4, 1) + Q + '=' + mc32D(o.s4 - o.e3, 1) + '+' + mc32D(o.e4, 1) + '=' + mc32D(o.s8, 1));
    R.push('\\text{Distancia entre la función y }P_{8}\\text{:}' + Q + dist(o.cs, o.s8));
    R.push('\\text{Cota de Lagrange (recuadro anterior):}' + Q + '|\\cos x-P_{8}(x)|\\le\\dfrac{|x|^{10}}{10!},\\qquad 10!=3628800' + Q + '|x|^{10}=x^{8}\\cdot x^{2}=' + mc32Tx(o.pw[4]) + '\\cdot ' + mc32Tx(o.pw[1]) + '=' + mc32Tx(o.pw[5]) + Q + '\\dfrac{' + o.pw[5][0] + '}{3628800}' + (o.tm[5][1] !== 3628800 ? '=' + mc32Tx(o.tm[5]) : '') + '\\approx ' + mc32D(o.ct, 1, o.cd) + Q + '\\text{La distancia, }' + mc32D(o.d8, 1) + '\\text{, no supera la cota.}');
    if (o.tipo === 'k') R.push('|x|=' + xa + '\\text{: cerca del centro.}' + Q + '\\text{La distancia bajó de }' + mc32D(o.d4, 1) + '\\text{ a }' + mc32D(o.d8, 1) + '.' + (o.d8 === 0 ? Q + '\\text{Con 4 decimales, }P_{8}\\text{ y }\\cos x\\text{ no se distinguen.}' : '') + Q + '\\text{Cerca del centro, pocos términos ya dan}' + Q + '\\text{una aproximación muy buena.}');
    else if (o.tipo === 'l') R.push('|x|=' + xa + '\\text{: lejos del centro.}' + Q + '\\text{Con tres términos la distancia es }' + mc32D(o.d4, 1) + '\\text{:}' + Q + P4mal(o) + Q + '\\text{Con cinco términos baja a }' + mc32D(o.d8, 1) + '.' + Q + '\\text{La serie converge para todo }x\\text{: con más}' + Q + '\\text{términos la distancia baja tanto como se}' + Q + '\\text{quiera. Lejos del centro hacen falta más.}');
    else R.push('x=' + xt + '\\text{ es negativo. Como solo hay potencias}' + Q + '\\text{pares, }(' + xt + ')^{2}=' + mc32Tx(o.pw[1]) + '=' + xa + '^{2}\\text{: todas las cuentas son}' + Q + '\\text{las mismas que con }x=' + xa + '.' + Q + '\\text{Es la paridad: }\\cos(-x)=\\cos x.' + Q + '\\text{La distancia bajó de }' + mc32D(o.d4, 1) + '\\text{ a }' + mc32D(o.d8, 1) + '.');
    return R; }
  function P4mal(o){ return Math.abs(o.s4) > 10000 ? 'P_{4}\\text{ ni siquiera está entre }-1\\text{ y }1.' : 'P_{4}\\text{ queda lejos de la curva.}'; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.5}, aspect:10/6.6, _dat:DAT,
    aria:'Arriba, una franja dice qué muestra: la serie del coseno sirve para todo x; lejos del centro pide más términos. Una gráfica con x en horizontal, de menos 4,5 a 4,5, y los valores en vertical, de menos 1,55 a 4,25. En burdeo, la curva del coseno de x. En azul, la suma parcial de tres términos de su serie, 1 menos x al cuadrado sobre 2 más x a la cuarta sobre 24; en verde, la de cinco términos, que llega hasta x a la octava sobre 40320. Un deslizador elige x entre seis valores: menos 2, 0, 1, 2, 3 y 4. Una línea vertical punteada marca el x elegido, con un punto sobre cada curva; un trazo naranja une el punto de la función con el de la suma de tres términos, y otro, más delgado, con el de la suma de cinco. Arriba se leen los tres valores. En x igual a 0, el centro, los tres valen 1. En 1 y en 2, cerca del centro, los puntos casi coinciden. En menos 2 las cuentas son las mismas que en 2, porque el coseno es par. En 3 y en 4, lejos del centro, la suma de tres términos se separa mucho de la curva y la de cinco ya queda cerca: en x igual a 4 la distancia baja de 4,3203 a 0,2568. Bajo el dibujo, frases dan las dos distancias y, más abajo, la cuenta completa, con la cota de Lagrange.',
    labels:PZ,
    sliders:[{id:'pos', tex:'x', min:1, max:NP, step:1, value:4}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\cos x\\)</span><span><i class="sw sec"></i> \\(P_{4}\\), suma parcial de tres términos</span><span><i class="sw alt"></i> \\(P_{8}\\), suma parcial de cinco términos</span><span><i class="sw rise"></i> distancia entre la función y cada suma parcial, en el \\(x\\) elegido</span>',
    anim:{run:30000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.pos = Math.min(NP, 1 + Math.floor(p*NP)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = cual(v), o = DAT[j], C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), px = X(gx(o.x)), yf = Y(gy(Math.cos(o.x))), y4 = Y(gy(mc32Cos(3, o.x))), y8 = Y(gy(mc32Cos(5, o.x))), xe, xw;
      function txt(t, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function punto(py, col){ c.beginPath(); c.arc(px, py, 3.4, 0, 6.2832); c.fillStyle = col; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1; c.setLineDash([]); c.stroke(); }
      /* marco tenue del cuadro y ejes */
      c.strokeStyle = C.grid || 'rgba(0,0,0,0.12)'; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(bx0, by0, bx1 - bx0, by1 - by0);
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-4, '−4'], [-3, '−3'], [-2, '−2'], [-1, '−1'], [1, '1'], [2, '2'], [3, '3'], [4, '4']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); if (Math.abs(m[0] - o.x) > 0.3) num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[-1, '−1'], [1, '1'], [2, '2'], [3, '3'], [4, '4']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); if (!(o.p === 0 && m[0] === 1)) num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 7, 'left');
      /* curvas, recortadas al cuadro */
      c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip();
      mc32Curva(S, gx, gy, function(t){ return mc32Cos(5, t); }, XA, XB, C.alt, 1.5);
      mc32Curva(S, gx, gy, function(t){ return mc32Cos(3, t); }, XA, XB, C.sec, 1.5);
      mc32Curva(S, gx, gy, Math.cos, XA, XB, C.tan, 2.2); c.restore();
      T.L('CF', gx(-0.25), gy(1.45), -100); T.L('C4', gx(-3.45), gy(3.3), 0); T.L('C8', gx(-4.4), gy(1.1), 0);
      /* el x elegido: línea vertical, distancias y puntos */
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, by0); c.lineTo(px, by1); c.stroke(); c.setLineDash([]);
      c.font = '700 10.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('x elegido', Math.max(bx0 + 26, Math.min(bx1 - 26, px)), by1 + 10);
      xe = ('' + o.x).replace('.', ',').replace('-', '−'); c.font = '700 11px ' + F; xw = c.measureText(xe).width; c.fillStyle = '#fff'; c.fillRect(px - xw/2 - 2, Y(gy(0)) + 5, xw + 4, 13); c.fillStyle = C.ink; c.textAlign = 'center'; c.fillText(xe, px, Y(gy(0)) + 11.5);
      c.strokeStyle = C.rise; c.lineWidth = 3.2; c.beginPath(); c.moveTo(px - 3, yf); c.lineTo(px - 3, y4); c.stroke(); c.lineWidth = 1.6; c.beginPath(); c.moveTo(px + 3, yf); c.lineTo(px + 3, y8); c.stroke();
      punto(y8, C.alt); punto(y4, C.sec); punto(yf, C.tan);
      T.L('A' + j, -1.2, 8.14, 0); T.L('B' + j, -1.2, 7.62, 0); T.L('D' + j, -1.2, 7.1, 0);
      txt('distancia con 3 términos: ' + mc32D(o.d4), 0.78, C.sec); txt('distancia con 5 términos: ' + mc32D(o.d8), 0.78 - 21/s, C.alt); txt(NOTA[o.tipo], 0.78 - 42/s, C.ink);
      dtQue(S, 'la serie del coseno sirve para todo x;', 'lejos del centro pide más términos.');
      T.fin();
    },
    caption:function(v){ var o = DAT[cual(v)]; return 'x = ' + mc32Pl([o.p, o.q]) + '. Función: ' + mc32D(o.cs) + '. Suma de tres términos: ' + mc32D(o.s4) + '; distancia ' + mc32D(o.d4) + '. Suma de cinco términos: ' + mc32D(o.s8) + '; distancia ' + mc32D(o.d8) + '. ' + NOTA[o.tipo].charAt(0).toUpperCase() + NOTA[o.tipo].slice(1) + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
