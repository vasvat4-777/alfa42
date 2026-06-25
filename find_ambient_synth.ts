import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Let's search for occurrences of Q inside useEffects or other functions.
// Let's write a script to search for the drone synthesizer.
const droneIdx = js.indexOf('createOscillator');
if (droneIdx !== -1) {
  console.log('--- Search for other occurrences of createOscillator ---');
  let currentPos = droneIdx;
  while (currentPos !== -1) {
    console.log(`Match at ${currentPos}:`);
    console.log(js.substring(currentPos - 100, currentPos + 500));
    currentPos = js.indexOf('createOscillator', currentPos + 1);
  }
} else {
  console.log('No createOscillator found');
}
