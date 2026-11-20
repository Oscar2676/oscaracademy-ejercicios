#!/usr/bin/env node
/* Comprueba, por diferencias centrales, que las derivadas programadas en las escenas (def._chk) son las de su función.
   Uso: node qa/rigor/derivadas_escenas.js taller/src/lNN/*.html */
const fs = require('fs'); const defs = [];
global.OA = { scene: (n, d) => defs.push([n, d]), boot(){}, insts: [], num: (x, d) => x.toFixed(d), smooth: p => p*p*(3 - 2*p) };
global.window = { OA: global.OA }; let malos = 0;
for (const f of process.argv.slice(2)) { (0, eval)(fs.readFileSync(f, 'utf8').split('<!--SCENE-->')[1]); }
for (const [n, d] of defs) { const c = d._chk; if (!c) continue; let m1 = 0, m2 = 0; const h = 1e-5;
  for (let i = 1; i < 200; i++) { const x = c.d0 + (c.d1 - c.d0)*i/200;
    m1 = Math.max(m1, Math.abs((c.f(x + h) - c.f(x - h))/(2*h) - c.df(x)));
    if (c.d2f) m2 = Math.max(m2, Math.abs((c.df(x + h) - c.df(x - h))/(2*h) - c.d2f(x))); }
  const ok = m1 < 1e-5 && m2 < 1e-5; if (!ok) malos++; console.log((ok ? 'ok     ' : 'FALSO  ') + n + "  error máx f': " + m1.toExponential(1) + "  f'': " + m2.toExponential(1)); }
process.exit(malos ? 1 : 0);
