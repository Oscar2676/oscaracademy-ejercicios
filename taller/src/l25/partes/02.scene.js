OA.scene('ss-infinita', ssPlot({ guia:2, glab:function(n){ return n === 1 ? '1' : '1/' + n; }, N:12, ymin:0, ymax:1, ystep:0.25, ydec:2, textH:0.72, aspect:1.15, endless:true, L:0, Llab:'',
  a:function(n){ return 1/n; },
  aria:'Una gráfica de puntos sueltos de la sucesión uno sobre n. En horizontal va la posición n; en vertical, el término. Los puntos bajan: 1, un medio, un tercio, un cuarto, y siguen acercándose al eje horizontal sin tocarlo. Después del último punto dibujado hay puntos suspensivos: la sucesión no termina, hay un término para cada número natural.',
  labels:[['F', 'a_{n}=\\dfrac{1}{n},\\qquad n=1,\\,2,\\,3,\\,\\dots', 'aₙ = 1/n, para n = 1, 2, 3, …', 'diff']],
  legend:'<span><i class="sw rise"></i> el término que se está agregando</span><span><i class="sw sec"></i> los términos anteriores</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
  lines:function(n, fin){ return [['posición n = ' + n + ':  a' + ssSub(n) + ' = 1/' + n + ' ≈ ' + oaDec(1/n, 3), 'rise'], ['siempre hay un término siguiente:  a' + ssSub(n + 1) + ' = 1/' + (n + 1), 'sec']].concat(fin ? [['la lista no termina: 1, 1/2, 1/3, 1/4, …', 'ink'], ['hay primer término, pero no hay último', 'tan']] : []); },
  caption:function(n, fin){ return fin ? 'Aquí se dibujaron 12 términos, pero la sucesión sigue: para cada natural n hay un término 1/n. Los puntos suspensivos son parte de la notación' : 'El término de la posición ' + n + ' es 1/' + n + '. Y después de él viene el de la posición ' + (n + 1) + ': en una sucesión infinita siempre hay un siguiente'; },
  readout:function(n){ return [['', '\\{a_{n}\\}_{n=1}^{\\infty}=1,\\ \\dfrac{1}{2},\\ \\dfrac{1}{3},\\ \\dfrac{1}{4},\\ \\dots'], ['d', 'a_{' + n + '}=\\dfrac{1}{' + n + '}']]; }
}));
