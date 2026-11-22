/* L25 H14 · la serie armónica diverge: columnas de alto 1/n agrupadas en bloques que terminan en 2, 4, 8, 16; cada bloque vale 1/2 o más */
OA.scene('arm-idea', (function(){
  var N = 5, XB = -1.0, CW = 0.72, YB = 1.5, H = 2.15, BL = [[2, 2], [3, 4], [5, 8], [9, 16]];
  var PZ = [['C1', '1', '1', 'c-sec'], ['C2', '\\tfrac{1}{2}', '1/2', 'c-sec'], ['C3', '\\tfrac{1}{3}', '1/3', 'c-sec'], ['C4', '\\tfrac{1}{4}', '1/4', 'c-sec'], ['C5', '\\tfrac{1}{5}', '1/5', 'c-sec'], ['C6', '\\tfrac{1}{6}', '1/6', 'c-sec'], ['C7', '\\tfrac{1}{7}', '1/7', 'c-sec'], ['C8', '\\tfrac{1}{8}', '1/8', 'c-sec'],
    ['E2', '\\tfrac{1}{3}+\\tfrac{1}{4}>\\tfrac{1}{2}', '1/3 + 1/4 > 1/2', 'diff'], ['E3', '\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}>\\tfrac{1}{2}', '1/5 + 1/6 + 1/7 + 1/8 > 1/2', 'diff'],
    ['H1', '\\tfrac{1}{2}', '1/2', 'diff'], ['H2', '\\tfrac{1}{2}', '1/2', 'diff'], ['H3', '\\tfrac{1}{2}', '1/2', 'diff'], ['H4', '\\tfrac{1}{2}', '1/2', 'diff'],
    ['Q', '1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\cdots=\\ ?', '1 + 1/2 + 1/3 + 1/4 + … = ?', 'pt'], ['F', '\\sum_{n=1}^{\\infty}\\dfrac{1}{n}\\ \\text{ diverge: no tiene suma}', 'la suma de 1/n desde n = 1 diverge: no tiene suma', 'diff'],
    ['R1', 'S_{8}=1+\\tfrac{1}{2}+\\tfrac{1}{3}+\\tfrac{1}{4}+\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}', 'S₈ = 1 + 1/2 + 1/3 + 1/4 + 1/5 + 1/6 + 1/7 + 1/8', ''],
    ['R2', '\\tfrac{1}{3}+\\tfrac{1}{4}>\\tfrac{1}{4}+\\tfrac{1}{4}=\\tfrac{1}{2}', '1/3 + 1/4 > 1/4 + 1/4 = 1/2', ''],
    ['R3', '\\tfrac{1}{5}+\\tfrac{1}{6}+\\tfrac{1}{7}+\\tfrac{1}{8}>4\\cdot\\tfrac{1}{8}=\\tfrac{1}{2}', '1/5 + 1/6 + 1/7 + 1/8 > 4 · 1/8 = 1/2', ''],
    ['R4', 'S_{8}>1+\\tfrac{1}{2}+\\tfrac{1}{2}+\\tfrac{1}{2}=\\tfrac{5}{2}', 'S₈ > 1 + 1/2 + 1/2 + 1/2 = 5/2', ''],
    ['R5', 'S_{2^{m}}\\ge 1+\\tfrac{m}{2}\\ \\Longrightarrow\\ \\text{la serie diverge}', 'la suma hasta 2 elevado a m es al menos 1 + m/2: la serie diverge', 'diff']];
  var TXT = [['Ocho términos de la serie armónica: columnas', 'del mismo ancho; el alto es el término.'],
    ['Un tercio y un cuarto valen, cada uno, un', 'cuarto o más: juntos pasan de un medio.'],
    ['Los cuatro siguientes valen un octavo o más', 'cada uno: juntos también pasan de un medio.'],
    ['Tres grupos, y cada uno aporta un medio o más:', 'la suma de ocho términos pasa de dos y medio.'],
    ['Cada grupo nuevo tiene el doble de términos y', 'suma más de un medio: no hay tope. Diverge.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.6, y1:4.8}, aspect:9.4/6.6,
    aria:'Animación en cinco pasos con la serie armónica dibujada como columnas del mismo ancho; el alto de la columna n es uno dividido por n. Uno: aparecen ocho columnas azules, cada vez más bajas. Dos: las columnas tercera y cuarta forman un grupo; se pinta de naranja cada una hasta el alto de la más baja, un cuarto: lo naranja vale dos cuartos, un medio, y el grupo vale más. Tres: las columnas quinta a octava forman otro grupo, pintadas hasta un octavo: lo naranja vale cuatro octavos, un medio. Cuatro: la segunda columna, de alto un medio, es un grupo por sí sola; bajo cada grupo queda marcado un medio, y la suma de ocho términos pasa de uno más tres medios. Cinco: las columnas se angostan y entra el grupo siguiente, de ocho columnas, de la novena a la decimosexta, pintadas hasta un dieciseisavo: otro medio. Cada grupo nuevo suma más de un medio, así que las sumas parciales no tienen tope y la serie diverge. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> los términos \\(\\tfrac{1}{n}\\)</span><span><i class="sw rise"></i> cada grupo, recortado al alto de su columna más baja: vale \\(\\tfrac{1}{2}\\)</span>',
    anim:{run:34000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, j, w, cw, nc, hh, on, x0, x1, lv;
      function txt(t, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function caja(xa, xb, ya, yb, col, fa, ga){ var px = X(xa), py = Y(yb), pw = (xb - xa)*s, ph = (yb - ya)*s; if (ph < 0.4) return; c.globalAlpha = ga; c.fillStyle = '#fff'; c.fillRect(px, py, pw, ph); c.globalAlpha = ga*fa; c.fillStyle = col; c.fillRect(px, py, pw, ph); c.globalAlpha = ga; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, pw - 1, ph - 1); c.globalAlpha = 1; }
      cw = k === 5 ? CW*(1 - u/2) : CW; nc = k === 5 ? 16 : 8;
      function cx(n){ return XB + cw*(n - 1); }
      /* columnas: alto 1/n */
      for (i = 1; i <= nc; i++){ w = k === 1 ? Math.max(0, Math.min(1, u*8 - (i - 1))) : (i > 8 ? u : 1); if (w <= 0) continue; caja(cx(i), cx(i + 1), YB, YB + H*w/i, C.sec, 0.3, i > 8 ? u : 1); }
      /* grupos: parte naranja hasta el alto de la columna más baja del grupo */
      for (j = 0; j < 4; j++){ on = j === 0 ? (k > 4 ? 1 : (k === 4 ? u : 0)) : j === 1 ? (k > 2 ? 1 : (k === 2 ? u : 0)) : j === 2 ? (k > 3 ? 1 : (k === 3 ? u : 0)) : (k === 5 ? u : 0);
        if (on <= 0) continue; lv = H/BL[j][1]; x0 = cx(BL[j][0]); x1 = cx(BL[j][1] + 1);
        for (i = BL[j][0]; i <= BL[j][1]; i++) caja(cx(i), cx(i + 1), YB, YB + lv*on, C.rise, 0.45, 1);
        if (on > 0.95 && j > 0){ c.strokeStyle = C.rise; c.lineWidth = 1.2; c.setLineDash([4, 3]); c.beginPath(); c.moveTo(X(x0) - 4, Y(YB + lv)); c.lineTo(X(x1) + 4, Y(YB + lv)); c.stroke(); c.setLineDash([]); }
        /* desde el paso 4: corchete bajo el grupo, con su valor */
        if (k >= 4){ w = (k === 4 || j === 3) ? u : 1; c.globalAlpha = w; c.strokeStyle = C.rise; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(x0) + 2, Y(YB) + 7); c.lineTo(X(x0) + 2, Y(YB) + 11); c.lineTo(X(x1) - 2, Y(YB) + 11); c.lineTo(X(x1) - 2, Y(YB) + 7); c.stroke(); c.globalAlpha = 1;
          if (w > 0.6) L('H' + (j + 1), (x0 + x1)/2, YB - 0.5, -50); } }
      /* rótulos de las columnas */
      for (i = 1; i <= 8; i++) if (k > 1 || u*8 >= i) if (k < 5 || u < 0.15 || (u > 0.9 && i <= 2)) L('C' + i, (cx(i) + cx(i + 1))/2, YB + H/i + 0.24, -50);
      if (k === 2 && u > 0.6 || k === 3 || k === 4) L('E2', XB + CW*3, YB + H/3 + 0.95, -50);
      if (k === 3 && u > 0.6 || k === 4) L('E3', XB + CW*6, YB + H/5 + 0.82, -50);
      if (k === 5 && u > 0.5){ c.font = '600 12px ' + F; c.fillStyle = C.rise; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('…', X(cx(17)) + 5, Y(YB + 0.1)); }
      if (k < N || u < 0.5) L('Q', -1.2, 4.42, 0); else L('F', -1.2, 4.38, 0);
      txt(TXT[k - 1][0], -1.2, 0.45); txt(TXT[k - 1][1], -1.2, 0.45 - 21/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(3.98));
      T.fin();
      oaReg(S, k, N, -1.2, -1.0, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['S_{8}=\\sum_{n=1}^{8}\\dfrac{1}{n}', '\\dfrac{1}{3}+\\dfrac{1}{4}>\\dfrac{1}{4}+\\dfrac{1}{4}=\\dfrac{1}{2}', '\\dfrac{1}{5}+\\dfrac{1}{6}+\\dfrac{1}{7}+\\dfrac{1}{8}>4\\cdot\\dfrac{1}{8}=\\dfrac{1}{2}', 'S_{8}>1+\\dfrac{1}{2}+\\dfrac{1}{2}+\\dfrac{1}{2}=\\dfrac{5}{2}', 'S_{2^{m}}\\ge 1+\\dfrac{m}{2}\\quad\\Longrightarrow\\quad\\sum_{n=1}^{\\infty}\\dfrac{1}{n}\\ \\text{diverge}'][k - 1]]]; }
  };
})());
