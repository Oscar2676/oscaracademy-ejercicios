#!/usr/bin/env python3
"""Vista «hoja -> títulos que la abren» de oscaracademy.org.

Recorre las páginas públicas del sitio, busca los enlaces a las hojas (oscaracademy-ejercicios)
y escribe sitio/enlaces.json y sitio/enlaces.html. No necesita el editor de Wix ni a Claude:
lo ejecuta GitHub solo, todos los días (ver .github/workflows/enlaces.yml).

  python3 sitio/enlaces.py                 recorre el sitio en vivo
  python3 sitio/enlaces.py --desde-datos   usa sitio/datos-wix.json (copia del editor), sin red
"""
import sys, re, json, html, pathlib, datetime, urllib.request, urllib.parse
from html.parser import HTMLParser

AQUI = pathlib.Path(__file__).resolve().parent
REPO = AQUI.parent
SITIO = 'https://www.oscaracademy.org'
BASE = 'oscar2676.github.io/oscaracademy-ejercicios/'
UA = {'User-Agent': 'Mozilla/5.0 (compatible; OscarAcademy-enlaces/1.0; +https://github.com/Oscar2676/oscaracademy-ejercicios)'}


def traer(url, intentos=3):
    partes = urllib.parse.urlsplit(url)
    url = urllib.parse.urlunsplit((partes.scheme, partes.netloc, urllib.parse.quote(urllib.parse.unquote(partes.path), safe='/%'), partes.query, ''))
    ultimo = None
    for _ in range(intentos):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
                return r.read().decode('utf-8', 'replace')
        except Exception as e:  # se reintenta
            ultimo = e
    raise ultimo


class Enlaces(HTMLParser):
    """Junta el texto de cada <a> que apunta a una hoja, y el <title> de la página."""
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.salida, self.href, self.txt, self.titulo, self.en_titulo = [], None, [], '', False

    def handle_starttag(self, tag, attrs):
        if tag == 'title':
            self.en_titulo = True
        if tag == 'a':
            h = dict(attrs).get('href') or ''
            if BASE in h.lower():
                self.href, self.txt = h, []

    def handle_endtag(self, tag):
        if tag == 'title':
            self.en_titulo = False
        if tag == 'a' and self.href:
            t = re.sub(r'\s+', ' ', ''.join(self.txt)).strip()
            self.salida.append((t, self.href))
            self.href = None

    def handle_data(self, data):
        if self.en_titulo:
            self.titulo += data
        if self.href:
            self.txt.append(data)


def paginas_del_sitio():
    """Direcciones de las páginas: mapa del sitio de Wix más las de la última copia del editor."""
    urls = {}
    try:
        idx = traer(SITIO + '/sitemap.xml')
        mapas = re.findall(r'<loc>\s*([^<]+?)\s*</loc>', idx)
        for m in mapas:
            if m.endswith('.xml'):
                for u in re.findall(r'<loc>\s*([^<]+?)\s*</loc>', traer(html.unescape(m))):
                    urls[urllib.parse.unquote(html.unescape(u)).rstrip('/')] = None
            else:
                urls[urllib.parse.unquote(html.unescape(m)).rstrip('/')] = None
    except Exception as e:
        print('sin mapa del sitio:', e)
    try:
        for p in json.loads((AQUI / 'datos-wix.json').read_text(encoding='utf-8'))['paginas']:
            if p.get('uri'):
                urls.setdefault((SITIO + '/' + p['uri']).rstrip('/'), p.get('titulo'))
    except Exception as e:
        print('sin datos-wix.json:', e)
    return urls


def recorrer():
    filas, fallas, urls = [], [], paginas_del_sitio()
    for u, tit in sorted(urls.items()):
        try:
            p = Enlaces(); p.feed(traer(u))
        except Exception as e:
            fallas.append((u, str(e))); continue
        nombre = re.sub(r'\s*\|\s*Oscar Academy\s*$', '', p.titulo.strip()) or tit or u.rsplit('/', 1)[-1]
        for t, h in p.salida:
            filas.append({'pagina': nombre.strip(), 'url_pagina': u, 'titulo': t, 'hoja': h})
    print('páginas:', len(urls), 'con falla:', len(fallas), 'enlaces:', len(filas))
    if not urls or len(fallas) > len(urls) / 4:
        sys.exit('demasiadas páginas sin respuesta; no se actualiza la vista: ' + repr(fallas[:3]))
    return filas, len(urls), 'sitio en vivo'


def desde_datos():
    d = json.loads((AQUI / 'datos-wix.json').read_text(encoding='utf-8'))
    filas = []
    for p in d['paginas']:
        for t in p['textos']:
            for e in t.get('enl', []):
                if BASE in (e.get('url') or '').lower():
                    filas.append({'pagina': p['titulo'].strip(), 'url_pagina': SITIO + '/' + p['uri'], 'titulo': e['texto'], 'hoja': e['url']})
    return filas, len(d['paginas']), 'copia del editor de Wix, revisión %s' % d.get('revision')


