import {defineConfig} from 'astro/config';
import {fileURLToPath} from 'node:url';
export default defineConfig({
  srcDir:fileURLToPath(new URL('./src/',import.meta.url)),
  outDir:fileURLToPath(new URL('../../.community-drafts/design001/prototype-dist/',import.meta.url)),
  cacheDir:fileURLToPath(new URL('../../.community-drafts/design001/astro-cache/',import.meta.url)),
  publicDir:fileURLToPath(new URL('../../public/',import.meta.url)),
  output:'static',trailingSlash:'always',
});
