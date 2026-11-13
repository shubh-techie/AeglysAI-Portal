import {defineConfig, mergeConfig} from 'astro/config';
import base from './astro.config.mjs';

// Preview shares the single local port. Never silently start on 4322+.
// Production build and the existing source-development config remain unchanged.
export default defineConfig(mergeConfig(base, {
  server: {host: 'localhost', port: 4321},
  vite: {preview: {strictPort: true}},
}));
