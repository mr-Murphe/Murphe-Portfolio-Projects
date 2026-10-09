const {firefox,webkit}=require('playwright');
const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..'),states=['default','urgent','mothers_day_discovery','secret_admirer'];
const out={accessibility:[],keyboard:[],resilience:[],performance:[]};
const server=http.createServer((req,res)=>{const name=new URL(req.url,'http://test').pathname;const file=path.join(root,name==='/'?'index.html':name);if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end('Missing');return;}res.setHeader('Content-Type',/\.m?js$/.test(file)?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.webp')?'image/webp':'text/html');res.end(fs.readFileSync(file));});
(async()=>{
 await new Promise(r=>server.listen(8767,'127.0.0.1',r));const url='http://127.0.0.1:8767/';
 for(const name of ['chromium','firefox','webkit']){
  const browser=await require('./runtime.cjs').launchBrowser(name);
  for(const width of [1440,390]){
   const ctx=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'}),p=await ctx.newPage();
   await p.goto(url);await p.locator('html.js-ready').waitFor();await p.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   for(const state of states){
    await p.locator(`[data-mission="${state}"]`).first().click();
    const result=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}});return {violations:r.violations.map(v=>v.id),incomplete:r.incomplete.map(v=>v.id),passes:r.passes.length};});
    out.accessibility.push({browser:name,width,state,...result});assert.deepEqual(result.violations,[]);
    const snapshot=await p.locator('main').ariaSnapshot();assert.match(snapshot,/heading .*level=1/);assert.match(snapshot,/button "Just browsing"/);
    if(name==='chromium'&&width===390)fs.writeFileSync(path.join(root,'docs',`accessibility-${state}.txt`),snapshot);
   }
   await p.goto(url);await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.className),'skip');await p.keyboard.press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.id),'main');
   const mission=p.getByRole('button',{name:'Secret Admirer',exact:true});await mission.focus();await p.keyboard.press('Space');assert.equal(await mission.getAttribute('aria-pressed'),'true');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Secret Admirer');
   const special=p.getByRole('button',{name:'Explore the special journey'});await special.focus();await p.keyboard.press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Explore the special journey');
   await p.getByRole('button',{name:'Choose standard gifting'}).focus();await p.keyboard.press('Enter');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Choose standard gifting');
   const summary=p.locator('#faq summary').first();await summary.focus();await p.keyboard.press('Enter');assert.equal(await summary.locator('..').getAttribute('open'),'');
   await p.goto(url+'product-pf-01.html');await p.locator('#add-cart').focus();await p.keyboard.press('Enter');assert.match(await p.locator('#cart-feedback').textContent(),/Added/);await p.goto(url+'cart.html');await p.getByRole('button',{name:/Increase quantity/}).focus();await p.keyboard.press('Enter');assert.match(await p.locator('#cart-total').textContent(),/30.00/);assert.match(await p.evaluate(()=>document.activeElement.getAttribute('aria-label')),/Increase/);await p.keyboard.press('Enter');assert.match(await p.locator('#cart-total').textContent(),/45.00/);await p.getByRole('button',{name:/Remove item/}).focus();await p.keyboard.press('Enter');assert.match(await p.locator('#cart-lines').textContent(),/empty/);assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Keep exploring');
   out.keyboard.push({browser:name,width,status:'passed',checks:'skip link, mission Enter/Space and moved-section focus, FAQ disclosure, repeated cart quantity/removal and focus recovery'});
   await p.goto(url);await p.evaluate(()=>document.body.style.zoom=2);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);await p.evaluate(()=>document.body.style.zoom=1);
   await ctx.close();
  }
  const ctx=await browser.newContext(),p=await ctx.newPage();
  for(const data of ['null','{','{"unexpected":true}']){
   await p.route('**/*.html',async route=>{const response=await route.fetch();const body=(await response.text()).replace(/(<script id="catalog-data" type="application\/json">)[\s\S]*?(<\/script>)/,(_,a,b)=>a+data+b);await route.fulfill({response,body});});
   await p.goto(url+'product-pf-01.html');await p.locator('#add-cart').click();assert.match(await p.locator('#cart-feedback').textContent(),/unavailable/);await p.goto(url+'cart.html');assert.match(await p.locator('#cart-total').textContent(),/0.00/);await p.unroute('**/*.html');
  }
  await p.route('**/assets/engine.mjs',r=>r.abort());await p.goto(url+'product-pf-01.html');await p.locator('#add-cart').click();await p.goto(url+'cart.html');assert.match(await p.locator('#cart-total').textContent(),/15.00/);await p.unroute('**/assets/engine.mjs');
  await p.goto(url+'index.html?pf_mission=urgent&pf_mission=discovery');assert.match(await p.locator('#rule-trace').textContent(),/State: default/);
  await p.getByRole('button',{name:'Need it soon',exact:true}).click();await p.locator('#presenter summary').click();for(const [value,count] of [['2026-10-09T10:59:00-04:00',true],['2026-10-09T11:00:00-04:00',false],['2026-10-09T11:01:00-04:00',false],['invalid',false]]){await p.selectOption('#clock',value);assert.equal((await p.locator('.card:visible').count())>0,count);}
  await p.getByRole('button',{name:'Just browsing',exact:true}).click();await p.selectOption('#mode','pickup');const event=await p.locator('#events').textContent();assert.match(event,/pf_fulfillment_selected/);assert.doesNotMatch(event,/pf_mission=|@example|utm_|recipient|referrer/);
  out.resilience.push({browser:name,status:'passed',checks:'null/object/malformed catalog, actual engine request abort preserves bag, duplicate campaign, cutoff three boundaries, invalid time, local event hygiene'});
  await ctx.close();
  if(name==='chromium')for(let run=1;run<=3;run++){
   const ctx=await browser.newContext({viewport:{width:390,height:844}}),p=await ctx.newPage(),cdp=await ctx.newCDPSession(p);
   await cdp.send('Network.enable');await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:150,downloadThroughput:200000,uploadThroughput:93750});await cdp.send('Emulation.setCPUThrottlingRate',{rate:4});
   await ctx.addInitScript(()=>{window.__vitals={lcp:0,cls:0,events:[]};for(const [type,options,collect] of [['largest-contentful-paint',{},e=>window.__vitals.lcp=e.startTime],['layout-shift',{},e=>{if(!e.hadRecentInput)window.__vitals.cls+=e.value;}],['event',{durationThreshold:16},e=>{if(e.interactionId)window.__vitals.events.push({name:e.name,duration:e.duration});}]])new PerformanceObserver(l=>l.getEntries().forEach(collect)).observe({type,buffered:true,...options});});
   await p.goto(url);await p.locator('html.js-ready').waitFor();await p.locator('.hero img').evaluate(img=>img.decode());await p.waitForTimeout(400);const load=await p.evaluate(()=>({...window.__vitals,bytes:performance.getEntriesByType('resource').reduce((n,e)=>n+e.transferSize,0)}));
   for(const state of states)await p.locator(`[data-mission="${state}"]`).first().click();await p.waitForTimeout(150);const interaction=await p.evaluate(()=>window.__vitals.events);out.performance.push({run,profile:'cold local origin, mobile 390x844, 150ms latency, 1.6Mbps down, 4x CPU',lcp_ms:load.lcp,cls:load.cls,transfer_bytes:load.bytes,interaction_max_ms:Math.max(0,...interaction.map(e=>e.duration)),interaction_count:interaction.length});assert.ok(load.lcp>0&&load.lcp<=2500,JSON.stringify(load));assert.ok(load.cls<=.1,JSON.stringify(load));assert.ok(interaction.length>0);assert.ok(Math.max(...interaction.map(e=>e.duration))<=200);await ctx.close();
  }
  await browser.close();
 }
 fs.writeFileSync(path.join(root,'docs/release-results.json'),JSON.stringify(out,null,2));console.log(JSON.stringify(out,null,2));
})().catch(e=>{console.error(e);process.exit(1);}).finally(()=>server.close());
