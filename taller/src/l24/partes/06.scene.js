OA.scene('bn-combinar', (function(){
  var N = 5;
  function combos(k){ var out = [], cur = []; (function rec(s){ var i; if (cur.length === k){ out.push(cur.slice()); return; } for (i = s; i <= N; i++){ cur.push(i); rec(i + 1); cur.pop(); } })(1); return out; }
  function f(n){ var r = 1, i; for (i = 2; i <= n; i++) r *= i; return r; }
  return {
    world:{x0:-0.6, x1:8.6, y0:-4.2, y1:4.0}, aspect:8.2/9.2,
    aria:'Cinco fichas numeradas del 1 al 5. Se forman, uno por uno, todos los grupos de 2 fichas: las fichas elegidas se pintan de naranja y cada grupo nuevo se anota en una lista. Al terminar hay 10 grupos. Bajo el dibujo se hace la cuenta: eligiendo con orden hay 5 por 4, 20 maneras, pero cada grupo se contó 2 veces, así que son 20 dividido por 2, 10.',
    labels:[['F', '\\dbinom{n}{k}=\\dfrac{n!}{k!\\,(n-k)!}', 'C(n, k) = n! / (k! (n − k)!)', 'diff']],
    sliders:[{id:'k', tex:'k', min:0, max:5, step:1, value:2}],
    legend:'<span><i class="sw rise"></i> fichas elegidas en este grupo</span><span><i class="sw sec"></i> grupos ya formados</span>',
    anim:{run:22000, hold:7000, still:1, apply:function(p, v){ v.q = p; v.k = 2; v.m = Math.min(10, 1 + Math.floor(p*12.5)); v.fin = p*12.5 >= 10.8; }},
    onInput:function(v){ v.q = null; v.m = 1e9; v.fin = true; },
    draw:function(S, v){
      var k = Math.round(v.k), L = combos(k), tot = L.length, m = Math.min(tot, v.m || tot), cur = L[m - 1] || [], C = S.C, c = S.ctx, X = S.X, Y = S.Y, txt = oaTxt(S), i, x0, y0, ord = [], prod = 1, on;
      for (i = 1; i <= N; i++){ on = cur.indexOf(i) >= 0; c.beginPath(); c.arc(X(1 + i), Y(3), 13, 0, 6.2832); c.fillStyle = on ? C.rise : '#fff'; c.fill(); c.strokeStyle = on ? C.rise : C.ink; c.lineWidth = 1.3; c.stroke(); c.font = '700 13px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = on ? '#fff' : C.ink; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('' + i, X(1 + i), Y(3)); }
      for (i = 0; i < m; i++){ c.font = (i === m - 1 && !v.fin ? '700' : '500') + ' 12px "Source Sans 3", system-ui, sans-serif'; c.fillStyle = i === m - 1 && !v.fin ? C.rise : C.sec; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('{' + L[i].join(', ') + '}', X(0.9 + 1.55*(i % 5)), Y(1.7) + 20*Math.floor(i/5)); }
      for (i = 0; i < k; i++){ ord.push(N - i); prod *= N - i; }
      x0 = X(-0.5); y0 = Y(-0.35);
      txt('elegir k = ' + k + ' fichas de n = 5: grupo ' + m + ' de ' + tot, x0, y0, 'left', C.ink);
      txt(k === 0 ? 'hay una sola manera: no elegir ninguna' : 'eligiendo con orden: ' + ord.join(' · ') + (k > 1 ? ' = ' + prod : '') + ' maneras', x0, y0 + 21, 'left', C.ink);
      txt(k === 0 ? '0! = 1 (por convenio)' : 'cada grupo se contó ' + k + '! = ' + f(k) + (f(k) === 1 ? ' vez' : ' veces') + ' (sus órdenes)', x0, y0 + 42, 'left', C.ink);
      if (v.fin) txt('C(5, ' + k + ') = ' + prod + ' / ' + f(k) + ' = ' + tot + ' grupos', x0, y0 + 63, 'left', C.tan);
      S.lab('F', x0, y0 + 90, 0, 0, !!v.fin && v.q != null);
    },
    caption:function(v){ var k = Math.round(v.k), tot = combos(k).length; if (v.fin) return 'Hay ' + tot + ' maneras de elegir ' + k + ' fichas entre 5: ese número es el coeficiente binomial de 5 sobre ' + k + '. Cambia k con el deslizador'; return 'Se forman, uno por uno, todos los grupos de ' + k + ' fichas. El orden dentro del grupo no importa: {1, 3} y {3, 1} son el mismo'; },
    readout:function(v){ var k = Math.round(v.k); return [['', '\\dbinom{5}{' + k + '}=\\dfrac{5!}{' + k + '!\\,' + (5 - k) + '!}=\\dfrac{120}{' + f(k) + '\\cdot ' + f(5 - k) + '}=' + bnC(5, k)]]; }
  };
})());
