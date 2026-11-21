OA.scene('vec-trig', oaMov((function(){
  var dec = oaDec, num = OA.num, PI = Math.PI;
  function fx(t){ return 2*Math.cos(t); } function fy(t){ return 2*Math.sin(t); } function dx(t){ return -2*Math.sin(t); } function dy(t){ return 2*Math.cos(t); }
  return { fx:fx, fy:fy, a:0, b:2*PI, run:26,
    world:{x0:-3.6, x1:3.6, y0:-6.7, y1:3.3}, aspect:10/7.2,
    chk:[{f:fx, df:dx, at:[0.4, 1.9, 4.1]}, {f:fy, df:dy, at:[0.4, 1.9, 4.1]}],
    axes:{x:[-3.4, 3.4], y:[-3.0, 3.1], tx:[-2, 2], ty:[-2, 2]},
    aria:'Un punto recorre la circunferencia de radio 2 con posición r de t igual a 2 coseno de t, 2 seno de t. Una flecha naranja va del origen al punto: es r de t, y un arco pequeño marca el ángulo t. Desde el punto sale una flecha burdeo, r prima de t igual a menos 2 seno de t, 2 coseno de t, tangente a la circunferencia y perpendicular a la flecha naranja en todo momento. Una barra bajo el dibujo muestra el avance del parámetro t de 0 a 2 pi.',
    labels:[['F', '\\vec r\\,\'(t)=\\big\\langle -2\\operatorname{sen}t,\;2\\cos t\\big\\rangle', 'r′(t) = ⟨−2 sen t, 2 cos t⟩', 'tan']],
    legend:'<span><i class="sw rise"></i> posición \\(\\vec r(t)=\\langle 2\\cos t,\\,2\\operatorname{sen}t\\rangle\\)</span><span><i class="sw tan"></i> derivada \\(\\vec r\\,\'(t)\\), tangente</span><span><i class="sw sec"></i> camino recorrido</span>',
    bar:{x0:-3.3, x1:3.3, y:-3.6, la:'0', lb:'2π'}, textAt:[-3.45, -4.5], labAt:[-3.45, -6.2],
    before:function(S, t, H){ var c = S.ctx; if (t > 0.05){ c.strokeStyle = S.C.rise; c.lineWidth = 1.2; c.beginPath(); c.arc(S.X(0), S.Y(0), 15, 0, -t, true); c.stroke(); H.txt('t', S.X(0) + 25*Math.cos(t/2), S.Y(0) - 25*Math.sin(t/2), 'center', S.C.rise); } },
    arrows:function(t){ var x = fx(t), y = fy(t); return [[0, 0, x, y, 'rise', 'r(t)', [x >= 0 ? -12 : 12, y >= 0 ? 16 : -16]], [x, y, x + dx(t), y + dy(t), 'tan', 'r′(t)', [dx(t) >= 0 ? 8 : -8, dy(t) >= 0 ? -10 : 10]]]; },
    lines:function(t){ return [['t = ' + dec(t, 2) + ' rad', 'ink'], ['r(t) = ⟨2 cos t, 2 sen t⟩ = ⟨' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + '⟩', 'rise'], ['r′(t) = ⟨−2 sen t, 2 cos t⟩ = ⟨' + dec(dx(t), 2) + '; ' + dec(dy(t), 2) + '⟩', 'tan'], ['r · r′ = −4 cos t sen t + 4 sen t cos t = 0', 'ink']]; },
    caption:function(t, ini, fin){ if (ini) return 'El punto parte en (2, 0). La flecha naranja es su posición, r(t). La burdeo es la derivada, r′(t): se obtiene derivando el coseno y el seno, componente a componente'; if (fin) return 'El punto dio la vuelta completa. En todo momento r′(t) fue tangente a la circunferencia y perpendicular a r(t): su producto punto vale 0'; return 'En t = ' + dec(t, 2) + ' el punto está en ⟨' + dec(fx(t), 2) + '; ' + dec(fy(t), 2) + '⟩ y su derivada es ⟨' + dec(dx(t), 2) + '; ' + dec(dy(t), 2) + '⟩, tangente a la circunferencia'; },
    readout:function(t){ return [['', '\\dfrac{d}{dt}\\big(2\\cos t\\big)=-2\\operatorname{sen}t\\qquad\\dfrac{d}{dt}\\big(2\\operatorname{sen}t\\big)=2\\cos t'], ['d', '\\vec r\\,\'(t)=\\big\\langle -2\\operatorname{sen}t,\;2\\cos t\\big\\rangle'], ['', 't=' + num(t, 2) + ':\\quad\\vec r\\,\'(t)=\\big\\langle ' + num(dx(t), 2) + ';\\ ' + num(dy(t), 2) + '\\big\\rangle']]; }
  };
})()));
