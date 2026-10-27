/** Local-only sanitized preview feed. No hardcoded identities or production approval. */
import { z } from 'astro/zod';
import { readFileSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';
import { showcaseSchema } from '../../../src/data/eventShowcase.ts';
export const demoFeedSchema = z.strictObject({ schemaVersion: z.literal('1.0.0'), kind: z.literal('DEMO_DO_NOT_PUBLISH'),
  profiles: z.array(z.strictObject({ id: z.string().regex(/^[A-Za-z0-9_-]{1,64}$/), name: z.string(),
    category: z.enum(['Keynote Speaker','Judge','Mentor','Partner']), extraCategories: z.array(z.enum(['Keynote Speaker','Judge','Mentor','Partner'])).default([]), designation: z.string(), biography: z.string(),
    website: z.string().optional(), imageExtension: z.enum(['png','jpg','webp','avif']).optional(), imageSha256: z.string().regex(/^[a-f0-9]{64}$/).optional() })).max(1000) });
export const demoRoot = resolve('.community-drafts/content-002a-feed');
export function readDemoFeed() {
  const path = resolve(demoRoot, 'preview-feed.json');
  if (!existsSync(path)) return demoFeedSchema.parse({schemaVersion:'1.0.0',kind:'DEMO_DO_NOT_PUBLISH',profiles:[]});
  if (statSync(path).size > 1024 * 1024) throw Error('Demo feed rejected');
  return demoFeedSchema.parse(JSON.parse(readFileSync(path,'utf8')));
}
export function demoImage(id: string, feed: unknown) {
  const profile = demoFeedSchema.parse(feed).profiles.find(x=>x.id===id);
  if (!profile?.imageSha256) return null;
  try {
    const path=resolve(demoRoot,'demo-images',`${profile.id}.${profile.imageExtension??'png'}`);
    if(statSync(path).size>10*1024*1024) return null;
    const bytes=readFileSync(path);
    const ext=profile.imageExtension??'png';
    const signature=ext==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):ext==='jpg'?bytes[0]===255&&bytes[1]===216:ext==='webp'?bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP':bytes.toString('ascii',4,8)==='ftyp';
    if(!signature || createHash('sha256').update(bytes).digest('hex')!==profile.imageSha256) return null;
    return bytes;
  } catch { return null; }
}
export function makeDemoShowcase(input: unknown) {
  const feed=demoFeedSchema.parse(input), yes={content:true,organizer:true,publicDisplayConsent:true,branding:true};
  const identity = (p: typeof feed.profiles[number]) => ({name:p.name,designation:p.designation,biography:p.biography,website:p.website,
    ...(demoImage(p.id,feed)?{image:{path:`/images/content002-demo/${p.id}.${p.imageExtension??'png'}`,alt:`DEMO avatar for ${p.name}`}}:{})});
  return showcaseSchema.parse({ events:[{id:'demo-2026',title:'DEMO only',timezone:null}],
    people:feed.profiles.filter(p=>p.category!=='Partner').map(p=>({id:p.id,...identity(p),confirmed:true,approvals:yes})),
    records:feed.profiles.flatMap(p=>[p.category,...p.extraCategories].map(category=>({id:`${p.id}-${category.replaceAll(' ','-')}`,eventId:'demo-2026',category,
      ...(category==='Partner'?identity(p):{personId:p.id}),approvedCopy:'DEMO — not an approved event role or endorsement.',
      status:'Published',approvals:yes,visibility:{public:true,suppressed:false}}))) });
}
