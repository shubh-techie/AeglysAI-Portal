import { mkdirSync, mkdtempSync, writeFileSync, renameSync, realpathSync } from 'node:fs';
import { resolve } from 'node:path';
import { readSource, sourceImage, sourceBoolean, SourceError, type GoogleClient } from './profile-source.ts';
import { importProfiles } from './profile-import.ts';
import { registryDigest } from '../../src/data/eventRegistry.ts';
import { demoFeedSchema, makeDemoShowcase } from './preview/profiles-demo.ts';
function fail(code:string):never{throw new SourceError(code);}
export async function synchronize(config:unknown,api:GoogleClient,mode:'demo'|'candidate',reviewRoot=resolve('.community-drafts')){
 if(realpathSync(reviewRoot)!==resolve(reviewRoot))fail('OUTPUT_CONTAINMENT');
 const destinationRoot=resolve(reviewRoot,'content-002a-feed');
 const source=await readSource(config,api),{profiles,roles,assets,approvals}=source,c=source.config;
 for(const list of [profiles,assets,approvals])if(new Set(list.map(x=>x.profile_id)).size!==list.length)fail('DUPLICATE_ID');
 const ids=new Set(profiles.map(p=>p.profile_id));
 if([...roles,...assets,...approvals].some(x=>!ids.has(x.profile_id)))fail('ORPHAN_REFERENCE');
 let imageBytes=0;
 const demoProfiles=[],packetProfiles=[],packetRoles=[],packetAssets=[],packetApprovals=[],images=[];
 if(mode==='demo'&&!c.demoAvatarUse)fail('DEMO_PERMISSION_REQUIRED');
 for(const p of profiles){
 if(!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(p.profile_id)||String(p.event_year)!=='2026')fail('PROFILE_ID_OR_EVENT');
 const a=approvals.find(x=>x.profile_id===p.profile_id);if(!a)fail('APPROVAL_MISSING');
 if(a.withdrawn||['REVOKED','WITHDRAWN'].includes(p.publication_status))fail('WITHDRAWN_OR_REVOKED');
 const rr=roles.filter(x=>x.profile_id===p.profile_id);if(!rr.length)fail('ROLE_MISSING');
 const categories=rr.map(r=>{if(String(r.event_year)!=='2026')fail('ROLE_EVENT');
 if(mode==='candidate'&&(r.role==='speaker'||!r.role_approved))fail('ROLE_APPROVAL_OR_CATEGORY');
 const category=mode==='demo'&&r.role==='speaker'?'Keynote Speaker':c.roleMap[r.role];if(!category)fail('ROLE_CATEGORY');return category;});
 if(new Set(categories).size!==categories.length)fail('DUPLICATE_ROLE');
 if(categories.includes('Partner')&&categories.length!==1)fail('PARTNER_ROLE_CONFLICT');
 if(mode==='demo'){if(!p.profile_id.startsWith('demo-')||p.publication_status!=='DEMO_DO_NOT_PUBLISH')fail('DEMO_ONLY');}
 else if(p.profile_id.startsWith('demo-')||p.publication_status!=='PUBLIC_APPROVED'||!a.consent_confirmed||!a.content_approved)fail('PUBLIC_APPROVAL_REQUIRED');
 let image;const asset=assets.find(x=>x.profile_id===p.profile_id);
 if(p.drive_photo_file_id){
 if(!asset||asset.drive_photo_file_id!==p.drive_photo_file_id)fail('ASSET_REFERENCE');
 if(mode==='candidate'&&(!a.asset_approved||!sourceBoolean(asset.asset_approved)||asset.asset_type==='placeholder'||!c.rightsMap[asset.usage_permission]||!asset.public_attribution||sourceBoolean(asset.display_credit_required)))fail('ASSET_RIGHTS_OR_CREDIT');
 image=await sourceImage(p.drive_photo_file_id,c,api,mode==='candidate');imageBytes+=image.bytes.length;if(imageBytes>100*1024*1024)fail('SOURCE_TOO_LARGE');images.push({id:p.profile_id,...image});
 }
 if(mode==='demo')demoProfiles.push({id:p.profile_id,name:p.display_name,category:categories[0],extraCategories:categories.slice(1),designation:p.public_title,biography:p.short_bio,
 ...(image?{imageSha256:image.sha256,imageExtension:image.extension}:{})});
 else{
 if(!sourceBoolean(p.affiliation_verified))fail('AFFILIATION_UNVERIFIED');
 packetProfiles.push({profile_id:p.profile_id,display_name:p.display_name,...(p.public_title?{public_title:p.public_title}:{}),...(p.organization?{organization:p.organization}:{}),short_bio:p.short_bio,
 ...(p.public_linkedin_url?{public_linkedin_url:p.public_linkedin_url}:{}),...(p.public_website_url?{public_website_url:p.public_website_url}:{}),publication_status:'PUBLIC_APPROVED',affiliation_verified:true});
 packetRoles.push(...categories.map(category=>({profile_id:p.profile_id,event_year:'2026',registry_category:category,role_approved:true})));
 if(image)packetAssets.push({profile_id:p.profile_id,public_copy_path:`/images/profiles/${p.profile_id}-${image.sha256.slice(0,16)}.${image.extension}`,sha256:image.sha256,alt_text:p.alt_text,
 rights:c.rightsMap[asset!.usage_permission],attribution:asset!.public_attribution,ownership_verified:true,usage_permission_verified:true,asset_approved:true,display_credit_required:false});
 packetApprovals.push({profile_id:p.profile_id,consent_confirmed:true,content_approved:true,asset_approved:Boolean(image),withdrawn:false});
 }
 }
 if(mode==='demo'){
 const feed=demoFeedSchema.parse({schemaVersion:'1.0.0',kind:'DEMO_DO_NOT_PUBLISH',profiles:demoProfiles});makeDemoShowcase(feed);
 // All source reads and decoding finish before touching the current local preview.
 mkdirSync(resolve(destinationRoot,'demo-images'),{recursive:true});
 if(realpathSync(resolve(destinationRoot,'demo-images'))!==resolve(destinationRoot,'demo-images'))fail('OUTPUT_CONTAINMENT');
 for(const image of images){const target=resolve(destinationRoot,'demo-images',`${image.id}.${image.extension}`),tmp=target+'.'+process.pid+'.tmp';writeFileSync(tmp,image.bytes,{flag:'wx',mode:0o600});renameSync(tmp,target);}
 const temporary=resolve(destinationRoot,`preview-feed-${process.pid}.json`);writeFileSync(temporary,JSON.stringify(feed,null,2)+'\n',{flag:'wx',mode:0o600});renameSync(temporary,resolve(destinationRoot,'preview-feed.json'));
 return {operation:'local-demo-synchronized',profiles:feed.profiles.length,roles:roles.length};
 }
 const root=resolve(reviewRoot,'profile-source-candidates');mkdirSync(root,{recursive:true});if(realpathSync(root)!==root)fail('OUTPUT_CONTAINMENT');const stage=mkdtempSync(resolve(root,'candidate-'));mkdirSync(resolve(stage,'public/images'),{recursive:true});
 for(const image of images){const item=packetAssets.find(a=>a.profile_id===image.id)!;const target=resolve(stage,'public',item.public_copy_path.slice(1));mkdirSync(resolve(target,'..'),{recursive:true});writeFileSync(target,image.bytes,{flag:'wx',mode:0o600});}
 const packet={snapshotId:'aegython-2026-profiles',revision:Date.now(),exportedAt:new Date().toISOString(),exportId:'export-'+Date.now(),sourceRevision:'source-'+registryDigest({packetProfiles,packetRoles,packetAssets,packetApprovals}).slice(0,16),Profiles:packetProfiles,Roles:packetRoles,Assets:packetAssets,Approvals:packetApprovals};
 const snapshot=importProfiles(packet,resolve(stage,'public'));writeFileSync(resolve(stage,'candidate.json'),JSON.stringify(snapshot,null,2)+'\n',{flag:'wx',mode:0o600});
 return {operation:'candidate-awaiting-independent-owner-approval',sha256:registryDigest(snapshot)};
}
