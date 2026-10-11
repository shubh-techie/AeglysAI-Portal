import {mkdirSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {impactDraft,impactMarkdown} from './impact-report.mjs';
try {
 const month=process.argv[2],paths=process.argv.slice(3);
 const report=impactDraft(month,paths,{artifactRoot:resolve('.community-drafts/evidence')});
 const output=resolve('.community-drafts/impact-reports',month);mkdirSync(output,{recursive:true});
 writeFileSync(resolve(output,'report.json'),JSON.stringify(report,null,2)+'\n',{flag:'wx'});
 writeFileSync(resolve(output,'report.md'),impactMarkdown(report),{flag:'wx'});
 console.log('Pending impact contract draft prepared; no publication.');
}catch{console.error('Impact draft blocked; evidence required and input details withheld.');process.exitCode=1;}
