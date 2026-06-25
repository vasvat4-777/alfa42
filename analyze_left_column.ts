import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const targetIdx = js.indexOf('w-full lg:w-[55%]');
if (targetIdx !== -1) {
  console.log('--- Found Left Column rendering ---');
  console.log(js.substring(targetIdx, targetIdx + 2200));
}
