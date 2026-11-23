/* L25 H31 · serie de Maclaurin: cada derivada de f en 0, dividida por n!, es un coeficiente; con 1/(1 + x)² salen 1, −2, 3, −4, …; la serie converge solo si −1 < x < 1. Segunda escena: (1 + x)^k con k entero de 0 a 4, una serie que termina */
function mc31Cl(t){ return Math.max(0, Math.min(1, t)); }
function mc31Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q simplificada, en TeX; t = 1 para tamaño chico */
function mc31Tx(p, q, t){ var g = mc31Mcd(p, q), s; p /= g; q /= g; s = p < 0 ? '-' : ''; p = Math.abs(p); return q === 1 ? s + p : s + '\\' + (t ? 't' : 'd') + 'frac{' + p + '}{' + q + '}'; }
/* p/q con q potencia de 2: decimal exacto, con coma */
function mc31Dc(p, q, tex){ var e = 0, d = q, s; while (d > 1){ d /= 2; e++; } s = (p/q).toFixed(e); if (e) s = s.replace(/0+$/, '').replace(/\.$/, ''); return s.replace('.', tex ? '{,}' : ','); }
function mc31Curva(S, gx, gy, f, a, b, col, wd, dash){ var c = S.ctx, i, n = 160, t; if (b <= a) return; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); } c.stroke(); c.setLineDash([]); }
/* suma hasta el grado n de 1 − 2x + 3x² − 4x³ + … */
function mc31P(n, x){ var s = 0, p = 1, j; for (j = 0; j <= n; j++){ s += (j % 2 ? -1 : 1)*(j + 1)*p; p *= x; } return s; }
function mc31F(x){ return 1/((1 + x)*(1 + x)); }
function mc31Bin(k, n){ var r = 1, j; if (n > k) return 0; for (j = 1; j <= n; j++) r = r*(k - j + 1)/j; return Math.round(r); }
function mc31Fac(n){ var r = 1, j; for (j = 2; j <= n; j++) r *= j; return r; }
OA.scene('mac-idea', (function(){
  var N = 6, XA = -1.3, XB = 1.5, YA = -1.5, YB = 4.5, Q = '\\\\&\\qquad ';
  function gx(x){ return 1.75 + 2.2*x; } function gy(y){ return 2.55 + y; }
  var PZ = [['IV', '-1<x<1', '−1 < x < 1', ''], ['CF', 'y=\\tfrac{1}{(1+x)^{2}}', 'y = 1/(1 + x)²', 'c-tan'],
    ['L0', 'P_{0}', 'P₀', ''], ['L1', 'P_{1}', 'P₁', 'c-sec'], ['L2', 'P_{2}', 'P₂', 'c-alt'], ['L3', 'P_{3}', 'P₃', 'diff'], ['L8', 'P_{8}', 'P₈', 'pt'],
    ['Q', '\\text{¿Cuál es la serie de Maclaurin de }\\tfrac{1}{(1+x)^{2}}\\text{?}', '¿Cuál es la serie de Maclaurin de 1/(1 + x)²?', 'pt'],
    ['F', '\\Longrightarrow\\ \\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}(n+1)\\,x^{n}\\text{; converge si }-1<x<1', '⟹ Σ (−1)ⁿ(n + 1)xⁿ; converge si −1 < x < 1', 'diff'],
    ['R1', 'f(0)=\\tfrac{1}{(1+0)^{2}}=1\\ \\Longrightarrow\\ c_{0}=\\tfrac{1}{0!}=1', 'f(0) = 1/(1 + 0)² = 1 ⟹ c₀ = 1/0! = 1', ''],
    ['R2', 'f\'(0)=-2\\ \\Longrightarrow\\ c_{1}=\\tfrac{-2}{1!}=-2', 'f′(0) = −2 ⟹ c₁ = −2/1! = −2', ''],
    ['R3', 'f\'\'(0)=6\\ \\Longrightarrow\\ c_{2}=\\tfrac{6}{2!}=3', 'f″(0) = 6 ⟹ c₂ = 6/2! = 3', ''],
    ['R4', 'f\'\'\'(0)=-24\\ \\Longrightarrow\\ c_{3}=\\tfrac{-24}{3!}=-4', 'f‴(0) = −24 ⟹ c₃ = −24/3! = −4', ''],
    ['R5', 'c_{n}=\\tfrac{f^{(n)}(0)}{n!}=\\tfrac{(-1)^{n}(n+1)!}{n!}=(-1)^{n}(n+1)', 'cₙ = f⁽ⁿ⁾(0)/n! = (−1)ⁿ(n + 1)!/n! = (−1)ⁿ(n + 1)', ''],
    ['R6', '\\textstyle\\sum_{n=0}^{\\infty}(-1)^{n}(n+1)\\,x^{n}\\text{ converge solo si }-1<x<1', 'Σ (−1)ⁿ(n + 1)xⁿ converge solo si −1 < x < 1', 'diff']];
  var TXT = [['La curva burdeo es la función. Su valor en 0', 'es el primer coeficiente: la recta horizontal.'],
    ['La primera derivada en 0 da el segundo', 'coeficiente: la recta azul, tangente en 0.'],
    ['La segunda derivada en 0, dividida por 2!, da', 'el tercer coeficiente: la parábola verde.'],
    ['La tercera derivada en 0, dividida por 3!, da', 'el cuarto coeficiente: la cúbica naranja.'],
    ['El patrón da todos los coeficientes. Línea negra:', 'la suma hasta el grado 8, con nueve términos.'],
    ['La serie converge solo en la franja gris. Cerca', 'de sus bordes hacen falta muchos más términos.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:9.6}, aspect:14.5/6.6,
    aria:'Arriba, una franja dice qué muestra: cada derivada en 0 fija un coeficiente de la serie, y la franja gris dice dónde converge. Animación en seis pasos sobre una gráfica con x en horizontal, de menos 1,3 a 1,5, y los valores en vertical, de menos 1,5 a 4,5. Uno: se traza en burdeo la curva de 1 dividido por 1 más x, al cuadrado, para x mayor que menos 1; pasa por el punto de x igual a 0 y altura 1, marcado con un anillo, y sube sin tope al acercarse a x igual a menos 1. Una recta horizontal punteada a la altura 1 es la suma de grado 0. Dos: una recta azul, 1 menos 2 x, tangente a la curva en ese punto. Tres: una parábola verde, 1 menos 2 x más 3 x al cuadrado. Cuatro: una cúbica naranja, que agrega menos 4 x al cubo. Cada una queda junto a la curva en un tramo más largo alrededor de 0. Cinco: una línea negra fina, la suma hasta el grado 8, que sigue a la curva entre menos 0,5 y 0,6 y se separa hacia arriba antes de llegar a x igual a 1. Seis: se sombrea en gris la franja vertical entre x igual a menos 1 y x igual a 1, con anillos abiertos en los extremos: es donde la serie converge. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, la serie de menos 1 elevado a n por n más 1 por x elevado a n, que converge si x está entre menos 1 y 1, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\tfrac{1}{(1+x)^{2}}\\)</span><span>punteada gris: \\(P_{0}=1\\)</span><span><i class="sw sec"></i> \\(P_{1}=1-2x\\)</span><span><i class="sw alt"></i> \\(P_{2}=1-2x+3x^{2}\\)</span><span><i class="sw rise"></i> \\(P_{3}=1-2x+3x^{2}-4x^{3}\\)</span><span>línea negra fina: \\(P_{8}\\), la suma hasta el grado 8</span><span>franja gris: el intervalo \\(-1&lt;x&lt;1\\), sin los extremos</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), w, bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), gm = C.muted || '#6b6b6b';
      function txt(t, x, y, al, cc, an){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = an || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || gm; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function caja(){ c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip(); }
      function anillo(x, y, col, lleno){ c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 4, 0, 6.2832); c.fillStyle = lleno ? col : '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); }
      /* paso 6: la franja donde la serie converge, debajo de todo */
      if (k >= 6){ w = u; c.globalAlpha = 0.08*w; c.fillStyle = C.ink; c.fillRect(X(gx(-1)), by0, (X(gx(1)) - X(gx(-1)))*w, by1 - by0); c.globalAlpha = 0.55*w; c.strokeStyle = gm; c.lineWidth = 1; c.setLineDash([4, 3]);
        [-1, 1].forEach(function(x){ if (x === 1 && w < 0.98) return; c.beginPath(); c.moveTo(X(gx(x)), by0); c.lineTo(X(gx(x)), by1); c.stroke(); }); c.setLineDash([]); c.globalAlpha = 1;
        if (w > 0.6) L('IV', gx(0.45), gy(2.6), -50); }
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1, '−1'], [-0.5, '−0,5'], [0.5, '0,5'], [1, '1'], [1.5, '1,5']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[1, '1'], [2, '2'], [3, '3'], [4, '4']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); if (m[0] !== 1) num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* paso 5: la suma hasta el grado 8, fina */
      if (k >= 5){ w = k === 5 ? u : 1; caja(); mc31Curva(S, gx, gy, function(t){ return mc31P(8, t); }, -0.62, -0.62 + (1.05 + 0.62)*w, C.ink, 1.1); c.restore(); if (w > 0.9) L('L8', gx(0.84), gy(3.3), -100); }
      /* paso 1: la suma de grado 0, una recta horizontal */
      w = k === 1 ? mc31Cl(2*u - 1) : 1; if (w > 0){ c.strokeStyle = gm; c.lineWidth = 1.2; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(bx0, Y(gy(1))); c.lineTo(bx0 + (bx1 - bx0)*w, Y(gy(1))); c.stroke(); c.setLineDash([]); if (w > 0.9) L('L0', gx(1.4), gy(1.3), -50); }
      /* pasos 2, 3 y 4: las sumas de grado 1, 2 y 3 */
      if (k >= 2){ w = k === 2 ? u : 1; caja(); mc31Curva(S, gx, gy, function(t){ return mc31P(1, t); }, XA, XA + (XB - XA)*w, C.sec, 1.5); c.restore(); if (w > 0.95) L('L1', gx(1.2), gy(-1.12), 0); }
      if (k >= 3){ w = k === 3 ? u : 1; caja(); mc31Curva(S, gx, gy, function(t){ return mc31P(2, t); }, XA, XA + (XB - XA)*w, C.alt, 1.5); c.restore(); if (w > 0.95) L('L2', gx(1.36), gy(3.1), 0); }
      if (k >= 4){ w = k === 4 ? u : 1; caja(); mc31Curva(S, gx, gy, function(t){ return mc31P(3, t); }, XA, XA + (XB - XA)*w, C.rise, 1.5); c.restore(); if (w > 0.95) L('L3', gx(0.8), gy(-1.12), -100); }
      /* paso 1: la curva de la función y su punto en el centro */
      w = k === 1 ? mc31Cl(2*u) : 1; caja(); mc31Curva(S, gx, gy, mc31F, -0.55, -0.55 + (XB + 0.55)*w, C.tan, 2.2); c.restore(); if (w > 0.5) L('CF', gx(0.08), gy(4.1), 0);
      anillo(0, 1, C.tan, k > 1 || u > 0.5); num('centro', X(gx(0)) + 7, Y(gy(0)) + 11, 'left', C.tan);
      /* paso 6: extremos abiertos del intervalo */
      if (k >= 6){ anillo(-1, 0, gm, 0); if (u > 0.98) anillo(1, 0, gm, 0); if (u > 0.9){ txt('cerca del centro', gx(-0.93), gy(-0.62)); txt('la línea negra se', gx(-0.93), gy(-0.62) - 16/s); txt('pega a la curva', gx(-0.93), gy(-0.62) - 32/s); } }
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = gm; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'cada derivada en 0 fija un coeficiente', 'de la serie; la franja dice dónde converge.');
      T.fin();
      oaReg(S, k, N, -1.2, -0.95, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Función: }f(x)=\\dfrac{1}{(1+x)^{2}}=(1+x)^{-2},\\quad x\\neq -1.' + Q + '\\text{Valor en el centro, }x=0\\text{:}' + Q + 'f(0)=\\dfrac{1}{(1+0)^{2}}=\\dfrac{1}{1^{2}}=\\dfrac{1}{1}=1' + Q + '\\text{Coeficiente, con }0!=1\\text{:}' + Q + 'c_{0}=\\dfrac{f(0)}{0!}=\\dfrac{1}{1}=1' + Q + '\\text{Suma hasta el grado }0\\text{: }P_{0}(x)=1',
      '\\text{Primera derivada (regla de la potencia y}' + Q + '\\text{regla de la cadena, citadas):}' + Q + 'f\'(x)=(-2)\\cdot(1+x)^{-3}\\cdot(1+x)\'' + Q + '\\phantom{f\'(x)}=(-2)\\cdot(1+x)^{-3}\\cdot 1=-2(1+x)^{-3}' + Q + 'f\'(0)=-2\\cdot(1+0)^{-3}=-2\\cdot 1=-2' + Q + '\\text{Coeficiente, con }1!=1\\text{:}' + Q + 'c_{1}=\\dfrac{f\'(0)}{1!}=\\dfrac{-2}{1}=-2' + Q + 'P_{1}(x)=1-2x\\quad\\text{(la recta tangente en }x=0)',
      '\\text{Segunda derivada: se deriva }-2(1+x)^{-3}\\text{:}' + Q + 'f\'\'(x)=(-2)\\cdot(-3)\\cdot(1+x)^{-4}\\cdot 1=6(1+x)^{-4}' + Q + 'f\'\'(0)=6\\cdot(1+0)^{-4}=6\\cdot 1=6' + Q + '\\text{Coeficiente, con }2!=2\\cdot 1=2\\text{:}' + Q + 'c_{2}=\\dfrac{f\'\'(0)}{2!}=\\dfrac{6}{2}=3' + Q + 'P_{2}(x)=1-2x+3x^{2}',
      '\\text{Tercera derivada: se deriva }6(1+x)^{-4}\\text{:}' + Q + 'f\'\'\'(x)=6\\cdot(-4)\\cdot(1+x)^{-5}\\cdot 1=-24(1+x)^{-5}' + Q + 'f\'\'\'(0)=-24\\cdot(1+0)^{-5}=-24\\cdot 1=-24' + Q + '\\text{Coeficiente, con }3!=3\\cdot 2\\cdot 1=6\\text{:}' + Q + 'c_{3}=\\dfrac{f\'\'\'(0)}{3!}=\\dfrac{-24}{6}=-4' + Q + 'P_{3}(x)=1-2x+3x^{2}-4x^{3}' + Q + '\\text{Prueba con }x=\\dfrac{1}{4}\\text{: }\\ x^{2}=\\dfrac{1}{16},\\ \\ x^{3}=\\dfrac{1}{64}' + Q + '2x=\\dfrac{2}{4}=\\dfrac{1}{2},\\qquad 3x^{2}=\\dfrac{3}{16}' + Q + '4x^{3}=\\dfrac{4}{64}=\\dfrac{1}{16}' + Q + 'P_{0}=1,\\qquad P_{1}=1-\\dfrac{1}{2}=\\dfrac{1}{2}=0{,}5' + Q + 'P_{2}=\\dfrac{1}{2}+\\dfrac{3}{16}=\\dfrac{8}{16}+\\dfrac{3}{16}=\\dfrac{11}{16}=0{,}6875' + Q + 'P_{3}=\\dfrac{11}{16}-\\dfrac{1}{16}=\\dfrac{10}{16}=\\dfrac{5}{8}=0{,}625' + Q + '\\text{Función: }1+\\dfrac{1}{4}=\\dfrac{5}{4},\\quad\\left(\\dfrac{5}{4}\\right)^{2}=\\dfrac{25}{16}' + Q + 'f\\!\\left(\\tfrac{1}{4}\\right)=1:\\dfrac{25}{16}=\\dfrac{16}{25}=0{,}64' + Q + '\\text{Distancias: }|0{,}64-1|=0{,}36' + Q + '|0{,}64-0{,}5|=0{,}14' + Q + '|0{,}64-0{,}6875|=0{,}0475' + Q + '|0{,}64-0{,}625|=0{,}015' + Q + '\\text{Cada distancia es menor que la anterior.}',
      '\\text{Valores en }0\\text{: }\\ 1,\\ -2,\\ 6,\\ -24' + Q + '\\text{Sin el signo: }1=1!,\\ \\ 2=2!,\\ \\ 6=3!,\\ \\ 24=4!' + Q + '\\text{Signos: }+,\\ -,\\ +,\\ -\\text{, es decir, }(-1)^{n}' + Q + '\\text{Fórmula: }f^{(n)}(x)=(-1)^{n}(n+1)!\\,(1+x)^{-(n+2)}' + Q + '\\text{Al derivarla sale el factor }-(n+2)\\text{:}' + Q + '(-1)^{n}(n+1)!\\cdot\\big(-(n+2)\\big)=(-1)^{n+1}(n+2)!' + Q + '\\text{y el exponente baja a }-(n+3)\\text{: es la misma}' + Q + '\\text{fórmula con }n+1\\text{. El patrón sigue.}' + Q + 'f^{(n)}(0)=(-1)^{n}(n+1)!\\cdot 1=(-1)^{n}(n+1)!' + Q + '\\text{Como }(n+1)!=(n+1)\\cdot n!\\text{:}' + Q + 'c_{n}=\\dfrac{(-1)^{n}(n+1)\\cdot n!}{n!}=(-1)^{n}(n+1)' + Q + '\\text{Serie de Maclaurin:}' + Q + '\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}(n+1)\\,x^{n}' + Q + '=1-2x+3x^{2}-4x^{3}+\\cdots' + Q + '\\text{Término de grado }8\\text{: }(-1)^{8}\\cdot 9\\cdot x^{8}=9x^{8}',
      '\\text{¿Para qué }x\\text{ converge? Criterio del cociente}' + Q + '\\text{con }a_{n}=(-1)^{n}(n+1)\\,x^{n}\\text{ y }x\\neq 0.' + Q + '\\text{Tamaño: }|a_{n}|=(n+1)\\,|x|^{n}' + Q + '\\dfrac{|a_{n+1}|}{|a_{n}|}=\\dfrac{(n+2)\\,|x|^{n+1}}{(n+1)\\,|x|^{n}}=|x|\\cdot\\dfrac{n+2}{n+1}' + Q + '\\dfrac{n+2}{n+1}=1+\\dfrac{1}{n+1}\\text{, con límite }1+0=1' + Q + 'L=|x|\\cdot 1=|x|' + Q + '|x|<1\\text{: converge.}\\qquad|x|>1\\text{: diverge.}' + Q + '\\text{Extremos }x=1\\text{ y }x=-1\\text{: el tamaño es }n+1\\text{,}' + Q + '\\text{que no tiende a }0\\text{: la serie diverge}' + Q + '\\text{(criterio del enésimo término).}' + Q + '\\text{Converge solo si }-1<x<1.' + Q + '\\text{Converger no prueba que la suma sea }f(x).' + Q + '\\text{Aquí sí lo es: recuadro «Dos caminos».}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: f(x) = (1 + x)^k con k de 0 a 4; se elige además hasta qué grado N se suma. Coeficientes en barras; función y suma en x = 1/2, con toda la cuenta; casos límite: k = 0 (constante) y N ≥ k (la serie terminó: diferencia 0) */
OA.scene('mac-vivo', (function(){
  var Q = '\\\\&\\qquad ', KM = 4, XA = -2.1, XB = 0.8, YA = -1, YB = 5.5, DER = ['f', 'f\'', 'f\'\'', 'f\'\'\'', 'f^{(4)}', 'f^{(5)}'];
  function gx(x){ return 3.35 + 1.85*x; } function gy(y){ return 3.75 + 0.6*y; }
  function kk(v){ return Math.max(0, Math.min(KM, Math.round(v.k == null ? 3 : v.k))); }
  function nn(v){ return Math.max(0, Math.min(KM, Math.round(v.gr == null ? 1 : v.gr))); }
  /* a(k, j) = k(k − 1)…(k − j + 1): el valor de la derivada j-ésima en 0 */
  function caida(k, j){ var r = 1, i; for (i = 0; i < j; i++) r *= (k - i); return r; }
  function mono(cf, n, pri){ var s = n === 0 ? '' + cf : (cf === 1 ? '' : cf) + 'x' + (n > 1 ? '^{' + n + '}' : ''); return (pri ? '' : '+') + s; }
  function monoP(cf, n, pri){ var sup = ['', '', '²', '³', '⁴'], s = n === 0 ? '' + cf : (cf === 1 ? '' : cf) + 'x' + sup[n]; return (pri ? '' : ' + ') + s; }
  function poli(k, m){ var s = '', n; for (n = 0; n <= m; n++) s += mono(mc31Bin(k, n), n, n === 0); return s; }
  function poliP(k, m){ var s = '', n; for (n = 0; n <= m; n++) s += monoP(mc31Bin(k, n), n, n === 0); return s; }
  function dato(k, N){ var m = Math.min(N, k), o = {k:k, N:N, m:m, c:[], d:[]}, n, q = 1, p = 0;
    for (n = 0; n <= KM; n++){ o.d[n] = caida(k, n); o.c[n] = mc31Bin(k, n); }
    for (n = 0; n < m; n++) q *= 2; o.qP = q; for (n = 0; n <= m; n++) p += o.c[n]*(q/Math.pow(2, n)); o.pP = p; /* suma en x = 1/2, como pP/qP */
    o.qF = Math.pow(2, k); o.pF = Math.pow(3, k); o.pD = o.pF - o.pP*(o.qF/o.qP); /* diferencia, como pD/qF */
    return o; }
  var DAT = [], kI, nI; for (kI = 0; kI <= KM; kI++){ DAT[kI] = []; for (nI = 0; nI <= KM; nI++) DAT[kI][nI] = dato(kI, nI); }
  var PZ = [['K0', 'c_{0}', 'c₀', ''], ['K1', 'c_{1}', 'c₁', ''], ['K2', 'c_{2}', 'c₂', ''], ['K3', 'c_{3}', 'c₃', ''], ['K4', 'c_{4}', 'c₄', '']];
  for (kI = 0; kI <= KM; kI++){ PZ.push(['A' + kI, '\\text{función: }f(x)=(1+x)^{' + kI + '}' + (kI === 0 ? '=1' : ''), 'función: f(x) = (1 + x)' + ['⁰ = 1', '¹', '²', '³', '⁴'][kI], 'c-tan']);
    for (nI = 0; nI <= kI; nI++) PZ.push(['B' + kI + nI, '\\text{suma: }' + poli(kI, nI), 'suma: ' + poliP(kI, nI), 'c-sec']); }
  function derTex(k, j){ /* derivada j-ésima de (1 + x)^k, con su cuenta */
    var e = k - j, a = caida(k, j), ap = caida(k, j - 1), base = e === 0 ? '' : e === 1 ? '(1+x)' : '(1+x)^{' + e + '}';
    if (j > k) return DER[j] + '(x)=0\\quad\\text{(derivada de la constante }' + caida(k, k) + ')';
    if (j === 1) return 'f\'(x)=' + k + '\\cdot(1+x)^{' + e + '}\\cdot(1+x)\'' + Q + '\\phantom{f\'(x)}=' + k + '\\cdot(1+x)^{' + e + '}\\cdot 1=' + (e === 0 ? '' + a : a + base);
    return DER[j] + '(x)=' + ap + '\\cdot ' + (e + 1) + '\\cdot(1+x)^{' + e + '}\\cdot 1=' + a + base; }
  function lectura(k, N){ var o = DAT[k][N], m = o.m, R = [], l, n, falt;
    R.push('\\text{Datos: }f(x)=(1+x)^{' + k + '}' + (k === 0 ? '=1\\text{ (constante)}' : '') + Q + '\\text{Se suma la serie hasta el grado }N=' + N + '.' + Q + '\\text{Fórmula: }c_{n}=\\dfrac{f^{(n)}(0)}{n!}');
    if (k === 0) l = '\\text{Derivadas: la derivada de una constante es }0\\text{:}' + Q + 'f\'(x)=0\\text{, y todas las siguientes valen }0.';
    else { l = '\\text{Derivadas (regla de la potencia y regla de la}' + Q + '\\text{cadena, citadas; }(1+x)\'=1\\text{):}'; for (n = 1; n <= k + 1; n++) l += Q + derTex(k, n); l += Q + '\\text{Las derivadas siguientes también valen }0.'; }
    R.push(l);
    l = '\\text{En }x=0\\text{: }1+0=1\\text{, y }1\\text{ elevado a cualquier}' + Q + '\\text{exponente es }1\\text{. Valores:}' + Q + 'f(0)=1';
    for (n = 1; n <= KM; n++) l += (n % 2 ? ',\\quad ' : Q) + DER[n] + '(0)=' + (n <= k && k - n > 0 ? o.d[n] + '\\cdot 1=' : '') + o.d[n];
    R.push(l);
    l = '\\text{Coeficientes, }c_{n}=\\dfrac{f^{(n)}(0)}{n!}\\text{:}';
    for (n = 0; n <= KM; n++) l += Q + 'c_{' + n + '}=\\dfrac{' + o.d[n] + '}{' + n + '!}=\\dfrac{' + o.d[n] + '}{' + mc31Fac(n) + '}=' + o.c[n] + (n === 0 ? '\\qquad(0!=1)' : n === 3 ? '\\qquad(3!=3\\cdot 2\\cdot 1=6)' : n === 4 ? '\\qquad(4!=4\\cdot 6=24)' : n === 2 ? '\\qquad(2!=2\\cdot 1=2)' : '');
    R.push(l);
    R.push('\\text{Serie de Maclaurin:}' + Q + '\\displaystyle\\sum_{n=0}^{\\infty}c_{n}x^{n}' + Q + '=' + poli(k, k) + '+0+0+\\cdots' + Q + '\\text{Desde }n=' + (k + 1) + '\\text{ todos los coeficientes son }0\\text{:}' + Q + '\\text{la serie termina en el grado }' + k + '.');
    l = '\\text{Suma hasta el grado }N=' + N + '\\text{:}' + Q + 'P_{' + N + '}(x)=' + poli(k, m) + (N > k ? Q + '\\text{(los términos de grado mayor que }' + k + '\\text{ valen }0)' : '') + Q + '\\text{Se prueba en }x=\\dfrac{1}{2}\\text{.}';
    if (m >= 2){ l += '\\text{ Potencias:}'; for (n = 2; n <= m; n++) l += Q + '\\left(\\dfrac{1}{2}\\right)^{' + n + '}=' + (n === 2 ? '\\dfrac{1}{2}\\cdot\\dfrac{1}{2}' : '\\dfrac{1}{' + Math.pow(2, n - 1) + '}\\cdot\\dfrac{1}{2}') + '=\\dfrac{1}{' + Math.pow(2, n) + '}'; }
    if (m >= 1){ l += Q + '\\text{Cada término:}'; for (n = 1; n <= m; n++) l += Q + mono(o.c[n], n, 1) + '=' + o.c[n] + '\\cdot\\dfrac{1}{' + Math.pow(2, n) + '}=' + mc31Tx(o.c[n], Math.pow(2, n)); }
    if (m === 0) l += Q + 'P_{' + N + '}\\!\\left(\\tfrac{1}{2}\\right)=1';
    else { l += Q + '\\text{Con denominador común }' + o.qP + '\\text{:}' + Q + 'P_{' + N + '}\\!\\left(\\tfrac{1}{2}\\right)='; for (n = 0; n <= m; n++) l += (n ? '+' : '') + '\\dfrac{' + (o.c[n]*o.qP/Math.pow(2, n)) + '}{' + o.qP + '}'; l += (m >= 3 ? Q + '\\phantom{P_{' + N + '}\\!\\left(\\tfrac{1}{2}\\right)}' : '') + '=\\dfrac{' + o.pP + '}{' + o.qP + '}' + (mc31Mcd(o.pP, o.qP) > 1 ? '=' + mc31Tx(o.pP, o.qP) : '') + (o.pP % o.qP ? '=' + mc31Dc(o.pP, o.qP, 1) : ''); }
    R.push(l);
    if (k === 0) R.push('\\text{Función en }x=\\dfrac{1}{2}\\text{: es constante,}' + Q + 'f\\!\\left(\\tfrac{1}{2}\\right)=1');
    else R.push('\\text{Función en }x=\\dfrac{1}{2}\\text{:}\\quad 1+\\dfrac{1}{2}=\\dfrac{3}{2}' + Q + 'f\\!\\left(\\tfrac{1}{2}\\right)=\\left(\\dfrac{3}{2}\\right)^{' + k + '}' + (k > 1 ? '=\\dfrac{3^{' + k + '}}{2^{' + k + '}}' : '') + '=\\dfrac{' + o.pF + '}{' + o.qF + '}=' + mc31Dc(o.pF, o.qF, 1));
    l = '\\text{Diferencia entre la función y la suma:}' + Q + mc31Tx(o.pF, o.qF) + '-' + mc31Tx(o.pP, o.qP);
    if (o.qP/mc31Mcd(o.pP, o.qP) !== o.qF) l += '=\\dfrac{' + o.pF + '}{' + o.qF + '}-\\dfrac{' + (o.pP*o.qF/o.qP) + '}{' + o.qF + '}';
    l += '=' + mc31Tx(o.pD, o.qF) + (o.pD % o.qF ? '=' + mc31Dc(o.pD, o.qF, 1) : '');
    R.push(l);
    if (k === 0) R.push('\\text{Caso límite }k=0\\text{: la función es la constante }1.' + Q + '\\text{Todas sus derivadas valen }0\\text{ y su serie de}' + Q + '\\text{Maclaurin tiene un solo término: }1.' + Q + '\\text{Con cualquier }N\\text{, la suma es la función.}');
    else if (N < k){ falt = ''; for (n = N + 1; n <= k; n++) falt += mono(o.c[n], n, n === N + 1); l = '\\text{Como }N=' + N + '\\text{ es menor que }k=' + k + '\\text{, faltan}' + Q + '\\text{términos. La diferencia}' + Q + '\\text{es lo que falta sumar: }' + falt + Q + '\\text{En }x=\\tfrac{1}{2}\\text{, con denominador }' + o.qF + '\\text{:}' + Q;
      for (n = N + 1; n <= k; n++) l += (n > N + 1 ? '+' : '') + '\\dfrac{' + (o.c[n]*o.qF/Math.pow(2, n)) + '}{' + o.qF + '}'; if (k - N > 1) l += '=\\dfrac{' + o.pD + '}{' + o.qF + '}'; if (mc31Mcd(o.pD, o.qF) > 1) l += '=' + mc31Tx(o.pD, o.qF); R.push(l + Q + '\\text{Con un grado más, la diferencia baja.}'); }
    else R.push('\\text{Como }N=' + N + (N === k ? '\\text{ es igual a }k=' : '\\text{ es mayor que }k=') + k + '\\text{, ya se}' + Q + '\\text{sumaron todos los términos que no valen }0\\text{:}' + Q + '\\text{la diferencia es }0.' + Q + '\\text{La serie terminó y su suma es exactamente la}' + Q + '\\text{función, para todo }x\\text{ (ejemplo 3).}');
    return R; }
  var SEQ = [[0, 2], [1, 0], [1, 1], [2, 1], [2, 2], [3, 1], [3, 2], [3, 3], [4, 3], [4, 4]];
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.3, y1:9.5}, aspect:9.8/6.6, _dat:DAT,
    aria:'Arriba, una franja dice qué muestra: la serie de Maclaurin de un polinomio termina y, desde ahí, suma y función coinciden. Una gráfica con x en horizontal, de menos 2,1 a 0,8, y los valores en vertical, de menos 1 a 5,5. En burdeo, la curva de 1 más x elevado a k, con k entre 0 y 4 elegido con un deslizador. En azul, la suma de la serie de Maclaurin hasta el grado N, elegido con otro deslizador entre 0 y 4. Una línea vertical punteada marca x igual a 0,5, con un punto sobre cada curva y un trazo naranja entre los dos, que es la diferencia. Debajo, cinco barras muestran los coeficientes c sub 0 a c sub 4, que son los números de la fila k del triángulo de Pascal seguidos de ceros; las barras de los términos ya sumados van en azul. Con k igual a 3 y N igual a 1: función 3,375, suma 2,5, diferencia 0,875. Cuando N es mayor o igual que k, la curva azul queda encima de la burdeo y la diferencia es 0: la serie terminó. Con k igual a 0 la función es la constante 1 y su serie tiene un solo término. Bajo el dibujo, la cuenta completa.',
    labels:PZ,
    sliders:[{id:'k', tex:'k', min:0, max:KM, step:1, value:3}, {id:'gr', tex:'N', min:0, max:KM, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=(1+x)^{k}\\)</span><span><i class="sw sec"></i> la suma de la serie hasta el grado \\(N\\), y las barras de los coeficientes ya sumados</span><span><i class="sw rise"></i> diferencia entre la función y la suma en \\(x=0{,}5\\)</span><span>barras grises: coeficientes que todavía no se suman</span>',
    anim:{run:30000, hold:4000, still:1, apply:function(p, v){ var j = Math.min(SEQ.length - 1, Math.floor(p*SEQ.length)); v.q = p; v.k = SEQ[j][0]; v.gr = SEQ[j][1]; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = kk(v), N = nn(v), o = DAT[k][N], m = o.m, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), gm = C.muted || '#6b6b6b', bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), px = X(gx(0.5)), vf = o.pF/o.qF, vp = o.pP/o.qP, yf = Y(gy(vf)), yp = Y(gy(vp)), n, cx, bw, bh, y0, ta, tb, la, lb, ig = o.pD === 0;
      function fn(x){ return Math.pow(1 + x, k); }
      function pn(x){ var r = 0, j; for (j = m; j >= 0; j--) r = r*x + o.c[j]; return r; }
      function txt(t, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || gm; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function punto(py, col){ c.beginPath(); c.arc(px, py, 3.4, 0, 6.2832); c.fillStyle = col; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1; c.setLineDash([]); c.stroke(); }
      function rot(t, py, col){ var w; c.font = '700 11px ' + F; w = c.measureText(t).width; c.fillStyle = 'rgba(255,255,255,0.9)'; c.fillRect(px - 9 - w - 3, py - 8, w + 6, 16); c.fillStyle = col; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText(t, px - 9, py); }
      la = yf; lb = yp; if (!ig && lb - la < 17){ la = (yf + yp)/2 - 8.5; lb = la + 17; } /* alturas de los rótulos de los dos valores; los números del eje que quedarían debajo no se escriben */
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-2, '−2'], [-1, '−1'], [0.5, '0,5']].forEach(function(e){ c.beginPath(); c.moveTo(X(gx(e[0])), Y(gy(0)) - 3); c.lineTo(X(gx(e[0])), Y(gy(0)) + 3); c.stroke(); num(e[1], X(gx(e[0])), Y(gy(0)) + 11, 'center', e[0] === 0.5 ? C.ink : gm); });
      [1, 2, 3, 4, 5].forEach(function(e){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(e))); c.lineTo(X(gx(0)) + 3, Y(gy(e))); c.stroke(); if (Math.abs(Y(gy(e)) - la) > 13 && Math.abs(Y(gy(e)) - lb) > 13) num('' + e, X(gx(0)) - 7, Y(gy(e)), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* curvas, recortadas al cuadro: la suma (azul) y la función (burdeo); si coinciden, la azul va punteada encima */
      c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip();
      if (!ig) mc31Curva(S, gx, gy, pn, XA, XB, C.sec, 1.6);
      mc31Curva(S, gx, gy, fn, XA, XB, C.tan, 2.2);
      if (ig) mc31Curva(S, gx, gy, pn, XA, XB, C.sec, 1.6, [5, 5]);
      c.restore();
      /* el punto de prueba: línea vertical, diferencia y puntos */
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, by0); c.lineTo(px, by1); c.stroke(); c.setLineDash([]);
      c.font = '700 10.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('se prueba aquí', bx1 + 14, by0 - 7);
      if (!ig){ c.strokeStyle = C.rise; c.lineWidth = 3.2; c.beginPath(); c.moveTo(px, yf); c.lineTo(px, yp); c.stroke(); }
      punto(yp, C.sec); punto(yf, C.tan);
      ta = 'función: ' + mc31Dc(o.pF, o.qF); tb = 'suma: ' + mc31Dc(o.pP, o.qP);
      if (ig) rot('función = suma: ' + mc31Dc(o.pF, o.qF), yf, C.ink);
      else { rot(ta, la, C.tan); rot(tb, lb, C.sec); }
      /* los coeficientes, en barras */
      y0 = Y(1.42); bw = 0.62*s; c.font = '600 11.5px ' + F; c.fillStyle = gm; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('Coeficientes de la serie (en azul, los ya sumados):', X(-1.2), Y(2.98));
      c.strokeStyle = gm; c.lineWidth = 1; c.beginPath(); c.moveTo(X(-0.75), y0); c.lineTo(X(5.05), y0); c.stroke();
      for (n = 0; n <= KM; n++){ cx = X(-0.15 + 1.15*n); bh = o.c[n]*0.17*s; c.fillStyle = n <= N ? C.sec : 'rgba(0,0,0,0.16)'; if (bh > 0) c.fillRect(cx - bw/2, y0 - bh, bw, bh);
        c.font = '700 11.5px ' + F; c.fillStyle = n <= N ? C.sec : gm; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + o.c[n], cx, y0 - bh - 9);
        T.L('K' + n, -0.15 + 1.15*n, 1.42, -50, 0, 12); }
      T.L('A' + k, -1.2, 8.14, 0); T.L('B' + k + m, -1.2, 7.62, 0);
      txt('diferencia donde se prueba: ' + mc31Dc(o.pD, o.qF), 0.5, C.rise);
      txt(k === 0 ? 'caso límite: función constante, un solo término' : ig ? 'la serie terminó: la suma es la función' : 'faltan términos: la suma aún no es la función', 0.5 - 21/s, C.ink);
      dtQue(S, 'la serie de Maclaurin de un polinomio', 'termina: desde ahí, suma y función coinciden.');
      T.fin();
    },
    caption:function(v){ var k = kk(v), N = nn(v), o = DAT[k][N]; return 'k = ' + k + ', suma hasta el grado ' + N + '. Coeficientes: ' + o.c.join(', ') + '. En x = 0,5: función ' + mc31Dc(o.pF, o.qF) + ', suma ' + mc31Dc(o.pP, o.qP) + ', diferencia ' + mc31Dc(o.pD, o.qF) + '. ' + (k === 0 ? 'Caso límite: la función es constante y su serie tiene un solo término.' : o.pD === 0 ? 'La serie terminó: la suma es exactamente la función.' : 'Faltan términos: la suma todavía no es la función.'); },
    readout:function(v){ return dtPasos(lectura(kk(v), nn(v))); }
  };
})());
