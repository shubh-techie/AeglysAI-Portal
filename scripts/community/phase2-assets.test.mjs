import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,readdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import {assertPhase2Assets} from './phase2-preservation.mjs';
import {discoverSpeakingImages} from './discover-speaking-images.mjs';
const sha=b=>createHash('sha256').update(b).digest('hex');
const fixture=bytes=>{
 const folder='gicite-2026',displayPath=`conference/_generated/${folder}/${sha(bytes)}-display.webp`,thumbnailPath=`conference/_generated/${folder}/${sha(bytes)}-thumb.webp`;
 return {inventory:{sources:[{folder,displayPath,displaySHA256:sha(bytes),thumbnailPath,thumbnailSHA256:sha(bytes)}]},files:{['dist/'+displayPath]:bytes,['dist/'+thumbnailPath]:bytes}};
};
const reader=files=>path=>{if(!Object.hasOwn(files,path))throw Object.assign(Error('Missing required asset: '+path),{code:'ENOENT'});return files[path];};
test('PHASE2 asset checks follow current encoder output instead of a machine-specific WebP filename',async()=>{
 const image=sharp({create:{width:24,height:16,channels:3,background:'#256e91'}});
 const prior=fixture(await image.clone().webp({quality:45}).toBuffer()),current=fixture(await image.clone().webp({quality:85}).toBuffer());
 assert.notEqual(prior.inventory.sources[0].displayPath,current.inventory.sources[0].displayPath);
 const files={'dist/site.css':Buffer.from('body{color:navy}'),...current.files},pins={'dist/site.css':sha(files['dist/site.css'])};
 assert.throws(()=>reader(files)('dist/'+prior.inventory.sources[0].displayPath),{code:'ENOENT'},'Reproduces the old host-specific path failure');
 assert.deepEqual(assertPhase2Assets(pins,current.inventory,reader(files)),Object.keys(current.files).sort());
 assert.throws(()=>assertPhase2Assets({['dist/'+prior.inventory.sources[0].displayPath]:sha(Object.values(prior.files)[0])},current.inventory,reader(files)),/require the current build inventory/);
});
test('PHASE2 asset checks still reject missing or corrupt fixed/generated files and unsafe inventory paths',()=>{
 const current=fixture(Buffer.from('fixture asset')),files={'dist/site.css':Buffer.from('site stylesheet'),...current.files},pins={'dist/site.css':sha(files['dist/site.css'])};
 for(const path of Object.keys(files)){
  const missing={...files};delete missing[path];assert.throws(()=>assertPhase2Assets(pins,current.inventory,reader(missing)),{code:'ENOENT'});
  assert.throws(()=>assertPhase2Assets(pins,current.inventory,reader({...files,[path]:Buffer.from('tampered')})),/differs/);
 }
 for(const path of ['../private.webp','conference/_generated/unknown/'+sha(Buffer.from('fixture asset'))+'-display.webp']){
  const invalid=structuredClone(current.inventory);invalid.sources[0].displayPath=path;assert.throws(()=>assertPhase2Assets(pins,invalid,reader(files)),/Invalid current conference asset reference/);
 }
});
test('PHASE2 current gallery inventory is reproducible from approved sources and every output is present',async()=>{
 const inventory=JSON.parse(readFileSync('src/data/speakingPhotos.generated.json','utf8'));
 // Re-decode/re-encode approved originals with the current platform; do not trust a stale manifest.
 assert.deepEqual(inventory,await discoverSpeakingImages({write:false}));
 const expected=assertPhase2Assets({},inventory),walk=dir=>readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(`${dir}/${e.name}`):[`${dir}/${e.name}`]);
 assert.deepEqual(walk('dist/conference/_generated').sort(),expected,'No missing, stale or unapproved generated output');
 const html=readFileSync('dist/speaking/index.html','utf8');
 for(const path of expected){assert.ok(html.includes('/'+path.slice(5)),path);const image=sharp(readFileSync(path),{failOn:'warning'});assert.equal((await image.metadata()).format,'webp');await image.raw().toBuffer();}
});
