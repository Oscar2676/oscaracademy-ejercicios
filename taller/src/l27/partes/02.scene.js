/* Coordenadas polares, cilíndricas y esféricas. Dibujo propio; rótulos algebraicos como etiquetas TeX. */
(function(){
  function cil(r, t, z){ return [r*Math.cos(t), r*Math.sin(t), z]; }
  function arco(r, t0, t1, z){ var p = [], i; for (i = 0; i <= 16; i++) p.push(cil(r, t0 + (t1 - t0)*i/16, z)); return p; }
  /* celda cilíndrica [r0,r1]×[t0,t1]×[z0,z1] */
  function mov(p, o){ return o ? p.map(function(q){ return [q[0] + o[0], q[1] + o[1], q[2] + o[2]]; }) : p; }
  function celda(K, r0, r1, t0, t1, z0, z1, col, alpha, st, o){
    var a0 = mov(arco(r0, t0, t1, z0), o), a1 = mov(arco(r1, t0, t1, z0), o), b0 = mov(arco(r0, t0, t1, z1), o), b1 = mov(arco(r1, t0, t1, z1), o), s = st || col, cil = function(r, t, z){ var q = [r*Math.cos(t), r*Math.sin(t), z]; return o ? [q[0] + o[0], q[1] + o[1], q[2] + o[2]] : q; };
    K.poly(a0.concat(a1.slice().reverse()), col, alpha*0.5, s);                                   /* piso */
    K.poly(a0.concat(b0.slice().reverse()), col, alpha*0.6, s);                                   /* cara interior */
    K.poly([cil(r0, t1, z0), cil(r1, t1, z0), cil(r1, t1, z1), cil(r0, t1, z1)], col, alpha*0.6, s); /* cara θ mayor */
    K.poly([cil(r0, t0, z0), cil(r1, t0, z0), cil(r1, t0, z1), cil(r0, t0, z1)], col, alpha*0.8, s); /* cara θ menor */
    K.poly(a1.concat(b1.slice().reverse()), col, alpha, s);                                       /* cara exterior */
    K.poly(b0.concat(b1.slice().reverse()), col, alpha*0.9, s);                                   /* tapa */
  }
  /* ── la idea: el elemento de volumen en cilíndricas (figura clásica: bloque, su sombra polar, una celda y su ampliación) ── */
  OA.scene('cm-coord-idea', (function(){
    var N = 6, A = 1.2, B = 2.6, AL = 0.6, BE = 1.4, CC = 1.2, DD = 3.0;
    function part(n){ return {dr:(B - A)/n, dt:(BE - AL)/n, dz:(DD - CC)/n}; }
    var PZ = cmEJ.concat([
      ['LA', 'a', 'a', ''], ['LB', 'b', 'b', ''], ['TA', '\\theta=\\alpha', 'θ = α', ''], ['TB', '\\theta=\\beta', 'θ = β', ''], ['ZC', 'c', 'c', ''], ['ZD', 'd', 'd', ''],
      ['PS', '\\left(r^{*},\\ \\theta^{*},\\ z^{*}\\right)', '(r*, θ*, z*)', 'pt'],
      ['DR', '\\Delta r', 'Δr', 'diff'], ['DT', 'r^{*}\\Delta\\theta', 'r* Δθ', 'c-alt'], ['DZ', '\\Delta z', 'Δz', 'c-sec'],
      ['R1', 'E:\\ \\ a\\le r\\le b,\\ \\ \\alpha\\le\\theta\\le\\beta,\\ \\ c\\le z\\le d', 'E: a ≤ r ≤ b, α ≤ θ ≤ β, c ≤ z ≤ d', ''],
      ['R2', '\\Delta r=\\dfrac{b-a}{n},\\ \\ \\Delta\\theta=\\dfrac{\\beta-\\alpha}{n},\\ \\ \\Delta z=\\dfrac{d-c}{n}', 'Δr = (b − a)/n, Δθ = (β − α)/n, Δz = (d − c)/n', ''],
      ['R3', '\\text{punto de muestra: }\\left(r^{*},\\ \\theta^{*},\\ z^{*}\\right)', 'punto de muestra: (r*, θ*, z*)', ''],
      ['R4', '\\text{lados de la celda: }\\ \\Delta r,\\ \\ r^{*}\\Delta\\theta,\\ \\ \\Delta z', 'lados de la celda: Δr, r* Δθ, Δz', ''],
      ['R5', '\\Delta V\\approx r^{*}\\,\\Delta r\\,\\Delta\\theta\\,\\Delta z', 'ΔV ≈ r* Δr Δθ Δz', ''],
      ['R6', 'V\\approx\\displaystyle\\sum_{i=1}^{n}\\sum_{j=1}^{n}\\sum_{k=1}^{n} r_{ijk}^{*}\\,\\Delta r\\,\\Delta\\theta\\,\\Delta z', 'V ≈ suma triple de r* Δr Δθ Δz', ''],
      ['R7', 'V=\\displaystyle\\int_{c}^{d}\\!\\int_{\\alpha}^{\\beta}\\!\\int_{a}^{b} r\\,dr\\,d\\theta\\,dz', 'V = ∫ de c a d ∫ de α a β ∫ de a a b de r dr dθ dz', 'diff']
    ]);
    var FILA = [0, 34, 78, 108, 138, 176, 228];
    var TXT = [
      ['Un bloque curvo, descrito con radio, ángulo y altura.', 'En el suelo, su sombra: un sector de corona.'],
      ['El bloque se parte en celdas, cortando', 'en las tres direcciones. La sombra se parte igual.'],
      ['Se elige una celda y un punto dentro de ella.', 'Su sombra es una baldosa de la sombra del bloque.'],
      ['La celda, ampliada. Es casi una caja: dos lados', 'rectos y un arco, que mide radio por ángulo.'],
      ['La celda recorre el bloque. Hacia el eje, el arco', 'se acorta: su volumen depende del radio.'],
      ['Con una partición más fina, las celdas se parecen', 'cada vez más a cajas. La suma se vuelve integral.']
    ];
    return {
      world:{x0:-2.3, x1:3.9, y0:-10.1, y1:3.95}, aspect:14.05/6.2,
      aria:'Animación en seis pasos sobre el elemento de volumen en coordenadas cilíndricas. Uno: un bloque curvo azul flota sobre el suelo, entre las alturas c y d, entre los radios a y b y entre los ángulos alfa y beta; en el suelo, su sombra burdeo, un sector de corona, con los rayos theta igual a alfa y theta igual a beta. Dos: el bloque y su sombra se parten en celdas con una malla. Tres: una celda de la capa de arriba se destaca en naranja, con un punto de muestra en su interior; líneas punteadas la unen con su baldosa en la sombra. Cuatro: abajo a la derecha aparece la misma celda ampliada, unida por una flecha, con sus tres lados rotulados: delta r, r asterisco por delta theta, que es un arco, y delta z. Cinco: la celda recorre el bloque, primero girando en su nivel y luego hacia el eje; en la ampliación el arco se acorta al acercarse al eje. Seis: la partición se hace más fina, de cuatro a ocho cortes por dirección; la celda se achica y en la ampliación se parece cada vez más a una caja. Bajo la figura, un registro numerado guarda la expresión de cada paso, una bajo la otra, sin borrar las anteriores: el bloque, los tamaños de la partición, el punto de muestra, los lados de la celda, el volumen de la celda, la suma triple y, al final, la integral triple del volumen.',
      labels:PZ,
      sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
      legend:'<span><i class="sw sec"></i> el bloque \\(E\\)</span><span><i class="sw tan"></i> su sombra en el suelo</span><span><i class="sw rise"></i> la celda y \\(\\Delta r\\)</span><span><i class="sw alt"></i> el arco \\(r^{*}\\Delta\\theta\\)</span>',
      anim:{run:42000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = cmSuave((t - Math.floor(t))*1.25); }},
      onInput:function(v){ v.q = null; v.u = 1; },
      draw:function(S, v){
        var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, K = cmKit(S), T = cmEtq(S, PZ), L = T.L, i, n, P, r0, t0, z0, e, base, cen, Z, ins, a, b2, q, rs;
        function tramo(w, pts){ var m = pts.length - 1, qq = Math.min(m - 1e-9, Math.max(0, w)*m), aa = Math.floor(qq); return pts[aa] + (pts[aa + 1] - pts[aa])*cmSuave(qq - aa); }
        n = k < 6 ? 4 : 4 + Math.round(4*u); P = part(n);
        /* ejes, sombra y referencias */
        K.suelo(); K.ejes(3.9); cmEjesLab(K, L, 3.9);
        K.line([0, 0, 0], cil(3.05, AL, 0), 'rgba(0,0,0,0.45)', 1); K.line([0, 0, 0], cil(3.05, BE, 0), 'rgba(0,0,0,0.45)', 1);
        L('TA', K.at(cil(3.05, AL, 0)), -50, -16, 12); L('TB', K.at(cil(3.05, BE, 0)), 0, 6, 8);
        e = k === 1 ? u : 1;
        K.poly(arco(A, AL, BE, 0).concat(arco(B, AL, BE, 0).reverse()), C.tan, 0.2*e, C.tan);
        K.dot(cil(A, AL, 0), C.ink, 2); K.dot(cil(B, AL, 0), C.ink, 2); L('LA', K.at(cil(A, AL, 0)), -100, -6, 4); L('LB', K.at(cil(B, AL, 0)), -100, -6, 6);
        if (k >= 2){ e = k === 2 ? u : 1; for (i = 1; i < n; i++){ K.path(arco(A + P.dr*i, AL, BE, 0), 'rgba(138,31,45,' + 0.5*e + ')', 0.8); K.line(cil(A, AL + P.dt*i, 0), cil(B, AL + P.dt*i, 0), 'rgba(138,31,45,' + 0.5*e + ')', 0.8); } }
        /* alturas c y d */
        K.line([0, 0, CC], cil(A, BE, CC), 'rgba(0,0,0,0.4)', 0.8, [3, 3]); K.line([0, 0, DD], cil(A, BE, DD), 'rgba(0,0,0,0.4)', 0.8, [3, 3]); L('ZC', K.at([0, 0, CC]), -100, -6, 0); L('ZD', K.at([0, 0, DD]), -100, -6, 0);
        [[A, AL], [B, AL], [B, BE], [A, BE]].forEach(function(w){ K.line(cil(w[0], w[1], 0), cil(w[0], w[1], CC), 'rgba(0,0,0,0.35)', 0.8, [3, 3]); });
        /* el bloque: seis caras traslúcidas y la malla en las tres visibles */
        e = k === 1 ? u : 1;
        celda(K, A, B, AL, BE, CC, CC + (DD - CC)*e, C.sec, 0.32);
        if (k >= 2){ e = k === 2 ? u : 1; q = 'rgba(31,95,138,' + 0.8*e + ')';
          for (i = 1; i < n; i++){
            K.path(arco(A + P.dr*i, AL, BE, DD), q, 0.8); K.line(cil(A, AL + P.dt*i, DD), cil(B, AL + P.dt*i, DD), q, 0.8);               /* tapa */
            K.path(arco(B, AL, BE, CC + P.dz*i), q, 0.8); K.line(cil(B, AL + P.dt*i, CC), cil(B, AL + P.dt*i, DD), q, 0.8);               /* cara exterior */
            K.line(cil(A, AL, CC + P.dz*i), cil(B, AL, CC + P.dz*i), q, 0.8); K.line(cil(A + P.dr*i, AL, CC), cil(A + P.dr*i, AL, DD), q, 0.8); /* cara θ = α */
          } }
        /* la celda destacada: capa de arriba; recorre su nivel y luego hacia el eje (paso 5) */
        if (k >= 3){
          r0 = B - P.dr; t0 = AL + P.dt*Math.floor(n/4); z0 = DD - P.dz;
          if (k === 5){ if (u < 0.5) t0 = tramo(u/0.5, [t0, BE - P.dt, AL, t0]); else r0 = tramo((u - 0.5)/0.5, [r0, A]); }
          if (k === 6) { r0 = A; t0 = AL + P.dt*Math.floor(n/4); }
          e = k === 3 ? u : 1;
          K.poly(arco(r0, t0, t0 + P.dt, 0).concat(arco(r0 + P.dr, t0, t0 + P.dt, 0).reverse()), C.tan, 0.75*e, C.tan);
          [[r0, t0], [r0 + P.dr, t0], [r0 + P.dr, t0 + P.dt], [r0, t0 + P.dt]].forEach(function(w){ K.line(cil(w[0], w[1], 0), cil(w[0], w[1], z0), C.rise, 0.9, [3, 3]); });
          celda(K, r0, r0 + P.dr, t0, t0 + P.dt, z0, z0 + P.dz, C.rise, 0.6*e, C.rise);
          rs = r0 + P.dr/2; cen = cil(rs, t0 + P.dt/2, z0 + P.dz/2); K.dot(cen, '#fff', 3.6); K.dot(cen, C.ink, 2.2);
          if (k === 3 && u >= 1 || k > 3){ a = K.at(cen); c.strokeStyle = C.ink; c.lineWidth = 0.9; c.beginPath(); c.moveTo(a[0], a[1]); c.lineTo(S.X(2.2), S.Y(3.2)); c.stroke(); L('PS', [S.X(2.25), S.Y(3.25)], 0); }
        }
        /* la celda ampliada, con sus cotas (no las pierde nunca) */
        if (k >= 4){
          e = k === 4 ? u : 1; Z = 0.525/P.dr; ins = [S.X(2.45), S.Y(-1.75)]; a = K.at(cen);
          /* flecha de la celda a su ampliación */
          c.strokeStyle = 'rgba(0,0,0,0.55)'; c.lineWidth = 1; c.beginPath(); c.moveTo(a[0] + 6, a[1]); c.quadraticCurveTo(S.X(3.85), S.Y(1.4), ins[0] + 26, ins[1] - 52); c.stroke();
          c.fillStyle = 'rgba(0,0,0,0.55)'; c.beginPath(); c.moveTo(ins[0] + 26, ins[1] - 46); c.lineTo(ins[0] + 21, ins[1] - 56); c.lineTo(ins[0] + 31, ins[1] - 56); c.closePath(); c.fill();
          base = K.P; b2 = base(cen[0], cen[1], cen[2]);
          K.P = function(x, y, z){ var w = base(cen[0] + Z*(x - cen[0]), cen[1] + Z*(y - cen[1]), cen[2] + Z*(z - cen[2])); return [w[0] - b2[0] + (ins[0] - S.X(0))/(S.X(1) - S.X(0)), w[1] - b2[1] - (ins[1] - S.Y(0))/(S.X(1) - S.X(0))]; };
          celda(K, r0, r0 + P.dr, t0, t0 + P.dt, z0, z0 + P.dz, C.rise, 0.55*e, C.rise);
          K.dot(cen, C.ink, 2.4);
          K.line(cil(r0, t0, z0), cil(r0 + P.dr, t0, z0), C.rise, 3); K.path(arco(r0 + P.dr, t0, t0 + P.dt, z0), C.alt, 3); K.line(cil(r0 + P.dr, t0 + P.dt, z0), cil(r0 + P.dr, t0 + P.dt, z0 + P.dz), C.sec, 3);
          L('DR', K.at(cil(r0 + P.dr/2, t0, z0)), -100, -8, 10); L('DT', K.at(cil(r0 + P.dr, t0 + P.dt/2, z0)), -50, 6, 16); L('DZ', K.at(cil(r0 + P.dr, t0 + P.dt, z0 + P.dz/2)), 0, 8, 0);
          K.P = base;
          K.txt('la celda, ampliada', 2.45, -3.2, C.rise, 11.5, 'center');
        }
        /* registro: las expresiones de cada paso se van agregando hacia abajo y no se borran */
        var nf = k < 6 ? k : (u >= 0.5 ? 7 : 6), y0r = S.Y(-5.25), fi;
        K.txt('Paso a paso, lo que se va obteniendo:', -2.2, -4.7, C.muted || '#6b6b6b', 11.5);
        for (fi = 0; fi < nf; fi++){ var act = (fi === k - 1) || (k === 6 && fi === nf - 1); c.beginPath(); c.arc(S.X(-2.05), y0r + FILA[fi], 9, 0, 6.2832); c.fillStyle = act ? C.rise : 'rgba(0,0,0,0.08)'; c.fill();
          c.font = '700 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = act ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + (fi + 1), S.X(-2.05), y0r + FILA[fi] + 0.5);
          L('R' + (fi + 1), [S.X(-1.75), y0r + FILA[fi]], 0); }
        if (k >= 2) K.txt(n + ' × ' + n + ' × ' + n + ' = ' + n*n*n + ' celdas', -2.2, -2.75, C.muted || '#6b6b6b', 11.5);
        K.txt(TXT[k - 1][0], -2.2, -3.75); K.txt(TXT[k - 1][1], -2.2, -3.75 - 21/(S.X(1) - S.X(0)));
        K.txt('paso ' + k + ' de ' + N, 3.8, 3.75, C.muted || '#6b6b6b', 11, 'right');
        T.fin();
      },
      caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
      readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['E=\\big\\{(r,\\theta,z):\\ a\\le r\\le b,\\ \\alpha\\le\\theta\\le\\beta,\\ c\\le z\\le d\\big\\}', '\\Delta r=\\dfrac{b-a}{n},\\qquad \\Delta\\theta=\\dfrac{\\beta-\\alpha}{n},\\qquad \\Delta z=\\dfrac{d-c}{n}', '\\text{punto de muestra }\\left(r^{*},\\ \\theta^{*},\\ z^{*}\\right)\\text{ en la celda}', '\\text{arco}=\\text{radio}\\times\\text{ángulo}=r^{*}\\Delta\\theta', '\\Delta V\\approx r^{*}\\,\\Delta r\\,\\Delta\\theta\\,\\Delta z', '\\displaystyle V=\\lim_{n\\to\\infty}\\sum r^{*}\\,\\Delta r\\,\\Delta\\theta\\,\\Delta z=\\iiint_{E} r\\,dr\\,d\\theta\\,dz'][k - 1]]]; }
    };
  })());

  /* ── coordenadas esféricas: un punto y sus tres datos ── */
  OA.scene('cm-coord-esfera', (function(){
    var RHO = 2.6;
    var PZ = cmEJ.concat([['LP', '\\rho', 'ρ', 'diff'], ['LF', '\\varphi', 'φ', 'c-tan'], ['LT', '\\theta', 'θ', 'c-alt'], ['PT', '(\\rho,\\ \\varphi,\\ \\theta)', '(ρ, φ, θ)', 'pt']]);
    return {
      world:{x0:-3.7, x1:3.9, y0:-1.9, y1:4.3}, aspect:6.2/7.6,
      aria:'Un punto en el espacio ubicado con coordenadas esféricas. Un trazo naranja une el origen con el punto: su largo es rho. Un arco burdeo marca el ángulo fi, que se mide desde el eje z positivo hasta ese trazo. La sombra del punto cae en el suelo, y un arco verde marca el ángulo theta, medido en el suelo desde el eje x hasta la sombra. Al mover fi, el punto baja desde el polo hacia el ecuador; al mover theta, gira alrededor del eje z.',
      labels:PZ,
      sliders:[{id:'fi', tex:'\\varphi', min:0.15, max:1.5, step:0.05, value:0.3}, {id:'th', tex:'\\theta', min:0.1, max:1.45, step:0.05, value:1.0}],
      legend:'<span><i class="sw rise"></i> \\(\\rho\\): distancia al origen</span><span><i class="sw tan"></i> \\(\\varphi\\): ángulo desde el eje \\(z\\)</span><span><i class="sw alt"></i> \\(\\theta\\): ángulo en el suelo, desde el eje \\(x\\)</span>',
      anim:{run:18000, hold:4000, still:1, apply:function(p, v){ v.q = p; v.fi = 0.3 + 1.0*(0.5 - 0.5*Math.cos(6.2832*p)); v.th = 0.45 + 0.85*p; }},
      onInput:function(v){ v.q = null; },
      draw:function(S, v){
        var fi = v.fi == null ? 0.3 : +v.fi, th = v.th == null ? 1 : +v.th, C = S.C, K = cmKit(S), T = cmEtq(S, PZ), L = T.L, i, a = [], b = [], r = RHO*Math.sin(fi), z = RHO*Math.cos(fi), P = cil(r, th, z);
        K.suelo(); K.ejes(3.5); cmEjesLab(K, L, 3.5);
        /* meridiano y paralelo de referencia, tenues */
        for (i = 0; i <= 30; i++){ var f = 1.5708*i/30; a.push(cil(RHO*Math.sin(f), th, RHO*Math.cos(f))); } K.path(a, 'rgba(31,95,138,0.35)', 1);
        K.path(arco(r, 0, 1.5708, z), 'rgba(31,95,138,0.35)', 1); K.path(arco(RHO, 0, 1.5708, 0), 'rgba(31,95,138,0.35)', 1);
        K.line([0, 0, 0], cil(r, th, 0), C.ink, 1, [3, 3]); K.line(cil(r, th, 0), P, C.ink, 1, [3, 3]);
        K.path(arco(0.9, 0, th, 0), C.alt, 2.2); L('LT', K.at(cil(1.15, th/2, 0)), -50, 2, 6);
        for (i = 0; i <= 20; i++){ var g = fi*i/20; b.push(cil(0.8*Math.sin(g), th, 0.8*Math.cos(g))); } K.path(b, C.tan, 2.2); L('LF', K.at(cil(1.05*Math.sin(fi/2), th, 1.05*Math.cos(fi/2))), -50, 4, -2);
        K.line([0, 0, 0], P, C.rise, 2.4); L('LP', K.at(cil(r*0.78, th, z*0.78)), -50, -13, -9);
        K.dot(P, C.ink, 3.6); L('PT', K.at(P), 0, 9, -8);
        T.fin();
      },
      caption:function(v){ var fi = v.fi == null ? 0.3 : +v.fi, d = function(z){ return z.toFixed(2).replace('.', ','); }; return 'El punto está a distancia ρ del origen. El ángulo φ, de ' + d(fi) + ' radianes, lo baja desde el eje z; el ángulo θ lo gira alrededor de ese eje. Con φ = 0 el punto queda sobre el eje z; con φ = π/2, en el suelo'; },
      readout:function(v){ var fi = v.fi == null ? 0.3 : +v.fi, th = v.th == null ? 1 : +v.th, n = OA.num; return [['', 'x=\\rho\\operatorname{sen}\\varphi\\cos\\theta,\\quad y=\\rho\\operatorname{sen}\\varphi\\operatorname{sen}\\theta,\\quad z=\\rho\\cos\\varphi'], ['d', '\\rho=' + n(RHO, 1) + ',\\ \\varphi=' + n(fi, 2) + ',\\ \\theta=' + n(th, 2) + ':\\quad (x,y,z)\\approx\\big(' + n(RHO*Math.sin(fi)*Math.cos(th), 2) + ';\\ ' + n(RHO*Math.sin(fi)*Math.sin(th), 2) + ';\\ ' + n(RHO*Math.cos(fi), 2) + '\\big)']]; }
    };
  })());
})();
