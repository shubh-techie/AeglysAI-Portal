import { mergeConfig } from 'astro/config';
import base from './astro.config.mjs';

// Explicitly opt in for local development; production keeps astro.config.mjs.
export default mergeConfig(base, {
  server: { host: 'localhost', port: 4321 },
  vite: { server: { strictPort: true } },
});
