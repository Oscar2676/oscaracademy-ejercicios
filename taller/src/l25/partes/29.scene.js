/* L25 H29 · representación de funciones como series de potencias: de 1/(1 + x) = Σ(−1)ⁿxⁿ, integrando término a término, a ln(1 + x); dentro de (−1, 1) las sumas parciales se pegan a la curva y fuera se despegan */
function rp29Cl(t){ return Math.max(0, Math.min(1, t)); }
function rp29Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q (q > 0) simplificada */
function rp29F(p, q){ var g = rp29Mcd(p, q); return [p/g, q/g]; }
/* fracción en TeX, con el signo delante; t = 1 para tamaño chico */
function rp29Tx(f, t){ var s = f[0] < 0 ? '-' : '', p = Math.abs(f[0]); return f[1] === 1 ? s + p : s + '\\' + (t ? 't' : 'd') + 'frac{' + p + '}{' + f[1] + '}'; }
function rp29Pl(f){ return (f[0] < 0 ? '−' : '') + Math.abs(f[0]) + (f[1] === 1 ? '' : '/' + f[1]); }
/* paréntesis si es negativo */
function rp29Pa(s){ return s.charAt(0) === '-' ? '\\left(' + s + '\\right)' : s; }
/* p/q redondeado a 4 decimales, en diezmilésimos enteros (mitad hacia arriba en el tamaño) */
function rp29R4(p, q){ var n = Math.floor((20000*Math.abs(p) + q)/(2*q)); return p < 0 ? -n : n; }
/* diezmilésimos enteros escritos con coma y 4 decimales */
function rp29D4(n, tex){ var a = Math.abs(n), d = ('0000' + (a % 10000)).slice(-4); return (n < 0 ? (tex ? '-' : '−') : '') + Math.floor(a/10000) + (tex ? '{,}' : ',') + d; }
/* suma parcial de n términos de x − x²/2 + x³/3 − … */
function rp29S(n, x){ var s = 0, p = 1, i; for (i = 1; i <= n; i++){ p *= x; s += (i % 2 ? p : -p)/i; } return s; }
function rp29Curva(S, gx, gy, f, a, b, col, wd, dash){ var c = S.ctx, i, n = 160, t; if (b <= a) return; c.strokeStyle = col; c.lineWidth = wd; c.setLineDash(dash || []); c.beginPath(); for (i = 0; i <= n; i++){ t = a + (b - a)*i/n; if (i) c.lineTo(S.X(gx(t)), S.Y(gy(f(t)))); else c.moveTo(S.X(gx(t)), S.Y(gy(f(t)))); } c.stroke(); c.setLineDash([]); }
function rp29Ln(x){ return Math.log(1 + x); }
OA.scene('rep-idea', (function(){
  var N = 6, XA = -1.25, XB = 1.55, YA = -2, YB = 1.5, Q = '\\\\&\\qquad ';
  function gx(x){ return 1.7 + 2.2*x; } function gy(y){ return 4.5 + 1.75*y; }
  var PZ = [['IV', '-1<x<1', '−1 < x < 1', ''], ['CF', 'y=\\ln(1+x)', 'y = ln(1 + x)', 'c-tan'],
    ['C0', '\\ln 1=0\\ \\Rightarrow\\ C=0', 'ln 1 = 0 ⟹ C = 0', 'pt'],
    ['L1', 'S_{1}', 'S₁', 'c-sec'], ['L2', 'S_{2}', 'S₂', 'c-alt'], ['L3', 'S_{3}', 'S₃', 'diff'], ['L8', 'S_{8}', 'S₈', 'pt'],
    ['Q', '\\text{¿Qué serie de potencias representa a }\\ln(1+x)\\text{?}', '¿Qué serie de potencias representa a ln(1 + x)?', 'pt'],
    ['F', '\\Longrightarrow\\ \\textstyle\\sum_{n=1}^{\\infty}(-1)^{n+1}\\tfrac{x^{n}}{n}\\text{, solo si }-1<x<1', '⟹ Σ (−1)ⁿ⁺¹ xⁿ/n, solo si −1 < x < 1', 'diff'],
    ['R1', '\\big(\\ln(1+x)\\big)\'=\\tfrac{1}{1+x}\\quad(x>-1)', '(ln(1 + x))′ = 1/(1 + x) (x > −1)', ''],
    ['R2', '\\tfrac{1}{1+x}=1-x+x^{2}-x^{3}+\\cdots\\quad(|x|<1)', '1/(1 + x) = 1 − x + x² − x³ + ⋯ (|x| < 1)', ''],
    ['R3', '\\ln(1+x)=C+x-\\tfrac{x^{2}}{2}+\\tfrac{x^{3}}{3}-\\tfrac{x^{4}}{4}+\\cdots', 'ln(1 + x) = C + x − x²/2 + x³/3 − x⁴/4 + ⋯', ''],
    ['R4', 'x=0\\text{:}\\quad\\ln 1=C+0\\ \\Longrightarrow\\ C=0', 'x = 0: ln 1 = C + 0 ⟹ C = 0', ''],
    ['R5', 'S_{1}=x,\\ \\ S_{2}=x-\\tfrac{x^{2}}{2},\\ \\ S_{3}=x-\\tfrac{x^{2}}{2}+\\tfrac{x^{3}}{3}', 'S₁ = x, S₂ = x − x²/2, S₃ = x − x²/2 + x³/3', ''],
    ['R6', '\\ln(1+x)=\\textstyle\\sum_{n=1}^{\\infty}(-1)^{n+1}\\tfrac{x^{n}}{n}\\quad(-1<x<1)', 'ln(1 + x) = Σ (−1)ⁿ⁺¹ xⁿ/n (−1 < x < 1)', 'diff']];
  var TXT = [['La curva burdeo es la función. Se parte de', 'su derivada, que es una función conocida.'],
    ['Esa derivada es la suma de una serie', 'geométrica, pero solo en la franja gris.'],
    ['Se integra cada término: aparece una constante.', 'Se marca el centro, donde se va a fijar.'],
    ['En el centro todos los términos valen 0 y la', 'función también: la constante vale 0.'],
    ['Sumas parciales de uno, dos y tres términos:', 'en la franja, cada una más cerca de la curva.'],
    ['Con ocho términos: pegada a la curva dentro', 'de la franja; fuera de ella se despega.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.9, y1:9.6}, aspect:14.5/6.6,
    aria:'Arriba, una franja dice qué muestra: una serie conocida, integrada término a término, da la serie del logaritmo. Animación en seis pasos sobre una gráfica con x en horizontal, de menos 1,25 a 1,55, y los valores en vertical, de menos 2 a 1,5. Uno: se traza en burdeo la curva del logaritmo natural de 1 más x, que pasa por el origen, baja sin tope al acercarse a x igual a menos 1 y sube lentamente hacia la derecha. Dos: se sombrea en gris la franja vertical entre x igual a menos 1 y x igual a 1, con los extremos marcados con anillos abiertos; es donde vale la serie geométrica de 1 dividido por 1 más x. Tres: se marca el centro, x igual a 0, con un anillo en el origen. Cuatro: el anillo se rellena y se escribe que el logaritmo de 1 es 0, así que la constante de integración vale 0. Cinco: aparecen tres sumas parciales: la recta azul x; la parábola verde x menos x al cuadrado sobre 2; y la cúbica naranja, que agrega x al cubo sobre 3. Dentro de la franja, cada una queda más cerca de la curva burdeo que la anterior. Seis: una línea negra fina, la suma parcial de ocho términos, queda pegada a la curva dentro de la franja y, a la derecha de x igual a 1, se separa bruscamente hacia abajo. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, la serie de menos 1 elevado a n más 1 por x elevado a n dividido por n, solo si x está entre menos 1 y 1, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\ln(1+x)\\)</span><span>franja gris: el intervalo \\(-1&lt;x&lt;1\\), sin los extremos</span><span><i class="sw sec"></i> \\(S_{1}=x\\)</span><span><i class="sw alt"></i> \\(S_{2}=x-\\tfrac{x^{2}}{2}\\)</span><span><i class="sw rise"></i> \\(S_{3}=x-\\tfrac{x^{2}}{2}+\\tfrac{x^{3}}{3}\\)</span><span>línea negra fina: \\(S_{8}\\), la suma parcial de ocho términos</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), w, w1, w2, w3, bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA));
      function txt(t, x, y, al, cc, an){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = an || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function caja(){ c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip(); }
      function anillo(x, y, col, lleno){ c.beginPath(); c.arc(X(gx(x)), Y(gy(y)), 4, 0, 6.2832); c.fillStyle = lleno ? col : '#fff'; c.fill(); c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.stroke(); }
      /* paso 2: la franja donde vale la serie geométrica, debajo de todo */
      if (k >= 2){ w = k === 2 ? u : 1; c.globalAlpha = 0.08*w; c.fillStyle = C.ink; c.fillRect(X(gx(-1)), by0, (X(gx(1)) - X(gx(-1)))*w, by1 - by0); c.globalAlpha = 0.55*w; c.strokeStyle = C.muted || '#6b6b6b'; c.lineWidth = 1; c.setLineDash([4, 3]);
        [-1, 1].forEach(function(x){ if (x === 1 && w < 0.98) return; c.beginPath(); c.moveTo(X(gx(x)), by0); c.lineTo(X(gx(x)), by1); c.stroke(); }); c.setLineDash([]); c.globalAlpha = 1;
        if (w > 0.6) L('IV', gx(-0.5), gy(1.27), -50); }
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1, '−1'], [-0.5, '−0,5'], [0.5, '0,5'], [1, '1'], [1.5, '1,5']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[-2, '−2'], [-1, '−1'], [1, '1']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) + 7, Y(gy(m[0])), 'left'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* paso 6: la suma parcial de ocho términos, fina */
      if (k >= 6){ caja(); rp29Curva(S, gx, gy, function(t){ return rp29S(8, t); }, XA, XA + (XB - XA)*u, C.ink, 1.1); c.restore();
        if (u > 0.9){ L('L8', gx(1.37), gy(-0.9), -100); txt('fuera:', gx(1.04), gy(-1.52), 1, C.ink, 'left'); txt('se despega', gx(1.04), gy(-1.75), 1, C.ink, 'left'); } }
      /* paso 5: sumas parciales de uno, dos y tres términos, una tras otra */
      if (k >= 5){ w = k === 5 ? u : 1; w1 = rp29Cl(3*w); w2 = rp29Cl(3*w - 1); w3 = rp29Cl(3*w - 2); caja();
        rp29Curva(S, gx, gy, function(t){ return rp29S(1, t); }, XA, XA + (XB - XA)*w1, C.sec, 1.5);
        rp29Curva(S, gx, gy, function(t){ return rp29S(2, t); }, XA, XA + (XB - XA)*w2, C.alt, 1.5);
        rp29Curva(S, gx, gy, function(t){ return rp29S(3, t); }, XA, XA + (XB - XA)*w3, C.rise, 1.5); c.restore();
        if (w1 > 0.95) L('L1', gx(1.1), gy(1.3), -100); if (w2 > 0.95) L('L2', gx(0.86), gy(0.2), -50); if (w3 > 0.97) L('L3', gx(1.37), gy(1.08), 0); }
      /* paso 1: la curva de la función */
      w = k === 1 ? u : 1; caja(); rp29Curva(S, gx, gy, rp29Ln, -0.9, -0.9 + (XB + 0.9)*w, C.tan, 2.2); c.restore(); if (w > 0.5) L('CF', gx(-0.72), gy(-1.6), 0);
      /* paso 2: extremos abiertos del intervalo */
      if (k >= 2){ anillo(-1, 0, C.muted || '#6b6b6b', 0); if (k > 2 || u > 0.98) anillo(1, 0, C.muted || '#6b6b6b', 0); }
      /* pasos 3 y 4: el centro; ahí se fija la constante */
      if (k >= 3){ w = k === 3 ? u : 1; c.globalAlpha = w; anillo(0, 0, C.tan, k > 4 || (k === 4 && u > 0.4)); num('centro', X(gx(0)) + 7, Y(gy(0)) + 11, 'left', C.tan); c.globalAlpha = 1; }
      if (k >= 4 && (k > 4 || u > 0.4)){ L('C0', gx(-0.56), gy(0.62), -50); c.strokeStyle = C.tan; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(-0.3)), Y(gy(0.5))); c.lineTo(X(gx(-0.04)), Y(gy(0.07))); c.stroke(); c.setLineDash([]); }
      if (k >= 6 && u > 0.9) txt('dentro: se pega', gx(0.14), gy(-1.52), 1, C.ink, 'left');
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.05); txt(TXT[k - 1][1], -1.2, 0.05 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'una serie conocida, integrada término', 'a término, da la serie del logaritmo.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126, 156]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Función: }f(x)=\\ln(1+x)\\text{, definida si }x>-1.' + Q + '\\text{Derivada (regla de la cadena, citada):}' + Q + 'f\'(x)=\\dfrac{1}{1+x}\\cdot(1+x)\'' + Q + '\\phantom{f\'(x)}=\\dfrac{1}{1+x}\\cdot 1=\\dfrac{1}{1+x}',
      '\\text{Serie geométrica: }\\displaystyle\\sum_{n=0}^{\\infty}r^{\\,n}=\\dfrac{1}{1-r}\\text{ si }|r|<1.' + Q + '\\text{Con }r=-x\\text{: }|r|=|-x|=|x|\\text{, así que }|x|<1.' + Q + '\\dfrac{1}{1-r}=\\dfrac{1}{1-(-x)}=\\dfrac{1}{1+x}' + Q + 'r^{\\,n}=(-x)^{n}=(-1)^{n}x^{n}' + Q + '\\dfrac{1}{1+x}=\\displaystyle\\sum_{n=0}^{\\infty}(-1)^{n}x^{n}' + Q + '\\phantom{\\dfrac{1}{1+x}}=1-x+x^{2}-x^{3}+\\cdots',
      '\\text{Integración término a término (teorema}' + Q + '\\text{enunciado, sin demostrar): vale si }|x|<1.' + Q + '\\text{Cada término: }\\displaystyle\\int x^{n}\\,dx=\\dfrac{x^{n+1}}{n+1}' + Q + '\\displaystyle\\int 1\\,dx=x,\\ \\ \\int x\\,dx=\\dfrac{x^{2}}{2},\\ \\ \\int x^{2}\\,dx=\\dfrac{x^{3}}{3}' + Q + '\\text{Por el paso 1, }\\ln(1+x)\\text{ es una primitiva:}' + Q + '\\ln(1+x)=C+x-\\dfrac{x^{2}}{2}+\\dfrac{x^{3}}{3}-\\cdots',
      '\\text{La constante se fija en el centro, }x=0\\text{:}' + Q + '\\text{función: }\\ln(1+0)=\\ln 1=0' + Q + '\\text{serie: }C+0-\\dfrac{0^{2}}{2}+\\dfrac{0^{3}}{3}-\\cdots=C' + Q + '\\text{Igualando: }C=0',
      '\\text{Sumas parciales (se corta la serie):}' + Q + 'S_{1}=x,\\qquad S_{2}=x-\\dfrac{x^{2}}{2}' + Q + 'S_{3}=x-\\dfrac{x^{2}}{2}+\\dfrac{x^{3}}{3}' + Q + '\\text{Prueba con }x=\\dfrac{1}{2}\\text{: }\\ x^{2}=\\dfrac{1}{4},\\ \\ x^{3}=\\dfrac{1}{8}' + Q + '\\dfrac{x^{2}}{2}=\\dfrac{1}{4}:2=\\dfrac{1}{8},\\qquad\\dfrac{x^{3}}{3}=\\dfrac{1}{8}:3=\\dfrac{1}{24}' + Q + 'S_{1}=\\dfrac{1}{2}=0{,}5' + Q + 'S_{2}=\\dfrac{1}{2}-\\dfrac{1}{8}=\\dfrac{4}{8}-\\dfrac{1}{8}=\\dfrac{3}{8}=0{,}375' + Q + 'S_{3}=\\dfrac{3}{8}+\\dfrac{1}{24}=\\dfrac{9}{24}+\\dfrac{1}{24}=\\dfrac{10}{24}' + Q + '\\phantom{S_{3}}=\\dfrac{5}{12}\\approx 0{,}4167' + Q + '\\text{Con calculadora: }\\ln(1{,}5)\\approx 0{,}4055' + Q + '\\text{Distancias: }|0{,}4055-0{,}5|=0{,}0945' + Q + '|0{,}4055-0{,}375|=0{,}0305' + Q + '|0{,}4055-0{,}4167|=0{,}0112' + Q + '\\text{Cada distancia es menor que la anterior.}',
      '\\text{Término de lugar }n\\text{: }(-1)^{n+1}\\dfrac{x^{n}}{n}' + Q + 'n=1\\text{: }(-1)^{2}\\dfrac{x^{1}}{1}=x' + Q + 'n=2\\text{: }(-1)^{3}\\dfrac{x^{2}}{2}=-\\dfrac{x^{2}}{2}' + Q + '\\ln(1+x)=\\displaystyle\\sum_{n=1}^{\\infty}(-1)^{n+1}\\dfrac{x^{n}}{n}\\quad\\text{si }-1<x<1' + Q + '\\text{En ese intervalo la serie representa a la}' + Q + '\\text{función. Si }x>1\\text{, }\\ln(1+x)\\text{ existe, pero la}' + Q + '\\text{serie diverge: ahí no la representa.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: se elige x; función, suma parcial de 4 y de 8 términos y distancia, con toda la cuenta; casos límite: el centro (distancia 0) y un x fuera del intervalo (la serie no representa a la función) */
OA.scene('rep-vivo', (function(){
  var Q = '\\\\&\\qquad ', XS = [[-1, 2], [0, 1], [1, 2], [3, 4], [1, 1], [3, 2]], NP = XS.length, XA = -1.25, XB = 1.55, YA = -1.6, YB = 1.4;
  function gx(x){ return 1.7 + 2.2*x; } function gy(y){ return 4.35 + 1.6*y; }
  function cual(v){ return Math.max(1, Math.min(NP, Math.round(v.pos || 1))) - 1; }
  var NOTA = {d:'dentro de la franja: más términos, más cerca', c:'caso límite: en el centro coinciden exactamente', e:'extremo: no está en la franja; se revisa aparte', f:'fuera de la franja: más términos, más lejos'};
  var DAT = XS.map(function(f){ var p = f[0], q = f[1], o = {p:p, q:q, x:p/q, pw:[], tm:[], nu:[], e:[]}, k, P = 1, B = 1, D = 1, n = 0, t;
    for (k = 1; k <= 8; k++){ P *= p; B *= q; o.pw[k] = rp29F(P, B); o.tm[k] = rp29F(P, k*B); } /* x^k y x^k/k, exactos */
    for (k = 1; k <= 4; k++) D = D*o.tm[k][1]/rp29Mcd(D, o.tm[k][1]);
    for (k = 1; k <= 4; k++){ t = o.tm[k][0]*(D/o.tm[k][1]); o.nu[k] = t; n += k % 2 ? t : -t; }
    o.D = D; o.n4 = n; o.S4 = rp29F(n, D); o.s4 = rp29R4(n, D); o.s8 = o.s4;
    for (k = 5; k <= 8; k++){ o.e[k] = rp29R4(o.tm[k][0], o.tm[k][1]); o.s8 += k % 2 ? o.e[k] : -o.e[k]; }
    o.ln = Math.round(Math.log(1 + o.x)*10000); o.d4 = Math.abs(o.ln - o.s4); o.d8 = Math.abs(o.ln - o.s8);
    o.tipo = p === 0 ? 'c' : Math.abs(p) < q ? 'd' : Math.abs(p) === q ? 'e' : 'f'; o.u = ('' + (1 + o.x)).replace('.', '{,}');
    return o; });
  var PZ = [['CF', 'y=\\ln(1+x)', 'y = ln(1 + x)', 'c-tan'], ['C4', 'S_{4}', 'S₄', 'c-sec'], ['C8', 'S_{8}', 'S₈', 'c-alt'], ['IV', '-1<x<1', '−1 < x < 1', '']];
  DAT.forEach(function(o, j){ var xt = rp29Tx([o.p, o.q], 1), xp = rp29Pl([o.p, o.q]), ig = o.tipo === 'c';
    PZ.push(['A' + j, 'x=' + xt + (ig ? '\\text{: el centro del intervalo}' : o.tipo === 'd' ? '\\text{: dentro de }(-1,\\ 1)' : o.tipo === 'e' ? '\\text{: extremo; no está en }(-1,\\ 1)' : '\\text{: fuera de }(-1,\\ 1)'), 'x = ' + xp + (ig ? ': el centro del intervalo' : o.tipo === 'd' ? ': dentro de (−1, 1)' : o.tipo === 'e' ? ': extremo; no está en (−1, 1)' : ': fuera de (−1, 1)'), 'pt']);
    PZ.push(['B' + j, ig ? '\\text{función: }\\ln(1+x)=0' : '\\text{función: }\\ln(1+x)\\approx ' + rp29D4(o.ln, 1), ig ? 'función: ln(1 + x) = 0' : 'función: ln(1 + x) ≈ ' + rp29D4(o.ln), 'c-tan']);
    PZ.push(['D' + j, ig ? '\\text{sumas parciales: }S_{4}=0,\\quad S_{8}=0' : '\\text{sumas parciales: }S_{4}\\approx ' + rp29D4(o.s4, 1) + ',\\quad S_{8}\\approx ' + rp29D4(o.s8, 1), ig ? 'sumas parciales: S₄ = 0, S₈ = 0' : 'sumas parciales: S₄ ≈ ' + rp29D4(o.s4) + ', S₈ ≈ ' + rp29D4(o.s8), 'pt']); });
  function dist(a, b){ var i = a - b; return '|' + rp29D4(a, 1) + '-' + rp29Pa(rp29D4(b, 1)) + '|' + (i < 0 ? Q + '=|' + rp29D4(i, 1) + '|' : '') + '=' + rp29D4(Math.abs(i), 1); }
  function lectura(j){ var o = DAT[j], x = [o.p, o.q], xt = rp29Tx(x), R = [], k, l, ex;
    if (o.tipo === 'c') return [
      '\\text{Datos: }x=0\\text{ (el centro)},\\quad f(x)=\\ln(1+x)' + Q + 'S_{4}(x)=x-\\dfrac{x^{2}}{2}+\\dfrac{x^{3}}{3}-\\dfrac{x^{4}}{4}',
      '\\text{Potencias: }0^{2}=0,\\quad 0^{3}=0,\\quad 0^{4}=0' + Q + '\\text{y lo mismo }0^{5},\\ 0^{6},\\ 0^{7},\\ 0^{8}\\text{: todas valen }0.',
      'S_{4}=0-\\dfrac{0}{2}+\\dfrac{0}{3}-\\dfrac{0}{4}=0-0+0-0=0' + Q + 'S_{8}=S_{4}+\\dfrac{0}{5}-\\dfrac{0}{6}+\\dfrac{0}{7}-\\dfrac{0}{8}=0',
      '\\text{Función: }1+x=1+0=1' + Q + '\\ln(1)=0\\quad\\text{(exacto, porque }e^{0}=1)',
      '\\text{Distancia con 4 términos: }|0-0|=0' + Q + '\\text{Distancia con 8 términos: }|0-0|=0',
      '\\text{Caso límite: en el centro todos los términos}' + Q + '\\text{con }x\\text{ valen }0\\text{, y la suma coincide con la}' + Q + '\\text{función con cualquier número de términos.}' + Q + '\\text{Por eso la constante de integración se fija}' + Q + '\\text{evaluando en el centro.}'];
    R.push('\\text{Datos: }x=' + xt + ',\\quad f(x)=\\ln(1+x)' + Q + 'S_{4}(x)=\\displaystyle\\sum_{n=1}^{4}(-1)^{n+1}\\dfrac{x^{n}}{n}' + Q + '\\phantom{S_{4}(x)}=x-\\dfrac{x^{2}}{2}+\\dfrac{x^{3}}{3}-\\dfrac{x^{4}}{4}');
    l = '\\text{Potencias de }x\\text{:}';
    for (k = 2; k <= 4; k++) l += Q + 'x^{' + k + '}=' + (k === 2 ? 'x' : 'x^{' + (k - 1) + '}') + '\\cdot x=' + rp29Pa(rp29Tx(o.pw[k - 1])) + '\\cdot ' + rp29Pa(xt) + '=' + rp29Tx(o.pw[k]);
    R.push(l);
    l = '\\text{Cada potencia, dividida por su exponente:}';
    for (k = 2; k <= 4; k++){ ex = [o.pw[k][0], k*o.pw[k][1]]; l += Q + '\\dfrac{x^{' + k + '}}{' + k + '}=' + rp29Pa(rp29Tx(o.pw[k])) + ':' + k + '=' + rp29Tx(ex) + (ex[1] !== o.tm[k][1] ? '=' + rp29Tx(o.tm[k]) : ''); }
    R.push(l);
    l = '\\text{Se reemplaza en }S_{4}\\text{:}' + Q + 'S_{4}=' + xt + '-' + rp29Pa(rp29Tx(o.tm[2])) + '+' + rp29Pa(rp29Tx(o.tm[3])) + '-' + rp29Pa(rp29Tx(o.tm[4])) + Q + '\\text{Denominador común, }' + o.D + '\\text{:}';
    l += Q + rp29Tx(o.tm[1], 1) + '=\\tfrac{' + o.nu[1] + '}{' + o.D + '},\\qquad ' + rp29Tx(o.tm[2], 1) + '=\\tfrac{' + o.nu[2] + '}{' + o.D + '}' + Q + rp29Tx(o.tm[3], 1) + '=\\tfrac{' + o.nu[3] + '}{' + o.D + '},\\qquad ' + rp29Tx(o.tm[4], 1) + '=\\tfrac{' + o.nu[4] + '}{' + o.D + '}';
    l += Q + 'S_{4}=\\dfrac{' + o.nu[1] + '-' + rp29Pa('' + o.nu[2]) + '+' + rp29Pa('' + o.nu[3]) + '-' + rp29Pa('' + o.nu[4]) + '}{' + o.D + '}=\\dfrac{' + o.n4 + '}{' + o.D + '}' + (o.n4 < 0 || o.S4[1] !== o.D ? '=' + rp29Tx(o.S4) : '');
    l += Q + '\\text{División, con 4 decimales: }S_{4}\\approx ' + rp29D4(o.s4, 1);
    R.push(l);
    R.push('\\text{Función, con calculadora:}' + Q + '1+x=1+' + rp29Pa(xt) + '=' + o.u + Q + '\\ln(' + o.u + ')\\approx ' + rp29D4(o.ln, 1));
    R.push('\\text{Distancia entre la función y }S_{4}\\text{:}' + Q + dist(o.ln, o.s4));
    l = '\\text{Cuatro términos más, con 4 decimales:}';
    for (k = 5; k <= 8; k++){ ex = [o.pw[k][0], k*o.pw[k][1]]; l += Q + 'x^{' + k + '}=x^{' + (k - 1) + '}\\cdot x=' + rp29Pa(rp29Tx(o.pw[k - 1], 1)) + '\\cdot ' + rp29Pa(rp29Tx(x, 1)) + '=' + rp29Tx(o.pw[k], 1) + Q + '\\tfrac{x^{' + k + '}}{' + k + '}=' + rp29Pa(rp29Tx(o.pw[k], 1)) + ':' + k + '=' + rp29Tx(ex, 1) + (ex[1] !== o.tm[k][1] ? '=' + rp29Tx(o.tm[k], 1) : '') + ((10000*Math.abs(o.tm[k][0])) % o.tm[k][1] === 0 ? '=' : '\\approx ') + rp29D4(o.e[k], 1); }
    R.push(l);
    R.push('S_{8}=S_{4}+\\dfrac{x^{5}}{5}-\\dfrac{x^{6}}{6}+\\dfrac{x^{7}}{7}-\\dfrac{x^{8}}{8}' + Q + '\\approx ' + rp29D4(o.s4, 1) + '+' + rp29Pa(rp29D4(o.e[5], 1)) + '-' + rp29Pa(rp29D4(o.e[6], 1)) + Q + '\\qquad +' + rp29Pa(rp29D4(o.e[7], 1)) + '-' + rp29Pa(rp29D4(o.e[8], 1)) + Q + '=' + rp29D4(o.s8, 1));
    R.push('\\text{Distancia entre la función y }S_{8}\\text{:}' + Q + dist(o.ln, o.s8));
    if (o.tipo === 'd') R.push('|x|=' + rp29Tx([Math.abs(o.p), o.q]) + '<1\\text{: }x\\text{ está en }(-1,\\ 1).' + Q + '\\text{La distancia bajó de }' + rp29D4(o.d4, 1) + '\\text{ a }' + rp29D4(o.d8, 1) + '.' + Q + '\\text{Con más términos, la suma parcial queda más}' + Q + '\\text{cerca de }\\ln(1+x)\\text{. Es lo que asegura el}' + Q + '\\text{teorema: en este }x\\text{ la serie representa a la}' + Q + '\\text{función.}');
    else if (o.tipo === 'e') R.push('x=1\\text{ es un extremo: no está en }(-1,\\ 1).' + Q + '\\text{El teorema no dice nada sobre los extremos.}' + Q + '\\text{La distancia bajó de }' + rp29D4(o.d4, 1) + '\\text{ a }' + rp29D4(o.d8, 1) + '\\text{, lentamente.}' + Q + '\\text{Aquí la serie es }1-\\tfrac{1}{2}+\\tfrac{1}{3}-\\tfrac{1}{4}+\\cdots\\text{, que}' + Q + '\\text{converge (hoja «Criterio de Leibniz»). Que su}' + Q + '\\text{suma sea }\\ln 2\\text{ es otro teorema, el de Abel,}' + Q + '\\text{que en esta hoja no se demuestra ni se usa.}');
    else R.push('|x|=' + rp29Tx([Math.abs(o.p), o.q]) + '>1\\text{: }x\\text{ está fuera de }(-1,\\ 1).' + Q + '\\text{La distancia subió de }' + rp29D4(o.d4, 1) + '\\text{ a }' + rp29D4(o.d8, 1) + '.' + Q + '\\text{Los tamaños de los términos crecen:}' + Q + rp29D4(Math.abs(o.e[5]), 1) + ';\\ \\ ' + rp29D4(Math.abs(o.e[6]), 1) + ';\\ \\ ' + rp29D4(Math.abs(o.e[7]), 1) + ';\\ \\ ' + rp29D4(Math.abs(o.e[8]), 1) + Q + '\\text{Si }|x|>1\\text{, la serie diverge (ejemplo 2, paso 10).}' + Q + '\\ln(' + o.u + ')\\text{ existe, pero en este }x\\text{ la serie no}' + Q + '\\text{representa a la función.}');
    return R; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.5}, aspect:10/6.6, _dat:DAT,
    aria:'Arriba, una franja dice qué muestra: dentro del intervalo, más términos acercan la suma a la función; fuera, la alejan. Una gráfica con x en horizontal, de menos 1,25 a 1,55, y los valores en vertical, de menos 1,6 a 1,4. En burdeo, la curva del logaritmo natural de 1 más x. En azul, la suma parcial de cuatro términos de su serie; en verde, la de ocho términos. Una franja gris marca el intervalo de menos 1 a 1, sin los extremos. Un deslizador elige x entre seis valores: menos un medio, 0, un medio, tres cuartos, 1 y tres medios. Una línea vertical punteada marca el x elegido, con un punto sobre cada curva; un trazo naranja une el punto de la función con el de la suma de cuatro términos, y otro, más delgado, con el de la suma de ocho. Arriba se leen los tres valores. En x igual a 0, el centro, los tres valen 0. En menos un medio, un medio y tres cuartos, dentro del intervalo, los puntos casi coinciden y la distancia baja al pasar de cuatro a ocho términos. En x igual a 1, un extremo, la distancia baja lentamente. En x igual a tres medios, fuera del intervalo, las sumas parciales se alejan de la función: la distancia sube de 0,6819 a 1,8243. Bajo el dibujo, frases dan las dos distancias y, más abajo, la cuenta completa.',
    labels:PZ,
    sliders:[{id:'pos', tex:'x', min:1, max:NP, step:1, value:3}],
    legend:'<span><i class="sw tan"></i> la función, \\(y=\\ln(1+x)\\)</span><span><i class="sw sec"></i> \\(S_{4}\\), suma parcial de cuatro términos</span><span><i class="sw alt"></i> \\(S_{8}\\), suma parcial de ocho términos</span><span><i class="sw rise"></i> distancia entre la función y cada suma parcial, en el \\(x\\) elegido</span><span>franja gris: el intervalo \\(-1&lt;x&lt;1\\), sin los extremos</span>',
    anim:{run:30000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.pos = Math.min(NP, 1 + Math.floor(p*NP)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = cual(v), o = DAT[j], C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), bx0 = X(gx(XA)), bx1 = X(gx(XB)), by0 = Y(gy(YB)), by1 = Y(gy(YA)), px = X(gx(o.x)), yf = Y(gy(rp29Ln(o.x))), y4 = Y(gy(rp29S(4, o.x))), y8 = Y(gy(rp29S(8, o.x))), xe, xw;
      function txt(t, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(y)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function punto(py, col){ c.beginPath(); c.arc(px, py, 3.4, 0, 6.2832); c.fillStyle = col; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1; c.setLineDash([]); c.stroke(); }
      /* la franja del intervalo */
      c.globalAlpha = 0.08; c.fillStyle = C.ink; c.fillRect(X(gx(-1)), by0, X(gx(1)) - X(gx(-1)), by1 - by0); c.globalAlpha = 0.55; c.strokeStyle = C.muted || '#6b6b6b'; c.lineWidth = 1; c.setLineDash([4, 3]);
      [-1, 1].forEach(function(x){ c.beginPath(); c.moveTo(X(gx(x)), by0); c.lineTo(X(gx(x)), by1); c.stroke(); }); c.setLineDash([]); c.globalAlpha = 1;
      T.L('IV', gx(o.x < 0 ? 0.5 : -0.5), gy(0.85), -50);
      /* ejes */
      S.line(gx(XA), gy(0), gx(XB), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(YA), gx(0), gy(YB), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      [[-1, '−1'], [-0.5, '−0,5'], [0.5, '0,5'], [1, '1'], [1.5, '1,5']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(m[0])), Y(gy(0)) - 3); c.lineTo(X(gx(m[0])), Y(gy(0)) + 3); c.stroke(); if (Math.abs(m[0] - o.x) > 0.3) num(m[1], X(gx(m[0])), Y(gy(0)) + 11, 'center'); });
      [[-1, '−1'], [1, '1']].forEach(function(m){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('x', bx1 + 4, Y(gy(0)), 'left'); num('y', X(gx(0)) + 6, by0 + 2, 'left');
      /* curvas, recortadas al cuadro */
      c.save(); c.beginPath(); c.rect(bx0, by0, bx1 - bx0, by1 - by0); c.clip();
      rp29Curva(S, gx, gy, function(t){ return rp29S(8, t); }, XA, XB, C.alt, 1.5);
      rp29Curva(S, gx, gy, function(t){ return rp29S(4, t); }, XA, XB, C.sec, 1.5);
      rp29Curva(S, gx, gy, rp29Ln, -0.9, XB, C.tan, 2.2); c.restore();
      T.L('CF', gx(-0.68), gy(-1.4), 0); T.L('C4', gx(1.3), gy(0.66), -50); T.L('C8', gx(1.36), gy(-0.55), -100);
      /* el x elegido: línea vertical, distancias y puntos */
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, by0); c.lineTo(px, by1); c.stroke(); c.setLineDash([]);
      c.font = '700 10.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('x elegido', Math.max(bx0 + 26, Math.min(bx1 - 26, px)), by1 + 10);
      xe = ('' + o.x).replace('.', ',').replace('-', '−'); c.font = '700 11px ' + F; xw = c.measureText(xe).width; c.fillStyle = '#fff'; c.fillRect(px - xw/2 - 2, Y(gy(0)) + 5, xw + 4, 13); c.fillStyle = C.ink; c.textAlign = 'center'; c.fillText(xe, px, Y(gy(0)) + 11.5);
      c.strokeStyle = C.rise; c.lineWidth = 3.2; c.beginPath(); c.moveTo(px - 3, yf); c.lineTo(px - 3, y4); c.stroke(); c.lineWidth = 1.6; c.beginPath(); c.moveTo(px + 3, yf); c.lineTo(px + 3, y8); c.stroke();
      punto(y8, C.alt); punto(y4, C.sec); punto(yf, C.tan);
      T.L('A' + j, -1.2, 8.14, 0); T.L('B' + j, -1.2, 7.62, 0); T.L('D' + j, -1.2, 7.1, 0);
      txt('distancia con 4 términos: ' + rp29D4(o.d4), 0.78, C.sec); txt('distancia con 8 términos: ' + rp29D4(o.d8), 0.78 - 21/s, C.alt); txt(NOTA[o.tipo], 0.78 - 42/s, C.ink);
      dtQue(S, 'dentro del intervalo, más términos', 'acercan la suma a la función; fuera, la alejan.');
      T.fin();
    },
    caption:function(v){ var o = DAT[cual(v)]; return 'x = ' + rp29Pl([o.p, o.q]) + '. Función: ' + rp29D4(o.ln) + '. Suma de cuatro términos: ' + rp29D4(o.s4) + '; distancia ' + rp29D4(o.d4) + '. Suma de ocho términos: ' + rp29D4(o.s8) + '; distancia ' + rp29D4(o.d8) + '. ' + NOTA[o.tipo].charAt(0).toUpperCase() + NOTA[o.tipo].slice(1) + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
