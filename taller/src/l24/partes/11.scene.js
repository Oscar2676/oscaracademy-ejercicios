OA.scene('bn-buscar', {
  world:{x0:-0.9, x1:7.9, y0:-5.0, y1:3.5}, aspect:8.5/8.8,
  aria:'Se busca el quinto término del desarrollo de 2x menos 3 elevado a 7. Arriba, los ocho casilleros del desarrollo, con su posición y su k. Paso a paso: se marca la posición 5; se obtiene k igual a 4; se calcula el coeficiente, 35; la potencia de 2x, que es 8 x al cubo; la potencia de menos 3, que es 81; y se multiplican los tres: 22680 x al cubo.',
  labels:[['F', 'T_{5}=\\dbinom{7}{4}(2x)^{3}(-3)^{4}=35\\cdot 8x^{3}\\cdot 81=22\\,680\\,x^{3}', 'T₅ = 35 · 8x³ · 81 = 22 680 x³', 'diff']],
  sliders:[{id:'s', tex:'\\text{paso}', min:1, max:6, step:1, value:1}],
  legend:'<span><i class="sw rise"></i> el término buscado y su coeficiente</span><span><i class="sw sec"></i> potencia de \\(a=2x\\)</span><span><i class="sw tan"></i> potencia de \\(b=-3\\)</span>',
  anim:{run:22000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.s = Math.min(6, 1 + Math.floor(p*7.2)); }},
  onInput:function(v){ v.q = null; },
  draw:function(S, v){
    var s = Math.round(v.s || 1), C = S.C, txt = oaTxt(S), x0, y0;
    bnCajas(S, 7, 2, function(i){ return i === 4 ? C.rise : null; }, function(i){ return (i + 1) + 'º'; }, function(i){ return s >= 2 ? 'k = ' + i : ''; });
    x0 = S.X(-0.8); y0 = S.Y(0.55);
    txt('(2x − 3)⁷:  a = 2x,  b = −3,  n = 7.  Se busca el 5º término', x0, y0, 'left', C.ink);
    if (s >= 2) txt('posición 5  →  k = 5 − 1 = 4', x0, y0 + 21, 'left', C.ink);
    if (s >= 3) txt('coeficiente: C(7, 4) = C(7, 3) = (7 · 6 · 5)/(3 · 2 · 1) = 35', x0, y0 + 42, 'left', C.rise);
    if (s >= 4) txt('potencia de a: (2x)⁷⁻⁴ = (2x)³ = 8x³', x0, y0 + 63, 'left', C.sec);
    if (s >= 5) txt('potencia de b: (−3)⁴ = 81   (positiva: exponente par)', x0, y0 + 84, 'left', C.tan);
    if (s >= 6) txt('T₅ = 35 · 8x³ · 81 = 22 680 x³', x0, y0 + 105, 'left', C.ink);
    S.lab('F', x0, y0 + 132, 0, 0, s >= 6 && v.q != null);
  },
  caption:function(v){ var s = Math.round(v.s || 1); return ['Se identifican a, b y n, con el signo dentro de b. El término buscado es el de la posición 5', 'De la posición se pasa a k restando 1: k = 4', 'Con k = 4 se calcula el coeficiente binomial: 35', 'La potencia de a lleva exponente n − k = 3. El paréntesis hace que el 2 también se eleve: 8x³', 'La potencia de b lleva exponente k = 4. Como es par, (−3)⁴ es positivo: 81', 'Se multiplican las tres partes: el 5º término es 22 680 x³'][s - 1]; },
  readout:function(v){ var s = Math.round(v.s || 1); return [['', 'T_{k+1}=\\dbinom{n}{k}a^{\\,n-k}b^{\\,k}\\qquad n=7,\\ a=2x,\\ b=-3,\\ k=4']].concat(s >= 6 ? [['d', 'T_{5}=\\dbinom{7}{4}(2x)^{3}(-3)^{4}=35\\cdot 8x^{3}\\cdot 81=22\\,680\\,x^{3}']] : []); }
});
