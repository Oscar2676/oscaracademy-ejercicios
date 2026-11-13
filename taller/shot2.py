import asyncio, sys
from playwright.async_api import async_playwright
card, t, hs = sys.argv[1], sys.argv[2], sys.argv[3:]
async def main():
    async with async_playwright() as p:
        b = await p.chromium.launch(executable_path='/usr/bin/google-chrome', args=['--no-sandbox'])
        pg = await b.new_page(viewport={'width':820,'height':900}); errs=[]
        pg.on('pageerror', lambda e: errs.append(str(e)))
        await pg.route('**/*', lambda r: r.abort() if r.request.url.startswith('http') else r.continue_())
        await pg.goto('file:///home/claude/oscaracademy-ejercicios/taller/out/'+card); await pg.wait_for_timeout(800)
        for h in hs:
            await pg.evaluate("location.hash='%s'"%h); await pg.wait_for_timeout(400)
            await pg.evaluate("OA.insts.forEach(function(i){i.pause(); i.apply(%s); i.resize();})" % t); await pg.wait_for_timeout(300)
            st = await pg.query_selector_all('article:not([hidden]) .stage')
            for k,s in enumerate(st): await s.screenshot(path='out/s-%s-%d.png'%(h,k))
        print('errs',errs); await b.close()
asyncio.run(main())
