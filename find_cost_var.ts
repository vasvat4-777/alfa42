import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// Let's find occurrences of At or look for where the budget is calculated.
// Usually there is a formula based on area (M) and category (D).
// Let's look for how "м²" is parsed or used in calculations.
const sqIdx = js.indexOf('м²"');
if (sqIdx !== -1) {
  console.log('--- Search near м² ---');
  console.log(js.substring(sqIdx - 1500, sqIdx + 500));
} else {
  console.log('м² not found');
}
