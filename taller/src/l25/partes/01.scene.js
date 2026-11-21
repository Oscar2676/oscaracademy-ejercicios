OA.scene('ss-finita', ssPlot({ N:6, ymin:0, ymax:14, ystep:2, textH:8.6, aspect:1.25,
  a:function(n){ return 2*n + 1; },
  aria:'Una gráfica de puntos sueltos. En horizontal va la posición n, de 1 a 6; en vertical, el término de la sucesión en esa posición. Los puntos aparecen uno por uno: 3, 5, 7, 9, 11 y 13. Después del sexto no hay más: la sucesión es finita, tiene primer término y último término.',
  labels:[['F', 'a_{n}=2n+1,\\qquad n=1,\\,2,\\,3,\\,4,\\,5,\\,6', 'aₙ = 2n + 1, para n = 1, 2, …, 6', 'diff']],
  legend:'<span><i class="sw rise"></i> el término que se está agregando</span><span><i class="sw sec"></i> los términos anteriores</span>',
  lines:function(n, fin){ var L = [], i; for (i = 1; i <= n; i++) L.push(2*i + 1); return [['posición n = ' + n + ':  a' + ssSub(n) + ' = 2 · ' + n + ' + 1 = ' + (2*n + 1), 'rise'], ['la sucesión hasta aquí:  ' + L.join(', '), 'sec']].concat(fin ? [['primer término: 3.  Último término: 13.  Tiene 6 términos', 'ink'], ['no hay término 7: la sucesión es finita', 'tan']] : []); },
  caption:function(n, fin){ return fin ? 'La sucesión completa es 3, 5, 7, 9, 11, 13. Es una lista ordenada con un número fijo de términos: tiene primero y tiene último' : 'A cada posición le corresponde un término. En la posición ' + n + ' está el ' + (2*n + 1) + '. Los puntos van sueltos: entre la posición ' + n + ' y la ' + (n + 1) + ' no hay nada'; },
  readout:function(n){ return [['', 'a_{n}=2n+1,\\quad n\\in\\{1,\\,2,\\,3,\\,4,\\,5,\\,6\\}'], ['d', 'a_{' + n + '}=2\\cdot ' + n + '+1=' + (2*n + 1)]]; }
}));
