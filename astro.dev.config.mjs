import { mergeConfig } from 'astro/config';
import base from './astro.config.mjs';
import { fileURLToPath } from 'node:url';
import { readPeoplePreview, peoplePhoto } from './scripts/community/profile-people.ts';
import { readDemoFeed, demoImage } from './scripts/community/preview/profiles-demo.ts';

// Explicitly opt in for local development; production keeps astro.config.mjs.
export default mergeConfig(base, {
  integrations: [{ name: 'local-profile-demo', hooks: { 'astro:config:setup': ({ command, injectRoute }) => {
    if (command === 'dev') injectRoute({ pattern: '/__demo/profiles', entrypoint: fileURLToPath(new URL('./scripts/community/preview/ProfilesDemo.astro', import.meta.url)) });
  } } }],
  server: { host: 'localhost', port: 4321 },
  vite: { server: { strictPort: true, fs: { deny: ['.env', '.env.*', '*.{crt,pem,key,p12,pfx,cer,der}', '.npmrc', '.yarnrc.yml', '**/.git/**', '**/.community-drafts/**'] } }, plugins: [{ name: 'local-demo-avatars', apply: 'serve', configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const match = /^\/images\/(content002-demo|content002-people)\/([A-Za-z0-9_-]+)\.(png|jpg|webp|avif)$/.exec((req.url ?? '').split('?')[0]);
      if (!match) return next();
      try {
        const real = match[1] === 'content002-people';
        const profile = real ? readPeoplePreview().people.find(p => p.id === match[2]) : readDemoFeed().profiles.find(p => p.id === match[2]);
        const bytes = profile && (profile.imageExtension ?? 'png') === match[3] ? (real ? peoplePhoto(profile.id) : demoImage(profile.id, readDemoFeed())) : null;
        res.statusCode = bytes ? 200 : 404;
        res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff');
        if (bytes) res.setHeader('Content-Type', match[3] === 'jpg' ? 'image/jpeg' : `image/${match[3]}`);
        res.end(bytes ?? undefined);
      } catch { res.statusCode = 404; res.end(); }
    });
  } }] },
});
