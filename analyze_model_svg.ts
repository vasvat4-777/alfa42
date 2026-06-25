import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const polyIdx = js.indexOf('points:"50 15, 80 32, 80 68, 50 85, 20 68, 20 32"');
if (polyIdx !== -1) {
  console.log('--- Found model-rotate SVG details ---');
  console.log(js.substring(polyIdx - 300, polyIdx + 1500));
} else {
  console.log('--- Polygon points not found ---');
}
