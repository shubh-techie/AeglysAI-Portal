// Compatibility command: image lists now come only from approved folder discovery.
// Never recreate old hand-maintained thumbnails inside publication input folders.
import { discoverSpeakingImages } from './discover-speaking-images.mjs';
const inventory=await discoverSpeakingImages();
console.log(JSON.stringify({images:inventory.sources.length,command:'npm run conference:refresh'}));
