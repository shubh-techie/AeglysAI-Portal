import test from'node:test';import assert from'node:assert/strict';import{readFileSync,readdirSync}from'node:fs';import{createHash}from'node:crypto';import{join}from'node:path';
const inventory=JSON.parse(readFileSync('src/data/speakingPhotos.generated.json'));const html=readFileSync('dist/speaking/index.html','utf8');
const walk=p=>readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(join(p,e.name)):[join(p,e.name)]);
test('SPEAK001D production contains only discovered optimized assets with correct gallery counts',()=>{
 const expected=new Map(inventory.sources.flatMap(x=>[[x.displayPath,x.displaySHA256],[x.thumbnailPath,x.thumbnailSHA256]]));
 assert.equal(walk('dist/conference').length,expected.size);
 for(const[path,sha]of expected){assert.equal(createHash('sha256').update(readFileSync('public/'+path)).digest('hex'),sha);assert.equal(createHash('sha256').update(readFileSync('dist/'+path)).digest('hex'),sha);}
 for(const[event,photos]of Object.entries(inventory.photos)){
  const card=html.split('<div class="sp-event-grid">')[1].split(`data-speaking-event="${event}"`)[1].split('</article>')[0];assert.equal((card.match(/data-speaking-photo /g)||[]).length,photos.length*2);
  for(const photo of photos){assert.ok(card.includes('/'+photo.assetPath));if(photos.length>1)assert.ok(card.includes('/'+photo.thumbnail.path));const pos=card.indexOf('src="/'+photo.assetPath+'"');const tag=card.slice(pos,card.indexOf('>',pos));assert.ok(tag.includes(`object-fit:${photo.fit}`));}
 }
});
