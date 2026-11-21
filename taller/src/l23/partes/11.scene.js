OA.scene('vec-aceleracion', oaMov((function(){
  var dec = oaDec, num = OA.num;
  function fx(t){ return 2*t; } function fy(t){ return 4*t - t*t; } function dy(t){ return 4 - 2*t; }
  return { fx:fx, fy:fy, a:0, b:4, run:24,
    world:{x0:-0.9, x1:10.5, y0:-10.2, y1:5.3}, aspect:15.5/11.4,
    chk:[{f:fx, df:function(){ return 2; }, at:[0.5, 2, 3.5]}, {f:fy, df:dy, at:[0.5, 2, 3.5]}, {f:dy, df:function(){ return -2; }, at:[0.5, 2, 3.5]}],
    axes:{x:[-0.6, 10.2], y:[-4.2, 5.0], tx:[2, 4, 6, 8], ty:[-4, -2, 2, 4]},
    aria:'Un punto recorre el arco de parábola r de t igual a 2t, 4t menos t al cuadrado, desde el origen hasta el punto 8, 0. Desde el punto salen dos flechas. La burdeo es la velocidad, v de t igual a 2, 4 menos 2t: va cambiando, primero apunta hacia arriba, en la cima queda horizontal y luego apunta hacia abajo. La verde es la aceleración, a de t igual a 0, menos 2: no cambia nunca, apunta siempre hacia abajo con el mismo largo.',
    labels:[['F', '\\vec a(t)=\\vec v\\,\'(t)=\\vec r\\,\'\'(t)=\\big\\langle 0,\;-2\\big\\rangle', 'a(t) = v′(t) = r″(t) = ⟨0, −2⟩', 'diff']],
    legend:'<span><i class="sw sec"></i> trayectoria \\(\\vec r(t)=\\langle 2t,\\,4t-t^{2}\\rangle\\)</span><span><i class="sw tan"></i> velocidad \\(\\vec v(t)=\\vec r\\,\'(t)\\)</span><span><i class="sw alt"></i> aceleración \\(\\vec a(t)=\\vec r\\,\'\'(t)\\)</span>',
    bar:{x0:-0.5, x1:10.1, y:-5.1, la:'0', lb:'4'}, textAt:[-0.7, -6.5], labAt:[-0.7, -9.5],
    arrows:function(t){ var x = fx(t), y = fy(t); return [[x, y, x + 2, y + dy(t), 'tan', 'v(t)', [8, dy(t) >= 0 ? -8 : 10]], [x, y, x, y - 2, 'alt', 'a(t)', [-9, 6]]]; },
    lines:function(t){ return [['t = ' + dec(t, 2), 'ink'], ['v(t) = r′(t) = ⟨2, 4 − 2t⟩ = ⟨2; ' + dec(dy(t), 2) + '⟩', 'tan'], ['a(t) = r″(t) = ⟨0, −2⟩', 'alt'], ['rapidez |v(t)| = ' + dec(Math.sqrt(4 + dy(t)*dy(t)), 2), 'ink']]; },
    caption:function(t, ini, fin){ if (ini) return 'El punto parte del origen con velocidad ⟨2, 4⟩ (flecha burdeo). La flecha verde es la aceleración: la derivada de la velocidad, es decir, la segunda derivada de la posición'; if (fin) return 'La velocidad cambió en todo el recorrido; la aceleración, no: fue siempre ⟨0, −2⟩. La aceleración es la que dobla la trayectoria hacia abajo'; return 'En t = ' + dec(t, 2) + ' la velocidad es ⟨2; ' + dec(dy(t), 2) + '⟩ y la aceleración sigue siendo ⟨0, −2⟩: en cada unidad de tiempo le resta 2 a la segunda componente de la velocidad'; },
    readout:function(t){ return [['', '\\vec r(t)=\\big\\langle 2t,\;4t-t^{2}\\big\\rangle\\ \\Longrightarrow\\ \\vec v(t)=\\vec r\\,\'(t)=\\big\\langle 2,\;4-2t\\big\\rangle'], ['d', '\\vec a(t)=\\vec v\\,\'(t)=\\big\\langle 0,\;-2\\big\\rangle'], ['', 't=' + num(t, 2) + ':\\quad\\vec v=\\big\\langle 2;\\ ' + num(dy(t), 2) + '\\big\\rangle,\\quad\\vec a=\\big\\langle 0;\\ -2\\big\\rangle']]; }
  };
})()));
