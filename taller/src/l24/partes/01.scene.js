OA.scene('bn-cuadrado', (function(){
  var dec = oaDec, num = OA.num;
  return {
    world:{x0:-1.0, x1:5.8, y0:-3.9, y1:5.2}, aspect:9.1/6.8,
    aria:'Un cuadrado de lado a más b. Dos líneas lo cortan en cuatro piezas, que se separan un poco: un cuadrado azul de lado a, un cuadrado burdeo de lado b y dos rectángulos naranjas iguales de lados a y b. El área del cuadrado grande, a más b al cuadrado, es la suma de las cuatro: a al cuadrado, más dos veces a por b, más b al cuadrado.',
    labels:[['F', '(a+b)^{2}=a^{2}+2ab+b^{2}', '(a + b)² = a² + 2ab + b²', 'diff']],
    sliders:[{id:'a', tex:'a', min:1, max:2.6, step:0.1, value:2.2}, {id:'b', tex:'b', min:0.6, max:1.6, step:0.1, value:1.2}],
    legend:'<span><i class="sw sec"></i> cuadrado de lado \\(a\\): área \\(a^{2}\\)</span><span><i class="sw rise"></i> dos rectángulos de lados \\(a\\) y \\(b\\): área \\(ab\\) cada uno</span><span><i class="sw tan"></i> cuadrado de lado \\(b\\): área \\(b^{2}\\)</span>',
    anim:{run:16000, hold:6000, still:1, apply:function(p, v){ v.q = p; v.e = Math.max(0, Math.min(1, (p - 0.2)/0.3))*0.3; v.st = p < 0.2 ? 1 : p < 0.6 ? 2 : 3; }},
    onInput:function(v){ v.q = null; v.e = 0.3; v.st = 3; },
    draw:function(S, v){
      var a = v.a, b = v.b, e = v.e == null ? 0.3 : v.e, st = v.st || 3, C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), x0, y0;
      function rect(x, y, w, h, col, t){ S.poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], {fill:col, alpha:0.55}); c.strokeStyle = col; c.lineWidth = 1.4; c.strokeRect(X(x), Y(y + h), X(x + w) - X(x), Y(y) - Y(y + h)); if (st >= 2) txt(t, X(x + w/2), Y(y + h/2), 'center', C.ink); }
      rect(0, 0, a, a, C.sec, 'a²'); rect(a + e, 0, b, a, C.rise, 'ab'); rect(0, a + e, a, b, C.rise, 'ab'); rect(a + e, a + e, b, b, C.tan, 'b²');
      bnCota(S, 0, 0, a, 0, 'a', C.sec, 0, 12); bnCota(S, a + e, 0, a + e + b, 0, 'b', C.tan, 0, 12);
      bnCota(S, 0, 0, 0, a, 'a', C.sec, -12, 0); bnCota(S, 0, a + e, 0, a + e + b, 'b', C.tan, -12, 0);
      x0 = X(-0.9); y0 = Y(-1.25);
      txt('(a + b)² = área del cuadrado de lado a + b', x0, y0, 'left', C.ink);
      if (st >= 2) txt('= a² + ab + ab + b²   (las cuatro piezas)', x0, y0 + 21, 'left', C.ink);
      if (st >= 3){ txt('= a² + 2ab + b²', x0, y0 + 42, 'left', C.tan); txt('con a = ' + dec(a, 1) + ' y b = ' + dec(b, 1) + ': ' + dec(a + b, 1) + '² = ' + dec(a*a, 2) + ' + 2 · ' + dec(a*b, 2) + ' + ' + dec(b*b, 2) + ' = ' + dec((a + b)*(a + b), 2), x0, y0 + 63, 'left', C.ink); }
      S.lab('F', x0, y0 + 88, 0, 0, st >= 3 && v.q != null && v.q > 0.8);
    },
    caption:function(v){ var st = v.st || 3; return st === 1 ? 'Un cuadrado de lado a + b. Su área es (a + b)²' : st === 2 ? 'Se corta donde termina a y empieza b, a lo ancho y a lo alto. Quedan cuatro piezas: un cuadrado a², un cuadrado b² y dos rectángulos iguales, ab' : 'El área del cuadrado grande es la suma de las cuatro piezas: a² + 2ab + b². El 2 aparece porque hay dos rectángulos ab. Mueve a y b: la igualdad se cumple siempre'; },
    readout:function(v){ var a = v.a, b = v.b; return [['', '(a+b)^{2}=(a+b)(a+b)=a^{2}+ab+ba+b^{2}'], ['d', '(a+b)^{2}=a^{2}+2ab+b^{2}'], ['', 'a=' + num(a, 1) + ',\\ b=' + num(b, 1) + ':\\quad ' + num(a + b, 1) + '^{2}=' + num(a*a, 2) + '+2\\cdot ' + num(a*b, 2) + '+' + num(b*b, 2) + '=' + num((a + b)*(a + b), 2)]]; }
  };
})());
