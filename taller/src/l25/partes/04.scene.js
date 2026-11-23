/* L25 H04 · de la sucesión (lista) a la serie (suma): cada término se agrega a la barra; nada se borra (leyes de Óscar) */
OA.scene('ss-serie', (function(){
  var N = 6, i, PZ = [], P2 = [0, 2, 4, 8, 16, 32, 64];
  function a(k){ return Math.pow(0.5, k); }
  function fr(k){ return '\\dfrac{1}{' + P2[k] + '}'; } function ft(k){ return '1/' + P2[k]; }
  for (i = 1; i <= N; i++) PZ.push(['T' + i, fr(i) + (i < N ? ',' : ',\\ \\ldots'), ft(i) + (i < N ? ',' : ', …'), 'c-sec']);
  for (i = 1; i <= N; i++) PZ.push(['B' + i, '\\tfrac{1}{' + P2[i] + '}', ft(i), i <= 3 ? '' : 'diff']);
  PZ.push(['R1', 'S_{1}=a_{1}=\\tfrac{1}{2}', 'S₁ = a₁ = 1/2', '']);
  for (i = 2; i <= N; i++) PZ.push(['R' + i, 'S_{' + i + '}=S_{' + (i - 1) + '}+a_{' + i + '}=\\tfrac{' + (P2[i - 1] - 1) + '}{' + P2[i - 1] + '}+\\tfrac{1}{' + P2[i] + '}=\\tfrac{' + (P2[i] - 1) + '}{' + P2[i] + '}', 'S' + ssSub(i) + ' = S' + ssSub(i - 1) + ' + a' + ssSub(i) + ' = ' + (P2[i - 1] - 1) + '/' + P2[i - 1] + ' + 1/' + P2[i] + ' = ' + (P2[i] - 1) + '/' + P2[i], '']);
  var CX = [0, 0, 0, 0, 8.2, 9.3, 10.2];
  return {
    world:{x0:-0.6, x1:10.6, y0:-10.4, y1:5.3}, aspect:15.7/11.2,
    aria:'Arriba, la sucesión: los términos un medio, un cuarto, un octavo, un dieciseisavo, un treintaidosavo y un sesentaicuatroavo, escritos como fracciones en una lista separada por comas; aparecen uno por paso y no se borran. Al medio, la serie: una barra de largo 1 en la que cada término agrega un trozo de su tamaño, rotulado con su fracción; los trozos más chicos llevan su fracción debajo, unida con una línea. La parte pintada es la suma parcial. Abajo, un registro numerado guarda la suma parcial de cada paso, una bajo la otra: un medio, tres cuartos, siete octavos, quince dieciseisavos, treinta y uno treintaidosavos y sesenta y tres sesentaicuatroavos.',
    labels:PZ,
    sliders:[{id:'n', tex:'n', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> sucesión: la lista de términos</span><span><i class="sw rise"></i> el término que se suma ahora</span><span><i class="sw tan"></i> serie: lo ya sumado, la suma parcial \\(S_{n}\\)</span>',
    anim:{run:24000, hold:3000, still:1, apply:function(p, v){ v.q = p; v.n = Math.min(N, 1 + Math.floor(p*N)); }},
    onInput:function(v){ v.q = null; },
    draw:function(S, v){
      var n = Math.round(v.n || 1), C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), T = dtEtq(S, PZ), L = T.L, k, x = 0, w, xc;
      txt('la sucesión: una lista de términos', X(-0.5), Y(3.25), 'left', C.sec);
      for (k = 1; k <= n; k++) L('T' + k, 0.55 + 1.62*(k - 1), 2.25, -50);
      txt('la serie: la suma de esa lista', X(-0.5), Y(1.05), 'left', C.tan);
      c.strokeStyle = C.ink; c.lineWidth = 1.2; c.setLineDash([]); c.strokeRect(X(0), Y(0.3), X(10) - X(0), Y(-0.6) - Y(0.3));
      for (k = 1; k <= n; k++){ w = 10*a(k); xc = x + w/2;
        S.poly([[x, -0.6], [x + w, -0.6], [x + w, 0.3], [x, 0.3]], {fill:k === n ? C.rise : C.tan, alpha:k === n ? 0.8 : 0.4});
        c.strokeStyle = '#fff'; c.lineWidth = 1; c.beginPath(); c.moveTo(X(x + w), Y(0.3)); c.lineTo(X(x + w), Y(-0.6)); c.stroke();
        if (k <= 3) L('B' + k, xc, -0.15, -50);
        else { c.strokeStyle = C.rise; c.lineWidth = 1; c.beginPath(); c.moveTo(X(xc), Y(-0.6)); c.lineTo(X(CX[k]), Y(-1.15)); c.stroke(); L('B' + k, CX[k], -1.6, -50); }
        x += w; }
      c.font = '600 11px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = C.muted || '#6b6b6b'; c.textBaseline = 'middle'; c.textAlign = 'right'; c.fillText('0', X(0) - 5, Y(-0.15)); c.textAlign = 'left'; c.fillText('1', X(10) + 4, Y(-0.15));
      c.textAlign = 'right'; c.fillText('paso ' + n + ' de ' + N, X(10.5), Y(3.25));
      dtQue(S, 'la sucesión es la lista de términos;', 'la serie es la suma de esa lista.');
      T.fin();
      oaReg(S, n, N, -0.5, -3.2, [6, 38, 70, 102, 134, 166]);
    },
    caption:function(v){ var n = Math.round(v.n || 1); return n < N ? 'Paso ' + n + '. La sucesión es la lista 1/2, 1/4, 1/8, … La serie es otra cosa: es sumar esos términos. Con ' + n + (n > 1 ? ' términos' : ' término') + ' sumados, la suma parcial vale ' + (P2[n] - 1) + '/' + P2[n] : 'Paso 6. Cada término llena la mitad de lo que faltaba. Las sumas parciales 1/2, 3/4, 7/8, … forman, a su vez, otra sucesión'; },
    readout:function(v){ var n = Math.round(v.n || 1), R = [], k, Q = '\\\\&\\qquad ';
      R.push('a_{1}=\\dfrac{1}{2^{1}}=\\dfrac{1}{2}' + Q + 'S_{1}=a_{1}=\\dfrac{1}{2}' + Q + '\\text{falta para }1:\\ \\ 1-\\dfrac{1}{2}=\\dfrac{1}{2}');
      for (k = 2; k <= n; k++) R.push('a_{' + k + '}=\\dfrac{1}{2^{' + k + '}}=\\dfrac{1}{' + P2[k] + '}' + Q + 'S_{' + k + '}=S_{' + (k - 1) + '}+a_{' + k + '}=\\dfrac{' + (P2[k - 1] - 1) + '}{' + P2[k - 1] + '}+\\dfrac{1}{' + P2[k] + '}' + Q + '\\phantom{S_{' + k + '}}=\\dfrac{' + 2*(P2[k - 1] - 1) + '}{' + P2[k] + '}+\\dfrac{1}{' + P2[k] + '}=\\dfrac{' + (P2[k] - 1) + '}{' + P2[k] + '}' + Q + '\\text{falta para }1:\\ \\ 1-\\dfrac{' + (P2[k] - 1) + '}{' + P2[k] + '}=\\dfrac{1}{' + P2[k] + '}');
      return dtPasos(R); }
  };
})());
