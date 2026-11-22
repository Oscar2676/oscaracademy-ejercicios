/* Coordenadas polares, cilíndricas y esféricas. Dibujo propio; rótulos algebraicos como etiquetas TeX. */
(function(){
  function cil(r, t, z){ return [r*Math.cos(t), r*Math.sin(t), z]; }
  function arco(r, t0, t1, z){ var p = [], i; for (i = 0; i <= 16; i++) p.push(cil(r, t0 + (t1 - t0)*i/16, z)); return p; }
  /* celda cilíndrica [r0,r1]×[t0,t1]×[z0,z1] */
  function celda(K, r0, r1, t0, t1, z0, z1, col, alpha, st){
    var a0 = arco(r0, t0, t1, z0), a1 = arco(r1, t0, t1, z0), b0 = arco(r0, t0, t1, z1), b1 = arco(r1, t0, t1, z1), s = st || col;
    K.poly(a0.concat(a1.slice().reverse()), col, alpha*0.5, s);                                   /* piso */
    K.poly(a0.concat(b0.slice().reverse()), col, alpha*0.6, s);                                   /* cara interior */
    K.poly([cil(r0, t1, z0), cil(r1, t1, z0), cil(r1, t1, z1), cil(r0, t1, z1)], col, alpha*0.6, s); /* cara θ mayor */
    K.poly([cil(r0, t0, z0), cil(r1, t0, z0), cil(r1, t0, z1), cil(r0, t0, z1)], col, alpha*0.8, s); /* cara θ menor */
    K.poly(a1.concat(b1.slice().reverse()), col, alpha, s);                                       /* cara exterior */
    K.poly(b0.concat(b1.slice().reverse()), col, alpha*0.9, s);                                   /* tapa */
  }
  /* ── la idea: el elemento de volumen en cilíndricas, en seis pasos ── */
  OA.scene('cm-coord-idea', (function(){
    var N = 6, R0 = 1.5, R1 = 2.3, T0 = 0.55, T1 = 1.05, Z0 = 1.3, Z1 = 2.3, BR0 = 0.8, BR1 = 2.6, BT0 = 0.25, BT1 = 1.35, BZ0 = 0, BZ1 = 2.6;
    var PZ = cmEJ.concat([
      ['Q', '\\text{¿Cuánto mide un trocito de volumen?}', '¿Cuánto mide un trocito de volumen?', 'pt'],
      ['PT', '(r,\\ \\theta,\\ z)', '(r, θ, z)', 'pt'], ['LR', 'r', 'r', 'diff'], ['LT', '\\theta', 'θ', 'c-alt'], ['LZ', 'z', 'z', 'c-sec'],
      ['DR', '\\Delta r', 'Δr', 'diff'], ['DT', 'r\\,\\Delta\\theta', 'r Δθ', 'c-alt'], ['DZ', '\\Delta z', 'Δz', 'c-sec'],
      ['E2', 'x=r\\cos\\theta,\\quad y=r\\operatorname{sen}\\theta,\\quad z=z', 'x = r cos θ, y = r sen θ, z = z', ''],
      ['E4', '\\text{lados: }\\Delta r,\\quad r\\,\\Delta\\theta,\\quad \\Delta z', 'lados: Δr, r Δθ, Δz', ''],
      ['E5', '\\Delta V\\approx \\Delta r\\cdot r\\,\\Delta\\theta\\cdot\\Delta z', 'ΔV ≈ Δr · r Δθ · Δz', ''],
      ['E6', 'dV=r\\,dr\\,d\\theta\\,dz', 'dV = r dr dθ dz', 'diff']
    ]);
    var TXT = [
      ['Para sumar sobre un sólido redondo conviene', 'cortarlo en trocitos que sigan su forma.'],
      ['Un punto se ubica con tres datos: distancia al eje,', 'ángulo de giro y altura.'],
      ['Si cada dato cambia un poco, el punto barre', 'un trocito: una celda.'],
      ['La celda es casi una caja. Dos lados son rectos.', 'El tercero es un arco: radio por ángulo.'],
      ['Su volumen es, aproximadamente, el producto', 'de los tres lados.'],
      ['Con celdas cada vez más finas, la suma', 'se vuelve integral. El factor del radio viene del arco.']
    ];
    return {
      world:{x0:-3.7, x1:3.9, y0:-4.5, y1:4.4}, aspect:8.9/7.6,
      aria:'Animación en seis pasos sobre las coordenadas cilíndricas. Uno: un bloque curvo, parte de un tubo grueso, apoyado en el suelo. Dos: un punto se ubica con su distancia r al eje vertical, medida en el suelo; el ángulo theta de giro desde el eje x; y su altura z. Tres: al aumentar un poco r, theta y z, el punto barre una celda pequeña, casi una caja. Cuatro: los tres lados de la celda, rotulados: delta r, el arco r por delta theta, y delta z. Cinco: su volumen aproximado es el producto de los tres lados. Seis: el bloque completo se parte en celdas cada vez más finas, y el elemento de volumen queda como r por dr por d theta por dz.',
      labels:PZ,
      sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
      legend:'<span><i class="sw rise"></i> radio \\(r\\) y su cambio \\(\\Delta r\\)</span><span><i class="sw alt"></i> ángulo \\(\\theta\\) y el arco \\(r\\,\\Delta\\theta\\)</span><span><i class="sw sec"></i> altura \\(z\\) y \\(\\Delta z\\)</span><span><i class="sw tan"></i> la celda</span>',
      anim:{run:36000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = cmSuave((t - Math.floor(t))*1.3); }},
      onInput:function(v){ v.q = null; v.u = 1; },
      draw:function(S, v){
        var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, K = cmKit(S), T = cmEtq(S, PZ), L = T.L, i, j, m, n, g;
        K.suelo(); K.ejes(3.6); cmEjesLab(K, L, 3.6);
        if (k === 1) celda(K, BR0, BR1, BT0, BT1, BZ0, BZ1*u, C.sec, 0.3);
        if (k >= 2 && k <= 5) celda(K, BR0, BR1, BT0, BT1, BZ0, BZ1, C.sec, 0.07, 'rgba(31,95,138,0.25)');
        if (k === 2 || k === 3){ /* r en el suelo, θ, y la altura z */
          var ur = k === 2 ? Math.min(1, u/0.4) : 1, ut = k === 2 ? Math.max(0, Math.min(1, (u - 0.4)/0.3)) : 1, uz = k === 2 ? Math.max(0, (u - 0.7)/0.3) : 1, th = T0*ut;
          K.line([0, 0, 0], cil(R0*ur, th, 0), C.rise, 2.4); if (ut > 0) K.path(arco(0.7, 0, th, 0), C.alt, 2);
          if (uz > 0){ K.line(cil(R0, T0, 0), cil(R0, T0, Z0*uz), C.sec, 2.4); K.dot(cil(R0, T0, Z0*uz), C.ink, 3.4); }
          if (k === 2 && u >= 1){ L('LR', K.at(cil(R0*0.55, T0, 0)), -50, -8, 10); L('LT', K.at(cil(0.95, T0/2, 0)), -50, 4, 6); L('LZ', K.at(cil(R0, T0, Z0/2)), 0, 7, 0); L('PT', K.at(cil(R0, T0, Z0)), 0, 8, -10); }
        }
        if (k >= 3 && k <= 5){ g = k === 3 ? u : 1; celda(K, R0, R0 + (R1 - R0)*g, T0, T0 + (T1 - T0)*g, Z0, Z0 + (Z1 - Z0)*g, C.tan, 0.5); if (k === 3) K.dot(cil(R0, T0, Z0), C.ink, 3.2); }
        if (k === 4 || k === 5){
          K.line(cil(R0, T0, Z0), cil(R1, T0, Z0), C.rise, 3); K.path(arco(R1, T0, T1, Z0), C.alt, 3); K.line(cil(R1, T1, Z0), cil(R1, T1, Z1), C.sec, 3);
          L('DR', K.at(cil((R0 + R1)/2, T0, Z0)), -50, -12, 12); L('DT', K.at(cil(R1, (T0 + T1)/2, Z0)), -50, 6, 14); L('DZ', K.at(cil(R1, T1, (Z0 + Z1)/2)), 0, 8, 0);
        }
        if (k === 6){ n = 2 + Math.round(3*u); for (i = n - 1; i >= 0; i--) for (j = n - 1; j >= 0; j--) for (m = 0; m < n; m++)
          celda(K, BR0 + (BR1 - BR0)*i/n, BR0 + (BR1 - BR0)*(i + 1)/n, BT0 + (BT1 - BT0)*j/n, BT0 + (BT1 - BT0)*(j + 1)/n, BZ0 + (BZ1 - BZ0)*m/n, BZ0 + (BZ1 - BZ0)*(m + 1)/n, C.sec, 0.2);
          K.txt(n + ' × ' + n + ' × ' + n + ' = ' + n*n*n + ' celdas', 3.8, -1.25, C.muted || '#6b6b6b', 11.5, 'right'); }
        if (k === 1) L('Q', [S.X(-3.6), S.Y(4.0)], 0);
        if (k === 2) L('E2', [S.X(-3.6), S.Y(-1.95)], 0); if (k === 4) L('E4', [S.X(-3.6), S.Y(-1.95)], 0); if (k === 5) L('E5', [S.X(-3.6), S.Y(-1.95)], 0); if (k === 6) L('E6', [S.X(-3.6), S.Y(-1.95)], 0);
        K.txt(TXT[k - 1][0], -3.6, -3.1); K.txt(TXT[k - 1][1], -3.6, -3.1 - 21/(S.X(1) - S.X(0)));
        K.txt('paso ' + k + ' de ' + N, 3.8, 4.15, C.muted || '#6b6b6b', 11, 'right');
        T.fin();
      },
      caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
      readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['\\Delta V=\\ ?', '(r,\\ \\theta,\\ z):\\qquad x=r\\cos\\theta,\\quad y=r\\operatorname{sen}\\theta,\\quad z=z', 'r\\to r+\\Delta r,\\qquad \\theta\\to\\theta+\\Delta\\theta,\\qquad z\\to z+\\Delta z', '\\text{arco}=\\text{radio}\\times\\text{ángulo}=r\\,\\Delta\\theta', '\\Delta V\\approx r\\,\\Delta r\\,\\Delta\\theta\\,\\Delta z', 'dV=r\\,dr\\,d\\theta\\,dz'][k - 1]]]; }
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
