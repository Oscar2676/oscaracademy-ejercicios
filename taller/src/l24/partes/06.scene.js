/* L24 H06 · coeficiente binomial: elegir 2 fichas entre 5. Con orden hay 5·4 = 20 elecciones; cada grupo quedó escrito 2! = 2 veces; 20/2 = 10 grupos */
OA.scene('bn-combinar', (function(){
  var N = 7, FX0 = 1.0, FDX = 1.2, YFI = -3.65, CX0 = 2.6, CDX = 1.7, RY0 = -5.45, RDY = 0.6, GX0 = 1.1, GDX = 1.95;
  var G = [[1, 2], [1, 3], [1, 4], [1, 5], [2, 3], [2, 4], [2, 5], [3, 4], [3, 5], [4, 5]];
  var PZ = [['Q', '\\dbinom{5}{2}=\\ ?', 'C(5, 2) = ?', 'pt'], ['F', '\\Longrightarrow\\ \\dfrac{5\\cdot 4}{2!}=10', '⟹ 5·4/2! = 10', 'diff'], ['F2', '=\\dfrac{5!}{2!\\,3!}', '= 5!/(2!·3!)', 'c-tan'],
    ['N1', 'n=5\\text{ fichas}', 'n = 5 fichas', ''], ['K1', '\\text{se eligen }k=2', 'se eligen k = 2', 'diff'],
    ['M', '(1,2)\\ \\text{y}\\ (2,1)\\ \\longrightarrow\\ \\{1,2\\}', '(1, 2) y (2, 1) → {1, 2}', 'c-tan'],
    ['R1', '\\text{se eligen }k=2\\text{ fichas entre }n=5', 'se eligen k = 2 fichas entre n = 5', ''],
    ['R2', '\\text{con orden: }5\\cdot 4=20\\text{ elecciones}', 'con orden: 5·4 = 20 elecciones', ''],
    ['R3', '\\text{cada grupo se repite }2!=2\\cdot 1=2\\text{ veces}', 'cada grupo se repite 2! = 2·1 = 2 veces', 'c-tan'],
    ['R4', '\\text{grupos: }\\dfrac{20}{2}=10', 'grupos: 20/2 = 10', ''],
    ['R5', '\\dbinom{5}{2}=10\\quad\\text{(«5 sobre 2»)}', 'C(5, 2) = 10 («5 sobre 2»)', 'c-sec'],
    ['R6', '\\dbinom{5}{2}=\\dfrac{5\\cdot 4}{2!}=\\dfrac{20}{2}=10', 'C(5, 2) = 5·4/2! = 20/2 = 10', 'diff'],
    ['R7', '\\dbinom{5}{2}=\\dfrac{5!}{2!\\,3!}=\\dfrac{120}{12}=10', 'C(5, 2) = 5!/(2!·3!) = 120/12 = 10', 'c-tan']];
  var TXT = [['Hay 5 fichas numeradas. Se eligen 2.', 'Un grupo: las fichas elegidas, sin orden.'],
    ['Primero se cuenta con orden: 1ª y 2ª ficha.', 'Hay 5 filas y 4 pares en cada fila.'],
    ['Dos pares con las mismas fichas son un grupo.', 'Cada grupo quedó escrito 2 veces.'],
    ['Se tacha (×) la repetición de cada grupo.', 'Queda la mitad de los 20 pares: 10.'],
    ['Cada par azul es un grupo distinto.', 'Se escriben los 10, entre llaves.'],
    ['La respuesta se escribe junto a la pregunta:', 'pares con orden, dividido por repeticiones.'],
    ['La misma cuenta, escrita con factoriales.', 'Da lo mismo: 10 grupos.']];
  function seg(r, j){ var o = [], i; for (i = 1; i <= 5; i++) if (i !== r + 1) o.push(i); return o[j]; }
  (function(){ var r, j, i;
    for (r = 0; r < 5; r++) for (j = 0; j < 4; j++) PZ.push(['O' + r + j, '(' + (r + 1) + ',' + seg(r, j) + ')', '(' + (r + 1) + ', ' + seg(r, j) + ')', '']);
    for (i = 0; i < 10; i++) PZ.push(['G' + i, '\\{' + G[i][0] + ',' + G[i][1] + '\\}', '{' + G[i][0] + ', ' + G[i][1] + '}', 'c-sec']); })();
  function cl(t){ return Math.max(0, Math.min(1, t)); }
  return {
    world:{x0:0, x1:10, y0:-21.3, y1:0}, aspect:21.3/10,
    aria:'Animación en siete pasos. Uno: cinco fichas numeradas del 1 al 5; se van a elegir 2 y se pregunta cuántos grupos distintos hay. Dos: se cuentan primero las elecciones con orden, primera ficha y segunda ficha, en una tabla de 5 filas con 4 pares cada una: 20 pares. Tres: los pares 1, 2 y 2, 1 tienen las mismas fichas; son el mismo grupo, y cada grupo quedó escrito 2 veces. Cuatro: se tacha con una cruz, sobre fondo gris, la repetición de cada grupo y quedan 10 pares con fondo azul. Cinco: se escriben los 10 grupos entre llaves. Seis: junto a la pregunta se escribe la respuesta: 5 por 4, dividido por 2 factorial, igual a 10. Siete: la misma cuenta con factoriales: 5 factorial dividido por 2 factorial por 3 factorial, 120 dividido por 12, igual a 10. Bajo la figura, un registro numerado guarda la expresión de cada paso, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> par que se conserva: un grupo</span><span><i class="sw tan"></i> el mismo grupo, escrito dos veces</span><span><i class="sw rise"></i> la respuesta</span>',
    anim:{run:38000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', MU = C.muted || '#6b6b6b';
      var r, j, i, a, pr, x, y, rep, n4, yA, yB;
      function ap(n){ return k > n ? 1 : (k === n ? u : 0); } /* cuánto ha aparecido lo del paso n; después queda */
      function tx(t, x, y, al, col, size, alpha, bold){ if (alpha <= 0) return; c.globalAlpha = alpha; c.font = (bold || '600') + ' ' + size + 'px ' + F; c.fillStyle = col; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); c.globalAlpha = 1; }
      function cx(j){ return CX0 + CDX*j; }
      function ry(r){ return RY0 - RDY*r; }
      /* paso 1: las cinco fichas y la pregunta */
      for (i = 0; i < 5; i++){ a = k > 1 ? 1 : cl(u*3 - i*0.4); if (a <= 0) continue; c.globalAlpha = a; c.beginPath(); c.arc(X(FX0 + FDX*i), Y(YFI), 12, 0, 6.2832); c.fillStyle = '#fff'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.2; c.stroke(); c.globalAlpha = 1; tx('' + (i + 1), FX0 + FDX*i, YFI, 'center', C.ink, 13, a, '700'); }
      tx('fichas', 0.3, YFI + 0.72, 'left', MU, 10.5, ap(1), '700');
      L('Q', 0.3, -2.35, 0);
      if (ap(1) > 0.6){ L('N1', 6.55, YFI + 0.3, 0); L('K1', 6.55, YFI - 0.35, 0); }
      /* paso 4 (fondo): los pares que se conservan, en azul claro */
      n4 = 0; a = ap(4);
      /* paso 2: la tabla de elecciones con orden, 5 filas de 4 pares */
      a = ap(2);
      if (a > 0){ tx('elecciones con orden (1ª ficha, 2ª ficha):', 0.3, -4.75, 'left', MU, 11, a, '700');
        for (r = 0; r < 5; r++){ pr = cl(a*6 - r); if (pr <= 0) continue; tx('primera: ' + (r + 1), 0.3, ry(r), 'left', MU, 10.5, pr);
          for (j = 0; j < 4; j++){ if (cl(a*6 - r)*4 < j + 0.5) continue; rep = r + 1 > seg(r, j);
            if (!rep && ap(4) > 0){ c.globalAlpha = 0.14*ap(4); c.fillStyle = C.sec; c.fillRect(X(cx(j) - 0.62), Y(ry(r) + 0.25), X(cx(j) + 0.62) - X(cx(j) - 0.62), Y(ry(r) - 0.25) - Y(ry(r) + 0.25)); c.globalAlpha = 1; }
            L('O' + r + j, cx(j), ry(r)); } }
        tx('5 filas, 4 pares en cada fila', 0.3, -8.5, 'left', C.ink, 11.5, cl(a*6 - 5)); }
      /* paso 3: (1,2) y (2,1) son el mismo grupo */
      a = ap(3);
      if (a > 0){ yA = ry(0) + 0.27; yB = ry(1) - 0.27; c.strokeStyle = C.tan; c.lineWidth = 1.5; c.globalAlpha = a; c.strokeRect(X(cx(0) - 0.68), Y(yA), X(cx(0) + 0.68) - X(cx(0) - 0.68), (Y(yB) - Y(yA))*cl(a*2)); c.globalAlpha = 1;
        tx('mismo grupo:', 0.3, -9.1, 'left', C.tan, 11.5, a, '700'); if (a > 0.5) L('M', 2.75, -9.1, 0); }
      /* paso 4: se tacha la repetición de cada grupo */
      a = ap(4);
      if (a > 0){ i = 0; for (r = 0; r < 5; r++) for (j = 0; j < 4; j++){ if (r + 1 < seg(r, j)) continue; pr = cl(a*10 - i*0.9); i++; if (pr <= 0) continue;
          c.globalAlpha = 0.10*pr; c.fillStyle = '#000'; c.fillRect(X(cx(j) - 0.62), Y(ry(r) + 0.25), X(cx(j) + 0.62) - X(cx(j) - 0.62), Y(ry(r) - 0.25) - Y(ry(r) + 0.25)); c.globalAlpha = 1; tx('×', cx(j) - 0.76, ry(r), 'center', C.ink, 12, pr, '700'); }
        tx('tachados (×, gris): 10 repetidos. Quedan 10 (azul).', 0.3, -9.7, 'left', C.ink, 11.5, a); }
      /* paso 5: los diez grupos, entre llaves */
      a = ap(5);
      if (a > 0){ tx('los grupos, sin orden (uno por cada par azul):', 0.3, -10.35, 'left', C.sec, 11, a, '700');
        for (i = 0; i < 10; i++){ pr = cl(a*10 - i*0.9); if (pr > 0.4) L('G' + i, GX0 + GDX*(i % 5), -10.95 - 0.6*Math.floor(i/5)); } }
      /* pasos 6 y 7: la respuesta, junto a la pregunta */
      if (ap(6) > 0.5) L('F', 2.6, -2.35, 0);
      if (ap(7) > 0.5) L('F2', 7.05, -2.35, 0);
      /* frase del paso y número de paso */
      tx('paso ' + k + ' de ' + N, 9.7, -12.1, 'right', MU, 11, 1);
      tx(TXT[k - 1][0], 0.3, -12.7, 'left', C.ink, 12.5, 1); c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(TXT[k - 1][1], X(0.3), Y(-12.7) + 19);
      dtQue(S, 'elegir 2 fichas entre 5. Con orden hay', '20 pares; cada grupo sale 2 veces: son 10.');
      T.fin();
      oaReg(S, k, N, 0.3, -14.8, [0, 24, 48, 80, 116, 152, 188]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [
      '\\text{datos: }n=5\\text{ fichas; se eligen }k=2\\\\&\\qquad\\text{pregunta: ¿cuántos grupos distintos hay?}',
      '\\text{con orden: 5 opciones para la 1ª ficha}\\\\&\\qquad\\text{y, por cada una, 4 opciones para la 2ª}\\\\&\\qquad 5\\cdot 4=20\\text{ elecciones con orden}',
      '(1,2)\\text{ y }(2,1)\\text{ tienen las mismas fichas:}\\\\&\\qquad\\text{son el mismo grupo, }\\{1,2\\}\\\\&\\qquad\\text{2 fichas se ordenan de }2!=2\\cdot 1=2\\text{ maneras:}\\\\&\\qquad\\text{cada grupo está escrito 2 veces}',
      '\\text{se divide por las repeticiones:}\\\\&\\qquad\\dfrac{20}{2}=10\\text{ grupos}',
      '\\text{grupos: }\\{1,2\\},\\{1,3\\},\\{1,4\\},\\{1,5\\},\\{2,3\\},\\\\&\\qquad\\{2,4\\},\\{2,5\\},\\{3,4\\},\\{3,5\\},\\{4,5\\}\\\\&\\qquad\\text{con la ficha menor 1, 2, 3, 4: }4,\\ 3,\\ 2,\\ 1\\\\&\\qquad 4+3=7,\\quad 7+2=9,\\quad 9+1=10',
      '\\dbinom{5}{2}=\\dfrac{5\\cdot 4}{2!}=\\dfrac{20}{2}=10\\\\&\\qquad\\text{se lee «5 sobre 2»: es el coeficiente binomial}',
      '\\text{con factoriales: se amplifica por }3!\\\\&\\qquad\\dfrac{5\\cdot 4}{2!}=\\dfrac{5\\cdot 4\\cdot 3!}{2!\\cdot 3!}=\\dfrac{5!}{2!\\,3!}\\\\&\\qquad 5!=120,\\quad 2!\\cdot 3!=2\\cdot 6=12\\\\&\\qquad\\dfrac{120}{12}=10\\text{ grupos}']; return dtPasos(R.slice(0, k)); }
  };
})());
