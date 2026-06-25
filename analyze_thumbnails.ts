import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const thumbIdx = js.indexOf('grid-cols-4 gap-2');
if (thumbIdx !== -1) {
  console.log('--- Found Thumbnails Grid rendering ---');
  console.log(js.substring(thumbIdx - 100, thumbIdx + 1200));
} else {
  console.log('Thumbnails grid not found');
}
