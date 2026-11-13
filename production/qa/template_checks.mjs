// Synthetic fixture: no student worksheet, private registry or conversation data.
import {createRequire} from 'node:module';
import {readFile} from 'node:fs/promises';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
let pw;try{pw=require('playwright')}catch{pw=require(resolve(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES,'playwright'))}
const root=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
const js=await readFile(resolve(root,'production/templates/quiz.js'),'utf8');
const css=await readFile(resolve(root,'production/templates/quiz.css'),'utf8');
const fixture=`<!doctype html><html lang="es"><meta name="viewport" content="width=device-width,initial-scale=1"><style>*{box-sizing:border-box}body{font:16px system-ui;margin:12px}.question{max-width:500px}${css}</style><section class="question" id="q"><h1>Prueba de plantilla</h1><p>Selecciona la igualdad verdadera.</p><label><input type="radio" name="r" value="a">1 + 1 = 3</label><label><input type="radio" name="r" value="b">1 + 1 = 2</label><label><input type="radio" name="r" value="c">1 + 1 = 4</label><button type="button" data-check>Comprobar</button><p role="status"></p></section><script>${js};setupClosingQuestion(document.getElementById('q'),'b','La suma de una unidad y otra unidad es dos.',{a:'Revisa la suma.',c:'Revisa la suma.'});</script></html>`;
const browser=await pw.chromium.launch({headless:true,...(process.env.OA_CHROMIUM_EXECUTABLE?{executablePath:process.env.OA_CHROMIUM_EXECUTABLE}:{})});let count=0;
try{
 for(const width of [390,768,1280]){
  const cx=await browser.newContext({viewport:{width,height:850}}),p=await cx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
  await p.setContent(fixture);
  const selected=p.locator('input[value=b]'),feedback=p.locator('[role=status]');
  await selected.check();let state=await feedback.evaluate(e=>({text:e.textContent,cls:e.className,color:getComputedStyle(e).color}));
  if(!state.text.includes('✓ Correcto.')||!state.cls.includes('good')||!state.text.includes('dos'))throw Error('Correct-answer feedback failed');count++;
  const color=state.color.match(/\d+/g).map(Number);if(color[1]<=color[0]||color[1]<=color[2])throw Error('Feedback not green');count++;
  await p.locator('input[value=a]').check();if((await feedback.getAttribute('class')||'').includes('good'))throw Error('Stale green');count++;
  await selected.focus();await p.keyboard.press('Space');await p.locator('button').click();if(!(await feedback.getAttribute('class')||'').includes('good'))throw Error('Keyboard/button failed');count++;
  const size=await p.evaluate(()=>({sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth}));if(size.sw>size.cw)throw Error('Horizontal overflow');if(errors.length)throw Error(errors.join(';'));count++;
  await p.setContent('<iframe title="Prueba aislada" sandbox="allow-scripts" style="width:95vw;height:750px"></iframe>');await p.locator('iframe').evaluate((e,html)=>e.srcdoc=html,fixture);const f=p.frameLocator('iframe');await f.locator('input[value=b]').check();await f.locator('button').click();if(!(await f.locator('[role=status]').getAttribute('class')||'').includes('good'))throw Error('Script-only sandbox failed');count++;
  await cx.close();
 }
 console.log(JSON.stringify({passed:count,failed:0,scope:'Synthetic shared quiz fixture, Chromium, three widths and script-only iframe'}));
}finally{await browser.close()}
