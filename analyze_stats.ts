import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const statIdx = js.indexOf('Направлений визуализации');
if (statIdx !== -1) {
  console.log('--- Found stats section ---');
  console.log(js.substring(statIdx - 500, statIdx + 1500));
} else {
  console.log('--- Stats section not found ---');
}
