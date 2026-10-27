/** Operator CLI; publication is unconditionally disabled. */
import {readFileSync,writeFileSync,mkdirSync,statSync,realpathSync} from 'node:fs';
import {resolve} from 'node:path';
import {sourceConfigSchema,adcToken,googleClient,readSource,SourceError} from './profile-source.ts';
import {synchronize} from './profile-sync.ts';
const path=resolve('.community-drafts/profile-source.json');
try{
 const [command,...args]=process.argv.slice(2);
 if(command==='init'&&args.length===2){mkdirSync('.community-drafts',{recursive:true});
 const config=sourceConfigSchema.parse({schemaVersion:'1.0.0',publicationEnabled:false,sheetId:args[0],assetFolderId:args[1],maxRows:200,demoAvatarUse:true,approvedOwnerPermissionIds:[],roleMap:{judge:'Judge',mentor:'Mentor',partner:'Partner','keynote speaker':'Keynote Speaker'},rightsMap:{Owned:'owned',CC0:'cc0','Permission granted':'permission'}});
 writeFileSync(path,JSON.stringify(config,null,2)+'\n',{flag:'wx',mode:0o600});console.log('Private operator source configuration created; publication disabled');
 }else{
 if(args.length||!['doctor','demo','candidate'].includes(command))throw new SourceError('COMMAND_USAGE');
 if(realpathSync(path)!==path||statSync(path).size>16384)throw new SourceError('SOURCE_CONFIG');
 const config=sourceConfigSchema.parse(JSON.parse(readFileSync(path,'utf8'))),api=googleClient(adcToken());
 if(command==='doctor'){await readSource(config,api);const folder=await api.json(`https://www.googleapis.com/drive/v3/files/${config.assetFolderId}?fields=id,mimeType,trashed`);if(folder.mimeType!=='application/vnd.google-apps.folder'||folder.trashed)throw new SourceError('SOURCE_FOLDER');console.log('Read-only Google source API access and bounded column mapping verified; publication disabled');}
 else console.log(JSON.stringify(await synchronize(config,api,command)));
 }
}catch(e){console.error(JSON.stringify({operation:'source-sync-rejected',code:e instanceof SourceError?e.code:'SOURCE_VALIDATION',publicationEnabled:false}));process.exitCode=1;}
