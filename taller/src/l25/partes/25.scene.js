/* L25 H25 · aplicaciones de series geométricas: la pelota que se suelta desde 8 m y en cada rebote sube la mitad; bajada inicial 8 + rebotes 8 + 4 + 2 + … = 8 + 16 = 24 m */
function ap25Mcd(a, b){ a = Math.abs(a); b = Math.abs(b); while (b){ var t = a % b; a = b; b = t; } return a; }
function ap25Red(a, b){ var g = ap25Mcd(a, b) || 1; return [a/g, b/g]; }
function ap25Tex(f, d){ return f[1] === 1 ? '' + f[0] : '\\' + (d ? 'd' : 't') + 'frac{' + f[0] + '}{' + f[1] + '}'; }
function ap25Pl(f){ return f[1] === 1 ? '' + f[0] : f[0] + '/' + f[1]; }
function ap25Cl(t){ return Math.max(0, Math.min(1, t)); }
/* tramo vertical con punta de flecha, que crece con w (0 a 1) */
function ap25Tramo(S, x, y0, y1, w, col){ if (w <= 0) return; var c = S.ctx, ax = S.X(x), ay = S.Y(y0), by = S.Y(y0 + (y1 - y0)*w), d = by > ay ? 1 : -1;
  c.strokeStyle = col; c.lineWidth = 1.6; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(ax, by); c.stroke();
  if (Math.abs(by - ay) > 9){ c.fillStyle = col; c.beginPath(); c.moveTo(ax, by); c.lineTo(ax - 3.5, by - d*8); c.lineTo(ax + 3.5, by - d*8); c.closePath(); c.fill(); } }
