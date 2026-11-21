OA.scene('bn-cubo', (function(){
  var A = 1.2, B = 0.7, K = 0.866, LIFT = 1.75;
  function P(x, y, z){ return [(x - y)*K, z - (x + y)*0.5]; }
  return {
    world:{x0:-2.6, x1:2.6, y0:-5.5, y1:4.0}, aspect:9.5/5.2,
    aria:'Un cubo de arista a más b, dibujado en tres dimensiones con caras sombreadas. Se corta en las tres direcciones y queda en ocho bloques. La capa de arriba, de altura b, se levanta para dejar ver la de abajo, de altura a. Abajo hay un cubo azul de arista a, dos bloques naranjas de volumen a al cuadrado b y un bloque verde de volumen a b al cuadrado. Arriba hay un bloque naranja, dos verdes y un cubo burdeo de arista b. En total: uno azul, tres naranjas, tres verdes y uno burdeo.',
    labels:[['F', '(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}', '(a + b)³ = a³ + 3a²b + 3ab² + b³', 'diff']],
    sliders:[{id:'sep', tex:'\\text{separación}', min:0, max:0.3, step:0.01, value:0.3}],
    legend:'<span><i class="sw sec"></i> 1 cubo \\(a^{3}\\)</span><span><i class="sw rise"></i> 3 bloques \\(a^{2}b\\)</span><span><i class="sw alt"></i> 3 bloques \\(ab^{2}\\)</span><span><i class="sw tan"></i> 1 cubo \\(b^{3}\\)</span>',
    anim:{run:20000, hold:7000, still:1, apply:function(p, v){ var u = Math.max(0, Math.min(1, (p - 0.15)/0.35)); v.q = p; v.sep = 0.3*u; v.u = u; v.st = p < 0.15 ? 1 : p < 0.55 ? 2 : p < 0.8 ? 3 : 4; }},
    onInput:function(v){ v.q = null; v.st = 4; v.u = v.sep/0.3; },
    draw:function(S, v){
      var e = v.sep == null ? 0.3 : v.sep, u = v.u == null ? 1 : v.u, lift = LIFT*u, st = v.st || 4, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), cols = [C.sec, C.rise, C.alt, C.tan], i, j, k, o = [0, A + e], d = [A, B], oz = [0, A + lift], T = A + B + e, x0, y0, p;
      function face(pts, col, l0, l1){ var g, a = P.apply(null, pts[0]), b = P.apply(null, pts[2]), n;
        c.beginPath(); for (n = 0; n < 4; n++){ p = P.apply(null, pts[n]); if (n) c.lineTo(X(p[0]), Y(p[1])); else c.moveTo(X(p[0]), Y(p[1])); } c.closePath();
        c.fillStyle = col; c.fill(); g = c.createLinearGradient(X(a[0]), Y(a[1]), X(b[0]), Y(b[1])); g.addColorStop(0, 'rgba(255,255,255,' + l0 + ')'); g.addColorStop(1, 'rgba(0,0,0,' + l1 + ')'); c.fillStyle = g; c.fill(); c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1; c.stroke(); }
      function box(x, y, z, w, dd, h, col){
        face([[x, y, z + h], [x + w, y, z + h], [x + w, y + dd, z + h], [x, y + dd, z + h]], col, 0.55, 0.0);
        face([[x + w, y, z + h], [x + w, y + dd, z + h], [x + w, y + dd, z], [x + w, y, z]], col, 0.22, 0.18);
        face([[x, y + dd, z + h], [x + w, y + dd, z + h], [x + w, y + dd, z], [x, y + dd, z]], col, 0.05, 0.34); }
      function cota(p0, p1, t, col, ox, oy, tx, ty){ var a = P.apply(null, p0), b = P.apply(null, p1); c.strokeStyle = col; c.lineWidth = 1.2; c.beginPath(); c.moveTo(X(a[0]) + ox, Y(a[1]) + oy); c.lineTo(X(b[0]) + ox, Y(b[1]) + oy); c.stroke(); txt(t, (X(a[0]) + X(b[0]))/2 + tx, (Y(a[1]) + Y(b[1]))/2 + ty, 'center', col); }
      for (k = 0; k < 2; k++){ for (i = 0; i < 2; i++) for (j = 0; j < 2; j++) box(o[i], o[j], oz[k], d[i], d[j], d[k], cols[i + j + k]);
        if (k === 0){ cota([0, T, 0], [A, T, 0], 'a', C.sec, 0, 9, -4, 21); cota([A + e, T, 0], [T, T, 0], 'b', C.tan, 0, 9, -4, 21); cota([T, T, 0], [T, A + e, 0], 'b', C.tan, 0, 9, 4, 21); cota([T, A, 0], [T, 0, 0], 'a', C.sec, 0, 9, 4, 21); cota([T, 0, 0], [T, 0, A], 'a', C.sec, 9, 0, 20, 0); } }
      cota([T, 0, A + lift], [T, 0, A + lift + B], 'b', C.tan, 9, 0, 20, 0);
      x0 = X(-2.5); y0 = Y(-2.95);
      txt('(a + b)³ = volumen del cubo de arista a + b', x0, y0, 'left', C.ink);
      if (st >= 2) txt('tres cortes: 2 · 2 · 2 = 8 bloques, en dos capas', x0, y0 + 21, 'left', C.ink);
      if (st >= 3){ txt('1 de a³', x0, y0 + 42, 'left', C.sec); txt('3 de a²b', x0 + 60, y0 + 42, 'left', C.rise); txt('3 de ab²', x0 + 128, y0 + 42, 'left', C.alt); txt('1 de b³', x0 + 196, y0 + 42, 'left', C.tan); }
      if (st >= 4) txt('(a + b)³ = a³ + 3a²b + 3ab² + b³', x0, y0 + 63, 'left', C.tan);
      S.lab('F', x0, y0 + 88, 0, 0, st >= 4 && v.q != null);
    },
    caption:function(v){ var st = v.st || 4; return st === 1 ? 'Un cubo de arista a + b. Su volumen es (a + b)³' : st === 2 ? 'Se corta donde termina a y empieza b, en las tres direcciones. La capa de arriba (altura b) se levanta para que se vea la de abajo (altura a). Quedan 8 bloques' : st === 3 ? 'Abajo: 1 cubo a³, 2 bloques a²b y 1 bloque ab². Arriba: 1 bloque a²b, 2 bloques ab² y 1 cubo b³. Por tipo: 1, 3, 3 y 1' : 'El volumen del cubo grande es la suma de los 8 bloques: a³ + 3a²b + 3ab² + b³. Los coeficientes 1, 3, 3, 1 son la cantidad de bloques de cada tipo'; },
    readout:function(){ return [['', '(a+b)^{3}=(a+b)(a+b)^{2}=(a+b)\\left(a^{2}+2ab+b^{2}\\right)'], ['d', '(a+b)^{3}=a^{3}+3a^{2}b+3ab^{2}+b^{3}'], ['', '\\text{capa de abajo: }a^{3}+2a^{2}b+ab^{2}\\qquad\\text{capa de arriba: }a^{2}b+2ab^{2}+b^{3}']]; }
  };
})());
