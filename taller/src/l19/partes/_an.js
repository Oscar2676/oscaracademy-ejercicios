/* Escena común de análisis de funciones: un punto P recorre la curva con su tangente y la curva se pinta según el signo de f' (modo 'crec') o de f'' (modo 'conc'). */
function oaAn(o){
  var num = OA.num, f = o.f, d0 = o.d0, d1 = o.d1, conc = o.mode === 'conc', g = conc ? o.d2f : o.df, marks = o.marks || [];
  var stops = (o.stops || []).slice().sort(function(p, q){ return p.x - q.x; }), PAUSE = o.pause || 0.5;
  var T0 = 3, SW = o.sweep || 18, T1 = T0 + SW + PAUSE*stops.length, MK = 3.5, RUN = T1 + MK*Math.max(marks.length, 1);
  /* Recorrido con detenciones: P avanza a rapidez constante y se detiene PAUSE segundos en cada x de stops. */
  function xAt(u){ var vel = (d1 - d0)/SW, pos = d0, i; for (i = 0; i < stops.length; i++){ var dt = (stops[i].x - pos)/vel; if (u < dt) return pos + vel*u; u -= dt; pos = stops[i].x; if (u < PAUSE) return pos; u -= PAUSE; } return Math.min(d1, pos + vel*u); }
  function enStop(x){ for (var i = 0; i < stops.length; i++) if (Math.abs(x - stops[i].x) < 1e-9) return stops[i]; return null; }
  var cuts = [d0].concat(o.cuts || []).concat([d1]);
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  var dn = conc ? 'f″(x)' : 'f′(x)', dnTex = conc ? "f''(x)" : "f'(x)";
  var labels = marks.map(function(m, i){ return ['m' + i, m.tex, m.fb, 'diff']; });
  labels.push(['P', 'P\\,\\big(x,\;f(x)\\big)', 'P (x, f(x))', 'pt c-tan']);
  var def = {
    world:o.world, aspect:o.aspect || 1, aria:o.aria, labels:labels,
    sliders:[{id:'x', tex:'x', min:d0, max:d1, step:(d1 - d0)/400, value:d0}],
    legend:conc ? '<span><i class="sw sec"></i> cóncava hacia arriba, \\(f\'\'(x)&gt;0\\)</span><span><i class="sw rise"></i> cóncava hacia abajo, \\(f\'\'(x)&lt;0\\)</span><span><i class="sw tan"></i> tangente en \\(P\\)</span>'
                : '<span><i class="sw alt"></i> crece, \\(f\'(x)&gt;0\\)</span><span><i class="sw rise"></i> decrece, \\(f\'(x)&lt;0\\)</span><span><i class="sw tan"></i> tangente en \\(P\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; var s = p*RUN; v.x = s < T0 ? d0 : s < T1 ? xAt(s - T0) : d1; }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, C = S.C, W = S.W, c = S.ctx, i;
      var sx = S.w/(W.x1 - W.x0), sy = S.h/(W.y1 - W.y0), hasta = v.t == null ? d1 : (s < T0 ? d0 : x);
      function col(sg){ return conc ? (sg > 0 ? C.sec : C.rise) : (sg > 0 ? C.alt : C.rise); }
      function txt(t, px, py, al, cc, b){ c.fillStyle = cc || C.ink; c.font = (b === false ? '' : '600 ') + '12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      S.axes({gx:o.gx, gy:o.gy, full:!!o.full});
      S.curve(f, d0, d0 + (d1 - d0)*cl(s/(T0 - 0.5)), {color:C.ink, width:1.6});
      var by = S.h - 30;
      for (i = 0; i < cuts.length - 1; i++){
        var u0 = cuts[i], u1 = Math.min(cuts[i + 1], hasta); if (u1 <= u0) continue;
        var sg = g((cuts[i] + cuts[i + 1])/2), cc = col(sg);
        S.curve(f, u0, u1, {color:cc, width:3.5});
        S.pline(S.X(u0), by, S.X(u1), by, {color:cc, width:7});
        if (hasta >= cuts[i + 1]) txt((conc ? 'f″' : 'f′') + (sg > 0 ? ' > 0' : ' < 0'), (S.X(cuts[i]) + S.X(cuts[i + 1]))/2, by - 12, 'center', cc);
      }
      for (i = 1; i < cuts.length - 1; i++) if (hasta >= cuts[i]){ S.pline(S.X(cuts[i]), by - 7, S.X(cuts[i]), by + 7, {color:C.ink, width:1.5}); S.line(cuts[i], f(cuts[i]), cuts[i], 0, {color:C.muted, width:1, dash:[3,4]}); }
      if (o.ends) o.ends.forEach(function(e){ S.dot(e, f(e), C.ink); });
      var live = v.t == null || (s >= T0 && s < T1);
      if (live){
        var fx = f(x), m = o.df(x), ux = sx, uy = -m*sy, n = Math.sqrt(ux*ux + uy*uy), L = 0.17*S.w; ux /= n; uy /= n;
        S.pline(S.X(x) - L*ux, S.Y(fx) - L*uy, S.X(x) + L*ux, S.Y(fx) + L*uy, {color:C.tan, width:3});
        S.dot(x, fx, C.tan);
        var st = enStop(x); if (st){ txt(dn + ' = 0', S.X(x), Math.max(12, Math.min(by - 30, S.Y(fx) + (st.up ? -20 : 22))), 'center', C.tan); }
        var gv = g(x), t1 = st ? '' : dn + ' = ' + dec(gv, 2), tw = c.measureText(t1).width + 8, up = o.txtUp ? o.txtUp(x) : true, lado = (m <= 0) === up ? 1 : -1, px = Math.max(tw/2 + 4, Math.min(S.X(x) + lado*(tw/2 + 8), S.w - tw/2 - 4));
        txt(t1, px, Math.max(12, Math.min(by - 30, S.Y(fx) + (up ? -22 : 24))), 'center', C.tan);
      }
      marks.forEach(function(mk, k){ var on = v.t == null || s >= T1 + MK*k; if (on) S.dot(mk.x, f(mk.x), mk.col === 'ink' ? C.ink : C.tan); var p = mk.pos || [1, 1]; S.out('m' + k, S.X(mk.x), S.Y(f(mk.x)), p[0], p[1], on, 10); });
      S.lab('P', 0, 0, 0, 0, false);
    },
    caption:function(v){
      var x = v.x, s = v.t == null ? null : v.t*RUN, gv = g(x), k;
      if (s != null && s < T0) return ['Curva: la gráfica de ', o.fTex, o.fFb];
      if (s == null || s < T1){
        if (Math.abs(gv) < (o.eps || 0.04)) return conc ? ['Aquí la curva cambia la forma en que se dobla: ', "f''(x)=0", 'f″(x) = 0'] : ['Tangente horizontal: ', "f'(x)=0", 'f′(x) = 0'];
        if (conc) return gv > 0 ? ['La curva se dobla hacia arriba y queda sobre la tangente: ', "f''(x)=" + num(gv, 2) + '>0', 'f″(x) = ' + dec(gv, 2) + ' > 0'] : ['La curva se dobla hacia abajo y queda bajo la tangente: ', "f''(x)=" + num(gv, 2) + '<0', 'f″(x) = ' + dec(gv, 2) + ' < 0'];
        return gv > 0 ? ['La tangente sube y la función crece: ', "f'(x)=" + num(gv, 2) + '>0', 'f′(x) = ' + dec(gv, 2) + ' > 0'] : ['La tangente baja y la función decrece: ', "f'(x)=" + num(gv, 2) + '<0', 'f′(x) = ' + dec(gv, 2) + ' < 0'];
      }
      if (!marks.length) return o.endCap || '';
      k = Math.min(Math.floor((s - T1)/MK), marks.length - 1); return marks[k].cap;
    },
    readout:function(v){
      var x = v.x, r = [['d', 'x=' + num(x, 2) + '\\qquad f(x)=' + num(f(x), 2)], ['', "f'(x)=" + num(o.df(x), 2) + (o.d2f ? "\\qquad f''(x)=" + num(o.d2f(x), 2) : '')]];
      return r;
    }
  };
  def._chk = {f:f, df:o.df, d2f:o.d2f, d0:d0, d1:d1};
  return def;
}
