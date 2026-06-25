import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const detailModalIdx = js.indexOf('function Eh(');
if (detailModalIdx !== -1) {
  console.log('--- Found function Eh (Details Modal) ---');
  console.log(js.substring(detailModalIdx, detailModalIdx + 1500));
} else {
  // Let's search for "gallery" in detail modals or search for Eh definition.
  const altIdx = js.indexOf('Eh=');
  if (altIdx !== -1) {
    console.log('--- Found Eh= match ---');
    console.log(js.substring(altIdx - 100, altIdx + 1400));
  } else {
    console.log('Eh not found');
  }
}
