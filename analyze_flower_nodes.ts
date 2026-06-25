import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const mapIdx = js.indexOf('V.map(p=>{const Z=p.icon');
if (mapIdx !== -1) {
  console.log('--- Found V.map ---');
  console.log(js.substring(mapIdx, mapIdx + 1800));
} else {
  console.log('--- V.map not found ---');
}
