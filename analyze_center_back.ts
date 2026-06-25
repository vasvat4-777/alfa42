import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const backIdx = js.indexOf('backfaceVisibility:"hidden"');
if (backIdx !== -1) {
  // Let's print the next occurrence of backfaceVisibility:"hidden" or search around it
  const secondMatchIdx = js.indexOf('backfaceVisibility:"hidden"', backIdx + 100);
  if (secondMatchIdx !== -1) {
    console.log('--- Found second backfaceVisibility Match ---');
    console.log(js.substring(secondMatchIdx - 100, secondMatchIdx + 1500));
  } else {
    console.log('--- Second match not found, printing around first ---');
    console.log(js.substring(backIdx, backIdx + 1500));
  }
} else {
  console.log('backfaceVisibility not found');
}
