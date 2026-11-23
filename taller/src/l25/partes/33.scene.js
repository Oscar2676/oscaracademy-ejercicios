/* L25 H33 · demostraciones de las sucesiones y series geométricas: la resta S − r·S que deja la fórmula de la suma parcial (caso 8 + 4 + 2 + 1), y la razón que decide si las sumas parciales tienen límite (seis razones, con a₁ = 2) */
function dm33Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a || 1; }
/* fracción p/q simplificada, con q > 0 */
function dm33F(p, q){ if (q < 0){ p = -p; q = -q; } var g = dm33Mcd(p, q); return [p/g, q/g]; }
/* fracción en TeX tal como viene (sin simplificar), con el signo delante; t = 1 para tamaño chico */
function dm33Cr(p, q, t){ if (q < 0){ p = -p; q = -q; } var s = p < 0 ? '-' : '', a = Math.abs(p); return q === 1 ? s + a : s + '\\' + (t ? 't' : 'd') + 'frac{' + a + '}{' + q + '}'; }
function dm33Tx(f, t){ return dm33Cr(f[0], f[1], t); }
function dm33Pl(f){ return (f[0] < 0 ? '−' : '') + Math.abs(f[0]) + (f[1] === 1 ? '' : '/' + f[1]); }
/* paréntesis si es negativo */
function dm33Pa(s){ return s.charAt(0) === '-' ? '\\left(' + s + '\\right)' : s; }
function dm33Ig(f, g){ return f[0] === g[0] && f[1] === g[1]; }
/* producto f·g escrito con su cuenta: f · g = (sin simplificar) = (simplificado); devuelve [TeX, resultado] */
function dm33Mul(f, g){ var p = f[0]*g[0], q = f[1]*g[1], r = dm33F(p, q), s = dm33Tx(f) + '\\cdot ' + dm33Pa(dm33Tx(g)) + '=' + dm33Cr(p, q); if (!(p === r[0] && q === r[1])) s += '=' + dm33Tx(r); return [s, r]; }
/* división f : g, hecha como producto por el inverso; devuelve [TeX de «f : g», resultado, TeX del producto con su cuenta] */
function dm33Div(f, g){ var inv = dm33F(g[1], g[0]), m = dm33Mul(f, inv); return [dm33Tx(f) + ':' + dm33Pa(dm33Tx(g)), m[1], m[0]]; }
/* suma (sg = 1) o resta (sg = −1) con denominador común, escrita con su cuenta; devuelve [TeX, resultado] */
function dm33Sum(f, g, sg){ var D = f[1]*g[1]/dm33Mcd(f[1], g[1]), a = f[0]*(D/f[1]), b = g[0]*(D/g[1]), n = a + sg*b, r = dm33F(n, D), op = sg > 0 ? '+' : '-', s = dm33Tx(f) + op + dm33Pa(dm33Tx(g));
  if (D !== 1 && !(f[1] === D && g[1] === D)) s += '=' + dm33Cr(a, D) + op + dm33Pa(dm33Cr(b, D));
  if (D !== 1) s += '=' + dm33Cr(n, D); else s += '=' + n;
  if (D !== 1 && !(n === r[0] && D === r[1])) s += '=' + dm33Tx(r); return [s, r]; }
/* decimal de una fracción: «= 3,5» si es exacto con 4 decimales o menos; «≈ 4,2222» si hubo que redondear (mitad hacia arriba en el tamaño); '' si es entero */
function dm33Dc(f, plano){ if (f[1] === 1) return ''; var ex = (10000*Math.abs(f[0])) % f[1] === 0, n = Math.floor((20000*Math.abs(f[0]) + f[1])/(2*f[1])), s = ('0000' + (n % 10000)).slice(-4), e = Math.floor(n/10000); if (ex) s = s.replace(/0+$/, '');
  return (plano ? (ex ? ' = ' : ' ≈ ') : (ex ? '=' : '\\approx ')) + (f[0] < 0 ? (plano ? '−' : '-') : '') + e + (plano ? ',' : '{,}') + s; }
