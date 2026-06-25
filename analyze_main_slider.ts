import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const sliderIdx = js.indexOf('before-after-slider-viewport');
if (sliderIdx !== -1) {
  console.log('--- Found main slider rendering ---');
  console.log(js.substring(sliderIdx - 100, sliderIdx + 1500));
} else {
  console.log('--- Not found ---');
}
