OA.scene('rr-globo', (function(){
  var RUN = 26, num = OA.num, PI = Math.PI, V0 = 4/3*PI*8, V1 = 4/3*PI*1000;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function rDeV(V){ return Math.cbrt(3*V/(4*PI)); }
  function rs(s){ return s < 3 ? 2 : s < 17 ? rDeV(V0 + (V1 - V0)*(s - 3)/14) : s < 19 ? 10 : 10 - 5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Un globo esférico verde, con su centro (0, 0) destacado, su radio r y una capa naranja de espesor dr. El globo crece. Su volumen aumenta 100 centímetros cúbicos por segundo y su radio crece cada vez más lento. Cuando el radio mide 5 centímetros crece a 1/π, aproximadamente 0,32 centímetros por segundo.',
    labels:[['F', '\\dfrac{dr}{dt}=\\dfrac{1}{\\pi}\\approx 0{,}32', 'dr/dt = 1/π ≈ 0,32', 'diff']],
    sliders:[{id:'r', tex:'r', min:2, max:10, step:0.05, value:2}],
    legend:'<span><i class="sw alt"></i> globo</span><span><i class="sw tan"></i> radio \\(r\\)</span><span><i class="sw rise"></i> capa de espesor \\(dr\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.r = rs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, r = v.r, C = S.C, c = S.ctx, pts = [], i;
      function txt(t, px, py, al, cc){ c.fillStyle = cc || C.ink; c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:[-10,-5,5,10], gy:[-10,-5,5,10], full:true});
      var cx = S.X(0), cy = S.Y(0), R = S.X(r) - S.X(0), dr = 25/(PI*r*r), R2 = S.X(r + dr) - S.X(0), a = 0.5, g;
      /* capa naranja: lo que el radio aumenta en el segundo siguiente, dr */
      c.save(); c.globalAlpha = 0.45; c.fillStyle = C.rise; c.beginPath(); c.arc(cx, cy, R2, 0, 2*PI); c.arc(cx, cy, R, 0, 2*PI, true); c.fill('evenodd'); c.restore();
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
      /* radio r, espesor dr de la capa y centro (0, 0) destacado */
      var ex = cx + R*Math.cos(a), ey = cy - R*Math.sin(a), fx = cx + R2*Math.cos(a), fy = cy - R2*Math.sin(a);
      S.pline(cx, cy, ex, ey, {color:C.tan, width:3.2}); S.pline(ex, ey, fx, fy, {color:C.ink, width:3});
      c.beginPath(); c.arc(ex, ey, 3.2, 0, 2*PI); c.fillStyle = C.tan; c.fill();
      c.beginPath(); c.arc(cx, cy, 9, 0, 2*PI); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2; c.stroke();
      c.beginPath(); c.arc(cx, cy, 4, 0, 2*PI); c.fillStyle = C.tan; c.fill();
      function caja(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, x0 = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.82)'; c.fillRect(x0, py - 9, w, 18); txt(t, px, py, al, cc); }
      caja('(0, 0)', cx - 12, cy + 16, 'right', C.tan);
      caja('r = ' + dec(r, 2) + ' cm', cx + 0.5*R*Math.cos(a) - 6, cy - 0.5*R*Math.sin(a) - 13, 'center', C.tan);
      caja('dr', fx + 8, fy - 4, 'left', C.rise);
      S.lab('F', S.X(1.2), S.Y(11.6), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var r = v.r, s = v.t == null ? null : v.t*RUN, q = 25/(PI*r*r);
      if (s != null && s < 3) return 'Esfera verde: el globo, de centro (0, 0). Trazo rojo: su radio r. Capa naranja: el aire que entra, de espesor dr';
      return ['Con r = ' + dec(r, 2) + ' cm, el radio crece a razón de ', '\\dfrac{dr}{dt}\\approx ' + num(q, 2), 'dr/dt ≈ ' + dec(q, 2), ' cm por segundo. Abajo, de dónde sale'];
    },
    readout:function(v){ var r = v.r; return [['', '\\dfrac{dV}{dt}=4\\pi r^{2}\\cdot\\dfrac{dr}{dt}'], ['d', '100=4\\pi\\cdot(' + num(r, 2) + ')^{2}\\cdot\\dfrac{dr}{dt}'], ['', '\\dfrac{dr}{dt}=\\dfrac{100}{4\\pi\\cdot(' + num(r, 2) + ')^{2}}\\approx ' + num(25/(PI*r*r), 2)]]; }
  };
})());

