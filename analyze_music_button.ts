import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const buttonIdx = js.indexOf('fixed bottom-6 left-6 z-40');
if (buttonIdx !== -1) {
  console.log('--- Found bottom button details ---');
  console.log(js.substring(buttonIdx - 100, buttonIdx + 1200));
} else {
  console.log('--- Bottom button not found ---');
}
