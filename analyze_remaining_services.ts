import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const tourIdx = js.indexOf('{id:"tours"');
if (tourIdx !== -1) {
  console.log('--- Found tours start ---');
  console.log(js.substring(tourIdx, tourIdx + 3000));
} else {
  console.log('--- Not found ---');
}
