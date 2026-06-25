import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const vhIdx = js.indexOf('vh.map(');
if (vhIdx !== -1) {
  console.log('--- Found vh.map rendering ---');
  console.log(js.substring(vhIdx - 100, vhIdx + 1200));
} else {
  // Let's do a backup search for vh.
  console.log('vh.map not found');
}
