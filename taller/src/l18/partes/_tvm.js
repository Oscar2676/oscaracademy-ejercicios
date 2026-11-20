/* Escena común del teorema del valor medio: curva, secante AB y tangente en C que recorre el intervalo. */
function oaTVM(o){
  var num = OA.num, a = o.a, b = o.b, f = o.f, df = o.df, cs = o.cs || [], fa = f(a), fb = f(b), m = (fb - fa)/(b - a);
  var T0 = 3, T1 = 8, T2 = 14, T3 = 26, STAR = 8, RUN = T3 + STAR*Math.max(cs.length, 1);
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  function sinTan(c){ return o.noTan ? o.noTan(c) : false; }
  function cAt(s){
    if (s < T2) return a;
    if (s < T3) return a + (b - a)*(s - T2)/(T3 - T2);
    if (!cs.length) return b;
    var i = Math.min(Math.floor((s - T3)/STAR), cs.length - 1), u = (s - T3) - i*STAR, desde = i ? cs[i - 1].x : b;
    return desde + (cs[i].x - desde)*OA.smooth(cl(u/3));
  }
  function cerca(c){ for (var i = 0; i < cs.length; i++) if (Math.abs(c - cs[i].x) <= (b - a)/300) return i; return -1; }
  var labels = [['A', o.ATex, o.AFb, 'pt'], ['B', o.BTex, o.BFb, 'pt'], ['C', o.CTex, o.CFb, 'pt c-tan'], ['ms', o.mTex, o.mFb, 'c-sec']];
  cs.forEach(function(k, i){ labels.push(['k' + i, k.tex, k.fb, 'diff']); });
  return {
    world:o.world, aspect:o.aspect || 1, aria:o.aria, labels:labels,
    sliders:[{id:'c', tex:o.cName || 'c', min:a, max:b, step:(b - a)/400, value:a}],
    legend:'<span><i class="sw sec"></i> secante \\(AB\\)</span><span><i class="sw tan"></i> tangente en \\(C\\)</span>',
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; v.c = cAt(p*RUN); }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, c = v.c, fc = f(c), C = S.C, W = S.W, x = S.ctx;
      var sx = S.w/(W.x1 - W.x0), sy = S.h/(W.y1 - W.y0);
      S.axes({gx:o.gx, gy:o.gy, full:!!o.full});
      S.curve(f, o.d0, o.d1, {color:C.muted, width:1.2});
      S.curve(f, a, a + (b - a)*cl(s/(T0 - 0.5)), {color:C.ink, width:3});
      if (s >= T0){ S.guide(a, fa); S.guide(b, fb); }
      if (s >= T1){
        var g = cl((s - T1)/2);
        if (g < 1) S.line(a, fa, a + (b - a)*g, fa + m*(b - a)*g, {color:C.sec, width:2.5});
        else S.line(W.x0, fa + m*(W.x0 - a), W.x1, fa + m*(W.x1 - a), {color:C.sec, width:2.5});
      }
      if (s >= T2){
        S.line(c, fc, c, 0, {color:C.tan, width:1, dash:[3,4]});
        if (!sinTan(c)){
          var mc = df(c), ux = sx, uy = -mc*sy, n = Math.sqrt(ux*ux + uy*uy), L = 0.27*S.w; ux /= n; uy /= n;
          S.pline(S.X(c) - L*ux, S.Y(fc) - L*uy, S.X(c) + L*ux, S.Y(fc) + L*uy, {color:C.tan, width:3});
          if (cerca(c) < 0 || (v.t != null && s < T3)){
            x.fillStyle = C.tan; x.font = '600 12px "Source Sans 3", system-ui, sans-serif'; x.textBaseline = 'middle';
            var txt = 'pendiente ' + dec(mc, 2), tw = x.measureText(txt).width, e1 = [S.X(c) + L*ux, S.Y(fc) + L*uy], e0 = [S.X(c) - L*ux, S.Y(fc) - L*uy];
            var lejos = function(e){ return Math.min(Math.hypot(e[0] - S.X(a), e[1] - S.Y(fa)), Math.hypot(e[0] - S.X(b), e[1] - S.Y(fb))) - (e[0] < 0 || e[0] > S.w || e[1] < 0 || e[1] > S.h ? 1e4 : 0); };
            var der = lejos(e1) >= lejos(e0), e = der ? e1 : e0;
            x.textAlign = 'left'; var tx = Math.max(4, Math.min(der ? e[0] + 6 : e[0] - tw - 6, S.w - tw - 4)), ty = Math.max(10, Math.min(S.h - 22, e[1] + ((der ? uy : -uy) < 0 ? -9 : 11)));
            x.fillText(txt, tx, ty);
          }
        }
        x.fillStyle = C.tan; x.font = '600 12px "Source Sans 3", system-ui, sans-serif'; x.textAlign = 'center'; x.textBaseline = 'top';
        x.fillText((o.cFb || 'c') + ' = ' + dec(c, 2), S.X(c), S.Y(0) + (fc >= 0 ? 5 : -18));
      }
      if (s >= T0){ S.dot(a, fa, C.sec); S.dot(b, fb, C.sec); }
      if (s >= T2) S.dot(c, fc, C.tan);
      var q = o.pos || {};
      S.out('A', S.X(a), S.Y(fa), (q.A || [-1, -1])[0], (q.A || [-1, -1])[1], s >= T0);
      S.out('B', S.X(b), S.Y(fb), (q.B || [1, -1])[0], (q.B || [1, -1])[1], s >= T0);
      var ms = q.ms || [(a + b)/2, (fa + fb)/2, -1, 1];
      S.out('ms', S.X(ms[0]), S.Y(ms[1]), ms[2], ms[3], s >= T1 + 2);
      var k = s >= T3 || v.t == null ? cerca(c) : -1;
      var pc = typeof q.C === 'function' ? q.C(c) : (q.C || [1, -1]);
      S.out('C', S.X(c), S.Y(fc), pc[0], pc[1], s >= T2 && k < 0 && Math.abs(c - a) > (b - a)*0.12 && Math.abs(c - b) > (b - a)*0.12);
      cs.forEach(function(kk, i){ var p = kk.pos || [1, -1]; S.out('k' + i, S.X(kk.x), S.Y(f(kk.x)), p[0], p[1], k === i, 10); });
    },
    caption:function(v){
      var c = v.c, k = cerca(c);
      if (v.t == null) return sinTan(c) ? o.noTanCap : k >= 0 ? ['La tangente en C es paralela a la secante: ', cs[k].capTex, cs[k].capFb] : 'La tangente en C no es paralela a la secante';
      var s = v.t*RUN;
      if (s < T0) return ['Curva negra gruesa: la función en el intervalo ', o.intTex, o.intFb];
      if (s < T1) return 'Puntos A y B: los extremos del intervalo, con sus coordenadas';
      if (s < T2) return ['Recta azul: la secante por A y B. Su pendiente es ', o.mCapTex, o.mCapFb];
      if (s < T3) return sinTan(c) ? o.noTanCap : ['Punto rojo C y recta roja: la tangente en C. Su pendiente es ', (o.dName || "f'(c)") + '=' + num(df(c), 2), (o.dFb || "f'(c)") + ' = ' + dec(df(c), 2)];
      if (!cs.length) return o.endCap;
      return k >= 0 ? ['La tangente en C es paralela a la secante: ', cs[k].capTex, cs[k].capFb] : 'El punto C va al lugar donde la tangente queda paralela a la secante';
    },
    readout:function(v){
      var c = v.c, rows = [['d', o.mRoTex]];
      if (sinTan(c)) rows.push(['', (o.cName || 'c') + '=' + num(c, 2) + '\\qquad ' + (o.dName || "f'(c)") + '\\ \\text{no existe}']);
      else { rows.push(['', (o.cName || 'c') + '=' + num(c, 2) + '\\qquad ' + (o.dName || "f'(c)") + '=' + num(df(c), 2)]); }
      return rows;
    }
  };
}
