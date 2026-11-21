OA.scene('vec-segunda', oaMov((function(){
  var dec = oaDec, num = OA.num, OX = 0, OY = -5.0, T = 1.2;
  function fx(t){ return t*t; } function fy(t){ return t*t*t/3; } function dx(t){ return 2*t; } function dy(t){ return t*t; }
  return { fx:fx, fy:fy, a:-T, b:T, run:24,
    world:{x0:-2.7, x1:4.7, y0:-9.6, y1:2.5}, aspect:12.1/7.4,
    chk:[{f:fx, df:dx, at:[-1, 0.3, 1.1]}, {f:fy, df:dy, at:[-1, 0.3, 1.1]}, {f:dx, df:function(){ return 2; }, at:[-1, 0.3, 1.1]}, {f:dy, df:function(t){ return 2*t; }, at:[-1, 0.3, 1.1]}],
    axes:{x:[-2.5, 4.4], y:[-0.8, 2.2], tx:[1, 2, 3], ty:[1, 2]},
    aria:'Arriba, un punto recorre la curva r de t igual a t al cuadrado, t al cubo sobre 3. Desde el punto sale una flecha burdeo: la primera derivada, r prima de t igual a 2t, t al cuadrado. Abajo, la misma flecha burdeo se dibuja saliendo siempre de un mismo punto fijo; al avanzar t, su punta recorre una curva. Desde esa punta sale una flecha verde, la segunda derivada r segunda de t igual a 2, 2t, que indica hacia dónde y con qué rapidez está cambiando la flecha burdeo.',
    labels:[['F', '\\vec r\\,\'\'(t)=\\dfrac{d}{dt}\\,\\vec r\\,\'(t)=\\big\\langle 2,\;2t\\big\\rangle', 'r″(t) = ⟨2, 2t⟩', 'diff']],
    legend:'<span><i class="sw sec"></i> curva \\(\\vec r(t)=\\langle t^{2},\\,t^{3}/3\\rangle\\)</span><span><i class="sw tan"></i> primera derivada \\(\\vec r\\,\'(t)\\)</span><span><i class="sw alt"></i> segunda derivada \\(\\vec r\\,\'\'(t)\\): cómo cambia \\(\\vec r\\,\'\\)</span>',
    bar:{x0:-2.5, x1:4.5, y:-6.5, la:'−1,2', lb:'1,2'}, textAt:[-2.6, -7.4], labAt:[-2.6, -9.1],
    before:function(S, t, H){ var c = S.ctx, C = S.C, i, u;
      H.txt('arriba: la curva y su derivada r′(t)', S.X(-2.6), S.Y(2.3), 'left', C.ink); H.txt('abajo: la flecha r′(t) dibujada desde un punto fijo', S.X(-2.6), S.Y(-1.25), 'left', C.ink);
      c.strokeStyle = C.grid; c.lineWidth = 1; c.beginPath(); c.moveTo(S.X(-2.5), S.Y(OY)); c.lineTo(S.X(4.5), S.Y(OY)); c.moveTo(S.X(OX), S.Y(OY - 0.9)); c.lineTo(S.X(OX), S.Y(OY + 3.3)); c.stroke();
      c.strokeStyle = 'rgba(139,29,45,0.3)'; c.lineWidth = 1.2; c.beginPath(); for (i = 0; i <= 60; i++){ u = -T + 2*T*i/60; if (i) c.lineTo(S.X(OX + dx(u)), S.Y(OY + dy(u))); else c.moveTo(S.X(OX + dx(u)), S.Y(OY + dy(u))); } c.stroke();
      H.dot(OX, OY, C.ink, 2.6); },
    arrows:function(t){ var x = fx(t), y = fy(t), vx = dx(t), vy = dy(t); return [[x, y, x + vx, y + vy, 'tan', 'r′(t)', [vx >= 0 ? 8 : -8, -10]], [OX, OY, OX + vx, OY + vy, 'tan', 'r′(t)', [vx >= 0 ? -14 : 14, 16]], [OX + vx, OY + vy, OX + vx + 2, OY + vy + 2*t, 'alt', 'r″(t)', [8, t >= 0 ? -8 : 10]]]; },
    lines:function(t){ return [['t = ' + dec(t, 2), 'ink'], ['r′(t) = ⟨2t, t²⟩ = ⟨' + dec(dx(t), 2) + '; ' + dec(dy(t), 2) + '⟩', 'tan'], ['r″(t) = ⟨2, 2t⟩ = ⟨2; ' + dec(2*t, 2) + '⟩', 'alt'], ['r″ dice cómo está cambiando la flecha r′', 'ink']]; },
    caption:function(t, ini, fin){ if (ini) return 'Arriba, la curva con su primera derivada r′(t) en el punto. Abajo, esa misma flecha burdeo dibujada desde un punto fijo, para ver cómo cambia. La flecha verde, r″(t), sale de su punta'; if (fin) return 'La punta de r′(t) recorrió su propia curva, y r″(t) fue siempre tangente a ella: r″ es a r′ lo mismo que r′ es a r'; return 'En t = ' + dec(t, 2) + ': r′ = ⟨' + dec(dx(t), 2) + '; ' + dec(dy(t), 2) + '⟩ y r″ = ⟨2; ' + dec(2*t, 2) + '⟩. La flecha verde muestra hacia dónde se está moviendo la punta de la burdeo'; },
    readout:function(t){ return [['', '\\vec r(t)=\\left\\langle t^{2},\;\\dfrac{t^{3}}{3}\\right\\rangle\\ \\Longrightarrow\\ \\vec r\\,\'(t)=\\big\\langle 2t,\;t^{2}\\big\\rangle'], ['d', '\\vec r\\,\'\'(t)=\\left\\langle\\dfrac{d}{dt}(2t),\;\\dfrac{d}{dt}\\left(t^{2}\\right)\\right\\rangle=\\big\\langle 2,\;2t\\big\\rangle'], ['', 't=' + num(t, 2) + ':\\quad\\vec r\\,\'\'(t)=\\big\\langle 2;\\ ' + num(2*t, 2) + '\\big\\rangle']]; }
  };
})()));
