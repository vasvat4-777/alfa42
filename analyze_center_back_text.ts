import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const backIdx = js.indexOf('backfaceVisibility:"hidden"');
const secondMatchIdx = js.indexOf('backfaceVisibility:"hidden"', backIdx + 100);
if (secondMatchIdx !== -1) {
  console.log('--- Printing more after second match ---');
  console.log(js.substring(secondMatchIdx + 800, secondMatchIdx + 2500));
}
