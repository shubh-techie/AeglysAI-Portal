/** Build-time publication inventory. No browser filesystem or network access. */
import {readFile,mkdir,writeFile,readdir,lstat,realpath,rm,copyFile} from 'node:fs/promises';
import {resolve,join,dirname,sep} from 'node:path';import{createHash}from'node:crypto';
import{fileURLToPath}from'node:url';import sharp from'sharp';
const digest=bytes=>createHash('sha256').update(bytes).digest('hex');
const filenameCollator=new Intl.Collator('en',{numeric:true,sensitivity:'base'});
const order=(a,b)=>filenameCollator.compare(a,b)||(a<b?-1:a>b?1:0);
const exists=async path=>{try{return await lstat(path);}catch(e){if(e.code==='ENOENT')return null;throw e;}};
const safeText=value=>typeof value==='string'&&value.trim().length>0&&value.length<=2400&&!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(value);
const writeChanged=async(path,bytes)=>{const prior=await exists(path);if(prior?.isSymbolicLink())throw Error('Refusing generated symlink');if(prior&&Buffer.compare(await readFile(path),Buffer.from(bytes))===0)return;await mkdir(dirname(path),{recursive:true});await writeFile(path,bytes);};
export async function discoverSpeakingImages({root=process.cwd(),write=true}={}){
 root=resolve(root);const policy=JSON.parse(await readFile(join(root,'src/data/conferenceFolders.json'),'utf8'));
 if(policy.policyVersion!=='operator-publication-v1')throw Error('Unknown publication policy');
 const base=join(root,'public/conference'),photos={},sources=[],assets=new Map();
 for(const path of[join(root,'public'),base,join(base,'_generated')])if((await exists(path))?.isSymbolicLink())throw Error('Publication roots cannot be symlinks');
 const seen=new Set(),usedInputs=new Set();
 const present=new Set((await exists(base))?await readdir(base):[]);
 for(const mapping of policy.folders){
  if(!mapping.publicationReady)continue;
  if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(mapping.folder)||!safeText(mapping.name)||!safeText(mapping.credit)||seen.has(mapping.eventId))throw Error('Invalid or duplicate approved folder mapping');seen.add(mapping.eventId);
  photos[mapping.eventId]=[];const candidates=[];
  if(mapping.aliases!==undefined&&!Array.isArray(mapping.aliases))throw Error('Folder aliases must be explicitly listed');
  for(const inputFolder of[mapping.folder,...mapping.aliases??[]]){
   if(typeof inputFolder!=='string'||!/[A-Za-z0-9]/.test(inputFolder[0]??'')||!/^[A-Za-z0-9][A-Za-z0-9 _-]*$/.test(inputFolder)||usedInputs.has(inputFolder))throw Error('Invalid or duplicate approved input folder');usedInputs.add(inputFolder);
   // Match actual directory spelling, even on case-insensitive development filesystems.
   if(!present.has(inputFolder))continue;const directory=join(base,inputFolder),info=await lstat(directory);
   if(!info.isDirectory()||info.isSymbolicLink())throw Error('Publication-ready folder must be a real directory');
   for(const name of(await readdir(directory)).filter(name=>/\.(?:jpe?g|png|webp)$/i.test(name)))candidates.push({name,directory,inputFolder});
  }
  candidates.sort((a,b)=>order(a.name,b.name)||order(a.inputFolder,b.inputFolder));
  for(const[index,{name,directory,inputFolder}]of candidates.entries()){
   const path=join(directory,name),stat=await lstat(path);
   if(!stat.isFile()||stat.isSymbolicLink()||stat.size===0||stat.size>20*1024*1024)throw Error(`Invalid image file: ${mapping.folder}/${name}`);
   if(!(await realpath(path)).startsWith((await realpath(directory))+sep))throw Error('Image escapes approved folder');
   const bytes=await readFile(path),sourceSHA256=digest(bytes);let meta,display,thumb;
   try{
    const decoder=sharp(bytes,{limitInputPixels:40_000_000,failOn:'warning'});meta=await decoder.metadata();
    if(!['jpeg','png','webp'].includes(meta.format)||!meta.width||!meta.height||(meta.pages??1)>1)throw Error('Unsupported image type');
    // Full decoding is required; metadata/signatures alone do not establish validity.
    display=await sharp(bytes,{limitInputPixels:40_000_000,failOn:'warning'}).rotate().resize({width:1920,height:1920,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();
    thumb=await sharp(bytes,{limitInputPixels:40_000_000,failOn:'warning'}).rotate().resize({width:320,height:320,fit:'inside',withoutEnlargement:true}).webp({quality:75}).toBuffer();
   }catch(error){throw Error(`Image validation failed: ${mapping.folder}/${name}: ${error.message}`);}
   const sidecarPath=path+'.json';let caption={};if(await exists(sidecarPath)){const stat=await lstat(sidecarPath);if(stat.isSymbolicLink()||!stat.isFile()||stat.size>16384)throw Error('Invalid image metadata sidecar');caption=JSON.parse(await readFile(sidecarPath,'utf8'));}
   if(Object.keys(caption).some(key=>!['alt','caption','fit'].includes(key))||Object.entries(caption).some(([key,value])=>key==='fit'?!['contain','cover'].includes(value):!safeText(value)))throw Error('Invalid public image caption metadata');
   const imagePath=`conference/_generated/${mapping.folder}/${digest(display)}-display.webp`,thumbnailPath=`conference/_generated/${mapping.folder}/${digest(thumb)}-thumb.webp`;assets.set(imagePath,display);assets.set(thumbnailPath,thumb);
   photos[mapping.eventId].push({id:`${mapping.folder}-${digest(Buffer.from(inputFolder===mapping.folder?name:inputFolder+'/'+name)).slice(0,16)}`,eventId:mapping.eventId,assetPath:imagePath,sha256:digest(display),thumbnail:{path:thumbnailPath,sha256:digest(thumb)},fit:caption.fit??'contain',alt:caption.alt??`${mapping.name}: approved speaking-engagement image ${index+1}.`,caption:caption.caption??`${mapping.name}: owner-approved image ${index+1}. Image availability does not establish delivery.`,credit:mapping.credit,sourceUrl:mapping.sourceUrl,rightsBasis:'OWNER_AUTHORIZED',rightsReference:policy.approvalReference,contentApproved:true,publicationApproved:true,subjectsConsentConfirmed:true});
   sources.push({eventId:mapping.eventId,folder:mapping.folder,...(inputFolder!==mapping.folder?{inputFolder}:{}),filename:name,sourceSHA256,format:meta.format,width:meta.width,height:meta.height,bytes:bytes.length,sourceHasMetadata:!!(meta.exif||meta.xmp||meta.iptc),displayPath:imagePath,displaySHA256:digest(display),thumbnailPath,thumbnailSHA256:digest(thumb)});
  }
 }
 const inventory={inventoryVersion:'1.0.0',policyVersion:policy.policyVersion,photos,sources};
 if(write){
  // Publish outputs only after every source has validated. Originals are never modified.
  for(const path of assets.keys())if((await exists(dirname(join(root,'public',path))))?.isSymbolicLink())throw Error('Generated event directory cannot be a symlink');
  for(const[path,bytes]of assets)await writeChanged(join(root,'public',path),bytes);
  const generated=join(base,'_generated');if(await exists(generated)){
   const clean=async dir=>{for(const entry of await readdir(dir,{withFileTypes:true})){const path=join(dir,entry.name);if(entry.isSymbolicLink())throw Error('Unexpected generated symlink');if(entry.isDirectory())await clean(path);else if(!assets.has(path.slice(join(root,'public').length+1).split(sep).join('/')))await rm(path);}};await clean(generated);
  }
  await writeChanged(join(root,'src/data/speakingPhotos.generated.json'),JSON.stringify(inventory,null,2)+'\n');
 }
 return inventory;
}
export async function finalizeConferenceOutput({root=process.cwd(),dist='dist'}={}){
 root=resolve(root);if(!resolve(root,dist).startsWith(root+sep)||(await exists(resolve(root,dist)))?.isSymbolicLink())throw Error('Invalid build output root');const destination=resolve(root,dist,'conference');if(!destination.startsWith(resolve(root,dist)+sep))throw Error('Invalid output root');
 const inventory=JSON.parse(await readFile(join(root,'src/data/speakingPhotos.generated.json'),'utf8'));
 if((await exists(destination))?.isSymbolicLink())throw Error('Output conference directory cannot be a symlink');
 // Astro copies public/ verbatim. Recreate ONLY this generated output directory so
 // unknown folders and original publication inputs never enter the production artifact.
 await rm(destination,{recursive:true,force:true});await mkdir(destination,{recursive:true});
 const files=new Map(inventory.sources.flatMap(x=>[[x.displayPath,x.displaySHA256],[x.thumbnailPath,x.thumbnailSHA256]]));
 for(const[path,hash]of files){if(!/^conference\/_generated\/[a-z0-9-]+\/[a-f0-9]{64}-(?:display|thumb)\.webp$/.test(path))throw Error('Invalid generated asset path');const input=join(root,'public',path);if(digest(await readFile(input))!==hash)throw Error('Generated output digest differs');const out=join(root,dist,path);await mkdir(dirname(out),{recursive:true});await copyFile(input,out);}
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 if(process.argv.includes('--finalize'))await finalizeConferenceOutput();else{const data=await discoverSpeakingImages();console.log(JSON.stringify({images:data.sources.length,counts:Object.fromEntries(Object.entries(data.photos).map(([id,images])=>[id,images.length]))}));}
}
