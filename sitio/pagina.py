import json
a=json.load(open('arbol-sitio.json'))
data=json.dumps(a,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
T=a['totales']; gen=a['generado'][:16].replace('T',' ')+' UTC'
html=r'''<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Árbol del sitio Oscar Academy</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Source+Sans+3:wght@400;600;700&display=swap">
<style>
:root{--bg:#fff;--surface:#f7f3f4;--ink:#241a1c;--muted:#6d5f62;--line:#e4d9db;--brand:#8a1f2d;--soft:#f3e3e5;--link:#1f5f8a;--ok:#2e6b3e;--warn:#a85f00;color-scheme:light}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "Source Sans 3","Segoe UI",system-ui,sans-serif;overflow-wrap:anywhere}
.wrap{max-width:900px;margin:0 auto;padding:22px 16px 60px}
h1{font:400 clamp(1.7rem,5vw,2.3rem)/1.15 "Fjalla One","Arial Narrow",sans-serif;color:var(--brand);margin:0 0 6px;text-wrap:balance}
.meta{color:var(--muted);font-size:.9rem;margin:0 0 14px}
.tot{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 16px;padding:0;list-style:none}
.tot li{background:var(--surface);border-radius:6px;padding:8px 12px;font-size:.86rem;color:var(--muted)}
.tot b{display:block;font:400 1.25rem/1.1 "Fjalla One",sans-serif;color:var(--ink);font-variant-numeric:tabular-nums}
.bar{position:sticky;top:0;background:var(--bg);padding:10px 0;display:flex;gap:8px;flex-wrap:wrap;align-items:center;border-bottom:1px solid var(--line);z-index:5}
.bar input[type=search]{flex:1;min-width:200px;font:inherit;padding:8px 10px;border:1px solid var(--line);border-radius:6px}
.bar label{font-size:.86rem;color:var(--muted);display:flex;gap:5px;align-items:center}
button{font:600 .84rem inherit;padding:7px 11px;border-radius:6px;border:1px solid var(--brand);background:#fff;color:var(--brand);cursor:pointer}
:focus-visible{outline:3px solid var(--link);outline-offset:2px}
.count{font-size:.84rem;color:var(--muted);margin:10px 0}
details{border-bottom:1px solid var(--line)}
details.pg>summary{padding:10px 4px;cursor:pointer;font-weight:700;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
details.pg>summary small{font-weight:400;color:var(--muted);font-size:.8rem}
.tag{font-size:.72rem;font-weight:600;border-radius:999px;padding:1px 8px;background:var(--surface);color:var(--muted)}
.tag.w{background:#fbefdc;color:var(--warn)}
.body{padding:2px 4px 14px 14px}
.url{font-size:.82rem;margin:0 0 8px}
a{color:var(--link)}
.menu{margin:8px 0 0}
.menu>summary{cursor:pointer;color:var(--brand);font-weight:600;padding:5px 0}
details.menu{border:0}
.caja{border:1px solid var(--line);border-radius:6px;margin:6px 0 8px 14px;padding:8px 12px;background:var(--surface)}
.caja h3{margin:0 0 4px;font-size:.95rem}
.caja ul{margin:0;padding-left:1.1em;font-size:.92rem}
.caja li{margin:1px 0}
.caja li a{font-size:.8rem}
.vacio{color:var(--muted);font-size:.86rem;margin-left:14px}
mark{background:#ffe9a8;color:inherit}
</style></head><body><div class="wrap">
<h1>Árbol del sitio Oscar Academy</h1>
<p class="meta">Sitio › Página › Menú interno › Cajas › Títulos. Copia tomada del editor de Wix el GEN, revisión REV.</p>
<ul class="tot"><li><b>T1</b>páginas</li><li><b>T2</b>con menú interno</li><li><b>T3</b>entradas de menú</li><li><b>T4</b>cajas</li><li><b>T5</b>títulos en cajas</li><li><b>T6</b>títulos con enlace</li></ul>
<div class="bar"><input type="search" id="q" placeholder="Buscar página, caja o título" aria-label="Buscar página, caja o título"><label><input type="checkbox" id="solo"> solo con enlace</label><button type="button" id="abrir">Abrir todo</button><button type="button" id="cerrar">Cerrar todo</button></div>
<p class="count" id="count" aria-live="polite"></p>
<div id="tree"></div>
</div>
<script id="datos" type="application/json">DATA</script>
<script>
(function(){
var A=JSON.parse(document.getElementById('datos').textContent),tree=document.getElementById('tree'),q=document.getElementById('q'),solo=document.getElementById('solo'),count=document.getElementById('count');
function norm(s){return (s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
function enl(li,es){(es||[]).forEach(function(e){li.appendChild(document.createTextNode(' '));if(e.url){var a=el('a','',e.tipo==='externo'?'↗ '+e.url.replace(/^https?:\/\//,''):e.url);a.href=e.url;a.target='_blank';a.rel='noopener';li.appendChild(a)}else{li.appendChild(el('span','tag',e.tipo+': '+(e.pagina||e.doc||'')+(e.ancla?' › '+e.ancla:'')))}})}
function caja(c,f,soloE){var its=c.titulos.filter(function(i){return (!soloE||i.enlaces)&&(!f||f.all||norm(i.texto).indexOf(f.t)>=0)});var hit=f&&norm(c.titulo).indexOf(f.t)>=0;if(hit&&!soloE)its=c.titulos;if(f&&!f.all&&!hit&&!its.length)return null;if(soloE&&!its.length)return null;
 var d=el('div','caja'),h=el('h3','',c.titulo);enl(h,c.enlacesTitulo);d.appendChild(h);var ul=el('ul');its.forEach(function(i){var li=el('li','',i.texto);enl(li,i.enlaces);ul.appendChild(li)});if(its.length)d.appendChild(ul);d._n=its.length;return d}
function render(){var t=norm(q.value.trim()),soloE=solo.checked,nP=0,nC=0,nT=0;tree.textContent='';
 A.paginas.forEach(function(p){var pHit=t&&norm(p.titulo).indexOf(t)>=0,f=t?{t:t,all:pHit}:null,secs=[];
  p.menu.forEach(function(m){var mHit=t&&norm(m.nombre).indexOf(t)>=0,ff=f?{t:t,all:pHit||mHit}:null,cs=m.cajas.map(function(c){return caja(c,ff,soloE)}).filter(Boolean);if(cs.length||(!t&&!soloE)||(mHit&&!soloE))secs.push([m,cs])});
  var sin=p.cajasSinEntradaDeMenu.map(function(c){return caja(c,f,soloE)}).filter(Boolean);
  if((t||soloE)&&!secs.length&&!sin.length&&!(pHit&&!soloE))return;
  nP++;var d=el('details','pg'),s=el('summary');s.appendChild(document.createTextNode(p.titulo));var nc=0;secs.forEach(function(x){nc+=x[1].length});nc+=sin.length;
  s.appendChild(el('small','',p.menu.length+' entradas de menú · '+nc+' cajas'));if(!p.tieneMenuInterno)s.appendChild(el('span','tag','sin menú interno'));if(!p.enMenuDelSitio)s.appendChild(el('span','tag','fuera del menú del sitio'));d.appendChild(s);
  var b=el('div','body'),u=el('p','url'),a=el('a','',p.url);a.href=p.url;a.target='_blank';a.rel='noopener';u.appendChild(a);b.appendChild(u);
  secs.forEach(function(x){var m=x[0],md=el('details','menu');md.open=true;var ms=el('summary','',m.nombre||'(sin nombre)');if(p.tieneMenuInterno&&!m.visible){ms.appendChild(document.createTextNode(' '));ms.appendChild(el('span','tag w','oculta en el menú'))}md.appendChild(ms);if(!x[1].length)md.appendChild(el('p','vacio','Sin cajas bajo esta entrada.'));x[1].forEach(function(c){md.appendChild(c);nC++;nT+=c._n});b.appendChild(md)});
  if(sin.length){var md=el('details','menu');md.open=true;md.appendChild(el('summary','','Cajas sin entrada de menú'));sin.forEach(function(c){md.appendChild(c);nC++;nT+=c._n});b.appendChild(md)}
  d.appendChild(b);if(t||soloE)d.open=true;tree.appendChild(d)});
 count.textContent=(t||soloE)?nP+' páginas, '+nC+' cajas y '+nT+' títulos coinciden':'Abre una página para ver su menú interno y sus cajas.'}
var tm;q.addEventListener('input',function(){clearTimeout(tm);tm=setTimeout(render,200)});solo.addEventListener('change',render);
document.getElementById('abrir').addEventListener('click',function(){[].forEach.call(tree.querySelectorAll('details.pg'),function(d){d.open=true})});
document.getElementById('cerrar').addEventListener('click',function(){[].forEach.call(tree.querySelectorAll('details.pg'),function(d){d.open=false})});
render();
})();
</script></body></html>'''
for k,v in (('GEN',gen),('REV',str(a['revisionWix'])),('T1',T['paginas']),('T2',T['paginasConMenuInterno']),('T3',T['entradasDeMenu']),('T4',T['cajas']),('T5',T['titulosEnCajas']),('T6',T['titulosConEnlace'])):
    html=html.replace(k,f"{v:,}".replace(',','.') if isinstance(v,int) else v,1)
html=html.replace('DATA',data,1)
open('index.html','w').write(html); print(len(html))
