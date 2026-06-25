import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const jhIdx = js.indexOf('function jh(');
const srcDocStart = js.indexOf('srcDoc:`', jhIdx);
if (srcDocStart !== -1) {
  const srcDocEnd = js.indexOf('`}', srcDocStart);
  if (srcDocEnd !== -1) {
    const srcDocContent = js.substring(srcDocStart + 8, srcDocEnd);
    fs.writeFileSync('extracted_srcdoc.html', srcDocContent);
    console.log(`Successfully extracted srcDoc. Length: ${srcDocContent.length} characters.`);
  } else {
    console.log('srcDocEnd not found');
  }
} else {
  console.log('srcDocStart not found');
}
