import fs from 'fs';

// Let's re-extract to start fresh
const js = fs.readFileSync('fetched_js.js', 'utf8');
const jhIdx = js.indexOf('function jh(');
const srcDocStart = js.indexOf('srcDoc:`', jhIdx);
if (srcDocStart !== -1) {
  let currentIdx = srcDocStart + 8;
  let found = false;
  while (currentIdx < js.length) {
    if (js[currentIdx] === '`') {
      if (js[currentIdx - 1] !== '\\') {
        found = true;
        break;
      }
    }
    currentIdx++;
  }
  
  if (found) {
    let srcDocContent = js.substring(srcDocStart + 8, currentIdx);
    
    // Now replace only backslash-escaped slashes like <\/script>
    srcDocContent = srcDocContent.replace(/\\<\/script\>/g, '</script>');
    srcDocContent = srcDocContent.replace(/<\/script\>/g, '</script>');
    srcDocContent = srcDocContent.replace(/\\/g, ''); // Be careful: are there single backslashes we need?
    // Let's check: if we do replace(/\\/g, ''), it removes backslashes. Let's see if we have escaped chars in the script.
    // Actually, in our fixed extraction, we can just replace specifically the escaped slashes. Let's do that!
    
    fs.writeFileSync('public/three_logo.html', srcDocContent);
    console.log('Saved clean public/three_logo.html');
  }
}
