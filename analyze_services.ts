import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const extIdx = js.indexOf('Экстерьерная визуализация');
if (extIdx !== -1) {
  console.log('--- Found services list ---');
  console.log(js.substring(extIdx - 500, extIdx + 1500));
} else {
  console.log('--- Services list not found ---');
}
