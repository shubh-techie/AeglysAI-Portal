import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const routes = [
  "",
  "research",
  "architecture",
  "experiments",
  "publications",
  "about",
  "media",
  "speaking",
  "community",
  "community/impact",
  "community/submit",
  "community/projects",
  "community/adoption",
  "community/reports",
  "hackathons",
  "hackathons/events",
  "hackathons/community",
  "hackathons/sponsors",
  "hackathons/adaptive-authorization",
  "hackathons/behavioral-risk",
  "hackathons/autonomous-resilience",
];
// Include approved generated presentation details in the same route/asset/metadata checks.
if (existsSync("dist/speaking")) routes.push(...readdirSync("dist/speaking", { withFileTypes: true }).filter(entry => entry.isDirectory()).map(entry => `speaking/${entry.name}`));
const read = (path) => readFileSync(join("dist", path), "utf8");
const pages = routes.map((route) => ({
  route,
  html: read(route ? `${route}/index.html` : "index.html"),
}));
const homeCanonical = pages[0].html.match(
  /rel="canonical" href="([^"]+)"/,
)?.[1];
assert.ok(homeCanonical, "Home canonical exists");
const site = new URL(homeCanonical);
const base = site.pathname;
const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)],
  );

test("static pages have unique metadata and accessible landmarks", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const { route, html } of pages) {
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, route);
    assert.match(html, /<html lang="en">/);
    assert.match(html, /<main id="main"/);
    assert.match(html, /href="#main"/);
    assert.match(html, /name="description" content="[^"]+"/);
    assert.match(html, /property="og:title"/);
    assert.match(html, /name="twitter:card"/);
    assert.ok(
      html.includes(
        `rel="canonical" href="${site.origin}${base}${route ? route + "/" : ""}"`,
      ),
    );
    titles.add(html.match(/<title>(.*?)<\/title>/)[1]);
    descriptions.add(html.match(/name="description" content="([^"]+)"/)[1]);
    assert.equal(
      (html.match(/aria-current="page"/g) || []).length,
      route.startsWith("community") ? 2 : route && route !== "media" && !route.startsWith("hackathons/") ? 1 : 0,
    );
  }
  assert.equal(titles.size, routes.length);
  assert.equal(descriptions.size, routes.length);
});

