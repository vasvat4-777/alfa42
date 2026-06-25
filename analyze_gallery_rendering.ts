import fs from 'fs';

const js = fs.readFileSync('fetched_js.js', 'utf8');

const targetIdx = js.indexOf('d==="gallery"');
if (targetIdx !== -1) {
  // Let's print about 4000 characters after this index to capture everything on the right side of the modal, including gallery panels, buttons, price / timeline info.
  console.log('--- Printing right modal side ---');
  console.log(js.substring(targetIdx + 1200, targetIdx + 3200));
}