OA.scene('rr-area-volumen', (function(){
  var RUN = 42, PI = Math.PI, RR = 7, DR = 1.3;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  var CAP = [
    ['Paso 1. Un trozo pequeño de la superficie de la esfera. Su área se llama ', 'dA', 'dA', ''],
    ['Paso 2. Todos los trozos cubren la superficie. Su suma es el área: ', 'A=\\displaystyle\\int dA=4\\pi r^{2}', 'A = ∫ dA = 4π r²', ''],
    ['Paso 3. Sobre el trozo se pone un bloque de espesor dr. Su volumen es base por espesor: ', 'dA\\cdot dr', 'dA · dr', ''],
    ['Paso 4. Todos los bloques juntos forman una capa. Su volumen: ', 'dV=A\\cdot dr=4\\pi r^{2}\\,dr', 'dV = A · dr = 4π r² dr', ''],
    ['Paso 5. Las capas, desde el centro hasta la superficie, llenan la esfera. Se suman con una integral: ', 'V=\\displaystyle\\int_{0}^{r}4\\pi\\rho^{2}\\,d\\rho', 'V = ∫ de 0 a r de 4π ρ² dρ', ''],
    ['Paso 6. Resultado: el volumen de la esfera es ', 'V=\\dfrac{4}{3}\\,\\pi\\,r^{3}', 'V = (4/3) π r³', '']
  ];
  function paso(v){ if (v.t == null) return [Math.round(v.paso) - 1, 1]; var s = v.t*6, n = Math.min(5, Math.floor(s)); return [n, OA.smooth(cl((s - n)/0.6))]; }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Seis pasos. Uno: en una esfera verde de radio r se marca un trozo pequeño de superficie, dA. Dos: los trozos cubren toda la superficie y su suma es el área, 4 pi r al cuadrado. Tres: sobre el trozo crece un bloque naranja de espesor dr. Cuatro: los bloques forman una capa naranja alrededor de la esfera, de volumen 4 pi r al cuadrado por dr. Cinco: una esfera interior de radio rho crece desde el centro, capa por capa, hasta llenar la esfera. Seis: el volumen es cuatro tercios de pi por r al cubo.',
    labels:[],
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:6, step:1, value:1}],
    legend:'<span><i class="sw alt"></i> esfera de radio \\(r\\)</span><span><i class="sw tan"></i> radio</span><span><i class="sw rise"></i> bloque y capa de espesor \\(dr\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.paso = Math.min(6, Math.floor(p*6) + 1); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var C = S.C, c = S.ctx, ps = paso(v), n = ps[0], f = ps[1];
      var cx = S.X(0), cy = S.Y(0), k = S.X(1) - S.X(0), sE = 0.28, cE = Math.sqrt(1 - sE*sE);
      var t0 = 0.78, t1 = 1.14, q0 = 0.95, q1 = 1.35, tm = (t0 + t1)/2, qm = (q0 + q1)/2, Q = [[t0, q0], [t1, q0], [t1, q1], [t0, q1]], i, pa, pb;
      function P(rad, th, ps){ var u = rad*Math.sin(th)*Math.sin(ps), w = rad*Math.sin(th)*Math.cos(ps), z = rad*Math.cos(th); return [cx + k*u, cy - k*(z*cE - w*sE)]; }
      function vis(th, ps){ return Math.cos(th)*sE + Math.sin(th)*Math.cos(ps)*cE > 0; }
      function lado(rad, A, B, mv){ for (var m = 0; m <= 8; m++){ var g = m/8, pt = P(rad, A[0] + (B[0] - A[0])*g, A[1] + (B[1] - A[1])*g); if (m === 0 && mv) c.moveTo(pt[0], pt[1]); else c.lineTo(pt[0], pt[1]); } }
      function parche(rad){ c.beginPath(); for (var m = 0; m < 4; m++) lado(rad, Q[m], Q[(m + 1) % 4], m === 0); c.closePath(); }
      function txt(t, px, py, al, cc){ c.font = '600 13px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, x0 = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(x0, py - 10, w, 20); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function bola(rad, alfa){
        var R = k*rad, g; if (R < 1) return;
        c.save(); c.globalAlpha = alfa; c.fillStyle = C.alt; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.fill();
        g = c.createRadialGradient(cx - 0.38*R, cy - 0.42*R, 0.04*R, cx, cy, R);
        g.addColorStop(0, 'rgba(255,255,255,0.88)'); g.addColorStop(0.45, 'rgba(255,255,255,0.28)'); g.addColorStop(0.72, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.38)');
        c.fillStyle = g; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.fill();
        c.strokeStyle = C.alt; c.lineWidth = 2; c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.stroke();
        c.strokeStyle = 'rgba(0,0,0,0.45)'; c.lineWidth = 1.2; c.beginPath(); c.ellipse(cx, cy, R, sE*R, 0, 0, PI); c.stroke();
        c.setLineDash([4, 4]); c.beginPath(); c.ellipse(cx, cy, R, sE*R, 0, PI, 2*PI); c.stroke(); c.setLineDash([]); c.restore();
      }
      function fantasma(){
        var R = k*RR; c.strokeStyle = C.alt; c.lineWidth = 1.5; c.setLineDash([5, 4]); c.beginPath(); c.arc(cx, cy, R, 0, 2*PI); c.stroke();
        c.beginPath(); c.ellipse(cx, cy, R, sE*R, 0, 0, 2*PI); c.stroke(); c.setLineDash([]);
      }
      function capa(rad, esp, ang, alfa){
        c.save(); c.globalAlpha = alfa; c.fillStyle = C.rise; c.beginPath(); c.arc(cx, cy, k*(rad + esp), -PI/2, -PI/2 + ang); c.arc(cx, cy, k*rad, -PI/2 + ang, -PI/2, true); c.closePath(); c.fill(); c.restore();
        c.strokeStyle = C.rise; c.lineWidth = 1.4; c.beginPath(); c.arc(cx, cy, k*(rad + esp), -PI/2, -PI/2 + ang); c.stroke();
      }
      function radio(rad, nombre){
        pa = P(rad, tm, qm); c.strokeStyle = C.tan; c.lineWidth = 3.2; c.beginPath(); c.moveTo(cx, cy); c.lineTo(pa[0], pa[1]); c.stroke();
        c.beginPath(); c.arc(pa[0], pa[1], 3, 0, 2*PI); c.fillStyle = C.tan; c.fill();
        c.beginPath(); c.arc(cx, cy, 8, 0, 2*PI); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2; c.stroke();
        c.beginPath(); c.arc(cx, cy, 3.5, 0, 2*PI); c.fillStyle = C.tan; c.fill();
        pb = P(0.5*rad, tm, qm); txt(nombre, pb[0] - 6, pb[1] - 15, 'center', C.tan); txt('(0, 0)', cx - 12, cy + 17, 'right', C.tan);
      }
      function trozo(alfa){ c.save(); c.globalAlpha = alfa; parche(RR); c.fillStyle = 'rgba(255,255,255,0.6)'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.4; c.stroke(); c.restore(); }
      function malla(g){
        var ths = [], pss = [], a, b, m, tot, cnt = 0, lim;
        for (a = t0 - 0.36*2; a < PI; a += 0.36) if (a > 0.05) ths.push(a);
        for (b = q0 - 0.40*8; b < q0 + 0.40*8; b += 0.40) pss.push(b);
        tot = ths.length + pss.length; lim = Math.round(g*tot);
        c.strokeStyle = 'rgba(255,255,255,0.85)'; c.lineWidth = 1.1;
        function linea(fn){ var on = false, pt; c.beginPath(); for (m = 0; m <= 60; m++){ var q = fn(m/60); if (vis(q[0], q[1])){ pt = P(RR, q[0], q[1]); if (on) c.lineTo(pt[0], pt[1]); else c.moveTo(pt[0], pt[1]); on = true; } else on = false; } c.stroke(); }
        ths.forEach(function(th){ if (cnt++ < lim) linea(function(u){ return [th, -PI + 2*PI*u]; }); });
        pss.forEach(function(pp){ if (cnt++ < lim) linea(function(u){ return [0.02 + (PI - 0.04)*u, pp]; }); });
      }
      function bloque(esp){
        if (esp <= 0) return;
        for (i = 0; i < 4; i++){ c.beginPath(); lado(RR, Q[i], Q[(i + 1) % 4], true); lado(RR + esp, Q[(i + 1) % 4], Q[i], false); c.closePath(); c.fillStyle = C.rise; c.fill(); c.fillStyle = 'rgba(0,0,0,0.22)'; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1; c.stroke(); }
        parche(RR + esp); c.fillStyle = C.rise; c.fill(); c.strokeStyle = C.ink; c.lineWidth = 1.2; c.stroke();
        pa = P(RR, t0, q1); pb = P(RR + esp, t0, q1); c.strokeStyle = C.ink; c.lineWidth = 2.6; c.beginPath(); c.moveTo(pa[0], pa[1]); c.lineTo(pb[0], pb[1]); c.stroke();
      }
      var pd = P(RR, tm, qm), pe = P(RR + DR, t0, q1);
      if (n === 0){ bola(RR, 1); radio(RR, 'r'); trozo(f); if (f > 0.5) txt('dA', pd[0] + 4, pd[1] + 30, 'left', C.ink); }
      else if (n === 1){ bola(RR, 1); malla(f); radio(RR, 'r'); trozo(1); txt('dA', pd[0] + 4, pd[1] + 30, 'left', C.ink); if (f > 0.9) txt('A = suma de todos los dA', cx, S.Y(-9.6), 'center', C.alt); }
      else if (n === 2){ bola(RR, 1); malla(1); radio(RR, 'r'); trozo(1); bloque(DR*f); txt('dA', pd[0] + 4, pd[1] + 30, 'left', C.ink); if (f > 0.5){ txt('dr', pe[0] + 10, pe[1] - 10, 'left', C.rise); } if (f > 0.9) txt('bloque = dA · dr', cx, S.Y(-9.6), 'center', C.rise); }
      else if (n === 3){ capa(RR, DR, 2*PI*f, 0.5); bola(RR, 1); malla(1); radio(RR, 'r'); trozo(1); bloque(DR); txt('dr', pe[0] + 10, pe[1] - 10, 'left', C.rise); if (f > 0.9) txt('capa = A · dr', cx, S.Y(-9.6), 'center', C.rise); }
      else if (n === 4){ var rho = RR*f, dro = 0.7; fantasma(); if (rho + dro <= RR + 0.001) capa(rho, dro, 2*PI, 0.6); bola(rho, 1); if (rho > 0.8) radio(rho, 'ρ'); pa = P(RR, 0.5, -0.9); txt('r', pa[0] - 10, pa[1] - 10, 'right', C.alt); if (rho > 1.5 && rho + dro <= RR) { pb = P(rho + dro, tm, qm); txt('dρ', pb[0] + 10, pb[1], 'left', C.rise); } txt('capa = 4π ρ² dρ,   con ρ desde 0 hasta r', cx, S.Y(-9.6), 'center', C.rise); }
      else { bola(RR, 1); radio(RR, 'r'); txt('V = (4/3) π r³', cx, S.Y(-9.6), 'center', C.alt); }
    },
    caption:function(v){ return CAP[paso(v)[0]]; },
    readout:function(v){
      var n = paso(v)[0], out = [];
      if (n >= 1) out.push(['', 'A=\\displaystyle\\int dA=4\\pi r^{2}']);
      if (n >= 3) out.push(['d', 'dV=A\\cdot dr=4\\pi r^{2}\\,dr']);
      if (n >= 4) out.push(['', 'V=\\displaystyle\\int_{0}^{r}4\\pi\\rho^{2}\\,d\\rho' + (n >= 5 ? '=\\dfrac{4}{3}\\,\\pi\\,r^{3}' : '')]);
      if (!out.length) out.push(['', 'dA']);
      return out;
    }
  };
})());

