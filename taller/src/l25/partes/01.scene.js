OA.scene('ss-finita', ssPlot({ guia:1, N:6, ymin:0, ymax:14, ystep:2, textH:15.5, aspect:1.78,
  a:function(n){ return 2*n + 1; },
  aria:'Una gráfica de puntos sueltos. En horizontal va la posición n, de 1 a 6; en vertical, el término de la sucesión en esa posición. Los puntos aparecen uno por uno: 3, 5, 7, 9, 11 y 13. Desde el punto que se agrega sale una línea punteada horizontal hasta el eje vertical, donde queda marcado su valor. Después del sexto no hay más: la sucesión es finita, tiene primer término y último término.',
  labels:[['F', 'a_{n}=2n+1,\\qquad n=1,\\,2,\\,3,\\,4,\\,5,\\,6', 'aₙ = 2n + 1, para n = 1, 2, …, 6', 'diff']],
  legend:'<span><i class="sw rise"></i> el término que se está agregando</span><span><i class="sw sec"></i> los términos anteriores</span><span>línea punteada: lleva el término a su valor en el eje \\(a_{n}\\)</span>',
  que:['a cada posición n le corresponde un', 'término. Aquí hay seis, y no hay más.'],
  reg:function(i){ return ['\\text{para }n=' + i + ':\\quad a_{' + i + '}=2\\cdot ' + i + '+1=' + 2*i + '+1=' + (2*i + 1), 'para n = ' + i + ':  a' + ssSub(i) + ' = 2 · ' + i + ' + 1 = ' + 2*i + ' + 1 = ' + (2*i + 1)]; },
  regFin:['\\text{sucesión finita: }3,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13\\ \\text{(6 términos)}', 'sucesión finita: 3, 5, 7, 9, 11, 13 (6 términos)', '\\text{La sucesión completa: }3,\\ 5,\\ 7,\\ 9,\\ 11,\\ 13.\\\\&\\qquad\\text{Primer término: }3.\\ \\text{Último término: }13.\\\\&\\qquad\\text{No hay término }a_{7}\\text{: la sucesión es finita.}'],
  caption:function(n, fin){ return fin ? 'La sucesión completa es 3, 5, 7, 9, 11, 13. Es una lista ordenada con un número fijo de términos: tiene primero y tiene último' : 'A cada posición le corresponde un término. En la posición ' + n + ' está el ' + (2*n + 1) + '. Los puntos van sueltos: entre la posición ' + n + ' y la ' + (n + 1) + ' no hay nada'; },
  readout:function(n){ return [['', 'a_{n}=2n+1,\\quad n\\in\\{1,\\,2,\\,3,\\,4,\\,5,\\,6\\}'], ['d', 'a_{' + n + '}=2\\cdot ' + n + '+1=' + (2*n + 1)]]; }
}));