test("all generated local links and assets resolve under the configured base", () => {
  for (const { html } of [...pages, { html: read("404.html") }]) {
    for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = match[1];
      if (url.startsWith("#") || /^https?:/.test(url)) continue;
      assert.ok(url.startsWith(base), `${url} must respect ${base}`);
      let local = decodeURIComponent(url.slice(base.length).split(/[?#]/)[0]);
      if (!local || local.endsWith("/")) local += "index.html";
      assert.ok(existsSync(join("dist", local)), `Missing target ${url}`);
    }
    for (const match of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
      assert.match(match[0], /rel="noopener noreferrer"/);
    }
  }
});

test("crawl artifacts and custom 404 are emitted", () => {
  assert.ok(existsSync("dist/.nojekyll"));
  assert.ok(
    read("robots.txt").includes(
      `Sitemap: ${site.origin}${base}sitemap-index.xml`,
    ),
  );
  const sitemap = read("sitemap-0.xml");
  for (const route of routes)
    assert.ok(
      sitemap.includes(
        `<loc>${site.origin}${base}${route ? route + "/" : ""}</loc>`,
      ),
    );
  assert.ok(!sitemap.includes("/404"));
  assert.match(read("404.html"), /name="robots" content="noindex, follow"/);
});

test("research claims keep planned work and unpublished results explicit", () => {
  assert.match(
    read("research/index.html"),
    /Research hypotheses will be published after the research specification is finalized\./,
  );
  assert.match(read("research/index.html"), /Model D is not implemented\./);
  assert.match(
    read("experiments/index.html"),
    /Experimental results in progress\./,
  );
  assert.match(
    read("experiments/index.html"),
    /RBAC \+ deterministic contextual risk/,
  );
  assert.match(
    read("publications/index.html"),
    /no publication or conference acceptance is claimed/,
  );
  for (const { html } of pages)
    assert.match(html, /Model D is planned research/);
});

test("production output contains only scoped inline scripts and approved local PDF embeds", () => {
  for (const { html } of pages) {
    if (html.includes('aria-label="Submission field preview"')) { assert.match(html, /<fieldset disabled/); assert.doesNotMatch(html, /<form[^>]+action=/); } else assert.doesNotMatch(html, /<form\b/);
    if (!html.includes('class="presentation-pdf-viewer"')) assert.doesNotMatch(html, /<iframe\b/);
    else {
      const embeds = [...html.matchAll(/<iframe\b[^>]*>/g)];
      assert.equal(embeds.length, 1);
      assert.match(embeds[0][0], /class="presentation-pdf-viewer"/);
      assert.match(embeds[0][0], /src="\/presentations\/[A-Za-z0-9_/-]+\.pdf#view=FitH"/);
      assert.match(embeds[0][0], /title="PDF slides: /);
      assert.match(embeds[0][0], /loading="lazy"/);
    }
    const scripts = [...html.matchAll(/<script\b[^>]*>[\s\S]*?<\/script>/g)];
    assert.equal(scripts.length, html.includes("data-media-carousel") ? 2 : 1);
    for (const script of scripts.slice(1)) {
      assert.match(script[0], /data-media-carousel-init/);
      assert.doesNotMatch(script[0], /\bsrc=|fetch\(|XMLHttpRequest/);
    }
    assert.match(scripts[0][0], /data-theme-init/);
    assert.doesNotMatch(scripts[0][0], /\bsrc=|fetch\(|XMLHttpRequest/);
    assert.ok(html.indexOf('data-theme-init') < html.indexOf('rel="stylesheet"'));
  }
  assert.equal(walk("dist").filter((path) => /\.(m?js)$/.test(path)).length, 0);
});

test("production artifacts contain no development URLs or custom domain file", () => {
  for (const path of walk("dist").filter((path) =>
    /\.(html|css|xml|txt|svg)$/.test(path),
  )) {
    const content = readFileSync(path, "utf8");
    assert.doesNotMatch(
      content,
      /(?:localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\]|https?:\/\/[^\s"'<>]*(?:\.local|\.localhost|\.test|\.invalid)(?:[/:\s"'<>]|$)|https?:\/\/(?:[^/\s]+\.)?example\.(?:com|org|net)|\/@(?:vite|fs|id)\/|astro-dev-toolbar)/i,
      `Development reference in ${path}`,
    );
  }
  assert.ok(!existsSync("public/CNAME"));
  assert.ok(!existsSync("dist/CNAME"));
});

test("creator identity is accessible without inventing social profiles", () => {
  for (const { html } of [...pages, { html: read("404.html") }]) {
    assert.match(html, /name="author" content="Shubh Prabhat"/);
    assert.match(html, /href="https:\/\/github\.com\/shubh-techie"/);
    assert.match(html, /scholar\.google\.com\/citations\?user=HrEzOfIAAAAJ/);
    assert.doesNotMatch(html, /href="[^"]*linkedin/i);
  }
  const about = read("about/index.html");
  assert.match(about, /id="creator-heading"/);
  assert.match(about, /Solution Architect/);
  assert.match(about, /LinkedIn/);
  assert.match(
    about,
    /separate AeglysAI-Portal website repository began in 2026/,
  );
  assert.match(read("publications/index.html"), /Creator profile:/);
});

test("production routes and metadata use the aeglysai.com root", () => {
  assert.equal(site.origin, "https://aeglysai.com");
  assert.equal(base, "/");
  for (const { route, html } of pages) {
    const expected = `https://aeglysai.com/${route ? route + "/" : ""}`;
    assert.ok(html.includes(`property="og:url" content="${expected}"`));
    for (const destination of routes.filter(route => route !== "media" && !route.startsWith("hackathons/") && !route.startsWith("speaking/") && !route.startsWith("community/"))) {
      assert.ok(
        html.includes(`href="/${destination ? destination + "/" : ""}"`),
      );
    }
  }
  assert.ok(
    read("sitemap-index.xml").includes("https://aeglysai.com/sitemap-0.xml"),
  );
  assert.match(read("about/index.html"), /src="\/images\/shubh-prabhat\.jpg"/);
  assert.ok(existsSync("dist/images/shubh-prabhat.jpg"));
  for (const path of walk("dist").filter((path) =>
    /\.(html|css|js|json|xml|txt|svg)$/.test(path),
  )) {
    assert.doesNotMatch(
      readFileSync(path, "utf8"),
      /(?:\/AegisAI-Portal|["\x27(=]\s*\/AeglysAI-Portal)(?:\/|["'?#\s<]|$)|shubh-techie\.github\.io|aegisai\.world/i,
      `Former deployment URL in ${path}`,
    );
  }
});


test("hackathon foundation keeps events provisional and registration unavailable", () => {
  const landing = read("hackathons/index.html");
  const events = read("hackathons/events/index.html");
  const community = read("hackathons/community/index.html");
  for (const html of [landing, events, community]) {
    assert.match(html, /PLANNED|Opening Soon/);
    assert.doesNotMatch(html, /docs\.google\.com\/forms|forms\.gle/);
    assert.doesNotMatch(html, /immigration|profile.building/i);
    const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
    assert.equal(new Set(ids).size, ids.length, "IDs must be unique");
    for (const link of html.matchAll(/href="(\/[^"]*)#([^"]+)"/g)) {
      const target = read(`${link[1].slice(1)}index.html`);
      assert.ok(target.includes(`id="${link[2]}"`), `Missing fragment ${link[0]}`);
    }
  }
  assert.match(landing, /Participation is FREE/);
  assert.match(landing, /funding unconfirmed/i);
  assert.match(landing, /subject to official event terms until finalized/);
  assert.match(landing, /disabled[^>]*>Start Qualification/);
  assert.match(landing, /Opening Soon/);
  for (const id of ["adaptive-authorization", "behavioral-risk", "autonomous-resilience"])
    assert.ok(events.includes(`id="${id}"`));
  assert.doesNotMatch(events, /November 2026|December 2026|January 2027|February 2027|March 2027/);
  assert.match(community, /src="\/images\/shubh-prabhat\.jpg"/);
  assert.equal((community.match(/Future guest speaker [123]/g) || []).length, 3);
  assert.equal((community.match(/Independent judge slot [123]/g) || []).length, 3);
});


test("participation CTAs stay unavailable without official forms", () => {
  const community = read("hackathons/community/index.html");
  assert.match(community, /disabled[^>]*>Apply to Judge/);
  assert.match(community, /disabled[^>]*>Register for Hackathon/);
  assert.match(community, /Google Forms\/Drive/);
  assert.doesNotMatch(community, /mailto:|tel:|drive\.google\.com|docs\.google\.com\/forms|forms\.gle/);
  for (const route of ["hackathons", "hackathons/events", "hackathons/community"]) {
    const html = read(`${route}/index.html`);
    assert.match(html, route === "hackathons" ? /Start Qualification/ : /Register for Hackathon/);
    assert.doesNotMatch(html, /Register Interest/);
  }
});

test("public profiles require both confirmation and explicit display permission", async () => {
  const { transpileModule } = await import("typescript");
  const source = readFileSync("src/data/hackathonPeople.ts", "utf8");
  const { outputText } = transpileModule(source, { compilerOptions: { module: 99, target: 99 } });
  const { approvedPublicPerson, speakers, judges } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const approved = { name: "Synthetic test fixture", status: "CONFIRMED", publicDisplayApproved: true };
  assert.equal(approvedPublicPerson(approved), approved);
  assert.equal(approvedPublicPerson({ ...approved, status: "INVITED" }), null);
  assert.equal(approvedPublicPerson({ ...approved, publicDisplayApproved: false }), null);
  assert.equal(approvedPublicPerson({ name: "Synthetic test fixture", status: "CONFIRMED" }), null);
  assert.equal(approvedPublicPerson(null), null);
  assert.equal(speakers.length, 3);
  assert.equal(judges.length, 3);
  assert.ok([...speakers, ...judges].every(slot => slot.person === null));
  assert.doesNotMatch(read("hackathons/community/index.html"), /Synthetic test fixture/);
});


test("launch rubric, submission package and hackathon social metadata are consistent", () => {
  const source = readFileSync("src/data/hackathons.ts", "utf8");
  const weights = [...source.matchAll(/category: "([^"]+)", weight: (\d+)/g)].map(match => ({category: match[1], weight: Number(match[2])}));
  assert.deepEqual(weights.map(item => item.weight), [30,25,20,15,10,35,25,20,15,5]);
  assert.equal(weights.slice(0,5).reduce((sum,item)=>sum+item.weight,0),100);
  assert.equal(weights.slice(5).reduce((sum,item)=>sum+item.weight,0),100);
  const events = read("hackathons/events/index.html");
  for (const item of weights) assert.ok(events.includes(`${item.weight} points`));
  for (const artifact of ["Team ID", "Selected challenge", "Project README", "Working demonstration video URL", "Data/model attribution and licensing", "Known limitations"])assert.ok(events.includes(artifact),artifact);
  assert.match(read("hackathons/index.html"), /Distributed Systems Engineers/);
  for (const route of ["hackathons", "hackathons/events", "hackathons/community"]) {
    const html = read(`${route}/index.html`);
    assert.match(html, /property="og:description"/);
    assert.match(html, /name="twitter:description"/);
    assert.match(html, /name="twitter:card" content="summary_large_image"/);
    assert.doesNotMatch(html, /drive\.google\.com|mailto:|tel:/);
  }
});


test("AeglysAI branding retains only explained legacy references", () => {
  for (const { route, html } of [...pages, {route:"404",html:read("404.html")}]) {
    assert.match(html, /property="og:site_name" content="AeglysAI Research"/);
    assert.match(html, /aria-label="AeglysAI home"/);
    assert.match(html, /<title>[^<]*AeglysAI Research<\/title>/);
    assert.match(html, /property="og:image" content="https:\/\/aeglysai\.com\/images\/aeglysai-social\.png"/);
    assert.match(html, /property="og:image:width" content="1200"/);
    assert.match(html, /property="og:image:height" content="630"/);
    assert.match(html, /name="twitter:image:alt" content="AeglysAI/);
    assert.doesNotMatch(html, /®|™|registered trademark|patented brand|exclusive trademark rights/i);
    assert.doesNotMatch(html, /github\.com\/shubh-techie\/AegisAI(?:[\/"?#\s<]|$)|AegisAI-Portal/);
    assert.ok(html.includes('href="https://github.com/shubh-techie/AeglysAI"'));
    let cleaned=html
      .replaceAll("AeglysAI is the evolution of the research initiative previously known as AegisAI.", "HISTORICAL_TRANSITION")
      .replaceAll("He created the initiative previously known as AegisAI", "HISTORICAL_BIO")
      .replaceAll("An evolution into AegisAI", "HISTORICAL_TIMELINE")
      .replaceAll("The repository evolved into AegisAI, expanding the focus toward adaptive authorization research.", "HISTORICAL_TIMELINE");
    assert.doesNotMatch(cleaned, /aegis\s*ai|aegisai\.world/i,route);
    assert.doesNotMatch(html, /AeglysAi|Aeglys AI|AEGLYS AI/);
  }
  const home=read("index.html");
  assert.match(home,/Adaptive Intelligence for Secure &amp; Resilient Distributed Systems/);
  assert.match(home,/Observe\. Assess\. Authorize\. Respond\./);
  assert.match(read("about/index.html"),/previously known as AegisAI/);
  const png=readFileSync("dist/images/aeglysai-social.png");
  assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
});


test("hackathon visual experience preserves honest empty states and qualification boundaries", () => {
  const html = read("hackathons/index.html");
  for (const section of ["challenges", "how-it-works", "qualification", "qualification-guide", "github-workflow", "why-participate", "engagement", "tracks", "speakers", "judges", "timeline", "judging", "resources", "faq", "code-of-conduct"])
    assert.ok(html.includes(`id="${section}"`), section);
  assert.match(html, /Work in your own fork/);
  assert.match(html, /Participants do not receive write access to the official repository/);
  assert.match(html, /does not guarantee selection/);
  assert.match(html, /Prize eligibility and payment are subject to official event rules/);
  assert.doesNotMatch(html, /Future guest speaker|Independent judge slot|Person to be announced/);
  assert.match(html, /Keynote Speaker · PLANNED/);
  assert.match(html, /Shubh Prabhat/);
  for (const label of ["Start Qualification", "Submit Qualification", "Apply to Judge", "Express Speaker Interest", "Submit Project"])
    assert.ok(html.includes(`disabled aria-describedby=`) && html.includes(label));
  assert.doesNotMatch(html, /href="(?:#|null|undefined)"|mailto:|tel:|drive\.google\.com/);
  for (const {route, html: other} of pages.filter(page => !["hackathons", "hackathons/sponsors"].includes(page.route)))
    assert.doesNotMatch(other, /class="hackathon-experience"/, route);
  const css = readFileSync("src/styles/hackathon-experience.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
  for (const selector of css.matchAll(/(?:^|\n)([^@{}][^{}]*)\{/g))
    assert.ok(selector[1].trim().startsWith(".hackathon-experience"), selector[1]);
});

test("form configuration rejects private/unsafe links and keeps collection gated", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/hackathonForms.ts", "utf8"), { compilerOptions: { module: 99, target: 99 } });
  const { hackathonForms, publicFormUrl } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  assert.ok(Object.values(hackathonForms).every(form => form.url === null && form.open === false));
  assert.equal(publicFormUrl(null, true), null);
  const fixture = "https://forms.gle/synthetic-test-fixture";
  assert.equal(publicFormUrl(fixture, false), null);
  assert.equal(publicFormUrl(fixture, true), fixture);
  for (const invalid of ["javascript:alert(1)", "https://drive.google.com/private", "https://docs.google.com/forms/d/synthetic-test-fixture/edit", "http://forms.gle/synthetic-test-fixture", "https://forms.gle.evil.invalid/test", "https://forms.gle/synthetic-test-fixture?email=private", "https://forms.gle/synthetic-test-fixture#private", "https://docs.google.com/spreadsheets/d/private/edit", "not-a-url"])
    assert.throws(() => publicFormUrl(invalid, true));
  assert.doesNotMatch(read("hackathons/index.html"), /synthetic-test-fixture/);
});

test("closure routes preserve event identity, windows and shared fork/certificate guidance", () => {
  const landing = read("hackathons/index.html");
  for (const id of ["adaptive-authorization","behavioral-risk","autonomous-resilience"]) {
    const html=read(`hackathons/${id}/index.html`);
    assert.match(html,/Retired Proposal/);
    assert.match(html,/hackathons\/events\//);
    assert.match(html,/hackathons\/#qualification/);
    assert.doesNotMatch(html,/November 2026|January 2027|March 2027/);
    assert.ok(read("hackathons/events/index.html").includes(`id="${id}"`));
  }
  assert.match(landing, /Registration alone does not earn a certificate/);
  assert.match(landing, /qualification\/example-user/);
  assert.match(landing, /qualification branch URL and qualification file URL/);
  assert.match(landing, /Final submission does not guarantee an AeglysAI merge/);
  const template = readFileSync("docs/hackathons/QUALIFICATION_TEMPLATE.md", "utf8");
  for (const heading of ["Build Result", "Test Result", "Architecture Understanding", "Technical Observation", "Improvement Idea", "Why It Matters", "Validation Approach"])
    assert.ok(template.includes(`## ${heading}`));
  const policy = readFileSync("docs/hackathons/CERTIFICATE_POLICY.md", "utf8");
  for (const role of ["P", "F", "W", "J", "S", "M"])
    assert.ok(policy.includes(`AEGLYS-H01-${role}-0001`));
});

test("sponsorship privacy gates exclude review states and unconfirmed prize allocations", async () => {
  const { transpileModule } = await import("typescript");
  const source = readFileSync("src/data/hackathonSponsorship.ts", "utf8")
    .replace('import { events } from "./hackathons";', 'const events = [{ id: "adaptive-authorization", prize: { amount: 300 } }];')
    .replace('import { publicFormUrl } from "./hackathonForms";', 'const publicFormUrl = (url, open) => open ? url : null;');
  const { outputText } = transpileModule(source, { compilerOptions: { module: 99, target: 99 } });
  const config = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const approved = { name: "TEST-ONLY-NOT-A-SPONSOR", status: "CONFIRMED", publicDisplayApproved: true, termsAccepted: true, contributionConfirmed: true, nameLogoPermission: true, eventIds: ["adaptive-authorization"], prizeAllocationsUsd: { "adaptive-authorization": 100 } };
  for (const status of ["INTERESTED", "UNDER_REVIEW", "TERMS_PENDING", "COMPLETED"]) {
    const records = [{ ...approved, status }];
    assert.equal(config.confirmedSponsors(records).length, 0);
    assert.equal(config.prizePools(records)[0].additional, 0);
  }
  for (const gate of ["publicDisplayApproved", "termsAccepted", "contributionConfirmed", "nameLogoPermission"])
    assert.equal(config.confirmedSponsors([{ ...approved, [gate]: false }]).length, 0);
  assert.equal(config.prizePools([approved])[0].total, 400);
  assert.throws(() => config.prizePools([{ ...approved, prizeAllocationsUsd: { "adaptive-authorization": -1 } }]));
  assert.equal(config.SPONSOR_INTEREST_FORM_URL, null);
  assert.equal(config.SPONSOR_INTEREST_OPEN, false);
  const html = read("hackathons/sponsors/index.html");
  assert.match(html, /Sponsorship Interest Form — Opening Soon/);
  assert.match(html, /Community sponsorship opportunities are currently open/);
  assert.match(html, /PLANNED BASE/);
  assert.doesNotMatch(html, /TEST-ONLY-NOT-A-SPONSOR|mailto:|drive\.google\.com|INTERESTED|UNDER_REVIEW|TERMS_PENDING/);
  assert.ok(read("hackathons/index.html").includes('href="/hackathons/sponsors/"'));
});

test("approved raster brand exports preserve source and resolve on every route", () => {
  const original = readFileSync("public/brand/AeglysAI Dark Tech Brand Kit.png");
  assert.deepEqual(readFileSync("public/brand/source/AeglysAI Dark Tech Brand Kit.png"), original);
  for (const size of [512, 192, 180, 96, 48]) {
    const png = readFileSync(`dist/brand/icons/icon-${size}.png`);
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const favicon = readFileSync("dist/brand/icons/favicon.png");
  assert.equal(favicon.readUInt32BE(16), 32);
  for (const { html } of [...pages, { html: read("404.html") }]) {
    assert.match(html, /rel="icon" type="image\/png" sizes="32x32" href="\/brand\/icons\/favicon.png"/);
    assert.match(html, /rel="apple-touch-icon" sizes="180x180" href="\/brand\/icons\/icon-180.png"/);
    assert.match(html, /class="brand-for-light" src="\/brand\/logo\/aeglysai-logo-dark.png"/);
    assert.match(html, /class="brand-for-dark" src="\/brand\/icons\/icon-mark.png"/);
    assert.doesNotMatch(html, /rel="manifest"/);
  }
});

test("media page contains six source articles and homepage carousel contains all six sources", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/media.ts", "utf8"), { compilerOptions: { module: 99, target: 99 } });
  const { mediaArticles, sortedMediaArticles, featuredMediaArticles, formatPublicationDate } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  assert.equal(mediaArticles.length, 6);
  const sorted = sortedMediaArticles();
  const expected = ["business-outstanders-platform", "nerdbot-risk-intelligence", "cyber-mag-engineering-community", "programming-insider-authorization", "techbullion-infrastructure", "cyber-mag-policy-boundaries"];
  assert.deepEqual(sorted.map(article => article.id), expected);
  assert.deepEqual(featuredMediaArticles().map(article => article.id), expected.slice(0, 3));
  const html = read("media/index.html"), home = read("index.html");
  assert.deepEqual([...html.matchAll(/data-media-id="([^"]+)"/g)].map(match => match[1]), expected);
  assert.deepEqual([...home.matchAll(/data-media-id="([^"]+)"/g)].map(match => match[1]), expected);
  for (const article of mediaArticles) {
    assert.equal([...html.matchAll(new RegExp(`href="${article.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`, "g"))].length, 1);
    assert.ok(html.includes(`datetime="${article.publishedDate}"`));
    assert.ok(html.includes(`href="${article.url}" target="_blank" rel="noopener noreferrer"`));
  }
  assert.ok(home.includes('href="/media/"'));
  for (const output of [html, home]) {
    assert.match(output, /aria-roledescription="carousel"/);
    assert.equal([...output.matchAll(/class="media-thumbnail"/g)].length, 6);
    assert.match(output, /aria-label="Previous articles"/);
    assert.match(output, /aria-label="Next articles"/);
    assert.match(output, /aria-live="polite"/);
    for (const article of mediaArticles) assert.ok(output.includes(article.thumbnail.path.replaceAll('&', '&amp;')));
  }
  assert.match(html, /Editorial arrangements have not been independently verified/);
  assert.doesNotMatch(html, /independent editorial coverage|endorsed by|award-winning|<blockquote/);
  const undated = { ...mediaArticles[0], id: "TEST-ONLY-UNDATED", publishedDate: null };
  const unverified = { ...mediaArticles[0], id: "TEST-ONLY-UNVERIFIED", publishedDate: "2026-10-07", titleVerified: false };
  const fixtures = [undated, unverified, ...mediaArticles];
  assert.deepEqual(featuredMediaArticles(fixtures).map(article => article.id), expected.slice(0, 3));
  assert.equal(sortedMediaArticles(fixtures).at(-1).id, undated.id);
  assert.equal(formatPublicationDate("2026-10-07"), "October 7, 2026");
  assert.doesNotMatch(html + home, /TEST-ONLY-/);
});

test("speaking publishes only approved presentations and preserves an honest empty state", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/presentations.ts", "utf8").replace('"./project"', JSON.stringify(new URL("../src/data/project.ts", import.meta.url).href)), { compilerOptions: { module: 99, target: 99 } });
  const { presentations, publishedPresentations } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const approved = publishedPresentations();
  const html = read("speaking/index.html");
  assert.ok(html.includes('rel="canonical" href="https://aeglysai.com/speaking/"'));
  assert.ok(read("sitemap-0.xml").includes("https://aeglysai.com/speaking/"));
  for (const { html } of pages) assert.ok(html.includes('href="/speaking/"'));
  if (approved.length === 0) {
    assert.match(html, /No presentations published yet/);
    assert.doesNotMatch(html, /data-presentation-slug=|<iframe/);
    assert.doesNotMatch(read("index.html"), /id="featured-presentations-heading"/);
    assert.equal(routes.filter(route => route.startsWith("speaking/")).length, 0);
  }
  for (const presentation of approved) {
    const detail = read(`speaking/${presentation.slug}/index.html`);
    assert.ok(html.includes(`href="/speaking/${presentation.slug}/"`));
    if (presentation.pdf) {
    assert.ok(detail.includes(`src="/${presentation.pdf.path}#view=FitH"`));
    assert.ok(detail.includes(`href="/${presentation.pdf.path}" target="_blank" rel="noopener noreferrer"`));
    assert.equal(/download(?:\s|>)/.test(detail), presentation.pdf.downloadEnabled);
    } else {
      assert.doesNotMatch(detail, /<iframe|Download PDF|Open PDF/);
      assert.match(detail, presentation.thumbnail ? /First-page preview/ : /Slides: Not yet published/);
    }
    if (presentation.conference) {
      assert.ok(detail.includes(presentation.conference.organizer.url));
      if (presentation.conference.technicalSponsor) assert.ok(detail.includes(presentation.conference.technicalSponsor.url));
      assert.ok(detail.includes(presentation.conference.startDate));
      assert.ok(detail.includes(presentation.conference.endDate));
    }
    assert.match(detail, presentation.delivery ? /Completed|Delivered at an event/ : /Event delivery is not recorded/);
    if (presentation.thumbnail) assert.ok(detail.includes(`src="/${presentation.thumbnail.path}"`));
    else assert.match(detail, /Slide preview unavailable/);
  }
  assert.equal(presentations.filter(record => record.approvedForPublication && record.publicationStatus === "PUBLISHED").length, approved.length);
});

test("presentation publication rejects missing assets, invalid dates and unsupported delivery claims", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/presentations.ts", "utf8").replace('"./project"', JSON.stringify(new URL("../src/data/project.ts", import.meta.url).href)), { compilerOptions: { module: 99, target: 99 } });
  const { publishedPresentations, featuredPresentations } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const { mkdtempSync, mkdirSync, writeFileSync, rmSync } = await import("node:fs");
  const { tmpdir } = await import("node:os");
  const root = mkdtempSync(join(tmpdir(), "presentation-policy-"));
  const fixture = { slug: "local-test-only", title: "LOCAL TEST ONLY", description: "Synthetic unit test; never published.", category: "Test", speaker: "LOCAL TEST ONLY", publicationStatus: "PUBLISHED", approvedForPublication: true, publishedDate: null, delivery: null, pdf: { path: "presentations/test.pdf", downloadEnabled: false }, thumbnail: null, featured: true };
  try {
    mkdirSync(join(root, "presentations"));
    assert.deepEqual(publishedPresentations([{ ...fixture, approvedForPublication: false }, { ...fixture, publicationStatus: "DRAFT" }], root), []);
    assert.throws(() => publishedPresentations([fixture], root), /Missing presentation asset/);
    writeFileSync(join(root, fixture.pdf.path), "not a PDF");
    assert.throws(() => publishedPresentations([fixture], root), /Invalid PDF signature/);
    writeFileSync(join(root, fixture.pdf.path), "%PDF-1.4\nTEST-ONLY signature fixture");
    assert.equal(publishedPresentations([fixture], root).length, 1);
    assert.equal(featuredPresentations([{ ...fixture, featured: false }], root).length, 0);
    assert.throws(() => publishedPresentations([{ ...fixture, pdf: null }], root), /requires an approved PDF or first-page preview/);
    writeFileSync(join(root, "presentations/test.png"), Buffer.from("89504e470d0a1a0a", "hex"));
    const preview = { ...fixture, pdf: null, thumbnail: { path: "presentations/test.png", source: "PDF_FIRST_PAGE" } };
    assert.equal(publishedPresentations([preview], root).length, 1);
    const invitation = { ...fixture, pdf: null, participationStatus: "Invited" };
    assert.equal(publishedPresentations([invitation], root).length, 1);
    assert.throws(() => publishedPresentations([{ ...invitation, participationStatus: "Completed" }], root), /requires recorded delivery/);
    assert.throws(() => publishedPresentations([{ ...invitation, participationStatus: "Delivered" }], root), /Invalid participation status/);
    assert.throws(() => publishedPresentations([{ ...invitation, delivery: { event: "Test", date: null } }], root), /conflicts with participation status/);
    assert.throws(() => publishedPresentations([fixture, fixture], root), /duplicate presentation slug/);
    assert.throws(() => publishedPresentations([{ ...fixture, slug: "../escape" }], root), /Invalid or duplicate/);
    assert.throws(() => publishedPresentations([{ ...fixture, publishedDate: "2026-02-30" }], root), /Invalid date/);
    assert.throws(() => publishedPresentations([{ ...fixture, delivery: { event: "", date: null } }], root), /unsupported delivery claim/);
    assert.throws(() => publishedPresentations([{ ...fixture, pdf: { ...fixture.pdf, path: "https://external.invalid/test.pdf" } }], root), /local public\/presentations/);
    assert.throws(() => publishedPresentations([{ ...fixture, thumbnail: { path: "presentations/missing.png", source: "PDF_FIRST_PAGE" } }], root), /Missing presentation asset/);
    assert.equal(publishedPresentations([{ ...fixture, delivery: { event: "LOCAL TEST ONLY", date: "2026-10-07" } }], root).length, 1);
  } finally { rmSync(root, { recursive: true, force: true }); }
});


test("publications and speaking separate proposals from manuscripts and invitations", () => {
  const publications = read("publications/index.html");
  assert.doesNotMatch(publications, /data-presentation-slug|Proposed talks|WRU Key Talk/);
  assert.match(publications, /href="\/speaking\/"/);
  assert.match(publications, /Manuscript in preparation/);
  const speaking = read("speaking/index.html");
  assert.match(speaking, /Ideas Worth Sharing/);
  for (const section of ["featured-engagement-heading", "engagements-heading", "library-heading", "collaboration-heading"]) assert.ok(speaking.includes(`id="${section}"`));
  assert.ok(!speaking.includes('id="engagement-invited"'));
  assert.ok(speaking.includes('id="engagement-completed"'));
  assert.ok(speaking.includes('id="engagement-confirmed"'));
  assert.ok(speaking.includes('id="engagement-awaiting"'));
  assert.equal((speaking.match(/data-presentation-slug=/g) ?? []).length, 3);
  assert.doesNotMatch(speaking, /No confirmed talks listed|No upcoming talks listed|No completed talks listed/);
  const invitation = read("speaking/gicite-2026-wru-key-talk/index.html");
  assert.match(invitation, /Confirmed — Upcoming/);
  assert.match(invitation, /World Research Union/);
  assert.match(invitation, /Technische Universität Berlin/);
  assert.match(invitation, /2026-11-06/);
  assert.doesNotMatch(invitation, /<iframe|Download PDF|Delivered at an event|IEEE/);
  for (const slug of ["building-ai-driven-incident-response", "from-static-security-policies"]) assert.match(read(`speaking/${slug}/index.html`), /Proposed/);
});


test("speaking portfolio separates event participation from technical resources", async () => {
  const { transpileModule } = await import("typescript");
  const { outputText } = transpileModule(readFileSync("src/data/presentations.ts", "utf8").replace('"./project"', JSON.stringify(new URL("../src/data/project.ts", import.meta.url).href)), { compilerOptions: { module: 99, target: 99 } });
  const { speakingPortfolio, speakingView } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
  const portfolio = speakingPortfolio();
  assert.equal(portfolio.featured.slug, "gicite-2026-wru-key-talk");
  assert.deepEqual(portfolio.engagements.map(record => record.participationStatus), ["Completed", "Acceptance Sent", "Upcoming"]);
  assert.equal(portfolio.library.length, 3);
  assert.ok(portfolio.library.every(record => record.participationStatus === "Proposed" || record.thumbnail || record.pdf));
  const invitation = speakingView(portfolio.featured);
  assert.equal(invitation.talkTitle, "To Be Announced");
  assert.equal(invitation.abstract, null);
  assert.equal(invitation.slidesUrl, null);
  assert.equal(invitation.role, "Invited Keynote Speaker");
  assert.equal(invitation.location, "Berlin, Germany");
  assert.equal(invitation.slideStatus, "Not available");
  const resource = speakingView(portfolio.library.find(record => record.thumbnail), path => `/${path}`);
  assert.equal(resource.status, "Completed");
  assert.equal(resource.slideStatus, "Preview only");
  assert.ok(resource.thumbnailUrl.endsWith("beyond-static-access-control.png"));
});


test("speaking closure keeps three conferences, written-confirmation gate and public biography", () => {
  const atai = read("speaking/beyond-static-access-control/index.html");
  assert.match(atai, /Completed/);
  assert.match(atai, /AI-Driven Adaptive Security for Resilient Cloud-Native Systems/);
  assert.match(atai, /Keynote Speaker/);
  assert.match(atai, /2026-09-26/);
  const etic = read("speaking/etic-2026/index.html");
  assert.match(etic, /Acceptance sent — awaiting confirmation/);
  assert.match(etic, /To Be Confirmed/);
  assert.match(etic, /2026-12-11/);
  assert.doesNotMatch(etic, /Keynote|Download PDF|<iframe/);
  for (const html of [atai, etic, read("speaking/gicite-2026-wru-key-talk/index.html"), read("about/index.html")]) {
    assert.match(html, /Solution Architect/);
    assert.match(html, /Creator &amp; Maintainer, AeglysAI/);
    assert.match(html, /AI-Driven Automation for Resilient and Secure Cloud &amp; Distributed Systems/);
  }
  assert.equal((read("speaking/index.html").match(/data-engagement-status=/g) ?? []).length, 4); // three cards plus featured view
});


test("community empty states never imply unreviewed participation or adoption", () => {
 for(const route of ['community/impact','community/projects','community/adoption','community/reports']) {
  const html=read(`${route}/index.html`);
  assert.match(html,/Unavailable|No reviewed|No approved/);
  assert.doesNotMatch(html,/LOCAL TEST|SYNTHETIC|GITHUB_METRICS_TOKEN|Bearer /);
 }
 const submit=read('community/submit/index.html');
 assert.match(submit,/Submission intake is closed/);
 assert.match(submit,/<fieldset disabled/);
 assert.doesNotMatch(submit,/type="email"|name="email"|<form[^>]+action=/);
 assert.equal((submit.match(/<option value="(?:smart-login-guardian|find-the-anomaly|api-traffic-watch|explain-security-alert|predict-the-outage)"/g)||[]).length,5);
 assert.doesNotMatch(read('community/reports/index.html'),/href="\/community\/reports\/2026-10\//);
});


test("COM-003B-FIX-001 enforces single-event qualification, teams, executable submissions and distinct judging rounds",()=>{
 const landing=read("hackathons/index.html"),rules=read("hackathons/events/index.html"),submission=read("community/submit/index.html");
 for(const title of ["Smart Login Guardian","Find the Anomaly","API Traffic Watch","Explain My Security Alert","Predict the Outage","AI for Everyday Life"])assert.ok(landing.includes(title));
 assert.equal((landing.match(/Challenge rules →/g)||[]).length,6);
 assert.doesNotMatch(landing,/Three build windows|THREE CHALLENGES|hackathon-02|hackathon-03/);
 for(const html of [landing,rules,submission]){
  assert.match(html,/Every member, including the leader/);
  assert.match(html,/No duplicate active team membership/);
  assert.match(html,/maximum two minutes/);
  assert.match(html,/walkthrough alone is insufficient/);
  assert.match(html,/five-minute live demonstration/);
  assert.match(html,/Round 2 determines final ranking/);
  assert.match(html,/private Google Sheets/);
 }
 assert.match(landing,/Model D knowledge is not required/);
 assert.match(landing,/Registration Opening Soon/);
 for(const field of ['team-id','video','intelligent-technique','validation','licensing','limitations'])assert.ok(submission.includes(`name="${field}"`));
 assert.doesNotMatch(submission,/action=|participantEmail|spreadsheetId/);
});
