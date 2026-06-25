import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Let's search for "btn-volume-toggle" in fetched_js.js to find the state name and where it's used.
const toggleIdx = js.indexOf('btn-volume-toggle');
if (toggleIdx !== -1) {
  console.log('--- Found btn-volume-toggle ---');
  console.log(js.substring(toggleIdx - 1500, toggleIdx + 1000));
} else {
  console.log('--- btn-volume-toggle not found ---');
}
