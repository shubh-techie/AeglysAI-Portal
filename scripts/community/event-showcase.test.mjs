import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { transpileModule } from 'typescript';
const source = readFileSync('src/data/eventShowcase.ts', 'utf8').replace("'astro/zod'", JSON.stringify(import.meta.resolve('astro/zod')));
const { outputText } = transpileModule(source, { compilerOptions: { module: 99, target: 99 } });
const { showcaseSchema, publicShowcase, eventShowcase } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
const yes = { content: true, organizer: true, publicDisplayConsent: true, branding: true };
const person = { id: 'person-one', name: 'Synthetic Person', confirmed: true, approvals: yes };
const partner = { id: 'fourth', name: 'Synthetic Partner', category: 'Partner', eventId: 'test-event', status: 'Published', approvedCopy: 'Synthetic approved text', approvals: yes, visibility: { public: true, suppressed: false } };
const fixture = () => structuredClone({ events: [{ id: 'test-event', title: 'Test Event', timezone: 'Asia/Kolkata' }], people: [person], records: [partner] });
const now = new Date('2026-10-26T00:00:00Z');
const show = data => publicShowcase(data, 'test-event', now);
test('EVENT-001 configuration-only partners and hidden production drafts', () => {
  assert.deepEqual(eventShowcase.records.map(x => [x.id, x.name, x.announcementDate]), [['PARTNER-001','Kalam Academy','2026-10-26'],['PARTNER-002','Startup Jharkhand','2026-10-27'],['PARTNER-003','GDG Ranchi','2026-10-28']]);
  assert.equal(publicShowcase(eventShowcase, 'aegython-2026', now).length, 0);
  assert.equal(show(fixture())[0].name, 'Synthetic Partner');
  const html = readFileSync('dist/hackathons/community/index.html', 'utf8');
  for (const record of eventShowcase.records) assert.ok(!html.includes(record.name));
});
test('EVENT-001 shared profile roles and category/event filtering', () => {
  const data = fixture();
  for (const category of ['Judge', 'Keynote Speaker']) data.records.push({ ...partner, id: category.replaceAll(' ', '-'), category, name: undefined, personId: person.id });
  assert.equal(show(data).length, 3);
  assert.equal(publicShowcase(data, 'test-event', now, 'Judge')[0].name, person.name);
  assert.equal(publicShowcase(data, 'other-event', now).length, 0);
  data.people[0].suppressed = true; assert.equal(show(data).length, 1);
});
test('EVENT-001 strict schemas reject private fields, unsafe links/assets and broken references', () => {
  for (const patch of [{ email: 'private@example.test' }, { website: 'javascript:alert(1)' }, { website: 'https://127.0.0.1/private' }, { website: 'https://service.internal/private' }, { website: 'https://docs.google.com/document/d/private' }, { website: 'https://user:secret@example.test' }, { approvedCopy: 'Contact private@example.test' }, { image: { path: '/images/../secret.png', alt: 'test' } }, { personId: 'unknown' }, { members: ['person-one','person-one'] }]) {
    const data = fixture(); Object.assign(data.records[0], patch); assert.equal(showcaseSchema.safeParse(data).success, false, JSON.stringify(patch));
  }
  const data = fixture(); data.records.push(data.records[0]); assert.equal(showcaseSchema.safeParse(data).success, false);
});
test('EVENT-001 statuses, approval and suppression independently fail closed', () => {
  for (const status of ['Draft','Approved','Archived']) { const data=fixture(); data.records[0].status=status; assert.equal(show(data).length,0); }
  for (const gate of ['content','organizer','branding']) { const data=fixture(); data.records[0].approvals[gate]=false; assert.equal(show(data).length,0); }
  for (const patch of [{ public: false }, { suppressed: true }]) { const data=fixture(); Object.assign(data.records[0].visibility,patch); assert.equal(show(data).length,0); }
  const data=fixture(); delete data.records[0].approvedCopy; assert.equal(show(data).length,0);
});
test('EVENT-001 inclusive start / exclusive end at event timezone and DST boundaries', () => {
  const data=fixture(); Object.assign(data.records[0], {status:'Scheduled',visibility:{public:true,suppressed:false,from:'2026-10-26',until:'2026-10-27'}});
  for (const [instant, count] of [['2026-10-25T18:29:59Z',0],['2026-10-25T18:30:00Z',1],['2026-10-26T18:29:59Z',1],['2026-10-26T18:30:00Z',0]]) assert.equal(publicShowcase(data,'test-event',new Date(instant)).length,count);
  data.events[0].timezone=null; assert.equal(show(data).length,0);
  data.events[0].timezone='America/Chicago'; data.records[0].visibility.from='2026-11-01'; data.records[0].visibility.until='2026-11-02';
  for (const [instant,count] of [['2026-11-01T04:59:59Z',0],['2026-11-01T05:00:00Z',1],['2026-11-02T06:00:00Z',0]]) assert.equal(publicShowcase(data,'test-event',new Date(instant)).length,count);
});
test('EVENT-001 participant/team selection, consent, withdrawal and four-person limit', () => {
  const data=fixture(); data.records=[{ ...partner, category:'Participant', personId:person.id, qualificationVerified:true, selectionVerified:true }, { ...partner, id:'team-one', category:'Team', members:[person.id], qualificationVerified:true, selectionVerified:true }];
  assert.equal(show(data).length,2);
  for (const gate of ['publicDisplayConsent','organizer','content']) { const copy=structuredClone(data); copy.people[0].approvals[gate]=false; assert.equal(show(copy).length,0); }
  for (const gate of ['qualificationVerified','selectionVerified']) { const copy=structuredClone(data); copy.records.forEach(x=>x[gate]=false); assert.equal(show(copy).length,0); }
  const copy=structuredClone(data); copy.records.forEach(x=>x.approvals.publicDisplayConsent=false); assert.equal(show(copy).length,0);
  data.records[1].members=Array(5).fill(person.id); assert.equal(showcaseSchema.safeParse(data).success,false);
});
test('EVENT-001 person confirmation, affiliation and portrait approvals are independently required', () => {
  const data=fixture(); data.records=[{...partner,category:'Judge',personId:person.id}];
  for(const patch of [{confirmed:false},{suppressed:true},{organization:'Unverified Organization'},{image:{path:'/images/portrait.png',alt:'Synthetic portrait'},approvals:{...yes,branding:false}}]) {
    const copy=structuredClone(data);Object.assign(copy.people[0],patch);assert.equal(show(copy).length,0);
  }
  const publicProfile=show(data)[0];
  for(const privateField of ['approvals','members','personId','visibility','status','qualificationVerified','selectionVerified'])assert.ok(!(privateField in publicProfile));
});
test('EVENT-001 schema rejects invalid calendar/timezone/window and team associations', () => {
  for(const patch of [{announcementDate:'2026-02-30'},{status:'Scheduled'},{visibility:{public:true,suppressed:false,from:'2026-10-27',until:'2026-10-26'}},{team:'unknown-team'}]) {
    const data=fixture();Object.assign(data.records[0],patch);assert.equal(showcaseSchema.safeParse(data).success,false);
  }
  const data=fixture();data.events[0].timezone='not/a-zone';assert.equal(showcaseSchema.safeParse(data).success,false);
});

test('EVENT-001 rejects duplicate active public team membership within an event', () => {
 const data=fixture();
 const team={...partner,category:'Team',members:[person.id],qualificationVerified:true,selectionVerified:true};
 data.records=[{...team,id:'team-one'},{...team,id:'team-two'}];
 assert.equal(showcaseSchema.safeParse(data).success,false);
 data.records[1].visibility={public:true,suppressed:true};assert.equal(showcaseSchema.safeParse(data).success,true);
});
