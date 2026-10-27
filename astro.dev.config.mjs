import { mergeConfig } from 'astro/config';
import base from './astro.config.mjs';
import { fileURLToPath } from 'node:url';
import { readDemoFeed, demoImage } from './scripts/community/preview/profiles-demo.ts';

// Explicitly opt in for local development; production keeps astro.config.mjs.
export default mergeConfig(base, {
  integrations: [{ name: 'local-profile-demo', hooks: { 'astro:config:setup': ({ command, injectRoute }) => {
    if (command === 'dev') injectRoute({ pattern: '/__demo/profiles', entrypoint: fileURLToPath(new URL('./scripts/community/preview/ProfilesDemo.astro', import.meta.url)) });
  } } }],
  server: { host: 'localhost', port: 4321 },
  vite: { server: { strictPort: true }, plugins: [{ name: 'local-demo-avatars', apply: 'serve', configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const match = /^\/images\/content002-demo\/([A-Za-z0-9_-]+)\.(png|jpg|webp|avif)$/.exec((req.url ?? '').split('?')[0]);
      if (!match) return next();
      try {
        const feed = readDemoFeed(), profile = feed.profiles.find(p => p.id === match[1]);
        const bytes = profile && (profile.imageExtension ?? 'png') === match[2] ? demoImage(profile.id, feed) : null;
        res.statusCode = bytes ? 200 : 404;
        res.setHeader('Cache-Control', 'no-store'); res.setHeader('X-Content-Type-Options', 'nosniff');
        if (bytes) res.setHeader('Content-Type', match[2] === 'jpg' ? 'image/jpeg' : `image/${match[2]}`);
        res.end(bytes ?? undefined);
      } catch { res.statusCode = 404; res.end(); }
    });
  } }] },
});
