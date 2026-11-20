/* Escena de paneles apilados: f, f' y (si se da) f'' con el mismo eje x. Una recta vertical recorre los paneles y marca los valores. */
function oaTri(o){
  var num = OA.num, d0 = o.d0, d1 = o.d1, P = o.panels, n = P.length, marks = o.marks || [];
  var T0 = 2 + 2.5*n, SW = o.sweep || 20, T1 = T0 + SW, MK = 4, RUN = T1 + MK*Math.max(marks.length, 1);
  function cl(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function dec(x, d){ var s = x.toFixed(d); if (Number(s) === 0) s = (0).toFixed(d); return s.replace('.', ',').replace('-', '−'); }
  var def = {
    world:{x0:0, x1:1, y0:0, y1:1}, aspect:o.aspect || (n === 3 ? 1.25 : 0.95), aria:o.aria, labels:[],
    sliders:[{id:'x', tex:'x', min:d0, max:d1, step:(d1 - d0)/400, value:d0}],
    legend:P.map(function(p){ return '<span><i class="sw ' + p.sw + '"></i> \\(' + p.tex + '\\)</span>'; }).join(''),
    anim:{run:RUN*1000, hold:6000, still:1, apply:function(p, v){ v.t = p; var s = p*RUN; v.x = s < T0 ? d0 : s < T1 ? d0 + (d1 - d0)*(s - T0)/SW : d1; }},
    onInput:function(v){ v.t = null; },
    draw:function(S, v){
      var s = v.t == null ? RUN : v.t*RUN, x = v.x, C = S.C, c = S.ctx, w = S.w, h = S.h, padL = 34, padR = 10, gap = 14, ph = (h - gap*(n - 1) - 8)/n;
      function X(u){ return padL + (u - o.x0)/(o.x1 - o.x0)*(w - padL - padR); }
      function txt(t, px, py, al, cc, b){ c.fillStyle = cc || C.ink; c.font = (b === false ? '' : '600 ') + '12px "Source Sans 3", system-ui, sans-serif'; c.textAlign = al || 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      var live = v.t == null || (s >= T0 && s < T1), hasta = v.t == null ? d1 : x;
      P.forEach(function(p, k){
        var top = 4 + k*(ph + gap), col = C[p.col];
        function Y(y){ return top + ph - (y - p.y0)/(p.y1 - p.y0)*ph; }
        c.save(); c.beginPath(); c.rect(0, top, w, ph); c.clip();
        c.fillStyle = C.bg; c.fillRect(0, top, w, ph);
        (o.gx || []).forEach(function(g){ S.pline(X(g), top, X(g), top + ph, {color:C.grid, width:1}); });
        (p.gy || []).forEach(function(g){ S.pline(padL, Y(g), w - padR, Y(g), {color:C.grid, width:1}); });
        S.pline(padL, Y(0), w - padR, Y(0), {color:C.muted, width:1.5}); S.pline(X(0), top, X(0), top + ph, {color:C.muted, width:1.5});
        var kk = cl((s - 2.5*k)/2.2), N = 300, i, first = true, xe = d0 + (d1 - d0)*kk;
        if (kk > 0){ S.style({color:col, width:2.6}); c.beginPath(); for (i = 0; i <= N; i++){ var u = d0 + (xe - d0)*i/N; if (first){ c.moveTo(X(u), Y(p.f(u))); first = false; } else c.lineTo(X(u), Y(p.f(u))); } c.stroke(); }
        marks.forEach(function(mk, j){ if ((v.t == null || s >= T1 + MK*j || (live && hasta >= mk.x)) ) S.pline(X(mk.x), top, X(mk.x), top + ph, {color:C[mk.col || 'rise'], width:1.3, dash:[4,4]}); });
        if (live){ S.pline(X(x), top, X(x), top + ph, {color:C.tan, width:1.4}); var yv = p.f(x); c.setLineDash([]); c.beginPath(); c.arc(X(x), Y(yv), 5, 0, Math.PI*2); c.fillStyle = col; c.fill(); c.lineWidth = 2; c.strokeStyle = C.bg; c.stroke(); }
        c.restore();
        c.fillStyle = C.muted; c.font = '11px "Source Sans 3", system-ui, sans-serif'; c.textAlign = 'right'; c.textBaseline = 'middle';
        (p.gy || []).forEach(function(g){ c.fillText(String(g).replace('-', '−'), padL - 4, Y(g)); });
        if (kk >= 1) txt(p.name + (live ? ' = ' + dec(p.f(x), 2) : ''), w - padR - 4, top + 11, 'right', col);
        if (k === n - 1){ c.fillStyle = C.muted; c.font = '11px "Source Sans 3", system-ui, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'bottom'; (o.gx || []).forEach(function(g){ c.fillText(String(g).replace('-', '−'), X(g), top + ph - 1); }); }
        marks.forEach(function(mk, j){ if (mk.panel === k && (v.t == null || s >= T1 + MK*j)){ c.setLineDash([]); c.beginPath(); c.arc(X(mk.x), Y(p.f(mk.x)), 5.5, 0, Math.PI*2); c.fillStyle = C[mk.col || 'rise']; c.fill(); c.lineWidth = 2; c.strokeStyle = C.bg; c.stroke();
          var al = mk.al || 'left'; txt(mk.txt, X(mk.x) + (al === 'left' ? 9 : -9), Y(p.f(mk.x)) + (mk.dy || -12), al, C[mk.col || 'rise']); } });
      });
    },
    caption:function(v){
      var s = v.t == null ? null : v.t*RUN, x = v.x, k;
      if (s != null && s < T0){ k = Math.min(Math.floor(s/2.5), n - 1); return ['Panel ' + (k + 1) + ': la gráfica de ', P[k].capTex, P[k].capFb]; }
      if (s == null || s < T1) return o.live(x, dec);
      if (!marks.length) return o.endCap || '';
      return marks[Math.min(Math.floor((s - T1)/MK), marks.length - 1)].cap;
    },
    readout:function(v){ var x = v.x; return [['d', 'x=' + num(x, 2)], ['', P.map(function(p){ return p.tex.split('=')[0] + '=' + num(p.f(x), 2); }).join('\\qquad ')]]; }
  };
  def._chk = {f:P[0].f, df:P[1].f, d2f:P[2] ? P[2].f : null, d0:d0, d1:d1};
  return def;
}
