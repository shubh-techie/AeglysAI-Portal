/** Explicit local DEMO exporter, never creates a production registry snapshot. */
import {readFileSync,statSync,writeFileSync,renameSync,mkdirSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {z} from 'astro/zod';
import {demoFeedSchema,demoRoot} from './preview/profiles-demo.ts';
const row=z.strictObject({profile_id:z.string(),display_name:z.string(),category:z.enum(['speaker','judge','mentor','partner']),
 public_title:z.string(),short_bio:z.string(),publication_status:z.literal('DEMO_DO_NOT_PUBLISH')});
try{
 if(process.argv.length!==3 || statSync(process.argv[2]).size>1024*1024)throw Error();
 const rows=z.array(row).max(1000).parse(JSON.parse(readFileSync(process.argv[2],'utf8')));
 const categories={speaker:'Keynote Speaker',judge:'Judge',mentor:'Mentor',partner:'Partner'};
 let feed=demoFeedSchema.parse({schemaVersion:'1.0.0',kind:'DEMO_DO_NOT_PUBLISH',profiles:rows.map(r=>({id:r.profile_id,name:r.display_name,
 category:categories[r.category],designation:r.public_title,biography:r.short_bio}))});
 if(new Set(feed.profiles.map(p=>p.id)).size!==feed.profiles.length)throw Error();
 for(const p of feed.profiles){const path=resolve(demoRoot,'demo-images',p.id+'.png');if(existsSync(path)){
 const bytes=readFileSync(path);if(bytes.length>10*1024*1024||!bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])))throw Error();
 p.imageSha256=createHash('sha256').update(bytes).digest('hex');}}
 mkdirSync(demoRoot,{recursive:true});const tmp=resolve(demoRoot,'preview-feed-'+process.pid+'.json');
 writeFileSync(tmp,JSON.stringify(feed,null,2)+'\n',{flag:'wx',mode:0o600});renameSync(tmp,resolve(demoRoot,'preview-feed.json'));
 console.log('Local DEMO feed regenerated; no publication approval or public asset copy');
}catch{console.error('Local DEMO export rejected');process.exitCode=1;}
