OA.scene('ss-terminos', ssPlot({ N:6, ymin:0, ymax:36, ystep:6, textH:41, aspect:1.78,
  a:function(n){ return n*n - 1; },
  aria:'Una gráfica de puntos sueltos de la sucesión n al cuadrado menos 1. Para cada posición n, de 1 a 6, se reemplaza n en la fórmula y se marca el resultado: 0, 3, 8, 15, 24 y 35. Desde cada punto sale una línea punteada horizontal hasta el eje vertical, donde queda marcado su valor. Bajo el dibujo se escribe el reemplazo paso a paso.',
  labels:[['F', 'a_{n}=n^{2}-1', 'aₙ = n² − 1', 'diff']],
  legend:'<span><i class="sw rise"></i> el término que se está calculando</span><span><i class="sw sec"></i> los ya calculados</span><span>líneas punteadas: llevan cada término a su valor en el eje \\(a_{n}\\)</span>',
  que:['cada término sale de reemplazar n por', 'su posición en el término general.'],
  reg:function(i){ return ['\\text{para }n=' + i + ':\\quad a_{' + i + '}=' + i + '^{2}-1=' + i*i + '-1=' + (i*i - 1), 'para n = ' + i + ':  a' + ssSub(i) + ' = ' + i + '² − 1 = ' + i*i + ' − 1 = ' + (i*i - 1)]; },
  regFin:['\\text{para }n=n:\\quad a_{n}=n^{2}-1', 'para n = n:  aₙ = n² − 1', '\\text{Para una posición cualquiera, }n=n:\\quad a_{n}=n^{2}-1.\\\\&\\qquad\\text{Términos: }0,\\ 3,\\ 8,\\ 15,\\ 24,\\ 35,\\ \\ldots\\\\&\\qquad\\text{Restas entre vecinos: }3-0=3,\\ 8-3=5,\\ 15-8=7,\\ 24-15=9,\\ 35-24=11.'],
  caption:function(n, fin){ return fin ? 'Los seis primeros términos son 0, 3, 8, 15, 24, 35. Las distancias entre términos vecinos crecen de 2 en 2: la sucesión no avanza a paso constante' : 'Para encontrar el término de la posición ' + n + ' se reemplaza n por ' + n + ' en la fórmula: ' + n + '² − 1 = ' + (n*n - 1); },
  readout:function(n){ return [['', 'a_{n}=n^{2}-1'], ['d', 'a_{' + n + '}=' + n + '^{2}-1=' + (n*n - 1)]]; }
}));
