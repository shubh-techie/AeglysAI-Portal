/** People is a preview input, never a substitute for EVENT-002 publication approval. */
import {z} from 'astro/zod';
import {mkdirSync,writeFileSync,renameSync,readFileSync,realpathSync,statSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import {SourceError,type GoogleClient,type SourceConfig} from './profile-source.ts';
const text=z.string().trim().min(1).max(2400).refine(v=>!/[<>\u0000-\u001f\u007f]/.test(v)&&!/[\w.+-]+@[\w.-]+\.[a-z]{2,}/i.test(v)&&!/^\s*[=+@-]/.test(v));
const stableId=z.string().regex(/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/);
const linkedin=z.url().refine(v=>{const u=new URL(v);return u.protocol==='https:'&&['www.linkedin.com','linkedin.com'].includes(u.hostname)&&!u.username&&!u.password&&!u.search&&!u.hash;});
const statuses=['Pending','Approved','Draft','Withdrawn','Revoked'] as const;
export const peoplePreviewSchema=z.strictObject({schemaVersion:z.literal('1.0.0'),kind:z.literal('PEOPLE_PREVIEW_ONLY'),
 people:z.array(z.strictObject({id:stableId,name:text,roles:z.array(text).min(1),organization:text.optional(),designation:text.optional(),linkedin:linkedin.optional(),
 status:z.enum(statuses),imageExtension:z.enum(['png','jpg','webp','avif']).optional(),imageSha256:z.string().regex(/^[a-f0-9]{64}$/).optional()})).max(1000)});
export const peopleRoot=resolve('.community-drafts/content-002a-people');
export async function readPeople(config:SourceConfig,api:GoogleClient){
 const meta=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}?fields=sheets(properties(title,gridProperties))`);
 const tab=meta.sheets?.find((s:{properties:{title:string}})=>s.properties.title==='People');if(!tab)throw new SourceError('SOURCE_TABS');
 const headers=['Profile_ID','Role','Name','Affiliation / Company','Designation','LinkedIn_URL','Photo_ID','Status','Notes'];
 const head=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/People!A1:I1`);
 if(headers.some((v,i)=>head.values?.[0]?.[i]!==v))throw new SourceError('SOURCE_HEADERS');
 const total=tab.properties.gridProperties.rowCount;if(total>1000)throw new SourceError('SOURCE_ROW_LIMIT');const limit=Math.min(config.maxRows,total);
 if(total>limit){const tail=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/People!A${limit+1}:A${total}`);if(tail.values?.some((r:unknown[])=>r.some(v=>v!==''&&v!==null)))throw new SourceError('SOURCE_ROW_LIMIT');}
 // Notes header is checked; Notes values are NEVER requested.
 const values=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${config.sheetId}/values/People!A1:H${limit}?valueRenderOption=UNFORMATTED_VALUE`);
 if(headers.slice(0,8).some((v,i)=>values.values?.[0]?.[i]!==v))throw new SourceError('SOURCE_HEADERS');
 return (values.values??[]).slice(1).filter((r:unknown[])=>r.some(v=>v!==''&&v!==null)).map((r:unknown[])=>Array.from({length:8},(_,i)=>r[i]??''));
}
export async function preparePeoplePreview(rows:unknown,imageLoader:(photoId:string)=>Promise<{bytes:Buffer,extension:string,sha256:string}>){
 const parsed=z.array(z.tuple([stableId,text,text,z.string(),z.string(),z.string(),z.string(),z.enum(statuses)])).max(1000).parse(rows);
 const combined=new Map<string,{row:typeof parsed[number],roles:string[]}>();
 for(const row of parsed){const existing=combined.get(row[0]);if(existing){if(JSON.stringify(existing.row.slice(2))!==JSON.stringify(row.slice(2))||existing.roles.includes(row[1]))throw new SourceError('DUPLICATE_OR_CONFLICTING_PROFILE');existing.roles.push(row[1]);}else combined.set(row[0],{row,roles:[row[1]]});}
 const people=[],images=[];let bytesTotal=0;
 for(const {row,roles}of combined.values()){
 if(['Withdrawn','Revoked'].includes(row[7]))continue;
 const person={id:row[0],name:row[2],roles,...(row[3]?{organization:row[3]}:{}),...(row[4]?{designation:row[4]}:{}),...(row[5]?{linkedin:row[5]}:{}),status:row[7]};
 // Validate safe text/links before any image request.
 peoplePreviewSchema.parse({schemaVersion:'1.0.0',kind:'PEOPLE_PREVIEW_ONLY',people:[person]});
 let image;if(row[6]){image=await imageLoader(row[6]);bytesTotal+=image.bytes.length;if(bytesTotal>100*1024*1024)throw new SourceError('SOURCE_TOO_LARGE');images.push({id:row[0],...image});}
 people.push({...person,...(image?{imageExtension:image.extension,imageSha256:image.sha256}:{})});
 }
 return {feed:peoplePreviewSchema.parse({schemaVersion:'1.0.0',kind:'PEOPLE_PREVIEW_ONLY',people}),images};
}
export function savePeoplePreview(result:Awaited<ReturnType<typeof preparePeoplePreview>>,root=peopleRoot){
 mkdirSync(resolve(root,'photos'),{recursive:true});if(realpathSync(resolve(root,'photos'))!==resolve(root,'photos'))throw new SourceError('OUTPUT_CONTAINMENT');
 for(const image of result.images){const path=resolve(root,'photos',`${image.id}.${image.extension}`),tmp=path+'.'+process.pid+'.tmp';writeFileSync(tmp,image.bytes,{flag:'wx',mode:0o600});renameSync(tmp,path);}
 const tmp=resolve(root,'preview-feed-'+process.pid+'.json');writeFileSync(tmp,JSON.stringify(result.feed,null,2)+'\n',{flag:'wx',mode:0o600});renameSync(tmp,resolve(root,'preview-feed.json'));
}
export function readPeoplePreview(root=peopleRoot){const path=resolve(root,'preview-feed.json');if(!existsSync(path))return peoplePreviewSchema.parse({schemaVersion:'1.0.0',kind:'PEOPLE_PREVIEW_ONLY',people:[]});if(statSync(path).size>1024*1024)throw new SourceError('SOURCE_TOO_LARGE');const feed=peoplePreviewSchema.parse(JSON.parse(readFileSync(path,'utf8')));return {...feed,people:feed.people.filter(p=>!['Withdrawn','Revoked'].includes(p.status))};}
export function peoplePhoto(id:string,feed=readPeoplePreview()){
 const p=feed.people.find(p=>p.id===id);if(!p?.imageSha256||!p.imageExtension||['Withdrawn','Revoked'].includes(p.status))return null;
 try{const path=resolve(peopleRoot,'photos',`${p.id}.${p.imageExtension}`);if(statSync(path).size>10*1024*1024)return null;const bytes=readFileSync(path);return createHash('sha256').update(bytes).digest('hex')===p.imageSha256?bytes:null;}catch{return null;}
}
