import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const galIdx = js.indexOf('d==="gallery"');
if (galIdx !== -1) {
  console.log('--- Found Gallery Panel rendering ---');
  console.log(js.substring(galIdx - 100, galIdx + 1500));
} else {
  console.log('Gallery panel condition not found');
}
