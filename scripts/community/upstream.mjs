import {spawnSync} from 'node:child_process';
import {existsSync} from 'node:fs';
import {resolve} from 'node:path';
export const MAX_BYTES=1024*1024;
function bridge(kind,raw,args=[]) {
 if(Buffer.byteLength(raw)>MAX_BYTES)throw Error('Contract input exceeds bound');
 const result=spawnSync(process.env.AEGLYSAI_CONTRACT_PYTHON||(existsSync('.community-drafts/contract-venv/bin/python')?resolve('.community-drafts/contract-venv/bin/python'):'python3'),[resolve('scripts/community/contract-bridge.py'),kind,...args],{input:raw,encoding:'utf8',timeout:15000,maxBuffer:MAX_BYTES*2,env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}});
 if(result.status!==0)throw Error('Contract input rejected or validation dependency unavailable');
 return result.stdout;
}
export function parsePublicJson(raw){return JSON.parse(bridge('parse',raw));}
export function validateContract(kind,document,{artifactRoot=resolve('src/data/community/report-artifacts'),publication=false,requireVerified=false}={}) {
 const raw=JSON.stringify(document);if(!raw)throw Error('Missing contract');
 // Strict parse also rejects unsafe integers and oversized structures.
 const args=kind==='monthly'?[artifactRoot,...(publication?['--publication']:[])]:requireVerified?['--verified']:[];
 bridge(kind,raw,args);return document;
}
