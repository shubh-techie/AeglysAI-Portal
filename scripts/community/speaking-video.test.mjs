import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {transpileModule} from 'typescript';
const source=readFileSync('src/data/speakingShowcase.ts','utf8').replace("'astro/zod'",JSON.stringify(import.meta.resolve('astro/zod'))).replaceAll("'./youtube'",JSON.stringify(new URL('../../src/data/youtube.ts',import.meta.url).href));
const {outputText}=transpileModule(source,{compilerOptions:{module:99,target:99}});
const {youtubeId,youtubeUrl,youtubeThumbnail,youtubeEmbed}=await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
test('SPEAK001A validates standard URLs without accepting spoofed hosts or unsafe IDs',()=>{
 const id='Uw6hD61RqNM';
 for(const value of [id,`https://www.youtube.com/watch?v=${id}&t=20`, `https://youtu.be/${id}`,`https://youtube.com/shorts/${id}`,`https://youtube.com/embed/${id}`]){
  assert.equal(youtubeId(value),id);assert.equal(youtubeUrl(value),`https://www.youtube.com/watch?v=${id}`);assert.equal(youtubeThumbnail(value),`https://i.ytimg.com/vi/${id}/hqdefault.jpg`);assert.equal(youtubeEmbed(value),`https://www.youtube-nocookie.com/embed/${id}`);
 }
 for(const value of ['bad','https://youtube.com.evil.test/watch?v='+id,'http://youtube.com/watch?v='+id,'https://user@youtube.com/watch?v='+id,'https://youtube.com/watch?v='+id+'&v='+id,'https://youtu.be/'+id+'/extra'])assert.throws(()=>youtubeId(value));
});
test('SPEAK001A cached real thumbnails retain exact source digests and optimized local mappings',()=>{
 const html=readFileSync('dist/speaking/index.html','utf8');const manifest=JSON.parse(readFileSync('docs/speaking/SPEAK-001A-THUMBNAILS.json','utf8'));assert.equal(manifest.length,JSON.parse(readFileSync('src/data/speakingRecordings.json','utf8')).length);
 for(const item of manifest){const data=readFileSync(`src/assets/speaking-videos/${item.id}.jpg`);assert.equal(createHash('sha256').update(data).digest('hex'),item.sha256);assert.equal(data.length,item.bytes);assert.equal(item.source,youtubeThumbnail(item.id));const card=html.split(`data-recording-id="${item.id}"`)[1].split('</article>')[0];assert.ok(card.includes(youtubeEmbed(item.id)));assert.ok(card.includes(youtubeUrl(item.id)));const src=card.match(/<img[^>]+src="([^"]+)"/)[1];assert.ok(src.startsWith('/_astro/')&&src.endsWith('.webp'));assert.ok(existsSync('dist'+src));assert.match(card,/loading="lazy"/);assert.match(card,/Watch on YouTube/);}
 assert.doesNotMatch(html,/<iframe\b|<img[^>]+https:\/\//);assert.equal((html.match(/data-speaking-video-init/g)||[]).length,1);
 const script=readFileSync('src/components/speaking/showcase/video.js','utf8');assert.doesNotMatch(script,/autoplay|player_api|innerHTML/);assert.match(script,/strict-origin-when-cross-origin/);assert.match(script,/frame\.allowFullscreen = true/);
});
