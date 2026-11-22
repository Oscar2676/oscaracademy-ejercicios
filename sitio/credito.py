#!/usr/bin/env python3
"""Pone «Creado por Oscar Morales León asistido por IA.» al pie de cada hoja y bajo cada animación.
Pedido de Óscar (22-nov-2026). Idempotente: se puede correr las veces que haga falta.
Uso: python3 sitio/credito.py [archivos...]   (sin argumentos: todas las hojas publicadas */lote*/*.html)"""
import glob, re, sys
TXT = 'Creado por Oscar Morales León asistido por IA.'
EST = 'display:block;text-align:right;font-size:.82em;color:#6b6b6b;margin:.35em 0 0'
P = '<p class="oa-credito" style="%s">%s</p>' % (EST, TXT)
SP = '<span class="oa-credito" style="%s">%s</span>' % (EST, TXT)
STAGE = re.compile(r'(<div class="stage"[^>]*></div>)(?!\s*<p class="oa-credito")')
def poner(s):
    s = STAGE.sub(lambda m: m.group(1) + '\n' + P, s)
    def pie(m):
        return m.group(0) if 'oa-credito' in m.group(0) else m.group(1) + '  ' + SP + '\n' + m.group(2)
    s2, n = re.subn(r'(<footer\b[^>]*>.*?)(</footer>)', pie, s, flags=re.S)
    if n: return s2
    if re.search(r'oa-credito"[^>]*>[^<]*</p>\s*</(article|body)>', s): return s
    for fin in ('</article>', '</body>'):
        if fin in s:
            i = s.rindex(fin); return s[:i] + P + '\n' + s[i:]
    return s
if __name__ == '__main__':
    fs = sys.argv[1:] or sorted(glob.glob('*/lote*/*.html'))
    n = 0
    for f in fs:
        s = open(f, encoding='utf8').read(); t = poner(s)
        if t != s: open(f, 'w', encoding='utf8').write(t); n += 1
    print('credito: %d de %d archivos cambiados' % (n, len(fs)))
