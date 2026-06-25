import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const rightIdx = js.indexOf('lg:w-[45%]');
if (rightIdx !== -1) {
  console.log('--- Found Right Column rendering ---');
  console.log(js.substring(rightIdx - 200, rightIdx + 1800));
} else {
  // Try another similar index
  const rightAltIdx = js.indexOf('lg:w-[45%');
  if (rightAltIdx !== -1) {
    console.log('--- Found Right Column rendering (alt) ---');
    console.log(js.substring(rightAltIdx - 200, rightAltIdx + 1800));
  } else {
    console.log('Right column class not found');
  }
}
