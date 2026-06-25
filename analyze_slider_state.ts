import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const sliderStateIdx = js.indexOf('before-after-slider-viewport');
if (sliderStateIdx !== -1) {
  // Let's print some lines BEFORE this index
  console.log('--- Search state around slider ---');
  console.log(js.substring(sliderStateIdx - 1500, sliderStateIdx));
}
