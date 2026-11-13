/* Modo corrección de las tarjetas de revisión (no va en las hojas publicadas). */
(function(){
  var KEY = 'oa-correcciones-lote10', notes = [];
  try { notes = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){}
  function save(){ try { localStorage.setItem(KEY, JSON.stringify(notes)); } catch(e){} paint(); }
  var st = document.createElement('style');
  st.textContent = '.oa-rev{position:fixed;right:12px;bottom:12px;display:flex;gap:8px;z-index:50;flex-wrap:wrap;justify-content:flex-end}.oa-rev button{font:inherit;padding:8px 12px;border-radius:6px;border:1px solid var(--brand);background:var(--brand);color:var(--bg);cursor:pointer}.oa-rev button.ghost{background:var(--bg);color:var(--brand)}body.oa-on [data-rev]{outline:1px dashed var(--line);cursor:pointer}body.oa-on [data-rev]:hover{outline:2px solid var(--brand)}[data-rev].oa-has{box-shadow:-4px 0 0 var(--rise)}.oa-box{border:2px solid var(--brand);border-radius:6px;padding:8px;background:var(--bg);display:flex;flex-direction:column;gap:6px;margin:6px 0}.oa-box textarea{font:inherit;width:100%;min-height:70px;box-sizing:border-box;background:var(--bg);color:var(--ink);border:1px solid var(--line)}.oa-box div{display:flex;gap:8px}';
  document.head.appendChild(st);
  var els = [].slice.call(document.querySelectorAll('article.sheet h1, article.sheet h2, article.sheet h3, article.sheet p, article.sheet li, article.sheet .stage'));
  els.forEach(function(e, i){ var a = e.closest('article'); e.dataset.rev = a.id + '/' + i; });
  var bar = document.createElement('div'); bar.className = 'oa-rev';
  var bOn = document.createElement('button'); bOn.textContent = 'Corregir';
  var bCp = document.createElement('button'); bCp.className = 'ghost';
  bar.appendChild(bCp); bar.appendChild(bOn); document.body.appendChild(bar);
  function paint(){ bCp.textContent = 'Copiar correcciones (' + notes.length + ')'; els.forEach(function(e){ e.classList.toggle('oa-has', notes.some(function(n){ return n.ref === e.dataset.rev; })); }); }
  bOn.addEventListener('click', function(){ var on = document.body.classList.toggle('oa-on'); bOn.textContent = on ? 'Terminar' : 'Corregir'; });
  function src(e){ if (e.classList.contains('stage')) return 'Animación ' + e.dataset.scene; var c = e.cloneNode(true); [].forEach.call(c.querySelectorAll('mjx-container'), function(m){ m.replaceWith(document.createTextNode('[fórmula]')); }); return c.textContent.replace(/\s+/g, ' ').trim().slice(0, 160); }
  document.addEventListener('click', function(ev){
    if (!document.body.classList.contains('oa-on')) return;
    var e = ev.target.closest('[data-rev]'); if (!e || ev.target.closest('.oa-box, .oa-rev, .controls')) return;
    ev.preventDefault(); ev.stopPropagation();
    var old = document.querySelector('.oa-box'); if (old) old.remove();
    var cur = notes.filter(function(n){ return n.ref === e.dataset.rev; })[0];
    var box = document.createElement('div'); box.className = 'oa-box';
    var ta = document.createElement('textarea'); ta.placeholder = 'Escribe o dicta la corrección'; ta.value = cur ? cur.nota : '';
    var row = document.createElement('div'), ok = document.createElement('button'), del = document.createElement('button');
    ok.textContent = 'Guardar nota'; del.textContent = 'Quitar'; del.className = 'ghost'; ok.type = del.type = 'button';
    row.appendChild(ok); row.appendChild(del); box.appendChild(ta); box.appendChild(row);
    e.insertAdjacentElement('afterend', box); ta.focus();
    ok.addEventListener('click', function(){ notes = notes.filter(function(n){ return n.ref !== e.dataset.rev; }); if (ta.value.trim()) notes.push({ref:e.dataset.rev, hoja:e.closest('article').dataset.hoja, actual:src(e), nota:ta.value.trim()}); box.remove(); save(); });
    del.addEventListener('click', function(){ notes = notes.filter(function(n){ return n.ref !== e.dataset.rev; }); box.remove(); save(); });
  }, true);
  bCp.addEventListener('click', function(){
    var t = 'CORRECCIONES · Lote 10 · ' + notes.length + ' notas\n' + notes.map(function(n, i){ return (i + 1) + '. ' + n.hoja + ' · ref ' + n.ref + '\n   Texto actual: ' + n.actual + '\n   Corrección: ' + n.nota; }).join('\n');
    function done(){ bCp.textContent = 'Copiado: pégalo en el chat'; setTimeout(paint, 2500); }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fb); else fb();
    function fb(){ var a = document.createElement('textarea'); a.value = t; document.body.appendChild(a); a.select(); try { document.execCommand('copy'); } catch(e){} a.remove(); done(); }
  });
  paint();
})();
