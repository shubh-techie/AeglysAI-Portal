/** Only the six approved gallery interiors vary with publication-ready input files.
 * All surrounding Speaking bytes and exact approved package-script changes stay pinned.
 */
import{readFileSync,existsSync}from'node:fs';import{createHash}from'node:crypto';
const sha=value=>createHash('sha256').update(value).digest('hex');
const path=new URL('./speaking-discovery-preservation.json',import.meta.url);
const pin=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):null;
export function speakingMediaRegions(html){
 const starts=[...html.matchAll(/<(div|section)\b[^>]*(?:class="sp-compact-media"|data-event-media)[^>]*>/g)];
 if(starts.length!==6)throw Error('Expected exactly six approved event media regions');
 return starts.map(match=>{const tokens=new RegExp(`<\\/?${match[1]}\\b[^>]*>`,'g');tokens.lastIndex=match.index;let depth=0,end;for(let token;(token=tokens.exec(html));){if(token[0].startsWith('</'))depth--;else depth++;if(depth===0){end=token.index;break;}}if(end===undefined)throw Error('Unclosed event media region');return{start:match.index+match[0].length,end};});
}
export function normalizeSpeakingMedia(html){let normalized=html;const regions=speakingMediaRegions(html);for(let i=regions.length-1;i>=0;i--)normalized=normalized.slice(0,regions[i].start)+`<!-- approved-conference-media-${i} -->`+normalized.slice(regions[i].end);return normalized;}
export function discoveryForHistory(path,value){
 if(!pin)return value;const wasBuffer=Buffer.isBuffer(value);let text=wasBuffer?value.toString('utf8'):value;
 if(path==='package.json'){if(sha(value)!==pin.packageAfterSHA256)throw Error('Unexpected package change outside approved discovery scripts');text=pin.packageBefore;}
 else if(path==='dist/speaking/index.html'){
  if(sha(normalizeSpeakingMedia(text))!==pin.staticSHA256)throw Error('Speaking content outside approved media regions differs');
  const regions=speakingMediaRegions(text);for(let i=regions.length-1;i>=0;i--)text=text.slice(0,regions[i].start)+pin.seedInteriors[i]+text.slice(regions[i].end);
 }
 return wasBuffer?Buffer.from(text):text;
}