def datos_de_hoja(url):
    rel = re.split(BASE, url, flags=re.I)[-1].split('#')[0].split('?')[0]
    f = REPO / urllib.parse.unquote(rel)
    info = {'archivo': urllib.parse.unquote(rel), 'nombre': '', 'estado': '', 'existe': f.is_file()}
    if info['existe']:
        s = f.read_text(encoding='utf-8', errors='replace')
        m = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S)
        info['nombre'] = html.unescape(re.sub(r'<[^>]+>', '', m.group(1))).strip() if m else ''
        m = re.search(r'class="status"[^>]*>(.*?)<', s, re.S)
        info['estado'] = html.unescape(m.group(1)).strip() if m else ''
        if not info['nombre']:
            m = re.search(r'<title>(.*?)</title>', s, re.S)
            info['nombre'] = html.unescape(m.group(1)).split('|')[0].strip() if m else ''
    return info


def pagina_html(hojas, resumen):
    e = html.escape
    bloques = []
    for h in hojas:
        filas = ''.join('<li><a href="%s" target="_blank" rel="noopener">%s</a> › %s</li>' % (e(urllib.parse.quote(t['url_pagina'], safe=':/%')), e(t['pagina']), e(t['titulo'])) for t in h['titulos'])
        aviso = '' if h['existe'] else ' <span class="mal">el archivo no está en el repositorio</span>'
        bloques.append('<section class="hoja"><h2><a href="%s" target="_blank" rel="noopener">%s</a></h2><p class="meta">%s · %s%s</p><p class="n">%d %s en %d %s</p><ul>%s</ul></section>' % (
            e(h['url']), e(h['nombre'] or h['archivo']), e(h['archivo']), e(h['estado'] or 'sin estado'), aviso,
            len(h['titulos']), 'título la abre' if len(h['titulos']) == 1 else 'títulos la abren',
            h['paginas'], 'página' if h['paginas'] == 1 else 'páginas', filas))
    return '''<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Hojas y títulos que las abren | Oscar Academy</title>
<style>
:root{--bg:#fff;--ink:#241a1c;--muted:#6d5f62;--line:#e4d9db;--brand:#8a1f2d;--soft:#f7f3f4}
@media (prefers-color-scheme:dark){:root{--bg:#171213;--ink:#f1e9ea;--muted:#b3a4a7;--line:#3a2e31;--brand:#e58a96;--soft:#211a1c}}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "Source Sans 3","Segoe UI",system-ui,sans-serif}
main{max-width:860px;margin:0 auto;padding:24px 16px 60px}
h1{font-size:1.6rem;margin:0 0 6px}h2{font-size:1.1rem;margin:0}a{color:var(--brand)}
.res{color:var(--muted);margin:0 0 16px}
input{width:100%%;box-sizing:border-box;font:inherit;padding:10px 12px;border:1px solid var(--line);border-radius:6px;background:var(--bg);color:var(--ink);margin-bottom:18px}
.hoja{border:1px solid var(--line);border-radius:6px;background:var(--soft);padding:12px 16px;margin-bottom:12px}
.meta{color:var(--muted);font-size:.86rem;margin:2px 0 6px;word-break:break-all}.n{font-weight:600;margin:0 0 4px}
ul{margin:0;padding-left:1.2em}.mal{color:#b00020;font-weight:600}
</style></head><body><main>
<h1>Hojas y títulos que las abren</h1>
<p class="res">%s</p>
<input id="q" type="search" placeholder="Buscar por hoja, página o título" aria-label="Buscar">
<div id="lista">%s</div>
</main>
<script>
(function(){var q=document.getElementById('q'),s=[].slice.call(document.querySelectorAll('.hoja'));
function n(t){return t.toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');}
q.addEventListener('input',function(){var v=n(q.value.trim());s.forEach(function(x){x.hidden=v&&n(x.textContent).indexOf(v)<0;});});})();
</script></body></html>
''' % (e(resumen), '\n'.join(bloques))


def main():
    filas, npag, origen = desde_datos() if '--desde-datos' in sys.argv else recorrer()
    por = {}
    for f in filas:
        por.setdefault(f['hoja'].split('#')[0], []).append(f)
    hojas = []
    for url, ts in por.items():
        vistos, unicos = set(), []
        for t in sorted(ts, key=lambda t: (t['pagina'].lower(), t['titulo'].lower())):
            k = (t['pagina'], t['titulo'])
            if k not in vistos:
                vistos.add(k); unicos.append({k2: t[k2] for k2 in ('pagina', 'url_pagina', 'titulo')})
        h = datos_de_hoja(url); h.update({'url': url, 'titulos': unicos, 'paginas': len({t['pagina'] for t in unicos})})
        hojas.append(h)
    hojas.sort(key=lambda h: h['archivo'].lower())
    ahora = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=-3))).strftime('%d-%m-%Y %H:%M')
    resumen = '%d hojas enlazadas desde %d títulos, en %d páginas revisadas. Actualizado el %s (hora de Chile). Origen: %s.' % (
        len(hojas), sum(len(h['titulos']) for h in hojas), npag, ahora, origen)
    (AQUI / 'enlaces.json').write_text(json.dumps({'actualizado': ahora, 'origen': origen, 'hojas': hojas}, ensure_ascii=False, indent=1), encoding='utf-8')
    (AQUI / 'enlaces.html').write_text(pagina_html(hojas, resumen), encoding='utf-8')
    print(resumen)


if __name__ == '__main__':
    main()
