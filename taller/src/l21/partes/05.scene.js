OA.scene('acu-interpretar', (function(){
  var P = [[0, 2], [2, 2], [4, -2], [6, -2], [8, 2]];
  function f(x){ for (var i = 0; i < P.length - 1; i++) if (x <= P[i + 1][0]) return P[i][1] + (P[i + 1][1] - P[i][1])*(x - P[i][0])/(P[i + 1][0] - P[i][0]); return 2; }
  function g(x){ var a = 0, i, xa, xb; for (i = 0; i < P.length - 1; i++){ xa = P[i][0]; xb = Math.min(x, P[i + 1][0]); if (xb <= xa) break; a += (f(xa) + f(xb))/2*(xb - xa); } return a; }
  return oaAcu({
    x0:0, x1:8, fr:[-2.6, 2.6], gr:[-1.6, 5.6], fy:[-2, 2], gy:[-1, 2, 4, 5], gx:[1, 2, 3, 4, 5, 6, 7, 8],
    f:f, g:g, chk:[1, 2.5, 3.5, 5, 6.5, 7.5],
    fn:'gráfica de f', gn:'g(x) = ∫₀ˣ f(t) dt',
    stops:[{x:3, up:true, txt:'máximo: g(3) = 5', cap:'En x = 3, f pasa de positiva a negativa: g deja de crecer y empieza a decrecer. Máximo relativo, g(3) = 5'}, {x:7, up:false, txt:'mínimo: g(7) = −1', cap:'En x = 7, f pasa de negativa a positiva: g deja de decrecer y empieza a crecer. Mínimo relativo, g(7) = −1'}],
    aria:'Dos gráficas, una sobre otra. Arriba, una función f hecha de trazos rectos: vale 2 entre 0 y 2, baja hasta menos 2 en x igual a 4, se mantiene en menos 2 hasta x igual a 6 y sube hasta 2 en x igual a 8. Abajo, su función de acumulación g, que sube hasta 5 en x igual a 3, baja hasta menos 1 en x igual a 7 y vuelve a 0 en x igual a 8.',
    Ftex:'g\'(x)=f(x)\\qquad g\'\'(x)=f\'(x)', Ftxt:'g′(x) = f(x); g″(x) = f′(x)',
    cap0:'Arriba: la gráfica de f, hecha de trazos rectos. Abajo: g(x), el área con signo desde 0 hasta x. No hay fórmula de g: todo se lee en la gráfica de f',
    readout:function(x, num){ var m = f(x); return [['', 'g\'(x)=f(x)'], ['d', 'x=' + num(x, 2) + ':\\quad f(x)=' + num(m, 2) + (Math.abs(m) < 0.005 ? '' : m > 0 ? '>0' : '<0')], ['', Math.abs(m) < 0.005 ? 'g\\text{ tiene tangente horizontal}' : m > 0 ? 'g\\text{ crece}' : 'g\\text{ decrece}']]; }
  });
})());
