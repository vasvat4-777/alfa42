import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const navIdx = js.indexOf('id:"nav-horizontal-menu"');
if (navIdx !== -1) {
  console.log('--- Found navigation menu ---');
  console.log(js.substring(navIdx - 1500, navIdx + 1000));
} else {
  console.log('--- Navigation menu not found ---');
}