OA.scene('apg-idea', (function(){
  var N = 5, G = 3.9, E = 0.42, XD = -0.55, PX = [0.35, 1.8, 3.2], PH = [4, 2, 1], BX = -1.1, BU = 0.25, BY = 2.55, BH = 0.17;
  var PZ = [['H0', '8\\text{ m}', '8 m', 'c-sec'],
    ['P1', '4+4=8\\text{ m}', '4 + 4 = 8 m', 'c-alt'], ['P2', '2+2=4\\text{ m}', '2 + 2 = 4 m', 'c-alt'], ['P3', '1+1=2\\text{ m}', '1 + 1 = 2 m', 'c-alt'],
    ['M1', '\\cdot\\tfrac{1}{2}', '· 1/2', 'diff'], ['M2', '\\cdot\\tfrac{1}{2}', '· 1/2', 'diff'],
    ['B0', '8', '8', 'c-sec'], ['B1', '8', '8', 'c-alt'], ['B2', '4', '4', 'c-alt'], ['B3', '2', '2', 'c-alt'], ['B4', '\\cdots', '…', 'c-alt'],
    ['SR', '\\text{rebotes: }\\tfrac{8}{1-\\frac{1}{2}}=16\\text{ m}', 'rebotes: 8/(1 − 1/2) = 16 m', 'c-alt'],
    ['ST', '\\text{total: }8+16=24\\text{ m}', 'total: 8 + 16 = 24 m', 'diff'],
    ['Q', '\\text{desde }8\\text{ m, sube }\\tfrac{1}{2}\\text{ cada vez: ¿total?}', 'desde 8 m, sube 1/2 cada vez: ¿total?', 'pt'],
    ['F', '\\Longrightarrow\\ D=8+16=24\\text{ m}', '⟹ D = 8 + 16 = 24 m', 'diff'],
    ['R1', '\\text{bajada inicial: }8\\text{ m (va aparte)}', 'bajada inicial: 8 m (va aparte)', ''],
    ['R2', '\\text{rebote 1: sube }\\tfrac{1}{2}\\cdot 8=4,\\ \\ 4+4=8\\text{ m}', 'rebote 1: sube 1/2 · 8 = 4, 4 + 4 = 8 m', ''],
    ['R3', '\\text{rebotes: }8+4+2+\\cdots\\quad a=8,\\ r=\\tfrac{1}{2}', 'rebotes: 8 + 4 + 2 + …  a = 8, r = 1/2', ''],
    ['R4', '\\sum\\nolimits_{k=1}^{\\infty}8\\left(\\tfrac{1}{2}\\right)^{k-1}=\\tfrac{8}{1-\\frac{1}{2}}=16\\text{ m}', 'Σ 8·(1/2)ᵏ⁻¹ (k ≥ 1) = 8/(1 − 1/2) = 16 m', ''],
    ['R5', 'D=8+16=24\\text{ m}', 'D = 8 + 16 = 24 m', 'diff']];
  var TXT = [['La pelota baja 8 metros. Esa bajada se', 'recorre una sola vez: va aparte.'],
    ['Primer rebote: sube la mitad de 8 y baja', 'lo mismo. El rebote completo mide 8 metros.'],
    ['Cada rebote mide la mitad del anterior:', 'los rebotes forman una serie geométrica.'],
    ['La razón es menor que 1: la serie tiene suma.', 'Todos los rebotes juntos miden 16 metros.'],
    ['Total: la bajada inicial más los rebotes.', 'Según el modelo, recorre 24 metros.']];
  return {
    world:{x0:-1.3, x1:5.3, y0:-4.3, y1:9.7}, aspect:14/6.6,
    aria:'Arriba, una franja dice qué muestra: el camino total de una pelota que rebota es la bajada inicial más una serie geométrica. Animación en cinco pasos. Una pelota se suelta desde 8 metros y en cada rebote sube la mitad de la altura desde la que cayó. Uno: una flecha azul vertical hacia abajo, de 8 metros, es la bajada inicial; bajo el suelo, una barra horizontal llamada camino recorrido recibe un primer trozo azul de 8 metros. Dos: a la derecha, dos flechas verdes, una hacia arriba y otra hacia abajo, de 4 metros cada una, son el primer rebote, con la cota 4 más 4 igual a 8 metros; la barra recibe un trozo verde de 8. Tres: más a la derecha, otros dos pares de flechas verdes, de 2 metros y de 1 metro, con las cotas 2 más 2 igual a 4 metros y 1 más 1 igual a 2 metros, y puntos suspensivos; entre un rebote y el siguiente, en naranja, por un medio; la barra recibe trozos verdes de 4 y de 2. Cuatro: la barra se completa con un trozo rayado, los rebotes que no se dibujaron, y una llave verde bajo los trozos verdes dice rebotes: 8 dividido por 1 menos un medio, igual a 16 metros. Cinco: una llave naranja bajo toda la barra dice total: 8 más 16 igual a 24 metros. Nada de lo que aparece se borra; la pregunta queda arriba y la respuesta, D igual a 24 metros, se escribe debajo de ella. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> bajada inicial (una sola vez)</span><span><i class="sw alt"></i> rebotes: subida y bajada iguales</span><span><i class="sw rise"></i> la razón \\(\\tfrac{1}{2}\\) y el total</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), L = T.L, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), i, w, x0, x1, j;
      function txt(t, x, y, col){ c.font = '600 12.5px ' + F; c.fillStyle = col || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      /* trozo de la barra «camino recorrido»: desde m0 hasta m0 + largo·w metros */
      function trozo(m0, largo, w, col, raya){ var px = X(BX + m0*BU), pw = largo*BU*s*w, py = Y(BY + BH), ph = 2*BH*s, q; if (pw < 0.4) return;
        c.globalAlpha = raya ? 0.14 : 0.3; c.fillStyle = col; c.fillRect(px, py, pw, ph); c.globalAlpha = 1; c.strokeStyle = col; c.lineWidth = 1; c.setLineDash([]); c.strokeRect(px + 0.5, py + 0.5, Math.max(1, pw - 1), ph - 1);
        if (raya){ c.save(); c.beginPath(); c.rect(px, py, pw, ph); c.clip(); c.globalAlpha = 0.6; for (q = -ph; q < pw; q += 5){ c.beginPath(); c.moveTo(px + q, py + ph); c.lineTo(px + q + ph, py); c.stroke(); } c.restore(); c.globalAlpha = 1; } }
      /* llave bajo la barra, desde m0 hasta m1 metros, a la altura y */
      function llave(m0, m1, y, w, col){ var a = X(BX + m0*BU) + 1, b = a + (X(BX + m1*BU) - 1 - a)*w, py = Y(y); c.strokeStyle = col; c.lineWidth = 1.3; c.setLineDash([]); c.beginPath(); c.moveTo(a, py - 5); c.lineTo(a, py); c.lineTo(b, py); if (w >= 1) c.lineTo(b, py - 5); c.stroke(); }
      /* suelo */
      S.line(-1.2, G, 5.2, G, {color:C.ink, width:1.1});
      c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('suelo', X(5.2), Y(G) + 9);
      /* paso 1: bajada inicial */
      w = k === 1 ? u : 1; ap25Tramo(S, XD, G + 8*E, G, w, C.sec); c.beginPath(); c.arc(X(XD), Y(G + 8*E), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill();
      if (w > 0.4) L('H0', XD - 0.1, G + 4.6*E, -100);
      trozo(0, 8, w, C.sec); if (w > 0.6) L('B0', BX + 4*BU, 2.1, -50);
      txt('camino recorrido (cada tramo, a continuación):', -1.2, 3.02, C.muted || '#6b6b6b');
      /* paso 2: primer rebote; paso 3: los dos siguientes */
      for (i = 0; i < 3; i++){ if (k < (i ? 3 : 2)) break; w = i === 0 ? (k === 2 ? u : 1) : (k === 3 ? ap25Cl(u*2.2 - (i - 1)) : 1);
        ap25Tramo(S, PX[i], G, G + PH[i]*E, ap25Cl(2*w), C.alt); ap25Tramo(S, PX[i] + 0.3, G + PH[i]*E, G, ap25Cl(2*w - 1), C.alt);
        if (w > 0.5){ c.strokeStyle = C.alt; c.lineWidth = 1; c.setLineDash([2, 2]); c.beginPath(); c.moveTo(X(PX[i]), Y(G + PH[i]*E)); c.lineTo(X(PX[i] + 0.3), Y(G + PH[i]*E)); c.stroke(); c.setLineDash([]); }
        if (w > 0.7) L('P' + (i + 1), PX[i] + 0.15, G + PH[i]*E + 0.3, -50);
        trozo([8, 16, 20][i], [8, 4, 2][i], w, C.alt); if (w > 0.8) L('B' + (i + 1), BX + [12, 18, 21][i]*BU, 2.1, -50); }
      if (k >= 3){ w = k === 3 ? u : 1; if (w > 0.75){ L('M1', (PX[0] + PX[1])/2 + 0.15, G + 0.3, -50); } if (w > 0.95){ L('M2', (PX[1] + PX[2])/2 + 0.15, G + 0.3, -50); c.font = '700 14px ' + F; c.fillStyle = C.alt; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('…', X(4.4), Y(G + 0.25)); } }
      /* paso 4: los rebotes que no se dibujaron y la suma de todos los rebotes */
      if (k >= 4){ w = k === 4 ? u : 1; trozo(22, 2, ap25Cl(2*w), C.alt, 1); if (w > 0.4) L('B4', BX + 23*BU, 2.1, -50); llave(8, 24, 1.8, ap25Cl(2*w - 0.6), C.alt); if (w > 0.8) L('SR', BX + 8*BU + 0.05, 1.5, 0); }
      /* paso 5: el total */
      if (k === 5){ llave(0, 24, 1.12, ap25Cl(1.6*u), C.rise); if (u > 0.6) L('ST', BX + 0.05, 0.82, 0); }
      L('Q', -1.2, 8.38, 0); if (k === N && u > 0.5) L('F', -1.2, 7.86, 0); /* la pregunta queda; la respuesta se escribe debajo */
      txt(TXT[k - 1][0], -1.2, 0.2); txt(TXT[k - 1][1], -1.2, 0.2 - 19/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(5.2), Y(8.38));
      dtQue(S, 'el camino total es la bajada inicial', 'más una serie geométrica: los rebotes.');
      T.fin();
      oaReg(S, k, N, -1.2, -1.35, [6, 36, 66, 96, 126]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), Q = '\\\\&\\qquad ', R = ['\\text{Datos (modelo): se suelta desde }8\\text{ m;}' + Q + '\\text{en cada rebote sube }\\dfrac{1}{2}\\text{ de la altura}' + Q + '\\text{desde la que cayó; los rebotes no terminan.}' + Q + '\\text{Se pide: distancia total, }D.' + Q + '\\text{Bajada inicial: }8\\text{ m. Se recorre una sola vez.}',
      '\\text{Primer rebote. Sube: }\\dfrac{1}{2}\\cdot 8=\\dfrac{8}{2}=4\\text{ m}' + Q + '\\text{Baja lo mismo que subió: }4\\text{ m}' + Q + '\\text{Rebote completo: }4+4=8\\text{ m}',
      '\\text{Rebote 2. Sube: }\\dfrac{1}{2}\\cdot 4=\\dfrac{4}{2}=2\\text{ m}' + Q + '\\text{Rebote completo: }2+2=4\\text{ m}' + Q + '\\text{Rebote 3. Sube: }\\dfrac{1}{2}\\cdot 2=\\dfrac{2}{2}=1\\text{ m}' + Q + '\\text{Rebote completo: }1+1=2\\text{ m}' + Q + '\\text{Cocientes: }\\dfrac{4}{8}=\\dfrac{1}{2},\\qquad\\dfrac{2}{4}=\\dfrac{1}{2}' + Q + '\\text{Cada altura es la mitad de la anterior, así que}' + Q + '\\text{cada rebote es el anterior por }\\dfrac{1}{2}\\text{, siempre.}' + Q + '\\text{Serie geométrica, con }a=8\\text{ y }r=\\dfrac{1}{2}\\text{:}' + Q + '8+4+2+\\cdots=\\displaystyle\\sum_{k=1}^{\\infty}8\\left(\\dfrac{1}{2}\\right)^{k-1}',
      '\\text{Se piden todos los rebotes: suma infinita.}' + Q + '\\text{Restricción: }|r|=\\dfrac{1}{2}<1\\text{. Converge, y}' + Q + 'S=\\dfrac{a}{1-r}\\ \\text{(hoja «Suma de una serie}' + Q + '\\text{geométrica infinita»).}' + Q + '\\text{Denominador: }1-\\dfrac{1}{2}=\\dfrac{1}{2}' + Q + 'S=8\\div\\dfrac{1}{2}=8\\cdot 2=16\\text{ m}',
      '\\text{Se agrega la bajada inicial:}' + Q + 'D=8+16=24\\text{ m}' + Q + '\\text{Qué significa: según el modelo, la pelota}' + Q + '\\text{recorre }24\\text{ m en total, aunque los rebotes}' + Q + '\\text{no terminen. La bajada inicial va aparte}' + Q + '\\text{porque se recorre una vez; cada otra altura,}' + Q + '\\text{dos veces (subida y bajada).}'];
      return dtPasos(R.slice(0, k)); }
  };
})());
/* número ↔ figura: altura inicial fija, 8 m; el deslizador cambia la razón de rebote (0 a 0,9); camino total D = 8 + 16r/(1 − r) */
OA.scene('apg-vivo', (function(){
  var G = 3.6, E = 0.42, XD = -0.9, BX = -1.2, BW = 6.2, MAXD = 152, Q = '\\\\&\\qquad ', DAT = [], PZ = [['H0', '8\\text{ m}', '8 m', 'c-sec']], kk;
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function fr(n, d){ return d === 1 ? '' + n : '\\dfrac{' + n + '}{' + d + '}'; }
  function decT(x, d){ return dec(x, d).replace(',', '{,}'); }
  for (kk = 0; kk <= 9; kk++) (function(k){
    var r = ap25Red(k, 10), p = r[0], q = r[1], e = {k:k, r:r, rv:k/10}, X1, A, U, Sm, Dm, R, rt = ap25Tex(r, 1), rd = '0{,}' + k;
    if (k === 0){ e.D = [8, 1]; e.S = [0, 1];
      e.R = ['\\text{Datos (modelo): altura inicial }h=8\\text{ m;}' + Q + '\\text{razón de rebote }r=0.',
        '\\text{Primer rebote. Sube: }8\\cdot 0=0\\text{ m. No rebota.}',
        '\\text{Todos los rebotes miden }0\\text{ m: no hay serie}' + Q + '\\text{que sumar. Los rebotes suman }0\\text{ m.}',
        '\\text{Total: bajada inicial más rebotes.}' + Q + 'D=8+0=8\\text{ m}',
        '\\text{Comprobación con }D=\\dfrac{h\\,(1+r)}{1-r}\\text{:}' + Q + '\\dfrac{8\\cdot(1+0)}{1-0}=\\dfrac{8\\cdot 1}{1}=8\\text{ m}',
        '\\text{Qué significa: caso límite. La pelota se}' + Q + '\\text{queda en el suelo; recorre solo los }8\\text{ m}' + Q + '\\text{de la bajada inicial.}'];
      PZ.push(['B0', 'D=8+0=8\\text{ m}', 'D = 8 + 0 = 8 m', 'diff']); DAT.push(e); return; }
    X1 = ap25Red(8*p, q); A = ap25Red(2*X1[0], X1[1]); U = [q - p, q]; Sm = ap25Red(A[0]*q, A[1]*(q - p)); Dm = [8*Sm[1] + Sm[0], Sm[1]];
    e.X1 = X1; e.A = A; e.S = Sm; e.D = Dm;
    var dtx = ap25Tex(Dm, 1) + (Dm[1] === 1 ? '' : '\\approx ' + decT(Dm[0]/Dm[1], 2)), mult = [(q + p)*q, q*(q - p)], co = ap25Red(q + p, q - p);
    R = ['\\text{Datos (modelo): altura inicial }h=8\\text{ m;}' + Q + '\\text{razón de rebote }r=' + rd + '=\\dfrac{' + k + '}{10}' + (q === 10 ? '' : '=' + rt) + '.',
      '\\text{Primer rebote. Sube: }8\\cdot' + rt + '=\\dfrac{' + (8*p) + '}{' + q + '}' + (X1[0] === 8*p ? '' : '=' + ap25Tex(X1, 1)) + '\\text{ m}' + Q + '\\text{Baja lo mismo. Rebote completo:}' + Q + '2\\cdot' + ap25Tex(X1, 1) + '=' + (X1[1] === 1 ? '' + A[0] : '\\dfrac{' + (2*X1[0]) + '}{' + X1[1] + '}' + (A[0] === 2*X1[0] ? '' : '=' + ap25Tex(A, 1))) + '\\text{ m}',
      '\\text{Cada rebote es el anterior por }' + rt + '\\text{:}' + Q + '\\text{serie geométrica, }a=' + ap25Tex(A, 1) + ',\\ \\ r=' + rt + Q + '\\text{Rebotes: }\\displaystyle\\sum_{k=1}^{\\infty}' + ap25Tex(A, 1) + '\\left(' + rt + '\\right)^{k-1}',
      '\\text{Se piden todos: suma infinita.}' + Q + '\\text{Restricción: }|r|=' + rt + '<1\\text{. Converge, y}' + Q + 'S=\\dfrac{a}{1-r}\\ \\text{(hoja «Suma de una serie}' + Q + '\\text{geométrica infinita»).}',
      '\\text{Denominador: }1-' + rt + '=\\dfrac{' + q + '}{' + q + '}-' + rt + '=' + ap25Tex(U, 1) + Q + 'S=' + ap25Tex(A, 1) + '\\div' + ap25Tex(U, 1) + '=' + ap25Tex(A, 1) + '\\cdot' + fr(q, q - p) + '=' + fr(A[0]*q, A[1]*(q - p)) + (Sm[0] === A[0]*q ? '' : '=' + ap25Tex(Sm, 1)) + '\\text{ m}',
      '\\text{Total: bajada inicial más rebotes.}' + Q + (Sm[1] === 1 ? 'D=8+' + Sm[0] + '=' + Dm[0] + '\\text{ m}' : 'D=8+' + ap25Tex(Sm, 1) + '=\\dfrac{' + (8*Sm[1]) + '}{' + Sm[1] + '}+' + ap25Tex(Sm, 1) + '=' + dtx + '\\text{ m}'),
      '\\text{Comprobación con }D=\\dfrac{h\\,(1+r)}{1-r}\\text{:}' + Q + '1+' + rt + '=\\dfrac{' + (q + p) + '}{' + q + '},\\qquad 1-' + rt + '=' + ap25Tex(U, 1) + Q + '\\dfrac{' + (q + p) + '}{' + q + '}\\div' + ap25Tex(U, 1) + '=\\dfrac{' + (q + p) + '}{' + q + '}\\cdot' + fr(q, q - p) + '=' + fr(mult[0], mult[1]) + (co[0] === mult[0] ? '' : '=' + ap25Tex(co, 1)) + Q + '8\\cdot' + ap25Tex(co, 1) + '=' + (co[1] === 1 ? '' + Dm[0] : '\\dfrac{' + (8*co[0]) + '}{' + co[1] + '}' + (8*co[0] === Dm[0] ? '' : '=' + ap25Tex(Dm, 1))) + '\\text{ m, lo mismo.}',
      '\\text{Qué significa: según el modelo, con razón}' + Q + rd + '\\text{ la pelota recorre }' + (Dm[1] === 1 ? Dm[0] : '\\dfrac{' + Dm[0] + '}{' + Dm[1] + '}\\approx ' + decT(Dm[0]/Dm[1], 2)) + '\\text{ m en total:}' + Q + '8\\text{ m de bajada inicial y el resto, de rebotes.}'];
    e.R = R;
    PZ.push(['A' + k, '8\\cdot ' + rd + '=' + dec(8*k/10, 1).replace(',0', '').replace(',', '{,}') + '\\text{ m}', '8 · 0,' + k + ' = ' + dec(8*k/10, 1).replace(',0', '') + ' m', 'c-alt']);
    PZ.push(['B' + k, 'D=8+' + ap25Tex(Sm) + '=' + ap25Tex(Dm) + (Dm[1] === 1 ? '' : '\\approx ' + dec(Dm[0]/Dm[1], 2).replace(',', '{,}')) + '\\text{ m}', 'D = 8 + ' + ap25Pl(Sm) + ' = ' + ap25Pl(Dm) + (Dm[1] === 1 ? '' : ' ≈ ' + dec(Dm[0]/Dm[1], 2)) + ' m', 'diff']);
    DAT.push(e); })(kk);
  function cual(v){ return Math.max(0, Math.min(9, Math.round((v.rz == null ? 0.5 : v.rz)*10))); }
  return {
    world:{x0:-1.3, x1:5.3, y0:0.5, y1:8.75}, aspect:8.25/6.6, _datos:DAT,
    aria:'Arriba, una franja dice qué muestra: la razón de rebote decide el camino total de la pelota. La altura inicial está fija en 8 metros. Un deslizador cambia la razón de rebote, de 0 a 0,9, de décima en décima. Una flecha azul vertical hacia abajo es la bajada inicial, de 8 metros. A su derecha, cada rebote es un par de trazos verdes, subida y bajada, cada par más bajo que el anterior: el primero sube hasta 8 por la razón, con su altura escrita encima, y cada uno de los siguientes sube hasta la altura anterior por la razón; se dibujan a lo más nueve y siguen puntos suspensivos. Abajo, una barra horizontal con una regla de 0 a 152 metros: su trozo azul es la bajada inicial y su trozo verde, la suma de todos los rebotes; bajo la barra queda escrito el total. Con razón 0, la pelota no rebota y el total es 8 metros. Con 0,1 el total es 88 novenos, cerca de 9,78 metros; con 0,2, 12 metros; con 0,3, 104 séptimos, cerca de 14,86; con 0,4, 56 tercios, cerca de 18,67; con 0,5, 24 metros; con 0,6, 32; con 0,7, 136 tercios, cerca de 45,33; con 0,8, 72; con 0,9, 152 metros. Mientras más cerca de 1 está la razón, más crece el total. Bajo el dibujo, la cuenta completa, paso a paso.',
    labels:PZ,
    sliders:[{id:'rz', tex:'\\text{razón}', min:0, max:0.9, step:0.1, value:0.5}],
    legend:'<span><i class="sw sec"></i> bajada inicial, 8 m (fija)</span><span><i class="sw alt"></i> rebotes y su suma</span><span><i class="sw rise"></i> el total \\(D\\)</span>',
    anim:{run:40000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.rz = Math.min(9, Math.floor(p*10))/10; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var k = cual(v), e = DAT[k], r = e.rv, C = S.C, c = S.ctx, X = S.X, Y = S.Y, T = dtEtq(S, PZ), F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0), j, h, x, sm = e.S[0]/e.S[1], dm = e.D[0]/e.D[1], px, pw, py, ph, m;
      function txt(t, x, y, col){ c.font = '600 12.5px ' + F; c.fillStyle = col || C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function num(t, px, py, al){ c.font = '500 10.5px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      /* suelo y bajada inicial */
      S.line(-1.2, G, 5.2, G, {color:C.ink, width:1.1}); num('suelo', X(5.2), Y(G) + 9, 'right');
      ap25Tramo(S, XD, G + 8*E, G, 1, C.sec); c.beginPath(); c.arc(X(XD), Y(G + 8*E), 3.2, 0, 6.2832); c.fillStyle = C.sec; c.fill(); T.L('H0', XD, G + 8*E + 0.3, -50);
      /* rebotes: cada uno sube hasta la altura anterior por la razón */
      h = 8;
      for (j = 0; j < 9; j++){ h = h*r; if (h*E*s < 3) break; x = -0.25 + 0.56*j;
        ap25Tramo(S, x, G, G + h*E, 1, C.alt); ap25Tramo(S, x + 0.22, G + h*E, G, 1, C.alt); c.strokeStyle = C.alt; c.lineWidth = 1; c.setLineDash([2, 2]); c.beginPath(); c.moveTo(X(x), Y(G + h*E)); c.lineTo(X(x + 0.22), Y(G + h*E)); c.stroke(); c.setLineDash([]); }
      if (k > 0){ c.font = '700 14px ' + F; c.fillStyle = C.alt; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('…', X(-0.25 + 0.56*j + 0.11), Y(G + 0.22)); T.L('A' + k, -0.3, G + 8*r*E + 0.3, 0); }
      else txt('razón 0: no rebota', -0.2, G + 0.4, C.alt);
      /* barra del camino total, con regla de 0 a 152 m */
      txt('camino total: bajada inicial + todos los rebotes', -1.2, 3.0, C.muted || '#6b6b6b');
      px = X(BX); py = Y(2.55); ph = 0.32*s; m = BW*s/MAXD;
      c.fillStyle = C.sec; c.globalAlpha = 0.35; c.fillRect(px, py, 8*m, ph); c.globalAlpha = 1; c.strokeStyle = C.sec; c.lineWidth = 1; c.strokeRect(px + 0.5, py + 0.5, 8*m - 1, ph - 1);
      pw = sm*m; if (pw > 0.5){ c.fillStyle = C.alt; c.globalAlpha = 0.35; c.fillRect(px + 8*m, py, pw, ph); c.globalAlpha = 1; c.strokeStyle = C.alt; c.strokeRect(px + 8*m + 0.5, py + 0.5, Math.max(1, pw - 1), ph - 1); }
      c.strokeStyle = C.rise; c.lineWidth = 1.6; c.beginPath(); c.moveTo(px + dm*m, py - 4); c.lineTo(px + dm*m, py + ph + 4); c.stroke();
      c.strokeStyle = C.muted || '#6b6b6b'; c.lineWidth = 1; c.beginPath(); c.moveTo(px, py + ph + 7); c.lineTo(px + MAXD*m, py + ph + 7); c.stroke();
      [0, 50, 100, 152].forEach(function(t){ c.beginPath(); c.moveTo(px + t*m, py + ph + 4); c.lineTo(px + t*m, py + ph + 10); c.stroke(); num(t + (t === 152 ? ' m' : ''), px + t*m, py + ph + 18, t === 0 ? 'left' : t === 152 ? 'right' : 'center'); });
      T.L('B' + k, -1.2, 1.5, 0);
      txt(k === 0 ? 'Caso límite: sin rebotes, solo la bajada.' : k < 5 ? 'Razón chica: los rebotes se apagan pronto.' : k < 8 ? 'Razón más grande: rebotes altos, más camino.' : 'Razón cerca de 1: el camino total se dispara.', -1.2, 0.95);
      dtQue(S, 'la razón de rebote decide el camino', 'total de la pelota. Mueve «razón».');
      T.fin();
    },
    caption:function(v){ var k = cual(v), e = DAT[k]; return 'Altura inicial 8 metros, razón de rebote ' + (k === 0 ? '0' : dec(k/10, 1)) + ': ' + (k === 0 ? 'la pelota no rebota; recorre 8 metros.' : 'los rebotes suman ' + ap25Pl(e.S) + ' metros y el camino total es ' + ap25Pl(e.D) + ' metros.'); },
    readout:function(v){ return dtPasos(DAT[cual(v)].R); }
  };
})());
