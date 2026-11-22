/* La esfera, armada con discos, en seis pasos. Dibujo propio; rótulos algebraicos como etiquetas TeX; transiciones continuas. */
OA.scene('apl-esfera-discos', (function(){
  var N = 6, RR = 2, XC = 0.9, E = 0.24, FNT = '"Source Sans 3", system-ui, sans-serif';
  function Rd(x){ return Math.sqrt(Math.max(0, RR*RR - x*x)); }
  function suave(w){ w = Math.max(0, Math.min(1, w)); return w*w*(3 - 2*w); }
  var PZ = [['Q', 'V=\\ ?', 'V = ?', 'pt'], ['F', 'V=\\dfrac{4}{3}\\pi r^{3}', 'V = (4/3)πr³', 'diff'], ['YS', 'y=\\sqrt{r^{2}-x^{2}}', 'y = √(r² − x²)', 'c-sec'],
    ['MR', '-r', '−r', ''], ['PR', 'r', 'r', ''], ['Lr', 'r', 'r', 'c-sec'], ['Lx', 'x', 'x', 'c-alt'], ['LR', 'R', 'R', 'diff'], ['LD', '\\text{espesor }dx', 'espesor dx', 'c-alt'],
    ['E2', 'R^{2}+x^{2}=r^{2}\\quad\\Longrightarrow\\quad R^{2}=r^{2}-x^{2}', 'R² + x² = r², así que R² = r² − x²', ''],
    ['E3', '\\text{área}=\\pi R^{2}=\\pi\\left(r^{2}-x^{2}\\right)', 'área = πR² = π(r² − x²)', ''],
    ['E4', 'dV=\\pi\\left(r^{2}-x^{2}\\right)dx', 'dV = π(r² − x²) dx', ''],
    ['E5', 'V=\\displaystyle\\int_{-r}^{r}\\pi\\left(r^{2}-x^{2}\\right)dx', 'V = ∫ de −r a r de π(r² − x²) dx', ''],
    ['E6', 'V=\\pi\\left[r^{2}x-\\dfrac{x^{3}}{3}\\right]_{-r}^{r}=\\dfrac{4}{3}\\pi r^{3}', 'V = π[r²x − x³/3] de −r a r = (4/3)πr³', '']];
  var TXT = [
    ['Un semicírculo gira alrededor de su diámetro', 'y forma una esfera. ¿Cuánto mide su volumen?'],
    ['Un corte perpendicular al eje, en cualquier posición.', 'Con el radio de la esfera forma un triángulo rectángulo.'],
    ['Al girar, el corte barre un disco.', 'Su radio sale del triángulo: teorema de Pitágoras.'],
    ['Con su espesor, el disco tiene volumen:', 'área de la cara por espesor.'],
    ['El disco recorre la esfera de un extremo al otro.', 'Sumar todos los discos es integrar.'],
    ['Se calcula la integral.', 'La pregunta de arriba ya tiene respuesta.']];
  return {
    world:{x0:-3.3, x1:3.3, y0:-5.6, y1:3.1}, aspect:8.7/6.6,
    aria:'La fórmula del volumen de la esfera, armada con discos en seis pasos. Uno: un semicírculo de radio r sobre el eje x, que al girar alrededor del eje forma una esfera; arriba, la pregunta V igual a signo de interrogación. Dos: un corte vertical en la posición x; el corte, de largo R mayúscula, forma con el radio r de la esfera y con el tramo x del eje un triángulo rectángulo. Tres: al girar, el corte barre un disco de radio R, y por Pitágoras R al cuadrado es r al cuadrado menos x al cuadrado. Cuatro: el disco con su espesor dx. Cinco: el disco recorre la esfera desde menos r hasta r y la va llenando. Seis: la integral da cuatro tercios de pi por r al cubo, que reemplaza a la pregunta.',
    labels:PZ,
    sliders:[{id:'paso', tex:'\\text{paso}', min:1, max:N, step:1, value:1}],
    legend:'<span><i class="sw sec"></i> el semicírculo y el radio \\(r\\) de la esfera</span><span><i class="sw rise"></i> radio \\(R\\) del disco</span><span><i class="sw alt"></i> posición \\(x\\) y espesor \\(dx\\)</span><span><i class="sw tan"></i> el disco</span>',
    anim:{run:34000, hold:8000, still:1, apply:function(p, v){ var t = Math.min(N - 1e-6, p*N); v.q = p; v.paso = 1 + Math.floor(t); v.u = suave((t - Math.floor(t))*1.3); }},
    onInput:function(v){ v.q = null; v.u = 1; },
    draw:function(S, v){
      var k = Math.round(v.paso || 1), u = v.u == null ? 1 : v.u, C = S.C, c = S.ctx, X = S.X, Y = S.Y, s = X(1) - X(0), on = {}, i, pts = [], R0 = Rd(XC), xs, w;
      function L(id, x, y, ax, px, py){ on[id] = 1; S.lab(id, X(x) + (px || 0), Y(y) + (py || 0), ax == null ? -50 : ax, -50, true); }
      function seg(x0, y0, x1, y1, col, wd, dash){ c.strokeStyle = col; c.lineWidth = wd || 2; if (dash) c.setLineDash(dash); c.beginPath(); c.moveTo(X(x0), Y(y0)); c.lineTo(X(x1), Y(y1)); c.stroke(); c.setLineDash([]); }
      function txt(t, x, y, col, sz, al){ c.font = '600 ' + (sz || 12.5) + 'px ' + FNT; c.fillStyle = col || C.ink; c.textAlign = al || 'left'; c.textBaseline = 'middle'; c.fillText(t, X(x), Y(y)); }
      function disco(x, wd, col, alpha, ang){ var R = Rd(x), g;
        if (wd){ c.beginPath(); c.ellipse(X(x - wd/2), Y(0), E*R*s, R*s, 0, Math.PI/2, 3*Math.PI/2); c.lineTo(X(x + wd/2), Y(R)); c.ellipse(X(x + wd/2), Y(0), E*R*s, R*s, 0, -Math.PI/2, Math.PI/2); c.closePath(); g = c.createLinearGradient(0, Y(R), 0, Y(-R)); g.addColorStop(0, col); g.addColorStop(0.45, '#ffffff'); g.addColorStop(1, col); c.globalAlpha = alpha*0.5; c.fillStyle = g; c.fill(); c.globalAlpha = alpha*0.5; c.fillStyle = col; c.fill(); c.globalAlpha = 1; c.strokeStyle = col; c.lineWidth = 1; c.stroke(); }
        c.beginPath(); c.ellipse(X(x + (wd || 0)/2), Y(0), E*R*s, R*s, 0, -Math.PI/2, -Math.PI/2 + (ang == null ? 6.2832 : ang)); c.globalAlpha = alpha*0.7; c.fillStyle = col; if (ang == null || ang > 6.2) c.fill(); c.globalAlpha = 1; c.strokeStyle = col; c.lineWidth = 1.2; c.stroke(); }
      if (k < N || u < 1) L('Q', -3.2, 2.75, 0); else L('F', -3.2, 2.6, 0);
      /* esfera (contorno) desde el paso 3, creciendo al comienzo */
      if (k >= 3){ c.strokeStyle = 'rgba(31,95,138,0.45)'; c.lineWidth = 1; c.beginPath(); c.arc(X(0), Y(0), RR*s, 0, Math.PI*(k === 3 ? u : 1)); c.stroke(); c.beginPath(); c.ellipse(X(0), Y(0), E*RR*s, RR*s, 0, 0, 6.2832); c.setLineDash([3, 3]); c.stroke(); c.setLineDash([]); }
      /* semicírculo y su región */
      for (i = 0; i <= 60; i++) pts.push([RR*Math.cos(Math.PI*i/60), RR*Math.sin(Math.PI*i/60)]);
      S.poly(pts, {fill:C.sec, alpha:k >= 3 ? 0.08 : 0.2*(k === 1 ? u : 1)});
      c.strokeStyle = C.sec; c.lineWidth = 1.6; c.beginPath(); c.arc(X(0), Y(0), RR*s, Math.PI, Math.PI*(k === 1 ? 1 + u : 2)); c.stroke();
      seg(-2.9, 0, 2.9, 0, C.ink, 1, [6, 4]); txt('eje de giro', 3.25, -0.6, C.ink, 10, 'right');
      L('MR', -RR, 0, -50, 0, 13); L('PR', RR, 0, -50, 0, 13); if (k <= 2) L('YS', -1.55, 1.95, -100);
      /* paso 5: discos ya recorridos y el disco que avanza */
      if (k === 5){ xs = -RR + 2*RR*u; for (i = 0; i < 24; i++){ w = -RR + (i + 0.5)*2*RR/24; if (w + RR/24 <= xs) disco(w, 2*RR/24, C.sec, 0.55); } if (u < 1) disco(Math.max(-RR + 0.02, Math.min(RR - 0.02, xs)), 0.16, C.tan, 0.9); }
      if (k === 6) for (i = 0; i < 24; i++) disco(-RR + (i + 0.5)*2*RR/24, 2*RR/24, C.sec, 0.55);
      /* pasos 2 a 4: el corte, el triángulo y el disco */
      if (k >= 2 && k <= 4){
        if (k === 3) disco(XC, 0, C.tan, 0.55, 6.2832*u);
        if (k === 4){ disco(XC, 0.3*u + 0.001, C.tan, 0.9); if (u >= 1){ c.fillStyle = C.ink; c.globalAlpha = 0.85; c.fillRect(X(XC - 0.15), Y(R0), 0.3*s, R0*s); c.globalAlpha = 1; seg(XC, R0 + 0.03, XC + 0.7, R0 + 0.55, C.ink, 1); L('LD', XC + 0.75, R0 + 0.7, 0); } }
        var g2 = k === 2 ? u : 1;
        if (k <= 3){ seg(XC, 0, XC, R0*Math.min(1, g2/0.5), C.rise, 2.4); if (g2 > 0.5){ var h = (g2 - 0.5)/0.5; seg(0, 0, XC*h, R0*h, C.sec, 2); seg(0, 0, XC*h, 0, C.alt, 3); }
          if (g2 >= 1){ L('LR', XC, R0/2, 0, 7, 0); L('Lr', XC/2, R0/2, -100, -6, -6); L('Lx', XC/2, 0, -50, 0, -11); c.strokeStyle = C.ink; c.lineWidth = 1; c.strokeRect(X(XC) - 8, Y(0) - 8, 8, 8); } }
        c.fillStyle = C.ink; c.beginPath(); c.arc(X(0), Y(0), 2.2, 0, 6.2832); c.fill();
      }
      /* expresión del paso y frases */
      if (k === 2 && u >= 1) L('E2', -3.2, -2.75, 0); if (k === 3) L('E3', -3.2, -2.75, 0); if (k === 4) L('E4', -3.2, -2.75, 0); if (k === 5) L('E5', -3.2, -2.85, 0); if (k === 6) L('E6', -3.2, -2.85, 0);
      txt(TXT[k - 1][0], -3.2, -4.3); txt(TXT[k - 1][1], -3.2, -4.3 - 21/s);
      txt('paso ' + k + ' de ' + N, 3.2, 2.85, C.muted || '#6b6b6b', 11, 'right');
      PZ.forEach(function(e){ if (!on[e[0]]) S.lab(e[0], 0, 0, 0, 0, false); });
    },
    caption:function(v){ var k = Math.round(v.paso || 1); return 'Paso ' + k + '. ' + TXT[k - 1][0] + ' ' + TXT[k - 1][1]; },
    readout:function(v){ var k = Math.round(v.paso || 1); return [['', ['V=\\ ?', 'R^{2}+x^{2}=r^{2}', 'A(x)=\\pi R^{2}=\\pi\\left(r^{2}-x^{2}\\right)', 'dV=\\pi\\left(r^{2}-x^{2}\\right)dx', '\\displaystyle V=\\int_{-r}^{r}\\pi\\left(r^{2}-x^{2}\\right)dx', '\\displaystyle V=\\pi\\left[r^{2}x-\\dfrac{x^{3}}{3}\\right]_{-r}^{r}=\\pi\\left(\\dfrac{2r^{3}}{3}\\right)-\\pi\\left(-\\dfrac{2r^{3}}{3}\\right)=\\dfrac{4}{3}\\pi r^{3}'][k - 1]]]; }
  };
})());
