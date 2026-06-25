import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const extIdx = js.indexOf('ue=[');
if (extIdx !== -1) {
  console.log('--- Found ue array start ---');
  console.log(js.substring(extIdx, extIdx + 4500));
} else {
  // Try another index matching style
  const alternateIdx = js.indexOf('ue=');
  if (alternateIdx !== -1) {
    console.log('--- Found alternate ue= ---');
    console.log(js.substring(alternateIdx, alternateIdx + 4500));
  } else {
    console.log('--- Not found ---');
  }
}