OA.scene('rr-cuatro-formulas', (function(){
  var RUN = 20, PI = Math.PI, RA = 3.5;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Cuatro figuras. Arriba, a la izquierda una circunferencia de radio r, con C igual a 2 pi r, y a la derecha un círculo que se llena con circunferencias que crecen desde el centro, con A igual a pi r al cuadrado. Abajo, a la izquierda la superficie de una esfera, con A igual a 4 pi r al cuadrado, y a la derecha una esfera que se llena con superficies que crecen desde el centro, con V igual a cuatro tercios de pi r al cubo. Entre cada par, una flecha hacia la derecha dice integrar y una hacia la izquierda dice derivar.',
    labels:[],
    legend:'<span><i class="sw sec"></i> circunferencia y círculo</span><span><i class="sw alt"></i> superficie y esfera</span><span><i class="sw rise"></i> lo que se va sumando</span><span><i class="sw tan"></i> radio</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; }},
    draw:function(S, v){
      var C = S.C, c = S.ctx, s = v.t == null ? RUN : v.t*RUN, k = S.X(1) - S.X(0), R = k*RA;
      var fa = v.t == null ? 1 : OA.smooth(cl((s - 1)/7)), fb = v.t == null ? 1 : OA.smooth(cl((s - 10)/7));
      var xl = S.X(-7), xr = S.X(7), y1 = S.Y(6.3), y2 = S.Y(-6.3), xm = S.X(0);
      function txt(t, px, py, cc, sz){ c.fillStyle = cc || C.ink; c.font = '600 ' + (sz || 12) + 'px "Source Sans 3", system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function radio(x, y, rad, nom){ var a = 0.5, ex = x + rad*Math.cos(a), ey = y - rad*Math.sin(a); if (rad < 6) return; c.strokeStyle = C.tan; c.lineWidth = 2.4; c.beginPath(); c.moveTo(x, y); c.lineTo(ex, ey); c.stroke(); c.beginPath(); c.arc(x, y, 3, 0, 2*PI); c.fillStyle = C.tan; c.fill(); if (rad > 22) txt(nom, x + 0.5*rad*Math.cos(a) - 4, y - 0.5*rad*Math.sin(a) - 9, C.tan, 12); }
      function flecha(xa, xb, y, cc){ var d = xb > xa ? 1 : -1; c.strokeStyle = cc; c.fillStyle = cc; c.lineWidth = 2; c.beginPath(); c.moveTo(xa, y); c.lineTo(xb - 7*d, y); c.stroke(); c.beginPath(); c.moveTo(xb, y); c.lineTo(xb - 9*d, y - 5); c.lineTo(xb - 9*d, y + 5); c.closePath(); c.fill(); }
      function bola(x, y, rad, malla){
        var g; if (rad < 1) return;
        c.fillStyle = C.alt; c.beginPath(); c.arc(x, y, rad, 0, 2*PI); c.fill();
        g = c.createRadialGradient(x - 0.38*rad, y - 0.42*rad, 0.04*rad, x, y, rad);
        g.addColorStop(0, 'rgba(255,255,255,0.88)'); g.addColorStop(0.45, 'rgba(255,255,255,0.28)'); g.addColorStop(0.72, 'rgba(255,255,255,0)'); g.addColorStop(1, 'rgba(0,0,0,0.38)');
        c.fillStyle = g; c.beginPath(); c.arc(x, y, rad, 0, 2*PI); c.fill();
        c.strokeStyle = C.alt; c.lineWidth = 2; c.beginPath(); c.arc(x, y, rad, 0, 2*PI); c.stroke();
        if (malla){ c.strokeStyle = 'rgba(255,255,255,0.8)'; c.lineWidth = 1; [0.25, 0.6, 0.9].forEach(function(q){ c.beginPath(); c.ellipse(x, y, rad*q, rad, 0, 0, 2*PI); c.stroke(); }); [-0.6, -0.25, 0.15, 0.55].forEach(function(q){ var hh = rad*Math.sqrt(1 - q*q); c.beginPath(); c.ellipse(x, y - rad*q, hh, 0.28*hh, 0, 0, PI); c.stroke(); }); }
        else { c.strokeStyle = 'rgba(0,0,0,0.4)'; c.lineWidth = 1; c.beginPath(); c.ellipse(x, y, rad, 0.28*rad, 0, 0, PI); c.stroke(); }
      }
      /* fila de arriba: circunferencia y círculo */
      c.strokeStyle = C.sec; c.lineWidth = 2.6; c.beginPath(); c.arc(xl, y1, R, 0, 2*PI); c.stroke(); radio(xl, y1, R, 'r');
      c.strokeStyle = C.sec; c.lineWidth = 1; c.setLineDash([4, 4]); c.beginPath(); c.arc(xr, y1, R, 0, 2*PI); c.stroke(); c.setLineDash([]);
      c.save(); c.globalAlpha = 0.45; c.fillStyle = C.sec; c.beginPath(); c.arc(xr, y1, R*fa, 0, 2*PI); c.fill(); c.restore();
      c.strokeStyle = fa < 1 ? C.rise : C.sec; c.lineWidth = fa < 1 ? 3.5 : 2.6; c.beginPath(); c.arc(xr, y1, Math.max(0.5, R*fa), 0, 2*PI); c.stroke(); radio(xr, y1, R*fa, fa < 1 ? 'ρ' : 'r');
      /* fila de abajo: superficie de la esfera y esfera */
      bola(xl, y2, R, true); radio(xl, y2, R, 'r');
      c.strokeStyle = C.alt; c.lineWidth = 1; c.setLineDash([4, 4]); c.beginPath(); c.arc(xr, y2, R, 0, 2*PI); c.stroke(); c.setLineDash([]);
      bola(xr, y2, R*fb, false);
      if (fb > 0.02 && fb < 1){ c.strokeStyle = C.rise; c.lineWidth = 3.5; c.beginPath(); c.arc(xr, y2, R*fb, 0, 2*PI); c.stroke(); }
      radio(xr, y2, R*fb, fb < 1 ? 'ρ' : 'r');
      /* rótulos */
      txt('Circunferencia', xl, y1 - R - 14, C.sec); txt('C = 2π r', xl, y1 + R + 16, C.ink, 14);
      txt('Círculo', xr, y1 - R - 14, C.sec); txt('A = π r²', xr, y1 + R + 16, C.ink, 14);
      txt('Superficie de la esfera', xl, y2 - R - 14, C.alt); txt('A = 4π r²', xl, y2 + R + 16, C.ink, 14);
      txt('Volumen de la esfera', xr, y2 - R - 14, C.alt); txt('V = (4/3) π r³', xr, y2 + R + 16, C.ink, 14);
      [y1, y2].forEach(function(y){ flecha(xm - 26, xm + 26, y - 12, C.rise); txt('integrar', xm, y - 25, C.rise, 11); flecha(xm + 26, xm - 26, y + 12, C.tan); txt('derivar', xm, y + 26, C.tan, 11); });
    },
    caption:function(v){
      var s = v.t == null ? RUN : v.t*RUN;
      if (s < 9.5) return ['En el plano: las circunferencias, desde el centro hasta el borde, barren el círculo. ', 'A=\\displaystyle\\int_{0}^{r}2\\pi\\rho\\,d\\rho=\\pi r^{2}', 'A = ∫ de 0 a r de 2π ρ dρ = π r²', ''];
      if (s < 18.5) return ['En el espacio: las superficies, desde el centro hasta el borde, llenan la esfera. ', 'V=\\displaystyle\\int_{0}^{r}4\\pi\\rho^{2}\\,d\\rho=\\dfrac{4}{3}\\pi r^{3}', 'V = ∫ de 0 a r de 4π ρ² dρ = (4/3) π r³', ''];
      return 'Integrar lleva de izquierda a derecha. Derivar respecto de r lleva de derecha a izquierda';
    },
    readout:function(v){ return [['', '\\dfrac{d}{dr}\\left(\\pi r^{2}\\right)=2\\pi r'], ['d', '\\dfrac{d}{dr}\\left(\\dfrac{4}{3}\\,\\pi\\,r^{3}\\right)=4\\pi r^{2}']]; }
  };
})());
