/* L25 H10 · suma de una sucesión aritmética: la suma y su copia al revés forman un rectángulo de n columnas de altura a₁ + aₙ */
OA.scene('sar-idea', (function(){
  var N = 5, A = [2, 5, 8, 11], XC = [-0.6, 0.5, 1.6, 2.7], W = 0.7, YB = 1.3, K = 0.19;
  var PZ = [['T1', '2', '2', 'c-sec'], ['T2', '5', '5', 'c-sec'], ['T3', '8', '8', 'c-sec'], ['T4', '11', '11', 'c-sec'],
    ['G1', '11', '11', 'c-alt'], ['G2', '8', '8', 'c-alt'], ['G3', '5', '5', 'c-alt'], ['G4', '2', '2', 'c-alt'],
    ['C1', '13', '13', 'diff'], ['C2', '13', '13', 'diff'], ['C3', '13', '13', 'diff'], ['C4', '13', '13', 'diff'],
    ['RA', '4\\cdot 13=52', '4 · 13 = 52', 'diff'], ['RB', 'S_{4}=26', 'S₄ = 26', 'c-sec'],
    ['Q', 'S_{4}=2+5+8+11=\\ ?', 'S₄ = 2 + 5 + 8 + 11 = ?', 'pt'], ['F', '\\Longrightarrow\\ S_{4}=26', '⟹ S₄ = 26', 'diff'],
    ['R1', 'S_{4}=2+5+8+11', 'S₄ = 2 + 5 + 8 + 11', ''],
    ['R2', 'S_{4}=11+8+5+2', 'S₄ = 11 + 8 + 5 + 2', ''],
    ['R3', '2\\,S_{4}=(2+11)+(5+8)+(8+5)+(11+2)', '2 S₄ = (2+11) + (5+8) + (8+5) + (11+2)', ''],
    ['R4', '2\\,S_{4}=13+13+13+13=4\\cdot 13=52', '2 S₄ = 13 + 13 + 13 + 13 = 4 · 13 = 52', ''],
    ['R5', 'S_{4}=\\tfrac{52}{2}=26\\quad\\Rightarrow\\quad S_{n}=\\tfrac{n\\,(a_{1}+a_{n})}{2}', 'S₄ = 52 / 2 = 26  ⇒  Sₙ = n (a₁ + aₙ) / 2', 'diff']];
  var TXT = [['Cuatro términos, dibujados como columnas.', 'La suma es toda la zona azul.'],
    ['Encima va la misma suma, escrita al revés:', '11 sobre el 2, 8 sobre el 5, y así.'],
    ['Cada columna completa mide lo mismo:', 'el primer término más el último, 13.'],
    ['Las cuatro columnas forman un rectángulo:', 'vale 4 por 13, el doble de la suma.'],
    ['La suma es la mitad del rectángulo:', '52 dividido por 2, que es 26.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:5.8}, aspect:10.4/6.6,
    aria:'Animación en cinco pasos con la suma 2 más 5 más 8 más 11. Uno: los cuatro términos aparecen como columnas azules de esas alturas. Dos: encima de cada columna crece una columna verde con los mismos términos en orden contrario: 11 sobre el 2, 8 sobre el 5, 5 sobre el 8 y 2 sobre el 11. Tres: cada columna completa queda bordeada de naranja y mide 13. Cuatro: las cuatro columnas forman un rectángulo de 4 por 13, igual a 52, que es dos veces la suma. Cinco: la parte azul, la mitad del rectángulo, se intensifica y queda rotulada: es la suma, 26; la respuesta se escribe junto a la pregunta. Nada de lo que aparece se borra: columnas, bordes y rótulos quedan hasta el final. Arriba, una franja dice qué muestra la animación. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> la suma</span><span><i class="sw alt"></i> la misma suma, con los términos al revés</span><span><i class="sw rise"></i> cada columna completa y el rectángulo</span>',
    anim:{run:30000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, g, w, a, b, ag;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function caja(xc, y0, y1, col, al, dash, lw){ if (y1 - y0 < 1e-6) return; if (al > 0) S.poly([[xc - W/2, y0], [xc + W/2, y0], [xc + W/2, y1], [xc - W/2, y1]], {fill:col, alpha:al});
        c.strokeStyle = col; c.lineWidth = lw || 1; c.setLineDash(dash ? [4, 3] : []); c.strokeRect(X(xc - W/2) + 0.5, Y(y1) + 0.5, W*s - 1, (y1 - y0)*s - 1); c.setLineDash([]); }
      g = k === 1 ? u : 1;
      S.line(-1.15, YB, 3.25, YB, {color:C.ink, width:1.1});
      ag = 0.3; /* nada desaparece: la mitad verde queda; en el paso 5 se intensifica la azul */
      for (i = 0; i < 4; i++){ a = YB + K*A[i]*g; caja(XC[i], YB, a, C.sec, k === 5 ? 0.26 + 0.2*u : 0.26);
        if (k > 1 || u > 0.6) L('T' + (i + 1), XC[i], YB + K*A[i]/2, -50);
        if (k >= 2){ w = k === 2 ? u : 1; b = a + K*A[3 - i]*w; caja(XC[i], a, b, C.alt, ag);
          if (w > 0.6) L('G' + (i + 1), XC[i], a + K*A[3 - i]/2, -50); }
        if (k >= 3){ c.globalAlpha = k === 3 ? u : 1; caja(XC[i], YB, YB + K*13, C.rise, 0, 0, 2); c.globalAlpha = 1; }
        if (k > 3 || (k === 3 && u > 0.5)) L('C' + (i + 1), XC[i], YB + K*13, -50, 0, -11); }
      if (k >= 4){ w = k === 4 ? u : 1; c.globalAlpha = w; c.strokeStyle = C.rise; c.lineWidth = 2; c.strokeRect(X(XC[0] - W/2) - 2, Y(YB + K*13) - 2, (XC[3] - XC[0] + W)*s + 4, K*13*s + 4); c.globalAlpha = 1;
        /* cotas del rectángulo: alto 13, a la derecha */
        c.strokeStyle = C.rise; c.lineWidth = 1; c.beginPath(); c.moveTo(X(3.3), Y(YB)); c.lineTo(X(3.3), Y(YB + K*13*w)); c.stroke();
        if (w > 0.5) L('RA', 3.42, YB + K*13*0.62, 0);
        if (k === 5 && u > 0.5) L('RB', 3.42, YB + K*13*0.28, 0); }
      L('Q', -1.2, 4.45, 0); if (k === N && u > 0.5) L('F', 1.55, 4.45, 0); /* la pregunta queda; la respuesta se escribe a su lado */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.45));
      dtQue(S, 'la suma y su copia al revés forman', 'un rectángulo; la suma es su mitad.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 34, 62, 90, 120]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['a_{1}=2,\\ a_{2}=5,\\ a_{3}=8,\\ a_{4}=11' + Q + 'S_{4}=\\displaystyle\\sum_{k=1}^{4}a_{k}=2+5+8+11',
      '\\text{La misma suma, del último al primero:}' + Q + 'S_{4}=11+8+5+2',
      '\\text{Se suman las dos, columna a columna:}' + Q + '2\\,S_{4}=(2+11)+(5+8)+(8+5)+(11+2)' + Q + '2+11=13,\\qquad 5+8=13' + Q + '8+5=13,\\qquad 11+2=13',
      '2\\,S_{4}=13+13+13+13=4\\cdot 13=52',
      '\\text{Se divide por 2: }S_{4}=\\dfrac{52}{2}=26' + Q + '\\text{De dónde salió cada número:}' + Q + '4=n\\ \\text{(cantidad de términos)}' + Q + '13=2+11=a_{1}+a_{4}\\ \\text{(primero más último)}' + Q + '\\text{En general: }S_{n}=\\dfrac{n\\,(a_{1}+a_{n})}{2}' + Q + '\\text{Aquí: }S_{4}=\\dfrac{4\\cdot(2+11)}{2}=\\dfrac{4\\cdot 13}{2}=\\dfrac{52}{2}=26'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: 1 + 2 + … + n; la escalera y su copia al revés forman un rectángulo de n por (n + 1) */
OA.scene('sar-vivo', (function(){
  var PZ = [['AN', 'n', 'n', 'c-sec'], ['AL', 'n+1', 'n + 1', 'diff']];
  return {
    world:{x0:-1.6, x1:12.2, y0:-3.3, y1:13.4}, aspect:16.7/13.8,
    aria:'Una escalera de cuadraditos azules: la primera columna tiene 1 cuadradito, la segunda 2, y así hasta la columna n, que tiene n. Encima, una copia verde de la misma escalera, al revés, completa un rectángulo de n columnas y n más 1 cuadraditos de alto. La suma 1 más 2 más, hasta n, es la mitad del rectángulo: n por n más 1, dividido por 2. Al mover n, cambian la escalera y la cuenta. Con n igual a 1 hay un cuadradito azul y uno verde, y la suma es 1. Arriba, una franja dice qué muestra la animación. Bajo el dibujo, la cuenta completa: datos, fórmula, reemplazo, suma del paréntesis, producto y mitad.',
    labels:PZ,
    sliders:[{id:'n', tex:'n', min:1, max:10, step:1, value:6}],
    legend:'<span><i class="sw sec"></i> \\(1+2+\\cdots+n\\)</span><span><i class="sw alt"></i> la misma suma, al revés</span><span><i class="sw rise"></i> alto del rectángulo: \\(n+1\\)</span>',
    anim:{run:20000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(10, 1 + Math.floor(p*10)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = Math.round(v.n || 6), C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, j;
      for (i = 1; i <= n; i++) for (j = 1; j <= n + 1; j++){ c.fillStyle = j <= i ? C.sec : C.alt; c.globalAlpha = j <= i ? 0.42 : 0.26; c.fillRect(X(i - 1) + 1, Y(j) + 1, s - 2, s - 2); c.globalAlpha = 1; }
      c.strokeStyle = C.sec; c.lineWidth = 1.4; c.beginPath(); c.moveTo(X(0), Y(0)); for (i = 1; i <= n; i++){ c.lineTo(X(i - 1), Y(i)); c.lineTo(X(i), Y(i)); } c.lineTo(X(n), Y(0)); c.closePath(); c.stroke();
      S.line(n + 0.35, 0, n + 0.35, n + 1, {color:C.rise, width:1.6}); T.L('AL', n + 0.35, (n + 1)/2, 0, 6, 0);
      S.line(0, -0.35, n, -0.35, {color:C.sec, width:1.6}); T.L('AN', n/2, -0.35, -50, 0, 12);
      c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle';
      c.fillText('Azul: la escalera. Verde: su copia, al revés.', X(-1.4), Y(-1.7));
      c.fillText(n === 1 ? 'Un solo término: 1 azul; rectángulo de 1 por 2.' : 'Azules: ' + (n*(n + 1)/2) + '. Rectángulo: ' + n + ' por ' + (n + 1) + ', que es ' + (n*(n + 1)) + '.', X(-1.4), Y(-2.6));
      dtQue(S, 'la suma de 1 hasta n es la mitad', 'de un rectángulo de n por n + 1. Mueve n.');
      T.fin();
    },
    caption:function(v){ var n = Math.round(v.n || 6); return 'Con n = ' + n + ', la escalera azul tiene ' + (n*(n + 1)/2) + (n === 1 ? ' cuadradito' : ' cuadraditos') + ': la mitad del rectángulo de ' + n + ' por ' + (n + 1) + '. Con n = 1 hay un solo cuadradito azul'; },
    readout:function(v){ var n = Math.round(v.n || 6), P = n*(n + 1), s = n === 1 ? '1' : n === 2 ? '1+2' : n === 3 ? '1+2+3' : '1+2+\\cdots+' + n;
      return dtPasos(['\\text{datos: }n=' + n + ',\\qquad a_{1}=1' + (n === 1 ? '\\ \\text{(primer y último término)}' : ',\\qquad a_{' + n + '}=' + n),
        'S_{' + n + '}=\\displaystyle\\sum_{k=1}^{' + n + '}k=' + s,
        '\\text{fórmula: }S_{n}=\\dfrac{n\\,(a_{1}+a_{n})}{2}',
        '\\text{reemplazo: }S_{' + n + '}=\\dfrac{' + n + '\\cdot(1+' + n + ')}{2}',
        '\\text{suma del paréntesis: }1+' + n + '=' + (n + 1) + '\\ \\text{(alto del rectángulo)}',
        '\\text{producto: }' + n + '\\cdot ' + (n + 1) + '=' + P + '\\ \\text{(cuadraditos del rectángulo)}',
        '\\text{mitad: }S_{' + n + '}=\\dfrac{' + P + '}{2}=' + (P/2),
        '\\text{La escalera azul tiene ' + (P/2) + (P === 2 ? ' cuadradito' : ' cuadraditos') + ':}\\\\&\\qquad \\text{la mitad del rectángulo.}']); }
  };
})());
