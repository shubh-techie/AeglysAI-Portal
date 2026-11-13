/** Explicit offline asset preparation, never a build hook. Originals remain untouched.
 * Uses Astro's existing sharp optimizer; no new dependency. Exact integer crops only,
 * no compositing, content generation or inferred event/delivery claims.
 */
import sharp from 'sharp';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {createHash} from 'node:crypto';
const directory=process.argv[2];
if(!directory)throw Error('Provide the private original-image directory');
const inventory=JSON.parse(readFileSync('docs/speaking/SPEAK-001B-IMAGES.json','utf8'));
for(const item of inventory.filter(item=>item.publication==='INCLUDED')){
 const source=readFileSync(`${directory}/${item.id}.png`);
 if(createHash('sha256').update(source).digest('hex')!==item.originalSHA256)throw Error('Original differs from reviewed source');
 let pipeline=sharp(source).rotate();if(item.crop)pipeline=pipeline.extract(item.crop);
 const image=await pipeline.resize({width:1600,height:1600,fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer();
 const digest=createHash('sha256').update(image).digest('hex');if(item.displaySHA256&&digest!==item.displaySHA256)throw Error('Display variant differs; review before updating pinned assets');
 mkdirSync('src/assets/speaking/conferences',{recursive:true});writeFileSync(`src/assets/${item.assetPath}`,image);
 console.log(JSON.stringify({id:item.id,sha256:digest,bytes:image.length}));
}
