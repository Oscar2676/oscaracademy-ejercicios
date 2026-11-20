OA.scene('rr-globo', (function(){
  var RUN = 26, num = OA.num, PI = Math.PI, V0 = 4/3*PI*8, V1 = 4/3*PI*1000;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function rDeV(V){ return Math.cbrt(3*V/(4*PI)); }
  function rs(s){ return s < 3 ? 2 : s < 17 ? rDeV(V0 + (V1 - V0)*(s - 3)/14) : s < 19 ? 10 : 10 - 5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Un globo esférico verde, con su centro (0, 0) destacado, su radio r y un sector esférico con vértice en el centro y base dA sobre la superficie; sobre esa base, un bloque naranja de espesor dr. El globo crece. Su volumen aumenta 100 centímetros cúbicos por segundo y su radio crece cada vez más lento. Cuando el radio mide 5 centímetros crece a 1/π, aproximadamente 0,32 centímetros por segundo.',
    labels:[['F', '\\dfrac{dr}{dt}=\\dfrac{1}{\\pi}\\approx 0{,}32', 'dr/dt = 1/π ≈ 0,32', 'diff']],
    sliders:[{id:'r', tex:'r', min:2, max:10, step:0.05, value:2}],
    legend:'<span><i class="sw alt"></i> globo</span><span><i class="sw tan"></i> radio \\(r\\)</span><span><i class="sw rise"></i> bloque de base \\(dA\\) y espesor \\(dr\\), sobre el sector esférico</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.r = rs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, r = v.r, C = S.C, c = S.ctx, pts = [], i;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[-10,-5,5,10], gy:[-10,-5,5,10], full:true});
      var cx = S.X(0), cy = S.Y(0), R = S.X(r) - S.X(0), dr = 25/(PI*r*r), R2 = S.X(r + dr) - S.X(0), a = 0.5, g;
      /* capa naranja: lo que el radio aumenta en el segundo siguiente, dr */
      c.save(); c.globalAlpha = 0.16; c.fillStyle = C.rise; c.beginPath(); c.arc(cx, cy, R2, 0, 2*PI); c.arc(cx, cy, R, 0, 2*PI, true); c.fill('evenodd'); c.restore();
      c.setLineDash([4, 3]); c.strokeStyle = C.rise; c.lineWidth = 1.3; c.beginPath(); c.arc(cx, cy, R2, 0, 2*PI); c.stroke(); c.setLineDash([]);
      /* esfera con color degradado: luz arriba a la izquierda, sombra en el borde */
      c.fillStyle = C.alt; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.fill();
      g = c.createRadialGradient(cx - 0.38*R, cy - 0.42*R, 0.04*R, cx, cy, R);
      g.addColorStop(0, 'rgba(255,255,255,0.88)'); g.addColorStop(0.45, 'rgba(255,255,255,0.28)'); g.addColorStop(0.72, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.38)');
      c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.fill();
      c.strokeStyle = C.alt; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.stroke();
      /* ecuador: mitad de adelante continua, mitad de atrás punteada */
      c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1.2; c.beginPath(); c.ellipse(cx, cy, R, 0.28*R, 0, 0, PI); c.stroke();
      c.setLineDash([4, 4]); c.beginPath(); c.ellipse(cx, cy, R, 0.28*R, 0, PI, 2*PI); c.stroke(); c.setLineDash([]);
      /* sector esférico: pirámide desde el centro (0, 0) hasta un trozo dA de la superficie; sobre dA, el bloque de espesor dr */
      var k = S.X(1) - S.X(0), sE = 0.28, cE = Math.sqrt(1 - sE*sE), t0 = 0.78, t1 = 1.14, q0 = 1.02, q1 = 1.42, tm = (t0 + t1)/2, qm = (q0 + q1)/2;
      function P(rad, th, ps){ var u = rad*Math.sin(th)*Math.sin(ps), w = rad*Math.sin(th)*Math.cos(ps), z = rad*Math.cos(th); return [cx + k*u, cy - k*(z*cE - w*sE)]; }
      var Q = [[t0, q0], [t1, q0], [t1, q1], [t0, q1]];
      function lado(rad, A, B, mv){ for (var n = 0; n <= 8; n++){ var f = n/8, pt = P(rad, A[0] + (B[0] - A[0])*f, A[1] + (B[1] - A[1])*f); if (n === 0 && mv) c.moveTo(pt[0], pt[1]); else c.lineTo(pt[0], pt[1]); } }
      function parche(rad){ c.beginPath(); for (var n = 0; n < 4; n++) lado(rad, Q[n], Q[(n + 1) % 4], n === 0); c.closePath(); }
      var n, pa, pb, pc = P(r + dr/2, tm, qm);
      function sector(f){
        /* caras de la pirámide, del centro a cada lado del trozo dA */
        for (n = 0; n < 4; n++){ c.beginPath(); c.moveTo(cx, cy); lado(r, Q[n], Q[(n + 1) % 4], false); c.closePath(); c.fillStyle = 'rgba(255,255,255,0.2)'; c.fill(); c.strokeStyle = 'rgba(255,255,255,0.9)'; c.lineWidth = 1.1/f; c.stroke(); }
        /* trozo dA sobre la superficie */
        parche(r); c.fillStyle = 'rgba(255,255,255,0.45)'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.2/f; c.stroke();
        /* bloque naranja: base dA, espesor dr */
        for (n = 0; n < 4; n++){ c.beginPath(); lado(r, Q[n], Q[(n + 1) % 4], true); lado(r + dr, Q[(n + 1) % 4], Q[n], false); c.closePath(); c.fillStyle = C.rise; c.fill(); c.fillStyle = 'rgba(0,0,0,0.22)'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1/f; c.stroke(); }
        parche(r + dr); c.fillStyle = C.rise; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.2/f; c.stroke();
        /* radio r hasta el centro del trozo, y espesor dr en una arista del bloque */
        pa = P(r, tm, qm); c.strokeStyle = C.tan; c.lineWidth = 3.2/f; c.beginPath(); c.moveTo(cx, cy); c.lineTo(pa[0], pa[1]); c.stroke();
        c.beginPath(); c.arc(pa[0], pa[1], 3/f, 0, 2*PI); c.fillStyle = C.tan; c.fill();
        pa = P(r, t0, q1); pb = P(r + dr, t0, q1); c.strokeStyle = C.ink; c.lineWidth = 2.6/f; c.beginPath(); c.moveTo(pa[0], pa[1]); c.lineTo(pb[0], pb[1]); c.stroke();
      }
      sector(1);
      var fx = pb[0], fy = pb[1], rm = P(0.5*r, tm, qm);
      c.beginPath(); c.arc(cx, cy, 9, 0, 2*PI); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2; c.stroke();
      c.beginPath(); c.arc(cx, cy, 4, 0, 2*PI); c.fillStyle = C.tan; c.fill();
      function caja(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, x0 = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.82)'; c.fillRect(x0, py - 9, w, 18); txt(t, px, py, al, cc); }
      caja('(0, 0)', cx - 12, cy + 16, 'right', C.tan);
      caja('r = ' + dec(r, 2) + ' cm', rm[0] - 8, rm[1] - 14, 'right', C.tan);
      caja('dr ≈ ' + dec(dr, 2) + ' cm', fx + 10, fy - 12, 'left', C.rise);
      caja('dA', pc[0] + 6, pc[1] + 26, 'left', C.ink);
      caja('Área: A = 4π r² ≈ ' + dec(4*PI*r*r, 0) + ' cm²', S.X(-10.3), S.Y(11.3), 'left', C.alt);
      caja('Bloque: dA · dr      Capa: A · dr = 100 cm³', S.X(-10.3), S.Y(9.5), 'left', C.rise);
      caja('Volumen: V = (1/3) · r · A = (4/3) π r³ ≈ ' + dec(4/3*PI*r*r*r, 0) + ' cm³', S.X(11.6), S.Y(-10.4), 'right', C.alt);
      S.lab('F', S.X(1.2), S.Y(11.6), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var r = v.r, s = v.t == null ? null : v.t*RUN, q = 25/(PI*r*r);
      if (s != null && s < 3) return 'Esfera verde: el globo, de centro (0, 0). Trazo rojo: su radio r. Sector esférico: del centro al trozo dA. Bloque naranja: base dA, espesor dr';
      return ['El radio crece a razón de ', '\\dfrac{dr}{dt}=\\dfrac{25}{\\pi r^{2}}\\approx ' + num(q, 2), 'dr/dt = 25/(π r²) ≈ ' + dec(q, 2), ' cm por segundo'];
    },
    readout:function(v){ var r = v.r; return [['d', 'A=4\\pi r^{2}\\approx ' + num(4*PI*r*r, 0) + '\\qquad r=' + num(r, 2) + '\\qquad V=\\tfrac{4}{3}\\pi r^{3}\\approx ' + num(4/3*PI*r*r*r, 0)], ['', '\\dfrac{dr}{dt}=\\dfrac{100}{4\\pi r^{2}}\\approx ' + num(25/(PI*r*r), 2)]]; }
  };
})());
