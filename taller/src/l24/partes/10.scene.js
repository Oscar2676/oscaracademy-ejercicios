OA.scene('bn-termino', {
  world:{x0:-0.9, x1:7.9, y0:-4.6, y1:3.5}, aspect:8.1/8.8,
  aria:'Los siete términos del desarrollo de a más b elevado a 6, en una fila de casilleros con su posición arriba y su valor de k abajo. Un casillero se destaca y, bajo la fila, se arma su término paso a paso: de la posición se obtiene k restando 1, con k se calcula el coeficiente, la potencia de a es 6 menos k y la potencia de b es k.',
  labels:[['F', 'T_{k+1}=\\dbinom{n}{k}\\,a^{\\,n-k}\\,b^{\\,k}', 'T(k+1) = C(n, k) aⁿ⁻ᵏ bᵏ', 'diff']],
  sliders:[{id:'p', tex:'\\text{posición}', min:1, max:7, step:1, value:1}],
  legend:'<span><i class="sw rise"></i> el término elegido y su coeficiente</span><span><i class="sw sec"></i> potencia de \\(a\\): \\(n-k\\)</span><span><i class="sw tan"></i> potencia de \\(b\\): \\(k\\)</span>',
  anim:{run:24000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.p = Math.min(7, 1 + Math.floor(p*7.6)); }},
  onInput:function(v){ v.q = null; },
  draw:function(S, v){
    var n = 6, p = Math.round(v.p || 1), k = p - 1, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x0, y0, off;
    off = bnCajas(S, n, 2, function(i){ return i === k ? C.rise : null; }, function(i){ return (i + 1) + 'º'; }, function(i){ return 'k = ' + i; });
    
    x0 = X(-0.8); y0 = Y(0.5);
    txt('posición ' + p + '  →  k = ' + p + ' − 1 = ' + k, x0, y0, 'left', C.ink);
    txt('coeficiente: C(6, ' + k + ') = ' + bnC(6, k), x0, y0 + 21, 'left', C.rise);
    txt('potencia de a: n − k = 6 − ' + k + ' = ' + (6 - k), x0, y0 + 42, 'left', C.sec);
    txt('potencia de b: k = ' + k, x0, y0 + 63, 'left', C.tan);
    txt('T' + String.fromCharCode(8320 + p) + ' = ' + (bnTerm(6, k)), x0, y0 + 84, 'left', C.ink);
    S.lab('F', x0, y0 + 112, 0, 0, true);
  },
  caption:function(v){ var p = Math.round(v.p || 1), k = p - 1; return 'El término de la posición ' + p + ' usa k = ' + k + ', uno menos que su posición. Con ese k se arman el coeficiente y las dos potencias: ' + bnTerm(6, k); },
  readout:function(v){ var p = Math.round(v.p || 1), k = p - 1; return [['', '\\text{posición }' + p + ':\\quad k=' + p + '-1=' + k], ['d', 'T_{' + p + '}=\\dbinom{6}{' + k + '}a^{' + (6 - k) + '}b^{' + k + '}=' + bnC(6, k) + '\\,a^{' + (6 - k) + '}b^{' + k + '}']]; }
});
