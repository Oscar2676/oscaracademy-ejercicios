OA.scene('bn-terminos', {
  world:{x0:-0.9, x1:7.9, y0:-3.2, y1:3.5}, aspect:6.7/8.8,
  aria:'Una fila de casilleros, uno por cada término del desarrollo de a más b elevado a n. Sobre cada casillero va su posición: primero, segundo, tercero. Debajo va el valor de k, que empieza en 0. Los casilleros se cuentan uno por uno: como k va de 0 a n, son n más 1. Al final se destaca el término central, o los dos centrales si n es impar.',
  labels:[['F', '\\text{número de términos de }(a+b)^{n}=n+1', 'número de términos = n + 1', 'diff']],
  sliders:[{id:'n', tex:'n', min:1, max:7, step:1, value:6}],
  legend:'<span><i class="sw rise"></i> el término que se está contando</span><span><i class="sw tan"></i> término central (o los dos centrales)</span>',
  anim:{run:20000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.n = 6; v.k = Math.min(6, Math.floor(p*8.4)); v.fin = p*8.4 >= 7; }},
  onInput:function(v){ v.q = null; v.k = v.n; v.fin = true; },
  draw:function(S, v){
    var n = Math.round(v.n || 6), k = v.k == null ? n : Math.min(n, v.k), C = S.C, txt = oaTxt(S), x0, y0, par = n % 2 === 0, c1 = Math.floor(n/2), c2 = Math.ceil(n/2);
    bnCajas(S, n, 2, function(i){ return v.fin ? (i === c1 || i === c2 ? C.tan : null) : i === k ? C.rise : i < k ? C.sec : null; }, function(i){ return i <= k ? (i + 1) + 'º' : ''; }, function(i){ return 'k = ' + i; });
    x0 = S.X(-0.8); y0 = S.Y(0.55);
    txt('contados hasta ahora: ' + (k + 1) + (k === n ? '  =  n + 1  =  ' + n + ' + 1' : ''), x0, y0, 'left', C.rise);
    txt('k va de 0 a n = ' + n + ': un valor más que n', x0, y0 + 21, 'left', C.ink);
    if (v.fin) txt(par ? 'n par: un término central, el ' + (c1 + 1) + 'º (k = ' + c1 + ')' : 'n impar: dos términos centrales, el ' + (c1 + 1) + 'º y el ' + (c2 + 1) + 'º (k = ' + c1 + ' y k = ' + c2 + ')', x0, y0 + 42, 'left', C.tan);
    S.lab('F', x0, y0 + 70, 0, 0, !!v.fin && v.q != null);
  },
  caption:function(v){ var n = Math.round(v.n || 6), k = v.k == null ? n : Math.min(n, v.k); if (v.fin) return 'El desarrollo de (a + b)' + bnSup(n) + ' tiene ' + (n + 1) + ' términos. ' + (n % 2 === 0 ? 'Como ' + (n + 1) + ' es impar, hay uno justo al medio' : 'Como ' + (n + 1) + ' es par, al medio quedan dos') + '. Cambia n con el deslizador'; return 'Se cuenta el término ' + (k + 1) + 'º, que corresponde a k = ' + k + '. La posición siempre es k + 1, porque k parte en 0'; },
  readout:function(v){ var n = Math.round(v.n || 6); return [['', 'k=0,\\,1,\\,2,\\,\\dots,\\,n\\quad\\Longrightarrow\\quad n+1\\ \\text{términos}'], ['d', 'n=' + n + ':\\quad ' + n + '+1=' + (n + 1) + '\\ \\text{términos}']]; }
});
