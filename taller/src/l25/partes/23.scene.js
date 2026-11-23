/* L25 H23 · identificar una serie geométrica: en Σ 18/3ⁿ cada término es un tercio del anterior; el cociente general lo prueba para todo n; a = 6, r = 1/3 */
function ig23Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a; }
function ig23Red(a, b){ var g = ig23Mcd(a, b) || 1; if (b < 0){ a = -a; b = -b; } return [a/g, b/g]; }
function ig23Tex(f, d){ var s = f[0] < 0 ? '-' : '', a = Math.abs(f[0]); return f[1] === 1 ? s + a : s + '\\' + (d ? 'd' : 't') + 'frac{' + a + '}{' + f[1] + '}'; }
function ig23Pl(f){ var s = f[0] < 0 ? '−' : '', a = Math.abs(f[0]); return f[1] === 1 ? s + a : s + a + '/' + f[1]; }
function ig23Cl(t){ return Math.max(0, Math.min(1, t)); }
OA.scene('idg-idea', (function(){
  var N = 5, U = 0.44, BX = 0, BH = 0.2, RY = [6.7, 5.55, 4.4, 3.25], VAL = [6, 2, 2/3, 2/9], GA = 1.85, GB = 0.85, GL = 1.8, FX = 3.3;
  var PZ = [['A1', 'a_{1}=6', 'a₁ = 6', 'c-sec'], ['A2', 'a_{2}=2', 'a₂ = 2', 'c-sec'], ['A3', 'a_{3}=\\tfrac{2}{3}', 'a₃ = 2/3', 'c-sec'], ['A4', 'a_{4}=\\tfrac{2}{9}', 'a₄ = 2/9', 'c-sec'],
    ['C1', '\\tfrac{a_{2}}{a_{1}}=\\tfrac{2}{6}=\\tfrac{1}{3}', 'a₂/a₁ = 2/6 = 1/3', 'diff'], ['C2', '\\tfrac{a_{3}}{a_{2}}=\\tfrac{2}{3}:2=\\tfrac{1}{3}', 'a₃/a₂ = 2/3 : 2 = 1/3', 'diff'], ['C3', '\\tfrac{a_{4}}{a_{3}}=\\tfrac{2}{9}:\\tfrac{2}{3}=\\tfrac{1}{3}', 'a₄/a₃ = 2/9 : 2/3 = 1/3', 'diff'],
    ['GN', 'a_{n}', 'aₙ', 'c-sec'], ['GM', 'a_{n+1}', 'aₙ₊₁', 'c-sec'], ['CG', '\\tfrac{a_{n+1}}{a_{n}}=\\tfrac{1}{3}\\ \\text{para todo }n', 'aₙ₊₁/aₙ = 1/3 para todo n', 'diff'],
    ['AA', 'a=6', 'a = 6', 'c-tan'], ['RR', 'r=\\tfrac{1}{3}', 'r = 1/3', 'c-tan'],
    ['HD', 'a\\,r^{\\,n-1}\\text{:}', 'a·rⁿ⁻¹:', 'c-alt'], ['F1', '6\\left(\\tfrac{1}{3}\\right)^{0}', '6·(1/3)⁰', 'c-alt'], ['F2', '6\\left(\\tfrac{1}{3}\\right)^{1}', '6·(1/3)¹', 'c-alt'], ['F3', '6\\left(\\tfrac{1}{3}\\right)^{2}', '6·(1/3)²', 'c-alt'], ['F4', '6\\left(\\tfrac{1}{3}\\right)^{3}', '6·(1/3)³', 'c-alt'],
    ['Q', '\\sum\\nolimits_{n=1}^{\\infty}\\tfrac{18}{3^{n}}\\text{: ¿es geométrica? ¿}a\\text{ y }r\\text{?}', 'Σ 18/3ⁿ (n ≥ 1): ¿es geométrica? ¿a y r?', 'pt'],
    ['F', '\\Longrightarrow\\ \\text{sí: }a=6,\\ \\ r=\\tfrac{1}{3}', '⟹ sí: a = 6, r = 1/3', 'diff'],
    ['R1', 'a_{n}=\\tfrac{18}{3^{n}}:\\quad 6,\\ 2,\\ \\tfrac{2}{3},\\ \\tfrac{2}{9},\\ \\ldots', 'aₙ = 18/3ⁿ: 6, 2, 2/3, 2/9, …', ''],
    ['R2', '\\tfrac{a_{2}}{a_{1}}=\\tfrac{a_{3}}{a_{2}}=\\tfrac{a_{4}}{a_{3}}=\\tfrac{1}{3}', 'a₂/a₁ = a₃/a₂ = a₄/a₃ = 1/3', ''],
    ['R3', '\\tfrac{a_{n+1}}{a_{n}}=\\tfrac{18}{3^{n+1}}\\cdot\\tfrac{3^{n}}{18}=\\tfrac{1}{3}\\ \\text{(todo }n\\text{)}', 'aₙ₊₁/aₙ = (18/3ⁿ⁺¹)·(3ⁿ/18) = 1/3 (todo n)', ''],
    ['R4', '\\text{geométrica: }a=a_{1}=6,\\quad r=\\tfrac{1}{3}', 'geométrica: a = a₁ = 6, r = 1/3', ''],
    ['R5', '\\sum\\nolimits_{n=1}^{\\infty}\\tfrac{18}{3^{n}}=\\sum\\nolimits_{n=1}^{\\infty}6\\left(\\tfrac{1}{3}\\right)^{n-1}', 'Σ 18/3ⁿ = Σ 6·(1/3)ⁿ⁻¹ (n ≥ 1)', 'diff']];
  var TXT = [['Se reemplaza n por 1, 2, 3 y 4: cada barra', 'es un término; su largo es su valor.'],
    ['Cada barra mide un tercio de la de arriba:', 'los tres cocientes valen un tercio.'],
    ['Con el término general se prueba para todo n:', 'el cociente no depende de n.'],
    ['Entonces es geométrica. Primer término: 6.', 'Razón: el cociente, un tercio.'],
    ['Cada término se escribe como 6 por una', 'potencia de un tercio: la forma buscada.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.3, y1:9.6}, aspect:13.9/6.6,
    aria:'Arriba, una franja dice qué muestra: una serie es geométrica si el cociente entre vecinos es el mismo para todo n. Animación en cinco pasos con la serie de término general 18 dividido por 3 elevado a n. Uno: cuatro barras azules horizontales, una bajo la otra, son los cuatro primeros términos: 6, 2, dos tercios y dos novenos; el largo de cada barra es su valor. Dos: cada barra se parte en tres trozos iguales, el primero pintado de naranja, y una línea punteada sube desde el extremo de la barra de abajo hasta el final de ese primer trozo: cada barra mide un tercio de la de arriba; entre cada par de barras queda escrito su cociente, y los tres valen un tercio. Tres: más abajo aparecen dos barras, un término cualquiera y el que le sigue, con la misma marca de un tercio; el cociente general vale un tercio para todo n. Cuatro: la primera barra se remarca en burdeo con el rótulo a igual a 6, y junto a las barras de abajo se escribe r igual a un tercio. Cinco: a la derecha de cada barra se escribe, en verde, el mismo término como 6 por una potencia de un tercio, con exponentes 0, 1, 2 y 3. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, sí, con a igual a 6 y r igual a un tercio, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos (el largo es el valor)</span><span><i class="sw rise"></i> un tercio de cada barra y el cociente entre vecinos</span><span><i class="sw tan"></i> primer término \\(a\\) y razón \\(r\\)</span><span><i class="sw alt"></i> cada término en la forma \\(a\\,r^{\\,n-1}\\)</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w;
      function txt(t, x, y, al){ c.globalAlpha = al == null ? 1 : al; c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function barra(len, yc, col, fa){ var px = X(BX), pw = len*s, py = Y(yc + BH), ph = 2*BH*s; if (pw < 0.4) return; c.globalAlpha = fa; c.fillStyle = col; c.fillRect(px, py, pw, ph); c.globalAlpha = 1; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, Math.max(1, pw - 1), ph - 1); }
      /* un tercio de la barra de arriba (largo len, centro yc) y la punteada que sube desde el extremo de la barra de abajo (centro yd) */
      function tercio(len, yc, yd, w){ var px = X(BX), pw = len*s/3, py = Y(yc + BH), ph = 2*BH*s, j, xx;
        c.globalAlpha = 0.55*w; c.fillStyle = C.rise; c.fillRect(px, py, pw, ph); c.globalAlpha = w; c.strokeStyle = C.rise; c.lineWidth = 1;
        for (j = 1; j <= 2; j++){ xx = px + pw*j; c.beginPath(); c.moveTo(xx, py); c.lineTo(xx, py + ph); c.stroke(); }
        c.setLineDash([3, 3]); c.beginPath(); c.moveTo(px + pw, Y(yd + BH)); c.lineTo(px + pw, Y(yd + BH) + (Y(yc - BH) - Y(yd + BH))*w); c.stroke(); c.setLineDash([]); c.globalAlpha = 1; }
      /* paso 1: los cuatro términos, uno tras otro */
      for (i = 0; i < 4; i++){ w = k === 1 ? ig23Cl(u*4 - i) : 1; if (w > 0) barra(VAL[i]*U*w, RY[i], C.sec, 0.28); if (w > 0.5) L('A' + (i + 1), -1.2, RY[i], 0); }
      /* paso 2: cada barra mide un tercio de la de arriba */
      if (k >= 2) for (i = 0; i < 3; i++){ w = k === 2 ? ig23Cl(u*3 - i) : 1; if (w > 0) tercio(VAL[i]*U, RY[i], RY[i + 1], w); if (w > 0.6) L('C' + (i + 1), 1.25, (RY[i] + RY[i + 1])/2, 0); }
      /* paso 3: un término cualquiera y el que le sigue */
      if (k >= 3){ w = k === 3 ? u : 1; txt('un término cualquiera y el que le sigue:', -1.2, 2.5, Math.min(1, 2*w));
        barra(GL*w, GA, C.sec, 0.28); barra(GL*w/3, GB, C.sec, 0.28); if (w > 0.3){ L('GN', -1.2, GA, 0); L('GM', -1.2, GB, 0); }
        if (w > 0.5) tercio(GL, GA, GB, ig23Cl(2*w - 1)); if (w > 0.8) L('CG', 0.95, (GA + GB)/2, 0); }
      /* paso 4: primer término y razón, en burdeo */
      if (k >= 4){ w = k === 4 ? u : 1; c.globalAlpha = w; c.strokeStyle = C.tan; c.lineWidth = 1 + 1.2*w; c.setLineDash([]); c.strokeRect(X(BX) - 2, Y(RY[0] + BH) - 2, VAL[0]*U*s + 4, 2*BH*s + 4); c.globalAlpha = 1;
        if (w > 0.4) L('AA', BX + VAL[0]*U*2/3, RY[0], -50); if (w > 0.7) L('RR', 3.85, (GA + GB)/2, 0); }
      /* paso 5: cada término en la forma a·rⁿ⁻¹ */
      if (k === 5){ L('HD', FX, 7.32, 0); for (i = 0; i < 4; i++) if (u*4.4 > i + 0.4) L('F' + (i + 1), FX, RY[i], 0); }
      L('Q', -1.2, 8.2, 0); if (k === N && u > 0.5) L('F', -1.2, 7.62, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.05); txt(TXT[k - 1][1], -1.2, 0.05 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.2));
      dtQue(S, 'una serie es geométrica si el cociente', 'entre vecinos es el mismo para todo n.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Dato: término general }a_{n}=\\dfrac{18}{3^{n}},\\ n\\ge 1' + Q + '\\text{Se reemplaza }n\\text{ por }1,\\ 2,\\ 3\\text{ y }4\\text{:}' + Q + 'a_{1}=\\dfrac{18}{3^{1}}=\\dfrac{18}{3}=6,\\qquad a_{2}=\\dfrac{18}{3^{2}}=\\dfrac{18}{9}=2' + Q + 'a_{3}=\\dfrac{18}{3^{3}}=\\dfrac{18}{27}=\\dfrac{2}{3}\\ \\text{(se simplifica por }9)' + Q + 'a_{4}=\\dfrac{18}{3^{4}}=\\dfrac{18}{81}=\\dfrac{2}{9}\\ \\text{(se simplifica por }9)' + Q + '\\text{Serie: }6+2+\\dfrac{2}{3}+\\dfrac{2}{9}+\\cdots',
      '\\text{Cociente: cada término dividido por el anterior.}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{2}{6}=\\dfrac{1}{3}\\ \\text{(se simplifica por }2)' + Q + '\\dfrac{a_{3}}{a_{2}}=\\dfrac{2}{3}:2=\\dfrac{2}{3}\\cdot\\dfrac{1}{2}=\\dfrac{2}{6}=\\dfrac{1}{3}' + Q + '\\dfrac{a_{4}}{a_{3}}=\\dfrac{2}{9}:\\dfrac{2}{3}=\\dfrac{2}{9}\\cdot\\dfrac{3}{2}=\\dfrac{6}{18}=\\dfrac{1}{3}' + Q + '\\text{Los tres son iguales: parece geométrica.}',
      '\\text{Falta probarlo para todo }n.' + Q + '\\text{Término siguiente: }a_{n+1}=\\dfrac{18}{3^{n+1}}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{18}{3^{n+1}}\\cdot\\dfrac{3^{n}}{18}=\\dfrac{18\\cdot 3^{n}}{18\\cdot 3^{n+1}}' + Q + '\\text{Se simplifica por }18\\text{: }\\dfrac{3^{n}}{3^{n+1}}' + Q + '\\text{Como }3^{n+1}=3^{n}\\cdot 3\\text{, se simplifica por }3^{n}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{1}{3}',
      '\\dfrac{1}{3}\\text{ no depende de }n\\text{: la serie es geométrica.}' + Q + '\\text{Razón: el cociente, }r=\\dfrac{1}{3}' + Q + '\\text{Primer término: }a=a_{1}=6\\ \\ (\\text{no es }18)',
      '\\text{Forma }a\\,r^{\\,n-1}\\text{, con }a=6\\text{ y }r=\\dfrac{1}{3}\\text{:}' + Q + '\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{18}{3^{n}}=\\sum_{n=1}^{\\infty}6\\left(\\dfrac{1}{3}\\right)^{n-1}' + Q + '\\text{Comprobación con }n=4\\text{:}' + Q + '\\left(\\dfrac{1}{3}\\right)^{3}=\\dfrac{1}{27},\\qquad 6\\cdot\\dfrac{1}{27}=\\dfrac{6}{27}=\\dfrac{2}{9}=a_{4}' + Q + '\\text{Para qué sirve: }|r|=\\dfrac{1}{3}<1\\text{, y entonces}' + Q + '\\text{la serie converge (hoja «Series geométricas}' + Q + '\\text{infinitas»). Aquí no se suma.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: siete series por su término general; cinco términos, cuatro cocientes entre vecinos y su gráfica */
OA.scene('idg-vivo', (function(){
  var NS = 7, Q = '\\\\&\\qquad ', SU = '\\displaystyle\\sum_{n=1}^{\\infty}', NO = '\\text{No hay un número }r\\text{ que sirva para todo }n\\text{:}' + Q + '\\text{la serie no se puede escribir como }' + SU + 'a\\,r^{\\,n-1}.';
  /* cada serie: término general (TeX y respaldo), función n ↦ [numerador, denominador], si es geométrica, frase de apoyo y lectura completa */
  var SER = [
    {tx:'\\tfrac{5}{2^{n}}', pl:'5/2ⁿ', f:function(n){ return [5, Math.pow(2, n)]; }, geo:1, nota:'razón entre 0 y 1: los términos se achican',
      vt:'a=\\tfrac{5}{2},\\ \\ r=\\tfrac{1}{2}:\\quad\\sum\\nolimits_{n=1}^{\\infty}\\tfrac{5}{2}\\left(\\tfrac{1}{2}\\right)^{n-1}', vp:'a = 5/2, r = 1/2: Σ (5/2)·(1/2)ⁿ⁻¹',
      R:['\\text{Dato: término general }a_{n}=\\dfrac{5}{2^{n}},\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=\\dfrac{5}{2^{1}}=\\dfrac{5}{2},\\quad a_{2}=\\dfrac{5}{2^{2}}=\\dfrac{5}{4},\\quad a_{3}=\\dfrac{5}{2^{3}}=\\dfrac{5}{8}',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{5}{4}\\cdot\\dfrac{2}{5}=\\dfrac{10}{20}=\\dfrac{1}{2}' + Q + '\\dfrac{a_{3}}{a_{2}}=\\dfrac{5}{8}\\cdot\\dfrac{4}{5}=\\dfrac{20}{40}=\\dfrac{1}{2}',
        '\\text{Cociente general, con }a_{n+1}=\\dfrac{5}{2^{n+1}}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{5}{2^{n+1}}\\cdot\\dfrac{2^{n}}{5}=\\dfrac{5\\cdot 2^{n}}{5\\cdot 2^{n+1}}' + Q + '\\text{Se simplifica por }5\\text{ y, como }2^{n+1}=2^{n}\\cdot 2,' + Q + '\\text{por }2^{n}\\text{: queda }\\dfrac{1}{2}',
        '\\dfrac{1}{2}\\text{ no depende de }n\\text{: la serie es geométrica.}' + Q + '\\text{(En el dibujo: los puntos, en una recta horizontal.)}',
        'a=a_{1}=\\dfrac{5}{2},\\qquad r=\\dfrac{1}{2}' + Q + SU + '\\dfrac{5}{2^{n}}=' + SU + '\\dfrac{5}{2}\\left(\\dfrac{1}{2}\\right)^{n-1}' + Q + '\\text{Comprobación con }n=3\\text{:}' + Q + '\\left(\\dfrac{1}{2}\\right)^{2}=\\dfrac{1}{4},\\qquad\\dfrac{5}{2}\\cdot\\dfrac{1}{4}=\\dfrac{5}{8}=a_{3}']},
    {tx:'\\tfrac{1}{n}', pl:'1/n', f:function(n){ return [1, n]; }, geo:0, nota:'el cociente depende de n: no hay razón',
      R:['\\text{Dato: término general }a_{n}=\\dfrac{1}{n},\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=\\dfrac{1}{1}=1,\\quad a_{2}=\\dfrac{1}{2},\\quad a_{3}=\\dfrac{1}{3}',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{1}{2}:1=\\dfrac{1}{2}' + Q + '\\dfrac{a_{3}}{a_{2}}=\\dfrac{1}{3}\\cdot\\dfrac{2}{1}=\\dfrac{2}{3}',
        '\\text{Cociente general, con }a_{n+1}=\\dfrac{1}{n+1}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{1}{n+1}\\cdot\\dfrac{n}{1}=\\dfrac{n}{n+1}',
        '\\dfrac{n}{n+1}\\text{ depende de }n\\text{: con }n=1\\text{ vale }\\dfrac{1}{2}\\text{;}' + Q + '\\text{con }n=2\\text{ vale }\\dfrac{2}{3}.\\ \\text{En cruz: }1\\cdot 3=3,\\ 2\\cdot 2=4.' + Q + '3\\neq 4\\text{: son distintos. No es geométrica.}',
        NO + Q + '\\text{(Es la serie armónica, de la hoja}' + Q + '\\text{«Series harmónicas y series-p».)}']},
    {tx:'\\tfrac{(-1)^{n}\\cdot 2}{3^{n}}', pl:'(−1)ⁿ·2/3ⁿ', f:function(n){ return [(n % 2 ? -2 : 2), Math.pow(3, n)]; }, geo:1, nota:'razón negativa: los signos se alternan',
      vt:'a=-\\tfrac{2}{3},\\ \\ r=-\\tfrac{1}{3}:\\quad\\sum\\nolimits_{n=1}^{\\infty}\\left(-\\tfrac{2}{3}\\right)\\left(-\\tfrac{1}{3}\\right)^{n-1}', vp:'a = −2/3, r = −1/3: Σ (−2/3)·(−1/3)ⁿ⁻¹',
      R:['\\text{Dato: término general }a_{n}=\\dfrac{(-1)^{n}\\cdot 2}{3^{n}},\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=\\dfrac{(-1)^{1}\\cdot 2}{3^{1}}=\\dfrac{-2}{3}=-\\dfrac{2}{3}' + Q + 'a_{2}=\\dfrac{(-1)^{2}\\cdot 2}{3^{2}}=\\dfrac{2}{9},\\qquad a_{3}=\\dfrac{(-1)^{3}\\cdot 2}{3^{3}}=-\\dfrac{2}{27}',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{2}{9}\\cdot\\left(-\\dfrac{3}{2}\\right)=-\\dfrac{6}{18}=-\\dfrac{1}{3}' + Q + '\\dfrac{a_{3}}{a_{2}}=-\\dfrac{2}{27}\\cdot\\dfrac{9}{2}=-\\dfrac{18}{54}=-\\dfrac{1}{3}',
        '\\text{Cociente general, con }a_{n+1}=\\dfrac{(-1)^{n+1}\\cdot 2}{3^{n+1}}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{(-1)^{n+1}\\cdot 2\\cdot 3^{n}}{(-1)^{n}\\cdot 2\\cdot 3^{n+1}}' + Q + '(-1)^{n+1}=(-1)^{n}\\cdot(-1),\\qquad 3^{n+1}=3^{n}\\cdot 3' + Q + '\\text{Se simplifica por }(-1)^{n}\\text{, por }2\\text{ y por }3^{n}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{-1}{3}=-\\dfrac{1}{3}',
        '-\\dfrac{1}{3}\\text{ no depende de }n\\text{: la serie es geométrica.}' + Q + '\\text{La razón es negativa: los signos se alternan.}',
        'a=a_{1}=-\\dfrac{2}{3},\\qquad r=-\\dfrac{1}{3}' + Q + SU + '\\dfrac{(-1)^{n}\\cdot 2}{3^{n}}=' + SU + '\\left(-\\dfrac{2}{3}\\right)\\left(-\\dfrac{1}{3}\\right)^{n-1}' + Q + '\\text{Comprobación con }n=3\\text{:}' + Q + '\\left(-\\dfrac{1}{3}\\right)^{2}=\\dfrac{1}{9},\\qquad-\\dfrac{2}{3}\\cdot\\dfrac{1}{9}=-\\dfrac{2}{27}=a_{3}']},
    {tx:'\\tfrac{n}{2^{n}}', pl:'n/2ⁿ', f:function(n){ return [n, Math.pow(2, n)]; }, geo:0, nota:'el cociente depende de n: no hay razón',
      R:['\\text{Dato: término general }a_{n}=\\dfrac{n}{2^{n}},\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=\\dfrac{1}{2^{1}}=\\dfrac{1}{2},\\qquad a_{2}=\\dfrac{2}{2^{2}}=\\dfrac{2}{4}=\\dfrac{1}{2}' + Q + 'a_{3}=\\dfrac{3}{2^{3}}=\\dfrac{3}{8}',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{1}{2}\\cdot\\dfrac{2}{1}=\\dfrac{2}{2}=1' + Q + '\\dfrac{a_{3}}{a_{2}}=\\dfrac{3}{8}\\cdot\\dfrac{2}{1}=\\dfrac{6}{8}=\\dfrac{3}{4}',
        '\\text{Cociente general, con }a_{n+1}=\\dfrac{n+1}{2^{n+1}}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{n+1}{2^{n+1}}\\cdot\\dfrac{2^{n}}{n}=\\dfrac{(n+1)\\cdot 2^{n}}{n\\cdot 2^{n+1}}' + Q + '\\text{Como }2^{n+1}=2^{n}\\cdot 2\\text{, se simplifica por }2^{n}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{n+1}{2n}',
        '\\dfrac{n+1}{2n}\\text{ depende de }n\\text{: con }n=1\\text{ vale }\\dfrac{2}{2}=1\\text{;}' + Q + '\\text{con }n=2\\text{ vale }\\dfrac{3}{4}.\\ \\text{Como }1\\neq\\dfrac{3}{4}\\text{,}' + Q + '\\text{no es geométrica.}',
        NO + Q + '\\text{Tener }2^{n}\\text{ abajo no basta: el }n\\text{ de arriba}' + Q + '\\text{cambia el cociente.}']},
    {tx:'\\tfrac{3^{n}}{2^{n+1}}', pl:'3ⁿ/2ⁿ⁺¹', f:function(n){ return [Math.pow(3, n), Math.pow(2, n + 1)]; }, geo:1, nota:'razón mayor que 1: geométrica igual (diverge)',
      vt:'a=\\tfrac{3}{4},\\ \\ r=\\tfrac{3}{2}:\\quad\\sum\\nolimits_{n=1}^{\\infty}\\tfrac{3}{4}\\left(\\tfrac{3}{2}\\right)^{n-1}', vp:'a = 3/4, r = 3/2: Σ (3/4)·(3/2)ⁿ⁻¹',
      R:['\\text{Dato: término general }a_{n}=\\dfrac{3^{n}}{2^{n+1}},\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=\\dfrac{3^{1}}{2^{2}}=\\dfrac{3}{4},\\qquad a_{2}=\\dfrac{3^{2}}{2^{3}}=\\dfrac{9}{8}' + Q + 'a_{3}=\\dfrac{3^{3}}{2^{4}}=\\dfrac{27}{16}',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{9}{8}\\cdot\\dfrac{4}{3}=\\dfrac{36}{24}=\\dfrac{3}{2}' + Q + '\\dfrac{a_{3}}{a_{2}}=\\dfrac{27}{16}\\cdot\\dfrac{8}{9}=\\dfrac{216}{144}=\\dfrac{3}{2}',
        '\\text{Cociente general, con }a_{n+1}=\\dfrac{3^{n+1}}{2^{n+2}}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{3^{n+1}}{2^{n+2}}\\cdot\\dfrac{2^{n+1}}{3^{n}}=\\dfrac{3^{n+1}\\cdot 2^{n+1}}{3^{n}\\cdot 2^{n+2}}' + Q + '3^{n+1}=3^{n}\\cdot 3,\\qquad 2^{n+2}=2^{n+1}\\cdot 2' + Q + '\\text{Se simplifica por }3^{n}\\text{ y por }2^{n+1}\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{3}{2}',
        '\\dfrac{3}{2}\\text{ no depende de }n\\text{: la serie es geométrica.}',
        'a=a_{1}=\\dfrac{3}{4},\\qquad r=\\dfrac{3}{2}' + Q + SU + '\\dfrac{3^{n}}{2^{n+1}}=' + SU + '\\dfrac{3}{4}\\left(\\dfrac{3}{2}\\right)^{n-1}' + Q + '\\text{Comprobación con }n=3\\text{:}' + Q + '\\left(\\dfrac{3}{2}\\right)^{2}=\\dfrac{9}{4},\\qquad\\dfrac{3}{4}\\cdot\\dfrac{9}{4}=\\dfrac{27}{16}=a_{3}' + Q + '\\text{Es geométrica aunque }|r|=\\dfrac{3}{2}\\ge 1\\text{; por eso}' + Q + '\\text{diverge (hoja «Series geométricas infinitas»).}']},
    {tx:'(2n+1)', pl:'(2n + 1)', f:function(n){ return [2*n + 1, 1]; }, geo:0, nota:'es aritmética: lo constante es la resta',
      R:['\\text{Dato: término general }a_{n}=2n+1,\\ n\\ge 1',
        '\\text{Primeros términos (se reemplaza }n\\text{):}' + Q + 'a_{1}=2\\cdot 1+1=3,\\qquad a_{2}=2\\cdot 2+1=5' + Q + 'a_{3}=2\\cdot 3+1=7',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{5}{3},\\qquad\\dfrac{a_{3}}{a_{2}}=\\dfrac{7}{5}',
        '\\text{Cociente general. Término siguiente:}' + Q + 'a_{n+1}=2(n+1)+1=2n+2+1=2n+3' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{2n+3}{2n+1}',
        '\\dfrac{2n+3}{2n+1}\\text{ depende de }n\\text{: con }n=1\\text{ vale }\\dfrac{5}{3}\\text{;}' + Q + '\\text{con }n=2\\text{ vale }\\dfrac{7}{5}.\\ \\text{En cruz: }5\\cdot 5=25,\\ 3\\cdot 7=21.' + Q + '25\\neq 21\\text{: son distintos. No es geométrica.}',
        NO + Q + '\\text{Lo constante aquí es la resta: }5-3=2,\\ 7-5=2.' + Q + '\\text{Es aritmética, de diferencia }2\\text{ (hoja}' + Q + '\\text{«Sucesiones aritméticas»).}']},
    {tx:'2', pl:'2', f:function(n){ return [2, 1]; }, geo:1, nota:'caso límite: razón 1, todos los términos iguales',
      vt:'a=2,\\ \\ r=1:\\quad\\sum\\nolimits_{n=1}^{\\infty}2\\cdot 1^{\\,n-1}', vp:'a = 2, r = 1: Σ 2·1ⁿ⁻¹',
      R:['\\text{Dato: término general }a_{n}=2\\text{ (constante)},\\ n\\ge 1',
        '\\text{Primeros términos: no hay }n\\text{ que reemplazar.}' + Q + 'a_{1}=2,\\qquad a_{2}=2,\\qquad a_{3}=2',
        '\\text{Cocientes entre vecinos:}' + Q + '\\dfrac{a_{2}}{a_{1}}=\\dfrac{2}{2}=1,\\qquad\\dfrac{a_{3}}{a_{2}}=\\dfrac{2}{2}=1',
        '\\text{Cociente general, con }a_{n+1}=2\\text{:}' + Q + '\\dfrac{a_{n+1}}{a_{n}}=\\dfrac{2}{2}=1',
        '1\\text{ no depende de }n\\text{: la serie es geométrica.}',
        'a=a_{1}=2,\\qquad r=1' + Q + SU + '2=' + SU + '2\\cdot 1^{\\,n-1}' + Q + '\\text{Comprobación: }1^{\\,n-1}=1\\text{, y }2\\cdot 1=2.' + Q + '\\text{Caso límite: razón }1\\text{, todos los términos}' + Q + '\\text{iguales. También es aritmética, de diferencia }0.' + Q + '\\text{Como }|r|=1\\ge 1\\text{, diverge (hoja «Series}' + Q + '\\text{geométricas infinitas»).}']}];
  var PZ = [['YB', '\\tfrac{a_{n+1}}{a_{n}}', 'aₙ₊₁/aₙ', 'diff']];
  SER.forEach(function(e, s){ var i, f, g;
    e.t = []; e.c = []; for (i = 1; i <= 5; i++){ f = e.f(i); e.t.push(ig23Red(f[0], f[1])); }
    for (i = 0; i < 4; i++){ f = e.t[i]; g = e.t[i + 1]; e.c.push(ig23Red(g[0]*f[1], g[1]*f[0])); }
    e.r = e.c[0];
    PZ.push(['S' + s, '\\sum\\nolimits_{n=1}^{\\infty}' + e.tx, 'Σ ' + e.pl + ' (n ≥ 1)', 'pt']);
    for (i = 0; i < 5; i++) PZ.push(['T' + s + i, ig23Tex(e.t[i]), ig23Pl(e.t[i]), 'c-sec']);
    for (i = 0; i < 4; i++){ PZ.push(['K' + s + i, ig23Tex(e.c[i]), ig23Pl(e.c[i]), 'diff']); PZ.push(['P' + s + i, ig23Tex(e.c[i]), ig23Pl(e.c[i]), 'diff']); }
    if (e.geo){ PZ.push(['V' + s, e.vt, e.vp, 'c-tan']); PZ.push(['L' + s, 'r=' + ig23Tex(e.r), 'r = ' + ig23Pl(e.r), 'c-tan']); } });
  function gx(n){ return 0.1 + 0.9*n; } function gy(q){ return 1.85 + q; } function tx(i){ return -0.6 + 1.2*i; }
  function cual(v){ return Math.max(1, Math.min(NS, Math.round(v.s || 1))) - 1; }
  return {
    world:{x0:-1.3, x1:5.3, y0:-1.25, y1:8.6}, aspect:9.85/6.6,
    aria:'Arriba, una franja dice qué muestra: si los cocientes entre vecinos son iguales, la serie es geométrica. Un deslizador elige una de siete series, cada una dada por su término general. Para la serie elegida se muestran, en una fila azul, sus cinco primeros términos y, en una fila naranja debajo, los cuatro cocientes entre términos vecinos. Más abajo, una gráfica: en horizontal va n, de 1 a 4; en vertical, el cociente entre el término siguiente y el término. Cada cociente es un punto naranja, con su valor escrito y una línea punteada hasta el eje vertical. Cuando los cuatro puntos están a la misma altura, una recta burdeo horizontal pasa por ellos, rotulada con la razón r; cuando están a alturas distintas, no hay recta. Serie 1, 5 dividido por 2 elevado a n: cocientes iguales a un medio, geométrica. Serie 2, 1 dividido por n: cocientes un medio, dos tercios, tres cuartos y cuatro quintos, no es geométrica. Serie 3, menos 1 elevado a n por 2 dividido por 3 elevado a n: cocientes iguales a menos un tercio, geométrica. Serie 4, n dividido por 2 elevado a n: cocientes 1, tres cuartos, dos tercios y cinco octavos, no es geométrica. Serie 5, 3 elevado a n dividido por 2 elevado a n más 1: cocientes iguales a tres medios, geométrica. Serie 6, 2 n más 1: cocientes cinco tercios, siete quintos, nueve séptimos y once novenos, no es geométrica; es aritmética. Serie 7, la constante 2: cocientes iguales a 1, geométrica de razón 1, el caso límite. Bajo el dibujo, frases dicen la conclusión y, más abajo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'s', tex:'\\text{serie}', min:1, max:NS, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los cinco primeros términos</span><span><i class="sw rise"></i> los cocientes entre vecinos, \\(\\tfrac{a_{n+1}}{a_{n}}\\)</span><span><i class="sw tan"></i> la razón \\(r\\), cuando los cocientes son iguales</span><span>líneas punteadas: llevan cada cociente a su valor en el eje</span>',
    anim:{run:35000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.s = Math.min(NS, 1 + Math.floor(p*NS)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = cual(v), e = SER[s], C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', i, q, xm, col = e.geo ? C.tan : C.rise;
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* la serie elegida y sus cinco primeros términos */
      txt('serie ' + (s + 1) + ' de ' + NS + ':', X(-1.2), Y(7.15), 'left', C.ink); T.L('S' + s, 0.45, 7.15, 0);
      for (i = 0; i < 5; i++){ num('a' + ssSub(i + 1), X(tx(i)), Y(6.62), 'center'); T.L('T' + s + i, tx(i), 6.15, -50); }
      num('…', X(tx(4) + 0.7), Y(6.15), 'center');
      /* cocientes entre vecinos: el término de la derecha dividido por el de la izquierda */
      for (i = 0; i < 4; i++){ xm = (tx(i) + tx(i + 1))/2; c.strokeStyle = C.rise; c.lineWidth = 1; c.setLineDash([]); c.beginPath(); c.moveTo(X(tx(i)), Y(5.84)); c.lineTo(X(xm), Y(5.52)); c.lineTo(X(tx(i + 1)), Y(5.84)); c.stroke(); T.L('K' + s + i, xm, 5.17, -50); }
      txt('cocientes: cada término dividido por el anterior', X(-1.2), Y(4.74), 'left', C.rise);
      /* gráfica de los cocientes */
      S.line(gx(0), gy(-1), gx(4.6), gy(-1), {color:C.ink, width:1.1}); S.line(gx(0), gy(-1), gx(0), gy(2.1), {color:C.ink, width:1.1});
      c.strokeStyle = C.muted || '#6b6b6b'; c.globalAlpha = 0.5; c.lineWidth = 0.8; c.beginPath(); c.moveTo(X(gx(0)), Y(gy(0))); c.lineTo(X(gx(4.6)), Y(gy(0))); c.stroke(); c.globalAlpha = 1;
      c.strokeStyle = C.ink; c.lineWidth = 1;
      for (i = 1; i <= 4; i++){ c.beginPath(); c.moveTo(X(gx(i)), Y(gy(-1)) - 3); c.lineTo(X(gx(i)), Y(gy(-1)) + 3); c.stroke(); num('' + i, X(gx(i)), Y(gy(-1)) + 11, 'center'); }
      [[-1, '−1'], [-0.5, '−0,5'], [0, '0'], [0.5, '0,5'], [1, '1'], [1.5, '1,5'], [2, '2']].forEach(function(m){ c.beginPath(); c.moveTo(X(gx(0)) - 3, Y(gy(m[0]))); c.lineTo(X(gx(0)) + 3, Y(gy(m[0]))); c.stroke(); num(m[1], X(gx(0)) - 7, Y(gy(m[0])), 'right'); });
      num('n', X(gx(4.6)) + 7, Y(gy(-1)), 'left'); T.L('YB', gx(0), 4.22, -50);
      if (e.geo){ q = e.r[0]/e.r[1]; c.strokeStyle = C.tan; c.lineWidth = 1.4; c.setLineDash([5, 4]); c.beginPath(); c.moveTo(X(gx(0)), Y(gy(q))); c.lineTo(X(gx(4.45)), Y(gy(q))); c.stroke(); c.setLineDash([]); T.L('L' + s, gx(4.45), gy(q), 0, 5, 0); }
      for (i = 0; i < 4; i++){ q = e.c[i][0]/e.c[i][1];
        c.strokeStyle = C.rise; c.globalAlpha = 0.6; c.lineWidth = 0.9; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(gx(i + 1)), Y(gy(q))); c.lineTo(X(gx(0)), Y(gy(q))); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
        c.beginPath(); c.arc(X(gx(0)), Y(gy(q)), 2.2, 0, 6.2832); c.fillStyle = C.rise; c.fill();
        c.beginPath(); c.arc(X(gx(i + 1)), Y(gy(q)), 3.5, 0, 6.2832); c.fillStyle = C.rise; c.fill();
        T.L('P' + s + i, gx(i + 1), gy(q), -50, 0, (q < 0 || e.c[1][0]*e.c[0][1] > e.c[0][0]*e.c[1][1]) ? 17 : -17); }
      /* conclusión, junto al dibujo */
      txt(e.geo ? 'cocientes iguales, en una recta: es geométrica' : 'cocientes distintos, sin recta: no es geométrica', X(-1.2), Y(0.3), 'left', col);
      if (e.geo){ T.L('V' + s, -1.2, -0.3, 0); txt(e.nota, X(-1.2), Y(-0.9), 'left', C.ink); } else txt(e.nota, X(-1.2), Y(0.3) + 21, 'left', C.ink);
      dtQue(S, 'si los cocientes entre vecinos son', 'iguales, la serie es geométrica. Mueve «serie».');
      T.fin();
    },
    caption:function(v){ var s = cual(v), e = SER[s]; return 'Serie ' + (s + 1) + ' de ' + NS + ', de término general ' + e.pl + ': ' + (e.geo ? 'los cocientes entre vecinos son iguales; es geométrica, con primer término ' + ig23Pl(e.t[0]) + ' y razón ' + ig23Pl(e.r) + '.' : 'los cocientes entre vecinos cambian; no es geométrica.'); },
    readout:function(v){ return dtPasos(SER[cual(v)].R); }
  };
})());
