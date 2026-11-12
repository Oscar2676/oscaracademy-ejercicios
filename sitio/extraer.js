/* Extrae del editor clásico de Wix (solo lectura) las páginas, anclas, menús de anclas y textos con sus enlaces.
   Se ejecuta en la pestaña del editor; deja el resultado en window.__A. Luego se descarga como JSON
   (Blob + <a download>) y se pasa a armar.py como datos-wix.json. */
(function(){
  var ds = document.getElementById('preview').contentWindow.documentServices;
  var A = {generado:new Date().toISOString(), revision:ds.generalInfo.getRevision(), paginas:[]};
  var P = ds.pages.getPagesData().map(function(p){ return {id:p.id, titulo:p.title, uri:p.pageUriSEO, oculta:!!p.hidePage}; });
  function box(c){ try { var r = ds.components.layout.getRelativeToScreen(c); return [Math.round(r.x), Math.round(r.y)]; } catch(e){ return [null, null]; } }
  P.forEach(function(p){
    var pg = Object.assign({}, p, {menus:[], anclas:[], textos:[], cont:{}});
    ds.components.getAllComponents(p.id).forEach(function(c){
      var t = ds.components.getType(c).split('.').pop();
      if (t !== 'WRichText' && t !== 'Anchor' && t !== 'VerticalAnchorsMenu') return;
      var d = ds.components.data.get(c), xy = box(c), par = ds.components.getContainer(c), pid = par && par.id;
      if (t === 'Anchor'){ pg.anclas.push({id:c.id, nombre:d && d.name, y:xy[1]}); return; }
      if (t === 'VerticalAnchorsMenu'){ pg.menus.push({id:c.id, ocultas:(d && d.hiddenAnchorIds && d.hiddenAnchorIds[p.id]) || []}); return; }
      if (!d || !d.text) return;
      var el = document.createElement('div'); el.innerHTML = d.text;
      var txt = el.textContent.replace(/\s+/g, ' ').trim(); if (!txt) return;
      var lk = {}; (d.linkList || []).forEach(function(l){ lk[l.id] = l; });
      var enl = [];
      [].forEach.call(el.querySelectorAll('a'), function(a){
        var l = lk[(a.getAttribute('dataquery') || '').replace('#', '')]; if (!l) return;
        var o = {texto:a.textContent.replace(/\s+/g, ' ').trim(), tipo:l.type};
        if (l.url) o.url = l.url;
        if (l.pageId) o.pagina = (typeof l.pageId === 'string' ? l.pageId : l.pageId.id || '').replace('#', '');
        if (l.anchorDataId) o.ancla = (typeof l.anchorDataId === 'string' ? l.anchorDataId : l.anchorDataId.id || '').replace('#', '');
        if (l.anchorName) o.anclaNombre = l.anchorName;
        if (l.docId) o.doc = l.docId; if (l.name) o.nombre = l.name; if (l.target) o.destino = l.target;
        enl.push(o);
      });
      var o = {id:c.id, t:txt, y:xy[1], x:xy[0], c:pid, tag:(d.text.match(/^\s*<(h[1-6]|p|ul|ol)/i) || [])[1] || ''};
      if (enl.length) o.enl = enl;
      pg.textos.push(o);
      if (pid && !pg.cont[pid]){ var cxy = box(par), g = ds.components.getContainer(par); pg.cont[pid] = {tipo:ds.components.getType(par).split('.').pop(), y:cxy[1], x:cxy[0], padre:g && g.id}; }
    });
    A.paginas.push(pg);
  });
  window.__A = A;
  return {paginas:A.paginas.length, bytes:JSON.stringify(A).length};
})();
