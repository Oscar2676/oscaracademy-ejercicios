OA.scene('bn-fraccion', (function(){
  var CF = [1, 0.5, -0.125, 0.0625, -0.0390625, 0.02734375], dec = oaDec;
  function P(m, x){ var s = 0, k; for (k = 0; k < m; k++) s += CF[k]*Math.pow(x, k); return s; }
  function f(x){ return Math.sqrt(1 + x); }
  return {
    world:{x0:-1.6, x1:2.1, y0:-1.75, y1:2.0}, aspect:3.75/3.7,
    _chk:[{f:f, df:function(x){ return 0.5/Math.sqrt(1 + x); }, at:[-0.5, 0.3, 1.2]}],
    aria:'La gráfica de la raíz cuadrada de 1 más x, en azul, y la gráfica del polinomio que se obtiene al sumar los primeros términos de su desarrollo binomial, en naranja. Con más términos, el polinomio se pega cada vez más a la curva azul entre x igual a menos 1 y x igual a 1. Fuera de esa franja, marcada con dos rectas punteadas, el polinomio se separa de la curva.',
    labels:[['F', '(1+x)^{1/2}=1+\\dfrac{1}{2}x-\\dfrac{1}{8}x^{2}+\\dfrac{1}{16}x^{3}-\\cdots\\quad(|x|<1)', '(1 + x)^(1/2) = 1 + x/2 − x²/8 + x³/16 − …, si |x| < 1', 'diff']],
    sliders:[{id:'m', tex:'\\text{términos}', min:1, max:6, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> \\(y=\\sqrt{1+x}\\)</span><span><i class="sw rise"></i> suma de los primeros términos del desarrollo</span>',
    anim:{run:21000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.m = Math.min(6, 1 + Math.floor(p*6.6)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var m = Math.round(v.m || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x0, y0, i, t = ['1', '+ x/2', '− x²/8', '+ x³/16', '− 5x⁴/128', '+ 7x⁵/256'];
      function num(tx, px, py, al){ c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = al; c.textBaseline = 'middle'; c.fillText(tx, px, py); }
      S.line(-1.5, 0, 2.0, 0, {color:C.ink, width:1.1}); S.line(0, -0.25, 0, 1.9, {color:C.ink, width:1.1});
      [-1, 1, 2].forEach(function(q){ num(('' + q).replace('-', '−'), X(q), Y(0) + 11, 'center'); }); num('1', X(0) - 7, Y(1), 'right');
      c.strokeStyle = C.tan; c.lineWidth = 1; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(X(-1), Y(-0.2)); c.lineTo(X(-1), Y(1.9)); c.moveTo(X(1), Y(-0.2)); c.lineTo(X(1), Y(1.9)); c.stroke(); c.setLineDash([]);
      txt('|x| < 1', X(0.5), Y(1.85), 'center', C.tan);
      c.save(); c.beginPath(); c.rect(X(-1.5), Y(1.95), X(2.0) - X(-1.5), Y(-0.25) - Y(1.95)); c.clip();
      oaPar(S, function(u){ return u; }, function(u){ return P(m, u); }, -1.45, 2.0, C.rise, 1.6);
      oaPar(S, function(u){ return u; }, f, -1, 2.0, C.sec, 2);
      c.restore();
      x0 = X(-1.5); y0 = Y(-0.55);
      txt('suma: ' + t.slice(0, m).join(' '), x0, y0, 'left', C.rise);
      txt('en x = 0,5:  suma = ' + dec(P(m, 0.5), 5) + '   y   √1,5 = ' + dec(f(0.5), 5), x0, y0 + 21, 'left', C.ink);
      txt('en x = 1,8 (fuera):  suma = ' + dec(P(m, 1.8), 3) + '   y   √2,8 = ' + dec(f(1.8), 3), x0, y0 + 42, 'left', C.tan);
      S.lab('F', x0, y0 + 72, 0, 0, m >= 4);
    },
    caption:function(v){ var m = Math.round(v.m || 1); return m === 1 ? 'Con un solo término el «desarrollo» es la recta y = 1: toca a la curva azul solo en x = 0' : 'Con ' + m + ' términos, el polinomio naranja sigue a la raíz cada vez mejor dentro de la franja |x| < 1. Fuera de ella, agregar términos no ayuda: se aleja'; },
    readout:function(v){ var m = Math.round(v.m || 1); return [['', '\\dbinom{1/2}{k}=\\dfrac{\\frac{1}{2}\\left(\\frac{1}{2}-1\\right)\\left(\\frac{1}{2}-2\\right)\\cdots\\left(\\frac{1}{2}-k+1\\right)}{k!}'], ['d', '\\dbinom{1/2}{0}=1,\\ \\dbinom{1/2}{1}=\\dfrac{1}{2},\\ \\dbinom{1/2}{2}=-\\dfrac{1}{8},\\ \\dbinom{1/2}{3}=\\dfrac{1}{16},\\ \\dbinom{1/2}{4}=-\\dfrac{5}{128},\\ \\dbinom{1/2}{5}=\\dfrac{7}{256}']]; }
  };
})());
