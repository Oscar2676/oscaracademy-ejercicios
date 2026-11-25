/* L24 H02 · cubo de un binomio: un cubo de arista a + b cortado en 8 bloques, por pasos (v002) */
OA.scene('bn-cubo', (function(){
  var N = 7, A = 0.9, B = 0.6, E = 0.22, LIFT = 1.5, K = 0.866, D = [A, B];
  var TEX = ['a^{3}', 'a^{2}b', 'ab^{2}', 'b^{3}'], FB = ['a³', 'a²b', 'ab²', 'b³'], CLS = ['c-sec pt', 'diff', 'c-alt pt', 'c-tan pt'], PZ = [], q;
  for (q = 0; q < 8; q++){ var tq = (q & 1) + ((q >> 1) & 1) + ((q >> 2) & 1); PZ.push(['B' + q, TEX[tq], FB[tq], CLS[tq]]); }
  PZ = PZ.concat([
    ['CA1', 'a', 'a', 'c-sec pt'], ['CA2', 'a', 'a', 'c-sec pt'], ['CA3', 'a', 'a', 'c-sec pt'],
    ['CB1', 'b', 'b', 'c-tan pt'], ['CB2', 'b', 'b', 'c-tan pt'], ['CB3', 'b', 'b', 'c-tan pt'],
    ['Q', '(a+b)^{3}=\\ ?', '(a + b)³ = ?', 'pt'], ['F', '\\Longrightarrow\\ a^{3}+3a^{2}b+3ab^{2}+b^{3}', '⟹ a³ + 3a²b + 3ab² + b³', 'diff'],
    ['R1', '\\text{cubo de arista }a+b\\text{: volumen }(a+b)^{3}', 'cubo de arista a + b: volumen (a + b)³', ''],
    ['R2', '\\text{tres cortes: }2\\cdot 2\\cdot 2=8\\text{ bloques}', 'tres cortes: 2 · 2 · 2 = 8 bloques', ''],
    ['R3', '1\\text{ cubo azul: }a\\cdot a\\cdot a=a^{3}', '1 cubo azul: a · a · a = a³', 'c-sec'],
    ['R4', '3\\text{ bloques naranjas: }3\\cdot(a\\cdot a\\cdot b)=3a^{2}b', '3 bloques naranjas: 3 · (a · a · b) = 3a²b', 'diff'],
    ['R5', '3\\text{ bloques verdes: }3\\cdot(a\\cdot b\\cdot b)=3ab^{2}', '3 bloques verdes: 3 · (a · b · b) = 3ab²', 'c-alt'],
    ['R6', '1\\text{ cubo burdeo: }b\\cdot b\\cdot b=b^{3}', '1 cubo burdeo: b · b · b = b³', 'c-tan'],
    ['R7', '(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}', '(a + b)³ = a³ + 3a²b + 3ab² + b³', 'diff']]);
  var TXT = [['Un cubo. Cada arista mide a más b.', 'Su volumen es la arista elevada a tres.'],
    ['Se corta donde termina a, en las tres direcciones.', 'Quedan 8 bloques. La capa de arriba se levanta.'],
    ['El cubo azul: sus tres aristas miden a.', 'Hay uno solo. Está abajo, al fondo.'],
    ['Bloques naranjas: dos aristas a y una arista b.', 'Son tres: dos abajo y uno arriba.'],
    ['Bloques verdes: una arista a y dos aristas b.', 'Son tres: uno abajo y dos arriba.'],
    ['El cubo burdeo: sus tres aristas miden b.', 'Hay uno solo. Está arriba, adelante.'],
    ['Los 8 bloques juntos llenan el cubo grande.', 'Se suman sus volúmenes: esa es la respuesta.']];
  /* lectura: las líneas que agrega cada paso (en el dibujo, a = 3 y b = 2) */
  var LS = [
    ['\\text{datos del dibujo: }a=3,\\quad b=2', '\\text{arista del cubo: }a+b=3+2=5', '\\text{volumen: }(a+b)^{3}=5^{3}=5\\cdot 5\\cdot 5=25\\cdot 5=125'],
    ['\\text{2 tramos por arista: }2\\cdot 2\\cdot 2=4\\cdot 2=8\\text{ bloques}'],
    ['\\text{cubo azul: }a\\cdot a\\cdot a=a^{3}=3\\cdot 3\\cdot 3=9\\cdot 3=27'],
    ['\\text{un bloque naranja: }a\\cdot a\\cdot b=a^{2}b=3\\cdot 3\\cdot 2=9\\cdot 2=18', '\\text{son tres: }3a^{2}b=3\\cdot 18=54'],
    ['\\text{un bloque verde: }a\\cdot b\\cdot b=ab^{2}=3\\cdot 2\\cdot 2=6\\cdot 2=12', '\\text{son tres: }3ab^{2}=3\\cdot 12=36'],
    ['\\text{cubo burdeo: }b\\cdot b\\cdot b=b^{3}=2\\cdot 2\\cdot 2=4\\cdot 2=8'],
    ['\\text{suma: }a^{3}+3a^{2}b+3ab^{2}+b^{3}=27+54+36+8', '27+54=81;\\quad 81+36=117;\\quad 117+8=125', '\\text{da }125=5^{3}\\text{: los 8 bloques llenan el cubo}', '\\text{por eso }(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}']];
  function P(x, y, z){ return [(x - y)*K, z - (x + y)*0.5]; }
  return {
    world:{x0:-2.6, x1:2.6, y0:-6.3, y1:4.5}, aspect:10.8/5.2,
    aria:'Animación en siete pasos. Uno: un cubo dibujado en tres dimensiones; cada arista tiene un tramo a y un tramo b, y se pregunta por su volumen, a más b al cubo. Dos: el cubo se corta en las tres direcciones donde termina a; quedan ocho bloques y la capa de arriba, de altura b, se levanta. Tres: se pinta de azul el cubo de arista a, de volumen a al cubo; está abajo, al fondo. Cuatro: se pintan de naranja los tres bloques de volumen a al cuadrado por b, dos abajo y uno arriba. Cinco: se pintan de verde los tres bloques de volumen a por b al cuadrado, uno abajo y dos arriba. Seis: se pinta de burdeo el cubo de arista b, de volumen b al cubo; está arriba, adelante. Siete: se suman los ocho volúmenes y la respuesta, a al cubo más tres a al cuadrado b más tres a b al cuadrado más b al cubo, se escribe junto a la pregunta. Bajo la figura, un registro numerado guarda lo que se obtiene en cada paso, sin borrar lo anterior.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> 1 cubo \\(a^{3}\\)</span><span><i class="sw rise"></i> 3 bloques \\(a^{2}b\\)</span><span><i class="sw alt"></i> 3 bloques \\(ab^{2}\\)</span><span><i class="sw tan"></i> 1 cubo \\(b^{3}\\)</span>',
    anim:{run:36000, hold:3000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = dtSuave((t - Math.floor(t))*1.4); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, on = {}, F = '"Source Sans 3", system-ui, sans-serif', s = X(1) - X(0),
        m = k === 1 ? 0 : k === 2 ? u : 1, e = E*m, lift = LIFT*m, Tt = A + e + B, o = [0, A + e], oz = [0, A + lift], cols = [C.sec, C.rise, C.alt, C.tan], GRIS = '#aab2bb', i, j, z, t, al, w1, p;
      function face(pts, col, a, l0, l1, sa){ var g, p0 = P.apply(null, pts[0]), p2 = P.apply(null, pts[2]), n, r;
        c.beginPath(); for (n = 0; n < 4; n++){ r = P.apply(null, pts[n]); if (n) c.lineTo(X(r[0]), Y(r[1])); else c.moveTo(X(r[0]), Y(r[1])); } c.closePath();
        c.fillStyle = GRIS; c.fill(); if (a > 0){ c.save(); c.globalAlpha = c.globalAlpha*a; c.fillStyle = col; c.fill(); c.restore(); }
        g = c.createLinearGradient(X(p0[0]), Y(p0[1]), X(p2[0]), Y(p2[1])); g.addColorStop(0, 'rgba(255,255,255,' + l0 + ')'); g.addColorStop(1, 'rgba(0,0,0,' + l1 + ')'); c.fillStyle = g; c.fill();
        if (sa > 0){ c.strokeStyle = 'rgba(255,255,255,' + (0.9*sa) + ')'; c.lineWidth = 1; c.stroke(); } }
      /* cuerpo con degradado: cara de arriba clara, cara derecha media, cara izquierda oscura */
      function box(x, y, zz, w, dd, h, col, a, sa){
        face([[x, y, zz + h], [x + w, y, zz + h], [x + w, y + dd, zz + h], [x, y + dd, zz + h]], col, a, 0.55, 0.0, sa);
        face([[x + w, y, zz + h], [x + w, y + dd, zz + h], [x + w, y + dd, zz], [x + w, y, zz]], col, a, 0.22, 0.18, sa);
        face([[x, y + dd, zz + h], [x + w, y + dd, zz + h], [x + w, y + dd, zz], [x, y + dd, zz]], col, a, 0.05, 0.34, sa); }
      /* cota: tramo con topes, desplazado en píxeles, y su rótulo TeX; se calcula en cada cuadro, así acompaña a la pieza */
      function cota(p0, p1, col, ox, oy, id, lx, ly){ var a = P.apply(null, p0), b = P.apply(null, p1), ax = X(a[0]) + ox, ay = Y(a[1]) + oy, bx = X(b[0]) + ox, by = Y(b[1]) + oy, d = Math.hypot(ox, oy) || 1, tx = ox/d*3.5, ty = oy/d*3.5;
        c.strokeStyle = col; c.lineWidth = 1.2; c.setLineDash([]); c.beginPath(); c.moveTo(ax, ay); c.lineTo(bx, by); c.moveTo(ax - tx, ay - ty); c.lineTo(ax + tx, ay + ty); c.moveTo(bx - tx, by - ty); c.lineTo(bx + tx, by + ty); c.stroke();
        lab(id, (ax + bx)/2 + lx, (ay + by)/2 + ly, -50); }
      /* rótulo TeX en píxeles; los que no se usan en este cuadro se ocultan al final */
      function lab(id, px, py, ax){ on[id] = 1; S.lab(id, px, py, ax, -50, true); }
      function guia(x, y){ var a = P(x, y, A), b = P(x, y, A + lift); c.save(); c.globalAlpha = 0.55; c.strokeStyle = C.muted || '#6b6b6b'; c.lineWidth = 1; c.setLineDash([3, 3]); c.beginPath(); c.moveTo(X(a[0]), Y(a[1])); c.lineTo(X(b[0]), Y(b[1])); c.stroke(); c.restore(); c.setLineDash([]); }
      function txt(tx, x, y){ c.font = '600 12.5px ' + F; c.fillStyle = C.ink; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText(tx, X(x), Y(y)); }
      /* los 8 bloques: grises hasta que se nombran; después toman su color y lo conservan hasta el final */
      for (z = 0; z < 2; z++){
        if (z === 1 && lift > 0.02){ guia(0, Tt); guia(Tt, 0); } /* hueco que deja la capa de arriba al levantarse */
        for (i = 0; i < 2; i++) for (j = 0; j < 2; j++){ t = i + j + z; al = k > t + 3 ? 1 : k === t + 3 ? u : 0; box(o[i], o[j], oz[z], D[i], D[j], D[z], cols[t], al, k === 1 ? 0 : m); }
      }
      /* paso 1: el cubo entero, sin cortes; al empezar el paso 2 se funde con los 8 bloques */
      w1 = k === 1 ? 1 : k === 2 ? Math.max(0, 1 - 3*u) : 0;
      if (w1 > 0){ c.save(); c.globalAlpha = w1; box(0, 0, 0, Tt, Tt, A + B, GRIS, 0, 1); c.restore(); }
      /* cotas de las tres direcciones: tramo a (azul) y tramo b (burdeo) */
      cota([0, Tt, 0], [A, Tt, 0], C.sec, -5, 7, 'CA1', -9, 12); cota([A + e, Tt, 0], [Tt, Tt, 0], C.tan, -5, 7, 'CB1', -9, 12);
      cota([Tt, Tt, 0], [Tt, A + e, 0], C.tan, 5, 7, 'CB2', 9, 12); cota([Tt, A, 0], [Tt, 0, 0], C.sec, 5, 7, 'CA2', 9, 12);
      cota([Tt, 0, 0], [Tt, 0, A], C.sec, 8, 0, 'CA3', 12, 0); cota([Tt, 0, A + lift], [Tt, 0, A + lift + B], C.tan, 8, 0, 'CB3', 12, 0);
      /* rótulo de cada bloque, sobre su cara de arriba, desde el paso en que se nombra */
      for (z = 0; z < 2; z++) for (i = 0; i < 2; i++) for (j = 0; j < 2; j++){ t = i + j + z; if (k > t + 3 || (k === t + 3 && u > 0.5)){ p = P(o[i] + D[i]/2, o[j] + D[j]/2, oz[z] + D[z]); lab('B' + (i + 2*j + 4*z), X(p[0]), Y(p[1]), -50); } }
      /* la pregunta queda; la respuesta se escribe a su lado */
      lab('Q', X(-2.5), Y(3.42), 0); if (k === N && u > 0.5) lab('F', X(-2.5) + S.labW('Q') + 6, Y(3.42), 0);
      txt(TXT[k - 1][0], -2.5, -2.3); txt(TXT[k - 1][1], -2.5, -2.3 - 20/s);
      c.font = '600 11px ' + F; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('paso ' + k + ' de ' + N, X(2.5), Y(-1.85));
      dtQue(S, 'un cubo de arista a más b se corta', 'en 8 bloques; su volumen es la suma de ellos.');
      PZ.forEach(function(r){ if (!on[r[0]]) S.lab(r[0], 0, 0, 0, 0, false); });
      oaReg(S, k, N, -2.5, -3.5, [0, 25, 50, 75, 100, 125, 150]);
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1), R = [], n; for (n = 0; n < k; n++) R = R.concat(LS[n]); return dtPasos(R); }
  };
})());
