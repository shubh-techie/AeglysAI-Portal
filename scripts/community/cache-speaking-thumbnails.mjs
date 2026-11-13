/** Explicit offline authoring tool. Builds/browser requests never download thumbnails.
 * --verify validates configured approved caches; --refresh stages candidates only;
 * --sync resolves missing approved thumbnails and updates the reviewed manifest.
 */
import{readFile,mkdir,writeFile}from'node:fs/promises';
import{resolve,join}from'node:path';import{fileURLToPath}from'node:url';import{createHash}from'node:crypto';import sharp from'sharp';
import{youtubeId,youtubeThumbnail}from'../../src/data/youtube.ts';
const sha=bytes=>createHash('sha256').update(bytes).digest('hex');
const optional=async path=>{try{return await readFile(path);}catch(error){if(error.code==='ENOENT')return null;throw error;}};
const validate=async bytes=>{
 if(bytes.length<4000||bytes.length>512000)throw Error('Thumbnail empty or oversized');
 const image=sharp(bytes,{failOn:'warning',limitInputPixels:2_000_000}),meta=await image.metadata();
 if(meta.format!=='jpeg'||meta.width<320||meta.height<180||(meta.pages??1)>1)throw Error('Thumbnail unavailable, unsupported or placeholder-sized');
 const stats=await image.stats();if(stats.channels.every(channel=>channel.stdev<.5))throw Error('Blank thumbnail');
};
export async function prepareSpeakingThumbnails({root=process.cwd(),mode='verify',fetcher=fetch}={}){
 if(!['verify','refresh','sync'].includes(mode))throw Error('Use --verify, --refresh or --sync');
 root=resolve(root);const configured=JSON.parse(await readFile(join(root,'src/data/speakingRecordings.json'),'utf8'));
 if(!Array.isArray(configured))throw Error('Recordings must be an array');
 const ids=configured.map(record=>{if(record.publicationApproved!==true)throw Error('Thumbnail caching requires explicit publication approval');return youtubeId(record.id);});if(new Set(ids).size!==ids.length)throw Error('Duplicate recording ID');
 const manifestPath=join(root,'docs/speaking/SPEAK-001A-THUMBNAILS.json'),manifest=JSON.parse((await optional(manifestPath))?.toString()??'[]'),outputs=[];
 if(!Array.isArray(manifest)||new Set(manifest.map(item=>item.id)).size!==manifest.length)throw Error('Invalid thumbnail manifest');
 if(mode==='verify'&&(ids.length!==manifest.length||manifest.some(item=>!ids.includes(item.id))))throw Error('Thumbnail manifest does not match configured videos');
 for(const id of ids){
  const source=youtubeThumbnail(id),prior=manifest.find(item=>item.id===id),asset=join(root,`src/assets/speaking-videos/${id}.jpg`),existing=await optional(asset);let bytes;
  if(mode==='verify'||mode==='sync'&&existing&&prior){
   if(!existing||!prior||prior.source!==source||prior.sha256!==sha(existing)||prior.bytes!==existing.length)throw Error(`Reviewed thumbnail differs: ${id}`);bytes=existing;
  }else{
   const response=await fetcher(source,{redirect:'error',signal:AbortSignal.timeout(15000)});
   if(!response.ok||!response.headers.get('content-type')?.startsWith('image/jpeg'))throw Error(`Thumbnail unavailable: ${id}`);
   bytes=Buffer.from(await response.arrayBuffer());
   if(mode==='sync'&&existing&&sha(existing)!==sha(bytes))throw Error(`Existing unreviewed thumbnail differs; preserve and review: ${id}`);
  }
  await validate(bytes);outputs.push({id,source,bytes:bytes.length,sha256:sha(bytes),data:bytes,asset});
 }
 // Validate the entire batch before writing; never delete original/cached assets.
 if(mode==='refresh')for(const item of outputs){const path=join(root,`.community-drafts/speak001a/thumbnail-candidates/${item.id}.jpg`);await mkdir(resolve(path,'..'),{recursive:true});await writeFile(path,item.data);}
 if(mode==='sync'){
  for(const item of outputs){await mkdir(resolve(item.asset,'..'),{recursive:true});if(!await optional(item.asset))await writeFile(item.asset,item.data);}
  await mkdir(resolve(manifestPath,'..'),{recursive:true});await writeFile(manifestPath,JSON.stringify(outputs.map(({id,source,bytes,sha256})=>({id,source,bytes,sha256})),null,2)+'\n');
 }
 return outputs.map(({id,source,bytes,sha256})=>({id,source,bytes,sha256}));
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const argument=process.argv[2];if(!['--verify','--refresh','--sync'].includes(argument))throw Error('Use --verify, --refresh or --sync');
 for(const item of await prepareSpeakingThumbnails({mode:argument.slice(2)}))console.log(JSON.stringify({...item,reviewRequired:argument==='--refresh'}));
}
