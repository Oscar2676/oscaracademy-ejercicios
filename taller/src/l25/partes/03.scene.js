OA.scene('ss-terminos', ssPlot({ N:6, ymin:0, ymax:36, ystep:6, textH:22.5, aspect:1.25,
  a:function(n){ return n*n - 1; },
  aria:'Una gráfica de puntos sueltos de la sucesión n al cuadrado menos 1. Para cada posición n, de 1 a 6, se reemplaza n en la fórmula y se marca el resultado: 0, 3, 8, 15, 24 y 35. Bajo el dibujo se escribe el reemplazo paso a paso.',
  labels:[['F', 'a_{n}=n^{2}-1', 'aₙ = n² − 1', 'diff']],
  legend:'<span><i class="sw rise"></i> el término que se está calculando</span><span><i class="sw sec"></i> los ya calculados</span>',
  lines:function(n, fin){ var L = [], i; for (i = 1; i <= n; i++) L.push(i*i - 1); return [['fórmula:  aₙ = n² − 1.   Se reemplaza n por ' + n, 'ink'], ['a' + ssSub(n) + ' = ' + n + '² − 1 = ' + n*n + ' − 1 = ' + (n*n - 1), 'rise'], ['términos:  ' + L.join(', ') + (fin ? ', …' : ''), 'sec']].concat(fin ? [['las diferencias entre vecinos: 3, 5, 7, 9, 11', 'tan']] : []); },
  caption:function(n, fin){ return fin ? 'Los seis primeros términos son 0, 3, 8, 15, 24, 35. Las distancias entre términos vecinos crecen de 2 en 2: no es una sucesión aritmética' : 'Para encontrar el término de la posición ' + n + ' se reemplaza n por ' + n + ' en la fórmula: ' + n + '² − 1 = ' + (n*n - 1); },
  readout:function(n){ return [['', 'a_{n}=n^{2}-1'], ['d', 'a_{' + n + '}=' + n + '^{2}-1=' + (n*n - 1)]]; }
}));
