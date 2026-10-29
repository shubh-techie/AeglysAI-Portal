import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {beforeMD002} from './md002-preservation.mjs';
const read=p=>readFileSync(p,'utf8');
test('MD002 uses three textual/structural statuses and isolates D from baseline policy outcomes',()=>{
 for(const p of ['dist/index.html','dist/architecture/index.html']){
  const html=read(p),diagram=html.match(/<figure[^>]*data-md002-diagram[\s\S]*?<\/figure>/)?.[0];assert.ok(diagram,p);
  for(const label of ['Implemented baseline','Research implementation complete','Planned extension'])assert.ok(diagram.includes(label));
  const offline=diagram.match(/<section class="md002-offline"[\s\S]*?<\/section>/)[0];assert.match(offline,/enforcement_authority=NONE/);assert.doesNotMatch(offline,/decision-row|<span>ALLOW|<span>DENY/);assert.match(offline,/Behavioral inference/);assert.match(offline,/Eligibility and drift diagnostics/);assert.match(offline,/Experimental integration/);assert.doesNotMatch(offline,/class="diagram-node future"/);
  const planned=diagram.match(/<section class="md002-planned"[\s\S]*?<\/section>/)[0];for(const label of ['Operational telemetry','Adaptive decision integration','Continuous feedback'])assert.ok(planned.includes(label));assert.doesNotMatch(planned,/class="diagram-node research-complete"/);assert.match(diagram,/double border/);assert.match(diagram,/dashed border/);
 }
 const system=read('dist/architecture/index.html');assert.match(system,/Mock-feedback simulation/);assert.match(system,/effectiveness unestablished/);assert.doesNotMatch(system,/No learned behavioral model is represented as implemented/);
});
test('MD002 marks Model D complete and experimental, preserves limits and rejects unreviewed deltas',()=>{
 for(const p of ['dist/index.html','dist/research/index.html']){const html=read(p),d=[...html.matchAll(/<article class="model-card[^>]*>[\s\S]*?<\/article>/g)].map(m=>m[0]).find(s=>s.includes('Model D'));if(p==='dist/index.html'){assert.ok(d);assert.match(d,/class="model-card research-complete"/);assert.doesNotMatch(d,/planned-card/);assert.match(d,/Research Implementation Complete/);}else{assert.match(html,/id="model-d-status"/);assert.match(html,/Research Implementation Complete/);}assert.match(html,/non-enforcing/);assert.match(html,/enforcement_authority=NONE/);assert.match(html,/external/);}
 const source=read('src/components/ArchitectureDiagram.astro');assert.match(source,/border: 3px double/);assert.match(source,/grid-template-columns: 1fr/);assert.match(source,/Internal synthetic validation/);
 const html=read('dist/architecture/index.html');assert.doesNotThrow(()=>beforeMD002('dist/architecture/index.html',html));assert.throws(()=>beforeMD002('dist/architecture/index.html',html+'UNREVIEWED'));
});