OA.scene('dem33-idea', (function(){
  var N = 6, Q = '\\\\&\\qquad ', U = 0.4, X0 = -1.2, Y1 = 6.5, Y2 = 5.45, Y3 = 4.4, H = 0.5;
  var B1 = [[0, 8, '8'], [8, 4, '4'], [12, 2, '2'], [14, 1, '1']], B2 = [[8, 4, '4'], [12, 2, '2'], [14, 1, '1'], [15, 0.5, '½']];
  var PZ = [['T1', 'S_{4}\\text{: suma de 4 términos}', 'S₄: suma de 4 términos', 'c-sec'],
    ['T2', '\\tfrac{1}{2}\\,S_{4}\\text{: todo a la mitad}', '½·S₄: todo a la mitad', 'c-alt'],
    ['T3', 'S_{4}-\\tfrac{1}{2}\\,S_{4}=8-\\tfrac{1}{2}', 'S₄ − ½·S₄ = 8 − ½', 'diff'],
    ['T4', '\\left(1-\\tfrac{1}{2}\\right)S_{4}=8\\left(1-\\tfrac{1}{16}\\right)', '(1 − ½)·S₄ = 8·(1 − 1/16)', 'diff'],
    ['T5', 'S_{4}=15', 'S₄ = 15', 'diff'],
    ['Q', '\\text{¿Cuánto suma }S_{n}=a_{1}+a_{1}r+\\cdots+a_{1}r^{\\,n-1}\\text{?}', '¿Cuánto suma Sₙ = a₁ + a₁r + ⋯ + a₁rⁿ⁻¹?', 'pt'],
    ['F', '\\Longrightarrow\\ S_{n}=\\tfrac{a_{1}\\,(1-r^{\\,n})}{1-r}\\text{, si }r\\neq 1', '⟹ Sₙ = a₁(1 − rⁿ)/(1 − r), si r ≠ 1', 'diff'],
    ['R1', 'S_{4}=8+4+2+1', 'S₄ = 8 + 4 + 2 + 1', ''],
    ['R2', '\\tfrac{1}{2}\\,S_{4}=4+2+1+\\tfrac{1}{2}', '½·S₄ = 4 + 2 + 1 + ½', ''],
    ['R3', 'S_{4}-\\tfrac{1}{2}\\,S_{4}=8-\\tfrac{1}{2}', 'S₄ − ½·S₄ = 8 − ½', ''],
    ['R4', '\\left(1-\\tfrac{1}{2}\\right)S_{4}=8\\left(1-\\left(\\tfrac{1}{2}\\right)^{4}\\right)', '(1 − ½)·S₄ = 8·(1 − (½)⁴)', ''],
    ['R5', 'S_{4}=\\tfrac{15}{2}:\\tfrac{1}{2}=\\tfrac{15}{2}\\cdot 2=15', 'S₄ = 15/2 : 1/2 = 15/2 · 2 = 15', ''],
    ['R6', 'S_{n}=\\dfrac{a_{1}\\,(1-r^{\\,n})}{1-r}\\quad(r\\neq 1)', 'Sₙ = a₁(1 − rⁿ)/(1 − r) (r ≠ 1)', 'diff']];
  var TXT = [['Se toma un caso: primer término 8, razón ½,', 'cuatro términos. Cada bloque es un término.'],
    ['Se multiplica la suma por la razón: cada', 'bloque baja a la mitad y queda corrido un lugar.'],
    ['Se resta: los bloques iguales de arriba y abajo', 'se cancelan. Quedan el primero y el último.'],
    ['Factor común: a la barra de 8 le falta', 'una de sus 16 partes, la que mide ½.'],
    ['Se divide por un medio: la resta es la mitad', 'de la suma. La suma completa es 15.'],
    ['Con letras, la misma cuenta da la fórmula.', 'Solo pide que la razón no sea 1, para dividir.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-2.6, y1:10}, aspect:12.6/6.6,
    aria:'Arriba, una franja dice qué muestra: restar r por S de S cancela casi todo y deja la fórmula de la suma parcial. Animación en seis pasos con bloques cuyo largo es el valor de cada término. Uno: una fila azul de cuatro bloques, de largos 8, 4, 2 y 1: es la suma de cuatro términos con primer término 8 y razón un medio. Dos: cada bloque baja a una segunda fila, verde, reducido a la mitad, 4, 2, 1 y un medio, y queda corrido un lugar a la derecha, de modo que el 4, el 2 y el 1 de abajo quedan justo bajo el 4, el 2 y el 1 de arriba. Tres: los bloques iguales de las dos filas se tachan y se unen con líneas finas: al restar se cancelan; quedan el 8 de arriba y el medio de abajo, y aparece una tercera barra, naranja, de largo 8 a la que se le ha sacado, al final, un pedazo de largo un medio, que deja su hueco punteado. Cuatro: la barra naranja se divide en 16 partes iguales y le falta una: es 8 por 1 menos un dieciseisavo, y eso es 1 menos un medio, por la suma. Cinco: una cota sobre la primera fila marca la suma completa, 15, y una línea punteada vertical muestra que la barra naranja, de largo 7 y medio, llega justo a la mitad. Seis: junto a la pregunta se escribe la respuesta, la fórmula de la suma parcial, a sub 1 por 1 menos r elevado a n, dividido por 1 menos r, si r es distinto de 1. Nada de lo que aparece se borra. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(S_{4}=8+4+2+1\\): cada bloque es un término</span><span><i class="sw alt"></i> \\(\\tfrac{1}{2}\\,S_{4}=4+2+1+\\tfrac{1}{2}\\): la suma multiplicada por la razón</span><span><i class="sw rise"></i> la resta, \\(S_{4}-\\tfrac{1}{2}\\,S_{4}=8-\\tfrac{1}{2}\\)</span><span>bloques grises tachados: están en las dos filas y se cancelan</span>',
    anim:{run:42000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), w, w1, w2, wc, i, b, a, xa, GR = 'rgba(110,110,110,';
      function cl(t){ return Math.max(0, Math.min(1, t)); }
      function txt(t, x, y, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al, cc, al2){ c.globalAlpha = al2 == null ? 1 : al2; c.font = '700 11.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); c.globalAlpha = 1; }
      /* bloque: x e y en unidades del mundo (esquina inferior izquierda), ancho wd, alto H */
      function blo(x, y, wd, col, al, dash){ var px = X(x), py = Y(y + H), pw = X(x + wd) - px, ph = Y(y) - py; c.globalAlpha = al*0.22; c.fillStyle = col; if (!dash) c.fillRect(px, py, pw, ph); c.globalAlpha = al; c.strokeStyle = col; c.lineWidth = 1.3; c.setLineDash(dash || []); c.strokeRect(px, py, pw, ph); c.setLineDash([]); c.globalAlpha = 1; }
      function tacha(x, y, wd, al){ var px = X(x), py = Y(y + H), pw = X(x + wd) - px, ph = Y(y) - py; c.globalAlpha = al; c.fillStyle = 'rgba(255,255,255,0.55)'; c.fillRect(px + 1, py + 1, pw - 2, ph - 2); c.strokeStyle = GR + '0.9)'; c.lineWidth = 1.2; c.setLineDash([]); c.beginPath(); c.moveTo(px + 2, py + ph - 2); c.lineTo(px + pw - 2, py + 2); c.stroke(); c.globalAlpha = 1; }
      function cota(x0, x1, y, col, al){ c.globalAlpha = al; c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([]); c.beginPath(); c.moveTo(X(x0), Y(y)); c.lineTo(X(x1), Y(y)); c.moveTo(X(x0), Y(y) - 4); c.lineTo(X(x0), Y(y) + 4); c.moveTo(X(x1), Y(y) - 4); c.lineTo(X(x1), Y(y) + 4); c.stroke(); c.globalAlpha = 1; }
      /* paso 1: la fila de S₄; cada bloque aparece en su turno */
      w = k === 1 ? u : 1; wc = k > 3 ? 1 : k === 3 ? cl(2*u) : 0; /* wc: avance de la cancelación; el número de un bloque cancelado pasa, en gris, a su esquina */
      for (i = 0; i < 4; i++){ b = B1[i]; a = cl(4*w - i); if (a <= 0) continue; blo(X0 + b[0]*U, Y1, b[1]*U, C.sec, a); num(b[2], X(X0 + (b[0] + b[1]/2)*U), Y(Y1 + H/2), 'center', C.sec, a*(i ? 1 - wc : 1)); }
      if (w > 0.3) L('T1', X0, Y1 + H + 0.45, 0);
      /* paso 2: cada bloque baja reducido a la mitad y queda corrido un lugar */
      if (k >= 2){ w = k === 2 ? u : 1;
        for (i = 0; i < 4; i++){ b = B1[i]; a = cl(2.2*w - 0.3*i); if (a <= 0) continue; xa = X0 + (b[0] + (B2[i][0] - b[0])*a)*U; w1 = b[1]*(1 - a/2)*U; blo(xa, Y1 + (Y2 - Y1)*a, w1, C.alt, 1); if (a > 0.98){ if (i < 3) num(B2[i][2], X(xa + w1/2), Y(Y2 + H/2), 'center', C.alt, 1 - wc); else num('½', X(xa + w1/2), Y(Y2) + 10, 'center', C.alt); } }
        if (w > 0.6) L('T2', X0, Y2 + H/2, 0); }
      /* paso 3: los bloques iguales se cancelan (quedan a la vista, tachados y unidos); abajo, la resta: la barra de 8 con el pedazo de ½ sacado, que deja su hueco */
      if (k >= 3){ w = k === 3 ? u : 1; w1 = cl(2*w); w2 = cl(2*w - 1);
        for (i = 1; i < 4; i++){ b = B1[i]; tacha(X0 + b[0]*U, Y1, b[1]*U, w1); tacha(X0 + b[0]*U, Y2, b[1]*U, w1); c.globalAlpha = w1; c.strokeStyle = GR + '0.8)'; c.lineWidth = 1; c.setLineDash([2, 3]); c.beginPath(); c.moveTo(X(X0 + (b[0] + b[1]/2)*U), Y(Y1)); c.lineTo(X(X0 + (b[0] + b[1]/2)*U), Y(Y2 + H)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; xa = X(X0 + (b[0] + b[1]/2)*U) - (i === 1 ? 14 : i === 2 ? 8 : 4); num(b[2], xa, Y(Y1 + H/2) - 4, 'center', '#555', w1); num(b[2], xa, Y(Y2 + H/2) - 4, 'center', '#555', w1); }
        if (w2 > 0){ blo(X0, Y3, 7.5*U*w2, C.rise, 1); if (w2 > 0.9){ blo(X0 + 7.5*U, Y3, 0.5*U, C.rise, cl(10*w2 - 9), [3, 2]); L('T3', X0 + 8.4*U, Y3 + H/2, 0); } } }
      /* paso 4: la barra de 8, en 16 partes de ½: falta una */
      if (k >= 4){ w = k === 4 ? u : 1; c.globalAlpha = 0.55*w; c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([]); for (i = 1; i < 15; i++){ c.beginPath(); c.moveTo(X(X0 + i*0.5*U), Y(Y3 + H)); c.lineTo(X(X0 + i*0.5*U), Y(Y3)); c.stroke(); } c.globalAlpha = 1;
        cota(X0, X0 + 7.5*U*w, Y3 - 0.22, C.rise, 1); if (w > 0.6) L('T4', X0, Y3 - 0.62, 0); }
      /* paso 5: la suma completa; la resta llega justo a la mitad */
      if (k >= 5){ w = k === 5 ? u : 1; cota(X0, X0 + 15*U*w, Y1 + H + 0.16, C.rise, 1);
        c.globalAlpha = w; c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(X0 + 7.5*U), Y(Y3 + H)); c.lineTo(X(X0 + 7.5*U), Y(Y3 + H + (Y1 + H + 0.16 - Y3 - H)*w)); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        if (w > 0.7){ L('T5', X0 + 15*U, Y1 + H + 0.45, -100); num('mitad', X(X0 + 7.5*U) + 4, Y(Y2 + H) - 9, 'left', C.rise); } }
      L('Q', -1.2, 8.62, 0); if (k === N && u > 0.5) L('F', -1.2, 8.08, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 2.75); txt(TXT[k - 1][1], -1.2, 2.75 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.08));
      dtQue(S, 'restar r·S de S cancela casi todo', 'y deja la fórmula de la suma parcial.');
      T.fin();
      oaReg(S, k, N, -1.2, 1.3, [6, 36, 66, 98, 130, 166]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{Datos: }a_{1}=8,\\quad r=\\tfrac{1}{2},\\quad n=4' + Q + '\\text{Cada término es el anterior por }r\\text{:}' + Q + 'a_{1}=8' + Q + 'a_{2}=8\\cdot\\tfrac{1}{2}=4' + Q + 'a_{3}=4\\cdot\\tfrac{1}{2}=2' + Q + 'a_{4}=2\\cdot\\tfrac{1}{2}=1' + Q + '\\text{Por el teorema 1, }a_{k}=8\\left(\\tfrac{1}{2}\\right)^{k-1}\\text{:}' + Q + 'S_{4}=\\displaystyle\\sum_{k=1}^{4}8\\left(\\tfrac{1}{2}\\right)^{k-1}=8+4+2+1',
      '\\text{Se multiplica cada lado por }r=\\tfrac{1}{2}' + Q + '\\text{(distributiva: cada término por }\\tfrac{1}{2}\\text{):}' + Q + '\\tfrac{1}{2}\\cdot 8=4' + Q + '\\tfrac{1}{2}\\cdot 4=2' + Q + '\\tfrac{1}{2}\\cdot 2=1' + Q + '\\tfrac{1}{2}\\cdot 1=\\tfrac{1}{2}' + Q + '\\tfrac{1}{2}\\,S_{4}=4+2+1+\\tfrac{1}{2}' + Q + '\\text{Son los mismos términos, corridos un lugar,}' + Q + '\\text{y uno nuevo al final: }\\tfrac{1}{2}.',
      '\\text{Se resta la segunda igualdad de la primera:}' + Q + 'S_{4}-\\tfrac{1}{2}\\,S_{4}=(8+4+2+1)' + Q + '\\phantom{S_{4}-\\tfrac{1}{2}\\,S_{4}=}-\\left(4+2+1+\\tfrac{1}{2}\\right)' + Q + '\\text{Los que están en las dos se cancelan:}' + Q + '4-4=0,\\qquad 2-2=0,\\qquad 1-1=0' + Q + '\\text{Quedan el primero de arriba}' + Q + '\\text{y el último de abajo, restando:}' + Q + 'S_{4}-\\tfrac{1}{2}\\,S_{4}=8-\\tfrac{1}{2}' + Q + '8-\\tfrac{1}{2}=\\tfrac{16}{2}-\\tfrac{1}{2}=\\tfrac{15}{2}',
      '\\text{Factor común }S_{4}\\text{ a la izquierda:}' + Q + 'S_{4}-\\tfrac{1}{2}\\,S_{4}=\\left(1-\\tfrac{1}{2}\\right)S_{4}' + Q + '\\text{A la derecha, }\\tfrac{1}{2}\\text{ es }8\\text{ por una potencia:}' + Q + '\\left(\\tfrac{1}{2}\\right)^{4}=\\tfrac{1}{2}\\cdot\\tfrac{1}{2}\\cdot\\tfrac{1}{2}\\cdot\\tfrac{1}{2}=\\tfrac{1}{16}' + Q + '8\\cdot\\tfrac{1}{16}=\\tfrac{8}{16}=\\tfrac{1}{2}' + Q + '\\text{Factor común }8\\text{:}' + Q + '8-\\tfrac{1}{2}=8-8\\left(\\tfrac{1}{2}\\right)^{4}=8\\left(1-\\left(\\tfrac{1}{2}\\right)^{4}\\right)' + Q + '\\text{Las dos partes, juntas:}' + Q + '\\left(1-\\tfrac{1}{2}\\right)S_{4}=8\\left(1-\\left(\\tfrac{1}{2}\\right)^{4}\\right)',
      '1-\\tfrac{1}{2}=\\tfrac{2}{2}-\\tfrac{1}{2}=\\tfrac{1}{2}' + Q + '\\text{No es }0\\text{: se puede dividir cada lado por él.}' + Q + 'S_{4}=\\dfrac{8\\left(1-\\left(\\frac{1}{2}\\right)^{4}\\right)}{1-\\frac{1}{2}}' + Q + '\\text{Numerador: }1-\\tfrac{1}{16}=\\tfrac{16}{16}-\\tfrac{1}{16}=\\tfrac{15}{16}' + Q + '8\\cdot\\tfrac{15}{16}=\\tfrac{120}{16}=\\tfrac{15}{2}' + Q + 'S_{4}=\\tfrac{15}{2}:\\tfrac{1}{2}=\\tfrac{15}{2}\\cdot 2=\\tfrac{30}{2}=15' + Q + '\\text{Comprobación, sumando uno por uno:}' + Q + '8+4=12,\\qquad 12+2=14,\\qquad 14+1=15\\ \\checkmark',
      '\\text{La misma cuenta, con letras:}' + Q + 'S_{n}=a_{1}+a_{1}r+\\cdots+a_{1}r^{\\,n-1}' + Q + 'r\\,S_{n}=a_{1}r+\\cdots+a_{1}r^{\\,n-1}+a_{1}r^{\\,n}' + Q + 'S_{n}-r\\,S_{n}=a_{1}-a_{1}r^{\\,n}' + Q + '(1-r)\\,S_{n}=a_{1}\\,(1-r^{\\,n})' + Q + '\\text{Si }r\\neq 1\\text{, entonces }1-r\\neq 0\\text{ y se divide:}' + Q + 'S_{n}=\\displaystyle\\sum_{k=1}^{n}a_{1}r^{\\,k-1}=\\dfrac{a_{1}\\,(1-r^{\\,n})}{1-r}' + Q + '\\text{Con }a_{1}=8,\\ r=\\tfrac{1}{2},\\ n=4\\text{ da }15\\text{, lo de antes.}' + Q + '\\text{La demostración completa, con todos sus}' + Q + '\\text{pasos, está en el recuadro del teorema 2.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: se elige la razón (a₁ = 2 fijo); la figura dibuja S₁…S₆ y, si |r| < 1, la recta de la suma a₁/(1 − r) y lo que falta; casos límite: r = 1 (la fórmula de Sₙ no se puede usar) y r = −1 (las sumas saltan) */
OA.scene('dem33-vivo', (function(){
  var Q = '\\\\&\\qquad ', A = [2, 1], NN = 6;
  /* r, tope del eje vertical, paso de las marcas, posición de los rótulos S₃ y S₆ (dx, dy en px) */
  var CS = [{r:[-1, 1], ym:3, st:1, l3:[0, -14], l6:[0, -14]}, {r:[-1, 2], ym:2.5, st:0.5, l3:[0, -14], l6:[0, 15], ll:13}, {r:[1, 2], ym:4.6, st:1, l3:[0, 15], l6:[0, 15]}, {r:[2, 3], ym:7, st:1, l3:[0, 15], l6:[0, 15]}, {r:[1, 1], ym:13, st:2, l3:[-15, -9], l6:[-15, -9]}, {r:[3, 2], ym:46, st:10, l3:[-4, -15], l6:[-17, -7]}], NP = CS.length;
  function gx(n){ return -0.55 + 0.9*n; }
  function cual(v){ return Math.max(1, Math.min(NP, Math.round(v.pos || 1))) - 1; }
  function pot(r, n){ var f = [1, 1], i; for (i = 0; i < n; i++) f = dm33F(f[0]*r[0], f[1]*r[1]); return f; }
  var DAT = CS.map(function(o){ var r = o.r, n, t, s = [0, 1]; o.x = r[0]/r[1]; o.S = [];
    for (n = 1; n <= NN; n++){ t = pot(r, n - 1); s = dm33F(s[0]*t[1] + A[0]*t[0]*s[1], s[1]*t[1]); o.S.push(s); } /* sumas parciales, sumando término a término */
    o.tipo = Math.abs(r[0]) < r[1] ? 'c' : r[0] === r[1] ? 'u' : r[0] === -r[1] ? 'm' : 'd';
    o.d = dm33F(r[1] - r[0], r[1]); /* 1 − r */
    if (o.tipo === 'c'){ o.L = dm33F(A[0]*o.d[1], o.d[0]); o.g3 = dm33F(o.L[0]*o.S[2][1] - o.S[2][0]*o.L[1], o.L[1]*o.S[2][1]); o.g6 = dm33F(o.L[0]*o.S[5][1] - o.S[5][0]*o.L[1], o.L[1]*o.S[5][1]); }
    return o; });
  /* frase de lo que falta (o sobra, si la suma parcial quedó por encima de la suma) */
  function falta(g, n){ var a = dm33F(Math.abs(g[0]), g[1]); return 'después de ' + n + ' términos ' + (g[0] < 0 ? 'sobra: ' : 'falta: ') + dm33Pl(a) + dm33Dc(a, 1); }
  var NOTA = {c:'la razón mide menos que 1: hay suma', u:'caso límite: razón 1, las sumas crecen sin tope', m:'caso límite: razón −1, las sumas saltan', d:'la razón mide más que 1: no hay suma'};
  var PZ = [['P3', 'S_{3}', 'S₃', 'pt'], ['P6', 'S_{6}', 'S₆', 'pt']];
  DAT.forEach(function(o, j){ var rt = dm33Tx(o.r, 1), rp = dm33Pl(o.r), ab = dm33F(Math.abs(o.r[0]), o.r[1]), cmp = o.tipo === 'c' ? '<' : o.tipo === 'd' ? '>' : '=';
    PZ.push(['A' + j, 'a_{1}=2,\\quad r=' + rt + ',\\quad |r|=' + dm33Tx(ab, 1) + (cmp === '=' ? '' : cmp + '1'), 'a₁ = 2, r = ' + rp + ', |r| = ' + dm33Pl(ab) + (cmp === '=' ? '' : ' ' + cmp + ' 1'), 'pt']);
    PZ.push(['B' + j, 'S_{3}=' + dm33Tx(o.S[2], 1) + ',\\qquad S_{6}=' + dm33Tx(o.S[5], 1), 'S₃ = ' + dm33Pl(o.S[2]) + ', S₆ = ' + dm33Pl(o.S[5]), 'c-sec']);
    PZ.push(['D' + j, o.tipo === 'c' ? '\\text{suma: }\\tfrac{a_{1}}{1-r}=' + dm33Tx(o.L, 1) : '\\text{no tiene suma}', o.tipo === 'c' ? 'suma: a₁/(1 − r) = ' + dm33Pl(o.L) : 'no tiene suma', 'c-tan']);
    if (o.tipo === 'c') PZ.push(['L' + j, '\\tfrac{a_{1}}{1-r}=' + dm33Tx(o.L, 1), 'a₁/(1 − r) = ' + dm33Pl(o.L), 'c-tan']); });
  /* 1 − f, escrito con su cuenta; devuelve [TeX, resultado] */
  function unoM(f, nom){ var q = f[1], p = f[0], r = dm33F(q - p, q), s = '1-' + nom + '=1-' + dm33Pa(dm33Tx(f));
    if (q === 1) s += (p < 0 ? '=1+' + (-p) : '') + '=' + (1 - p);
    else s += (p < 0 ? '=1+' + dm33Cr(-p, q) + Q + '\\phantom{1-' + nom + '}' : '') + '=' + dm33Cr(q, q) + (p < 0 ? '+' + dm33Cr(-p, q) : '-' + dm33Cr(p, q)) + '=' + dm33Cr(q - p, q);
    return [s, r]; }
  function lectura(j){ var o = DAT[j], r = o.r, rt = dm33Tx(r), R = [], l, m, m2, r2, r3, r6, u3, u6, n3, n6, a2, a3, s2, ab = dm33F(Math.abs(r[0]), r[1]), FORM = '\\text{Teorema 2 }(r\\neq 1)\\text{:}' + Q + 'S_{n}=\\displaystyle\\sum_{k=1}^{n}a_{1}r^{\\,k-1}=\\dfrac{a_{1}\\,(1-r^{\\,n})}{1-r}';
    if (o.tipo === 'u') return [
      '\\text{Datos: }a_{1}=2,\\quad r=1,\\quad |r|=1' + Q + '1-r=1-1=0' + Q + '\\text{La fórmula del teorema 2 pide dividir}' + Q + '\\text{por }1-r\\text{: aquí sería dividir por }0.' + Q + '\\text{No se puede usar.}',
      '\\text{Términos (teorema 1): }a_{n}=a_{1}\\,r^{\\,n-1}' + Q + 'a_{n}=2\\cdot 1^{\\,n-1}=2\\cdot 1=2' + Q + '\\text{Todos los términos valen }2.',
      '\\text{Teorema 2, caso }r=1\\text{: suma de }n\\text{ sumandos}' + Q + '\\text{iguales a }a_{1}=2\\text{:}\\quad S_{n}=n\\cdot a_{1}=n\\cdot 2' + Q + 'S_{1}=1\\cdot 2=2,\\quad S_{2}=2\\cdot 2=4,\\quad S_{3}=3\\cdot 2=6' + Q + 'S_{4}=4\\cdot 2=8,\\quad S_{5}=5\\cdot 2=10,\\quad S_{6}=6\\cdot 2=12',
      '\\text{Comprobación de }S_{3}\\text{, sumando uno por uno:}' + Q + '2+2=4,\\qquad 4+2=6\\ \\checkmark',
      '\\text{¿Tienen límite? Dado cualquier número }M>0\\text{,}' + Q + 'S_{n}=2n>M\\ \\text{ en cuanto }\\ n>\\tfrac{M}{2}.' + Q + '\\text{Las sumas parciales pasan cualquier tope:}' + Q + '\\text{no tienen límite real.}',
      '\\text{Teorema 3, caso }|r|\\ge 1\\text{: los términos miden}' + Q + '|a_{n}|=2\\text{ y no se acercan a }0\\text{. La serie}' + Q + '2+2+2+\\cdots\\ \\text{ diverge: no tiene suma.}' + Q + '\\text{Caso límite: es la única razón en que la}' + Q + '\\text{fórmula de }S_{n}\\text{ no se puede ni escribir.}'];
    if (o.tipo === 'm') return [
      '\\text{Datos: }a_{1}=2,\\quad r=-1,\\quad |r|=1' + Q + FORM,
      '\\text{Denominador: }1-r=1-(-1)=1+1=2' + Q + '\\text{No es }0\\text{: se puede dividir.}',
      '\\text{Potencias, cada una de la anterior:}' + Q + 'r^{2}=(-1)\\cdot(-1)=1' + Q + 'r^{3}=r^{2}\\cdot r=1\\cdot(-1)=-1' + Q + 'r^{6}=r^{3}\\cdot r^{3}=(-1)\\cdot(-1)=1',
      'n=3\\text{: }\\ 1-r^{3}=1-(-1)=1+1=2' + Q + 'a_{1}\\,(1-r^{3})=2\\cdot 2=4' + Q + 'S_{3}=4:2=2' + Q + '\\text{Comprobación, sumando uno por uno:}' + Q + 'a_{2}=2\\cdot(-1)=-2,\\qquad a_{3}=(-2)\\cdot(-1)=2' + Q + '2+(-2)=0,\\qquad 0+2=2\\ \\checkmark',
      'n=6\\text{: }\\ 1-r^{6}=1-1=0' + Q + 'a_{1}\\,(1-r^{6})=2\\cdot 0=0' + Q + 'S_{6}=0:2=0',
      '\\text{Las sumas parciales son }2,\\ 0,\\ 2,\\ 0,\\ 2,\\ 0,\\ \\ldots' + Q + '\\text{Saltan entre dos valores separados por }2\\text{:}' + Q + '\\text{no se acercan a un solo número. No hay límite.}',
      '\\text{La expresión }\\dfrac{a_{1}}{1-r}=\\dfrac{2}{2}=1\\text{ no es la suma:}' + Q + '|S_{n}-1|=|2-1|=1\\ \\text{ o }\\ |0-1|=1' + Q + '\\text{Ninguna suma parcial se acerca a }1.',
      '\\text{Teorema 3, caso }|r|\\ge 1\\text{: los términos miden}' + Q + '|a_{n}|=2\\text{ y no se acercan a }0\\text{. La serie}' + Q + '2-2+2-2+\\cdots\\ \\text{ diverge: no tiene suma.}' + Q + '\\text{Caso límite: }|r|=1\\text{ queda fuera de }|r|<1.'];
    R.push('\\text{Datos: }a_{1}=2,\\quad r=' + rt + ',\\quad |r|=' + dm33Tx(ab) + (o.tipo === 'c' ? '<1' : '>1') + Q + FORM);
    m = unoM(r, 'r'); R.push('\\text{Denominador:}' + Q + m[0] + Q + '\\text{No es }0\\text{: se puede dividir.}');
    r2 = dm33Mul(r, r); r3 = dm33Mul(r2[1], r); r6 = dm33Mul(r3[1], r3[1]);
    R.push('\\text{Potencias, cada una de la anterior:}' + Q + 'r^{2}=r\\cdot r=' + r2[0] + Q + 'r^{3}=r^{2}\\cdot r=' + r3[0] + Q + 'r^{6}=r^{3}\\cdot r^{3}=' + r6[0]);
    u3 = unoM(r3[1], 'r^{3}'); n3 = dm33Mul(A, u3[1]); m = dm33Div(n3[1], o.d);
    a2 = dm33Mul(A, r); a3 = dm33Mul(a2[1], r); s2 = dm33Sum(A, a2[1], 1); m2 = dm33Sum(s2[1], a3[1], 1);
    R.push('n=3\\text{:}' + Q + u3[0] + Q + 'a_{1}\\,(1-r^{3})=' + n3[0] + Q + 'S_{3}=' + m[0] + Q + '\\phantom{S_{3}}=' + m[2] + Q + '\\text{Comprobación, sumando uno por uno:}' + Q + 'a_{2}=a_{1}\\cdot r=' + a2[0] + Q + 'a_{3}=a_{2}\\cdot r=' + a3[0] + Q + 'a_{1}+a_{2}=' + s2[0] + Q + '(a_{1}+a_{2})+a_{3}=' + m2[0] + '\\ \\checkmark');
    u6 = unoM(r6[1], 'r^{6}'); n6 = dm33Mul(A, u6[1]); m = dm33Div(n6[1], o.d);
    R.push('n=6\\text{:}' + Q + u6[0] + Q + 'a_{1}\\,(1-r^{6})=' + n6[0] + Q + 'S_{6}=' + m[0] + Q + '\\phantom{S_{6}}=' + m[2] + (dm33Dc(m[1]) ? Q + '\\phantom{S_{6}}' + dm33Dc(m[1]) : ''));
    if (o.tipo === 'c'){
      m = dm33Div(A, o.d); R.push('\\text{Teorema 3: como }|r|<1\\text{, la serie converge y}' + Q + 'S=\\displaystyle\\sum_{n=1}^{\\infty}a_{1}r^{\\,n-1}=\\dfrac{a_{1}}{1-r}' + Q + 'S=' + m[0] + '=' + m[2]);
      m = dm33Sum(o.L, o.S[2], -1); m2 = dm33Sum(o.L, o.S[5], -1); n3 = dm33Mul(A, r3[1]); l = dm33Div(n3[1], o.d);
      R.push('\\text{Lo que le falta a cada suma parcial:}' + Q + 'S-S_{3}=' + m[0] + (o.g3[0] < 0 ? Q + '\\text{(negativo: }S_{3}\\text{ quedó por encima de }S\\text{;}' + Q + '\\text{sobra }' + dm33Tx(dm33F(-o.g3[0], o.g3[1])) + '\\text{ en vez de faltar)}' : '') + Q + 'S-S_{6}=' + m2[0] + Q + '\\text{Por la fórmula de la demostración,}' + Q + 'S-S_{n}=\\dfrac{a_{1}\\,r^{\\,n}}{1-r}\\text{, con }n=3\\text{:}' + Q + 'a_{1}\\,r^{3}=' + n3[0] + Q + '\\dfrac{a_{1}\\,r^{3}}{1-r}=' + l[0] + Q + '\\phantom{\\dfrac{a_{1}\\,r^{3}}{1-r}}=' + l[2] + '\\ \\checkmark');
      l = dm33Mul(o.g3, r3[1]);
      R.push('\\text{De }n=3\\text{ a }n=6\\text{, lo que falta}' + Q + '\\text{se multiplica por }r^{3}\\text{:}' + Q + l[0] + Q + '\\text{Como }|r|<1\\text{, }r^{\\,n}\\text{ tiene límite }0\\text{ (lema 2): lo que}' + Q + '\\text{falta se hace tan chico como se quiera, y las}' + Q + '\\text{sumas parciales tienen límite }S=' + dm33Tx(o.L) + '.');
    } else {
      R.push('\\text{Los términos crecen: cada uno es el anterior}' + Q + '\\text{por }' + rt + '\\text{, que mide más que }1\\text{. Por el lema 3,}' + Q + '|a_{n}|=2\\cdot\\left(' + dm33Tx(ab) + '\\right)^{n-1}\\ge 2\\cdot 1=2' + Q + '\\text{No se acercan a }0\\text{: por el teorema 3, caso}' + Q + '|r|\\ge 1\\text{, la serie diverge. No tiene suma.}');
      m = dm33Div(A, o.d);
      R.push('\\text{Cuidado: la expresión }\\dfrac{a_{1}}{1-r}\\text{ sí da un número:}' + Q + m[0] + '=' + m[2] + Q + '\\text{No es la suma: las sumas parciales,}' + Q + '2,\\ 5,\\ \\tfrac{19}{2},\\ \\ldots\\text{, son positivas y crecen.}' + Q + '\\text{Ese número no significa nada: la fórmula}' + Q + '\\text{de la suma solo vale si }|r|<1.');
    }
    return R; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-0.5, y1:9.5}, aspect:10/6.6, _dat:DAT, _lec:lectura,
    aria:'Arriba, una franja dice qué muestra: la razón decide si las sumas parciales tienen límite. Una gráfica con el número de términos n en horizontal, de 1 a 6, y la suma parcial en vertical. El primer término es 2, fijo. Un deslizador elige la razón entre seis valores: menos 1, menos un medio, un medio, dos tercios, 1 y tres medios. Para cada una se dibujan los seis puntos azules de las sumas parciales, cada uno con una punteada fina hasta el eje vertical, y se rotulan la tercera y la sexta. Si la razón mide menos que 1, una recta horizontal burdeo punteada marca la suma, 2 dividido por 1 menos la razón, y un trazo naranja une cada punto con esa recta: es lo que falta, y se achica. Con razón un medio la suma es 4; con menos un medio, cuatro tercios, y los puntos quedan alternadamente arriba y abajo de la recta; con dos tercios, 6. Con razón 1 los puntos suben en línea recta, 2, 4, 6, hasta 12, y no hay recta: la fórmula de la suma parcial no se puede usar. Con razón menos 1 los puntos saltan entre 2 y 0. Con razón tres medios los puntos suben cada vez más rápido, hasta 665 dieciseisavos. Bajo el dibujo, frases dicen cuánto falta después de tres y de seis términos, o por qué no hay suma, y más abajo va la cuenta completa.',
    labels:PZ,
    sliders:[{id:'pos', tex:'\\text{caso}', min:1, max:NP, step:1, value:3}],
    legend:'<span><i class="sw sec"></i> sumas parciales \\(S_{1},\\ldots,S_{6}\\), con \\(a_{1}=2\\)</span><span><i class="sw tan"></i> la suma, \\(\\tfrac{a_{1}}{1-r}\\) (solo si \\(|r|&lt;1\\))</span><span><i class="sw rise"></i> lo que falta: \\(S-S_{n}=\\tfrac{a_{1}r^{\\,n}}{1-r}\\)</span><span>casos del deslizador: \\(r=-1,\\ -\\tfrac{1}{2},\\ \\tfrac{1}{2},\\ \\tfrac{2}{3},\\ 1,\\ \\tfrac{3}{2}\\)</span>',
    anim:{run:30000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.pos = Math.min(NP, 1 + Math.floor(p*NP)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var j = cual(v), o = DAT[j], C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), n, y, px, py, yl, val, YB = 2.3, YH = 4.1;
      function gy(t){ return YB + YH*t/o.ym; }
      function txt(t, yy, cc){ c.font = '600 12.5px ' + F; c.fillStyle = cc || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(-1.2), Y(yy)); }
      function num(t, px, py, al, cc){ c.font = '500 10.5px ' + F; c.fillStyle = cc || C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* ejes */
      S.line(gx(0), gy(0), gx(6.5), gy(0), {color:C.ink, width:1.1}); S.line(gx(0), gy(0), gx(0), gy(o.ym), {color:C.ink, width:1.1});
      c.strokeStyle = C.ink; c.lineWidth = 1; c.setLineDash([]);
      for (n = 1; n <= NN; n++){ c.beginPath(); c.moveTo(X(gx(n)), Y(gy(0)) - 3); c.lineTo(X(gx(n)), Y(gy(0)) + 3); c.stroke(); num('' + n, X(gx(n)), Y(gy(0)) + 11, 'center'); }
      for (y = o.st; y <= o.ym + 1e-9; y += o.st){ c.strokeStyle = C.ink; c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(y))); c.lineTo(X(gx(0)) + 3, Y(gy(y))); c.stroke(); num(('' + y).replace('.', ','), X(gx(0)) - 7, Y(gy(y)), 'right'); }
      num('0', X(gx(0)) - 7, Y(gy(0)), 'right'); num('n', X(gx(6.5)) + 5, Y(gy(0)), 'left'); num('suma parcial', X(gx(0)) + 6, Y(gy(o.ym)) - 2, 'left');
      /* la suma, si la hay: recta punteada, y lo que falta en cada n */
      if (o.tipo === 'c'){ yl = Y(gy(o.L[0]/o.L[1])); c.strokeStyle = C.tan; c.lineWidth = 1.3; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(gx(0)), yl); c.lineTo(X(gx(6.5)), yl); c.stroke(); c.setLineDash([]);
        for (n = 1; n <= NN; n++){ px = X(gx(n)); py = Y(gy(o.S[n - 1][0]/o.S[n - 1][1])); c.strokeStyle = C.rise; c.lineWidth = n === 3 || n === 6 ? 3 : 1.8; c.beginPath(); c.moveTo(px, py); c.lineTo(px, yl); c.stroke(); }
        T.L('L' + j, gx(0), gy(o.L[0]/o.L[1]), 0, 8, o.ll || -11); }
      /* puntos de las sumas parciales, con su punteada al eje vertical */
      for (n = 1; n <= NN; n++){ val = o.S[n - 1][0]/o.S[n - 1][1]; px = X(gx(n)); py = Y(gy(val));
        c.strokeStyle = C.sec; c.globalAlpha = 0.45; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px, py); c.lineTo(X(gx(0)), py); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        c.beginPath(); c.arc(px, py, n === 3 || n === 6 ? 4 : 3, 0, 6.2832); c.fillStyle = C.sec; c.fill(); c.strokeStyle = '#fff'; c.lineWidth = 1; c.stroke();
        if (n === 3) T.L('P3', gx(n), gy(val), -50, o.l3[0], o.l3[1]); if (n === 6) T.L('P6', gx(n), gy(val), -50, o.l6[0], o.l6[1]); }
      T.L('A' + j, -1.2, 8.14, 0); T.L('B' + j, -1.2, 7.62, 0); T.L('D' + j, -1.2, 7.1, 0);
      if (o.tipo === 'c'){ txt(falta(o.g3, 3), 1.28, C.rise); txt(falta(o.g6, 6), 1.28 - 21/s, C.rise); }
      else { txt(o.tipo === 'u' ? 'no hay recta: la fórmula pediría dividir por 0' : o.tipo === 'm' ? 'no hay recta: las sumas no se acercan a un número' : 'no hay recta: las sumas crecen sin tope', 1.28, C.rise); txt('los términos no se acercan a 0', 1.28 - 21/s, C.rise); }
      txt(NOTA[o.tipo], 1.28 - 42/s, C.ink);
      dtQue(S, 'la razón decide si las sumas', 'parciales tienen límite. Elige la razón.');
      T.fin();
    },
    caption:function(v){ var o = DAT[cual(v)]; return 'Primer término 2 y razón ' + dm33Pl(o.r) + '. Sumas parciales: S₃ = ' + dm33Pl(o.S[2]) + ' y S₆ = ' + dm33Pl(o.S[5]) + '. ' + (o.tipo === 'c' ? 'Suma de la serie: ' + dm33Pl(o.L) + '. ' + falta(o.g3, 3).replace('d', 'D').replace(':', '') + '; ' + falta(o.g6, 6).replace(':', '') + '. ' : 'No tiene suma. ') + NOTA[o.tipo].charAt(0).toUpperCase() + NOTA[o.tipo].slice(1) + '.'; },
    readout:function(v){ return dtPasos(lectura(cual(v))); }
  };
})());
