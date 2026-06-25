import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const centIdx = js.indexOf('center-logo-hexagon');
if (centIdx !== -1) {
  console.log('--- Found center hexagon details ---');
  console.log(js.substring(centIdx, centIdx + 2000));
} else {
  console.log('--- Center hexagon not found ---');
}
