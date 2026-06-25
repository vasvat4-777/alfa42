import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const detailModalIdx = js.indexOf('function Eh(');
if (detailModalIdx !== -1) {
  console.log('--- Found function Eh layout ---');
  console.log(js.substring(detailModalIdx + 1200, detailModalIdx + 3200));
}
