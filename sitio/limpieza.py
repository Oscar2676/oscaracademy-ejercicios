import json,collections
raw=json.load(open('raw.json')); IDS=['iacyn','a702y','x6vzw','t2ams','jvh30','li9mn','ik0j0']
P={p['id']:p for p in raw['paginas']}
cnt=collections.Counter(t['id'] for p in raw['paginas'] for t in p['textos']); com={i for i,n in cnt.items() if n>=len(raw['paginas'])*0.8}
out=[]
for pid in IDS:
    p=P[pid]; by=collections.defaultdict(list)
    for t in p['textos']:
        if t['id'] not in com: by[t['c']].append(t)
    cajas=[]
    for c,ts in by.items():
        k=p['cont'].get(c,{})
        if k.get('tipo')!='Container': continue
        ts=sorted(ts,key=lambda t:(t['y'],t['x']))
        cajas.append({'id':c,'y':k['y'],'x':k['x'],'h':{'id':ts[0]['id'],'t':ts[0]['t']},'i':[{'id':t['id'],'t':t['t'],'e':(t['enl'][0].get('url') or 'enlace') if t.get('enl') else ''} for t in ts[1:]]})
    cajas.sort(key=lambda c:(c['y'],c['x']))
    ocultas=set(p['menus'][0]['ocultas']) if p['menus'] else set()
    menu=[{'id':a['id'],'n':(a['nombre'] or '').strip(),'v':a['id'] not in ocultas,'y':a['y'],'c':[]} for a in sorted(p['anclas'],key=lambda a:a['y'])]
    sin=[]
    for c in cajas:
        d=None
        for m in menu:
            if m['y']<=c['y']+45: d=m
            else: break
        cc={k:v for k,v in c.items() if k not in('y','x')}; (d['c'] if d else sin).append(cc)
    for m in menu: del m['y']
    if sin: menu.insert(0,{'id':'','n':'(sin entrada de menú)','v':True,'c':sin})
    out.append({'id':pid,'t':p['titulo'].strip(),'m':menu})
