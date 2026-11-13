import test from'node:test';import assert from'node:assert/strict';import{mkdtemp,mkdir,writeFile,readFile,cp,rm,readdir}from'node:fs/promises';import{resolve,join}from'node:path';import sharp from'sharp';import{createHash}from'node:crypto';
import{discoverSpeakingImages,finalizeConferenceOutput}from'./discover-speaking-images.mjs';
import{normalizeSpeakingMedia,discoveryForHistory}from'./speaking-discovery-preservation.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
const setup=async()=>{const root=await mkdtemp(resolve('.community-drafts/speak001d-auto/discovery-'));await mkdir(join(root,'src/data'),{recursive:true});await cp('src/data/conferenceFolders.json',join(root,'src/data/conferenceFolders.json'));for(const event of['atai-2026','gicite-2026'])await mkdir(join(root,'public/conference',event),{recursive:true});return root;};
const image=await sharp({create:{width:120,height:80,channels:3,background:'#365f70'}}).png().toBuffer();
test('SPEAK001D discovery handles ATAI3→4, GICITE5→6, removal and deterministic mixed-case names',async()=>{
 const root=await setup();for(let i=1;i<=3;i++)await writeFile(join(root,`public/conference/atai-2026/${i}.PnG`),image);for(let i=1;i<=5;i++)await writeFile(join(root,`public/conference/gicite-2026/${i}.PNG`),image);
 const before=await discoverSpeakingImages({root});assert.equal(before.photos['beyond-static-access-control'].length,3);assert.equal(before.photos['gicite-2026-wru-key-talk'].length,5);
 const jpeg=await sharp(image).jpeg().toBuffer();await writeFile(join(root,'public/conference/atai-2026/4.JpEg'),jpeg);await writeFile(join(root,'public/conference/gicite-2026/6.JpG'),jpeg);
 const after=await discoverSpeakingImages({root});assert.equal(after.photos['beyond-static-access-control'].length,4);assert.equal(after.photos['gicite-2026-wru-key-talk'].length,6);assert.equal(sha(await readFile(join(root,'public/conference/atai-2026/4.JpEg'))),sha(jpeg));
 assert.deepEqual(after.sources.filter(x=>x.folder==='gicite-2026').map(x=>x.filename),['1.PNG','2.PNG','3.PNG','4.PNG','5.PNG','6.JpG']);
 await rm(join(root,'public/conference/atai-2026/2.PnG'));assert.equal((await discoverSpeakingImages({root})).photos['beyond-static-access-control'].length,3);
 assert.deepEqual((await discoverSpeakingImages({root})).photos,(await discoverSpeakingImages({root})).photos,'Generated outputs are not rediscovered or counted twice');
});
test('SPEAK001D validates actual decoded type, rejects corruption and ignores unknown publication folders',async()=>{
 const root=await setup();await mkdir(join(root,'public/conference/unknown'),{recursive:true});await writeFile(join(root,'public/conference/unknown/unapproved.jpg'),Buffer.from('not an image'));await writeFile(join(root,'public/conference/atai-2026/approved.WeBp'),await sharp(image).webp().toBuffer());
 const result=await discoverSpeakingImages({root});assert.equal(result.sources.length,1);assert.equal(result.sources[0].format,'webp');assert.equal(result.photos['etic-2026'].length,0);
 for(const bytes of[Buffer.from('not a JPEG'),image.subarray(0,40),Buffer.from('<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"></svg>')]){await writeFile(join(root,'public/conference/atai-2026/invalid.jpg'),bytes);await assert.rejects(discoverSpeakingImages({root}));}await rm(join(root,'public/conference/atai-2026/invalid.jpg'));
 await cp(join(root,'public'),join(root,'dist'),{recursive:true});await finalizeConferenceOutput({root});const output=await readdir(join(root,'dist/conference'));assert.deepEqual(output,['_generated']);assert.ok((await readdir(join(root,'public/conference'))).includes('unknown'),'Source originals remain unchanged');
});
test('SPEAK001D dynamic historical projection permits only six gallery interiors and exact build script changes',async()=>{
 const html=await readFile('dist/speaking/index.html','utf8');assert.ok(normalizeSpeakingMedia(html).includes('approved-conference-media-5'));
 assert.doesNotThrow(()=>discoveryForHistory('dist/speaking/index.html',html));assert.throws(()=>discoveryForHistory('dist/speaking/index.html',html.replace('Research,','UNAPPROVED')));
 const packageBytes=await readFile('package.json');assert.doesNotThrow(()=>discoveryForHistory('package.json',packageBytes));assert.throws(()=>discoveryForHistory('package.json',Buffer.concat([packageBytes,Buffer.from(' ')])));
});
test('SPEAK001D strips optimized metadata without modifying original publication inputs',async()=>{
 const root=await setup();const original=await sharp(image).jpeg().withMetadata().toBuffer();const path=join(root,'public/conference/atai-2026/camera.JPG');await writeFile(path,original);const result=await discoverSpeakingImages({root});assert.equal(sha(await readFile(path)),sha(original));assert.equal(result.sources[0].sourceHasMetadata,true);const display=await sharp(await readFile(join(root,'public',result.sources[0].displayPath))).metadata();assert.ok(!display.exif&&!display.xmp&&!display.iptc);
});
test('SPEAK001D real Astro builds reflect 3/5→4/6→3/5 without image-array or preservation-pin edits',async()=>{
 const {spawnSync}=await import('node:child_process');const root=await mkdtemp(resolve('.community-drafts/speak001d-auto/render-'));
 for(const dir of['src','scripts','public'])await cp(dir,join(root,dir),{recursive:true});
 for(const file of['package.json','package-lock.json','astro.config.mjs','tsconfig.json'])await cp(file,join(root,file));
 const{symlink}=await import('node:fs/promises');await symlink(resolve('node_modules'),join(root,'node_modules'),'dir');
 for(const folder of['atai-2026','gicite-2026','etic-2026','_generated'])await rm(join(root,'public/conference',folder),{recursive:true,force:true});
 for(const[folder,count]of[['atai-2026',3],['gicite-2026',5]]){await mkdir(join(root,'public/conference',folder),{recursive:true});for(let i=1;i<=count;i++)await writeFile(join(root,`public/conference/${folder}/${i}.PNG`),image);}
 const build=async(a,g)=>{const result=spawnSync('npm',['run','build'],{cwd:root,encoding:'utf8',timeout:90000,maxBuffer:2*1024*1024,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});assert.equal(result.status,0,result.stdout+result.stderr);const html=await readFile(join(root,'dist/speaking/index.html'),'utf8');for(const[id,count]of[['beyond-static-access-control',a],['gicite-2026-wru-key-talk',g]]){const card=html.split('<div class="sp-event-grid">')[1].split(`data-speaking-event="${id}"`)[1].split('</article>')[0];assert.equal((card.match(/data-speaking-photo /g)||[]).length,count*2);assert.ok(card.includes(`>1 / ${count}</span>`));assert.equal((card.match(/data-carousel-select=/g)||[]).length,count);assert.ok(card.includes(`data-preview-count=\"${Math.min(count,4)}\"`),'Tile collage adapts to count while all photos remain in gallery');}assert.doesNotThrow(()=>discoveryForHistory('dist/speaking/index.html',html));};
 await build(3,5);await writeFile(join(root,'public/conference/atai-2026/4.JpG'),await sharp(image).jpeg().toBuffer());await writeFile(join(root,'public/conference/gicite-2026/6.WeBp'),await sharp(image).webp().toBuffer());await build(4,6);
 await rm(join(root,'public/conference/atai-2026/2.PNG'));await rm(join(root,'public/conference/gicite-2026/6.WeBp'));await build(3,5);
 await rm(join(root,'public/conference/atai-2026/1.PNG'));await build(2,5);
});
test('SPEAK001E explicit owner folder aliases map safely, including case-insensitive filesystems',async()=>{
 const root=await setup();await mkdir(join(root,'public/conference/ATAI 2026'));await mkdir(join(root,'public/conference/GICITE_2026'));await mkdir(join(root,'public/conference/ETIC-2026'));
 await writeFile(join(root,'public/conference/ATAI 2026/a.JPG'),await sharp(image).jpeg().toBuffer());await writeFile(join(root,'public/conference/GICITE_2026/g.PNG'),image);await writeFile(join(root,'public/conference/ETIC-2026/e.WeBp'),await sharp(image).webp().toBuffer());
 const data=await discoverSpeakingImages({root});assert.equal(data.photos['beyond-static-access-control'].length,1);assert.equal(data.photos['gicite-2026-wru-key-talk'].length,1);assert.equal(data.photos['etic-2026'].length,1);assert.equal(data.sources.length,3);
});
test('SPEAK001F a future approved event and photo directory render without Astro edits; draft and unknown folders do not publish',async()=>{
 const {spawnSync}=await import('node:child_process');const root=await mkdtemp(resolve('.community-drafts/speak001d-auto/future-'));
 for(const dir of['src','scripts','public'])await cp(dir,join(root,dir),{recursive:true});for(const file of['package.json','package-lock.json','astro.config.mjs','tsconfig.json'])await cp(file,join(root,file));
 const{symlink,appendFile}=await import('node:fs/promises');await symlink(resolve('node_modules'),join(root,'node_modules'),'dir');
 const policyPath=join(root,'src/data/conferenceFolders.json'),policy=JSON.parse(await readFile(policyPath,'utf8'));
 policy.folders.push({folder:'future-fixture',eventId:'future-fixture',name:'Future fixture',sourceUrl:'https://example.org/event',credit:'Synthetic fixture',publicationReady:true});
 policy.folders.push({folder:'rejected-fixture',eventId:'rejected-fixture',name:'Rejected fixture',sourceUrl:'https://example.org/event',credit:'Synthetic fixture',publicationReady:false});
 await writeFile(policyPath,JSON.stringify(policy));for(const folder of['future-fixture','rejected-fixture','unknown-future']){await mkdir(join(root,'public/conference',folder),{recursive:true});await writeFile(join(root,'public/conference',folder,'01.PnG'),image);}
 await appendFile(join(root,'src/data/presentations.ts'),`\npresentations.push({...presentations[0],slug:'future-fixture',title:'Synthetic future conference',featured:false,conference:{...presentations[0].conference!,name:'Synthetic future conference',shortName:'Future fixture'}});\npresentations.push({...presentations[0],slug:'unapproved-future',title:'Unapproved fixture',publicationStatus:'DRAFT',approvedForPublication:false,featured:false});\n`);
 const run=spawnSync('npm',['run','build'],{cwd:root,encoding:'utf8',timeout:90000,maxBuffer:2*1024*1024,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});assert.equal(run.status,0,run.stdout+run.stderr);
 const html=await readFile(join(root,'dist/speaking/index.html'),'utf8');assert.ok(html.includes('data-speaking-event="future-fixture"'));assert.ok(!html.includes('data-speaking-event="unapproved-future"'));assert.ok(!html.includes('data-speaking-event="rejected-fixture"'));
 const inventory=JSON.parse(await readFile(join(root,'src/data/speakingPhotos.generated.json'),'utf8'));assert.equal(inventory.photos['future-fixture'].length,1);assert.equal(inventory.photos['rejected-fixture'],undefined);assert.ok(!inventory.sources.some(s=>s.folder==='unknown-future'));
 assert.ok((await readdir(join(root,'dist/conference/_generated'))).includes('future-fixture'));
});
test('SPEAK001H approved hyphenated owner folders support natural filename ordering without code edits',async()=>{
 const root=await setup();for(const folder of['ATAI-2026','GICITE-2026','ETIC-2026']){
  // On case-insensitive hosts the canonical spelling already exists; use its actual spelling.
  const actual=(await readdir(join(root,'public/conference'))).find(n=>n.toLowerCase()===folder.toLowerCase())??folder;
  await mkdir(join(root,'public/conference',actual),{recursive:true});for(const n of[10,2,1])await writeFile(join(root,'public/conference',actual,`photo-${n}.JpG`),await sharp(image).jpeg().toBuffer());
 }
 const result=await discoverSpeakingImages({root});for(const event of ['beyond-static-access-control','gicite-2026-wru-key-talk','etic-2026'])assert.equal(result.photos[event].length,3);
 for(const folder of['atai-2026','gicite-2026','etic-2026'])assert.deepEqual(result.sources.filter(s=>s.folder===folder).map(s=>s.filename),['photo-1.JpG','photo-2.JpG','photo-10.JpG']);
});
