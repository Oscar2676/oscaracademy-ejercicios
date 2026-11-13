#!/usr/bin/env node
/* Saca los cálculos que muestran las animaciones (readout) para TODAS las posiciones de los deslizadores,
   y los escribe como fórmulas para que verificar_tex.py los recalcule.
   Uso: node qa/rigor/rotulos_animaciones.js hoja1.html hoja2.html ... > /tmp/rotulos.html */
const fs = require('fs');
const defs = [];
global.OA = { scene: (n, d) => defs.push([n, d]), boot: () => {}, insts: [],
  num: (x, d) => { d = d == null ? 2 : d; return (Math.round(x * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d).replace('.', '{,}').replace(/^-/, '-'); },
  smooth: p => p * p * (3 - 2 * p) };
global.window = { OA: global.OA };
let out = '<article>\n', total = 0;
for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8');
  const js = src.includes('<!--SCENE-->') ? src.split('<!--SCENE-->')[1] : (src.match(/OA\.scene\([\s\S]*?(?=\nOA\.boot\(\))/) || [''])[0];
  const antes = defs.length;
  try { (0, eval)(js); } catch (e) { console.error('no se pudo cargar', f, e.message); continue; }
  for (const [name, d] of defs.slice(antes)) {
    if (!d.readout) continue;
    const ejes = (d.sliders || []).map(s => { const v = []; for (let x = s.min; x <= s.max + 1e-9; x += s.step) v.push(Math.round(x * 1e6) / 1e6); return [s.id, v]; });
    const vistos = new Set();
    const rec = (i, v) => {
      if (i === ejes.length) {
        const w = Object.assign({}, v);
        if (d.onInput) for (const [id] of ejes) d.onInput(w, id);
        const filas = d.readout(w) || [];
        for (const r of filas) { const t = r[1]; if (!vistos.has(t)) { vistos.add(t); out += '<!-- ' + name + ' -->\\[' + t + '\\]\n'; total++; } }
        return;
      }
      for (const x of ejes[i][1]) { v[ejes[i][0]] = x; rec(i + 1, v); }
    };
    rec(0, {});
  }
}
console.error('fórmulas de animaciones:', total);
process.stdout.write(out + '</article><!--SCENE-->');
