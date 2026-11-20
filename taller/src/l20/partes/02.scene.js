OA.scene('rr-globo', (function(){
  var RUN = 26, num = OA.num, PI = Math.PI, V0 = 4/3*PI*8, V1 = 4/3*PI*1000;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function rDeV(V){ return Math.cbrt(3*V/(4*PI)); }
  function rs(s){ return s < 3 ? 2 : s < 17 ? rDeV(V0 + (V1 - V0)*(s - 3)/14) : s < 19 ? 10 : 10 - 5*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-12.5, x1:12.5, y0:-12.5, y1:12.5}, aspect:1,
    aria:'Un globo esférico verde, con su centro (0, 0) destacado, su radio r y un sector esférico con vértice en el centro, cuya tapa naranja muestra el espesor dr de la capa, crece. Su volumen aumenta 100 centímetros cúbicos por segundo y su radio crece cada vez más lento. Cuando el radio mide 5 centímetros crece a 1/π, aproximadamente 0,32 centímetros por segundo.',
    labels:[['F', '\\dfrac{dr}{dt}=\\dfrac{1}{\\pi}\\approx 0{,}32', 'dr/dt = 1/π ≈ 0,32', 'diff']],
    sliders:[{id:'r', tex:'r', min:2, max:10, step:0.05, value:2}],
    legend:'<span><i class="sw alt"></i> globo</span><span><i class="sw tan"></i> radio \\(r\\)</span><span><i class="sw rise"></i> sector esférico: en su tapa se ve el espesor \\(dr\\) de la capa</span>',
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
      /* sector esférico: cono desde el centro (0, 0); su tapa muestra el espesor dr */
      var a1 = 0.16, a2 = 0.84, am = (a1 + a2)/2, h = (a2 - a1)/2;
      function P(rad, an){ return [cx + rad*Math.cos(an), cy - rad*Math.sin(an)]; }
      function tapa(rad, col, w){ var m = P(rad*Math.cos(h), am); c.strokeStyle = col; c.lineWidth = w; c.beginPath(); c.ellipse(m[0], m[1], rad*Math.sin(h), 0.3*rad*Math.sin(h), Math.PI/2 - am, 0, 2*PI); c.stroke(); }
      c.fillStyle = 'rgba(255,255,255,0.3)'; c.beginPath(); c.moveTo(cx, cy); c.arc(cx, cy, R, -a2, -a1); c.closePath(); c.fill();
      c.fillStyle = C.rise; c.beginPath(); c.arc(cx, cy, R2, -a2, -a1); c.arc(cx, cy, R, -a1, -a2, true); c.closePath(); c.fill();
      c.strokeStyle = 'rgba(0,0,0,0.55)'; c.lineWidth = 1; c.stroke();
      tapa(R, 'rgba(0,0,0,0.5)', 1.1); tapa(R2, C.rise, 1.4);
      var e1 = P(R, a1), ex = P(R, a2)[0], ey = P(R, a2)[1], fx = P(R2, a2)[0], fy = P(R2, a2)[1];
      S.pline(cx, cy, e1[0], e1[1], {color:C.tan, width:1.6});
      S.pline(cx, cy, ex, ey, {color:C.tan, width:3.5}); S.pline(ex, ey, fx, fy, {color:C.ink, width:2.2});
      c.beginPath(); c.arc(ex, ey, 3.5, 0, 2*PI); c.fillStyle = C.tan; c.fill();
      c.beginPath(); c.arc(cx, cy, 9, 0, 2*PI); c.fillStyle = 'rgba(255,255,255,0.85)'; c.fill(); c.strokeStyle = C.tan; c.lineWidth = 2; c.stroke();
      c.beginPath(); c.arc(cx, cy, 4, 0, 2*PI); c.fillStyle = C.tan; c.fill();
      a = a2;
      function caja(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, x0 = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.82)'; c.fillRect(x0, py - 9, w, 18); txt(t, px, py, al, cc); }
      caja('(0, 0)', cx - 12, cy + 16, 'right', C.tan);
      caja('r = ' + dec(r, 2) + ' cm', cx + 0.5*R*Math.cos(a) - 6, cy - 0.5*R*Math.sin(a) - 13, 'center', C.tan);
      caja('dr ≈ ' + dec(dr, 2) + ' cm', fx + 6, fy - 12, 'left', C.rise);
      caja('Área: A = 4π r² ≈ ' + dec(4*PI*r*r, 0) + ' cm²', S.X(-10.3), S.Y(11.3), 'left', C.alt);
      caja('Capa: A · dr = 100 cm³', S.X(-10.3), S.Y(9.5), 'left', C.rise);
      caja('Volumen: V = (1/3) · r · A = (4/3) π r³ ≈ ' + dec(4/3*PI*r*r*r, 0) + ' cm³', S.X(11.6), S.Y(-10.4), 'right', C.alt);
      S.lab('F', S.X(1.2), S.Y(11.6), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var r = v.r, s = v.t == null ? null : v.t*RUN, q = 25/(PI*r*r);
      if (s != null && s < 3) return 'Esfera verde: el globo, de centro (0, 0). Trazo rojo: su radio r. Sector esférico: en su tapa naranja se ve el espesor dr';
      return ['El radio crece a razón de ', '\\dfrac{dr}{dt}=\\dfrac{25}{\\pi r^{2}}\\approx ' + num(q, 2), 'dr/dt = 25/(π r²) ≈ ' + dec(q, 2), ' cm por segundo'];
    },
    readout:function(v){ var r = v.r; return [['d', 'A=4\\pi r^{2}\\approx ' + num(4*PI*r*r, 0) + '\\qquad r=' + num(r, 2) + '\\qquad V=\\tfrac{4}{3}\\pi r^{3}\\approx ' + num(4/3*PI*r*r*r, 0)], ['', '\\dfrac{dr}{dt}=\\dfrac{100}{4\\pi r^{2}}\\approx ' + num(25/(PI*r*r), 2)]]; }
  };
})());
