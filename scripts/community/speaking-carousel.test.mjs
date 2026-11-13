import test from'node:test';import assert from'node:assert/strict';
import{mkdtemp,mkdir,readFile,writeFile,cp,symlink,access}from'node:fs/promises';import{resolve,join}from'node:path';import{spawnSync}from'node:child_process';import{createHash}from'node:crypto';
import{prepareSpeakingThumbnails}from'./cache-speaking-thumbnails.mjs';
const digest=b=>createHash('sha256').update(b).digest('hex');
const setup=async()=>{await mkdir(resolve('.community-drafts/speak001i'),{recursive:true});const root=await mkdtemp(resolve('.community-drafts/speak001i/cache-'));await mkdir(join(root,'src/data'),{recursive:true});await mkdir(join(root,'docs/speaking'),{recursive:true});await cp('src/data/speakingRecordings.json',join(root,'src/data/speakingRecordings.json'));await cp('src/assets/speaking-videos',join(root,'src/assets/speaking-videos'),{recursive:true});await cp('docs/speaking/SPEAK-001A-THUMBNAILS.json',join(root,'docs/speaking/SPEAK-001A-THUMBNAILS.json'));return root;};
test('SPEAK001I fifth approved record automatically resolves its thumbnail and real Astro carousel without component edits',async()=>{
 const root=await setup();for(const dir of['src','scripts','public'])await cp(dir,join(root,dir),{recursive:true});for(const file of['package.json','package-lock.json','astro.config.mjs','tsconfig.json'])await cp(file,join(root,file));await symlink(resolve('node_modules'),join(root,'node_modules'),'dir');
 const config=JSON.parse(await readFile(join(root,'src/data/speakingRecordings.json'),'utf8'));config.push({id:'https://www.youtube.com/watch?v=fixture0001',title:'Synthetic fifth recording — private test only',category:'Test fixture',description:'Configuration fixture, never published.',publicationApproved:true});await writeFile(join(root,'src/data/speakingRecordings.json'),JSON.stringify(config));
 const thumbnail=await readFile('src/assets/speaking-videos/Uw6hD61RqNM.jpg');let calls=0;
 const manifest=await prepareSpeakingThumbnails({root,mode:'sync',fetcher:async url=>{calls++;assert.equal(url,'https://i.ytimg.com/vi/fixture0001/hqdefault.jpg');return new Response(thumbnail,{headers:{'content-type':'image/jpeg'}});}});
 assert.equal(calls,1);assert.equal(manifest.length,5);assert.equal(digest(await readFile(join(root,'src/assets/speaking-videos/fixture0001.jpg'))),digest(thumbnail));
 await prepareSpeakingThumbnails({root,mode:'verify',fetcher:()=>{throw Error('Verification must stay offline');}});
 const componentBefore=await readFile(join(root,'src/components/speaking/showcase/VideoCarousel.astro'));
 const run=spawnSync('npm',['run','build'],{cwd:root,encoding:'utf8',timeout:90000,maxBuffer:3*1024*1024,env:{...process.env,ASTRO_TELEMETRY_DISABLED:'1'}});assert.equal(run.status,0,run.stdout+run.stderr);
 const html=await readFile(join(root,'dist/speaking/index.html'),'utf8');assert.equal((html.match(/data-recording-id=/g)||[]).length,5);assert.equal((html.match(/data-video-slide /g)||[]).length,5);assert.ok(html.includes('data-recording-id="fixture0001"'));assert.ok(html.includes('Synthetic fifth recording'));assert.deepEqual(await readFile(join(root,'src/components/speaking/showcase/VideoCarousel.astro')),componentBefore);
 await writeFile('.community-drafts/speak001i/fifth-fixture-path.txt',root+'\n');
});
test('SPEAK001I unavailable/invalid thumbnails cannot be synced or overwrite reviewed files',async()=>{
 const root=await setup(),configPath=join(root,'src/data/speakingRecordings.json'),manifestPath=join(root,'docs/speaking/SPEAK-001A-THUMBNAILS.json'),before=await readFile(manifestPath),config=JSON.parse(await readFile(configPath,'utf8'));
 config.push({id:'fixture0002',title:'Rejected thumbnail fixture',category:'Test',publicationApproved:true});await writeFile(configPath,JSON.stringify(config));
 await assert.rejects(prepareSpeakingThumbnails({root,mode:'sync',fetcher:async()=>new Response(Buffer.alloc(5000),{headers:{'content-type':'image/jpeg'}})}));
 assert.deepEqual(await readFile(manifestPath),before);await assert.rejects(access(join(root,'src/assets/speaking-videos/fixture0002.jpg')));
 config.at(-1).publicationApproved=false;await writeFile(configPath,JSON.stringify(config));await assert.rejects(prepareSpeakingThumbnails({root,mode:'sync',fetcher:()=>{throw Error('Unapproved records must not download');}}),/publication approval/);
});
