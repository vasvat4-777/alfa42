import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

// We know that "ue=[" is where it starts
const startIdx = js.indexOf('ue=[');
if (startIdx !== -1) {
  // Let's search for the end of the array by finding matching square bracket
  let bracketCount = 1;
  let currentIdx = startIdx + 4; // Skip 'ue=['
  while (bracketCount > 0 && currentIdx < js.length) {
    if (js[currentIdx] === '[') {
      bracketCount++;
    } else if (js[currentIdx] === ']') {
      bracketCount--;
    }
    currentIdx++;
  }
  const arrayText = js.substring(startIdx, currentIdx);
  fs.writeFileSync('extracted_ue.js', arrayText);
  console.log(`Successfully extracted ue array. Length: ${arrayText.length} characters.`);
} else {
  console.log('ue=[ not found');
}
