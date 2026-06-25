import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const botIdx = js.indexOf('absolute bottom-[2%]');
if (botIdx !== -1) {
  console.log('--- Found bottom stage text ---');
  console.log(js.substring(botIdx, botIdx + 1500));
} else {
  console.log('--- Bottom stage text not found ---');
}