data=json.dumps({'rev':raw['revision'],'gen':raw['generado'][:16].replace('T',' ')+' UTC','p':out},ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
html=r'''<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Limpieza de páginas · Educación Media y Aplicaciones</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fjalla+One&family=Source+Sans+3:wght@400;600;700&display=swap">
<style>
:root{--bg:#fff;--surface:#f7f3f4;--ink:#241a1c;--muted:#6d5f62;--line:#e4d9db;--brand:#8a1f2d;--del:#b3261e;--delbg:#fdecea;--chg:#1f5f8a;--chgbg:#e8f1f8;color-scheme:light}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.45 "Source Sans 3","Segoe UI",system-ui,sans-serif;overflow-wrap:anywhere}
.wrap{max-width:860px;margin:0 auto;padding:18px 14px 110px}
h1{font:400 clamp(1.5rem,5vw,2rem)/1.15 "Fjalla One","Arial Narrow",sans-serif;color:var(--brand);margin:0 0 4px}
.meta{color:var(--muted);font-size:.88rem;margin:0 0 12px}
.tabs{display:flex;flex-wrap:wrap;gap:6px;position:sticky;top:0;background:var(--bg);padding:8px 0;border-bottom:1px solid var(--line);z-index:5}
.tabs button{font:600 .84rem inherit;padding:7px 11px;border-radius:999px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer}
.tabs button[aria-pressed=true]{background:var(--brand);border-color:var(--brand);color:#fff}
.tabs button b{font-weight:700;margin-left:4px}
h2{font:400 1.05rem/1.2 "Fjalla One",sans-serif;color:var(--brand);margin:20px 0 6px;display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}
.tag{font:600 .7rem "Source Sans 3",sans-serif;border-radius:999px;padding:1px 8px;background:var(--surface);color:var(--muted)}
.caja{border:1px solid var(--line);border-radius:8px;margin:8px 0 12px;background:var(--surface);overflow:hidden}
.row{display:flex;gap:8px;align-items:center;padding:6px 10px;border-top:1px solid var(--line);flex-wrap:wrap}
.row.h{border-top:0;background:#efe6e8;font-weight:700}
.row .tx{flex:1;min-width:180px}
.row .tx small{display:block;color:var(--muted);font-weight:400;font-size:.76rem}
.row .nuevo{display:block;color:var(--chg);font-weight:600}
.row button{font:600 .78rem inherit;padding:5px 9px;border-radius:6px;border:1px solid var(--line);background:#fff;color:var(--ink);cursor:pointer}
.row button.on.b{background:var(--del);border-color:var(--del);color:#fff}
.row button.on.c{background:var(--chg);border-color:var(--chg);color:#fff}
.row.del{background:var(--delbg)}.row.del .tx>span{text-decoration:line-through;color:var(--del)}
.row.chg{background:var(--chgbg)}.row.chg .tx>span{text-decoration:line-through;color:var(--muted)}
.caja.del .row:not(.h){opacity:.45}
.edit{flex-basis:100%;display:flex;gap:6px}
.edit input{flex:1;font:inherit;padding:6px 8px;border:1px solid var(--chg);border-radius:6px;min-width:0}
:focus-visible{outline:3px solid var(--chg);outline-offset:2px}
.foot{position:fixed;left:0;right:0;bottom:0;background:#fff;border-top:1px solid var(--line);padding:10px 14px;display:flex;gap:10px;align-items:center;justify-content:center;flex-wrap:wrap;z-index:9}
.foot button{font:700 .92rem inherit;padding:10px 16px;border-radius:8px;border:1px solid var(--brand);background:var(--brand);color:#fff;cursor:pointer}
.foot button.g{background:#fff;color:var(--brand)}
.foot span{font-size:.86rem;color:var(--muted)}
textarea{width:100%;min-height:180px;font:12.5px/1.4 ui-monospace,monospace;margin-top:10px}
dialog{border:1px solid var(--brand);border-radius:10px;max-width:min(700px,94vw);width:100%}
</style></head><body><div class="wrap">
<h1>Limpieza de páginas</h1>
<p class="meta">Marca qué se borra y qué se cambia. Al terminar pulsa «Copiar decisiones» y pégalas en el chat. Nada cambia en el sitio hasta que Claude las aplique. Copia de Wix del GEN, revisión REV.</p>
<div class="tabs" id="tabs" role="group" aria-label="Página"></div>
<div id="main"></div>
</div>
<div class="foot"><span id="n" aria-live="polite"></span><button type="button" id="copiar">Copiar decisiones</button><button type="button" class="g" id="limpiar">Quitar marcas de esta página</button></div>
<dialog id="dlg"><p><b>Decisiones.</b> Si no se copiaron solas, selecciona todo el texto y cópialo.</p><textarea id="out" readonly></textarea><p><button type="button" id="cerrar">Cerrar</button></p></dialog>
<script id="datos" type="application/json">DATA</script>
<script>
(function(){
var D=JSON.parse(document.getElementById('datos').textContent),KEY='oa-limpieza-v2',S={},cur=0;
try{S=JSON.parse(localStorage.getItem(KEY)||'{}')||{}}catch(e){S={}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;return e}
var main=document.getElementById('main'),tabs=document.getElementById('tabs');
function idsOf(p){var a=[];p.m.forEach(function(m){m.c.forEach(function(c){a.push(c.id,c.h.id);c.i.forEach(function(i){a.push(i.id)})})});return a}
function countP(p){return idsOf(p).filter(function(i){return S[i]}).length}
function drawTabs(){tabs.textContent='';D.p.forEach(function(p,k){var b=el('button','',p.t);b.type='button';b.setAttribute('aria-pressed',k===cur);var n=countP(p);if(n)b.appendChild(el('b','','· '+n));b.addEventListener('click',function(){cur=k;draw();window.scrollTo(0,0)});tabs.appendChild(b)});
 var tot=0;D.p.forEach(function(p){tot+=countP(p)});document.getElementById('n').textContent=tot?tot+' decisiones marcadas':'Sin decisiones todavía'}
function row(o,isH,cajaId){var r=el('div','row'+(isH?' h':'')),tx=el('div','tx'),sp=el('span','',o.t);tx.appendChild(sp);if(o.e)tx.appendChild(el('small','',o.e==='enlace'?'tiene enlace':'↗ '+o.e.replace(/^https?:\/\//,'')));r.appendChild(tx);
 var key=isH==='caja'?cajaId:o.id;
 function paint(){var s=S[key];r.classList.toggle('del',!!s&&s.a==='B');r.classList.toggle('chg',!!s&&s.a==='C');bB.classList.toggle('on',!!s&&s.a==='B');bC.classList.toggle('on',!!s&&s.a==='C');var old=tx.querySelector('.nuevo');if(old)old.remove();if(s&&s.a==='C'&&s.n)tx.appendChild(el('span','nuevo','→ '+s.n));if(isH==='caja')r.parentNode&&r.parentNode.classList.toggle('del',!!s&&s.a==='B')}
 var bB=el('button','b',isH==='caja'?'Borrar caja':'Borrar'),bC=el('button','c','Cambiar');bB.type=bC.type='button';
 bB.addEventListener('click',function(){if(S[key]&&S[key].a==='B')delete S[key];else S[key]={a:'B'};save();closeEdit();paint();drawTabs()});
 var ed=null;function closeEdit(){if(ed){ed.remove();ed=null}}
 bC.addEventListener('click',function(){if(ed){closeEdit();return}ed=el('div','edit');var inp=el('input');inp.type='text';inp.value=(S[key]&&S[key].n)||o.t;inp.setAttribute('aria-label','Texto nuevo');var ok=el('button','','Guardar'),no=el('button','','Quitar cambio');ok.type=no.type='button';
  function go(){var v=inp.value.trim();if(v&&v!==o.t)S[key]={a:'C',n:v};else delete S[key];save();closeEdit();paint();drawTabs()}
  ok.addEventListener('click',go);inp.addEventListener('keydown',function(e){if(e.key==='Enter')go()});no.addEventListener('click',function(){delete S[key];save();closeEdit();paint();drawTabs()});
  ed.appendChild(inp);ed.appendChild(ok);ed.appendChild(no);r.appendChild(ed);inp.focus();inp.select()});
 if(isH==='caja'){r.appendChild(bB)}else{r.appendChild(bB);r.appendChild(bC)}
 r._paint=paint;return r}
function draw(){main.textContent='';var p=D.p[cur];
 p.m.forEach(function(m){var h=el('h2','','Menú: '+m.n);if(!m.v)h.appendChild(el('span','tag','oculta en el menú'));if(!m.c.length)h.appendChild(el('span','tag','sin cajas'));main.appendChild(h);
  m.c.forEach(function(c){var box=el('div','caja');var hr=row({id:c.h.id,t:c.h.t},true,c.id);box.appendChild(hr);var del=el('div','row');del.appendChild(el('div','tx',''));box.appendChild(del);box.removeChild(del);
   var br=row({id:c.id,t:'Caja completa ('+c.i.length+' títulos)'},'caja',c.id);box.appendChild(br);
   c.i.forEach(function(i){box.appendChild(row(i,false,c.id))});main.appendChild(box);[].forEach.call(box.children,function(x){x._paint&&x._paint()})})});
 drawTabs()}
function texto(){var L=[],tot=0;D.p.forEach(function(p){var l=[];p.m.forEach(function(m){m.c.forEach(function(c){var sc=S[c.id];if(sc&&sc.a==='B')l.push('BORRAR CAJA «'+c.h.t+'» ('+c.i.length+' títulos) · menú «'+m.n+'» ['+c.id+']');
   var sh=S[c.h.id];if(sh&&sh.a==='C')l.push('CAMBIAR NOMBRE DE CAJA «'+c.h.t+'» → «'+sh.n+'» ['+c.h.id+']');if(sh&&sh.a==='B')l.push('BORRAR NOMBRE DE CAJA «'+c.h.t+'» ['+c.h.id+']');
   if(!(sc&&sc.a==='B'))c.i.forEach(function(i){var s=S[i.id];if(!s)return;if(s.a==='B')l.push('BORRAR «'+i.t+'» · caja «'+c.h.t+'» ['+i.id+']'+(i.e?' (tiene enlace)':''));else l.push('CAMBIAR «'+i.t+'» → «'+s.n+'» · caja «'+c.h.t+'» ['+i.id+']')})})});
  if(l.length){L.push('PÁGINA «'+p.t+'» ['+p.id+'] · '+l.length+' decisiones');L=L.concat(l);L.push('');tot+=l.length}});
 return tot?'LIMPIEZA · '+tot+' decisiones · copia de Wix revisión '+D.rev+'\n\n'+L.join('\n'):''}
document.getElementById('copiar').addEventListener('click',function(){var t=texto(),dlg=document.getElementById('dlg'),out=document.getElementById('out');if(!t){out.value='Todavía no hay decisiones marcadas.'}else{out.value=t;try{navigator.clipboard.writeText(t).catch(function(){})}catch(e){}}
 if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');out.focus();out.select()});
document.getElementById('cerrar').addEventListener('click',function(){var d=document.getElementById('dlg');d.close?d.close():d.removeAttribute('open')});
document.getElementById('limpiar').addEventListener('click',function(){idsOf(D.p[cur]).forEach(function(i){delete S[i]});save();draw()});
draw();
})();
</script></body></html>'''
html=html.replace('GEN',raw['generado'][:16].replace('T',' ')+' UTC',1).replace('REV',str(raw['revision']),1).replace('DATA',data,1)
open('limpieza.html','w').write(html); print(len(html),[(p['t'],sum(len(m['c']) for m in p['m'])) for p in out])
