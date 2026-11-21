/* Fábrica de escenas de dos paneles: arriba f con su área acumulada, abajo la función de acumulación g(x) = ∫ f. */
function oaAcu(o){
  var RUN = o.run || 26, num = OA.num, x0 = o.x0, x1 = o.x1, st = o.stops || [], P = 1.4, mov = RUN - 4 - P*st.length;
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ return x.toFixed(d).replace('.', ',').replace('-', '−'); }
  /* avance uniforme en x con una pausa en cada parada */
  function xs(s){ var t = s - 2, k, xp = x0, xa; if (t <= 0) return x0;
    for (k = 0; k < st.length; k++){ xa = st[k].x; var d = (xa - xp)/(x1 - x0)*mov; if (t < d) return xp + (xa - xp)*t/d; t -= d; if (t < P) return xa; t -= P; xp = xa; }
    var dd = (x1 - xp)/(x1 - x0)*mov; return t < dd ? xp + (x1 - xp)*t/dd : x1; }
  var T0 = 11.4, T1 = 19, B0 = 0.8, B1 = 8.6;
  function yf(y){ return T0 + (y - o.fr[0])/(o.fr[1] - o.fr[0])*(T1 - T0); }
  function yg(y){ return B0 + (y - o.gr[0])/(o.gr[1] - o.gr[0])*(B1 - B0); }
  return {
    world:{x0:x0 - 0.12*(x1 - x0), x1:x1 + 0.08*(x1 - x0), y0:-0.6, y1:20.6}, aspect:1.08,
    _chk:[{f:o.g, df:o.f, at:o.chk}],
    aria:o.aria, labels:[['F', o.Ftex, o.Ftxt, 'diff']],
    sliders:[{id:'x', tex:'x', min:x0, max:x1, step:0.01, value:x0}],
    legend:'<span><i class="sw sec"></i> \\(f\\)</span><span><i class="sw alt"></i> área que suma</span><span><i class="sw tan"></i> área que resta</span><span><i class="sw rise"></i> \\(g\\) y su tangente</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.x = xs(p*RUN); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var s = v.q == null ? RUN : v.q*RUN, x = v.x, C = S.C, c = S.ctx, X = S.X, Y = S.Y, N = 240, i, u, fa, fb, ua, ub, m = o.f(x), d = 0.09*(x1 - x0), k;
      function txt(tx, px, py, al, cc){ c.font = '600 12px "Source Sans 3", system-ui, sans-serif'; var w = c.measureText(tx).width + 8, xa = al === 'left' ? px - 4 : al === 'right' ? px - w + 4 : px - w/2; c.fillStyle = 'rgba(255,255,255,0.85)'; c.fillRect(xa, py - 9, w, 18); c.fillStyle = cc || C.ink; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      function eje(y0w, r, fy, nom){
        S.line(x0, fy(0), x1 + 0.04*(x1 - x0), fy(0), {color:C.ink, width:1.4}); S.line(x0, fy(r[0]), x0, fy(r[1]), {color:C.ink, width:1.4});
        (o.gx || []).forEach(function(q){ S.line(q, fy(0) - 0.12, q, fy(0) + 0.12, {color:C.ink, width:1}); txt(o.gxt ? o.gxt[o.gx.indexOf(q)] : '' + q, X(q), Y(fy(0)) + 12, 'center', C.muted); });
        nom.forEach(function(q){ if (q !== 0){ S.line(x0 - 0.01*(x1 - x0), fy(q), x0 + 0.01*(x1 - x0), fy(q), {color:C.ink, width:1}); txt(('' + q).replace('-', '−'), X(x0) - 7, Y(fy(q)), 'right', C.muted); } });
      }
      eje(T0, o.fr, yf, o.fy); eje(B0, o.gr, yg, o.gy);
      /* área acumulada, por tiras, verde si f > 0 y burdeo si f < 0 */
      for (i = 0; i < N; i++){ ua = x0 + (x - x0)*i/N; ub = x0 + (x - x0)*(i + 1)/N; if (ub <= ua) break; fa = o.f(ua); fb = o.f(ub);
        S.poly([[ua, yf(0)], [ua, yf(fa)], [ub, yf(fb)], [ub, yf(0)]], {fill:(fa + fb) >= 0 ? C.alt : C.tan, alpha:0.45}); }
      /* f */
      c.strokeStyle = C.sec; c.lineWidth = 2.6; c.setLineDash([]); c.beginPath(); for (i = 0; i <= 300; i++){ u = x0 + (x1 - x0)*i/300; if (i) c.lineTo(X(u), Y(yf(o.f(u)))); else c.moveTo(X(u), Y(yf(o.f(u)))); } c.stroke();
      S.line(x, yf(0), x, yf(m), {color:C.sec, width:3.5}); S.dot(x, yf(m), C.sec);
      /* g: tramo recorrido, punto y tangente de pendiente f(x) */
      c.strokeStyle = C.rise; c.globalAlpha = 0.25; c.lineWidth = 2; c.beginPath(); for (i = 0; i <= 300; i++){ u = x0 + (x1 - x0)*i/300; if (i) c.lineTo(X(u), Y(yg(o.g(u)))); else c.moveTo(X(u), Y(yg(o.g(u)))); } c.stroke(); c.globalAlpha = 1;
      c.lineWidth = 2.8; c.beginPath(); for (i = 0; i <= 300; i++){ u = x0 + (x - x0)*i/300; if (i) c.lineTo(X(u), Y(yg(o.g(u)))); else c.moveTo(X(u), Y(yg(o.g(u)))); } c.stroke();
      k = (B1 - B0)/(o.gr[1] - o.gr[0]);
      S.line(x - d, yg(o.g(x)) - d*m*k, x + d, yg(o.g(x)) + d*m*k, {color:C.ink, width:2});
      S.line(x, yg(o.g(x)), x, yf(0), {color:C.muted, width:1, dash:[3, 4]});
      S.dot(x, yg(o.g(x)), C.rise);
      txt(o.fn, X(x0 + 0.28*(x1 - x0)), Y(T1 + 0.75), 'left', C.sec); txt(o.gn, X(x0 + 0.02*(x1 - x0)), Y(B1 + 0.75) + 2, 'left', C.rise);
      var der = x > x0 + 0.72*(x1 - x0); txt('f(x) = ' + dec(m, 2), X(x) + (der ? -10 : 10), Y(yf(m)) + (m >= 0 ? -12 : 12), der ? 'right' : 'left', C.sec);
      txt('g(x) = ' + dec(o.g(x), 2), X(x) + (der ? -10 : 10), Y(yg(o.g(x))) + (m >= 0 ? 14 : -14), der ? 'right' : 'left', C.rise);
      st.forEach(function(q){ if (Math.abs(x - q.x) < 0.004) txt(q.txt, X(x), Y(yg(o.g(x))) + (q.up ? -18 : 20), 'center', C.ink); });
      S.lab('F', X(x0 + 0.52*(x1 - x0)), Y(10.3), 0, 0, v.q != null && s >= RUN - 2);
    },
    caption:function(v){
      var x = v.x, s = v.q == null ? null : v.q*RUN, m = o.f(x), k;
      if (s != null && s < 2) return o.cap0;
      for (k = 0; k < st.length; k++) if (Math.abs(x - st[k].x) < 0.004) return st[k].cap;
      return 'En x = ' + dec(x, 2) + ': f(x) es ' + (Math.abs(m) < 0.005 ? 'cero' : m > 0 ? 'positiva, el área suma y g crece' : 'negativa, el área resta y g decrece') + '. La pendiente de la tangente a g es f(x) = ' + dec(m, 2);
    },
    readout:function(v){ return o.readout(v.x, num); }
  };
}
