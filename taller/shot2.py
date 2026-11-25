import os
import asyncio, sys
from playwright.async_api import async_playwright
card, t, hs = sys.argv[1], sys.argv[2], sys.argv[3:]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width':820,'height':900}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        MJ = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vendor', 'mathjax-3.2.2', 'tex-svg.js')
        async def ruta(r):  # las fórmulas se dibujan de verdad: MathJax sale de la copia local (taller/vendor); el resto de internet se corta
            u = r.request.url
            if 'mathjax' in u and u.endswith('tex-svg.js') and os.path.isfile(MJ): await r.fulfill(path=MJ, content_type='application/javascript')
            elif u.startswith('http'): await r.abort()
            else: await r.continue_()
        await pg.route('**/*', ruta)
        await pg.goto('file:///home/claude/oscaracademy-ejercicios/taller/out/'+card); await pg.wait_for_timeout(800)
        for h in hs:
            await pg.evaluate("location.hash='%s'"%h); await pg.wait_for_timeout(400)
            st = await pg.query_selector_all('article:not([hidden]) .stage')
            for k,s in enumerate(st):
                # desde el 23-nov el motor parte la animación cuando queda a la vista: primero se lleva a la vista y recién después se fija el instante t y se redibuja
                await s.scroll_into_view_if_needed(); await pg.wait_for_timeout(700)
                await pg.evaluate("(function(el){OA.insts.forEach(function(i){ if (!el.contains(i.cv)) return; i.pause(); i.apply(%s); i.resize(); i.render(); });})(document.querySelectorAll('article:not([hidden]) .stage')[%d])" % (t, k)); await pg.wait_for_timeout(300)
                await s.screenshot(path='out/s-%s-%d.png'%(h,k))
        print('errs',errs); await b.close()
asyncio.run(main())
