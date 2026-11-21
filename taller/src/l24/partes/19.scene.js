OA.scene('bn-prob', (function(){
  var N = 6, dec = oaDec;
  function pr(p, k){ return bnC(N, k)*Math.pow(p, k)*Math.pow(1 - p, N - k); }
  return {
    world:{x0:-1.1, x1:7.1, y0:-4.3, y1:3.7}, aspect:8.0/8.2,
    aria:'Siete barras, una por cada cantidad posible de éxitos en 6 intentos, de 0 a 6. La altura de cada barra es la probabilidad de esa cantidad: el coeficiente binomial de 6 sobre k, por p elevado a k, por q elevado a 6 menos k. Al mover la probabilidad p de éxito, las barras cambian de altura y el máximo se desplaza, pero la suma de las siete es siempre 1.',
    labels:[['F', 'P(X=k)=\\dbinom{n}{k}\\,p^{k}\\,q^{\\,n-k},\\qquad q=1-p', 'P(X = k) = C(n, k) pᵏ qⁿ⁻ᵏ, con q = 1 − p', 'diff']],
    sliders:[{id:'p', tex:'p', min:0.1, max:0.9, step:0.05, value:0.5}],
    legend:'<span><i class="sw sec"></i> probabilidad de cada cantidad de éxitos</span><span><i class="sw tan"></i> la cantidad más probable</span>',
    anim:{run:18000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.p = Math.round((0.5 + 0.3*Math.sin(2*Math.PI*p))*20)/20; }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var p = v.p == null ? 0.5 : v.p, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), k, h, best = 0, x0, y0, s = 0;
      function sm(t, px, py, cc, b){ c.font = (b ? '700 ' : '600 ') + '11.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = cc; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      for (k = 1; k <= N; k++) if (pr(p, k) > pr(p, best) + 1e-12) best = k;
      S.line(-0.6, 0, 6.6, 0, {color:C.ink, width:1.1});
      for (k = 0; k <= N; k++){ h = 6*pr(p, k); s += pr(p, k); S.poly([[k - 0.3, 0], [k + 0.3, 0], [k + 0.3, h], [k - 0.3, h]], {fill:k === best ? C.tan : C.sec, alpha:k === best ? 0.85 : 0.45}); sm(dec(pr(p, k), 3), X(k), Y(h) - 10, k === best ? C.tan : C.ink, k === best); sm('k = ' + k, X(k), Y(0) + 12, C.muted || '#6b6b6b'); }
      x0 = X(-1.0); y0 = Y(-1.05);
      txt('n = 6 intentos,  p = ' + dec(p, 2) + ' (éxito),  q = 1 − p = ' + dec(1 - p, 2), x0, y0, 'left', C.ink);
      txt('más probable: k = ' + best + ':  C(6, ' + best + ') · p' + bnSup(best) + ' · q' + bnSup(N - best) + ' = ' + dec(pr(p, best), 3), x0, y0 + 21, 'left', C.tan);
      txt('suma de las 7 barras: (p + q)⁶ = 1⁶ = ' + dec(s, 3), x0, y0 + 42, 'left', C.sec);
      S.lab('F', x0, y0 + 72, 0, 0, true);
    },
    caption:function(v){ var p = v.p == null ? 0.5 : v.p; return 'Cada barra es un término del desarrollo de (q + p)⁶, con p = ' + dec(p, 2) + ' y q = ' + dec(1 - p, 2) + '. Como p + q = 1, todos los términos juntos suman 1: son las probabilidades de todos los resultados posibles'; },
    readout:function(v){ var p = v.p == null ? 0.5 : v.p; return [['', '(q+p)^{n}=\\displaystyle\\sum_{k=0}^{n}\\binom{n}{k}\\,q^{\\,n-k}\\,p^{k}=1'], ['d', 'p=' + OA.num(p, 2) + ':\\quad P(X=3)=\\dbinom{6}{3}p^{3}q^{3}\\approx ' + OA.num(pr(p, 3), 4)]]; }
  };
})());
