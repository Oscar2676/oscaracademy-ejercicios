const {test,expect}=require('@playwright/test');
const fs=require('node:fs');
const path=require('node:path');
for(const id of ['T01','T02','T03','T04'])for(const width of [390,768,1280])for(const sandbox of [false,true]){
 test(`${id} ${width}px ${sandbox?'iframe':'directo'}`,async({page})=>{
  await page.setViewportSize({width,height:900});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  const html=fs.readFileSync(path.join(process.cwd(),'trigonometria/lote01',`demostracion_${id}_v004.html`),'utf8');
  let scope=page;
  if(sandbox){await page.setContent('<iframe title="ejercicio" sandbox="allow-scripts" style="width:100%;height:850px;border:0"></iframe>');await page.locator('iframe').evaluate((frame,content)=>frame.srcdoc=content,html);scope=page.frameLocator('iframe');}
  else await page.setContent(html);
  const form=scope.locator('#quiz'),out=scope.locator('#quiz-result'),button=form.locator('button.primary');
  await expect(button).toHaveAttribute('type','button');
  await button.click();await expect(out).toHaveText('Elige una respuesta antes de comprobar.');
  for(const option of ['0','1','2','0','2','0']){
   await form.locator(`input[value="${option}"]`).check();
   await expect(out).toHaveText('');await expect(form.locator('.quiz-correct')).toHaveCount(0);
   await button.click();
   if(option==='0'){
    await expect(out).toHaveClass(/good/);await expect(out).toContainText('✓');await expect(form.locator('.quiz-correct')).toHaveCount(1);
    await expect(out).toHaveCSS('background-color','rgb(231, 244, 235)');
   }else{await expect(out).not.toHaveClass(/good/);await expect(out).not.toHaveText('');await expect(form.locator('.quiz-correct')).toHaveCount(0);}
  }
  await form.locator('input[value="1"]').check();await button.focus();await page.keyboard.press('Enter');await expect(out).not.toHaveText('');
  const overflow=await form.evaluate(()=>document.documentElement.scrollWidth>window.innerWidth+1);expect(overflow).toBe(false);
  expect(errors).toEqual([]);
 });
}
