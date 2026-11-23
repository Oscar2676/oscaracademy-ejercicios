/* L25 H14 · la serie armónica diverge: columnas de alto 1/n agrupadas en bloques que terminan en 2, 4, 8, 16; cada bloque vale 1/2 o más */
OA.scene('arm-idea', (function(){
  var N = 5, XB = -1.0, CW = 0.72, YB = 1.5, H = 2.15, BL = [[2, 2], [3, 4], [5, 8], [9, 16]];
  var PZ = [['C1', '1', '1', 'c-sec'], ['C2', '\\tfrac{1}{2}', '1/2', 'c-sec'], ['C3', '\\tfrac{1}{3}', '1/3', 'c-sec'], ['C4', '\\tfrac{1}{4}', '1/4', 'c-sec'], ['C5', '\\tfrac{1}{5}', '1/5', 'c-sec'], ['C6', '\\tfrac{1}{6}', '1/6', 'c-sec'], ['C7', '\\tfrac{1}{7}', '1/7', 'c-sec'], ['C8', '\\tfrac{1}{8}', '1/8', 'c-sec'],
    ['C9', '\\tfrac{1}{9}', '1/9', 'c-sec'], ['C16', '\\tfrac{1}{16}', '1/16', 'c-sec'],
    ['E2', '\\tfrac{1}{3}+\\tfrac{1}{4}>\\tfrac{1}{2}', '1/3 + 1/4 > 1/2', 'diff'], ['E3', '\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}>\\tfrac{1}{2}', '1/5 + 1/6 + 1/7 + 1/8 > 1/2', 'diff'],
    ['E4', '\\tfrac{1}{9}+\\cdots+\\tfrac{1}{16}>\\tfrac{1}{2}', '1/9 + … + 1/16 > 1/2', 'diff'],
    ['H0', '1', '1', 'c-sec'], ['H1', '\\tfrac{1}{2}', '1/2', 'diff'], ['H2', '\\tfrac{1}{2}', '1/2', 'diff'], ['H3', '\\tfrac{1}{2}', '1/2', 'diff'], ['H4', '\\tfrac{1}{2}', '1/2', 'diff'],
    ['Q', '1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\cdots=\\ ?', '1 + 1/2 + 1/3 + 1/4 + … = ?', 'pt'], ['F', '\\Longrightarrow\\ \\text{no tiene suma: la serie diverge}', '⟹ no tiene suma: la serie diverge', 'diff'],
    ['R1', 'S_{8}=1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}', 'S₈ = 1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6 + 1/7 + 1/8', ''],
    ['R2', '\\tfrac{1}{3}+\\tfrac{1}{4}>\\tfrac{1}{4}+\\tfrac{1}{4}=\\tfrac{2}{4}=\\tfrac{1}{2}', '1/3 + 1/4 > 1/4 + 1/4 = 2/4 = 1/2', ''],
    ['R3', '\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}>4\\cdot\\tfrac{1}{8}=\\tfrac{4}{8}=\\tfrac{1}{2}', '1/5 + 1/6 + 1/7 + 1/8 > 4 · 1/8 = 4/8 = 1/2', ''],
    ['R4', 'S_{8}>1+\\tfrac{1}{2}+\\tfrac{1}{2}+\\tfrac{1}{2}=\\tfrac{5}{2}', 'S₈ > 1 + 1/2 + 1/2 + 1/2 = 5/2', ''],
    ['R5', 'S_{2^{m}}\\ge 1+\\tfrac{m}{2}\\ \\Longrightarrow\\ \\text{la serie diverge}', 'suma hasta 2ᵐ ≥ 1 + m/2 ⟹ la serie diverge', 'diff']];
  var TXT = [['Ocho términos de la serie armónica: columnas', 'del mismo ancho; el alto es el término.'],
    ['Naranja: las columnas 3 y 4, recortadas a un', 'cuarto, la más baja. Dos cuartos: un medio.'],
    ['Naranja: las columnas 5 a 8, recortadas a un', 'octavo, la más baja. Cuatro octavos: un medio.'],
    ['La columna 2 es un grupo sola: un medio. Bajo', 'cada grupo, su medio: la suma pasa de 2,5.'],
    ['Las columnas se angostan para que quepa el grupo', 'de 9 a 16: otro medio. No hay tope: diverge.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:6.3}, aspect:10.9/6.6,
    aria:'Animación en cinco pasos con la serie armónica dibujada como columnas del mismo ancho; el alto de la columna n es uno dividido por n. Arriba, una franja dice qué muestra: la serie armónica, por grupos; cada grupo suma un medio o más y no hay tope. Uno: aparecen ocho columnas azules, cada vez más bajas, cada una con su valor. Dos: las columnas tercera y cuarta forman un grupo; se pinta de naranja cada una hasta el alto de la más baja, un cuarto: lo naranja vale dos cuartos, un medio, y el grupo vale más. Tres: las columnas quinta a octava forman otro grupo, pintadas hasta un octavo: lo naranja vale cuatro octavos, un medio. Cuatro: la segunda columna, de alto un medio, es un grupo por sí sola; bajo la primera columna queda marcado un uno y bajo cada grupo, un medio; la suma de ocho términos pasa de uno más tres medios, cinco medios. Cinco: las columnas se angostan, con sus valores, sus desigualdades y sus corchetes, y entra el grupo siguiente, de ocho columnas, de la novena a la decimosexta, pintadas hasta un dieciseisavo: otro medio. Cada grupo nuevo suma más de un medio, así que las sumas parciales no tienen tope y la serie diverge. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(\\tfrac{1}{n}\\)</span><span><i class="sw rise"></i> cada grupo, recortado al alto de su columna más baja: vale \\(\\tfrac{1}{2}\\)</span>',
    anim:{run:34000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), e = k === 5 ? u : 0, i, j, w, cw, nc, on, x0, x1, lv;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function caja(xa, xb, ya, yb, col, fa, ga){ var px = X(xa), py = Y(yb), pw = (xb - xa)*s, ph = (yb - ya)*s; if (ph < 0.4) return; c.globalAlpha = ga; c.fillStyle = '#fff'; c.fillRect(px, py, pw, ph); c.globalAlpha = ga*fa; c.fillStyle = col; c.fillRect(px, py, pw, ph); c.globalAlpha = ga; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1); c.globalAlpha = 1; }
      function corchete(xa, xb, col, a){ c.globalAlpha = a; c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([]); c.beginPath(); c.moveTo(X(xa) + 2, Y(YB) + 7); c.lineTo(X(xa) + 2, Y(YB) + 11); c.lineTo(X(xb) - 2, Y(YB) + 11); c.lineTo(X(xb) - 2, Y(YB) + 7); c.stroke(); c.globalAlpha = 1; }
      cw = CW*(1 - e/2); nc = k === 5 ? 16 : 8; /* en el paso 5 las columnas se angostan a la mitad: caben 16 */
      function cx(n){ return XB + cw*(n - 1); }
      /* columnas: alto 1/n */
      for (i = 1; i <= nc; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*8 - (i - 1))) : (i > 8 ? u : 1); if (w <= 0) continue; caja(cx(i), cx(i + 1), YB, YB + H*w/i, C.sec, 0.3, i > 8 ? u : 1); }
      /* grupos: parte naranja hasta el alto de la columna más baja del grupo; lo de cada paso queda */
      for (j = 0; j < 4; j++){ on = j === 0 ? (k > 4 ? 1 : (k === 4 ? u : 0)) : j === 1 ? (k > 2 ? 1 : (k === 2 ? u : 0)) : j === 2 ? (k > 3 ? 1 : (k === 3 ? u : 0)) : (k === 5 ? u : 0);
        if (on <= 0) continue; lv = H/BL[j][1]; x0 = cx(BL[j][0]); x1 = cx(BL[j][1] + 1);
        for (i = BL[j][0]; i <= BL[j][1]; i++) caja(cx(i), cx(i + 1), YB, YB + lv*on, C.rise, 0.45, 1);
        if (on > 0.95 && j > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(x0) - 4, Y(YB + lv)); c.lineTo(X(x1) + 4, Y(YB + lv)); c.stroke(); c.setLineDash([]); }
        /* desde el paso 4: corchete bajo el grupo, con su valor; en el paso 5 se mueve con sus columnas */
        if (k >= 4){ w = (k === 4 || j === 3) ? u : 1; corchete(x0, x1, C.rise, w); if (w > 0.6) L('H' + (j + 1), (x0 + x1)/2, YB - 0.5, -50); } }
      /* desde el paso 4: el 1 inicial también queda marcado bajo su columna */
      if (k >= 4){ w = k === 4 ? u : 1; corchete(cx(1), cx(2), C.sec, w); if (w > 0.6) L('H0', (cx(1) + cx(2))/2, YB - 0.5, -50); }
      /* rótulos de las columnas: quedan siempre y se mueven con ellas */
      for (i = 1; i <= 8; i++) if (k > 1 || u*8 >= i) L('C' + i, (cx(i) + cx(i + 1))/2, YB + H/i + 0.24, -50);
      if (k === 5 && u > 0.6){ L('C9', (cx(9) + cx(10))/2, YB + H/9 + 0.24, -50); L('C16', (cx(16) + cx(17))/2, YB + H/16 + 0.24, -50); }
      /* desigualdad de cada grupo, junto a él; en el paso 5 acompañan a sus columnas */
      if (k === 2 && u > 0.6 || k > 2) L('E2', 1.16 - 0.41*e, 3.55, -50);
      if (k === 3 && u > 0.6 || k > 3) L('E3', 3.32 - 1.37*e, 3.0, -50);
      if (k === 5 && u > 0.6) L('E4', 5.15, 2.45, -100);
      if (k === 5 && u > 0.5){ c.font = '600 12px ' + F; c.fillStyle = C.rise; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('…', X(cx(17)) + 5, Y(YB + 0.1)); }
      L('Q', -1.2, 4.98, 0); if (k === N && u > 0.5) L('F', -1.2, 4.5, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(4.98));
      dtQue(S, 'la serie armónica, por grupos:', 'cada grupo suma un medio o más: no hay tope.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Serie armónica: el término }n\\text{ es }\\dfrac{1}{n}' + Q + '\\text{Ocho primeros: }S_{8}=\\displaystyle\\sum_{n=1}^{8}\\dfrac{1}{n}' + Q + 'S_{8}=1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}',
      '\\text{Grupo de 3 a 4: dos términos.}' + Q + '\\text{Como }3<4\\text{: }\\ \\dfrac{1}{3}>\\dfrac{1}{4}' + Q + '\\text{Se suma }\\tfrac{1}{4}\\text{ a cada lado:}' + Q + '\\dfrac{1}{3}+\\dfrac{1}{4}>\\dfrac{1}{4}+\\dfrac{1}{4}' + Q + '\\dfrac{1}{4}+\\dfrac{1}{4}=\\dfrac{2}{4}=\\dfrac{1}{2}' + Q + '\\text{El grupo vale más de }\\tfrac{1}{2}.',
      '\\text{Grupo de 5 a 8: cuatro términos.}' + Q + '\\dfrac{1}{5}>\\dfrac{1}{8},\\qquad\\dfrac{1}{6}>\\dfrac{1}{8}' + Q + '\\dfrac{1}{7}>\\dfrac{1}{8},\\qquad\\dfrac{1}{8}=\\dfrac{1}{8}' + Q + '\\dfrac{1}{5}+\\dfrac{1}{6}+\\dfrac{1}{7}+\\dfrac{1}{8}>4\\cdot\\dfrac{1}{8}' + Q + '4\\cdot\\dfrac{1}{8}=\\dfrac{4}{8}=\\dfrac{1}{2}' + Q + '\\text{El grupo vale más de }\\tfrac{1}{2}.',
      '\\text{Grupo del 2: un solo término, }\\tfrac{1}{2}.' + Q + 'S_{8}=1+\\tfrac{1}{2}+\\left(\\tfrac{1}{3}+\\tfrac{1}{4}\\right)+\\left(\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}\\right)' + Q + '\\text{Cada paréntesis vale más de }\\tfrac{1}{2}\\text{:}' + Q + 'S_{8}>1+\\dfrac{1}{2}+\\dfrac{1}{2}+\\dfrac{1}{2}' + Q + '1+\\dfrac{1}{2}=\\dfrac{2}{2}+\\dfrac{1}{2}=\\dfrac{3}{2}' + Q + '\\dfrac{3}{2}+\\dfrac{1}{2}=\\dfrac{4}{2},\\qquad\\dfrac{4}{2}+\\dfrac{1}{2}=\\dfrac{5}{2}' + Q + 'S_{8}>\\dfrac{5}{2}=2{,}5',
      '\\text{Grupo de 9 a 16: ocho términos,}' + Q + '\\text{cada uno mayor o igual que }\\tfrac{1}{16}\\text{:}' + Q + '\\dfrac{1}{9}+\\cdots+\\dfrac{1}{16}>8\\cdot\\dfrac{1}{16}=\\dfrac{8}{16}=\\dfrac{1}{2}' + Q + 'S_{16}=S_{8}+\\left(\\tfrac{1}{9}+\\cdots+\\tfrac{1}{16}\\right)' + Q + 'S_{16}>\\dfrac{5}{2}+\\dfrac{1}{2}=\\dfrac{6}{2}=3' + Q + '\\text{Con }m\\text{ grupos: }S_{2^{m}}\\ge 1+\\dfrac{m}{2}' + Q + '\\text{Cada grupo nuevo suma }\\tfrac{1}{2}\\text{ o más:}' + Q + '\\text{no hay tope.}' + Q + '\\text{La serie diverge: no tiene suma.}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
