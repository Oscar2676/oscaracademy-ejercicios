OA.scene('ss-serie', (function(){
  var N = 6, dec = oaDec;
  function a(k){ return Math.pow(0.5, k); } function Sn(n){ return 1 - Math.pow(0.5, n); }
  function fr(k){ return '1/' + Math.pow(2, k); }
  return {
    world:{x0:-0.6, x1:10.6, y0:-5.6, y1:3.4}, aspect:9.0/11.2,
    aria:'Arriba, la sucesión: los términos un medio, un cuarto, un octavo y los siguientes, escritos como una lista separada por comas. Abajo, la serie: una barra de largo 1 en la que se van poniendo trozos de largo un medio, un cuarto, un octavo, uno tras otro. La parte pintada es la suma parcial. Con cada término la barra se llena más, y lo que falta para llegar a 1 se reduce a la mitad.',
    labels:[['F', 'S_{n}=\\displaystyle\\sum_{k=1}^{n}\\dfrac{1}{2^{k}}=1-\\dfrac{1}{2^{n}}', 'Sₙ = 1/2 + 1/4 + … + 1/2ⁿ = 1 − 1/2ⁿ', 'diff']],
    sliders:[{id:'n', tex:'n', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> sucesión: la lista de términos</span><span><i class="sw rise"></i> el término que se suma ahora</span><span><i class="sw tan"></i> serie: la suma de los términos</span>',
    anim:{run:20000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(N, 1 + Math.floor(p*(N + 1.4))); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = Math.round(v.n || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), k, x = 0, x0, y0, L = [];
      function big(t, px, py, col, b){ c.font = (b ? '700 ' : '600 ') + '13px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = col; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, px, py); }
      txt('la sucesión: una lista', X(-0.5), Y(3.0), 'left', C.sec);
      for (k = 1; k <= N; k++){ big(fr(k) + (k < N ? ',' : ', …'), X(0.6 + 1.6*(k - 1)), Y(2.2), k === n ? C.rise : k < n ? C.sec : (C.muted || '#9a9a9a'), k === n); }
      txt('la serie: la suma de esa lista', X(-0.5), Y(1.0), 'left', C.tan);
      c.strokeStyle = C.ink; c.lineWidth = 1.2; c.strokeRect(X(0), Y(0.2), X(10) - X(0), Y(-0.6) - Y(0.2));
      for (k = 1; k <= n; k++){ S.poly([[x, -0.6], [x + 10*a(k), -0.6], [x + 10*a(k), 0.2], [x, 0.2]], {fill:k === n ? C.rise : C.tan, alpha:k === n ? 0.8 : 0.45}); c.strokeStyle = '#fff'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x + 10*a(k)), Y(0.2)); c.lineTo(X(x + 10*a(k)), Y(-0.6)); c.stroke(); if (10*a(k) > 0.9) big(fr(k), X(x + 5*a(k)), Y(-0.2), C.ink, false); x += 10*a(k); L.push(fr(k)); }
      c.font = '500 10.5px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textAlign = 'center'; c.fillText('0', X(0), Y(-0.6) + 12); c.fillText('1', X(10), Y(-0.6) + 12);
      x0 = X(-0.5); y0 = Y(-1.75);
      txt('término ' + n + ' de la sucesión:  a' + ssSub(n) + ' = ' + fr(n) + ' = ' + dec(a(n), Math.min(6, n)), x0, y0, 'left', C.rise);
      txt('suma parcial:  S' + ssSub(n) + ' = ' + L.join(' + '), x0, y0 + 21, 'left', C.tan);
      txt('S' + ssSub(n) + ' = 1 − ' + fr(n) + ' = ' + dec(Sn(n), Math.min(6, n)), x0, y0 + 42, 'left', C.tan);
      txt('falta para llegar a 1:  ' + fr(n), x0, y0 + 63, 'left', C.ink);
      S.lab('F', x0, y0 + 92, 0, 0, n >= N && v.q != null);
    },
    caption:function(v){ var n = Math.round(v.n || 1); return n < N ? 'La sucesión es la lista 1/2, 1/4, 1/8, … La serie es otra cosa: es sumar esos términos. Con ' + n + (n > 1 ? ' términos' : ' término') + ' sumados, la suma parcial vale ' + dec(Sn(n), Math.min(6, n)) : 'Cada término llena la mitad de lo que faltaba. Las sumas parciales 1/2, 3/4, 7/8, … forman, a su vez, una nueva sucesión, que se acerca a 1'; },
    readout:function(v){ var n = Math.round(v.n || 1); return [['', '\\text{sucesión: }a_{k}=\\dfrac{1}{2^{k}}\\qquad\\text{serie: }\\displaystyle\\sum_{k=1}^{\\infty}\\dfrac{1}{2^{k}}'], ['d', 'S_{' + n + '}=\\displaystyle\\sum_{k=1}^{' + n + '}\\dfrac{1}{2^{k}}=1-\\dfrac{1}{' + Math.pow(2, n) + '}=\\dfrac{' + (Math.pow(2, n) - 1) + '}{' + Math.pow(2, n) + '}']]; }
  };
})());
