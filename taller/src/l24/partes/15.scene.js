OA.scene('bn-aprox', (function(){
  var X0 = 0.02, N = 5, T = [], Sx = [], k, s = 0, EX = Math.pow(1.02, 5), dec = oaDec;
  for (k = 0; k <= N; k++){ T.push(bnC(N, k)*Math.pow(X0, k)); s += T[k]; Sx.push(s); }
  return {
    world:{x0:-0.6, x1:10.6, y0:-6.4, y1:3.7}, aspect:10.1/11.2,
    aria:'Dos rectas numéricas. La de arriba va de 1 a 1,12: sobre ella se marcan las sumas parciales del desarrollo de 1,02 elevado a 5. La primera es 1, la segunda 1,1 y las siguientes quedan casi encima del valor exacto, 1,10408. La de abajo es una lupa entre 1,1038 y 1,1042, donde se ve que la tercera suma, 1,104, queda un poco antes del valor exacto y la cuarta, 1,10408, ya casi no se distingue de él.',
    labels:[['F', '(1+x)^{n}\\approx 1+nx+\\dfrac{n(n-1)}{2}x^{2}\\quad\\text{si }|x|\\text{ es pequeño}', '(1 + x)ⁿ ≈ 1 + nx + n(n−1)x²/2, si |x| es pequeño', 'diff']],
    sliders:[{id:'k', tex:'\\text{términos usados}', min:1, max:6, step:1, value:1}],
    legend:'<span><i class="sw rise"></i> suma de los términos usados</span><span><i class="sw tan"></i> valor exacto de \\(1{,}02^{5}\\)</span>',
    anim:{run:22000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.k = Math.min(6, 1 + Math.floor(p*7)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var m = Math.round(v.k || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, x0, y0;
      function num(t, px, py){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      function eje(y, a, b, ticks, f){ var q; S.line(0, y, 10, y, {color:C.ink, width:1.1}); ticks.forEach(function(u){ q = 10*(u - a)/(b - a); c.strokeStyle = C.ink; c.lineWidth = 1; c.beginPath(); c.moveTo(X(q), Y(y) - 4); c.lineTo(X(q), Y(y) + 4); c.stroke(); num(f(u), X(q), Y(y) + 13); }); return function(u){ return 10*(u - a)/(b - a); }; }
      function marca(q, y, col, r){ c.beginPath(); c.arc(X(q), Y(y), r, 0, 6.2832); c.fillStyle = col; c.fill(); }
      var p1 = eje(2, 1, 1.12, [1, 1.02, 1.04, 1.06, 1.08, 1.1, 1.12], function(u){ return dec(u, 2); }), p2 = eje(-0.6, 1.1038, 1.1042, [1.1038, 1.1039, 1.104, 1.1041, 1.1042], function(u){ return dec(u, 4); });
      txt('las sumas, de 1 a 1,12', X(0), Y(2) - 30, 'left', C.ink); txt('con lupa: de 1,1038 a 1,1042', X(0), Y(-0.6) - 30, 'left', C.ink);
      c.strokeStyle = C.tan; c.lineWidth = 1.3; c.beginPath(); c.moveTo(X(p1(EX)), Y(2) - 13); c.lineTo(X(p1(EX)), Y(2) + 4); c.moveTo(X(p2(EX)), Y(-0.6) - 13); c.lineTo(X(p2(EX)), Y(-0.6) + 4); c.stroke();
      txt('exacto', X(p1(EX)), Y(2) - 20, 'center', C.tan); txt('exacto', X(p2(EX)), Y(-0.6) - 20, 'center', C.tan);
      for (i = 0; i < m; i++){ marca(p1(Sx[i]), 2, i === m - 1 ? C.rise : 'rgba(168,95,0,0.35)', i === m - 1 ? 4 : 2.6); if (Sx[i] >= 1.1038 && Sx[i] <= 1.1042) marca(p2(Sx[i]), -0.6, i === m - 1 ? C.rise : 'rgba(168,95,0,0.35)', i === m - 1 ? 4 : 2.6); }
      x0 = X(-0.5); y0 = Y(-2.15);
      txt('término ' + m + ': C(5, ' + (m - 1) + ') · 0,02' + bnSup(m - 1) + ' = ' + dec(T[m - 1], 2*(m - 1)), x0, y0, 'left', C.ink);
      txt('suma de los ' + m + ' primeros: ' + dec(Sx[m - 1], Math.max(1, 2*(m - 1))), x0, y0 + 21, 'left', C.rise);
      txt('valor exacto: 1,02⁵ = 1,1040808032', x0, y0 + 42, 'left', C.tan);
      txt(m === 6 ? 'con los 6 términos la suma es exacta' : 'error: ' + dec(EX - Sx[m - 1], 10), x0, y0 + 63, 'left', C.ink);
      S.lab('F', x0, y0 + 92, 0, 0, m >= 3);
    },
    caption:function(v){ var m = Math.round(v.k || 1); return ['Se escribe 1,02 = 1 + 0,02 y se desarrolla con el binomio. El primer término es 1', 'El segundo término, 5 · 0,02 = 0,1, es el que más aporta. Con dos términos: 1,1', 'El tercero ya es pequeño: 10 · 0,0004 = 0,004. Con tres términos, 1,104: el error está en la quinta cifra decimal', 'El cuarto término, 0,00008, casi no mueve la suma. Cada término es mucho más chico que el anterior', 'El quinto término vale 0,0000008. La suma ya coincide con el valor exacto en nueve decimales', 'Con los seis términos la suma es exactamente 1,02⁵ = 1,1040808032'][m - 1]; },
    readout:function(v){ var m = Math.round(v.k || 1); return [['', '1{,}02^{5}=(1+0{,}02)^{5}=1+5(0{,}02)+10(0{,}02)^{2}+10(0{,}02)^{3}+5(0{,}02)^{4}+(0{,}02)^{5}'], ['d', '\\text{con }' + m + '\\text{ término' + (m > 1 ? 's' : '') + ':}\\quad ' + OA.num(Sx[m - 1], Math.max(1, 2*(m - 1)))]]; }
  };
})());
