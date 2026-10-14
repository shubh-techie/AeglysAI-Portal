import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
test('DESIGN-005 conceptual network has six named keyboard actions and no runtime remote dependency',()=>{
 const html=readFileSync('dist/hackathons/index.html','utf8');
 assert.equal([...html.matchAll(/data-node="\d"/g)].length,6);
 assert.equal([...html.matchAll(/data-edge="\d"/g)].length,9);
 for(const name of ['IDENTITY','API','CLOUD','DATA','AI / ML','SECURITY'])assert.ok(html.includes(`Select ${name} connections`));
 assert.ok(html.includes('NO LIVE TELEMETRY'));assert.ok(html.includes('data-network-reset'));
 const script=readFileSync('src/components/hackathons/landing/landing-interactions.js','utf8');
 assert.doesNotMatch(script,/\bfetch\s*\(|\bWebSocket\s*\(|localStorage|https?:\/\//);
});
