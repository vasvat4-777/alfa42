import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const hexIdx = js.indexOf('hexagon-flower-stage');
if (hexIdx !== -1) {
  console.log('--- Found hexagon stage ---');
  console.log(js.substring(hexIdx - 100, hexIdx + 1500));
} else {
  console.log('--- Hexagon stage not found ---');
}
