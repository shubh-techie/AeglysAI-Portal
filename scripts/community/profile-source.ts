/** Operator-only read-only Google APIs. No private source objects are written to disk. */
import { z } from 'astro/zod';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const id=z.string().regex(/^[A-Za-z0-9_-]{10,150}$/);
export const sourceConfigSchema=z.strictObject({schemaVersion:z.literal('1.0.0'),publicationEnabled:z.literal(false),
 layout:z.enum(['multi-tab','people']).default('multi-tab'),sheetId:id,assetFolderId:id,maxRows:z.number().int().min(10).max(1000),demoAvatarUse:z.boolean(),
 approvedOwnerPermissionIds:z.array(z.string().regex(/^[A-Za-z0-9_-]+$/)),
 roleMap:z.record(z.string(),z.enum(['Judge','Mentor','Partner','Keynote Speaker'])),
 rightsMap:z.record(z.string(),z.enum(['owned','cc0','permission']))});
export type SourceConfig=z.infer<typeof sourceConfigSchema>;
export class SourceError extends Error { code:string; constructor(code:string){super(code);this.code=code;} }
function fail(code:string):never{throw new SourceError(code);}
export function adcToken(){
 try{const value=execFileSync('gcloud',['auth','application-default','print-access-token','--quiet'],{encoding:'utf8',timeout:20000,maxBuffer:16384,stdio:['ignore','pipe','pipe'],env:{...process.env,CLOUDSDK_CORE_DISABLE_PROMPTS:'1'}}).trim();
 if(!value||/[\s]/.test(value))fail('AUTH_REQUIRED');return value;}catch{fail('AUTH_REQUIRED');}
}
export function googleClient(token:string,fetcher:typeof fetch=fetch){
 async function bytes(url:string,maximum:number){
 const u=new URL(url);if(u.protocol!=='https:'||!['sheets.googleapis.com','www.googleapis.com'].includes(u.hostname)||u.username||u.password||u.port)fail('API_DESTINATION');
 let response;try{response=await fetcher(url,{headers:{Authorization:`Bearer ${token}`},redirect:'manual',signal:AbortSignal.timeout(20000)});}catch{fail('SOURCE_UNAVAILABLE');}
 if(response.status!==200||!response.body){await response.body?.cancel();fail(response.status===401||response.status===403?'ACCESS_DENIED':'SOURCE_UNAVAILABLE');}
 const reader=response.body.getReader(),chunks:Uint8Array[]=[];let total=0;
 try{while(true){const {done,value}=await reader.read();if(done)break;total+=value.length;if(total>maximum)fail('SOURCE_TOO_LARGE');chunks.push(value);}}
 catch(e){if(e instanceof SourceError)throw e;fail('SOURCE_UNAVAILABLE');}finally{await reader.cancel();}
 return Buffer.concat(chunks);}
 return {bytes,json:async(url:string)=>{try{return JSON.parse((await bytes(url,1024*1024)).toString('utf8'));}catch(e){if(e instanceof SourceError)throw e;fail('SOURCE_RESPONSE');}}};
}
export type GoogleClient=ReturnType<typeof googleClient>;
function yes(value:unknown){if(value===true||value==='Yes')return true;if(value===false||value==='No')return false;fail('SOURCE_BOOLEAN');}
type SourceRow = Record<string, any>;
function rows(values:unknown,headers:string[]):SourceRow[]{
 if(!Array.isArray(values)||!Array.isArray(values[0])||headers.some((h,i)=>values[0][i]!==h))fail('SOURCE_HEADERS');
 return values.slice(1).filter((row:unknown[])=>row.some(x=>x!==''&&x!==null)).map((row:unknown[])=>Object.fromEntries(headers.map((h,i)=>[h,row[i]??''])));
}
export async function readSource(configInput:unknown,api:GoogleClient){
 const c=sourceConfigSchema.parse(configInput);
 const meta=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${c.sheetId}?fields=sheets(properties(title,gridProperties))`);
 const tabs=['Profiles','Roles','Assets','Approvals'];for(const title of tabs)if(!meta.sheets?.some((s:{properties:{title:string}})=>s.properties.title===title))fail('SOURCE_TABS');
 const count=(title:string)=>Math.min(c.maxRows,meta.sheets.find((s:{properties:{title:string}})=>s.properties.title===title).properties.gridProperties.rowCount);
 const ranges=[`Profiles!A1:N${count('Profiles')}`,`Roles!A1:C${count('Roles')}`,`Roles!E1:E${count('Roles')}`,`Assets!A1:B${count('Assets')}`,`Assets!D1:J${count('Assets')}`,`Approvals!A1:A${count('Approvals')}`,`Approvals!C1:F${count('Approvals')}`];
 // N/I/J are optional PUBLIC extension headers. Inspect first before reading their values.
 const headerRanges=['Profiles!A1:N1','Roles!A1:C1','Roles!E1','Assets!A1:B1','Assets!D1:J1','Approvals!A1','Approvals!C1:F1'];
 const header=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${c.sheetId}/values:batchGet?`+new URLSearchParams(headerRanges.map(r=>['ranges',r])));
 const hv=header.valueRanges?.map((r:{values?:unknown[][]})=>r.values?.[0]??[]);
 const required=[['profile_id','display_name','category','event_year','public_title','organization','short_bio','public_linkedin_url','public_website_url','drive_photo_file_id','photo_filename','alt_text','publication_status'],['profile_id','event_year','role'],['role_approved'],['profile_id','drive_photo_file_id'],['original_filename','asset_type','usage_permission','asset_approved','public_copy_path'],['profile_id'],['consent_confirmed','content_approved','asset_approved','withdrawn']];
 if(!hv||hv.length!==7||required.some((fields,i)=>fields.some((f,j)=>hv[i][j]!==f)))fail('SOURCE_HEADERS');
 const affiliation=hv[0][13]==='affiliation_verified';
 const assetExtras=JSON.stringify(hv[4].slice(5,7))===JSON.stringify(['public_attribution','display_credit_required']);
 if(!affiliation)ranges[0]=`Profiles!A1:M${count('Profiles')}`;
 if(!assetExtras)ranges[4]=`Assets!D1:H${count('Assets')}`;
 const tails:string[]=[];
 for(const title of tabs){const total=meta.sheets.find((s:{properties:{title:string}})=>s.properties.title===title).properties.gridProperties.rowCount;
 if(total>1000)fail('SOURCE_ROW_LIMIT');if(total>count(title))tails.push(`${title}!A${count(title)+1}:A${total}`);}
 if(tails.length){const tail=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${c.sheetId}/values:batchGet?`+new URLSearchParams(tails.map(r=>['ranges',r])));
 if(tail.valueRanges?.some((r:{values?:unknown[][]})=>r.values?.some(row=>row.some(x=>x!==''&&x!==null))))fail('SOURCE_ROW_LIMIT');}
 const data=await api.json(`https://sheets.googleapis.com/v4/spreadsheets/${c.sheetId}/values:batchGet?`+new URLSearchParams([...ranges.map(r=>['ranges',r]),['valueRenderOption','UNFORMATTED_VALUE']]));
 const v=data.valueRanges?.map((x:{values:unknown[][]})=>x.values??[]);if(!v||v.length!==7)fail('SOURCE_RESPONSE');
 if(v.some((x:unknown[])=>x.length>=c.maxRows))fail('SOURCE_ROW_LIMIT');
 const profiles=rows(v[0],['profile_id','display_name','category','event_year','public_title','organization','short_bio','public_linkedin_url','public_website_url','drive_photo_file_id','photo_filename','alt_text','publication_status',...(affiliation?['affiliation_verified']:[])]);
 const roleHeaders=['profile_id','event_year','role'];const roles=rows(v[1],roleHeaders),roleFlags=rows(v[2],['role_approved']);
 const assets=rows(v[3],['profile_id','drive_photo_file_id']),assetValues=rows(v[4],['original_filename','asset_type','usage_permission','asset_approved','public_copy_path',...(assetExtras?['public_attribution','display_credit_required']:[])]);
 const approvals=rows(v[5],['profile_id']),approvalValues=rows(v[6],['consent_confirmed','content_approved','asset_approved','withdrawn']);
 if(roles.length!==roleFlags.length||assets.length!==assetValues.length||approvals.length!==approvalValues.length)fail('SOURCE_ROW_ALIGNMENT');
 // Keep physical row indices aligned; empty identifier cells beside populated flags are rejected.
 for(const [a,b] of [[v[1],v[2]],[v[3],v[4]],[v[5],v[6]]])for(let i=1;i<Math.max(a.length,b.length);i++)if(Boolean(a[i]?.[0])!==Boolean(b[i]?.some((x:unknown)=>x!==''&&x!==null)))fail('SOURCE_ROW_ALIGNMENT');
 return {config:c,profiles,roles:roles.map((r,i):SourceRow=>({...r,role_approved:yes(roleFlags[i].role_approved)})),assets:assets.map((r,i):SourceRow=>({...r,...assetValues[i]})),approvals:approvals.map((r,i):SourceRow=>({...r,...approvalValues[i],consent_confirmed:yes(approvalValues[i].consent_confirmed),content_approved:yes(approvalValues[i].content_approved),asset_approved:yes(approvalValues[i].asset_approved),withdrawn:yes(approvalValues[i].withdrawn)}))};
}
export async function sourceImage(fileId:string,c:SourceConfig,api:GoogleClient,production:boolean){
 id.parse(fileId);const fields='id,mimeType,size,parents,owners(permissionId),capabilities(canDownload),md5Checksum,trashed';
 const meta=await api.json(`https://www.googleapis.com/drive/v3/files/${fileId}?fields=${encodeURIComponent(fields)}`);
 const formats:Record<string,string>={'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/avif':'avif'};
 if(!formats[meta.mimeType]||meta.trashed||meta.capabilities?.canDownload!==true||!(+meta.size>0&&+meta.size<=10*1024*1024))fail('ASSET_METADATA');
 let parents=meta.parents??[],found=false;
 for(let depth=0;depth<8&&!found;depth++){
 if(parents.includes(c.assetFolderId)){found=true;break;}if(parents.length!==1)break;
 id.parse(parents[0]);const folder=await api.json(`https://www.googleapis.com/drive/v3/files/${parents[0]}?fields=id,parents,mimeType,trashed`);
 if(folder.trashed||folder.mimeType!=='application/vnd.google-apps.folder')break;parents=folder.parents??[];}
 if(!found)fail('ASSET_OUTSIDE_LIBRARY');
 if(production&&!meta.owners?.some((owner:{permissionId:string})=>c.approvedOwnerPermissionIds.includes(owner.permissionId)))fail('ASSET_OWNER_UNVERIFIED');
 const bytes=await api.bytes(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,10*1024*1024);
 if(bytes.length!==+meta.size||!meta.md5Checksum||createHash('md5').update(bytes).digest('hex')!==meta.md5Checksum)fail('ASSET_CHANGED_DURING_SYNC');
 return inspectSourceImage(bytes,meta.mimeType,+meta.size,production);
}
/** Shared byte validation for ADC downloads and authenticated connector materialization. */
export async function inspectSourceImage(bytes:Buffer,mimeType:string,size:number,production=false){
 const formats:Record<string,string>={'image/png':'png','image/jpeg':'jpg','image/webp':'webp','image/avif':'avif'};
 if(!formats[mimeType]||bytes.length!==size||size<=0||size>10*1024*1024)fail('ASSET_METADATA');
 try{const image=sharp(bytes,{limitInputPixels:40000000}),m=await image.metadata();await image.stats();
 if(!m.width||!m.height||m.width*m.height>40000000||!(mimeType==='image/avif'?['avif','heif'].includes(m.format!):m.format===({png:'png',jpg:'jpeg',webp:'webp'} as Record<string,string>)[formats[mimeType]]))fail('ASSET_DECODE');
 if(production&&(m.exif||m.xmp||m.iptc))fail('ASSET_PRIVATE_METADATA');
 }catch(e){if(e instanceof SourceError)throw e;fail('ASSET_DECODE');}
 return {bytes,extension:formats[mimeType],sha256:createHash('sha256').update(bytes).digest('hex')};
}

export { yes as sourceBoolean };
