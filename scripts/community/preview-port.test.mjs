import test from 'node:test';
import assert from 'node:assert/strict';
import {createServer} from 'node:net';
import {once} from 'node:events';
import {preview} from 'astro';

test('local preview refuses an occupied port instead of silently choosing another',async()=>{
 const owner=createServer();owner.listen(0,'127.0.0.1');await once(owner,'listening');
 const {port}=owner.address();let unexpected;
 try{
  await assert.rejects(async()=>{unexpected=await preview({configFile:'astro.preview.config.mjs',server:{host:'127.0.0.1',port},logLevel:'silent'});},/Port .* is already in use/);
  assert.equal(owner.listening,true,'The existing port owner stays untouched');
 }finally{await unexpected?.stop();await new Promise((r,j)=>owner.close(e=>e?j(e):r()));}
});
