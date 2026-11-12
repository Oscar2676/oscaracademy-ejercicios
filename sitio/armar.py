"""Arma el árbol Sitio > Página > Menú interno > Cajas a partir de raw.json (extraído del editor de Wix)."""
import json,collections,sys,html
raw=json.load(open(sys.argv[1] if len(sys.argv)>1 else 'raw.json'))
P=raw['paginas']; tit={p['id']:p['titulo'] for p in P}
cnt=collections.Counter(t['id'] for p in P for t in p['textos'])
comunes_ids={i for i,n in cnt.items() if n>=len(P)*0.8}
def enlaces(t):
    out=[]
    for e in t.get('enl',[]):
        o={'texto':e.get('texto','')}
        tp=e.get('tipo')
        if tp=='ExternalLink' or tp=='href': o['tipo']='externo'; o['url']=e.get('url','')
        elif tp=='PageLink': o['tipo']='página'; o['pagina']=tit.get(e.get('pagina'),e.get('pagina'))
        elif tp=='AnchorLink': o['tipo']='ancla'; o['pagina']=tit.get(e.get('pagina'),e.get('pagina') or ''); o['ancla']=e.get('anclaNombre') or e.get('ancla','')
        elif tp=='DocumentLink': o['tipo']='documento'; o['doc']=e.get('nombre') or e.get('doc','')
        else: o['tipo']=tp or '?'; o.update({k:v for k,v in e.items() if k in('url','pagina','doc','nombre')})
        out.append(o)
    return out
def item(t):
    o={'texto':t['t']}; e=enlaces(t)
    if e: o['enlaces']=e
    return o
comunes=[]; seen=set(); pags=[]; tot=collections.Counter()
for p in P:
    by=collections.defaultdict(list)
    for t in p['textos']:
        if t['id'] in comunes_ids:
            if t['id'] not in seen: seen.add(t['id']); comunes.append(item(t))
            continue
        by[t['c']].append(t)
    cajas=[]; otros=[]
    for c,ts in by.items():
        k=p['cont'].get(c,{}); ts=sorted(ts,key=lambda t:(t['y'],t['x']))
        if k.get('tipo')=='Container':
            cajas.append({'id':c,'y':k.get('y') if k.get('y') is not None else ts[0]['y'],'x':k.get('x') or 0,'titulo':ts[0]['t'],'titulos':[item(t) for t in ts[1:]], **({'enlacesTitulo':enlaces(ts[0])} if ts[0].get('enl') else {})})
        else: otros+= [dict(item(t),y=t['y']) for t in ts]
    cajas.sort(key=lambda c:(c['y'],c['x'])); otros.sort(key=lambda t:t['y'])
    ocultas=set(p['menus'][0]['ocultas']) if p['menus'] else set()
    anc=sorted([a for a in p['anclas'] if a.get('y') is not None],key=lambda a:a['y'])
    menu=[{'nombre':(a['nombre'] or '').strip(),'visible':bool(p['menus']) and a['id'] not in ocultas,'y':a['y'],'cajas':[]} for a in anc]
    sin=[]
    for c in cajas:
        dest=None
        for m in menu:
            if m['y']<=c['y']+45: dest=m
            else: break
        cc={k:v for k,v in c.items() if k not in('y','x')}
        (dest['cajas'] if dest else sin).append(cc)
    for m in menu: del m['y']
    for o in otros: del o['y']
    pg={'id':p['id'],'titulo':p['titulo'].strip(),'url':'https://www.oscaracademy.org/'+p['uri'],'enMenuDelSitio':not p['oculta'],'tieneMenuInterno':bool(p['menus']),'menu':menu,'cajasSinEntradaDeMenu':sin,'otrosTextos':otros}
    pags.append(pg)
    tot['cajas']+=len(cajas); tot['titulos']+=sum(len(c['titulos']) for c in cajas); tot['entradas']+=len(menu); tot['ocultasMenu']+=sum(1 for m in menu if not m['visible'] and p['menus']); tot['sinEntrada']+=len(sin)
    tot['enlaces']+=sum(len(i.get('enlaces',[])) for c in cajas for i in c['titulos'])
pags.sort(key=lambda p:(not p['tieneMenuInterno'],p['titulo'].lower()))
arbol={'sitio':'oscaracademy.org','generado':raw['generado'],'revisionWix':raw['revision'],'totales':{'paginas':len(pags),'paginasConMenuInterno':sum(p['tieneMenuInterno'] for p in pags),'entradasDeMenu':tot['entradas'],'cajas':tot['cajas'],'titulosEnCajas':tot['titulos'],'titulosConEnlace':tot['enlaces']},'encabezadoYPie':comunes,'paginas':pags}
json.dump(arbol,open('arbol-sitio.json','w'),ensure_ascii=False,indent=1)
# árbol en texto
L=[f"# Árbol del sitio oscaracademy.org",f"",f"Generado: {raw['generado']} · revisión de Wix {raw['revision']}",f"",f"Totales: {arbol['totales']}",""]
def lk(i):
    s=''
    for e in i.get('enlaces',[]):
        s+=' → '+(e.get('url') or ('página «'+str(e.get('pagina'))+'»'+(' ancla «'+e['ancla']+'»' if e.get('ancla') else '')) if e['tipo']!='documento' else 'documento '+str(e.get('doc')))
    return s
for p in pags:
    L.append(f"## {p['titulo']}  ({p['url']})"+('' if p['enMenuDelSitio'] else '  [no aparece en el menú del sitio]'))
    if not p['tieneMenuInterno']: L.append("  (sin menú interno)")
    def caja(c,ind):
        L.append(f"{ind}- CAJA: {c['titulo']}"+lk({'enlaces':c.get('enlacesTitulo',[])}))
        for i in c['titulos']: L.append(f"{ind}    · {i['texto']}{lk(i)}")
    for m in p['menu']:
        L.append(f"  * MENÚ: {m['nombre']}"+('' if m['visible'] or not p['tieneMenuInterno'] else '  [oculta en el menú]'))
        for c in m['cajas']: caja(c,'      ')
    if p['cajasSinEntradaDeMenu']:
        L.append("  * (cajas sin entrada de menú)")
        for c in p['cajasSinEntradaDeMenu']: caja(c,'      ')
    L.append("")
open('arbol-sitio.md','w').write('\n'.join(L))
print(arbol['totales'],dict(tot),len(comunes))
