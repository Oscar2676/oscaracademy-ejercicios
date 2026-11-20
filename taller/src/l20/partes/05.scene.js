OA.scene('rr-tanque', (function(){
  var RUN = 26, num = OA.num, PI = Math.PI, V0 = PI/12*1.728, V1 = PI/12*216;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ','); }
  function hDeV(V){ return Math.cbrt(12*V/PI); }
  function hs(s){ return s < 3 ? 1.2 : s < 17 ? hDeV(V0 + (V1 - V0)*(s - 3)/14) : s < 19 ? 6 : 6 - 2*OA.smooth(cl((s - 19)/2.5)); }
  return {
    world:{x0:-4.6, x1:4.6, y0:-1.2, y1:7.6}, aspect:8.8/9.2,
    aria:'Un tanque cónico con el vértice hacia abajo, de 6 metros de altura y 3 metros de radio superior, se llena de agua. El nivel h sube cada vez más lento y el radio de la superficie vale siempre la mitad de h. Sobre la superficie, una lámina naranja de espesor dh. Cuando h vale 4 metros, el nivel sube a 3 partido por 4 pi, cerca de 0,24 metros por minuto.',
    labels:[['F', '\\dfrac{dh}{dt}=\\dfrac{3}{4\\pi}\\approx 0{,}24', 'dh/dt = 3/(4π) ≈ 0,24', 'diff']],
    sliders:[{id:'h', tex:'h', min:1.2, max:6, step:0.02, value:1.2}],
    legend:'<span><i class="sw sec"></i> agua</span><span><i class="sw alt"></i> altura \\(h\\)</span><span><i class="sw tan"></i> radio \\(r\\)</span><span><i class="sw rise"></i> lámina de espesor \\(dh\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.h = hs(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, h = v.h, r = h/2, C = S.C, c = S.ctx, k = S.X(1) - S.X(0), E = 0.16, dh = 0.2, g;
      var X = S.X, Y = S.Y, x0 = X(0);
      function txt(t, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(t).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function elipse(y, rad, a0, a1){ c.beginPath(); c.ellipse(x0, Y(y), k*rad, k*rad*E, 0, a0, a1); }
      /* mitad de atrás del borde del tanque */
      c.strokeStyle = C.muted; c.lineWidth = 1.5; c.setLineDash([4, 4]); elipse(6, 3, PI, 2*PI); c.stroke(); c.setLineDash([]);
      /* agua: cono de altura h y radio r, con color degradado */
      g = c.createLinearGradient(X(-r), 0, X(r), 0); g.addColorStop(0, 'rgba(0,0,0,0.28)'); g.addColorStop(0.35, 'rgba(255,255,255,0.35)'); g.addColorStop(1, 'rgba(0,0,0,0.18)');
      c.beginPath(); c.moveTo(x0, Y(0)); c.lineTo(X(r), Y(h)); c.ellipse(x0, Y(h), k*r, k*r*E, 0, 0, PI); c.closePath(); c.fillStyle = C.sec; c.fill(); c.fillStyle = g; c.fill();
      /* lámina naranja de espesor dh sobre la superficie */
      c.save(); c.globalAlpha = 0.75; c.fillStyle = C.rise; c.beginPath(); c.moveTo(X(-r), Y(h)); c.lineTo(X(-(h + dh)/2), Y(h + dh)); c.ellipse(x0, Y(h + dh), k*(h + dh)/2, k*(h + dh)/2*E, 0, PI, 0, true); c.lineTo(X(r), Y(h)); c.ellipse(x0, Y(h), k*r, k*r*E, 0, 0, PI); c.closePath(); c.fill(); c.restore();
      elipse(h + dh, (h + dh)/2, 0, 2*PI); c.fillStyle = C.rise; c.fill(); c.fillStyle = 'rgba(255,255,255,0.35)'; c.fill(); c.strokeStyle = C.rise; c.lineWidth = 1.4; c.stroke();
      /* paredes y borde delantero del tanque */
      c.strokeStyle = C.ink; c.lineWidth = 2.4; c.beginPath(); c.moveTo(X(-3), Y(6)); c.lineTo(x0, Y(0)); c.lineTo(X(3), Y(6)); c.stroke();
      c.lineWidth = 2; elipse(6, 3, 0, PI); c.stroke();
      /* eje, altura h y radio r */
      c.strokeStyle = C.muted; c.lineWidth = 1; c.setLineDash([3, 4]); c.beginPath(); c.moveTo(x0, Y(0)); c.lineTo(x0, Y(6)); c.stroke(); c.setLineDash([]);
      S.line(0, 0, 0, h, {color:C.alt, width:4}); S.line(0, h, r, h, {color:C.tan, width:4});
      S.dot(0, 0, C.ink); S.dot(0, h, C.alt); S.dot(r, h, C.tan);
      txt('h = ' + dec(h, 2), X(0) - 8, Y(h/2), 'right', C.alt);
      txt('r = h/2 = ' + dec(r, 2), X(r/2) + 4, Y(h) + 17, 'center', C.tan);
      txt('dh', X(-(h + dh)/2) - 8, Y(h + dh/2), 'right', C.rise);
      /* medidas fijas del tanque */
      S.line(3.6, 0, 3.6, 6, {color:C.muted, width:1.2}); S.line(3.45, 0, 3.75, 0, {color:C.muted, width:1.2}); S.line(3.45, 6, 3.75, 6, {color:C.muted, width:1.2});
      txt('H = 6', X(3.6), Y(2.2), 'center', C.muted);
      S.line(0, 6.95, 3, 6.95, {color:C.muted, width:1.2}); txt('R = 3', X(1.5), Y(6.95) - 11, 'center', C.muted);
      txt('entran 3 m³ por minuto', X(-4.4), Y(-0.75), 'left', C.sec);
      S.lab('F', X(-4.45), Y(7.25), 0, 0, v.t != null && s >= 21.5);
    },
    caption:function(v){
      var h = v.h, s = v.t == null ? null : v.t*RUN, q = 12/(PI*h*h);
      if (s != null && s < 3) return 'Azul: el agua. Trazo verde: su altura h. Trazo rojo: el radio r de su superficie. Lámina naranja: el agua que entra, de espesor dh';
      return ['Con h = ' + dec(h, 2) + ' m, el nivel sube a razón de ', '\\dfrac{dh}{dt}\\approx ' + num(q, 2), 'dh/dt ≈ ' + dec(q, 2), ' m por minuto. Abajo, de dónde sale'];
    },
    readout:function(v){ var h = v.h; return [['', '\\dfrac{dV}{dt}=\\dfrac{\\pi}{4}\\,h^{2}\\cdot\\dfrac{dh}{dt}'], ['d', '3=\\dfrac{\\pi}{4}\\cdot(' + num(h, 2) + ')^{2}\\cdot\\dfrac{dh}{dt}'], ['', '\\dfrac{dh}{dt}=\\dfrac{3\\cdot 4}{\\pi\\cdot(' + num(h, 2) + ')^{2}}\\approx ' + num(12/(PI*h*h), 2)]]; }
  };
})());
