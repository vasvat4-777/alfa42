import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const jhIdx = js.indexOf('function jh(');
const srcDocStart = js.indexOf('srcDoc:`', jhIdx);
if (srcDocStart !== -1) {
  // Find the matching unescaped backtick
  let currentIdx = srcDocStart + 8; // Skip 'srcDoc:`'
  let found = false;
  while (currentIdx < js.length) {
    if (js[currentIdx] === '`') {
      // Check if it's escaped
      if (js[currentIdx - 1] !== '\\') {
        found = true;
        break;
      }
    }
    currentIdx++;
  }
  
  if (found) {
    const srcDocContent = js.substring(srcDocStart + 8, currentIdx);
    fs.writeFileSync('public/three_logo.html', srcDocContent);
    console.log(`Successfully extracted FIXED srcDoc to public/three_logo.html. Length: ${srcDocContent.length} characters.`);
  } else {
    console.log('Unescaped backtick not found');
  }
} else {
  console.log('srcDocStart not found');
}
